# Sesja CR: poprawki CN po recenzji CP (WYS-001…003, ŚR-004, NIS-005) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie fix. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cr-poprawki` @ 9a6f45f (= sesja-cp-recenzja: kod CN 3ab616b + raport CP i testy odtwarzające; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania (raport: `docs/programista/recenzje/recenzja-cn-3ab616b.md`; testy: `tools/content-build/test/cp-recenzja-cn.test.ts`, `apps/mobile/src/features/scenariusz/__tests__/cp-recenzja-cn.test.tsx`, dziś `it.fails`/`it.failing`):
   1. WYS-001: ekran pokazuje tylko akcje punktu z szablonu (cbet-case/size-spot z 2 akcjami — bez 3. akcji bez wyjaśnienia), ocena nie rzuca wyjątku; albo bramka odrzuca szablon, którego ekran nie umie pokazać — wybierz spójne rozwiązanie z jedną definicją akcji. Test `it`.
   2. WYS-002: ocena na ekranie F2/F3 zgodna z `gradeDecision` silnika (najlepsza / dopuszczalna / niedokładność / błąd), nie „Błąd” dla każdej akcji poza najlepszą. Uwzględnij D-793 (recenzja CE ŚR-005, sesja CO): w cbet-case rzadsza akcja = „dopuszczalna” (ADR-04) — wariant niesie listę akcji dopuszczalnych, ekran i wyjaśnienie ją pokazują. Test `it`.
   3. WYS-003: icm-call usunięty z `RODZAJE_NA_EKRANIE` (bramka go odrzuca) do czasu projektu ekranu ICM przez rolę 04 (D-807; ekran musi pokazać stosy i wypłaty, na których opiera się ocena). Test `it`.
   4. ŚR-004: test spójności bramka⇔ekran sprawdza też akcje i ocenę (łapie 001–003), nie tylko generowanie. NIS-005: `getKontekstGeneratora` parsuje dane (schemat), bez `as`.
   5. `pnpm run ci` kod 0, dowód `docs/programista/dowody/cr-ci-<sha>.txt`, stan `docs/programista/stan-cr.md`, decyzje `docs/decyzje/CR.md`, push.
   Uwaga dla scalenia (nie twoje zadanie): gałąź `sesja-co-szablony` dodaje do `content/` SC-11/SC-12 (cbet-case) i SC-34 (icm-call); po WYS-003 SC-34 zostanie szkicem przy scaleniu. Nie edytuj `content/`.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, nie podnosisz limitów czasu, nie osłabiasz testów (test odtwarzający przechodzi tylko po naprawie kodu), bez nowych tekstów UI bez roli 04/09 (jeśli konieczne — klucz z polskim tekstem i zgłoszenie), bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: tryb analogia (repo lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta); merytoryczne wg hierarchii ADR-24. Pula **D-815…D-824**, zapis w `docs/decyzje/CR.md`.
6. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: PYTANIE (pełna treść, opcje, rekomendacja); PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
