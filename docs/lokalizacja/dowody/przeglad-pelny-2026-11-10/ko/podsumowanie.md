# Pełny przegląd przekładu ko — podsumowanie (sesja AP, 2026-11-10)

Scalenie 16 plików `czesci/<CZĘŚĆ>-uwagi.md` (L1–L8, E1, E2, R1–R4, S1, U1). Poprawki mechaniczne: `poprawki-ko.json` (301: ŚR 213, NISKIE 88; KRYT 0, WYS 0) i `znaleziska.md` — generowane przez `zloz.mjs`, tu tylko liczone. Liczby trafień w tym pliku policzone 2026-11-10 na stanie gałęzi `przeglad-ap-cjk` **przed** nałożeniem poprawek; komendy uruchamiane z katalogu repo z `LC_ALL=C.UTF-8`.

Skróty użyte niżej: `KO` = `content/ko`, `UI` = `apps/mobile/src/i18n/locales/ko.json`, `SKLEP` = `docs/sklep/aso/metadane-fala2.json` (klucz `lokalizacje.ko`).

Dwie rzeczy do załatwienia przed oddaniem (szczegóły w sekcjach 2, 4 i 7):
1. Sprzeczności między poprawkami części — lista S1–S8 w sekcji 4.
2. Znalezisko własne scalania, niezgłoszone przez żadną część: `content/ko/rules.yaml:972` (R-M12-003, treść krytyczna) wyświetla „약 614.656,000핸드”.

## Pokrycie jednostek

70 jednostek: 44 lekcje, 14 egzaminów, 4 fragmenty `rules.yaml`, 6 plików części S1, słownik interfejsu, metadane sklepu. Wg deklaracji w tabelach „Pokrycie”: **70 w całości, 0 częściowo, 0 nie**. Kolumna „Poprawek” = liczba wpisów w `poprawki-ko.json` z danym `cel` (dla `rules.yaml` wg pola `linia`), policzona skryptem; suma 301.

| Jednostka | Przejrzana w całości | Przez kogo | Poprawek |
|---|---|---|---|
| `content/ko/lessons/m0-l1-uklady.md` | tak | subagent L1 | 6 |
| `content/ko/lessons/m1-l1-przebieg.md` | tak | subagent L1 | 1 |
| `content/ko/lessons/m2-l1-outy.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m2-l2-pot-odds.md` | tak | subagent L1 | 0 |
| `content/ko/lessons/m3-l1-pozycja.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m3-l2-rece-startowe.md` | tak | subagent L1 | 3 |
| `content/ko/lessons/m3-l3-zakresy-otwarc.md` | tak | subagent L1 | 2 |
| `content/ko/lessons/m4-l1-3bet.md` | tak | subagent L2 | 8 |
| `content/ko/lessons/m4-l2-obrona-bb.md` | tak | subagent L2 | 9 |
| `content/ko/lessons/m4-l3-wobec-3betu.md` | tak | subagent L2 | 0 |
| `content/ko/lessons/m4-l4-limperzy.md` | tak | subagent L2 | 7 |
| `content/ko/lessons/m5-l1-tekstury.md` | tak | subagent L2 | 6 |
| `content/ko/lessons/m5-l2-przewagi.md` | tak | subagent L2 | 18 |
| `content/ko/lessons/m5-l3-czestotliwosc-rozmiar.md` | tak | subagent L3 | 12 |
| `content/ko/lessons/m5-l4-bez-pozycji.md` | tak | subagent L3 | 3 |
| `content/ko/lessons/m6-l1-mdf-alpha.md` | tak | subagent L3 | 2 |
| `content/ko/lessons/m6-l2-sprawdzenie.md` | tak | subagent L3 | 8 |
| `content/ko/lessons/m6-l3-check-raise.md` | tak | subagent L3 | 5 |
| `content/ko/lessons/m7-l1-druga-beczka.md` | tak | subagent L4 | 6 |
| `content/ko/lessons/m7-l2-polaryzacja.md` | tak | subagent L4 | 4 |
| `content/ko/lessons/m7-l3-implied-odds.md` | tak | subagent L4 | 6 |
| `content/ko/lessons/m7-l4-probe-obrona.md` | tak | subagent L4 | 4 |
| `content/ko/lessons/m8-l1-value.md` | tak | subagent L4 | 3 |
| `content/ko/lessons/m8-l2-ile-blefow.md` | tak | subagent L5 | 2 |
| `content/ko/lessons/m8-l3-blokery.md` | tak | subagent L5 | 1 |
| `content/ko/lessons/m8-l4-bluff-catching.md` | tak | subagent L5 | 0 |
| `content/ko/lessons/m9-l1-spr.md` | tak | subagent L5 | 5 |
| `content/ko/lessons/m9-l2-zaangazowanie.md` | tak | subagent L5 | 4 |
| `content/ko/lessons/m9-l3-rozmiar-geometryczny.md` | tak | subagent L6 | 6 |
| `content/ko/lessons/m9-l4-plan-trzech-ulic.md` | tak | subagent L6 | 6 |
| `content/ko/lessons/m10-l1-statystyki.md` | tak | subagent L6 | 2 |
| `content/ko/lessons/m10-l2-typy-graczy.md` | tak | subagent L6 | 16 |
| `content/ko/lessons/m10-l3-odejscie-od-bazy.md` | tak | subagent L6 | 2 |
| `content/ko/lessons/m10-l4-rake.md` | tak | subagent L6 | 5 |
| `content/ko/lessons/m11-l1-push-fold.md` | tak | subagent L7 | 0 |
| `content/ko/lessons/m11-l2-sprawdzanie.md` | tak | subagent L7 | 5 |
| `content/ko/lessons/m11-l3-icm.md` | tak | subagent L7 | 4 |
| `content/ko/lessons/m13-l1-raport.md` | tak | subagent L7 | 7 |
| `content/ko/lessons/m13-l2-powtorki.md` | tak | subagent L7 | 8 |
| `content/ko/lessons/m13-l3-przeglad.md` | tak | subagent L7 | 1 |
| `content/ko/lessons/m12-l1-wariancja.md` (treść krytyczna) | tak | subagent L8 | 3 |
| `content/ko/lessons/m12-l2-decyzja-wynik.md` (treść krytyczna) | tak | subagent L8 | 1 |
| `content/ko/lessons/m12-l3-tilt.md` (treść krytyczna) | tak | subagent L8 | 1 |
| `content/ko/lessons/m12-l4-bankroll.md` (treść krytyczna) | tak | subagent L8 | 7 |
| `content/ko/exams/m0.yaml` | tak | subagent E1 | 0 |
| `content/ko/exams/m1.yaml` | tak | subagent E1 | 2 |
| `content/ko/exams/m2.yaml` | tak | subagent E1 | 1 |
| `content/ko/exams/m3.yaml` | tak | subagent E1 | 5 |
| `content/ko/exams/m4.yaml` | tak | subagent E1 | 4 |
| `content/ko/exams/m5.yaml` | tak | subagent E1 | 6 |
| `content/ko/exams/m6.yaml` | tak | subagent E1 | 9 |
| `content/ko/exams/m7.yaml` | tak | subagent E2 | 7 |
| `content/ko/exams/m8.yaml` | tak | subagent E2 | 5 |
| `content/ko/exams/m9.yaml` | tak | subagent E2 | 0 |
| `content/ko/exams/m10.yaml` | tak | subagent E2 | 8 |
| `content/ko/exams/m11.yaml` | tak | subagent E2 | 1 |
| `content/ko/exams/m12.yaml` (treść krytyczna) | tak | subagent E2 | 10 |
| `content/ko/exams/m13.yaml` | tak | subagent E2 | 1 |
| `content/ko/rules.yaml` l. 1-331 (nagłówek, R-M1…R-M4) | tak | subagent R1 | 2 |
| `content/ko/rules.yaml` l. 332-642 (R-M5…R-M7) | tak | subagent R2 | 16 |
| `content/ko/rules.yaml` l. 643-952 (R-M8…R-M10) | tak | subagent R3 | 9 |
| `content/ko/rules.yaml` l. 953-1207 (R-M12 (treść krytyczna), R-M11, R-M13) | tak | subagent R4 | 4 |
| `content/ko/areas.yaml` | tak (brak pól tekstowych, plik identyczny z pl) | subagent S1 | 0 |
| `content/ko/modules.yaml` | tak | subagent S1 | 0 |
| `content/ko/ranges/spots.yaml` | tak | subagent S1 | 0 |
| `content/ko/helplines.yaml` (treść krytyczna) | tak, zdanie po zdaniu | subagent S1 | 1 |
| `content/ko/terms-def.yaml` | tak (162 definicje) | subagent S1 | 0 |
| `content/ko/terms-nazwy.yaml` | tak (162 nazwy); luka zgłoszona przez recenzenta: tabela `docs/lokalizacja/glosariusz.md` nie czytana wiersz po wierszu (przeczytany nagłówek z zasadami i źródło tabeli `content/terms.yaml`) | subagent S1 | 0 |
| słownik interfejsu `apps/mobile/src/i18n/locales/ko.json` | tak (699 kluczy zestawione z pl klucz po kluczu) | subagent U1 | 2 |
| metadane sklepu `docs/sklep/aso/metadane-fala2.json` → `lokalizacje.ko` | tak (name, subtitle, keywords, promotionalText, description); `store/iap-localizations.json` nie ma języka ko („brak metadanych zakupów”) | subagent U1 | 5 |

Czego recenzenci jawnie nie czytali albo czytali tylko częściowo (pliki pomocnicze, nie jednostki przekładu):
- `docs/lokalizacja/glosariusz.md` (177 linii): w całości nie przeczytał nikt. Nie otwierali: L1, L6, L7, E1, R1, U1. Częściowo: L2 i R2 (nagłówek, ok. 25 pierwszych wierszy; R2 dodatkowo wiersze 7 kluczy), L4 (tylko wyszukiwanie haseł c-bet, probe-bet), L5 („nie w całości”), L8 (wiersze terminów modułu 12), S1 (nagłówek z zasadami; zamiast tabeli przeczytane w całości jej źródło `content/terms.yaml`). L3, E2, R3, R4 nie wspominają o glosariuszu. Zgodność terminów wszyscy sprawdzali względem `content/ko/terms-nazwy.yaml` (przeczytany w całości przez L1–L8, E1, R1, R2, S1, U1) i kluczy znaczników z pl.
- Wersja `en`: nieotwierana przez L1, L3, L4, L7, E1, R1, R2, S1; punktowo: L2 (m4-l2:92, m5-l1:108), L5 (m8-l4:80), L6 (m10-l3:49, 109; m10-l2:124), L8 (m12-l2:86, m12-l4:102), E2 (exams/m10:63), R3 (R-M8-003), R4 (rules:981, 1005), U1 (`help.link`, `help.intro`).
- `apps/mobile/src/i18n/locales/pl.kontekst.json`: U1 odczytał wpisy ok. 25 kluczy niejednoznacznych, nie cały plik.
- `content/numbers.yaml`, `tools/content-build/src/numbers.ts`: tylko wybrane klucze (L2, L7, L8, E1, E2, R2, R4). Faktyczne wartości wyświetlane policzył tylko E2 (`resolveNumbers`); L4 zaznacza, że nie sprawdzał, co wstawia `{{n:}}`; R4 oceniał zapis „{{n:…}},000핸드” z wartości w `numbers.yaml`, nie z wyświetlanego tekstu (skutek: sekcja 7).
- `content/ko/rules.yaml`: każdy z R1–R4 czytał tylko swój zakres linii (razem 1–1207, bez luk). Komentarze YAML po polsku (m.in. l. 1–17, 208, 329–331, 440–441, 532–533, 641–642, 952) nie są treścią.
- Lekcje poza własną częścią: E1 lekcje ko tylko przez `grep`; E2 pojedyncze linie m10-l3 i m12-l3; L7 `ko.json`/`pl.json` tylko wyszukiwaniem.
- `store/iap-localizations.json`: przeczytany (U1), języka ko nie ma — brak metadanych zakupów dla ko.
- Wcześniejszych przeglądów i `docs/decyzje.md` nikt nie czytał (zgodnie z instrukcją).

