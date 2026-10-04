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
    prompt: "Która pozycja jest najlepsza?"
    options:
      - { text: "Button (BTN)", correct: true, why: "Od flopu Button mówi ostatni, więc zawsze zna decyzje rywali przed swoją." }
      - { text: "Duży blind (BB)", why: "BB płaci mniej za wejście, bo już wpłacił, ale od flopu mówi jako jeden z pierwszych." }
      - { text: "UTG", why: "UTG mówi pierwszy preflop i ma za sobą cały stół. To najtrudniejsze miejsce do otwierania." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Wszyscy przed tobą spasowali. Co robisz?"
    table: { hand: "Kc 8d", position: UTG }
    options:
      - { text: "Pasuję", correct: true, why: "K8 w różnych kolorach jest poza zakresem otwarcia z UTG. Za tobą jest pięciu graczy i często ktoś ma króla z lepszym kickerem." }
      - { text: "Przebijam", why: "Z UTG otwierasz tylko ok. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} rąk. K8o łatwo trafia króla i przegrywa z KQ albo AK." }
      - { text: "Dopłacam do dużego blinda", why: "Samo dopłacenie (limp) to słaby nawyk. Albo ręka jest warta przebicia, albo pasujesz." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Ta sama ręka, ale jesteś na Buttonie i wszyscy przed tobą spasowali."
    table: { hand: "Kc 8d", position: BTN }
    options:
      - { text: "Przebijam", correct: true, why: "Zostały tylko blindy, a po flopie masz pozycję. Na Buttonie otwierasz ok. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} rąk, a K8o się w tym mieści." }
      - { text: "Pasuję", why: "Za ostrożnie. Przeciwko samym blindom ta ręka jest wystarczająco dobra, a pozycja dodaje jej wartości." }
      - { text: "Dopłacam do dużego blinda", why: "Limp oddaje inicjatywę. Przebicie często od razu zgarnia blindy." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Dlaczego mówienie jako ostatni pomaga?"
    options:
      - { text: "Wiem, co zrobili rywale, zanim zdecyduję", correct: true, why: "Każda akcja rywala to informacja. Ostatni ma ich najwięcej i może tanio czekać albo przejąć pulę, gdy inni pokażą słabość." }
      - { text: "Dostaję lepsze karty", why: "Karty są losowe niezależnie od pozycji." }
      - { text: "Płacę mniejsze blindy", why: "Na Buttonie nie płacisz blindów, ale to nie jest główna zaleta. Najważniejsza jest informacja." }
---
Przycisk dealera (**BTN**, Button) przesuwa się co rozdanie. Od niego zależy kolejność mówienia. Od flopu Button mówi **ostatni**, a to ogromna przewaga: widzisz, co zrobili wszyscy inni, zanim sam zdecydujesz.

## Pozycje przy stole 6-osobowym

| Pozycja | Kiedy mówi | Jak szeroko otwierać |
|---|---|---|
| UTG | Pierwszy preflop | ok. {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} rąk |
| HJ (Hijack), CO (Cutoff) | Po UTG; CO tuż przed Buttonem | coraz szerzej |
| BTN | Ostatni od flopu | ok. {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} rąk |
| SB, BB | Ostatni preflop, pierwsi od flopu | SB otwiera, gdy wszyscy spasują (lekcja o zakresach); obrona blindów w module M4 |

**HJ** (Hijack) siedzi za UTG, dwa miejsca przed Buttonem, a **CO** (Cutoff) tuż przed Buttonem. To pozycje środkowe: za nimi jest mniej graczy niż za UTG, więc otwierasz z nich szerzej, ale wciąż węziej niż z Buttona.

:::note Rozmiar otwarcia
Otwierasz przebiciem do {{n:pf.open-size}} z każdej pozycji, a z małego blinda do {{n:pf.open-size-sb}}. To uproszczenie: w rozwiązaniach solverów otwarcia z wczesnych pozycji są nieco mniejsze (np. {{n:pf.open-size.solver-utg}} z UTG i {{n:pf.open-size.solver-co}} z CO), ale jeden rozmiar jest łatwiejszy do nauki. Wchodząc jako pierwszy, nie dopłacasz samego blinda: przebicie może od razu wygrać pulę.
:::
