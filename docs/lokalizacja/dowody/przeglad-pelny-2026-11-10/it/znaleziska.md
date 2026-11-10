# Pełny przegląd przekładu — it — 2026-11-10 (sesja AQ, rola 09 audit, tylko dokumenty)

Stan przekładu: gałąź `claude/sleepy-brahmagupta-2065nu` @ 016317e. Źródło: pl (en pomocniczo). Czytający: 13 subagentów w świeżym kontekście (ten sam model co sesja), instrukcja `../instrukcja-subagenta.md`; 0 USD API, workflow `przeglad-tlumaczen.yml` nieuruchamiany. To drugi przegląd AI całości, nie przegląd rodzimego użytkownika języka.

## Liczby

| Część | Zakres | KRYT | WYS | ŚR | NISKIE | Znalezisk | Poprawek |
|---|---|---|---|---|---|---|---|
| it-L1 | m0-l1 m1-l1 m2-l1 m2-l2 m3-l1 m3-l2 m3-l3 m4-l1 m4-l2 | 0 | 0 | 11 | 4 | 15 | 15 |
| it-L2 | m4-l3 m4-l4 m5-l1 m5-l2 m5-l3 m5-l4 | 0 | 0 | 11 | 3 | 14 | 36 |
| it-L3 | m6-l1 m6-l2 m6-l3 m7-l1 m7-l2 | 0 | 0 | 13 | 7 | 20 | 20 |
| it-L4 | m7-l3 m7-l4 m8-l1 m8-l2 m8-l3 m8-l4 | 0 | 0 | 4 | 4 | 8 | 8 |
| it-L5 | m9-l1 m9-l2 m9-l3 m9-l4 m10-l1 | 0 | 0 | 4 | 2 | 6 | 24 |
| it-L6 | m10-l2 m10-l3 m10-l4 m11-l1 m11-l2 m11-l3 | 0 | 0 | 28 | 58 | 86 | 86 |
| it-L7 | m12-l1 m12-l2 m12-l3 m12-l4 m13-l1 m13-l2 m13-l3 | 0 | 0 | 7 | 23 | 30 | 30 |
| it-R1 | rules.yaml R-M0…R-M7 | 0 | 0 | 7 | 2 | 9 | 9 |
| it-R2 | rules.yaml R-M8…R-M13 | 0 | 0 | 4 | 1 | 5 | 5 |
| it-X1 | exams m0–m6 | 0 | 0 | 6 | 6 | 12 | 12 |
| it-X2 | exams m7–m13 | 0 | 0 | 18 | 3 | 21 | 21 |
| it-U | interfejs, areas, modules, spots, helplines, metadane sklepu | 0 | 0 | 2 | 4 | 6 | 6 |
| it-T | terms-def, terms-nazwy | 0 | 0 | 4 | 0 | 4 | 3 |
| it-S | uzupełnienia koordynującego (wzorce czytających w miejscach nieobjętych; `uzupelnienia.tsv`) | – | – | – | – | – | 16 |
| **Razem** | | **0** | **0** | **119** | **117** | **236** | **291** |

Poprawki do nałożenia: `poprawki-it.json` (291; wg wagi: ŚR 172, NISKIE 119) — format `docs/lokalizacja/narzedzia/poprawki.mjs` (jezyk, cel, stary, nowy, waga, powod, grupa); `stary` występuje w pliku `cel` dokładnie raz na stanie 016317e. Jedno znalezisko może mieć kilka poprawek (wzorzec rozpisany na wystąpienia), a jedna poprawka łączyć dwa znaleziska w tym samym fragmencie.

## Rozstrzygnięcia koordynującego (sesja AQ; terminologiczne — do weta)

**D-430 (2026-11-10, it): formy terminów w treści idą za nazwą z `content/it/terms-nazwy.yaml`.** Czytający niezależnie zgłosili ten sam wzorzec w 9 z 13 części: jeden termin nazwany dwojako w korpusie. Przyjęte poprawki ujednolicają do nazwy z pliku nazw: top-pair „coppia massima” → **top pair**; oesd „progetto di scala bilaterale” → **OESD**; dry „asciutto” → **secco**; maniac „maniaco” → **maniac**; exploit „sfruttamento” → **exploit**; side-pot „piatto laterale” → **piatto secondario**; payout „pagamenti” → **premi**; chips „chip/fiche” (l. mn.) → **fiches**; wetness „umidità” → **bagnatura**; open „open” → **apertura**; fold „passare/scartare/lasciare” → **foldare**. Miejsca z tym samym wzorcem, których czytający nie objęli poprawką (zostawili w „Do sprawdzenia”), uzupełnia grupa `it-S` (16 poprawek, lista `uzupelnienia.tsv`); po nałożeniu całości na kopię w korpusie it zostaje 0 wystąpień „coppia massima”, „scala bilaterale”, „maniaco”, „sfruttamento”, „asciutt-”, „piatto laterale” poza komentarzami `terms-nazwy.yaml` (grep na kopii, 2026-11-10). Powód: CLAUDE.md „jedna nazwa na jedno pojęcie”; znacznik bez formy renderuje nazwę z pliku nazw, więc forma opisowa obok daje uczącemu się dwa słowa na jedno pojęcie. Odrzucone: (b) zmienić nazwy w `terms-nazwy.yaml` na formy tłumacza („asciutto”, „coppia massima”) — „coppia massima” nie ma przeczytanego źródła (komentarz pliku nazw: „brak w źródłach”), a „secco” ma większość w lekcjach (29:17); (c) zostawić obie formy — sprzeczne z zasadą spójności. Uwaga dla nakładającego: `fiche` w liczbie pojedynczej (m10-l1:15, m11-l3:39) zostaje — to poprawna l. poj. od „fiches”.

**Bez rozstrzygnięcia (zostaje `[DO USTALENIA]`, wymaga przeczytanego źródła albo rodzimego użytkownika):**
- it-T-04: nazwy `royal-flush` „scala reale” / `straight-flush` „scala colore” — we włoskim „scala reale” bywa nazwą straight flusha, a royal to „scala reale massima”; plik nazw sam oznacza to `[DO USTALENIA]`. Bez poprawki (zmiana nazwy układu w m0 to decyzja ze źródłem szczebla ≥ 4, rola 06).
- Rodzaj „c-bet” (lekcje: męski 106×, żeński 27×; `terms-nazwy`: ż.), „3-bet/4-bet”, „value bet”, „backdoor”; „jack” vs „fante”; „rivale” vs „avversario”; „call” (nazwa) wobec „chiamata/chiamare” (ok. 690 form) — spójne w obrębie pliku, różne między plikami; poprawki tylko tam, gdzie czytający zgłosił je jako znalezisko (np. it-L2 m5-l3 c-bet → ż.).
- Rodzajnik przed procentem ze znacznika („in circa {{n:…}} dei casi” → „in circa il …”): poprawki są tam, gdzie zgłosił je czytający (it-L2, L3, L6, L7, X1); wzorzec występuje szerzej (it-L1, it-R2 „Do sprawdzenia”). Rodzajnik „il/l'” zależy od wartości w `content/numbers.yaml` (8% → „l'8%”) — przy zmianie liczby trzeba go sprawdzić ponownie; trwałe rozwiązanie (konstrukcja bez rodzajnika albo forma w znaczniku) to pytanie do roli 09 build.

**Kontrola łączna (`scal.py it`):** wszystkie poprawki nałożone na kopię w pamięci, 0 pominiętych; YAML/JSON każdego zmienionego pliku parsuje się; zestaw `{{n:…}}` i `[[…]]` każdego pliku = źródło pl. Różnica kluczy `{{t:…}}` wobec pl po poprawkach: tylko `lessons/m9-l3-rozmiar-geometryczny.md` (brak jednego `t:bet`, tak samo w en — stan sprzed przeglądu, nie znalezisko czytającego); dwie różnice sprzed przeglądu (m4-l4 `t:fold` +1, m8-l1 `t:call` +1) zniknęły po poprawkach it-L2/it-L4.

## Pokrycie jednostek (65 z `jednostki()` w `scripts/i18n/wspolne.mjs:147` + 2 poza listą)

| Nr | Jednostka | Przejrzana w całości | Przez kogo |
|---|---|---|---|
| 1 | `apps/mobile/src/i18n/locales/it.json` | tak | it-U |
| 2 | `content/it/areas.yaml` | tak | it-U |
| 3 | `content/it/exams/m0.yaml` | tak | it-X1 |
| 4 | `content/it/exams/m1.yaml` | tak | it-X1 |
| 5 | `content/it/exams/m10.yaml` | tak | it-X2 |
| 6 | `content/it/exams/m11.yaml` | tak | it-X2 |
| 7 | `content/it/exams/m12.yaml` | tak | it-X2 |
| 8 | `content/it/exams/m13.yaml` | tak | it-X2 |
| 9 | `content/it/exams/m2.yaml` | tak | it-X1 |
| 10 | `content/it/exams/m3.yaml` | tak | it-X1 |
| 11 | `content/it/exams/m4.yaml` | tak | it-X1 |
| 12 | `content/it/exams/m5.yaml` | tak | it-X1 |
| 13 | `content/it/exams/m6.yaml` | tak | it-X1 |
| 14 | `content/it/exams/m7.yaml` | tak | it-X2 |
| 15 | `content/it/exams/m8.yaml` | tak | it-X2 |
| 16 | `content/it/exams/m9.yaml` | tak | it-X2 |
| 17 | `content/it/lessons/m0-l1-uklady.md` | tak | it-L1 |
| 18 | `content/it/lessons/m1-l1-przebieg.md` | tak | it-L1 |
| 19 | `content/it/lessons/m10-l1-statystyki.md` | tak | it-L5 |
| 20 | `content/it/lessons/m10-l2-typy-graczy.md` | tak | it-L6 |
| 21 | `content/it/lessons/m10-l3-odejscie-od-bazy.md` | tak | it-L6 |
| 22 | `content/it/lessons/m10-l4-rake.md` | tak | it-L6 |
| 23 | `content/it/lessons/m11-l1-push-fold.md` | tak | it-L6 |
| 24 | `content/it/lessons/m11-l2-sprawdzanie.md` | tak | it-L6 |
| 25 | `content/it/lessons/m11-l3-icm.md` | tak | it-L6 |
| 26 | `content/it/lessons/m12-l1-wariancja.md` | tak | it-L7 |
| 27 | `content/it/lessons/m12-l2-decyzja-wynik.md` | tak | it-L7 |
| 28 | `content/it/lessons/m12-l3-tilt.md` | tak | it-L7 |
| 29 | `content/it/lessons/m12-l4-bankroll.md` | tak | it-L7 |
| 30 | `content/it/lessons/m13-l1-raport.md` | tak | it-L7 |
| 31 | `content/it/lessons/m13-l2-powtorki.md` | tak | it-L7 |
| 32 | `content/it/lessons/m13-l3-przeglad.md` | tak | it-L7 |
| 33 | `content/it/lessons/m2-l1-outy.md` | tak | it-L1 |
| 34 | `content/it/lessons/m2-l2-pot-odds.md` | tak | it-L1 |
| 35 | `content/it/lessons/m3-l1-pozycja.md` | tak | it-L1 |
| 36 | `content/it/lessons/m3-l2-rece-startowe.md` | tak | it-L1 |
| 37 | `content/it/lessons/m3-l3-zakresy-otwarc.md` | tak | it-L1 |
| 38 | `content/it/lessons/m4-l1-3bet.md` | tak | it-L1 |
| 39 | `content/it/lessons/m4-l2-obrona-bb.md` | tak | it-L1 |
| 40 | `content/it/lessons/m4-l3-wobec-3betu.md` | tak | it-L2 |
| 41 | `content/it/lessons/m4-l4-limperzy.md` | tak | it-L2 |
| 42 | `content/it/lessons/m5-l1-tekstury.md` | tak | it-L2 |
| 43 | `content/it/lessons/m5-l2-przewagi.md` | tak | it-L2 |
| 44 | `content/it/lessons/m5-l3-czestotliwosc-rozmiar.md` | tak | it-L2 |
| 45 | `content/it/lessons/m5-l4-bez-pozycji.md` | tak | it-L2 |
| 46 | `content/it/lessons/m6-l1-mdf-alpha.md` | tak | it-L3 |
| 47 | `content/it/lessons/m6-l2-sprawdzenie.md` | tak | it-L3 |
| 48 | `content/it/lessons/m6-l3-check-raise.md` | tak | it-L3 |
| 49 | `content/it/lessons/m7-l1-druga-beczka.md` | tak | it-L3 |
| 50 | `content/it/lessons/m7-l2-polaryzacja.md` | tak | it-L3 |
| 51 | `content/it/lessons/m7-l3-implied-odds.md` | tak | it-L4 |
| 52 | `content/it/lessons/m7-l4-probe-obrona.md` | tak | it-L4 |
| 53 | `content/it/lessons/m8-l1-value.md` | tak | it-L4 |
| 54 | `content/it/lessons/m8-l2-ile-blefow.md` | tak | it-L4 |
| 55 | `content/it/lessons/m8-l3-blokery.md` | tak | it-L4 |
| 56 | `content/it/lessons/m8-l4-bluff-catching.md` | tak | it-L4 |
| 57 | `content/it/lessons/m9-l1-spr.md` | tak | it-L5 |
| 58 | `content/it/lessons/m9-l2-zaangazowanie.md` | tak | it-L5 |
| 59 | `content/it/lessons/m9-l3-rozmiar-geometryczny.md` | tak | it-L5 |
| 60 | `content/it/lessons/m9-l4-plan-trzech-ulic.md` | tak | it-L5 |
| 61 | `content/it/modules.yaml` | tak | it-U |
| 62 | `content/it/rules.yaml` | tak | it-R1 (do R-M7) + R2 (od R-M8) |
| 63 | `content/it/ranges/spots.yaml` | tak | it-U |
| 64 | `content/it/helplines.yaml` | tak | it-U |
| 65 | `content/it/terms-def.yaml` | tak | it-T |
| + | `content/it/terms-nazwy.yaml` | tak | it-T |
| + | `docs/sklep/aso/metadane-fala2.json (it)` | tak | it-U |

Nieprzejrzane: brak (deklaracje pokrycia z zakresami linii: sekcja „Pokrycie” każdego pliku `czesci/it-*.md`).

## Znaleziska

