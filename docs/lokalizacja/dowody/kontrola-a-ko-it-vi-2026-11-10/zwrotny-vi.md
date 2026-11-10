# Przekład zwrotny vi → pl (wykonany przed otwarciem content/pl i content/en)

Znaczniki `{{n:…}}`/`{{t:…}}` zachowane dosłownie. „nghìn tay” = „tys. rąk”; „khối” = „blok”.

## 1. content/vi/lessons/m12-l1-wariancja.md

- title (w5): „Wariancja w liczbach”; sub (w6): „Ile mówi ci wynik z tysięcy rąk”.

### Ćwiczenia
- n-expected prompt (w13): „Wygrywasz średnio {{n:var.wr.ex}} i zagrasz {{n:var.hands.k}} tys. rąk. Ile wpisowych (każde po {{n:format.stack}}) wynosi twój oczekiwany wynik? Wpisz liczbę.” explanation (w15): „{{n:var.hands.k}} tys. rąk to {{n:var.blocks}} bloków po 100 rąk. Oczekiwany wynik = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. To średnia: rzeczywisty wynik może się od niej mocno odchylić.”
- q-sd-result prompt (w20): „Odchylenie standardowe twojej gry to {{n:var.sd}}. Ile wynosi odchylenie wyniku po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków po 100 rąk)?”
  - (poprawna) „ok. {{n:var.sd.result.bi}} wpisowych” — „Odchylenie rośnie z pierwiastkiem z liczby bloków: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych.”
  - „ok. {{n:var.sd.wrong.bi}}” — „To wynik mnożenia odchylenia przez liczbę bloków. Losowe wahania częściowo się znoszą, więc mnożysz przez pierwiastek: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}.”
  - „ok. {{n:var.exp.bi}}” — „To oczekiwany wynik przy {{n:var.wr.ex}}, nie jego odchylenie. Odchylenie to ok. {{n:var.sd.result.bi}} wpisowych.”
- q-ci95 prompt (w29): „Wygrywasz {{n:var.wr.ex}} przy odchyleniu {{n:var.sd}}. Z ufnością ok. {{n:var.conf95}} w jakim przedziale znajdzie się wynik po {{n:var.hands.k}} tys. rąk?”
  - (poprawna) „od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}} wpisowych” — „Oczekiwany wynik {{n:var.exp.bi}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Nawet wyraźnie wygrywający gracz może po {{n:var.hands.k}} tys. rąk być prawie na zero.”
  - „od ok. {{n:var.ci68.low.bi}} do ok. {{n:var.ci68.high.bi}}” — „To przedział jednego odchylenia: obejmuje tylko ok. 2 z 3 wyników. Dla {{n:var.conf95}} bierzesz {{n:var.z95}} odchylenia: od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}}.”
  - „dokładnie {{n:var.exp.bi}}” — „To tylko średnia. Wynik waha się wokół niej o kilkadziesiąt wpisowych w obie strony.”
- n-se prompt (w38): „Po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków) przy odchyleniu {{n:var.sd}}: ile wynosi błąd standardowy winrate w bb/100? Przyjmij √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Wpisz liczbę.” explanation (w40): „Błąd standardowy = SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Przedział {{n:var.conf95}} = ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}.”
- q-winrate-ci prompt (w45): „Po {{n:var.hands.k}} tys. rąk wynik {{n:var.wr.ex}}, odchylenie {{n:var.sd}}. Co wiesz o prawdziwym winrate?”
  - (poprawna) „Z ufnością ok. {{n:var.conf95}} leży między ok. {{n:var.wr.ci.low}} a ok. {{n:var.wr.ci.high}}” — „… ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Po {{n:var.hands.k}} tys. rąk wiesz tylko, że najpewniej nie przegrywasz.”
  - „Wynosi {{n:var.wr.ex}}, bo próba jest już duża” — „{{n:var.hands.k}} tys. rąk brzmi dużo, ale przy odchyleniu {{n:var.sd}} błąd to wciąż ok. ± {{n:var.ci.wr}}.”
  - „Nic nie wiadomo, wynik w pokerze to czyste szczęście” — „Przesada. Próba zawęża przedział, tylko powoli: błąd maleje z pierwiastkiem z liczby rąk.”
- q-hands-needed prompt (w54): „Chcesz znać winrate z dokładnością ± {{n:var.target}} przy ufności {{n:var.conf95}}. Odchylenie {{n:var.sd}}. Ile rąk potrzebujesz?”
  - (poprawna) „ok. {{n:var.need.hands.k}} tys.” — „Liczba bloków = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}, czyli ok. {{n:var.need.hands.k}} tys. rąk.”
  - „ok. {{n:var.hands.k}} tys.” — „Po {{n:var.hands.k}} tys. rąk błąd to ok. ± {{n:var.ci.wr}}. Aby zmniejszyć go do ± {{n:var.target}}, potrzebujesz ok. {{n:var.need.hands.k}} tys. rąk.”
  - „ok. {{n:var.need.blocks}} rąk” — „To liczba bloków po 100 rąk. Rąk jest sto razy więcej: ok. {{n:var.need.hands.k}} tys.”
