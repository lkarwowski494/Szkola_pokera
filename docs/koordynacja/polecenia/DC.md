# Sesja DC: recenzja niezależna CX (range-spot na ekranie scenariusza) — Szkoła Pokera
Koordynator: session_01T66VBz4mtBEPwdkS219BVy (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 08-programista w trybie audit; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz. Kontrolę transportu promptu pomiń.
2. Start: gałąź `sesja-dc-recenzja` @ 92b06ca9c09190d6020da28e067f343e76c53e6a (= `origin/sesja-cx-range-spot`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania:
   1. Recenzja niezależna zmian 46197812..92b06ca9 (sesja CX, 11 plików): obsługa range-spot na ekranie scenariusza (`apps/mobile/src/features/scenariusz/**`), bramka `RODZAJE_NA_EKRANIE` w `tools/content-build/src/scenariusze.ts`, zmienione asercje w `cm-recenzja-cl.test.ts` i `szablon-na-ekranie-ck.test.ts` (KO-063: czy zmiana wynika ze zniesienia D-755, a nie z dopasowania testu do kodu; czy zachowana kontrola draw-call/all-in i icm-call), nowe testy cx-range-spot (czy łapią błąd — sprawdź mutacją co najmniej oceny akcji i kwoty dopłaty N − blind). Oceń zgodność z projektem `docs/design/scenariusz-akcje-i-liczby.md` §1 z gałęzi `origin/sesja-da-teksty` @ 7366faa9 (D-886: etykiety scenario.action) — rozbieżność zapisz jako znalezisko z oceną realności (wdrożenie D-886 jest planowane w osobnej sesji). Raportu autora (`docs/decyzje/CX.md`) nie czytaj przed własną oceną. Gotowe: `docs/programista/recenzje/recenzja-cx-92b06ca.md` z werdyktem PRZYJĄĆ / PRZYJĄĆ Z WARUNKIEM / ODRZUCIĆ i znaleziskami KRYT/WYS/ŚR/NIS (plik:linia, dowód).
   2. KRYT/WYS: test odtwarzający (czerwony) na gałęzi, bez poprawki; wtedy `pnpm run ci` z plikiem `docs/programista/dowody/dc-ci-<sha8>.txt`.
   Dozwolone ścieżki: `docs/programista/recenzje/`, `docs/programista/stan-dc.md`, `docs/decyzje/DC.md`, nowe testy odtwarzające.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie poprawiasz kodu CX (tylko raport i testy), nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz.
5. Decyzje: techniczne sam, do weta (analogia z lkarwowski494/trening, `repo:plik:linia`). Pula D-894…D-896, wpisy w `docs/decyzje/DC.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/programista/stan-dc.md`, push, PRZEKAZANIE.
7. Push zbiorczo na `sesja-dc-recenzja`.
8. Raport ≤ 10 linii przez send_message: PRZEKAZANIE (SHA, werdykt, liczby znalezisk, decyzje do weta, koszt).
