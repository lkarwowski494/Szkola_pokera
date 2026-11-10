# ko · AP — poprawki sesji nadrzędnej po rozstrzygnięciach terminologicznych (2026-11-10)

Pliki: `czesci/AP.json` (192 poprawek: ŚR 175, NISKIE 17; 252 pojedynczych zamian), `wykluczenia.json` (8 wpisów części usuniętych albo zastąpionych). Zamiany wg rozstrzygnięć S1, S3, S6, S8 oraz wybrane S4 (opcje odpowiedzi, tabela, m12-l1:56–58, exams/m12:27–28) sprawdzone z linią pl (`content/pl/…`, ten sam numer linii); zamiany masowe (C벳, 3벳, 플롭, 보고서, pozostałe S4) obejrzane każda w kontekście linii ko (fragment z sąsiednimi słowami i partykułą), bez czytania całej linii pl — nie zmieniają sensu ani wygłosu (partykuły zostają). Każde `stary`: jedna linia, dokładnie jedno wystąpienie w pliku na HEAD, bez nachodzenia na nie wykluczone poprawki innych części. Jedna poprawka na wolny fragment linii; gdy fragment ma kilka wystąpień, `stary` obejmuje tekst od pierwszego do ostatniego. Pominięte z zasady: klucze znaczników `{{t:klucz`, `{{n:klucz}}`, klucze YAML, komentarze YAML, `terms-nazwy.yaml`.

Skróty ścieżek: `exams/…`, `lessons/…` (w tabeli lekcje także jako `m6-l3` itp.), `rules.yaml` = `content/ko/…`; `ko.json` = `apps/mobile/src/i18n/locales/ko.json`.

## Rozstrzygnięcia → poprawki

