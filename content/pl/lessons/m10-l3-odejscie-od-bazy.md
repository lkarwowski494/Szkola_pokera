---
id: m10.l3
module: m10
order: 3
title: "Odejście od bazy"
sub: "Którymi rękami i jak daleko"
rules: [R-M10-009, R-M10-010, R-M10-011, R-M10-012]
drills:
  - kind: choice
    id: m10.l3.q-mixed-first
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Wiesz, że rywal w tej linii {{t:bluff|blefuje}} trochę częściej niż w równowadze. Którymi rękami najpierw zmieniasz decyzję?"
    options:
      - { text: "Rękami, które w bazie mieszają {{t:call}} i {{t:fold}}: teraz zawsze {{t:call|sprawdzasz}}", correct: true, why: "W równowadze te ręce są obojętne, bo rywal ma dokładnie tyle {{t:bluff|blefów}}, ile trzeba. Już mała nadwyżka {{t:bluff|blefów}} sprawia, że {{t:call}} zarabia więcej niż {{t:fold}}." }
      - { text: "Najsłabszymi rękami, które w bazie zawsze {{t:fold|pasują}}", why: "Te ręce przegrywają nawet z częścią {{t:bluff|blefów}} albo potrzebują dużo większej nadwyżki. Zmieniają się dopiero przy dużym {{t:standard-deviation|odchyleniu}} rywala." }
      - { text: "Najsilniejszymi rękami: teraz je {{t:raise|przebijasz}}", why: "Najsilniejsze ręce i tak grasz dalej. Zmiana zaczyna się od rąk na granicy decyzji." }
  - kind: choice
    id: m10.l3.q-small-shift
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "W opublikowanym przykładzie z solvera rywal na riverze {{t:bluff|blefuje}} ok. {{n:gtow.ob.lock}} zamiast ok. {{n:gtow.ob.base}} betów. Jak zmienia się odpowiedź na jego bet rękami łapiącymi {{t:bluff|blefy}}?"
    options:
      - { text: "Przestajesz {{t:fold|pasować}}: ręce, które w bazie mieszały, teraz zawsze {{t:call|sprawdzają}}", correct: true, why: "Tyle wystarczyło, żeby w rozwiązaniu z zablokowaną strategią rywala obrona przeszła na samo {{t:call|sprawdzanie}}. Ręce obojętne reagują na najmniejszą nadwyżkę {{t:bluff|blefów}}." }
      - { text: "Prawie nic: kilka punktów to za mało, żeby coś zmienić", why: "Dla rąk obojętnych kilka punktów to dużo: w równowadze {{t:call}} i {{t:fold}} dają im to samo, więc każda nadwyżka {{t:bluff|blefów}} rozstrzyga na korzyść {{t:call|sprawdzenia}}." }
      - { text: "Zaczynasz {{t:raise|przebijać}} rękami łapiącymi {{t:bluff|blefy}}", why: "{{t:raise|Przebicie}} wypycha {{t:bluff|blefy}} rywala, a {{t:call|sprawdzają}} lepsze ręce. Ręka łapiąca {{t:bluff|blefy}} zarabia na {{t:call|sprawdzeniu}}." }
  - kind: choice
    id: m10.l3.q-underbluff
    family: m10.base.mixed
    rules: [R-M10-009]
    prompt: "Wiesz, że rywal w danej linii {{t:bluff|blefuje}} rzadziej niż w równowadze. Co robisz z ręką łapiącą {{t:bluff|blefy}}, która w bazie czasem {{t:call|sprawdza}}, a czasem {{t:fold|pasuje}}?"
    options:
      - { text: "Zawsze {{t:fold|pasuję}}", correct: true, why: "Gdy {{t:bluff|blefów}} jest mniej, niż wymaga równowaga, ręce obojętne tracą na {{t:call|sprawdzeniu}}. Wynik solvera: przy niedoborze {{t:bluff|blefów}} zawsze {{t:fold|pasujesz}}." }
      - { text: "Zawsze {{t:call|sprawdzam}}, żeby rywal nie wykorzystał mnie {{t:bluff|blefami}}", why: "Rywal, który {{t:bluff|blefuje}} za rzadko, nie wykorzysta twojego {{t:fold|pasowania}}. To ty wykorzystujesz jego błąd, {{t:fold|pasując}}." }
      - { text: "Gram jak w bazie, pół na pół", why: "Mieszanie ma sens tylko wtedy, gdy obie decyzje dają to samo. Przy niedoborze {{t:bluff|blefów}} {{t:fold}} daje więcej." }
  - kind: numeric
    id: m10.l3.n-alpha-small
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "{{t:bet|Stawiasz}} c-bet {{n:cbet.ex.small}} do {{t:pot|puli}} {{n:ex.pot}}, bez żadnej ręki. Jak często rywal musi {{t:fold|pasować}}, żeby ten {{t:bluff}} wyszedł na zero? Wpisz procent."
    answer: alpha.cbet.small
    explanation: "Próg to bet ÷ ({{t:pot}} + bet) = {{n:cbet.ex.small}} ÷ ({{n:ex.pot}} + {{n:cbet.ex.small}}) = {{n:alpha.cbet.small}}. Rywal z fold to c-bet wyraźnie powyżej tej liczby {{t:fold|pasuje}} na tyle często, że c-bet zarabia nawet bez ręki."
  - kind: choice
    id: m10.l3.q-alpha-hud
    family: m10.base.alpha
    rules: [R-M10-010]
    prompt: "Rywal ma fold to c-bet {{n:hud.ex.fcb.high}} po {{n:hud.ex.reg.hands}} rękach. Na {{t:dry|suchym}} flopie nie trafiłeś nic. Opłaca się c-bet 1/3 {{t:pot|puli}} bez ręki?"
    options:
      - { text: "Tak: rywal {{t:fold|pasuje}} częściej niż {{n:alpha.cbet.small}}, więc c-bet zarabia od razu", correct: true, why: "c-bet 1/3 {{t:pot|puli}} wychodzi na zero przy {{n:alpha.cbet.small}} {{t:fold|pasów}}. Rywal {{t:fold|pasuje}} dużo częściej, więc c-bet zarabia, zanim policzysz equity twojej ręki. Fold to c-bet łączy wszystkie rozmiary i stoły, więc to przybliżenie." }
      - { text: "Nie: bez ręki nie betujesz", why: "{{t:bluff}} nie potrzebuje ręki, potrzebuje {{t:fold|pasów}}. Gdy rywal {{t:fold|pasuje}} częściej niż {{n:alpha.cbet.small}}, c-bet zarabia z każdą ręką." }
      - { text: "Tylko dużym rozmiarem, bo mały nie wypycha rąk", why: "Większy bet potrzebuje więcej {{t:fold|pasów}}: przy 3/4 {{t:pot|puli}} aż {{n:alpha.cbet.big}}. Gdy rywal i tak {{t:fold|pasuje}} często, mały c-bet robi to taniej." }
  - kind: choice
    id: m10.l3.q-alpha-low
    family: m10.base.alpha
    rules: [R-M10-010, R-M10-006]
    prompt: "Rywal ma fold to c-bet {{n:hud.ex.fcb.low}} po {{n:hud.ex.reg.hands}} rękach. Nie trafiłeś flopu i nie masz {{t:draw|drawa}}. Rozważasz c-bet 3/4 {{t:pot|puli}}. Co robisz?"
    options:
      - { text: "{{t:check|Czekam}}: ten rywal {{t:fold|pasuje}} rzadziej, niż potrzebuje duży c-bet", correct: true, why: "c-bet 3/4 {{t:pot|puli}} wychodzi na zero dopiero przy {{n:alpha.cbet.big}} {{t:fold|pasów}}, a rywal {{t:fold|pasuje}} w {{n:hud.ex.fcb.low}}. Bez ręki i bez outów taki {{t:bluff}} traci." }
      - { text: "Betuję, bo c-bet to standard", why: "c-bet bez ręki jest dobry tylko wtedy, gdy rywal {{t:fold|pasuje}} dość często albo gdy ręka ma equity. Tu nie ma ani jednego, ani drugiego." }
      - { text: "Betuję all-in, żeby wymusić {{t:fold|pas}}", why: "Im większy bet, tym więcej {{t:fold|pasów}} potrzebuje. Rywal, który rzadko {{t:fold|pasuje}}, nie {{t:fold|spasuje}} częściej dlatego, że {{t:bet|postawiłeś}} więcej." }
  - kind: choice
    id: m10.l3.q-3bet-linear
    family: m10.base.3bet
    rules: [R-M10-011]
    table: { hand: "Kh Jh", position: "BTN" }
    prompt: "{{t:recreational|Gracz rekreacyjny}} z fold to 3-bet {{n:mda.rec.f3b}} {{t:open|otwiera}} z {{t:cutoff|CO}}. Jesteś na Buttonie. W bazie KJs czasem {{t:call|sprawdza}}, a A5s bywa 3-betem {{t:bluff|blefem}}. Jak grasz wobec tego gracza?"
    options:
      - { text: "3-betuję KJs {{t:value|dla wartości}}, a A5s nie 3-betuję jako {{t:bluff|blefu}}", correct: true, why: "Gracz, który rzadko {{t:fold|pasuje}} na 3-bet, często {{t:call|sprawdza}} słabszymi rękami, więc silniejsze ręce zarabiają na 3-becie. {{t:bluff|Blef}} 3-betem zarabia od razu dopiero przy ponad {{n:alpha.vs-3bet-ip-size}} {{t:fold|pasów}}, a ten gracz {{t:fold|pasuje}} w {{n:mda.rec.f3b}}." }
      - { text: "3-betuję A5s, bo {{t:bluff}} z {{t:blocker|blokerem}} to dobry 3-bet", why: "W bazie tak, wobec rywala, który {{t:fold|pasuje}} w ok. połowie przypadków. Ten {{t:fold|pasuje}} w {{n:mda.rec.f3b}}, więc {{t:bluff}} prawie zawsze gra dużą {{t:pot|pulę}} słabą ręką." }
      - { text: "Tylko {{t:call|sprawdzam}} KJs, żeby nie odstraszyć rywala", why: "Wobec gracza, który {{t:call|sprawdza}} 3-bety słabszymi rękami, 3-bet KJs buduje większą {{t:pot|pulę}} z lepszą ręką i z {{t:position|pozycją}}. To lepsze niż samo {{t:call}}." }
  - kind: choice
    id: m10.l3.q-3bet-data
    family: m10.base.3bet
    rules: [R-M10-011]
    prompt: "Według danych z populacji mikrostawek online (NL25) {{t:regular|regi}} {{t:fold|pasują}} na 3-bet w {{n:mda.reg.f3b}}, a {{t:recreational|gracze rekreacyjni}} w {{n:mda.rec.f3b}}. 3-bet z {{t:position|pozycji}} do {{n:pf.3bet.ip-total}} zarabia bez ręki przy ponad {{n:alpha.vs-3bet-ip-size}} {{t:fold|pasów}}. Co z tego wynika?"
    options:
      - { text: "Wobec {{t:recreational|graczy rekreacyjnych}} 3-betujesz prawie bez {{t:bluff|blefów}}, wobec {{t:regular|regów}} {{t:bluff|blefy}} zostają, ale tylko z rękami, które mają equity", correct: true, why: "Żadna grupa nie {{t:fold|pasuje}} tak często, żeby 3-bet zarabiał bez ręki. {{t:bluff|Blefy}} 3-betem w bazie żyją z equity po flopie i z {{t:fold|pasów}}; wobec gracza, który {{t:fold|pasuje}} w {{n:mda.rec.f3b}}, zostaje głównie equity, więc 3-betujesz {{t:range|zakresem}} {{t:linear|liniowym}}." }
      - { text: "3-betujesz każdego dowolną ręką, bo wszyscy dużo {{t:fold|pasują}}", why: "Nikt tu nie {{t:fold|pasuje}} częściej niż {{n:alpha.vs-3bet-ip-size}}. 3-bet każdą ręką traciłby." }
      - { text: "Wobec {{t:recreational|graczy rekreacyjnych}} przestajesz 3-betować w ogóle", why: "Przeciwnie: gracz, który {{t:call|sprawdza}} 3-bety słabszymi rękami, płaci twoim silnym rękom. Zmieniasz skład 3-betu, nie rezygnujesz z niego." }
  - kind: choice
    id: m10.l3.q-sample-direction
    family: m10.base.mixed
    rules: [R-M10-012, R-M10-003]
    prompt: "Po {{n:hud.ex.mid.hands}} rękach rywal wygląda na luźnego i pasywnego, ale próba jest mała. Jak daleko odchodzisz od bazy?"
    options:
      - { text: "Trochę, w kierunku odczytu i tylko rękami granicznymi", correct: true, why: "Kierunek widać już w małej próbie, ale liczby mają duży błąd. Ręce na granicy decyzji przesuwasz w stronę odczytu, a resztę grasz jak w bazie, dopóki próba nie urośnie." }
      - { text: "Na całego: od razu gram przeciw niemu maksymalną {{t:exploit|eksploatacją}}", why: "Przy małej próbie odczyt może być błędny. Duże odejście od bazy samo daje się wykorzystać, więc przy pomyłce oddajesz więcej, niż zarabiasz." }
      - { text: "Wcale, dopóki nie będę mieć tysiąca rąk", why: "Za ostrożnie. Kierunek odczytu przy {{n:hud.ex.mid.hands}} rękach już coś znaczy, a ręce graniczne możesz przesuwać tanio." }
