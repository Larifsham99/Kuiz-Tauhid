import { getDB } from "./store";

/**
 * KESAN BUNYI — dijana terus dengan Web Audio (tiada fail audio; ringan & berfungsi luar talian).
 * Gaya "kalimba": petikan pendek yang lembut. Boleh dimatikan di Profil → Tetapan.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined" || !getDB().settings.sound) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.85; master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch { return null; }
}

/** Satu petikan kalimba: nada segi tiga + harmonik ke-3 yang cepat pudar. */
function pluck(c: AudioContext, freq: number, at: number, dur: number, gain: number, glideTo?: number) {
  const t = c.currentTime + at;
  const env = c.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(gain, t + 0.006);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  env.connect(master!);
  ([[1, 1, "triangle"], [3.01, 0.12, "sine"]] as [number, number, OscillatorType][]).forEach(([mult, g, type]) => {
    const o = c.createOscillator(); const og = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq * mult, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo * mult, t + dur * 0.8);
    og.gain.setValueAtTime(g, t); if (mult > 1) og.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.35);
    o.connect(og); og.connect(env); o.start(t); o.stop(t + dur + 0.02);
  });
}

let lastTap = -Infinity;
export const sfx = {
  /** "tik" halus untuk butang. */
  tap() { const c = audio(); if (!c) return; const now = performance.now(); if (now - lastTap < 60) return; lastTap = now; pluck(c, 1568, 0, 0.05, 0.07); },
  /** Betul: "ting-ting" dua nada naik. */
  correct() { const c = audio(); if (!c) return; pluck(c, 784, 0, 0.35, 0.3); pluck(c, 1175, 0.09, 0.5, 0.26); },
  /** Salah: satu nada rendah lembut. */
  wrong() { const c = audio(); if (!c) return; pluck(c, 262, 0, 0.42, 0.3, 220); },
  /** Separa betul (padanan/susun). */
  partial() { const c = audio(); if (!c) return; pluck(c, 523, 0, 0.32, 0.22); },
  /** 3 betul berturut-turut: arpeggio bintang. */
  streak() { const c = audio(); if (!c) return; [1047, 1319, 1568].forEach((f, i) => pluck(c, f, i * 0.07, 0.4, 0.17)); },
  /** Lencana / naik tahap: gemerincing bintang. */
  badge() { const c = audio(); if (!c) return; [1568, 1976, 2349, 3136].forEach((f, i) => pluck(c, f, i * 0.06, 0.5, 0.12)); },
  /** Tamat kuiz: fanfare ikut markah. */
  complete(good: boolean) {
    const c = audio(); if (!c) return;
    const notes = good ? [523, 659, 784, 1047] : [523, 659];
    notes.forEach((f, i) => pluck(c, f, i * 0.11, i === notes.length - 1 ? 0.8 : 0.32, 0.22));
  },
};
