import './polyfille';

import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { jestJezykiem, opcjeI18next, regulyLiczbyMnogiej, sprawdzIntl, znacznikIntl, wybierzJezyk, ZRODLO, type Jezyk } from '@szkola/jezyki';
import { trDeep } from '@/features/drills/terms';
import { SLOWNIKI, WYDANE } from './slowniki';

/** Ustawienie użytkownika: „Jak w telefonie” albo konkretny język (D-132, BRD F-16). */
export type UstawienieJezyka = 'auto' | Jezyk;

/** Język dla ustawienia: „auto” = preferencje systemu (pierwszy dostępny język, inaczej angielski, a bez słownika en źródło). */
export function jezykDlaUstawienia(ustawienie: UstawienieJezyka | undefined | null, tagiSystemu: readonly string[]): Jezyk {
  if (ustawienie && ustawienie !== 'auto' && jestJezykiem(ustawienie) && WYDANE.includes(ustawienie)) return ustawienie;
  return wybierzJezyk(tagiSystemu, WYDANE);
}

const tagiSystemu = (): string[] => {
  try {
    return getLocales().map((l) => l.languageTag);
  } catch {
    return []; // moduł natywny niedostępny (testy, web)
  }
};

// Znaczniki terminów {{t:…}} podstawiamy przed i18next (jego interpolacja też używa {{…}}), według języka słownika (D-287).
// Wyjątek: `drill.*` (teksty zadań generowanych, D-288) zostaje surowe — parametry niosą znaczniki terminów (nazwy układów),
// więc nawias „przy pierwszym użyciu” liczy się na gotowym tekście w `features/drills/text.ts` (i18next zostawia
// nieznany parametr `{{t:…}}` bez zmian: `skipOnVariables`).
const slowniki = Object.fromEntries(
  Object.entries(SLOWNIKI).map(([j, { drill, ...reszta }]) => [j, { ...trDeep(reszta, j), ...(drill === undefined ? {} : { drill }) }]),
);

void i18n.use(initReactI18next).use(regulyLiczbyMnogiej).init(opcjeI18next(slowniki, jezykDlaUstawienia('auto', tagiSystemu()), { scisle: __DEV__ }));

/** Zmiana języka w trakcie działania (ustawienia): bez restartu i bez dotykania danych użytkownika (dane to kody, ADR 0005). */
export async function ustawJezyk(ustawienie: UstawienieJezyka): Promise<Jezyk> {
  const j = jezykDlaUstawienia(ustawienie, tagiSystemu());
  await i18n.changeLanguage(j);
  return j;
}

const problemy = sprawdzIntl(WYDANE.map(znacznikIntl));
if (problemy.length) {
  const komunikat = `Intl.PluralRules: ${problemy.join('; ')}`;
  if (__DEV__) throw new Error(komunikat);
  console.error(komunikat);
}

export { ZRODLO };
export default i18n;
