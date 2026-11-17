// Ujian integriti Bank Fakta. Jalankan: node scripts/semak-fakta.ts
import { BAB, FAKTA, SENARAI, KELAS, PASANGAN } from '../src/data/fakta/index.ts';

const errors: string[] = [];
const all = [...FAKTA, ...SENARAI, ...KELAS, ...PASANGAN];
const ids = new Set<string>();
for (const x of all) {
  if (ids.has(x.id)) errors.push(`ID berulang: ${x.id}`);
  ids.add(x.id);
  if (!BAB.some((b) => b.no === x.bab)) errors.push(`${x.id}: bab ${x.bab} tidak wujud`);
  if (!x.id.startsWith(`b${x.bab}-`)) errors.push(`${x.id}: awalan ID tidak sepadan dengan bab ${x.bab}`);
}
for (const f of FAKTA) {
  if (!f.nama.trim() || !f.makna.trim()) errors.push(`${f.id}: nama/makna kosong`);
  for (const d of f.dalil ?? []) if (!d.arab.trim() || !d.rujukan.trim()) errors.push(`${f.id}: dalil tidak lengkap`);
}
for (const s of SENARAI) {
  if (s.item.length < 2) errors.push(`${s.id}: senarai terlalu pendek`);
  if (new Set(s.item).size !== s.item.length) errors.push(`${s.id}: item berulang`);
}
for (const k of KELAS) if (!k.pilihan.includes(k.jawapan)) errors.push(`${k.id}: jawapan tiada dalam pilihan`);
for (const p of PASANGAN) if (p.pasangan.length < 3) errors.push(`${p.id}: padanan kurang daripada 3`);
for (const b of BAB) if (!all.some((x) => x.bab === b.no)) errors.push(`Bab ${b.no} tiada kandungan`);

// Semakan kiraan yang mesti tepat
const count = (kumpulan: string) => FAKTA.filter((f) => f.kumpulan === kumpulan).length;
const expect = (label: string, got: number, want: number) => { if (got !== want) errors.push(`${label}: ${got}, sepatutnya ${want}`); };
expect('Sifat Nafsiyyah', count('Sifat Nafsiyyah'), 1);
expect('Sifat Salbiyyah', count('Sifat Salbiyyah'), 5);
expect("Sifat Ma'ani", count("Sifat Ma'ani"), 7);
expect("Sifat Ma'nawiyyah", count("Sifat Ma'nawiyyah"), 7);
expect('Sifat wajib rasul', count('Sifat wajib rasul'), 4);
const sen = (id: string) => SENARAI.find((s) => s.id === id)?.item.length ?? 0;
expect('Sifat 20', sen('b8-sifat20'), 20);
expect('25 nabi', sen('b7-25-nabi'), 25);
expect('10 sahabat', sen('b11-sepuluh'), 10);
expect('10 malaikat', sen('b9-malaikat10'), 10);
expect('Rukun Iman', sen('b9-rukun-iman'), 6);
expect('Rukun Islam', sen('b9-rukun-islam'), 5);
expect('Isteri Nabi', sen('b10-isteri'), 11);
expect('Tanda besar kiamat', sen('b12-tanda-besar'), 10);

if (errors.length) { console.error(`❌ ${errors.length} ralat:\n- ` + errors.join('\n- ')); process.exit(1); }
const perBab = BAB.map((b) => `B${b.no}:${all.filter((x) => x.bab === b.no).length}`).join(' ');
console.log(`✅ Bank Fakta sah — ${all.length} item (${perBab})`);
