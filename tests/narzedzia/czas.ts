// Narzędzia czasu dla testów (wzorzec roli 07 „Przejścia czasu”): przejścia DST i zmiany przesunięcia wyliczone z bazy stref (Intl),
// nie wpisane datami, więc testy działają w każdym roku. Wymaga Node z pełnym ICU (domyślne w oficjalnych wydaniach).
// To wyrocznia testów: nie importuje kodu aplikacji.
const formaty = new Map<string, Intl.DateTimeFormat>();
function format(strefa: string): Intl.DateTimeFormat {
  let f = formaty.get(strefa);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone: strefa, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    formaty.set(strefa, f);
  }
  return f;
}
function czesci(strefa: string, ms: number): Record<string, number> {
  return Object.fromEntries(format(strefa).formatToParts(new Date(ms)).map((p) => [p.type, Number(p.value)]));
}

/** Przesunięcie strefy względem UTC w minutach w chwili `ms`. */
export function przesuniecieMin(strefa: string, ms: number): number {
  const c = czesci(strefa, ms);
  return Math.round((Date.UTC(c.year!, c.month! - 1, c.day!, c.hour!, c.minute!, c.second!) - Math.floor(ms / 1000) * 1000) / 60000);
}

/** Wszystkie przejścia czasu w strefie w danym roku: pierwsza minuta z nowym przesunięciem. */
export function przejsciaCzasu(strefa: string, rok: number): { utcMs: number; przedMin: number; poMin: number }[] {
  const H = 3_600_000;
  const wynik: { utcMs: number; przedMin: number; poMin: number }[] = [];
  for (let t = Date.UTC(rok, 0, 1); t < Date.UTC(rok + 1, 0, 1); t += H) {
    const a = przesuniecieMin(strefa, t);
    const b = przesuniecieMin(strefa, t + H);
    if (a === b) continue;
    let lo = t;
    let hi = t + H;
    while (hi - lo > 60_000) {
      const m = lo + Math.floor((hi - lo) / 120_000) * 60_000;
      if (przesuniecieMin(strefa, m) === a) lo = m;
      else hi = m;
    }
    wynik.push({ utcMs: hi, przedMin: a, poMin: b });
  }
  return wynik;
}

/** Data kalendarzowa RRRR-MM-DD w strefie w chwili `ms`. */
export function dzienW(strefa: string, ms: number): string {
  const c = czesci(strefa, ms);
  return `${String(c.year).padStart(4, '0')}-${String(c.month).padStart(2, '0')}-${String(c.day).padStart(2, '0')}`;
}

/** Pierwsza minuta (ms UTC), w której w strefie trwa dzień `dzien` (północ albo, gdy jej nie ma przez zmianę czasu, pierwsza istniejąca chwila). */
export function poczatekDnia(strefa: string, dzien: string): number {
  const [r, m, d] = dzien.split('-').map(Number) as [number, number, number];
  let lo = Date.UTC(r, m - 1, d) - 15 * 3_600_000; // skrajne przesunięcia: −12 … +14 h
  let hi = Date.UTC(r, m - 1, d) + 15 * 3_600_000;
  while (hi - lo > 60_000) {
    const s = lo + Math.floor((hi - lo) / 120_000) * 60_000;
    if (dzienW(strefa, s) < dzien) lo = s;
    else hi = s;
  }
  return hi;
}

/** Dzień kalendarzowy następny po `dzien` (rachunek na dacie, bez strefy). */
export function nastepnyDzien(dzien: string): string {
  const [r, m, d] = dzien.split('-').map(Number) as [number, number, number];
  return new Date(Date.UTC(r, m - 1, d + 1)).toISOString().slice(0, 10);
}
