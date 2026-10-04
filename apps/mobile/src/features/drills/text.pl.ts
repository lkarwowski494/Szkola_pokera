import type { IcmCallSpot, IcmSpot } from '@szkola/poker-core';
import { cardsToString, combosCount, HandCategory, RANKS, rankOf, type Card, type FlopTexture, type HandResult, type TextureAxis, type WinReason, WETNESS_POINTS, WETNESS_THRESHOLDS } from '@szkola/poker-core';

/**
 * Teksty zadań generowanych, po polsku. Karty w tekście zapisujemy jako [[As Kd]],
 * a komponent RichText rysuje je jako małe karty.
 */

const CATEGORY_NAMES: Record<number, string> = {
  [HandCategory.StraightFlush]: 'poker',
  [HandCategory.FourOfAKind]: 'kareta',
  [HandCategory.FullHouse]: 'full',
  [HandCategory.Flush]: 'kolor',
  [HandCategory.Straight]: 'strit',
  [HandCategory.ThreeOfAKind]: 'trójka',
  [HandCategory.TwoPair]: 'dwie pary',
  [HandCategory.OnePair]: 'para',
  [HandCategory.HighCard]: 'wysoka karta',
};

/** Biernik („Obaj macie parę”), w mowie potocznej: mieć strita, fulla, pokera. */
const CATEGORY_NAMES_ACC: Record<number, string> = {
  [HandCategory.StraightFlush]: 'pokera',
  [HandCategory.FourOfAKind]: 'karetę',
  [HandCategory.FullHouse]: 'fulla',
  [HandCategory.Flush]: 'kolor',
  [HandCategory.Straight]: 'strita',
  [HandCategory.ThreeOfAKind]: 'trójkę',
  [HandCategory.TwoPair]: 'dwie pary',
  [HandCategory.OnePair]: 'parę',
  [HandCategory.HighCard]: 'wysoką kartę',
};

export function categoryName(r: Pick<HandResult, 'category' | 'strength'>): string {
  if (r.category === HandCategory.StraightFlush && r.strength === 1) return 'poker królewski';
  return CATEGORY_NAMES[r.category]!;
}

/** Nazwa układu w bierniku (kogo? co? mamy). */
export function categoryNameAcc(r: Pick<HandResult, 'category' | 'strength'>): string {
  if (r.category === HandCategory.StraightFlush && r.strength === 1) return 'pokera królewskiego';
  return CATEGORY_NAMES_ACC[r.category]!;
}

