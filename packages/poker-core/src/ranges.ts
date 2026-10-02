import type { Card } from './cards';
import { makeCard, RANKS, rankOf, suitOf } from './cards';

/**
 * Klasa ręki startowej (jedna ze 169), np. "AKs", "AKo", "77".
 * Siatka 13×13: wiersz = wyższa karta dla s/par, kolumna = niższa; nad przekątną suited, pod offsuit.
 */
export type HandClass = string;

const R = RANKS;
const idx = (c: string): number => {
  const i = R.indexOf(c as (typeof R)[number]);
  if (i < 0) throw new Error(`Nieznana ranga: ${c}`);
  return i;
};

/** Wszystkie 169 klas w kolejności siatki (wiersz A→2, kolumna A→2). */
export const HAND_CLASSES: readonly HandClass[] = (() => {
  const out: HandClass[] = [];
  for (let row = 12; row >= 0; row--) {
    for (let col = 12; col >= 0; col--) {
      if (row === col) out.push(`${R[row]}${R[col]}`);
      else if (col < row) out.push(`${R[row]}${R[col]}s`);
      else out.push(`${R[col]}${R[row]}o`);
    }
  }
  return out;
})();

/** Pozycja klasy w siatce 13×13 (0,0 = AA w lewym górnym rogu). */
export function gridPosition(hc: HandClass): { row: number; col: number } {
  const hi = idx(hc[0]!);
  const lo = idx(hc[1]!);
  if (hc.length === 2) return { row: 12 - hi, col: 12 - lo };
  if (hc[2] === 's') return { row: 12 - hi, col: 12 - lo };
  return { row: 12 - lo, col: 12 - hi };
}

export function combosCount(hc: HandClass): number {
  if (hc.length === 2) return 6;
  return hc[2] === 's' ? 4 : 12;
}

/** Wszystkie kombinacje kart danej klasy. */
export function classCombos(hc: HandClass): [Card, Card][] {
  const hi = idx(hc[0]!);
  const lo = idx(hc[1]!);
  const out: [Card, Card][] = [];
  if (hc.length === 2) {
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) out.push([makeCard(hi, a), makeCard(hi, b)]);
  } else if (hc[2] === 's') {
    for (let s = 0; s < 4; s++) out.push([makeCard(hi, s), makeCard(lo, s)]);
  } else {
    for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (a !== b) out.push([makeCard(hi, a), makeCard(lo, b)]);
  }
  return out;
}

/** Klasa dla konkretnych dwóch kart. */
export function classOf(a: Card, b: Card): HandClass {
  const ra = rankOf(a);
  const rb = rankOf(b);
  const hi = Math.max(ra, rb);
  const lo = Math.min(ra, rb);
  if (hi === lo) return `${R[hi]}${R[lo]}`;
  return `${R[hi]}${R[lo]}${suitOf(a) === suitOf(b) ? 's' : 'o'}`;
}

function normalizeClass(token: string): HandClass {
  const t = token.trim();
  const m = /^([2-9TJQKA])([2-9TJQKA])([so]?)$/i.exec(t);
  if (!m) throw new Error(`Nieprawidłowa klasa ręki: "${token}"`);
  let [a, b] = [m[1]!.toUpperCase(), m[2]!.toUpperCase()];
  const kind = (m[3] ?? '').toLowerCase();
  if (idx(a) < idx(b)) [a, b] = [b, a];
  if (a === b) {
    if (kind) throw new Error(`Para nie ma oznaczenia s/o: "${token}"`);
    return `${a}${b}`;
  }
  if (!kind) throw new Error(`Brak oznaczenia s/o: "${token}"`);
  return `${a}${b}${kind}`;
}

/**
 * Parser notacji zakresów: "22+, A2s+, KTo+, QJs, 77-99, A5s-A2s".
 * Zwraca zbiór klas (bez duplikatów), w kolejności siatki.
 */
export function parseRange(text: string): HandClass[] {
  const set = new Set<HandClass>();
  for (const raw of text.split(',')) {
    const token = raw.trim();
    if (!token) continue;
    if (token.includes('-')) {
      const [fromRaw, toRaw] = token.split('-');
      const from = normalizeClass(fromRaw!);
      const to = normalizeClass(toRaw!);
      expandDash(from, to).forEach((c) => set.add(c));
    } else if (token.endsWith('+')) {
      expandPlus(normalizeClass(token.slice(0, -1))).forEach((c) => set.add(c));
    } else {
      set.add(normalizeClass(token));
    }
  }
  return HAND_CLASSES.filter((c) => set.has(c));
}

function expandPlus(base: HandClass): HandClass[] {
  const hi = idx(base[0]!);
  const lo = idx(base[1]!);
  const out: HandClass[] = [];
  if (base.length === 2) {
    for (let r = lo; r <= 12; r++) out.push(`${R[r]}${R[r]}`);
  } else {
    for (let r = lo; r < hi; r++) out.push(`${R[hi]}${R[r]}${base[2]}`);
  }
  return out;
}

function expandDash(a: HandClass, b: HandClass): HandClass[] {
  const out: HandClass[] = [];
  if (a.length === 2 && b.length === 2) {
    const [x, y] = [idx(a[0]!), idx(b[0]!)].sort((p, q) => p - q) as [number, number];
    for (let r = x; r <= y; r++) out.push(`${R[r]}${R[r]}`);
    return out;
  }
  if (a[0] !== b[0] || a.length !== 3 || b.length !== 3 || a[2] !== b[2]) {
    throw new Error(`Nieobsługiwany przedział: ${a}-${b}`);
  }
  const hi = idx(a[0]!);
  const [x, y] = [idx(a[1]!), idx(b[1]!)].sort((p, q) => p - q) as [number, number];
  for (let r = x; r <= y; r++) out.push(`${R[hi]}${R[r]}${a[2]}`);
  return out;
}

/** Liczba kombinacji w zakresie i odsetek z 1326. */
export function rangeStats(classes: readonly HandClass[]): { combos: number; percent: number } {
  const combos = classes.reduce((s, c) => s + combosCount(c), 0);
  return { combos, percent: combos / 1326 };
}
