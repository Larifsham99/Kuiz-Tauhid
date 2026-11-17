// ===== PENJANA SOALAN daripada Bank Fakta =====
// Peraturan:
//  • Jawapan betul diambil terus daripada fakta; pilihan salah ialah nilai setara daripada fakta LAIN.
//  • Rawak bertetap (seed daripada ID) → ID soalan & susunan pilihan stabil antara versi.
//  • Item kuiz:false tidak dijadikan soalan; item ⚠️ (sahkan) ditanda unverified.
import type { Fakta, Kelas, Pasangan, Senarai } from '../data/fakta/types';
import type { Question, QOption } from '../types';

export interface Sumber { fakta: Fakta[]; senarai: Senarai[]; kelas: Kelas[]; pasangan: Pasangan[] }

function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function seeded<T>(arr: T[], seed: string): T[] {
  const a = [...arr]; let s = hash(seed) || 1;
  const rnd = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const key = (t: string) => t.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase();
const bab = (n: number) => `b${n}`;
const clean = (t: string) => t.replace(/\s*\(ikut tertib[^)]*\)/i, '').trim();
const uniq = (xs: string[]) => { const seen = new Set<string>(); return xs.filter((x) => { const k = key(x); if (!k || seen.has(k)) return false; seen.add(k); return true; }); };

type Base = Pick<Question, 'chapterId' | 'faktaId' | 'why' | 'unverified' | 'status'> & Partial<Pick<Question, 'arabic' | 'arabicRef' | 'dalil'>>;

/** Bina soalan ABCD. null jika pilihan salah tidak mencukupi. */
/** pool disusun ikut keutamaan; hanya `window` calon teratas dipertimbangkan (pilihan salah kekal setara). */
function mcq(id: string, base: Base, prompt: string, correct: string, pool: string[], need = 3, shuffleOpts = true, window = 8): Question | null {
  const wrong = uniq(pool).filter((x) => key(x) !== key(correct)).slice(0, Math.max(need, window));
  if (wrong.length < need) return null;
  const picked = seeded(wrong, id).slice(0, need);
  const texts = shuffleOpts ? seeded([correct, ...picked], id + '#o') : [correct, ...picked];
  const options: QOption[] = texts.map((text, i) => ({ id: 'abcd'[i], text }));
  return { id, type: 'mcq', prompt, options, answer: options.find((o) => o.text === correct)!.id, ...base };
}
function tf(id: string, base: Base, prompt: string, truth: boolean): Question {
  return { id, type: 'tf', prompt, answer: truth ? 'B' : 'S', ...base };
}

// ---------- Fakta ----------
const KATEGORI = 'Kategori sifat';
const family = (k: string) => (k === KATEGORI ? k : k.split(' ')[0]);
/** Rakan setara mengikut keutamaan: kumpulan sama → keluarga sama (cth. semua "Sifat …") → bab sama (tanpa item kategori). */
function peersOf(f: Fakta, quiz: Fakta[]): Fakta[] {
  const others = quiz.filter((g) => g.id !== f.id);
  const same = others.filter((g) => g.kumpulan === f.kumpulan);
  if (same.length >= 3) return [...same.filter((g) => g.bab === f.bab), ...same.filter((g) => g.bab !== f.bab)];
  const fam = others.filter((g) => g.kumpulan !== f.kumpulan && family(g.kumpulan) === family(f.kumpulan));
  if (same.length + fam.length >= 3) return [...same, ...fam];
  return [...same, ...fam, ...others.filter((g) => g.bab === f.bab && g.kumpulan !== KATEGORI && !same.includes(g) && !fam.includes(g))];
}

