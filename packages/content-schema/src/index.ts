import { z } from 'zod';

/**
 * Kontrakt treści: wspólny dla potoku content-build (walidacja) i aplikacji (typy).
 * Zmiana tego pliku = zmiana wersji schematu (CONTENT_SCHEMA_VERSION).
 */
export const CONTENT_SCHEMA_VERSION = 1;

const id = z.string().regex(/^[a-z0-9][a-z0-9.\-]*$/i, 'identyfikator: litery, cyfry, kropki, myślniki');
const cardsText = z.string().regex(/^([2-9TJQKA][shdc])( [2-9TJQKA][shdc])*$/, 'karty w formacie "As Kd"');

// ---------- Liczby (jedno źródło prawdy) ----------

export const NumberUnit = z.enum(['percent', 'bb', 'multiplier', 'count', 'ratio', 'ms']);

export const NumberEntry = z
  .object({
    /** Wartość podana wprost (np. z badań). */
    value: z.number().optional(),
    /** Wartość wyliczana przy budowie przez poker-core (np. requiredEquity(100, 50)). */
    formula: z.enum(['requiredEquity', 'mdf', 'alpha', 'hitProbability', 'ruleOf2And4']).optional(),
    args: z.array(z.number()).optional(),
    unit: NumberUnit,
    /** Liczba miejsc po przecinku przy wyświetlaniu. */
    decimals: z.number().int().min(0).max(3).default(0),
    /** Skąd liczba pochodzi (źródło, dokument 08, „obliczenie”). */
    source: z.string().min(3),
    /** Dla danych populacyjnych: z jakiej populacji pochodzą (wymagane dla level=exploit). */
    population: z.string().optional(),
    /** Uwaga, np. „założenie do kalibracji”. */
    note: z.string().optional(),
  })
  .refine((n) => (n.value === undefined) !== (n.formula === undefined), 'podaj dokładnie jedno: value albo formula');
export type NumberEntry = z.infer<typeof NumberEntry>;

export const NumbersFile = z.record(id, NumberEntry);

// ---------- Moduły ----------

export const ModuleDef = z.object({
  id,
  order: z.number().int(),
  title: z.string().min(2),
  sub: z.string().min(2),
  /** Faza roadmapy, w której moduł jest dostępny. */
  phase: z.enum(['mvp', 'f2', 'f3', 'f4']),
  recommended: z.boolean().default(true),
});
export type ModuleDef = z.infer<typeof ModuleDef>;
export const ModulesFile = z.array(ModuleDef);

// ---------- Reguły odruchowe ----------

export const RuleLevel = z.enum(['rules', 'math', 'gto', 'heuristic', 'exploit']);

export const RuleDef = z
  .object({
    id: z.string().regex(/^R-[A-Z0-9]+-\d{3}$/, 'identyfikator reguły: R-M0-001'),
    module: id,
    if: z.string().min(3),
    then: z.string().min(3),
    because: z.string().min(3),
    level: RuleLevel,
    source: z.string().min(3),
    population: z.string().optional(),
  })
  .refine((r) => r.level !== 'exploit' || !!r.population, 'reguła eksploatacyjna musi podać populację źródłową');
export type RuleDef = z.infer<typeof RuleDef>;
export const RulesFile = z.array(RuleDef);

// ---------- Zadania ----------

export const ChoiceOption = z.object({
  text: z.string().min(1),
  correct: z.boolean().default(false),
  why: z.string().min(3),
});

const Table = z.object({
  hand: cardsText.optional(),
  opp: cardsText.optional(),
  board: z.string().regex(/^([2-9TJQKA][shdc])( [2-9TJQKA][shdc]){2,4}$/).optional(),
  position: z.enum(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB']).optional(),
});

export const ChoiceDrill = z
  .object({
    kind: z.literal('choice'),
    id,
    family: id,
    rules: z.array(z.string()).default([]),
    prompt: z.string().min(3),
    table: Table.optional(),
    options: z.array(ChoiceOption).min(2).max(5),
  })
  .refine((d) => d.options.filter((o) => o.correct).length >= 1, 'zadanie musi mieć co najmniej jedną poprawną odpowiedź');

export const GeneratorName = z.enum(['whoWins', 'whoWinsKicker', 'bestHand', 'outs', 'potOdds', 'drawCall']);
export type GeneratorName = z.infer<typeof GeneratorName>;

export const GeneratedDrill = z.object({
  kind: z.literal('generated'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  generator: GeneratorName,
  params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
  /** Ile losowych zadań z tego generatora w jednej lekcji. */
  count: z.number().int().min(1).max(20).default(3),
});

export const Drill = z.union([ChoiceDrill, GeneratedDrill]);
export type Drill = z.infer<typeof Drill>;
export type ChoiceDrill = z.infer<typeof ChoiceDrill>;
export type GeneratedDrill = z.infer<typeof GeneratedDrill>;

// ---------- Lekcje ----------

export const LessonFrontmatter = z.object({
  id,
  module: id,
  order: z.number().int(),
  title: z.string().min(2),
  sub: z.string().min(2),
  rules: z.array(z.string()).default([]),
  drills: z.array(Drill).min(1),
});
export type LessonFrontmatter = z.infer<typeof LessonFrontmatter>;

// ---------- Skompilowana treść (AST lekcji) ----------

export type Inline =
  | { t: 'text'; v: string; b?: true; i?: true }
  | { t: 'cards'; v: string[] };

export type Block =
  | { t: 'h'; level: 2 | 3; c: Inline[] }
  | { t: 'p'; c: Inline[] }
  | { t: 'list'; ordered: boolean; items: Inline[][] }
  | { t: 'table'; head: Inline[][]; rows: Inline[][][] }
  | { t: 'note'; title: string; c: Block[] }
  | { t: 'formula'; v: string };
