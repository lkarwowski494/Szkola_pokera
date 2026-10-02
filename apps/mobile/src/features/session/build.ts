import { interleave } from '@szkola/srs';
import { pick, shuffle, type Rng } from '@szkola/poker-core';
import type { DrillRow } from '@/data/content/repo';
import { instantiate } from '@/features/drills/engine';
import type { DrillInstance } from '@/features/drills/types';

export type SessionMode = 'lesson' | 'review' | 'speed';

/** Lekcja: wszystkie zadania w kolejności z treści (zadania z generatorów w zadanej liczbie). */
export function buildLessonSession(rows: readonly DrillRow[], rng: Rng): DrillInstance[] {
  return rows.flatMap((r) => instantiate(r.drill, r.lessonId, rng));
}

/**
 * Powtórka: z każdej rodziny po `perFamily` świeżych zadań, przeplatanych tak,
 * żeby ta sama rodzina nie wypadała dwa razy z rzędu (przeplatanie podobnych spotów).
 */
export function buildFamilySession(rows: readonly DrillRow[], families: readonly string[], rng: Rng, perFamily = 2): DrillInstance[] {
  const byFamily = new Map<string, DrillRow[]>();
  for (const r of rows) byFamily.set(r.family, [...(byFamily.get(r.family) ?? []), r]);
  const usable = families.filter((f) => byFamily.has(f));
  const order = interleave(usable, perFamily);
  const usedChoice = new Set<string>();
  const out: DrillInstance[] = [];
  for (const family of order) {
    const candidates = byFamily.get(family)!;
    // zadania z generatora dają za każdym razem nowe rozdanie; zadania stałe nie powtarzają się w jednej sesji
    const fresh = candidates.filter((c) => c.drill.kind === 'generated' || !usedChoice.has(c.id));
    if (fresh.length === 0) continue;
    const row = pick(rng, fresh);
    if (row.drill.kind === 'choice') usedChoice.add(row.id);
    out.push(...instantiate(row.drill, row.lessonId, rng, 1).map((d, i) => ({ ...d, key: `${d.key}@${out.length}-${i}` })));
  }
  return out;
}

/** Trening na czas: losowe rodziny z już poznanych, krótka seria. */
export function buildSpeedSession(rows: readonly DrillRow[], knownFamilies: readonly string[], rng: Rng, size = 10): DrillInstance[] {
  const families = shuffle(rng, knownFamilies).slice(0, Math.max(1, Math.ceil(size / 2)));
  return buildFamilySession(rows, families, rng, 2).slice(0, size);
}
