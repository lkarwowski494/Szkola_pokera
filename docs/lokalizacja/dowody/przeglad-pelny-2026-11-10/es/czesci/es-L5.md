# es-L5 — es — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/lessons/m9-l1-spr.md | tak, 1–149 |
| content/es/lessons/m9-l2-zaangazowanie.md | tak, 1–114 |
| content/es/lessons/m9-l3-rozmiar-geometryczny.md | tak, 1–130 |
| content/es/lessons/m9-l4-plan-trzech-ulic.md | tak, 1–131 |
| content/es/lessons/m10-l1-statystyki.md | tak, 1–131 |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-L5-01 | ŚR | content/es/lessons/m9-l2-zaangazowanie.md:110 | „Para meter todo el stack antes del river” | „Para meter todo el stack hasta el river” | pl m9-l2-zaangazowanie.md:110 „wpłacić cały stack do rivera” = do rivera włącznie (zakład na każdej ulicy; en „by the river”); „antes del river” wyklucza river i kłóci się z „en cada calle”; w m9-l3/m9-l4 ten sam zwrot oddano „hasta el river”. |
| es-L5-02 | ŚR | content/es/lessons/m9-l1-spr.md:137 | „Trío (set), {{t:straight\|escalera}} o mejor” | „Set, {{t:straight\|escalera}} o mejor” | pl m9-l1-spr.md:137 „set, {{t:straight}} i lepsze” (en „A set”); dodane „Trío” to nazwa innego terminu (three-of-a-kind: „trío”, set: „set” w terms-nazwy.yaml); wszędzie indziej w pliku i części „set”. |
| es-L5-03 | ŚR | content/es/lessons/m9-l3-rozmiar-geometryczny.md:89 | „Antes de {{t:bet\|hacer}} una {{t:bet\|apuesta}}” | „Antes de hacer una {{t:bet\|apuesta}}” | pl m9-l3-rozmiar-geometryczny.md:89 „{{t:bet\|postawisz}} {{t:bet}}”; „hacer” nie jest formą terminu bet (apuesta/apostar) — znacznik terminu na zwykłym czasowniku; w m9-l1:107 i m9-l4:95 to samo zdanie ma tylko „haga/hagas … {{t:bet\|apuesta}}”. Poprawka usuwa jeden znacznik t:bet (ostrzeżenie skryptu zamierzone). |
| es-L5-04 | NISKIE | content/es/lessons/m10-l1-statystyki.md:56 | „se ha {{t:fold\|retirado}} en {{n:hud.se.f3b.p}} de ellas” | „se ha {{t:fold\|retirado}} en el {{n:hud.se.f3b.p}} de ellas” | pl m10-l1-statystyki.md:56 „w {{n:hud.se.f3b.p}} z nich”; wartość to procent (numbers.yaml: unit percent) — po hiszpańsku wymagany rodzajnik „el 50 %”, jak w tej samej pozycji linia 59 „en el {{n:hud.se.f3b.p}} de los casos”. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- Termin top-pair: we wszystkich pięciu plikach forma „pareja mayor” ({{t:top-pair|pareja mayor}}), a `content/es/terms-nazwy.yaml` podaje nazwę „top pair”. Użycie jest spójne w plikach i w całym `content/es` (84 wystąpienia), więc nie zgłaszam jako znaleziska; do decyzji, czy nazwa w terms-nazwy nie powinna brzmieć „pareja mayor”.
- m9-l4-plan-trzech-ulic.md:104 „{{t:overpair|sobrepareja}}” przy nazwie „overpair” w terms-nazwy.yaml (w content/es „sobrepareja” ×9, „overpairs” ×1) — ta sama kwestia systemowa.
- m9-l3-rozmiar-geometryczny.md:68 „con {{t:bet|apuestas}} mayores en el river no te quedará stack” — przez szyk „en el river” może się łączyć z „apuestas mayores” (pl:68 „przy większych zakładach na riverze zabraknie stacku” — tak samo dwuznaczne); ewentualnie „con apuestas mayores, en el river no te quedará…”.
- m9-l4-plan-trzech-ulic.md:95 „¿cuántas … aguanta mi mano y quiero jugar por todo el stack?” — drugie pytanie (pl „i czy chcę grać…”) brzmi niezgrabnie; styl, bez zmiany sensu.
- Czas narracji w promptach: m9-l1 „Abriste… igualó” (indefinido), m9-l4 „Has abierto… ha igualado” (perfecto) — niespójność między plikami, w każdym pliku konsekwentnie.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład bardzo dobry: wszystkie liczby `{{n:…}}`, identyfikatory, struktura YAML i tabele zgodne ze źródłem, kierunki zaleceń i przeczenia zachowane, nic pominiętego. Wariant europejski (vosotros: „cada uno de vosotros”, „podéis”) użyty konsekwentnie. Terminologia zgodna z terms-nazwy poza systemowym „pareja mayor”/„sobrepareja” (patrz „Do sprawdzenia”). M9-l4 pisze `{{t:spr|SPR}}` z formą, pozostałe pliki `{{t:spr}}` — bez skutku dla czytelnika.
