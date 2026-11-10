# Przekład zwrotny ko → pl (wykonany przed otwarciem content/pl i content/en)

Znaczniki `{{n:…}}`/`{{t:…}}` zachowane dosłownie.

## 1. content/ko/lessons/m12-l1-wariancja.md

- title (w5): „Wariancja w liczbach”; sub (w6): „Co mówią wyniki z tysięcy rąk”.

### Ćwiczenia
- n-expected prompt (w13): „Średni winrate wynosi {{n:var.wr.ex}} i zagrasz {{n:var.hands.k}}k rąk. Ile wpisowego (po {{n:format.stack}} każde) wynosi oczekiwany wynik? Wpisz liczbę.”
- n-expected explanation (w15): „{{n:var.hands.k}}k rąk to {{n:var.blocks}} bloków po 100 rąk. Oczekiwany wynik = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. To średnia. Rzeczywisty wynik może się od średniej mocno odchylić.”
- q-sd-result prompt (w20): „Odchylenie standardowe gry wynosi {{n:var.sd}}. Ile wynosi odchylenie standardowe wyniku po {{n:var.hands.k}}k rąk ({{n:var.blocks}} bloków po 100 rąk)?”
  - (poprawna) „ok. {{n:var.sd.result.bi}} wpisowych” — „Odchylenie rośnie proporcjonalnie do pierwiastka z liczby bloków: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych.”
  - „ok. {{n:var.sd.wrong.bi}} wpisowych” — „Tyle wychodzi, gdy pomnożysz odchylenie przez liczbę bloków. Losowe wahania częściowo się znoszą, więc mnożymy przez pierwiastek: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}.”
  - „ok. {{n:var.exp.bi}} wpisowych” — „To oczekiwany wynik przy winrate {{n:var.wr.ex}}, a nie jego odchylenie. Odchylenie to ok. {{n:var.sd.result.bi}} wpisowych.”
- q-ci95 prompt (w29): „Winrate {{n:var.wr.ex}}, odchylenie {{n:var.sd}}. W jakim przedziale z ufnością ok. {{n:var.conf95}} znajdzie się wynik po {{n:var.hands.k}}k rąk?”
  - (poprawna) „od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}} wpisowych” — „Oczekiwany wynik {{n:var.exp.bi}} wpisowych ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Nawet wyraźnie wygrywający gracz może po {{n:var.hands.k}}k rąk być prawie na zero.”
  - „od ok. {{n:var.ci68.low.bi}} do ok. {{n:var.ci68.high.bi}}” — „To przedział jednego odchylenia; obejmuje tylko ok. 2 z 3 wyników. Dla {{n:var.conf95}} stosuje się {{n:var.z95}} odchylenia: od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}}.”
  - „dokładnie {{n:var.exp.bi}} wpisowych” — „To tylko średnia. Wynik waha się wokół niej o dziesiątki wpisowych w górę i w dół.”
- n-se prompt (w38): „Po {{n:var.hands.k}}k rąk ({{n:var.blocks}} bloków) przy odchyleniu {{n:var.sd}} ile wynosi błąd standardowy winrate w bb/100? Licz √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Wpisz liczbę.” explanation (w40): „Błąd standardowy = SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Przedział {{n:var.conf95}} to ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}.”
- q-winrate-ci prompt (w45): „Po {{n:var.hands.k}}k rąk wynik {{n:var.wr.ex}}, odchylenie {{n:var.sd}}. Co wiadomo o prawdziwym winrate?”
  - (poprawna) „Z ufnością ok. {{n:var.conf95}} leży między ok. {{n:var.wr.ci.low}} a ok. {{n:var.wr.ci.high}}” — „{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Po {{n:var.hands.k}}k rąk wiadomo tylko, że zapewne nie przegrywasz.”
  - „Wynosi {{n:var.wr.ex}}, bo próba jest duża” — „{{n:var.hands.k}}k rąk wydaje się dużo, ale przy odchyleniu {{n:var.sd}} błąd wciąż wynosi ok. ± {{n:var.ci.wr}}.”
  - „Nic nie wiadomo, wynik w pokerze to czysty los” — „Przesada. Próba zawęża przedział, ale powoli: błąd maleje z pierwiastkiem z liczby rąk.”
- q-hands-needed prompt (w54): „Chcesz znać winrate z dokładnością ± {{n:var.target}} przy ufności {{n:var.conf95}}. Odchylenie {{n:var.sd}}. Ile rąk potrzeba?”
  - (poprawna) „ok. {{n:var.need.hands.k}}k” — „Bloki = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}, czyli ok. {{n:var.need.hands.k}}k rąk.”
  - „ok. {{n:var.hands.k}}k” — „Po {{n:var.hands.k}}k rąk błąd to ok. ± {{n:var.ci.wr}}. Żeby zejść do ± {{n:var.target}}, potrzeba ok. {{n:var.need.hands.k}}k rąk.”
  - „ok. {{n:var.need.blocks}} rąk” — „To liczba bloków po 100 rąk. Rąk jest 100 razy więcej, ok. {{n:var.need.hands.k}}k.”