## Znaleziska bez poprawki mechanicznej

Razem z części: 46 (ŚR 7, NISKIE 39; KRYT 0, WYS 0); po połączeniu powtórzeń tej samej kwestii z różnych części tabela ma 39 wierszy (ŚR 7, NISKIE 32). Do tego 1 znalezisko własne scalania (pierwszy wiersz). Ścieżki lekcji skrócone do nazwy pliku w `content/ko/lessons/`.

| Waga | plik:linia | Opis | Propozycja | Część |
|---|---|---|---|---|
| do oceny: kandydat KRYT (treść krytyczna, zapis liczby) | `content/ko/rules.yaml:972` (R-M12-003, pole `then`) | „약 {{n:var.need.hands.k}},000핸드”: klucz ma wartość 614,656 bez `decimals` (`numbers.yaml:453`), `Intl.NumberFormat('ko')` daje „614.656”, więc na ekranie stoi „약 614.656,000핸드” (pl: „ok. 614,656 tys. rąk”). Czytelnik może to odczytać jako 614 656 000. R4 uznał zapis za poprawny, zakładając wartość ≈ 615; E2 pokazał wartość wyświetlaną „614.656” w egzaminie. W l. 957, 965, 1029 ten sam wzorzec z `var.hands.k` = 100 daje poprawne „100,000핸드”. | Zmienić zapis w l. 972 na niezależny od ułamka (np. „약 {{n:var.need.hands.k}}k 핸드” jak w m12-l1:56) albo dodać `decimals: 0` do `var.need.hands.k` i `exam.m12.need.hands.k` w `numbers.yaml` (zmiana źródła, dotyczy wszystkich języków; patrz „Pytania do źródła pl”). | scalanie (weryfikacja własna) |
| ŚR | `UI:316`, `UI:317` (`help.link`, `help.intro`) | Treść krytyczna. pl „gdy **granie** wymyka się spod kontroli”, „Jeśli **granie** przestaje być pod kontrolą” → ko „**도박**을 통제하기 어려울 때 / 어려워지고 있다면” („hazard”). Zawężenie względem pl, nie odwrócenie; en ma „gambling” w `help.link` i „your playing” w `help.intro`. Lekcje m12 mają „플레이/게임”. | Dosłownie jak pl: „도움말: 게임을 통제하기 어려울 때”, „게임을 통제하기 어려워지고 있다면”; decyzja z rodzimym użytkownikiem. | U1 (także L8) |
| ŚR | `content/ko/exams/m12.yaml:7, 10, 16, 18, 19, 20, 27, 28, 34, 37, 38` | pl „{{n:…k}} tys. rąk” → „{{n:…k}}천 핸드”; na ekranie „50천 핸드”, „960.4천 핸드”, „614.656천 핸드”. Liczba ta sama co w pl, zapis nienaturalny (oczekiwane „5만 핸드”). | Decyzja w źródle liczb (osobne klucze z pełną liczbą rąk) albo jeden zapis dla całego ko (sekcja 4, T17). | E2 |
| ŚR | `m5-l3-czestotliwosc-rozmiar.md`, `m6-l1-mdf-alpha.md`, `m6-l2-sprawdzenie.md` (51 miejsc poza 4 przykładami w JSON) | „c-bet”/„C-bet” łacinką; `terms-nazwy` i sąsiednie lekcje m5-l4, m6-l3 mają „C벳”. | Skrypt, sekcja 3 (W1). | L3 |
| ŚR | `m7-l1-druga-beczka.md:13, 33, 43, 53, 72, 82, 110`; `m7-l2-polaryzacja.md:41, 51, 61` | „c-bet” łacinką; m7-l4 (15×) i m8-l1 (2×) piszą „C벳”. 4 inne miejsca są w JSON. | Skrypt, sekcja 3 (W1). | L4 |
| ŚR | `m6-l3-check-raise.md:13, 23, 33, 41, 49, 59, 69, 73, 79, 89, 102, 109, 116, 129` | 14 znaczników `{{t:bet\|벳…}}`; nazwa terminu „베팅”, pozostałe lekcje części używają „베팅”. „C벳을 벳합니다” to powtórzenie. | Ujednolicić do „베팅” (zamiana 1:1 poprawna gramatycznie) albo przebudować na „C벳을 합니다”; zależy od T4. | L3 |
| ŚR | `m10-l1-statystyki.md:87, 130`; `m10-l2-typy-graczy.md:29, 33, 114, 142`; `m10-l3-odejscie-od-bazy.md:75, 111, 115, 129`; `m10-l4-rake.md:22, 26, 104, 126` | „populacja” ma trzy nazwy: „플레이어 풀”, „모집단”, „플레이어 집단 / 집단”. | Jedna nazwa (T21); w m10-l4 wymaga przeredagowania zdań. | L6 |
| ŚR | `m13-l1-raport.md` (16 wystąpień), `m13-l2-powtorki.md` (4) | pl „raport” → „리포트”; ekran w interfejsie to „세션 보고서”. W JSON 3 przykłady. | Skrypt, sekcja 3 (W6). | L7 |
| NISKIE | `m1-l1-przebieg.md:86` (oraz :17) | Zapowiedź „we wzorach piszemy »bet«”, a wzory w ko są przełożone (m2-l2:82–83 „베팅 전 팟 + 베팅 + 콜”). | Dostosować zdanie do koreańskich wzorów („…간단히 ‘베팅’이라고 씁니다”) albo zostawić „bet” we wzorach; wymaga przejrzenia wszystkich bloków `formula`. | L1 |
| NISKIE | m0-l1, m2-l1, m2-l2 (나/내) wobec m1-l1, m3-l1, m3-l3 (당신); m6-l1:92, 93, 135; m6-l3:123; m8-l2, m9-l1 (당신) wobec m8-l3, m8-l4, m9-l2 (나/내); `exams/m2.yaml:63, 64, 65, 72` („내 콜”) | Zwrot do czytelnika niejednolity między lekcjami i egzaminami. | Jedna konwencja dla całego ko (T19). | L1, L3, L5, E1 |
| NISKIE | `m3-l1-pozycja.md:69` wobec `m3-l3-zakresy-otwarc.md:77, 80` | „rozwiązania solverów” → „솔버 솔루션” i „솔버 해법”. | Jedna postać (T23). | L1 |
| NISKIE | m3-l1 („행동합니다”) wobec m1-l1, m3-l3 („액션합니다”) | pl „mówi” (kolejność działania) oddane dwojako. | Ewentualnie ujednolicić. | L1 |
| NISKIE | `m1-l1-przebieg.md:81` | „najlepszy układ” → „가장 높은 족보”; w m0 układ = „핸드”. | Ewentualnie „가장 좋은 핸드”. | L1 |
| NISKIE | `m4-l1-3bet.md:46, 47, 99`; `m4-l3-wobec-3betu.md:28, 36, 48, 76, 112`; m8-l3 (10×) wobec m8-l4 (7×) | „blokuje” → „블록하다” i „블로킹하다”. | Jedna postać (T22). | L2, L5 |
| NISKIE | `m5-l2-przewagi.md:17, 86, 64` wobec m5-l1 i m5-l2:37–38 | Nazwy rang raz literą (K, J, A), raz słowem (킹, 잭, 에이스). | Ewentualnie ujednolicić. | L2 |
| NISKIE | `m6-l3-check-raise.md:26, 72, 93, 123` | `{{t:oesd\|OESD}}`; w 26, 93, 123 pl ma znacznik bez formy, w 72 pl samo ma formę `OESD`. | Zostawić skrót albo usunąć formę w 26, 93, 123 (T11; sprzeczność S3). | L3 |
| NISKIE | `m6-l2-sprawdzenie.md:6, 54…132`; `m6-l3-check-raise.md:112, 114` | „wysokie karty” → „하이카드” (m6-l2) i „하이 카드” (m6-l3). | Jedna pisownia (T20; sprzeczność S1). | L3 |
| NISKIE | `m5-l3-czestotliwosc-rozmiar.md:132` wobec `m5-l4-bez-pozycji.md:105`; `m7-l1-druga-beczka.md:136` wobec m7-l2…m8-l1 | Nagłówek „Skąd te zasady” → „이 원칙의 출처” i „이 규칙의 출처”. | „이 원칙의 출처” (T24). | L3, L4 |
| NISKIE | `m6-l2-sprawdzenie.md:6` | Podtytuł „포지션 없이 … 방어하기”; tytuł m5-l4 używa „아웃 오브 포지션”. | „아웃 오브 포지션에서 C벳 방어하기”. | L3 |
| NISKIE | m7-l1, m7-l3 wobec m7-l2, m7-l4, m8-l1 | Dwa style czasownika w znaczniku: „{{t:check\|체크합니다}}” i „{{t:check\|체크}}합니다”. | Bez zmian albo przy okazji. | L4 |
| NISKIE | `m7-l4-probe-obrona.md:46, 78` wobec m7-l1, m7-l3 | Klasyfikator outów: „아웃 {{n:…}}개” i „아웃 {{n:…}}장”. | „장” po sprawdzeniu, co wyświetla `{{n:}}`. | L4 |
| NISKIE | `m8-l1-value.md:138` wobec m7-* | „materiały szkoleniowe” → „트레이닝 자료” (1×) i „교육 자료” (25×). | „교육 자료”. | L4 |
| NISKIE | `m8-l1-value.md` (cały plik) wobec m7-* | Zwykłe słowo „bet” jako „벳” (m8-l1, 72×) i „베팅” (m7-*). | Decyzja T4. | L4 |
| NISKIE | `m9-l1-spr.md:73, 107` | „{{t:bet\|베팅}}을 {{t:bet\|하기}} 전에”: forma „하기” nie jest postacią nazwy terminu, klikalne będzie samo „하기”. | Jeden znacznik: „누군가 {{t:bet\|베팅}}하기 전에” (zmienia liczbę znaczników t z 2 na 1 względem pl — decyzja, czy strażnik na to pozwala). | L5 |
| NISKIE | m8-l2, m8-l3, m8-l4 | „nietrafiony draw”: „맞지 않은 … 드로우” (2×), „실패한 드로우” (6×), „빗나간 드로우” (5×). | Jedna postać, np. „빗나간 드로우” (jak m8-l1). | L5 |
| NISKIE | m8-l2 (지불 6×) wobec m8-l3/m8-l4 (돈을 내다 14×); `exams/m5.yaml:90`; `exams/m6.yaml:39, 76, 77` | „zapłacić/płacić” (= sprawdzić): dwie postaci; w żargonie naturalniej „콜합니다”. | Bez zmiany albo decyzja T25. | L5, E1 |
| NISKIE | `m10-l4-rake.md:42, 93, 102` | Po zmianie znaczników na „레이크 캡” zostaje zwykły tekst „상한” (pl „limit”, bez znacznika). | Zostawić jako opis albo „캡”. | L6 |
| NISKIE | m9-l3 (계획, 스택 전부) wobec m9-l4 (플랜, 스택 전체); „próg” = 기준점 (m9-l3, m10-l3) / 기준 (m10-l1, m10-l2) / 기준선 (m10-l4); `terms-def.yaml:108` („핸드 계획”) wobec `modules.yaml:10` („핸드 플랜”) | Różne słowa na to samo w sąsiednich lekcjach i w definicji SPR wobec tytułu modułu 9. | Ujednolicić przy okazji. | L6, S1 |
| NISKIE | m9-l4, m10-l1, m10-l2 (wiele linii); także m6-l1…m6-l3, m11-l3, m13-l3 | Dwukropek w środku zdania kalkowany z pl („맞습니다: …”); inne lekcje używają kropki. | Interpunkcja, bez wpływu na sens. | L6 (także L3, L7) |
| NISKIE | `exams/m12.yaml:64, 66`; `rules.yaml:1005, 1012` wobec `m12-l3-tilt.md` | „C-게임” w egzaminie i regułach, „C-game”/„A-game” w lekcji. | Jeden zapis w całym ko (T26). | E2 |
| NISKIE | `exams/m10.yaml:64, 73` | „상대는 {{n}}에서 폴드하므로…” — kalka „pasuje w 40%”. | Np. „상대의 폴드는 {{n:exam.m10.fcb}}이므로 너무 적습니다”; rodzimy użytkownik. | E2 |
| NISKIE | `rules.yaml:440–441, 532–533, 641–642` | Komentarze YAML po polsku. | Bez zmiany (nie trafiają na ekran). | R2 |
| NISKIE | `rules.yaml:464` | W `source` „디펜드했습니다”, „디펜스”, a w if/then tej reguły „방어합니다”. | „방어했습니다”, „방어” przy okazji. | R2 |
| NISKIE | `terms-def.yaml:51, 52` | Definicje straight-draw i oesd używają skrótu „OESD”, a nazwa terminu to „양방향 스트레이트 드로우”; definicja zaczyna się „OESD는 open-ended straight draw의 약자로”. | W 51 „양방향 스트레이트 드로우(OESD)”, w 52 „OESD(open-ended straight draw)라고도 하며, …” (T11). | S1 |
| NISKIE | `terms-def.yaml:101` | „밸류 베팅에는”; nazwa terminu value-bet to „밸류 벳”. | „밸류 벳에는”. | S1 |
| NISKIE | `terms-def.yaml:130` | „na ile pełnych okrążeń (orbit)” → „몇 바퀴(오빗)”; pominięte „pełnych”. | Bez wpływu na wniosek. | S1 |
| NISKIE | `SKLEP:26` | Słownictwo sklep ↔ aplikacja: „강좌” (UI „강의”), „정답률” (UI „정확도”), „전체 이용권” (UI „전체 이용”), „연속 일수” (UI „연속 학습”). | Ujednolicić przy najbliższej edycji opisu. | U1 |
| NISKIE | `SKLEP:26` | Nagłówek „DOSTĘP” → „이용 방법” („sposób korzystania”). | „이용 범위” albo „이용권”. | U1 |
| NISKIE | `SKLEP:26` | Ostatnia linia: znacznik „[PRIVACY URL]” jak w en-US; etykiety dwujęzyczne. | Uwaga dla sesji zapisującej do ASC (znacznik do podmiany). | U1 |
| NISKIE | `SKLEP:24` | Słowa kluczowe „프리플랍, 포스트플랍”, aplikacja „프리플롭/플롭”. Może celowe (wyszukiwanie). | Potwierdzić w roli sklepu. | U1 |

