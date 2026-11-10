/**
 * Powód z klasy ręki (KO-040, recenzja BK 06-tresci-002, sesja BN): gdy reguła spotu nie tłumaczy decyzji (wąski zakres
 * przy ręce w zakresie, szeroki przy ręce poza nim), wyjaśnienie mówi, co w tej ręce przemawia za decyzją. Powód zawsze
 * wspiera decyzję (warunek koordynatora (a), D-567): przy ręce w zakresie tylko cechy siły, przy ręce poza zakresem tylko
 * cechy słabości. Twierdzenia i ich źródła: reguły w `content/pl/rules.yaml` (HAND_REASON_RULE), rachunki w teście.
 */

/** Rangi 2…14 (as = 14). */
const RANK_VALUE: Record<string, number> = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, T: 10, J: 11, Q: 12, K: 13, A: 14 };

export interface HandFeatures {
  high: number;
  low: number;
  pair: boolean;
  suited: boolean;
  /** Liczba różnych stritów (pięć kolejnych rang, as także jako 1), w których są obie karty ręki (0 dla pary). */
  straights: number;
}

/** Cechy klasy ręki w zapisie „AKs”, „T9o”, „77”. */
export function handFeatures(hc: string): HandFeatures {
  const a = RANK_VALUE[hc[0]!]!;
  const b = RANK_VALUE[hc[1]!]!;
  const high = Math.max(a, b);
  const low = Math.min(a, b);
  const pair = a === b;
  const has = (v: number, lo: number) => (v >= lo && v <= lo + 4) || (v === 14 && lo === 1);
  let straights = 0;
  if (!pair) for (let lo = 1; lo <= 10; lo++) if (has(high, lo) && has(low, lo)) straights++;
  return { high, low, pair, suited: hc[2] === 's', straights };
}

/** Szansa, że na flopie padnie co najmniej jedna karta wyższa od wyższej karty ręki (rachunek: 1 − C(m, 3) ÷ C(50, 3)). */
export function overcardFlop(f: HandFeatures): number {
  const m = 4 * (f.high - 1) - 2; // karty o randze ≤ wyższej karty ręki, bez dwóch kart ręki
  const c3 = (n: number) => (n * (n - 1) * (n - 2)) / 6;
  return 1 - c3(m) / c3(50);
}

export type HandReasonKey = 'pair' | 'high' | 'suited' | 'connected' | 'highAllIn' | 'dominated' | 'overcards' | 'overcardsPair';

/** Cechy siły (powód przy ręce w zakresie) i słabości (przy ręce poza zakresem). */
export const HAND_REASON_SIDE: Record<HandReasonKey, 'in' | 'out'> = {
  pair: 'in',
  high: 'in',
  suited: 'in',
  connected: 'in',
  highAllIn: 'in',
  dominated: 'out',
  overcards: 'out',
  overcardsPair: 'out',
};

/** Reguła, z której pochodzi twierdzenie powodu (`content/pl/rules.yaml`). */
export const HAND_REASON_RULE: Record<HandReasonKey, string> = {
  pair: 'R-M3-014',
  high: 'R-M3-012',
  suited: 'R-M3-005',
  connected: 'R-M3-011',
  highAllIn: 'R-M11-013',
  dominated: 'R-M3-012',
  overcards: 'R-M3-013',
  overcardsPair: 'R-M3-013',
};

/** Spoty all-in (M11): bez gry po flopie, więc o wyniku przy sprawdzeniu decyduje sam układ po pięciu kartach. */
export const isAllInSpot = (spot: string): boolean => /^(push|call)\./.test(spot);

/**
 * Powód z klasy ręki dla miejsca ręki w zakresie (`in`/`out`); `null`, gdy żadna cecha z potwierdzonym twierdzeniem
 * nie wspiera decyzji (wyjątek nazwany w teście `wyjasnienia-ko040.test.ts`).
 */
export function handReasonKey(hc: string, status: 'in' | 'out', spot: string): HandReasonKey | null {
  const f = handFeatures(hc);
  if (status === 'in') {
    if (f.pair) return 'pair';
    if (f.low >= 10) return 'high';
    if (f.suited) return 'suited';
    if (f.straights >= 3) return 'connected';
    if (isAllInSpot(spot) && f.high >= 10) return 'highAllIn';
    return null;
  }
  if (f.high <= 9) return f.pair ? 'overcardsPair' : 'overcards';
  // R-M3-012 tylko przy słabszej drugiej karcie (≤ 9); dwie wysokie karty to w regule przypadek odwrotny (06-tresci-002, BQ)
  if (!f.pair && f.low <= 9) return 'dominated';
  return null;
}
