# Stan M1 (AY) — 2026-11-10 14:55 UTC — WSTRZYMANY
Decyzja właściciela KO-035 (2026-11-10 14:20, przez koordynatora session_01T66VByNdf5NRAj2XqmVkw1): scenariusze całego rozdania wchodzą do 1.0; audyt M1 czeka na ich ukończenie i nowy build (szac. 2–3 dni). Partia 1 na 57a83bf NIE startuje.

Zrobione (ważne także po wznowieniu): E0 (środowisko, CI main), E0a (bramka — ponowne użycie MON-18), E0b (linia-bazowa.md + 4 soczewki w soczewki/), plan-audytu.md (wariant głęboki zatwierdzony 11:50 UTC: „Wariant głęboki, zgoda na dołączenie repo”), polecenia/<rola>.md ×13 + skladanie.md (KO-034: role w osobnych sesjach chmurowych koordynatora), wspolne/ na 57a83bf (kod 0 ×5; stare bca751e w wspolne/bca751e/).

Po wznowieniu (nowy SHA od koordynatora):
1. Powtórzyć wspolne/ na nowym SHA (worktree w scratchpadzie, skrypt jak w historii: install --frozen-lockfile, typecheck, test, pnpm run ci, test:akceptacja → wspolne/0N-*.txt z kodem wyjścia; poprzednie do wspolne/<sha>/), push, „GOTOWE wspolne @ SHA”.
2. Uzupełnić plan: zakres o scenariusze całego rozdania (KO-035) — rola 06 i 04/08 dostają je w zakresie; sprawdzić koszt (+ ~10%?).
3. E0b: linia bazowa bez zmian, chyba że scenariusze zmieniają główną pracę — wtedy dopisać punkt LB.
4. Odbiór raportów partii 1 (gałęzie audyt/<rola>), sprawdz-raport.mjs (K/narzedzia/, nie w git — w razie braku przepisać z promptu roli M1), koszty.md, punkt kontrolny kosztu → koordynator; partie 2, 3; E2 scalanie i weryfikacja przeciwna (subagenci tej sesji); E3 raport + plan-napraw.json; PRZEKAZANIE.
Koszt AY do teraz: ~0,6 mln tokenów subagentów (4 soczewki) + sesja główna (~4–6 USD wg get_session).
