import type { Fakta, Kelas, Senarai } from './types';

const S = 'belum_disemak' as const;

// ===================== BAB 1: KENALI ILMU TAUHID =====================
export const fakta1: Fakta[] = [
  { id: 'b1-takrif', bab: 1, kumpulan: 'Asas', nama: 'Ilmu Tauhid', arab: 'علم التوحيد',
    makna: 'Ilmu yang membahaskan perkara yang wajib, mustahil dan harus bagi Allah Taala dan bagi para rasul, berserta dalil-dalilnya.', status: S },
  { id: 'b1-maudhu', bab: 1, kumpulan: 'Asas', nama: "Maudhu' (perkara yang dibahaskan)", arab: 'موضوعه',
    makna: 'Zat Allah dan zat para rasul dari segi sifat yang wajib, mustahil dan harus; makhluk (mumkinat) dari segi menjadi dalil; dan perkara sam\'iyyat.',
    sahkan: "Susunan huraian maudhu' ikut kitab rujukan.", status: S },
  { id: 'b1-hukum', bab: 1, kumpulan: 'Asas', nama: 'Hukum mempelajari', arab: 'حكمه',
    makna: 'Fardu ain bagi setiap mukallaf mengetahui akidah dengan dalil ijmali (ringkas); fardu kifayah mengetahuinya dengan dalil tafsili (terperinci).', status: S },
  { id: 'b1-faedah', bab: 1, kumpulan: 'Asas', nama: 'Faedah mempelajari', arab: 'فائدته',
    makna: 'Mengenal Allah dan rasul-Nya dengan yakin, serta beroleh kebahagiaan di dunia dan akhirat.', status: S },
  { id: 'b1-kelebihan', bab: 1, kumpulan: 'Asas', nama: 'Kelebihan Ilmu Tauhid', arab: 'فضله',
    makna: 'Ilmu yang paling mulia (أشرف العلوم) kerana perkara yang dibahaskannya berkaitan dengan Allah Taala.',
    nota: 'Kemuliaan sesuatu ilmu bergantung kepada kemuliaan perkara yang dibahaskannya.', status: S },
  { id: 'b1-asyari', bab: 1, kumpulan: 'Tokoh', nama: "Imam Abu al-Hasan al-Asy'ari", arab: 'الإمام أبو الحسن الأشعري',
    makna: "Imam Ahli Sunnah wal Jamaah dalam akidah; pengikutnya dinamakan Asya'irah.", sahkan: 'Tahun wafat (masyhur: 324H) sebelum dipaparkan.', status: S },
  { id: 'b1-maturidi', bab: 1, kumpulan: 'Tokoh', nama: 'Imam Abu Mansur al-Maturidi', arab: 'الإمام أبو منصور الماتريدي',
    makna: 'Imam Ahli Sunnah wal Jamaah dalam akidah; pengikutnya dinamakan Maturidiyyah.', sahkan: 'Tahun wafat (masyhur: 333H) sebelum dipaparkan.', status: S },
  { id: 'b1-asw', bab: 1, kumpulan: 'Tokoh', nama: 'Ahli Sunnah wal Jamaah', arab: 'أهل السنة والجماعة',
    makna: "Golongan yang berpegang dengan al-Quran, Sunnah Nabi ﷺ dan jalan para sahabat; dalam akidah merujuk kepada Asya'irah dan Maturidiyyah.", status: S },
  { id: 'b1-mukallaf', bab: 1, kumpulan: 'Mukallaf', nama: 'Mukallaf', arab: 'المكلف',
    makna: 'Orang yang baligh, berakal dan telah sampai dakwah Islam kepadanya.', status: S },
  { id: 'b1-awal-wajib', bab: 1, kumpulan: 'Mukallaf', nama: 'Kewajipan pertama mukallaf', arab: 'أول الواجبات',
    makna: 'Mengenal Allah Taala (ma\'rifatullah).',
    nota: 'Ulama berbeza pendapat tentang kewajipan pertama (ma\'rifah, nazar, atau qasd kepada nazar); pendapat masyhur ialah ma\'rifah.',
    sahkan: 'Pendapat yang dipilih ikut kitab rujukan.', status: S },
  { id: 'b1-makrifah', bab: 1, kumpulan: 'Istilah', nama: "Ma'rifah", arab: 'المعرفة',
    makna: 'Pegangan yang putus (jazam), menepati kebenaran dan berdasarkan dalil.', status: S },
  { id: 'b1-taqlid', bab: 1, kumpulan: 'Istilah', nama: 'Taqlid', arab: 'التقليد',
    makna: 'Menerima pendapat orang lain tanpa mengetahui dalilnya.',
    nota: 'Hukum iman orang yang bertaqlid adalah perkara khilaf — dibincangkan di peringkat Tauliah.', status: S },
  { id: 'b1-ijmali', bab: 1, kumpulan: 'Istilah', nama: 'Dalil ijmali', arab: 'الدليل الإجمالي',
    makna: 'Dalil secara ringkas, tanpa mampu menghuraikannya atau menjawab keraguan (syubhah).',
    nota: 'Contoh: "Alam ini ada, maka pasti ada Penciptanya."', status: S },
  { id: 'b1-tafsili', bab: 1, kumpulan: 'Istilah', nama: 'Dalil tafsili', arab: 'الدليل التفصيلي',
    makna: 'Dalil secara terperinci yang mampu dihuraikan dan digunakan untuk menolak keraguan (syubhah).', status: S },
];

