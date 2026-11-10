# Pełny przegląd przekładu zh-Hant — podsumowanie (sesja AP, 2026-11-10)

Scalenie 16 plików `czesci/<CZĘŚĆ>-uwagi.md` (L1–L8, E1–E2, R1–R4, S1, U1), przeczytanych w całości, z `poprawki-zh-Hant.json` (231 poprawek: KRYT 0, WYS 0, ŚR 169, NISKIE 62; kontrola `zloz.mjs`: odrzucone 0, kolizje 0, ostrzeżenia o znacznikach 11). Poprawki mechaniczne z opisem są w `znaleziska.md`; tu jest to, czego tam nie ma.

Skróty ścieżek: bez przedrostka = `content/zh-Hant/…`; „UI” = `apps/mobile/src/i18n/locales/zh-Hant.json`; „sklep” = `store/app-store-metadata.json` (`lokalizacje.zh-Hant`). Stan plików: gałąź `przeglad-ap-cjk`, przed nałożeniem poprawek.

Żaden recenzent nie zgłosił znaleziska KRYT ani WYS, ani w poprawkach, ani w uwagach. Wszystkie znaleziska to terminologia, zgodność z interfejsem, zgubione znaczniki podświetlenia i naturalność.

**Do usunięcia przed nałożeniem poprawek: sprzeczności S-1…S-5 w sekcji „Rozstrzygnięcia terminologiczne do podjęcia” (podsekcja „Sprzeczności między poprawkami”).**

## Pokrycie jednostek

70 jednostek: 44 lekcje, 14 egzaminów, 4 fragmenty `rules.yaml`, 6 plików słownikowych i nakładek, słownik interfejsu, metadane sklepu. Kolumna „Przejrzana w całości” jest przepisana z tabeli „Pokrycie” danej części (pl i przekład). Wszystkie 70 jednostek ma deklarację „tak”; trzy z nich mają zgłoszoną lukę albo zastrzeżenie co do sposobu czytania (spots.yaml, terms-nazwy.yaml, słownik interfejsu) — przepisane w wierszu. Kolumna „Poprawek” = liczba wpisów w `poprawki-zh-Hant.json` z danym `cel` (dla `rules.yaml` z podziałem wg pola `grupa`), policzona skryptem; suma 231.

| `content/ko/lessons/m0-l1-uklady.md` | tak | subagent L1 | 6 |
| `content/ko/lessons/m1-l1-przebieg.md` | tak | subagent L1 | 1 |
| `content/ko/lessons/m2-l1-outy.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m2-l2-pot-odds.md` | tak | subagent L1 | 0 |
| `content/ko/lessons/m3-l1-pozycja.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m3-l2-rece-startowe.md` | tak | subagent L1 | 3 |
| `content/ko/lessons/m3-l3-zakresy-otwarc.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m4-l1-3bet.md` | tak | subagent L2 | 8 |
| `content/ko/lessons/m4-l2-obrona-bb.md` | tak | subagent L2 | 9 |
| `content/ko/lessons/m4-l3-wobec-3betu.md` | tak | subagent L2 | 0 |
| `content/ko/lessons/m4-l4-limperzy.md` | tak | subagent L2 | 7 |
| `content/ko/lessons/m5-l1-tekstury.md` | tak | subagent L2 | 6 |
| `content/ko/lessons/m5-l2-przewagi.md` | tak | subagent L2 | 18 |
| `content/ko/lessons/m5-l3-czestotliwosc-rozmiar.md` | tak | subagent L3 | 12 |
| `content/ko/lessons/m5-l4-bez-pozycji.md` | tak | subagent L3 | 3 |
| `content/ko/lessons/m6-l1-mdf-alpha.md` | tak | subagent L3 | 2 |
| `content/ko/lessons/m6-l2-sprawdzenie.md` | tak | subagent L3 | 8 |
| `content/ko/lessons/m6-l3-check-raise.md` | tak | subagent L3 | 5 |
| `content/ko/lessons/m7-l1-druga-beczka.md` | tak | subagent L4 | 6 |
| `content/ko/lessons/m7-l2-polaryzacja.md` | tak | subagent L4 | 4 |
| `content/ko/lessons/m7-l3-implied-odds.md` | tak | subagent L4 | 6 |
| `content/ko/lessons/m7-l4-probe-obrona.md` | tak | subagent L4 | 4 |
| `content/ko/lessons/m8-l1-value.md` | tak | subagent L4 | 3 |
| `content/ko/lessons/m8-l2-ile-blefow.md` | tak | subagent L5 | 2 |
| `content/ko/lessons/m8-l3-blokery.md` | tak | subagent L5 | 1 |
| `content/ko/lessons/m8-l4-bluff-catching.md` | tak | subagent L5 | 0 |
| `content/ko/lessons/m9-l1-spr.md` | tak | subagent L5 | 5 |
| `content/ko/lessons/m9-l2-zaangazowanie.md` | tak | subagent L5 | 4 |
| `content/ko/lessons/m9-l3-rozmiar-geometryczny.md` | tak | subagent L6 | 6 |
| `content/ko/lessons/m9-l4-plan-trzech-ulic.md` | tak | subagent L6 | 6 |
| `content/ko/lessons/m10-l1-statystyki.md` | tak | subagent L6 | 2 |
| `content/ko/lessons/m10-l2-typy-graczy.md` | tak | subagent L6 | 16 |
| `content/ko/lessons/m10-l3-odejscie-od-bazy.md` | tak | subagent L6 | 2 |
| `content/ko/lessons/m10-l4-rake.md` | tak | subagent L6 | 5 |
| `content/ko/lessons/m11-l1-push-fold.md` | tak | subagent L7 | 0 |
| `content/ko/lessons/m11-l2-sprawdzanie.md` | tak | subagent L7 | 5 |
| `content/ko/lessons/m11-l3-icm.md` | tak | subagent L7 | 4 |
| `content/ko/lessons/m13-l1-raport.md` | tak | subagent L7 | 7 |
| `content/ko/lessons/m13-l2-powtorki.md` | tak | subagent L7 | 8 |
| `content/ko/lessons/m13-l3-przeglad.md` | tak | subagent L7 | 1 |
| `content/ko/lessons/m12-l1-wariancja.md` (treść krytyczna) | tak | subagent L8 | 3 |
| `content/ko/lessons/m12-l2-decyzja-wynik.md` (treść krytyczna) | tak | subagent L8 | 1 |
| `content/ko/lessons/m12-l3-tilt.md` (treść krytyczna) | tak | subagent L8 | 1 |
| `content/ko/lessons/m12-l4-bankroll.md` (treść krytyczna) | tak | subagent L8 | 7 |
| `content/ko/exams/m0.yaml` | tak | subagent E1 | 0 |
| `content/ko/exams/m1.yaml` | tak | subagent E1 | 2 |
| `content/ko/exams/m2.yaml` | tak | subagent E1 | 1 |
| `content/ko/exams/m3.yaml` | tak | subagent E1 | 5 |
| `content/ko/exams/m4.yaml` | tak | subagent E1 | 4 |
| `content/ko/exams/m5.yaml` | tak | subagent E1 | 6 |
| `content/ko/exams/m6.yaml` | tak | subagent E1 | 9 |
| `content/ko/exams/m7.yaml` | tak | subagent E2 | 7 |
| `content/ko/exams/m8.yaml` | tak | subagent E2 | 5 |
| `content/ko/exams/m9.yaml` | tak | subagent E2 | 0 |
| `content/ko/exams/m10.yaml` | tak | subagent E2 | 8 |
| `content/ko/exams/m11.yaml` | tak | subagent E2 | 1 |
| `content/ko/exams/m12.yaml` (treść krytyczna) | tak | subagent E2 | 10 |
| `content/ko/exams/m13.yaml` | tak | subagent E2 | 1 |
| `content/ko/rules.yaml` l. 1-331 (nagłówek, R-M1…R-M4) | tak | subagent R1 | 2 |
| `content/ko/rules.yaml` l. 332-642 (R-M5…R-M7) | tak | subagent R2 | 16 |
| `content/ko/rules.yaml` l. 643-952 (R-M8…R-M10) | tak | subagent R3 | 9 |
| `content/ko/rules.yaml` l. 953-1207 (R-M12 (treść krytyczna), R-M11, R-M13) | tak | subagent R4 | 4 |
| `content/ko/areas.yaml` | tak (brak pól tekstowych, plik identyczny z pl) | subagent S1 | 0 |
| `content/ko/modules.yaml` | tak | subagent S1 | 0 |
| `content/ko/ranges/spots.yaml` | tak | subagent S1 | 0 |
| `content/ko/helplines.yaml` (treść krytyczna) | tak, zdanie po zdaniu | subagent S1 | 1 |
| `content/ko/terms-def.yaml` | tak (162 definicje) | subagent S1 | 0 |
| `content/ko/terms-nazwy.yaml` | tak (162 nazwy); luka zgłoszona przez recenzenta: tabela `docs/lokalizacja/glosariusz.md` nie czytana wiersz po wierszu (przeczytany nagłówek z zasadami i źródło tabeli `content/terms.yaml`) | subagent S1 | 0 |
| słownik interfejsu `apps/mobile/src/i18n/locales/ko.json` | tak (699 kluczy zestawione z pl klucz po kluczu) | subagent U1 | 2 |
| metadane sklepu `docs/sklep/aso/metadane-fala2.json` → `lokalizacje.ko` | tak (name, subtitle, keywords, promotionalText, description); `store/iap-localizations.json` nie ma języka ko („brak metadanych zakupów”) | subagent U1 | 5 |

Dodatkowo każda część L, E i R porównała skryptem, linia po linii względem pl: klucze `{{t:…}}`, znaczniki `{{n:…}}`, `[[…]]`, pola nieprzekładalne (id, family, rules, answer, table, params, spot, sources, adresy URL) i flagi `correct`/`sizeError`. Różnice są albo w poprawkach, albo opisane w uwagach jako dopuszczalne (L1 m0-l1:99; L6 m9-l3:89, m10-l3:16, m10-l4:121; E2 exams/m11.yaml:75; kolejność `{{n:}}` w L3 m5-l4:65, m6-l1:65 i R2 rules.yaml:595).

Czego recenzenci jawnie nie czytali:

- `docs/lokalizacja/glosariusz.md` w całości: nie otwierany przez L1, L4, L8, R1, R3, R4 (R2 o nim nie wspomina); czytany tylko wyszukanymi wierszami przez L2, L6, L7, E1, E2, U1; w całości przeczytali go L3 i L5; S1 przeczytał nagłówek, pierwsze i ostatnie wiersze oraz kolumnę „Uwagi” (kolumn „Znaczenie” i „Przekład en” nie, bo glosariusz jest generowany z `content/terms.yaml`, które przeczytał).
- Wersja `en`: nie otwierana przez L1, L3, L6, L7, E1, R2, R4; pojedyncze zdania u L2 (2), L4 (3), L5 (2 linie), L8 (2 linie), E2 (1), R1 (1 reguła), R3 (5 linii); `locales/en.json` — U1 otworzył tylko `help.*`.
- `locales/pl.json`: 48 form liczby mnogiej `_one/_few/_many` (16 kluczy) nie było czytanych osobno; zh-Hant ma tylko `_other` i z tą formą pl porównano (U1).
- `locales/pl.kontekst.json`: tylko konteksty ok. 15 kluczy wątpliwych (U1).
- `content/terms.yaml`: pola `forms`, `skip`, `source`, `lesson` (S1; nie są przekładane).
- `content/zh-Hant/ranges/spots.yaml`: czytany jako diff wobec `content/ranges/spots.yaml`, nie plik po pliku (S1).
- Wartości liczb pod znacznikami `{{n:…}}` (`content/numbers.yaml`): nie sprawdzane, poza pojedynczymi kluczami (L5, L6, L8, E2, R1, R2); porównywano klucze i liczbę wystąpień.
- Znaki uproszczone: L8 zaznacza, że wyszukiwanie było heurystyczne (lista ok. 600 znaków, bez OpenCC) i nie jest pełnym dowodem; pozostałe części deklarują „nie znaleziono” bez opisu metody albo ze skanem listą częstych znaków (S1, R3).
- Metadane IAP: `store/iap-localizations.json` nie ma zh-Hant (tylko pl, en) — nie było czego przeglądać; `docs/sklep/aso/metadane-fala2.json` też nie ma zh-Hant.
- Miejsca wskazane tylko przez grep poza własną częścią (R3: „do rivera”; L7: nazwy z interfejsu w rules.yaml i exams/m13.yaml; L5: „equity” w m4-l2, m5-l4, m11-l3) nie były przez wskazującego czytane w kontekście; właściwe części je przeczytały, ale nie wszystkie wskazania mają poprawkę (zob. niżej).

