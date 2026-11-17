import type { Fakta, Pasangan, Senarai } from './types';

const S = 'belum_disemak' as const;

// ===================== BAB 10: NABI MUHAMMAD ﷺ & KELUARGA =====================
export const fakta10: Fakta[] = [
  { id: 'b10-bapa', bab: 10, kumpulan: 'Keluarga terdekat', nama: 'Bapa Nabi ﷺ', makna: 'Abdullah bin Abdul Muttalib — wafat sebelum baginda dilahirkan.', status: S },
  { id: 'b10-ibu', bab: 10, kumpulan: 'Keluarga terdekat', nama: 'Ibu Nabi ﷺ', makna: "Aminah binti Wahb — wafat di al-Abwa' ketika baginda berumur 6 tahun.", status: S },
  { id: 'b10-datuk', bab: 10, kumpulan: 'Keluarga terdekat', nama: 'Datuk Nabi ﷺ', makna: 'Abdul Muttalib — memelihara baginda selepas kewafatan ibunya, dan wafat ketika baginda berumur 8 tahun.', status: S },
  { id: 'b10-abu-talib', bab: 10, kumpulan: 'Keluarga terdekat', nama: 'Bapa saudara yang memelihara baginda', makna: 'Abu Talib — memelihara dan melindungi baginda selepas kewafatan Abdul Muttalib.', status: S },
  { id: 'b10-halimah', bab: 10, kumpulan: 'Ibu susuan & pengasuh', nama: "Halimah al-Sa'diyyah", makna: "Ibu susuan Nabi ﷺ daripada Bani Sa'd, yang membawa baginda tinggal di perkampungan badwi.", status: S },
  { id: 'b10-thuwaibah', bab: 10, kumpulan: 'Ibu susuan & pengasuh', nama: 'Thuwaibah', makna: 'Ibu susuan pertama Nabi ﷺ selepas ibunya; hamba yang dimerdekakan oleh Abu Lahab.', status: S },
  { id: 'b10-ummu-aiman', bab: 10, kumpulan: 'Ibu susuan & pengasuh', nama: 'Ummu Aiman (Barakah)', makna: 'Pengasuh Nabi ﷺ sejak kecil.', status: S },
  { id: 'b10-hamzah', bab: 10, kumpulan: 'Bapa saudara', nama: 'Hamzah bin Abdul Muttalib', makna: 'Bapa saudara dan saudara susuan Nabi ﷺ (sama-sama disusukan oleh Thuwaibah); digelar Sayyid al-Syuhada\', syahid dalam Perang Uhud.', status: S },
  { id: 'b10-abbas', bab: 10, kumpulan: 'Bapa saudara', nama: "Al-'Abbas bin Abdul Muttalib", makna: 'Bapa saudara Nabi ﷺ yang memeluk Islam.', status: S },
  { id: 'b10-abu-lahab', bab: 10, kumpulan: 'Bapa saudara', nama: 'Abu Lahab', makna: 'Bapa saudara Nabi ﷺ yang memusuhi baginda; dicela dalam Surah al-Masad.', status: S },
  { id: 'b10-lahir', bab: 10, kumpulan: 'Riwayat hidup', nama: 'Kelahiran', makna: 'Di Makkah pada hari Isnin, Tahun Gajah. Pendapat masyhur: 12 Rabiul Awwal.', status: S },
  { id: 'b10-wahyu', bab: 10, kumpulan: 'Riwayat hidup', nama: 'Wahyu pertama', makna: "Di Gua Hira' ketika baginda berumur 40 tahun: Surah al-'Alaq ayat 1–5.", status: S },
  { id: 'b10-wafat', bab: 10, kumpulan: 'Riwayat hidup', nama: 'Kewafatan', makna: 'Di Madinah pada hari Isnin, Rabiul Awwal tahun 11 Hijrah, ketika berumur 63 tahun.', status: S },
  { id: 'b10-anak-hidup', bab: 10, kumpulan: 'Anak-anak', nama: 'Anak yang hidup selepas kewafatan Nabi ﷺ', makna: 'Fatimah al-Zahra\' sahaja; semua anak baginda yang lain wafat ketika baginda masih hidup.', status: S },
  { id: 'b10-qasim', bab: 10, kumpulan: 'Anak-anak', nama: 'Al-Qasim', makna: 'Anak lelaki sulung Nabi ﷺ daripada Khadijah; kerana itu baginda digelar Abu al-Qasim.', status: S },
  { id: 'b10-ibrahim', bab: 10, kumpulan: 'Anak-anak', nama: 'Ibrahim', makna: 'Anak Nabi ﷺ daripada Mariah al-Qibtiyyah; wafat ketika masih kecil.', status: S },
  { id: 'b10-cucu', bab: 10, kumpulan: 'Anak-anak', nama: 'Cucu Nabi ﷺ', makna: 'Al-Hasan dan al-Husain, anak Fatimah dan Ali bin Abi Talib.', status: S },
  { id: 'b10-ummahat', bab: 10, kumpulan: 'Isteri', nama: "Ummahat al-Mu'minin", arab: 'أمهات المؤمنين', makna: 'Gelaran bagi isteri-isteri Nabi ﷺ — "ibu-ibu orang beriman".', status: S },
  { id: 'b10-khadijah', bab: 10, kumpulan: 'Isteri', nama: 'Khadijah binti Khuwailid', makna: 'Isteri pertama Nabi ﷺ dan orang pertama yang beriman; ibu kepada semua anak baginda kecuali Ibrahim.', status: S },
];

