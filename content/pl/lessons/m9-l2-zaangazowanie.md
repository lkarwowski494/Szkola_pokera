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
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: w {{t:pot|puli}} {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz całą {{t:pot|pulę}} ({{n:ex.bet.pot}}), rywal idzie all-in. Dopłacasz {{n:commit.after-pot.call}}. Ile equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz liczbę w procentach."
    answer: eq.commit.after-pot
    explanation: "Przed nadwyżką rywala w {{t:pot|puli}} jest {{n:ex.pot.after-pot-call}} ({{t:pot}}, twój {{t:bet}} i jego wyrównanie). Dopłacasz {{n:commit.after-pot.call}}, więc potrzebne equity = {{n:commit.after-pot.call}} ÷ ({{n:ex.pot.after-pot-call}} + 2·{{n:commit.after-pot.call}}) = {{n:eq.commit.after-pot}}. Po takim {{t:bet|zakładzie}} jesteś zaangażowany: {{t:fold}} prawie nigdy się nie opłaca."
  - kind: numeric
    id: m9.l2.n-after-half
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}: w {{t:pot|puli}} {{n:ex.pot}}, stacki po {{n:commit.stack}}. Betujesz pół {{t:pot|puli}} ({{n:ex.bet.half}}), rywal idzie all-in. Dopłacasz {{n:commit.after-half.call}}. Ile equity potrzebujesz do {{t:call|sprawdzenia}}? Wpisz liczbę w procentach."
    answer: eq.commit.after-half
    explanation: "Przed nadwyżką rywala w {{t:pot|puli}} jest {{n:ex.half.total}} ({{t:pot}}, twój {{t:bet}} i jego wyrównanie). Dopłacasz {{n:commit.after-half.call}}: {{n:commit.after-half.call}} ÷ ({{n:ex.half.total}} + 2·{{n:commit.after-half.call}}) = {{n:eq.commit.after-half}}. Mniej niż przy all-inie od razu ({{n:eq.jam.spr2}}), bo część pieniędzy już włożyłeś."
  - kind: choice
    id: m9.l2.q-bet-fold
    family: m9.commit-math
    rules: [R-M9-004]
    prompt: "Flop, {{t:spr}} {{n:spr.commit}}. Masz {{t:top-pair|najwyższą parę}}, betujesz całą {{t:pot|pulę}}, rywal idzie all-in. Do {{t:call|sprawdzenia}} potrzebujesz {{n:eq.commit.after-pot}} equity. Co robisz?"
    table: { hand: "Ah Qd", board: "Qs 8c 4d" }
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Tak: cena jest bardzo dobra. Rywal przy niskim {{t:spr}} idzie all-in także z {{t:draw|drawami}} i słabszymi damami, więc {{t:top-pair}} z asem ma zwykle dużo więcej niż {{n:eq.commit.after-pot}} equity. Przegrywa wyraźnie tylko z {{t:two-pair|dwiema parami}} i setami." }
      - { text: "{{t:fold|Pasuję}}, bo all-in pokazuje silną rękę", why: "{{t:fold|Pas}} oddaje {{t:pot|pulę}}, do której już sporo włożyłeś. Wygrywać musisz tylko raz na pięć, czyli w {{n:eq.commit.after-pot}} przypadków. Jeśli zamierzałeś tu {{t:fold|pasować}}, lepiej było nie betować całej {{t:pot|puli}}." }
      - { text: "{{t:fold|Pasuję}}, bo {{t:spr}} jest niski", why: "Niski {{t:spr}} działa odwrotnie: przy nim łatwiej grać o cały stack, bo cena na all-in jest lepsza." }
  - kind: choice
    id: m9.l2.q-no-bet-fold
    family: m9.commit-plan
    rules: [R-M9-004]
    prompt: "Po twoim {{t:bet|zakładzie}} zostałoby ci w stacku mniej, niż wyniesie {{t:pot}} po jego {{t:call|sprawdzeniu}}. Jaki plan nie ma sensu?"
    options:
      - { text: "{{t:bet|Zakład}} i {{t:fold}}, gdy rywal pójdzie all-in", correct: true, why: "Tak, ten plan jest błędem: po takim {{t:bet|zakładzie}} do {{t:call|sprawdzenia}} all-inu potrzebujesz bardzo mało equity (przy {{t:spr}} {{n:spr.commit}} i {{t:bet|zakładzie}} wielkości {{t:pot|puli}} tylko {{n:eq.commit.after-pot}}). Jeśli i tak {{t:fold|spasujesz}}, {{t:bet}} tylko oddaje {{t:chips}}." }
      - { text: "All-in od razu", why: "To rozsądny plan z silną ręką: i tak grasz o cały stack, więc wpłacasz go od razu." }
      - { text: "{{t:check|Czekanie}}", why: "Też rozsądne, gdy nie chcesz grać o cały stack: nie wkładasz pieniędzy, z którymi potem trudno byłoby {{t:fold|spasować}}." }
  - kind: choice
    id: m9.l2.q-tp-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pula}} po 4-becie, {{t:spr}} ok. {{n:spr.4bet}}. Trafiłeś {{t:top-pair|najwyższą parę}} z najlepszym kickerem. Jaki plan?"
    table: { hand: "As Kd", board: "Kh 8c 3s", position: BTN }
    options:
      - { text: "Gram o cały stack", correct: true, why: "Tak: przy {{t:spr}} ok. {{n:spr.4bet}} na all-in potrzebujesz tylko ok. {{n:eq.jam.4bet}} equity, a {{t:top-pair}} z asem jest tu bardzo silna. Betujesz albo {{t:call|sprawdzasz}} z planem wpłacenia wszystkiego." }
      - { text: "Gram ostrożnie i {{t:fold|pasuję}} na duży {{t:bet}}", why: "Przy tak niskim {{t:spr}} {{t:fold}} {{t:top-pair|najwyższą parą}} oddaje za dużo. Rywal po 4-becie ma też AQ, QQ, JJ i inne ręce, które przegrywają z twoją." }
      - { text: "Betuję mało i {{t:fold|pasuję}} na all-in", why: "To plan {{t:bet}} i {{t:fold}} przy niskim {{t:spr}}: po {{t:bet|zakładzie}} cena na all-in będzie jeszcze lepsza, a {{t:fold}} oddaje {{t:pot|pulę}}, do której już włożyłeś." }
  - kind: choice
    id: m9.l2.q-why-rule
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "Dlaczego przy {{t:spr}} ok. {{n:spr.commit}} {{t:top-pair}} zwykle gra o cały stack?"
    options:
      - { text: "Bo na all-in potrzebujesz ok. {{n:eq.jam.spr2}} equity, a dwa {{t:bet|zakłady}} po ok. {{n:geo.spr2.2}} {{t:pot|puli}} wpłacają cały stack", correct: true, why: "Tak: cena jest dobra, a do wpłacenia stacku wystarczą dwie {{t:value|ulice wartości}}. Tyle {{t:top-pair}} zwykle zniesie. Sam próg to heurystyka: liczy się też, czym rywal gra." }
      - { text: "Bo {{t:top-pair}} zawsze wygrywa", why: "Nie zawsze: czasem rywal ma {{t:two-pair}} albo seta. Przy niskim {{t:spr}} gorsze ręce i {{t:draw|drawy}} wpłacają jednak dość pieniędzy, a cena jest dobra." }
      - { text: "Bo przy {{t:spr}} {{n:spr.commit}} zasady nie pozwalają {{t:fold|spasować}}", why: "{{t:fold|Spasować}} możesz zawsze. Chodzi o to, że {{t:fold}} zwykle kosztuje więcej, niż daje: na all-in potrzebujesz tylko ok. {{n:eq.jam.spr2}} equity." }
  - kind: choice
    id: m9.l2.q-tp-srp
    family: m9.commit-plan
    rules: [R-M9-005]
    prompt: "{{t:pot|Pula}} z jednym podbiciem, stacki po {{n:format.stack}}, {{t:spr}} ok. {{n:spr.srp}}. Trafiłeś {{t:top-pair|najwyższą parę}} z dobrym kickerem. Jak traktujesz tę rękę?"
    table: { hand: "Kh Qc", board: "Ks 7d 2c", position: BTN }
    options:
      - { text: "Jako rękę na wartość, ale zwykle nie na cały stack", correct: true, why: "Tak: przy {{t:spr}} ok. {{n:spr.srp}} cały stack wchodzi dopiero po kilku {{t:bet|zakładach}} większych niż {{t:pot}}. Rywal, który tyle wpłaci, rzadko ma rękę gorszą niż jedna {{t:pair}}." }
      - { text: "Gram o cały stack, bo {{t:top-pair}} jest silna", why: "Przy {{t:spr}} {{n:spr.commit}} tak, ale tu {{t:spr}} jest ok. {{n:spr.srp}}. Gdy w {{t:pot|puli}} jest cały stack, rywal zwykle ma {{t:two-pair}}, seta albo lepszą {{t:pair|parę}}." }
      - { text: "{{t:fold|Pasuję}} na pierwszy {{t:bet}} rywala", why: "Za ostrożnie: {{t:top-pair}} z dobrym kickerem to silna ręka na tym flopie. Chodzi o to, żeby nie budować z nią {{t:pot|puli}} na cały stack, a nie o {{t:fold}}." }
  - kind: choice
    id: m9.l2.q-underpair-4bet
    family: m9.commit-plan
    rules: [R-M9-003]
    prompt: "{{t:pot|Pula}} po 4-becie, {{t:spr}} ok. {{n:spr.4bet}}. Masz {{t:pair|parę}} waletów, a na flopie są as i król. Rywal idzie all-in. Co z regułą „przy niskim {{t:spr}} gram o stack”?"
    table: { hand: "Jc Jd", board: "Ah Kd 5s" }
    options:
      - { text: "Nie obejmuje tej ręki: to {{t:pair}} niższa niż obie wysokie karty {{t:board|stołu}}", correct: true, why: "Tak: reguła mówi o {{t:top-pair|najwyższej parze}} i lepszych rękach. Po 4-becie rywal często ma asa albo króla, a twoje walety przegrywają z każdą {{t:pair|parą}} z wysokiej karty. Tu częściej {{t:fold|pasujesz}}, mimo dobrej ceny ({{n:eq.jam.4bet}})." }
      - { text: "Obejmuje: przy niskim {{t:spr}} {{t:call|sprawdzam}} wszystkim", why: "Niski {{t:spr}} daje dobrą cenę, ale nie zamienia słabej ręki w silną. Gdy rywal często ma lepszą {{t:pair|parę}}, nawet {{n:eq.jam.4bet}} equity może być za dużo." }
      - { text: "Obejmuje, ale tylko wtedy, gdy mam {{t:position|pozycję}}", why: "{{t:position|Pozycja}} nie zmienia tego, z czym grasz. Reguła dotyczy {{t:top-pair|najwyższej pary}} i lepszych rąk." }
