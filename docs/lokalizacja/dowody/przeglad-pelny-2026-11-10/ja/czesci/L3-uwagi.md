# ja · L3 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m5-l3-czestotliwosc-rozmiar.md | tak (pl 134 w., ja 134 w.) | 3 poprawki (ŚR) |
| content/ja/lessons/m5-l4-bez-pozycji.md | tak (107 / 107) | 1 poprawka (NISKIE) |
| content/ja/lessons/m6-l1-mdf-alpha.md | tak (136 / 136) | 4 poprawki (1 ŚR, 3 NISKIE) |
| content/ja/lessons/m6-l2-sprawdzenie.md | tak (134 / 134) | 1 poprawka (ŚR) |
| content/ja/lessons/m6-l3-check-raise.md | tak (139 / 139) | 1 poprawka (NISKIE) |

Pomocniczo: `content/ja/terms-nazwy.yaml` (cały), `content/numbers.yaml` (klucze użyte w części), `tools/content-build/src/numbers.ts` (zapis jednostek: procent, `bb`, `x`), `apps/mobile/src/i18n/locales/ja.json` (tylko etykiety tekstury flopu, w. 790–870). Glosariusza `docs/lokalizacja/glosariusz.md` nie czytałem w całości (terminy sprawdzałem względem `terms-nazwy` i źródła pl). Wersji `en` nie otwierałem.

Kontrola mechaniczna (skrypt, wiersz po wierszu pl ↔ ja): liczba i klucze `{{n:…}}`, klucze `{{t:…}}`, `[[…]]`, pola YAML poza tekstem (id, family, rules, table, answer, when, best, count, correct, sizeError) — zgodne we wszystkich 5 plikach. Dwie różnice liczby `{{t:}}` (m5-l4 w. 99 dodatkowe `check`, m6-l1 w. 132 dodatkowe `mdf`) wynikają z rozbicia zdania na dwa i są poprawne. Brak resztek polskiego tekstu.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | m5-l3 (cały) ↔ m5-l4 (cały) | Te same polskie zwroty przełożone różnie w sąsiednich lekcjach (dwóch tłumaczy): „Tak:” → „正解です：” / „はい。”; „wysoki flop” → „高いフロップ” / „ハイカードのフロップ”; „chybił” → „ヒットしていません” / „外しています”; „heurystyki” → „ヒューリスティック” / „ヒューリスティクス”; „Skąd te zasady” → „このルールの根拠” / „このルールの出典”; opcje tego samego ćwiczenia cbet (m5.l3.c-btn i m5.l4.c-review) „C-bet często i mało” → „Cベットを頻繁に小さく” / „高頻度・小さめにCベット”. Sens wszędzie poprawny. | Ujednolicić przy okazji (np. do wariantów z m5-l3); nie blokuje. |
| NISKIE | m6-l1, m6-l2 ↔ m6-l3, m5-l3 | „1/3 puli” → „1/3{{t:pot|ポット}}” (m6-l1, m6-l2) i „{{t:pot|ポット}}の1/3” (m6-l3), „{{t:pot|ポット}}の{{n:…}}” (m5). Oba zapisy naturalne. | Bez zmiany albo jeden zapis w module 6. |
| NISKIE | m6-l2:23 | Znak procentu półszerokości „何%” — w pozostałych plikach części „何％” (m5-l3:86, m6-l3:41). | „何％”. |
| NISKIE | m5-l3:112, m6-l3:135 | Zakres: „–” (m5-l3) i „～” (m6-l3: „約{{n:xr.mult.low}}～{{n:xr.mult.example}}”, wyświetli się „約3x～4.5xまで”). | Jeden znak zakresu w korpusie ja. |
| NISKIE | m6-l2:98 | „ボタンがCベットを{{t:bet|ベット}}してきます” — podwojenie „Cベットをベット” (kalka „stawia c-bet”); w ćwiczeniach tej lekcji lepiej: „Cベットとして…を{{t:bet|ベット}}”. Zrozumiałe. | np. „ボタンがCベットとして{{t:bet|ベット}}してきます”. |

