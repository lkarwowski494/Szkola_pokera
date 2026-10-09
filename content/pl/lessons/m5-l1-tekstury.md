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
    prompt: "Który z tych flopów jest {{t:connected}}, czyli {{t:straight}} jest na nim możliwy już teraz?"
    options:
      - { text: "[[9h 7d 6c]]", correct: true, why: "Tak: dziewiątka, siódemka i szóstka mieszczą się w pięciu kolejnych rangach. {{t:straight|Strita}} dają np. 85 albo T8." }
      - { text: "[[Ks 8d 3c]]", why: "Nie: od trójki do króla jest za daleko. Żadne dwie karty nie dadzą tu {{t:straight|strita}}." }
      - { text: "[[Qd Qs 9h]]", why: "Nie: flop {{t:paired}}. Z dwiema kartami w ręce i {{t:pair|parą}} na {{t:board|stole}} {{t:straight}} jest niemożliwy, bo do {{t:straight|strita}} potrzeba pięciu różnych rang." }
  - kind: choice
    id: m5.l1.q-monotone
    family: m5.texture.facts
    rules: [R-M5-002]
    prompt: "Flop jest {{t:monotone}}: wszystkie trzy karty są w jednym kolorze. Co to oznacza?"
    table: { board: "Kh 8h 3h" }
    options:
      - { text: "Gracz z dwiema kartami w tym kolorze ma już {{t:flush}}", correct: true, why: "Tak: trzy kiery na {{t:board|stole}} i dwa w ręce to pięć kart w kolorze. Gracz z jednym kierem ma {{t:flush-draw}}." }
      - { text: "Nikt nie może mieć jeszcze {{t:flush|koloru}}", why: "Nie: do {{t:flush|koloru}} potrzeba pięciu kart, a trzy już leżą na {{t:board|stole}}. Wystarczą dwie w ręce." }
      - { text: "{{t:flush|Kolor}} jest możliwy dopiero od turnu", why: "Nie: tak jest na flopie {{t:two-tone|dwukolorowym}}. Na {{t:monotone|jednokolorowym}} {{t:flush}} może być gotowy już teraz." }
  - kind: choice
    id: m5.l1.q-dry
    family: m5.texture.facts
    rules: [R-M5-001]
    prompt: "Masz [[Ac Kd]], a flop to [[Ks 7d 2c]]. Dlaczego na takim flopie {{t:pair}} z dobrym kickerem jest bezpieczniejsza niż na flopie {{t:wet|mokrym}}?"
    table: { hand: "Ac Kd", board: "Ks 7d 2c" }
    options:
      - { text: "Bo rywal nie ma żadnego {{t:draw|drawa}}, więc kolejne karty rzadko zmieniają lidera", correct: true, why: "Tak: flop jest {{t:rainbow}} i {{t:straight}} nie jest możliwy. Rywal, który teraz przegrywa, ma zwykle mało outów: kilka kart na {{t:three-of-a-kind|trójkę}} albo {{t:two-pair}}, a bez {{t:pair|pary}} potrzebuje dwóch dobrych kart z rzędu." }
      - { text: "Bo na {{t:dry|suchym}} flopie rywal zawsze {{t:fold|pasuje}}", why: "Nie: rywal z siódemką, dwójką albo słabszym królem może {{t:call|sprawdzić}}. {{t:dry|Suchy}} flop mówi o {{t:draw|drawach}}, nie o tym, czy rywal {{t:fold|spasuje}}." }
      - { text: "Bo {{t:pair}} króli zawsze wygrywa do rivera", why: "Nie: rywal może mieć seta albo {{t:two-pair}} już teraz. {{t:dry|Suchy}} flop zmniejsza tylko ryzyko, że ktoś cię dogoni." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar board
  - kind: generated
    id: m5.l1.g-vocab-board
    family: vocab.board
    generator: vocab
    params: { area: board, dir: both }
    count: 4
---
Po flopie każdy gracz widzi już pięć z siedmiu swoich kart. To, jak trzy karty na {{t:board|stole}} pasują do rąk graczy, nazywamy {{t:texture|teksturą}} flopa. Od {{t:texture|tekstury}} zależy, kto częściej trafił i czy warto betować. Zanim nauczysz się c-betu ({{t:bet|zakładu}} na flopie po {{t:raise|przebiciu}} przed flopem), naucz się czytać flop na czterech osiach.

## Wysokość

Patrzymy na najwyższą kartę. Flop **wysoki** ma najwyższą kartę asa, króla albo damę, np. [[Ks 7d 2c]]. Flop **średni** ma najwyższą kartę waleta albo dziesiątkę, np. [[Jh 8c 4d]]. Flop **niski** ma najwyższą kartę dziewiątkę albo niższą, np. [[7s 6h 5d]].

## Kolory

Flop **{{t:rainbow}}** ma trzy różne kolory: nikt nie ma jeszcze {{t:flush-draw|drawa do koloru}}. Flop **{{t:two-tone}}** ma dwie karty w jednym kolorze, np. [[Jh Th 8c]]: dwie karty gracza w tym kolorze dają {{t:flush-draw}}. Flop **{{t:monotone}}** ma wszystkie trzy karty w jednym kolorze, np. [[Kh 8h 3h]]: {{t:flush}} może już być gotowy.

## Rangi

Flop **{{t:paired}}** ma dwie karty tej samej rangi, np. [[Qd Qs 6h]]. {{t:straight|Strita}} z dwiema kartami w ręce nikt na nim nie ma, choć {{t:straight-draw}} bywa możliwy (np. na Q-Q-9).

Flop **{{t:connected}}** ma trzy różne rangi w obrębie pięciu kolejnych, więc {{t:straight}} jest możliwy już teraz: na [[9h 7d 6c]] {{t:straight|strita}} dają np. 85 i T8. As liczy się też jako jedynka, więc [[Ah 5d 3c]] też jest {{t:connected}}.

Flop **{{t:semi-connected|półpołączony}}** ma w obrębie pięciu kolejnych rang tylko dwie swoje karty. {{t:straight|Strita}} jeszcze nikt nie ma, ale ktoś może mieć {{t:straight-draw}} (otwarty albo gutshot): na [[Kh Qd 4c]] daje go np. JT. Takich flopów jest dużo, bo wystarczą dwie karty blisko siebie.

Flop **{{t:disconnected}}** ma karty tak odległe, że żadne dwie nie mieszczą się w pięciu kolejnych rangach, np. [[Ks 8d 3c]]. Nikt nie ma tu nawet {{t:straight-draw|drawa do strita}}. Takich flopów jest niewiele.

## {{t:dry|Suchy}} czy {{t:wet}}

Liczymy punkty za to, co flop daje w kolorach i w {{t:straight|stritach}}:

- {{t:straight}} możliwy już teraz na kilka sposobów, czyli z co najmniej dwoma różnymi zestawami dwóch rang w ręce (na [[9h 8d 7c]] dają go JT, T6 i 65): {{n:tex.points.straight.made}} pkt,
- {{t:straight}} możliwy tylko na jeden sposób (na [[Ah Kd Tc]] daje go tylko QJ, na [[Ah 4d 2c]] tylko 53): {{n:tex.points.straight.made-one}} pkt,
- sam {{t:straight-draw}} (flop {{t:semi-connected|półpołączony}} albo {{t:paired}} z dwiema kartami blisko siebie): {{n:tex.points.straight.draw}} pkt,
- dwie karty w jednym kolorze: {{n:tex.points.suits.two-tone}} pkt; trzy karty w jednym kolorze: {{n:tex.points.suits.monotone}} pkt.

Flop **{{t:dry}}** ma mniej niż {{n:tex.threshold.medium}} pkt, **{{t:wet}}** co najmniej {{n:tex.threshold.wet}} pkt, a **pośredni** jest pomiędzy.

| Flop | Kolory | {{t:straight|Strit}} | Razem | {{t:texture|Tekstura}} |
|---|---|---|---|---|
| [[Ks 7d 2c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72}} | {{t:dry}} |
| [[Qd Qs 6h]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.none}} | {{n:tex.ex.qq6}} | {{t:dry}} |
| [[Kh 7h 2c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k72-two-tone}} | {{t:dry}} |
| [[Kh Qd 4c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.kq4}} | {{t:dry}} |
| [[Jh 7h 4s]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.draw}} | {{n:tex.ex.j74}} | pośredni |
| [[Ah Kd Tc]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made-one}} | {{n:tex.ex.akt}} | pośredni |
| [[Kh 8h 3h]] | {{n:tex.points.suits.monotone}} | {{n:tex.points.straight.none}} | {{n:tex.ex.k83}} | {{t:wet}} |
| [[9h 8d 7c]] | {{n:tex.points.suits.rainbow}} | {{n:tex.points.straight.made}} | {{n:tex.ex.987}} | {{t:wet}} |
| [[Jh Th 8c]] | {{n:tex.points.suits.two-tone}} | {{n:tex.points.straight.made}} | {{n:tex.ex.jt8}} | {{t:wet}} |

