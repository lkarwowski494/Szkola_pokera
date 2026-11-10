# vi-L1: wietnamski (vi), lekcje m1–m3 (6 plików) i egzaminy m0–m3

Przegląd niezależny, 2026-11-10. Źródło: `content/pl/`, przekład: `content/vi/`. Terminologia: `content/vi/terms-nazwy.yaml`.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| content/vi/lessons/m1-l1-przebieg.md | tak | 97 |
| content/vi/lessons/m2-l1-outy.md | tak | 135 |
| content/vi/lessons/m2-l2-pot-odds.md | tak | 98 |
| content/vi/lessons/m3-l1-pozycja.md | tak | 70 |
| content/vi/lessons/m3-l2-rece-startowe.md | tak | 62 |
| content/vi/lessons/m3-l3-zakresy-otwarc.md | tak | 87 |
| content/vi/exams/m0.yaml | tak | 92 |
| content/vi/exams/m1.yaml | tak | 75 |
| content/vi/exams/m2.yaml | tak | 99 |
| content/vi/exams/m3.yaml | tak | 95 |

Wynik ogólny: 0 KRYT, 0 WYS, 17 ŚR, 5 NISKIE (22 znaleziska; część obejmuje wiele miejsc). Liczby, ręce, karty, pozycje, kierunki zaleceń, poprawne odpowiedzi i klucze znaczników `{{t:}}` / `{{n:}}` zgadzają się ze źródłem we wszystkich 10 plikach.

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | exams/m3.yaml:11 | `text: "{{t:big-blind\|Mù lớn}}"` | `{{t:big-blind\|Big blind}}` | m3.exam.q1: pytanie (znaczniki bez formy) mówi „small blind”, „big blind”, a poprawna odpowiedź nazywa się „Mù lớn”; uczeń nie musi wiedzieć, że to to samo | wysoka | tak |
| 2 | ŚR | exams/m3.yaml:23, 51, 56, 59 (2×), 60, 61 (2×), 62, 70 | `{{t:big-blind\|mù lớn}}`, `{{t:small-blind\|mù nhỏ}}` | `big blind`, `small blind` | terms-nazwy: big blind / small blind; lekcje m3 mają nazwy angielskie, egzamin m3 wietnamskie (jedna nazwa na jedno pojęcie) | wysoka (niespójność), średnia (kierunek) | tak (10) |
| 3 | ŚR | exams/m3.yaml:11, 13, 40, 49, 50, 88; 23, 51, 61 („tiền mù”); 61 („mức mù”) | `các mù`, `ăn tiền mù`, `mức mù` | `các blind`, `ăn các blind`, `mức blind` | jw.; lekcje m1–m3 mówią „blind”, „các blind” (m3-l2:47 „ăn các blind”) | średnia | tak (10) |
| 4 | ŚR | lessons/m1-l1-przebieg.md:49, 72, 85 | `{{t:big-blind\|mù lớn}}` / `Mù lớn` | `big blind` / `Big blind` | w tym samym akapicie znacznik bez formy wyświetla „big blind”, a forma „mù lớn” (linia 72: dwa kolejne zdania, dwie nazwy) | średnia | tak (3) |
| 5 | ŚR | lessons/m1-l1-przebieg.md:70, 81 (2×) | `{{t:pot\|hũ}}` | `{{t:pot\|pot}}` | terms-nazwy: pot; pozostałe 9 plików ma „pot”, egzamin m1 do tej lekcji też | wysoka | tak (3) |
| 6 | ŚR | lessons/m1-l1-przebieg.md:96 | `**{{t:side-pot\|hũ phụ}}**,` | `**{{t:side-pot\|pot phụ}}** (side pot),` | forma niespójna z „pot” i z nagłówkiem notatki (znacznik bez formy = „side pot”); pominięty nawias „(side pot)” ze źródła | średnia | tak |
| 7 | ŚR | lessons/m1-l1-przebieg.md:52 | `khi việc đó không tốn gì` | `khi chơi tiếp không tốn gì` | „việc đó” wskazuje na „bỏ bài” (pas nic nie kosztuje); źródło: nie pasuj, gdy dalsza gra nic nie kosztuje | średnia | tak |
| 8 | ŚR | lessons/m3-l1-pozycja.md:68 | `Kích thước {{t:open\|mở}} bài` | `Kích thước {{t:open\|mở cược}}` | „mở bài” = odkrycie kart / wstęp; terms-nazwy: „mở cược” | wysoka | tak |
| 9 | ŚR | lessons/m3-l1-pozycja.md:69 | `bạn không chỉ bỏ thêm cho bằng blind` | `bạn đừng chỉ bỏ thêm cho bằng blind` | „không chỉ…” = „nie tylko… (lecz także)”; źródło: „nie dopłacasz samego blinda” | średnia | tak |
| 10 | ŚR | lessons/m3-l2-rece-startowe.md:26 | `{{t:bluff\|Tố lừa}}` | `{{t:bluff\|Bluff}}` | forma musi oznaczać termin; „tố” = raise, „tố lừa” to nie nazwa blefu (terms-nazwy: bluff) | średnia | tak |
| 11 | ŚR | lessons/m3-l2-rece-startowe.md:15, 45, 53, 54 (2×), 55, 59 (3×) | `đồng chất` | `cùng chất` | suited = „cùng chất” (terms-nazwy; tak w odpowiedzi tej samej linii 15); „đồng chất” w terms-nazwy to monotone | średnia | tak (9) |
| 12 | ŚR | lessons/m3-l3-zakresy-otwarc.md:47, 84, 87 | `đồng chất` | `cùng chất` | jw. | średnia | tak (3) |
| 13 | ŚR | exams/m3.yaml:75, 77 | `T9 đồng chất`, `Tay đồng chất` | `cùng chất` | jw.; linia 79 tego samego pytania ma „cùng chất” | średnia | tak (2) |
| 14 | ŚR | lessons/m3-l3-zakresy-otwarc.md:47 | `{{t:mixed-hand\|tay bài hỗn hợp}}` | `{{t:mixed-hand\|tay bài trộn}}` | terms-nazwy: „tay bài trộn” | wysoka | tak |
| 15 | ŚR | lessons/m3-l3-zakresy-otwarc.md:87 | `khoảng chục tay bài` | `hơn chục tay bài` | źródło „w kilkunastu rękach” (11–19), przekład „około dziesięciu” | średnia | tak |
| 16 | ŚR | exams/m2.yaml:40, 77, 95 | `{{t:flush-draw\|draw thùng}}` | `{{t:flush-draw\|bài chờ thùng}}` | terms-nazwy i lekcja m2-l1: „bài chờ thùng” | wysoka | tak (3) |
| 17 | ŚR | lessons/m1-l1-przebieg.md (ok. 20×), exams/m1.yaml (ok. 12×) kontra lessons/m3-l1-pozycja.md:44, m1-l1:34, 54 | `{{t:check\|Xem bài}}` obok `check` | jedna nazwa | terms-nazwy: check = „check”; znacznik bez formy (m1-l1:54) i m3-l1:44 dają „check”, reszta „xem bài”. Wybór terminu w całym korpusie | wysoka (niespójność) | nie |
| 18 | NISKIE | exams/m0.yaml:81, 92 | `chơi bằng {{t:board\|bàn}}` | `chơi bằng bài trên {{t:board\|bàn}}` | dosłownie „grasz stołem”; chodzi o karty ze stołu | średnia | tak (2) |
| 19 | NISKIE | lessons/m2-l2-pot-odds.md:97 | `− {{t:call}}, và` | `− {{t:call\|tiền theo}}, và` | we wzorze EV wyświetla się goły czasownik „theo”; blok formula tej lekcji ma „tiền theo” | średnia | tak |
| 20 | NISKIE | m0.yaml, m1.yaml, m2-l1 („bàn”) kontra m1-l1:77, m0.yaml:51 (znacznik bez formy = „board”) | `{{t:board\|bàn}}` obok `board` | jedna nazwa | terms-nazwy: board = „board”; w zakresie konsekwentnie „bàn” poza dwoma gołymi znacznikami. Wybór korpusowy | średnia | nie |
| 21 | NISKIE | exams/m2.yaml (cały plik) kontra lessons/m2-l1, m2-l2 | `cơ hội trúng` | `khả năng trúng` | „szansa trafienia”: lekcje „khả năng”, egzamin „cơ hội”; zrozumiałe, bez wpływu na sens | średnia | nie |
| 22 | NISKIE | m1-l1:49, m3-l1:27, 37, m3-l3:77, m3.yaml:23, 51, 61 | `bù thêm cho đủ` / `Bỏ thêm cho bằng` / `Bù cho bằng` | jedno sformułowanie | „dopłacić do dużego blinda” oddane trzema różnymi zwrotami | średnia | nie |

