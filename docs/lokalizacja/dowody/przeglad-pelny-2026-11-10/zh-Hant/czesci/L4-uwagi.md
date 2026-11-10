# zh-Hant · L4 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m7-l1-druga-beczka.md | tak (138 linii pl i zh) | znaczniki zgodne z pl linia po linii (porównanie skryptem: klucze `{{t:}}`, pełne `{{n:}}`, `[[…]]`, pola id/family/rules/answer/table, `correct`/`sizeError`) |
| content/zh-Hant/lessons/m7-l2-polaryzacja.md | tak (139 linii) | jw. |
| content/zh-Hant/lessons/m7-l3-implied-odds.md | tak (147 linii) | jw. |
| content/zh-Hant/lessons/m7-l4-probe-obrona.md | tak (146 linii) | jw. |
| content/zh-Hant/lessons/m8-l1-value.md | tak (139 linii) | jw. |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (cały), wybrane wiersze `terms-def.yaml`, `modules.yaml`, `content/numbers.yaml` (klucze użyte w części), trzy zdania z `content/en/` (m7-l1 l. 76 i 124, m8-l1 l. 60–61 i 127). Glosariusza `docs/lokalizacja/glosariusz.md` nie otwierałem (terminy sprawdzałem wprost z `terms-nazwy.yaml` i ze źródła pl). Znaków uproszczonych, resztek polskiego ani zepsutych znaczników nie znalazłem. Wszystkie liczby, rozmiary, pozycje, karty i poprawne odpowiedzi zgodne z pl. Brak znalezisk KRYT i WYS.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m7-l3-implied-odds.md:134 | pl „w module „Plan rozdania” (M9)” → „「手牌規劃」模組（M9）”; tytuł modułu w `content/zh-Hant/modules.yaml` to „一手牌的規劃”, więc nazwa w lekcji nie zgadza się z ekranem; do tego „模組” (reszta przekładu częściej „單元”, np. m7-l1 l. 58 „第 1 單元”) | „請見「一手牌的規劃」單元（M9）” — po decyzji, czy moduł to 單元 czy 模組 (w lekcjach 單元 22×, 模組 15×) |
| NISKIE | m8-l1-value.md:50 | pl „dwie {{t:street|ulice}}”, „dwie {{t:value|ulice wartości}}”, „tu trzecią” → „兩{{t:street|輪}}”, „兩{{t:value|輪價值下注}}”, „第三輪”; street wg terms-nazwy = 街 („輪” to betting-round) | „兩{{t:street|條街}}”, „兩{{t:value|條街的價值下注}}”, „第三條街” (trzy miejsca w jednej linii, dlatego bez poprawki mechanicznej) |
| NISKIE | m8-l1-value.md (cały plik) | brak odstępów między znakami chińskimi a cyframi/literami/znacznikami `{{n:}}` („較弱的K”, „1/4{{t:pot|底池}}”, „在{{n:value.ex.calls}}種”), podczas gdy pozostałe lekcje części mają odstęp („較弱的 K”, „3/4 {{t:pot|底池}}”) | ujednolicić typografię skryptem dla całego języka |
| NISKIE | nagłówki ramki `:::note` | pl wszędzie „Skąd te zasady” → pięć wariantów w pięciu lekcjach: „這些規則從哪來” (m7-l1, m7-l4), „這些原則從哪裡來” (m7-l2), „這些原則的來源” (m7-l3), „這些規則從何而來” (m8-l1) | jedna postać w całym przekładzie, np. „這些規則從哪裡來” |