Części bez znalezisk tego rodzaju: L8, R1, R3, R4.

## Do ujednolicenia skryptem

Sposób liczenia. „Tekst” = wystąpienia poza kluczami znaczników `{{t:klucz` i `{{n:klucz}}`, poza komentarzami YAML i poza `terms-nazwy.yaml` (formy w komentarzach). Komenda bazowa dla wzorców łacińskich:

```
LC_ALL=C.UTF-8 grep -rhvP '^\s*#' --exclude=terms-nazwy.yaml content/ko apps/mobile/src/i18n/locales/ko.json | grep -oP '\{\{[tn]:[^|}]*(*SKIP)(*F)|WZORZEC' | wc -l
```

Dla wzorców koreańskich: `LC_ALL=C.UTF-8 grep -rhoP --exclude=terms-nazwy.yaml 'WZORZEC' content/ko apps/mobile/src/i18n/locales/ko.json | wc -l`. Rozbicie na pliki i pokrycie przez `poprawki-ko.json` (różnica liczby trafień w `stary` i `nowy`) policzone skryptem pomocniczym na tych samych wzorcach. Kolejność: skrypt ma działać **po** nałożeniu `poprawki-ko.json` albo pomijać linie wymienione jako „już w poprawkach” — inaczej poprawki z tym wzorcem w polu `stary` nie znajdą dopasowania.

**W1. `c-bet`, `C-bet` → `C벳` (ŚR).** Wynik komendy z `[cC]-bet`: 139, z tego tekst do zamiany 135 (lekcje 98, egzaminy 37; `UI` 0).
- Pliki: m10-l3 22; m5-l3 23; m6-l2 29; m6-l1 3; m7-l1 10; m7-l2 4; m5-l2 4; m5-l1 1; m13-l2 2; exams/m6 14; exams/m10 16; exams/m7 5; exams/m8 2.
- Już w `poprawki-ko.json` (16): m5-l1:58; m5-l2:69, 71, 73, 99; m5-l3:6; m6-l1:79; m6-l2:6, 100; m7-l1:108, 114, 118; m7-l2:110; m13-l2:67, 89; exams/m6:28. Po nałożeniu zostaje 119.
- Wyjątki: `rules.yaml:413` (pole `source`, angielskie tytuły i cytat: „IP C-Betting”, „C-Bet Sizing”) i `:414` (`sources`, URL) — 4 trafienia; `terms-def.yaml:86` (klucz YAML `c-bet:`); klucze znaczników `{{t:c-bet…}}`.
- Najpierw złożenia: `fold to c-bet` → `폴드 투 C벳` (m10-l3: 6×), `폴드 투 c-bet` → `폴드 투 C벳` (exams/m10: 5×); `rules.yaml` ma już „폴드 투 C벳”. Partykuły bez zmian (oba zapisy kończą się spółgłoską); „c-bet하며” → „C벳하며”.

**W2. `C-벳`, `c-벳`, `c벳` → `C벳` (ŚR w egzaminach, NISKIE w `source`).** Komenda z `C-벳|c-벳|c벳`: 15.
- exams/m5: 10 (l. 47, 51, 57, 60, 75, 80×2, 89, 90, 95), w poprawkach 2 (57, 60), zostaje 8.
- exams/m13:73 (`c-벳`): w poprawkach. `rules.yaml:429, 464, 521×2` (`c벳`, pola `source`): wszystkie 4 w poprawkach R2.
- „씨벳”: 0 w treści (tylko komentarz w `terms-nazwy.yaml`).

**W3. `3-bet` → `3벳` (ŚR).** Komenda z `3-bet`: 116, z tego tekst do zamiany 61.
- Pliki: m10-l3 31 (w tym `fold to 3-bet` 4× i `Fold to 3-bet` 1× w nagłówku tabeli → `폴드 투 3벳`); exams/m10 17; m4-l2 9; m3-l2 2; exams/m3 2.
- Już w poprawkach (13): m4-l2:44, 45, 67, 79, 92×5; m3-l2:35, 53; exams/m3:87×2. Po nałożeniu zostaje 48 (m10-l3 31, exams/m10 17).
- Wyjątki: `rules.yaml` — 55 trafień w 26 liniach, wszystkie w polach `source` (16 linii: angielskie tytuły i cytaty, np. „Mostly 3-bet”, „Crush 3-Bet Pots OOP”) i `sources` (10 linii: URL); `terms-def.yaml:68` (klucz `3-bet:`); klucze `{{t:3-bet…}}`, `{{n:pf.3bet…}}`. Partykuły bez zmian.

**W4. `4-bet` → `4벳` (ŚR).** Komenda z `4-bet`: 7. Tekst: tylko m13-l2:58 (2×), oba w poprawkach L7 — skrypt nie ma nic do zrobienia. Wyjątki: `rules.yaml:292×3, 833` (`source`, cytaty), `terms-def.yaml:69` (klucz).

**W5. `프리플랍` → `프리플롭`, `플랍` → `플롭` (NISKIE).** Komenda z `플랍`: 22 (w tym `프리플랍` 15), wszystkie w `content/ko/rules.yaml`, wszystkie w polach `source` (18 linii).
- Już w poprawkach (7): l. 338×2, 346×2, 413, 513 (R2), 748 (R3). Zostaje 15 = wszystkie `프리플랍` w l. 126, 135, 144, 170, 179, 187, 196, 206×3, 243, 252, 309, 317, 326 (zakres R1, zgłoszone bez poprawek).
- Wyjątki: `SKLEP:24` słowa kluczowe „프리플랍, 포스트플랍” (decyzja roli sklepu); opis sklepu `SKLEP:26` jest już w poprawkach U1.

**W6. `리포트` → `보고서` (ŚR).** Komenda: 23. m13-l1 16 (l. 5, 34, 37, 54, 61, 63, 64×2, 70, 73, 76×2, 80, 97, 101, 105); m13-l2 4 (31, 73, 89, 93); exams/m13 2 (23, 34); rules.yaml:1155 1.
- Już w poprawkach (3): m13-l1:5, 76 (jedno z dwóch wystąpień w linii), 105. Zostaje 20. Partykuły bez zmian (oba słowa kończą się samogłoską).
- Uwaga: m13-l1:61 i 97 mają osobne poprawki L7 („평가됨” → „평가”) w tych samych liniach; skrypt po poprawkach.

