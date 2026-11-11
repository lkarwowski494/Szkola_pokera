// Test odtwarzający recenzji DD (rola 06, audit) zmian CW 46197812..0ef77858: DD-WYS-001 (NIS-003).
// Raport: docs/tresci/recenzje/recenzja-cw-0ef7785.md. `it.fails` = błąd istnieje (wzór: recenzja-cq-odtworzenie.test.ts);
// po naprawie zamienić `odtwarzaBlad` na `it` w obu przypadkach.
// Zdanie NIS-003 w wyjaśnieniach draw-call mówi: „Każda twoja karta wyższa od stołu daje jeszcze {{n:pair.outs.per-rank}} (= 3)
// niepewne outy na parę”. Wyrocznia liczona od zera z kart (bez classifyHolding i bez generatora poza losowaniem wariantu):
// nowe outy rangi = niewidoczne karty tej rangi, które same nie domykają już koloru ani strita (te są policzone w outach drawa).
// Na stole z trzema kartami koloru drawa i z nadkartą gracza w innym kolorze jedna z trzech kart tej rangi jest już outem koloru,
// więc nowych outów jest 2, nie 3 (sc-01, sc-19). W sc-02 i sc-03 (strit) karty gracza leżą wewnątrz okna, więc nakładania nie ma.
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FULL_DECK, generateVariant, rankOf, suitOf, type Card, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';
import { number } from './kit';

const odtwarzaBlad = it.fails;
const root = resolve(import.meta.dirname, '../../..');
const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
const NA_RANGE = number('pair.outs.per-rank');
const ZDANIE = '{{n:pair.outs.per-rank}}';

/** Pozycje rangi 1…14 (as także jako 1); rangi 0 = 2 … 12 = A. */
const poz = (r: number) => (r === 12 ? [1, 14] : [r + 2]);
const strit = (karty: readonly Card[]) => {
  const s = new Set(karty.map(rankOf).flatMap(poz));
  for (let lo = 1; lo <= 10; lo++) if ([0, 1, 2, 3, 4].every((k) => s.has(lo + k))) return true;
  return false;
};
const kolor = (karty: readonly Card[]) => [0, 1, 2, 3].some((s) => karty.filter((c) => suitOf(c) === s).length >= 5);
const domykaDraw = (reka: readonly Card[], stol: readonly Card[], c: Card) => strit([...reka, ...stol, c]) || kolor([...reka, ...stol, c]);

/** Dla każdego punktu draw-call z kartą gracza wyższą od stołu: ile nowych outów daje ta ranga (wyrocznia z kart). */
function nadkartyBezNakladania(id: string, ziarna: number) {
  const t = pl.find((x) => x.id === id)!;
  const gen = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
  const bledy: string[] = [];
  let punkty = 0;
  for (const level of t.levels as ScenarioLevel[]) {
    for (let seed = 1; seed <= ziarna; seed++) {
      const v = generateVariant(gen, level, seed);
      v.decisions.forEach((d, i) => {
        const wyjasnienia = (t.decisions[i] as { actions?: { explanation: string }[] }).actions ?? [];
        if (!wyjasnienia.some((a) => a.explanation.includes(ZDANIE))) return;
        const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
        const top = Math.max(...stol.map(rankOf));
        for (const r of new Set(v.hero.map(rankOf).filter((x) => x > top))) {
          punkty++;
          const widoczne = new Set<Card>([...v.hero, ...stol]);
          const nowe = FULL_DECK.filter((c) => rankOf(c) === r && !widoczne.has(c) && !domykaDraw(v.hero, stol, c)).length;
          if (nowe !== NA_RANGE && bledy.length < 5) bledy.push(`${level} ziarno ${seed} punkt ${i + 1}: ręka ${v.hero.join(',')}, stół ${stol.join(',')}, ranga ${r}: nowych outów ${nowe}, zdanie mówi ${NA_RANGE}`);
        }
      });
    }
  }
  return { bledy, punkty };
}

describe('DD-WYS-001: zdanie NIS-003 „każda karta wyższa od stołu daje jeszcze 3 outy” jest prawdziwe w każdym wariancie', () => {
  it('pair.outs.per-rank = 3 (liczba, którą pokazuje zdanie)', () => expect(NA_RANGE).toBe(3));
  // Kontrola trwała: draw do strita, nakładania nie ma (karty gracza wewnątrz okna, domykają rangi spoza ręki).
  for (const id of ['sc-02', 'sc-03'] as const) {
    it(`${id}: ziarna 1–300, każda ranga wyższa od stołu daje dokładnie ${NA_RANGE} nowe outy`, () => {
      const { bledy, punkty } = nadkartyBezNakladania(id, 300);
      expect(punkty).toBeGreaterThan(0);
      expect(bledy).toEqual([]);
    }, 120_000);
  }
  // Błąd: draw do koloru na stole z trzema kartami koloru, nadkarta gracza w innym kolorze (jedna karta tej rangi to już out koloru).
  for (const id of ['sc-01', 'sc-19'] as const) {
    odtwarzaBlad(`${id}: ziarna 1–300, każda ranga wyższa od stołu daje dokładnie ${NA_RANGE} nowe outy`, () => {
      const { bledy, punkty } = nadkartyBezNakladania(id, 300);
      expect(punkty).toBeGreaterThan(0);
      expect(bledy).toEqual([]);
    }, 120_000);
  }
});
