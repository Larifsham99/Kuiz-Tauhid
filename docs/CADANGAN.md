# Pandai Tauhid — Cadangan Struktur, Modul & Prototaip (untuk semakan)

> Status: **CADANGAN** — belum ada kod dibina. Sila semak bahagian 9 (soalan untuk anda) sebelum pembangunan penuh.
> Prototaip skrin: https://claude.ai/artifact/TFnfVvZXiSCo2viqsYTziU

---

## 0. Pemahaman saya tentang permintaan (pembetulan kecil)

| Dalam arahan | Saya fahami sebagai |
|---|---|
| "Nota **Feqah** lengkap" | **Nota Tauhid** lengkap (tersalah tulis) |
| "fokus **Mazhab Syafie**" | Dalam ilmu Tauhid, pegangan yang sepadan ialah **Ahli Sunnah wal Jamaah aliran Asya'irah** (dengan perbandingan Maturidiyyah) — iaitu aliran akidah yang dipegang dalam tradisi Syafi'iyyah di Kedah dan yang jelas digunakan dalam kertas soalan (cth. "عند الإمام الأشعري", "الأشاعرة والماتريدية", "ذهب السنوسي"). Mazhab Syafie tetap dirujuk bila soalan menyentuh hukum (cth. taubat, tawassul). |
| "hukum, syarat, rukun" | Disesuaikan untuk Tauhid: **takrif, huraian, dalil aqli, dalil naqli, ta'alluq, lawan (mustahil), khilaf ulama, perbezaan istilah, contoh**. "Rukun/syarat" dipakai hanya bila ada (cth. rukun iman, rukun taubat). |
| "konsep Pandai Tajwid" | Saya telah baca kod repo `Pandai-Tajwid` (React + Vite + TypeScript + Tailwind, 4 menu, Leitner murajaah, XP/lencana, kod pengaktifan, halaman jualan, status semakan kandungan). Struktur dan pengalaman itu dikekalkan. |

---

## 1. Analisis bahan yang dibekalkan (10 kertas, 2014–2025)

**Peperiksaan:** الامتحان التأهيلي لتدريس المواد الدينية باللغة العربية — subjek **التوحيد**.
Penganjur: Majlis Agama Islam Negeri Kedah (2014–2017) → Jabatan Mufti Negeri Kedah (2022–2025).

| Tahun | Fail | Arahan |
|---|---|---|
| 2014, 2015, 2016, 2017 | `Tauhid-I-2014/15/16-Arab.pdf`, `tauhid.arab_.I.pdf` (=2017) | Jawab 4 daripada 5, **S5 wajib** |
| 2018, 2019, 2022, 2023 | `tauhid-arab-2018/2019`, `FAA-TAUHID-2022/2023` | Jawab **4 sahaja** (tiada soalan wajib) |
| 2024, 2025 | `TAUHID-ARAB-2024/2025` | Jawab 4, **S5 wajib** |

- Format tetap: **2 jam, 5 soalan × 25 markah**, setiap soalan 5 bahagian (أ–هـ), markah dikira daripada 4 soalan = 100.
- **Semua soalan subjektif dalam bahasa Arab.** Tiada soalan objektif dalam peperiksaan sebenar.
- 2020–2021 tiada dalam bahan (mungkin tiada peperiksaan — perlu disahkan).
- Jumlah anggaran: **~245 bahagian soalan**.
- Teks PDF menggunakan fon lama (teks tidak boleh disalin), 2023 & 2025 imbasan — **transkripsi akan dibuat secara manual daripada imej dan WAJIB disemak semula** sebelum diterbitkan.

### Corak soalan ikut kedudukan (lazimnya)
- **S1** — Mukadimah: ilmu tauhid, ma'rifah, taqlid, mukallaf, hukum akal, dalil ijmali/tafsili.
- **S2** — Sifat Nafsiyyah & Salbiyyah: wujud, qidam, baqa', mukhalafah, qiyamuhu binafsihi, wahdaniyyah.
- **S3** — Sifat Ma'ani & Ma'nawiyyah: qudrah, iradah, ilmu, hayah, sama', basar, kalam (+ ta'alluq).
- **S4** — Jaiz bagi Allah + Nubuwwat: rukyah, qada' & qadar, sifat rasul, mukjizat, ulul azmi.
- **S5** — Sam'iyyat, sahabat & isu semasa: syafaat, haudh, taubat, kaba'ir, tawassul, Syiah, pluralisme, dsb.

---

## 2. Struktur bab (dirumus daripada soalan sebenar)

