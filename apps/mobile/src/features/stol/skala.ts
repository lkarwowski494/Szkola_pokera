import i18n from 'i18next';
import { MIXED_LOW, MIXED_MIN } from '@/features/drills/thresholds';

/**
 * Skala stopni po ocenie (08 cz. 6 krok 6, D-274; design-spec „`SkalaStopni`”: trzy przedziały z progów `thresholds.ts`).
 * Twój przedział wynika z oceny, nie z samej częstości: akcja najczęstsza poniżej MIXED_LOW też jest zgodna (ADR-26,
 * `rangeVerdict`). Niedokładność (zły rozmiar) nie ma przedziału na tej skali (L-4, D-274).
 */
type TFn = (k: string, o?: Record<string, unknown>) => string;
export type StopienSkali = 'blad' | 'dopuszczalne' | 'zgodne';
export type OcenaDecyzji = StopienSkali | 'niedokladnosc';
export interface Przedzial {
  readonly stopien: StopienSkali;
  readonly slowo: string;
  readonly zakres: string;
  readonly twoj: boolean;
}

/** Procent progu w zapisie języka (3,5 dla pl), najwyżej jedno miejsce po przecinku. */
const proc = (x: number) => new Intl.NumberFormat(i18n.language || 'pl', { maximumFractionDigits: 1 }).format(x * 100);

export function przedzialySkali(ocena: OcenaDecyzji, t: TFn): Przedzial[] {
  const p = (stopien: StopienSkali, zakres: string): Przedzial => ({ stopien, slowo: t(`grade.${stopien}`), zakres, twoj: ocena === stopien });
  return [
    p('blad', t('scale.below', { x: proc(MIXED_MIN) })),
    p('dopuszczalne', t('scale.between', { a: proc(MIXED_MIN), b: proc(MIXED_LOW) })),
    p('zgodne', t('scale.from', { x: proc(MIXED_LOW) })),
  ];
}

/** Opis dla czytnika („Skala stopni: twoja akcja 20 procent, przedział dopuszczalna.”). */
export function etykietaSkali(czestosc: number, ocena: OcenaDecyzji, t: TFn): string {
  return t('scale.label', { pct: proc(czestosc), stopien: t(`grade.${ocena}`).toLowerCase() });
}
