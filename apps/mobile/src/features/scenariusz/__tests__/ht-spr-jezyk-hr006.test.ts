// HT HR-006: znacznik {{w:spr}} formatowany wg języka aplikacji (pl „2,1”, en „2.1”), nie `toFixed` z kropką (warunki-hp.md:16).
import type { ScenarioTemplate } from '@szkola/content-schema';
import type { ScenarioVariant } from '@szkola/poker-core';
import i18n from '@/i18n';
import { wartosciZnacznikow } from '../wariant';

const szablon = { positions: { hero: 'BB', villain: 'BTN' } } as unknown as ScenarioTemplate;
const t = (k: string) => k;
const wariant = (point: unknown): ScenarioVariant => ({ hero: ['As', 'Kd'], board: ['2c', '7h', 'Td', '3s', '9s'], points: [point] }) as unknown as ScenarioVariant;

describe('HT HR-006: {{w:spr}} wg języka', () => {
  const jezykPrzed = i18n.language;
  afterAll(async () => { await i18n.changeLanguage(jezykPrzed); });
  for (const [j, oczekiwane] of [['pl', '2,1'], ['en', '2.1']] as const) {
    it(`spr-call i geo-size w języku ${j}: SPR 2,1 → „${oczekiwane}”`, async () => {
      await i18n.changeLanguage(j);
      const spr = wartosciZnacznikow(wariant({ point: 'spr-call', street: 'flop', pot: 5, stack: 10.5, spr: 2.1, required: 0.4, pairKind: 'top', correct: 'call' }), szablon, 0, t).spr;
      expect(spr).toBe(oczekiwane);
      const geo = wartosciZnacznikow(wariant({ point: 'geo-size', street: 'flop', pot: 20, stack: 42, spr: 2.1, streets: 3, fractionBig: 0.6, fractionSmall: 1 / 3, smallTotal: 60, correct: 'bet-big' }), szablon, 0, t).spr;
      expect(geo).toBe(oczekiwane);
    });
  }
});