| Bab | Tajuk | Topik teras (contoh tahun ditanya) |
|---|---|---|
| 1 | Mukadimah Ilmu Tauhid · مبادئ علم التوحيد | takrif, maudhu', faedah, hukum mempelajari, hukum & faedah (2015), sebab dinamakan ilmu kalam (2016, 2023, 2024), bahagian: ilahiyyat/nubuwwat/sam'iyyat (2018, 2019, 2022) |
| 2 | Hukum Akal · الحكم العقلي | wajib/mustahil/jaiz aqli (2014, 2017, 2023, 2025), beza wajib aqli–syar'i (2015, 2017, 2022), jaiz aqli–syar'i (2019), wajib zati mutlak/muqayyad (2024), bahagian wajib aqli & الأشياء أربعة أقسام (2025) |
| 3 | Mukallaf, Ma'rifah & Taqlid | mukallaf (2015, 2017, 2019), ilmu vs ma'rifah (2016, 2022, 2025), awal kewajipan (2016, 2025), iman muqallid (2014, 2015, 2017, 2019, 2022, 2023), dalil ijmali/tafsili (2015, 2017–2019, 2022, 2023, 2025), zan/wahm/syak (2019), ahl al-fatrah (2015, 2016), taklif jin & malaikat (2018, 2024, 2025), العقائد الخمسون (2014, 2018, 2022, 2024) |
| 4 | Sifat Nafsiyyah: Wujud | makna wujud di sisi Asy'ari & selainnya (2014, 2019, 2023, 2024, 2025), dalil huduth al-'alam (2014, 2016–2019, 2023), ta'lil & tab'i (2017, 2018) |
| 5 | Sifat Salbiyyah | qidam & baqa' (hampir setiap tahun), qadim vs azali (2014, 2017, 2018, 2022, 2023, 2025), mukhalafah lil-hawadith, qiyamuhu binafsihi / istighna' (2023, 2025), wahdaniyyah & kumum khamsah (2015, 2016, 2018, 2023, 2024) |
| 6 | Sifat Ma'ani | qudrah, iradah & hubungannya, ta'alluq saluhi/tanjizi (2016, 2018, 2019, 2022), ilmu, hayah, sama' & basar, kalam (Quran qadim, bukan huruf & suara), takwin (2014) |
| 7 | Sifat Ma'nawiyyah | takrif & senarai (2017, 2024) |
| 8 | Yang Jaiz bagi Allah | fi'l al-mumkinat (2014, 2019), khalq khair & syarr, Mu'tazilah (2014, 2023), pahala/siksa tidak wajib (2016, 2018), af'al al-'ibad (2023), qada' & qadar (2017, 2019, 2023), rukyah (2014, 2016, 2019, 2024) |
| 9 | Mutasyabihat | istiwa', salaf & khalaf (2015, 2024), tasybih (2024) |
| 10 | Nubuwwat | nabi vs rasul (2017, 2018, 2024), sidq/amanah/tabligh/fatanah, 'ismah, a'radh basyariyyah (2015, 2018, 2022), mukjizat/karamah/ma'unah/irhas/istidraj/sihir/sya'wazah, ulul 'azmi (hampir setiap tahun), keistimewaan Nabi ﷺ |
| 11 | Sirah Akidah Nabi ﷺ | nasab (2016, 2024), anak-anak Nabi ﷺ (2015, 2016, 2018, 2023, 2025), ibu bapa Nabi ﷺ (2015) |
| 12 | Sam'iyyat | iman & islam (2018, 2024), syafaat 'uzma & jenis (2016, 2018, 2022, 2023, 2025), haudh & kautsar (2018, 2019, 2024), taubat (2018, 2022, 2025), dosa besar/kecil (2019, 2022), malaikat ma'sum (2019) |
| 13 | Sahabat & Ahli Sunnah | keadilan sahabat (2016), tertib afdhaliyyah (2016, 2023), 10 dijamin syurga (2015), suhbah Abu Bakr (2016, 2017, 2022), tuduhan nifaq/riddah (2014, 2023, 2024) |
| 14 | Isu Semasa & Penyelewengan | tawassul & wasilah (2016, 2023, 2025), majlis selawat, maulid, tahlil & talqin (2017, 2025), syirik 6 bahagian (2023), Syiah Imamiyyah (2015, 2017), Wahhabiyyah (2017), pluralisme agama (2024), "ubat ini menyembuhkan" (2025), menghina Nabi ﷺ (2019), khilaf usul/furu' (2014), kaedah belajar akidah (2025) |

> Pembahagian ini dirumus daripada soalan. **Susunan akhir akan disesuaikan dengan kitab sukatan** (lihat soalan 1 di bahagian 9).

