import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle, BookOpen, Bookmark, Shuffle, ArrowRight, Undo2 } from "lucide-react";
import type { Question } from "../types";
import { grade, recordAnswer, saveForReview } from "../lib/actions";
import { useMe } from "../lib/store";
import { chapterById } from "../data";
import { Arabic, Celebrate, RichText, Unverified, cx, toast } from "./ui";
import { shuffle } from "../lib/util";
import { sfx } from "../lib/sound";

export interface PlayResult { correct: boolean; score: number }

/** Bar tindakan melekat di bawah skrin (mesra ibu jari). */
function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-malam-900/5 bg-white/95 px-4 pt-3 backdrop-blur-md dark:border-white/10 dark:bg-malam-950/95" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto flex max-w-2xl gap-2">{children}</div>
    </div>
  );
}

const seedOf = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function QuestionPlayer({ q, mode, onAnswered, onNext, onSimilar }: {
  q: Question; mode: string; onAnswered?: (r: PlayResult) => void; onNext?: () => void; onSimilar?: () => void;
}) {
  const me = useMe()!;
  const [sel, setSel] = useState("");
  const [matchSel, setMatchSel] = useState<Record<string, string>>({});
  const [seq, setSeq] = useState<string[]>([]);
  const [result, setResult] = useState<PlayResult | null>(null);
  const t0 = useRef(Date.now());
  const fbRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setSel(""); setMatchSel({}); setSeq([]); setResult(null); t0.current = Date.now(); window.scrollTo({ top: 0 }); }, [q.id]);
  useEffect(() => { if (result) setTimeout(() => fbRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }, [result]);
  const rights = useMemo(() => shuffle(q.pairs?.map((p) => p.right) ?? [], seedOf(q.id)), [q.id, q.pairs]);
  const bank = useMemo(() => { if (!q.order) return []; let s = shuffle(q.order, seedOf(q.id)); if (s.join("|") === q.order.join("|")) s = [...s.slice(1), s[0]]; return s; }, [q.id, q.order]);
  const ch = chapterById(q.chapterId);

  function finish(r: PlayResult, given: string) {
    setResult(r);
    if (r.correct) sfx.correct(); else if (r.score > 0) sfx.partial(); else { sfx.wrong(); navigator.vibrate?.(40); }
    recordAnswer(me.id, q, r, given, mode, Date.now() - t0.current);
    onAnswered?.(r);
  }
  const submit = (value = sel) => {
    if (q.type === "match") finish(grade(q, matchSel), JSON.stringify(matchSel));
    else if (q.type === "order") finish(grade(q, seq), JSON.stringify(seq));
    else finish(grade(q, value), value);
  };
  const answered = !!result;
  const correctText = q.type === "mcq" ? q.options?.find((o) => o.id === q.answer)?.text : q.type === "tf" ? (q.answer === "B" ? "Benar" : "Salah") : undefined;
  const canCheck = q.type === "match" ? Object.keys(matchSel).length >= (q.pairs?.length ?? 0) : q.type === "order" ? seq.length === (q.order?.length ?? 0) : !!sel;

  return (
    <div className="pb-28">
      {/* ---------- Soalan ---------- */}
      <div className="rise">
        <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className="font-bold text-zamrud-700 dark:text-zamrud-300">Bab {ch?.no} · {ch?.tajuk}</span>
          {q.unverified && <Unverified />}
        </div>
        <RichText text={q.prompt} className="text-lg font-bold leading-snug text-malam-900 dark:text-white" />
        {q.arabic && <Arabic className="mt-3" refText={q.arabicRef}>{q.arabic}</Arabic>}
      </div>

      {/* ---------- Jawapan ---------- */}
      <div className="mt-4">
        {(q.type === "mcq" || q.type === "tf") && (
          <div className={cx("grid gap-2.5", q.type === "tf" && "grid-cols-2")}>
            {(q.type === "tf" ? [{ id: "B", text: "Benar" }, { id: "S", text: "Salah" }] : q.options!).map((o, i) => {
              const isAns = o.id === q.answer; const isSel = o.id === sel;
              return (
                <button key={o.id} data-nosound disabled={answered} onClick={() => { setSel(o.id); submit(o.id); }}
                  className={cx("flex min-h-[56px] items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-left text-[15px] font-semibold shadow-sm ring-1 transition duration-150 active:scale-[.98] dark:bg-malam-900",
                    q.type === "tf" && "justify-center py-5 text-base font-extrabold",
                    !answered && "ring-slate-200 hover:ring-2 hover:ring-zamrud-400 dark:ring-white/10",
                    answered && isAns && "!bg-zamrud-50 ring-2 !ring-zamrud-600 dark:!bg-zamrud-500/15",
                    answered && isSel && !isAns && "!bg-rose-50 ring-2 !ring-rose-500 dark:!bg-rose-500/15",
                    answered && !isSel && !isAns && "opacity-50 ring-slate-200 dark:ring-white/10")}>
                  {q.type === "mcq" && <span className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-extrabold", answered && isAns ? "bg-zamrud-600 text-white" : answered && isSel ? "bg-rose-500 text-white" : "bg-zamrud-50 text-zamrud-800 dark:bg-white/10 dark:text-slate-200")}>{"ABCD"[i]}</span>}
                  {q.type === "tf" && <span aria-hidden>{o.id === "B" ? "✓" : "✗"}</span>}
                  <RichText text={o.text} className={cx(q.type === "mcq" && "flex-1")} />
                  {answered && isAns && q.type === "mcq" && <CheckCircle2 className="shrink-0 text-zamrud-600" size={20} aria-label="Jawapan betul" />}
                  {answered && isSel && !isAns && q.type === "mcq" && <XCircle className="shrink-0 text-rose-500" size={20} aria-label="Pilihan anda" />}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "match" && (
          <div className="space-y-2.5">
            {q.pairs!.map((p) => {
              const ok = answered && matchSel[p.left] === p.right;
              return (
                <div key={p.left} className={cx("rounded-2xl bg-white p-3 shadow-sm ring-1 dark:bg-malam-900", answered ? (ok ? "ring-2 ring-zamrud-600" : "ring-2 ring-rose-400") : "ring-slate-200 dark:ring-white/10")}>
                  <label className="mb-2 block font-bold" htmlFor={`m-${p.left}`}>{p.left}</label>
                  <select id={`m-${p.left}`} className="input" disabled={answered} value={matchSel[p.left] ?? ""} onChange={(e) => setMatchSel({ ...matchSel, [p.left]: e.target.value })}>
                    <option value="">— pilih padanan —</option>{rights.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {answered && !ok && <div className="mt-1 text-xs font-bold text-rose-600">Betul: {p.right}</div>}
                </div>
              );
            })}
          </div>
        )}

        {q.type === "order" && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200 dark:bg-malam-900 dark:ring-white/10">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-500"><span>Susunan anda</span>{!answered && seq.length > 0 && <button className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2 text-zamrud-700 dark:text-zamrud-300" onClick={() => setSeq(seq.slice(0, -1))}><Undo2 size={14} /> Undur</button>}</div>
              <ol className="space-y-1.5">
                {(answered ? q.order! : seq).map((x, i) => {
                  const mine = seq[i]; const ok = answered ? mine === x : undefined;
                  return (
                    <li key={i} className={cx("flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-semibold", answered ? (ok ? "bg-zamrud-50 text-zamrud-900 dark:bg-zamrud-500/15 dark:text-zamrud-100" : "bg-rose-50 text-rose-900 dark:bg-rose-500/15 dark:text-rose-100") : "bg-zamrud-50 dark:bg-white/10")}>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-xs font-extrabold dark:bg-malam-950">{i + 1}</span>
                      <span className="flex-1">{answered ? x : mine}</span>
                      {answered && !ok && <span className="text-xs">anda: {mine}</span>}
                    </li>
                  );
                })}
                {!answered && seq.length === 0 && <li className="py-2 text-sm text-slate-400">Tekan item di bawah mengikut tertib.</li>}
              </ol>
            </div>
            {!answered && (
              <div className="flex flex-wrap gap-2">
                {bank.filter((x) => !seq.includes(x)).map((x) => (
                  <button key={x} className="min-h-[44px] rounded-2xl bg-white px-4 py-2 text-[15px] font-bold shadow-sm ring-1 ring-slate-200 transition hover:ring-2 hover:ring-zamrud-400 active:scale-95 dark:bg-malam-900 dark:ring-white/10" onClick={() => setSeq([...seq, x])}>{x}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ---------- Penerangan jawapan ---------- */}
      {answered && (
        <div ref={fbRef} className="mt-5 scroll-mt-36 space-y-3 pop">
          <div className={cx("relative rounded-2xl p-4 text-white shadow-lg", result!.correct ? "bg-zamrud-600" : result!.score > 0 ? "bg-emas-600" : "bg-rose-500")}>
            {result!.correct && <Celebrate />}
            <div className="flex items-center gap-2 text-lg font-extrabold">{result!.correct ? <CheckCircle2 /> : <XCircle />}{result!.correct ? "Tepat! +10 ★" : result!.score > 0 ? `Hampir! ${Math.round(result!.score * 100)}% betul` : "Belum tepat"}</div>
            {!result!.correct && correctText && <div className="mt-1 text-sm">Jawapan: <RichText text={correctText} className="inline font-bold" /></div>}
            {!result!.correct && <div className="mt-1 text-xs opacity-90">Soalan ini akan muncul semula dalam Ulang Salah.</div>}
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-200 dark:bg-malam-900 dark:ring-white/10">
            <div className="mb-1 text-xs font-extrabold uppercase tracking-wide text-zamrud-700 dark:text-zamrud-300">Penerangan</div>
            <RichText text={q.why} />
            {q.dalil && q.dalil.arab !== q.arabic && <Arabic className="mt-3" refText={q.dalil.rujukan} maksud={q.dalil.maksud}>{q.dalil.arab}</Arabic>}
            {q.dalil && q.dalil.arab === q.arabic && q.dalil.maksud && <p className="mt-2 text-slate-600 dark:text-slate-300">Maksud ayat: “{q.dalil.maksud}”</p>}
            {q.unverified && <p className="mt-3 text-[11px] text-amber-700 dark:text-amber-300">⚠ Fakta ini masih menunggu pengesahan penyemak.</p>}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <Link to={`/nota/${q.chapterId}`} className="btn btn-ghost !flex-col !gap-1 !px-1 !py-2.5 text-xs"><BookOpen size={18} />Baca nota</Link>
            {onSimilar ? <button className="btn btn-ghost !flex-col !gap-1 !px-1 !py-2.5 text-xs" onClick={onSimilar}><Shuffle size={18} />Soalan serupa</button> : <span />}
            <button className="btn btn-ghost !flex-col !gap-1 !px-1 !py-2.5 text-xs" onClick={() => { saveForReview(me.id, q.id); toast("Disimpan untuk Ulang Salah"); }}><Bookmark size={18} />Simpan</button>
          </div>
        </div>
      )}

      <ActionBar>
        {answered ? (
          onNext && <button className="btn btn-primary flex-1 !py-3.5 text-base" onClick={onNext}>Seterusnya <ArrowRight size={18} /></button>
        ) : (q.type === "mcq" || q.type === "tf") ? (
          onNext && <button className="btn btn-ghost flex-1 !py-3.5" onClick={onNext}>Langkau</button>
        ) : (
          <>{onNext && <button className="btn btn-ghost !py-3.5" onClick={onNext}>Langkau</button>}
            <button data-nosound className="btn btn-primary flex-1 !py-3.5 text-base" disabled={!canCheck} onClick={() => submit()}>Semak jawapan</button></>
        )}
      </ActionBar>
    </div>
  );
}
