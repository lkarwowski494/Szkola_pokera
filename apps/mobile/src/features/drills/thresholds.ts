import type { NumberUnitName } from '@szkola/content-schema';

/**
 * Progi oceny zadań w jednym miejscu (jedno źródło prawdy). Każda wartość to decyzja właściciela albo założenie
 * do kalibracji; zmiana tutaj zmienia ocenę we wszystkich typach zadań naraz.
 */

/**
 * Jedna skala oceny akcji z zakresu solvera (ADR-26, dokument 14, sekcja 5.2), wspólna dla zadań i trybu gry M13:
 * - zgodna: akcja najczęstsza albo grana w co najmniej MIXED_LOW przypadków;
 * - dopuszczalna: akcja grana w co najmniej MIXED_MIN, ale mniej niż MIXED_LOW przypadków. Nie jest błędem;
 *   w powtórkach FSRS ocena Hard (jak „blisko”);
 * - błąd: akcja grana rzadziej niż w MIXED_MIN przypadków albo wcale.
 * MIXED_MIN: skala oceny ruchów komercyjnego solvera (https://help.gtowizard.com/measure-performance/), „Inaccuracy – Moves
 * that are taken less than 3.5% of the time in GTO”. Bez danych EV
 * akcję poniżej 3,5% liczymy jako błąd (nazwane uproszczenie, dokument 14, 5.2).
 * MIXED_LOW i MIXED_HIGH: granica ręki „mieszanej” (25–75%), założenie do kalibracji bez źródła (ADR-22, B-044).
 * W malowaniu zakresu ręka grana w MIXED_LOW–MIXED_HIGH jest zaliczana bez względu na to, czy ją zaznaczysz;
 * malowanie ocenia strategię całej klasy, nie pojedynczą decyzję, więc MIXED_MIN go nie dotyczy (ADR-26).
 */
export const MIXED_MIN = 0.035;
export const MIXED_LOW = 0.25;
export const MIXED_HIGH = 0.75;

/** Malowanie zakresu: zaliczenie od 90% (decyzja właściciela 3.10.2026, B-016; komercyjny solver zaleca 90–95%). */
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
/**
 * Ile razy jeden generator może dać zadanie w jednym egzaminie, zanim sięgniemy po zadania stałe z lekcji
 * (pula egzaminacyjna ma pierwszeństwo, generator nie może zdominować egzaminu). Założenie bez źródła.
 */
export const EXAM_MAX_PER_GENERATOR = 2;
