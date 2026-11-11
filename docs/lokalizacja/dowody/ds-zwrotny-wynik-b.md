# Wynik kontroli przekładem zwrotnym (wejście B)

Przekład zwrotny na polski, możliwie dosłowny; parametry i znaczniki bez zmian.

## ko

| język | klucz | zwrotny PL |
|---|---|---|
| ko | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|팟}}, duży to około {{duzy}}. Żeby przeciwnik zagrał {{t:call|콜}}, przeciwko małemu musi mieć szanse na wygraną {{cenaMaly}}, czyli musi wygrać mniej więcej raz na {{razMaly}}, a przeciwko dużemu {{cenaDuzy}}, czyli mniej więcej raz na {{razDuzy}}. |
| ko | numbers.sizeOpen | Gdy zagrasz {{t:raise|레이즈}} do {{bb}}bb, {{t:big-blind|빅 블라인드}} musi dołożyć jeszcze {{doplata}}bb do {{t:pot|팟}} wielkości {{pula}}bb (jeśli wszyscy pozostali {{t:fold|폴드}}ują). Dlatego potrzebna szansa na wygraną to {{cena}}, czyli trzeba wygrać mniej więcej raz na {{raz}}. |
| ko | numbers.size3bet | Gdy zagrasz 3-beta do {{bb}}bb, gracz, który zrobił {{t:open|오픈}}, musi dołożyć jeszcze {{doplata}}bb do {{t:pot|팟}} wielkości {{pula}}bb. Dlatego potrzebna szansa na wygraną to {{cena}}, czyli trzeba wygrać mniej więcej raz na {{raz}}. |
| ko | numbers.limp | Limp kosztuje {{kwota}}bb, a {{t:big-blind|빅 블라인드}} może zobaczyć flop, nie dopłacając nic więcej. |
| ko | numbers.icm | Moja ręka ma przeciwko {{t:range|레인지}} przeciwnika, który poszedł {{t:all-in|올인}}, {{t:equity|에퀴티}} {{equity}}, czyli wygrywa mniej więcej {{na10}} razy na 10. Według {{t:icm|ICM}} {{t:call|콜}} się opłaca od {{prog}}, a gdyby to była gra o {{t:chips|칩}}y, wystarczyłoby {{progZetony}}. Bo na {{t:bubble|버블}} udział w {{t:prize-pool|상금 풀}}, który się traci przy przegranej, jest większy niż ten, który przybywa przy wygranej. |
| ko | numbers.overcardsFold | Jeśli doliczysz też karty, które dają {{t:pair|페어}} wyższy niż jakakolwiek karta na {{t:board|보드}} (z {{nieznane}} niewidocznych kart {{nadkarty}}), prawdopodobieństwo trafienia wynosi {{trafiszRazem}}, co nadal nie dosięga prawdopodobieństwa wymaganego przez cenę ({{potrzeba}}). Taki {{t:pair|페어}} może też przegrać z mocniejszą ręką przeciwnika. |
| ko | numbers.overcardsCall | Karty, które dają {{t:pair|페어}} wyższy niż jakakolwiek karta na {{t:board|보드}} (z {{nieznane}} niewidocznych kart {{nadkarty}}), odejmuje się z obliczeń. Bo taki {{t:pair|페어}} może przegrać z mocniejszą ręką, a wystarczą już same outy dociągu. |
| ko | icm.tableLabel | {{t:board|테이블}}: ja jestem {{ty}}, karty to {{reka}}. Przeciwnik {{rywal}} (dosł.: „przeciwnik należący do {{rywal}}”) poszedł all-in. |
| ko | icm.foldedOne | Gracz, który zagrał {{t:fold|폴드}}: {{kto}}. |
| ko | icm.foldedMany | Gracze, którzy zagrali {{t:fold|폴드}}: {{kto}}. (w tekście: identyczne jak liczba pojedyncza: „Gracz/gracze, który zagrał fold: {{kto}}.”) |
| ko | icm.bubble | {{t:bubble|버블}}: z {{gracze}} graczy nagrody do miejsca {{platne}} |
| ko | icm.prizes | Nagrody: {{lista}} (proporcja do {{t:prize-pool|상금 풀}}). {{brak}} |
| ko | icm.place | {{n}} miejsce {{procent}} |
| ko | icm.noPrizeThird | 3. miejsce nie ma nagrody. |
| ko | icm.noPrizeFourth | 4. miejsce nie ma nagrody. |
| ko | icm.stacksLabel | Stack na początku rozdania |
| ko | icm.you | Ja, {{pozycja}} |
| ko | icm.rival | Przeciwnik, {{pozycja}} |
| ko | icm.rowLabel | {{kto}}, {{wartosc}} |
| ko | icm.wholeStack | {{kwota}} to cały mój stack. Jeśli przegram, odpadam z {{t:tournament|토너먼트}} bez nagrody. |
| ko | icm.rewards | Stacki i nagrody |

