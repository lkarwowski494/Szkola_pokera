# ko · L1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m0-l1-uklady.md | tak | 6 poprawek (pisownia „투 페어”) |
| content/ko/lessons/m1-l1-przebieg.md | tak | 1 poprawka (cudzysłów) |
| content/ko/lessons/m2-l1-outy.md | tak | 2 poprawki (nazwa OESD) |
| content/ko/lessons/m2-l2-pot-odds.md | tak | bez poprawek |
| content/ko/lessons/m3-l1-pozycja.md | tak | 2 poprawki („주도권”) |
| content/ko/lessons/m3-l2-rece-startowe.md | tak | 3 poprawki (partykuła, „3벳”) |
| content/ko/lessons/m3-l3-zakresy-otwarc.md | tak | 2 poprawki („혼합 핸드”, „얼리 포지션”) |

Sposób: pl i ko zestawione linia w linię (liczba linii w każdej parze jest równa); linie identyczne w obu plikach (front matter, `id`, `family`, `rules`, `table`, `generator`, `params`, `answer`, bloki `range`) przejrzane osobno — zgodne z pl. Znaczniki `{{n:…}}`, `[[…]]`, klucze `{{t:…}}`, pola `correct: true` — zgodne z pl we wszystkich 7 plikach; liczby, zakresy, pozycje i kierunek zaleceń bez różnic sensu. `content/ko/terms-nazwy.yaml` przeczytany w całości; `glosariusz.md` nie był otwierany (klucze znaczników porównane bezpośrednio z pl). Wersji `en` nie otwierałem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ko/lessons/m1-l1-przebieg.md:86 (oraz :17) | pl: „We wzorach w dalszych lekcjach piszemy krótko »bet«” → ko zapowiada zapis „bet” we wzorach, ale wzory w ko są przełożone (m2-l2:82–83: „베팅 전 팟 + 베팅 + 콜”), więc zapowiedź nie zgadza się z tym, co czytelnik zobaczy. | Decyzja ponad częścią L1: albo zdanie w m1 dostosować do koreańskich wzorów („…간단히 ‘베팅’이라고 씁니다”), albo zostawić „bet” we wzorach; wymaga przejrzenia wszystkich bloków `formula` w ko. |
| NISKIE | m0-l1 (나/내) · m1-l1, m3-l1, m3-l3 (당신) · m2 (내) | Zwrot do czytelnika niejednolity między lekcjami: „나는 풀하우스”, „내 에이스” wobec „당신 앞에서”, „당신은 버튼에”. Oba poprawne, ale mieszane. | Ujednolicić w całym przekładzie jedną konwencję (decyzja dla całego ko, nie dla L1). |
| NISKIE | m3-l1-pozycja.md:69 wobec m3-l3-zakresy-otwarc.md:77, 80 | pl „rozwiązania solverów” → „솔버 솔루션” (m3-l1) i „솔버 해법” (m3-l3). | Jedna postać w całym ko. |
| NISKIE | m3-l1 („행동합니다”) wobec m1-l1, m3-l3 („액션합니다”) | pl „mówi” (kolejność działania) oddane dwojako. Oba zrozumiałe. | Ewentualnie ujednolicić. |
| NISKIE | m1-l1-przebieg.md:81 | pl „najlepszy układ” → „가장 높은 족보”; w m0 układ = „핸드” („핸드 순위”). | Ewentualnie „가장 좋은 핸드”. |

## Do ujednolicenia skryptem
Brak wzorców powyżej 10 trafień w tej części. Poza częścią L1 warto sprawdzić te same wzorce w całym `content/ko/`: `two-pair|투페어` → `two-pair|투 페어`; `initiative|이니셔티브` → `initiative|주도권` (z partykułą 를→을, 는→은, 가→이); `oesd|오픈엔디드 스트레이트 드로우` → `oesd|양방향 스트레이트 드로우`; goły tekst `3-bet` → `3벳` (w `content/ko/lessons` 20 linii z „3-bet”).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m3-l1-pozycja.md:69 — „처음으로 참여할 때는 블라인드 금액만 내지 않습니다” (pl: „Wchodząc jako pierwszy, nie dopłacasz samego blinda”). Zdanie da się odczytać jako „nie wpłacasz kwoty blinda”; nawias z definicją limpa ratuje sens. Czy jaśniej byłoby „블라인드 금액만 맞추고 들어가지 않습니다”?
- m2-l2-pot-odds.md:97 — „내 핸드를 완성했을 때 그 핸드에서 나중에 얻을 것으로 예상되는 칩” (pl: „żetony, które spodziewasz się wygrać później w rozdaniu, jeśli trafisz swój układ”): „핸드” raz jako układ, raz jako rozdanie w jednym zdaniu; czy „이번 핸드의 이후 스트리트에서” nie byłoby czytelniejsze?
- m0-l1-uklady.md:13, 31 — „누가 이깁니까: 플러시입니까, 스트레이트입니까?” — dwukropek w pytaniu to kalka interpunkcji pl; naturalniej „플러시와 스트레이트 중 어느 쪽이 이깁니까?”. Styl, nie błąd.
- m2-l1 — w tekście „거트샷” i „아웃” bez znacznika (jak w pl) — zgodne z `terms-nazwy`; bez uwag, tylko potwierdzenie.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L1 nie było treści krytycznej (moduł 12, helplines, teksty o hazardzie).
