// Generator wariantów scenariusza (BR-GEN-001…003, D-531, D-533): szablon + poziom + ziarno → rozdanie z kartami ustalonymi
// przed pierwszą decyzją. Czysta logika, bez React Native. Rodzaj oceny w tym kroku: draw-call (rachunek: szansa na jedną
// kartę wobec ceny sprawdzenia, reguła draw-price), jak generateDrawCall.
import type { Card } from './cards';
import { dealCards, rankOf, suitOf } from './cards';
import { classCombos, classOf, HAND_CLASSES } from './ranges';
import { analyseOutsSpot, type DrawKind } from './drills';
import { nutOutsShare, NUT_DRAW_MIN_SHARE, rangeVerdict } from './grading';
import { classifyHolding } from './holding';
import { hitProbability, requiredEquity } from './math';
import { createRng, pick } from './rng';
import { SUIT_PERMUTATIONS } from './situation';
import { classifyFlop, textureMatches, type TextureFilter } from './texture';

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
}
export type DecisionSpec = DrawCallSpec | RangeSpotSpec;

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
}
export interface LevelBounds {
  draws: readonly DrawKind[];
  flop?: TextureFilter;
  /** Odległość szansy na trafienie od ceny (ułamek, 0,10 = 10 pp): marginMin ≤ odległość < marginMax (null = bez górnej granicy), zawsze > 0. */
  marginMin: number;
  marginMax: number | null;
  reject: readonly RejectCondition[];
  /** F5: tylko draw „do najlepszej ręki” (udział nutowych outów ≥ NUT_DRAW_MIN_SHARE). */
  drawToBest?: boolean;
  /** F5: margines osobno na punkt decyzji (po jednym na punkt); zastępuje marginMin/marginMax. */
  margins?: readonly { min: number; max: number | null }[];
  /** F1: przedział częstości akcji oczekiwanej na punkt decyzji range-spot (null = inny rodzaj punktu); min ≤ f ≤ max. */
  freqs?: readonly ({ min: number; max: number } | null)[];
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
export type VariantDecision = DrawCallVariantDecision | RangeSpotVariantDecision;
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

/** Po ilu odrzuceniach z rzędu generator zgłasza błąd szablonu (BR-GEN-003). */
export const MAX_CONSECUTIVE_REJECTIONS = 5000; // BR-GEN-003 mówi 1000; po odrzuceniu gotowych rąk (06-tresci-201) sc-19 miał ok. 0,5% rozdań dla poziomu, więc 1000 kończyło się sporadycznym błędem szablonu (D-665, do weta)

/** Martwe blindy w puli przed flopem (SB 0,5 + BB 1): wkład gracza preflop ≈ (pula − 1,5) ÷ 2 (F5, linia all-in; jak test szablony-bs). */
const MARTWE_BLINDY_BB = 1.5;
const IDENTITY: readonly number[] = [0, 1, 2, 3];
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
  const ranges = all.filter((x) => x.kind === 'range-spot');
  const d = all.filter((x): x is DrawCallSpec => x.kind !== 'range-spot');
  if (all.length < 1 || all.length > 2) throw new TemplateError(`${t.id}: szablon ma 1 albo 2 punkty decyzji`);
  if (ranges.length > 1 || (ranges.length === 1 && all[0]!.kind !== 'range-spot')) throw new TemplateError(`${t.id}: punkt range-spot jest najwyżej jeden i pierwszy`);
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
  const m = b.margins?.[i] ?? { min: b.marginMin, max: b.marginMax };
  return margin > 0 && margin >= m.min && (m.max === null || margin < m.max);
}

