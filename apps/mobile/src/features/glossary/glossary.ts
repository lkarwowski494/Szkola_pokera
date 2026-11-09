import type { TermArea } from '@szkola/content-schema';
import { TERM_NAMES, TERMS, type AppTerm } from '@/data/content/terms.generated';
import { nazwyTerminow } from '@/features/drills/terms';

/**
 * Słowniczek PL ↔ EN (decyzja właściciela 4.10.2026); w innym języku aplikacji termin angielski (w ja, zh-Hant, pt-BR, fr
 * nad nim nazwa lokalna, D-369) i definicja, bez polskich słów (D-347, 2026-11-09): wyszukiwanie i kolejność po angielsku. Dane z terms.generated.ts, nie z tabeli `terms` w bazie treści:
 * to ten sam plik, z którego korzystają ćwiczenie słownictwa i teksty interfejsu, oba powstają z content/terms.yaml
 * w jednym przebiegu content-build (content:check pilnuje, że plik jest aktualny), a lista jest dostępna synchronicznie
 * i daje się testować bez SQLite.
 */

export interface GlossaryEntry extends AppTerm {
  key: string;
}

export interface GlossarySection {
  area: TermArea;
  entries: GlossaryEntry[];
}

/** Kolejność obszarów jak w kursie: od układów i akcji do bankrollu i turniejów. */
export const AREA_ORDER: readonly TermArea[] = ['hands', 'actions', 'table', 'positions', 'math', 'preflop', 'board', 'strategy', 'mental', 'tournament'];

const ALL: GlossaryEntry[] = Object.entries(TERMS as Record<string, AppTerm>).map(([key, t]) => ({ key, ...t }));

/** Małe litery bez polskich znaków diakrytycznych: „zjeździe” znajdzie się po „zjezdzie”. */
export function fold(s: string): string {
  return s
    .toLocaleLowerCase('pl-PL')
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Słowniczek z polskimi nazwami tylko w polskiej wersji aplikacji (D-347). */
export const zPolskimi = (jezyk: string): boolean => jezyk === 'pl';

/**
 * Nazwa terminu w języku aplikacji poza pl i en (D-369; ta sama co w tekście lekcji, K-05 terms-nazwy.yaml), gdy różni się
 * od angielskiej; inaczej `undefined` (jedna linia z nazwą angielską).
 */
export function nazwaLokalna(t: GlossaryEntry, jezyk: string, nazwy: typeof TERM_NAMES = TERM_NAMES): string | undefined {
  if (zPolskimi(jezyk)) return undefined;
  const n = nazwyTerminow(jezyk, nazwy)?.[t.key];
  return n && fold(n) !== fold(t.en) ? n : undefined;
}

/** Teksty, po których szukamy: polska nazwa i formy (tylko pl, D-347), nazwa lokalna (D-369), angielska, inne angielskie, skrót. */
function haystack(t: GlossaryEntry, jezyk: string, nazwy: typeof TERM_NAMES): string[] {
  const lokalna = nazwaLokalna(t, jezyk, nazwy);
  return [...(zPolskimi(jezyk) ? [t.pl, ...(t.forms ?? [])] : []), ...(lokalna ? [lokalna] : []), t.en, ...t.enAlt, ...(t.abbr ? [t.abbr] : [])].map(fold);
}

export function matches(t: GlossaryEntry, query: string, jezyk = 'pl', nazwy: typeof TERM_NAMES = TERM_NAMES): boolean {
  const q = fold(query);
  if (!q) return true;
  return haystack(t, jezyk, nazwy).some((h) => h.includes(q));
}

/**
 * Terminy pasujące do zapytania, w obszarach (puste obszary pominięte), w obszarze alfabetycznie po polsku (poza pl: po nazwie
 * wyświetlanej — lokalnej, gdy jest, inaczej angielskiej; D-369).
 */
export function glossarySections(query = '', entries: readonly GlossaryEntry[] = ALL, jezyk = 'pl', nazwy: typeof TERM_NAMES = TERM_NAMES): GlossarySection[] {
  const hits = entries.filter((t) => matches(t, query, jezyk, nazwy));
  const wyswietlana = (t: GlossaryEntry) => nazwaLokalna(t, jezyk, nazwy) ?? t.en;
  const kolejnosc = zPolskimi(jezyk)
    ? (a: GlossaryEntry, b: GlossaryEntry) => a.pl.localeCompare(b.pl, 'pl-PL') || a.en.localeCompare(b.en, 'en')
    : (a: GlossaryEntry, b: GlossaryEntry) => wyswietlana(a).localeCompare(wyswietlana(b), jezyk) || a.en.localeCompare(b.en, 'en');
  return AREA_ORDER.map((area) => ({
    area,
    entries: hits.filter((t) => t.area === area).sort(kolejnosc),
  })).filter((s) => s.entries.length > 0);
}

/** Liczba wszystkich terminów w słowniczku. */
export const GLOSSARY_SIZE = ALL.length;

/** Angielska nazwa do wyświetlenia: nazwa, skrót w nawiasie, gdy różni się od nazwy (np. „under the gun (UTG)”). */
export function englishLabel(t: AppTerm): string {
  return t.abbr && t.abbr.toLowerCase() !== t.en.toLowerCase() ? `${t.en} (${t.abbr})` : t.en;
}
