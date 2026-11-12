// FP, 08-programista-001 (recenzja FO be1e44ae): M10, M11 (czyste outy), M12 (D-1421, duży zakład wobec N/45). Wektory z przeszukania losowych układów (skrypt poza repo).
import { describe, expect, it } from 'vitest';
import { flopSizeAnalysis, generateVariant, parseCards, type Card, type GeneratorTemplate } from '../src';

type Reka = readonly [Card, Card];
const R = (s: string): Reka => parseCards(s) as unknown as Reka;
const MALY = 0.25, DUZY = 2 / 3;

describe('08-programista-001: flopSizeAnalysis.clean wymaga 0 remisów i równości zbiorów (M10, M11)', () => {
  it('M10: te same ręce co rywal (8d Jh vs Js 8c) na flopie 7c4c2c: 9 wygrywających = 9 nominalnych outów, ale 36 remisów → nie czyste', () => {
    const a = flopSizeAnalysis(R('8d Jh'), R('Js 8c'), parseCards('7c 4c 2c'), MALY, DUZY);
    expect(a).not.toBeNull();
    expect([a!.nominalOuts, a!.winners, a!.ties, a!.clean]).toEqual([9, 9, 36, false]);
  });
  it('M11: 8s6s vs 2sQs na flopie 5s8h4s: 9 wygrywających = 9 nominalnych co do liczby, ale inny zbiór kart → nie czyste', () => {
    const a = flopSizeAnalysis(R('8s 6s'), R('2s Qs'), parseCards('5s 8h 4s'), MALY, DUZY);
    expect(a).not.toBeNull();
    expect([a!.nominalOuts, a!.winners, a!.ties, a!.clean]).toEqual([9, 9, 0, false]);
  });
});

const fs = (big: number, small: number, delta: number): GeneratorTemplate => ({
  id: 'fp-fs', levels: { latwy: { draws: ['flush'], reject: [], marginMin: delta, expected: ['bet-big'], flop: { suits: ['two-tone'] } } },
  decisions: [{ kind: 'flop-size', street: 'flop', pots: [8, 16, 24], small, big }],
} as unknown as GeneratorTemplate);

describe('08-programista-001: D-1421, duży zakład wobec dokładnego equity N/45 (M12)', () => {
  // duży = ½ puli (cena 0,25), mały = ⅛ (cena 1/9 = 0,1111); N = 9: 9/47 → margines 0,0585, 9/45 → 0,05
  it('δ = 0,055: margines wobec N/45 (0,05) nie wystarcza, więc żaden wariant (przy N/47 byłby 0,0585)', () => {
    expect(() => generateVariant(fs(0.5, 0.125, 0.055), 'latwy', 1)).toThrow(/odrzuceń z rzędu/);
  }, 300_000);
  it('kontrola: δ = 0,045 daje wariant (więc odmowa wyżej wynika z marginesu, nie z innego warunku)', () => {
    const v = generateVariant(fs(0.5, 0.125, 0.045), 'latwy', 1);
    expect(v.points[0]?.point).toBe('flop-size');
  }, 300_000);
});

