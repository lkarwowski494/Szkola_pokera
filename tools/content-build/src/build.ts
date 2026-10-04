import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { parse as parseYaml } from 'yaml';
import {
  CONTENT_SCHEMA_VERSION,
  LessonFrontmatter,
  ModulesFile,
  NumbersFile,
  RulesFile,
  type Block,
  type CompiledRangeSpot,
  type Drill,
  type ModuleDef,
  type RuleDef,
} from '@szkola/content-schema';
import { classifyFlop, FULL_DECK, parseCards, textureMatches, type TextureFilter } from '@szkola/poker-core';
import { compileMarkdown } from './markdown';
import { compileRanges } from './ranges';
import { findHardcodedNumbers, resolveNumbers, substitute, type ResolvedNumber } from './numbers';

export interface CompiledLesson {
  id: string;
  module: string;
  order: number;
  title: string;
  sub: string;
  rules: string[];
  body: Block[];
  drills: Drill[];
}

export interface CompiledContent {
  schemaVersion: number;
  locale: string;
  modules: ModuleDef[];
  lessons: CompiledLesson[];
  rules: RuleDef[];
  numbers: { key: string; value: number; display: string; source: string; population?: string; note?: string }[];
  ranges: CompiledRangeSpot[];
  hash: string;
  warnings: string[];
}

function readYaml(path: string): unknown {
  return parseYaml(readFileSync(path, 'utf8'));
}

function fmt(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Zamienia błędy Zod na czytelną listę ścieżek. */
function parseOrThrow<T>(schema: { safeParse(v: unknown): { success: true; data: T } | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } } }, value: unknown, where: string): T {
  const r = schema.safeParse(value);
  if (!r.success) {
    const lines = r.error.issues.map((i) => `  - ${i.path.map(String).join('.') || '(root)'}: ${i.message}`);
    throw new Error(`${where}: błąd schematu\n${lines.join('\n')}`);
  }
  return r.data;
}

function splitFrontmatter(src: string, where: string): { fm: unknown; body: string } {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(src);
  if (!m) throw new Error(`${where}: brak nagłówka YAML (---)`);
  return { fm: parseYaml(m[1]!), body: m[2]! };
}