### it-L1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L1-01 | ŚR | content/it/lessons/m1-l1-przebieg.md:52 | `non è un motivo per passare, quando` | `non è un motivo per foldare, quando` | w tym samym pliku fold to wszędzie „foldo/foldare”; „passare” to druga nazwa tego samego zagrania (pl m1-l1-przebieg.md:52 „pasowania”) |
| it-L1-02 | ŚR | content/it/lessons/m1-l1-przebieg.md:95 | `:::note All-in e {{t:side-pot\|piatto laterale}}` | `:::note All-in e {{t:side-pot\|piatto secondario}}` | terms-nazwy.yaml: side-pot = „piatto secondario” (pl m1-l1-przebieg.md:95) |
| it-L1-03 | ŚR | content/it/lessons/m1-l1-przebieg.md:96 | `**{{t:side-pot\|piatto laterale}}** (side pot)` | `**{{t:side-pot\|piatto secondario}}** (side pot)` | terms-nazwy.yaml: side-pot = „piatto secondario” (pl m1-l1-przebieg.md:96) |
| it-L1-04 | NISKIE | content/it/lessons/m1-l1-przebieg.md:81 | `la combinazione migliore vince` | `il punto migliore vince` | „układ” w m0-l1 to konsekwentnie „punto”; „combinazione” jest w lekcjach formą terminu combo (pl m1-l1-przebieg.md:81 „najlepszy układ”) |
| it-L1-05 | ŚR | content/it/lessons/m2-l1-outy.md:111 | `- **{{t:oesd\|Progetto di scala bilaterale}}**, ad es.` | `- **{{t:oesd\|OESD}}**, ad es.` | terms-nazwy.yaml: oesd = „OESD”; źródło też „OESD” (pl m2-l1-outy.md:111) |
| it-L1-06 | ŚR | content/it/lessons/m2-l1-outy.md:126 | `\| {{t:oesd\|Progetto di scala bilaterale}} \| {{n:outs.oesd}} \|` | `\| {{t:oesd\|OESD}} \| {{n:outs.oesd}} \|` | terms-nazwy.yaml: oesd = „OESD” (pl m2-l1-outy.md:126) |
| it-L1-07 | NISKIE | content/it/lessons/m2-l1-outy.md:131 | `il tuo {{t:call}} compra solo una carta` | `la tua {{t:call\|chiamata}} compra solo una carta` | w tym samym pliku rzeczownik call to „la chiamata” (linie 51, 54); tu ten sam termin jako „il call” (pl m2-l1-outy.md:131) |
| it-L1-08 | NISKIE | content/it/lessons/m3-l1-pozycja.md:26 | `K9o chiude facilmente un re` | `K9o centra facilmente un re` | „chiudere” dotyczy domykania drawa; „trafia króla” = „centra” (tak w m3-l2:25, 45) (pl m3-l1-pozycja.md:26) |
| it-L1-09 | NISKIE | content/it/lessons/m3-l2-rece-startowe.md:45 | `attaccare i blind dalla {{t:position\|posizione}}` | `attaccare i blind in {{t:position\|posizione}}` | kalka „z pozycji”; po włosku „in posizione” (terms: in-position) (pl m3-l2-rece-startowe.md:45) |
| it-L1-10 | ŚR | content/it/lessons/m3-l3-zakresy-otwarc.md:77 | `{{t:open\|apre}} in modo ampio quasi quanto il Button` | `{{t:open\|apre}} più o meno largo quanto il Button` | źródło: „podobnie szeroko jak Button” (en „about as wide as”); „quasi quanto” sugeruje węziej niż Button (pl m3-l3-zakresy-otwarc.md:77) |
| it-L1-11 | ŚR | content/it/lessons/m4-l1-3bet.md:48 | `{{t:pocket-pair\|pocket pair}}` | `{{t:pocket-pair\|coppia servita}}` | terms-nazwy.yaml: pocket-pair = „coppia servita” (pl m4-l1-3bet.md:48) |
| it-L1-12 | ŚR | content/it/lessons/m4-l1-3bet.md:48 | `{{t:hole-cards\|carte coperte}}` | `{{t:hole-cards\|carte personali}}` | terms-nazwy.yaml: hole-cards = „carte personali” (tak w m0-l1:81, 104) (pl m4-l1-3bet.md:48) |
| it-L1-13 | ŚR | content/it/lessons/m4-l1-3bet.md:79 | `(in questa soluzione minima, a {{n:pf.open-size.solver-utg}})` | `(che in questa soluzione è minima, a {{n:pf.open-size.solver-utg}})` | źródło: otwarcie jest minimalne („w tym rozwiązaniu minimalnego”, en „a minimum open in this solution”); przekład czyta się jako „w tym minimalnym rozwiązaniu” (pl m4-l1-3bet.md:79) |
| it-L1-14 | ŚR | content/it/lessons/m4-l2-obrona-bb.md:36 | `bisogna risparmiare {{t:chips\|chip}}` | `bisogna risparmiare {{t:chips\|fiches}}` | terms-nazwy.yaml: chips = „fiches” (tak w m1-l1, m2-l2) (pl m4-l2-obrona-bb.md:36) |
| it-L1-15 | ŚR | content/it/lessons/m4-l2-obrona-bb.md:36 | `non risparmiare {{t:chips\|chip}}` | `non risparmiare {{t:chips\|fiches}}` | terms-nazwy.yaml: chips = „fiches” (pl m4-l2-obrona-bb.md:36) |

### it-L2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L2-01 | ŚR | m4-l3-wobec-3betu.md:67 | „per non far scartare le mani più deboli” | „per non far foldare le mani più deboli” | pl m4-l3:67 „żeby nie wyrzucać słabszych rąk Buttona”; „scartare” (odrzucać karty) nie jest w lekcji nazwą pasu, wszędzie indziej „foldare” |
| it-L2-02 | ŚR | m4-l3-wobec-3betu.md:100 | „lasciando più spesso” | „foldando più spesso” | pl m4-l3:100 „przy częstszym pasowaniu”; pas nazwany inaczej niż w reszcie pliku (foldare/fold) |
| it-L2-03 | ŚR | m4-l4-limperzy.md:49 | `{{t:fold\|Folda}}` | `{{t:fold\|Foldo}}` | pl m4-l4:49 „Pasuję” (1. os.); „Folda” to 3. os.; pozostałe opcje w 1. os. („Chiamo”, „Rilancio”) |
| it-L2-04 | ŚR | m4-l4-limperzy.md:58 | `{{t:fold\|Folda}}` | `{{t:fold\|Foldo}}` | pl m4-l4:58 „Pasuję”; jw. |
| it-L2-05 | ŚR | m5-l1-tekstury.md:80 | `{{t:wetness\|umidità}}` | `{{t:wetness\|bagnatura}}` | pl m5-l1:80 „punkty mokrości”; terms-nazwy: wetness = „bagnatura” |
| it-L2-06 | NISKIE | m5-l2-przewagi.md:47 | „puntare spesso, solo poco” | „puntare spesso, ma poco” | pl m5-l2:47 „betować często, tylko mało”; kalka „tylko” |
| it-L2-07 | NISKIE | m5-l2-przewagi.md:98 | „Da dove vengono questi principi” | „Da dove vengono queste regole” | pl m5-l2:98 „Skąd te zasady”; ten sam nagłówek w m4-l3, m4-l4, m5-l3, m5-l4 to „queste regole” |
| it-L2-08 | ŚR | m5-l3-czestotliwosc-rozmiar.md:24, 25, 26, 49, 50, 51, 100, 102, 104, 108, 133 (11×) | `{{t:dry\|asciutto}}` | `{{t:dry\|secco}}` | pl m5-l3 te same linie (`{{t:dry…}}`); terms-nazwy: dry = „secco”; sąsiednie lekcje m5-l1 i m5-l4 mają „secco” — ten sam termin nazwany dwojako w module |
| it-L2-09 | ŚR | m5-l3-czestotliwosc-rozmiar.md:49, 51 | `{{t:top-pair\|coppia massima}}` | `{{t:top-pair}}` (49), `{{t:top-pair\|top pair}}` (51) | pl m5-l3:49, 51; terms-nazwy: top-pair = „top pair” |
| it-L2-10 | ŚR | m5-l3-czestotliwosc-rozmiar.md:122 | „con l'`{{t:wetness\|umidità}}`” | „con la `{{t:wetness\|bagnatura}}`” | pl m5-l3:122 „z mokrością”; terms-nazwy: wetness = „bagnatura” |
| it-L2-11 | ŚR | m5-l3-czestotliwosc-rozmiar.md:39, 40, 88, 100 (2×), 106, 112, 130 | „Il c-bet”, „un c-bet piccolo”, „Un c-bet grande”, „C-bet frequenti, anche piccoli”, „uno grande” | „La c-bet”, „una c-bet piccola”, „Una c-bet grande”, „anche piccole”, „una grande” | pl m5-l3 te same linie; terms-nazwy: c-bet r. ż.; m5-l1:58, m5-l2:69–73 i m5-l4 (ta sama karta ćwiczeń, l. 91–92) mają „la c-bet” — rodzaj terminu niespójny między lekcjami modułu |
| it-L2-12 | NISKIE | m5-l3-czestotliwosc-rozmiar.md:112, 133 (2×) | „materiali di formazione” | „materiali didattici” | pl m5-l3:112, 133 „materiały szkoleniowe”; w m4-l3, m4-l4, m5-l4 to „materiali didattici” |
| it-L2-13 | ŚR | m5-l4-bez-pozycji.md:36, 37, 63, 65, 103 (2×) | „in meno di `{{n:cbet.oop.a94.bet}}` dei casi”, „in circa `{{n:flop.miss.unpaired}}` dei casi”, „è di circa `{{n:flop.miss.two}}`”, „solo in circa `{{n:flop.miss.two}}`” | „in meno del …”, „in circa il …”, „è di circa il …”, „solo in circa il …” | pl m5-l4:36, 37, 63, 65, 103; znaczniki to procenty (numbers.yaml, unit: percent) — po włosku procent wymaga rodzajnika („in circa il 68% dei casi”); to samo zdanie w it m5-l2:96 i m5-l3:130 ma rodzajnik |
| it-L2-14 | ŚR | m5-l4-bez-pozycji.md:32, 35, 36, 37, 53 | `{{t:top-pair\|coppia massima}}` | `{{t:top-pair\|top pair}}` | pl m5-l4 te same linie; terms-nazwy: top-pair = „top pair” |

### it-L3

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L3-01 | ŚR | content/it/lessons/m6-l2-sprawdzenie.md:74 | `per la {{t:top-pair|coppia massima}}` | `per la {{t:top-pair|top pair}}` | termin top-pair: terms-nazwy.yaml „top pair” (r. f); w m7-l1/m7-l2 „top pair”, tu „coppia massima” (pl m6-l2-sprawdzenie.md:74) |
| it-L3-02 | ŚR | content/it/lessons/m6-l3-check-raise.md:82 | `La {{t:top-pair|coppia massima}} con un kicker debole è una mano da` | `La {{t:top-pair|top pair}} con un kicker debole è una mano da` | termin top-pair: terms-nazwy.yaml „top pair” (r. f); w m7-l1/m7-l2 „top pair”, tu „coppia massima” (pl m6-l3-check-raise.md:82) |
| it-L3-03 | ŚR | content/it/lessons/m6-l3-check-raise.md:84 | `La {{t:top-pair|coppia massima}} contro un c-bet piccolo` | `La {{t:top-pair|top pair}} contro un c-bet piccolo` | termin top-pair: terms-nazwy.yaml „top pair” (r. f); w m7-l1/m7-l2 „top pair”, tu „coppia massima” (pl m6-l3-check-raise.md:84) |
| it-L3-04 | ŚR | content/it/lessons/m6-l3-check-raise.md:125 | `la {{t:top-pair|coppia massima}} con un kicker debole, di solito` | `la {{t:top-pair|top pair}} con un kicker debole, di solito` | termin top-pair: terms-nazwy.yaml „top pair” (r. f); w m7-l1/m7-l2 „top pair”, tu „coppia massima” (pl m6-l3-check-raise.md:125) |
| it-L3-05 | ŚR | content/it/lessons/m6-l3-check-raise.md:125 | `delle {{t:top-pair|coppie massime}}` | `delle {{t:top-pair|top pair}}` | termin top-pair: terms-nazwy.yaml „top pair” (r. f); w m7-l1/m7-l2 „top pair”, tu „coppia massima” (pl m6-l3-check-raise.md:125) |
| it-L3-06 | ŚR | content/it/lessons/m6-l3-check-raise.md:26 | `i {{t:oesd|progetti di scala bilaterali}} pagheranno` | `gli {{t:oesd|OESD}} pagheranno` | termin oesd: terms-nazwy.yaml „OESD” (r. m); pl i m6-l2:65 mają OESD (pl m6-l3-check-raise.md:26) |
| it-L3-07 | ŚR | content/it/lessons/m6-l3-check-raise.md:72 | `Un {{t:oesd|progetto di scala bilaterale}} (` | `Un {{t:oesd|OESD}} (` | termin oesd: terms-nazwy.yaml „OESD” (r. m); pl i m6-l2:65 mają OESD (pl m6-l3-check-raise.md:72 „{{t:oesd|OESD}}”) |
| it-L3-08 | ŚR | content/it/lessons/m6-l3-check-raise.md:93 | `{{t:oesd|scala bilaterale}}) che vincono` | `{{t:oesd|OESD}}) che vincono` | termin oesd: terms-nazwy.yaml „OESD” (r. m); pl i m6-l2:65 mają OESD (pl m6-l3-check-raise.md:93) |
| it-L3-09 | ŚR | content/it/lessons/m6-l3-check-raise.md:123 | `{{t:oesd|scala bilaterale}}) che vince` | `{{t:oesd|OESD}}) che vince` | termin oesd: terms-nazwy.yaml „OESD” (r. m); pl i m6-l2:65 mają OESD (pl m6-l3-check-raise.md:123) |
| it-L3-10 | ŚR | content/it/lessons/m7-l2-polaryzacja.md:87 | `un {{t:oesd|progetto di scala bilaterale}}: circa` | `un {{t:oesd|OESD}}: circa` | termin oesd: terms-nazwy.yaml „OESD” (r. m); pl i m6-l2:65 mają OESD (pl m7-l2-polaryzacja.md:87) |
| it-L3-11 | ŚR | content/it/lessons/m6-l2-sprawdzenie.md:132 | `{{t:dry|asciutti}}` | `{{t:dry|secchi}}` | termin dry: terms-nazwy.yaml „secco”; m7-l2-polaryzacja.md:22,25 „secco”, tu „asciutti” (pl m6-l2-sprawdzenie.md:132) |
| it-L3-12 | ŚR | content/it/lessons/m6-l2-sprawdzenie.md:74 | `in circa il {{n:odds.gutshot.flop-turn}} dei casi` | `in circa l'{{n:odds.gutshot.flop-turn}} dei casi` | rodzajnik: liczba to 8,5% (4 z 47), „il 8,5%” jest błędem, ma być „l'8,5%” (pl m6-l2-sprawdzenie.md:74) |
| it-L3-13 | ŚR | content/it/lessons/m6-l3-check-raise.md:27 | `circa il {{n:eq.vs-xr.too-small}} di equity` | `circa l'{{n:eq.vs-xr.too-small}} di equity` | rodzajnik: liczba to 8% (15 ÷ 180), „il 8%” jest błędem, ma być „l'8%” (pl m6-l3-check-raise.md:27) |
| it-L3-14 | NISKIE | content/it/lessons/m6-l2-sprawdzenie.md:35 | `ti serve {{n:eq.bet-pot}} di equity invece di {{n:eq.bet-third}}` | `ti serve il {{n:eq.bet-pot}} di equity invece del {{n:eq.bet-third}}` | brak rodzajnika przed procentem („ti serve 33% di equity”); w m6-l1 konsekwentnie „il {{n}} di equity” (pl m6-l2-sprawdzenie.md:35) |
| it-L3-15 | NISKIE | content/it/lessons/m6-l2-sprawdzenie.md:44 | `ti serve solo {{n:eq.bet-third}} di equity` | `ti serve solo il {{n:eq.bet-third}} di equity` | brak rodzajnika przed procentem (pl m6-l2-sprawdzenie.md:44) |
| it-L3-16 | NISKIE | content/it/lessons/m6-l2-sprawdzenie.md:54 | `ti serve {{n:eq.bet-three-quarters}} di equity` | `ti serve il {{n:eq.bet-three-quarters}} di equity` | brak rodzajnika przed procentem (pl m6-l2-sprawdzenie.md:54) |
| it-L3-17 | NISKIE | content/it/lessons/m7-l2-polaryzacja.md:44 | `ha bisogno di {{n:eq.bet-three-quarters}} di equity` | `ha bisogno del {{n:eq.bet-three-quarters}} di equity` | brak rodzajnika przed procentem (pl m7-l2-polaryzacja.md:44) |
| it-L3-18 | NISKIE | content/it/lessons/m7-l2-polaryzacja.md:45 | `ha bisogno solo di {{n:eq.bet-quarter}} di equity` | `ha bisogno solo del {{n:eq.bet-quarter}} di equity` | brak rodzajnika przed procentem (pl m7-l2-polaryzacja.md:45) |
| it-L3-19 | NISKIE | content/it/lessons/m6-l1-mdf-alpha.md:96 | `„questa mano può vincere?”` | `«questa mano può vincere?»` | polskie cudzysłowy „…” w tekście włoskim (jedyne wystąpienie „ w it/lessons; pozostałe lekcje mają «…») (pl m6-l1-mdf-alpha.md:96) |
| it-L3-20 | NISKIE | content/it/lessons/m6-l2-sprawdzenie.md:122 | `anche media e bassa,` | `anche la media e la più bassa,` | pl „także środkową i najniższą” (bottom pair), „bassa” = niska, nie najniższa (pl m6-l2-sprawdzenie.md:122; en „middle and bottom pair”) |

