// Recenzja CG (D-043) zmian CF 1533486..1b7db3c, znalezisko CG-ŚR-1: to, czy ziarno odtwarza „to samo rozdanie”, zależy także od
// treści (szablon z content/<język>/scenarios, kontekst z numbers.yaml i zakresów), a GENERATOR_WERSJA śledzi tylko kod generatora.
// Test opisuje oczekiwane zachowanie (ziarno z ziarnoPowtorki nie prowadzi do innego wariantu niż zapisany w historii); dziś pada,
// więc stoi jako `it.fails` (pnpm run ci zielone). Po naprawie: zamienić `it.fails` na `it`.
import { describe, expect, it } from 'vitest';
import { BET_FRACTIONS, GENERATOR_WERSJA, generateVariant, type GeneratorTemplate } from '@szkola/poker-core';
import { ziarnoPowtorki, type WpisHistorii } from '../src';

const POZIOM = { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.1, marginMax: null, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] } as const;
const szablon = (pots: number[]): GeneratorTemplate => ({ id: 'test-a', levels: { latwy: POZIOM }, decisions: [{ street: 'flop', pots, fractions: BET_FRACTIONS }] });
const TRESC_N = szablon([20, 40, 60, 100]);
const TRESC_N1 = szablon([20, 40, 60, 80, 100]); // np. poprawka listy pul w content/pl/scenarios/sc-01.yaml; kod generatora bez zmian
const opis = (v: ReturnType<typeof generateVariant>) => ({ fingerprint: v.fingerprint, hero: v.hero, board: v.board, decyzje: v.decisions.map((d) => [d.pot, d.bet]) });

describe('CG-ŚR-1: powtórka po aktualizacji treści przy tej samej GENERATOR_WERSJA', () => {
  it.fails('ziarno z ziarnoPowtorki odtwarza wariant z historii także po zmianie szablonu w treści (ziarna 1…20)', () => {
    for (let ziarno = 1; ziarno <= 20; ziarno++) {
      const stara = generateVariant(TRESC_N, 'latwy', ziarno);
      const historia: WpisHistorii[] = [{ odcisk: stara.fingerprint, ziarno, generatorWersja: GENERATOR_WERSJA }];
      const z = ziarnoPowtorki(historia);
      if (z === null) continue; // poprawne zachowanie: brak powtórki zamiast innej ręki
      expect(opis(generateVariant(TRESC_N1, 'latwy', z))).toEqual(opis(stara));
    }
  });
});
