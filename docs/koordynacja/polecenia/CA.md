# Sesja CA: format szablonów F2–F4 (następca BU) — Szkoła Pokera
Koordynator: session_01T66VBzJJVF7UGtLwjYvqQx (raporty i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt).

1. Rola: 08-programista w trybie build. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-ca-format` @ 6a5ca17 (= koniec BU; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md, sprawdź przed pierwszym commitem.
3. Kontekst: przeczytaj `docs/programista/stan-bu.md`, `docs/programista/e0-bu.md`, polecenie BU (`git show origin/koordynacja:docs/koordynacja/polecenia/BU.md`), szkice `docs/tresci/szablony-robocze/README.md` (tabela F1–F6). BU zrobiła F1, F5, F6, KO-050 (tabela scenarios), KO-051 (gotowa ręka, ŚR-203). Równolegle sesja BZ recenzuje 6a5ca17 — jej poprawki mogą przyjść później jako osobne zadanie.
4. Zadania (każde: test czerwony przed kodem, zielony po, osobny commit):
   1. F2 `cbet-case` (flop wg TextureFilter + filtr ręki `holding`; ocena z `cases` reguły, wzór grading.ts:363).
   2. F3 rozmiar jako akcja (`three-bet-size`, `open-size`, `no-limp`; wzór grading.ts `sizeCandidate`/`near`).
   3. F4 `icm-call` (equity z kart + `ICM_STRUCTURES`, `icmEquities`).
   4. Fixture F2–F4 w `tools/content-build/test/fixtures/`; `GeneratorContext` przekazywany w `packages/domena/src/wariant.ts` (otwarte z BU).
   5. `pnpm content:build` i `pnpm run ci` kod 0, dowód `docs/programista/dowody/ca-ci-<sha>.txt`; stan w `docs/programista/stan-ca.md`.
5. Zakazy: bez zmian w `content/` (treść należy do 06) i w `apps/mobile/` poza plikami generowanymi; nie scalasz; nie tworzysz/archiwizujesz sesji; nie piszesz na `koordynacja`; bez --no-verify, force-push, AskUserQuestion; STOP-y roli i punkt czyszczenia → raport do koordynatora.
6. Decyzje: techniczne — najpierw analogia z Treningu (`repo:plik:linia`), inaczej rekomendacja; do weta. Pula **D-695…D-709**, zapis w `docs/decyzje/CA.md` (KO-054), nie w `docs/decyzje.md`.
7. Kontekst: od 30% kończysz krok, stan, push, PRZEKAZANIE. **Własny % kontekstu licz z rozmiaru rozmowy, nie szacuj na oko (BU zgłosiła 80% przy rzeczywistych 30%).**
8. Raporty ≤ 10 linii przez send_message: po F2 czas i szacunek reszty; PYTANIE z opcjami i rekomendacją; PRZEKAZANIE (SHA, ci, decyzje, koszt, otwarte).
