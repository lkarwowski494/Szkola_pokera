/// <reference types="jest" />
/// <reference types="node" />
/**
 * Test na prawdziwej treści: każde zadanie z content-vN.db daje się utworzyć i ocenić, a egzamin każdego modułu
 * ma pełną długość. Łapie rozjazd między potokiem treści a silnikiem zadań.
 */
import { CONTENT_SCHEMA_VERSION, type Drill } from '@szkola/content-schema';
import { classOf, createRng, parseCard } from '@szkola/poker-core';
import { join } from 'node:path';
import type { DrillRow, RangeSpot } from '@/data/content/repo';
import { instantiate } from '@/features/drills/engine';
import { gradeAnswer } from '@/features/drills/grade';
import { EXAM_SIZE, MIXED_HIGH } from '@/features/drills/thresholds';
import { buildExamSession } from '@/features/session/build';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

const db = new DatabaseSync(join(__dirname, `../../../../assets/content/content-v${CONTENT_SCHEMA_VERSION}.db`), { readOnly: true });
const rows = db.prepare('SELECT d.id, d.lesson_id AS lessonId, d.family, d.data, l.module_id AS moduleId, m.ord FROM drills d JOIN lessons l ON l.id = d.lesson_id JOIN modules m ON m.id = l.module_id').all() as {
  id: string;
  lessonId: string;
  family: string;
  data: string;
  moduleId: string;
  ord: number;
}[];
const ranges = new Map(
  (
    db.prepare('SELECT id, title, hero, path, play_percent, groups, uncertain FROM ranges').all() as {
      id: string;
      title: string;
      hero: string;
      path: string;
      play_percent: number;
      groups: string;
      uncertain: string;
    }[]
  ).map((r): [string, RangeSpot] => [
    r.id,
    { id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain) },
  ]),
);
const ctx = { range: (id: string) => ranges.get(id) };
const toRow = (r: (typeof rows)[number]): DrillRow => ({ id: r.id, lessonId: r.lessonId, family: r.family, drill: JSON.parse(r.data) as Drill });

describe('treść w bazie a silnik zadań', () => {
  it('każde zadanie daje się utworzyć i ma poprawną odpowiedź', () => {
    for (const r of rows) {
      const insts = instantiate(JSON.parse(r.data) as Drill, r.lessonId, createRng(1), undefined, ctx);
      expect(insts.length).toBeGreaterThan(0);
      for (const inst of insts) {
        if (inst.kind === 'choice') {
          const i = inst.options.findIndex((o) => o.correct);
          expect(gradeAnswer(inst, { kind: 'choice', index: i })).toBe('correct');
        } else if (inst.kind === 'numeric') {
          expect(gradeAnswer(inst, { kind: 'numeric', value: inst.answer })).toBe('correct');
        } else if (inst.kind === 'texture') {
          // każda oś ma dokładnie jedną poprawną wartość, każda opcja ma wyjaśnienie
          for (const a of inst.axes) {
            expect(a.options.filter((o) => o.correct)).toHaveLength(1);
            for (const o of a.options) expect(o.why.length).toBeGreaterThan(3);
          }
          const right = inst.axes.map((a) => a.options.findIndex((o) => o.correct));
          expect(gradeAnswer(inst, { kind: 'texture', picks: right })).toBe('correct');
        } else {
          // zakres solvera narysowany dokładnie (ręce grane co najmniej z częstością MIXED_HIGH) zawsze zalicza
          const play = inst.spot.groups[0]!.freqs.map((_, h) => inst.spot.groups.reduce((s, g) => s + g.freqs[h]!, 0));
          expect(gradeAnswer(inst, { kind: 'paint', painted: play.map((p) => p >= MIXED_HIGH) })).toBe('correct');
        }
      }
    }
  });

  it('zakresy otwarć (M3) mają listę klas niepewnych i te klasy nie trafiają do zadań z decyzją', () => {
    for (const id of ['rfi.utg', 'rfi.hj', 'rfi.co', 'rfi.btn', 'rfi.sb']) expect(ranges.get(id)!.uncertain!.length).toBeGreaterThan(0);
    const m3 = rows.filter((r) => r.moduleId === 'm3' && (JSON.parse(r.data) as Drill).kind === 'generated');
    expect(m3.length).toBeGreaterThan(0);
    for (const r of m3) {
      for (const inst of instantiate(JSON.parse(r.data) as Drill, r.lessonId, createRng(5), 20, ctx)) {
        if (inst.kind !== 'choice' || !inst.table?.hand) continue;
        const spot = [...ranges.values()].find((s) => s.title === inst.prompt)!;
        const hc = classOf(parseCard(inst.table.hand[0]!), parseCard(inst.table.hand[1]!));
        expect(spot.uncertain).not.toContain(hc);
      }
    }
  });

  it('egzamin każdego modułu ma pełną długość', () => {
    const modules = [...new Set(rows.map((r) => r.moduleId))];
    for (const m of modules) {
      const ord = rows.find((r) => r.moduleId === m)!.ord;
      const exam = buildExamSession(rows.filter((r) => r.moduleId === m).map(toRow), rows.filter((r) => r.ord < ord).map(toRow), createRng(3), ctx);
      expect(exam).toHaveLength(EXAM_SIZE);
    }
  });
});
