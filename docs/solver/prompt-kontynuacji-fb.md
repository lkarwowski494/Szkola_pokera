# Prompt kontynuacji: sesja FB2 (solver postflop, plan B)

Rola 08-programista, tryb build (prompt roli: `node tools/assemble.mjs 08-programista --tryb build`, w chmurze dostarcza go koordynator). Zalecana sesja: opus, wysiłek high.

1. Start z gałęzi `sesja-fb-solver` od HEAD podanego w PRZEKAZANIU. Instalacja: `pnpm install --frozen-lockfile`. Tożsamość commitów według `CLAUDE.md`.
2. Zakres zmian bez zmian względem polecenia FB:
   - wolno zmieniać tylko `tools/preflop-solver/**`, `docs/solver/**` i `docs/decyzje/FB.md` (numery D-1332…D-1339);
   - bez `content/` i `numbers.yaml`;
   - bez scalania, bez force-pusha i `--no-verify`, bez pytań do właściciela.
3. Najpierw przeczytaj w całości:
   - `docs/solver/stan-fb.md`;
   - `docs/solver/plan-b-etapy.md` (to jest specyfikacja);
   - `docs/solver/plan-postflop.md`;
   - `docs/solver/rozpoznanie-2026-11-12.md`;
   - `docs/solver/diagnoza-bb-2026-11-12.md`.
4. Decyzja właściciela KO-088: plan B (pełny flop, W2 na 105 stołach BeyondGTO). KO-084: do treści aplikacji tylko wyniki po walidacji.
5. Kolejność: etapy B0 → B7. Na STOP w B5 i przy decyzji „105 stołów czy próbka” wyślij PYTANIE do koordynatora.
   - Testy przed kodem: W1 najpierw czerwone.
   - `pnpm run ci` z kodem 0 przed każdym pushem kodu; dowód w `docs/solver/dowody/`.
   - Obliczenia dłuższe niż 2 h prowadź w odcinkach z punktem kontrolnym.
6. Raporty i PRZEKAZANIE wysyłaj przez send_message do koordynatora z `origin/koordynacja:docs/koordynacja/stan.md` (wiersz „Koordynator aktywny”).
   - Raport po każdym etapie, najwyżej 10 linii.
   - Od 30% okna kontekstu: zapisz stan w `docs/solver/stan-fb.md`, wypchnij i wyślij PRZEKAZANIE.
