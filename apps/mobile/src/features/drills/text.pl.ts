import { cardsToString, combosCount, HandCategory, RANKS, rankOf, type Card, type FlopTexture, type HandResult, type TextureAxis, type WinReason } from '@szkola/poker-core';

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

export function categoryName(r: Pick<HandResult, 'category' | 'strength'>): string {
  if (r.category === HandCategory.StraightFlush && r.strength === 1) return 'poker królewski';
  return CATEGORY_NAMES[r.category]!;
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const cards = (c: readonly Card[]) => `[[${cardsToString(c)}]]`;

export function pct(x: number, decimals = 0): string {
  return `${(x * 100).toFixed(decimals).replace('.', ',')}%`;
}

export const t = {
  paint: {
    explanation: (title: string) =>
      `${title}. Zielone pole: grasz i zaznaczyłeś. Znak „−”: ręka z zakresu, której brakuje. Znak „+”: zaznaczona, a solver ją pasuje. Kropka: ręka mieszana, solver gra ją tylko czasem, więc jest zaliczona w obie strony. Wynik liczy kombinacje (para ${combosCount('AA')}, w kolorze ${combosCount('AKs')}, w różnych kolorach ${combosCount('AKo')}) tylko wśród rąk z zakresu albo zaznaczonych.`,
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
          return 'Układ jest ten sam, więc decyduje kicker, czyli najwyższa karta boczna w najlepszej piątce.';
        case 'higher-same-category':
          return `Obaj macie ${categoryName(winner)}, ale jeden układ jest wyższy.`;
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
    explanation: (what: 'flush' | 'oesd' | 'gutshot', outs: number, hit: number, street: 'flop' | 'turn') => {
      const base =
        what === 'flush'
          ? 'Masz 4 karty w kolorze. W kolorze jest 13 kart, więc zostało 13 − 4 = 9.'
          : what === 'oesd'
            ? 'Masz 4 kolejne karty otwarte z obu stron. Strita daje każda z dwóch brakujących rang, po 4 kolory: 8 kart.'
            : 'Brakuje jednej karty w środku strita. Pasuje tylko jedna ranga, w 4 kolorach: 4 karty.';
      return `${base} Szansa trafienia do rivera: ${pct(hit, 1)} (${street === 'flop' ? `${outs} × 4` : `${outs} × 2`} ≈ ${outs * (street === 'flop' ? 4 : 2)}%).`;
    },
    right: 'Tak.',
    wrong: (n: number, correct: number) => `Nie. ${n} to za ${n > correct ? 'dużo' : 'mało'} w tej sytuacji.`,
  },
  potOdds: {
    prompt: (pot: number, bet: number) => `W puli jest ${pot}. Przeciwnik stawia ${bet}. Ile equity potrzebujesz do sprawdzenia?`,
    explanation: (pot: number, bet: number, req: number) =>
      `Pula po zakładzie to ${pot + bet}, dopłacasz ${bet}, razem ${pot + 2 * bet}. ${bet} ÷ ${pot + 2 * bet} = ${pct(req, 1)}.`,
    right: 'Tak.',
    mistakeNoCall: 'Nie. To zakład podzielony przez pulę po zakładzie. Do mianownika dolicz też swoje sprawdzenie.',
    mistakeBetOverPot: 'Nie. To zakład podzielony przez pulę sprzed zakładu. Liczysz wobec wszystkiego, co możesz wygrać.',
    mistakeMdf: 'Nie. To MDF, czyli jak często bronić się przed zakładem, a nie ile equity potrzebujesz do sprawdzenia.',
  },
  drawCall: {
    prompt: (pot: number, bet: number, what: 'flush' | 'oesd' | 'gutshot') =>
      `Turn. W puli jest ${pot}, przeciwnik stawia ${bet}. Masz ${what === 'flush' ? 'dobieranie do koloru' : what === 'oesd' ? 'otwarte dobieranie do strita' : 'gutshot'}. Co robisz?`,
    call: 'Sprawdzam',
    fold: 'Pasuję',
    explanation: (outs: number, hit: number, req: number) =>
      `Masz ${outs} outów, czyli ${pct(hit, 1)} szans na riverze. Potrzebujesz ${pct(req, 1)}. ${hit > req ? 'Szansa jest większa niż cena, więc sprawdzenie się opłaca.' : 'Szansa jest mniejsza niż cena, więc sprawdzenie traci w długim terminie.'}`,
    right: 'Tak.',
    wrong: 'Nie.',
  },
};

// ---------- Tekstura flopa (M5) ----------

/** Nazwy wartości osi tekstury (te same słowa w lekcjach M5). */
export const TEXTURE_LABELS = {
  height: { high: 'Wysoki', middle: 'Średni', low: 'Niski' },
  suits: { rainbow: 'Tęczowy', 'two-tone': 'Dwukolorowy', monotone: 'Monotoniczny' },
  ranks: { paired: 'Sparowany', connected: 'Połączony', disconnected: 'Rozłączony' },
  wetness: { dry: 'Suchy', medium: 'Pośredni', wet: 'Mokry' },
} as const satisfies { [A in TextureAxis]: Record<FlopTexture[A], string> };

export const TEXTURE_AXIS_LABELS: Record<TextureAxis, string> = {
  height: 'Wysokość',
  suits: 'Kolory',
  ranks: 'Rangi',
  wetness: 'Suchy czy mokry',
};

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
    paired: 'flop sparowany ma dwie albo trzy karty tej samej rangi; strit z dwiema kartami gracza jest wtedy niemożliwy',
    connected: 'flop połączony ma trzy różne rangi w obrębie pięciu kolejnych, więc strit jest możliwy już teraz (as liczy się też jako jedynka)',
    disconnected: 'flop rozłączony ma trzy różne rangi zbyt odległe, żeby dwie karty gracza dały strita',
  },
  wetness: {
    dry: 'flop suchy nie daje żadnego dobierania: jest tęczowy i strit nie jest możliwy',
    medium: 'flop pośredni daje jedną drogę do dobierania: kolor albo strita',
    wet: 'flop mokry daje obie drogi naraz: kolor (dwa albo trzy karty w kolorze) i strita',
  },
} as const satisfies { [A in TextureAxis]: Record<FlopTexture[A], string> };

