# Audyt: Programista — Szkoła Pokera — recenzja niezależna CR+CS — 2026-11-11
Commit: `8133a8c` (zakres CR `9a6f45f..cd327e9`, CS `cd327e9..8133a8c`; gałąź `sesja-ct-recenzja` = `sesja-cs-poprawki` @ 8133a8c, potomek `5637200`, zgodny z poleceniem) · Tryb: audit (recenzja D-043, polecenie CT) · Środowisko: Linux 6.18, Node 22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez macOS/Xcode (ekran sprawdzony testami Jest na prawdziwej bazie treści pl i odczytem kodu, bez zrzutów z urządzenia). Ścieżki dowodów względem `docs/programista`.

## Podsumowanie
Werdykt: **przyjąć warunkowo** (0 KRYT, 1 WYS, 1 ŚR, 2 NIS). Rachunek outów z nadkartami jest poprawny: niezależna wyrocznia (outy policzone z talii, nadkarty jako unia i jako suma) na 3000 ziaren każdego poziomu sc-01, sc-02, sc-03 i sc-19 nie znalazła żadnej niezgodności outów, ceny, szansy, decyzji ani odporności pasu na implied odds, a ta sama wyrocznia na generatorze sprzed CS znajduje błędy (a). Zmiany testów z pkt 3 nie osłabiają asercji (b). Ekran SC-11/SC-12 pokazuje dla każdej akcji ocenę wariantu, a ta jest oceną silnika gry na prawdziwym rozdaniu (c). Blokuje jedno: CS dodał do SC-12 akcję „duży c-bet” z wyjaśnieniem „jest dopuszczalny” i oceną równą małemu zakładowi, wbrew decyzji merytorycznej D-792 i przeczytanemu źródłu („Size down”) (001). Do tego CS zmienił wynik generatora dla 35–63% ziaren szablonów draw-call bez podniesienia `GENERATOR_WERSJA`, więc „Zagraj jeszcze raz to samo rozdanie” po aktualizacji pokazuje inne karty i zużywa limit (002, powrót ŚR-001; kontrola trwała go nie wykryła).

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 08-programista-001 | WYS | M | SC-12: duży c-bet na niskim połączonym flopie oceniany „Dopuszczalna” jak mały, z wyjaśnieniem sprzecznym z D-792 i źródłem | otwarte |
| 08-programista-002 | ŚR | D | Generator zmienił wynik dla tych samych ziaren bez podniesienia GENERATOR_WERSJA: „to samo rozdanie” pokazuje inne karty i zużywa limit | otwarte |
| 08-programista-003 | NIS | M | W wariantach z nadkartami wyjaśnienie i „Liczby” podają same outy drawa („Masz 8 outów”), bez wzmianki o nadkartach | otwarte |
| 08-programista-004 | NIS | P | Najtrudniejsze poziomy (sc-01 trudny, sc-03 średni) po CS nie mają już żadnej ręki z nadkartą | otwarte |

## Linia bazowa i założenia
Linia bazowa ustalona z kodu i treści przed lekturą uzasadnień autorów (`stan-cr.md`, `stan-cs.md`, `docs/decyzje/CR.md`, `CS.md` przeczytane dopiero po sformułowaniu znalezisk 001 i 002; zgodność opisana przy znaleziskach).

