/// <reference types="jest" />
/// <reference types="node" />
/**
 * Sesja BQ (rola 06 fix), znalezisko 06-tresci-004 (recenzja BP): R-M11-013 „nie ma już zakładów” po all-in ma
 * przeczytane źródło szczebla 1: Poker TDA, reguła 17 Face Up for All-Ins (odczyt 2026-11-10, cytat sprawdzony na
 * surowym tekście strony). Trwała kontrola: źródło w `sources` każdego języka, cytat w `source` pl i wpis w rejestrze.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '../../../../../..');
const TDA = 'https://www.pokertda.com/view-poker-tda-rules/';
const CYTAT = 'All hands will be tabled without delay once a player is all-in and all betting action by all other players in the hand is complete.';
const blok = (lang: string, id: string) =>
  readFileSync(join(ROOT, 'content', lang, 'rules.yaml'), 'utf8').split(/\n- id: /).find((b) => b.startsWith(`${id}\n`)) ?? '';
const JEZYKI = readdirSync(join(ROOT, 'content')).filter((d) => existsSync(join(ROOT, 'content', d, 'rules.yaml')));

describe('06-tresci-004 (BQ): R-M11-013 ma źródło TDA reguła 17', () => {
  it('sources w każdym języku zawiera regulamin TDA', () => {
    expect(JEZYKI.length).toBe(12);
    for (const l of JEZYKI) expect([l, blok(l, 'R-M11-013').match(/\n {2}sources: (.*)\n?/)?.[1]?.includes(TDA)]).toEqual([l, true]);
  });

  it('source pl cytuje regułę 17 dosłownie', () => {
    expect(blok('pl', 'R-M11-013')).toContain(CYTAT);
  });

  it('rejestr (bn.json) ma źródło szczebla 1 z cytatem i datą odczytu', () => {
    const r = JSON.parse(readFileSync(join(ROOT, 'docs/tresci/rejestr/bn.json'), 'utf8')) as { id: string; zrodla: { adres: string; cytat: string; szczebel: number; odczyt: string }[] }[];
    const z = r.find((w) => w.id === 'R-M11-013')?.zrodla.find((x) => x.adres === TDA);
    expect(z?.cytat).toBe(CYTAT);
    expect(z?.szczebel).toBe(1);
    expect(z?.odczyt).toMatch(/^\d{4}-\d\d-\d\d$/);
  });
});
