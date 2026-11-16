# Kontrola zastępcza przekładów 8 szablonów HN (sesja HY, 2026-11-16)

Kontekst: rola 09-lokalizacja, polecenie `origin/koordynacja:docs/koordynacja/polecenia/HY.md` @ 7e2246af. Przedmiot: przekłady agenta (D-1692, sesja HN; poprawki HU) szablonów SC-07, 10, 15, 17, 20, 23, 24, 31 na de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant (10 × 25 = 250 pozycji) oraz tytuł SC-04 w de, es, fr, it, pt, pt-BR, vi (7 pozycji). Wzór: `kontrola-zastepcza-hi.md`. Decyzje: `docs/decyzje/HY.md` (D-1810…D-1818). Przegląd jest zastępczy (D-027 biblioteki, decyzja właściciela 2026-11-03); przegląd eksperta nastąpi, gdy aplikacja zyska użytkowników.

## Metoda (D-1810)

- **(a) przekład zwrotny:** dwa osobne agenty w świeżym kontekście (A: de, es, fr, it, pt; B: ja, ko, pt-BR, vi, zh-Hant), bez pl/en i bez zamierzonego sensu. Wejście i wynik: `dowody/hy-2026-11-16/zwrotny-wejscie-{a,b}.md`, `zwrotny-wynik-{a,b}.md`. Wynik porównałem z en/pl w tej sesji. Znaczniki `{{n:…}}`, `{{w:…}}` i klucze `{{t:…}}` sprawdza mechanicznie `docs/tresci/narzedzia/hn-kontrola-przekladow.mjs`: **88/88 plików OK** po poprawkach. W kolumnie (a) „zgodne” oznacza sens zgodny z en, a „⚠” uwagę agenta, którą rozstrzyga kolumna Werdykt. Uwagi agenta o naturalności to opinia modelu, nie źródło.
- **(b) spójność:** skrypt porównuje każdą formę `{{t:klucz|forma}}` z 8 szablonów z resztą `content/<j>/` (`dowody/…/b-spojnosc.txt`: 265 form, 18 nowych). Formy zostawione mimo uwagi (a) mają policzone wystąpienia poza 8 szablonami (`b-zostaje.txt`). „nowe” w kolumnie (b) to forma, która nie występuje nigdzie indziej w języku. Wszystkie takie formy to nazwa hasła z `terms-nazwy.yaml` albo liczba pojedyncza formy już używanej, z wyjątkiem es „tirará” i pt „larga…”, które poprawiłem.
- **(c) źródło w języku docelowym:** glosariusz POKER Q'z (`pokerqz.com/<j>/tools/glossary/<hasło>`, 30 haseł × 9 kodów; zh-TW dla zh-Hant, pt wspólne dla pt i pt-BR) oraz GGPoker poker-terms (de, es, fr, vi, zh-tw). Strony pobrałem `curl` 2026-11-16 (228 stron z kodem 200, 42 z kodem 404), a każdą formę dopasował skrypt z cytatem wiersza źródła (`c-zrodla-auto.txt`). Wynik: **320 z 380 różnych form ma trafienie** (292 dokładne, 28 przez rdzeń, co jest słabszym dowodem), 60 nie ma żadnego. Dla tych 60 form `c-brak-zrodlo-wczesniejsze.tsv` podaje wpis źródła z wcześniejszej fali w komentarzu `terms-nazwy.yaml` (plik:linia) albo „—”, czyli „brak źródła”. Wszystkie źródła są na szczeblu 4.
- **Werdykt** brzmi „zmiana” tylko wtedy, gdy (a) wskazuje błąd sensu albo gramatyki i (b) to potwierdza. W pozostałych przypadkach brzmi „zostaje (a+b)”.
- **Analogia z Treningiem (D-191):** `lkarwowski494/trening` @ 2d97581, odczyt 2026-11-16. Trening nie ma przeglądu przekładu terminów pokerowych, więc stosuję metodę HI (D-1640).

## Wynik

