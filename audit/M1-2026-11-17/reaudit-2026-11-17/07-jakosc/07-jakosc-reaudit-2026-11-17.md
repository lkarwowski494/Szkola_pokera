# Reaudyt: Jakość (strategia testów, gotowość wydania) — Szkoła Pokera — 2026-11-17
Commit: 196cb8c2b062e46e0f90aaee062fff24fc06f729 · Gałąź: claude/sesja-ir-reaudit-m1 (= claude/sesja-is-naprawy-p1 + pliki reaudytu) · Baza: 0e7e5e00d97271f7dd3b5ee0caf5c8a833999dee · Tryb: reaudit, pętla 1 (M1, z polecenia) · Środowisko: Linux (kontener), Node, git, pnpm i `node --test` działają; MCP GitHub tylko dla repo projektu (API `pnpm/action-setup` odmówione, odczyt tagu protokołem git); bez macOS/Xcode (E2E iOS i protokół F nieuruchamialne tutaj).

## Werdykt: GOTOWE Z ZASTRZEŻENIAMI
Commit: 196cb8c2 · Kandydat do wydania: nieustalony (build 1012 jeszcze nie przygotowany; kod aplikacji = 196cb8c2) · Rozstrzygnął warunek: „brak otwartych P0 i P1, ale »Nie sprawdzono« … ma pozycje” · Próg projektu: „wydanie blokują tylko znaleziska KRYTYCZNE i WYSOKIE” (CLAUDE.md, „Audyty i wydania” pkt 1).

Werdykt dotyczy zakresu tego reaudytu (047, M2-003, 9 workflowów, próbka JAK-19). Raportów innych ról reaudytu nie czytałem (polecenie), więc ich otwarte P0/P1 nie są tu policzone; werdykt łączny składa koordynator.

## Podsumowanie
Naprawa M1-audytor-generalny-047 jest zweryfikowana: wszystkie 15 użyć akcji spoza `actions/*` (wyłącznie `pnpm/action-setup`) są przypięte do pełnego SHA fc06bc1257f339d1d5d8b3a19a8cae5388b55320, który jest commitem tagu v5.0.0 (odczyt 2026-11-17), test projektu wymaga SHA i pada na tagu oraz na skróconym SHA (2 mutanty zabite), a przypięta akcja przeszła w CI #534. Diff 9 workflowów zawiera wyłącznie te 15 zamian linii. M2-koordynator-napraw-003 oceniam jako P2, nieblokujące; Trening nie ma mechanizmu aktualizacji akcji, więc rekomendacja M2 (a) byłaby odstępstwem do nazwania. JAK-19: bramka statyczna zielona na 196cb8c2; protokół F 1011 nadal otwarty (10 pozycji, krok właściciela, bez zmian od audytu M1), E2E iOS na gałęzi napraw nie biegło (projektowo, D-1620).

| ID w planie napraw | ID roli 07 | Poziom | Wynik | Blokuje 1012 / App Store | Dowód |
|---|---|---|---|---|---|
| M1-audytor-generalny-047 | 07-jakosc-004 | P2 | zweryfikowane | nie / nie | dowody/pnpm-action-setup-tag.txt, dowody/workflowy-test-196cb8c2.txt, dowody/workflowy-mutacje.txt, dowody/ci-github-galaz-napraw.txt |
| M2-koordynator-napraw-003 | — (JAK-10) | P2 | istniało wcześniej (otwarte, backlog) | nie / nie | dowody/trening-aktualizacja-akcji.txt |
| 9 workflowów (diff od bazy) | — | — | zweryfikowane: tylko przypięcie | — | dowody/workflowy-diff.txt |
| JAK-19 (próbka regresji) | — | — | bramka statyczna zielona; protokół F 1011 otwarty (krok właściciela, nie znalezisko) | protokół F 1011: tak, warunek buildu 1012 / tak | dowody/scenariusze-196cb8c2.txt, dowody/protokol-F-1011.txt |

