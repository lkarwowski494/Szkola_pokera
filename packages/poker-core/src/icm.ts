import { pick, type Rng } from './rng';

/**
 * Model niezależnych żetonów (ICM) Malmutha-Harville'a (M11). Szansa na 1. miejsce = stack ÷ suma stacków; gdy gracz k
 * zajmie 1. miejsce, gracz i zajmuje 2. z szansą stack_i ÷ (suma − stack_k), i tak dalej rekurencyjnie po pozostałych.
 * Equity gracza = suma po miejscach: szansa na miejsce × wypłata za miejsce. Jedno źródło dla formuły icm w treści
 * (content-build) i dla generatora zadań w aplikacji.
 */
export function icmEquities(stacks: readonly number[], payouts: readonly number[]): number[] {
  if (stacks.some((s) => !(s >= 0))) throw new Error('ICM: stacki muszą być nieujemne');
  if (payouts.length > stacks.length) throw new Error('ICM: więcej wypłat niż graczy');
  const out = stacks.map(() => 0);
  const walk = (left: number[], place: number, prob: number) => {
    if (place >= payouts.length || prob === 0) return;
    const total = left.reduce((s, i) => s + stacks[i]!, 0);
    if (total <= 0) return;
    for (const i of left) {
      const p = (prob * stacks[i]!) / total;
      out[i]! += p * payouts[place]!;
      walk(
        left.filter((j) => j !== i),
        place + 1,
        p,
      );
    }
  };
  walk(
    stacks.map((_, i) => i),
    0,
    1,
  );
  return out;
}

// ---------- Generator zadań: sprawdzić all-in na bańce według ICM ----------

/**
 * Struktury bańki do zadań: trzech graczy i dwa płatne miejsca albo czterech i trzy. Wypłaty to przykłady
 * dydaktyczne (te same co w lekcji m11.l3), nie dane z konkretnego turnieju.
 */
export const ICM_STRUCTURES: readonly { players: number; payouts: readonly number[] }[] = [
  { players: 3, payouts: [0.6, 0.4] },
  { players: 4, payouts: [0.5, 0.3, 0.2] },
];
/** Wszystkie żetony w grze i krok stacku w zadaniach (stacki to wielokrotności kroku, co najmniej dwa kroki). */
export const ICM_TOTAL_CHIPS = 10000;
export const ICM_STACK_STEP = 500;
/** Pomijamy decyzje bliżej progu niż 3 pp, żeby odpowiedź była jednoznaczna bez kalkulatora. */
export const ICM_CALL_MIN_GAP = 0.03;

export interface IcmSpot {
  stacks: number[];
  payouts: number[];
  /** Indeks gracza, który decyduje (ty). */
  hero: number;
}

export interface IcmCallSpot extends IcmSpot {
  /** Gracz, który wszedł all-in. */
  villain: number;
  /** Ile żetonów jest w grze między wami (mniejszy z dwóch stacków). */
  atRisk: number;
  /** Equity twojej ręki wobec zakresu all-inu (podane w zadaniu). */
  handEquity: number;
  eqNow: number;
  eqWin: number;
  eqLose: number;
  bubbleFactor: number;
  /** Potrzebne equity według ICM: (teraz − przegrana) ÷ (wygrana − przegrana) = BF ÷ (BF + 1). */
  required: number;
  /** Potrzebne equity w grze o żetony (blindy pominięte): ryzykujesz tyle, ile możesz wygrać. */
  requiredChips: number;
  correct: 'call' | 'fold';
}

function randomStacks(rng: Rng, players: number): number[] {
  const units = ICM_TOTAL_CHIPS / ICM_STACK_STEP;
  const stacks = Array.from({ length: players }, () => 2);
  for (let left = units - 2 * players; left > 0; left--) stacks[Math.floor(rng() * players)]! += 1;
  return stacks.map((u) => u * ICM_STACK_STEP);
}

/** Equity gracza `who` po rozdaniu: gracze z zerem odpadają, a ich miejsca są poza nagrodami (bańka). */
function equityAfter(stacks: number[], payouts: readonly number[], who: number): number {
  if (stacks[who]! <= 0) return 0;
  const alive = stacks.map((s, i) => [s, i] as const).filter(([s]) => s > 0);
  const eq = icmEquities(
    alive.map(([s]) => s),
    payouts.slice(0, alive.length),
  );
  return eq[alive.findIndex(([, i]) => i === who)]!;
}

export function generateIcmSpot(rng: Rng): IcmSpot {
  const s = pick(rng, ICM_STRUCTURES);
  return { stacks: randomStacks(rng, s.players), payouts: [...s.payouts], hero: Math.floor(rng() * s.players) };
}

export function generateIcmCall(rng: Rng): IcmCallSpot {
  for (;;) {
    const { stacks, payouts, hero } = generateIcmSpot(rng);
    const villain = (hero + 1 + Math.floor(rng() * (stacks.length - 1))) % stacks.length;
    const atRisk = Math.min(stacks[hero]!, stacks[villain]!);
    const after = (heroDelta: number) => stacks.map((x, i) => (i === hero ? x + heroDelta : i === villain ? x - heroDelta : x));
    const eqNow = icmEquities(stacks, payouts)[hero]!;
    const eqWin = equityAfter(after(atRisk), payouts, hero);
    const eqLose = equityAfter(after(-atRisk), payouts, hero);
    const required = (eqNow - eqLose) / (eqWin - eqLose);
    const handEquity = Math.round((0.3 + rng() * 0.45) * 100) / 100;
    if (Math.abs(handEquity - required) < ICM_CALL_MIN_GAP) continue;
    return {
      stacks,
      payouts,
      hero,
      villain,
      atRisk,
      handEquity,
      eqNow,
      eqWin,
      eqLose,
      bubbleFactor: (eqNow - eqLose) / (eqWin - eqNow),
      required,
      requiredChips: 0.5,
      correct: handEquity >= required ? 'call' : 'fold',
    };
  }
}
