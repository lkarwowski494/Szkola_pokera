# ko · L4 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m7-l1-druga-beczka.md | tak (138/138 linii, pl i ko) | znaczniki `{{n:}}`, `{{t:klucz}}`, `[[karty]]`, pola YAML zgodne z pl (porównanie linia po linii skryptem); 1 dodatkowy znacznik `{{t:value|밸류}}` w l. 137 (w pl zwykłe słowo „wartość”) — nieszkodliwy |
| content/ko/lessons/m7-l2-polaryzacja.md | tak (139/139) | jw.; dodatkowy `{{t:range|레인지}}` w l. 138 — nieszkodliwy |
| content/ko/lessons/m7-l3-implied-odds.md | tak (147/147) | jw.; dodatkowy `{{t:draw|드로우}}` w l. 143 — nieszkodliwy |
| content/ko/lessons/m7-l4-probe-obrona.md | tak (146/146) | znaczniki i pola YAML zgodne z pl |
| content/ko/lessons/m8-l1-value.md | tak (139/139) | znaczniki i pola YAML zgodne z pl |

Pomocniczo przeczytane: `content/ko/terms-nazwy.yaml` (całość). Glosariusz `docs/lokalizacja/glosariusz.md` otwarty tylko wyszukiwaniem (hasła c-bet, probe-bet), nie czytany w całości. Wersji `en` nie otwierałem. Poprawne odpowiedzi (`correct: true`, `sizeError: true`, `answer:`) we wszystkich ćwiczeniach zgodne z pl i z uzasadnieniami. Błędów sensu (liczby, kierunek zalecenia, zagrania, pozycje) nie znalazłem; wszystkie poprawki dotyczą terminologii i drobnej naturalności.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m7-l1 (10 miejsc), m7-l2 (4 miejsca) | pl „c-bet” → w ko zapis łaciński „c-bet”, podczas gdy terms-nazwy ko: c-bet = „C벳” i tak piszą m7-l4 (15×) oraz m8-l1 (2×). W JSON są 4 przykłady (m7-l1: 108, 114, 118; m7-l2: 110); pozostałych 10 miejsc: m7-l1 l. 13, 33, 43, 53, 72, 82, 110; m7-l2 l. 41, 51, 61 | zamiana skryptem, patrz niżej |
| NISKIE | m7-l1, m7-l3 vs m7-l2, m7-l4, m8-l1 | Dwa style osadzania czasownika w znaczniku w obrębie modułu: „{{t:check|체크합니다}}” (m7-l1, m7-l3) i „{{t:check|체크}}합니다” (m7-l2, m7-l4, m8-l1). Dla czytelnika wynik jest ten sam; kwestia spójności źródła | bez zmian albo ujednolicić przy okazji |
| NISKIE | m7-l4:46, 78 vs m7-l1/m7-l3 | Klasyfikator outów: „아웃이 {{n:outs.oesd}}개”, „아웃 {{n:outs.gutshot}}개” w m7-l4, a w m7-l1/m7-l3 „아웃 {{n:…}}장”. Poprawka zależy od tego, co wstawia `{{n:}}` (sama liczba czy liczba z jednostką) — nie sprawdzałem builda | ujednolicić na „장” po sprawdzeniu wyświetlania |
| NISKIE | m8-l1:138 vs m7-*:note | „materiały szkoleniowe” → „트레이닝 자료” (m8-l1) i „교육 자료” (m7-l1…l4) | ujednolicić na „교육 자료” |
| NISKIE | m7-l1:136 vs m7-l2…m8-l1 | tytuł ramki „Skąd te zasady” → „이 규칙의 출처” (m7-l1) i „이 원칙의 출처” (pozostałe 4 pliki) | ujednolicić na „이 원칙의 출처” |
| NISKIE | m8-l1 (cały plik) vs m7-* | zwykłe słowo „bet” oddane jako „벳” (m8-l1) i „베팅” (m7-*); terms-nazwy dopuszcza obie formy (nazwa: „베팅”) | bez poprawki; do decyzji przy ujednoliceniu całości |

## Do ujednolicenia skryptem
- `c-bet` → `C벳` w `content/ko/lessons/m7-l1-druga-beczka.md` (`grep -c 'c-bet'` = 10 linii, 10 wystąpień) i `content/ko/lessons/m7-l2-polaryzacja.md` (4 linie, 4 wystąpienia). Partykuły po zamianie pozostają poprawne („c-bet을/에/,” → „C벳을/에/,”; 벳 kończy się spółgłoską, a tekst już używa 을). W całym `content/ko` (lessons, rules, exams): „c-bet” 137×, „C벳” 105×, „c벳” 4× — warto ujednolicić globalnie tym samym wzorcem (poza zakresem tej części; identyfikatory typu `cbet.size.small` nie zawierają łącznika, więc wzorzec `c-bet` ich nie rusza).
- `오픈엔디드` → `양방향` (w części 6 wystąpień, wszystkie ujęte w JSON; m7-l4 ma już „양방향 스트레이트 드로우”).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m7-l1:27, 75, 76, 85–87, 128, 134 i m7-l2 (wiele miejsc): „zapłaci / płaci” (= sprawdzi zakład) oddane jako „돈을 냅니다 / 지불합니다”. Zrozumiałe, ale czy koreański gracz nie powie raczej „콜합니다 / 콜을 받습니다”? Zostawiłem, bo pl też rozróżnia „zapłaci” od „sprawdzi”.
- m7-l2:27: „Ograniczony (zakres)” → „캡드”. Czy „캡드 레인지” jest zrozumiałe bez objaśnienia (zdanie objaśniające jest w `why`)? Alternatywa: „캡된 레인지”.
- m7-l3:122: „Implied odds (szanse ukryte)” → „임플라이드 오즈(숨은 오즈)”; m8-l1:129: „Thin value (cienka wartość)” → „씬 밸류(얇은 밸류)”. Dosłowne glosy — czy naturalne?
- m7-l3:143: pl „gdy masz draw do niskiego koloru albo do strita, a na stole może wpaść flush” → ko rozdziela to na dwa przypadki („낮은 플러시를 노리는 드로우가 있거나, 보드에 플러시가 완성될 수 있는데 스트레이트를 노리는 드로우가 있을 때”). Odczytanie zgodne z sensem pokerowym; pl dopuszcza też odczytanie, w którym warunek „może wpaść flush” dotyczy obu drawów.
- m7-l1:48: „gutshot do najwyższego strita” → „넛 스트레이트로 가는 거트샷” (użyto terminu nuts tam, gdzie pl ma opis). Sens ten sam.

## Pytania do źródła pl
- m7-l1:76 „Taki bet zarabia na lepszych rękach.” — zdanie dwuznaczne (dosłownie: bet zarabia na lepszych rękach; z kontekstu: zarabiają na nim lepsze ręce). Ko przyjęło sens kontekstowy („더 강한 핸드에게 돈을 벌어 줍니다”).
- m7-l2:65 „Z tą ręką zarabiasz głównie od rąk, które cię biją.” — dosłownie „zarabiasz”, a chodzi o to, że sprawdzają cię głównie ręce, które cię biją (czyli tracisz). Ko dosłownie: „주로 당신을 이기는 핸드에게서 돈을 받습니다”.
- m8-l1:33 i 135 „bez dopłaty od lepszych” — kierunek dopłaty niejasny (to gracz dopłacałby lepszym rękom). Ko: „더 강한 핸드에 추가로 지불하지 않고” (sens kontekstowy).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L4 nie było treści krytycznej (brak modułu 12, helplines, ramki „Odpowiedzialna gra”).
