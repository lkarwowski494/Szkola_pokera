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

/**
 * Szansa, że wśród `draws` kart odkrytych z `unseen` nie pojawi się żaden z `outs` (rozkład hipergeometryczny),
 * np. ręka bez pary nie trafia pary na flopie: missProbability(6, 50, 3).
 */
export function missProbability(outs: number, unseen: number, draws: number): number {
  if (!Number.isInteger(outs) || !Number.isInteger(unseen) || !Number.isInteger(draws)) throw new Error('Liczby całkowite');
  if (outs < 0 || outs > unseen || draws < 0 || draws > unseen) throw new Error('Nieprawidłowe argumenty');
  let p = 1;
  for (let i = 0; i < draws; i++) p *= (unseen - outs - i) / (unseen - i);
  return Math.max(0, p);
}

/**
 * Rozmiar geometryczny: ułamek puli f stawiany na każdej z `streets` ulic, tak że po ostatnim zakładzie i sprawdzeniu
 * cały stack jest w puli: (1 + 2f)^streets = 1 + 2·SPR, czyli f = ((1 + 2·SPR)^(1/streets) − 1) / 2.
 */
export function geometricFraction(spr: number, streets: number): number {
  if (!(spr >= 0) || !Number.isInteger(streets) || streets < 1) throw new Error('Nieprawidłowe argumenty');
  return ((1 + 2 * spr) ** (1 / streets) - 1) / 2;
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
