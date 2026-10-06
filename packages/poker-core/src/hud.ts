import { pick, randInt, type Rng } from './rng';

/**
 * Typy graczy po statystykach HUD (M10, reguła R-M10-005). Progi nie są tu wpisane: przychodzą z content/numbers.yaml
 * (klucze hud.*) przez parametry zadania, więc lekcja, reguła i generator używają tych samych liczb.
 *
 * Jednostki: VPIP, PFR i progi VPIP w punktach procentowych (14 = 14%), różnice VPIP − PFR w punktach procentowych,
 * próby w rękach.
 */
export type PlayerType = 'nit' | 'regular' | 'passive' | 'maniac' | 'unknown';

export const PLAYER_TYPES: readonly PlayerType[] = ['nit', 'regular', 'passive', 'maniac', 'unknown'];

export interface HudThresholds {
  /** nit: VPIP nie wyżej niż ten próg */
  nitMax: number;
  /** regular (reg): VPIP w przedziale [regLow, regHigh] i różnica nie większa niż passiveGap */
  regLow: number;
  regHigh: number;
  /** gracz luźny: VPIP od tego progu */
  loose: number;
  /** pasywny: różnica VPIP − PFR większa niż ten próg */
  passiveGap: number;
  /** maniak: gracz luźny z różnicą mniejszą niż ten próg */
  aggressiveGap: number;
  /** poniżej tylu rąk statystyki są przypadkowe */
  minHands: number;
  /** od tylu rąk czytamy VPIP i PFR */
  readHands: number;
}

export interface HudStats {
  hands: number;
  vpip: number;
  pfr: number;
}

export interface HudSpot extends HudStats {
  type: PlayerType;
}

/** Sprawdza, czy progi są spójne (inaczej generator nie ma z czego losować). */
export function checkHudThresholds(t: HudThresholds): void {
  const ok =
    t.nitMax > 4 &&
    t.nitMax < t.regLow - 1 &&
    t.regLow + 2 < t.regHigh &&
    t.regHigh < t.loose - 1 &&
    t.loose + 25 < 100 &&
    t.aggressiveGap >= 2 &&
    t.passiveGap >= t.aggressiveGap + 4 &&
    t.minHands >= 10 &&
    t.readHands > t.minHands;
  if (!ok) throw new Error(`Niespójne progi typów graczy: ${JSON.stringify(t)}`);
}

/**
 * Typ gracza według R-M10-005 albo null, gdy statystyki leżą w strefie przejściowej między typami (np. VPIP 16)
 * albo próba jest między „przypadkową” a „czytelną”. Generator nigdy nie losuje takich przypadków.
 */
export function classifyHud(s: HudStats, t: HudThresholds): PlayerType | null {
  if (s.hands < t.minHands) return 'unknown';
  if (s.hands < t.readHands) return null;
  const gap = s.vpip - s.pfr;
  if (s.vpip <= t.nitMax) return 'nit';
  if (s.vpip >= t.regLow && s.vpip <= t.regHigh && gap <= t.passiveGap) return 'regular';
  if (s.vpip >= t.loose && gap > t.passiveGap) return 'passive';
  if (s.vpip >= t.loose && gap < t.aggressiveGap) return 'maniac';
  return null;
}

/** Liczba całkowita z przedziału [lo, hi]. */
function between(rng: Rng, lo: number, hi: number): number {
  return lo + randInt(rng, hi - lo + 1);
}

function statsFor(rng: Rng, type: Exclude<PlayerType, 'unknown'>, t: HudThresholds): { vpip: number; pfr: number } {
  // losujemy wyraźnie wewnątrz strefy typu, z zapasem od granic
  switch (type) {
    case 'nit': {
      const vpip = between(rng, Math.max(4, t.nitMax - 8), t.nitMax - 1);
      return { vpip, pfr: vpip - between(rng, 1, Math.min(4, vpip - 2)) };
    }
    case 'regular': {
      const vpip = between(rng, t.regLow + 1, t.regHigh - 1);
      return { vpip, pfr: vpip - between(rng, 2, Math.max(2, Math.min(6, t.passiveGap - 3))) };
    }
    case 'passive': {
      const vpip = between(rng, t.loose + 3, t.loose + 25);
      return { vpip, pfr: vpip - between(rng, t.passiveGap + 4, Math.max(t.passiveGap + 4, vpip - 3)) };
    }
    case 'maniac': {
      const vpip = between(rng, t.loose + 3, t.loose + 20);
      return { vpip, pfr: vpip - between(rng, 1, t.aggressiveGap - 1) };
    }
  }
}

/**
 * Losowy rywal z HUD: typ (za mała próba rzadziej niż pozostałe), próba i statystyki wyraźnie w strefie typu.
 * Przy za małej próbie statystyki wyglądają jak u któregoś typu, żeby kusiły do oceny.
 */
export function generateHudSpot(rng: Rng, t: HudThresholds): HudSpot {
  checkHudThresholds(t);
  const type = pick(rng, ['nit', 'regular', 'passive', 'maniac', 'nit', 'regular', 'passive', 'maniac', 'unknown'] as const);
  const looksLike = type === 'unknown' ? pick(rng, ['nit', 'regular', 'passive', 'maniac'] as const) : type;
  const { vpip, pfr } = statsFor(rng, looksLike, t);
  const hands =
    type === 'unknown'
      ? between(rng, Math.max(5, Math.floor(t.minHands / 3)), t.minHands - 3)
      : between(rng, t.readHands + 20, t.readHands * 8);
  const spot: HudSpot = { hands, vpip, pfr, type };
  // obrona przed niespójnymi progami: wylosowany przypadek musi dać się jednoznacznie sklasyfikować
  if (classifyHud(spot, t) !== type) throw new Error(`generateHudSpot: ${JSON.stringify(spot)} nie pasuje do typu ${type}`);
  return spot;
}

/** Parametry zadania playerType: progi VPIP jako ułamki (jednostka percent w numbers.yaml), reszta jako liczby. */
const HUD_PERCENT_PARAMS = ['nitMax', 'regLow', 'regHigh', 'loose'] as const;
const HUD_COUNT_PARAMS = ['passiveGap', 'aggressiveGap', 'minHands', 'readHands'] as const;
export const HUD_PARAMS: readonly string[] = [...HUD_PERCENT_PARAMS, ...HUD_COUNT_PARAMS];

/**
 * Progi z parametrów zadania (po podstawieniu „n:klucz” przez content-build). Rzuca błąd przy brakującym albo
 * nieliczbowym parametrze i przy niespójnych progach.
 */
export function hudThresholdsFromParams(params: Record<string, unknown>): HudThresholds {
  const num = (k: string) => {
    const v = params[k];
    if (typeof v !== 'number' || !Number.isFinite(v)) throw new Error(`playerType: parametr ${k} musi być liczbą (n:klucz z numbers.yaml)`);
    return v;
  };
  const t = Object.fromEntries([
    ...HUD_PERCENT_PARAMS.map((k) => [k, Math.round(num(k) * 1000) / 10]),
    ...HUD_COUNT_PARAMS.map((k) => [k, num(k)]),
  ]) as unknown as HudThresholds;
  checkHudThresholds(t);
  return t;
}
