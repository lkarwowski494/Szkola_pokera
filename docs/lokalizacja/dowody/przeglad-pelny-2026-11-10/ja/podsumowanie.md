# Pełny przegląd przekładu ja — podsumowanie (2026-11-10)

Źródła: 16 plików `czesci/<CZĘŚĆ>-uwagi.md` (przeczytane w całości), `poprawki-ja.json` (147 poprawek: 1 WYS, 96 ŚR, 50 NISKIE), `podzial.json`. Liczby trafień w tym pliku policzono na stanie repo **przed** nałożeniem poprawek (gałąź `przeglad-ap-cjk`, `content/ja` i `ja.json` bez zmian roboczych). Skrypt liczący: wyrażenie regularne JS po liniach wszystkich plików `content/ja/**` i `apps/mobile/src/i18n/locales/ja.json` (odpowiednik `grep -rhoP '<wzorzec>' content/ja apps/mobile/src/i18n/locales/ja.json | wc -l`); gwiazdka przy linii = w tej linii jest wpis `poprawki-ja.json`, którego pole `stary` zawiera wzorzec.

Skróty ścieżek: `lessons/…`, `exams/…`, `rules.yaml`, `terms-*.yaml` = `content/ja/…`; `ja.json` = `apps/mobile/src/i18n/locales/ja.json`.

## Pokrycie jednostek

Wynik: 70 jednostek, 70 przejrzanych w całości (wg deklaracji recenzentów), 0 częściowo, 0 nie. Żaden recenzent nie zgłosił luki w pliku głównym; luki dotyczą tylko plików pomocniczych (lista pod tabelą).

| Jednostka | Przejrzana w całości | Przez kogo | Poprawek |
|---|---|---|---|
| content/ja/lessons/m0-l1-uklady.md | tak | subagent L1 | 0 |
| content/ja/lessons/m1-l1-przebieg.md | tak | subagent L1 | 0 |
| content/ja/lessons/m2-l1-outy.md | tak | subagent L1 | 1 |
| content/ja/lessons/m2-l2-pot-odds.md | tak | subagent L1 | 2 |
| content/ja/lessons/m3-l1-pozycja.md | tak | subagent L1 | 0 |
| content/ja/lessons/m3-l2-rece-startowe.md | tak | subagent L1 | 1 |
| content/ja/lessons/m3-l3-zakresy-otwarc.md | tak | subagent L1 | 4 |
| content/ja/lessons/m4-l1-3bet.md | tak | subagent L2 | 0 |
| content/ja/lessons/m4-l2-obrona-bb.md | tak | subagent L2 | 3 |
| content/ja/lessons/m4-l3-wobec-3betu.md | tak | subagent L2 | 1 |
| content/ja/lessons/m4-l4-limperzy.md | tak | subagent L2 | 2 |
| content/ja/lessons/m5-l1-tekstury.md | tak | subagent L2 | 3 |
| content/ja/lessons/m5-l2-przewagi.md | tak | subagent L2 | 1 |
| content/ja/lessons/m5-l3-czestotliwosc-rozmiar.md | tak | subagent L3 | 3 |
| content/ja/lessons/m5-l4-bez-pozycji.md | tak | subagent L3 | 1 |
| content/ja/lessons/m6-l1-mdf-alpha.md | tak | subagent L3 | 4 |
| content/ja/lessons/m6-l2-sprawdzenie.md | tak | subagent L3 | 1 |
| content/ja/lessons/m6-l3-check-raise.md | tak | subagent L3 | 1 |
| content/ja/lessons/m7-l1-druga-beczka.md | tak | subagent L4 | 6 |
| content/ja/lessons/m7-l2-polaryzacja.md | tak | subagent L4 | 0 |
| content/ja/lessons/m7-l3-implied-odds.md | tak | subagent L4 | 2 |
| content/ja/lessons/m7-l4-probe-obrona.md | tak | subagent L4 | 1 |
| content/ja/lessons/m8-l1-value.md | tak | subagent L4 | 3 |
| content/ja/lessons/m8-l2-ile-blefow.md | tak | subagent L5 | 5 |
| content/ja/lessons/m8-l3-blokery.md | tak | subagent L5 | 1 |
| content/ja/lessons/m8-l4-bluff-catching.md | tak | subagent L5 | 1 |
| content/ja/lessons/m9-l1-spr.md | tak | subagent L5 | 1 |
| content/ja/lessons/m9-l2-zaangazowanie.md | tak | subagent L5 | 3 |
| content/ja/lessons/m9-l3-rozmiar-geometryczny.md | tak | subagent L6 | 6 |
| content/ja/lessons/m9-l4-plan-trzech-ulic.md | tak | subagent L6 | 4 |
| content/ja/lessons/m10-l1-statystyki.md | tak | subagent L6 | 2 |
| content/ja/lessons/m10-l2-typy-graczy.md | tak | subagent L6 | 2 |
| content/ja/lessons/m10-l3-odejscie-od-bazy.md | tak | subagent L6 | 11 |
| content/ja/lessons/m10-l4-rake.md | tak | subagent L6 | 0 |
| content/ja/lessons/m11-l1-push-fold.md | tak | subagent L7 | 0 |
| content/ja/lessons/m11-l2-sprawdzanie.md | tak | subagent L7 | 0 |
| content/ja/lessons/m11-l3-icm.md | tak | subagent L7 | 4 |
| content/ja/lessons/m13-l1-raport.md | tak | subagent L7 | 2 |
| content/ja/lessons/m13-l2-powtorki.md | tak | subagent L7 | 2 |
| content/ja/lessons/m13-l3-przeglad.md | tak | subagent L7 | 0 |
| content/ja/lessons/m12-l1-wariancja.md | tak | subagent L8 | 0 |
| content/ja/lessons/m12-l2-decyzja-wynik.md | tak | subagent L8 | 1 |
| content/ja/lessons/m12-l3-tilt.md | tak | subagent L8 | 0 |
| content/ja/lessons/m12-l4-bankroll.md | tak | subagent L8 | 1 |
| content/ja/exams/m0.yaml | tak | subagent E1 | 0 |
| content/ja/exams/m1.yaml | tak | subagent E1 | 0 |
| content/ja/exams/m2.yaml | tak | subagent E1 | 0 |
| content/ja/exams/m3.yaml | tak | subagent E1 | 4 |
| content/ja/exams/m4.yaml | tak | subagent E1 | 1 |
| content/ja/exams/m5.yaml | tak | subagent E1 | 4 |
| content/ja/exams/m6.yaml | tak | subagent E1 | 1 |
| content/ja/exams/m7.yaml | tak | subagent E2 | 2 |
| content/ja/exams/m8.yaml | tak | subagent E2 | 0 |
| content/ja/exams/m9.yaml | tak | subagent E2 | 0 |
| content/ja/exams/m10.yaml | tak | subagent E2 | 3 |
| content/ja/exams/m11.yaml | tak | subagent E2 | 0 |
| content/ja/exams/m12.yaml | tak | subagent E2 | 1 |
| content/ja/exams/m13.yaml | tak | subagent E2 | 0 |
| content/ja/rules.yaml, linie 1-331 (nagłówek, R-M1…R-M4) | tak | subagent R1 | 0 |
| content/ja/rules.yaml, linie 332-642 (R-M5…R-M7) | tak | subagent R2 | 0 |
| content/ja/rules.yaml, linie 643-952 (R-M8…R-M10) | tak | subagent R3 | 3 |
| content/ja/rules.yaml, linie 953-1207 (R-M12 (treść krytyczna), R-M11, R-M13) | tak | subagent R4 | 7 |
| content/ja/areas.yaml | tak | subagent S1 | 0 |
| content/ja/modules.yaml | tak | subagent S1 | 0 |
| content/ja/ranges/spots.yaml | tak | subagent S1 | 0 |
| content/ja/helplines.yaml | tak | subagent S1 | 0 |
| content/ja/terms-def.yaml | tak | subagent S1 | 3 |
| content/ja/terms-nazwy.yaml | tak | subagent S1 | 21 |
| apps/mobile/src/i18n/locales/ja.json (słownik interfejsu) | tak | subagent U1 | 7 |
| store/app-store-metadata.json, lokalizacje.ja (metadane sklepu) | tak | subagent U1 | 4 |

Uwagi do tabeli:
- Deklaracje „tak” obejmują pl i ja linia po linii; każda część L/E/R dodatkowo porównała skryptem znaczniki `{{n:}}`, klucze `{{t:}}`, `[[…]]` i pola nieprzekładalne YAML.
- U1: 48 kluczy pl bez odpowiednika w ja to wyłącznie formy `_one/_few/_many` (ja ma `_other`), kluczy tylko w ja: 0.
- Metadane sklepu: ja jest w `store/app-store-metadata.json` (`lokalizacje.ja`); w `docs/sklep/aso/metadane-fala2.json` ja nie ma (nie dotyczy); `store/iap-localizations.json` przeczytany — **brak lokalizacji ja** produktów zakupu (plik ma tylko pl i en).

