# vi-U1: wietnamski (vi), interfejs, nazwy systemowe, metadane sklepu, areas/modules, ranges/spots

Recenzja niezależna, 2026-11-10. Źródło: pl; en tylko pomocniczo (metadane sklepu). Terminologia: `content/vi/terms-nazwy.yaml`.

## Pokrycie

| plik | przeczytany w całości | liczba linii |
|---|---|---|
| `apps/mobile/src/i18n/locales/vi.json` (względem `pl.json`, 935 linii) | tak — klucz po kluczu, 699 kluczy bazowych; zestaw kluczy, formy liczby mnogiej i znaczniki sprawdzone także skryptem | 887 |
| `apps/mobile/src/i18n/locales/pl.kontekst.json` | nie — tylko wpisy kluczy z wątpliwością (pomocniczy, nie jest przekładem) | 701 |
| `apps/mobile/locales/systemowe/vi.json` (względem `pl.json`) | tak | 4 |
| `docs/sklep/aso/metadane-fala2.json`, lokalizacja `vi` (względem `pl` i `en-US` w `store/app-store-metadata.json`) | tak (wpis `vi`: linie 35–41; pozostałych języków nie oceniałem) | 43 |
| `store/iap-localizations.json` | tak — tylko sprawdzenie obecności wpisu `vi` | 46 |
| `content/vi/areas.yaml` (względem `content/pl/areas.yaml`) | tak | 19 |
| `content/vi/modules.yaml` (względem `content/pl/modules.yaml`) | tak | 14 |
| `content/vi/ranges/spots.yaml` (względem `content/ranges/spots.yaml`) | tak — 60 linii różniących się linia po linii, 209 linii identycznych przejrzane (dane i komentarze, bez tekstu do tłumaczenia) | 269 |

Wyniki kontroli mechanicznych:

