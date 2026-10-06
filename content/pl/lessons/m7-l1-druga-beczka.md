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
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Na flopie [[Jd 7c 3s]] {{t:bet|postawiłeś}} c-bet, a on {{t:call|sprawdził}}. Która karta na turnie najbardziej pomaga twojemu {{t:second-barrel|second barrelowi}}?"
    table: { position: BTN, board: "Jd 7c 3s" }
    options:
      - { text: "[[As]]", correct: true, why: "Tak: as trafia wiele rąk z twojego {{t:range|zakresu}} {{t:open|otwarcia}} (AK, AQ, AJ), a {{t:big-blind}} {{t:call|sprawdzał}} flop głównie {{t:pair|parami}} i {{t:draw|drawami}}. Każda jego {{t:pair}} spada o jedno miejsce niżej." }
      - { text: "[[8h]]", why: "Nie: ósemka łączy się z flopem. Daje {{t:straight|strita}} z T9 i {{t:two-pair}} z 87, czyli rękami, których {{t:big-blind}} broni dużo. To karta raczej dla niego." }
      - { text: "[[3h]]", why: "Nie najgorsza, ale niewiele zmienia: rzadko poprawia twój {{t:range}}, a rywal z {{t:pair|parą}} nadal ma {{t:pair|parę}}. As daje twojemu {{t:second-barrel|second barrelowi}} dużo więcej." }
  - kind: choice
    id: m7.l1.q-overcard-why
    family: m7.barrel.card
    rules: [R-M7-001]
    prompt: "Dlaczego as na turnie po flopie [[Jd 7c 3s]] dobrze służy {{t:second-barrel|second barrelowi}} {{t:open|otwierającego}} z Buttona?"
    table: { position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Trafia twoje AK i AQ, a {{t:pair}} rywala staje się drugą albo trzecią {{t:pair|parą}}", correct: true, why: "Tak: wysoka karta częściej trafia {{t:range}} {{t:open|otwierającego}}, a rywal, który {{t:call|sprawdził}} flop {{t:pair|parą}} waletów albo siódemek, ma teraz słabszą rękę względem {{t:board|stołu}}." }
      - { text: "Bo na asa rywal zawsze {{t:fold|pasuje}}", why: "Nie zawsze: rywal z asem albo z setem zapłaci. As zwiększa szansę na {{t:fold}}, ale niczego nie gwarantuje." }
      - { text: "Bo as kończy {{t:draw|drawy}} rywala", why: "Nie: na tym {{t:board|stole}} as nie kończy żadnego {{t:flush|koloru}} ani {{t:straight|strita}}, który rywal mógłby mieć. Pomaga, bo pasuje do twojego {{t:range|zakresu}}." }
  - kind: choice
    id: m7.l1.q-bad-card
    family: m7.barrel.card
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}}. Na flopie {{t:bet|postawiłeś}} c-bet, on {{t:call|sprawdził}}. Turn to siódemka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Ad Qc", position: BTN, board: "9h 6c 2d 7s" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Siódemka na {{t:board|stole}} z dziewiątką i szóstką daje {{t:straight|strita}} rękom T8 i 85 oraz {{t:two-pair}} rękom 76 i 97, czyli rękom, które {{t:big-blind}} broni. Ty nie masz {{t:pair|pary}} ani {{t:draw|drawa}}. Odpuszczasz {{t:bluff}} i bierzesz darmową kartę." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Ta karta pasuje do {{t:range|zakresu}} rywala, nie twojego, a ty nie masz outów do mocnej ręki. {{t:second-barrel|Second barrel}} {{t:bluff|blefem}} stawiaj na kartach, które ci pomagają, i z rękami, które mogą się poprawić." }
      - { text: "Betuję {{n:ex.bet.pot}}", why: "Duży {{t:bluff}} na karcie, która sprzyja rywalowi, ryzykuje dużo: musiałby {{t:fold|pasować}} częściej niż w {{n:alpha.bet-pot}} przypadków, a po {{t:call|sprawdzeniu}} flopu ma wiele {{t:pair|par}} i {{t:draw|drawów}}." }
  - kind: choice
    id: m7.l1.q-gutshot-ace
    family: m7.barrel.bluff
    rules: [R-M7-001, R-M7-002]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to as. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Kh Qh", position: BTN, board: "Jd 7c 3s As" }
    options:
      - { text: "Betuję {{n:ex.bet.three-quarters}}", correct: true, why: "Dobry {{t:second-barrel}}: as pasuje do twojego {{t:range|zakresu}}, a ty masz gutshot do {{t:straight|strita}} (dziesiątka). Gdy rywal {{t:fold|spasuje}} {{t:pair|parę}}, wygrywasz od razu, a gdy {{t:call|sprawdzi}}, nadal możesz trafić." }
      - { text: "Betuję {{n:ex.bet.quarter}}", sizeError: true, why: "Dobra akcja, zły rozmiar: tak tani bet rywal {{t:call|sprawdzi}} każdą {{t:pair|parą}}, a ten {{t:bluff}} zarabia głównie na {{t:fold|pasach}}. Na karcie, która ci pomaga, betuj dużo, tak jak silnymi rękami." }
      - { text: "{{t:check|Czekam}}", correct: true, why: "Też dobrze: masz outy i za darmo zobaczysz rivera, więc {{t:check}} nie jest błędem. Bet jest jednak zwykle lepszy, bo as to jedna z kart, na których rywal najczęściej {{t:fold|pasuje}} {{t:pair|pary}}, a {{t:check|czekając}} z niej rezygnujesz." }
  - kind: choice
    id: m7.l1.q-air-blank
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to dwójka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Qh Jh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "Nie masz {{t:pair|pary}} ani {{t:draw|drawa}}: trzy kiery to za mało przy jednej karcie do końca, a do {{t:straight|strita}} brakuje dwóch kart. Dwójka nic nie zmienia, a rywal {{t:call|sprawdził}} flop na {{t:board|stole}} z królem, więc ma często {{t:pair|parę}}. Odpuszczasz {{t:bluff}}." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "{{t:bluff|Blef}} bez outów wygrywa tylko wtedy, gdy rywal {{t:fold|spasuje}}. Po {{t:call|sprawdzeniu}} flopu ma wiele {{t:pair|par}} (króle, ósemki), które na pustej dwójce nie {{t:fold|spasują}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Rywal {{t:check|czeka}}, więc możesz {{t:check|czekać}} za darmo (zasada z modułu 1). {{t:fold|Pas}} oddaje {{t:pot|pulę}} bez powodu." }
  - kind: choice
    id: m7.l1.q-semibluff-called
    family: m7.barrel.bluff
    rules: [R-M7-002]
    prompt: "{{t:bet|Stawiasz}} {{t:second-barrel|second barrel}} z {{t:flush-draw|drawem do koloru}}, a rywal {{t:call|sprawdza}}. Jakie masz jeszcze szanse?"
    options:
      - { text: "Ok. {{n:odds.flush.turn-river}}, że trafisz {{t:flush}} na riverze", correct: true, why: "Tak: to druga droga do wygranej. {{n:outs.flush}} outów z {{n:cards.unseen.turn}} nieznanych kart. Dlatego {{t:semi-bluff}} jest lepszy od {{t:bluff|blefu}} bez outów." }
      - { text: "Żadnych, {{t:bluff}} się nie udał", why: "{{t:bluff|Blef}} bez outów nie ma już szans, ale ty masz {{t:draw}}: {{t:flush}} na riverze wygra mimo {{t:call|sprawdzenia}}." }
      - { text: "Ok. {{n:odds.flush.flop-river}}", why: "Tyle miałeś na flopie, gdy przed tobą były dwie karty. Na turnie została jedna: {{n:odds.flush.turn-river}}." }
  - kind: choice
    id: m7.l1.q-medium-pair
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to dwójka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "9s 9c", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "{{t:check|Czekam}}", correct: true, why: "{{t:pair|Para}} dziewiątek to średnia ręka: wygrywa z {{t:bluff|blefami}}, ale przegrywa z każdym królem. Na drugi bet rywal {{t:fold|spasuje}} gorsze ręce, a zapłaci królami. {{t:check|Czekając}}, trzymasz {{t:pot|pulę}} małą i dochodzisz do showdownu." }
      - { text: "Betuję {{n:ex.bet.three-quarters}}", why: "Rywal {{t:call|sprawdził}} już flop na {{t:board|stole}} z królem. Gorsze ręce (ósemki, trójki) {{t:fold|spasują}} albo zapłacą raz, a lepsze zapłacą zawsze. Taki bet zarabia na lepszych rękach." }
      - { text: "Betuję, żeby {{t:call|sprawdzić}}, gdzie stoję", why: "Bet „dla informacji” to częsty błąd: płacisz za nią, bo lepsze ręce i tak cię nie przepuszczą, a gorsze uciekną. Betujesz {{t:value|dla wartości}} albo jako {{t:bluff}}." }
  - kind: choice
    id: m7.l1.q-value-top
    family: m7.barrel.value
    rules: [R-M7-003]
    prompt: "{{t:open|Otworzyłeś}} z Buttona, {{t:big-blind}} {{t:call|sprawdził}} c-bet na flopie. Turn to dwójka. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:check|czeka}}. Co robisz?"
    table: { hand: "Ac Kh", position: BTN, board: "Kd 8c 3s 2h" }
    options:
      - { text: "Betuję {{t:value|dla wartości}}", correct: true, why: "{{t:top-pair|Najwyższa para}} z najlepszym kickerem to silna ręka. Rywal {{t:call|sprawdził}} flop, więc często ma słabszego króla albo ósemki, które zapłacą jeszcze raz." }
      - { text: "{{t:check|Czekam}}, bo rywal i tak nic nie ma", why: "Rywal {{t:call|sprawdził}} flop, więc często ma {{t:pair|parę}}. {{t:check|Czekając}}, tracisz {{t:bet}}, który zapłaciłby gorszą ręką." }
      - { text: "Betuję all-in", why: "Gorsze {{t:pair|pary}} rzadko zapłacą cały stack. Wybierz rozmiar, który dostanie zapłatę od słabszych króli i ósemek." }
  - kind: choice
    id: m7.l1.q-what-to-bet
    family: m7.barrel.value
    rules: [R-M7-002, R-M7-003]
    prompt: "Którymi rękami najczęściej {{t:bet|stawiasz}} {{t:second-barrel|second barrel}} na turnie?"
    options:
      - { text: "Silnymi rękami i {{t:draw|drawami}}; średnie ręce {{t:check|czekają}}", correct: true, why: "Tak: silne ręce chcą zapłaty, {{t:draw|drawy}} wygrywają na dwa sposoby, a średnie ręce nie zyskują na kolejnym {{t:bet|zakładzie}}." }
      - { text: "Wszystkimi, żeby nie stracić {{t:initiative|inicjatywy}}", why: "{{t:initiative|Inicjatywa}} sama nie wygrywa. Rywal {{t:call|sprawdził}} flop, więc ma silniejszy {{t:range}}, a ręce bez outów i średnie {{t:pair|pary}} tracą na ciągłym betowaniu." }
      - { text: "Tylko najsilniejszymi rękami", why: "Wtedy rywal pasowałby za każdym razem, gdy betujesz, i płaciłby tylko wtedy, gdy cię bije. {{t:draw|Drawy}} to naturalne {{t:semi-bluff|semi-blefy}}." }
  - kind: numeric
    id: m7.l1.n-alpha-turn
    family: m7.barrel.math
    rules: [R-M7-004]
    prompt: "Turn. W {{t:pot|puli}} jest {{n:ex.pot}}, {{t:bluff|blefujesz}} ręką, która prawie nie wygra, i {{t:bet|stawiasz}} {{n:ex.bet.three-quarters}}. Jak często rywal musi {{t:fold|pasować}}, żeby ten {{t:bluff}} wyszedł na zero? Wpisz liczbę w procentach."
    answer: alpha.bet-three-quarters
    explanation: "Alpha = bet ÷ ({{t:pot}} + bet) = {{n:ex.bet.three-quarters}} ÷ ({{n:ex.pot}} + {{n:ex.bet.three-quarters}}) = {{n:alpha.bet-three-quarters}}. Z outami potrzebujesz mniej {{t:fold|pasów}}, bo część {{t:call|sprawdzeń}} i tak wygrasz na riverze."
  - kind: choice
    id: m7.l1.q-filter
    family: m7.barrel.range
    rules: [R-M7-003]
    prompt: "Dlaczego po {{t:call|sprawdzeniu}} c-betu {{t:range}} rywala na turnie jest silniejszy niż na flopie?"
    options:
      - { text: "Bo najsłabsze ręce {{t:fold|spasował}} na flopie", correct: true, why: "Tak: na c-bet {{t:fold|pasują}} ręce bez {{t:pair|pary}} i bez {{t:draw|drawa}}. Zostają {{t:pair|pary}} i {{t:draw|drawy}}, więc {{t:second-barrel}} trafia na mocniejszy {{t:range}} niż pierwszy." }
      - { text: "Bo turn zawsze mu pomaga", why: "Nie: turn jest losowy i czasem pomaga tobie (np. as). {{t:range|Zakres}} rywala wzmacnia jego własna decyzja na flopie." }
      - { text: "Nie jest, ma ten sam {{t:range}} co przed flopem", why: "Każda decyzja odsiewa część rąk. Kto {{t:call|sprawdził}} {{t:bet}}, zwykle coś trafił albo ma {{t:draw}}." }
