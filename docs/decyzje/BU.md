# Decyzje sesji BU (08-programista, build): rozszerzenie formatu szablonów (KO-049, KO-050, KO-051)
Przeniesione przez sesję CA z `docs/programista/stan-bu.md` i komentarzy w kodzie (KO-056 f, 2026-11-10). Kto: A = agent (delegacja z `CLAUDE.md`, do weta). Analogia z Treningiem (D-191): nie sprawdzona przez BU ani CA.

| ID | Data | Kto | Decyzja | Odrzucone | Podstawa | Zależy od |
|---|---|---|---|---|---|---|
| D-660 | 2026-11-10 | A | Punkt decyzji jako unia dyskryminowana po `kind` w jednym schemacie szablonu (`ScenarioDecision`) | osobne pliki szablonów na rodzaj (dubluje pola); osobny schemat punktu bez unii (traci kontrolę `strict`) | `packages/content-schema/src/index.ts`, `docs/programista/e0-bu.md` T1 | — |
| D-661 | 2026-11-10 | A | poker-core nie czyta plików: dane zakresów (i później przypadki c-betu, reguły rozmiaru, macierz equity) przychodzą argumentem `GeneratorContext`; tools/content-build ładuje je z content/ | czytanie plików w poker-core (łamie zasadę „bez I/O”, CLAUDE.md) | `docs/programista/e0-bu.md` T2 | D-660 |
| D-662 | 2026-11-10 | A | ŚR-103 b (wszystkie łatwe szablony modułu z tą samą odpowiedzią) jako błąd budowania | ostrzeżenie (nic go nie wymusza) | `tools/content-build/src/scenariusze.ts` `checkScenarioSet` | D-660 |
| D-663 | 2026-11-10 | A | `points` (wszystkie punkty) obok `decisions` (tylko draw-call) w `ScenarioVariant`, `VariantDecision.point` jako rozróżnik | unia w `decisions` (łamie testy BS i domeny) | `packages/poker-core/src/scenario-gen.ts` | D-660 |
| D-664 | 2026-11-10 | A | Tabela `scenarios` w bazie treści, `CONTENT_SCHEMA_VERSION` = 7 (KO-050): jeden wiersz na szablon, `data` = JSON szablonu po obróbce | zapis szablonów poza bazą treści | `packages/content-schema/src/index.ts:10`, `tools/content-build/test/scenarios-db-bu.test.ts` | KO-050 |
| D-665 | 2026-11-10 | A | `MAX_CONSECUTIVE_REJECTIONS` = 5000 zamiast 1000 z BR-GEN-003: po odrzuceniu gotowych rąk (06-tresci-201) sc-19 ma ok. 0,5% rozdań dla poziomu, więc 1000 kończyło się sporadycznym błędem szablonu | zostawić 1000 i poluzować granice poziomu (zmiana treści roli 06) | `packages/poker-core/src/scenario-gen.ts` (komentarz przy stałej) | BR-GEN-003 |
