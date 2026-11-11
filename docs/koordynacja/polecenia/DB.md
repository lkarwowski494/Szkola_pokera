# Sesja DB: recenzja niezależna CY (przekład M12 ×4, kontrola sha_pl) — Szkoła Pokera
Koordynator: session_01T66VBz4mtBEPwdkS219BVy (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 09-lokalizacja w trybie audit; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz. Kontrola transportu niewykonalna po stronie sesji — pomiń, nie zgłaszaj.
2. Start: gałąź `sesja-db-recenzja` @ 64ca577b (= `origin/sesja-cy-m12`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania:
   1. Recenzja niezależna zmian 46197812..64ca577b (sesja CY): przekład pól `why` q1/q2/q3/q8 w `content/<11 języków>/exams/m12.yaml` (sens zgodny z pl, liczby wyłącznie przez `{{n:…}}`, terminologia jak w słownikach terminów projektu), kontrola trwała `sha_pl` w narzędziu `scal-rejestr.mjs` i jej testy (czy test naprawdę był czerwony przed kodem — sprawdź mutacją; czy opt-in D-878 nie zostawia luki, która przepuści zmianę pl bez przekładu dla R-M12-009), wpisy rejestru `docs/tresci/rejestr/m12-m13.json`. Nie czytaj raportu autora przed własną oceną; `docs/lokalizacja/stan-cy.md` i `docs/decyzje/CY.md` dopiero po niej. Gotowe: raport `docs/lokalizacja/recenzje/recenzja-cy-64ca577.md` z werdyktem PRZYJĄĆ / PRZYJĄĆ Z WARUNKIEM / ODRZUCIĆ i znaleziskami KRYT/WYS/ŚR/NIS (plik:linia, dowód).
   2. Znaleziska KRYT/WYS: test odtwarzający (czerwony) na gałęzi, bez poprawki. `pnpm run ci` kod 0 z plikiem `docs/programista/dowody/db-ci-<sha8>.txt` tylko gdy dodajesz testy.
   Dozwolone ścieżki: `docs/lokalizacja/recenzje/`, `docs/lokalizacja/stan-db.md`, `docs/decyzje/DB.md`, nowe testy odtwarzające.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie poprawiasz przekładu ani narzędzia (tylko raport i testy), nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz.
5. Decyzje: techniczne sam, do weta (analogia z lkarwowski494/trening, `repo:plik:linia`); merytoryczne pokerowe wg ADR-24. Pula D-891…D-893, wpisy w `docs/decyzje/DB.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/lokalizacja/stan-db.md`, push, PRZEKAZANIE. Pułap kosztu brak (raport kosztu).
7. Push zbiorczo na `sesja-db-recenzja`.
8. Raport ≤ 10 linii przez send_message: PRZEKAZANIE (SHA, werdykt, liczby znalezisk, decyzje do weta, koszt).