### it-L4

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L4-01 | ŚR | content/it/lessons/m8-l1-value.md:89 | „perché, giocando in {{t:position\|posizione}}, l'avversario mostrerà” | „perché sei in {{t:position\|posizione}} e l'avversario mostrerà” | Gerundium odnosi się do podmiotu „l'avversario”, czyli pozycję ma rywal; pl m8-l1-value.md:89 „z {{t:position\|pozycji}} rywal pokaże karty” (pozycję masz ty; en „with position the opponent will show”). |
| it-L4-02 | ŚR | content/it/lessons/m8-l4-bluff-catching.md:82 | „meglio passare una mano senza possibilità” | „meglio foldare una mano senza possibilità” | Fold nazwany „passare”, w całym pliku „foldare/foldo/foldi”; pl m8-l4-bluff-catching.md:82 „spasowanie ręki bez szans”. |
| it-L4-03 | ŚR | content/it/lessons/m7-l4-probe-obrona.md:116 | „nella lezione su come cogliere i {{t:bluff}}” | „nella lezione su come catturare i {{t:bluff}}” | Odwołanie do lekcji M8 „Łapanie blefów” (pl m7-l4-probe-obrona.md:116); tytuł tej lekcji w it to „Catturare i bluff” i wszędzie „catturare i bluff”. |
| it-L4-04 | ŚR | content/it/lessons/m7-l3-implied-odds.md:109 | „## Una carta alla fine” | „## Manca una sola carta” | Kalka: „jedna karta na końcu” zamiast „została jedna karta”; pl m7-l3-implied-odds.md:109 „Jedna karta do końca” (en „One card to go”). |
| it-L4-05 | NISKIE | content/it/lessons/m7-l4-probe-obrona.md:107 | „{{t:chips\|fiche}}” | „{{t:chips\|fiches}}” | terms-nazwy: chips = „fiches” (tak też w m7-l3); pl m7-l4-probe-obrona.md:107. |
| it-L4-06 | NISKIE | content/it/lessons/m7-l4-probe-obrona.md:108 | „molte {{t:chips\|fiche}}” | „molte {{t:chips\|fiches}}” | Jak it-L4-05; pl m7-l4-probe-obrona.md:108. |
| it-L4-07 | NISKIE | content/it/lessons/m7-l3-implied-odds.md:17 | „del 2 e del 4 del M2” | „del 2 e del 4 dell'M2” | Rodzajnik przed skrótem czytanym „emme” (w m7-l2 jest „dell'M5”); pl m7-l3-implied-odds.md:17. |
| it-L4-08 | NISKIE | content/it/lessons/m7-l3-implied-odds.md:118 | „del 2 e del 4 del M2 moltiplichi” | „del 2 e del 4 dell'M2 moltiplichi” | Jak it-L4-07; pl m7-l3-implied-odds.md:118. |

### it-L5

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L5-01 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:27, 30, 46, 49, 50, 56, 58, 59, 65, 69, 70, 78, 80, 98, 100, 104, 106 (×2), 113 (19 wystąpień) | `{{t:top-pair\|coppia massima}}` | `{{t:top-pair\|top pair}}` | Nazwa terminu niezgodna z `content/it/terms-nazwy.yaml` (top-pair: „top pair”); sąsiednie lekcje modułu (m9-l1, m9-l4) mają „top pair”, więc ten sam termin jest w module nazwany dwojako. pl m9-l2: te same linie (`{{t:top-pair…}}`). Rodzaj żeński bez zmian, rodzajniki pasują. |
| it-L5-02 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:58 | „Tanto la {{t:top-pair\|coppia massima}} di solito lo regge.” | „Due street la {{t:top-pair\|top pair}} di solito le regge.” | Kalka „Tyle … zniesie”: zdanie zaczęte od „Tanto” czyta się po włosku jak „i tak / tak czy inaczej”, a „lo” nie ma poprzednika; pl:58 „Tyle top pair zwykle zniesie” (= dwie ulice wartości). Poprawka połączona z it-L5-01. |
| it-L5-03 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:110 | „la lezione sul sizing geometrico” | „la lezione sulla dimensione geometrica” | Odsyłacz do lekcji m9.l3, która w przekładzie nazywa się „Dimensione geometrica” (tak też w m9-l3 i m9-l4); to samo pojęcie nazwane dwojako. pl:110 „lekcja o rozmiarze geometrycznym”. |
| it-L5-04 | NISKIE | content/it/lessons/m9-l3-rozmiar-geometryczny.md:48 | „lo {{t:spr}} è circa” | „l'{{t:spr}} è circa” | Jedyne „lo SPR” w tych pięciu plikach; wszędzie indziej „l'SPR”. pl:48. |
| it-L5-05 | NISKIE | content/it/lessons/m10-l1-statystyki.md:77 | „si stabilizza più in fretta:” | „si stabilizza più in fretta di tutte:” | Zgubiony stopień najwyższy: pl:77 „stabilizuje się najszybciej” (odpowiedź na pytanie „która statystyka potrzebuje najwięcej rąk”). |
| it-L5-06 | ŚR | content/it/lessons/m10-l1-statystyki.md:87, 89 (2 wystąpienia) | „allo {{t:exploit\|sfruttamento}}” / „Lo {{t:exploit\|sfruttamento}}” | „all'{{t:exploit\|exploit}}” / „L'{{t:exploit\|exploit}}” | Nazwa terminu niezgodna z `content/it/terms-nazwy.yaml` (exploit: „exploit”). pl:87, 89 (`{{t:exploit\|eksploatacji}}`, `{{t:exploit\|Eksploatacja}}`). |

