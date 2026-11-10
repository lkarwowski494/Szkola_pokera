# zh-Hant · E2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/exams/m7.yaml | tak (pl i zh-Hant, 95 linii) | 3 poprawki (ŚR) |
| content/zh-Hant/exams/m8.yaml | tak (93 linie) | bez poprawek; inna konwencja zapisu (brak spacji wokół liczb/znaczników) niż w pozostałych plikach |
| content/zh-Hant/exams/m9.yaml | tak (86 linii) | bez poprawek |
| content/zh-Hant/exams/m10.yaml | tak (82 linie) | 2 poprawki (ŚR) |
| content/zh-Hant/exams/m11.yaml | tak (86 linii) | 2 poprawki (ŚR, NISKIE) |
| content/zh-Hant/exams/m12.yaml | tak (93 linie), TREŚĆ KRYTYCZNA, zdanie po zdaniu | 2 poprawki terminologiczne (ŚR); brak znalezisk KRYT/WYS |
| content/zh-Hant/exams/m13.yaml | tak (91 linii) | 5 poprawek (ŚR) |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (cały), `apps/mobile/src/i18n/locales/zh-Hant.json` i `pl.json` (tylko wyszukane klucze: ekran „Pomoc”, nazwy werdyktów), `content/numbers.yaml` (wybrane klucze), `content/en/exams/m10.yaml` (jedno zdanie). Glosariusza `docs/lokalizacja/glosariusz.md` nie czytałem w całości (terminy sprawdzałem przez `terms-nazwy.yaml`).

Kontrola mechaniczna (skrypt, linia w linię pl ↔ zh-Hant, 7 plików): struktura YAML poza tekstami identyczna (id, family, rules, answer, table, correct, sizeError); `{{n:…}}` identyczne co do klucza i liczby w każdej linii; `[[…]]` identyczne; klucze `{{t:…}}` identyczne poza dwoma liniami m11 (niżej).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/zh-Hant/exams/m11.yaml:75 | pl ma 2 × `{{t:chips}}` („{{t:chips}} wygrane są warte mniej niż przegrane… w grze o {{t:chips}}”), przekład 3 × (`贏來的籌碼`, `輸掉的籌碼`, `只打籌碼`). Sens zgodny, dodatkowy znacznik nie szkodzi. | Zostawić; ewentualnie drugi znacznik zamienić na zwykły tekst 籌碼, jeśli strażnik wymaga zgodnej liczby. |
| ŚR | content/zh-Hant/exams/m11.yaml:11 | „Limp” → `平跟（limp）` / `平跟`; terms-nazwy: limp = 溜入. To samo 平跟 jest w lekcjach m10-l1, m10-l2, m11-l1 i egzaminie m3, a w egzaminie m4 jest 跛入 — trzy nazwy jednego pojęcia. | Decyzja globalna (patrz „Do ujednolicenia skryptem”); nie poprawiałem punktowo, żeby egzamin m11 nie rozjechał się z lekcją m11-l1. |
| NISKIE | m7 / m8 / m10 / m13 | „c-bet”: m7 i m10 zostawiają `c-bet`, m8 (l. 17, 88) i m13 (l. 73) piszą 持續下注 (nazwa z terms-nazwy). | Ujednolicić globalnie. |
| NISKIE | m7, m9 vs m10 | „set”: m7:47, m9:20, 56, 84, 85 → 暗三條 (zwykły tekst); m10:43, 47 → `{{t:set|三條}}` / `{{t:set}}` (terms-nazwy: 三條, ta sama nazwa co three-of-a-kind). | Do decyzji globalnej; 暗三條 jest precyzyjniejsze. |
| NISKIE | m11 vs m13 | „solver”: m11 zostawia `solver`, m13 pisze 求解器 (tak też interfejs). | Ujednolicić globalnie. |
| NISKIE | m12:55 vs m13:72 | „bad beat”: m12 → 爆冷, m13 → `bad beat` (po angielsku); lekcja m12-l3 ma 被逆轉. | Ujednolicić globalnie. |
| NISKIE | content/zh-Hant/exams/m8.yaml (cały) | Brak spacji między znakami chińskimi a liczbami/znacznikami `{{n:…}}`, inaczej niż w m7, m9–m13. | Kosmetyka, skryptem albo zostawić. |
| ŚR (poza częścią) | content/zh-Hant/lessons/m13-l1-raport.md | Werdykt „Zgodna” w lekcji to 一致 (6 ×), w interfejsie 吻合. W egzaminie m13 poprawiłem na 吻合 (etykieta z ekranu); lekcja należy do innej części. | Ujednolicić lekcję do 吻合. |

