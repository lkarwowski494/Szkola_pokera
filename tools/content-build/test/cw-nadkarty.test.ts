// CW (rola 06, fix): NIS-003 = 08-programista-003 z recenzji CT (docs/programista/recenzje/recenzja-cs-8133a8c.md), D-846, D-857.
// Wyjaśnienia draw-call (sc-01, sc-02, sc-03, sc-19) podają same outy drawa („Masz 8 outów”), a lekcja M2 każe doliczać karty
// wyższe od stołu jako niepewne outy (content/pl/lessons/m2-l2-pot-odds.md:25, D1 w numbers.yaml). Każde wyjaśnienie nazywa więc
// uproszczenie zdaniem z liczbą {{n:pair.outs.per-rank}} (znacznik niezależny od języka), a zdanie mówi, że odpowiedź się nie zmienia.
// Test zgodności: to zdanie jest prawdziwe w każdym wariancie — wyrocznia liczy szansę z outami drawa powiększonymi o 3 na każdą
// rangę karty gracza wyższą od najwyższej karty stołu (górna granica, bez usuwania nakładania) i porównuje z ceną, bez generatora.
// Odporność pasu na implied odds przy tych outach sprawdza osobno recenzja-cq-odtworzenie.test.ts (06-tresci-003).
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { generateVariant, rankOf, type GeneratorTemplate, type ScenarioLevel } from '@szkola/poker-core';
import { loadScenarioTemplates } from '../src/scenariusze';

const root = resolve(import.meta.dirname, '../../..');
const JEZYKI_TRESCI = ['pl', 'en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'pt-BR', 'pt', 'vi', 'zh-Hant'] as const;
const SZABLONY = ['sc-01', 'sc-02', 'sc-03', 'sc-19'] as const;
const ZNACZNIK = '{{n:pair.outs.per-rank}}';
const NA_RANGE = 3; // pair.outs.per-rank w content/numbers.yaml (równość z OUTS_PER_OVERCARD_RANK: recenzja-cq-odtworzenie.test.ts)

describe('CW NIS-003: każde wyjaśnienie draw-call nazywa uproszczenie „same outy drawa” (12 języków)', () => {
  for (const j of JEZYKI_TRESCI) {
    it(`${j}: sc-01, sc-02, sc-03, sc-19 — każda akcja każdego punktu draw-call ma zdanie z ${ZNACZNIK}`, () => {
      const szablony = loadScenarioTemplates(join(root, 'content', j, 'scenarios')).map((x) => x.template);
      const braki: string[] = [];
      let wyjasnien = 0;
      for (const id of SZABLONY) {
        const t = szablony.find((x) => x.id === id);
        if (!t) { braki.push(`${id}: brak pliku`); continue; }
        t.decisions.forEach((d, i) => {
          if (d.kind !== 'draw-call' && d.kind !== undefined) return;
          for (const a of d.actions ?? []) {
            wyjasnien++;
            if (a.explanation.split(ZNACZNIK).length !== 2) braki.push(`${id} punkt ${i + 1} ${a.action}`);
          }
        });
      }
      expect(wyjasnien).toBe(14);
      expect(braki).toEqual([]);
    });
  }
});

describe('CW NIS-003: zdanie jest prawdziwe — karty wyższe od stołu nie zmieniają odpowiedzi w żadnym wariancie', () => {
  const pl = loadScenarioTemplates(join(root, 'content', 'pl', 'scenarios')).map((x) => x.template);
  let zNadkartami = 0;
  for (const id of SZABLONY) {
    const t = pl.find((x) => x.id === id)!;
    const gen = { id: t.id, stackBb: t.stackBb, positions: t.positions, levels: t.bounds, decisions: t.decisions } as GeneratorTemplate;
    for (const level of t.levels as ScenarioLevel[]) {
      it(`${id} ${level}: ziarna 1–300, odpowiedź z outami drawa = odpowiedź z outami drawa + ${NA_RANGE} na rangę wyższą od stołu`, () => {
        const bledy: string[] = [];
        for (let seed = 1; seed <= 300 && bledy.length < 5; seed++) {
          const v = generateVariant(gen, level, seed);
          v.decisions.forEach((d, i) => {
            const stol = v.board.slice(0, d.street === 'flop' ? 3 : 4);
            const top = Math.max(...stol.map(rankOf));
            const wyzsze = new Set(v.hero.map(rankOf).filter((r) => r > top)).size;
            if (wyzsze === 0) return;
            zNadkartami++;
            const nieznane = 52 - 2 - stol.length;
            const outy = d.outs + NA_RANGE * wyzsze;
            const allInFlop = gen.decisions[i]?.kind !== 'cbet-case' && (t.decisions[i] as { villain?: string }).villain === 'all-in' && d.street === 'flop';
            const szansa = allInFlop ? 1 - ((nieznane - outy) / nieznane) * ((nieznane - 1 - outy) / (nieznane - 1)) : outy / nieznane;
            const cena = d.bet / (d.pot + 2 * d.bet);
            const odp = szansa > cena ? 'call' : 'fold';
            if (odp !== d.correct) bledy.push(`ziarno ${seed} punkt ${i + 1}: ${wyzsze} rang wyżej od stołu, szansa ${szansa.toFixed(3)} vs cena ${cena.toFixed(3)} daje ${odp}, wariant uczy ${d.correct}`);
          });
        }
        expect(bledy).toEqual([]);
      }, 120_000);
    }
  }
  it('próba nie jest pusta: są warianty z kartą wyższą od stołu', () => {
    expect(zNadkartami).toBeGreaterThan(0);
  });
});
