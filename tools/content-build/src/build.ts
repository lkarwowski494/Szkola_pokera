import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { parse as parseYaml } from 'yaml';
import {
  CONTENT_SCHEMA_VERSION,
  LessonFrontmatter,
  AreasFile,
  ModulesFile,
  NumbersFile,
  RulesFile,
  TermArea,
  TermsFile,
  termNeedsEnglish,
  type Block,
  type CompiledTerm,
  type AreaDef,
  type CompiledEvalRule,
  type CompiledRangeSpot,
  type Drill,
  type ModuleDef,
  type RuleDef,
} from '@szkola/content-schema';
import { classifyFlop, FULL_DECK, HUD_PARAMS, hudThresholdsFromParams, parseCards, textureMatches, type TextureFilter } from '@szkola/poker-core';
import { compileMarkdown } from './markdown';
import { compileHandRanking, compileRanges } from './ranges';
import { findHardcodedNumbers, resolveNumbers, substitute, type ResolvedNumber } from './numbers';
import { loadTerms } from './terms';

/** Ile różnych terminów (z nazwą angielską inną niż polska albo ze skrótem) musi mieć obszar ćwiczenia słownictwa. */
export const VOCAB_MIN_TERMS = 4;

/** Terminy, o które może pytać ćwiczenie słownictwa: polska nazwa różna od angielskiej albo skrót. */
export function vocabEligible(t: Pick<CompiledTerm, 'pl' | 'en' | 'abbr'>): boolean {
  return termNeedsEnglish(t) || !!t.abbr;
}

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
  /** Reguły z warunkiem sprawdzalnym w trybie gry M13 (pole check w rules.yaml). */
  evalRules: CompiledEvalRule[];
  /** Ranking 169 klas od najsilniejszej (equity wobec losowej ręki); dla botów trybu gry M13. */
  handRanking: string[];
  /** Obszary trybu gry (areas.yaml). */
  areas: AreaDef[];
  terms: (CompiledTerm & { forms?: string[]; skip?: string[] })[];
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
  const terms = loadTerms(parseOrThrow(TermsFile, readYaml(join(contentDir, 'terms.yaml')), 'terms.yaml'));
  const termErrors: string[] = [];
  /**
   * Jedna jednostka tekstu: liczby {{n:…}}, potem terminy {{t:…}}. `seen` łączy pola tej samej jednostki (reguła).
   * `checkTerms: false` tylko dla tytułów (nazwy w nawigacji, decyzja T-03).
   */
  const sub = (text: string, where: string, seen: Set<string> = new Set(), checkTerms = true, checkNumbers = true) => {
    // liczby z % lub bb wpisane ręcznie wykrywamy też w zadaniach i regułach, nie tylko w tekście lekcji
    const hard = findHardcodedNumbers(text);
    if (hard.length && checkNumbers) warnings.push(`${where}: liczby wpisane ręcznie (użyj {{n:…}}): ${hard.join(', ')}`);
    if (checkTerms) {
      // bloki ```formula i ```range nie są zdaniami: wzory zostają bez nawiasów
      const raw = terms.unmarked(text.replace(/```[\s\S]*?```/g, ''));
      if (raw.length) termErrors.push(`${where}: termin bez znacznika: ${raw.map((m) => `„${m.form}” → {{t:${m.key}|${m.form}}}`).join(', ')}`);
    }
    const out = terms.render(substitute(text, numbers, where, used), where, seen);
    // nawias z nazwą angielską tuż przed nawiasem z treści daje „(…) (…)”: przeredaguj zdanie
    if (/\)\s\(/.test(out) && /\{\{t:/.test(text)) warnings.push(`${where}: dwa nawiasy obok siebie: ${out.match(/[^\s]+ \([^)]*\) \([^)]*\)/)?.[0] ?? ''}`);
    return out;
  };
  for (const r of ranges) {
    // tytuł spotu i nazwy grup to treść zadań (prompt i odpowiedzi); rozmiary w nich są etykietami ścieżki solvera
    r.title = sub(r.title, r.id, undefined, true, false);
    for (const g of r.groups) {
      g.name = sub(g.name, r.id, undefined, true, false);
      if (g.wrongSizes) g.wrongSizes = g.wrongSizes.map((w) => ({ text: sub(w.text, r.id), why: sub(w.why, r.id) }));
    }
  }

  const localeDir = join(contentDir, locale);
  const modules = parseOrThrow(ModulesFile, readYaml(join(localeDir, 'modules.yaml')), 'modules.yaml').map((m) => ({
    ...m,
    title: sub(m.title, m.id, undefined, false),
    sub: sub(m.sub, m.id, undefined, false),
  }));
  const moduleIds = new Set(modules.map((m) => m.id));
  if (moduleIds.size !== modules.length) throw new Error('modules.yaml: powtórzony identyfikator modułu');

  const rulesRaw = parseOrThrow(RulesFile, readYaml(join(localeDir, 'rules.yaml')), 'rules.yaml');
  const rules = rulesRaw.map((r) => {
    // reguła to jedna jednostka tekstu („Jeśli …, to …, bo …”): nazwa angielska przy pierwszym użyciu
    const seen = new Set<string>();
    return { ...r, if: sub(r.if, r.id, seen), then: sub(r.then, r.id, seen), because: sub(r.because, r.id, seen) };
  });
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

      const drills = lesson.drills.map((drill) => {
        let d = drill;
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
          // „n:klucz” w parametrach → wartość z numbers.yaml (progi generatora z jednego źródła prawdy)
          const params = Object.fromEntries(
            Object.entries(d.params).map(([k, v]) => {
              if (typeof v !== 'string' || !v.startsWith('n:')) return [k, v];
              const key = v.slice(2);
              const n = numbers.get(key);
              if (!n) throw new Error(`zadanie ${d.id}: params.${k}: nieznana liczba ${key}`);
              used.add(key);
              return [k, n.value];
            }),
          );
          d = { ...d, params };
          if (d.generator === 'playerType') {
            for (const k of HUD_PARAMS) if (!(k in d.params)) throw new Error(`zadanie ${d.id}: playerType wymaga params.${k} (n:klucz)`);
            hudThresholdsFromParams(d.params);
          }
          if ((d.generator === 'outs' || d.generator === 'drawCall') && d.params.street !== undefined && d.params.street !== 'flop' && d.params.street !== 'turn') {
            throw new Error(`zadanie ${d.id}: params.street to flop albo turn`);
          }
          if (d.generator === 'icm' && d.params.mode !== 'call' && d.params.mode !== 'equity') {
            throw new Error(`zadanie ${d.id}: generator icm wymaga params.mode = call albo equity`);
          }
          if (d.generator === 'vocab') {
            const area = TermArea.safeParse(d.params.area);
            if (!area.success) throw new Error(`zadanie ${d.id}: vocab wymaga params.area (${TermArea.options.join(', ')})`);
            const n = terms.compiled.filter((t) => t.area === area.data && vocabEligible(t)).length;
            if (n < VOCAB_MIN_TERMS) throw new Error(`zadanie ${d.id}: obszar ${area.data} ma ${n} terminów do ćwiczenia (minimum ${VOCAB_MIN_TERMS})`);
            const dir = d.params.dir ?? 'both';
            if (dir !== 'both' && dir !== 'pl-en' && dir !== 'en-pl') throw new Error(`zadanie ${d.id}: params.dir to pl-en, en-pl albo both`);
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

      // sekcja lekcji (od nagłówka „## ” do następnego) to jedna jednostka tekstu dla nawiasów z nazwą angielską
      const sections = body.split(/(?=^## )/m);
      const compiledBody = compileMarkdown(sections.map((sec, i) => sub(sec, `${where} §${i}`)).join(''));
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
        title: sub(lesson.title, where, undefined, false),
        sub: sub(lesson.sub, where, undefined, false),
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
  const areasPath = join(localeDir, 'areas.yaml');
  const areas: AreaDef[] = existsSync(areasPath) ? parseOrThrow(AreasFile, readYaml(areasPath), 'areas.yaml') : [];
  const evalRules = compileEvalRules(rulesRaw, lessons, modules, rangeIds, (key, where) => {
    const n = numbers.get(key);
    if (!n) throw new Error(`${where}: nieznana liczba ${key}`);
    used.add(key);
    return n.value;
  });
  // liczby użyte pośrednio (przez refs innych liczb) też są w użyciu
  const stack = [...used];
  while (stack.length) {
    const k = stack.pop()!;
    for (const r of numbers.get(k)?.entry.refs ?? []) if (!used.has(r)) {
      used.add(r);
      stack.push(r);
    }
  }
  const checked = new Set(evalRules.map((r) => r.id));
  const areaModules = new Set<string>();
  for (const a of areas) {
    if (!moduleIds.has(a.module)) throw new Error(`areas.yaml: nieznany moduł ${a.module}`);
    if (areaModules.has(a.module)) throw new Error(`areas.yaml: powtórzony obszar ${a.module}`);
    areaModules.add(a.module);
    for (const r of a.rules) if (!checked.has(r)) throw new Error(`areas.yaml: obszar ${a.module}: reguła ${r} nie ma pola check`);
  }
  for (const key of numbers.keys()) if (!used.has(key)) warnings.push(`liczba ${key} nie jest nigdzie używana`);
  if (termErrors.length) {
    const shown = termErrors.slice(0, 40);
    throw new Error(
      `Terminy bez znacznika {{t:…}} (${termErrors.length} miejsc; decyzja T-02, content/terms.yaml):\n${shown.map((e) => `  - ${e}`).join('\n')}` +
        (termErrors.length > shown.length ? `\n  … i ${termErrors.length - shown.length} więcej` : ''),
    );
  }

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

  const { ranking: handRanking } = compileHandRanking(join(contentDir, '..', 'tools', 'equity', 'equity169.json'));
  const payload = { schemaVersion: CONTENT_SCHEMA_VERSION, locale, modules, lessons, rules, numbers: numbersOut, ranges, evalRules, handRanking, areas, terms: terms.compiled };
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

/** Pliki content-v*.db innej wersji schematu niż aktualna (pozostałości po zmianie CONTENT_SCHEMA_VERSION). */
export function staleContentDbs(outDir: string): string[] {
  if (!existsSync(outDir)) return [];
  return readdirSync(outDir).filter((f) => /^content-v\d+\.db$/.test(f) && f !== contentDbFileName());
}

export function contentDbFileName(): string {
  return `content-v${CONTENT_SCHEMA_VERSION}.db`;
}

/** Zapisuje treść do pliku SQLite tylko do odczytu w aplikacji (ADR-08). */
export function writeContentDb(content: CompiledContent, outDir: string): string {
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, contentDbFileName());
  if (existsSync(path)) rmSync(path);
  // baza poprzedniej wersji schematu (np. content-v3.db) nie może zostać w paczce obok aktualnej
  for (const f of staleContentDbs(outDir)) rmSync(join(outDir, f));
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
    CREATE TABLE ranges (id TEXT PRIMARY KEY, title TEXT NOT NULL, hero TEXT NOT NULL, path TEXT NOT NULL, play_percent REAL NOT NULL, groups TEXT NOT NULL, uncertain TEXT NOT NULL, solver TEXT NOT NULL, actions TEXT NOT NULL);
    CREATE TABLE game_kit (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE terms (key TEXT PRIMARY KEY, pl TEXT NOT NULL, en TEXT NOT NULL, en_alt TEXT NOT NULL, abbr TEXT, area TEXT NOT NULL, source TEXT NOT NULL);
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
    const ra = db.prepare('INSERT INTO ranges VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const r of content.ranges) {
      ra.run(r.id, r.title, r.hero, r.path, r.playPercent, JSON.stringify(r.groups), JSON.stringify(r.uncertain), r.solver, JSON.stringify(r.actions));
    }
    const kit = db.prepare('INSERT INTO game_kit VALUES (?, ?)');
    kit.run('handRanking', JSON.stringify(content.handRanking));
    kit.run('evalRules', JSON.stringify(content.evalRules));
    kit.run('areas', JSON.stringify(content.areas));
    const te = db.prepare('INSERT INTO terms VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const t of content.terms) te.run(t.key, t.pl, t.en, JSON.stringify(t.enAlt), t.abbr ?? null, t.area, t.source);
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

/**
 * Reguły z polem check (dokument 14, 4.4.3, 6.2 A): sprawdza spójność warunku z treścią (spoty, zadanie c-betu,
 * liczby) i dokłada rodziny zadań, które powołują się na regułę (do kart z błędów i reguły „3 razy”, 5.7).
 */
export function compileEvalRules(
  rules: readonly RuleDef[],
  lessons: readonly CompiledLesson[],
  modules: readonly ModuleDef[],
  rangeIds: ReadonlySet<string>,
  number: (key: string, where: string) => number,
): CompiledEvalRule[] {
  const ord = (l: CompiledLesson) => [modules.findIndex((m) => m.id === l.module), l.order] as const;
  const sorted = [...lessons].sort((a, b) => ord(a)[0] - ord(b)[0] || ord(a)[1] - ord(b)[1]);
  const drills = sorted.flatMap((l) => l.drills);
  const out: CompiledEvalRule[] = [];
  for (const r of rules) {
    if (!r.check) continue;
    const where = `${r.id}.check`;
    const c = r.check;
    if (r.level === 'exploit') throw new Error(`${where}: reguły exploit nie oceniają w wersji 1 (brak populacji botów, dokument 14, 5.5)`);
    const params = Object.fromEntries(
      Object.entries(c.params ?? {}).map(([k, v]) => [k, typeof v === 'string' && v.startsWith('n:') ? number(v.slice(2), `${where}.params.${k}`) : v]),
    );
    for (const id of c.spots ?? []) if (!rangeIds.has(id)) throw new Error(`${where}: nieznany spot ${id}`);
    if (c.kind === 'solver-spot' && !(c.spots ?? []).length) throw new Error(`${where}: solver-spot wymaga spots`);
    let cases: CompiledEvalRule['check']['cases'];
    if (c.kind === 'cbet-case') {
      const d = drills.find((x) => x.id === c.drill);
      if (!d || d.kind !== 'cbet') throw new Error(`${where}: drill musi wskazywać zadanie kind: cbet (jest ${c.drill})`);
      cases = d.cases.map((x) => ({ when: x.when, best: x.best, ...(x.rule ? { rule: x.rule } : {}) }));
      if (!cases.some((x) => x.rule === r.id)) throw new Error(`${where}: zadanie ${c.drill} nie ma przypadku z rule: ${r.id}`);
    }
    const need: Partial<Record<string, string[]>> = {
      'open-size': ['open', 'openSb'],
      'three-bet-size': ['mult', 'position'],
      'iso-size': ['base', 'perLimper', 'oopExtra'],
      'implied-odds': ['sprMin'],
    };
    for (const k of need[c.kind] ?? []) if (!(k in params)) throw new Error(`${where}: ${c.kind} wymaga params.${k}`);
    // rodziny zadań z tą regułą; dla spotów solvera także zadania z tych spotów (rangeDecision, malowanie)
    const usesSpot = (d: (typeof drills)[number]) =>
      (d.kind === 'paint' && (c.spots ?? []).includes(d.spot)) ||
      (d.kind === 'generated' && d.generator === 'rangeDecision' && String(d.params.spots ?? '').split(',').some((x) => (c.spots ?? []).includes(x.trim())));
    const families = [...new Set([...drills.filter((d) => d.rules.includes(r.id)), ...drills.filter(usesSpot)].map((d) => d.family))];
    const { params: _p, ...rest } = c;
    void _p;
    out.push({ id: r.id, module: r.module, level: r.level, check: { ...rest, params, ...(cases ? { cases } : {}) }, families });
  }
  return out;
}