Uwagi (ko):
- icm.tableLabel: „{{rywal}}의 상대가” = „przeciwnik {{rywal}}” (dopełniacz/przynależność). Jeśli `rywal` to pozycja (np. BTN), po koreańsku brzmi to jak „przeciwnik pozycji BTN”, a naturalniej byłoby „{{rywal}}에 있는 상대” (przeciwnik na pozycji). Do sprawdzenia, co podstawia `rywal`.
- Znacznik `{{t:board|테이블}}` w tableLabel: forma widoczna to „stół”, a termin to „board”. Jeśli `board` to wspólne karty, podpowiedź terminu nie pasuje do słowa „stół” (dotyczy też pt, pt-BR, vi, zh-Hant).
- Terminologia: „승률” (procent wygranych) w cbet/sizeOpen/size3bet kontra „에퀴티” w icm i overcards. Ten sam termin „equity” ma dwa różne słowa, a „승률” nie obejmuje remisów.
- Zaimek: „내 핸드”, „내 스택” (mój), gdy pozostałe języki mówią „twoja/twój”. Spójność narracji (ja/ty) do rozstrzygnięcia.
- Partykuły zależne od wartości: „{{kwota}}는” w wholeStack i „{{bb}}bb로” — wybór 는/은 zależy od wymowy ostatniej cyfry/jednostki; przy parametrze liczbowym może wyjść niepoprawna partykuła.
- Zapis „{{bb}}bb” bez spacji, w pozostałych językach spacja przed „bb” (niespójność typograficzna, w koreańskim bez spacji jest dopuszczalne).
- numbers.limp: „bb가 들고” (dosł. „bb wchodzi/kosztuje”) brzmi nieco potocznie/nietypowo; naturalniej „bb를 내야 하고”.
- foldedOne i foldedMany są w tekście identyczne (po koreańsku bez liczby mnogiej, więc poprawnie, ale klucz many nie różni się niczym).
- icm.noPrize*: „지면 잃는 …” w icm: długa konstrukcja „udział, który się traci, gdy się przegrywa”, zrozumiała, ale ciężka.
- „아웃츠” (outy): w koreańskich materiałach częściej „아웃” (outs); „아웃츠” bywa spotykane, ale nie jest pewne.

## pt