| Rozstrzygnięcie | Poprawek AP | Miejsca (plik: linie) | Wykluczone wpisy części | Pominięte / bez zmiany (powód) |
|---|---|---|---|---|
| S1 „wysokie karty” = 높은 카드 | 2 | exams/m6.yaml: 67, 68 | E1 exams/m6.yaml:67 „하이 카드 두 장이지만”; E1 exams/m6.yaml:68 „하이 카드 두 장은” | Pozostałe „하이 카드”/„하이카드” w znaczeniu „wysokie karty” poza zleceniem (bez zmian, do decyzji): „하이 카드” exams/m7:84, exams/m8:91, m4-l3:104, m6-l3:112, 114, m7-l2:54, 56, 117, m8-l2:101, 139, m8-l4:122; „하이카드” m6-l2 ×10, rules.yaml:273, 281, 486, 493, 495, 545, 686 (m11-l2:57, 140 poprawia L7) |
| S2 partykuły po „bb/100” | 0 | — (nie rozstrzygnięte, nie generowano) | E2 exams/m12.yaml:18 „약 {{n:exam.m12.wr.ci.low}}와 약” | OCZEKUJE na rodzimego użytkownika (odczyt „…bb/100”): wykluczony wpis E2 exams/m12.yaml:18 „와” → „과”. Innych wpisów E2 zmieniających wyłącznie partykułę po wartości w bb/100 nie ma (sprawdzone po jednostkach kluczy w bazie treści: E2 m12:43, 80, 82, 83 dotyczą liczb 50, 24, 15 — zostają). Miejsca bez poprawki w L8/R4: m12-l1:38, 57, 72, 83, 92, 102; m12-l4:20, 58; rules.yaml:957, 965, 1029 |
| S3 OESD → 양방향 스트레이트 드로우 | 3 | lessons/m6-l3-check-raise.md: 26, 93, 123 | — | Skrót zostaje, bo pl ma formę `{{t:oesd\|OESD}}`: exams/m2.yaml:12, 36, 45, 86; exams/m8.yaml:46; exams/m13.yaml:44; m6-l3:72. terms-def.yaml:51, 52 — definicje (pl: „Odmiany: OESD (…)”, „Skrót od open-ended straight draw”), tekst wyjaśnia skrót; bez zmiany, propozycja S1 nie jest mechaniczna. „오픈엔디드” i „양방” — wszystkie w poprawkach części (0 nowych) |
| S4 „tys. rąk” → „{{n}},000핸드” | 38 | exams/m12.yaml: 7, 10, 16, 18, 19, 20, 27, 28, 34, 37, 38; lessons/m12-l1-wariancja.md: 13, 15, 20, 29, 31, 38, 45, 47, 48, 56, 57, 58, 63, 65, 66, 67, 72, 76, 83, 84, 94, 114, 125, 131, 137; lessons/m12-l2-decyzja-wynik.md: 68; lessons/m12-l4-bankroll.md: 58 | L8 lessons/m12-l2-decyzja-wynik.md:68 „{{n:var.hands.k}}천 핸드도” | m13-l1-raport.md:105 „{{n:m13.noise.hands.k}}천 핸드” ZOSTAJE: wartość 2.5 (decimals: 1), „2.5,000핸드” byłoby błędne. „천 핸드”/„수천 핸드” bez znacznika (exams/m10:28, m10-l1:51, m10-l3:88, m12-l1:6, m13-l1:72, exams/m13:55) poza wzorcem |
| S5 벳/베팅 | 0 | — (nie rozstrzygnięte, nie generowano; wpis L5 m8-l2:38 zostaje) | — | — |
| S6 m6-l3: podmiot „내가” zamiast „당신” | 3 | lessons/m6-l3-check-raise.md: 41, 49, 54 | L3 lessons/m6-l3-check-raise.md:41 „{{t:bet\|벳했고}}, {{n:xr.example}}까지 {{t:raise\|레이즈했습니다}}”; L3 lessons/m6-l3-check-raise.md:49 „{{t:bet\|벳했고}}, {{n:xr.too-small}}까지만 {{t:raise\|레이즈했습니다}}”; L3 lessons/m6-l3-check-raise.md:54 „직접 C벳에 {{t:call\|콜할}} 때” | — |
| S7 | 0 | — (bez zmian) | — | — |
| S8a 반비례 | 1 | rules.yaml: 839 | — | — |
| S8b payout = 상금 | 1 | exams/m11.yaml: 67 | — | ko.json:705 „상금 지급 {{paid}}자리” = pl „płatne {{paid}} miejsca” (nie termin payout) — bez zmiany |
| S8c bad beat = 배드 비트 | 2 | lessons/m13-l3-przeglad.md: 76, 87 | — (exams/m12.yaml:55 poprawia E2, zostaje) | — |
| c-bet / C-bet / C-벳 → C벳 | 92 | exams/m10.yaml: 17, 19, 61, 63, 64, 65, 66; exams/m5.yaml: 47, 51, 75, 80, 89, 90, 95; exams/m6.yaml: 24, 27, 54, 57, 58, 64, 67, 68, 73, 83, 86; exams/m7.yaml: 8, 18, 27, 90, 93; exams/m8.yaml: 17, 88; lessons/m10-l3-odejscie-od-bazy.md: 40, 42, 47, 49, 50, 51, 56, 58, 59, 109, 111; lessons/m5-l3-czestotliwosc-rozmiar.md: 16, 17, 18, 38, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 88, 100, 106, 112, 126, 130; lessons/m6-l1-mdf-alpha.md: 82, 132; lessons/m6-l2-sprawdzenie.md: 13, 16, 23, 26, 45, 46, 51, 54, 66, 74, 75, 95, 98, 102, 104, 112, 120, 127, 132, 134; lessons/m7-l1-druga-beczka.md: 13, 33, 43, 110; lessons/m7-l2-polaryzacja.md: 41, 51, 61 | — | Angielska nazwa statystyki „fold to c-bet” (6): m10-l3:42, 47, 49, 56, 109, 129. Pole source/sources (4): rules.yaml:413 ×3, 414 (tytuły, cytat, URL). 7 miejsc NIE DO ZAPISANIA mechanicznie (identyczne linie, patrz niżej): m6-l2:41, 61, 71, 81; m7-l1:53, 72, 82. Komentarze YAML i klucz `c-bet:` w terms-def.yaml:86 pominięte |
| 3-bet → 3벳 | 20 | exams/m10.yaml: 24, 26, 27, 29, 38, 71, 73, 74, 75; lessons/m10-l3-odejscie-od-bazy.md: 66, 68, 69, 70, 75, 77, 78, 79, 113, 115, 122 | — | Angielska nazwa statystyki „fold to 3-bet” / „Fold to 3-bet” (5): m10-l3:66, 117 (nagłówek tabeli), 122, 129 ×2. Pola source/sources rules.yaml: 55 trafień (angielskie tytuły, cytaty, URL; w tym 2× „fold to 3-bet” w cytacie :849). Komentarze (areas.yaml, spots.yaml, exams/m4) i klucz `3-bet:` terms-def.yaml:68 pominięte |
| 4-bet → 4벳 | 0 | — (oba miejsca tekstu w poprawkach L7 m13-l2:58) | — | rules.yaml:292 ×3, 833 (cytaty angielskie w source); klucz terms-def.yaml:69 |
| 플랍 → 플롭, 프리플랍 → 프리플롭 | 13 | rules.yaml: 126, 135, 144, 170, 179, 187, 196, 206, 243, 252, 309, 317, 326 (15 wystąpień „프리플랍” w polach source; l. 206 ×3 w jednej poprawce) | — | Słowa kluczowe sklepu „프리플랍, 포스트플랍” (docs/sklep, decyzja roli sklepu) — poza zakresem |
| 리포트 → 보고서 | 19 | exams/m13.yaml: 23, 34; lessons/m13-l1-raport.md: 34, 37, 54, 61, 63, 64, 70, 73, 76, 80, 97, 101; lessons/m13-l2-powtorki.md: 31, 73, 89, 93; rules.yaml: 1155 (20 wystąpień; m13-l1:64 ×2 w jednej poprawce) | — (3 wpisy L7 m13-l1:5, 76, 105 zostają, bez kolizji) | — |
| 너츠 → 넛; 이니셔티브 → 주도권; 투페어 → 투 페어; 닛 → 니트; 레이크 상한 → 레이크 캡; 수딧 → 수티드; 웨트 → 웻; 기대값 → 기댓값; 자유 게임 → 자유 플레이 | 0 | — (wszystkie wystąpienia są już w poprawkach części; po symulacji 0 pozostałych) | — | — |
| 테이블 → 보드 (m10-l3:49, exams/m10:63) | 0 | — (wpisy L6 i E2 już są; poprawki AP c-bet w tych liniach nie nachodzą na nie) | — | — |
| Sklep: podtytuł | 0 | — | U1 docs/sklep/aso/metadane-fala2.json:23 „결정마다 평가와 해설, 베팅 없음” | PYTANIE produktowe do koordynatora — patrz niżej |