### it-L6

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L6-01 | NISKIE | m10-l2-typy-graczy.md:24 | `fino a circa {{n:hud.vpip.nit-max}} delle mani` | `fino a circa il {{n:hud.vpip.nit-max}} delle mani` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l2:24 |
| it-L6-02 | ŚR | m10-l2-typy-graczy.md:41 | `{{t:pair\|coppie}} in mano` | `{{t:pair\|coppie}} servite` | pl m10-l2:41 „{{t:pair\|parami}} kieszonkowymi” = pocket pairs; terms-nazwy pocket-pair: „coppia servita”; „coppie in mano” nie jest nazwą tego pojęcia |
| it-L6-03 | NISKIE | m10-l3-odejscie-od-bazy.md:22 | `con circa {{n:overbluff.lock}} delle puntate invece di circa {{n:overbluff.base}}` | `con circa il {{n:overbluff.lock}} delle puntate invece di circa il {{n:overbluff.base}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l3:22 |
| it-L6-04 | ŚR | m10-l3-odejscie-od-bazy.md:47 | `{{t:dry\|asciutto}}` | `{{t:dry\|secco}}` | terms-nazwy dry: „secco”; pl m10-l3:47 {{t:dry\|suchym}} |
| it-L6-05 | NISKIE | m10-l3-odejscie-od-bazy.md:99 | `da circa {{n:overbluff.base}} a circa {{n:overbluff.lock}}` | `da circa il {{n:overbluff.base}} a circa il {{n:overbluff.lock}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l3:99 |
| it-L6-06 | NISKIE | m10-l3-odejscie-od-bazy.md:122 | `di circa {{n:hud.f3b.low}}` | `di circa il {{n:hud.f3b.low}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l3:122 |
| it-L6-07 | NISKIE | m10-l3-odejscie-od-bazy.md:129 | `una grande room online` | `una grande sala online` | pl m10-l3:129 „sala online”; w m10-l2 i m10-l4 konsekwentnie „sala”, tu jedyne „room” |
| it-L6-08 | NISKIE | m10-l4-rake.md:31 | `mani circa {{n:rake.pop.reg.prerake}} vince` | `mani circa il {{n:rake.pop.reg.prerake}} vince` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:31 |
| it-L6-09 | NISKIE | m10-l4-rake.md:33 | `text: "Circa {{n:rake.pop.reg.postrake}}"` | `text: "Circa il {{n:rake.pop.reg.postrake}}"` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:33 |
| it-L6-10 | NISKIE | m10-l4-rake.md:33 | `circa {{n:rake.pop.reg.prerake}} prima del rake, circa {{n:rake.pop.reg.postrake}} dopo` | `circa il {{n:rake.pop.reg.prerake}} prima del rake, circa il {{n:rake.pop.reg.postrake}} dopo` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:33 |
| it-L6-11 | NISKIE | m10-l4-rake.md:34 | `Quasi altrettanti, circa {{n:rake.pop.reg.prerake}}` | `Quasi altrettanti, circa il {{n:rake.pop.reg.prerake}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:34 |
| it-L6-12 | NISKIE | m10-l4-rake.md:35 | `Esagerato: circa {{n:rake.pop.reg.postrake}} di` | `Esagerato: circa il {{n:rake.pop.reg.postrake}} di` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:35 |
| it-L6-13 | NISKIE | m10-l4-rake.md:43 | `(circa {{n:rake.ex.pct}})` | `(circa il {{n:rake.ex.pct}})` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:43 |
| it-L6-14 | ŚR | m10-l4-rake.md:56 | `contro un bet di metà` | `contro una puntata di metà` | terms-nazwy bet: „puntata”; pl m10-l4:56 „bet pół puli”; w pozostałych lekcjach pl „bet” = „puntata”, tu zostawione „bet” |
| it-L6-15 | NISKIE | m10-l4-rake.md:58 | `Un po' di più: circa {{n:eq.bet-half.rake}}` | `Un po' di più: circa il {{n:eq.bet-half.rake}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:58 |
| it-L6-16 | NISKIE | m10-l4-rake.md:59 | `La soglia sale a circa {{n:eq.bet-half.rake}}` | `La soglia sale a circa il {{n:eq.bet-half.rake}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:59 |
| it-L6-17 | NISKIE | m10-l4-rake.md:60 | `ti serve più equity: circa {{n:eq.bet-half.rake}}` | `ti serve più equity: circa il {{n:eq.bet-half.rake}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:60 |
| it-L6-18 | ŚR | m10-l4-rake.md:67 | `giocano circa {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} mani in meno. Ci perde` | `giocano circa il {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} di mani in meno. Ci perde` | wartości to procenty („25%–35%”): „circa 25%–35% mani in meno” niegramatyczne; pl m10-l4:67 „o ok. …–… mniej rąk” |
| it-L6-19 | NISKIE | m10-l4-rake.md:74 | `solo in circa {{n:rake.solver.bb-minraise}} dei casi in cui lo {{t:call\|chiama}}` | `solo in circa il {{n:rake.solver.bb-minraise}} dei casi in cui lo {{t:call\|chiama}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:74 |
| it-L6-20 | ŚR | m10-l4-rake.md:76 | `delle {{t:chips\|chip}}` | `delle {{t:chips\|fiches}}` | terms-nazwy chips: „fiches”; pl m10-l4:76 {{t:chips\|żetony}}; w m11-l2/l3 „fiches” |
| it-L6-21 | NISKIE | m10-l4-rake.md:104 | `circa {{n:rake.pop.reg.prerake}} vince prima della detrazione del rake, e dopo la detrazione circa {{n:rake.pop.reg.postrake}} (nei dati grezzi {{n:rake.pop.reg.prerake.raw}} e {{n:rake.pop.reg.postrake.raw}})` | `circa il {{n:rake.pop.reg.prerake}} vince prima della detrazione del rake, e dopo la detrazione circa il {{n:rake.pop.reg.postrake}} (nei dati grezzi il {{n:rake.pop.reg.prerake.raw}} e il {{n:rake.pop.reg.postrake.raw}})` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:104 |
| it-L6-22 | ŚR | m10-l4-rake.md:114 | `Bet di {{n:ex.bet.half}} in un` | `Puntata di {{n:ex.bet.half}} in un` | terms-nazwy bet: „puntata”; pl m10-l4:114 „Bet … do puli”; niespójne z „puntata” w pozostałych lekcjach |
| it-L6-23 | ŚR | m10-l4-rake.md:120 | `giocano circa {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} mani in meno; ci perde` | `giocano circa il {{n:rake.solver.vpip-drop.low}}–{{n:rake.solver.vpip-drop.high}} di mani in meno; ci perde` | wartości to procenty: „circa 25%–35% mani in meno” niegramatyczne; pl m10-l4:120 |
| it-L6-24 | NISKIE | m10-l4-rake.md:121 | `solo in circa {{n:rake.solver.bb-minraise}} dei casi in cui lo fa` | `solo in circa il {{n:rake.solver.bb-minraise}} dei casi in cui lo fa` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m10-l4:121 |
| it-L6-25 | NISKIE | m11-l1-push-fold.md:31 | `{{n:m11.m.stack}} {{t:chips\|fiche}}. I blind` | `{{n:m11.m.stack}} {{t:chips\|fiches}}. I blind` | terms-nazwy chips: „fiches”; w m11-l2 i m11-l3 „fiches”, tu „fiche” (l.mn.); pl m11-l1:31 |
| it-L6-26 | ŚR | m11-l1-push-fold.md:63 | `da circa {{n:m11.push.10}} a circa {{n:m11.push.15}} mani. K2o` | `da circa il {{n:m11.push.10}} a circa il {{n:m11.push.15}} delle mani. K2o` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l1:63 |
| it-L6-27 | NISKIE | m11-l1-push-fold.md:72 | `text: "Più di {{n:m11.push.10.alpha}}"` | `text: "Più del {{n:m11.push.10.alpha}}"` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:72 |
| it-L6-28 | NISKIE | m11-l1-push-fold.md:72 | `fa circa {{n:m11.push.10.alpha}}` | `fa circa il {{n:m11.push.10.alpha}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:72 |
| it-L6-29 | NISKIE | m11-l1-push-fold.md:74 | `molto frequenti: più di {{n:m11.push.10.alpha}}` | `molto frequenti: più del {{n:m11.push.10.alpha}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:74 |
| it-L6-30 | NISKIE | m11-l1-push-fold.md:90 | `Si allarga: circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} invece di {{n:m11.push.10}}` | `Si allarga: circa il {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} invece del {{n:m11.push.10}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:90 |
| it-L6-31 | ŚR | m11-l1-push-fold.md:90 | `ora servono solo più di {{n:m11.push.10.alpha-ante}} {{t:fold}}` | `ora serve solo più del {{n:m11.push.10.alpha-ante}} di {{t:fold}}` | wartość to procent: „servono solo più di N% fold” niegramatyczne; pl m11-l1:90 „ponad {{n}} pasów” |
| it-L6-32 | ŚR | m11-l1-push-fold.md:91 | `è di circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mani` | `è di circa il {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} delle mani` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l1:91 |
| it-L6-33 | NISKIE | m11-l1-push-fold.md:92 | `Senza ante circa {{n:m11.push.10}}, con ante circa {{n:m11.nash.push.10-ante}}` | `Senza ante circa il {{n:m11.push.10}}, con ante circa il {{n:m11.nash.push.10-ante}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:92 |
| it-L6-34 | NISKIE | m11-l1-push-fold.md:134 | `{{n:m11.m.stack}} {{t:chips\|fiche}}, blind` | `{{n:m11.m.stack}} {{t:chips\|fiches}}, blind` | terms-nazwy chips: „fiches”; pl m11-l1:134 |
| it-L6-35 | ŚR | m11-l1-push-fold.md:152 | `vai all-in con circa {{n:m11.push.15}} mani, con {{n:m11.depth.10}} con circa {{n:m11.push.10}}, e con {{n:m11.depth.5}} ormai con circa {{n:m11.nash.push.5}}` | `vai all-in con circa il {{n:m11.push.15}} delle mani, con {{n:m11.depth.10}} con circa il {{n:m11.push.10}}, e con {{n:m11.depth.5}} ormai con circa il {{n:m11.nash.push.5}}` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l1:152 |
| it-L6-36 | NISKIE | m11-l1-push-fold.md:152 | `indica {{n:m11.ext.push.10}} con` | `indica il {{n:m11.ext.push.10}} con` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:152 |
| it-L6-37 | ŚR | m11-l1-push-fold.md:156 | `va all-in con circa {{n:m11.3max.push.btn}} mani` | `va all-in con circa il {{n:m11.3max.push.btn}} delle mani` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l1:156 |
| it-L6-38 | NISKIE | m11-l1-push-fold.md:156 | `con circa {{n:m11.3max.push.sb}}` | `con circa il {{n:m11.3max.push.sb}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:156 |
| it-L6-39 | NISKIE | m11-l1-push-fold.md:170 | `in più di {{n:m11.push.10.alpha}} dei casi` | `in più del {{n:m11.push.10.alpha}} dei casi` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l1:170 |
| it-L6-40 | NISKIE | m11-l1-push-fold.md:174 | `L'ante sono {{t:chips\|fiche}} in più` | `L'ante sono {{t:chips\|fiches}} in più` | terms-nazwy chips: „fiches”; pl m11-l1:174 |
| it-L6-41 | ŚR | m11-l1-push-fold.md:174 | `si allarga da circa {{n:m11.push.10}} a circa {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} mani` | `si allarga da circa il {{n:m11.push.10}} a circa il {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} delle mani` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l1:174 |
| it-L6-42 | NISKIE | m11-l2-sprawdzanie.md:35 | `quindi il prezzo sale a {{n:m11.call.15.eq}}` | `quindi il prezzo sale al {{n:m11.call.15.eq}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:35 |
| it-L6-43 | NISKIE | m11-l2-sprawdzanie.md:67 | `}} il prezzo sale a {{n:m11.call.15.eq}} e il` | `}} il prezzo sale al {{n:m11.call.15.eq}} e il` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:67 |
| it-L6-44 | ŚR | m11-l2-sprawdzanie.md:67 | `(circa {{n:m11.push.15}} mani)` | `(circa il {{n:m11.push.15}} delle mani)` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:67 |
| it-L6-45 | ŚR | m11-l2-sprawdzanie.md:67 | `scende da circa {{n:m11.call.10}} a circa {{n:m11.call.15}} mani` | `scende da circa il {{n:m11.call.10}} a circa il {{n:m11.call.15}} delle mani` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:67 |
| it-L6-46 | ŚR | m11-l2-sprawdzanie.md:74 | `con circa {{n:m11.push.10}} mani, ma il {{t:big-blind}} {{t:call\|chiama}} solo con circa {{n:m11.call.10}}` | `con circa il {{n:m11.push.10}} delle mani, ma il {{t:big-blind}} {{t:call\|chiama}} solo con circa il {{n:m11.call.10}}` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:74 |
| it-L6-47 | ŚR | m11-l2-sprawdzanie.md:86 | `circa {{n:m11.call.10-ante}} mani invece di {{n:m11.call.10}}` | `circa il {{n:m11.call.10-ante}} delle mani invece del {{n:m11.call.10}}` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:86 |
| it-L6-48 | NISKIE | m11-l2-sprawdzanie.md:107 | `ti serve solo {{n:m11.3max.bb-two.eq}} di equity` | `ti serve solo il {{n:m11.3max.bb-two.eq}} di equity` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:107 |
| it-L6-49 | ŚR | m11-l2-sprawdzanie.md:110 | `con circa {{n:m11.3max.call.bb-two}} mani, e quando all-in c'è solo il Button, con circa {{n:m11.3max.call.bb}}` | `con circa il {{n:m11.3max.call.bb-two}} delle mani, e quando all-in c'è solo il Button, con circa il {{n:m11.3max.call.bb}}` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:110 |
| it-L6-50 | ŚR | m11-l2-sprawdzanie.md:111 | `solo con circa {{n:m11.3max.call.bb-two}} mani." }` | `solo con circa il {{n:m11.3max.call.bb-two}} delle mani." }` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:111 |
| it-L6-51 | NISKIE | m11-l2-sprawdzanie.md:134 | `“gap concept”` | `«gap concept»` | cudzysłów angielski; w pozostałych lekcjach it konsekwentnie «…» (m10-l3:129, m10-l4:118); pl m11-l2:134 „gap concept” |
| it-L6-52 | ŚR | m11-l2-sprawdzanie.md:140 | `con circa {{n:m11.push.10}} mani, mentre il {{t:big-blind}} {{t:call\|chiama}} con circa {{n:m11.call.10}}` | `con circa il {{n:m11.push.10}} delle mani, mentre il {{t:big-blind}} {{t:call\|chiama}} con circa il {{n:m11.call.10}}` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:140 |
| it-L6-53 | NISKIE | m11-l2-sprawdzanie.md:140 | `di {{t:call\|chiamata}} di {{n:m11.ext.call.10}}` | `di {{t:call\|chiamata}} del {{n:m11.ext.call.10}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:140 |
| it-L6-54 | NISKIE | m11-l2-sprawdzanie.md:150 | `meno spesso: circa {{n:m11.call.15}} con {{n:m11.depth.15}}, e con {{n:m11.depth.5}} addirittura circa {{n:m11.call.5}}` | `meno spesso: circa il {{n:m11.call.15}} con {{n:m11.depth.15}}, e con {{n:m11.depth.5}} addirittura circa il {{n:m11.call.5}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:150 |
| it-L6-55 | ŚR | m11-l2-sprawdzanie.md:154 | `solo con circa {{n:m11.3max.call.sb}} mani, anche se gli serve {{n:m11.3max.sb.eq}} di equity` | `solo con circa il {{n:m11.3max.call.sb}} delle mani, anche se gli serve il {{n:m11.3max.sb.eq}} di equity` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:154 |
| it-L6-56 | NISKIE | m11-l2-sprawdzanie.md:154 | `gli serve {{n:m11.3max.bb.eq}} di equity e {{t:call\|chiama}} con circa {{n:m11.3max.call.bb}}` | `gli serve il {{n:m11.3max.bb.eq}} di equity e {{t:call\|chiama}} con circa il {{n:m11.3max.call.bb}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:154 |
| it-L6-57 | NISKIE | m11-l2-sprawdzanie.md:160 | `il prezzo scende a {{n:m11.3max.bb-two.eq}}` | `il prezzo scende al {{n:m11.3max.bb-two.eq}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:160 |
| it-L6-58 | ŚR | m11-l2-sprawdzanie.md:160 | `solo con circa {{n:m11.3max.call.bb-two}} mani. Contro` | `solo con circa il {{n:m11.3max.call.bb-two}} delle mani. Contro` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:160 |
| it-L6-59 | NISKIE | m11-l2-sprawdzanie.md:168 | `ti serve {{n:m11.call.10-ante.eq}} invece di {{n:m11.call.10.eq}}` | `ti serve il {{n:m11.call.10-ante.eq}} invece del {{n:m11.call.10.eq}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l2:168 |
| it-L6-60 | ŚR | m11-l2-sprawdzanie.md:168 | `con circa {{n:m11.call.10-ante}} mani.` | `con circa il {{n:m11.call.10-ante}} delle mani.` | {{n:…}} to procent („N%”): „circa N% mani” jest niegramatyczne, pl ma „ok. N% rąk” = „circa il N% delle mani”; pl m11-l2:168 |
| it-L6-61 | ŚR | m11-l3-icm.md:29 | `"{{t:payout\|Pagamenti}}:` | `"{{t:payout\|Premi}}:` | terms-nazwy payout: „premio”; w tym samym pliku {{t:payout}} bez formy (l. 123) = „premio” i „premi” w tekście (l. 79, 113), a tu „pagamenti”: jeden termin nazwany dwojako; pl m11-l3:29 |
| it-L6-62 | NISKIE | m11-l3-icm.md:29 | ` {{n:m11.icm.a.p1}} del {{t:prize-pool\|montepremi}} per il 1° posto e {{n:m11.icm.a.p2}} per` | ` il {{n:m11.icm.a.p1}} del {{t:prize-pool\|montepremi}} per il 1° posto e il {{n:m11.icm.a.p2}} per` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:29 |
| it-L6-63 | NISKIE | m11-l3-icm.md:36 | `Lo stack grande ha {{n:m11.icm.a.chips1}} delle` | `Lo stack grande ha il {{n:m11.icm.a.chips1}} delle` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:36 |
| it-L6-64 | NISKIE | m11-l3-icm.md:38 | `al massimo {{n:m11.icm.a.p1}} del` | `al massimo il {{n:m11.icm.a.p1}} del` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:38 |
| it-L6-65 | ŚR | m11-l3-icm.md:39 | `Con {{t:payout\|pagamenti}} {{n:m11.icm.a.p1}}` | `Con {{t:payout\|premi}} {{n:m11.icm.a.p1}}` | payout nazwany dwojako w pliku („pagamenti” / „premio”); terms-nazwy: „premio”; pl m11-l3:39 |
| it-L6-66 | NISKIE | m11-l3-icm.md:40 | `Ha solo {{n:m11.icm.a.chips1}} di probabilità` | `Ha solo il {{n:m11.icm.a.chips1}} di probabilità` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:40 |
| it-L6-67 | NISKIE | m11-l3-icm.md:45 | `se perdi perdi {{n:m11.bf.loss}} del {{t:prize-pool\|montepremi}}, se vinci guadagni {{n:m11.bf.gain}}` | `se perdi perdi il {{n:m11.bf.loss}} del {{t:prize-pool\|montepremi}}, se vinci guadagni il {{n:m11.bf.gain}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:45 |
| it-L6-68 | NISKIE | m11-l3-icm.md:54 | `Nel gioco a {{t:chips}} basterebbe {{n:m11.bf.req-chips}}` | `Nel gioco a {{t:chips}} basterebbe il {{n:m11.bf.req-chips}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:54 |
| it-L6-69 | NISKIE | m11-l3-icm.md:59 | `basta {{n:m11.bf.req-chips}} di equity, ma secondo l'{{t:icm}} te ne serve {{n:m11.bf.req}}` | `basta il {{n:m11.bf.req-chips}} di equity, ma secondo l'{{t:icm}} te ne serve il {{n:m11.bf.req}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:59 |
| it-L6-70 | NISKIE | m11-l3-icm.md:68 | `ha circa {{n:m11.bf.example-eq}} di equity` | `ha circa il {{n:m11.bf.example-eq}} di equity` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:68 |
| it-L6-71 | NISKIE | m11-l3-icm.md:68 | `perché basta {{n:m11.bf.req-chips}}` | `perché basta il {{n:m11.bf.req-chips}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:68 |
| it-L6-72 | NISKIE | m11-l3-icm.md:70 | `qui ti serve {{n:m11.bf.req}} di equity` | `qui ti serve il {{n:m11.bf.req}} di equity` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:70 |
| it-L6-73 | ŚR | m11-l3-icm.md:71 | `con {{t:payout\|pagamenti}} conta il denaro` | `con {{t:payout\|premi}} conta il denaro` | payout nazwany dwojako w pliku; terms-nazwy: „premio”; pl m11-l3:71 |
| it-L6-74 | NISKIE | m11-l3-icm.md:71 | `Perdere ti costa {{n:m11.bf.loss}} del {{t:prize-pool\|montepremi}}, mentre vincere ti dà solo {{n:m11.bf.gain}}` | `Perdere ti costa il {{n:m11.bf.loss}} del {{t:prize-pool\|montepremi}}, mentre vincere ti dà solo il {{n:m11.bf.gain}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:71 |
| it-L6-75 | NISKIE | m11-l3-icm.md:72 | `Una mano con {{n:m11.bf.example-eq}} vince` | `Una mano con il {{n:m11.bf.example-eq}} vince` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:72 |
| it-L6-76 | NISKIE | m11-l3-icm.md:72 | `la soglia è {{n:m11.bf.req}}` | `la soglia è il {{n:m11.bf.req}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:72 |
| it-L6-77 | ŚR | m11-l3-icm.md:77 | `passa contro di te molto spesso` | `folda contro di te molto spesso` | pl m11-l3:77 „pasuje do ciebie” = fold; w całym pliku fold = „foldare”, tu jedyne „passa” (niespójny termin, „passa contro di te” mylące) |
| it-L6-78 | NISKIE | m11-l3-icm.md:127 | `due posti: {{n:m11.icm.a.p1}} e {{n:m11.icm.a.p2}} del` | `due posti: il {{n:m11.icm.a.p1}} e il {{n:m11.icm.a.p2}} del` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:127 |
| it-L6-79 | NISKIE | m11-l3-icm.md:143 | `tre posti pagati: {{n:m11.bf.p1}}, {{n:m11.bf.p2}} e {{n:m11.bf.p3}}` | `tre posti pagati: il {{n:m11.bf.p1}}, il {{n:m11.bf.p2}} e il {{n:m11.bf.p3}}` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:143 |
| it-L6-80 | NISKIE | m11-l3-icm.md:145 | `stack vale {{n:m11.bf.eq.now}} del` | `stack vale il {{n:m11.bf.eq.now}} del` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:145 |
| it-L6-81 | NISKIE | m11-l3-icm.md:146 | `sale a {{n:m11.bf.eq.win}}, cioè di **` | `sale al {{n:m11.bf.eq.win}}, cioè del **` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:146 |
| it-L6-82 | NISKIE | m11-l3-icm.md:147 | `scende a {{n:m11.bf.eq.lose}}, cioè di **` | `scende al {{n:m11.bf.eq.lose}}, cioè del **` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:147 |
| it-L6-83 | NISKIE | m11-l3-icm.md:159 | `Risulta **{{n:m11.bf.req}}**` | `Risulta il **{{n:m11.bf.req}}**` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:159 |
| it-L6-84 | NISKIE | m11-l3-icm.md:159 | `quindi basterebbe {{n:m11.bf.req-chips}}. La differenza, {{n:m11.bf.premium}}, è` | `quindi basterebbe il {{n:m11.bf.req-chips}}. La differenza, il {{n:m11.bf.premium}}, è` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:159 |
| it-L6-85 | NISKIE | m11-l3-icm.md:161 | `con {{n:m11.jamfold3.overcall.single}} delle mani` | `con il {{n:m11.jamfold3.overcall.single}} delle mani` | brak rodzajnika przed procentem ({{n:…}} wyświetla się jako „N%”); w tym samym przekładzie gdzie indziej „il/nel/del {{n}}”; pl m11-l3:161 |
| it-L6-86 | ŚR | m11-l3-icm.md:161 | `con {{t:payout\|pagamenti}} solo con {{n:m11.jamfold3.overcall.tourn}}` | `con {{t:payout\|premi}} solo con il {{n:m11.jamfold3.overcall.tourn}}` | payout nazwany dwojako w pliku; terms-nazwy: „premio” (przy okazji rodzajnik przed procentem); pl m11-l3:161 |

### it-L7

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-L7-01 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:15 | `AA batte KK in circa {{n:pf.aa-vs-kk}} dei casi. Perdere in circa {{n:res.kk-wins}} dei casi` | `AA batte KK in circa l'{{n:pf.aa-vs-kk}} dei casi. Perdere in circa il {{n:res.kk-wins}} dei casi` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:15) |
| it-L7-02 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:16 | `prima della carta: circa {{n:pf.aa-vs-kk}} di equity` | `prima della carta: circa l'{{n:pf.aa-vs-kk}} di equity` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:16) |
| it-L7-03 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:22 | `all-in preflop in circa {{n:pf.aa-vs-kk}} dei casi` | `all-in preflop in circa l'{{n:pf.aa-vs-kk}} dei casi` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:22) |
| it-L7-04 | ŚR | content/it/lessons/m12-l2-decyzja-wynik.md:29 | `({{n:outs.flush}} outs)` | `({{n:outs.flush}} out)` | termin: terms-nazwy.yaml outs = „out” (nieodmienne); w pozostałych lekcjach „out” (pl m12-l2:29) |
| it-L7-05 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:31 | `Ti serviva {{n:eq.bet-quarter}} di equity e ne avevi circa {{n:odds.flush.turn-river}}.` | `Ti serviva il {{n:eq.bet-quarter}} di equity e ne avevi circa il {{n:odds.flush.turn-river}}.` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:31) |
| it-L7-06 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:32 | `entra solo in circa {{n:odds.flush.turn-river}} dei casi` | `entra solo in circa il {{n:odds.flush.turn-river}} dei casi` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:32) |
| it-L7-07 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:40 | `Ti serviva {{n:eq.bet-pot}} di equity e ne avevi circa {{n:odds.flush.turn-river}}.` | `Ti serviva il {{n:eq.bet-pot}} di equity e ne avevi circa il {{n:odds.flush.turn-river}}.` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:40) |
| it-L7-08 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:41 | `Con un prezzo di {{n:eq.bet-pot}} e una probabilità di circa {{n:odds.flush.turn-river}},` | `Con un prezzo del {{n:eq.bet-pot}} e una probabilità di circa il {{n:odds.flush.turn-river}},` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:41) |
| it-L7-09 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:42 | `hai {{n:odds.flush.turn-river}} di probabilità, te ne servono {{n:eq.bet-pot}}` | `hai il {{n:odds.flush.turn-river}} di probabilità, te ne serve il {{n:eq.bet-pot}}` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:42) |
| it-L7-10 | ŚR | content/it/lessons/m12-l2-decyzja-wynik.md:67 | `(il {{n:skill.pct}} più forte contro il {{n:skill.pct}} più debole)` | `(l'{{n:skill.pct}} più forte contro l'{{n:skill.pct}} più debole)` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m12-l2:67) |
| it-L7-11 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:67 | `passa in vantaggio in circa {{n:skill.ahead}} dei casi` | `passa in vantaggio in circa il {{n:skill.ahead}} dei casi` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:67) |
| it-L7-12 | ŚR | content/it/lessons/m12-l2-decyzja-wynik.md:76 | `Il {{n:skill.pct}} più forte dei giocatori supera il {{n:skill.pct}} più debole` | `L'{{n:skill.pct}} più forte dei giocatori supera l'{{n:skill.pct}} più debole` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m12-l2:76) |
| it-L7-13 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:76 | ` in circa {{n:skill.ahead}} dei casi dopo circa` | ` in circa il {{n:skill.ahead}} dei casi dopo circa` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:76) |
| it-L7-14 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:97 | `eppure perde in circa **{{n:res.kk-wins}}** dei casi` | `eppure perde in circa il **{{n:res.kk-wins}}** dei casi` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:97) |
| it-L7-15 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:97 | `(ti serve {{n:eq.bet-pot}}, hai circa {{n:odds.flush.turn-river}})` | `(ti serve il {{n:eq.bet-pot}}, hai circa il {{n:odds.flush.turn-river}})` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:97) |
| it-L7-16 | ŚR | content/it/lessons/m12-l2-decyzja-wynik.md:112 | `che il {{n:skill.pct}} più forte dei giocatori superava il {{n:skill.pct}} più debole` | `che l'{{n:skill.pct}} più forte dei giocatori superava l'{{n:skill.pct}} più debole` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m12-l2:112) |
| it-L7-17 | NISKIE | content/it/lessons/m12-l2-decyzja-wynik.md:112 | `in circa {{n:skill.ahead}} dei confronti` | `in circa il {{n:skill.ahead}} dei confronti` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l2:112) |
| it-L7-18 | NISKIE | content/it/lessons/m12-l3-tilt.md:100 | `questionario, {{n:tilt.severe}} dei giocatori` | `questionario, l'{{n:tilt.severe}} dei giocatori` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l3:100) |
| it-L7-19 | NISKIE | content/it/lessons/m12-l4-bankroll.md:58 | `colpisce circa {{n:dd.p.small.100k}} dei giocatori` | `colpisce circa il {{n:dd.p.small.100k}} dei giocatori` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:58) |
| it-L7-20 | NISKIE | content/it/lessons/m12-l4-bankroll.md:85 | `"Circa {{n:study.beginner}} di studio", correct` | `"Circa l'{{n:study.beginner}} di studio", correct` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:85) |
| it-L7-21 | NISKIE | content/it/lessons/m12-l4-bankroll.md:86 | `Circa {{n:study.min}} di studio` | `Circa il {{n:study.min}} di studio` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:86) |
| it-L7-22 | NISKIE | content/it/lessons/m12-l4-bankroll.md:94 | `mai meno di {{n:study.min}} di studio", correct: true, why: "Anche quando vinci, l'ideale è circa {{n:study.winner}} di studio` | `mai meno del {{n:study.min}} di studio", correct: true, why: "Anche quando vinci, l'ideale è circa il {{n:study.winner}} di studio` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:94) |
| it-L7-23 | NISKIE | content/it/lessons/m12-l4-bankroll.md:95 | `non scendi sotto {{n:study.min}} del tempo` | `non scendi sotto il {{n:study.min}} del tempo` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:95) |
| it-L7-24 | NISKIE | content/it/lessons/m12-l4-bankroll.md:96 | `Circa {{n:study.beginner}} di studio, come all'inizio` | `Circa l'{{n:study.beginner}} di studio, come all'inizio` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:96) |
| it-L7-25 | NISKIE | content/it/lessons/m12-l4-bankroll.md:141 | `dedichi circa {{n:study.beginner}} del tempo` | `dedichi circa l'{{n:study.beginner}} del tempo` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:141) |
| it-L7-26 | NISKIE | content/it/lessons/m12-l4-bankroll.md:141 | `ma mai meno di {{n:study.min}} di studio.` | `ma mai meno del {{n:study.min}} di studio.` | brak rodzajnika przed procentem (wł. wymaga „il/l' X%”; w m12-l1 przekład stosuje go konsekwentnie); sens bez zmian (pl m12-l4:141) |
| it-L7-27 | ŚR | content/it/lessons/m13-l1-raport.md:13 | `Vai all-in con il {{n:m13.eq.example}}` | `Vai all-in con l'{{n:m13.eq.example}}` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m13-l1:13) |
| it-L7-28 | ŚR | content/it/lessons/m13-l1-raport.md:20 | `dieci volte con il {{n:m13.eq.example}}` | `dieci volte con l'{{n:m13.eq.example}}` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m13-l1:20) |
| it-L7-29 | ŚR | content/it/lessons/m13-l1-raport.md:82 | `Con il {{n:m13.eq.example}} di {{t:equity}} perdi` | `Con l'{{n:m13.eq.example}} di {{t:equity}} perdi` | zły rodzajnik: liczba zaczyna się od samogłoski („il 1%”/„il 80%” → „l'1%”/„l'80%”) (pl m13-l1:82) |
| it-L7-30 | NISKIE | content/it/lessons/m13-l2-powtorki.md:81 | `entro un limite giornaliero` | `entro il limite giornaliero` | źródło mówi o konkretnym dziennym limicie aplikacji („w granicach dziennego limitu”), nie o jakimś limicie (pl m13-l2:81) |