export function compileContent(contentDir: string, locale = 'pl'): CompiledContent {
  const warnings: string[] = [];
  const used = new Set<string>();
  const { spots: ranges } = compileRanges(contentDir);
  const rangeIds = new Set(ranges.map((r) => r.id));
  const numbers = resolveNumbers(
    parseOrThrow(NumbersFile, readYaml(join(contentDir, 'numbers.yaml')), 'numbers.yaml'),
    (id) => ranges.find((r) => r.id === id),
  );
  const sub = (text: string, where: string) => {
    // liczby z % lub bb wpisane ręcznie wykrywamy też w zadaniach i regułach, nie tylko w tekście lekcji
    const hard = findHardcodedNumbers(text);
    if (hard.length) warnings.push(`${where}: liczby wpisane ręcznie (użyj {{n:…}}): ${hard.join(', ')}`);
    return substitute(text, numbers, where, used);
  };
  for (const r of ranges) {
    for (const g of r.groups) {
      if (g.wrongSizes) g.wrongSizes = g.wrongSizes.map((w) => ({ text: sub(w.text, r.id), why: sub(w.why, r.id) }));
    }
  }

  const localeDir = join(contentDir, locale);
  const modules = parseOrThrow(ModulesFile, readYaml(join(localeDir, 'modules.yaml')), 'modules.yaml');
  const moduleIds = new Set(modules.map((m) => m.id));
  if (moduleIds.size !== modules.length) throw new Error('modules.yaml: powtórzony identyfikator modułu');

  const rulesRaw = parseOrThrow(RulesFile, readYaml(join(localeDir, 'rules.yaml')), 'rules.yaml');
  const rules = rulesRaw.map((r) => ({
    ...r,
    if: sub(r.if, r.id),
    then: sub(r.then, r.id),
    because: sub(r.because, r.id),
  }));
  const ruleIds = new Set<string>();
  for (const r of rules) {
    if (ruleIds.has(r.id)) throw new Error(`rules.yaml: powtórzona reguła ${r.id}`);
    if (!moduleIds.has(r.module)) throw new Error(`${r.id}: nieznany moduł ${r.module}`);
    ruleIds.add(r.id);
  }

  const lessonDir = join(localeDir, 'lessons');
  const lessons: CompiledLesson[] = [];
  const lessonIds = new Set<string>();
  const drillIds = new Set<string>();
  for (const file of readdirSync(lessonDir).filter((f) => f.endsWith('.md')).sort()) {
    const where = `lessons/${file}`;
    try {
      const { fm, body } = splitFrontmatter(readFileSync(join(lessonDir, file), 'utf8'), where);
      const lesson = parseOrThrow(LessonFrontmatter, fm, where);
      if (lessonIds.has(lesson.id)) throw new Error(`powtórzona lekcja ${lesson.id}`);
      lessonIds.add(lesson.id);
      if (!moduleIds.has(lesson.module)) throw new Error(`nieznany moduł ${lesson.module}`);
      for (const r of lesson.rules) if (!ruleIds.has(r)) throw new Error(`nieznana reguła ${r}`);

      const drills = lesson.drills.map((d) => {
        if (drillIds.has(d.id)) throw new Error(`powtórzone zadanie ${d.id}`);
        drillIds.add(d.id);
        for (const r of d.rules) if (!ruleIds.has(r)) throw new Error(`zadanie ${d.id}: nieznana reguła ${r}`);
        if (d.kind === 'paint') {
          if (!rangeIds.has(d.spot)) throw new Error(`zadanie ${d.id}: nieznany spot zakresu ${d.spot}`);
          return { ...d, prompt: sub(d.prompt, d.id) };
        }
        if (d.kind === 'numeric') {
          const n = numbers.get(d.answer);
          if (!n) throw new Error(`zadanie ${d.id}: nieznana liczba ${d.answer}`);
          used.add(d.answer);
          if (d.table) parseCards([d.table.hand, d.table.opp, d.table.board].filter(Boolean).join(' '));
          return {
            ...d,
            prompt: sub(d.prompt, d.id),
            explanation: sub(d.explanation, d.id),
            value: n.value,
            unit: n.entry.unit,
            display: n.display,
          };
        }
        if (d.kind === 'texture') {
          if (new Set(d.axes).size !== d.axes.length) throw new Error(`zadanie ${d.id}: powtórzona oś tekstury`);
          return d;
        }
        if (d.kind === 'cbet') {
          checkCbetCases(d.id, d.cases.map((c) => c.when));
          for (const c of d.cases) if (c.rule && !ruleIds.has(c.rule)) throw new Error(`zadanie ${d.id}: nieznana reguła ${c.rule}`);
          return {
            ...d,
            prompt: sub(d.prompt, d.id),
            options: { check: sub(d.options.check, d.id), small: sub(d.options.small, d.id), big: sub(d.options.big, d.id) },
            cases: d.cases.map((c) => ({
              ...c,
              why: { check: sub(c.why.check, d.id), small: sub(c.why.small, d.id), big: sub(c.why.big, d.id) },
            })),
          };
        }
        if (d.kind === 'generated') {
          if ((d.generator === 'outs' || d.generator === 'drawCall') && d.params.street !== undefined && d.params.street !== 'flop' && d.params.street !== 'turn') {
            throw new Error(`zadanie ${d.id}: params.street to flop albo turn`);
          }
          if (d.generator === 'icm' && d.params.mode !== 'call' && d.params.mode !== 'equity') {
            throw new Error(`zadanie ${d.id}: generator icm wymaga params.mode = call albo equity`);
          }
          if (d.generator === 'rangeDecision') {
            const list = String(d.params.spots ?? '').split(',').map((x) => x.trim()).filter(Boolean);
            if (list.length === 0) throw new Error(`zadanie ${d.id}: rangeDecision wymaga params.spots`);
            for (const id of list) if (!rangeIds.has(id)) throw new Error(`zadanie ${d.id}: nieznany spot zakresu ${id}`);
          }
          return d;
        }
        if (d.table) {
          const all = [d.table.hand, d.table.opp, d.table.board].filter(Boolean).join(' ');
          parseCards(all); // rzuca błąd przy powtórzonej karcie
        }
        return {
          ...d,
          prompt: sub(d.prompt, d.id),
          options: d.options.map((o) => ({ ...o, text: sub(o.text, d.id), why: sub(o.why, d.id) })),
        };
      });

      const compiledBody = compileMarkdown(sub(body, where));
      const checkRanges = (bs: Block[]) => {
        for (const b of bs) {
          if (b.t === 'range' && !rangeIds.has(b.spot)) throw new Error(`nieznany spot zakresu ${b.spot}`);
          if (b.t === 'note') checkRanges(b.c);
        }
      };
      checkRanges(compiledBody);
      lessons.push({
        id: lesson.id,
        module: lesson.module,
        order: lesson.order,
        title: lesson.title,
        sub: lesson.sub,
        rules: lesson.rules,
        body: compiledBody,
        drills,
      });
    } catch (e) {
      throw new Error(`${where}: ${fmt(e)}`);
    }
  }

  for (const m of modules) {
    if (!lessons.some((l) => l.module === m.id) && m.phase === 'mvp') warnings.push(`moduł ${m.id} (MVP) nie ma lekcji`);
  }
  // liczby użyte pośrednio (przez refs innych liczb) też są w użyciu
  const stack = [...used];
  while (stack.length) {
    const k = stack.pop()!;
    for (const r of numbers.get(k)?.entry.refs ?? []) if (!used.has(r)) {
      used.add(r);
      stack.push(r);
    }
  }
  for (const key of numbers.keys()) if (!used.has(key)) warnings.push(`liczba ${key} nie jest nigdzie używana`);

  lessons.sort((a, b) => {
    const ma = modules.find((m) => m.id === a.module)!.order;
    const mb = modules.find((m) => m.id === b.module)!.order;
    return ma - mb || a.order - b.order;
  });

  const numbersOut = [...numbers.values()].map((n: ResolvedNumber) => ({
    key: n.key,
    value: n.value,
    display: n.display,
    source: n.entry.source,
    ...(n.entry.population ? { population: n.entry.population } : {}),
    ...(n.entry.note ? { note: n.entry.note } : {}),
  }));

  const payload = { schemaVersion: CONTENT_SCHEMA_VERSION, locale, modules, lessons, rules, numbers: numbersOut, ranges };
  const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
  return { ...payload, hash, warnings };
}

