# BA zad. 1: R-M5-004 / m5.exam.q2 — stan faktyczny wg ADR-24 (KO-029, 2026-11-10, rola 06 fix)

Odczyt wszystkich źródeł: 2026-11-10, `curl` + usunięcie znaczników HTML, cytaty sprawdzone `grep -F` na surowym tekście (kopie w scratchpadzie sesji, nie w repo — cudze treści).

## Szczebel 1: rachunek (kombinatoryka) — na danych, które nie są szczeblem 2

- Niezależna implementacja: `docs/tresci/dowody-ba/rachunek.py` → `rachunek-wynik.txt`; odtwarza liczby AX (`dowody-ax/m5-q2/wynik.txt`) co do 0,1 komb.
- Zakresy: `content/ranges/preflop-6max-100bb.json` (solver aplikacji). Zwalidowane są tylko częstości zbiorcze spotu BB vs BTN (fold/call/3-bet), **nie skład** call vs 3-bet (`content/ranges/spots.yaml:3-5`, AX README). Wg CLAUDE.md nasz solver jest szczeblem 2 „tylko tam, gdzie przeszedł walidację” → rachunek na składzie zakresu BB to wskazówka, nie dowód.
- Wynik (`kandydaci-wynik.txt`): udział „dwie pary albo strit” BTN vs BB (call) skacze między niskimi połączonymi flopami: 7-6-5 2,67% vs 4,40% (BB więcej), 8-6-5 1,77% vs 1,96% (remis), 6-5-4 1,96% vs 0,66% (BTN więcej), 8-7-6 5,29% vs 5,23%. Z setami („dwie pary lub lepiej”, definicja Upswing) na 8-6-5 BTN 3,58% vs BB 2,82% (call) / 3,33% (call+3-bet).
- Wniosek: twierdzenie „na 8-6-5 BB częściej ma dwie pary albo strita” jest **NIEPOPARTE** (rachunek daje remis), a 6-5-4 przeczy opublikowanemu wynikowi solvera (niżej: 654r „najlepszy flop BB”) — co wskazuje na osobliwy skład obrony BB w naszym solverze (3-betuje 88, 75s, 87s; `wynik.txt` AX). Rachunek nie rozstrzyga kierunku dla 100bb.

## Szczebel 2: opublikowane wyniki solvera (GTO Wizard)

| Źródło | Spot | Cytat | Co popiera |
|---|---|---|---|
| https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ | cash, BTN vs BB | „Connected boards are a unique case due to flopped straights often being in the BB’s range.” · „Size down and bet less on flops that complete straights and flushes in your opponent’s range.” · „We connect better with high-card boards and get to bet more.” | strity w zakresie BB, c-bet rzadziej i mniejszy; wysokie flopy sprzyjają otwierającemu |
| tamże | cash, BTN vs BB | „reduced nut advantage from trips being in both player’s ranges” (flopy sparowane) | **sparowany flop (A-A-7) też zmniejsza przewagę nutsów otwierającego** → dystraktor A-A-7 niejednoznaczny w pytaniu o przewagę nutsów |
| https://blog.gtowizard.com/bullying-the-blinds-with-continuation-bets/ | MTT 20bb, BTN vs BB | „BB’s advantage at the top end makes BTN vulnerable to check-raises” (654r); AQ7r: „enormous range advantage from top to bottom” | przewaga BB w najsilniejszych rękach na 654r — inny format (20bb) |
| https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-mtts/ | MTT 40bb, UTG vs BB i BTN vs SB | „An UTG raiser’s narrow range is less likely to contain straights and flushes, denying them the nuts advantage that facilitates larger bets.” · „the major exceptions are the monotone and connected boards, where overpairs are at their weakest, and the raiser generally does not have a nuts advantage to leverage with big bets.” | na flopach połączonych otwierający nie ma przewagi nutsów (inne spoty niż BTN vs BB) |
| https://blog.gtowizard.com/overbetting-the-flop-in-cash-games/ | cash (spot na obrazach) | „Double-Broadway boards … Give us a large nut advantage as the preflop raiser (PFR).” | K-T-3 i A-Q-7 (dwie figury): przewaga nutsów otwierającego |

## Szczebel 4: serwis szkoleniowy

- https://upswingpoker.com/nut-range-positional-advantage/ (Dan B., 15.01.2019; zakresy „I estimated”, nie solver): nut advantage = „more combinations of super strong hands (two-pair or better)”; „If the board was low and connected in the example above, the Big Blind will often have the nut advantage.”; zastrzeżenie: przy wysokim rake „the Big Blind will not have such a big nut advantage on those low boards”.

## Wniosek (co jest prawdą, zakres, pewność)

1. **Prawda (szczebel 2, wysoka pewność kierunku):** na niskim połączonym flopie otwierający z Buttona traci przewagę nutsów, którą ma na wysokich flopach; BB ma w zakresie strity; otwierający c-betuje rzadziej i mniejszym rozmiarem. Część `then` R-M5-004 bez zmian.
2. **Niepoparte:** „BB **częściej** ma dwie pary albo strita” jako twierdzenie liczbowe dla 100bb cash (brak opublikowanego zliczenia; nasz rachunek: remis lub odwrotnie zależnie od flopu). „BB **ma** przewagę nutsów” — tylko szczebel 4 („often”) i 20bb MTT; część wspólna: „nie masz przewagi nutsów”.
3. **Sprzeczne ze źródłem:** „setów macie podobnie dużo” (źródło `math` R-M5-004, `m5-l2-przewagi.md:27`) — rachunek: BTN ma ich więcej (9,0 vs 3,6–5,3 komb.), bo BB część par 3-betuje.
4. Pytanie m5.q2 da się obronić szczeblem 2 po zmianie pojęcia na „przewagę nutsów otwierającego” i wymianie dystraktora A-A-7 (flop sparowany zmniejsza przewagę nutsów — źródło wyżej) na A-Q-7 (dwie figury: duża przewaga nutsów otwierającego). Pytanie o kategorię „dwie pary albo strit” nie ma obrony na żadnym flopie bez zwalidowanego składu zakresu BB.