- q-dd-100k prompt (w63): „Gracz z winrate {{n:var.wr.ex}}, odchylenie {{n:var.sd}}. Jak często w ciągu {{n:var.hands.k}}k rąk przeżywa spadek od szczytu o {{n:dd.bi.small}} lub więcej wpisowych?”
  - (poprawna) „Prawie zawsze, ok. {{n:dd.p.small.100k}}” — „W symulacji {{n:var.hands.k}}k rąk przy tych parametrach taki spadek pojawia się w ok. {{n:dd.p.small.100k}} przebiegów. Spadek rzędu {{n:dd.bi.small}} wpisowych to normalna część gry wygrywającego gracza.”
  - „W ok. {{n:dd.p.small.20k}} przypadków” — „To wartość dla krótszej próby {{n:dd.hands.short.k}}k rąk. Na {{n:var.hands.k}}k rąk jest dużo więcej okazji do głębokiego spadku: ok. {{n:dd.p.small.100k}}.”
  - „Rzadko, ok. {{n:var.p.lose}}” — „To rzadkie prawdopodobieństwo, że gracz z winrate {{n:var.wr.ex}} skończy {{n:var.hands.k}}k rąk na minusie. Spadek po drodze to inna sprawa, zdarza się prawie zawsze.”
- q-dd-wr-low prompt (w72): „Dwaj gracze, odchylenie {{n:var.sd}}, {{n:var.hands.k}}k rąk. Jeden wygrywa {{n:var.wr.ex}}, drugi {{n:dd.wr-low}}. Jak często każdy z nich przeżyje spadek rzędu {{n:dd.bi.big}} wpisowych?”
  - (poprawna) „Pierwszy w ok. {{n:dd.p.big.100k}}, drugi w ok. {{n:dd.p.big.100k.wr-low}} przypadków” — „Przy niższym winrate słabsza siła ciągnie wynik w górę, więc spadki są głębsze i częstsze. Przy {{n:dd.wr-low}}, typowym dla wygrywających na mikrostawkach, spadek rzędu {{n:dd.bi.big}} wpisowych zdarza się w ponad połowie prób.”
  - „Obaj równie często, bo odchylenie jest to samo” — „Odchylenie wyznacza wahania, a winrate — jak szybko wynik się od nich oddala. Przy {{n:dd.wr-low}} spadek rzędu {{n:dd.bi.big}} wpisowych zdarza się w ok. {{n:dd.p.big.100k.wr-low}} prób, przy {{n:var.wr.ex}} w ok. {{n:dd.p.big.100k}}.”
  - „Żaden, spadek rzędu {{n:dd.bi.big}} wpisowych zdarza się tylko przegrywającym” — „Nieprawda. Gracz z winrate {{n:var.wr.ex}} też go przeżywa w ok. {{n:dd.p.big.100k}} prób po {{n:var.hands.k}}k rąk.”
