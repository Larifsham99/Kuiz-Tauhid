import type { DB } from "../types";
import { BAB } from "../data";
import { DAY, dayKey, startOfDay, startOfWeek } from "./util";

// ================= BINTANG (mata ganjaran) =================
export const XP_RULES = { correct: 10, exercise: 20, noteRead: 10, chapterMastered: 100 };

// ================= TAHAP =================
export const LEVELS = [
  { id: "mubtadi", name: "Mubtadi'", arab: "مُبْتَدِئ", minXp: 0, minMastered: 0, desc: "Permulaan perjalanan ilmu." },
  { id: "mutawassit", name: "Mutawassit", arab: "مُتَوَسِّط", minXp: 800, minMastered: 3, desc: "≥ 800 ★ dan 3 bab bertaraf ★★★." },
  { id: "mutaqaddim", name: "Mutaqaddim", arab: "مُتَقَدِّم", minXp: 2500, minMastered: 6, desc: "≥ 2,500 ★ dan 6 bab bertaraf ★★★." },
  { id: "mutamayyiz", name: "Mutamayyiz", arab: "مُتَمَيِّز", minXp: 5000, minMastered: 9, desc: "≥ 5,000 ★ dan 9 bab bertaraf ★★★." },
  { id: "itqan", name: "Itqan", arab: "إِتْقَان", minXp: 9000, minMastered: 12, desc: "≥ 9,000 ★ dan kesemua 12 bab bertaraf ★★★." },
];

/** Syarat bintang bab (ketepatan dikira daripada 20 cubaan terkini dalam bab). */
export const STAR_RULES = [
  { stars: 1, minAttempts: 5, minAcc: 50, needRead: false },
  { stars: 2, minAttempts: 10, minAcc: 70, needRead: false },
  { stars: 3, minAttempts: 15, minAcc: 85, needRead: true },
];

export function totalXp(d: DB, userId: string) { return d.xp.reduce((s, x) => (x.userId === userId ? s + x.amount : s), 0); }

export interface ChapterStat { chapterId: string; attempts: number; acc: number; read: boolean; stars: number; mastered: boolean; lastTs?: number }
export function chapterStats(d: DB, userId: string): ChapterStat[] {
  const by = new Map<string, DB["attempts"]>();
  for (const a of d.attempts) { if (a.userId !== userId) continue; const l = by.get(a.chapterId); if (l) l.push(a); else by.set(a.chapterId, [a]); }
  return BAB.map((c) => {
    const ca = by.get(c.id) ?? [];
    const recent = ca.slice(-20);
    const acc = recent.length ? Math.round((recent.reduce((s, a) => s + a.score, 0) / recent.length) * 100) : 0;
    const read = d.notes.some((n) => n.userId === userId && n.chapterId === c.id && n.read.length > 0);
    let stars = 0;
    for (const r of STAR_RULES) if (ca.length >= r.minAttempts && acc >= r.minAcc && (!r.needRead || read)) stars = r.stars;
    return { chapterId: c.id, attempts: ca.length, acc, read, stars, mastered: stars === 3, lastTs: ca.at(-1)?.ts };
  });
}

export function levelFor(xp: number, mastered: number) {
  let cur = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp && mastered >= l.minMastered) cur = l;
  const idx = LEVELS.indexOf(cur);
  const next = LEVELS[idx + 1];
  const progress = next ? Math.min(100, Math.round((Math.min(1, (xp - cur.minXp) / (next.minXp - cur.minXp)) * 0.7 + Math.min(1, mastered / Math.max(1, next.minMastered)) * 0.3) * 100)) : 100;
  return { level: cur, next, progress, idx };
}

export function activeDays(d: DB, userId: string) {
  const days = new Set<string>();
  d.attempts.forEach((a) => a.userId === userId && days.add(dayKey(a.ts)));
  return days;
}
export function streak(d: DB, userId: string) {
  const days = activeDays(d, userId);
  let s = 0; let t = startOfDay();
  if (!days.has(dayKey(t))) t -= DAY;
  while (days.has(dayKey(t))) { s++; t -= DAY; }
  return s;
}
export const answeredToday = (d: DB, userId: string) => { const t = startOfDay(); return d.attempts.filter((a) => a.userId === userId && a.ts >= t).length; };
export const dailyDone = (d: DB, userId: string) => d.runs.some((r) => r.userId === userId && r.title === dailyTitle());
export const dailyTitle = (ts = Date.now()) => `Cabaran Harian ${dayKey(ts)}`;

const summaryCache = new WeakMap<DB, Map<string, ReturnType<typeof computeSummary>>>();
export function summary(d: DB, userId: string) {
  let m = summaryCache.get(d); if (!m) { m = new Map(); summaryCache.set(d, m); }
  let v = m.get(userId); if (!v) { v = computeSummary(d, userId); m.set(userId, v); }
  return v;
}
function computeSummary(d: DB, userId: string) {
  const atts = d.attempts.filter((a) => a.userId === userId);
  const correct = atts.reduce((s, a) => s + a.score, 0);
  const stats = chapterStats(d, userId);
  const xp = totalXp(d, userId);
  const mastered = stats.filter((s) => s.mastered).length;
  return {
    xp, answered: atts.length, correct: Math.round(correct), acc: atts.length ? Math.round((correct / atts.length) * 100) : 0,
    stats, mastered, totalStars: stats.reduce((s, x) => s + x.stars, 0), weak: stats.filter((s) => s.attempts >= 5 && s.acc < 60),
    streak: streak(d, userId), lvl: levelFor(xp, mastered),
  };
}

