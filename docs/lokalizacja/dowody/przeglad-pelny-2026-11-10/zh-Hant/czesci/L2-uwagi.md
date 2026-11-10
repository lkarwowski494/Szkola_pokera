# zh-Hant · L2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/zh-Hant/lessons/m4-l1-3bet.md | tak | 105 linii, linia w linię z pl; 6 poprawek (nazwy pozycji) |
| content/zh-Hant/lessons/m4-l2-obrona-bb.md | tak | 93 linie; 11 poprawek (angielskie „equity”) |
| content/zh-Hant/lessons/m4-l3-wobec-3betu.md | tak | 112 linii; 1 poprawka (NISKIE) |
| content/zh-Hant/lessons/m4-l4-limperzy.md | tak | 75 linii; bez poprawek |
| content/zh-Hant/lessons/m5-l1-tekstury.md | tak | 109 linii; 1 poprawka |
| content/zh-Hant/lessons/m5-l2-przewagi.md | tak | 100 linii; 2 poprawki |

Pomocniczo: `content/zh-Hant/terms-nazwy.yaml` (całość), `content/en/…` tylko dwa zdania (m4-l2:92, m5-l1:108), `apps/mobile/src/i18n/locales/zh-Hant.json` tylko wyszukiwanie etykiet tekstury i „經驗法則”. Glosariusza `docs/lokalizacja/glosariusz.md` nie czytałem w całości (terminy sprawdzałem względem `terms-nazwy` i źródła pl).

Kontrola mechaniczna wszystkich 6 plików (skrypt, linia po linii względem pl): klucze `{{t:…}}`, znaczniki `{{n:…}}` (zestaw i kolejność), notacja `[[…]]`, pola YAML nieprzekładalne (id, family, rules, table, answer, params, count, axes, spot), flagi `correct: true` / `sizeError: true` — bez różnic. Znaków uproszczonych ani resztek polskiego tekstu nie znalazłem (poza komentarzem YAML `# słownictwo PL ↔ EN…`, który jest identyczny z pl i nie jest wyświetlany).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | m4-l1-3bet.md:85, 93, 104; m4-l2-obrona-bb.md:73, 79, 89, 92 | pl „siatka” (siatka zakresu) → w m4-l1 „手牌表”, w m4-l2 „網格”, a w module 3 (m3-l3, poza częścią) „表格”. Trzy nazwy jednego elementu ekranu w sąsiednich lekcjach. | Wybrać jedną nazwę dla całego przekładu (decyzja ponad częścią); zob. „Do ujednolicenia skryptem”. |
| NISKIE | m4-l1, m4-l4 („尺度”, 14×) wobec m4-l2, m4-l3, m5-l2 („尺寸”, 16×) | pl „rozmiar” (zakładu, 3-betu) ma dwie nazwy; obie zrozumiałe. W całych lekcjach zh-Hant przeważa „尺寸” (94 wobec 20). | Ujednolicić do „尺寸”. |
| NISKIE | m4-l1-3bet.md:48 wobec m4-l3:56, 57, 108; m5-l1:49; m5-l2:27 | pl „set” → raz „set”, raz „暗三條”, raz „set（暗三條）”. Sens zachowany wszędzie. | Ujednolicić przy okazji (np. „暗三條”). |
| NISKIE | m4-l2-obrona-bb.md (cały plik) | Brak odstępu między tekstem chińskim a liczbą ze znacznika `{{n:…}}` („開池到{{n:pf.open-size}}”), w pozostałych plikach części odstęp jest („開池到 {{n:pf.open-size}}”). | Typografia; ujednolicić skryptem przy okazji. |

## Do ujednolicenia skryptem
- „siatka”: `網格` (m4-l2: 4 trafienia, `grep -c` = 4 linie) i `手牌表` (m4-l1: 3 linie) → jedna nazwa, zgodna z modułem 3 (tam „表格”). Liczby dla wszystkich lekcji zh-Hant: 網格 4, 手牌表 3 (oba tylko w tej części).
- „rozmiar”: `尺度` → `尺寸` w m4-l1 i m4-l4 (14 wystąpień w części; kontekst zawsze rozmiar zakładu/przebicia).
- Poza częścią, zauważone przy sprawdzaniu spójności (nie czytałem tych plików w całości): „c-bet” zostaje po angielsku w m6-l3 (24 linie), m10-l3 (12), m7-l2 (4), m6-l1 (3), a jest „持續下注” w m6-l2 (26), m7-l1 (8), m5-l2 (4), m8-l1 (2). Do decyzji dla całego przekładu.

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- „踢腳” jako „kicker” (m4-l3:27, m5-l1:44, m5-l2:17, 86): moduł 0 używa „踢腳牌”; czy skrócone „踢腳” jest naturalne dla tajwańskiego czytelnika, czy lepiej wszędzie „踢腳牌”?
- „溜入” (limp) i „溜入玩家” (limper) w m4-l4: zgodne z `terms-nazwy`, ale komentarz w tym pliku sam notuje brak źródła tajwańskiego (tajwańskie strony mają „平跟”). Nie zmieniałem.
- „按鈕位” dla Buttona w tekście bez znacznika (wszystkie pliki części); `terms-nazwy` ma button = „BTN”. Tekst jest spójny i zrozumiały; pytanie, czy nazwa ma być „BTN”, jak przy stole.
- m4-l1-3bet.md:16, 26, 75: „加注到開池的約 3x” (liczba wyświetla się jako „3x”) — zrozumiałe, ale czy naturalniej byłoby „約為開池的 3x”?
- m4-l1-3bet.md:37: pl „Sprawdzam szeroko” → „大量跟注”; „用寬範圍跟注” byłoby bliższe pojęciu „szeroko” używanemu dalej („很寬”).
- m5-l1-tekstury.md:62 i 108: wysokość „中翻牌” (pl „średni”) i mokrość „中等翻牌” (pl „pośredni”) różnią się jednym znakiem; zgodne z etykietami interfejsu („中” / „中等”), więc nie zmieniałem.

## Pytania do źródła pl
- m5-l1-tekstury.md:108: „za mokre 9-8-7, Q-J-T i T-9-5-4” — ostatni przykład ma cztery karty, a zdanie mówi o flopach (tak samo w en). Czy to zamierzone (stół z turnem ze źródła), czy pomyłka?
- m4-l2-obrona-bb.md:92: „3-bet i call są ze sobą powiązane” — en ma „combined”, przekład „合併在一起” (połączone w siatce w jedno). Przekład idzie za sensem en; polskie „powiązane” jest mniej jasne.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
W części L2 nie było treści krytycznej (brak modułu 12, helplines, ramki „Odpowiedzialna gra”).
