/// <reference types="jest" />
/// <reference types="node" />
/**
 * Obszary wskaźnika zaawansowania na prawdziwej treści: każda rodzina zadań należy do dokładnie jednego obszaru,
 * obszary to moduły kursu w ich kolejności.
 */
import { CONTENT_SCHEMA_VERSION } from '@szkola/content-schema';
import { computeAdvancement } from '@szkola/srs';
import { join } from 'node:path';
import { buildAreas, type FamilyModuleRow } from '../areas';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');

const db = new DatabaseSync(join(__dirname, `../../../../assets/content/content-v${CONTENT_SCHEMA_VERSION}.db`), { readOnly: true });
const modules = (db.prepare('SELECT id, ord, recommended FROM modules').all() as { id: string; ord: number; recommended: number }[]).map((m) => ({
  id: m.id,
  ord: m.ord,
  recommended: m.recommended === 1,
}));
const rows = db
  .prepare(
    `SELECT DISTINCT d.family, m.id AS moduleId, m.ord AS moduleOrd
       FROM drills d JOIN lessons l ON l.id = d.lesson_id JOIN modules m ON m.id = l.module_id`,
  )
  .all() as unknown as FamilyModuleRow[];
const families = new Set(rows.map((r) => r.family));

describe('obszary wskaźnika zaawansowania', () => {
  const areas = buildAreas(modules, rows);

  it('jeden obszar na moduł, w kolejności kursu', () => {
    expect(areas.map((a) => a.id)).toEqual([...modules].sort((a, b) => a.ord - b.ord).map((m) => m.id));
  });

  it('każda rodzina zadań w dokładnie jednym obszarze', () => {
    const all = areas.flatMap((a) => a.skills);
    expect(all.length).toBe(families.size);
    expect(new Set(all)).toEqual(families);
  });

  it('rodzina występująca w kilku modułach należy do najwcześniejszego', () => {
    const a = buildAreas(
      [
        { id: 'm2', ord: 2, recommended: true },
        { id: 'm7', ord: 7, recommended: true },
      ],
      [
        { family: 'x', moduleId: 'm7', moduleOrd: 7 },
        { family: 'x', moduleId: 'm2', moduleOrd: 2 },
      ],
    );
    expect(a).toEqual([
      { id: 'm2', skills: ['x'], counted: true },
      { id: 'm7', skills: [], counted: true },
    ]);
  });

  it('bez żadnych odpowiedzi wskaźnik to 0, a moduły bez lekcji nie mają wyniku', () => {
    const r = computeAdvancement(areas, [], Date.UTC(2026, 9, 4));
    expect(r.overall).toBe(0);
    for (const a of r.knowledge.areas) expect(a.score).toBe(a.skills ? 0 : null);
    expect(r.game.status).toBe('pending');
  });
});
