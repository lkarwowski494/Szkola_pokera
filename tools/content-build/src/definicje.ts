import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { jestJezykiem, ZRODLO } from '@szkola/jezyki';

/**
 * Nakładka definicji terminów (D-335; otwarte #3 sesji P, plan-09 §13). Pole `def` w `content/terms.yaml` jest po polsku,
 * a reszta pliku (nazwy angielskie, formy, źródła) nie jest tłumaczona (D-287), więc przekład definicji leży osobno:
 * `content/<język>/terms-def.yaml` = mapa klucz terminu → definicja. Strażnik: dokładnie klucze terminów z `def`,
 * niepuste napisy, czysty tekst bez znaczników (jak `def` w źródle, nagłówek terms.yaml). Język bez pliku nie dostaje
 * polskiej definicji (słowniczek en z polskim zdaniem byłby gorszy niż brak); łańcuch języków rozstrzyga aplikacja.
 */
export const PLIK_DEFINICJI = 'terms-def.yaml';

type TerminZDef = { readonly def?: string | undefined; readonly [pole: string]: unknown };

/** Źródło jednostki przekładu: klucz → polska definicja, w kolejności terms.yaml, tylko terminy z `def`. */
export function zrodloDefinicji(terms: Readonly<Record<string, TerminZDef>>): Record<string, string> {
  return Object.fromEntries(Object.entries(terms).flatMap(([k, t]) => (t.def ? [[k, t.def]] : [])));
}

/** Tekst źródła jednostki (YAML), deterministyczny: skrót sha256 zmienia się tylko ze zmianą definicji. */
export function tekstZrodlaDefinicji(terms: Readonly<Record<string, TerminZDef>>): string {
  return stringifyYaml(zrodloDefinicji(terms), { lineWidth: 0 });
}

const ZNACZNIK = /\{\{|\}\}|\[\[|<\/?[A-Za-z]/;

/** Różnice przekładu wobec źródła (pusta lista = zgodne). */
export function roznicaDefinicji(zrodlo: Readonly<Record<string, string>>, przeklad: unknown): string[] {
  if (!przeklad || typeof przeklad !== 'object' || Array.isArray(przeklad)) return ['(korzeń): nie mapa klucz → definicja'];
  const p = przeklad as Record<string, unknown>;
  const out: string[] = [];
  for (const k of Object.keys(zrodlo)) {
    if (!Object.hasOwn(p, k)) { out.push(`${k}: brak definicji w przekładzie`); continue; }
    const v = p[k];
    if (typeof v !== 'string' || !v.trim()) out.push(`${k}: pusty albo nie-tekst`);
    else if (ZNACZNIK.test(v)) out.push(`${k}: znaczniki w definicji (def to czysty tekst)`);
  }
  for (const k of Object.keys(p)) if (!Object.hasOwn(zrodlo, k)) out.push(`${k}: klucz spoza źródła (termin bez def albo nieznany)`);
  return out;
}

/** Definicje języka `jezyk`: pl → źródło; brak pliku → null; plik niezgodny ze źródłem → błąd budowy. */
export function czytajDefinicje(contentDir: string, jezyk: string, terms: Readonly<Record<string, TerminZDef>>): Record<string, string> | null {
  const zrodlo = zrodloDefinicji(terms);
  if (jezyk === ZRODLO) return zrodlo;
  const plik = join(contentDir, jezyk, PLIK_DEFINICJI);
  if (!existsSync(plik)) return null;
  const przeklad: unknown = parseYaml(readFileSync(plik, 'utf8'));
  const r = roznicaDefinicji(zrodlo, przeklad);
  if (r.length) throw new Error(`${jezyk}/${PLIK_DEFINICJI}: przekład definicji niezgodny ze źródłem (${r.length}):\n${r.slice(0, 20).map((x) => `  - ${x}`).join('\n')}`);
  return przeklad as Record<string, string>;
}

/** Definicje wszystkich języków z plikiem nakładki (bez pl), alfabetycznie: do modułu terminów aplikacji. */
export function definicjeJezykow(contentDir: string, terms: Readonly<Record<string, TerminZDef>>): Record<string, Record<string, string>> {
  const jezyki = readdirSync(contentDir)
    .filter((k) => k !== ZRODLO && jestJezykiem(k) && statSync(join(contentDir, k)).isDirectory())
    .sort();
  return Object.fromEntries(jezyki.flatMap((j) => {
    const d = czytajDefinicje(contentDir, j, terms);
    return d ? [[j, d]] : [];
  }));
}