## Znaleziska bez poprawki mechanicznej

60 wierszy z 16 części: KRYT 0, WYS 0, ŚR 17, NISKIE 43. Kolumna „Stan” (dopisana przy scalaniu) mówi, czy znalezisko zostało w międzyczasie pokryte poprawką innej części.

| Waga | plik:linia | Opis | Propozycja | Część |
|---|---|---|---|---|
| ŚR | lessons/m12-l3-tilt.md (cały, 44×), m12-l4-bankroll.md:51 | „tilt” → 上頭; `terms-nazwy` ma `tilt: null`, `rules.yaml` 995–999 pisało 情緒失控（tilt）, egzamin m12, modules.yaml i terms-def mają 上頭. Trzy postaci jednego pojęcia w treści krytycznej. | Decyzja terminologiczna (T-8). Stan: R4 zmienia rules.yaml:995, 997 na 上頭, L8 dopisuje „（tilt）” w m12-l3:100; zostaje wpis w terms-nazwy i opis sklepu. | L8 |
| ŚR | terms-nazwy.yaml (wpisy `null`, [DO USTALENIA]) | Terminy z nazwą `null`, dla których treść konsekwentnie używa chińskiej nazwy zwykłym tekstem: kicker, check-raise, tilt, ante, bluff-catcher, gutshot, backdoor, pot-odds, fold-equity, stack, heads-up, polarization. Czytelnik uczy się chińskiej nazwy, a słowniczek pokazuje angielską. | Wpisać nazwy chińskie (T-12); wszystkie te klucze mają 0 znaczników bez formy, więc tekst lekcji się nie zmieni. | S1 |
| ŚR | terms-nazwy.yaml:49 | `button: "BTN"`, a w całej treści pozycja to 按鈕位 (335×, także definicje i spots.yaml). | `button: "按鈕位"` (znacznik bez formy: 0 użyć) — T-5. | S1 |
| ŚR | terms-nazwy.yaml:27–28 | `board` i `community-cards` mają tę samą nazwę 公共牌; dwa hasła słowniczka o identycznej nazwie. | Rozważyć `board: "牌面"` (zmienia renderowanie 5 znaczników `{{t:board}}` bez formy) — T-13. | S1 |
| ŚR | terms-nazwy.yaml:69, 81 | `connectors` i `connected` mają tę samą nazwę 連張. | Rozróżnić, np. `connected: "相連"` — wybór dla rodzimego użytkownika (T-21). | S1 |
| ŚR | exams/m10.yaml:43 | Skutek poprawki S1 `set: "暗三條"`: forma `{{t:set|三條}}` obok `{{t:set}}` (linia 47) da dwie nazwy w jednym zadaniu. | `{{t:set|暗三條}}`. Bez poprawki w JSON — do dopisania (S-6). | S1 |
| ŚR | lessons/m6-l3-check-raise.md (29 linii, 36 wystąpień) | Button = 莊位 tylko w tej lekcji; reszta treści 按鈕位. | Skrypt U-5; w JSON tylko 2 przykłady (linie 99, 109). | L3 |
| ŚR | lessons/m13-l1-raport.md (15 linii, 16 wystąpień) | „solver” po łacinie, a w m11-l1/l2, m13-l3 i interfejsie 求解器. | Skrypt U-1. | L7 |
| ŚR | lessons/m10-l1 (56, 76, 105, 107, 110, 121, 127), m10-l2:121, m10-l3 (42, 47, 49, 56, 66, 109, 117, 122, 129) | Nazwa statystyki „fold to 3-bet / fold to c-bet” w trzech postaciach: 面對 3-bet 棄牌率 (m10-l1), 面對3-bet棄牌 (m10-l2), angielskie „fold to …” (m10-l3). | Jedna postać: 面對 3-bet 棄牌率 / 面對 c-bet 棄牌率 (T-17, U-13). | L6 |
| ŚR | lessons/m4-l1-3bet.md:85, 93, 104; m4-l2-obrona-bb.md:73, 79, 89, 92 | „siatka” (zakresu): 手牌表 (m4-l1), 網格 (m4-l2), w module 3 表格. | Jedna nazwa w całym przekładzie (T-16). | L2 |
| ŚR | lessons/m7-l3-implied-odds.md:134 | „w module „Plan rozdania” (M9)” → 「手牌規劃」模組（M9）; tytuł modułu w modules.yaml to 一手牌的規劃. | 「一手牌的規劃」模組（M9） (po T-15: moduł = 模組). | L4 |
| ŚR | exams/m3.yaml:23, 51 (opcje: 23, 51, 61) | limp = 平跟 („平跟會交出…”, opcja 平跟大盲); w m4 było 跛入 (poprawione na 溜入). | Po decyzji T-1: „平跟會交出” → „溜入會交出”; tekst opcji może zostać opisowy. | E1 |
| ŚR | exams/m11.yaml:11 | „Limp” → 平跟（limp） / 平跟; nie poprawione, „żeby egzamin nie rozjechał się z lekcją m11-l1”. | Decyzja T-1. Stan: L7 zmienia lekcję m11-l1 na 溜入, więc egzamin rozjedzie się z lekcją (S-4). | E2 |
| ŚR | exams/m5.yaml:68 wobec exams/m6.yaml (13 miejsc) | check-raise po angielsku w m5 (2×), 過牌加注 w m6. | Nazwa w terms-nazwy i ujednolicenie (T-12, U-16). | E1 |
| ŚR | rules.yaml:570; lessons/m9-l2:110, m9-l3:129, m9-l4:53, m7-l2:46, 117; exams/m7.yaml:47 | „do rivera” (włącznie) oddane jako 在河牌前 („przed riverem”); miejsca wskazane grepem, nieczytane przez R3 w kontekście. | 到河牌為止. Stan: m9-l3:129 i m9-l4:53 poprawione (L6), m9-l2:110 poprawione inną formą (L5, S-2); bez poprawki: rules.yaml:570, m7-l2:46, 117, exams/m7.yaml:47. | R3 |
| ŚR | lessons/m13-l1-raport.md | Werdykt „Zgodna” = 一致 (interfejs: 吻合). | Stan: pokryte 8 poprawkami L7 (linie 36, 45, 46, 55, 64, 90). | E2 |
| ŚR | UI: 345, 420, 466, 288 i in. | 牌局 stoi za „sesja” (`t:session`, 3 miejsca — w poprawkach), „rozdanie” (`play.autoNote`, `play.report.replay` 牌局回放, `advancement.gameExplain`) i „gra” (`play.freeHint`); „rozdanie” to też 手/手牌. | Po zmianie `t:session` na 場次 rozważyć 牌局 → 手牌/這手牌 w trzech kluczach (T-14). | U1 |
| NISKIE | lessons/m12-l1-wariancja.md (26 linii), m12-l2:68, m12-l4:58 | „{{n:var.hands.k}} tys. rąk” → „… 千手牌” (wyświetla się „100 千手牌”; po chińsku liczy się w 萬). Także „76.9 百萬手” (m12-l2:112). Liczba i sens zgodne z pl. | Nie do poprawienia w tekście: klucz niesie „100”, nie „100 000” (T-23). | L8 |
| NISKIE | rules.yaml:957, 965, 972, 1029 | To samo „… 千手牌” w R-M12. | Jak wyżej. | R4 |
| NISKIE | lessons/m6-l2-sprawdzenie.md:41, 51, 61, 71, 81 | „Button `{{t:bet|stawia}}` c-bet 1/3 `{{t:pot|puli}}`” → „按鈕位持續下注 1/3 …”: zgubiony znacznik `{{t:bet}}`; linie identyczne, więc `stary` nie może być unikalny. | „按鈕位持續`{{t:bet|下注}}` 1/3 `{{t:pot|底池}}`” — skrypt U-19. | L3 |
| NISKIE | lessons/m6-l2-sprawdzenie.md:98 | Zgubiony `{{t:bet}}` w „按鈕位持續下注。”. | „按鈕位持續`{{t:bet|下注}}`。” | L3 |
| NISKIE | lessons/m6-l3-check-raise.md:102, 129 | „Button `{{t:bet|stawia}}` go szerokim zakresem” → „打這種注” / „打小 c-bet”: znacznik pominięty, sens zachowany. | Zostawić albo „用很寬的範圍`{{t:bet|下注}}`小 c-bet”. | L3 |
| NISKIE | lessons/m8-l2-ile-blefow.md:65, 66, 74, 76, 83, 142 | „ręka łapiąca `{{t:bluff|blefy}}`” → 抓詐唬牌 bez znacznika. | Bez zmiany albo „抓`{{t:bluff|詐唬}}`牌”. | L5 |
| NISKIE | lessons/m0-l1-uklady.md:99 | „przy dwóch `{{t:pair|parach}}`” → `{{t:two-pair|兩對}}`: zmieniony klucz znacznika; sens poprawny. | Zostawić; jeśli strażnik wymaga kluczy jak w pl: „兩邊都有兩`{{t:pair|對}}`時”. | L1 |
| NISKIE | exams/m11.yaml:75 | pl 2 × `{{t:chips}}`, przekład 3 ×. | Zostawić. | E2 |
| NISKIE | lessons/m8-l1-value.md:50 | „dwie `{{t:street|ulice}}`”, „dwie `{{t:value|ulice wartości}}`”, „trzecią” → 輪 (to nazwa betting-round); trzy miejsca w jednej linii. | „兩`{{t:street|條街}}`”, „兩`{{t:value|條街的價值下注}}`”, „第三條街”. | L4 |
| NISKIE | lessons/m11-l1-push-fold.md:108 | `{{t:shove|全推}}，也就是全下`: forma niezgodna z terms-nazwy (推全下), ale zamiana mechaniczna daje „推全下，也就是全下”. | Np. „每一手你要玩的牌都`{{t:shove|推全下}}`（push），其餘的都…” — do redaktora. | L7 |
| NISKIE | lessons/m10-l1-statystyki.md:106 | Forma `{{t:aggressor|主動進攻者}}` przy nazwie 進攻者. | Ewentualnie 進攻者. | L6 |
| NISKIE | lessons m4-l1, m4-l4 (尺度, 14×) wobec m4-l2, m4-l3, m5-l2 (尺寸) | „rozmiar” ma dwie nazwy. | 尺寸 (U-8). | L2 |
| NISKIE | lessons/m10-l3 (49, 51, 109), m10-l4:126 | 尺度 wobec 尺寸 w m9-l3/m9-l4. | 尺寸 (U-8). | L6 |
| NISKIE | lessons/m4-l1-3bet.md:48 wobec m4-l3:56, 57, 108; m5-l1:49; m5-l2:27 | „set” → raz „set”, raz 暗三條, raz „set（暗三條）”. | 暗三條 (T-7). | L2 |
| NISKIE | lessons/m9-l1-spr.md:137 wobec m9-l2:30, 59, 69 | set: 暗三條 w m9-l1, 三條 w m9-l2. | Wg decyzji T-7. | L5 |
| NISKIE | lessons/m9-l4 (13, 16, 18, 27, 53, 103, 115) | set → 暗三條 przy `set: "三條"` w terms-nazwy. | Poprawić terms-nazwy, nie tekst. Stan: poprawka S1 (terms-nazwy.yaml:10). | L6 |
| NISKIE | exams m7:47, m9:20, 56, 84, 85 wobec m10:43, 47 | set: 暗三條 (tekst) wobec `{{t:set|三條}}` / `{{t:set}}`. | Wg T-7. | E2 |
| NISKIE | rules.yaml:363, 502, 505 | „sety” → 暗三; tekst poprawny, niezgodny był wpis terms-nazwy. | Tekstu reguł nie zmieniać; po T-7 ewentualnie 暗三 → 暗三條 (U-10). | R2 |
| NISKIE | lessons/m10-l3 (22, 33, 99, 111, 129) wobec m10-l4 | „solver” po angielsku wobec 求解器. | 求解器 (U-1). | L6 |
| NISKIE | exams m11 wobec m13 | „solver” wobec 求解器. | U-1. | E2 |
| NISKIE | exams m7, m10 wobec m8 (17, 88), m13 (73) | „c-bet” wobec 持續下注. | T-6. | E2 |
| NISKIE | lessons/m13-l2-powtorki.md:67, 89 | „c-bet” zostaje, choć terms-nazwy ma 持續下注; w linii 67 poprawione tylko jako nazwa obszaru. | T-6. | L7 |
| NISKIE | lessons/m10-l3-odejscie-od-bazy.md:58 | „bez outów” → „沒有 outs”. | 補牌 (U-7). | L6 |
| NISKIE | lessons/m10-l3 (75, 77, 111, 115, 117, 129) wobec m10-l1, m10-l2, m10-l4 | „populacja”: 族群 wobec 玩家群體; „dane”: 數據 wobec 資料; „mikrostawki”: 微注級別 wobec 微級別. | 玩家群體 (T-18); mikrostawki: zob. S-5. | L6 |
| NISKIE | lessons/m9-l2-zaangazowanie.md (28×) wobec m9-l1 | „stack”: 籌碼量 (m9-l2) wobec 籌碼 (m9-l1); `stack: null`. | Jedna postać w module 9 (T-12). | L5 |
| NISKIE | lessons/m8-l4 (9×) wobec m8-l2 (15×), m9-l2 (3×) | „cała pula”: 滿`{{t:pot|底池}}` wobec 整個`{{t:pot|底池}}`. | Ewentualnie ujednolicić (U-20). | L5 |
| NISKIE | lessons m9-l4 (13, 23, 33), m10-l2 (59, 68), m10-l3 (66, 99) | Button → 按鈕位 przy `button: "BTN"`. | Bez zmiany w tekście; T-5. | L6 |
| NISKIE | lessons/m11-l1:138, 166; m11-l2:175 | „siatki” → 格子 (m11-l1), 圖表 (m11-l2). | Jedna nazwa (T-16). | L7 |
| NISKIE | lessons/m11-l1:152 wobec m11-l2:140 | „serwis szkoleniowy” → 教學網站 wobec 訓練網站. | 訓練網站 (T-22). | L7 |
| NISKIE | exams m12:55 wobec m13:72 | „bad beat”: 爆冷 wobec „bad beat”; lekcja m12-l3: 被逆轉. | Ujednolicić po odpowiedzi rodzimego użytkownika (T-20). | E2 |
| NISKIE | nagłówki `:::note` (m7-l1, m7-l2, m7-l3, m7-l4, m8-l1) | „Skąd te zasady” w pięciu wariantach w pięciu lekcjach. | Jedna postać, np. 這些規則從哪裡來 (U-18; w całym przekładzie 8 wariantów). | L4 |
| NISKIE | lessons/m4-l2-obrona-bb.md (cały) | Brak odstępu między tekstem chińskim a `{{n:…}}`. | Typografia, skryptem (U-21). | L2 |
| NISKIE | lessons/m8-l1-value.md (cały) | Brak odstępów przy cyfrach, literach i `{{n:}}`. | U-21. | L4 |
| NISKIE | exams/m8.yaml (cały) | Brak spacji przy liczbach i `{{n:…}}`. | U-21 albo zostawić. | E2 |
| NISKIE | lessons/m9-l2-zaangazowanie.md (17 miejsc) | `{{t:spr}}` bez spacji („SPR低時”), w m9-l1 ze spacjami. | U-21. | L5 |
| NISKIE | terms-nazwy.yaml:123 | `mental-game: null` → jedyny `{{t:mental-game}}` bez formy wyświetli „mental game” w chińskim zdaniu; tytuł m12 ma 心態. | `mental-game: "心態"` albo forma w miejscu użycia. | S1 |
| NISKIE | terms-def.yaml:17 | „W polskich tekstach także «podbicie»” → 「中文也稱「加碼」」: adaptacja lokalna, poprawna tylko, jeśli 加碼 jest używanym synonimem raise. | Jeśli nie — usunąć zdanie (pytanie N-45). | S1 |
| NISKIE | rules.yaml:494 | „na suchych flopach z królem” → „K 高的乾燥翻牌” (zawężenie zgodne ze źródłem K84). | Zostawić. | R2 |
| NISKIE | rules.yaml:153, 216, 225, 252 (pole source) | „aplikacji” → 本應用; naturalniej 本 App. Pole nie jest pokazywane. | Bez zmiany albo przy okazji. | R1 |
| NISKIE | rules.yaml:208 | Komentarz YAML po polsku (jak w pl). | Bez zmiany. | R1 |
| NISKIE | rules.yaml:1042–1043, 1141–1143 | Komentarze YAML po polsku (jak w pl). | Bez zmiany. | R4 |
| NISKIE | sklep:36 | „To nauka, nie hazard: **w aplikacji** nie ma stawek…” → przekład bez „w aplikacji” (tak samo en-US). Sens zachowany. | Bez zmiany albo „App 內沒有賭注…”. | U1 |
| NISKIE | sklep:32–33 | name/subtitle to adaptacja ASO, nie przekład pl; informacja o braku prawdziwych pieniędzy zachowana. | Bez zmiany (decyzja ASO). | U1 |