/** Polska odmiana po liczebniku: 1 out, 2–4 outy, 5 outów (12–14 jak 5). */
export function plural(n: number, one: string, few: string, many: string): string {
  const lastTwo = n % 100;
  const last = n % 10;
  return n === 1 ? one : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const cards = (c: readonly Card[]) => `[[${cardsToString(c)}]]`;

export function pct(x: number, decimals = 0): string {
  return `${(x * 100).toFixed(decimals).replace('.', ',')}%`;
}

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

const chips = (n: number) => n.toLocaleString('pl-PL').replace(/\s/g, ' ');
/** Nazwy graczy w zadaniach ICM: ty i gracze A, B, C w kolejności stacków z zadania. */
function icmName(s: IcmSpot, i: number): string {
  if (i === s.hero) return 'Ty';
  const others = s.stacks.map((_, j) => j).filter((j) => j !== s.hero);
  return `Gracz ${'ABC'[others.indexOf(i)]}`;
}
function icmTable(s: IcmSpot): string {
  const pays = s.payouts.map((p) => pct(p)).join(', ');
  const stacks = s.stacks.map((x, i) => `${icmName(s, i)} ${chips(x)}`).join(', ');
  return `${s.stacks.length} graczy, płatne ${s.payouts.length} miejsca (${pays} puli nagród). Stacki: ${stacks}.`;
}

export const t = {
  paint: {
    explanation: (title: string) =>
      `${title}. Zielone pole: grasz i zaznaczyłeś. Znak „−”: ręka z zakresu, której brakuje. Znak „+”: zaznaczona, a solver ją pasuje. Kropka: ręka mieszana (solver gra ją tylko czasem) albo sporna (solver odbiega w niej od publicznych tabel), więc jest zaliczona w obie strony. Wynik liczy kombinacje (para ${combosCount('AA')}, w kolorze ${combosCount('AKs')}, w różnych kolorach ${combosCount('AKo')}) tylko wśród rąk z zakresu albo zaznaczonych.`,
    score: (score: number, pass: number) => `Zgodność z solverem: ${pct(score)} (zaliczenie od ${pct(pass)}).`,
  },
  numeric: {
    yours: (v: string) => `Twoja odpowiedź: ${v}`,
    exact: (v: string) => `Dokładnie: ${v}`,
    diffPp: (d: number) => `Różnica: ${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1).replace('.', ',')} pp`,
    diff: (d: number) => `Różnica: ${d > 0 ? '+' : '−'}${String(Math.abs(Math.round(d * 100) / 100)).replace('.', ',')}`,
  },
  range: {
    fold: 'Pas',
    right: (f: number) => `Tak. Solver gra tak w ${pct(f)} przypadków.`,
    wrong: (f: number) => (f > 0 ? `Solver gra tak tylko w ${pct(f)} przypadków.` : 'Solver nigdy tak nie gra z tą ręką.'),
    explanation: (hc: string, freqs: { name: string; f: number }[], mixed: boolean) =>
      `${hc}: ${freqs.filter((x) => x.f >= 0.005).map((x) => `${x.name.toLowerCase()} ${pct(x.f)}`).join(', ')}.` +
      (mixed ? ' To ręka graniczna: solver miesza akcje, więc każda często grana odpowiedź jest dobra.' : ''),
  },
  whoWins: {
    prompt: 'Kto wygrywa to rozdanie?',
    hero: 'Ty',
    villain: 'Przeciwnik',
    split: 'Podział puli',
    facts: (hero: HandResult, villain: HandResult) =>
      `Twoja najlepsza piątka: ${cards(hero.bestFive)} (${categoryName(hero)}). Przeciwnik: ${cards(villain.bestFive)} (${categoryName(villain)}).`,
    reason: (reason: WinReason, winner: HandResult, loser: HandResult): string => {
      switch (reason) {
        case 'category':
          return `${capitalize(categoryName(winner))} jest wyżej w rankingu niż ${categoryName(loser)}.`;
        case 'kicker':
          return 'Układ jest ten sam, więc decyduje pierwsza różniąca się karta boczna (kicker) w najlepszej piątce.';
        case 'higher-same-category':
          return `Obaj macie ${categoryNameAcc(winner)}, ale jeden układ jest wyższy.`;
        case 'board-plays':
          return 'Najlepsza piątka obu graczy leży na stole, więc „gra stół” i pula jest dzielona.';
        case 'identical':
          return 'Najlepsze piątki mają te same rangi, więc pula jest dzielona.';
      }
    },
    yes: 'Tak.',
    no: 'Nie.',
  },
  bestHand: {
    prompt: 'Jaki jest twój najlepszy układ?',
    explanation: (r: HandResult) => `Najlepsza piątka z siedmiu kart: ${cards(r.bestFive)}, czyli ${categoryName(r)}.`,
    right: 'Tak, to twój najlepszy układ.',
    tooHigh: (name: string) => `Nie masz układu „${name}”. Sprawdź, czy naprawdę jest 5 pasujących kart.`,
    tooLow: (name: string) => `Masz coś lepszego niż „${name}”. Szukaj najwyższego układu.`,
  },
  outs: {
    prompt: (what: 'flush' | 'oesd' | 'gutshot') =>
      what === 'flush' ? 'Ile masz outów do koloru?' : 'Ile masz outów do strita?',
    explanation: (what: 'flush' | 'oesd' | 'gutshot', outs: number, hitNext: number, hitRiver: number, street: 'flop' | 'turn') => {
      const base =
        what === 'flush'
          ? 'Masz 4 karty w kolorze. W kolorze jest 13 kart, więc zostało 13 − 4 = 9.'
          : what === 'oesd'
            ? 'Masz 4 kolejne karty otwarte z obu stron. Strita daje każda z dwóch brakujących rang, po 4 kolory: 8 kart.'
            : 'Brakuje jednej karty w środku strita. Pasuje tylko jedna ranga, w 4 kolorach: 4 karty.';
      return street === 'flop'
        ? `${base} Szansa na turnie: ${pct(hitNext, 1)} (${outs} × 2 ≈ ${outs * 2}%). Do rivera, jeśli zobaczysz obie karty bez dopłaty (np. po all-in): ${pct(hitRiver, 1)} (${outs} × 4 ≈ ${outs * 4}%).`
        : `${base} Szansa na riverze: ${pct(hitNext, 1)} (${outs} × 2 ≈ ${outs * 2}%).`;
    },
    right: 'Tak.',
    wrong: (n: number, correct: number) => `Nie. ${n} to za ${n > correct ? 'dużo' : 'mało'} w tej sytuacji.`,
  },
  icm: {
    call: 'Sprawdzam',
    fold: 'Pasuję',
    callPrompt: (s: IcmCallSpot) =>
      `Bańka: ${icmTable(s)} ${icmName(s, s.villain)} wchodzi all-in, w grze między wami jest ${chips(s.atRisk)} żetonów. Twoja ręka ma ${pct(s.handEquity)} equity wobec jego zakresu. Blindy pomijamy. Co robisz?`,
    callRight: (s: IcmCallSpot) => `Tak. ${pct(s.handEquity)} to więcej niż potrzebne według ICM ${pct(s.required, 1)}.`,
    callWrong: (s: IcmCallSpot) =>
      `Nie. Według ICM potrzebujesz ${pct(s.required, 1)} equity, a masz ${pct(s.handEquity)}.` +
      (s.handEquity > s.requiredChips ? ' W grze o żetony sprawdzenie by się opłacało, ale przegrana kosztuje tu więcej pieniędzy, niż wygrana dodaje.' : ''),
    foldRight: (s: IcmCallSpot) =>
      `Tak. Według ICM potrzebujesz ${pct(s.required, 1)} equity, a masz tylko ${pct(s.handEquity)}.` +
      (s.handEquity > s.requiredChips ? ' W grze o żetony byłoby to sprawdzenie: to właśnie premia za ryzyko.' : ''),
    foldWrong: (s: IcmCallSpot) => `Nie. ${pct(s.handEquity)} equity wystarcza: według ICM próg to ${pct(s.required, 1)}.`,
    callExplanation: (s: IcmCallSpot) =>
      `Twoje equity w puli nagród: teraz ${pct(s.eqNow, 1)}, po wygranej ${pct(s.eqWin, 1)}, po przegranej ${pct(s.eqLose, 1)}. ` +
      `Bubble factor = strata ÷ zysk = ${pct(s.eqNow - s.eqLose, 1)} ÷ ${pct(s.eqWin - s.eqNow, 1)} ≈ ${s.bubbleFactor.toFixed(2).replace('.', ',')}, ` +
      `więc potrzebujesz BF ÷ (BF + 1) ≈ ${pct(s.required, 1)} equity. W grze o żetony wystarczyłoby ${pct(s.requiredChips)}.`,
    equityPrompt: (s: IcmSpot) => `${icmTable(s)} Ile według ICM jest wart twój stack (część puli nagród)?`,
    share: (x: number) => pct(x, 1),
    equityRight: 'Tak. To suma po miejscach: szansa na miejsce × wypłata za miejsce.',
    equityChips: 'Nie. To twój udział w żetonach. W turnieju z wypłatami żetony nie przeliczają się na pieniądze jeden do jednego.',
    equityFirstOnly: 'Nie. To tylko szansa na 1. miejsce × wypłata za 1. miejsce. Dolicz szanse na kolejne płatne miejsca.',
    equityExplanation: (s: IcmSpot, icm: number, share: number) =>
      `Szansa na 1. miejsce to twój stack ÷ wszystkie żetony (${pct(share, 1)}); kolejne miejsca liczysz tak samo spośród pozostałych graczy. ` +
      `Razem ${pct(icm, 1)} puli nagród, ${icm > share ? 'więcej' : 'mniej'} niż udział w żetonach.`,
  },
  potOdds: {
    prompt: (pot: number, bet: number) => `W puli jest ${pot}. Przeciwnik stawia ${bet}. Ile equity potrzebujesz do sprawdzenia?`,
    explanation: (pot: number, bet: number, req: number) =>
      `Pula po zakładzie to ${pot + bet}, dopłacasz ${bet}, razem ${pot + 2 * bet}. ${bet} ÷ ${pot + 2 * bet} ${eqSign(req)} ${pctEquity(req)}.`,
    right: 'Tak.',
    mistakeNoCall: 'Nie. To zakład podzielony przez pulę po zakładzie. Do mianownika dolicz też swoje sprawdzenie.',
    mistakeBetOverPot: 'Nie. To zakład podzielony przez pulę sprzed zakładu. Liczysz wobec wszystkiego, co możesz wygrać.',
    mistakeInverted:
      'Nie. To pula sprzed zakładu podzielona przez pulę po zakładzie, czyli ułamek odwrócony. Na górze ma być to, co dopłacasz, a na dole cała pula po twoim sprawdzeniu.',
  },
  drawCall: {
    prompt: (pot: number, bet: number, what: 'flush' | 'oesd' | 'gutshot', street: 'flop' | 'turn') =>
      `${street === 'flop' ? 'Flop' : 'Turn'}. W puli jest ${pot}, przeciwnik stawia ${bet}. Masz ${what === 'flush' ? 'dobieranie do koloru' : what === 'oesd' ? 'otwarte dobieranie do strita' : 'gutshot'}. Co robisz?`,
    call: 'Sprawdzam',
    fold: 'Pasuję',
    explanation: (s: { outs: number; unseen: number; hitNextCard: number; required: number; street: 'flop' | 'turn'; nearMiss: boolean }) => {
      const next = s.street === 'flop' ? 'na turnie' : 'na riverze';
      const why =
        s.street === 'flop'
          ? 'Liczy się szansa na jedną kartę, bo sprawdzasz tylko ten zakład: przed riverem zwykle zapłacisz kolejną cenę.'
          : 'Liczy się szansa na jedną kartę: została już tylko jedna.';
      const verdict =
        s.hitNextCard > s.required
          ? 'Szansa jest większa niż cena, więc sprawdzenie się opłaca.'
          : s.nearMiss
            ? `Szansa jest trochę mniejsza niż cena, więc samo sprawdzenie traci. Może się opłacić tylko dzięki implied odds, czyli gdy po trafieniu wygrasz więcej${s.street === 'flop' ? ', i pod warunkiem, że kolejna cena na turnie też nie będzie za wysoka' : ''}.`
            : 'Szansa jest wyraźnie mniejsza niż cena, więc sprawdzenie traci w długim terminie.';
      return `Masz ${s.outs} ${plural(s.outs, 'out', 'outy', 'outów')} z ${s.unseen} nieznanych kart, czyli ${pct(s.hitNextCard, 1)} szans ${next}. ${why} Potrzebujesz ${pctEquity(s.required)}. ${verdict}`;
    },
    right: 'Tak.',
    wrong: 'Nie.',
  },
};

// ---------- Tekstura flopa (M5) ----------

/** Nazwy wartości osi tekstury (te same słowa w lekcjach M5). */
export const TEXTURE_LABELS = {
  height: { high: 'Wysoki', middle: 'Średni', low: 'Niski' },
  suits: { rainbow: 'Tęczowy', 'two-tone': 'Dwukolorowy', monotone: 'Monotoniczny' },
  ranks: { paired: 'Sparowany', connected: 'Połączony', 'semi-connected': 'Półpołączony', disconnected: 'Rozłączony' },
  wetness: { dry: 'Suchy', medium: 'Pośredni', wet: 'Mokry' },
} as const satisfies { [A in TextureAxis]: Record<FlopTexture[A], string> };

export const TEXTURE_AXIS_LABELS: Record<TextureAxis, string> = {
  height: 'Wysokość',
  suits: 'Kolory',
  ranks: 'Rangi',
  wetness: 'Suchy czy mokry',
};

/** „1 punkt”, „2 punkty”, „5 punktów”. */
export function points(n: number): string {
  return `${n} ${plural(n, 'punkt', 'punkty', 'punktów')}`;
}

const WP = WETNESS_POINTS;
const WT = WETNESS_THRESHOLDS;

/** Skala mokrości słowami, liczby wprost ze stałych poker-core (jedno źródło prawdy). */
export const WETNESS_SCALE =
  `Liczymy punkty: strit możliwy na kilka sposobów (z co najmniej dwiema parami rang) ${WP.straight.made}, ` +
  `strit możliwy na jeden sposób ${WP.straight['made-one']}, samo dobieranie do strita ${WP.straight.draw}; ` +
  `flop dwukolorowy ${WP.suits['two-tone']}, monotoniczny ${WP.suits.monotone}. ` +
  `Suchy to 0–${WT.medium - 1}, pośredni ${WT.wet - 1 === WT.medium ? WT.medium : `${WT.medium}–${WT.wet - 1}`}, mokry ${WT.wet} i więcej`;

/** Definicje wartości (do wyjaśnienia każdej opcji). */
const TEXTURE_DEFS = {
  height: {
    high: 'flop wysoki ma najwyższą kartę asa, króla albo damę',
    middle: 'flop średni ma najwyższą kartę waleta albo dziesiątkę',
    low: 'flop niski ma najwyższą kartę dziewiątkę albo niższą',
  },
  suits: {
    rainbow: 'flop tęczowy ma trzy karty w trzech różnych kolorach, więc nikt nie ma jeszcze dobierania do koloru',
    'two-tone': 'flop dwukolorowy ma dwie karty w jednym kolorze, więc dwie karty gracza w tym kolorze dają dobieranie do koloru',
    monotone: 'flop monotoniczny ma wszystkie trzy karty w jednym kolorze, więc kolor jest już możliwy',
  },
  ranks: {
    paired: 'flop sparowany ma dwie albo trzy karty tej samej rangi; strit z dwiema kartami gracza jest wtedy niemożliwy, choć dobieranie do strita bywa możliwe',
    connected: 'flop połączony ma trzy różne rangi w obrębie pięciu kolejnych, więc strit jest możliwy już teraz (as liczy się też jako jedynka)',
    'semi-connected':
      'flop półpołączony ma dwie rangi w obrębie pięciu kolejnych, ale nie trzy: strita jeszcze nie ma, a dobieranie do strita (otwarte albo gutshot) już jest możliwe',
    disconnected: 'flop rozłączony ma rangi tak odległe, że żadne dwie nie mieszczą się w pięciu kolejnych, więc nikt nie ma nawet dobierania do strita',
  },
  wetness: {
    dry: `flop suchy daje mało dobierań. ${WETNESS_SCALE}`,
    medium: `flop pośredni daje część dobierań. ${WETNESS_SCALE}`,
    wet: `flop mokry daje dużo dobierań albo gotowe strity. ${WETNESS_SCALE}`,
  },
} as const satisfies { [A in TextureAxis]: Record<FlopTexture[A], string> };

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
    if ([...ranks].every((r) => window.includes(r))) {
      const missing = window.filter((r) => !ranks.has(r));
      return missing.map((r) => RANKS[r]).join('');
    }
  }
  return null;
}