| Język | Pozycje | (a) ⚠ | Zmiany | Zmienione pozycje |
|---|---|---|---|---|
| de | 26 | 17 | 1 | sc-04/situation |
| es | 26 | 12 | 4 | sc-23/d0/best-hand, sc-23/d0/other-hand, sc-31/d0/fold, sc-04/situation |
| fr | 26 | 10 | 2 | sc-23/d0/best-hand, sc-04/situation |
| it | 26 | 11 | 2 | sc-23/situation, sc-04/situation |
| ja | 25 | 21 | 0 | — |
| ko | 25 | 17 | 1 | sc-23/d0/other-hand |
| pt | 26 | 18 | 7 | sc-07/situation, sc-07/d0/fold, sc-23/situation, sc-23/d0/best-hand, sc-23/d0/other-hand, sc-31/d0/fold, sc-04/situation |
| pt-BR | 26 | 10 | 2 | sc-31/d0/fold, sc-04/situation |
| vi | 26 | 6 | 2 | sc-17/d0/fold, sc-04/situation |
| zh-Hant | 25 | 5 | 0 | — |

Razem 257 pozycji i 21 zmian w 17 plikach, 21 wierszy. pl i en są bez zmian. es-419 dziedziczy poprawki es jako nakładka (`packages/jezyki/src/jezyki.ts:17`).

### Zmiany (przed → po)

