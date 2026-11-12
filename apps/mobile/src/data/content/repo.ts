import { GeneratorEquity169, GeneratorEvalRules, GeneratorRangeActions, GeneratorUncertain, ScenarioTemplate, type Block, type Drill, type RuleSourceSummary } from '@szkola/content-schema';
import { buildGeneratorContext, type GeneratorContext, type RangeSpotData } from '@szkola/poker-core';
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
  /** Lekcja zadania; null dla zadań z puli egzaminacyjnej (tabela exam_drills, poza lekcjami). */
  lessonId: string | null;
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
  /** Rodzaj i liczba niezależnych źródeł; pełny opis źródła zostaje w repozytorium (content/pl/rules.yaml). */
  sources: RuleSourceSummary[];
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

function toDrill(r: { id: string; lessonId: string | null; family: string; data: string }): DrillRow {
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

/** Zadanie po id z lekcji albo z puli egzaminacyjnej (odtworzenie zestawu z planu aktywności, D-248). */
export function getDrillById(db: SQLiteDatabase, id: string): DrillRow | undefined {
  const r = db.getFirstSync<{ id: string; lessonId: string | null; family: string; data: string }>(
    `SELECT id, lesson_id AS lessonId, family, data FROM drills WHERE id = ?
     UNION ALL SELECT id, NULL AS lessonId, family, data FROM exam_drills WHERE id = ? LIMIT 1`,
    id, id,
  );
  return r ? toDrill(r) : undefined;
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

/** Pula egzaminacyjna modułu (zadania tylko do egzaminu, nie ma ich w lekcjach). */
export function getExamDrills(db: SQLiteDatabase, moduleId: string): DrillRow[] {
  return db
    .getAllSync<{ id: string; lessonId: null; family: string; data: string }>(
      'SELECT id, NULL AS lessonId, family, data FROM exam_drills WHERE module_id = ? ORDER BY ord',
      moduleId,
    )
    .map(toDrill);
}

/** Pule egzaminacyjne modułów wcześniejszych niż dany (część egzaminu ze starszego materiału). */
export function getExamDrillsBeforeModule(db: SQLiteDatabase, moduleId: string): DrillRow[] {
  return db
    .getAllSync<{ id: string; lessonId: null; family: string; data: string }>(
      `SELECT e.id, NULL AS lessonId, e.family, e.data
         FROM exam_drills e JOIN modules m ON m.id = e.module_id
        WHERE m.ord < (SELECT ord FROM modules WHERE id = ?) ORDER BY m.ord, e.ord`,
      moduleId,
    )
    .map(toDrill);
}

/**
 * Zadania z puli egzaminacyjnej z danych rodzin, ale tylko te, które użytkownik już widział na egzaminie
 * (`seen`): do powtórek trafiają dopiero po pierwszym egzaminie.
 */
export function getSeenExamDrillsForFamilies(db: SQLiteDatabase, families: readonly string[], seen: ReadonlySet<string>): DrillRow[] {
  if (families.length === 0 || seen.size === 0) return [];
  const marks = families.map(() => '?').join(',');
  return db
    .getAllSync<{ id: string; lessonId: null; family: string; data: string }>(
      `SELECT id, NULL AS lessonId, family, data FROM exam_drills WHERE family IN (${marks})`,
      ...families,
    )
    .filter((r) => seen.has(r.id))
    .map(toDrill);
}

export function getRules(db: SQLiteDatabase): RuleRow[] {
  return db
    .getAllSync<Omit<RuleRow, 'sources'> & { sources: string }>(
      `SELECT r.id, r.module_id AS moduleId, r.level, r.if_text AS ifText, r.then_text AS thenText, r.because, r.sources, r.population
         FROM rules r JOIN modules m ON m.id = r.module_id ORDER BY m.ord, r.id`,
    )
    .map((r) => ({ ...r, sources: JSON.parse(r.sources) as RuleSourceSummary[] }));
}

export function getRulesByIds(db: SQLiteDatabase, ids: readonly string[]): RuleRow[] {
  const set = new Set(ids);
  return getRules(db).filter((r) => set.has(r.id));
}

export function getContentHash(db: SQLiteDatabase): string {
  return db.getFirstSync<{ value: string }>("SELECT value FROM meta WHERE key = 'hash'")?.value ?? '?';
}

/** Każde zadanie z modułem (do obszarów wskaźnika zaawansowania). */
export function getFamilyModules(db: SQLiteDatabase): { family: string; moduleId: string; moduleOrd: number }[] {
  return db.getAllSync<{ family: string; moduleId: string; moduleOrd: number }>(
    `SELECT DISTINCT d.family, m.id AS moduleId, m.ord AS moduleOrd
       FROM drills d JOIN lessons l ON l.id = d.lesson_id JOIN modules m ON m.id = l.module_id`,
  );
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
  /** Klasy niepewne (solver odbiega od publicznych tabel): bez zadań rangeDecision i poza wynikiem malowania. */
  uncertain?: readonly string[];
}

type RangeRow = { id: string; title: string; hero: string; path: string; play_percent: number; groups: string; uncertain: string };
const RANGE_COLUMNS = 'id, title, hero, path, play_percent, groups, uncertain';

function rangeFromRow(r: RangeRow): RangeSpot {
  return { id: r.id, title: r.title, hero: r.hero, path: r.path, playPercent: r.play_percent, groups: JSON.parse(r.groups), uncertain: JSON.parse(r.uncertain) };
}

export function getRangeSpot(db: SQLiteDatabase, id: string): RangeSpot | null {
  const r = db.getFirstSync<RangeRow>(`SELECT ${RANGE_COLUMNS} FROM ranges WHERE id = ?`, id);
  return r ? rangeFromRow(r) : null;
}

export function getAllRangeSpots(db: SQLiteDatabase): Map<string, RangeSpot> {
  const rows = db.getAllSync<RangeRow>(`SELECT ${RANGE_COLUMNS} FROM ranges`);
  return new Map(rows.map((r) => [r.id, rangeFromRow(r)]));
}

/** Pierwsza lekcja (w kolejności kursu), która uczy danej reguły: do odnośnika z raportu gry. */
export function getRuleLessons(db: SQLiteDatabase): Map<string, string> {
  const rows = db.getAllSync<{ id: string; rules: string }>(
    'SELECT l.id, l.rules FROM lessons l JOIN modules m ON m.id = l.module_id ORDER BY m.ord, l.ord',
  );
  const out = new Map<string, string>();
  for (const r of rows) for (const rule of JSON.parse(r.rules) as string[]) if (!out.has(rule)) out.set(rule, r.id);
  return out;
}

/**
 * Szablony scenariuszy (BR-SZB-001) z tabeli `scenarios` (id, module_id, ord, data = JSON szablonu po budowaniu treści).
 * Baza bez tabeli (treść bez scenariuszy) daje pustą listę; wiersz niezgodny ze schematem to błąd treści (wyjątek, nie ciche
 * pominięcie): ekran pokazuje wtedy błąd odczytu zamiast zaniżonej listy.
 */
export function getScenarioTemplates(db: Pick<SQLiteDatabase, 'getAllSync'>): ScenarioTemplate[] {
  const jest = db.getAllSync<{ n: number }>("SELECT count(*) AS n FROM sqlite_master WHERE type = 'table' AND name = 'scenarios'");
  if ((jest[0]?.n ?? 0) === 0) return [];
  return db.getAllSync<{ id: string; data: string }>('SELECT s.id AS id, s.data AS data FROM scenarios s JOIN modules m ON m.id = s.module_id ORDER BY m.ord, s.ord, s.id').map((r) => {
    const t = ScenarioTemplate.safeParse(JSON.parse(r.data));
    if (!t.success || t.data.id !== r.id) throw new Error(`Szablon scenariusza ${r.id} niezgodny ze schematem`);
    return t.data;
  });
}

/** Wiersz bazy treści niezgodny ze schematem (uszkodzony JSON albo inny kształt); `pole` to `tabela.kolumna` albo `game_kit.klucz`. */
export class BladOdczytuTresci extends Error {
  constructor(readonly pole: string) {
    super(`Baza treści: pole ${pole} niezgodne ze schematem`);
    this.name = 'BladOdczytuTresci';
  }
}

/**
 * Kontekst generatora dla szablonów z punktami range-spot, cbet-case, size-spot, icm-call i defend (FG: zakres obrony; CN D-780, 08-programista-001 CM): spoty
 * (`ranges`), progi (`numbers`), reguły oceny i macierz equity (`game_kit`) składa ta sama funkcja co kontrola w budowaniu treści
 * (`buildGeneratorContext`), więc ekran losuje te same warianty co kontrola. `undefined`, gdy szablon go nie potrzebuje (sama linia
 * draw-call) albo bazie brakuje progów: generator odmawia wtedy punktu wymagającego danych (TemplateError), bez zgadywanych wartości.
 */
export function getKontekstGeneratora(db: Pick<SQLiteDatabase, 'getAllSync' | 'getFirstSync'>, szablon: ScenarioTemplate): GeneratorContext | undefined {
  if (!szablon.decisions.some((d) => d.kind === 'range-spot' || d.kind === 'cbet-case' || d.kind === 'size-spot' || d.kind === 'icm-call' || d.kind === 'defend')) return undefined;
  const liczba = (key: string): number | null => db.getFirstSync<{ value: number }>('SELECT value FROM numbers WHERE key = ?', key)?.value ?? null;
  const mixedMin = liczba('range.mixed.min');
  const mixedLow = liczba('range.mixed.low');
  if (mixedMin === null || mixedLow === null) return undefined;
  // Wiersze z bazy treści parsowane schematem (CR NIS-005): uszkodzony JSON albo inny kształt to `BladOdczytuTresci` z nazwą pola,
  // a nie wyjątek w środku generatora ani cicho zły kontekst.
  const parsuj = <T,>(pole: string, tekst: string, schemat: { safeParse: (v: unknown) => { success: true; data: T } | { success: false } }): T => {
    let surowy: unknown;
    try {
      surowy = JSON.parse(tekst);
    } catch {
      throw new BladOdczytuTresci(pole);
    }
    const w = schemat.safeParse(surowy);
    if (!w.success) throw new BladOdczytuTresci(pole);
    return w.data;
  };
  const kit = <T,>(key: string, schemat: { safeParse: (v: unknown) => { success: true; data: T } | { success: false } }): T | null => {
    const w = db.getFirstSync<{ value: string }>('SELECT value FROM game_kit WHERE key = ?', key);
    return w ? parsuj(`game_kit.${key}`, w.value, schemat) : null;
  };
  const evalRules = kit('evalRules', GeneratorEvalRules);
  if (evalRules === null) return undefined;
  const spots = db.getAllSync<{ id: string; actions: string; uncertain: string }>('SELECT id, actions, uncertain FROM ranges').map((r): RangeSpotData => ({
    id: r.id, actions: parsuj('ranges.actions', r.actions, GeneratorRangeActions), uncertain: parsuj('ranges.uncertain', r.uncertain, GeneratorUncertain),
  }));
  const equity169 = kit('equity169', GeneratorEquity169);
  const cbetMaly = liczba('cbet.size.small');
  const cbetDuzy = liczba('cbet.size.big');
  const cbetSizes = cbetMaly !== null && cbetDuzy !== null ? { small: cbetMaly, big: cbetDuzy } : undefined; // D-888: do zdania „Liczby”, bez wpływu na losowanie
  return buildGeneratorContext({ spots, thresholds: { mixedMin, mixedLow }, evalRules, ...(equity169 ? { equity169 } : {}), cbetSizes });
}
