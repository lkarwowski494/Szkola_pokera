import type { HudSpot, HudThresholds, IcmCallSpot, IcmSpot, PlayerType } from '@szkola/poker-core';
import { cardsToString, combosCount, HandCategory, RANKS, rankOf, type Card, type FlopTexture, type HandResult, type TextureAxis, type WinReason, WETNESS_POINTS, WETNESS_THRESHOLDS } from '@szkola/poker-core';
import { formatujLiczbe, jestJezykiem, ZRODLO, type Jezyk } from '@szkola/jezyki';
import i18n from '@/i18n';
import { MIXED_LOW, MIXED_MIN } from './thresholds';
import { RANGE_REASON, REASON_DIRECTION } from './range-reasons';
import { tr } from './terms';

/**
 * Teksty zadań generowanych. Brzmienie w słowniku interfejsu (`locales/<język>.json`, klucze `drill.*` z kontekstem,
 * D-288); tu tylko wybór klucza i parametry. Karty w tekście zapisujemy jako [[As Kd]], a komponent RichText rysuje je
 * jako małe karty. Znaczniki terminów {{t:…}} (w wartościach i w parametrach, np. nazwy układów) renderujemy raz, na
 * gotowym tekście (`L`), żeby nazwa angielska stała przy pierwszym użyciu terminu w całej jednostce (reguła T-01).
 * Tekst powstaje przy generowaniu zadania, w języku aktualnym w tej chwili.
 */

/** Język tekstów zadań (język aplikacji). */
export const jezykZadan = (): Jezyk => (jestJezykiem(i18n.language) ? i18n.language : ZRODLO);

type Param = string | number;
/** Surowy tekst klucza `drill.<k>` (znaczniki terminów nietknięte). */
const r = (k: string, p?: Record<string, Param>): string => (i18n.t as (k: string, o?: object) => string)(`drill.${k}`, p);
/** Znaczniki terminów w gotowym tekście, w języku zadań. */
export const trJ = (s: string): string => tr(s, jezykZadan());
/** Gotowy tekst klucza (jedna jednostka). */
const L = (k: string, p?: Record<string, Param>): string => trJ(r(k, p));
/** Zdania sklejone separatorem języka (pl, en: spacja; ja, zh: bez). */
export const zdania = (...xs: (string | false | null | undefined)[]): string =>
  xs.filter((x): x is string => !!x).reduce((a, b) => r('join.sentence', { a, b }));
const lista = (xs: readonly string[]): string => xs.join(r('join.list'));

const CATEGORY_KEY: Record<number, string> = {
  [HandCategory.StraightFlush]: 'straightFlush',
  [HandCategory.FourOfAKind]: 'fourOfAKind',
  [HandCategory.FullHouse]: 'fullHouse',
  [HandCategory.Flush]: 'flush',
  [HandCategory.Straight]: 'straight',
  [HandCategory.ThreeOfAKind]: 'threeOfAKind',
  [HandCategory.TwoPair]: 'twoPair',
  [HandCategory.OnePair]: 'pair',
  [HandCategory.HighCard]: 'highCard',
};
const categoryKey = (x: Pick<HandResult, 'category' | 'strength'>) => (x.category === HandCategory.StraightFlush && x.strength === 1 ? 'royalFlush' : CATEGORY_KEY[x.category]!);

/** Nazwa układu (surowa, ze znacznikiem terminu). */
export function categoryName(x: Pick<HandResult, 'category' | 'strength'>): string {
  return r(`category.${categoryKey(x)}`);
}

