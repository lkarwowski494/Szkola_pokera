# Kontrola poprawek po recenzji: sesja BB, KO-029 / D-510 (`sesja-ba-m5q2`, `02ec8c4..fbb2d15`)

Data: 2026-11-10. Kontroler: świeży kontekst, tylko odczyt i kontrole (worktree `kon-bb` @ fbb2d15, usunięty po kontroli). To nie jest pełna recenzja: sprawdzone, czy Z-1…Z-5 z `recenzja-ba-02ec8c4.md` są naprawione i czy naprawa nie wprowadziła nowego błędu.

## Werdykt

**Scalić.** Z-1…Z-5 naprawione, nowych znalezisk KRYT/WYS brak (KRYT 0 · WYS 0 · ŚR 1 znane, poza diffem · NIS 2).

## Z-1…Z-5

| ID | Status | Dowód (pl, fbb2d15) |
|---|---|---|
| Z-1 (WYS) | naprawione | Przypadek `ranks: [connected, semi-connected]`: `content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:38-40`, `m5-l4-bez-pozycji.md:90-92`, `rules.yaml:360`. Strity i dwie pary występują wyłącznie w zdaniu z kwalifikatorem: „Na flopie {{t:connected\|połączonym}} ma on też strity i dwie pary” (:38, :90), „a na {{t:connected\|połączonym}} ma on też strity i dwie pary” (:40, :92), „na flopie {{t:connected\|połączonym}} ma też strity i dwie pary” (`rules.yaml:360`). Akapit `m5-l3:126`: „Na niskim flopie półpołączonym strita jeszcze nie ma, ale flop i tak trafia ręce z małymi kartami…”. Dla 9-5-2 / 9-7-3 żadne zdanie nie twierdzi, że strit albo dwie pary są w zakresie BB. |
| Z-2 (WYS) | naprawione | „nie masz przewagi nutsów” tylko warunkowo: „…na {{t:connected\|połączonym}} zwykle nie masz przewagi nutsów” (:39, :91); „Na flopie połączonym … więc zwykle nie masz przewagi nutsów” (:38, :90, `rules.yaml:360`). Na flopie półpołączonym tekst nie orzeka o przewadze nutsów, więc nie przeczy cytatowi o 973r („the BTN has a monopoly on all of the overpairs”, potwierdzony `curl`, HTTP 200). Część ogólna („trafia zakres dużego blinda: broni on wielu rąk z małymi kartami, a twoje wysokie karty tu chybiły”) ma źródło w `rules.yaml:363` i D-510; cytat potwierdzony u źródła (niżej). Ten sam artykuł o 973r mówi też: „The preflop caller does pair more often on a 973r flop than the preflop raiser” — zgodne z częścią ogólną. |
| Z-3 (ŚR) | naprawione | „zwykle nie masz” / „Button zwykle nie ma”: `rules.yaml:360`, `rules.yaml:511`, `exams/m5.yaml:22` („więc zwykle najsilniejszych rąk nie masz wyraźnie więcej”), `exams/m6.yaml:94`, `m6-l3-check-raise.md:16,130`, `m5-l3:126` („Zwykle podobnie jest na innych niskich flopach połączonych”). Flop w m5.q2 (8-6-5) bez zmiany — recenzja dawała to jako „rozważyć”. Kategoryczne zostało tylko zdanie o konkretnym 7-6-5 (`m5-l3:126`), gdzie rachunek autora daje BB więcej. |
| Z-4 (ŚR) | naprawione | `rules.yaml:363`: „(https://blog.gtowizard.com/flop-heuristics-ip-c-betting-in-mtts/; inny spot: BTN vs SB, 40bb; na flopach połączonych „the raiser generally does not have a nuts advantage”; uproszczenie: przeniesione kierunkowo na BTN vs BB w grze gotówkowej…)”; dopisek w D-510 (`docs/decyzje.md:332`). Przy okazji Z-8: adresy trzech artykułów dopisane. |
| Z-5 (ŚR) | naprawione (inaczej niż sugestia) | `exams/m5.yaml:23`: „Masz tu więcej najsilniejszych rąk, np. KK, bo {{t:big-blind}} większość KK przebija przed flopem.” Zamiast „KK i TT” samo „KK”; powód zapisany w D-510 (odrzucona opcja d: TT zależy od niezwalidowanego składu). `grep "KK i KT\|KK and KT" content/*/exams/m5.yaml` → 0. |

## Źródła (pobrane 2026-11-10 `curl -sL`, HTTP 200 ×4; tekst po zdjęciu znaczników, apostrofy znormalizowane)

| Cytat | Wynik |
|---|---|
| „a large portion of their range consists of low-card holdings because of the preflop discount posed by the blinds.” + „We connect better with high-card boards and get to bet more.” (cash, sekcja „Why Are High Cards Bet More?”, formacja BTN vs BB) | oba zdania dosłownie; w artykule to dwa akapity rozdzielone ilustracją, w `source` zapisane jako ciąg (N-2) |
| „flopped straights often being in the BB's range”; „Size down and bet less on flops that complete straights and flushes in your opponent's range” | dosłownie |
| „the raiser generally does not have a nuts advantage” (MTT; sekcja „Continuation Betting vs the Small Blind”, 40bb) | dosłownie; spot zgodny z dopiskiem |
| „BB's advantage at the top end” (654r) | dosłownie |
| „the BTN has a monopoly on all of the overpairs. Due to the complete lack of possible two pairs and straights on this board, any overpair is essentially the nuts.” (973r) | dosłownie (cytat w D-510 i w otwartym pytaniu) |

Upswing (szczebel 4): bez zmiany w tym zakresie, potwierdzony w poprzedniej recenzji — teraz nie pobierany.

## Skrypt `kontrola-polpolaczone.mjs`

- `node docs/tresci/dowody-bb/kontrola-polpolaczone.mjs` → „12 języków, 156 tekstów, 0 naruszeń”, kod 0. 156 = 12 × (2 lekcje × 2 przypadki z `semi-connected` × 3 teksty + `because` R-M5-004). `kontrola-przed.txt`: 84 linie BŁĄD + podsumowanie.
- Nie jest tautologiczny: dzieli tekst na zdania i wymaga, by zdanie ze znacznikiem `{{t:straight` lub `{{t:nuts-advantage` miało też `{{t:connected` albo `{{t:semi-connected`.
- Mutacja 1 (`m5-l3:39`, usunięty kwalifikator „na {{t:connected|połączonym}}”): „BŁĄD content/pl/lessons/m5-l3-czestotliwosc-rozmiar.md:39 (small)”, 1 naruszenie, kod 1. Cofnięte `git checkout`, `git status` czysty.
- Mutacja 2 (`m5-l3:40`, dopisane „ma tu strity” bez znacznika terminu): 0 naruszeń, kod 0 — skrypt widzi tylko terminy oznaczone znacznikiem (N-3). Cofnięte.

## Zakres diffu i struktura

- `git diff 02ec8c4..fbb2d15 --stat`: 119 plików; poza `content/`, `docs/`, `apps/mobile/assets/content/*` (35 baz, nowy skrót) i `apps/mobile/src/data/content/tresc.generated.ts` — 0 plików.
- Skrypt (diff -U0, 12 języków): w każdym 15 linii dodanych, te same `plik:linia` co pl; `correct: true`, karty `[[…]]`, klucz pola, `id/rule/best` identyczne przed i po oraz z pl → 0 rozbieżności. Linii z `id:` w diffie treści: 0.
- m5.exam.q2: ID, `family`, `rules: [R-M5-004]`, opcja 0 `correct: true` (8-6-5) bez zmian; jedna poprawna odpowiedź.

## Przekłady

- en: 15 linii przeczytanych w całości — sens = pl; „On a {{t:connected}} flop they also have straights and two pair, so you usually don't have a nuts advantage” (l3:38, l4:90), „and on a {{t:connected}} flop you usually don't have…” (:39, :91), „and on a {{t:connected}} flop they also have…” (:40, :92), `rules.yaml:360`; „usually” w 7 miejscach Z-3; „e.g. KK”; przeczenia poprawne.
- de, es, fr, it, pt, pt-BR, vi, ja, ko, zh-Hant: zbiory znaczników `{{…}}` zmienionych linii = pl (poza `rules.yaml:363`, bez znaczników) → 0 rozbieżności. Dodatkowo odczyt linii `small` (:39) we wszystkich 10 i `big` (:40) w de/es/fr/it/ja: kwalifikator „connected” i „zwykle” obecne („auf einem verbundenen … meist keinen”, „en uno conectado normalmente no tienes”, „sur un flop connecté … généralement pas”, 「コネクテッドなフロップでは…たいてい…ありません」).

## Bazy i kontrole (worktree @ fbb2d15)

| Komenda | Kod |
|---|---|
| `pnpm install --frozen-lockfile` | 0 |
| `pnpm content:build` → `git status --porcelain` | 0; 0 linii |
| `pnpm content:check` | 0 |
| `pnpm tresci:rejestr` | 0 („0 błędów, 0 uwag”) |

`docs/tresci/dowody-bb/ci-2026-11-10.log`: nagłówek „pnpm run ci na 0e6d4d53bb…”, koniec „0 błędów, 0 uwag / KOD WYJŚCIA: 0”. HEAD fbb2d15 dokłada do 0e6d4d5 wyłącznie 3 pliki w `docs/tresci/dowody-bb/`.

Autor: `git log --format='%an <%ae>' 02ec8c4..fbb2d15` → 4× `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>`.

## Nowe znaleziska

| ID | Waga | Plik:linia | Opis | Naprawa |
|---|---|---|---|---|
| N-1 | ŚR (poza diffem, znane, zapisane) | `m5-l3:34-35`, `m5-l4:86-87` (`best: check`), `rules.yaml:358-359`, `m5-l3:126` („C-betujesz rzadziej…”) | Dla niskich flopów półpołączonych aplikacja nadal uczy „częściej czekaj”, a jedyne przeczytane źródło szczebla 2 o takim flopie (973r) pokazuje kierunkowo duże bety BTN. Poprawka nie zmienia `then`/`best`; autor zapisał otwarte pytanie (`docs/tresci/e1-m5-m8.md:67`) i odrzuconą opcję (c) w D-510. Nie jest to regresja tej zmiany. | Rozstrzygnąć na opublikowanym wyniku solvera (cash 100bb, BTN vs BB); ocenić przed wydaniem tym samym progiem co inne twierdzenia merytoryczne. |
| N-2 | NIS | `content/pl/rules.yaml:363` (+11 języków), D-510 | Dwa zdania z dwóch akapitów (rozdzielone ilustracją) zapisane jako jeden ciągły cytat. Oba dosłowne, sens niezmieniony. | Rozdzielić „…”; „…” przy okazji. |
| N-3 | NIS | `docs/tresci/dowody-bb/kontrola-polpolaczone.mjs` | Skrypt jest dowodem jednorazowym, nie strażnikiem: nie jest w CI, widzi tylko terminy ze znacznikiem (mutacja 2 przechodzi), a warunek spełnia samo wystąpienie `{{t:connected` w zdaniu (nie sprawdza sensu). | Backlog: ewentualnie test w `tools/content-build`. |

## Niesprawdzone

- Pełne `pnpm run ci` na HEAD (tylko kontrole treści z tabeli; log autora, kod 0, dotyczy 0e6d4d5).
- Sens pozostałych linii w 10 językach poza en (tylko znaczniki i struktura oraz linie `small`/`big` wymienione wyżej); ja/ko/vi/zh-Hant z ograniczoną pewnością.
- Cytat Upswing (nie pobierany ponownie); dokumenty 12 i 13 na Drive; wygląd na telefonie i E2E.
