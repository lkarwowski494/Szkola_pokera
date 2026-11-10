# Decyzje sesji CE (08-programista, audit): recenzja niezależna CA @ 1533486 (KO-054)
Pula D-725…D-729. Kto: A = agent (delegacja z `CLAUDE.md`, do weta). Analogia z Treningiem (D-191): nie sprawdzona w tej sesji; wzorzec z tego repo (KO-048, `apps/mobile/src/features/drills/__tests__/recenzja-bp-dominacja.test.ts`, `it.failing`).

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa | Zależy od |
|---|---|---|---|---|---|---|
| D-725 | 2026-11-10 | A | Testy odtwarzające WYS jako `it.fails` z przełącznikiem `CE_CZERWONE=1` (zwykłe `it`): CI zostaje zielone (polecenie: `pnpm run ci` kod 0), czerwień udowodniona osobnym przebiegiem | zwykłe `it` (CI czerwone, sprzeczne z poleceniem); test w scratchpadzie (brak trwałej kontroli) | KO-048, `docs/programista/dowody/ce-odtworzenie-czerwone.txt` | — |
| D-726 | 2026-11-10 | A | 08-programista-001 i 002 jako WYS mimo realności brzegowej (tylko fikstury): to błąd rachunku szczebla 1 w silniku, który rola 06 użyje jako wzorca | ŚR do backlogu (błąd wszedłby z pierwszym szablonem treści) | próg wydania z `CLAUDE.md` (błędne liczby) | D-725 |
| D-727 | 2026-11-10 | A | Wyrocznia ICM z blindami: bb = stos efektywny ÷ `stackBb` szablonu, gracz w BB przy pasie traci 1 bb, all-in = stos efektywny | wyrocznia z modelem generatora (nie wykrywa błędu, ŚR-204) | R-M11-009, spot `push.sb-10` | D-725 |
