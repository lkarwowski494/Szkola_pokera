# Nałożenie pełnego przeglądu 9 języków (sesja AU, 2026-11-10, rola 09 build)

Baza: `sesja-au-poprawki` @ f8272c1. Poprawki: `przeglad-pelny-2026-11-10/<j>/poprawki-<j>.json` (AP, AQ, AR). Narzędzie: `docs/lokalizacja/narzedzia/naloz-pliki.mjs` (nakłada wprost na pliki; `stary` dokładnie raz w bieżącej treści; kolejność z pliku).

## Liczby na język

| język | poprawek w pliku | treść/interfejs nałożone | sklep (generator `zbuduj-metadane.py`) | pominięte bez powodu | pominięte przez narzędzie |
|---|---|---|---|---|---|
| ja | 229 | 1 (WYS, krok 1) + 224 | 4 | 0 | 0 |
| zh-Hant | 347 | 339 | 8 | 0 | 0 |
| ko | 485 | 481 | 4 | 0 | 0 |
| it | 291 | 288 | 3 | 0 | 0 |
| es | 123 | 1 (WYS) + 121 | 1 | 0 | 0 |
| pt-BR | 112 | 105 | 7 | 0 | 0 |
| fr | 419 | 5 (WYS) + 411 | 3 | 0 | 0 |
| de | 368 | 5 (WYS) + 360 | 3 | 0 | 0 |
| vi | 475 | 3 (WYS) + 472 | 0 | 0 | 0 |
| **razem** | **2849** | **2816** | **33** | **0** | **0** |

Pominięte (z powodem): 0 poprawek. Poprawki sklepowe (33) nałożone w źródle generatora: 32 narzędziem, 1 ręcznie (pt-BR „As aulas, a avaliação” → „As lições…”, w źródle tekst rozbity na dwie linie). Poprawki odrzucone w przeglądzie (AQ: es 2, pt-BR 3; AR: vi 8 w `poprawki-vi-wylaczone.json`; AP: wykluczenia) nie są w plikach poprawek i nie były nakładane.
Poza formatem (14 miejsc, `sed` z `AP-uwagi.md`): zh-Hant m6-l3 linie 13, 59, 69, 79, 89 (莊位 → 按鈕位, po 2×), `zh-Hant.json` 232, 243 (教學網站 → 訓練網站), ko m6-l2 (4×) i m7-l1 (3×) c-bet을 → C벳을; liczby przed/po: `nalozenie-AU/sed-AP.txt`.

## Zadanie 1 (WYS)
Test `apps/mobile/src/i18n/__tests__/przeglad-pelny-wys-09.test.ts`: 15 ✕ przed (`nalozenie-AU/wys-czerwony.txt`), 15 ✓ po (`wys-zielony.txt`). Zakres: ja `data.replaceBody` (kierunek zastąpienia postępu w oknie importu, wzór `pl.json:99`), es m4-l4:33, 13 zgubionych znaczników fr/de/vi.

## Ujednolicenie form (D-430, D-440; `ujednolic-formy.mjs`)
Nowe reguły: fr „le/au/du Button” → Bouton, „à l'abattage” → „au showdown”, tag showdown; de tag Straight → Straße; it maniaco → maniac; vi tagi big/small blind, bluff, range, draw → nazwy z `terms-nazwy`. 384 zamian, drugi przebieg 0, 0 wierszy w m12 (`ujednolicenie-AU-2026-11-10.md`). Świadomie bez zmian (otwarte w README przeglądu lub zmiana wymagałaby zgody gramatycznej): vi check/xem bài, pot/hũ, board, street; fr board/tableau, equity w polu `source`, tapis; de Two Pair/zwei Paare (zgoda liczby w zdaniu), Bet/Einsatz; it sfruttamento (rodzajnik). `terms-nazwy`: ja 19 i zh-Hant 10 nazw `null` → nazwa (z poprawek S1/T), zgodnie z D-420.

## KO-022
fr `fr.json:487` „Cartes de révision” → „Fiches de révision” (do weta; zgodne z 12 miejscami lekcji m13-l2).

## Metadane sklepu (KO-020, KO-021, KO-024)
Generator `docs/sklep/aso/zbuduj-metadane.py`: w opisie 9 języków linia o czterech stopniach z nazwami z `grade.*` interfejsu (ja/zh-Hant/ko/fr/de z poprawek przeglądu, it/es/pt-BR/vi dopisane w AU); de podtytuł „Entscheiden üben ohne Echtgeld” (30 zn.); ko podtytuł „결정마다 평가와 해설, 판돈 없음” (KO-024). `sprawdz-metadane-aso.py` kod 0, 0 błędów (`nalozenie-AU/sprawdz-metadane-aso.txt`). Przegląd autor ≠ recenzent: subagent w świeżym kontekście — nazwy stopni identyczne z interfejsem w 9/9 (różnica tylko wielkość liter); zdanie o braku stawek zachowane w 9/9. Uwagi NISKIE (backlog, bez zmian): zh-Hant „課程” = kurs i lekcje; ja „購入の永久アクセス” (podwójne の); ko 플롭 w opisie vs 프리플랍 w słowach kluczowych. **Poza zakresem 9 języków:** opis en-US pisze „correct” dla pierwszego stopnia, interfejs en „Aligned” (KO-020 wymaga identyczności) — do roli 10.

## Kontrola (a) treści krytycznej (zadanie 5)
Zmienione miejsca m12 / R-M12-* / helplines: ja 12, zh-Hant 13, ko 59, it 23, es 11, pt-BR 11, fr 40, de 8, vi 26 (203). Trzy subagenty w świeżym kontekście: przekład zwrotny z samego pakietu przed otwarciem pl, potem porównanie (`nalozenie-AU/kontrola-a/<j>-wynik.md`, pakiety `<j>-pakiet.md`). Wynik: 0 KRYT, 0 WYS, 0 ŚR; NISKIE 3 (fr m12-l3:78 „Par rédiger”, it m12-l2:42, es m12-l4:85); klucze `{{n:}}` identyczne z pl we wszystkich miejscach (skrypt). Odstępstwo nazwane: dla es i pt-BR krok 1 nie w pełni niezależny (recenzent miał wcześniej przeczytane część wierszy pl); helplines: numerów nie porównywano (zmiana tylko szyku zdania w ko). W ja/ko poprawiono błędny kierunek „proporcjonalnie do pierwiastka” → „odwrotnie proporcjonalnie”. Rejestr: `przeglad_jezyki` zaktualizowane dla 60 pozycji (`docs/tresci/rejestr/m12-m13.json`, `pomoc.json`).

## Kontrole końcowe
Zob. `nalozenie-AU/ci-koncowe.txt` (`pnpm content:build`, `pnpm i18n`, `pnpm run ci`).
