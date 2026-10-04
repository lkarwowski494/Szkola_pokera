import type { NumberUnitName } from '@szkola/content-schema';

/**
 * Progi oceny zadań w jednym miejscu (jedno źródło prawdy). Każda wartość to decyzja właściciela albo założenie
 * do kalibracji; zmiana tutaj zmienia ocenę we wszystkich typach zadań naraz.
 */

/**
 * Ręka „mieszana” w zakresie solvera: grana z częstością od MIXED_LOW do MIXED_HIGH.
 * W zadaniach z decyzją każda akcja grana w co najmniej MIXED_LOW przypadków jest dobra,
 * a w malowaniu zakresu taka ręka jest zaliczana bez względu na to, czy ją zaznaczysz.
 * Założenie do kalibracji (bez źródła); ta sama granica obowiązuje w obu typach zadań.
 */
export const MIXED_LOW = 0.25;
export const MIXED_HIGH = 0.75;

/** Malowanie zakresu: zaliczenie od 90% (decyzja właściciela 3.10.2026, B-016; GTO Wizard zaleca 90–95%). */
export const PAINT_PASS = 0.9;

/**
 * Tolerancja odpowiedzi liczbowej w jednostkach wyświetlanych (procenty w punktach procentowych).
 * ok = dobrze, close = „blisko” (FSRS: trudne zamiast błędu). Procenty: ±2 pp / ±5 pp (decyzja właściciela
 * 3.10.2026, B-017). Liczby całkowite (outy, kombinacje) dokładnie. bb, mnożniki i proporcje: dokładnie
 * z dokładnością do zaokrąglenia (założenie bez źródła).
 */
export const NUMERIC_TOLERANCE: Record<NumberUnitName, { ok: number; close: number }> = {
  percent: { ok: 2, close: 5 },
  count: { ok: 0, close: 0 },
  bb: { ok: 0.05, close: 0.05 },
  /** bb/100 (M12): jak bb. */
  bb100: { ok: 0.05, close: 0.05 },
  multiplier: { ok: 0.05, close: 0.05 },
  ratio: { ok: 0.005, close: 0.005 },
  ms: { ok: 0, close: 0 },
};

/** Egzamin modułu (decyzja właściciela 3.10.2026, B-023): 15 zadań, ok. 2/3 z modułu, próg 85% (dok. 09, ADR-04). */
export const EXAM_SIZE = 15;
export const EXAM_MODULE_SHARE = 2 / 3;
export const EXAM_PASS = 0.85;
/** W egzaminie co najwyżej jedno malowanie zakresu (zajmuje kilka razy dłużej niż decyzja). Założenie bez źródła. */
export const EXAM_MAX_PAINT = 1;
