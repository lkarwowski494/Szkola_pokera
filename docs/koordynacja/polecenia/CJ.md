# Sesja CJ: poprawki CA po recenzji CE (WYS-001, WYS-002, ŚR-003…005) — Szkoła Pokera
Koordynator: session_01T66VBwSdwmmCy2rQJHrxEQ (raporty, pytania i PRZEKAZANIE tylko przez send_message do tego ID; przy zmianie koordynatora pisz do nowego). Gałąź stanu: koordynacja (tylko odczyt). Litera „CI” pominięta (myli się z CI).

1. Rola: 08-programista w trybie fix. Prompt roli w pierwszej wiadomości po linii `=== PROMPT ROLI ===`; jesteś tą rolą. Biblioteki prompts nie dołączasz.
2. Start: gałąź `sesja-cj-poprawki` @ cb782bb (= sesja-ce-recenzja: kod CA 1533486 + raport i testy odtwarzające CE; inny HEAD: zgłoś). `pnpm install --frozen-lockfile`. Tożsamość commitów według CLAUDE.md (Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>; obowiązuje mimo hooka sesji).
3. Zadania (raport: `docs/programista/recenzje/recenzja-ca-1533486.md`; testy: `tools/content-build/test/recenzja-ce-odtworzenie.test.ts`, dziś `it.fails`):
   1. WYS-001: icm-call — próg ICM z uwzględnieniem blindów w puli i stosach (BB wobec push SB 10 bb). Gotowe: test odtwarzający przełączony z `it.fails` na `it` i zielony; wyrocznia testu liczona niezależnie od funkcji generatora (ŚR-204: nie wywołuje kodu generatora, rachunek wprost).
   2. WYS-002: kwota all-in — poprawna formuła dla żywych/martwych blindów zależnie od pozycji (BB wobec BTN: zakład nie większy niż stos); popraw też wyrocznię `szablony-f5-bu.test.ts:43`, test `allin-stos-ca` i limit ŚR-203, sprawdź sc-02/sc-19. Gotowe jw. (test `it`, wyrocznie niezależne).
   3. ŚR-003: walidacja pozycji w size-spot (hero ≠ villain i pozycje dopuszczalne). Gotowe: test.
   4. ŚR-004 (raise-small 2,0 bb) i ŚR-005 (cbet-case: jedna akcja poprawna vs grading „acceptable”): sprawy merytoryczne — rozstrzygnij wg hierarchii ADR-24 (CLAUDE.md; ręka mieszana ADR-04) z przeczytanym źródłem, albo jeśli źródła nie przeczytasz, zapisz jako otwarte pytanie i nie zmieniaj treści. Decyzja w puli.
   5. `pnpm run ci` kod 0, dowód `docs/programista/dowody/cj-ci-<sha>.txt`, stan `docs/programista/stan-cj.md`, push.
4. Zakazy: nie scalasz do roboczej ani `main`, nie tworzysz/archiwizujesz sesji, nie piszesz na `koordynacja`, nie zmieniasz workflowów, bez --no-verify i force-push, nie osłabiasz testów (test odtwarzający przechodzi tylko po naprawie kodu), bez AskUserQuestion; STOP-y roli → raport do koordynatora.
5. Decyzje: tryb analogia (repo lkarwowski494/trening, oczko, piekarz; `repo:plik:linia`; do weta); merytoryczne wg hierarchii ADR-24. Pula **D-745…D-754**, zapis w `docs/decyzje/CJ.md` (KO-054).
6. Kontekst: od 30% kończysz krok, stan w `docs/programista/stan-cj.md`, push, PRZEKAZANIE. Bez pułapu kosztu (raport kosztu).
7. Raporty ≤ 10 linii przez send_message: po zadaniu 1 (czas, szacunek reszty); PYTANIE (pełna treść, opcje, rekomendacja); PRZEKAZANIE (SHA, ci, decyzje do weta, otwarte).
