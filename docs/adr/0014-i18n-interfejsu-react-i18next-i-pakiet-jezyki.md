---
status: proponowana (rola 09 E1, 2026-11-04; czeka na akceptację właściciela na bramce E1)
data: 2026-11-04
decyduje: agent (technika); lista języków i polityka: D-131 (właściciel 2026-11-03)
---
# 0014. Mechanizm i18n interfejsu: react-i18next ze słownikiem JSON na język, czysty pakiet `@szkola/jezyki`, polyfill `Intl.PluralRules` z samosprawdzeniem

## Kontekst i problem
Interfejs ma mieć 35 języków (NFR-JEZ-001, D-131). Dzisiaj: i18next 26.4.2 + react-i18next 17.0.15, `lng: 'pl'` na sztywno, słownik jako obiekt TS (`apps/mobile/src/i18n/pl.ts`), polyfill `Intl.PluralRules` tylko dla `pl`, `expo-localization` zainstalowany i nieużywany. Treść lekcji ma osobne bazy na język (ADR 0005); ten ADR dotyczy interfejsu i wspólnych elementów (lista języków, wybór języka, formaty).

## Czynniki decyzji
- Reguła roli 09: istniejący mechanizm zostaje, jeśli przechodzi skrypt kontroli i wektory liczby mnogiej.
- Hermes nie ma `Intl.PluralRules` (hermes `doc/IntlAPIs.md`, odczyt 18.10.2026); bez niego i18next zna tylko formy angielskie (i18next.com/translation-function/plurals, odczyt 18.10.2026).
- Skrypt `scripts/sprawdz-i18n.mjs` czyta słowniki JSON w formacie i18next v4 i skanuje kod składnią TypeScript.
- BRD: język spoza listy → angielski; zmiana języka w aplikacji offline bez zmiany postępu (F-16, BR-DANE-004: dane jako kody).
- Lista języków i wybór języka są potrzebne także w `tools/content-build` (35 baz, ADR 0005), więc muszą leżeć poza React Native.

## Rozważane opcje
- A: react-i18next, słowniki JSON, klucze znaczeniowe (`ekran.element`); logika bez RN w pakiecie `@szkola/jezyki`
- B: Lingui, ICU MessageFormat
- C: własne `t('polski tekst')` z tekstem jako kluczem (mechanizm Treningu)

## Decyzja
Wybrano „A”, ponieważ nie wymaga migracji istniejących 49 wywołań, przechodzi skrypt kontroli bez dodatkowych narzędzi i daje tłumaczom stabilny klucz z kontekstem (zmiana brzmienia polskiego tekstu nie unieważnia przekładów).

Ustalenia wiążące:
1. **Słowniki:** `apps/mobile/src/i18n/locales/<kod>.json` (zagnieżdżone, format i18next v4, liczba mnoga przyrostkami CLDR `_one/_few/_many/_other`...), obok `<kod>.kontekst.json` (opis dla tłumacza). `pl.ts` usunięty, `pl.json` = jedyne źródło (333 wartości). Klucz liczby mnogiej ma wszystkie formy CLDR języka, także `other` (po polsku ułamki: dopełniacz).
2. **Pakiet `packages/jezyki` (`@szkola/jezyki`, bez RN i bez `expo-*`):** `JEZYKI` (35), `ZRODLO` pl, `ZAPASOWY` en, `NAKLADKI` (es-419 → es, pt-BR → pt), `jezykZTagu`, `wybierzJezyk(tagi, dostepne)`, `lancuchZastepczy` (wariant → język → źródło), `sprawdzIntl`, `formatujLiczbe/Procent/Date`, `opcjeI18next`, `utworzI18n`. Import w aplikacji i w `content-build`.
3. **Język:** ustawienie `auto` (preferencje systemu: pierwszy tag z listy mający słownik; spoza listy albo bez słownika → angielski, a bez en źródło) albo konkretny język (D-132). Zmiana w trakcie działania: `ustawJezyk()` → `i18n.changeLanguage`, bez restartu. Zapis ustawienia w bazie to zakres roli 08 (`postep`, tabela ustawień).
4. **Polyfill:** `src/i18n/polyfille.ts` importuje `@formatjs/intl-pluralrules/polyfill-force.js` i `locale-data/<język bazowy>.js` dla każdego języka w wydaniu (lista `WYDANE` w `slowniki.ts`, zgodność pilnuje `konfiguracja.test.ts`). Przy starcie `sprawdzIntl(WYDANE)`: w buildzie deweloperskim wyjątek, w produkcji `console.error`.
5. **Tylko liczby całkowite w kluczach mnogich.** Test w Node (`packages/jezyki/test/polyfill.test.ts`): polyfill formatjs 6.3.15 i ICU Node 22 (CLDR 48) zgadzają się dla liczb całkowitych 0–204, 10^6 i 10^6+1 we wszystkich 35 językach; dla ułamków (0,5; 1,5; 2,5; 10,5) różnią się w 10 językach (bg, da, el, es, es-419, hu, lt, lv, nb, tr). Konsekwencja: klucz liczby mnogiej przyjmuje tylko liczby całkowite (liczniki), ułamki przekazuje się jako sformatowany parametr w zwykłym kluczu.
6. **Łańcuch zastępczy:** brak klucza w języku → następny język łańcucha → źródło. W buildzie deweloperskim i w testach brak klucza w źródle rzuca błąd (`scisle`), chyba że wywołanie podaje `defaultValue` (opcjonalna podpowiedź, np. `play/report/[id].tsx`). Pusty przekład: błąd skryptu, nie ukrywany w czasie działania (`returnEmptyString: false` psułoby `defaultValue: ''`; odrzucone).
7. **Formaty:** interfejs formatuje przez `Intl` z kodem języka aplikacji, nie regionem telefonu (D-134). Liczby w treści (`{{n:klucz}}`, 3 392 użyć) formatuje `content-build` na język pliku bazy; `formatNumber` (`tools/content-build/src/numbers.ts:108`, przecinek i spacja twarda na sztywno) wymaga przepisania na `Intl` z testem na wektorach (pl „50%”, de „50 %”, fr „50 %”, tr „%50”) w roli 08 (ścieżka wrażliwa).
8. **Konfiguracja natywna:** wtyczka `expo-localization` z `supportedLocales` (iOS: `CFBundleLocalizations`, Android: `locales_config.xml`, sprawdzone w `withExpoLocalization.js` wersji 57.0.2) i `supportsRTL: false` (żaden z 35 języków nie jest RTL), `ios.infoPlist.CFBundleAllowMixedLocalizations: true`, `locales` → `locales/systemowe/<kod>.json` z `ios.CFBundleDisplayName` i `android.app_name`. Format pliku potwierdzony resolverem Expo (`getResolvedLocalesAsync`: iOS `CFBundleDisplayName`, Android `app_name`). `supportedLocales` = słowniki = rejestr języków (test).
9. **Skrypt kontroli:** `scripts/sprawdz-i18n.mjs` z biblioteki (c025063) z jedną zmianą: w znaczniku terminu `{{t:klucz|forma}}` porównywany jest sam klucz (forma jest tekstem do przekładu). Komendy: `pnpm i18n` (słowniki, w `pnpm run ci`), `pnpm i18n:kod` (z `--kod`, stan wyjściowy 19 błędów i 26 uwag w starych ekranach: `docs/lokalizacja/dowody/`; do E2).

