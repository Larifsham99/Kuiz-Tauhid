import { useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { X, Leaf } from "lucide-react";
import { getDB, useMe } from "../lib/store";
import { completeExercise } from "../lib/actions";
import { sfx } from "../lib/sound";
import { buildSet, fromParams, toParams } from "../lib/practice";
import { XP_RULES } from "../lib/gamification";
import { chapterById } from "../data";
import QuestionPlayer, { type PlayResult } from "../components/QuestionPlayer";
import { Card, Empty, Progress, RichText, toast } from "../components/ui";

export default function Sesi() { const [p] = useSearchParams(); return <SesiInner key={p.toString()} />; }

function SesiInner() {
  const me = useMe()!; const [p] = useSearchParams(); const nav = useNavigate();
  const cfg = useMemo(() => fromParams(p), []); // eslint-disable-line react-hooks/exhaustive-deps
  const set = useMemo(() => buildSet(getDB(), me.id, cfg), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [res, setRes] = useState<Record<string, PlayResult>>({});
  const [done, setDone] = useState(false);
  const run = useRef(0);
  const q = set.qs[i];
  const answered = Object.keys(res).length;
  const score = Object.values(res).reduce((s, r) => s + r.score, 0);
  const correctN = Object.values(res).filter((r) => r.correct).length;

  if (!set.qs.length) return (
    <Empty title={cfg.mode === "murajaah" ? "Tiada soalan untuk diulang sekarang" : "Tiada soalan tersedia"} icon={<Leaf size={36} />}>
      {cfg.mode === "murajaah" ? "Soalan yang dijawab salah akan muncul di sini secara automatik mengikut jadual ulang kaji." : "Cuba pilihan lain."}
      <div className="mt-3"><Link className="btn btn-primary" to="/">Kembali</Link></div>
    </Empty>
  );

  function finish() {
    setDone(true);
    if (answered) { completeExercise(me.id, set.title, answered, score); setTimeout(() => sfx.complete(score / answered >= 0.6), 150); }
  }

  if (done) {
    const wrong = set.qs.filter((x) => res[x.id] && !res[x.id].correct);
    const pct = answered ? Math.round((score / answered) * 100) : 0;
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <Card className="relative overflow-hidden p-6 text-center">
          <div className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{set.title}</div>
          <div className="mx-auto mt-3 grid h-36 w-36 place-items-center rounded-full" style={{ background: `conic-gradient(#C99A2E 0 ${pct}%, #E8F5EF ${pct}% 100%)` }}>
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white dark:bg-malam-900"><div><div className="text-3xl font-extrabold text-malam-900 dark:text-white">{correctN}/{answered}</div><div className="text-xs text-slate-500">{pct}%</div></div></div>
          </div>
          {answered > 0 && <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emas-100 px-3 py-1 text-sm font-extrabold text-emas-700">+{correctN * XP_RULES.correct + XP_RULES.exercise} ★</div>}
          <div className="mt-3 font-bold">{pct === 100 ? "MasyaAllah, markah penuh!" : pct >= 80 ? "Mumtaz! Teruskan istiqamah." : pct >= 60 ? "Bagus! Ulang soalan yang salah untuk menguasainya." : answered ? "Tak mengapa — baca nota dan cuba lagi." : "Tiada soalan dijawab."}</div>
          <div className="mt-4 grid gap-2 sm:flex sm:justify-center">
            <button className="btn btn-primary" onClick={() => nav(`/kuiz/sesi?${toParams(cfg)}&r=${Date.now()}`)}>Kuiz baharu</button>
            {wrong.length > 0 && <button className="btn btn-ghost" onClick={() => nav(`/kuiz/sesi?${toParams({ mode: "murajaah" })}&r=${Date.now()}`)}>Ulang {wrong.length} soalan salah</button>}
            <Link to="/" className="btn btn-outline">Kembali</Link>
          </div>
        </Card>
        {wrong.length > 0 && (
          <Card className="p-5">
            <div className="mb-2 font-extrabold">Soalan untuk diulang ({wrong.length})</div>
            {wrong.map((w) => <div key={w.id} className="border-t border-slate-100 py-2.5 text-sm dark:border-white/5"><RichText text={w.prompt} />{w.arabic && <div className="arab-block !text-xl">{w.arabic}</div>}<Link className="text-xs font-bold text-zamrud-700 dark:text-zamrud-300" to={`/nota/${w.chapterId}`}>Baca nota: {chapterById(w.chapterId)?.tajuk} →</Link></div>)}
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-14 z-30 -mx-4 mb-4 border-b border-malam-900/5 bg-[#F6F8F7] px-4 pb-3 pt-2 shadow-sm dark:border-white/5 dark:bg-malam-950">
        <div className="flex items-center gap-3">
          <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10" onClick={finish} aria-label="Tamatkan kuiz"><X size={18} /></button>
          <Progress value={((i + (res[q.id] ? 1 : 0)) / set.qs.length) * 100} className="!h-3" />
          <span className="whitespace-nowrap text-sm font-extrabold tabular-nums text-slate-500">{i + 1}/{set.qs.length}</span>
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] font-bold text-slate-500"><span className="truncate">{set.title}</span><span className="shrink-0 text-emas-600">★ {correctN * XP_RULES.correct}</span></div>
      </div>
      <QuestionPlayer key={q.id} q={q} mode={cfg.mode}
        onAnswered={(r) => {
          setRes((s) => ({ ...s, [q.id]: r }));
          run.current = r.correct ? run.current + 1 : 0;
          if (run.current > 0 && run.current % 3 === 0) setTimeout(() => { sfx.streak(); toast(`${run.current} betul berturut-turut!`, "info"); }, 450);
        }}
        onNext={() => (i < set.qs.length - 1 ? setI(i + 1) : finish())}
        onSimilar={() => nav(`/kuiz/sesi?${toParams({ mode: "serupa", bab: q.chapterId, ex: q.id })}`)} />
    </div>
  );
}
