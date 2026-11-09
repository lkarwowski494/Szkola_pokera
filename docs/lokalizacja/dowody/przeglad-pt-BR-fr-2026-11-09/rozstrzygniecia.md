# Rozstrzygnięcia drugiego przeglądu przekładu pt-BR i fr (P1–P3, F1–F3, kontrola (a))

Data: 2026-11-09, sesja AD (tylko docs, rola 09; prompt roli złożony z repo `prompts`: `node tools/assemble.mjs 09-lokalizacja --tryb build`, moduł `tlumaczenie` — prompt przeglądu użyty dosłownie). Wejście: propozycje z przebiegów 42680063904, 42680071149, 42682273309 (`../przeklad-pt-BR-fr-2026-11-09.txt`). **Nic nie zostało zapisane do `content/` ani `locales/`** (sesja tylko docs, D-363); poprawki są listą do nałożenia narzędziem `docs/lokalizacja/narzedzia/poprawki.mjs` na kopię propozycji. Decyzje: D-370 (odrzucenia, koszt), D-371 (przegląd, kontrola (a), typografia fr), D-372 (K-05).

## Jak przeglądano

- 6 subagentów w świeżym kontekście, bez notatek tłumacza, wspólna instrukcja (prompt modułu `tlumaczenie` dosłownie, przewodnik głosu z `REJESTR` w `scripts/i18n/wspolne.mjs:60–75`: pt-BR „você”, fr „vous” + spacja przed ? ! : ;, reguły znaczników D-287/D-344, wagi jak w przeglądzie en i ja/zh-Hant). Próba na język taka sama jak w AB: cały `rules.yaml` (141 wpisów), `spots.yaml`, `areas.yaml`, `modules.yaml` (P1/F1); cały słownik UI (731 kluczy) i `terms-def.yaml` (162) + terminologia ok. 30 terminów na przeczytanych źródłach i tabela K-05 (P2/F2); lekcje m0-l1, m2-l2, m3-l3, m5-l3, m10-l1 + egzamin m2 (P3/F3). 39 lekcji i 13 egzaminów na język: tylko kontrola automatyczna.
- Kontrola (a) treści krytycznej (D-135): m12-l1, m12-l4 (ramka „Odpowiedzialna gra”), egzamin m12, `helplines.yaml` (H-INT-1, H-INT-2), R-M12-009/011, definicje bankroll i risk-of-ruin, UI `purchase.*`, `data.*`, `help.*`. Przekład zwrotny pt-BR→pl i fr→pl w dwóch świeżych sesjach **bez dostępu do źródła**, porównanie sensu (z rozstrzyganiem na oryginale) w trzeciej: `wynik-a-pt-BR.md`, `wynik-a-fr.md`. Werdykt: **zaliczona w obu językach** (pt-BR pod warunkiem nałożenia 1 WYS i 2 ŚR z listy).
- Kontrola wyniku: obie listy nałożone na kopie trzech plików propozycji (`poprawki.mjs … --typografia-fr`): nałożone 9 + 16 + 133 = 158, pominięte 0 (kod 0); typografia fr 1 499 + 1 749 = 3 248 zamian; struktura YAML/JSON/front matter 65 jednostek fr po zamianie U+00A0 → spacja identyczna jak przed (0 różnic). `kontrolaPropozycji` z repo na HEAD 8c0cade: **129/130**; jedyna `content/fr/rules.yaml` — powód „adresy URL” (błąd kontroli D-365/D-370; symulacja poprawionego wzorca: 0 różnic na 70 polach z adresami). Skróty źródeł 130/130 zgodne. sha256 kopii po poprawkach: pt-lekcje 73486698b892…, fr-lekcje 422768799bf3…, reszta ca082a2d2a51…

## Podsumowanie

| grupa | zakres | KRYT | WYS | ŚR | NISKIE | poprawek w liście |
|---|---|---|---|---|---|---|
| P1 | pt-BR rules, spots, areas, modules | 0 | 0 | 9 | 6 | 92 |
| P2 | pt-BR UI, terms-def, terminologia | 0 | 0 | 8 | 3 | 6 |
| P3 | pt-BR 5 lekcji + egzamin m2 | 0 | 0 | 2 | 9 | 9 |
| A-pt-BR | kontrola (a) pt-BR | 0 | 1 | 2 | 1 | 3 (1 duplikat P2 usunięty) |
| F1 | fr rules, spots, areas, modules | 0 | 0 | 4 | 6 | 16 |
| F2 | fr UI, terms-def, terminologia | 0 | 0 | 4 | 8 | 15 |
| F3 | fr 5 lekcji + egzamin m2 | 0 | 0 | 6 | 7 | 16 |
| A-fr | kontrola (a) fr | 0 | 0 | 0 | 1 | 1 |

