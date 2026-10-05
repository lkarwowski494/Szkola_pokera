---
id: m10.l1
module: m10
order: 1
title: "Statystyki HUD"
sub: "Co mierzą VPIP i PFR i ile rąk potrzeba"
rules: [R-M10-001, R-M10-002, R-M10-003]
drills:
  - kind: choice
    id: m10.l1.q-vpip-bb
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Jesteś na {{t:big-blind|dużym blindzie}}. Dwóch graczy limpuje, ty {{t:check|czekasz}} i oglądasz flop. Czy to rozdanie podnosi twój {{t:vpip}}?"
    options:
      - { text: "Nie: nie dołożyłeś dobrowolnie ani jednego {{t:chips|żetonu}}", correct: true, why: "{{t:vpip}} liczy tylko dobrowolne wpłaty przed flopem: {{t:call}} albo {{t:raise}}. {{t:big-blind|Duży blind}} jest wpłatą obowiązkową, a {{t:check}} nic nie kosztuje." }
      - { text: "Tak: grasz flop, więc ręka liczy się jako zagrana", why: "Zobaczenie flopu nie wystarcza. {{t:vpip}} rośnie dopiero wtedy, gdy sam dokładasz {{t:chips|żetony}} przed flopem." }
      - { text: "Tak, i podnosi też {{t:pfr}}", why: "{{t:pfr}} rośnie tylko przy {{t:raise|przebiciu}} przed flopem. Tu nikt nie {{t:raise|przebijał}}, a ty tylko {{t:check|czekałeś}}." }
  - kind: choice
    id: m10.l1.q-pfr-over-vpip
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Kolega pokazuje ci notatkę: rywal ma {{t:vpip}} {{n:hud.ex.wrong.vpip}} i {{t:pfr}} {{n:hud.ex.wrong.pfr}}. Co o tym myślisz?"
    options:
      - { text: "To niemożliwe: {{t:pfr}} nie może być większy niż {{t:vpip}}", correct: true, why: "Każde {{t:raise|przebicie}} przed flopem jest też dobrowolną wpłatą, więc liczy się w obu statystykach. {{t:pfr}} jest zawsze co najwyżej równy {{t:vpip}}; kolega pomylił liczby." }
      - { text: "To bardzo agresywny gracz, który prawie nigdy nie {{t:call|sprawdza}}", why: "Gracz, który nigdy nie {{t:call|sprawdza}}, ma {{t:pfr}} równy {{t:vpip}}, ale nie większy. Większy {{t:pfr}} oznacza błąd w zapisie." }
      - { text: "To gracz pasywny", why: "Pasywność widać po tym, że {{t:pfr}} jest dużo mniejszy niż {{t:vpip}}, a nie większy." }
  - kind: choice
    id: m10.l1.q-gap
    family: m10.hud.stats
    rules: [R-M10-001]
    prompt: "Rywal ma {{t:vpip}} {{n:mda.rec.vpip}} i {{t:pfr}} {{n:mda.rec.pfr}}. Co robi w rękach, które gra, ale ich nie {{t:raise|przebija}}?"
    options:
      - { text: "{{t:call|Sprawdza}} albo limpuje: to różnica {{n:mda.rec.gap}} rąk", correct: true, why: "{{t:vpip}} − {{t:pfr}} = {{n:mda.rec.gap}}. Te ręce wkłada do {{t:pot|puli}} bez {{t:raise|przebicia}}: limpuje albo {{t:call|sprawdza}} cudze {{t:open|otwarcia}}." }
      - { text: "{{t:fold|Pasuje}} je przed flopem", why: "Ręce spasowane przed flopem nie liczą się do {{t:vpip}} wcale. Różnica {{t:vpip}} − {{t:pfr}} to ręce zagrane bez {{t:raise|przebicia}}." }
      - { text: "Gra je {{t:all-in|all-inem}}", why: "All-in przed flopem to też {{t:raise|przebicie}}, więc podniósłby {{t:pfr}}. Różnica to ręce tylko {{t:call|sprawdzone}} albo zalimpowane." }
  - kind: numeric
    id: m10.l1.n-se
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Po {{n:hud.se.ex.n}} rękach rywal ma {{t:vpip}} {{n:hud.se.ex.p}}. Ile wynosi błąd standardowy tej liczby w punktach procentowych? Wpisz liczbę."
    answer: hud.se.ex
    explanation: "√(p × (1 − p) ÷ n) = √({{n:hud.se.ex.p}} × {{n:hud.se.ex.q}} ÷ {{n:hud.se.ex.n}}) ≈ {{n:hud.se.ex}}. Z ok. {{n:var.conf95}} pewnością prawdziwy {{t:vpip}} leży w granicach ± {{n:var.z95}} × {{n:hud.se.ex}} ≈ ± {{n:hud.ci.ex}}."
  - kind: choice
    id: m10.l1.q-ci
    family: m10.hud.sample
    rules: [R-M10-002]
    prompt: "Po {{n:hud.se.ex.n}} rękach {{t:vpip}} rywala wynosi {{n:hud.se.ex.p}}. Co wiesz o jego prawdziwym {{t:vpip}}?"
    options:
      - { text: "Z ok. {{n:var.conf95}} pewnością leży między {{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}}", correct: true, why: "Błąd standardowy to ok. {{n:hud.se.ex}}, a przedział {{n:var.conf95}} to ± {{n:var.z95}} błędu, czyli ± {{n:hud.ci.ex}}. Wiesz, że rywal nie jest skrajny, ale nie odróżnisz jeszcze typów, które dzieli kilka punktów." }
      - { text: "Wynosi dokładnie {{n:hud.se.ex.p}}", why: "{{n:hud.se.ex.n}} rąk to wciąż mała próba: błąd wynosi ok. {{n:hud.se.ex}}, a przedział {{n:var.conf95}} to ± {{n:hud.ci.ex}}." }
      - { text: "Nic: przed tysiącem rąk statystyki nie mają znaczenia", why: "Przesada. Przedział od {{n:hud.ci.ex.low}} do {{n:hud.ci.ex.high}} już wyklucza gracza bardzo ciasnego i bardzo luźnego. Brakuje tylko precyzji." }
  - kind: choice
    id: m10.l1.q-f3b-small
    family: m10.hud.sample
    rules: [R-M10-002, R-M10-003]
    prompt: "Po kilkuset rękach rywal miał {{n:hud.se.f3b.n}} razy okazję odpowiedzieć na 3-bet i {{t:fold|spasował}} w {{n:hud.se.f3b.p}} z nich. Co wiesz o jego fold to 3-bet?"
    options:
      - { text: "Prawie nic: z ok. {{n:var.conf95}} pewnością to od {{n:hud.ci.f3b.low}} do {{n:hud.ci.f3b.high}}", correct: true, why: "Liczą się okazje, nie ręce. Błąd to √({{n:hud.se.f3b.p}} × {{n:hud.se.f3b.q}} ÷ {{n:hud.se.f3b.n}}) ≈ {{n:hud.se.f3b}}, a przedział {{n:var.conf95}} to ± {{n:hud.ci.f3b}}. W takim przedziale mieści się i gracz, który prawie zawsze broni, i taki, który prawie zawsze {{t:fold|pasuje}}." }
      - { text: "{{t:fold|Pasuje}} dokładnie w {{n:hud.se.f3b.p}} przypadków, bo próba ma kilkaset rąk", why: "Kilkaset rąk to tylko {{n:hud.se.f3b.n}} okazji do tej statystyki. Błąd liczysz z okazji: wychodzi ok. {{n:hud.se.f3b}}." }
      - { text: "{{t:fold|Pasuje}} za często, bo powyżej {{n:hud.f3b.low}} to błąd", why: "{{n:hud.se.f3b.p}} to nie jest „powyżej {{n:hud.f3b.low}}”, a przy {{n:hud.se.f3b.n}} okazjach błąd wynosi ok. {{n:hud.se.f3b}}. Z takiej próby nie wyciągniesz wniosku." }
  - kind: choice
    id: m10.l1.q-few-hands
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Nowy rywal, {{n:hud.ex.few.hands}} rąk w {{t:hud|HUD-zie}}: {{t:vpip}} {{n:hud.ex.few.vpip}}, {{t:pfr}} {{n:hud.ex.few.pfr}}. Jak z nim grasz?"
    options:
      - { text: "Jak z nieznanym graczem, według bazy; zbieram kolejne ręce", correct: true, why: "Poniżej ok. {{n:hud.hands.random}} rąk statystyki są przypadkowe: kilka dobrych kart z rzędu daje taki {{t:vpip}}. {{t:vpip}} i {{t:pfr}} czytasz po ok. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} rękach." }
      - { text: "Jak z {{t:maniac|maniakiem}}: {{t:call|sprawdzam}} szeroko", why: "Po {{n:hud.ex.few.hands}} rękach to może być każdy typ. Szerokie {{t:call|sprawdzanie}} na podstawie przypadku kosztuje, gdy rywal okaże się zwykłym {{t:regular|regularem}}." }
      - { text: "Jak z {{t:nit|nitem}}, bo większość graczy to nity", why: "Tego też nie wiesz. Bez próby nie ma odczytu, więc wracasz do bazy." }
  - kind: choice
    id: m10.l1.q-slow-stat
    family: m10.hud.sample
    rules: [R-M10-003]
    prompt: "Która statystyka potrzebuje najwięcej rąk, żeby była wiarygodna?"
    options:
      - { text: "Fold to 3-bet", correct: true, why: "Okazja do fold to 3-bet pojawia się tylko wtedy, gdy rywal {{t:open|otworzył}} i dostał 3-bet, czyli rzadko. Dlatego potrzebujesz ok. {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} rąk zamiast {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}}." }
      - { text: "{{t:vpip}}", why: "{{t:vpip}} ma okazję w każdej ręce, więc stabilizuje się najszybciej: po ok. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} rękach." }
      - { text: "{{t:pfr}}", why: "{{t:pfr}}, jak {{t:vpip}}, ma okazję w każdej ręce, w której gracz może {{t:raise|przebić}}, więc stabilizuje się szybko." }
  - kind: choice
    id: m10.l1.q-hud-ban
    family: m10.hud.stats
    rules: [R-M10-003]
    prompt: "Twoja sala zabrania programów z {{t:hud|HUD-em}} przy stole. Co robisz?"
    options:
      - { text: "Gram bez {{t:hud|HUD-a}}, a po {{t:session|sesji}} przeglądam swoją bazę rąk i notatki o stałych rywalach", correct: true, why: "Regulamin sali jest wiążący: zakazany program grozi zamknięciem konta. Statystyki z własnej historii rąk możesz przeglądać po grze, a część sal pokazuje własne statystyki przy stole." }
      - { text: "Używam {{t:hud|HUD-a}} mimo zakazu, bo daje przewagę", why: "Za złamanie regulaminu sala może zamknąć konto i zatrzymać środki. Przewaga nie jest tego warta." }
      - { text: "Rezygnuję z {{t:exploit|eksploatacji}}, bo bez {{t:hud|HUD-a}} nie da się jej robić", why: "Da się: odczyty z przeglądu rąk po {{t:session|sesji}} i dane o populacji twojej {{t:stakes|stawki}} też pokazują, w którą stronę odejść od bazy." }
