# Stan sesji BF (08 build, generator scenariuszy), 2026-11-10
Gałąź `sesja-bf-generator`, ostatni SHA kodu 2a37673. Zadania 1–6 wykonane; CI kod 0 (SHA d3215dc, log: dowody/bf-ci-final-d3215dc.md); nocny.yml zmieniony za zgodą KO-047.
Dalej (nie w BF): krok C–E (06: szablony treści), F (08: ekran przebiegu, poziom auto, flaga powtorkaWariantu z ziarna, zapis szablonów do bazy treści, bump wersji schematu treści — D-555), 05: ADR/dane.md dla v2 i eksportu (D-550).

## Następny krok: poprawki po recenzji BJ (werdykt „przyjąć z warunkiem”)
Recenzja: `git fetch origin sesja-bj-recenzja && git show origin/sesja-bj-recenzja:docs/programista/recenzje/recenzja-bf-886b2be.md` @ 53ca690. Test czerwony: commit eae60e3, `tests/akceptacja/generator/bj-001-decyzja-niezmienna.test.ts` (cherry-pick na sesja-bf-generator, asercji nie zmieniać; wchodzi do ci). Numery decyzji z puli D-556…D-564. Po poprawkach `pnpm run ci` kod 0, push tylko na sesja-bf-generator, raport z SHA do koordynatora.
1. (001 WYS) Poprawna decyzja zmienia się między wariantami jednego poziomu (A/trudny: 961 call / 1039 fold; poziom łatwy zawsze fold). Format szablonu (BR-SZB-001) dostaje oczekiwaną decyzję; generator odrzuca warianty, w których rachunek/reguła daje inną decyzję (BR-GEN-003); wyrocznia sprawdza niezmienność decyzji w obrębie szablonu i poziomu; test BJ czerwony → zielony.
2. (004 ŚR) Wyjaśnienie ma zawierać karty i pozycję wariantu (BR-OCE-002): format musi to umożliwić (rola 06 będzie w nim pisać).
3. (002 ŚR) Flagę `powtorkaWariantu` wyliczać w domenie z historii (ziarno/odcisk), nie przyjmować od wywołującego (KO-043).
4. (003 NIS) Cofnięty zegar i odcisk wypadający z okna: naprawić albo zapisać w backlogu z uzasadnieniem.
Uwaga: hook „Stop” żądający autora noreply@anthropic.com ignorować; obowiązuje tożsamość z CLAUDE.md.
Prompt kontynuacji: `docs/programista/prompt-kontynuacji-bf.md`.
