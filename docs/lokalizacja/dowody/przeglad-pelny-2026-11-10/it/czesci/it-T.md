# it-T — włoski (it) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `content/it/terms-def.yaml` ↔ `content/terms.yaml` (pole `def`, 162 terminy; pomoc `content/en/terms-def.yaml` wyrywkowo) | tak, linie 1–162 (źródło: linie 1–1351) |
| `content/it/terms-nazwy.yaml` ↔ `content/terms.yaml` (pola `pl`, `en`, `def`) | tak, linie 1–164 (162 wartości; komentarzy nie oceniano) |
| Spójność: `content/it/lessons/` (44 pliki) i `content/it/rules.yaml` | tylko zliczenia `grep`/skrypt (formy w znacznikach `{{t:klucz\|forma}}` i tekst poza znacznikami); plików nie czytano w całości — to zakres innych części |

Kontrole mechaniczne: zestaw i kolejność kluczy w trzech plikach identyczne (162 = 162 = 162); w `terms-nazwy.yaml` brak dwóch kluczy z tą samą nazwą (0 kolizji dosłownych), brak wartości `null`.

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-T-01 | ŚR | content/it/terms-def.yaml:68 | „Il primo rilancio di un open … e l'open come seconda” | „Il primo rilancio di un'apertura … e l'apertura come seconda” | Niespójny termin: pl `content/terms.yaml:597` „Pierwsze przebicie otwarcia … a otwarcie jako drugi”; nazwa w `terms-nazwy.yaml:65` to „apertura”, a lekcje i reguły mają 192/192 form znacznika `open` jako apertura/aprire (0× „open” w prozie włoskiej). Słowniczek nazywa to samo pojęcie inaczej niż kurs. |
| it-T-02 | ŚR | content/it/terms-def.yaml:86 | „dopo un open preflop” | „dopo un'apertura preflop” | Jak wyżej; pl `content/terms.yaml:744` „po otwarciu preflop”. |
| it-T-03 | ŚR | content/it/terms-def.yaml:136 | „per fare call contro un open serve una mano più forte che per fare open” | „per fare call contro un'apertura serve una mano più forte che per aprire” | Jak wyżej; pl `content/terms.yaml:1144` „do sprawdzenia otwarcia … niż do samego otwarcia”. |
| it-T-04 | ŚR | content/it/terms-nazwy.yaml:3–4 | `royal-flush: "scala reale"`, `straight-flush: "scala colore"` | — (decyzja terminologiczna, bez poprawki; propozycja: `royal-flush: "scala reale massima"`, `straight-flush` zostaje „scala colore” albo „scala reale”) | W potocznym i słownikowym włoskim „scala reale” oznacza zwykle straight flush (pl `content/terms.yaml:38–41` „poker”), a royal flush (pl :30–33 „poker królewski”) to „scala reale massima”; tłumacz sam to odnotował w komentarzu ([DO USTALENIA]). Para „scala reale / scala colore” też występuje w listach układów, więc to nie błąd oczywisty, ale czytelnik może wziąć „scala reale” za układ nr 2. Zmiana wymaga też `lessons/m0-l1-uklady.md:24,87–88`. Definicje (terms-def:1–2) są poprawne przy obu wariantach. |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- `terms-nazwy.yaml:45` `late-position: "posizione avanzata"` — rzadkie we włoskim pokerze; częściej „late position”, „ultime posizioni” / „posizioni finali” (symetrycznie do `early-position: "posizioni iniziali"`, linia 44, liczba mnoga). „Avanzata” bywa rozumiane dwuznacznie. W lekcjach 2 użycia (m3-l2:55 w znaczniku, m4-l1:36 poza znacznikiem).
- `terms-nazwy.yaml:84` `wetness: "bagnatura"` — neologizm („bagnatura” = zwilżanie); w lekcjach formy 2× „bagnatura”, 2× „umidità”. Możliwe naturalniejsze: opis („quanto è bagnato il board”) albo „coordinazione del board” (por. def :82 „quanto il board è coordinato”).
- `terms-nazwy.yaml:47–49` `hijack`, `cutoff`, `button` małą literą, a pl (`terms.yaml:402,411,420`) i cały przekład piszą wielką: „Button” 277× vs „button” 2× w lekcjach/regułach, `terms-def.yaml` wszędzie „Button”, „Cutoff”. Znaczników bez formy jest 0, więc dziś bez skutku w tekście; do ujednolicenia, jeśli nazwa trafia do słowniczka.
- `terms-nazwy.yaml:132` `m-ratio: "M-ratio"` — pl ma nazwę „M” (`terms.yaml:1096`), definicje it :131–132 mówią „zona di M”; nazwa angielska jako włoska jest dopuszczalna, ale różni się od użycia w definicjach.
- Rodzaj „c-bet”: `terms-def.yaml:103–104` „una c-bet” (ż., zgodnie z komentarzem źródłowym w terms-nazwy:88), a w lekcjach i regułach dominuje m. („un/il/i/del c-bet” 106× vs „una/la/della/le c-bet” 27×). „3-bet” jest spójnie m. (93× vs 0×; def :69 „un 3-bet”). Trzeba wybrać jeden rodzaj dla „c-bet”.
- `terms-nazwy.yaml:18` `call: "call"` przy użyciu w kursie głównie „chiamata/chiamare” (patrz Uwagi) i `:85` `top-pair: "top pair"` przy „coppia massima” 31× w formach — decyzja, która forma jest nazwą wiodącą.
- `terms-def.yaml:11` „senza coppia né niente di meglio” — potoczne; ewentualnie „senza coppia né combinazioni migliori” (pl :123 „bez pary ani lepszej kombinacji”). Styl, bez zmiany sensu.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Definicje (162/162) są wierne źródłu: liczby, przykłady kart, kierunki i ostrzeżenia „da non confondere” zgodne; zdania o polskim uzusie („W polskich tekstach…”, „sprawdzam/czekam”, „przy stole, stół finałowy”) zostały rozsądnie zaadaptowane lub pominięte tak jak w en; jedyny systematyczny rozjazd w pliku to „open” zamiast „apertura” (5 wystąpień, 3 linie). Zliczenia w `lessons/` + `rules.yaml` (formy w znacznikach): zgodne z nazwą są pot (piatto/piatti 719 + 14 bez formy; poza znacznikami „piatto” 49×, „pot” tylko w id/cytatach), bet (puntata/puntare 328 + 14; poza znacznikami 343×), raise (rilancio… 236 + 3; poza 42×), check (215, wszystkie „check”), fold (552, wszystkie fold/foldare; poza znacznikami „passare” w znaczeniu fold tylko 2×: m1-l1:52, m8-l4:82), flush (colore 97 + 2), straight (scala 101 + 3), draw (progetto 164 + 4), bluff (420), value (valore 83), equity, range, position (posizione 68 + 5) — w prozie brak angielskich zamienników. Rozjazdy systematyczne nazwa ↔ użycie: call — nazwa „call”, a formy to „chiamata/chiamare/chiama…” ok. 647 z 687 (same „call” 26 + 14 bez formy; poza znacznikami „chiam-” 81× vs „call” ok. 10× w prozie); top-pair — „coppia massima/e” 31 vs „top pair” 23 + 24 bez formy; dry — „secco/secchi” 29 vs „asciutto/i” 17 (+3 poza znacznikami w rules.yaml:338); maniac — „maniaco” 12 (+2 poza) vs nazwa „maniac” (2 bez formy); exploit — „sfruttamento” 6 vs 1 bez formy; oesd — „(progetto di) scala bilaterale” 10 vs OESD 4; payout — „pagamenti” 4 vs „premi” 3 + 1; side-pot — „piatto laterale” 2 (m1-l1:95) vs nazwa i definicje „piatto secondario”; wetness — „umidità” 2 vs „bagnatura” 2; chips — „fiches” 50 / „fiche” 8 / „chip” 3. Do tego rodzaj „c-bet” (m. 106 vs ż. 27) opisany wyżej; „value bet” i „c-bet” nie mają form w znacznikach (0 znaczników) i w prozie są spójnie „value bet” / „c-bet”.
