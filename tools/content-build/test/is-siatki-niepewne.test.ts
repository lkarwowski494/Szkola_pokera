// 06-tresci-501 (M1-audytor-generalny-002, D-2011…D-2013): w spotach z tabelą odniesienia (opublikowane rozwiązanie solvera)
// każda klasa, w której częstość „gram” kanonu różni się od opublikowanej o 50 pp lub więcej, jest w `uncertain`
// (kryterium klas niepewnych btn-vs-co i sb-vs-btn, content/ranges/spots.yaml). Czerwony przed poprawką: spoty BB
// (6- i 9-max) nie miały klas niepewnych, choć 16 i 13 klas różni się od opublikowanego rozwiązania o 50 pp lub więcej.
// Wynik porównania: docs/tresci/porownanie-siatek.json (narzędzie docs/tresci/narzedzia/siatki-niepewne.py; tabel źródła
// nie trzymamy w repozytorium). Skrót kanonu pilnuje, żeby zmiana siatki wymusiła ponowne porównanie ze źródłem.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { HAND_CLASSES } from '@szkola/poker-core';
import { compileRanges } from '../src/ranges';

const root = resolve(import.meta.dirname, '../../..');
const { spots } = compileRanges(join(root, 'content'));
const porownanie = JSON.parse(readFileSync(join(root, 'docs/tresci/porownanie-siatek.json'), 'utf8')) as {
  kryterium_pp: number;
  spoty: Record<string, { adres: string; cytat: string; odczyt: string; kanon_skrot: string; roznica_50pp: string[] }>;
};

/** Ten sam skrót co w siatki-niepewne.py: klasy alfabetycznie, częstość „gram” (suma grup) w tysięcznych. */
function skrotKanonu(groups: readonly { freqs: readonly number[] }[]): string {
  const gram = new Map(HAND_CLASSES.map((hc, h) => [hc, groups.reduce((s, g) => s + g.freqs[h]!, 0)]));
  const s = [...HAND_CLASSES].sort().map((hc) => `${hc}=${Math.round(gram.get(hc)! * 1000)}`).join(',');
  return createHash('sha256').update(s).digest('hex').slice(0, 16);
}

const WYMAGANE = ['btn-vs-co', 'sb-vs-btn', 'bb-vs-btn', 'bb-vs-sb'].flatMap((s) => [`vs-open.${s}`, `nine.vs-open.${s}`]);

describe('06-tresci-501: klasy z różnicą ≥ 50 pp wobec opublikowanego solvera są niepewne', () => {
  it('kryterium 50 pp i komplet spotów z tabelą odniesienia (6- i 9-max)', () => {
    expect(porownanie.kryterium_pp).toBe(50);
    expect(Object.keys(porownanie.spoty).sort()).toEqual([...WYMAGANE].sort());
  });

  for (const id of WYMAGANE) {
    it(`${id}: każda klasa z różnicą ≥ 50 pp jest w uncertain`, () => {
      const spot = spots.find((s) => s.id === id);
      const p = porownanie.spoty[id]!;
      expect(spot, id).toBeDefined();
      expect(p.adres).toMatch(/^https:\/\//);
      expect(p.odczyt).toMatch(/^\d{4}-\d\d-\d\d$/);
      // siatka zmieniona od porównania: przelicz (siatki-niepewne.py --zapisz) zamiast poprawiać skrót ręcznie
      expect(skrotKanonu(spot!.groups), `${id}: kanon zmienił się od porównania z ${p.adres}`).toBe(p.kanon_skrot);
      expect(p.roznica_50pp.filter((hc) => !spot!.uncertain.includes(hc)), `${id}: klasy ≥ 50 pp spoza uncertain`).toEqual([]);
    });
  }
});
