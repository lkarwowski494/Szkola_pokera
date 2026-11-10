# Recenzja kodu: wydanie pt-PT (f8272c1..1db8449)

Recenzent niezależny, świeży kontekst (D-043). Zakres: `apps/mobile/app.json`, `apps/mobile/locales/systemowe/pt.json`,
`apps/mobile/src/i18n/**`, `packages/jezyki/**` (bez .db i *.generated.ts). Data: 2026-11-10.

## Wynik

| Waga | Liczba |
|---|---|
| KRYTYCZNE | 0 |
| WYSOKIE | 0 |
| ŚREDNIE | 0 |
| NISKIE | 3 |

**Werdykt: przyjąć.** Znaleziska NISKIE do backlogu.

## Co sprawdzono i z jakim wynikiem

1. **Wybór pt-PT a pt-BR** (`packages/jezyki/src/jezyki.ts:49-77`): `jezykZTagu` mapuje `pt-PT`, `pt_PT`, `pt-AO`, `pt-MZ` → `pt`;
   `pt-BR` i samo `pt` → `pt-BR`. Usunięcie `ZASTEPSTWA_TYMCZASOWE` (D-373) jest bezpieczne, bo `pt` jest teraz w `WYDANE`.
   W kodzie (`*.ts`, `*.mjs`) nie zostało żadne odwołanie do tej stałej. Logika jest identyczna z Treningiem (`lib/i18n.ts`, `resolveLang`,
   odczyt raw 2026-11-10: ta sama reguła i `TAG pt: 'pt-PT'`). Użytkownik pt-BR nie dostaje pt-PT. Użytkownik z regionem PT nie dostaje pt-BR.
   Ustawienie ręczne wygrywa (`apps/mobile/src/i18n/index.ts:13-16`).
2. **Liczba mnoga** (`packages/jezyki/src/i18n.ts:40-52`): moduł `3rdParty` podmienia `pluralResolver.getRule` dopiero po
   utworzeniu usług. Sprawdzone w i18next 26.4.2 (`dist/cjs/i18next.js:1845` tworzy resolver, `:1873` wywołuje `init` modułów).
   `Translator` korzysta z tego samego obiektu. Rekurencja w `getRule` (catch) przechodzi przez podmienioną metodę, a cache
   jest kluczowany kodem `pt-PT`, więc nie koliduje z `pt`. Dla `pt-BR` reguła się nie zmienia, a gdy `pt-BR` schodzi do zasobów `pt`,
   używana jest reguła pt-PT, co jest poprawne, bo te zasoby są pt-PT. Test mutacyjny: po cofnięciu podmiany
   `test/pt-pt-09.test.ts` przestaje przechodzić (0 → „0 lição”), więc test rzeczywiście sprawdza zachowanie.
3. **Polyfill** (`apps/mobile/src/i18n/polyfille.ts:14`): import `locale-data/pt-PT.js` stoi po `pt.js`. Bez niego polyfill daje
   `pt-PT` 0 → `one`, a z nim `other` (sprawdzone w node z formatjs z repo).
4. **app.json**: zmiana dotyczy tylko `supportedLocales` (dodane `pt` na iOS i Androidzie) oraz `locales.pt`. Uprawnienia, pozostałe
   wtyczki, `privacyManifests` i `infoPlist` są bez zmian. `locales/systemowe/pt.json` ma tylko nazwę pod ikoną (PokerGym).
   W zakresie f8272c1..1db8449 nie zmieniły się inne ścieżki wrażliwe z D-043 (`eas.json`, `.github`, `platform`, `postep`, `domena`, `content-build`).
5. **Testy**: w `jezyk-4-09.test.ts:15-18` zmieniono oczekiwanie pt-PT → `pt`. To zgodne z decyzją D-405, a nie osłabienie asercji.
   `konfiguracja.test.ts:38-39` dodaje wymóg danych polyfillu dla `znacznikIntl` (test jest przez to silniejszy). Nowe testy w
   `jezyk-pt-09.test.ts` i `pt-pt-09.test.ts` są konkretne. Nic nie wyłączono, nie ma `skip` ani `only`.
   Uruchomione na migawce 1db8449 (git archive w scratchpadzie, node_modules z repo): `packages/jezyki` vitest 144/144,
   `apps/mobile` jest `src/i18n` + `features/glossary` 65/65.