---
{{t:exploit|Eksploatacja}} nie zastępuje bazy, tylko ją przesuwa. Najpierw wiesz, jak gra się w równowadze (moduły 3–9), potem z danych widzisz, w którą stronę rywal od niej odchodzi, i przesuwasz własną grę w tę samą stronę. Pytanie brzmi: którymi rękami i jak daleko.

## Najpierw {{t:mixed-hand|ręce mieszane}}

W równowadze część rąk gra dwie akcje, np. czasem {{t:call|sprawdza}}, a czasem {{t:fold|pasuje}}. Robi tak, bo obie akcje dają to samo: rywal ma dokładnie tyle {{t:bluff|blefów}}, żeby ręka była obojętna. To te ręce reagują na błąd rywala pierwsze:

- rywal {{t:bluff|blefuje}} za często: {{t:mixed-hand|ręce mieszane}} zawsze {{t:call|sprawdzają}};
- rywal {{t:bluff|blefuje}} za rzadko: {{t:mixed-hand|ręce mieszane}} zawsze {{t:fold|pasują}}.

Wystarczy niewiele. W opublikowanym przykładzie z solvera (Button betuje na riverze po linii bet, {{t:check}}, bet) zmiana {{t:bluff|blefów}} rywala z ok. {{n:gtow.ob.base}} do ok. {{n:gtow.ob.lock}} przestawiła obronę {{t:big-blind|dużego blinda}} na samo {{t:call|sprawdzanie}}. Ręce, które w bazie zawsze {{t:fold|pasują}} albo zawsze grają dalej, zmieniają decyzję dopiero przy dużym {{t:standard-deviation|odchyleniu}}.

