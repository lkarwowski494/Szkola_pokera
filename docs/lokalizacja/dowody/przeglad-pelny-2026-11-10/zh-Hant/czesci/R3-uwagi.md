# zh-Hant · R3 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| `content/zh-Hant/rules.yaml`, linie 643–952 (R-M8-001…R-M10-015) | Tak: wszystkie linie fragmentu w pl i w przekładzie, pole po polu | Dodatkowo porównanie mechaniczne linia w linię: klucze `{{t:…}}`/`{{n:…}}`, pola `id`/`module`/`level`/`sources`, adresy URL, liczby poza znacznikami; skan znaków uproszczonych (brak). `en` otwarte pomocniczo tylko dla linii 662, 686, 778, 784, 801. Przeczytano też `content/zh-Hant/terms-nazwy.yaml`. Glosariusza `docs/lokalizacja/glosariusz.md` nie otwierałem (terminy sprawdzane wg `terms-nazwy.yaml`). |

Wynik porównania mechanicznego: klucze YAML, `id`, `module`, `level`, `sources`, adresy URL i cytaty angielskie identyczne z pl; wszystkie `{{n:…}}` zgodne co do klucza i liczby wystąpień; `{{t:…}}` zgodne poza dwoma brakami (linie 794 i 801, poprawki w JSON). Różnice liczb poza znacznikami to wyłącznie zapis dat (5.10.2026 → 2026年10月5日) i separator dziesiętny (9,1 → 9.1; 1,96 → 1.96). Komentarze `#` (linie 740–741, 823–826, 952) zostały po polsku w obu plikach — nie są wyświetlane, bez zgłoszenia.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | poza częścią: `content/zh-Hant/rules.yaml:570`, `lessons/m9-l2-zaangazowanie.md:110`, `lessons/m9-l3-rozmiar-geometryczny.md:129`, `lessons/m9-l4-plan-trzech-ulic.md:53`, `lessons/m7-l2-polaryzacja.md:46,117`, `exams/m7.yaml:47` | Ten sam wzorzec co w poprawkach 778 i 784: „do rivera” (włącznie) oddane jako „在河牌前” („przed riverem”). Miejsca spoza R3, tylko wskazane przez grep, nieczytane w kontekście. | Do oceny przez recenzentów tych części; ujednolicić z „到河牌為止”. |

## Do ujednolicenia skryptem
Brak (żaden wzorzec w tej części nie przekracza ok. 10 miejsc).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- „set” → „暗三” (linie 801, 817; w całej treści 43×), podczas gdy `terms-nazwy.yaml` ma `set: "三條"` (tak samo jak three-of-a-kind). „暗三” jest precyzyjniejsze (para w ręce); pl używa tu „set” bez znacznika. Nie zmieniałem; do rozstrzygnięcia, która nazwa obowiązuje.
- „kicker” → „踢腳” (linia 801; w treści 60×) przy `kicker: null` w `terms-nazwy` (nazwa angielska). Nie zmieniałem.
- „bluff-catcher” → „抓詐唬牌” (linie 673, 717, 725, 734; w treści 37×) przy `bluff-catcher: null`. W linii 717 jest dopisek „（抓詐唬牌，bluff-catcher）”, co wiąże obie nazwy. Nie zmieniałem.
- „stack” → „籌碼” w całym fragmencie przy `stack: null`; „籌碼” to także `chips`. W kontekście zrozumiałe („全部籌碼”, „身後的籌碼”), nie zmieniałem.
- „c-bet” zostaje po angielsku w liniach 904–906 (w rules 39×), choć `terms-nazwy` ma `c-bet: "持續下注"`; pl nie używa tu znacznika. Spójne w obrębie rules.yaml, nie zmieniałem.
- Linia 694: `{{t:board|牌面}}` zamiast nazwy „公共牌” — forma „牌面” jest częsta w treści (41×) i naturalna w „牌面上有三張同花色”; nie zmieniałem.
- Linia 662: „z pozycji” oddane jako „擁有位置” (zgodnie z en „with position”); polskie sformułowanie jest dwuznaczne, przekład zgodny z en.
- Linia 846: końcowe człony „3-bet 約 … 手後，面對 3-bet 的棄牌率（fold to 3-bet）約 … 手後” bez powtórzonego „穩定” — elipsa zrozumiała, ale rodzimy użytkownik może woleć dopisać „才穩定”.
- Linia 904/906: „面對 c-bet 棄牌率” i „面對 3-bet 的棄牌率” — nazwa statystyki raz z „的”, raz bez; drobiazg stylu.

## Pytania do źródła pl
- Linia 662 (pl): „przy ryzyku check-raise'u z pozycji” — niejasne, czy „z pozycji” odnosi się do betującego (en: „with position”), czy do check-raise'u; warto doprecyzować w pl.
- Linia 784 (pl): „równymi zakładami” — z then wynika, że chodzi o równy ułamek puli, nie równe kwoty; przekład (i słusznie) mówi „相同比例的下注”.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Nie dotyczy: fragment obejmuje R-M8…R-M10; linia 952 to tylko komentarz otwierający M12.