---

## 3. Modul aplikasi

Kekal 4–5 menu seperti Pandai Tajwid, ditambah Ujian dan Admin:

| Menu | Kandungan |
|---|---|
| **Utama** (dashboard) | % kesediaan tauliah, istiqamah harian, bab disambung, topik lemah, bilangan murajaah hari ini |
| **Nota** | 14 bab → topik. Setiap topik: takrif (Arab + terjemahan), huraian, dalil aqli, dalil naqli (ayat/hadis + rujukan tepat), ta'alluq, khilaf, contoh, "pernah ditanya (tahun)". Mod: Nota · Ringkas · Kad imbas · Peta minda. Carian & penanda. |
| **Latihan** | (a) **Soalan Tauliah Lepas** ikut tahun atau ikut bab — semakan kendiri dengan **rubrik isi utama** (tanda isi yang ditulis → markah dikira). (b) **Latih Tubi Objektif** ikut bab: ABCD, Benar/Salah, Padanan, Isi tempat kosong. (c) **Kuiz pantas** 10 soalan. |
| **Ujian** | **Simulasi peperiksaan**: 2 jam, 5 soalan, pilih 4 (pilihan S5 wajib/tidak), kertas sebenar atau kertas rawak gaya tauliah (S1–S5 ikut corak di atas). Tiada nota semasa ujian. Semakan rubrik selepas tamat. |
| **Prestasi** | Markah & sejarah ujian, penguasaan ikut bab, ranking (mingguan/keseluruhan), XP, lencana, istiqamah |
| **Murajaah** | Leitner (dari Pandai Tajwid): soalan salah / bahagian rubrik < 50% masuk barisan automatik, dijadualkan semula |
| **Admin** (web sahaja) | CRUD bab/topik/nota, bank soalan, kertas tauliah, rujukan kitab, pengguna & kod pengaktifan, import/eksport CSV/JSON, log audit |

### Pemarkahan subjektif (keputusan penting)
Mesin tidak boleh menilai karangan Arab dengan adil dan murah. Cadangan: **rubrik isi utama** — setiap jawapan cadangan dipecah kepada 2–5 isi dengan markah; pengguna menanda isi yang ada dalam jawapannya. Jujur, ringan, tiada kos API. (Penilaian AI boleh ditambah kemudian sebagai ciri premium jika mahu.)

### Soalan objektif
Peperiksaan sebenar tiada objektif, jadi soalan objektif **dijana daripada nota yang telah disahkan** (kaedah Pandai Tajwid: jawapan betul diambil verbatim dari nota; topik khilaf tidak dijadikan soalan objektif), dan berlabel **Belum disemak** sehingga disahkan.

---

## 4. Integriti kandungan (tiada rekaan)

1. Setiap nota/soalan ada **status**: Draf → Menunggu semakan → Disemak → Diterbitkan. Pengguna hanya nampak yang Diterbitkan (atau "Belum disemak" jika diaktifkan dalam tetapan).
2. Setiap dalil disimpan dengan **sumber tepat**: ayat (surah:ayat), hadis (kitab + no. hadis + perawi), kitab (judul, pengarang, bab, halaman). Medan halaman dibiarkan kosong jika belum disahkan.
3. Rujukan kitab berstatus **disahkan / belum disahkan** dan nama penyemak.
4. Soalan tauliah disimpan **verbatim** (Arab) + terjemahan Melayu + tahun/soalan/bahagian/markah.
5. Saya tidak akan menulis hadis/nombor halaman yang tidak dapat disahkan; ia akan ditanda `[PERLU SAHKAN]` untuk anda/ustaz penyemak.

---

## 5. Seni bina teknikal

Kekalkan tumpukan Pandai Tajwid supaya kod boleh diguna semula:

- **Frontend:** React 18 + Vite + TypeScript + Tailwind, PWA (boleh dipasang di telefon, nota boleh dibaca luar talian).
- **Backend:** **Supabase** (Postgres + Auth + Row Level Security). Pandai Tajwid sudah ada laluan naik taraf ke Supabase — di sini ia jadi wajib kerana panel admin, ranking dalam talian dan kawalan kod pengaktifan.
- **Kandungan:** disimpan dalam pangkalan data, dimuat turun sebagai satu "pakej kandungan" berversi dan dicache dalam peranti (pantas, jimat data, berfungsi luar talian). Admin terbit → versi naik → peranti kemas kini.
- **Hosting:** GitHub Pages / Cloudflare Pages (statik, percuma) + Supabase.
- **Ujian:** Vitest (integriti kandungan, pemarkahan, murajaah, simulasi) + Playwright (klik setiap butang utama di saiz telefon & desktop).