/** Przykładowe dwie rangi, które z połączonym flopem dają strita (najwyższy możliwy strit). */
export function straightExample(flop: readonly Card[]): string | null {
  const ranks = new Set(flop.map(rankOf));
  if (ranks.size !== 3) return null;
  for (let top = 12; top >= 3; top--) {
    const window = [0, 1, 2, 3, 4].map((k) => (top - k === -1 ? 12 : top - k));
    if ([...ranks].every((r) => window.includes(r))) {
      const missing = window.filter((r) => !ranks.has(r));
      return missing.map((r) => RANKS[r]).join('');
    }
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

/** Co na tym flopie daje dobierania (do wyjaśnienia mokrości). */
function drawsText(flop: readonly Card[], tex: FlopTexture): string {
  const color =
    tex.suits === 'rainbow'
      ? 'nie ma dobierania do koloru (trzy różne kolory)'
      : tex.suits === 'two-tone'
        ? 'jest dobieranie do koloru (dwie karty w jednym kolorze)'
        : 'kolor jest już możliwy (trzy karty w jednym kolorze)';
  const ex = straightExample(flop);
  const straight = tex.ranks === 'connected' && ex ? `strit jest możliwy, np. z ${ex}` : 'strit nie jest możliwy';
  return `${color}, ${straight}`;
}

export const textureText = {
  prompt: (axes: readonly TextureAxis[]) =>
    axes.length === 1
      ? {
          height: 'Jak wysoki jest ten flop?',
          suits: 'Ile kolorów ma ten flop?',
          ranks: 'Czy ten flop jest sparowany, połączony czy rozłączony?',
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
            ? tex.ranks === 'paired'
              ? 'Tu dwie karty mają tę samą rangę.'
              : tex.ranks === 'connected'
                ? `Tu strit jest możliwy, np. z ${straightExample(flop)}.`
                : 'Tu żadne dwie karty gracza nie dadzą strita.'
            : `Tu ${drawsText(flop, tex)}.`;
    return right ? `Tak: ${def}. ${fact}` : `Nie: ${def}. ${fact}`;
  },
  summary: (tex: FlopTexture) =>
    `Ten flop jest ${TEXTURE_LABELS.height[tex.height].toLowerCase()}, ${TEXTURE_LABELS.suits[tex.suits].toLowerCase()} i ${TEXTURE_LABELS.ranks[tex.ranks].toLowerCase()}, czyli ${TEXTURE_LABELS.wetness[tex.wetness].toLowerCase()}.`,
};
