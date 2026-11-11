# Decyzje sesji DH (09-lokalizacja, audit): recenzja niezależna DE @ faad5b9c
Pula D-925…D-929 (użyte D-925…D-926). Kto: A = agent (delegacja z `CLAUDE.md`, do weta). Raport: `docs/lokalizacja/recenzje/recenzja-de-faad5b9.md`.

| Nr | Data | Kto | Decyzja | Odrzucone | Dowód | Zależy od |
|---|---|---|---|---|---|---|
| D-925 | 2026-11-11 | A | **Werdykt recenzji DE (564c3813..faad5b9c): PRZYJĄĆ.** Brak KRYT i WYS; 1 ŚR (zapadka `BEZ_SHA_PL_DOZWOLONE` liczona po ID, nie po parze ID/język) i 2 NIS do backlogu, zgodnie z progiem wydania z `CLAUDE.md` (ŚR i NIS nie wstrzymują). Powód: przekład 13 kluczy zgodny z `play.*` i tabelami terminów, placeholdery i U+00A0 w 12 słownikach, nazwy krótsze od źródła pl, scalenie CY bez zmian treści, CI kod 0 | PRZYJĄĆ Z WARUNKIEM (ŚR nie jest blokerem i nie dotyczy treści widocznej dziś); ODRZUCIĆ (brak podstaw) | raport, `docs/lokalizacja/recenzje/dowody/` | brak weta |
| D-926 | 2026-11-11 | A | **Naprawa ŚR (09-lokalizacja-001) zalecana jako lista par `ID/język`** zamiast samych ID (zamknięta naprawdę: 66 par, nowy język = błąd), do backlogu przed dodaniem kolejnego języka treści | pułap licznika 66 (odrzucony już w D-906: kruchy); zostawić do kroku „uwaga → błąd” z D-878 (luka rośnie z każdym z 24 języków polityki 35) | `docs/lokalizacja/recenzje/dowody/dh-sonda-zapadka.txt` | decyzja roli 06 o domknięciu sha_pl (D-907) |
