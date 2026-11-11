// Generator wariantów scenariusza (BR-GEN-001…003, D-531, D-533): szablon + poziom + ziarno → rozdanie z kartami ustalonymi
// przed pierwszą decyzją. Czysta logika, bez React Native. Rodzaj oceny w tym kroku: draw-call (rachunek: szansa na jedną
// kartę wobec ceny sprawdzenia, reguła draw-price), jak generateDrawCall.
import type { Card } from './cards';
import { dealCards, FULL_DECK, makeCard, rankOf, suitOf } from './cards';
import { classCombos, classOf, HAND_CLASSES } from './ranges';
import { analyseOutsSpot, type DrawKind } from './drills';
import { cbetVerdict, isoSizeStandardBb, type IsoParams, nutOutsShare, NUT_DRAW_MIN_SHARE, rangeVerdict, sizeVerdict } from './grading';
import { classifyHolding, HOLDING_LIMITS, type HoldingClass } from './holding';
import { strength } from './evaluate';
import { hitProbability, requiredEquity } from './math';
import { equityAfter, ICM_STRUCTURES, randomStacks } from './icm';
import { createRng, pick } from './rng';
import { SUIT_PERMUTATIONS } from './situation';
import { classifyFlop, textureMatches, type TextureFilter } from './texture';

/** Outy na parę z jednej rangi karty gracza wyższej od stołu: 3 karty tej rangi (D1, `pair.outs.per-rank` w content/numbers.yaml). */
export const OUTS_PER_OVERCARD_RANK = 3;
export const SCENARIO_LEVELS = ['latwy', 'sredni', 'trudny'] as const;
export type ScenarioLevel = (typeof SCENARIO_LEVELS)[number];

/** Warunki odrzucenia wariantu, który zmieniłby poprawną decyzję (BR-GEN-003). */
export type RejectCondition = 'rywal-ma-out-gracza' | 'stol-sparowany';

export interface DrawCallSpec {
  kind?: 'draw-call';
  street: 'flop' | 'turn';
  /** Pule do wylosowania na pierwszej decyzji (kolejne wynikają z linii: pula + 2 × zakład). */
  pots: readonly number[];
  /** Dopuszczalne ułamki puli w zakładzie rywala (przy linii `bet`). */
  fractions: readonly number[];
  /** Linia rywala: `bet` (ułamek puli, domyślnie) albo `all-in` (F5: cały stos za pulą, stackBb − wkład gracza). */
  villain?: 'bet' | 'all-in';
}
/** F1: punkt decyzji preflop oceniany częstościami solvera w spocie (ADR-26). */
export interface RangeSpotSpec {
  kind: 'range-spot';
  street: 'preflop';
  spot: string;
  /** 08-N1: akcje spotu liczone jako jedna akcja `play` („gram”, np. sprawdzenie i 3-bet jak w siatce grupy); pozostałe akcje (pas) bez zmian. */
  play?: readonly string[];
}
/** F2: c-bet na flopie; `rule` to reguła, której przypadek (`cases`) dopasowany po teksturze flopu daje poprawną akcję (grading.ts, cbet-case). */
export interface CbetCaseSpec {
  kind: 'cbet-case';
  street: 'flop';
  rule: string;
}
/** F3: rozmiar jako akcja; liczba bb z parametrów reguły (ctx.sizeRules), nie z generatora. */
export interface SizeSpotSpec {
  kind: 'size-spot';
  street: 'preflop';
  check: 'open-size' | 'three-bet-size' | 'no-limp' | 'iso-size';
  rule: string;
  sb?: boolean;
  openBb?: number;
  /** iso-size: liczba limperów przed graczem (08-N3). */
  limpers?: number;
}
/** F4: sprawdzenie all-inu przy ICM; zakres rywala ze spotu push (akcja all-in). */
export interface IcmCallSpec {
  kind: 'icm-call';
  street: 'preflop';
  spot: string;
}
/** 08-N4 (R-M4-010): punkt „lista rąk”: oczekiwana akcja z jawnej listy klas w szablonie (`entries`); generator losuje tylko klasy z listy. */
export interface ListHandSpec {
  kind: 'list-hand';
  street: 'preflop';
  entries: readonly ListEntry[];
}
/**
 * 08-N7 (R-M8-010, math): sprawdzenie bluff-catcherem na riverze po zakładzie rywala. Udział blefów w zakresie rywala to dana zadania z szablonu
 * (`bluffShares`, bez populacji nie jest twierdzeniem o rywalu); ręka gracza: jedna para z kartą gracza (bluff-catcher, D-1143).
 */
export interface RiverCatchSpec {
  kind: 'river-catch';
  street: 'river';
  pots: readonly number[];
  fractions: readonly number[];
  bluffShares: readonly number[];
}
/**
 * 08-N2 (R-M6-006 mały, R-M6-007 duży): obrona wobec c-betu na flopie. Gracz (BB) sprawdził otwarcie; ręka pochodzi z jego zakresu obrony (spot `spot`,
 * akcje inne niż pas, jak zakres otwarcia w cbet-case), rywal stawia ułamek puli z `fractions`; poprawna akcja z `defendVsCbet` (null = wariant odrzucany).
 */
export interface DefendSpec {
  kind: 'defend';
  street: 'flop';
  spot: string;
  pots: readonly number[];
  fractions: readonly number[];
}
/**
 * 08-N6 (R-M7-006, math): zakład gracza na turnie z silną ręką (klasa very-strong/strong) wobec drawa rywala (rodzaj z `draws` poziomu). Dwa rozmiary do wyboru:
 * `small` i `big` (ułamki puli, np. 1/4 i 3/4); poprawny jest `bet-big`, gdy rywal ma cenę przy małym (szansa na trafienie > cena) i nie ma jej przy dużym.
 */
export interface TurnBetSpec {
  kind: 'turn-bet';
  street: 'turn';
  pots: readonly number[];
  small: number;
  big: number;
}
export type DecisionSpec = DrawCallSpec | RangeSpotSpec | CbetCaseSpec | SizeSpotSpec | IcmCallSpec | ListHandSpec | RiverCatchSpec | DefendSpec | TurnBetSpec;
/** Macierz equity 169×169 (tools/equity/equity169.json): equity[i][j] klasy i wobec klasy j, pairs[i][j] = liczba par kombinacji. */
export interface Equity169Data {
  classes: readonly string[];
  equity: readonly (readonly number[])[];
  pairs: readonly (readonly number[])[];
}
/** Reguła rozmiaru z treści (EvalRule): rodzaj sprawdzenia i parametry z rozwiązanymi liczbami. */
export interface SizeRuleData {
  id: string;
  check: { kind: string; params: Readonly<Record<string, number | string>> };
}

/** Akcje punktu cbet-case (bet-small/bet-big to rozmiar c-betu małym/dużym, grading.ts `chosen`). */
export type CbetCaseAction = 'check' | 'bet-small' | 'bet-big';
/**
 * Pełny zestaw akcji punktu na ekranie scenariusza (CR WYS-001): jedna definicja dla generatora (opcje wariantu), ekranu (przyciski)
 * i bramki budowania (szablon musi mieć wyjaśnienie każdej akcji, BR-OCE-002). `check` dotyczy tylko `no-limp`.
 */
export const AKCJE_CBET: readonly CbetCaseAction[] = ['check', 'bet-small', 'bet-big'];
export const AKCJE_ROZMIARU = ['raise', 'raise-small', 'raise-big'] as const;
export const AKCJE_BEZ_LIMPU = ['raise', 'limp'] as const;
/** Akcje punktu cbet-case albo size-spot wg rodzaju; `null` dla pozostałych rodzajów (pas i sprawdzenie, F1). */
export function akcjeSzablonu(kind: string | undefined, check?: string): readonly string[] | null {
  if (kind === 'cbet-case') return AKCJE_CBET;
  if (kind === 'size-spot') return check === 'no-limp' ? AKCJE_BEZ_LIMPU : AKCJE_ROZMIARU;
  return null;
}
/** Ocena akcji punktu przez regułę silnika gry (grading.ts): zgodne, dopuszczalne (ADR-04), niedokładność albo błąd (limp). */
export type WerdyktAkcji = 'compliant' | 'acceptable' | 'inaccuracy' | 'mistake';
/** Klasa ręki gracza względem flopu dla filtru poziomu (F2). */
export type HoldingFilter = 'air' | 'pair' | 'draw';
/** Przypadek c-betu z treści (EvalRule.check.cases): tekstura flopu → najlepszy plan; `rule` wskazuje regułę, z której wynika. */
export interface CbetCaseData {
  when: TextureFilter;
  best: 'check' | 'small' | 'big';
  rule?: string;
  /** Flopy, na których duży zakład jest niedokładnością także przy `best: check` (D-845; `cbetVerdict`). */
  sizeDown?: TextureFilter;
}

