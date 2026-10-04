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
      - { text: "Bo rywal nie ma żadnego dobierania, więc kolejne karty rzadko zmieniają lidera", correct: true, why: "Tak: flop jest tęczowy i strit nie jest możliwy. Rywal, który teraz przegrywa, ma zwykle mało outów: kilka kart na trójkę albo dwie pary, a bez pary potrzebuje dwóch dobrych kart z rzędu." }
      - { text: "Bo na suchym flopie rywal zawsze pasuje", why: "Nie: rywal z siódemką, dwójką albo słabszym królem może sprawdzić. Suchy flop mówi o dobieraniach, nie o tym, czy rywal spasuje." }
      - { text: "Bo para króli zawsze wygrywa do rivera", why: "Nie: rywal może mieć seta albo dwie pary już teraz. Suchy flop zmniejsza tylko ryzyko, że ktoś cię dogoni." }
---
Po flopie każdy gracz widzi już pięć z siedmiu swoich kart. To, jak trzy karty na stole pasują do rąk graczy, nazywamy teksturą flopa. Od tekstury zależy, kto częściej trafił i czy warto betować. Zanim nauczysz się c-betu (zakładu na flopie po przebiciu przed flopem), naucz się czytać flop na czterech osiach.

## Wysokość

Patrzymy na najwyższą kartę. Flop **wysoki** ma najwyższą kartę asa, króla albo damę, np. [[Ks 7d 2c]]. Flop **średni** ma najwyższą kartę waleta albo dziesiątkę, np. [[Jh 8c 4d]]. Flop **niski** ma najwyższą kartę dziewiątkę albo niższą, np. [[7s 6h 5d]].

## Kolory

Flop **tęczowy** ma trzy różne kolory: nikt nie ma jeszcze dobierania do koloru. Flop **dwukolorowy** ma dwie karty w jednym kolorze, np. [[Jh Th 8c]]: dwie karty gracza w tym kolorze dają dobieranie do koloru. Flop **monotoniczny** ma wszystkie trzy karty w jednym kolorze, np. [[Kh 8h 3h]]: kolor może już być gotowy.

## Rangi

Flop **sparowany** ma dwie karty tej samej rangi, np. [[Qd Qs 6h]]. Strita z dwiema kartami w ręce nikt na nim nie ma, choć dobieranie do strita bywa możliwe (np. na Q-Q-9).

Flop **połączony** ma trzy różne rangi w obrębie pięciu kolejnych, więc strit jest możliwy już teraz: na [[9h 7d 6c]] strita dają np. 85 i T8. As liczy się też jako jedynka, więc [[Ah 5d 3c]] też jest połączony.

Flop **półpołączony** ma w obrębie pięciu kolejnych rang tylko dwie swoje karty. Strita jeszcze nikt nie ma, ale ktoś może mieć dobieranie do strita (otwarte albo gutshot): na [[Kh Qd 4c]] daje je np. JT. Takich flopów jest dużo, bo wystarczą dwie karty blisko siebie.

Flop **rozłączony** ma karty tak odległe, że żadne dwie nie mieszczą się w pięciu kolejnych rangach, np. [[Ks 8d 3c]]. Nikt nie ma tu nawet dobierania do strita. Takich flopów jest niewiele.

## Suchy czy mokry

Liczymy punkty za to, co flop daje w kolorach i w stritach:

- strit możliwy już teraz na kilka sposobów, czyli z co najmniej dwiema różnymi parami rang w ręce (na [[9h 8d 7c]] dają go JT, T6 i 65): {{n:tex.points.straight.made}} pkt,
- strit możliwy tylko na jeden sposób (na [[Ah Kd Tc]] daje go tylko QJ, na [[Ah 4d 2c]] tylko 53): {{n:tex.points.straight.made-one}} pkt,
- samo dobieranie do strita (flop półpołączony albo sparowany z dwiema kartami blisko siebie): {{n:tex.points.straight.draw}} pkt,
- dwie karty w jednym kolorze: {{n:tex.points.suits.two-tone}} pkt; trzy karty w jednym kolorze: {{n:tex.points.suits.monotone}} pkt.

Flop **suchy** ma mniej niż {{n:tex.threshold.medium}} pkt, **mokry** co najmniej {{n:tex.threshold.wet}} pkt, a **pośredni** jest pomiędzy.

| Flop | Kolory | Strit | Razem | Tekstura |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | suchy |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | suchy |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | suchy |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | suchy |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | pośredni |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | pośredni |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | mokry |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | mokry |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | mokry |

Gotowy strit waży więcej niż samo dobieranie, bo zmienia układ sił już teraz. Strit możliwy na kilka sposobów waży więcej niż strit możliwy na jeden: na [[9h 8d 7c]] wiele rąk ma strita albo otwarte dobieranie do strita, a na [[Ah Kd Tc]] strita daje tylko QJ, a otwartego dobierania nie ma nikt. Dlatego A-K-T w trzech kolorach jest pośredni, choć jest połączony.

Dwukolorowy [[Kh 7h 2c]] to flop suchy z jednym dobieraniem do koloru: strita ani dobierania do strita nie ma. Monotoniczny flop jest zawsze mokry: na [[Kh 8h 3h]] kolor albo dobieranie do koloru ma więcej rąk niż strita albo otwarte dobieranie do strita na [[9h 8d 7c]].

Na suchym flopie lider zwykle zostaje liderem do rivera. Na mokrym kolejne karty często zmieniają układ sił, więc ręka najlepsza na flopie jest mniej bezpieczna.

:::note Skąd te definicje
Pojęcia suchy i mokry pochodzą z literatury pokerowej: za suche GTO Gecko i Upswing podają np. K-7-2, A-9-4 i A-A-6 w trzech kolorach, za mokre 9-8-7, Q-J-T i T-9-5-4. Punkty i dokładne granice, np. że flop średni zaczyna się od dziesiątki, to umowa przyjęta w aplikacji, żeby każdy flop dało się ocenić jednoznacznie. Źródła nie podają granic punktowych i nie rozstrzygają, jak nazywać flopy ani suche, ani mokre. Według tej umowy suchych jest ok. {{n:tex.share.dry}} wszystkich flopów, pośrednich ok. {{n:tex.share.medium}}, a mokrych ok. {{n:tex.share.wet}}; to wynik definicji aplikacji, nie liczba z literatury.
:::
