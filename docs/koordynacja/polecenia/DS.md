# Sesja DS: przekład scenario.numbers.* (D-967) i scenario.icm.* (D-989) w 10 słownikach — Szkoła Pokera
Koordynator: session_01T66VBwchgoN1YcMZZCKBS6 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 09-lokalizacja w trybie build; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ds-przeklad` @ b3963e9a8cf20bc3dcb39359ad6353e1afb5ee85 (= robocza `claude/sleepy-brahmagupta-2065nu`; inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md.
3. Zadania (wejście: `docs/decyzje/DN.md` D-967, `docs/decyzje/DP.md` D-989 i D-990, `docs/design/scenariusz-akcje-i-liczby.md`, design-spec „Scenariusz: punkt ICM”; wzór poprzedniego przekładu: `docs/lokalizacja/stan-de.md`, `docs/decyzje/DE.md`):
   1. Przekład 7 kluczy `scenario.numbers.*` i 15 kluczy `scenario.icm.*` (dziś kopie en w 10 słownikach) na wszystkie słowniki poza pl/en; terminologia pokerowa zgodna z istniejącymi słownikami (`play.*`, `scenario.action.*`), znaczniki terminów `{{t:…}}` i liczb `{{n:…}}` zachowane bez zmian. Gotowe: `pnpm i18n:kod` bez uwag „taki sam jak źródło” dla tych kluczy (wyjątki — nazwy zostające po angielsku — wypisane z powodem); kontrola przekładem zwrotnym w `docs/lokalizacja/dowody/ds-*`.
   2. Termin „bubble”/„Bańka” (ŚR-004 recenzji DQ, `docs/programista/recenzje/recenzja-dp-007e23ad.md`): NIE zmieniasz pl; w innych językach używasz terminu z istniejącego słownika kursu i zgłaszasz w raporcie, co znalazłeś.
   3. `pnpm run ci` kod 0, plik `docs/lokalizacja/dowody/ds-ci-<sha8>.txt`. Push zbiorczo na `sesja-ds-przeklad`.
   Dozwolone ścieżki: słowniki i18n aplikacji, `docs/lokalizacja/`, `docs/decyzje/DS.md`. `content/` bez zmian.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora. Brzmienie pl to rola 04 — problem zgłaszasz jako znalezisko. Przekład przez płatne API: nie (robisz go sam w sesji).
5. Decyzje: tryb dzienny (produktowe → pytanie do koordynatora z ≥ 2 opcjami i rekomendacją; techniczne sam, do weta, analogia najpierw z lkarwowski494/trening `repo:plik:linia`). Pula D-1010…D-1019, wpisy w `docs/decyzje/DS.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/lokalizacja/stan-ds.md`, push, PRZEKAZANIE. Pułapu kosztu brak (tylko raport).
7. Raport ≤ 10 linii przez send_message: PRZEKAZANIE (SHA, ci, decyzje do weta, wyjątki, otwarte, koszt).
