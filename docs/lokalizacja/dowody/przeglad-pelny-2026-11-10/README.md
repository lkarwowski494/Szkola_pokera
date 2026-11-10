# Pełny przegląd przekładu fr, de, vi — raport sesji AR (2026-11-10)

Rola 09-lokalizacja, tryb audit, tylko dokumenty. Polecenie: `koordynacja:docs/koordynacja/polecenia/AR.md` @ 5c930d5. Baza: `claude/sleepy-brahmagupta-2065nu` @ 016317e (polecenie podawało e01ba05; koordynator potwierdził 016317e). W `content/`, kodzie i `store/` nic nie zmieniono.

## Wynik

| język | KRYT | WYS | ŚR | NISKIE | poprawek do nałożenia | walidacja |
|---|---|---|---|---|---|---|
| fr | 0 | 5 | 278 | 195 | 419 (`fr/poprawki-fr.json`) | 419 poprawnych, 0 błędów |
| de | 0 | 5 | 193 | 158 | 368 (`de/poprawki-de.json`) | 368 poprawnych, 0 błędów |
| vi | 0 | 3 | 328 | 105 | 475 (`vi/poprawki-vi.json`) + 8 odłożonych (`vi/poprawki-vi-wylaczone.json`) | 475 poprawnych, 0 błędów |

Liczby KRYT–NISKIE to wiersze znalezisk (`<język>/znaleziska.md`); jeden wiersz może obejmować kilka miejsc, dlatego liczba poprawek bywa większa albo mniejsza (znaleziska „bez JSON” to wybory terminu dla całego korpusu).

- **WYS (13)**: wszystkie to zgubiony znacznik terminu `{{t:…}}` przy niezmienionym sensie zdania: fr rules R-M7-001/012/013 (`t:bet`), m5-l3:130 (`t:pair`), m8-l3:55 (`t:big-blind`); de rules R-M6-001, R-M8-001, R-M10-011 (`t:fold`), m8-l1:17 (`t:fold`), m8-l1:50 (`t:call`); vi rules R-M9-008 (`t:street`), R-M10-009 (`t:bluff`), exams/m5:100 (`t:pot`).
- **Zmieniona liczba, ręka, zakres, poprawna odpowiedź albo odwrócony kierunek zalecenia: 0** w żadnym języku (każdy recenzent porównał też mechanicznie klucze znaczników, karty i pola `correct`).
- **Treść krytyczna** (lekcje i egzamin m12, `helplines.yaml`, R-M12-*): przeczytana zdanie po zdaniu w 3 językach; sens, granice (najpóźniej / najwcześniej / nigdy mniej niż), nazwa i adres organizacji zgodne ze źródłem; znaleziska tylko ŚR/NISKIE (niespójne nazwy typów tiltu, vi „một lần trong năm” czytane „raz w roku”).
- **Nieścisłości sensu (ŚR) warte uwagi**: vi „do rivera” → „trước river” („przed riverem”) w 6 miejscach m7/m9; vi „raz na pięć” dwuznaczne w m9-l2:31 i m12-l2:97; de m5-l3:122 „mittlere” zamiast „mittelnasse”; de m7-l4:108 i exams/m3:40 „weiter” (= „dalej”) zamiast „breiter”; fr m10-l3:49 i egzamin m10 q7 „tables” zamiast „boards”.
- **Dominujący problem we wszystkich trzech językach**: niespójna terminologia między plikami tego samego modułu (pliki tłumaczone osobno). Poprawki ujednolicają do `content/<język>/terms-nazwy.yaml` (D-440 niżej). Przykłady: fr Button/Bouton, equity/équité, stack/tapis, abattage/showdown; de rodzaj Bet/SPR/3-Bet, Straight/Straße, Two Pair/zwei Paare; vi big blind/mù lớn, range/dải bài, draw/bài chờ, bluff/tháu cáy.

## Metoda i ograniczenia

