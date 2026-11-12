# Decyzje sesji FU (08-programista, recenzja niezależna FP+FR @ 83b03fdc); pula D-1485…D-1489
Raport: `docs/programista/recenzje/recenzja-fp-fr-83b03fdc.md`. Analogia (D-191): próg ważności wg CLAUDE.md „Audyty i wydania” pkt 1; brak tłumaczenia jako błąd wykrywany mechanicznie jak w Treningu (`lkarwowski494/trening`, `scripts/i18n/przeglad-api.mjs`, linia 115 @ 2d97581, odczyt 2026-11-12). Wszystkie do weta.

| ID | Data | Decyzja | Odrzucone | Powód / zależność |
|---|---|---|---|---|
| D-1485 | 2026-11-12 | ID znalezisk recenzji FU od 08-programista-201 (format wymagany przez `sprawdz-raport.mjs --rola 08-programista`). | 001…: kolizja z ID recenzji FO (001–009) i wcześniejszymi (103–105) | ID stabilne między audytem a naprawą |
| D-1486 | 2026-11-12 | 08-programista-201 (ręka mieszana pod „Dlaczego nie”) = ŚREDNIE, nie bloker: `content/` nie ma szablonu z `correct: [..]` (diff bez zmian treści). Warunkowa: WYS i bloker w chwili wejścia takiej treści; do tego czasu zalecana bramka treści odrzucająca `correct: [..]`. | WYS od razu (blokowałby przyjęcie poprawek bez ścieżki przez interfejs) | Próg: błędne twierdzenie merytoryczne blokuje, gdy jest osiągalne |
| D-1487 | 2026-11-12 | Werdykt recenzji diffu `5ec4f912..83b03fdc`: PRZYJĄĆ Z UWAGAMI; blokery KRYT/WYS: 0; uwagi 201–205. | ODRZUCIĆ (brak blokerów); PRZYJĄĆ bez uwag (201, 202 realne po wejściu treści) | CI kod 0, 6/7 mutantów zabitych, D-043 bez zmian ID |