Suma: 192 poprawek (2 poprawki realizują jednocześnie S1 i C벳: exams/m6.yaml:67, 68 — w tabeli liczone w obu wierszach, stąd suma wierszy 194).

## Wykluczenia (wykluczenia.json)

| # | Część | plik:linia | `stary` wykluczonego wpisu | Było → (wpis części) | Powód |
|---|---|---|---|---|---|
| 1 | E1 | exams/m6.yaml:67 | 하이 카드 두 장이지만 | 하이카드 두 장이지만 | S1: wpis zmieniał „하이 카드” → „하이카드” (nazwa układu); przyjęto „wysokie karty” = „높은 카드”; zastąpiony wpisem AP exams/m6.yaml:67 |
| 2 | E1 | exams/m6.yaml:68 | 하이 카드 두 장은 | 하이카드 두 장은 | S1: wpis zmieniał „하이 카드” → „하이카드” (nazwa układu); przyjęto „wysokie karty” = „높은 카드”; zastąpiony wpisem AP exams/m6.yaml:68 (połączonym z zamianą c-bet → C벳 w tym samym miejscu) |
| 3 | E2 | exams/m12.yaml:18 | 약 {{n:exam.m12.wr.ci.low}}와 약 | 약 {{n:exam.m12.wr.ci.low}}과 약 | S2: partykuła po wartości w bb/100 („와” → „과”) nie rozstrzygnięta — pytanie do rodzimego użytkownika o odczyt jednostki; wpis wstrzymany, żeby egzamin m12 nie różnił się od lekcji i reguł modułu 12 (oczekuje) |
| 4 | L8 | lessons/m12-l2-decyzja-wynik.md:68 | {{n:var.hands.k}}천 핸드도 | {{n:var.hands.k}}k 핸드도 | S4: wpis zmieniał „천 핸드” → „k 핸드”; przyjęto zapis „{{n:klucz}},000핸드”; zastąpiony wpisem AP m12-l2-decyzja-wynik.md:68 |
| 5 | L3 | lessons/m6-l3-check-raise.md:41 | {{t:bet\|벳했고}}, {{n:xr.example}}까지 {{t:raise\|레이즈했습니다}} | {{t:bet\|벳했고}}, 당신은 {{n:xr.example}}까지 {{t:raise\|레이즈했습니다}} | S6: wpis dopisywał „당신은”; plik używa „내가/나는” — zastąpiony wpisem AP m6-l3-check-raise.md:41 („내가”), poprawka sensu (kto przebił) zachowana |
| 6 | L3 | lessons/m6-l3-check-raise.md:49 | {{t:bet\|벳했고}}, {{n:xr.too-small}}까지만 {{t:raise\|레이즈했습니다}} | {{t:bet\|벳했고}}, 당신은 {{n:xr.too-small}}까지만 {{t:raise\|레이즈했습니다}} | S6: wpis dopisywał „당신은”; plik używa „내가/나는” — zastąpiony wpisem AP m6-l3-check-raise.md:49 („내가”), poprawka sensu (kto przebił) zachowana |
| 7 | L3 | lessons/m6-l3-check-raise.md:54 | 직접 C벳에 {{t:call\|콜할}} 때 | 당신이 C벳에 {{t:call\|콜할}} 때 | S6: wpis wstawiał „당신이”; plik używa „내가/나는” — zastąpiony wpisem AP m6-l3-check-raise.md:54 („내가”) |
| 8 | U1 | docs/sklep/aso/metadane-fala2.json:23 | 결정마다 평가와 해설, 베팅 없음 | 결정마다 평가와 해설, 판돈 없음 | Sklep: zmiana podtytułu (subtitle) to decyzja produktowa/ASO roli sklepu — wpis wstrzymany i przekazany koordynatorowi jako pytanie (było „결정마다 평가와 해설, 베팅 없음” → propozycja „결정마다 평가와 해설, 판돈 없음”, 18 znaków); wpisy U1 dotyczące opisu zostają |

