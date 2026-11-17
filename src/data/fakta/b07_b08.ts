import type { Fakta, Pasangan, Senarai } from './types';

const S = 'belum_disemak' as const;

// ===================== BAB 7: SIFAT RASUL & PARA NABI =====================
export const fakta7: Fakta[] = [
  { id: 'b7-nabi', bab: 7, kumpulan: 'Istilah', nama: 'Nabi', arab: 'النبي',
    makna: 'Lelaki merdeka daripada kalangan manusia yang diberi wahyu dengan syariat untuk diamalkan, tetapi tidak diperintahkan menyampaikannya.', status: S },
  { id: 'b7-rasul', bab: 7, kumpulan: 'Istilah', nama: 'Rasul', arab: 'الرسول',
    makna: 'Lelaki merdeka daripada kalangan manusia yang diberi wahyu dengan syariat dan diperintahkan menyampaikannya kepada umat.',
    nota: 'Setiap rasul adalah nabi, tetapi bukan setiap nabi adalah rasul.', status: S },

  { id: 'b7-sidq', bab: 7, kumpulan: 'Sifat wajib rasul', nama: 'Sidq', arab: 'الصدق',
    makna: 'Benar — benar pada segala yang disampaikan daripada Allah.',
    lawan: { nama: 'Kizb', arab: 'الكذب', makna: 'Dusta' },
    dalil: [{ arab: 'وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ', rujukan: 'Surah al-Najm: 3–4', maksud: 'Dan dia tidak berkata-kata menurut hawa nafsunya; ia tidak lain hanyalah wahyu yang diwahyukan.' }], status: S },
  { id: 'b7-amanah', bab: 7, kumpulan: 'Sifat wajib rasul', nama: 'Amanah', arab: 'الأمانة',
    makna: 'Dipercayai — terpelihara zahir dan batin daripada melakukan perkara yang dilarang (maksum).',
    lawan: { nama: 'Khianah', arab: 'الخيانة', makna: 'Khianat' },
    dalil: [{ arab: 'إِنِّي لَكُمْ رَسُولٌ أَمِينٌ', rujukan: "Surah al-Syu'ara': 107", maksud: 'Sesungguhnya aku ini rasul yang amanah kepada kamu.' }], status: S },
  { id: 'b7-tabligh', bab: 7, kumpulan: 'Sifat wajib rasul', nama: 'Tabligh', arab: 'التبليغ',
    makna: 'Menyampaikan — menyampaikan segala yang diperintahkan Allah untuk disampaikan kepada manusia.',
    lawan: { nama: 'Kitman', arab: 'الكتمان', makna: 'Menyembunyikan' },
    dalil: [{ arab: 'يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنزِلَ إِلَيْكَ مِن رَّبِّكَ', rujukan: "Surah al-Ma'idah: 67", maksud: 'Wahai Rasul, sampaikanlah apa yang diturunkan kepadamu daripada Tuhanmu.' }], status: S },
  { id: 'b7-fatanah', bab: 7, kumpulan: 'Sifat wajib rasul', nama: 'Fatanah', arab: 'الفطانة',
    makna: 'Bijaksana — cerdik dan mampu mematahkan hujah penentang.',
    lawan: { nama: 'Baladah', arab: 'البلادة', makna: 'Bodoh' },
    dalil: [{ arab: 'وَتِلْكَ حُجَّتُنَا آتَيْنَاهَا إِبْرَاهِيمَ عَلَىٰ قَوْمِهِ', rujukan: "Surah al-An'am: 83", maksud: 'Dan itulah hujah Kami yang Kami berikan kepada Ibrahim untuk menghadapi kaumnya.' }], status: S },
  { id: 'b7-harus', bab: 7, kumpulan: 'Sifat harus rasul', nama: "Al-A'radh al-Basyariyyah", arab: 'الأعراض البشرية',
    makna: 'Sifat-sifat kemanusiaan yang tidak mengurangkan martabat mereka yang tinggi, seperti makan, minum, tidur, berkahwin dan sakit yang tidak menjijikkan.',
    dalil: [{ arab: 'وَمَا أَرْسَلْنَا قَبْلَكَ مِنَ الْمُرْسَلِينَ إِلَّا إِنَّهُمْ لَيَأْكُلُونَ الطَّعَامَ وَيَمْشُونَ فِي الْأَسْوَاقِ', rujukan: 'Surah al-Furqan: 20', maksud: 'Dan Kami tidak mengutus sebelummu rasul-rasul melainkan mereka juga makan dan berjalan di pasar-pasar.' }], status: S },

  { id: 'b7-ulul-azmi', bab: 7, kumpulan: "Ulul 'Azmi", nama: "Ulul 'Azmi", arab: 'أولو العزم',
    makna: 'Rasul-rasul yang paling tinggi kesabaran dan keazamannya menghadapi ujian dakwah: Nabi Muhammad ﷺ, Nabi Ibrahim, Nabi Musa, Nabi Isa dan Nabi Nuh.',
    dalil: [{ arab: 'فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ', rujukan: 'Surah al-Ahqaf: 35', maksud: "Maka bersabarlah sebagaimana sabarnya rasul-rasul Ulul 'Azmi." }],
    nota: "Makhluk yang paling mulia secara mutlak ialah Nabi Muhammad ﷺ, kemudian Ulul 'Azmi yang lain (Soalan Tauliah 2014, 2017, 2018, 2022).", status: S },

  { id: 'b7-mukjizat', bab: 7, kumpulan: 'Perkara luar biasa', nama: 'Mukjizat', arab: 'المعجزة',
    makna: 'Perkara luar biasa yang dizahirkan Allah pada nabi atau rasul untuk membuktikan kebenaran kenabiannya, disertai cabaran.', status: S },
  { id: 'b7-irhas', bab: 7, kumpulan: 'Perkara luar biasa', nama: 'Irhas', arab: 'الإرهاص',
    makna: 'Perkara luar biasa yang berlaku pada seorang nabi sebelum diangkat menjadi nabi.', status: S },
  { id: 'b7-karamah', bab: 7, kumpulan: 'Perkara luar biasa', nama: 'Karamah', arab: 'الكرامة',
    makna: 'Perkara luar biasa yang berlaku pada wali Allah (orang soleh yang taat).', status: S },
  { id: 'b7-maunah', bab: 7, kumpulan: 'Perkara luar biasa', nama: "Ma'unah", arab: 'المعونة',
    makna: 'Pertolongan luar biasa yang berlaku pada orang mukmin biasa.', status: S },
  { id: 'b7-istidraj', bab: 7, kumpulan: 'Perkara luar biasa', nama: 'Istidraj', arab: 'الاستدراج',
    makna: 'Perkara luar biasa yang berlaku pada orang fasiq atau kafir sebagai tipu daya (dibiarkan semakin jauh dari Allah).', status: S },
];

