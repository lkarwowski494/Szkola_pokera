// AK-BR-CWI-001 (R-23, L-06): cztery stopnie oceny. Rola 08 naprawia rangeVerdict i usuwa wpis z OCZEKUJACE_RD11.
import { describe, expect, it } from 'vitest';
import { OCZEKUJACE_RD11, RD11 } from '../../wektory/rd11-przypadki';

describe('AK-BR-CWI-001: stopień „niedokładność” i odrzucenie częstości < 0', () => {
  it.each(RD11.filter((w) => w.id in OCZEKUJACE_RD11).map((w) => [`${w.id}: ${OCZEKUJACE_RD11[w.id]}`, w] as const))('%s', (_n, w) => {
    if (w.oczekiwane === 'błąd danych') expect(w.uruchom).toThrow();
    else expect(w.uruchom()).toBe(w.oczekiwane);
  });
});