---
Zaangażowanie (ang. commitment) to sytuacja, w której w {{t:pot|puli}} jest już tyle pieniędzy względem twojego stacku, że {{t:fold}} na all-in prawie nigdy się nie opłaca. {{t:spr}} z poprzedniej lekcji mówi, jak blisko tego jesteś już na początku flopu.

## Po {{t:bet|zakładzie}} cena jest jeszcze lepsza

Przykład: {{t:spr}} {{n:spr.commit}}, w {{t:pot|puli}} {{n:ex.pot}}, stacki po {{n:commit.stack}}. Jeśli rywal idzie all-in od razu, potrzebujesz {{n:eq.jam.spr2}} equity. Jeśli najpierw ty betujesz, potrzebujesz mniej:

| Twój {{t:bet}} przed all-inem rywala | Dopłata | Potrzebne equity |
|---|---|---|
| Brak (rywal od razu all-in) | {{n:commit.stack}} | {{n:eq.jam.spr2}} |
| Pół {{t:pot|puli}} ({{n:ex.bet.half}}) | {{n:commit.after-half.call}} | {{n:eq.commit.after-half}} |
| Cała {{t:pot}} ({{n:ex.bet.pot}}) | {{n:commit.after-pot.call}} | {{n:eq.commit.after-pot}} |