## Do ujednolicenia skryptem

Liczby to **wystąpienia** (nie linie), zweryfikowane przy scalaniu na stanie sprzed poprawek. Dwa rodzaje liczenia:

- „surowo”: `grep -rhoF --exclude=terms-nazwy.yaml -- 'X' content/zh-Hant | wc -l` oraz `grep -oF -- 'X' apps/mobile/src/i18n/locales/zh-Hant.json | wc -l` (zapis „48 + UI 1”); `terms-nazwy.yaml` jest wyłączony, bo jego komentarze cytują formy;
- „w tekście wyświetlanym” (dla słów łacińskich, które występują też w kluczach): po usunięciu komentarzy YAML, `{{n:…}}`, kluczy `{{t:klucz`, adresów URL i linii `id/family/rules/sources/check/params/spot`; w `rules.yaml` osobno pola `if/then/because/population` i pole `source` (pole `source` nie jest pokazywane w aplikacji — R1). Komenda zastępcza dla lekcji i egzaminów: `cat content/zh-Hant/lessons/*.md content/zh-Hant/exams/*.yaml | grep -vE '^\s*(#|id:|family:|params:)' | sed -E 's/\{\{[nt]:[^}|]*//g' | grep -oi 'WZORZEC' | wc -l`.

Wzorce z wielobajtowymi klasami znaków (`[^ |，。]`, `一?`) trzeba uruchamiać z `LC_ALL=C.UTF-8`; w domyślnej lokalizacji środowiska `grep -E` liczy je bajtowo i daje inne wyniki.

**Kolejność:** najpierw nałożyć `poprawki-zh-Hant.json`, potem skrypty. Część poprawek ma w polu `stary` tekst, który skrypt by zmienił (wtedy `stary` przestaje pasować): `solver` — L7 m13-l1:36; `尺度` — L2 m4-l1:27, L6 m10-l3:49, L5 m9-l2:110; `莊位` — L3 m6-l3:99, 109; `c-bet` — L2 m5-l1:58, L3 m6-l3:54, 99, L7 m13-l2:67; `單元` — 17 poprawek (L6, L7, U1); `平跟` — 11 (L6, L7); `outs` — 5 (L4, E1); `在河牌前` — 5 (L5, L6, R3); `兩極化` — 3 (R2, R3); `獎池` — 6 (U1, S1); `籌碼量` — L5 m9-l2:110, S1 terms-def:108. Kolumna „Po poprawkach” podaje, ile zostaje dla skryptu.