- Instrukcja recenzenta: `instrukcja-przegladu.md`. 16 części na język (R1–R3 `rules.yaml`; L1–L11 lekcje i egzaminy; U1 interfejs, teksty systemowe, metadane sklepu, `areas`, `modules`, `spots`; T1 `terms-def`, `terms-nazwy`), razem 48 recenzentów AI w świeżym kontekście, ten sam model co sesja, bez wglądu we wcześniejsze przeglądy. Każdy czytał swój zakres w całości obok źródła pl.
- Sesja główna czytała podsumowania i tabele, nie całe pliki; poprawek nie weryfikowała ręcznie jedna po drugiej. Kontrola mechaniczna (`narzedzia/waliduj-poprawki.mjs.txt`): `stary` występuje w pliku `cel` dokładnie raz przy nakładaniu **w kolejności z pliku**, zestaw kluczy `{{t:}}`/`{{n:}}` bez zmian, chyba że `powod` zawiera słowo „znacznik” (fr 8, de 8, vi 7 takich poprawek: przywrócony, usunięty nadmiarowy albo scalony znacznik).
- To jest drugi przegląd AI, **nie** ocena rodzimego użytkownika języka (zasada roli 2). Pozycje o niskiej pewności są w sekcjach „Do sprawdzenia przez człowieka znającego język” w `czesci/*.md`.
- Format poprawek = `docs/lokalizacja/narzedzia/poprawki.mjs` (`jezyk, cel, stary, nowy, waga, powod, grupa`), ale `stary` odnosi się do **plików w repo na 016317e** (przekład jest już nałożony), nie do artefaktu `propozycje.json`. Kilka poprawek ma `cel` poza `content/`: słownik interfejsu, `docs/sklep/aso/metadane-fala2.json` (de 3), `store/app-store-metadata.json` (fr).
- Luka wykryta przy budowie tabeli pokrycia i domknięta w tej samej sesji: lekcje `m0-l1` i `m13-l1…l3` nie były w pierwszych 15 zleceniach; dostały osobną część L11 w każdym języku.
- **Wyjątek procesu (nazwany)**: nie powstał raport `audit/09-lokalizacja-2026-11-10.md` według szablonu roli ani przebieg `sprawdz-raport.mjs`; polecenie AR (pkt 3) definiuje wynik jako znaleziska i pliki poprawek na język. Z listy kontrolnej roli sprawdzano tylko jakość przekładu (LOK-06, LOK-10, LOK-11 w części językowej); LOK-01–05, 07–09, 12–15, zrzuty i pseudolokalizacja — nie sprawdzano w tej sesji.

## Nieprzejrzane

- `store/iap-localizations.json`: wpisów fr, de, vi nie ma (są tylko pl, en) — nie ma czego przeglądać.
- `content/numbers.yaml`, `content/ranges/*` poza `spots.yaml`: bez tekstu do przekładu, poza zakresem.
- Działająca aplikacja (render znaczników bez formy, wielka litera na początku zdania, łamanie wierszy): nie uruchamiano.
- `pl.kontekst.json`: tylko punktowo.

## Decyzje terminologiczne i techniczne (do weta; pula D-440…D-449; do przeniesienia do `docs/decyzje.md` przez koordynatora)

| ID | Data | Decyzja | Odrzucone | Powód |
|---|---|---|---|---|
| D-440 | 2026-11-10 | Kierunek ujednolicenia terminów w poprawkach fr, de, vi = nazwa z `content/<język>/terms-nazwy.yaml`. Skutek: z listy vi odłożono 8 poprawek `vi-U1` w `ranges/spots.yaml`, które dodawały formę „mù nhỏ / mù lớn” (kierunek odwrotny niż 100+ poprawek L1, L2, L3, L8, L9 → „big blind / small blind”); zapisane w `vi/poprawki-vi-wylaczone.json` | (b) większość korpusu (vi: „mù nhỏ” 61 vs „small blind” 49, „xem bài” 154 vs „check” 125) — wymagałoby zmiany K-05 i poprawek w drugą stronę | CLAUDE.md: jedna nazwa na jedno pojęcie; `terms-nazwy` to przyjęty rejestr (D-367, D-372), a znacznik bez formy i tak wyświetla tę nazwę obok formy z tekstu |
| D-441 | 2026-11-10 | Nazwy ocen, obszarów i ekranów w lekcjach m13 i egzaminie m13 poprawiane do brzmienia słownika interfejsu (de „Übereinstimmend / Vertretbar”, „Zeit überschritten”; fr „domaine”; vi „lĩnh vực”, „Sai lầm”, „Phù hợp”) | (b) zmienić interfejs do brzmienia lekcji | lekcja opisuje to, co użytkownik widzi na ekranie; zmiana interfejsu to brzmienie roli 04 (zasada 15) |
| D-442 | 2026-11-10 | Wyjątek procesu: wynik w formacie polecenia AR zamiast raportu audytu z szablonu roli (patrz „Metoda”) | (b) pełny raport audit z 15 pozycjami LOK | zakres zlecony przez koordynatora to przegląd przekładu, tylko dokumenty |

