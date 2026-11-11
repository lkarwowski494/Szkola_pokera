# Sesja EE: recenzja niezależna kodu ED (f86c72fc..539919af) — Szkoła Pokera
Koordynator: session_01T66VBwtbeXie1cCrPGeeBK (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ee-recenzja` @ 539919af (= `origin/sesja-dx-silnik` o 20:55; następca EF może pushować dalej na sesja-dx-silnik — recenzujesz tylko do 539919af; inny HEAD startu: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zakres: diff `f86c72fc..539919af` (ścieżki wrażliwe: `tools/content-build`, treść 12 języków):
   - KO-073 (decyzja właściciela, `origin/koordynacja:docs/koordynacja/decyzje.md` wiersz KO-073; D-1115): blok warunkowy w 168 wystąpieniach zdania NIS-003 w wyjaśnieniach draw-call (sc-01/02/03/19 × 12 języków), warunek nadkarty (jedna funkcja z „Liczbami”), bramka budowania.
   - Poprawki recenzji EC (`origin/sesja-ec-recenzja:docs/programista/recenzje/recenzja-dx-174dc00b.md` WYS-001/002, ŚR-003, NIS-005/006; D-1116…D-1118) i testy D-1040 (`recenzja-dx-a6186653.md` ŚR-007, NIS-008).
   Nie czytaj stanu autora (`docs/programista/stan-dx.md`) przed własną oceną.
4. Zadania:
   1. KO-073: brzmienie zdania bez zmian (D-917) we wszystkich językach; blok widoczny dokładnie przy nadkarcie wobec wszystkich kart stołu (rachunek niezależny na ≥ 10 000 wariantów sc-01/02/03/19); brak niezamkniętych/zgubionych bloków w przekładach; bramka odrzuca błędny blok (mutant).
   2. Poprawki EC: każde znalezisko zamknięte, test zabija mutanty wskazane przez EC (ec-mutanty.txt, ec-mutanty-d1040.txt) — sprawdź sam.
   3. `pnpm run ci` kod 0 na 539919af (plik dowodu).
   Gotowe: `docs/programista/recenzje/recenzja-ed-539919af.md` (znaleziska KRYT/WYS/ŚR/NIS, plik:linia, dowód) i werdykt PRZYJĄĆ / PRZYJĄĆ PO POPRAWKACH / ODRZUCIĆ; commit i push na `sesja-ee-recenzja`.
5. Zakazy: nie poprawiasz kodu (tylko raport; test odtwarzający wolno w dowodach), nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
6. Decyzje: tryb nocny (analogia, najpierw `lkarwowski494/trening`), do weta; merytoryczne pokerowe → ADR-24. Pula D-1135…D-1139 (`docs/decyzje/EE.md`).
7. Kontekst i koszt: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
8. Raporty (≤ 10 linii, send_message): PYTANIE; PRZEKAZANIE: SHA, werdykt, znaleziska wg wagi, dowody, koszt.
