# es-L3 — es — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/lessons/m6-l1-mdf-alpha.md | tak, 1–137 (pl 1–137) |
| content/es/lessons/m6-l2-sprawdzenie.md | tak, 1–135 (pl 1–135) |
| content/es/lessons/m6-l3-check-raise.md | tak, 1–140 (pl 1–140) |
| content/es/lessons/m7-l1-druga-beczka.md | tak, 1–139 (pl 1–139) |
| content/es/lessons/m7-l2-polaryzacja.md | tak, 1–140 (pl 1–140) |

Kontrola mechaniczna (skrypt, linia po linii pl ↔ es): zestawy `{{n:…}}`, klucze `{{t:…}}` i `[[karty]]` zgodne we wszystkich pięciu plikach, z jednym wyjątkiem (es-L3-10). Identyfikatory, `rules`, `answer`, `table`, `sizeError`, `correct` bez zmian.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
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

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- Rodzaj MDF różny między lekcjami tego samego modułu: m6-l1 „el {{t:mdf}}” (ok. 30 wystąpień, bez formy), m6-l2 „la {{t:mdf|MDF}}” (9 wystąpień). W całej treści es oba rodzaje (el ok. 19, la ok. 26). Decyzja globalna, bez poprawki tutaj.
- Nazwa pozycji Button niespójna między plikami: m6-l1 i m6-l3 „el botón”, m6-l2 i m7-l1 „el Button”, m7-l2 „el Botón” (terms-nazwy: button = „botón”; w całych lekcjach es „Button” ×147, „botón” ×90, „Botón” ×11). W każdym pliku z osobna spójnie; decyzja globalna.
- out-of-position: m6-l1 „fuera de posición” (nazwa z terms-nazwy), m6-l2 konsekwentnie „sin posición”. W pliku spójnie; między lekcjami nie.
- m6-l2:5 tytuł „Pagar o retirarse”, a w treści lekcji call to konsekwentnie „igualar” (ewentualnie „Igualar o retirarse”).
- m6-l2 fold: obok „retirarse” przechodnie „tiras” (34, 45, 112, 131). Wymuszone składnią (dopełnienie bliższe), raczej do przyjęcia.
- m6-l1 „quede a cero” wobec m7-l1 „llegue al punto de equilibrio” dla pl „wyszedł na zero”: oba zrozumiałe, różne między modułami.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny i naturalny: nie znalazłem żadnej zmienionej liczby, kierunku zalecenia, pozycji ani pominiętego zdania, a znaczniki i struktura są nienaruszone. Jedyny powtarzający się wzorzec to niespójność nazw między plikami (rodzaj MDF, Button/botón/Botón, sin/fuera de posición, igualar/pago, alpha/alfa), wyglądająca na pracę kilku tłumaczy lub przebiegów bez wspólnego glosariusza form. Wewnątrz pojedynczego pliku terminologia jest prawie zawsze spójna. Wariant języka jednolity (hiszpański europejski, forma „tú”).
