# zh-Hant · E1 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/exams/m0.yaml | tak (92/92 linii, pl i zh) | bez znalezisk; kicker jako 踢腳牌 (patrz „Do ujednolicenia”) |
| content/zh-Hant/exams/m1.yaml | tak (75/75) | bez znalezisk |
| content/zh-Hant/exams/m2.yaml | tak (99/99) | bez poprawek; gutshot jako 卡順 (patrz „Do ujednolicenia”) |
| content/zh-Hant/exams/m3.yaml | tak (95/95) | bez poprawek mechanicznych; limp jako 平跟 (znalezisko niżej) |
| content/zh-Hant/exams/m4.yaml | tak (111/111) | 7 poprawek (limp 跛入 → 溜入; nadmiarowy znacznik value) |
| content/zh-Hant/exams/m5.yaml | tak (100/100) | 7 poprawek (equity po angielsku, formy board/street, zgubiony znacznik pot, drobne) |
| content/zh-Hant/exams/m6.yaml | tak (96/96) | 1 poprawka (outs po angielsku) |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (całość), `docs/lokalizacja/glosariusz.md` (tylko wyszukane wiersze: kicker, check-raise, button, outs, gutshot, backdoor, limp — nie czytany w całości). Wersji en nie otwierałem. Dodatkowo kontrola skryptem linia po linii: znaczniki `{{n:…}}`, `[[…]]`, klucze `{{t:…}}`, pola nieprzekładalne (id, family, rules, table, answer, spot, correct, sizeError) — zgodne z pl poza dwoma miejscami ujętymi w poprawkach (m4:92, m5:100). Znaków uproszczonych ani resztek polskiego nie znalazłem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/zh-Hant/exams/m3.yaml:23, 51 (oraz tekst opcji 23, 51, 61) | pl „Limp oddaje inicjatywę” → „平跟會交出…”, opcja „Dopłacam do dużego blinda” → „平跟大盲”. terms-nazwy: limp = 溜入; w m4 było 跛入 (poprawione na 溜入), w m3 平跟. Trzy nazwy jednego pojęcia w egzaminach. Sens poprawny i zrozumiały. | Po decyzji o nazwie limp (komentarz w terms-nazwy: 溜入 vs 平跟 do rozstrzygnięcia w backlogu) ujednolicić: w liniach 23 i 51 „平跟會交出” → „溜入會交出”; tekst opcji „平跟大盲” może zostać (pl też opisowo). |
| ŚR | content/zh-Hant/exams/m5.yaml:68 vs m6.yaml (13 miejsc) | check-raise: w m5 po angielsku („check-raise”, 2×), w m6 „過牌加注” (13×). terms-nazwy: check-raise = null (zostaje angielskie) [DO USTALENIA], ale w całej treści zh-Hant dominuje 過牌加注 (60 vs 13). | Rozstrzygnąć nazwę w terms-nazwy i ujednolicić skryptem (niżej). |

## Do ujednolicenia skryptem
Liczby trafień: `grep -rhoE` w `content/zh-Hant` (całość / exams).
- check-raise: `check-raise` (13 / 2) ↔ `過牌加注` (60 / 13). terms-nazwy ma null; faktyczna większość to 過牌加注. W części E1: m5:68 (2×) kontra m6:59, 73, 76, 78, 83, 86, 91, 94, 95, 96.
- kicker: `踢腳牌` (12 / 3; w E1: m0:32, 51) ↔ `踢腳` bez 牌 (29 / 5; w E1: m3:31, m4:72, m5:23, m6:77) ↔ `kicker` (12 / 4). terms-nazwy null [DO USTALENIA]. Wzorzec po decyzji: `踢腳(?!牌)` → `踢腳牌` albo odwrotnie.
- gutshot: `卡順` (22 / 7; w E1: m2:21, m2:54, m6:76) ↔ `gutshot` w tekście (terms-nazwy null). pl ma zwykłe „gutshot”.
- backdoor: `後門` (12 / 1; w E1: m6:67) ↔ `backdoor` (5 / 0); terms-nazwy null.
- limp: `跛入` (8 / 7 — tylko egzaminy; 6 w m4 objęte poprawkami) ↔ `平跟` (23 / 9) ↔ `溜入` (52 / 0 w egzaminach przed poprawkami); terms-nazwy 溜入.
- out-of-position: forma `沒有位置` (19 / 7; w E1: m4:14, 23, 53, 71, 72, 91, 92) ↔ nazwa `無位置` (31 / 1; w E1: m5:66 oraz znaczniki bez formy w m3, m5, m6). Obie zrozumiałe; w jednym zestawie egzaminów czytelnik widzi obie. Wzorzec: `{{t:out-of-position|沒有位置}}` → `{{t:out-of-position|無位置}}` (po sprawdzeniu składni zdania, np. „在沒有位置的情況下” → „在無位置的情況下”).
- Button: w tekście `按鈕位` (335 / 78), terms-nazwy button = „BTN”. W E1 konsekwentnie 按鈕位 (pl: „Button” bez znacznika) — nie zmieniałem; do decyzji, czy nazwa w terms-nazwy ma odpowiadać tekstowi.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5:50–52, teksty opcji „超過 {{n:…}} 的情況” (pl „Częściej niż w … przypadków”): zrozumiałe, ale w m6:17–19 to samo oddano naturalniej jako „棄牌頻率高於 {{n:…}}”. Czy ujednolicić m5 do wzoru z m6?
- m4:42 „你補 … 進入{{t:call|跟注}}後共有 … 的{{t:pot|底池}}” — poprawne, ale ciężkie składniowo; ewentualnie „你補 …，跟注後底池共有 …”.
- m6:57, 58, 78 „A 高牌” jako „as jako najwyższa karta” (ace-high): naturalne w żargonie, ale 高牌 to też nazwa układu high-card — czy czytelnik początkujący zrozumie bez dopowiedzenia (m6:54 ma opisowe „你的最大牌是 A”)?
- m6:34 „微級別” (pl „Mikrostawki”): zgodne z terms-nazwy stakes = 級別; czy na Tajwanie nie jest częstsze „微額級別/小級別”?
- m1:55 „雙方亮牌（攤牌）”, m3:23 „要嘛…要嘛…” — rejestr potoczny tajwański, wygląda poprawnie.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części E1 (egzaminy m0–m6) nie było treści krytycznej (moduł 12, helplines, odpowiedzialna gra).