---
{{t:exploit|Eksploatacja}} to odejście od bazy z modułów 3–9 w stronę błędu rywala. Żeby wiedzieć, w którą stronę odejść, potrzebujesz danych. Online dostarcza ich {{t:hud}}: program, który zapisuje rozdania i pokazuje statystyki każdego rywala przy stole.

## {{t:vpip}} i {{t:pfr}}

Dwie najważniejsze liczby opisują grę przed flopem:

- **{{t:vpip}}**: w ilu procentach rąk gracz dobrowolnie wkłada {{t:chips|żetony}} do {{t:pot|puli}} przed flopem, czyli {{t:call|sprawdza}} albo {{t:raise|przebija}}. Blindy się nie liczą, bo są obowiązkowe.
- **{{t:pfr}}**: w ilu procentach rąk gracz {{t:raise|przebija}} przed flopem: {{t:open|otwiera}}, 3-betuje albo 4-betuje.

Każde {{t:raise|przebicie}} jest też dobrowolną wpłatą, więc {{t:pfr}} nigdy nie przekracza {{t:vpip}}. Różnica {{t:vpip}} − {{t:pfr}} to ręce, które gracz tylko {{t:call|sprawdził}} albo zalimpował. Gracz z {{t:vpip}} {{n:mda.rec.vpip}} i {{t:pfr}} {{n:mda.rec.pfr}} gra dużo rąk, ale w {{n:mda.rec.gap}} wszystkich rąk wchodzi do {{t:pot|puli}} bez {{t:raise|przebicia}}.

