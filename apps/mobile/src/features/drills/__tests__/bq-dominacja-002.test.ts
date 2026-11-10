/// <reference types="jest" />
/**
 * Sesja BQ (rola 06 fix), znalezisko 06-tresci-002 (recenzja BP): powód „ręka zdominowana” (R-M3-012) tylko przy
 * słabszej drugiej karcie (dziewiątka lub niżej), jak w warunku reguły („wysoka karta ze słabszą drugą kartą, np. K5
 * albo A7”); dwie wysokie karty (obie od dziesiątki) to w R-M3-012 przypadek odwrotny i powód `high` (próg `f.low >= 10`).
 * Jedna definicja na jedno pojęcie (CLAUDE.md): ta sama klasa nie może być raz „wysokim kickerem”, raz „zdominowaną”.
 */
import { HAND_CLASSES } from '@szkola/poker-core';
import { handFeatures, handReasonKey } from '../hand-reasons';

const SPOTY = ['rfi.hj', 'rfi.btn', 'nine.rfi.hj', 'vs-open.btn-vs-co', 'vs-open.sb-vs-btn', 'nine.vs-open.btn-vs-co', 'call.bb-10', 'push.btn-3max'];

describe('06-tresci-002 (BQ): „ręka zdominowana” nie pada przy dwóch wysokich kartach', () => {
  it('żadna klasa z obiema kartami od dziesiątki nie dostaje powodu `dominated`', () => {
    const zle: string[] = [];
    for (const spot of SPOTY)
      for (const hc of HAND_CLASSES) {
        const f = handFeatures(hc);
        if (!f.pair && f.low >= 10 && handReasonKey(hc, 'out', spot) === 'dominated') zle.push(`${spot}:${hc}`);
      }
    expect(zle).toEqual([]);
  });

  it('ręka z wysoką kartą i drugą kartą 9 lub niższą poza zakresem nadal dostaje `dominated`', () => {
    expect(handReasonKey('A9o', 'out', 'rfi.hj')).toBe('dominated');
    expect(handReasonKey('K5o', 'out', 'rfi.btn')).toBe('dominated');
    expect(handReasonKey('T2o', 'out', 'rfi.btn')).toBe('dominated');
  });
});