Pozostaje otwarte (bez poprawki JSON, wybór w całym korpusie — listy w `czesci/*-T1.md` i w wierszach „JSON: nie”): fr implied odds / cote implicite, suivre / payer / call, se coucher / fold, board / tableau, preflop / préflop; de Bet / Einsatz, raisen / erhöhen, Open / Eröffnung, out of Position / ohne Position, „Kombination” w dwóch znaczeniach, egzamin m13 „Zulässig” wobec interfejsu „Vertretbar” (de-L9, bez JSON); vi „đồng chất” użyte dla suited i monotone, check / xem bài, pot / hũ, board (bàn / bài chung / board), street = „vòng cược” (nazwa betting-round). Rozstrzygnięcie skryptem `ujednolic-formy.mjs` w sesji kodu.

## Pytania produktowe do koordynatora

1. Opis sklepu fr-FR, de-DE, vi pomija nazwy czterech stopni oceny obecne w pl i en-US. (a) dopisać (de: poprawka w `poprawki-de.json`; fr i vi: tylko znalezisko) — rekomendacja; (b) zostawić krótszy opis.
2. Podtytuł sklepu de „Entscheiden üben, ohne Einsatz” czyta się też „bez wysiłku”. (a) „Entscheiden üben ohne Echtgeld” (30 znaków; poprawka w `poprawki-de.json`, pewność średnia) — rekomendacja; (b) zostawić.
3. fr: interfejs ma „Cartes de révision”, lekcja m13-l2 12× „fiches de révision”. (a) zmienić jeden napis interfejsu na „Fiches de révision” — rekomendacja (karta = karta do gry); (b) zmienić 12 miejsc lekcji.
4. Uwagi do źródła pl (bez poprawek): m10-l3:49 i egzamin m10 q7 „rozmiary i stoły” wobec „rozmiary i flopy” w m10-l3:109; `{{n:m11.push.10.win}} blindów` wyświetla jednostkę dwa razy; m9-l4:17 znacznik board w idiomie „zostawia na stole”; kod `features/drills/text.ts:152` `toLowerCase()` na nazwie akcji (de rzeczowniki małą literą) — do sprawdzenia przez sesję kodu.

## Pokrycie jednostek (65 na język, lista z `scripts/i18n/wspolne.mjs` `jednostki()`)

Wszystkie 65 jednostek × 3 języki: przejrzane przez recenzenta AI wskazanej części (plik `czesci/<część>.md` ma tabelę „Pokrycie” z liczbą linii). Poza listą 65 przejrzano też: `terms-nazwy.yaml` (T1), `apps/mobile/locales/systemowe/<język>.json` (U1), metadane sklepu (U1: fr `store/app-store-metadata.json` fr-FR; de, vi `docs/sklep/aso/metadane-fala2.json`).

