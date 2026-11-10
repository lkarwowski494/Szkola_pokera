// Statystyki ekranów Nauka i Postęp liczone z faktów (odpowiedz, aktywnosc); bez własnych tabel (schemat v1).
import type { Wynik } from '@szkola/domena';
import type { PortBazy } from './port';
import type { PowodOdczytu } from './ustawienia';

export interface StatystykaRodziny { rodzinaId: string; wszystkie: number; zaliczone: number }
export interface WynikLekcji { lekcjaId: string; poprawne: number; wszystkie: number }

const calkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);
type Odczyt<T> = Promise<Wynik<T[], PowodOdczytu>>;

// Wspólny odczyt: każdy wiersz przez parser; jeden zły wiersz albo błąd bazy → odczyt_nieudany (bez cichych braków).
async function odczyt<T>(port: PortBazy, sql: string, parsuj: (w: object) => T | null): Odczyt<T> {
  try {
    const wynik: T[] = [];
    for (const w of await port.all<unknown>(sql)) {
      const x = typeof w === 'object' && w !== null ? parsuj(w) : null;
      if (x === null) return { ok: false, powod: 'odczyt_nieudany' };
      wynik.push(x);
    }
    return { ok: true, wartosc: wynik };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

// Ocena poziomu (rodzaj `ocena_poziomu`) nie liczy się do statystyk ani serii (decyzja właściciela 2026-11-10, D-477):
// tylko filtr odczytu, zapisane odpowiedzi oceny zostają w bazie i w eksporcie bez zmian.
export function statystykiRodzin(port: PortBazy): Odczyt<StatystykaRodziny> {
  return odczyt(port, `SELECT o.rodzina_id AS rodzina_id, count(*) AS n, sum(o.zaliczona) AS z FROM odpowiedz o
     JOIN aktywnosc a ON a.id = o.aktywnosc_id WHERE a.rodzaj <> 'ocena_poziomu' GROUP BY o.rodzina_id ORDER BY o.rodzina_id`, (w) =>
    'rodzina_id' in w && typeof w.rodzina_id === 'string' && 'n' in w && calkowita(w.n) && 'z' in w && calkowita(w.z)
      ? { rodzinaId: w.rodzina_id, wszystkie: w.n, zaliczone: w.z } : null);
}
// Najlepszy wynik każdej ukończonej lekcji (aktywność `lekcja` w stanie `zakonczona`, trescId planu = id lekcji);
// przy równym ułamku pierwszy w kolejności zakończenia.
export async function wynikiLekcji(port: PortBazy): Odczyt<WynikLekcji> {
  const r = await odczyt(port,
    `SELECT json_extract(a.plan, '$.trescId') AS lekcja, count(o.id) AS n, coalesce(sum(o.zaliczona), 0) AS z
     FROM aktywnosc a LEFT JOIN odpowiedz o ON o.aktywnosc_id = a.id
     WHERE a.rodzaj = 'lekcja' AND a.stan = 'zakonczona' GROUP BY a.id ORDER BY a.koniec_ms, a.id`,
    (w) => 'lekcja' in w && typeof w.lekcja === 'string' && 'n' in w && calkowita(w.n) && 'z' in w && calkowita(w.z)
      ? { lekcjaId: w.lekcja, poprawne: w.z, wszystkie: w.n } : null);
  if (!r.ok) return r;
  const najlepsze = new Map<string, WynikLekcji>();
  for (const x of r.wartosc) {
    const p = najlepsze.get(x.lekcjaId);
    if (x.wszystkie > 0 && (!p || x.poprawne * p.wszystkie > p.poprawne * x.wszystkie)) najlepsze.set(x.lekcjaId, x);
  }
  return { ok: true, wartosc: [...najlepsze.values()] };
}
// Dni lokalne (RRRR-MM-DD) aktywności z co najmniej jedną odpowiedzią (D-251).
export function dniZOdpowiedzia(port: PortBazy): Odczyt<string> {
  return odczyt(port,
    `SELECT DISTINCT a.dzien_lokalny AS d FROM aktywnosc a
     WHERE a.rodzaj <> 'ocena_poziomu' AND EXISTS (SELECT 1 FROM odpowiedz o WHERE o.aktywnosc_id = a.id) ORDER BY d`,
    (w) => ('d' in w && typeof w.d === 'string' ? w.d : null));
}
// Seria: liczba kolejnych dni kalendarzowych kończących się dziś albo wczoraj (dziś bez odpowiedzi nie przerywa serii).
export function seriaDni(dni: readonly string[], dzisiaj: string): number {
  const zbior = new Set(dni);
  const poprzedni = (d: string) => {
    const [r, m, dd] = d.split('-').map(Number);
    return new Date(Date.UTC(r ?? 0, (m ?? 1) - 1, (dd ?? 1) - 1)).toISOString().slice(0, 10);
  };
  let d = zbior.has(dzisiaj) ? dzisiaj : poprzedni(dzisiaj);
  let n = 0;
  while (zbior.has(d)) { n++; d = poprzedni(d); }
  return n;
}
