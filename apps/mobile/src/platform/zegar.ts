import { getCalendars } from 'expo-localization';
import { dzienLokalny, type Zegar } from '@szkola/domena';

/**
 * Zegar aplikacji (moduly.md „Porty domeny”): czas, strefa telefonu, dzień lokalny (ADR 0007). Strefa: kalendarz systemu
 * (expo-localization; `timeZone` bywa null, D-208), potem strefa silnika Intl, na końcu UTC (D-257). Strefa, której Intl
 * nie zna, jest pomijana — `dzienLokalny` rzuciłby RangeError w limicie i zapisie aktywności.
 */
export type ZrodlaStrefy = { kalendarz(): string | null; intl(): string | null };

function znana(s: string | null): s is string {
  if (!s) return false;
  try {
    dzienLokalny(0, s);
    return true;
  } catch {
    return false;
  }
}

export function utworzZegar(z: ZrodlaStrefy, teraz: () => number = Date.now): Zegar {
  return {
    teraz,
    strefa: () => [z.kalendarz(), z.intl()].find(znana) ?? 'UTC',
    dzienLokalny,
  };
}

export const zegarTelefonu: Zegar = utworzZegar({
  kalendarz: () => getCalendars()[0]?.timeZone ?? null,
  intl: () => Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
});
