import type { TermArea } from '@szkola/content-schema';
import { TERMS, type AppTerm } from '@/data/content/terms.generated';

/**
 * Słowniczek PL ↔ EN (decyzja właściciela 4.10.2026); w innym języku aplikacji tylko termin angielski i definicja, bez
 * polskich słów (D-347, 2026-11-09): wyszukiwanie i kolejność po angielsku. Dane z terms.generated.ts, nie z tabeli `terms` w bazie treści:
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

/** Teksty, po których szukamy: polska nazwa i formy (tylko pl, D-347), angielska nazwa, inne nazwy angielskie, skrót. */
function haystack(t: GlossaryEntry, jezyk: string): string[] {
  return [...(zPolskimi(jezyk) ? [t.pl, ...(t.forms ?? [])] : []), t.en, ...t.enAlt, ...(t.abbr ? [t.abbr] : [])].map(fold);
}

export function matches(t: GlossaryEntry, query: string, jezyk = 'pl'): boolean {
  const q = fold(query);
  if (!q) return true;
  return haystack(t, jezyk).some((h) => h.includes(q));
}

/** Terminy pasujące do zapytania, w obszarach (puste obszary pominięte), w obszarze alfabetycznie po polsku (poza pl: po angielsku). */
export function glossarySections(query = '', entries: readonly GlossaryEntry[] = ALL, jezyk = 'pl'): GlossarySection[] {
  const hits = entries.filter((t) => matches(t, query, jezyk));
  const kolejnosc = zPolskimi(jezyk)
    ? (a: GlossaryEntry, b: GlossaryEntry) => a.pl.localeCompare(b.pl, 'pl-PL') || a.en.localeCompare(b.en, 'en')
    : (a: GlossaryEntry, b: GlossaryEntry) => a.en.localeCompare(b.en, 'en');
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