## Do sprawdzenia przez człowieka znającego język

- m3-l3:47 „phần ôn lại của nhiệm vụ này sẽ quay lại sớm hơn” („powtórka tego zadania wróci szybciej”): zrozumiałe, ale brzmi jak kalka; możliwe „bài tập này sẽ được ôn lại sớm hơn”.
- m3-l2:55 „**Đầu cơ**” jako nazwa grupy rąk spekulacyjnych: słowo ma odcień „spekulacja finansowa”; do oceny, czy gracze tak mówią.
- m3-l2:37 „cửa trên” (faworyt): potoczne, z zakładów sportowych; egzamin m3:87 ma „chiếm ưu thế”.
- As: „lá át” (m2-l2), „đôi A” (m3-l2:37), „quân át” (m3-l3:84), „A” (m0.yaml): do ujednolicenia według uznania.
- Kierunek poprawek 2–4 (mù lớn / mù nhỏ → big blind / small blind) wynika z terms-nazwy; w całym korpusie forma wietnamska jest częstsza, więc jeśli właściciel terminologii wybierze „mù lớn”, należy odwrócić poprawki i zmienić nazwy w terms-nazwy.

## Uwagi do źródła pl

Brak.

## Ocena ogólna

Przekład jest merytorycznie wierny: w żadnym z 10 plików nie znalazłem zmienionej liczby, ręki, pozycji, kierunku zalecenia, poprawnej odpowiedzi ani zgubionego znacznika. Język jest naturalny i poprawny, forma „bạn” spójna. Jedyny realny problem to terminologia: pliki tłumaczono w różnych konwencjach (hũ/pot, mù lớn/big blind, đồng chất/cùng chất, draw thùng/bài chờ thùng, xem bài/check), przez co lekcja i jej egzamin nazywają to samo pojęcie inaczej, a znaczniki bez formy wyświetlają trzecią nazwę. Najbardziej widoczne dla ucznia jest m3.exam.q1, gdzie pytanie mówi „big blind”, a poprawna odpowiedź „Mù lớn”.
