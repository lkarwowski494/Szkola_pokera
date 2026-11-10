# ko · L3 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m5-l3-czestotliwosc-rozmiar.md | tak (134/134 linii, pl i ko linia po linii) | 12 poprawek; terminologia niezgodna z `terms-nazwy` (웨트, 너츠 우위, 세트, 오버베팅), angielskie „c-bet”/„check-raise” |
| content/ko/lessons/m5-l4-bez-pozycji.md | tak (107/107) | 3 poprawki (이니셔티브, 압축된); sens zgodny z pl |
| content/ko/lessons/m6-l1-mdf-alpha.md | tak (136/136) | 2 poprawki (zgubiony znacznik `{{t:bluff}}`, „c-bet”); wzory, tabela i liczby zgodne |
| content/ko/lessons/m6-l2-sprawdzenie.md | tak (134/134) | 8 poprawek (포지션 없이, 양극화된, 수딧, 기대값, „c-bet”) |
| content/ko/lessons/m6-l3-check-raise.md | tak (139/139) | 5 poprawek (brak podmiotu „a ty przebiłeś”, 넛 어드밴티지, drobne) |

Kontrola mechaniczna (skrypt, linia po linii pl ↔ ko): zbiory `{{n:…}}`, kluczy `{{t:…}}`, `[[…]]` oraz pola nieprzekładalne (id, family, rules, table, answer, best, when, count) identyczne we wszystkich pięciu plikach, z jednym wyjątkiem: m6-l1:55 (brak `{{t:bluff}}`, poprawka w JSON). Poprawne odpowiedzi (`correct: true`, `sizeError`, `best`) jak w pl. Wersji en nie otwierałem (nie było potrzeby). Treści krytycznej (moduł 12) w tej części nie ma.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m5-l3, m6-l1, m6-l2 (łącznie 51 miejsc poza 4 poprawkami-przykładami w JSON) | pl „c-bet” → w ko zostaje angielskie „c-bet”/„C-bet”, podczas gdy `terms-nazwy` podaje „C벳”, a m5-l4 i m6-l3 piszą „C벳” (ta sama aplikacja, sąsiednie lekcje) | zamiana skryptem, patrz niżej |
| ŚR | m6-l3: 13, 23, 33, 41, 49, 59, 69, 73, 79, 89, 102, 109, 116, 129 (14 znaczników) | pl `{{t:bet|stawia}}` → ko `{{t:bet|벳합니다}}` itd.; nazwa terminu to „베팅”, pozostałe cztery lekcje części używają „베팅”. Dodatkowo „C벳을 벳합니다” to powtórzenie („betuje c-bet”) | ujednolicić do „베팅” (np. „C벳을 합니다” albo „… 크기로 C벳합니다”); wymaga przebudowy zdań, więc bez poprawki mechanicznej |
| NISKIE | m6-l3: 26, 72, 93, 123 | `{{t:oesd|OESD}}`: nazwa w `terms-nazwy` to „양방향 스트레이트 드로우”, w m6-l2:65 znacznik bez formy wyświetli pełną nazwę; w m6-l3:72 pl samo ma formę `OESD`, w 26, 93, 123 pl ma znacznik bez formy | decyzja sesji nadrzędnej: zostawić skrót albo usunąć formę w 26, 93, 123 (partykuły 는/로/가 pasują do obu wersji) |
| NISKIE | m6-l2:6, 54…132; m6-l3:112, 114 | „wysokie karty” → raz „하이카드” (m6-l2), raz „하이 카드” (m6-l3) | jedna pisownia („하이카드” jak w `terms-nazwy`) |
| NISKIE | m6-l1: 92, 93, 135; m6-l3: 123 | zwrot do czytelnika: „내 페어”, „나를 보호합니다”, „내가 맞히면” wobec „당신” w pozostałych lekcjach części | ujednolicić do „당신” |
| NISKIE | m5-l3:132 „이 원칙의 출처” wobec m5-l4:105 „이 규칙의 출처” | ten sam nagłówek pl „Skąd te zasady” w dwóch brzmieniach | jedno brzmienie |
| NISKIE | m6-l2:6 | podtytuł „포지션 없이 … 방어하기” (pl „bez pozycji”, bez znacznika); tytuł m5-l4 używa „아웃 오브 포지션” | po ujednoliceniu znaczników rozważyć „아웃 오브 포지션에서 C벳 방어하기” |

