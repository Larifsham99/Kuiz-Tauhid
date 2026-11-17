import { useState } from "react";
import { createProfile, useDB } from "../lib/store";
import { Logo } from "../components/brand";
import { AVATARS } from "../components/icons";
import { cx } from "../components/ui";
import { QUESTIONS } from "../data";

export function ProfileForm({ onDone, submitLabel = "Mula menjawab" }: { onDone?: () => void; submitLabel?: string }) {
  const [name, setName] = useState("");
  const n = useDB((d) => d.profiles.length);
  const [avatar, setAvatar] = useState(AVATARS[n % AVATARS.length]);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; createProfile(name, avatar); onDone?.(); }} className="space-y-4">
      <div>
        <label className="label" htmlFor="nama">Nama paparan</label>
        <input id="nama" className="input text-base" placeholder="cth: Aisyah" maxLength={40} value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </div>
      <fieldset>
        <legend className="label">Pilih avatar</legend>
        <div className="grid grid-cols-6 gap-2">{AVATARS.map((a) => <button type="button" key={a} aria-label={`Avatar ${a}`} aria-pressed={a === avatar} onClick={() => setAvatar(a)} className={cx("grid aspect-square place-items-center rounded-xl text-2xl ring-1 transition", a === avatar ? "bg-zamrud-50 ring-2 ring-zamrud-600 dark:bg-zamrud-500/20" : "ring-slate-200 dark:ring-white/10")}>{a}</button>)}</div>
      </fieldset>
      <button className="btn btn-primary w-full !py-3 text-base" disabled={!name.trim()}>{submitLabel}</button>
    </form>
  );
}

export function HeroVerse() {
  return (
    <div className="hero mb-5 rounded-3xl p-6 text-center text-white shadow-xl">
      <div className="font-arab text-4xl text-emas-100" dir="rtl">رَبِّ زِدْنِي عِلْمًا</div>
      <div className="mt-1 text-xs text-zamrud-100">“Ya Tuhanku, tambahkanlah ilmuku.” (Taha: 114)</div>
    </div>
  );
}

export default function Welcome() {
  const total = QUESTIONS.filter((q) => !q.unverified).length;
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-8">
      <div className="mb-6 flex justify-center"><Logo className="scale-125" /></div>
      <HeroVerse />
      <div className="mb-5 grid grid-cols-3 gap-2 text-center">
        <div className="card p-3"><div className="text-xl font-extrabold text-zamrud-700 dark:text-zamrud-300">{total}</div><div className="text-[11px] text-slate-500">soalan</div></div>
        <div className="card p-3"><div className="text-xl font-extrabold text-zamrud-700 dark:text-zamrud-300">12</div><div className="text-[11px] text-slate-500">bab asas</div></div>
        <div className="card p-3"><div className="text-xl font-extrabold text-emas-600">★★★</div><div className="text-[11px] text-slate-500">setiap bab</div></div>
      </div>
      <div className="card p-5">
        <h1 className="mb-1 text-lg font-extrabold">Ahlan wa sahlan!</h1>
        <p className="mb-4 text-sm text-slate-500">Tiada pendaftaran. Data anda disimpan dalam peranti ini sahaja.</p>
        <ProfileForm />
      </div>
    </div>
  );
}
