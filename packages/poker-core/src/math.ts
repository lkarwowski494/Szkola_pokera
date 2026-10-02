/**
 * Matematyka decyzji. Wszystkie kwoty w tych samych jednostkach (np. bb lub żetony).
 * `pot` oznacza pulę PRZED zakładem przeciwnika.
 */

/** Equity potrzebne do opłacalnego sprawdzenia: bet / (pot + 2·bet). */
export function requiredEquity(pot: number, bet: number): number {
  assertPositive(pot, bet);
  return bet / (pot + 2 * bet);
}

/** Pot odds dla dowolnej kwoty do dopłaty: call / (pula po zakładzie + call). */
export function potOdds(potAfterBet: number, toCall: number): number {
  assertPositive(potAfterBet, toCall);
  return toCall / (potAfterBet + toCall);
}

/** Minimum Defense Frequency: pot / (pot + bet). Zakłada zerowe equity blefów. */
export function mdf(pot: number, bet: number): number {
  assertPositive(pot, bet);
  return pot / (pot + bet);
}

/** Alpha: jak często blef musi zadziałać, by był na zero: bet / (pot + bet). */
export function alpha(pot: number, bet: number): number {
  assertPositive(pot, bet);
  return bet / (pot + bet);
}

/** Udział blefów w zakresie betującego na riverze w równowadze (= requiredEquity sprawdzającego). */
export function riverBluffShare(pot: number, bet: number): number {
  return requiredEquity(pot, bet);
}

/** Dokładne prawdopodobieństwo trafienia co najmniej jednego outu. */
export function hitProbability(outs: number, unseen: number, cardsToCome: 1 | 2): number {
  if (outs < 0 || outs > unseen) throw new Error('Nieprawidłowa liczba outów');
  if (cardsToCome === 1) return outs / unseen;
  const miss = ((unseen - outs) / unseen) * ((unseen - 1 - outs) / (unseen - 1));
  return 1 - miss;
}

/** Reguła 2 i 4 (przybliżenie w procentach jako ułamek). */
export function ruleOf2And4(outs: number, cardsToCome: 1 | 2): number {
  return (outs * (cardsToCome === 2 ? 4 : 2)) / 100;
}

/** Stack-to-pot ratio. */
export function spr(effectiveStack: number, pot: number): number {
  assertPositive(effectiveStack, pot);
  return effectiveStack / pot;
}

/** Rozmiar zakładu (jako ułamek puli) pozwalający wejść all-in w `streets` równych krokach. */
export function geometricBetFraction(pot: number, stack: number, streets: number): number {
  assertPositive(pot, stack);
  if (streets < 1) throw new Error('streets musi być ≥ 1');
  return ((1 + (2 * stack) / pot) ** (1 / streets) - 1) / 2;
}

/** Wartość oczekiwana sprawdzenia: equity·(pula po sprawdzeniu) − koszt sprawdzenia. */
export function callEv(equity: number, potAfterBet: number, toCall: number): number {
  return equity * (potAfterBet + toCall) - toCall;
}

function assertPositive(...values: number[]): void {
  for (const v of values) if (!(v > 0) || !Number.isFinite(v)) throw new Error(`Wartość musi być dodatnia: ${v}`);
}
