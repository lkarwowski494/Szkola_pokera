# ja · AP — poprawki sesji nadrzędnej po rozstrzygnięciach terminologicznych (2026-11-10)

Pliki: `czesci/AP.json` (91 poprawek: ŚR 56, NISKIE 35), `wykluczenia.json` (11 wpisów części usuniętych albo zastąpionych). Każda poprawka sprawdzona na linii ja i odpowiadającej linii pl (`content/pl/…`, ten sam numer linii; `terms-def.yaml` nie ma odpowiednika pl w tym katalogu — porównano z wpisem S1). Każde `stary`: jedna linia, dokładnie jedno wystąpienie w pliku na HEAD, bez nachodzenia na nie wykluczone poprawki innych części. Jedna poprawka na linię; gdy linia ma kilka wystąpień, `stary` obejmuje fragment od pierwszego do ostatniego.

Skróty ścieżek jak w `podsumowanie.md`.

## Rozstrzygnięcia → poprawki

| Rozstrzygnięcie | Poprawek AP | Miejsca (plik: linie) | Wykluczone wpisy części | Pominięte / bez zmiany (powód) |
|---|---|---|---|---|
| a) semi-connected = セミコネクテッド | 5 | lessons/m5-l3-czestotliwosc-rozmiar.md: 126; rules.yaml: 358; ja.json: 795, 826, 860 | L2 lessons/m5-l1-tekstury.md „**{{t:semi-connected\|セミコネクテッド}}**なフロップは”; L2 lessons/m5-l1-tekstury.md „（{{t:semi-connected\|セミコネクテッド}}なフロップ、または”; U1 ja.json „{{t:connected\|コネクト}}、{{t:semi-connected\|セミコネクト}}、{{t:disconnected\|ディスコネクト}}” | — (terms-nazwy.yaml:83: nazwę zmienia poprawka S1; komentarz YAML w tej linii „formy: セミコネクト×5” zostaje, niewyświetlany) |
| b) connected = コネクテッド(な) | 8 (w tym 2 wspólne z a: m5-l3:126, rules.yaml:358) | lessons/m5-l3-czestotliwosc-rozmiar.md: 126; rules.yaml: 358, 509; exams/m6.yaml: 94; lessons/m6-l3-check-raise.md: 16, 17, 125, 130 | — (ja.json:860 liczony w a) | — (ja.json:794, 825 → U1; m5-l2:88 → L2; exams/m5.yaml:22 → poprawka połączona w g; komentarz terms-nazwy.yaml:81 zostaje) |
| c) single-raised pot = シングルレイズド | 2 | lessons/m9-l2-zaangazowanie.md: 65, 110 | L5 lessons/m9-l2-zaangazowanie.md „シングルレイズの{{t:pot\|ポット}}、スタック”; L5 lessons/m9-l2-zaangazowanie.md „シングルレイズの{{t:pot\|ポット}}では” | m9-l1:18, 28, 47, 85, 143 „レイズが1回の” (opis przy pierwszym wprowadzeniu; poza rozstrzygnięciem c, bez zmian) |
| d) 反比例 | 2 | rules.yaml: 973; exams/m12.yaml: 29 | R4 rules.yaml „ハンド数の平方根に比例してしか小さくならないからです” | lessons/m12-l1-wariancja.md:49, 118 „誤差は…平方根に比例して小さくなります” — to samo sformułowanie (pl bez „dopiero”), ale rozstrzygnięcie d wymienia tylko rules.yaml:973 i exams/m12.yaml:29; moduł 12 = treść krytyczna, więc nie rozszerzano — do decyzji sesji AP (propozycja: „反比例して小さくなります”). m12-l1:22 „標準偏差は…平方根に比例して大きくなります” jest poprawne (SD rośnie) |
| e) board: テーブル → ボード | 1 | lessons/m10-l3-odejscie-od-bazy.md: 49 | — | — |
| f) offsuit = オフスート | 3 | rules.yaml: 257, 273, 274 | — | — (m3-l3:47, 84, 87 → L1; exams/m3.yaml:21, 31, 49 → E1; innych „オフスーツ” w content/ja, ja.json i store nie ma) |
| g) 手 → ハンド | 55 | exams/m5.yaml: 13, 22, 31, 32, 33, 38, 47, 52, 59, 60, 61, 66, 68, 69, 70, 75, 78, 79, 80, 88, 89, 90; exams/m11.yaml: 7, 9, 23, 27, 32, 34, 48, 50, 51, 52, 76, 84, 86; lessons/m7-l4-probe-obrona.md: 26, 27, 36, 56, 57, 67, 76, 78, 88, 98, 106, 107, 122, 127, 129, 130, 132, 139, 145; terms-def.yaml: 91 | E1 exams/m5.yaml „低く{{t:connected}}のフロップは”; E1 exams/m5.yaml „勝ち目のない手で”; E1 exams/m5.yaml „text: "手を諦めるわけではない”; E1 exams/m5.yaml „やめるのはどの手ですか”; S1 terms-def.yaml „そのボードでその時点で最も強い手です。” | lessons/m7-l4-probe-obrona.md:48 „{{t:pot\|ポット}}を手放すことになります” (手放す = oddać, pl „oddaje pulę”) — bez poprawki; exams/m11.yaml:7 „手放すには強すぎ” (pl „za dobra, żeby ją oddać”) — zostaje, w tej samej linii „あなたの手は” zamienione. „相手” wszędzie bez zmian. Poza zakresem g (bez zmian): pozostałe „手” w terms-def.yaml (38, bywa „układ/役”), m9-l2, m8-l3, m7-l3 |
| h) baza = ベース | 14 | lessons/m10-l1-statystyki.md: 67, 69, 87, 89; lessons/m10-l2-typy-graczy.md: 52, 61, 70, 80, 99, 105, 108, 130, 137, 139 | — (m10-l1:87: wpis L6 dotyczy innego fragmentu linii, bez kolizji) | — |
| i) profil tiltu = プロファイル | 2 | lessons/m12-l3-tilt.md: 78, 118 | — | — |
| j) condensed = コンデンスド; rake-cap = レーキ上限 | 1 | rules.yaml: 427 | — | rake-cap: 0 nowych — oba „レーキキャップ” mają już poprawki (exams/m10.yaml:80 E2, rules.yaml:947 R3); `{{t:rake-cap\|上限}}` w m10-l4:49 dopuszczalne; komentarze terms-nazwy.yaml:97, 164 zostają |

