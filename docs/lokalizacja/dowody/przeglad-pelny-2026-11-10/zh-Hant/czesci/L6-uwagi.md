# zh-Hant · L6 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m9-l3-rozmiar-geometryczny.md | tak (130/130 linii, pl i zh-Hant linia po linii) | 1 poprawka |
| content/zh-Hant/lessons/m9-l4-plan-trzech-ulic.md | tak (131/131) | 1 poprawka |
| content/zh-Hant/lessons/m10-l1-statystyki.md | tak (131/131) | 7 poprawek |
| content/zh-Hant/lessons/m10-l2-typy-graczy.md | tak (143/143) | 11 poprawek |
| content/zh-Hant/lessons/m10-l3-odejscie-od-bazy.md | tak (130/130) | 2 poprawki |
| content/zh-Hant/lessons/m10-l4-rake.md | tak (127/127) | 3 poprawki |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (cały), `docs/lokalizacja/glosariusz.md` (tylko wiersze board/limp), `content/numbers.yaml` (tylko klucze `mda.*.wr`), `locales/zh-Hant.json` (tylko wyszukanie „模組/單元”). Wersji `en` nie otwierałem. Kontrola skryptem: liczba i klucze `{{n:…}}`, klucze `{{t:…}}`, `[[…]]`, `R-M…` w każdej linii względem pl; pola YAML nieprzekładalne (id, family, rules, answer, table, params) identyczne z pl; polskich liter w przekładzie brak (poza komentarzem YAML w m9-l4:87, identycznym z pl); znaków uproszczonych nie znalazłem.

Różnice liczby znaczników `{{t:…}}` uznane za dopuszczalne (bez poprawki): m9-l3:89 (pl „{{t:bet|postawisz}} {{t:bet}}” → jedno „{{t:bet|下注}}”), m10-l3:16 (dodatkowe „{{t:bluff|詐唬}}” przy „nadwyżki”), m10-l4:121 (dodatkowe „{{t:call|跟注}}” w rozwiniętym zdaniu). Znaczniki `{{n:…}}` zgodne co do liczby we wszystkich liniach.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m10-l1 (56, 76, 105, 107, 110, 121, 127), m10-l2:121, m10-l3 (42, 47, 49, 56, 66, 109, 117, 122, 129) | Nazwa statystyki „fold to 3-bet / fold to c-bet” ma w tej części trzy postaci: „面對 3-bet 棄牌率 / 面對 c-bet 棄牌率” (m10-l1), „面對3-bet棄牌” (m10-l2), angielskie „fold to 3-bet / fold to c-bet / Fold to 3-bet” (m10-l3). Pl ma wszędzie jedną nazwę. | Wybrać jedną postać (rekomendacja: „面對 3-bet 棄牌率”, „面對 c-bet 棄牌率”, bo jest zrozumiała bez angielskiego) i ujednolicić; nie dałem poprawek, bo wybór postaci to decyzja terminologiczna. |
| NISKIE | m10-l3 (22, 33, 99, 111, 129) vs m10-l4 (67, 69, 74, 78, 85, 118, 126) | „solver” zostaje po angielsku w m10-l3, a w m10-l4 jest „求解器” (w całych lekcjach zh-Hant: 求解器 74×, solver 60×). | Ujednolicić do „求解器”. |
| NISKIE | m10-l3 (75, 77, 111, 115, 117, 129) vs m10-l2 (29, 33, 114, 142), m10-l1 (87, 130), m10-l4 (22, 104, 126) | „populacja”: „族群” (m10-l3) vs „玩家群體” (pozostałe); „dane”: „數據” vs „資料”; „mikrostawki”: „微注級別” (m10-l3: 75, 111, 115) vs „微級別” (m10-l2:29, m10-l4: 15, 16, 40, 42, 93). | Ujednolicić: „玩家群體”, „微注級別” (8× w całych lekcjach wobec 6× „微級別”, wszystkie w tej części). |
| NISKIE | m10-l3 (49, 51, 109), m10-l4:126 | „rozmiar (zakładu)”: „尺度” wobec „尺寸” w m9-l3/m9-l4 (całe lekcje: 尺寸 94×, 尺度 20×). | Ujednolicić do „尺寸”. |
| NISKIE | m10-l3:58 | „bez outów” → „沒有 outs” (angielskie słowo); terms-nazwy: outs = „補牌”, ale w całych lekcjach „outs” występuje 102×, „補牌” 48×, więc to sprawa globalna, nie tej linii. | Rozstrzygnąć globalnie (skrypt), nie punktowo. |
| NISKIE | m9-l4 (13, 16, 18, 27, 53, 103, 115) | „set” → „暗三條”; terms-nazwy: set = „三條” (ta sama nazwa co three-of-a-kind). „暗三條” jest precyzyjne i naturalne, ale różni się od terms-nazwy. | Raczej poprawić terms-nazwy (set = „暗三條”) niż tekst; do decyzji terminologicznej. |
| NISKIE | m9-l4 (13, 23, 33), m10-l2 (59, 68), m10-l3 (66, 99) | „Button” → „按鈕位”; terms-nazwy: button = „BTN”. W pl to zwykły tekst bez znacznika; „按鈕位” jest powszechne w całym przekładzie (207×). | Bez zmiany; ewentualnie dopisać formę w terms-nazwy. |
| NISKIE | m10-l1:106 | Forma „{{t:aggressor\|主動進攻者}}” przy nazwie „進攻者” w terms-nazwy. | Ewentualnie „進攻者”; zrozumiałe, nie zmieniałem. |

