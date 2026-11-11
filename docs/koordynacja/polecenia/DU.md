# Sesja DU: szablony scenariuszy kroku C (reszta) i D do content/ — Szkoła Pokera
Koordynator: session_01T66VBwchgoN1YcMZZCKBS6 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 06-tresci w trybie build; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-du-szablony` @ b3963e9a8cf20bc3dcb39359ad6353e1afb5ee85 (= robocza). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość wg CLAUDE.md.
3. Kontekst: właściciel 2026-11-11 ok. 18:15: 1.0 = pełny zestaw 34 szablonów, praca równoległa. Plan `docs/zakres/scenariusze-plan.md` §2–3; w `content/pl/scenarios/` są sc-01, 02, 03, 11, 12, 19 (format i wzór). Metoda źródeł KO-069 (niżej).
   Zadania:
   1. Inwentaryzacja SC-04, 05, 06, 08, 13, 32, 33, 34 („umie”) i SC-07, 09, 10, 14, 15, 17, 20 („częściowo”, + ewentualny 8. z planu): czy silnik obsługuje (plik:linia), czy reguły mają przeczytane źródło, czego brakuje. Gotowe: tabela w `docs/tresci/stan-du.md`, raport do koordynatora.
   2. Szablony gotowe do zapisu → `content/pl` i `content/en` (pozostałe języki: oznaczone do przekładu wg zasad 09, lista kluczy), wyjaśnienia wg BR-OCE-001/002 i KO-040, liczby przez `{{n:…}}`; `pnpm content:build`. Warunek oceny wymagający kodu (`grading.ts`, generator) → lista dla roli 08 z dokładnym zachowaniem i testem akceptacji; nie piszesz kodu poza `content/`.
   3. `pnpm run ci` kod 0, plik `docs/tresci/dowody/du-ci-<sha8>.txt`. Push zbiorczy.
   Metoda źródeł (KO-069, 2026-11-11): szczebel 4 (uznany serwis szkoleniowy, przeczytany z cytatem) wystarcza do reguły z poziomem `heuristic` i atrybucją; książka nie jest warunkiem; źródła szukasz od najtańszego wystarczającego: rachunek → opublikowany solver → serwis szkoleniowy; wyższy szczebel tylko przy sprzeczności. M10 (eksploatacja) bez danych o populacji — nie w tej sesji.
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, nie usuwasz ani nie luzujesz testów, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz. Kod poza `content/` i `docs/` — tylko jako lista dla 08.
5. Decyzje: merytoryczne wg hierarchii ADR-24 z CLAUDE.md i KO-069 (nie analogia, nie właściciel), zapis w rejestrze źródeł jak dotąd; techniczne sam, do weta. Pula D-1030…D-1049 w `docs/decyzje/DU.md`.
6. Kontekst: od 30% okna kończysz krok (szablon dokończony), stan w `docs/tresci/stan-du.md`, push, PRZEKAZANIE z listą pozostałych szablonów.
7. Raport ≤ 10 linii przez send_message: po zadaniu 1 (ile gotowych, ile wymaga 08, czas); PRZEKAZANIE (SHA, szablony zapisane, lista dla 08 i 09, ci, decyzje, koszt).
