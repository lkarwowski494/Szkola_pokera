// Pakiet treści: baza na język, wybór i instalacja pliku, manifest, powtórki wobec treści (ADR 0005; K-06; BR-DANE-004;
// tlo-i-bledy.md §4 `tresc_niedostepna`). Uzupełnienie roli 07 (luka dla 05, E3): moduly.md wymienia „wybór pliku treści”
// w apps/mobile/src/data bez sygnatury; decyzja i kolejność kroków są czystym TypeScriptem, więc tu, z portem plików
// (kształt według expo-file-system: readDirectoryAsync, copyAsync, moveAsync, deleteAsync), a adapter w apps/mobile.
// Kontrakt nazw: `tresc-<wersja>-<jezyk>.db`; wersja: jeden lub więcej znaków bez „-” i „/” (cyfry albo skrót), język z listy `@szkola/jezyki` (może mieć „-”: es-419, pt-BR).
import { niezaimplementowane } from './niezaimplementowane';
import type { Wynik } from './typy';

const NIEDOSTEPNA = { ok: false, powod: 'tresc_niedostepna' } as const;
// Wersja: znaki bez „-” i „/”; język: reszta nazwy (może mieć „-”). Inne nazwy to nie pliki treści.
const WZOR_PLIKU = /^tresc-([^-/]+)-([^/]+)\.db$/;
function czescNazwy(plik: string): { wersja: string; jezyk: string } | null {
  const m = WZOR_PLIKU.exec(plik);
  return m && m[1] !== undefined && m[2] !== undefined ? { wersja: m[1], jezyk: m[2] } : null;
}

export type PowodTresci = 'tresc_niedostepna';
// Tabela `meta` (ADR 0005 pkt 5): klucze `format`, `wersja`, `jezyk`, `min_wersja_aplikacji`; wartości jako TEXT.
export interface MetaTresci { format: number; wersja: string; jezyk: string; minWersjaAplikacji: string }
export interface PlanTresci {
  plik: string; // nazwa pliku do otwarcia (z paczki)
  kopiuj: boolean; // false, gdy plik o tej nazwie już jest na urządzeniu (ADR 0005 pkt 2: jedna kopia na wersję)
  usunPoOtwarciu: string[]; // inne pliki `tresc-*.db` na urządzeniu; usuwane dopiero po udanym otwarciu nowego
}

export function nazwaPlikuTresci(wersja: string, jezyk: string): string {
  return `tresc-${wersja}-${jezyk}.db`;
}
// Decyzja bez I/O: który plik z paczki, czy kopiować, co usunąć. Brak pliku języka w paczce → `tresc_niedostepna`.
// Pliki inne niż `tresc-*.db` (postep.db, user.db*, postep-uszkodzona-*.db) nigdy nie trafiają do `usunPoOtwarciu`.
// Paczka ma dokładnie jeden plik na język (content-build, ADR 0005); zero albo kilka → `tresc_niedostepna` (nie zgadujemy wersji).
export function planTresci(wej: { wPaczce: readonly string[]; naUrzadzeniu: readonly string[]; jezyk: string }): Wynik<PlanTresci, PowodTresci> {
  const pasujace = wej.wPaczce.filter((p) => czescNazwy(p)?.jezyk === wej.jezyk);
  const [plik] = pasujace;
  if (plik === undefined || pasujace.length > 1) return NIEDOSTEPNA;
  return {
    ok: true,
    wartosc: {
      plik,
      kopiuj: !wej.naUrzadzeniu.includes(plik),
      usunPoOtwarciu: wej.naUrzadzeniu.filter((p) => p !== plik && czescNazwy(p) !== null),
    },
  };
}
// Manifest z otwartego pliku wobec nazwy pliku i obsługiwanego formatu. Brak tabeli albo klucza, format niecałkowity
// albo nowszy niż obsługiwany, język albo wersja inne niż w nazwie → `tresc_niedostepna` (ADR 0005 pkt 5).
export function sprawdzMetaTresci(
  meta: Readonly<Record<string, string>> | null,
  plik: string,
  obslugiwanyFormat: number,
): Wynik<MetaTresci, PowodTresci> {
  const nazwa = czescNazwy(plik);
  if (meta === null || nazwa === null) return NIEDOSTEPNA;
  const { format, wersja, jezyk, min_wersja_aplikacji: minWersjaAplikacji } = meta;
  if (format === undefined || wersja === undefined || jezyk === undefined || minWersjaAplikacji === undefined) return NIEDOSTEPNA;
  if (!/^[1-9][0-9]*$/.test(format) || Number(format) > obslugiwanyFormat) return NIEDOSTEPNA;
  if (wersja !== nazwa.wersja || jezyk !== nazwa.jezyk) return NIEDOSTEPNA;
  return { ok: true, wartosc: { format: Number(format), wersja, jezyk, minWersjaAplikacji } };
}

