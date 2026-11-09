import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { parse as parseYaml } from 'yaml';
import {
  CONTENT_SCHEMA_VERSION,
  ExamFile,
  HelplinesFile,
  LessonFrontmatter,
  AreasFile,
  ModulesFile,
  NumbersFile,
  RulesFile,
  TermArea,
  TermsFile,
  type TermEntry,
  termDefRevealsName,
  termNeedsEnglish,
  summarizeSources,
  type Block,
  type CompiledTerm,
  type AreaDef,
  type CompiledEvalRule,
  type CompiledRangeSpot,
  type Drill,
  type ModuleDef,
  type RuleDef,
} from '@szkola/content-schema';
import { KONFIGURACJA, nazwaPlikuTresci } from '@szkola/domena';
import { JEZYKI, jestJezykiem, lancuchTresci } from '@szkola/jezyki';
import { classifyFlop, FULL_DECK, HUD_PARAMS, hudThresholdsFromParams, parseCards, textureMatches, type TextureFilter } from '@szkola/poker-core';
import { expandHelplines, loadHelplines, type Helplines } from './helplines';
import { compileMarkdown } from './markdown';
import { compileHandRanking, compileRanges } from './ranges';
import { findHardcodedNumbers, PLACEHOLDER, resolveNumbers, substitute, type ResolvedNumber } from './numbers';
import { applyTransitional, loadRegistry, loadTransitional, registryViolations, type RegistryUse } from './registry';
import { checkSourceQuotes } from './sources';
import { loadTerms } from './terms';
import { znacznikiZwyklegoSlowa } from './znaczniki';
import { czytajDefinicje } from './definicje';
import { czytajZNakladka, POLA_HELPLINES } from './nakladka';

/** Ile różnych terminów (z nazwą angielską inną niż polska albo ze skrótem) musi mieć obszar ćwiczenia słownictwa. */
export const VOCAB_MIN_TERMS = 4;