- `vi.json`: żadnego klucza brakującego ani nadmiarowego względem `pl.json`; wszystkie klucze liczby mnogiej mają w vi tylko formę `_other` (poprawnie dla vi) i żaden klucz nie zmienił charakteru (mnogi ↔ zwykły); w każdym kluczu zestaw znaczników `{{t:…}}`, `{{n:…}}` i parametrów `{{…}}` zgodny z formą pl (jako multizbiór kluczy); klamry sparowane; brak polskich znaków i tekstu po polsku; zapis NFC.
- `systemowe/vi.json`: identyczny z pl („PokerGym” w obu polach) — poprawnie, nazwa własna.
- `areas.yaml`: identyczny z pl bajt w bajt; plik nie zawiera tekstu dla użytkownika (identyfikatory, generatory, reguły; komentarz po polsku).
- `spots.yaml`: różnią się wyłącznie `title`, klucze `groups` i jedna para `text`/`why` (linia 62); zakresy rąk, `path`, `hero`, `solver`, `uncertain`, rozmiary w tablicach akcji bez zmian; liczby w tytułach (2,5bb, 3bb, 7,5bb, 10bb, 5/10/15bb, ante 1bb, stół 9-osobowy, trzech graczy) zgodne; znaczniki `{{n:pf.3bet.*}}` na miejscu.
- Metadane sklepu `vi`, limity App Store (liczone w znakach): name 19/30, subtitle 29/30, keywords 92/100, promotionalText 153/170, description 2118/4000 — wszystkie w limicie.
- `store/iap-localizations.json`: **wpisu `vi` nie ma** (są tylko `pl` i `en`; zgodnie z `_opis` pliku: „tylko języki wydane w aplikacji”).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | `content/vi/modules.yaml`:8 | `Second barrel và draw` | `Second barrel và bài chờ` | Niespójny termin: przyjęta nazwa draw = „bài chờ” (terms-nazwy.yaml), słownik interfejsu używa „bài chờ”. | wysoka | tak |
| 2 | ŚR | `content/vi/ranges/spots.yaml`:76 | `{{t:big-blind\|Mù lớn}}, Button … 2,5bb, {{t:small-blind}} đã` | `… {{t:small-blind\|mù nhỏ}} đã` | W jednym tytule „Mù lớn” (forma) i goły znacznik wyświetlany jako „small blind” — dwie nazwy jednego pojęcia w zdaniu. Dodana forma, klucz znacznika bez zmian. | średnia | tak |
| 3 | ŚR | `content/vi/ranges/spots.yaml`:81 | `{{t:big-blind\|Mù lớn}}, {{t:small-blind}} đã` | `{{t:big-blind\|Mù lớn}}, {{t:small-blind\|mù nhỏ}} đã` | jw. | średnia | tak |
| 4 | ŚR | `content/vi/ranges/spots.yaml`:165 | `… 2,5bb, {{t:small-blind}} đã {{t:fold\|bỏ bài}}` | `… {{t:small-blind\|mù nhỏ}} đã …` | jw. (stół 9-osobowy) | średnia | tak |
| 5 | ŚR | `content/vi/ranges/spots.yaml`:171 | `ở bàn 9 người, {{t:small-blind}} đã` | `ở bàn 9 người, {{t:small-blind\|mù nhỏ}} đã` | jw. | średnia | tak |
| 6 | ŚR | `content/vi/ranges/spots.yaml`:199 | `stack 10bb, {{t:big-blind}} đã đặt ante` | `stack 10bb, {{t:big-blind\|mù lớn}} đã đặt ante` | jw. („Mù nhỏ” obok „big blind”) | średnia | tak |
| 7 | ŚR | `content/vi/ranges/spots.yaml`:250 | `sau bạn vẫn còn {{t:big-blind}}` | `sau bạn vẫn còn {{t:big-blind\|mù lớn}}` | jw. | średnia | tak |
| 8 | ŚR | `content/vi/ranges/spots.yaml`:257 | `Button đã all-in, {{t:small-blind}} đã {{t:fold\|bỏ bài}}` | `… {{t:small-blind\|mù nhỏ}} đã …` | jw. | średnia | tak |
| 9 | ŚR | `content/vi/ranges/spots.yaml`:264 | `{{t:small-blind}} đã {{t:call\|theo}}` | `{{t:small-blind\|mù nhỏ}} đã {{t:call\|theo}}` | jw. | średnia | tak |
| 10 | ŚR | `docs/sklep/aso/metadane-fala2.json`:40 (description, sekcja LUYỆN TẬP) | `• Quyết định được chấm theo bốn mức` | `• Quyết định được chấm theo bốn mức: phù hợp, chấp nhận được, thiếu chính xác, sai lầm` | Pominięty szczegół: pl i en-US wymieniają cztery stopnie („zgodna, dopuszczalna, niedokładność, błąd”). Ten sam skrót mają wszystkie języki fali 2 (de, es, ko, it), więc to decyzja dla całej fali, nie błąd tłumacza vi; proponowane nazwy = etykiety `grade.*` z vi.json. | wysoka | nie |
| 11 | ŚR | `docs/sklep/aso/metadane-fala2.json`:40 (description) względem `vi.json` | sklep: `học phần`, `Bài thi học phần`, `chỉ số tiến bộ`, `Buổi luyện tập`, `Tỷ lệ đúng`, `chiến thuật` | aplikacja: `mô-đun`, `Bài thi mô-đun`, `Chỉ số trình độ`, `Phiên luyện tập`, `Độ chính xác`, `chiến lược` | Te same elementy aplikacji nazwane inaczej w opisie sklepu i na ekranach (użytkownik szuka w aplikacji „học phần”, a widzi „mô-đun”). Sens bez zmian; wymaga wyboru jednej nazwy w całym korpusie. | średnia | nie |
| 12 | NISKIE | `apps/mobile/src/i18n/locales/vi.json`:655 (`drill.range.acceptable`) | `nhưng nó thường chọn một hành động khác hơn` | `nhưng nó chọn một hành động khác thường xuyên hơn` | „częściej wybiera inną akcję”; szyk „khác hơn” jest dwuznaczny (czyta się jak „bardziej inną akcję”). | średnia | tak |
| 13 | NISKIE | `apps/mobile/src/i18n/locales/vi.json`:67 (`settings.purchases`) | `Mua hàng` | `Giao dịch mua` | Etykieta sekcji zakupów: „Mua hàng” = robienie zakupów; reszta słownika mówi „giao dịch mua” (`purchase.restore`, `settings.restored`, `settings.resetBody`). | średnia | tak |
| 14 | NISKIE | `content/vi/modules.yaml`:6,10 względem `vi.json` (`session.sizeError`, `play.report.detail.size` i in.) | `kích thước cược` (modules, spots:62) / `kích cỡ` (vi.json, 4×) | jedna nazwa na „rozmiar (zakładu)” | Dwie nazwy jednego pojęcia w przejrzanych plikach; obie zrozumiałe. Wybór w całym korpusie. | średnia | nie |

