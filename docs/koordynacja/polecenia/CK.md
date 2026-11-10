# Sesja CK: poprawki ekranu scenariusza po recenzji CH (WYS-001, ŚR-002, NIS-004) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie fix. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ck-ekran` @ f3f548f (= sesja-ch-recenzja: robocza 07b04fb + raport CH i test odtwarzający; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania (raport: `docs/programista/recenzje/recenzja-cd-07b04fb.md`):
   1. WYS-001: adapter ekranu (`naGenerator`, `wariant.ts:21`, `aktywnoscScenariusza.ts:57`) przekazuje do generatora `stackBb` i kontekst spotów; na ekranie zakład nigdy nie przekracza stosu (SC-19, SC-02). Gotowe: `recenzja-ch-stos.test.ts` przełączony z `it.failing` na `it` i zielony, bez osłabienia asercji.
   2. ŚR-002: range-spot i all-in działają na ekranie (nie „plan_niepoprawny”) albo, jeśli brakuje danych, budowanie treści odrzuca taki szablon dla ekranu z czytelnym błędem — wybierz pierwsze, jeśli wykonalne w zakresie adaptera. Gotowe: test na ekranie/adapterze dla obu rodzajów.
   3. NIS-004: test gałęzi „wkrótce” w menu.
   4. `pnpm run ci` kod 0, dowód `docs/programista/dowody/ck-ci-<sha>.txt`, stan `docs/programista/stan-ck.md`, push.
   Poza zakresem (nie ruszaj): ŚR-003 limit czasu testu deterministyczności (D-720) i szybkość content-build — robi sesja CJ na innej gałęzi; formuła all-in w generatorze (naprawiana w CJ) — adapter ma tylko podać stos i kontekst.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, nie podnosisz limitów czasu, nie osłabiasz testów, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: tryb analogia (repo lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta); merytoryczne wg hierarchii ADR-24. Pula **D-755…D-764**, zapis w `docs/decyzje/CK.md` (KO-054).
6. Kontekst: od 30% kończysz krok, stan w `docs/programista/stan-ck.md`, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: PYTANIE (pełna treść, opcje, rekomendacja); PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
