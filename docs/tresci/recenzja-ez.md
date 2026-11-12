# Recenzja niezależna EZ: treści i wiedza domenowa (06-tresci, audit) — Szkoła Pokera — 2026-11-12
Commit: 7e667066 (`sesja-ev-tresci`), zakres 91573ab6..7e667066 · Gałąź: `sesja-ez-recenzja` · Tryb: audit (bez zmian treści) · Środowisko: Linux w chmurze, Node 22.23.4, pnpm 10.28.0, sieć przez proxy (curl do źródeł działał), bez macOS/Xcode (nie dotyczy tego zakresu).

**Werdykt: PRZYJĘTE Z ZASTRZEŻENIAMI.** D-1285, D-1286 i D-1289 potwierdzone niezależnie. D-1287 przyjęte warunkowo: przed wdrożeniem łatki trzeba zawęzić tekst zadania (06-tresci-001). Nic z zakresu EV nie blokuje wydania. Zmiana w `content/` to tylko R-M8-006 (pl, en). Łatka R-M5-012 nie jest jeszcze w `content/`.

## Podsumowanie
Sprawdziłem cztery decyzje EV, otwierając źródła samodzielnie w dniu recenzji (surowy HTML przez `curl`, cytaty `grep -F`: 14/14 dosłownie, `dowody/ez-zrodla-2026-11-12.txt`). Rachunek EP-003 przeliczyłem osobnym skryptem na ułamkach dokładnych (`dowody/ez-rachunek-ep003.txt`). Wektory autora odtwarzają się bajt w bajt (`dowody/ez-wektory.txt`). Najważniejsze ryzyko leży w łatce, nie w produkcie. Zadanie `m5.l4.c-oop` przypisuje solverowi wynik „w tym układzie” dla otwarcia z CO. Źródło podaje ten wynik dla otwarcia ze środkowej pozycji (przykład: hijack), a CO wspiera tylko kierunkowo. Brak blokerów wydania (próg z `CLAUDE.md`): oba znaleziska to ŚREDNIE/NISKIE.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 06-tresci-001 | P2 (ŚREDNIE) | M | Łatka `m5.l4.c-oop`: „solver w tym układzie czeka całym zakresem” przy pozycji CO, a źródło mówi o środkowej pozycji (HJ) | otwarte (warunek wdrożenia D-1287) |
| 06-tresci-002 | P2 (NISKIE) | M | R-M8-006 pl/en: „podzielą {{t:pot\|puli}}” zamiast ustalonego terminu `split-pot` | otwarte |

## Weryfikacja twierdzeń
Zakres: całość zmian treści 91573ab6..7e667066 (R-M8-006 pl/en, nowe źródła w rejestrze R-M5-012 i R-M8-006, łatka R-M5-012 i `m5.l4.c-oop` pl/en, odczyt N6) · Hierarchia: z `CLAUDE.md` (ADR-24, szczeble 1–5) · Kontrola cytatów: `grep -F` na surowym tekście, 14 cytatów, wszystkie kod 0.

