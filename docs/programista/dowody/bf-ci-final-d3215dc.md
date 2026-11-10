# BF: log CI (SHA d3215dc, 2026-11-10): pnpm run ci kod 0
packages/srs test:  Test Files  3 passed (3)
packages/srs test:       Tests  21 passed (21)
packages/jezyki test:  Test Files  6 passed (6)
packages/jezyki test:       Tests  144 passed (144)
packages/poker-core test:  Test Files  12 passed (12)
packages/poker-core test:       Tests  165 passed (165)
packages/domena test:  Test Files  23 passed (23)
packages/domena test:       Tests  331 passed (331)
tools/preflop-solver test:  Test Files  9 passed (9)
tools/preflop-solver test:       Tests  44 passed (44)
packages/postep test:  Test Files  17 passed (17)
packages/postep test:       Tests  134 passed (134)
tools/content-build test:  Test Files  18 passed (18)
tools/content-build test:       Tests  194 passed (194)
apps/mobile test: Tests:       703 passed, 703 total
# Subtest: zmiana definicji en (terms-def.yaml) zmienia skrót en terminu krytycznego, a skrót pl zostaje
ok 6 - zmiana definicji en (terms-def.yaml) zmienia skrót en terminu krytycznego, a skrót pl zostaje
# Subtest: metadane z repo: pl, en-US, ja, zh-Hant, pt-BR, fr-FR i aliasy en-GB/en-CA/en-AU = en-US, fr-CA = fr-FR (D-382 AF); wstawka adresu prywatności podmieniona; walidacja bez błędów
ok 108 - metadane z repo: pl, en-US, ja, zh-Hant, pt-BR, fr-FR i aliasy en-GB/en-CA/en-AU = en-US, fr-CA = fr-FR (D-382 AF); wstawka adresu prywatności podmieniona; walidacja bez błędów
# Subtest: fala 2 (D-374, D-391): kody de-DE, es-ES, es-MX, ko, it, vi w LOCALE_MAP; docs/sklep/aso/metadane-fala2.json waliduje się bez błędów
ok 128 - fala 2 (D-374, D-391): kody de-DE, es-ES, es-MX, ko, it, vi w LOCALE_MAP; docs/sklep/aso/metadane-fala2.json waliduje się bez błędów
# Subtest: poprawny plik (z identyfikatorem UUID): 0 błędów
ok 151 - poprawny plik (z identyfikatorem UUID): 0 błędów
# Subtest: D-532: stary plik v1 bez tabeli wariant_historia → 0 błędów; z poprawną tabelą też; ze złą kolumną → błąd
ok 158 - D-532: stary plik v1 bez tabeli wariant_historia → 0 błędów; z poprawną tabelą też; ze złą kolumną → błąd
# Subtest: każdy workflow parsuje się bez błędów
ok 169 - każdy workflow parsuje się bez błędów
# pass 192
# fail 0
 Test Files  6 passed (6)
      Tests  35 passed (35)
krytyczne: 56
0 błędów, 0 uwag
exit 0
