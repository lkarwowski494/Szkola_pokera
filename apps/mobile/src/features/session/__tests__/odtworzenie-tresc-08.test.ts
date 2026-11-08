/// <reference types="jest" />
/// <reference types="node" />
// D-248 na prawdziwej treści (pl): każda lekcja i egzamin każdego modułu odtwarzają się z planu w te same zadania
// (generatory deterministyczne przy tym samym ziarnie), a id zadań są unikalne w drills ∪ exam_drills (getDrillById).
import type { Drill } from '@szkola/content-schema';
import { createRng } from '@szkola/poker-core';
import type { DrillRow, RangeSpot } from '@/data/content/repo';
import { buildExamSession, buildLessonSession, odtworzZestaw, zadaniaZestawu } from '@/features/session/build';
import type { DrillInstance } from '@/features/drills/types';
import { sciezkaTresciPl } from '@/test-utils/trescPl';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
type W = { id: string; lessonId: string | null; family: string; data: string; moduleId: string; ord: number };
const lekcyjne = db.prepare('SELECT d.id, d.lesson_id AS lessonId, d.family, d.data, l.module_id AS moduleId, l.ord FROM drills d JOIN lessons l ON l.id = d.lesson_id ORDER BY l.ord, d.ord').all() as W[];
const egzaminacyjne = db.prepare('SELECT id, NULL AS lessonId, family, data, module_id AS moduleId, ord FROM exam_drills ORDER BY ord').all() as W[];
type R = { id: string; title: string; hero: string; path: string; play_percent: number; groups: string; uncertain: string };
const ranges = new Map((db.prepare('SELECT id, title, hero, path, play_percent, groups, uncertain FROM ranges').all() as R[])
  .map((r): [string, RangeSpot] => [r.id, { id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain) }]));
const ctx = { range: (id: string) => ranges.get(id) };
const wiersz = (r: W): DrillRow => ({ id: r.id, lessonId: r.lessonId, family: r.family, drill: JSON.parse(r.data) as Drill });
const mapa = new Map([...lekcyjne, ...egzaminacyjne].map((r) => [r.id, wiersz(r)]));
const bezKlucza = (xs: readonly DrillInstance[]) => xs.map(({ key: _k, ...r }) => r);

describe('D-248 odtworzenie na treści pl', () => {
  it('id zadań unikalne w drills ∪ exam_drills', () => {
    expect(mapa.size).toBe(lekcyjne.length + egzaminacyjne.length);
  });
  it('każda lekcja: zestaw z planu = zestaw zbudowany', () => {
    const lekcje = [...new Set(lekcyjne.map((r) => r.lessonId))];
    expect(lekcje.length).toBeGreaterThan(10);
    for (const l of lekcje) {
      const items = buildLessonSession(lekcyjne.filter((r) => r.lessonId === l).map(wiersz), createRng(11), ctx);
      expect({ l, z: bezKlucza(odtworzZestaw(zadaniaZestawu(items), (id) => mapa.get(id), ctx) ?? []) }).toEqual({ l, z: bezKlucza(items) });
    }
  });
  it('egzamin każdego modułu: zestaw z planu = zestaw zbudowany', () => {
    for (const m of [...new Set(lekcyjne.map((r) => r.moduleId))]) {
      const src = {
        modulePool: egzaminacyjne.filter((r) => r.moduleId === m).map(wiersz), moduleLessons: lekcyjne.filter((r) => r.moduleId === m).map(wiersz),
        earlierPool: [], earlierLessons: [],
      };
      const items = buildExamSession(src, createRng(3), ctx);
      expect({ m, z: bezKlucza(odtworzZestaw(zadaniaZestawu(items), (id) => mapa.get(id), ctx) ?? []) }).toEqual({ m, z: bezKlucza(items) });
    }
  });
});