Czego recenzenci jawnie nie czytali (albo czytali tylko częściowo):
- `docs/lokalizacja/glosariusz.md` w całości: nie czytali L1, L2, L5, L7, R2 (tylko wyszukane wiersze), L3, L8, E2 (nie w całości), E1, U1 (w ogóle nie otwierany), R1 i R4 (nie wymieniają glosariusza; terminy sprawdzane z `terms-nazwy.yaml`). W całości przeczytali go: L4, L6, R3, S1.
- Wersja `en`: nie otwierali L1, L3, L4, L7, L8, E1, R1, R2, R4; pojedyncze linie: L2 (m4-l2:92), L5 (m8-l4:80), L6 (m10-l3:49), E2 (`exams/m10.yaml`, 1 linia), R3 (4 linie `rules.yaml`), U1 (pojedyncze klucze `en.json`).
- `apps/mobile/src/i18n/locales/pl.kontekst.json`: U1 tylko wpisy kluczy z wątpliwością.
- `content/numbers.yaml`: wszędzie tylko klucze użyte w danej części.
- Render w aplikacji: nikt nie sprawdzał (L2 wprost: zapis mnożnika „3x”/„3倍” nieoglądany na ekranie).
- L7: wcześniejszych przeglądów i `docs/decyzje.md` nie czytał.
- Komentarze po `#` w `terms-nazwy.yaml` (S1) i komentarze YAML w `rules.yaml` (R1, R3, R4: zostały po polsku, niewyświetlane) nie były oceniane.
- Części R1–R4 oceniały wyłącznie swój zakres linii `rules.yaml`; części L/E nie czytały plików spoza swojego przydziału (trafienia „poza częścią” podawały tylko z grep).

## Znaleziska bez poprawki mechanicznej

Razem 50: KRYT 0, WYS 0, ŚR 5, NISKIE 45.

| Waga | plik:linia | Opis | Propozycja | Część |
|---|---|---|---|---|
| ŚR | exams/m5.yaml (37 miejsc, 22 linie) | „ręka” = „手” w całym egzaminie; reszta przekładu „ハンド” | Ujednolicić do „ハンド” (sekcja „Do ujednolicenia”, U-05); 3 miejsca już w poprawkach | E1 |
| ŚR | exams/m11.yaml (14 miejsc; l. 7, 9, 23, 27, 32, 34, 48, 50, 51, 52, 76, 84, 86) | „ręka” = „手”, w m7–m10, m12, m13 „ハンド” | Jak wyżej (U-05) | E2 |
| ŚR | lessons/m9-l4-plan-trzech-ulic.md:17 | Idiom pl „zostawia na `{{t:board\|stole}}` większość wartości” → „バリューの大半を`{{t:board\|ボード}}`に残してしまいます” (kalka bez sensu po japońsku) | „バリューの大半を取り逃がしてしまいます” — usuwa znacznik `board` obecny w pl; wymaga decyzji (patrz „Pytania do źródła pl”) | L6 |
| ŚR | lessons/m10-l2-typy-graczy.md:121 | Wiersz tabeli „Fold to 3-bet” po angielsku, w m10-l1 „フォールド・トゥ・3ベット” | Rozstrzygnięcie T-09, potem zamiana skryptem (U-09) | L6 |
| ŚR | lessons/m12-l3-tilt.md:78, 118 ↔ rules.yaml:995 | „profil tiltu”: lekcja プロフィール / ティルトプロフィール, reguła プロファイル (moduł 12) | Rozstrzygnięcie T-12 | L8 |
| NISKIE | lessons/m0-l1-uklady.md:88 | Drugi znacznik ma klucz `straight` zamiast `straight-flush` z pl; wyświetlanie poprawne, inna definicja po dotknięciu | Zostawić albo `{{t:straight-flush\|同じスートのストレート}}` (forma spoza nazwy) | L1 |
| NISKIE | lessons/m2-l1-outy.md (l. 33, 42, 54, 88, 131, 134) ↔ m2-l2-pot-odds.md:75–76 | „szansa trafienia”: m2-l1 „引ける確率/引く確率”, odsyłacz w m2-l2 „**ヒットする確率**” | Jedna nazwa (U-14) | L1 |
| NISKIE | lessons/m3-l2-rece-startowe.md:53–56 | Dwukropek półszerokości po pogrubieniu („**: ”), w innych lekcjach „：” | „**: ” → „**：” (U-17) | L1 |
| NISKIE | lessons/m3-l1-pozycja.md:25 | „スーテッドでないK9” wobec „オフスートの…” w sąsiednich lekcjach | Opcjonalnie „オフスートのK9” | L1 |
| NISKIE | lessons/m4-l3-wobec-3betu.md (13 wystąpień) | „źródło” = ソース; gdzie indziej 情報源 / 出典 / 資料 | ソース → 情報源 (U-03) | L2 |
| NISKIE | lessons/m4-l4-limperzy.md:75 | „w ćwiczeniach” = ドリル; w m4-l1 練習問題 | 練習問題 po sprawdzeniu nazwy w interfejsie (U-18) | L2 |
| NISKIE | lessons/m4-l4-limperzy.md:49, 73 | Zakres liczb „～”, w pozostałych lekcjach części „–” | Jeden znak zakresu (U-16) | L2 |
| NISKIE | lessons/m5-l3 (cały) ↔ m5-l4 (cały) | Te same zwroty pl różnie w sąsiednich lekcjach: „Tak:” 正解です：/はい。; „wysoki flop” 高いフロップ/ハイカードのフロップ; „chybił” ヒットしていません/外しています; ヒューリスティック/ヒューリスティクス; „Skąd te zasady” 根拠/出典; opcje ćwiczenia cbet | Ujednolicić do wariantów z m5-l3; nie blokuje | L3 |
| NISKIE | lessons/m6-l1, m6-l2 ↔ m6-l3, m5-l3 | „1/3 puli”: „1/3`{{t:pot\|ポット}}`” i „`{{t:pot\|ポット}}`の1/3” | Bez zmiany albo jeden zapis w module 6 | L3 |
| NISKIE | lessons/m6-l2-sprawdzenie.md:23 | „何%” półszerokości; w innych plikach „何％” | „何％” (U-19) | L3 |
| NISKIE | lessons/m5-l3:112, m6-l3:135 | Zakres „–” i „～” | Jeden znak zakresu (U-16) | L3 |
| NISKIE | lessons/m6-l2-sprawdzenie.md:98 | „Cベットを`{{t:bet\|ベット}}`してきます” (podwojenie) | „Cベットとして`{{t:bet\|ベット}}`してきます” (U-20) | L3 |
| NISKIE | lessons/m7-l1-druga-beczka.md:137 | Znacznik `{{t:value}}` dodany względem pl | Zostawić albo zdjąć | L4 |
| NISKIE | lessons/m7-l4-probe-obrona.md:145 | Znacznik `{{t:stakes}}` dodany względem pl | Jak wyżej | L4 |
| NISKIE | lessons/m7-l3-implied-odds.md:143 | Dwa `{{t:draw}}` zamiast jednego (składnia ja) | Bez zmiany | L4 |
| NISKIE | lessons/m7-l3 (częściowo), m7-l4 (całość) | „ręka” = „手” w m7-l4, mieszane w m7-l3; w m7-l1, m7-l2, m8-l1 „ハンド” | Rozstrzygnięcie T-06 | L4 |
| NISKIE | lessons/m9-l1-spr.md:73, 107 | Jeden `{{t:bet}}` zamiast dwóch z pl | Zostawić (strażnik liczący znaczniki może wykazać) | L5 |
| NISKIE | lessons/m8-l4:70 ↔ m8-l3:48, 106 | „kolor z asem”: エースハイの… / エースを含む… | Ewentualnie „エースを含む” | L5 |
| NISKIE | lessons/m10-l2-typy-graczy.md (ok. 12 linii, np. 22, 31, 43, 52, 99, 126, 130, 139) | Dwukropek „：” w środku zdania przeniesiony z pl | Ręcznie „。” tam, gdzie po dwukropku pełne zdanie (nie w etykietach „はい：/いいえ：”) | L6 |
| NISKIE | lessons/m13-l1-raport.md:105 (także exams/m12.yaml:16) | „約`{{n:…}}`千ハンド” wyświetla „約2.5千ハンド” | Osobny klucz liczby (ręce zamiast tysięcy) albo zostawić; T-10 | L7 |
| NISKIE | lessons/m13-l1:107, m13-l2:95, m13-l3:86 | Nagłówek „Skąd te zasady” w trzech wersjach | „これらの原則の出典” (U-21) | L7 |
| NISKIE | lessons/m12-l2-decyzja-wynik.md:112 | „約`{{n:skill.sample.m}}`百万のオンラインハンド” wyświetla „約76.9百万” (naturalnie 約7,690万) | Osobny klucz w jednostce 万 albo zostawić (źródło liczb, nie przekład) | L8 |
| NISKIE | lessons/m12-l4-bankroll.md:96 | Znacznik `{{t:stakes}}` dodany względem pl | Bez zmiany | L8 |
| NISKIE | exams/m6.yaml:24, 54, 64, 73, 83 | „Cベットを`{{t:bet\|ベット}}`します” (podwojenie) | np. „Cベットを打ちます”; decyzja o znaczniku `bet` (U-20) | E1 |
| NISKIE | exams/m6.yaml:38, 39, 76, 77 | „płaci/zapłacą” → 支払う/支払われても | „コールする/コールされても” bez znacznika | E1 |
| NISKIE | exams/m5.yaml, m6.yaml | „Tak:” → そのとおりです。(m5, 10×) / 正解です。(m6, 8×) | Jedna postać (U-22) | E1 |
| NISKIE | exams/m5.yaml:50–52 | „próg” = 損益分岐点 (4×, tylko m5); gdzie indziej しきい値 / 基準 | Ewentualnie しきい値 (T-16) | E1 |
| NISKIE | exams/m6.yaml:86 | Przedział „～”, w pl i innych egzaminach „–” | „–” (U-16) | E1 |
| NISKIE | exams/m10.yaml:17, 19, 24, 26, 27, 29, 61, 63, 65, 71, 75 | „Fold to Cベット” / „Fold to 3ベット” (zapis mieszany) | T-09, U-09 | E2 |
| NISKIE | exams/m10.yaml:19 ↔ m12.yaml:7, 18, 25 | „pewność”: 信頼度 / 確信度 | Jedna postać (T-17) | E2 |
| NISKIE | exams/m12.yaml (11 miejsc) | „`{{n:…}}`千ハンド” („50千ハンド”) | T-10 | E2 |
| NISKIE | rules.yaml:1–17, 208, 329–331 | Komentarze YAML po polsku (niewyświetlane) | Bez zmian | R1 |
| NISKIE | rules.yaml:537 | Pominięty `{{t:bet}}` z pl („セカンドバレルを打つ頻度”) | Zostawić albo „…を`{{t:bet\|ベット}}`する頻度を上げます” (jak l. 636) | R2 |
| NISKIE | rules.yaml:495, 610 | O jeden `{{t:draw}}` więcej niż w pl | Bez zmiany | R2 |
| NISKIE | rules.yaml:663 | 4 znaczniki `{{t:call}}` zamiast 3 | Zostawić albo drugi jako zwykły tekst | R3 |
| NISKIE | rules.yaml:870 | Zdanie kończy równoważnik „特にリバーで” (poza です/ます) | Przebudować albo zostawić | R3 |
| NISKIE | rules.yaml:941 | W polu source „ルームのレーキ構造” obok „オンラインサイト” | „サイトのレーキ構造” | R3 |
| NISKIE | rules.yaml:849 | „na tym samym szczeblu” → „同じ段階での矛盾” | „同じ階層での矛盾” (potwierdzić z resztą przekładu) | R3 |
| NISKIE | rules.yaml:740–741, 823–826, 952 | Komentarze YAML po polsku | Bez zmian | R3 |
| NISKIE | terms-nazwy.yaml (10 kluczy z `null`) | polarization, donk-bet, m-ratio, gap-concept, chip-ev, pay-jump, nash-equilibrium, overcall, dead-money, stack-off: brak nazwy lokalnej, w tekście 0–1 wystąpień katakaną | Nazwy do potwierdzenia przeczytanym źródłem: ドンクベット, ナッシュ均衡, オーバーコール, デッドマネー, ペイジャンプ, チップEV, スタックオフ, ギャップコンセプト, ポラライゼーション; m-ratio „M” | S1 |
| NISKIE | terms-def.yaml:17, 25, 14, 16 | Zdania o polszczyźnie pominięte/zaadaptowane (raise, board, check, call) | Bez zmiany (uzasadniona adaptacja) | S1 |
| NISKIE | ja.json:872, 873, 878, 879 | `drill.vocab.*` pyta o znaczenie „po polsku”; wg kodu (`features/drills/vocab.ts`) tryb działa tylko w języku źródłowym, więc w ja się nie wyświetla | Bez zmiany; przy włączeniu trybu poza pl napisać od nowa | U1 |
| NISKIE | store/app-store-metadata.json:27 | Słowa kluczowe ja: 42/100 znaków | Decyzja ASO | U1 |
| NISKIE | ja.json (wiele `drill.*`, `play.report.detail.nutsYes`) | pl znacznik bez formy, ja z formą (`{{t:flush\|フラッシュ}}`); wyświetlanie poprawne | Bez zmiany, o ile strażnik nie wymaga | U1 |
| NISKIE | store/iap-localizations.json | Brak lokalizacji ja produktów zakupu | Dopisać przy wydaniu ja z `purchase.*` (フルアクセス / 3か月 / 1年 / 永久アクセス) | U1 |

