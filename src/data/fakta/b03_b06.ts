import type { Fakta, Kelas, Pasangan, Senarai } from './types';

const S = 'belum_disemak' as const;

// Ayat yang digunakan berulang
const SYURA11 = { arab: 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ', rujukan: 'Surah al-Syura: 11', maksud: 'Tiada sesuatu pun yang serupa dengan-Nya, dan Dialah Yang Maha Mendengar lagi Maha Melihat.' };
const HADID3 = { arab: 'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ', rujukan: 'Surah al-Hadid: 3', maksud: 'Dialah Yang Awal dan Yang Akhir, Yang Zahir dan Yang Batin.' };

// ===================== BAB 3: SIFAT NAFSIYYAH & SALBIYYAH =====================
export const fakta3: Fakta[] = [
  { id: 'b3-nafsiyyah', bab: 3, kumpulan: 'Kategori sifat', nama: 'Sifat Nafsiyyah', arab: 'الصفة النفسية',
    makna: 'Sifat yang menunjukkan kepada zat itu sendiri, tidak menunjukkan makna tambahan atas zat. Hanya satu: Wujud.', status: S },
  { id: 'b3-salbiyyah', bab: 3, kumpulan: 'Kategori sifat', nama: 'Sifat Salbiyyah', arab: 'الصفات السلبية',
    makna: 'Sifat yang menafikan perkara yang tidak layak bagi Allah. Ada lima: Qidam, Baqa\', Mukhalafatuhu lil-Hawadith, Qiyamuhu bi Nafsihi dan Wahdaniyyah.', status: S },

  { id: 'b3-wujud', bab: 3, kumpulan: 'Sifat Nafsiyyah', nama: 'Wujud', arab: 'الوجود',
    makna: 'Ada — Allah ada dengan zat-Nya, ada-Nya tidak disebabkan oleh sesuatu.',
    lawan: { nama: "'Adam", arab: 'العدم', makna: 'Tiada' },
    dalil: [{ arab: 'أَفِي اللَّهِ شَكٌّ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ', rujukan: 'Surah Ibrahim: 10', maksud: 'Patutkah ada keraguan tentang Allah, Pencipta langit dan bumi?' }],
    nota: 'Dalil aqli: kebaharuan alam (huduth al-\'alam) — setiap yang baharu pasti ada yang membaharukannya.', status: S },
  { id: 'b3-qidam', bab: 3, kumpulan: 'Sifat Salbiyyah', nama: 'Qidam', arab: 'القدم',
    makna: 'Sedia — tiada permulaan bagi ada-Nya.',
    lawan: { nama: 'Huduth', arab: 'الحدوث', makna: 'Baharu (ada permulaan)' }, dalil: [HADID3], status: S },
  { id: 'b3-baqa', bab: 3, kumpulan: 'Sifat Salbiyyah', nama: "Baqa'", arab: 'البقاء',
    makna: 'Kekal — tiada kesudahan bagi ada-Nya.',
    lawan: { nama: "Fana'", arab: 'الفناء', makna: 'Binasa (ada kesudahan)' },
    dalil: [{ arab: 'وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ', rujukan: 'Surah al-Rahman: 27', maksud: 'Dan kekallah Zat Tuhanmu yang mempunyai kebesaran dan kemuliaan.' }], status: S },
  { id: 'b3-mukhalafah', bab: 3, kumpulan: 'Sifat Salbiyyah', nama: 'Mukhalafatuhu lil-Hawadith', arab: 'مخالفته تعالى للحوادث',
    makna: 'Bersalahan dengan segala yang baharu — tidak menyerupai makhluk pada zat, sifat dan perbuatan.',
    lawan: { nama: 'Mumathalatuhu lil-Hawadith', arab: 'المماثلة للحوادث', makna: 'Menyerupai yang baharu' }, dalil: [SYURA11], status: S },
  { id: 'b3-qiyamuhu', bab: 3, kumpulan: 'Sifat Salbiyyah', nama: 'Qiyamuhu bi Nafsihi', arab: 'قيامه تعالى بنفسه',
    makna: 'Berdiri dengan sendiri-Nya — tidak berhajat kepada zat (tempat) untuk berdiri dan tidak berhajat kepada yang menjadikan.',
    lawan: { nama: 'Ihtiyaj ila Ghairihi', arab: 'الاحتياج إلى غيره', makna: 'Berhajat kepada yang lain' },
    dalil: [{ arab: 'إِنَّ اللَّهَ لَغَنِيٌّ عَنِ الْعَالَمِينَ', rujukan: "Surah al-'Ankabut: 6", maksud: 'Sesungguhnya Allah Maha Kaya (tidak berhajat) kepada sekalian alam.' }], status: S },
  { id: 'b3-wahdaniyyah', bab: 3, kumpulan: 'Sifat Salbiyyah', nama: 'Wahdaniyyah', arab: 'الوحدانية',
    makna: 'Esa — Esa pada zat, Esa pada sifat dan Esa pada perbuatan.',
    lawan: { nama: "Ta'addud", arab: 'التعدد', makna: 'Berbilang' },
    dalil: [{ arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ', rujukan: 'Surah al-Ikhlas: 1', maksud: 'Katakanlah: Dialah Allah Yang Maha Esa.' },
            { arab: 'لَوْ كَانَ فِيهِمَا آلِهَةٌ إِلَّا اللَّهُ لَفَسَدَتَا', rujukan: "Surah al-Anbiya': 22", maksud: 'Sekiranya di langit dan bumi ada tuhan-tuhan selain Allah, nescaya rosaklah keduanya.' }],
    nota: 'Wahdaniyyah menafikan "al-kumum al-khamsah" (lima bilangan) — dihuraikan di peringkat Tauliah.', status: S },
];

export const senarai3: Senarai[] = [
  { id: 'b3-salbiyyah5', bab: 3, tajuk: 'Sifat Salbiyyah (ikut tertib)', tertib: true, soalanBilangan: 'Berapakah bilangan Sifat Salbiyyah?', bukan: ['Wujud', 'Qudrah', 'Hayah', "'Ilmu"],
    item: ['Qidam', "Baqa'", 'Mukhalafatuhu lil-Hawadith', 'Qiyamuhu bi Nafsihi', 'Wahdaniyyah'], status: S },
  { id: 'b3-esa3', bab: 3, tajuk: 'Makna Esa (Wahdaniyyah)', tertib: false,
    item: ['Esa pada zat', 'Esa pada sifat', 'Esa pada perbuatan'], status: S },
];

// ===================== BAB 4: SIFAT MA'ANI =====================
export const fakta4: Fakta[] = [
  { id: 'b4-maani', bab: 4, kumpulan: 'Kategori sifat', nama: "Sifat Ma'ani", arab: 'صفات المعاني',
    makna: "Sifat yang ada (maujud) lagi berdiri pada zat Allah, yang mewajibkan zat itu bersifat dengan Sifat Ma'nawiyyah. Ada tujuh.", status: S },
  { id: 'b4-qudrah', bab: 4, kumpulan: "Sifat Ma'ani", nama: 'Qudrah', arab: 'القدرة',
    makna: 'Berkuasa — sifat yang dengannya Allah mengadakan dan meniadakan segala perkara mumkin menurut iradah-Nya.',
    lawan: { nama: "'Ajz", arab: 'العجز', makna: 'Lemah' },
    dalil: [{ arab: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', rujukan: 'Surah al-Baqarah: 20', maksud: 'Sesungguhnya Allah Maha Berkuasa atas segala sesuatu.' }], status: S },
  { id: 'b4-iradah', bab: 4, kumpulan: "Sifat Ma'ani", nama: 'Iradah', arab: 'الإرادة',
    makna: 'Berkehendak — sifat yang menentukan perkara mumkin dengan sebahagian perkara yang harus baginya (seperti ada atau tiada, masa, tempat dan rupa).',
    lawan: { nama: 'Karahah', arab: 'الكراهة', makna: 'Terpaksa (tidak berkehendak)' },
    dalil: [{ arab: 'إِنَّ رَبَّكَ فَعَّالٌ لِّمَا يُرِيدُ', rujukan: 'Surah Hud: 107', maksud: 'Sesungguhnya Tuhanmu Maha Berkuasa melakukan apa yang Dia kehendaki.' }], status: S },
  { id: 'b4-ilmu', bab: 4, kumpulan: "Sifat Ma'ani", nama: "'Ilmu", arab: 'العلم',
    makna: 'Mengetahui — sifat yang dengannya Allah mengetahui segala perkara wajib, harus dan mustahil dengan pengetahuan yang menyeluruh, tidak didahului oleh kejahilan.',
    lawan: { nama: 'Jahl', arab: 'الجهل', makna: 'Jahil (tidak mengetahui)' },
    dalil: [{ arab: 'وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ', rujukan: 'Surah al-Baqarah: 29', maksud: 'Dan Dia Maha Mengetahui akan segala sesuatu.' }], status: S },
  { id: 'b4-hayah', bab: 4, kumpulan: "Sifat Ma'ani", nama: 'Hayah', arab: 'الحياة',
    makna: "Hidup — sifat yang mensahkan Allah bersifat dengan Qudrah, Iradah, 'Ilmu, Sama', Basar dan Kalam. Hidup Allah bukan dengan nyawa.",
    lawan: { nama: 'Maut', arab: 'الموت', makna: 'Mati' },
    dalil: [{ arab: 'وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ', rujukan: 'Surah al-Furqan: 58', maksud: 'Dan bertawakallah kepada Allah Yang Hidup, yang tidak mati.' }], status: S },
  { id: 'b4-sama', bab: 4, kumpulan: "Sifat Ma'ani", nama: "Sama'", arab: 'السمع',
    makna: 'Mendengar — Allah mendengar segala yang maujud, tanpa telinga dan tanpa alat.',
    lawan: { nama: 'Summ', arab: 'الصمم', makna: 'Tuli' }, dalil: [SYURA11], status: S },
  { id: 'b4-basar', bab: 4, kumpulan: "Sifat Ma'ani", nama: 'Basar', arab: 'البصر',
    makna: 'Melihat — Allah melihat segala yang maujud, tanpa mata dan tanpa alat.',
    lawan: { nama: "'Ama", arab: 'العمى', makna: 'Buta' }, dalil: [SYURA11], status: S },
  { id: 'b4-kalam', bab: 4, kumpulan: "Sifat Ma'ani", nama: 'Kalam', arab: 'الكلام',
    makna: 'Berkata-kata — kalam Allah adalah sifat yang qadim, bukan berhuruf dan bukan bersuara.',
    lawan: { nama: 'Bukm', arab: 'البكم', makna: 'Bisu' },
    dalil: [{ arab: 'وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا', rujukan: "Surah al-Nisa': 164", maksud: 'Dan Allah telah berkata-kata kepada Nabi Musa dengan kata-kata yang sebenar.' }], status: S },
];

export const senarai4: Senarai[] = [
  { id: 'b4-maani7', bab: 4, tajuk: "Sifat Ma'ani (ikut tertib)", tertib: true, soalanBilangan: "Berapakah bilangan Sifat Ma'ani?", bukan: ['Wujud', 'Qidam', "Baqa'", 'Wahdaniyyah', 'Kaunuhu Qadiran'],
    item: ['Qudrah', 'Iradah', "'Ilmu", 'Hayah', "Sama'", 'Basar', 'Kalam'], status: S },
];

export const taalluq4: Pasangan[] = [
  { id: 'b4-taalluq', bab: 4, tajuk: "Ta'alluq Sifat Ma'ani", kiri: 'Sifat', kanan: "Berta'alluq (berkaitan) dengan",
    tanyaKanan: "Sifat **{x}** berta'alluq (berkaitan) dengan…", tanyaKiri: "Sifat Ma'ani manakah yang {y_}?",
    pasangan: [
      ['Qudrah', 'Segala perkara mumkin (harus)'],
      ['Iradah', 'Segala perkara mumkin (harus)'],
      ["'Ilmu", 'Segala yang wajib, harus dan mustahil'],
      ['Kalam', 'Segala yang wajib, harus dan mustahil'],
      ["Sama'", 'Segala yang maujud (ada)'],
      ['Basar', 'Segala yang maujud (ada)'],
      ['Hayah', "Tidak berta'alluq dengan apa-apa"],
    ],
    nota: 'Soalan Tauliah 2024 S3(a)(b) menyentuh perkara ini.', status: S },
];

// ===================== BAB 5: SIFAT MA'NAWIYYAH =====================
const MN: [string, string, string, string, string, string, string][] = [
  // id, nama, arab, makna, lawan, lawanArab, maknaLawan
  ['qadiran', 'Kaunuhu Qadiran', 'كونه قادرا', 'Keadaan-Nya Yang Berkuasa', "Kaunuhu 'Ajizan", 'كونه عاجزا', 'Keadaan-Nya yang lemah'],
  ['muridan', 'Kaunuhu Muridan', 'كونه مريدا', 'Keadaan-Nya Yang Berkehendak', 'Kaunuhu Karihan', 'كونه كارها', 'Keadaan-Nya yang terpaksa'],
  ['aliman', "Kaunuhu 'Aliman", 'كونه عالما', 'Keadaan-Nya Yang Mengetahui', 'Kaunuhu Jahilan', 'كونه جاهلا', 'Keadaan-Nya yang jahil'],
  ['hayyan', 'Kaunuhu Hayyan', 'كونه حيا', 'Keadaan-Nya Yang Hidup', 'Kaunuhu Mayyitan', 'كونه ميتا', 'Keadaan-Nya yang mati'],
  ['samian', "Kaunuhu Sami'an", 'كونه سميعا', 'Keadaan-Nya Yang Mendengar', 'Kaunuhu Asamma', 'كونه أصم', 'Keadaan-Nya yang tuli'],
  ['basiran', 'Kaunuhu Basiran', 'كونه بصيرا', 'Keadaan-Nya Yang Melihat', "Kaunuhu A'ma", 'كونه أعمى', 'Keadaan-Nya yang buta'],
  ['mutakalliman', 'Kaunuhu Mutakalliman', 'كونه متكلما', 'Keadaan-Nya Yang Berkata-kata', 'Kaunuhu Abkama', 'كونه أبكم', 'Keadaan-Nya yang bisu'],
];
export const fakta5: Fakta[] = [
  { id: 'b5-manawiyyah', bab: 5, kumpulan: 'Kategori sifat', nama: "Sifat Ma'nawiyyah", arab: 'الصفات المعنوية',
    makna: "Sifat yang lazim (sentiasa menyertai) bagi Sifat Ma'ani. Ada tujuh, setiap satu sepadan dengan satu Sifat Ma'ani.", status: S },
  ...MN.map(([id, nama, arab, makna, ln, la, lm]): Fakta => ({
    id: `b5-${id}`, bab: 5, kumpulan: "Sifat Ma'nawiyyah", nama, arab, makna,
    lawan: { nama: ln, arab: la, makna: lm },
    status: S,
  })),
];

export const pasangan5: Pasangan[] = [
  { id: 'b5-padan', bab: 5, tajuk: "Ma'ani ↔ Ma'nawiyyah", kiri: "Sifat Ma'ani", kanan: "Sifat Ma'nawiyyah",
    tanyaKanan: "Sifat Ma'nawiyyah yang sepadan dengan **{x}** ialah…", tanyaKiri: "**{y}** sepadan dengan Sifat Ma'ani…",
    pasangan: [['Qudrah', 'Kaunuhu Qadiran'], ['Iradah', 'Kaunuhu Muridan'], ["'Ilmu", "Kaunuhu 'Aliman"], ['Hayah', 'Kaunuhu Hayyan'], ["Sama'", "Kaunuhu Sami'an"], ['Basar', 'Kaunuhu Basiran'], ['Kalam', 'Kaunuhu Mutakalliman']], status: S },
];

export const senarai5: Senarai[] = [
  { id: 'b5-manawiyyah7', bab: 5, tajuk: "Sifat Ma'nawiyyah (ikut tertib)", tertib: true, soalanBilangan: "Berapakah bilangan Sifat Ma'nawiyyah?", bukan: ['Qudrah', 'Iradah', 'Hayah', 'Kalam'], item: MN.map((m) => m[1]), status: S },
];

// ===================== BAB 6: SIFAT HARUS BAGI ALLAH =====================
export const fakta6: Fakta[] = [
  { id: 'b6-harus', bab: 6, kumpulan: 'Sifat Harus', nama: "Fi'lu kulli mumkinin aw tarkuhu", arab: 'فعل كل ممكن أو تركه',
    makna: 'Harus bagi Allah mengadakan sesuatu yang mumkin atau tidak mengadakannya. Allah tidak diwajibkan oleh sesiapa untuk melakukan atau meninggalkan sesuatu.',
    dalil: [{ arab: 'وَرَبُّكَ يَخْلُقُ مَا يَشَاءُ وَيَخْتَارُ', rujukan: 'Surah al-Qasas: 68', maksud: 'Dan Tuhanmu menciptakan apa yang Dia kehendaki dan memilih (apa yang Dia kehendaki).' }],
    nota: 'Contoh: menjadikan seseorang kaya atau miskin, sihat atau sakit; mengutus para rasul; memberi pahala kepada yang taat.', status: S },
  { id: 'b6-bilangan', bab: 6, kumpulan: 'Sifat Harus', nama: 'Bilangan sifat harus bagi Allah', makna: 'Satu sahaja.', status: S },
  { id: 'b6-pahala', bab: 6, kumpulan: 'Sifat Harus', nama: 'Pahala dan seksa', makna: 'Allah tidak wajib memberi pahala kepada yang taat atau menyeksa yang derhaka; pahala adalah kurniaan-Nya dan seksa adalah keadilan-Nya.',
    nota: 'Soalan Tauliah 2016 S4(d) dan 2018 S4(a).', sahkan: 'Huraian ikut kitab rujukan.', status: S },
];

export const kelas6: Kelas[] = [
  { id: 'b6-k1', bab: 6, pernyataan: 'Allah menjadikan seseorang kaya atau miskin.', jawapan: 'Harus', pilihan: ['Wajib', 'Mustahil', 'Harus'], status: S },
  { id: 'b6-k2', bab: 6, pernyataan: 'Allah bersifat Qudrah.', jawapan: 'Wajib', pilihan: ['Wajib', 'Mustahil', 'Harus'], status: S },
  { id: 'b6-k3', bab: 6, pernyataan: 'Allah bersifat lemah.', jawapan: 'Mustahil', pilihan: ['Wajib', 'Mustahil', 'Harus'], status: S },
  { id: 'b6-k4', bab: 6, pernyataan: 'Allah menurunkan hujan pada suatu hari.', jawapan: 'Harus', pilihan: ['Wajib', 'Mustahil', 'Harus'], status: S },
];
