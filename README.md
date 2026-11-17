# Kuiz Tauhid — Uji Ilmu, Mantapkan Akidah

Aplikasi kuiz interaktif ilmu Tauhid peringkat asas (Ahli Sunnah wal Jamaah, Asya'irah) — mesra telefon, ringan, berfungsi luar talian.

## Menu
| Menu | Kandungan |
|---|---|
| **Kuiz** (utama) | Cabaran Harian, Kuiz Pantas, Ulang Salah (automatik), Fokus Kelemahan, kuiz ikut 12 bab (★★★ setiap bab), Kuiz suai (bab / jenis / bilangan). |
| **Nota** | Nota ringkas setiap bab (takrif, Arab, lawan, dalil, senarai, jadual padanan) + kad imbas. |
| **Skor** | Bintang, ketepatan, istiqamah, tahap, penguasaan bab, 15 lencana, papan skor profil dalam peranti, sejarah kuiz. |
| **Profil** | Beberapa profil satu peranti, tema cerah/gelap, saiz tulisan Arab, bunyi, sandaran JSON. |

Jenis soalan: **ABCD**, **Benar/Salah**, **Padanan**, **Susun ikut tertib**.

## Kandungan: Bank Fakta → soalan
- `src/data/fakta/` ialah **sumber tunggal** kandungan (12 bab). Dokumen semakan: `docs/BANK-FAKTA.md` (`npm run jana-semakan`).
- `src/lib/jana.ts` menjana ~760 soalan daripada fakta: jawapan betul diambil terus daripada fakta; pilihan salah ialah nilai setara daripada fakta lain; susunan rawak bertetap (ID soalan stabil).
- Item bertanda **⚠ perlu disahkan** (`sahkan:`) **tidak dimainkan secara lalai** (boleh dihidupkan di Profil → Tetapan). Item `kuiz: false` hanya dipaparkan dalam nota.
- Untuk mengesahkan item: buang medan `sahkan` (atau betulkan fakta) dan tukar `status` kepada `'disahkan'`.
- Menambah kandungan = menambah baris dalam fail fakta; soalan dijana automatik.

## Pembangunan
```bash
npm install
npm run dev        # pelayan pembangunan
npm test           # ujian integriti Bank Fakta, penjana soalan, pemarkahan, ulang kaji, tahap
npm run build      # binaan ke dist/ (termasuk halaman jualan di dist/jualan/)
```
Penempatan: `.github/workflows/pages.yml` membina, menguji dan menerbitkan ke GitHub Pages apabila push ke `main`.

## Kod pengaktifan
- Aplikasi memerlukan kod. Jana kod: `node scripts/jana-kod.mjs 100 https://<url-aplikasi>/`
  - Senarai kod sebenar → `kod-pengaktifan/*.csv` (**rahsia**, tidak di-commit).
  - Hash kod → `src/data/activation-hashes.json` (commit & terbitkan supaya kod berfungsi).
- Hantar kod (cth. `KT-7K3M-Q9XA-2HDF`) atau pautan `https://<url-aplikasi>/?kod=KT-…`.

## Halaman jualan
`public/jualan/index.html` — ubah harga, pautan bayaran, WhatsApp, screenshot, testimoni dan analitik dalam blok `window.SALES` di bahagian atas fail.

## Data pengguna
Semua rekod disimpan dalam pelayar (localStorage) pada peranti pengguna. Tiada akaun, tiada pelayan, tiada iklan.

Bahan sokongan ulang kaji — tidak menggantikan pengajian bersama guru.