### it-R1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-R1-01 | ŚR | content/it/rules.yaml:537 | „fai più spesso il {{t:second-barrel\|second barrel}}” | „{{t:bet\|punti}} più spesso il {{t:second-barrel\|second barrel}}” | Zgubiony znacznik terminu `bet`; pl rules.yaml:537 „częściej {{t:bet\|stawiasz}} {{t:second-barrel\|second barrel}}”. W tym samym pliku it:626 i it:636 znacznik zachowany („{{t:bet\|punti}}”, „{{t:bet\|punta}}”). |
| it-R1-02 | ŚR | content/it/rules.yaml:335 | „flop {{t:dry\|asciutto}}” | „flop {{t:dry\|secco}}” | `terms-nazwy.yaml`: dry = „secco”; forma w znaczniku nie jest formą nazwy terminu (pl:335 `{{t:dry}}`). |
| it-R1-03 | ŚR | content/it/rules.yaml:342 | „definizione di flop {{t:dry\|asciutto}}” | „definizione di flop {{t:dry\|secco}}” | jw. (pl:342) |
| it-R1-04 | ŚR | content/it/rules.yaml:383 | „il flop è {{t:dry\|asciutto}} e alto” | „il flop è {{t:dry\|secco}} e alto” | jw. (pl:383) |
| it-R1-05 | ŚR | content/it/rules.yaml:494 | „sui flop {{t:dry\|asciutti}} con un re” | „sui flop {{t:dry\|secchi}} con un re” | jw. (pl:494) |
| it-R1-06 | ŚR | content/it/rules.yaml:240 | „le soluzioni dei solver pubblicate qui difendono circa” | „le soluzioni dei solver pubblicate difendono qui circa” | „pubblicate qui” czyta się „opublikowane tutaj”; pl:240 „opublikowane rozwiązania solverów bronią tu” („tu” = w tym spocie; en: „defend about … of hands here”). |
| it-R1-07 | ŚR | content/it/rules.yaml:323 | „la soluzione del solver pubblicata qui difende circa” | „la soluzione del solver pubblicata difende qui circa” | jak it-R1-06; pl:323 „opublikowane rozwiązanie solvera broni tu”. |
| it-R1-08 | NISKIE | content/it/rules.yaml:123 | „apri più largo di tutte le {{t:position\|posizioni}} prima dei blind” | „apri più largo che da tutte le altre {{t:position\|posizioni}} prima dei blind” | Niegramatyczne porównanie („szerzej niż wszystkie pozycje”); pl:123 „otwierasz najszerzej ze wszystkich pozycji przed blindami”. Sens zachowany. |
| it-R1-09 | NISKIE | content/it/rules.yaml:527 | „quindi perde meno quando i {{t:fold\|fold}} mancano” | „quindi è quello che perde meno quando i {{t:fold\|fold}} mancano” | pl:527 „więc traci najmniej, gdy pasów brakuje” (stopień najwyższy oddany wyższym). |

### it-R2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-R2-01 | ŚR | content/it/rules.yaml:862 | `{{t:maniac\|maniaco}}` | `{{t:maniac\|maniac}}` | Nazwa terminu w `content/it/terms-nazwy.yaml` to „maniac”; „maniaco” to inna nazwa tego samego pojęcia (pl content/pl/rules.yaml:862 `{{t:maniac\|maniak}}`). |
| it-R2-02 | ŚR | content/it/rules.yaml:887 | `contro un {{t:maniac\|maniaco}}` | `contro un {{t:maniac\|maniac}}` | Jak it-R2-01 (pl content/pl/rules.yaml:887). |
| it-R2-03 | ŚR | content/it/rules.yaml:892 | `maniaco «Trap with premium hands` | `maniac «Trap with premium hands` | Jak it-R2-01, tekst bez znacznika w polu source (pl content/pl/rules.yaml:892 „maniak”). |
| it-R2-04 | ŚR | content/it/rules.yaml:1164 | `il replay del gioco mostra` | `il ripasso dal gioco mostra` | „powtórka z gry” (pl content/pl/rules.yaml:1164) to nazwa funkcji aplikacji; lekcja `content/it/lessons/m13-l2-powtorki.md:5` nazywa ją „Ripassi dal gioco”. „Replay del gioco” to inna nazwa i sugeruje odtworzenie rozdania. |
| it-R2-05 | NISKIE | content/it/rules.yaml:996 | `un respiro profondo e una frase preparata` | `un respiro e una frase preparata` | Dodane „profondo”; źródło ma „oddech” (pl content/pl/rules.yaml:996; en „a breath”). Reguła R-M12-006 (treść krytyczna), sens zalecenia bez zmiany. |

### it-X1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-X1-01 | ŚR | content/it/exams/m1.yaml:44 | `sul {{t:board\|tavolo}} durante` | `sul {{t:board\|board}} durante` | Termin board = „board” (terms-nazwy.yaml:27); „tavolo” nie jest formą tego terminu i występuje w całym przekładzie tylko w tych dwóch miejscach (pl m1.yaml:44 `{{t:board\|stole}}`). |
| it-X1-02 | ŚR | content/it/exams/m1.yaml:56 | `Sul {{t:board\|tavolo}} ci sono` | `Sul {{t:board\|board}} ci sono` | Jak wyżej (pl m1.yaml:56). |
| it-X1-03 | ŚR | content/it/exams/m6.yaml:34 | `Micro stakes. Un` | `Microlimiti. Un` | „Mikrostawki” (pl m6.yaml:34) w reszcie przekładu to „microlimiti” (18×), termin stakes = „limite”; tu jedyne „Micro stakes”. |
| it-X1-04 | ŚR | content/it/exams/m5.yaml:50 | `che in {{n:alpha.cbet.big}} dei casi` | `che nel {{n:alpha.cbet.big}} dei casi` | Znacznik daje procent („in 43% dei casi”): brak rodzajnika, błąd gramatyczny w treści odpowiedzi; m6.yaml:17–19 ma poprawne „che nel … dei casi” (pl m5.yaml:50). |
| it-X1-05 | ŚR | content/it/exams/m5.yaml:51 | `che in {{n:alpha.cbet.small}} dei casi` | `che nel {{n:alpha.cbet.small}} dei casi` | Jak wyżej (pl m5.yaml:51). |
| it-X1-06 | ŚR | content/it/exams/m5.yaml:52 | `che in {{n:flop.miss.unpaired}} dei casi` | `che nel {{n:flop.miss.unpaired}} dei casi` | Jak wyżej (pl m5.yaml:52). |
| it-X1-07 | NISKIE | content/it/exams/m5.yaml:38 | `in circa {{n:flop.miss.unpaired}} dei casi` | `in circa il {{n:flop.miss.unpaired}} dei casi` | Brak rodzajnika przed procentem (pl m5.yaml:38). |
| it-X1-08 | NISKIE | content/it/exams/m5.yaml:38 | `insieme in circa {{n:flop.miss.two}}. Quanto` | `insieme in circa il {{n:flop.miss.two}}. Quanto` | Jak wyżej. |
| it-X1-09 | NISKIE | content/it/exams/m5.yaml:78 | `solo in circa {{n:flop.miss.two}} dei casi` | `solo in circa il {{n:flop.miss.two}} dei casi` | Jak wyżej (pl m5.yaml:78). |
| it-X1-10 | NISKIE | content/it/exams/m0.yaml:8 | `scala}} al jack` | `scala}} al fante` | Walet (pl m0.yaml:8) nazwany dwojako: m0 „jack”, m2.yaml:31 i lekcje „fante/fanti”. |
| it-X1-11 | NISKIE | content/it/exams/m0.yaml:51 | `la donna e il jack li dà` | `la donna e il fante li dà` | Jak wyżej (pl m0.yaml:51). |
| it-X1-12 | NISKIE | content/it/exams/m6.yaml:57 | `può chiudere una {{t:pair\|coppia}}` | `può fare {{t:pair\|coppia}}` | „może trafić parę” (pl m6.yaml:57): „chiudere” odnosi się do projektów; w m3.yaml:78 „Fa coppia”. |