Wymiary pokrycia:
- **Ścieżki zapisu:** w zakresie nie ma zmian w `packages/postep` ani w kodzie `packages/domena` (tylko test `wariant-kontekst-ca`). Zapis odcisku i ziarna (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:117`) bez zmian; skutki zmiany wyniku generatora dla historii i limitu: 002. Plan wznowienia: odcisk planu (FNV punktów) wykrywa zmianę wariantu i zaczyna nowe rozdanie z zachowaniem odpowiedzi (D-787) — bez utraty danych.
- **Obsługa błędów:** brak zakresu otwarcia, pozycji albo pustego zakresu w cbet-case to `TemplateError` (`packages/poker-core/src/scenario-gen.ts:395-402`), a ekran zamienia go na `plan_niepoprawny`; uszkodzone dane kontekstu to `BladOdczytuTresci` (CR NIS-005, test `kontekst-cn`). Sprawdzone, bez znalezisk.
- **Typy na granicach:** CR zastąpił asercje `as` w `getKontekstGeneratora` schematami zod (`content-schema/src/index.ts`, `GeneratorRangeActions` itd.). Sprawdzone, bez znalezisk.
- **System projektowy, i18n:** nowe teksty tylko w treści (SC-12 `bet-big`, 12 języków) — merytorycznie 001; klucze interfejsu bez zmian w zakresie.
- **Wydajność:** dolosowanie flopu do tekstury (do 2000 razy, `FLOP_REDEALS`) jest próbkowaniem z odrzuceniem, więc rozkład flopów warunkowo bez zmian; czas generatora mieści się w testach CI (10 000 losowań na poziom). Bez znalezisk.
- **Testy na właściwym poziomie:** logika w Node (poker-core, content-build), ekran na prawdziwej bazie treści (Jest). Luka: `cs-tresc-realna.test.tsx` sprawdzał tylko obecność „Ocena:”, nie jej wartość — domknięta testem CT `ct-recenzja.test.tsx` (pkt c).
- **Dostępność:** bez zmian komponentów w zakresie; sprawdzone, brak.
- **Liczby konfiguracyjne:** `OUTS_PER_OVERCARD_RANK = 3` ma test równości z `pair.outs.per-rank` w `content/numbers.yaml:222`; `FLOP_REDEALS` lokalna stała generatora. Bez znalezisk.

Soczewki: recenzent szukający ścieżki bez testu (a, b, c — po jednym niezależnym teście na tezę), użytkownik po aktualizacji aplikacji z historią rozdań (002), uczeń liczący outy według lekcji M2 (003). Wzorzec najlepszych: wynik generatora pod danym ziarnem jest kontraktem wersjonowanym (ŚR-001, D-731); każda liczba i ocena pokazywana uczniowi ma wyrocznię niezależną od kodu, który ją liczy.

Rejestr założeń: bez propozycji zmian statusu.

## Pokrycie (co sprawdzono, czego nie)
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| `poker-core/src/scenario-gen.ts` (nadkarty w draw-call, ręka z zakresu w cbet-case, `verdicts`, `akcjeSzablonu`) | tak | odczyt kodu; wyrocznia od zera `dowody/ct-sonda-outy-8133a8c.txt`; test `recenzja-ct-odtworzenie.test.ts` |
| `poker-core/src/grading.ts` (`cbetVerdict`, `sizeVerdict` wydzielone bez zmiany zachowania) | tak | odczyt diffu; porównanie z `gradeDecision` w teście CT (c) |
| `tools/content-build/src/scenariusze.ts` (bramka pełnych akcji, icm-call poza ekranem) | tak | odczyt; testy CR `cp-recenzja-cn` zielone w CI (`dowody/ct-ci-17b1a3a6.txt`) |
| `apps/mobile/.../wariant.ts`, `EkranScenariusza.tsx` (oceny z `verdicts`, częstości do `przebiegScenariusza`) | tak | odczyt; `ct-recenzja.test.tsx` na prawdziwej bazie pl |
| `apps/mobile/src/data/content/repo.ts` (parsowanie kontekstu schematem) | tak | odczyt diffu; test `kontekst-cn` w CI |
| Treść SC-03, SC-11, SC-12 (pl; pozostałe 11 języków tylko obecność i liczba akcji) | częściowo | odczyt pl; przekłady nie oceniane (rola 09) |
| Zmienione testy: `wariant-kontekst-ca`, `szablony-f2-ca`, `wznowienie-cn`, `szablony-bs`, `stos-zakladu-bu`, `bv-gotowa-reka`, `recenzja-cq-odtworzenie`, `cp-recenzja-cn` (oba), `ekran-cn`, `kontekst-cn`, `cm-recenzja-cl` | tak | `git diff` każdego pliku; ocena w sekcji „Stosowalność”, DEV-03 |
| `packages/postep`, `packages/domena` (zgodność danych po zmianie odcisku i wariantów) | tak (odczyt + sonda) | `dowody/ct-wersja-generatora.txt` |
| Urządzenie iOS, zrzuty ekranu | nie | środowisko bez macOS; krok właściciela przy testach na telefonie |

## Kontrola dowodów i sekretów
`node sprawdz-raport.mjs docs/programista/recenzje/recenzja-cs-8133a8c.md . docs/programista --rola 08-programista` → `OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 08-programista`, kod 0 (skrypt z promptu roli w scratchpadzie, poza repo).

## Stosowalność listy kontrolnej
| Pozycja | Status (dotyczy / nie dotyczy + powód / decyzja D-xx) | Wynik (ok / znalezisko ID / nie sprawdzono + powód) |
|---|---|---|
| DEV-01 | dotyczy (nadkarty, losowanie z zakresu, werdykty) | ok: każda nowa reguła ma test, a CT dodał wyrocznie niezależne (a, c) |
| DEV-02 | dotyczy | ok: 3/3 commitów CR/CS zmieniających kod źródłowy ma test w tym samym commicie: `dbc54523`, `af40492b`, `5dea589c`; pozostałe (`138ca636`, `fcdce6b5`, `2cd57bc4`, `4ab96ec9`) zmieniają tylko testy |
| DEV-03 | dotyczy | ok: filtry `every(kind === 'draw-call')` w trzech testach nie zawężają istniejących szablonów (w `cd327e9` wszystkie były draw-call); `wznowienie-cn` zmienia ziarno, ale warunek wstępny dalej jest asercją; `szablony-f2-ca` i `wariant-kontekst-ca` dostały dane wymagane przez nowy kod bez zmiany asercji; `recenzja-cq-odtworzenie` 003 rozszerzony z SC-03 Ś na sc-02/03/19 × Ł/Ś (1500 zamiast 2000 ziaren, to samo kryterium); CR zastąpił `it.failing` CP testami bramki (inna, zapisana naprawa D-815). Uwaga: SC-03 Ś nie ma po CS żadnej ręki z nadkartą, więc ten test jest tam pusty — patrz 004 |
| DEV-04 | dotyczy | ok: `pnpm run ci` kod 0 na 8133a8c przed zmianami CT i na 17b1a3a6 po dodaniu testów CT (`dowody/ct-ci-17b1a3a6.txt`) |
| DEV-05 | dotyczy (zapis odcisku i aktywności) | ok: brak zmian ścieżek zapisu w zakresie |
| DEV-06 | nie dotyczy | brak migracji i kopii w zakresie |
| DEV-07 | dotyczy | ok: brak zakresu otwarcia, pozycji albo pustego zakresu → `TemplateError`, bez wartości domyślnej (`packages/poker-core/src/scenario-gen.ts:395-402`) |
| DEV-08 | nie dotyczy | brak dat w zakresie |
| DEV-09 | dotyczy (`getKontekstGeneratora`) | ok: parsowanie schematem zamiast `as` (CR NIS-005) |
| DEV-10 | dotyczy | ok: błąd generatora → `plan_niepoprawny` (`apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:95-98`) |
| DEV-11 | nie dotyczy | brak zmian komponentów i stylów |
| DEV-12 | dotyczy (treść SC-12 w 12 językach) | treść merytorycznie: 001; przekłady nie oceniane (rola 09) |
| DEV-13 | dotyczy | ok: `OUTS_PER_OVERCARD_RANK` związana testem z `numbers.yaml` |
| DEV-14 | dotyczy | ok: diff zakresu bez plików kluczy ani sekretów (przejrzany `git diff --stat`, bazy treści `.db` to treść publiczna) |
| DEV-15 | nie dotyczy | brak efektów i nasłuchów w zakresie |
| DEV-16 | dotyczy (bb, ułamki puli, outy) | ok: cena i szansa przeliczone od zera w teście CT (a) |
| Wersjonowanie wyniku generatora (ŚR-001, D-731) | dotyczy | 08-programista-002 |

## Znaleziska (szczegóły)

### 08-programista-001 · SC-12: duży c-bet na niskim połączonym flopie oceniany „Dopuszczalna” jak mały, z wyjaśnieniem sprzecznym z D-792 i źródłem
- Pozycja listy kontrolnej: DEV-12 (treść ekranu) i DEV-01 (reguła oceny)
- Poziom: WYS (próg CLAUDE.md: błędne twierdzenie merytoryczne)
- Realność: realny · Pewność: wysoka
- Rodzaj: M (merytoryczna; rozstrzyga rola 06 według ADR-24)
- Dowód:
  - treść: `content/pl/scenarios/sc-12.yaml:30-31` „Duży {{t:bet}} jest dopuszczalny, ale rzadszy” (dodane w CS `5dea589c`, 12 języków); nagłówek tego pliku (linia 3) nadal mówi «Bez dużego zakładu»;
  - decyzja merytoryczna D-792: `docs/decyzje/CO.md:9` „nie piszemy wyjaśnienia, które musiałoby nazwać duży zakład dopuszczalnym”;
  - źródło (szczebel 2), odczyt CO: `docs/tresci/odczyty/co-gtow-flop-heuristics-ip-2026-11-11.txt:9` „Size down and bet less on flops that complete straights and flushes in your opponent’s range.”;
  - filtr SC-12 `connected` to strit możliwy z dwiema kartami gracza, czyli dokładnie «flops that complete straights»: `packages/poker-core/src/texture.ts:14`;
  - ocena: przy `best: check` każdy zakład to `acceptable`, więc pasek ocen pokazuje «Mały c-bet dopuszczalna, Duży c-bet dopuszczalna»: `packages/poker-core/src/scenario-gen.ts:507` przez `cbetVerdict` w `packages/poker-core/src/grading.ts:273-275`;
  - test odtwarzający: `tools/content-build/test/recenzja-ct-odtworzenie.test.ts` (08-programista-001, `it.fails`), jako `it` czerwony: 100/100 wariantów «bet-big acceptable = bet-small» (`dowody/ct-czerwone-przed.txt`).
- Mechanizm: bramka CR (D-815) wymaga zawsze trzech akcji c-betu (`akcjeSzablonu`), a silnik nie rozróżnia rozmiaru przy `best: check`; CS (D-826) uzupełnił treść zamiast zgłosić konflikt do roli 06. `grep -rn "best: check" content/pl/rules.yaml` → 1 trafienie (przypadek R-M5-004, `content/pl/rules.yaml:389`): ta sama ocena dotyczy trybu gry (`grading.ts` `cbet-case`), ale tam nie ma tekstu, który nazywa duży zakład dopuszczalnym.
- Powraca: nie (konflikt nowy w CS; D-826 sam oznacza zmianę „do przeglądu roli 06”, przegląd się nie odbył)
- Wzorzec lub źródło: ADR-24 (uproszczenie nie może przeczyć szczeblowi 2), zasada roli 6 („cudze decyzje wykonujesz, nie zmieniasz”), D-792
- Kroki w aplikacji: Scenariusze → SC-12 → wybór „Duży c-bet” → „Ocena: Dopuszczalna” i tekst „Duży bet jest dopuszczalny”.
- Opcje: (a) ocena silnika przy `best: check`: duży zakład = „niedokładność” (zły rozmiar, jak przy `best: small`), wyjaśnienie SC-12 zmienione na niedokładność — zgodne ze źródłem, zmienia też ocenę w trybie gry (jedna definicja), decyzja merytoryczna roli 06; (b) bramka dopuszcza zestaw akcji z szablonu dla cbet-case z regułą bez rozmiaru (SC-12 bez `bet-big`, jak D-792), ekran pokazuje tylko akcje szablonu — wraca do stanu sprzed CS, wymaga zmiany kontraktu D-815 (rola 05/04: przycisk znika); (c) usunąć SC-12 z treści do czasu decyzji. Rekomendacja: (a) — jedna ocena w grze i scenariuszu, kierunek zgodny ze źródłem, bez zmiany bramki; decyzja roli 06.
- Test akceptacyjny: `08-programista-001` w `recenzja-ct-odtworzenie.test.ts` jako `it` zielony (duży zakład nie ma oceny małego albo nie jest akcją punktu); `szablony-co.test.ts` tabela `OCENY.check` zgodna z nową oceną; nagłówek `sc-12.yaml` zgodny z treścią.
- Status: otwarte

### 08-programista-002 · Generator zmienił wynik dla tych samych ziaren bez podniesienia GENERATOR_WERSJA: „to samo rozdanie” pokazuje inne karty i zużywa limit
- Pozycja listy kontrolnej: wersjonowanie wyniku generatora (ŚR-001, D-731); ścieżka wrażliwa `packages/domena` (limit)
- Poziom: ŚR
- Realność: brzegowy (tylko wpisy historii zapisane przed aktualizacją; dziś tylko testerzy; czy buildy 1005–1008 zapisały odciski sc-01/02/19: [DO USTALENIA]) · Pewność: wysoka
- Rodzaj: D
- Dowód:
  - `GENERATOR_WERSJA = 1` przed i po CS: `packages/poker-core/src/scenario-gen.ts:256`; sonda tymi samymi szablonami z treści: inny odcisk dla 234/500 (sc-01 Ś), 315/500 (sc-01 T), 177/500 i 242/500 (sc-02 Ł/Ś), 204/500 i 263/500 (sc-19 Ł/Ś) ziaren (`dowody/ct-wersja-generatora.txt`);
  - `ziarnoPowtorki` oddaje ziarno wpisu, bo wersja się zgadza: `packages/domena/src/wariant.ts:71`;
  - ekran generuje z tego ziarna inne karty: `apps/mobile/src/features/scenariusz/aktywnoscScenariusza.ts:95`;
  - `czyPowtorkaWariantu` widzi inny odcisk, więc limit liczy start jako nowe rozdanie, a przy wyczerpanym limicie «Zagraj jeszcze raz to samo rozdanie» kończy się ekranem zakupu: `packages/domena/src/limit.ts:29`;
  - kontrola trwała ŚR-001 nie zadziałała, bo wzorzec to syntetyczny szablon bez nadkart: `packages/poker-core/test/scenario-gen.test.ts:150`;
  - test odtwarzający: `recenzja-ct-odtworzenie.test.ts` (08-programista-002, `it.fails`), jako `it` czerwony (`dowody/ct-czerwone-przed.txt`).
- Mechanizm: zmiana filtra w `tryVariant` zmienia zużycie liczb losowych, więc dalsze ziarna też dają inne karty; `grep -rn "GENERATOR_WERSJA" packages/poker-core/src` → 1 trafienie (`packages/poker-core/src/scenario-gen.ts:256`), wzorzec wersji tylko w 1 teście syntetycznym.
- Powraca: tak, ŚR-001 (KO-058 A, D-730/D-731) → trwała kontrola: wzorce odcisków z prawdziwych szablonów `content/pl` (po jednym ziarnie na szablon i poziom) w teście wersji.
- Wzorzec lub źródło: D-731, `packages/poker-core/test/scenario-gen.test.ts:150` „zmiana tej pary w jednym commicie = świadome podniesienie wersji”
- Kroki w aplikacji: zagraj SC-02 na starej wersji → aktualizacja → „Zagraj jeszcze raz to samo rozdanie” → inne karty; przy limicie 0 → ekran zakupu.
- Opcje: (a) `GENERATOR_WERSJA = 2` i wzorce z prawdziwych szablonów przeliczone w tym samym commicie — stare wpisy przestają być „zgodne”, powtórka losuje nowe rozdanie bez komunikatu (zachowanie z D-731); (b) zostawić 1 i zapisać wyjątek (brak użytkowników poza właścicielem) — tańsze, ale kontrola dalej nie łapie zmian. Rekomendacja: (a), jedna linia i przeliczenie wzorca.
- Test akceptacyjny: `08-programista-002` przepisany na nową wersję i odciski z prawdziwych szablonów, zielony; zmiana generatora bez podniesienia wersji czerwieni ten test.
- Status: otwarte

### 08-programista-003 · W wariantach z nadkartami wyjaśnienie i „Liczby” podają same outy drawa („Masz 8 outów”), bez wzmianki o nadkartach
- Pozycja listy kontrolnej: DEV-01 / DEV-12
- Poziom: NIS
- Realność: realny (sc-02 Ł: 417/6000 punktów, sc-03 Ł: 996/3000 z nadkartą, `dowody/ct-sonda-outy-8133a8c.txt`) · Pewność: wysoka
- Rodzaj: M
- Dowód:
  - wyjaśnienia: `content/pl/scenarios/sc-02.yaml:23` „Masz {{n:outs.oesd}} outów”; `content/pl/scenarios/sc-03.yaml:24` „masz {{n:outs.gutshot}} {{t:outs|outy}}”;
  - «Liczby» ekranu podają `outy: d.outs` (outy drawa): `apps/mobile/src/i18n/locales/pl.json:1091` „Outy to {{outy}} z {{nieznane}} niewidzianych kart”;
  - lekcja definiuje out jako kartę, która daje rękę prawdopodobnie wygrywającą: `content/pl/lessons/m2-l1-outy.md:106`; M2 uczy doliczania nadkart jako niepewnych outów: `content/pl/lessons/m2-l2-pot-odds.md:25`;
  - decyzja jest poprawna przy obu liczeniach (wyrocznia: 0 niezgodności), więc uczeń nie dostaje złej odpowiedzi, tylko liczbę bez nazwanego uproszczenia.
- Mechanizm: stałe `{{n:outs.*}}` w szablonach draw-call; `grep -rn "n:outs\." content/pl/scenarios` → 4 pliki (sc-01, sc-02, sc-03, sc-19).
- Powraca: nie
- Wzorzec lub źródło: ADR-24 (uproszczenie nazwane uproszczeniem)
- Kroki w aplikacji: SC-03 łatwy, ręka z nadkartą (np. A-K przy stole do dziesiątki) → ocena → „masz 4 outy”.
- Opcje: (a) zdanie w wyjaśnieniu/„Liczbach” przy nadkartach: „nawet z nadkartami (+3 na rangę) odpowiedź ta sama” — wymaga znacznika wariantu albo warunkowego tekstu (rola 04/06); (b) zostawić, zapisać jako nazwane uproszczenie w rejestrze. Rekomendacja: (b) teraz, (a) do backlogu.
- Test akceptacyjny: decyzja roli 06 zapisana; przy (a) test tekstu wariantu z nadkartą.
- Status: otwarte

### 08-programista-004 · Najtrudniejsze poziomy (sc-01 trudny, sc-03 średni) po CS nie mają już żadnej ręki z nadkartą
- Pozycja listy kontrolnej: DEV-01 (rozkład wariantów)
- Poziom: NIS
- Realność: realny · Pewność: wysoka
- Rodzaj: P
- Dowód: 0 punktów z nadkartą na 3000 wariantów sc-01 T i sc-03 Ś wobec 2268 (sc-01 Ł) i 996 (sc-03 Ł) (`dowody/ct-sonda-outy-8133a8c.txt`). Przy wąskim marginesie (do 2 pp, do 10 pp) nadkarty zawsze zmieniają odpowiedź albo margines, więc filtr `packages/poker-core/src/scenario-gen.ts:541-547` odrzuca każdą taką rękę. Skutek: na najtrudniejszym poziomie uczeń nigdy nie widzi drawa z nadkartami; test CQ 003 dla SC-03 Ś jest pusty (warunek `wyzsze === 0 → return`).
- Mechanizm: jeden filtr dla wszystkich szablonów draw-call; dotyczy 2 z 9 par szablon–poziom.
- Powraca: nie
- Wzorzec lub źródło: BR-GEN-002 (różnorodność wariantów; pojemność ≥ 40 zachowana, `content:check` zielony)
- Kroki w aplikacji: SC-03 średni, wiele rozdań → tylko ręce bez kart wyższych od stołu.
- Opcje: (a) zostawić i zapisać jako świadome zawężenie (decyzja pozostaje jednoznaczna); (b) dla tych poziomów tekst o nadkartach jako pułapce (osobny szablon/poziom, rola 03/06). Rekomendacja: (a) z wpisem w rejestrze.
- Test akceptacyjny: decyzja zapisana; przy (a) test CQ 003 z asercją, że poziom ma albo ma nie mieć wariantów z nadkartą (żeby nie był cicho pusty).
- Status: otwarte

## Do sprawdzenia (pewność ≤ 80%)
- Czy buildy TestFlight 1005–1008 zawierały ekran scenariuszy z sc-01/02/19 i zapisały odciski w historii (wpływa na realność 002). Brak: dostęp do bazy testera.
- Przekłady 11 języków tekstu `bet-big` SC-12 nie były czytane merytorycznie (i tak do zmiany przy 001; rola 09).

## Co działa dobrze i należy zachować
- Filtr nadkart wymaga tej samej odpowiedzi przy dolnej (outy drawa) i górnej (suma z nadkartami) granicy outów oraz odporności pasu na implied odds także przy górnej — wyrocznia od zera z dokładną unią potwierdza 0 niezgodności na 3000 ziaren każdego poziomu, a na kodzie sprzed CS znajduje błędy (`dowody/ct-wersja-generatora.txt`, część druga).
- Losowanie ręki z zakresu `rfi.<pozycja>` z wagą częstość × kombinacje i dolosowanie flopu jako próbkowanie z odrzuceniem: rozkład warunkowy poprawny, bez spadku pojemności; ręka zawsze w zakresie otwarcia BTN z pliku solvera (test CT c, 2000 ziaren × 4).
- Jedna definicja akcji (`akcjeSzablonu`) i ocen (`cbetVerdict`, `sizeVerdict`) dla generatora, bramki, ekranu i trybu gry; ocena kroku i pasek ocen z tej samej tabeli.
- Odcisk planu z FNV całych punktów: zmiana wariantu po aktualizacji zaczyna nowe rozdanie bez utraty odpowiedzi.

## Decyzje dla właściciela
Brak decyzji produktowych w tej recenzji. 001 rozstrzyga rola 06 (merytoryczne, ADR-24; rekomendacja (a)); 002 i 004 to decyzje procesowe agenta w sesji naprawy (rekomendacje wyżej). Decyzje recenzenta: `docs/decyzje/CT.md` (D-840…D-842).

## Proponowane polecenie naprawy
`node tools/assemble.mjs 08-programista --tryb fix --zadania 08-programista-001,08-programista-002` (001 po decyzji roli 06 co do opcji; 003 i 004 do backlogu z wersją).
