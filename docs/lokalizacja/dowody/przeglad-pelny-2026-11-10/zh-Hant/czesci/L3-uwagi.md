# zh-Hant · L3 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m5-l3-czestotliwosc-rozmiar.md | tak (134/134 linii, pl i przekład) | sens zgodny; 1 zgubiony znacznik `{{t:pair}}` (poprawka) |
| content/zh-Hant/lessons/m5-l4-bez-pozycji.md | tak (107/107) | „equity” po angielsku, dwuznaczne 買單 ×2, zgubione „dużo” (poprawki) |
| content/zh-Hant/lessons/m6-l1-mdf-alpha.md | tak (136/136) | liczby, wzory i tabela zgodne; „all-in” po angielsku (poprawka) |
| content/zh-Hant/lessons/m6-l2-sprawdzenie.md | tak (134/134) | zgubione znaczniki `{{t:pot}}` ×1 i `{{t:bet}}` ×6; 次弱 (poprawka) |
| content/zh-Hant/lessons/m6-l3-check-raise.md | tak (139/139) | 勝率 zamiast 權益 ×2; Button = 莊位 (inaczej niż reszta treści) |

Dodatkowo, poza lekturą: porównanie skryptem linia po linii (tylko odczyt) zbiorów znaczników `{{t:klucz}}`, `{{n:klucz}}`, `[[karty]]`, pól YAML nieprzekładalnych (id, family, rules, kind, answer, position, table, when, best, rule, count) oraz flag `correct`/`sizeError`. Wynik: `{{n:…}}`, karty, pola YAML i flagi identyczne z pl we wszystkich 5 plikach; kolejność `{{n:…}}` zmieniona poprawnie (szyk zdania) w m5-l4:65 i m6-l1:65; różnice w `{{t:…}}` tylko te wymienione niżej. Wersji `en` nie otwierałem (nie była potrzebna). Glosariusz i `terms-nazwy.yaml` przeczytane.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m6-l2-sprawdzenie.md:41, 51, 61, 71, 81 | pl: „Button `{{t:bet|stawia}}` c-bet 1/3 `{{t:pot|puli}}`” → „按鈕位持續下注 1/3 …”: zgubiony znacznik `{{t:bet}}` (sens bez zmian). Linie 41/61/71/81 są identyczne, więc `stary` nie może być unikalny. | „按鈕位持續`{{t:bet|下注}}` 1/3 `{{t:pot|底池}}`” (zamiana skryptem we wszystkich 5 liniach; wzorzec `按鈕位持續下注 ` + ułamek) |
| NISKIE | m6-l2-sprawdzenie.md:98 | pl: „a Button `{{t:bet|stawia}}` c-bet” → „按鈕位持續下注。”: zgubiony znacznik `{{t:bet}}`. | „按鈕位持續`{{t:bet|下注}}`。” |
| NISKIE | m6-l3-check-raise.md:102, 129 | pl: „Button `{{t:bet|stawia}}` go szerokim zakresem” → „打這種注” / „打小 c-bet”: znacznik `{{t:bet}}` pominięty, sens zachowany. | zostawić albo „用很寬的範圍`{{t:bet|下注}}`小 c-bet” |
| ŚR | m6-l3-check-raise.md (29 linii, 36 wystąpień) | Button = 莊位 tylko w tej lekcji; w pozostałych 4 plikach części i w całej treści zh-Hant 按鈕位 (335×). Poprawne słowo, ale łamie „jedna nazwa na pojęcie”. W JSON są 2 przykłady (linie 99, 109). | patrz „Do ujednolicenia skryptem” |

