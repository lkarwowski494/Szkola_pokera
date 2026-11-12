# Sesja EU: poprawki recenzji ES (cache E2E) — Szkoła Pokera
Koordynator: session_01T66VBz8VshtVqwg6bHotLi (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie fix (zadania 08-programista-001, 08-programista-002 z recenzji ES). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-eu-fix` od `claude/dt-e2e` @ fb99729e (inny HEAD: zgłoś). Raport recenzji: `git show origin/sesja-es-recenzja:docs/programista/recenzja-es.md` (+ `docs/programista/dowody/es-*.txt` na tej gałęzi). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadania:
   1. 08-programista-001 (KO-081): usuń krok cache DerivedData z `.github/workflows/e2e-ios.yml` (cache CocoaPods i pnpm zostają bez zmian), zaktualizuj test w `tests/narzedzia/workflowy.test.mjs` (brak kroku DD wymuszony testem, kroki CocoaPods nadal pilnowane), opis w `docs/jakosc/e2e-przyspieszenie.md` i decyzja wycofania D-1022 w `docs/decyzje/EU.md`. „Gotowe”: diff tylko usuwa DD + testy/dokumenty; test czerwony na fb99729e (DD obecny), zielony po zmianie.
   2. 08-programista-002: test klucza cache CocoaPods łapie usunięcie `apps/mobile/app.json` z klucza i złą ścieżkę (mutanty M4, M7 z `es-mutanty.txt`, przeniesione na krok CocoaPods jeśli dotyczyły DD — opisz). „Gotowe”: mutanty czerwone, wynik w `docs/programista/dowody/eu-mutanty.txt`.
   3. `pnpm run ci` kod 0 na końcowym SHA kodu we własnym kontenerze → `docs/programista/dowody/eu-ci-<sha>.txt` (nagłówek z komendą i KOD_WYJSCIA, podsumowania pakietów).
   Bez uruchamiania E2E/workflowów (E2E pójdzie po scaleniu do roboczej).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, zmieniasz tylko `e2e-ios.yml` w zakresie zadania 1, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: najpierw analogia (`lkarwowski494/trening`: `e2e-ios.yml` cache tylko npm, linia 86 wg ES), do weta. Pula **D-1280…D-1284** (`docs/decyzje/EU.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, mutanty, decyzje do weta, koszt.
