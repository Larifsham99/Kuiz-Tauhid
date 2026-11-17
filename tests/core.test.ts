import { describe, it, expect } from "vitest";
import { BAB, FAKTA, SENARAI, KELAS, PASANGAN, QUESTIONS } from "../src/data";
import { grade, srsUpdate, dueReviews } from "../src/lib/actions";
import { levelFor, LEVELS, chapterStats } from "../src/lib/gamification";
import { emptyDB } from "../src/lib/store";
import { buildSet } from "../src/lib/practice";
import { DAY } from "../src/lib/util";
import type { DB } from "../src/types";

const norm = (s: string) => s.trim().toLowerCase();
const ALL = [...FAKTA, ...SENARAI, ...KELAS, ...PASANGAN];

describe("Bank Fakta", () => {
  it("ID unik & awalan sepadan dengan bab", () => {
    const ids = ALL.map((x) => x.id);
    expect(new Set(ids).size).toBe(ids.length);
    ALL.forEach((x) => expect(x.id.startsWith(`b${x.bab}-`), x.id).toBe(true));
  });
  it("12 bab, setiap bab ada kandungan", () => {
    expect(BAB).toHaveLength(12);
    BAB.forEach((b) => expect(ALL.some((x) => x.bab === b.no), b.id).toBe(true));
  });
  it("bilangan yang mesti tepat", () => {
    const cnt = (k: string) => FAKTA.filter((f) => f.kumpulan === k).length;
    expect([cnt("Sifat Nafsiyyah"), cnt("Sifat Salbiyyah"), cnt("Sifat Ma'ani"), cnt("Sifat Ma'nawiyyah"), cnt("Sifat wajib rasul")]).toEqual([1, 5, 7, 7, 4]);
    const len = (id: string) => SENARAI.find((s) => s.id === id)!.item.length;
    expect(len("b8-sifat20")).toBe(20); expect(len("b7-25-nabi")).toBe(25); expect(len("b11-sepuluh")).toBe(10);
    expect(len("b9-malaikat10")).toBe(10); expect(len("b9-rukun-iman")).toBe(6); expect(len("b9-rukun-islam")).toBe(5);
    expect(len("b10-isteri")).toBe(11); expect(len("b12-tanda-besar")).toBe(10);
  });
  it("item 'bukan' benar-benar bukan ahli senarai", () => {
    SENARAI.forEach((s) => s.bukan?.forEach((b) => expect(s.item.map(norm).includes(norm(b)), `${s.id}: ${b}`).toBe(false)));
  });
  it("Sifat 20 = Nafsiyyah + Salbiyyah + Ma'ani + Ma'nawiyyah ikut tertib", () => {
    const order = ["Sifat Nafsiyyah", "Sifat Salbiyyah", "Sifat Ma'ani", "Sifat Ma'nawiyyah"].flatMap((k) => FAKTA.filter((f) => f.kumpulan === k).map((f) => f.nama));
    expect(order).toEqual(SENARAI.find((s) => s.id === "b8-sifat20")!.item);
  });
});

describe("Penjana soalan", () => {
  it("bilangan besar, ID unik, meliputi 12 bab", () => {
    expect(QUESTIONS.length).toBeGreaterThan(600);
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    BAB.forEach((b) => expect(QUESTIONS.filter((q) => q.chapterId === b.id && !q.unverified).length, b.id).toBeGreaterThanOrEqual(10));
  });
  it("semua soalan boleh dikesan kepada item Bank Fakta", () => {
    const ids = new Set(ALL.map((x) => x.id));
    QUESTIONS.forEach((q) => expect(ids.has(q.faktaId), q.id).toBe(true));
  });
  it("soalan unverified = item bertanda sahkan", () => {
    const flagged = new Set(ALL.filter((x) => x.sahkan).map((x) => x.id));
    QUESTIONS.forEach((q) => expect(q.unverified, q.id).toBe(flagged.has(q.faktaId)));
  });
  it("item kuiz:false tidak dijadikan soalan", () => {
    const off = new Set([...FAKTA, ...SENARAI].filter((x) => x.kuiz === false).map((x) => x.id));
    QUESTIONS.forEach((q) => expect(off.has(q.faktaId), q.id).toBe(false));
  });
  it("ABCD: jawapan wujud, pilihan unik, 3–4 pilihan", () => {
    QUESTIONS.filter((q) => q.type === "mcq").forEach((q) => {
      expect(q.options!.length, q.id).toBeGreaterThanOrEqual(3);
      expect(q.options!.some((o) => o.id === q.answer), q.id).toBe(true);
      const t = q.options!.map((o) => norm(o.text)); expect(new Set(t).size, q.id).toBe(t.length);
    });
  });
  it("ABCD makna: jawapan betul diambil verbatim daripada fakta yang betul", () => {
    QUESTIONS.filter((q) => q.id.endsWith("~makna")).forEach((q) => {
      const f = FAKTA.find((x) => x.id === q.faktaId)!;
      expect(q.options!.find((o) => o.id === q.answer)!.text).toBe(f.makna);
    });
  });
  it("soalan lawan: hanya satu pilihan ialah lawan fakta tersebut", () => {
    QUESTIONS.filter((q) => q.id.endsWith("~lawan")).forEach((q) => {
      const f = FAKTA.find((x) => x.id === q.faktaId)!;
      expect(q.options!.filter((o) => o.text.startsWith(f.lawan!.nama + " (")).length, q.id).toBe(1);
    });
  });
  it("padanan: kanan unik & susun: item unik ≥3", () => {
    QUESTIONS.filter((q) => q.type === "match").forEach((q) => { const r = q.pairs!.map((p) => p.right); expect(new Set(r).size, q.id).toBe(r.length); expect(r.length).toBeGreaterThanOrEqual(3); });
    QUESTIONS.filter((q) => q.type === "order").forEach((q) => { expect(new Set(q.order).size, q.id).toBe(q.order!.length); expect(q.order!.length).toBeGreaterThanOrEqual(3); });
  });
  it("tiada pembocoran: soalan nama tidak menyebut jawapan", () => {
    QUESTIONS.filter((q) => q.id.endsWith("~nama")).forEach((q) => {
      const ans = q.options!.find((o) => o.id === q.answer)!.text;
      expect(q.prompt.toLowerCase().includes(ans.toLowerCase()), q.id).toBe(false);
    });
  });
  it("stabil: dijana dua kali memberi hasil yang sama", async () => {
    const { janaSoalan } = await import("../src/lib/jana");
    const again = janaSoalan({ fakta: FAKTA, senarai: SENARAI, kelas: KELAS, pasangan: PASANGAN });
    expect(JSON.stringify(again)).toBe(JSON.stringify(QUESTIONS));
  });
});