| Nr | Wzorzec → zamiana | Trafienia (stan obecny) i komenda | Już w poprawkach | Po poprawkach zostaje | Wyjątki | Waga |
|---|---|---|---|---|---|---|
| U-1 | łac. `solver` → 求解器 (ze zdjęciem spacji przy znakach CJK) | tekst wyświetlany: 49 (lekcje 43: m13-l1 16, m10-l3 6, m5-l4 6, m7-l1 5, m6-l3 4, m8-l3 2, m9-l2 2, m3-l1 1, m6-l1 1; egzaminy 6: m11); komenda zastępcza z `solver` → 49. Dla porównania 求解器: 204 + UI 23 | 0 (L4 poprawia tylko 解算器 → 求解器, m8-l1:131, 138 — komplet, `grep -rhoF 解算器` = 2) | 49 | klucze `{{n:rake.solver.…}}`, `kind: solver-pub/solver-app`, klucz `solver:` w spots.yaml (25), klucze JSON w UI (`"solver-pub"`, `"solver"`), cytaty angielskie i adresy w `source` (6), komentarze | ŚR |
| U-2 | łac. `equity` → 權益 | tekst wyświetlany: 34 (m9-l2 15, m4-l2 11, m5-l4 1; egzaminy m5 2, m12 2, m7 1, m13 1, m10 1) | 33 (L2 11, L5 15, L3 1, E1 2, E2 4) | 1: exams/m10.yaml:80 „權益（equity）” — dopisek przy definicji, zostawić | `id`/`family` (`m11.icm.equity`), `params: { mode: equity }`, parametry UI `{{equity}}`, klucze terms-def, cytaty w `source` (6) | ŚR — skrypt zbędny |
| U-3 | 勝率 w znaczeniu equity → 權益 | surowo 9: m10-l2 3, m6-l3 2, m7-l2 1, m7-l4 1, exams/m7 1, rules.yaml:873 1 | 5 → 權益 (L3 2, L4 2, E2 1); 3 → 贏率 (L6, m10-l2:116 ×2, 124: tam pl „wynik” = winrate) | 1 | rules.yaml:873 攤牌勝率 (W$SD, odsetek wygranych showdownów) — to nie equity, nie zmieniać | ŚR — skrypt zbędny |
| U-4 | łac. `all-in` → 全下 | tekst wyświetlany: lekcje 6 (m2-l1:44, 55, 123, 131; m1-l1:96; m6-l1:94), rules if/then 2 (81, 89); 全下: 256 + UI 5 | 3 (L3 m6-l1:94; R1 rules:81, 89) | 4: m2-l1:44, 55, 123, 131 | m1-l1:96 „全下（all-in）” (pierwsze objaśnienie); `groups: { "全下": ["all-in"] }` w spots.yaml (6, kod akcji); cytaty w `source` (4) | NISKIE |
| U-5 | 莊位 → 按鈕位 | `grep -o 莊位 content/zh-Hant/lessons/m6-l3-check-raise.md \| wc -l` = 36 (29 linii); poza tym plikiem 0 | 2 (L3: linie 99, 109) | 34 | brak (żadne wystąpienie nie jest częścią innego słowa); m3-l1:55 莊家按鈕 to inne słowo i zostaje | ŚR |
| U-6 | łac. `Button` → 按鈕位 | lekcje 4 (m11-l3:161, m13-l2:40, 89, m3-l1:55); `source` 2 | 3 (L7) | 1 | m3-l1:55 „莊家按鈕（**BTN**，Button）” — objaśnienie nazwy, zostawić; cytaty w `source` | NISKIE — skrypt zbędny |
| U-7 | łac. `outs` → 補牌 | tekst wyświetlany: 18 (m7-l1 13, m7-l2 2, m10-l3 1, m5-l1 1, exams/m6 1); 補牌: 86 + UI 4. (L4 i L6 podają ok. 100 — to liczba razem z kluczami `{{n:outs.…}}`.) | 5 (L4: m7-l1:37, 57, m7-l2:44, 117; E1: exams/m6:76) | 13: m7-l1:48, 65 (2), 66, 95, 103, 128 (2), 137 (3); m10-l3:58; m5-l1:47 | `{{n:outs.…}}`, `{{t:outs…}}`, parametr UI `{{outs}}`, klucz terms-def, tytuł angielski w rules.yaml:92 (`source`); zdjąć spacje („有 outs” → „有補牌”) | ŚR |
| U-8 | 尺度 → 尺寸 (rozmiar zakładu) | surowo 20 (18 w tekście: m4-l1 6, m4-l4 6, m10-l3 3, m10-l4 1, m11-l3 1, m9-l2 1); 尺寸: 140 + UI 4 | 1 (L5 m9-l2:110) | 17 | m11-l3:153 „算法不同、尺度也不同” (skala, nie rozmiar zakładu) — sprawdzić ręcznie; m4-l4:6 to podtytuł lekcji (zmienić świadomie) | NISKIE |
| U-9 | 單元 → 模組 (moduł) | surowo 30 + sklep 3 (lekcje 22: m13-l2 8, m10-l2 5, m10-l4 3, m7-l4 2, m4-l4 1, m5-l4 1, m6-l1 1, m7-l1 1; rules 8, w tym 4 w `source`); 模組: 17 + UI 14 | 19 wystąpień w 17 poprawkach (L6 8, L7 8, U1 3) | 14: lekcje m4-l4:61, m5-l4:38, m6-l1:135, m7-l1:58, m7-l4:48, 68; rules.yaml:839, 870, 871, 879 + 4 w `source` | brak znanych; osobno ręcznie m7-l3:134 (tytuł modułu) | NISKIE |
| U-10 | 暗三(?!條) → 暗三條 (po decyzji T-7) | `grep -rhoP --exclude=terms-nazwy.yaml '暗三(?!條)' content/zh-Hant \| wc -l` = 13 (m7-l2 8; rules.yaml 5, w tym `source` l. 363); 暗三條: 30. (R3 podaje „暗三 43×” — to suma 暗三 i 暗三條.) | 0 | 13 | brak | NISKIE |
| U-11 | 三條 w znaczeniu set → 暗三條 (po T-7) | ręcznie, nie skryptem: m8-l1:50, 51, 70, 81; m9-l2:30, 59, 69; exams/m10.yaml:43 (`{{t:set|三條}}`); łac. „set”: m4-l1:48, m5-l1:49 | 0 (S1 zmienia tylko nazwę w terms-nazwy.yaml:10) | 10 | 三條 = three-of-a-kind (m0, exams/m0, m13-l3 i in.; razem 55 wystąpień `(?<!暗)三條(?!街)`) i 三條街 („trzy ulice”, m9-l3, m9-l4) — nie ruszać | ŚR |
| U-12 | 平跟 / 跛入 / łac. `limp` → 溜入 (po decyzji T-1) | 平跟 20 (lekcje 11: m10-l1 5, m11-l1 5, m10-l2 1; egzaminy 9: m3 7, m11 2); 跛入 7 (exams/m4); łac. limp w tekście 5 (m3-l1:27, 37; exams/m11:11; m4-l4:61; rules:149); 溜入: 48 + UI 1 | 平跟 11 (L6 6, L7 5); 跛入 7 w 6 poprawkach (E1) | 平跟 9: exams/m3.yaml:23 (2), 51 (2), 61 (3), exams/m11.yaml:11 (2); limp: m3-l1:37 „Limp 會交出” | dopiski definicyjne „溜入（limp）” m4-l4:61, „（溜入，limp）” rules:149, „只補齊盲注（limp）” m3-l1:27; opcja „平跟大盲” może zostać opisowa (E1), ale wtedy 平跟 zostaje w przekładzie; 平跟 nie występuje w znaczeniu flat call (sprawdzone: wszystkie 20 to limp) | ŚR |
| U-13 | `fold to 3-bet` / `fold to c-bet` / 面對3-bet棄牌 → 面對 3-bet 棄牌率 / 面對 c-bet 棄牌率 | łac. `fold to` w lekcjach 11 (wszystkie m10-l3, w tym nagłówek tabeli „Fold to 3-bet”); 面對3-bet棄牌 1 (m10-l2:121); forma docelowa 26 (exams/m10 14, m10-l1 7, rules 5) | 0 | 12 | dopisek „（fold to 3-bet）” w rules.yaml:846 i cytaty w `source` (9); w rules raz z 的, raz bez (904/906) | ŚR |
| U-14 | 族群 → 玩家群體 (populacja) | surowo 22 (m10-l3 8, m12-l2 2, m7-l4 1, rules 11 w tym 5 w `source`); 玩家群體: 14 + UI 3 | 0 | 22 | m12-l2:76, 77 „極端族群 / 極端的玩家族群” (grupy z badania, nie „populacja” graczy) — ręcznie | NISKIE |
| U-15 | 翻前 → 翻牌前 | surowo 30, w tekście wyświetlanym 29: m3-l3 1, rules.yaml 28 (14 w polach wyświetlanych, 14 w `source`) | 1 (L1 m3-l3:43) | 28 w rules.yaml (m.in. 315, 350, 352, 358, 383, 392, 400, 409, 425, 746, 830, 939) | brak; R1–R3 czytały te linie i nie zgłosiły 翻前 jako błędu — zamiana tylko, jeśli ma obowiązywać jedna forma | NISKIE |
| U-16 | łac. `check-raise` → 過牌加注 (po T-12) | tekst wyświetlany 5 w lekcjach i egzaminach (m5-l3:39, m5-l4:91, 99, exams/m5:68 ×2) + 1 w rules; 過牌加注: 60 | 0 | 6 | m5-l3:39 i m5-l4:91 to dopiski „（check-raise）” przy pierwszym użyciu — zostawić | NISKIE |
| U-17 | formy znaczników: `{{t:out-of-position\|沒有位置}}` → 無位置 (15: exams/m4 7, m4-l2 4, m5-l4 2, m4-l3 1, m9-l1 1); `{{t:oesd\|兩頭順聽牌}}` → 兩頭順子聽牌 (6: m6-l3 4, exams/m8 1, rules:502); `{{t:polarized\|兩極化}}` → 極化 (3) | policzone jak w tabeli; `grep -rhoF '{{t:polarized\|兩極化}}' content/zh-Hant \| wc -l` = 3 | 兩極化: 2 znaczniki (rules:568, 677) + zwykły tekst rules:673; 不利位置 ×4 i 有利位置 ×2 w m4-l1 — komplet (L2) | 沒有位置 15, 兩頭順聽牌 6, 兩極化 1 (m6-l2:36) + 1 w `source` | 沒有位置: sprawdzić składnię („在沒有位置的情況下” → „在無位置的情況下”); 3 wystąpienia 沒有位置 poza znacznikiem zostawić | NISKIE |
| U-18 | nagłówek `:::note` „Skąd te zasady” → jedna postać (np. 這些規則從哪裡來) | pl: 16 × „Skąd te zasady”; zh-Hant: 8 wariantów — 這些規則從哪裡來 3, 這些原則從哪裡來 3, 這些規則的來源 2, 這些規則從哪來 2, 這些規則從何而來 2, 這些原則從何而來 2, 這些原則的出處 1, 這些原則的來源 1 (`grep -rhoE '^:::note .*' content/zh-Hant/lessons \| sort \| uniq -c`) | 0 | 16 | „Skąd te liczby / progi / definicje” (這些數字…, 這些門檻…, 這些定義…) mają własne nagłówki — ujednolicić osobno (從哪來 / 從何而來) | NISKIE |
| U-19 | m6-l2: `按鈕位持續下注` → `按鈕位持續{{t:bet\|下注}}` (przywrócenie znacznika) | `grep -c '按鈕位持續下注' …/m6-l2-sprawdzenie.md` = 8 linii: 13, 23, 41, 51, 61, 71, 81, 98 | 0 | 6 zgłoszonych przez L3 (41, 51, 61, 71, 81, 98) | linie 13 i 23 („按鈕位持續下注，…”) — porównać z pl, czy tam też jest `{{t:bet}}`; przy 41–81 dodatkowo `{{t:pot\|底池}}` | NISKIE |
| U-20 | 滿`{{t:pot\|底池}}` ↔ 整個`{{t:pot\|底池}}` („cała pula”) | 滿: 13 (m8-l4 9, m7-l3 2, exams m10 1, m2 1); 整個: 60 + UI 1 | 0 | 13 | oba poprawne; zamiana tylko, jeśli ma być jedna forma (整個) | NISKIE |
| U-21 | typografia: spacja między znakiem CJK a cyfrą / `{{n:…}}` / `{{t:spr}}` | pliki bez spacji: lessons/m4-l2, m8-l1, exams/m8 (całe); m9-l2: `LC_ALL=C.UTF-8 grep -cE '\{\{t:spr\}\}[^ \|，。：）]' …/m9-l2-zaangazowanie.md` = 17 linii | 0 | — | poprawki L2 dla m4-l2:31 usuwają spację („`{{n:…}}`權益”), czyli idą za konwencją pliku, nie całości | NISKIE |
| U-22 | pozostałe drobne: 微注級別 ↔ 微級別 (S-5); `{{t:prize-pool\|獎池}}` → 獎金池 w exams/m11.yaml:57 (2×, nie zgłoszone przez żadną część; UI 5 i terms-def:138 są w poprawkach U1/S1); 溜入玩家 (22, m4-l4) ↔ 溜入者 (5: modules, terms-def, rules 3; po poprawkach E1 +5 w exams/m4) | jak podano | — | — | — | NISKIE |

Wzorce zgłoszone przez części, które po poprawkach nie wymagają już skryptu (komplet w JSON): `{{t:session|牌局}}` → 場次 (UI 3/3), `{{t:regular|常客}}` i 常客 → 常規玩家 (5/5: UI 2, rules:472, terms-def:158, m10-l2:6), 岩石玩家 → 岩石型玩家 (2/2), 跛入 (7/7), 解算器 (2/2), 棄牌收益 → 棄牌權益 (4/4), 非同花 → 不同花色 (3/3), sklep 單元/課堂 (5/5), werdykty 一致/相符/不評分/逾時 w m13-l1, m13-l2, exams/m13 (komplet; pozostałe 一致 ×12, 相符 ×1 i 不評分 ×1 to zwykłe słowa „zgodny/nie oceniamy”, nie nazwy werdyktów — nie zamieniać).

## Rozstrzygnięcia terminologiczne do podjęcia

Liczby: surowy grep jak wyżej (treść bez terms-nazwy + UI), chyba że zaznaczono „tekst wyświetlany”. To sprawy merytoryczno-językowe (ADR-24: rozstrzyga agent, właściciel może zawetować); rekomendacje są propozycją scalającego, nie decyzją.