export interface PlikiTresci {
  lista(katalog: string): Promise<string[]>; // nazwy plików w katalogu (bez ścieżki)
  kopiuj(z: string, na: string): Promise<void>; // bez nadpisywania istniejącego celu; przerwanie może zostawić niepełny plik `na`
  przemianuj(z: string, na: string): Promise<void>; // bez nadpisywania istniejącego celu
  usun(sciezka: string): Promise<void>; // idempotentne
}
export interface OpcjeTresci<B> {
  paczka: string; // katalog plików treści w paczce (tylko do odczytu)
  katalog: string; // katalog roboczy na urządzeniu (ten sam co postep.db); bez końcowego „/”
  jezyk: string;
  pliki: PlikiTresci;
  otworz: (sciezka: string) => Promise<{ baza: B; meta: Record<string, string> | null }>; // wyjątek = plik nieczytelny
  zamknij: (baza: B) => Promise<void>; // każda baza otwarta, a nie zwrócona w wyniku (np. odrzucony manifest), jest zamykana
  obslugiwanyFormat: number; // KONFIGURACJA.TRESC_FORMAT
}
// Start treści: plan → (kopia) → otwarcie i sprawdzenie manifestu → usunięcie starych plików. Nie rzuca: błąd planu, kopii,
// otwarcia albo manifestu to `tresc_niedostepna`; pliki inne niż `tresc-*.db` nietknięte. Przerwana kopia — także przez
// zabicie procesu, bez `catch` — nie może zablokować kolejnego startu (ADR 0005 pkt 2 „instalacja atomowa”; „Potwierdzenie”:
// przerwanie przed przełączeniem zostawia stary plik). Błąd usunięcia starego pliku po udanym otwarciu: luka dla 05.
export function przygotujTresc<B>(_o: OpcjeTresci<B>): Promise<Wynik<{ baza: B; meta: MetaTresci; plik: string }, PowodTresci>> {
  return niezaimplementowane('przygotujTresc (ADR 0005, K-06, tresc_niedostepna)');
}

// Kolejka powtórek wobec bieżącej treści (BR-DANE-004 „Zmiana treści lekcji”; ADR 0005 pkt 3): karty, których rodziny
// nie ma w treści, są pomijane bez błędu i nie zajmują miejsca w limicie; pozostałe jak `dueCards` z @szkola/srs
// (termin ≤ teraz, od najbardziej zaległej). Wejście nie jest zmieniane; usuwanie kart z bazy nie należy do tej funkcji.
// Ta sama reguła co `dueCards` (packages/srs/src/index.ts:117–122), bez zależności domeny od srs; sortowanie stabilne
// na kopii. Termin to chwila UTC, więc strefa nie zmienia wyniku (BR-POW-002).
export function kolejkaPowtorek<K extends { familyId: string; due: number }>(
  karty: readonly K[],
  wTresci: ReadonlySet<string>,
  teraz: number,
  limit = Infinity,
): K[] {
  return karty
    .filter((k) => wTresci.has(k.familyId) && k.due <= teraz)
    .sort((a, b) => a.due - b.due)
    .slice(0, limit);
}
