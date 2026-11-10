# Pełny przegląd przekładu — es — 2026-11-10 (sesja AQ, rola 09 audit, tylko dokumenty)

Stan przekładu: gałąź `claude/sleepy-brahmagupta-2065nu` @ 016317e. Źródło: pl (en pomocniczo). Czytający: 13 subagentów w świeżym kontekście (ten sam model co sesja), instrukcja `../instrukcja-subagenta.md`; 0 USD API, workflow `przeglad-tlumaczen.yml` nieuruchamiany. To drugi przegląd AI całości, nie przegląd rodzimego użytkownika języka.

## Liczby

| Część | Zakres | KRYT | WYS | ŚR | NISKIE | Znalezisk | Poprawek |
|---|---|---|---|---|---|---|---|
| es-L1 | m0-l1 m1-l1 m2-l1 m2-l2 m3-l1 m3-l2 m3-l3 m4-l1 m4-l2 | 0 | 0 | 3 | 4 | 7 | 7 |
| es-L2 | m4-l3 m4-l4 m5-l1 m5-l2 m5-l3 m5-l4 | 0 | 1 | 8 | 4 | 13 | 13 |
| es-L3 | m6-l1 m6-l2 m6-l3 m7-l1 m7-l2 | 0 | 0 | 2 | 8 | 10 | 10 |
| es-L4 | m7-l3 m7-l4 m8-l1 m8-l2 m8-l3 m8-l4 | 0 | 0 | 2 | 4 | 6 | 6 |
| es-L5 | m9-l1 m9-l2 m9-l3 m9-l4 m10-l1 | 0 | 0 | 3 | 1 | 4 | 3 |
| es-L6 | m10-l2 m10-l3 m10-l4 m11-l1 m11-l2 m11-l3 | 0 | 0 | 11 | 4 | 15 | 15 |
| es-L7 | m12-l1 m12-l2 m12-l3 m12-l4 m13-l1 m13-l2 m13-l3 | 0 | 0 | 20 | 15 | 35 | 35 |
| es-R1 | rules.yaml R-M0…R-M7 | 0 | 0 | 1 | 2 | 3 | 3 |
| es-R2 | rules.yaml R-M8…R-M13 | 0 | 0 | 4 | 0 | 4 | 4 |
| es-X1 | exams m0–m6 | 0 | 0 | 7 | 2 | 9 | 9 |
| es-X2 | exams m7–m13 | 0 | 0 | 3 | 2 | 5 | 5 |
| es-U | interfejs, areas, modules, spots, helplines, metadane sklepu | 0 | 0 | 1 | 3 | 4 | 3 |
| es-T | terms-def, terms-nazwy | 0 | 0 | 8 | 1 | 9 | 7 |
| es-S | uzupełnienia koordynującego (wzorce czytających w miejscach nieobjętych; `uzupelnienia.tsv`) | – | – | – | – | – | 3 |
| **Razem** | | **0** | **1** | **73** | **50** | **124** | **123** |

Poprawki do nałożenia: `poprawki-es.json` (123; wg wagi: ŚR 71, NISKIE 51, WYS 1) — format `docs/lokalizacja/narzedzia/poprawki.mjs` (jezyk, cel, stary, nowy, waga, powod, grupa); `stary` występuje w pliku `cel` dokładnie raz na stanie 016317e. Jedno znalezisko może mieć kilka poprawek (wzorzec rozpisany na wystąpienia), a jedna poprawka łączyć dwa znaleziska w tym samym fragmencie.

## Rozstrzygnięcia koordynującego (sesja AQ; terminologiczne — do weta)

**Weryfikacja przeciwna WYS (u źródła, 2026-11-10):** es-L2-02 `content/es/lessons/m4-l4-limperzy.md:33` „todos pasan hasta ti” — potwierdzone: pl `content/pl/lessons/m4-l4-limperzy.md:33` „wszyscy pasują do ciebie” (fold), a „pasar” to w es nazwa **check** (`content/es/terms-nazwy.yaml:16`), więc zdanie mówi „wszyscy czekają”. Zostaje WYS. Dwa ŚR w treści krytycznej m12 (es-L7: m12-l3:33 „saltos de límite” bez „w górę”; m12-l4:85 „recuperar” dla „nadrobić”) sprawdzone w źródle: nie zmieniają liczby, granicy ani kierunku zalecenia — zostają ŚR.

**D-431 (2026-11-10, es): forma rodzima spójna w całym korpusie zostaje; forma mieszana idzie za nazwą z `terms-nazwy.yaml`.** Wzór: D-389 („pareja mayor” jako forma, nazwa „top pair”). (1) Zostają bez zmian, bo są konsekwentne: top-pair „pareja mayor” (80×), blocker „bloqueador(es)” (22/22 form), overpair „sobrepareja” (9×) — dlatego **odrzucona** poprawka es-U-01 (`modules.yaml:9` „bloqueadores” → „blockers” wprowadzałaby drugą formę). (2) Ujednolicane do nazwy, bo mieszane: overbet „sobreapuesta” (2×) → „overbet” (29×; es-R1-01, es-L4-02), alpha „alfa” (3×) → „alpha” (194×; es-L3-01 + es-S 2), „pareja máxima” → „pareja mayor” (es-L6), „recreacional” (3×) → „recreativo” (25×), „posiciones tempranas” → „primeras posiciones”, „probabilidades implícitas” → „odds implícitas”, etykiety raportu „Sin valorar/Valoradas/Alineada” → jak w `es.json` („Sin evaluar/Evaluadas/Acorde”). Odrzucone: (b) wszystko do nazwy angielskiej z pliku nazw — zmienia ok. 110 miejsc wbrew D-389; (c) zostawić mieszane — sprzeczne z „jedna nazwa na jedno pojęcie”.

**Odrzucona poprawka es-L5-03** (`m9-l3:89` usunięcie `{{t:bet|hacer}}`): źródło pl ma w tym zdaniu dwa znaczniki (`{{t:bet|postawisz}} {{t:bet}}`), a instrukcja wymaga zestawu kluczy jak w źródle; po usunięciu es miałby 47 wobec 48 w pl. Znalezisko zostaje w tabeli jako uwaga stylistyczna.

**Bez rozstrzygnięcia (decyzja globalna dla języka; do skryptu `ujednolic-formy.mjs` sesji kodu albo rodzimego użytkownika):**
- „Button” (ok. 209×) wobec „botón/Botón” (ok. 101×; nazwa w pliku nazw: „botón”) — zgłoszone przez 7 czytających, bez poprawek; rekomendacja: jedna forma w całym es, kierunek wg nazwy („el botón”), wykonanie skryptem z przeglądem wielkiej litery.
- call: „igualar” (ok. 590) obok „pago/pagar” (ok. 290); rodzaj „c-bet” (m. 100×, ż. 22× — poprawki tylko tam, gdzie czytający je zgłosił: es-L2, es-X1, es-U, es-T) i MDF („el/la”); „fuera de posición” / „sin posición” 48:8; „combinaciones” / „combos” 13:9; `{{t:oesd|proyecto de escalera abierta}}` wobec „OESD”; `{{t:wheel|rueda}}`; „bubble factor” po angielsku.
- Metadane sklepu es-ES: opis pomija nazwy czterech stopni oceny (tak samo it i pt-BR — decyzja generatora `docs/sklep/aso/zbuduj-metadane.py`, rola 10); poprawka es-U-04 („indicador de nivel”) dotyczy pliku generowanego — nanieść w źródle generatora.

**Błąd źródła (do roli 06, bez poprawki):** pl `content/pl/exams/m2.yaml:89` „Strit daje … outów” — relacja odwrócona (outy dają strita); es powtarza wiernie.

**Kontrola łączna (`scal.py es --bez es-U-01,es-L5-03`):** 0 pominiętych; YAML/JSON parsuje się; `{{n:…}}` i `[[…]]` = pl. Różnice kluczy `{{t:…}}` wobec pl po poprawkach: `lessons/m9-l1-spr.md` (bet −2, tak samo w en i it — stan sprzed przeglądu); `lessons/m0-l1-uklady.md:88, :99` (opis „una escalera del mismo palo”, „con doble pareja” — sprawdzone, sens poprawny, nie znalezisko); `m10-l1` (`t:nit` +1), `m9-l4` (bet −1), `exams/m4.yaml:92` (`t:value` +1, jak en) — bez wpływu na sens.

## Pokrycie jednostek (65 z `jednostki()` w `scripts/i18n/wspolne.mjs:147` + 2 poza listą)

| Nr | Jednostka | Przejrzana w całości | Przez kogo |
|---|---|---|---|
| 1 | `apps/mobile/src/i18n/locales/es.json` | tak | es-U |
| 2 | `content/es/areas.yaml` | tak | es-U |
| 3 | `content/es/exams/m0.yaml` | tak | es-X1 |
| 4 | `content/es/exams/m1.yaml` | tak | es-X1 |
| 5 | `content/es/exams/m10.yaml` | tak | es-X2 |
| 6 | `content/es/exams/m11.yaml` | tak | es-X2 |
| 7 | `content/es/exams/m12.yaml` | tak | es-X2 |
| 8 | `content/es/exams/m13.yaml` | tak | es-X2 |
| 9 | `content/es/exams/m2.yaml` | tak | es-X1 |
| 10 | `content/es/exams/m3.yaml` | tak | es-X1 |
| 11 | `content/es/exams/m4.yaml` | tak | es-X1 |
| 12 | `content/es/exams/m5.yaml` | tak | es-X1 |
| 13 | `content/es/exams/m6.yaml` | tak | es-X1 |
| 14 | `content/es/exams/m7.yaml` | tak | es-X2 |
| 15 | `content/es/exams/m8.yaml` | tak | es-X2 |
| 16 | `content/es/exams/m9.yaml` | tak | es-X2 |
| 17 | `content/es/lessons/m0-l1-uklady.md` | tak | es-L1 |
| 18 | `content/es/lessons/m1-l1-przebieg.md` | tak | es-L1 |
| 19 | `content/es/lessons/m10-l1-statystyki.md` | tak | es-L5 |
| 20 | `content/es/lessons/m10-l2-typy-graczy.md` | tak | es-L6 |
| 21 | `content/es/lessons/m10-l3-odejscie-od-bazy.md` | tak | es-L6 |
| 22 | `content/es/lessons/m10-l4-rake.md` | tak | es-L6 |
| 23 | `content/es/lessons/m11-l1-push-fold.md` | tak | es-L6 |
| 24 | `content/es/lessons/m11-l2-sprawdzanie.md` | tak | es-L6 |
| 25 | `content/es/lessons/m11-l3-icm.md` | tak | es-L6 |
| 26 | `content/es/lessons/m12-l1-wariancja.md` | tak | es-L7 |
| 27 | `content/es/lessons/m12-l2-decyzja-wynik.md` | tak | es-L7 |
| 28 | `content/es/lessons/m12-l3-tilt.md` | tak | es-L7 |
| 29 | `content/es/lessons/m12-l4-bankroll.md` | tak | es-L7 |
| 30 | `content/es/lessons/m13-l1-raport.md` | tak | es-L7 |
| 31 | `content/es/lessons/m13-l2-powtorki.md` | tak | es-L7 |
| 32 | `content/es/lessons/m13-l3-przeglad.md` | tak | es-L7 |
| 33 | `content/es/lessons/m2-l1-outy.md` | tak | es-L1 |
| 34 | `content/es/lessons/m2-l2-pot-odds.md` | tak | es-L1 |
| 35 | `content/es/lessons/m3-l1-pozycja.md` | tak | es-L1 |
| 36 | `content/es/lessons/m3-l2-rece-startowe.md` | tak | es-L1 |
| 37 | `content/es/lessons/m3-l3-zakresy-otwarc.md` | tak | es-L1 |
| 38 | `content/es/lessons/m4-l1-3bet.md` | tak | es-L1 |
| 39 | `content/es/lessons/m4-l2-obrona-bb.md` | tak | es-L1 |
| 40 | `content/es/lessons/m4-l3-wobec-3betu.md` | tak | es-L2 |
| 41 | `content/es/lessons/m4-l4-limperzy.md` | tak | es-L2 |
| 42 | `content/es/lessons/m5-l1-tekstury.md` | tak | es-L2 |
| 43 | `content/es/lessons/m5-l2-przewagi.md` | tak | es-L2 |
| 44 | `content/es/lessons/m5-l3-czestotliwosc-rozmiar.md` | tak | es-L2 |
| 45 | `content/es/lessons/m5-l4-bez-pozycji.md` | tak | es-L2 |
| 46 | `content/es/lessons/m6-l1-mdf-alpha.md` | tak | es-L3 |
| 47 | `content/es/lessons/m6-l2-sprawdzenie.md` | tak | es-L3 |
| 48 | `content/es/lessons/m6-l3-check-raise.md` | tak | es-L3 |
| 49 | `content/es/lessons/m7-l1-druga-beczka.md` | tak | es-L3 |
| 50 | `content/es/lessons/m7-l2-polaryzacja.md` | tak | es-L3 |
| 51 | `content/es/lessons/m7-l3-implied-odds.md` | tak | es-L4 |
| 52 | `content/es/lessons/m7-l4-probe-obrona.md` | tak | es-L4 |
| 53 | `content/es/lessons/m8-l1-value.md` | tak | es-L4 |
| 54 | `content/es/lessons/m8-l2-ile-blefow.md` | tak | es-L4 |
| 55 | `content/es/lessons/m8-l3-blokery.md` | tak | es-L4 |
| 56 | `content/es/lessons/m8-l4-bluff-catching.md` | tak | es-L4 |
| 57 | `content/es/lessons/m9-l1-spr.md` | tak | es-L5 |
| 58 | `content/es/lessons/m9-l2-zaangazowanie.md` | tak | es-L5 |
| 59 | `content/es/lessons/m9-l3-rozmiar-geometryczny.md` | tak | es-L5 |
| 60 | `content/es/lessons/m9-l4-plan-trzech-ulic.md` | tak | es-L5 |
| 61 | `content/es/modules.yaml` | tak | es-U |
| 62 | `content/es/rules.yaml` | tak | es-R1 (do R-M7) + R2 (od R-M8) |
| 63 | `content/es/ranges/spots.yaml` | tak | es-U |
| 64 | `content/es/helplines.yaml` | tak | es-U |
| 65 | `content/es/terms-def.yaml` | tak | es-T |
| + | `content/es/terms-nazwy.yaml` | tak | es-T |
| + | `docs/sklep/aso/metadane-fala2.json (es-ES)` | tak | es-U |

