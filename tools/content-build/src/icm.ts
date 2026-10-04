/**
 * Model niezależnych żetonów (ICM) Malmutha-Harville'a (M11). Szansa na 1. miejsce = stack ÷ suma stacków; gdy gracz k
 * zajmie 1. miejsce, gracz i zajmuje 2. z szansą stack_i ÷ (suma − stack_k), i tak dalej rekurencyjnie po pozostałych.
 * Equity gracza = suma po miejscach: szansa na miejsce × wypłata za miejsce.
 */
export function icmEquities(stacks: number[], payouts: number[]): number[] {
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
      walk(left.filter((j) => j !== i), place + 1, p);
    }
  };
  walk(stacks.map((_, i) => i), 0, 1);
  return out;
}