/** F1: klasy rąk, w których akcja oczekiwana ma częstość z przedziału poziomu i werdykt „zgodna” (ADR-26); klasy niepewne pominięte. */
function eligibleClasses(spot: RangeSpotData, expected: string, range: { min: number; max: number }, ctx: GeneratorContext): { hc: string; h: number }[] {
  const idx = spot.actions.findIndex((a) => a.label === expected);
  if (idx < 0) return [];
  const out: { hc: string; h: number }[] = [];
  HAND_CLASSES.forEach((hc, h) => {
    if (spot.uncertain.includes(hc)) return;
    const freqs = spot.actions.map((a) => a.freqs[h]!);
    const f = freqs[idx]!;
    if (f >= range.min && f <= range.max && rangeVerdict(freqs, ctx.thresholds)[idx] === 'correct') out.push({ hc, h });
  });
  return out;
}

function tryVariant(t: GeneratorTemplate, level: ScenarioLevel, b: LevelBounds, seed: number, rng: () => number, ctx: GeneratorContext | undefined): ScenarioVariant | null {
  const first = t.decisions[0]!;
  let hero: [Card, Card];
  let rest: Card[];
  let preflop: RangeSpotVariantDecision | null = null;
  if (first.kind === 'range-spot') {
    if (!ctx) throw new TemplateError(`${t.id}: punkt range-spot wymaga danych zakresów (GeneratorContext)`);
    const spot = ctx.spots.find((x) => x.id === first.spot);
    if (!spot) throw new TemplateError(`${t.id}: nieznany spot ${first.spot}`);
    const expected = b.expected[0]!;
    const range = b.freqs?.[0];
    if (!range) throw new TemplateError(`${t.id}: poziom ${level}: punkt range-spot bez przedziału freqs`);
    const classes = eligibleClasses(spot, expected, range, ctx);
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

  const points: VariantDecision[] = preflop ? [preflop] : [];
  const draws: DrawCallVariantDecision[] = [];
  const outCards: Card[] = [];
  let pot = 0;
  let previousOuts: readonly Card[] = [];
  for (const [i, spec] of t.decisions.entries()) {
    if (spec.kind === 'range-spot') continue;
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
    const linie = allIn ? [Math.round(t.stackBb! - (pot - MARTWE_BLINDY_BB) / 2)] : spec.fractions.map((f) => Math.round(pot * f));
    // ŚR-203: zakład nie jest większy niż stos gracza za pulą (stackBb − wkład przed flopem − wcześniejsze zakłady); bez stackBb bez ograniczenia
    const stosGracza = typeof t.stackBb === 'number' ? t.stackBb - ((k === 0 ? pot : draws[0]!.pot) - MARTWE_BLINDY_BB) / 2 - draws.reduce((sum, x) => sum + x.bet, 0) : Infinity;
    const ok = linie
      .filter((bet) => allIn || bet <= stosGracza) // all-in to z definicji cały stos (zaokrąglony)
      .map((bet) => ({ fraction: bet / pot, bet, margin: bet > 0 ? Math.abs(hit - requiredEquity(pot, bet)) : 0 }))
      .filter((x) => inMargin(x.margin, b, i) && decide(hit, requiredEquity(pot, x.bet)) === b.expected[i]); // BR-GEN-003: tylko oczekiwana akcja
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
  const last = [...t.decisions].reverse().find((x) => x.kind !== 'range-spot');
  const shown = last ? board.slice(0, last.street === 'turn' ? 4 : 3) : [];
  return { templateId: t.id, level, seed, hero, villain, board, decisions: draws, points, fingerprint: variantFingerprint(t.id, level, hero, shown) };
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

/** Podstawia znaczniki wartościami wariantu; nieznany znacznik to błąd (nie cichy napis w treści dla użytkownika). */
export function fillVariantMarkers(text: string, values: Record<VariantMarker, string>): string {
  const wynik = text.replace(VARIANT_MARKER_RE, (_all, name: string) => {
    if (!(VARIANT_MARKERS as readonly string[]).includes(name)) throw new TemplateError(`nieznany znacznik wariantu {{w:${name}}}`);
    return values[name as VariantMarker];
  });
  if (wynik.includes('{{w:')) throw new TemplateError('niedomknięty znacznik wariantu {{w:');
  return wynik;
}