/** Spot zakresu dla generatora (CompiledRangeSpot z content-build): akcje węzła solvera z częstościami dla 169 klas. */
export interface RangeSpotData {
  id: string;
  uncertain: readonly string[];
  actions: readonly { label: string; freqs: readonly number[] }[];
}
/** Dane spoza szablonu, potrzebne punktom range-spot: poker-core nie czyta plików (D-661). */
export interface GeneratorContext {
  spots: readonly RangeSpotData[];
  /** range.mixed.min i range.mixed.low z numbers.yaml (ADR-26). */
  thresholds: { mixedMin: number; mixedLow: number };
  /** F2: przypadki c-betu z reguł cbet-case (kolejność jak w treści; pierwszy pasujący po teksturze, jak grading.ts). */
  cbetCases?: readonly CbetCaseData[];
  /** F3: reguły open-size, three-bet-size i no-limp (parametry rozmiarów). */
  sizeRules?: readonly SizeRuleData[];
  /** F4: equity klas wobec klas (poker-core nie czyta plików, D-661). */
  equity169?: Equity169Data;
  /** D-888: rozmiary c-betu (cbet.size.small i cbet.size.big z numbers.yaml, ułamek puli) do zdania „Liczby”; nie wpływają na losowanie wariantu. */
  cbetSizes?: { small: number; big: number };
}
/**
 * Jedna definicja kontekstu generatora dla budowania treści i ekranu (CN, D-780): z danych treści (spoty, progi, reguły oceny,
 * macierz equity) składa `GeneratorContext` tak samo w kontroli generatora i w aplikacji, więc ekran losuje te same warianty co kontrola.
 * `evalRules` to `game_kit.evalRules` (CompiledEvalRule): przypadki c-betu z reguł `cbet-case` (bez powtórzeń, w kolejności reguł)
 * i reguły rozmiaru (`open-size`, `three-bet-size`, `no-limp`). Czysta funkcja: poker-core nie czyta plików (D-661).
 */
export function buildGeneratorContext(d: {
  spots: readonly RangeSpotData[];
  thresholds: { mixedMin: number; mixedLow: number };
  evalRules: readonly { id: string; check: { kind: string; params: Readonly<Record<string, number | string>>; cases?: readonly CbetCaseData[] } }[];
  equity169?: Equity169Data | undefined;
  cbetSizes?: { small: number; big: number } | undefined;
}): GeneratorContext {
  const cbetCases = [...new Map(d.evalRules.filter((r) => r.check.kind === 'cbet-case').flatMap((r) => r.check.cases ?? []).map((c) => [JSON.stringify(c), c] as const)).values()];
  const sizeRules = d.evalRules.filter((r) => ['open-size', 'three-bet-size', 'no-limp', 'iso-size'].includes(r.check.kind)).map((r) => ({ id: r.id, check: { kind: r.check.kind, params: r.check.params } }));
  return { spots: d.spots, thresholds: d.thresholds, cbetCases, sizeRules, ...(d.equity169 ? { equity169: d.equity169 } : {}), ...(d.cbetSizes ? { cbetSizes: d.cbetSizes } : {}) };
}

/**
 * Nadkarty w draw-call (D-888, CS): niewidziane karty tej samej rangi co karta gracza wyższa od najwyższej karty stołu (po 3 na rangę,
 * `OUTS_PER_OVERCARD_RANK`), bez kart już policzonych jako outy drawa. Para w ręce nie ma nadkart. Generator używa górnej granicy 3 × liczba rang
 * (nakładanie z outami nieusuwane), więc wartość stąd jest nie większa i zdanie „trafisz razem” pozostaje po właściwej stronie ceny.
 */
export function overcardOuts(hero: readonly Card[], board: readonly Card[], drawOuts: readonly Card[]): number {
  if (hero.length !== 2 || board.length === 0 || rankOf(hero[0]!) === rankOf(hero[1]!)) return 0;
  const najwyzszaNaStole = Math.max(...board.map(rankOf));
  let n = 0;
  for (const r of new Set(hero.map(rankOf).filter((x) => x > najwyzszaNaStole))) {
    for (let suit = 0; suit < 4; suit++) {
      const c = makeCard(r, suit);
      if (!hero.includes(c) && !board.includes(c) && !drawOuts.includes(c)) n++;
    }
  }
  return n;
}

/** Nadkarty punktu draw-call z samej ręki i stołu (outy drawa z `analyseOutsSpot`); jedna definicja dla liczb i dla warunku {{jesli:nadkarty}} (KO-073). */
export function overcardOutsAt(hero: readonly Card[], board: readonly Card[]): number {
  return overcardOuts(hero, board, analyseOutsSpot(hero, board)?.draw.all ?? []);
}

export interface LevelBounds {
  draws: readonly DrawKind[];
  flop?: TextureFilter;
  /** Odległość szansy na trafienie od ceny (ułamek, 0,10 = 10 pp): marginMin ≤ odległość < marginMax (null = bez górnej granicy), zawsze > 0. */
  marginMin?: number;
  marginMax?: number | null;
  reject: readonly RejectCondition[];
  /** F5: tylko draw „do najlepszej ręki” (udział nutowych outów ≥ NUT_DRAW_MIN_SHARE). */
  drawToBest?: boolean;
  /** F5: margines osobno na punkt decyzji (po jednym na punkt); zastępuje marginMin/marginMax. */
  margins?: readonly { min: number; max: number | null }[];
  /** F4: poprawna akcja ICM różni się od akcji w grze o żetony (próg 50%, requiredChips). */
  chipsDiffer?: boolean;
  /** F2: ręka gracza z jednej z tych klas względem flopu (brak = dowolna). */
  holding?: readonly HoldingFilter[];
  /** F1: przedział częstości akcji oczekiwanej na punkt decyzji range-spot (null = inny rodzaj punktu); min ≤ f ≤ max. */
  freqs?: readonly ({ min: number; max: number } | null)[];
  /** KO-076: minimalny margin equity (ułamek) klasy ręki range-spot od granicy akcji oczekiwanej, `equityMarginPp` (D-1141); wymaga `ctx.equity169`. */
  equityMarginMin?: number;
  /**
   * Poprawna akcja w każdym punkcie decyzji tego poziomu, po jednej na punkt (BR-SZB-001, BR-GEN-003, D-556). Granice losowania
   * mają ją gwarantować: generator odrzuca wariant, w którym rachunek daje inną akcję, więc w poziomie decyzja się nie zmienia.
   */
  expected: readonly string[];
}
export interface GeneratorTemplate {
  id: string;
  /** Głębokość w bb: potrzebna tylko przy linii `all-in` (F5). */
  stackBb?: number;
  /** Pozycje gracza i rywala (nazwy jak w szablonie): martwe blindy i blindy gracza liczone z nich (CJ WYS-001/002). Wymagane przy stackBb w punkcie draw-call i przy icm-call. */
  positions?: { hero: string; villain: string };
  levels: Partial<Record<ScenarioLevel, LevelBounds>>;
  decisions: readonly DecisionSpec[];
}

export interface DrawCallVariantDecision {
  /** Rodzaj punktu decyzji (rozróżnik unii VariantDecision; `kind` zostaje rodzajem drawa, wstecznie zgodnie). */
  point: 'draw-call';
  street: 'flop' | 'turn';
  pot: number;
  bet: number;
  fraction: number;
  required: number;
  hit: number;
  outs: number;
  kind: DrawKind;
  correct: 'call' | 'fold';
  margin: number;
}
export interface RangeSpotVariantDecision {
  point: 'range-spot';
  street: 'preflop';
  spot: string;
  handClass: string;
  /** Częstości wszystkich akcji węzła dla klasy ręki i ich werdykty (ADR-26). */
  options: { action: string; f: number; verdict: 'correct' | 'acceptable' | 'inaccuracy' | 'wrong' }[];
  correct: string;
  /** Częstość akcji oczekiwanej. */
  freq: number;
}
export interface CbetCaseVariantDecision {
  point: 'cbet-case';
  street: 'flop';
  rule: string;
  /** Poprawna akcja z przypadku c-betu dla tekstury flopu (jak oracle grading.ts: compliant). */
  correct: CbetCaseAction;
  /** Klasa ręki gracza względem flopu (classifyHolding.cls). */
  holding: HoldingClass;
  /** Werdykt każdej akcji wg reguły c-betu (`cbetVerdict`, jak ocena w grze): rzadsza akcja jest dopuszczalna, zły rozmiar to niedokładność (CR WYS-002). */
  verdicts: Record<CbetCaseAction, WerdyktAkcji>;
}
export interface SizeSpotVariantDecision {
  point: 'size-spot';
  street: 'preflop';
  check: 'open-size' | 'three-bet-size' | 'no-limp' | 'iso-size';
  rule: string;
  /** Akcje do wyboru; `bb` to całkowity rozmiar podbicia (null: limp). */
  options: { action: 'raise' | 'raise-small' | 'raise-big' | 'limp'; bb: number | null }[];
  correct: 'raise';
  /** Werdykt każdej akcji z `options` wg reguły silnika gry: standardowy rozmiar zgodny, inny rozmiar niedokładność (`sizeVerdict`), limp błąd (no-limp) (CR WYS-002). */
  verdicts: Partial<Record<'raise' | 'raise-small' | 'raise-big' | 'limp', WerdyktAkcji>>;
}
export interface IcmCallVariantDecision {
  point: 'icm-call';
  street: 'preflop';
  spot: string;
  /** Wypłaty struktury (ICM_STRUCTURES) i stacki w żetonach; hero i villain to indeksy w `stacks`. */
  payouts: number[];
  stacks: number[];
  heroIndex: number;
  villainIndex: number;
  handClass: string;
  /** Equity ręki gracza wobec zakresu all-inu rywala (z macierzy 169×169). */
  handEquity: number;
  /** Potrzebne equity według ICM: (teraz − przegrana) ÷ (wygrana − przegrana) i w grze o żetony: (S − b) ÷ (2S) z blindem gracza (D-890). */
  required: number;
  requiredChips: number;
  correct: 'call' | 'fold';
  margin: number;
}
export interface RiverCatchVariantDecision {
  point: 'river-catch';
  street: 'river';
  pot: number;
  bet: number;
  fraction: number;
  /** Udział blefów w zakresie rywala (dana zadania) i próg bet ÷ (pula + 2·bet). */
  bluffShare: number;
  required: number;
  correct: 'call' | 'fold';
  margin: number;
}
export interface DefendVariantDecision {
  point: 'defend';
  street: 'flop';
  pot: number;
  bet: number;
  fraction: number;
  holding: HoldingClass;
  correct: 'call' | 'fold';
}
export interface TurnBetVariantDecision {
  point: 'turn-bet';
  street: 'turn';
  pot: number;
  betSmall: number;
  betBig: number;
  /** Cena drawa rywala przy każdym zakładzie: bet ÷ (pula + 2·bet). */
  requiredSmall: number;
  requiredBig: number;
  /** Szansa drawa rywala na trafienie na rivera i jego rodzaj. */
  hit: number;
  drawKind: DrawKind;
  correct: 'bet-big';
}
export interface ListHandVariantDecision {
  point: 'list-hand';
  street: 'preflop';
  handClass: string;
  /** Akcja poprawna (zgodna) i dopuszczalne z wpisu listy, w którym jest klasa ręki. */
  correct: string;
  acceptable: string[];
}
export type VariantDecision = DrawCallVariantDecision | RangeSpotVariantDecision | CbetCaseVariantDecision | SizeSpotVariantDecision | IcmCallVariantDecision | ListHandVariantDecision | RiverCatchVariantDecision | DefendVariantDecision | TurnBetVariantDecision;
export interface ScenarioVariant {
  templateId: string;
  level: ScenarioLevel;
  seed: number;
  hero: [Card, Card];
  villain: [Card, Card];
  board: Card[];
  /** Punkty draw-call w kolejności szablonu (jak dotąd, wstecznie zgodnie). */
  decisions: DrawCallVariantDecision[];
  /** Wszystkie punkty decyzji w kolejności szablonu (range-spot i draw-call); indeks = indeks w `decisions` szablonu i `expected` poziomu. */
  points: VariantDecision[];
  fingerprint: string;
}