---
{{t:second-barrel|Second barrel}} to drugi {{t:bet}} gracza, który {{t:raise|przebijał}} przed flopem: c-bet na flopie, {{t:call}}, a potem bet na turnie. Na turnie pytasz nie tylko „czy mam rękę”, ale też „czy ta karta pomaga mnie, czy rywalowi”.

## Rywal {{t:call|sprawdził}}, więc jest silniejszy

Na c-bet rywal {{t:fold|pasuje}} ręce bez {{t:pair|pary}} i bez {{t:draw|drawa}}. Kto {{t:call|sprawdził}}, ma zwykle {{t:pair|parę}} albo {{t:draw}}. Dlatego {{t:second-barrel}} trafia na silniejszy {{t:range}} niż pierwszy i nie betujesz drugi raz wszystkim.

## Która karta pomaga

- **Wysoka karta na niższym {{t:board|stole}}** (as, król) zwykle pomaga {{t:open|otwierającemu}}: trafia jego AK, AQ, KQ, a każda {{t:pair}} rywala spada o jedno miejsce niżej. Na takich kartach betujesz drugi raz częściej, także {{t:bluff|blefem}}.
- **Niska karta, która łączy się ze {{t:board|stołem}}**, np. siódemka na [[9h 6c 2d]], pomaga {{t:big-blind|dużemu blindowi}}: daje {{t:straight|strity}} i {{t:two-pair}} rękom, których broni najwięcej.
- **Pusta karta**, np. dwójka na [[Kd 8c 3s]], niewiele zmienia. Decyduje twoja ręka.