**W7. `벳` → `베팅` jako samodzielne słowo i forma znacznika `bet` (ŚR) — tylko jeśli tak rozstrzygnie T4.**
- `grep -rhoP '\{\{t:bet\|벳' content/ko UI | wc -l` = 50: m6-l3 14; exams/m6 8; exams/m7 6; m7-l4 5 linii; m8-l2 1; `UI` 14. `{{t:bet|베팅…` = 322.
- Samodzielne „벳” (`(?<![가-힣0-9A-Za-z\-])벳`, liczy też człon po spacji w „프로브 벳”, „밸류 벳”, „블로킹 벳”): 238 — m8-l1 72; m8-l2 58; exams/m7 30; exams/m6 20; m7-l4 18; m6-l3 14; m8-l3 6; rules.yaml 4 (l. 619, 649, 871, 874); `UI` 16.
- Wyjątki: nazwy złożone z `terms-nazwy` („C벳”, „3벳”, „4벳”, „오버벳”, „밸류 벳”, „프로브 벳”, „블로킹 벳”); `UI` (przyciski i etykiety, U1: nie błąd); czasownik zamieniać parami („벳합니다” → „베팅합니다”, „벳한다면” → „베팅한다면”). Partykuły bez zmian.
- Już w poprawkach: tylko m8-l2:38 (`{{t:bet|벳}}` → `{{t:bet|베팅}}`, L5). Poprawki L4 m8-l1:26 („넛으로만 벳하게”) i R2 rules:626 („프로브 벳을 {{t:bet|베팅}}할 때”) zawierają „벳” w polu `nowy` — skrypt po poprawkach nie może ruszyć „프로브 벳”, a „벳하게” w m8-l1:26 zmieni zgodnie z decyzją.

**W8. `}}천 핸드` → jeden zapis „tys. rąk” (ŚR) — po rozstrzygnięciu T17.** `grep -rhoP '\}\}천 핸드' content/ko | wc -l` = 15: exams/m12 13 (l. 7, 10, 16, 18, 19, 20, 27×2, 28×2, 34, 37, 38); m12-l2:68 (w poprawkach L8 → „k 핸드”); m13-l1:105. Dla porównania `\}\}k 핸드` = 31 (m12-l1 30, m12-l4 1), `\}\},000핸드` = 4 (rules.yaml:957, 965, 972, 1029).
- Wyjątki: „천 핸드” jako słowo „tysiąc rąk” bez znacznika (exams/m10:28, m10-l1:51, m10-l3:88) i „수천 핸드” (m12-l1:6, m13-l1:72, exams/m13:55).

**W9. `배드 빗` → `배드 비트` (NISKIE).** Komenda: 3 (wobec „배드 비트” 9). exams/m12:55 w poprawkach E2; zostaje m13-l3:76, 87.

**W10. `{{t:oesd|OESD}}` → znacznik bez formy albo pełna nazwa (NISKIE) — po rozstrzygnięciu T11.** „OESD” w treści: 13 — exams/m2:12, 36, 45, 86; m6-l3:26, 72, 93, 123; exams/m8:46; exams/m13:44; rules.yaml:502 (w poprawkach R2); terms-def.yaml:51, 52. Wyjątek do decyzji: miejsca, gdzie pl samo ma formę `{{t:oesd|OESD}}` (exams/m2 ×4, exams/m8:46, exams/m13:44, m6-l3:72).

**Wzorce w całości pokryte przez `poprawki-ko.json` (skrypt ma ich nie dublować; po nałożeniu poprawek 0 trafień):**

| Wzorzec → zamiana | Trafień (komenda z wzorcem) | Gdzie, wszystkie w poprawkach | Waga |
|---|---|---|---|
| `너츠` → `넛` (z partykułą po samym „넛”: 는→은, 가→이, 를→을, 와→과, 로→으로) | 22 | m5-l2 11; m5-l3 3; m8-l1:26; exams/m5 3; rules.yaml:360, 367, 411, 511 | ŚR |
| `{{t:initiative\|이니셔티브}}` → `주도권` (를→을, 는→은, 가→이) | 8 | m3-l1:37, 69; m4-l4:28, 48; m5-l4:18×2; m7-l1:95×2 | ŚR |
| `투페어` → `투 페어` | 13 | m0-l1 8; rules.yaml:29, 360, 502, 801, 817 | ŚR |
| `닛` → `니트` (이→가, 은→는, 을→를, 과→와) | 8 | m10-l1:69×3; exams/m10:34; rules.yaml:862, 878, 882, 883; dodatkowo exams/m10:38 `{{t:nit}}은` → `는` | ŚR |
| `레이크 상한` / `{{t:rake-cap\|상한}}` → `레이크 캡` | 7 | m10-l4:42, 43, 44, 49, 93; exams/m10:80; rules.yaml:947 | ŚR |
| `수딧` → `수티드` | 15 | m4-l1 6; m4-l4 5; m5-l2 2; m6-l2:116; exams/m4:72 | ŚR |
| `오픈엔디드` → `양방향` | 10 | m2-l1:111, 126; m7-l2:87, 104, 127; m7-l3:54, 114, 116; exams/m7:63, 70 | ŚR |
| `양방` (bez „향”) → `양방향` | 4 | m5-l1:74, 101×2, 103 | NISKIE |
| `웨트` → `웻`, `웨트니스`/`웻 정도` → `웻니스` | 5 + 1 | m5-l3:104, 122×4; m5-l1:80 | ŚR |
| `기대값` → `기댓값` | 3 | m6-l2:96; m7-l4:107; rules.yaml:649 | NISKIE/ŚR |
| `레크리에이셔널 플레이어` → `레크리에이션 플레이어` | 10 | m10-l2:29, 31, 32, 39, 49, 109, 116, 118, 126, 128 | ŚR |
| `자유 게임` → `자유 플레이` | 3 | m13-l2:69, 71×2 | ŚR |
| `체크 레이즈` → `체크레이즈`; `check-raise` (tekst) → `체크레이즈` | 3 + 1 | m7-l4:18×2, 78; m5-l3:39 (pozostałe „check-raise”: rules.yaml:505, 521, 522 w `source`, terms-def.yaml:19 klucz — wyjątki) | ŚR |
| `지오메트릭 사이즈` → `기하학적 사이즈` | 6 | m9-l2:110; m9-l4:72, 75, 76×2, 111 | ŚR |
| `이펙티브 스택` → `유효 스택` | 4 | m9-l1:64, 66, 110, 113 | ŚR |
| `레이즈가 한 번 나온 팟` → `싱글 레이즈 팟` | 4 | m9-l3:36, 45, 48, 124 | NISKIE |
| `수비` → `방어` | 5 z 6 | exams/m7:11, 12, 13, 80, 90 (szóste trafienie „수비” w lekcjach niezgłoszone — do obejrzenia) | NISKIE |

Wzorce zgłoszone przez części, ale bez skryptu (wymagają przeredagowania albo decyzji): „próg” 기준점/기준값/기준선 (E1, L6); „zapłacić” 지불/돈을 내다/콜 (T25); „populacja” (T21); zwrot 나/당신 (T19); „하이 카드” (T20).

## Rozstrzygnięcia terminologiczne do podjęcia

Liczby: treść `KO` bez `terms-nazwy.yaml` + `UI`, komendy jak w sekcji 3. „Po poprawkach” = stan po nałożeniu `poprawki-ko.json`.

