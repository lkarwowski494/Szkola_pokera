import { alpha, FLOP_WETNESS, flopWetnessShares, geometricFraction, hitProbability, mdf, missProbability, requiredEquity, ruleOf2And4 } from '@szkola/poker-core';
import type { NumberEntry } from '@szkola/content-schema';

export interface ResolvedNumber {
  key: string;
  value: number;
  display: string;
  entry: NumberEntry;
}

export type SpotLookup = (spotId: string) => { playPercent: number } | undefined;

function compute(key: string, e: NumberEntry, spots: SpotLookup | undefined, ref: (k: string) => number): number {
  if (e.value !== undefined) return e.value;
  if (e.formula === 'product' || e.formula === 'sum' || e.formula === 'diff') {
    const r = e.refs ?? [];
    if (r.length < 2) throw new Error(`Liczba "${key}": formuła ${e.formula} wymaga co najmniej dwóch odwołań (refs)`);
    const vals = r.map(ref);
    if (e.formula === 'product') return vals.reduce((a, b) => a * b, 1);
    if (e.formula === 'sum') return vals.reduce((a, b) => a + b, 0);
    return vals.slice(1).reduce((a, b) => a - b, vals[0]!);
  }
  if (e.refs && e.args) throw new Error(`Liczba "${key}": podaj args albo refs, nie oba`);
  if (e.formula === 'rangePlay') {
    const s = e.spot ? spots?.(e.spot) : undefined;
    if (!s) throw new Error(`Liczba "${key}": nieznany spot zakresu ${e.spot}`);
    return s.playPercent;
  }
  const a = e.refs ? e.refs.map(ref) : (e.args ?? []);
  const need = (n: number) => {
    if (a.length !== n) throw new Error(`Liczba "${key}": formuła ${e.formula} wymaga ${n} argumentów`);
  };
  switch (e.formula) {
    case 'requiredEquity':
      need(2);
      return requiredEquity(a[0]!, a[1]!);
    case 'mdf':
      need(2);
      return mdf(a[0]!, a[1]!);
    case 'alpha':
      need(2);
      return alpha(a[0]!, a[1]!);
    case 'hitProbability':
      need(3);
      return hitProbability(a[0]!, a[1]!, a[2]! as 1 | 2);
    case 'missProbability':
      need(3);
      return missProbability(a[0]!, a[1]!, a[2]!);
    case 'quotient':
      need(2);
      if (a[1] === 0) throw new Error(`Liczba "${key}": dzielenie przez zero`);
      return a[0]! / a[1]!;
    case 'geometric':
      // (SPR, liczba ulic) → ułamek puli na każdą ulicę, tak by all-in wypadł na ostatniej
      need(2);
      return geometricFraction(a[0]!, a[1]!);
    case 'flopWetnessShare': {
      need(1);
      const w = FLOP_WETNESS[a[0]!];
      if (!w) throw new Error(`Liczba "${key}": flopWetnessShare przyjmuje indeks 0–2`);
      return flopWetnessShares()[w];
    }
    case 'ruleOf2And4':
      need(2);
      return ruleOf2And4(a[0]!, a[1]! as 1 | 2);
    default:
      throw new Error(`Liczba "${key}": brak wartości i formuły`);
  }
}

/** Format polski: przecinek dziesiętny, spacja przed jednostką tylko dla „bb” i „ms”. */
export function formatNumber(value: number, unit: NumberEntry['unit'], decimals: number): string {
  const fmt = (v: number) => v.toFixed(decimals).replace('.', ',');
  switch (unit) {
    case 'percent':
      return `${fmt(value * 100)}%`;
    case 'bb':
      return `${fmt(value)}bb`;
    case 'multiplier':
      return `${fmt(value)}x`;
    case 'ms':
      return `${fmt(value / 1000)} s`;
    case 'ratio':
    case 'count':
      return fmt(value);
  }
}

export function resolveNumbers(file: Record<string, NumberEntry>, spots?: SpotLookup): Map<string, ResolvedNumber> {
  const out = new Map<string, ResolvedNumber>();
  const values = new Map<string, number>();
  const visiting = new Set<string>();
  const ref = (k: string): number => {
    const known = values.get(k);
    if (known !== undefined) return known;
    const e = file[k];
    if (!e) throw new Error(`Odwołanie do nieznanej liczby "${k}"`);
    if (visiting.has(k)) throw new Error(`Cykl odwołań w liczbach przy "${k}"`);
    visiting.add(k);
    const v = compute(k, e, spots, ref);
    visiting.delete(k);
    values.set(k, v);
    return v;
  };
  for (const [key, entry] of Object.entries(file)) {
    const value = ref(key);
    void entry;
    if (!Number.isFinite(value)) throw new Error(`Liczba "${key}" nie jest skończona`);
    if (entry.unit === 'percent' && (value < 0 || value > 1)) throw new Error(`Liczba "${key}": procent spoza 0–1 (${value})`);
    out.set(key, { key, value, display: formatNumber(value, entry.unit, entry.decimals), entry });
  }
  return out;
}

const PLACEHOLDER = /\{\{n:([a-z0-9.\-]+)\}\}/gi;

/** Podstawia {{n:klucz}}. Nieznany klucz przerywa budowanie. Zwraca też użyte klucze. */
export function substitute(text: string, numbers: Map<string, ResolvedNumber>, where: string, used: Set<string>): string {
  return text.replace(PLACEHOLDER, (_m, key: string) => {
    const n = numbers.get(key);
    if (!n) throw new Error(`${where}: nieznana liczba {{n:${key}}}`);
    used.add(key);
    return n.display;
  });
}

/** Wykrywa liczby z % lub bb wpisane ręcznie poza znacznikami (NFR-09). */
export function findHardcodedNumbers(text: string): string[] {
  const withoutPlaceholders = text.replace(PLACEHOLDER, '');
  return withoutPlaceholders.match(/\d+(?:[.,]\d+)?\s?(?:%|bb\b)/g) ?? [];
}
