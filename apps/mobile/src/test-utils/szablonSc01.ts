// Szablon SC-01 (content/pl/scenarios/sc-01.yaml) po obróbce content-build: terminy {{t:…}} i liczby {{n:…}} już podstawione,
// znaczniki wariantu {{w:…}} zostają do chwili wyświetlenia. Skrócony: tylko pola potrzebne ekranowi.
import type { ScenarioTemplate } from '@szkola/content-schema';

const bounds = (marginMin: number, marginMax: number | null) => ({
  draws: ['flush' as const], marginMin, marginMax, reject: ['rywal-ma-out-gracza' as const, 'stol-sparowany' as const], expected: ['call' as const, 'call' as const],
});
const akcje = (call: string, fold: string) => [{ action: 'call' as const, explanation: call }, { action: 'fold' as const, explanation: fold }];

export const SC01: ScenarioTemplate = {
  id: 'sc-01',
  module: 'm2',
  situation: 'Po 3-becie masz draw do koloru, a rywal na flopie i na turnie stawia mało.',
  table: '6max',
  positions: { hero: 'BTN', villain: 'BB' },
  stackBb: 100,
  levels: ['latwy', 'sredni', 'trudny'],
  bounds: { latwy: bounds(0.1, null), sredni: bounds(0.02, 0.1), trudny: bounds(0, 0.02) },
  decisions: [
    {
      street: 'flop', kind: 'draw-call', pots: [18, 20, 22, 24], fractions: [0.1, 0.2, 0.25, 0.3], villain: 'bet', rule: 'R-M2-005',
      actions: akcje(
        'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}, a rywal z {{w:rywal}} stawia mało w stosunku do puli. Sprawdzasz, bo płacisz tylko za jedną kartę. Masz 9 outów.',
        'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}, a rywal z {{w:rywal}} stawia mało w stosunku do puli. Pas oddaje pulę, na której sprawdzenie zarabia.',
      ),
    },
    {
      street: 'turn', kind: 'draw-call', pots: [], fractions: [0.1, 0.2, 0.25, 0.3], villain: 'bet', rule: 'R-M7-007',
      actions: akcje(
        'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}: turn nie dał koloru, a rywal z {{w:rywal}} znowu stawia mało. Sprawdzasz, bo do rivera została jedna karta.',
        'Masz {{w:reka}} na {{w:pozycja}}, na stole {{w:stol}}: turn nie dał koloru, a rywal z {{w:rywal}} znowu stawia mało. Pas jest za ciasny.',
      ),
    },
  ],
};