Nieprzejrzane: brak (deklaracje pokrycia z zakresami linii: sekcja „Pokrycie” każdego pliku `czesci/es-*.md`).

## Znaleziska

### es-L1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L1-01 | ŚR | content/es/lessons/m2-l2-pot-odds.md:97 | `{{t:implied-odds\|probabilidades implícitas}}` | `{{t:implied-odds\|odds implícitas}}` | Nazwa terminu wg `content/es/terms-nazwy.yaml` (implied-odds: „odds implícitas”); pl m2-l2-pot-odds.md:97 `{{t:implied-odds}}`. |
| es-L1-02 | ŚR | content/es/lessons/m3-l1-pozycja.md:69 | `desde {{t:early-position\|posiciones tempranas}}` | `desde las {{t:early-position\|primeras posiciones}}` | Nazwa terminu wg terms-nazwy.yaml (early-position: „primeras posiciones”); pl m3-l1-pozycja.md:69 `{{t:early-position\|wczesnych pozycji}}`. |
| es-L1-03 | ŚR | content/es/lessons/m3-l3-zakresy-otwarc.md:77 | „casi tan amplio como el Botón” | „más o menos tan amplio como el Botón” | pl m3-l3-zakresy-otwarc.md:77 „podobnie szeroko jak Button” (en „about as wide as”); „casi tan amplio” = „prawie tak szeroko”, sugeruje węższy zakres, a przedział jest ten sam. |
| es-L1-04 | NISKIE | content/es/lessons/m3-l3-zakresy-otwarc.md:80 | „Para las `{{t:position\|posiciones}}` tempranas en” | „Para las primeras `{{t:position\|posiciones}}` en” | Spójność z nazwą terminu early-position („primeras posiciones”); pl m3-l3-zakresy-otwarc.md:80 „Dla wczesnych pozycji”. |
| es-L1-05 | NISKIE | content/es/lessons/m4-l1-3bet.md:48 | `{{t:pair\|Pareja}}: 22` | `{{t:pair\|Pareja}} de 22` | pl m4-l1-3bet.md:48 „Para 22”; dwukropek w tekście opcji nienaturalny. |
| es-L1-06 | NISKIE | content/es/lessons/m4-l1-3bet.md:99 | „99, KQo y AJo se juegan de formas distintas” | „99, KQo y AJo a veces se juegan de formas distintas” | pl m4-l1-3bet.md:99 „bywają grane różnie” — zgubione „bywają”. |
| es-L1-07 | NISKIE | content/es/lessons/m4-l2-obrona-bb.md:92 | „de la parte baja de tu `{{t:range\|rango}}` de `{{t:call\|igualar}}`” | „de la parte baja del `{{t:range\|rango}}` con el que `{{t:call\|igualas}}`” | Niegramatyczne „rango de igualar”; to samo zdanie pl (m4-l2-obrona-bb.md:92 „z dołu zakresu sprawdzenia”) oddane poprawnie w es m4-l1-3bet.md:99. |

