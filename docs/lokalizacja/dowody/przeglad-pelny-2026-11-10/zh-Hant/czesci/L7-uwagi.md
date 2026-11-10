# zh-Hant · L7 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m11-l1-push-fold.md | tak (178/178 linii, pl i przekład) | 7 poprawek (fold 蓋牌, limp 平跟, shove 全推) |
| content/zh-Hant/lessons/m11-l2-sprawdzanie.md | tak (176/176) | 4 poprawki (fold equity 棄牌收益) |
| content/zh-Hant/lessons/m11-l3-icm.md | tak (169/169) | 1 poprawka (Button) |
| content/zh-Hant/lessons/m13-l1-raport.md | tak (109/109) | 13 poprawek (nazwy werdyktów i napis raportu niezgodne z interfejsem, winrate) |
| content/zh-Hant/lessons/m13-l2-powtorki.md | tak (97/97) | 15 poprawek (模組/領域/自由對戰 niezgodne z interfejsem, werdykt, Button) |
| content/zh-Hant/lessons/m13-l3-przeglad.md | tak (88/88) | 1 poprawka (forma terminu street) |

Pomocniczo czytane: `content/zh-Hant/terms-nazwy.yaml` (całość), fragmenty `apps/mobile/src/i18n/locales/zh-Hant.json` (grade, play, report) i `content/zh-Hant/modules.yaml` — tylko do porównania nazw. `docs/lokalizacja/glosariusz.md` użyty przez wyszukiwanie kluczy (fold-equity, button), nie czytany w całości. Wersji `en` nie otwierałem.

Kontrola mechaniczna (skrypt, linia w linię pl ↔ zh-Hant): liczba linii zgodna we wszystkich 6 plikach; znaczniki `{{n:…}}`, klucze `{{t:…}}`, `[[…]]`, pola `id`/`family`/`rules`/`answer`/`generator`/`params`/`spot`/`table`, `correct: true`, bloki ```` ```range ````/```` ```formula ````/`:::note` — bez różnic. Znaków uproszczonych nie znaleziono. Błędów sensu (liczby, kierunek, poprawna odpowiedź) nie znaleziono; wszystkie znaleziska to terminologia i zgodność z interfejsem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/zh-Hant/lessons/m13-l1-raport.md (15 linii, 16 wystąpień) | pl „solver” → w tej lekcji łacińskie „solver”, a w m11-l1/l2, m13-l3 i w interfejsie (ratedHint, verdictHints) 求解器 | patrz „Do ujednolicenia skryptem” |
| NISKIE | content/zh-Hant/lessons/m11-l1-push-fold.md:108 | pl „robisz {{t:shove|push}}, czyli wchodzisz all-in” → `{{t:shove|全推}}，也就是全下`; forma 全推 niezgodna z terms-nazwy (推全下), ale mechaniczna zamiana daje „推全下，也就是全下” (masło maślane) | np. „每一手你要玩的牌都{{t:shove|推全下}}（push），其餘的都…” — do decyzji redaktora |
| NISKIE | content/zh-Hant/lessons/m11-l1-push-fold.md:138, 166 oraz m11-l2-sprawdzanie.md:175 | pl „siatki” (siatki zakresów) → 格子 w m11-l1, 圖表 w m11-l2 | jedna nazwa w module (圖表 jest częstsze w treści: 38×) |
| NISKIE | content/zh-Hant/lessons/m11-l1-push-fold.md:152 oraz m11-l2-sprawdzanie.md:140 | pl „serwis szkoleniowy” → 教學網站 (jedyne wystąpienie w treści) vs 訓練網站 (123×) | 訓練網站 |
| NISKIE | content/zh-Hant/lessons/m13-l2-powtorki.md:67, 89 | pl „c-bet” zostaje „c-bet” (154× w treści), choć terms-nazwy ma c-bet: 持續下注; w linii 67 poprawione tylko jako nazwa obszaru (= tytuł modułu) | sprawa całego przekładu, nie tej części |

Poza częścią (zauważone przy wyszukiwaniu, nie czytane w całości): warianty 一致/相符/單元/自由對局/逾時 występują też w `content/zh-Hant/rules.yaml` i `content/zh-Hant/exams/m13.yaml` — do sprawdzenia przez recenzentów tych części pod kątem nazw z interfejsu (吻合, 模組, 領域, 自由對戰, 超時).

## Do ujednolicenia skryptem
- `content/zh-Hant/lessons/m13-l1-raport.md`: `solver` → `求解器` (16 wystąpień w 15 liniach; `grep -c solver` = 15). Wzorzec: ` ?solver ?` → `求解器` (usunąć spacje przy znakach CJK; na początku zdania „solver 對你的手牌” → „求解器對你的手牌”). W całym `content/zh-Hant` oba warianty są prawie równo (solver 224×, 求解器 204×); interfejs ma 求解器.
- Cały przekład (poza zakresem części, mechanizm ten sam co w poprawkach L7): 單元 → 模組 (30× w 9 plikach treści wobec 模組 w interfejsie i modules.yaml); 平跟/跛入 → 溜入 w znaczeniu limp (平跟 23× w 6 plikach, 跛入 8× w 2 plikach); `Button` → 按鈕位 (7× w 5 plikach).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m11-l3-icm.md:47 — „輸的傷害幾乎是贏的幫助的一倍半” (pl „Przegrana boli prawie półtora raza bardziej, niż wygrana pomaga”): czy „一倍半” jest czytane jednoznacznie jako 1,5×, czy lepiej „將近 1.5 倍”.
- m11-l3-icm.md:54, 59, 62, 68, 153, 159, 164 — „以籌碼計價的遊戲” za pl „gra o żetony” (chip EV): zrozumiałe, ale czy naturalne; alternatywa „只算籌碼的打法/局”.
- m13-l3-przeglad.md:13 — „現場打牌時” za pl „W trakcie gry na żywo”: w pl chodzi raczej o prawdziwą grę w toku (nie tylko kasyno na żywo); ewentualnie „實戰打牌時”.
- m13-l3-przeglad.md:76, 87 — „爆冷” za „bad beat”: czy na Tajwanie nie zostaje „bad beat”; „冤家牌” za „cooler” uznaję za poprawne.
- m11-l1-push-fold.md:65 — `{{t:short-stack|短}}` („在籌碼非常短時”): forma skrócona względem 短籌碼, naturalna; zostawiona.
- m13-l1-raport.md:105 — „{{n:m13.noise.hands.k}} 千手牌” (wyjdzie „2.5 千手牌”): czy nie lepiej bez „牌” / w zapisie „2,500 手”; wymagałoby innego klucza liczby, więc bez poprawki.
- Interfejs raportu ma tytuł `{{t:session|牌局}}報告`, a lekcje m13 konsekwentnie 場次 (zgodnie z terms-nazwy) — do rozstrzygnięcia przy części interfejsu, nie tutaj.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części nie było treści krytycznej (m13-l1 tylko odwołuje się do reguły R-M12-004 w polu `rules`; identyfikator bez zmian).
