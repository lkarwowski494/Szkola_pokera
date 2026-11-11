# Sesja EB: poprawki szablonów DU po recenzji EA — Szkoła Pokera
Koordynator: session_01T66VBwtbeXie1cCrPGeeBK (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie fix (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-eb-du-fix` @ 7a7a0f1dd5c31436137a0bd44d30250d7bedd39b (= `origin/sesja-du-szablony`; inny HEAD: zgłoś). Raport recenzji do odczytu: `git show origin/sesja-ea-recenzja:docs/tresci/recenzje/recenzja-du-7a7a0f1d.md` (dowody w `docs/tresci/recenzje/dowody/ea-du-*` na tej gałęzi). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadania (każde: test odtwarzający najpierw czerwony na 7a7a0f1d, potem zielony):
   1. WYS 06-tresci-001: SC-34 łatwy — zdanie uzasadnienia prawdziwe dla każdego wariantu (dziś „Pasujesz, bo [ICM]…” fałszywe w 1807/2000, gdzie pas wynika już z gry o żetony). Sama treść (pl, en; przekłady agenta tylko struktura i znaczniki, jakość oceni 09). Gotowe: test na wszystkich wariantach generatora.
   2. ŚR 06-tresci-003: test ekranu na prawdziwej bazie dla nowych szablonów SC-06/32/33/34 (mechanizm CQ-001). Gotowe: test czerwony przy mutancie, zielony na poprawionej treści.
   3. NIS 004–006: dwa zdania mocniejsze niż reguła (dopasuj do reguły), zakres warunku R-M11-009, es SC-34 bez {{t:call}}.
   4. ŚR 06-tresci-002 (łatwy poziom z granicy zakresu) **nie ruszasz** — czeka na decyzję właściciela.
   5. `pnpm run ci` kod 0 na końcowym SHA, plik dowodu w `docs/tresci/dowody/eb-ci-<sha>.txt`.
   Poza zakresem (nie ruszasz, tylko zapisz w stanie): „na mały blind” (odmiana {{w:pozycja}}), „2.4 bb” z kropką na ekranie — dla 04/08.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nie luzujesz progów ani asercji testów, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora i czekasz na odpowiedź.
5. Decyzje: tryb dzienny — techniczne sam przez analogię (najpierw `lkarwowski494/trening`, potem oczko, piekarz; `repo:plik:linia`), do weta; produktowe → PYTANIE do koordynatora (≥ 2 opcje, rekomendacja); merytoryczne pokerowe → hierarchia źródeł ADR-24. Pula D-1105…D-1109 (`docs/decyzje/EB.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, stan w `docs/tresci/stan-eb.md`, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Push zbiorczo na `sesja-eb-du-fix`.
8. Raporty (≤ 10 linii, send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE; PRZEKAZANIE: SHA, dowody, decyzje do weta, koszt, otwarte.