Gotowy {{t:straight}} waży więcej niż sam {{t:draw}}, bo zmienia układ sił już teraz. {{t:straight|Strit}} możliwy na kilka sposobów waży więcej niż {{t:straight}} możliwy na jeden: na [[9h 8d 7c]] wiele rąk ma {{t:straight|strita}} albo {{t:oesd}}, a na [[Ah Kd Tc]] {{t:straight|strita}} daje tylko QJ, a otwartego {{t:draw|drawa}} nie ma nikt. Dlatego A-K-T w trzech kolorach jest pośredni, choć jest {{t:connected}}.

{{t:two-tone|Dwukolorowy}} [[Kh 7h 2c]] to flop {{t:dry}} z jednym {{t:flush-draw|drawem do koloru}}: {{t:straight|strita}} ani {{t:straight-draw|drawa do strita}} nie ma. {{t:monotone|Jednokolorowy}} flop jest zawsze {{t:wet}}: na [[Kh 8h 3h]] {{t:flush}} albo {{t:flush-draw}} ma więcej rąk niż {{t:straight|strita}} albo {{t:oesd}} na [[9h 8d 7c]].

Na {{t:dry|suchym}} flopie lider zwykle zostaje liderem do rivera. Na {{t:wet|mokrym}} kolejne karty często zmieniają układ sił, więc ręka najlepsza na flopie jest mniej bezpieczna.

:::note Skąd te definicje
Pojęcia {{t:dry}} i {{t:wet}} pochodzą z literatury pokerowej: za {{t:dry|suche}} materiały szkoleniowe podają np. K-7-2, A-9-4 i A-A-6 w trzech kolorach, za {{t:wet|mokre}} 9-8-7, Q-J-T i T-9-5-4. Punkty i dokładne granice, np. że flop średni zaczyna się od dziesiątki, to umowa przyjęta w aplikacji, żeby każdy flop dało się ocenić jednoznacznie. Źródła nie podają granic punktowych i nie rozstrzygają, jak nazywać flopy ani {{t:dry|suche}}, ani {{t:wet|mokre}}. Według tej umowy {{t:dry|suchych}} jest ok. {{n:tex.share.dry}} wszystkich flopów, pośrednich ok. {{n:tex.share.medium}}, a {{t:wet|mokrych}} ok. {{n:tex.share.wet}}; to wynik definicji aplikacji, nie liczba z literatury.
:::