## Do ujednolicenia skryptem

Kolejność: najpierw nałożyć `poprawki-ja.json`, potem wzorce (wzorce dobrane tak, żeby po poprawkach nie trafiały drugi raz w to samo miejsce; wyjątki nazwane). Wzorce zależne od rozstrzygnięcia terminologicznego mają odsyłacz T-nn.

| ID | Wzorzec → zamiana | Trafienia (grep, stan przed poprawkami) | Już w poprawki-ja.json | Wyjątki / uwagi | Waga |
|---|---|---|---|---|---|
| U-01 | `オフスーツ` → `オフスート` | `オフスーツ` = 9: exams/m3.yaml 3 (21, 31, 49), lessons/m3-l3 3 (47, 84, 87), rules.yaml 3 (257, 273, 274). `オフスート` = 18 | 6 (m3.yaml i m3-l3: wszystkie) | Do zrobienia skryptem tylko rules.yaml:257, 273, 274 (część R1 ich nie zgłosiła). Brak wyjątków | ŚR |
| U-02 | `{{t:connected\|コネクト}}` → `{{t:connected\|コネクテッド}}`; `{{t:connected\|コネクトした}}` → `{{t:connected\|コネクテッド}}な` (T-02) | `\|コネクト}}` = 7: exams/m6.yaml:94, lessons/m5-l3:126, rules.yaml:358, 509, ja.json:794, 825, 860. `\|コネクトした}}` = 5: m5-l2:88, m6-l3:16, 17, 125, 130. `\|コネクテッド}}` = 4 (m5-l1). Bez formy = 3 | ja.json 794, 825, 860 (U1); m5-l2:88 (L2); m5.yaml:22 (E1, bez formy → „…な”) | Zostaje 8: m6.yaml:94, m5-l3:126, rules.yaml:358, 509, m6-l3 ×4. rules.yaml:358 i :509 mają „コネクト…している” — po zamianie trzeba przebudować końcówkę („コネクテッドな”), ręcznie; m5-l3:126 i rules.yaml:358 stoją obok セミコネクト (T-01) | ŚR |
| U-03 | `{{t:semi-connected\|セミコネクト}}` → `…\|セミコネクテッド}}` (tylko jeśli T-01 = セミコネクテッド) | `\|セミコネクト}}` = 5: m5-l3:126, rules.yaml:358, ja.json:795, 826, 860. `\|セミコネクテッド}}` = 2: m5-l1:74, 84 | m5-l1:74, 84 (L2, kierunek ODWROTNY: → セミコネクト); ja.json:860 (U1 zostawia セミコネクト w polu `nowy`) | Sprzeczność poprawek, patrz T-01. Przy wyborze セミコネクテッド: usunąć 2 wpisy L2, poprawić `nowy` wpisu U1 ja.json:860, zamienić 5 trafień | ŚR |
| U-04 | `{{t:condensed\|コンデンス}}されている` → `{{t:condensed\|コンデンスド}}だ` | 1: rules.yaml:427 (druga forma: m5-l4:99 `コンデンスド`) | 0 | Forma czasownikowa zrozumiała; zamiana opcjonalna | NISKIE |
| U-05 | `手` (ręka pokerowa) → `ハンド` w exams/m5.yaml i exams/m11.yaml (T-06) | `(?<!相)手(?![札前法段順番数])`: m5.yaml 37 (22 linie), m11.yaml 18 (13 linii; E2 liczył 14 po węższym wzorcu). W całym korpusie wzorzec daje 240 trafień wobec `ハンド` = 1631 | m5.yaml:47, 68, 75 (E1) | Nie skryptem globalnym: wzorzec łapie też inne słowa (上手, 手放す, 手に入れる, 手を出す, 打ち手). W m5.yaml nie ma złożeń z 手 poza 相手 (E1); po zamianie przeczytać m5.yaml:13, 88 i cały wynik w m11.yaml. Pliki z dużą liczbą trafień do ręcznej decyzji: lessons/m7-l4 27, m9-l2 24, m8-l3 11, m7-l3 8, terms-def.yaml 38 | ŚR |
| U-06 | `中程度の手` → `中程度のハンド` | 4: exams/m11.yaml:9, exams/m5.yaml:88, 90, lessons/m7-l4:26. `中程度のハンド` = 26 | 0 (L4 poprawia `ミディアムハンド` → `中程度のハンド` w m7-l1, 6 wpisów — zgodne) | Podzbiór U-05; brak wyjątków | NISKIE |
| U-07 | `ソース` → `情報源` w lessons/m4-l3-wobec-3betu.md | 13 trafień w 8 liniach (37, 56, 66, 67, 93, 100, 108, 112); w całym content/ja tylko ten plik. `情報源` = 26 | 0 | Brak (wszystkie w znaczeniu „źródło”; złożenia „複数のソースの”, „あるソース”, „別のソース”, „ソースによって” zamieniają się poprawnie) | NISKIE |
| U-08 | `プレー` → `プレイ` | `プレー(?!ヤー)` = 7: m4-l2:13, 34, 46; m13-l2:52, 53; m8-l4:82, 135. `プレーヤー` = 0 | 5 (m4-l2 ×3 L2, m13-l2 ×2 L7) | Zostaje m8-l4-bluff-catching.md:82, 135 (L5 nie zgłosił); brak wyjątków | NISKIE |
| U-09 | Nazwy statystyk: `Fold to 3-bet`, `Fold to 3ベット` → `フォールド・トゥ・3ベット`; `Fold to c-bet`, `Fold to Cベット` → `フォールド・トゥ・Cベット` (T-09) | `Fold to 3-bet` 7 (m10-l2:121; m10-l3:66, 117, 122, 129; rules.yaml:849); `Fold to c-bet` 6 (m10-l3:42, 47, 49, 56, 109, 129); `Fold to 3ベット` 9 i `Fold to Cベット` 5 (exams/m10.yaml); `フォールド・トゥ・3ベット` 12 (m10-l1 7, rules 5); `フォールド・トゥ・Cベット` 2 (m10-l1:107, rules:906) | 0 | `[Ff]old to` w rules.yaml:883, 908, 917 i części :849 to cytaty angielskie w polach `source` — nie zamieniać. Zamiana tylko poza polami `source` | ŚR |
| U-10 | `ベースライン` → `ベース` | `ベースライン` = 14: m10-l1:67, 69, 87, 89; m10-l2 10 linii. `ベース(?!ライン)` = 50 (m10-l3 19, rules 17, exams/m10 9, …) | 0 (m10-l1:87 ma poprawkę L6 innego fragmentu linii) | Brak; po zamianie przeczytać złożenia („ベースラインから外れる” → „ベースから外れる”) | NISKIE |
| U-11 | `スタック全部をかけ` → `スタック全体を懸け`; `スタック全体を賭け` → `スタック全体を懸け` | 15 (m9-l2 11, rules.yaml:761, 769, 808, 816) + 9 (m9-l4 8, m4-l3:78); docelowa forma 15 (exams/m9 11, m9-l1 4) | m9-l2:41 (L5; pole `nowy` nadal zawiera `スタック全部をかけ`, więc skrypt po poprawkach trafi też tę linię — to pożądane) | Brak | NISKIE |
| U-12 | `プッシュ／フォールド` → `プッシュ/フォールド` | 6 trafień w 5 liniach: m11-l1:15, 26, 108, 117, 123. Forma docelowa 12 (rules 9, exams/m11 1, modules 1, m11-l3 1) | 0 (S1 ustala nazwę `push-fold: "プッシュ/フォールド"` — zgodne) | Brak | NISKIE |
| U-13 | `}}千ハンド` → `}}kハンド` (T-10) | `}}千ハンド` = 16: exams/m12.yaml 13 (11 linii), m12-l2:68, m12-l4:58, m13-l1:105. `}}kハンド` = 34 (m12-l1 30, rules.yaml:957, 965, 972, 1029); `}}k` bez ハンド 3 (m12-l1:56–58) | 0 | Kierunek odwrotny wymagałby ręcznej korekty opcji m12-l1:56–58. Moduł 12 = treść krytyczna: zamiana dotyczy tylko jednostki przy znaczniku, liczby zostają | NISKIE |
| U-14 | `引ける確率` / `引く確率` → `ヒットする確率` w m2-l1 | `引け?る?く?確率` = 7: m2-l1:33, 42, 54, 88, 131, 134; m7-l1:65. `ヒットする確率` = 9 (exams/m2 4, m2-l2 4, ja.json 1) | 0 | Ręcznie przeczytać po zamianie (odmiana czasownika w zdaniu); m7-l1:65 do decyzji | NISKIE |
| U-15 | `数字を入力` → `数値を入力` | `数字を入力` = 24 (16 plików), `数値を入力` = 22 (16 plików) | 0 | Brak; kierunek wg L8 (数値) | NISKIE |
| U-16 | Znak zakresu liczb: `～` → jeden znak w korpusie | `～` = 10: exams/m6:86; m10-l2:108, 116, 142; m4-l4:49, 73; m6-l3:135; m9-l1:83, 135, 136. `〜` = 21 (m12-l1 11, exams/m12 4, …). `–` = 194 | 0 | Najpierw decyzja o znaku (trzy w użyciu: „–” jak w pl, „〜”, „～”); `～`/`〜` sprawdzić, czy nie znaczą „około” | NISKIE |
| U-17 | `**: ` → `**：` w m3-l2 | 4: m3-l2-rece-startowe.md:53–56 | 0 | Tylko ten plik | NISKIE |
| U-18 | `ドリル` → `練習問題` | 2: m4-l4:75, m11-l1:166. `練習問題` = 8 | 0 | Najpierw sprawdzić nazwę ćwiczeń w ja.json | NISKIE |
| U-19 | `何%` → `何％` | `何%` = 3: exams/m10:80, m2-l2:63, m6-l2:23. `何％` = 4 | 0 | Brak | NISKIE |
| U-20 | `Cベットを{{t:bet\|ベット}}` (podwojone „ベット”) | 10: exams/m6:24, 54, 64, 73, 83; m10-l3:40; m6-l2:98; m6-l3:129; m7-l1:13, 33. Plus `プローブベットを{{t:bet\|ベット}}` 1: m7-l4:145 | 0 | Nie czysto mechaniczne: wymaga decyzji, co zrobić ze znacznikiem `bet` z pl (propozycja L3: „Cベットとして{{t:bet\|ベット}}”) | NISKIE |
| U-21 | Nagłówek ramki „Skąd te zasady”: jedna postać (np. „これらの原則の出典”) | Warianty zgłoszone: 根拠 (m5-l3, m7-l3, m8-l1, m13-l2), 出典 (m5-l4, m7-l1, m13-l1, m13-l3), 出どころ (m7-l2). Nie policzone jednym wzorcem (nagłówki mają różną składnię) | 0 | Ręcznie, po liście nagłówków ostatniej ramki każdej lekcji | NISKIE |
| U-22 | „Tak:” na początku uzasadnienia: jedna postać | `そのとおりです` = 28 (exams/m5 10, m13-l3 6, m9-l4 7, m9-l1 3, m7-l3 2); `正解です` = 45 (exams m6–m9 po 8, m5-l3 8, …); `はい。` = 58 (część to odpowiedzi tak/nie, nie ten wzorzec) | 0 | Nie skryptem bez przeglądu: `はい。` bywa poprawną odpowiedzią na pytanie tak/nie | NISKIE |
| U-23 | `ヒューリスティクス` → `ヒューリスティック` | 1: m5-l4:106. Forma docelowa 10. `経験則` 2 (m7-l4:145, m13-l3:87) | 0 | 経験則 zostawić albo osobna decyzja | NISKIE |
| U-24 | `{{t:oesd\|オープンエンド・ストレートドロー}}` → `{{t:oesd\|OESD}}` (T-19) | 6: m2-l1:111, 126; m6-l2:65; m7-l3:54; exams/m8:46; ja.json:764. `\|OESD}}` = 11; bez formy 6 | m7-l3:54 (L4) | m2-l1:111 to pierwsze wprowadzenie terminu — rozwinięcie zostawić; ja.json:764 do decyzji | NISKIE |
| U-25 | Stopień wyższy „lepsze/gorsze ręce” oddany „強い/弱いハンド” bez „より” | Brak jednego wzorca; L3 poprawił m6-l1:92, 94, 135 i m6-l2:76, L5 m9-l1:84 | 5 wpisów | Przegląd ręczny zdań „płacą lepsze, pasują gorsze” w reszcie korpusu (L3) | NISKIE |