## Do ujednolicenia skryptem
- **outs → 補牌** (terms-nazwy: `outs: "補牌"`; m7-l3, m7-l4 i m8-l1 mają 補牌). W m7-l1 angielskie „outs” występuje 13× (linie 37, 48, 57, 65×2, 66, 95, 103, 128×2, 137×3), w m7-l2 2× (44, 117). W L4.json są cztery przykłady (m7-l1 l. 37, 57; m7-l2 l. 44, 117); pozostałe 11 miejsc w m7-l1: wzorzec ` ?outs ?` poza znacznikami `{{n:outs.…}}` → `補牌` (np. „有 outs” → „有補牌”, „沒有 outs 的牌” → „沒有補牌的牌”, „張 outs” → „張補牌”). W całym zh-Hant „outs” poza znacznikami to ok. 100 trafień w lekcjach — mechanizm dotyczy też innych części.
- **c-bet**: trzy zapisy w jednej części: „持續下注” (m7-l1 8×, m8-l1 2×; zgodne z terms-nazwy `c-bet: "持續下注"`), „c-bet” (m7-l2 4×: l. 41, 51, 61, 110), „C-bet” wielką literą w środku zdania (m7-l4 15×). Wzorzec `[cC]-bet` → `持續下注` („打 C-bet” → „持續下注”, „翻牌的 c-bet” → „翻牌的持續下注”); wyjątek do decyzji: opcja odpowiedzi m7-l4 l. 17 (`text: "C-bet"`). W całym języku: c-bet 152×, C-bet 60×, 持續下注 49× — decyzja globalna.
- **solver**: „solver” (m7-l1, 5×), „求解器” (m7-l2 1×, m7-l4 3×), „解算器” (m8-l1 2× — poprawione w L4.json na 求解器). Do decyzji globalnej: solver (178×) czy 求解器 (204×); wtedy `solver` → `求解器` w m7-l1 l. 48, 128, 137.
- **set**: „暗三” (m7-l2 8×: l. 15, 22, 27, 41, 44, 46, 78, 111), „暗三條” (m7-l1 l. 27, m7-l4 l. 98), „三條” (m8-l1 l. 50, 51, 70, 81; terms-nazwy `set: "三條"`). Wzorzec `暗三(?!條)` → `暗三條` (8 trafień w m7-l2); osobno decyzja, czy „set” ma być 暗三條 (odróżnia seta od tripsów, jak pl) czy 三條 jak w terms-nazwy.
- **probe bet / check-raise / gutshot**: w terms-nazwy `null` ([DO USTALENIA]), w części konsekwentnie „探測下注”, „過牌加注”, „卡順（聽牌）” — spójne z definicjami w terms-def; bez zmian, tylko do potwierdzenia przy ustalaniu nazw (m7-l1 l. 46/48 „卡順”, w innych częściach bywa „gutshot”).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m7-l3 l. 94 i 138: pl „draw do najlepszej ręki” → „聽的是最大的牌”. Czy czytelnik nie zrozumie tego jako „najwyższej karty”? Alternatywa: „最強的牌” / „堅果牌”.
- m8-l1 l. 16 i 103: pl „odebrać szansę na dobranie”, „nikt niczego nie dobierze” → „補牌”, „補到任何牌” użyte jako czasownik, podczas gdy 補牌 to nazwa terminu outs. Alternatywa: „聽中牌” / „成牌”.
- m7-l1 l. 87: „付掉整個籌碼” (pl „zapłacą cały stack”) — naturalniej chyba „整疊籌碼” / „全部籌碼”.
- m7-l1 l. 26 i 122–123: pl „wysoka karta” → „高牌”, co jest też nazwą układu high-card w terms-nazwy; w kontekście zrozumiałe, ale ewentualnie „大牌”.
- m7-l4 l. 106: „{{t:bet|下注}}開{{t:second-barrel|第二槍}}” (w m7-l1: „下注打第二槍”) — czy „下注開第二槍” brzmi naturalnie.
- m7-l4 l. 129: „想從按鈕位的高牌拿到付錢” — szyk nieco kalkowy; propozycja „想讓按鈕位的高牌付錢”.
- m8-l1 l. 127: nagłówek pl „Thin value: mało, ale za cenę” (en: „small, but paid”) → „薄價值：賺得少，但有人付” — sens zachowany swobodnie; do potwierdzenia.
- m7-l2 l. 127/114 (tabele): „兩頭{{t:straight|順子}}有” / „兩頭順子” jako skrót „strit otwarty” bez „聽牌” — zrozumiałe, ale w tekście lekcji jest „兩頭順子聽牌”.

## Pytania do źródła pl
- m7-l1 l. 76 (pl): „Taki bet zarabia na lepszych rękach.” — zdanie dwuznaczne (czy bet zarabia „dla” lepszych rąk rywala?); en i zh czytają je jako „zarabiają na nim lepsze ręce”. Warto doprecyzować w pl.
- m7-l4 l. 57 (pl): „Gdy znów czeka, dostaje darmową kartę” w uzasadnieniu opcji „Czekam” — podmiot (Button) domyślny, a „znów czeka” wymaga najpierw twojego checka; zh oddaje dosłownie.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Część nie zawiera treści krytycznej (brak modułu 12, helplines, tekstów o prawdziwych pieniądzach).
