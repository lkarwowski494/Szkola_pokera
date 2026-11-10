# pt-BR-R2 — pt-BR (portugalski brazylijski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/pt-BR/rules.yaml (R-M8-001 … R-M13-008: M8, M9, M10, M12, M11, M13) | tak, linie 643–1207 (do końca pliku), porównane pole po polu z content/pl/rules.yaml:643–1207; en jako pomoc przy R-M8-003 i R-M9-010 |

Dodatkowo kontrola mechaniczna linia po linii (643–1207): zestaw `{{n:…}}` i kluczy `{{t:…}}`, klucze YAML, pola `id/module/level/sources`, adresy URL, liczby wpisane cyfrą poza znacznikami — jedyna różnica: brak `{{t:fold}}` w linii 1128 (znalezisko 01); daty „5.10.2026” → „5/10/2026” to poprawny zapis lokalny.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-R2-01 | ŚR | content/pt-BR/rules.yaml:1128 (R-M11-011 because) | „então o fold de todos acontece menos vezes” | „então o {{t:fold}} de todos acontece menos vezes” | Pominięty znacznik terminu: pl rules.yaml:1128 ma „{{t:fold|pasy}} wszystkich”; w przekładzie goły tekst „fold” (sens zachowany, brak podpięcia terminu). |
| pt-BR-R2-02 | ŚR | content/pt-BR/rules.yaml:1112 (R-M11-009 because) | „com {{t:payout|premiação}}” | „com {{t:payout|prêmios}}” | Forma znacznika jest nazwą innego terminu: „premiação” = prize-pool, payout = „prêmio” (terms-nazwy.yaml:136–137); pl rules.yaml:1112 „z {{t:payout|wypłatami}}”; w tym samym pliku linia 1103 ma poprawnie „{{t:payout|prêmios}}”. |
| pt-BR-R2-03 | NISKIE | content/pt-BR/rules.yaml:1005 (R-M12-007 because) | „parar antes, antes de perder” | „parar mais cedo, antes de perder” | Niezręczne powtórzenie; pl rules.yaml:1005 „skończyć wcześniej, zanim stracisz zdolność jasnego myślenia”. Sens bez zmiany. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- content/pt-BR/rules.yaml:1037 (R-M12-012 because): „você tem mais coisa para recuperar” za pl „masz najwięcej do nadrobienia” — zrozumiałe, ale „recuperar” bywa czytane jako „odzyskać (straty)”; ewentualnie „tem mais a aprender para alcançar os outros”. Sens kierunkowo zgodny.
- content/pt-BR/rules.yaml:871, 874, 917 i in.: „limite” użyte w znaczeniu „próg” („limite de value bet”, „limite de WTSD”, „limite alpha”), a jednocześnie „limite” to nazwa terminu stakes (terms-nazwy.yaml:116; linie 1028, 1036). Kontekst rozróżnia, ale to to samo słowo w dwóch znaczeniach w jednym pliku; pola `source` nie są zwykle widoczne dla ucznia.
- content/pt-BR/rules.yaml:1164 (R-M13-003): „o replay das suas partidas” za pl „powtórka z gry” (nazwa funkcji aplikacji) — nie znalazłem tej nazwy w słowniku interfejsu pt-BR do porównania; sprawdzić zgodność z nazwą funkcji w UI.
- content/pt-BR/rules.yaml:1027 (R-M12-011 if): „(de {{n:br.bi.base}} para {{n:br.bi.move-down}})” za pl „(przy 30 do 15)” — sens równoważny (spadek z 30 do 15), drobna zmiana konstrukcji.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład drugiej połowy księgi reguł jest wierny i naturalny (wariant brazylijski, konsekwentne „você”); wszystkie liczby, kierunki zaleceń, przeczenia, adresy URL i cytaty źródeł zgodne z pl. Reguły krytyczne R-M12-001…012 (wariancja, tilt, ryzyko ruiny, schodzenie ze stawki „no mais tardar”/„só volta quando”, proporcje nauki „nunca menos de”) przełożone w całości, bez zmiany granic i sensu; jedyna uwaga to styl (03). Znaczniki nienaruszone poza jednym pominiętym `{{t:fold}}`. Terminologia zgodna z terms-nazwy.yaml; jedna forma z cudzego terminu (payout/premiação).