- q-dd-meaning prompt (w81): „Od miesiąca jesteś {{n:dd.bi.small}} wpisowych na minusie. Co to oznacza?”
  - (poprawna) „Sam spadek niczego nie przesądza; przejrzyj decyzje z przegranych rąk” — „Spadek rzędu {{n:dd.bi.small}} wpisowych w ciągu {{n:var.hands.k}}k rąk spotyka prawie każdego gracza wygrywającego {{n:dd.wr-low}}–{{n:var.wr.ex}} (symulacja SD {{n:var.sd}}). O tym, czy grasz dobrze, mówi przegląd decyzji, a nie sam wynik.”
  - „Grasz źle, trzeba zmienić cały styl” — „Spadek tej wielkości zdarza się także wygrywającemu {{n:var.wr.ex}} (SD {{n:var.sd}}) w ok. {{n:dd.p.small.100k}} prób po {{n:var.hands.k}}k rąk. Zmiana stylu na podstawie samego wyniku to reagowanie na szum.”
  - „Na pewno pech, więc nie trzeba przeglądać” — „Spadek może wynikać też z błędów. Wynik nie odróżni pecha od błędu, przegląd rąk tak.”
- q-sd-typical prompt (w90): „Jakie jest typowe odchylenie standardowe w grze cash 6-max NLH?”
  - (poprawna) „ok. {{n:var.sd.low}}–{{n:var.sd.high}}” — „Tak podają kalkulatory wariancji. Jako typową wartość najczęściej przyjmuje się ok. {{n:var.sd}}. Agresywny styl daje wyższe odchylenie.”
  - „ok. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}” — „To typowy winrate wygrywającego na mikrostawkach. Odchylenie jest kilkadziesiąt razy większe od winrate, dlatego wynik tak się waha.”
  - „ok. {{n:var.sd.result.bi}} wpisowych na 100 rąk” — „To odchylenie wyniku po {{n:var.hands.k}}k rąk, a nie na 100 rąk.”