## Miejsca nie do zapisania w formacie poprawek (identyczne linie) — 7× „c-bet” → „C벳”

Format wymaga, żeby `stary` było jedną linią i występowało w pliku dokładnie raz. Poniższe linie są w pliku powtórzone znak w znak (to samo polecenie w kilku ćwiczeniach), więc żaden fragment jednej linii nie jest unikalny. Zamianę trzeba wykonać po numerze linii (albo zamianą wszystkich wystąpień całej linii), poza `poprawki-ko.json`:

| Plik | Linie (identyczne) | Zamiana w każdej |
|---|---|---|
| `content/ko/lessons/m6-l2-sprawdzenie.md` | 41, 61, 71, 81 | „{{t:pot\|팟}}의 1/3 크기 c-bet을 {{t:bet\|베팅}}합니다” → „{{t:pot\|팟}}의 1/3 크기 C벳을 {{t:bet\|베팅}}합니다” |
| `content/ko/lessons/m7-l1-druga-beczka.md` | 53, 72, 82 | „{{t:big-blind}}가 플롭 c-bet을 {{t:call\|콜했습니다}}” → „{{t:big-blind}}가 플롭 C벳을 {{t:call\|콜했습니다}}” |

Polecenie zastępcze dla sesji nakładającej, PO nałożeniu `poprawki-ko.json` (w symulacji ciąg „c-bet을” występuje wtedy w tych plikach dokładnie 4 i 3 razy, tylko w wymienionych liniach, a innych „c-bet” w nich nie ma): `sed -i 's/c-bet을/C벳을/' content/ko/lessons/m6-l2-sprawdzenie.md content/ko/lessons/m7-l1-druga-beczka.md`.

