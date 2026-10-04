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
    id: m9.l2.n-after-small
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, SPR {{n:spr.commit}}: w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz {{n:cbet.ex.small}} (1/3 puli), rywal idzie all-in. Dopłacasz ok. {{n:commit.after-small.call}}. Ile equity potrzebujesz do sprawdzenia? Wpisz liczbę w procentach."
    answer: eq.commit.after-small
    explanation: "Przed nadwyżką rywala w puli jest ok. {{n:commit.after-small.pot}}. Dopłacasz ok. {{n:commit.after-small.call}}: {{n:commit.after-small.call}} ÷ ({{n:commit.after-small.pot}} + 2·{{n:commit.after-small.call}}) ≈ {{n:eq.commit.after-small}}. Mniej niż przy all-inie od razu ({{n:eq.jam.spr2}}), bo część pieniędzy już włożyłeś."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, SPR {{n:spr.commit}}. Masz top parę, betujesz całą pulę, rywal idzie all-in. Do sprawdzenia potrzebujesz {{n:eq.commit.after-pot}} equity. Co robisz?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "Sprawdzam", correct: true, why: "Tak: cena jest bardzo dobra. Rywal przy niskim SPR idzie all-in także z dobieraniami i słabszymi damami, więc top para z asem ma zwykle dużo więcej niż {{n:eq.commit.after-pot}} equity. Przegrywa wyraźnie tylko z dwiema parami i setami." }
      - { text: "Pasuję, bo all-in pokazuje silną rękę", why: "Pas oddaje pulę, do której już sporo włożyłeś. Wygrywać musisz tylko raz na pięć, czyli w {{n:eq.commit.after-pot}} przypadków. Jeśli zamierzałeś tu pasować, lepiej było nie betować całej puli." }
      - { text: "Pasuję, bo SPR jest niski", why: "Niski SPR działa odwrotnie: przy nim łatwiej grać o cały stack, bo cena na all-in jest lepsza." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Po twoim zakładzie zostałoby ci w stacku mniej niż pula. Jaki plan nie ma sensu?"
    options:
      - { text: "Zakład i pas, gdy rywal pójdzie all-in", correct: true, why: "Tak, ten plan jest błędem: po takim zakładzie do sprawdzenia all-inu potrzebujesz bardzo mało equity (przy SPR {{n:spr.commit}} i zakładzie wielkości puli tylko {{n:eq.commit.after-pot}}). Jeśli i tak spasujesz, zakład tylko oddaje żetony." }
      - { text: "All-in od razu", why: "To rozsądny plan z silną ręką: i tak grasz o cały stack, więc wpłacasz go od razu." }
      - { text: "Czekanie", why: "Też rozsądne, gdy nie chcesz grać o cały stack: nie wkładasz pieniędzy, z którymi potem trudno byłoby spasować." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Trafiłeś top parę z najlepszym kickerem. Jaki plan?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Gram o cały stack", correct: true, why: "Tak: przy SPR ok. {{n:spr.4bet}} na all-in potrzebujesz tylko ok. {{n:eq.jam.4bet}} equity, a top para z asem jest tu bardzo silna. Betujesz albo sprawdzasz z planem wpłacenia wszystkiego." }
      - { text: "Gram ostrożnie i pasuję na duży zakład", why: "Przy tak niskim SPR pas top parą oddaje za dużo. Rywal po 4-becie ma też AQ, QQ, JJ i inne ręce, które przegrywają z twoją." }
      - { text: "Betuję mało i pasuję na all-in", why: "To plan zakład i pas przy niskim SPR: po zakładzie cena na all-in będzie jeszcze lepsza, a pas oddaje pulę, do której już włożyłeś." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Dlaczego przy SPR ok. {{n:spr.commit}} top para zwykle gra o cały stack?"
    options:
      - { text: "Bo na all-in potrzebujesz ok. {{n:eq.jam.spr2}} equity, a dwa zakłady po ok. {{n:geo.spr2.2}} puli wpłacają cały stack", correct: true, why: "Tak: cena jest dobra, a do wpłacenia stacku wystarczą dwie ulice wartości. Tyle top para zwykle zniesie. Sam próg to heurystyka: liczy się też, czym rywal gra." }
      - { text: "Bo top para zawsze wygrywa", why: "Nie zawsze: czasem rywal ma dwie pary albo seta. Przy niskim SPR gorsze ręce i dobierania wpłacają jednak dość pieniędzy, a cena jest dobra." }
      - { text: "Bo przy SPR {{n:spr.commit}} zasady nie pozwalają spasować", why: "Spasować możesz zawsze. Chodzi o to, że pas zwykle kosztuje więcej, niż daje: na all-in potrzebujesz tylko ok. {{n:eq.jam.spr2}} equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "Pula z jednym podbiciem, stacki po {{n:format.stack}}, SPR ok. {{n:spr.srp}}. Trafiłeś top parę z dobrym kickerem. Jak traktujesz tę rękę?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Jako rękę na wartość, ale zwykle nie na cały stack", correct: true, why: "Tak: przy SPR ok. {{n:spr.srp}} cały stack wchodzi dopiero po kilku zakładach większych niż pula. Rywal, który tyle wpłaci, rzadko ma rękę gorszą niż jedna para." }
      - { text: "Gram o cały stack, bo top para jest silna", why: "Przy SPR {{n:spr.commit}} tak, ale tu SPR jest ok. {{n:spr.srp}}. Gdy w puli jest cały stack, rywal zwykle ma dwie pary, seta albo lepszą parę." }
      - { text: "Pasuję na pierwszy zakład rywala", why: "Za ostrożnie: top para z dobrym kickerem to silna ręka na tym flopie. Chodzi o to, żeby nie budować z nią puli na cały stack, a nie o pas." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Pula po 4-becie, SPR ok. {{n:spr.4bet}}. Masz parę waletów, a na flopie są as i król. Rywal idzie all-in. Co z regułą „przy niskim SPR gram o stack”?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Nie obejmuje tej ręki: to para niższa niż obie wysokie karty stołu", correct: true, why: "Tak: reguła mówi o top parze i lepszych rękach. Po 4-becie rywal często ma asa albo króla, a twoje walety przegrywają z każdą parą z wysokiej karty. Tu częściej pasujesz, mimo dobrej ceny ({{n:eq.jam.4bet}})." }
      - { text: "Obejmuje: przy niskim SPR sprawdzam wszystkim", why: "Niski SPR daje dobrą cenę, ale nie zamienia słabej ręki w silną. Gdy rywal często ma lepszą parę, nawet {{n:eq.jam.4bet}} equity może być za dużo." }
      - { text: "Obejmuje, ale tylko wtedy, gdy mam pozycję", why: "Pozycja nie zmienia tego, z czym grasz. Reguła dotyczy top pary i lepszych rąk." }
---
Zaangażowanie (ang. commitment) to sytuacja, w której w puli jest już tyle pieniędzy względem twojego stacku, że pas na all-in prawie nigdy się nie opłaca. SPR z poprzedniej lekcji mówi, jak blisko tego jesteś już na początku flopu.

## Po zakładzie cena jest jeszcze lepsza

Przykład: SPR {{n:spr.commit}}, w puli {{n:ex.pot}}, stacki po {{n:commit.stack}}. Jeśli rywal idzie all-in od razu, potrzebujesz {{n:eq.jam.spr2}} equity. Jeśli najpierw ty betujesz, potrzebujesz mniej:

| Twój zakład przed all-inem rywala | Dopłata | Potrzebne equity |
|---|---|---|
| Brak (rywal od razu all-in) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| 1/3 puli ({{n:cbet.ex.small}}) | {{n:commit.after-small.call}} | {{n:eq.commit.after-small}} |
| Cała pula ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Nie planuj zakładu i pasu

Jeśli po twoim zakładzie zostałoby ci w stacku mniej niż pula, zakład i pas na all-in prawie nigdy nie ma sensu. Masz wtedy dwie rozsądne drogi: grasz o cały stack (betujesz albo idziesz all-in) albo czekasz.

## Reguła SPR ok. {{n:spr.commit}}

Program kursu podaje regułę: **przy SPR ok. {{n:spr.commit}} top para i lepsze ręce grają o cały stack**. Rachunek ją wspiera:

- na all-in potrzebujesz najwyżej ok. {{n:eq.jam.spr2}} equity, a po własnym zakładzie jeszcze mniej,
- dwa zakłady po ok. {{n:geo.spr2.2}} puli wpłacają cały stack: przy puli {{n:ex.pot}} to {{n:geo.spr2.flop}} na flopie i {{n:geo.spr2.turn}} na turnie, razem {{n:geo.spr2.total}},
- top para zwykle zniesie dwie ulice wartości (lekcja o planie na trzy ulice).

Rachunek nie wyznacza jednak dokładnego progu. Czy top para ma dość equity, zależy od tego, czym rywal gra. Dlatego to heurystyka, a nie twarde prawo. Reguła dotyczy top pary i lepszych rąk: para niższa niż wysokie karty na stole jej nie spełnia.

## Wysoki SPR: jedna para ostrożniej

W puli z jednym podbiciem SPR wynosi ok. {{n:spr.srp}}. Żeby wpłacić cały stack do rivera, trzeba by betować więcej niż pulę na każdej ulicy (lekcja o rozmiarze geometrycznym). Rywal, który wpłaca tyle pieniędzy, rzadko ma rękę gorszą niż jedna para. Dlatego z jedną parą w takiej puli grasz na wartość, ale zwykle nie planujesz gry o cały stack.

:::note Heurystyka do sprawdzenia
Próg „SPR ok. {{n:spr.commit}}” pochodzi z programu kursu, a podział na niski i wysoki SPR z artykułów znanych tylko ze streszczeń. Liczby ceny i rozmiarów w tej lekcji to czysta matematyka.
:::