export const senarai7: Senarai[] = [
  { id: 'b7-wajib4', bab: 7, tajuk: 'Empat sifat wajib bagi rasul', tertib: true, item: ['Sidq', 'Amanah', 'Tabligh', 'Fatanah'], status: S },
  { id: 'b7-ulul-azmi-tertib', bab: 7, tajuk: "Ulul 'Azmi ikut tertib kelebihan", tertib: true,
    item: ['Nabi Muhammad ﷺ', 'Nabi Ibrahim', 'Nabi Musa', 'Nabi Isa', 'Nabi Nuh'],
    sahkan: 'Tertib kelebihan ikut kitab rujukan.', status: S },
  { id: 'b7-25-nabi', bab: 7, tajuk: '25 nabi dan rasul yang wajib diketahui (ikut tertib)', tertib: true,
    item: ['Adam', 'Idris', 'Nuh', 'Hud', 'Saleh', 'Ibrahim', 'Lut', 'Ismail', 'Ishaq', "Ya'qub", 'Yusuf', 'Ayyub', "Syu'aib", 'Musa', 'Harun', 'Zulkifli', 'Daud', 'Sulaiman', 'Ilyas', "Ilyasa'", 'Yunus', 'Zakaria', 'Yahya', 'Isa', 'Muhammad ﷺ'],
    nota: 'Nama-nama ini disebut dalam al-Quran.', status: S },
];

