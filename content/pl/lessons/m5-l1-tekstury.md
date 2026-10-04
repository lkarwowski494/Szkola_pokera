---
id: m5.l1
module: m5
order: 1
title: "Tekstura flopa"
sub: "Wysokość, kolory, połączenie"
rules: [R-M5-001, R-M5-002]
drills:
  - kind: texture
    id: m5.l1.t-axes
    family: m5.texture.axes
    rules: [R-M5-001, R-M5-002]
    axes: [height, suits, ranks]
    count: 5
  - kind: texture
    id: m5.l1.t-wet
    family: m5.texture.wetness
    rules: [R-M5-001, R-M5-002]
    axes: [wetness]
    count: 4
  - kind: choice
    id: m5.l1.q-connected
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Który z tych flopów jest połączony, czyli strit jest na nim możliwy już teraz?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Tak: dziewiątka, siódemka i szóstka mieszczą się w pięciu kolejnych rangach. Strita dają np. 85 albo T8." }
      - { text: "[[Ks 8d 3c]]", why: "Nie: od trójki do króla jest za daleko. Żadne dwie karty nie dadzą tu strita." }
      - { text: "[[Qd Qs 9h]]", why: "Nie: flop sparowany. Z dwiema kartami w ręce i parą na stole strit jest niemożliwy, bo do strita potrzeba pięciu różnych rang." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Flop jest monotoniczny: wszystkie trzy karty są w jednym kolorze. Co to oznacza?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Gracz z dwiema kartami w tym kolorze ma już kolor", correct: true, why: "Tak: trzy kiery na stole i dwa w ręce to pięć kart w kolorze. Gracz z jednym kierem ma dobieranie do koloru." }
      - { text: "Nikt nie może mieć jeszcze koloru", why: "Nie: do koloru potrzeba pięciu kart, a trzy już leżą na stole. Wystarczą dwie w ręce." }
      - { text: "Kolor jest możliwy dopiero od turnu", why: "Nie: tak jest na flopie dwukolorowym. Na monotonicznym kolor może być gotowy już teraz." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Masz [[Ac Kd]], a flop to [[Ks 7d 2c]]. Dlaczego na takim flopie para z dobrym kickerem jest bezpieczniejsza niż na flopie mokrym?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Bo rywal nie ma żadnego dobierania, więc kolejne karty rzadko zmieniają lidera", correct: true, why: "Tak: flop jest tęczowy i strit nie jest możliwy. Rywal, który teraz przegrywa, potrzebuje zwykle dwóch dobrych kart z rzędu." }
      - { text: "Bo na suchym flopie rywal zawsze pasuje", why: "Nie: rywal z siódemką, dwójką albo słabszym królem może sprawdzić. Suchy flop mówi o dobieraniach, nie o tym, czy rywal spasuje." }
      - { text: "Bo para króli zawsze wygrywa do rivera", why: "Nie: rywal może mieć seta albo dwie pary już teraz. Suchy flop zmniejsza tylko ryzyko, że ktoś cię dogoni." }
---
Po flopie każdy gracz widzi już pięć z siedmiu swoich kart. To, jak trzy karty na stole pasują do rąk graczy, nazywamy teksturą flopa. Od tekstury zależy, kto częściej trafił i czy warto betować. Zanim nauczysz się c-betu (zakładu na flopie po przebiciu przed flopem), naucz się czytać flop na czterech osiach.

## Wysokość

Patrzymy na najwyższą kartę. Flop **wysoki** ma najwyższą kartę asa, króla albo damę, np. [[Ks 7d 2c]]. Flop **średni** ma najwyższą kartę waleta albo dziesiątkę, np. [[Jh 8c 4d]]. Flop **niski** ma najwyższą kartę dziewiątkę albo niższą, np. [[7s 6h 5d]].

## Kolory

Flop **tęczowy** ma trzy różne kolory: nikt nie ma jeszcze dobierania do koloru. Flop **dwukolorowy** ma dwie karty w jednym kolorze, np. [[Jh Th 8c]]: dwie karty gracza w tym kolorze dają dobieranie do koloru. Flop **monotoniczny** ma wszystkie trzy karty w jednym kolorze, np. [[Kh 8h 3h]]: kolor może już być gotowy.

## Rangi

Flop **sparowany** ma dwie karty tej samej rangi, np. [[Qd Qs 6h]]. Flop **połączony** ma trzy różne rangi w obrębie pięciu kolejnych, więc strit jest możliwy już teraz: na [[9h 7d 6c]] strita dają np. 85 i T8. As liczy się też jako jedynka, więc [[Ah 5d 3c]] też jest połączony. Pozostałe flopy są **rozłączone**, np. [[Ks 8d 3c]].

## Suchy czy mokry

Liczymy drogi do dobierania: kolor (flop dwukolorowy albo monotoniczny) i strit (flop połączony). Flop **suchy** nie daje żadnej, **pośredni** daje jedną, **mokry** obie naraz.

| Flop | Kolor | Strit | Tekstura |
|---|---|---|---|
| [[Ks 7d 2c]] | nie | nie | suchy |
| [[Qd Qs 6h]] | nie | nie | suchy |
| [[9h 8d 7c]] | nie | tak | pośredni |
| [[Kh 8h 3h]] | tak | nie | pośredni |
| [[Jh Th 8c]] | tak | tak | mokry |

Na suchym flopie lider zwykle zostaje liderem do rivera. Na mokrym kolejne karty często zmieniają układ sił, więc ręka najlepsza na flopie jest mniej bezpieczna.

:::note Skąd te definicje
Pojęcia suchy i mokry pochodzą z literatury pokerowej (Upswing, GTO Gecko). Dokładne granice, np. że flop średni zaczyna się od dziesiątki, to umowa przyjęta w aplikacji, żeby każdy flop dało się ocenić jednoznacznie. W innych źródłach granice bywają trochę inne.
:::
