import type { Fakta, Pasangan, Senarai } from './types';

const S = 'belum_disemak' as const;

// ===================== BAB 9: RUKUN IMAN, MALAIKAT & KITAB =====================
export const fakta9: Fakta[] = [
  { id: 'b9-iman', bab: 9, kumpulan: 'Asas', nama: 'Iman', arab: 'الإيمان',
    makna: 'Membenarkan dengan hati segala yang dibawa oleh Nabi Muhammad ﷺ yang diketahui secara pasti daripada agama.',
    sahkan: 'Takrif iman ikut kitab rujukan (Soalan Tauliah 2024 S5(b)).', status: S },
  { id: 'b9-islam', bab: 9, kumpulan: 'Asas', nama: 'Islam', arab: 'الإسلام',
    makna: 'Tunduk dan patuh kepada hukum-hakam Allah yang dibawa oleh Nabi Muhammad ﷺ, dengan melaksanakan rukun Islam.', sahkan: 'Takrif ikut kitab rujukan.', status: S },
  { id: 'b9-ihsan', bab: 9, kumpulan: 'Asas', nama: 'Ihsan', arab: 'الإحسان',
    makna: 'Engkau beribadat kepada Allah seolah-olah engkau melihat-Nya; jika engkau tidak melihat-Nya, maka sesungguhnya Dia melihatmu.',
    dalil: [{ arab: 'أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ', rujukan: 'Hadis Jibril, riwayat Muslim' }],
    sahkan: 'Nombor hadis dalam Sahih Muslim.', status: S },

  { id: 'b9-malaikat', bab: 9, kumpulan: 'Malaikat', nama: 'Malaikat', arab: 'الملائكة',
    makna: 'Makhluk halus yang dijadikan daripada cahaya (nur), tidak makan dan minum, bukan lelaki dan bukan perempuan, dan sentiasa taat kepada Allah.',
    dalil: [{ arab: 'لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ', rujukan: 'Surah al-Tahrim: 6', maksud: 'Mereka tidak menderhakai Allah dalam apa yang Dia perintahkan, dan mereka melakukan apa yang diperintahkan.' }],
    nota: 'Malaikat dijadikan daripada cahaya — hadis riwayat Muslim daripada Aisyah r.a.', sahkan: 'Nombor hadis.', status: S },
  { id: 'b9-izrail', bab: 9, kumpulan: 'Malaikat', nama: 'Malaikat Maut', arab: 'ملك الموت',
    makna: "Malaikat yang ditugaskan mencabut nyawa. Al-Quran menyebutnya 'Malakul Maut'; nama 'Izrail masyhur dalam kitab-kitab ulama.",
    dalil: [{ arab: 'قُلْ يَتَوَفَّاكُم مَّلَكُ الْمَوْتِ الَّذِي وُكِّلَ بِكُمْ', rujukan: 'Surah al-Sajdah: 11', maksud: 'Katakanlah: Malaikat Maut yang ditugaskan ke atas kamu akan mengambil nyawa kamu.' }], status: S },

  { id: 'b9-kitab', bab: 9, kumpulan: 'Kitab', nama: 'Kitab-kitab Allah', arab: 'الكتب',
    makna: 'Wajib beriman bahawa Allah menurunkan kitab-kitab kepada para rasul. Empat yang wajib diketahui: Taurat, Zabur, Injil dan al-Quran.', status: S },
  { id: 'b9-suhuf', bab: 9, kumpulan: 'Kitab', nama: 'Suhuf', arab: 'الصحف',
    makna: 'Lembaran-lembaran wahyu yang diturunkan kepada sebahagian nabi, antaranya Nabi Ibrahim dan Nabi Musa.',
    dalil: [{ arab: 'صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ', rujukan: "Surah al-A'la: 19", maksud: 'Iaitu suhuf Nabi Ibrahim dan Nabi Musa.' }], status: S },
  { id: 'b9-quran', bab: 9, kumpulan: 'Kitab', nama: 'Al-Quran', arab: 'القرآن',
    makna: 'Kalam Allah yang diturunkan kepada Nabi Muhammad ﷺ melalui Jibril, kitab terakhir yang memansukhkan syariat kitab-kitab sebelumnya dan dipelihara oleh Allah.',
    dalil: [{ arab: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ', rujukan: 'Surah al-Hijr: 9', maksud: 'Sesungguhnya Kamilah yang menurunkan al-Quran, dan Kamilah yang memeliharanya.' }], status: S },
  { id: 'b9-qadar', bab: 9, kumpulan: 'Asas', nama: "Qada' dan Qadar", arab: 'القضاء والقدر',
    makna: 'Beriman bahawa segala yang berlaku, baik atau buruk, adalah dengan ketentuan dan kehendak Allah.',
    nota: "Takrif terperinci Qada' dan Qadar adalah khilaf antara ulama — dihuraikan di peringkat Tauliah.", status: S },
];

export const senarai9: Senarai[] = [
  { id: 'b9-rukun-iman', bab: 9, tajuk: 'Rukun Iman (ikut tertib)', tertib: true,
    item: ['Beriman kepada Allah', 'Beriman kepada malaikat', 'Beriman kepada kitab-kitab', 'Beriman kepada rasul-rasul', 'Beriman kepada hari akhirat', "Beriman kepada qada' dan qadar"],
    nota: 'Berdasarkan Hadis Jibril riwayat Muslim.', status: S },
  { id: 'b9-rukun-islam', bab: 9, tajuk: 'Rukun Islam (ikut tertib)', tertib: true,
    item: ['Mengucap dua kalimah syahadah', 'Mendirikan solat', 'Mengeluarkan zakat', 'Berpuasa di bulan Ramadan', 'Menunaikan haji bagi yang mampu'],
    nota: 'Berdasarkan Hadis Jibril riwayat Muslim.', status: S },
  { id: 'b9-malaikat10', bab: 9, tajuk: 'Sepuluh malaikat yang wajib diketahui', tertib: false,
    item: ['Jibril', 'Mikail', 'Israfil', "'Izrail", 'Munkar', 'Nakir', 'Raqib', "'Atid", 'Malik', 'Ridwan'], status: S },
];

export const pasangan9: Pasangan[] = [
  { id: 'b9-tugas-malaikat', bab: 9, tajuk: 'Malaikat ↔ tugas', kiri: 'Malaikat', kanan: 'Tugas',
    pasangan: [
      ['Jibril', 'Menyampaikan wahyu kepada para nabi dan rasul'],
      ['Mikail', 'Menurunkan hujan dan mengagihkan rezeki'],
      ['Israfil', 'Meniup sangkakala (sur) pada hari kiamat'],
      ["'Izrail", 'Mencabut nyawa'],
      ['Munkar', 'Menyoal mayat di dalam kubur'],
      ['Nakir', 'Menyoal mayat di dalam kubur'],
      ['Raqib', 'Mencatat amalan baik'],
      ["'Atid", 'Mencatat amalan buruk'],
      ['Malik', 'Menjaga neraka'],
      ['Ridwan', 'Menjaga syurga'],
    ],
    nota: 'Munkar dan Nakir mempunyai tugas yang sama — dalam soalan padanan, kedua-duanya diterima.',
    sahkan: "Pembahagian tugas Raqib (baik) dan 'Atid (buruk) mengikut kitab rujukan; sebahagian ulama menyatakan kedua-duanya mencatat.", status: S },
  { id: 'b9-kitab-rasul', bab: 9, tajuk: 'Kitab ↔ rasul', kiri: 'Kitab', kanan: 'Diturunkan kepada',
    pasangan: [['Taurat', 'Nabi Musa'], ['Zabur', 'Nabi Daud'], ['Injil', 'Nabi Isa'], ['Al-Quran', 'Nabi Muhammad ﷺ']], status: S },
];