## Do ujednolicenia skryptem
- limp: `平跟` / `跛入` / łacińskie `limp` → nazwa z terms-nazwy (`溜入`) albo zmiana terms-nazwy na 平跟 — jedna decyzja dla całego przekładu. Trafienia (`grep -rhoF`): 平跟 — lekcje m10-l1, m10-l2, m11-l1, egzaminy m3, m11; 跛入 — egzaminy 7 (m4); 溜入 — lekcje 29; `limp` — lekcje 19, egzaminy 5.
- equity: zwykłe `equity` w tekście chińskim → `權益` (lekcje 53 trafienia, egzaminy: m4 2, m5 2 poza moją częścią; w E2 poprawione mechanicznie: m7:56, m12:45, m12:46, m13:87). `勝率` w znaczeniu equity → `權益` (lekcje 7, egzaminy 1 = m7:57, poprawione).
- c-bet: `c-bet` (lekcje 71, egzaminy 41) vs `持續下注` (lekcje 43, egzaminy 3).
- Button: `按鈕位` (lekcje 207, egzaminy 78) vs `BTN` z terms-nazwy (lekcje 55, egzaminy 20) — w E2 konsekwentnie 按鈕位; czytelne, zostawiłem.
- gutshot: `卡順` (E2: m7) vs `gutshot` (terms-nazwy null; lekcje 34, egzaminy 11).
- ante: `前注` (E2: m11) vs `ante` (terms-nazwy null; lekcje 40, egzaminy 9).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m12 (l. 7, 10, 16, 18–20, 27–28, 34, 37–38) i lekcje m12: wzorzec „{{n:…}} 千手牌” (np. „50 千手牌”). Zrozumiałe, ale po chińsku naturalniej liczy się w 萬 („5 萬手牌”); liczba pochodzi ze znacznika, więc bez zmiany klucza się nie da. Czy „N 千手牌” jest akceptowalne dla czytelnika z Tajwanu?
- m12:52 „依照上頭課程中的分類” — 上頭 znaczy też „powyżej/u góry”, więc „上頭課程” może być odczytane jako „lekcja powyżej”. Propozycja: „依照「上頭」這一課中的分類”.
- m12:55 „爆冷、冤家牌” za „bad beaty, coolery” — 爆冷 to raczej „niespodziewany wynik”; lekcja m12-l3 używa 被逆轉 i 冤家牌. Czy 爆冷 jest zrozumiałe jako bad beat?
- m11:57, 59, 64, 68 „泡沫因子” (bubble factor; terms-nazwy null) i m11:9 „push/fold” zostawione po angielsku — sprawdzić zgodność z lekcjami m11.
- m9:19 „頂對加好踢腳” — naturalność (ew. „帶好踢腳的頂對”).
- m12:36, m13 „複盤” — pisownia tajwańska (複盤 / 覆盤 / 復盤); w całym przekładzie konsekwentnie 複盤.

## Pytania do źródła pl
- Brak. (Uwaga redakcyjna: pl m10:63 „łączy wszystkie rozmiary i stoły” — „stoły” w znaczeniu boardów jest dwuznaczne; wersja en ma „tables”, zh-Hant 牌桌. Jeśli pl miało na myśli stoły do gry, poprawkę m10:63 z E2.json należy odrzucić.)

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Egzamin m12 (10 pytań, 33 opcje z uzasadnieniami) porównany zdanie po zdaniu z pl.
- Liczby: wszystkie przez `{{n:…}}`, klucze i liczba wystąpień w każdej linii identyczne z pl; wzory (× √, ±, ÷, e^(−…), „2 × 贏率 × 資金 ÷ SD²”) bez zmian.
- Progi i warunki zachowane: q8 „jeśli nigdy nie zejdziesz stawkę” → 「如果你永遠不降級別」; q9 „próg zejścia to połowa założonej liczby wpisowych” → 「降級門檻是你設定的買入數的一半」; „schodzisz najpóźniej przy” → 「最晚在…時就要降級」; „liczysz go od bankrollu, który sam założyłeś” → zachowane; q7 „Kończę sesję” jako poprawna odpowiedź, C-game zachowane; q10 „dwa razy więcej” / „cztery razy więcej” zachowane.
- Zdanie ochronne q9: „To ogólna wskazówka; jeśli granie przestaje być pod kontrolą, zajrzyj do ekranu „Pomoc”.” → 「這只是一般性建議；如果打牌開始失控，請查看「協助」畫面。」 — obecne, nazwa ekranu zgodna z interfejsem (`協助`) i z lekcją m12-l1. Dodane „只” („to tylko”) nie zmienia sensu.
- Poprawne odpowiedzi (`correct: true`) na tych samych opcjach co w pl; uzasadnienia zgodne z odpowiedziami.
- Nic nie pominięto, nie złagodzono ani nie wzmocniono. Jedyne poprawki: angielskie „equity” → 權益 w l. 45 i 46 (ŚR, terminologia, bez wpływu na sens).
- Egzamin nie zawiera numerów telefonów, adresów ani nazw organizacji.
