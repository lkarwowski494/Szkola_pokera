import { POSITIONS, POSITIONS_9 } from './tree';

/** Węzeł decyzyjny w pliku wyniku solvera (content/ranges/preflop-*.json). */
export interface ResultSpot {
  path: string;
  player: string;
  raiseLevel: number;
  actions: string[];
  strategy: Record<string, number>[];
}
export interface ResultFile {
  meta: Record<string, unknown>;
  spots: ResultSpot[];
}

/** Pasy wczesnych pozycji 9-max, po których gra jest grą 6-max (TreeConfig.externalFolds, dokument 10). */
export const NINE_PREFIX = POSITIONS_9.slice(0, 3)
  .map((p) => `${p}:fold`)
  .join(',');

/** Nazwa pozycji 6-max w stole 9-max: UTG 6-max to LJ, reszta bez zmian. */
const to9 = (pos: string) => (pos === 'UTG' ? 'LJ' : pos);

/** Ścieżka węzła 6-max jako ścieżka 9-max: pasy UTG–UTG+2, potem te same akcje z nazwą LJ zamiast UTG. */
export function path6to9(path: string): string {
  const tail = path ? path.split(',').map((tok) => { const i = tok.indexOf(':'); return `${to9(tok.slice(0, i))}${tok.slice(i)}`; }) : [];
  return [NINE_PREFIX, ...tail].join(',');
}

/**
 * Plik 9-max: węzły policzone w drzewie 9-max (poddrzewa otwarć z UTG, UTG+1 i UTG+2) plus kanon 6-max jako
 * poddrzewo po pasach UTG–UTG+2. Ścieżki obu części są rozłączne; powtórzenie to błąd.
 */
export function mergeNine(nine: ResultFile, six: ResultFile, sixFile: string): ResultFile {
  if (nine.meta.players !== 9 || six.meta.players !== 6) throw new Error('mergeNine: oczekiwano wyniku 9-max i 6-max');
  for (const s of six.spots) if (!(POSITIONS as readonly string[]).includes(s.player)) throw new Error(`mergeNine: nieznana pozycja ${s.player}`);
  const moved = six.spots.map((s) => ({ ...s, path: path6to9(s.path), player: to9(s.player) }));
  const seen = new Set(nine.spots.map((s) => s.path));
  for (const s of moved) if (seen.has(s.path)) throw new Error(`mergeNine: węzeł ${s.path} w obu częściach`);
  const m6 = six.meta as { iterations?: number; nashConvBb?: number; eqr?: unknown; tree?: unknown };
  return {
    meta: {
      ...nine.meta,
      base6max: { file: sixFile, path: NINE_PREFIX, iterations: m6.iterations, nashConvBb: m6.nashConvBb, eqr: m6.eqr, tree: m6.tree },
    },
    spots: [...nine.spots, ...moved],
  };
}
