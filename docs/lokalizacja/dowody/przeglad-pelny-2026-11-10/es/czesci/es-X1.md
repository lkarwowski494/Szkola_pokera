# es-X1 — es (hiszpański) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| content/es/exams/m0.yaml | tak, 1–92 |
| content/es/exams/m1.yaml | tak, 1–75 |
| content/es/exams/m2.yaml | tak, 1–99 |
| content/es/exams/m3.yaml | tak, 1–95 |
| content/es/exams/m4.yaml | tak, 1–111 |
| content/es/exams/m5.yaml | tak, 1–100 |
| content/es/exams/m6.yaml | tak, 1–96 |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-X1-01 | NISKIE | content/es/exams/m0.yaml:21 | «ocupa el 3.º puesto» | «ocupa el 3.er puesto» | Apokopa: „tercer puesto” skraca się 3.er (pl m0.yaml:21 „na 3. miejscu”). |
| es-X1-02 | ŚR | content/es/exams/m3.yaml:21 | «(unas {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} manos)» | «(alrededor del {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} de las manos)» | Klucze mają jednostkę procent (numbers.yaml:81–82), więc wychodzi „unas 15 %–18 % manos”: niegramatyczne, czyta się jak liczba rąk (pl m3.yaml:21 „ok. …–… rąk”). |
| es-X1-03 | ŚR | content/es/exams/m3.yaml:49 | «abres unas {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} manos» | «abres alrededor del {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} de las manos» | Jak es-X1-02 (pl m3.yaml:49). |
| es-X1-04 | ŚR | content/es/exams/m3.yaml:59 | «abres amplio, unas {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} manos» | «abres amplio, alrededor del {{n:pf.rfi.sb.low}}–{{n:pf.rfi.sb.high}} de las manos» | Jak es-X1-02 (pl m3.yaml:59). |
| es-X1-05 | ŚR | content/es/exams/m3.yaml:70 | «desde {{t:early-position\|posiciones tempranas}}» | «desde las {{t:early-position\|primeras posiciones}}» | terms-nazwy.yaml:44: early-position = „primeras posiciones”; forma w znaczniku to inna nazwa (pl m3.yaml:70). |
| es-X1-06 | ŚR | content/es/exams/m4.yaml:14 | «Solo {{t:call\|pago}}» | «Solo {{t:call\|igualo}}» | Ta sama odpowiedź „Sprawdzam” w tym pliku wszędzie indziej to „Igualo” (m4.yaml:23, 72, 81, 92); pl m4.yaml:14. |
| es-X1-07 | ŚR | content/es/exams/m4.yaml:33 | «Los ases de distinto palo (AJo–A9o) en la … normalmente solo los {{t:call\|igualas}}» | «Con los ases de distinto palo (AJo–A9o) en la … normalmente solo {{t:call\|igualas}}» | Kalka: „igualar los ases” = wyrównać asy; sens to „sprawdzasz nimi” (pl m4.yaml:33); w tym samym pliku poprawnie „igualas con manos…” (m4.yaml:72). |
| es-X1-08 | ŚR | content/es/exams/m4.yaml:34 | «Las {{t:pair\|parejas}} medianas y pequeñas en la … normalmente las {{t:call\|igualas}}» | «Con las {{t:pair\|parejas}} medianas y pequeñas en la … normalmente {{t:call\|igualas}}» | Jak es-X1-07 (pl m4.yaml:34). |
| es-X1-09 | NISKIE | content/es/exams/m5.yaml:51 | «para una c-bet pequeña» | «para un c-bet pequeño» | Rodzaj „c-bet”: w m6 (np. m6.yaml:83 „un c-bet pequeño”) i w większości korpusu męski; pl m5.yaml:51. |

## Źródło (błędy w pl, bez poprawki)
- pl m2.yaml:89 „{{t:straight|Strit}} daje {{n:outs.oesd}} outów”: odwrócona relacja (to outy dają strita; en: „You have … outs to a straight”). Przekład es (m2.yaml:89 „La escalera te da … outs”) wiernie powtarza źródło.

## Do sprawdzenia (pewność ≤ 80%)
- m6.yaml (15 wystąpień, np. linie 24, 27, 44, 54): „el Botón”, podczas gdy m3–m5 i reszta korpusu mają „el Button” (ok. 90 wystąpień wobec 19); terms-nazwy.yaml:49 podaje „botón”. Plik jest wewnętrznie spójny; kierunek ujednolicenia wymaga decyzji, dlatego bez poprawki.
- m0.yaml:60 «la {{t:wheel|rueda}}»: terms-nazwy.yaml:15 podaje „wheel”; w korpusie po jednym użyciu „rueda” i „wheel”. Bez poprawki (rodzajnik przy „wheel” do ustalenia).
- m2.yaml:12, 36, 45, 86 «{{t:oesd|proyecto de escalera abierta}}»: nazwa w terms-nazwy.yaml:54 to „OESD”; forma opisowa jest spójna w pliku i zrozumiała.
- m6.yaml:77 «{{t:top-pair|Pareja mayor}}»: terms-nazwy.yaml:85 „top pair”; w korpusie częściej „pareja máxima”.
- m5.yaml:50–52 «Más de {{n:…}} de las veces» wobec m6.yaml:17–19 «En más del {{n:…}} de los casos»: z procentem naturalniej z rodzajnikiem („más del 43 %”); drobne.
- Rzeczownik dla call: „pago” (m4.yaml:42, 82; m5.yaml:12, 68; m6.yaml:19, 48) obok czasownika „igualar”; słownik notuje oba warianty, zostawione.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny: we wszystkich 7 plikach treść pytań, odpowiedzi poprawne i błędne oraz wyjaśnienia znaczą to samo co w pl; żadna poprawna odpowiedź nie przestała pasować do pytania. Znaczniki `{{n:…}}`, `{{t:…}}`, `[[…]]`, identyfikatory i klucze są nienaruszone, żadnej liczby wpisanej cyfrą zamiast znacznika. Powtarzający się wzorzec to „unas X–Y manos” przy wartościach procentowych (m3) oraz rozjazdy nazewnicze między plikami (Button/Botón, rodzaj c-bet, igualar/pagar, „hablar/actuar primero”). Brak znalezisk KRYT i WYS.
