# ja · L8 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ja/lessons/m12-l1-wariancja.md | tak (140 linii pl i ja, linia po linii) | bez poprawek mechanicznych; zob. „Do ujednolicenia skryptem” (zapis „tys. rąk”) |
| content/ja/lessons/m12-l2-decyzja-wynik.md | tak (116 linii pl i ja) | 1 poprawka NISKIE |
| content/ja/lessons/m12-l3-tilt.md | tak (134 linie pl i ja) | bez poprawek; 2 pytania w „Do sprawdzenia” |
| content/ja/lessons/m12-l4-bankroll.md | tak (149 linii pl i ja) | 1 poprawka ŚR (zgubione „nigdy”) |

Pomocniczo odczytane: `content/ja/terms-nazwy.yaml` (całość), wybrane klucze `content/numbers.yaml` (wartości liczb m12), `apps/mobile/src/i18n/locales/ja.json` (nazwa ekranu „Pomoc” = ヘルプ). Wersji `en` nie otwierałem. Glosariusza `docs/lokalizacja/glosariusz.md` nie czytałem w całości (terminy sprawdzałem względem `terms-nazwy.yaml`).

Kontrola mechaniczna (skrypt, linia po linii pl ↔ ja): `{{n:…}}` identyczne w każdej linii we wszystkich 4 plikach; klucze `{{t:…}}` zgodne poza jedną nieszkodliwą różnicą (niżej); `{{helplines}}`, `id`, `family`, `rules`, `answer`, `correct: true`, parametry generatora — jak w pl; liczba linii zgodna; brak polskich znaków w przekładzie. Wszystkie formy `{{t:klucz|forma}}` są równe nazwie z `terms-nazwy.yaml` (バイイン, 標準偏差, ダウンスウィング, 分散, ステークス, セッション, 破産リスク, バンクロール, ポット, コール, ベット, レイズ, フォールド, ペア, フラッシュ, フラッシュドロー, レンジ, ビッグブラインド; `expected-value|EV` jak w pl).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ja/lessons/m12-l2-decyzja-wynik.md:112 | „ok. {{n:skill.sample.m}} mln rozdań” → „約{{n:skill.sample.m}}百万のオンラインハンド” (wyświetli się „約76.9百万”); liczba ta sama, ale po japońsku dużych liczb nie zapisuje się jako „百万” z ułamkiem (naturalnie: 約7,690万). Sens niezmieniony, znacznik `{{n:}}` nie pozwala na naprawę w obrębie linii. | Zostawić albo osobny klucz liczby w jednostce 万 (decyzja po stronie źródła/narzędzia), nie poprawka przekładu. |
| NISKIE | content/ja/lessons/m12-l4-bankroll.md:96 | pl „Gdy po prostu wygrywasz na swojej” (bez znacznika) → ja „今の{{t:stakes|ステークス}}で” (dodany znacznik `stakes`). Klucz i sens poprawne, wyświetlanie bez zmian. | Bez zmiany. |
| ŚR (poza częścią) | content/ja/lessons/m12-l3-tilt.md:78, 118 ↔ content/ja/rules.yaml:995 | „profil tiltu” w lekcji = プロフィール / ティルトプロフィール, w regułach = プロファイル. Jedno pojęcie, dwie nazwy między plikami. | Ujednolicić w jednej z części (lekcja: 2 miejsca; reguły: 1 miejsce) — decyzja sesji nadrzędnej. |