/** Terminy, o które może pytać ćwiczenie słownictwa: polska nazwa różna od angielskiej, skrót albo definicja, która nie zdradza nazwy (kierunek def). */
export function vocabEligible(t: Pick<CompiledTerm, 'pl' | 'en' | 'abbr' | 'def'> & { enAlt?: readonly string[]; forms?: readonly string[] }): boolean {
  return termNeedsEnglish(t) || !!t.abbr || (!!t.def && !termDefRevealsName(t));
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

/** Pula egzaminacyjna modułu (zadania spoza lekcji). */
export interface CompiledExam {
  module: string;
  drills: Drill[];
}

export interface CompiledContent {
  schemaVersion: number;
  locale: string;
  /** Język, z którego pochodzi tekst (łańcuch zastępczy, D-228); `locale` = język bazy i format liczb. */
  tekst: string;
  modules: ModuleDef[];
  lessons: CompiledLesson[];
  exams: CompiledExam[];
  rules: RuleDef[];
  /** Liczby do bazy aplikacji: bez opisów źródeł (zostają w numbers.yaml). */
  numbers: { key: string; value: number; display: string }[];
  ranges: CompiledRangeSpot[];
  /** Reguły z warunkiem sprawdzalnym w trybie gry M13 (pole check w rules.yaml). */
  evalRules: CompiledEvalRule[];
  /** Ranking 169 klas od najsilniejszej (equity wobec losowej ręki); dla botów trybu gry M13. */
  handRanking: string[];
  /** Obszary trybu gry (areas.yaml). */
  areas: AreaDef[];
  terms: (CompiledTerm & { forms?: string[]; skip?: string[] })[];
  /** Telefony pomocy (content/helplines.yaml): do modułu TS ekranu „Pomoc”; w lekcji już rozwinięte. */
  helplines: Helplines;
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

export interface CompileOptions {
  /** Katalog rejestru twierdzeń (rejestr.json, rejestr/bez-twierdzen.json); domyślnie docs/tresci obok katalogu treści. */
  registryDir?: string;
  /** Lista przejściowa strażnika rejestru (registry.ts); domyślnie tools/content-build/rejestr-przejsciowe.json, null = bez listy. */
  transitional?: string | null;
}

export function compileContent(contentDir: string, locale = 'pl', opts: CompileOptions = {}): CompiledContent {
  const warnings: string[] = [];
  /** Użycia liczb, reguł i twierdzeń pomocy w tekście aplikacji: do strażnika rejestru (D-141, registry.ts). */
  const registryUses: RegistryUse[] = [];
  /** Plik treści, którego dotyczą bieżące użycia (względem content/). */
  let fileCtx = 'ranges/spots.yaml';
  const used = new Set<string>();
  if (!jestJezykiem(locale)) throw new Error(`Nieznany język treści "${locale}" (lista: @szkola/jezyki)`);
  // tekst z pierwszego języka łańcucha wariant → język → en → pl, który ma katalog content/<język> (D-228, D-289); liczby zawsze w języku bazy (D-230)
  const tekst = lancuchTresci(locale).find((j) => existsSync(join(contentDir, j)));
  if (tekst === undefined) throw new Error(`Brak katalogu treści dla "${locale}" ani dla języków zastępczych`);
  const { spots: ranges } = compileRanges(contentDir, tekst);
  const rangeIds = new Set(ranges.map((r) => r.id));
  const numbers = resolveNumbers(
    parseOrThrow(NumbersFile, readYaml(join(contentDir, 'numbers.yaml')), 'numbers.yaml'),
    (id) => ranges.find((r) => r.id === id),
    locale,
  );
  const termsFile = parseOrThrow(TermsFile, readYaml(join(contentDir, 'terms.yaml')), 'terms.yaml');
  const terms = loadTerms(termsFile, tekst);
  // D-335: strażnik nakładki definicji języka tekstu (błąd budowy przy niezgodnym pliku); same definicje idą do modułu
  // terminów aplikacji (TERM_DEFS, cli.ts), bo baza treści nie ma kolumny def, a słowniczek czyta terms.generated.ts
  czytajDefinicje(contentDir, tekst, termsFile);
  const termErrors: string[] = [];
  /** Znacznik terminu na zwykłym słowie w tekście polskim (D-376, znaczniki.ts). */
  const misuseErrors: string[] = [];
  const helplinesPlik = czytajZNakladka(contentDir, tekst, 'helplines.yaml', POLA_HELPLINES);
  const helplines = loadHelplines(parseOrThrow(HelplinesFile, helplinesPlik.dane, helplinesPlik.plik));
  const helplinesUsed = { count: 0 };
  for (const e of helplines.entries) registryUses.push({ plik: 'helplines.yaml', gdzie: e.id, id: e.claim });
  registryUses.push({ plik: 'helplines.yaml', gdzie: 'fallback', id: helplines.fallback.claim });
  /**
   * Jedna jednostka tekstu: liczby {{n:…}}, potem terminy {{t:…}}. `seen` łączy pola tej samej jednostki (reguła).
   * `checkTerms: false` tylko dla tytułów (nazwy w nawigacji, decyzja T-03).
   */
  const sub = (text: string, where: string, seen: Set<string> = new Set(), checkTerms = true, checkNumbers = true) => {
    for (const m of text.matchAll(PLACEHOLDER)) registryUses.push({ plik: fileCtx, gdzie: where, id: `n:${m[1]}` });
    // liczby z % lub bb wpisane ręcznie wykrywamy też w zadaniach i regułach, nie tylko w tekście lekcji
    const hard = findHardcodedNumbers(text);
    if (hard.length && checkNumbers) warnings.push(`${where}: liczby wpisane ręcznie (użyj {{n:…}}): ${hard.join(', ')}`);
    if (tekst === 'pl') for (const e of znacznikiZwyklegoSlowa(text)) misuseErrors.push(`${fileCtx} ${where}: ${e}`);
    if (checkTerms) {
      // bloki ```formula i ```range nie są zdaniami: wzory zostają bez nawiasów
      const raw = terms.unmarked(text.replace(/```[\s\S]*?```/g, ''));
      if (raw.length) termErrors.push(`${where}: termin bez znacznika: ${raw.map((m) => `„${m.form}” → {{t:${m.key}|${m.form}}}`).join(', ')}`);
    }
    const out = terms.render(substitute(text, numbers, where, used), where, seen);
    // nawias z nazwą angielską tuż przed nawiasem z treści daje „(…) (…)”: przeredaguj zdanie
    if (tekst === 'pl' && /\)\s\(/.test(out) && /\{\{t:/.test(text)) warnings.push(`${where}: dwa nawiasy obok siebie: ${out.match(/[^\s]+ \([^)]*\) \([^)]*\)/)?.[0] ?? ''}`);
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

  const localeDir = join(contentDir, tekst);
  fileCtx = `${tekst}/modules.yaml`;
  const modules = parseOrThrow(ModulesFile, readYaml(join(localeDir, 'modules.yaml')), 'modules.yaml').map((m) => ({
    ...m,
    title: sub(m.title, m.id, undefined, false),
    sub: sub(m.sub, m.id, undefined, false),
  }));
  const moduleIds = new Set(modules.map((m) => m.id));
  if (moduleIds.size !== modules.length) throw new Error('modules.yaml: powtórzony identyfikator modułu');

  fileCtx = `${tekst}/rules.yaml`;
  const rulesRaw = parseOrThrow(RulesFile, readYaml(join(localeDir, 'rules.yaml')), 'rules.yaml');
  const rules = rulesRaw.map((r) => {
    // reguła to jedna jednostka tekstu („Jeśli …, to …, bo …”): nazwa angielska przy pierwszym użyciu
    const seen = new Set<string>();
    return { ...r, if: sub(r.if, r.id, seen), then: sub(r.then, r.id, seen), because: sub(r.because, r.id, seen) };
  });
  // cytaty w polach źródeł: najwyżej 2 zdania (decyzja właściciela z 9.10.2026)
  const quoteErrors = [
    ...rulesRaw.flatMap((r) => [r.source, r.population ?? ''].flatMap((t) => checkSourceQuotes(t).map((e) => `${r.id}: ${e}`))),
    ...[...numbers.values()].flatMap((n) =>
      [n.entry.source, n.entry.population ?? '', n.entry.note ?? ''].flatMap((t) => checkSourceQuotes(t).map((e) => `liczba ${n.key}: ${e}`)),
    ),
    ...Object.entries(termsFile).flatMap(([k, t]) => checkSourceQuotes(t.source).map((e) => `termin ${k}: ${e}`)),
  ];
  if (quoteErrors.length) throw new Error(`Za długie cytaty w polach źródeł:\n${quoteErrors.map((e) => `  - ${e}`).join('\n')}`);
  const ruleIds = new Set<string>();
  for (const r of rules) {
    if (ruleIds.has(r.id)) throw new Error(`rules.yaml: powtórzona reguła ${r.id}`);
    if (!moduleIds.has(r.module)) throw new Error(`${r.id}: nieznany moduł ${r.module}`);
    ruleIds.add(r.id);
  }

  const drillIds = new Set<string>();
  /** Jedno zadanie (lekcja albo pula egzaminacyjna): walidacja i podstawienie liczb i terminów. */
  const compileDrill = (drill: Drill): Drill => {
    let d = drill;
    if (drillIds.has(d.id)) throw new Error(`powtórzone zadanie ${d.id}`);
    drillIds.add(d.id);
    for (const r of d.rules) if (!ruleIds.has(r)) throw new Error(`zadanie ${d.id}: nieznana reguła ${r}`);
    for (const r of d.rules) registryUses.push({ plik: fileCtx, gdzie: d.id, id: r });
    if (d.kind === 'paint') {
      if (!rangeIds.has(d.spot)) throw new Error(`zadanie ${d.id}: nieznany spot zakresu ${d.spot}`);
      return { ...d, prompt: sub(d.prompt, d.id) };
    }
    if (d.kind === 'numeric') {
      const n = numbers.get(d.answer);
      if (!n) throw new Error(`zadanie ${d.id}: nieznana liczba ${d.answer}`);
      used.add(d.answer);
      // odpowiedź zadania liczbowego pokazywana jest jako poprawna wartość: to tekst, jak {{n:…}}
      registryUses.push({ plik: fileCtx, gdzie: `${d.id}.answer`, id: `n:${d.answer}` });
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
      for (const c of d.cases) if (c.rule) registryUses.push({ plik: fileCtx, gdzie: d.id, id: c.rule });
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
        if (dir !== 'both' && dir !== 'pl-en' && dir !== 'en-pl' && dir !== 'def') throw new Error(`zadanie ${d.id}: params.dir to pl-en, en-pl, def albo both`);
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
  };

  const lessonDir = join(localeDir, 'lessons');
  const lessons: CompiledLesson[] = [];
  const lessonIds = new Set<string>();
  for (const file of readdirSync(lessonDir).filter((f) => f.endsWith('.md')).sort()) {
    const where = `lessons/${file}`;
    fileCtx = `${tekst}/lessons/${file}`;
    try {
      const split = splitFrontmatter(readFileSync(join(lessonDir, file), 'utf8'), where);
      const fm = split.fm;
      // telefony pomocy przed liczbami i terminami: rozwinięty tekst przechodzi te same kontrole co reszta lekcji
      const body = expandHelplines(split.body, helplines, where, helplinesUsed);
      const lesson = parseOrThrow(LessonFrontmatter, fm, where);
      if (lessonIds.has(lesson.id)) throw new Error(`powtórzona lekcja ${lesson.id}`);
      lessonIds.add(lesson.id);
      if (!moduleIds.has(lesson.module)) throw new Error(`nieznany moduł ${lesson.module}`);
      for (const r of lesson.rules) if (!ruleIds.has(r)) throw new Error(`nieznana reguła ${r}`);
      for (const r of lesson.rules) registryUses.push({ plik: fileCtx, gdzie: 'rules', id: r });

      const drills = lesson.drills.map(compileDrill);

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

  checkTermLessons(termsFile, lessonIds); // D-221: lekcja definiująca termin istnieje

  // pula egzaminacyjna (content/<locale>/exams/<moduł>.yaml): zadania tylko do egzaminu, sprawdzane po lekcjach
  const examDir = join(localeDir, 'exams');
  const exams: CompiledExam[] = [];
  const familiesByModule = new Map<string, Set<string>>();
  for (const l of lessons) for (const d of l.drills) familiesByModule.set(l.module, (familiesByModule.get(l.module) ?? new Set()).add(d.family));
  if (existsSync(examDir)) {
    for (const file of readdirSync(examDir).filter((f) => f.endsWith('.yaml')).sort()) {
      const where = `exams/${file}`;
      fileCtx = `${tekst}/exams/${file}`;
      try {
        const exam = parseOrThrow(ExamFile, readYaml(join(examDir, file)), where);
        checkExamFile(exam, file, { moduleIds, familiesByModule, examModules: new Set(exams.map((e) => e.module)) });
        exams.push({ module: exam.module, drills: exam.drills.map(compileDrill) });
      } catch (e) {
        throw new Error(`${where}: ${fmt(e)}`);
      }
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
  if (helplinesUsed.count === 0) warnings.push('telefony pomocy (helplines.yaml) nie są użyte w żadnej lekcji ({{helplines}})');
  if (misuseErrors.length) {
    throw new Error(`Znacznik terminu na zwykłym słowie (${misuseErrors.length} miejsc; D-376, tools/content-build/src/znaczniki.ts):\n${misuseErrors.map((e) => `  - ${e}`).join('\n')}`);
  }
  if (termErrors.length) {
    const shown = termErrors.slice(0, 40);
    throw new Error(
      `Terminy bez znacznika {{t:…}} (${termErrors.length} miejsc; decyzja T-02, content/terms.yaml):\n${shown.map((e) => `  - ${e}`).join('\n')}` +
        (termErrors.length > shown.length ? `\n  … i ${termErrors.length - shown.length} więcej` : ''),
    );
  }

  // strażnik rejestru (D-141): tekst aplikacji tylko z twierdzeniami „potwierdzone”
  const registry = loadRegistry(opts.registryDir ?? join(contentDir, '..', 'docs', 'tresci'));
  const transitional = loadTransitional(opts.transitional === undefined ? join(import.meta.dirname, '..', 'rejestr-przejsciowe.json') : opts.transitional);
  const guard = applyTransitional(registryViolations(registryUses, registry), transitional);
  warnings.push(...guard.warnings);
  if (guard.errors.length) {
    throw new Error(
      `Strażnik rejestru (D-141): tekst używa twierdzeń bez statusu „potwierdzone” w docs/tresci/rejestr.json (${guard.errors.length}):\n` +
        guard.errors.map((e) => `  - ${e}`).join('\n'),
    );
  }

  lessons.sort((a, b) => {
    const ma = modules.find((m) => m.id === a.module)!.order;
    const mb = modules.find((m) => m.id === b.module)!.order;
    return ma - mb || a.order - b.order;
  });

  const numbersOut = [...numbers.values()].map((n: ResolvedNumber) => ({ key: n.key, value: n.value, display: n.display }));

  const { ranking: handRanking } = compileHandRanking(join(contentDir, '..', 'tools', 'equity', 'equity169.json'));
  exams.sort((a, b) => modules.find((m) => m.id === a.module)!.order - modules.find((m) => m.id === b.module)!.order);
  const payload = { schemaVersion: CONTENT_SCHEMA_VERSION, locale, tekst, modules, lessons, exams, rules, numbers: numbersOut, ranges, evalRules, handRanking, areas, terms: terms.compiled };
  const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 16);
  return { ...payload, helplines, hash, warnings };
}

/**
 * Plik puli egzaminacyjnej: nazwa pliku = moduł, moduł istnieje i ma jeden plik, identyfikatory `<moduł>.exam.…`,
 * rodzina każdego zadania istnieje w lekcjach tego modułu (karta FSRS rodziny powstaje w lekcjach).
 * Reguły, liczby, spoty i powtórzone identyfikatory sprawdza kompilacja zadania (wspólna z lekcjami).
 */
/** Pole `lesson` terminu (D-221, wymagane od D-340) wskazuje istniejącą lekcję. */
export function checkTermLessons(terms: Readonly<Record<string, TermEntry>>, lessonIds: ReadonlySet<string>): void {
  for (const [key, t] of Object.entries(terms)) {
    if (!lessonIds.has(t.lesson)) throw new Error(`terms.yaml: termin ${key} wskazuje nieznaną lekcję ${t.lesson}`);
  }
}

export function checkExamFile(
  exam: { module: string; drills: readonly { id: string; family: string }[] },
  file: string,
  ctx: { moduleIds: ReadonlySet<string>; familiesByModule: ReadonlyMap<string, ReadonlySet<string>>; examModules: ReadonlySet<string> },
): void {
  if (!ctx.moduleIds.has(exam.module)) throw new Error(`nieznany moduł ${exam.module}`);
  if (file !== `${exam.module}.yaml`) throw new Error(`plik puli modułu ${exam.module} musi się nazywać ${exam.module}.yaml`);
  if (ctx.examModules.has(exam.module)) throw new Error(`powtórzona pula modułu ${exam.module}`);
  const families = ctx.familiesByModule.get(exam.module) ?? new Set<string>();
  for (const d of exam.drills) {
    if (!d.id.startsWith(`${exam.module}.exam.`)) throw new Error(`zadanie ${d.id}: identyfikator musi zaczynać się od ${exam.module}.exam.`);
    if (!families.has(d.family)) throw new Error(`zadanie ${d.id}: rodzina ${d.family} nie występuje w lekcjach modułu ${exam.module}`);
  }
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
/** Wersja treści w nazwie pliku (D-229): 10 znaków hex skrótu ze skrótów wszystkich baz; zmiana dowolnej bazy = nowa nazwa. */
export function wersjaTresci(c: readonly { locale: string; hash: string }[]): string {
  const wejscie = [...c].map((x) => `${x.locale}:${x.hash}`).sort().join('\n');
  return createHash('sha256').update(wejscie).digest('hex').slice(0, 10);
}

/** Najniższa wersja aplikacji, która czyta format treści `KONFIGURACJA.TRESC_FORMAT` (D-229; `app.json` 0.1.0). */
export const MIN_WERSJA_APLIKACJI = '0.1.0';

/** Wszystkie języki z `@szkola/jezyki` (35 baz, ADR 0005 pkt 1). */
export function compileAll(contentDir: string, opts: CompileOptions = {}): CompiledContent[] {
  return JEZYKI.map((j) => compileContent(contentDir, j, opts));
}

const nazwyPlikow = (c: readonly CompiledContent[]) => {
  const w = wersjaTresci(c);
  return c.map((x) => ({ content: x, plik: nazwaPlikuTresci(w, x.locale), wersja: w }));
};

/** Stare bazy treści w katalogu paczki: `content-v*.db` (dawny format) i `tresc-*.db` spoza listy oczekiwanych. Inne pliki nie. */
export function staleContentDbs(outDir: string, oczekiwane: readonly string[]): string[] {
  if (!existsSync(outDir)) return [];
  return readdirSync(outDir).filter((f) => (/^content-v\d+\.db$/.test(f) || /^tresc-[^-/]+-[^/]+\.db$/.test(f)) && !oczekiwane.includes(f));
}

/** Zapis wszystkich baz pod nazwami z jedną wersją, potem usunięcie starych baz treści (obce pliki zostają). */
export function writeContentDbs(c: readonly CompiledContent[], outDir: string): string[] {
  const pliki = nazwyPlikow(c);
  const sciezki = pliki.map((p) => writeContentDb(p.content, outDir, p.wersja));
  for (const f of staleContentDbs(outDir, pliki.map((p) => p.plik))) rmSync(join(outDir, f));
  return sciezki;
}

/**
 * Moduł TS dla aplikacji (D-232): wersja treści i mapa język → plik w paczce z `require` (Metro dołącza 35 baz; nazwy
 * tylko stąd, bez wpisywania w kodzie). Kolejność języków z `@szkola/jezyki`.
 */
export function trescModuleSource(c: readonly CompiledContent[]): string {
  const pliki = nazwyPlikow(c);
  const linie = pliki.map((p) => `  '${p.content.locale}': { plik: '${p.plik}', zasob: require('../../../assets/content/${p.plik}') as number },`);
  return [
    '// Wygenerowane przez content-build (pnpm content:build). Nie edytuj ręcznie.',
    '/* eslint-disable @typescript-eslint/no-require-imports */',
    `export const WERSJA_TRESCI = '${pliki[0]?.wersja ?? ''}';`,
    '/** Plik treści na język (ADR 0005, D-229): nazwa w paczce i zasób Metro. */',
    'export const PLIKI_TRESCI: Readonly<Record<string, { plik: string; zasob: number }>> = {',
    ...linie,
    '};',
    '',
  ].join('\n');
}

/** Kontrola `content:check`: każdy plik jest, ma skrót bieżącej treści, w katalogu nie ma innych plików `.db`. Zwraca listę błędów. */
export function sprawdzTresci(c: readonly CompiledContent[], outDir: string): string[] {
  const pliki = nazwyPlikow(c);
  const bledy: string[] = [];
  for (const p of pliki) {
    const hash = readDbHash(join(outDir, p.plik));
    if (hash !== p.content.hash) bledy.push(`${p.plik}: ${hash === null ? 'brak pliku' : `nieaktualny (${hash} ≠ ${p.content.hash})`}`);
  }
  const oczekiwane = new Set(pliki.map((p) => p.plik));
  const obce = existsSync(outDir) ? readdirSync(outDir).filter((f) => f.endsWith('.db') && !oczekiwane.has(f)) : [];
  for (const f of obce) bledy.push(`${f}: plik spoza bieżącej treści (stara wersja albo obcy plik)`);
  return bledy;
}

/** Zapisuje treść do pliku SQLite tylko do odczytu w aplikacji (ADR-08). */
export function writeContentDb(content: CompiledContent, outDir: string, wersja = content.hash.slice(0, 10)): string {
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, nazwaPlikuTresci(wersja, content.locale));
  if (existsSync(path)) rmSync(path);
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA journal_mode = DELETE;
    CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE modules (id TEXT PRIMARY KEY, ord INTEGER NOT NULL, title TEXT NOT NULL, sub TEXT NOT NULL, phase TEXT NOT NULL, recommended INTEGER NOT NULL);
    CREATE TABLE lessons (id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id), ord INTEGER NOT NULL, title TEXT NOT NULL, sub TEXT NOT NULL, rules TEXT NOT NULL, body TEXT NOT NULL);
    CREATE TABLE drills (id TEXT PRIMARY KEY, lesson_id TEXT NOT NULL REFERENCES lessons(id), ord INTEGER NOT NULL, family TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL);
    CREATE INDEX drills_family ON drills(family);
    CREATE TABLE exam_drills (id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id), ord INTEGER NOT NULL, family TEXT NOT NULL, kind TEXT NOT NULL, data TEXT NOT NULL);
    CREATE INDEX exam_drills_module ON exam_drills(module_id);
    CREATE INDEX exam_drills_family ON exam_drills(family);
    CREATE TABLE rules (id TEXT PRIMARY KEY, module_id TEXT NOT NULL REFERENCES modules(id), level TEXT NOT NULL, if_text TEXT NOT NULL, then_text TEXT NOT NULL, because TEXT NOT NULL, sources TEXT NOT NULL, population TEXT);
    CREATE TABLE numbers (key TEXT PRIMARY KEY, value REAL NOT NULL, display TEXT NOT NULL);
    CREATE TABLE ranges (id TEXT PRIMARY KEY, title TEXT NOT NULL, hero TEXT NOT NULL, path TEXT NOT NULL, play_percent REAL NOT NULL, groups TEXT NOT NULL, uncertain TEXT NOT NULL, solver TEXT NOT NULL, actions TEXT NOT NULL);
    CREATE TABLE game_kit (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE terms (key TEXT PRIMARY KEY, pl TEXT NOT NULL, en TEXT NOT NULL, en_alt TEXT NOT NULL, abbr TEXT, area TEXT NOT NULL);
  `);
  const tx = (fn: () => void) => {
    db.exec('BEGIN');
    fn();
    db.exec('COMMIT');
  };
  tx(() => {
    const meta = db.prepare('INSERT INTO meta VALUES (?, ?)');
    // manifest (ADR 0005 pkt 5): format, wersja, jezyk, min_wersja_aplikacji; jezyk_tekstu: źródło tekstu (D-228)
    meta.run('format', String(KONFIGURACJA.TRESC_FORMAT));
    meta.run('wersja', wersja);
    meta.run('jezyk', content.locale);
    meta.run('min_wersja_aplikacji', MIN_WERSJA_APLIKACJI);
    meta.run('jezyk_tekstu', content.tekst);
    meta.run('schemaVersion', String(content.schemaVersion));
    meta.run('hash', content.hash);
    const mod = db.prepare('INSERT INTO modules VALUES (?, ?, ?, ?, ?, ?)');
    for (const m of content.modules) mod.run(m.id, m.order, m.title, m.sub, m.phase, m.recommended ? 1 : 0);
    const les = db.prepare('INSERT INTO lessons VALUES (?, ?, ?, ?, ?, ?, ?)');
    const dr = db.prepare('INSERT INTO drills VALUES (?, ?, ?, ?, ?, ?)');
    for (const l of content.lessons) {
      les.run(l.id, l.module, l.order, l.title, l.sub, JSON.stringify(l.rules), JSON.stringify(l.body));
      l.drills.forEach((d, i) => dr.run(d.id, l.id, i, d.family, d.kind, JSON.stringify(d)));
    }
    const ex = db.prepare('INSERT INTO exam_drills VALUES (?, ?, ?, ?, ?, ?)');
    for (const e of content.exams) e.drills.forEach((d, i) => ex.run(d.id, e.module, i, d.family, d.kind, JSON.stringify(d)));
    const ru = db.prepare('INSERT INTO rules VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    // pełny opis źródła zostaje w rules.yaml; aplikacja dostaje rodzaj i liczbę niezależnych źródeł
    for (const r of content.rules) ru.run(r.id, r.module, r.level, r.if, r.then, r.because, JSON.stringify(summarizeSources(r.sources)), r.population ?? null);
    const nu = db.prepare('INSERT INTO numbers VALUES (?, ?, ?)');
    for (const n of content.numbers) nu.run(n.key, n.value, n.display);
    const ra = db.prepare('INSERT INTO ranges VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const r of content.ranges) {
      ra.run(r.id, r.title, r.hero, r.path, r.playPercent, JSON.stringify(r.groups), JSON.stringify(r.uncertain), r.solver, JSON.stringify(r.actions));
    }
    const kit = db.prepare('INSERT INTO game_kit VALUES (?, ?)');
    kit.run('handRanking', JSON.stringify(content.handRanking));
    kit.run('evalRules', JSON.stringify(content.evalRules));
    kit.run('areas', JSON.stringify(content.areas));
    const te = db.prepare('INSERT INTO terms VALUES (?, ?, ?, ?, ?, ?)');
    for (const t of content.terms) te.run(t.key, t.pl, t.en, JSON.stringify(t.enAlt), t.abbr ?? null, t.area);
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
