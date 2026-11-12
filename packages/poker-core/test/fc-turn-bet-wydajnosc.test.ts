// FC (CI-43192365903, D-1342): regresja wydajności generatora turn-bet po EV-2 (a3b18da2: czyste outy, ok. 0,09% prób → ok. 1000 prób na wariant).
// Test deterministyczny, bez zegara (test czasowy z progiem 700 ms padał na ubuntu-latest, CI 43200590781): liczy wywołania classifyHolding (najdroższy krok próby)
// na 100 wariantach ze stałymi ziarnami. Pomiar: da1e02db 95 089 wywołań (czerwone), po poprawce FC 5 206; próg 20 000 (≈4× zapasu nad stanem poprawnym, ≈4,7× poniżej regresji).
// Zmiana akceptacji losowań (D-1310) przesuwa licznik; wtedy próg ustawia się świadomie od nowego pomiaru.
import { describe, expect, it, vi } from 'vitest';

let wywolania = 0;
vi.mock('../src/holding', async (importOriginal) => {
  const m = await importOriginal<typeof import('../src/holding')>();
  return { ...m, classifyHolding: (...a: Parameters<typeof m.classifyHolding>) => { wywolania++; return m.classifyHolding(...a); } };
});
import { generateVariant, type GeneratorTemplate } from '../src';

const szablon: GeneratorTemplate = {
  id: 'sc-fc-turn-bet-wydajnosc',
  levels: { latwy: { draws: ['flush'], reject: [], marginMin: 0.02, expected: ['bet-big'] } },
  decisions: [{ kind: 'turn-bet', street: 'turn', pots: [8, 16, 24, 40], small: 0.25, big: 0.75 }],
};
const WARIANTY = 100;
const LIMIT_WYWOLAN = 20_000;

describe('FC: wydajność turn-bet (licznik pracy, nie zegar)', () => {
  it(`${WARIANTY} wariantów (ziarna 1…${WARIANTY}) wymaga < ${LIMIT_WYWOLAN} wywołań classifyHolding`, () => {
    wywolania = 0;
    for (let s = 1; s <= WARIANTY; s++) generateVariant(szablon, 'latwy', s);
    expect(wywolania, 'wywołań classifyHolding').toBeLessThan(LIMIT_WYWOLAN);
    expect(wywolania).toBeGreaterThan(0); // licznik rzeczywiście podpięty
  });
});
