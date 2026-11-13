// 08-programista-HD-1 (sesja HE, D-1590): w river-value ręka z listy folds, która REMISUJE z ręką gracza, odrzuca wariant
// (rozszerzenie war. 2 D-1302 na remis). Powód (rachunek, docs/tresci/recenzje/dowody/hd-remisy.txt): remis pasujący po czekaniu
// dzieli pulę, po zakładzie oddaje ją całą (+½ puli na kombinację), czego wzór R-M8-001 nie liczy.
// Przykład z raportu HD (ziarno 4 SC-25): gracz Q♥2♥, stół K♥ Q♠ 4♣ 8♠ 8♦, QJ (pasuje) remisuje (Q Q 8 8 K).
// Szablon: calls/folds/pairKind/bounds przepisane z content/pl/scenarios/sc-25.yaml (poker-core nie czyta content/).
import { describe, expect, it } from 'vitest';
import { classComboSplit, generateVariant, parseCards, type Card, type GeneratorTemplate } from '../src';

type Reka = readonly [Card, Card];
const CALLS = ['AA', 'KK', 'AKs', 'AKo', 'AQs', 'AQo', 'KQs', 'KQo'];
const FOLDS = ['QJs', 'QJo', 'JTs', 'JTo'];
const SC25 = {
  id: 'sc-fx-he-sc25',
  stackBb: 100,
  positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: [], reject: [], marginMin: 0.1, expected: ['check'], flop: { height: ['high'] } } },
  decisions: [{ kind: 'river-value', street: 'river', calls: CALLS, folds: FOLDS, pairKind: ['second'] }],
} as unknown as GeneratorTemplate;
const ZIARNA = 300;

describe('08-programista-HD-1 (D-1590): remis ręki pasującej odrzuca wariant river-value', () => {
  it('przykład HD: Q♥2♥ na K♥ Q♠ 4♣ 8♠ 8♦ — QJ wśród pasujących remisuje (ties > 0), lepszych brak', () => {
    const s = classComboSplit(parseCards('Qh 2h') as unknown as Reka, parseCards('Kh Qs 4c 8s 8d'), FOLDS);
    expect(s.better).toBe(0);
    expect(s.ties).toBeGreaterThan(0); // przed HE taki wariant przechodził filtr (better === 0)
  });
  it(`${ZIARNA} wariantów szablonu SC-25: żadna ręka pasująca nie jest lepsza ani nie remisuje z ręką gracza`, () => {
    let zRemisem = 0;
    for (let seed = 1; seed <= ZIARNA; seed++) {
      const v = generateVariant(SC25, 'latwy', seed);
      const f = classComboSplit(v.hero, v.board, FOLDS);
      expect(f.better).toBe(0);
      if (f.ties > 0) zRemisem++;
    }
    expect(zRemisem).toBe(0);
  }, 240_000);
});