## Do ujednolicenia skryptem
- Zapis „{{n:…hands.k}} tys. rąk”: w `m12-l1-wariancja.md` wszędzie „{{n:…}}kハンド” (24 linie z wzorcem `}}kハンド` lub `}}k"`), a w `m12-l2-decyzja-wynik.md:68`, `m12-l4-bankroll.md:58`, `exams/m12.yaml` (11 linii), `m13-l1-raport.md:105` „{{n:…}}千ハンド” (`grep -rc '}}千ハンド' content/ja`: l2 = 1, l4 = 1, exams/m12 = 11, m13-l1 = 1). Ta sama wielkość „100 tys. rąk” wyświetla się więc raz jako „100kハンド”, raz jako „100千ハンド”. Wzorzec → zamiana: `}}千ハンド` → `}}kハンド` (zalecane: „100k” jest zwyczajowym zapisem w japońskim środowisku pokerowym, „100千” nie jest używane) albo odwrotnie; ważne, żeby jedna forma. W opcjach odpowiedzi l1:56–57 („約{{n:…}}k”) zamiana odwrotna wymagałaby ręcznej korekty.
- Polecenie „Wpisz liczbę.”: l1:13, l1:38 „数字を入力してください。”, l2:22, l4:13 „数値を入力してください。” (w całym `content/ja/lessons`: 数値 15 linii, 数字 18 linii). Oba poprawne; do ujednolicenia jedną formą (zalecane 数値).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m12-l3-tilt.md (17, 33, 71, 114; także m12-l4:51): „tilt z desperacji” → 焦りによるティルト. 焦り to raczej „niecierpliwość/pośpiech”; „desperacja” (desperation tilt) bywa oddawana jako 自暴自棄 / 必死さ. Opis typu („potrzeba odegrania się”) jest oddany wiernie, więc sens lekcji się zgadza; pytanie tylko o nazwę typu.
- m12-l3-tilt.md:125 „Słabsi gracze muszą czasem wygrywać” → 「弱いプレイヤーも時には勝つ必要がある」 — wierne, ale brzmi dosłownie; ewentualnie 「弱いプレイヤーも時には勝つものだ」.
- m12-l4-bankroll.md:76, 133 „słaba gra” → 弱いプレイ; naturalniej 下手なプレイ / 質の低いプレイ. Zrozumiałe, preferencja stylu.
- m12-l4-bankroll.md:113, 137: spacje wokół pogrubienia („ **…** の数”, „ **半分** まで”), w l1/l2/l3 pogrubienie bez spacji („約**…**の間”). Jeśli renderer nie wymaga spacji przy znakach CJK, spacje będą widoczne jako odstęp w zdaniu.
- m12-l1-wariancja.md:83 „a nie sam wynik” → 収支だけではありません („nie tylko wynik”); pl można czytać „nie wynik jako taki”. Wniosek ćwiczenia bez zmiany.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Cała część to moduł 12; każde zdanie 4 lekcji porównane ze źródłem pl.
- **Liczby, progi, granice**: wszystkie przez `{{n:…}}`, identyczne klucze i liczba wystąpień w każdej linii. Liczby wpisane słownie zgodne: „2 z 3 wyników” (約3回に2回), „raz na pięć–sześć” (5〜6回に1回), „raz na pięć” (5回に1回), „sto razy więcej” (100倍), „trzy razy mniejszy” (3分の1), „kilkadziesiąt razy” (数十倍), „kilka razy” (数倍), „dwa razy” (2倍/半分), „co najmniej raz w ostatnich sześciu miesiącach” (過去6か月に少なくとも1回), lata 1988/2015/2020, „trzeci raz w godzinę”, „czwarty raz z rzędu”, „pół godziny”, „trzy sesje”, „siedem typów”.
- **Warunki**: „co najmniej {{n:dd.bi.small}} wpisowych” = 以上; „częściej niż w co drugiej próbce” = サンプルの半分以上で; „najpóźniej wtedy, gdy bankroll spadnie do połowy” = 遅くともその時点で; „połowa to najpóźniejszy z nich” = 最も遅いライン; „wracasz wyżej najwcześniej wtedy, gdy masz pełny bankroll w wpisowych wyższej stawki” = 早くても…そろってから; „zejście przed progiem połowy nie jest błędem, a później już tak” = oddane; „ryzyko nigdy nie spada do zera” = ゼロにはなりません; „jeśli nigdy nie zejdziesz stawkę” = 一度も下げない場合. Jedyne osłabienie: l4:141 „nigdy mniej niż {{n:study.min}} nauki” → brak „決して” (poprawka ŚR w L8.json).
- **Poprawne odpowiedzi**: `correct: true` przy tych samych opcjach co w pl (w tym dwie poprawne w `m12.l4.q-stay`); uzasadnienia zgodne z opcjami.
- **Ramka „Odpowiedzialna gra” (l4:143–149)**: tytuł 責任あるプレイ; wszystkie 5 sygnałów obecne i niezłagodzone (gra dłuższa niż planowana; powrót, żeby odegrać straty; gra za pieniądze, których nie można stracić, albo pożyczanie na grę; gra, żeby uciec od zmartwień; ukrywanie grania przed bliskimi); „Gdzie szukać pomocy:” = 相談先：; `{{helplines}}` nienaruszone. Ćwiczenie `m12.l4.q-warning-sign` zgodne (kryteria diagnostyczne, odgrywanie strat, gra dłuższa niż planowana, pożyczone pieniądze).
- **Odsyłacze**: l1:140 „ekran »Pomoc«” = 「ヘルプ」 (zgodne z `ja.json`: help = ヘルプ); l3:133 ramka „Gdy to coś więcej niż tilt” — trzy warunki obecne, odsyła do karty 責任あるプレイ w lekcji o bankrollu (nazwa zgodna z l4); zastrzeżenie l1:140 „ogólne wskazówki, nie gwarancja wyniku” oddane wiernie.
- Wynik: brak znalezisk KRYT i WYS; 1 × ŚR, 1 × NISKIE (poprawki mechaniczne).