- q-dd-100k prompt (w63): „Gracz wygrywa {{n:var.wr.ex}} przy odchyleniu {{n:var.sd}}. Jak często w ciągu {{n:var.hands.k}} tys. rąk przeżywa spadek co najmniej {{n:dd.bi.small}} wpisowych od najwyższego punktu?”
  - (poprawna) „Prawie zawsze, ok. {{n:dd.p.small.100k}}” — „Symulacja {{n:var.hands.k}} tys. rąk z tymi parametrami daje taki spadek w ok. {{n:dd.p.small.100k}} przebiegów. Spadek {{n:dd.bi.small}} wpisowych to normalna część gry wygrywającego.”
  - „w ok. {{n:dd.p.small.20k}} przypadków” — „To liczba dla krótszej próby, {{n:dd.hands.short.k}} tys. rąk. W {{n:var.hands.k}} tys. rąk szans na głęboki spadek jest dużo więcej: ok. {{n:dd.p.small.100k}}.”
  - „rzadko, ok. {{n:var.p.lose}}” — „To rzadka częstość, z jaką gracz {{n:var.wr.ex}} kończy {{n:var.hands.k}} tys. rąk na minusie. Spadek po drodze to inna sprawa: zdarza się prawie zawsze.”
- q-dd-wr-low prompt (w72): „Dwaj gracze, odchylenie {{n:var.sd}}, {{n:var.hands.k}} tys. rąk. Jeden wygrywa {{n:var.wr.ex}}, drugi {{n:dd.wr-low}}. Jak często każdy przeżywa spadek {{n:dd.bi.big}} wpisowych?”
  - (poprawna) „Pierwszy w ok. {{n:dd.p.big.100k}}, drugi w ok. {{n:dd.p.big.100k.wr-low}} przypadków” — „Niższy winrate słabiej ciągnie wynik w górę, więc spadki są głębsze i częstsze. Przy {{n:dd.wr-low}}, typowym dla wygrywających na mikrostawkach, spadek {{n:dd.bi.big}} wpisowych zdarza się w ponad połowie prób.”
  - „Obaj równie często, bo odchylenie to samo” — „Odchylenie decyduje o wahaniach, a winrate — jak szybko wynik się z nich wydostaje. Przy {{n:dd.wr-low}} spadek {{n:dd.bi.big}} wpisowych zdarza się w ok. {{n:dd.p.big.100k.wr-low}} prób, przy {{n:var.wr.ex}} w ok. {{n:dd.p.big.100k}}.”
  - „Żaden: taki spadek zdarza się tylko przegrywającym” — „Nieprawda. Nawet gracz {{n:var.wr.ex}} przeżywa go w ok. {{n:dd.p.big.100k}} prób po {{n:var.hands.k}} tys. rąk.”
- q-dd-meaning prompt (w81): „Od miesiąca jesteś {{n:dd.bi.small}} wpisowych na minusie. Co to pokazuje?”
  - (poprawna) „Sam spadek niczego nie dowodzi; przeglądasz decyzje w przegranych rękach” — „Spadek {{n:dd.bi.small}} wpisowych w {{n:var.hands.k}} tys. rąk spotyka prawie każdego gracza wygrywającego od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}). Czy grasz dobrze, pokazuje przegląd decyzji, a nie sam wynik.”
  - „Grasz źle i musisz zmienić cały styl” — „Spadek tej wielkości zdarza się graczowi wygrywającemu {{n:var.wr.ex}} (SD {{n:var.sd}}) w ok. {{n:dd.p.small.100k}} prób po {{n:var.hands.k}} tys. rąk. Zmiana stylu tylko z powodu wyniku to reakcja na szum.”
  - „Na pewno to tylko pech, nie trzeba nic przeglądać” — „Spadek może też wynikać z błędów. Wynik nie odróżnia pecha od błędu, przegląd rąk tak.”
- q-sd-typical prompt (w90): „Jakie odchylenie standardowe jest typowe dla cash game 6-max NLH?”
  - (poprawna) „ok. {{n:var.sd.low}}–{{n:var.sd.high}}” — „Tyle podają kalkulatory wariancji. Zwykle jako typową wartość przyjmuje się ok. {{n:var.sd}}. Agresywny styl daje wyższe odchylenie.”
  - „ok. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}” — „To typowy winrate wygrywającego na mikrostawkach. Odchylenie jest kilkadziesiąt razy większe od winrate, i dlatego wynik tak skacze.”
  - „ok. {{n:var.sd.result.bi}} wpisowych na 100 rąk” — „To odchylenie wyniku po {{n:var.hands.k}} tys. rąk, nie na 100 rąk.”

