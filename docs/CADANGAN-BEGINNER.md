# KUIZ TAUHID: BEGINNER — Cadangan Skop Fasa 1

> Status: **CADANGAN** (menggantikan skop penuh dalam `CADANGAN.md` buat sementara; skop tauliah ditangguhkan, bukan dibuang).

## 1. Matlamat
Aplikasi kuiz **ringan** untuk pemula memahami asas akidah Ahli Sunnah wal Jamaah (Asya'irah): Hukum Akal, Sifat 20, sifat Rasul dan Aqidah 50. Jawab, dapat markah serta-merta, faham penerangan dan ulang yang salah.

## 2. Masuk / tangguh

| Masuk (Beginner) | Ditangguhkan (versi Tauliah) |
|---|---|
| Kuiz objektif ikut bab | Soalan subjektif & rubrik |
| ABCD, Benar/Salah, Padanan, Susun | Simulasi peperiksaan 2 jam |
| Penerangan ringkas setiap jawapan | Kertas tauliah 2014–2025 |
| Murajaah soalan salah (automatik) | Khilaf ulama, mutasyabihat, isu semasa |
| Markah, XP, lencana, istiqamah | Panel admin dalam talian |
| Scoreboard dalam peranti | Ranking dalam talian (Supabase) |
| Nota ringkas 1 skrin setiap bab | Nota mendalam & rujukan halaman kitab |
| Kod pengaktifan (seperti Pandai Tajwid) | Akaun log masuk |

Tiada pelayan / pangkalan data dalam talian → kos RM0, pantas, berfungsi luar talian. Kandungan disimpan dalam fail data dalam kod (seperti Pandai Tajwid); tambah soalan = tambah baris data.

## 3. Bab (8 bab)

| Bab | Tajuk | Isi kuiz |
|---|---|---|
| 1 | Kenali Ilmu Tauhid | takrif ringkas, nama lain (Usuluddin, Ilmu Kalam), hukum mempelajari, mukallaf |
| 2 | Hukum Akal | wajib, mustahil, harus — kenal pasti contoh |
| 3 | Sifat Nafsiyyah & Salbiyyah | Wujud; Qidam, Baqa', Mukhalafatuhu lil-Hawadith, Qiyamuhu bi Nafsihi, Wahdaniyyah — nama Arab, makna, lawan |
| 4 | Sifat Ma'ani | Qudrah, Iradah, Ilmu, Hayah, Sama', Basar, Kalam — makna, lawan, padanan |
| 5 | Sifat Ma'nawiyyah | Kaunuhu Qadiran … Kaunuhu Mutakalliman — padanan dengan sifat Ma'ani |
| 6 | Sifat Harus bagi Allah | satu sifat harus, contoh |
| 7 | Sifat Rasul | wajib (Sidq, Amanah, Tabligh, Fatanah), mustahil, harus; Ulul 'Azmi |
| 8 | Aqidah 50 (Ulangkaji) | kuiz campuran semua bab, susun tertib sifat 20 |

## 4. Menu (4 menu, sama seperti Pandai Tajwid)
1. **Kuiz** (utama) — pilih bab / campuran, 10 atau 20 soalan, Cabaran Harian, Murajaah.
2. **Nota** — satu kad ringkas setiap bab + kad imbas (Arab ↔ makna ↔ lawan).
3. **Skor** — markah terbaik, ketepatan ikut bab, istiqamah, scoreboard peranti.
4. **Profil** — tahap, XP, lencana, tetapan (saiz tulisan Arab, bunyi, mod gelap), sandaran.

## 5. Kandungan & integriti
- Sasaran awal: **~300 soalan** (≈ 35–40 setiap bab).
- Soalan dibina daripada **"Bank Fakta Asas"**: senarai fakta (nama sifat, tulisan Arab, makna, lawan, kategori, contoh) yang **anda/ustaz sahkan dahulu**. Soalan dijana daripada fakta itu sahaja, jadi tiada rekaan.
- Dalil ditunjukkan hanya untuk ayat al-Quran (surah:ayat). Tiada hadis atau halaman kitab sehingga disahkan.
- Setiap soalan berlabel status semakan; yang belum disemak boleh disembunyikan.

## 6. Jalan ke versi penuh
Kod yang sama akan dinaik taraf kepada **Kuiz Tauhid: Tauliah** kemudian (tambah jenis soalan subjektif, simulasi, Supabase, admin). Struktur data direka dari awal supaya naik taraf tidak perlu tulis semula.

## 7. Anggaran kerja
1. Bank Fakta Asas → anda semak.
2. Rangka aplikasi (fork Pandai Tajwid) + 8 bab + ~300 soalan.
3. Ujian automatik (integriti soalan, pemarkahan, murajaah) + ujian klik semua butang di saiz telefon.
4. Terbit ke GitHub Pages + halaman jualan.
