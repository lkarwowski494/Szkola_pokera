// RD-11 (docs/brd/reguly.md:186–205; S-06, D-143): ocena zagrania z częstości solvera, cztery stopnie. Funkcja: rangeVerdict
// (poker-core/src/grading.ts) z progami z konfiguracji domeny (M = OCENA_PROG_DOPUSZCZALNE, L = OCENA_PROG_MIESZANA_DOLNY).
// Stopień „niedokładność” ma w poker-core etykietę 'inaccuracy' (słownik Verdict w grading.ts) — dziś rangeVerdict jej nie zwraca (ER-01, L-06).
import { KONFIGURACJA as K } from '../../packages/domena/src';
import { rangeVerdict } from '../../packages/poker-core/src/grading';
import wektory from './brd.json';

const ETYKIETA = { zgodne: 'correct', dopuszczalne: 'acceptable', 'niedokładność': 'inaccuracy', 'błąd': 'wrong' } as const;
export const PROGI = { mixedMin: K.OCENA_PROG_DOPUSZCZALNE, mixedLow: K.OCENA_PROG_MIESZANA_DOLNY };
export const OCZEKUJACE_RD11: Record<string, string> = {
  'RD-11-W6': 'ER-01 / L-06: 0 < f < 3,5% ma być niedokładnością, nie błędem (D-143)',
  'RD-11-W9': 'RYZ-03: częstość < 0 ma być odrzucona',
};

export const RD11 = (wektory as unknown as { regula: string; id: string; wejscie: Record<string, number>; oczekiwane: Record<string, string> }[])
  .filter((w) => w.regula === 'RD-11')
  .map((w) => {
    const f = w.wejscie['f [-]']!;
    const fMax = w.wejscie['f_max [-]']!;
    const oczekiwane = w.oczekiwane['ocena [-]']!;
    // częstości akcji w spocie: najczęstsza f_max, oceniana f (gdy f = f_max, to ta sama akcja)
    const freqs = f === fMax ? [fMax] : [fMax, f];
    return { id: w.id, uruchom: () => rangeVerdict(freqs, PROGI)[freqs.length - 1], oczekiwane: oczekiwane === 'błąd danych' ? oczekiwane : ETYKIETA[oczekiwane as keyof typeof ETYKIETA] };
  });