### it-X2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-X2-01 | ŚR | content/it/exams/m7.yaml:63 | `{{t:oesd|progetto di scala bilaterale}}: {{n:outs.oesd}}` | `{{t:oesd|OESD}}: {{n:outs.oesd}}` | Nazwa terminu oesd wg content/it/terms-nazwy.yaml:54 to „OESD” (forma tłumacza oznaczona tam jako niezgodna); pl m7.yaml:63 |
| it-X2-02 | ŚR | content/it/exams/m7.yaml:70 | `{{t:oesd|progetto di scala bilaterale}} (fante` | `{{t:oesd|OESD}} (fante` | Jw. (terms-nazwy.yaml:54); pl m7.yaml:70 |
| it-X2-03 | NISKIE | content/it/exams/m8.yaml:10 | `in netto perde` | `al netto perde` | Niepoprawny zwrot „in netto”; pl m8.yaml:10 „na czysto traci” |
| it-X2-04 | ŚR | content/it/exams/m8.yaml:17 | `Hai {{t:top-pair|coppia massima}} con il nove` | `Hai {{t:top-pair|top pair}} con il nove` | Nazwa terminu top-pair wg terms-nazwy.yaml:85 to „top pair” (tak też it m9.yaml:19); pl m8.yaml:17 |
| it-X2-05 | ŚR | content/it/exams/m8.yaml:46 | `il {{t:oesd|progetto di scala bilaterale}} non è entrato` | `l'{{t:oesd|OESD}} non è entrato` | Nazwa terminu oesd wg terms-nazwy.yaml:54 to „OESD”; pl m8.yaml:46 ma „{{t:oesd|OESD}}” |
| it-X2-06 | ŚR | content/it/exams/m8.yaml:48 | `La {{t:top-pair|coppia massima}} ha valore` | `La {{t:top-pair|top pair}} ha valore` | Jak it-X2-04 (terms-nazwy.yaml:85); pl m8.yaml:48 |
| it-X2-07 | NISKIE | content/it/exams/m8.yaml:56 | `una mano da lasciare` | `una mano da foldare` | „Ręka do spasowania” (pl m8.yaml:56): w całym pliku fold = foldare (terms-nazwy.yaml:20), tu jedyne „lasciare” |
| it-X2-08 | ŚR | content/it/exams/m8.yaml:79 | `Hai {{t:top-pair|coppia massima}} con un kicker` | `Hai {{t:top-pair|top pair}} con un kicker` | Jak it-X2-04 (terms-nazwy.yaml:85); pl m8.yaml:79 |
| it-X2-09 | ŚR | content/it/exams/m9.yaml:17 | `{{t:value|per value}}` | `{{t:value|per valore}}` | Nazwa terminu value wg terms-nazwy.yaml:98 to „valore” („per valore” w it m7, m8, m10); pl m9.yaml:17 |
| it-X2-10 | NISKIE | content/it/exams/m9.yaml:37 | `e {{t:fold|foldi}} se` | `e {{t:fold|fold}} se` | Opcja odpowiedzi w 2. osobie („foldi”) wśród opcji rzeczownikowych/1. osoby; pl m9.yaml:37 „Bet … i {{t:fold}}” |
| it-X2-11 | ŚR | content/it/exams/m9.yaml:52 | `Quante {{t:value|street di value}}` | `Quante {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:52 |
| it-X2-12 | ŚR | content/it/exams/m9.yaml:56 | `Tre {{t:value|street di value}}` | `Tre {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:56 |
| it-X2-13 | ŚR | content/it/exams/m9.yaml:72 | `da tre {{t:value|street di value}}` | `da tre {{t:value|street di valore}}` | Jak it-X2-09 (terms-nazwy.yaml:98); pl m9.yaml:72 |
| it-X2-14 | ŚR | content/it/exams/m10.yaml:43 | `un {{t:maniac|maniaco}}` | `un {{t:maniac|maniac}}` | Nazwa terminu maniac wg terms-nazwy.yaml:162 to „maniac”; pl m10.yaml:43 |
| it-X2-15 | ŚR | content/it/exams/m10.yaml:45 | `il {{t:maniac|maniaco}}` | `il {{t:maniac|maniac}}` | Jw. (terms-nazwy.yaml:162); pl m10.yaml:45 |
| it-X2-16 | ŚR | content/it/exams/m10.yaml:61 | `{{t:draw|draw}}` | `{{t:draw|progetto}}` | Nazwa terminu draw wg terms-nazwy.yaml:51 to „progetto” (tak w it m7, m8); pl m10.yaml:61 |
| it-X2-17 | ŚR | content/it/exams/m10.yaml:80 | `{{t:rake-cap|rake cap}}` | `{{t:rake-cap|tetto del rake}}` | Nazwa terminu rake-cap wg terms-nazwy.yaml:164 to „tetto del rake”; pl m10.yaml:80 |
| it-X2-18 | ŚR | content/it/exams/m12.yaml:29 | `Bastano qualche decina` | `Basta qualche decina` | Błąd zgody liczby („qualche decina” jest w lp); pl m12.yaml:29 „Kilkadziesiąt tysięcy rąk wystarczy”; sens bez zmian |
| it-X2-19 | ŚR | content/it/exams/m13.yaml:26 | `text: "In linea", why: "In linea è` | `text: "Conforme", why: "Conforme è` | Werdykt „Zgodna” (pl m13.yaml:26) nazywa się w interfejsie i lekcji „Conforme” (apps/mobile/src/i18n/locales/it.json:137, 461; content/it/lessons/m13-l1-raport.md:36, 90); „In linea” nie występuje nigdzie indziej |
| it-X2-20 | ŚR | content/it/exams/m13.yaml:44 | `un {{t:oesd|progetto di scala bilaterale}}` | `un {{t:oesd|OESD}}` | Nazwa terminu oesd wg terms-nazwy.yaml:54 to „OESD”; pl m13.yaml:44 ma „{{t:oesd|OESD}}” |
| it-X2-21 | ŚR | content/it/exams/m13.yaml:51 | `contro un {{t:open|open}}` | `contro un'{{t:open|apertura}}` | Nazwa terminu open wg terms-nazwy.yaml:65 to „apertura” (tak w it m7, m10); pl m13.yaml:51 |

### it-U

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-U-01 | ŚR | apps/mobile/src/i18n/locales/it.json:859 | „così distanti che nessuna coppia rientra in cinque consecutivi” | „così distanti che non ce ne sono due entro cinque consecutivi” | pl.json:875 „żadne dwie nie mieszczą się w pięciu kolejnych” (dwie rangi). „coppia” to w aplikacji nazwa układu (para, terms-nazwy `pair`), zdanie czyta się jak „żadna para”. |
| it-U-02 | ŚR | apps/mobile/src/i18n/locales/it.json:877 | „Qui nessuna coppia di carte del giocatore dà neanche un” | „Qui nessuna combinazione di due carte del giocatore dà neanche un” | pl.json:893 „żadne dwie karty gracza”. „coppia di carte del giocatore” = para na ręce; sens zawężony do par. |
| it-U-03 | NISKIE | apps/mobile/src/i18n/locales/it.json:487 | „Carte di ripasso:” | „Schede di ripasso:” | pl.json:497 „Karty powtórek” (fiszki). W aplikacji pokerowej „carte” to karty do gry; fiszki to „schede”. |
| it-U-04 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „dalla scala dei punti” | „dalla classifica delle combinazioni” | pl „od zasad i układów kart”. W aplikacji układy to „combinazioni” (content/it/modules.yaml:1; it.json:697), a „scala” = strit. |
| it-U-05 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „regole e punti” | „regole e combinazioni” | pl „zasady i układy”; tytuł modułu w aplikacji „Regole e combinazioni” (content/it/modules.yaml:1). |
| it-U-06 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „un indice di avanzamento” | „un indice di livello” | pl „wskaźnik zaawansowania”; w aplikacji „Indice di livello” (it.json:285). |

### it-T

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| it-T-01 | ŚR | content/it/terms-def.yaml:68 | „Il primo rilancio di un open … e l'open come seconda” | „Il primo rilancio di un'apertura … e l'apertura come seconda” | Niespójny termin: pl `content/terms.yaml:597` „Pierwsze przebicie otwarcia … a otwarcie jako drugi”; nazwa w `terms-nazwy.yaml:65` to „apertura”, a lekcje i reguły mają 192/192 form znacznika `open` jako apertura/aprire (0× „open” w prozie włoskiej). Słowniczek nazywa to samo pojęcie inaczej niż kurs. |
| it-T-02 | ŚR | content/it/terms-def.yaml:86 | „dopo un open preflop” | „dopo un'apertura preflop” | Jak wyżej; pl `content/terms.yaml:744` „po otwarciu preflop”. |
| it-T-03 | ŚR | content/it/terms-def.yaml:136 | „per fare call contro un open serve una mano più forte che per fare open” | „per fare call contro un'apertura serve una mano più forte che per aprire” | Jak wyżej; pl `content/terms.yaml:1144` „do sprawdzenia otwarcia … niż do samego otwarcia”. |
| it-T-04 | ŚR | content/it/terms-nazwy.yaml:3–4 | `royal-flush: "scala reale"`, `straight-flush: "scala colore"` | — (decyzja terminologiczna, bez poprawki; propozycja: `royal-flush: "scala reale massima"`, `straight-flush` zostaje „scala colore” albo „scala reale”) | W potocznym i słownikowym włoskim „scala reale” oznacza zwykle straight flush (pl `content/terms.yaml:38–41` „poker”), a royal flush (pl :30–33 „poker królewski”) to „scala reale massima”; tłumacz sam to odnotował w komentarzu ([DO USTALENIA]). Para „scala reale / scala colore” też występuje w listach układów, więc to nie błąd oczywisty, ale czytelnik może wziąć „scala reale” za układ nr 2. Zmiana wymaga też `lessons/m0-l1-uklady.md:24,87–88`. Definicje (terms-def:1–2) są poprawne przy obu wariantach. |

## Błędy w źródle pl (bez poprawki; do roli 06)

**it-R2**

Brak. (Numeracja R-M12 przeskakuje z 009 na 011 tak samo w pl, en i it; to nie różnica przekładu.)

## Do sprawdzenia (pewność ≤ 80%; pytania do człowieka znającego język albo decyzja globalna)

**it-L1**

- m4-l2-obrona-bb.md:92 — it „3-bet e chiamata sono accorpati” zgadza się z en („are combined”), ale pl m4-l2-obrona-bb.md:92 ma „są ze sobą powiązane”; różnica pl ↔ en/it (połączone w siatce vs powiązane), do rozstrzygnięcia po stronie źródła.
- Rodzajnik przed procentami ze znacznika: w zdaniach typu „apre {{n:solver.rfi.utg}} delle mani” (m3-l3:55, 65, 71, 77), „circa {{n:…}}–{{n:…}} delle mani” (m3-l1:26, 35, 61, 63; m4-l1:79, 93; m4-l2:79, 89), „Ti serve {{n:eq.bet-pot}}” (m2-l2:25, 35), „tra {{n:range.mixed.low}} e {{n:range.mixed.high}}” (m3-l3:47) po włosku zwykle stoi rodzajnik („apre il 17% delle mani”, „circa il 15–18%”). Wzorzec obejmuje zapewne wszystkie lekcje it; wymaga decyzji globalnej (i sprawdzenia, jak znacznik renderuje wartość), dlatego bez poprawek punktowych.
- m4-l2-obrona-bb.md:92 „di solito li {{t:call|chiami}}” (×2): „chiamare” z ręką jako dopełnieniem („sprawdzasz tymi rękami”); w m4-l1:99 ta sama treść jako „con … fai solo call / di solito chiami”. Zrozumiałe, ale mniej naturalne.
- 3-bet w rodzaju męskim („il/un 3-bet”) w m3-l2, m4-l1, m4-l2, podczas gdy komentarz w terms-nazwy.yaml podaje r. ż. („una 3-bet”); spójne w plikach, bez znacznika, więc bez konfliktu.

**it-L2**

- m5-l1-tekstury.md:101, 103 — `{{t:oesd|progetto di scala bilaterale}}`; pl ma `{{t:oesd}}` bez formy, terms-nazwy: oesd = „OESD”. Forma opisowa jest zrozumiała i wiąże się z „(bilaterale o gutshot)” w l. 74 oraz „progetto bilaterale” w l. 101, ale nie jest formą nazwy z terms-nazwy (plik sam oznacza to jako [WIELE FORM]). Decyzja terminologiczna dla całego języka, nie błąd tej lekcji.
- m5-l3-czestotliwosc-rozmiar.md:26, 33, 50, 100, 110, 112, 116, 130, 133 oraz m5-l4-bez-pozycji.md:36, 37, 85 — rozmiar zakładu bez rodzajnika przed procentem: „Punta circa `{{n:cbet.size.small}}` del piatto”, „un c-bet di `{{n:cbet.size.small}}` del piatto”, „Con `{{n:cbet.size.small}}` del piatto è il …” (wartości to 33% / 75%). W prozie włoskiej poprawnie „il 33% del piatto” / „del 33%”; w żargonie rozmiarów bywa pomijane, a wzorzec jest w obu plikach konsekwentny, więc nie zgłaszam jako znaleziska.
- Nazwa waleta: m5-l1:62 i m5-l2:64 „jack”, m5-l3:46, 56 „fante/fanti” (pl wszędzie „walet”). Oba poprawne; niespójność między lekcjami, bez wpływu na sens.
- Rywal: m5-l1 konsekwentnie „rivale”, pozostałe pliki „avversario” (pl wszędzie „rywal”). Wewnątrz pliku spójnie.
- m4-l3 (cały plik): „il/un 3-bet”, „il 4-bet” w rodzaju męskim; terms-nazwy podaje r. ż. („una 3-bet”) z adnotacją, że tłumacz używa r. m. bez konfliktu. W pliku spójnie.
- m5-l2-przewagi.md:72 — „a volte ha una coppia in mano” za pl „ma parę z ręki” (czyli pocket pair); w tej samej lekcji (l. 27) termin to „coppia servita”. Sens zachowany, możliwe ujednolicenie.

**it-L3**

- Rodzaj „c-bet”: m6-l1-mdf-alpha.md używa rodzaju żeńskiego (l. 79 „una c-bet da 1/3”, l. 82 „contro una c-bet piccola”, l. 132 „contro le c-bet piccole”), pozostałe cztery pliki męskiego („un c-bet”, „il c-bet”, „i c-bet”). terms-nazwy.yaml podaje dla c-bet r. f. Wymaga jednej decyzji dla całego języka; bez poprawki.
- „Rozmiar” (betu) ma trzy odpowiedniki w części: „taglia” (m6-l3: l. 27, 36, 133, 135), „misura” (m7-l1: l. 47, 87), „sizing” (m7-l2, wiele miejsc). Nie jest to termin ze słownika; do ujednolicenia przy decyzji globalnej.
- „backdoor”: m7-l1:118 „con un backdoor” (m.), m7-l2:117 „con una backdoor” (ż.); terms-nazwy: r. m.
- Walet: m6-l2:54 „di fanti”, m7-l1:26 „di jack”.
- m6-l2:129–132: nagłówek „Con cosa {{t:fold|foldi}}” i punkty listy w bierniku („le mani senza…”, „di solito due carte alte…”) nie łączą się składniowo (lista „Con cosa chiami” ma „con …”); drobne.
- Brak rodzajnika przed samym procentem poza zwrotem „di equity” (np. m7-l2:80, 81, 89, 90 „gli serve {{n:…}}”; m7-l1:65 „Circa {{n:…}} di chiudere”; m7-l2:44 „circa {{n:odds.flush.vs-set}}”): w skrótowych odpowiedziach dopuszczalne, nie poprawiam.
- it-L3-12 i it-L3-13 („l'” przed 8,5% i 8%) zależą od bieżących wartości w content/numbers.yaml (4 z 47; 15 ÷ 180); po zmianie liczb rodzajnik trzeba sprawdzić ponownie.
- Terminy oesd/top-pair/dry (it-L3-01…11): terms-nazwy.yaml oznacza je [WIELE FORM]/[DO USTALENIA]; poprawki idą za nazwą ze słownika. Jeśli decyzja językowa będzie inna (np. „asciutto” z terms-def), kierunek poprawki należy odwrócić, ale niespójność między plikami pozostaje faktem.

**it-L4**

- Nazwa waleta: m7-l3:85 i m7-l4 (63, 66, 76, 86) „fante/fanti”, a m8-l3 (68, 69) i m8-l4 (60, 61, 80) „jack”. W każdym pliku spójnie, ale między lekcjami dwie nazwy tej samej karty (w całym `content/it/lessons` jack ×15, fante ×9); decyzja do ujednolicenia globalnie.
- `{{t:oesd|progetto di scala bilaterale}}` (m7-l3:54) kontra `{{t:oesd}}` = „OESD” (m7-l4:46, 86): forma nie jest formą nazwy z terms-nazwy („OESD”; plik terminów sam oznacza to [WIELE FORM]).
- Pisownia „bluff-catcher” (m8-l2, m8-l4, bez znacznika, jak w pl) kontra terms-nazwy „bluff catcher”.
- Rodzaj „probe bet” i „c-bet”: w m7-l4 męski („il probe bet”, „il c-bet”), terms-nazwy podaje r. f; bez znaczników, spójnie w pliku.
- „un asso alto” jako „as-high” (m8-l1:71, 121; m8-l3:45, 50): może być czytane jako „wysoki as”; spójne, zrozumiałe z kontekstu.
- Rodzajnik MDF: m7-l4 „l'{{t:mdf}}”, m8-l2/m8-l4 „la {{t:mdf}}” (oba poprawne, niespójne między lekcjami).

**it-L5**

- m9-l2-zaangazowanie.md:15, 22 „il suo pareggio” za pl „jego wyrównanie” (wyrównanie zakładu): „pareggio” kojarzy się po włosku z remisem; ewentualnie „la sua chiamata”. Sens w kontekście czytelny.
- m9-l2-zaangazowanie.md:46, 65 „Hai chiuso la coppia massima” (pl „Trafiłeś”): m9-l1:80 ma „Hai centrato”; „chiudere” zwykle o skompletowanym drawie, potocznie używane też o parze.
- „Piatto 3-bet” (m9-l3:48, 54, 87, 122) vs „piatto 3-bettato” (m9-l4:53, 111, 127): niespójność między plikami, poza słownikiem terminów; w obrębie pliku spójnie.
- „materiali didattici” (m9-l2:113) / „materiali formativi” (m9-l4:130) / „materiali di formazione” (m10-l1:130) za pl „materiały szkoleniowe”: trzy warianty, bez skutku dla sensu.
- m10-l1-statystyki.md:123 „Gli allenatori” za pl „Trenerzy”: w żargonie pokerowym naturalniejsze „I coach”.
- Cudzysłowy: «…» w m9-l2:75, “…” w m9-l3:58 i m10-l1:60.

**it-L6**

- m10-l2-typy-graczy.md:80 — „La {{t:pair|coppia}} massima” (pl „Najwyższa {{t:pair}}”), a w tym samym pliku to pojęcie to „{{t:top-pair|top pair}}” (l. 39, 43, 78, 132; terms-nazwy top-pair: „top pair”). Dwie nazwy jednego pojęcia, ale ujednolicenie wymagałoby zmiany znacznika ({{t:pair}} → {{t:top-pair}}), więc bez poprawki.
- m11-l1-push-fold.md:15, 16, 24, 120 — pl rozróżnia „podbicie” (własne otwarcie, bez znacznika) i „{{t:raise|przebicie}}” (odpowiedź rywala); po włosku oba to „rilancio” („Il rilancio e il {{t:fold}} dopo un {{t:raise|rilancio}}”, „Rilancio a …, poi decido dopo un {{t:raise|rilancio}}”). Sens da się odczytać, ale zdania są mniej jasne niż w pl; ewentualnie „controrilancio” w formie znacznika — decyzja terminologiczna.
- m10-l3-odejscie-od-bazy.md:122 „gli allenatori” / „materiali formativi” wobec m10-l2:142 „coach” / „materiali didattici” (pl w obu „trenerzy”, „materiały szkoleniowe”) — niespójność między plikami, w obrębie pliku spójnie.
- m10-l4-rake.md:67, 87 „3-betto / 3-bettare” wobec „faccio 3-bet / fare 3-bet” w m10-l2 i m10-l3 — niespójność stylu między plikami (terms-nazwy 3-bet: brak formy czasownikowej).
- m10-l3-odejscie-od-bazy.md:49 „tutte le dimensioni e tutti i tavoli” — wierne pl („wszystkie rozmiary i stoły”, en „tables”), ale w l. 109 pl ma „rozmiary i flopy”; ewentualna niespójność jest w źródle, nie w przekładzie.

**it-L7**

- m12-l4-bankroll.md:22–42, 96, 141 oraz m12-l2:24: procent jako sama wartość wyniku bez rodzajnika („il rischio scende a circa {{n:ror.base}}”, „sale da circa … a circa …”, „basta circa {{n:study.winner}}”, „dà circa {{n:res.kk-wins}}”). W prozie włoskiej zwykle „circa il 6%”; zostawiono, bo to podawanie wyniku rachunku i forma bywa akceptowana. Do decyzji zbiorczej razem z poprawkami 01–26.
- Rodzajnik wpisany na sztywno przy `{{n:…}}` (także istniejące „il {{n:…}}” w m12-l1 i m13-l1) zależy od wartości liczby; przy zmianie wartości w numbers.yaml (np. 80 → 75) rodzajnik trzeba zmienić ręcznie. Mechanizm, nie błąd przekładu.
- m13-l2:60, 93 „coach” wobec m13-l3:64, 87 „allenatori” dla pl „trenerzy”: dwie nazwy między plikami (w całym korpusie obie występują); w obrębie jednego pliku spójnie.
- m13-l1:52, 55 i m13-l2:58 „un 3-bet / un 4-bet”, m13-l2:89 „un c-bet”: rodzaj męski, a terms-nazwy.yaml podaje r. ż.; tekst bez znacznika, plik terminów sam odnotowuje to jako bez konfliktu.
- m13-l2:96 „modulo sullo {{t:exploit|sfruttamento}}”: forma „sfruttamento” przy nazwie terminu „exploit” (terms-nazwy: [WIELE FORM]); zgodne z tytułem modułu M10 „Sfruttare i microlimiti”, więc bez znaleziska.

**it-R1**

- Kierunek it-R1-02…05: `terms-nazwy.yaml` (dry: „secco”) ma dopisek [WIELE FORM] [DO USTALENIA] i wzmiankę, że `terms-def` używa „asciutto”; w całym `content/it/rules.yaml` jest konsekwentnie „asciutto” (także w polu `source` linii 338: „flop asciutto”, „flop asciutti”, „confine asciutto/intermedio” — bez poprawki, pole niewidoczne w aplikacji). Jeśli decyzją będzie „asciutto”, poprawić należy `terms-nazwy.yaml`, a poprawki 02–05 odrzucić.
- it:603 „il tuo {{t:draw|progetto}} è alla mano migliore” (pl:603 „masz draw do najlepszej ręki”): zrozumiałe, ale mało naturalne; możliwe „hai un progetto per la mano migliore”.
- it:612 „proprio allora paghi di più” (pl:612 „wtedy płacisz najwięcej”, en „you pay the most”): stopień najwyższy oddany wyższym; sens kierunkowo zachowany.
- it:510 „favorevoli a chi ha rilanciato preflop” (pl:510 „dobrych dla przebijającego”): dopisane „preflop”, zgodne z en („good for the preflop raiser”) — uznane za poprawne doprecyzowanie.
- Komentarze YAML w liniach 1–17, 208, 329–331, 440–441, 532–533, 641–642 zostały po polsku (identyczne ze źródłem); nie są treścią aplikacji.

**it-R2**

- Rodzaj „value bet”: `content/it/rules.yaml:649` „un value bet”, `:871` i `:874` „del value bet” (rodzaj męski), a `terms-nazwy.yaml` podaje dla `value-bet` rodzaj żeński („una value bet”). W tych miejscach nie ma znacznika, więc konfliktu technicznego nie ma; do ujednolicenia w skali całego języka.
- Rodzajnik przed procentem ze znacznika: w całym pliku (także w pierwszej połowie, 33× „circa {{n:…}}”) wartości procentowe stoją bez rodzajnika („circa {{n:…}} delle mani”, „più di {{n:…}} delle mani”, „con circa {{n:var.conf95}} di confidenza”), a włoski wymaga „circa il 14%”, „più del 50%”, „l'80%”. Rodzajnik zależy od liczby (il/l'), więc poprawka statyczna jest ryzykowna; decyzja systemowa (formatowanie liczb dla it).
- `content/it/rules.yaml:662` „con la {{t:position|posizione}} raramente scendi sotto 1/2” za pl „z {{t:position|pozycji}}” (en „with position”): zrozumiałe, ale naturalniej „in posizione”; forma znacznika musiałaby zostać formą terminu `position`.
- `content/it/rules.yaml:1037` „all'inizio hai più da recuperare” za pl „masz najwięcej do nadrobienia” (stopień najwyższy osłabiony do wyższego; sens zalecenia bez zmiany).
- `content/it/rules.yaml:1048` „l'all-in spreme dall'avversario il massimo dei fold” za pl „all-in wyciska z nich [żetonów] najwięcej pasów rywala”: odniesienie przesunięte z żetonów na rywala, sens praktyczny ten sam.

**it-X1**

- m2.yaml:12, 36, 45, 86: `{{t:oesd|progetto di scala bilaterale}}`, a nazwa terminu w terms-nazwy.yaml:54 to „OESD” (oznaczone tam [WIELE FORM]). W pliku konsekwentnie, w całym przekładzie to forma większościowa (16× wobec 4× „OESD”); decyzja o ujednoliceniu należy do koordynatora.
- m6.yaml:77: `{{t:top-pair|coppia massima}}`, nazwa terminu „top pair” (terms-nazwy.yaml:85, [WIELE FORM]); w przekładzie obie formy są częste (35× / 49×).
- Rodzaj „c-bet”: m5 męski („un c-bet piccolo” :51, „al c-bet” :75), m6 żeński („una c-bet”, „le c-bet piccole”); terms-nazwy.yaml:88 podaje r. ż., ale w całym przekładzie przeważa męski. Podobnie „il/un 3-bet”, „il 4-bet” w m3–m4 (terms: r. ż.).
- Pozostałe procenty bez rodzajnika: „Ti serve {{n:eq.bet-pot}}” (m2.yaml:80, 98), „corrisponde a {{n:cbet.size.big}} del piatto” (m5.yaml:50), „C-bet di {{n:cbet.size.big}} del piatto” (m5.yaml:89–90), „({{n:cbet.size.small}} del piatto” (m5.yaml:51). Ten sam wzorzec jest w całym przekładzie („Ti serve N” 13× wobec 2× z rodzajnikiem), więc nie poprawiałem punktowo.

**it-X2**

- Rodzaj „c-bet”: żeński w m7 i m13 („la c-bet”, „una c-bet”; zgodnie z terms-nazwy.yaml:88), męski w całym m10 („un c-bet”, „i c-bet”, „un c-bet grande”: linie 17, 19, 61, 63–66). Tekst bez znacznika, wewnątrz pliku spójny; do ujednolicenia decyzją koordynatora (podobnie „un 3-bet” w m10 wobec r. ż. w terms-nazwy.yaml:70).
- m9.yaml:52, 56: „overpair di jack” wobec „fante/fanti” w m7 i m8 (nazwa karty niespójna między plikami, w pliku spójna).
- m13.yaml:16, 17: „circa una quota {{n:exam.m13.lose.big}} delle mani / dei casi” (wartość to procent): poprawne, ale ciężkie; naturalniej „circa il …”, czego nie da się zrobić bezpiecznie dla 10% i 90% jednym rodzajnikiem przy zmiennej liczbie, więc bez poprawki.
- m11.yaml:57: „l'avversario all-in con {{n:exam.m11.bf.s3}} e {{n:exam.m11.bf.s4}}” można odczytać tak, że rywal ma oba stacki; ta sama dwuznaczność jest w pl m11.yaml:57 (en rozdziela przecinkiem), więc bez poprawki.
- Poprawki terminologiczne (oesd, top-pair, value, maniac, draw, rake-cap, open) wynikają wprost z `content/it/terms-nazwy.yaml`; jeśli koordynator dopuszcza formy opisowe tłumacza („coppia massima”, „progetto di scala bilaterale”), można je pominąć bez szkody dla sensu.

**it-U**

- it.json:308 `advancement.historyHint` „Una barra per ogni giorno… Ultimo: {{last}}.” — jeśli „Ostatni” (pl.json:317) odnosi się do słupka, po włosku powinno być „Ultima” (barra, r.ż.); jeśli do dnia/wyniku — zostaje. Kontekst klucza tego nie rozstrzyga.
- metadane-fala2.json it.subtitle „Decidi meglio, senza puntate” i opis „niente puntate”: „puntata” to w aplikacji termin „bet” (przycisk „Puntata {{bb}}bb” w trybie gry), więc „bez zakładów” może być czytane jako niezgodne z ekranem; pl/en mówią o stawkach / prawdziwych pieniądzach („bez gry o stawki”, „no real money”). Wariant mieszczący się w limicie: „Decidi meglio senza soldi veri” (30). „Decidi meglio” to też lekka obietnica wyniku, której pl („Nauka pokera”) nie ma. Decyzja ASO, nie błąd przekładu.
- metadane-fala2.json it.description „Decisioni valutate su quattro livelli” bez nazw stopni (pl/en je wymieniają). Skrót jest świadomy we wszystkich lokalizacjach fali 2; skoro interfejs it ma już nazwy (it.json:137–140), można dopisać „: conforme, accettabile, imprecisione, errore”.
- Opis sklepu: „outs, odds” wobec „out, probabilità” w aplikacji (modules.yaml:3) — dopuszczalne jako frazy wyszukiwania.
- it.json:669 „o contesa (il solver si discosta in essa dalle tabelle pubbliche)” — sens zgodny z pl.json:682, sformułowanie sztywne („controversa”, „su di essa”); styl.
- Rodzaj „3-bet”: terms-nazwy podaje r.ż., it.json:756 ma „i 3-bet” (r.m.); brak znacznika, więc bez konfliktu budowania — do ujednolicenia razem z lekcjami.

**it-T**

- `terms-nazwy.yaml:45` `late-position: "posizione avanzata"` — rzadkie we włoskim pokerze; częściej „late position”, „ultime posizioni” / „posizioni finali” (symetrycznie do `early-position: "posizioni iniziali"`, linia 44, liczba mnoga). „Avanzata” bywa rozumiane dwuznacznie. W lekcjach 2 użycia (m3-l2:55 w znaczniku, m4-l1:36 poza znacznikiem).
- `terms-nazwy.yaml:84` `wetness: "bagnatura"` — neologizm („bagnatura” = zwilżanie); w lekcjach formy 2× „bagnatura”, 2× „umidità”. Możliwe naturalniejsze: opis („quanto è bagnato il board”) albo „coordinazione del board” (por. def :82 „quanto il board è coordinato”).
- `terms-nazwy.yaml:47–49` `hijack`, `cutoff`, `button` małą literą, a pl (`terms.yaml:402,411,420`) i cały przekład piszą wielką: „Button” 277× vs „button” 2× w lekcjach/regułach, `terms-def.yaml` wszędzie „Button”, „Cutoff”. Znaczników bez formy jest 0, więc dziś bez skutku w tekście; do ujednolicenia, jeśli nazwa trafia do słowniczka.
- `terms-nazwy.yaml:132` `m-ratio: "M-ratio"` — pl ma nazwę „M” (`terms.yaml:1096`), definicje it :131–132 mówią „zona di M”; nazwa angielska jako włoska jest dopuszczalna, ale różni się od użycia w definicjach.
- Rodzaj „c-bet”: `terms-def.yaml:103–104` „una c-bet” (ż., zgodnie z komentarzem źródłowym w terms-nazwy:88), a w lekcjach i regułach dominuje m. („un/il/i/del c-bet” 106× vs „una/la/della/le c-bet” 27×). „3-bet” jest spójnie m. (93× vs 0×; def :69 „un 3-bet”). Trzeba wybrać jeden rodzaj dla „c-bet”.
- `terms-nazwy.yaml:18` `call: "call"` przy użyciu w kursie głównie „chiamata/chiamare” (patrz Uwagi) i `:85` `top-pair: "top pair"` przy „coppia massima” 31× w formach — decyzja, która forma jest nazwą wiodącą.
- `terms-def.yaml:11` „senza coppia né niente di meglio” — potoczne; ewentualnie „senza coppia né combinazioni migliori” (pl :123 „bez pary ani lepszej kombinacji”). Styl, bez zmiany sensu.

## Uwagi ogólne czytających

**it-L1**

Przekład wierny: nie znalazłem zmienionych liczb, kierunków, pozycji ani zagrań; wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura front matter są nienaruszone (pliki wyrównane liniami ze źródłem). Znaleziska to głównie terminologia niezgodna z `terms-nazwy.yaml` (side-pot, oesd, pocket-pair, hole-cards, chips) i drobne niespójności nazw w obrębie pliku (passare/foldare, call/chiamata). Powtarzający się wzorzec stylistyczny: brak rodzajnika przed procentami ze znaczników (patrz „Do sprawdzenia”). Brak znalezisk KRYT i WYS; pliki m0-l1 i m2-l2 bez znalezisk.

**it-L2**

Przekład jest wierny: we wszystkich sześciu plikach nie znalazłem zmienionej liczby, kierunku zalecenia, pozycji ani zagrania, a znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura front matter są nienaruszone i zgodne ze źródłem linia w linię. Wszystkie znaleziska to terminologia i gramatyka (brak KRYT i WYS). Powtarzający się wzorzec: m5-l3 wygląda na przekład z innej partii niż m5-l1/l2/l4 — inne nazwy tych samych terminów („asciutto” zamiast „secco”, c-bet w rodzaju męskim, „materiali di formazione”, „fante”), a „coppia massima” i „umidità” odbiegają od terms-nazwy. Drugi wzorzec: w m5-l4 konsekwentnie brakuje rodzajnika przed procentem w zdaniach typu „in circa X dei casi”. Błąd osoby „Folda” zamiast „Foldo” występuje tylko w m4-l4 (2×).

**it-L3**

Przekład jest wierny: wszystkie liczby, kierunki zaleceń, pozycje, zagrania, znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura front matter zgadzają się ze źródłem; brak znalezisk KRYT i WYS. Powtarzający się wzorzec to niespójne nazwy terminów między plikami tej samej części (top pair / coppia massima, OESD / progetto di scala bilaterale, secco / asciutto) oraz rodzaj c-betu i słowo na „rozmiar”. Drugi wzorzec to rodzajnik przy procentach z `{{n:…}}`: brak rodzajnika albo „il” przed liczbą zaczynającą się od 8. Język jest naturalny, forma „tu” konsekwentna.

**it-L4**

Przekład wierny i naturalny; wszystkie znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura YAML zgodne ze źródłem linia w linię, nie znaleziono zmienionych liczb, kierunków ani pominięć. Znaleziska to drobne niespójności terminologiczne i dwie kalki. Powtarzający się wzorzec to różnice między lekcjami (fante/jack, size/dimensione, materiali didattici/di formazione, microlimiti/micro-limiti), a nie wewnątrz jednej lekcji.

**it-L5**

Przekład wierny: wszystkie liczby, kierunki zaleceń, pozycje i zagrania zgodne ze źródłem; nie znaleziono błędów KRYT ani WYS. Znaczniki `{{n:…}}`, `{{t:…}}`, identyfikatory, klucze YAML i tabele nienaruszone we wszystkich pięciu plikach (zestaw kluczy zgodny z pl linia w linię). Jedyny powtarzający się wzorzec to formy terminów spoza `terms-nazwy.yaml`: „coppia massima” w całym m9-l2 (19×) i „sfruttamento” w m10-l1 (2×). Język naturalny, forma „tu” konsekwentna.

**it-L6**

Przekład jest wierny: nie znalazłem odwróconego sensu, zgubionej liczby ani zepsutego znacznika; wszystkie {{n:…}}, {{t:…}}, [[…]], identyfikatory i struktura YAML zgodne ze źródłem. Główny powtarzający się wzorzec to składnia wokół procentów: {{n:…}} o jednostce procent wstawione jak liczebnik („con circa {{n}} mani” = „circa 58% mani”, ŚR) oraz brak rodzajnika przed procentem („ti serve {{n}} di equity”, NISKIE), mimo że w m10 tłumacz zwykle pisze „il/nel/del {{n}}”. Drugi wzorzec to niespójne nazwy terminów względem terms-nazwy: chips („chip” / „fiche” / „fiches”), payout („pagamenti” / „premi”), dry („asciutto”), bet („bet” / „puntata”), fold („passa” raz w m11-l3). Styl i naturalność poza tym dobre, forma zwracania się (tu) konsekwentna.

**it-L7**

Przekład wierny i naturalny; w m12 nie znaleziono żadnej zmiany liczby, granicy, kierunku ani pominiętego zdania, a nazwy stopni oceny i ekranów w m13 zgadzają się ze słownikiem interfejsu (Conforme, Accettabile, Imprecisione, Senza valutazione, Tempo scaduto, Ripassi, Gioco libero, «Aiuto»). Jedyny powtarzający się wzorzec to rodzajnik przy procentach ze znacznika `{{n:…}}`: m12-l1 stosuje „il” konsekwentnie, m12-l2/l3/l4 go pomijają (23× NISKIE), a w trzech miejscach m12-l2 i trzech m13-l1 wstawione „il” daje błędne „il 1%” / „il 80%” (6× ŚR). Poza tym jedno „outs” zamiast „out” (ŚR) i drobiazg „un limite giornaliero”. Terminologia zgodna z terms-nazwy.yaml (buy-in, limite, deviazione standard, varianza, downswing, sessione, piatto, rischio di rovina).

**it-R1**

Przekład jest wierny i naturalny: liczby, przedziały, kierunki zaleceń, pozycje i ręce zgodne ze źródłem we wszystkich regułach R-M0–R-M7; nie znaleziono błędów KRYT ani WYS. Znaczniki `{{n:…}}` nienaruszone, a `{{t:…}}` mają poprawne klucze poza jednym zgubionym `bet` (linia 537). Jedyny wzorzec terminologiczny to „asciutto” zamiast „secco” z `terms-nazwy.yaml` (4 widoczne wystąpienia). Powtarza się też szyk „pubblicata/e qui”, który zmienia odniesienie „tu” z sytuacji przy stole na miejsce publikacji. Forma zwracania się (2. os. lp.) i terminy fold/call/raise/piatto/progetto są spójne.

**it-R2**

Przekład drugiej połowy jest wierny: wszystkie liczby, zakresy, kierunki zaleceń i przeczenia zgodne ze źródłem, znaczniki `{{n:…}}` i `{{t:…}}` kompletne i z niezmienionymi kluczami, cytaty i adresy w polach source nienaruszone. Reguły R-M12-* (wariancja, tilt, bankroll, zejście o limit „al più tardi” / powrót „non prima”) są kompletne i bez zmiany sensu; jedyne znalezisko tam to drobny dodatek stylistyczny. Powtarzające się wzorce: „maniaco” zamiast nazwy terminu „maniac” oraz brak rodzajnika przed procentami ze znaczników (wzorzec całego pliku). Terminologia poza tym spójna z `terms-nazwy.yaml` (piatto, puntata, rilancio, limite, fiches, premi, bolla, tetto del rake).

**it-X1**

Przekład jest wierny: we wszystkich 7 plikach pytania, odpowiedzi (także oznaczone `correct`/`sizeError`) i wyjaśnienia znaczą to samo co w źródle, nie znalazłem zmienionej liczby, kierunku, pozycji ani zagrania. Znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura YAML są zgodne ze źródłem linia w linię. Powtarzający się wzorzec to brak rodzajnika przed procentem ze znacznika `{{n:…}}`. Między plikami są drobne niespójności słownictwa bez skutku dla sensu: „dimensione” (m3, m5) wobec „size” (m4), „puntata ÷ (piatto + puntata)” (m5) wobec „bet ÷ (piatto + bet)” (m6), „in/al/dal CO”, „da/dall'HJ”.

**it-X2**

Przekład egzaminów m7–m13 jest wierny: nie znalazłem żadnej zmiany liczby, kierunku, zagrania ani pozycji, a poprawne odpowiedzi i wyjaśnienia pasują do pytań tak jak w źródle; wszystkie znaczniki są nienaruszone. Treść krytyczna m12 (wariancja, tilt, ryzyko bankructwa, próg zejścia ze stawki, odesłanie do ekranu „Aiuto”, zgodne z interfejsem) jest kompletna i bez zmiany sensu; jedyne znalezisko to błąd zgody liczby. Powtarzający się wzorzec to formy terminów niezgodne z `terms-nazwy.yaml` i różne między plikami (top pair / coppia massima, per valore / per value, apertura / open, progetto / draw), co sugeruje kilku tłumaczy lub kilka przebiegów. Jedyna rozbieżność widoczna dla użytkownika jako nazwa z interfejsu to werdykt „In linea” zamiast „Conforme” w m13. Nazwy typów tiltu w m12 zgadzają się z lekcją m12-l3.

**it-U**

Przekład interfejsu jest kompletny (wszystkie klucze pl, komplet form `_one/_many/_other`, parametry i klucze `{{t:…}}` zgodne), naturalny i spójny z terms-nazwy; „PokerGym” nieprzetłumaczone. Teksty zakupu (okresy 3 miesiące / rok, automatyczne odnowienie, anulowanie w ustawieniach konta Apple, dostęp do końca opłaconego okresu, zakup jednorazowy) są wierne. helplines.yaml: zdanie o lekarzu/specjaliście i numerze alarmowym pełne, nazwa organizacji i adres bez zmian, w pliku nie ma numerów telefonów ani godzin. spots.yaml i modules.yaml bez znalezisk; liczby i znaczniki identyczne. Jedyny powtarzający się wzorzec to użycie „coppia” w znaczeniu „dwie dowolne” oraz drobne rozbieżności nazw między opisem sklepu a aplikacją; w metadanych brak słów sugerujących hazard na pieniądze, limity Apple zachowane.

**it-T**

Definicje (162/162) są wierne źródłu: liczby, przykłady kart, kierunki i ostrzeżenia „da non confondere” zgodne; zdania o polskim uzusie („W polskich tekstach…”, „sprawdzam/czekam”, „przy stole, stół finałowy”) zostały rozsądnie zaadaptowane lub pominięte tak jak w en; jedyny systematyczny rozjazd w pliku to „open” zamiast „apertura” (5 wystąpień, 3 linie). Zliczenia w `lessons/` + `rules.yaml` (formy w znacznikach): zgodne z nazwą są pot (piatto/piatti 719 + 14 bez formy; poza znacznikami „piatto” 49×, „pot” tylko w id/cytatach), bet (puntata/puntare 328 + 14; poza znacznikami 343×), raise (rilancio… 236 + 3; poza 42×), check (215, wszystkie „check”), fold (552, wszystkie fold/foldare; poza znacznikami „passare” w znaczeniu fold tylko 2×: m1-l1:52, m8-l4:82), flush (colore 97 + 2), straight (scala 101 + 3), draw (progetto 164 + 4), bluff (420), value (valore 83), equity, range, position (posizione 68 + 5) — w prozie brak angielskich zamienników. Rozjazdy systematyczne nazwa ↔ użycie: call — nazwa „call”, a formy to „chiamata/chiamare/chiama…” ok. 647 z 687 (same „call” 26 + 14 bez formy; poza znacznikami „chiam-” 81× vs „call” ok. 10× w prozie); top-pair — „coppia massima/e” 31 vs „top pair” 23 + 24 bez formy; dry — „secco/secchi” 29 vs „asciutto/i” 17 (+3 poza znacznikami w rules.yaml:338); maniac — „maniaco” 12 (+2 poza) vs nazwa „maniac” (2 bez formy); exploit — „sfruttamento” 6 vs 1 bez formy; oesd — „(progetto di) scala bilaterale” 10 vs OESD 4; payout — „pagamenti” 4 vs „premi” 3 + 1; side-pot — „piatto laterale” 2 (m1-l1:95) vs nazwa i definicje „piatto secondario”; wetness — „umidità” 2 vs „bagnatura” 2; chips — „fiches” 50 / „fiche” 8 / „chip” 3. Do tego rodzaj „c-bet” (m. 106 vs ż. 27) opisany wyżej; „value bet” i „c-bet” nie mają form w znacznikach (0 znaczników) i w prozie są spójnie „value bet” / „c-bet”.