| Nr | Kwestia | Formy i liczba wystąpień | terms-nazwy | Rekomendacja (powód) |
|---|---|---|---|---|
| T-1 | limp | 溜入 48 + UI 1 (m4-l4 29, rules 16, modules 1, terms-def 2); 平跟 20 (lekcje 11, egzaminy 9); 跛入 7 (exams/m4); łac. limp w tekście 5 | `limp: "溜入"` z komentarzem: brak źródła tajwańskiego dla 溜入, przeczytane źródło TW ma „平跟進池 / Limp”, ale 平跟 = też flat call | Zostać przy 溜入 i dokończyć ujednolicenie (U-12): to nazwa z terms-nazwy, 17 poprawek trzech części już do niej prowadzi, a 平跟 jest dwuznaczne z flat call. Pytanie do rodzimego użytkownika zostaje otwarte (N-1); przy zmianie na 平跟 trzeba odrzucić 17 poprawek i zamienić 48 miejsc. |
| T-2 | solver | 求解器 204 + UI 23; łac. solver 49 w tekście wyświetlanym (10 lekcji + exams/m11); 解算器 2 | brak klucza | 求解器 — forma interfejsu i większości treści; U-1. |
| T-3 | equity | 權益 240 + UI 13; łac. equity 34 (33 w poprawkach); 勝率 9 (5 → 權益, 3 → 贏率 w poprawkach) | `equity: "權益"`, `winrate: "贏率"` | 權益 dla equity, 贏率 dla winrate, 勝率 tylko w 攤牌勝率 (rules:873) — po poprawkach stan jest spójny, nic więcej do zrobienia. |
| T-4 | all-in | 全下 256 + UI 5; łac. all-in 8 w tekście wyświetlanym (3 w poprawkach) | `all-in: "全下"` | 全下; angielskie zostaje tylko w objaśnieniu m1-l1:96; U-4 (4 miejsca w m2-l1). |
| T-5 | Button | 按鈕位 335 (36 plików, UI 0); 莊位 36 (tylko m6-l3); `{{t:button\|BTN}}` 3 (m3-l1); łac. Button 4; BTN poza tym w polach `position:` i w `source` | `button: "BTN"` (znacznik bez formy: 0) | Nazwa w terms-nazwy → 按鈕位, 莊位 → 按鈕位 (U-5): czytelnik widzi 按鈕位 w każdej lekcji, a „BTN” prawie wcale. UTG i CO zostają skrótami (poprawki E2, L6, S1 usuwają 槍口位 i 關煞位). |
| T-6 | c-bet | c-bet 154, C-bet 60 (tekst wyświetlany razem 202: lekcje 125, egzaminy 42, rules 29 + 5 w `source`); 持續下注 50 + UI 2 (+3 jako 持續`{{t:bet\|下注}}`) | `c-bet: "持續下注"` (formy w znaczniku: 2) | 持續下注 w tekście, „c-bet” tylko jako dopisek przy definicji (m5-l1:58 po poprawce L2, m5-l3:106): to nazwa z terms-nazwy, tytułu modułu 5 i interfejsu. Zamiana nie jest ślepa (ok. 200 miejsc: „打 C-bet”, opcja `text: "C-bet"` w m7-l4:17, nazwy statystyk) — osobne zadanie; minimum na teraz: C-bet → c-bet w środku zdania (60). |
| T-7 | set | 暗三條 30 (13 plików); 暗三 13 (m7-l2 8, rules 5); 三條 w znaczeniu set 8 (m8-l1 4, m9-l2 3, exams/m10:43); łac. set 2 | `set: "三條"` (to samo co three-of-a-kind); poprawka S1 → `"暗三條"` | 暗三條 — odróżnia seta od tripsów tak jak pl i jest już formą większości; po przyjęciu poprawki S1 wykonać U-10 i U-11. |
| T-8 | tilt | 上頭 57 (m12-l3 44, exams/m12 9, m12-l4 1, modules 1, terms-def 1); 情緒失控 2 w rules (poprawki R4 → 上頭) + 1 w opisie sklepu; łac. tilt w tekście 1 (rules:995, znika) + sklep 1 | `tilt: null` | `tilt: "上頭"` z dopiskiem „（tilt）” przy definicji (poprawka L8) — jedna nazwa w lekcji, regułach, egzaminie i słowniczku; opis sklepu „情緒失控（tilt）” → „上頭（tilt）” (S-8). Naturalność 上頭 na Tajwanie do potwierdzenia (N-2), bo to tytuł lekcji modułu 12. |
| T-9 | outs | 補牌 86 + UI 4; łac. outs 18 w tekście wyświetlanym (5 w poprawkach) | `outs: "補牌"` | 補牌 (U-7). Uwaga L4: w m8-l1:16, 103 補牌 jest użyte jako czasownik „dobrać” — przy ujednolicaniu rozważyć 成牌/聽中 (N-23). |
| T-10 | „do rivera” (włącznie) | 在河牌前 9; 到河牌為止 8 + UI 1; 河牌結束前 0 (wprowadza je poprawka L5) | — | 到河牌為止 — już używane w m2-l1, m9-l3, exams/m2 i UI; poprawkę L5 m9-l2:110 zmienić na tę formę (S-2). Cztery miejsca bez poprawki („想在河牌前做大底池”: rules:570, m7-l2:46, 117, exams/m7:47) ocenić w kontekście — nikt ich pod tym kątem nie czytał. |
| T-11 | nazwy werdyktów raportu | interfejs: 吻合 / 可接受 / 不精確 / 錯誤 / 未評分 / 超時; w treści jako werdykt: 一致 10 (m13-l1 8, exams/m13 2), 相符 1, 不評分 2, 逾時 1 — wszystkie w poprawkach L7 i E2 | brak kluczy | Nazwy z interfejsu; po poprawkach spójne. L7 i E2 poprawiają w tę samą stronę; opis sklepu (U1) dostaje te same cztery nazwy. |
| T-12 | terminy z `null` w terms-nazwy, które w treści mają stałą chińską nazwę | kicker: 踢腳 48, 踢腳牌 12, łac. 1 · check-raise: 過牌加注 60, łac. 6 · ante: 前注 50 · bluff-catcher: 抓詐唬牌 37, łac. 2 (dopiski) · gutshot: 卡順 22 + UI 2, łac. 7 (m2-l1 5) · backdoor: 後門 12 · pot-odds: 底池賠率 8 · fold-equity: 棄牌權益 8 (+4 po poprawkach L7) · stack: 籌碼量 87 + UI 1 (obok 籌碼) · heads-up: 單挑 7 · probe-bet: 探測下注 15 · bubble-factor: 泡沫因子 5 + UI 1 · polarization: 極化 · mental-game: 心態 (tytuł m12) | `null` [DO USTALENIA] | Wpisać chińskie nazwy (propozycja S1) — czytelnik uczy się ich w lekcjach, a słowniczek i ćwiczenie słownictwa pokazałyby tylko angielskie; klucze mają 0 znaczników bez formy (poza jednym `{{t:mental-game}}`), więc tekst się nie zmienia. kicker: 踢腳牌 jako nazwa (wprowadzona w module 0), 踢腳 dopuszczone w złożeniach — do potwierdzenia (N-3). Skutek dla poprawek U1: zob. S-1. |
| T-13 | board | `{{t:board\|公共牌}}` 54, `{{t:board\|牌面}}` 40, `{{t:board}}` 5, 公牌 1, 牌桌上 1, 公共牌面 1; 牌桌 w znaczeniu boardów 2 (exams/m10:63, m10-l3:49 — poprawki → 牌面) | `board: "公共牌"` = `community-cards: "公共牌"` | `board: "牌面"`, `community-cards: "公共牌"` — rozdziela dwa hasła słowniczka, a 牌面 jest już drugą co do częstości formą i nazwą w definicjach (牌面結構); 公共牌 pod kluczem `board` zostaje dopuszczoną formą tam, gdzie mowa o samych kartach. Zmienia wyświetlanie 5 znaczników bez formy (L4 jeden z nich już zamienia na 牌面, m7-l4:66). |
| T-14 | sesja / rozdanie / gra | `{{t:session\|場次}}` 52, `{{t:session\|牌局}}` 3 (UI, w poprawkach); 牌局 poza znacznikiem 39 + UI 7 (rozdanie, gra, stół) | `session: "場次"` | 場次 = sesja (poprawki U1); 牌局 nie używać dla „rozdania” w trzech kluczach UI (`play.autoNote`, `play.report.replay`, `advancement.gameExplain`) — tam 手牌/這手牌; reszta 牌局 („gra przy stole”) zostaje. |
| T-15 | moduł | 單元 30 + sklep 3; 模組 17 + UI 14 | brak klucza | 模組 — nazwa interfejsu; 17 poprawek L6/L7/U1 już w tę stronę, reszta U-9. |
| T-16 | siatka zakresu | 表格 (m3-l3 3, m11-l1 1, m11-l2 1), 格子 (m3-l3 5 i UI 2 w znaczeniu „pole siatki”; m11-l1 2 w znaczeniu „siatka”), 手牌表 3 (m4-l1), 網格 4 (m4-l2), 圖表 (m4-l3 2, m11-l2 1, exams/m4 1) | brak klucza | 表格 dla siatki, 格子 dla pojedynczego pola — tak definiuje to lekcja wprowadzająca m3-l3 („如何閱讀表格”, „每個格子代表一種手牌”) i tak mówi interfejs o polach; zamienić 手牌表, 網格 i 格子-jako-siatkę (9 miejsc). |
| T-17 | nazwa statystyki fold to 3-bet / c-bet | 面對 3-bet／c-bet 棄牌率 26; łac. fold to 11; 面對3-bet棄牌 1 | brak klucza | 面對 3-bet 棄牌率 / 面對 c-bet 棄牌率 (propozycja L6) — zrozumiała bez angielskiego i już w egzaminie m10; U-13. |
| T-18 | populacja | 族群 22; 玩家群體 14 + UI 3 | brak klucza | 玩家群體 — forma interfejsu, modules.yaml i terms-def; U-14. |
| T-19 | rozmiar zakładu | 尺寸 140 + UI 4; 尺度 20 | brak klucza | 尺寸; U-8. |
| T-20 | bad beat | 爆冷 6 (rules 3, m13-l3 2, exams/m12 1); 被逆轉 5 (m12-l3); łac. bad beat 1 (exams/m13:72) + dopisek w rules:1187 | brak klucza | Bez zmiany do odpowiedzi rodzimego użytkownika (N-4): E2 wątpi, czy 爆冷 („niespodziewany wynik”) znaczy bad beat, a 5 z 12 miejsc leży w treści krytycznej (m12-l3, R-M12-006). |
| T-21 | connected / connectors | `{{t:connected\|連張}}` 11, 相連 4, 連接 1 (poprawka L2 → 連張), bez formy 3 | `connected: "連張"` = `connectors: "連張"` | Zostawić 連張 do odpowiedzi rodzimego użytkownika (N-5); zmiana nazwy na 相連 (propozycja S1) unieważnia 11 form i poprawkę L2 m5-l2:88. |
| T-22 | serwis szkoleniowy | 訓練網站 123 (119 w `source` rules); 教學網站 1 w lekcji (m11-l1:152) + UI 2 (etykieta rodzaju źródła `training`, linie 232, 243) | brak klucza | 訓練網站 także w UI — etykieta rodzaju źródła powinna brzmieć jak tekst źródeł; rozbieżność z UI nie była zgłoszona przez żadną część (znaleziona przy liczeniu). |
| T-23 | „N tys. rąk” | 千手 59 (m12-l1 34, exams/m12 13, rules 4 i in.) | — | Nie da się poprawić w przekładzie: potrzebny format liczby w 萬 dla zh-Hant/ja/ko po stronie `numbers.yaml`/content-build; do backlogu, bez wpływu na poprawność liczb. |
| T-24 | drobne formy znaczników | aggressor: 進攻者 5, 主動方 1 (poprawka L2), 進攻方 1 (m6-l2:98), 主動進攻者 1 (m10-l1:106) · shove: 推全下 13, 推 8, 全推 2 (1 w poprawce L7; m11-l1:108 zostaje) · limper: 溜入玩家 22, 溜入者 5 | nazwy: 進攻者, 推全下 | Formy z terms-nazwy; limper: 溜入者 (jest w podtytule modułu 4, terms-def, rules i — po poprawkach E1 — w egzaminie m4; 溜入玩家 siedzi w jednym pliku m4-l4). |

### Sprzeczności między poprawkami

Sprawdzone: wszystkie 231 poprawek parami pod kątem tego samego terminu poprawianego w różne strony oraz zgodności z propozycjami z uwag. `zloz.mjs` nie zgłosił kolizji tekstowych (żadne dwa `stary` nie nachodzą na siebie); poniższe to sprzeczności treści.

**Sprzeczne wprost (do usunięcia przed nałożeniem):**