| # | Kwestia | Formy i liczba wystąpień | `terms-nazwy` | `UI` | Rekomendacja (powód) |
|---|---|---|---|---|---|
| T1 | c-bet | „c-bet”/„C-bet” (łac., tekst) 135; „C벳” 110; „C-벳” 10; „c-벳” 1; „c벳” 4; „씨벳” 0 | C벳 | „C벳” (2) | **C벳** — nazwa z `terms-nazwy`, jedyna forma w interfejsie; zamiana W1, W2. |
| T2 | 3-bet | „3-bet” (tekst) 61; „3벳” 206 | 3벳 | „3벳” (1) | **3벳** — nazwa z `terms-nazwy` i większość użyć; W3. |
| T3 | 4-bet | „4-bet” (tekst) 2; „4벳” 72 | 4벳 | brak | **4벳** — oba łacińskie miejsca są już w poprawkach. |
| T4 | bet: 벳 / 베팅 | „베팅” 856 (w tym `{{t:bet\|베팅…` 322); samodzielne „벳” 238 (w tym `{{t:bet\|벳…` 50) | 베팅 (komentarz: „벳” jako forma tłumacza) | tylko „벳” (`{{t:bet\|벳}}` 14, 0× „베팅”) | **W treści (lekcje, egzaminy, reguły) „베팅/베팅하다”; „벳” zostaje w nazwach złożonych (C벳, 3벳, 오버벳, 밸류 벳, 프로브 벳, 블로킹 벳) i na przyciskach interfejsu** — zgodne z nazwą terminu i z 4/5 użyć, a krótka forma na przycisku jest odnotowana w `terms-nazwy`; do potwierdzenia przez rodzimego użytkownika, bo części się różnią (S5). |
| T5 | nuts | „너츠” 22; „넛” 4; „넛 어드밴티지” 1 | 넛; nuts-advantage = 넛 우위 | brak | **넛 / 넛 우위** — wszystkie 22 + 1 miejsca są w poprawkach, formy „너츠” nie ma w źródłach. |
| T6 | initiative | „이니셔티브” 8; „주도권” 8 | 주도권 | brak | **주도권** — wszystkie 8 miejsc w poprawkach. |
| T7 | two pair | „투페어” 13; „투 페어” 34 | 투 페어 | „투 페어” (2) | **투 페어** — wszystkie 13 w poprawkach. (Osobno: „2 페어” = para dwójek, L7 poprawia na „2의 페어”.) |
| T8 | nit | „닛” 8; „니트” 9 | 니트 | „니트” (2) | **니트** — wszystkie 8 w poprawkach, z partykułami. |
| T9 | rake cap | „레이크 상한” 6 (+1 forma „상한”); „레이크 캡” 0 | 레이크 캡 | brak | **레이크 캡** — nazwa z `terms-nazwy` (źródło D), 7 miejsc w poprawkach; zwykłe „상한” w m10-l4:42, 93, 102 zostawić jako opis. S1 oznacza nazwę jako mniej utartą — pozycja do rodzimego użytkownika. |
| T10 | suited | „수딧” 15; „수티드” 26 | 수티드 | „수티드” (1) | **수티드** — wszystkie 15 w poprawkach. |
| T11 | OESD | „OESD” 13; „오픈엔디드 …” 10; „양방향 …” 5; „양방 …” 4 | 양방향 스트레이트 드로우 | `{{t:oesd\|양방향 스트레이트 드로우}}` (1), „양방향” (2) | **Pełna nazwa „양방향 스트레이트 드로우”; skrót „OESD” tylko tam, gdzie pl ma formę `\|OESD` (exams/m2 ×4, exams/m8:46, exams/m13:44, m6-l3:72), i dopisany w `terms-nazwy` jako dopuszczona forma** — jedna reguła zgodna z poprawką R2 i z interfejsem; wtedy w m6-l3:26, 93, 123 usunąć formę (dziś bez poprawki, S3), a `terms-def.yaml:51–52` wg propozycji S1. |
| T12 | wet / wetness | „웨트” 5; „웻” 32; „웻 정도” 1; „웨트니스” 1 | 웻; 웻니스 | „웻” (6), „웻니스” (1) | **웻 / 웻니스** — wszystkie odstępstwa w poprawkach. „웻니스” oznaczone [DO USTALENIA] — rodzimy użytkownik. |
| T13 | flop | „플랍” 7; „플롭” 630 | 플롭 | „플롭” (26) | **플롭** — pisownia normatywna i 99% użyć; 7 miejsc w `source` w poprawkach. |
| T14 | preflop | „프리플랍” 15; „프리플롭” 62 | 프리플롭 | „프리플롭” (1) | **프리플롭** — także w polach `source` (W5, 15 miejsc bez poprawki); słowa kluczowe sklepu osobno (rola sklepu). |
| T15 | expected value | „기대값” 3; „기댓값” 9 | 기댓값 | brak | **기댓값** — pisownia normatywna; 3 miejsca w poprawkach. |
| T16 | raport | „리포트” 23; „보고서” 11 | brak hasła | „보고서” (4: `play.report.title` „세션 보고서”, „최근 보고서”) | **보고서** — tak nazywa się ekran; W6. |
| T16a | gra swobodna | „자유 게임” 3; „자유 플레이” 1 | brak hasła | „자유 플레이” (`play.free`) | **자유 플레이** — nazwa trybu z interfejsu; 3 miejsca w poprawkach. |
| T17 | „tys. rąk” | „{{n}}천 핸드” 15; „{{n}}k 핸드” 31; „{{n}},000핸드” 4 | — | — | **„{{n}}k 핸드” w lekcjach, egzaminach i regułach, plus pytanie do źródła o `decimals: 0` dla kluczy `*.need.hands.k`** — jedyny zapis, który nie psuje się przy ułamku (rules:972 daje dziś „614.656,000핸드”) i nie daje „100천”; części rozstrzygnęły to trzema sposobami (S4). |
| T18 | board: 테이블 / 보드 | „테이블” w znaczeniu board: 2 (m10-l3:49, exams/m10:63); „보드” 141 | 보드 | — | **보드** — oba miejsca w poprawkach (L6, E2), zgodnie; warunek: odpowiedź na pytanie do pl („stoły” = board czy stoły do gry). |
| T19 | zwrot do czytelnika | „당신” 334 (lekcje 220, egzaminy 114; reguły 0; `UI` 0); „나/내/내가…” 197 (lekcje i egzaminy 114, reguły 42, terms-def 5, `UI` 36; wzorzec `(?<![가-힣])(나는\|나를\|내가\|내 \|나의\|나에게\|내게)`). Tylko „당신”: 15 lekcji (m.in. m5-l2…m5-l4, m7-l4, m8-l2, m13-l1) i egzaminy m0, m1, m3, m5, m7, m10, m11, m13; tylko „나/내”: 13 lekcji (m.in. m0-l1, m2-l2, m6-l3, m8-l3, m8-l4, m9-l2, m12-l2, m12-l3) i egzaminy m2, m9, m12; mieszane: m7-l1, m7-l2, m8-l1, m10-l1, m10-l3, m11-l3, exams/m8 | — | tylko „내/나의” (36), 0× „당신” | **„나/내” albo pominięcie zaimka; bez „당신”** — tak mówią interfejs, reguły i cały moduł 12, a „당신” w tekście instruktażowym brzmi jak kalka; to ok. 334 miejsc do przeredagowania (nie skrypt) i wymaga potwierdzenia rodzimego użytkownika. Do tego czasu nie nakładać poprawek dopisujących „당신” (S6). |
| T20 | wysokie karty / high card | „하이카드” 21; „하이 카드” 15; „높은 카드” 54 | high-card = 하이카드 (nazwa układu) | „하이카드” (2, nazwa układu) | **„하이카드” tylko jako nazwa układu; „wysokie karty” = „높은 카드”** — rozdziela dwa pojęcia; kierunek L7, sprzeczny z poprawkami E1 (S1) i z m6-l2 (10× „하이카드” w znaczeniu wysokich kart). |
| T21 | populacja | „모집단” 23 (lekcje 12, reguły 11); „플레이어 풀” 7 (lekcje 2, `UI` 3); „플레이어 집단” 5 | brak hasła | „플레이어 풀 데이터”, „플레이어 풀: …” (3) | **Decyzja między „모집단” (większość treści, propozycja L6) a „플레이어 풀” (interfejs)**; rekomendacja: „플레이어 풀” — etykieta poziomu pewności w interfejsie stoi obok treści reguł, a „모집단” to termin statystyczny; rodzimy użytkownik. |
| T22 | blokować | „블록하다” 19 (lekcje 13, reguły 6); „블로킹하다” 15 | blocker = 블로커 | brak | **블록하다** — forma z reguł i większość. |
| T23 | rozwiązania solverów | „솔버 솔루션” 11; „솔버 해법” 10 | — | „공개된 솔버 해법” (2) | **솔버 해법** — forma z interfejsu i reguł (4). |
| T24 | „Skąd te zasady” | „이 원칙의 출처” 9; „이 규칙의 출처” 5; „이 원칙의 근거” 1 (w poprawkach L7) | — | — | **이 원칙의 출처** — większość; 5 nagłówków do zmiany ręcznie. |
| T25 | zapłacić (= sprawdzić) | „지불…” 95; „돈을 내다/냅니다/낼” 80 | — | — | **Bez masowej zmiany; pytanie do rodzimego użytkownika, czy „콜하다”** — pl rozróżnia „zapłaci” i „sprawdzi”, recenzenci uznali obie formy za poprawne; E1 zmienił jedno miejsce (S7). |
| T26 | C-game / A-game | „C-게임” 4 (exams/m12:64, 66; rules:1005, 1012); „C-game”/„A-game” 11 (m12-l3) | brak hasła | brak | **„C-게임 / A-게임”** — zapis koreański w zdaniu koreańskim, jak reszta żargonu; treść krytyczna, zmiana tylko pisowni. |
| T27 | bad beat | „배드 빗” 3; „배드 비트” 9 | brak hasła | brak | **배드 비트** — większość; W9. |
| T28 | polarized / condensed | „양극화된” 1; „폴라라이즈드” 29; „압축된” 1; „컨덴스드” 1 | 폴라라이즈드; 컨덴스드 [DO USTALENIA] | brak | **Zostają nazwy z `terms-nazwy`** — oba odstępstwa w poprawkach L3; „컨덴스드” do potwierdzenia przez gracza (S1). |
| T29 | granie / hazard w ekranie pomocy | `UI:316–317` „도박”; lekcje m12 „플레이/게임” | — | „도박” (3) | **Decyzja z rodzimym użytkownikiem; do tego czasu bez zmiany** — treść krytyczna, obecny tekst nie łagodzi ostrzeżenia, a zmiana na „게임” bez znajomości odbioru mogłaby je osłabić. |
| T30 | winrate | „승률” 8; „윈레이트” 91 | 윈레이트 | brak | **윈레이트 dla bb/100** — 3 miejsca w poprawkach L6; pozostałe 5 „승률” (m4-l2:34, m6-l1:74, m6-l2:94, 116, rules:873) znaczą odsetek wygranych na showdownie i zostają. |

Pozostałe drobne pary zgłoszone przez części, bez osobnego wiersza: „족보/핸드/패” dla „układ” (L1, E1, R2); „계획/플랜” (L6, S1); „교육 자료/트레이닝 자료” (L4); „차트/표” (L7); „강좌/강의” sklep ↔ interfejs (U1); „팟 커밋” bez hasła w `terms-nazwy` (L5).

### Sprzeczności między poprawkami części

Kontrola mechaniczna: żadna linia nie jest zmieniana przez dwie różne części (jedyny plik z poprawkami kilku części to `content/ko/rules.yaml`, zakresy linii R1–R4 rozłączne); `zloz.mjs` nie zgłosił kolizji. Sprzeczności dotyczą kierunku albo niedokończonego ujednolicenia:

- **S1 (kierunek przeciwny).** „wysokie karty” zapisane „하이 카드”: E1 poprawia na **„하이카드”** (`content/ko/exams/m6.yaml:67`, `:68`), L7 poprawia na **„높은 카드”** (`content/ko/lessons/m11-l2-sprawdzanie.md:57`, `:140`) z uzasadnieniem, że „하이카드” to nazwa układu. To samo polskie wyrażenie, dwie formy docelowe. Po T20: wykluczyć obie poprawki E1 i zastąpić je „높은 카드 두 장”.
- **S2 (różna reguła odczytu jednostki).** Partykuła po liczbie z „bb/100”: E2 poprawia `content/ko/exams/m12.yaml:18` „와” → „과” (odczyt „…백”, spółgłoska), a L8 i R4 zostawiają formy samogłoskowe i piszą wprost „nie poprawiałem, do rozstrzygnięcia jedną regułą”: `m12-l1-wariancja.md:38, 57, 72, 83, 92, 102`, `m12-l4-bankroll.md:20, 58`, `content/ko/rules.yaml:957, 965, 1029`. Po nałożeniu egzamin m12 będzie czytał jednostkę inaczej niż lekcje i reguły modułu 12. Albo wstrzymać poprawkę E2 (m12:18), albo przyjąć odczyt „백” i poprawić 11 miejsc w lekcjach i regułach.
- **S3 (ten sam przypadek, dwa rozstrzygnięcia).** `{{t:oesd|OESD}}` w ko tam, gdzie pl ma `{{t:oesd}}` bez formy: R2 poprawia na pełną nazwę (`content/ko/rules.yaml:502`), L3 zostawia bez poprawki „do decyzji” (`content/ko/lessons/m6-l3-check-raise.md:26`, `:93`, `:123`). E2 zostawia skrót tam, gdzie ma go pl (exams/m8:46, exams/m13:44) — to spójne z T11.
- **S4 (trzy zapisy „tys. rąk”).** L8 poprawia `content/ko/lessons/m12-l2-decyzja-wynik.md:68` „천 핸드” → „k 핸드”; E2 zostawia 13 wystąpień „천 핸드” w `content/ko/exams/m12.yaml` („do czasu decyzji zostawić”); L7 zostawia `m13-l1-raport.md:105` „{{n}}천 핸드”; R4 uznaje za poprawne „{{n}},000핸드” w `content/ko/rules.yaml:957, 965, 972, 1029` (l. 972 jest błędna na ekranie). Poprawka L8 jest zgodna z T17, ale sama nie ujednolica modułu 12.
- **S5 (벳 / 베팅).** L5 poprawia jeden znacznik `content/ko/lessons/m8-l2-ile-blefow.md:38` `{{t:bet|벳}}` → `{{t:bet|베팅}}` i zaleca zamianę pozostałych 57 „벳” w tym pliku skryptem; U1 uznaje `{{t:bet|벳}}` (14× w `UI`) za poprawne; L4 w poprawce `m8-l1-value.md:26` zostawia „벳하게” i odkłada „벳” w m8-l1 „do decyzji”; L3 i E2 zalecają „베팅” (m6-l3, exams/m7), E1 „nie poprawiałem” (exams/m6). Bez skryptu W7 poprawka L5 zostawi w m8-l2 jedno „베팅” wśród 57 „벳”.
- **S6 (zwrot do czytelnika).** L3 dopisuje „당신은/당신이” w `content/ko/lessons/m6-l3-check-raise.md:41`, `:49`, `:54`; ten plik ma dziś 0× „당신” i 3× „나/내” (m.in. l. 123), a L1 i L5 odkładają wybór 나/당신 do decyzji dla całego ko. Brak podmiotu w l. 41 i 49 to realna usterka sensu (czyta się, że przebił Button), więc poprawki są potrzebne, ale ich brzmienie zależy od T19 (przy „나/내”: „내가 …까지 레이즈했습니다”, „내가 C벳에 콜할 때”).
- **S7 („zapłacić”).** E1 zmienia `content/ko/exams/m4.yaml:63` „3벳에 돈을 내주게 됩니다” → „3벳을 콜하게 됩니다”, a ten sam recenzent (exams/m5:90, exams/m6:39, 76, 77) oraz L4, L5, E2, R2 zostawiają „돈을 냅니다/지불합니다” jako poprawne i pytają rodzimego użytkownika. Poprawka dotyczy innego czasownika („내주다”), więc może zostać; odnotowane, bo wyprzedza T25.
- **S8 (niedokończone ujednolicenia tej samej frazy).** (a) „błąd maleje z pierwiastkiem”: L8 (`m12-l1-wariancja.md:49`, `:118`) i R4 (`content/ko/rules.yaml:973`) poprawiają „비례” → „반비례”, R3 to samo zdanie w `content/ko/rules.yaml:839` zostawia tylko w „Do sprawdzenia”. (b) payout: L7 poprawia „페이아웃” → „상금 (구조)” w `m11-l3-icm.md:29, 39, 71, 161`, E2 zostawia formę „상금 지급” w `content/ko/exams/m11.yaml:67`. (c) „배드 빗”: E2 poprawia exams/m12:55, L7 zostawia `m13-l3-przeglad.md:76, 87`.

