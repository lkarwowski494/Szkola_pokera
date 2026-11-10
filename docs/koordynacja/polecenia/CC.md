# Sesja CC: recenzja niezależna BX (treść krytyczna M12) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 06-tresci w trybie audit (moduły kontrole-mechaniczne, tresci-krytyczne). Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cc-recenzja` @ 178cf97 (= sesja-bx-m12; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Zadanie: recenzja niezależna zmian BX `70fdf40..178cf97` — 4 wyjaśnienia egzaminu M12 (q1, q2, q3, q8 w `content/pl/exams/.../m12.yaml`; treść krytyczna D-027: bankroll, mienie), wzór D-565 (sens → rachunek, te same klucze `{{n:}}`, te same poprawne odpowiedzi), przegląd zastępczy `docs/tresci/dowody/bx-przeglad-zastepczy.md`, `przeglad.sha`. Sprawdź każde twierdzenie wobec hierarchii źródeł ADR-24 (CLAUDE.md) i rachunku (`content/numbers.yaml`). Nie czytaj uzasadnień autora (`docs/tresci/stan-bx.md`, `docs/decyzje/BX.md`) przed własną oceną. Gotowe: raport `docs/tresci/recenzje/recenzja-bx-178cf97.md` (werdykt PRZYJĄĆ / Z WARUNKIEM / ODRZUCIĆ, znaleziska KRYT/WYS/ŚR/NIS z miejscem i realnością), test odtwarzający dla każdego KRYT/WYS (czerwony), `pnpm run ci` kod 0 z dowodem `docs/tresci/dowody/cc-ci-<sha>.txt`, push.
4. Zakazy: nie poprawiasz treści autora (tylko testy odtwarzające i raport), nie scalasz, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: pula **D-715…D-719**, zapis w `docs/decyzje/CC.md` (KO-054).
6. Kontekst: od 30% kończysz krok i PRZEKAZANIE; % kontekstu w raporcie.
7. Raport ≤ 10 linii przez send_message: werdykt, liczby znalezisk, SHA, plik raportu, ci.