export class TemplateError extends Error {}

/**
 * Wersja generatora wariantów (ŚR-001, KO-058 A, D-730): ta sama trójka szablon + poziom + ziarno daje tę samą rękę tylko w obrębie
 * jednej wersji. Zmiana wyniku generatora (losowanie, kolejność odrzuceń, odcisk, kontekst) wymaga podniesienia liczby; historia
 * wariantów zapisuje ją przy każdym wpisie, a „to samo rozdanie” wolno ponowić tylko przy wersji równej bieżącej.
 * Odcisk historii (`wariant.fingerprint`) obejmuje samo rozdanie; odcisk planu aktywności (`odciskWariantu`, apps/mobile `wariant.ts`) haszuje też pola pochodne punktów
 * (np. `requiredChips`). Zmiana pola pochodnego bez zmiany rozdania nie wymaga podniesienia wersji: unieważnia tylko rozdania w toku (zaczynają się od nowa), nie historię (recenzja DO 08-programista-004).
 * 0 jest zarezerwowane dla wpisów sprzed wprowadzenia wersji. Pilnują tego test wzorca w scenario-gen.test.ts i odciski prawdziwych szablonów z content/pl (tools/content-build/test/generator-odciski.test.ts, ŚR-002).
 */
export const GENERATOR_WERSJA = 3; // 3: SC-11 średni bez flopów z możliwym OESD (CW, ŚR-005, D-856); 2: nadkarty w draw-call, ręka z zakresu i dolosowanie flopu w cbet-case (CS, ŚR-002 CT, D-850)

/** Po ilu odrzuceniach z rzędu generator zgłasza błąd szablonu (BR-GEN-003). */
/** Ile razy w jednej próbie punktu cbet-case dolosowujemy flop do tekstury poziomu (rozkład flopów bez zmian: tylko ten warunek). */
const FLOP_REDEALS = 2000;
export const MAX_CONSECUTIVE_REJECTIONS = 5000; // BR-GEN-003 mówi 1000; po odrzuceniu gotowych rąk (06-tresci-201) sc-19 miał ok. 0,5% rozdań dla poziomu, więc 1000 kończyło się sporadycznym błędem szablonu (D-665, do weta)

/** Blindy wpłacone przez miejsce przy stole w bb (SB 0,5, BB 1; reszta 0). */
export function blindBb(position: string): number {
  return position === 'SB' ? 0.5 : position === 'BB' ? 1 : 0;
}
/** Martwe blindy w puli przed flopem: blindy graczy spoza rozdania (SB 0,5 + BB 1 pomniejszone o blindy gracza i rywala). Wkład gracza preflop = (pula − martwe) ÷ 2 (F5, limit stosu ŚR-203). */
export function deadBlindsBb(positions: { hero: string; villain: string }): number {
  return 1.5 - blindBb(positions.hero) - blindBb(positions.villain);
}
const IDENTITY: readonly number[] = [0, 1, 2, 3];
/** F3: złe rozmiary do wyboru jako ułamek rozmiaru standardowego (0,8 ≥ min-raise dla otwarć 2,5–3 bb i 3-betów; 1,6 mieści się w stosie 100 bb); odległość od standardu > 0,05 bb (near, grading.ts). D-695. */
export const SIZE_SMALL_FACTOR = 0.8;
export const SIZE_BIG_FACTOR = 1.6;
/** F4: próg `chipsDiffer` (wariant trudny): equity ≥ 50% to sprawdzenie w grze o żetony bez blindów; D-890: pole `requiredChips` wariantu liczy blind osobno, (S − b) ÷ (2S), a ten próg odpowiedzi nie zmienia (equity ≥ 50% ⇒ ≥ 45%). */
const ICM_CHIPS_REQUIRED = 0.5;
/** Equity klasy ręki wobec zakresu all-inu: Σ w·pary·eq ÷ Σ w·pary po 169 klasach rywala (macierz equity169, częstości w kolejności HAND_CLASSES). */
function equityVsRange(m: Equity169Data, handClass: string, freqs: readonly number[]): number {
  const i = m.classes.indexOf(handClass);
  if (i < 0) throw new TemplateError(`equity169: brak klasy ${handClass}`);
  let w = 0;
  let sum = 0;
  m.classes.forEach((vc, j) => {
    const x = (freqs[HAND_CLASSES.indexOf(vc)] ?? 0) * m.pairs[i]![j]!;
    w += x;
    sum += x * m.equity[i]![j]!;
  });
  if (w <= 0) throw new TemplateError('zakres all-inu rywala jest pusty');
  return sum / w;
}
const round1 = (x: number) => Math.round(x * 10) / 10;
/** Rozmiary opcji size-spot względem standardu: jedna lista dla generatora i `isoSizeOptions` (08-programista-005). */
const sizeOptionBbs = (standard: number) => ({ raise: standard, 'raise-small': round1(standard * SIZE_SMALL_FACTOR), 'raise-big': round1(standard * SIZE_BIG_FACTOR) }) as const;
/** Nazwy planu z przypadku c-betu (CbetAction z content-schema) → akcje punktu cbet-case. */
const CBET_ACTION: Record<CbetCaseData['best'], CbetCaseAction> = { check: 'check', small: 'bet-small', big: 'bet-big' };

/** Filtr klasy ręki (F2): air = klasa `air` (bez pary i drawa); pair = jedna para z kartą gracza (także kieszonkowa); draw = klasa `draw` (od HOLDING_LIMITS.drawOutsMin outów, bez pary). */
function holdingMatches(f: HoldingFilter, h: ReturnType<typeof classifyHolding>): boolean {
  return f === 'air' ? h.cls === 'air' : f === 'pair' ? h.pairKind !== null : h.cls === 'draw' && h.pairKind === null; // CW-2: klasa draw obejmuje też niską parę z drawem (holding.ts), filtr „bez pary” jak w opisie (D-859)
}
const RANK_CHARS = '23456789TJQKA';

/**
 * Odcisk wariantu (BR-GEN-002): szablon, poziom, ręka gracza i karty stołu pokazane w decyzjach (rangi i wzór kolorów).
 * Niezmienny względem permutacji kolorów: najmniejszy napis ze wszystkich 24 permutacji, w każdej karty w grupie
 * (ręka, flop, turn, river) posortowane po randze malejąco i kolorze po permutacji.
 */
export function variantFingerprint(templateId: string, level: ScenarioLevel, hero: readonly Card[], board: readonly Card[]): string {
  const group = (cards: readonly Card[], perm: readonly number[]): string =>
    [...cards]
      .map((c) => ({ r: rankOf(c), s: perm[suitOf(c)]! }))
      .sort((a, b) => b.r - a.r || a.s - b.s)
      .map((c) => `${RANK_CHARS[c.r]}${c.s}`)
      .join('');
  let best: string | null = null;
  for (const perm of [IDENTITY, ...SUIT_PERMUTATIONS]) {
    const groups = [group(hero, perm), group(board.slice(0, 3), perm), ...board.slice(3).map((c) => group([c], perm))];
    const text = groups.join('/');
    if (best === null || text < best) best = text;
  }
  return `${templateId}|${level}|${best}`;
}