Nowych znalezisk: 0. Regresji: 0.

## Komendy (każda osobno)
| Komenda | Kod wyjścia | Wynik (liczby) | Uwagi |
|---|---|---|---|
| `git status --porcelain` (start) | 0 | `?? audit/M1-2026-11-17/reaudit-2026-11-17/` | pliki śledzone nietknięte |
| `git rev-parse HEAD` | 0 | 196cb8c2b062e46e0f90aaee062fff24fc06f729 | gałąź claude/sesja-ir-reaudit-m1; kod aplikacji zgodny z poleceniem |
| `git diff 0e7e5e00..196cb8c2 -- .github/workflows` | 0 | 9 plików, 15+/15−; 0 linii poza zamianą `@v5` → `@fc06bc12… # v5.0.0` | dowody/workflowy-diff.txt; jedyny commit 5abf3534 |
| `git ls-remote https://github.com/pnpm/action-setup 'refs/tags/v5*'` | 0 | `refs/tags/v5.0.0^{}` = `refs/tags/v5^{}` = fc06bc1257f339d1d5d8b3a19a8cae5388b55320 | 2026-11-17 15:28 UTC; tag adnotowany b3074757, tagger 2026-03-17 |
| `git fetch --depth 1 … refs/tags/v5.0.0` + `git cat-file -p b3074757` | 0 | `object fc06bc12…`, `tag v5.0.0` | dowody/pnpm-action-setup-tag.txt; API GitHub (MCP `get_tag`, curl) odmówione dla repo spoza sesji |
| `env -u NODE_PATH node --test tests/narzedzia/workflowy.test.mjs` | 0 | 31/31 pass | dowody/workflowy-test-196cb8c2.txt |
| ten sam test na kopii z `testflight.yml` → `@v5` | 1 | 30 pass, 1 fail („testflight.yml: pnpm/action-setup@v5”) | git worktree w scratchpadzie; dowody/workflowy-mutacje.txt |
| ten sam test na kopii z `nocny.yml` → `@fc06bc1` (skrócony SHA) | 1 | 30 pass, 1 fail | dowody/workflowy-mutacje.txt |
| `env -u NODE_PATH pnpm scenariusze` (= `--statycznie`) | 0 | PU 28 (F 10), funkcje 19, ekrany 15, BRAMKA ZIELONA | dowody/scenariusze-196cb8c2.txt |
| `env -u NODE_PATH node scripts/sprawdz-scenariusze.mjs --protokol 1011` | 1 | 10 pozycji F bez wyniku („—”) | dowody/protokol-F-1011.txt; tak samo jak w audycie M1 |
| MCP `actions_list` (CI gałęzi napraw, perPage 5) | — | #534 success na a59d0e1b (kod aplikacji = 196cb8c2); #535 na 196cb8c2: patrz niżej | dowody/ci-github-galaz-napraw.txt |
| MCP `actions_list` e2e-ios.yml, gałąź napraw | — | 0 przebiegów | projektowo: `.github/workflows/e2e-ios.yml:25` |
| `pnpm run ci` | nie uruchamiano | IS: kod 0 na 5f34458a (raport M2, „Komendy końcowe”) | zakaz z polecenia |

## Weryfikacja ID

