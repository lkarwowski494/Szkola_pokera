# Sesja CS: scalenie CO+CQ na CR i poprawki recenzji CQ (WYS-001…004, ŚR-005) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie fix. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cs-poprawki` @ cd327e9 (= sesja-cr-poprawki: robocza 5637200 + CN + poprawki CR; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania:
   1. Scal `--no-ff` `origin/sesja-cq-recenzja` (0197509 = treść CO ad62a2d + raport i testy `it.fails` recenzji CQ). Konflikty: zachowaj oba zamiary; pliki generowane tylko `pnpm content:build`; SC-34 (icm-call) przenieś z `content/` z powrotem do szkiców (`docs/tresci/szablony-robocze/`) z adnotacją D-807 (icm-call poza ekranem); SC-11/SC-12 dostają pełne 3 akcje c-betu wymagane przez bramkę CR (D-815).
   2. Poprawki recenzji CQ (`docs/tresci/recenzje/recenzja-co-ad62a2d.md`; testy `tools/content-build/test/recenzja-cq-odtworzenie.test.ts` → `it`, zielone bez osłabienia):
      - WYS-003: liczenie outów w draw-call uwzględnia karty wyższe od stołu (definicja D1 aplikacji) albo generator nie losuje wariantów, w których to zmienia odpowiedź — dotyczy SC-03 oraz **sc-02 i sc-19 już w treści na gałęzi roboczej**; wyrocznia testu liczona niezależnie od generatora.
      - WYS-004: SC-11/SC-12 losują tylko ręce z zakresu otwarcia BTN (dane zakresu z treści; jedna definicja) — przy „Otworzyłeś z Buttona” ręka spoza zakresu nie występuje.
      - WYS-001 sprawdź, że po CN/CR SC-11/SC-12 działają na ekranie (test ekranu/adaptera); WYS-002 zamyka przeniesienie SC-34 do szkiców (test, że bramka go odrzuca).
      - ŚR-005 (flopy z możliwym OESD): jeśli tanie — generator SC-11/12 losuje tylko flopy, dla których źródło wspiera regułę; inaczej zapisz w stanie dla roli 06.
      - ŚR-006/NIS-007 (dla roli 07) — tylko zapisz w stanie.
   3. `pnpm content:build` i `pnpm run ci` kod 0, dowód `docs/programista/dowody/cs-ci-<sha>.txt`, stan `docs/programista/stan-cs.md`, decyzje `docs/decyzje/CS.md`, push.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, nie podnosisz limitów czasu, nie osłabiasz testów, nie zmieniasz brzmienia wyjaśnień merytorycznych poza tym, co wymusza poprawka (zmiany treści merytorycznej zapisz do przeglądu 06), bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: tryb analogia (repo lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta); merytoryczne (rachunek outów, zakresy) wg hierarchii ADR-24. Pula **D-825…D-839**, zapis w `docs/decyzje/CS.md`.
6. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: po zadaniu 1 (konflikty, czas, szacunek reszty); PYTANIE; PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
