# Sesja EI: recenzja niezależna EF (silnik N1…N7, KO-076) — Szkoła Pokera
Koordynator: session_01T66VBzs4xyAm9KvrtZtWdW (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ei-recenzja` od `sesja-dx-silnik` @ 9a054b59 (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md. Raportu autora (EF) nie czytasz przed własną oceną; `docs/programista/stan-dx.md` i `docs/decyzje/EF.md` czytasz tylko jako opis zamiaru.
3. Zadania:
   1. Recenzja zakresu **539919af..9a054b59** (warstwa A N1–N7, KO-076 equityMarginMin, D-1140…D-1147, testy EE ŚR-009/NIS-010/011, N6 turn-bet). Priorytet: poprawność rachunku (wyrocznie niezależne od generatora — policz wybrane wektory sam), testy czerwone z właściwego powodu (mutanty na kluczowych warunkach), ścieżki wrażliwe z CLAUDE.md (`packages/domena/`, `tools/content-build/`), odciski `generator-odciski.json` bez różnic dla starych szablonów, `GENERATOR_WERSJA` (3) uzasadniona. Gotowe: raport `docs/programista/recenzje/recenzja-ef-9a054b59.md` z werdyktem (PRZYJĄĆ / PO POPRAWKACH / ODRZUCIĆ) i znaleziskami KRYT/WYS/ŚR/NIS z `plik:linia` i testem odtwarzającym albo wektorem.
   2. `pnpm run ci` kod 0 na 9a054b59 we własnym kontenerze, dowód `docs/programista/dowody/ei-ci-9a054b59.txt`.
   Kodu produkcyjnego nie zmieniasz (tylko raport, dowody, ewentualnie testy odtwarzające w osobnym katalogu raportu).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: tryb nocny (analogia; najpierw `lkarwowski494/trening`, potem oczko, piekarz; `repo:plik:linia`, data odczytu), do weta; merytoryczne pokerowe → ADR-24. Pula **D-1180…D-1184** (`docs/decyzje/EI.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, werdykt, znaleziska wg wagi, decyzje do weta, koszt.
