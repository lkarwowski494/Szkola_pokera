# Wynik kontroli przekładem zwrotnym (wejście A)

Przekład możliwie dosłowny; parametry `{{...}}` i znaczniki `{{t:...}}` zachowane bez zmian (także forma po kresce pionowej).

## de

| język | klucz | zwrotny PL |
|---|---|---|
| de | numbers.cbet | Mały {{t:c-bet}} wynosi około {{maly}} {{t:pot|Pots}}, duży około {{duzy}}. Żeby {{t:call|callen}}, twój przeciwnik potrzebuje przeciwko małemu {{cenaMaly}} equity, czyli wygrywać mniej więcej co {{razMaly}}. raz, a przeciwko dużemu {{cenaDuzy}}, czyli mniej więcej co {{razDuzy}}. raz. |
| de | numbers.sizeOpen | Przy {{t:raise|Raise}} do {{bb}} bb {{t:big-blind|Big Blind}} dopłaca {{doplata}} bb do {{t:pot|Pot}} wynoszącego {{pula}} bb (jeśli wszyscy pozostali {{t:fold|folden}}), potrzebuje więc {{cena}} equity, czyli mniej więcej co {{raz}}. raz wygrywać. |
| de | numbers.size3bet | Przy 3-becie do {{bb}} bb otwierający ({{t:open|Eröffner}}) dopłaca {{doplata}} bb do {{t:pot|Pot}} wynoszącego {{pula}} bb, potrzebuje więc {{cena}} equity, czyli mniej więcej co {{raz}}. raz wygrywać. |
| de | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|Big Blind}} może zobaczyć flop, nic nie dopłacając. |
| de | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|Equity}} przeciwko {{t:range|Range}}, z którym twój przeciwnik idzie {{t:all-in|All-in}}, czyli wygrywa mniej więcej {{na10}} na 10 rąk. Według {{t:icm|ICM}} {{t:call|Call}} się opłaca od {{prog}}, w grze o {{t:chips|Chips}} wystarczyłoby {{progZetony}}: na {{t:bubble|Bubble}} porażka zabiera ci więcej z {{t:prize-pool|Preispool}}, niż zwycięstwo dodaje. |
| de | numbers.overcardsFold | Jeśli liczysz także karty, które dają ci {{t:pair|Paar}} wyższą niż każda karta na {{t:board|Board}} ({{nadkarty}} z {{nieznane}} nieznanych), trafiasz w {{trafiszRazem}} przypadków, czyli wciąż rzadziej, niż wymaga cena ({{potrzeba}}). Taka {{t:pair|Paar}} może poza tym przegrać z mocniejszą ręką przeciwnika. |
| de | numbers.overcardsCall | Karty, które dają ci {{t:pair|Paar}} wyższą niż każda karta na {{t:board|Board}} ({{nadkarty}} z {{nieznane}} nieznanych), zostają poza rachunkiem: taka {{t:pair|Paar}} może przegrać z mocniejszą ręką, a outy twojego drawa same wystarczają. |
| de | icm.tableLabel | {{t:board|Tisch}}: ty na {{ty}}, karty {{reka}}. Twój przeciwnik na {{rywal}} jest all-in. |
| de | icm.foldedOne | {{kto}} spasował ({{t:fold|gefoldet}}). |
| de | icm.foldedMany | {{kto}} spasowali ({{t:fold|gefoldet}}). |
| de | icm.bubble | {{t:bubble|Bubble}}: płatnych jest {{platne}} z {{gracze}} miejsc |
| de | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|Preispools}}. {{brak}} |
| de | icm.place | Miejsce {{n}}: {{procent}} |
| de | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| de | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| de | icm.stacksLabel | Stacki na początku rozdania |
| de | icm.you | Ty, {{pozycja}} |
| de | icm.rival | Przeciwnik, {{pozycja}} |
| de | icm.rowLabel | {{kto}}, {{wartosc}} |
| de | icm.wholeStack | {{kwota}} to cały twój stack: jeśli przegrasz, odpadasz z {{t:tournament|Turnier}} bez nagrody. |
| de | icm.rewards | Stacki i nagrody |

