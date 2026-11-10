# Stan sesji BG (rola 06 build, KO-040 / KO-044)
Aktualizacja: 2026-11-10 · Gałąź `sesja-bg-wyjasnienia` · Start 8cba034

## Zrobione
- Zad. 1: `docs/tresci/zrodla-scenariusze-ksiazki.md` (D-566); raport do koordynatora wysłany.
- Zad. 2: `docs/tresci/przewodnik-wyjasnien-ko040.md` (D-565).
- Zad. 3 (część): generatory rangeDecision, drawCall, potOdds, icm (call), outs, whoWins, playerType (8035aab, D-567); egzaminy m2 q6–q8, m3 q2, m8 q8, m10 q8, m11 q10, lekcja m12-l2 (a6f7517). Test `wyjasnienia-ko040.test.ts`: czerwony 6/6 na kodzie sprzed zmiany, zielony po.
- `pnpm content:build` kod 0.

## Bloker
- `pnpm run ci` kod 1 tylko w `i18n:kod`: 44 nowe/zmienione klucze `drill.*` bez tłumaczenia w 11 językach (562 błędy); pre-push blokuje push. Decyzja koordynatora: przekład teraz (A) albo sesja 09 (B).

## Zmienione klucze pl.json dla roli 09
nowe: drill.range.{freqRight, wrongLoose, wrongTight, wrongOther, situation, playIn, playOut, playMixed, status.*, often.*, reason.* (15)}, drill.drawCall.{situationFlop, situationTurn, decisionGood, decisionNear, decisionBad, priceFlop, priceTurn, impliedFlop, impliedTurn, callRight, callWrong, foldRight, foldWrong}, drill.playerType.whyWrongUnknown
zmienione: drill.range.{right, acceptable, freqs}, drill.outs.{wrongTooMany, wrongTooFew}, drill.icm.{callRight, callWrong, callWrongChips, foldRight, foldRightChips, foldWrong, callExplanation}, drill.playerType.whyWrong, drill.potOdds.{explanation, right}
usunięte: drill.drawCall.{explanationFlop, explanationTurn, verdictGood, verdictNearFlop, verdictNearTurn, verdictBad, right, wrong}
treść pl do przekładu: content/pl/exams/m2.yaml (q6, q7, q8), m3.yaml (q2), m8.yaml (q8), m10.yaml (q8), m11.yaml (q10), content/pl/lessons/m12-l2-decyzja-wynik.md (q-draw-bad)

## Otwarte
- Pozostałe wyjaśnienia klasy B/C (numeryczne egzaminy M6, M9, M11, M12; reguła R-M2-005 „because” tautologia — zmiana wymaga też rejestru) — następna sesja H.
- Recenzja niezależna próbki ≥ 20 zmian: w toku.
- Wpisy do dokumentów 12/13 na Dysku: D-565–D-567 jak w `docs/decyzje.md` (do przeniesienia przez koordynatora).

## Następny krok
Po decyzji o przekładzie: CI kod 0, push, PRZEKAZANIE do koordynatora.
