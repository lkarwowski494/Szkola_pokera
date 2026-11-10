# Sesja BZ: recenzja niezależna BU (kod, ścieżki wrażliwe) — Szkoła Pokera
Koordynator: session_01T66VBzJJVF7UGtLwjYvqQx (raporty i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie audit. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bz-recenzja` @ 6a5ca17 (= sesja-bu-format; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadanie: recenzja niezależna zmian BU `b9a656a..6a5ca17` (D-043, ścieżki wrażliwe: `tools/content-build/src/{scenariusze,build}.ts`, `packages/poker-core/src/scenario-gen.ts`, `packages/content-schema/src/index.ts`, `packages/domena/test/wariant-bf.test.ts`, tabela `scenarios` w bazie treści i CONTENT_SCHEMA_VERSION 6→7 (D-664), MAX_CONSECUTIVE_REJECTIONS 1000→5000 (D-665, rozbieżność z BR-GEN-003 `docs/brd/wymagania-scenariusze.md:105`), odrzucanie gotowej ręki (KO-051, test `bv-gotowa-reka`) i zakład ≤ stos (ŚR-203). Nie czytaj uzasadnień autora przed własną oceną (raporty BU w `docs/programista/stan-bu.md` dopiero po werdykcie). Gotowe: raport `docs/programista/recenzje/recenzja-bu-6a5ca17.md` z werdyktem PRZYJĄĆ / PRZYJĄĆ Z WARUNKIEM / ODRZUCIĆ, znaleziska KRYT/WYS z testem odtwarzającym (czerwonym) na gałęzi, `pnpm run ci` na 6a5ca17 z kodem wyjścia (plik dowodu).
4. Zakazy: nie poprawiasz kodu autora (tylko testy odtwarzające i raport), nie scalasz, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: pula **D-690…D-694**, zapis w `docs/decyzje/BZ.md` (KO-054).
6. Kontekst: od 30% kończysz krok i PRZEKAZANIE; % kontekstu w raporcie.
7. Raport ≤ 10 linii przez send_message: werdykt, liczby znalezisk, SHA, plik raportu, ci.
