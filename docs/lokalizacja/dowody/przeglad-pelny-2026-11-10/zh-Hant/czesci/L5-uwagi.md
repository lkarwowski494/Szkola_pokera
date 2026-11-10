# zh-Hant · L5 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/zh-Hant/lessons/m8-l2-ile-blefow.md` | tak (143/143 linii, pl i zh-Hant) | 1 poprawka (ŚR) |
| `content/zh-Hant/lessons/m8-l3-blokery.md` | tak (118/118) | 1 poprawka (NISKIE) |
| `content/zh-Hant/lessons/m8-l4-bluff-catching.md` | tak (136/136) | bez poprawek |
| `content/zh-Hant/lessons/m9-l1-spr.md` | tak (149/149) | 1 poprawka (NISKIE) |
| `content/zh-Hant/lessons/m9-l2-zaangazowanie.md` | tak (114/114) | 17 poprawek (15 ŚR „equity”, 2 NISKIE) |

Pomocniczo przeczytane: `content/zh-Hant/terms-nazwy.yaml` i `docs/lokalizacja/glosariusz.md` w całości; z `content/en/lessons/m9-l2-zaangazowanie.md` tylko linie 80 i 110 (dwuznaczne polskie „z czym grasz”, „do rivera”); z `content/numbers.yaml` tylko definicje `spr.commit` i `geo.spr2.*` (jednostka procent). Wartości liczb pod znacznikami `{{n:…}}` nie były sprawdzane (poza zakresem; znaczniki porównane z pl klucz po kluczu).

Wynik ogólny: sens, liczby (`{{n:…}}`), notacja kart, `id`, `family`, `rules`, `answer`, `table`, `correct: true` zgodne z pl we wszystkich pięciu plikach; nie znalazłem błędu wagi KRYT ani WYS. Znaków uproszczonych ani resztek polskiego tekstu nie ma.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m9-l2-zaangazowanie.md (28 wystąpień) wobec m9-l1-spr.md | pl „stack” → w m9-l1 „籌碼” („打光整個籌碼”, „雙方籌碼各”), w m9-l2 „籌碼量” („打整個籌碼量”, „雙方籌碼量各”). Dwie nazwy tego samego pojęcia w sąsiednich lekcjach; „stack” ma w terms-nazwy `null` [DO USTALENIA]. | Decyzja ponad częścią: jedna postać (np. „籌碼” jak w „有效籌碼”) w całym module 9. |
| NISKIE | m9-l1-spr.md:137 wobec m9-l2:30, 59, 69 | pl „set” → w m9-l1 „暗三條”, w m9-l2 „三條” (terms-nazwy: set = „三條”). | Ujednolicić wg decyzji dla klucza `set`. |
| NISKIE | m8-l4-bluff-catching.md (9×) wobec m8-l2 (15×) i m9-l2 (3×) | pl „cała pula” → „滿{{t:pot|底池}}” w m8-l4, „整個{{t:pot|底池}}” w m8-l2 i m9-l2. Obie postaci poprawne, ale różne w sąsiednich lekcjach. | Ewentualnie ujednolicić; nie blokuje. |
| NISKIE | m9-l2-zaangazowanie.md (17 miejsc) wobec m9-l1 | Odstęp przy znaczniku skrótu: m9-l1 pisze „ {{t:spr}} ” ze spacjami po obu stronach, m9-l2 bez spacji („{{t:spr}}低時”, „低{{t:spr}}”), co po wyświetleniu daje „SPR低時”. | Patrz „Do ujednolicenia skryptem”. |
| NISKIE | m8-l2 (linie 65, 66, 74, 76, 83, 142) | pl „ręka łapiąca {{t:bluff|blefy}}” → „抓詐唬牌” bez znacznika `{{t:bluff|…}}` (zgubione podświetlenie terminu, sens bez zmian). | Bez zmiany albo „抓{{t:bluff|詐唬}}牌”. |

## Do ujednolicenia skryptem
- **solver → 求解器 (albo odwrotnie)**: w części L5 „求解器” stoi w m8-l2:142 i m8-l4:135 (2×), a łacińskie „solver” w m8-l3:117 (2×) i m9-l2:113 (2×). W całym `content/zh-Hant` (lessons, rules.yaml, exams) podział jest prawie równy: `grep -rF 求解器` = 149 linii, `grep -rF solver` = 147 linii. Wymaga jednej decyzji dla języka; dlatego nie wpisałem poprawek do JSON.
- **equity → 權益 poza tą częścią**: w m9-l2 wszystkie 15 miejsc jest w `L5.json` (komplet, nie przykłady, żeby plik nie został w połowie zmieniony). Ten sam wzorzec (łacińskie „equity” jako zwykły tekst, nie w znaczniku ani w `id`/`family`) widziałem przez `grep` w m4-l2-obrona-bb.md, m5-l4-bez-pozycji.md i m11-l3-icm.md (pliki innych części, nie czytane przeze mnie). Wzorzec: ` equity ` między znakami CJK → `權益` bez spacji; przed `=` i `|` zostaje jedna spacja.
- **Odstępy przy `{{t:spr}}` w m9-l2**: `grep -c '{{t:spr}}[^ |，。：）]' content/zh-Hant/lessons/m9-l2-zaangazowanie.md` = 17 linii. Zamiana: znak CJK bezpośrednio przed/po `{{t:spr}}` → wstawić spację (jak w m9-l1).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m8-l3:114 — pl „Blokery przechylają wybór między podobnymi rękami” → „{{t:blocker|阻擋牌}}會讓你在類似的牌之間做出取捨” („każą ci iść na kompromis”). Czy nie lepiej „會左右你在類似的牌之間的選擇”?
- m9-l2:6 (sub) — „Kiedy grasz o cały stack” → „當你要把整個籌碼量打進去”; czy podtytuł nie powinien brzmieć jak pytanie „何時打光整個籌碼”?
- m9-l1 i m9-l2 — „打光整個籌碼 / 打整個籌碼量” dla „grać o cały stack”: zrozumiałe, ale czy rodzimy gracz z Tajwanu nie powie raczej „打到全下 / 打光全部籌碼”?
- m8-l4:80 — „帶黑桃的 Q、帶黑桃的 J” za pl „dama z pikami, walet z pikami” (ręce z damą/waletem i pikiem jako nietrafione drawy); czy czytelne bez dopowiedzenia „沒中的黑桃聽牌”?
- m8-l4:57, m9-l1:80, m9-l2:46, 65 — „踢腳” dla „kicker” (terms-nazwy: `null`, DO USTALENIA); w treści 55 linii z „踢腳” wobec 8 z „kicker”.
- m8-l4 i m9-l1 — „按鈕位” dla zwykłego (bez znacznika) „Button”, gdy terms-nazwy podaje `button: "BTN"`; w treści 267 linii z „按鈕位”, więc zostawiłem.

## Pytania do źródła pl
- Brak błędów merytorycznych do zgłoszenia. Uwaga redakcyjna: m8-l4:80 „dama z pikami, walet z pikami” jest skrótowe (chodzi o nietrafione drawy do koloru z damą/waletem); tłumacze oddają je dosłownie.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Nie dotyczy: część L5 (m8-l2…m9-l2) nie zawiera treści modułu 12, helplines ani tekstów o prawdziwych pieniądzach.
