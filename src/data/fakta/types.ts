// ===== BANK FAKTA — jenis data =====
// Bank Fakta ialah SUMBER TUNGGAL kandungan Kuiz Tauhid: Beginner.
// Soalan kuiz dijana daripada fakta di sini sahaja (tiada soalan ditulis "bebas"),
// supaya setiap jawapan boleh dikesan kembali kepada fakta yang telah disahkan.

/** belum_disemak = draf; disahkan = telah disemak ustaz/pemilik; perlu_betul = ditanda untuk pembetulan */
export type Status = 'belum_disemak' | 'disahkan' | 'perlu_betul';

export interface Dalil {
  /** Teks Arab ayat / hadis */
  arab: string;
  /** cth. "Surah al-Ikhlas: 1" atau "Riwayat Muslim" */
  rujukan: string;
  /** Maksud ringkas dalam bahasa Melayu */
  maksud?: string;
}

export interface Bab {
  no: number;
  id: string; // b1..b12
  tajuk: string;
  arab: string;
  ringkas: string;
  ikon: string; // nama ikon dalam set ikon aplikasi
}

/** Satu fakta: satu istilah/nama dengan makna (dan lawan jika ada). */
export interface Fakta {
  id: string;
  bab: number;
  /** Kumpulan dalam bab, cth. "Sifat Salbiyyah" — digunakan untuk pilihan jawapan yang setara */
  kumpulan: string;
  nama: string; // tulisan Rumi
  arab?: string;
  makna: string;
  lawan?: { nama: string; arab?: string; makna: string };
  dalil?: Dalil[];
  nota?: string;
  /** Perkara khusus yang perlu disahkan oleh penyemak */
  sahkan?: string;
  /** false = paparan nota sahaja, tidak dijadikan soalan (cth. perkara khilaf) */
  kuiz?: boolean;
  status: Status;
}

/** Senarai bernama, cth. "Sifat Salbiyyah (5)", "Ulul 'Azmi". tertib=true jika susunan penting. */
export interface Senarai {
  id: string;
  bab: number;
  tajuk: string;
  item: string[];
  tertib: boolean;
  /** Soalan bilangan, cth. "Berapakah bilangan Sifat Salbiyyah?" (jawapan = bilangan item) */
  soalanBilangan?: string;
  /** Contoh yang BUKAN ahli senarai (dipilih sendiri) — untuk soalan "Yang manakah BUKAN …" */
  bukan?: string[];
  nota?: string;
  sahkan?: string;
  kuiz?: boolean;
  status: Status;
}

/** Pernyataan untuk dikelaskan, cth. Hukum Akal: wajib / mustahil / harus. */
export interface Kelas {
  id: string;
  bab: number;
  pernyataan: string;
  jawapan: string;
  pilihan: string[];
  sebab?: string;
  sumber?: string;
  sahkan?: string;
  status: Status;
}

/** Pasangan untuk soalan padanan, cth. Malaikat ↔ tugas, Rasul ↔ kitab. */
export interface Pasangan {
  id: string;
  bab: number;
  tajuk: string;
  kiri: string; // label lajur kiri
  kanan: string; // label lajur kanan
  pasangan: [string, string][];
  /** Templat soalan ke kanan, {x} = item kiri. cth. "Apakah tugas malaikat **{x}**?" */
  tanyaKanan?: string;
  /** Templat soalan ke kiri, {y} = item kanan, {y_} = item kanan dengan huruf pertama kecil (hanya untuk item kanan yang unik). */
  tanyaKiri?: string;
  /** true = hanya soalan padanan (elak bertindih dengan soalan fakta) */
  hanyaPadanan?: boolean;
  nota?: string;
  sahkan?: string;
  status: Status;
}
