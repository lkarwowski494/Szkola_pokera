# Stan sesji BG (rola 06 build, KO-040 / KO-044)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bg-wyjasnienia` · Start 8cba034

## Zrobione
- Zad. 1: `docs/tresci/zrodla-scenariusze-ksiazki.md` (D-566); raport do koordynatora wysłany.
- Zad. 2: `docs/tresci/przewodnik-wyjasnien-ko040.md` (D-565).
- Zad. 3 (część): generatory rangeDecision, drawCall, potOdds, icm (call), outs, whoWins, playerType (8035aab, D-567); egzaminy m2 q6–q8, m3 q2, m8 q8, m10 q8, m11 q10, lekcja m12-l2 (a6f7517). Test `wyjasnienia-ko040.test.ts`: czerwony 6/6 na kodzie sprzed zmiany, zielony po.
- `pnpm content:build` kod 0.

## Przekład (KO-046, opcja A koordynatora)
- 62 klucze `drill.*` przełożone w sesji na en, de, es, fr, it, pt, pt-BR, ja, ko, vi, zh-Hant (subagenci, bez płatnego API); kontrola parametrów, terminów i liczb: 0 problemów; `pnpm i18n:kod`: 0 błędów. **Wszystkie do przeglądu roli 09** (lista niżej + klucze z sekcji „Po recenzji”).

## Recenzja niezależna (subagent w świeżym kontekście)
- 26 zmian: 16 OK, 10 problemów (1 twierdzenie fałszywe: powód R-M11-012 dla BB, który jest ostatni; 9 zgodności z KO-040 i języka); liczby bez zmian w żadnej. Wszystkie 10 poprawione w aa4be50.

## Po recenzji (zmienione albo nowe klucze pl)
drill.range.{playIn, acceptable, acceptableFreq (nowy), often.* (nowy zestaw: always, almostAlways, usually, overHalf, underHalf), reason.nineLj, reason.call3maxTwo (nowy)}, drill.icm.callWrong, drill.playerType.whyWrong

## Zmienione klucze pl.json dla roli 09
nowe: drill.range.{freqRight, wrongLoose, wrongTight, wrongOther, situation, playIn, playOut, playMixed, status.*, often.*, reason.* (15)}, drill.drawCall.{situationFlop, situationTurn, decisionGood, decisionNear, decisionBad, priceFlop, priceTurn, impliedFlop, impliedTurn, callRight, callWrong, foldRight, foldWrong}, drill.playerType.whyWrongUnknown
zmienione: drill.range.{right, acceptable, freqs}, drill.outs.{wrongTooMany, wrongTooFew}, drill.icm.{callRight, callWrong, callWrongChips, foldRight, foldRightChips, foldWrong, callExplanation}, drill.playerType.whyWrong, drill.potOdds.{explanation, right}
usunięte: drill.drawCall.{explanationFlop, explanationTurn, verdictGood, verdictNearFlop, verdictNearTurn, verdictBad, right, wrong}
treść pl do przekładu: content/pl/exams/m2.yaml (q6, q7, q8), m3.yaml (q2), m8.yaml (q8), m10.yaml (q8), m11.yaml (q10), content/pl/lessons/m12-l2-decyzja-wynik.md (q-draw-bad)

## Otwarte
- 09: przegląd 62 przełożonych kluczy w 11 językach (przekład agenta, bez native speakera).
- Pozostałe wyjaśnienia klasy B/C (numeryczne egzaminy M6, M9, M11, M12; reguła R-M2-005 „because” tautologia — zmiana wymaga też rejestru) — następna sesja H.
- Wpisy do dokumentów 12/13 na Dysku: D-565–D-567 jak w `docs/decyzje.md` (do przeniesienia przez koordynatora).

## Następny krok
CI kod 0, push, PRZEKAZANIE wysłane. Dalej (krok H): pozostałe wyjaśnienia B/C w lekcjach i egzaminach liczbowych.