export const senarai10: Senarai[] = [
  { id: 'b10-nasab', bab: 10, tajuk: 'Nasab Nabi ﷺ hingga Adnan (sebelah bapa)', tertib: true,
    item: ['Muhammad', 'Abdullah', 'Abdul Muttalib', 'Hasyim', 'Abdu Manaf', 'Qusai', 'Kilab', 'Murrah', "Ka'ab", "Lu'ai", 'Ghalib', 'Fihr', 'Malik', 'Al-Nadhr', 'Kinanah', 'Khuzaimah', 'Mudrikah', 'Ilyas', 'Mudhar', 'Nizar', "Ma'ad", 'Adnan'],
    nota: 'Ulama sepakat nasab baginda hingga Adnan (Soalan Tauliah 2024 S5(c)).', status: S },
  { id: 'b10-anak', bab: 10, tajuk: 'Anak-anak Nabi ﷺ', tertib: false,
    item: ['Al-Qasim', 'Abdullah (digelar al-Tayyib dan al-Tahir)', 'Zainab', 'Ruqayyah', 'Ummu Kalthum', "Fatimah al-Zahra'", 'Ibrahim'],
    nota: 'Enam daripada Khadijah; Ibrahim daripada Mariah al-Qibtiyyah. Sebahagian ulama mengira al-Tayyib dan al-Tahir sebagai anak yang berasingan.',
    sahkan: 'Bilangan anak ikut kitab rujukan (Soalan Tauliah 2015, 2016, 2018, 2023, 2025).', status: S },
  { id: 'b10-isteri', bab: 10, tajuk: 'Isteri-isteri Nabi ﷺ (Ummahat al-Mu\'minin)', tertib: false,
    item: ['Khadijah binti Khuwailid', "Saudah binti Zam'ah", 'Aisyah binti Abi Bakr', 'Hafsah binti Umar', 'Zainab binti Khuzaimah', 'Ummu Salamah (Hind binti Abi Umayyah)', 'Zainab binti Jahsy', 'Juwairiyah binti al-Harith', 'Ummu Habibah (Ramlah binti Abi Sufyan)', 'Safiyyah binti Huyai', 'Maimunah binti al-Harith'],
    sahkan: 'Senarai 11 isteri dan tertib perkahwinan.', status: S },
  { id: 'b10-anak-perempuan', bab: 10, tajuk: 'Anak perempuan Nabi ﷺ', tertib: false, soalanBilangan: 'Berapakah bilangan anak perempuan Nabi ﷺ?', bukan: ['Aisyah', 'Hafsah', 'Halimah', 'Aminah'], item: ['Zainab', 'Ruqayyah', 'Ummu Kalthum', "Fatimah al-Zahra'"], status: S },
];