## {{t:bluff|Blef}} liczony progiem

Czy {{t:bluff}} bez ręki się opłaca, mówi {{t:alpha}} z modułu 6:

```formula
{{t:bluff}} zarabia, gdy rywal {{t:fold|pasuje}} częściej niż: bet ÷ (pula + bet)
```

Przy c-becie 1/3 {{t:pot|puli}} to {{n:alpha.cbet.small}}, przy 3/4 {{t:pot|puli}} {{n:alpha.cbet.big}}. Fold to c-bet z {{t:hud|HUD-a}} pokazuje, czy rywal jest nad tym progiem, czy pod nim. To przybliżenie: statystyka łączy wszystkie rozmiary i flopy, a twoja ręka zwykle ma jeszcze trochę equity. Na flopie, który trafia w {{t:range}} rywala, {{t:fold|pasuje}} on rzadziej niż średnio.

Gracze populacji mikrostawek online (NL25) {{t:fold|pasują}} na c-bet na flopie średnio w {{n:mda.all.fcb}} przypadków. To nie musi być błąd: także solver {{t:out-of-position}} na flopie {{t:fold|pasuje}} częściej, niż wskazuje {{t:mdf}} (moduł 6). Dlatego sama średnia populacji nad progiem nie uzasadnia c-betu bez ręki; potrzebujesz odczytu konkretnego rywala albo flopu, który nie trafia w jego {{t:range}}.

