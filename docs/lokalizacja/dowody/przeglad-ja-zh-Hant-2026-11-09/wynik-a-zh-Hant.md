# Kontrola (a) treści krytycznej, moduł 12: pl → zh-Hant

Data: 2026-11-09. Porównano: źródło `ka/pl/` (7 plików) z przekładem zwrotnym `kz/zh-Hant/` (zh-Hant → pl, wykonanym bez dostępu do źródła), a w miejscach wątpliwych z oryginałem `ka/zh-Hant/` i plikami pełnymi `tl/content/zh-Hant/…`, `tl/ui/zh-Hant.json`. Pliki: m12-l1-wariancja.md (11 drilli + treść), m12-l4-bankroll.md (11 drilli + treść + ramka „Odpowiedzialna gra”), exams-m12.yaml (q1–q10), helplines.yaml, rules R-M12-009 i R-M12-011, terms-def (bankroll, risk-of-ruin), ui-wybrane.json (purchase.*, data.*, help.*; 46 kluczy). `ka/zh-Hant` lekcji i egzaminu jest identyczne z `tl/content/zh-Hant` (sprawdzone diff).

Kontrola automatyczna (skrypt na `ka/`):
- `{{n:…}}`: multizbiór kluczy identyczny ze źródłem we wszystkich 7 plikach.
- `{{t:…}}` (klucze bez form): m12-l1 −2× `call` (patrz #3; poprawne). Pozostałe pliki zgodne.
- Cyfry poza znacznikami: identyczne ze źródłem we wszystkich plikach.
- `{{helplines}}`, URL, `claim` (H-INT-1, H-INT-2), nazwa „Gambling Therapy (Gordon Moody)”, parametry interfejsu: bez zmian.
- Znaki uproszczone: test na typowych znakach uproszczonych nic nie znalazł (jedyne trafienie, 准 w 核准, jest poprawne w zapisie tradycyjnym).

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst w języku docelowym (dokładny fragment do zastąpienia i nowy) | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, drille n-expected, q-sd-result, q-ci95, n-se, q-winrate-ci, q-hands-needed | zgodne | Wzory, „pierwiastek”, „Dokładnie” / „tylko średnia”, „raczej nie przegrywasz”, „sto razy więcej” zachowane. „pewność” → 把握, konsekwentnie w lekcji i egzaminie. Poprawne odpowiedzi bez zmian. | — | — |
| 2 | m12-l1, q-dd-100k, q-dd-wr-low, q-sd-typical | zgodne | „o co najmniej {{n:dd.bi.small}}” → 至少 (granica zachowana); „częściej niż w co drugiej próbce” → 超過一半 (równoważne); „Prawie zawsze”, „Nieprawda”, „Nawet gracz…” zachowane. downswing → 下風期, spójnie we wszystkich plikach. | — | — |
| 3 | m12-l1, q-dd-meaning, opcja poprawna i trzecia | zgodne (uwaga do źródła) | Źródło pl ma `{{t:call|sprawdzasz}} decyzje` i `{{t:call|sprawdzać}}` w znaczeniu „przeglądać”. Przekład oddaje to jako 檢討, bez `{{t:call}}`, czyli poprawnie. Błąd znacznika jest w źródle pl (do zgłoszenia przy pl). | — | — (pl: ŚREDNIE, osobno) |
| 4 | m12-l1, treść, tabela downswingów, :::note, zdanie końcowe | zgodne | Bloki ```formula przetłumaczone (預期結果, 區塊數). Klucze, struktura, „zwykle” (通常), „przyjmuje się” zachowane. Zdanie końcowe → 「協助」畫面, zgodne z `help.title` = 協助. Ton bez zmian. | — | — |
| 5 | m12-l1, treść, 1. akapit: `{{t:standard-deviation}}` bez formy | różnica (K-05, nie sens) | Wyświetli się „…而standard deviation告訴你…”, czyli nazwa angielska w zdaniu chińskim. W całym module jest 標準差. | `均贏多少，而{{t:standard-deviation}}告訴你結` → `均贏多少，而{{t:standard-deviation|標準差}}告訴你結` | ŚREDNIE (K-05) |
| 6 | m12-l1, front matter `title: "用數字看變異"` | różnica (spójność) | W treści i egzaminie variance to 變異數. Tytuł używa 變異, a m12-l4 odsyła do „波動那一課” (patrz #8), więc mamy trzy nazwy jednej lekcji. | `title: "用數字看變異"` → `title: "用數字看變異數"` | ŚREDNIE (spójność) |
| 7 | m12-l4, drille n-base-bb, q-ror-base, q-ror-winrate, q-unknown-wr, q-losing | zgodne | Wzór RoR, „nigdy nie spada do zera” (永遠不會降到零), „jeśli nigdy nie zejdziesz” (從不降{{t:stakes|級別}}), „trzy razy mniejszy” (三分之一), „kilka” vs „kilkadziesiąt razy” (好幾倍 / 數十倍, jak w pl), „z pewnością” (一定) zachowane. bankroll → 資金, zgodnie z terms-def. | — | — |
| 8 | m12-l4: `{{t:variance|波動}}` ×7 (q-move-down, q-move-up, q-losing, „Od czego zależy ryzyko”) i podtytuł „以買入數衡量波動” | różnica (spójność) | W m12-l4 variance to 波動, a w m12-l1, egzaminie m12, m10-l4, m12-l2, m12-l3 i m13-l1 to 變異數. Odsyłacz „見波動那一課” wskazuje lekcję, której tytuł i treść mówią 變異/變異數. Sens bez zmian. | 4 fragmenty i podtytuł w A-poprawki.json, np. `打得好主要是{{t:variance|波動}}（見{{t:variance|波動}}那一課）` → `打得好主要是{{t:variance|變異數}}（見{{t:variance|變異數}}那一課）`; `以買入數衡量波動` → `以買入數衡量變異數` | ŚREDNIE (spójność) |
| 9 | m12-l4, q-move-down, q-stay, q-move-up | zgodne | „poniżej połowy”, „najpóźniejszy próg” (最晚的降級門檻), dwie poprawne odpowiedzi w q-stay, „wcześniej nie jest błędem, później jest” (更晚才是錯), „ustal próg z góry” zachowane. „tilt z desperacji” → 絕望型上頭, zgodnie z m12-l3. | — | — |
| 10 | m12-l4, treść: definicja, RoR, „Od czego zależy ryzyko”, „Kiedy zejść stawkę”, „Nauka i gra” | zgodne | „najpóźniej” (最晚), „najwcześniej” (最早), „od połowy do pełnego bankrollu; połowa to najpóźniejszy”, „dwa razy niższy winrate wymaga dwa razy większego bankrollu”, „nigdy mniej niż {{n:study.min}}” (絕不少於), tabela RoR zachowane. Drobna różnica: „daje jednemu graczowi kilka razy mniejsze ryzyko” → 可能…低好幾倍 (dodane „może”); twierdzenie nie dotyczy progu i pozostaje prawdziwe. | — | NISKIE |
| 11 | m12-l4, :::note „Odpowiedzialna gra” i q-warning-sign | zgodne | Pięć sygnałów w tej samej kolejności, „pieniądze, których nie możesz stracić” → 輸不起的錢, `{{helplines}}` bez zmian, nagłówek 負責任遊戲, „kryteria diagnostyczne”, odesłanie do kontaktów. Ton bez złagodzenia ani zaostrzenia. | — | — |
| 12 | exams m12, q1–q5, q7–q10 | zgodne | Przedziały, „nie wiesz nawet, czy wygrywasz”, „wygrywający gracz może skończyć na minusie”, „Było złe, mimo wygranej”, „Kończysz sesję” (C-game), „Ok. połowa” (błędna), próg z bankrollu założonego („najpóźniej”, 最晚), „Dwa razy więcej” / „Cztery razy” zachowane. Ostrzeżenie w q9 („ogólna rada… 「協助」畫面”) zachowane. | — | — |
| 13 | exams m12, q6: `{ text: "厭惡輸牌型上頭"` | różnica (spójność) | Pytanie odsyła do „podziału z lekcji o tilcie”, a lekcja m12-l3 (tabela i drille) nazywa ten typ 討厭輸型上頭. Pozostałe nazwy (不公平型, 失誤型, 報復型) są zgodne z lekcją. W pl nazwy są identyczne. | `{ text: "厭惡輸牌型上頭"` → `{ text: "討厭輸型上頭"` | ŚREDNIE (spójność) |
| 14 | exams m12, znaczniki bez formy: `{{t:variance}}` ×3, `{{t:flush-draw}}` ×2, `{{t:flush}}`, `{{t:call}}` ×2, `{{t:stakes}}` (q4, q5, q6, q7) | różnica (K-05, nie sens) | Wyświetli się np. „你拿著乾淨的flush draw”, „這次call”, „這是variance”, „更高的stakes”. | 6 fragmentów w A-poprawki.json (formy: 變異數, 同花聽牌, 同花, 跟注, 級別) | ŚREDNIE (K-05) |
| 15 | rules R-M12-009, R-M12-011 | zgodne | „najpóźniej” / „najwcześniej” (最晚 / 最早), „pełny bankroll w wpisowych wyższej stawki”, „z ok. {{n:ror.base}} do ok. {{n:ror.half}}”, „przybliżenie przy stałym winrate i SD”, level, cytaty angielskie w `source` dosłowne. | — | — |
| 16 | terms-def: bankroll, risk-of-ruin | zgodne | „wyłącznie na grę”, „w wpisowych, nie w pieniądzach”, „kiedykolwiek” (最終), „na tej samej stawce” (同一級別) zachowane. | — | — |
| 17 | helplines.yaml (pointer, fallback H-INT-2, regions_label, info H-INT-1) | zgodne | „lekarz albo specjalista zdrowia psychicznego”; „W nagłym zagrożeniu, także gdy… myśli o odebraniu sobie życia, od razu dzwoń na lokalny numer alarmowy” → 遇到緊急情況，包括…有輕生的念頭時，請立即撥打當地的緊急電話 (bez złagodzenia). Nazwa organizacji, URL, `claim`, `country`, `sources` bez zmian. „poufnie” → 保密. Ekran → 「協助」 = `help.title`. | — | — |
| 18 | ui purchase.* (17 kluczy) | zgodne | Plany: 每季 / 每年 / 終身存取權. „Odnawia się automatycznie do czasu anulowania” (除非取消，否則會自動續訂), „Zakup jednorazowy, bez kolejnych płatności”, anulowanie w ustawieniach konta Apple, „pełny dostęp do końca opłaconego okresu”, „Lekcje zostają darmowe”, oczekiwanie na zatwierdzenie zachowane. | — | — |
| 19 | ui data.* (17 kluczy) | zgodne | „Postęp jest tylko w tym telefonie”, „nie da się cofnąć” (此動作無法復原), „Postęp nie zmienił się” (沒有變更), „nowsza wersja… zaktualizuj” zachowane; `{{data}}` bez zmian. | — | — |
| 20 | ui help.* (7 kluczy) | zgodne | „Poker na pieniądze to gra hazardowa” (是賭博), help.link → 當賭博失去控制時 (tak jak en „when gambling gets out of control”), „Wybierz numer albo adres ręcznie” → 手動撥打號碼或輸入網址, parametry bez zmian. | — | — |

## Podsumowanie wag

- KRYTYCZNE: 0
- WYSOKIE: 0
- ŚREDNIE: 5 pozycji, żadna nie dotyczy sensu: spójność terminów (#6 tytuł 變異, #8 variance 波動/變異數 w m12-l4, #13 nazwa typu tiltu w egzaminie) oraz znaczniki `{{t:…}}` bez formy według decyzji systemowej K-05 (#5, #14). Poprawki zh-Hant w A-poprawki.json: 14 obiektów.
- NISKIE: 1 (#10, dodane 可能).
- Poza przekładem: w źródle pl `{{t:call|sprawdzasz}}` / `{{t:call|sprawdzać}}` w znaczeniu „przeglądać” (m12-l1, q-dd-meaning), do poprawy w pl. Moduł m12 w `modules.yaml` (poza zakresem) ma podtytuł „波動與上頭”. Przy ujednolicaniu na 變異數 trzeba go rozważyć razem z `exams/m13.yaml` i `rules.yaml` (tam 變異).

## Werdykt

Kontrola (a) zaliczona: 0 KRYTYCZNYCH, 0 WYSOKICH i 0 ŚREDNICH dotyczących sensu. Warunki i granice, przeczenia, modalność progów, kierunki porównań, kolejność kroków, klucze `{{n:…}}`, `{{helplines}}`, organizacja i adres oraz ton ostrzeżeń są zgodne ze źródłem. Zalecane jest nałożenie poprawek spójności i K-05 z A-poprawki.json.
