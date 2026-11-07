// Test roli 08 (RYZ-03 / ER-11, próby mutacji D-172): błędne dane wejścia funkcji liczb odrzucone walidacją (Error, nie TypeError),
// przypadki spoza wektorów BRD. Wyrocznia: rachunek — liczba outów to liczba kart (całkowita, ≥ 0), reguła 2 i 4 ma k ∈ {1, 2}
// (reguly.md RD-05), kwoty puli i sprawdzenia są nieujemne (RD-08).
import { describe, expect, it } from 'vitest';
import { callEv, ruleOf2And4 } from '../src';

const odrzucone = (f: () => unknown) => {
  let blad: unknown = null;
  try { f(); } catch (e) { blad = e; }
  return blad instanceof Error && !(blad instanceof TypeError);
};

describe('RYZ-03: walidacja wejścia (przypadki roli 08)', () => {
  it('reguła 2 i 4: ułamkowa liczba outów i k spoza {1, 2} → błąd danych', () => {
    expect(odrzucone(() => ruleOf2And4(1.5, 2))).toBe(true);
    expect(odrzucone(() => ruleOf2And4(9, 3 as 1 | 2))).toBe(true);
    expect(ruleOf2And4(9, 1)).toBeCloseTo(0.18, 12);
  });
  it('EV sprawdzenia: ujemna albo nieskończona kwota → błąd danych', () => {
    expect(odrzucone(() => callEv(0.3, -150, 50))).toBe(true);
    expect(odrzucone(() => callEv(0.3, 150, -50))).toBe(true);
    expect(odrzucone(() => callEv(0.3, Infinity, 50))).toBe(true);
    expect(callEv(0.3, 150, 50)).toBeCloseTo(10, 12);
  });
});