export const pasangan10: Pasangan[] = [
  { id: 'b10-peranan', bab: 10, tajuk: 'Nama ↔ hubungan dengan Nabi ﷺ', kiri: 'Nama', kanan: 'Hubungan',
    tanyaKanan: 'Apakah hubungan **{x}** dengan Nabi ﷺ?', tanyaKiri: 'Siapakah **{y_}** Nabi ﷺ?',
    pasangan: [['Aminah binti Wahb', 'Ibu'], ['Abdullah bin Abdul Muttalib', 'Bapa'], ['Abdul Muttalib', 'Datuk'], ["Halimah al-Sa'diyyah", 'Ibu susuan'], ['Ummu Aiman', 'Pengasuh'], ['Abu Talib', 'Bapa saudara yang memelihara'], ['Khadijah', 'Isteri pertama'], ['Al-Hasan dan al-Husain', 'Cucu']], status: S },
];

// ===================== BAB 11: PARA SAHABAT =====================
export const fakta11: Fakta[] = [
  { id: 'b11-sahabat', bab: 11, kumpulan: 'Asas', nama: 'Sahabat', arab: 'الصحابي',
    makna: 'Orang yang bertemu Nabi ﷺ dalam keadaan beriman dan meninggal dunia dalam keadaan Islam.', status: S },
  { id: 'b11-adil', bab: 11, kumpulan: 'Asas', nama: 'Keadilan sahabat', arab: 'الصحابة كلهم عدول',
    makna: 'Ahli Sunnah wal Jamaah berpegang bahawa semua sahabat adalah adil (dipercayai dalam agama) dan wajib dihormati.', nota: 'Soalan Tauliah 2016 S5(b).', status: S },
  { id: 'b11-asyarah', bab: 11, kumpulan: 'Asas', nama: 'Al-\'Asyarah al-Mubasysyarun bil-Jannah', arab: 'العشرة المبشرون بالجنة',
    makna: 'Sepuluh sahabat yang diberi khabar gembira dengan syurga oleh Nabi ﷺ dalam satu hadis.', nota: 'Hadis riwayat al-Tirmizi dan Abu Daud.', sahkan: 'Nombor hadis dan perawi.', status: S },
  { id: 'b11-abu-bakr', bab: 11, kumpulan: "Khulafa' al-Rasyidin", nama: 'Abu Bakr al-Siddiq', makna: "Khalifah pertama; lelaki dewasa merdeka pertama memeluk Islam; menemani Nabi ﷺ ketika hijrah di Gua Thur.",
    nota: "Gua Thur disebut dalam Surah al-Taubah: 40 (\"ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ\").", status: S },
  { id: 'b11-umar', bab: 11, kumpulan: "Khulafa' al-Rasyidin", nama: 'Umar bin al-Khattab', makna: 'Khalifah kedua; digelar al-Faruq (pembeza antara hak dan batil).', status: S },
  { id: 'b11-uthman', bab: 11, kumpulan: "Khulafa' al-Rasyidin", nama: 'Uthman bin Affan', makna: 'Khalifah ketiga; digelar Dzun Nurain kerana berkahwin dengan dua puteri Nabi ﷺ (Ruqayyah dan Ummu Kalthum).', status: S },
  { id: 'b11-ali', bab: 11, kumpulan: "Khulafa' al-Rasyidin", nama: 'Ali bin Abi Talib', makna: 'Khalifah keempat; sepupu dan menantu Nabi ﷺ (suami Fatimah); kanak-kanak pertama memeluk Islam.', status: S },
  { id: 'b11-zaid', bab: 11, kumpulan: 'Yang terawal', nama: 'Zaid bin Harithah', makna: 'Hamba yang dimerdekakan dan anak angkat Nabi ﷺ; antara yang terawal memeluk Islam. Satu-satunya sahabat yang namanya disebut dalam al-Quran (Surah al-Ahzab: 37).', status: S },
  { id: 'b11-bilal', bab: 11, kumpulan: 'Sahabat masyhur', nama: 'Bilal bin Rabah', makna: 'Muazzin Rasulullah ﷺ.', status: S },
];

