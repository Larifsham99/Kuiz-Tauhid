import { BAB, FAKTA, SENARAI, KELAS, PASANGAN } from './fakta/index.ts';
import { janaSoalan } from '../lib/jana.ts';
import type { Question } from '../types';

export { BAB, FAKTA, SENARAI, KELAS, PASANGAN };
export type { Bab } from './fakta/types';

/** Semua soalan (dijana sekali ketika aplikasi dimuatkan). */
export const QUESTIONS: Question[] = janaSoalan({ fakta: FAKTA, senarai: SENARAI, kelas: KELAS, pasangan: PASANGAN });

export const chapterById = (id: string) => BAB.find((b) => b.id === id);