### Treść
- w96: Twój wynik w pokerze to suma dwóch czynników: jak dobrze grasz i szczęścia. Oba składniki da się zmierzyć. Winrate mówi, ile średnio wygrywasz, a odchylenie standardowe — jak mocno wynik skacze wokół tej średniej.
- w98: „Dwie liczby w bb/100”. w100: Winrate to średni zysk na 100 rąk w big blindach. Wygrywający na mikrostawkach mają zwykle {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.
- w102: Odchylenie standardowe (SD) to typowy rozrzut wyniku na 100 rąk. W cash 6-max zwykle {{n:var.sd.low}}–{{n:var.sd.high}}, a {{n:var.sd}} przyjmuje się jako typową wartość. Odchylenie jest kilkadziesiąt razy większe od winrate, więc wynik jednej sesji, a nawet całego miesiąca, mówi ci bardzo mało.
- w104: „Wynik po wielu rękach”. w106: Podziel liczbę rąk przez 100, dostaniesz liczbę bloków.
- wzory: oczekiwany wynik = winrate × liczba bloków; odchylenie wyniku = SD × √(liczba bloków); przedział {{n:var.conf95}} = oczekiwany wynik ± {{n:var.z95}} × odchylenie wyniku.
- w114: Przykład: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} tys. rąk, czyli {{n:var.blocks}} bloków. Oczekujesz {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. Odchylenie wyniku {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych. Z ufnością {{n:var.conf95}} skończysz między ok. **{{n:var.ci.low.bi}} a ok. {{n:var.ci.high.bi}} wpisowych**. Oczekiwany wynik leży ok. {{n:var.z.lose}} odchylenia nad zerem, więc szansa, że po {{n:var.hands.k}} tys. rąk będziesz na minusie, to ok. {{n:var.p.lose}}.
- w116: „Ile rąk potrzeba, żeby poznać winrate”. w118: Ten sam rachunek działa też w odwrotną stronę. Błąd oszacowania winrate maleje z pierwiastkiem z liczby rąk:
- wzory: błąd winrate = SD ÷ √(liczba bloków); potrzebna liczba bloków = ({{n:var.z95}} × SD ÷ dokładność)².
- w125: Po {{n:var.hands.k}} tys. rąk błąd to ok. {{n:var.se.wr}}, więc przedział {{n:var.conf95}} to ± {{n:var.ci.wr}}. Wtedy wynik {{n:var.wr.ex}} znaczy tylko, że prawdziwy winrate jest gdzieś między {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}. Żeby znać winrate z dokładnością ± {{n:var.target}}, potrzebujesz ok. **{{n:var.need.hands.k}} tys. rąk**.
- w127: „Spadki są normalne”. w129: Spadek to obniżenie wyniku liczone od najwyższego punktu. Symulacja gracza {{n:var.wr.ex}} z SD {{n:var.sd}}:
- tabela: kolumny: spadek od szczytu | w {{n:dd.hands.short.k}} tys. rąk | w {{n:var.hands.k}} tys. rąk | w {{n:var.hands.k}} tys. rąk przy {{n:dd.wr-low}}; wiersze small (20k/100k/100k.wr-low) i big (—/100k/100k.wr-low).
- ramka „Skąd te liczby”: Wyniki symulacji: tysiące przebiegów po {{n:var.hands.k}} tys. rąk, z losowym wynikiem dla każdego bloku. Prawdziwy spadek może być nieco głębszy, bo wynik zmienia się po każdym rozdaniu, a nie co 100 rąk. Wniosek: spadek {{n:dd.bi.small}} wpisowych nie dowodzi, że grasz źle.
- w140: To ogólne wskazówki, nie gwarancja wyniku. Jeśli gra zaczyna wymykać się spod kontroli, zajrzyj do ekranu „Pomoc”.

## 2. Reguły R-M12-* (content/vi/rules.yaml)

- R-M12-001 if: oceniasz wynik lub winrate na podstawie próby rąk. then: liczysz przedział: winrate ± {{n:var.z95}} × SD ÷ √(liczba rąk ÷ 100). because: przy SD {{n:var.sd}} nawet po {{n:var.hands.k}} tys. rąk przedział ufności {{n:var.conf95}} ma wciąż ok. ± {{n:var.ci.wr}}, więc wynik {{n:var.wr.ex}} znaczy tylko „mniej więcej od {{n:var.wr.ci.low}} do {{n:var.wr.ci.high}}”.
- R-M12-002 if: wpadasz w spadek {{n:dd.bi.small}} wpisowych. then: nie uznajesz tego za dowód słabej gry, tylko przeglądasz decyzje w przegranych rękach. because: w {{n:var.hands.k}} tys. rąk taki spadek od szczytu zdarza się ok. {{n:dd.p.small.100k}} graczy wygrywających {{n:var.wr.ex}} (SD {{n:var.sd}}).
- R-M12-003 if: chcesz wiedzieć, ile naprawdę wygrywasz. then: zbierasz setki tysięcy rąk: dokładność ± {{n:var.target}} przy ufności {{n:var.conf95}} wymaga ok. {{n:var.need.hands.k}} tys. rąk. because: błąd oszacowania maleje z pierwiastkiem z liczby rąk: potrzebne bloki po 100 rąk = ({{n:var.z95}} × SD ÷ dokładność)².
- R-M12-004 if: oceniasz swoją grę po rozdaniu. then: pytasz o decyzję (cena, equity, informacje, które miałeś), a nie o to, czy wygrałeś. because: dobra decyzja i tak często przegrywa: all-in AA przeciw KK przegrywa w ok. {{n:res.kk-wins}} przypadków, a ludzie i tak oceniają decyzje po wyniku, nawet wiedząc, że nie powinni.
- R-M12-005 if: wynik kilku sesji sprawia, że chcesz zmienić strategię. then: zmieniasz dopiero po przejrzeniu rąk, nie na podstawie samego wyniku. because: nawet najlepsze {{n:skill.pct}} graczy dopiero po ok. {{n:skill.hands}} rękach wyprzedza najgorsze {{n:skill.pct}} w ok. {{n:skill.ahead}} przypadków, a mniejsza różnica umiejętności wymaga dużo więcej rąk.
- R-M12-006 if: zauważasz pierwsze sygnały tiltu ze swojego profilu (np. złość po bad beacie, chęć ukarania rywala). then: reagujesz od razu: oddech i przygotowane zdanie przypominające, dlaczego to wariancja albo błąd do nauki. because: gdy tilt rośnie, przestajesz jasno myśleć i wtedy nie da się go już kontrolować.
- R-M12-007 if: po serii porażek nie potrafisz już spokojnie oceniać decyzji (np. myślisz tylko o odegraniu się albo grasz ręce, które zwykle pasujesz). then: kończysz sesję. because: dalsza gra w tym stanie to gra na twoim najgorszym poziomie (gra C), a celem jest przerwać wcześniej, zanim stracisz zdolność jasnego myślenia.
- R-M12-008 if: ćwiczysz swoją grę. then: zaczynasz od naprawy najgorszych zagrań (gra C), a nie od szlifowania najlepszych. because: poprawa najgorszej gry daje stały postęp i uwalnia uwagę na naukę nowego.
- R-M12-009 if: liczysz ryzyko ruiny, czyli utraty całego bankrollu. then: używasz wzoru RoR = e^(−2 × winrate × bankroll ÷ SD²), bankroll w bb; to przybliżenie przy stałym winrate i SD. because: przy {{n:var.wr.typical.high}} i SD {{n:var.sd}} bankroll {{n:br.bi.base}} wpisowych daje ryzyko ok. {{n:ror.base}}, a {{n:br.bi.move-down}} wpisowych już ok. {{n:ror.half}}.
- R-M12-011 if: bankroll spada do połowy planowanej liczby wpisowych (przy {{n:br.bi.base}} zostaje {{n:br.bi.move-down}}). then: najpóźniej wtedy schodzisz o jedną stawkę, a wracasz najwcześniej, gdy masz pełny bankroll we wpisowych wyższej stawki. because: spadek {{n:dd.bi.small}} wpisowych w {{n:var.hands.k}} tys. rąk zdarza się prawie każdemu graczowi wygrywającemu od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}), niektóre źródła radzą schodzić zaraz po takiej stracie, a przy {{n:br.bi.move-down}} wpisowych ryzyko utraty reszty rośnie z ok. {{n:ror.base}} do ok. {{n:ror.half}} (przy winrate {{n:var.wr.typical.high}} i SD {{n:var.sd}}).
- R-M12-012 if: planujesz czas na poker. then: na początku przeznaczasz ok. {{n:study.beginner}} czasu na naukę; gdy już wygrywasz na swojej stawce, ok. {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}}. because: na początku masz najwięcej do nadrobienia, a gdy już wygrywasz na swojej stawce, możesz grać więcej.

## 3. Dodatkowo: R-M3-006 (content/vi/rules.yaml)

- if: wszyscy spasowali do ciebie na HJ lub CO. then: otwierasz szerzej niż z UTG, ale węziej niż z Buttona; z CO szerzej niż z HJ. because: im mniej graczy za tobą, tym rzadziej ktoś ma lepsze karty i tym częściej masz pozycję po flopie.