Uwagi (de):
- Znacznik `{{t:board|Tisch}}` w `icm.tableLabel` oznacza „stół”, ale wskazuje termin `board` (wspólne karty); podpowiedź terminu będzie błędna (pasuje „table”/brak znacznika).
- Porządkowa kropka w „jedes {{razMaly}}. Mal”, „{{raz}}. Mal” działa tylko dla liczby całkowitej; przy wartości ułamkowej (np. „2,5. Mal”) zdanie jest błędne.
- `icm.foldedMany`/`foldedOne`: poprawne, ale „gefoldet” zamiast „gepasst” to żargon, naturalny dla graczy; bez zastrzeżeń.
- `icm.bubble`: „von {{gracze}} Plätzen” — liczba graczy podana jako liczba miejsc; poprawne tylko jeśli miejsc = graczy (do potwierdzenia w polskim źródle).
- Reszta logiki (kto komu dopłaca, próg ICM wyższy niż próg żetonowy, zmiana „więcej traci niż zyskuje”) czytelna i spójna.

## es

| język | klucz | zwrotny PL |
|---|---|---|
| es | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|bote}}, a duży około {{duzy}}. Żeby {{t:call|wyrównać}}, twój rywal potrzebuje {{cenaMaly}} equity przeciwko małemu, czyli wygrać jeden raz na {{razMaly}}, a {{cenaDuzy}} przeciwko dużemu, jeden raz na {{razDuzy}}. |
| es | numbers.sizeOpen | Przy {{t:raise|podbiciu}} do {{bb}} bb {{t:big-blind|duży blind}} dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb (jeśli reszta {{t:fold|pasuje}}), więc potrzebuje {{cena}} equity, czyli wygrać jeden raz na {{raz}}. |
| es | numbers.size3bet | Przy 3-becie do {{bb}} bb ten, kto zrobił {{t:open|otwarcie}}, dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb, więc potrzebuje {{cena}} equity, czyli wygrać jeden raz na {{raz}}. |
| es | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|duży blind}} może zobaczyć flop bez dopłacania. |
| es | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|equity}} przeciwko {{t:range|zakresowi}}, z którym twój rywal idzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} na 10 rąk. Według {{t:icm|ICM}} {{t:call|wyrównanie}} się opłaca od {{prog}}, podczas gdy w grze o {{t:chips|żetony}} wystarczyłoby {{progZetony}}: na {{t:bubble|bańce}} przegrana zabiera ci więcej z {{t:prize-pool|puli nagród}}, niż wygrana ci dodaje. |
| es | numbers.overcardsFold | Jeśli liczysz także karty, które dają ci {{t:pair|parę}} wyższą niż jakakolwiek karta na {{t:board|stole}} ({{nadkarty}} z {{nieznane}}, których nie widzisz), trafiasz w {{trafiszRazem}} przypadków, czyli wciąż mniej, niż wymaga cena ({{potrzeba}}). Taka {{t:pair|para}} może też przegrać z lepszą ręką rywala. |
| es | numbers.overcardsCall | Karty, które dają ci {{t:pair|parę}} wyższą niż jakakolwiek karta na {{t:board|stole}} ({{nadkarty}} z {{nieznane}}, których nie widzisz), zostają poza rachunkiem: taka {{t:pair|para}} może przegrać z lepszą ręką, a outy twojego projektu same wystarczają. |
| es | icm.tableLabel | {{t:board|Stół}}: ty na {{ty}}, karty {{reka}}. Twój rywal na {{rywal}} idzie all-in. |
| es | icm.foldedOne | {{kto}} {{t:fold|spasował}}. |
| es | icm.foldedMany | {{kto}} {{t:fold|spasowali}}. |
| es | icm.bubble | {{t:bubble|Bańka}}: płatnych jest {{platne}} miejsc z {{gracze}} |
| es | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|puli nagród}}. {{brak}} |
| es | icm.place | miejsce {{n}}: {{procent}} |
| es | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| es | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| es | icm.stacksLabel | Stacki na początku rozdania |
| es | icm.you | Ty, {{pozycja}} |
| es | icm.rival | Rywal, {{pozycja}} |
| es | icm.rowLabel | {{kto}}, {{wartosc}} |
| es | icm.wholeStack | {{kwota}} to cały twój stack: jeśli przegrasz, odpadasz z {{t:tournament|turnieju}} bez nagrody. |
| es | icm.rewards | Stacki i nagrody |

