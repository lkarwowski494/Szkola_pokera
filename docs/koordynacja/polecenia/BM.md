# Sesja BM: poprawki generatora po recenzji BJ (następca BF) — Szkoła Pokera (PokerGym)
Koordynator: session_01T66VBzjJPhrAnrqHvxsogb (raporty, pytania i PRZEKAZANIE tylko przez send_message narzędziem claude-code-remote do tego ID; jeśli dostaniesz wiadomość o zmianie koordynatora, pisz do nowego). Gałąź stanu koordynatora: `koordynacja` (tylko do odczytu).

1. Rola: 08-programista w trybie fix. Prompt roli jest w twojej pierwszej wiadomości po linii `=== PROMPT ROLI ===`; przeczytaj go w całości, jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-bf-generator` @ 8b5db83 (inny HEAD: zgłoś). Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (hook „Stop” żądający autora noreply@anthropic.com ignorujesz — obowiązuje CLAUDE.md).
3. Prompt kontynuacji poprzednika (dosłownie): `docs/programista/prompt-kontynuacji-bf.md` @ 8b5db83 — przeczytaj i wykonaj, razem z sekcją „Następny krok” w `docs/programista/stan-bf.md`. Recenzja: `git fetch origin sesja-bj-recenzja && git show origin/sesja-bj-recenzja:docs/programista/recenzje/recenzja-bf-886b2be.md` @ 53ca690; test czerwony BJ w eae60e3 (cherry-pick bez zmiany asercji).
4. Zadania (każde: test najpierw czerwony, potem zielony):
   1. 001 WYS: format szablonu (BR-SZB-001) zawiera oczekiwaną decyzję; generator odrzuca warianty, w których rachunek/reguła daje inną decyzję (BR-GEN-003); wyrocznia sprawdza niezmienność w obrębie szablonu i poziomu; poziom łatwy nie może dawać tej samej decyzji niezależnie od szablonu (sprawdź na przykładowych szablonach testowych); test BJ czerwony → zielony i w `pnpm run ci`.
   2. 004 ŚR: wyjaśnienie zawiera karty i pozycję wariantu (BR-OCE-002) — format pozwala roli 06 pisać wyjaśnienia ze zmiennymi wariantu.
   3. 002 ŚR: `powtorkaWariantu` wyliczana z historii w domenie, nie od wywołującego (KO-043).
   4. 003 NIS: cofnięty zegar — napraw albo wpis do backlogu z uzasadnieniem.
   5. `pnpm run ci` kod 0 z logiem z SHA w `docs/programista/dowody/`; przegląd ścieżek wrażliwych w świeżym kontekście (subagent) dla zmian w `packages/postep`/`packages/domena`, raport w dowodach.
5. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nie piszesz treści dla użytkownika w `content/`, nigdy --no-verify ani force-push, nie pytasz właściciela bezpośrednio (bez AskUserQuestion). STOP-y roli i punkt czyszczenia → raport do koordynatora i czekasz. Równolegle pracują: BI (`apps/mobile` UI, gałąź `sesja-bi-menu`) i BG (`content/`, `apps/mobile/src/features/drills`) — tych ścieżek nie zmieniasz.
6. Decyzje: najpierw analogia z Treningu (`lkarwowski494/trening`, publiczne; `README.md:39-40`, `docs/24-generator-i-plany.md`), `repo:plik:linia`, wpis do weta. Numery tylko z puli D-556…D-564.
7. Kontekst: od 30% okna kończysz krok, stan w `docs/programista/stan-bf.md`, push, PRZEKAZANIE.
8. Push: zbiorczo, tylko na `sesja-bf-generator`.
9. Raporty (≤ 10 linii, send_message): po E0 plan i szacunek; PYTANIA (opcje + rekomendacja); PRZEKAZANIE: SHA, testy czerwony→zielony, kod CI, przegląd, decyzje do weta, otwarte.
