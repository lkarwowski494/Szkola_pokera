import { z } from 'zod';

export * from './helplines';
export * from './terms';

/**
 * Kontrakt treści: wspólny dla potoku content-build (walidacja) i aplikacji (typy).
 * Zmiana tego pliku = zmiana wersji schematu (CONTENT_SCHEMA_VERSION).
 */
export const CONTENT_SCHEMA_VERSION = 6;

const id = z.string().regex(/^[a-z0-9][a-z0-9.\-]*$/i, 'identyfikator: litery, cyfry, kropki, myślniki');
const cardsText = z.string().regex(/^([2-9TJQKA][shdc])( [2-9TJQKA][shdc])*$/, 'karty w formacie "As Kd"');

// ---------- Liczby (jedno źródło prawdy) ----------

/** bb100: winrate i odchylenie w bb na 100 rąk (M12), wyświetlane jako „80bb/100”. */
export const NumberUnit = z.enum(['percent', 'bb', 'bb100', 'multiplier', 'count', 'ratio', 'ms']);

export const NumberEntry = z
  .object({
    /** Wartość podana wprost (np. z badań). */
    value: z.number().optional(),
    /** Wartość wyliczana przy budowie przez poker-core (np. requiredEquity(100, 50)). */
    formula: z.enum(['requiredEquity', 'mdf', 'alpha', 'hitProbability', 'ruleOf2And4', 'rangePlay', 'product', 'sum', 'diff', 'missProbability', 'quotient', 'geometric', 'flopWetnessShare', 'sqrt', 'exp', 'normCdf', 'icm']).optional(),
    /** Argumenty formuły; flopWetnessShare: [i], odsetek wszystkich flopów o mokrości FLOP_WETNESS[i] (0 suchy, 1 pośredni, 2 mokry). */
    args: z.array(z.number()).optional(),
    /**
     * Klucze innych liczb zamiast wpisanych wartości (jedno źródło prawdy): dla product, sum, diff (pierwsza minus
     * pozostałe) oraz zamiast args dla requiredEquity, mdf i alpha (pula, zakład) i missProbability (outy, karty nieznane,
     * liczba odkrywanych kart). Jednoargumentowe sqrt, exp (e^x) i normCdf (dystrybuanta standardowego rozkładu
     * normalnego) przyjmują jeden argument w args albo refs (M12: wariancja i ryzyko bankructwa). Dla icm (M11): stacki
     * graczy, potem wypłaty za kolejne miejsca, a args = [liczba graczy, indeks gracza]; wynik to equity gracza w modelu
     * Malmutha-Harville'a (w jednostkach wypłat).
     */
    refs: z.array(z.string()).optional(),
    /** Dla formuły rangePlay: identyfikator spotu z content/ranges/spots.yaml. */
    spot: z.string().optional(),
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

// ---------- Terminy PL ↔ EN (content/terms.yaml, schemat w wersji 4) ----------

/** Obszar terminów = rodzina ćwiczenia słownictwa (vocab.<obszar>). */
export const TermArea = z.enum(['hands', 'actions', 'table', 'positions', 'math', 'preflop', 'board', 'strategy', 'mental', 'tournament']);
export type TermArea = z.infer<typeof TermArea>;

const termForm = z.string().min(1).regex(/^[^{}|]+$/, 'forma bez „{”, „}” i „|”');

export const TermEntry = z
  .object({
    pl: termForm,
    en: z.string().min(1),
    en_alt: z.array(z.string().min(1)).optional(),
    abbr: z.string().min(1).optional(),
    /** Definicja po polsku dla początkującego (1–2 zdania, zgodna ze źródłem); czysty tekst bez znaczników. */
    def: z.string().min(10).regex(/^[^{}]+$/, 'definicja bez znaczników {{…}}').optional(),
    area: TermArea,
    forms: z.array(termForm).optional(),
    skip: z.array(z.string().min(1)).optional(),
    /** Adres i cytat ze źródła nazwy angielskiej (ADR-24). */
    source: z.string().min(10).regex(/https?:\/\//, 'źródło musi mieć adres'),
  })
  .strict();
export type TermEntry = z.infer<typeof TermEntry>;
export const TermsFile = z.record(id, TermEntry);

/** Termin po kompilacji (tabela terms w bazie i moduł TS w aplikacji); źródło nazwy zostaje w terms.yaml. */
export interface CompiledTerm {
  key: string;
  pl: string;
  en: string;
  enAlt: string[];
  abbr?: string;
  def?: string;
  area: TermArea;
}

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
export type RuleLevel = z.infer<typeof RuleLevel>;

/**
 * Warunek reguły sprawdzalny automatycznie w trybie gry M13 (dokument 14, 4.4.3 i 6.2 A): rodzaj sprawdzenia
 * w silniku oceny (poker-core, grading.ts) i jego parametry. Liczby jako „n:klucz” z numbers.yaml.
 * players i stackBb ograniczają regułę do konfiguracji stołu, której dotyczy jej źródło (dokument 14, 5.5);
 * brak = każda konfiguracja (reguły rachunkowe).
 */
export const RuleCheckKind = z.enum([
  'free-check-fold',
  'no-limp',
  'solver-spot',
  'open-size',
  'three-bet-size',
  'iso-size',
  'cbet-case',
  'draw-price',
  'implied-odds',
]);
export type RuleCheckKind = z.infer<typeof RuleCheckKind>;
export const RuleCheck = z.object({
  kind: RuleCheckKind,
  players: z.array(z.number().int().min(2).max(9)).optional(),
  stackBb: z.array(z.number().positive()).optional(),
  streets: z.array(z.enum(['preflop', 'flop', 'turn', 'river'])).optional(),
  /** solver-spot: identyfikatory spotów z content/ranges/spots.yaml. */
  spots: z.array(z.string()).optional(),
  /** cbet-case: zadanie kind: cbet, którego przypadki (pole rule = ta reguła) oceniają decyzję. */
  drill: z.string().optional(),
  params: z.record(z.string(), z.union([z.number(), z.string()])).optional(),
});
export type RuleCheck = z.infer<typeof RuleCheck>;

/**
 * Rodzaj źródła reguły (decyzja właściciela z 9.10.2026): aplikacja pokazuje tylko rodzaj i liczbę niezależnych
 * źródeł, pełny opis (source) zostaje w repozytorium. math: rachunek; rules: zasady gry; solver-pub: opublikowane
 * rozwiązanie solvera; solver-app: solver aplikacji; book: książka; study: badanie naukowe; reference: encyklopedia;
 * training: serwis szkoleniowy; population: dane o populacji graczy.
 */
export const SourceKind = z.enum(['math', 'rules', 'solver-pub', 'solver-app', 'book', 'study', 'reference', 'training', 'population']);
export type SourceKind = z.infer<typeof SourceKind>;

/** Jedno niezależne źródło (jedna organizacja albo autor); url, gdy opis źródła go podaje. */
export const RuleSource = z.object({ kind: SourceKind, url: z.string().regex(/^https?:\/\/\S+$/, 'adres http(s)').optional() }).strict();
export type RuleSource = z.infer<typeof RuleSource>;

/** Rodzaj źródła z liczbą niezależnych źródeł: to trafia do bazy aplikacji (tabela rules, kolumna sources). */
export interface RuleSourceSummary {
  kind: SourceKind;
  n: number;
}

/** Domena bez poddomeny (blog.example.com i example.com to ten sam serwis). */
function siteOf(url: string): string {
  const host = /^https?:\/\/([^/?#:]+)/i.exec(url)?.[1] ?? url;
  return host.toLowerCase().replace(/^www\./, '').split('.').slice(-2).join('.');
}

/** Liczba niezależnych źródeł per rodzaj, w kolejności SourceKind. */
export function summarizeSources(sources: readonly Pick<RuleSource, 'kind'>[]): RuleSourceSummary[] {
  return SourceKind.options.flatMap((kind) => {
    const n = sources.filter((s) => s.kind === kind).length;
    return n ? [{ kind, n }] : [];
  });
}

export const RuleDef = z
  .object({
    id: z.string().regex(/^R-[A-Z0-9]+-\d{3}$/, 'identyfikator reguły: R-M0-001'),
    module: id,
    if: z.string().min(3),
    then: z.string().min(3),
    because: z.string().min(3),
    level: RuleLevel,
    /** Pełny opis źródeł z adresami i krótkimi cytatami (repozytorium; do aplikacji nie trafia). */
    source: z.string().min(3),
    /** Niezależne źródła reguły: z nich aplikacja pokazuje rodzaj i liczbę. */
    sources: z.array(RuleSource).min(1),
    population: z.string().optional(),
    check: RuleCheck.optional(),
  })
  .refine((r) => r.level !== 'exploit' || !!r.population, 'reguła eksploatacyjna musi podać populację źródłową')
  .refine((r) => r.sources.every((s) => !s.url || r.source.includes(s.url)), 'adres z sources musi być w opisie source')
  .refine((r) => {
    const sites = r.sources.flatMap((s) => (s.url ? [siteOf(s.url)] : []));
    return new Set(sites).size === sites.length;
  }, 'dwa źródła z tego samego serwisu to jedno źródło');
export type RuleDef = z.infer<typeof RuleDef>;
export const RulesFile = z.array(RuleDef);

// ---------- Zadania ----------

export const ChoiceOption = z
  .object({
    text: z.string().min(1),
    correct: z.boolean().default(false),
    /**
     * Dobra akcja, zły rozmiar (np. 3-bet za duży): odpowiedź liczona jako błąd, ale pokazywana jako „niedokładność”
     * z osobnym wyjaśnieniem rozmiaru (decyzja właściciela 3 października 2026, backlog B-015).
     */
    sizeError: z.boolean().optional(),
    why: z.string().min(3),
  })
  .refine((o) => !(o.sizeError && o.correct), 'opcja z błędem rozmiaru nie może być poprawna');

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

/**
 * Zadanie z odpowiedzią liczbową wpisywaną z klawiatury (FR-04, backlog B-017).
 * Poprawna wartość zawsze pochodzi z content/numbers.yaml (jedno źródło prawdy, NFR-09).
 */
export const NumericDrill = z.object({
  kind: z.literal('numeric'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  prompt: z.string().min(3),
  table: Table.optional(),
  /** Klucz liczby z numbers.yaml, która jest poprawną odpowiedzią. */
  answer: id,
  /** Wyjaśnienie pokazywane po odpowiedzi (zawsze razem z dokładną wartością). */
  explanation: z.string().min(3),
});

/**
 * Malowanie zakresu na siatce 13×13 (FR-04, backlog B-016): użytkownik zaznacza ręce, którymi gra w danym spocie.
 * Ocena w module oceny aplikacji (gram / pas, ważona kombinacjami, ręce mieszane zaliczane w obie strony).
 */
export const PaintDrill = z.object({
  kind: z.literal('paint'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  /** Identyfikator spotu z content/ranges/spots.yaml. */
  spot: id,
  prompt: z.string().min(3),
});

/**
 * icm (M11): bubble turnieju z losowymi stackami; params.mode = "call" (sprawdzić all-in według ICM) albo "equity" (wycena stacku).
 * playerType (M10): typ gracza po VPIP, PFR i próbie z HUD; progi w params jako "n:klucz" z numbers.yaml (poker-core HUD_PARAMS).
 */
export const GeneratorName = z.enum(['whoWins', 'whoWinsKicker', 'bestHand', 'outs', 'potOdds', 'drawCall', 'rangeDecision', 'icm', 'vocab', 'playerType']);
export type GeneratorName = z.infer<typeof GeneratorName>;

export const GeneratedDrill = z.object({
  kind: z.literal('generated'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  generator: GeneratorName,
  /**
   * Parametry generatora. Tekst „n:klucz” content-build zamienia na wartość liczby z numbers.yaml (jedno źródło prawdy
   * dla progów używanych przez generator, np. playerType).
   */
  params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
  /** Ile losowych zadań z tego generatora w jednej lekcji. */
  count: z.number().int().min(1).max(20).default(3),
});

// ---------- Flop: tekstura i c-bet (M5, schemat w wersji 3) ----------

/** Osie tekstury flopa; wartości jak w poker-core (classifyFlop). */
export const TextureAxis = z.enum(['height', 'suits', 'ranks', 'wetness']);
export const FlopHeight = z.enum(['high', 'middle', 'low']);
export const FlopSuits = z.enum(['rainbow', 'two-tone', 'monotone']);
export const FlopRanks = z.enum(['paired', 'connected', 'semi-connected', 'disconnected']);
export const FlopWetness = z.enum(['dry', 'medium', 'wet']);

/** Filtr tekstury: dla każdej osi lista dopuszczalnych wartości (brak osi = dowolna). */
export const TextureFilter = z
  .object({
    height: z.array(FlopHeight).min(1).optional(),
    suits: z.array(FlopSuits).min(1).optional(),
    ranks: z.array(FlopRanks).min(1).optional(),
    wetness: z.array(FlopWetness).min(1).optional(),
    trips: z.boolean().optional(),
  })
  .strict();
export type TextureFilter = z.infer<typeof TextureFilter>;

/**
 * Klasyfikacja tekstury: losowy flop, użytkownik wybiera wartość każdej z podanych osi.
 * Każda powtórka losuje nowy flop. Wyjaśnienia każdej opcji buduje aplikacja z faktów (classifyFlop).
 */
export const TextureDrill = z.object({
  kind: z.literal('texture'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  axes: z.array(TextureAxis).min(1).max(4),
  /** Ile flopów w jednej lekcji. */
  count: z.number().int().min(1).max(20).default(3),
});

export const CbetAction = z.enum(['check', 'small', 'big']);
export type CbetAction = z.infer<typeof CbetAction>;

/**
 * Przypadek c-betu: flopy o danej teksturze i najlepszy plan z wyjaśnieniem każdej opcji.
 * Reguła mieszka w treści (rules.yaml + ten przypadek), silnik tylko losuje flop i sprawdza dopasowanie.
 */
export const CbetCase = z.object({
  when: TextureFilter,
  best: CbetAction,
  /** Reguła, z której wynika odpowiedź (R-M5-…). */
  rule: z.string().optional(),
  why: z.object({ check: z.string().min(3), small: z.string().min(3), big: z.string().min(3) }),
});

/**
 * Decyzja c-betu na losowym flopie: czekam / mały c-bet / duży c-bet. Gdy najlepszy jest c-bet, drugi rozmiar to
 * „niedokładność” (dobra akcja, zły rozmiar; ta sama ocena co sizeError w zadaniach z wyborem).
 * Przypadki muszą się wykluczać: każdy flop pasuje do najwyżej jednego (sprawdza content-build).
 */
export const CbetDrill = z.object({
  kind: z.literal('cbet'),
  id,
  family: id,
  rules: z.array(z.string()).default([]),
  prompt: z.string().min(3),
  position: z.enum(['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB']).optional(),
  options: z.object({ check: z.string().min(2), small: z.string().min(2), big: z.string().min(2) }),
  cases: z.array(CbetCase).min(1),
  count: z.number().int().min(1).max(20).default(3),
});

export const Drill = z.union([ChoiceDrill, GeneratedDrill, NumericDrill, PaintDrill, TextureDrill, CbetDrill]);
export type TextureDrill = z.infer<typeof TextureDrill>;
export type CbetDrill = z.infer<typeof CbetDrill>;
export type CbetCase = z.infer<typeof CbetCase>;
export type ChoiceDrill = z.infer<typeof ChoiceDrill>;
export type GeneratedDrill = z.infer<typeof GeneratedDrill>;
export type PaintDrill = z.infer<typeof PaintDrill>;
/** Zadanie liczbowe po kompilacji: odpowiedź i jednostka podstawione z numbers.yaml. */
export type NumericDrill = z.infer<typeof NumericDrill> & { value?: number; unit?: NumberUnitName; display?: string };
export type NumberUnitName = z.infer<typeof NumberUnit>;
/** Zadanie po kompilacji (zadanie liczbowe z podstawioną odpowiedzią). */
export type Drill = Exclude<z.infer<typeof Drill>, { kind: 'numeric' }> | NumericDrill;

// ---------- Zakresy (wynik solvera preflop, ADR-20) ----------

/**
 * Nazwany spot zakresu: ścieżka akcji w drzewie solvera i akcja, którą pokazujemy w siatce.
 * Plik content/ranges/spots.yaml; dane liczbowe wyłącznie z wyników solvera w content/ranges (domyślnie
 * preflop-6max-100bb.json; stół 9-osobowy: preflop-9max-100bb.json).
 */
export const RangeSpotDef = z.object({
  id,
  title: z.string().min(3),
  /** Kto podejmuje decyzję. */
  hero: z.enum(['UTG', 'UTG+1', 'UTG+2', 'LJ', 'HJ', 'CO', 'BTN', 'SB', 'BB']),
  /** Ścieżka akcji w drzewie solvera ('' = korzeń). */
  path: z.string(),
  /** Akcje grupowane do pokazania, np. { "Przebij": ["raise 2.5"], "Sprawdź": ["call 2.5"] }. */
  groups: z.record(z.string(), z.array(z.string()).min(1)),
  /**
   * Opcje „dobra akcja, zły rozmiar” do zadań z wyborem rozmiaru (backlog B-015): nazwa grupy → błędne rozmiary.
   * Tekst może używać {{n:…}}.
   */
  wrongSizes: z.record(z.string(), z.array(z.object({ text: z.string().min(2), why: z.string().min(3) })).min(1)).optional(),
  /**
   * Klasy rąk „niepewne”: solver odbiega w nich od publicznych tabel (audyt 4.10.2026, K6 opcja B). Nie pojawiają się
   * w zadaniach rangeDecision, a w malowaniu zakresu nie liczą się do wyniku (jak ręce mieszane). Spoty otwarć (M3)
   * odwołują się do jednej listy (kotwica YAML w spots.yaml); spot SB wobec Buttona ma własną listę (B-045).
   */
  uncertain: z.array(z.string()).optional(),
  /**
   * Plik wyniku solvera w content/ranges (domyślnie preflop-6max-100bb.json). M11: pushfold.json, zakresy push/fold
   * heads-up z drzewa walidacyjnego (tools/preflop-solver/scripts/pushfold-ranges.ts).
   */
  solver: z.string().regex(/^[a-z0-9][a-z0-9.\-]*\.json$/, 'nazwa pliku .json w content/ranges').optional(),
});
export type RangeSpotDef = z.infer<typeof RangeSpotDef>;
export const RangeSpotsFile = z.array(RangeSpotDef);

/** Skompilowany spot: częstości grup akcji dla 169 klas (kolejność HAND_CLASSES). */
export interface CompiledRangeSpot {
  id: string;
  title: string;
  hero: string;
  path: string;
  /** labels: akcje węzła solvera należące do grupy (np. „raise 7.5”), do oceny decyzji w trybie gry M13. */
  groups: { name: string; labels: string[]; freqs: number[]; wrongSizes?: { text: string; why: string }[] }[];
  /** Udział rąk w grupach akcji pokazywanych w siatce (reszta to pas), ważony liczbą kombinacji. */
  playPercent: number;
  /** Klasy niepewne (RangeSpotDef.uncertain), w kolejności HAND_CLASSES; pusta lista = brak. */
  uncertain: string[];
  /** Plik wyniku solvera w content/ranges, z którego pochodzi spot (np. preflop-6max-100bb.json). */
  solver: string;
  /**
   * Wszystkie akcje węzła solvera z częstościami dla 169 klas (kolejność HAND_CLASSES), z pasem włącznie; etykiety jak
   * w wyniku solvera („fold”, „call 2.5”, „raise 7.5”, „all-in”). Dla botów trybu gry M13 (dokument 14, 4.4.2).
   */
  actions: { label: string; freqs: number[] }[];
}

/**
 * Reguła z warunkiem sprawdzalnym w trybie gry (content-build → game_kit.evalRules): parametry z rozwiązanymi
 * liczbami, przypadki c-betu z zadania (cbet-case) i rodziny zadań powołujących się na regułę (dokument 14, 2 i 5.7).
 */
export interface CompiledEvalRule {
  id: string;
  module: string;
  level: RuleLevel;
  check: Omit<RuleCheck, 'params'> & {
    params: Record<string, number | string>;
    cases?: { when: TextureFilter; best: CbetAction; rule?: string }[];
  };
  families: string[];
}

/** Obszar trybu gry (content/pl/areas.yaml, dokument 14, 4.3). */
export const AreaGenerator = z.enum(['flop-draw', 'rfi', 'vs-open', 'cbet-ip', 'turn-draw']);
export type AreaGenerator = z.infer<typeof AreaGenerator>;
export const AreaDef = z.object({ module: id, generator: AreaGenerator, rules: z.array(z.string()).min(1) });
export type AreaDef = z.infer<typeof AreaDef>;
export const AreasFile = z.array(AreaDef);

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

// ---------- Pula egzaminacyjna (content/pl/exams/<moduł>.yaml) ----------

/**
 * Zadania tylko do egzaminu modułu (nie pojawiają się w lekcjach): ten sam schemat zadania co w lekcjach,
 * identyfikatory `<moduł>.exam.…`, rodzina istniejąca w lekcjach tego modułu (wspólna karta FSRS).
 */
export const ExamFile = z.object({
  module: id,
  drills: z.array(Drill).min(1),
});
export type ExamFile = z.infer<typeof ExamFile>;

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
  | { t: 'formula'; v: string }
  | { t: 'range'; spot: string };