export const senarai1: Senarai[] = [
  { id: 'b1-nama-lain', bab: 1, tajuk: 'Nama lain bagi Ilmu Tauhid', tertib: false,
    item: ['Ilmu Usuluddin (أصول الدين)', 'Ilmu Kalam (علم الكلام)', "Ilmu 'Aqa'id (علم العقائد)", 'Ilmu Sifat (علم الصفات)', 'Al-Fiqh al-Akbar (الفقه الأكبر)'], status: S },
  { id: 'b1-syarat-mukallaf', bab: 1, tajuk: 'Syarat menjadi mukallaf', tertib: false,
    item: ['Baligh', 'Berakal', 'Sampai dakwah Islam'], status: S },
  { id: 'b1-tanda-baligh', bab: 1, tajuk: 'Tanda baligh (Mazhab Syafie)', tertib: false,
    item: ['Keluar mani (lelaki dan perempuan)', 'Haid (perempuan)', 'Cukup umur 15 tahun qamariah'], status: S },
];

// ===================== BAB 2: HUKUM AKAL =====================
export const fakta2: Fakta[] = [
  { id: 'b2-hukum', bab: 2, kumpulan: 'Hukum', nama: 'Hukum', arab: 'الحكم',
    makna: 'Menetapkan sesuatu perkara bagi sesuatu perkara lain, atau menafikannya.', nota: 'Contoh: "Allah Maha Esa" (menetapkan); "Allah tiada sekutu" (menafikan).', status: S },
  { id: 'b2-syarak', bab: 2, kumpulan: 'Bahagian hukum', nama: 'Hukum Syarak', arab: 'الحكم الشرعي',
    makna: 'Hukum yang ditetapkan oleh syarak berkaitan perbuatan mukallaf: wajib, sunat, harus, makruh dan haram.', status: S },
  { id: 'b2-adat', bab: 2, kumpulan: 'Bahagian hukum', nama: 'Hukum Adat', arab: 'الحكم العادي',
    makna: 'Hukum yang ditetapkan berdasarkan pengalaman yang berulang-ulang.', nota: 'Contoh: api membakar, makan mengenyangkan — semuanya dengan kehendak Allah, bukan dengan kuasa api atau makanan itu sendiri.', status: S },
  { id: 'b2-akal', bab: 2, kumpulan: 'Bahagian hukum', nama: 'Hukum Akal', arab: 'الحكم العقلي',
    makna: 'Hukum yang ditetapkan oleh akal tanpa bergantung kepada pengalaman berulang dan tanpa bergantung kepada peletakan (syarak/bahasa).', status: S },
  { id: 'b2-wajib', bab: 2, kumpulan: 'Hukum Akal', nama: 'Wajib aqli', arab: 'الواجب العقلي',
    makna: 'Perkara yang tidak diterima akal ketiadaannya.', nota: 'Contoh: jirim mengambil lapang (memenuhi ruang); Allah bersifat Wujud.', status: S },
  { id: 'b2-mustahil', bab: 2, kumpulan: 'Hukum Akal', nama: 'Mustahil aqli', arab: 'المستحيل العقلي',
    makna: 'Perkara yang tidak diterima akal adanya.', nota: 'Contoh: jirim bergerak dan diam pada satu masa; Allah mempunyai sekutu.', status: S },
  { id: 'b2-harus', bab: 2, kumpulan: 'Hukum Akal', nama: "Harus (jaiz) aqli", arab: 'الجائز العقلي',
    makna: 'Perkara yang diterima akal adanya dan tiadanya.', nota: 'Contoh: jirim bergerak atau diam; seseorang menjadi kaya atau miskin.', status: S },
  { id: 'b2-dharuri', bab: 2, kumpulan: 'Pembahagian', nama: 'Dharuri', arab: 'ضروري',
    makna: 'Perkara yang difahami akal secara terus tanpa perlu berfikir dan berdalil.', nota: 'Setiap satu daripada wajib, mustahil dan harus terbahagi kepada dharuri dan nazari.', status: S },
  { id: 'b2-nazari', bab: 2, kumpulan: 'Pembahagian', nama: 'Nazari', arab: 'نظري',
    makna: 'Perkara yang hanya difahami akal setelah berfikir dan meneliti dalil.', status: S },
];

