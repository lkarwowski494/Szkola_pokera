import type { IcmCallSpot, IcmSpot } from '@szkola/poker-core';
import { tr, trAll } from './terms';
import { cardsToString, combosCount, HandCategory, RANKS, rankOf, type Card, type FlopTexture, type HandResult, type TextureAxis, type WinReason, WETNESS_POINTS, WETNESS_THRESHOLDS } from '@szkola/poker-core';

/**
 * Teksty zadań generowanych, po polsku. Karty w tekście zapisujemy jako [[As Kd]],
 * a komponent RichText rysuje je jako małe karty.
 */

const CATEGORY_NAMES: Record<number, string> = {
  [HandCategory.StraightFlush]: '{{t:straight-flush}}',
  [HandCategory.FourOfAKind]: '{{t:four-of-a-kind}}',
  [HandCategory.FullHouse]: '{{t:full-house}}',
  [HandCategory.Flush]: '{{t:flush}}',
  [HandCategory.Straight]: '{{t:straight}}',
  [HandCategory.ThreeOfAKind]: '{{t:three-of-a-kind}}',
  [HandCategory.TwoPair]: '{{t:two-pair}}',
  [HandCategory.OnePair]: '{{t:pair}}',
  [HandCategory.HighCard]: '{{t:high-card}}',
};

/** Biernik („Obaj macie parę”), w mowie potocznej: mieć strita, fulla, pokera. */
const CATEGORY_NAMES_ACC: Record<number, string> = {
  [HandCategory.StraightFlush]: '{{t:straight-flush|pokera}}',
  [HandCategory.FourOfAKind]: '{{t:four-of-a-kind|karetę}}',
  [HandCategory.FullHouse]: '{{t:full-house|fulla}}',
  [HandCategory.Flush]: '{{t:flush}}',
  [HandCategory.Straight]: '{{t:straight|strita}}',
  [HandCategory.ThreeOfAKind]: '{{t:three-of-a-kind|trójkę}}',
  [HandCategory.TwoPair]: '{{t:two-pair}}',
  [HandCategory.OnePair]: '{{t:pair|parę}}',
  [HandCategory.HighCard]: '{{t:high-card|wysoką kartę}}',
};

export function categoryName(r: Pick<HandResult, 'category' | 'strength'>): string {
  if (r.category === HandCategory.StraightFlush && r.strength === 1) return '{{t:royal-flush}}';
  return CATEGORY_NAMES[r.category]!;
}

/** Nazwa układu w bierniku (kogo? co? mamy). */
export function categoryNameAcc(r: Pick<HandResult, 'category' | 'strength'>): string {
  if (r.category === HandCategory.StraightFlush && r.strength === 1) return '{{t:royal-flush|pokera królewskiego}}';
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
  return `${s.stacks.length} graczy, płatne ${s.payouts.length} miejsca (${pays} {{t:prize-pool|puli nagród}}). Stacki: ${stacks}.`;
}

