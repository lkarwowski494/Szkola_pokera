# zh-Hant · AP — poprawki sesji nadrzędnej po rozstrzygnięciach terminologicznych (2026-11-10)

Pliki: `czesci/AP.json` (126 poprawek: ŚR 96, NISKIE 30), `wykluczenia.json` (10 wpisów części usuniętych albo zastąpionych). Każda poprawka sprawdzona na linii zh-Hant i odpowiadającej linii pl (`content/pl/…`, ten sam numer linii; `terms-nazwy.yaml` nie ma odpowiednika pl). Każde `stary`: jedna linia, dokładnie jedno wystąpienie w pliku na HEAD, bez nachodzenia na nie wykluczone poprawki innych części. Jedna poprawka na linię; gdy linia ma kilka zamian, `stary` obejmuje fragment od pierwszej do ostatniej (5 poprawek realizuje dwa rozstrzygnięcia naraz i jest liczonych w obu wierszach tabeli: m10-l3:111 S-5 + solver; m6-l3:125 solver + 莊位; m7-l1:48, 128, 137 solver + outs — suma wierszy 131, poprawek 126).

Numeracja S-… jak w zleceniu sesji nadrzędnej (S-6 = „na każdej ulicy”, S-7 = set; w `podsumowanie.md` te dwie mają numery odwrotne). Skróty ścieżek: `lessons/…`, `exams/…`, `rules.yaml` = `content/zh-Hant/…`; UI = `apps/mobile/src/i18n/locales/zh-Hant.json`.

## Rozstrzygnięcia → poprawki