function validateTemplate(t: GeneratorTemplate): void {
  const all = t.decisions;
  const ranges = all.filter((x) => x.kind === 'range-spot' || x.kind === 'list-hand');
  const d = all.filter((x): x is DrawCallSpec => x.kind === 'draw-call' || x.kind === undefined);
  if (all.length < 1 || all.length > 2) throw new TemplateError(`${t.id}: szablon ma 1 albo 2 punkty decyzji`);
  if (ranges.length > 1 || (ranges.length === 1 && all[0] !== ranges[0])) throw new TemplateError(`${t.id}: punkt range-spot albo list-hand jest najwyżej jeden i pierwszy`);
  const koncowe = all.filter((x) => x.kind === 'cbet-case' || x.kind === 'size-spot' || x.kind === 'icm-call' || x.kind === 'river-catch' || x.kind === 'defend' || x.kind === 'turn-bet');
  if (koncowe.length > 1 || (koncowe.length === 1 && (d.length > 0 || all[all.length - 1] !== koncowe[0]))) {
    throw new TemplateError(`${t.id}: punkt cbet-case albo size-spot jest najwyżej jeden, ostatni i bez punktów draw-call`);
  }
  if (all.some((x) => x.kind === 'defend') && all.length !== 1) throw new TemplateError(`${t.id}: punkt defend jest jedynym punktem szablonu`);
  if (d.length > 0) {
    // decyzje draw-call: flop, turn (decyzja od turnu) albo flop i turn
    const ok = (d.length === 1 && (d[0]!.street === 'flop' || d[0]!.street === 'turn')) || (d.length === 2 && d[0]!.street === 'flop' && d[1]!.street === 'turn');
    if (!ok) throw new TemplateError(`${t.id}: decyzje to flop, turn (decyzja od turnu) albo flop i turn`);
    if (d[0]!.pots.length === 0) throw new TemplateError(`${t.id}: pierwsza decyzja bez puli do losowania`);
    if (d.some((x) => x.villain === 'all-in') && !(typeof t.stackBb === 'number' && t.stackBb > 0)) throw new TemplateError(`${t.id}: linia all-in wymaga stackBb`);
    if (d.some((x) => x.villain !== 'all-in' && x.fractions.length === 0)) throw new TemplateError(`${t.id}: decyzja bez ułamków zakładu`);
  }
}

/** Reguła draw-price: wołamy, gdy szansa na trafienie przewyższa cenę sprawdzenia. */
function decide(hit: number, required: number): 'call' | 'fold' {
  return hit > required ? 'call' : 'fold';
}

function inMargin(margin: number, b: LevelBounds, i: number): boolean {
  const m = b.margins?.[i] ?? { min: b.marginMin ?? 0, max: b.marginMax ?? null };
  return margin > 0 && margin >= m.min && (m.max === null || margin < m.max);
}

/**
 * KO-076 (D-1141): margines klasy ręki od granicy akcji oczekiwanej, w equity wobec losowej ręki (ułamek; 0,02 = 2 pp): odległość od najbliższej klasy,
 * w której akcja oczekiwana ma częstość ≤ 0,5 (druga strona granicy). Uproszczenie: miara siły ręki to equity wobec losowej ręki, nie wobec zakresu rywala
 * danego spotu (ten wymagałby osobnego odwzorowania spot → zakres rywala); dla klas dalekich od granicy w rankingu siły daje większy margines.
 */
const SILA_CACHE = new WeakMap<Equity169Data, number[]>();
/** Equity klasy wobec losowej ręki (wszystkie 169 klas ważone liczbą par kombinacji); liczone raz na macierz. */
function silaKlas(m: Equity169Data): number[] {
  let c = SILA_CACHE.get(m);
  if (!c) {
    c = m.classes.map((_x, k) => {
      let w = 0;
      let s = 0;
      m.classes.forEach((_y, j) => { w += m.pairs[k]![j]!; s += m.pairs[k]![j]! * m.equity[k]![j]!; });
      return s / w;
    });
    SILA_CACHE.set(m, c);
  }
  return c;
}
const MARGINES = new WeakMap<RangeSpotData, Map<string, number>>();
export function equityMargin(spot: RangeSpotData, expected: string, hc: string, m: Equity169Data): number {
  const klucz = `${expected}|${hc}`;
  let pamiec = MARGINES.get(spot);
  if (!pamiec) { pamiec = new Map(); MARGINES.set(spot, pamiec); }
  const znany = pamiec.get(klucz);
  if (znany !== undefined) return znany;
  const wynik = policzMargines(spot, expected, hc, m);
  pamiec.set(klucz, wynik);
  return wynik;
}
function policzMargines(spot: RangeSpotData, expected: string, hc: string, m: Equity169Data): number {
  const a = spot.actions.findIndex((x) => x.label === expected);
  const i = m.classes.indexOf(hc);
  if (a < 0 || i < 0) throw new TemplateError(`equityMargin: brak akcji ${expected} albo klasy ${hc}`);
  const sila = silaKlas(m);
  let best = Infinity;
  m.classes.forEach((c, j) => { if ((spot.actions[a]!.freqs[HAND_CLASSES.indexOf(c)] ?? 0) <= 0.5) best = Math.min(best, Math.abs(sila[i]! - sila[j]!)); });
  return best;
}

/** Ręka z zakresu spotu: klasa losowana z wagą (suma częstości akcji innych niż pas) × liczba kombinacji, potem kombinacja (CS, CQ 06-tresci-004; wspólne dla cbet-case i defend). */
function handFromRange(templateId: string, ctx: GeneratorContext, spotId: string, rng: () => number, opis: string): [Card, Card] {
  const spot = ctx.spots.find((x) => x.id === spotId);
  if (!spot) throw new TemplateError(`${templateId}: brak spotu ${spotId} (${opis})`);
  const wagi = HAND_CLASSES.map((hc, h) => spot.actions.filter((a) => a.label !== 'fold').reduce((sum, a) => sum + (a.freqs[h] ?? 0), 0) * classCombos(hc).length);
  const suma = wagi.reduce((a, b) => a + b, 0);
  if (!(suma > 0)) throw new TemplateError(`${templateId}: zakres ${spotId} jest pusty`);
  let los = rng() * suma;
  let h = wagi.findIndex((w) => { los -= w; return los < 0; });
  if (h < 0) h = wagi.map((w) => w > 0).lastIndexOf(true); // błąd zaokrąglenia na końcu zakresu
  const combo = pick(rng, classCombos(HAND_CLASSES[h]!));
  return [combo[0], combo[1]];
}

/** Etykieta akcji grupy „gram” (08-N1, D-1146): zarezerwowana, spot z taką akcją to błąd. */
export const PLAY_ACTION = 'play';
/**
 * 08-N1: spot z akcjami `play` połączonymi w jedną (suma częstości akcji z listy `play`, jak grupa w siatce) i akcjami spoza listy bez zmian (pas).
 * Klasy niepewne bez zmian. Błąd, gdy akcja z listy nie istnieje w spocie albo spot ma już akcję o etykiecie `play`.
 */
export function groupedSpot(spot: RangeSpotData, play: readonly string[]): RangeSpotData {
  if (spot.actions.some((a) => a.label === PLAY_ACTION)) throw new TemplateError(`spot ${spot.id}: etykieta ${PLAY_ACTION} jest zarezerwowana dla grupy „gram”`);
  const brak = play.filter((l) => !spot.actions.some((a) => a.label === l));
  if (play.length === 0 || brak.length) throw new TemplateError(`spot ${spot.id}: akcje grupy play spoza spotu: ${brak.join(', ') || '(pusta lista)'}`);
  const reszta = spot.actions.filter((a) => !play.includes(a.label));
  const gram = { label: PLAY_ACTION, freqs: HAND_CLASSES.map((_hc, h) => spot.actions.filter((a) => play.includes(a.label)).reduce((sum, a) => sum + (a.freqs[h] ?? 0), 0)) };
  return { ...spot, actions: [...reszta, gram] };
}

/** F1: klasy rąk, w których akcja oczekiwana ma częstość z przedziału poziomu i werdykt „zgodna” (ADR-26); klasy niepewne pominięte. */
export function eligibleClasses(spot: RangeSpotData, expected: string, range: { min: number; max: number }, ctx: GeneratorContext, equityMarginMin?: number): { hc: string; h: number }[] {
  if (equityMarginMin !== undefined && !ctx.equity169) throw new TemplateError('equityMarginMin wymaga macierzy equity w kontekście generatora (GeneratorContext.equity169)');
  const idx = spot.actions.findIndex((a) => a.label === expected);
  if (idx < 0) return [];
  const out: { hc: string; h: number }[] = [];
  HAND_CLASSES.forEach((hc, h) => {
    if (spot.uncertain.includes(hc)) return;
    const freqs = spot.actions.map((a) => a.freqs[h]!);
    const f = freqs[idx]!;
    if (f >= range.min && f <= range.max && rangeVerdict(freqs, ctx.thresholds)[idx] === 'correct' && (equityMarginMin === undefined || equityMargin(spot, expected, hc, ctx.equity169!) >= equityMarginMin)) out.push({ hc, h });
  });
  return out;
}