Wzorce zgłoszone w częściach i w całości zamknięte poprawkami (skrypt nie ma nic do zrobienia):
- `{{t:disconnected|ディスコネクト}}` → `ディスコネクテッド`: 3 trafienia (ja.json:796, 827, 860), wszystkie w U1.
- `{{t:mixed-hand|混合ハンド}}` → `ミックスハンド`: 4 (m10-l3:92, 96, 97, 129), wszystkie w L6.
- `{{t:payout|ペイアウト}}` → `賞金`: 4 (m11-l3:29, 39, 71, 161), wszystkie w L7.
- `{{t:polarized|ポラライズド}}` → `ポラライズ`された: 3 (m8-l2:107, 109, 142), wszystkie w L5.
- `レーキキャップ` → `レーキ上限`: 2 w treści (exams/m10:80 E2, rules.yaml:947 R3); trzecie trafienie grep to komentarz w terms-nazwy.yaml:164. Zostaje forma skrócona `{{t:rake-cap|上限}}` (m10-l4:49), dopuszczalna.
- `閾値` → `しきい値`: 5 (m10-l3:42, 101, 109, 111, 129), wszystkie w L6.
- `テクスチャ` → `テクスチャー`: ja.json:862 w U1; rules.yaml:338, 346 to pola `source` (niewyświetlane) — bez zmiany.
- `ミディアムハンド` → `中程度のハンド`: 6 trafień w 5 liniach m7-l1, wszystkie w L4.

