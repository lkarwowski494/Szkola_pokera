# Sesja EO: recenzja niezależna EL (poprawki treści po EJ/EI + kolejka 06, D-1210…D-1220) — Szkoła Pokera
Koordynator: session_01T66VBwqjWSzpapzyq8BU9G (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie audit (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-eo-recenzja` od `sesja-el-tresci` @ f5780bb3 (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md. Raportu autora nie czytasz przed własną oceną; `docs/tresci/stan-el.md` i `docs/decyzje/EL.md` tylko jako opis zamiaru.
3. Zadania:
   1. Recenzja zakresu **31723a6c..f5780bb3**: poprawność merytoryczna (pl i en; pozostałe języki tylko liczby i placeholdery) zmian R-M6-006, R-M6-007, R-M7-006, uzasadnień D-1167/D-1168 zastąpionych przez D-1210, progów N2 (D-1216), bluff-catchera (D-1217), miary KO-076 (D-1214), cofnięcia equityMarginMin (D-1215 warunkowa); cytaty sprawdzone u źródła wg ADR-24 (Upswing Tip 4, PeakGTO; `docs/tresci/odczyty/el-2026-11-11.tsv`), liczby tylko przez `{{n:…}}`, jedna nazwa na pojęcie, wyjątek D-1219 (kontrola skryptem `docs/tresci/narzedzia/el-kontrola.mjs`) — czy kontrola zastępcza jest realna. Gotowe: raport `docs/tresci/recenzje/recenzja-el-f5780bb3.md` z werdyktem i znaleziskami KRYT/WYS/ŚR/NIS z `plik:linia`.
   2. `pnpm run ci` kod 0 na f5780bb3 we własnym kontenerze, dowód `docs/tresci/dowody/eo-ci-f5780bb3.txt`.
   Treści nie poprawiasz (tylko raport i dowody).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: tryb nocny (analogia; najpierw `lkarwowski494/trening`, potem oczko, piekarz), do weta; merytoryczne pokerowe → ADR-24. Pula **D-1245…D-1249** (`docs/decyzje/EO.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, werdykt, znaleziska wg wagi, decyzje do weta, koszt.