export const senarai2: Senarai[] = [
  { id: 'b2-bahagian', bab: 2, tajuk: 'Bahagian hukum', tertib: false, item: ['Hukum Syarak', 'Hukum Adat', 'Hukum Akal'], status: S },
  { id: 'b2-akal3', bab: 2, tajuk: 'Bahagian Hukum Akal', tertib: false, item: ['Wajib', 'Mustahil', 'Harus'], status: S },
];

const HA = ['Wajib', 'Mustahil', 'Harus'];
export const kelas2: Kelas[] = [
  { id: 'b2-k1', bab: 2, pernyataan: 'Qudrah Allah adalah qadim (sedia).', jawapan: 'Wajib', pilihan: HA, sumber: 'Soalan Tauliah 2023 S1(e)', status: S },
  { id: 'b2-k2', bab: 2, pernyataan: 'Wujud sekutu bagi Allah.', jawapan: 'Mustahil', pilihan: HA, sumber: 'Soalan Tauliah 2023 S1(e)', status: S },
  { id: 'b2-k3', bab: 2, pernyataan: 'Api membakar (pada pertimbangan akal).', jawapan: 'Harus', pilihan: HA, sebab: 'Akal boleh menerima api membakar atau tidak membakar — seperti api yang tidak membakar Nabi Ibrahim.', sumber: 'Soalan Tauliah 2023 S1(e)', status: S },
  { id: 'b2-k4', bab: 2, pernyataan: 'Manusia hidup dengan roh.', jawapan: 'Harus', pilihan: HA, sumber: 'Soalan Tauliah 2023 S1(e)', status: S },
  { id: 'b2-k5', bab: 2, pernyataan: 'Allah mengutus para rasul.', jawapan: 'Harus', pilihan: HA, sebab: "Pengutusan rasul termasuk perkara harus bagi Allah menurut Asya'irah.", sumber: 'Soalan Tauliah 2023 S1(e)', status: S },
  { id: 'b2-k6', bab: 2, pernyataan: 'Satu adalah separuh daripada dua.', jawapan: 'Wajib', pilihan: HA, status: S },
  { id: 'b2-k7', bab: 2, pernyataan: 'Satu jirim bergerak dan diam pada masa yang sama.', jawapan: 'Mustahil', pilihan: HA, status: S },
  { id: 'b2-k8', bab: 2, pernyataan: 'Hujan turun esok hari.', jawapan: 'Harus', pilihan: HA, status: S },
  { id: 'b2-k9', bab: 2, pernyataan: 'Allah mempunyai anak.', jawapan: 'Mustahil', pilihan: HA, status: S },
  { id: 'b2-k10', bab: 2, pernyataan: 'Allah bersifat Baqa\' (kekal).', jawapan: 'Wajib', pilihan: HA, status: S },
  { id: 'b2-k11', bab: 2, pernyataan: 'Seseorang dijadikan kaya atau miskin.', jawapan: 'Harus', pilihan: HA, status: S },
  { id: 'b2-k12', bab: 2, pernyataan: 'Rasul bersifat benar (Sidq).', jawapan: 'Wajib', pilihan: HA, status: S },
  { id: 'b2-k13', bab: 2, pernyataan: 'Rasul berdusta.', jawapan: 'Mustahil', pilihan: HA, status: S },
  { id: 'b2-k14', bab: 2, pernyataan: 'Rasul makan, minum dan berkahwin.', jawapan: 'Harus', pilihan: HA, status: S },
  { id: 'b2-k15', bab: 2, pernyataan: 'Jirim mengambil lapang (memenuhi ruang).', jawapan: 'Wajib', pilihan: HA, status: S },
];