Suma: 91 poprawek (2 poprawki realizują jednocześnie a i b: m5-l3:126, rules.yaml:358; w tabeli liczone w obu wierszach). Rozkład g: exams/m5.yaml 22, exams/m11.yaml 13, lessons/m7-l4 19, terms-def.yaml 1.

## Wykluczenia (wykluczenia.json)

| # | Część | plik | `stary` wykluczonego wpisu | Powód |
|---|---|---|---|---|
| 1 | L2 | lessons/m5-l1-tekstury.md | **{{t:semi-connected\|セミコネクテッド}}**なフロップは | a: wpis zmieniał formę セミコネクテッド → セミコネクト, czyli w kierunku odwrotnym do przyjętej nazwy semi-connected = セミコネクテッド; tekst m5-l1:74 zostaje bez zmiany |
| 2 | L2 | lessons/m5-l1-tekstury.md | （{{t:semi-connected\|セミコネクテッド}}なフロップ、または | a: wpis zmieniał formę セミコネクテッド → セミコネクト, czyli w kierunku odwrotnym do przyjętej nazwy semi-connected = セミコネクテッド; tekst m5-l1:84 zostaje bez zmiany |
| 3 | U1 | ja.json | {{t:connected\|コネクト}}、{{t:semi-connected\|セミコネクト}}、{{t:disconnected\|ディスコネクト}} | a: zastąpiony wpisem AP ja.json:860 (wpis U1 zostawiał w polu nowy formę セミコネクト) |
| 4 | L5 | lessons/m9-l2-zaangazowanie.md | シングルレイズの{{t:pot\|ポット}}、スタック | c: zastąpiony wpisem AP m9-l2-zaangazowanie.md:65 (wpis L5 zmieniał na „レイズが1回の…”) |
| 5 | L5 | lessons/m9-l2-zaangazowanie.md | シングルレイズの{{t:pot\|ポット}}では | c: zastąpiony wpisem AP m9-l2-zaangazowanie.md:110 (wpis L5 zmieniał na „レイズが1回の…”) |
| 6 | R4 | rules.yaml | ハンド数の平方根に比例してしか小さくならないからです | d: zastąpiony wpisem AP rules.yaml:973 (wpis R4 zostawiał 比例) |
| 7 | E1 | exams/m5.yaml | 低く{{t:connected}}のフロップは | g: to samo miejsce co poprawka AP m5.yaml:22; zmiana E1 („低く{{t:connected}}のフロップは” → „低くて{{t:connected}}なフロップは”) przeniesiona bez zmian do połączonej poprawki AP |
| 8 | E1 | exams/m5.yaml | 勝ち目のない手で | g: to samo miejsce co poprawka AP m5.yaml:47; zmiana E1 („勝ち目のない手で” → „勝ち目のないハンドで”) przeniesiona bez zmian do połączonej poprawki AP |
| 9 | E1 | exams/m5.yaml | text: "手を諦めるわけではない | g: to samo miejsce co poprawka AP m5.yaml:68; zmiana E1 („text: "手を諦めるわけではない” → „text: "ハンドを諦めるわけではない”) przeniesiona bez zmian do połączonej poprawki AP |
| 10 | E1 | exams/m5.yaml | やめるのはどの手ですか | g: to samo miejsce co poprawka AP m5.yaml:75; zmiana E1 („やめるのはどの手ですか” → „やめるのはどのハンドですか”) przeniesiona bez zmian do połączonej poprawki AP |
| 11 | S1 | terms-def.yaml | そのボードでその時点で最も強い手です。 | g: zastąpiony wpisem AP terms-def.yaml:91 (wpis S1 wstawiał „手”) |