| Rozstrzygnięcie | Poprawek AP | Miejsca (plik: linie) | Wykluczone wpisy części | Pominięte / bez zmiany (powód) |
|---|---|---|---|---|
| S-1 gutshot: 卡順 zostaje w interfejsie | 0 | — | U1 UI:765 „"drawGutshot": "卡順聽牌"”; U1 UI:826 „（兩頭順或卡順）” | `gutshot: null` w terms-nazwy bez zmian (K-05) |
| S-2 „do rivera” = 到河牌為止 | 2 | lessons/m9-l2-zaangazowanie.md: 110; lessons/m7-l3-implied-odds.md: 13 | L5 m9-l2:110 „要在河牌前把整個籌碼量打進去” (zastąpiony) | 5 miejsc z „在河牌前” zostaje, bo pl ma tam „przed riverem”, nie „do rivera”: exams/m7.yaml:47, lessons/m7-l2-polaryzacja.md:46, 117, rules.yaml:570 („zbudować pulę przed riverem”), UI:771 („przed riverem zwykle zapłacisz kolejną cenę”). Z listy R3 (7 miejsc): m9-l3:129 i m9-l4:53 mają już poprawki L6, m9-l2:110 → AP, pozostałe 4 jak wyżej. Dodatkowo znalezione poza listą: m7-l3:13 (pl „szans na kolor do rivera”) |
| S-3 „wysokie karty” = 高牌 | 0 | — | E1 exams/m5.yaml:22 „高牌較多” (wpis nie zawierał innych zmian, bez zastępstwa) | — |
| S-4 limp = 溜入 | 5 | exams/m3.yaml: 23, 51, 61; exams/m11.yaml: 11; lessons/m3-l1-pozycja.md: 37 | — | Dopiski definicyjne zostają: m3-l1:27 „只補齊盲注（limp）”, m4-l4:61 „溜入（limp）”, rules.yaml:149 „（溜入，limp）”. limper: **bez ujednolicenia** — warunek „溜入玩家 w mniejszości” nie jest spełniony: 溜入玩家 22 (wszystkie w m4-l4, w tym tytuł lekcji) wobec 溜入者 5 (+5 po poprawkach E1 w exams/m4); do decyzji, w którą stronę |
| S-5 mikrostawki = 微級別 | 8 | lessons/m10-l3-odejscie-od-bazy.md: 75, 111, 115; lessons/m12-l1-wariancja.md: 74, 93, 100; lessons/m4-l4-limperzy.md: 61; lessons/m8-l2-ile-blefow.md: 142 | — (L4 m7-l4:145 zostaje) | m12-l1 to treść krytyczna: zmienia się tylko nazwa „微注級別” → „微級別”, liczby i warunki bez zmian. rules.yaml:472 „低級別” (pl „niskie stawki”) — inne pojęcie, bez zmian |
| S-6 „na każdej ulicy” = 每條{{t:street\|街}} | 3 | exams/m5.yaml: 59; lessons/m7-l4-probe-obrona.md: 28; lessons/m13-l3-przeglad.md: 80 | E1 exams/m5.yaml:59 „每一{{t:street\|輪}}”; L4 m7-l4:28 „每一{{t:street\|輪}}按鈕位”; L7 m13-l3:80 „每一{{t:street\|輪}}的” (wszystkie zastąpione) | Grep: 每條{{t:street\|街}} 23, 每一{{t:street\|街}} 5, 每一{{t:street\|條街}} 2, 每一條{{t:street\|街}} 2 → wybrana 每條. Poza trzema miejscami zlecenia 9 wariantów zostaje bez zmian: m6-l2:116, m9-l4:16 (每一條), m9-l1:73, 107 (每一…條街), rules.yaml:427, 778, 785, 794, 810 (每一…街) |
| S-7 set = 暗三條 | 19 | exams/m10.yaml: 43; lessons/m8-l1-value.md: 50, 51, 70, 81; lessons/m9-l2-zaangazowanie.md: 30, 59, 69 (三條 → 暗三條); lessons/m7-l2-polaryzacja.md: 15, 22, 27, 41, 44, 46, 78, 111; rules.yaml: 502, 801, 817 (暗三 → 暗三條) | — (S1 terms-nazwy:10 zostaje) | 三條 = three-of-a-kind bez zmian (m0, m4-l1:48, m5-l1:47, rules:29, 402 i in.); 三條{{t:street\|街}} = „trzy ulice” (m9-l2:104, rules:801, 808) bez zmian; rules.yaml:363 „暗三” w polu `source` (niewyświetlane); łacińskie „set” w m4-l1:48 „擊中 set（…做成的三條）” i m5-l1:49 „set（暗三條）” — objaśnienia przy pierwszym użyciu, poza listą zlecenia, bez zmian |
| S-8 tilt = 上頭 | 0 (nazwa w T-12) | — | — | R4, L8 zostają; opis sklepu bez zmian |
| S-9 board = 牌面 | 2 | exams/m5.yaml: 14; terms-nazwy.yaml: 27 | E1 exams/m5.yaml:14 „{{t:board\|公牌}}” (zastąpiony: 公共牌 → 牌面) | m7-l4:66: pl „wysoki {{t:board}}” = board, poprawka L4 daje już 牌面 — zostaje. E2 exams/m10:63 i L6 m10-l3:49 zostają. **terms-nazwy:27 `board: "公共牌"` → `"牌面"` dopisane jako konsekwencja S-9, ale niewymienione wprost w zleceniu — do potwierdzenia** (zmienia wyświetlanie 4 znaczników `{{t:board}}` bez formy: exams/m0:51, exams/m7:83, m0-l1:81, m9-l1:83; m0-l1:81 dziś wyświetla „公共牌上會發出 5 張公共牌”). Nie zmieniano 54 form `{{t:board\|公共牌}}` ani `{{t:board\|牌桌上}}` (m9-l4:17), `{{t:board\|公共牌面}}` (rules:37) |
| S-10 connected | 0 | — | — | nie generowano |
| S-11 akcja = 行動 | 5 | exams/m13.yaml: 26, 27, 34, 35, 36 | E2 exams/m13.yaml:26 „採用的動作才算一致” (zastąpiony: 行動 + 吻合) | Grep: 行動 99 + UI 11, 動作 30 + UI 1. Zastąpiony odstający wpis i ujednolicony cały egzamin m13 (te same zdania o werdyktach). Pozostałe 動作 (24 w treści: „動作正確/動作對” ×12 w m4, m5, m6, m8; „可用的動作” m1-l1; m3-l1, m5-l4, m13-l2:77, terms-def:39–41, exams/m1:17; UI:96 „此動作無法復原” = operacja w aplikacji) bez zmian — poza zleceniem |
| solver → 求解器 | 39 (47 wystąpień) | exams/m11.yaml: 9, 48, 51, 52; lessons/m10-l3: 22, 33, 99, 111, 129; m13-l1: 34, 36, 38, 47, 52, 63, 65, 74, 90, 91, 92, 93, 101, 108; m3-l1: 69; m5-l4: 35, 36, 37, 56, 57, 106; m6-l1: 132; m6-l3: 17, 83, 125; m7-l1: 48, 128, 137; m8-l3: 117; m9-l2: 113 | L7 m13-l1:36 „{ text: "一致", correct: true, why: "對：solver” (to samo miejsce; zmiana 一致 → 吻合 przeniesiona do połączonej poprawki AP) | 解算器 ×2 (m8-l1:131, 138) ma poprawki L4. Bez zmian: pola `source`/`sources`, `kind: solver-pub/solver-app`, klucze `{{n:…solver…}}`, klucze JSON interfejsu, adresy |
| all-in → 全下 | 4 | lessons/m2-l1-outy.md: 44, 55, 123, 131 | — | m1-l1:96 „全下（all-in）” — objaśnienie przy pierwszym użyciu, zostaje |
| 莊位 → 按鈕位 | 22 (24 wystąpienia) + nazwa w terms-nazwy: 1 | lessons/m6-l3-check-raise.md: 16, 23, 26, 27, 33, 41, 44, 49, 54, 62, 82, 93, 94, 102, 103, 116, 123, 125, 129, 130, 131, 135; terms-nazwy.yaml: 49 (`button: "BTN"` → `"按鈕位"`) | — (L3 m6-l3:99, 109 zostają) | **NIE DA SIĘ w tym formacie: m6-l3:13, 59, 69, 79, 89 — pięć identycznych linii `prompt` (po 2 × 莊位, razem 10 wystąpień); jednoliniowy `stary` nie może wystąpić w pliku dokładnie raz.** Do wykonania skryptem po nałożeniu poprawek: `sed -i '13s/莊位/按鈕位/g;59s/莊位/按鈕位/g;69s/莊位/按鈕位/g;79s/莊位/按鈕位/g;89s/莊位/按鈕位/g' content/zh-Hant/lessons/m6-l3-check-raise.md` (pl we wszystkich pięciu: „przeciw otwarciu Buttona … Button stawia c-bet”). Trzy `{{t:button\|BTN}}` w m3-l1 zostają |
| outs → 補牌 | 9 (13 wystąpień) | lessons/m7-l1-druga-beczka.md: 48, 65, 66, 95, 103, 128, 137; m10-l3: 58; m5-l1: 47 | — | m7-l1:37, 57, m7-l2:44, 117 (L4), exams/m6:76 (E1) mają już poprawki. m5-l1:47: usunięty dopisek „（outs）” („補牌（outs）很少” → „補牌很少”, pl „mało outów”). Bez zmian: `generator: outs`, klucze `{{n:outs.…}}`, parametr `{{outs}}`, pola `source` |
| `{{t:prize-pool\|獎池}}` w exams/m11.yaml:57 | 1 (2 znaczniki) | exams/m11.yaml: 57 | — | Względem pl to nie zdublowanie: pl ma w tym zdaniu także dwa znaczniki `{{t:prize-pool\|puli nagród}}`. Poprawiona tylko forma 獎池 → 獎金池 (nazwa z terms-nazwy, jak poprawki U1/S1) |
| 教學網站 → 訓練網站 | 1 | lessons/m11-l1-push-fold.md: 152 | — | **NIE DA SIĘ w tym formacie: UI:232 i UI:243 `"training": "教學網站",` to dwie identyczne linie** (pl: „serwis szkoleniowy” / „serwisy szkoleniowe” — to samo słowo co w rules, więc zmiana zasadna). Do wykonania ręcznie albo `sed -i '232s/教學網站/訓練網站/;243s/教學網站/訓練網站/' apps/mobile/src/i18n/locales/zh-Hant.json`. m11-l1:152 (pl „tabela z serwisu szkoleniowego”) dopisane dla zgodności z m11-l2:140 |
| nazwy dla terminów z `null` (T-12) | 10 | terms-nazwy.yaml: 21 check-raise = 過牌加注; 33 stack = 籌碼量; 56 backdoor = 後門; 57 pot-odds = 底池賠率; 103 bluff-catcher = 抓詐唬牌; 116 tilt = 上頭; 123 mental-game = 心態; 135 ante = 前注; 137 fold-equity = 棄牌權益; 148 heads-up = 單挑 | — | **kicker: pominięty** — grep nie potwierdza przewagi 踢腳牌: 踢腳牌 12 (lekcje/egzaminy 8, rules 4) wobec 踢腳 bez 牌 49 („踢腳好的頂對”, „踢腳較弱” itd.); do decyzji (pytanie N-3). gutshot: bez zmian (S-1). Zmienia się tylko `null` → `"…"`, komentarz po # zostaje. Jedyny znacznik bez formy wśród tych kluczy: `{{t:mental-game}}` w m12-l3:94 (treść krytyczna) — po zmianie wyświetli „你在心態（也就是處理上頭、情緒和專注力）上下的功夫” (pl „pracy nad mental game (czyli…)”) |

Liczby z grep (tekst wyświetlany: lekcje + egzaminy + modules + terms-def / pola if-then-because reguł / UI), forma chińska wobec łacińskiej: 過牌加注 58 : 7 · 前注 43 : 1 · 抓詐唬牌 35 : 3 · 後門 12 : 1 · 底池賠率 8 : 0 · 棄牌權益 7 : 0 · 籌碼量 78 : 2 · 單挑 4 : 0 · 心態 3 (tytuł m12, m13-l1:80, UI) : 0 · 上頭 56 : 2 · 按鈕位 335 : `{{t:button|BTN}}` 3.

## Wykluczenia (wykluczenia.json)

| # | Część | plik:linia | `stary` wykluczonego wpisu | Powód |
|---|---|---|---|---|
| 1 | U1 | UI:765 | "drawGutshot": "卡順聽牌" | S-1, bez zastępstwa |
| 2 | U1 | UI:826 | （兩頭順或卡順） | S-1, bez zastępstwa |
| 3 | L5 | lessons/m9-l2-zaangazowanie.md:110 | 要在河牌前把整個籌碼量打進去 | S-2, zastąpiony AP m9-l2:110 (到河牌為止) |
| 4 | E1 | exams/m5.yaml:22 | 高牌較多 | S-3, bez zastępstwa |
| 5 | E1 | exams/m5.yaml:59 | 每一{{t:street\|輪}} | S-6, zastąpiony AP exams/m5:59 |
| 6 | L4 | lessons/m7-l4-probe-obrona.md:28 | 每一{{t:street\|輪}}按鈕位 | S-6, zastąpiony AP m7-l4:28 |
| 7 | L7 | lessons/m13-l3-przeglad.md:80 | 每一{{t:street\|輪}}的 | S-6, zastąpiony AP m13-l3:80 |
| 8 | E1 | exams/m5.yaml:14 | {{t:board\|公牌}} | S-9, zastąpiony AP exams/m5:14 (牌面) |
| 9 | E2 | exams/m13.yaml:26 | 採用的動作才算一致 | S-11, zastąpiony AP exams/m13:26 (行動 + 吻合) |
| 10 | L7 | lessons/m13-l1-raport.md:36 | { text: "一致", correct: true, why: "對：solver | to samo miejsce co AP m13-l1:36 (solver → 求解器); zmiana L7 一致 → 吻合 przeniesiona bez zmian do połączonej poprawki AP |

Drugi wpis L5 na m9-l2:110 (尺度 → 尺寸), drugi wpis L7 na m13-l1:36 („採取的行動就算一致” → 吻合) i pierwszy wpis E2 na exams/m13:26 (`text: "一致"` → 吻合) zostają — nie nachodzą na poprawki AP.

## Uwagi do poszczególnych zamian

- exams/m3.yaml:23, 51, 61: opcja `text: "平跟{{t:big-blind|大盲}}"` (pl „Dopłacam do dużego blinda”, opis bez słowa limp) → `補齊{{t:big-blind|大盲}}`, czyli dokładnie tak, jak ta sama opcja w lekcji m3-l1:27, 37; „溜入大盲” byłoby niegramatyczne. W uzasadnieniach 平跟 → 溜入 (pl „Limp oddaje…”, „Dopłata oddaje…”); :61 „會平跟部分手牌” → „會用部分手牌溜入” (jak rules.yaml:149).
- exams/m11.yaml:11: „平跟（limp），便宜看翻牌” → „溜入，便宜看翻牌” (łaciński dopisek zdjęty; pl „Limp, żeby tanio zobaczyć flop”).
- solver, outs, all-in: przy zamianie zdjęte spacje między znakiem CJK a słowem łacińskim („已公開的 solver 範例” → „已公開的求解器範例”); spacja przed `{{n:…}}` i cyframi zostaje („求解器約用 {{n:…}}”).
- m7-l1:128, 137: „沒有 outs 的牌” → „沒有補牌的牌” (tak samo jak poprawka L4 w m7-l1:57 „沒有補牌的{{t:bluff|詐唬}}”).
- Poprawki S-5 w m12-l1 (74, 93, 100) i nazwy tilt/mental-game dotyczą modułu 12 (treść krytyczna): wyłącznie terminologia.
- Ostrzeżeń `zloz.mjs` o znacznikach dla wpisów AP: 0.

## Nie generowano (zgodnie ze zleceniem)

c-bet → 持續下注, bad beat, connected (S-10), moduł (單元/模組), populacja (族群), rozmiar (尺度), siatka zakresu, opis sklepu (w tym „情緒失控（tilt）”), nazwa gutshot w terms-nazwy.

## Sprawy nierozstrzygnięte mechanicznie (do decyzji sesji nadrzędnej)

1. m6-l3:13, 59, 69, 79, 89 — 10 × 莊位 w pięciu identycznych liniach (wymaga `sed` po numerze linii, komenda w tabeli).
2. UI:232, 243 — 教學網站 w dwóch identycznych liniach (jak wyżej).
3. limper: 溜入玩家 (22) nie jest mniejszością wobec 溜入者 (10 po poprawkach) — nie ujednolicono.
4. kicker: nazwa nie dopisana (踢腳 49 > 踢腳牌 12).
5. terms-nazwy:27 `board: "牌面"` — dopisane, do potwierdzenia (łatwe do usunięcia: jeden wpis AP).
6. S-6 i S-11 wykonane w zakresie zlecenia (trzy miejsca; egzamin m13); w korpusie zostają inne warianty „每一…街” (9) i 動作 (24).

## Wynik kontroli

`node docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/zloz.mjs zh-Hant` — kod wyjścia 0:

```
zh-Hant: poprawek 347 {"KRYT":0,"WYS":0,"ŚR":258,"NISKIE":89}; części bez wyniku: —
```

ODRZUCONA: 0, KOLIZJA: 0, OSTRZEŻENIE: 11 (żadne nie dotyczy AP; te same co przed AP), wykluczenia dopasowane: 10 z 10. Rozkład: AP ŚR 96, NISKIE 30.

Symulacja nałożenia wszystkich poprawek z `poprawki-zh-Hant.json` w pamięci (kolejno, każde `stary` dokładnie raz w bieżącym tekście), potem grep po tekście wyświetlanym `content/zh-Hant/**` i UI (bez komentarzy YAML, pól `source/sources/id/family/check/params/spot/generator/kind`, kluczy znaczników i adresów):

```
symulacja: poprawek 347, plików 58, nieudanych 0
平跟: 0
跛入: 0
莊位: 10 → m6-l3-check-raise.md:13, 59, 69, 79, 89 (po 2; identyczne linie, zob. wyżej)
在河牌前: 5 → exams/m7.yaml:47, m7-l2:46, 117, rules.yaml:570, UI:771 (wszystkie pl „przed riverem”; w znaczeniu „do rivera”: 0)
łac. solver: 0
解算器: 0
łac. limp: 3 → m3-l1:27, m4-l4:61, rules.yaml:149 (dopiski definicyjne)
łac. all-in: 1 → m1-l1:96 (objaśnienie)
łac. outs: 0
微注: 0
暗三 bez 條: 0
獎池: 0
教學網站: 2 → UI:232, 243 (identyczne linie, zob. wyżej)
動作 w exams/m13: 0
三條 w znaczeniu set w m8-l1, m9-l2, exams/m10: 0 (zostaje m9-l2:104 „三條街” = trzy ulice)
卡順 w UI: 2 (765, 826 — zostaje zgodnie z S-1)
```