| język | klucz | zwrotny PL |
|---|---|---|
| pt | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|pote}}, a duży około {{duzy}}. Żeby {{t:call|pagar}}, przeciwnik potrzebuje {{cenaMaly}} equity przeciwko małemu, czyli wygrać mniej więcej raz na {{razMaly}}, oraz {{cenaDuzy}} przeciwko dużemu, mniej więcej raz na {{razDuzy}}. |
| pt | numbers.sizeOpen | Przy {{t:raise|aumento}} do {{bb}} bb {{t:big-blind|big blind}} dokłada {{doplata}} bb do {{t:pot|pote}} wielkości {{pula}} bb (jeśli wszyscy pozostali {{t:fold|desistirem}}), dlatego potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| pt | numbers.size3bet | Przy 3-becie do {{bb}} bb ten, kto zrobił {{t:open|abertura}}, dokłada {{doplata}} bb do {{t:pot|pote}} wielkości {{pula}} bb, dlatego potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| pt | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|big blind}} może zobaczyć flop, nie płacąc więcej. |
| pt | numbers.icm | Pana/Pani ręka ma {{equity}} {{t:equity|equity}} przeciwko {{t:range|range}}, z którym przeciwnik pójdzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} rozdań na 10. Według {{t:icm|ICM}} {{t:call|pagar}} się opłaca od {{prog}}, podczas gdy w grze na {{t:chips|fichas}} wystarczyłoby {{progZetony}}: na {{t:bubble|bolha}} przegrana zabiera Panu/Pani więcej z {{t:prize-pool|bolsa de prémios}}, niż wygrana dodaje. |
| pt | numbers.overcardsFold | Jeśli policzy Pan/Pani także karty, które dają Panu/Pani {{t:pair|par}} wyższy niż jakakolwiek karta na {{t:board|mesa}} ({{nadkarty}} z {{nieznane}} niewidocznych), trafia Pan/Pani w {{trafiszRazem}} przypadków, wciąż rzadziej, niż wymaga cena ({{potrzeba}}). Taki {{t:pair|par}} może też przegrać z lepszą ręką przeciwnika. |
| pt | numbers.overcardsCall | Karty, które dają Panu/Pani {{t:pair|par}} wyższy niż jakakolwiek karta na {{t:board|mesa}} ({{nadkarty}} z {{nieznane}} niewidocznych), zostają poza rachunkiem: taki {{t:pair|par}} może przegrać z lepszą ręką, a outy Pańskiego/Pani dociągu wystarczają same w sobie. |
| pt | icm.tableLabel | {{t:board|Mesa}}: Pana/Pani miejsce to {{ty}}, karty {{reka}}. Przeciwnik na {{rywal}} idzie all-in. |
| pt | icm.foldedOne | {{kto}} {{t:fold|desistiu}}. |
| pt | icm.foldedMany | {{kto}} {{t:fold|desistiram}}. |
| pt | icm.bubble | {{t:bubble|Bolha}}: {{platne}} z {{gracze}} miejsc jest płatnych |
| pt | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|bolsa de prémios}}. {{brak}} |
| pt | icm.place | miejsce {{n}}: {{procent}} |
| pt | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| pt | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| pt | icm.stacksLabel | Stacki na początku rozdania |
| pt | icm.you | Ja, {{pozycja}} |
| pt | icm.rival | Przeciwnik, {{pozycja}} |
| pt | icm.rowLabel | {{kto}}, {{wartosc}} |
| pt | icm.wholeStack | {{kwota}} to cały Pana/Pani stack: jeśli przegra, wypada Pan/Pani z {{t:tournament|torneio}} bez nagrody. |
| pt | icm.rewards | Stacki i nagrody |

Uwagi (pt):
- Forma grzecznościowa „o seu/lhe/fica” (trzecia osoba, odpowiednik Pan/Pani) jest w pt-PT poprawna, ale daje dystans; w pozostałych miejscach („Eu, …”, „Adversário, …”) forma jest neutralna. Do decyzji, czy styl ma być spójny.
- numbers.icm: „num jogo a fichas” brzmi nienaturalnie (sugeruje „cash game” albo „grę na żetony”); naturalniej „num jogo de fichas” / „num torneio sem prémios”. Do potwierdzenia, że chodzi o „grę, w której liczą się same żetony (chipEV)”.
- numbers.icm: „perder tira-lhe mais … do que ganhar lhe acrescenta” — druga część zdania z enklityką po „do que” jest rejestrowo ciężka, ale zrozumiała; logika (strata > zysk) poprawna.
- icm.tableLabel: czas teraźniejszy „vai all-in” (przeciwnik „idzie/pójdzie”), w ko/zh czas przeszły. Niejednoznaczne, czy all-in już się stał (powinien się stać).
- icm.tableLabel: „o seu lugar é {{ty}}” — „lugar” (miejsce) zamiast „pozycja” (position); jeśli `ty` to pozycja przy stole, ok, ale „lugar” może się mylić z miejscem w turnieju (icm.place też „lugar”).
- icm.bubble: „platne z gracze lugares” = „X z Y miejsc jest płatnych”; `gracze` to liczba graczy, a słowo to „miejsca”. Logicznie równoważne, ale zmiana pojęcia.
- „aumento” jako „raise” (zamiast „raise”/„subir”) i „desistir” jako „fold” — poprawne w terminologii pt, ale „aumento” w pokerze brzmi niezbyt typowo.
- Wielkość „bb” zapisana ze zwykłą spacją (w wejściu miała być nierozdzielająca U+00A0 według opisu; w pliku nie widać różnicy).
- foldedOne/foldedMany: „{{kto}} desistiu / desistiram” — poprawna liczba, ale wersja „many” zakłada, że `kto` jest listą; „desistiram” OK.

