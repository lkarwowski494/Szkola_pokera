---
id: m7.l1
module: m7
order: 1
title: "Druga beczka"
sub: "Kiedy betować drugi raz na turnie"
rules: [R-M7-001, R-M7-002, R-M7-003, R-M7-004]
drills:
  - kind: choice
    id: m7.l1.q-barrel-card
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Na flopie [[Jd 7c 3s]] postawiłeś c-bet, a on sprawdził. Która karta na turnie najbardziej pomaga twojej drugiej beczce?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Tak: as trafia wiele rąk z twojego zakresu otwarcia (AK, AQ, AJ), a duży blind sprawdzał flop głównie parami i dobieraniami. Każda jego para spada o jedno miejsce niżej." }
      - { text: "[[8h]]", why: "Nie: ósemka łączy się z flopem. Daje strita z T9 i dwie pary z 87, czyli rękami, których duży blind broni dużo. To karta raczej dla niego." }
      - { text: "[[3h]]", why: "Nie najgorsza, ale niewiele zmienia: rzadko poprawia twój zakres, a rywal z parą nadal ma parę. As daje twojej drugiej beczce dużo więcej." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Dlaczego as na turnie po flopie [[Jd 7c 3s]] dobrze służy drugiej beczce otwierającego z Buttona?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Trafia twoje AK i AQ, a para rywala staje się drugą albo trzecią parą", correct: true, why: "Tak: wysoka karta częściej trafia zakres otwierającego, a rywal, który sprawdził flop parą waletów albo siódemek, ma teraz słabszą rękę względem stołu." }
      - { text: "Bo na asa rywal zawsze pasuje", why: "Nie zawsze: rywal z asem albo z setem zapłaci. As zwiększa szansę na pas, ale niczego nie gwarantuje." }
      - { text: "Bo as kończy dobierania rywala", why: "Nie: na tym stole as nie kończy żadnego koloru ani strita, który rywal mógłby mieć. Pomaga, bo pasuje do twojego zakresu." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził. Na flopie postawiłeś c-bet, on sprawdził. Turn to siódemka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "Czekam", correct: true, why: "Siódemka na stole z dziewiątką i szóstką daje strita rękom T8 i 85 oraz dwie pary rękom 76 i 97, czyli rękom, które duży blind broni. Ty nie masz pary ani dobierania. Odpuszczasz blef i bierzesz darmową kartę." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Ta karta pasuje do zakresu rywala, nie twojego, a ty nie masz outów do mocnej ręki. Drugą beczkę blefem stawiaj na kartach, które ci pomagają, i z rękami, które mogą się poprawić." }
      - { text: "Betuję {{n:ex.bet.pot}}", why: "Duży blef na karcie, która sprzyja rywalowi, ryzykuje dużo: musiałby pasować częściej niż w {{n:alpha.bet-pot}} przypadków, a po sprawdzeniu flopu ma wiele par i dobierań." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to as. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Dobra druga beczka: as pasuje do twojego zakresu, a ty masz gutshot do strita (dziesiątka). Gdy rywal spasuje parę, wygrywasz od razu, a gdy sprawdzi, nadal możesz trafić." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: tak tani bet rywal sprawdzi każdą parą, a ten blef zarabia głównie na pasach. Na karcie, która ci pomaga, betuj dużo, tak jak silnymi rękami." }
      - { text: "Czekam", correct: true, why: "Też dobrze: masz outy i za darmo zobaczysz rivera, więc czekanie nie jest błędem. Bet jest jednak zwykle lepszy, bo as to jedna z kart, na których rywal najczęściej pasuje pary, a czekając z niej rezygnujesz." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to dwójka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Czekam", correct: true, why: "Nie masz pary ani dobierania: trzy kiery to za mało przy jednej karcie do końca, a do strita brakuje dwóch kart. Dwójka nic nie zmienia, a rywal sprawdził flop na stole z królem, więc ma często parę. Odpuszczasz blef." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Blef bez outów wygrywa tylko wtedy, gdy rywal spasuje. Po sprawdzeniu flopu ma wiele par (króle, ósemki), które na pustej dwójce nie spasują." }
      - { text: "Pasuję", why: "Rywal czeka, więc możesz czekać za darmo (zasada z modułu 1). Pas oddaje pulę bez powodu." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "Stawiasz drugą beczkę z dobieraniem do koloru, a rywal sprawdza. Jakie masz jeszcze szanse?"
    options:
      - { text: "Ok. {{n:odds.flush.turn-river}}, że trafisz kolor na riverze", correct: true, why: "Tak: to druga droga do wygranej. {{n:outs.flush}} outów z {{n:cards.unseen.turn}} nieznanych kart. Dlatego półblef jest lepszy od blefu bez outów." }
      - { text: "Żadnych, blef się nie udał", why: "Blef bez outów nie ma już szans, ale ty dobierasz: kolor na riverze wygra mimo sprawdzenia." }
      - { text: "Ok. {{n:odds.flush.flop-river}}", why: "Tyle miałeś na flopie, gdy przed tobą były dwie karty. Na turnie została jedna: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to dwójka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Czekam", correct: true, why: "Para dziewiątek to średnia ręka: wygrywa z blefami, ale przegrywa z każdym królem. Na drugi bet rywal spasuje gorsze ręce, a zapłaci królami. Czekając, trzymasz pulę małą i dochodzisz do showdownu." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Rywal sprawdził już flop na stole z królem. Gorsze ręce (ósemki, trójki) spasują albo zapłacą raz, a lepsze zapłacą zawsze. Taki bet zarabia na lepszych rękach." }
      - { text: "Betuję, żeby sprawdzić, gdzie stoję", why: "Bet „dla informacji” to częsty błąd: płacisz za nią, bo lepsze ręce i tak cię nie przepuszczą, a gorsze uciekną. Betujesz dla wartości albo jako blef." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "Otworzyłeś z Buttona, duży blind sprawdził c-bet na flopie. Turn to dwójka. W puli jest {{n:ex.pot}}, rywal czeka. Co robisz?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Betuję dla wartości", correct: true, why: "Najwyższa para z najlepszym kickerem to silna ręka. Rywal sprawdził flop, więc często ma słabszego króla albo ósemki, które zapłacą jeszcze raz." }
      - { text: "Czekam, bo rywal i tak nic nie ma", why: "Rywal sprawdził flop, więc często ma parę. Czekając, tracisz zakład, który zapłaciłby gorszą ręką." }
      - { text: "Betuję all-in", why: "Gorsze pary rzadko zapłacą cały stack. Wybierz rozmiar, który dostanie zapłatę od słabszych króli i ósemek." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Którymi rękami najczęściej stawiasz drugą beczkę na turnie?"
    options:
      - { text: "Silnymi rękami i dobieraniami; średnie ręce czekają", correct: true, why: "Tak: silne ręce chcą zapłaty, dobierania wygrywają na dwa sposoby, a średnie ręce nie zyskują na kolejnym zakładzie." }
      - { text: "Wszystkimi, żeby nie stracić inicjatywy", why: "Inicjatywa sama nie wygrywa. Rywal sprawdził flop, więc ma silniejszy zakres, a ręce bez outów i średnie pary tracą na ciągłym betowaniu." }
      - { text: "Tylko najsilniejszymi rękami", why: "Wtedy rywal pasowałby za każdym razem, gdy betujesz, i płaciłby tylko wtedy, gdy cię bije. Dobierania to naturalne półblefy." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. W puli jest {{n:ex.pot}}, blefujesz ręką, która prawie nie wygra, i stawiasz {{n:ex.bet.three-quarters}}. Jak często rywal musi pasować, żeby ten blef wyszedł na zero? Wpisz liczbę w procentach."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = bet ÷ (pula + bet) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Z outami potrzebujesz mniej pasów, bo część sprawdzeń i tak wygrasz na riverze."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Dlaczego po sprawdzeniu c-betu zakres rywala na turnie jest silniejszy niż na flopie?"
    options:
      - { text: "Bo najsłabsze ręce spasował na flopie", correct: true, why: "Tak: na c-bet pasują ręce bez pary i bez dobierania. Zostają pary i dobierania, więc druga beczka trafia na mocniejszy zakres niż pierwsza." }
      - { text: "Bo turn zawsze mu pomaga", why: "Nie: turn jest losowy i czasem pomaga tobie (np. as). Zakres rywala wzmacnia jego własna decyzja na flopie." }
      - { text: "Nie jest, ma ten sam zakres co przed flopem", why: "Każda decyzja odsiewa część rąk. Kto sprawdził zakład, zwykle coś trafił albo dobiera." }
---
Druga beczka to drugi zakład gracza, który przebijał przed flopem: c-bet na flopie, sprawdzenie, a potem bet na turnie. Na turnie pytasz nie tylko „czy mam rękę”, ale też „czy ta karta pomaga mnie, czy rywalowi”.

## Rywal sprawdził, więc jest silniejszy

Na c-bet rywal pasuje ręce bez pary i bez dobierania. Kto sprawdził, ma zwykle parę albo dobieranie. Dlatego druga beczka trafia na silniejszy zakres niż pierwsza i nie betujesz drugi raz wszystkim.

## Która karta pomaga

- **Wysoka karta na niższym stole** (as, król) zwykle pomaga otwierającemu: trafia jego AK, AQ, KQ, a każda para rywala spada o jedno miejsce niżej. Na takich kartach betujesz drugi raz częściej, także blefem.
- **Niska karta, która łączy się ze stołem**, np. siódemka na [[9h 6c 2d]], pomaga dużemu blindowi: daje strity i dwie pary rękom, których broni najwięcej.
- **Pusta karta**, np. dwójka na [[Kd 8c 3s]], niewiele zmienia. Decyduje twoja ręka.

## Czym betować drugi raz

Betujesz silnymi rękami (dla wartości) i dobieraniami (półblef). Półblef wygrywa na dwa sposoby: gdy rywal spasuje albo gdy trafisz na riverze. Ręce bez pary i bez outów częściej odpuszczasz, bo wygrywają tylko na pasie, chyba że blokują ręce, którymi rywal zapłaci.

Blef bez szans wychodzi na zero, gdy rywal pasuje w bet ÷ (pula + bet) przypadków (alpha z M6). Przy becie 3/4 puli to {{n:alpha.bet-three-quarters}}, przy pół puli {{n:alpha.bet-half}}.

## Średnie ręce czekają

Druga para albo najwyższa para ze słabym kickerem wygrywa z blefami, ale przegrywa z lepszymi parami. Na drugi bet gorsze ręce spasują, a lepsze zapłacą. Czekasz, trzymasz pulę małą i dochodzisz do showdownu.

:::note Skąd te zasady
Kierunki (wysokie karty zwykle sprzyjają drugiej beczce, blefy z outami zamiast bez outów, średnie ręce czekają) to heurystyki z literatury (GTO Wizard, PokerListings, PokerCoaching, SplitSuit). Dotyczy to stacków ok. {{n:format.stack}}. To uproszczenie: solver blefuje też częścią rąk bez outów, gdy blokują wartość rywala. Aplikacja nie podaje, jak często betować w procentach, bo takie liczby zależą od konkretnego rozdania w wynikach solverów.
:::