## Do ujednolicenia skryptem
- `莊位` → `按鈕位` w `content/zh-Hant/lessons/m6-l3-check-raise.md`: 36 wystąpień w 29 liniach (`grep -c` = 29, `grep -o | wc -l` = 36); w całej treści zh-Hant 莊位 występuje tylko w tym pliku. Zamiana zwykła, żadne wystąpienie nie jest częścią innego słowa. (Uwaga: `terms-nazwy` ma dla `button` nazwę „BTN”, ale w pl Button stoi bez znacznika, a przekład konsekwentnie pisze 按鈕位.)
- Nazwa c-betu w obrębie części niejednolita: `C-bet` (m5-l3, m5-l4), `c-bet` (m6-l1, m6-l3), `持續下注` (m6-l2; to nazwa z `terms-nazwy`). W treści łącznie: c-bet 154×, C-bet 60×, 持續下注 52×. Decyzja o jednej postaci należy do sesji nadrzędnej; nie zgłaszam jako poprawek, bo każda postać jest zrozumiała i wprowadzona definicją w m5-l3:106 („C-bet（持續下注）”).
- `solver` vs `求解器`: m5-l4 (6×), m6-l1 (1×), m6-l3 (3×) mają łacińskie „solver”; m5-l3 (4×) i m6-l2 (2×) mają 求解器. W całej treści mniej więcej pół na pół (ok. 225 vs 204 trafień, w tym klucze). Do jednej postaci skryptem po decyzji.
- Drobne warianty form (bez wpływu na sens): `{{t:polarized|兩極化}}` (m6-l2:36; nazwa 極化), `{{t:aggressor|進攻方}}` (m6-l2:98; nazwa 進攻者), `{{t:connected|相連}}` (m6-l3, 6×; nazwa 連張), `{{t:oesd|兩頭順聽牌}}` (m6-l3) vs `{{t:oesd|兩頭順子聽牌}}` (m6-l2), `{{t:big-blind|大盲注}}` (m6-l2) vs `大盲` (reszta), opis flopu 牌張相近 (m5-l3) vs 牌點相近 (m5-l4, ta sama fraza pl „z kartami blisko siebie”).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m6-l1-mdf-alpha.md:70 — pl „Jak pogodzić te dwie liczby?” → „這兩個數字要怎麼兼顧？”. 兼顧 znaczy raczej „uwzględnić obie naraz”; być może naturalniej „這兩個數字為什麼不矛盾？” albo „要怎麼解釋這兩個數字的差別？”.
- m5-l4-bez-pozycji.md:16, 56 — „非常常`過牌`” (pl „bardzo często”): zrozumiałe, ale zbitka 非常常 może razić; ewentualnie „極常” / „絕大多數時候都”.
- kicker = 踢腳 (m5-l4, m6-l1, m6-l3; w treści 60×): `terms-nazwy` ma `kicker: null` [DO USTALENIA]; czy na Tajwanie nie częściej „踢腳牌”/„邊牌” — pytanie do rodzimego użytkownika, przekład jest spójny.
- m6-l1-mdf-alpha.md:79 — „按鈕位以 1/3 底池`下注` c-bet” (pl „Button stawia c-bet 1/3 puli”): szyk nieco sztuczny; może „按鈕位 c-bet 1/3 底池”.
- m6-l2-sprawdzenie.md:132 — pl „na suchych flopach z królem” → „K 為最大牌的乾燥翻牌” (dodane „król jako najwyższa karta”); zgodne z intencją (flopy K-high), ale to doprecyzowanie względem pl.

## Pytania do źródła pl
- m6-l2:65, m6-l3:26, 93, 123 — pl wylicza drawy jako „(`{{t:flush}}`, `{{t:oesd}}`)”, czyli „kolor” zamiast „draw do koloru” (`flush-draw`); przekład wiernie oddaje to jako 同花 (w m6-l3:26 dopisuje 聽牌). Czy w pl nie powinien stać znacznik `flush-draw`?
- m5-l3:26 vs m5-l4:85 — to samo uzasadnienie ma w pl dwa brzmienia („Większy bet spasuje mniej więcej te same ręce” / „Większy bet nie spasuje więcej rąk”); przekład oddaje każde wiernie.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L3 nie było treści krytycznej (moduły 5 i 6, bez m12, helplines i tekstów o prawdziwych pieniądzach).
