/**
 * Rozmieszczenie miejsc przy stole w trybie gry (M13) w punktach, dla zmierzonej szerokości i wysokości sukna.
 * Gracz siedzi u dołu pośrodku, rywale zgodnie z ruchem wskazówek zegara od lewego dolnego rogu. Żadne pole miejsca
 * nie wychodzi poza sukno w poziomie (bez przycinania na iPhonie) ani nie zachodzi na inne pole ani na karty wspólne.
 * Stół 9-osobowy: zwarte pola (pozycja i stack w jednej linii) w dwóch kolumnach po cztery miejsca, karty wspólne
 * w małym rozmiarze pośrodku.
 */

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SeatLayout {
  /** Pola miejsc w kolejności od gracza (indeks 0) zgodnie z ruchem wskazówek zegara. */
  seats: Box[];
  /** Obszar kart wspólnych i puli. */
  board: Box;
  boardSize: 'sm' | 'md';
  /** Zwarte pole miejsca (stół 9-osobowy). */
  compact: boolean;
}

/** Najmniejsza wysokość sukna, przy której układ się mieści (styl felt.minHeight). */
export const FELT_MIN_HEIGHT = 300;

/** Wymiary pól (pt): szerokość i wysokość w najgorszym przypadku (zakład albo odkryte karty). */
const SEAT = { regular: { w: 104, h: 88 }, compact: { w: 96, h: 64 } } as const;
/** Karty wspólne: 5 kart i odstępy (PlayingCard) plus linia puli. */
const BOARD = { md: { w: 5 * 40 + 4 * 6, h: 56 + 4 + 16 }, sm: { w: 5 * 22 + 4 * 2, h: 30 + 4 + 16 } } as const;

export function seatLayout(players: number, width: number, height: number): SeatLayout {
  const H = Math.max(height, FELT_MIN_HEIGHT);
  if (players === 9) {
    const { w, h } = SEAT.compact;
    const left = 0;
    const right = width - w;
    const row = (i: number) => (i * (H - h)) / 3;
    const center = (width - w) / 2;
    const at = (x: number, i: number): Box => ({ x, y: row(i), w, h });
    const b = BOARD.sm;
    return {
      // gracz, lewa kolumna od dołu do góry, prawa kolumna od góry do dołu
      seats: [at(center, 3), at(left, 3), at(left, 2), at(left, 1), at(left, 0), at(right, 0), at(right, 1), at(right, 2), at(right, 3)],
      board: { x: (width - b.w) / 2, y: (H - b.h) / 2, w: b.w, h: b.h },
      boardSize: 'sm',
      compact: true,
    };
  }
  if (players === 6) {
    const { w, h } = SEAT.regular;
    const b = BOARD.md;
    const board: Box = { x: (width - b.w) / 2, y: 0.36 * H, w: b.w, h: b.h };
    const x = (f: number) => Math.min(width - w, Math.max(0, f * width - w / 2));
    // boczne miejsca nad i pod kartami wspólnymi, gracz u dołu, jeden rywal u góry
    const upper = board.y - 4 - h;
    const lower = board.y + board.h + 4;
    return {
      seats: [
        { x: x(0.5), y: H - h, w, h },
        { x: x(0), y: lower, w, h },
        { x: x(0), y: Math.max(0, upper), w, h },
        { x: x(0.5), y: 0, w, h },
        { x: x(1), y: Math.max(0, upper), w, h },
        { x: x(1), y: lower, w, h },
      ],
      board,
      boardSize: 'md',
      compact: false,
    };
  }
  throw new Error(`seatLayout: brak układu dla ${players} graczy`);
}