| Pozycja | Przed | Po | Powód | Decyzja |
|---|---|---|---|---|
| de, es, fr, it, pt, pt-BR, vi / SC-04 / situation | jedno zdanie z „;” (tytuł 82–129 znaków ważonych) | podział w miejscu średnika, słowa bez zmian | SC-04: tytuł > 68; zmierzone przed/po w `sc04-tytul.txt`: de 58, es 52, fr 62, it 47, pt 43, pt-BR 48, vi 27 (≤ 68; de i fr > 54, więc przy 320 pt mniejszy styl z D-1730) | D-1811 |
| pt / SC-07 / situation | „O Button fez abertura, o small blind desistiu e fez call.” | „Fez call depois de o Button fazer abertura e de o small blind desistir.” | (a): podmiot „small blind” zarówno spasował, jak i sprawdził, co jest błędem sensu | D-1812 |
| pt / SC-07 / fold | „…mas as mãos mais fracas … larga.” | „…mas desiste das mãos mais fracas …” | dwa terminy na fold w jednej pozycji; poza 8 szablonami „{{t:fold\|larg…” 14×, „desist…” 791× | D-1812 |
| pt / SC-23 / situation, best-hand, other-hand | largará / largar (5 miejsc) | desistirá com / desistir / desiste | jw. | D-1812 |
| es / SC-23 / best-hand, other-hand | tirará / tirar (4 miejsca) | se retirará / retirarse / se retira | sytuacja tego samego szablonu używa „se retirará”; poza 8 szablonami retir… 796× | D-1813 |
| es, pt, pt-BR / SC-31 / fold | „también/também contra” | „incluso/mesmo contra” | en „even against”; (a) dało „also against” | D-1814 |
| it / SC-23 / situation | „Supponi che … chiamerà … folderà” | „… chiami … foldi” | tryb łączący po „Supponi che” (5× w innych scenariuszach) | D-1815 |
| fr / SC-23 / best-hand | „votre adversaire en a moins de combinaisons” | „… a moins de combinaisons de ces mains” | zbędne „en” | D-1815 |
| ko / SC-23 / other-hand | 가리지 않는 („nie zakrywa”) | 블록하지 않는 („nie blokuje”) | 블록하 13× w `content/ko/`; 가리 tylko w 가리키는 | D-1815 |
| vi / SC-17 / fold | „bạn đã cần khoảng …” | „bạn cần tới khoảng …” | „đã” czytane jako czas przeszły | D-1815 |

### Uwagi (a) bez zmiany

- **Cecha tekstu pl/en, nie przekładu (D-1817, do roli 06):** 93 pozycje we wszystkich językach. Chodzi o „więcej blefów niż wymagana equity” (porównanie liczby z udziałem), „udział … jaki podaje rozdanie” (czytane jako karty w ręce), „para z wysoką kartą”, „backdoor z kartą wyższą niż board” (jeden warunek czy dwa), goły `{{w:stol}}` w SC-10, „c-bets” zwykłym tekstem w SC-15 fold, „stawia małym c-betem” (ja/ko „Cベットでベット”) i opis nut flush („najwyższy kolor”). Poprawka tylko w przekładzie rozjechałaby się z pl/en, a polecenie zabrania zmian pl/en.
- **Forma używana w starszej treści języka (D-1816):** 38 pozycji, w tym 18 łącznie z D-1817. Przykłady: de „Stack einzahlen” (19×), es „entrega” (9×), fr „l'équilibre” (38×), ja „{{w:rywal}}の相手” (24×), pt „pagar” (836×), pt-BR „fez abertura” (7×). Pełna lista z wzorcami: `b-zostaje.txt`.

### [DO USTALENIA] — przegląd eksperta przy użytkownikach (D-1818)

| Język | Termin | Forma | Stan źródeł |
|---|---|---|---|
| vi | top-pair | đôi cao nhất (SC-20 situation; 50× poza 8 szablonami) | GGPoker vi używa „top pair” („top pair là một cặp bài gồm một lá bài tẩy và lá bài có thứ hạng cao nhất trên bàn”); wcześniejsze źródło D: „đôi cao nhất” to wyższa para w dwóch parach (`content/vi/terms-nazwy.yaml`, komentarz) |
| vi | combo | tổ hợp (SC-23) | brak źródła; źródło A: „tổ hợp” = układ 5 kart; już `[DO USTALENIA]` w `terms-nazwy.yaml` |
| it | combo, open | combo, apertura | brak źródła (C ma tylko „Open Raise”); już `[DO USTALENIA]` |
| zh-Hant | out-of-position | 無位置 | brak trafienia w POKER Q'z/GG; formy w treści: 無位置×24, 沒有位置×17 |

### Dowody

- `dowody/hy-2026-11-16/`: `zwrotny-*`, `b-spojnosc.txt`, `b-zostaje.txt`, `c-zrodla-auto.txt`, `c-brak-zrodlo-wczesniejsze.tsv`, `sc04-tytul.txt`, `d043.md` (35 baz, 62 580 identyfikatorów przed i po, pusty `diff`, zmienione wyłącznie oczekiwane pola scenariuszy), `ci.md`.
- Narzędzie do pomiaru tytułu: `docs/lokalizacja/narzedzia/hy-tytul.ts.txt`.

## Tabela pozycji

Kolumna (c) podaje liczbę form `{{t:…}}` w pozycji, które mają trafienie w przeczytanym źródle, oraz formy bez trafienia (klucz:forma). „—” oznacza, że pozycja nie zawiera terminu.

### de (zmiany: 1)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-07/d0/call | ⚠ | zgodne | 12/12 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | zgodne | 4/5; brak: value:auf Value | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/call | ⚠ | zgodne | 5/6; brak: value:auf Value | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/fold | ⚠ | zgodne | 5/6; brak: value:auf Value | zostaje (a+b); forma w użyciu (D-1816) |
| sc-15/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-15/d0/call | ⚠ | zgodne | 12/13; brak: mdf:MDF | zostaje (a+b); forma w użyciu (D-1816) |
| sc-15/d0/fold | ⚠ | zgodne | 8/9; brak: mdf:MDF | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-17/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 13/13 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-20/d0/bet-big | ⚠ | zgodne | 6/6 | zostaje (a+b); forma w użyciu (D-1816) |
| sc-20/d0/bet-small | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-23/situation | ⚠ | zgodne | 9/9 | zostaje (a+b); forma w użyciu (D-1816) |
| sc-23/d0/best-hand | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-23/d0/other-hand | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-24/situation | ⚠ | zgodne | 4/5; brak: bet:Bets | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 8/9; brak: bet:Bets | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-24/d0/fold | ⚠ | zgodne | 13/14; brak: bet:Bets | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-31/situation | ⚠ | zgodne | 5/7; brak: raise:raist, bet:Bets | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | ⚠ | zgodne | 10/11; brak: bet:Bets | zostaje (a+b); forma w użyciu (D-1816) |
| sc-31/d0/fold | ⚠ | zgodne | 11/12; brak: bet:Bets | zostaje (a+b); forma w użyciu (D-1816) |
| sc-04/situation | tytul (SC-04) | zgodne | 2/5; brak: utg:UTG, open:eröffnest, check:checken | zmiana (D-1811) |

### es (zmiany: 4)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | zgodne | zgodne | 7/8; brak: check:pasas | zostaje (a+b) |
| sc-07/d0/call | ⚠ | zgodne | 11/12; brak: call:Pagas | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | zgodne | zgodne | 2/5; brak: 4-bet:4-bet, value:por valor | zostaje (a+b) |
| sc-10/d0/call | zgodne | zgodne | 2/6; brak: 4-bet:4-bet, value:por valor, call:pagas | zostaje (a+b) |
| sc-10/d0/fold | ⚠ | zgodne | 3/6; brak: 4-bet:4-bet, value:por valor | zostaje (a+b); forma w użyciu (D-1816) |
| sc-15/situation | zgodne | zgodne | 5/6; brak: check:pasas | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 12/13; brak: call:Pagas | zostaje (a+b) |
| sc-15/d0/fold | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-17/situation | zgodne | zgodne | 5/6; brak: check:pasas | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | nowe: call:Pagar | 12/13; brak: call:pagas | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-20/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-23/situation | zgodne | zgodne | 9/9 | zostaje (a+b) |
| sc-23/d0/best-hand | ⚠ | zgodne | 5/7; brak: combo:combinaciones | zmiana (D-1813) |
| sc-23/d0/other-hand | ⚠ | nowe: blocker:bloqueador | 6/7; brak: blocker:bloqueador | zmiana (D-1813) |
| sc-24/situation | ⚠ | zgodne | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | nowe: call:Pagar | 8/9; brak: value:por valor | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 14/14 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-31/situation | ⚠ | zgodne | 7/7 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | zgodne | nowe: call:Pagar | 11/11 | zostaje (a+b) |
| sc-31/d0/fold | ⚠ | zgodne | 12/12 | zmiana (D-1814) |
| sc-04/situation | tytul (SC-04) | zgodne | 2/5; brak: utg:UTG, open:abres, check:pasará | zmiana (D-1811) |

### fr (zmiany: 2)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | ⚠ | zgodne | 8/8 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/call | ⚠ | zgodne | 12/12 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-10/d0/call | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-10/d0/fold | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-15/situation | ⚠ | zgodne | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/d0/call | zgodne | zgodne | 13/13 | zostaje (a+b) |
| sc-15/d0/fold | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 13/13 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 4/5; brak: top-pair:top paire | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-23/situation | zgodne | nowe: suited:assorti, suited:assortis | 9/9 | zostaje (a+b) |
| sc-23/d0/best-hand | ⚠ | zgodne | 7/7 | zmiana (D-1815) |
| sc-23/d0/other-hand | zgodne | nowe: blocker:bloqueur | 7/7 | zostaje (a+b) |
| sc-24/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-24/d0/call | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 14/14 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-31/situation | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-31/d0/call | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 12/12 | zostaje (a+b) |
| sc-04/situation | tytul (SC-04) | zgodne | 3/5; brak: utg:UTG, open:ouvrez | zmiana (D-1811) |

### it (zmiany: 2)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | zgodne | zgodne | 7/8; brak: open:aperto | zostaje (a+b) |
| sc-07/d0/call | ⚠ | zgodne | 9/12; brak: bluff:bluff, draw:progetto | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | zgodne | zgodne | 9/11; brak: draw:progetto | zostaje (a+b) |
| sc-10/situation | zgodne | zgodne | 3/4; brak: open:aperto | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | zgodne | 4/5; brak: call:chiameranno | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/call | ⚠ | zgodne | 5/6; brak: call:chiameranno | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/fold | zgodne | zgodne | 5/6; brak: call:chiameranno | zostaje (a+b) |
| sc-15/situation | zgodne | zgodne | 5/6; brak: open:apertura | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 12/13; brak: bluff:bluff | zostaje (a+b) |
| sc-15/d0/fold | ⚠ | zgodne | 8/9; brak: bluff:bluff | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/situation | zgodne | zgodne | 5/6; brak: open:apertura | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 10/11; brak: draw:progetto | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 11/13; brak: draw:progetto | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 3/5; brak: top-pair:top pair, flush-draw:progetto di colore | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 3/6; brak: flush-draw:progetto di colore, bet:Punti, draw:progetto | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 4/8; brak: flush-draw:progetto di colore, draw:progetto, bet:punti | zostaje (a+b) |
| sc-23/situation | ⚠ | zgodne | 7/9; brak: bluff:bluff | zmiana (D-1815) |
| sc-23/d0/best-hand | zgodne | zgodne | 2/7; brak: bluff:bluff, combo:combo, call:chiamerà, fold:folderà | zostaje (a+b) |
| sc-23/d0/other-hand | zgodne | zgodne | 3/7; brak: bluff:bluff, call:chiamerà, fold:folderà | zostaje (a+b) |
| sc-24/situation | ⚠ | zgodne | 3/5; brak: bluff:bluff | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 6/9; brak: bluff:bluff | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 11/14; brak: bluff:bluff | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/situation | ⚠ | zgodne | 4/7; brak: bet:punti, bluff:bluff | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | zgodne | zgodne | 8/11; brak: bluff:bluff | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 10/12; brak: bluff:bluff | zostaje (a+b) |
| sc-04/situation | tytul (SC-04) | zgodne | 2/5; brak: utg:UTG, open:apri, call:chiamerà | zmiana (D-1811) |

### ja (zmiany: 0)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | ⚠ | zgodne | 8/8 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/call | ⚠ | nowe: backdoor:バックドア | 12/12 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-07/d0/fold | ⚠ | nowe: backdoor:バックドア | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | nowe: 4-bet:4ベット | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/call | ⚠ | nowe: 4-bet:4ベット | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/fold | ⚠ | nowe: 4-bet:4ベット | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/situation | ⚠ | zgodne | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/d0/call | ⚠ | zgodne | 13/13 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-15/d0/fold | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-17/situation | ⚠ | zgodne | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/fold | ⚠ | zgodne | 11/11 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-17/d0/call | ⚠ | zgodne | 13/13 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-20/situation | zgodne | zgodne | 4/5; brak: top-pair:トップペア | zostaje (a+b) |
| sc-20/d0/bet-big | ⚠ | zgodne | 6/6 | zostaje (a+b); forma w użyciu (D-1816) |
| sc-20/d0/bet-small | ⚠ | zgodne | 8/8 | zostaje (a+b); forma w użyciu (D-1816) |
| sc-23/situation | zgodne | nowe: suited:スーテッド | 9/9 | zostaje (a+b) |
| sc-23/d0/best-hand | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-23/d0/other-hand | ⚠ | zgodne | 7/7 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/situation | ⚠ | zgodne | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-24/d0/fold | ⚠ | zgodne | 14/14 | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-31/situation | ⚠ | zgodne | 7/7 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | ⚠ | zgodne | 11/11 | zostaje (a+b); forma w użyciu (D-1816) |
| sc-31/d0/fold | ⚠ | zgodne | 12/12 | zostaje (a+b); forma w użyciu (D-1816) |

### ko (zmiany: 1)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | ⚠ | zgodne | 6/8; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/call | ⚠ | nowe: backdoor:백도어 | 8/12; brak: c-bet:C벳, bet:베팅, bluff:블러프 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | ⚠ | nowe: backdoor:백도어 | 8/11; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | nowe: 4-bet:4벳 | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/call | ⚠ | nowe: 4-bet:4벳 | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/fold | ⚠ | nowe: 4-bet:4벳 | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/situation | ⚠ | zgodne | 4/6; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/d0/call | ⚠ | zgodne | 6/13; brak: c-bet:C벳, bet:베팅, bluff:블러프, range:레인지 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/d0/fold | ⚠ | zgodne | 5/9; brak: c-bet:C벳, bet:베팅, bluff:블러프 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/situation | ⚠ | zgodne | 4/6; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/fold | ⚠ | zgodne | 8/11; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 10/13; brak: c-bet:C벳, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 3/5; brak: top-pair:탑 페어, bet:베팅 | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 4/6; brak: bet:베팅 | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 5/8; brak: bet:베팅 | zostaje (a+b) |
| sc-23/situation | zgodne | nowe: suited:수티드 | 7/9; brak: bluff:블러프 | zostaje (a+b) |
| sc-23/d0/best-hand | zgodne | zgodne | 6/7; brak: bluff:블러프 | zostaje (a+b) |
| sc-23/d0/other-hand | ⚠ | zgodne | 5/7; brak: bluff:블러프 | zmiana (D-1815) |
| sc-24/situation | ⚠ | zgodne | 1/5; brak: bluff:블러프, bet:베팅 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 3/9; brak: bet:베팅, bluff:블러프 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 7/14; brak: bet:베팅, bluff:블러프 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/situation | ⚠ | zgodne | 2/7; brak: bet:베팅, bluff:블러프 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | zgodne | zgodne | 3/11; brak: bet:베팅, bluff:블러프 | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 6/12; brak: bet:베팅, bluff:블러프 | zostaje (a+b) |

### pt (zmiany: 7)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | ⚠ | zgodne | 6/8; brak: open:abertura, fold:desistir | zmiana (D-1812) |
| sc-07/d0/call | ⚠ | zgodne | 12/12 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-07/d0/fold | ⚠ | zgodne | 9/11; brak: fold:Desiste, fold:desiste | zmiana (D-1812) |
| sc-10/situation | ⚠ | zgodne | 1/4; brak: open:abertura, cutoff:CO, fold:desistiram | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/4bet | ⚠ | zgodne | 4/5; brak: call:pagar | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/call | ⚠ | zgodne | 5/6; brak: call:pagar | zostaje (a+b); forma w użyciu (D-1816) |
| sc-10/d0/fold | ⚠ | zgodne | 4/6; brak: fold:Desistir, call:pagar | zostaje (a+b); forma w użyciu (D-1816) |
| sc-15/situation | zgodne | zgodne | 5/6; brak: open:abertura | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 12/13; brak: fold:desiste | zostaje (a+b) |
| sc-15/d0/fold | ⚠ | zgodne | 7/9; brak: fold:Desistir, fold:desiste | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-17/situation | zgodne | zgodne | 5/6; brak: open:abertura | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 10/11; brak: fold:Desiste | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 13/13 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 4/5; brak: top-pair:top pair | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-23/situation | ⚠ | zgodne | 8/9; brak: fold:desistirá | zmiana (D-1812) |
| sc-23/d0/best-hand | ⚠ | zgodne | 5/7; brak: call:pagar, fold:desistir | zmiana (D-1812) |
| sc-23/d0/other-hand | ⚠ | nowe: blocker:bloqueador | 5/7; brak: call:pagar, fold:desistir | zmiana (D-1812) |
| sc-24/situation | ⚠ | zgodne | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 8/9; brak: value:de valor | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-24/d0/fold | ⚠ | zgodne | 12/14; brak: fold:Desistir, fold:desistir | zostaje (a+b); cecha pl/en → 06 (D-1817) + forma w użyciu (D-1816) |
| sc-31/situation | ⚠ | zgodne | 7/7 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-31/d0/fold | ⚠ | zgodne | 10/12; brak: fold:Desistir, fold:desistir | zmiana (D-1814) |
| sc-04/situation | tytul (SC-04) | zgodne | 3/5; brak: utg:UTG, open:abertura | zmiana (D-1811) |

### pt-BR (zmiany: 2)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | ⚠ | zgodne | 5/8; brak: open:abertura, fold:desistiu, call:pagou | zostaje (a+b); forma w użyciu (D-1816) |
| sc-07/d0/call | zgodne | zgodne | 10/12; brak: draw:projeto | zostaje (a+b) |
| sc-07/d0/fold | zgodne | zgodne | 7/11; brak: fold:desiste, draw:projeto | zostaje (a+b) |
| sc-10/situation | zgodne | zgodne | 1/4; brak: open:abertura, cutoff:CO, fold:desistiram | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | zgodne | 4/5; brak: call:pagar | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/call | ⚠ | zgodne | 5/6; brak: call:pagar | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/fold | ⚠ | zgodne | 4/6; brak: fold:Desistir, call:pagar | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/situation | zgodne | zgodne | 4/6; brak: call:pagou, open:abertura | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 12/13; brak: fold:desiste | zostaje (a+b) |
| sc-15/d0/fold | zgodne | zgodne | 7/9; brak: fold:Desistir, fold:desiste | zostaje (a+b) |
| sc-17/situation | zgodne | zgodne | 4/6; brak: call:pagou, open:abertura | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 9/11; brak: fold:desiste, draw:projeto | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-17/d0/call | ⚠ | zgodne | 10/13; brak: call:Pagar, draw:projeto | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-20/situation | zgodne | zgodne | 3/5; brak: top-pair:top pair, flush-draw:projeto de flush | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 4/6; brak: flush-draw:projeto de flush, draw:projeto | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 5/8; brak: flush-draw:projeto de flush, draw:projeto | zostaje (a+b) |
| sc-23/situation | zgodne | zgodne | 7/9; brak: call:pagar, fold:desistir | zostaje (a+b) |
| sc-23/d0/best-hand | zgodne | zgodne | 5/7; brak: call:pagar, fold:desistir | zostaje (a+b) |
| sc-23/d0/other-hand | zgodne | nowe: blocker:bloqueador | 5/7; brak: call:pagar, fold:desistir | zostaje (a+b) |
| sc-24/situation | ⚠ | zgodne | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/call | ⚠ | zgodne | 7/9; brak: value:de valor, call:Pagar | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 10/14; brak: fold:Desistir, fold:desistir, call:pagar | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/situation | ⚠ | zgodne | 7/7 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/d0/call | zgodne | zgodne | 10/11; brak: call:Pagar | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 8/12; brak: fold:Desistir, call:pagar, fold:desistir | zmiana (D-1814) |
| sc-04/situation | tytul (SC-04) | zgodne | 2/5; brak: utg:UTG, open:abertura, call:call | zmiana (D-1811) |

### vi (zmiany: 2)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-07/d0/call | zgodne | zgodne | 12/12 | zostaje (a+b) |
| sc-07/d0/fold | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | zgodne | 4/5; brak: value:lấy giá trị | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/call | ⚠ | zgodne | 5/6; brak: value:lấy giá trị | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/fold | ⚠ | zgodne | 5/6; brak: value:lấy giá trị | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 13/13 | zostaje (a+b) |
| sc-15/d0/fold | zgodne | zgodne | 9/9 | zostaje (a+b) |
| sc-17/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-17/d0/fold | ⚠ | zgodne | 11/11 | zmiana (D-1815) |
| sc-17/d0/call | zgodne | zgodne | 13/13 | zostaje (a+b) |
| sc-20/situation | zgodne | zgodne | 3/5; brak: top-pair:đôi cao nhất, flush-draw:bài chờ thùng | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 5/6; brak: flush-draw:bài chờ thùng | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 7/8; brak: flush-draw:bài chờ thùng | zostaje (a+b) |
| sc-23/situation | zgodne | nowe: suited:cùng chất | 9/9 | zostaje (a+b) |
| sc-23/d0/best-hand | zgodne | zgodne | 5/7; brak: combo:tổ hợp | zostaje (a+b) |
| sc-23/d0/other-hand | zgodne | nowe: blocker:bài chặn | 7/7 | zostaje (a+b) |
| sc-24/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-24/d0/call | ⚠ | zgodne | 8/9; brak: value:lấy giá trị | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 14/14 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/situation | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-31/d0/call | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 12/12 | zostaje (a+b) |
| sc-04/situation | tytul (SC-04) | zgodne | 4/5; brak: utg:UTG | zmiana (D-1811) |

### zh-Hant (zmiany: 0)

| Pozycja | (a) | (b) | (c) formy ze źródłem | Werdykt |
|---|---|---|---|---|
| sc-07/situation | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-07/d0/call | zgodne | nowe: backdoor:後門 | 12/12 | zostaje (a+b) |
| sc-07/d0/fold | zgodne | nowe: backdoor:後門 | 11/11 | zostaje (a+b) |
| sc-10/situation | zgodne | zgodne | 4/4 | zostaje (a+b) |
| sc-10/d0/4bet | ⚠ | zgodne | 5/5 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/call | ⚠ | zgodne | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-10/d0/fold | ⚠ | zgodne | 6/6 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-15/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-15/d0/call | zgodne | zgodne | 12/13; brak: out-of-position:無位置 | zostaje (a+b) |
| sc-15/d0/fold | zgodne | zgodne | 8/9; brak: out-of-position:無位置 | zostaje (a+b) |
| sc-17/situation | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-17/d0/fold | zgodne | zgodne | 10/11; brak: out-of-position:無位置 | zostaje (a+b) |
| sc-17/d0/call | zgodne | zgodne | 12/13; brak: out-of-position:無位置 | zostaje (a+b) |
| sc-20/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-20/d0/bet-big | zgodne | zgodne | 6/6 | zostaje (a+b) |
| sc-20/d0/bet-small | zgodne | zgodne | 8/8 | zostaje (a+b) |
| sc-23/situation | zgodne | nowe: suited:同花色 | 9/9 | zostaje (a+b) |
| sc-23/d0/best-hand | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-23/d0/other-hand | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-24/situation | zgodne | zgodne | 5/5 | zostaje (a+b) |
| sc-24/d0/call | ⚠ | zgodne | 9/9 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-24/d0/fold | ⚠ | zgodne | 14/14 | zostaje (a+b); cecha pl/en → 06 (D-1817) |
| sc-31/situation | zgodne | zgodne | 7/7 | zostaje (a+b) |
| sc-31/d0/call | zgodne | zgodne | 11/11 | zostaje (a+b) |
| sc-31/d0/fold | zgodne | zgodne | 12/12 | zostaje (a+b) |
