// BR-GEN-002 (D-532): bez powtórzeń w sesji i między sesjami, pojemność, najdawniej widziany przy braku wolnego odcisku.
import { describe, expect, it } from 'vitest';
import { BET_FRACTIONS, generateVariant, type GeneratorTemplate, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import { KONFIGURACJA as K, wybierzWariant, type WpisHistorii } from '../src';

const SZABLON: GeneratorTemplate = {
  id: 'test-w',
  levels: { sredni: { draws: ['flush', 'oesd', 'gutshot'], marginMin: 0.02, marginMax: 0.1, reject: ['rywal-ma-out-gracza', 'stol-sparowany'], expected: ['fold'] } },
  decisions: [{ street: 'flop', pots: [20, 40, 60], fractions: BET_FRACTIONS }],
};

describe('BR-GEN-002: wybór wariantu bez powtórzeń', () => {
  it('w sesji po 10 wariantów: żaden odcisk się nie powtarza (100 sesji, ziarna 1…1000)', () => {
    for (let s = 0; s < 100; s++) {
      const sesja = new Set<string>();
      for (let i = 0; i < 10; i++) {
        const v = wybierzWariant(SZABLON, 'sredni', s * 10 + i + 1, { historia: [], sesja });
        expect(sesja.has(v.fingerprint), `sesja ${s}, wariant ${i}`).toBe(false);
        sesja.add(v.fingerprint);
      }
    }
  }, 120_000);

  it('między sesjami: 10 000 kolejnych wariantów, żaden nie należy do 20 poprzednich', () => {
    const historia: WpisHistorii[] = [];
    for (let i = 0; i < 10_000; i++) {
      const v = wybierzWariant(SZABLON, 'sredni', i + 1, { historia, sesja: new Set() });
      const okno = historia.slice(-K.WARIANTY_HISTORIA_OKNO).map((w) => w.odcisk);
      expect(okno.includes(v.fingerprint), `wariant ${i}`).toBe(false);
      historia.push({ odcisk: v.fingerprint, ziarno: v.seed });
    }
  }, 600_000);

  it('ten sam odcisk po wyjściu z okna może wrócić (okno to 20, nie cała historia)', () => {
    const v = generateVariant(SZABLON, 'sredni', 1);
    const wypelniacze: WpisHistorii[] = Array.from({ length: K.WARIANTY_HISTORIA_OKNO }, (_, i) => ({ odcisk: `inny-${i}`, ziarno: i }));
    const historia = [{ odcisk: v.fingerprint, ziarno: v.seed }, ...wypelniacze];
    expect(wybierzWariant(SZABLON, 'sredni', 1, { historia, sesja: new Set() }).fingerprint).toBe(v.fingerprint);
  });

  it('brak wolnego odcisku: najdawniej widziany z okna, pomijając odciski tej sesji', () => {
    const pula = ['a', 'b', 'c'].map((odcisk, i): ScenarioVariant => ({
      templateId: 't', level: 'sredni', seed: 100 + i, hero: [0, 1], villain: [2, 3], board: [4, 5, 6, 7, 8], decisions: [], points: [], fingerprint: odcisk,
    }));
    // generator zna tylko trzy odciski; ziarno wybiera jeden z nich
    const generuj = (_: GeneratorTemplate, __: ScenarioLevel, ziarno: number): ScenarioVariant => pula[ziarno >= 100 && ziarno <= 102 ? ziarno - 100 : ziarno % 3]!;
    const historia: WpisHistorii[] = [{ odcisk: 'b', ziarno: 101 }, { odcisk: 'c', ziarno: 102 }, { odcisk: 'a', ziarno: 100 }];
    const v = wybierzWariant(SZABLON, 'sredni', 5, { historia, sesja: new Set(), generuj });
    expect(v.fingerprint).toBe('b'); // najdawniej widziany
    const v2 = wybierzWariant(SZABLON, 'sredni', 5, { historia, sesja: new Set(['b']), generuj });
    expect(v2.fingerprint).toBe('c'); // „b” był w tej sesji
  });

  it('odcisk zagrany w tej sesji jest pomijany (sesja bez historii)', () => {
    const pierwszy = wybierzWariant(SZABLON, 'sredni', 7, { historia: [], sesja: new Set() });
    const drugi = wybierzWariant(SZABLON, 'sredni', 7, { historia: [], sesja: new Set([pierwszy.fingerprint]) });
    expect(drugi.fingerprint).not.toBe(pierwszy.fingerprint);
  });

  it('to samo ziarno startowe i historia dają ten sam wariant (powtarzalność)', () => {
    const a = wybierzWariant(SZABLON, 'sredni', 42, { historia: [], sesja: new Set() });
    const b = wybierzWariant(SZABLON, 'sredni', 42, { historia: [], sesja: new Set() });
    expect(b).toEqual(a);
  });
});