## 3-bet wobec gracza, który nie {{t:fold|pasuje}}

3-bet z {{t:position|pozycji}} do {{n:pf.3bet.ip-total}} zarabia bez żadnej ręki dopiero wtedy, gdy rywal {{t:fold|pasuje}} częściej niż {{n:alpha.vs-3bet-ip-size}} (moduł 4). Dane z populacji mikrostawek online (NL25):

| Grupa | Fold to 3-bet |
|---|---|
| {{t:regular|Regi}} | {{n:mda.reg.f3b}} |
| {{t:recreational|Gracze rekreacyjni}} | {{n:mda.rec.f3b}} |

W bazie {{t:bluff|blefy}} 3-betem żyją z {{t:fold|pasów}} i z equity po flopie. Wobec gracza, który {{t:fold|pasuje}} w {{n:mda.rec.f3b}}, {{t:fold|pasów}} prawie nie ma, za to {{t:call|sprawdza}} on słabszymi rękami. Dlatego 3-betujesz go {{t:range|zakresem}} {{t:linear|liniowym}}: więcej silnych rąk {{t:value|dla wartości}}, prawie bez {{t:bluff|blefów}}. Trenerzy w dwóch materiałach szkoleniowych {{t:bet|stawiają}} tę granicę przy fold to 3-bet ok. {{n:hud.f3b.low}}.

## Mała próba, małe odejście

Im mniejsza próba, tym większy błąd statystyki (lekcja 1). Przy małej próbie przesuwasz tylko ręce graniczne i tylko w kierunku odczytu. Duże odejście, z całym {{t:range|zakresem}}, ma sens dopiero przy dużej próbie i wyraźnym błędzie rywala. Odejście od bazy samo jest błędem, który dobry rywal może wykorzystać.

:::note Źródła
Zasada {{t:mixed-hand|rąk mieszanych}} pochodzi z opublikowanej analizy solvera z zablokowaną strategią rywala (rozwiązanie solvera, nie dane o populacji). Progi {{t:alpha}} to rachunek. Fold to 3-bet i fold to c-bet populacji pochodzą z publicznej bazy statystyk (jedna duża sala online, NL25–NL100, {{n:mda.period.months}} miesięcy przed październikiem 2026). Granica fold to 3-bet i zasada „mała próba, małe odejście” to zalecenia z dwóch materiałów szkoleniowych.
:::
