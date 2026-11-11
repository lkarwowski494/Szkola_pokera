# Sesja CN: GeneratorContext na ekranie scenariusza (F1–F4) + ŚR CM — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie build. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cn-kontekst` @ 9143dec (= robocza 5637200 + raport CM i testy `it.fails`; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania (tło: `docs/programista/recenzje/recenzja-cl-5637200.md`, `docs/programista/stan-cl.md` „otwarte”, `docs/tresci/szablony-robocze/README.md` tabela F1–F6):
   1. Ekran scenariusza przekazuje do `wybierzWariant`/generatora pełny GeneratorContext (dane spotów: zakresy, rozmiary, stos, pozycje), tak że szablony range-spot (F1), cbet-case (F2), size-spot (F3) i icm-call (F4) dają poprawny plan na ekranie, nie „plan_niepoprawny”. Jeśli range-spot wymaga UI wielu akcji, którego nie ma — zostaje odrzucany w budowaniu (D-755), ale pozostałe trzy muszą działać. Gotowe: testy ekranu/adaptera dla każdego rodzaju na fikstrurach; `checkScenarioNaEkran` przepuszcza tylko rodzaje faktycznie obsługiwane na ekranie (ŚR-001 CM: test `cm-recenzja-cl.test.ts` z `it.fails` na `it`, zielony).
   2. ŚR-002 CM: icm-call odrzuca parę SB wobec all-inu BB (albo liczy ją poprawnie rachunkiem z blindami); test `it.fails` → `it`, wyrocznia niezależna od generatora.
   3. NIS-004 CM (wznowienie odtwarza z ziarna bez odcisku) — jeśli tanie, napraw z testem; inaczej zapisz w stanie.
   4. `pnpm run ci` kod 0, dowód `docs/programista/dowody/cn-ci-<sha>.txt`, stan `docs/programista/stan-cn.md`, decyzje `docs/decyzje/CN.md`, push.
   Ścieżki wrażliwe (`tools/content-build/src`, `packages/poker-core`, `packages/postep`) — po PRZEKAZANIU recenzja niezależna zleci koordynator. Równolegle sesja CO (06) dodaje szablony do `content/` na innej gałęzi — nie edytuj `content/`.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, nie podnosisz limitów czasu, nie osłabiasz testów, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: tryb analogia (repo lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta); merytoryczne (rachunek) wg hierarchii ADR-24. Pula **D-780…D-789**.
6. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: po zadaniu 1 (czas, szacunek reszty); PYTANIE; PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