| ID | Zdanie (plik:linia) | Twierdzenie | Źródło otwarte dziś (adres, miejsce) | Cytat | Werdykt | Para zdań | Minimalna poprawka | Znalezisko |
|---|---|---|---|---|---|---|---|---|
| D-1285 / R-M8-006 | `content/pl/rules.yaml:719`, `content/en/rules.yaml:718` | blefujesz rękami, które przy showdownie nie wygrają ani nie podzielą puli | https://blog.gtowizard.com/were-at-the-river-our-hand-cant-win-now-what/ , akapit o AKo/98s | “We may as well use hands that never win at showdown instead, and this way we’re not giving up whatever percentage of the pot we might be winning if we check.” | POPARTE (rachunek: remis = część puli; źródło mówi o “procencie puli”, czyli także o remisie) | `because` (“oddaje tę wygraną”) zgodne | brak; terminologia: 06-tresci-002 | 06-tresci-002 |
| D-1285 wzór SDV | `docs/tresci/narzedzia/rachunki/ev_wektory.py:26-34` | SDV = (W + ½T)/N | rachunek (szczebel 1) | — | POPARTE dla gry dwóch graczy (pick-hand: ręka wobec jednego zakresu); przy remisie wielu graczy udział to 1/k | — | brak (zakres heads-up) | — |
| D-1286 | `docs/tresci/narzedzia/rachunki/ev_wektory.py:40-53` | wariant tylko z czystymi outami; N/46 > cena małego i N/44 < cena dużego | rachunek (szczebel 1) | cena = bet/(pula+2·bet): 1/6 i 3/10 | POPARTE: N/46 < N/44, więc warunek ⇔ obie liczby w (1/6, 3/10); przechodzi N = 8…13 (strit otwarty 8, kolor 9), gutshot 4 odpada | R-M7-006 “ma ok. 19,6%” prawdziwe przy 9/44 = 20,5% (“ok.”) | brak | — |
| D-1287 / R-M5-012 (łatka) | `docs/tresci/szablony-robocze/ev-r-m5-012-check.txt:16` | źródło 3: solver czeka całym zakresem na niskich flopach bez pary (MP vs BTN) | https://upswingpoker.com/podcast/ep24-cbetting-oop/ (03:35) | “The solver checks nine-high and below unpaired flops, which is so many flops that we’re just checking our entire range on” | POPARTE (cytat dosłownie; zakres: “Suppose you raise in middle position and the button calls”) | — | brak | — |
| D-1287 / `m5.l4.c-oop` why.check | `docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch:54` (pl), `:24` (en) | przy otwarciu z CO “solver w tym układzie czeka całym zakresem” | jw., 03:35 i 04:36 | “Even if we look at a disconnected 7-3-2 rainbow for example, the hijack again has only got 47.2% equity.”; “when you’ve raised pre-flop from one of those middle or late positions” | CZĘŚCIOWO: wynik solvera dotyczy HJ; dla CO źródło daje tylko kierunek | druga część zdania (dużo chybionych wysokich kart; Button ma mniej rąk bez szans) POPARTA: “the narrow range is doing much better because it has less air in its range” | patrz 06-tresci-001 | 06-tresci-001 |
| D-1287 why.small/big | `docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch:55-56` | silne ręce część razy check-raise; “za drogo” | jw. | “we must back it up with a solid check-raising strategy as well”; “bloating the pot and then getting to the turn with too wide of a range” | POPARTE (kierunkowo; “za drogo” = rozdmuchanie puli) | “w tym układzie” jak wyżej | jak 06-tresci-001 | 06-tresci-001 |
| D-1289 / N6 | `docs/tresci/odczyty/ev-2026-11-12.tsv:9` | źródło nie daje reguły “draw na turnie → bet” | https://blog.gtowizard.com/from-gutshots-to-airballs-choosing-your-bluffs/ (ćwiczenie A♠9♣7♥2♠) | “This is a tough exercise because there is no clear pattern to the answers. A gutshot to the nuts is a pure check, while a gutshot to a lower straight is a pure bet.” | POPARTE: odczyt wierny; dodatkowo podpowiedź “The solver advises a mostly check-or-overbet strategy here on the turn” wyklucza też generator z rozmiarem 3/4 | zasada “Bluff with draws when you expect your opponent to respond mostly by folding or calling” to w źródle “Easy, Exploitative Answer”; R-M7-002 uczy tego jako warunku, zgodnie z D-1289 | brak | — |

## Linia bazowa i założenia
- **Wymiary pokrycia:**
  - Fakty, liczby i reguły: R-M8-006, R-M5-012 (łatka), ceny zakładów EP-003; wynik w tabeli wyżej.
  - Progi krytyczne dla zdrowia, mienia i prawa: sprawdzone, brak w zakresie (teoria gry, bez pieniędzy).
  - Brakujące ostrzeżenia: sprawdzone, brak nowych. Łatka zachowuje wyłączenie blind vs blind („We are not going to be talking about blind versus blind play”). Zachowuje też wyłączenie UTG („So on those boards you actually do get to do a little bit more c-betting”) przez `heroPositions: "HJ,CO"`.
  - Warianty regionalne: dotyczy tylko języków. 10 języków ma dziś starą wersję R-M8-006 (lista kluczy dla 09 w D-1288).
  - Aktualność: źródła otwarte dziś. Treść stron się nie zmieniła, cytaty są dosłownie. Skróty HTML różnią się od EV, bo strony są dynamiczne.
  - Trudna pamięć: sprawdzone, brak.
  - Pary zdań: przeczytane w R-M8-006 i w trzech `why` łatki.
  - Jedno źródło: dla przypadku `check` R-M5-012 jest jedno źródło szczebla 4 (Upswing), oznaczone w rejestrze. Na szczeblu 2 R-M5-012 ma osobne źródła (GW OOP, A94r).
