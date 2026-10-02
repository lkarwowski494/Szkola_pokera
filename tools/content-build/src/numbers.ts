import { alpha, hitProbability, mdf, requiredEquity, ruleOf2And4 } from '@szkola/poker-core';
import type { NumberEntry } from '@szkola/content-schema';

export interface ResolvedNumber {
  key: string;
  value: number;
  display: string;
  entry: NumberEntry;
}

function compute(key: string, e: NumberEntry): number {
  if (e.value !== undefined) return e.value;
  const a = e.args ?? [];
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

export function resolveNumbers(file: Record<string, NumberEntry>): Map<string, ResolvedNumber> {
  const out = new Map<string, ResolvedNumber>();
  for (const [key, entry] of Object.entries(file)) {
    const value = compute(key, entry);
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
