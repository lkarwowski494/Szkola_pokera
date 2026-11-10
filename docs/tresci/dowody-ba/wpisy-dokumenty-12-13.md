# Wpisy do dokumentów 12 i 13 (Drive) — do przeniesienia przez koordynatora

2026-11-10 · rola 06 fix, sesja BA · KO-029 · D-500 (do weta) · rozstrzyga D-487

## Dokument 12 „Weryfikacja źródeł”

**Ograniczenie:** solver aplikacji (`content/ranges/preflop-6max-100bb.json`) nie jest zwalidowany na składzie obrony BB vs BTN (zwalidowane tylko częstości fold/call/3-bet), więc nie jest szczeblem 2 dla tego twierdzenia; rachunek na nim to wskazówka.

| Twierdzenie | Źródło (odczyt 2026-11-10, cytat sprawdzony na surowym tekście) | Szczebel | Werdykt |
|---|---|---|---|
| R-M5-004 / R-M6-009: na niskim połączonym flopie BB ma w zakresie strity | https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-cash-games/ — „Connected boards are a unique case due to flopped straights often being in the BB’s range.” | 2 (cash, BTN vs BB) | POPARTE |
| R-M5-004 `then`: c-bet rzadziej i mniejszy | tamże — „Size down and bet less on flops that complete straights and flushes in your opponent’s range.” | 2 | POPARTE |
| R-M5-004: otwierający nie ma przewagi nutsów na flopie połączonym | https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-mtts/ — „the raiser generally does not have a nuts advantage to leverage with big bets.” (MTT 40bb, BTN vs SB; analogicznie UTG vs BB) | 2 (inny spot) | POPARTE kierunkowo |
| j.w. | https://blog.gtowizard.com/bullying-the-blinds-with-continuation-bets/ — „BB’s advantage at the top end makes BTN vulnerable to check-raises” (654r, 20bb) | 2 (inny format) | POPARTE kierunkowo |
| j.w. | https://upswingpoker.com/nut-range-positional-advantage/ — „the Big Blind will often have the nut advantage.” (zakresy szacowane, 2019) | 4 | POPARTE (słabe) |
| m5.q2 dystraktory K-10-3, A-Q-7: przewaga nutsów otwierającego | https://blog.gtowizard.com/overbetting-the-flop-in-cash-games/ — „Double-Broadway boards … Give us a large nut advantage as the preflop raiser (PFR).” | 2 | POPARTE |
| A-A-7 usunięty z m5.q2 | flop-heuristics-ip-c-betting-in-cash-games — „reduced nut advantage from trips being in both player’s ranges” | 2 | (powód wymiany) |
| było: „BB częściej ma dwie pary albo strita” | rachunek na zakresach solvera aplikacji (skład obrony BB niezwalidowany): 8-6-5 remis 1,77 vs 1,96%, 6-5-4 odwrotnie | 1 na danych spoza szczebla 2 | NIEPOPARTE → usunięte |
| było: „setów macie podobnie” | rachunek: BTN 9,0 vs BB 3,6–5,3 komb. | 1 | SPRZECZNE → usunięte |

## Dokument 13 „Audyt merytoryczny”

- **Zakres:** R-M5-004 (`because`, `source`), R-M6-009 (`because`, `source`), m5.exam.q2, m5.l2.q-765 + akapit, m5-l3/l4 `why` c-betu, m6-l3 :16 i :130, m6.exam.q10 — pl + 11 języków.
- **Decyzja:** część wspólna źródeł — „nie masz przewagi nutsów” (zamiast „BB częściej ma … / ma przewagę nutsów”). Odrzucone: zostawić; „BB ma przewagę nutsów” (tylko szczebel 4/20bb); pytanie o „strita”; wymiana pytania w puli; poprawka tylko m5.q2.
- **Terminologia:** „przewaga nutsów” (nuts-advantage) objaśniana w pytaniu „czyli wyraźnie więcej najsilniejszych rąk niż rywal” (definicja R-M5-005: „dużo więcej najsilniejszych rąk niż u rywala”).
- **Z-3 (tylko zgłoszenie):** rekomendacja „Sprawdzam duży blind” (call = „sprawdzenie / sprawdzam”, nie „dopłacam do” — tabela terminologii wg wpisu AX; limp = „samo sprawdzenie dużego blinda”, `content/terms.yaml:612`); ujednolicić lekcję M3 i m3.q5/q6 przy następnej poprawce M3.
- **Dowody:** `docs/tresci/dowody-ba/` w repo.
