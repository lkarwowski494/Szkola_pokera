// Test roli 08 (fix L7-13e, D-221): pole `lesson` wpisu w content/terms.yaml — opcjonalne w schemacie (do czasu uzupełnienia
// 162 terminów przez 06), a gdy jest, wskazuje istniejącą lekcję. Wyrocznia: moduly.md „Treść” (D-221), nie kod.
import { describe, expect, it } from 'vitest';
import { TermEntry } from '@szkola/content-schema';
import { checkTermLessons } from '../src/build';

const WPIS = { pl: 'kolor', en: 'flush', area: 'hands', source: 'https://example.org/flush „flush”' };

describe('L7-13e: lekcja definiująca termin', () => {
  it('schemat przyjmuje wpis bez `lesson` i z `lesson` w formacie identyfikatora; odrzuca pusty i z niedozwolonymi znakami', () => {
    expect(TermEntry.safeParse(WPIS).success).toBe(true);
    expect(TermEntry.safeParse({ ...WPIS, lesson: 'm2-l1' }).success).toBe(true);
    expect(TermEntry.safeParse({ ...WPIS, lesson: '' }).success).toBe(false);
    expect(TermEntry.safeParse({ ...WPIS, lesson: 'm2 l1' }).success).toBe(false);
  });
  it('lekcja z pola istnieje → bez błędu; nieznana lekcja → błąd z kluczem terminu', () => {
    const lekcje = new Set(['m2-l1', 'm3-l2']);
    expect(() => checkTermLessons({ flush: { ...WPIS, lesson: 'm2-l1' } as never, bez: WPIS as never }, lekcje)).not.toThrow();
    expect(() => checkTermLessons({ flush: { ...WPIS, lesson: 'm9-l9' } as never }, lekcje)).toThrow(/flush.*m9-l9/);
  });
});
