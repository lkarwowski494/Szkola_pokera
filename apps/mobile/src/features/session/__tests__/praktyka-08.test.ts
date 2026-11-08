/// <reference types="jest" />
/// <reference types="node" />
// Sesja ćwiczeń z „Dziś” (PR-03, 08 cz. 5b krok 1, D-260): zadania z lekcji ukończonych i następnej lekcji,
// najwyżej SESJA_LICZBA_ZADAN, po 2 z rodziny (jak powtórki), przeplatane; zestaw odtwarzalny z ziarna.
import { type Drill } from '@szkola/content-schema';
import { KONFIGURACJA } from '@szkola/domena';
import { createRng } from '@szkola/poker-core';
import type { DrillRow, RangeSpot } from '@/data/content/repo';
import { buildPracticeSession } from '@/features/session/build';
import { sciezkaTresciPl } from '@/test-utils/trescPl';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DatabaseSync } = require('node:sqlite') as typeof import('node:sqlite');
const db = new DatabaseSync(sciezkaTresciPl(), { readOnly: true });
const wiersze = (lekcje: string[]): DrillRow[] =>
  (db.prepare(`SELECT id, lesson_id AS lessonId, family, data FROM drills WHERE lesson_id IN (${lekcje.map(() => '?').join(',')}) ORDER BY ord`).all(...lekcje) as { id: string; lessonId: string; family: string; data: string }[]).map(
    (r) => ({ id: r.id, lessonId: r.lessonId, family: r.family, drill: JSON.parse(r.data) as Drill }),
  );
const lekcjeM0M1 = (db.prepare("SELECT l.id FROM lessons l JOIN modules m ON m.id = l.module_id WHERE m.ord <= 1 ORDER BY m.ord, l.ord").all() as { id: string }[]).map((r) => r.id);
const ranges = new Map<string, RangeSpot>();
const ctx = { range: (id: string) => ranges.get(id) };

describe('buildPracticeSession', () => {
  it('SESJA_LICZBA_ZADAN = 16 (8 rodzin × 2, jak powtórki; D-260)', () => {
    expect(KONFIGURACJA.SESJA_LICZBA_ZADAN).toBe(16);
  });

  it('wiele rodzin: dokładnie SESJA_LICZBA_ZADAN zadań, tylko z podanych lekcji, najwyżej 2 z rodziny, bez tej samej rodziny dwa razy z rzędu', () => {
    const rows = wiersze(lekcjeM0M1);
    expect(new Set(rows.map((r) => r.family)).size).toBeGreaterThanOrEqual(8);
    const s = buildPracticeSession(rows, createRng(7), ctx);
    expect(s).toHaveLength(KONFIGURACJA.SESJA_LICZBA_ZADAN);
    const lekcje = new Set(lekcjeM0M1);
    for (const it of s) expect(lekcje.has(it.lessonId ?? '')).toBe(true);
    const rodzinaZadania = new Map(rows.map((r) => [r.id, r.family]));
    const rodziny = s.map((it) => rodzinaZadania.get(it.drillId));
    for (const f of new Set(rodziny)) expect(rodziny.filter((x) => x === f).length).toBeLessThanOrEqual(2);
    for (let i = 1; i < rodziny.length; i++) expect(rodziny[i]).not.toBe(rodziny[i - 1]);
  });

  it('jedna lekcja (pierwsze użycie): zadania tylko z niej, nie więcej niż limit; brak wierszy → pusty zestaw', () => {
    const rows = wiersze([lekcjeM0M1[0]!]);
    const s = buildPracticeSession(rows, createRng(1), ctx);
    expect(s.length).toBeGreaterThan(0);
    expect(s.length).toBeLessThanOrEqual(KONFIGURACJA.SESJA_LICZBA_ZADAN);
    for (const it of s) expect(it.lessonId).toBe(lekcjeM0M1[0]);
    expect(buildPracticeSession([], createRng(1), ctx)).toEqual([]);
  });

  it('to samo ziarno → ten sam zestaw (D-248)', () => {
    const rows = wiersze(lekcjeM0M1);
    const klucze = (seed: number) => buildPracticeSession(rows, createRng(seed), ctx).map((d) => d.drillId);
    expect(klucze(3)).toEqual(klucze(3));
  });
});
