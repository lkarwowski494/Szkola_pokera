// Wektory BRD łamane przez obecny kod (OCZEKUJACE w tests/wektory/brd-przypadki.ts, z ID usterki). Rola 08 naprawia funkcję
// i usuwa wpis z OCZEKUJACE; wtedy wektor biegnie w packages/poker-core/test/brd-wektory.test.ts.
import { describe, expect, it } from 'vitest';
import { OCZEKUJACE, PRZYPADKI, sprawdz } from '../../wektory/brd-przypadki';

describe('AK-RYZ-03: kontrola wejścia funkcji liczb (ER-11)', () => {
  it.each(PRZYPADKI.filter((p) => p.id in OCZEKUJACE).map((p) => [`${p.id}: ${OCZEKUJACE[p.id]}`, p] as const))('%s', (_n, p) => sprawdz(p, expect));
});
