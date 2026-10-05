import type { Inline } from '@szkola/content-schema';
import { columnWidths } from '../tableLayout';

const t = (v: string): Inline[] => [{ t: 'text', v }];
const c = (n: number): Inline[] => [{ t: 'cards', v: Array.from({ length: n }, (_, i) => `${'AKQJT'[i]}s`) }];

describe('szerokość kolumn tabeli w lekcji', () => {
  // ranking układów z M0: numer, nazwa z angielskim odpowiednikiem, 5 kart
  const head = [t('#'), t('Układ'), t('Przykład')];
  const rows = [
    [t('1'), t('Poker królewski (royal flush)'), c(5)],
    [t('4'), t('Full (full house): trójka (three of a kind) i para (pair)'), c(5)],
  ];

  it('na szerokim ekranie zostawia preferowane szerokości', () => {
    const w = columnWidths(head, rows, 2000);
    expect(w.reduce((a, b) => a + b, 0)).toBeLessThan(2000);
  });

  it('na iPhonie (ok. 356 pt) mieści się bez przewijania, a kolumna z kartami się nie kurczy', () => {
    const w = columnWidths(head, rows, 356);
    expect(w.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(356);
    expect(w[2]).toBeGreaterThanOrEqual(5 * 24);
    expect(w[1]).toBeGreaterThanOrEqual(48);
  });

  it('bez znanej szerokości działa jak wcześniej (szerokości z treści)', () => {
    expect(columnWidths(head, rows)).toEqual(columnWidths(head, rows, 1e6));
  });
});
