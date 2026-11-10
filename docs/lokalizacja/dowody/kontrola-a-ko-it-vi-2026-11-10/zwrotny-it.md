# Przekład zwrotny it → pl (wykonany przed otwarciem content/pl i content/en)

Znaczniki `{{n:…}}`/`{{t:…}}` zachowane dosłownie. „mila mani” = „tys. rąk”.

## 1. content/it/lessons/m12-l1-wariancja.md

- title (w5): „Wariancja w liczbach”; sub (w6): „Ile mówi wynik z tysięcy rąk”.

### Ćwiczenia
- n-expected prompt (w13): „Wygrywasz średnio {{n:var.wr.ex}} i zagrasz {{n:var.hands.k}} tys. rąk. Ilu wpisowym (po {{n:format.stack}}) odpowiada twój oczekiwany wynik? Wpisz liczbę.” explanation (w15): „{{n:var.hands.k}} tys. rąk to {{n:var.blocks}} bloków po 100 rąk. Oczekiwany wynik = {{n:var.wr.ex}} × {{n:var.blocks}} = {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. To średnia: rzeczywisty wynik może się od niej mocno różnić.”
- q-sd-result prompt (w20): „Odchylenie standardowe twojej gry to {{n:var.sd}}. Ile wynosi odchylenie wyniku po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków po 100 rąk)?”
  - (poprawna) „ok. {{n:var.sd.result.bi}} wpisowych” — „Odchylenie rośnie z pierwiastkiem z liczby bloków: {{n:var.sd}} × √{{n:var.blocks}} ≈ {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych.”
  - „ok. {{n:var.sd.wrong.bi}}” — „Tyle wychodzi, gdy pomnożysz odchylenie przez liczbę bloków. Losowe wahania częściowo się znoszą, więc mnożysz przez pierwiastek: {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}.”
  - „ok. {{n:var.exp.bi}}” — „To oczekiwany wynik przy {{n:var.wr.ex}}, nie jego odchylenie. Odchylenie to ok. {{n:var.sd.result.bi}} wpisowych.”
- q-ci95 prompt (w29): „Wygrywasz {{n:var.wr.ex}} przy odchyleniu {{n:var.sd}}. W jakim przedziale znajdzie się wynik po {{n:var.hands.k}} tys. rąk z pewnością ok. {{n:var.conf95}}?”
  - (poprawna) „od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}} wpisowych” — „Oczekiwany wynik {{n:var.exp.bi}} ± {{n:var.z95}} × {{n:var.sd.result.bi}} ≈ ± {{n:var.ci.half.bi}}. Nawet wyraźnie wygrywający gracz może być po {{n:var.hands.k}} tys. rąk prawie na zero.”
  - „od ok. {{n:var.ci68.low.bi}} do ok. {{n:var.ci68.high.bi}}” — „To przedział jednego odchylenia: obejmuje tylko ok. 2 z 3 wyników. Dla {{n:var.conf95}} bierzesz {{n:var.z95}} odchylenia: od ok. {{n:var.ci.low.bi}} do ok. {{n:var.ci.high.bi}}.”
  - „dokładnie {{n:var.exp.bi}}” — „To tylko średnia. Wynik waha się wokół niej o dziesiątki wpisowych w obu kierunkach.”
