---
id: m9.l2
module: m9
order: 2
title: "Zaangażowanie"
sub: "Kiedy grasz o cały stack"
rules: [R-M9-003, R-M9-004, R-M9-005]
drills:
  - kind: numeric
    id: m9.l2.n-after-pot
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, SPR {{n:spr.commit}}: w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz całą pulę ({{n:ex.bet.pot}}), rywal idzie all-in. Dopłacasz {{n:commit.after-pot.call}}. Ile equity potrzebujesz do sprawdzenia? Wpisz liczbę w procentach."
    answer: eq.commit.after-pot
    explanation: "Przed nadwyżką rywala w puli jest {{n:ex.pot.after-pot-call}} (pula, twój zakład i jego wyrównanie). Dopłacasz {{n:commit.after-pot.call}}, więc potrzebne equity = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Po takim zakładzie jesteś zaangażowany: pas prawie nigdy się nie opłaca."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, SPR {{n:spr.commit}}: w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz pół puli ({{n:ex.bet.half}}), rywal idzie all-in. Dopłacasz {{n:commit.after-half.call}}. Ile equity potrzebujesz do sprawdzenia? Wpisz liczbę w procentach."
    answer: eq.commit.after-half
    explanation: "Przed nadwyżką rywala w puli jest {{n:ex.half.total}} (pula, twój zakład i jego wyrównanie). Dopłacasz {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Mniej niż przy all-inie od razu ({{n:eq.jam.spr2}}), bo część pieniędzy już włożyłeś."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, SPR {{n:spr.commit}}. Masz najwyższą parę, betujesz całą pulę, rywal idzie all-in. Do sprawdzenia potrzebujesz {{n:eq.commit.after-pot}} equity. Co robisz?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Tak: cena jest bardzo dobra. Rywal przy niskim SPR idzie all-in także z dobieraniami i słabszymi damami, więc najwyższa para z asem ma zwykle dużo więcej niż {{n:eq.commit.after-pot}} equity. Przegrywa wyraźnie tylko z dwiema parami i setami." }
      - { text: "Pasuję, bo all-in pokazuje silną rękę", why: "Pas oddaje pulę, do której już sporo włożyłeś. Wygrywać musisz tylko raz na pięć, czyli w {{n:eq.commit.after-pot}} przypadków. Jeśli zamierzałeś tu pasować, lepiej było nie betować całej puli." }
      - { text: "Pasuję, bo SPR jest niski", why: "Niski SPR działa odwrotnie: przy nim łatwiej grać o cały stack, bo cena na all-in jest lepsza." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Po twoim zakładzie zostałoby ci w stacku mniej, niż wyniesie pula po jego sprawdzeniu. Jaki plan nie ma sensu?"
    options:
      - { text: "Zakład i pas, gdy rywal pójdzie all-in", correct: true, why: "Tak, ten plan jest błędem: po takim zakładzie do sprawdzenia all-inu potrzebujesz bardzo mało equity (przy SPR {{n:spr.commit}} i zakładzie wielkości puli tylko {{n:eq.commit.after-pot}}). Jeśli i tak spasujesz, zakład tylko oddaje żetony." }
      - { text: "All-in od razu", why: "To rozsądny plan z silną ręką: i tak grasz o cały stack, więc wpłacasz go od razu." }
      - { text: "Czekanie", why: "Też rozsądne, gdy nie chcesz grać o cały stack: nie wkładasz pieniędzy, z którymi potem trudno byłoby spasować." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Trafiłeś najwyższą parę z najlepszym kickerem. Jaki plan?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Gram o cały stack", correct: true, why: "Tak: przy SPR ok. {{n:spr.4bet}} na all-in potrzebujesz tylko ok. {{n:eq.jam.4bet}} equity, a najwyższa para z asem jest tu bardzo silna. Betujesz albo sprawdzasz z planem wpłacenia wszystkiego." }
      - { text: "Gram ostrożnie i pasuję na duży zakład", why: "Przy tak niskim SPR pas najwyższą parą oddaje za dużo. Rywal po 4-becie ma też AQ, QQ, JJ i inne ręce, które przegrywają z twoją." }
      - { text: "Betuję mało i pasuję na all-in", why: "To plan zakład i pas przy niskim SPR: po zakładzie cena na all-in będzie jeszcze lepsza, a pas oddaje pulę, do której już włożyłeś." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Dlaczego przy SPR ok. {{n:spr.commit}} najwyższa para zwykle gra o cały stack?"
    options:
      - { text: "Bo na all-in potrzebujesz ok. {{n:eq.jam.spr2}} equity, a dwa zakłady po ok. {{n:geo.spr2.2}} puli wpłacają cały stack", correct: true, why: "Tak: cena jest dobra, a do wpłacenia stacku wystarczą dwie ulice wartości. Tyle najwyższa para zwykle zniesie. Sam próg to heurystyka: liczy się też, czym rywal gra." }
      - { text: "Bo najwyższa para zawsze wygrywa", why: "Nie zawsze: czasem rywal ma dwie pary albo seta. Przy niskim SPR gorsze ręce i dobierania wpłacają jednak dość pieniędzy, a cena jest dobra." }
      - { text: "Bo przy SPR {{n:spr.commit}} zasady nie pozwalają spasować", why: "Spasować możesz zawsze. Chodzi o to, że pas zwykle kosztuje więcej, niż daje: na all-in potrzebujesz tylko ok. {{n:eq.jam.spr2}} equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "Pula z jednym podbiciem, stacki po {{n:format.stack}}, SPR ok. {{n:spr.srp}}. Trafiłeś najwyższą parę z dobrym kickerem. Jak traktujesz tę rękę?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Jako rękę na wartość, ale zwykle nie na cały stack", correct: true, why: "Tak: przy SPR ok. {{n:spr.srp}} cały stack wchodzi dopiero po kilku zakładach większych niż pula. Rywal, który tyle wpłaci, rzadko ma rękę gorszą niż jedna para." }
      - { text: "Gram o cały stack, bo najwyższa para jest silna", why: "Przy SPR {{n:spr.commit}} tak, ale tu SPR jest ok. {{n:spr.srp}}. Gdy w puli jest cały stack, rywal zwykle ma dwie pary, seta albo lepszą parę." }
      - { text: "Pasuję na pierwszy zakład rywala", why: "Za ostrożnie: najwyższa para z dobrym kickerem to silna ręka na tym flopie. Chodzi o to, żeby nie budować z nią puli na cały stack, a nie o pas." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Masz parę waletów, a na flopie są as i król. Rywal idzie all-in. Co z regułą „przy niskim SPR gram o stack”?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Nie obejmuje tej ręki: to para niższa niż obie wysokie karty stołu", correct: true, why: "Tak: reguła mówi o najwyższej parze i lepszych rękach. Po 4-becie rywal często ma asa albo króla, a twoje walety przegrywają z każdą parą z wysokiej karty. Tu częściej pasujesz, mimo dobrej ceny ({{n:eq.jam.4bet}})." }
      - { text: "Obejmuje: przy niskim SPR sprawdzam wszystkim", why: "Niski SPR daje dobrą cenę, ale nie zamienia słabej ręki w silną. Gdy rywal często ma lepszą parę, nawet {{n:eq.jam.4bet}} equity może być za dużo." }
      - { text: "Obejmuje, ale tylko wtedy, gdy mam pozycję", why: "Pozycja nie zmienia tego, z czym grasz. Reguła dotyczy najwyższej pary i lepszych rąk." }
---
Zaangażowanie (ang. commitment) to sytuacja, w której w puli jest już tyle pieniędzy względem twojego stacku, że pas na all-in prawie nigdy się nie opłaca. SPR z poprzedniej lekcji mówi, jak blisko tego jesteś już na początku flopu.

## Po zakładzie cena jest jeszcze lepsza

Przykład: SPR {{n:spr.commit}}, w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Jeśli rywal idzie all-in od razu, potrzebujesz {{n:eq.jam.spr2}} equity. Jeśli najpierw ty betujesz, potrzebujesz mniej:

| Twój zakład przed all-inem rywala | Dopłata | Potrzebne equity |
|---|---|---|
| Brak (rywal od razu all-in) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Pół puli ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Cała pula ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Nie planuj zakładu i pasu

Jeśli po twoim zakładzie zostałoby ci w stacku mniej, niż wyniesie pula po jego sprawdzeniu, zakład i pas na all-in prawie nigdy nie ma sensu: do sprawdzenia all-inu potrzebujesz wtedy mniej niż {{n:eq.bet-pot}} equity. Masz dwie rozsądne drogi: grasz o cały stack (betujesz albo idziesz all-in) albo czekasz.

## Niski SPR: najwyższa para gra o stack

Reguła: **przy SPR na flopie niższym niż ok. {{n:spr.zone.low}} najwyższa para i lepsze ręce zwykle grają o cały stack** (strefy SPR z poprzedniej lekcji). Przykład SPR {{n:spr.commit}} leży w tej strefie, a rachunek przy nim wspiera regułę:

- na all-in potrzebujesz najwyżej ok. {{n:eq.jam.spr2}} equity, a po własnym zakładzie jeszcze mniej,
- dwa zakłady po ok. {{n:geo.spr2.2}} puli wpłacają cały stack: przy puli {{n:ex.pot}} to {{n:geo.spr2.flop}} na flopie i {{n:geo.spr2.turn}} na turnie, razem {{n:geo.spr2.total}},
- najwyższa para zwykle zniesie dwie ulice wartości (lekcja o planie na trzy ulice).

Rachunek nie wyznacza jednak dokładnego progu. Czy najwyższa para ma dość equity, zależy od tego, czym rywal gra. Dlatego to heurystyka, a nie twarde prawo. Reguła dotyczy najwyższej pary i lepszych rąk: para niższa niż wysokie karty na stole jej nie spełnia.

## Wysoki SPR: jedna para ostrożniej

W puli z jednym podbiciem SPR wynosi ok. {{n:spr.srp}}. Żeby wpłacić cały stack do rivera, trzeba by betować więcej niż pulę na każdej ulicy (lekcja o rozmiarze geometrycznym). Rywal, który wpłaca tyle pieniędzy, rzadko ma rękę gorszą niż jedna para. Dlatego z jedną parą w takiej puli grasz na wartość, ale zwykle nie planujesz gry o cały stack.

:::note Skąd te zasady
Granica ok. {{n:spr.zone.low}} pochodzi ze SplitSuit i z analizy solvera GTO Wizard (przy SPR ok. {{n:spr.commit}} każda najwyższa para i lepsza ręka gra o stack). Ostrożność z jedną parą przy wysokim SPR potwierdzają GTO Wizard i Upswing. Liczby ceny i rozmiarów w tej lekcji to czysta matematyka.
:::
