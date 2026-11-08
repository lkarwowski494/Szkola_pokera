// Limit dnia (ADR 0007; sygnatury: docs/architektura/moduly.md „Porty domeny”).
import type { Konfiguracja } from './konfiguracja';
import type { RodzajAktywnosci } from './typy';

export type Limit = { bezLimitu: true } | { bezLimitu: false; pozostalo: number; odnowienieMs: number };

// ADR 0007 pkt 2: zużycie liczone z wpisów dnia; import może dać sumę ponad limit (pkt 5), więc najmniej 0.
// Odnowienie: pierwsza chwila następnego dnia kalendarzowego w strefie (BR-LIM-005), także gdy północ nie istnieje przez zmianę czasu.
export function limitDnia(wej: { zuzyteDzis: number; pro: boolean; dzien: string; strefa: string }, k: Konfiguracja): Limit {
  if (wej.pro) return { bezLimitu: true };
  return {
    bezLimitu: false,
    pozostalo: Math.max(0, k.LIMIT_AKTYWNOSCI_DZIENNIE - wej.zuzyteDzis),
    odnowienieMs: poczatekDniaW(wej.strefa, dzienPo(wej.dzien)),
  };
}

// Poza limitem: lekcja, ocena poziomu, pierwsze podejście do testu modułu (BR-LIM-003, ADR 0007 pkt 1: CHECK rodzajów z limitu).
// Pro: start każdej aktywności, nic nie idzie z limitu.
export function mozeStartowac(
  rodzaj: RodzajAktywnosci,
  pierwszePodejscieTestu: boolean,
  limit: Limit,
): { start: true; zLimitu: boolean } | { start: false; powod: 'limit_wyczerpany' } {
  const poza = rodzaj === 'lekcja' || rodzaj === 'ocena_poziomu' || (rodzaj === 'test_modulu' && pierwszePodejscieTestu);
  if (limit.bezLimitu || poza) return { start: true, zLimitu: false };
  if (limit.pozostalo > 0) return { start: true, zLimitu: true };
  return { start: false, powod: 'limit_wyczerpany' };
}

const MIN = 60_000;
const formaty = new Map<string, Intl.DateTimeFormat>();
// Data RRRR-MM-DD w strefie IANA w chwili `ms` (Intl; niepoprawna strefa → RangeError, błąd wywołującego).
function dzienW(strefa: string, ms: number): string {
  let f = formaty.get(strefa);
  if (!f) {
    f = new Intl.DateTimeFormat('en-CA', { timeZone: strefa, year: 'numeric', month: '2-digit', day: '2-digit' });
    formaty.set(strefa, f);
  }
  const c: Record<string, string> = {};
  for (const p of f.formatToParts(new Date(ms))) c[p.type] = p.value;
  return `${c.year}-${c.month}-${c.day}`;
}
// Dzień lokalny dla zapisu aktywności i zegara aplikacji (Zegar.dzienLokalny, ADR 0007 pkt 1): ta sama funkcja co limit.
export function dzienLokalny(ms: number, strefa: string): string {
  return dzienW(strefa, ms);
}
function dzienPo(dzien: string): string {
  const [r, m, d] = dzien.split('-').map(Number);
  return new Date(Date.UTC(r ?? NaN, (m ?? NaN) - 1, (d ?? NaN) + 1)).toISOString().slice(0, 10);
}
// Pierwsza minuta, w której w strefie trwa `dzien`: przeszukanie binarne w oknie ±15 h od północy UTC (przesunięcia stref
// mieszczą się w −12…+14 h); data lokalna nie maleje w czasie, a przejścia czasu wypadają na pełnych minutach.
function poczatekDniaW(strefa: string, dzien: string): number {
  const polnocUtc = Date.parse(`${dzien}T00:00:00Z`);
  let lo = polnocUtc - 15 * 60 * MIN;
  let hi = polnocUtc + 15 * 60 * MIN;
  while (hi - lo > MIN) {
    const s = lo + Math.floor((hi - lo) / (2 * MIN)) * MIN;
    if (dzienW(strefa, s) < dzien) lo = s;
    else hi = s;
  }
  return hi;
}
