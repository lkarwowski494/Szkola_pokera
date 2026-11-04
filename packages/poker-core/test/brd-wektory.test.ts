// JAK-E1-02: wektory reguł z BRD (tests/wektory/brd.json) uruchamiane w głównym zestawie (D-173). Wektory łamane przez obecny kod
// (OCZEKUJACE, z ID usterki) biegną w tests/akceptacja/poker-core/ do czasu naprawy przez rolę 08.
import { describe, expect, it } from 'vitest';
import { OCZEKUJACE, PRZYPADKI, sprawdz } from '../../../tests/wektory/brd-przypadki';

it('wczytano wszystkie 55 wektorów RD-01–RD-09', () => expect(PRZYPADKI).toHaveLength(55));

describe('wektory RD-01–RD-09 (BRD, rachunek niezależny od kodu)', () => {
  it.each(PRZYPADKI.filter((p) => !(p.id in OCZEKUJACE)).map((p) => [p.id, p] as const))('%s', (_id, p) => sprawdz(p, expect));
});