Razem do nałożenia: **pt-BR 110** (WYS 1, ŚR 97, NISKIE 12), **fr 48** (ŚR 40, NISKIE 8) — `poprawki-pt-BR.json`, `poprawki-fr.json` (pole `grupa` wskazuje raport). Wszystkie WYS i ŚR z list przyjęte; NISKIE przyjęte tylko krótkie i pewne (w listach), reszta NISKICH — backlog pt-BR/fr (raporty P/F).

## Decyzje szczegółowe

| raport | miejsce | waga | decyzja |
|---|---|---|---|
| A-pt-BR | pt-BR m12-l4 „desça … no máximo quando” | WYS | przyjęto „no mais tardar quando”: źródło „najpóźniej” (content/pl/lessons/m12-l4-bankroll.md:137), reguła R-M12-011 pt-BR ma już „no mais tardar” — sprawdzone w pliku (sesja AD) |
| A-pt-BR, P2 | pt-BR definicja risk-of-ruin „mesmos stakes” | ŚR | przyjęto (raz; duplikat A usunięty): „limite” jak w lekcjach |
| P1 | pt-BR rules.yaml „folda/foldar” (ok. 70 wierszy) wobec „desistir” w reszcie | ŚR | przyjęto w rules; lekcje m4-l3, m11-l1, m11-l2 poza próbą — krok formy w planie (§3.5) |
| P1/P3/P2 | pt-BR `{{t:…}}` bez formy obok formy lokalnej (two pair/dois pares, aggressor/agressor, straight/sequência, pot/pote) | ŚR | przyjęto w próbie; reszta systemowo przez K-05 (`terms-nazwy-pt-BR.yaml`, D-372) |
| P3, P2 | pt-BR top pair: „par mais alto” myli się z „wyższą parą” | ŚR | nazwa K-05 „top pair”; zamiana form „par mais alto” → „top pair” skryptem w sesji kodu (§3.5) |
| F1/F2/F3 | fr `{{t:big-blind}}`, `{{t:small-blind}}`, `{{t:out-of-position}}`, `drill.category.*` bez formy | ŚR | przyjęto (formy „grosse blinde”, „petite blinde”, „hors de position”; w UI liczba znaczników bez zmian) |
| F3, F2 | fr brak spacji nierozdzielającej (ok. 3 000 miejsc) | ŚR | przyjęto systemowo: `poprawki.mjs --typografia-fr` (U+00A0, poza blokami ```), D-371 |
| F1 | fr modules.yaml „rues”, „limpers”, „tapis courts” wobec lekcji | ŚR | przyjęto w modules; ujednolicenie „limpers/limpeurs”, „grosse blind/blinde”, „solveur/solver” w lekcjach poza próbą — §3.5 |
| F1, A-fr | fr rules.yaml odrzucony („adresy URL”, 5 pól) | — | błąd kontroli (D-370); tekst bez zmian, przyjęcie po poprawce wzorca D-365 |
| P3/F3/P1/F1 | ostrzeżenia `{{t:fold}}` m5-l3, `{{t:call}}` R-M12-002 | — | przekład poprawny; błąd w źródle pl (pozycje listy 16 błędów, `../przeglad-en-2026-11-09/rozstrzygniecia.md:183–205`) — naprawia sesja AC |
| A-fr | fr „s'en éloigne”, „soit à bankroll complète” | — | zgodne ze źródłem (bez zmian) |

## Backlog (NISKIE poza listami; nie blokują wydania)

pt-BR: kalka „altura das cartas” (wysokość kart) w lekcjach poza próbą; definicje używają „call/raise/fold/board/draw”, lekcje „pagar/aumentar/desistir/mesa/projeto” — po K-05 ujednolicić definicje; „De quanta equity” w egzaminie m2. fr: bezokolicznik vs 1. osoba w odpowiedziach („Se coucher” / „Je me couche”); „tableau” zamiast „board” poza próbą.