### Skema pangkalan data (ringkas)
```
chapters(id, no, title_ms, title_ar, summary, sort, status)
topics(id, chapter_id, title_ms, title_ar, sort, status, body jsonb)   -- takrif, huraian, dalil, khilaf, contoh
references(id, kind[quran|hadis|kitab], citation, kitab, author, volume, page, verified, verified_by)
topic_refs(topic_id, reference_id)
questions(id, chapter_id, topic_id, source[tauliah|latihan|jana], type[subjective|mcq|tf|fill|match],
          prompt_ar, prompt_ms, options jsonb, answer jsonb, model_answer, rubric jsonb, marks,
          year, q_no, part, difficulty, status, reviewed_by, updated_at)
papers(id, year, hijri, organiser, instruction, compulsory_q5, duration_min)
paper_questions(paper_id, question_id, q_no, part)
profiles(id=auth.uid, display_name, role[user|editor|admin], activated_code_id)
activation_codes(id, code_hash, used_by, used_at, note)
attempts(id, user_id, question_id, mode, score, max, rubric_ticks jsonb, created_at)
exam_sessions(id, user_id, paper_id|null, started_at, submitted_at, chosen_q jsonb, score)
review_queue(user_id, question_id, box, due_at, lapses)
leaderboard_weekly (view)
audit_log(id, actor, table, row_id, action, diff jsonb, at)
```
**Keselamatan:** RLS pada semua jadual — pengguna hanya baca kandungan berstatus diterbitkan dan baca/tulis rekod sendiri; hanya `role in (editor, admin)` boleh ubah kandungan; hanya admin boleh urus pengguna & kod; kunci rahsia tidak pernah berada dalam frontend.

---

## 6. Perkara yang sengaja TIDAK dimasukkan (supaya ringan)
Forum/sembang, video, penilaian AI karangan (fasa 1), aplikasi natif berasingan (PWA mencukupi), multi-bahasa UI selain Melayu.

---

## 7. Fasa pembangunan

| Fasa | Hasil | Bergantung kepada |
|---|---|---|
| **0** | Cadangan + prototaip (dokumen ini) | — |
| **1** | Rangka kod (fork struktur Pandai Tajwid), skema Supabase + RLS, log masuk + kod pengaktifan, navigasi semua menu | Kelulusan anda |
| **2** | Transkripsi 10 kertas (verbatim) + terjemahan + pemetaan ke bab; Latihan Tauliah & Simulasi berfungsi | Semakan transkripsi oleh anda |
| **3** | Panel admin (CRUD, status semakan, import/eksport, audit) | — |
| **4** | Nota 14 bab daripada kitab sukatan + jawapan cadangan & rubrik | **Bahan kitab daripada anda** |
| **5** | Objektif dijana daripada nota, murajaah, prestasi, ranking, lencana | Nota disahkan |
| **6** | Ujian penuh (unit + E2E semua butang), halaman jualan, terbit | — |

---

## 8. Prototaip
6 skrin: Laman Utama · Nota Bab · Soalan Tauliah + Rubrik · Simulasi Peperiksaan · Keputusan & Kemajuan · Panel Admin.
Pautan: https://claude.ai/artifact/TFnfVvZXiSCo2viqsYTziU
(Nombor/nama dalam prototaip hanyalah contoh paparan.)

---

## 9. Soalan untuk anda sebelum pembangunan

1. **Kitab sukatan:** Soalan kerap memetik "قال المصنف" dan "العقائد الخمسون". Kitab apakah yang menjadi teks peperiksaan (cth. *Kifayat al-'Awam* beserta syarahnya, *Umm al-Barahin* al-Sanusi, atau kitab lain)? Bolehkah anda bekalkan PDF/teksnya? Nota & jawapan cadangan akan dibina daripadanya.
2. **Jawapan cadangan:** Adakah anda/ustaz akan menyemak jawapan cadangan & rubrik, atau ada skema jawapan rasmi/nota kelas yang boleh dibekalkan?
3. **Nama & repo:** Nama aplikasi "Pandai Tauhid"? Repo ini bernama `Kuiz-Fiqh` — guna repo ini atau buka repo baharu `Pandai-Tauhid`?
4. **Model jualan:** Kekalkan kod pengaktifan sekali bayar (seperti Pandai Tajwid), atau langganan?
5. **Ranking:** Tunjuk nama penuh, nama samaran, atau tanpa nama?
6. **Bahasa jawapan latihan:** Pengguna menulis dalam Arab sahaja (seperti peperiksaan), atau dibenarkan Melayu semasa latihan?