## Rozstrzygnięcia terminologiczne do podjęcia

### Sprzeczności między poprawkami (do usunięcia przed nałożeniem)

1. **semi-connected — S1 kontra L2 (i U1).** S1 `terms-nazwy.yaml:83` zmienia nazwę `"セミコネクト"` → `"セミコネクテッド"`. L2 w `lessons/m5-l1-tekstury.md:74` (drugi wpis tej linii) i `:84` zmienia formę w tekście `セミコネクテッド` → `セミコネクト`, czyli do nazwy, którą S1 właśnie usuwa. U1 w `ja.json:860` zostawia w polu `nowy` `{{t:semi-connected|セミコネクト}}` z uzasadnieniem „zgodne z terms-nazwy”. Po nałożeniu wszystkiego nazwa = セミコネクテッド, a wszystkie 7 form w tekście = セミコネクト. Rozstrzygnięcie: T-01.
2. **„pula po jednym podbiciu” — L5 kontra L6.** L5 `lessons/m9-l2-zaangazowanie.md:65, 110`: `シングルレイズの{{t:pot|ポット}}` → `レイズが1回の{{t:pot|ポット}}`. L6 `lessons/m9-l4-plan-trzech-ulic.md:72, 113, 115, 130`: `シングルレイズ{{t:pot|ポット}}` → `シングルレイズド{{t:pot|ポット}}`. Ta sama fraza ujednolicana w dwóch przeciwnych kierunkach. Rozstrzygnięcie: T-13.
3. **„błąd maleje z pierwiastkiem” — R3 kontra R4 (i E2).** R3 `rules.yaml:839`: `平方根に比例してしか` → `平方根に反比例してしか` (zmienia 比例 na 反比例, zostawia しか). R4 `rules.yaml:973`: `平方根に比例してしか小さくならないからです` → `平方根に比例して小さくなるからです` (zostawia 比例, usuwa しか). E2 w `exams/m12.yaml:29` to samo sformułowanie („比例してしか小さくなりません”) zostawia bez poprawki, tylko jako pytanie. Po nałożeniu ta sama zależność będzie opisana jako 反比例 w jednym miejscu i 比例 w dwóch. Usunięcie しか w :973 jest zgodne z pl (pl :973 nie ma „dopiero”, pl :839 i m12:29 mają). Rozstrzygnięcie: T-14.
4. **„rozmiary i stoły” — E2 kontra L6.** E2 `exams/m10.yaml:63`: `すべてのサイズとテーブル` → `…とボード`. L6 w `lessons/m10-l3-odejscie-od-bazy.md:49` to samo zdanie zostawia z テーブル (tylko pytanie w „Do sprawdzenia”). `rules.yaml:906` ma już ボード. Po nałożeniu lekcja będzie jedynym miejscem z テーブル. Proponowana dodatkowa poprawka: m10-l3:49 `すべてのサイズとテーブルをまとめた` → `すべてのサイズとボードをまとめた` (sformułowanie podał L6); zależna od odpowiedzi na pytanie do źródła pl.
5. **button — S1 kontra formy w lekcji (słabsza niezgodność).** S1 `terms-nazwy.yaml:49`: `button: "BTN"` → `"ボタン"`. Trzy znaczniki z formą `{{t:button|BTN}}` (`lessons/m3-l1-pozycja.md:15, 55, 63`, część L1, bez poprawki) po zmianie nie będą już równe nazwie. Znaczników `{{t:button}}` bez formy nie ma (0), więc wyświetlanie się nie zmienia; strażnik `nazwy.ts` nie porównuje form z nazwą. S1 sam pyta, czy HJ/CO nie powinny analogicznie stać się ハイジャック/カットオフ. Rozstrzygnięcie: T-08.
6. **„オールインに/で レイズ” — L6 kontra L1 (niespójność, nie kolizja).** L6 `lessons/m10-l2-typy-graczy.md:82`: `オールインに{{t:raise|レイズ}}` → `オールインで…`. L1 tę samą frazę w `lessons/m2-l2-pot-odds.md:27` zostawia (pytanie, propozycja „オールインの” albo „レイズでオールイン”); trzecie wystąpienie `lessons/m6-l1-mdf-alpha.md:94` nikt nie ruszył. Do ujednolicenia: 3 trafienia `オールインに{{t:raise`.
7. **手 w poprawce S1.** S1 `terms-def.yaml:91` wstawia „…ありうる最も強い手です”; przy rozstrzygnięciu T-06 na „ハンド” ten wpis (i 38 trafień 手 w terms-def.yaml) trzeba objąć tą samą decyzją.

Kolizji linii (dwa wpisy zmieniające ten sam fragment) skrypt scalający nie wykazał (0); sprzeczności wyżej są merytoryczne.

### Kwestie