## pt-BR

| język | klucz | zwrotny PL |
|---|---|---|
| pt-BR | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|pote}}, a duży około {{duzy}}. Żeby {{t:call|pagar}}, przeciwnik potrzebuje {{cenaMaly}} equity przeciwko małemu, czyli wygrać mniej więcej raz na {{razMaly}}, oraz {{cenaDuzy}} przeciwko dużemu, mniej więcej raz na {{razDuzy}}. |
| pt-BR | numbers.sizeOpen | Przy {{t:raise|aumento}} do {{bb}} bb {{t:big-blind|big blind}} dopłaca jeszcze {{doplata}} bb do {{t:pot|pote}} wielkości {{pula}} bb (jeśli wszyscy pozostali {{t:fold|desistirem}}), więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| pt-BR | numbers.size3bet | Przy 3-becie do {{bb}} bb ten, kto zrobił {{t:open|abertura}}, dopłaca jeszcze {{doplata}} bb do {{t:pot|pote}} wielkości {{pula}} bb, więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej raz na {{raz}}. |
| pt-BR | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|big blind}} może zobaczyć flop, nie płacąc więcej. |
| pt-BR | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|equity}} przeciwko {{t:range|range}}, z którym przeciwnik pójdzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} rozdań na 10. Według {{t:icm|ICM}} {{t:call|pagar}} się opłaca od {{prog}}, podczas gdy w grze o {{t:chips|fichas}} wystarczyłoby {{progZetony}}: na {{t:bubble|bolha}} przegrana zabiera ci więcej z {{t:prize-pool|premiação}}, niż wygrana dodaje. |
| pt-BR | numbers.overcardsFold | Jeśli policzysz też karty, które dają {{t:pair|par}} wyższy niż jakakolwiek karta na {{t:board|mesa}} ({{nadkarty}} z {{nieznane}} niewidocznych), trafiasz w {{trafiszRazem}} przypadków, wciąż rzadziej, niż wymaga cena ({{potrzeba}}). Taki {{t:pair|par}} może też przegrać z lepszą ręką przeciwnika. |
| pt-BR | numbers.overcardsCall | Karty, które dają {{t:pair|par}} wyższy niż jakakolwiek karta na {{t:board|mesa}} ({{nadkarty}} z {{nieznane}} niewidocznych), zostają poza rachunkiem: taki {{t:pair|par}} może przegrać z lepszą ręką, a outy twojego dociągu wystarczają same w sobie. |
| pt-BR | icm.tableLabel | {{t:board|Mesa}}: ty na {{ty}}, karty {{reka}}. Przeciwnik na {{rywal}} idzie all-in. |
| pt-BR | icm.foldedOne | {{kto}} {{t:fold|desistiu}}. |
| pt-BR | icm.foldedMany | {{kto}} {{t:fold|desistiram}}. |
| pt-BR | icm.bubble | {{t:bubble|Bolha}}: {{platne}} z {{gracze}} pozycji jest płatnych |
| pt-BR | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|premiação}}. {{brak}} |
| pt-BR | icm.place | {{n}}. miejsce: {{procent}} |
| pt-BR | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| pt-BR | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| pt-BR | icm.stacksLabel | Stacki na początku rozdania |
| pt-BR | icm.you | Ty, {{pozycja}} |
| pt-BR | icm.rival | Przeciwnik, {{pozycja}} |
| pt-BR | icm.rowLabel | {{kto}}, {{wartosc}} |
| pt-BR | icm.wholeStack | {{kwota}} to cały twój stack: jeśli przegrasz, wypadasz z {{t:tournament|torneio}} bez nagrody. |
| pt-BR | icm.rewards | Stacki i nagrody |