function tryVariant(t: GeneratorTemplate, level: ScenarioLevel, b: LevelBounds, seed: number, rng: () => number, ctx: GeneratorContext | undefined): ScenarioVariant | null {
  const first = t.decisions[0]!;
  let hero: [Card, Card];
  let rest: Card[];
  let preflop: RangeSpotVariantDecision | null = null;
  let listPoint: ListHandVariantDecision | null = null;
  if (first.kind === 'range-spot') {
    if (!ctx) throw new TemplateError(`${t.id}: punkt range-spot wymaga danych zakresów (GeneratorContext)`);
    const spot0 = ctx.spots.find((x) => x.id === first.spot);
    if (!spot0) throw new TemplateError(`${t.id}: nieznany spot ${first.spot}`);
    const spot = first.play ? groupedSpot(spot0, first.play) : spot0;
    const expected = b.expected[0]!;
    const range = b.freqs?.[0];
    if (!range) throw new TemplateError(`${t.id}: poziom ${level}: punkt range-spot bez przedziału freqs`);
    const classes = eligibleClasses(spot, expected, range, ctx, b.equityMarginMin);
    if (classes.length === 0) throw new TemplateError(`${t.id}: poziom ${level}: żadna klasa rąk nie spełnia przedziału częstości ${range.min}–${range.max} dla ${expected} w spocie ${spot.id}`);
    const chosen = pick(rng, classes);
    const combo = pick(rng, classCombos(chosen.hc));
    hero = [combo[0], combo[1]];
    rest = dealCards(rng, 7, hero);
    const freqs = spot.actions.map((a) => a.freqs[chosen.h]!);
    const verdicts = rangeVerdict(freqs, ctx.thresholds);
    preflop = {
      point: 'range-spot', street: 'preflop', spot: spot.id, handClass: classOf(hero[0], hero[1]),
      options: spot.actions.map((a, i) => ({ action: a.label, f: freqs[i]!, verdict: verdicts[i]! })),
      correct: expected, freq: freqs[spot.actions.findIndex((a) => a.label === expected)]!,
    };
  } else if (first.kind === 'list-hand') {
    // 08-N4: klasa ręki z listy szablonu, której wpis daje oczekiwaną akcję poziomu; wpisy bez powtórzeń klas (jednoznaczna akcja)
    const expected = b.expected[0]!;
    const widziane = new Set<string>();
    for (const e of first.entries) for (const hc of e.hands) {
      if (!HAND_CLASSES.includes(hc)) throw new TemplateError(`${t.id}: list-hand: nieznana klasa ręki ${hc}`);
      if (widziane.has(hc)) throw new TemplateError(`${t.id}: list-hand: klasa ${hc} w więcej niż jednym wpisie listy`);
      widziane.add(hc);
    }
    const klasy = first.entries.filter((e) => e.correct === expected).flatMap((e) => e.hands);
    if (klasy.length === 0) throw new TemplateError(`${t.id}: poziom ${level}: żaden wpis listy nie ma akcji oczekiwanej ${expected}`);
    const hc = pick(rng, klasy);
    const combo = pick(rng, classCombos(hc));
    hero = [combo[0], combo[1]];
    rest = dealCards(rng, 7, hero);
    const w = listHandVerdicts(hc, first.entries)!;
    preflop = null;
    listPoint = { point: 'list-hand', street: 'preflop', handClass: classOf(hero[0], hero[1]), correct: w.correct, acceptable: w.acceptable };
  } else if (first.kind === 'defend') {
    // 08-N2: ręka z zakresu obrony spotu (jak zakres otwarcia w cbet-case); flop dolosowany do tekstury poziomu
    if (!ctx) throw new TemplateError(`${t.id}: punkt defend wymaga danych zakresów (GeneratorContext)`);
    hero = handFromRange(t.id, ctx, first.spot, rng, 'zakres obrony gracza');
    rest = dealCards(rng, 7, hero);
    for (let n = 0; n < FLOP_REDEALS && !textureMatches(classifyFlop(rest.slice(2, 5)), b.flop ?? {}); n++) rest = dealCards(rng, 7, hero);
  } else if (first.kind === 'cbet-case') {
    // CS (CQ 06-tresci-004): „otworzyłeś z <pozycja>” — ręka gracza pochodzi z zakresu otwarcia tej pozycji (spot rfi.<pozycja> z danych treści, ta sama
    // definicja co zakresy w aplikacji), losowana z wagą częstość otwarcia × liczba kombinacji klasy (suma akcji innych niż pas), a nie dowolna:
    // ręka spoza zakresu uczyłaby c-betu po linii, której aplikacja nie gra. Losowanie z zakresu (nie odrzucanie) zachowuje pojemność wąskich poziomów.
    if (!ctx) throw new TemplateError(`${t.id}: punkt cbet-case wymaga danych zakresów (GeneratorContext)`);
    if (!t.positions) throw new TemplateError(`${t.id}: punkt cbet-case wymaga positions (zakres otwarcia gracza)`);
    const dane = handFromRange(t.id, ctx, `rfi.${t.positions.hero.toLowerCase()}`, rng, 'zakres otwarcia gracza');
    hero = dane;
    rest = dealCards(rng, 7, hero);
    // wąska tekstura poziomu (SC-11 łatwy: ok. 0,4% flopów) razem z ręką z zakresu zjadłaby limit odrzuceń z rzędu: flop dolosowujemy do tekstury (tanio, bez klasyfikacji ręki)
    for (let n = 0; n < FLOP_REDEALS && !textureMatches(classifyFlop(rest.slice(2, 5)), b.flop ?? {}); n++) rest = dealCards(rng, 7, hero);
  } else {
    const cards = dealCards(rng, 9);
    hero = [cards[0]!, cards[1]!];
    rest = cards.slice(2);
  }
  const villain: [Card, Card] = [rest[0]!, rest[1]!];
  const board = rest.slice(2);
  const flop = board.slice(0, 3);
  if (!textureMatches(classifyFlop(flop), b.flop ?? {})) return null;
  if (b.reject.includes('stol-sparowany') && new Set(flop.map(rankOf)).size < 3) return null;

  const points: VariantDecision[] = preflop ? [preflop] : listPoint ? [listPoint] : [];
  let icmSuffix = '';
  const draws: DrawCallVariantDecision[] = [];
  const outCards: Card[] = [];
  let pot = 0;
  let previousOuts: readonly Card[] = [];
  for (const [i, spec] of t.decisions.entries()) {
    if (spec.kind === 'range-spot' || spec.kind === 'list-hand') continue;
    if (spec.kind === 'icm-call') {
      if (!ctx?.equity169) throw new TemplateError(`${t.id}: punkt icm-call wymaga macierzy equity (GeneratorContext.equity169)`);
      const spot = ctx.spots.find((x) => x.id === spec.spot);
      const shove = spot?.actions.find((a) => a.label === 'all-in');
      if (!spot || !shove) throw new TemplateError(`${t.id}: spot ${spec.spot} nie ma akcji all-in (zakres all-inu rywala)`);
      const pos = t.positions;
      if (!pos || typeof t.stackBb !== 'number' || !(t.stackBb > 0)) throw new TemplateError(`${t.id}: punkt icm-call wymaga positions i stackBb (blindy gracza wchodzą do progu ICM)`);
      // CN ŚR-002 (CM): BB wchodzi all-in dopiero po akcji SB (limp albo podbicie), więc gracz SB traci przy pasie ≥ 1 bb, a nie blind 0,5 bb,
      // i zakres all-inu rywala nie jest zakresem BB; jedyna para, którą rachunek (pas = strata blinda gracza) opisuje, to BB wobec all-inu SB
      if (pos.hero !== 'BB' || pos.villain !== 'SB') throw new TemplateError(`${t.id}: icm-call: obsługiwana jest tylko para BB wobec all-inu SB (jest ${pos.hero} wobec ${pos.villain}; BB wchodzi all-in dopiero po akcji SB, a zakres push z SB nie jest jego zakresem)`);
      if (deadBlindsBb(pos) !== 0) throw new TemplateError(`${t.id}: icm-call: pozycje ${pos.hero} wobec ${pos.villain} mają martwe blindy trzecich graczy (nieobsługiwane)`);
      const handClass = classOf(hero[0], hero[1]);
      const handEquity = equityVsRange(ctx.equity169, handClass, shove.freqs);
      const structure = pick(rng, ICM_STRUCTURES);
      const stacks = randomStacks(rng, structure.players);
      const heroIndex = Math.floor(rng() * structure.players);
      const villainIndex = (heroIndex + 1 + Math.floor(rng() * (structure.players - 1))) % structure.players;
      const atRisk = Math.min(stacks[heroIndex]!, stacks[villainIndex]!);
      const after = (delta: number) => stacks.map((x, j) => (j === heroIndex ? x + delta : j === villainIndex ? x - delta : x));
      const eqWin = equityAfter(after(atRisk), structure.payouts, heroIndex);
      const eqLose = equityAfter(after(-atRisk), structure.payouts, heroIndex);
      // pas = strata blinda gracza na rzecz rywala (blindy w puli i w stosach): próg liczony od stanu po pasie, nie sprzed blindów (CJ WYS-001)
      const heroBlind = blindBb(pos.hero);
      const bb = atRisk / t.stackBb!;
      const eqFold = equityAfter(after(-heroBlind * bb), structure.payouts, heroIndex);
      const required = (eqFold - eqLose) / (eqWin - eqLose);
      const margin = Math.abs(handEquity - required);
      const correct = handEquity >= required ? 'call' : 'fold';
      if (!inMargin(margin, b, i) || correct !== b.expected[i]) return null; // BR-GEN-003: tylko oczekiwana akcja
      if (b.chipsDiffer && (handEquity >= ICM_CHIPS_REQUIRED ? 'call' : 'fold') === correct) return null;
      points.push({
        point: 'icm-call', street: 'preflop', spot: spec.spot, payouts: [...structure.payouts], stacks, heroIndex, villainIndex, handClass,
        handEquity, required, requiredChips: (t.stackBb! - heroBlind) / (2 * t.stackBb!), correct, margin, // D-890: pas zostawia S − b, sprawdzenie daje 2S z prawdopodobieństwem e
      });
      icmSuffix = `|${stacks.join('-')}|${heroIndex}${villainIndex}`; // stacki są pokazane w decyzji: ta sama ręka przy innych stackach to inne rozdanie
      continue;
    }
    if (spec.kind === 'turn-bet') {
      if (spec.pots.length === 0 || !(spec.small > 0) || !(spec.big > spec.small)) throw new TemplateError(`${t.id}: turn-bet wymaga pots i 0 < small < big`);
      const turn = board.slice(0, 4);
      const h = classifyHolding(hero, turn);
      const rangiTurnu = turn.map(rankOf);
      const zKarta = rankOf(hero[0]) === rankOf(hero[1]) || hero.some((c) => rangiTurnu.includes(rankOf(c)));
      // silna ręka z kartą gracza (kicker z pary na stole nie liczy się, jak D-1143); „strong” tylko z pary (nadpara, najwyższa para z kickerem), nie z samych outów (EI-001)
      const zrobiona = h.cls === 'very-strong' || (h.cls === 'strong' && (h.pairKind === 'overpair' || h.pairKind === 'top'));
      if (!zrobiona || !zKarta) return null;
      const draw = analyseOutsSpot(villain, turn);
      if (!draw || !(b.draws as readonly string[]).includes(draw.draw.kind) || classifyHolding(villain, turn).improvesBoard) return null;
      // draw rywala musi mieć żywy out: karta, po której rywal wygrywa z ręką gracza (full, kareta albo wyższy kolor gracza zabijają draw; EI-001)
      const znane = new Set<Card>([...hero, ...villain, ...turn]);
      if (!FULL_DECK.some((c) => !znane.has(c) && strength([...villain, ...turn, c]) < strength([...hero, ...turn, c]))) return null;
      const pot = pick(rng, spec.pots);
      const betSmall = Math.round(pot * spec.small);
      const betBig = Math.round(pot * spec.big);
      if (betSmall <= 0 || betBig <= betSmall) return null;
      const reqSmall = requiredEquity(pot, betSmall);
      const reqBig = requiredEquity(pot, betBig);
      const hit = draw.hitNextCard;
      if (!(hit > reqSmall && hit < reqBig) || !inMargin(hit - reqSmall, b, i) || !inMargin(reqBig - hit, b, i)) return null; // BR-GEN-003: tylko oczekiwana akcja i margines od obu progów
      if (b.expected[i] !== 'bet-big') return null;
      points.push({ point: 'turn-bet', street: 'turn', pot, betSmall, betBig, requiredSmall: reqSmall, requiredBig: reqBig, hit, drawKind: draw.draw.kind as DrawKind, correct: 'bet-big' });
      icmSuffix = `|${pot}`; // pula jest pokazana w decyzji
      continue;
    }
    if (spec.kind === 'defend') {
      if (spec.pots.length === 0 || spec.fractions.length === 0) throw new TemplateError(`${t.id}: defend wymaga pots i fractions`);
      const pot = pick(rng, spec.pots);
      const bet = Math.round(pot * pick(rng, spec.fractions));
      if (bet <= 0) return null;
      const correct = defendVsCbet(hero, flop, bet / pot);
      if (correct === null || correct !== b.expected[i]) return null; // null: źródło nie rozstrzyga (D-1116); BR-GEN-003: tylko oczekiwana akcja
      if (b.holding && !b.holding.some((f) => holdingMatches(f, classifyHolding(hero, flop)))) return null;
      points.push({ point: 'defend', street: 'flop', pot, bet, fraction: bet / pot, holding: classifyHolding(hero, flop).cls, correct });
      icmSuffix = `|${pot}-${bet}`; // zakład jest pokazany w decyzji
      continue;
    }
    if (spec.kind === 'river-catch') {
      if (spec.pots.length === 0 || spec.fractions.length === 0 || spec.bluffShares.length === 0) throw new TemplateError(`${t.id}: river-catch wymaga pots, fractions i bluffShares`);
      const h = classifyHolding(hero, board);
      const rangiStolu = board.map(rankOf);
      const zKartaGracza = rankOf(hero[0]) === rankOf(hero[1]) || hero.some((c) => rangiStolu.includes(rankOf(c))); // classifyHolding liczy też poprawę kickerem przy parze na stole
      if (h.pairKind === null || !zKartaGracza) return null; // bluff-catcher: jedna para z kartą gracza (D-1143)
      const pot = pick(rng, spec.pots);
      const kandydaci = spec.fractions.flatMap((fraction) => spec.bluffShares.map((bluffShare) => ({ fraction, bluffShare, bet: Math.round(pot * fraction) })))
        .filter((x) => x.bet > 0)
        .map((x) => ({ ...x, required: requiredEquity(pot, x.bet), margin: Math.abs(x.bluffShare - requiredEquity(pot, x.bet)) }))
        .filter((x) => inMargin(x.margin, b, i) && (x.bluffShare > x.required ? 'call' : 'fold') === b.expected[i]);
      if (kandydaci.length === 0) return null;
      const c = pick(rng, kandydaci);
      points.push({ point: 'river-catch', street: 'river', pot, bet: c.bet, fraction: c.fraction, bluffShare: c.bluffShare, required: c.required, correct: b.expected[i] as 'call' | 'fold', margin: c.margin });
      icmSuffix = `|${pot}-${c.bet}-${c.bluffShare}`; // zakład i udział blefów są pokazane w decyzji: ta sama ręka przy innych liczbach to inne rozdanie
      continue;
    }
    if (spec.kind === 'size-spot') {
      if (!ctx?.sizeRules) throw new TemplateError(`${t.id}: punkt size-spot wymaga reguł rozmiaru (GeneratorContext.sizeRules)`);
      const rule = ctx.sizeRules.find((r) => r.id === spec.rule);
      if (!rule || rule.check.kind !== spec.check) throw new TemplateError(`${t.id}: reguła ${spec.rule} nie jest regułą ${spec.check}`);
      const num = (v: number | string | undefined, what: string): number => {
        if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) throw new TemplateError(`${t.id}: reguła ${spec.rule}: brak parametru ${what}`);
        return v;
      };
      let standard: number;
      if (spec.check === 'open-size') standard = num(rule.check.params[spec.sb ? 'openSb' : 'open'], spec.sb ? 'openSb' : 'open');
      else if (spec.check === 'three-bet-size') {
        if (spec.openBb === undefined) throw new TemplateError(`${t.id}: three-bet-size wymaga openBb`);
        standard = round1(num(rule.check.params.mult, 'mult') * spec.openBb);
      } else if (spec.check === 'iso-size') {
        // 08-N3: dobicie limperów (R-M4-012): standard z parametrów reguły; gracz z SB i BB gra po flopie przed limperami (oopExtra)
        if (spec.limpers === undefined || !t.positions) throw new TemplateError(`${t.id}: iso-size wymaga limpers i positions`);
        const p = rule.check.params;
        standard = isoSizeStandardBb({ base: num(p.base, 'base'), perLimper: num(p.perLimper, 'perLimper'), oopExtra: num(p.oopExtra, 'oopExtra') }, spec.limpers, t.positions.hero === 'SB' || t.positions.hero === 'BB');
      } else {
        // no-limp: oceniana jest sama akcja; podbicie o standardowy rozmiar otwarcia z reguły open-size
        const open = ctx.sizeRules.find((r) => r.check.kind === 'open-size');
        if (!open) throw new TemplateError(`${t.id}: no-limp wymaga reguły open-size w kontekście`);
        standard = num(open.check.params[spec.sb ? 'openSb' : 'open'], 'open');
      }
      const mozliwe = { ...sizeOptionBbs(standard), limp: null } as const;
      points.push({
        point: 'size-spot', street: 'preflop', check: spec.check, rule: spec.rule,
        options: (spec.check === 'no-limp' ? AKCJE_BEZ_LIMPU : AKCJE_ROZMIARU).map((a) => ({ action: a, bb: mozliwe[a] })),
        correct: 'raise',
        verdicts: Object.fromEntries((spec.check === 'no-limp' ? AKCJE_BEZ_LIMPU : AKCJE_ROZMIARU).map((a): [string, WerdyktAkcji] => [a, mozliwe[a] === null ? 'mistake' : sizeVerdict(standard, mozliwe[a])])),
      });
      continue;
    }
    if (spec.kind === 'cbet-case') {
      if (!ctx?.cbetCases) throw new TemplateError(`${t.id}: punkt cbet-case wymaga przypadków c-betu (GeneratorContext.cbetCases)`);
      // jak grading.ts `cbet-case`: pierwszy przypadek pasujący do tekstury; liczy się tylko, gdy wskazuje regułę punktu
      const c = ctx.cbetCases.find((x) => textureMatches(classifyFlop(flop), x.when));
      if (!c || c.rule !== spec.rule) return null;
      const correct = CBET_ACTION[c.best];
      if (correct !== b.expected[i]) return null; // BR-GEN-003: tylko oczekiwana akcja
      const h = classifyHolding(hero, flop);
      if (b.holding && !b.holding.some((f) => holdingMatches(f, h))) return null;
      const najlepsza = c.best;
      const mniej = !!c.sizeDown && textureMatches(classifyFlop(flop), c.sizeDown); // jak grading.ts `cbet-case` (D-845)
      points.push({
        point: 'cbet-case', street: 'flop', rule: spec.rule, correct, holding: h.cls,
        verdicts: { check: cbetVerdict(najlepsza, 'check', mniej), 'bet-small': cbetVerdict(najlepsza, 'small', mniej), 'bet-big': cbetVerdict(najlepsza, 'big', mniej) },
      });
      continue;
    }
    const k = draws.length; // numer punktu draw-call (pierwszy losuje pulę, drugi liczy ją z linii)
    const stol = board.slice(0, spec.street === 'flop' ? 3 : 4);
    if (k === 1 && previousOuts.includes(board[3]!)) return null; // linia: karta turnu nie trafia
    const spot = analyseOutsSpot(hero, stol);
    if (!spot || !(b.draws as readonly string[]).includes(spot.draw.kind)) return null;
    // 06-tresci-201: gdy karta gracza poprawia stół (para i lepiej), equity to nie same outy; reguła draw-price nie pasuje
    // (tak samo wyłącza ją silnik ocen: grading.ts drawFacts, `improvesBoard`), więc takiego wariantu nie pokazujemy
    if (classifyHolding(hero, stol).improvesBoard) return null;
    pot = k === 0 ? pick(rng, spec.pots) : pot + 2 * draws[0]!.bet;
    // F5: all-in rywala na flopie to sprawdzenie całego stosu, więc rachunek na dwie karty (R-M2-002); inaczej jedna karta
    const allIn = spec.villain === 'all-in';
    const hit = allIn && spec.street === 'flop' ? hitProbability(spot.outs, 52 - 2 - stol.length, 2) : spot.hitNextCard;
    // CS (CQ 06-tresci-003): ręka z kartą wyższą od stołu ma dodatkowe outy na parę (3 na rangę, definicja D1 w numbers.yaml; nakładanie z outami drawa
    // nieusuwane, więc to górna granica). Odpowiedź musi być ta sama przy outach drawa (dolna granica) i z nadkartami (górna): inaczej uczylibyśmy pasu
    // albo sprawdzenia, które przy realnych outach gracza zmienia wynik.
    const wyzsze = new Set(hero.map(rankOf).filter((r) => r > Math.max(...stol.map(rankOf)))).size;
    const nieznane = 52 - 2 - stol.length;
    const outsZNadkartami = spot.outs + OUTS_PER_OVERCARD_RANK * wyzsze;
    const hitZNadkartami = wyzsze === 0 ? hit : hitProbability(outsZNadkartami, nieznane, allIn && spec.street === 'flop' ? 2 : 1);
    // all-in = dokładnie stos gracza za pulą, bez zaokrąglenia (KO-056 ŚR-002: zaokrąglenie w górę dawało zakład większy niż stos o do 0,5 bb)
    if (typeof t.stackBb === 'number' && !t.positions) throw new TemplateError(`${t.id}: stackBb w punkcie draw-call wymaga positions (martwe blindy z pozycji)`);
    const martwe = t.positions ? deadBlindsBb(t.positions) : 0;
    const linie = allIn ? [t.stackBb! - (pot - martwe) / 2] : spec.fractions.map((f) => Math.round(pot * f));
    // ŚR-203: zakład nie jest większy niż stos gracza za pulą (stackBb − wkład przed flopem − wcześniejsze zakłady); bez stackBb bez ograniczenia
    const stosGracza = typeof t.stackBb === 'number' ? t.stackBb - ((k === 0 ? pot : draws[0]!.pot) - martwe) / 2 - draws.reduce((sum, x) => sum + x.bet, 0) : Infinity;
    const ok = linie
      .filter((bet) => allIn || bet <= stosGracza) // all-in to z definicji cały stos (zaokrąglony)
      .map((bet) => ({ fraction: bet / pot, bet, margin: bet > 0 ? Math.abs(hit - requiredEquity(pot, bet)) : 0 }))
      .filter((x) => inMargin(x.margin, b, i) && decide(hit, requiredEquity(pot, x.bet)) === b.expected[i]) // BR-GEN-003: tylko oczekiwana akcja
      .filter((x) => {
        if (wyzsze === 0) return true;
        const cena = requiredEquity(pot, x.bet);
        if (!inMargin(Math.abs(hitZNadkartami - cena), b, i) || decide(hitZNadkartami, cena) !== b.expected[i]) return false;
        // pas odporny na implied odds także przy outach z nadkartami (R-M7-008): potrzebna wygrana po trafieniu większa niż stos za pulą po zakładzie
        if (b.expected[i] !== 'fold' || !Number.isFinite(stosGracza)) return true;
        const potrzeba = (x.bet * (nieznane - outsZNadkartami)) / outsZNadkartami - (pot + x.bet);
        return potrzeba > Math.max(0, stosGracza - x.bet);
      });
    if (ok.length === 0) return null;
    if (b.drawToBest && nutOutsShare(hero, stol) < NUT_DRAW_MIN_SHARE) return null; // F5: draw do najlepszej ręki (po tanich warunkach: nutOutsShare jest drogie)
    const chosen = pick(rng, ok);
    const required = requiredEquity(pot, chosen.bet);
    const dec: DrawCallVariantDecision = {
      point: 'draw-call', street: spec.street, pot, bet: chosen.bet, fraction: chosen.fraction, required, hit, outs: spot.outs,
      kind: spot.draw.kind as DrawKind, correct: decide(hit, required), margin: chosen.margin,
    };
    draws.push(dec);
    points.push(dec);
    outCards.push(...spot.draw.all);
    previousOuts = spot.draw.all;
  }
  if (b.reject.includes('rywal-ma-out-gracza') && villain.some((c) => outCards.includes(c))) return null;
  const last = [...t.decisions].reverse().find((x): x is DrawCallSpec => x.kind === 'draw-call' || x.kind === undefined);
  const shown = last ? board.slice(0, last.street === 'turn' ? 4 : 3) : t.decisions.some((x) => x.kind === 'river-catch') ? board : t.decisions.some((x) => x.kind === 'turn-bet') ? board.slice(0, 4) : t.decisions.some((x) => x.kind === 'cbet-case' || x.kind === 'defend') ? flop : [];
  return { templateId: t.id, level, seed, hero, villain, board, decisions: draws, points, fingerprint: variantFingerprint(t.id, level, hero, shown) + icmSuffix };
}