| ID | Kwestia | Opcje i liczba wystąpień (grep) | terms-nazwy | Rekomendacja i powód |
|---|---|---|---|---|
| T-01 | semi-connected | `\|セミコネクト}}` 5 (m5-l3:126, rules:358, ja.json:795, 826, 860); `\|セミコネクテッド}}` 2 (m5-l1:74, 84) | `"セミコネクト"`; S1 zmienia na `"セミコネクテッド"` | **セミコネクテッド** (wersja S1): trzy nazwy jednej osi tekstury (コネクテッド / セミコネクテッド / ディスコネクテッド) są wtedy równoległe i zgodne z lekcją definiującą. Skutek: usunąć wpisy L2 m5-l1:74 (drugi) i :84, zmienić `nowy` wpisu U1 ja.json:860, dodać zamianę 5 trafień (U-03) |
| T-02 | connected | `\|コネクト}}` 7; `\|コネクトした}}` 5; `\|コネクテッド}}` 4; bez formy 3 | `"コネクテッド"` (komentarz AB: jedna forma przymiotnikowa) | **コネクテッド(な)**: nazwa już ustalona, a U1, L2 i E1 poprawiają w tę stronę; L3 i R2 wstrzymali się, więc zostaje 8 miejsc (U-02) |
| T-03 | disconnected | `\|ディスコネクト}}` 3 (ja.json); `\|ディスコネクテッド}}` 1 | `"ディスコネクテッド"` | Zamknięte poprawkami U1; nic do decyzji |
| T-04 | condensed | `\|コンデンスド}}` 1 (m5-l4:99); `\|コンデンス}}`されている 1 (rules:427) | `"コンデンスド"` | **コンデンスド**: jedna forma jak przy connected; zmiana 1 miejsca (U-04), niska waga |
| T-05 | offsuit | `オフスート` 18; `オフスーツ` 9 (6 w poprawkach) | `null`; S1 ustawia `"オフスート"` | **オフスート**: forma większościowa i zgodna z poprawkami L1, E1, S1; dokończyć rules.yaml:257, 273, 274 (U-01) |
| T-06 | „ręka”: 手 / ハンド | `ハンド` 1631; `手` poza 相手 ok. 240 (w tym inne słowa); skupiska: exams/m5 37, terms-def 38, m7-l4 27, m9-l2 24, exams/m11 18, m8-l3 11 | brak klucza „hand” w wynikach recenzji; definicje (terms-def) piszą 手 | **ハンド** w lekcjach, egzaminach i regułach (dominuje 7:1 i jest jedyną formą w większości plików); zamiana w exams/m5, exams/m11, m7-l4, m7-l3 z ręcznym przeglądem (U-05). terms-def.yaml rozstrzygnąć osobno, bo tam 手 bywa „układ/役” |
| T-07 | 19 terminów z `null` pisanych katakaną | Wystąpienia w tekście: キッカー 63, チェックレイズ 65, スタック 397, ガットショット 30, バックドア 12, ポットオッズ 8, スーテッド 50, オフスート 18, 3ベット 261, 4ベット 74, ブラフキャッチャー 31, バレル 27, プローブベット 19, ティルト 59, プッシュ/フォールド 12 (+6 z „／”), バブルファクター 17, アンティ 50, フォールドエクイティ 12, ヘッズアップ 4 (liczby zawierają złożenia, np. セカンドバレル, スタック全体) | 18 × `null` [DO USTALENIA] → S1 wpisuje nazwy katakaną; 19. wpis S1 to button (T-08) | **Przyjąć poprawki S1**: nazwy utrwalają formę, której przekład już konsekwentnie używa; dla tych kluczy jest 0 znaczników `{{t:klucz}}` w content/ja, więc zmiana dotyka tylko słowniczka i wyszukiwania. Po nałożeniu `pnpm content:build`. Pozostałe 10 `null` (polarization, donk-bet, m-ratio, gap-concept, chip-ev, pay-jump, nash-equilibrium, overcall, dead-money, stack-off; w tekście 0–1 wystąpień, „gap concept” 2× po angielsku, ナッシュ均衡 1×) zostawić do potwierdzenia przeczytanym źródłem |
| T-08 | button / hijack / cutoff | `ボタン` 391; `BTN` 116 (głównie pola tabel i tytuły spotów); `{{t:button\|BTN}}` 3; `{{t:hijack\|HJ}}` 17, `{{t:cutoff\|CO}}` 55; カットオフ 3, ハイジャック 1 | `button: "BTN"` (S1 → `"ボタン"`), `hijack: "HJ"`, `cutoff: "CO"` | **button = ボタン, HJ i CO bez zmiany**: nazwa ma odpowiadać temu, jak pojęcie stoi w zdaniach (ボタン w zdaniach, HJ/CO skrótami). Formy `{{t:button\|BTN}}` w m3-l1 mogą zostać (skrót pozycji przy pierwszym wprowadzeniu) |
| T-09 | Statystyki „fold to 3-bet / c-bet” | `フォールド・トゥ・3ベット` 12 + `…Cベット` 2 (m10-l1, rules); `Fold to 3-bet` 7 + `Fold to c-bet` 6 (m10-l2, m10-l3, rules:849); `Fold to 3ベット` 9 + `Fold to Cベット` 5 (exams/m10) | brak klucza (VPIP, PFR, WTSD mają `null` jako skróty) | **フォールド・トゥ・3ベット / フォールド・トゥ・Cベット**: tak nazywa je lekcja definiująca (m10-l1) i reguły, a forma jest spójna z 3ベット / Cベット; zapis mieszany łaciński + katakana jest najsłabszy. Wymaga potwierdzenia przez rodzimego użytkownika (na ekranach HUD spotyka się zapis angielski) |
| T-10 | „tys. rąk” | `}}kハンド` 34 (+3 `}}k`); `}}千ハンド` 16 | nie dotyczy (zapis jednostki przy `{{n:}}`) | **`}}kハンド`** teraz (większość, w tym reguły; „100千” nie jest używane), a docelowo osobne klucze liczb w rękach albo w 万 po stronie `numbers.yaml` („10万ハンド”) — to decyzja źródła liczb, nie przekładu. To samo dla „百万” (m12-l2:112) |
| T-11 | „baza” (strategia bazowa) | `ベース` 50; `ベースライン` 14 (m10-l1 4, m10-l2 10) | brak klucza | **ベース**: forma większościowa, używana w regułach, egzaminie i lekcji m10-l3 (U-10) |
| T-12 | „profil (tiltu)” | `プロフィール` 3 (m12-l3:78, 118); `プロファイル` 2 (rules:995 profil tiltu, rules:865 pole source) | brak klucza | **プロファイル**: oznacza opis analityczny (プロフィール to raczej notka o osobie) i jest już w regułach; zmiana w m12-l3:78, 118 (3 trafienia, moduł 12 — bez zmiany sensu). Do potwierdzenia przez rodzimego użytkownika |
| T-13 | „pula po jednym podbiciu” (single-raised pot) | `シングルレイズド{{t:pot…` 7 (exams/m9:62; m9-l3:36, 45, 124; rules:776, 792; + m9-l3:48 kontekst 3ベット); `シングルレイズ(の){{t:pot…` 6 (m9-l2:65, 110; m9-l4:72, 113, 115, 130); `レイズが1回の` 5 (m9-l1:18, 28, 47, 85, 143) | brak klucza | **シングルレイズド{{t:pot\|ポット}}** (wersja L6): forma większościowa, używana w regułach i egzaminie. Skutek: w wpisach L5 m9-l2:65, 110 zmienić `nowy` na „シングルレイズドの…/シングルレイズド…”; m9-l1 ×5 („レイズが1回の”) zostawić jako opis przy pierwszym wprowadzeniu albo ujednolicić po przeczytaniu |
| T-14 | „błąd maleje z pierwiastkiem z liczby rąk” | `比例してしか` 3 (rules:839, 973, exams/m12:29); `反比例` 0 | nie dotyczy | **„平方根に反比例して”** we wszystkich trzech miejscach (błąd ∝ 1/√n; „比例して小さくなる” jest nieścisłe), a „しか” tylko tam, gdzie pl ma „dopiero” (rules:839, m12:29), bez „しか” w rules:973. Skutek: w wpisie R4 rules:973 `nowy` → „…平方根に反比例して小さくなるからです”; dodać poprawkę exams/m12.yaml:29. Dwa z trzech miejsc to moduł 12 |
| T-15 | „gra o cały stack” | `スタック全部をかけ` 15; `スタック全体を懸け` 15; `スタック全体を賭け` 9 | brak klucza | **スタック全体を懸けて** (propozycja L5): jedna z dwóch form większościowych, używana w egzaminie m9; bez „賭け”, które niesie skojarzenie z zakładem (U-11) |
| T-16 | „próg” | `しきい値` 40; `閾値` 5 (wszystkie w poprawkach L6); `損益分岐点` 4 (exams/m5:50–52); `基準` 31 (różne znaczenia; jako „próg” w m10-l4 i exams/m6:19, 48) | brak klucza | **しきい値** jako nazwa progu liczbowego; exams/m5:50–52 zmienić po przeczytaniu (tam próg opłacalności — 損益分岐点 jest merytorycznie poprawne); 基準 zostawić |
| T-17 | „z ok. X pewnością” | `信頼度` 5 (m10-l1 4, exams/m10 1); `確信度` 3 (exams/m12:7, 18, 25); `確からしさ` 2 (rules:838, 972) | brak klucza | **信頼度**: termin statystyczny dla poziomu ufności, forma większościowa; zmiana 5 miejsc (3 w module 12) |
| T-18 | payout / mixed-hand / rake-cap / polarized / texture / wetness | patrz lista „zamknięte poprawkami” wyżej; `{{t:wetness\|ウェットさ}}` 1 (m5-l3:122, w poprawkach L3) | 賞金, ミックスハンド, レーキ上限, ポラライズ, テクスチャー, ウェット度 | Nic do decyzji: poprawki L3, L5, L6, L7, E2, R3, U1 doprowadzają tekst do nazw z terms-nazwy; S1 tych nazw nie zmienia. Otwarte pytanie S1, czy ミックスハンド jest przyjęte (sekcja 5) |
| T-19 | OESD | `\|OESD}}` 11; `\|オープンエンド・ストレートドロー}}` 6 (1 w poprawkach); bez formy 6 | `null` [SKRÓT OESD] | **OESD** poza pierwszym wprowadzeniem (m2-l1:111): skrót jest nazwą wg terms-nazwy; rozwinięcie zostaje tam, gdzie termin jest definiowany (U-24) |
| T-20 | pair jako nazwa układu: ワンペア / ペア | `ワンペア` 12 (exams/m0 8, m0-l1 1, ja.json:626, 638, komentarz terms-nazwy); `{{t:pair\|ペア}}` 258 wg komentarza | `"ペア"` (komentarz: formy ペア×258, ワンペア×9) | **Dopuścić obie**: ワンペア w rankingu układów (m0, `drill.category`), ペア w pozostałych kontekstach; to przyjęta japońska nazwa układu, nie druga nazwa pojęcia |
| T-21 | „szansa trafienia” | `ヒットする確率` 9; `引ける/引く確率` 7 | brak klucza | **ヒットする確率**: używa jej egzamin m2, interfejs i odsyłacz w m2-l2 (U-14) |
| T-22 | „cena” (sprawdzenia) | `価格` 145 (lekcje, egzaminy, ja.json); `値段` 15 (tylko rules.yaml) | brak klucza | **価格**: forma lekcji, egzaminów i interfejsu; zamiana 15 miejsc w rules.yaml. R4 i U1 pytają, czy rodzimy gracz nie oczekuje „オッズ/必要勝率” — do sekcji 5 |
| T-23 | „z pozycji” (mając pozycję) | „ポジションがある状態で” (m8-l1:107 po poprawce L4, rules:662), „ポジションがある場合は” (m8-l1:131 po L4), „ポジションを持って” (m3-l2:45 po poprawce L1), `{{t:in-position\|インポジション}}` 14, `{{t:position\|インポジション}}` 0 (2 po poprawkach L6 m10-l3:75, 115) | `position: "ポジション"` (formy: インポジション×2), `in-position: "インポジション"` | **インポジション(で)** tam, gdzie pl ma znacznik, opisowe „ポジションがある状態で” tylko bez znacznika; trzy opisowe warianty z poprawek L1/L4 sprowadzić do jednego. Poprawki L6 (zmiana klucza `in-position` → `position` z formą インポジション) są zgodne z pl, ale zostawiają 12 miejsc z kluczem `in-position` — nie kolizja |
| T-24 | krótki stack: 短い / 浅い | `スタックが浅い\|浅いスタック` 1 (m11-l1:136; L7 cytuje też „スタックが浅いほど”); 短い 17 (różne znaczenia) | brak klucza | **短い** (ショートスタック) w module 11; 1–2 miejsca, niska waga |

