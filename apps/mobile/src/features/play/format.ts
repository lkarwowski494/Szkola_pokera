import { cardToString, type Card, type MenuItem } from '@szkola/poker-core';
import type { TFunction } from 'i18next';

/** Kwota w bb po polsku: przecinek dziesiętny, najwyżej jedno miejsce po przecinku. */
export function fmtBb(bb: number): string {
  const r = Math.round(bb * 10) / 10;
  return (Number.isInteger(r) ? String(r) : r.toFixed(1)).replace('.', ',').replace('-', '−');
}

export function fmtPct(x: number, digits = 0): string {
  return `${(x * 100).toFixed(digits).replace('.', ',')}%`;
}

export const codes = (cards: readonly Card[]): string[] => cards.map(cardToString);

/** Napis na przycisku akcji (ADR-22: akcja z rozmiarem w jednym przycisku). */
export function menuLabel(t: TFunction, m: MenuItem): string {
  switch (m.kind) {
    case 'fold':
      return t('play.fold');
    case 'check':
      return t('play.check');
    case 'call':
      return t('play.call', { bb: fmtBb(m.bb) });
    case 'bet':
      return m.potFraction !== undefined ? t('play.betFrac', { pct: fmtPct(m.potFraction), bb: fmtBb(m.bb) }) : t('play.bet', { bb: fmtBb(m.bb) });
    case 'raise':
      return t('play.raise', { bb: fmtBb(m.bb) });
    case 'allin':
      return t('play.allin', { bb: fmtBb(m.bb) });
  }
}
