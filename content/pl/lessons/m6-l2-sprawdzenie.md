---
id: m6.l2
module: m6
order: 2
title: "Sprawdzić czy spasować"
sub: "Obrona przed c-betem bez pozycji"
rules: [R-M6-005, R-M6-006, R-M6-007, R-M6-003]
drills:
  - kind: choice
    id: m6.l2.q-price-third
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. W {{t:pot|puli}} jest {{n:ex.third.pot}}, Button {{t:bet|stawia}} c-bet {{n:ex.third.bet}}. Ile equity potrzebujesz do {{t:call|sprawdzenia}}?"
    table: { position: BB }
    options:
      - { text: "{{n:eq.bet-third}}", correct: true, why: "Dopłacasz {{n:ex.third.bet}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:ex.third.total}}: {{n:ex.third.bet}} ÷ {{n:ex.third.total}} = {{n:eq.bet-third}}. Mały c-bet daje bardzo dobrą cenę." }
      - { text: "{{n:alpha.bet-third}}", why: "To alpha: jak często {{t:bluff}} Buttona musi zadziałać. Do mianownika potrzebnego equity dolicz też swoje {{t:call}}." }
      - { text: "{{n:mdf.bet-third}}", why: "To {{t:mdf}}, czyli część {{t:range|zakresu}}, a nie equity jednej ręki. Na flopie {{t:out-of-position}} bronisz zresztą trochę mniej niż {{t:mdf}}." }
  - kind: numeric
    id: m6.l2.n-price-three-quarters
    family: m6.flop.price
    rules: [R-M6-005]
    prompt: "Flop. W {{t:pot|puli}} jest {{n:ex.pot}}, Button {{t:bet|stawia}} c-bet {{n:ex.bet.three-quarters}}. Ile procent equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz liczbę."
    table: { position: BB }
    answer: eq.bet-three-quarters
    explanation: "Dopłacasz {{n:ex.bet.three-quarters}} do {{t:pot|puli}}, która po {{t:call|sprawdzeniu}} ma {{n:ex.pot}} + {{n:ex.bet.three-quarters}} + {{n:ex.bet.three-quarters}}. {{n:ex.bet.three-quarters}} ÷ tę sumę = {{n:eq.bet-three-quarters}}. To prawie dwa razy więcej niż wobec c-betu 1/4 {{t:pot|puli}} ({{n:eq.bet-quarter}})."
  - kind: choice
    id: m6.l2.q-size-narrow
    family: m6.flop.size
    rules: [R-M6-005]
    prompt: "Ta sama ręka na tym samym flopie. Raz Button {{t:bet|stawia}} 1/3 {{t:pot|puli}}, raz całą {{t:pot|pulę}}. Jak zmienia się twoja obrona?"
    table: { position: BB }
    options:
      - { text: "Wobec całej {{t:pot|puli}} bronisz węższym {{t:range|zakresem}}", correct: true, why: "Większy bet to gorsza cena: potrzebne equity rośnie z {{n:eq.bet-third}} do {{n:eq.bet-pot}}, a {{t:mdf}} spada z {{n:mdf.bet-third}} do {{n:mdf.bet-pot}}. Najsłabsze ręce, które sprawdzały mały bet, teraz {{t:fold|pasujesz}}." }
      - { text: "Bronisz tak samo, bo to ta sama ręka", why: "Ręka ta sama, ale cena inna. Przy becie wielkości {{t:pot|puli}} potrzebujesz {{n:eq.bet-pot}} equity zamiast {{n:eq.bet-third}}." }
      - { text: "Wobec całej {{t:pot|puli}} bronisz szerzej, bo duży bet to częściej {{t:bluff}}", why: "Nie ma takiej reguły. Duży bet zwykle oznacza {{t:range}} {{t:polarized}} (bardzo silne ręce i {{t:bluff|blefy}}), a w każdym razie gorszą cenę dla ciebie." }
  - kind: choice
    id: m6.l2.q-middle-pair
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "7h 6h", board: "Kc 7d 2s", position: BB }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Środkowa {{t:pair}} wygrywa ze wszystkimi {{t:bluff|blefami}} Buttona (ręce bez {{t:pair|pary}}), a do {{t:call|sprawdzenia}} potrzebujesz tylko {{n:eq.bet-third}} equity. Standardowa obrona." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno. Wobec małego c-betu {{t:fold|pasujesz}} najsłabsze ręce bez {{t:pair|pary}} i bez {{t:draw|dobierania}}, a nie {{t:pair|parę}}." }
      - { text: "Check-raise", why: "Zwykle {{t:call|sprawdzasz}}. Po {{t:raise|przebiciu}} płacą ci głównie lepsze ręce i {{t:draw|dobierania}}; check-raise taką ręką to rzadkie zagranie solvera wobec małych c-betów." }
  - kind: choice
    id: m6.l2.q-bare-overcards
    family: m6.flop.fold
    rules: [R-M6-007]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 3/4 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Qd Jc", board: "7s 4h 2s", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Nie masz {{t:pair|pary}} ani {{t:draw|dobierania}} (żadnego pika, a {{t:straight}} jest daleko). Wobec dużego c-betu potrzebujesz {{n:eq.bet-three-quarters}} equity, a {{t:out-of-position}} rzadko dojdziesz z samymi wysokimi kartami do showdownu. {{t:pair|Para}} damy albo waleta też nie zawsze wygra." }
      - { text: "{{t:call|Sprawdzam}}", why: "Kusi, bo dama i walet są wyższe od stołu. Ale gołe wysokie karty to za mało przy takiej cenie: na turnie często dostaniesz kolejny bet i {{t:fold|spasujesz}}." }
      - { text: "Check-raise", why: "Do {{t:bluff|blefu}} lepiej nadają się ręce z {{t:draw|dobieraniem}}, które mają drugą drogę do wygranej. Ta ręka nie ma żadnej." }
  - kind: choice
    id: m6.l2.q-backdoor
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Qs Js", board: "7s 4h 2d", position: BB }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Dwie wysokie karty plus dodatkowe {{t:flush-draw}} (backdoor: trzy piki, potrzebujesz pika na turnie i na riverze). Przy cenie {{n:eq.bet-third}} to wystarczy do {{t:call|sprawdzenia}}." }
      - { text: "Check-raise", why: "Zwykle nie. Check-raise robisz głównie najsilniejszymi rękami i {{t:draw|dobieraniami}} ({{t:flush}}, {{t:oesd}}). Dodatkowe {{t:flush-draw}} jest słabe: gdy Button zapłaci, zwykle zostajesz z samymi wysokimi kartami. Tę rękę {{t:call|sprawdzasz}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno wobec małego c-betu. Dodatkowe {{t:draw}} i dwie wysokie karty dają dość equity przy cenie {{n:eq.bet-third}}." }
  - kind: choice
    id: m6.l2.q-gutshot-overcard
    family: m6.flop.call
    rules: [R-M6-006]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Kh 9h", board: "Jc Td 4s", position: BB }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Masz gutshot do {{t:straight|strita}} (dama) i króla wyższego od stołu. {{t:call|Sprawdzenie}} kupuje jedną kartę: gutshot trafisz na turnie w ok. {{n:odds.gutshot.flop-turn}}, a król dokłada kilka outów do {{t:top-pair|najwyższej pary}}. Razem to mniej niż cena {{n:eq.bet-third}}, ale po trafieniu {{t:straight|strita}} wygrasz więcej (implied odds), a sam król czasem wygrywa z {{t:bluff|blefami}} Buttona. Wobec małego c-betu to wystarcza do {{t:call|sprawdzenia}}." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ciasno: {{t:draw}} plus wysoka karta to wystarczająco dużo wobec małego c-betu." }
      - { text: "Check-raise all-in", why: "Ryzykujesz cały stack ręką, która jeszcze nic nie ma. Taki rozmiar wypycha słabsze ręce, a płacą tylko lepsze." }
  - kind: choice
    id: m6.l2.q-air-ak
    family: m6.flop.fold
    rules: [R-M6-006, R-M6-003]
    prompt: "Bronisz {{t:big-blind}} przeciw {{t:open|otwarciu}} Buttona. Na flopie {{t:check|czekasz}}, Button {{t:bet|stawia}} c-bet 1/3 {{t:pot|puli}}. Co robisz?"
    table: { hand: "Jd 9c", board: "Ah Ks 4s", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Nie masz {{t:pair|pary}} ani {{t:flush-draw|dobierania do koloru}}; masz tylko słabe dodatkowe {{t:straight-draw}} (potrzebujesz dwóch konkretnych kart), a żadna twoja karta nie jest wyższa od stołu. Na flopie z asem i królem Button ma dużo silnych rąk. Cena jest dobra, ale ta ręka prawie nigdy jej nie zrealizuje." }
      - { text: "{{t:call|Sprawdzam}}, bo {{t:mdf}} wynosi {{n:mdf.bet-third}}", why: "{{t:mdf}} to punkt odniesienia dla całego {{t:range|zakresu}}, a nie powód, żeby płacić najsłabszymi rękami. Na flopie {{t:out-of-position}} możesz bronić trochę mniej niż {{t:mdf}}." }
      - { text: "Check-raise", why: "Na flopie z asem i królem {{t:range-advantage}} jest po stronie Buttona, a ty nie masz {{t:draw|dobierania}}, które dawałoby drugą drogę do wygranej." }
  - kind: choice
    id: m6.l2.q-realize
    family: m6.flop.realize
    rules: [R-M6-003]
    prompt: "Dlaczego {{t:out-of-position}} nie {{t:call|sprawdzasz}} na flopie każdej ręki, której equity jest choć trochę wyższe od ceny?"
    table: { position: BB }
    options:
      - { text: "Bo nie zrealizujesz całego equity", correct: true, why: "Equity to szansa przy grze do showdownu bez dalszych {{t:bet|zakładów}}. {{t:out-of-position|Bez pozycji}} mówisz pierwszy na turnie i riverze i często {{t:fold|spasujesz}} na kolejny bet. Słabe ręce realizują wtedy mniej niż swoje equity." }
      - { text: "Bo Button na flopie zawsze ma silną rękę", why: "Button {{t:open|otwiera}} i c-betuje szeroko, także {{t:bluff|blefami}}. Problemem jest twoja {{t:position}}, nie jego siła." }
      - { text: "Bo trzeba oszczędzać {{t:chips}} na lepsze okazje", why: "Liczy się {{t:expected-value}} każdej decyzji, nie oszczędzanie {{t:chips|żetonów}}." }
---
W M5 grałeś c-bet jako {{t:aggressor}}. Teraz siedzisz po drugiej stronie: bronisz {{t:big-blind}}, czekasz na flopie, a Button {{t:bet|stawia}} c-bet. Pamiętaj z M5: c-bet to {{t:bet}} gracza, który {{t:raise|przebijał}} preflop, a {{t:range-advantage}} zależy od {{t:texture|tekstury}} flopu.

## Cena c-betu

Najpierw liczysz, ile equity potrzebujesz (wzór z M2). Mały c-bet daje świetną cenę, duży wyraźnie gorszą.

| C-bet Buttona | Potrzebne equity | {{t:mdf}} |
|---|---|---|
| 1/4 {{t:pot|puli}} | {{n:eq.bet-quarter}} | {{n:mdf.bet-quarter}} |
| 1/3 {{t:pot|puli}} | {{n:eq.bet-third}} | {{n:mdf.bet-third}} |
| 1/2 {{t:pot|puli}} | {{n:eq.bet-half}} | {{n:mdf.bet-half}} |
| 3/4 {{t:pot|puli}} | {{n:eq.bet-three-quarters}} | {{n:mdf.bet-three-quarters}} |
| Cała {{t:pot}} | {{n:eq.bet-pot}} | {{n:mdf.bet-pot}} |

{{t:mdf}} pokazuje kierunek: im większy bet, tym mniej rąk bronisz. Na flopie {{t:out-of-position}} możesz bronić trochę mniej niż {{t:mdf}}, bo {{t:bluff|blefy}} Buttona mają jeszcze equity, ale na mały c-bet nie {{t:fold|pasujesz}} masowo.

## {{t:out-of-position|Bez pozycji}} realizujesz mniej

Equity to szansa przy grze do końca bez dalszych {{t:bet|zakładów}}. {{t:out-of-position|Bez pozycji}} mówisz pierwszy na każdej {{t:street|ulicy}}, więc często {{t:fold|spasujesz}}, zanim zobaczysz showdown. Słabe ręce bez {{t:draw|dobierania}} realizują mniej, niż wynika z equity. Ręce w kolorze, {{t:connectors|łączniki}} i {{t:pair|pary}} realizują więcej, bo trafiają mocne układy albo już wygrywają.

## Czym {{t:call|sprawdzasz}}

Wobec małego c-betu (ok. 1/3 {{t:pot|puli}}) kontynuujesz:

- prawie każdą {{t:pair|parą}}, także środkową i najniższą,
- {{t:flush-draw|dobieraniami do koloru}} i {{t:straight|strita}}, także gutshotem z wysoką kartą,
- wysokimi kartami z dodatkowym {{t:draw|dobieraniem}} (backdoor), np. trzema kartami w jednym kolorze,
- zwykle także asem jako najwyższą kartą.

Pamiętaj z M2: {{t:call}} {{t:bet|zakładu}} na flopie kupuje jedną kartę, więc {{t:draw}} porównujesz z szansą na turnie. Ta szansa bywa trochę niższa od ceny małego c-betu. {{t:call|Sprawdzenie}} i tak się opłaca, gdy po trafieniu wygrasz więcej niż to, co jest teraz w {{t:pot|puli}} (to tzw. implied odds, policzysz je w M7), albo gdy ręka czasem wygrywa bez trafienia, np. dzięki wysokiej karcie.

## Czym {{t:fold|pasujesz}}

- rękami bez {{t:pair|pary}} i bez {{t:draw|dobierania}}, które nie mają asa ani kart wyższych od stołu; na flopach z asem {{t:fold|pasujesz}} ich więcej,
- zwykle dwiema wysokimi kartami bez {{t:draw|dobierania}}, gdy c-bet jest duży; {{t:call|sprawdzasz}} raczej wtedy, gdy masz dodatkowe {{t:draw}}, najlepiej do najwyższego {{t:flush|koloru}}.

Gdy c-bet rośnie, kolejne najsłabsze ręce przechodzą ze {{t:call|sprawdzenia}} do pasa.
