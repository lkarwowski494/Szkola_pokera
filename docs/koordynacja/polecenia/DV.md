# Sesja DV: źródła dla warunków szablonów kroku E (SC-16…SC-31) i dane populacji M10 — Szkoła Pokera
Koordynator: session_01T66VBwchgoN1YcMZZCKBS6 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; po wiadomości o zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko do odczytu).

1. Rola 06-tresci w trybie build; prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-dv-zrodla` @ b3963e9a8cf20bc3dcb39359ad6353e1afb5ee85 (= robocza). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość wg CLAUDE.md.
3. Wejście: `docs/tresci/zrodla-scenariusze-ksiazki.md` §2B i §4, `docs/zakres/scenariusze-plan.md` §2, `docs/zalozenia.md` ZAL-013. Metoda źródeł KO-069 (2026-11-11): szczebel 4 (uznany serwis szkoleniowy, przeczytany z cytatem) wystarcza do reguły `heuristic` z atrybucją; książka nie jest warunkiem; szukasz od najtańszego wystarczającego: rachunek → opublikowany solver (lista serwisów: CLAUDE.md, dokument 03 ADR-24) → serwis szkoleniowy; wyższy szczebel tylko przy sprzeczności. Każde źródło przeczytane w surowym tekście (adres, cytat 1–2 zdania, data).
   Zadania:
   1. Dla warunków §2B (SC-16 check-raise, SC-18 karta turnu, SC-21 „średnia ręka”, SC-22/25 model zakresu na riverze, SC-23 bloker, SC-24 skład blefów, SC-26–28 strefa SPR i ulice wartości): projekt warunku sprawdzalnego (dane wejściowe → decyzja), źródło, poziom pewności; gdzie reguła nie rozstrzyga — wariant szablonu bez tej decyzji (ZAL-013). Gotowe: `docs/tresci/zrodla-krok-e.md` (tabela: szablon, warunek, źródło z cytatem, szczebel, poziom, status).
   2. M10 (SC-29–31): czy przeczytane źródła reguł R-M10-004/006/007 albo inne opublikowane analizy baz rąk podają próbę, stawki i pokój (szczebel 5). Gotowe: sekcja w tym samym pliku z werdyktem „są dane / nie ma” i cytatami.
   3. Luki §2A (R-M4-010/012/013): zapisz, że według KO-069 szczebel 4 wystarcza (bez zmiany treści), chyba że znajdziesz sprzeczność.
   Dozwolone ścieżki: `docs/tresci/`, `docs/decyzje/DV.md`. `content/` bez zmian (zapis reguł zrobi sesja szablonów po odbiorze).
4. Zakazy: nie scalasz do gałęzi roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nigdy --no-verify ani force-push, nie usuwasz ani nie luzujesz testów, nie pytasz właściciela (bez AskUserQuestion); STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz.
5. Decyzje: merytoryczne wg hierarchii ADR-24 i KO-069; techniczne sam, do weta. Pula D-1050…D-1059 w `docs/decyzje/DV.md`.
6. Kontekst: od 30% okna kończysz krok, stan w `docs/tresci/stan-dv.md`, push, PRZEKAZANIE.
7. Raport ≤ 10 linii przez send_message: PRZEKAZANIE (SHA, ile warunków ma źródło / bez źródła, werdykt M10, decyzje, koszt).
