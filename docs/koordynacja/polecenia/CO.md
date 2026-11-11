# Sesja CO: dokończenie kroku C — 11 szkiców szablonów do content/ — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 06-tresci w trybie build (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-co-szablony` @ 5637200 (= gałąź robocza; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>).
3. Zadania (plan: `docs/zakres/scenariusze-plan.md` §2–3 krok C; szkice i tabela formatów F1–F6: `docs/tresci/szablony-robocze/README.md`; format rozszerzony przez BU/CA/CJ):
   1. Przenieś 11 szkiców do `content/` w formacie obsługiwanym przez `content-build` (draw-call, all-in, cbet-case, size-spot, icm-call). Szkice range-spot (F1) zostaw jako szkic z adnotacją — ekran ich jeszcze nie obsługuje (D-755; sesja CN dodaje kontekst na ekranie). Uwagi: size-spot łączyć z range-spot albo ograniczyć do rąk z zakresu (D-698: 32s „raise” = mistake); ŚR-103 (łatwy „call” tylko przy zakładzie ≤ ok. 0,11 puli); formuła all-in z martwymi blindami (CJ, D-745…D-751); icm-call tylko pary dopuszczone przez generator.
   2. Każda decyzja w szablonie ma przeczytane źródło wg ADR-24 (szczebel 1 rachunek — `{{n:klucz}}` z `content/numbers.yaml`, liczby formułą z `refs`); wyjaśnienia wg BR-OCE-001/002 i KO-040 (na intuicję). Czego nie da się potwierdzić — otwarte pytanie, nie treść.
   3. ŚR-005 recenzji CE (`docs/programista/recenzje/recenzja-ca-1533486.md`; D-750): cbet-case — jedna akcja poprawna vs grading „acceptable”: rozstrzygnij wg ADR-24/ADR-04 (ręka mieszana) z przeczytanym źródłem i zapisz decyzję; zmianę kodu gradingu, jeśli potrzebna, opisz jako zadanie dla 08 (nie zmieniaj kodu).
   4. `pnpm content:build` i `pnpm run ci` kod 0, dowód `docs/tresci/dowody/co-ci-<sha>.txt`, stan `docs/tresci/stan-co.md`, decyzje `docs/decyzje/CO.md` + rejestr Drive jak zwykle (12/13 — jeśli brak dostępu, zapisz w repo i oznacz), push.
   Po PRZEKAZANIU koordynator zleci recenzję niezależną treści (06 audit). Nie edytuj kodu (`packages/`, `apps/`, `tools/` poza tym, co wymaga wyłącznie content-build do treści).
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: merytoryczne wg hierarchii ADR-24 (CLAUDE.md); procesowe analogia (trening, oczko, piekarz). Pula **D-790…D-804**.
6. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. Bez pułapu kosztu.
7. Raporty ≤ 10 linii przez send_message: po E0 (plan, czas); PYTANIE; PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
