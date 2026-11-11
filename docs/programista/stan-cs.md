# Stan sesji CS (08-programista, fix): scalenie CO+CQ na CR i poprawki recenzji CQ
Gałąź `sesja-cs-poprawki` od cd327e9; decyzje `docs/decyzje/CS.md` (D-825…D-832); polecenie `docs/koordynacja/polecenia/CS.md` @ f3ab980f. Dowód CI: `docs/programista/dowody/cs-ci-4ab96ec9.txt` (`pnpm run ci` kod 0; mobile 117 zestawów / 902 testy, content-build 379 + 1 oczekiwany błąd, poker-core 179, domena 347 + 1).

## Zrobione
| ID (CQ) | Klasa | Test (czerwony → zielony) |
|---|---|---|
| scalenie | — | `--no-ff` origin/sesja-cq-recenzja 0197509, bez konfliktów git; SC-34 → szkice (D-825); SC-12 `bet-big` 12 języków (D-826) |
| WYS-001 | D | `recenzja-cq-odtworzenie.test.ts` 001 jako `it` + `apps/mobile/.../cs-tresc-realna.test.tsx` (kontrola, zielony od scalenia: defekt zamknięty przez CR D-815, D-829) |
| WYS-002 | M | SC-34 poza `content/`; test, że bramka odrzuca szkic; test równowagi ICM jako `it.fails` na szkicu (D-830) |
| WYS-003 | M | 6 przypadków (sc-02, sc-03, sc-19 × latwy/sredni) czerwone (`dowody/cs-czerwone-przed.txt`, SC-03; sc-02/19 czerwone w przebiegu lokalnym) → zielone po D-828 |
| WYS-004 | M | 4 przypadki (SC-11/12 × latwy/sredni) czerwone → zielone po D-827 |

Naprawy testów zależnych od zmiany: `wariant-kontekst-ca.test.ts` (pozycja i spot rfi.btn w fixturze), `szablony-f2-ca.test.ts` (prawdziwe zakresy), `wznowienie-cn.test.ts` (ziarno 1000: warunek wstępny zależy od ziarna, po WYS-003 1234 go nie spełnia). Asercje bez osłabienia.

## Otwarte (dla innych ról, nie wdrożone)
- **Rola 06:** ŚR-005 (flopy z możliwym OESD w SC-11 średni; D-831); przegląd brzmienia `bet-big` w SC-12 (D-826); SC-34: warunek powrotu (06-tresci-002).
- **Rola 07:** ŚR-006 (filtr `every(kind === 'draw-call')` w testach treści), NIS-007 (wyrocznia klasy air bez zakresu otwarcia).
- **Rola 09:** przekłady `bet-big` SC-12 (11 języków) do przeglądu.
- **Rola 04 + 08:** widok ICM (wypłaty i stosy) przed powrotem SC-34; filtr rąk dla size-spot (SC-06, SC-08; D-795).
- Odcisk wariantów SC-11/12/02/03/19 zmienił się (inny rozkład rąk, nadkarty): brak planów TestFlight z tymi szablonami (D-820).
- Zrzuty ekranu z urządzenia: brak (brak macOS).
- Tożsamość commitów: Łukasz Karwowski noreply (CLAUDE.md, polecenie CS pkt 2); hook sesji sugeruje inną, GitHub pokaże commity jako Unverified.
- Przegląd niezależny ścieżek wrażliwych: patrz sekcja poniżej.
Przegląd niezależny (subagent, tylko diff `013cc9b6..HEAD` generatora, zasady 10–14): brak uwag P0/P1. Poniżej progu: przy all-in na flopie sprawdzenie implied odds pasa z nadkartami jest ostrzejsze niż potrzeba (obniża tylko pojemność wariantów); osierocony docblock przed `FLOP_REDEALS` w `scenario-gen.ts` (kosmetyka). Oba do backlogu, bez zmiany po zielonym CI.
