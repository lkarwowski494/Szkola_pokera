/// <reference types="jest" />
// D-249 (rola 08 cz. 5): ocena starego silnika → stopień schematu v1 (`odpowiedz.ocena`) i zaliczenie z isPass (B-017).
import { OCENY_ODPOWIEDZI } from '@szkola/domena';
import { ocenaSchematu } from '@/features/drills/grade';

describe('D-249 ocenaSchematu', () => {
  it.each([
    ['correct', 'zgodne', 1], ['acceptable', 'dopuszczalne', 1], ['close', 'niedokladnosc', 0], ['size', 'blad', 0], ['wrong', 'blad', 0],
  ] as const)('%s → %s, zaliczona %i', (g, ocena, zaliczona) => {
    expect(ocenaSchematu(g)).toEqual({ ocena, zaliczona });
    expect(OCENY_ODPOWIEDZI).toContain(ocena);
  });
});
