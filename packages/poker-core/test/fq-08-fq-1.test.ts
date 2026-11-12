// 08-FQ-1 (sesja FR): silnik flop-size odrzucał ziarno 1108 (20 000 odrzuceń z rzędu) także na fiksturze FL `sc-fx-flop-size`.
// Szablon poniżej ma te same granice co fikstura (tools/content-build/test/fixtures/flop-size/sc-fx-flop-size.yaml).
import { describe, expect, it } from 'vitest';
import { generateVariant, MAX_CONSECUTIVE_REJECTIONS, type GeneratorTemplate } from '../src';

const FIKSTURA = {
  id: 'sc-fx-flop-size', stackBb: 100, positions: { hero: 'BTN', villain: 'BB' },
  levels: { latwy: { draws: ['flush'], reject: [], marginMin: 0.02, expected: ['bet-big'], flop: { suits: ['two-tone'] } } },
  decisions: [{ kind: 'flop-size', street: 'flop', pots: [12, 24, 36, 48], small: 0.25, big: 2 / 3 }],
} as unknown as GeneratorTemplate;

describe('08-FQ-1: flop-size nie odmawia na ziarnach z ogona rozkładu', () => {
  it('ziarno 1108 daje wariant flop-size (przed poprawką: 20 000 odrzuceń z rzędu)', () => {
    const v = generateVariant(FIKSTURA, 'latwy', 1108);
    expect(v.points[0]?.point).toBe('flop-size');
  }, 300_000);
  it('ziarna 1100–1219 (120) wszystkie dają wariant', () => {
    for (let s = 1100; s < 1220; s++) expect(generateVariant(FIKSTURA, 'latwy', s).points[0]?.point).toBe('flop-size');
  }, 300_000);
  it('limit odrzuceń ≥ 60 000 (prawdopodobieństwo przyjęcia ≈ 2,4e-4 na próbę: porażka ≈ 5e-7 na ziarno)', () => {
    expect(MAX_CONSECUTIVE_REJECTIONS).toBeGreaterThanOrEqual(60_000);
  });
});