export const senarai11: Senarai[] = [
  { id: 'b11-sepuluh', bab: 11, tajuk: 'Sahabat yang dijamin syurga', tertib: false, soalanBilangan: 'Berapakah bilangan sahabat yang dijamin syurga dalam satu hadis?', bukan: ['Bilal bin Rabah', 'Hamzah bin Abdul Muttalib', 'Zaid bin Harithah', 'Khalid bin al-Walid'],
    item: ['Abu Bakr al-Siddiq', 'Umar bin al-Khattab', 'Uthman bin Affan', 'Ali bin Abi Talib', 'Talhah bin Ubaidillah', "Al-Zubair bin al-'Awwam", 'Abdul Rahman bin Auf', "Sa'd bin Abi Waqqas", "Sa'id bin Zaid", 'Abu Ubaidah bin al-Jarrah'], status: S },
  { id: 'b11-khulafa', bab: 11, tajuk: "Khulafa' al-Rasyidin (ikut tertib)", tertib: true, soalanBilangan: "Berapakah bilangan Khulafa' al-Rasyidin?", bukan: ['Hamzah bin Abdul Muttalib', 'Bilal bin Rabah', "Sa'd bin Abi Waqqas"],
    item: ['Abu Bakr al-Siddiq', 'Umar bin al-Khattab', 'Uthman bin Affan', 'Ali bin Abi Talib'],
    nota: 'Tertib kelebihan (afdhaliyyah) para sahabat di sisi Ahli Sunnah mengikut tertib khilafah ini.', status: S },
  { id: 'b11-awal', bab: 11, tajuk: 'Yang terawal memeluk Islam', tertib: false,
    item: ['Khadijah (wanita)', 'Abu Bakr (lelaki dewasa merdeka)', 'Ali (kanak-kanak)', 'Zaid bin Harithah (hamba yang dimerdekakan)'], status: S },
];

export const pasangan11: Pasangan[] = [
  { id: 'b11-gelaran', bab: 11, tajuk: 'Sahabat ↔ gelaran', kiri: 'Sahabat', kanan: 'Gelaran',
    tanyaKanan: 'Apakah gelaran **{x}**?', tanyaKiri: 'Siapakah sahabat yang digelar **{y}**?',
    pasangan: [['Abu Bakr', 'Al-Siddiq'], ['Umar bin al-Khattab', 'Al-Faruq'], ['Uthman bin Affan', 'Dzun Nurain'], ['Hamzah bin Abdul Muttalib', "Sayyid al-Syuhada'"]], status: S },
  { id: 'b11-gelaran-abu-ubaidah', bab: 11, tajuk: 'Gelaran Abu Ubaidah', kiri: 'Sahabat', kanan: 'Gelaran',
    pasangan: [['Abu Ubaidah bin al-Jarrah', 'Amin al-Ummah (orang kepercayaan umat)'], ['Abu Bakr', 'Al-Siddiq']],
    sahkan: 'Gelaran Abu Ubaidah — hadis riwayat al-Bukhari dan Muslim.', status: S },
];