- n-se prompt (w38): „Po {{n:var.hands.k}} tys. rąk ({{n:var.blocks}} bloków) przy odchyleniu {{n:var.sd}}: ile wynosi błąd standardowy winrate w bb/100? Przyjmij √{{n:var.blocks}} ≈ {{n:var.sqrt-blocks}}. Wpisz liczbę.” explanation (w40): „Błąd standardowy = SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.se.wr}}. Przedział {{n:var.conf95}} = ± {{n:var.z95}} × {{n:var.se.wr}} ≈ ± {{n:var.ci.wr}}.”
- q-winrate-ci prompt (w45): „Po {{n:var.hands.k}} tys. rąk wynik to {{n:var.wr.ex}}, odchylenie {{n:var.sd}}. Co wiesz o prawdziwym winrate?”
  - (poprawna) „Z pewnością ok. {{n:var.conf95}} leży między ok. {{n:var.wr.ci.low}} a ok. {{n:var.wr.ci.high}}” — „{{n:var.wr.ex}} ± {{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.sqrt-blocks}} ≈ {{n:var.wr.ex}} ± {{n:var.ci.wr}}. Po {{n:var.hands.k}} tys. rąk wiesz tylko, że prawdopodobnie nie przegrywasz.”
  - „Wynosi {{n:var.wr.ex}}, bo próba jest duża” — „{{n:var.hands.k}} tys. rąk wydaje się dużo, ale przy odchyleniu {{n:var.sd}} błąd to wciąż ok. ± {{n:var.ci.wr}}.”
  - „Nic, wynik w pokerze to czyste szczęście” — „Przesada. Próba zawęża przedział, tylko powoli: błąd maleje z pierwiastkiem z liczby rąk.”
- q-hands-needed prompt (w54): „Chcesz znać winrate z dokładnością ± {{n:var.target}} i pewnością {{n:var.conf95}}. Odchylenie {{n:var.sd}}. Ile rąk potrzebujesz?”
  - (poprawna) „ok. {{n:var.need.hands.k}} tys.” — „Bloki = ({{n:var.z95}} × {{n:var.sd}} ÷ {{n:var.target}})² = {{n:var.need.ratio}}² ≈ {{n:var.need.blocks}}. To ok. {{n:var.need.hands.k}} tys. rąk.”
  - „ok. {{n:var.hands.k}} tys.” — „Po {{n:var.hands.k}} tys. rąk błąd to ok. ± {{n:var.ci.wr}}. Żeby zmniejszyć go do ± {{n:var.target}}, potrzebujesz ok. {{n:var.need.hands.k}} tys. rąk.”
  - „ok. {{n:var.need.blocks}} rąk” — „To liczba bloków po 100 rąk. Rąk jest sto razy więcej: ok. {{n:var.need.hands.k}} tys.”
- q-dd-100k prompt (w63): „Gracz wygrywa {{n:var.wr.ex}} przy odchyleniu {{n:var.sd}}. Jak często w ciągu {{n:var.hands.k}} tys. rąk przytrafi mu się spadek co najmniej {{n:dd.bi.small}} wpisowych od najwyższego punktu?”
  - (poprawna) „Prawie zawsze, ok. {{n:dd.p.small.100k}}” — „Symulacja {{n:var.hands.k}} tys. rąk z tymi parametrami daje taki spadek w ok. {{n:dd.p.small.100k}} prób. Spadek {{n:dd.bi.small}} wpisowych to normalna część gry wygrywającego.”
  - „w ok. {{n:dd.p.small.20k}} przypadków” — „To dane dla krótszej próby, {{n:dd.hands.short.k}} tys. rąk. W {{n:var.hands.k}} tys. rąk okazji do głębokiego spadku jest dużo więcej: ok. {{n:dd.p.small.100k}}.”
  - „rzadko, ok. {{n:var.p.lose}}” — „To częstość, z jaką gracz {{n:var.wr.ex}} kończy {{n:var.hands.k}} tys. rąk na minusie. Spadek po drodze to co innego: zdarza się prawie zawsze.”
