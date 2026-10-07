---
id: m10.l2
module: m10
order: 2
title: "Typy graczy"
sub: "Nit, reg, gracz pasywny, maniak"
rules: [R-M10-004, R-M10-005, R-M10-006, R-M10-007, R-M10-008]
drills:
  - kind: generated
    id: m10.l2.g-player-type
    family: m10.types.read
    rules: [R-M10-003, R-M10-004, R-M10-005]
    generator: playerType
    params: { nitMax: "n:hud.vpip.nit-max", regLow: "n:hud.vpip.reg.low", regHigh: "n:hud.vpip.reg.high", loose: "n:hud.vpip.loose", passiveGap: "n:hud.gap.passive", aggressiveGap: "n:hud.gap.aggressive", minHands: "n:hud.hands.random", readHands: "n:hud.hands.vpip.low" }
    count: 6
  - kind: choice
    id: m10.l2.q-gap-passive
    family: m10.types.read
    rules: [R-M10-004]
    prompt: "Po {{n:hud.ex.reg.hands}} rękach rywal ma {{t:vpip}} {{n:hud.ex.passive.vpip}} i {{t:pfr}} {{n:hud.ex.passive.pfr}}. Co to mówi o jego grze przed flopem?"
    options:
      - { text: "Jest pasywny: większość rąk tylko {{t:call|sprawdza}} albo limpuje", correct: true, why: "Różnica {{t:vpip}} − {{t:pfr}} to {{n:hud.ex.passive.gap}} punktów, ponad próg {{n:hud.gap.passive}}. Gra dość dużo rąk, ale większość z nich wkłada do {{t:pot|puli}} bez {{t:raise|przebicia}}." }
      - { text: "Jest agresywny, bo gra dużo rąk", why: "Liczba rąk ({{t:vpip}}) mówi, jak luźno gra, a nie jak agresywnie. O agresji mówi {{t:pfr}} i różnica między nimi." }
      - { text: "To {{t:nit}}", why: "{{t:nit}} gra do ok. {{n:hud.vpip.nit-max}} rąk; ten gracz gra wyraźnie więcej." }
  - kind: choice
    id: m10.l2.q-data-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    prompt: "Według danych z GGPoker NL25 {{t:recreational|gracze rekreacyjni}} dochodzą do showdownu w {{n:mda.rec.wtsd}} przypadków i wygrywają {{n:mda.rec.wsd}} showdownów; {{t:regular|regi}} {{n:mda.reg.wtsd}} i {{n:mda.reg.wsd}}. Co z tego wynika?"
    options:
      - { text: "{{t:recreational|Gracze rekreacyjni}} częściej płacą do końca i częściej przegrywają: {{t:call|sprawdzają}} słabszymi rękami", correct: true, why: "Częściej dochodzą do showdownu, a rzadziej go wygrywają, więc idą tam słabszymi rękami. Wobec nich betujesz {{t:value|dla wartości}} więcej rąk, a {{t:bluff|blefujesz}} mniej." }
      - { text: "{{t:recreational|Gracze rekreacyjni}} częściej {{t:bluff|blefują}}", why: "Te liczby mówią o tym, jak często dochodzą do showdownu i z czym, a nie o {{t:bluff|blefach}}. Wygrywają mniej showdownów, bo {{t:call|sprawdzają}} słabszymi rękami." }
      - { text: "Nic: różnica kilku punktów to szum", why: "To dane z całej populacji {{t:stakes|stawki}} z {{n:mda.period.months}} miesięcy, a nie z kilkudziesięciu rąk jednego gracza. Różnica jest spójna przy NL25, NL50 i NL100." }
  - kind: choice
    id: m10.l2.q-thin-value
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "Kh Qd", board: "Ks 8h 4c 2d 7s" }
    prompt: "River. Betowałeś flop i turn, rywal {{t:call|sprawdzał}}. Rywal to pasywny {{t:recreational|gracz rekreacyjny}} ({{t:vpip}} {{n:mda.rec.vpip}}, {{t:pfr}} {{n:mda.rec.pfr}}, {{n:hud.ex.reg.hands}} rąk). {{t:check|Czeka}}. Co robisz z {{t:top-pair|najwyższą parą}} i drugim kickerem?"
    options:
      - { text: "Betuję {{t:value|dla wartości}}", correct: true, why: "Taki gracz {{t:call|sprawdza}} do końca słabszymi królami, ósemkami i {{t:pair|parami}} kieszonkowymi. Ponad połowa jego {{t:call|sprawdzeń}} to ręce gorsze od twojej, więc bet zarabia (próg z modułu 8)." }
      - { text: "{{t:check|Czekam}}, żeby nie wpaść na lepszą rękę", why: "Wobec gracza, który {{t:call|sprawdza}} słabszymi rękami, {{t:check}} oddaje wartość. Lepsze ręce zapłacą czasem, ale gorszych {{t:call|sprawdzeń}} jest więcej." }
      - { text: "Betuję całą {{t:pot|pulę}} jako {{t:bluff}}", why: "Z {{t:top-pair|najwyższą parą}} to nie jest {{t:bluff}}: wygrywasz z wieloma rękami, które {{t:call|sprawdzą}}. Bet jest {{t:value|dla wartości}}." }
  - kind: choice
    id: m10.l2.q-no-bluff-passive
    family: m10.types.adjust
    rules: [R-M10-006]
    table: { hand: "9h 8h", board: "Ac Kd 5h 2c Js" }
    prompt: "River, nietrafiony {{t:straight-draw}}. Rywal to pasywny {{t:recreational|gracz rekreacyjny}} ({{t:wtsd}} {{n:mda.rec.wtsd}}), {{t:call|sprawdzał}} flop i turn. {{t:check|Czeka}}. Co robisz?"
    options:
      - { text: "{{t:check|Czekam}} i oddaję {{t:pot|pulę}}", correct: true, why: "{{t:bluff}} zarabia tylko wtedy, gdy rywal {{t:fold|pasuje}} częściej niż {{t:alpha}} twojego betu. Gracz, który {{t:call|sprawdzał}} dwie {{t:street|ulice}} i często dochodzi do showdownu, rzadko {{t:fold|pasuje}} na riverze." }
      - { text: "Betuję dużo, bo nie mam wartości przy showdownie", why: "W bazie (moduł 8) taki {{t:bluff}} bywa dobry, ale wobec tego gracza brakuje {{t:fold|pasów}}: {{t:bluff|blef}} traci." }
      - { text: "Betuję mało, żeby {{t:bluff}} był tańszy", why: "Mniejszy bet potrzebuje mniej {{t:fold|pasów}}, ale ręka, która {{t:call|sprawdzała}} dwie {{t:street|ulice}}, zwykle {{t:call|sprawdzi}} i mały bet. Lepiej oddać {{t:pot|pulę}}." }
  - kind: choice
    id: m10.l2.q-nit-3bet
    family: m10.types.adjust
    rules: [R-M10-007]
    table: { hand: "Ad Jc", position: "CO" }
    prompt: "{{t:open|Otwierasz}} z {{t:cutoff|CO}}. Na Buttonie siedzi {{t:nit}}: {{t:vpip}} {{n:hud.ex.nit.vpip}}, {{t:pfr}} {{n:hud.ex.nit.pfr}}, {{n:hud.ex.reg.hands}} rąk. 3-betuje cię. Co robisz z AJo?"
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Kto gra tak mało rąk, ten 3-betuje głównie najsilniejszymi: AQ, AK i wysokimi {{t:pair|parami}}, które dominują AJ. Wobec niego {{t:fold|pasujesz}} częściej niż w bazie z modułu 4." }
      - { text: "{{t:call|Sprawdzam}}, bo AJ to silna ręka", why: "AJ jest silne wobec szerokiego {{t:range|zakresu}}. Wobec 3-betu gracza z {{t:vpip}} {{n:hud.ex.nit.vpip}} często jest zdominowane i bez {{t:position|pozycji}}." }
      - { text: "4-betuję", why: "4-bet AJ wobec {{t:nit|nita}} gra przeciw {{t:range|zakresowi}}, który go dominuje i rzadko {{t:fold|pasuje}}. To nie jest ani {{t:value}}, ani dobry {{t:bluff}}." }
  - kind: choice
    id: m10.l2.q-nit-steal
    family: m10.types.adjust
    rules: [R-M10-007]
    prompt: "Jesteś na Buttonie, wszyscy {{t:fold|spasowali}}. Na {{t:big-blind|dużym blindzie}} siedzi {{t:nit}} ({{t:vpip}} {{n:hud.ex.nit.vpip}} po {{n:hud.ex.reg.hands}} rękach). Jak zmieniasz {{t:open|otwarcie}}?"
    options:
      - { text: "{{t:open|Otwieram}} szerzej niż w bazie", correct: true, why: "{{t:nit}} broni blindu wąsko, więc twoje {{t:open}} częściej wygrywa od razu, nawet ze słabą ręką." }
      - { text: "{{t:open|Otwieram}} węziej, bo {{t:nit}} ma silne ręce", why: "{{t:nit}} ma silne ręce wtedy, gdy gra. Na {{t:big-blind|dużym blindzie}} najczęściej {{t:fold|pasuje}}, i to jest twój zysk." }
      - { text: "Bez zmian: typ gracza nie wpływa na kradzież blindów", why: "Wpływa. Zysk z kradzieży zależy od tego, jak często blind {{t:fold|pasuje}}, a {{t:nit}} {{t:fold|pasuje}} często." }
  - kind: choice
    id: m10.l2.q-maniac-call
    family: m10.types.adjust
    rules: [R-M10-008]
    table: { hand: "Kc 9c", board: "Kd 7s 4h 2c Qh" }
    prompt: "Rywal to {{t:maniac|maniak}}: {{t:vpip}} {{n:hud.ex.maniac.vpip}}, {{t:pfr}} {{n:hud.ex.maniac.pfr}} po {{n:hud.ex.reg.hands}} rękach. Betował każdą {{t:street|ulicę}}, na riverze {{t:bet|stawia}} całą {{t:pot|pulę}}. Co robisz z {{t:top-pair|najwyższą parą}} i słabym kickerem?"
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Wobec gracza, który {{t:bluff|blefuje}} więcej niż w bazie, ręce na granicy {{t:call|sprawdzenia}} zarabiają. Najwyższa {{t:pair}} wygrywa z jego {{t:bluff|blefami}} i częścią wartości." }
      - { text: "{{t:fold|Pasuję}}, bo bet całej {{t:pot|puli}} oznacza silną rękę", why: "U gracza, który prawie każdą rękę gra {{t:raise|przebiciem}} i betuje każdą {{t:street|ulicę}}, duży bet zawiera dużo {{t:bluff|blefów}}. {{t:fold|Pasując}}, płacisz mu za to, że jest agresywny." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "{{t:raise|Przebicie}} sprawia, że {{t:bluff|blefy}} {{t:fold|pasują}}, a {{t:call|sprawdzają}} lepsze ręce. Z ręką łapiącą {{t:bluff|blefy}} wystarczy {{t:call}}." }
  - kind: choice
    id: m10.l2.q-maniac-bluff
    family: m10.types.adjust
    rules: [R-M10-008]
    prompt: "Grasz z {{t:maniac|maniakiem}}. Masz na turnie słabą rękę bez szans na poprawę, a on {{t:check|czeka}}. Co robisz?"
    options:
      - { text: "{{t:check|Czekam}}: {{t:bluff|blefowanie}} {{t:maniac|maniaka}} rzadko działa", correct: true, why: "{{t:maniac|Maniak}} rzadko {{t:fold|pasuje}} i często {{t:raise|przebija}}. Pieniądze zarabiasz z nim na {{t:call|sprawdzeniach}} silniejszymi rękami, nie na {{t:bluff|blefach}}." }
      - { text: "Betuję, bo {{t:check}} {{t:maniac|maniaka}} oznacza słabość", why: "Może tak być, ale {{t:maniac|maniak}} często {{t:raise|przebija}} każdą ręką. {{t:bluff|Blef}} wymaga {{t:fold|pasów}}, a tych jest u niego mało." }
      - { text: "Betuję all-in, żeby nie mógł {{t:raise|przebić}}", why: "Ryzykujesz cały stack, żeby wygrać małą {{t:pot|pulę}}, wobec gracza, który rzadko {{t:fold|pasuje}}. To najdroższy sposób na {{t:bluff}}." }
  - kind: generated
    id: m10.l2.g-vocab-strategy
    family: vocab.strategy
    generator: vocab
    params: { area: strategy, dir: both }
    count: 4