Uwagi (es):
- `icm.tableLabel`: znacznik `{{t:board|Mesa}}` dla „stołu” wskazuje termin `board` (wspólne karty), choć w pozostałych zdaniach „mesa” = board; dwuznaczność słowa „mesa” (stół/board) i błędna podpowiedź terminu.
- `icm.place`: „puesto” zaczyna się małą literą (może być zamierzone, jeśli to element listy po przecinku, inaczej niespójne z de/it/fr-wielka litera nie jest wymagana, ale warto sprawdzić kontekst).
- „un c-bet” (rodzaj męski) — w hiszpańskim spotyka się też „una c-bet”; do ujednolicenia z resztą słownika.
- „igualar” dla call jest poprawne, ale część graczy mówi „pagar”/„call”; „proyecto” dla draw naturalne.
- „aciertas en el {{trafiszRazem}} de los casos” — „el” przed wartością procentową OK, przy ułamku („1 z 3”) byłoby błędne.
- Reszta logiki spójna (kto komu dopłaca, progi).

## fr

| język | klucz | zwrotny PL |
|---|---|---|
| fr | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|puli}}, duży około {{duzy}}. Żeby {{t:call|pójść za}}, twój przeciwnik potrzebuje {{cenaMaly}} equity przeciwko małemu, czyli wygrać mniej więcej raz na {{razMaly}}, oraz {{cenaDuzy}} przeciwko dużemu, czyli mniej więcej raz na {{razDuzy}}. |
| fr | numbers.sizeOpen | Przy {{t:raise|podbiciu}} do {{bb}} bb {{t:big-blind|duży blind}} dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb (jeśli wszyscy pozostali {{t:fold|się układają}}), potrzeba mu więc {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| fr | numbers.size3bet | Przy 3-becie do {{bb}} bb gracz, który zrobił {{t:open|otwarcie}}, dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb, potrzeba mu więc {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| fr | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|duży blind}} może zobaczyć flop bez płacenia więcej. |
| fr | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|equity}} przeciwko {{t:range|rangeowi}}, z którym twój przeciwnik idzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} rąk na 10. Według {{t:icm|ICM}} {{t:call|pójście za}} opłaca się od {{prog}}, podczas gdy w grze o {{t:chips|żetony}} wystarczyłoby {{progZetony}}: w {{t:bubble|bańce}} przegrana zabiera ci więcej z {{t:prize-pool|prize pool}}, niż wygrana ci przynosi. |
| fr | numbers.overcardsFold | Jeśli liczysz także karty, które dają ci {{t:pair|parę}} wyższą niż wszystkie karty na {{t:board|board}} ({{nadkarty}} z {{nieznane}} niewidzianych), trafiasz w {{trafiszRazem}} przypadków, czyli wciąż rzadziej, niż wymaga cena ({{potrzeba}}). Taka {{t:pair|para}} może też przegrać z lepszą ręką przeciwnika. |
| fr | numbers.overcardsCall | Karty, które dają ci {{t:pair|parę}} wyższą niż wszystkie karty na {{t:board|board}} ({{nadkarty}} z {{nieznane}} niewidzianych), są pominięte w rachunku: taka {{t:pair|para}} może przegrać z lepszą ręką, a outy twojego drawa same wystarczają. |
| fr | icm.tableLabel | {{t:board|Stół}}: ty na {{ty}}, karty {{reka}}. Twój przeciwnik na {{rywal}} idzie all-in. |
| fr | icm.foldedOne | {{kto}} {{t:fold|się ułożył}}. |
| fr | icm.foldedMany | {{kto}} {{t:fold|się ułożyli}}. |
| fr | icm.bubble | {{t:bubble|Bańka}}: płatnych jest {{platne}} miejsc na {{gracze}} |
| fr | icm.prizes | Wygrane: {{lista}} {{t:prize-pool|prize pool}}. {{brak}} |
| fr | icm.place | miejsce {{n}}: {{procent}} |
| fr | icm.noPrizeThird | Trzecie miejsce nic nie wygrywa. |
| fr | icm.noPrizeFourth | Czwarte miejsce nic nie wygrywa. |
| fr | icm.stacksLabel | Stacki na początku rozdania |
| fr | icm.you | Ty, {{pozycja}} |
| fr | icm.rival | Przeciwnik, {{pozycja}} |
| fr | icm.rowLabel | {{kto}}, {{wartosc}} |
| fr | icm.wholeStack | {{kwota}} odpowiada całemu twojemu stackowi: w razie porażki odpadasz z {{t:tournament|turnieju}} bez wygranej. |
| fr | icm.rewards | Stacki i wygrane |

