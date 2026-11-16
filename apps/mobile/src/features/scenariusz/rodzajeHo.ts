import type { VariantDecision } from '@szkola/poker-core';
import { formatujLiczbe } from '@szkola/jezyki';
import { jezykZadan } from '@/features/drills/text';

type TFn = (k: string, o?: Record<string, unknown>) => string;

/**
 * Ruch przed decyzją gracza w punktach HO (IB, D-1841), istniejące wpisy dziennika `play.log.*` (inwentarz 04, docs/design/scenariusz-i-ocena.md:97-109):
 * spr-call — all-in rywala na stack za pulą; check-raise — c-bet rywala (jak defend); turn-action i geo-size — rywal czeka (jak cbet-case, river-value);
 * nit-3bet — twoje otwarcie i 3-bet rywala. `undefined`: punkt spoza HO (decyduje dotychczasowy `ruchRywala`).
 */
export function ruchRywalaHo(d: VariantDecision, pozycje: { readonly hero: string; readonly villain: string }, t: TFn): string | undefined {
  const bb = (x: number) => formatujLiczbe(x, jezykZadan());
  const rywal = pozycje.villain;
  switch (d.point) {
    case 'spr-call': return t('play.log.allin', { pos: rywal, bb: bb(d.stack) });
    case 'check-raise': return t('play.log.bet', { pos: rywal, bb: bb(d.cbet) });
    case 'turn-action':
    case 'geo-size': return t('play.log.check', { pos: rywal });
    case 'nit-3bet': return [t('play.log.raise', { pos: pozycje.hero, bb: bb(d.open) }), t('play.log.raise', { pos: rywal, bb: bb(d.threeBet) })].join('. ');
    default: return undefined;
  }
}
