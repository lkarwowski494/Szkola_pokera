# Recenzja FI (rola 08 audit) — `git diff 262e8af0 origin/sesja-fi-fix` (HEAD fcb5a9dd)

Werdykt: **PRZYJĄĆ Z UWAGAMI**. KRYT 0 · WYS 0 · ŚR 0 · NIS 4.

## Sprawdzone zadania

**(0) `tools/content-build/test/ef-margines-ko076.test.ts`** — poprawne. `margines(spotId, expected, hc)` to czysta funkcja argumentów i stałych modułu (`spots`, `eq`, `e`, `HAND_CLASSES` liczone raz przy imporcie); klucz `spot|akcja|klasa` obejmuje wszystkie argumenty, a separator `|` nie występuje w id spotu, etykiecie „raise 2.5” ani w nazwie klasy. Cache zwraca więc tę samą wartość co `marginesWprost`. `LOSOWANIA = 10_000`, ziarna `s+1`, asercje (`min < MIN`, `filter(m < MIN) == []`) i limit czasu bez zmian. Wspólna pamięć między testami 1 i 2 nie zmienia semantyki, bo margines nie zależy od szablonu (`equityMarginMin` wpływa tylko na losowanie w generatorze, nie na wyrocznię). Wyrocznia pozostaje niezależna od generatora. Pomiar: test 1 812 ms, test 2 850 ms (wcześniej według dowodu 2,7 s); zgodne z `fi-pomiar.txt`.

**(1) `packages/poker-core/test/fc-fa001-czyste-outy-wektory.test.ts:47`** — test łapie mutanta. Mutant (`scenario-gen.ts:598`: usunięte `|| ![...wygrywajace].every(...)`) daje `1 failed | 5 passed`, `AssertionError: expected Set{4,6,7,24,26,27,36,38} to be null`; bez mutanta 6/6. Test sprawdza też sam wektor niezależną pełną talią (równa liczność, różne zbiory), więc nie przejdzie po cichu, jeśli wektor przestanie spełniać warunek.

**(2) `tools/content-build/src/blad.ts`, `build.ts:752`, `scenariusze.ts:193,364`** — poprawne. W `src/` nie zostało żadne `as Error`.

**(3) `fg-river-catch-ekran.test.tsx:42`, `fg-defend-ekran.test.tsx:44`** — testy łapią mutanta. Mutant M5 (`wariant.ts:70`: `poprawnaAkcja` zwraca 'call' dla river-catch/defend) daje `2 failed, 18 passed`, czyli pada pierwszy test w każdym z obu plików. `POZIOM_AKCJI` jest użyte w river-catch.

**(4) `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:59-60`** — przy poprawnym przebiegu `throw` jest nieosiągalne: `akcjePunktu('turn-bet')` = `['bet-small','bet-big']` (`wariant.ts:56`), `p.correct` to jedna z tych dwóch akcji, `betSmall`/`betBig: number` są wymagane w typie (`scenario-gen.ts:345`), a `kwotaAkcji` dla nich nie zwraca null (`wariant.ts:114`). Wyjątek opisuje NIS-1.

## Znaleziska

**NIS-1 — `throw` osiągalne przy niespójnym stanie odtworzonym z bazy** (`aktywnoscScenariusza.ts:72-77`, `EkranScenariusza.tsx:182`).
Przy odtwarzaniu sesji `parsujWybor` sprawdza tylko `jestAkcja`, a nie zgodność wyboru z `akcjePunktu` danego punktu. `wpisyDziennika` wywołuje `tekstAkcji` dla każdego zapisanego wyboru niezależnie od `przebieg.ok`. Zapisany wybór spoza {bet-small, bet-big} na kroku turn-bet (na przykład plan bez `odcisk` sprzed NIS-004 CM i zmieniona treść, albo uszkodzony wiersz) prowadzi więc do wyjątku w renderze i do `GranicaBledu`. Przed zmianą ten przypadek dawał „Zakład 0bb”. Prawdopodobieństwo jest bardzo niskie: nowe plany mają odcisk (`aktywnoscScenariusza.ts:102`), a poza właścicielem nie ma użytkowników. Ten sam wzorzec już istnieje dla `hand-a`/`hand-b` (`wariant.ts:92` rzuca). Rekomendacja na backlog: przy odtwarzaniu odrzucić sesję (`wartosc: null`), gdy `!akcjePunktu(punkt).includes(wybor)`. Taki filtr usuwa całą klasę tych wyjątków, nie tylko turn-bet.

**NIS-2 — kontrola regresji jest wąska** (`fi-nis003-komunikat-bledu.test.ts:19`).
Regex łapie tylko `(e|err|error) as Error)`. Nie wykryje `(ex as Error)`, `(e as any).message` ani plików w podkatalogach (`readdirSync` nie przeszukuje rekurencyjnie; dziś `src/` nie ma podkatalogów). Wystarczy dla obecnego stanu. Rozważyć `/\bas Error\b/` z wyjątkiem `blad.ts` albo regułę ESLint.

**NIS-3 — kosmetyka** (`build.ts:2`, `build.ts:106`).
Import lokalny `./blad` wstawiony między importy `node:`. `const fmt = komunikatBledu` to alias zamiast podmiany dwóch wywołań `fmt(`. Bez wpływu na działanie.

**NIS-4 — drobne nieścisłości w dokumentach** (`docs/decyzje.md`, `docs/programista/dowody/fi-fh-sr002.txt:5`).
- D-1391 podaje `EkranScenariusza.tsx:59`, a `throw` jest w linii 60 (w linii 59 jest `const bb`).
- D-1392 podaje `scenariusze.ts:363`, a właściwa linia to 364.
- Ostatnia linia `fi-fh-sr002.txt` („usunięty martwy symbol — brak”) jest niejasna.
- Test defend używa krotek inline zamiast `POZIOM_AKCJI`. To niespójność stylu, nie błąd.

Poza tym D-1390–D-1392 są zgodne z kodem: limit i liczba losowań bez zmian, `throw` zamiast `?? 0`, `komunikatBledu` w obu miejscach plus kontrola w teście.

## Sekrety
Brak: przejrzano diff pod kątem token/secret/password/klucz/e-mail; pliki dowodów zawierają tylko wyniki testów.

## Uruchomione testy (worktree fcb5a9dd, `pnpm install --frozen-lockfile --ignore-scripts`)
- content-build: `ef-margines-ko076.test.ts` i `fi-nis003-komunikat-bledu.test.ts`: 7/7 zielone (ef: 812 ms i 850 ms).
- poker-core: `fc-fa001-czyste-outy-wektory.test.ts`: 6/6 zielone; z mutantem „tylko liczność”: 1 failed.
- mobile (jest): `fg-defend-ekran`, `fg-river-catch-ekran`, `fg-turn-bet-ekran`: 31/31 zielone; z mutantem M5: 2 failed / 18 passed.
- Mutanty przywrócone; `git status` w worktree czysty.