- q-dd-wr-low prompt (w72): „Dwaj gracze, odchylenie {{n:var.sd}}, {{n:var.hands.k}} tys. rąk. Jeden wygrywa {{n:var.wr.ex}}, drugi {{n:dd.wr-low}}. Jak często każdy z nich przeżyje spadek {{n:dd.bi.big}} wpisowych?”
  - (poprawna) „Pierwszy w ok. {{n:dd.p.big.100k}}, drugi w ok. {{n:dd.p.big.100k.wr-low}} przypadków” — „Niższy winrate słabiej pcha wynik w górę, więc spadki są głębsze i częstsze. Przy {{n:dd.wr-low}}, typowym dla wygrywających na mikrolimitach, spadek {{n:dd.bi.big}} wpisowych zdarza się w więcej niż jednej próbie na dwie.”
  - „Obaj równie często, bo odchylenie to samo” — „Odchylenie wyznacza wahania, winrate — jak szybko wynik się od nich oddala. Przy {{n:dd.wr-low}} spadek {{n:dd.bi.big}} wpisowych zdarza się w ok. {{n:dd.p.big.100k.wr-low}} prób, przy {{n:var.wr.ex}} w ok. {{n:dd.p.big.100k}}.”
  - „Żaden: taki spadek zdarza się tylko przegrywającym” — „Fałsz. Także gracz {{n:var.wr.ex}} przeżywa go w ok. {{n:dd.p.big.100k}} prób po {{n:var.hands.k}} tys. rąk.”
- q-dd-meaning prompt (w81): „Od miesiąca jesteś {{n:dd.bi.small}} wpisowych pod kreską. Co z tego wynika?”
  - (poprawna) „Sam spadek niczego nie dowodzi; przejrzyj decyzje w przegranych rękach” — „Spadek {{n:dd.bi.small}} wpisowych w ciągu {{n:var.hands.k}} tys. rąk dotyka prawie każdego gracza wygrywającego od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}). Czy grasz dobrze, mówi ci przegląd decyzji, a nie sam wynik.”
  - „Grasz źle i musisz zmienić cały styl” — „Spadki tej wielkości zdarzają się graczom wygrywającym {{n:var.wr.ex}} (SD {{n:var.sd}}) w ok. {{n:dd.p.small.100k}} prób po {{n:var.hands.k}} tys. rąk. Zmiana stylu tylko z powodu wyniku to reagowanie na szum.”
  - „Na pewno masz pecha, nic nie musisz przeglądać” — „Spadek może też wynikać z błędów. Wynik nie odróżnia pecha od błędu, przegląd rąk tak.”
- q-sd-typical prompt (w90): „Jakie odchylenie standardowe jest typowe w cash game 6-max NLH?”
  - (poprawna) „ok. {{n:var.sd.low}}–{{n:var.sd.high}}” — „Tak podają kalkulatory wariancji. Jako typową wartość najczęściej przyjmuje się ok. {{n:var.sd}}. Agresywny styl daje wyższe odchylenie.”
  - „ok. {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}” — „To typowy winrate wygrywających na mikrolimitach. Odchylenie jest dziesiątki razy większe od winrate, dlatego wyniki tak się wahają.”
  - „ok. {{n:var.sd.result.bi}} wpisowych na 100 rąk” — „To odchylenie wyniku po {{n:var.hands.k}} tys. rąk, nie na 100 rąk.”

