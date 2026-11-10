// Wybór wariantu scenariusza bez powtórzeń (BR-GEN-002, D-532): w sesji 0 powtórzeń odcisku, między sesjami odcisk spoza
// okna ostatnich odcisków szablonu na poziomie; gdy wolnego nie ma, odcisk widziany najdawniej. Czysta logika: historia
// i ziarno startowe to argumenty (zapis historii: pakiet postep).
import { GENERATOR_WERSJA, generateVariant, type GeneratorContext, type GeneratorTemplate, type ScenarioLevel, type ScenarioVariant } from '@szkola/poker-core';
import { KONFIGURACJA } from './konfiguracja';

export interface WpisHistorii {
  odcisk: string;
  ziarno: number;
  /** Wersja generatora, którym wpis zapisano (0 = sprzed wprowadzenia wersji). Ziarno ma sens tylko pod tą samą wersją (ŚR-001, D-730). */
  generatorWersja: number;
}
const zgodny = (w: WpisHistorii): boolean => w.generatorWersja === GENERATOR_WERSJA;
export interface OpcjeWyboru {
  /** Historia szablonu na poziomie, od najstarszego do najnowszego (jak `odczytajOdciski`). */
  historia: readonly WpisHistorii[];
  /** Odciski już zagrane w tej sesji scenariuszy (wszystkie szablony; odcisk zawiera id szablonu i poziom). */
  sesja: ReadonlySet<string>;
  /** Dane spoza szablonu dla punktów range-spot, cbet-case, size-spot i icm-call (D-661); bez nich takie punkty dają TemplateError. */
  kontekst?: GeneratorContext;
  /** Do testów: zamiennik generatora. */
  generuj?: typeof generateVariant;
}
/** Ile kolejnych ziaren wypróbować, zanim uznamy, że wolnego odcisku nie ma (pojemność ≥ 40 daje wolne przy oknie 20). */
export const WYBOR_MAKS_PROB = 200;

const KROK_ZIARNA = 0x9e3779b1; // odstęp dużej liczby nieparzystej: kolejne próby nie dają sąsiednich ziaren

export function wybierzWariant(szablon: GeneratorTemplate, poziom: ScenarioLevel, ziarnoStartowe: number, o: OpcjeWyboru): ScenarioVariant {
  const generuj = o.generuj ?? generateVariant;
  const okno = o.historia.slice(-KONFIGURACJA.WARIANTY_HISTORIA_OKNO);
  const zajete = new Set([...okno.map((w) => w.odcisk), ...o.sesja]);
  let ostatni: ScenarioVariant | null = null;
  for (let k = 0; k < WYBOR_MAKS_PROB; k++) {
    const v = generuj(szablon, poziom, (ziarnoStartowe + Math.imul(k, KROK_ZIARNA)) >>> 0, o.kontekst);
    if (!zajete.has(v.fingerprint)) return v;
    ostatni = v;
  }
  // Brak wolnego odcisku: najdawniej widziany z okna, o ile nie był w tej sesji (D-532).
  // Tylko wpisy zgodnej wersji: ziarno starego generatora dałoby inną rękę niż ta w historii (ŚR-001). Okno wyżej liczy wszystkie wersje.
  for (const w of okno) {
    if (o.sesja.has(w.odcisk) || !zgodny(w)) continue;
    return generuj(szablon, poziom, w.ziarno, o.kontekst);
  }
  if (!ostatni) throw new Error('wybierzWariant: brak prób');
  return ostatni;
}

export interface StartWariantu {
  /** Historia szablonu na poziomie, od najstarszego do najnowszego (jak `odczytajOdciski`). */
  historia: readonly WpisHistorii[];
  /** Odcisk wariantu, który użytkownik właśnie startuje. */
  odcisk: string;
}
/**
 * Powtórka wariantu (KO-043, D-558): startowany odcisk jest równy odciskowi ostatnio zapisanego wariantu szablonu na poziomie
 * („Zagraj jeszcze raz to samo rozdanie”). Rozpoznaje domena z historii, nie interfejs; odcisk to to, po czym użytkownik
 * rozpoznaje „to samo rozdanie” (D-552). Starszy wpis niż ostatni to nowe rozdanie (limit liczy nowe warianty).
 */
export function czyPowtorkaWariantu(s: StartWariantu): boolean {
  const ostatni = s.historia[s.historia.length - 1];
  return ostatni !== undefined && ostatni.odcisk === s.odcisk && zgodny(ostatni);
}

/**
 * Ziarno do „Zagraj jeszcze raz to samo rozdanie” (ŚR-001, D-731): ziarno ostatniego wpisu, ale tylko gdy zapisał go bieżący generator.
 * Wpis starszej wersji (także 0) albo pusta historia → null: wywołujący losuje nowe rozdanie (`wybierzWariant`) bez komunikatu.
 */
export function ziarnoPowtorki(historia: readonly WpisHistorii[]): number | null {
  const ostatni = historia[historia.length - 1];
  return ostatni !== undefined && zgodny(ostatni) ? ostatni.ziarno : null;
}
