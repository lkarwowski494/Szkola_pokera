# Stan sesji FG (08-programista, build): widoki rodzajów list-hand, river-catch, defend, turn-bet
Gałąź `sesja-fg-widoki` od 28fdb1b0. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/FG.md` @ 53078c9c. Stan 2026-11-12. Decyzje: `docs/decyzje/FG.md` (D-1375…D-1381). CI: `pnpm run ci` kod 0 na 364c39be (kod kodu = ten sam co końcowy HEAD przed commitem dowodu), dowód `docs/programista/dowody/fg-ci-364c39be.txt`.

| Rodzaj | Widok | Test |
|---|---|---|
| turn-bet (SC-20) | bet-small/bet-big, nazwa z `play.bet`, pula `play.potLabel`; mały = niedokładność | `fg-turn-bet-ekran.test.tsx` (10) |
| river-catch (SC-24) | jak draw-call na riverze | `fg-river-catch-ekran.test.tsx` (10) |
| defend (SC-07/15/17) | jak draw-call na flopie; kontekst generatora dla defend | `fg-defend-ekran.test.tsx` (10) |
| list-hand (SC-10) | akcje z szablonu, AKCJE_LISTY, 4bet, opis sytuacji | `fg-list-hand-ekran.test.tsx` (15) |
| iso-size | tylko sprawdzone: silnik ma, ekran/bramka nie; zadanie dla innej sesji | — |

Przegląd ścieżek wrażliwych (świeży subagent, tylko diff): „brak uwag”.
Do innych ról: 04 (miejsce opisu sytuacji list-hand, frazy „Zakład 2bb” wielką literą, widok limperów iso-size); 06/09 (zdania „Liczby” dla 4 rodzajów, przegląd `fourBet` w 10 językach).
Ryzyka na telefonie: czytelność przycisków „Zakład Xbb”, układ opisu sytuacji, czytnik ekranu na przyciskach.
