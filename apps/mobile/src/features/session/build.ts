import { interleave } from '@szkola/srs';
import { pick, shuffle, type Rng } from '@szkola/poker-core';
import type { DrillRow } from '@/data/content/repo';
import { instantiate, isGenerative, type DrillContext } from '@/features/drills/engine';
import { EXAM_MAX_PAINT, EXAM_MAX_PER_GENERATOR, EXAM_MODULE_SHARE, EXAM_SIZE } from '@/features/drills/thresholds';
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
  // malowanie zakresu i klasyfikacja tekstury (trzy wybory) poza treningiem na czas; tekstura do ponownej oceny po teście na telefonie (decyzja M5)
  const timed = rows.filter((r) => r.drill.kind !== 'paint' && r.drill.kind !== 'texture');
  const usable = knownFamilies.filter((f) => timed.some((r) => r.family === f));
  const families = shuffle(rng, usable).slice(0, Math.max(1, Math.ceil(size / 2)));
  return buildFamilySession(timed, families, rng, 2, ctx).slice(0, size);
}

/**
 * Wybór `n` zadań z wierszy: rodziny po kolei w losowej kolejności (każda rodzina raz, zanim któraś się powtórzy),
 * zadania stałe bez powtórek, generator najwyżej `genCap` razy, malowanie zakresu najwyżej `budget.paint` razy.
 * W rodzinie najpierw zadania jeszcze niewidziane na egzaminie (`seen`) i generatory, potem już widziane.
 */
function pickRows(
  rows: readonly DrillRow[],
  n: number,
  rng: Rng,
  used: Map<string, number>,
  budget: { paint: number },
  genCap = Infinity,
  seen: ReadonlySet<string> = new Set(),
): DrillRow[] {
  const byFamily = new Map<string, DrillRow[]>();
  for (const r of rows) byFamily.set(r.family, [...(byFamily.get(r.family) ?? []), r]);
  const out: DrillRow[] = [];
  const count = (r: DrillRow) => used.get(r.id) ?? 0;
  const usable = (r: DrillRow) =>
    isGenerative(r.drill) ? count(r) < genCap : r.drill.kind === 'paint' ? budget.paint > 0 && count(r) === 0 : count(r) === 0;
  const stale = (r: DrillRow) => !isGenerative(r.drill) && seen.has(r.id);
  while (out.length < n) {
    const families = shuffle(rng, [...byFamily.keys()].filter((f) => byFamily.get(f)!.some(usable)));
    if (families.length === 0) break;
    for (const f of families) {
      if (out.length >= n) break;
      const all = byFamily.get(f)!.filter(usable);
      if (all.length === 0) continue;
      const fresh = all.filter((r) => !stale(r));
      const row = pick(rng, fresh.length ? fresh : all);
      used.set(row.id, count(row) + 1);
      if (row.drill.kind === 'paint') budget.paint--;
      out.push(row);
    }
  }
  return out;
}

/**
 * Jedna część egzaminu (moduł albo wcześniejsze moduły): najpierw pula egzaminacyjna i generatory z lekcji
 * (każdy najwyżej EXAM_MAX_PER_GENERATOR razy), zadania stałe z lekcji tylko jako uzupełnienie, a na końcu
 * generatory bez limitu, gdy niczego innego nie ma.
 */
function pickExamPart(
  pool: readonly DrillRow[],
  lessons: readonly DrillRow[],
  n: number,
  rng: Rng,
  used: Map<string, number>,
  budget: { paint: number },
  seen: ReadonlySet<string>,
): DrillRow[] {
  const gens = lessons.filter((r) => isGenerative(r.drill));
  const fixed = lessons.filter((r) => !isGenerative(r.drill));
  const out = pickRows([...pool, ...gens], n, rng, used, budget, EXAM_MAX_PER_GENERATOR, seen);
  if (out.length < n) out.push(...pickRows(fixed, n - out.length, rng, used, budget));
  if (out.length < n) out.push(...pickRows(gens, n - out.length, rng, used, budget));
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

/** Źródła egzaminu: pule egzaminacyjne (exam_drills) i zadania z lekcji, osobno dla modułu i wcześniejszych modułów. */
export interface ExamSources {
  modulePool: readonly DrillRow[];
  moduleLessons: readonly DrillRow[];
  earlierPool: readonly DrillRow[];
  earlierLessons: readonly DrillRow[];
}

/**
 * Egzamin modułu (FR-10, B-023): EXAM_SIZE zadań, ok. EXAM_MODULE_SHARE z modułu, reszta z wcześniejszych modułów,
 * przeplatane. Gdy wcześniejszych modułów brak, wszystkie zadania są z modułu. Zadania z puli egzaminacyjnej
 * i generatory mają pierwszeństwo przed zadaniami stałymi z lekcji (żeby egzamin nie powtarzał ćwiczeń),
 * a z puli najpierw te, których użytkownik nie widział jeszcze na egzaminie (`seen`).
 */
export function buildExamSession(src: ExamSources, rng: Rng, ctx?: DrillContext, size = EXAM_SIZE, seen: ReadonlySet<string> = new Set()): DrillInstance[] {
  const used = new Map<string, number>();
  const budget = { paint: EXAM_MAX_PAINT };
  const hasEarlier = src.earlierPool.length + src.earlierLessons.length > 0;
  const nModule = hasEarlier ? Math.round(size * EXAM_MODULE_SHARE) : size;
  const fromModule = pickExamPart(src.modulePool, src.moduleLessons, nModule, rng, used, budget, seen);
  const fromEarlier = pickExamPart(src.earlierPool, src.earlierLessons, size - fromModule.length, rng, used, budget, seen);
  return interleaveRows([...fromModule, ...fromEarlier], rng).map((row, i) => {
    const inst = instantiate(row.drill, row.lessonId, rng, 1, ctx)[0]!;
    return { ...inst, key: `${inst.key}@exam-${i}` };
  });
}