- **Soczewki:**
  - Laik: „w tym układzie” czyta dosłownie jako wynik solvera dla CO (stąd 06-tresci-001).
  - Ekspert: CO ma szerszy zakres niż HJ, więc więcej chybionych kart, a kierunek „czekaj” się wzmacnia. Brak szkodliwego uproszczenia.
  - Sceptyk: każde źródło otwarte, 14/14 cytatów.
  - Inny kraj: nie dotyczy (teoria gry jest ta sama).
- **Wzorzec:** wyniki solvera publikowane przez serwisy (szczebel 2–4 według ADR-24) z zakresem pozycji podanym w zdaniu, jak w istniejącym źródle R-M5-012 „CO vs BTN, A94r”.
- Zmiany w rejestrze założeń: brak propozycji.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `content/pl/rules.yaml`, `content/en/rules.yaml` (diff R-M8-006) | tak | `git diff 91573ab6..7e667066 -- content/` |
| `docs/tresci/rejestr.json`, `docs/tresci/rejestr/m5-m8.json` (diff) | tak | jw.; szczeble: Upswing 4, GW 2 |
| łatki `docs/tresci/szablony-robocze/*` | tak | tabela weryfikacji |
| `ev_wektory.py` i wektory | tak, odtworzone | `dowody/ez-wektory.txt` (identyczne z `ev-wektory.txt`) |
| rachunek EP-003 | tak, niezależnie | `dowody/ez-rachunek-ep003.txt` |
| źródła (3 strony) | tak, surowy tekst | `dowody/ez-zrodla-2026-11-12.txt` |
| definicja `height: low` i „bez pary” | tak | `packages/poker-core/src/texture.ts:11-13` |
| uproszczenie oceny `best: check` | tak | `packages/poker-core/src/grading.ts:283-284` |
| pliki `.db` i `tresc.generated.ts` (wygenerowane) | nie czytane treściowo | wynik `pnpm run ci` (content:check) |
| `pnpm run ci` na 7e667066 | tak | `dowody/ez-ci-7e667066.txt` |
| 10 języków poza pl/en | nie (poza zakresem EV, D-1288) | — |

## Kontrola dowodów i sekretów
Wynik `node sprawdz-raport.mjs docs/tresci/recenzja-ez.md . docs/tresci --rola 06-tresci`: zob. ostatnia linia tej sekcji (uruchamiany przed commitem, kod 0). Raport zawiera tylko cytaty 1–2 zdań ze źródeł, bez sekretów i danych prywatnych.

OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 06-tresci

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| TRE-01 | dotyczy (R-M8-006, łatka) | ok: R-M8-006 i R-M5-012 mają wpisy w rejestrze ze źródłami |
| TRE-02 | dotyczy | ok: 14/14 cytatów dosłownie, werdykty w tabeli |
| TRE-03 | dotyczy | znalezisko 06-tresci-001 (CO zamiast HJ w łatce) |
| TRE-04 | dotyczy | ok: Upswing szczebel 4 (serwis szkoleniowy cytujący solver), GW szczebel 2; poziom `heuristic` zgodny z nagłówkiem `content/pl/rules.yaml:4` |
| TRE-05 | dotyczy (D-1289) | ok: sprzeczność z regułą ogólną rozstrzygnięta przez pozostawienie N6 otwartym |
| TRE-06 | dotyczy | ok: łatka używa `{{n:cbet.size.small}}` i `{{n:cbet.size.big}}`, liczb wpisanych ręcznie brak; R-M8-006 bez liczb |
| TRE-07 | dotyczy | ok: uproszczenie „bet przy `best: check` = dopuszczalne” nazwane w D-1287, kierunek zgodny |
| TRE-08 | dotyczy | 06-tresci-001; reszta par zdań ok; tłumaczenie en = pl (ten sam sens) |
| TRE-09 | nie dotyczy | teoria gry, brak faktów zmiennych |
| TRE-10 | nie dotyczy | brak treści krytycznej (zdrowie, prawo); przegląd zastępczy według `CLAUDE.md` |
| TRE-11 | nie dotyczy | brak trudnej pamięci |
| TRE-12 | nie dotyczy | brak treści zależnej od lokalizacji |
| TRE-13 | dotyczy | ok: `pnpm content:build` w CI zgodny (pliki `.db` z nowym skrótem 24335c2703) |
| TRE-14 | dotyczy | ok: cytaty ≤ 2 zdań, kopii stron w repo brak |

