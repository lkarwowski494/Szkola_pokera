// Hermes nie ma Intl.PluralRules (hermes/doc/IntlAPIs.md; odczyt 18.10.2026), a bez niego i18next zna tylko formy angielskie.
// Import przed inicjalizacją i18n. `polyfill-force` zamiast `polyfill`: na Hermesie bez natywnej implementacji jest szybszy
// (formatjs, intl-pluralrules). Dane liczby mnogiej dla każdego języka w wydaniu (lista = WYDANE, pilnuje konfiguracja.test.ts).
import '@formatjs/intl-pluralrules/polyfill-force.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/pl.js';
