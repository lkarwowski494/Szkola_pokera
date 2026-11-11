// CZ (06-tresci-006, opcja b recenzji CQ): każdy szablon content/pl/scenarios trafia do co najmniej jednego testu zgodności
// z wyrocznią niezależną od generatora. Filtr testu zgodności, który pominie szablon (np. `every` zamiast `some`), albo nowy
// rodzaj punktu bez testu na treści daje tu czerwony wynik zamiast cichej luki.
// Mapa rodzaj punktu → testy na content/pl jest jawna; drugi test sprawdza, że te pliki nadal wybierają szablony tym filtrem.
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadScenarioTemplates } from '../src/scenariusze';

const pl = loadScenarioTemplates(join(resolve(import.meta.dirname, '../../..'), 'content', 'pl', 'scenarios')).map((x) => x.template);
/** Testy zgodności na treści pl według rodzaju punktu (range-spot, size-spot i icm-call od sesji DU, KO-070: SC-06, SC-32, SC-33, SC-34). */
const TESTY: Record<string, readonly string[]> = {
  'draw-call': ['szablony-bs.test.ts', 'stos-zakladu-bu.test.ts', 'bv-gotowa-reka.test.ts'],
  'cbet-case': ['szablony-co.test.ts'],
  'range-spot': ['szablony-du.test.ts'],
  'size-spot': ['szablony-du.test.ts'],
  'icm-call': ['szablony-co.test.ts'],
};
const rodzaj = (d: { kind?: string }) => d.kind ?? 'draw-call';

describe('CZ: pokrycie szablonów pl testami zgodności (06-tresci-006 b)', () => {
  it('treść pl ma szablony', () => expect(pl.length).toBeGreaterThanOrEqual(3));

  it('każdy szablon pl ma punkt objęty testem zgodności na treści', () => {
    const bez = pl.filter((t) => !t.decisions.some((d) => TESTY[rodzaj(d)])).map((t) => `${t.id} (${t.decisions.map(rodzaj).join(', ')})`);
    expect(bez).toEqual([]);
  });

  for (const [k, pliki] of Object.entries(TESTY)) {
    for (const plik of pliki) {
      it(`${plik} wybiera szablony pl filtrem some(${k}), nie every`, () => {
        const zrodlo = readFileSync(join(import.meta.dirname, plik), 'utf8');
        expect(zrodlo).toContain("'pl', 'scenarios'");
        expect(zrodlo).toMatch(new RegExp(`decisions\\.some\\(\\(d\\) => d\\.kind === '${k}'\\)`));
        expect(zrodlo).not.toMatch(/decisions\.every\(/);
      });
    }
  }
});
