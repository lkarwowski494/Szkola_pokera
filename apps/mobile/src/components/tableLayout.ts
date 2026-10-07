import type { Inline } from '@szkola/content-schema';
import { space } from '@/theme/tokens';

const CARD_W = 24; // szerokość karty „sm” z odstępem (PlayingCard SIZES.sm + gap)
const MIN_TEXT_COL = 48;

/**
 * Szerokość kolumn tabeli. Kolumna z kartami ma stałą szerokość (karty się nie łamią), kolumny z tekstem
 * dostają szerokość z długości treści, a gdy całość nie mieści się w `avail`, kurczą się proporcjonalnie
 * (tekst się zawija). Przewijanie w poziomie zostaje tylko wtedy, gdy nawet minimalne kolumny są szersze niż ekran.
 */
export function columnWidths(head: Inline[][], rows: Inline[][][], avail?: number): number[] {
  const cards = (cell: Inline[]) => cell.reduce((n, it) => n + (it.t === 'cards' ? it.v.length : 0), 0);
  const textLen = (cell: Inline[]) => cell.reduce((n, it) => n + (it.t === 'text' ? it.v.length * 7.5 : 0), 0);
  const cols = head.map((_, c) => {
    const cells = [head[c]!, ...rows.map((r) => r[c] ?? [])];
    const maxCards = Math.max(...cells.map(cards));
    const fixed = maxCards > 0 ? maxCards * CARD_W + 4 + 2 * space.s : 0;
    const text = Math.max(...cells.map(textLen));
    const preferred = Math.max(MIN_TEXT_COL, fixed, Math.min(200, Math.ceil(text + 2 * space.s)));
    return { fixed, preferred };
  });
  const widths = cols.map((c) => c.preferred);
  const total = widths.reduce((a, b) => a + b, 0);
  if (!avail || total <= avail) return widths;
  // kurczymy tylko część „tekstową” kolumn (powyżej minimum), proporcjonalnie
  const floor = cols.map((c) => Math.max(MIN_TEXT_COL, c.fixed));
  const slack = widths.reduce((n, w, i) => n + (w - floor[i]!), 0);
  const excess = total - avail;
  if (slack <= 0) return widths;
  const k = Math.min(1, excess / slack);
  return widths.map((w, i) => Math.floor(w - (w - floor[i]!) * k));
}