- **S-1 · gutshot: U1 wbrew treści i propozycji S1.** U1 UI:765 (`"drawGutshot": "卡順聽牌"` → `"gutshot"`) i UI:826 („兩頭順或卡順” → „兩頭順或 gutshot”) zamieniają 卡順 na angielskie, bo `gutshot: null`. Treść ma 卡順 22× (m.in. exams/m2:21, 54, m6:76, m7 ×4; lekcje m6-l2, m6-l3, m7-l1, m7-l3), E1/E2/L4 zostawiają 卡順, a S1 proponuje wpisać chińskie nazwy dla terminów `null` (T-12). Po nałożeniu interfejs mówiłby „gutshot”, lekcje 卡順; U1 sam zauważa, że wyjdzie „你有gutshot。”. → Rekomendacja: wstrzymać obie poprawki U1 i wpisać `gutshot: "卡順"`.
- **S-2 · „do rivera”: L5 ≠ L6 i R3.** L5 lessons/m9-l2-zaangazowanie.md:110 → „在河牌結束前”; L6 lessons/m9-l3-rozmiar-geometryczny.md:129 i m9-l4-plan-trzech-ulic.md:53 oraz R3 rules.yaml:778, 784 → „到河牌為止”. To samo polskie „do rivera” w trzech sąsiednich lekcjach modułu 9 i w ich regułach. → Zmienić `nowy` poprawki L5 na „要到河牌為止把整個籌碼量打進去”.
- **S-3 · „wysokie karty”: E1 ≠ R3.** E1 exams/m5.yaml:22 „高牌較多” → „大牌較多” (powód: 高牌 to nazwa układu high-card). R3 rules.yaml:686 „毫無勝算的大牌” → „…高牌” (powód: 大牌 znaczy „mocna ręka”). L4 lessons/m7-l4-probe-obrona.md:66 wprowadza „高牌`{{t:board|牌面}}`”. Każda z dwóch poprawek uznaje za błędne słowo, które druga wprowadza. Stan: 高牌 81 + UI 2, 大牌 17 + UI 3. → Rekomendacja: odrzucić poprawkę E1 m5:22 (高牌 jest formą dominującą dla „wysokich kart” i „wysokiego boardu”, a zastrzeżenie R3 do 大牌 jest konkretne); pytanie N-22.
- **S-4 · limp w module 11: L7 ≠ E2 (oraz E1).** L7 zmienia lekcję m11-l1-push-fold.md:17 (3×) i :123 (2×) z 平跟 na 溜入. E2 celowo nie poprawia exams/m11.yaml:11 („平跟（limp），便宜看翻牌 … 平跟無法…”), „żeby egzamin m11 nie rozjechał się z lekcją m11-l1”; E1 tak samo zostawia exams/m3.yaml:23, 51, 61 (7×). Po nałożeniu lekcje mają 0 × 平跟, egzaminy 9 ×. → Dopisać poprawki dla exams/m11.yaml:11 i exams/m3.yaml:23, 51, 61 (albo, przy decyzji T-1 = 平跟, odrzucić 17 poprawek E1/L6/L7).
- **S-5 · mikrostawki: L4 ≠ propozycja L6.** L4 lessons/m7-l4-probe-obrona.md:145 „微注玩家” → „微級別玩家” (powód: stakes = 級別, tytuł modułu 10 „剝削微級別牌局”). L6 w uwagach każe ujednolicić odwrotnie: 微級別 → 微注級別 (bez poprawek w JSON). Stan: 微級別 11 (modules.yaml:11, terms-def:118, rules:929, 947, exams/m6:34, m10-l2:29, m10-l4 ×5), 微注級別 8 (m10-l3 3, m12-l1 3, m4-l4 1, m8-l2 1). → Rekomendacja: 微級別 (tytuł modułu, definicja, reguły), czyli poprawka L4 zostaje, a wzorzec L6 odwrócić (微注級別 → 微級別, 8 miejsc); naturalność do potwierdzenia (N-6).

**Niespójne skutki (poprawki nie są odwrotne, ale razem dają dwie formy):**

- **S-6 · set.** S1 terms-nazwy.yaml:10 `set: "三條"` → `"暗三條"`; żadna część nie poprawia tekstu: exams/m10.yaml:43 `{{t:set|三條}}` (obok `{{t:set}}` w l. 47, który zacznie się wyświetlać jako 暗三條), lessons/m8-l1-value.md:50, 51, 70, 81 i m9-l2-zaangazowanie.md:30, 59, 69 (三條 w znaczeniu set), 暗三 ×13 (m7-l2, rules). Kierunek zgodny (L6, R2, R3, E2 popierają 暗三條), brakuje poprawek tekstu — U-10, U-11.
- **S-7 · „na każdej ulicy”: trzy poprawki, trzy zapisy.** E1 exams/m5.yaml:59 → `每一{{t:street|條街}}`; L4 lessons/m7-l4-probe-obrona.md:28 → `每一條{{t:street|街}}`; L7 lessons/m13-l3-przeglad.md:80 → `每一{{t:street|街}}`. Dwie wyświetlą „每一條街”, trzecia „每一街”. W treści: `每條{{t:street|街}}` 23, `每一{{t:street|街}}` 5, `每一{{t:street|條街}}` 2, `每一條{{t:street|街}}` 2. → Ujednolicić trzy `nowy` do `每一條{{t:street|街}}`.
- **S-8 · tilt w opisie sklepu.** R4 rules.yaml:995, 997 usuwa „情緒失控（tilt）” na rzecz 上頭; L8 lessons/m12-l3-tilt.md:100 dopisuje „上頭（tilt）”, uzasadniając to m.in. tym, że rules.yaml pisze „情緒失控（tilt）” (po R4 już nie); S1 modules.yaml:13 → „變異數與上頭”. Opis sklepu (sklep:36: „變異數與情緒失控（tilt）”) nie ma poprawki U1 i zostaje jedynym miejscem z 情緒失控.
- **S-9 · board.** E1 exams/m5.yaml:14 `{{t:board|公牌}}` → `公共牌`; L4 m7-l4:66 `{{t:board}}` → `{{t:board|牌面}}`; E2 exams/m10.yaml:63 i L6 m10-l3:49 牌桌 → 牌面; S1 proponuje `board: "牌面"`. Dziś obie formy są dopuszczone, więc to nie błąd; przy przyjęciu T-13 poprawkę E1 lepiej skierować na 牌面.
- **S-10 · connected.** L2 lessons/m5-l2-przewagi.md:88 `{{t:connected|連接}}` → `連張` (nazwa z terms-nazwy); S1 proponuje zmienić tę nazwę na 相連. Sprzeczne tylko, jeśli propozycja S1 zostanie przyjęta (T-21).
- **S-11 · „akcja”.** L7 lessons/m13-l2-powtorki.md:35 動作 → 行動 („jak w interfejsie”) i m13-l1:36 „採取的行動就算吻合”; E2 exams/m13.yaml:26 zostawia w `nowy` „採用的動作才算吻合” (to samo polskie zdanie o werdykcie). Stan: 行動 111, 動作 30.
- **S-12 · limper.** E1 wprowadza 溜入者 w exams/m4.yaml:101, 109 (2×), 110; R1 (rules.yaml:305 zostawia 溜入者) wskazuje w uwagach częstszą formę 溜入玩家 (22×, m4-l4). Zob. T-24.
- **S-13 · „gra o żetony”.** R4 rules.yaml:1112, 1119 ujednolica do „以`{{t:chips|籌碼}}`計價的遊戲” z lekcji m11-l3; L7 to samo sformułowanie w m11-l3 (54, 59, 62, 68, 153, 159, 164) zgłasza jako wątpliwe co do naturalności (N-54). Poprawka R4 rozszerza formę, która czeka na ocenę.
- **S-14 · nazwa „powtórki z gry”.** R4 rules.yaml:1164 „遊戲重播” → „對局複習” (za tytułem lekcji m13-l2 „對局複習與針對性訓練”); L7 w tej samej lekcji zmienia nazwy trybów na interfejsowe 實戰 / 自由對戰. Interfejs ma dla powtórek 複習 („{{count}} 個實戰情境等待複習”), a 對局 w nim nie występuje. Do sprawdzenia, czy tytuł m13-l2 i reguła nie powinny brzmieć „實戰複習”.

Poprawki zmieniające zestaw znaczników (11 ostrzeżeń `zloz.mjs`, do obejrzenia przy nakładaniu; wszystkie zamierzone wg pola `powod`): dodany znacznik — E2 exams/m11:50 (`short-stack`), L6 m10-l2:80 (`bluff`), E1 exams/m5:100 (`pot`), L1 m1-l1:16 (`bet`), L3 m5-l3:130 (`pair`), L3 m6-l2:35 (`pot`), R3 rules:794 (`bet`), R3 rules:801 (`street`); usunięty — E1 exams/m4:92 (`value`), L8 m12-l2:86 (`session`), L5 m9-l1:107 (jeden z dwóch `bet`).

## Do sprawdzenia przez rodzimego użytkownika

Scalone z 16 części; duplikaty połączone (w nawiasie części, które pytały).

Terminy (wpływają na rozstrzygnięcia wyżej):

- N-1 · lessons/m4-l4 (cały), terms-nazwy.yaml:72 — 溜入 / 溜入玩家 dla limp/limper: zgodne z terms-nazwy, ale bez źródła tajwańskiego (strony TW mają 平跟). (L2)
- N-2 · lessons/m12-l3-tilt.md (tytuł i cała lekcja) — czy 上頭 brzmi naturalnie na Tajwanie jako „tilt” (rodowód slangu z Chin kontynentalnych; gracze TW często mówią „tilt”). (L8)
- N-3 · kicker: 踢腳 czy 踢腳牌 / 邊牌 / „kicker” — m4-l3:27, m5-l1:44, m5-l2:17, 86, m5-l4, m6-l1, m6-l3, m8-l4:57, m9-l1:80, m9-l2:46, 65, rules.yaml:30–31, 801, UI:672 (`drill.whoWins.reason.kicker` „邊牌（踢腳）”). (L2, L3, L5, R1, R3, U1)
- N-4 · bad beat: 爆冷 (rules.yaml:995, 1187–1188, m13-l3:76, 87, exams/m12:55) czy 被逆轉 (m12-l3) czy „bad beat”; cooler = 冤家牌 uznane za poprawne. (L7, E2, R4)
- N-5 · terms-nazwy.yaml:69, 81 — connected: 連張 czy 相連 / 連張牌面. (S1)
- N-6 · mikrostawki: 微級別 (m3-l3:77, exams/m6:34) czy 微額級別 / 小額桌 / 小級別 / 微注級別. (L1, E1, L6)
- N-7 · 按鈕位 w tekście przy `button: "BTN"` — potwierdzić jako świadomy wybór (m3-l1:15 i dalej, m8-l4, m9-l1, rules.yaml:1127, 1135). (L1, L2, L5, R4)
- N-8 · terms-nazwy.yaml:126 — shove = 推全下 czy 全推 / 推. (S1)
- N-9 · terms-nazwy.yaml:156 — nit = 岩石型玩家 (岩石 to raczej „rock”) czy 緊弱玩家 / „nit”. (S1)
- N-10 · terms-nazwy.yaml:117 — winrate = 贏率 (wobec 勝率). (S1)
- N-11 · terms-nazwy.yaml:50 — outs = 補牌 czy „outs” / 出路. (S1)
- N-12 · terms-nazwy.yaml:119, 128, 97 — session = 場次, bubble = 泡沫 (wobec 泡沫期), condensed = 壓縮. (S1)
- N-13 · rules.yaml:1071–1072 — fold equity = 棄牌權益. (R4)
- N-14 · rules.yaml:673, 717, 725, 734 — bluff-catcher = 抓詐唬牌; rules.yaml:273–274, 290 — dominacja = 壓制 / 被壓制. (R3, R1)
- N-15 · 複盤 (modules.yaml:14 „手牌複盤”, exams/m12:36, exams/m13): pisownia i odbiór na Tajwanie (複盤 / 覆盤 / 復盤; alternatywa 手牌檢討). (S1, E2)
- N-16 · exams/m11.yaml:57, 59, 64, 68 — 泡沫因子 (bubble factor) i „push/fold” po angielsku w m11:9; UI:713 „泡沫因子（bubble factor）”. (E2, U1)
- N-17 · rules.yaml:521, 594, 598 — „dopłata” = 補注額 (11×) czy 跟注額 / 需跟注的金額. (R2)
- N-18 · UI:360 (`play.tableSizeHint9`) — „wczesne pozycje” = 前段位置 przy `early-position` = 前位. (U1)
- N-19 · UI `session.sizeError`, `play.report.detail.size` — „rozmiar” = 尺寸 czy 下注尺度 / 大小. (U1)
- N-20 · UI `play.report.replay` — 回放 czy 重播. (U1)
- N-21 · lessons/m10-l1:83, 85, 86, 129, 130 — „sala” = 平台 czy 撲克平台 / 撲克室. (L6)
- N-22 · „wysoka karta / wysokie karty”: 高牌 (m7-l1:26, 122–123; exams/m6:57, 58, 78 „A 高牌”) czy 大牌 — 高牌 to też nazwa układu high-card (S-3). (L4, E1)
- N-23 · lessons/m8-l1:16, 103 — 補牌 / 補到任何牌 jako czasownik „dobrać”, gdy 補牌 to nazwa outs; alternatywa 聽中牌 / 成牌. (L4)
- N-24 · „stack”: 籌碼 przy `stack: null` (rules.yaml 643–952); „grać o cały stack” = 打光整個籌碼 / 打整個籌碼量 (m9-l1, m9-l2) czy 打到全下 / 打光全部籌碼; m7-l1:87 付掉整個籌碼 czy 整疊籌碼 / 全部籌碼. (R3, L5, L4)

