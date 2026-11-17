import { cx } from "./ui";

export const APP_NAME = "Kuiz Tauhid";
export const TAGLINE = "Uji Ilmu, Mantapkan Akidah.";
export const VERSION = "1.0";
/** Halaman jualan (bahagian harga & cubaan percuma). */
export const BUY_URL = "./jualan/#harga";
export const DEMO_URL = "./jualan/#cuba";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect width="48" height="48" rx="13" fill="#0E7A5A" />
      <path d="M24 7l17 17-17 17L7 24zM12 12h24v24H12z" fill="#fff" />
      <path d="M24 18.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 1 1 0-11z" fill="#C99A2E" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cx("flex items-center gap-2", className)}>
      <LogoMark />
      <div className="leading-tight">
        <div className="text-[15px] font-extrabold tracking-tight text-malam-900 dark:text-white">Kuiz <span className="text-zamrud-600 dark:text-emas-300">Tauhid</span></div>
        <div className="hidden text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 sm:block">Uji Ilmu · Mantapkan Akidah</div>
      </div>
    </div>
  );
}
