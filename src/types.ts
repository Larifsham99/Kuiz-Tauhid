// ===== Jenis data teras KUIZ TAUHID =====
import type { Status } from './data/fakta/types';
export type { Status };

/** mcq = ABCD · tf = Benar/Salah · match = padanan · order = susun ikut tertib */
export type QType = 'mcq' | 'tf' | 'match' | 'order';

export interface QOption { id: string; text: string }

export interface Question {
  id: string;
  type: QType;
  chapterId: string; // b1..b12
  /** ID item Bank Fakta asal — setiap soalan boleh dikesan kembali kepada fakta */
  faktaId: string;
  prompt: string;
  arabic?: string;
  arabicRef?: string;
  options?: QOption[];
  answer?: string; // mcq: id pilihan; tf: "B" | "S"
  pairs?: { left: string; right: string }[]; // match
  order?: string[]; // order: susunan betul
  /** Penerangan jawapan (diambil daripada fakta) */
  why: string;
  dalil?: { arab: string; rujukan: string; maksud?: string };
  /** true jika fakta asal ditanda ⚠️ perlu disahkan */
  unverified: boolean;
  status: Status;
}

// ----- Rekod -----
export interface Profile { id: string; name: string; avatar: string; createdAt: number }
export interface Attempt { id: string; userId: string; questionId: string; chapterId: string; correct: boolean; score: number; given?: string; mode: string; ts: number; ms?: number }
export interface ReviewItem { userId: string; questionId: string; box: number; due: number; lapses: number; lastTs: number; saved?: boolean }
export interface PracticeRun { id: string; userId: string; title: string; total: number; score: number; ts: number }
export interface XpTx { id: string; userId: string; amount: number; reason: string; ts: number }
export interface UserBadge { userId: string; badgeId: string; ts: number }
export interface NoteProgress { userId: string; chapterId: string; read: string[]; ts: number }
export interface Activity { id: string; userId: string; type: string; text: string; ts: number }

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  arabicSize: number;
  sound: boolean;
  /** Sertakan soalan daripada fakta bertanda ⚠️ (perlu disahkan) */
  includeUnverified: boolean;
}

export interface DB {
  version: number;
  profiles: Profile[];
  activeProfileId?: string;
  attempts: Attempt[];
  runs: PracticeRun[];
  review: ReviewItem[];
  xp: XpTx[];
  badges: UserBadge[];
  notes: NoteProgress[];
  activity: Activity[];
  settings: Settings;
}
