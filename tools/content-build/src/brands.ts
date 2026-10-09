/**
 * Nazwy innych aplikacji, serwisów, pokoi, solverów i marek, których nie używamy w tekstach aplikacji (decyzja
 * właściciela z 9.10.2026; wytyczne App Store 2.3.7 i 5.2.1), i nazwiska autorów źródeł. Jedyne miejsce w repozytorium
 * z tą listą: testy content-build sprawdzają nią wszystkie teksty bazy treści i moduły TS aplikacji. Adresy URL w polach źródeł
 * (source w content/*.yaml) zostają w repozytorium i do aplikacji nie trafiają.
 *
 * Nazwy złożone z „poker…” tylko w pisowni łącznej (rozdzielne „poker strategy”, „poker news” to zwykłe słowa); wzorce bez
 * flagi „i” (Upswing, Run It Once: małymi literami to zwykłe słowa pokerowe) wymagają wielkiej litery.
 */
const BRANDS: readonly [name: string, pattern: RegExp][] = [
  ['GTO Wizard', /gto[\s-]?wizard/i],
  ['Preflop Wizard', /preflop[\s-]?wizard/i],
  ['BeyondGTO', /beyond[\s-]?gto/i],
  ['GTO Gecko', /gto[\s-]?gecko/i],
  ['Upswing', /\bUpswing\b|upswingpoker/],
  ['PokerCoaching', /pokercoaching/i],
  ['Deepfold', /deepfold/i],
  ['PokerStrategy', /pokerstrategy/i],
  ['GGPoker', /\bgg[\s-]?poker/i],
  ['PokerStars', /pokerstars/i],
  ['Bluffaces', /bluffaces/i],
  ['Primedope', /prime[\s-]?dope/i],
  ['Poker Academy', /poker[\s-]?academy|poker\.academy/i],
  ['PokerListings', /pokerlistings/i],
  ['PokerGround', /pokerground/i],
  ['Runout Poker', /runout[\s-]?poker/i],
  ['Pailiku', /pailiku/i],
  ['SplitSuit', /split[\s-]?suit/i],
  ['888poker', /888[\s-]?poker/i],
  ['BlackRain79', /blackrain/i],
  ['Checkreplay', /checkreplay/i],
  ['GipsyTeam', /gipsy[\s-]?team/i],
  ['PokerNews', /pokernews/i],
  ['The Hendon Mob', /hendon[\s-]?mob/i],
  ['ThinkGTO', /think[\s-]?gto/i],
  ['FlopTurnRiver', /flop[\s-]?turn[\s-]?river/i],
  ['PokerBank', /pokerbank/i],
  ['Grindlab', /grindlab/i],
  ['PokerSkill', /pokerskill/i],
  ['PioSolver', /pio[\s-]?solver/i],
  ['MonkerSolver', /monker/i],
  ['ICMIZER', /icmizer/i],
  ['HoldemResources', /holdem[\s-]?resources/i],
  ['Poker Copilot', /poker[\s-]?copilot/i],
  ['PokerTracker', /pokertracker/i],
  ["Hold'em Manager", /hold.?em[\s-]?manager/i],
  ['partypoker', /party[\s-]?poker/i],
  ['Winamax', /winamax/i],
  ['Run It Once', /Run It Once/],
  ['WSOP', /\bWSOP\b|World Series of Poker/i],
  ['WPT', /\bWPT\b/],
  ['Ignition', /\bIgnition\b/],
  ['Natural8', /natural[\s-]?8/i],
  ['Unibet', /unibet/i],
  ['PokerCharts', /pokercharts/i],
  ['Tombos21', /tombos/i],
];

/**
 * Nazwiska autorów źródeł: w polach źródeł w repozytorium mogą zostać, w tekstach aplikacji nie (decyzja koordynatora
 * z 9.10.2026). Nazwy pojęć od nazwisk (równowaga Nasha) nie są na liście.
 */
const AUTHORS: readonly [name: string, pattern: RegExp][] = [
  ['Tendler', /\bTendler/],
  ['Harrington', /\bHarrington/],
  ['Sklansky', /\bSklansk/],
  ['Malmuth', /\bMalmuth/],
  ['Harville', /\bHarville/],
  ['Palomäki', /\bPalom[äa]ki/],
  ['Baron', /\bBaron\b/],
  ['Hershey', /\bHershey/],
  ['van Loon', /\bvan Loon/],
  ['Ganzfried', /\bGanzfried/],
  ['Sandholm', /\bSandholm/],
  ['Annie Duke', /\bAnnie Duke/],
  ['Brokos', /\bBrokos/],
  ['Janda', /\bJand(a|y|zie|ą)\b/],
  ['Acevedo', /\bAcevedo/],
  ['Ankenman', /\bAnkenman/],
];

/** Wszystkie nazwy, których nie ma w tekstach aplikacji: marki, potem autorzy. */
export const FORBIDDEN_NAMES: readonly [name: string, pattern: RegExp][] = [...BRANDS, ...AUTHORS];

/** Nazwy marek i autorów z listy, które występują w tekście (każda raz, w kolejności listy). */
export function findBrandNames(text: string): string[] {
  return FORBIDDEN_NAMES.filter(([, re]) => re.test(text)).map(([name]) => name);
}
