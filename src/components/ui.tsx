import { type ReactNode, useEffect, useState, Fragment } from "react";
import { X } from "lucide-react";
import { ARABIC_RE } from "../lib/util";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export function Card({ children, className, ...p }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("card", className)} {...p}>{children}</div>;
}

export function PageHeader({ title, subtitle, icon, actions }: { title: string; subtitle?: string; icon?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 rise">
      <div className="flex items-center gap-3">
        {icon && <div className="grid h-12 w-12 place-items-center rounded-2xl bg-zamrud-600 text-white shadow-lg shadow-zamrud-600/25">{icon}</div>}
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-malam-900 dark:text-white sm:text-2xl">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Progress({ value, className, tone = "zamrud" }: { value: number; className?: string; tone?: "zamrud" | "emas" | "rose" }) {
  const c = tone === "emas" ? "bg-emas-500" : tone === "rose" ? "bg-rose-500" : "bg-zamrud-600";
  return <div className={cx("h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10", className)} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}><div className={cx("h-full rounded-full transition-all duration-500", c)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

/** ★★★ penguasaan bab (bintang kosong dipaparkan pudar). */
export function Stars({ n, className }: { n: number; className?: string }) {
  return <span className={cx("inline-flex gap-0.5 tracking-tight", className)} aria-label={`${n} daripada 3 bintang`}>{[1, 2, 3].map((i) => <span key={i} className={i <= n ? "text-emas-500" : "text-slate-300 dark:text-white/15"}>★</span>)}</span>;
}

export function Stat({ label, value, icon, hint }: { label: string; value: ReactNode; icon?: ReactNode; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"><span className="min-w-0 truncate">{label}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-zamrud-50 text-zamrud-700 dark:bg-white/10 dark:text-zamrud-200">{icon}</span></div>
      <div className="mt-2 text-2xl font-extrabold text-malam-900 dark:text-white">{value}</div>
      {hint && <div className="text-xs text-slate-500">{hint}</div>}
    </Card>
  );
}

/** Sambutan bintang ringan apabila jawapan betul. */
export function Celebrate() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-0" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="burst text-xl text-emas-300" style={{ ["--dx" as string]: `${(i - 2.5) * 46}px`, ["--dy" as string]: `${-36 - (i % 3) * 24}px`, ["--r" as string]: `${(i - 3) * 30}deg`, animationDelay: `${i * 40}ms` }}>★</span>)}
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === "Escape" && onClose(); if (open) window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div className="pop max-h-[92vh] w-full overflow-auto rounded-t-3xl bg-white p-5 shadow-2xl dark:bg-malam-900 sm:max-w-lg sm:rounded-3xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal aria-label={title}>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><button className="grid h-10 w-10 place-items-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10" onClick={onClose} aria-label="Tutup"><X size={18} /></button></div>
        {children}
      </div>
    </div>
  );
}

export function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: ReactNode }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="mb-4 flex gap-1 overflow-x-auto rounded-2xl bg-white p-1 ring-1 ring-malam-900/5 dark:bg-white/5" role="tablist">
      {tabs.map((t) => (
        <button key={t.id} role="tab" aria-selected={value === t.id} onClick={() => onChange(t.id)} className={cx("min-h-[40px] whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition", value === t.id ? "bg-zamrud-600 text-white shadow" : "text-slate-600 hover:bg-zamrud-50 dark:text-slate-300 dark:hover:bg-white/5")}>{t.label}</button>
      ))}
    </div>
  );
}

