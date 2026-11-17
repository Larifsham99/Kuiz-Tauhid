import { useRef, useState } from "react";
import { UserRound, Download, Upload, Trash2, Moon, Sun, Monitor, Volume2, VolumeX, Pencil } from "lucide-react";
import { useDb, useMe, updateSettings, editProfile, deleteProfile, exportJSON, importJSON, resetAll } from "../lib/store";
import { useActivation, formatCode } from "../lib/activation";
import { QUESTIONS } from "../data";
import { AVATARS } from "../components/icons";
import { APP_NAME, VERSION } from "../components/brand";
import { Card, Modal, PageHeader, cx, toast } from "../components/ui";
import { download } from "../lib/util";
import { sfx } from "../lib/sound";

export default function Profil() {
  const me = useMe()!; const d = useDb(); const act = useActivation();
  const [edit, setEdit] = useState(false); const [name, setName] = useState(me.name); const [avatar, setAvatar] = useState(me.avatar);
  const [confirm, setConfirm] = useState<"" | "padam" | "reset">("");
  const file = useRef<HTMLInputElement>(null);
  const st = d.settings;
  const unverified = QUESTIONS.filter((q) => q.unverified).length;
  return (
    <div className="space-y-4">
      <PageHeader title="Profil & tetapan" icon={<UserRound />} />
      <Card className="flex items-center gap-4 p-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-zamrud-50 text-4xl dark:bg-white/10">{me.avatar}</span>
        <span className="flex-1"><b className="block text-lg">{me.name}</b><span className="text-xs text-slate-500">{d.profiles.length} profil dalam peranti ini</span></span>
        <button className="btn btn-ghost" onClick={() => { setName(me.name); setAvatar(me.avatar); setEdit(true); }}><Pencil size={16} /> Ubah</button>
      </Card>

      <Card className="space-y-4 p-4">
        <b className="block">Tetapan</b>
        <div><div className="label">Tema</div><div className="grid grid-cols-3 gap-2">
          {([["light", "Cerah", Sun], ["dark", "Gelap", Moon], ["system", "Ikut peranti", Monitor]] as const).map(([k, v, I]) => <button key={k} onClick={() => updateSettings({ theme: k })} className={cx("btn", st.theme === k ? "btn-primary" : "btn-outline")}><I size={16} />{v}</button>)}
        </div></div>
        <div><label className="label" htmlFor="saiz-arab">Saiz tulisan Arab: {st.arabicSize}px</label><input id="saiz-arab" type="range" min={20} max={44} step={2} value={st.arabicSize} onChange={(e) => updateSettings({ arabicSize: Number(e.target.value) })} className="w-full accent-zamrud-600" /><div className="arab-block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div></div>
        <button className="flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 ring-slate-200 dark:ring-white/10" onClick={() => { updateSettings({ sound: !st.sound }); if (!st.sound) setTimeout(() => sfx.correct(), 50); }} role="switch" aria-checked={st.sound}>
          {st.sound ? <Volume2 className="text-zamrud-600" /> : <VolumeX className="text-slate-400" />}<span className="flex-1"><b className="block">Kesan bunyi</b><span className="text-xs text-slate-500">{st.sound ? "Hidup" : "Mati"}</span></span>
          <span className={cx("h-6 w-11 rounded-full p-0.5 transition", st.sound ? "bg-zamrud-600" : "bg-slate-300")}><span className={cx("block h-5 w-5 rounded-full bg-white transition", st.sound && "translate-x-5")} /></span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-2xl p-3 text-left ring-1 ring-slate-200 dark:ring-white/10" onClick={() => updateSettings({ includeUnverified: !st.includeUnverified })} role="switch" aria-checked={st.includeUnverified}>
          <span className="text-lg text-amber-600" aria-hidden>⚠</span><span className="flex-1"><b className="block">Sertakan soalan "perlu disahkan"</b><span className="text-xs text-slate-500">{unverified} soalan daripada fakta yang masih menunggu pengesahan penyemak. Lalai: tidak disertakan.</span></span>
          <span className={cx("h-6 w-11 shrink-0 rounded-full p-0.5 transition", st.includeUnverified ? "bg-amber-500" : "bg-slate-300")}><span className={cx("block h-5 w-5 rounded-full bg-white transition", st.includeUnverified && "translate-x-5")} /></span>
        </button>
      </Card>

      <Card className="space-y-3 p-4">
        <b className="block">Sandaran data</b>
        <p className="text-xs text-slate-500">Data disimpan dalam peranti ini sahaja. Simpan sandaran sebelum menukar telefon atau mengosongkan pelayar.</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-outline" onClick={() => { download(`kuiz-tauhid-sandaran-${new Date().toISOString().slice(0, 10)}.json`, exportJSON(), "application/json"); toast("Sandaran dimuat turun"); }}><Download size={16} /> Simpan</button>
          <button className="btn btn-outline" onClick={() => file.current?.click()}><Upload size={16} /> Pulihkan</button>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={async (e) => { const f = e.target.files?.[0]; if (!f) return; const err = importJSON(await f.text()); toast(err ?? "Data dipulihkan", err ? "err" : "ok"); e.target.value = ""; }} />
        </div>
      </Card>

      <Card className="space-y-2 p-4 text-sm">
        <b className="block">Tentang</b>
        <p>{APP_NAME} v{VERSION} — {QUESTIONS.length - unverified} soalan disahkan untuk dimainkan, dijana daripada Bank Fakta 12 bab.</p>
        <p className="text-slate-500">Berpandukan akidah Ahli Sunnah wal Jamaah (Asya'irah). Aplikasi ini bahan sokongan ulang kaji dan tidak menggantikan pengajian bersama guru.</p>
        {act.code && <p className="text-xs text-slate-500">Kod pengaktifan: <span className="font-mono">{formatCode(act.code)}</span></p>}
      </Card>

      <Card className="grid gap-2 p-4 sm:grid-cols-2">
        <button className="btn btn-outline text-rose-600" onClick={() => setConfirm("padam")}><Trash2 size={16} /> Padam profil ini</button>
        <button className="btn btn-outline text-rose-600" onClick={() => setConfirm("reset")}><Trash2 size={16} /> Padam semua data</button>
      </Card>

      <Modal open={edit} onClose={() => setEdit(false)} title="Ubah profil">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (!name.trim()) return; editProfile(me.id, { name: name.trim().slice(0, 40), avatar }); setEdit(false); toast("Profil dikemas kini"); }}>
          <div><label className="label" htmlFor="e-nama">Nama</label><input id="e-nama" className="input" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid grid-cols-6 gap-2">{AVATARS.map((a) => <button type="button" key={a} aria-label={`Avatar ${a}`} aria-pressed={a === avatar} onClick={() => setAvatar(a)} className={cx("grid aspect-square place-items-center rounded-xl text-2xl ring-1", a === avatar ? "bg-zamrud-50 ring-2 ring-zamrud-600" : "ring-slate-200 dark:ring-white/10")}>{a}</button>)}</div>
          <button className="btn btn-primary w-full" disabled={!name.trim()}>Simpan</button>
        </form>
      </Modal>
      <Modal open={!!confirm} onClose={() => setConfirm("")} title={confirm === "padam" ? `Padam profil ${me.name}?` : "Padam semua data?"}>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{confirm === "padam" ? "Semua markah, bintang dan lencana profil ini akan dipadam. Tindakan ini tidak boleh dibatalkan." : "Semua profil dan rekod dalam peranti ini akan dipadam. Kod pengaktifan kekal."}</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-outline" onClick={() => setConfirm("")}>Batal</button>
          <button className="btn btn-danger" onClick={() => { if (confirm === "padam") deleteProfile(me.id); else resetAll(); setConfirm(""); toast("Dipadam"); }}>Ya, padam</button>
        </div>
      </Modal>
    </div>
  );
}
