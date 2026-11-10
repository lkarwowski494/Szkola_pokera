/// <reference types="jest" />
/**
 * Sesja BQ (rola 06 fix), znalezisko 06-tresci-003 (recenzja BP): powód all-in „twoja wyższa karta to {{rank}}”
 * (R-M11-013) podawał dziesiątkę i waleta jako argument za grą, a R-M11-013 mówi tylko, jak rozstrzyga się pulę.
 * Wariant (b) recenzji, tańsza kontrola zastępcza: powód tylko przy asie albo królu (`f.high >= 13`); niższe
 * bez powodu z klasy ręki (wyjątki nazwane w powody-reki-bn.test.ts), powód z ceny sprawdzenia (R-M11-006) w otwartych.
 */
import { HAND_CLASSES } from '@szkola/poker-core';
import { handFeatures, handReasonKey } from '../hand-reasons';

const SPOTY_ALLIN = ['call.bb-5', 'call.bb-10', 'call.bb-15', 'call.bb-10-ante', 'push.sb-5', 'push.btn-3max', 'call.bb-vs-two-3max'];

describe('06-tresci-003 (BQ): powód „wyższa karta przy all-in” tylko przy asie albo królu', () => {
  it('żadna klasa z wyższą kartą poniżej króla nie dostaje `highAllIn`', () => {
    const zle: string[] = [];
    for (const spot of SPOTY_ALLIN)
      for (const hc of HAND_CLASSES) if (handReasonKey(hc, 'in', spot) === 'highAllIn' && handFeatures(hc).high < 13) zle.push(`${spot}:${hc}`);
    expect(zle).toEqual([]);
  });

  it('as albo król bez innej cechy siły nadal dostaje `highAllIn`', () => {
    expect(handReasonKey('A2o', 'in', 'call.bb-5')).toBe('highAllIn');
    expect(handReasonKey('K7o', 'in', 'call.bb-5')).toBe('highAllIn');
  });
});
