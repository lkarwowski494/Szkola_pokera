# Stan sesji EN (rola 09, fix): poprawki przekładu po EM (ŚR 001–007, NIS 008–010)
Aktualizacja: 2026-11-12 · gałąź `sesja-en-przeklad-fix` (start 5b8c9984; robocza `naprawy/09-lokalizacja-2026-11-11` lokalnie = ta sama treść) · polecenie `origin/koordynacja:docs/koordynacja/polecenia/EN.md` @ 18ac0348 · decyzje `docs/decyzje/EN.md` (D-1235…D-1239)

## Zrobione: tabela znalezisko → zmiana
Narzędzie: `docs/lokalizacja/narzedzia/en-poprawki.mjs` (+ `en-poprawki-dane.mjs`): kontrole akceptacyjne i zamiany; `sprawdz` przed: 40 czerwonych z 41 (`dowody/en-sprawdz-przed.txt`, uruchomione na 5b8c9984), po: 41 zielonych, kod 0 (`dowody/en-sprawdz-po.txt`). `mech` (znaczniki `{{n:}}`/`{{w:}}`/`{{t:}}` i cyfry vs pl, 10 języków × scenariusze, rules, egzaminy): 591 rozbieżności przed i po, diff pusty (`dowody/en-mech-przed.txt`, `-po.txt`; rozbieżności istniejące przed zmianą, nie analizowane; zmiany nie dodały nowych).

| ID | Commit | Zmiana (plik:klucz) |
|---|---|---|
| 001 | 8a4cc13c | `sc-06.yaml` explanation (raise 3): es „Button”, it „Button”, pt, pt-BR „Button”, vi „Button”, zh-Hant „按鈕位”, fr „Bouton”; fr `sc-05/08/11/12` „Button” → „Bouton” (14 miejsc) |
| 002 | 8607bf68 | fr `sc-34` call „suivez”; it `sc-34` „Chiami”; pt-BR `sc-33` (2) i `sc-34` „paga” |
| 003 | 16b3459b | de „Eine kleine/große/solche Bet” w `sc-04`, `sc-05`, `sc-11`, `sc-12`; `lessons/m7-l4-probe-obrona.md` „gegen die Bet”; rules/m2-l2 bez zmian (D-1235) |
| 004 | 6d748165 | pt `sc-32` (os blinds ×2, shove ×2), `sc-33` (o seu blind ×2, shove), `sc-34` situation |
| 005 | e8e999d3 | ko `sc-06` (situation, 2 explanation), `sc-32` situation: „당신 차례까지 모두” |
| 006 | ea589d2a | vi `sc-06` (2) i `rules.yaml` (5): „{{t:open\|mở cược}} rộng” |
| 007 | e86be417 | it `sc-06/08/32/33` („sei in”, „blind”); fr `sc-32` stack, `sc-33` range de call + équité; zh-Hant `sc-33` 權益 ×2, `sc-04` 入池 ×3, `rules.yaml` R-M11-009.then, `exams/m11.yaml` 泡沫係數; de `sc-06` raise |
| 008 | 3d587043 | `{{t:raise}}` w `sc-06` raise: es, fr, it, pt, pt-BR, vi (de w 007; ja/ko/zh-Hant D-1236) |
| 009 | c1f0f54c | fr 72 spacje → U+00A0 w `content/fr/scenarios/` (D-1237) |
| 010 | d19f1191 | de/es/fr/it/ja/ko/pt-BR/vi/zh-Hant: 15 zamian (lista w commicie) |
| ja 3-bet | 495a65bb | `content/ja/terms-nazwy.yaml:70` 3-bet „3ベット” zamknięte (D-1238) |
| generowane | 056638fa | `pnpm content:build`: 35 baz + `tresc.generated.ts` |

`pnpm run ci` na 056638fa: kod 0 (`dowody/en-ci-056638fa.txt`; 1 uwaga istniejąca: `przeglad_jezyki bez sha_pl`, 66 wpisów, domknięcie = 06 wg stan-de).

## Czego nie zrobiono / otwarte
- Zrzutów ekranu nie robiłem (zmiany tekstów w pliku, bez zmian układu; brak symulatora). Test na urządzeniu: lista kontrolna po stronie właściciela jak dotąd.
- Status „zweryfikowane” nadaje dopiero `reaudit`; przegląd człowieka znającego język: brak (polityka „szeroka”).
- Nowe znalezisko (NIS, do backlogu): fr 44 zwykłe spacje poza scenariuszami i brak kontroli typografii fr w teście treści (`docs/decyzje/EN.md`, „Otwarte pytania”).
- Konflikt przy scaleniu: pliki generowane (`apps/mobile/assets/content/tresc-*.db`, `tresc.generated.ts`) zmieniają skrót przy każdej zmianie treści; równoległa sesja 06 EL (pl/en) zmieni te same pliki, więc po scaleniu należy je odbudować (`pnpm content:build`), nie rozwiązywać ręcznie. Dla ułatwienia commit generowanych jest osobny (056638fa) i można go pominąć przy scalaniu.
- Przegląd świeżym kontekstem (D-043): ścieżki z listy wrażliwej nie zostały zmienione ręcznie; jedyny dotknięty plik z listy to wygenerowany `apps/mobile/src/data/content/tresc.generated.ts` (zmiana wyłącznie skrótu wersji i nazw zasobów). Przegląd subagenta: nie odbył się (nie dotyczy).

## Punkt czyszczenia
Rola 09, tryb fix, polecenie EN; plik stanu `docs/lokalizacja/stan-en.md`; następny krok: PRZEKAZANIE do koordynatora (CI: `dowody/en-ci-056638fa.txt`).