describe("Pemarkahan & ulang kaji", () => {
  const mcq = QUESTIONS.find((q) => q.type === "mcq")!;
  const match = QUESTIONS.find((q) => q.type === "match")!;
  const order = QUESTIONS.find((q) => q.type === "order")!;
  it("mcq / padanan / susun", () => {
    expect(grade(mcq, mcq.answer!).correct).toBe(true);
    expect(grade(mcq, "z").correct).toBe(false);
    const all = Object.fromEntries(match.pairs!.map((p) => [p.left, p.right]));
    expect(grade(match, all)).toEqual({ correct: true, score: 1 });
    expect(grade(order, order.order!)).toEqual({ correct: true, score: 1 });
    const swapped = [...order.order!]; [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
    const r = grade(order, swapped); expect(r.correct).toBe(false); expect(r.score).toBeCloseTo((order.order!.length - 2) / order.order!.length);
  });
  it("Leitner: salah masuk barisan, betul naik kotak", () => {
    const d = emptyDB(); const now = Date.now();
    srsUpdate(d, "u", "q1", true, now); expect(d.review).toHaveLength(0);
    srsUpdate(d, "u", "q1", false, now); expect(d.review[0].box).toBe(0);
    expect(dueReviews(d, "u", now + 11 * 60_000)).toHaveLength(1);
    srsUpdate(d, "u", "q1", true, now); expect(d.review[0].box).toBe(1); expect(d.review[0].due).toBe(now + DAY);
  });
});

describe("Tahap, bintang & set kuiz", () => {
  it("tahap", () => { expect(levelFor(0, 0).level.id).toBe("mubtadi"); expect(levelFor(99999, 12).level.id).toBe(LEVELS.at(-1)!.id); expect(levelFor(99999, 2).level.id).toBe("mubtadi"); });
  it("★★★ memerlukan nota dibaca", () => {
    const d: DB = emptyDB(); const qs = QUESTIONS.filter((q) => q.chapterId === "b3" && !q.unverified).slice(0, 20);
    qs.forEach((q, i) => d.attempts.push({ id: String(i), userId: "u", questionId: q.id, chapterId: "b3", correct: true, score: 1, mode: "bab", ts: i }));
    expect(chapterStats(d, "u").find((s) => s.chapterId === "b3")!.stars).toBe(2);
    d.notes.push({ userId: "u", chapterId: "b3", read: ["semua"], ts: 1 });
    expect(chapterStats(d, "u").find((s) => s.chapterId === "b3")!.stars).toBe(3);
  });
  it("lalai: soalan ⚠ tidak dimainkan; boleh disertakan melalui tetapan", () => {
    const d = emptyDB();
    for (let k = 0; k < 5; k++) buildSet(d, "u", { mode: "bab", n: 0 }).qs.forEach((q) => expect(q.unverified).toBe(false));
    d.settings.includeUnverified = true;
    expect(buildSet(d, "u", { mode: "bab", n: 0 }).qs.some((q) => q.unverified)).toBe(true);
  });
  it("set: kuiz pantas 10, harian stabil, bab ditapis", () => {
    const d = emptyDB();
    expect(buildSet(d, "u", { mode: "pantas" }).qs).toHaveLength(10);
    expect(buildSet(d, "u", { mode: "harian" }).qs.map((q) => q.id)).toEqual(buildSet(d, "u", { mode: "harian" }).qs.map((q) => q.id));
    buildSet(d, "u", { mode: "bab", bab: "b9", n: 10 }).qs.forEach((q) => expect(q.chapterId).toBe("b9"));
    const s = buildSet(d, "u", { mode: "bab", bab: "b4", n: 10 }).qs; expect(new Set(s.map((q) => q.faktaId)).size).toBe(s.length);
  });
});
