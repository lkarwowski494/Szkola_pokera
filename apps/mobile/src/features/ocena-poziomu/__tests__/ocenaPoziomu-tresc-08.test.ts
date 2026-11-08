/// <reference types="jest" />
/// <reference types="node" />
// Strażnik treści oceny poziomu (D-264): pytania z docs/tresci/ocena-poziomu-pytania.md istnieją w puli egzaminów pl,
// należą do wskazanego modułu, są zadaniami z wyborem z dokładnie jedną poprawną odpowiedzią (kryterium roli 06),
// a ich liczba mieści się w OCENA_POZIOMU_MAKS_PYTAN (D-105). Moduł bez pytania (M7) istnieje w ścieżce.
import { KONFIGURACJA } from '@szkola/domena';
import { PYTANIA_OCENY } from '@/features/ocena-poziomu/ocenaPoziomu';
import { sciezkaTresciPl } from '@/test-utils/trescPl';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });

describe('pytania oceny poziomu na treści pl', () => {
  it('liczba pytań ≤ OCENA_POZIOMU_MAKS_PYTAN', () => {
    expect(PYTANIA_OCENY.length).toBeLessThanOrEqual(KONFIGURACJA.OCENA_POZIOMU_MAKS_PYTAN);
  });
  it.each(PYTANIA_OCENY.map((p) => [p.zadanieId, p.modulId]))('%s: moduł %s, wybór z jedną poprawną odpowiedzią', (id, modul) => {
    const w = db.prepare('SELECT module_id AS m, data FROM exam_drills WHERE id = ?').get(id) as { m: string; data: string } | undefined;
    expect(w?.m).toBe(modul);
    const d = JSON.parse(w!.data) as { kind: string; options?: { correct?: boolean }[] };
    expect(d.kind).toBe('choice');
    expect(d.options?.filter((o) => o.correct === true)).toHaveLength(1);
  });
  it('moduły w kolejności ścieżki: pytania rosnąco, M7 bez pytania', () => {
    const moduly = (db.prepare('SELECT id FROM modules ORDER BY ord').all() as { id: string }[]).map((m) => m.id);
    const pozycje = PYTANIA_OCENY.map((p) => moduly.indexOf(p.modulId));
    expect(pozycje.every((x, i) => x >= 0 && (i === 0 || x > pozycje[i - 1]!))).toBe(true);
    expect(moduly).toContain('m7');
  });
});