/**
 * Wariant = szablon + poziom + ziarno (D-531): ręce i pięć kart stołu ustalone od razu, ten sam wynik dla tych samych
 * danych. Odrzuca losowania łamiące granice poziomu; po MAX_CONSECUTIVE_REJECTIONS odrzuceniach z rzędu zgłasza błąd szablonu.
 */
export function generateVariant(template: GeneratorTemplate, level: ScenarioLevel, seed: number, ctx?: GeneratorContext): ScenarioVariant {
  validateTemplate(template);
  const bounds = template.levels[level];
  if (!bounds) throw new TemplateError(`${template.id}: brak poziomu ${level}`);
  if (bounds.expected.length !== template.decisions.length) {
    throw new TemplateError(`${template.id}: poziom ${level}: oczekiwanych akcji ${bounds.expected.length}, punktów decyzji ${template.decisions.length}`);
  }
  const rng = createRng(seed);
  for (let i = 0; i < MAX_CONSECUTIVE_REJECTIONS; i++) {
    const v = tryVariant(template, level, bounds, seed, rng, ctx);
    if (v) return v;
  }
  throw new TemplateError(`${template.id}: ${MAX_CONSECUTIVE_REJECTIONS} odrzuceń z rzędu na poziomie ${level}`);
}

/**
 * Znaczniki wariantu w wyjaśnieniu akcji (BR-OCE-002, D-557): {{w:reka}} (ręka gracza), {{w:stol}} (karty stołu widoczne w punkcie
 * decyzji), {{w:pozycja}} i {{w:rywal}} (pozycje z szablonu). Podstawiane przy wyświetleniu; formatowanie kart i nazw pozycji
 * (język) podaje wołający, bo poker-core nie zna języków interfejsu.
 */