/** Nazwa układu w bierniku (kogo? co? mamy). */
export function categoryNameAcc(x: Pick<HandResult, 'category' | 'strength'>): string {
  return r(`categoryAcc.${categoryKey(x)}`);
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const cards = (c: readonly Card[]) => `[[${cardsToString(c)}]]`;

/** Procent w zapisie języka zadań; zaokrąglenie jak `toFixed` (stała liczba cyfr po przecinku). */
export function pct(x: number, decimals = 0): string {
  return r('format.percent', { n: formatujLiczbe(Number((x * 100).toFixed(decimals)), jezykZadan(), { miejsca: decimals }) });
}

/** Liczba w zapisie języka zadań (np. bubble factor, różnica). */
const num = (x: number, miejsca?: number) =>
  miejsca === undefined ? formatujLiczbe(x, jezykZadan()) : formatujLiczbe(Number(x.toFixed(miejsca)), jezykZadan(), { miejsca });

/** Czy pct(x) z pełnymi procentami albo jedną cyfrą po przecinku jest dokładne (bez zaokrąglenia). */
function exactAt(x: number, decimals: number): boolean {
  const v = x * 100 * 10 ** decimals;
  return Math.abs(v - Math.round(v)) < 1e-9;
}

/**
 * Potrzebne equity (pot odds), ta sama konwencja co eq.* w numbers.yaml: pełne procenty (33%, 29%), a gdy wynik ma
 * dokładnie jedną cyfrę po przecinku, z tą cyfrą (37,5%). Szanse trafienia (outy) pokazujemy z jedną cyfrą (19,6%).
 */
export function pctEquity(x: number): string {
  return !exactAt(x, 0) && exactAt(x, 1) ? pct(x, 1) : pct(x);
}

/** „=” gdy pctEquity pokazuje wynik dokładny, „≈” gdy zaokrąglony. */
export function eqSign(x: number): string {
  return exactAt(x, 0) || exactAt(x, 1) ? '=' : '≈';
}

const chips = (n: number) => num(n).replace(/\s/g, ' ');
/** Nazwy graczy w zadaniach ICM: ty i gracze A, B, C w kolejności stacków z zadania. */
function icmName(s: IcmSpot, i: number): string {
  if (i === s.hero) return r('icm.you');
  const others = s.stacks.map((_, j) => j).filter((j) => j !== s.hero);
  return r('icm.player', { letter: 'ABC'[others.indexOf(i)]! });
}
function icmTable(s: IcmSpot): string {
  return r('icm.table', {
    players: s.stacks.length,
    paid: s.payouts.length,
    payouts: lista(s.payouts.map((p) => pct(p))),
    stacks: lista(s.stacks.map((x, i) => r('icm.stack', { name: icmName(s, i), chips: chips(x) }))),
  });
}

/** „1 punkt”, „2 punkty”, „5 punktów”. */
export function points(n: number): string {
  return r('points', { count: n });
}

// ---------- Typy graczy po HUD (M10) ----------

/** Próg typu x i statystyki rywala; progi z treści (numbers.yaml, klucze hud.*). */
function hudFact(s: HudSpot, x: PlayerType, th: HudThresholds): string {
  const gap = s.vpip - s.pfr;
  switch (x) {
    case 'unknown':
      return r('playerType.fact.unknown', { minHands: th.minHands, hands: s.hands });
    case 'nit':
      return r('playerType.fact.nit', { nitMax: th.nitMax, vpip: s.vpip });
    case 'regular':
      return r('playerType.fact.regular', { low: th.regLow, high: th.regHigh, gapMax: points(th.passiveGap), vpip: s.vpip, gap });
    case 'passive':
      return r('playerType.fact.passive', { loose: th.loose, gapMin: points(th.passiveGap), vpip: s.vpip, gap });
    case 'maniac':
      return r('playerType.fact.maniac', { loose: th.loose, gapMax: points(th.aggressiveGap), vpip: s.vpip, gap });
  }
}
const sample = (n: number) => r('playerType.sample', { count: n });

// ---------- Zakresy (rangeDecision): powód z reguły spotu (KO-040) ----------

/** Miejsce ręki w zakresie spotu: w zakresie, poza nim, na granicy (ręka mieszana, ADR-04). */
export type RangeStatus = 'in' | 'out' | 'mixed';

/** Powód z reguły spotu, tylko gdy wspiera decyzję: wąski zakres przy ręce poza nim, szeroki przy ręce w nim. */
const rangeReason = (spot: string, st: RangeStatus): string | null => {
  const k = RANGE_REASON[spot];
  if (!k) return null;
  const dir = REASON_DIRECTION[k];
  return st === 'mixed' || (st === 'in' && dir === 'wide') || (st === 'out' && dir === 'tight') ? r(`range.reason.${k}`) : null;
};
/** Częstość słowami (dodatek po „bo”): ≥ 99,5% zawsze, ≥ 95% prawie zawsze, ≥ 75% zwykle, ≥ 50% częściej niż co drugi raz, niżej rzadziej. */
const oftenKey = (f: number) => (f >= 0.995 ? 'always' : f >= 0.95 ? 'almostAlways' : f >= 0.75 ? 'usually' : f >= 0.5 ? 'overHalf' : 'underHalf');
/** „Raz na N”: N = 1 ÷ ułamek, zaokrąglone do 0,5 (rachunek na danych zadania, przewodnik KO-040). */
export const razNa = (x: number): string => num(Math.round(2 / x) / 2);

export const t = {
  paint: {
    explanation: (title: string) =>
      L('paint.explanation', { title, pairCombos: combosCount('AA'), suitedCombos: combosCount('AKs'), offsuitCombos: combosCount('AKo') }),
    score: (score: number, pass: number) => L('paint.score', { score: pct(score), pass: pct(pass) }),
  },
  numeric: {
    yours: (v: string) => L('numeric.yours', { value: v }),
    exact: (v: string) => L('numeric.exact', { value: v }),
    diffPp: (d: number) => L('numeric.diffPp', { diff: `${d > 0 ? '+' : '−'}${num(Math.abs(d), 1)}` }),
    diff: (d: number) => L('numeric.diff', { diff: `${d > 0 ? '+' : '−'}${num(Math.abs(Math.round(d * 100) / 100))}` }),
  },
  range: {
    get fold() {
      return L('range.fold');
    },
    right: (f: number, st: RangeStatus, spot: string) =>
      trJ(zdania(r('range.right', { status: r(`range.status.${st}`) }), rangeReason(spot, st), r('range.freqRight', { pct: pct(f), often: r(`range.often.${oftenKey(f)}`) }))),
    acceptable: (f: number, st: RangeStatus, spot: string) =>
      trJ(zdania(r('range.acceptable', { status: r(`range.status.${st}`) }), rangeReason(spot, st), r('range.acceptableFreq', { pct: pct(f) }))),
    wrong: (f: number, st: RangeStatus, spot: string, chosenFold: boolean) =>
      trJ(
        zdania(
          r(chosenFold && st === 'in' ? 'range.wrongTight' : !chosenFold && st === 'out' ? 'range.wrongLoose' : 'range.wrongOther', { status: r(`range.status.${st}`) }),
          rangeReason(spot, st),
          f >= 0.005 ? r('range.wrongRare', { pct: pct(f) }) : f > 0 ? r('range.wrongVeryRare', { pct: pct(0.005, 1) }) : r('range.wrongNever'),
        ),
      ),
    /** Sytuacja → zagranie „bo” → powód z reguły spotu → częstości solvera jako dodatek (KO-040, BR-OCE-001). */
    explanation: (hc: string, freqs: { name: string; f: number }[], mixed: boolean, ctx: { title: string; spot: string; status: RangeStatus; action: string }) =>
      trJ(
        zdania(
          r('range.situation', { hand: hc, title: ctx.title }),
          ctx.status === 'in'
            ? r('range.playIn', { action: ctx.action.toLowerCase(), status: r('range.status.in') })
            : r(ctx.status === 'out' ? 'range.playOut' : 'range.playMixed', { status: r(`range.status.${ctx.status}`) }),
          rangeReason(ctx.spot, ctx.status),
          r('range.freqs', { hand: hc, freqs: lista(freqs.filter((x) => x.f >= 0.005).map((x) => r('range.freq', { action: x.name.toLowerCase(), pct: pct(x.f) }))) }),
          mixed && r('range.mixedNote', { low: pct(MIXED_LOW) }),
          freqs.some((x) => x.f >= MIXED_MIN && x.f < MIXED_LOW) && r('range.acceptableNote', { low: pct(MIXED_LOW), min: pct(MIXED_MIN, 1) }),
        ),
      ),
  },
  whoWins: {
    get prompt() {
      return L('whoWins.prompt');
    },
    get hero() {
      return L('whoWins.hero');
    },
    get villain() {
      return L('whoWins.villain');
    },
    get split() {
      return L('whoWins.split');
    },
    facts: (hero: HandResult, villain: HandResult) =>
      L('whoWins.facts', { heroCards: cards(hero.bestFive), heroHand: categoryName(hero), villainCards: cards(villain.bestFive), villainHand: categoryName(villain) }),
    reason: (reason: WinReason, winner: HandResult, loser: HandResult): string => {
      switch (reason) {
        case 'category':
          return L('whoWins.reason.category', { winner: capitalize(trJ(categoryName(winner))), loser: categoryName(loser) });
        case 'kicker':
          return L('whoWins.reason.kicker');
        case 'higher-same-category':
          return L('whoWins.reason.higherSameCategory', { hand: categoryNameAcc(winner) });
        case 'board-plays':
          return L('whoWins.reason.boardPlays');
        case 'identical':
          return L('whoWins.reason.identical');
      }
    },
    get yes() {
      return L('whoWins.yes');
    },
    get no() {
      return L('whoWins.no');
    },
  },
  bestHand: {
    get prompt() {
      return L('bestHand.prompt');
    },
    explanation: (x: HandResult) => L('bestHand.explanation', { cards: cards(x.bestFive), hand: categoryName(x) }),
    get right() {
      return L('bestHand.right');
    },
    tooHigh: (name: string) => L('bestHand.tooHigh', { hand: name }),
    tooLow: (name: string) => L('bestHand.tooLow', { hand: name }),
  },
  outs: {
    prompt: (what: 'flush' | 'oesd' | 'gutshot') => L(what === 'flush' ? 'outs.promptFlush' : 'outs.promptStraight'),
    explanation: (what: 'flush' | 'oesd' | 'gutshot', outs: number, hitNext: number, hitRiver: number, street: 'flop' | 'turn') => {
      const base = r(what === 'flush' ? 'outs.baseFlush' : what === 'oesd' ? 'outs.baseOesd' : 'outs.baseGutshot');
      const wspolne = { base, next: pct(hitNext, 1), outs, outs2: r('format.percent', { n: outs * 2 }) };
      return street === 'flop'
        ? L('outs.chanceFlop', { ...wspolne, river: pct(hitRiver, 1), outs4: r('format.percent', { n: outs * 4 }) })
        : L('outs.chanceTurn', wspolne);
    },
    get right() {
      return L('outs.right');
    },
    wrong: (n: number, correct: number, what: 'flush' | 'oesd' | 'gutshot') =>
      L(n > correct ? 'outs.wrongTooMany' : 'outs.wrongTooFew', { n, base: r(what === 'flush' ? 'outs.baseFlush' : what === 'oesd' ? 'outs.baseOesd' : 'outs.baseGutshot') }),
  },
  icm: {
    get call() {
      return L('icm.call');
    },
    get fold() {
      return L('icm.fold');
    },
    callPrompt: (s: IcmCallSpot) =>
      L('icm.callPrompt', { table: icmTable(s), villain: icmName(s, s.villain), atRisk: chips(s.atRisk), equity: pct(s.handEquity) }),
    callRight: (s: IcmCallSpot) => L('icm.callRight', { equity: pct(s.handEquity), required: pct(s.required, 1) }),
    callWrong: (s: IcmCallSpot) =>
      L(s.handEquity > s.requiredChips ? 'icm.callWrongChips' : 'icm.callWrong', { required: pct(s.required, 1), equity: pct(s.handEquity) }),
    foldRight: (s: IcmCallSpot) =>
      L(s.handEquity > s.requiredChips ? 'icm.foldRightChips' : 'icm.foldRight', { required: pct(s.required, 1), equity: pct(s.handEquity) }),
    foldWrong: (s: IcmCallSpot) => L('icm.foldWrong', { equity: pct(s.handEquity), required: pct(s.required, 1) }),
    callExplanation: (s: IcmCallSpot) =>
      L('icm.callExplanation', {
        now: pct(s.eqNow, 1),
        win: pct(s.eqWin, 1),
        lose: pct(s.eqLose, 1),
        loss: pct(s.eqNow - s.eqLose, 1),
        gain: pct(s.eqWin - s.eqNow, 1),
        bf: num(s.bubbleFactor, 2),
        required: pct(s.required, 1),
        requiredChips: pct(s.requiredChips),
      }),
    equityPrompt: (s: IcmSpot) => L('icm.equityPrompt', { table: icmTable(s) }),
    share: (x: number) => pct(x, 1),
    get equityRight() {
      return L('icm.equityRight');
    },
    get equityChips() {
      return L('icm.equityChips');
    },
    get equityFirstOnly() {
      return L('icm.equityFirstOnly');
    },
    equityExplanation: (_s: IcmSpot, icm: number, share: number) =>
      L(icm > share ? 'icm.equityExplanationMore' : 'icm.equityExplanationLess', { share: pct(share, 1), icm: pct(icm, 1) }),
  },
  playerType: {
    prompt: (s: HudSpot) => L('playerType.prompt', { vpip: s.vpip, pfr: s.pfr, sample: sample(s.hands) }),
    option: (x: PlayerType) => L(`playerType.name.${x}`),
    why: (s: HudSpot, x: PlayerType, th: HudThresholds) =>
      x === s.type
        ? L('playerType.whyRight', { fact: hudFact(s, x, th), adjust: r(`playerType.adjust.${x}`) })
        : s.type === 'unknown'
          ? L('playerType.whyWrongUnknown', { fact: hudFact(s, x, th), actualFact: hudFact(s, s.type, th) })
          : L('playerType.whyWrong', { fact: hudFact(s, x, th), actual: r(`playerType.name.${s.type}`), actualFact: hudFact(s, s.type, th) }),
    explanation: (s: HudSpot, th: HudThresholds) => {
      const read = s.hands < th.minHands ? r('playerType.readFew', { minHands: th.minHands }) : r('playerType.readEnough', { readHands: th.readHands });
      return L('playerType.explanation', { sample: sample(s.hands), read, fact: hudFact(s, s.type, th), adjust: r(`playerType.adjust.${s.type}`) });
    },
  },
  potOdds: {
    prompt: (pot: number, bet: number) => L('potOdds.prompt', { pot, bet }),
    explanation: (pot: number, bet: number, req: number) =>
      L('potOdds.explanation', { pot, bet, total: pot + 2 * bet, sign: eqSign(req), required: pctEquity(req), needN: razNa(req) }),
    get right() {
      return L('potOdds.right');
    },
    get mistakeNoCall() {
      return L('potOdds.mistakeNoCall');
    },
    get mistakeBetOverPot() {
      return L('potOdds.mistakeBetOverPot');
    },
    get mistakeInverted() {
      return L('potOdds.mistakeInverted');
    },
  },
  drawCall: {
    prompt: (pot: number, bet: number, what: 'flush' | 'oesd' | 'gutshot', street: 'flop' | 'turn') =>
      L(street === 'flop' ? 'drawCall.promptFlop' : 'drawCall.promptTurn', {
        pot,
        bet,
        draw: r(what === 'flush' ? 'drawCall.drawFlush' : what === 'oesd' ? 'drawCall.drawOesd' : 'drawCall.drawGutshot'),
      }),
    get call() {
      return L('drawCall.call');
    },
    get fold() {
      return L('drawCall.fold');
    },
    /** Sytuacja → decyzja „bo” → dlaczego jedna karta → cena z przełożeniem „raz na N” (KO-040). */
    explanation: (s: DrawCallText) => {
      const flop = s.street === 'flop';
      const call = s.correct === 'call';
      return trJ(
        zdania(
          r(flop ? 'drawCall.situationFlop' : 'drawCall.situationTurn', { draw: drawName(s.what), bet: s.bet, pot: s.pot }),
          r(call ? 'drawCall.decisionGood' : s.nearMiss ? 'drawCall.decisionNear' : 'drawCall.decisionBad'),
          r(flop ? 'drawCall.whyFlop' : 'drawCall.whyTurn'),
          r(flop ? 'drawCall.priceFlop' : 'drawCall.priceTurn', {
            required: pctEquity(s.required),
            needN: razNa(s.required),
            chance: pct(s.hitNextCard, 1),
            outs: r('drawCall.outs', { count: s.outs }),
            unseen: s.unseen,
            hitN: razNa(s.hitNextCard),
          }),
          !call && s.nearMiss && r(flop ? 'drawCall.impliedFlop' : 'drawCall.impliedTurn'),
        ),
      );
    },
    /** Dlaczego dobrze / dlaczego źle dla wybranej opcji (BR-OCE-002). */
    why: (s: DrawCallText, chosen: 'call' | 'fold') =>
      chosen === 'call'
        ? L(s.correct === 'call' ? 'drawCall.callRight' : 'drawCall.callWrong', { bet: s.bet })
        : L(s.correct === 'fold' ? 'drawCall.foldRight' : 'drawCall.foldWrong', { bet: s.bet }),
  },
};

/** Dane zadania drawCall potrzebne tekstom. */
interface DrawCallText {
  outs: number;
  unseen: number;
  hitNextCard: number;
  required: number;
  street: 'flop' | 'turn';
  nearMiss: boolean;
  pot: number;
  bet: number;
  what: 'flush' | 'oesd' | 'gutshot';
  correct: 'call' | 'fold';
}
const drawName = (what: 'flush' | 'oesd' | 'gutshot') => r(what === 'flush' ? 'drawCall.drawFlush' : what === 'oesd' ? 'drawCall.drawOesd' : 'drawCall.drawGutshot');

// ---------- Tekstura flopa (M5) ----------

/** Klucz słownika dla wartości osi (kod danych → klucz bez myślnika). */
const kl = (v: string) => v.replace(/-(\w)/g, (_m, c: string) => c.toUpperCase());

/** Nazwa wartości osi tekstury (te same słowa w lekcjach M5). */
export function textureLabel<A extends TextureAxis>(axis: A, v: FlopTexture[A]): string {
  return L(`texture.label.${axis}.${kl(String(v))}`);
}

/** Nazwa osi tekstury. */
export function textureAxisLabel(axis: TextureAxis): string {
  return L(`texture.axis.${axis}`);
}

const WP = WETNESS_POINTS;
const WT = WETNESS_THRESHOLDS;

/** Skala mokrości słowami, liczby wprost ze stałych poker-core (jedno źródło prawdy). */
function wetnessScale(): string {
  return r('texture.scale', {
    made: WP.straight.made,
    madeOne: WP.straight['made-one'],
    draw: WP.straight.draw,
    twoTone: WP.suits['two-tone'],
    monotone: WP.suits.monotone,
    dryMax: WT.medium - 1,
    medium: WT.wet - 1 === WT.medium ? WT.medium : r('texture.range', { from: WT.medium, to: WT.wet - 1 }),
    wet: WT.wet,
  });
}

/** Definicja wartości osi (do wyjaśnienia każdej opcji). */
const textureDef = (axis: TextureAxis, v: string) => r(`texture.def.${axis}.${kl(v)}`, axis === 'wetness' ? { scale: wetnessScale() } : undefined);

/** Okna strita od najwyższego (A–T) do najniższego (5–A), jako rangi 0–12 (as w oknie 5–A jako 12). */
function straightWindows(): number[][] {
  const out: number[][] = [];
  for (let top = 12; top >= 3; top--) out.push([0, 1, 2, 3, 4].map((k) => (top - k === -1 ? 12 : top - k)));
  return out;
}

/** Przykładowe dwie rangi, które z połączonym flopem dają strita (najwyższy możliwy strit). */
export function straightExample(flop: readonly Card[]): string | null {
  const ranks = new Set(flop.map(rankOf));
  if (ranks.size !== 3) return null;
  for (const window of straightWindows()) {
    if ([...ranks].every((x) => window.includes(x))) {
      const missing = window.filter((x) => !ranks.has(x));
      return missing.map((x) => RANKS[x]).join('');
    }
  }
  return null;
}

/** Przykładowe dwie rangi, które z flopem dają draw do strita (cztery rangi z pięciu w jednym oknie). */
export function straightDrawExample(flop: readonly Card[]): string | null {
  const ranks = new Set(flop.map(rankOf));
  for (const window of straightWindows()) {
    const onBoard = window.filter((x) => ranks.has(x));
    if (onBoard.length !== 2) continue;
    const missing = window.filter((x) => !ranks.has(x));
    return missing.slice(0, 2).map((x) => RANKS[x]).join('');
  }
  return null;
}

function topCard(flop: readonly Card[]): Card {
  return flop.reduce((a, b) => (rankOf(b) > rankOf(a) ? b : a));
}

function suitCountText(flop: readonly Card[]): string {
  const n = new Set(flop.map((c) => c & 3)).size;
  return r(n === 3 ? 'texture.suitCount.three' : n === 2 ? 'texture.suitCount.two' : 'texture.suitCount.one');
}

/** Fakt o stritach na tym flopie (do wyjaśnienia rang). */
function rankFact(flop: readonly Card[], tex: FlopTexture): string {
  if (tex.ranks === 'connected') return r('texture.rankFact.connected', { example: straightExample(flop) ?? '' });
  const draw = tex.straightDrawPossible ? straightDrawExample(flop) : null;
  if (tex.ranks === 'paired') return draw ? r('texture.rankFact.pairedDraw', { example: draw }) : r('texture.rankFact.paired');
  if (tex.ranks === 'semi-connected') return r('texture.rankFact.semiConnected', { example: draw ?? '' });
  return r('texture.rankFact.disconnected');
}

/** Co na tym flopie daje drawy i ile to punktów (do wyjaśnienia mokrości). */
function drawsText(flop: readonly Card[], tex: FlopTexture): string {
  const ex = straightExample(flop);
  const drawEx = straightDrawExample(flop);
  const straight =
    tex.straight === 'made' && ex
      ? r('texture.draws.straightMade', { example: ex })
      : tex.straight === 'made-one' && ex
        ? r('texture.draws.straightMadeOne', { example: ex })
        : tex.straightDrawPossible && drawEx
          ? r('texture.draws.straightDraw', { example: drawEx })
          : r('texture.draws.straightNone');
  return r('texture.draws.total', {
    color: r(`texture.draws.${kl(tex.suits)}`),
    colorPoints: points(WP.suits[tex.suits]),
    straight,
    straightPoints: points(WP.straight[tex.straight]),
    points: points(tex.wetnessPoints),
  });
}

export const textureText = {
  prompt: (axes: readonly TextureAxis[]) => L(axes.length === 1 ? `texture.prompt.${axes[0]!}` : 'texture.prompt.many'),
  /** Wyjaśnienie jednej opcji osi. */
  why: <A extends TextureAxis>(axis: A, option: FlopTexture[A], flop: readonly Card[], tex: FlopTexture): string => {
    const fact =
      axis === 'height'
        ? r('texture.factHeight', { card: cards([topCard(flop)]) })
        : axis === 'suits'
          ? r('texture.factSuits', { suits: suitCountText(flop) })
          : axis === 'ranks'
            ? rankFact(flop, tex)
            : r('texture.factWetness', { draws: drawsText(flop, tex) });
    return L(option === tex[axis] ? 'texture.whyRight' : 'texture.whyWrong', { def: textureDef(axis, String(option)), fact });
  },
  summary: (tex: FlopTexture) =>
    L('texture.summary', {
      height: textureLabel('height', tex.height).toLowerCase(),
      suits: textureLabel('suits', tex.suits).toLowerCase(),
      ranks: textureLabel('ranks', tex.ranks).toLowerCase(),
      wetness: textureLabel('wetness', tex.wetness).toLowerCase(),
      points: points(tex.wetnessPoints),
    }),
};

// ---------- Słownictwo (ćwiczenie vocab) ----------

interface VocabTerm {
  pl: string;
  en: string;
  enAlt: readonly string[];
  abbr?: string;
  /** Definicja z content/terms.yaml (pole def, po polsku). */
  def?: string;
}

/** Nazwa terminu w języku zadań: po polsku polska, w innym języku angielska (nazwy lokalne: fala 1, K-05). */
const nazwa = (x: VocabTerm) => (jezykZadan() === ZRODLO ? x.pl : x.en);
/** Definicja w języku zadań: termin przychodzi już z definicją tego języka (terminWJezyku w vocab.ts, D-335). */
const definicja = (x: VocabTerm) => x.def;

const vocabLine = (x: VocabTerm) =>
  nazwa(x).toLowerCase() === x.en.toLowerCase()
    ? r(x.abbr ? 'vocab.lineSameAbbr' : 'vocab.lineSame', { pl: nazwa(x), ...(x.abbr ? { abbr: x.abbr } : {}) })
    : r(x.abbr ? 'vocab.lineAbbr' : 'vocab.line', { pl: nazwa(x), en: x.en, ...(x.abbr ? { abbr: x.abbr } : {}) });
const vocabDef = (x: VocabTerm) => {
  const d = definicja(x);
  return d ? r('vocab.meaning', { def: d }) : null;
};

export const vocabText = {
  promptPlEn: (pl: string) => L('vocab.promptPlEn', { pl }),
  promptEnPl: (en: string) => L('vocab.promptEnPl', { en }),
  promptAbbr: (abbr: string) => L('vocab.promptAbbr', { abbr }),
  promptDef: (def: string) => L('vocab.promptDef', { def }),
  right: (x: VocabTerm) => L('vocab.right', { line: vocabLine(x) }),
  wrong: (x: VocabTerm, _enPl: boolean) => trJ(zdania(r('vocab.wrong', { line: vocabLine(x) }), vocabDef(x))),
  explanation: (x: VocabTerm) =>
    trJ(zdania(r('vocab.end', { line: vocabLine(x) }), vocabDef(x), x.enAlt.length > 0 && r('vocab.alsoSeen', { list: lista(x.enAlt) }))),
};
