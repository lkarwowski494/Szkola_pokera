# BF: przegląd ścieżek wrażliwych (D-043), 2026-11-10
Subagent w świeżym kontekście, wejście: `git diff 8cba034..HEAD`, specyfikacja i zasady 10–14, bez rozumowania autora.
Wynik: **brak uwag P0/P1.** Sprawdzone: migracja v2 w BEGIN IMMEDIATE z wycofaniem i test na kopii pliku bazy v1; UPSERT bez INSERT OR REPLACE;
tylko `wariant_historia` opcjonalna w eksporcie; nazwy tabel/kolumn z zamkniętych list; import i „Usuń postęp” obejmują tabelę; zmiany istniejących
testów (wersja 1→2, 7→8 tabel, regex k10) uczciwe; brak sekretów; postep 134 testy zielone.
Uwagi P2 (do backlogu, bez wpływu na wydanie):
1. `limit.ts`: `powtorkaWariantu` to flaga od wywołującego; ekran przebiegu (krok F) ma wyliczać ją z historii/ziarna, nie przyjmować z UI (inaczej obejście limitu).
2. Import nie przycina historii do okna 20 (rozrost bazy z pliku; odczyt i następny zapis tną).
3. `scenariusze.ts`: rzutowanie `as GeneratorTemplate` po walidacji zod.
4. `wariant.ts`: przy pustej historii i 200 trafieniach w sesję zwraca powtórkę (praktycznie nieosiągalne przy pojemności ≥ 40).
5. Import starego pliku bez `wariant_historia` czyści lokalną historię (zgodne ze specyfikacją; mieć na uwadze w komunikacie importu).