Uwagi (pt-BR):
- icm.tableLabel: „você no {{ty}}” i „O adversário no {{rywal}}” — przedimek „no” (= em + o) zakłada rodzaj męski nazwy pozycji. Dla „botão”, „cutoff”, „big blind” OK, ale przy parametrach w innym rodzaju (np. „UTG+1”, „posição”) wyjdzie błąd („no” vs „na”). Wersja pt używa neutralnego „em”.
- icm.you: „Você, {{pozycja}}” jako etykieta wiersza brzmi mniej naturalnie niż „Eu” w pt; w tabeli lepsze byłoby „Você”, ok, ale spójność ze zdaniami „você no …” jest dobra.
- icm.bubble: „posições” vs `gracze` (liczba graczy); zamiana pojęcia graczy na pozycje.
- numbers.icm: „num jogo por fichas” brzmi nienaturalnie; „perder tira de você mais da premiação do que ganhar acrescenta” — logika OK, składnia ciężka, „da premiação” (z puli) zrozumiałe.
- „paga mais {{doplata}} bb” (dopłaca jeszcze X bb) — dobre; „paga” użyte dla „call” i „dopłaty” (zbieżne z termin `call` = „pagar”), dopuszczalne.
- Wersja „vai all-in” w czasie teraźniejszym/przyszłym (niejasne, czy all-in już się stał).
- Tekst numbers.cbet identyczny z pt, w porządku; „equity” jako zapożyczenie (w BR często „equity”/„chance de vitória”, ok).
- icm.wholeStack: „você sai do torneio sem prêmio” — OK; „sem prêmio” (bez nagrody) zgodne z noPrize*.

## vi