Uwagi (fr):
- `icm.tableLabel`: `{{t:board|Table}}` dla „stołu” wskazuje termin `board` (wspólne karty); błędna podpowiedź terminu.
- `numbers.limp`: „sans payer de plus” jest nienaturalne; poprawnie „sans payer plus” / „sans rien payer de plus”.
- `numbers.icm`: „dans la bulle” — graczom bardziej naturalne „à la bulle”/„sur la bulle”; „dans la bulle” brzmi doslownie.
- `icm.foldedMany`: „se sont couchés” w rodzaju męskim (kto może być żeński/mieszany); drobne.
- „Gains” (wygrane) dla płatności za miejsca OK, ale w `icm.rewards`/`prizes` „gains” a w `noPrize*` „ne gagne rien” — spójne; „prize pool” zostawione po angielsku, w de/es/it przetłumaczone (niespójność między językami, nie błąd).
- `icm.place` małą literą jak w es.
- „il lui faut {{cena}} d'équité” oraz „{{equity}} d'équité” poprawne gramatycznie.

## it

| język | klucz | zwrotny PL |
|---|---|---|
| it | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|puli}}, duży około {{duzy}}. Żeby {{t:call|sprawdzić}}, twój przeciwnik potrzebuje {{cenaMaly}} equity przeciwko małemu, czyli wygrać mniej więcej raz na {{razMaly}}, oraz {{cenaDuzy}} przeciwko dużemu, mniej więcej raz na {{razDuzy}}. |
| it | numbers.sizeOpen | Przy {{t:raise|podbiciu}} do {{bb}} bb {{t:big-blind|big blind}} dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb (jeśli wszyscy pozostali {{t:fold|foldują}}), więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| it | numbers.size3bet | Przy 3-becie do {{bb}} bb ten, kto zrobił {{t:open|otwarcie}}, dokłada {{doplata}} bb do {{t:pot|puli}} wynoszącej {{pula}} bb, więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| it | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|big blind}} może zobaczyć flop bez dopłacania. |
| it | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|equity}} przeciwko {{t:range|rangeowi}}, z którym twój przeciwnik idzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} rąk na 10. Według {{t:icm|ICM}} {{t:call|sprawdzenie}} opłaca się od {{prog}}, podczas gdy w grze o {{t:chips|żetony}} wystarczyłoby {{progZetony}}: na {{t:bubble|bańce}} przegrana zabiera ci większą część {{t:prize-pool|puli nagród}} niż ta, którą wygrana ci dodaje. |
| it | numbers.overcardsFold | Jeśli liczysz także karty, które dają ci {{t:pair|parę}} wyższą od każdej karty na {{t:board|board}} ({{nadkarty}} z {{nieznane}} niewidzianych), trafiasz w {{trafiszRazem}} przypadków, i tak rzadziej, niż wymaga cena ({{potrzeba}}). Taka {{t:pair|para}} może też przegrać z lepszą ręką przeciwnika. |
| it | numbers.overcardsCall | Karty, które dają ci {{t:pair|parę}} wyższą od każdej karty na {{t:board|board}} ({{nadkarty}} z {{nieznane}} niewidzianych), zostają poza rachunkiem: taka {{t:pair|para}} może przegrać z lepszą ręką, a outy twojego projektu same wystarczają. |
| it | icm.tableLabel | {{t:board|Stół}}: ty na {{ty}}, karty {{reka}}. Twój przeciwnik na {{rywal}} idzie all-in. |
| it | icm.foldedOne | {{kto}} {{t:fold|sfoldował}}. |
| it | icm.foldedMany | {{kto}} {{t:fold|sfoldowali}}. |
| it | icm.bubble | {{t:bubble|Bańka}}: płatnych jest {{platne}} miejsc na {{gracze}} |
| it | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|puli nagród}}. {{brak}} |
| it | icm.place | {{n}}. miejsce: {{procent}} |
| it | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| it | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| it | icm.stacksLabel | Stacki na początku rozdania |
| it | icm.you | Ty, {{pozycja}} |
| it | icm.rival | Przeciwnik, {{pozycja}} |
| it | icm.rowLabel | {{kto}}, {{wartosc}} |
| it | icm.wholeStack | {{kwota}} to cały twój stack: jeśli przegrasz, odpadasz z {{t:tournament|turnieju}} bez nagrody. |
| it | icm.rewards | Stacki i nagrody |

