# Sesja DE: przekład scenario.action.* w 10 słownikach, forma „preflop” (D-887), NIS-DA-01, ŚR-1/ŚR-2 recenzji DB — Szkoła Pokera
Koordynator: session_01T66VBvsiHtynAJhQ4adRmv (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 09-lokalizacja w trybie build; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz. Kontrolę transportu promptu pomiń.
2. Start: gałąź `sesja-de-przeklad` @ 564c38139eca566cc9be61466e322974d6e328a0 — sprawdź `git rev-parse HEAD` = `origin/sesja-cx-range-spot` (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania (wejście: `docs/decyzje/CX.md` D-871 i lista kluczy dla 09 w stanie CX; projekt `docs/design/scenariusz-akcje-i-liczby.md` §1–2 i `docs/design/stan-da.md` z `origin/sesja-da-teksty` @ 7366faa — czytaj przez `git show`; recenzja `docs/lokalizacja/recenzje/recenzja-cy-64ca577.md` z `origin/sesja-db-recenzja` @ 319228c):
   1. Przekład kluczy `scenario.action.*` (dziś kopie en w 10 słownikach, D-871/KO-066) na wszystkie słowniki poza pl/en, z terminologią pokerową zgodną z istniejącymi słownikami (`play.*`). Gotowe: `pnpm i18n:kod` bez uwag „taki sam jak źródło” dla tych kluczy (poza nazwami, które w danym języku zostają po angielsku — każdy taki wyjątek wypisany z powodem), kontrola przekładem zwrotnym zapisana w `docs/lokalizacja/dowody/de-*`.
   2. D-887: forma „preflop” w 11 słownikach według decyzji. Gotowe: jedna forma na słownik, lista zmian w stanie.
   3. NIS-DA-01: `play.log.*` „9bb” bez spacji obok „9 bb” — ujednolić według zasady z design-spec (sprawdź, którą formę przyjęto). Gotowe: test albo kontrola, która łapie niespójność.
   4. ŚR-1 (zapis D-878 / `stan-cy.md` o 66 wpisach bez `sha_pl`) i ŚR-2 (zapadka: usunięcie `sha_pl` nie może zamieniać BŁĘDU w uwagę) z recenzji DB. ŚR-2 to kod `scal-rejestr.mjs`: test czerwony przed poprawką, potem poprawka. Gotowe: test, dowód czerwony→zielony.
   `scenario.numbers.*` NIE — klucze doda sesja 08 (Liczby F2–F4); przekład wtedy osobno.
   Dozwolone ścieżki: słowniki i18n aplikacji, `tools/**/scal-rejestr.mjs` i jego testy, `docs/lokalizacja/`, `docs/decyzje/DE.md`. Nie zmieniaj `content/` poza tym, co wymaga D-887 (wypisz). Po zmianie w `content/` `pnpm content:build`.
   Na końcu `pnpm run ci` kod 0 z plikiem `docs/lokalizacja/dowody/de-ci-<sha8>.txt`.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz. Wygląd i brzmienie pl to rola 04 — problem zgłaszasz jako znalezisko.
5. Decyzje: tryb dzienny (produktowe → pytanie do koordynatora z ≥ 2 opcjami i rekomendacją; techniczne sam, do weta, analogia najpierw z lkarwowski494/trening `repo:plik:linia`). Pula D-902…D-911, wpisy w `docs/decyzje/DE.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/lokalizacja/stan-de.md`, push, PRZEKAZANIE. Pułapu kosztu brak (tylko raport). Przekład przez płatne API: nie (robisz go sam w sesji).
7. Push zbiorczo na `sesja-de-przeklad`.
8. Raport ≤ 10 linii przez send_message: po pierwszym zadaniu czas i szacunek reszty; PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte, koszt).