### Treść
- w96: Twój wynik w pokerze to suma dwóch rzeczy: jak dobrze grasz i szczęścia. Oba składniki da się zmierzyć. Winrate mówi, ile wygrywasz średnio, odchylenie standardowe — jak bardzo wynik waha się wokół tej średniej.
- w98: „Dwie liczby w bb/100”. w100: Winrate to średni zysk na 100 rąk w big blindach. Wygrywający na mikrolimitach mają zwykle {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.
- w102: Odchylenie standardowe (SD) to typowy rozrzut wyniku na 100 rąk. W cash 6-max zwykle {{n:var.sd.low}}–{{n:var.sd.high}}, jako typową przyjmuje się {{n:var.sd}}. Odchylenie jest dziesiątki razy większe od winrate, więc wynik sesji, a nawet miesiąca mówi bardzo mało.
- w104: „Wynik na wielu rękach”. w106: Podziel liczbę rąk przez 100, otrzymasz liczbę bloków.
- wzory: oczekiwany wynik = winrate × liczba bloków; odchylenie wyniku = SD × √(liczba bloków); przedział {{n:var.conf95}} = oczekiwany wynik ± {{n:var.z95}} × odchylenie wyniku.
- w114: Przykład: {{n:var.wr.ex}}, SD {{n:var.sd}}, {{n:var.hands.k}} tys. rąk, czyli {{n:var.blocks}} bloków. Oczekujesz {{n:var.exp.bb}}, czyli {{n:var.exp.bi}} wpisowych. Odchylenie wyniku {{n:var.sd}} × {{n:var.sqrt-blocks}} ≈ {{n:var.sd.result.bb}}, czyli ok. {{n:var.sd.result.bi}} wpisowych. Z pewnością {{n:var.conf95}} skończysz między ok. **{{n:var.ci.low.bi}} a {{n:var.ci.high.bi}} wpisowych**. Oczekiwany wynik leży ok. {{n:var.z.lose}} odchylenia nad zerem, więc szansa na minus po {{n:var.hands.k}} tys. rąk to ok. {{n:var.p.lose}}.
- w116: „Ile rąk, żeby poznać winrate”. w118: Ten sam rachunek działa odwrotnie. Błąd oszacowania winrate maleje z pierwiastkiem z liczby rąk:
- wzory: błąd winrate = SD ÷ √(liczba bloków); potrzebne bloki = ({{n:var.z95}} × SD ÷ dokładność)².
- w125: Po {{n:var.hands.k}} tys. rąk błąd to ok. {{n:var.se.wr}}, więc przedział {{n:var.conf95}} to ± {{n:var.ci.wr}}. Wynik {{n:var.wr.ex}} znaczy wtedy tylko, że prawdziwy winrate jest gdzieś między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}. Żeby znać winrate z dokładnością ± {{n:var.target}}, potrzebujesz ok. **{{n:var.need.hands.k}} tys. rąk**.
- w127: „Spadki są normalne”. w129: Spadek to obniżenie wyniku względem najwyższego punktu. Symulacja gracza {{n:var.wr.ex}} z SD {{n:var.sd}}:
- tabela: kolumny: spadek od szczytu | w {{n:dd.hands.short.k}} tys. rąk | w {{n:var.hands.k}} tys. rąk | w {{n:var.hands.k}} tys. rąk przy {{n:dd.wr-low}}; wiersze jak w kluczach (small: 20k/100k/100k.wr-low; big: — /100k/100k.wr-low).
- ramka „Skąd te liczby”: Wyniki symulacji: tysiące prób po {{n:var.hands.k}} tys. rąk, z losowym wynikiem dla każdego bloku. Prawdziwe spadki mogą być nieco głębsze, bo wynik zmienia się co rękę, a nie co 100 rąk. Wniosek: spadek {{n:dd.bi.small}} wpisowych nie dowodzi, że grasz źle.
- w140: To ogólne wskazówki, nie gwarancja wyniku. Jeśli gra wymyka ci się spod kontroli, zajrzyj do ekranu „Pomoc”.

## 2. Reguły R-M12-* (content/it/rules.yaml)