Treść krytyczna i odpowiedzialna gra:

- N-25 · UI:316 (`help.link`) — pl „gdy granie wymyka się spod kontroli” → 「當賭博失去控制時」 (za en „gambling”), a `help.intro` (UI:317) to samo „granie” oddaje jako 遊戲行為 (kojarzy się z grami wideo). Ujednolicić (np. 玩牌), czy zostawić 賭博? (U1)
- N-26 · lessons/m12-l1:140 „如果打牌開始失控” wobec UI `help.intro` „如果你的遊戲行為開始失控” — to samo zdanie pl w dwóch brzmieniach; ujednolicać? (L8)
- N-27 · 負責任遊戲 (tytuł ramki m12-l4:143; odesłania m12-l3:133, m12-l4:102) wobec 負責任博彩 / 理性遊戲; w sklepie 理性遊戲 za „ODPOWIEDZIALNIE” (wobec 負責任博弈 / 理性娛樂). (L8, U1)
- N-28 · lessons/m12-l4:22, 117 — „szansa, że kiedykolwiek stracisz cały bankroll” → 終究輸光全部資金的機率: czy 終究 nie niesie nieuchronności (alternatywa 遲早會輸光 / 有朝一日輸光). (L8)
- N-29 · rules.yaml:1028 (R-M12-011) — „pełny bankroll w wpisowych wyższej stawki” → 較高級別的完整買入資金; jaśniej 以較高級別買入計算的完整資金? (R4)
- N-30 · exams/m12.yaml:52 — 「依照上頭課程中的分類」: 上頭 znaczy też „powyżej”; propozycja 「依照「上頭」這一課中的分類」. (E2)
- N-31 · „N 千手牌” (m12-l1, m12-l2, m12-l4, exams/m12: 7, 10, 16, 18–20, 27–28, 34, 37–38; m13-l1:105 „2.5 千手牌”): akceptowalne czy rażące wobec zapisu w 萬 (T-23). (L8, E2, L7, R4)
- N-32 · lessons/m12-l3:97 — „wynik z ostatniego tygodnia” → 上週的輸贏結果 („z zeszłego tygodnia”) czy 最近一週. (L8)
- N-33 · lessons/m12-l2:65 更積極 wobec m12-l1:92 越激進; m10-l2:23 很兇 / 多兇 wobec 激進 (m10-l1:25) — ujednolicić na 激進? (L8, L6)

Naturalność zdań (lekcje):

- N-34 · m2-l2-pot-odds.md:73, 79 — 你需要贏多少 / 你實際贏多少 (chodzi o częstość): lepiej 你需要多常贏? (L1)
- N-35 · m1-l1-przebieg.md:72 — 大盲注 jako gracz (czy 大盲位 / 大盲玩家); :15 — 免費讓這輪過去 za „dać przejść za darmo”. (L1)
- N-36 · m4-l1-3bet.md:16, 26, 75 — 加注到開池的約 3x czy 約為開池的 3x; :37 — „Sprawdzam szeroko” → 大量跟注 czy 用寬範圍跟注. (L2)
- N-37 · m5-l1-tekstury.md:62, 108 — 中翻牌 (wysokość) i 中等翻牌 (mokrość) różnią się jednym znakiem; zgodne z etykietami UI. (L2)
- N-38 · m6-l1-mdf-alpha.md:70 — 這兩個數字要怎麼兼顧？ za „Jak pogodzić te dwie liczby?”; :79 — szyk 按鈕位以 1/3 底池下注 c-bet. (L3)
- N-39 · m5-l4-bez-pozycji.md:16, 56 — 非常常過牌 (zbitka 非常常). (L3)
- N-40 · m6-l2-sprawdzenie.md:132 i rules.yaml:494 — „na suchych flopach z królem” → K 為最大牌的 / K 高的乾燥翻牌 (doprecyzowanie względem pl). (L3, R2)
- N-41 · m7-l3:94, 138 — „draw do najlepszej ręki” → 聽的是最大的牌 (czy nie „najwyższej karty”; alternatywa 最強的牌 / 堅果牌). (L4)
- N-42 · m7-l4:106 下注開第二槍 (w m7-l1: 下注打第二槍); :129 想從按鈕位的高牌拿到付錢 (propozycja 想讓按鈕位的高牌付錢). (L4)
- N-43 · m8-l1:127 — nagłówek „Thin value: mało, ale za cenę” → 薄價值：賺得少，但有人付. (L4)
- N-44 · m7-l2:114, 127 (tabele) — 兩頭順子 jako skrót bez 聽牌. (L4)
- N-45 · terms-def.yaml:17 — czy 加碼 jest na Tajwanie przyjętym synonimem 加注 (raise). (S1)
- N-46 · m8-l3:114 — „Blokery przechylają wybór…” → 做出取捨 czy 左右…的選擇. (L5)
- N-47 · m9-l2:6 (sub) — 當你要把整個籌碼量打進去 czy pytanie 何時打光整個籌碼. (L5)
- N-48 · m8-l4:80 — 帶黑桃的 Q、帶黑桃的 J: czytelne bez 沒中的黑桃聽牌? (L5)
- N-49 · m9-l4:17 — 把大部分價值留在`{{t:board|牌桌上}}`: podpowiedź terminu „board” przy idiomie „zostawić na stole” (zob. P-10). (L6)
- N-50 · m9-l4:16–18, 103–105 — 三條街 / 一條街 / 零條 i w tabeli 三條 / 兩條 obok 暗三條: czy samo 三條 (= trzy ulice) nie czyta się jak „trójka”. (L6)
- N-51 · m10-l2:80 — 最大的`{{t:pair}}` za „najwyższa para” czy 頂對. (L6)
- N-52 · m10-l4:74, 121 — zdanie o min-raise wierne, ale ciężkie. (L6)
- N-53 · m11-l3:47 — 一倍半 czy 將近 1.5 倍. (L7)
- N-54 · m11-l3:54, 59, 62, 68, 153, 159, 164 — 以籌碼計價的遊戲 za „gra o żetony” (alternatywa 只算籌碼的打法/局); zob. S-13. (L7)
- N-55 · m13-l3:13 — 現場打牌時 za „W trakcie gry na żywo” (czy 實戰打牌時). (L7)
- N-56 · m11-l1:65 — forma `{{t:short-stack|短}}` („在籌碼非常短時”). (L7)

Naturalność zdań (egzaminy, reguły, interfejs, sklep):

- N-57 · exams/m5.yaml:50–52 — 超過 … 的情況 wobec naturalniejszego 棄牌頻率高於 … w m6:17–19. (E1)
- N-58 · exams/m4.yaml:42 — 你補 … 進入跟注後共有 … 的底池 (ciężkie składniowo). (E1)
- N-59 · exams/m1.yaml:55 雙方亮牌（攤牌）, m3:23 要嘛…要嘛… — rejestr potoczny, wygląda poprawnie. (E1)
- N-60 · exams/m9.yaml:19 — 頂對加好踢腳 czy 帶好踢腳的頂對. (E2)
- N-61 · rules.yaml:130, 139, 165, 191 — „…，輪到你在 UTG／按鈕位／小盲”; :176 — 在小盲你打牌時無位置. (R1)
- N-62 · rules.yaml:37 — `{{t:board|公共牌面}}` (forma łączona); :694 — `{{t:board|牌面}}`. (R1, R3)
- N-63 · rules.yaml:548, 606, 614 (`source`) — 有訓練網站的教練 czy 經營訓練網站的教練; :402 — 划算 czy 劃算. (R2)
- N-64 · rules.yaml:846 — elipsa bez powtórzonego 穩定; :904/906 — 面對 c-bet 棄牌率 raz z 的, raz bez. (R3)
- N-65 · rules.yaml:1048 — „fold po przebiciu” → 再面對加注棄牌 czy 面對再加注後棄牌; :1147, 1188 — „rozdanie” → 牌局 (dwuznaczne z sesją). (R4)
- N-66 · rules.yaml:384, 401, 410, 904–906 — „c-bet” po łacinie w regułach (T-6). (R2, R3)
- N-67 · UI:765 po poprawce U1 — 「你有gutshot。」 czy wartość 「gutshot 聽牌」 (zob. S-1). (U1)
- N-68 · sklep — nagłówek „DOSTĘP” → 使用方式 („sposób użycia”) czy 免費與完整存取. (U1)
- N-69 · terms-def.yaml:130 (m-ratio) — pominięte angielskie „(orbit)” („撐幾整圈”); dodać? (S1)

## Pytania do źródła pl

- P-1 · lessons/m5-l1-tekstury.md:108 — „za mokre 9-8-7, Q-J-T i T-9-5-4”: ostatni przykład ma cztery karty, a zdanie mówi o flopach (tak samo w en). Zamierzone czy pomyłka? (L2)
- P-2 · lessons/m4-l2-obrona-bb.md:92 — „3-bet i call są ze sobą powiązane”: en ma „combined”, przekład idzie za en (合併在一起); polskie „powiązane” jest mniej jasne. (L2)
- P-3 · lessons/m6-l2:65, m6-l3:26, 93, 123 — pl wylicza drawy jako „(`{{t:flush}}`, `{{t:oesd}}`)”, czyli „kolor” zamiast „draw do koloru”; czy nie powinien stać znacznik `flush-draw`? (L3)
- P-4 · lessons/m5-l3:26 wobec m5-l4:85 — to samo uzasadnienie w dwóch brzmieniach („Większy bet spasuje mniej więcej te same ręce” / „…nie spasuje więcej rąk”). (L3)
- P-5 · lessons/m7-l1:76 — „Taki bet zarabia na lepszych rękach.” — dwuznaczne (en i zh czytają: „zarabiają na nim lepsze ręce”). (L4)
- P-6 · lessons/m7-l4:57 — „Gdy znów czeka, dostaje darmową kartę”: podmiot domyślny, „znów czeka” wymaga najpierw twojego checka. (L4)
- P-7 · lessons/m8-l4:80 — „dama z pikami, walet z pikami” jest skrótowe (nietrafione drawy do koloru z damą/waletem). (L5)
- P-8 · lessons/m12-l2:86 — „Analiza samych przegranych pomija połowę błędów”: przegranych sesji czy rozdań? (przekład przyjął „sesji”). (L8)
- P-9 · exams/m10.yaml:63 i lessons/m10-l3:49 — „Fold to c-bet łączy wszystkie rozmiary i stoły”: „stoły” w znaczeniu boardów jest dwuznaczne (bez znacznika `board`; w m10-l3:109 „rozmiary i flopy”; en ma „tables”). E2 i L6 poprawiły 牌桌 → 牌面; **jeśli pl miało na myśli stoły do gry, obie poprawki (E2 exams/m10:63, L6 m10-l3:49) trzeba odrzucić.** (E2, L6)
- P-10 · lessons/m9-l4:17 — „zostawia na `{{t:board|stole}}` większość wartości”: znacznik terminu `board` przy idiomie „na stole” (= niewykorzystane); czy znacznik nie powinien zniknąć ze źródła? (L6)
- P-11 · lessons/m10-l2:116, 124 — „wynik” dla bb/100 bez znacznika `{{t:winrate}}`, a m10-l4 używa „winrate”. (L6)
- P-12 · rules.yaml:545 — „(`{{t:flush-draw}}`, `{{t:straight|strita}}`, gutshot z wysoką kartą)”: brakuje „draw do” przed „strita” (przekład ma poprawnie 順子聽牌). (R2)
- P-13 · rules.yaml:578 — „daje `{{t:draw|drawie}}` dobrą cenę”: forma „drawie” wygląda na literówkę (celownik: „drawowi”). (R2)
- P-14 · rules.yaml:662 — „przy ryzyku check-raise'u z pozycji”: niejasne, do kogo odnosi się „z pozycji” (en: „with position”). (R3)
- P-15 · rules.yaml:784 — „równymi zakładami”: z `then` wynika równy ułamek puli, nie równe kwoty (przekład: 相同比例的下注). (R3)
- P-16 · rules.yaml:1031 (`source` R-M12-011) — „przy 3bb/100 zejście przy 30 wpisowych, czyli przy pełnym bankrollu”: przy {{n:br.bi.base}} wpisowych zdanie brzmi dziwnie; pole `source`, nie treść nauczana. (R4)

