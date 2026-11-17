import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Play, RefreshCw, Shuffle } from "lucide-react";
import { useDb, useMe } from "../lib/store";
import { markNoteRead } from "../lib/actions";
import { toParams } from "../lib/practice";
import { BAB, FAKTA, SENARAI, PASANGAN, KELAS } from "../data";
import { BabIcon } from "../components/icons";
import { Arabic, Card, Tabs, Unverified, cx, toast } from "../components/ui";
import { shuffle } from "../lib/util";
import type { Fakta } from "../data/fakta/types";

export default function NotaBab() { const { id } = useParams(); return <NotaBabInner key={id} id={id} />; }

function NotaBabInner({ id }: { id?: string }) {
  const me = useMe()!; const d = useDb();
  const b = BAB.find((x) => x.id === id);
  const [tab, setTab] = useState<"nota" | "kad">("nota");
  if (!b) return <Navigate to="/nota" replace />;
  const read = d.notes.some((n) => n.userId === me.id && n.chapterId === b.id && n.read.length);
  const fakta = FAKTA.filter((f) => f.bab === b.no);
  const groups = [...new Set(fakta.map((f) => f.kumpulan))];
  const senarai = SENARAI.filter((s) => s.bab === b.no);
  const pasangan = PASANGAN.filter((p) => p.bab === b.no);
  const kelas = KELAS.filter((k) => k.bab === b.no);
  const prev = BAB.find((x) => x.no === b.no - 1); const next = BAB.find((x) => x.no === b.no + 1);

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/nota" className="mb-3 inline-flex min-h-[40px] items-center gap-1 text-sm font-bold text-zamrud-700 dark:text-zamrud-300"><ArrowLeft size={16} /> Semua bab</Link>
      <div className="hero mb-4 rounded-3xl p-5 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/90"><BabIcon name={b.ikon} size={34} /></span>
          <div className="min-w-0 flex-1"><div className="text-xs text-zamrud-100">Bab {b.no}</div><h1 className="text-xl font-extrabold leading-tight">{b.tajuk}</h1><div className="font-arab text-xl text-emas-100" dir="rtl">{b.arab}</div></div>
        </div>
        <p className="mt-2 text-sm text-zamrud-50">{b.ringkas}</p>
        <Link to={`/kuiz/sesi?${toParams({ mode: "bab", bab: b.id, n: 10 })}`} className="btn btn-gold mt-3"><Play size={16} /> Kuiz bab ini</Link>
      </div>

      <Tabs tabs={[{ id: "nota", label: "Nota" }, { id: "kad", label: "Kad imbas" }]} value={tab} onChange={setTab} />

      {tab === "kad" ? <Flashcards fakta={fakta} /> : (
        <div className="space-y-5">
          {groups.map((g) => (
            <section key={g}>
              <h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-zamrud-700 dark:text-zamrud-300">{g}</h2>
              <div className="space-y-3">{fakta.filter((f) => f.kumpulan === g).map((f) => <FaktaCard key={f.id} f={f} />)}</div>
            </section>
          ))}
          {senarai.length > 0 && <section><h2 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-zamrud-700 dark:text-zamrud-300">Senarai</h2>
            <div className="grid gap-3 sm:grid-cols-2">{senarai.map((s) => (
              <Card key={s.id} className="p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2"><b>{s.tajuk}</b>{s.sahkan && <Unverified />}</div>
                {s.tertib ? <ol className="list-decimal space-y-0.5 pl-5 text-sm">{s.item.map((x) => <li key={x}>{x}</li>)}</ol> : <ul className="list-disc space-y-0.5 pl-5 text-sm">{s.item.map((x) => <li key={x}>{x}</li>)}</ul>}
                {s.nota && <p className="mt-2 text-xs text-slate-500">{s.nota}</p>}
              </Card>
            ))}</div></section>}
          {pasangan.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 p-4 pb-2"><b>{p.tajuk}</b>{p.sahkan && <Unverified />}</div>
              <div className="overflow-x-auto"><table className="tbl"><thead><tr><th>{p.kiri}</th><th>{p.kanan}</th></tr></thead><tbody>{p.pasangan.map(([l, r]) => <tr key={l}><td className="font-bold">{l}</td><td>{r}</td></tr>)}</tbody></table></div>
              {p.nota && <p className="p-4 pt-2 text-xs text-slate-500">{p.nota}</p>}
            </Card>
          ))}
          {kelas.length > 0 && (
            <Card className="overflow-hidden">
              <div className="p-4 pb-2 font-bold">Contoh kenal pasti hukum</div>
              <div className="overflow-x-auto"><table className="tbl"><thead><tr><th>Pernyataan</th><th>Hukum</th></tr></thead><tbody>{kelas.map((k) => <tr key={k.id}><td>{k.pernyataan}{k.sebab && <div className="text-xs text-slate-500">{k.sebab}</div>}</td><td className="font-bold">{k.jawapan}</td></tr>)}</tbody></table></div>
            </Card>
          )}

          <Card className="flex flex-wrap items-center gap-3 p-4">
            {read ? <span className="inline-flex items-center gap-2 font-bold text-zamrud-700 dark:text-zamrud-300"><CheckCircle2 /> Nota bab ini telah dibaca</span>
              : <button className="btn btn-primary" onClick={() => { markNoteRead(me.id, b.id); toast("+10 ★ — nota dibaca"); }}><CheckCircle2 size={18} /> Saya sudah baca nota ini</button>}
            <span className="text-xs text-slate-500">Membaca nota diperlukan untuk ★★★ bab.</span>
          </Card>
          <div className="flex justify-between gap-2">
            {prev ? <Link className="btn btn-outline" to={`/nota/${prev.id}`}><ArrowLeft size={16} /> Bab {prev.no}</Link> : <span />}
            {next && <Link className="btn btn-outline" to={`/nota/${next.id}`}>Bab {next.no} <ArrowRight size={16} /></Link>}
          </div>
        </div>
      )}
    </div>
  );
}