### es-L2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L2-01 | NISKIE | m4-l3-wobec-3betu.md:87 | „un precio muy bueno para {{t:call}} {{t:out-of-position}}” | „para {{t:call\|igualar}} {{t:out-of-position}}” | Znacznik bez formy daje „para call fuera de posición” (niegramatyczne); pl m4-l3:87 „cenę na {{t:call}}”. W reszcie pliku forma czasownikowa „igualar”. |
| es-L2-02 | WYS | m4-l4-limperzy.md:33 | „todos pasan hasta ti” | „todos se retiran hasta ti” | pl m4-l4:33 „wszyscy pasują do ciebie” (fold; en: „everyone folds to you”). „Pasar” jest w przekładzie nazwą check (terms-nazwy: check = „pasar”), więc zdanie mówi „wszyscy czekają”; fałszywy przyjaciel pasować/pasar. |
| es-L2-03 | ŚR | m5-l1-tekstury.md:58 | „aprender la c-bet (una” | „aprender el c-bet (una” | Rodzaj terminu c-bet niespójny: m5-l2 i m5-l3 „el/un c-bet” (w całym es ok. 100× męski, ok. 23× żeński); pl m5-l1:58. |
| es-L2-04 | NISKIE | m5-l1-tekstury.md:101 | „{{t:straight}} o {{t:oesd}}” | „{{t:straight}} u {{t:oesd}}” | Po podstawieniu „escalera o OESD”; przed „o-” spójnik „u”. pl m5-l1:101. |
| es-L2-05 | NISKIE | m5-l1-tekstury.md:103 | „manos con {{t:straight}} o {{t:oesd}}” | „manos con {{t:straight}} u {{t:oesd}}” | Jak es-L2-04. pl m5-l1:103. |
| es-L2-06 | NISKIE | m5-l2-przewagi.md:98 | „De dónde salen estos principios” | „De dónde salen estas reglas” | pl m5-l2:98 „Skąd te zasady” — ten sam nagłówek w m4-l3, m4-l4, m5-l3, m5-l4 brzmi „estas reglas”. |
| es-L2-07 | ŚR | m5-l4-bez-pozycji.md:17 | „C-bet a menudo y pequeña, como en el Button” | „C-bet a menudo y pequeño, como en el Button” | Rodzaj c-bet: w m5-l3:17 ta sama opcja „pequeño”; pl m5-l4:17. |
| es-L2-08 | ŚR | m5-l4-bez-pozycji.md:26 | „Porque la c-bet … está prohibida” | „Porque el c-bet … está prohibido” | Rodzaj c-bet (w tym samym pliku l. 23, 95 „haces c-bet”, w m5-l3 męski); pl m5-l4:26. |
| es-L2-09 | ŚR | m5-l4-bez-pozycji.md:26 | „La cuestión es que la c-bet” | „La cuestión es que el c-bet” | Jak es-L2-08. |
| es-L2-10 | ŚR | m5-l4-bez-pozycji.md:47 | „C-bet pequeña, como en el mano a mano” | „C-bet pequeño, como en el mano a mano” | Jak es-L2-08; pl m5-l4:47. |
| es-L2-11 | ŚR | m5-l4-bez-pozycji.md:76 | „C-bet a menudo y pequeña:” | „C-bet a menudo y pequeño:” | To samo ćwiczenie (rodzina m5.cbet.btn-vs-bb) w m5-l3:17 ma „pequeño”; pl m5-l4:76. |
| es-L2-12 | ŚR | m5-l4-bez-pozycji.md:91 | „Las c-bets frecuentes, incluso pequeñas” | „Los c-bets frecuentes, incluso pequeños” | m5-l3:39 „Los c-bets frecuentes”; pl m5-l4:91. |
| es-L2-13 | ŚR | m5-l4-bez-pozycji.md:92 | „Una c-bet grande y frecuente” | „Un c-bet grande y frecuente” | m5-l3:40 „Un c-bet grande y frecuente”; pl m5-l4:92. |

### es-L3

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L3-01 | ŚR | content/es/lessons/m6-l3-check-raise.md:138 | „recuerda el alfa de la primera lección” | „recuerda el alpha de la primera lección” | Niespójny termin: pierwsza lekcja (m6-l1, tytuł i definicja) oraz terms-nazwy mają „alpha”; pl m6-l3:138 „alphę z pierwszej lekcji”. |
| es-L3-02 | ŚR | content/es/lessons/m6-l3-check-raise.md:116 | „casi siempre eliges de todos modos” | „la mayoría de las veces eliges de todos modos” | pl m6-l3:116 „najczęściej i tak wybierasz” (en „most of the time”); „casi siempre” = „prawie zawsze”, mocniejsze niż źródło. |
| es-L3-03 | NISKIE | content/es/lessons/m6-l3-check-raise.md:44 | „tras su {{t:call\|pago}}” | „tras su {{t:call\|igualada}}” | Termin call nazwany dwojako w jednym pliku (czasownik „igualar” ×29, rzeczownik „pago”); rzeczownik w m6-l1 to „igualada”. pl m6-l3:44. |
| es-L3-04 | NISKIE | content/es/lessons/m6-l3-check-raise.md:73 | „tus {{t:call\|pagos}} no sean todos débiles” | „tus {{t:call\|igualadas}} no sean todas débiles” | Jak es-L3-03. pl m6-l3:73. |
| es-L3-05 | NISKIE | content/es/lessons/m6-l3-check-raise.md:112 | „es un buen {{t:call\|pago}}” | „es una buena {{t:call\|igualada}}” | Jak es-L3-03. pl m6-l3:112. |
| es-L3-06 | NISKIE | content/es/lessons/m6-l3-check-raise.md:17 | „el solver solo {{t:call\|iguala}} con parte de las {{t:two-pair\|dobles parejas}}” | „con parte de las {{t:two-pair\|dobles parejas}} el solver se limita a {{t:call\|igualar}}” | Dwuznaczność: czyta się też „sprawdza tylko częścią dwóch par”. pl m6-l3:17 „część dwóch par solver tylko sprawdza”. |
| es-L3-07 | NISKIE | content/es/lessons/m6-l2-sprawdzenie.md:65 | „{{t:oesd\|proyecto abierto de escalera}}” | „{{t:oesd\|proyecto de escalera abierta}}” | Forma OESD inna niż w sąsiedniej lekcji m6-l3 (26, 72, 93, 123) i w większości treści es. pl m6-l2:65. |
| es-L3-08 | NISKIE | content/es/lessons/m6-l2-sprawdzenie.md:125 | „- normalmente también con as como carta más alta.” | „- normalmente también as como carta más alta.” | Zdublowany przyimek („continúas con: … con as”); pozostałe punkty listy (122–124) bez „con”. pl m6-l2:125. |
| es-L3-09 | NISKIE | content/es/lessons/m7-l1-druga-beczka.md:114 | „el rival {{t:call\|iguala}} y después apuesta en el turn” | „el rival {{t:call\|iguala}} y después otra apuesta en el turn” | Czyta się, jakby na turnie betował rywal; pl m7-l1:114 „c-bet na flopie, call, a potem bet na turnie” (bet agresora). |
| es-L3-10 | NISKIE | content/es/lessons/m7-l1-druga-beczka.md:137 | „bloquean el {{t:value\|valor}} del rival” | „bloquean el valor del rival” | Dodany znacznik terminu, którego nie ma w źródle: pl m7-l1:137 „blokują wartość rywala” zwykłym tekstem. Skrypt daje tu ostrzeżenie o zmianie zestawu znaczników (zamierzone). |

### es-L4

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L4-01 | ŚR | content/es/lessons/m8-l2-ile-blefow.md:31 | „Eso es el {{t:mdf}}” | „Eso es la {{t:mdf}}” | Rodzaj MDF: wszędzie indziej żeński („la {{t:mdf}}”, m7-l4:106,113,142; m8-l4:33,87,90,118); tu jedyny raz męski — błąd zgody widoczny dla użytkownika (pl m8-l2:31 „To {{t:mdf}}”). |
| es-L4-02 | ŚR | content/es/lessons/m8-l2-ile-blefow.md:38 | „Una {{t:overbet\|sobreapuesta}}, es decir, … incluir en ella más … que en ninguna otra” | „Un {{t:overbet\|overbet}}, es decir, … incluir en él más … que en ningún otro” | Zdanie wprowadza termin (pl m8-l2:38 „{{t:overbet\|Overbet}}, czyli {{t:bet\|zakład}} większy niż cała pula”); nazwa terminu w terms-nazwy.yaml to „overbet” (r.m.), „sobreapuesta” nie jest formą tego terminu. |
| es-L4-03 | NISKIE | content/es/lessons/m7-l3-implied-odds.md:122 | „(probabilidades implícitas)” | „(odds implícitas)” | Objaśnienie terminu (pl m7-l3:122 „szanse ukryte”) niezgodne z nazwą implied-odds w terms-nazwy.yaml („odds implícitas”). |
| es-L4-04 | NISKIE | content/es/lessons/m8-l2-ile-blefow.md:126 | „\| 1/2 {{t:pot\|bote}} \|” | „\| 1/2 del {{t:pot\|bote}} \|” | Brak „del”; sąsiednie wiersze tabeli „1/3 del”, „3/4 del” (pl m8-l2:126 „1/2 {{t:pot\|puli}}”). |
| es-L4-05 | NISKIE | content/es/lessons/m8-l4-bluff-catching.md:111 | „\| 1/2 {{t:pot\|bote}} \|” | „\| 1/2 del {{t:pot\|bote}} \|” | Jak es-L4-04; wiersz wyżej „1/3 del” (pl m8-l4:111). |
| es-L4-06 | NISKIE | content/es/lessons/m8-l4-bluff-catching.md:5 | „title: "Pagar faroles"” | „title: "Cazar faroles"” | pl m8-l4:5 „Łapanie blefów”; ta sama lekcja jest w es przywoływana jako „la lección sobre cazar faroles” (es m7-l4:116), a „łapać blefy” to w tych plikach konsekwentnie „cazar faroles” (es m8-l2:65,109). „Pagar faroles” = „płacić blefom”. |

### es-L5

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L5-01 | ŚR | content/es/lessons/m9-l2-zaangazowanie.md:110 | „Para meter todo el stack antes del river” | „Para meter todo el stack hasta el river” | pl m9-l2-zaangazowanie.md:110 „wpłacić cały stack do rivera” = do rivera włącznie (zakład na każdej ulicy; en „by the river”); „antes del river” wyklucza river i kłóci się z „en cada calle”; w m9-l3/m9-l4 ten sam zwrot oddano „hasta el river”. |
| es-L5-02 | ŚR | content/es/lessons/m9-l1-spr.md:137 | „Trío (set), {{t:straight\|escalera}} o mejor” | „Set, {{t:straight\|escalera}} o mejor” | pl m9-l1-spr.md:137 „set, {{t:straight}} i lepsze” (en „A set”); dodane „Trío” to nazwa innego terminu (three-of-a-kind: „trío”, set: „set” w terms-nazwy.yaml); wszędzie indziej w pliku i części „set”. |
| es-L5-03 | ŚR | content/es/lessons/m9-l3-rozmiar-geometryczny.md:89 | „Antes de {{t:bet\|hacer}} una {{t:bet\|apuesta}}” | „Antes de hacer una {{t:bet\|apuesta}}” | pl m9-l3-rozmiar-geometryczny.md:89 „{{t:bet\|postawisz}} {{t:bet}}”; „hacer” nie jest formą terminu bet (apuesta/apostar) — znacznik terminu na zwykłym czasowniku; w m9-l1:107 i m9-l4:95 to samo zdanie ma tylko „haga/hagas … {{t:bet\|apuesta}}”. Poprawka usuwa jeden znacznik t:bet (ostrzeżenie skryptu zamierzone). |
| es-L5-04 | NISKIE | content/es/lessons/m10-l1-statystyki.md:56 | „se ha {{t:fold\|retirado}} en {{n:hud.se.f3b.p}} de ellas” | „se ha {{t:fold\|retirado}} en el {{n:hud.se.f3b.p}} de ellas” | pl m10-l1-statystyki.md:56 „w {{n:hud.se.f3b.p}} z nich”; wartość to procent (numbers.yaml: unit percent) — po hiszpańsku wymagany rodzajnik „el 50 %”, jak w tej samej pozycji linia 59 „en el {{n:hud.se.f3b.p}} de los casos”. |

### es-L6

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L6-01 | NISKIE | m10-l2-typy-graczy.md:29 | «micro límites online» | «microlímites online» | Pisownia łączna, jak w m10-l3:75, 111, 115 i m10-l4:15 (pl m10-l2:29 „mikrostawek”). |
| es-L6-02 | ŚR | m10-l2-typy-graczy.md:80 | «La {{t:pair\|pareja}} máxima le gana» | «La {{t:pair\|pareja}} mayor le gana» | Ten sam termin (pl m10-l2:80 „Najwyższa {{t:pair}}” = top pair) w tym pliku to «pareja mayor» (linie 39, 43, 78, 132); tu druga nazwa. |
| es-L6-03 | ŚR | m10-l3-odejscie-od-bazy.md:129 | «{{n:mda.period.months}} meses antes de octubre de 2026» | «los {{n:mda.period.months}} meses anteriores a octubre de 2026» | pl m10-l3:129 „{{n}} miesięcy przed październikiem 2026” to okres danych; przekład czyta się jak punkt w czasie („12 miesięcy wcześniej”). W m10-l2:142 jest poprawnie. |
| es-L6-04 | NISKIE | m10-l4-rake.md:17 | «solo se queda con unos pocos por ciento del» | «solo se queda con un pequeño porcentaje del» | Kalka „kilka procent” (pl m10-l4:17). |
| es-L6-05 | NISKIE | m10-l4-rake.md:17 | «Unos pocos por ciento de cada {{t:pot\|bote}} tras el flop suman» | «Un pequeño porcentaje de cada {{t:pot\|bote}} tras el flop suma» | Jak wyżej (pl m10-l4:17). |
| es-L6-06 | ŚR | m11-l1-push-fold.md:63 | «de unas {{n:m11.push.10}} a unas {{n:m11.push.15}} manos» | «de aprox. el {{n:m11.push.10}} a aprox. el {{n:m11.push.15}} de las manos» | Znaczniki to procenty (numbers.yaml: unit percent → „58,3 %”); wynik „unas 58,3 % manos” jest niegramatyczny (pl m11-l1:63 „z ok. … do ok. … rąk”). W m11-l2 ten sam zwrot jest poprawnie: «aprox. … de las manos». |
| es-L6-07 | ŚR | m11-l1-push-fold.md:91 | «está en unas {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} manos» | «está en aprox. el {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} de las manos» | Jak 06 (pl m11-l1:91). |
| es-L6-08 | ŚR | m11-l1-push-fold.md:92 | «Sin ante, unas {{n:m11.push.10}}; con ante, unas {{n:m11.nash.push.10-ante}}–…» | «Sin ante, aprox. el {{n:m11.push.10}}; con ante, aprox. el {{n:m11.nash.push.10-ante}}–…» | Jak 06 (pl m11-l1:92). |
| es-L6-09 | ŚR | m11-l1-push-fold.md:152 | «con unas {{n:m11.push.15}} manos; … con unas {{n:m11.push.10}}, … ya con unas {{n:m11.nash.push.5}}–{{n:m11.push.5}}» | «con aprox. el {{n:m11.push.15}} de las manos; … con aprox. el {{n:m11.push.10}}, … ya con aprox. el {{n:m11.nash.push.5}}–{{n:m11.push.5}}» | Jak 06 (pl m11-l1:152). |
| es-L6-10 | ŚR | m11-l1-push-fold.md:156 | «con unas {{n:m11.3max.push.btn}} manos, … con unas {{n:m11.3max.push.sb}}» | «con aprox. el {{n:m11.3max.push.btn}} de las manos, … con aprox. el {{n:m11.3max.push.sb}}» | Jak 06 (pl m11-l1:156). |
| es-L6-11 | ŚR | m11-l1-push-fold.md:174 | «de unas {{n:m11.push.10}} a unas {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} manos» | «de aprox. el {{n:m11.push.10}} a aprox. el {{n:m11.nash.push.10-ante}}–{{n:m11.push.10-ante}} de las manos» | Jak 06 (pl m11-l1:174). |
| es-L6-12 | ŚR | m11-l2-sprawdzanie.md:83 | «{{t:bb-ante\|big blind ante}}» | «{{t:bb-ante\|ante de ciega grande}}» | terms-nazwy: bb-ante = «ante de ciega grande»; tak też w m11-l1:88, 134, 174 (pl m11-l2:83 „{{t:bb-ante}}”). Angielska nazwa zamiast hiszpańskiej. |
| es-L6-13 | ŚR | m11-l2-sprawdzanie.md:168 | «un {{t:bb-ante\|big blind ante}} de» | «un {{t:bb-ante\|ante de ciega grande}} de» | Jak 12 (pl m11-l2:168). |
| es-L6-14 | ŚR | m11-l2-sprawdzanie.md:140 | «Manos como [[7s 6s]] las {{t:shove\|empujas}} desde» | «Con manos como [[7s 6s]] {{t:shove\|haces push}} desde» | terms-nazwy: shove = «push»; w tym pliku «haces push» / «hace push» (linie 68, 132, 168). «empujas» to druga nazwa tego samego terminu (pl m11-l2:140 „{{t:shove\|pushujesz}}”). |
| es-L6-15 | NISKIE | m11-l2-sprawdzanie.md:140 | «tienen muy poca equity» | «tienen demasiado poca equity» | pl m11-l2:140 „mają za mało equity” (za mało, nie „bardzo mało”). |

### es-L7

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-L7-01 | ŚR | m12-l2-decyzja-wynik.md:68 | `Con una {{t:standard-deviation\|desviación típica}} de alrededor de` | `Con una {{t:standard-deviation\|desviación estándar}} de alrededor de` | termin: «desviación estándar» (terms-nazwy), nie «típica»; spójnie z m12-l1 (pl m12-l2-decyzja-wynik.md:68) |
| es-L7-02 | ŚR | m12-l2-decyzja-wynik.md:77 | `y de la {{t:standard-deviation\|desviación típica}} (lección` | `y de la {{t:standard-deviation\|desviación estándar}} (lección` | termin: «desviación estándar» (terms-nazwy), nie «típica» (pl m12-l2-decyzja-wynik.md:77) |
| es-L7-03 | ŚR | m12-l3-tilt.md:33 | `y a saltos de {{t:stakes\|límite}}. Es la señal` | `y a saltos a {{t:stakes\|límites}} más altos. Es la señal` | zgubiony kierunek «w górę stawek» (pl m12-l3:33) (pl m12-l3-tilt.md:33) |
| es-L7-04 | NISKIE | m12-l3-tilt.md:100 | `en un estudio por encuesta, {{n:tilt.severe}} de los jugadores` | `en un estudio por encuesta, el {{n:tilt.severe}} de los jugadores` | brak rodzajnika przed procentem (w m12-l1/l2 «el {{n}}») (pl m12-l3-tilt.md:100) |
| es-L7-05 | NISKIE | m12-l4-bankroll.md:58 | `le ocurre a aprox. {{n:dd.p.small.100k}} de los jugadores` | `le ocurre a aprox. el {{n:dd.p.small.100k}} de los jugadores` | brak rodzajnika przed procentem (pl m12-l4-bankroll.md:58) |
| es-L7-06 | NISKIE | m12-l4-bankroll.md:77 | `Lo protege de la bancarrota` | `Lo protege de la ruina` | «bankructwo» = termin risk-of-ruin «ruina», nie «bancarrota» (pl m12-l4:77) (pl m12-l4-bankroll.md:77) |
| es-L7-07 | ŚR | m12-l4-bankroll.md:85 | `Al principio es cuando más tienes que recuperar, así` | `Al principio es cuando más te queda por aprender, así` | «nadrobić» (naukę) oddane «recuperar», w tym module = odgrywać straty; mylące (pl m12-l4:85) (pl m12-l4-bankroll.md:85) |
| es-L7-08 | NISKIE | m12-l4-bankroll.md:95 | `no bajas de {{n:study.min}} del tiempo dedicado al estudio` | `no dedicas al estudio menos del {{n:study.min}} del tiempo` | dwuznaczne «X del tiempo dedicado al estudio»; pl: nie mniej niż X czasu na naukę (m12-l4:95) (pl m12-l4-bankroll.md:95) |
| es-L7-09 | NISKIE | m12-l4-bankroll.md:113 | `exclusivamente a jugar al póquer` | `exclusivamente a jugar al póker` | pisownia «póker» jak w pozostałych plikach (pl m12-l4-bankroll.md:113) |
| es-L7-10 | NISKIE | m12-l4-bankroll.md:141 | `dedicas aprox. {{n:study.beginner}} del tiempo` | `dedicas aprox. el {{n:study.beginner}} del tiempo` | brak rodzajnika przed procentem (pl m12-l4-bankroll.md:141) |
| es-L7-11 | ŚR | m13-l1-raport.md:38 | `text: "Sin valorar", why: "No: el spot tiene resultado del solver, así que la decisión está valorada. «Sin valorar» se asigna` | `text: "Sin evaluar", why: "No: el spot tiene resultado del solver, así que la decisión está valorada. «Sin evaluar» se asigna` | etykieta raportu w interfejsie to «Sin evaluar» (es.json unrated), nie «Sin valorar» (pl m13-l1-raport.md:38) |
| es-L7-12 | ŚR | m13-l1-raport.md:61 | `«Valoradas 14 de 30 decisiones»` | `«Evaluadas 14 de 30 decisiones»` | cytat z interfejsu: «Evaluadas {{rated}} de {{all}} decisiones» (es.json rated) (pl m13-l1-raport.md:61) |
| es-L7-13 | ŚR | m13-l1-raport.md:63 | `Sí: «sin valorar» no significa` | `Sí: «sin evaluar» no significa` | etykieta interfejsu «Sin evaluar» (pl m13-l1-raport.md:63) |
| es-L7-14 | ŚR | m13-l1-raport.md:64 | `«Sin valorar» es falta de valoración` | `«Sin evaluar» es falta de valoración` | etykieta interfejsu «Sin evaluar» (pl m13-l1-raport.md:64) |
| es-L7-15 | ŚR | m13-l1-raport.md:94 | `**Sin valorar**` | `**Sin evaluar**` | etykieta interfejsu «Sin evaluar» (pl m13-l1-raport.md:94) |
| es-L7-16 | ŚR | m13-l1-raport.md:97 | `«Valoradas X de Y decisiones»` | `«Evaluadas X de Y decisiones»` | cytat z interfejsu: «Evaluadas … de … decisiones» (pl m13-l1-raport.md:97) |
| es-L7-17 | ŚR | m13-l1-raport.md:80 | `En el módulo de mental game aprendiste` | `En el módulo de juego mental aprendiste` | termin mental-game = «juego mental» (terms-nazwy; tytuł modułu «Juego mental y bankroll») (pl m13-l1-raport.md:80) |
| es-L7-18 | NISKIE | m13-l1-raport.md:36 | `juega en al menos {{n:range.mixed.low}} de los casos es acorde` | `juega en al menos el {{n:range.mixed.low}} de los casos es acorde` | brak rodzajnika przed procentem (pl m13-l1-raport.md:36) |
| es-L7-19 | NISKIE | m13-l1-raport.md:43 | `en aprox. {{n:range.mixed.high}} de los casos` | `en aprox. el {{n:range.mixed.high}} de los casos` | brak rodzajnika przed procentem (pl m13-l1-raport.md:43) |
| es-L7-20 | NISKIE | m13-l1-raport.md:45 | `jugado en aprox. {{n:range.mixed.low}} de los casos` | `jugado en aprox. el {{n:range.mixed.low}} de los casos` | brak rodzajnika przed procentem (pl m13-l1-raport.md:45) |
| es-L7-21 | NISKIE | m13-l1-raport.md:46 | `jugada en al menos {{n:range.mixed.min}}, pero con menos frecuencia que en {{n:range.mixed.low}} de los casos` | `jugada en al menos el {{n:range.mixed.min}}, pero con menos frecuencia que en el {{n:range.mixed.low}} de los casos` | brak rodzajnika przed procentem (pl m13-l1-raport.md:46) |
| es-L7-22 | NISKIE | m13-l1-raport.md:47 | `que en {{n:range.mixed.min}} de los casos es una imprecisión` | `que en el {{n:range.mixed.min}} de los casos es una imprecisión` | brak rodzajnika przed procentem (pl m13-l1-raport.md:47) |
| es-L7-23 | NISKIE | m13-l1-raport.md:82 | `pierdes en aprox. {{n:m13.lose.example}} de las manos` | `pierdes en aprox. el {{n:m13.lose.example}} de las manos` | brak rodzajnika przed procentem (pl m13-l1-raport.md:82) |
| es-L7-24 | NISKIE | m13-l1-raport.md:90 | `en al menos {{n:range.mixed.low}} de los casos (este` | `en al menos el {{n:range.mixed.low}} de los casos (este` | brak rodzajnika przed procentem (pl m13-l1-raport.md:90) |
| es-L7-25 | NISKIE | m13-l1-raport.md:92 | `que en {{n:range.mixed.min}} de los casos. Cuenta` | `que en el {{n:range.mixed.min}} de los casos. Cuenta` | brak rodzajnika przed procentem (pl m13-l1-raport.md:92) |
| es-L7-26 | NISKIE | m13-l1-raport.md:101 | `en al menos {{n:range.mixed.min}} de los casos; con` | `en al menos el {{n:range.mixed.min}} de los casos; con` | brak rodzajnika przed procentem (pl m13-l1-raport.md:101) |
| es-L7-27 | ŚR | m13-l2-powtorki.md:13 | `A♥ K♥ en un {{t:board\|board}} Q♥ 7♥ 2♣` | `A♥ K♥ en una {{t:board\|mesa}} Q♥ 7♥ 2♣` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:13) |
| es-L7-28 | ŚR | m13-l2-powtorki.md:13 | `A♠ K♠ en un {{t:board\|board}} Q♠ 7♠ 2♦` | `A♠ K♠ en una {{t:board\|mesa}} Q♠ 7♠ 2♦` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:13) |
| es-L7-29 | ŚR | m13-l2-powtorki.md:22 | `K♥ Q♥ en un {{t:board\|board}} J♥ 8♥ 3♠` | `K♥ Q♥ en una {{t:board\|mesa}} J♥ 8♥ 3♠` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:22) |
| es-L7-30 | ŚR | m13-l2-powtorki.md:24 | `K♥ Q♥ en un {{t:board\|board}} J♠ 8♠ 3♥` | `K♥ Q♥ en una {{t:board\|mesa}} J♠ 8♠ 3♥` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:24) |
| es-L7-31 | ŚR | m13-l2-powtorki.md:24 | `solo en el {{t:board\|board}}: tus corazones ya no encajan con el {{t:board\|board}}` | `solo en la {{t:board\|mesa}}: tus corazones ya no encajan con la {{t:board\|mesa}}` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:24) |
| es-L7-32 | ŚR | m13-l2-powtorki.md:25 | `K♠ Q♠ en un {{t:board\|board}} J♠ 8♠ 3♥` | `K♠ Q♠ en una {{t:board\|mesa}} J♠ 8♠ 3♥` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:25) |
| es-L7-33 | ŚR | m13-l2-powtorki.md:26 | `K♦ Q♦ en un {{t:board\|board}} J♦ 8♦ 3♠` | `K♦ Q♦ en una {{t:board\|mesa}} J♦ 8♦ 3♠` | termin board = «mesa» (terms-nazwy; m13-l3 «{{t:board\|mesa}}»), nie «board» (pl m13-l2-powtorki.md:26) |
| es-L7-34 | ŚR | m13-l2-powtorki.md:34 | `Las decisiones conformes y las aceptables` | `Las decisiones acordes y las aceptables` | nazwa werdyktu «Acorde» (m13-l1, es.json), nie «conforme» (pl m13-l2:34 «Zgodne») (pl m13-l2-powtorki.md:34) |
| es-L7-35 | ŚR | m13-l3-przeglad.md:24 | `es fácil tomar una buena decisión por un error, o al revés` | `es fácil confundir una buena decisión con un error, o al revés` | «tomar una buena decisión por un error» czyta się jak «podjąć dobrą decyzję przez pomyłkę»; pl m13-l3:24 «uznać dobrą decyzję za błąd» (pl m13-l3-przeglad.md:24) |

