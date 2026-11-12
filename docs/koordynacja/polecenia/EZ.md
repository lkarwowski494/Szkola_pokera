# Sesja EZ: recenzja niezależna treści EV — Szkoła Pokera
Koordynator: session_01T66VBz8VshtVqwg6bHotLi (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ez-recenzja` od `sesja-ev-tresci` @ 7e667066 (inny HEAD: zgłoś). Zakres: 91573ab6..7e667066 (treść i dokumenty EV). Przed własną oceną nie czytasz uzasadnień autora (`docs/decyzje/EV.md`, `docs/tresci/stan-ev.md`) — najpierw zmiany w `content/` i źródła.
3. Zadania:
   1. Sprawdź niezależnie: D-1285 (EP-002: SDV liczona z remisem jako ½, R-M8-006 pl/en), D-1286 (EP-003: turn-bet tylko z czystymi outami; rachunek N/44 wobec ceny dużego zakładu, N/46 wobec ceny małego — przelicz sam), D-1287 (R-M5-012 warunkowe: źródło Upswing ep24 — otwórz i przeczytaj, sprawdź cytat dosłownie na surowym tekście; czy reguła nie mówi więcej niż źródło), D-1289 (N6 otwarte: czy odczyt „no clear pattern” jest wierny).
   2. Spójność terminów z tabelą terminologii (dokument 13 / `docs/tresci/`), liczby przez `{{n:…}}`, poziom pewności zgodny ze szczeblem.
   3. `pnpm run ci` kod 0 na 7e667066 we własnym kontenerze → `docs/tresci/dowody/ez-ci-7e667066.txt`.
   „Gotowe”: `docs/tresci/recenzja-ez.md` z werdyktem PRZYJĘTE / PRZYJĘTE Z ZASTRZEŻENIAMI / PO POPRAWKACH, znaleziska z wagą wg progu wydania (CLAUDE.md), cytaty z adresem i datą odczytu.
4. Zakazy: tylko raport i dowody (nie poprawiasz treści); nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
5. Decyzje: merytoryczne → ADR-24, do weta. Pula **D-1320…D-1324** (`docs/decyzje/EZ.md`).
6. Kontekst i koszt: od 30% okna kończysz krok, zapisujesz stan, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
7. Raporty (≤ 10 linii, send_message): PYTANIE z pełną treścią, opcjami i rekomendacją; PRZEKAZANIE: SHA, ci kod i plik dowodu, werdykt, znaleziska wg wagi, decyzje do weta, koszt.