## Do ujednolicenia skryptem
- `connected`: `terms-nazwy` podaje „コネクテッド” (komentarz AB: jedna forma przymiotnikowa), a w części występują inne postacie: `{{t:connected|コネクト}}` — m5-l3:126 (1 trafienie, `grep -c` = 1); `{{t:connected|コネクトした}}` — m6-l3:16, 17, 125, 130 (4 trafienia, `grep -c` = 4). Bez formy (`{{t:connected}}` → „コネクテッド”) — m5-l4:13, 16. Interfejs (`ja.json` w. 794, 860) też ma „コネクト”. Nie dałem poprawek mechanicznych, bo to decyzja dla całego korpusu ja (lekcje + interfejs): albo `{{t:connected|コネクト}}` → `{{t:connected|コネクテッド}}` i `{{t:connected|コネクトした}}` → `{{t:connected|コネクテッドな}}`, albo zmiana nazwy w `terms-nazwy`. Obie postacie są dla czytelnika zrozumiałe.
- Stopień wyższy „lepsze/gorsze ręce” oddany jako „強い/弱いハンド” (bez „より”): poprawki dałem w m6-l1:92, 94, 135 i m6-l2:76; w m6-l3 tłumacz używa „格上/格下” (poprawnie). Warto przeszukać resztę korpusu ja pod kątem tego wzorca przy zdaniach „płacą lepsze, pasują gorsze”.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m5-l4:103 „{{t:bluff|ブラフ}}は全員を通らなければならない” (pl: „musi przejść przez wszystkich”) — czy naturalniej „全員に通らなければならない”? (Analogiczne miejsce m5-l4:47 poprawiłem, bo tam jest niezgodność składniowa.)
- m5-l3:122 „ソルバーはそこでまれに、小さなサイズでベットします” (pl: „betuje na nim rzadko i małym rozmiarem”) — „まれに” jest mocniejsze niż „頻度を下げて” użyte dla tej samej reguły w w. 120 i 133; czy lepiej „低い頻度で、小さなサイズで”?
- m6-l3:26 „格下の{{t:pair|ペア}}” / m6-l3:83, 125 „格上のハンド” — czy rejestr „格上/格下” jest w pokerowym japońskim naturalny, czy lepiej „より強い/より弱い” jak w m6-l2:46?
- m6-l1:110 „最小ディフェンス頻度” jako rozwinięcie MDF (pl: „minimalna częstość obrony”) — częściej spotykane „最小防衛頻度”; do potwierdzenia.
- m6-l3:135 „Cベットの{{n:xr.mult.example}}へのチェックレイズ” (wyświetli się „Cベットの4.5xへのチェックレイズ”) — czy zapis „4.5x” bez „倍” jest dla czytelnika naturalny (zapis jednostki pochodzi z `formatNumber`, nie z przekładu).

## Pytania do źródła pl
- m6-l2:65, m6-l3:26, 93, 123 (pl): w wyliczeniu drawów stoi znacznik `{{t:flush}}` („{{t:draw|drawami}} ({{t:flush}}, {{t:oesd}})”), czyli nazwa gotowego układu „kolor” zamiast `{{t:flush-draw}}`. Przekład idzie za źródłem (m6-l3:26 łagodzi: „{{t:flush|フラッシュ}}狙い”).
- m5-l3:26 a m5-l4:85 (pl, to samo ćwiczenie cbet, przypadek „big”): raz „Większy bet spasuje mniej więcej te same ręce”, raz „Większy bet nie spasuje więcej rąk”; podobnie m5-l3:39 ma „po wcześniejszym czekaniu (check-raise)”, a m5-l4:91 tylko „(check-raise)”. Przekład wiernie oddaje obie wersje; pytanie, czy kopie w pl mają się różnić.
- m6-l1:27, 92, 94; m6-l2:54, 76; m6-l3:23, 26, 122 (pl): „set”, „kicker”, „gutshot”, „backdoor”, „implied odds”, „all-in”, „equity”, „showdown”, „outów” bez znaczników `{{t:…}}`, choć klucze istnieją — przekład też zostawia je bez znaczników (zgodnie ze źródłem).

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L3 nie było treści krytycznej (moduły 5 i 6).