## Czym betować drugi raz

Betujesz silnymi rękami ({{t:value|dla wartości}}) i {{t:draw|drawami}} ({{t:semi-bluff}}). {{t:semi-bluff|Semi-blef}} wygrywa na dwa sposoby: gdy rywal {{t:fold|spasuje}} albo gdy trafisz na riverze. Ręce bez {{t:pair|pary}} i bez outów częściej odpuszczasz, bo wygrywają tylko na pasie, chyba że blokują ręce, którymi rywal zapłaci.

{{t:bluff|Blef}} bez szans wychodzi na zero, gdy rywal {{t:fold|pasuje}} w bet ÷ ({{t:pot}} + bet) przypadków (alpha z M6). Przy becie 3/4 {{t:pot|puli}} to {{n:alpha.bet-three-quarters}}, przy pół {{t:pot|puli}} {{n:alpha.bet-half}}.

## Średnie ręce {{t:check|czekają}}

{{t:second-pair|Druga para}} albo {{t:top-pair}} ze słabym kickerem wygrywa z {{t:bluff|blefami}}, ale przegrywa z lepszymi {{t:pair|parami}}. Na drugi bet gorsze ręce {{t:fold|spasują}}, a lepsze zapłacą. {{t:check|Czekasz}}, trzymasz {{t:pot|pulę}} małą i dochodzisz do showdownu.

:::note Skąd te zasady
Kierunki (wysokie karty zwykle sprzyjają {{t:second-barrel|second barrelowi}}, {{t:bluff|blefy}} z outami zamiast bez outów, średnie ręce {{t:check|czekają}}) to heurystyki z literatury (GTO Wizard, PokerListings, PokerCoaching, SplitSuit). Dotyczy to stacków ok. {{n:format.stack}}. To uproszczenie: solver {{t:bluff|blefuje}} też częścią rąk bez outów, gdy blokują wartość rywala. Aplikacja nie podaje, jak często betować w procentach, bo takie liczby zależą od konkretnego rozdania w wynikach solverów.
:::