Poprawki warunkowe (zależne od odpowiedzi, nie sprzeczne): „테이블” → „보드” w `m10-l3-odejscie-od-bazy.md:49` (L6) i `content/ko/exams/m10.yaml:63` (E2) — pominąć obie, jeśli pl miało na myśli stoły do gry; `content/ko/exams/m4.yaml:111` „림프 비하인드 / 스페큘레이티브” → „콜 / 투기적인” (E1) — sam recenzent dopuszcza zostawienie „림프 비하인드”; `m10-l2-typy-graczy.md:116, 124` „승률” → „윈레이트” (L6) — do pominięcia, gdyby rodzimy użytkownik uznał „승률” dla bb/100; `content/ko/exams/m12.yaml:18` (S2).

## Do sprawdzenia przez rodzimego użytkownika

Pozycje z sekcji „Do sprawdzenia” wszystkich części, bez duplikatów. Ścieżki lekcji: `content/ko/lessons/`, egzaminów: `content/ko/exams/`.

Terminologia i nazwy:
- `terms-nazwy.yaml` — nazwy mniej utarte: „웻니스” (wetness), „컨덴스드” (condensed), „M 비율” (M-ratio), „레이크 캡”, „파산 위험” (risk of ruin), „스택 오프”; warianty pisowni „오프수트/오프슈트”, „수티드/수딧”. (S1)
- `UI:316–317` `help.link`, `help.intro` — „도박을 통제하기 어려울 때” zostaje, czy dosłownie „게임/플레이”? Także: czy „도움말” to dobra nazwa ekranu z pomocą przy problemach z hazardem (zwykle „pomoc do programu”), czy „도움/도움 받기”? (U1, S1, L8)
- `UI` `purchase.title`, `settings.fullAccess`, `start.fullAccess` — „전체 이용” czy „전체 이용권” (jak w opisie sklepu)? (U1)
- `SKLEP:23` podtytuł po poprawce „판돈 없음” — czy lepsze „실제 돈 없음”? (U1)
- m4-l4 („콜”, „빅 블라인드에 콜만 했습니다”), `m3.yaml:23, 51, 61` („빅 블라인드 금액만 맞춥니다”), `m4.yaml:111` — czy gracz oczekuje „림프 / 오버림프 / 림프 비하인드”? (L2, E1)
- „zapłaci/płaci” = „돈을 냅니다 / 지불합니다” czy „콜합니다”: m7-l1:27, 75, 76, 85–87, 128, 134; m7-l2; m8, m9 (egzaminy); `rules.yaml:503, 554`. (L4, E2, R2)
- m7-l2:27 „캡드” — czy zrozumiałe bez objaśnienia; „캡된 레인지”? (L4)
- m7-l3:122 „임플라이드 오즈(숨은 오즈)”, m8-l1:129 „씬 밸류(얇은 밸류)” — czy dosłowne glosy są naturalne? (L4)
- m9-l2 tytuł „팟 커밋” / „커밋된 상태” — brak hasła w `terms-nazwy`. (L5)
- m8-l2:142 „장난감 모델” czy „토이 게임”? (L5)
- m13-l3 „배드 빗 / 배드빗 / 배드 비트”, „쿨러” — brak w `terms-nazwy`. (L7)
- m12-l3:87, 130 „애벌레” (gąsienica) czy „자벌레” (inchworm)? (L8)
- m6-l3:62, 63, 64 „최고의 플러시” wobec m6-l2:132 „넛 플러시”. (L3)
- m7-l1:48 „넛 스트레이트로 가는 거트샷” (pl opisowo „do najwyższego strita”). (L4)
- `rules.yaml:165–166, 220, 229–230, 247–248, 298` — formy `{{t:cutoff|CO}}`, `{{t:hijack|HJ}}` (skrót zamiast „컷오프”, „하이잭”; pl ma te same skróty). (R1)
- `rules.yaml:273` „수티드 하이카드” czy „수티드 높은 카드”? `rules.yaml:494, 497` „에이스 핸드 / 일부 에이스로” czy „에이스 하이 핸드”? m5-l3:51 „에이스 하이 핸드” za „ręce z asem”. (R1, R2, L3)
- `rules.yaml:511` „가장 강한 족보” czy „가장 강한 핸드”? `m0.yaml` „족보/랭킹”, `m1.yaml:55, 57` „패”. (R2, E1)
- `m6.yaml:34` „패시브한” czy „소극적인”? `m10.yaml:54` „더 얇은 핸드로도” czy „더 약한 핸드로도”? (E1, E2)
- `m11.yaml:67` forma `{{t:payout|상금 지급}}` czy „상금이 있는 토너먼트”? (E2)
- `modules.yaml:8` tytuł m7 „턴 플레이” wobec m8 „리버”. (S1)
- m5-l1:80, 87, 95–96 — „pośredni” = „중간” obok „średni” = „중간 높이”; czy „중간 텍스처”? (L2)
- m13-l2 „게임 영역” (interfejs: „영역”, „집중 훈련”). (L7)
- m11-l1:152 „차트” wobec m11-l2:140 „표” dla tej samej tabeli. (L7)
- m5-l2:88 forma „{{t:connected|커넥티드한}}” — czy dopuszczalna (poprawki L2, E1 ją wprowadzają). (L2)
- `rules.yaml:849` „같은 단계의 상충”. (R3)

Zdania i styl:
- m3-l1:69 „처음으로 참여할 때는 블라인드 금액만 내지 않습니다” — czy jaśniej „블라인드 금액만 맞추고 들어가지 않습니다”? (L1)
- m2-l2:97 „핸드” raz jako układ, raz jako rozdanie w jednym zdaniu; „이번 핸드의 이후 스트리트에서”? (L1)
- m0-l1:13, 31 „누가 이깁니까: 플러시입니까, 스트레이트입니까?” — dwukropek; „플러시와 스트레이트 중 어느 쪽이 이깁니까?” (L1)
- Dwukropek w środku zdania („…합니다: …”) w m6-l1…m6-l3, m9-l4, m10-l1, m10-l2, m11-l3, m13-l3 wobec kropki w pozostałych lekcjach. (L3, L6, L7)
- m5-l2:80 „앞의 숫자의 나머지입니다” czy „앞의 숫자를 100%에서 뺀 값입니다”? (L2)
- m4-l1:36 „레이트 포지션의 오픈에 맞서” — naturalność. (L2)
- m6-l2:132 „…있을 때는 오히려 콜합니다” — „오히려” mocniejsze niż „raczej wtedy”. (L3)
- m7-l3:143 — rozdzielenie na dwa przypadki (pl dopuszcza odczyt, że warunek dotyczy obu drawów). (L4)
- m8-l4:80 „(스페이드를 든 Q, 스페이드를 든 J)” — może „스페이드 드로우였던 Q 하이, J 하이”? (L5)
- m9-l1:6, 16, 54–56, 73, 121 „팟 뒤의 스택 / 팟 뒤에 남은 돈” czy „남은 스택”? (L5)
- m9-l2:82 „거의 절대 이득이 되지 않는” czy „거의 이득이 되지 않는”? (L5)
- m8-l2:101, 139; m8-l4:122 „하이 카드” ze spacją w znaczeniu opisowym (T20). (L5)
- m10-l3:75, 115 „{{n:pf.3bet.ip-total}}까지의 포지션 3-bet” — czy czyta się jako „do najwyżej X”; „X로 올리는 인 포지션 3벳”? Podobnie `ranges/spots.yaml:62` „…까지 3벳” obok „7.5bb로 3벳” (l. 55, 70). (L6, S1)
- m10-l1:86 „자금을 동결할 수 있습니다” („zatrzymać środki” = zabrać) czy „몰수할 수 있습니다”? (L6)
- m10-l4:6 „결정에 무엇이 달라지는가” czy „결정에서 …”? m10-l3:87 „끝까지:” czy „전면적으로:”? m9-l3:101 „기준점” czy „경계”? (L6)
- m11-l1:156 „둘 다 강한 핸드를 가질 수 있으므로” czy „둘 중 누구든 …”? m11-l1:65 „숏 스택이 아주 짧을 때” (tautologia). (L7)
- m13-l3:74 „결과가 좋았던 실수도 똑같이 대가를 치릅니다” czy „똑같이 대가가 따릅니다”? m13-l3:13 „라이브 게임 중에” (pl „na żywo” dwuznaczne). (L7)
- m12-l3:22 „내 블라인드를 상대로 올립니다” czy „내 블라인드에 레이즈합니다”? m12-l2:86 „진 핸드만 분석하면” (przegrane rozdania czy sesje). (L8)
- m12-l1:140 proste '도움말' wobec ‘…’ w m12-l3:133, m12-l4:102. (L8)
- `m5.yaml:85` „에이스와 함께 7 페어” czy „에이스 키커의 7 페어”? (E1)
- `m9.yaml:47` „(1 + 2f)의 스트리트 수 제곱” — czy „제곱” nie zostanie odczytane jako kwadrat; „…스트리트 수만큼 거듭제곱한 값”? (E2)
- `m10.yaml:64, 73` „상대는 {{n}}에서 폴드…” (kalka „w 40%”). (E2)
- `rules.yaml:266` „이 기준 바로 아래로 폴드합니다”; `:313` „앞에서 여러 명이 림프했을 때” (pl „więcej graczy”); `:132, 203` brak „더” („częściej”). (R1)
- `rules.yaml:560` „혼자서는 거의 이길 수 없는 핸드” czy „그 자체로는 …”? `:536` „포지션에서 플롭에 C벳했고” — czy jasne jako „mając pozycję”? `:502` (po poprawce) długi nawias z pełną nazwą OESD; `:626` (po poprawce) „프로브 벳을 베팅할 때” — powtórzenie. (R2)
- `rules.yaml:839` „제곱근에 비례해서만 줄어듭니다” czy „반비례” (S8a). (R3)
- `rules.yaml:981` (R-M12-004, treść krytyczna) „regularnie przegrywa” → „자주 집니다”; czy „자주” nie wzmacnia (przykład ok. 18%); możliwe „일정한 비율로 집니다”. (R4)
- `rules.yaml:1048` „상대의 레이즈에 폴드하면” (ew. „리레이즈”); pominięte „z nich”. (R4)
- `terms-def.yaml:132` „자유롭게, 신중하게 또는 공격적으로” — dwuznaczność wyliczenia jak w pl. (S1)
- `helplines.yaml:13` „‘도움말’ 화면에서도” — partykuła „도” bez odpowiednika w pl. (S1)
- `UI:869` `drill.texture.summary` „이 플롭은 높음, 레인보우, 커넥티드이므로 드라이입니다” — etykiety w środku zdania; obejrzeć na ekranie. (U1)
- `UI` `table.listAnd` „{{a}} 및 {{b}}” (urzędowe); `rule.because` „이유” jako etykieta; `drill.drawCall.promptFlop/Turn`, `drill.icm.callPrompt` „어떻게 하시겠습니까?” obok „…인가요?”. (U1)