function fromFakta(all: Fakta[]): Question[] {
  const out: Question[] = [];
  const quiz = all.filter((f) => f.kuiz !== false);
  const sifatWithLawan = quiz.filter((f) => f.lawan && f.bab >= 3 && f.bab <= 7);
  const dalilCount = new Map<string, number>();
  quiz.forEach((f) => f.dalil?.forEach((d) => dalilCount.set(d.arab, (dalilCount.get(d.arab) ?? 0) + 1)));

  for (const f of quiz) {
    // rakan setara: kumpulan sama (bab sama dahulu), kemudian bab sama
    const peers = peersOf(f, quiz);
    const label = `**${f.nama}**${f.arab ? ` (${f.arab})` : ''}`;
    const why = [`${label}: ${f.makna}`, f.lawan ? `Lawannya: **${f.lawan.nama}** — ${f.lawan.makna.toLowerCase()}.` : '', f.nota ?? ''].filter(Boolean).join('\n');
    const base: Base = { chapterId: bab(f.bab), faktaId: f.id, why, unverified: !!f.sahkan, status: f.status, dalil: f.dalil?.[0] };
    const push = (q: Question | null) => { if (q) out.push(q); };

    // 1. Nama → makna
    push(mcq(`${f.id}~makna`, base, `Pilih penerangan yang tepat bagi **${f.nama}**.`, f.makna, peers.map((g) => g.makna)));
    // 2. Makna → nama (jika makna tidak membocorkan nama)
    if (!key(f.makna).includes(key(f.nama))) push(mcq(`${f.id}~nama`, base, `“${f.makna}”\n\nPenerangan ini merujuk kepada…`, f.nama, peers.map((g) => g.nama)));
    // 3. Tulisan Arab → nama Rumi
    if (f.arab) {
      const ap = peers.filter((g) => g.arab);
      push(mcq(`${f.id}~arab`, { ...base, arabic: f.arab, dalil: undefined }, 'Apakah sebutan Rumi bagi istilah ini?', f.nama, ap.map((g) => g.nama)));
    }
    // 4–6. Lawan
    if (f.lawan) {
      const lp = [...sifatWithLawan.filter((g) => g.id !== f.id && g.kumpulan === f.kumpulan), ...sifatWithLawan.filter((g) => g.id !== f.id && g.kumpulan !== f.kumpulan)];
      const fmt = (x: NonNullable<Fakta['lawan']>) => `${x.nama} (${x.makna.toLowerCase()})`;
      push(mcq(`${f.id}~lawan`, base, `Apakah lawan (sifat mustahil) bagi **${f.nama}**?`, fmt(f.lawan), lp.map((g) => fmt(g.lawan!))));
      push(mcq(`${f.id}~lawan-r`, base, `**${f.lawan.nama}** (${f.lawan.makna.toLowerCase()}) ialah lawan bagi sifat…`, f.nama, lp.map((g) => g.nama)));
      out.push(tf(`${f.id}~lawan-b`, base, `Lawan bagi **${f.nama}** ialah **${f.lawan.nama}**.`, true));
      const other = seeded(lp, f.id + 'tf')[0];
      if (other && key(other.lawan!.nama) !== key(f.lawan.nama)) out.push(tf(`${f.id}~lawan-s`, { ...base, why: `${why}\n**${other.lawan!.nama}** pula ialah lawan bagi ${other.nama}.` }, `Lawan bagi **${f.nama}** ialah **${other.lawan!.nama}**.`, false));
    }
    // 7. Dalil → nama (hanya dalil yang unik kepada fakta ini)
    f.dalil?.forEach((d, i) => {
      if (dalilCount.get(d.arab) !== 1) return;
      const prompt = f.bab === 12 ? 'Ayat ini berkaitan dengan…' : 'Ayat ini menjadi dalil bagi…';
      push(mcq(`${f.id}~dalil${i}`, { ...base, arabic: d.arab, arabicRef: d.rujukan, dalil: d }, prompt, f.nama, peers.map((g) => g.nama)));
    });
  }
  return out;
}

// ---------- Senarai ----------
function fromSenarai(all: Senarai[]): Question[] {
  const out: Question[] = [];
  for (const s of all.filter((x) => x.kuiz !== false)) {
    const t = clean(s.tajuk);
    const why = `**${t}:** ${s.item.join(s.tertib ? ' → ' : ', ')}.${s.nota ? `\n${s.nota}` : ''}`;
    const base: Base = { chapterId: bab(s.bab), faktaId: s.id, why, unverified: !!s.sahkan, status: s.status };
    const push = (q: Question | null) => { if (q) out.push(q); };
    const n = s.item.length;
    if (s.soalanBilangan) {
      const nums = [n - 2, n - 1, n + 1, n + 2, n + 3, n * 2].filter((x) => x > 0 && x !== n).map(String);
      push(mcq(`${s.id}~bil`, base, s.soalanBilangan, String(n), nums));
    }
    if (s.bukan?.length && n >= 3) {
      s.bukan.forEach((b, i) => push(mcq(`${s.id}~bukan${i}`, base, `Yang manakah **BUKAN** termasuk dalam ${t}?`, b, seeded(s.item, `${s.id}${i}`).slice(0, 3))));
      if (s.bukan.length >= 3) seeded(s.item, s.id + 'ada').slice(0, 3).forEach((it, i) => push(mcq(`${s.id}~ada${i}`, base, `Yang manakah termasuk dalam ${t}?`, it, s.bukan!)));
    }
    if (s.tertib && n >= 3) {
      const chunks: string[][] = n <= 6 ? [s.item] : Array.from({ length: Math.ceil(n / 5) }, (_, i) => s.item.slice(i * 5, i * 5 + 5)).filter((c) => c.length >= 3);
      if (n > 6 && n % 5 && n % 5 < 3) chunks[chunks.length - 1] = s.item.slice(-5); // bahagian akhir sekurang-kurangnya 3 item
      chunks.forEach((c, i) => out.push({ id: `${s.id}~susun${i}`, type: 'order', prompt: `Susun mengikut tertib yang betul: **${t}**${chunks.length > 1 ? ` (bahagian ${i + 1})` : ''}`, order: c, ...base }));
      if (n >= 5) s.item.slice(0, -1).forEach((it, i) => push(mcq(`${s.id}~lepas${i}`, base, `Dalam ${t}, apakah yang datang **selepas** “${it}”?`, s.item[i + 1], s.item.filter((_, j) => j !== i && j !== i + 1))));
    }
  }
  return out;
}

