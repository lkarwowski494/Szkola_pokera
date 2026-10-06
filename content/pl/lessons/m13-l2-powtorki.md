---
id: m13.l2
module: m13
order: 2
title: "Powtórki z gry i trening celowany"
sub: "Co dzieje się z twoimi błędami"
rules: [R-M13-003, R-M13-004, R-M10-003]
drills:
  - kind: choice
    id: m13.l2.q-swap
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "W grze miałeś A♥ K♥ na {{t:board|stole}} Q♥ 7♥ 2♣ i popełniłeś błąd. W powtórce widzisz A♠ K♠ na {{t:board|stole}} Q♠ 7♠ 2♦. Czy poprawna decyzja jest ta sama?"
    options:
      - { text: "Tak: wszystkie kolory zamieniono jedną zamianą", correct: true, why: "Kiery stały się pikami, a trefle karami, wszędzie naraz. Nadal masz {{t:flush-draw|draw do koloru}} z asem i tę samą siłę ręki, więc decyzja się nie zmienia." }
      - { text: "Nie: piki są mocniejsze od kierów", why: "W Texas Hold'em kolory są równe: liczy się tylko, czy karty są w tym samym kolorze, a nie w którym." }
      - { text: "Nie wiadomo, trzeba policzyć od nowa", why: "Nie trzeba: zamiana wszystkich kolorów naraz zachowuje każdy układ i każdy {{t:draw|draw}}. To rachunek, a nie przybliżenie." }
  - kind: choice
    id: m13.l2.q-swap-wrong
    family: m13.suit-swap
    rules: [R-M13-003]
    prompt: "Która z tych zmian NIE zachowuje decyzji z sytuacji: K♥ Q♥ na {{t:board|stole}} J♥ 8♥ 3♠?"
    options:
      - { text: "K♥ Q♥ na {{t:board|stole}} J♠ 8♠ 3♥", correct: true, why: "Tu zamieniono kolory tylko na {{t:board|stole}}: twoje kiery przestały pasować do {{t:board|stołu}} i {{t:flush-draw|draw do koloru}} zniknął. To już inna sytuacja." }
      - { text: "K♠ Q♠ na {{t:board|stole}} J♠ 8♠ 3♥", why: "To jedna zamiana dla wszystkich kart (kiery ↔ piki), więc decyzja jest ta sama." }
      - { text: "K♦ Q♦ na {{t:board|stole}} J♦ 8♦ 3♠", why: "To jedna zamiana (kiery → kara) dla wszystkich kart, więc decyzja jest ta sama." }
  - kind: choice
    id: m13.l2.q-cards
    family: m13.cards
    rules: []
    prompt: "Które decyzje z raportu trafiają do powtórek jako karty?"
    options:
      - { text: "Błędy, niedokładności i decyzje po przekroczonym czasie", correct: true, why: "Tak. Dopuszczalna decyzja nie jest błędem, więc nie tworzy karty. Ta sama reguła z tą samą klasą ręki w tym samym spocie daje jedną kartę, nie kilka." }
      - { text: "Wszystkie ocenione decyzje", why: "Zgodne i dopuszczalne nie wymagają poprawy, a powtórki mają ćwiczyć to, co poszło źle." }
      - { text: "Tylko błędy, bez niedokładności", why: "Niedokładność (dobra akcja, zły rozmiar) liczy się jak błąd, więc też wraca w powtórkach." }
  - kind: choice
    id: m13.l2.q-family
    family: m13.cards
    rules: []
    prompt: "W ciągu {{n:game.recall.days}} dni popełniłeś {{n:game.recall.count}} błędy w tej samej rodzinie spotów (np. obrona {{t:big-blind|dużego blinda}} wobec Buttona). Co zrobi aplikacja?"
    options:
      - { text: "Przywróci całą rodzinę do powtórek: nowe ręce z tego spotu", correct: true, why: "Tak: pojedynczą sytuację powtarza jej karta, a powtarzający się błąd w jednej rodzinie przywraca zadania z całej rodziny, z nowymi rękami." }
      - { text: "Nic, karty błędów wystarczą", why: "Karta powtarza jedną konkretną sytuację. Powtarzający się błąd w rodzinie oznacza, że warto przećwiczyć ją szerzej." }
      - { text: "Zablokuje obszar tego modułu", why: "Obszar odblokowany po lekcjach zostaje dostępny. Aplikacja tylko dokłada powtórki." }
  - kind: choice
    id: m13.l2.q-vpip
    family: m13.sample
    rules: [R-M13-004, R-M10-003]
    prompt: "Po {{t:session|sesji}} kilkudziesięciu rozdań liczysz, że wszedłeś do gry w prawie połowie z nich. Co z tego wynika?"
    options:
      - { text: "Na razie nic: to za mała próba", correct: true, why: "Nawet {{t:vpip}} czyta się po ok. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} rękach. Z jednej {{t:session|sesji}} ocenisz pojedyncze decyzje, ale nie swoje częstotliwości." }
      - { text: "Grasz za luźno i trzeba to zmienić", why: "Może tak, może nie: kilkadziesiąt rozdań to za mało, żeby odróżnić styl od rozkładu kart. Patrz na ocenę każdej decyzji wejścia do gry." }
      - { text: "Grasz dobrze, bo dużo rozdań wygrałeś", why: "Wynik nie mówi o jakości decyzji, a jedna {{t:session}} nie mówi o częstotliwościach." }
  - kind: choice
    id: m13.l2.q-opps
    family: m13.sample
    rules: [R-M13-004]
    prompt: "W {{t:session|sesji}} dostałeś 4-bet dwa razy i dwa razy {{t:fold|spasowałeś}}. Czy wiesz już, że {{t:fold|pasujesz}} na 4-bet za często?"
    options:
      - { text: "Nie: liczą się okazje, a dwie to za mało", correct: true, why: "BlackRain79 patrzy na statystykę dopiero przy ok. {{n:hud.opps.look}} okazjach, a pewności nabiera przy ok. {{n:hud.opps.sure}}. Dwie okazje to szum; oceniasz każdą z tych decyzji osobno." }
      - { text: "Tak: {{t:fold|pasujesz}} w każdej sytuacji", why: "Dwa razy na dwa wygląda jak „zawsze”, ale przy dwóch okazjach nawet strategia, która {{t:fold|pasuje}} w połowie przypadków, często da taki wynik." }
      - { text: "Tak, jeśli to było w jednej {{t:session|sesji}}", why: "Jedna {{t:session}} niczego nie dodaje: liczba okazji jest dalej mała." }
  - kind: choice
    id: m13.l2.q-area
    family: m13.cards
    rules: []
    prompt: "Kiedy odblokuje się obszar gry „Flop: c-bet”?"
    options:
      - { text: "Po ukończeniu wszystkich lekcji modułu", correct: true, why: "Tak: obszar rozdaje tylko sytuacje z modułu, więc odblokowuje się, gdy znasz już jego reguły. Gra swobodna jest dostępna od początku." }
      - { text: "Po wygraniu kilku {{t:session|sesji}}", why: "Wynik w {{t:chips|żetonach}} nie odblokowuje niczego: to głównie szum." }
      - { text: "Od razu, jak gra swobodna", why: "Gra swobodna jest dostępna od pierwszego dnia, a obszary dopiero po lekcjach modułu." }
