# Sesja EW: luki w testach z recenzji ET — Szkoła Pokera
Koordynator: session_01T66VBz8VshtVqwg6bHotLi (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie fix (zadania 08-programista-001, 08-programista-002 z recenzji ET). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ew-testy` od `claude/sleepy-brahmagupta-2065nu` @ 91573ab6 (inny HEAD: zgłoś). Raport: `git show origin/sesja-et-recenzja:docs/programista/recenzja-et.md`, mutanty `docs/programista/dowody/et/` na tej gałęzi. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zadania:
   1. 08-programista-001 (ŚR): test etykiety czytnika ekranu paska ocen pick-hand (EP-004); mutant M12 z ET ma paść. „Gotowe”: test czerwony na mutancie, zielony na kodzie.
   2. 08-programista-002 (NIS): przypięcie granicy kickera Q w turn-bet (08-EL-1, D-1256); mutant M8 (próg K) ma paść.
   3. `pnpm run ci` kod 0 na końcowym SHA → `docs/programista/dowody/ew-ci-<sha>.txt`; wynik mutantów → `docs/programista/dowody/ew-mutanty.txt`.
   Tylko testy (bez zmiany zachowania aplikacji); jeśli test wykaże błąd w kodzie — raport, nie poprawka.
4. Zakazy: nie zmieniasz `content/`, workflowów ani kodu produkcyjnego; nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: najpierw analogia (`lkarwowski494/trening`), do weta. Pula **D-1295…D-1299** (`docs/decyzje/EW.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, mutanty, decyzje do weta, koszt.
