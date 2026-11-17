import { useState } from "react";
import { Trophy, Target, CheckCircle2, Flame, Medal } from "lucide-react";
import { useDb, useMe } from "../lib/store";
import { BADGES, LEVELS, leaderboard, summary, type Board } from "../lib/gamification";
import { BAB } from "../data";
import { BabIcon, BadgeIcon } from "../components/icons";
import { BarChart, Card, PageHeader, Progress, Stars, Stat, Tabs, cx } from "../components/ui";
import { fmtDate } from "../lib/util";

export default function Skor() {
  const me = useMe()!; const d = useDb(); const s = summary(d, me.id);
  const [tab, setTab] = useState<"prestasi" | "lencana" | "papan" | "sejarah">("prestasi");
  const [board, setBoard] = useState<Board>("keseluruhan");
  const mine = new Map(d.badges.filter((b) => b.userId === me.id).map((b) => [b.badgeId, b.ts]));
  const runs = d.runs.filter((r) => r.userId === me.id).slice(-30).reverse();
  return (
    <div>
      <PageHeader title="Skor & kemajuan" subtitle={`${me.name} · Tahap ${s.lvl.level.name}`} icon={<Trophy />} />
      <Tabs tabs={[{ id: "prestasi", label: "Prestasi" }, { id: "lencana", label: `Lencana (${mine.size}/${BADGES.length})` }, { id: "papan", label: "Papan skor" }, { id: "sejarah", label: "Sejarah" }]} value={tab} onChange={setTab} />

      {tab === "prestasi" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Bintang" value={`★ ${s.xp.toLocaleString("ms-MY")}`} icon={<Medal size={16} />} />
            <Stat label="Dijawab" value={s.answered} icon={<CheckCircle2 size={16} />} hint={`${s.correct} betul`} />
            <Stat label="Ketepatan" value={`${s.acc}%`} icon={<Target size={16} />} />
            <Stat label="Istiqamah" value={`${s.streak} hari`} icon={<Flame size={16} />} />
          </div>
          <Card className="p-4">
            <div className="flex items-center justify-between"><b>Tahap: {s.lvl.level.name} <span className="font-arab">{s.lvl.level.arab}</span></b>{s.lvl.next && <span className="text-xs text-slate-500">Seterusnya: {s.lvl.next.name}</span>}</div>
            <Progress value={s.lvl.progress} tone="emas" className="mt-2 !h-3" />
            <p className="mt-2 text-xs text-slate-500">{s.lvl.next ? s.lvl.next.desc : "Tahap tertinggi dicapai. MasyaAllah!"}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{LEVELS.map((l, i) => <span key={l.id} className={cx("chip", i <= s.lvl.idx ? "bg-zamrud-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/5")}>{l.name}</span>)}</div>
          </Card>
          <Card className="p-4">
            <div className="mb-3 flex items-baseline justify-between"><b>Penguasaan ikut bab</b><span className="text-xs text-slate-500">{s.totalStars}/36 ★</span></div>
            <div className="space-y-2">
              {BAB.map((b) => { const st = s.stats.find((x) => x.chapterId === b.id)!; return (
                <div key={b.id} className="flex items-center gap-3"><BabIcon name={b.ikon} size={22} /><span className="min-w-0 flex-1 truncate text-sm font-semibold">{b.no}. {b.tajuk}</span><span className="text-xs tabular-nums text-slate-500">{st.attempts ? `${st.acc}%` : "—"}</span><Stars n={st.stars} /></div>
              ); })}
            </div>
            <p className="mt-3 text-xs text-slate-500">★ ≥5 soalan & 50% · ★★ ≥10 soalan & 70% · ★★★ ≥15 soalan, 85% & nota dibaca (ketepatan daripada 20 jawapan terkini).</p>
          </Card>
          {s.answered > 0 && <Card className="p-4"><b className="mb-3 block">Ketepatan bab yang telah dicuba</b><BarChart data={s.stats.filter((x) => x.attempts).map((x) => ({ label: BAB.find((b) => b.id === x.chapterId)!.tajuk, value: x.acc }))} /></Card>}
        </div>
      )}

      {tab === "lencana" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {BADGES.map((b) => { const ts = mine.get(b.id); return (
            <Card key={b.id} className={cx("flex items-center gap-3 p-4", !ts && "opacity-70")}>
              <BadgeIcon icon={b.icon} earned={!!ts} />
              <span className="flex-1"><b className="block">{b.name}</b><span className="text-xs text-slate-500">{b.desc}</span>{ts && <span className="block text-[11px] font-bold text-zamrud-700 dark:text-zamrud-300">Diperoleh {fmtDate(ts)}</span>}</span>
            </Card>
          ); })}
        </div>
      )}

      {tab === "papan" && (
        <Card className="p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">{([["keseluruhan", "Keseluruhan"], ["mingguan", "Minggu ini"], ["ketepatan", "Ketepatan"], ["istiqamah", "Istiqamah"]] as [Board, string][]).map(([k, v]) => <button key={k} onClick={() => setBoard(k)} className={cx("chip min-h-[34px] px-3", board === k ? "bg-zamrud-600 text-white" : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300")}>{v}</button>)}</div>
          <ol className="space-y-2">
            {leaderboard(d, board).map((r) => (
              <li key={r.id} className={cx("flex items-center gap-3 rounded-2xl p-3 ring-1", r.me ? "bg-zamrud-50 ring-zamrud-300 dark:bg-zamrud-500/10" : "ring-slate-100 dark:ring-white/5")}>
                <span className={cx("grid h-8 w-8 place-items-center rounded-full text-sm font-extrabold", r.rank === 1 ? "bg-emas-500 text-white" : "bg-slate-100 dark:bg-white/10")}>{r.rank}</span>
                <span className="text-2xl">{r.avatar}</span><span className="flex-1 font-bold">{r.name}{r.me && " (anda)"}</span><span className="text-sm font-bold text-slate-600 dark:text-slate-300">{r.label}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-slate-500">Papan skor membandingkan profil dalam peranti ini — sesuai untuk ahli keluarga. Tambah profil melalui avatar di atas.</p>
        </Card>
      )}

      {tab === "sejarah" && (
        <Card className="p-4">
          {runs.length ? <ul className="divide-y divide-slate-100 dark:divide-white/5">{runs.map((r) => (
            <li key={r.id} className="flex items-center gap-3 py-2.5 text-sm"><span className="flex-1"><b className="block">{r.title}</b><span className="text-xs text-slate-500">{fmtDate(r.ts)}</span></span><span className="font-extrabold tabular-nums">{Math.round(r.score * 10) / 10}/{r.total}</span></li>
          ))}</ul> : <p className="text-sm text-slate-500">Belum ada kuiz yang ditamatkan.</p>}
        </Card>
      )}
    </div>
  );
}