## Nie planuj {{t:bet|zakładu}} i {{t:fold|pasu}}

Jeśli po twoim {{t:bet|zakładzie}} zostałoby ci w stacku mniej, niż wyniesie {{t:pot}} po jego {{t:call|sprawdzeniu}}, {{t:bet}} i {{t:fold}} na all-in prawie nigdy nie ma sensu: do {{t:call|sprawdzenia}} all-inu potrzebujesz wtedy mniej niż {{n:eq.bet-pot}} equity. Masz dwie rozsądne drogi: grasz o cały stack (betujesz albo idziesz all-in) albo {{t:check|czekasz}}.

## Niski {{t:spr}}: {{t:top-pair}} gra o stack

Reguła: **przy {{t:spr}} na flopie niższym niż ok. {{n:spr.zone.low}} {{t:top-pair}} i lepsze ręce zwykle grają o cały stack** (strefy {{t:spr}} z poprzedniej lekcji). Przykład {{t:spr}} {{n:spr.commit}} leży w tej strefie, a rachunek przy nim wspiera regułę:

- na all-in potrzebujesz najwyżej ok. {{n:eq.jam.spr2}} equity, a po własnym {{t:bet|zakładzie}} jeszcze mniej,
- dwa {{t:bet|zakłady}} po ok. {{n:geo.spr2.2}} {{t:pot|puli}} wpłacają cały stack: przy {{t:pot|puli}} {{n:ex.pot}} to {{n:geo.spr2.flop}} na flopie i {{n:geo.spr2.turn}} na turnie, razem {{n:geo.spr2.total}},
- {{t:top-pair}} zwykle zniesie dwie {{t:value|ulice wartości}} (lekcja o planie na trzy {{t:street|ulice}}).

