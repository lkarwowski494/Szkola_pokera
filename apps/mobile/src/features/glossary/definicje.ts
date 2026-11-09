import { lancuchTresci, ZRODLO, type Jezyk } from '@szkola/jezyki';
import { TERM_DEFS, TERMS, type AppTerm } from '@/data/content/terms.generated';

/**
 * Definicja terminu w języku `jezyk` (D-335). Po polsku pole `def` z content/terms.yaml; w innym języku pierwsza definicja
 * z nakładki `content/<język>/terms-def.yaml` (moduł `TERM_DEFS`) w łańcuchu wariant → język → en. Do polskiego nie
 * schodzi: słowniczek i ćwiczenie w en z polskim zdaniem byłyby gorsze niż brak definicji (P-2).
 */
export function definicjaTerminu(key: string, jezyk: Jezyk, defs: typeof TERM_DEFS = TERM_DEFS): string | undefined {
  if (jezyk === ZRODLO) return (TERMS as Record<string, AppTerm>)[key]?.def;
  for (const j of lancuchTresci(jezyk)) {
    if (j === ZRODLO) break;
    const d = defs[j]?.[key];
    if (d) return d;
  }
  return undefined;
}

/** Termin z definicją w języku `jezyk` (bez pola `def`, gdy definicji w tym języku nie ma). */
export function terminWJezyku<T extends AppTerm & { key: string }>(t: T, jezyk: Jezyk): T {
  const { def: _zrodlowa, ...reszta } = t;
  const def = definicjaTerminu(t.key, jezyk);
  return (def ? { ...reszta, def } : reszta) as T;
}