export const t = trAll({
  paint: {
    explanation: (title: string) =>
      `${title}. Zielone pole: grasz i zaznaczyłeś. Znak „−”: ręka z {{t:range|zakresu}}, której brakuje. Znak „+”: zaznaczona, a solver ją {{t:fold|pasuje}}. Kropka: ręka mieszana (solver gra ją tylko czasem) albo sporna (solver odbiega w niej od publicznych tabel), więc jest zaliczona w obie strony. Wynik liczy {{t:combo|kombinacje}} ({{t:pair}} ${combosCount('AA')}, w kolorze ${combosCount('AKs')}, w różnych kolorach ${combosCount('AKo')}) tylko wśród rąk z {{t:range|zakresu}} albo zaznaczonych.`,
    score: (score: number, pass: number) => `Zgodność z solverem: ${pct(score)} (zaliczenie od ${pct(pass)}).`,
  },
  numeric: {
    yours: (v: string) => `Twoja odpowiedź: ${v}`,
    exact: (v: string) => `Dokładnie: ${v}`,
    diffPp: (d: number) => `Różnica: ${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1).replace('.', ',')} pp`,
    diff: (d: number) => `Różnica: ${d > 0 ? '+' : '−'}${String(Math.abs(Math.round(d * 100) / 100)).replace('.', ',')}`,
  },
  range: {
    fold: '{{t:fold|Pas}}',
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
    split: '{{t:split-pot|Podział puli}}',
    facts: (hero: HandResult, villain: HandResult) =>
      `Twoja najlepsza piątka: ${cards(hero.bestFive)} (${categoryName(hero)}). Przeciwnik: ${cards(villain.bestFive)} (${categoryName(villain)}).`,
    reason: (reason: WinReason, winner: HandResult, loser: HandResult): string => {
      switch (reason) {
        case 'category':
          return `${capitalize(tr(categoryName(winner)))} jest wyżej w rankingu niż ${categoryName(loser)}.`;
        case 'kicker':
          return 'Układ jest ten sam, więc decyduje pierwsza różniąca się karta boczna (kicker) w najlepszej piątce.';
        case 'higher-same-category':
          return `Obaj macie ${categoryNameAcc(winner)}, ale jeden układ jest wyższy.`;
        case 'board-plays':
          return 'Najlepsza piątka obu graczy leży na {{t:board|stole}}, więc „{{t:playing-the-board}}” i {{t:split-pot|pula jest dzielona}}.';
        case 'identical':
          return 'Najlepsze piątki mają te same rangi, więc {{t:split-pot|pula jest dzielona}}.';
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
      what === 'flush' ? 'Ile masz outów do {{t:flush|koloru}}?' : 'Ile masz outów do {{t:straight|strita}}?',
    explanation: (what: 'flush' | 'oesd' | 'gutshot', outs: number, hitNext: number, hitRiver: number, street: 'flop' | 'turn') => {
      const base =
        what === 'flush'
          ? 'Masz 4 karty w kolorze. W kolorze jest 13 kart, więc zostało 13 − 4 = 9.'
          : what === 'oesd'
            ? 'Masz 4 kolejne karty otwarte z obu stron. {{t:straight|Strita}} daje każda z dwóch brakujących rang, po 4 kolory: 8 kart.'
            : 'Brakuje jednej karty w środku {{t:straight|strita}}. Domyka go tylko jedna ranga, w 4 kolorach: 4 karty.';
      return street === 'flop'
        ? `${base} Szansa na turnie: ${pct(hitNext, 1)} (${outs} × 2 ≈ ${outs * 2}%). Do rivera, jeśli zobaczysz obie karty bez dopłaty (np. po all-in): ${pct(hitRiver, 1)} (${outs} × 4 ≈ ${outs * 4}%).`
        : `${base} Szansa na riverze: ${pct(hitNext, 1)} (${outs} × 2 ≈ ${outs * 2}%).`;
    },
    right: 'Tak.',
    wrong: (n: number, correct: number) => `Nie. ${n} to za ${n > correct ? 'dużo' : 'mało'} w tej sytuacji.`,
  },
  icm: {
    call: '{{t:call|Sprawdzam}}',
    fold: '{{t:fold|Pasuję}}',
    callPrompt: (s: IcmCallSpot) =>
      `{{t:bubble|Bańka}}: ${icmTable(s)} ${icmName(s, s.villain)} wchodzi all-in, w grze między wami jest ${chips(s.atRisk)} {{t:chips|żetonów}}. Twoja ręka ma ${pct(s.handEquity)} equity wobec jego {{t:range|zakresu}}. Blindy pomijamy. Co robisz?`,
    callRight: (s: IcmCallSpot) => `Tak. ${pct(s.handEquity)} to więcej niż potrzebne według {{t:icm}} ${pct(s.required, 1)}.`,
    callWrong: (s: IcmCallSpot) =>
      `Nie. Według {{t:icm}} potrzebujesz ${pct(s.required, 1)} equity, a masz ${pct(s.handEquity)}.` +
      (s.handEquity > s.requiredChips ? ' W grze o {{t:chips}} {{t:call}} by się opłacało, ale przegrana kosztuje tu więcej pieniędzy, niż wygrana dodaje.' : ''),
    foldRight: (s: IcmCallSpot) =>
      `Tak. Według {{t:icm}} potrzebujesz ${pct(s.required, 1)} equity, a masz tylko ${pct(s.handEquity)}.` +
      (s.handEquity > s.requiredChips ? ' W grze o {{t:chips}} byłoby to {{t:call}}: to właśnie {{t:risk-premium}}.' : ''),
    foldWrong: (s: IcmCallSpot) => `Nie. ${pct(s.handEquity)} equity wystarcza: według {{t:icm}} próg to ${pct(s.required, 1)}.`,
    callExplanation: (s: IcmCallSpot) =>
      `Twoje equity w {{t:prize-pool|puli nagród}}: teraz ${pct(s.eqNow, 1)}, po wygranej ${pct(s.eqWin, 1)}, po przegranej ${pct(s.eqLose, 1)}. ` +
      `Bubble factor = strata ÷ zysk = ${pct(s.eqNow - s.eqLose, 1)} ÷ ${pct(s.eqWin - s.eqNow, 1)} ≈ ${s.bubbleFactor.toFixed(2).replace('.', ',')}, ` +
      `więc potrzebujesz BF ÷ (BF + 1) ≈ ${pct(s.required, 1)} equity. W grze o {{t:chips}} wystarczyłoby ${pct(s.requiredChips)}.`,
    equityPrompt: (s: IcmSpot) => `${icmTable(s)} Ile według {{t:icm}} jest wart twój stack (część {{t:prize-pool|puli nagród}})?`,
    share: (x: number) => pct(x, 1),
    equityRight: 'Tak. To suma po miejscach: szansa na miejsce × {{t:payout}} za miejsce.',
    equityChips: 'Nie. To twój udział w {{t:chips|żetonach}}. W {{t:tournament|turnieju}} z {{t:payout|wypłatami}} {{t:chips}} nie przeliczają się na pieniądze jeden do jednego.',
    equityFirstOnly: 'Nie. To tylko szansa na 1. miejsce × {{t:payout}} za 1. miejsce. Dolicz szanse na kolejne płatne miejsca.',
    equityExplanation: (s: IcmSpot, icm: number, share: number) =>
      `Szansa na 1. miejsce to twój stack ÷ wszystkie {{t:chips}} (${pct(share, 1)}); kolejne miejsca liczysz tak samo spośród pozostałych graczy. ` +
      `Razem ${pct(icm, 1)} {{t:prize-pool|puli nagród}}, ${icm > share ? 'więcej' : 'mniej'} niż udział w {{t:chips|żetonach}}.`,
  },
  potOdds: {
    prompt: (pot: number, bet: number) => `W {{t:pot|puli}} jest ${pot}. Przeciwnik {{t:bet|stawia}} ${bet}. Ile equity potrzebujesz do {{t:call|sprawdzenia}}?`,
    explanation: (pot: number, bet: number, req: number) =>
      `{{t:pot|Pula}} po {{t:bet|zakładzie}} to ${pot + bet}, dopłacasz ${bet}, razem ${pot + 2 * bet}. ${bet} ÷ ${pot + 2 * bet} ${eqSign(req)} ${pctEquity(req)}.`,
    right: 'Tak.',
    mistakeNoCall: 'Nie. To {{t:bet}} podzielony przez {{t:pot|pulę}} po {{t:bet|zakładzie}}. Do mianownika dolicz też swoje {{t:call}}.',
    mistakeBetOverPot: 'Nie. To {{t:bet}} podzielony przez {{t:pot|pulę}} sprzed {{t:bet|zakładu}}. Liczysz wobec wszystkiego, co możesz wygrać.',
    mistakeInverted:
      'Nie. To {{t:pot}} sprzed {{t:bet|zakładu}} podzielona przez {{t:pot|pulę}} po {{t:bet|zakładzie}}, czyli ułamek odwrócony. Na górze ma być to, co dopłacasz, a na dole cała {{t:pot}} po twoim {{t:call|sprawdzeniu}}.',
  },
  drawCall: {
    prompt: (pot: number, bet: number, what: 'flush' | 'oesd' | 'gutshot', street: 'flop' | 'turn') =>
      `${street === 'flop' ? 'Flop' : 'Turn'}. W {{t:pot|puli}} jest ${pot}, przeciwnik {{t:bet|stawia}} ${bet}. Masz ${what === 'flush' ? '{{t:flush-draw}}' : what === 'oesd' ? '{{t:oesd}}' : 'gutshot'}. Co robisz?`,
    call: '{{t:call|Sprawdzam}}',
    fold: '{{t:fold|Pasuję}}',
    explanation: (s: { outs: number; unseen: number; hitNextCard: number; required: number; street: 'flop' | 'turn'; nearMiss: boolean }) => {
      const next = s.street === 'flop' ? 'na turnie' : 'na riverze';
      const why =
        s.street === 'flop'
          ? 'Liczy się szansa na jedną kartę, bo {{t:call|sprawdzasz}} tylko ten {{t:bet}}: przed riverem zwykle zapłacisz kolejną cenę.'
          : 'Liczy się szansa na jedną kartę: została już tylko jedna.';
      const verdict =
        s.hitNextCard > s.required
          ? 'Szansa jest większa niż cena, więc {{t:call}} się opłaca.'
          : s.nearMiss
            ? `Szansa jest trochę mniejsza niż cena, więc samo {{t:call}} traci. Może się opłacić tylko dzięki implied odds, czyli gdy po trafieniu wygrasz więcej${s.street === 'flop' ? ', i pod warunkiem, że kolejna cena na turnie też nie będzie za wysoka' : ''}.`
            : 'Szansa jest wyraźnie mniejsza niż cena, więc {{t:call}} traci w długim terminie.';
      return `Masz ${s.outs} ${plural(s.outs, 'out', 'outy', 'outów')} z ${s.unseen} nieznanych kart, czyli ${pct(s.hitNextCard, 1)} szans ${next}. ${why} Potrzebujesz ${pctEquity(s.required)}. ${verdict}`;
    },
    right: 'Tak.',
    wrong: 'Nie.',
  },
});

// ---------- Tekstura flopa (M5) ----------

/** Nazwy wartości osi tekstury (te same słowa w lekcjach M5). */
export const TEXTURE_LABELS = trAll({
  height: { high: 'Wysoki', middle: 'Średni', low: 'Niski' },
  suits: { rainbow: '{{t:rainbow|Tęczowy}}', 'two-tone': '{{t:two-tone|Dwukolorowy}}', monotone: '{{t:monotone|Monotoniczny}}' },
  ranks: { paired: '{{t:paired|Sparowany}}', connected: '{{t:connected|Połączony}}', 'semi-connected': 'Półpołączony', disconnected: '{{t:disconnected|Rozłączony}}' },
  wetness: { dry: '{{t:dry|Suchy}}', medium: 'Pośredni', wet: '{{t:wet|Mokry}}' },
} as const satisfies { [A in TextureAxis]: Record<FlopTexture[A], string> });

export const TEXTURE_AXIS_LABELS: Record<TextureAxis, string> = trAll({
  height: 'Wysokość',
  suits: 'Kolory',
  ranks: 'Rangi',
  wetness: '{{t:dry|Suchy}} czy {{t:wet}}',
});

/** „1 punkt”, „2 punkty”, „5 punktów”. */
export function points(n: number): string {
  return `${n} ${plural(n, 'punkt', 'punkty', 'punktów')}`;
}

const WP = WETNESS_POINTS;
const WT = WETNESS_THRESHOLDS;

/** Skala mokrości słowami, liczby wprost ze stałych poker-core (jedno źródło prawdy). */
export const WETNESS_SCALE =
  `Liczymy punkty: {{t:straight}} możliwy na kilka sposobów (z co najmniej dwoma zestawami dwóch rang) ${WP.straight.made}, ` +
  `{{t:straight}} możliwy na jeden sposób ${WP.straight['made-one']}, samo {{t:straight-draw}} ${WP.straight.draw}; ` +
  `flop {{t:two-tone}} ${WP.suits['two-tone']}, {{t:monotone}} ${WP.suits.monotone}. ` +
  `{{t:dry|Suchy}} to 0–${WT.medium - 1}, pośredni ${WT.wet - 1 === WT.medium ? WT.medium : `${WT.medium}–${WT.wet - 1}`}, {{t:wet}} ${WT.wet} i więcej`;

/** Definicje wartości (do wyjaśnienia każdej opcji). */
const TEXTURE_DEFS = {
  height: {
    high: 'flop wysoki ma najwyższą kartę asa, króla albo damę',
    middle: 'flop średni ma najwyższą kartę waleta albo dziesiątkę',
    low: 'flop niski ma najwyższą kartę dziewiątkę albo niższą',
  },
  suits: {
    rainbow: 'flop {{t:rainbow}} ma trzy karty w trzech różnych kolorach, więc nikt nie ma jeszcze {{t:flush-draw|dobierania do koloru}}',
    'two-tone': 'flop {{t:two-tone}} ma dwie karty w jednym kolorze, więc dwie karty gracza w tym kolorze dają {{t:flush-draw}}',
    monotone: 'flop {{t:monotone}} ma wszystkie trzy karty w jednym kolorze, więc {{t:flush}} jest już możliwy',
  },
  ranks: {
    paired: 'flop {{t:paired}} ma dwie albo trzy karty tej samej rangi; {{t:straight}} z dwiema kartami gracza jest wtedy niemożliwy, choć {{t:straight-draw}} bywa możliwe',
    connected: 'flop {{t:connected}} ma trzy różne rangi w obrębie pięciu kolejnych, więc {{t:straight}} jest możliwy już teraz (as liczy się też jako jedynka)',
    'semi-connected':
      'flop półpołączony ma dwie rangi w obrębie pięciu kolejnych, ale nie trzy: {{t:straight|strita}} jeszcze nie ma, a {{t:straight-draw}} (otwarte albo gutshot) już jest możliwe',
    disconnected: 'flop {{t:disconnected}} ma rangi tak odległe, że żadne dwie nie mieszczą się w pięciu kolejnych, więc nikt nie ma nawet {{t:straight-draw|dobierania do strita}}',
  },
  wetness: {
    dry: `flop {{t:dry}} daje mało {{t:draw|dobierań}}. ${WETNESS_SCALE}`,
    medium: `flop pośredni daje część {{t:draw|dobierań}}. ${WETNESS_SCALE}`,
    wet: `flop {{t:wet}} daje dużo {{t:draw|dobierań}} albo gotowe {{t:straight|strity}}. ${WETNESS_SCALE}`,
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
  if (tex.ranks === 'connected') return `Tu {{t:straight}} jest możliwy, np. z ${straightExample(flop)}.`;
  const draw = tex.straightDrawPossible ? straightDrawExample(flop) : null;
  if (tex.ranks === 'paired') return draw ? `Tu dwie karty mają tę samą rangę; {{t:straight-draw}} daje np. ${draw}.` : 'Tu dwie karty mają tę samą rangę.';
  if (tex.ranks === 'semi-connected') return `Tu {{t:straight|strita}} jeszcze nie ma, ale {{t:straight-draw}} daje np. ${draw}.`;
  return 'Tu żadne dwie karty gracza nie dadzą nawet {{t:straight-draw|dobierania do strita}}.';
}

/** Co na tym flopie daje dobierania i ile to punktów (do wyjaśnienia mokrości). */
function drawsText(flop: readonly Card[], tex: FlopTexture): string {
  const suitPts = WP.suits[tex.suits];
  const color =
    tex.suits === 'rainbow'
      ? 'nie ma {{t:flush-draw|dobierania do koloru}} (trzy różne kolory)'
      : tex.suits === 'two-tone'
        ? 'jest {{t:flush-draw}} (dwie karty w jednym kolorze)'
        : '{{t:flush}} jest już możliwy (trzy karty w jednym kolorze)';
  const ex = straightExample(flop);
  const drawEx = straightDrawExample(flop);
  const straight =
    tex.straight === 'made' && ex
      ? `{{t:straight}} jest możliwy na kilka sposobów, np. z ${ex}`
      : tex.straight === 'made-one' && ex
        ? `{{t:straight}} jest możliwy tylko na jeden sposób, z ${ex}`
        : tex.straightDrawPossible && drawEx
          ? `{{t:straight|strita}} nie ma, ale jest {{t:straight-draw}}, np. z ${drawEx}`
          : 'nie ma {{t:straight|strita}} ani {{t:straight-draw|dobierania do strita}}';
  const straightPts = WP.straight[tex.straight];
  return `${color}: ${points(suitPts)}; ${straight}: ${points(straightPts)}. Razem ${points(tex.wetnessPoints)}`;
}

export const textureText = trAll({
  prompt: (axes: readonly TextureAxis[]) =>
    axes.length === 1
      ? {
          height: 'Jak wysoki jest ten flop?',
          suits: 'Ile kolorów ma ten flop?',
          ranks: 'Czy ten flop jest {{t:paired}}, {{t:connected}}, półpołączony czy {{t:disconnected}}?',
          wetness: 'Czy ten flop jest {{t:dry}}, pośredni czy {{t:wet}}?',
        }[axes[0]!]
      : 'Oceń {{t:texture|teksturę}} flopa w każdym wierszu.',
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
});

// ---------- Słownictwo PL ↔ EN (ćwiczenie vocab) ----------

interface VocabTerm {
  pl: string;
  en: string;
  enAlt: readonly string[];
  abbr?: string;
}

const vocabLine = (t: VocabTerm) => `„${t.pl}” to po angielsku „${t.en}”${t.abbr ? `, skrót ${t.abbr}` : ''}`;

export const vocabText = {
  promptPlEn: (pl: string) => `Jak po angielsku nazywa się „${pl}”?`,
  promptEnPl: (en: string) => `Co po polsku znaczy „${en}”?`,
  promptAbbr: (abbr: string) => `Co oznacza skrót „${abbr}”?`,
  right: (t: VocabTerm) => `Tak: ${vocabLine(t)}.`,
  wrong: (t: VocabTerm, _enPl: boolean) => `Nie: ${vocabLine(t)}.`,
  explanation: (t: VocabTerm) => `${vocabLine(t)}.${t.enAlt.length ? ` Spotkasz też: ${t.enAlt.join(', ')}.` : ''}`,
};