Rachunek nie wyznacza jednak dokładnego progu. Czy {{t:top-pair}} ma dość equity, zależy od tego, czym rywal gra. Dlatego to heurystyka, a nie twarde prawo. Reguła dotyczy {{t:top-pair|najwyższej pary}} i lepszych rąk: {{t:pair}} niższa niż wysokie karty na {{t:board|stole}} jej nie spełnia.

## Wysoki {{t:spr}}: jedna {{t:pair}} ostrożniej

W {{t:pot|puli}} z jednym podbiciem {{t:spr}} wynosi ok. {{n:spr.srp}}. Żeby wpłacić cały stack do rivera, trzeba by betować więcej niż {{t:pot|pulę}} na każdej {{t:street|ulicy}} (lekcja o rozmiarze geometrycznym). Rywal, który wpłaca tyle pieniędzy, rzadko ma rękę gorszą niż jedna {{t:pair}}. Dlatego z jedną {{t:pair|parą}} w takiej {{t:pot|puli}} grasz na wartość, ale zwykle nie planujesz gry o cały stack.

:::note Skąd te zasady
Granica ok. {{n:spr.zone.low}} pochodzi ze SplitSuit i z analizy solvera GTO Wizard (przy {{t:spr}} ok. {{n:spr.commit}} każda {{t:top-pair}} i lepsza ręka gra o stack). Ostrożność z jedną {{t:pair|parą}} przy wysokim {{t:spr}} potwierdzają GTO Wizard i Upswing. Liczby ceny i rozmiarów w tej lekcji to czysta matematyka.
:::
