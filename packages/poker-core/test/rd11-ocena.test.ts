// R-23: wektory RD-11 łamane dziś przez kod (OCZEKUJACE_RD11) biegną w tests/akceptacja/poker-core/rd11-ocena.test.ts.
import { describe, expect, it } from 'vitest';
import { OCZEKUJACE_RD11, RD11 } from '../../../tests/wektory/rd11-przypadki';

describe('RD-11: ocena zagrania z częstości solvera (S-06, D-143)', () => {
  it.each(RD11.filter((w) => !(w.id in OCZEKUJACE_RD11)).map((w) => [w.id, w] as const))('%s', (_id, w) => {
    if (w.oczekiwane === 'błąd danych') expect(w.uruchom).toThrow();
    else expect(w.uruchom()).toBe(w.oczekiwane);
  });
});
