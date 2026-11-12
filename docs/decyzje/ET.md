# Decyzje sesji ET (recenzja niezależna ER @ f0434ab2), pula D-1275…D-1279

| ID | Data | Typ | Decyzja | Odrzucone | Podstawa | Dotyczy |
|---|---|---|---|---|---|---|
| D-1275 | 2026-11-12 | A | Werdykt recenzji ER: PRZYJĘTE Z ZASTRZEŻENIAMI; 0 KRYT/WYS, 08-programista-001 (ŚR) i 002 (NIS) to luki testów do backlogu/naprawy roli 08, nie blokują wydania (próg CLAUDE.md pkt 1). | PO POPRAWKACH: oba mutanty dotyczą testów, zachowanie zgodne z D-1256 i EP-004 | `docs/programista/recenzja-et.md`, `docs/programista/dowody/et/mutanty-wynik.txt`; analogia: recenzja EP (`docs/programista/recenzje/recenzja-ek-24f32fb5.md`, ten sam szablon i próg) | ER |
| D-1276 | 2026-11-12 | A | Mutant M4 (`>`→`>=` w overkarcie) uznany za równoważny, nie za lukę: równa ranga z najwyższą kartą flopu to para, która zwraca call wcześniej (`made`). | wymagać testu zabijającego M4: niemożliwy bez zmiany kolejności warunków | `packages/poker-core/src/scenario-gen.ts:1061` | 08-EH-3 |
