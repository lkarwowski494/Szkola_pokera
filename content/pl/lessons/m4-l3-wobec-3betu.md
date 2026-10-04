---
id: m4.l3
module: m4
order: 3
title: "Gdy dostajesz 3-bet"
sub: "Pas, sprawdzenie czy 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}} na {{n:pf.open-size}}, Button {{t:raise|przebił}} do {{n:pf.3bet.ip-total}}, blindy {{t:fold|spasowały}}. Jaką część {{t:range|zakresu}} {{t:open|otwarcia}} musisz co najmniej kontynuować ({{t:call|sprawdzić}} albo 4-betować), żeby Button nie zarabiał na 3-becie z każdą ręką?"
    table: { position: CO }
    options:
      - { text: "Ok. {{n:mdf.vs-3bet-ip-size}} {{t:range|zakresu}} {{t:open|otwarcia}}", correct: true, why: "Button ryzykuje {{n:pf.3bet.ip-total}}, żeby wygrać {{n:vs3bet.win}}. Jeśli {{t:fold|pasujesz}} częściej niż {{n:alpha.vs-3bet-ip-size}}, jego 3-bet zarabia nawet z najgorszą ręką." }
      - { text: "Ok. połowy {{t:range|zakresu}}", why: "Za dużo jak na minimum: z matematyki wystarczy {{n:mdf.vs-3bet-ip-size}}. W praktyce {{t:open|otwierający}} {{t:fold|pasuje}} ok. {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} {{t:open|otwarć}}, więc kontynuuje mniej niż połowę {{t:range|zakresu}}." }
      - { text: "Zawsze, każdą ręką", why: "Wtedy płacisz 3-bety rękami, które przegrywają z {{t:range|zakresem}} Buttona. {{t:fold|Pas}} z najsłabszą częścią {{t:open|otwarcia}} jest poprawny." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}} na {{n:pf.open-size}}, Button {{t:raise|przebił}} do {{n:pf.3bet.ip-total}}, blindy {{t:fold|spasowały}}. Co robisz?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "KJ w różnych kolorach {{t:out-of-position}} często jest zdominowany przez AK, AJ i KQ, a po flopie trudno go rozegrać. PokerCoaching i Deepfold zalecają tu {{t:fold}}." }
      - { text: "{{t:call|Sprawdzam}}", why: "Kusi, bo to wysokie karty, ale {{t:out-of-position}} ta ręka {{t:equity-realization|realizuje equity}} słabo i często przegrywa z lepszym kickerem." }
      - { text: "4-betuję", why: "KJo jest za słaby na 4-bet {{t:value|dla wartości}}, a jako {{t:bluff}} nie blokuje rąk, którymi Button kontynuuje." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}} na {{n:pf.open-size}}, Button {{t:raise|przebił}} do {{n:pf.3bet.ip-total}}, blindy {{t:fold|spasowały}}. Co robisz?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4-betuję", correct: true, why: "AK chce wpłacić stack: blokuje AA i KK rywala i dominuje AQ, KQ i słabsze asy." }
      - { text: "{{t:call|Sprawdzam}}", why: "{{t:call|Sprawdzenie}} nie jest złe, ale {{t:out-of-position}} tracisz inicjatywę i wartość. Standard to 4-bet." }
      - { text: "{{t:fold|Pasuję}}", why: "AK to jedna z najlepszych rąk preflop. {{t:fold|Pas}} tu to duży błąd." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Otworzyłeś}} z Buttona na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}, {{t:big-blind}} {{t:raise|przebił}} do {{n:pf.3bet.oop-total}}. Co robisz?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "{{t:connectors|Łącznik}} w kolorze {{t:in-position}} dobrze {{t:equity-realization|realizuje equity}}: trafia {{t:straight|strity}} i kolory, a gdy chybi, łatwo go {{t:fold|spasować}} na flopie." }
      - { text: "{{t:fold|Pasuję}}", why: "{{t:in-position|Z pozycją}} ta ręka jest wystarczająco grywalna, żeby bronić. {{t:fold|Pas}} byłby zbyt ciasny." }
      - { text: "4-betuję", why: "Jako {{t:bluff}} lepiej nadają się asy w kolorze, bo blokują AA i AK. 87s woli zobaczyć flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "{{t:open|Otworzyłeś}} z Buttona na {{n:pf.open-size}}, {{t:small-blind}} {{t:fold|spasował}}, {{t:big-blind}} {{t:raise|przebił}} do {{n:pf.3bet.oop-total}}. Co robisz?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Według Upswing najniższe {{t:pair|pary}} wobec dużego 3-betu {{t:fold|pasujesz}} nawet {{t:in-position}}: zarabiają głównie na trafieniu seta, a cena jest za wysoka. PokerCoaching dopuszcza ich {{t:call|sprawdzanie}} {{t:in-position}}." }
      - { text: "{{t:call|Sprawdzam}}, bo mam {{t:position|pozycję}}", why: "{{t:position|Pozycja}} pomaga, ale przy 3-becie do {{n:pf.3bet.oop-total}} cena jest za wysoka jak na rękę, która musi trafić seta." }
      - { text: "4-betuję", why: "{{t:pair|Para}} 33 nie jest ręką do 4-betu: ani wartość, ani dobry {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}} na {{n:pf.open-size}}, Button {{t:raise|przebił}} do {{n:pf.3bet.ip-total}}, blindy {{t:fold|spasowały}}. Co robisz?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4-betuję", correct: true, why: "Upswing 4-betuje QQ (i JJ) w zdecydowanej większości przypadków: Button kontynuuje wieloma słabszymi {{t:pair|parami}} i asami." }
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Też dobre zagranie: Deepfold umieszcza QQ w {{t:range|zakresie}} {{t:call|sprawdzenia}}, żeby nie wyrzucać słabszych rąk Buttona. Źródła się różnią, więc oba zagrania są dobre." }
      - { text: "{{t:fold|Pasuję}}", why: "QQ to trzecia najlepsza ręka preflop. {{t:fold|Pas}} jest dużym błędem." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "{{t:open|Otworzyłeś}} z {{t:cutoff|CO}} na {{n:pf.open-size}}, Button {{t:raise|przebił}} do {{n:pf.3bet.ip-total}}, blindy {{t:fold|spasowały}}. Co robisz?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Mocny as w kolorze to podstawa {{t:range|zakresu}} {{t:call|sprawdzenia}}: blokuje AA i AK, trafia kolory i dobre {{t:pair|pary}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno: AJs należy do najlepszych rąk do obrony przed 3-betem." }
      - { text: "4-betuję {{t:value|dla wartości}}", why: "AJs jest za słaby, żeby chcieć grać o cały stack. Lepsze ręce Buttona go zdominują." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "{{t:open|Otworzyłeś}} z Buttona na {{n:pf.open-size}}, {{t:small-blind}} {{t:raise|przebił}} do {{n:pf.3bet.oop-total}}, {{t:big-blind}} {{t:fold|spasował}}. Masz KK i chcesz 4-betować. Do ilu?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Do ok. {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|Z pozycją}} 4-bet ma ok. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-betu. Gdy {{t:small-blind}} {{t:call|sprawdzi}}, w {{t:pot|puli}} jest ok. {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (z martwym {{t:big-blind|dużym blindem}}), a w stackach zostaje ok. {{n:spr.4bet.high}}–{{n:spr.4bet}} razy tyle, ile jest w {{t:pot|puli}}." }
      - { text: "Do {{n:pf.4bet.too-small}}", why: "Za mało: dajesz rywalowi bardzo dobrą cenę na {{t:call}} {{t:out-of-position}}." }
      - { text: "All-in za {{n:format.stack}}", why: "Przy stackach {{n:format.stack}} all-in wypycha słabsze ręce, którymi rywal zapłaciłby 4-bet. Zarabiasz mniej." }
---
3-bet to odpowiedź rywala na twoje {{t:open}}. Masz trzy możliwości: {{t:fold|pasujesz}}, {{t:call|sprawdzasz}} albo {{t:raise|przebijasz}} jeszcze raz, czyli 4-betujesz.

:::note Skąd te zasady
Ta lekcja opiera się na literaturze (Deepfold, Upswing, PokerCoaching) i opublikowanych wynikach innych solverów (Poker Academy), nie na solverze aplikacji. W grze wobec 3-betu solver aplikacji jeszcze nie przeszedł walidacji, dlatego reguły są oznaczone jako heurystyki.
:::

## Ile kontynuować

Gdy Button {{t:raise|przebija}} twoje {{t:open}} z {{t:cutoff|CO}} do {{n:pf.3bet.ip-total}}, ryzykuje tyle, żeby wygrać {{n:vs3bet.win}}. Jeśli {{t:fold|pasujesz}} częściej niż {{n:alpha.vs-3bet-ip-size}}, jego 3-bet zarabia z każdą ręką. Musisz więc kontynuować co najmniej ok. {{n:mdf.vs-3bet-ip-size}} {{t:range|zakresu}} {{t:open|otwarcia}}.

Według rozwiązania solvera opublikowanego przez Poker Academy ({{t:cutoff|CO}} wobec 3-betu Buttona do {{n:pf.3bet.ip-total}}) {{t:open|otwierający}} {{t:fold|pasuje}} ok. {{n:pf.vs3bet.pa.fold}} {{t:open|otwarć}}, {{t:call|sprawdza}} ok. {{n:pf.vs3bet.pa.call}} i 4-betuje ok. {{n:pf.vs3bet.pa.4bet}}; uproszczone tabele Pailiku dają ok. {{n:pf.vs3bet.pailiku.fold}} / {{n:pf.vs3bet.pailiku.call}} / {{n:pf.vs3bet.pailiku.4bet}}. Przyjmujemy przedziały obejmujące oba źródła: {{t:fold}} ok. {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} ok. {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet ok. {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. Górna granica {{t:fold|pasów}} leży tuż pod progiem {{n:alpha.vs-3bet-ip-size}}: przy częstszym pasowaniu 3-bet Buttona zarabiałby z każdą ręką. Do {{t:call|sprawdzenia}} potrzebujesz ok. {{n:eq.call-3bet-ip-size}} equity: dopłacasz {{n:vs3bet.call}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:vs3bet.pot-after}}.

## {{t:out-of-position|Bez pozycji}} wybieraj ostrożnie

{{t:out-of-position|Bez pozycji}} {{t:call|sprawdzasz}} rękami, które dobrze grają po flopie: wysokimi kartami w kolorze (KQs, QJs), mocnymi asami w kolorze i średnimi oraz wysokimi {{t:pair|parami}}. Słabsze ręce w różnych kolorach, takie jak KJo, ATo czy QTo, często są zdominowane, więc je {{t:fold|pasujesz}}.

## {{t:in-position|Z pozycją}} bronisz szerzej

{{t:in-position|Z pozycją}} {{t:call|sprawdzasz}} także {{t:pair|pary}} od 66 do TT i {{t:connectors|łączniki}} w kolorze (T9s, 98s, 87s). Według Upswing najniższe {{t:pair|pary}} wobec dużego 3-betu {{t:fold|pasujesz}} nawet {{t:in-position}}: zarabiają głównie na trafieniu seta, a cena jest za wysoka. PokerCoaching dopuszcza ich {{t:call|sprawdzanie}} {{t:in-position}}.

## 4-bet

AA, KK i AK 4-betujesz {{t:value|dla wartości}}. QQ i JJ źródła grają różnie: Upswing głównie 4-betuje, Deepfold {{t:call|sprawdza}}. Jako {{t:bluff}} najlepsze są asy w kolorze, na przykład A5s: blokują AA i AK rywala, a po {{t:call|sprawdzeniu}} mają szansę na {{t:flush}} i {{t:straight|strita}}. Rozmiar 4-betu to ok. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-betu {{t:in-position}} i {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. Na przykład gdy z Buttona 4-betujesz 3-bet {{t:small-blind|małego blinda}} do {{n:pf.3bet.oop-total}} ({{t:big-blind}} {{t:fold|spasował}}), {{t:raise|przebijasz}} do {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; gdy z {{t:cutoff|CO}} 4-betujesz 3-bet Buttona do {{n:pf.3bet.ip-total}}, {{t:raise|przebijasz}} do ok. {{n:pf.4bet.oop-example.low}}. Po {{t:call|sprawdzeniu}} w stackach zostaje ok. {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} razy tyle, ile jest w {{t:pot|puli}}, więc dobre ręce łatwo wpłacą resztę.
