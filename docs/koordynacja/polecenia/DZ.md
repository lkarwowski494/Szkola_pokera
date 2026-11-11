# Sesja DZ: poprawki przekładu po recenzji DW (ŚR-001, ŚR-002, NIS-004, 006, 007) — Szkoła Pokera
Koordynator: session_01T66VBwmproZFQjCLcWHQy4 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 09-lokalizacja w trybie fix. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dz-przeklad-fix` @ a1ab9a54 (= `origin/sesja-dw-recenzja`: przekład DS + raport recenzji; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Wejście: `docs/lokalizacja/recenzje/recenzja-ds-081c6ef3.md` (znaleziska z proponowanym brzmieniem i dowodami w `recenzje/dowody/dw-*`).
4. Zadania (test odtwarzający najpierw czerwony, gdzie da się go napisać — np. sonda formy zwracania się per język, spacja przed „:” w fr):
   1. ŚR-001 fr i ŚR-002 pt: jedna forma zwracania się w całym słowniku zgodnie z rejestrem `wspolne.mjs:67-68`; popraw starsze klucze (scenario.numbers.line, table.you, yourChoice, showdownYou i inne znalezione sondą), nie nowe klucze DS — chyba że rejestr mówi inaczej. Gotowe: sonda bez trafień formy przeciwnej, test.
   2. NIS-004 fr: NBSP (U+00A0 lub U+202F zgodnie z resztą słownika) przed „:” w kluczach DS. NIS-006 zh `wholeStack`, NIS-007 `pt.json:821` „Bubble” → brzmienie z raportu.
   3. `pnpm run ci` kod 0 (plik dowodu `docs/lokalizacja/dowody/dz-ci-<sha>.txt`).
   Poza zakresem: ŚR-003 (`{{t:board}}` w tableLabel, 06/04/08) i NIS-005 (`join` w kodzie, 08) — nie ruszasz.
5. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora i czekasz na odpowiedź. Zmieniasz tylko słowniki `locales`/testy i18n i dokumenty lokalizacji.
6. Decyzje: tryb dzienny — techniczne sam przez analogię (najpierw `lkarwowski494/trening`, potem oczko, piekarz; `repo:plik:linia`, data odczytu), do weta; produktowe → PYTANIE do koordynatora (≥ 2 opcje, rekomendacja); merytoryczne pokerowe → hierarchia źródeł ADR-24 z CLAUDE.md. Pula D-1095…D-1099 (`docs/decyzje/DZ.md`).
7. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan w pliku stanu na swojej gałęzi, push, PRZEKAZANIE. Pułapu kosztu brak (mandat) — podaj koszt.
8. Raporty (≤ 10 linii, send_message): po pierwszym zadaniu czas i szacunek reszty; PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, `pnpm run ci` kod i plik dowodu, decyzje do weta, koszt, otwarte, następny krok.
