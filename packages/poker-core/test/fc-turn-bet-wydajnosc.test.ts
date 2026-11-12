// FC (CI-43192365903): regresja wydajności generatora turn-bet po EV-2 (a3b18da2: czyste outy, ok. 0,09% prób → ok. 1100 odrzuceń na wariant).
// Pomiar na 91573ab6: ok. 3,3 ms/wariant; na da1e02db: ok. 11,8 ms/wariant, test „odciski…” (300 wariantów) przekraczał 5 s przy obciążonym CI.
// Test bierze najlepszy z 3 przebiegów po 100 wariantów (odporny na jednorazowe obciążenie) i nie zmienia limitu czasu innych testów.
import { describe, expect, it } from 'vitest';
import { generateVariant, type GeneratorTemplate } from '../src';

const szablon: GeneratorTemplate = {
  id: 'sc-fc-turn-bet-wydajnosc',
  levels: { latwy: { draws: ['flush'], reject: [], marginMin: 0.02, expected: ['bet-big'] } },
  decisions: [{ kind: 'turn-bet', street: 'turn', pots: [8, 16, 24, 40], small: 0.25, big: 0.75 }],
};
const WARIANTY = 100;
const LIMIT_MS = 700; // 91573ab6: ok. 330 ms; da1e02db: ok. 1180 ms (ta sama maszyna); margines ×2 nad stanem sprzed EV-2

describe('FC: wydajność turn-bet', () => {
  it(`${WARIANTY} wariantów w najlepszym z 3 przebiegów < ${LIMIT_MS} ms`, () => {
    const czasy: number[] = [];
    for (let przebieg = 0; przebieg < 3; przebieg++) {
      const t0 = Date.now();
      for (let s = 1; s <= WARIANTY; s++) generateVariant(szablon, 'latwy', 1000 * przebieg + s);
      czasy.push(Date.now() - t0);
    }
    expect(Math.min(...czasy), `czasy: ${czasy.map((c) => c.toFixed(0)).join(', ')} ms`).toBeLessThan(LIMIT_MS);
  }, 60_000);
});
