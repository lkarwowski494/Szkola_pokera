# Sesja HT: poprawki silnika po recenzjach HR i HS (08 fix) — Szkoła Pokera
Koordynator: session_01T66VBwf1bNLY6pRHh6Xc12 (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID). Gałąź stanu koordynatora: koordynacja (tylko do odczytu).

1. Rola: 08-programista w trybie fix. Prompt roli jest w twoich pierwszych wiadomościach po linii `=== PROMPT ROLI ===` (kilka części); zacznij dopiero po ostatniej. Biblioteki prompts nie dołączasz.
2. Start: gałąź `claude/sesja-ht-poprawki` @ e270da14 (HO 9677c41c + docs recenzji HR i HS; już wypchnięta — pracuj na niej). `pnpm install --frozen-lockfile`. Tożsamość commitów wg CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>).
3. Zadania (wejście: `docs/programista/recenzje/recenzja-hr-ho.md`, `docs/tresci/recenzje/recenzja-hs.md`; każda poprawka red-first: test odtwarzający najpierw czerwony, potem zielony):
   1. HR-001 (P1) geo-size bet-small w ocenaAkcji (`wariant.ts:214`) i HR-002 (P1) turn-action check (`wariant.ts:212`): ocena zgodna ze szkicami HP po recenzji HS (SC-27 bet-small = inaccuracy, SC-18 check = acceptable) — KO-112.
   2. HS D-1750 (zastępuje D-1705): filtr „brak strita na turnie” = `straightPossible` na 4 kartach (3 rangi w oknie 5), `scenario-gen.ts:1035`; test z przykładem J85+T.
   3. HS 06-tresci-301 (P1): SC-20 — generator ma dawać turn zgodny z tekstem „dwie karty w jednym kolorze” (dokładnie 2, nie 3); pomiar 60 rozdań przed i po w dowodzie.
   4. HR-004 (P2): mutanty M3 (spr-call druga para) i M9 (kluczeRozmiaru geo-size) mają ginąć — dopisz testy. HR-005 (P2): cbet check-raise wiązany z `cbet.size.small`. HR-006 (P2): `{{w:spr}}` formatowanie wg języka (nie `toFixed` z kropką). HR-007 (P2): numer D-1715 użyty dwa razy (HO i HP) — przenumeruj wpis HO z odnośnikiem. HR-003 (P2): wyrocznia KO-111 bez importu `strength` z silnika (własna ocena układu).
   5. Po zmianach generatora: `pnpm content:build`, przelicz `tools/content-build/test/generator-odciski.json` raz (GENERATOR_ODCISKI_ZAPISZ=1) i w raporcie diff kluczy z powodem każdej zmiany. Nie zmieniaj plików w `content/` (to sesja HU równolegle) — jeśli poprawka wymaga zmiany treści, zgłoś PYTANIE.
   6. `pnpm run ci` kod 0, dowód `docs/programista/dowody/ht-ci-<sha>.txt`.
4. Zakazy: nie scalasz do integracji ani `main`, nie tworzysz i nie archiwizujesz sesji, nie piszesz na gałąź `koordynacja`, nie zmieniasz workflowów, nigdy --no-verify ani force-push, nie pytasz właściciela. Nie dodajesz rodzajów do RODZAJE_NA_EKRANIE (D-1704).
5. Decyzje: tryb analogia (lkarwowski494/trening, `repo:plik:linia`, do weta). Pula D-1760…D-1769, `docs/decyzje/HT.md`.
6. Koszt: pułap 8 USD; próg STOP 10,4 USD. Stan w `docs/programista/plan-ht.md`.
7. Push: na `claude/sesja-ht-poprawki`.
8. Raporty (≤ 10 linii, send_message): po starcie liczba linii „# ” i „#” w prompcie roli; PYTANIE; PRZEKAZANIE (SHA, poprawki z testami, ci, odciski, decyzje do weta, otwarte).
