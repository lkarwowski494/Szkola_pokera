# Polecenie przeglądu D-043 (ścieżka wrażliwa `tools/content-build/`) dla 06-tresci-501

Nieodbyty: sesja 06 pracowała jako subagent bez narzędzia subagentów. Uruchamia koordynator napraw w świeżym kontekście.

Polecenie dla subagenta przeglądu (bez rozumowania autora poprawki):
- Repo `/home/user/Szkola_pokera`, gałąź `claude/sesja-is-naprawy-p1`. Przeczytaj tylko `git diff 5a12a2ad..HEAD` (commit z „[M1-audytor-generalny-002; 06-tresci-501]”) oraz znalezisko 06-tresci-501 w `audit/M1-2026-11-17/naprawy/polecenia/06-tresci-p1.md` (sekcja „Znaleziska źródłowe”).
- Zasady 10–14 z promptu roli (zero utraty danych użytkownika, testy przed kodem bez dopasowywania testów, działania zewnętrzne tylko za zgodą, koszty 0 zł, repo publiczne bez sekretów i z `git diff --cached` przed commitem).
- Sprawdź szczególnie: czy zmiana w `content/ranges/spots.yaml` i nakładkach `content/*/ranges/spots.yaml` zmienia identyfikatory spotów, klas albo rąk w powtórkach (SRS) albo układ bazy na język; czy nowy test `tools/content-build/test/is-siatki-niepewne.test.ts` nie osłabia istniejących kontroli; czy `docs/tresci/porownanie-siatek.json` nie kopiuje tabel źródła.
- Zgłaszaj tylko P0/P1 z `plik:linia` i scenariuszem użytkownika albo napisz „brak uwag”.