### Treść
- w96: Wynik w pokerze to suma dwóch rzeczy: jak dobrze grasz i szczęścia. Oba składniki da się zmierzyć. Winrate mówi, ile średnio wygrywasz, a odchylenie standardowe — jak mocno wynik waha się wokół tej średniej.
- w98 nagłówek: „Dwie liczby w bb/100”.
- w100: Winrate to średni zysk na 100 rąk w big blindach. Wygrywający na mikrostawkach mają zwykle {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.
- w102: Odchylenie standardowe (SD) to typowy rozrzut wyniku na 100 rąk. W cash 6-max zwykle {{n:var.sd.low}}–{{n:var.sd.high}}, jako typową wartość przyjmuje się {{n:var.sd}}. Ponieważ odchylenie jest kilkadziesiąt razy większe od winrate, wynik jednej sesji, a nawet miesiąca mówi bardzo mało.
- w104 nagłówek: „Wynik po wielu rękach”. w106: Liczbę rąk dzielisz przez 100 i masz liczbę bloków.
- wzory (w109–111): oczekiwany wynik = winrate × liczba bloków; odchylenie wyniku = SD × √(liczba bloków); przedział {{n:var.conf95}} = oczekiwany wynik ± {{n:var.z95}} × odchylenie wyniku.
- w114: Przykład: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}}k rąk, czyli {{n:var.blocks}} bloków. Oczekiwany wynik {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. Odchylenie wyniku {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych. Z ufnością {{n:var.conf95}} wynik będzie między ok. **{{n:var.ci.low.bi}} a {{n:var.ci.high.bi}} wpisowych**. Oczekiwany wynik leży ok. {{n:var.z.lose}} odchylenia powyżej zera, więc prawdopodobieństwo minusa po {{n:var.hands.k}}k rąk to ok. {{n:var.p.lose}}.
- w116 nagłówek: „Ile rąk, żeby poznać winrate”. w118: Ten sam rachunek można odwrócić. Błąd oszacowania winrate maleje z pierwiastkiem z liczby rąk.
- wzory (w121–122): błąd winrate = SD ÷ √(liczba bloków); potrzebna liczba bloków = ({{n:var.z95}} × SD ÷ dokładność)².
- w125: Po {{n:var.hands.k}}k rąk błąd to ok. {{n:var.se.wr}}, więc przedział {{n:var.conf95}} to ± {{n:var.ci.wr}}. Wynik {{n:var.wr.ex}} oznacza wtedy tylko, że prawdziwy winrate jest gdzieś między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}. Żeby znać winrate z dokładnością ± {{n:var.target}}, potrzeba ok. **{{n:var.need.hands.k}}k rąk**.
- w127 nagłówek: „Spadki są normalne”. w129: Spadek to obniżenie wyniku od szczytu. Symulacja gracza z winrate {{n:var.wr.ex}}, SD {{n:var.sd}}:
- tabela (w131–134): kolumny: spadek od szczytu | {{n:dd.hands.short.k}}k rąk | {{n:var.hands.k}}k rąk | {{n:var.hands.k}}k rąk przy {{n:dd.wr-low}}; wiersz {{n:dd.bi.small}} wpisowych: {{n:dd.p.small.20k}} | {{n:dd.p.small.100k}} | {{n:dd.p.small.100k.wr-low}}; wiersz {{n:dd.bi.big}} wpisowych: — | {{n:dd.p.big.100k}} | {{n:dd.p.big.100k.wr-low}}.
- ramka (w136–137) „Skąd te liczby”: Wynik symulacji. Wynik każdego bloku losowany, tysiące przebiegów po {{n:var.hands.k}}k rąk. W rzeczywistości wynik zmienia się co rękę, a nie co 100 rąk, więc prawdziwe spadki mogą być nieco głębsze. Wniosek: spadek rzędu {{n:dd.bi.small}} wpisowych nie jest dowodem, że grasz źle.
- w140: To ogólna wskazówka i nie gwarantuje wyników. Jeśli trudno ci kontrolować grę, zajrzyj do ekranu „Pomoc”.

## 2. Reguły R-M12-* (content/ko/rules.yaml)

- R-M12-001 if: Gdy oceniasz swój wynik lub winrate na podstawie próby rąk. then: Policz przedział: winrate ± {{n:var.z95}} × SD ÷ √(liczba rąk ÷ 100). because: Przy SD {{n:var.sd}} nawet po {{n:var.hands.k}},000 rąk przedział {{n:var.conf95}} wynosi ok. ± {{n:var.ci.wr}}, więc wynik {{n:var.wr.ex}} znaczy tylko „mniej więcej między {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}”.
- R-M12-002 if: Gdy wpadasz w spadek {{n:dd.bi.small}} wpisowych. then: Nie traktuj go jako dowodu złej gry; przejrzyj decyzje z przegranych rąk. because: W ciągu {{n:var.hands.k}},000 rąk taki spadek od szczytu przeżywa ok. {{n:dd.p.small.100k}} graczy wygrywających {{n:var.wr.ex}} (SD {{n:var.sd}}).
- R-M12-003 if: Gdy chcesz wiedzieć, ile naprawdę wygrywasz. then: Zbierz setki tysięcy rąk: dla dokładności ± {{n:var.target}} przy ufności {{n:var.conf95}} potrzeba ok. {{n:var.need.hands.k}},000 rąk. because: Błąd oszacowania maleje z pierwiastkiem z liczby rąk: potrzebna liczba bloków po 100 rąk = ({{n:var.z95}} × SD ÷ dokładność)².
- R-M12-004 if: Gdy oceniasz swoją grę po zakończeniu ręki. then: Oceniaj decyzję (cena, equity, informacje, które wtedy miałeś), a nie to, czy wygrałeś. because: Dobre decyzje często przegrywają: all-in AA przeciw KK przegrywa w ok. {{n:res.kk-wins}} przypadków, a ludzie oceniają decyzje po wyniku, choć wiedzą, że nie powinni.
- R-M12-005 if: Gdy po wynikach kilku sesji chcesz zmienić strategię. then: Nie zmieniaj na podstawie samego wyniku; zmieniaj dopiero po przeglądzie rąk. because: Nawet żeby górne {{n:skill.pct}} graczy wyprzedzało dolne {{n:skill.pct}} z prawdopodobieństwem ok. {{n:skill.ahead}}, potrzeba ok. {{n:skill.hands}} rąk, a przy mniejszej różnicy umiejętności dużo więcej.
- R-M12-006 if: Gdy zauważysz pierwszy sygnał tiltu ze swojego profilu (np. złość po bad beacie, chęć ukarania rywala). then: Reaguj od razu: weź głęboki oddech i przywołaj przygotowane zdanie, które przypomina, dlaczego to wariancja albo błąd, z którego trzeba się uczyć. because: Gdy tilt urośnie, przestajesz jasno myśleć i wtedy już nie da się go kontrolować.
- R-M12-007 if: Gdy po serii porażek nie potrafisz już spokojnie oceniać decyzji (np. myślisz tylko o odegraniu się albo grasz ręce, które normalnie byś spasował). then: Zakończ sesję. because: Granie dalej w tym stanie to granie na najniższym poziomie (gra C); celem jest skończyć wcześnie, zanim stracisz zdolność jasnego myślenia.
- R-M12-008 if: Gdy poprawiasz swoją grę. then: Zacznij od naprawy najgorszej gry (gra C), zamiast szlifować najlepszą. because: Poprawa najgorszej gry daje stały postęp i uwalnia uwagę na naukę nowych rzeczy.
- R-M12-009 if: Gdy liczysz ryzyko ruiny, czyli ryzyko utraty całego bankrollu. then: Użyj wzoru RoR = e^(−2 × winrate × bankroll ÷ SD²), bankroll w bb. To przybliżenie zakładające stały winrate i SD. because: Przy winrate {{n:var.wr.typical.high}}, SD {{n:var.sd}} bankroll {{n:br.bi.base}} wpisowych daje ryzyko ok. {{n:ror.base}}, a {{n:br.bi.move-down}} wpisowych już ok. {{n:ror.half}}.
- R-M12-011 if: Gdy bankroll spada do połowy planowanej liczby wpisowych (z {{n:br.bi.base}} do {{n:br.bi.move-down}}). then: Najpóźniej wtedy zejdź o jeden poziom stawek, a wróć najwcześniej, gdy bankroll będzie pełny według wpisowego wyższej stawki. because: Spadek {{n:dd.bi.small}} wpisowych w ciągu {{n:var.hands.k}},000 rąk zdarza się prawie każdemu graczowi wygrywającemu {{n:dd.wr-low}}–{{n:var.wr.ex}} (symulacja SD {{n:var.sd}}), a niektóre źródła zalecają schodzić już przy takiej stracie. Ponadto przy {{n:br.bi.move-down}} wpisowych ryzyko utraty reszty rośnie z ok. {{n:ror.base}} do ok. {{n:ror.half}} (winrate {{n:var.wr.typical.high}}, SD {{n:var.sd}}).
- R-M12-012 if: Gdy planujesz czas na poker. then: Na początku przeznacz ok. {{n:study.beginner}} czasu na naukę. Gdy zaczniesz wygrywać na swojej stawce, ok. {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}}. because: Na początku jest najwięcej do nadrobienia, a gdy wygrywasz na swojej stawce, możesz grać więcej.

