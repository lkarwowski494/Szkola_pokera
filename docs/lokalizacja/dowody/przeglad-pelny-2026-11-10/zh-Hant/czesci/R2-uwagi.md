# zh-Hant · R2 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/rules.yaml, linie 332–642 (R-M5-001…R-M7-013) | Tak: pl i przekład, linia po linii (pola if/then/because/population/source) | Poza zakresem linii nic nie czytano. Dodatkowo kontrola skryptem: klucze `{{t:…}}` i `{{n:…}}` w każdej linii zgodne z pl (jedyna różnica: kolejność dwóch `{{n:}}` w l. 595, wymuszona szykiem zdania, sens zachowany), adresy URL, pola nieprzekładalne (id, module, level, check, sources) identyczne z pl, brak resztek polskiego tekstu w polach przekładanych (komentarze `#` w l. 440–441, 532–533, 641–642 zostały po polsku jak w pl: to komentarze YAML, nie treść). Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (całość), `content/numbers.yaml` i `tools/content-build/src/numbers.ts` (zapis mnożnika „3x–4.5x”). Wersji en nie otwierano. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/zh-Hant/rules.yaml:363, 502, 505 | pl „sety” (bez znacznika) → „暗三”; terms-nazwy ma set: „三條” (tak samo jak three-of-a-kind). „暗三” jest precyzyjniejsze (set = para w ręce + karta stołu) i używane w lekcjach zh-Hant (10 plików), więc tekst jest poprawny; niezgodny jest raczej wpis terms-nazwy. | Decyzja terminologiczna: zmienić set w terms-nazwy na „暗三條/暗三” albo zostawić; tekstu reguł nie zmieniać. |
| NISKIE | content/zh-Hant/rules.yaml:494 | pl „na suchych flopach z królem” → „K 高的乾燥翻牌” (flop z królem jako najwyższą kartą); zawężenie zgodne z przykładem źródła (K84), wniosek bez zmian. | Zostawić. |

## Do ujednolicenia skryptem
- `{{t:oesd|兩頭順聽牌}}` (l. 502; w całym content/zh-Hant 6×) wobec `{{t:oesd|兩頭順子聽牌}}` (10×); terms-nazwy oesd: null. Wzorzec `{{t:oesd|兩頭順聽牌}}` → `{{t:oesd|兩頭順子聽牌}}` po decyzji, która forma obowiązuje (dotyczy całego przekładu, nie tylko R2).
- `{{t:polarized|兩極化}}` → `{{t:polarized|極化}}`: 3 trafienia w content/zh-Hant; w R2 jedno (l. 568, poprawka w R2.json).
- „常客” → „常規玩家” (pojęcie regular): 5 trafień w content/zh-Hant; w R2 jedno (l. 472, poprawka w R2.json).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- l. 521, 594, 598: „dopłata” → „補注額” (w content/zh-Hant 11× wobec 4× „跟注額”). Zrozumiałe, ale rzadkie; czy naturalniejsze byłoby „需跟注的金額/跟注額”? Jedna forma w całym przekładzie.
- l. 548, 606, 614 (pole source): „trener z serwisem szkoleniowym” → „有訓練網站的教練”; brzmi niezgrabnie, może „經營訓練網站的教練”. Pole źródła, bez wpływu na naukę.
- l. 402: „划算” — w piśmie tajwańskim spotyka się też „劃算”; obie formy używane, nie zmieniano.
- l. 384, 401, 410: „c-bet” zostawione po łacinie (pl też „c-betujesz” bez znacznika), choć terms-nazwy c-bet: „持續下注”; spójne w całym zakresie R2, do decyzji ogólnej.

## Pytania do źródła pl
- pl l. 545: „({{t:flush-draw}}, {{t:straight|strita}}, gutshot z wysoką kartą)” — po rozwinięciu znaczników wychodzi „flush draw, strita, gutshot…”, brakuje słowa „draw do” przed „strita”; przekład ma poprawnie „順子聽牌”.
- pl l. 578: „daje {{t:draw|drawie}} dobrą cenę” — forma „drawie” wygląda na literówkę (celownik: „drawowi”).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części R2 nie ma treści krytycznej (brak reguł R-M12).