### Pozycje zależne od wartości liczb (partykuły i klasyfikatory po `{{n:…}}`)

- Reguła odczytu „bb/100” („…비비/헌드레드” = samogłoska czy „…백” = spółgłoska), jedna dla całego ko: m12-l1:38, 57, 72, 83, 92, 102; m12-l4:20, 58; `rules.yaml:957, 965, 1029`; `m12.yaml:18` (poprawka E2), `:37`. (L8, R4, E2; S2)
- Odczyt „VPIP” (literowany „브이피아이피” → 는/와/가, czy „브이핍” → 은/과/이) i „PFR” („피에프알” → 은/이): `m10.yaml`; `rules.yaml:830, 846, 861`; poprawki L6 m10-l2:20, 23. (E2, R3)
- Poprawki partykuł ważne tylko dla bieżących wartości (po zmianie w `numbers.yaml` sprawdzić ponownie): `m12.yaml:43` (50), `:80, 82, 83` (24, 15); `m10.yaml:64, 65` (43%); m12-l4:32, 41 (39%), `:47` (14), `:137` (15), `:141` (80%); m12-l1:38 (31,6); `rules.yaml:595` (50), `:1027` (15). (E2, L8, R2, R4)
- `rules.yaml:753, 762, 770` „{{t:spr|SPR}} {{n:spr.commit}}이면 / …에서는” — po 2 naturalniej „2면”; także „{{n:spr.srp}}이면”. (R3)
- `rules.yaml:794, 810` „팟의 약 {{n:geo.srp.3}}로” — liczba z jednostką „x” (1.26x); obejrzeć na ekranie. (R3)
- m5-l3:88, 95 „{{n:ex.pot}} 따기 위해 {{n:cbet.ex.small}} 위험을 감수합니다” — brak partykuł po liczbach; m5-l3:86, 93; m6-l1:45, 52, 106 „{{n:…}} 베팅합니다” bez partykuły. (L3)
- m7-l4:46, 78 „아웃 {{n}}개” wobec „아웃 {{n}}장” w m7-l1, m7-l3. (L4)
- m10-l4:31, 104 „{{n:rake.pop.reg.hands}} 핸드 이상” ze spacją wobec „{{n:…}}핸드” w innych lekcjach. (L6)
- m11-l1:63, 90–92, 152, 156, 174 „약 {{n}} 핸드” (procent, „약 58.3% 핸드로”) wobec m11-l2 „약 {{n}}의 핸드”. (L7)
- m13-l1:105 „약 {{n:m13.noise.hands.k}}천 핸드” = „약 2.5천 핸드” — czy naturalne (T17). (L7)
- m12-l2:112 „약 {{n:skill.sample.m}}백만 건” = „76.9백만 건” (naturalniej „7,690만 건”). (L8)
- `m12.yaml` „{{n}}천 핸드”: „50천”, „960.4천”, „614.656천” (T17). (E2)
- `rules.yaml:972` „{{n:var.need.hands.k}},000핸드” = „614.656,000핸드” (znalezisko scalania, sekcja 2).

## Pytania do źródła pl

- `content/pl/lessons/m5-l1-tekstury.md:108` — wśród flopów „mokrych” stoi „T-9-5-4” (cztery karty, czyli stół z turnem); zamierzony cytat czy pomyłka? (L2)
- `content/pl/lessons/m4-l2-obrona-bb.md:92` — „3-bet i call są ze sobą powiązane”; en „combined”, ko „합쳐져 있는데”; polskie „powiązane” mniej jasne. (L2)
- `m5-l3-czestotliwosc-rozmiar.md:26, 50` „Większy bet spasuje mniej więcej te same ręce” wobec powtórki `m5-l4-bez-pozycji.md:85` „Większy bet nie spasuje więcej rąk” — czy ma być jedno brzmienie? (L3)
- `m5-l3:39` „do przebicia po wcześniejszym czekaniu (check-raise)” wobec `m5-l4:91` „do przebicia (check-raise)”. (L3)
- Znacznik `{{t:flush}}` użyty w znaczeniu drawa do koloru: `m6-l3-check-raise.md:26, 93, 123`, `m6-l2-sprawdzenie.md:65`, `rules.yaml:502` (R-M6-008) — czy nie powinno być `{{t:flush-draw}}`? (L3, R2)
- `m7-l1-druga-beczka.md:76` „Taki bet zarabia na lepszych rękach.” — dwuznaczne (zarabiają na nim lepsze ręce). (L4)
- `m7-l2-polaryzacja.md:65` „Z tą ręką zarabiasz głównie od rąk, które cię biją.” — dosłownie „zarabiasz”, a chodzi o stratę. (L4)
- `m8-l1-value.md:33, 135` „bez dopłaty od lepszych” — kierunek dopłaty niejasny. (L4)
- `m8-l4-bluff-catching.md:60, 61` — ten sam przykład blefu w dwóch kolejnościach („dziesiątka z waletem” / „walet z dziesiątką”). Redakcyjne. (L5)
- `m10-l3-odejscie-od-bazy.md:49` i `exams/m10.yaml:63` „Fold to c-bet łączy wszystkie rozmiary i stoły” — „stoły” = board czy stoły do gry? Lekcja l. 109 mówi „rozmiary i flopy”, en ma „tables”. Propozycja: „rozmiary i flopy” albo znacznik `{{t:board|…}}`; sprawdzić en i pozostałe języki. (L6, E2)
- `m9-l4-plan-trzech-ulic.md:17` „jeden bet zostawia na {{t:board|stole}} większość wartości” — idiom oznaczony znacznikiem board; czy zamierzone? (L6)
- `m11-l2-sprawdzanie.md:154` „dopłaca {{n:m11.3max.bb.cost}} do {{t:pot|puli}} {{n:m11.3max.bb.pot}}” — wg `numbers.yaml` to pula po sprawdzeniu, zdanie brzmi jak pula przed dopłatą. (L7)
- `exams/m2.yaml:89` „{{t:straight|Strit}} daje {{n:outs.oesd}} outów” — odwrócone logicznie (outy dają strita). Redakcyjne. (E1)
- Liczby bez zaokrąglenia: `exam.m12.wr.ci.*`, `exam.m12.ci.wr`, `exam.m12.style.ci`, `var.need.hands.k`, `exam.m12.need.hands.k`, `g3b.third.total` — czy nie powinny mieć `decimals`? W pl „614,656 tys.”, w ko „614.656천”, „-4.012bb/100”, „29.944bb”; od tego zależy też `content/ko/rules.yaml:972`. (E2; rozszerzone przy scalaniu)
- R-M12-003 (`rules.yaml:973`) „błąd oszacowania maleje z pierwiastkiem z liczby rąk” — skrót myślowy (błąd jest odwrotnie proporcjonalny do pierwiastka); wzór w zdaniu jednoznaczny. To samo w `m12-l1-wariancja.md:49, 118` i `rules.yaml:839`. (R4, L8, R3)
- R-M7-008 (`rules.yaml:595`) i inne miejsca `{{n:…}}` + partykuła: w ko partykuła zależy od wartości liczby; zmiana liczb w `numbers.yaml` wymaga ponownego sprawdzenia przekładów. (R2)
- Zapowiedź w `m1-l1-przebieg.md:86` („we wzorach piszemy krótko »bet«”) nie pasuje do przekładów, w których wzory są przełożone — pytanie o konwencję wzorów w lokalizacjach. (L1; z sekcji 2)

Części bez pytań: R1, R3, S1, U1, L8.

## Treść krytyczna (moduł 12, helplines, sklep, interfejs)

Co porównano zdanie po zdaniu z pl i z jakim wynikiem:

