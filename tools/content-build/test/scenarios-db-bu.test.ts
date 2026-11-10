// KO-050: szablony scenariuszy w bazie treści: tabela scenarios (id, module_id → modules, ord, data = JSON szablonu po obróbce).
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { compileContent, writeContentDb } from '../src/build';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');

describe('tabela scenarios w bazie treści (KO-050)', () => {
  it('jeden wiersz na szablon, data = JSON szablonu z compileContent, klucz obcy do modules', () => {
    const c = compileContent(contentDir, 'pl', { kontrolaGeneratora: false });
    expect((c.scenarios ?? []).length).toBeGreaterThan(0);
    const dir = mkdtempSync(join(tmpdir(), 'scen-db-'));
    try {
      const db = new DatabaseSync(writeContentDb(c, dir), { readOnly: true });
      const kol = db.prepare('PRAGMA table_info(scenarios)').all() as { name: string; type: string; pk: number; notnull: number }[];
      expect(kol.map((k) => `${k.name}:${k.type}`)).toEqual(['id:TEXT', 'module_id:TEXT', 'ord:INTEGER', 'data:TEXT']);
      expect(kol.find((k) => k.name === 'id')!.pk).toBe(1);
      const wiersze = db.prepare('SELECT id, module_id, ord, data FROM scenarios ORDER BY ord').all() as { id: string; module_id: string; ord: number; data: string }[];
      expect(wiersze.map((w) => w.id)).toEqual((c.scenarios ?? []).map((s) => s.id));
      wiersze.forEach((w, i) => {
        expect(w.ord).toBe(i);
        expect(JSON.parse(w.data)).toEqual(JSON.parse(JSON.stringify(c.scenarios![i])));
        expect(JSON.parse(w.data).id).toBe(w.id);
        expect(w.module_id).toBe(c.scenarios![i]!.module);
      });
      expect(db.prepare('PRAGMA foreign_key_check').all()).toEqual([]);
      db.close();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 120_000);
});
