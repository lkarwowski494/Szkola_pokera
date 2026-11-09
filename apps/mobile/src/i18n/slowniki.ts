import type { Jezyk, Slowniki } from '@szkola/jezyki';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ja from './locales/ja.json';
import pl from './locales/pl.json';
import ptBR from './locales/pt-BR.json';
import zhHant from './locales/zh-Hant.json';

/**
 * Słowniki w wydaniu. Dodanie języka = plik `locales/<kod>.json` + wpis tutaj + wpisy w `app.json` (supportedLocales, locales)
 * + import danych polyfillu w `polyfille.ts`; test `konfiguracja.test.ts` pilnuje zgodności wszystkich czterech miejsc.
 */
export const SLOWNIKI: Slowniki = { pl, en, ja, 'zh-Hant': zhHant, 'pt-BR': ptBR, fr };
export const WYDANE = Object.keys(SLOWNIKI) as Jezyk[];
