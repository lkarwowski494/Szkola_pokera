import { interleave } from '@szkola/srs';
import { pick, shuffle, type Rng } from '@szkola/poker-core';
import type { DrillRow } from '@/data/content/repo';
import { instantiate, isGenerative, type DrillContext } from '@/features/drills/engine';
import { EXAM_MAX_PAINT, EXAM_MODULE_SHARE, EXAM_SIZE } from '@/features/drills/thresholds';
import type { DrillInstance } from '@/features/drills/types';

export type SessionMode = 'lesson' | 'review' | 'speed' | 'exam';

/** Lekcja: wszystkie zadania w kolejności z treści (zadania z generatorów w zadanej liczbie). */
export function buildLessonSession(rows: readonly DrillRow[], rng: Rng, ctx?: DrillContext): DrillInstance[] {
  return rows.flatMap((r) => instantiate(r.drill, r.lessonId, rng, undefined, ctx));
}

/**
 * Powtórka: z każdej rodziny po `perFamily` świeżych zadań, przeplatanych tak,
 * żeby ta sama rodzina nie wypadała dwa razy z rzędu (przeplatanie podobnych spotów).
 */
export function buildFamilySession(rows: readonly DrillRow[], families: readonly string[], rng: Rng, perFamily = 2, ctx?: DrillContext): DrillInstance[] {
  const byFamily = new Map<string, DrillRow[]>();
  for (const r of rows) byFamily.set(r.family, [...(byFamily.get(r.family) ?? []), r]);
  const usable = families.filter((f) => byFamily.has(f));
  const order = interleave(usable, perFamily);
  const usedChoice = new Set<string>();
  const out: DrillInstance[] = [];
  for (const family of order) {
    const candidates = byFamily.get(family)!;
    // zadania z generatora dają za każdym razem nowe rozdanie; zadania stałe (wybór, liczba, malowanie)
    // nie powtarzają się w jednej sesji
    const fresh = candidates.filter((c) => isGenerative(c.drill) || !usedChoice.has(c.id));
    if (fresh.length === 0) continue;
    const row = pick(rng, fresh);
    if (!isGenerative(row.drill)) usedChoice.add(row.id);
    out.push(...instantiate(row.drill, row.lessonId, rng, 1, ctx).map((d, i) => ({ ...d, key: `${d.key}@${out.length}-${i}` })));
  }
  return out;
}

/** Trening na czas: losowe rodziny z już poznanych, krótka seria. Bez malowania zakresu (to nie jest decyzja na czas). */
export function buildSpeedSession(rows: readonly DrillRow[], knownFamilies: readonly string[], rng: Rng, size = 10, ctx?: DrillContext): DrillInstance[] {
  const timed = rows.filter((r) => r.drill.kind !== 'paint');
  const usable = knownFamilies.filter((f) => timed.some((r) => r.family === f));
  const families = shuffle(rng, usable).slice(0, Math.max(1, Math.ceil(size / 2)));
  return buildFamilySession(timed, families, rng, 2, ctx).slice(0, size);
}

/**
 * Wybór `n` zadań z wierszy: rodziny po kolei w losowej kolejności (każda rodzina raz, zanim któraś się powtórzy),
 * zadania stałe bez powtórek, malowanie zakresu najwyżej `budget.paint` razy.
 */
function pickRows(rows: readonly DrillRow[], n: number, rng: Rng, used: Set<string>, budget: { paint: number }): DrillRow[] {
  const byFamily = new Map<string, DrillRow[]>();
  for (const r of rows) byFamily.set(r.family, [...(byFamily.get(r.family) ?? []), r]);
  const out: DrillRow[] = [];
  const usable = (r: DrillRow) =>
    isGenerative(r.drill) ? true : r.drill.kind === 'paint' ? budget.paint > 0 && !used.has(r.id) : !used.has(r.id);
  while (out.length < n) {
    const families = shuffle(rng, [...byFamily.keys()].filter((f) => byFamily.get(f)!.some(usable)));
    if (families.length === 0) break;
    for (const f of families) {
      if (out.length >= n) break;
      const candidates = byFamily.get(f)!.filter(usable);
      if (candidates.length === 0) continue;
      const row = pick(rng, candidates);
      if (!isGenerative(row.drill)) used.add(row.id);
      if (row.drill.kind === 'paint') budget.paint--;
      out.push(row);
    }
  }
  return out;
}

/** Kolejność bez tej samej rodziny dwa razy z rzędu (o ile się da): zawsze rodzina z największą liczbą pozostałych zadań. */
export function interleaveRows<T extends { family: string }>(items: readonly T[], rng: Rng): T[] {
  const queues = new Map<string, T[]>();
  for (const it of shuffle(rng, [...items])) queues.set(it.family, [...(queues.get(it.family) ?? []), it]);
  const out: T[] = [];
  let last: string | null = null;
  while (out.length < items.length) {
    const open = [...queues.entries()].filter(([, q]) => q.length > 0);
    const choices = open.filter(([f]) => f !== last);
    const from = (choices.length ? choices : open).sort((a, b) => b[1].length - a[1].length);
    const top = from.filter(([, q]) => q.length === from[0]![1].length);
    const [family, q] = top[Math.floor(rng() * top.length)]!;
    out.push(q.shift()!);
    last = family;
  }
  return out;
}

/**
 * Egzamin modułu (FR-10, B-023): EXAM_SIZE zadań, ok. EXAM_MODULE_SHARE z modułu, reszta z wcześniejszych modułów,
 * przeplatane. Gdy wcześniejszych modułów brak, wszystkie zadania są z modułu.
 */
export function buildExamSession(moduleRows: readonly DrillRow[], earlierRows: readonly DrillRow[], rng: Rng, ctx?: DrillContext, size = EXAM_SIZE): DrillInstance[] {
  const used = new Set<string>();
  const budget = { paint: EXAM_MAX_PAINT };
  const nModule = earlierRows.length > 0 ? Math.round(size * EXAM_MODULE_SHARE) : size;
  const fromModule = pickRows(moduleRows, nModule, rng, used, budget);
  const fromEarlier = pickRows(earlierRows, size - fromModule.length, rng, used, budget);
  return interleaveRows([...fromModule, ...fromEarlier], rng).map((row, i) => {
    const inst = instantiate(row.drill, row.lessonId, rng, 1, ctx)[0]!;
    return { ...inst, key: `${inst.key}@exam-${i}` };
  });
}
