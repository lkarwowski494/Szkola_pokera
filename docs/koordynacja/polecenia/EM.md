# Sesja EM: przegląd przekładu agenta (SC-04/05/06/08/32/33/34, zdania EB) — Szkoła Pokera
Koordynator: session_01T66VBzs4xyAm9KvrtZtWdW (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 09-lokalizacja w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-em-przeklad` @ 31723a6c (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (właściciel, noreply GitHub).
3. Zadania:
   1. Przegląd przekładu agenta (bez płatnych API) szablonów SC-04, SC-05, SC-06, SC-08, SC-32, SC-33, SC-34 i zdań EB we wszystkich językach poza pl i en: terminologia zgodna z glosariuszem projektu (jedna nazwa na pojęcie), placeholdery `{{n:}}`/`{{t:}}` identyczne, brak cyfr spoza placeholderów, długość w granicach interfejsu, rejestr i forma zwracania się jak w reszcie danego języka. Uwagi EH o przekładzie: `docs/tresci/stan-eh.md`. Gotowe: raport `docs/lokalizacja/recenzje/recenzja-przeklad-31723a6c.md` z werdyktem na język i znaleziskami KRYT/WYS/ŚR/NIS (`plik:klucz`, propozycja poprawki).
   2. `pnpm run ci` kod 0 na 31723a6c, dowód `docs/lokalizacja/dowody/em-ci-31723a6c.txt`.
   Tekstów nie poprawiasz (tylko raport i dowody); poprawki zleci koordynator.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów ani kodu w `packages/`, `apps/`, `tools/` (równolegle pracuje sesja 08 EK na `sesja-ek-partia2`), bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: tryb nocny (analogia; najpierw `lkarwowski494/trening`), do weta. Pula **D-1230…D-1234** (`docs/decyzje/EM.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, werdykt na język, znaleziska wg wagi, koszt.
