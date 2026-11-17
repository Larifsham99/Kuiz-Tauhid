import { Sprout, ListOrdered, Star, Sun, Landmark, Feather, Heart, Users, Award, Trophy, Flame, RotateCcw, CalendarCheck, Target, Crown } from "lucide-react";
import type { BadgeIcon as BI } from "../lib/gamification";
import { cx } from "./ui";

/** 12 ikon bab — dua warna (zamrud + emas), dilukis sendiri, tiada emoji. */
const BAB_PATHS: Record<string, [string, string]> = {
  kitab: ["M6 12c6-2 12-1 18 3v24c-6-4-12-5-18-3zM42 12c-6-2-12-1-18 3v24c6-4 12-5 18-3z", "M24 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z"],
  akal: ["M24 5a12 12 0 0 0-7 21.7V31h14v-4.3A12 12 0 0 0 24 5z", "M18 34h12v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4z"],
  bintang: ["M24 5l19 19-19 19L5 24zM11 11h26v26H11z", "M24 18a6 6 0 1 1 0 12a6 6 0 1 1 0-12z"],
  cahaya: ["M24 14a10 10 0 1 1 0 20a10 10 0 1 1 0-20z", "M22 2h4v8h-4zM22 38h4v8h-4zM2 22h8v4H2zM38 22h8v4h-8zM8.5 11.3l2.8-2.8 5.7 5.7-2.8 2.8zM31 33.8l2.8-2.8 5.7 5.7-2.8 2.8zM31 14.2l5.7-5.7 2.8 2.8-5.7 5.7zM8.5 36.7l5.7-5.7 2.8 2.8-5.7 5.7z"],
  bulan: ["M30 5a19 19 0 1 0 13 31A16 16 0 0 1 30 5z", "M37 10l1.6 3.4 3.4 1.6-3.4 1.6-1.6 3.4-1.6-3.4-3.4-1.6 3.4-1.6z"],
  neraca: ["M22.5 6h3v34h-3zM8 13h32v3H8zM14 40h20v4H14z", "M3 27a8 5 0 0 0 16 0zM29 27a8 5 0 0 0 16 0zM10 16h2l-6 11H4zM36 16h2l6 11h-2z"],
  menara: ["M18 18h12v25H18zM14 43h20v3H14zM16 16h16v3H16z", "M24 3l6 9v4H18v-4z"],
  mahkota: ["M7 33L5 13l10 8 9-13 9 13 10-8-2 20z", "M7 36h34v6H7z"],
  sayap: ["M24 23C18 11 8 9 3 11c2 9 9 15 21 17zM24 23c6-12 16-14 21-12-2 9-9 15-21 17z", "M24 19a5 5 0 1 1 0 10a5 5 0 1 1 0-10z"],
  kubah: ["M8 31a16 16 0 0 1 32 0zM6 31h36v13H6z", "M23 6h2v9h-2zM24 3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 1 1 0-5zM20 36h8v8h-8z"],
  kurma: ["M22 22h4v23h-4z", "M24 22C20 12 10 10 5 14c8-2 13 2 19 8zM24 22c4-10 14-12 19-8-8-2-13 2-19 8zM24 22c-2-10 2-16 7-19-4 6-4 12-7 19z"],
  pintu: ["M9 45V22a15 15 0 0 1 30 0v23z", "M17 45V27a7 7 0 0 1 14 0v18z"],
};

export function BabIcon({ name, size = 28, tile, className }: { name: string; size?: number; tile?: boolean; className?: string }) {
  const [a, b] = BAB_PATHS[name] ?? BAB_PATHS.bintang;
  const svg = <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden className={tile ? undefined : className}><path d={a} className="fill-zamrud-600 dark:fill-zamrud-300" /><path d={b} fill="#C99A2E" /></svg>;
  if (!tile) return svg;
  return <span className={cx("grid shrink-0 place-items-center rounded-2xl bg-zamrud-50 dark:bg-white/10", className)} style={{ width: size * 1.6, height: size * 1.6 }}>{svg}</span>;
}

const BADGE_ICONS: Record<BI, typeof Star> = { sprout: Sprout, list: ListOrdered, star: Star, sun: Sun, landmark: Landmark, feather: Feather, heart: Heart, users: Users, award: Award, trophy: Trophy, flame: Flame, repeat: RotateCcw, calendar: CalendarCheck, target: Target, crown: Crown };
export function BadgeIcon({ icon, earned, size = 22 }: { icon: BI; earned: boolean; size?: number }) {
  const I = BADGE_ICONS[icon];
  return <span className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", earned ? "bg-emas-100 text-emas-700 ring-2 ring-emas-300 dark:bg-emas-500/20 dark:text-emas-200" : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-slate-500")}><I size={size} /></span>;
}

export const AVATARS = ["🌙", "⭐", "🌿", "📖", "🕌", "🌸", "🦋", "🐪", "🌴", "☀️", "💎", "🍃"];
