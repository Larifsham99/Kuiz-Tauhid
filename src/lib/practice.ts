import type { DB, Question, QType } from "../types";
import { playable, questionById } from "./store";
import { chapterStats, dailyTitle } from "./gamification";
import { dueReviews } from "./actions";
import { chapterById } from "../data";
import { dayKey, shuffle } from "./util";

export interface PracticeConfig {
  mode: "bab" | "pantas" | "murajaah" | "lemah" | "harian" | "serupa";
  bab?: string;
  jenis?: QType | "";
  n?: number; // 0 = semua soalan
  ex?: string; // soalan dikecualikan (serupa)
}

export const TYPE_LABEL: Record<string, string> = { "": "Semua jenis", mcq: "Pilih jawapan (ABCD)", tf: "Benar / Salah", match: "Padanan", order: "Susun ikut tertib" };

export function toParams(c: PracticeConfig) {
  const p = new URLSearchParams();
  Object.entries(c).forEach(([k, v]) => { if (v !== undefined && v !== "") p.set(k, String(v)); });
  return p.toString();
}
export function fromParams(p: URLSearchParams): PracticeConfig {
  const mode = (p.get("mode") as PracticeConfig["mode"]) || "pantas";
  return { mode, bab: p.get("bab") || "", jenis: (p.get("jenis") as QType) || "", n: p.has("n") ? Number(p.get("n")) : 10, ex: p.get("ex") || undefined };
}

export function filterPool(d: DB, c: Pick<PracticeConfig, "bab" | "jenis">) {
  return playable(d).filter((q) => (!c.bab || q.chapterId === c.bab) && (!c.jenis || q.type === c.jenis));
}

/** Soalan belum pernah dijawab didahulukan, kemudian yang lemah, kemudian selebihnya. */
function prioritise(d: DB, userId: string, qs: Question[]) {
  const seen = new Map<string, { n: number; ok: number }>();
  d.attempts.forEach((a) => { if (a.userId !== userId) return; const s = seen.get(a.questionId) ?? { n: 0, ok: 0 }; s.n++; s.ok += a.score; seen.set(a.questionId, s); });
  const fresh = qs.filter((q) => !seen.has(q.id));
  const weak = qs.filter((q) => { const s = seen.get(q.id); return s && s.ok / s.n < 0.7; });
  const rest = qs.filter((q) => { const s = seen.get(q.id); return s && s.ok / s.n >= 0.7; });
  return [...shuffle(fresh), ...shuffle(weak), ...shuffle(rest)];
}
/** Elak dua soalan daripada fakta yang sama berturut-turut dalam satu set (jawapan tidak "terbocor"). */
function spread(qs: Question[], n: number) {
  const out: Question[] = []; const used = new Set<string>();
  for (const q of qs) { if (out.length >= n) break; if (used.has(q.faktaId)) continue; used.add(q.faktaId); out.push(q); }
  for (const q of qs) { if (out.length >= n) break; if (!out.includes(q)) out.push(q); }
  return out;
}

export function buildSet(d: DB, userId: string, c: PracticeConfig): { title: string; qs: Question[] } {
  const n = c.n === 0 ? Infinity : c.n || 10;
  const ch = c.bab ? chapterById(c.bab) : undefined;
  const ok = new Set(playable(d).map((q) => q.id));
  switch (c.mode) {
    case "murajaah": {
      const qs = dueReviews(d, userId).sort((a, b) => a.due - b.due).map((r) => questionById(r.questionId)).filter((q): q is Question => !!q && ok.has(q.id));
      return { title: "Ulang Salah", qs: qs.slice(0, 15) };
    }
    case "lemah": {
      const weak = chapterStats(d, userId).filter((s) => s.attempts >= 5).sort((a, b) => a.acc - b.acc).slice(0, 3).map((s) => s.chapterId);
      return { title: "Fokus Kelemahan", qs: spread(prioritise(d, userId, playable(d).filter((q) => weak.includes(q.chapterId))), n) };
    }
    case "harian": {
      const seed = Number(dayKey(Date.now()).replace(/-/g, ""));
      return { title: dailyTitle(), qs: spread(shuffle(playable(d), seed), 10) };
    }
    case "serupa": {
      const base = c.ex ? questionById(c.ex) : undefined;
      const pool = playable(d).filter((q) => q.chapterId === c.bab && q.id !== c.ex);
      const same = pool.filter((q) => base && q.faktaId === base.faktaId);
      return { title: "Soalan Serupa", qs: [...shuffle(same), ...shuffle(pool.filter((q) => !same.includes(q)))].slice(0, 5) };
    }
    case "bab": {
      const pool = filterPool(d, c);
      const bits = [ch ? `Bab ${ch.no}: ${ch.tajuk}` : "Semua bab", c.jenis ? TYPE_LABEL[c.jenis] : ""].filter(Boolean);
      return { title: bits.join(" · "), qs: spread(prioritise(d, userId, pool), n) };
    }
    default:
      return { title: "Kuiz Pantas", qs: spread(prioritise(d, userId, playable(d)), 10) };
  }
}