// ================= LENCANA =================
export type BadgeIcon = "sprout" | "list" | "star" | "sun" | "landmark" | "feather" | "heart" | "users" | "award" | "trophy" | "flame" | "repeat" | "calendar" | "target" | "crown";
export interface BadgeDef { id: string; name: string; icon: BadgeIcon; desc: string; check: (d: DB, uid: string) => boolean }
const starsOf = (d: DB, u: string, ch: string) => chapterStats(d, u).find((s) => s.chapterId === ch)?.stars ?? 0;
const correctCount = (d: DB, u: string) => d.attempts.filter((a) => a.userId === u && a.correct).length;
export const BADGES: BadgeDef[] = [
  { id: "mula", name: "Langkah Pertama", icon: "sprout", desc: "Jawab 10 soalan pertama.", check: (d, u) => d.attempts.filter((a) => a.userId === u).length >= 10 },
  { id: "sifat20", name: "Hafiz Sifat 20", icon: "list", desc: "Susun semua bahagian Sifat 20 dengan betul.", check: (d, u) => new Set(d.attempts.filter((a) => a.userId === u && a.correct && a.questionId.startsWith("b8-sifat20~susun")).map((a) => a.questionId)).size >= 4 },
  { id: "salbiyyah", name: "Penguasa Salbiyyah", icon: "star", desc: "Capai ★★★ bagi Bab 3.", check: (d, u) => starsOf(d, u, "b3") === 3 },
  { id: "maani", name: "Penguasa Ma'ani", icon: "sun", desc: "Capai ★★★ bagi Bab 4.", check: (d, u) => starsOf(d, u, "b4") === 3 },
  { id: "rasul", name: "Mengenal Rasul", icon: "landmark", desc: "Capai ★★★ bagi Bab 7.", check: (d, u) => starsOf(d, u, "b7") === 3 },
  { id: "malaikat", name: "Mengenal Malaikat", icon: "feather", desc: "Capai ★★★ bagi Bab 9.", check: (d, u) => starsOf(d, u, "b9") === 3 },
  { id: "keluarga", name: "Cinta Keluarga Nabi ﷺ", icon: "heart", desc: "Capai ★★★ bagi Bab 10.", check: (d, u) => starsOf(d, u, "b10") === 3 },
  { id: "sahabat", name: "Sahabat Para Sahabat", icon: "users", desc: "Capai ★★★ bagi Bab 11.", check: (d, u) => starsOf(d, u, "b11") === 3 },
  { id: "seratus", name: "100 Jawapan Betul", icon: "award", desc: "Kumpul 100 jawapan betul.", check: (d, u) => correctCount(d, u) >= 100 },
  { id: "limaratus", name: "500 Jawapan Betul", icon: "trophy", desc: "Kumpul 500 jawapan betul.", check: (d, u) => correctCount(d, u) >= 500 },
  { id: "istiqamah7", name: "7 Hari Istiqamah", icon: "flame", desc: "Menjawab 7 hari berturut-turut.", check: (d, u) => streak(d, u) >= 7 },
  { id: "murajaah", name: "Ulang Kaji Pertama", icon: "repeat", desc: "Selesaikan satu sesi Ulang Salah.", check: (d, u) => d.runs.some((r) => r.userId === u && r.title.startsWith("Ulang Salah")) },
  { id: "harian", name: "Cabaran Harian", icon: "calendar", desc: "Selesaikan satu Cabaran Harian.", check: (d, u) => d.runs.some((r) => r.userId === u && r.title.startsWith("Cabaran Harian")) },
  { id: "sempurna", name: "Markah Penuh", icon: "target", desc: "Dapat 100% dalam kuiz 10 soalan atau lebih.", check: (d, u) => d.runs.some((r) => r.userId === u && r.total >= 10 && r.score >= r.total) },
  { id: "semua", name: "Aqidah 50 Sempurna", icon: "crown", desc: "Capai ★★★ bagi kesemua 12 bab.", check: (d, u) => chapterStats(d, u).every((s) => s.mastered) },
];

// ================= PAPAN SKOR (profil dalam peranti) =================
export type Board = "keseluruhan" | "mingguan" | "ketepatan" | "istiqamah";
export interface BoardRow { id: string; name: string; avatar: string; value: number; label: string; rank: number; me?: boolean }
export function scoreSnapshot(d: DB, userId: string) {
  const wk = startOfWeek();
  const a = d.attempts.filter((x) => x.userId === userId);
  const c = a.reduce((s, x) => s + x.score, 0);
  return {
    xp: totalXp(d, userId),
    weeklyXp: d.xp.filter((x) => x.userId === userId && x.ts >= wk).reduce((s, x) => s + x.amount, 0),
    answered: a.length, accuracy: a.length ? Math.round((c / a.length) * 100) : 0, streak: streak(d, userId),
  };
}
export function boardValue(s: ReturnType<typeof scoreSnapshot>, board: Board): { value: number; label: string } {
  switch (board) {
    case "mingguan": return { value: s.weeklyXp, label: `${s.weeklyXp} ★ minggu ini` };
    case "ketepatan": return s.answered >= 10 ? { value: s.accuracy, label: `${s.accuracy}% (${s.answered} soalan)` } : { value: -1, label: "perlu ≥ 10 soalan" };
    case "istiqamah": return { value: s.streak, label: `${s.streak} hari` };
    default: return { value: s.xp, label: `${s.xp} ★` };
  }
}
export function leaderboard(d: DB, board: Board): BoardRow[] {
  return d.profiles.map((p) => ({ id: p.id, name: p.name, avatar: p.avatar, me: p.id === d.activeProfileId, ...boardValue(scoreSnapshot(d, p.id), board) }))
    .sort((a, b) => b.value - a.value).map((r, i) => ({ ...r, rank: i + 1 }));
}