// ===================== BAB 12: PERKARA GHAIB & KISAH WAJIB DIIMANI =====================
export const fakta12: Fakta[] = [
  { id: 'b12-samiyyat', bab: 12, kumpulan: 'Asas', nama: "Sam'iyyat", arab: 'السمعيات',
    makna: 'Perkara ghaib yang hanya diketahui melalui wahyu (al-Quran dan hadis sahih), bukan melalui akal semata-mata; wajib diimani.', status: S },
  { id: 'b12-barzakh', bab: 12, kumpulan: 'Alam kubur', nama: 'Alam Barzakh', arab: 'البرزخ',
    makna: 'Alam antara kematian dan hari kebangkitan.', status: S },
  { id: 'b12-soal-kubur', bab: 12, kumpulan: 'Alam kubur', nama: 'Soalan kubur', makna: 'Mayat disoal oleh malaikat Munkar dan Nakir tentang Tuhannya, agamanya dan nabinya.', status: S },
  { id: 'b12-nikmat-azab', bab: 12, kumpulan: 'Alam kubur', nama: 'Nikmat dan azab kubur', makna: 'Wajib beriman bahawa ada nikmat kubur bagi orang beriman dan azab kubur bagi yang berhak menerimanya.', status: S },
  { id: 'b12-sangkakala', bab: 12, kumpulan: 'Hari kiamat', nama: 'Tiupan sangkakala', makna: 'Sangkakala (sur) ditiup oleh malaikat Israfil; tiupan pertama mematikan semua yang hidup, tiupan kedua membangkitkan semua yang mati.',
    dalil: [{ arab: 'وَنُفِخَ فِي الصُّورِ فَصَعِقَ مَن فِي السَّمَاوَاتِ وَمَن فِي الْأَرْضِ إِلَّا مَن شَاءَ اللَّهُ ۖ ثُمَّ نُفِخَ فِيهِ أُخْرَىٰ فَإِذَا هُم قِيَامٌ يَنظُرُونَ', rujukan: 'Surah al-Zumar: 68', maksud: 'Dan ditiuplah sangkakala, maka matilah semua yang di langit dan di bumi kecuali sesiapa yang dikehendaki Allah; kemudian ditiup sekali lagi, maka tiba-tiba mereka bangun menunggu.' }], status: S },
  { id: 'b12-mizan', bab: 12, kumpulan: 'Akhirat', nama: 'Mizan', arab: 'الميزان',
    makna: 'Neraca untuk menimbang amalan manusia pada hari kiamat.',
    dalil: [{ arab: 'وَنَضَعُ الْمَوَازِينَ الْقِسْطَ لِيَوْمِ الْقِيَامَةِ', rujukan: "Surah al-Anbiya': 47", maksud: 'Dan Kami akan mengadakan neraca yang adil pada hari kiamat.' }], status: S },
  { id: 'b12-sirat', bab: 12, kumpulan: 'Akhirat', nama: 'Sirat', arab: 'الصراط', makna: 'Titian yang terbentang di atas neraka, yang mesti dilalui oleh semua manusia untuk ke syurga.', status: S },
  { id: 'b12-hisab', bab: 12, kumpulan: 'Akhirat', nama: 'Hisab', arab: 'الحساب', makna: 'Perhitungan amalan manusia oleh Allah pada hari kiamat.', status: S },
  { id: 'b12-mahsyar', bab: 12, kumpulan: 'Akhirat', nama: 'Mahsyar', arab: 'المحشر', makna: 'Padang tempat seluruh makhluk dihimpunkan selepas dibangkitkan.', status: S },
  { id: 'b12-syafaat-uzma', bab: 12, kumpulan: 'Akhirat', nama: "Syafa'at 'Uzma", arab: 'الشفاعة العظمى',
    makna: 'Syafaat terbesar yang khusus bagi Nabi Muhammad ﷺ di Padang Mahsyar, untuk menyegerakan bermulanya hisab bagi seluruh makhluk.', nota: 'Soalan Tauliah 2016, 2018, 2022, 2023, 2025.', status: S },
  { id: 'b12-haudh', bab: 12, kumpulan: 'Akhirat', nama: 'Haudh (telaga Nabi ﷺ)', arab: 'الحوض', makna: 'Telaga Nabi Muhammad ﷺ pada hari kiamat; sesiapa yang meminum airnya tidak akan dahaga selama-lamanya.', sahkan: 'Lokasi haudh (sebelum atau selepas sirat) adalah khilaf.', status: S },
  { id: 'b12-kautsar', bab: 12, kumpulan: 'Akhirat', nama: 'Al-Kautsar', arab: 'الكوثر', makna: 'Sungai di dalam syurga yang dikurniakan kepada Nabi Muhammad ﷺ.',
    dalil: [{ arab: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', rujukan: 'Surah al-Kautsar: 1', maksud: 'Sesungguhnya Kami telah mengurniakan kepadamu al-Kautsar.' }], status: S },
  { id: 'b12-syurga-neraka', bab: 12, kumpulan: 'Akhirat', nama: 'Syurga dan neraka', makna: 'Kedua-duanya telah dijadikan oleh Allah dan kekal selama-lamanya.', status: S },

  { id: 'b12-isra', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: "Isra' dan Mi'raj", makna: "Perjalanan Nabi ﷺ pada satu malam dari Masjidil Haram ke Masjidil Aqsa (Isra'), kemudian naik ke langit (Mi'raj).",
    dalil: [{ arab: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى', rujukan: "Surah al-Isra': 1", maksud: 'Maha Suci Allah yang telah memperjalankan hamba-Nya pada waktu malam dari Masjidil Haram ke Masjidil Aqsa.' }], status: S },
  { id: 'b12-isa', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Nabi Isa tidak dibunuh dan tidak disalib', makna: 'Nabi Isa diangkat oleh Allah; baginda tidak dibunuh dan tidak disalib.',
    dalil: [{ arab: 'وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ', rujukan: "Surah al-Nisa': 157", maksud: 'Mereka tidak membunuhnya dan tidak menyalibnya, tetapi diserupakan bagi mereka.' }], status: S },
  { id: 'b12-ibrahim', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Nabi Ibrahim tidak terbakar', makna: 'Api dijadikan sejuk dan selamat bagi Nabi Ibrahim.',
    dalil: [{ arab: 'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ', rujukan: "Surah al-Anbiya': 69", maksud: 'Kami berfirman: Wahai api, jadilah engkau sejuk dan selamat bagi Ibrahim.' }], status: S },
  { id: 'b12-musa', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Laut terbelah untuk Nabi Musa', makna: 'Laut terbelah apabila Nabi Musa memukulnya dengan tongkat, lalu Bani Israil diselamatkan.',
    dalil: [{ arab: 'فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ', rujukan: "Surah al-Syu'ara': 63", maksud: 'Lalu Kami wahyukan kepada Musa: Pukullah laut itu dengan tongkatmu. Maka terbelahlah ia.' }], status: S },
  { id: 'b12-yunus', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Nabi Yunus ditelan ikan', makna: 'Nabi Yunus ditelan oleh ikan besar, kemudian diselamatkan oleh Allah.',
    dalil: [{ arab: 'فَالْتَقَمَهُ الْحُوتُ وَهُوَ مُلِيمٌ', rujukan: 'Surah al-Saffat: 142', maksud: 'Lalu dia ditelan oleh ikan besar, sedang dia dalam keadaan tercela.' }], status: S },
  { id: 'b12-kahfi', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Ashab al-Kahfi', makna: 'Pemuda beriman yang ditidurkan oleh Allah di dalam gua selama 309 tahun.',
    dalil: [{ arab: 'وَلَبِثُوا فِي كَهْفِهِمْ ثَلَاثَ مِائَةٍ سِنِينَ وَازْدَادُوا تِسْعًا', rujukan: 'Surah al-Kahf: 25', maksud: 'Dan mereka tinggal di dalam gua mereka selama tiga ratus tahun dan ditambah sembilan tahun.' }], status: S },
  { id: 'b12-adam', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Nabi Adam dijadikan daripada tanah', makna: 'Nabi Adam, manusia pertama, dijadikan oleh Allah daripada tanah.',
    dalil: [{ arab: 'خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ', rujukan: "Surah Ali 'Imran: 59", maksud: 'Allah menjadikan Adam daripada tanah, kemudian berfirman kepadanya: Jadilah, maka jadilah ia.' }], status: S },
  { id: 'b12-bulan', bab: 12, kumpulan: 'Kisah dalam al-Quran', nama: 'Bulan terbelah', makna: 'Mukjizat Nabi Muhammad ﷺ: bulan terbelah dua.',
    dalil: [{ arab: 'اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ', rujukan: 'Surah al-Qamar: 1', maksud: 'Telah hampir hari kiamat dan terbelahlah bulan.' }], status: S },
];

export const senarai12: Senarai[] = [
  { id: 'b12-tanda-besar', bab: 12, tajuk: 'Sepuluh tanda besar kiamat', tertib: false,
    item: ['Asap (al-Dukhan)', 'Dajjal', 'Binatang (al-Dabbah)', 'Matahari terbit dari barat', 'Turunnya Nabi Isa', "Ya'juj dan Ma'juj", 'Gerhana (tanah runtuh) di timur', 'Gerhana (tanah runtuh) di barat', 'Gerhana (tanah runtuh) di Semenanjung Arab', 'Api yang keluar dari Yaman menghalau manusia ke tempat himpunan'],
    nota: 'Hadis Huzaifah bin Asid, riwayat Muslim.', sahkan: 'Nombor hadis dan terjemahan "khasf" (tanah runtuh/tenggelam).', status: S },
  { id: 'b12-tertib-akhirat', bab: 12, tajuk: 'Tertib peristiwa selepas kematian (ringkas)', tertib: true,
    item: ['Alam Barzakh', 'Tiupan sangkakala', 'Kebangkitan (al-Ba\'th)', 'Dihimpunkan di Mahsyar', 'Hisab', 'Mizan', 'Sirat', 'Syurga atau neraka'],
    sahkan: 'Tertib ini ringkasan; sesetengah peristiwa (haudh, syafaat) diletakkan berbeza oleh ulama. Sahkan sebelum dijadikan soalan susun.', kuiz: false, status: S },
];