/** Wszystkie 22 100 flopów z teksturą (do sprawdzania przypadków c-betu). */
let allFlops: ReturnType<typeof classifyFlop>[] | null = null;
function flopTextures() {
  if (!allFlops) {
    allFlops = [];
    for (let a = 0; a < 52; a++) for (let b = a + 1; b < 52; b++) for (let c = b + 1; c < 52; c++) allFlops.push(classifyFlop([FULL_DECK[a]!, FULL_DECK[b]!, FULL_DECK[c]!]));
  }
  return allFlops;
}

/** Przypadki zadania c-bet: każdy pasuje do jakiegoś flopu i żaden flop nie pasuje do dwóch naraz. */
export function checkCbetCases(drillId: string, filters: readonly TextureFilter[]): void {
  const hits = filters.map(() => 0);
  for (const t of flopTextures()) {
    const matched = filters.flatMap((f, i) => (textureMatches(t, f) ? [i] : []));
    if (matched.length > 1) throw new Error(`zadanie ${drillId}: przypadki ${matched.map((i) => i + 1).join(' i ')} pasują do tego samego flopu`);
    for (const i of matched) hits[i]!++;
  }
  hits.forEach((n, i) => {
    if (n === 0) throw new Error(`zadanie ${drillId}: przypadek ${i + 1} nie pasuje do żadnego flopu`);
  });
}