export const pasangan7: Pasangan[] = [
  { id: 'b7-lawan', bab: 7, tajuk: 'Sifat wajib ↔ sifat mustahil rasul', kiri: 'Wajib', kanan: 'Mustahil',
    pasangan: [['Sidq', 'Kizb'], ['Amanah', 'Khianah'], ['Tabligh', 'Kitman'], ['Fatanah', 'Baladah']], status: S },
  { id: 'b7-mukjizat-nabi', bab: 7, tajuk: 'Nabi ↔ mukjizat (dalam al-Quran)', kiri: 'Nabi', kanan: 'Mukjizat',
    pasangan: [
      ['Nabi Muhammad ﷺ', 'Al-Quran (mukjizat terbesar)'],
      ['Nabi Musa', 'Tongkat menjadi ular dan membelah laut'],
      ['Nabi Ibrahim', 'Tidak terbakar oleh api'],
      ['Nabi Isa', 'Menghidupkan orang mati dengan izin Allah'],
      ['Nabi Daud', 'Besi menjadi lembut di tangannya'],
      ['Nabi Sulaiman', 'Angin ditundukkan untuknya'],
    ],
    nota: "Rujukan: Taha 20; al-Syu'ara' 63; al-Anbiya' 69; Ali 'Imran 49; Saba' 10; Saba' 12.",
    sahkan: 'Semak nombor ayat sebelum dipaparkan.', status: S },
];

// ===================== BAB 8: AQIDAH 50 =====================
export const fakta8: Fakta[] = [
  { id: 'b8-50', bab: 8, kumpulan: 'Aqidah 50', nama: 'Aqidah 50', arab: 'العقائد الخمسون',
    makna: 'Lima puluh akidah yang wajib diketahui setiap mukallaf: 41 berkaitan Allah dan 9 berkaitan rasul.', status: S },
  { id: 'b8-allah41', bab: 8, kumpulan: 'Bilangan', nama: 'Akidah bagi Allah', makna: '41 — 20 sifat wajib, 20 sifat mustahil dan 1 sifat harus.', status: S },
  { id: 'b8-rasul9', bab: 8, kumpulan: 'Bilangan', nama: 'Akidah bagi rasul', makna: '9 — 4 sifat wajib, 4 sifat mustahil dan 1 sifat harus.', status: S },
  { id: 'b8-wajib20', bab: 8, kumpulan: 'Bilangan', nama: 'Sifat wajib bagi Allah', makna: "20 — 1 Nafsiyyah, 5 Salbiyyah, 7 Ma'ani dan 7 Ma'nawiyyah.", status: S },
  { id: 'b8-istighna', bab: 8, kumpulan: 'Himpunan', nama: "Istighna' (Maha Kaya)", arab: 'الاستغناء',
    makna: 'Allah Maha Kaya daripada segala sesuatu selain-Nya. Di bawahnya terhimpun 11 sifat.', kuiz: false,
    sahkan: "Senarai 11 sifat di bawah Istighna' dan 9 di bawah Iftiqar ikut kitab rujukan.", status: S },
  { id: 'b8-iftiqar', bab: 8, kumpulan: 'Himpunan', nama: 'Iftiqar (berhajat kepada-Nya)', arab: 'الافتقار',
    makna: 'Segala sesuatu selain Allah berhajat kepada-Nya. Di bawahnya terhimpun 9 sifat.', kuiz: false, status: S },
];

export const senarai8: Senarai[] = [
  { id: 'b8-sifat20', bab: 8, tajuk: 'Sifat 20 ikut tertib', tertib: true,
    item: ['Wujud', 'Qidam', "Baqa'", 'Mukhalafatuhu lil-Hawadith', 'Qiyamuhu bi Nafsihi', 'Wahdaniyyah', 'Qudrah', 'Iradah', "'Ilmu", 'Hayah', "Sama'", 'Basar', 'Kalam',
      'Kaunuhu Qadiran', 'Kaunuhu Muridan', "Kaunuhu 'Aliman", 'Kaunuhu Hayyan', "Kaunuhu Sami'an", 'Kaunuhu Basiran', 'Kaunuhu Mutakalliman'], status: S },
  { id: 'b8-kategori4', bab: 8, tajuk: 'Empat kategori sifat wajib (ikut tertib)', tertib: true, item: ['Nafsiyyah (1)', 'Salbiyyah (5)', "Ma'ani (7)", "Ma'nawiyyah (7)"], status: S },
];