## Miejsca pominięte świadomie (zamiana byłaby błędna albo poza rozstrzygnięciem)

- **Angielskie nazwy statystyk** w `lessons/m10-l3-odejscie-od-bazy.md`: „fold to c-bet” (l. 42, 47, 49, 56, 109, 129) i „fold to 3-bet” / „Fold to 3-bet” (l. 66, 117, 122, 129 ×2) — zostają po angielsku jako nazwa statystyki z HUD-a. Uwaga do decyzji: egzamin m10 i reguły piszą tę samą statystykę po koreańsku („폴드 투 …”); w egzaminie m10 forma mieszana „폴드 투 c-bet / 폴드 투 3-bet” została zamieniona na „폴드 투 C벳 / 폴드 투 3벳” (jak `rules.yaml:847, 906, 912, 916`), więc po nałożeniu lekcja m10-l3 (angielska nazwa) różni się od egzaminu i reguł (koreańska).
- **Pola `source` / `sources` w `rules.yaml`**: „c-bet” 4× (l. 413, 414), „3-bet” 55× (26 linii), „4-bet” 4× (l. 292, 833) — angielskie tytuły publikacji, cytaty i adresy URL. W polach `source` zmieniono wyłącznie pisownię koreańską „프리플랍” → „프리플롭” (opis źródła po koreańsku, np. „프리플랍 차트 사이트”, „프로젝트의 프리플랍 솔버”), 13 linii.
- **`m13-l1-raport.md:105`** „{{n:m13.noise.hands.k}}천 핸드” — wartość 2.5 (decimals: 1); zostaje „천 핸드” (wyświetla „2.5천 핸드”). Do decyzji z rodzimym użytkownikiem: ewentualnie „2,500핸드” wymagałoby nowego klucza liczby (zmiana w źródle, nie w przekładzie).
- **`m12-l1-wariancja.md:58`**: „약 {{n:var.need.hands.k}}k입니다” → „약 {{n:var.need.hands.k}},000입니다” bez „핸드”, bo podmiotem zdania jest „핸드 수는” (pl „Rąk jest sto razy więcej: ok. … tys.”). W l. 56, 57 opcje odpowiedzi „약 {{n}}k” → „약 {{n}},000핸드” (jak opcje w exams/m12.yaml:27, 28).
- **`terms-def.yaml:51, 52`** (OESD w definicjach) i **`ko.json:705`** („상금 지급 {{paid}}자리” = „płatne miejsca”) — bez zmiany, powody w tabeli.
- **Pozostałe „하이 카드”/„하이카드” = „wysokie karty”** (lista w wierszu S1) — rozstrzygnięcie S1 zleca tylko exams/m6.yaml:67, 68; reszta (ok. 28 miejsc, w tym 7 w regułach) czeka na decyzję, czy ujednolicać skryptem.

## Sprostowanie do `podsumowanie.md` (T17, S4): kandydat „KRYT” w `rules.yaml:972` jest BŁĘDNY

