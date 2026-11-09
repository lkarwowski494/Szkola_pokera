import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { jestJezykiem, ZAPASOWY, ZRODLO } from '@szkola/jezyki';

/**
 * K-05 (D-367, D-372): nazwa terminu w języku tekstu dla znacznika `{{t:klucz}}` bez formy. `content/<język>/terms-nazwy.yaml`
 * = mapa klucz terminu → nazwa albo null (null = brak nazwy w języku: skrót albo nazwa angielska jak dotąd). Strażnik: klucze
 * ⊆ terms.yaml, niepuste napisy bez znaczników. pl (nazwa polska z terms.yaml) i en (nazwa angielska, D-287) nie czytają pliku.
 */
export const PLIK_NAZW = 'terms-nazwy.yaml';

const ZNACZNIK = /\{\{|\}\}|\[\[|<\/?[A-Za-z]/;

/** Różnice pliku nazw wobec terms.yaml (pusta lista = zgodny). */
export function roznicaNazw(terms: Readonly<Record<string, unknown>>, nazwy: unknown): string[] {
  if (!nazwy || typeof nazwy !== 'object' || Array.isArray(nazwy)) return ['(korzeń): nie mapa klucz → nazwa'];
  const out: string[] = [];
  for (const [k, v] of Object.entries(nazwy as Record<string, unknown>)) {
    if (!Object.hasOwn(terms, k)) { out.push(`${k}: klucz spoza terms.yaml`); continue; }
    if (v === null) continue;
    if (typeof v !== 'string' || !v.trim()) out.push(`${k}: pusta nazwa albo nie-tekst (null = brak nazwy)`);
    else if (ZNACZNIK.test(v)) out.push(`${k}: znaczniki w nazwie (nazwa to czysty tekst)`);
  }
  return out;
}

/** Nazwy terminów języka `jezyk` (bez null); pl, en i język bez pliku → null; plik niezgodny → błąd budowy. */
export function czytajNazwy(contentDir: string, jezyk: string, terms: Readonly<Record<string, unknown>>): Record<string, string> | null {
  if (jezyk === ZRODLO || jezyk === ZAPASOWY) return null;
  const plik = join(contentDir, jezyk, PLIK_NAZW);
  if (!existsSync(plik)) return null;
  const nazwy: unknown = parseYaml(readFileSync(plik, 'utf8'));
  const r = roznicaNazw(terms, nazwy);
  if (r.length) throw new Error(`${jezyk}/${PLIK_NAZW}: nazwy terminów niezgodne z terms.yaml (${r.length}):\n${r.slice(0, 20).map((x) => `  - ${x}`).join('\n')}`);
  return Object.fromEntries(Object.entries(nazwy as Record<string, string | null>).filter((e): e is [string, string] => e[1] !== null));
}

/** Nazwy wszystkich języków z plikiem (bez pl i en, bez pustych map), alfabetycznie: do modułu terminów aplikacji. */
export function nazwyJezykow(contentDir: string, terms: Readonly<Record<string, unknown>>): Record<string, Record<string, string>> {
  const jezyki = readdirSync(contentDir).filter((k) => jestJezykiem(k) && statSync(join(contentDir, k)).isDirectory()).sort();
  return Object.fromEntries(jezyki.flatMap((j) => {
    const n = czytajNazwy(contentDir, j, terms);
    return n && Object.keys(n).length ? [[j, n]] : [];
  }));
}