---
Statystyki z poprzedniej lekcji układają się w kilka typowych obrazów. Typ gracza mówi, w którą stronę odchodzi od bazy: gra za mało rąk, za dużo rąk, za często {{t:call|sprawdza}} albo za często {{t:raise|przebija}}.

## Dwie liczby, cztery typy

Typ odczytujesz z {{t:vpip}} i różnicy {{t:vpip}} − {{t:pfr}} (6-max, co najmniej ok. {{n:hud.hands.vpip.low}} rąk):

| Typ | {{t:vpip}} | {{t:vpip}} − {{t:pfr}} | Błąd wobec bazy |
|---|---|---|---|
| {{t:nit|Nit}} | do ok. {{n:hud.vpip.nit-max}} | mała | gra za mało rąk |
| {{t:regular}} ({{t:tag}}, {{t:lag}}) | ok. {{n:hud.vpip.reg.low}}–{{n:hud.vpip.reg.high}} | mała | blisko bazy |
| pasywny {{t:recreational|gracz rekreacyjny}} | od ok. {{n:hud.vpip.loose}} | ponad {{n:hud.gap.passive}} punktów | za dużo rąk, za często {{t:call|sprawdza}} |
| {{t:maniac|maniak}} | od ok. {{n:hud.vpip.loose}} | poniżej {{n:hud.gap.aggressive}} punktów | za dużo rąk, za często {{t:raise|przebija}} |

