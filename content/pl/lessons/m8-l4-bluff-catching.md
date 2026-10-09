---
id: m8.l4
module: m8
order: 4
title: "Łapanie blefów"
sub: "Którymi rękami sprawdzać na riverze"
rules: [R-M8-010, R-M8-011, R-M8-012, R-M6-001]
drills:
  - kind: choice
    id: m8.l4.q-role
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Bronisz {{t:big-blind}}. Na riverze {{t:check|czekasz}}, a Button {{t:bet|stawia}} całą {{t:pot|pulę}}. Piki nie weszły. Jaką rolę ma twoja {{t:pair}} dziewiątek?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: wygrywa tylko z {{t:bluff|blefami}}", correct: true, why: "Za całą {{t:pot|pulę}} Button betuje {{t:value|dla wartości}} co najmniej królem, a {{t:bluff|blefuje}} głównie nietrafionymi {{t:draw|drawami}}. Twoja {{t:pair}} przegrywa z każdą jego ręką {{t:value|dla wartości}} i wygrywa z każdym {{t:bluff|blefem}}." }
      - { text: "Ręka {{t:value|dla wartości}}", why: "Ręka {{t:value|dla wartości}} wygrywa z rękami, które płacą lub betują {{t:value|dla wartości}}. {{t:pair|Para}} dziewiątek przegrywa z każdym królem i lepszą ręką Buttona." }
      - { text: "Ręka bez szans", why: "{{t:pair|Para}} dziewiątek wygrywa z nietrafionymi {{t:draw|drawami}}, a tymi Button {{t:bluff|blefuje}}. Ma szanse, ale tylko przeciw {{t:bluff|blefom}}." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. W {{t:pot|puli}} jest {{n:ex.pot}}, rywal {{t:bet|stawia}} całą {{t:pot|pulę}}: {{n:ex.bet.pot}}. Masz bluff-catcher. Ile co najmniej procent jego betów musi być {{t:bluff|blefami}}, żeby {{t:call}} się opłacało? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "Twoje equity to udział {{t:bluff|blefów}} w jego betach. Dopłacasz {{n:ex.bet.pot}}, żeby wygrać {{t:pot|pulę}} po {{t:call|sprawdzeniu}}: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. To ta sama liczba, co udział {{t:bluff|blefów}} w równowadze z poprzedniej lekcji."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Rywal {{t:bet|stawia}} pół {{t:pot|puli}}. Masz bluff-catcher i szacujesz, że {{t:bluff|blefy}} to ok. {{n:catch.ex.bluffs-low}} jego betów. Co robisz?"
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Potrzebujesz {{n:eq.bet-half}} equity, a twój bluff-catcher wygrywa tylko w {{n:catch.ex.bluffs-low}} przypadków. {{t:call|Sprawdzenie}} traci." }
      - { text: "{{t:call|Sprawdzam}}, bo {{t:mdf}} wynosi {{n:mdf.bet-half}}", why: "{{t:mdf}} chroni przed rywalem, który {{t:bluff|blefuje}} wystarczająco często. Gdy {{t:bluff|blefów}} jest za mało, {{t:call|sprawdzanie}} bluff-catcherami oddaje pieniądze." }
      - { text: "{{t:raise|Przebijam}}", why: "Twoja ręka wygrywa tylko z {{t:bluff|blefami}}. Po {{t:raise|przebiciu}} {{t:bluff|blefy}} {{t:fold|spasują}}, a zapłacą ręce {{t:value|dla wartości}}: przegrywasz więcej." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Rywal {{t:bet|stawia}} całą {{t:pot|pulę}}. Masz bluff-catcher i szacujesz, że {{t:bluff|blefy}} to ok. {{n:catch.ex.bluffs-high}} jego betów. Co robisz?"
    options:
      - { text: "{{t:call|Sprawdzam}}", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}} equity, a {{t:bluff|blefów}} jest {{n:catch.ex.bluffs-high}}. Rywal {{t:bluff|blefuje}} więcej, niż wynosi równowaga, więc {{t:call}} zarabia." }
      - { text: "{{t:fold|Pasuję}}, bo bet jest duży", why: "Duży bet podnosi cenę do {{n:eq.bet-pot}}, ale {{t:bluff|blefów}} jest więcej. Liczy się porównanie tych dwóch liczb, a nie sam rozmiar betu." }
      - { text: "{{t:raise|Przebijam}} all-in", why: "Bluff-catcher nie {{t:raise|przebija}}: {{t:bluff|blefy}} {{t:fold|spasują}}, a zapłacą tylko ręce lepsze od twojej." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "Rywal betuje na riverze całą {{t:pot|pulę}} i {{t:bluff|blefuje}} dokładnie w {{n:bluff.share.bet-pot}} przypadków. Ile zarabiasz, {{t:call|sprawdzając}} bluff-catcherem?"
    options:
      - { text: "Nic: {{t:call}} i {{t:fold}} wychodzą na to samo", correct: true, why: "Udział {{t:bluff|blefów}} równy {{n:eq.bet-pot}} to dokładnie cena {{t:call|sprawdzenia}}. Wygrane na {{t:bluff|blefach}} równoważą przegrane z wartością, więc rywal nie daje ci zarobić ani {{t:call|sprawdzeniem}}, ani {{t:fold|pasem}}." }
      - { text: "Zarabiam, bo {{t:bluff|blefów}} jest dużo", why: "Jest ich dokładnie tyle, ile wynosi cena. Zarabiasz dopiero, gdy rywal {{t:bluff|blefuje}} częściej niż {{n:eq.bet-pot}}." }
      - { text: "Tracę, bo wartości jest więcej niż {{t:bluff|blefów}}", why: "Wartości jest więcej, ale {{t:call|sprawdzając}}, ryzykujesz {{n:ex.bet.pot}}, żeby wygrać {{n:ex.pot}} + {{n:ex.bet.pot}}. Przy takim udziale {{t:bluff|blefów}} te dwie rzeczy się równoważą." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Piki nie weszły. Na riverze {{t:check|czekasz}}, a Button {{t:bet|stawia}} całą {{t:pot|pulę}}. Masz {{t:top-pair|najwyższą parę}} z dziesiątką. Z którą z tych dwóch rąk {{t:call}} jest lepsze?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Bez pików nie blokujesz nietrafionych {{t:flush-draw|drawów do koloru}}, czyli głównych {{t:bluff|blefów}} Buttona (np. dziesiątka z waletem w pikach). W jego {{t:range|zakresie}} zostaje więcej {{t:bluff|blefów}}, z którymi wygrywasz." }
      - { text: "[[Kc Ts]]", why: "Dziesiątka pik zabiera Buttonowi część nietrafionych {{t:draw|drawów}}, którymi {{t:bluff|blefuje}} (np. walet z dziesiątką w pikach). Zostaje mu relatywnie więcej wartości, więc {{t:call}} jest gorsze." }
      - { text: "Bez różnicy", why: "Siła przy showdownie jest ta sama, ale pik w twojej ręce blokuje {{t:bluff|blefy}} Buttona. To zmienia, z czym naprawdę grasz." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Na riverze weszła trzecia karta kier. {{t:check|Czekasz}}, a Button {{t:bet|stawia}} całą {{t:pot|pulę}}. Masz {{t:pair|parę}} dziewiątek. Z którą z tych dwóch rąk {{t:call}} jest lepsze?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "As kier blokuje {{t:flush}} z asem, jedną z najsilniejszych rąk Buttona {{t:value|dla wartości}}. Gdy blokujesz jego wartość, wśród jego betów zostaje więcej {{t:bluff|blefów}}." }
      - { text: "[[Ad 9c]]", why: "Ta sama {{t:pair}}, ale nie blokujesz żadnego {{t:flush|koloru}}. Button ma wszystkie swoje kolory, z którymi przegrywasz." }
      - { text: "Bez różnicy", why: "Przy showdownie obie ręce są tak samo silne, ale as kier zabiera Buttonowi część rąk {{t:value|dla wartości}}." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Piki nie weszły. Na riverze {{t:check|czekasz}}, a Button {{t:bet|stawia}} pół {{t:pot|puli}}. Co robisz?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "Masz tylko siódemkę jako najwyższą kartę. Przegrywasz nawet z większością {{t:bluff|blefów}} Buttona (dama z pikami, walet z pikami), więc to nie jest bluff-catcher. Bronisz innymi rękami." }
      - { text: "{{t:call|Sprawdzam}}, bo cena jest dobra", why: "Cena ({{n:eq.bet-half}}) nie pomoże ręce, która przegrywa prawie ze wszystkim, nawet z {{t:bluff|blefami}}." }
      - { text: "{{t:raise|Przebijam}} jako {{t:bluff}}", why: "{{t:raise|Przebicie}} {{t:bluff|blefem}} na riverze to zagranie zaawansowane i ryzykowne. Prostsze i lepsze jest spasowanie ręki bez szans." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. Rywal {{t:bet|stawia}} pół {{t:pot|puli}}. {{t:mdf}} wynosi {{n:mdf.bet-half}}. Które ręce bronisz w pierwszej kolejności?"
    options:
      - { text: "Najlepsze bluff-catchery: wygrywają z {{t:bluff|blefami}} i mają dobre {{t:blocker|blokery}}", correct: true, why: "Bronisz ręce, które wygrywają z {{t:bluff|blefami}}, a wśród rąk podobnej siły wybierasz te, które blokują wartość rywala i nie blokują jego {{t:bluff|blefów}}. {{t:fold|Pasujesz}} rękami, które przegrywają nawet z {{t:bluff|blefami}}." }
      - { text: "Losowe {{n:mdf.bet-half}} {{t:range|zakresu}}", why: "{{t:mdf}} mówi, ile bronić, a nie czym. Losowa obrona płaci rękami, które nigdy nie wygrają." }
      - { text: "Tylko ręce {{t:value|dla wartości}}", why: "Wtedy bronisz za mało i rywal zarabia, {{t:bluff|blefując}} dowolnymi kartami. Do {{t:mdf}} dokładasz najlepsze bluff-catchery." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Dlaczego bluff-catcherem na riverze {{t:call|sprawdzasz}}, a nie {{t:raise|przebijasz}}?"
    options:
      - { text: "Bo po {{t:raise|przebiciu}} {{t:bluff|blefy}} {{t:fold|spasują}}, a zapłacą tylko lepsze ręce", correct: true, why: "Twoja ręka wygrywa wyłącznie z {{t:bluff|blefami}}. {{t:raise|Przebicie}} wypycha właśnie te ręce, a zostawia te, z którymi przegrywasz." }
      - { text: "Bo {{t:raise|przebijać}} na riverze nie wolno", why: "Wolno. Po prostu {{t:raise}} bluff-catcherem zamienia go w {{t:bluff}} wobec rąk, które nie {{t:fold|spasują}}." }
      - { text: "Bo {{t:call}} jest zawsze tańsze", why: "Nie chodzi o koszt, tylko o to, kto zostaje w grze. Po {{t:raise|przebiciu}} zostają ręce, które cię biją." }
---
Teraz siedzisz po drugiej stronie: to rywal betuje na riverze, a ty masz rękę średnią. Najczęściej będzie to **bluff-catcher**, czyli ręka, która przegrywa z każdą ręką rywala {{t:value|dla wartości}}, ale wygrywa z jego {{t:bluff|blefami}}.

## Twoje equity to jego {{t:bluff|blefy}}

Bluff-catcher wygrywa dokładnie wtedy, gdy rywal {{t:bluff|blefuje}}. Jego equity to więc udział {{t:bluff|blefów}} w betach rywala. {{t:call|Sprawdzasz}}, gdy jest większy niż potrzebne equity z M2:

| Bet rywala | Potrzebne equity ({{t:bluff|blefy}} co najmniej) |
|---|---|
| 1/3 {{t:pot|puli}} | {{n:eq.bet-third}} |
| 1/2 {{t:pot|puli}} | {{n:eq.bet-half}} |
| Cała {{t:pot}} | {{n:eq.bet-pot}} |

Gdy rywal {{t:bluff|blefuje}} dokładnie w takiej proporcji, jak w poprzedniej lekcji ({{n:bluff.share.bet-pot}} przy całej {{t:pot|puli}}), {{t:call}} wychodzi na zero. Gdy {{t:bluff|blefuje}} częściej, {{t:call|sprawdzasz}}; gdy rzadziej, {{t:fold|pasujesz}}. Liczby są bez rake'u; rake trochę podnosi potrzebne equity.

## Ile bronić, a czym

Ile bronić, mówi {{t:mdf}} z M6: przy becie pół {{t:pot|puli}} ok. **{{n:mdf.bet-half}}** {{t:range|zakresu}}. Ta lekcja odpowiada na drugie pytanie: **którymi rękami**. {{t:call|Sprawdzasz}} najlepszymi bluff-catcherami: wśród rąk podobnej siły wybierasz te z lepszymi {{t:blocker|blokerami}}; {{t:fold|pasujesz}} rękami, które przegrywają nawet z {{t:bluff|blefami}}.

Lepszy bluff-catcher:

- wygrywa z większą liczbą {{t:bluff|blefów}} ({{t:pair}} jest lepsza niż sama wysoka karta),
- blokuje ręce rywala {{t:value|dla wartości}},
- nie blokuje jego {{t:bluff|blefów}}.

## {{t:blocker|Blokery}} przy {{t:call|sprawdzaniu}}

To lustro poprzedniej lekcji. Gdy piki nie weszły, rywal {{t:bluff|blefuje}} nietrafionymi {{t:flush-draw|drawami do koloru}}. Pik w twojej ręce zabiera mu część {{t:bluff|blefów}}, więc {{t:call}} jest gorsze. Gdy {{t:flush}} wszedł, as w tym kolorze w twojej ręce zabiera mu najsilniejsze kolory, więc {{t:call}} jest lepsze.

## Nie przebijaj bluff-catcherem

Po {{t:raise|przebiciu}} {{t:bluff|blefy}} {{t:fold|spasują}}, a zapłacą tylko ręce, które cię biją. Bluff-catcherem {{t:call|sprawdzasz}} albo {{t:fold|pasujesz}}.

:::note Gdy rywal rzadko {{t:bluff|blefuje}}
Te zasady zakładają rywala, który {{t:bluff|blefuje}} mniej więcej w równowadze. Wobec gracza, który rzadko {{t:bluff|blefuje}} dużym betem na riverze, {{t:fold|pasujesz}} częściej, niż wskazuje {{t:mdf}}: gdy {{t:bluff|blefów}} jest mniej, niż wymaga cena, {{t:call}} traci (rachunek z tej lekcji). Zasady wyboru bluff-catcherów według {{t:blocker|blokerów}} pochodzą z materiałów szkoleniowych i analiz solverów (gra na riverze, {{t:blocker|blokery}}): solver wybiera {{t:call|sprawdzenia}} bardziej według {{t:blocker|blokerów}} niż według samej siły ręki.
:::