export function contentDbFileName(): string {
  return `content-v${CONTENT_SCHEMA_VERSION}.db`;
}

/** Zapisuje treść do pliku SQLite tylko do odczytu w aplikacji (ADR-08). */
export function writeContentDb(content: CompiledContent, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, contentDbFileName());
  if (existsSync(path)) rmSync(path);
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = DELETE;
    CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE modules (id TEXT PRIMARY KEY, ord INTEGER NOT NULL, title TEXT NOT NULL, sub TEXT NOT NULL, phase TEXT NOT NULL, recommended INTEGER NOT NULL);
    CREATE TABLE lessons (id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id), ord INTEGER NOT NULL, title TEXT NOT NULL, sub TEXT NOT NULL, rules TEXT NOT NULL, body TEXT NOT NULL);
    CREATE TABLE drills (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id), ord INTEGER NOT NULL, family TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL);
    CREATE INDEX drills_family ON drills(family);
    CREATE TABLE rules (id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id), level TEXT NOT NULL, if_text TEXT NOT NULL, then_text TEXT NOT NULL, because TEXT NOT NULL, source TEXT NOT NULL, population TEXT);
    CREATE TABLE numbers (key TEXT PRIMARY KEY, value REAL NOT NULL, display TEXT NOT NULL, source TEXT NOT NULL, population TEXT, note TEXT);
    CREATE TABLE ranges (id TEXT PRIMARY KEY, title TEXT NOT NULL, hero TEXT NOT NULL, path TEXT NOT NULL, play_percent REAL NOT NULL, groups TEXT NOT NULL, uncertain TEXT NOT NULL);
  `);
  const tx = (fn: () => void) => {
    db.exec('BEGIN');
    fn();
    db.exec('COMMIT');
  };
  tx(() => {
    const meta = db.prepare('INSERT INTO meta VALUES (?, ?)');
    meta.run('schemaVersion', String(content.schemaVersion));
    meta.run('locale', content.locale);
    meta.run('hash', content.hash);
    const mod = db.prepare('INSERT INTO modules VALUES (?, ?, ?, ?, ?, ?)');
    for (const m of content.modules) mod.run(m.id, m.order, m.title, m.sub, m.phase, m.recommended ? 1 : 0);
    const les = db.prepare('INSERT INTO lessons VALUES (?, ?, ?, ?, ?, ?, ?)');
    const dr = db.prepare('INSERT INTO drills VALUES (?, ?, ?, ?, ?, ?)');
    for (const l of content.lessons) {
      les.run(l.id, l.module, l.order, l.title, l.sub, JSON.stringify(l.rules), JSON.stringify(l.body));
      l.drills.forEach((d, i) => dr.run(d.id, l.id, i, d.family, d.kind, JSON.stringify(d)));
    }
    const ru = db.prepare('INSERT INTO rules VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    for (const r of content.rules) ru.run(r.id, r.module, r.level, r.if, r.then, r.because, r.source, r.population ?? null);
    const nu = db.prepare('INSERT INTO numbers VALUES (?, ?, ?, ?, ?, ?)');
    for (const n of content.numbers) nu.run(n.key, n.value, n.display, n.source, n.population ?? null, n.note ?? null);
    const ra = db.prepare('INSERT INTO ranges VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const r of content.ranges) ra.run(r.id, r.title, r.hero, r.path, r.playPercent, JSON.stringify(r.groups), JSON.stringify(r.uncertain));
  });
  db.exec('VACUUM');
  db.close();
  return path;
}

/** Odczyt hasha z istniejącej bazy (do sprawdzenia w CI, czy baza jest aktualna). */
export function readDbHash(path: string): string | null {
  if (!existsSync(path)) return null;
  const db = new DatabaseSync(path, { readOnly: true });
  const row = db.prepare("SELECT value FROM meta WHERE key = 'hash'").get() as { value: string } | undefined;
  db.close();
  return row?.value ?? null;
}