| Zakres | Kto | Wynik |
|---|---|---|
| Lekcje `m12-l1…l4` (front matter, ćwiczenia z uzasadnieniami, treść, tabele, wzory, ramki, w tym ramka „Odpowiedzialna gra” m12-l4:143–149 i `{{helplines}}`) | L8 | Liczby i progi tylko przez `{{n:…}}`, identyczne z pl; liczby słowne zgodne; warunki graniczne („co najmniej”, „najpóźniej”, „najwcześniej”, „nigdy mniej niż”) zachowane; pięć sygnałów ostrzegawczych obecnych i niezłagodzonych; `correct: true` jak w pl. Jedno odstępstwo treściowe: m12-l4:102 dodane „이 레슨 끝의” (poprawka ŚR). KRYT 0, WYS 0; 12 poprawek (3 ŚR, 9 NISKIE). |
| Egzamin `exams/m12.yaml` (10 pytań, 33 opcje z uzasadnieniami) | E2 | Znaczniki, wzory, warunki, poprawne odpowiedzi, odesłanie do ekranu „도움말” i zdanie o sygnale ostrzegawczym zgodne z pl. KRYT 0, WYS 0; 10 poprawek (3 ŚR nazwy typów tiltu, 7 NISKIE); bez poprawki: zapis „N천 핸드” (ŚR) i „C-게임” (NISKIE). |
| Reguły R-M12-001…009, 011, 012 (`rules.yaml:953–1040`, pola if/then/because/source) | R4 | Znaczniki i stałe w `source` zgodne; warunki („najpóźniej”, „najwcześniej”, „nigdy mniej niż”, „dopiero po”) zachowane. KRYT 0, WYS 0 wg recenzenta; 3 poprawki NISKIE; 1 wątpliwość odcienia (`:981` „자주”). **Uzupełnienie scalania:** `:972` wyświetla „약 614.656,000핸드” — recenzent uznał zapis za poprawny na podstawie wartości przybliżonej (sekcja 2, pierwszy wiersz). |
| `content/ko/helplines.yaml` wobec `content/helplines.yaml` (pointer, fallback.text oba zdania, regions_label, entries[0] z nazwą, adresem i cytatami, info) | S1 | Pola nietekstowe (claim, id, country, kind, name, url, quote, daty 2026-11-04 / 2027-11-04) identyczne znak w znak; „także gdy”, „od razu”, „lokalny numer alarmowy” zachowane; nic nie dodano. KRYT/WYS/ŚR 0; 1 poprawka stylu NISKIE. |
| Interfejs: `welcome.noMoney`, `play.format`, `help.title`, `settings.help`, `help.link`, `help.intro`, `help.call*`, `help.open*`, `advancement.gameExplain`, `purchase.*`, `start.counter`, `start.alwaysFree` | U1 | Zgodne z pl poza „granie” → „도박” w `help.link` i `help.intro` (ŚR, bez poprawki; T29). Parametry nienaruszone. Poprawek w treści krytycznej interfejsu: 0. |
| Sklep `SKLEP` → `lokalizacje.ko`: promotionalText, zdanie o hazardzie w opisie, podtytuł, „ODPOWIEDZIALNIE”, „DOSTĘP” (warunki, „1개”, „8문제”, „15문제”, adres EULA) | U1 | Zgodne poza „stawek” → „베팅” w opisie i podtytule (2 poprawki ŚR, niżej). Limity: name 19, subtitle 18, keywords 39 znaków / 91 bajtów. |
| Fragmenty pokrewne poza treścią krytyczną | L6, L7 | m10-l1:83–87, 129–130 (regulamin sal, zamknięcie konta) — sens zgodny, wątpliwość „동결”; m13-l1:72–74, 80 („decyzja, nie wynik”) — zgodne. |

Poprawki z `poprawki-ko.json` dotyczące treści krytycznej (28: ŚR 8, NISKIE 20; KRYT 0, WYS 0):

| plik:linia | Waga | Część | Było → ma być |
|---|---|---|---|
| `content/ko/exams/m12.yaml:18` | NISKIE | E2 | 약 {{n:exam.m12.wr.ci.low}}와 약 → 약 {{n:exam.m12.wr.ci.low}}과 약 |
| `content/ko/exams/m12.yaml:43` | NISKIE | E2 | {{n:ex.bet.half}}로 올인했고 → {{n:ex.bet.half}}으로 올인했고 |
| `content/ko/exams/m12.yaml:54` | ŚR | E2 | { text: "지는 것을 싫어해서 생기는 틸트" → { text: "패배 혐오 틸트" |
| `content/ko/exams/m12.yaml:55` | ŚR | E2 | { text: "불공정함 때문에 생기는 틸트" → { text: "불공정 틸트" |
| `content/ko/exams/m12.yaml:55` | NISKIE | E2 | 배드 빗, 쿨러 → 배드 비트, 쿨러 |
| `content/ko/exams/m12.yaml:56` | ŚR | E2 | { text: "실수 때문에 생기는 틸트" → { text: "실수 틸트" |
| `content/ko/exams/m12.yaml:80` | NISKIE | E2 | {{n:exam.m12.md.now}}이 남았습니다 → {{n:exam.m12.md.now}}가 남았습니다 |
| `content/ko/exams/m12.yaml:82` | NISKIE | E2 | {{n:exam.m12.md.now}}으로 그보다 → {{n:exam.m12.md.now}}로 그보다 |
| `content/ko/exams/m12.yaml:83` | NISKIE | E2 | {{n:exam.m12.md.now}}이 기준 → {{n:exam.m12.md.now}}가 기준 |
| `content/ko/exams/m12.yaml:83` | NISKIE | E2 | 기준 {{n:br.bi.move-down}}은 → 기준 {{n:br.bi.move-down}}는 |
| `content/ko/helplines.yaml:27` | NISKIE | S1 | 도박의 영향을 받는 누구에게나 무료 실질적 조언과 정서적 지원을 온라인으로 제공합니다. → 도박의 영향을 받는 누구에게나 실질적인 조언과 정서적 지원을 온라인으로 무료 제공합니다. |
| `content/ko/lessons/m12-l1-wariancja.md:38` | NISKIE | L8 | {{n:var.sqrt-blocks}}로 계산하세요 → {{n:var.sqrt-blocks}}으로 계산하세요 |
| `content/ko/lessons/m12-l1-wariancja.md:49` | NISKIE | L8 | 느리게 좁힙니다: 오차는 핸드 수의 제곱근에 비례해 줄어듭니다 → 느리게 좁힙니다: 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다 |
| `content/ko/lessons/m12-l1-wariancja.md:118` | NISKIE | L8 | 윈레이트 추정 오차는 핸드 수의 제곱근에 비례해 줄어듭니다 → 윈레이트 추정 오차는 핸드 수의 제곱근에 반비례해 줄어듭니다 |
| `content/ko/lessons/m12-l2-decyzja-wynik.md:68` | ŚR | L8 | {{n:var.hands.k}}천 핸드도 → {{n:var.hands.k}}k 핸드도 |
| `content/ko/lessons/m12-l3-tilt.md:35` | NISKIE | L8 | (뱅크롤과 리스크 레슨) → (뱅크롤과 위험 레슨) |
| `content/ko/lessons/m12-l4-bankroll.md:32` | NISKIE | L8 | 약 {{n:ror.base.wr-min}}이 나옵니다 → 약 {{n:ror.base.wr-min}}가 나옵니다 |
| `content/ko/lessons/m12-l4-bankroll.md:41` | NISKIE | L8 | 약 {{n:ror.base.wr-min}}이 됩니다 → 약 {{n:ror.base.wr-min}}가 됩니다 |
| `content/ko/lessons/m12-l4-bankroll.md:47` | NISKIE | L8 | {{n:br.ex.below}}이 남았습니다 → {{n:br.ex.below}}가 남았습니다 |
| `content/ko/lessons/m12-l4-bankroll.md:51` | ŚR | L8 | 절박함에서 오는 틸트입니다 → 절박함 틸트입니다 |
| `content/ko/lessons/m12-l4-bankroll.md:102` | ŚR | L8 | 이 레슨 끝의 ‘책임감 있는 게임’ 안내에 있는 연락처를 → ‘책임감 있는 게임’ 안내에 있는 연락처를 |
| `content/ko/lessons/m12-l4-bankroll.md:137` | NISKIE | L8 | {{n:br.bi.move-down}}으로) → {{n:br.bi.move-down}}로) |
| `content/ko/lessons/m12-l4-bankroll.md:141` | NISKIE | L8 | {{n:study.beginner}}을 공부에 → {{n:study.beginner}}를 공부에 |
| `content/ko/rules.yaml:973` | NISKIE | R4 | 핸드 수의 제곱근에 비례해 줄어듭니다 → 핸드 수의 제곱근에 반비례해 줄어듭니다 |
| `content/ko/rules.yaml:1005` | NISKIE | R4 | 이 상태로 계속하는 것은 가장 낮은 수준(C-게임)으로 → 이 상태로 계속하는 것은 자신의 가장 낮은 수준(C-게임)으로 |
| `content/ko/rules.yaml:1027` | NISKIE | R4 | {{n:br.bi.move-down}}으로) → {{n:br.bi.move-down}}로) |
| `docs/sklep/aso/metadane-fala2.json:23` | ŚR | U1 | 결정마다 평가와 해설, 베팅 없음 → 결정마다 평가와 해설, 판돈 없음 |
| `docs/sklep/aso/metadane-fala2.json:26` | ŚR | U1 | 베팅도, 딸 수 있는 칩도, 실제 돈을 거는 게임도 없습니다. → 판돈도, 딸 수 있는 칩도, 실제 돈을 거는 게임도 없습니다. |

Poza treścią krytyczną w tych samych plikach: `SKLEP:26` — 3 poprawki ŚR U1 („아웃츠” → „아웃”; „프리플랍, 플랍” → „프리플롭, 플롭”; dopisane nazwy czterech stopni oceny „일치, 허용, 부정확, 실수”); `UI:376` (NISKIE, „주로” → „자주”) i `UI:713` (ŚR, „Bubble factor” → „버블 팩터(BF)”); `rules.yaml:1164` (ŚR, R4, R-M13: „게임 복기는” → „실전 복습은”).

### Propozycja U1: „베팅 없음 / 베팅도 없습니다” w metadanych sklepu

Powód (U1): „베팅” to w tej aplikacji nazwa zagrania bet (`terms-nazwy`: bet = „베팅”, przyciski „벳”), którego aplikacja uczy; „bez betów” mówi co innego niż źródło i przeczy treści aplikacji. „판돈” = stawki pieniężne.

Podtytuł (`SKLEP:23`, pole `subtitle`):
- było: `결정마다 평가와 해설, 베팅 없음`
- ma być: `결정마다 평가와 해설, 판돈 없음` (18 znaków, limit 30)
- pl (`store/app-store-metadata.json`): „Nauka pokera bez gry o stawki”; en-US: „Study poker, no real money”.
- Uwaga: podtytuł ko jest adaptacją ASO (pierwszy człon „ocena i wyjaśnienie przy każdej decyzji” nie pochodzi z pl/en), więc zmiana wymaga akceptacji roli sklepu. Pytanie otwarte U1: czy „실제 돈 없음” (bliższe en) nie byłoby lepsze od „판돈 없음”.

Opis (`SKLEP:26`, pole `description`, zdanie o hazardzie):
- było: `이것은 도박이 아니라 훈련입니다. 베팅도, 딸 수 있는 칩도, 실제 돈을 거는 게임도 없습니다.`
- ma być: `이것은 도박이 아니라 훈련입니다. 판돈도, 딸 수 있는 칩도, 실제 돈을 거는 게임도 없습니다.`
- pl: „To nauka, nie hazard: w aplikacji nie ma stawek, żetonów do wygrania ani gry na pieniądze.”; en-US: „Training, not gambling: no stakes, no chips to win, no real-money play.”
- Pozostałe dwa człony („żetonów do wygrania”, „gry na pieniądze”) U1 ocenił jako zgodne; poprawka zmienia tylko pierwszy.

Obie poprawki są wpisane w `poprawki-ko.json` z wagą ŚR (grupa U1) i dotyczą pliku `docs/sklep/aso/metadane-fala2.json`, czyli tekstu, który trafia do App Store Connect — nałożenie to decyzja roli sklepu, nie tylko przekładu.
