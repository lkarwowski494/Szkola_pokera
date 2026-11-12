# Decyzje sesji EZ (06-tresci, audit): recenzja niezależna EV
Pula D-1320…D-1324 (wszystkie użyte). Kto: M = merytoryczna według ADR-24 (rozstrzyga rola 06), do weta właściciela. Polecenie: `origin/koordynacja:docs/koordynacja/polecenia/EZ.md` @ ce8a2420. Raport: `docs/tresci/recenzja-ez.md`. Analogia Trening (D-191): nie dotyczy, bo Trening nie ma reguł pokerowych (jak w `docs/decyzje/EV.md`).

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa | Zależy od |
|---|---|---|---|---|---|---|
| D-1320 | 2026-11-12 | M | D-1285 (SDV z remisem jako ½, R-M8-006 pl/en) **potwierdzone**: zakres dwóch graczy (pick-hand) | uznać remis za przegraną: fałsz rachunkowy | rachunek; GW „We're At The River…”: „whatever percentage of the pot we might be winning if we check” (odczyt 2026-11-12) | — |
| D-1321 | 2026-11-12 | M | D-1286 (turn-bet tylko z czystymi outami; N/46 > cena 1/4, N/44 < cena 3/4) **potwierdzone**: warunek ⇔ obie liczby w (1/6, 3/10); przechodzi N = 8…13 | — | `docs/tresci/dowody/ez-rachunek-ep003.txt` | kod 08 (08-EV-2) |
| D-1322 | 2026-11-12 | M | D-1287 **przyjęte z warunkiem**: przed wdrożeniem łatki `m5.l4.c-oop` poprawić 06-tresci-001 (rekomendacja: `position: HJ`); `heroPositions: "HJ,CO"` bez zmian | wdrożyć jak jest: wynik solvera przypisany CO bez nazwanego uproszczenia; odrzucić D-1287: źródło jest i kierunek się zgadza | Upswing ep24 (03:35, 04:36), odczyt 2026-11-12 | 08-EV-3, 09 |
| D-1323 | 2026-11-12 | M | D-1289 (N6 otwarte) **potwierdzone**: odczyt „no clear pattern” wierny; dodatkowo „mostly check-or-overbet” wyklucza generator z rozmiarem 3/4 | — | GW „From Gutshots to Airballs”, odczyt 2026-11-12 | — |
| D-1324 | 2026-11-12 | M | 06-tresci-002: w R-M8-006 termin `split-pot` zamiast `pot`, wprowadzić razem z przekładem 09 we wszystkich 12 językach | osobna poprawka pl/en teraz: druga rozbieżność z 10 językami | `CLAUDE.md` („jedna nazwa na jedno pojęcie”) | 09 (D-1288) |