export const VARIANT_MARKERS = ['reka', 'stol', 'pozycja', 'rywal'] as const;
export type VariantMarker = (typeof VARIANT_MARKERS)[number];

const VARIANT_MARKER_RE = /\{\{w:([^{}]*)\}\}/g;
const NIEDOMKNIETY = '{{w:(niedomknięty)';

/**
 * Nazwy znaczników wariantu z tekstu w kolejności występowania (także nieznane, do walidacji). Znacznik z kreską
 * (`{{w:reka|x}}`) ma nazwę `reka|x`, a więc jest nieznany; niedomknięty `{{w:` zgłaszany jako `{{w:(niedomknięty)`
 * (08-programista-104: nic z `{{w:` nie zostaje surowe w tekście dla użytkownika).
 */
export function findVariantMarkers(text: string): string[] {
  const names = [...text.matchAll(VARIANT_MARKER_RE)].map((m) => m[1]!);
  if (text.replace(VARIANT_MARKER_RE, '').includes('{{w:')) names.push(NIEDOMKNIETY);
  return names;
}

/**
 * Warunki bloków w wyjaśnieniu (KO-073, D-1115): `{{jesli:nazwa}}…{{/jesli}}`; treść bloku pokazywana tylko, gdy warunek wariantu jest
 * prawdziwy. `nadkarty`: gracz ma kartę wyższą od wszystkich kart stołu (`overcardOutsAt` > 0). Bloki nie zagnieżdżają się.
 */
export const VARIANT_CONDITIONS = ['nadkarty'] as const;
export type VariantCondition = (typeof VARIANT_CONDITIONS)[number];
export type VariantConditionValues = Readonly<Record<VariantCondition, boolean>>;

const CONDITION_OPEN_RE = /\{\{jesli:([^{}]*)\}\}/g;
const CONDITION_CLOSE = '{{/jesli}}';
const CONDITION_BLOCK_RE = /\{\{jesli:([^{}]*)\}\}([\s\S]*?)\{\{\/jesli\}\}/g;
const NIEDOMKNIETY_WARUNEK = '{{jesli:(niedomknięty)';

