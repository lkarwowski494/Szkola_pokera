// Generator wariantów scenariusza (BR-GEN-001…003, D-531, D-533): szablon + poziom + ziarno → rozdanie z kartami ustalonymi
// przed pierwszą decyzją. Czysta logika, bez React Native. Rodzaj oceny w tym kroku: draw-call (rachunek: szansa na jedną
// kartę wobec ceny sprawdzenia, reguła draw-price), jak generateDrawCall.
import type { Card } from './cards';
import { dealCards, rankOf, suitOf } from './cards';
import { analyseOutsSpot, type DrawKind } from './drills';
import { requiredEquity } from './math';
import { createRng, pick } from './rng';
import { SUIT_PERMUTATIONS } from './situation';
import { classifyFlop, textureMatches, type TextureFilter } from './texture';

export const SCENARIO_LEVELS = ['latwy', 'sredni', 'trudny'] as const;
export type ScenarioLevel = (typeof SCENARIO_LEVELS)[number];

/** Warunki odrzucenia wariantu, który zmieniłby poprawną decyzję (BR-GEN-003). */
export type RejectCondition = 'rywal-ma-out-gracza' | 'stol-sparowany';

export interface DecisionSpec {
  street: 'flop' | 'turn';
  /** Pule do wylosowania na pierwszej decyzji (kolejne wynikają z linii: pula + 2 × zakład). */
  pots: readonly number[];
  /** Dopuszczalne ułamki puli w zakładzie rywala. */
  fractions: readonly number[];
}
export interface LevelBounds {
  draws: readonly DrawKind[];
  flop?: TextureFilter;
  /** Odległość szansy na trafienie od ceny (ułamek, 0,10 = 10 pp): marginMin ≤ odległość < marginMax (null = bez górnej granicy), zawsze > 0. */
  marginMin: number;
  marginMax: number | null;
  reject: readonly RejectCondition[];
  /**
   * Poprawna akcja w każdym punkcie decyzji tego poziomu, po jednej na punkt (BR-SZB-001, BR-GEN-003, D-556). Granice losowania
   * mają ją gwarantować: generator odrzuca wariant, w którym rachunek daje inną akcję, więc w poziomie decyzja się nie zmienia.
   */
  expected: readonly ('call' | 'fold')[];
}
export interface GeneratorTemplate {
  id: string;
  levels: Partial<Record<ScenarioLevel, LevelBounds>>;
  decisions: readonly DecisionSpec[];
}

export interface VariantDecision {
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
export interface ScenarioVariant {
  templateId: string;
  level: ScenarioLevel;
  seed: number;
  hero: [Card, Card];
  villain: [Card, Card];
  board: Card[];
  decisions: VariantDecision[];
  fingerprint: string;
}

export class TemplateError extends Error {}

/** Po ilu odrzuceniach z rzędu generator zgłasza błąd szablonu (BR-GEN-003). */
export const MAX_CONSECUTIVE_REJECTIONS = 1000;

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
  const d = t.decisions;
  if (d.length < 1 || d.length > 2 || d[0]!.street !== 'flop' || (d.length === 2 && d[1]!.street !== 'turn')) {
    throw new TemplateError(`${t.id}: decyzje to flop albo flop i turn`);
  }
  if (d[0]!.pots.length === 0) throw new TemplateError(`${t.id}: pierwsza decyzja bez puli do losowania`);
  if (d.some((x) => x.fractions.length === 0)) throw new TemplateError(`${t.id}: decyzja bez ułamków zakładu`);
}

/** Reguła draw-price: wołamy, gdy szansa na trafienie przewyższa cenę sprawdzenia. */
function decide(hit: number, required: number): 'call' | 'fold' {
  return hit > required ? 'call' : 'fold';
}

function inMargin(margin: number, b: LevelBounds): boolean {
  return margin > 0 && margin >= b.marginMin && (b.marginMax === null || margin < b.marginMax);
}

function tryVariant(t: GeneratorTemplate, level: ScenarioLevel, b: LevelBounds, seed: number, rng: () => number): ScenarioVariant | null {
  const cards = dealCards(rng, 9);
  const hero: [Card, Card] = [cards[0]!, cards[1]!];
  const villain: [Card, Card] = [cards[2]!, cards[3]!];
  const board = cards.slice(4);
  const flop = board.slice(0, 3);
  if (!textureMatches(classifyFlop(flop), b.flop ?? {})) return null;
  if (b.reject.includes('stol-sparowany') && new Set(flop.map(rankOf)).size < 3) return null;

  const decisions: VariantDecision[] = [];
  const outCards: Card[] = [];
  let pot = 0;
  let previousOuts: readonly Card[] = [];
  for (const [i, spec] of t.decisions.entries()) {
    const stol = board.slice(0, spec.street === 'flop' ? 3 : 4);
    if (i === 1 && previousOuts.includes(board[3]!)) return null; // linia: karta turnu nie trafia
    const spot = analyseOutsSpot(hero, stol);
    if (!spot || !(b.draws as readonly string[]).includes(spot.draw.kind)) return null;
    pot = i === 0 ? pick(rng, spec.pots) : pot + 2 * decisions[0]!.bet;
    const ok = spec.fractions
      .map((fraction) => {
        const bet = Math.round(pot * fraction);
        return { fraction, bet, margin: bet > 0 ? Math.abs(spot.hitNextCard - requiredEquity(pot, bet)) : 0 };
      })
      .filter((x) => inMargin(x.margin, b) && decide(spot.hitNextCard, requiredEquity(pot, x.bet)) === b.expected[i]); // BR-GEN-003: tylko oczekiwana akcja
    if (ok.length === 0) return null;
    const chosen = pick(rng, ok);
    const required = requiredEquity(pot, chosen.bet);
    decisions.push({
      street: spec.street, pot, bet: chosen.bet, fraction: chosen.fraction, required, hit: spot.hitNextCard, outs: spot.outs,
      kind: spot.draw.kind as DrawKind, correct: decide(spot.hitNextCard, required), margin: chosen.margin,
    });
    outCards.push(...spot.draw.all);
    previousOuts = spot.draw.all;
  }
  if (b.reject.includes('rywal-ma-out-gracza') && villain.some((c) => outCards.includes(c))) return null;
  const shown = board.slice(0, t.decisions.length === 2 ? 4 : 3);
  return { templateId: t.id, level, seed, hero, villain, board, decisions, fingerprint: variantFingerprint(t.id, level, hero, shown) };
}

/**
 * Wariant = szablon + poziom + ziarno (D-531): ręce i pięć kart stołu ustalone od razu, ten sam wynik dla tych samych
 * danych. Odrzuca losowania łamiące granice poziomu; po MAX_CONSECUTIVE_REJECTIONS odrzuceniach z rzędu zgłasza błąd szablonu.
 */
export function generateVariant(template: GeneratorTemplate, level: ScenarioLevel, seed: number): ScenarioVariant {
  validateTemplate(template);
  const bounds = template.levels[level];
  if (!bounds) throw new TemplateError(`${template.id}: brak poziomu ${level}`);
  if (bounds.expected.length !== template.decisions.length) {
    throw new TemplateError(`${template.id}: poziom ${level}: oczekiwanych akcji ${bounds.expected.length}, punktów decyzji ${template.decisions.length}`);
  }
  const rng = createRng(seed);
  for (let i = 0; i < MAX_CONSECUTIVE_REJECTIONS; i++) {
    const v = tryVariant(template, level, bounds, seed, rng);
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
