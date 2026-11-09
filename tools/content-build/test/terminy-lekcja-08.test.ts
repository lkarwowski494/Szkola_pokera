// Test roli 08 (fix L7-13e, D-221): pole `lesson` wpisu w content/terms.yaml wskazuje istniejącą lekcję. Wyrocznia: moduly.md
// „Treść” (D-221), nie kod. Sesja T (D-340): po uzupełnieniu 162 terminów (D-311) pole wymagane — asercja „bez `lesson`”
// zmieniona z true na false zgodnie z D-221 („opcjonalne do uzupełnienia…, potem wymagane”).
import { describe, expect, it } from 'vitest';
import { TermEntry } from '@szkola/content-schema';
import { checkTermLessons } from '../src/build';

const WPIS = { pl: 'kolor', en: 'flush', area: 'hands', source: 'https://example.org/flush „flush”' };

describe('L7-13e: lekcja definiująca termin', () => {
  it('schemat wymaga `lesson` w formacie identyfikatora (D-340); odrzuca brak, pusty i z niedozwolonymi znakami', () => {
    expect(TermEntry.safeParse(WPIS).success).toBe(false);
    expect(TermEntry.safeParse({ ...WPIS, lesson: 'm2-l1' }).success).toBe(true);
    expect(TermEntry.safeParse({ ...WPIS, lesson: '' }).success).toBe(false);
    expect(TermEntry.safeParse({ ...WPIS, lesson: 'm2 l1' }).success).toBe(false);
  });
  it('lekcja z pola istnieje → bez błędu; nieznana lekcja → błąd z kluczem terminu', () => {
    const lekcje = new Set(['m2-l1', 'm3-l2']);
    // wpis „bez” (bez `lesson`) usunięty w sesji T (D-340): schemat odrzuca go przed tą kontrolą (asercja wyżej)
    expect(() => checkTermLessons({ flush: { ...WPIS, lesson: 'm2-l1' } as never, set: { ...WPIS, lesson: 'm3-l2' } as never }, lekcje)).not.toThrow();
    expect(() => checkTermLessons({ flush: { ...WPIS, lesson: 'm9-l9' } as never }, lekcje)).toThrow(/flush.*m9-l9/);
  });
});
