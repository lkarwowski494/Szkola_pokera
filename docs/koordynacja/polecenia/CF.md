# Sesja CF: wersja generatora w historii wariantów (ŚR-001, KO-058 A) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie fix (moduł sqlite-expo). Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cf-wersja` @ 1533486 (= sesja-ca-format; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadanie (opis problemu i opcji: `docs/programista/stan-ca.md`, ŚR-001 w `docs/programista/recenzje/recenzja-bu-6a5ca17.md`; decyzja KO-058 opcja A na gałęzi koordynacja `docs/koordynacja/decyzje.md`):
   1. Test czerwony najpierw: po zmianie wersji generatora „Zagraj jeszcze raz to samo rozdanie” dla wpisu starej wersji nie odtwarza innej ręki pod tym samym ziarnem.
   2. Stała `GENERATOR_WERSJA` w `packages/poker-core`; kolumna wersji w `wariant_historia` (`packages/postep`) — migracja w transakcji, test na kopii bazy poprzedniej wersji schematu (wpisy sprzed = 0); zapis bieżącej wersji przy każdym wariancie; powtórka tylko przy zgodnej wersji, inaczej nowe rozdanie bez komunikatu; okno bez powtórzeń liczy odciski wszystkich wersji; kopia/eksport/import obejmują kolumnę.
   3. `pnpm run ci` kod 0, dowód `docs/programista/dowody/cf-ci-<sha>.txt`, stan `docs/programista/stan-cf.md`, push.
4. Zakazy: nic poza zakresem ŚR-001 (nie zmieniasz plików z zakresu recenzji CE poza tym, co wymaga stała wersji), nie scalasz, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: techniczne do weta, pula **D-730…D-734**, zapis w `docs/decyzje/CF.md`.
6. Kontekst: od 30% kończysz krok i PRZEKAZANIE. Po PRZEKAZANIU zmiana w `packages/postep` dostanie recenzję niezależną.
7. Raport ≤ 10 linii przez send_message: SHA, testy (czerwony→zielony), migracja, ci, decyzje.
