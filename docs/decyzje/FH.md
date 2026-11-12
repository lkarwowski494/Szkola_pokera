# Decyzje sesji FH (08-programista, audit: recenzja niezależna FG 28fdb1b0..fb712515); pula D-1385…D-1389
Analogia (D-191): wzorem są wcześniejsze recenzje niezależne roli 08 w tym repo (`docs/programista/recenzje/recenzja-ek-24f32fb5.md`: mutanty jako dowód luki testu, próg KRYT/WYS/ŚR/NIS według CLAUDE.md „Audyty i wydania”); repo `lkarwowski494/trening` poza zakresem dostępu tej sesji, analogii z Treningu nie sprawdzono (odstępstwo nazwane). Odczyt 2026-11-12.

| ID | Data | Decyzja | Odrzucone | Powód / zależność |
|---|---|---|---|---|
| D-1385 | 2026-11-12 | Werdykt FG: PRZYJĄĆ Z UWAGAMI (0 KRYT, 0 WYS, 2 ŚR, 2 NIS). | PO POPRAWKACH: żadne znalezisko nie spełnia progu wydania (CLAUDE.md, „Audyty i wydania” p. 1); ocena odpowiedzi poprawna, CI zielone. | `docs/programista/recenzje/recenzja-fg-fb712515.md`; warunkowa: zmienia się, gdy 04 uzna format `play.*` za barierę. |
| D-1386 | 2026-11-12 | Klucze `play.bet`/`play.potLabel` na ekranie scenariusza (D-1375) to ŚR do roli 04, nie WYS. | WYS „błędne twierdzenie”: liczby i nazwa są poprawne, różni się tylko format i wielka litera; poprawka sam programista: zasada 15 (nazwy akcji należą do 04). | 08-programista-001. |
| D-1387 | 2026-11-12 | Mutant M8 (turn-bet: ocena niezależna od `correct`) uznany za równoważny, bez znaleziska. | Znalezisko „brak testu”: bramka (`scenariusze.ts`, turn-bet expected = bet-big, R-M7-006) wyklucza inną poprawną akcję, więc mutant nie zmienia zachowania. | Zależna od reguły R-M7-006; gdy turn-bet dostanie poprawny mały zakład, M8 staje się luką. |