Uwagi (it):
- `icm.tableLabel`: `{{t:board|Tavolo}}` dla „stołu” wskazuje termin `board`; błędna podpowiedź terminu.
- Rodzajnik „il” przed parametrem procentowym (`il {{maly}}`, `il {{cenaMaly}}`, `il {{equity}}`, `dal {{prog}}`, `il {{progZetony}}`, `nel {{trafiszRazem}}`) jest poprawny tylko dla wartości typu „33%”; dla wartości słownych/ułamkowych („1/3” przechodzi, „jedna trzecia” nie) i dla liczb zaczynających się od „8”/„11” (włoskie „l'8%”, „l'11%”) rodzajnik byłby błędny („il 8%” → „l'8%”, „dall'11%”). Realne ryzyko dla wartości 8%, 11%, 18%, 80–89%.
- `numbers.icm`: „ha il {{equity}} di equity” — powtórzenie słowa (procent + equity) brzmi ciężko, ale poprawne.
- „colpisci” (trafiasz) i „progetto” (draw) naturalne dla włoskich graczy; „foldano/ha foldato” żargon akceptowalny.
- `icm.place`: „{{n}}º posto” poprawne (liczebnik porządkowy z kropką w polskim zwrocie wsteczny jest tylko konwencją mojego przekładu).
- Logika dopłat i progów spójna.

## ja

