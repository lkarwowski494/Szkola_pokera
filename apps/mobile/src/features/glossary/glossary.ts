import type { TermArea } from '@szkola/content-schema';
import { TERMS, type AppTerm } from '@/data/content/terms.generated';

/**
 * Słowniczek PL ↔ EN (decyzja właściciela 4.10.2026). Dane z terms.generated.ts, nie z tabeli `terms` w bazie treści:
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

/** Teksty, po których szukamy: polska nazwa i formy, angielska nazwa, inne nazwy angielskie, skrót. */
function haystack(t: GlossaryEntry): string[] {
  return [t.pl, ...(t.forms ?? []), t.en, ...t.enAlt, ...(t.abbr ? [t.abbr] : [])].map(fold);
}

export function matches(t: GlossaryEntry, query: string): boolean {
  const q = fold(query);
  if (!q) return true;
  return haystack(t).some((h) => h.includes(q));
}

/** Terminy pasujące do zapytania, w obszarach (puste obszary pominięte), w obszarze alfabetycznie po polsku. */
export function glossarySections(query = '', entries: readonly GlossaryEntry[] = ALL): GlossarySection[] {
  const hits = entries.filter((t) => matches(t, query));
  return AREA_ORDER.map((area) => ({
    area,
    entries: hits.filter((t) => t.area === area).sort((a, b) => a.pl.localeCompare(b.pl, 'pl-PL') || a.en.localeCompare(b.en, 'en')),
  })).filter((s) => s.entries.length > 0);
}

/** Liczba wszystkich terminów w słowniczku. */
export const GLOSSARY_SIZE = ALL.length;

/** Angielska nazwa do wyświetlenia: nazwa, skrót w nawiasie, gdy różni się od nazwy (np. „under the gun (UTG)”). */
export function englishLabel(t: AppTerm): string {
  return t.abbr && t.abbr.toLowerCase() !== t.en.toLowerCase() ? `${t.en} (${t.abbr})` : t.en;
}