---
Każdy błąd z raportu wraca do ciebie w powtórkach. Ta lekcja pokazuje, jak.

## Ta sama sytuacja w innych kolorach

Błąd, niedokładność i decyzja po przekroczonym czasie stają się kartami powtórek. Karta pokazuje tę samą sytuację: te same {{t:position|pozycje}}, akcje i rozmiary, te same rangi kart. Zmieniają się tylko kolory: aplikacja zamienia je jedną zamianą dla wszystkich kart naraz, np. kiery na piki, a piki na kiery.

Taka zamiana nie zmienia siły żadnej ręki ani żadnego {{t:draw|drawa}}, bo liczy się tylko to, czy karty są w tym samym kolorze. Poprawna decyzja jest więc ta sama, a ty uczysz się rozpoznawać sytuację, a nie zapamiętywać obrazek.

Ta sama reguła z tą samą klasą ręki w tym samym spocie daje jedną kartę, nie kilka. Nowe karty z gry wchodzą do powtórek w granicach dziennego limitu; reszta czeka na kolejne dni.

## Gdy błąd się powtarza

Jeśli w ciągu {{n:game.recall.days}} dni masz co najmniej {{n:game.recall.count}} błędy albo niedokładności w tej samej rodzinie spotów, aplikacja przywraca do powtórek całą rodzinę: zadania z nowymi rękami z tego spotu. Liczą się błędy decyzji, a nie przegrane rozdania. Te progi to wartości startowe, które poprawimy na danych z używania aplikacji.

## Trening celowany

Obszar gry to jeden moduł kursu. Odblokowuje się po ukończeniu wszystkich lekcji modułu i rozdaje tylko sytuacje z niego, np. c-bet po {{t:open|otwarciu}} z Buttona. Z raportu przejdziesz prosto do obszaru, w którym było najwięcej błędów.

## Jedna {{t:session|sesja}} to nie statystyka

Raport nie pokazuje twoich częstotliwości, np. jak często wchodzisz do gry. Nawet {{t:vpip}} czyta się po ok. {{n:hud.hands.vpip.low}}–{{n:hud.hands.vpip.high}} rękach, a rzadkie sytuacje zdarzają się w {{t:session|sesji}} kilka razy. BlackRain79 radzi liczyć okazje, a nie rozdania: patrzy na statystykę przy ok. {{n:hud.opps.look}} okazjach, a pewności nabiera przy ok. {{n:hud.opps.sure}}.

:::note Skąd te zasady
Zamiana kolorów to rachunek: ranking układów nie rozróżnia kolorów. Próby rąk jak w module o {{t:exploit|eksploatacji}} (PokerCoaching, Deepfold), liczba okazji: BlackRain79, Poker {{t:hud|HUD}} Stats: The Sample Size You Need. Progi powtórek to ustawienia aplikacji, bez źródła.
:::
