import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { ZRODLO } from '@szkola/jezyki';

/**
 * Nakładka językowa plików wspólnych (rola 09, K2b): `content/ranges/spots.yaml` i `content/helplines.yaml` leżą poza
 * `content/pl/`, a mają tekst (tytuły sytuacji, nazwy grup akcji, zdanie pomocy H-INT-2). Przekład leży w katalogu
 * języka tekstu pod tą samą ścieżką względną (`content/en/ranges/spots.yaml`, `content/en/helplines.yaml`) i ma
 * pierwszeństwo przed plikiem wspólnym. Przekład wolno zmienić tylko w polach tekstowych: wszystko inne (identyfikatory,
 * ścieżki solvera, numery, adresy, cytaty źródeł) musi być równe plikowi wspólnemu, a znaczniki {{n:…}} i klucze
 * {{t:…}} w każdym polu tekstowym te same co w źródle. Inaczej budowa przerywa (bez cichego rozjazdu treści).
 */

export interface PolaNakladki {
  /** Klucze, których wartość (napis) jest tekstem do przekładu. */
  tekst: ReadonlySet<string>;
  /** Klucze map, w których klucze wpisów są tekstem (np. `groups`: nazwa grupy → akcje); wpisy porównujemy po kolejności. */
  kluczeTekstem: ReadonlySet<string>;
}

export const POLA_SPOTS: PolaNakladki = { tekst: new Set(['title', 'text', 'why']), kluczeTekstem: new Set(['groups', 'wrongSizes']) };
export const POLA_HELPLINES: PolaNakladki = {
  tekst: new Set(['pointer', 'text', 'regions_label', 'info', 'hours', 'cost', 'language', 'label']),
  kluczeTekstem: new Set(),
};

const ZNACZNIKI = /\{\{(n:[^}|]+|t:[^}|]+)(?:\|[^}]*)?\}\}/g;
const znaczniki = (s: string) => [...s.matchAll(ZNACZNIKI)].map((m) => m[1]!).sort().join(',');

/** Różnice przekładu wobec źródła poza polami tekstowymi (pusta lista = zgodne). */
export function roznicePoza(zrodlo: unknown, przeklad: unknown, pola: PolaNakladki, sciezka = '', klucz = ''): string[] {
  const gdzie = sciezka || '(korzeń)';
  if (typeof zrodlo === 'string' && pola.tekst.has(klucz)) {
    if (typeof przeklad !== 'string' || !przeklad.trim()) return [`${gdzie}: pusty albo nie-tekst`];
    return znaczniki(zrodlo) === znaczniki(przeklad) ? [] : [`${gdzie}: znaczniki [${znaczniki(przeklad)}] ≠ źródło [${znaczniki(zrodlo)}]`];
  }
  if (Array.isArray(zrodlo)) {
    if (!Array.isArray(przeklad) || przeklad.length !== zrodlo.length) return [`${gdzie}: inna liczba elementów`];
    return zrodlo.flatMap((x, i) => roznicePoza(x, przeklad[i], pola, `${sciezka}[${i}]`, klucz));
  }
  if (zrodlo && typeof zrodlo === 'object') {
    if (!przeklad || typeof przeklad !== 'object' || Array.isArray(przeklad)) return [`${gdzie}: inny typ`];
    const a = Object.entries(zrodlo), b = Object.entries(przeklad);
    if (pola.kluczeTekstem.has(klucz)) {
      if (a.length !== b.length) return [`${gdzie}: inna liczba wpisów`];
      return a.flatMap(([k, v], i) => {
        const [kp, vp] = b[i]!;
        const zn = znaczniki(k) === znaczniki(kp) ? [] : [`${sciezka}.${kp}: znaczniki klucza ≠ źródło`];
        return [...zn, ...roznicePoza(v, vp, pola, `${sciezka}.${k}`, k)];
      });
    }
    const ka = a.map(([k]) => k).join(','), kb = b.map(([k]) => k).join(',');
    if (ka !== kb) return [`${gdzie}: klucze [${kb}] ≠ źródło [${ka}]`];
    return a.flatMap(([k, v]) => roznicePoza(v, (przeklad as Record<string, unknown>)[k], pola, sciezka ? `${sciezka}.${k}` : k, k));
  }
  return Object.is(zrodlo, przeklad) ? [] : [`${gdzie}: ${JSON.stringify(przeklad)} ≠ źródło ${JSON.stringify(zrodlo)}`];
}

/**
 * Plik wspólny `rel` dla języka tekstu `tekst`: przekład z `content/<tekst>/<rel>`, gdy jest (po sprawdzeniu struktury),
 * inaczej plik wspólny. Zwraca też, skąd przyszedł tekst (do manifestu i komunikatów).
 */
export function czytajZNakladka(contentDir: string, tekst: string, rel: string, pola: PolaNakladki): { dane: unknown; plik: string } {
  const wspolny = join(contentDir, rel);
  const zrodlo: unknown = parseYaml(readFileSync(wspolny, 'utf8'));
  const sciezka = join(contentDir, tekst, rel);
  if (tekst === ZRODLO || !existsSync(sciezka)) return { dane: zrodlo, plik: rel };
  const przeklad: unknown = parseYaml(readFileSync(sciezka, 'utf8'));
  const r = roznicePoza(zrodlo, przeklad, pola);
  if (r.length) throw new Error(`${tekst}/${rel}: przekład zmienia coś poza tekstem (${r.length}):\n${r.slice(0, 20).map((x) => `  - ${x}`).join('\n')}`);
  return { dane: przeklad, plik: `${tekst}/${rel}` };
}