## Znaleziska (szczegóły)

### 06-tresci-001 · Łatka `m5.l4.c-oop` przypisuje solverowi wynik dla otwarcia z CO, a źródło podaje go dla środkowej pozycji (HJ)
- Pozycja listy kontrolnej: TRE-03
- Poziom: P2 (próg wydania: ŚREDNIE; łatki nie ma jeszcze w `content/`, więc użytkownik tego nie widzi)
- Realność: realny po wdrożeniu łatki · Pewność: wysoka
- Rodzaj: M
- Dowód: `docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch:54` mówi „solver w tym układzie {{t:check|czeka}} całym {{t:range|zakresem}}”, a zadanie ma `position: CO` (linia 44). To samo w en: `:24` („the solver {{t:check|checks}} its whole {{t:range}} in this spot”). Źródło (https://upswingpoker.com/podcast/ep24-cbetting-oop/, odczyt 2026-11-12) zaczyna przykład od „Suppose you raise in middle position and the button calls”. Liczby equity podaje dla hijacka: „the hijack again has only got 47.2% equity”. CO pojawia się tylko kierunkowo (04:36): „when you’ve raised pre-flop from one of those middle or late positions”. Dowód: `dowody/ez-zrodla-2026-11-12.txt`.
- Mechanizm: „w tym układzie” / „in this spot” w trzech `why` każdego języka; `grep -n "w tym układzie\|in this spot" docs/tresci/szablony-robocze/ev-m5-l4-c-oop.patch` daje 6 trafień: linie 24, 25, 26, 54, 55, 56.
- Powraca: nie
- Wzorzec lub źródło: ADR-24 („Uproszczenie dydaktyczne wolno stosować, gdy kierunkowo zgadza się z wynikami solverów i jest nazwane uproszczeniem”); kierunek jest zgodny, ale uproszczenie nie jest nazwane w zdaniu.
- Kroki w aplikacji: po wdrożeniu łatki lekcja M5.4 pokaże zadanie „otworzyłeś z CO” z wyjaśnieniem, które podaje jako wynik solvera to, co źródło mówi o HJ.
- Opcje: (a) `position: HJ` w `prompt` i `position` zadania, bez zmiany `why`: zgodność z wynikiem solvera 1:1, ale zadanie przestaje ćwiczyć CO; (b) zostaje CO, a `why.check` brzmi: „na niskim flopie bez pary solver przy otwarciu ze środkowej pozycji (HJ) czeka całym zakresem; z CO twój zakres jest jeszcze szerszy, więc tym bardziej czekasz”; w `small` i `big` „w tym układzie” zastąpione przez „w takim układzie (HJ wobec Buttona)”: zachowuje CO kosztem dłuższego tekstu. Rekomendacja: (a), bo najkrótsza poprawka i 1:1 ze źródłem, a `heroPositions: "HJ,CO"` zostaje dla oceny w grze.
- Test akceptacyjny: w łatce nie ma zdania, które przypisuje wynik solvera pozycji spoza źródła (`grep` jak wyżej: 0 trafień przy `position: CO` albo `position: HJ`); `pnpm run ci` kod 0 po wdrożeniu.
- Status: otwarte (warunek wdrożenia D-1287, decyzja D-1322)

### 06-tresci-002 · R-M8-006 nazywa podział puli inaczej niż reszta kursu
- Pozycja listy kontrolnej: TRE-08 (spójność terminów, ADR-24 „jedna nazwa na jedno pojęcie”)
- Poziom: P2 (próg wydania: NISKIE)
- Realność: realny · Pewność: wysoka
- Rodzaj: M
- Dowód: `content/pl/rules.yaml:719` „nie wygrają ani nie podzielą {{t:pot|puli}}”; ustalony termin to `split-pot`, np. `content/pl/lessons/m0-l1-uklady.md:99` „{{t:split-pot|pula jest dzielona}}”. En: `content/en/rules.yaml:718` „won't win or split the {{t:pot}}”.
- Mechanizm: `grep -rn "t:split-pot" content/pl content/en | wc -l` daje 30 trafień w innych miejscach; R-M8-006 jako jedyne miejsce opisuje podział puli bez tego terminu.
- Powraca: nie
- Wzorzec lub źródło: `CLAUDE.md` („jedna nazwa na jedno pojęcie”).
- Kroki w aplikacji: karta reguły R-M8-006 (M8): dymek terminu prowadzi do „puli”, a nie do „podziału puli”.
- Opcje: (a) „nie wygrają ani nie {{t:split-pot|podzielą puli}}” (en: „won't win or {{t:split-pot|split the pot}}”): jedna zmiana w dwóch plikach i w rejestrze; (b) bez zmian: dymek „pula” też jest poprawny, ale nie tłumaczy remisu. Rekomendacja: (a), razem z przekładem 09 (D-1288), żeby 12 języków zmienić naraz.
- Test akceptacyjny: `grep -n "split-pot" content/pl/rules.yaml` obejmuje R-M8-006; `pnpm content:build` i `pnpm run ci` kod 0.
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- `heroPositions: "HJ,CO"` w `players: [6]`. Źródło nie mówi wprost „6-max”. Przykład „we open in the cutoff… opening 29%” pasuje do 6-max, ale tego nie potwierdza. D-1287 odrzuca 9-max z tego powodu. Brakuje stołu 6-max nazwanego w źródle (pewność 70%, nie blokuje).
- R-M7-002 (poza zakresem EV, istniejąca reguła) opiera warunek „gdy rywal raczej pasuje albo sprawdza” na części GW nazwanej przez źródło „Easy, Exploitative Answer… if you’re currently playing in weak fields”. Poziom `heuristic` to dopuszcza, ale treść nie podaje populacji (ADR-24 szczebel 5). Do przeglądu przy następnym audycie M7; brakuje odczytu pozostałych dwóch źródeł reguły.
- 10 języków ma do czasu 09 starą wersję R-M8-006 („nie wygrają”). Zapisane w D-1288, więc nie zgłaszam tego jako znaleziska. Starsza wersja jest mniej dokładna (remis), ale nie odwraca zalecenia.

## Co działa dobrze i należy zachować
- Każda zmiana ma odczyt z datą, cytatem dosłownym i skrótem HTML (`docs/tresci/odczyty/ev-2026-11-12.tsv`). U mnie 14/14 cytatów też przechodzi.
- Rachunek EP-002 i EP-003 stoi na własnym ewaluatorze, bez poker-core, i odtwarza się bajt w bajt.
- Warunek D-1286 jest ścisły: wymaga obu perspektyw (N/46 pokazywane, N/44 rzeczywiste), więc lekcja nie może pokazać liczby po złej stronie ceny.
- D-1287 nie wdraża łatki przy czerwonym CI i opisuje, co musi zrobić 08 i 09. Zgodne z zasadą „bez cichego zjazdu”.
- D-1289 nie robi z ćwiczenia GW reguły, której źródło samo nie uogólnia.

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. Decyzje merytoryczne (ADR-24, do weta) w `docs/decyzje/EZ.md`: D-1320 (D-1285 potwierdzone), D-1321 (D-1286 potwierdzone), D-1322 (D-1287 z warunkiem 06-tresci-001), D-1323 (D-1289 potwierdzone), D-1324 (06-tresci-002 razem z przekładem 09).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 06-tresci --tryb fix --zadania 06-tresci-001,06-tresci-002` (001 przed wdrożeniem łatki D-1287; 002 razem z przekładem 09 według D-1288).
