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
    prompt: "Bronisz duży blind. Na riverze czekasz, a Button stawia całą pulę. Piki nie weszły. Jaką rolę ma twoja para dziewiątek?"
    table: { hand: "9c 8c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Bluff-catcher: wygrywa tylko z blefami", correct: true, why: "Za całą pulę Button betuje dla wartości co najmniej królem, a blefuje głównie nietrafionymi dobieraniami. Twoja para przegrywa z każdą jego ręką dla wartości i wygrywa z każdym blefem." }
      - { text: "Ręka dla wartości", why: "Ręka dla wartości wygrywa z rękami, które płacą lub betują dla wartości. Para dziewiątek przegrywa z każdym królem i lepszą ręką Buttona." }
      - { text: "Ręka bez szans", why: "Para dziewiątek wygrywa z nietrafionymi dobieraniami, a tymi Button blefuje. Ma szanse, ale tylko przeciw blefom." }
  - kind: numeric
    id: m8.l4.n-need-pot
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. W puli jest {{n:ex.pot}}, rywal stawia całą pulę: {{n:ex.bet.pot}}. Masz bluff-catcher. Ile co najmniej procent jego betów musi być blefami, żeby sprawdzenie się opłacało? Wpisz liczbę."
    answer: eq.bet-pot
    explanation: "Twoje equity to udział blefów w jego betach. Dopłacasz {{n:ex.bet.pot}}, żeby wygrać pulę po sprawdzeniu: {{n:ex.bet.pot}} ÷ ({{n:ex.pot}} + {{n:ex.bet.pot}} + {{n:ex.bet.pot}}) = {{n:eq.bet-pot}}. To ta sama liczba, co udział blefów w równowadze z poprzedniej lekcji."
  - kind: choice
    id: m8.l4.q-few-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Rywal stawia pół puli. Masz bluff-catcher i szacujesz, że blefy to ok. {{n:catch.ex.bluffs-low}} jego betów. Co robisz?"
    options:
      - { text: "Pasuję", correct: true, why: "Potrzebujesz {{n:eq.bet-half}} equity, a twój bluff-catcher wygrywa tylko w {{n:catch.ex.bluffs-low}} przypadków. Sprawdzenie traci." }
      - { text: "Sprawdzam, bo MDF wynosi {{n:mdf.bet-half}}", why: "MDF chroni przed rywalem, który blefuje wystarczająco często. Gdy blefów jest za mało, sprawdzanie bluff-catcherami oddaje pieniądze." }
      - { text: "Przebijam", why: "Twoja ręka wygrywa tylko z blefami. Po przebiciu blefy spasują, a zapłacą ręce dla wartości: przegrywasz więcej." }
  - kind: choice
    id: m8.l4.q-many-bluffs
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "River. Rywal stawia całą pulę. Masz bluff-catcher i szacujesz, że blefy to ok. {{n:catch.ex.bluffs-high}} jego betów. Co robisz?"
    options:
      - { text: "Sprawdzam", correct: true, why: "Potrzebujesz {{n:eq.bet-pot}} equity, a blefów jest {{n:catch.ex.bluffs-high}}. Rywal blefuje więcej, niż wynosi równowaga, więc sprawdzenie zarabia." }
      - { text: "Pasuję, bo bet jest duży", why: "Duży bet podnosi cenę do {{n:eq.bet-pot}}, ale blefów jest więcej. Liczy się porównanie tych dwóch liczb, a nie sam rozmiar betu." }
      - { text: "Przebijam all-in", why: "Bluff-catcher nie przebija: blefy spasują, a zapłacą tylko ręce lepsze od twojej." }
  - kind: choice
    id: m8.l4.q-indifferent
    family: m8.catch.math
    rules: [R-M8-010]
    prompt: "Rywal betuje na riverze całą pulę i blefuje dokładnie w {{n:bluff.share.bet-pot}} przypadków. Ile zarabiasz, sprawdzając bluff-catcherem?"
    options:
      - { text: "Nic: sprawdzenie i pas wychodzą na to samo", correct: true, why: "Udział blefów równy {{n:eq.bet-pot}} to dokładnie cena sprawdzenia. Wygrane na blefach równoważą przegrane z wartością, więc rywal nie daje ci zarobić ani sprawdzeniem, ani pasem." }
      - { text: "Zarabiam, bo blefów jest dużo", why: "Jest ich dokładnie tyle, ile wynosi cena. Zarabiasz dopiero, gdy rywal blefuje częściej niż {{n:eq.bet-pot}}." }
      - { text: "Tracę, bo wartości jest więcej niż blefów", why: "Wartości jest więcej, ale sprawdzając, ryzykujesz {{n:ex.bet.pot}}, żeby wygrać {{n:ex.pot}} + {{n:ex.bet.pot}}. Przy takim udziale blefów te dwie rzeczy się równoważą." }
  - kind: choice
    id: m8.l4.q-unblock-bluffs
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Piki nie weszły. Na riverze czekasz, a Button stawia całą pulę. Masz najwyższą parę z dziesiątką. Z którą z tych dwóch rąk sprawdzenie jest lepsze?"
    table: { board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "[[Kc Tc]]", correct: true, why: "Bez pików nie blokujesz nietrafionych dobierań do koloru, czyli głównych blefów Buttona (np. dziesiątka z waletem w pikach). W jego zakresie zostaje więcej blefów, z którymi wygrywasz." }
      - { text: "[[Kc Ts]]", why: "Dziesiątka pik zabiera Buttonowi część nietrafionych dobierań, którymi blefuje (np. walet z dziesiątką w pikach). Zostaje mu relatywnie więcej wartości, więc sprawdzenie jest gorsze." }
      - { text: "Bez różnicy", why: "Siła przy showdownie jest ta sama, ale pik w twojej ręce blokuje blefy Buttona. To zmienia, z czym naprawdę grasz." }
  - kind: choice
    id: m8.l4.q-block-value
    family: m8.catch.blockers
    rules: [R-M8-011]
    prompt: "Na riverze weszła trzecia karta kier. Czekasz, a Button stawia całą pulę. Masz parę dziewiątek. Z którą z tych dwóch rąk sprawdzenie jest lepsze?"
    table: { board: "Kh 9h 4c 2s 6h", position: BB }
    options:
      - { text: "[[Ah 9c]]", correct: true, why: "As kier blokuje kolor z asem, jedną z najsilniejszych rąk Buttona dla wartości. Gdy blokujesz jego wartość, wśród jego betów zostaje więcej blefów." }
      - { text: "[[Ad 9c]]", why: "Ta sama para, ale nie blokujesz żadnego koloru. Button ma wszystkie swoje kolory, z którymi przegrywasz." }
      - { text: "Bez różnicy", why: "Przy showdownie obie ręce są tak samo silne, ale as kier zabiera Buttonowi część rąk dla wartości." }
  - kind: choice
    id: m8.l4.q-no-chance
    family: m8.catch.hands
    rules: [R-M8-012]
    prompt: "Piki nie weszły. Na riverze czekasz, a Button stawia pół puli. Co robisz?"
    table: { hand: "7c 6c", board: "Kd 9s 5s 2c 3h", position: BB }
    options:
      - { text: "Pasuję", correct: true, why: "Masz tylko siódemkę jako najwyższą kartę. Przegrywasz nawet z większością blefów Buttona (dama z pikami, walet z pikami), więc to nie jest bluff-catcher. Bronisz innymi rękami." }
      - { text: "Sprawdzam, bo cena jest dobra", why: "Cena ({{n:eq.bet-half}}) nie pomoże ręce, która przegrywa prawie ze wszystkim, nawet z blefami." }
      - { text: "Przebijam jako blef", why: "Przebicie blefem na riverze to zagranie zaawansowane i ryzykowne. Prostsze i lepsze jest spasowanie ręki bez szans." }
  - kind: choice
    id: m8.l4.q-which-defend
    family: m8.catch.hands
    rules: [R-M8-012, R-M6-001]
    prompt: "River. Rywal stawia pół puli. MDF wynosi {{n:mdf.bet-half}}. Które ręce bronisz w pierwszej kolejności?"
    options:
      - { text: "Najlepsze bluff-catchery: wygrywają z większością blefów i mają dobre blokery", correct: true, why: "Bronisz ręce, które wygrywają z największą liczbą blefów i blokują wartość rywala. Pasujesz najsłabszymi rękami, które przegrywają nawet z blefami." }
      - { text: "Losowe {{n:mdf.bet-half}} zakresu", why: "MDF mówi, ile bronić, a nie czym. Losowa obrona płaci rękami, które nigdy nie wygrają." }
      - { text: "Tylko ręce dla wartości", why: "Wtedy bronisz za mało i rywal zarabia, blefując dowolnymi kartami. Do MDF dokładasz najlepsze bluff-catchery." }
  - kind: choice
    id: m8.l4.q-raise-catcher
    family: m8.catch.concept
    rules: [R-M8-010]
    prompt: "Dlaczego bluff-catcherem na riverze sprawdzasz, a nie przebijasz?"
    options:
      - { text: "Bo po przebiciu blefy spasują, a zapłacą tylko lepsze ręce", correct: true, why: "Twoja ręka wygrywa wyłącznie z blefami. Przebicie wypycha właśnie te ręce, a zostawia te, z którymi przegrywasz." }
      - { text: "Bo przebijać na riverze nie wolno", why: "Wolno. Po prostu przebicie bluff-catcherem zamienia go w blef wobec rąk, które nie spasują." }
      - { text: "Bo sprawdzenie jest zawsze tańsze", why: "Nie chodzi o koszt, tylko o to, kto zostaje w grze. Po przebiciu zostają ręce, które cię biją." }
