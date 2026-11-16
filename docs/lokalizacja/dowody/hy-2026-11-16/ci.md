# HY 2026-11-16: pnpm run ci — kod wyjścia 0

Stan: poprawki HY w `content/`, bazy przebudowane (hash c2a6a8440b). Wyciąg z logu (wiersze podsumowań, bez ostrzeżeń ExperimentalWarning i bez uwag i18n o kluczach dynamicznych):

```
packages/srs test:  Test Files  3 passed (3)
packages/srs test:       Tests  21 passed (21)
packages/jezyki test:  Test Files  6 passed (6)
packages/jezyki test:       Tests  144 passed (144)
packages/poker-core test:  Test Files  43 passed (43)
packages/poker-core test:       Tests  341 passed (341)
packages/domena test:  Test Files  27 passed (27)
packages/domena test:       Tests  347 passed | 1 expected fail (348)
tools/preflop-solver test:  Test Files  9 passed (9)
tools/preflop-solver test:       Tests  44 passed (44)
packages/postep test:  Test Files  21 passed (21)
packages/postep test:       Tests  160 passed (160)
tools/content-build test:  Test Files  82 passed (82)
tools/content-build test:       Tests  859 passed | 1 expected fail (860)
# Subtest: 06-tresci-001: zmiana why w pl bez przekładu = błąd R-M12-009 w 11 językach; po przekładzie i zapisie sha_pl 0 błędów
ok 7 - 06-tresci-001: zmiana why w pl bez przekładu = błąd R-M12-009 w 11 językach; po przekładzie i zapisie sha_pl 0 błędów
# Subtest: metadane z repo: pl, en-US, ja, zh-Hant, pt-BR, fr-FR i aliasy en-GB/en-CA/en-AU = en-US, fr-CA = fr-FR (D-382 AF); wstawka adresu prywatności podmieniona; walidacja bez błędów
ok 115 - metadane z repo: pl, en-US, ja, zh-Hant, pt-BR, fr-FR i aliasy en-GB/en-CA/en-AU = en-US, fr-CA = fr-FR (D-382 AF); wstawka adresu prywatności podmieniona; walidacja bez błędów
# Subtest: fala 2 (D-374, D-391): kody de-DE, es-ES, es-MX, ko, it, vi w LOCALE_MAP; docs/sklep/aso/metadane-fala2.json waliduje się bez błędów
ok 135 - fala 2 (D-374, D-391): kody de-DE, es-ES, es-MX, ko, it, vi w LOCALE_MAP; docs/sklep/aso/metadane-fala2.json waliduje się bez błędów
# Subtest: poprawny plik (z identyfikatorem UUID): 0 błędów
ok 163 - poprawny plik (z identyfikatorem UUID): 0 błędów
# Subtest: D-532: stary plik v1 bez tabeli wariant_historia → 0 błędów; z poprawną tabelą też; ze złą kolumną → błąd
ok 170 - D-532: stary plik v1 bez tabeli wariant_historia → 0 błędów; z poprawną tabelą też; ze złą kolumną → błąd
# Subtest: każdy workflow parsuje się bez błędów
ok 197 - każdy workflow parsuje się bez błędów
 Test Files  6 passed (6)
      Tests  35 passed (35)
błędy: 0, uwagi: 571; języki: de, en, es, fr, it, ja, ko, pl, pt, pt-BR, vi, zh-Hant; kluczy w źródle: 872
0 błędów, 1 uwag
ci=0
```
