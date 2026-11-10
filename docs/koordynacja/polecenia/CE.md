# Sesja CE: recenzja niezależna CA (kod, ścieżki wrażliwe) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie audit. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ce-recenzja` @ 1533486 (= sesja-ca-format; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadanie: recenzja niezależna zmian CA `6a5ca17..1533486` (D-043; ścieżki wrażliwe: `tools/content-build/src/{scenariusze,build}.ts`, `packages/poker-core/src/{scenario-gen,icm}.ts`, `packages/content-schema/src/index.ts`, GeneratorContext w domenie): F2 cbet-case, F3 size-spot, F4 oracle/ICM, poprawki ŚR-002/ŚR-003/NIS-006 recenzji BZ, zmieniona wyrocznia `szablony-f5-bu.test.ts:43`. Sprawdź zgodność z rachunkiem (szczebel 1 ADR-24, ICM, pot odds) i czy testy nie powtarzają logiki generatora (ŚR-204). Nie czytaj uzasadnień autora (`docs/programista/stan-ca.md`, `docs/decyzje/CA.md`) przed własną oceną. Gotowe: raport `docs/programista/recenzje/recenzja-ca-1533486.md` (werdykt, znaleziska KRYT/WYS/ŚR/NIS z miejscem i realnością), test odtwarzający (czerwony) dla każdego KRYT/WYS, `pnpm run ci` kod 0 z dowodem `docs/programista/dowody/ce-ci-<sha>.txt`, push.
4. Zakazy: nie poprawiasz kodu autora (tylko testy odtwarzające i raport), nie scalasz, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: pula **D-725…D-729**, zapis w `docs/decyzje/CE.md` (KO-054).
6. Kontekst: od 30% kończysz krok i PRZEKAZANIE; % kontekstu w raporcie.
7. Raport ≤ 10 linii przez send_message: werdykt, liczby znalezisk, SHA, plik raportu, ci.