Pasywnego gracza z dużą różnicą nazywa się też {{t:calling-station}}. Między typami są strefy przejściowe (np. {{t:vpip}} kilkanaście procent albo gracz luźny z różnicą kilku punktów): tam nie przypisujesz typu, tylko patrzysz na kolejne statystyki.

## Co mówią dane z populacji

Baza Bluffaces podaje średnie statystyki graczy GGPoker NL25 6-max ze wszystkich rozdań z ostatnich {{n:mda.period.months}} miesięcy. {{t:regular|Regi}} to w niej gracze z {{t:vpip}} {{n:mda.reg.def.low}}–{{n:mda.reg.def.high}} i wynikiem powyżej {{n:mda.reg.def.wr}}, a {{t:recreational|gracze rekreacyjni}} to {{t:vpip}} ponad {{n:mda.rec.def}} i wynik poniżej {{n:mda.rec.def.wr}}:

| Statystyka | {{t:regular|Regi}} | {{t:recreational|Gracze rekreacyjni}} |
|---|---|---|
| {{t:vpip}} / {{t:pfr}} | {{n:mda.reg.vpip}} / {{n:mda.reg.pfr}} | {{n:mda.rec.vpip}} / {{n:mda.rec.pfr}} |
| Fold to 3-bet | {{n:mda.reg.f3b}} | {{n:mda.rec.f3b}} |
| {{t:wtsd}} | {{n:mda.reg.wtsd}} | {{n:mda.rec.wtsd}} |
| Wygrane showdowny | {{n:mda.reg.wsd}} | {{n:mda.rec.wsd}} |
| Wynik | {{n:mda.reg.wr}} | {{n:mda.rec.wr}} |

