# Sesja FX: recenzja niezależna kodu FV (08 audit) i przegląd D-043 — Szkoła Pokera
Koordynator: session_01T66VByxxQ4VaznS4NWFuhb (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego; aktualny ID zawsze w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie audit. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-fx-recenzja` od `sesja-fv-poprawki` @ a966a876. Inny HEAD: zgłoś. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zakres: diff `a79ad506..a966a876` (11 commitów FV: FU-201 opcja b bramka `correct: [..]`, 203 test MU5, 204 formatowanie play.log, 08-FQ-2 marginMax river-value, D-1461 klucze ceny ⅔ w `content/numbers.yaml`, FS-001/005 trwałe kontrole, FW-01/02 logika river-value, D-1490 LICZBY_ZAREZERWOWANE w build.ts, D-1495 wpisy rejestru 06). **Nie czytaj raportu autora przed własną oceną** (plan-08 sekcja FV i `docs/decyzje/FV.md` dopiero po werdykcie wstępnym).
   1. Recenzja kodu według listy kontrolnej roli; mutanty na kluczowych zmianach (bramka 201, LICZBY_ZAREZERWOWANE — czy nie maskuje błędu po wejściu SC-13, FS-001/005).
   2. **Przegląd ścieżki wrażliwej D-043 (`tools/content-build/`)**: identyfikatory w powtórkach i baza na język — porównanie baz przed/po (ID nie znikają, nowe liczby tylko dodane), dowód w pliku.
   3. Werdykt PRZYJĄĆ / PRZYJĄĆ Z UWAGAMI / ODRZUCIĆ z poziomami wg CLAUDE.md „Audyty i wydania”; raport `docs/programista/recenzje/recenzja-fv-a966a876.md`.
   4. `pnpm run ci` kod 0 na swoim HEAD (dowód `docs/programista/dowody/fx-ci-<sha>.txt`).
4. Zakazy: nie poprawiasz kodu FV (tylko raport, testy odtwarzające w `docs/programista/dowody/`); nie scalasz, nie tworzysz i nie archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, bez AskUserQuestion. STOP-y i punkt czyszczenia → raport do koordynatora.
5. Decyzje: numery tylko D-1505…D-1509; techniczne przez analogię z lkarwowski494/trening (oczko, piekarz), `repo:plik:linia`, do weta.
6. Kontekst: od 30% okna kończysz krok, push, PRZEKAZANIE. Pułap kosztu: brak (mandat).
7. Push: zbiorczo na `sesja-fx-recenzja`.
8. Raporty (≤ 10 linii, send_message): PYTANIE z opcjami i rekomendacją; PRZEKAZANIE: werdykt, znaleziska wg poziomu, SHA, dowody, decyzje do weta, koszt.
