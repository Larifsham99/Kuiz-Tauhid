import type { DB, Question } from "../types";
import { getDB, update } from "./store";
import { BADGES, XP_RULES, chapterStats } from "./gamification";
import { DAY, uid } from "./util";
import { chapterById } from "../data";

// ---------- Ulang Salah automatik (Leitner / ulang kaji berjarak) ----------
export const SRS_INTERVALS = [0, 1, 2, 4, 7, 15, 30]; // hari
export function srsUpdate(d: DB, userId: string, questionId: string, correct: boolean, now = Date.now()) {
  let it = d.review.find((r) => r.userId === userId && r.questionId === questionId);
  if (!it) {
    if (correct) return; // hanya soalan salah / disimpan masuk barisan
    it = { userId, questionId, box: 0, due: now, lapses: 0, lastTs: now };
    d.review.push(it);
  }
  if (correct) { it.box = Math.min(it.box + 1, SRS_INTERVALS.length - 1); it.due = now + SRS_INTERVALS[it.box] * DAY; }
  else { it.box = 0; it.lapses += 1; it.due = now; } // terus tersedia dalam Ulang Salah
  it.lastTs = now;
}
export const reviewQueue = (d: DB, userId: string) => d.review.filter((r) => r.userId === userId && r.box < SRS_INTERVALS.length - 1);
export const dueReviews = (d: DB, userId: string, now = Date.now()) => reviewQueue(d, userId).filter((r) => r.due <= now);

function addXp(d: DB, userId: string, amount: number, reason: string) { if (amount) d.xp.push({ id: uid("x"), userId, amount, reason, ts: Date.now() }); }
function log(d: DB, userId: string, type: string, text: string) { d.activity.push({ id: uid("act"), userId, type, text, ts: Date.now() }); }

let newBadgeListener: ((ids: string[]) => void) | null = null;
export const onNewBadges = (fn: (ids: string[]) => void) => { newBadgeListener = fn; return () => { newBadgeListener = null; }; };
function awardBadges(d: DB, userId: string) {
  const have = new Set(d.badges.filter((b) => b.userId === userId).map((b) => b.badgeId));
  const fresh: string[] = [];
  for (const b of BADGES) {
    if (have.has(b.id)) continue;
    if (b.check(d, userId)) { d.badges.push({ userId, badgeId: b.id, ts: Date.now() }); fresh.push(b.id); log(d, userId, "lencana", `Memperoleh lencana "${b.name}"`); }
  }
  if (fresh.length) setTimeout(() => newBadgeListener?.(fresh), 0);
}
const starMap = (d: DB, u: string) => new Map(chapterStats(d, u).map((s) => [s.chapterId, s.stars]));
function checkStars(d: DB, userId: string, before: Map<string, number>) {
  chapterStats(d, userId).forEach((s) => {
    if (s.mastered && (before.get(s.chapterId) ?? 0) < 3 && !d.xp.some((x) => x.userId === userId && x.reason === `Kuasai bab ${s.chapterId}`)) {
      addXp(d, userId, XP_RULES.chapterMastered, `Kuasai bab ${s.chapterId}`);
      log(d, userId, "penguasaan", `Mencapai ★★★ bagi ${chapterById(s.chapterId)?.tajuk}`);
    }
  });
}

/** Semak jawapan. Mengembalikan skor 0..1 */
export function grade(q: Question, given: string | Record<string, string> | string[]): { correct: boolean; score: number } {
  if (q.type === "mcq" || q.type === "tf") { const ok = given === q.answer; return { correct: ok, score: ok ? 1 : 0 }; }
  if (q.type === "match" && q.pairs && given && typeof given === "object" && !Array.isArray(given)) {
    const ok = q.pairs.filter((p) => given[p.left] === p.right).length; return { correct: ok === q.pairs.length, score: ok / q.pairs.length };
  }
  if (q.type === "order" && q.order && Array.isArray(given)) {
    const ok = q.order.filter((x, i) => given[i] === x).length; return { correct: ok === q.order.length, score: ok / q.order.length };
  }
  return { correct: false, score: 0 };
}

export function recordAnswer(userId: string, q: Question, res: { correct: boolean; score: number }, given: string, mode: string, ms?: number) {
  update((d) => {
    const before = starMap(d, userId);
    d.attempts.push({ id: uid("a"), userId, questionId: q.id, chapterId: q.chapterId, correct: res.correct, score: res.score, given, mode, ts: Date.now(), ms });
    addXp(d, userId, res.correct ? XP_RULES.correct : 0, "Jawapan betul");
    srsUpdate(d, userId, q.id, res.correct);
    checkStars(d, userId, before);
    awardBadges(d, userId);
  });
}

export function completeExercise(userId: string, title: string, total: number, score: number) {
  update((d) => {
    d.runs.push({ id: uid("r"), userId, title, total, score, ts: Date.now() });
    addXp(d, userId, XP_RULES.exercise, `Tamat kuiz: ${title}`);
    log(d, userId, "kuiz", `Menamatkan ${title} – ${Math.round(score * 10) / 10}/${total}`);
    awardBadges(d, userId);
  });
}

export function saveForReview(userId: string, questionId: string) {
  update((d) => {
    const it = d.review.find((r) => r.userId === userId && r.questionId === questionId);
    if (it) { it.saved = true; it.box = 0; it.due = Math.min(it.due, Date.now()); }
    else d.review.push({ userId, questionId, box: 0, due: Date.now(), lapses: 0, lastTs: Date.now(), saved: true });
  });
}

/** Tanda nota bab telah dibaca (sekali sahaja per bab). */
export function markNoteRead(userId: string, chapterId: string) {
  if (getDB().notes.some((n) => n.userId === userId && n.chapterId === chapterId && n.read.length)) return;
  update((d) => {
    const before = starMap(d, userId);
    d.notes.push({ userId, chapterId, read: ["semua"], ts: Date.now() });
    addXp(d, userId, XP_RULES.noteRead, "Membaca nota");
    log(d, userId, "nota", `Membaca nota ${chapterById(chapterId)?.tajuk}`);
    checkStars(d, userId, before);
    awardBadges(d, userId);
  });
}