// ---------- Klasifikasi hukum ----------
function fromKelas(all: Kelas[]): Question[] {
  return all.map((k) => {
    const why = [k.sebab ?? `Pernyataan ini termasuk perkara **${k.jawapan.toLowerCase()}** pada akal.`, k.sumber ? `Sumber soalan: ${k.sumber}.` : ''].filter(Boolean).join('\n');
    return mcq(`${k.id}~kelas`, { chapterId: bab(k.bab), faktaId: k.id, why, unverified: !!k.sahkan, status: k.status }, `Apakah hukum akal bagi pernyataan ini?\n\n“${k.pernyataan}”`, k.jawapan, k.pilihan, k.pilihan.length - 1, false);
  }).filter((q): q is Question => !!q);
}

// ---------- Padanan ----------
function fromPasangan(all: Pasangan[]): Question[] {
  const out: Question[] = [];
  for (const p of all) {
    const why = `**${p.tajuk}:**\n${p.pasangan.map(([l, r]) => `• ${l} → ${r}`).join('\n')}${p.nota ? `\n${p.nota}` : ''}`;
    const base: Base = { chapterId: bab(p.bab), faktaId: p.id, why, unverified: !!p.sahkan, status: p.status };
    const rights = p.pasangan.map((x) => x[1]);
    const rightCount = new Map<string, number>(); rights.forEach((r) => rightCount.set(r, (rightCount.get(r) ?? 0) + 1));
    // Padanan: kumpulan 4 pasangan dengan jawapan kanan yang berbeza
    const distinct = seeded(p.pasangan.filter(([, r], i) => rights.indexOf(r) === i), p.id);
    if (distinct.length >= 3) {
      const groups = distinct.length <= 5 ? [distinct] : Array.from({ length: Math.ceil(distinct.length / 4) }, (_, i) => distinct.slice(i * 4, i * 4 + 4));
      const last = groups[groups.length - 1];
      if (last.length < 3) groups[groups.length - 1] = distinct.slice(-4);
      groups.forEach((g, i) => out.push({ id: `${p.id}~padan${i}`, type: 'match', prompt: `Padankan: **${p.tajuk}**`, pairs: g.map(([left, right]) => ({ left, right })), ...base }));
    }
    if (p.hanyaPadanan) continue;
    p.pasangan.forEach(([l, r], i) => {
      const q1 = mcq(`${p.id}~k${i}`, base, (p.tanyaKanan ?? `${p.kanan} bagi **{x}**?`).replace('{x}', l), r, rights.filter((x) => x !== r));
      if (q1) out.push(q1);
      if (p.tanyaKiri && rightCount.get(r) === 1) {
        const q2 = mcq(`${p.id}~l${i}`, base, p.tanyaKiri.replace('{y_}', r.charAt(0).toLowerCase() + r.slice(1)).replace('{y}', r), l, p.pasangan.filter(([, rr]) => rr !== r).map(([ll]) => ll));
        if (q2) out.push(q2);
      }
    });
  }
  return out;
}

export function janaSoalan(src: Sumber): Question[] {
  return [...fromFakta(src.fakta), ...fromSenarai(src.senarai), ...fromKelas(src.kelas), ...fromPasangan(src.pasangan)];
}