## Inne statystyki

| Statystyka | Co mierzy | Okazja |
|---|---|---|
| 3-bet | jak często {{t:raise|przebija}} cudze {{t:open|otwarcie}} | ktoś przed nim {{t:open|otworzył}} |
| Fold to 3-bet | jak często {{t:fold|pasuje}} na 3-bet | {{t:open|otworzył}} i dostał 3-bet |
| C-bet | jak często betuje flop po swoim {{t:raise|przebiciu}} | był {{t:aggressor|agresorem}} przed flopem |
| Fold to c-bet | jak często {{t:fold|pasuje}} na c-bet | dostał c-bet |
| {{t:wtsd}} | jak często po flopie dochodzi do showdownu | zobaczył flop |

Ostatnia kolumna jest ważna: statystyka zmienia się tylko wtedy, gdy rywal ma okazję. {{t:vpip}} ma okazję w każdej ręce, a fold to 3-bet tylko wtedy, gdy rywal {{t:open|otworzył}} i dostał 3-bet.

## Ile rąk potrzeba

Każda ręka to losowa próba ze strategii rywala, więc statystyka ma błąd jak każda średnia z próby. Liczysz go tak samo jak błąd winrate w module 12:

```formula
błąd = √(p × (1 − p) ÷ n)
przedział {{n:var.conf95}} = p ± {{n:var.z95}} × błąd
```