| język | klucz | zwrotny PL |
|---|---|---|
| vi | numbers.cbet | Mały {{t:c-bet}} to około {{maly}} {{t:pot|pot}}, a duży około {{duzy}}. Żeby {{t:call|theo}}, przeciwnik potrzebuje {{cenaMaly}} equity wobec małego, czyli wygrać mniej więcej 1 raz na {{razMaly}}, oraz {{cenaDuzy}} wobec dużego, mniej więcej 1 raz na {{razDuzy}}. |
| vi | numbers.sizeOpen | Gdy {{t:raise|tố}} do {{bb}} bb, {{t:big-blind|big blind}} musi dopłacić jeszcze {{doplata}} bb do {{t:pot|pot}} {{pula}} bb (jeśli wszyscy pozostali {{t:fold|bỏ bài}}), więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej 1 raz na {{raz}}. |
| vi | numbers.size3bet | Gdy 3-bet do {{bb}} bb, osoba, która {{t:open|mở cược}}, musi dopłacić jeszcze {{doplata}} bb do {{t:pot|pot}} {{pula}} bb, więc potrzebuje {{cena}} equity, czyli wygrać mniej więcej 1 raz na {{raz}}. |
| vi | numbers.limp | Limp kosztuje {{kwota}} bb, a {{t:big-blind|big blind}} może zobaczyć flop, nie płacąc więcej. |
| vi | numbers.icm | Twoja ręka ma {{equity}} {{t:equity|equity}} wobec {{t:range|range}}, z którym przeciwnik idzie {{t:all-in|all-in}}, czyli wygrywa mniej więcej {{na10}} na 10 partii. Według {{t:icm}} {{t:call|theo}} się opłaca od {{prog}}, a w grze liczonej w {{t:chips|chip}}ach wystarczy {{progZetony}}: na {{t:bubble|bubble}} przegrana zabiera ci więcej z {{t:prize-pool|tổng giải thưởng}} w porównaniu z tym, co daje wygrana. |
| vi | numbers.overcardsFold | Jeśli policzysz też te karty, które dają ci {{t:pair|đôi}} wyższą niż każda karta na {{t:board|board}} ({{nadkarty}} na {{nieznane}} niewidocznych kart), trafiasz w {{trafiszRazem}} przypadków, wciąż mniej niż wymaga cena ({{potrzeba}}). {{t:pair|Đôi}} takie może też przegrać z mocniejszą ręką przeciwnika. |
| vi | numbers.overcardsCall | Te karty, które dają ci {{t:pair|đôi}} wyższą niż każda karta na {{t:board|board}} ({{nadkarty}} na {{nieznane}} niewidocznych kart), nie wchodzą do rachunku: {{t:pair|đôi}} taka może przegrać z mocniejszą ręką, a outy dociągu już wystarczają. |
| vi | icm.tableLabel | {{t:board|Bàn}}: ty jesteś na {{ty}}, karty {{reka}}. Przeciwnik na {{rywal}} właśnie idzie all-in. |
| vi | icm.foldedOne | {{kto}} już {{t:fold|bỏ bài}}. |
| vi | icm.foldedMany | {{kto}} już {{t:fold|bỏ bài}}. |
| vi | icm.bubble | {{t:bubble|Bubble}}: nagrody dla {{platne}} z {{gracze}} pozycji |
| vi | icm.prizes | Nagrody: {{lista}} {{t:prize-pool|tổng giải thưởng}}. {{brak}} |
| vi | icm.place | miejsce {{n}}: {{procent}} |
| vi | icm.noPrizeThird | Trzecie miejsce nic nie dostaje. |
| vi | icm.noPrizeFourth | Czwarte miejsce nic nie dostaje. |
| vi | icm.stacksLabel | Stack na początku partii |
| vi | icm.you | Ty, {{pozycja}} |
| vi | icm.rival | Przeciwnik, {{pozycja}} |
| vi | icm.rowLabel | {{kto}}, {{wartosc}} |
| vi | icm.wholeStack | {{kwota}} to cały twój stack: jeśli przegrasz, odpadasz z {{t:tournament|giải đấu}} bez nagrody. |
| vi | icm.rewards | Stack i nagrody |

Uwagi (vi):
- numbers.icm: „thua lấy đi của bạn nhiều tổng giải thưởng hơn so với phần thắng mang lại” — sens zrozumiały, ale zdanie jest długie i lekko kalkowane z polskiego/angielskiego („zabiera ci więcej z puli … w porównaniu z tym, co daje wygrana”); naturalniej „thua mất nhiều hơn thắng được”.
- icm.tableLabel: „đang all-in” (aspekt trwały, „właśnie idzie”), w ko/zh czas przeszły. Niejednoznaczne, czy all-in już się stał.
- icm.foldedOne/foldedMany: „đã” oznacza czas przeszły; identyczne jak liczba pojedyncza (w wietnamskim brak liczby mnogiej, więc poprawnie).
- icm.bubble: „trả thưởng cho {{platne}} trên {{gracze}} vị trí” — `gracze` (gracze) jako „vị trí” (pozycje/miejsca); zmiana pojęcia, a „vị trí” w pokerze to także „position” (pozycja przy stole), co koliduje z `pozycja`. Zalecane „hạng”.
- numbers.cbet: „trước loại nhỏ” (dosł. „przed małym”) — „trước” znaczy też „wcześniej/przed”, więc „przeciwko/wobec” jest wyrażone nieoczywiście; naturalniej „khi đối mặt với”.
- numbers.limp: „Limp tốn {{kwota}} bb” (kosztuje) — OK.
- „bù thêm” (dopełnić/uzupełnić) dla „dołożyć do puli” jest nieco potoczne, zrozumiałe; „call” oddane jako „theo”, a „bù thêm” dla dopłaty (inne słowo niż call).
- Znacznik `{{t:icm}}` bez formy jest dla `{{t:c-bet}}` zgodny z innymi językami; w zdaniu „Theo {{t:icm}}” OK.
- „outs” i „draw” pozostawione po angielsku w zdaniu (brak wietnamskiego odpowiednika), akceptowalne w środowisku graczy.
- icm.stacksLabel: „Stack đầu ván” — „ván” to partia/runda; w pokerze „ván” często oznacza rozdanie, ok.