## Do sprawdzenia przez rodzimego użytkownika

Lekcje:
- m1-l1-przebieg.md:54 — „7-2では組み立てるものがありません”: brzmi sztywno?
- m2-l1-outy.md:112 — „ストレートの穴（ガットショット）” czy „中抜けのストレートドロー（ガットショット）”?
- m2-l2-pot-odds.md:27, m6-l1-mdf-alpha.md:94, m10-l2-typy-graczy.md:82 — „オールインに/で/のレイズ” czy „レイズでオールイン”?
- m2-l2-pot-odds.md:35 — „小さなベットは良い価格を与えてくれます” (kalka).
- m3-l2-rece-startowe.md:55 — „投機的” czy „スペキュレイティブ（ハンド）”?
- m4-l1-3bet.md:16, 26, 75; m4-l2:44, 92; m6-l3:135; rules.yaml:518–519 — zapis mnożnika „3x / 4.5x” (z `formatNumber`) czy „3倍 / 3〜4.5倍”?
- m4-l3-wobec-3betu.md:26, 36, 78, 104 — „ドミネートされている/している” jako zapożyczenie (przyjęte; L2 poprawia też m4-l4:46, 48 z „支配” na „ドミネート”).
- m5-l1-tekstury.md:101, 108 — „3スートの…” czy „レインボーの…”; w l. 108 określenie może być czytane tylko dla pierwszego przykładu.
- m5-l2-przewagi.md:72 — „ハンドにすでにペアを持っている” czy „ポケットペアを持っている”?
- m5-l3:122 — „まれに” (mocniejsze) czy „低い頻度で”?
- m5-l4:103 — „ブラフは全員を通らなければならない” czy „全員に通らなければならない”?
- m6-l1:110 — „最小ディフェンス頻度” (1 wystąpienie) czy „最小防衛頻度” (0)?
- m6-l3:26, 83, 125 — rejestr „格上/格下” czy „より強い/より弱い”?
- m7-l1:13, 33; m7-l4:145; m6-l2:98; exams/m6 ×5 — „Cベット/プローブベットをベット” czy „…を打つ”?
- m7-l1:48 — „ナッツストレートへのガットショット” (interpretacja „najwyższego strita”).
- m7-l4:17 — „フロップ前に” czy „プリフロップ”?
- m8-l1:99 — „最も高いカードはクイーンだけです” czy „クイーンハイしかありません”?
- m8-l1:129 ↔ m7-l4:98 — „ミドルキッカー” / „キッカーが中程度の”.
- m8-l2:56 — „フォールドすべき頻度” czy „フォールドする必要がある頻度”?
- m8-l2:117, m8-l3:117, rules.yaml:686 — „外れたフラッシュ / 外れたストレートへのドロー” czy „外れたフラッシュドロー / ストレートドロー”?
- m8-l3:114 — „選択を傾けるものです” czy „選択を左右するものです”?
- m9-l2:46 — „ベストキッカー” czy „トップキッカー”?
- m9-l2:50 — szyk „`{{t:fold}}`を`{{t:top-pair\|トップペア}}`で選ぶと”.
- m9-l3 (opcje, tabela) ↔ m9-l4 — „約65%ポット” czy „ポットの約65%”?
- m10-l1:86 — „資金を没収する” (mocniejsze niż „zatrzymać środki”).
- m10-l1:130, m10-l3:129, m10-l4:126 ↔ m9-l3:129 — „計算によるものです” czy „純粋な数学です”?
- m10-l4:123 — „ビッグブラインドに合わせる支払いはしません” (czytelność).
- m11-l3:39 (po poprawce) — „…の賞金では” czy „賞金配分では”?
- m11-l3:161 — „ハンド” dwa razy w dwóch znaczeniach (rozdanie / ręka).
- m12-l1:83 — „収支だけではありません” („nie tylko wynik”) wobec pl „a nie sam wynik”.
- m12-l3:17, 33, 71, 114; m12-l4:51 — „焦りによるティルト” dla „tilt z desperacji” (焦り = pośpiech; może 自暴自棄 / 必死さ).
- m12-l3:125 — „弱いプレイヤーも時には勝つ必要がある” czy „…勝つものだ”?
- m12-l4:76, 133 — „弱いプレイ” czy „下手なプレイ / 質の低いプレイ”?
- m12-l4:113, 137 — spacje wokół pogrubienia przy znakach CJK (widoczny odstęp?).
- m13-l2:33–35 — „許容範囲の判断” czy dokładna nazwa werdyktu „許容”?

Egzaminy:
- m0.yaml — „エースのワンペア” czy „エースのペア” (T-20).
- m3.yaml:23, 51, 61 ↔ m4.yaml:111 — „ビッグブラインドの額だけ払う” / „後ろからリンプ” czy po prostu „リンプ/コール”?
- m3.yaml:88 — strona bierna „プレイされることもあります”.
- m5.yaml:38, 52 — „フロップに外れる/当たらない” czy „フロップを外す/でヒットしない”?
- m8.yaml:56 — „フォールドすべきハンド” czy „フォールドするハンド”?
- m11.yaml:64, 73, 75; rules.yaml:1112, 1119 — „チップを賭けたゲーム” (czy nie czyta się jak „gra na pieniądze”; może „チップEVの場面”).
- m12.yaml:29 — „平方根に比例してしか小さくなりません” (T-14).
- m13.yaml:18 — „よく読んでいる” czy „より正確に読んでいる”?
- m13.yaml:42 — „ゲームで” czy „プレイ中に” (tryb w ja.json: プレイ)?

Reguły:
- rules.yaml:80 — „フラッシュに向かうカードが…枚” czy „同じスートのカードが…枚”?
- :203 — „前のプレイヤー” (pl „wcześni gracze”).
- :258 — „アクションも締めくくれる” czy „アクションをクローズできる”?
- :273, 281 — „スーテッドのハイカード” (ハイカード to też nazwa układu).
- :461 — „大量にフォールドはしません” czy „フォールドしすぎないようにします”?
- :545 — „ハイカード付きのガットショット”.
- :560 — „単独ではほとんど勝てないハンド”.
- :603; ja.json:483 — kalka „behind”: „相手の後ろに…チップ”, „ポットの後ろには`{{have}}`bb” czy „残りスタックは…”?
- :662 — „ポジションがある状態で” czy „インポジションで” (T-23)?
- :694 — „そのスートのエース” (doprecyzowanie względem pl).
- :838 — „確からしさ” czy „信頼度/確率” (T-17)?
- :957, 965, 972, 1029 — „100kハンド” czy „10万ハンド” (T-10)?
- :980, 1135, 1136; ja.json:773–776 — „値段/価格” czy „オッズ/必要エクイティ/必要勝率” (T-22)?
- :996 ↔ m12-l3:60, 124 — „深呼吸” czy „呼吸/ひと呼吸”?
- :1005 — „最悪のレベル（Cゲーム）” bez „自分の”.
- :1058 (source) — „均衡による範囲” wobec pl „przedział od równowagi”.
- :1071 — „勝ち目のないハンドだけなら” (ryzyko odczytu „gdyby były tylko takie ręce”).
- Pola `source` (:25, 33, 338, 363 i dalej) — mieszanka znaków pełnej i połówkowej szerokości (niewyświetlane).

Słowniki i helplines:
- terms-nazwy.yaml:47–48 — HJ/CO czy ハイジャック/カットオフ (T-08)?
- :15 — wheel `null` czy „ホイール” (0 wystąpień)?
- :64 — „ミックスハンド” (termin rzadki; opisowo „混合戦略でプレイするハンド”).
- :122 — „破産リスク” (7 wystąpień) czy „破産確率” (0)?
- terms-def.yaml:30, 47 — „円盤”; przy Buttonie „ディーラーボタン”?
- terms-def.yaml:99 — „カードが当たれば” czy „ドローが完成すれば”?
- helplines.yaml:16 — „ご自身” i „あなた” w jednym akapicie.
- Nazwy 19 terminów z `null` wpisywane przez S1 oraz „Button → ボタン” przy `button: "BTN"` (T-07, T-08).

