import type { AreaInput } from '@szkola/srs';
import { reportError } from '@/observability/observe';

/** Klucz w tabeli settings (user.db): treść, którą użytkownik ostatnio widział we wskaźniku. */
export const SEEN_CONTENT_KEY = 'advancement.seenContent';

/** Zapamiętany stan treści: hash content.db i umiejętności liczone do wyniku ogólnego. */
export interface SeenContent {
  hash: string;
  skills: string[];
}

/** Umiejętności wchodzące do wyniku ogólnego (moduł opcjonalny pominięty), posortowane. */
export function countedSkills(areas: readonly AreaInput[]): string[] {
  return areas
    .filter((a) => a.counted)
    .flatMap((a) => a.skills)
    .sort();
}

export function parseSeen(value: string | null): SeenContent | null {
  if (!value) return null;
  try {
    const v = JSON.parse(value) as Partial<SeenContent>;
    if (typeof v.hash !== 'string' || !Array.isArray(v.skills)) return null;
    return { hash: v.hash, skills: v.skills.filter((s): s is string => typeof s === 'string') };
  } catch (e) {
    // uszkodzony zapis w user.db: zaczynamy od nowa, ale zgłaszamy (w komunikacie tylko hash treści i nazwy umiejętności)
    reportError(e);
    return null;
  }
}

export interface ContentChange {
  /** true: pokaż raz komunikat „Nowe lekcje – wskaźnik przeliczony”. */
  notice: boolean;
  /** Ile nowych umiejętności liczonych do wyniku ogólnego doszło od ostatnio widzianej treści. */
  added: number;
  /** Wartość do zapisania w settings albo null, gdy nic się nie zmieniło. */
  next: string | null;
}

/**
 * Porównuje bieżącą treść z ostatnio widzianą (ADR-25). Nowe umiejętności liczą się jako 0, więc wynik spada;
 * komunikat wyjaśnia ten spadek. Pierwsze uruchomienie (brak zapisu) i użytkownik bez żadnej odpowiedzi nie dostają
 * komunikatu, bo nie mają wcześniejszego wyniku do porównania. Zmiana hasha bez nowych umiejętności zapisuje stan
 * po cichu.
 */
export function detectContentChange(prevValue: string | null, current: SeenContent, hasProgress: boolean): ContentChange {
  const prev = parseSeen(prevValue);
  const next = JSON.stringify(current);
  if (!prev) return { notice: false, added: 0, next };
  if (prev.hash === current.hash) return { notice: false, added: 0, next: null };
  const known = new Set(prev.skills);
  const added = current.skills.filter((s) => !known.has(s)).length;
  return { notice: hasProgress && added > 0, added, next };
}
