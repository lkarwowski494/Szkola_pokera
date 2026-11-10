/// <reference types="jest" />
/**
 * Recenzja BP (rola 06, audit) znalezisko 06-tresci-001: test odtwarzający, celowo CZERWONY do naprawy (bez naprawy w tej sesji).
 * R-M3-012 `because` (content/pl/rules.yaml): „przed flopem ręka zdominowana wygrywa z ręką, która ją dominuje, rzadziej niż ona”.
 * Test autora (hand-reasons.test.ts) sprawdza tylko ręce w różnych kolorach, Monte Carlo. Dokładny przegląd wszystkich
 * C(48, 5) = 1 712 304 boardów pokazuje, że ręka zdominowana w kolorze wygrywa częściej niż ręka dominująca w różnych kolorach.
 */
import { handEquity, parseCard } from '@szkola/poker-core';

const dokladnie = (a: string, b: string) =>
  handEquity([[parseCard(a.slice(0, 2)), parseCard(a.slice(2, 4))], [parseCard(b.slice(0, 2)), parseCard(b.slice(2, 4))]], [], { exactLimit: 2_000_000 });

describe('recenzja BP 06-tresci-001: R-M3-012 „ręka zdominowana wygrywa rzadziej” dla każdej pary rąk z tą samą wysoką kartą', () => {
  it.each([
    ['As2s', 'Ad3c'], // A2s wobec A3o
    ['Ks2s', 'Kd3c'], // K2s wobec K3o
  ])('%s (zdominowana, w kolorze) wygrywa rzadziej niż %s (dominująca)', (a, b) => {
    const e = dokladnie(a, b);
    expect(e.exact).toBe(true);
    expect(e.win[0]!).toBeLessThan(e.win[1]!);
  });
});
