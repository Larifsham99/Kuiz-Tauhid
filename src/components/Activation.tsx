import { useState } from "react";
import { KeyRound, ShoppingBag, PlayCircle } from "lucide-react";
import { activate } from "../lib/activation";
import { sfx } from "../lib/sound";
import { Logo, BUY_URL, DEMO_URL } from "./brand";
import { HeroVerse } from "../pages/Welcome";

/** Skrin kunci: aplikasi memerlukan kod pengaktifan yang sah. Cubaan percuma ada di halaman jualan. */
export function ActivationGate() {
  const [code, setCode] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const r = await activate(code); setBusy(false);
    if (r) { setErr(r); sfx.wrong(); } else sfx.complete(true);
  }
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-8">
      <div className="mb-6 flex justify-center"><Logo className="scale-125" /></div>
      <HeroVerse />
      <form onSubmit={submit} className="card space-y-4 p-5">
        <div>
          <h1 className="text-lg font-extrabold">Masukkan kod pengaktifan</h1>
          <p className="text-sm text-slate-500">Kod dihantar kepada anda selepas pembelian. Atau tekan sahaja pautan aktivasi yang diberikan.</p>
        </div>
        <input id="kod" aria-label="Kod pengaktifan" className="input text-center font-mono text-lg uppercase tracking-widest" placeholder="KT-XXXX-XXXX-XXXX" autoComplete="off" autoCapitalize="characters" spellCheck={false}
          value={code} onChange={(e) => { setCode(e.target.value); setErr(""); }} autoFocus />
        {err && <p className="text-sm font-bold text-rose-600" role="alert">{err}</p>}
        <button className="btn btn-primary w-full !py-3 text-base" disabled={busy || code.trim().length < 12}><KeyRound size={18} /> {busy ? "Menyemak…" : "Aktifkan"}</button>
        <div className="grid grid-cols-2 gap-2">
          <a href={BUY_URL} className="btn btn-gold !px-2"><ShoppingBag size={16} /> Dapatkan kod</a>
          <a href={DEMO_URL} className="btn btn-ghost !px-2"><PlayCircle size={16} /> Cuba 3 soalan</a>
        </div>
        <p className="text-center text-xs text-slate-500">Satu kod untuk satu peranti — semua profil pada peranti itu turut dibuka.</p>
      </form>
    </div>
  );
}
