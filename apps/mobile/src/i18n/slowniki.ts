import type { Jezyk, Slowniki } from '@szkola/jezyki';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';
import ptBR from './locales/pt-BR.json';
import vi from './locales/vi.json';
import zhHant from './locales/zh-Hant.json';

/**
 * Słowniki w wydaniu. Dodanie języka = plik `locales/<kod>.json` + wpis tutaj + wpisy w `app.json` (supportedLocales, locales)
 * + import danych polyfillu w `polyfille.ts`; test `konfiguracja.test.ts` pilnuje zgodności wszystkich czterech miejsc.
 */
export const SLOWNIKI: Slowniki = { pl, en, ja, 'zh-Hant': zhHant, 'pt-BR': ptBR, fr, de, es, ko, it, vi, pt };
export const WYDANE = Object.keys(SLOWNIKI) as Jezyk[];