- R-M12-001 if: oceniasz wynik lub winrate na podstawie próby rąk. then: liczysz przedział: winrate ± {{n:var.z95}} × SD ÷ √(liczba rąk ÷ 100). because: przy SD {{n:var.sd}} nawet po {{n:var.hands.k}} tys. rąk przedział {{n:var.conf95}} to ok. ± {{n:var.ci.wr}}, więc wynik {{n:var.wr.ex}} znaczy tylko „między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}”.
- R-M12-002 if: wpadasz w spadek {{n:dd.bi.small}} wpisowych. then: nie uznajesz go za dowód słabej gry, tylko przeglądasz decyzje w przegranych rękach. because: w {{n:var.hands.k}} tys. rąk taki spadek od szczytu zdarza się ok. {{n:dd.p.small.100k}} graczy wygrywających {{n:var.wr.ex}} (SD {{n:var.sd}}).
- R-M12-003 if: chcesz wiedzieć, ile naprawdę wygrywasz. then: zbierasz setki tysięcy rąk: dokładność ± {{n:var.target}} przy {{n:var.conf95}} ufności wymaga ok. {{n:var.need.hands.k}} tys. rąk. because: błąd oszacowania maleje z pierwiastkiem z liczby rąk: potrzebne bloki po 100 rąk = ({{n:var.z95}} × SD ÷ dokładność)².
- R-M12-004 if: oceniasz zagranie po ręce. then: pytasz, jaka była decyzja (cena, equity, informacje, które miałeś), a nie czy wygrałeś. because: dobra decyzja regularnie przegrywa: all-in AA przeciw KK przegrywa w ok. {{n:res.kk-wins}} przypadków, a ludzie i tak oceniają decyzje po wyniku, nawet gdy wiedzą, że nie powinni.
- R-M12-005 if: wynik kilku sesji skłania cię do zmiany strategii. then: zmieniasz ją dopiero po przeglądzie rąk, nie na podstawie samego wyniku. because: nawet najlepsze {{n:skill.pct}} graczy wyprzedza najgorsze {{n:skill.pct}} w ok. {{n:skill.ahead}} przypadków dopiero po ok. {{n:skill.hands}} rękach, a mniejsze różnice umiejętności wymagają dużo więcej rąk.
- R-M12-006 if: zauważasz pierwsze sygnały tiltu ze swojego profilu (np. złość po bad beacie, chęć ukarania rywala). then: reagujesz od razu: głęboki oddech i przygotowane zdanie, które przypomina, dlaczego to wariancja albo błąd, z którego trzeba się uczyć. because: gdy tilt rośnie, przestajesz jasno myśleć i wtedy nie da się go już kontrolować.
- R-M12-007 if: po serii porażek nie potrafisz już spokojnie oceniać decyzji (np. myślisz tylko o odegraniu się albo grasz ręce, które zwykle pasujesz). then: kończysz sesję. because: dalsza gra w tym stanie to gra na najgorszym poziomie (gra C); celem jest przerwać wcześniej, zanim stracisz zdolność jasnego myślenia.
- R-M12-008 if: pracujesz nad grą. then: zaczynasz od poprawy najgorszych zagrań (gra C), a nie od szlifowania najlepszych. because: poprawa najgorszej gry daje stały postęp i uwalnia uwagę na naukę nowego.
- R-M12-009 if: liczysz ryzyko ruiny, czyli utraty całego bankrollu. then: używasz wzoru RoR = e^(−2 × winrate × bankroll ÷ SD²), bankroll w bb; to przybliżenie przy stałym winrate i SD. because: przy {{n:var.wr.typical.high}} i SD {{n:var.sd}} bankroll {{n:br.bi.base}} wpisowych daje ok. {{n:ror.base}} ryzyka, a {{n:br.bi.move-down}} wpisowych już ok. {{n:ror.half}}.
- R-M12-011 if: bankroll spada do połowy planowanej liczby wpisowych (z {{n:br.bi.base}} do {{n:br.bi.move-down}}). then: schodzisz o jeden limit najpóźniej w tym momencie, a wracasz dopiero, gdy masz pełny bankroll we wpisowych wyższego limitu, nie wcześniej. because: spadki {{n:dd.bi.small}} wpisowych w ciągu {{n:var.hands.k}} tys. rąk zdarzają się prawie każdemu graczowi wygrywającemu od {{n:dd.wr-low}} do {{n:var.wr.ex}} (symulacja z SD {{n:var.sd}}), niektóre źródła radzą schodzić już po takiej stracie, a przy {{n:br.bi.move-down}} wpisowych ryzyko utraty reszty rośnie z ok. {{n:ror.base}} do ok. {{n:ror.half}} (przy winrate {{n:var.wr.typical.high}} i SD {{n:var.sd}}).
- R-M12-012 if: planujesz czas na poker. then: na początku poświęcasz nauce ok. {{n:study.beginner}} czasu; gdy wygrywasz na swoim limicie, ok. {{n:study.winner}}, ale nigdy mniej niż {{n:study.min}}. because: na początku masz najwięcej do nadrobienia, a gdy już wygrywasz na swoim limicie, możesz grać więcej.