## Do ujednolicenia skryptem
- `c-bet` → `C벳` oraz `C-bet` → `C벳` w `content/ko/lessons/m5-l3-czestotliwosc-rozmiar.md` (21 linii, 23 trafienia), `m6-l1-mdf-alpha.md` (3 linie, 3 trafienia), `m6-l2-sprawdzenie.md` (26 linii, 29 trafień); `grep -c 'c-bet\|C-bet'` = 21 / 3 / 26 linii przed nałożeniem poprawek z JSON. Partykuły po terminie (은/을/이/의/에/에는/보다) są już w postaci po spółgłosce, więc zamiana nie wymaga zmian partykuł; „c-bet하며” → „C벳하며”. W całym `content/ko`: „c-bet” 140 trafień wobec „C벳” 111 (stan przed przeglądem), więc mechanizm dotyczy też innych części.
- `{{t:bet|벳…}}` → formy od „베팅” w `m6-l3-check-raise.md`: 14 trafień (`grep -o '{{t:bet|벳[^}]*}}'`: 벳합니다 ×10, 벳했고 ×2, 벳하지 ×1, 벳 ×1). Zamiana 1:1 („베팅합니다”, „베팅했고”, „베팅하지”, „베팅”) jest poprawna gramatycznie; zostaje wtedy „C벳을 베팅합니다” (jak w m6-l1 i m6-l2), co jest zrozumiałe.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5-l3:88, 95: „{{n:ex.pot}} 따기 위해 {{n:cbet.ex.small}} 위험을 감수합니다” — po liczbach brak partykuł (을/의); czy przy faktycznie wyświetlanych liczbach (100, 33, 75) zdanie brzmi naturalnie, czy lepiej „…을 따기 위해 …의 위험을 감수합니다”.
- m5-l3:86, 93; m6-l1:45, 52, 106: „{{n:…}} {{t:bet|베팅}}합니다” bez partykuły po liczbie — potoczne, ale czy pasuje do rejestru -니다.
- m5-l3:51 „rąk z asem” → „에이스 하이 핸드” (ręce z asem jako najwyższą kartą); pl mówi szerzej „ręce z asem”. Wniosek ten sam, na flopie K-7-2 praktycznie to samo.
- m6-l3:62, 63, 64 „najlepszy kolor” → „최고의 플러시”; w m6-l2:132 to samo pojęcie to „넛 플러시”. Która postać naturalniejsza i czy ujednolicić.
- m6-l1, m6-l2, m6-l3: dwukropek w środku zdania koreańskiego („…합니다: …”) przeniesiony z pl; m5-l3 i m5-l4 rozbijają na dwa zdania. Styl do oceny przez rodzimego użytkownika.
- m6-l2:132 „sprawdzasz raczej wtedy, gdy masz dodatkowy draw” → „…있을 때는 오히려 콜합니다”; sens zachowany, ale „오히려” może brzmieć mocniej niż „raczej wtedy”.

## Pytania do źródła pl
- m5-l3:26 i 50 mówią „Większy bet spasuje mniej więcej te same ręce, a ryzykuje więcej”, a w powtórce m5-l4:85 ta sama odpowiedź brzmi „Większy bet nie spasuje więcej rąk, a ryzykuje więcej”. Przekład ko wiernie oddaje oba warianty; czy pl ma mieć jedno brzmienie.
- m5-l3:39 ma „do przebicia po wcześniejszym czekaniu (check-raise)”, m5-l4:91 skrócone „do przebicia (check-raise)” — różnica w pl, ko oddaje każdy wariant wiernie.
- m6-l3:26: pl „a {{t:flush}} i {{t:oesd}} zapłacą już do dużej puli” oraz m6-l3:93, 123, m6-l2:65 „drawami ({{t:flush}}, {{t:oesd}})” — znacznik `flush` (gotowy kolor) użyty w znaczeniu drawa do koloru; ko dopisuje „드로우” („{{t:flush|플러시}} 드로우”), w m6-l2:65 znacznik bez formy wyświetli samo „플러시”. Czy w pl nie powinno być `{{t:flush-draw}}`.
