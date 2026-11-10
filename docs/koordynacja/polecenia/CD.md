# Sesja CD: scalenie BT + BS + BU + BY do gałęzi roboczej — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie build. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź robocza `claude/sleepy-brahmagupta-2065nu` @ 70fdf40 (inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem (także commity scalenia).
3. Zadania:
   1. Scal (`git merge --no-ff`, bez rebase i bez force-push) kolejno: `origin/sesja-bt-ekran` @ 713314b, `origin/sesja-bs-szablony` @ 866744e, `origin/sesja-bu-format` @ 6a5ca17, `origin/sesja-by-powtorki` @ b5325bb (inny SHA: zgłoś). Wszystkie przyjęte przez koordynatora (recenzje BW, BV, BZ; CI zielone na SHA). Konflikty możliwe: `szablon-scenariusza-bf.test.ts`, `docs/decyzje.md`, generowane `apps/mobile/assets/content/*` i `tresc.generated.ts` — pliki generowane regeneruj `pnpm content:build`, nie scalaj ręcznie; w kodzie zachowaj obie zmiany (BU naprawia WYS-201 z BS — test `bv-gotowa-reka` ma przejść). Gotowe: 4 scalenia, opis rozwiązania każdego konfliktu w `docs/programista/stan-cd.md`.
   2. W nagłówku `docs/decyzje.md` dopisz wskazanie folderu `docs/decyzje/<litera>.md` (KO-054). Gotowe: jedna linia.
   3. `pnpm content:build` i `pnpm run ci` kod 0; dowód `docs/programista/dowody/cd-ci-<sha>.txt`; push na `claude/sleepy-brahmagupta-2065nu` (zwykły push, fast-forward od 70fdf40). CI i E2E na wyniku wyzwala koordynator.
4. Zakazy: nic na `main`, żadnych zmian funkcjonalnych poza rozwiązaniem konfliktów, nie scalasz `sesja-ca-format`, `sesja-bx-m12`, `sesja-cb-dane` (osobno, później), nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, bez --no-verify i force-push, bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: techniczne do weta, pula **D-720…D-724**, zapis w `docs/decyzje/CD.md`.
6. Kontekst: od 30% kończysz krok i PRZEKAZANIE.
7. Raport ≤ 10 linii przez send_message: SHA wyniku, konflikty i jak rozwiązane, ci, plik dowodu.
