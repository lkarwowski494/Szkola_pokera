import { cardsToString, HandCategory, type Card, type HandResult, type WinReason } from '@szkola/poker-core';

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
