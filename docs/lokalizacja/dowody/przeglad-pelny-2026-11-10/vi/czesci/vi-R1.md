# vi-R1: wietnamski (vi), content/vi/rules.yaml linie 1–441 (nagłówek, R-M0-* … R-M5-*)

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| content/vi/rules.yaml (linie 1–441) | tak (cały zakres zlecenia; linie 442–1207 poza zleceniem) | 441 z 1207 |
| content/pl/rules.yaml (linie 1–441, źródło) | tak (cały zakres zlecenia) | 441 |
| content/vi/terms-nazwy.yaml | tak | 164 |

Kontrola mechaniczna linii 1–441 (pl obok vi): zestawy kluczy `{{t:…}}` i `{{n:…}}` identyczne w każdej linii; pola nietekstowe (id, module, level, check, sources) identyczne; adresy URL i liczby w polach `source` identyczne; liczby poza znacznikami w if/then/because identyczne. W zakresie nie ma pola `population`. Każdy znacznik `{{t:…}}` w vi ma formę po `|`.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | content/vi/rules.yaml:149 | bỏ bài}}, không chỉ bỏ thêm cho bằng tiền mù (limp) | bỏ bài}}, chứ không chỉ bỏ thêm cho bằng tiền mù (limp) | R-M3-004 then: „không chỉ” = „nie tylko”, zdanie można odczytać odwrotnie do zakazu limpu; pl: „nie dopłacasz samego blinda (limp)” | średnia | tak |
| 2 | ŚR | content/vi/rules.yaml:174 | bạn vào ván đầu tiên bằng một lần {{t:raise\|tố}} | bạn là người đầu tiên vào ván bằng một lần {{t:raise\|tố}} | R-M3-007 if: dwuznaczne („wchodzisz do pierwszego rozdania”); pl: „wchodzisz do rozdania jako pierwszy przebiciem”; R-M3-004 ma poprawną postać | wysoka | tak |
| 3 | ŚR | content/vi/rules.yaml:157, 158, 248, 257, 258, 273, 281, 314, 360 (13 wystąpień) oraz 409 | đồng chất (= suited: „tay bài đồng chất”, „connector đồng chất”, „át đồng chất”) | cùng chất (suited), „đồng chất” tylko dla monotone | Niespójny termin: terms-nazwy.yaml ma suited = „cùng chất”, monotone = „đồng chất”; w regułach „đồng chất” oznacza oba pojęcia (R-M5-010: „flop {{t:monotone\|đồng chất}} (ba lá cùng chất)” obok „connector đồng chất” w R-M5-004). Sens zaleceń nie jest zmieniony. To samo użycie jest w lekcjach m3–m5 (ok. 30 miejsc), więc decyzja dla całego korpusu | wysoka (co do niespójności) | nie (wybór terminu w całym korpusie) |
| 4 | NISKIE | content/vi/rules.yaml:112, 334, 335, 343, 392, 393, 394, 402, 434 | {{t:draw\|draw}}, {{t:straight-draw\|draw sảnh}} | bài chờ, bài chờ sảnh | terms-nazwy.yaml: draw = „bài chờ”, straight-draw = „bài chờ sảnh”; reguły konsekwentnie używają „draw” (zrozumiałe, spójne wewnątrz pliku), ale niezgodnie z przyjętą nazwą | wysoka | nie (wybór terminu w całym korpusie) |
| 5 | NISKIE | content/vi/rules.yaml:47, 54, 56, 359, 393, 426; 123, 149, 175, 176, 191, 192, 229, 231, 238, 298, 321; 427 | {{t:check\|xem bài}}; {{t:small-blind\|mù nhỏ}}, {{t:big-blind\|mù lớn}}; {{t:street\|vòng cược}} | check; small blind / big blind; street | Formy różne od nazw w terms-nazwy.yaml (check, small blind, big blind, street; tam oznaczone [WIELE FORM]). Wewnątrz zakresu użycie jest spójne i zrozumiałe; „vòng cược” dla street pokrywa się z nazwą betting-round | wysoka | nie (wybór terminu w całym korpusie) |
| 6 | NISKIE | content/vi/rules.yaml:170 | range mở bài tăng dần | range mở cược tăng dần | R-M3-006 source: „mở bài” = odkrycie kart/wstęp, nie otwarcie (open = „mở cược”); pole source nie jest pokazywane w aplikacji | średnia | tak |
| 7 | NISKIE | content/vi/rules.yaml:336, 344 | thay đổi người dẫn | thay đổi người dẫn đầu | R-M5-001/002 because: „lider” naturalniej „người dẫn đầu”; „người dẫn” samo brzmi niepełnie. Ta sama forma w lekcji m5-l1, więc do ujednolicenia razem | średnia | nie (spójność z m5-l1) |

## Do sprawdzenia przez człowieka znającego język

- „trước {{t:cutoff\|CO}}”, „trước Button”, „trước mù nhỏ”, „trước 3-bet của …” jako odpowiednik „wobec” (R-M4-002, 003, 005, 011, R-M5-012 i pola source): „trước” znaczy też „przed” (kolejność/miejsce przy stole), co przy pozycjach może mylić; możliwe „khi đối mặt với” / „đấu với”. Pewność niska.
- R-M3-002 because (132) i R-M3-010 because (203): „khả năng có người cầm bài tốt hơn cao hơn” — dwa „hơn” obok siebie, sens poprawny, ale ciężkie; możliwe „dễ có người cầm bài tốt hơn”.
- R-M3-008 because (185): „cửa trên” za „faworyt” — potoczne (zakłady sportowe); czy pasuje do rejestru aplikacji bez hazardu.
- R-M4-006 because (258): „khép lại hành động” za „zamykasz akcję”; R-M4-013 then (314): „tay đầu cơ” za „ręce spekulacyjne” — kalki, czy naturalne dla graczy.
- R-M5-001 if (334): „với ít nhất hai bộ hai hạng bài” za „z co najmniej dwoma zestawami dwóch rang” — wierne, ale trudne (źródło też jest trudne).

## Uwagi do źródła pl

- Komentarze YAML (linie 1–17, 208, 329–331, 440–441) są w vi po polsku, tak jak w źródle; to komentarze techniczne, nie treść — odnotowane bez poprawki.
- R-M3-004 then: „nie dopłacasz samego blinda (limp)” jest sformułowaniem zwartym i łatwym do błędnego odczytania w przekładzie (patrz znalezisko 1).

## Ocena ogólna

Przekład reguł R-M0–R-M5 jest wierny: nie znaleziono zmienionej liczby, ręki, zakresu, pozycji, kierunku zalecenia ani przeczenia, a znaczniki, adresy i cytaty źródeł zgadzają się ze źródłem co do klucza. Brak znalezisk KRYT i WYS. Uwagi dotyczą dwóch dwuznacznych sformułowań (R-M3-004, R-M3-007) oraz terminologii niezgodnej z terms-nazwy.yaml, przede wszystkim „đồng chất” użytego jednocześnie dla suited i monotone, co wymaga decyzji dla całego korpusu. Język jest naturalny i spójny w formie zwracania się („bạn”).