## 3. Dodatkowe wiersze

### content/it/lessons/m12-l3-tilt.md w22
- prompt: „Ten sam rywal po raz czwarty z rzędu podbija twoje blindy. Postanawiasz, że następnym razem przebijesz go dowolną ręką, żeby mu pokazać. Jaki to rodzaj tiltu?”

### content/it/lessons/m12-l4-bankroll.md (zdania z granicą)
- w47 prompt q-move-down: „Zacząłeś na tym limicie z {{n:br.bi.base}} wpisowymi. Po spadku masz {{n:br.ex.below}}. Co robisz?”; w49 (poprawna) „Schodzisz o limit” — „Spadłeś poniżej połowy planowanego bankrollu ({{n:br.bi.move-down}}). Przy tak małej liczbie wpisowych ryzyko utraty reszty jest kilka razy wyższe niż przy {{n:br.bi.base}} (winrate {{n:var.wr.typical.high}}, SD {{n:var.sd}}). Na limicie o połowę niższym ten sam bankroll znów jest prawie pełną liczbą wpisowych tego limitu.”
- w56 prompt q-stay: „Zacząłeś z {{n:br.bi.base}}, straciłeś {{n:dd.bi.small}}. Masz {{n:br.ex.after-dd}}. Co robisz?”
  - w58 (poprawna) „Zostajesz na tym limicie i przeglądasz decyzje w przegranych rękach” — „{{n:br.ex.after-dd}} wpisowych to wciąż więcej niż najpóźniejszy próg zejścia, {{n:br.bi.move-down}}. W symulacji taki spadek dotyka ok. {{n:dd.p.small.100k}} graczy wygrywających {{n:var.wr.ex}} na {{n:var.hands.k}} tys. rąk, a przegląd rąk sprawdza, czy stoją za tym błędy.”
  - w59 (poprawna) „Schodzisz od razu o limit” — „To też dobra decyzja: niektóre źródła radzą schodzić już po stracie {{n:dd.bi.small}} wpisowych. Zejście przed dojściem do połowy bankrollu nie jest błędem, zejście później — tak.”
- w65 prompt q-move-up: „Masz {{n:br.bi.base}} wpisowych obecnego limitu, czyli tyle, ile ustaliłeś jako bankroll. Wyższy limit ma dwukrotnie wyższe wpisowe. Wchodzisz wyżej?”; w67 (poprawna) „Nie, na wyższym limicie to tylko połowa planowanego bankrollu” — „Bankroll liczysz we wpisowych limitu, na który chcesz przejść. Tam twoje {{n:br.bi.base}} staje się {{n:br.bi.move-down}}, czyli dokładnie progiem zejścia.”
- w137: „Ustal próg z góry: schodzisz o limit najpóźniej, gdy bankroll spadnie do **połowy** planowanej liczby wpisowych, np. z {{n:br.bi.base}} do {{n:br.bi.move-down}}. Źródła podają progi od połowy do pełnego bankrollu; połowa jest najpóźniejsza. Na limicie o połowę niższym ten sam bankroll znów jest prawie pełną liczbą wpisowych tego limitu. Wracasz wyżej nie wcześniej, niż gdy masz pełny bankroll we wpisowych wyższego limitu. Niektóre źródła radzą schodzić wcześniej, już po stracie {{n:dd.bi.small}} wpisowych: zejście przed progiem połowy nie jest błędem.”