Bez pytań: L1, L7, E1, R1, S1, U1.

## Treść krytyczna (moduł 12, helplines, sklep, interfejs)

Wynik łączny: 0 znalezisk KRYT i 0 WYS. Żadna liczba, próg, warunek, numer, adres ani nazwa organizacji nie różni się od pl; w żadnej części nie stwierdzono pominięcia, złagodzenia ani wzmocnienia.

| Zakres | Kto | Co porównano zdanie po zdaniu | Wynik |
|---|---|---|---|
| lessons/m12-l1…l4 (539 linii) | L8 | Każde zdanie 4 lekcji; liczby przez `{{n:…}}` klucz po kluczu i co do liczby wystąpień w linii; liczby wpisane wprost; warunki graniczne m12-l4 („najpóźniej … do połowy”, „najwcześniej wtedy, gdy”, „nigdy mniej niż”, „nigdy nie spada do zera”); `correct: true`; ramka „Odpowiedzialna gra” (m12-l4:143–149: pięć grup sygnałów w tej samej kolejności, `{{helplines}}` nienaruszony); ćwiczenie m12.l4.q-warning-sign; odesłania do ekranu „Pomoc” (協助, jak w UI) | Zgodne. Jedna nieścisłość: m12-l3:133 „odgrywasz się” oddane jako chęć (想把輸的追回來) zamiast zachowania → poprawka ŚR (追輸). Numerów i nazw organizacji w lekcjach nie ma. |
| exams/m12.yaml (10 pytań, 33 opcje) | E2 | Każde pytanie, opcja i uzasadnienie; `{{n:…}}` i wzory; progi q8, q9 („próg zejścia to połowa…”, „najpóźniej przy”), q7, q10; zdanie ochronne q9 z odesłaniem do ekranu 協助; `correct: true` | Zgodne. Dodane „只” („to tylko ogólna wskazówka”) nie zmienia sensu. Poprawki tylko terminologiczne (equity → 權益, l. 45, 46). |
| rules.yaml R-M12-001…009, 011, 012 (R-M12-010 nie istnieje ani w pl, ani w przekładzie) | R4 | Pola `if`, `then`, `because`, `source` każdej reguły; liczby w `source` (1.96, 80, 2, 61.5 萬 = 615 tys., lata, 3bb/100, 30); warunki („最晚在那時”, „最早要等…才回去”, „絕不少於”, „立刻”, „一半”); trzy wzory | Zgodne. Poprawki tylko terminologiczne w R-M12-006 (l. 995, 997). |
| helplines.yaml | S1 | Wszystkie pola wobec `content/helplines.yaml`: różnią się tylko 4 pola tekstowe (`pointer`, `fallback.text` — 2 zdania, `regions_label`, `entries[0].info`); `name` „Gambling Therapy (Gordon Moody)”, adres `https://www.gamblingtherapy.org/`, daty, `sources` identyczne znak w znak; numerów telefonów w źródle nie ma (`regions: {}`) | Zgodne, bez poprawek. Dodane „也” w `pointer` nie zmienia sensu. |
| modules.yaml (m12) | S1 | Tytuł i podtytuł modułu 12 | Podtytuł 波動與上頭 → 變異數與上頭 (ŚR, nazwa terminu variance). |
| interfejs (UI) | U1 | `welcome.noMoney`, `play.format`, `help.intro`, `help.link`, `help.call`, `help.callA11y`, `help.openA11y`, `help.openFailed` (parametry `{{phone}}`, `{{name}}`, `{{label}}`, `{{host}}`, `{{target}}` nienaruszone) | Zgodne co do liczb, warunków i kierunku. Odstępstwo od pl bez poprawki: `help.link` „granie” → 賭博 (za en) — pytanie N-25. `welcome.noMoney` dodaje „prawdziwe” pieniądze (bez zmiany sensu). |
| sklep (`lokalizacje.zh-Hant`, 5 pól) | U1 | subtitle (不涉真錢), promotionalText („Bez gry na pieniądze, bez konta, bez reklam”), zdanie „To nauka, nie hazard…” (trzy elementy obecne; brak tylko „w aplikacji” — znalezisko NISKIE bez poprawki), zdanie o ekranie „Pomoc”, sekcja dostępu (jedna darmowa aktywność dziennie, odnawianie, dostęp dożywotni; liczby 8 i 15); limity znaków: name 16/30, subtitle 16/30, keywords 43/100 | 0 KRYT. Poprawki tylko nazw funkcji (nie zdań o hazardzie). IAP: brak zh-Hant w `store/iap-localizations.json`. |
| lessons/m10-l1:83–87, 129–130 (regulamin sal, zakaz HUD — poza modułem 12) | L6 | „grozi zamknięciem konta”, „może zamknąć konto i zatrzymać środki” | Zgodne, bez złagodzenia. |

Poza zakresem tych porównań: `R-M12-004` jest tylko przywołana identyfikatorem w m13-l1 (L7, bez zmian).

Poprawki z `poprawki-zh-Hant.json` dotyczące treści krytycznej, interfejsu i sklepu (33: ŚR 22, NISKIE 11; KRYT 0, WYS 0). Żadna nie zmienia liczby, progu, warunku ani zdania o hazardzie/pieniądzach; z całego interfejsu żadna poprawka nie dotyczy kluczy `help.*`, `welcome.noMoney` ani `play.format`.

| Obszar | plik:linia | Waga | Było → ma być | Część |
|---|---|---|---|---|
| interfejs | UI:zh-Hant.json:342 | ŚR | {{t:session\|牌局}}結束後評分 → {{t:session\|場次}}結束後評分 | U1 |
| interfejs | UI:zh-Hant.json:397 | ŚR | 要結束{{t:session\|牌局}}嗎 → 要結束{{t:session\|場次}}嗎 | U1 |
| interfejs | UI:zh-Hant.json:437 | ŚR | "title": "{{t:session\|牌局}}報告" → "title": "{{t:session\|場次}}報告" | U1 |
| interfejs | UI:zh-Hant.json:705 | NISKIE | （{{t:prize-pool\|獎池}}的 {{payouts}}） → （{{t:prize-pool\|獎金池}}的 {{payouts}}） | U1 |
| interfejs | UI:zh-Hant.json:713 | NISKIE | 你在{{t:prize-pool\|獎池}}中的權益 → 你在{{t:prize-pool\|獎金池}}中的權益 | U1 |
| interfejs | UI:zh-Hant.json:714 | NISKIE | （占{{t:prize-pool\|獎池}}的比例） → （占{{t:prize-pool\|獎金池}}的比例） | U1 |
| interfejs | UI:zh-Hant.json:718 | NISKIE | 合計為{{t:prize-pool\|獎池}}的 {{icm}}，高於 → 合計為{{t:prize-pool\|獎金池}}的 {{icm}}，高於 | U1 |
| interfejs | UI:zh-Hant.json:719 | NISKIE | 合計為{{t:prize-pool\|獎池}}的 {{icm}}，低於 → 合計為{{t:prize-pool\|獎金池}}的 {{icm}}，低於 | U1 |
| interfejs | UI:zh-Hant.json:724 | ŚR | "regular": "{{t:regular\|常客}}" → "regular": "{{t:regular\|常規玩家}}" | U1 |
| interfejs | UI:zh-Hant.json:739 | ŚR | {{t:regular\|常客}}玩約 → {{t:regular\|常規玩家}}玩約 | U1 |
| interfejs | UI:zh-Hant.json:765 | ŚR | "drawGutshot": "卡順聽牌" → "drawGutshot": "gutshot" | U1 |
| interfejs | UI:zh-Hant.json:826 | ŚR | （兩頭順或卡順） → （兩頭順或 gutshot） | U1 |
| interfejs | UI:zh-Hant.json:827 | NISKIE | 所以沒有人連{{t:straight-draw\|順子聽牌}}都有 → 所以任何人連{{t:straight-draw\|順子聽牌}}都沒有 | U1 |
| moduł 12 | exams/m12.yaml:45 | ŚR | 的 equity，而{{t:flush-draw\|同花聽牌}} → 的權益，而{{t:flush-draw\|同花聽牌}} | E2 |
| moduł 12 | exams/m12.yaml:46 | ŚR | 的 equity 對上所需的 → 的權益對上所需的 | E2 |
| moduł 12 | lessons/m12-l2-decyzja-wynik.md:22 | NISKIE | 即使做了最好的決策，你仍會 → 即使做了所能做出的最好決策，你仍會 | L8 |
| moduł 12 | lessons/m12-l2-decyzja-wynik.md:86 | NISKIE | 只檢討輸的{{t:session\|場次}}，會漏掉一半的錯誤 → 只檢討輸的場次，會漏掉一半的錯誤 | L8 |
| moduł 12 | lessons/m12-l2-decyzja-wynik.md:97 | NISKIE | 全下，是最好的決策，但仍有約 → 全下，是所能做出的最好決策，但仍有約 | L8 |
| moduł 12 | lessons/m12-l3-tilt.md:100 | ŚR | 上頭是在負面情緒影響下失去控制 → 上頭（tilt）是在負面情緒影響下失去控制 | L8 |
| moduł 12 | lessons/m12-l3-tilt.md:133 | ŚR | 想把輸的追回來，或用輸不起的錢在打牌 → 追輸，或用輸不起的錢在打牌 | L8 |
| moduł 12 | lessons/m12-l4-bankroll.md:51 | ŚR | 這是出於絕望的上頭。 → 這是絕望型上頭。 | L8 |
| moduł 12 | lessons/m12-l4-bankroll.md:123 | NISKIE | 贏率和 SD 以 bb/100 輸入，資金以 bb 輸入。 → 贏率和 SD 以 bb/100 表示，資金以 bb 表示。 | L8 |
| moduł 12 | modules.yaml:13 | ŚR | 波動與上頭 → 變異數與上頭 | S1 |
| R-M12 | rules.yaml:995 | ŚR | 你注意到自己檔案中情緒失控（tilt）的第一個徵兆 → 你注意到自己上頭側寫中的最初訊號 | R4 |
| R-M12 | rules.yaml:997 | ŚR | 情緒失控一旦加劇 → 上頭一旦加劇 | R4 |
| sklep | store/app-store-metadata.json:36 | ŚR | • 決策分四個等級評分 → • 決策分四個等級評分：吻合、可接受、不精確、錯誤 | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | 依序學習的單元： → 依序學習的模組： | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | • 單元考試（15 題） → • 模組測驗（15 題） | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | 每個單元考試的第一次作答 → 每個模組測驗的第一次作答 | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | • 附練習的課堂 → • 附練習的課程 | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | 課堂、程度測驗和 → 課程、程度測驗和 | U1 |
| sklep | store/app-store-metadata.json:36 | ŚR | 進階指數 → 程度指標 | U1 |
| sklep | store/app-store-metadata.json:36 | NISKIE | 完整存取可取消此限制 → 完整存取權可取消此限制 | U1 |

Uwagi do tej listy przed nałożeniem:

- UI:765 i UI:826 (gutshot) — sprzeczność S-1; rekomendacja: wstrzymać.
- lessons/m12-l3-tilt.md:100 i rules.yaml:995, 997 — zależą od T-8; razem z nimi zmienić opis sklepu (S-8), inaczej 情緒失控 zostaje tylko tam.
- lessons/m12-l3-tilt.md:133 (想把輸的追回來 → 追輸) — jedyna poprawka dotykająca zdania ochronnego (odesłanie do ramki „Odpowiedzialna gra”); zmienia „chcesz się odegrać” na „odgrywasz się” zgodnie z pl i z m12-l4:102–103.
- Do sprawdzenia przez rodzimego użytkownika w treści krytycznej: N-2, N-4, N-25…N-32.