### es-R1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-R1-01 | ŚR | content/es/rules.yaml:384 | `el solver también usa la {{t:overbet\|sobreapuesta}}` | `el solver también usa el {{t:overbet\|overbet}}` | R-M5-007 then; pl `content/pl/rules.yaml:384` „używa też {{t:overbet\|overbetu}}”. `terms-nazwy.yaml`: overbet → „overbet” (rodzaj męski); „sobreapuesta” to inna nazwa terminu (forma musi być formą tego samego terminu). |
| es-R1-02 | NISKIE | content/es/rules.yaml:473 | `los jugadores recreacionales pasivos` | `los jugadores recreativos pasivos` | R-M6-004 source; pl `content/pl/rules.yaml:473` „pasywni gracze rekreacyjni”. Ten sam termin w tej samej regule (pole population, linia 472) i w `terms-nazwy.yaml` to „jugador recreativo”. Pole source nie jest pokazywane w aplikacji, stąd niska waga. |
| es-R1-03 | NISKIE | content/es/rules.yaml:260 | `los conectores suited normalmente los igualas` | `los conectores del mismo palo normalmente los igualas` | R-M4-006 source; pl `content/pl/rules.yaml:260` „konektory w kolorze zwykle sprawdzasz”. W całym pliku „w kolorze” = „del mismo palo” (tak też `terms-nazwy.yaml`: suited); tu jedyny raz anglicyzm w tekście hiszpańskim. Pole source, niska waga. |