## 3. Dodatkowe wiersze: content/ko/lessons/m12-l3-tilt.md

- w26 (opcja): „To nie tilt, tylko dostosowanie do agresywnego rywala” — „Dostosowanie to szersza obrona dobrze dobranymi rękami. «Dowolną ręką, żeby dać mu nauczkę» to emocja, nie strategia.”
- w60 (poprawna): „Reaguję teraz. Oddycham i przywołuję przygotowane zdanie, np. «To wariancja, graj dalej dobrze»” — „Tilt trzeba korygować, póki jest mały i możesz myśleć. Gdy urośnie, paraliżuje zdolność myślenia i staje się nie do opanowania.”
- w97 (opcja): „Patrzę na wyniki z zeszłego tygodnia” — „Wyniki z tygodnia to głównie wariancja (lekcja o wariancji). Jakość gry w najgorszy dzień mówi więcej.”
- w110 (tabela): „Awersja do porażki | sama przegrana, nawet gdy wiesz, że to wariancja”.
- w125: „2. Przygotowane zdanie odpowiadające na przyczynę, np. «Słabszy gracz też musi czasem wygrać. To wariancja. Graj dalej dobrze.»”
- w133: „Jeśli grasz dłużej niż planowałeś, próbujesz odzyskać przegrane pieniądze albo grasz pieniędzmi, których nie powinieneś stracić, przeczytaj wskazówki «Odpowiedzialna gra» w lekcji o bankrollu.”