export function Empty({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
  return <div className="card flex flex-col items-center gap-2 p-8 text-center">{icon && <div className="text-zamrud-600">{icon}</div>}<div className="font-bold">{title}</div><div className="text-sm text-slate-500">{children}</div></div>;
}

/** Teks bercampur Rumi + Arab; menyokong **tebal**. Baris dominan Arab dipaparkan RTL. */
export function RichText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cx("space-y-1", className)}>
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />;
        const arabChars = (line.match(new RegExp(ARABIC_RE.source, "g")) || []).length;
        const latin = (line.match(/[A-Za-z]/g) || []).length;
        if (arabChars > 6 && latin < 4) return <div key={i} className="arab-block">{line}</div>;
        return <div key={i} className="rich-line leading-relaxed">{renderInline(line)}</div>;
      })}
    </div>
  );
}
function renderInline(line: string) {
  // Tebal (**…**) dahulu, kemudian larian Arab dalam setiap bahagian (ﷺ kekal sebaris dengan teks biasa)
  return line.split(/(\*\*[^*]+\*\*)/).map((seg, i) => {
    if (!seg) return null;
    const bold = seg.startsWith("**") && seg.endsWith("**") && seg.length > 4;
    const body = bold ? seg.slice(2, -2) : seg;
    const parts = body.split(/([؀-ۿݐ-ݿࢠ-ࣿﭐ-ﷹﷻ-﷿ﹰ-﻿](?:[؀-ۿݐ-ݿࢠ-ࣿﭐ-ﷹﷻ-﷿ﹰ-﻿\s۞ـ،؛]*[؀-ۿݐ-ݿࢠ-ࣿﭐ-ﷹﷻ-﷿ﹰ-﻿])?)/);
    const inner = parts.map((p, j) => (p && j % 2 === 1 && p.trim() !== "ﷺ" ? <span key={j} dir="rtl" className="arab-inline">{p}</span> : p));
    return bold ? <strong key={i}>{inner}</strong> : <Fragment key={i}>{inner}</Fragment>;
  });
}

export function Arabic({ children, refText, maksud, className }: { children: string; refText?: string; maksud?: string; className?: string }) {
  return (
    <div className={cx("rounded-2xl bg-emas-50 px-4 py-3 ring-1 ring-emas-200 dark:bg-white/5 dark:ring-emas-500/20", className)}>
      <div className="arab-block text-malam-900 dark:text-emas-100">{children}</div>
      {maksud && <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Maksudnya: “{maksud}”</div>}
      {refText && <div className="mt-1 text-right text-xs font-semibold text-emas-700 dark:text-emas-300">({refText})</div>}
    </div>
  );
}

export function Unverified({ className }: { className?: string }) {
  return <span className={cx("chip bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200", className)} title="Fakta ini ditanda untuk pengesahan penyemak">⚠ Perlu disahkan</span>;
}

// ---------- Toast ----------
type Toast = { id: number; text: string; tone: "ok" | "err" | "info" };
let pushToast: (t: Omit<Toast, "id">) => void = () => {};
export const toast = (text: string, tone: Toast["tone"] = "ok") => pushToast({ text, tone });
export function Toaster() {
  const [items, set] = useState<Toast[]>([]);
  useEffect(() => { pushToast = (t) => { const id = Date.now() + Math.random(); set([{ ...t, id }]); setTimeout(() => set((s) => s.filter((x) => x.id !== id)), 2600); }; }, []);
  return <div className="pointer-events-none fixed inset-x-0 top-16 z-[60] flex flex-col items-center gap-2 px-4" role="status" aria-live="polite">{items.map((t) => <div key={t.id} className={cx("pop pointer-events-auto rounded-2xl px-4 py-2.5 text-sm font-bold shadow-xl", t.tone === "ok" ? "bg-zamrud-800 text-white" : t.tone === "err" ? "bg-rose-600 text-white" : "bg-malam-900 text-emas-100")}>{t.text}</div>)}</div>;
}

export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[minmax(0,9rem)_1fr_3rem] items-center gap-2 text-xs">
          <div className="truncate text-slate-600 dark:text-slate-300" title={d.label}>{d.label}</div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className={cx("h-full rounded-full", d.value >= 85 ? "bg-zamrud-600" : d.value >= 60 ? "bg-emas-500" : "bg-rose-400")} style={{ width: `${Math.min(100, d.value)}%` }} /></div>
          <div className="text-right font-bold tabular-nums">{d.value}%</div>
        </div>
      ))}
    </div>
  );
}