### es-R2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-R2-01 | ŚR | content/es/rules.yaml:857 | «jugadores recreacionales 42/18» | «jugadores recreativos 42/18» | Niespójny termin: `recreational` = «jugador recreativo» (terms-nazwy.yaml:160), tak w regułach R-M10-005/006/011 i w lekcjach (0 × «recreacional»). pl rules.yaml:857 „gracze rekreacyjni”. |
| es-R2-02 | ŚR | content/es/rules.yaml:874 | «y los jugadores recreacionales 32%» | «y los jugadores recreativos 32%» | Jak wyżej; w tej samej regule (linia 873, population) jest «jugadores recreativos». pl rules.yaml:874. |
| es-R2-03 | ŚR | content/es/rules.yaml:1003 | «solo piensas en recuperarte o juegas» | «solo piensas en recuperar lo perdido o juegas» | R-M12-007 (treść krytyczna): pl rules.yaml:1003 „myślisz tylko o odegraniu się” (en: „winning it back”) = odzyskanie strat; «recuperarte» czyta się też jako „dojść do siebie”, co zaciera sygnał ostrzegawczy. Lekcje es używają «recuperar lo perdido» (7 ×). Sens nieodwrócony, liczby i granice bez zmian. |
| es-R2-04 | ŚR | content/es/rules.yaml:1164 | «por eso la repetición de partida muestra» | «por eso el repaso de tus partidas muestra» | pl rules.yaml:1164 „powtórka z gry” to nazwa funkcji aplikacji; w es lekcja m13-l2 („Repasos de tus partidas”) i interfejs („Repasos”) nazywają ją «repaso»; «repetición de partida» nie występuje nigdzie indziej i sugeruje powtórzenie rozgrywki. |

### es-X1

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-X1-01 | NISKIE | content/es/exams/m0.yaml:21 | «ocupa el 3.º puesto» | «ocupa el 3.er puesto» | Apokopa: „tercer puesto” skraca się 3.er (pl m0.yaml:21 „na 3. miejscu”). |
| es-X1-02 | ŚR | content/es/exams/m3.yaml:21 | «(unas {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} manos)» | «(alrededor del {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} de las manos)» | Klucze mają jednostkę procent (numbers.yaml:81–82), więc wychodzi „unas 15 %–18 % manos”: niegramatyczne, czyta się jak liczba rąk (pl m3.yaml:21 „ok. …–… rąk”). |
| es-X1-03 | ŚR | content/es/exams/m3.yaml:49 | «abres unas {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} manos» | «abres alrededor del {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} de las manos» | Jak es-X1-02 (pl m3.yaml:49). |
| es-X1-04 | ŚR | content/es/exams/m3.yaml:59 | «abres amplio, unas {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} manos» | «abres amplio, alrededor del {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} de las manos» | Jak es-X1-02 (pl m3.yaml:59). |
| es-X1-05 | ŚR | content/es/exams/m3.yaml:70 | «desde {{t:early-position\|posiciones tempranas}}» | «desde las {{t:early-position\|primeras posiciones}}» | terms-nazwy.yaml:44: early-position = „primeras posiciones”; forma w znaczniku to inna nazwa (pl m3.yaml:70). |
| es-X1-06 | ŚR | content/es/exams/m4.yaml:14 | «Solo {{t:call\|pago}}» | «Solo {{t:call\|igualo}}» | Ta sama odpowiedź „Sprawdzam” w tym pliku wszędzie indziej to „Igualo” (m4.yaml:23, 72, 81, 92); pl m4.yaml:14. |
| es-X1-07 | ŚR | content/es/exams/m4.yaml:33 | «Los ases de distinto palo (AJo–A9o) en la … normalmente solo los {{t:call\|igualas}}» | «Con los ases de distinto palo (AJo–A9o) en la … normalmente solo {{t:call\|igualas}}» | Kalka: „igualar los ases” = wyrównać asy; sens to „sprawdzasz nimi” (pl m4.yaml:33); w tym samym pliku poprawnie „igualas con manos…” (m4.yaml:72). |
| es-X1-08 | ŚR | content/es/exams/m4.yaml:34 | «Las {{t:pair\|parejas}} medianas y pequeñas en la … normalmente las {{t:call\|igualas}}» | «Con las {{t:pair\|parejas}} medianas y pequeñas en la … normalmente {{t:call\|igualas}}» | Jak es-X1-07 (pl m4.yaml:34). |
| es-X1-09 | NISKIE | content/es/exams/m5.yaml:51 | «para una c-bet pequeña» | «para un c-bet pequeño» | Rodzaj „c-bet”: w m6 (np. m6.yaml:83 „un c-bet pequeño”) i w większości korpusu męski; pl m5.yaml:51. |

### es-X2

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-X2-01 | ŚR | content/es/exams/m13.yaml:26 | `text: "Alineada", why: "Alineada es la acción` | `text: "Acorde", why: "Acorde es la acción` | pl exams/m13.yaml:26 „Zgodna” = nazwa werdyktu z raportu (pl.json „Zgodna”); w interfejsie es ten werdykt to „Acorde” (apps/mobile/src/i18n/locales/es.json: grade.zgodne, verdicts.compliant). Odpowiedź w egzaminie nazywa werdykt inaczej niż raport. |
| es-X2-02 | ŚR | content/es/exams/m13.yaml:37 | `text: "Sin valorar", why: "«Sin valorar» es lo que recibe` | `text: "Sin evaluar", why: "«Sin evaluar» es lo que recibe` | pl exams/m13.yaml:37 „Bez oceny” = werdykt z raportu; w interfejsie es „Sin evaluar” (es.json verdicts.unrated). |
| es-X2-03 | ŚR | content/es/exams/m10.yaml:80 | `{{t:rake-cap|límite}}` | `{{t:rake-cap|tope}}` | pl exams/m10.yaml:80 `{{t:rake-cap|limit}}`. terms-nazwy: rake-cap = „tope de rake”, a „límite” to nazwa terminu stakes; „el límite queda fuera de alcance” czyta się jak stawka. Bliźniacze ćwiczenie w lessons/m10-l4-rake.md:49 ma „tope”. |
| es-X2-04 | NISKIE | content/es/exams/m11.yaml:18 | `ya solo juegas all-in o {{t:fold|retirarte}} e intentas` | `ya solo vas all-in o {{t:fold|te retiras}} e intentas` | pl exams/m11.yaml:18 „grasz już tylko all-in albo fold”; w es bezokolicznik zwrotny po formie osobowej („juegas … o retirarte”) jest niegramatyczny. |
| es-X2-05 | NISKIE | content/es/exams/m8.yaml:46 | `{{t:oesd|proyecto de escalera abierto}}` | `{{t:oesd|proyecto de escalera abierta}}` | pl exams/m8.yaml:46 `{{t:oesd|OESD}}`. Forma jednorazowa w całym content/es (1× wobec 13× „proyecto de escalera abierta”, m.in. exams/m7.yaml:63, m13.yaml:44). |

### es-U

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-U-01 | ŚR | content/es/modules.yaml:9 | `Valor, faroles, bloqueadores` | `Valor, faroles, blockers` | Termin `blocker` ma w `content/es/terms-nazwy.yaml:102` nazwę „blocker” („bloqueador” oznaczone tam jako forma bez źródła); pl `content/pl/modules.yaml:9` „blokery”. |
| es-U-02 | NISKIE | apps/mobile/src/i18n/locales/es.json:499 | `{{t:c-bet|c-bet}} pequeña` | `{{t:c-bet|c-bet}} pequeño` | Rodzaj terminu: w treści es „c-bet” jest męski (un c-bet ok. 70×, „c-bet pequeño” 25× wobec „pequeña” 3×); pl `pl.json:509` „mały c-bet”. |
| es-U-03 | NISKIE | apps/mobile/src/i18n/locales/es.json:758 | `{{t:value-bet|value bets}}, también más finas` | `…también más finos` | „value bet” w treści es jest męski („un value bet”, „del value bet”); zgoda przymiotnika. pl `pl.json:771` „także cieńszych”. |
| es-U-04 | NISKIE | docs/sklep/aso/metadane-fala2.json:19 (es-ES, description) | `un índice de progreso` | `un indicador de nivel` | Ta sama funkcja nazywa się w aplikacji „Indicador de nivel” (`es.json:285`, pl „Wskaźnik zaawansowania” `pl.json:294`; opis pl „wskaźnik zaawansowania”). |

### es-T

| Nr | Waga | plik:linia | Było | Ma być | Powód |
|---|---|---|---|---|---|
| es-T-01 | ŚR | content/es/terms-def.yaml:68 | „La primera subida a un open antes del flop; … y el open como la segunda.” | „La primera subida a una apertura antes del flop; … y la apertura como la segunda.” | Niespójny termin: pl `content/terms.yaml:597` „przebicie otwarcia … a otwarcie jako drugi”; `terms-nazwy.yaml:65` open = „apertura”, w lekcjach i regułach forma w znaczniku to apertura/abrir (192×), rzeczownik „open” poza znacznikami 0×. |
| es-T-02 | ŚR | content/es/terms-def.yaml:86 | „tras hacer open preflop” | „tras abrir preflop” | Jak wyżej; pl `content/terms.yaml:744` „po otwarciu preflop”. |
| es-T-03 | ŚR | content/es/terms-def.yaml:136 | „para igualar un open hace falta una mano más fuerte que para hacer el open tú” | „para igualar una apertura hace falta una mano más fuerte que para abrir tú” | Jak wyżej; pl `content/terms.yaml:1144` „do sprawdzenia otwarcia … niż do samego otwarcia”. |
| es-T-04 | ŚR | content/es/terms-def.yaml:123 | „para short stacks” | „para stacks cortos” | Niespójny termin: `terms-nazwy.yaml:145` short-stack = „stack corto” (tak też definicja w linii 143 i 10/10 form w lekcjach i regułach); pl `content/terms.yaml:1041`. |
| es-T-05 | ŚR | content/es/terms-def.yaml:141 | „aumentan el risk premium” | „aumentan la prima de riesgo” | Niespójny termin: `terms-nazwy.yaml:131` risk-premium = „prima de riesgo” (5/5 form w lekcjach i regułach); pl `content/terms.yaml:1183`. |
| es-T-06 | ŚR | content/es/terms-def.yaml:130 | „la suma de ciegas y antes de una mano” | „la suma de las ciegas y el ante de una mano” | Mylące: „y antes de una mano” czyta się jako „i przed rozdaniem”; pl `content/terms.yaml:1098` „sumę blindów i ante w jednym rozdaniu”. W lekcjach m11 termin stoi zawsze w liczbie pojedynczej („el ante”, „sin ante”). |
| es-T-07 | NISKIE | content/es/terms-def.yaml:103 | „tras una c-bet en el flop” | „tras un c-bet en el flop” | Rodzaj gramatyczny c-bet: w lekcjach męski 85×, żeński 22×; w regułach męski 15×, żeński 0×; 3-bet w definicjach i treści zawsze męski. pl `content/terms.yaml:881`. |
| es-T-08 | ŚR | content/es/terms-nazwy.yaml:85 | `top-pair: "top pair"` | — (decyzja terminologiczna, bez poprawki) | Nazwa nie zgadza się z użyciem: wszystkie 78 znaczników `{{t:top-pair\|…}}` w lekcjach i regułach mają formę „pareja mayor / parejas mayores”, „top pair” jako forma 0×. Znacznik bez formy dałby inną nazwę niż reszta kursu. Propozycja: „pareja mayor”. (Komentarz w pliku podaje nieaktualne „pareja máxima×84”.) |
| es-T-09 | ŚR | content/es/terms-nazwy.yaml:102 | `blocker: "blocker"` | — (decyzja terminologiczna, bez poprawki) | Nazwa nie zgadza się z użyciem: 22/22 znaczników `{{t:blocker\|…}}` ma formę „bloqueador(es)”. Propozycja: „bloqueador” albo zmiana form w treści. |