/** Przykładowe dwie rangi, które z flopem dają dobieranie do strita (cztery rangi z pięciu w jednym oknie). */
export function straightDrawExample(flop: readonly Card[]): string | null {
  const ranks = new Set(flop.map(rankOf));
  for (const window of straightWindows()) {
    const onBoard = window.filter((r) => ranks.has(r));
    if (onBoard.length !== 2) continue;
    const missing = window.filter((r) => !ranks.has(r));
    return missing.slice(0, 2).map((r) => RANKS[r]).join('');
  }
  return null;
}

function topCard(flop: readonly Card[]): Card {
  return flop.reduce((a, b) => (rankOf(b) > rankOf(a) ? b : a));
}

function suitCountText(flop: readonly Card[]): string {
  const n = new Set(flop.map((c) => c & 3)).size;
  return n === 3 ? 'trzy różne kolory' : n === 2 ? 'dwie karty w jednym kolorze' : 'trzy karty w jednym kolorze';
}

/** Fakt o stritach na tym flopie (do wyjaśnienia rang). */
function rankFact(flop: readonly Card[], tex: FlopTexture): string {
  if (tex.ranks === 'connected') return `Tu strit jest możliwy, np. z ${straightExample(flop)}.`;
  const draw = tex.straightDrawPossible ? straightDrawExample(flop) : null;
  if (tex.ranks === 'paired') return draw ? `Tu dwie karty mają tę samą rangę; dobieranie do strita daje np. ${draw}.` : 'Tu dwie karty mają tę samą rangę.';
  if (tex.ranks === 'semi-connected') return `Tu strita jeszcze nie ma, ale dobieranie do strita daje np. ${draw}.`;
  return 'Tu żadne dwie karty gracza nie dadzą nawet dobierania do strita.';
}