## Uwagi do poszczególnych zamian

- rules.yaml:358 i :509: „…{{t:connected\|コネクト}}…している場合” przebudowane na „…{{t:connected\|コネクテッド}}…である場合” (forma przymiotnikowa nie łączy się z する); pozostałe miejsca b: „低く{{…\|コネクトした}}フロップ” → „低くて{{…\|コネクテッド}}なフロップ” (zapis jak w poprawkach L2 m5-l2:88 i E1 exams/m5.yaml:22), „非常に{{…\|コネクトした}}” → „非常に{{…\|コネクテッド}}な”.
- exams/m5.yaml:22: jedna połączona poprawka zawiera zmianę E1 („低く{{t:connected}}のフロップは” → „低くて{{t:connected}}なフロップは”) i zamianę „カードの手” → „カードのハンド”; wpis E1 wykluczony. exams/m5.yaml:47, 68, 75: wpisy E1 (już „手” → „ハンド”) wykluczone i zastąpione poprawkami AP tej samej treści; w :68 poprawka AP obejmuje też drugie „強い手” tej linii.
- m9-l2:65, 110: „シングルレイズの{{t:pot\|ポット}}” → „シングルレイズド{{t:pot\|ポット}}” (bez „の”, jak w regułach R-M9, egzaminie m9 i m9-l3).
- rules.yaml:973 (R-M12-003): „…平方根に反比例して小さくなるからです” — bez „しか” (pl „maleje z pierwiastkiem”, bez „dopiero”); exams/m12.yaml:29: „…反比例してしか小さくなりません” („しか” zostaje, pl „maleje dopiero z pierwiastkiem”). Po nałożeniu z poprawką R3 (rules.yaml:839) wszystkie trzy miejsca mają 反比例.
- terms-def.yaml:91: `nowy` = tekst S1 z „ハンド” („…その時点でありうる最も強いハンドです。”).
- m12-l3:78: dwa wystąpienia „プロフィール” w jednej poprawce (opcja odpowiedzi i uzasadnienie).
- Ostrzeżeń `zloz.mjs` o znacznikach dla wpisów AP: 0 (znaczniki `{{t:}}`, `{{n:}}`, `[[…]]` w `stary` i `nowy` te same).
- Stan repo: commit 9d10ad5 sesji nadrzędnej (zrobiony w trakcie tej pracy) objął wcześniejszą, roboczą wersję `AP.json` (te same zamiany, krótsze `stary`) i `wykluczenia.json`; wersja końcowa `AP.json`, `AP-uwagi.md`, `poprawki-ja.json` i `znaleziska.md` jest w katalogu roboczym, niezacommitowana.

