import type { Rng } from './rng';
import { shuffle } from './rng';

/**
 * Karta to liczba 0–51: rangaIndex * 4 + kolorIndex.
 * Ranga: 2=0 … A=12. Kolor: s=0 (♠), h=1 (♥), d=2 (♦), c=3 (♣).
 * To samo kodowanie co w @pokertools/evaluator, więc ocena nie wymaga konwersji.
 */
export type Card = number;

export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] as const;
export const SUITS = ['s', 'h', 'd', 'c'] as const;
export type RankChar = (typeof RANKS)[number];
export type SuitChar = (typeof SUITS)[number];

export const SUIT_SYMBOLS: Record<SuitChar, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };

export function makeCard(rank: number, suit: number): Card {
  if (rank < 0 || rank > 12 || suit < 0 || suit > 3) throw new Error(`Nieprawidłowa karta: ${rank}/${suit}`);
  return rank * 4 + suit;
}

export function rankOf(card: Card): number {
  return card >> 2;
}

export function suitOf(card: Card): number {
  return card & 3;
}

export function parseCard(text: string): Card {
  if (text.length !== 2) throw new Error(`Nieprawidłowa karta: "${text}"`);
  const r = RANKS.indexOf(text[0]!.toUpperCase() as RankChar);
  const s = SUITS.indexOf(text[1]!.toLowerCase() as SuitChar);
  if (r < 0 || s < 0) throw new Error(`Nieprawidłowa karta: "${text}"`);
  return makeCard(r, s);
}

/** "As Kh" lub "AsKh" → [karty]. Pusty tekst → []. */
export function parseCards(text: string): Card[] {
  const compact = text.replace(/\s+/g, '');
  if (compact.length % 2 !== 0) throw new Error(`Nieprawidłowa lista kart: "${text}"`);
  const out: Card[] = [];
  for (let i = 0; i < compact.length; i += 2) out.push(parseCard(compact.slice(i, i + 2)));
  assertUnique(out);
  return out;
}

export function cardToString(card: Card): string {
  return `${RANKS[rankOf(card)]}${SUITS[suitOf(card)]}`;
}

export function cardsToString(cards: readonly Card[]): string {
  return cards.map(cardToString).join(' ');
}

export function isRed(card: Card): boolean {
  const s = suitOf(card);
  return s === 1 || s === 2;
}

export function assertUnique(cards: readonly Card[]): void {
  const seen = new Set<number>();
  for (const c of cards) {
    if (c < 0 || c > 51 || !Number.isInteger(c)) throw new Error(`Nieprawidłowa karta: ${c}`);
    if (seen.has(c)) throw new Error(`Powtórzona karta: ${cardToString(c)}`);
    seen.add(c);
  }
}

export const FULL_DECK: readonly Card[] = Array.from({ length: 52 }, (_, i) => i);

/** Talia bez podanych kart (np. widocznych na stole). */
export function remainingDeck(dead: readonly Card[]): Card[] {
  const deadSet = new Set(dead);
  return FULL_DECK.filter((c) => !deadSet.has(c));
}

/** Losuje n kart spoza `dead`. */
export function dealCards(rng: Rng, n: number, dead: readonly Card[] = []): Card[] {
  const deck = remainingDeck(dead);
  if (n > deck.length) throw new Error('Za mało kart w talii');
  return shuffle(rng, deck).slice(0, n);
}
