# zh-Hant · R4 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/rules.yaml, linie 953–1207 (R-M12-001…012, R-M11-001…012, R-M13-001…008) | Tak: wszystkie 255 linii w pl i w przekładzie, pole po polu | Reszta pliku poza zakresem części (nie czytana). Pomocniczo: terms-nazwy.yaml (całość), wyszukiwania w lekcjach m11–m13, egzaminie m12, terms-def i słowniku interfejsu zh-Hant tylko pod kątem spójności terminów. Glosariusz i en nie były potrzebne (nie otwierane). |

Kontrola mechaniczna (skrypt, linia po linii): zbiory `{{n:…}}` i klucze `{{t:…}}` identyczne z pl we wszystkich liniach; `id`, `module`, `level`, `sources`, adresy URL i liczby w `source` jak w pl (różnice tylko w zapisie dziesiętnym 1,96 → 1.96, 1,2 → 1.2, 71,05 → 71.05 oraz 615 tys. → 61.5 萬, wartości te same); YAML się parsuje; brak znaków uproszczonych; cytaty angielskie w `source` nietknięte.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/zh-Hant/rules.yaml:957, 965, 972, 1029 | „{{n:var.hands.k}} tys. rąk” → „{{n:var.hands.k}} 千手牌” (wyświetli się „100 千手牌”; po chińsku naturalnie „10 萬手牌”). Znacznik liczby wymusza tysiące; ten sam zapis jest w lekcjach m12 (l1, l2, l4), więc to sprawa systemowa, nie tej części. Sens poprawny. | Decyzja globalna (osobny klucz liczby w 萬 albo zostawić); nie poprawiać punktowo. |
| NISKIE | content/zh-Hant/rules.yaml:1042–1043, 1141–1143 | Komentarze YAML zostały po polsku (identyczne z pl). Nie są wyświetlane. | Bez zmian. |

## Do ujednolicenia skryptem
Brak (żaden wzorzec nie przekracza ok. 10 miejsc w tej części).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- 995 (R-M12-006, treść krytyczna): „po bad beacie” → „被爆冷後”. Lekcja m12-l3 oddaje bad beat jako „被逆轉”, lekcja m13-l3 i R-M13-006 jako „爆冷（bad beat）”. Dwie nazwy jednego pojęcia w przekładzie; która jest właściwa na Tajwanie i czy ujednolicić (bad beat nie ma klucza w terms-nazwy).
- 1071–1072 (R-M11-004): „fold equity” → „棄牌權益” (10× w przekładzie, 3× zostaje „fold equity”); terms-nazwy ma `fold-equity: null` [DO USTALENIA]. W tej części spójnie, do decyzji globalnej.
- 1127, 1135: „Button” → „按鈕位” (350× w przekładzie), a terms-nazwy `button: "BTN"` (119×). pl nie używa tu znacznika, więc nie jest to błąd znacznika; do decyzji globalnej.
- 1048: „fold po przebiciu” → „再面對{{t:raise|加注}}{{t:fold|棄牌}}”: zrozumiałe, ale „面對再加注後棄牌” byłoby wyraźniejsze (przebicie = re-raise).
- 1147, 1188: „rozdanie” → „牌局”; terms-nazwy odnotowuje dwuznaczność „牌局” (także sesja). W kontekście zrozumiałe.
- 1028 (R-M12-011, treść krytyczna): „pełny bankroll w wpisowych wyższej stawki” → „較高級別的完整買入資金”: sens zachowany, ale rodzimy użytkownik mógłby ocenić, czy „以較高級別買入計算的完整資金” nie jest jaśniejsze.

## Pytania do źródła pl
- 1031 (source R-M12-011): „przy 3bb/100 zejście przy 30 wpisowych, czyli przy pełnym bankrollu” — przy {{n:br.bi.base}} wpisowych pełnego bankrollu zdanie brzmi dziwnie (zejście przy pełnym bankrollu?); przekład wierny. Pole `source`, nie treść nauczana.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Reguły R-M12-001…009, 011, 012 (w pl i w przekładzie nie ma R-M12-010) porównane pole po polu (`if`, `then`, `because`, `source`):
- Liczby: wszystkie przez `{{n:…}}`, te same klucze i liczba wystąpień w każdym polu; liczby wpisane w `source` (1.96, 80, 2, 61.5 萬 = 615 tys., 1988, 54(4), 2014, 2011, 2015, 10(3), 3bb/100, 30) zgodne.
- Warunki i granice zachowane: „najpóźniej wtedy” → „最晚在那時”, „najwcześniej wtedy, gdy” → „最早要等…時，才回去”, „nigdy mniej niż” → „絕不少於”, „dopiero po przeglądzie rozdań” → „檢討過手牌之後才改”, „dopiero po ok. … rękach” → „也要約 … 手牌之後，才會”, „od razu” → „立刻”, „kończysz sesję” → „你結束這個場次”, „do połowy” → „一半”, „prawie każdemu” → „幾乎每個”, „część źródeł radzi zejść już po takiej stracie” → „部分來源建議遇到這樣的損失就降級”.
- Wzory bez zmian: winrate ± z × SD ÷ √(ręce ÷ 100); bloki = (z × SD ÷ dokładność)²; RoR = e^(−2 × winrate × bankroll ÷ SD²).
- Nic nie pominięto, nie złagodzono ani nie wzmocniono. Brak znalezisk KRYT i WYS.
- Znaleziska: tylko terminologia w R-M12-006 (linie 995 i 997: „情緒失控（tilt）/檔案/徵兆” wobec „上頭/側寫/訊號” w lekcji, egzaminie i terms-def; „第一個徵兆” l.poj. wobec „pierwsze sygnały”) — dwie poprawki ŚR w R4.json; oraz pytanie o „爆冷/被逆轉” (Do sprawdzenia).
- W tej części nie ma numerów telefonów, adresów pomocy ani nazw organizacji pomocowych.