function FaktaCard({ f }: { f: Fakta }) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-extrabold">{f.nama}</h3>
        {f.arab && <span className="font-arab text-xl text-zamrud-700 dark:text-emas-200" dir="rtl">{f.arab}</span>}
      </div>
      <p className="mt-1 text-[15px]">{f.makna}</p>
      {f.lawan && <p className="mt-2 rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-900 dark:bg-rose-500/10 dark:text-rose-100"><b>Lawan:</b> {f.lawan.nama} {f.lawan.arab && <span className="font-arab" dir="rtl">{f.lawan.arab}</span>} — {f.lawan.makna}</p>}
      {f.dalil?.map((d) => <Arabic key={d.arab} className="mt-2" refText={d.rujukan} maksud={d.maksud}>{d.arab}</Arabic>)}
      {f.nota && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.nota}</p>}
      {f.sahkan && <div className="mt-2"><Unverified /></div>}
    </Card>
  );
}

function Flashcards({ fakta }: { fakta: Fakta[] }) {
  const [order, setOrder] = useState(() => fakta.map((_, i) => i));
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false);
  const cards = useMemo(() => order.map((k) => fakta[k]), [order, fakta]);
  const f = cards[i];
  if (!f) return null;
  const go = (n: number) => { setFlip(false); setI((n + cards.length) % cards.length); };
  return (
    <div className="mx-auto max-w-md">
      <button className={cx("flip block w-full text-left", flip && "on")} onClick={() => setFlip(!flip)} aria-label={flip ? "Tunjuk depan kad" : "Terbalikkan kad"}>
        <div className="flip-inner min-h-[260px]">
          <div className="flip-face card grid min-h-[260px] place-items-center p-6 text-center">
            <div><div className="text-xs font-bold text-slate-400">{f.kumpulan}</div><div className="mt-2 text-2xl font-extrabold">{f.nama}</div>{f.arab && <div className="font-arab mt-2 text-3xl text-zamrud-700 dark:text-emas-200" dir="rtl">{f.arab}</div>}<div className="mt-4 text-xs text-slate-400">Tekan untuk lihat jawapan</div></div>
          </div>
          <div className="flip-face flip-back card grid place-items-center overflow-auto bg-zamrud-50 p-6 text-center dark:bg-malam-900">
            <div><div className="font-bold">{f.makna}</div>{f.lawan && <div className="mt-3 text-sm text-rose-700 dark:text-rose-300">Lawan: <b>{f.lawan.nama}</b> — {f.lawan.makna}</div>}</div>
          </div>
        </div>
      </button>
      <div className="mt-4 flex items-center justify-between gap-2">
        <button className="btn btn-outline" onClick={() => go(i - 1)} aria-label="Kad sebelum"><ArrowLeft size={18} /></button>
        <span className="text-sm font-bold tabular-nums text-slate-500">{i + 1} / {cards.length}</span>
        <button className="btn btn-outline" onClick={() => go(i + 1)} aria-label="Kad seterusnya"><ArrowRight size={18} /></button>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button className="btn btn-ghost" onClick={() => { setOrder(shuffle(order)); setI(0); setFlip(false); }}><Shuffle size={16} /> Kocok</button>
        <button className="btn btn-ghost" onClick={() => { setOrder(fakta.map((_, k) => k)); setI(0); setFlip(false); }}><RefreshCw size={16} /> Susunan asal</button>
      </div>
    </div>
  );
}
