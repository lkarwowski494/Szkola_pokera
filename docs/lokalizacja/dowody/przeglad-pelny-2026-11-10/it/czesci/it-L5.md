# it-L5 — it (włoski) — przegląd pełny 2026-11-10

## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/it/lessons/m9-l1-spr.md | tak, 1–149 (pl 1–149) |
| content/it/lessons/m9-l2-zaangazowanie.md | tak, 1–114 (pl 1–114) |
| content/it/lessons/m9-l3-rozmiar-geometryczny.md | tak, 1–130 (pl 1–130) |
| content/it/lessons/m9-l4-plan-trzech-ulic.md | tak, 1–131 (pl 1–131) |
| content/it/lessons/m10-l1-statystyki.md | tak, 1–131 (pl 1–131) |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-L5-01 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:27, 30, 46, 49, 50, 56, 58, 59, 65, 69, 70, 78, 80, 98, 100, 104, 106 (×2), 113 (19 wystąpień) | `{{t:top-pair\|coppia massima}}` | `{{t:top-pair\|top pair}}` | Nazwa terminu niezgodna z `content/it/terms-nazwy.yaml` (top-pair: „top pair”); sąsiednie lekcje modułu (m9-l1, m9-l4) mają „top pair”, więc ten sam termin jest w module nazwany dwojako. pl m9-l2: te same linie (`{{t:top-pair…}}`). Rodzaj żeński bez zmian, rodzajniki pasują. |
| it-L5-02 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:58 | „Tanto la {{t:top-pair\|coppia massima}} di solito lo regge.” | „Due street la {{t:top-pair\|top pair}} di solito le regge.” | Kalka „Tyle … zniesie”: zdanie zaczęte od „Tanto” czyta się po włosku jak „i tak / tak czy inaczej”, a „lo” nie ma poprzednika; pl:58 „Tyle top pair zwykle zniesie” (= dwie ulice wartości). Poprawka połączona z it-L5-01. |
| it-L5-03 | ŚR | content/it/lessons/m9-l2-zaangazowanie.md:110 | „la lezione sul sizing geometrico” | „la lezione sulla dimensione geometrica” | Odsyłacz do lekcji m9.l3, która w przekładzie nazywa się „Dimensione geometrica” (tak też w m9-l3 i m9-l4); to samo pojęcie nazwane dwojako. pl:110 „lekcja o rozmiarze geometrycznym”. |
| it-L5-04 | NISKIE | content/it/lessons/m9-l3-rozmiar-geometryczny.md:48 | „lo {{t:spr}} è circa” | „l'{{t:spr}} è circa” | Jedyne „lo SPR” w tych pięciu plikach; wszędzie indziej „l'SPR”. pl:48. |
| it-L5-05 | NISKIE | content/it/lessons/m10-l1-statystyki.md:77 | „si stabilizza più in fretta:” | „si stabilizza più in fretta di tutte:” | Zgubiony stopień najwyższy: pl:77 „stabilizuje się najszybciej” (odpowiedź na pytanie „która statystyka potrzebuje najwięcej rąk”). |
| it-L5-06 | ŚR | content/it/lessons/m10-l1-statystyki.md:87, 89 (2 wystąpienia) | „allo {{t:exploit\|sfruttamento}}” / „Lo {{t:exploit\|sfruttamento}}” | „all'{{t:exploit\|exploit}}” / „L'{{t:exploit\|exploit}}” | Nazwa terminu niezgodna z `content/it/terms-nazwy.yaml` (exploit: „exploit”). pl:87, 89 (`{{t:exploit\|eksploatacji}}`, `{{t:exploit\|Eksploatacja}}`). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- m9-l2-zaangazowanie.md:15, 22 „il suo pareggio” za pl „jego wyrównanie” (wyrównanie zakładu): „pareggio” kojarzy się po włosku z remisem; ewentualnie „la sua chiamata”. Sens w kontekście czytelny.
- m9-l2-zaangazowanie.md:46, 65 „Hai chiuso la coppia massima” (pl „Trafiłeś”): m9-l1:80 ma „Hai centrato”; „chiudere” zwykle o skompletowanym drawie, potocznie używane też o parze.
- „Piatto 3-bet” (m9-l3:48, 54, 87, 122) vs „piatto 3-bettato” (m9-l4:53, 111, 127): niespójność między plikami, poza słownikiem terminów; w obrębie pliku spójnie.
- „materiali didattici” (m9-l2:113) / „materiali formativi” (m9-l4:130) / „materiali di formazione” (m10-l1:130) za pl „materiały szkoleniowe”: trzy warianty, bez skutku dla sensu.
- m10-l1-statystyki.md:123 „Gli allenatori” za pl „Trenerzy”: w żargonie pokerowym naturalniejsze „I coach”.
- Cudzysłowy: «…» w m9-l2:75, “…” w m9-l3:58 i m10-l1:60.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład wierny: wszystkie liczby, kierunki zaleceń, pozycje i zagrania zgodne ze źródłem; nie znaleziono błędów KRYT ani WYS. Znaczniki `{{n:…}}`, `{{t:…}}`, identyfikatory, klucze YAML i tabele nienaruszone we wszystkich pięciu plikach (zestaw kluczy zgodny z pl linia w linię). Jedyny powtarzający się wzorzec to formy terminów spoza `terms-nazwy.yaml`: „coppia massima” w całym m9-l2 (19×) i „sfruttamento” w m10-l1 (2×). Język naturalny, forma „tu” konsekwentna.