## zh-Hant

| język | klucz | zwrotny PL |
|---|---|---|
| zh-Hant | numbers.cbet | Mały {{t:c-bet}} to około {{t:pot|底池}} {{maly}}, duży około {{duzy}}. Żeby {{t:call|跟注}}, przeciwnik wobec małego potrzebuje {{cenaMaly}} szans na wygraną, czyli mniej więcej raz na {{razMaly}} razy wygrywa 1 raz; wobec dużego potrzebuje {{cenaDuzy}}, mniej więcej raz na {{razDuzy}} razy wygrywa 1 raz. |
| zh-Hant | numbers.sizeOpen | Gdy {{t:raise|加注}} do {{bb}} bb, {{t:big-blind|大盲}} musi jeszcze dołożyć {{doplata}} bb do {{t:pot|底池}} wielkości {{pula}} bb (jeśli wszyscy pozostali {{t:fold|棄牌}}), więc potrzebuje {{cena}} szans na wygraną, czyli mniej więcej raz na {{raz}} razy wygrywa 1 raz. |
| zh-Hant | numbers.size3bet | Gdy 3-bet do {{bb}} bb, ten, kto {{t:open|開池}}, musi jeszcze dołożyć {{doplata}} bb do {{t:pot|底池}} wielkości {{pula}} bb, więc potrzebuje {{cena}} szans na wygraną, czyli mniej więcej raz na {{raz}} razy wygrywa 1 raz. |
| zh-Hant | numbers.limp | Wejście „na cichą” (溜入) kosztuje {{kwota}} bb, a {{t:big-blind|大盲}} nie musi dokładać pieniędzy, żeby zobaczyć flop. |
| zh-Hant | numbers.icm | Twoja ręka wobec {{t:range|範圍}}, z którym przeciwnik idzie {{t:all-in|全下}}, ma {{equity}} {{t:equity|權益}}, czyli na 10 rąk wygrywa mniej więcej {{na10}}. Według {{t:icm}} {{t:call|跟注}} opłaca się dopiero od {{prog}}; jeśli to gra liczona w {{t:chips|籌碼}}, {{progZetony}} wystarczy: na {{t:bubble|泡沫}} udział w {{t:prize-pool|獎金池}}, który tracisz przegrywając, jest większy niż ten, który zyskujesz wygrywając. |
| zh-Hant | numbers.overcardsFold | Jeśli doliczysz też karty, które pozwalają ci złożyć {{t:pair|對子}} wyższy niż jakakolwiek karta na {{t:board|牌面}} (z {{nieznane}} niewidocznych {{nadkarty}}), w {{trafiszRazem}} przypadków złożysz układ, wciąż poniżej wymaganych przez cenę {{potrzeba}}. Taki {{t:pair|對子}} może też przegrać z mocniejszą kartą przeciwnika. |
| zh-Hant | numbers.overcardsCall | Karty, które pozwalają ci złożyć {{t:pair|對子}} wyższy niż jakakolwiek karta na {{t:board|牌面}} (z {{nieznane}} niewidocznych {{nadkarty}}), nie wchodzą do rachunku: taki {{t:pair|對子}} może przegrać z mocniejszą kartą, a liczba dociągowych outów sama już wystarcza. |
| zh-Hant | icm.tableLabel | {{t:board|牌桌}}: ty jesteś na {{ty}}, ręka {{reka}}. Przeciwnik {{rywal}} (dosł. „przeciwnik należący do {{rywal}}”) poszedł all-in. |
| zh-Hant | icm.foldedOne | {{kto}} już {{t:fold|棄牌}}. |
| zh-Hant | icm.foldedMany | {{kto}} już {{t:fold|棄牌}}. |
| zh-Hant | icm.bubble | {{t:bubble|泡沫}}: wśród {{gracze}} graczy pierwsze {{platne}} miejsc ma nagrody |
| zh-Hant | icm.prizes | Nagrody: {{lista}} (udział w {{t:prize-pool|獎金池}}). {{brak}} |
| zh-Hant | icm.place | miejsce {{n}} {{procent}} |
| zh-Hant | icm.noPrizeThird | Miejsce 3 nie ma nagrody. |
| zh-Hant | icm.noPrizeFourth | Miejsce 4 nie ma nagrody. |
| zh-Hant | icm.stacksLabel | Ilość żetonów na początku rozdania |
| zh-Hant | icm.you | Ty, {{pozycja}} |
| zh-Hant | icm.rival | Przeciwnik, {{pozycja}} |
| zh-Hant | icm.rowLabel | {{kto}}, {{wartosc}} |
| zh-Hant | icm.wholeStack | {{kwota}} to wszystkie twoje żetony: przegrasz i tracisz prawo gry w {{t:tournament|錦標賽}}, bez nagrody. |
| zh-Hant | icm.rewards | Ilość żetonów i nagrody |

