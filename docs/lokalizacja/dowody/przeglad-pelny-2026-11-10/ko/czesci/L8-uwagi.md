# ko · L8 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/lessons/m12-l1-wariancja.md | tak (pl 140 linii, ko 140 linii) | 3 poprawki NISKIE |
| content/ko/lessons/m12-l2-decyzja-wynik.md | tak (116 / 116) | 1 poprawka ŚR |
| content/ko/lessons/m12-l3-tilt.md | tak (134 / 134) | 1 poprawka NISKIE |
| content/ko/lessons/m12-l4-bankroll.md | tak (149 / 149) | 7 poprawek (2 ŚR, 5 NISKIE) |

Pomocniczo: `content/ko/terms-nazwy.yaml` (całość), wiersze glosariusza dla terminów modułu 12, `content/numbers.yaml` (wartości i jednostki kluczy użytych w części, do oceny partykuł po liczbach), `tools/content-build/src/numbers.ts` (zapis jednostek), po jednej linii `en` z m12-l2 (86) i m12-l4 (102), nazwa ekranu „Pomoc” w `locales/ko.json` („도움말”). Nie czytałem wcześniejszych przeglądów ani `docs/decyzje.md`.

Kontrola mechaniczna (skrypt, linia w linię pl ↔ ko, wszystkie 4 pliki): znaczniki `{{n:…}}` (klucze i liczba wystąpień), klucze `{{t:…}}`, `{{helplines}}`, pola `id`/`family`/`rules`/`answer`/`kind`/`generator`/`params`/`count`, położenie `correct: true` — bez różnic. Formy w `{{t:klucz|forma}}` zgodne z `terms-nazwy.yaml`.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| — | — | brak | — |

## Do ujednolicenia skryptem
- Zapis „tys. rąk”: w lekcjach m12-l1 i m12-l4 jest `{{n:…}}k 핸드` (ok. 40 wystąpień), a `{{n:…}}천 핸드` w m12-l2:68 (poprawka w L8.json) oraz poza tą częścią: `content/ko/exams/m12.yaml` (ok. 10 wystąpień w liniach 7, 19, 20, 27, 28, 34, 37, 38; `grep -c` daje 11 linii z „천 핸드”) i `content/ko/lessons/m13-l1-raport.md:105`. Wzorzec `}}천 핸드` → `}}k 핸드` (albo decyzja odwrotna, byle jedna); „100천 핸드” jest po koreańsku nienaturalne (naturalnie „10만 핸드”, czego znacznik liczby nie pozwala zapisać).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- Partykuły po liczbach w bb/100 (znacznik wyświetla np. „80bb/100”): przekład pisze `{{n:var.sd}}를` (m12-l1:92, 102), `{{n:var.sd}}로` (m12-l1:38), `{{n:var.target}}로` (m12-l1:57), `{{n:dd.wr-low}}로` (m12-l1:72), `{{n:var.wr.ex}}로` (m12-l1:83, m12-l4:58), `{{n:var.wr.typical.high}}로` (m12-l4:20). To jest poprawne, jeśli czytać „…비비”, a błędne („을”, „으로”), jeśli czytać do końca „…퍼 백”. Nie poprawiałem; do rozstrzygnięcia jedną regułą dla całego ko.
- m12-l2:112 „약 {{n:skill.sample.m}}백만 건” wyświetli „76.9백만 건”; naturalniej byłoby „7,690만 건”, ale liczba pochodzi ze znacznika. Zrozumiałe, zostawione.
- m12-l3:22 „내 블라인드를 상대로 올립니다” (pl: „podbija twoje blindy”) — zrozumiałe, ale sztywne; naturalniej np. „내 블라인드에 레이즈합니다”. Nie poprawiałem (pl nie ma tu znacznika terminu).
- m12-l2:86 „진 핸드만 분석하면” (pl: „Analiza samych przegranych pomija połowę błędów”): pl może znaczyć przegrane sesje albo rozdania (en: „only losses”); przekład wybrał rozdania. Wniosek ten sam.
- „granie” w treści o utracie kontroli: lekcje mają „플레이/게임” (m12-l1:140, m12-l4:100, 144), interfejs ekranu pomocy ma „도박” („도박을 통제하기 어려울 때”). Oba wierne pl („granie”); ewentualne ujednolicenie to decyzja redakcyjna.
- Cudzysłowy nazwy ekranu/karty: m12-l1:140 ma proste '도움말', m12-l3:133 i m12-l4:102 mają ‘…’. Kosmetyka.
- m12-l3:87, 130 „애벌레” (pl: „gąsienica”) — wierne pl; w koreańskich omówieniach tej metafory bywa „자벌레” (inchworm). Zostawione zgodnie z pl.

## Pytania do źródła pl
- brak

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Cała część to moduł 12; każde zdanie (front matter, ćwiczenia z uzasadnieniami, treść, tabele, wzory, ramki) porównane z pl.
- Liczby, progi i warunki: wszystkie przez znaczniki `{{n:…}}`, identyczne z pl co do klucza i liczby wystąpień w linii. Liczby wpisane słownie zgodne: „2 z 3 wyników” → „3개 중 약 2개”, „raz na pięć–sześć” → „다섯~여섯 번에 한 번”, „raz na pięć” → „다섯 번에 한 번”, „trzy razy mniejszy” → „삼분의 일”, „dwa razy” → „두 배/절반”, „kilka razy” → „몇 배”, „kilkadziesiąt razy” → „수십 배”, lata 1988, 2015, 2020, „sześć miesięcy” → „6개월”, „trzeci/czwarty raz”, „pół godziny” → „30분”, siedem typów tiltu (7 wierszy tabeli).
- Warunki graniczne zachowane: „co najmniej” (이상 / 적어도), „najpóźniej” (늦어도), „najwcześniej” (빨라도), „nigdy mniej niż” (절대 … 미만으로 하지 않습니다 / 미만이 되어서는 안 됩니다), „nigdy nie spada do zera” (절대 0이 되지는 않습니다), „połowa to najpóźniejszy próg”, „zejście przed progiem połowy nie jest błędem, później już tak”.
- Poprawne odpowiedzi: `correct: true` w tych samych opcjach co w pl (w m12.l4.q-stay dwie poprawne, jak w pl); uzasadnienia zgodne z odpowiedziami.
- Ramka „Odpowiedzialna gra” (m12-l4:143–149): tytuł „책임감 있는 게임”, wszystkie pięć sygnałów obecnych i niezłagodzonych (gra dłuższa niż planowana; odgrywanie strat; pieniądze, których nie można stracić, albo pożyczanie na grę; ucieczka od zmartwień; ukrywanie przed bliskimi), „Gdzie szukać pomocy:” i `{{helplines}}` bez zmian. Numerów telefonów i nazw organizacji w tej części nie ma (są w `helplines.yaml`, poza L8).
- Zdanie końcowe m12-l1:140 („ogólne wskazówki, nie gwarancja wyniku… ekran «Pomoc»”) i ramka m12-l3:132–134 — kompletne, nazwa ekranu zgodna z interfejsem („도움말”), odesłanie do karty zgodne z tytułem ramki.
- Jedyne odstępstwo treściowe: m12-l4:102 — dodane „이 레슨 끝의” („na końcu tej lekcji”), nieobecne w pl (poprawka ŚR w L8.json). Pozostałe poprawki to partykuły po liczbach, nazwa typu tiltu, nazwa lekcji w odesłaniu, zapis „tys.” i ścisłość „반비례”. Znalezisk KRYT ani WYS brak.
