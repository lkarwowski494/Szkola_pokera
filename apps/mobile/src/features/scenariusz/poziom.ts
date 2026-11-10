import type { OcenaOdpowiedzi } from '@szkola/domena';
import { SCENARIO_LEVELS, type ScenarioLevel } from '@szkola/poker-core';

/**
 * Poziom scenariusza (PR-05; BR-POZ-001, BR-POZ-002; KO-039 „Automatycznie + wybór”). Czyste funkcje: wyniki wariantów
 * przychodzą jako argument (`wynikiScenariuszy` z pakietu postep), bez zegara i bazy.
 *
 * Reguła automatu = D-534 (OCENA, do weta) + D-649 (uzupełnienie BT, do weta):
 * - start: łatwy; średni, gdy test modułu zaliczony albo przeskoczony oceną poziomu (F-01);
 * - w górę po PROG_SERIA_W_GORE kolejnych wariantach na bieżącym poziomie z co najmniej PROG_DOBRE dobrych decyzji
 *   (D-534: średni → trudny; D-649: łatwy → średni, tylko gdy test modułu zaliczony, żeby po spadku dało się wrócić);
 * - w dół o poziom po PROG_SERIA_W_DOL kolejnych wariantach z mniej niż PROG_SLABE dobrych decyzji.
 * Dobra decyzja = „zgodne” albo „dopuszczalne” (RD-11; ocena ≠ wygrana). Liczby jak w D-534 ([OCENA], kalibracja po danych).
 */
export const PROG_SERIA_W_GORE = 5;
export const PROG_DOBRE = 0.8;
export const PROG_SERIA_W_DOL = 3;
export const PROG_SLABE = 0.5;

export type WyborPoziomu = 'auto' | ScenarioLevel;
export const WYBORY: readonly WyborPoziomu[] = ['auto', ...SCENARIO_LEVELS];
export interface WynikWariantu { readonly poziom: ScenarioLevel; readonly oceny: readonly OcenaOdpowiedzi[] }

/** Udział decyzji ocenionych „zgodne” albo „dopuszczalne”; wariant bez decyzji → null. */
export function udzialDobrych(oceny: readonly OcenaOdpowiedzi[]): number | null {
  if (oceny.length === 0) return null;
  return oceny.filter((o) => o === 'zgodne' || o === 'dopuszczalne').length / oceny.length;
}

const nizej = (p: ScenarioLevel): ScenarioLevel => (p === 'trudny' ? 'sredni' : 'latwy');

/** Poziom proponowany automatycznie dla szablonu modułu; `wyniki` tego modułu od najstarszego. */
export function poziomAuto(w: { modulZaliczony: boolean; wyniki: readonly WynikWariantu[] }): ScenarioLevel {
  let poziom: ScenarioLevel = w.modulZaliczony ? 'sredni' : 'latwy';
  let dobre = 0;
  let slabe = 0;
  for (const wynik of w.wyniki) {
    const u = udzialDobrych(wynik.oceny);
    if (u === null) {
      dobre = 0;
      slabe = 0;
      continue;
    }
    slabe = u < PROG_SLABE ? slabe + 1 : 0;
    dobre = u >= PROG_DOBRE && wynik.poziom === poziom ? dobre + 1 : 0;
    if (slabe >= PROG_SERIA_W_DOL) {
      poziom = nizej(poziom);
      slabe = 0;
      dobre = 0;
    } else if (dobre >= PROG_SERIA_W_GORE) {
      if (poziom === 'sredni') poziom = 'trudny';
      else if (poziom === 'latwy' && w.modulZaliczony) poziom = 'sredni';
      dobre = 0;
    }
  }
  return poziom;
}

/** Szablon bez wybranego poziomu dostaje najbliższy niższy, który ma (BR-POZ-002); `zastapiony` = ekran mówi, że poziomu nie ma. */
export function poziomDlaSzablonu(zadany: ScenarioLevel, dostepne: readonly ScenarioLevel[]): { poziom: ScenarioLevel; zastapiony: boolean } {
  if (dostepne.includes(zadany)) return { poziom: zadany, zastapiony: false };
  const porzadek = SCENARIO_LEVELS;
  for (let i = porzadek.indexOf(zadany) - 1; i >= 0; i--) {
    const p = porzadek[i];
    if (p !== undefined && dostepne.includes(p)) return { poziom: p, zastapiony: true };
  }
  const najnizszy = porzadek.find((p) => dostepne.includes(p));
  return { poziom: najnizszy ?? 'latwy', zastapiony: true };
}

/** Ustawienie ręczne z bazy (`ustawienie`, klucz `scenariusz.poziom`); cokolwiek innego → null (wywołujący bierze „auto”, preferencja interfejsu). */
export function parsujWyborPoziomu(v: unknown): WyborPoziomu | null {
  return WYBORY.find((w) => w === v) ?? null;
}