{{t:recreational|Gracze rekreacyjni}} mają różnicę {{t:vpip}} − {{t:pfr}} {{n:mda.rec.gap.pp}} punkty, czyli są pasywni. Częściej dochodzą do showdownu i rzadziej go wygrywają: {{t:call|sprawdzają}} słabszymi rękami. Rzadko też {{t:fold|pasują}} na 3-bet. Przy NL50 i NL100 liczby są prawie takie same.

## Pasywny {{t:recreational|gracz rekreacyjny}}

Baza z modułu 8 się nie zmienia: betujesz {{t:value|dla wartości}}, gdy ponad połowa rąk, które {{t:call|sprawdzą}}, to ręce gorsze, a {{t:bluff}} zarabia, gdy rywal {{t:fold|pasuje}} częściej niż {{t:alpha}}. Zmienia się rywal: {{t:call|sprawdza}} więcej słabszych rąk. Dlatego:

- betujesz {{t:value|dla wartości}} więcej rąk, także cieńszych, np. {{t:top-pair|najwyższą parę}} ze słabszym kickerem na trzech {{t:street|ulicach}};
- {{t:bluff|blefujesz}} rzadziej, zwłaszcza na riverze: brakuje {{t:fold|pasów}}, za które {{t:bluff}} miałby zarabiać.

## {{t:nit|Nit}} i {{t:maniac|maniak}}

**{{t:nit|Nit}}** gra tylko silne ręce. Gdy {{t:raise|przebija}} albo 3-betuje, twoje ręce z dołu {{t:range|zakresu}} {{t:call|sprawdzenia}} częściej są zdominowane, więc {{t:fold|pasujesz}} nimi częściej niż w bazie z modułu 4. Gdy siedzi na blindzie, kradniesz częściej, bo rzadko broni.

**{{t:maniac|Maniak}}** gra dużo rąk i prawie każdą {{t:raise|przebija}}. Jego bety zawierają więcej {{t:bluff|blefów}} niż w bazie, więc ręce na granicy {{t:call|sprawdzenia}} {{t:call|sprawdzasz}}, z bardzo silnymi rękami pozwalasz mu betować, a sam nie {{t:bluff|blefujesz}}: rzadko {{t:fold|pasuje}}.

:::note Skąd te progi
Progi typów to konwencje trenerów (PokerCoaching i Deepfold, 6-max cash online): bierzemy część wspólną albo przedział obejmujący oba źródła. Dane populacji pochodzą z bazy Bluffaces (GGPoker NL25–NL100, wszystkie rozdania z {{n:mda.period.months}} miesięcy przed październikiem 2026; liczby rąk strona nie podaje). Odczyt typu u {{t:nit|nita}} i {{t:maniac|maniaka}} opiera się na statystykach konkretnego rywala, a nie na danych o całej populacji, więc wymaga próby.
:::