| język | klucz | zwrotny PL |
|---|---|---|
| ja | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|ポット}}, duży to około {{duzy}}. Żeby przeciwnik mógł {{t:call|コール}}, przy małym potrzebuje {{cenaMaly}} szans na wygraną (win rate), czyli musi wygrać mniej więcej raz na {{razMaly}}, a przy dużym {{cenaDuzy}}, mniej więcej raz na {{razDuzy}}. |
| ja | numbers.sizeOpen | Przy {{t:raise|レイズ}} do {{bb}}bb {{t:big-blind|ビッグブラインド}} dopłaca dodatkowo {{doplata}}bb do {{t:pot|ポット}} wynoszącego {{pula}}bb (jeśli wszyscy pozostali {{t:fold|フォールド}}). Wymagana szansa na wygraną to {{cena}}, czyli wystarczy, że wygra mniej więcej raz na {{raz}}. |
| ja | numbers.size3bet | Przy 3-becie do {{bb}}bb strona, która zrobiła {{t:open|オープン}}, dopłaca dodatkowo {{doplata}}bb do {{t:pot|ポット}} wynoszącego {{pula}}bb. Wymagana szansa na wygraną to {{cena}}, czyli wystarczy, że wygra mniej więcej raz na {{raz}}. |
| ja | numbers.limp | Limp kosztuje {{kwota}}bb, a {{t:big-blind|ビッグブラインド}} może zobaczyć flop bez dodatkowej płatności. |
| ja | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|エクイティ}} przeciwko {{t:range|レンジ}} przeciwnika, który poszedł {{t:all-in|オールイン}}, i wygrywa mniej więcej {{na10}} razy na 10. Według {{t:icm}} {{t:call|コール}} jest opłacalny od {{prog}}, a w grze o {{t:chips|チップ}} wystarczyłoby {{progZetony}}. Dzieje się tak dlatego, że na {{t:bubble|バブル}} część {{t:prize-pool|プライズプール}}, którą tracisz przegrywając, jest większa niż ta, którą zyskujesz wygrywając. |
| ja | numbers.overcardsFold | Jeśli policzysz także karty dające {{t:pair|ペア}} wyższą niż jakakolwiek karta na {{t:board|ボード}} ({{nadkarty}} z {{nieznane}} niewidocznych), trafiasz w {{trafiszRazem}}, co wciąż nie dochodzi do prawdopodobieństwa, jakiego wymaga cena ({{potrzeba}}). Taka {{t:pair|ペア}} może też przegrać z mocniejszą ręką przeciwnika. |
| ja | numbers.overcardsCall | Karty dające {{t:pair|ペア}} wyższą niż jakakolwiek karta na {{t:board|ボード}} ({{nadkarty}} z {{nieznane}} niewidocznych) nie są wliczone do rachunku. Taka {{t:pair|ペア}} może przegrać z mocniejszą ręką, a same outy drawa wystarczają. |
| ja | icm.tableLabel | {{t:board|テーブル}}: ty na {{ty}}, karty to {{reka}}. Przeciwnik na {{rywal}} jest all-in. |
| ja | icm.foldedOne | {{kto}} {{t:fold|フォールド}}ował(-a/-o). |
| ja | icm.foldedMany | {{kto}} {{t:fold|フォールド}}ował(-i). |
| ja | icm.bubble | {{t:bubble|バブル}}: nagrody są do {{platne}}. miejsca spośród {{gracze}} osób |
| ja | icm.prizes | Nagrody: {{lista}} (udział w {{t:prize-pool|プライズプール}}). {{brak}} |
| ja | icm.place | {{n}}. miejsce {{procent}} |
| ja | icm.noPrizeThird | 3. miejsce jest bez nagrody. |
| ja | icm.noPrizeFourth | 4. miejsce jest bez nagrody. |
| ja | icm.stacksLabel | Stacki na początku rozdania |
| ja | icm.you | Ty, {{pozycja}} |
| ja | icm.rival | Przeciwnik, {{pozycja}} |
| ja | icm.rowLabel | {{kto}}, {{wartosc}} |
| ja | icm.wholeStack | {{kwota}} to cały twój stack. Jeśli przegrasz, odpadasz z {{t:tournament|トーナメント}} bez nagrody. |
| ja | icm.rewards | Stacki i nagrody |

Uwagi (ja):
- `icm.tableLabel`: `{{t:board|テーブル}}` dla „stołu” wskazuje termin `board` (wspólne karty, które po japońsku to ボード); błędna podpowiedź terminu.
- `numbers.overcardsFold`: „価格が求める確率” (prawdopodobieństwo, jakiego wymaga „cena”) — „価格” (cena rynkowa) nie jest terminem pokerowym dla pot odds; graczom bliższe „ポットオッズ”. Nienaturalne.
- `numbers.overcardsFold`: „当たるのは{{trafiszRazem}}で” — brak „確率”/„割合”; zdanie opiera się na tym, że parametr zawiera wartość z jednostką (np. „27%”); inaczej niejasne.
- `numbers.icm`: zdanie z `{{t:icm}}` bez formy po kresce: forma musi być zdefiniowana w słowniku terminu, inaczej wyświetli się klucz; w pozostałych językach wszędzie jest forma. Dodatkowo „{{t:icm}}では” nie zawiera słowa ICM jeśli forma pusta.
- `icm.foldedOne` i `icm.foldedMany` mają identyczny tekst (japoński nie rozróżnia liczby), więc rozróżnienie kluczy jest nadmiarowe, ale nie błędne.
- `icm.bubble`: „{{gracze}}人中{{platne}}位まで賞金あり” — liczba „osób” vs liczba „miejsc” (w de/es/fr/it „miejsc”); poprawne tylko gdy miejsc = graczy.
- `icm.place`: „{{n}}位 {{procent}}” bez dwukropka/separatora; przy wielu pozycjach w liście może być mało czytelne.
- „リンプ”, „3ベット”, „エクイティ”, „レンジ”, „アウツ” — w pełni naturalne dla graczy; „必要な勝率” dla equity wymaganego przez pot odds jest zrozumiałe.