## Błędy w źródle pl (bez poprawki; do roli 06)

**es-R2**

- Brak błędów treści. Uwaga porządkowa (nie błąd przekładu): R-M11-010, pl rules.yaml:1122–1123: pole `source` cytuje cztery źródła (w tym Big Stack Advantage, upswingpoker.com/big-stack-advantage-stone-bubble/), a lista `sources` ma trzy wpisy; es wiernie to powtarza.

**es-X1**

- pl m2.yaml:89 „{{t:straight|Strit}} daje {{n:outs.oesd}} outów”: odwrócona relacja (to outy dają strita; en: „You have … outs to a straight”). Przekład es (m2.yaml:89 „La escalera te da … outs”) wiernie powtarza źródło.

## Do sprawdzenia (pewność ≤ 80%; pytania do człowieka znającego język albo decyzja globalna)

**es-L1**

- **Button / botón / Botón**: pl ma wszędzie „Button” (bez znacznika). es: m3-l1 i m4-l1 „botón”, m3-l3 „Botón”, m3-l2:46 i cały m4-l2 „Button” (10×). terms-nazwy.yaml: button → „botón”. W całym `content/es/lessons` przeważa „Button” (ok. 144 wobec 93), więc ujednolicenie wymaga decyzji dla całego języka — bez poprawek w tej części.
- **Siatka zakresów**: m3-l3 i m4-l1 „cuadrícula”, m3-l2:62 i m4-l2 (73, 79, 89, 92) „tabla”; ta sama rzecz nazwana dwojako w sąsiednich lekcjach modułu M4. Decyzja globalna (w korpusie „tabla” w 11 plikach, „cuadrícula” w 4).
- **call**: czasownik „igualar”, rzeczownik „pago” (m2-l2: 17, 25, 44, 65, 82–86, 97) i „pagar” w podtytule m2-l2:6; terms-nazwy.yaml dopuszcza oba rdzenie (uwaga przy `call`), ale w m2-l2 „igualar” i „pago” stoją w jednym zdaniu (97).
- **m0-l1-uklady.md:88**: pl `{{t:straight-flush|Poker}}: {{t:straight-flush|strit w kolorze}}` → es `{{t:straight-flush|Escalera de color}}: una {{t:straight|escalera}} del mismo palo` — drugi znacznik ma inny klucz (straight zamiast straight-flush). Sens poprawny i plik się zbuduje; ewentualny skutek tylko dla podpowiedzi terminu.
- **„de distinto palo” / „de palos distintos”**: m3-l2:16, m4-l1:47 i 99 „palos distintos”, reszta „de distinto palo” (nazwa terminu offsuit); tekst bez znacznika.
- **Czas przeszły w m4-l2**: „abrió / se retiró” (indefinido), w pozostałych plikach „ha abierto / se ha retirado” (perfecto, es-ES); m4-l2 jest wewnętrznie spójny i używa „llegáis” (es-ES).

**es-L2**

- Nazwa pozycji Button: m4-l3, m5-l2, m5-l4 piszą „el Button”, m4-l4 i m5-l3 „el botón” (terms-nazwy: button = „botón”). To samo ćwiczenie c-bet ma w m5-l3:13 „desde el botón”, a w m5-l4:72 „desde el Button”. Wzorzec jest w całym przekładzie es (ok. 209× „Button”, ok. 101× „botón”), więc wymaga decyzji globalnej, nie poprawek w tej części.
- {{t:top-pair|pareja mayor}} (m5-l3:49, 51; m5-l4:32, 35–37, 53): terms-nazwy podaje „top pair”; forma „pareja mayor” jest jednak używana konsekwentnie w całym es (84×, znacznik nigdy bez formy), więc nie zgłaszam jako znaleziska.
- m4-l3: call raz jako „igualar/igualo/iguala”, raz jako rzeczownik „pago” („rango de pago” l. 67, 76; „tras el/un pago” l. 100, 112). Oba warianty dopuszcza komentarz w terms-nazwy; brak rzeczownika od „igualar”.
- m5-l1:108 (pl i en tak samo): „T-9-5-4” wśród przykładów mokrych stołów ma cztery karty; przekład wierny, nie wiem, czy to zamierzone w źródle.
- Teksty wspólne dla ćwiczenia c-bet w m5-l3 (l. 16–40) i m5-l4 (l. 75–92) są przełożone różnie („tamaño equivocado” / „mal tamaño”, „alrededor del” / „en torno al”, „se {{t:fold|retire}}” / „{{t:fold|se retire}}”); sens zgodny z pl, tylko niespójność stylu.

**es-L3**

- Rodzaj MDF różny między lekcjami tego samego modułu: m6-l1 „el {{t:mdf}}” (ok. 30 wystąpień, bez formy), m6-l2 „la {{t:mdf|MDF}}” (9 wystąpień). W całej treści es oba rodzaje (el ok. 19, la ok. 26). Decyzja globalna, bez poprawki tutaj.
- Nazwa pozycji Button niespójna między plikami: m6-l1 i m6-l3 „el botón”, m6-l2 i m7-l1 „el Button”, m7-l2 „el Botón” (terms-nazwy: button = „botón”; w całych lekcjach es „Button” ×147, „botón” ×90, „Botón” ×11). W każdym pliku z osobna spójnie; decyzja globalna.
- out-of-position: m6-l1 „fuera de posición” (nazwa z terms-nazwy), m6-l2 konsekwentnie „sin posición”. W pliku spójnie; między lekcjami nie.
- m6-l2:5 tytuł „Pagar o retirarse”, a w treści lekcji call to konsekwentnie „igualar” (ewentualnie „Igualar o retirarse”).
- m6-l2 fold: obok „retirarse” przechodnie „tiras” (34, 45, 112, 131). Wymuszone składnią (dopełnienie bliższe), raczej do przyjęcia.
- m6-l1 „quede a cero” wobec m7-l1 „llegue al punto de equilibrio” dla pl „wyszedł na zero”: oba zrozumiałe, różne między modułami.

**es-L4**

- Formy terminów odbiegające od nazw w terms-nazwy.yaml, ale użyte konsekwentnie w całym pliku (decyzja systemowa, nie poprawiałem): `top-pair` → „pareja mayor” (nazwa: „top pair”; m7-l4, m8-l1, m8-l4), `blocker` → „bloqueador(es)” łącznie z tytułem lekcji (nazwa: „blocker”; m8-l3, m8-l2:139, m8-l4), `oesd` → „proyecto de escalera abierta” (nazwa: „OESD”; m7-l3:54, m7-l4:46,86), `combo` → „combos” w m8-l2 i „combinaciones” w m8-l3 (nazwa: „combo”; różnica między plikami tego samego modułu).
- content/es/lessons/m7-l4-probe-obrona.md:96 „con una carta blanca” (pl „na pustej karcie”): w hiszpańskim ogólnym „carta blanca” znaczy „wolna ręka”; w żargonie pokerowym bywa używane jako „blank”. Ewentualnie „con una carta que no cambia nada”.
- content/es/lessons/m8-l1-value.md:71,121 i m8-l3:45,50 „as alto” dla „as-high”: zrozumiałe, ale może być czytane jako „wysoki as”; alternatywa „carta alta de as”.
- Nazwy kart między plikami: Q = „reina” w m7-l3:32,85, „dama” w m8-l1, m8-l3, m8-l4 (w obrębie pliku spójnie).
- „fallados” (m7-l3–m8-l2, m8-l4) vs „fallidos” (m8-l3) dla „nietrafione drawy” — spójne w pliku, różne między plikami.

**es-L5**

- Termin top-pair: we wszystkich pięciu plikach forma „pareja mayor” ({{t:top-pair|pareja mayor}}), a `content/es/terms-nazwy.yaml` podaje nazwę „top pair”. Użycie jest spójne w plikach i w całym `content/es` (84 wystąpienia), więc nie zgłaszam jako znaleziska; do decyzji, czy nazwa w terms-nazwy nie powinna brzmieć „pareja mayor”.
- m9-l4-plan-trzech-ulic.md:104 „{{t:overpair|sobrepareja}}” przy nazwie „overpair” w terms-nazwy.yaml (w content/es „sobrepareja” ×9, „overpairs” ×1) — ta sama kwestia systemowa.
- m9-l3-rozmiar-geometryczny.md:68 „con {{t:bet|apuestas}} mayores en el river no te quedará stack” — przez szyk „en el river” może się łączyć z „apuestas mayores” (pl:68 „przy większych zakładach na riverze zabraknie stacku” — tak samo dwuznaczne); ewentualnie „con apuestas mayores, en el river no te quedará…”.
- m9-l4-plan-trzech-ulic.md:95 „¿cuántas … aguanta mi mano y quiero jugar por todo el stack?” — drugie pytanie (pl „i czy chcę grać…”) brzmi niezgrabnie; styl, bez zmiany sensu.
- Czas narracji w promptach: m9-l1 „Abriste… igualó” (indefinido), m9-l4 „Has abierto… ha igualado” (perfecto) — niespójność między plikami, w każdym pliku konsekwentnie.

**es-L6**

- Formy terminów inne niż nazwa w `terms-nazwy.yaml`, ale spójne w obrębie pliku (wzorzec tłumacza opisany w komentarzach terms-nazwy): `{{t:top-pair|pareja mayor}}` (nazwa «top pair») w m10-l2:39, 43, 78, 132; `{{t:blocker|bloqueador}}` (nazwa «blocker») w m10-l3:69; `{{t:alpha|alfa}}` (nazwa «alpha») w m10-l3:103, 129, podczas gdy m10-l2 ma gołe `{{t:alpha}}` → «alpha»; `{{t:payout|pagos/pago}}` (nazwa «premio») w m11-l3:29, 39, 71, 123, 161, a w m11-l2:175 «premios». Decyzja terminologiczna na poziomie całego języka.
- `{{t:fold|tira}}` / `{{t:fold|tiras}}` (m11-l1:64, m11-l2:57, 140) obok «retirarse»: forma przechodnia („solver ją pasuje”), raczej uzasadniona.
- `{{t:call|…}}`: czasownik «igualar», rzeczownik «pago» (wszystkie pliki); systematyczny podział, nie zgłaszam jako niespójność.
- m11-l1:65 «Haces {{t:shove|push}} con más manos con un {{t:short-stack|stack muy corto}}»: pl m11-l1:65 „Najszerzej pushujesz przy bardzo short stacku” (stopień najwyższy osłabiony, sens zachowany).
- m10-l4:67, 120 «juegan aprox. {{n}}–{{n}} menos manos» (→ „25 %–35 % menos manos”): naturalniej «un …–… menos de manos»; zrozumiałe.
- m10-l2:112 «de entre el diez y el veinte por ciento» za pl „kilkanaście procent” (11–19): przybliżenie dopuszczalne.
- «Button» (m10-l2, m11-l1, m11-l2) i «el botón» (m10-l3:66, 99; m11-l3:161): pl ma wszędzie „Button” bez znacznika; niespójność między plikami, nie w pliku.

