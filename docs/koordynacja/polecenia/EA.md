# Sesja EA: recenzja niezależna treści i testów DU (b3963e9a..7a7a0f1d) — Szkoła Pokera
Koordynator: session_01T66VBwmproZFQjCLcWHQy4 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 06-tresci w trybie audit (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ea-recenzja` @ 7a7a0f1dd5c31436137a0bd44d30250d7bedd39b (= `origin/sesja-du-szablony`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md.
3. Zakres: diff `b3963e9a..7a7a0f1d` — szablony SC-06, SC-32, SC-33, SC-34 w `content/` (pl, en i 10 przekładów agenta), testy treści zmienione według KO-070 (szablony-du.test.ts nowy; cz-pokrycie, szablony-co, recenzja-cq, generator-odciski, cs-tresc-realna zmienione), decyzje D-1030…D-1040 (`docs/decyzje/DU.md`). Recenzja bez raportu autora: NIE czytasz `docs/tresci/stan-du.md` ani transkryptu DU przed własną oceną; wymagania z rejestru reguł `content/pl/rules.yaml`, CLAUDE.md (ADR-24, liczby przez `{{n:…}}`), KO-070 (`docs/koordynacja/decyzje.md` na `koordynacja`).
4. Zadania:
   1. Merytoryka: każde twierdzenie i liczba w SC-06/32/33/34 ma regułę z przeczytanym źródłem odpowiedniego szczebla; odpowiedzi poprawne zgodne z rozwiązaniem (sprawdź co najmniej 3 warianty na szablon inną ścieżką: rachunek albo surowy plik solvera).
   2. Testy (KO-070): żadna zmiana nie luzuje progu, asercji ani liczby przypadków; każda wynika z nowego szablonu; mutant generatora/wyroczni daje czerwony wynik (sprawdź niezależnie co najmniej 2 mutanty).
   3. Zasady: `pnpm content:build` bez zmian w wyniku (deterministyczny), jedna nazwa na pojęcie, pojęcie zdefiniowane przed użyciem.
   4. Przekłady 10 języków tylko pod kątem struktury (znaczniki, zmienne, brakujące klucze); jakość językową oceni rola 09 osobno.
   5. `pnpm run ci` kod 0 na 7a7a0f1d (plik dowodu).
   Gotowe: `docs/tresci/recenzje/recenzja-du-7a7a0f1d.md` (znaleziska `06-tresci-NNN`, waga KRYT/WYS/ŚR/NIS, plik:linia, dowód) i werdykt PRZYJĄĆ / PRZYJĄĆ PO POPRAWKACH / ODRZUCIĆ; commit i push na `sesja-ea-recenzja`.
5. Zakazy: nie poprawiasz treści DU (tylko raport; test odtwarzający wolno dodać w dowodach), nie scalasz do roboczej ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, bez płatnych API, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia zamieniasz na raport do koordynatora.
6. Decyzje: tryb dzienny — techniczne sam przez analogię (najpierw `lkarwowski494/trening`, potem oczko, piekarz), do weta; produktowe → PYTANIE do koordynatora (≥ 2 opcje, rekomendacja); merytoryczne pokerowe → hierarchia źródeł ADR-24. Pula D-1100…D-1104 (`docs/decyzje/EA.md`).
7. Kontekst i koszt: od 30% okna kończysz krok, stan w raporcie recenzji, push, PRZEKAZANIE. Pułapu kosztu brak — podaj koszt.
8. Raporty (≤ 10 linii, send_message): PYTANIE; PRZEKAZANIE: SHA, werdykt, liczba znalezisk wg wagi, pliki dowodów, koszt.