| nr | jednostka (cel, <język> = fr / de / vi) | rodzaj | fr | de | vi |
|---|---|---|---|---|---|
| 1 | `apps/mobile/src/i18n/locales/<język>.json` | ui | przejrzana (fr-U1) | przejrzana (de-U1) | przejrzana (vi-U1) |
| 2 | `content/<język>/areas.yaml` | yaml | przejrzana (fr-U1) | przejrzana (de-U1) | przejrzana (vi-U1) |
| 3 | `content/<język>/exams/m0.yaml` | yaml | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 4 | `content/<język>/exams/m1.yaml` | yaml | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 5 | `content/<język>/exams/m10.yaml` | yaml | przejrzana (fr-L8) | przejrzana (de-L8) | przejrzana (vi-L8) |
| 6 | `content/<język>/exams/m11.yaml` | yaml | przejrzana (fr-L9) | przejrzana (de-L9) | przejrzana (vi-L9) |
| 7 | `content/<język>/exams/m12.yaml` | yaml | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 8 | `content/<język>/exams/m13.yaml` | yaml | przejrzana (fr-L9) | przejrzana (de-L9) | przejrzana (vi-L9) |
| 9 | `content/<język>/exams/m2.yaml` | yaml | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 10 | `content/<język>/exams/m3.yaml` | yaml | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 11 | `content/<język>/exams/m4.yaml` | yaml | przejrzana (fr-L2) | przejrzana (de-L2) | przejrzana (vi-L2) |
| 12 | `content/<język>/exams/m5.yaml` | yaml | przejrzana (fr-L3) | przejrzana (de-L3) | przejrzana (vi-L3) |
| 13 | `content/<język>/exams/m6.yaml` | yaml | przejrzana (fr-L4) | przejrzana (de-L4) | przejrzana (vi-L4) |
| 14 | `content/<język>/exams/m7.yaml` | yaml | przejrzana (fr-L5) | przejrzana (de-L5) | przejrzana (vi-L5) |
| 15 | `content/<język>/exams/m8.yaml` | yaml | przejrzana (fr-L6) | przejrzana (de-L6) | przejrzana (vi-L6) |
| 16 | `content/<język>/exams/m9.yaml` | yaml | przejrzana (fr-L7) | przejrzana (de-L7) | przejrzana (vi-L7) |
| 17 | `content/<język>/lessons/m0-l1-uklady.md` | md | przejrzana (fr-L11) | przejrzana (de-L11) | przejrzana (vi-L11) |
| 18 | `content/<język>/lessons/m1-l1-przebieg.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 19 | `content/<język>/lessons/m10-l1-statystyki.md` | md | przejrzana (fr-L8) | przejrzana (de-L8) | przejrzana (vi-L8) |
| 20 | `content/<język>/lessons/m10-l2-typy-graczy.md` | md | przejrzana (fr-L8) | przejrzana (de-L8) | przejrzana (vi-L8) |
| 21 | `content/<język>/lessons/m10-l3-odejscie-od-bazy.md` | md | przejrzana (fr-L8) | przejrzana (de-L8) | przejrzana (vi-L8) |
| 22 | `content/<język>/lessons/m10-l4-rake.md` | md | przejrzana (fr-L8) | przejrzana (de-L8) | przejrzana (vi-L8) |
| 23 | `content/<język>/lessons/m11-l1-push-fold.md` | md | przejrzana (fr-L9) | przejrzana (de-L9) | przejrzana (vi-L9) |
| 24 | `content/<język>/lessons/m11-l2-sprawdzanie.md` | md | przejrzana (fr-L9) | przejrzana (de-L9) | przejrzana (vi-L9) |
| 25 | `content/<język>/lessons/m11-l3-icm.md` | md | przejrzana (fr-L9) | przejrzana (de-L9) | przejrzana (vi-L9) |
| 26 | `content/<język>/lessons/m12-l1-wariancja.md` | md | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 27 | `content/<język>/lessons/m12-l2-decyzja-wynik.md` | md | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 28 | `content/<język>/lessons/m12-l3-tilt.md` | md | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 29 | `content/<język>/lessons/m12-l4-bankroll.md` | md | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 30 | `content/<język>/lessons/m13-l1-raport.md` | md | przejrzana (fr-L11) | przejrzana (de-L11) | przejrzana (vi-L11) |
| 31 | `content/<język>/lessons/m13-l2-powtorki.md` | md | przejrzana (fr-L11) | przejrzana (de-L11) | przejrzana (vi-L11) |
| 32 | `content/<język>/lessons/m13-l3-przeglad.md` | md | przejrzana (fr-L11) | przejrzana (de-L11) | przejrzana (vi-L11) |
| 33 | `content/<język>/lessons/m2-l1-outy.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 34 | `content/<język>/lessons/m2-l2-pot-odds.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 35 | `content/<język>/lessons/m3-l1-pozycja.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 36 | `content/<język>/lessons/m3-l2-rece-startowe.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 37 | `content/<język>/lessons/m3-l3-zakresy-otwarc.md` | md | przejrzana (fr-L1) | przejrzana (de-L1) | przejrzana (vi-L1) |
| 38 | `content/<język>/lessons/m4-l1-3bet.md` | md | przejrzana (fr-L2) | przejrzana (de-L2) | przejrzana (vi-L2) |
| 39 | `content/<język>/lessons/m4-l2-obrona-bb.md` | md | przejrzana (fr-L2) | przejrzana (de-L2) | przejrzana (vi-L2) |
| 40 | `content/<język>/lessons/m4-l3-wobec-3betu.md` | md | przejrzana (fr-L2) | przejrzana (de-L2) | przejrzana (vi-L2) |
| 41 | `content/<język>/lessons/m4-l4-limperzy.md` | md | przejrzana (fr-L2) | przejrzana (de-L2) | przejrzana (vi-L2) |
| 42 | `content/<język>/lessons/m5-l1-tekstury.md` | md | przejrzana (fr-L3) | przejrzana (de-L3) | przejrzana (vi-L3) |
| 43 | `content/<język>/lessons/m5-l2-przewagi.md` | md | przejrzana (fr-L3) | przejrzana (de-L3) | przejrzana (vi-L3) |
| 44 | `content/<język>/lessons/m5-l3-czestotliwosc-rozmiar.md` | md | przejrzana (fr-L3) | przejrzana (de-L3) | przejrzana (vi-L3) |
| 45 | `content/<język>/lessons/m5-l4-bez-pozycji.md` | md | przejrzana (fr-L3) | przejrzana (de-L3) | przejrzana (vi-L3) |
| 46 | `content/<język>/lessons/m6-l1-mdf-alpha.md` | md | przejrzana (fr-L4) | przejrzana (de-L4) | przejrzana (vi-L4) |
| 47 | `content/<język>/lessons/m6-l2-sprawdzenie.md` | md | przejrzana (fr-L4) | przejrzana (de-L4) | przejrzana (vi-L4) |
| 48 | `content/<język>/lessons/m6-l3-check-raise.md` | md | przejrzana (fr-L4) | przejrzana (de-L4) | przejrzana (vi-L4) |
| 49 | `content/<język>/lessons/m7-l1-druga-beczka.md` | md | przejrzana (fr-L5) | przejrzana (de-L5) | przejrzana (vi-L5) |
| 50 | `content/<język>/lessons/m7-l2-polaryzacja.md` | md | przejrzana (fr-L5) | przejrzana (de-L5) | przejrzana (vi-L5) |
| 51 | `content/<język>/lessons/m7-l3-implied-odds.md` | md | przejrzana (fr-L5) | przejrzana (de-L5) | przejrzana (vi-L5) |
| 52 | `content/<język>/lessons/m7-l4-probe-obrona.md` | md | przejrzana (fr-L5) | przejrzana (de-L5) | przejrzana (vi-L5) |
| 53 | `content/<język>/lessons/m8-l1-value.md` | md | przejrzana (fr-L6) | przejrzana (de-L6) | przejrzana (vi-L6) |
| 54 | `content/<język>/lessons/m8-l2-ile-blefow.md` | md | przejrzana (fr-L6) | przejrzana (de-L6) | przejrzana (vi-L6) |
| 55 | `content/<język>/lessons/m8-l3-blokery.md` | md | przejrzana (fr-L6) | przejrzana (de-L6) | przejrzana (vi-L6) |
| 56 | `content/<język>/lessons/m8-l4-bluff-catching.md` | md | przejrzana (fr-L6) | przejrzana (de-L6) | przejrzana (vi-L6) |
| 57 | `content/<język>/lessons/m9-l1-spr.md` | md | przejrzana (fr-L7) | przejrzana (de-L7) | przejrzana (vi-L7) |
| 58 | `content/<język>/lessons/m9-l2-zaangazowanie.md` | md | przejrzana (fr-L7) | przejrzana (de-L7) | przejrzana (vi-L7) |
| 59 | `content/<język>/lessons/m9-l3-rozmiar-geometryczny.md` | md | przejrzana (fr-L7) | przejrzana (de-L7) | przejrzana (vi-L7) |
| 60 | `content/<język>/lessons/m9-l4-plan-trzech-ulic.md` | md | przejrzana (fr-L7) | przejrzana (de-L7) | przejrzana (vi-L7) |
| 61 | `content/<język>/modules.yaml` | yaml | przejrzana (fr-U1) | przejrzana (de-U1) | przejrzana (vi-U1) |
| 62 | `content/<język>/rules.yaml` | yaml | przejrzana (fr-R1, fr-R2, fr-R3) | przejrzana (de-R1, de-R2, de-R3) | przejrzana (vi-R1, vi-R2, vi-R3) |
| 63 | `content/<język>/ranges/spots.yaml` | nakladka | przejrzana (fr-U1) | przejrzana (de-U1) | przejrzana (vi-U1) |
| 64 | `content/<język>/helplines.yaml` | nakladka | przejrzana (fr-L10) | przejrzana (de-L10) | przejrzana (vi-L10) |
| 65 | `content/<język>/terms-def.yaml` | definicje | przejrzana (fr-T1) | przejrzana (de-T1) | przejrzana (vi-T1) |

## Koszt i czas

48 recenzentów: ok. 8,0 mln tokenów łącznie (suma z raportów uruchomienia: fr ok. 2,7 mln, de ok. 2,7 mln, vi ok. 2,7 mln; 125–205 tys. na recenzenta, 2–4 min każdy) plus sesja główna. Koszt API: 0 USD (praca w sesji, workflow `przeglad-tlumaczen.yml` nieuruchamiany). Kwota w USD według cennika planu: [DO USTALENIA], sesja nie ma do niej dostępu. Czas zegarowy całości: ok. 1 h 30 min.
