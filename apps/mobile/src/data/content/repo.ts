import type { Block, Drill } from '@szkola/content-schema';
import type { SQLiteDatabase } from 'expo-sqlite';

/** Odczyt treści z content-vN.db (tylko do odczytu, ADR-08). */

export interface ModuleRow {
  id: string;
  ord: number;
  title: string;
  sub: string;
  phase: 'mvp' | 'f2' | 'f3' | 'f4';
  recommended: boolean;
}

export interface LessonSummary {
  id: string;
  moduleId: string;
  ord: number;
  title: string;
  sub: string;
  drillCount: number;
}

export interface Lesson extends LessonSummary {
  rules: string[];
  body: Block[];
}

export interface DrillRow {
  id: string;
  lessonId: string;
  family: string;
  drill: Drill;
}

export interface RuleRow {
  id: string;
  moduleId: string;
  level: 'rules' | 'math' | 'gto' | 'heuristic' | 'exploit';
  ifText: string;
  thenText: string;
  because: string;
  source: string;
  population: string | null;
}

export function getModules(db: SQLiteDatabase): ModuleRow[] {
  return db
    .getAllSync<{ id: string; ord: number; title: string; sub: string; phase: ModuleRow['phase']; recommended: number }>(
      'SELECT id, ord, title, sub, phase, recommended FROM modules ORDER BY ord',
    )
    .map((r) => ({ ...r, recommended: r.recommended === 1 }));
}

export function getLessonSummaries(db: SQLiteDatabase): LessonSummary[] {
  return db.getAllSync<LessonSummary>(
    `SELECT l.id, l.module_id AS moduleId, l.ord, l.title, l.sub,
            (SELECT COUNT(*) FROM drills d WHERE d.lesson_id = l.id) AS drillCount
       FROM lessons l JOIN modules m ON m.id = l.module_id
      ORDER BY m.ord, l.ord`,
  );
}

export function getLesson(db: SQLiteDatabase, id: string): Lesson | null {
  const row = db.getFirstSync<{ id: string; moduleId: string; ord: number; title: string; sub: string; rules: string; body: string; drillCount: number }>(
    `SELECT l.id, l.module_id AS moduleId, l.ord, l.title, l.sub, l.rules, l.body,
            (SELECT COUNT(*) FROM drills d WHERE d.lesson_id = l.id) AS drillCount
       FROM lessons l WHERE l.id = ?`,
    id,
  );
  if (!row) return null;
  return { ...row, rules: JSON.parse(row.rules) as string[], body: JSON.parse(row.body) as Block[] };
}

function toDrill(r: { id: string; lessonId: string; family: string; data: string }): DrillRow {
  return { id: r.id, lessonId: r.lessonId, family: r.family, drill: JSON.parse(r.data) as Drill };
}

export function getLessonDrills(db: SQLiteDatabase, lessonId: string): DrillRow[] {
  return db
    .getAllSync<{ id: string; lessonId: string; family: string; data: string }>(
      'SELECT id, lesson_id AS lessonId, family, data FROM drills WHERE lesson_id = ? ORDER BY ord',
      lessonId,
    )
    .map(toDrill);
}

export function getDrillsForFamilies(db: SQLiteDatabase, families: readonly string[]): DrillRow[] {
  if (families.length === 0) return [];
  const marks = families.map(() => '?').join(',');
  return db
    .getAllSync<{ id: string; lessonId: string; family: string; data: string }>(
      `SELECT id, lesson_id AS lessonId, family, data FROM drills WHERE family IN (${marks})`,
      ...families,
    )
    .map(toDrill);
}

/** Wszystkie zadania modułu (do egzaminu). */
export function getModuleDrills(db: SQLiteDatabase, moduleId: string): DrillRow[] {
  return db
    .getAllSync<{ id: string; lessonId: string; family: string; data: string }>(
      `SELECT d.id, d.lesson_id AS lessonId, d.family, d.data
         FROM drills d JOIN lessons l ON l.id = d.lesson_id
        WHERE l.module_id = ? ORDER BY l.ord, d.ord`,
      moduleId,
    )
    .map(toDrill);
}

/** Zadania ze wszystkich modułów wcześniejszych niż dany (część egzaminu z powtórką starszego materiału). */
export function getDrillsBeforeModule(db: SQLiteDatabase, moduleId: string): DrillRow[] {
  return db
    .getAllSync<{ id: string; lessonId: string; family: string; data: string }>(
      `SELECT d.id, d.lesson_id AS lessonId, d.family, d.data
         FROM drills d JOIN lessons l ON l.id = d.lesson_id JOIN modules m ON m.id = l.module_id
        WHERE m.ord < (SELECT ord FROM modules WHERE id = ?) ORDER BY m.ord, l.ord, d.ord`,
      moduleId,
    )
    .map(toDrill);
}

export function getRules(db: SQLiteDatabase): RuleRow[] {
  return db.getAllSync<RuleRow>(
    `SELECT r.id, r.module_id AS moduleId, r.level, r.if_text AS ifText, r.then_text AS thenText, r.because, r.source, r.population
       FROM rules r JOIN modules m ON m.id = r.module_id ORDER BY m.ord, r.id`,
  );
}

export function getRulesByIds(db: SQLiteDatabase, ids: readonly string[]): RuleRow[] {
  const set = new Set(ids);
  return getRules(db).filter((r) => set.has(r.id));
}

export function getContentHash(db: SQLiteDatabase): string {
  return db.getFirstSync<{ value: string }>("SELECT value FROM meta WHERE key = 'hash'")?.value ?? '?';
}

/** Mapa rodzina → tytuł lekcji (do czytelnych nazw w statystykach). */
export function getFamilyLabels(db: SQLiteDatabase): Map<string, string> {
  const rows = db.getAllSync<{ family: string; title: string }>(
    'SELECT DISTINCT d.family, l.title FROM drills d JOIN lessons l ON l.id = d.lesson_id',
  );
  const out = new Map<string, string>();
  for (const r of rows) if (!out.has(r.family)) out.set(r.family, r.title);
  return out;
}

export interface RangeSpot {
  id: string;
  title: string;
  hero: string;
  path: string;
  playPercent: number;
  groups: { name: string; freqs: number[]; wrongSizes?: { text: string; why: string }[] }[];
}

export function getRangeSpot(db: SQLiteDatabase, id: string): RangeSpot | null {
  const r = db.getFirstSync<{ id: string; title: string; hero: string; path: string; play_percent: number; groups: string }>(
    'SELECT id, title, hero, path, play_percent, groups FROM ranges WHERE id = ?',
    id,
  );
  if (!r) return null;
  return { id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups) };
}

export function getAllRangeSpots(db: SQLiteDatabase): Map<string, RangeSpot> {
  const rows = db.getAllSync<{ id: string; title: string; hero: string; path: string; play_percent: number; groups: string }>(
    'SELECT id, title, hero, path, play_percent, groups FROM ranges',
  );
  return new Map(rows.map((r) => [r.id, { id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups) }]));
}
