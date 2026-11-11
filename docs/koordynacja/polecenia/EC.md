# Sesja EC: recenzja niezależna kodu DX (b3963e9a..174dc00b) — Szkoła Pokera
Koordynator: session_01T66VBwtbeXie1cCrPGeeBK (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ec-recenzja` @ 174dc00b (= stan `origin/sesja-dx-silnik` o 20:00; DX może w tym czasie pushować dalej — recenzujesz tylko do 174dc00b; inny HEAD startu: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zakres: diff `b3963e9a..174dc00b`: 08-A (bramka holding), czyste funkcje oceny N2, N3, N4, N7a w `packages/poker-core/src/scenario-gen.ts` + testy; decyzje D-1065, D-1066 (`docs/decyzje/DX.md`). Nie czytaj raportu autora przed własną oceną (`docs/programista/stan-dx.md` dopiero po werdykcie, tylko do porównania zakresu).
4. Zadania:
   1. Poprawność: każda funkcja oceny zgodna ze specyfikacją N* (spec w `docs/tresci/stan-dy.md` na `origin/sesja-dy-szablony-e` i w poleceniu DX `origin/koordynacja:docs/koordynacja/polecenia/DX.md`); przypadki brzegowe, wartości progowe.
   2. Testy: wyrocznia niezależna od implementacji; co najmniej 2 mutanty każdej funkcji dają czerwony wynik (sprawdź sam).
   3. 08-A: test czerwony na kodzie sprzed poprawki (sprawdź na b3963e9a).
   4. `pnpm run ci` kod 0 na 174dc00b (plik dowodu).
   Gotowe: `docs/programista/recenzje/recenzja-dx-174dc00b.md` (znaleziska z wagą KRYT/WYS/ŚR/NIS, plik:linia, dowód) i werdykt PRZYJĄĆ / PRZYJĄĆ PO POPRAWKACH / ODRZUCIĆ; commit i push na `sesja-ec-recenzja`.
5. Zakazy: nie poprawiasz kodu DX (tylko raport; test odtwarzający wolno dodać w dowodach), nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
6. Decyzje: tryb dzienny jak w EB; pula D-1110…D-1114 (`docs/decyzje/EC.md`).
7. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
8. Raporty (≤ 10 linii, send_message): PYTANIE; PRZEKAZANIE: SHA, werdykt, znaleziska wg wagi, dowody, koszt.