**es-L7**

- Termin `call`: w m12-l2, m12-l3, m13-l1, m13-l3 formy czasownikowe od «igualar» («iguala», «Igualas», «igualar») obok rzeczownika «pago»/«Has pagado» (m12-l2:29–41, 83–85; m13-l1:43) — dwa rdzenie dla jednego terminu w jednym pliku; terms-nazwy odnotowuje oba jako formy tłumacza [WIELE FORM], więc bez poprawki; decyzja systemowa.
- m13-l2-powtorki.md:89 «una c-bet» (ż); w korpusie es przeważa rodzaj męski («un c-bet» 53× wobec «una c-bet» 12×) — do ujednolicenia globalnie.
- «karta o odpowiedzialnej grze»: m12-l3:133 «la ficha sobre juego responsable» wobec m12-l4:102 «la tarjeta de juego responsable» (pl w obu «karta o odpowiedzialnej grze»); nie znalazłem nazwy tej karty w interfejsie, więc nie wskazuję, która wersja jest właściwa.
- m13-l1: czasownik «valorar/valoración» dla oceny decyzji w całej lekcji, a interfejs (es.json) konsekwentnie «evaluar/evaluadas»; poprawiłem tylko cytowane etykiety (es-L7-11…16), reszta («Niveles de valoración», «quedan sin valorar» w l. 97) do decyzji.
- m12-l4:23, 31–33, 40–42 «baja a aprox. {{n:ror.base}}» itp.: procent bez rodzajnika po «aprox.» w wyliczeniach wartości — dopuszczalne, nie zgłaszam.

**es-R1**

- **`{{t:top-pair|pareja mayor}}` / `{{t:top-pair|parejas mayores}}`** (linie 502 i 552 w tej części; także 760, 762, 801, 817 w drugiej połowie pliku): `terms-nazwy.yaml` podaje dla `top-pair` nazwę „top pair”, a plik konsekwentnie używa „pareja mayor” (komentarz w terms-nazwy wymienia ją jako synonim ze źródła: „top pair (pareja mayor)”). Formalnie forma nie jest formą nazwy ze słownika, ale w pliku jest spójna; poprawka tylko w mojej połowie rozbiłaby spójność, więc decyzja (zmienić wszystkie 7 wystąpień albo dopuścić „pareja mayor”) należy do koordynatora. Bez poprawki w JSON.
- **„Button”** (bez znacznika, np. linie 122, 139, 166, 229): `terms-nazwy.yaml` ma `button: "botón"`, plik konsekwentnie pisze „el Button” (pl też „Button” bez znacznika). Spójne w pliku; do decyzji, czy nazwa pozycji ma zostać angielska.
- **„completar” dla limpu z dowolnej pozycji** (linie 149, 192, 304, 314, 317): pl „dopłacasz samego blinda” / „wyrównało {{t:big-blind}} (limp)”. W hiszpańskim „completar” zwykle dotyczy małego blinda; dla limpu spoza blindów naturalniejsze byłoby „igualar la ciega grande” / „hacer limp”. Sens zachowany dzięki dopiskowi „(limp)”.
- **Linia 123** (R-M3-001): pl „tylko {{t:small-blind}} otwiera podobnie szeroko” → „abre de forma parecida” — zgubione „szeroko”, sens z kontekstu czytelny.
- **Linia 417** (R-M5-011): „sin ninguna mano” (pl „bez żadnej ręki”) — lekka kalka; naturalniej „sin nada”. Styl.
- Komentarze YAML (linie 1–17, 208, 329–331, 440–441, 532–533, 641–642) są w es po polsku, identyczne z pl — komentarze nie trafiają do aplikacji, nie zgłaszam.

**es-R2**

- content/es/rules.yaml:473 (poza zakresem tej części, pierwsza połowa): trzecie wystąpienie «recreacionales» — ten sam wzorzec co es-R2-01/02; do poprawienia przez recenzenta pierwszej połowy.
- Formy w znacznikach różne od nazwy w terms-nazwy.yaml: `{{t:top-pair|pareja mayor}}` (linie 760, 762, 801, 817; nazwa: «top pair»), `{{t:overpair|sobrepareja}}` (801; nazwa: «overpair»), `{{t:blocker|bloqueadores}}` (734; nazwa: «blocker»). W całej treści es (lekcje, egzaminy) te formy są stosowane konsekwentnie (pareja mayor 67 ×, sobrepareja 8 ×, bloqueador 19 ×), więc nie zgłaszam jako znaleziska; ewentualne ujednolicenie z nazwą to decyzja globalna, nie poprawka w tym pliku.
- content/es/rules.yaml:1005 (R-M12-007): „skończyć wcześniej, zanim stracisz…” oddane jako «parar a tiempo, antes de perder…» (źródłowy cytat: „quit sooner”); sens zalecenia zachowany, różnica stylistyczna.
- content/es/rules.yaml:880 (R-M10-007): pl „a gdy sam broni blindów wąsko” oddane przyczynowo «y como defiende sus ciegas con un rango estrecho» (pl: warunek „gdy”); kierunek zalecenia bez zmian.
- content/es/rules.yaml:1048 (R-M11-001): „fold po przebiciu” oddane «retirarte ante una subida» (dokładniej: resubida); termin `raise` = «subida», więc zgodne z terminologią.

**es-X1**

- m6.yaml (15 wystąpień, np. linie 24, 27, 44, 54): „el Botón”, podczas gdy m3–m5 i reszta korpusu mają „el Button” (ok. 90 wystąpień wobec 19); terms-nazwy.yaml:49 podaje „botón”. Plik jest wewnętrznie spójny; kierunek ujednolicenia wymaga decyzji, dlatego bez poprawki.
- m0.yaml:60 «la {{t:wheel|rueda}}»: terms-nazwy.yaml:15 podaje „wheel”; w korpusie po jednym użyciu „rueda” i „wheel”. Bez poprawki (rodzajnik przy „wheel” do ustalenia).
- m2.yaml:12, 36, 45, 86 «{{t:oesd|proyecto de escalera abierta}}»: nazwa w terms-nazwy.yaml:54 to „OESD”; forma opisowa jest spójna w pliku i zrozumiała.
- m6.yaml:77 «{{t:top-pair|Pareja mayor}}»: terms-nazwy.yaml:85 „top pair”; w korpusie częściej „pareja máxima”.
- m5.yaml:50–52 «Más de {{n:…}} de las veces» wobec m6.yaml:17–19 «En más del {{n:…}} de los casos»: z procentem naturalniej z rodzajnikiem („más del 43 %”); drobne.
- Rzeczownik dla call: „pago” (m4.yaml:42, 82; m5.yaml:12, 68; m6.yaml:19, 48) obok czasownika „igualar”; słownik notuje oba warianty, zostawione.

**es-X2**

- „Button” (m8: 6×, m9: 1×, m11: 4×, m13: 1×) wobec „botón” (m7: 9×, m10: 2×) jako nazwa pozycji w zwykłym tekście; terms-nazwy: button = „botón”. W każdym pliku z osobna konsekwentnie, w całym content/es oba warianty są równie częste (22 vs 18 plików) — decyzja o ujednoliceniu ponad zakresem tej części.
- Rodzaj „c-bet”: m10 (linie 17, 19, 63–66) i m13:73 mają rodzaj żeński („una c-bet”, „la pequeña”), m7 i większość content/es męski („el/un c-bet”). W obrębie pliku spójne.
- m11:23 i m11:32 „quede en tablas” za „wyszedł na zero”; w m7:37, m7:63 to samo pojęcie to „no gane ni pierda”. Zrozumiałe, ale „tablas” to raczej remis niż próg opłacalności.
- top-pair: w m8 i m9 forma „pareja mayor” (terms-nazwy: „top pair”; w content/es także „pareja máxima”). W plikach części spójne.
- m11 (57, 59, 64, 68): „bubble factor” po angielsku w zwykłym tekście (tak jak w pl); terms-nazwy dla bubble-factor podaje „factor burbuja”.

**es-U**

- `metadane-fala2.json` es-ES, description: „Decisiones calificadas en cuatro niveles” bez wyliczenia stopni; pl i en-US mają „…: zgodna, dopuszczalna, niedokładność, błąd” / „correct, acceptable, inaccuracy, mistake”. To samo skrócenie mają wszystkie pozostałe lokalizacje docelowe (de-DE, it, ko, vi, ja, zh-Hant, pt-BR, fr-FR), więc wygląda na decyzję generatora, nie błąd es. Gdyby dopisać: „: acorde, aceptable, imprecisión, error” (jak `grade.*` w es.json).
- `es.json:380` `play.tableSizeHint9`: „{{t:position|posiciones}} tempranas”; termin `early-position` ma w terms-nazwy nazwę „primeras posiciones”. Źródło pl nie używa tu znacznika `early-position` („wczesne {{t:position|pozycje}}”), więc formalnie zgodne; ewentualnie „tres primeras {{t:position|posiciones}} más”.
- „Button” (spots.yaml, 14×) wobec nazwy terminu `button` = „botón”: źródło pl pisze „Button” bez znacznika, a treść es używa obu („el Button” ok. 150×, „el botón” ok. 70×). Niespójność całego kursu, nie tej części.
- `es.json:75` `settings.resetBody`: „El progreso de las lecciones, las respuestas y los repasos se borrarán” — dodane „El progreso de” (pl `pl.json:76`: „Lekcje, odpowiedzi i powtórki zostaną usunięte”); doprecyzowanie bez zmiany skutku.
- `es.json:81` `settings.reminderHint`: „a las {{pora}}” jest niegramatyczne dla godziny 1:xx („a la 1:00”); zależy od tego, jakie pory podstawia aplikacja.
- Słowa kluczowe es-ES zawierają „poker” (słowo z nazwy aplikacji; en-US go nie ma, pl ma) — sprawa ASO, nie przekładu.

**es-T**

- `terms-nazwy.yaml:104–105`: barrel = „barrel” (angielskie), a second-barrel = „segundo barril” (przetłumaczone) — para terminów nazwana w dwóch konwencjach. W treści „segundo barril” 22×, znacznik `barrel` nieużywany.
- `terms-nazwy.yaml:44–45`: early-position = „primeras posiciones” (l.mn.), late-position = „posición tardía” (l.poj., inny wzór); jedyna forma w lekcjach to „posiciones tempranas”. Do ujednolicenia (np. „posición temprana / posición tardía”).
- `terms-nazwy.yaml:87`: overpair = „overpair”, formy w treści: „sobrepareja” 2×, „overpairs” 1×.
- `terms-nazwy.yaml:62`: combo = „combo”, formy: „combinaciones” 13×, „combos” 9×.
- `terms-nazwy.yaml:142`: payout = „premio”, formy: „pago(s)” 5×, „premios” 3×; definicja pay-jump (terms-def:141) mówi „diferencia de pago”, a nazwa pay-jump to „salto de premios”.
- `terms-nazwy.yaml:112`: alpha = „alpha”; w treści „alfa” 3× (2 formy znacznika + 1 poza), „alpha” ok. 30× poza znacznikami.
- `terms-nazwy.yaml:16`: check = „pasar” (bezokolicznik), gdy bet/raise/open mają rzeczowniki („apuesta”, „subida”, „apertura”). Znacznik bez formy dziś nieużywany (0×), więc bez skutku dla czytelnika.
- `terms-nazwy.yaml:18, 20`: call = „call”, fold = „fold”, a definicje (terms-def:14, 16, 17, 33, 55, 145 i in.) i treść używają „igualar” / „retirarse”. Notatka tłumacza uzasadnia to potrzebą rzeczownika; znaczników bez formy jest 13 (call) i 7 (fold).
- `terms-nazwy.yaml:43`: out-of-position = „fuera de posición”; forma „sin posición” w 8 znacznikach (wobec 48 „fuera de posición”).
- `terms-nazwy.yaml:121`: standard-deviation = „desviación estándar”; forma „desviación típica” 2×.
- `terms-def.yaml:63` (open): pl `content/terms.yaml:556` „Pierwsze wejście do puli…”, es „Entrar en el bote…” bez „pierwsze”; sens zachowuje warunek „cuando todos … se han retirado” i tak samo robi en.
- `terms-def.yaml:17` (raise): pominięte zdanie pl „W polskich tekstach także «podbicie»” (`content/terms.yaml:173`) — uwaga o polskim synonimie, pominięta także w en; uznane za celowe.