## Do ujednolicenia skryptem
- „平跟” → „溜入” (limp): 6 trafień w tej części (wszystkie objęte poprawkami w L6.json); w całych lekcjach zh-Hant „平跟” 11×, „溜入” 29×, łacińskie „limp” 19× (`cat content/zh-Hant/lessons/*.md | grep -oF 平跟 | wc -l`). Uwaga: komentarz w terms-nazwy przy `limp` mówi, że nazwa „溜入” czeka na decyzję (źródło tajwańskie podaje „平跟”); jeśli nazwa terminu zostanie zmieniona na „平跟”, tych 6 poprawek nie nakładać.
- „單元” → „模組” (moduł): 8 trafień w tej części (objęte poprawkami); w całych lekcjach „單元” 22×, „模組” 15×; interfejs ma „模組”.
- „fold to 3-bet / fold to c-bet” (m10-l3, 10 trafień `grep -oF 'fold to'`, do tego 1× „Fold to 3-bet” w nagłówku tabeli) i „面對3-bet棄牌” (m10-l2, 1×) → postać z m10-l1 („面對 3-bet 棄牌率”, „面對 c-bet 棄牌率”, 7×), po decyzji.
- „solver” → „求解器” w m10-l3 (5 linii: 22, 33, 99, 111, 129; pozostałe trafienia `grep solver` w m10-l4 to klucze `{{n:rake.solver.…}}`, których nie wolno ruszać).
- „族群” → „玩家群體” (8× w 6 liniach m10-l3), „微級別” → „微注級別” (6×), „尺度” → „尺寸” (4×).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m9-l4:17 „把大部分價值留在{{t:board|牌桌上}}” — pl „zostawia na stole większość wartości” to idiom („zostawić pieniądze na stole”), a znacznik ma klucz `board` (jak w pl). Forma „牌桌上” nie jest postacią nazwy „公共牌”; czy podpowiedź terminu „board” przy słowie „牌桌” nie myli czytelnika? (To samo pytanie dotyczy źródła pl, niżej.)
- m9-l4:16–18 odpowiedzi „三條街 / 一條街 / 零條” oraz m9-l4:103–105 „三條 / 兩條 / 一條或零條” w tabeli obok „暗三條” i „{{t:two-pair}}”: czy samo „三條” (= trzy ulice) nie czyta się tu jak układ „trójka”? Ewentualnie „三條街”.
- m10-l2:80 „最大的{{t:pair}}” za „najwyższa para” (top pair) — czy nie lepiej „頂對” jak w reszcie lekcji.
- m10-l2:23 „他很兇 / 多兇” (agresywny) wobec „激進” w m10-l1:25 — rejestr potoczny; do oceny, czy ujednolicić do „激進”.
- m10-l4:74 i 121: zdanie o min-raise („在不含抽水時會跟注的情況中，只有約 X 仍然跟注”) jest wierne pl, ale ciężkie; do oceny naturalności.
- m10-l1 (83, 85, 86, 129, 130) „sala” → „平台”: sens zachowany; czy w Tajwanie lepsze „撲克平台/撲克室”.

## Pytania do źródła pl
- m9-l4:17 (pl): „zostawia na {{t:board|stole}} większość wartości” — znacznik terminu `board` (karty wspólne) użyty przy idiomie „na stole” w znaczeniu „niewykorzystane”; definicja terminu w glosariuszu wyklucza to znaczenie. Czy znacznik nie powinien zniknąć ze źródła?
- m10-l3:49 (pl): „Fold to c-bet łączy wszystkie rozmiary i stoły” bez znacznika `{{t:board|…}}`, a w treści lekcji (linia 109) „wszystkie rozmiary i flopy” — dwa sformułowania tej samej myśli; przekład poprawiłem na „牌面” zgodnie ze znaczeniem „stół = board”.
- m10-l2:116/124 (pl): „wynik” dla wielkości w bb/100 (winrate) bez znacznika `{{t:winrate}}`, podczas gdy m10-l4 używa „winrate”; jedna nazwa na pojęcie.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L6 nie ma treści krytycznej (brak lekcji m12, reguł R-M12, helplines, ramki „Odpowiedzialna gra”). Fragmenty o regulaminie sal i zakazie HUD (m10-l1:83–87, 129–130) porównane zdanie po zdaniu: „grozi zamknięciem konta”, „może zamknąć konto i zatrzymać środki” oddane bez złagodzenia („可能導致帳號被關閉”, „可以關閉你的帳號並扣留資金”).
