# Decyzje sesji FX (08-programista, audit): recenzja niezależna diffu FV `a79ad506..a966a876`; pula D-1505…D-1509
Analogia (D-191): format i zakres ID jak w recenzji FU (`docs/decyzje/FU.md` D-1485, D-1487, odczyt 2026-11-13).

| ID | Data | Decyzja | Odrzucone | Powód / zależność |
|---|---|---|---|---|
| D-1505 | 2026-11-13 | ID znalezisk recenzji FX od 08-programista-301. | 001…: kolizja z FO (001–009), wcześniejszymi (103–105) i FU (201–205) | ID stabilne między recenzją a naprawą; format `sprawdz-raport.mjs --rola 08-programista` |
| D-1506 | 2026-11-13 | Werdykt recenzji diffu FV: PRZYJĄĆ Z UWAGAMI; blokery KRYT/WYS: 0; uwagi 301–304 (P2). Warunek: 301 przed wejściem river-value do `content/` albo poziomów Ś/T. | ODRZUCIĆ (brak blokerów); PRZYJĄĆ bez uwag (6/12 mutantów przeżywa, 301 realne po wejściu treści) | CI kod 0, D-043 bez utraty ID w 35 bazach; `docs/programista/recenzje/recenzja-fv-a966a876.md` |
| D-1507 | 2026-11-13 | Przegląd D-043 przy zmianie `content/` porównuje wszystkie bazy językowe (nie tylko pl): ID każdej tabeli przed i po. | Porównanie samej bazy pl (jak FV) — założenie „ten sam generator” niesprawdzone | Tani skrypt (`docs/programista/dowody/fx-porownaj-bazy.txt`, sekundy); błąd w jednym języku byłby niewidoczny |
