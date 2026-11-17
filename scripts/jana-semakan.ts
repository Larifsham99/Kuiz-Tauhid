// Jana dokumen semakan Bank Fakta: docs/BANK-FAKTA.md
// Jalankan: node scripts/jana-semakan.ts   (Node 22.18+ menyokong TypeScript terus)
import { writeFileSync } from 'node:fs';
import { BAB, FAKTA, SENARAI, KELAS, PASANGAN } from '../src/data/fakta/index.ts';

const esc = (s: string) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ');
const out: string[] = [];
const total = FAKTA.length + SENARAI.length + KELAS.length + PASANGAN.length;
const sahkanCount = [...FAKTA, ...SENARAI, ...KELAS, ...PASANGAN].filter((x) => x.sahkan).length;

out.push('# Bank Fakta Asas — Kuiz Tauhid: Beginner', '');
out.push('> Dokumen ini **dijana automatik** daripada `src/data/fakta/`. Jangan sunting di sini — sunting fail data, kemudian jalankan `node scripts/jana-semakan.ts`.', '');
out.push('## Cara menyemak', '');
out.push('- Setiap item ada **ID**. Untuk pembetulan, tulis: `ID — betul / salah — pembetulan`. Contoh: `b4-iradah — salah — lawan Iradah ialah ...`.');
out.push('- ⚠️ **Perlu sahkan** = perkara yang saya sendiri tidak pasti sepenuhnya (khilaf, nombor hadis, tarikh). Sila beri perhatian khusus.');
out.push('- 📝 **Nota sahaja** = dipaparkan dalam nota, tidak dijadikan soalan kuiz.');
out.push('- Semua item berstatus **belum disemak** sehingga anda sahkan.', '');
out.push(`**Jumlah:** ${FAKTA.length} fakta · ${SENARAI.length} senarai · ${KELAS.length} pernyataan klasifikasi · ${PASANGAN.length} set padanan = **${total} item** (${sahkanCount} ditanda ⚠️ perlu sahkan).`, '');

out.push('## Kandungan', '');
for (const b of BAB) out.push(`${b.no}. [${b.tajuk}](#bab-${b.no}) — ${b.arab}`);
out.push('');

for (const b of BAB) {
  out.push(`---`, '', `## Bab ${b.no}`, '', `### ${b.tajuk} · ${b.arab}`, '', `_${b.ringkas}_`, '');
  const f = FAKTA.filter((x) => x.bab === b.no);
  if (f.length) {
    out.push('#### Fakta', '');
    for (const x of f) {
      out.push(`**${x.nama}**${x.arab ? ` · ${x.arab}` : ''}  \`${x.id}\`${x.kuiz === false ? ' 📝 Nota sahaja' : ''}  `);
      out.push(`${x.makna}  `);
      if (x.lawan) out.push(`↔ **Lawan:** ${x.lawan.nama}${x.lawan.arab ? ` (${x.lawan.arab})` : ''} — ${x.lawan.makna}  `);
      for (const d of x.dalil ?? []) out.push(`📖 ${d.arab} — _${d.rujukan}_${d.maksud ? `: "${d.maksud}"` : ''}  `);
      if (x.nota) out.push(`ℹ️ ${x.nota}  `);
      if (x.sahkan) out.push(`⚠️ **Perlu sahkan:** ${x.sahkan}  `);
      out.push('');
    }
  }
  const s = SENARAI.filter((x) => x.bab === b.no);
  if (s.length) {
    out.push('#### Senarai', '');
    for (const x of s) {
      out.push(`**${x.tajuk}**  \`${x.id}\`${x.tertib ? ' · _ikut tertib_' : ''}${x.kuiz === false ? ' 📝 Nota sahaja' : ''}`, '');
      x.item.forEach((it, i) => out.push(`${x.tertib ? `${i + 1}.` : '-'} ${it}`));
      if (x.nota) out.push('', `ℹ️ ${x.nota}`);
      if (x.sahkan) out.push('', `⚠️ **Perlu sahkan:** ${x.sahkan}`);
      out.push('');
    }
  }
  const p = PASANGAN.filter((x) => x.bab === b.no);
  if (p.length) {
    out.push('#### Padanan', '');
    for (const x of p) {
      out.push(`**${x.tajuk}**  \`${x.id}\``, '', `| ${x.kiri} | ${x.kanan} |`, '|---|---|');
      for (const [l, r] of x.pasangan) out.push(`| ${esc(l)} | ${esc(r)} |`);
      if (x.nota) out.push('', `ℹ️ ${x.nota}`);
      if (x.sahkan) out.push('', `⚠️ **Perlu sahkan:** ${x.sahkan}`);
      out.push('');
    }
  }
  const k = KELAS.filter((x) => x.bab === b.no);
  if (k.length) {
    out.push('#### Kenal pasti hukum', '', '| ID | Pernyataan | Jawapan | Catatan |', '|---|---|---|---|');
    for (const x of k) out.push(`| \`${x.id}\` | ${esc(x.pernyataan)} | **${x.jawapan}** | ${esc([x.sebab, x.sumber, x.sahkan && `⚠️ ${x.sahkan}`].filter(Boolean).join(' · '))} |`);
    out.push('');
  }
}

writeFileSync(new URL('../docs/BANK-FAKTA.md', import.meta.url), out.join('\n'));
console.log(`docs/BANK-FAKTA.md dijana: ${total} item, ${sahkanCount} perlu sahkan.`);