6. **Struktura `pt.json`** (sprawdzona skryptem względem `pl.json`):
   - 731 kluczy, brak brakujących i nadmiarowych baz kluczy;
   - parametry `{{…}}` (poza znacznikami terminów) zgodne;
   - zestawy kluczy znaczników `{{t:klucz|…}}` zgodne z którąś formą źródła;
   - znaczniki `<…>` zgodne, brak pustych tekstów;
   - formy mnogie `one/many/other` są kompletne dla pt-PT.

   `pt-BR.json` także ma pełne 731 kluczy, więc nakładka pt-BR → pt nie przecieka tekstami pt-PT do interfejsu pt-BR.

## Znaleziska

### N-1 (NISKIE): część formatowania Intl omija `znacznikIntl`, więc `pt` jest formatowany według CLDR „pt” (wariant brazylijski)
- Miejsca: `apps/mobile/src/components/RangeGrid.tsx:16`, `apps/mobile/src/features/stol/skala.ts:20`, `apps/mobile/src/app/settings.tsx:95`
  (`new Intl.*Format(i18n.language …)`), a także `features/dane/EkranDanych.tsx:33` i `features/start/EkranStartu.tsx:27`, które dostają kod języka parametrem.
- Scenariusz: przy języku `pt` liczby, procenty i daty idą przez `Intl` z tagiem `pt` zamiast `pt-PT`. Różnica jest dziś praktycznie
  niewidoczna. Procenty z jednym miejscem po przecinku, daty „10 de novembro de 2026” i godziny 24h wyglądają w obu wariantach tak samo.
  Rozjazd dotyczyłby tylko grupowania liczb ≥ 1000. Formatowanie jest niespójne z `formatujLiczbe` (`formaty.ts`). Te pliki są poza diffem.
- Propozycja: w tych miejscach użyć `znacznikIntl(i18n.language)` (albo `formatujLiczbe`/`formatujDate`).

### N-2 (NISKIE): systemowy tag „pt” bez regionu zawsze daje pt-BR, a `supportedLocales` deklaruje „pt”
- Miejsca: `packages/jezyki/src/jezyki.ts:55` i `apps/mobile/app.json:40`.
- Scenariusz: jeśli system poda aplikacji sam tag `pt`, aplikacja w trybie „Jak w telefonie” pokaże pt-BR, a nie pt-PT.
  Może się tak zdarzyć przy wyborze języka aplikacji w ustawieniach systemu (Android per-app language z `locales_config`, iOS ustawienia aplikacji).
  Kod potwierdza tylko mapowanie. Tego, czy system faktycznie podaje gołe `pt`, nie sprawdzono na urządzeniu.
  Obejście już działa: ręczny wybór „Português (Portugal)” w aplikacji. Rozwiązanie jest identyczne z Treningiem (świadome, CLDR likelySubtags).
- Propozycja: dodać pozycję do listy kontrolnej testów na telefonie. Jeśli system zwraca gołe `pt`, rozważyć `pt-PT` w `supportedLocales`.

### N-3 (NISKIE): samosprawdzenie Intl przy starcie nie wykrywa braku danych pt-PT
- Miejsca: `apps/mobile/src/i18n/index.ts:44` i `packages/jezyki/src/intl.ts:6-13`.
- Scenariusz: `supportedLocalesOf(['pt-PT'])` w polyfillu formatjs zwraca `['pt-PT']`, nawet gdy załadowano tylko `pt.js`
  (sprawdzone w node; wtedy `select(0)` daje `one`). Gdyby ktoś usunął import `pt-PT.js`, start aplikacji tego nie zgłosi.
  Przed regresją chroni dziś tylko test `konfiguracja.test.ts:38-40`, który pilnuje importu, oraz `polyfill.test.ts:27-30`.
- Propozycja: dodać do samosprawdzenia wektor zachowania (np. `new Intl.PluralRules('pt-PT').select(0) === 'other'`).

## Nie stwierdzono
- Nie stwierdzono regresji pt-BR, zmian uprawnień, wtyczek ani manifestu prywatności.
- Nie stwierdzono uszkodzonych parametrów ani znaczników w `pt.json`, osłabionych ani wyłączonych testów.
- Nie stwierdzono zmian w danych użytkownika.
