// Hermes nie ma Intl.PluralRules; bez niego i18next nie wybierze polskich form liczby mnogiej.
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/pl.js';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { pl } from './pl';

void i18n.use(initReactI18next).init({
  lng: 'pl',
  fallbackLng: 'pl',
  resources: { pl: { translation: pl } },
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