Podsumowanie podaje, że `content/ko/rules.yaml:972` („약 {{n:var.need.hands.k}},000핸드가 필요합니다”) wyświetla „614.656,000핸드”. To nieprawda: klucz `var.need.hands.k` nie ma pola `decimals`, a schemat ustawia domyślnie `decimals = 0` (`packages/content-schema/src/index.ts:41`), więc wartość 614,656 wyświetla się jako „615” i na ekranie jest „약 615,000핸드” — poprawnie. Potwierdzone w zbudowanej bazie treści ko (`apps/mobile/assets/content/tresc-612da208ae-ko.db`, tabela `numbers`: `var.need.hands.k` → display „615”; `exam.m12.need.hands.k` → „960”; `var.hands.k` → „100”; `exam.m12.hands.k` → „50”; `exam.m12.style.hands.k` → „2”; `dd.hands.short.k` → „20”; `m13.noise.hands.k` → „2.5”). Nie ma znaleziska KRYT; pytanie do źródła o `decimals: 0` dla kluczy `*.need.hands.k` jest bezprzedmiotowe. Zapis „{{n}},000핸드” jest bezpieczny dla sześciu kluczy całkowitych i tylko dla nich został użyty.

## Oczekujące (nie generowano)

- **S2** — partykuły po wartości w bb/100: pytanie do rodzimego użytkownika o odczyt („…백” czy inaczej). Wstrzymany wpis E2 `exams/m12.yaml:18` („약 {{n:exam.m12.wr.ci.low}}와 약” → „…과 약”); po decyzji: albo przywrócić go i poprawić 11 miejsc w lekcjach i regułach (m12-l1:38, 57, 72, 83, 92, 102; m12-l4:20, 58; rules.yaml:957, 965, 1029), albo zostawić wszystko.
- **S5** — 벳/베팅 (interfejs „벳”, terms-nazwy „베팅”): bez poprawek AP; wpis L5 m8-l2:38 zostaje.
- **Nie przyjęte, zostają w podsumowaniu**: 나/당신 (334 miejsca), populacja 모집단/플레이어 풀, 벳/베팅.

## PYTANIE produktowe do koordynatora (rola sklepu): podtytuł ko w `docs/sklep/aso/metadane-fala2.json:23`

- było: `결정마다 평가와 해설, 베팅 없음` (18 znaków)
- propozycja U1: `결정마다 평가와 해설, 판돈 없음` (18 znaków, limit 30)
- powód U1: „베팅” to w aplikacji nazwa zagrania bet, którego aplikacja uczy; „bez betów” mówi co innego niż pl „Nauka pokera bez gry o stawki” / en „Study poker, no real money”. Wariant do rozważenia: „실제 돈 없음”.
- Wpis U1 dla podtytułu wykluczony (`wykluczenia.json`), bo podtytuł jest adaptacją ASO i jego zmiana to decyzja produktowa. Wpisy U1 dotyczące opisu (l. 26: „베팅도” → „판돈도”, „아웃츠” → „아웃”, „프리플랍, 플랍” → „프리플롭, 플롭”, nazwy czterech stopni oceny) zostają w `poprawki-ko.json`. Skutek do rozważenia: po nałożeniu opis mówi „판돈도 … 없습니다”, a podtytuł nadal „베팅 없음”.

## Wynik kontroli

`node docs/lokalizacja/dowody/przeglad-pelny-2026-11-10/zloz.mjs ko` — kod wyjścia 0:

```
ko: poprawek 485 {"KRYT":0,"WYS":0,"ŚR":384,"NISKIE":101}; części bez wyniku: —
```

ODRZUCONA: 0, KOLIZJA: 0, OSTRZEŻENIE: 2 (oba z części wcześniejszych: L3 m6-l1:55, R1 rules.yaml:213; żadne nie dotyczy AP — znaczniki `{{t:}}`, `{{n:}}`, `[[…]]` w `stary` i `nowy` wpisów AP są te same), wykluczenia dopasowane: 8 z 8. Przed AP było 301 poprawek; teraz 485 = 301 − 8 wykluczonych + 192 AP.

