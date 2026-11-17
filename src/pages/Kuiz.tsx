import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, RotateCcw, Target, CalendarDays, SlidersHorizontal, ChevronDown, Play, CheckCircle2 } from "lucide-react";
import { useDb, useMe } from "../lib/store";
import { answeredToday, dailyDone, summary } from "../lib/gamification";
import { dueReviews } from "../lib/actions";
import { filterPool, toParams, TYPE_LABEL, type PracticeConfig } from "../lib/practice";
import { BAB } from "../data";
import { BabIcon } from "../components/icons";
import { Card, Progress, Stars, cx } from "../components/ui";
import type { QType } from "../types";

export default function Kuiz() {
  const me = useMe()!; const d = useDb(); const nav = useNavigate();
  const s = summary(d, me.id);
  const due = dueReviews(d, me.id).length;
  const today = answeredToday(d, me.id);
  const daily = dailyDone(d, me.id);
  const go = (c: PracticeConfig) => nav(`/kuiz/sesi?${toParams(c)}`);
  const [open, setOpen] = useState(false);
  const [bab, setBab] = useState(""); const [jenis, setJenis] = useState<QType | "">(""); const [n, setN] = useState(10);
  const poolN = useMemo(() => filterPool(d, { bab, jenis }).length, [d, bab, jenis]);
  const counts = useMemo(() => { const m = new Map<string, number>(); filterPool(d, {}).forEach((q) => m.set(q.chapterId, (m.get(q.chapterId) ?? 0) + 1)); return m; }, [d]);

  return (
    <div className="space-y-5">
      {/* Kad sambutan */}
      <section className="hero relative overflow-hidden rounded-3xl p-5 text-white shadow-xl rise">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-zamrud-100">Assalamualaikum,</div>
            <div className="text-2xl font-extrabold">{me.name}</div>
            <div className="mt-1 text-sm text-zamrud-100">Tahap <b className="text-emas-100">{s.lvl.level.name}</b> <span className="font-arab text-base">{s.lvl.level.arab}</span></div>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2 text-center"><div className="text-2xl font-extrabold text-emas-100">{s.totalStars}<span className="text-sm text-zamrud-100">/36</span></div><div className="text-[10px] text-zamrud-100">bintang bab</div></div>
        </div>
        {s.lvl.next && <div className="mt-4"><div className="mb-1 flex justify-between text-[11px] text-zamrud-100"><span>Ke tahap {s.lvl.next.name}</span><span>{s.lvl.progress}%</span></div><Progress value={s.lvl.progress} tone="emas" className="!bg-white/15" /></div>}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-2xl bg-white/10 p-2"><div className="text-lg font-extrabold">{today}</div>dijawab hari ini</div>
          <div className="rounded-2xl bg-white/10 p-2"><div className="text-lg font-extrabold">{s.acc}%</div>ketepatan</div>
          <div className="rounded-2xl bg-white/10 p-2"><div className="text-lg font-extrabold">{s.streak}</div>hari istiqamah</div>
        </div>
      </section>

      {/* Cabaran harian & tindakan pantas */}
      <section className="grid gap-3 sm:grid-cols-2">
        <button onClick={() => go({ mode: "harian" })} className="card flex items-center gap-4 p-4 text-left">
          <span className={cx("grid h-14 w-14 shrink-0 place-items-center rounded-2xl", daily ? "bg-zamrud-50 text-zamrud-700" : "bg-emas-100 text-emas-700")}>{daily ? <CheckCircle2 size={28} /> : <CalendarDays size={28} />}</span>
          <span className="flex-1"><span className="block text-xs font-extrabold uppercase tracking-wide text-emas-700 dark:text-emas-300">Cabaran Harian</span><span className="block font-extrabold">{daily ? "Selesai hari ini — cuba lagi?" : "10 soalan untuk hari ini"}</span><span className="text-xs text-slate-500">Soalan sama untuk semua profil hari ini</span></span>
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => go({ mode: "pantas" })} className="card flex flex-col items-start gap-1.5 p-4 text-left"><Zap className="text-emas-600" /><b>Kuiz Pantas</b><span className="text-xs text-slate-500">10 soalan rawak</span></button>
          <button onClick={() => go({ mode: "murajaah" })} className="card relative flex flex-col items-start gap-1.5 p-4 text-left" disabled={!due}>
            <RotateCcw className="text-rose-500" /><b>Ulang Salah</b><span className={cx("text-xs", due ? "font-bold text-rose-600" : "text-slate-500")}>{due ? `${due} menunggu` : "Tiada buat masa ini"}</span>
          </button>
        </div>
      </section>
      {s.weak.length > 0 && (
        <button onClick={() => go({ mode: "lemah", n: 10 })} className="card flex w-full items-center gap-3 p-4 text-left">
          <Target className="shrink-0 text-rose-500" /><span className="flex-1 text-sm"><b>Fokus Kelemahan:</b> {s.weak.map((w) => BAB.find((b) => b.id === w.chapterId)?.tajuk).join(", ")}</span><Play size={18} className="text-zamrud-600" />
        </button>
      )}

      {/* Bab */}
      <section>
        <div className="mb-3 flex items-baseline justify-between"><h2 className="text-lg font-extrabold">Kuiz ikut bab</h2><span className="text-xs text-slate-500">★★★ = bab dikuasai</span></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BAB.map((b) => {
            const st = s.stats.find((x) => x.chapterId === b.id)!;
            return (
              <Card key={b.id} className="flex flex-col p-3.5">
                <button onClick={() => go({ mode: "bab", bab: b.id, n: 10 })} className="flex flex-1 flex-col items-start gap-2 text-left" aria-label={`Mula kuiz Bab ${b.no}: ${b.tajuk}`}>
                  <div className="flex w-full items-start justify-between"><BabIcon name={b.ikon} tile size={26} /><span className="text-[11px] font-bold text-slate-400">Bab {b.no}</span></div>
                  <b className="text-sm leading-tight">{b.tajuk}</b>
                  <span className="mt-auto flex w-full items-center justify-between"><Stars n={st.stars} className="text-base" /><span className="text-[11px] text-slate-400">{counts.get(b.id) ?? 0} soalan</span></span>
                </button>
                <Link to={`/nota/${b.id}`} className="mt-2 rounded-xl bg-zamrud-50 py-1.5 text-center text-xs font-bold text-zamrud-800 dark:bg-white/5 dark:text-zamrud-200">Nota</Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Kuiz suai */}
      <Card className="p-4">
        <button className="flex w-full items-center gap-2 text-left font-extrabold" onClick={() => setOpen(!open)} aria-expanded={open}><SlidersHorizontal size={18} className="text-zamrud-600" /><span className="flex-1">Kuiz suai (pilih sendiri)</span><ChevronDown className={cx("transition", open && "rotate-180")} size={18} /></button>
        {open && (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div><label className="label" htmlFor="f-bab">Bab</label><select id="f-bab" className="input" value={bab} onChange={(e) => setBab(e.target.value)}><option value="">Semua bab</option>{BAB.map((b) => <option key={b.id} value={b.id}>Bab {b.no}: {b.tajuk}</option>)}</select></div>
            <div><label className="label" htmlFor="f-jenis">Jenis soalan</label><select id="f-jenis" className="input" value={jenis} onChange={(e) => setJenis(e.target.value as QType | "")}>{Object.entries(TYPE_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
            <div><label className="label" htmlFor="f-n">Bilangan</label><select id="f-n" className="input" value={n} onChange={(e) => setN(Number(e.target.value))}>{[5, 10, 20, 30].map((x) => <option key={x} value={x}>{x} soalan</option>)}<option value={0}>Semua ({poolN})</option></select></div>
            <button className="btn btn-primary sm:col-span-3" disabled={!poolN} onClick={() => go({ mode: "bab", bab, jenis, n })}><Play size={18} /> Mula ({Math.min(n || poolN, poolN)} soalan)</button>
          </div>
        )}
      </Card>
    </div>
  );
}
