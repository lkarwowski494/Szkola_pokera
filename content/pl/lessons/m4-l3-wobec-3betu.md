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
    prompt: "Otworzyłeś z CO na {{n:pf.open-size}}, Button przebił do {{n:pf.3bet.ip-total}}, blindy spasowały. Jaką część zakresu otwarcia musisz co najmniej kontynuować (sprawdzić albo 4-betować), żeby Button nie zarabiał na 3-becie z każdą ręką?"
    table: { position: CO }
    options:
      - { text: "Ok. {{n:mdf.vs-3bet-ip-size}} zakresu otwarcia", correct: true, why: "Button ryzykuje {{n:pf.3bet.ip-total}}, żeby wygrać {{n:vs3bet.win}}. Jeśli pasujesz częściej niż {{n:alpha.vs-3bet-ip-size}}, jego 3-bet zarabia nawet z najgorszą ręką." }
      - { text: "Ok. połowy zakresu", why: "Mniej więcej tyle kontynuuje się w praktyce według Deepfold, ale minimum wynikające z matematyki jest niższe: {{n:mdf.vs-3bet-ip-size}}." }
      - { text: "Zawsze, każdą ręką", why: "Wtedy płacisz 3-bety rękami, które przegrywają z zakresem Buttona. Pas z najsłabszą częścią otwarcia jest poprawny." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Otworzyłeś z CO na {{n:pf.open-size}}, Button przebił do {{n:pf.3bet.ip-total}}, blindy spasowały. Co robisz?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "Pasuję", correct: true, why: "KJ w różnych kolorach bez pozycji często jest zdominowany przez AK, AJ i KQ, a po flopie trudno go rozegrać. PokerCoaching i Deepfold zalecają tu pas." }
      - { text: "Sprawdzam", why: "Kusi, bo to wysokie karty, ale bez pozycji ta ręka realizuje equity słabo i często przegrywa z lepszym kickerem." }
      - { text: "4-betuję", why: "KJo jest za słaby na 4-bet dla wartości, a jako blef nie blokuje rąk, którymi Button kontynuuje." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Otworzyłeś z CO na {{n:pf.open-size}}, Button przebił do {{n:pf.3bet.ip-total}}, blindy spasowały. Co robisz?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4-betuję", correct: true, why: "AK chce wpłacić stack: blokuje AA i KK rywala i dominuje AQ, KQ i słabsze asy." }
      - { text: "Sprawdzam", why: "Sprawdzenie nie jest złe, ale bez pozycji tracisz inicjatywę i wartość. Standard to 4-bet." }
      - { text: "Pasuję", why: "AK to jedna z najlepszych rąk preflop. Pas tu to duży błąd." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Otworzyłeś z Buttona na {{n:pf.open-size}}, mały blind spasował, duży blind przebił do {{n:pf.3bet.oop-total}}. Co robisz?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "Sprawdzam", correct: true, why: "Łącznik w kolorze z pozycją dobrze realizuje equity: trafia strity i kolory, a gdy chybi, łatwo go spasować na flopie." }
      - { text: "Pasuję", why: "Z pozycją ta ręka jest wystarczająco grywalna, żeby bronić. Pas byłby zbyt ciasny." }
      - { text: "4-betuję", why: "Jako blef lepiej nadają się asy w kolorze, bo blokują AA i AK. 87s woli zobaczyć flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "Otworzyłeś z Buttona na {{n:pf.open-size}}, mały blind spasował, duży blind przebił do {{n:pf.3bet.oop-total}}. Co robisz?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "Pasuję", correct: true, why: "Najniższe pary zarabiają głównie na trafieniu seta. Przy dużym 3-becie zysk z seta nie pokrywa ceny, więc Upswing i Deepfold zalecają tu pas. PokerCoaching dopuszcza sprawdzanie małych par z pozycją, ale przy takim rozmiarze cena jest wysoka." }
      - { text: "Sprawdzam, bo mam pozycję", why: "Pozycja pomaga, ale przy 3-becie do {{n:pf.3bet.oop-total}} cena jest za wysoka jak na rękę, która musi trafić seta." }
      - { text: "4-betuję", why: "Para 33 nie jest ręką do 4-betu: ani wartość, ani dobry blef." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "Otworzyłeś z CO na {{n:pf.open-size}}, Button przebił do {{n:pf.3bet.ip-total}}, blindy spasowały. Co robisz?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4-betuję", correct: true, why: "Upswing 4-betuje QQ (i JJ) w zdecydowanej większości przypadków: Button kontynuuje wieloma słabszymi parami i asami." }
      - { text: "Sprawdzam", correct: true, why: "Też dobre zagranie: Deepfold umieszcza QQ w zakresie sprawdzenia, żeby nie wyrzucać słabszych rąk Buttona. Źródła grają QQ różnie, więc to ręka mieszana." }
      - { text: "Pasuję", why: "QQ to trzecia najlepsza ręka preflop. Pas jest dużym błędem." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "Otworzyłeś z CO na {{n:pf.open-size}}, Button przebił do {{n:pf.3bet.ip-total}}, blindy spasowały. Co robisz?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "Sprawdzam", correct: true, why: "Mocny as w kolorze to podstawa zakresu sprawdzenia: blokuje AA i AK, trafia kolory i dobre pary." }
      - { text: "Pasuję", why: "Za ciasno: AJs należy do najlepszych rąk do obrony przed 3-betem." }
      - { text: "4-betuję dla wartości", why: "AJs jest za słaby, żeby chcieć grać o cały stack. Lepsze ręce Buttona go zdominują." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "Otworzyłeś z Buttona na {{n:pf.open-size}}, mały blind spasował, duży blind przebił do {{n:pf.3bet.oop-total}}. Masz KK i chcesz 4-betować. Do ilu?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "Do ok. {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "Z pozycją 4-bet ma ok. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-betu. Po sprawdzeniu w stackach zostaje ok. 1,5–2 razy tyle, ile jest w puli." }
      - { text: "Do {{n:pf.4bet.too-small}}", why: "Za mało: dajesz rywalowi bardzo dobrą cenę na sprawdzenie bez pozycji." }
      - { text: "All-in za {{n:format.stack}}", why: "Przy stackach {{n:format.stack}} all-in wypycha słabsze ręce, którymi rywal zapłaciłby 4-bet. Zarabiasz mniej." }
---
3-bet to odpowiedź rywala na twoje otwarcie. Masz trzy możliwości: pasujesz, sprawdzasz albo przebijasz jeszcze raz, czyli 4-betujesz.

:::note Skąd te zasady
Ta lekcja opiera się na literaturze (Deepfold, Upswing, PokerCoaching), nie na solverze aplikacji. W grze wobec 3-betu solver aplikacji jeszcze nie przeszedł walidacji, dlatego reguły są oznaczone jako heurystyki.
:::

## Ile kontynuować

Gdy Button przebija twoje otwarcie z CO do {{n:pf.3bet.ip-total}}, ryzykuje tyle, żeby wygrać {{n:vs3bet.win}}. Jeśli pasujesz częściej niż {{n:alpha.vs-3bet-ip-size}}, jego 3-bet zarabia z każdą ręką. Musisz więc kontynuować co najmniej ok. {{n:mdf.vs-3bet-ip-size}} zakresu otwarcia.

Deepfold podaje dla otwierającego wobec 3-betu z pozycją: pas ok. {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} otwarć, sprawdzenie ok. {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}} i 4-bet ok. {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. To na razie jedno źródło z liczbami, więc traktuj je jako orientacyjne. Do sprawdzenia potrzebujesz ok. {{n:eq.call-3bet-ip-size}} equity: dopłacasz {{n:vs3bet.call}} do puli, która po sprawdzeniu ma {{n:vs3bet.pot-after}}.

## Bez pozycji wybieraj ostrożnie

Bez pozycji sprawdzasz rękami, które dobrze grają po flopie: wysokimi kartami w kolorze (KQs, QJs), mocnymi asami w kolorze i średnimi oraz wysokimi parami. Słabsze ręce w różnych kolorach, takie jak KJo, ATo czy QTo, często są zdominowane, więc je pasujesz.

## Z pozycją bronisz szerzej

Z pozycją sprawdzasz także pary od 66 do TT i łączniki w kolorze (T9s, 98s, 87s). Według Upswing i Deepfold najniższe pary wobec dużego 3-betu pasujesz: zarabiają głównie na trafieniu seta, a cena jest za wysoka. PokerCoaching dopuszcza ich sprawdzanie z pozycją.

## 4-bet

AA, KK i AK 4-betujesz dla wartości. QQ i JJ źródła grają różnie: Upswing głównie 4-betuje, Deepfold sprawdza. Jako blef najlepsze są asy w kolorze, na przykład A5s: blokują AA i AK rywala, a po sprawdzeniu mają szansę na kolor i strita. Rozmiar 4-betu to ok. {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} 3-betu z pozycją i {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} bez pozycji. Po sprawdzeniu w stackach zostaje wtedy ok. 1,5–2 razy tyle, ile jest w puli.
