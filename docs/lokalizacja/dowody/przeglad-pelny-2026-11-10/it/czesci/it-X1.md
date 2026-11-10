# it-X1 — włoski (it) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/it/exams/m0.yaml | tak, 1–92 (pl 1–92) |
| content/it/exams/m1.yaml | tak, 1–75 (pl 1–75) |
| content/it/exams/m2.yaml | tak, 1–99 (pl 1–99) |
| content/it/exams/m3.yaml | tak, 1–95 (pl 1–95) |
| content/it/exams/m4.yaml | tak, 1–111 (pl 1–111) |
| content/it/exams/m5.yaml | tak, 1–100 (pl 1–100) |
| content/it/exams/m6.yaml | tak, 1–96 (pl 1–96) |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
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

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- m2.yaml:12, 36, 45, 86: `{{t:oesd|progetto di scala bilaterale}}`, a nazwa terminu w terms-nazwy.yaml:54 to „OESD” (oznaczone tam [WIELE FORM]). W pliku konsekwentnie, w całym przekładzie to forma większościowa (16× wobec 4× „OESD”); decyzja o ujednoliceniu należy do koordynatora.
- m6.yaml:77: `{{t:top-pair|coppia massima}}`, nazwa terminu „top pair” (terms-nazwy.yaml:85, [WIELE FORM]); w przekładzie obie formy są częste (35× / 49×).
- Rodzaj „c-bet”: m5 męski („un c-bet piccolo” :51, „al c-bet” :75), m6 żeński („una c-bet”, „le c-bet piccole”); terms-nazwy.yaml:88 podaje r. ż., ale w całym przekładzie przeważa męski. Podobnie „il/un 3-bet”, „il 4-bet” w m3–m4 (terms: r. ż.).
- Pozostałe procenty bez rodzajnika: „Ti serve {{n:eq.bet-pot}}” (m2.yaml:80, 98), „corrisponde a {{n:cbet.size.big}} del piatto” (m5.yaml:50), „C-bet di {{n:cbet.size.big}} del piatto” (m5.yaml:89–90), „({{n:cbet.size.small}} del piatto” (m5.yaml:51). Ten sam wzorzec jest w całym przekładzie („Ti serve N” 13× wobec 2× z rodzajnikiem), więc nie poprawiałem punktowo.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny: we wszystkich 7 plikach pytania, odpowiedzi (także oznaczone `correct`/`sizeError`) i wyjaśnienia znaczą to samo co w źródle, nie znalazłem zmienionej liczby, kierunku, pozycji ani zagrania. Znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i struktura YAML są zgodne ze źródłem linia w linię. Powtarzający się wzorzec to brak rodzajnika przed procentem ze znacznika `{{n:…}}`. Między plikami są drobne niespójności słownictwa bez skutku dla sensu: „dimensione” (m3, m5) wobec „size” (m4), „puntata ÷ (piatto + puntata)” (m5) wobec „bet ÷ (piatto + bet)” (m6), „in/al/dal CO”, „da/dall'HJ”.