Symulacja nałożenia wszystkich poprawek z `poprawki-ko.json` w pamięci (kolejno, każde `stary` dokładnie raz w bieżącym tekście), potem zliczenie pozostałych form w `content/ko/**` (bez `terms-nazwy.yaml`, komentarzy YAML, kluczy YAML i kluczy znaczników) i `ko.json`:

```
symulacja: poprawek 485, plików 56, nieudanych 0
c-bet|C-bet|C-벳|c-벳|c벳: 17 | Fold to 6: lessons/m10-l3-odejscie-od-bazy.md:42, lessons/m10-l3-odejscie-od-bazy.md:47, lessons/m10-l3-odejscie-od-bazy.md:49, lessons/m10-l3-odejscie-od-bazy.md:56, lessons/m10-l3-odejscie-od-bazy.md:109, lessons/m10-l3-odejscie-od-bazy.md:129 | tekst 7: lessons/m6-l2-sprawdzenie.md:41, lessons/m6-l2-sprawdzenie.md:61, lessons/m6-l2-sprawdzenie.md:71, lessons/m6-l2-sprawdzenie.md:81, lessons/m7-l1-druga-beczka.md:53, lessons/m7-l1-druga-beczka.md:72, lessons/m7-l1-druga-beczka.md:82 | source 4
3-bet: 60 | Fold to 7: lessons/m10-l3-odejscie-od-bazy.md:66, lessons/m10-l3-odejscie-od-bazy.md:117, lessons/m10-l3-odejscie-od-bazy.md:122, lessons/m10-l3-odejscie-od-bazy.md:129, rules.yaml:849 | source 53
4-bet: 4 | source 4
너츠: 0
이니셔티브: 0
투페어: 0
닛(?!트): 0
레이크 상한: 0
수딧: 0
웨트: 0
플랍: 0
기대값: 0
리포트: 0
자유 게임: 0
}}천 핸드|}}k 핸드|}}k: 1 | tekst 1: lessons/m13-l1-raport.md:105
배드 빗: 0
오픈엔디드: 0
OESD: 9 | tekst 9: exams/m13.yaml:44, exams/m2.yaml:12, exams/m2.yaml:36, exams/m2.yaml:45, exams/m2.yaml:86, exams/m8.yaml:46, lessons/m6-l3-check-raise.md:72, terms-def.yaml:51, terms-def.yaml:52
페이아웃|상금 지급: 1 | tekst 1: apps/mobile/src/i18n/locales/ko.json:705
당신 (m6-l3): 0
```

Wyjaśnienie pozostałych: „c-bet” 17 = 6× angielska nazwa statystyki „fold to c-bet” (m10-l3) + 7× identyczne linie nie do zapisania w formacie (m6-l2, m7-l1; sekcja wyżej) + 4× pole source/sources (rules.yaml:413, 414). „3-bet” 60 = 5× „fold to 3-bet” w m10-l3 + 55× pola source/sources `rules.yaml` (w tym 2× „fold to 3-bet” w cytacie l. 849). „4-bet” 4 = cytaty w source (rules.yaml:292, 833). „}}천 핸드” 1 = m13-l1:105 (wartość 2.5). „OESD” 9 = 7 miejsc, gdzie pl ma formę `|OESD`, + 2 definicje w terms-def.yaml. „상금 지급” 1 = ko.json:705 („płatne miejsca”). Pozostałe formy (너츠, 이니셔티브, 투페어, 닛, 레이크 상한, 수딧, 웨트, 플랍, 기대값, 리포트, 자유 게임, 배드 빗, 오픈엔디드; „당신” w m6-l3): 0.

Stan repo: nic nie zmieniono w `content/`, `apps/`, `store/`, `docs/sklep`, kodzie, istniejących `czesci/*` ani w `podsumowanie.md`; bez commita. `zloz.mjs` nadpisał `poprawki-ko.json` i `znaleziska.md` (oczekiwane). Nikt nie oglądał renderu w aplikacji; zamiany terminologiczne AP to przegląd AI, nie rodzimego użytkownika.
