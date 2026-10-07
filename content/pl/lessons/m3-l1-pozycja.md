---
id: m3.l1
module: m3
order: 1
title: "Pozycja przy stole"
sub: "Dlaczego miejsce ma znaczenie"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Która {{t:position}} jest najlepsza?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "Od flopu Button mówi ostatni, więc zawsze zna decyzje rywali przed swoją." }
      - { text: "{{t:big-blind|Duży blind}}", why: "{{t:big-blind|BB}} płaci mniej za wejście, bo już wpłacił, ale od flopu mówi jako jeden z pierwszych." }
      - { text: "{{t:utg}}", why: "{{t:utg}} mówi pierwszy preflop i ma za sobą cały {{t:board}}. To najtrudniejsze miejsce do otwierania." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Wszyscy przed tobą {{t:fold|spasowali}}. Co robisz?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Pasuję}}", correct: true, why: "K9 w różnych kolorach jest poza {{t:range|zakresem}} {{t:open|otwarcia}} z {{t:utg}}. Za tobą jest pięciu graczy i często ktoś ma króla z lepszym kickerem." }
      - { text: "{{t:raise|Przebijam}}", why: "Z {{t:utg}} {{t:open|otwierasz}} tylko ok. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} rąk. K9o łatwo trafia króla i przegrywa z KQ albo AK." }
      - { text: "Dopłacam do {{t:big-blind|dużego blinda}}", why: "Samo dopłacenie (limp) to słaby nawyk. Albo ręka jest warta {{t:raise|przebicia}}, albo {{t:fold|pasujesz}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Ta sama ręka, ale jesteś na Buttonie i wszyscy przed tobą {{t:fold|spasowali}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Przebijam}}", correct: true, why: "Zostały tylko blindy, a po flopie masz {{t:position|pozycję}}. Na Buttonie {{t:open|otwierasz}} ok. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} rąk, a K9o się w tym mieści." }
      - { text: "{{t:fold|Pasuję}}", why: "Za ostrożnie. Przeciwko samym blindom ta ręka jest wystarczająco dobra, a {{t:position}} dodaje jej wartości." }
      - { text: "Dopłacam do {{t:big-blind|dużego blinda}}", why: "Limp oddaje {{t:initiative|inicjatywę}}. {{t:raise|Przebicie}} często od razu zgarnia blindy." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Dlaczego mówienie jako ostatni pomaga?"
    options:
      - { text: "Wiem, co zrobili rywale, zanim zdecyduję", correct: true, why: "Każda akcja rywala to informacja. Ostatni ma ich najwięcej i może tanio {{t:check|czekać}} albo przejąć {{t:pot|pulę}}, gdy inni pokażą słabość." }
      - { text: "Dostaję lepsze karty", why: "Karty są losowe niezależnie od {{t:position|pozycji}}." }
      - { text: "Płacę mniejsze blindy", why: "Na Buttonie nie płacisz blindów, ale to nie jest główna zaleta. Najważniejsza jest informacja." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
Przycisk dealera (**{{t:button|BTN}}**, Button) przesuwa się co rozdanie. Od niego zależy kolejność mówienia. Od flopu Button mówi **ostatni**, a to ogromna przewaga: widzisz, co zrobili wszyscy inni, zanim sam zdecydujesz.

## {{t:position|Pozycje}} przy stole 6-osobowym

| {{t:position|Pozycja}} | Kiedy mówi | Jak szeroko {{t:open|otwierać}} |
|---|---|---|
| {{t:utg}} | Pierwszy preflop | ok. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} rąk |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Po {{t:utg}}; {{t:cutoff|CO}} tuż przed Buttonem | coraz szerzej |
| {{t:button|BTN}} | Ostatni od flopu | ok. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} rąk |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Ostatni preflop, pierwsi od flopu | {{t:small-blind|SB}} {{t:open|otwiera}}, gdy wszyscy {{t:fold|spasują}} (lekcja o {{t:range|zakresach}}); obrona blindów w module M4 |

**{{t:hijack|HJ}}** (Hijack) siedzi za {{t:utg}}, dwa miejsca przed Buttonem, a **{{t:cutoff|CO}}** (Cutoff) tuż przed Buttonem. To {{t:position|pozycje}} środkowe: za nimi jest mniej graczy niż za {{t:utg}}, więc {{t:open|otwierasz}} z nich szerzej, ale wciąż węziej niż z Buttona.

:::note Rozmiar {{t:open|otwarcia}}
{{t:open|Otwierasz}} {{t:raise|przebiciem}} do {{n:pf.open-size}} z każdej {{t:position|pozycji}}, a z {{t:small-blind|małego blinda}} do {{n:pf.open-size-sb}}. To uproszczenie: w rozwiązaniach solverów {{t:open|otwarcia}} z {{t:early-position|wczesnych pozycji}} są nieco mniejsze (np. {{n:pf.open-size.solver-utg}} z {{t:utg}} i {{n:pf.open-size.solver-co}} z {{t:cutoff|CO}}), ale jeden rozmiar jest łatwiejszy do nauki. Wchodząc jako pierwszy, nie dopłacasz samego blinda: {{t:raise}} może od razu wygrać {{t:pot|pulę}}.
:::