Uwagi (zh-Hant):
- Terminologia: „勝率” (szansa/procent wygranych) w cbet/sizeOpen/size3bet kontra „權益” (equity) w icm. To dwa różne pojęcia (win rate nie obejmuje remisów), a w treści liczą się jako ta sama wielkość; do ujednolicenia.
- numbers.cbet: „每 N 次贏 1 次” OK; `razMaly` w liczbie, ale składnia „co N razy wygrywa 1 raz” jest poprawna.
- icm.tableLabel: „{{rywal}} 的對手” = „przeciwnik {{rywal}}” (przynależność), jak w ko; jeśli `rywal` jest pozycją, brzmi to jak „przeciwnik pozycji”, niejasne. Naturalniej „在 {{rywal}} 的對手”.
- icm.stacksLabel/rewards: „籌碼量” (ilość żetonów) dla „stack”: spójne, ale „stack” w ICM bywa odbierany jako „ilość żetonów”, w porządku.
- numbers.limp: „溜入” jako limp jest rzadko spotykane w tajwańskiej terminologii pokerowej (częściej „平跟”, „跛入” albo po prostu „limp”); gracz może nie zrozumieć.
- numbers.icm: „輸掉損失的獎金池份額” (przegrana traci utracony udział) — nadmiarowe, brzmi sztucznie, sens poprawny.
- numbers.overcardsFold: „成牌” (złożyć układ) bez wskazania „par”; i „仍然低於價格所要求的 {{potrzeba}}” — ok, ale „你會在 X 的情況中成牌” sugeruje trafienie w dowolny układ, a nie w wyższy par.
- icm.prizes: „占” zamiast „佔”: w zapisie tradycyjnym na Tajwanie częściej „佔”; „占” spotykane, ale dla tradycyjnego pisma niezalecane.
- icm.foldedOne/foldedMany: identyczne (brak liczby w chińskim), poprawnie, klucz many bez różnicy.
- icm.tableLabel: czas przeszły „全下了” (już poszedł all-in), w pt/vi czas teraźniejszy.
- Stosowanie „泡沫” jako „bubble” jest akceptowalne, ale w wielu materiałach pozostaje „bubble”/„泡沫圈”; do sprawdzenia, czy gracz zrozumie.
- Spacje wokół parametrów `{{...}}` przy cyfrach (np. „ {{maly}} ”) są stosowane niekonsekwentnie względem znacznika terminu (np. „的 {{maly}}”, ale „{{t:pot|底池}}的 {{maly}}”): typograficznie dopuszczalne, ale przy renderze liczb mogą wyglądać nierówno.
