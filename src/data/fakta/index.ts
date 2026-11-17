import type { Fakta, Kelas, Pasangan, Senarai } from './types';
import { BAB } from './bab.ts';
import { fakta1, senarai1, fakta2, senarai2, kelas2 } from './b01_b02.ts';
import { fakta3, senarai3, fakta4, senarai4, taalluq4, fakta5, pasangan5, senarai5, fakta6, kelas6 } from './b03_b06.ts';
import { fakta7, senarai7, pasangan7, fakta8, senarai8 } from './b07_b08.ts';
import { fakta9, senarai9, pasangan9 } from './b09.ts';
import { fakta10, senarai10, pasangan10, fakta11, senarai11, pasangan11, fakta12, senarai12 } from './b10_b12.ts';

export { BAB };

export const FAKTA: Fakta[] = [...fakta1, ...fakta2, ...fakta3, ...fakta4, ...fakta5, ...fakta6, ...fakta7, ...fakta8, ...fakta9, ...fakta10, ...fakta11, ...fakta12];
export const SENARAI: Senarai[] = [...senarai1, ...senarai2, ...senarai3, ...senarai4, ...senarai5, ...senarai7, ...senarai8, ...senarai9, ...senarai10, ...senarai11, ...senarai12];
export const KELAS: Kelas[] = [...kelas2, ...kelas6];
export const PASANGAN: Pasangan[] = [...taalluq4, ...pasangan5, ...pasangan7, ...pasangan9, ...pasangan10, ...pasangan11];
