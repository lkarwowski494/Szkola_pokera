# Stan sesji CF (08-programista, fix): ŚR-001, wersja generatora w historii wariantów (KO-058 A)
Aktualizacja: 2026-11-10 · gałąź `sesja-cf-wersja` · kod @ db5fe10d · dowód: `docs/programista/dowody/cf-ci-db5fe10d.txt` (`pnpm run ci` kod 0)

## Zrobione (D = defekt; test czerwony przed kodem)
- `GENERATOR_WERSJA = 1` (poker-core); test wzorca `scenario-gen.test.ts` (D-733, ograniczenie D-734).
- Migracja v3 `generator_wersja` (`docs/architektura/schemat-v3.sql`, `schemat-v3.ts`); test na kopii bazy v2 (wpisy sprzed = 0), test wycofania: `wariantyHistoria-cf.test.ts`, `schemat-v3.test.ts`.
- Zapis wersji przy każdym wariancie (`ZapisOdcisku.generatorWersja`, UPSERT odświeża); `czyPowtorkaWariantu`, `ziarnoPowtorki`, `wybierzWariant` (domena, `wariant-cf.test.ts`).
- Eksport/import: kolumna w pliku, brak = 0, zły typ/nadmiar = `bledny_plik`.
- Decyzje: `docs/decyzje/CF.md` (D-730…D-734).
- Przegląd niezależny (D-043, subagent, tylko diff): „brak uwag”.

## Do zrobienia po stronie innych
- UI scenariuszy musi wołać `zapiszOdcisk` z `GENERATOR_WERSJA` i `ziarnoPowtorki` (dziś brak wywołań w aplikacji).
- Uwaga: hook sesji zaleca tożsamość commitów `noreply@anthropic.com`; CLAUDE.md każe `Łukasz Karwowski <…noreply.github.com>`. Zostawiono CLAUDE.md (GitHub pokaże „Unverified”); decyzja koordynatora.
