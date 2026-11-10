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

/*
 * Sesja BQ (rola 06 fix), decyzja koordynatora KO-048 (wariant A, do weta): asercje BP zostają bez zmian, a przypadki
 * są oznaczone `it.failing`. Test asertuje twierdzenie, które rachunek obala (As2s wobec Ad3c: wygrane 455 224,
 * przegrane 452 274), więc nie może być zielony przy żadnej treści: to błąd testu w rozumieniu zasady wspólnej 11.
 * `it.failing` przechodzi, dopóki stare brzmienie R-M3-012 jest fałszywe: trwały dowód, że nie wolno do niego wrócić.
 * Nowe brzmienie sprawdza `bq-dominacja-001.test.ts`.
 */
describe('recenzja BP 06-tresci-001: R-M3-012 „ręka zdominowana wygrywa rzadziej” dla każdej pary rąk z tą samą wysoką kartą', () => {
  it.failing.each([
    ['As2s', 'Ad3c'], // A2s wobec A3o
    ['Ks2s', 'Kd3c'], // K2s wobec K3o
  ])('%s (zdominowana, w kolorze) wygrywa rzadziej niż %s (dominująca)', (a, b) => {
    const e = dokladnie(a, b);
    expect(e.exact).toBe(true);
    expect(e.win[0]!).toBeLessThan(e.win[1]!);
  });
});