### Konsekwencje
- Dobre: bez migracji 49 wywołań; 35 języków z jednej listy w aplikacji, buildzie treści i skrypcie; samosprawdzenie wychwytuje brak polyfillu; testy polyfillu na prawdziwych danych dla wszystkich 35 języków.
- Złe: dwa miejsca do utrzymania przy nowym języku (plik + wpisy w `slowniki.ts`, `polyfille.ts`, `app.json`), spięte testem; ułamki w kluczach mnogich zakazane (reguła dla roli 08).
- Znacznik terminu `{{t:klucz|forma}}` jest renderowany z `terms.yaml` tylko po polsku z nazwą angielską; w pozostałych językach potrzebne są nazwy terminów na język (glosariusz roli 09 + rola 06) `[DO USTALENIA]` przed E3.
- Przy aktualizacji `@formatjs/intl-pluralrules` albo SDK test z ułamkami przypina listę 10 języków; zmiana listy wymaga decyzji.
- Od czego zależy: działanie `Intl.PluralRules` w silniku Hermes na telefonie (samosprawdzenie przy starcie; test w Node nie jest Hermesem). Wersja SDK w `package.json` to 57, a ADR 0001 zakłada 58; fakty o `supportedLocales` sprawdzono w zainstalowanej wersji 57.0.2.

### Potwierdzenie
- `pnpm --filter @szkola/jezyki test`: 134 testy (wektory CLDR, polyfill dla 35 języków, wybór języka, łańcuch, formaty).
- `pnpm test:skrypty`: 12 testów skryptu kontroli; `pnpm i18n`: 0 błędów.
- `apps/mobile/src/i18n/__tests__/konfiguracja.test.ts`: `supportedLocales` = słowniki = `locales` = dane polyfillu.
- Telefon (krok właściciela, E2): lista kontrolna z samosprawdzeniem `Intl.PluralRules` na Hermesie.

## Opcje: zalety i wady
### A: react-i18next, JSON
- Zalety: zostaje istniejąca biblioteka; skrypt kontroli czyta jej format; klucz niezależny od brzmienia.
- Wady: klucze trzeba wymyślać i opisywać kontekstem; rodzaj i przypadek osobnymi kluczami.
### B: Lingui
- Zalety: ICU MessageFormat (kategorie wybiera tłumacz), wygodne wyciąganie tekstów.
- Wady: konfiguracja kompilacji do sprawdzenia z Expo; skrypt kontroli nie czyta jej katalogów; migracja 49 wywołań.
### C: tekst jako klucz (Trening)
- Zalety: kod czytelny po polsku; brak kluczy do wymyślania.
- Wady: zmiana polskiego brzmienia unieważnia przekłady we wszystkich językach; dwa znaczenia tego samego tekstu zlewają się w jeden klucz; skrypt kontroli oparty na kluczach znaczeniowych.