### M1-audytor-generalny-047 (07-jakosc-004) — zweryfikowane
- Wszystkie `uses:` spoza `actions/*` w `.github/` na 196cb8c2: 15 × `pnpm/action-setup@fc06bc1257f339d1d5d8b3a19a8cae5388b55320 # v5.0.0` plus wywołanie lokalne `./.github/workflows/e2e-ios.yml` (nocny.yml); w `.github/` jest tylko katalog `workflows` (brak akcji złożonych). Przykłady w zadaniach z sekretami: `.github/workflows/testflight.yml:101` (klucz ASC w `.github/workflows/testflight.yml:98`) i `.github/workflows/przeklad-tlumaczen.yml:62` (sekret w `.github/workflows/przeklad-tlumaczen.yml:82`).
- SHA = commit tagu v5.0.0: `git ls-remote` i obiekt tagu b3074757 („object fc06bc12…, tag v5.0.0”), odczyt 2026-11-17 15:28–15:29 UTC; commit fc06bc12 z 2026-03-13 „feat!: run the action on Node.js 24 (#205)”. Tag `v5` wskazuje dziś ten sam commit, więc przypięcie nie zmieniło wykonywanego kodu akcji.
- Test: `tests/narzedzia/workflowy.test.mjs:32` „akcje actions/* przypięte do wersji głównej albo SHA, pozostałe do pełnego SHA”; wyrażenie w `tests/narzedzia/workflowy.test.mjs:34` dopuszcza dla akcji spoza `actions/*` tylko `@[0-9a-f]{40}`. Test w łańcuchu `pnpm run ci` (`test:skrypty` w package.json). Potrafi paść: 2 z 2 mutantów zabite. Test czyta tylko `*.yml`; plików `*.yaml` w `.github/workflows` brak (ograniczenie bez skutku dziś).
- CI: w przebiegu #534 krok „Run pnpm/action-setup@fc06bc12…” zakończony sukcesem w 4 zadaniach.
- Poziom P2 (JAK-10: „P2 dla nieprzypiętych akcji”); nie blokował i nie blokuje ani 1012, ani App Store.

### M2-koordynator-napraw-003 — ocena progiem: P2, nie blokuje
- Opis M2: `audit/M1-2026-11-17/M2-koordynator-napraw-2026-11-17.md:69` „Akcje przypięte do SHA nie mają mechanizmu aktualizacji”. Potwierdzam stan: w `.github/` tylko `workflows`, bez `dependabot.yml` ani konfiguracji Renovate.
- Wynik: istniało wcześniej w sensie braku mechanizmu (w 0e7e5e00 też go nie było; przypięcie tylko przenosi aktualizację z automatu GitHuba na człowieka). Skutek: poprawka bezpieczeństwa w `pnpm/action-setup` nie trafi sama do CI — ryzyko utrzymaniowe, nie defekt dla użytkownika aplikacji; żadna kategoria z CLAUDE.md „Audyty i wydania” pkt 1 (sekrety są lepiej chronione niż przed naprawą). P2, rodzaj P, realność brzegowa. Blokuje 1012: nie. Blokuje App Store: nie.
- Analogia z Treningiem (D-191; `lkarwowski494/trening` @ 2d975814, odczyt 2026-11-17): `.github` zawiera tylko `workflows`, brak `dependabot.yml`/Renovate; jedyne użycie spoza `actions/*` przypięte do SHA bez automatu aktualizacji (`.github/workflows/asc-kontrola.yml` w Treningu, wiersz 21, wywołanie workflowu `apps4brew-narzedzia` @43afe81a). Rozwiązanie analogiczne to M2 opcja (b) ręczny przegląd przy audycie; opcja (a) dependabot byłaby odstępstwem od Treningu do nazwania z powodem. Decyzja produktowo-procesowa dla właściciela/koordynatora, do backlogu po 1012 (jak zapisał M2).

### Zmienione workflowy (9 plików) — zweryfikowane
`git diff -U0` od bazy: 15 linii usuniętych `- uses: pnpm/action-setup@v5` i 15 dodanych z SHA; 0 innych zmian (triggery, uprawnienia, sekrety, kroki, `timeout-minutes` bez zmian). Pliki: ci (5), nocny (2), store-screenshots (2), e2e-ios, iphone-eas, iphone-local, przeglad-tlumaczen, przeklad-tlumaczen, testflight (po 1).

### Próbka regresji: JAK-19
- Bramka statyczna na 196cb8c2: kod 0, „BRAMKA ZIELONA” (PU 28, F 10, funkcje 19, ekrany 15) — bez regresji względem audytu M1 (zmiana M2-001 w `RangeGrid` nie dodaje ekranu ani funkcji).
- Protokół F 1011 (`docs/jakosc/test-fizyczny/1011.md`): 10 pozycji „—” (PU-014…PU-020, PU-022, PU-027, PU-028); plik niezmieniony od cba97b01. Krok właściciela, nie znalezisko (jak w audycie M1, zastrzeżenie 2). Bramka buildu 1012 w `testflight.yml` pozostaje czerwona do wpisania wyników: blokuje 1012 i App Store jako warunek, nie jako ID.
- CI na GitHubie: ostatni zakończony przebieg gałęzi napraw #534 (a59d0e1b, kod aplikacji identyczny z 196cb8c2) success; #535 na 196cb8c2 — stan w „Nie sprawdzono”.
- E2E iOS: 0 przebiegów na gałęzi napraw (`.github/workflows/e2e-ios.yml:25` ogranicza push do `main` i gałęzi roboczej; D-1620). Kod aplikacji zmienił się od f75acdff (RangeGrid, baza treści), więc E2E z audytu M1 (na f75acdff) nie dowodzi kandydata.

## Nie sprawdzono
| Co | Dlaczego (środowisko) | Krok i kto | Wpływ na werdykt |
|---|---|---|---|
| Wynik CI #535 na 196cb8c2 | w toku w chwili odczytu (patrz dowody/ci-github-galaz-napraw.txt) | koordynator: `actions_list` przed scaleniem; oczekiwane success jak #534 | zastrzeżenie; czerwony = ZABLOKOWANE |
| E2E iOS na SHA kandydata 1012 | brak macOS; gałąź sesji bez E2E z założenia | agent wydania: `workflow_dispatch` e2e-ios.yml na SHA kandydata (runner macOS, koszt minut — uprzedzić właściciela) | warunek wysyłki 1012 (JAK-16) |
| Protokół F 1011 | wymaga telefonu z TestFlight | właściciel: lista 1–10 w `docs/jakosc/test-fizyczny/README.md` | warunek buildu 1012 |
| Aktualizacja 1011 → 1012 z danymi | brak telefonu | właściciel (kroki w raporcie M1 roli 07, „Nie sprawdzono”) | warunek wysyłki (dane) |
| Odczyt tagu przez API/stronę GitHub | MCP i curl API: repo `pnpm/action-setup` niedostępne w tej sesji | zastąpione odczytem protokołem git (ten sam serwer github.com) | brak |
| Raporty innych ról reaudytu | wyłączone poleceniem | koordynator | werdykt łączny u koordynatora |

## Kontrola dowodów i sekretów
`node /home/user/Szkola_pokera/audit/M1-2026-11-17/narzedzia/sprawdz-raport.mjs <ten raport> /home/user/Szkola_pokera /home/user/Szkola_pokera/audit/M1-2026-11-17/reaudit-2026-11-17/07-jakosc --rola 07-jakosc` → kod 0, „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 07-jakosc”

## git status --porcelain (koniec)
` M audit/M1-2026-11-17/reaudit-2026-11-17/07-jakosc/dowody/ci-github-galaz-napraw.txt` `?? audit/M1-2026-11-17/reaudit-2026-11-17/07-jakosc/07-jakosc-reaudit-2026-11-17.md`. W trakcie pracy koordynator IR dodał na gałęzi commity 4360eee5…caef53d2 („migawka ról w toku”, tylko `audit/` i `docs/decyzje/IR.md`; `git diff --quiet 196cb8c2..HEAD -- apps packages tools content .github tests scripts package.json` → kod 0), które objęły moje wcześniejsze pliki dowodów; stąd ` M` przy pliku dowodu dopisanym po migawce. Ja nie commitowałem, plików poza swoim katalogiem nie zmieniałem; worktree w scratchpadzie usunięty.
