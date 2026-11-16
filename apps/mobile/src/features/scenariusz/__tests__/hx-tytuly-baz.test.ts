/// <reference types="node" />
/// <reference types="jest" />
// HX (D-1730, D-1732; zlecenie HX pkt 3.1): tytuły startu ze wszystkich baz treści w paczce (po jednej na język, `assets/content`).
// Jest nie mierzy układu, więc sufit jest tu rachunkiem na długości ważonej: pomiar HQ (Chromium, 630 tytułów, 390 pt) dał ≤ 3 wiersze dla wszystkich tytułów
// do progu (54/68/75), a jedyny tytuł z 5 wierszami miał 158 znaków (pl SC-04, D-1732). Liczbę wierszy w aplikacji mierzy `pnpm zrzuty:web` (dowody hx-*).
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ScenarioTemplate } from '@szkola/content-schema';
import { dlugoscWazona, stylTytuluSytuacji } from '../tytul';
import { podzielSytuacje } from '../zdanie';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

const KATALOG = join(__dirname, '../../../../assets/content');
const SZEROKOSCI = [320, 390, 430] as const;
/** Sufit rachunku: najdłuższy znany tytuł (pl SC-04, 158 znaków, 5 wierszy przy 390) z zapasem 2; dłuższy tytuł to nowe znalezisko dla roli 06 (jak D-1732), nie trzeci styl. */
const SUFIT_DLUGOSCI_WAZONEJ = 160;

const bazy = readdirSync(KATALOG).filter((f) => /^tresc-[^-/]+-.+\.db$/.test(f)).sort();
const jezykZPliku = (f: string) => f.replace(/^tresc-[^-/]+-/, '').replace(/\.db$/, '');
function tytuly(plik: string): { id: string; tytul: string }[] {
  const db = new DatabaseSync(join(KATALOG, plik), { readOnly: true });
  try {
    return (db.prepare('SELECT id, data FROM scenarios ORDER BY id').all() as { id: string; data: string }[]).map((r) => {
      const s = ScenarioTemplate.safeParse(JSON.parse(r.data));
      if (!s.success) throw new Error(`${plik}: szablon ${r.id} niezgodny ze schematem`);
      return { id: r.id, tytul: podzielSytuacje(s.data.situation).tytul };
    });
  } finally {
    db.close();
  }
}

describe('HX D-1730: tytuły startu we wszystkich bazach treści', () => {
  it('paczka ma 35 baz treści (po jednej na język aplikacji), każda z szablonami', () => {
    expect(bazy.length).toBe(35);
    for (const b of bazy) expect(tytuly(b).length).toBeGreaterThan(0);
  });
  it.each(bazy.map((b) => [jezykZPliku(b), b]))('%s: żaden tytuł nie przekracza sufitu, a krótki tytuł zostaje w stylu tytul przy 320/390/430', (_jezyk, plik) => {
    for (const { id, tytul } of tytuly(plik as string)) {
      const w = dlugoscWazona(tytul);
      expect({ id, w, ponadSufit: w > SUFIT_DLUGOSCI_WAZONEJ }).toEqual({ id, w, ponadSufit: false });
      for (const szer of SZEROKOSCI) {
        if (w <= Math.floor(0.19 * (szer - 32))) expect(stylTytuluSytuacji(tytul, szer)).toBe('tytul');
      }
    }
  });
});