Interfejs i sklep:
- ja.json:626, 638 — „ワンペア” (T-20).
- ja.json:824 — „ペアボードのフロップ” (tautologia z nazwy terminu).
- ja.json:869 — sklejka „高い、レインボー、ペアボードなので、ドライです”.
- Sklep, podtytuł — „判断ごとに評価と解説、賭けなし” (adaptacja ASO; informacja o braku stawek zachowana).

## Pytania do źródła pl

1. `content/pl/lessons/m5-l1-tekstury.md:108` — przykład mokrego flopu „T-9-5-4” ma cztery karty; celowy (stół z turnu) czy pomyłka? (L2)
2. `content/pl/lessons/m4-l2-obrona-bb.md:92` — „3-bet i call są ze sobą powiązane”: z kontekstu i en znaczy „pokazane łącznie”; doprecyzować? (L2)
3. `content/pl/lessons/m6-l2-sprawdzenie.md:65`, `m6-l3-check-raise.md:26, 93, 123` — w wyliczeniu drawów znacznik `{{t:flush}}` (gotowy układ) zamiast `{{t:flush-draw}}`. (L3)
4. `content/pl/lessons/m5-l3:26` ↔ `m5-l4:85` (to samo ćwiczenie cbet): „spasuje mniej więcej te same ręce” / „nie spasuje więcej rąk”; oraz `m5-l3:39` ↔ `m5-l4:91` („po wcześniejszym czekaniu (check-raise)” / „(check-raise)”) — czy kopie mają się różnić? (L3)
5. `content/pl/lessons/m6-l1:27, 92, 94; m6-l2:54, 76; m6-l3:23, 26, 122` — „set”, „kicker”, „gutshot”, „backdoor”, „implied odds”, „all-in”, „equity”, „showdown”, „outów” bez znaczników `{{t:…}}`, choć klucze istnieją. (L3)
6. `content/pl/lessons/m7-l1-druga-beczka.md:76` — „Taki bet zarabia na lepszych rękach” (dwuznaczne). (L4)
7. `content/pl/lessons/m7-l2-polaryzacja.md:65` — „zarabiasz głównie od rąk, które cię biją” (zamierzone: „płacą ci głównie ręce, które cię biją”). (L4)
8. `content/pl/lessons/m8-l1-value.md:33` — „bez dopłaty od lepszych” (zamierzone: „bez dopłacania lepszym rękom”). (L4)
9. `content/pl/lessons/m9-l4-plan-trzech-ulic.md:17` — znacznik `{{t:board|stole}}` w idiomie „zostawia na stole większość wartości”; czy zamierzony? W przekładach wymusza kalkę. (L6)
10. `content/pl/lessons/m10-l3-odejscie-od-bazy.md:49`, `content/pl/exams/m10.yaml:63`, `content/pl/rules.yaml:906` — „łączy wszystkie rozmiary i stoły”: „stoły” = boardy (lekcja l. 109: „rozmiary i flopy”) czy stoły do gry? en ma „tables” (prawdopodobnie ten sam błąd); od odpowiedzi zależy poprawka E2 i brakująca poprawka w m10-l3:49. (L6, E2)
11. `content/pl/rules.yaml:662` (R-M8-003) — „przy ryzyku check-raise'u z pozycji”: czy „z pozycji” dotyczy betującego, czy check-raise'u? (R3)
12. `content/pl/rules.yaml:772` (R-M9-004, source) — „pula przed nadwyżką”: niejasny skrót. (R3)

Bez pytań: L1, L5, L7, L8, E1, R1, R2, R4 (tylko uwaga porządkowa o komentarzach YAML), S1, U1.

## Treść krytyczna (moduł 12, helplines, sklep, interfejs)

| Zakres | Kto | Co porównano zdanie po zdaniu | Wynik |
|---|---|---|---|
| Lekcje m12-l1…l4 | subagent L8 | Każde zdanie 4 lekcji: liczby (`{{n:}}` i słowne), warunki i granice („co najmniej”, „najpóźniej”, „najwcześniej”, „nigdy”), poprawne odpowiedzi, ramka „Odpowiedzialna gra” (5 sygnałów, `{{helplines}}`), odsyłacze do ekranu „Pomoc” | Brak KRYT i WYS; 1 ŚR (zgubione „nigdy”, l4:141), 1 NISKIE (l2:97) — obie z poprawką |
| exams/m12.yaml | subagent E2 | 10 pytań (l. 7–93): liczby, `correct: true`, warunki, zdanie ochronne q9 (l. 82), typy tiltu, sygnały ostrzegawcze | 1 ŚR (dodane „続けて”, l. 62) z poprawką; poza tym zgodne |
| rules.yaml R-M12-001…009, 011, 012 (l. 953–1040) | subagent R4 | Pola if/then/because/source: liczby, wzory, warunki i granice | 2 ŚR, 2 NISKIE z poprawką; nic pominiętego ani złagodzonego poza nimi. Uwaga: poprawka :973 koliduje merytorycznie z R3 :839 (T-14) |
| lessons/m13-l1 (odwołanie do R-M12-004) | subagent L7 | Zadanie `m13.l1.q-result` i uzasadnienia | Zgodne z pl |
| helplines.yaml | subagent S1 | Pola nieprzekładalne (daty, claim, id, nazwa, adres, cytaty źródeł), `pointer`, `fallback.text` (oba zdania), `regions_label`, `info`; numerów telefonów nie ma ani w pl, ani w ja | Brak znalezisk |
| Interfejs (ja.json) | subagent U1 | `welcome.noMoney`, `help.link`, `help.intro`, `help.call*`, `help.open*`, `play.format`, `play.report.result/variance`, `advancement.gameExplain` | Zgodne; nic zmienionego ani złagodzonego |
| Sklep (store/app-store-metadata.json, `lokalizacje.ja`) | subagent U1 | name, subtitle, keywords, promotionalText, description: zdanie „nauka, nie hazard” (3 elementy), tekst promocyjny, sekcje „ODPOWIEDZIALNIE” i „DOSTĘP”; limity 19/30, 15/30, 42/100 | Zgodne; 4 poprawki dotyczą nazw planów i listy werdyktów, nie zdań o hazardzie. Brak lokalizacji ja w `store/iap-localizations.json` |

Poprawki z `poprawki-ja.json` dotyczące treści krytycznej:

| plik:linia | Waga | Część | Czego dotyczy |
|---|---|---|---|
| lessons/m12-l4-bankroll.md:141 | ŚR | L8 | Przywrócone „nigdy” („決して…下回らないようにします”) przy minimalnym udziale nauki |
| lessons/m12-l2-decyzja-wynik.md:97 | NISKIE | L8 | „ポット全額のベットにコールする” (doprecyzowanie) |
| exams/m12.yaml:62 | ŚR | E2 | Usunięte „続けて” (pl bez „z rzędu”) |
| rules.yaml:973 (R-M12-003) | ŚR | R4 | Usunięte „しか…ない” (pl bez „dopiero”); sprzeczne z R3 :839 co do 比例/反比例 — T-14 |
| rules.yaml:996 (R-M12-006) | ŚR | R4 | Przywrócone „dlaczego” („なぜこれが…なのかを思い出させる”) |
| rules.yaml:981 (R-M12-004) | NISKIE | R4 | „regularnie”: 定期的に → 一定の割合で |
| rules.yaml:1036 (R-M12-012) | NISKIE | R4 | Jawne „決して” (zgodne z poprawką L8 m12-l4:141) |
| store/app-store-metadata.json:29 | ŚR | U1 | Lista 4 werdyktów dopisana do opisu |
| store/app-store-metadata.json:29 | ŚR | U1 | „買い切り（無期限）” → „購入の永久アクセス” (nazwa planu jak w `purchase.*`) |
| store/app-store-metadata.json:29 | NISKIE | U1 | „四半期または年間” → „3か月または1年” |
| store/app-store-metadata.json:29 | NISKIE | U1 | „上達度スコア” → „上達スコア” |
| ja.json:96 | WYS | U1 | `data.replaceBody`: odwrócony kierunek zastąpienia postępu w oknie potwierdzenia importu (dane użytkownika; jedyne znalezisko WYS przeglądu) |
| ja.json:794, 796, 825, 827, 860 | ŚR | U1 | Formy connected / disconnected do nazw z terms-nazwy (:860 zależne od T-01) |
| ja.json:862 | ŚR | U1 | テクスチャ → テクスチャー |

Poprawek do `helplines.yaml` nie ma. Pozostałe poprawki R4 (rules.yaml:1048 R-M11, :1147 i :1164 R-M13) są poza modułem 12. Jeśli przyjęte zostaną T-10, T-12, T-14 i T-17, dojdą zmiany w module 12 (jednostka „千/k”, プロフィール/プロファイル, 比例/反比例, 確信度/信頼度) — żadna nie zmienia liczby, warunku ani zalecenia.
