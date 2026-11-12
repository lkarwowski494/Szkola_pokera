# Prompt kontynuacji: sesja FB3 (solver postflop, opcja B: diagnoza i nowy przesiew)

Rola 08-programista, tryb build. Prompt roli w chmurze dostarcza koordynator; lokalnie: `node tools/assemble.mjs 08-programista --tryb build`. Zalecana sesja: opus, wysiłek high.

1. **Start.** Gałąź `sesja-fb-solver` od HEAD podanego w PRZEKAZANIU FB2. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według `CLAUDE.md`. Do kodu C potrzebny jest gcc z OpenMP.
2. **Zakres** (bez zmian wobec FB/FB2):
   - wolno zmieniać tylko `tools/preflop-solver/**`, `docs/solver/**` i `docs/decyzje/FB.md`; numery decyzji z puli D-1400…D-1409;
   - nie ruszasz `content/` ani `numbers.yaml`;
   - bez scalania, bez force-pusha, bez `--no-verify`, bez pytań do właściciela.
3. **Najpierw przeczytaj w całości:**
   - `docs/solver/stan-fb.md`;
   - `docs/solver/plan-b5-diagnoza.md` (specyfikacja, reguła D-1335 zapisana przed pomiarem);
   - `docs/solver/w2-przesiew.md`;
   - `docs/solver/w2-cel.md`;
   - `docs/solver/plan-b-etapy.md`;
   - `docs/decyzje/FB.md`.
4. **Decyzje właściciela:**
   - KO-090: opcja B, diagnoza i nowy przesiew (rozszerza KO-088);
   - KO-084: do treści aplikacji trafiają tylko wyniki po walidacji.
5. **Kolejność: D0 → D1 → D2** (`plan-b5-diagnoza.md` pkt 2).
   - Model kandydujący i stoły odłożone są ustalone (D-1335). Ich zmiana po zobaczeniu wyników to dopasowanie pod wynik, więc jest zakazana.
   - Testy przed kodem: najpierw czerwone, z właściwego powodu.
   - Uwaga na `test/limity.test.ts`: linia zakończona `}, LICZBA);` jest traktowana jak limit czasu. Liczbę iteracji trzymaj w stałej. Ciężkie testy dostają `LIMIT_CIEZKI_MS`.
   - Testy różnicowe C = TS uruchamiaj na wariancie `real: 'double'`.
   - `pnpm run ci` musi zakończyć się kodem 0 przed każdym pushem kodu, a dowód trafia do `docs/solver/dowody/`. CI uruchamiaj, gdy nic innego nie liczy (obliczenia stołów spowalniają testy).
   - Obliczenia dłuższe niż 2 h prowadź w odcinkach. `w2-run.ts` pomija stoły, które mają już wynik.
6. **Po D2:**
   - przeszedł (≥ 5/7): PYTANIE „105 stołów czy próbka 35” (B6);
   - nie przeszedł: STOP i PYTANIE z opcjami A i C ze `stan-fb.md`.
7. **Raporty i PRZEKAZANIE** wysyłaj przez send_message do koordynatora. Jego ID jest w `origin/koordynacja:docs/koordynacja/stan.md`, wiersz „Koordynator aktywny”.
   - Raport po każdym etapie, najwyżej 10 linii, z kosztem.
   - Od 30% okna kontekstu: zapisz stan w `docs/solver/stan-fb.md`, wypchnij zmiany i wyślij PRZEKAZANIE.