/** Co na tym flopie daje dobierania i ile to punktów (do wyjaśnienia mokrości). */
function drawsText(flop: readonly Card[], tex: FlopTexture): string {
  const suitPts = WP.suits[tex.suits];
  const color =
    tex.suits === 'rainbow'
      ? 'nie ma dobierania do koloru (trzy różne kolory)'
      : tex.suits === 'two-tone'
        ? 'jest dobieranie do koloru (dwie karty w jednym kolorze)'
        : 'kolor jest już możliwy (trzy karty w jednym kolorze)';
  const ex = straightExample(flop);
  const drawEx = straightDrawExample(flop);
  const straight =
    tex.straight === 'made' && ex
      ? `strit jest możliwy na kilka sposobów, np. z ${ex}`
      : tex.straight === 'made-one' && ex
        ? `strit jest możliwy tylko na jeden sposób, z ${ex}`
        : tex.straightDrawPossible && drawEx
          ? `strita nie ma, ale jest dobieranie do strita, np. z ${drawEx}`
          : 'nie ma strita ani dobierania do strita';
  const straightPts = WP.straight[tex.straight];
  return `${color}: ${points(suitPts)}; ${straight}: ${points(straightPts)}. Razem ${points(tex.wetnessPoints)}`;
}

export const textureText = {
  prompt: (axes: readonly TextureAxis[]) =>
    axes.length === 1
      ? {
          height: 'Jak wysoki jest ten flop?',
          suits: 'Ile kolorów ma ten flop?',
          ranks: 'Czy ten flop jest sparowany, połączony, półpołączony czy rozłączony?',
          wetness: 'Czy ten flop jest suchy, pośredni czy mokry?',
        }[axes[0]!]
      : 'Oceń teksturę flopa w każdym wierszu.',
  /** Wyjaśnienie jednej opcji osi. */
  why: <A extends TextureAxis>(axis: A, option: FlopTexture[A], flop: readonly Card[], tex: FlopTexture): string => {
    const right = option === tex[axis];
    const def = (TEXTURE_DEFS[axis] as Record<string, string>)[option]!;
    const fact =
      axis === 'height'
        ? `Najwyższa karta to ${cards([topCard(flop)])}.`
        : axis === 'suits'
          ? `Tu: ${suitCountText(flop)}.`
          : axis === 'ranks'
            ? rankFact(flop, tex)
            : `Tu ${drawsText(flop, tex)}.`;
    return right ? `Tak: ${def}. ${fact}` : `Nie: ${def}. ${fact}`;
  },
  summary: (tex: FlopTexture) =>
    `Ten flop jest ${TEXTURE_LABELS.height[tex.height].toLowerCase()}, ${TEXTURE_LABELS.suits[tex.suits].toLowerCase()} i ${TEXTURE_LABELS.ranks[tex.ranks].toLowerCase()}, czyli ${TEXTURE_LABELS.wetness[tex.wetness].toLowerCase()} (${points(tex.wetnessPoints)} mokrości).`,
};