---
Teraz siedzisz po drugiej stronie: to rywal betuje na riverze, a ty masz rękę średnią. Najczęściej będzie to **bluff-catcher**, czyli ręka, która przegrywa z każdą ręką rywala dla wartości, ale wygrywa z jego blefami.

## Twoje equity to jego blefy

Bluff-catcher wygrywa dokładnie wtedy, gdy rywal blefuje. Jego equity to więc udział blefów w betach rywala. Sprawdzasz, gdy jest większy niż potrzebne equity z M2:

| Bet rywala | Potrzebne equity (blefy co najmniej) |
|---|---|
| 1/3 puli | {{n:eq.bet-third}} |
| 1/2 puli | {{n:eq.bet-half}} |
| Cała pula | {{n:eq.bet-pot}} |

Gdy rywal blefuje dokładnie w takiej proporcji, jak w poprzedniej lekcji ({{n:bluff.share.bet-pot}} przy całej puli), sprawdzenie wychodzi na zero. Gdy blefuje częściej, sprawdzasz; gdy rzadziej, pasujesz.

## Ile bronić, a czym

Ile bronić, mówi MDF z M6: przy becie pół puli ok. **{{n:mdf.bet-half}}** zakresu. Ta lekcja odpowiada na drugie pytanie: **którymi rękami**. Bronisz najlepszymi bluff-catcherami, a pasujesz najsłabszymi.

Lepszy bluff-catcher:

- wygrywa z większą liczbą blefów (para jest lepsza niż sama wysoka karta),
- blokuje ręce rywala dla wartości,
- nie blokuje jego blefów.

## Blokery przy sprawdzaniu

To lustro poprzedniej lekcji. Gdy piki nie weszły, rywal blefuje nietrafionymi dobieraniami do koloru. Pik w twojej ręce zabiera mu część blefów, więc sprawdzenie jest gorsze. Gdy kolor wszedł, as w tym kolorze w twojej ręce zabiera mu najsilniejsze kolory, więc sprawdzenie jest lepsze.

## Nie przebijaj bluff-catcherem

Po przebiciu blefy spasują, a zapłacą tylko ręce, które cię biją. Bluff-catcherem sprawdzasz albo pasujesz.

:::note Gdy rywal rzadko blefuje
Te zasady zakładają rywala, który blefuje mniej więcej w równowadze. Wobec gracza, który rzadko blefuje dużym betem na riverze, pasujesz częściej, niż wskazuje MDF (reguła z M6). Zasady wyboru bluff-catcherów według blokerów pochodzą z artykułów znanych tylko ze streszczeń i czekają na weryfikację.
:::