/** Nazwy warunków z tekstu w kolejności występowania (także nieznane, do walidacji); uszkodzony blok (brak `{{/jesli}}`, zamykający bez otwarcia, zagnieżdżenie) dodaje `{{jesli:(niedomknięty)`. */
export function findVariantConditions(text: string): string[] {
  const names = [...text.matchAll(CONDITION_OPEN_RE)].map((m) => m[1]!);
  const bezBlokow = text.replace(CONDITION_BLOCK_RE, '');
  if (bezBlokow.includes('{{jesli:') || bezBlokow.includes(CONDITION_CLOSE) || /\{\{jesli:/.test([...text.matchAll(CONDITION_BLOCK_RE)].map((m) => m[2]!).join(''))) names.push(NIEDOMKNIETY_WARUNEK);
  return names;
}

function resolveConditions(text: string, conditions: Partial<VariantConditionValues> | undefined): string {
  const wynik = text.replace(CONDITION_BLOCK_RE, (_all, name: string, body: string) => {
    if (!(VARIANT_CONDITIONS as readonly string[]).includes(name)) throw new TemplateError(`nieznany warunek wariantu {{jesli:${name}}}`);
    if (body.includes('{{jesli:')) throw new TemplateError('zagnieżdżony blok warunku {{jesli:');
    const wartosc = conditions?.[name as VariantCondition];
    if (wartosc === undefined) throw new TemplateError(`brak wartości warunku {{jesli:${name}}}`);
    return wartosc ? body : '';
  });
  if (wynik.includes('{{jesli:') || wynik.includes(CONDITION_CLOSE)) throw new TemplateError('niedomknięty blok warunku {{jesli:');
  return wynik;
}

/**
 * Podstawia bloki warunkowe i znaczniki wartościami wariantu; nieznany znacznik lub warunek to błąd (nie cichy napis w treści dla
 * użytkownika). Bloki rozstrzygane przed znacznikami, więc znacznik w ukrytym bloku nie jest podstawiany.
 */
export function fillVariantMarkers(text: string, values: Record<VariantMarker, string>, conditions?: Partial<VariantConditionValues>): string {
  const widoczny = resolveConditions(text, conditions);
  const wynik = widoczny.replace(VARIANT_MARKER_RE, (_all, name: string) => {
    if (!(VARIANT_MARKERS as readonly string[]).includes(name)) throw new TemplateError(`nieznany znacznik wariantu {{w:${name}}}`);
    return values[name as VariantMarker];
  });
  if (wynik.includes('{{w:')) throw new TemplateError('niedomknięty znacznik wariantu {{w:');
  return wynik;
}

// ---------- Rodzaje punktów 08-N1…N7 (sesja DX): czyste funkcje oceny; w tym pliku, bo grupy mutacji nocny.yml wymieniają pliki src/ ----------


const RANK_A = 12; // as
const RANK_T = 8;
/** Granica „mały / duży” c-bet w obronie: mały to ≤ 0,4 puli (≈ 1/3, R-M6-006), duży ≥ 0,75 (≥ 3/4, R-M6-007); pomiędzy źródło nie rozstrzyga. */
const DEFEND_SMALL_MAX = 0.4;
/** D-1166 / NIS-004: = `cbet.size.big` z content/numbers.yaml (0,75, włącznie); zgodność pilnuje szablony-eh.test.ts w content-build. */
const DEFEND_BIG_MIN = 0.75;
/** „Wysokie karty” backdoora: obie karty gracza od dziesiątki (nazwane uproszczenie D-1066, do weta). */
const BACKDOOR_HIGH_MIN = RANK_T;

export interface IsoOption { action: 'raise' | 'raise-small' | 'raise-big'; bb: number; verdict: WerdyktAkcji }
export function isoSizeOptions(p: IsoParams, limpers: number, oop: boolean): IsoOption[] {
  const standard = isoSizeStandardBb(p, limpers, oop);
  return (Object.entries(sizeOptionBbs(standard)) as [IsoOption['action'], number][]).map(([action, bb]) => ({ action, bb, verdict: sizeVerdict(standard, bb) }));
}

export type DefendAction = 'call' | 'fold';

/** Backdoor koloru: trzy karty jednego koloru z udziałem karty gracza. */
function hasFlushBackdoor(hero: readonly [Card, Card], flop: readonly Card[]): boolean {
  for (let suit = 0; suit < 4; suit++) {
    if ([...hero, ...flop].filter((c) => suitOf(c) === suit).length === 3 && hero.some((c) => suitOf(c) === suit)) return true;
  }
  return false;
}

/** Backdoor strita: trzy rangi w oknie pięciu (as także jako 1) z udziałem karty gracza. */
function hasStraightBackdoor(hero: readonly [Card, Card], flop: readonly Card[]): boolean {
  const rangi = (cards: readonly Card[]): Set<number> => new Set(cards.flatMap((c) => (rankOf(c) === RANK_A ? [RANK_A, -1] : [rankOf(c)])));
  const wszystkie = rangi([...hero, ...flop]);
  const reka = rangi(hero);
  for (let lo = -1; lo + 4 <= RANK_A; lo++) {
    const okno = [0, 1, 2, 3, 4].map((k) => lo + k);
    if (okno.filter((r) => wszystkie.has(r)).length >= 3 && okno.some((r) => reka.has(r))) return true;
  }
  return false;
}

/** Backdoor w szerokim sensie (D-1116): koloru albo strita. Ręka z backdoorem nie jest „bez drawa”. */
function hasAnyBackdoor(hero: readonly [Card, Card], flop: readonly Card[]): boolean {
  return hasFlushBackdoor(hero, flop) || hasStraightBackdoor(hero, flop);
}

/**
 * Obrona BB wobec c-betu na flopie (R-M6-006 mały, R-M6-007 duży; heur). Oceniamy tylko to, co reguły mówią wprost; resztę odrzucamy (null, D-1116, 08-programista-001/002).
 * Mały (≤ 0,4 puli): call przy parze, dwóch parach i lepszych, drawie od {@link HOLDING_LIMITS}.drawOutsMin outów, backdoorze kolorowym obu kart ≥ T i asie w ręce;
 * gutshot bez pary: call (D-1167); backdoor strita z obiema kartami ≥ T: call (D-1168); fold tylko „bez pary i bez drawa” (bez żadnego drawa ani backdoora); backdoor strita lub koloru z kartą < T: null.
 * Duży (≥ 0,7): tylko zakres R-M6-007: dwie karty ≥ T, bez pary, drawa i backdoora → fold; wszystko inne (para, draw, backdoor, niższe karty, as z królem na stole): null.
 * Rozmiar między „małym” a „dużym” źródło nie rozstrzyga (null).
 */
export function defendVsCbet(hero: readonly [Card, Card], flop: readonly Card[], fraction: number): DefendAction | null {
  if (!Number.isFinite(fraction) || fraction <= 0) throw new Error(`defendVsCbet: rozmiar c-betu ${fraction} (ułamek puli > 0)`);
  const small = fraction <= DEFEND_SMALL_MAX;
  if (!small && fraction < DEFEND_BIG_MIN) return null;
  const h = classifyHolding(hero, flop);
  const outs = h.draw?.all.length ?? 0;
  const made = h.improvesBoard || h.pairKind !== null;
  const hasAce = hero.some((c) => rankOf(c) === RANK_A);
  if (!small) {
    // wyjątek źródła „as na suchym flopie z królem” jest tu zbędny: as i karta ≥ T z królem na stole to zawsze backdoor strita (A, K, T–Q w oknie T–A), czyli null
    if (made || outs > 0 || hasAnyBackdoor(hero, flop) || !hero.every((c) => rankOf(c) >= RANK_T)) return null;
    return 'fold';
  }
  if (made || outs >= HOLDING_LIMITS.drawOutsMin) return 'call'; // para, dwie pary i więcej (układ lepszy niż stół), draw
  if (hasAce) return 'call';
  const suited = suitOf(hero[0]) === suitOf(hero[1]);
  const backdoor = suited && flop.filter((c) => suitOf(c) === suitOf(hero[0])).length === 1 && hero.every((c) => rankOf(c) >= BACKDOOR_HIGH_MIN);
  if (backdoor) return 'call';
  if (outs > 0) return 'call'; // gutshot bez pary (D-1167): solver gutshotów nie pasuje; uproszczenie: „kontynuujesz” = call
  if (hasStraightBackdoor(hero, flop) && hero.every((c) => rankOf(c) >= BACKDOOR_HIGH_MIN)) return 'call'; // backdoor strita z dwiema kartami ≥ T (D-1168)
  return hasAnyBackdoor(hero, flop) ? null : 'fold'; // backdoor z kartą < T: null (otwarte pytanie D-1168)
}

/** R-M4-010: punkt „lista rąk”: oczekiwana akcja z jawnej listy klas w szablonie; ręka spoza listy → null (generator losuje tylko z listy). */
export interface ListEntry { hands: readonly string[]; correct: string; acceptable?: readonly string[] }
export function listHandVerdicts(handClass: string, entries: readonly ListEntry[]): { correct: string; acceptable: string[] } | null {
  const trafione = entries.filter((x) => x.hands.includes(handClass));
  if (trafione.length > 1) throw new Error(`listHandVerdicts: klasa ${handClass} w ${trafione.length} wpisach listy (jednoznaczna akcja oczekiwana)`);
  const e = trafione[0];
  return e ? { correct: e.correct, acceptable: [...(e.acceptable ?? [])] } : null;
}

/** R-M8-010 (math): sprawdzenie bluff-catcherem, gdy udział blefów > bet ÷ (pula + 2·bet); w marginesie marginMin od progu odpowiedzi brak (null, jak draw-call). */
export function riverCatchAction(bluffShare: number, pot: number, bet: number, marginMin: number): 'call' | 'fold' | null {
  if (!Number.isFinite(bluffShare) || bluffShare < 0 || bluffShare > 1 || !Number.isFinite(marginMin) || marginMin < 0) throw new Error(`riverCatchAction: udział blefów ${bluffShare} (0–1), margines ${marginMin} (≥ 0)`);
  const need = requiredEquity(pot, bet);
  if (Math.abs(bluffShare - need) < marginMin) return null;
  return bluffShare > need ? 'call' : 'fold';
}
