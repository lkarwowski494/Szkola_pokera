# Sesja EJ: recenzja niezależna EH (SC-04/05/08 w treści, D-1165…D-1170) — Szkoła Pokera
Koordynator: session_01T66VBzs4xyAm9KvrtZtWdW (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie audit (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ej-recenzja` od `sesja-eh-szablony` @ 4d786bd2 (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md. Raportu autora nie czytasz przed własną oceną; `docs/tresci/stan-eh.md` i `docs/decyzje/EH.md` tylko jako opis zamiaru.
3. Zadania:
   1. Recenzja zakresu **a6d1bb1b..4d786bd2**: poprawność merytoryczna SC-04, SC-05, SC-08 (pl i en; pozostałe 10 języków to przekład agenta — oceniasz tylko liczby i placeholdery, jakość językową oceni 09), źródła przeczytane wg ADR-24 (cytaty sprawdzone u źródła, także PeakGTO K84 z D-1167), decyzje D-1165…D-1170 (szczególnie D-1166 próg 0,75 i D-1167/D-1168 gutshot/backdoor wobec ~1/3), liczby tylko przez `{{n:…}}`, jedna nazwa na pojęcie (terminologia dokumentu 13), testy czerwone przed zmianą. Gotowe: raport `docs/tresci/recenzje/recenzja-eh-4d786bd2.md` z werdyktem i znaleziskami KRYT/WYS/ŚR/NIS z `plik:linia`.
   2. `pnpm run ci` kod 0 na 4d786bd2 we własnym kontenerze, dowód `docs/tresci/dowody/ej-ci-4d786bd2.txt`.
   Treści nie poprawiasz (tylko raport i dowody).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: tryb nocny (analogia; najpierw `lkarwowski494/trening`, potem oczko, piekarz), do weta; merytoryczne pokerowe → ADR-24. Pula **D-1185…D-1189** (`docs/decyzje/EJ.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, werdykt, znaleziska wg wagi, decyzje do weta, koszt.