## Uwagi ogólne czytających

**es-L1**

Przekład wierny i naturalny: wszystkie liczby idą przez `{{n:…}}` z tymi samymi kluczami co w pl, zakresy rąk, pozycje, kierunki zaleceń i przeczenia zgadzają się ze źródłem, znaczniki i struktura YAML są nienaruszone; nie znaleziono żadnego błędu wagi KRYT ani WYS. Znaleziska dotyczą dwóch form terminów niezgodnych z terms-nazwy.yaml, jednej nieścisłości („casi tan amplio”) i drobnej naturalności. Powtarzający się wzorzec to niespójność między plikami (Button/botón, tabla/cuadrícula, igualar/pago, indefinido/perfecto) — wygląda na pracę w kilku partiach; m4-l2 odstaje stylem od m4-l1. Te niespójności wymagają decyzji na poziomie całego języka, dlatego są w „Do sprawdzenia”, bez poprawek.

**es-L2**

Przekład wierny: liczby, kierunki zaleceń, pozycje i wszystkie znaczniki {{n:…}}, {{t:…}}, [[…]] oraz identyfikatory zgodne ze źródłem we wszystkich sześciu plikach; nic nie pominięto ani nie dodano. Jedyny błąd sensu to fałszywy przyjaciel „pasan” (fold oddany słowem oznaczającym check) w m4-l4. Powtarzający się wzorzec to niespójność między plikami: rodzaj „c-bet” (żeński w m5-l1 i m5-l4, męski gdzie indziej) oraz „Button” / „botón”. Znaczniki bez formy czytają się poprawnie po podstawieniu nazw z terms-nazwy (zgoda rodzaju i liczby sprawdzona), poza „o OESD” i „para call”.

**es-L3**

Przekład jest wierny i naturalny: nie znalazłem żadnej zmienionej liczby, kierunku zalecenia, pozycji ani pominiętego zdania, a znaczniki i struktura są nienaruszone. Jedyny powtarzający się wzorzec to niespójność nazw między plikami (rodzaj MDF, Button/botón/Botón, sin/fuera de posición, igualar/pago, alpha/alfa), wyglądająca na pracę kilku tłumaczy lub przebiegów bez wspólnego glosariusza form. Wewnątrz pojedynczego pliku terminologia jest prawie zawsze spójna. Wariant języka jednolity (hiszpański europejski, forma „tú”).

**es-L4**

Przekład bardzo dobry: wszystkie znaczniki `{{n:…}}`, `{{t:klucz…}}`, `[[…]]`, identyfikatory i struktura YAML zgodne ze źródłem linia w linię (sprawdzone także skryptem), bez błędów liczb, kierunków zaleceń ani pominięć. Wariant europejski (vosotros: „pasasteis”, „vuestros”) użyty konsekwentnie, forma „tú” wszędzie. Brak znalezisk KRYT i WYS; jedyne ŚR to rodzaj MDF w jednym miejscu i nazwa terminu „overbet”. Powtarzający się wzorzec: formy tłumacza („pareja mayor”, „bloqueador”, „combinaciones”) zamiast nazw z terms-nazwy.yaml — spójne w plikach, do decyzji koordynatora.

**es-L5**

Przekład bardzo dobry: wszystkie liczby `{{n:…}}`, identyfikatory, struktura YAML i tabele zgodne ze źródłem, kierunki zaleceń i przeczenia zachowane, nic pominiętego. Wariant europejski (vosotros: „cada uno de vosotros”, „podéis”) użyty konsekwentnie. Terminologia zgodna z terms-nazwy poza systemowym „pareja mayor”/„sobrepareja” (patrz „Do sprawdzenia”). M9-l4 pisze `{{t:spr|SPR}}` z formą, pozostałe pliki `{{t:spr}}` — bez skutku dla czytelnika.

**es-L6**

Przekład wierny i naturalny; liczby, kierunki zaleceń, znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura YAML bez błędów we wszystkich sześciu plikach; brak znalezisk KRYT i WYS. Jedyny powtarzalny błąd widoczny dla użytkownika to m11-l1: «unas {{n:procent}} manos» (6 miejsc), gdzie znacznik daje „58,3 %”; m11-l2 i m11-l3 stosują poprawne «aprox. … de las manos». Drugi wzorzec to formy terminów odbiegające od `terms-nazwy.yaml` (bb-ante po angielsku, «empujas», «pareja máxima»/«pareja mayor»). m11-l3 bez znalezisk.

**es-L7**

Przekład m12 (treść krytyczna) jest kompletny i wierny: wszystkie granice (como muy tarde / como pronto, al menos, nunca menos de, mitad/completo), znaczniki `{{n:…}}`, `{{helplines}}`, pięć sygnałów ostrzegawczych i odesłania do «Ayuda» zgadzają się ze źródłem; brak znalezisk KRYT i WYS. Jedyne uchybienia sensu w m12 to zgubione «w górę» przy skokach stawek (es-L7-03) i dwuznaczne «recuperar» dla «nadrobić» (es-L7-07). Powtarzające się wzorce: niespójna terminologia między plikami (desviación típica/estándar, board/mesa, conformes/acordes, mental game/juego mental), etykiety raportu w m13-l1 niezgodne z interfejsem («Sin valorar»/«Valoradas» zamiast «Sin evaluar»/«Evaluadas») oraz brak rodzajnika przed procentem w m12-l3, m12-l4 i m13-l1, podczas gdy m12-l1 i m12-l2 konsekwentnie piszą «el {{n:…}}». Znaczniki, identyfikatory i struktura YAML/Markdown we wszystkich siedmiu plikach nienaruszone, liczba linii zgodna ze źródłem.

**es-R1**

Przekład tej połowy jest bardzo dobry: żadnej zmiany liczby, kierunku zalecenia, pozycji ani zagrania; wszystkie znaczniki `{{n:…}}` i klucze `{{t:…}}` zgodne ze źródłem linia w linię, cytaty i adresy w polach source nienaruszone. Hiszpański naturalny, konsekwentne „tú”, wariant europejski/neutralny (bote, farol, ligar) bez mieszania. Jedyny powtarzający się wzorzec to formy terminów odbiegające od `terms-nazwy.yaml` (overbet → „sobreapuesta”, top-pair → „pareja mayor”) oraz dwa drobne odstępstwa terminologiczne w polach source.

**es-R2**

Przekład drugiej połowy jest bardzo wierny: liczby, zakresy, kierunki zaleceń (w tym „como muy tarde / como muy pronto” w R-M12-011), wzory i wszystkie znaczniki zgodne ze źródłem; reguły R-M12-* kompletne i bez zmiany sensu ani granic. Język naturalny, europejski hiszpański, konsekwentne „tú”; cudzysłowy «» i format dat spójne. Jedyne powtarzające się usterki to niespójności nazw (recreacional/recreativo, nazwa funkcji powtórek) oraz jedno dwuznaczne sformułowanie w R-M12-007. Brak znalezisk KRYT i WYS.

**es-X1**

Przekład jest wierny: we wszystkich 7 plikach treść pytań, odpowiedzi poprawne i błędne oraz wyjaśnienia znaczą to samo co w pl; żadna poprawna odpowiedź nie przestała pasować do pytania. Znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i klucze są nienaruszone, żadnej liczby wpisanej cyfrą zamiast znacznika. Powtarzający się wzorzec to „unas X–Y manos” przy wartościach procentowych (m3) oraz rozjazdy nazewnicze między plikami (Button/Botón, rodzaj c-bet, igualar/pagar, „hablar/actuar primero”). Brak znalezisk KRYT i WYS.

**es-X2**

Przekład egzaminów m7–m13 jest wierny: wszystkie pytania, odpowiedzi i wyjaśnienia znaczą to samo co w pl, poprawne odpowiedzi pasują do pytań, znaczniki i liczby są nienaruszone. Treść krytyczna m12 (wariancja, tilt, ryzyko ruiny, próg zejścia ze stawki, odesłanie do ekranu „Ayuda” — zgodne z es.json) bez znalezisk. Jedyny wzorzec wart ujednolicenia to drobne różnice między plikami (Button/botón, rodzaj c-bet, formy top-pair) oraz dwie nazwy werdyktów w m13 niezgodne z interfejsem. Wariant języka: europejski (vosotros: „pasasteis”, „os quedan”), bez mieszania.

**es-U**

Przekład bardzo dobry: komplet kluczy słownika, wszystkie parametry i klucze znaczników zgodne ze źródłem, formy `_one`/`_many`/`_other` (CLDR es) obecne i poprawne, marka „PokerGym” nieprzetłumaczona, teksty zakupu (okresy, odnowienie, anulowanie, zakup jednorazowy) wierne. `helplines.yaml` (treść krytyczna): oba zdania, nazwa organizacji, adresy, daty i struktura bez zmian, sens zachowany — bez znalezisk. Metadane es-ES mieszczą się w limitach Apple (nazwa 23/30, podtytuł 30/30, słowa kluczowe 100/100, tekst promocyjny 144/170), bez obietnic spoza źródła i bez słów sugerujących grę na pieniądze. Wariant europejski (vosotros: „tenéis”, „entre vosotros”) konsekwentny w słowniku; jedyny wzorzec do ujednolicenia to rodzaj gramatyczny i nazwy zapożyczeń (c-bet, value bet, blocker/bloqueador, Button/botón).

**es-T**

Definicje są wierne: liczby, przykłady kart, kierunki i zdania „nie mylić z…” zgadzają się ze źródłem we wszystkich 162 pozycjach, a jedyny powtarzający się wzorzec to angielska nazwa w definicji tam, gdzie terms-nazwy ma hiszpańską (open, short stack, risk premium). Nazwy: bez kolizji i bez oczywistych błędów; problemem są rozjazdy nazwa ↔ forma w treści (top pair/pareja mayor 0:78, blocker/bloqueador 0:22). Spójność 15 terminów (formy w znacznikach, lekcje + reguły): fold → retirar- 544/551 (7 bez formy); call → igualar- ok. 590 i pago/pagos ok. 80 (13 bez formy), a poza znacznikami czasownik „pagar” ok. 190× w lekcjach i 19× w regułach wobec 13× „igualar”; raise → subir/subida 239/239; bet → apuesta/apostar 338/344; check → pasar 215/215; pot → bote 733/733 (+17 bez znacznika); flush → color 91/99 (8 bez formy); straight → escalera 88/105 (17 bez formy); draw → proyecto 165/168; bluff → farol- 416/420; value → „por valor / de valor / calles de valor” 84/84 („value bet” poza znacznikami 1×, „apuesta de/por valor” 3×); c-bet zawsze „c-bet” (195× poza znacznikami), ale rodzaj męski 100× i żeński 22×; equity → „equity” 207× poza znacznikami, zawsze rodzaj żeński (63:0); range → rango 189/194; position → posición 71/73. Dwie nazwy jednego terminu w formach znaczników: call (igualar/pagar), out-of-position (fuera de/sin posición 48:8), combo (combinaciones/combos 13:9), payout (pagos/premios 5:3), board (mesa 48, „board” 8).

