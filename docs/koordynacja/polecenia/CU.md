# Sesja CU: WYS-001 recenzji CT — ocena i tekst dużego c-betu w SC-12 (rola 06) — Szkoła Pokera
Koordynator: session_01T66VBwEUTZQc2qYQfck1rc (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 06-tresci w trybie fix. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cu-sc12` @ 5839a90 (= sesja-ct-recenzja: CS 8133a8c + raport i testy CT; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania (raport: `docs/programista/recenzje/recenzja-cs-8133a8c.md`, decyzje CT: `docs/decyzje/CT.md` D-840…D-842):
   1. WYS-001 (D-840): SC-12 (niski połączony flop, `best: check`) ma akcję bet-big z tekstem „Duży bet jest dopuszczalny” i oceną jak mały zakład — wbrew D-792/D-793 (`docs/decyzje/CO.md`) i źródłu „Size down and bet less on flops that complete straights…”. Rozstrzygnij merytorycznie wg ADR-24 (hierarchia źródeł, przeczytane źródło z cytatem; rekomendacja CT: duży zakład przy `best: check` = niedokładność) i popraw treść SC-12 (ocena wariantu + wyjaśnienie pl). Gotowe: test `it.fails` WYS-001 w `tools/content-build/test/recenzja-ct-odtworzenie.test.ts` zmieniony na `it` i zielony bez osłabienia asercji; werdykty SC-12 = `gradeDecision`.
   2. Przekłady zmienionego wyjaśnienia w 11 językach pliku (jak CO/CS; oznacz do przeglądu 09 w stanie), bez API.
   3. NIS-003 („Masz 8 outów”/„Liczby” bez wzmianki o nadkartach) — popraw, jeśli to zmiana tekstu w tych samych plikach; inaczej zapisz w stanie do backlogu. NIS-004 tylko zapisz.
   4. `pnpm content:build` i `pnpm run ci` kod 0, dowód `docs/programista/dowody/cu-ci-<sha>.txt`, stan `docs/tresci/stan-cu.md`, decyzje `docs/decyzje/CU.md`, push na `sesja-cu-sc12`.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów ani kodu `packages/` (ŚR-002 GENERATOR_WERSJA robi równolegle sesja CV — nie dotykaj `packages/poker-core`), bez --no-verify i force-push, nie podnosisz limitów czasu, nie osłabiasz testów, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: merytoryczne wg ADR-24 (CLAUDE.md); procesowe tryb analogia (lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta). Pula **D-845…D-849**, zapis w `docs/decyzje/CU.md`.
6. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: PYTANIE (pełna treść, opcje, rekomendacja); PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