Razem: KRYT 0, WYS 0, ŚR 11, NISKIE 3. Poprawek JSON: 11 (żadna nie zmienia zestawu kluczy znaczników).

## Do sprawdzenia przez człowieka znającego język

- **„small blind / big blind” czy „mù nhỏ / mù lớn”** (znaleziska 2–9): `terms-nazwy.yaml` przyjmuje nazwy angielskie, a `spots.yaml` w formach konsekwentnie pisze „Mù nhỏ / Mù lớn”. Poprawki JSON ujednolicają w stronę dominującą w pliku (dodają formę do gołego znacznika). Jeśli korpus ma iść w stronę nazw angielskich, zamiast nich trzeba zmienić formy `Mù nhỏ`/`Mù lớn`/`mù lớn` w ok. 25 tytułach tego pliku.
- `vi.json`:160 `level.heuristic` = „Kinh nghiệm” (dosł. „doświadczenie”) dla „Heurystyka” jako poziom pewności reguły; możliwe, że lepsze „Quy tắc kinh nghiệm” (reguła praktyczna). Krótka etykieta (ok. 10 znaków), dlatego bez poprawki.
- `vi.json`:273 `advancement.gamePending` = „có sau khi có chế độ chơi” — zrozumiałe, ale niezgrabne („dostępne po trybie gry”); ewentualnie „có khi có chế độ chơi”.
- `content/vi/modules.yaml`:13 tytuł m12 „Tâm lý thi đấu và bankroll”: termin mental-game ma w `terms-nazwy.yaml` nazwę „mental game”; tytuł opisowy jest naturalny i zgodny z `glossary.areas.mental` („Bankroll và tâm lý”), więc zostawiłem.
- Metadane sklepu: `subtitle` „Tập quyết định, không cá cược” („ćwicz decyzje, bez zakładów na pieniądze”) — poprawne i bez sugestii hazardu; do potwierdzenia, czy „cá cược” nie kłóci się w odbiorze z akcją „cược” (bet) w aplikacji. `keywords`: „chiến,thuật” to celowo rozbite słowo „chiến thuật” (zabieg ASO); zawiera angielskie „trainer”, „strategy”, „gto”, których nie ma w pl/en — wybór ASO, nie błąd przekładu. `name` „PokerGym: học poker” („nauka pokera”) różni się sensem od pl/en („trener strategii GTO”) — też wybór ASO, w limicie.
- Opis sklepu kończy się dwujęzycznymi etykietami „Điều khoản sử dụng / Terms of Use”, „Chính sách quyền riêng tư / Privacy Policy” i wstawką `[PRIVACY URL]` (jak en-US) — do podmiany przed wpisem, jak w źródle.

## Uwagi do źródła pl

- `pl.json` `start.reviewsWait`: forma `_one` mówi „Wróci po odnowieniu limitu”, pozostałe „Poczekają do odnowienia limitu” — drobna niespójność sformułowania w źródle (vi ma jedną formę „Chúng sẽ chờ…”, zgodną z formami mnogimi).
- `store/app-store-metadata.json`: nazwy `pl`/`en-US` („trener strategii GTO”) i `vi` z fali 2 („học poker”) obiecują co innego w tytule; opis `vi` pomija nazwy czterech stopni oceny (znalezisko 10) tak samo jak pozostałe języki fali 2.

## Ocena ogólna

Przekład przejrzanych plików jest wierny i naturalny: nie znalazłem zmienionej liczby, ręki, pozycji, kierunku zalecenia ani zgubionego znacznika, a treść wrażliwa (ekran pomocy, „nauka bez gry na pieniądze”, opis sklepu) oddaje źródło bez sugestii hazardu i mieści się w limitach App Store. Formy liczby mnogiej są poprawne dla vi (tylko `other`), a zestaw kluczy zgadza się z pl. Uwagi dotyczą wyłącznie spójności terminów: mieszanie „mù nhỏ/mù lớn” z „small blind/big blind” w tytułach spotów, „draw” zamiast „bài chờ” w podtytule modułu oraz różne nazwy tych samych elementów w opisie sklepu i w aplikacji.
