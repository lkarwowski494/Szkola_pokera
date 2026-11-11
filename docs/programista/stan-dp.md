# Stan sesji DP (08-programista, build): widok punktu ICM (D-889)
Aktualizacja: 2026-11-11 · gałąź `sesja-dp-icm` (start 370a1548) · polecenie `docs/koordynacja/polecenia/DP.md` @ b1f0f56 · decyzje `docs/decyzje/DP.md` (D-985…D-989)

## E0
- Środowisko: Linux, Node v22.23.4, pnpm 10.28.0, push na gałąź roboczą; bez Xcode i symulatora, bez przeglądarki dla ekranów RN (kryteria 5 i 6 poza zasięgiem).
- Tożsamość git ustawiona lokalnie (była `Claude <noreply@anthropic.com>`). HEAD startu = 370a1548 (zgodny z poleceniem).
- Stan wyjściowy: `pnpm exec jest src/features/scenariusz` w `apps/mobile`: 19 zestawów, 221 testów zielone (39 s).
- Trening: `gh api search/code` dla „ICM” i „fontScale” w `lkarwowski494/trening`: 0 trafień (2026-11-11).

## Zrobione
| Kryterium (design-spec) | Dowód |
|---|---|
| 1 stosy wszystkich graczy w bb, wypłaty, suma 100% | `dp-icm-d889.test.tsx` „kryterium 1” (3 i 4 graczy) |
| 2 stos „ty” i dopłata z twojego stosu, przypis | „kryterium 2” (twój stos większy: bez przypisu; ≤: przypis) |
| 3 pula, dopłata, przycisk, dziennik z jednej funkcji | `ukladIcm` (`wariant.ts`), „kryterium 3” |
| 4 VoiceOver: etykieta stołu, lista, pasek ukryty | „kryterium 4” (`includeHiddenElements`) |
| 5 AX5 na 320/390/430, przepełnienie | **nie do sprawdzenia tu**: lista kontrolna niżej; test logiczny: pasek znika przy skali 3,1 |
| 6 zrzut z aplikacji vs `wzorce-zrzuty/scenariusz-icm/icm-4-graczy-390.png` | **nie do sprawdzenia tu**: lista kontrolna niżej (audyt roli 04) |
| `icm-call` w `RODZAJE_NA_EKRANIE` + warunek SC-34 | D-986; testy content-build (`cp-recenzja-cn`, `cm-recenzja-cl`, `recenzja-cq-odtworzenie`) |

## Lista kontrolna „tylko telefon” (właściciel albo rola 04)
1. Wygeneruj punkt ICM (szablon testowy; SC-34 jest poza `content/`, więc w buildzie testowym wymaga szablonu z `icm-call` bez poziomu trudnego): ekran decyzji 4 graczy i 3 graczy, jasny i ciemny motyw.
2. Porównaj z `docs/design/wzorce-zrzuty/scenariusz-icm/icm-4-graczy-390.png`: stół (miejsca w rzędzie nad kartami: układ w RN jest uproszczony względem owalu w makiecie), pasek stosu (złoty „ty”), przypis „cały twój stos”.
3. Rozmiar tekstu AX5 na iPhone SE (320 pt), 390 i 430 pt: brak przepełnienia, pasek stosu znika, wartość „N bb” zostaje w wierszu (próg 2,5: D-987; sprawdź AX3 i AX4).
4. VoiceOver: stół czyta się jako jeden element („Stół: ty na BB, karty …”), lista stosów jako lista, nagłówek bańki jako nagłówek, pasek stosu pomijany.
5. Ocena: wiersz „Stosy i nagrody” zwinięty, po dotknięciu lista i zdanie nagród.

## Dla innych ról
- **04:** akceptacja D-985 (pula), D-988 (etykieta VO bez narzędnika), D-989 (teksty en), układu stołu w RN (rząd miejsc zamiast owalu); audyt zgodności po wdrożeniu.
- **09:** przekład 15 kluczy `scenario.icm.*` na 10 języków (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant; dziś kopie en): `tableLabel, foldedOne, foldedMany, bubble, prizes, place, noPrizeThird, noPrizeFourth, stacksLabel, you, rival, stackValue, rowLabel, wholeStack, rewards`. Uwagi do przekładu: U+00A0 przed „bb” w `stackValue`, w `place` (pl) po liczebniku; `noPrizeThird/Fourth` zależne od liczby graczy (3 albo 4).
- **06:** SC-34 poziom trudny: 06-tresci-002 (D-986); do tego czasu szkic poza `content/`.
- NIS-DA-01 (09): „9bb” obok „9 bb” w `play.*` (bez zmian).
- NIS-DA-02 (04/08, niskie): „Zobacz podsumowanie” łamie wyraz przy AX5 (bez zmian; nie dotyczy tego zadania).

## Otwarte
- D-985 (pula): rozstrzygnięte przez koordynatora jako KO-068 (wariant B, wdrożony). Potrzeba tekstu przypisu „nadwyżka rywala wraca do niego” dla roli 04 (razem z D-966).
- `pnpm run ci` na końcowym SHA: `docs/programista/dowody/dp-ci-1b3e5e19.txt`: kod 0 (mobile 1033 testów; wcześniejsze przebiegi: czerwone na e66df9dc terms.test, na 256cc66d i18n --kod, naprawione).