## Nie generowano (rozstrzygnięcia nieprzyjęte, pytania do rodzimego użytkownika)

Nazwy statystyk „Fold to 3-bet / c-bet” (T-09), zapis „kハンド / 千ハンド” (T-10), 値段 → 価格 (T-22), „スタック全体を懸けて” (T-15), しきい値 (T-16), 信頼度 (T-17), ソース → 情報源 (U-07), formy `{{t:button\|BTN}}` (T-08).

## Wynik kontroli

`node docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/zloz.mjs ja` — kod wyjścia 0:

```
ja: poprawek 227 {"KRYT":0,"WYS":1,"ŚR":143,"NISKIE":83}; części bez wyniku: —
```

ODRZUCONA: 0, KOLIZJA: 0, OSTRZEŻENIE: 6 (żadne nie dotyczy AP; wszystkie z części wcześniejszych), wykluczenia dopasowane: 11 z 11.

Symulacja nałożenia wszystkich poprawek z `poprawki-ja.json` w pamięci (kolejno, każde `stary` dokładnie raz w bieżącym tekście), potem grep po `content/ja/**` i `ja.json`:

```
symulacja: poprawek 227, plików 47, nieudanych 0
セミコネクト(?!テッド): 1 → content/ja/terms-nazwy.yaml:83 (komentarz YAML)
コネクト(?!テッド) (bez セミ/ディス): 1 → content/ja/terms-nazwy.yaml:81 (komentarz YAML)
ディスコネクト(?!テッド): 1 → content/ja/terms-nazwy.yaml:82 (komentarz YAML)
オフスーツ: 0
ベースライン (m10-l1, m10-l2): 0
ベースライン (cały korpus): 0
(?<!相)手 w exams/m5, exams/m11, m7-l4: 2 → content/ja/exams/m11.yaml:7, content/ja/lessons/m7-l4-probe-obrona.md:48
プロフィール: 0
コンデンス(?!ド): 1 → content/ja/terms-nazwy.yaml:97 (komentarz YAML)
レーキキャップ: 1 → content/ja/terms-nazwy.yaml:164 (komentarz YAML)
シングルレイズ(?!ド): 0
レイズが1回の (m9-l2): 0
平方根に比例: 3 → content/ja/lessons/m12-l1-wariancja.md:22, content/ja/lessons/m12-l1-wariancja.md:49, content/ja/lessons/m12-l1-wariancja.md:118
テーブルをまとめた: 0
```

Jedyne pozostałe trafienia wzorców セミコネクト(?!テッド), コネクト(?!テッド), ディスコネクト(?!テッド), コンデンス(?!ド), レーキキャップ to komentarze YAML w `terms-nazwy.yaml` (statystyka form po `#`, niewyświetlana). „手” poza „相手” w trzech plikach g: tylko „手放す” (2 miejsca). „平方根に比例”: m12-l1:22 poprawne (SD rośnie), m12-l1:49 i :118 — patrz wiersz d (poza zakresem, do decyzji).
