// Silnik rodzajów punktów 08-N1…N7 (sesja DX): czyste funkcje oceny, bez React Native i bez plików (D-661).
import type { Card } from './cards';
import { rankOf, suitOf } from './cards';
import { requiredEquity } from './math';
import { sizeVerdict } from './grading';
import { classifyHolding, HOLDING_LIMITS } from './holding';
import { classifyFlop } from './texture';
import type { WerdyktAkcji } from './scenario-gen';


const RANK_A = 12;
const RANK_K = 11;
const RANK_T = 8;
/** Złe rozmiary iso-raise jako ułamek standardu: jak size-spot (SIZE_SMALL_FACTOR, SIZE_BIG_FACTOR w scenario-gen.ts; powtórzone, by uniknąć cyklu importów). */
const ISO_SMALL = 0.8;
const ISO_BIG = 1.6;
/** Granica „mały / duży” c-bet w obronie: mały to ≤ 0,4 puli (≈ 1/3, R-M6-006), duży ≥ 0,7 (≥ 3/4, R-M6-007); pomiędzy źródło nie rozstrzyga. */
const DEFEND_SMALL_MAX = 0.4;
const DEFEND_BIG_MIN = 0.7;
/** „Wysokie karty” backdoora: obie karty gracza od dziesiątki (nazwane uproszczenie D-1066, do weta). */
const BACKDOOR_HIGH_MIN = RANK_T;

export interface IsoParams { base: number; perLimper: number; oopExtra: number }
export interface IsoOption { action: 'raise' | 'raise-small' | 'raise-big'; bb: number; verdict: WerdyktAkcji }
const round1 = (x: number) => Math.round(x * 10) / 10;
/** R-M4-012 (grading.ts `iso-size`): base + perLimper × limperzy (+ oopExtra, gdy gracz jest przed wszystkimi limperami po flopie). */
export function isoSizeStandardBb(p: IsoParams, limpers: number, oop: boolean): number {
  return p.base + p.perLimper * limpers + (oop ? p.oopExtra : 0);
}
export function isoSizeOptions(p: IsoParams, limpers: number, oop: boolean): IsoOption[] {
  const standard = isoSizeStandardBb(p, limpers, oop);
  return ([['raise', standard], ['raise-small', round1(standard * ISO_SMALL)], ['raise-big', round1(standard * ISO_BIG)]] as const).map(([action, bb]) => ({ action, bb, verdict: sizeVerdict(standard, bb) }));
}

export type DefendAction = 'call' | 'fold';
/**
 * Obrona BB wobec c-betu na flopie (R-M6-006 mały, R-M6-007 duży; heur). Mały: call przy parze, drawie (kolor, strit otwarty), backdoorze kolorowym
 * z wysokimi kartami i asie w ręce, inaczej fold. Duży: call przy parze i drawie, fold pozostałe; as na suchym flopie z królem to wyjątek źródła
 * (odrzucany: null). Rozmiar między „małym” a „dużym” źródło nie rozstrzyga (null).
 */
export function defendVsCbet(hero: readonly [Card, Card], flop: readonly Card[], fraction: number): DefendAction | null {
  const small = fraction <= DEFEND_SMALL_MAX;
  if (!small && fraction < DEFEND_BIG_MIN) return null;
  const h = classifyHolding(hero, flop);
  if (h.improvesBoard || h.pairKind !== null || (h.draw?.all.length ?? 0) >= HOLDING_LIMITS.drawOutsMin) return 'call'; // para, dwie pary i więcej (układ lepszy niż stół), draw
  const hasAce = hero.some((c) => rankOf(c) === RANK_A);
  if (!small) {
    const tex = classifyFlop(flop);
    return hasAce && flop.some((c) => rankOf(c) === RANK_K) && tex.wetness === 'dry' ? null : 'fold';
  }
  if (hasAce) return 'call';
  const suited = suitOf(hero[0]) === suitOf(hero[1]);
  const backdoor = suited && flop.filter((c) => suitOf(c) === suitOf(hero[0])).length === 1 && hero.every((c) => rankOf(c) >= BACKDOOR_HIGH_MIN);
  return backdoor ? 'call' : 'fold';
}

/** R-M4-010: punkt „lista rąk”: oczekiwana akcja z jawnej listy klas w szablonie; ręka spoza listy → null (generator losuje tylko z listy). */
export interface ListEntry { hands: readonly string[]; correct: string; acceptable?: readonly string[] }
export function listHandVerdicts(handClass: string, entries: readonly ListEntry[]): { correct: string; acceptable: string[] } | null {
  const e = entries.find((x) => x.hands.includes(handClass));
  return e ? { correct: e.correct, acceptable: [...(e.acceptable ?? [])] } : null;
}

/** R-M8-010 (math): sprawdzenie bluff-catcherem, gdy udział blefów > bet ÷ (pula + 2·bet); w marginesie marginMin od progu odpowiedzi brak (null, jak draw-call). */
export function riverCatchAction(bluffShare: number, pot: number, bet: number, marginMin: number): 'call' | 'fold' | null {
  const need = requiredEquity(pot, bet);
  if (Math.abs(bluffShare - need) < marginMin) return null;
  return bluffShare > need ? 'call' : 'fold';
}
