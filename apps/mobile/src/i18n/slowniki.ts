import type { Jezyk, Slowniki } from '@szkola/jezyki';
import pl from './locales/pl.json';

/**
 * Słowniki w wydaniu. Dodanie języka = plik `locales/<kod>.json` + wpis tutaj + wpisy w `app.json` (supportedLocales, locales)
 * + import danych polyfillu w `polyfille.ts`; test `konfiguracja.test.ts` pilnuje zgodności wszystkich czterech miejsc.
 */
export const SLOWNIKI: Slowniki = { pl };
export const WYDANE = Object.keys(SLOWNIKI) as Jezyk[];
