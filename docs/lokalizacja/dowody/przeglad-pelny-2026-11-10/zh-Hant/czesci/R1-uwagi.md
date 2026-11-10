# zh-Hant · R1 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/rules.yaml, linie 1–331 (pl: content/pl/rules.yaml 1–331) | Tak, obie wersje linia po linii (nagłówek, R-M0-001…003, R-M1…R-M4-014) | Dodatkowo kontrola skryptem: znaczniki `{{t:…}}` (klucze) i `{{n:…}}` identyczne co do zbioru i liczby w każdej linii; pola id/module/level/check/sources i komentarze identyczne z pl; adresy URL i liczby w polach source zgodne. Pomocniczo przeczytane: terms-nazwy.yaml (zh-Hant), fragment numbers.yaml (pf.iso.*, pf.3bet.*, spr.4bet.*), formatowanie jednostek w tools/content-build/src/numbers.ts, jedna reguła w en (R-M4-012). Glosariusza docs/lokalizacja/glosariusz.md nie otwierałem (wystarczyło terms-nazwy). Linie 332+ poza zakresem części. |

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/zh-Hant/rules.yaml:153, 216, 225, 252 (pole source) | „aplikacji” → „本應用”; na Tajwanie naturalniej „本 App” / „本應用程式”. Pole source nie jest pokazywane w aplikacji (zostaje w repozytorium). | Bez zmiany albo ujednolicić przy okazji. |
| NISKIE | content/zh-Hant/rules.yaml:208 | Komentarz YAML po polsku (identyczny z pl) – nie jest treścią, bez wpływu. | Bez zmiany. |

## Do ujednolicenia skryptem
- „limper”: w tej części „溜入者” (rules.yaml: 305, 306, 315; łącznie 5× w content/zh-Hant), w lekcjach „溜入玩家” (22×). Oba poprawne i zrozumiałe; do decyzji jedna postać (częstsza: 溜入玩家).
- „Button”: w tekście „按鈕位” (335× w content/zh-Hant), a terms-nazwy ma `button: "BTN"` (116× BTN). W pl w tej części „Button” stoi bez znacznika, więc nie jest to naruszenie znacznika; do decyzji, czy nazwa w terms-nazwy ma być „按鈕位”.
- „(all-in)” → „（全下）”: poprawki w R1.json dla linii 81 i 89; w całym content/zh-Hant łacińskie „all-in” 23× wobec „全下” 261×.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- L30–31: „kickery” → „踢腳牌”; terms-nazwy ma `kicker: null` [DO USTALENIA]. W content/zh-Hant „踢腳牌” 12×, „kicker” 11×. Czy na Tajwanie lepiej „踢腳牌” czy „kicker / 邊牌”?
- L130, 139, 165, 191: „…，輪到你在 UTG／按鈕位／小盲” – zrozumiałe, ale lekko nienaturalne; ewentualnie „…，輪到你（UTG）行動”.
- L176: „在小盲你打牌時無位置” – sztywne; ewentualnie „在小盲你翻牌後無位置”. (pl: „z małego blinda grasz out-of-position”.)
- L37: `{{t:board|公共牌面}}` – forma łączy „公共牌” i „牌面”; nazwa w terms-nazwy to „公共牌”. Zrozumiałe; do oceny, czy nie prościej „公共牌”.
- L273–274, 290: „zdominowane / dominują” → „被壓制 / 壓制” – używane, do potwierdzenia jako stały odpowiednik „dominacji”.

## Pytania do źródła pl
- Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
- W części R1 nie było treści krytycznej (brak reguł R-M12-*).