Tu p to odsetek (np. {{t:vpip}}), a n liczba okazji. Po {{n:hud.se.ex.n}} rękach z {{t:vpip}} {{n:hud.se.ex.p}} błąd wynosi ok. {{n:hud.se.ex}}, więc prawdziwy {{t:vpip}} leży z ok. {{n:var.conf95}} pewnością między **{{n:hud.ci.ex.low}} a {{n:hud.ci.ex.high}}**. Fold to 3-bet {{n:hud.se.f3b.p}} z {{n:hud.se.f3b.n}} okazji to przedział od {{n:hud.ci.f3b.low}} do {{n:hud.ci.f3b.high}}: prawie nic.

Trenerzy podają podobne progi:

- poniżej ok. {{n:hud.hands.random}} rąk statystyki są przypadkowe; grasz jak z nieznanym graczem;
- typ gracza zgrubnie widać po {{n:hud.hands.random}}–{{n:hud.hands.rough.high}} rękach, a {{t:vpip}} i {{t:pfr}} stabilizują się po ok. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}};
- 3-bet i fold to 3-bet potrzebują ok. {{n:hud.hands.3bet.low}}–{{n:hud.hands.3bet.high}} rąk, statystyki z turnu i rivera jeszcze więcej.

:::note Gdy sala zakazuje {{t:hud|HUD-a}}
Część sal (według Deepfold m.in. GGPoker, WPT Global i PokerStars na niskich {{t:stakes|stawkach}}) zabrania programów z {{t:hud|HUD-em}} przy stole. Wtedy przeglądasz własną historię rąk po {{t:session|sesji}}, zapisujesz notatki o stałych rywalach i korzystasz z danych o populacji swojej {{t:stakes|stawki}} (lekcja 2). Progi prób pochodzą z PokerCoaching i Deepfold; przedziały obejmują oba źródła. Wzór na błąd to rachunek.
:::
