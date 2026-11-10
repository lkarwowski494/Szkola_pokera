# ko · E2 — uwagi recenzenta

## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/exams/m7.yaml | tak (95/95 linii, pl i ko) | znaczniki i pola nieprzekładalne zgodne z pl; 7 poprawek |
| content/ko/exams/m8.yaml | tak (93/93) | znaczniki zgodne; 5 poprawek |
| content/ko/exams/m9.yaml | tak (86/86) | znaczniki zgodne; bez poprawek |
| content/ko/exams/m10.yaml | tak (82/82) | znaczniki zgodne; 8 poprawek |
| content/ko/exams/m11.yaml | tak (86/86) | znaczniki zgodne; 1 poprawka |
| content/ko/exams/m12.yaml (TREŚĆ KRYTYCZNA) | tak (93/93), zdanie po zdaniu | znaczniki zgodne; 10 poprawek (3 ŚR nazwy typów tiltu, 7 NISKIE) |
| content/ko/exams/m13.yaml | tak (91/91) | znaczniki zgodne; 1 poprawka |

Kontrole pomocnicze (poza lekturą): skrypt porównał linia po linii pl ↔ ko zbiory kluczy `{{t:…}}`, znaczniki `{{n:…}}`, `[[…]]`, symbole kart i działań oraz całą strukturę YAML poza tekstami w cudzysłowach (id, family, rules, table, answer, correct, sizeError) — 0 różnic w 7 plikach. Partykuły po liczbach sprawdzone na wartościach wyświetlanych w ko (liczby policzone funkcją `resolveNumbers` z `tools/content-build`, bez zapisu do repo). Pomocniczo otwarte: `content/en/exams/m10.yaml` l. 63 (jedno zdanie), lekcje `m10-l3` i `m12-l3` (pl i ko, pojedyncze linie do porównania nazw), `rules.yaml` ko (pojedyncze linie), `apps/mobile/src/i18n/locales/ko.json` (nazwy werdyktów i ekranu „Pomoc”). Wcześniejszych przeglądów ani `docs/decyzje.md` nie czytałem.

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| ŚR | content/ko/exams/m12.yaml:7, 10, 16, 18, 19, 20, 27, 28, 34, 37, 38 | pl „{{n:…k}} tys. rąk” → ko „{{n:…k}}천 핸드”; na ekranie „50천 핸드”, „2천 핸드”, „960.4천 핸드”, „614.656천 핸드”. Liczba jest ta sama co w pl (sens zachowany), ale zapis „N천” przy N ≥ 10 i z ułamkiem jest po koreańsku nienaturalny (czytelnik oczekuje „5만 핸드”, „약 96만 핸드”). Nie da się tego poprawić w samym tekście, bo wartość pochodzi z klucza w tysiącach. | Decyzja w źródle liczb: osobne klucze z pełną liczbą rąk (np. 50,000) albo zgoda na zapis „N천”. Do tego czasu zostawić. |
| NISKIE | content/ko/exams/m12.yaml:64, 66 (oraz rules.yaml ko 1005, 1012 — poza częścią) | „C-게임” w egzaminie i regułach, „C-game” / „A-game” w lekcji m12-l3 ko. Dwa zapisy tego samego pojęcia. | Ujednolicić w całym ko (jedna decyzja dla lekcji, reguł i egzaminu). |
| NISKIE | content/ko/exams/m10.yaml:64, 73 | pl „Rywal pasuje w {{n}}” → „상대는 {{n}}에서 폴드하므로…”, „이 상대는 {{n}}에서 폴드합니다” („40%에서 폴드”): kalka „w 40%”, zrozumiała, ale mało naturalna. | Np. „상대의 폴드는 {{n:exam.m10.fcb}}이므로 너무 적습니다”, „이 상대의 폴드는 {{n:exam.m10.f3b.low}}입니다” — do decyzji rodzimego użytkownika. |

## Do ujednolicenia skryptem
Niespójności obejmujące cały przekład ko (nie tylko E2); w E2 nie zgłaszałem ich jako pojedynczych poprawek, poza miejscami wymienionymi w E2.json.

1. **c-bet**: w tekście ko trzy zapisy: łacińskie „c-bet” (140× w `content/ko`, w E2: m7 5×, m8 2×, m10 7×), „C벳” (111×, nazwa z terms-nazwy) i pojedyncze „c벳/씨벳/c-벳”. Wzorzec: `c-bet` → `C벳` (poza kluczami i znacznikami `{{…}}`); partykuły zostają poprawne (oba zapisy kończą się spółgłoską: „c-bet을/은/이/과/으로” → „C벳을/은/이/과/으로”). W tym „폴드 투 c-bet” → „폴드 투 C벳” (m10: 5×; w rules.yaml już „폴드 투 C벳”). Liczba trafień w E2: `grep -c 'c-bet' content/ko/exams/m7.yaml m8.yaml m10.yaml` = 5 / 2 / 7 linii.
2. **3-bet**: „3-bet” (130× w ko; w E2 tylko m10: 9 linii, 17 wystąpień) wobec „3벳” (206×, nazwa z terms-nazwy; m9 ma „3벳 팟”). Wzorzec: `3-bet` → `3벳`; partykuły bez zmian („3-bet은/이/의/에/하지/합니다”).
3. **bet jako czasownik/rzeczownik**: m7 używa „벳” (6× w znaczniku `{{t:bet|벳…}}`, 22× poza znacznikiem: „벳합니다”, „벳은”, „벳에”, „벳하면”, „벳하세요”), a m8–m10 „베팅” (nazwa z terms-nazwy: bet = „베팅”). Wzorzec dla m7: `{{t:bet|벳}}` → `{{t:bet|베팅}}`; samodzielne `벳합니다/벳하면/벳하세요/벳은/벳에/벳에서는/벳 ÷/+ 벳/두 번째 벳/작은 벳/크게 벳` → `베팅…`; **nie ruszać** „프로브 벳” (nazwa terminu) ani „C벳”. Partykuły zostają poprawne (벳/베팅 kończą się spółgłoską). `grep -c '벳' content/ko/exams/m7.yaml` = 19 linii (30 wystąpień, w tym 2× „프로브 벳”).
4. **nit**: „닛” (10×) wobec „니트” (9×, terms-nazwy); w E2 poprawione (m10 l. 34, 38). Uwaga dla skryptu: zmiana „닛” → „니트” wymaga zmiany partykuł (이→가, 은→는, 을→를, 과→와), a znacznik bez formy `{{t:nit}}은/이/을` już dziś wyświetla błędne „니트은” itd.
5. **rake-cap**: forma „레이크 상한” (6× + 1× „상한”) wobec nazwy „레이크 캡” w terms-nazwy; w E2 poprawione 1 miejsce (m10 l. 80). Jeśli decyzja będzie odwrotna (zostaje „레이크 상한”), zmienić terms-nazwy i cofnąć tę poprawkę.
6. **oesd**: formy „OESD” (11×), „오픈엔디드 스트레이트 드로우” (6×), „양방향…” (2×), „양방…” (2×); terms-nazwy = „양방향 스트레이트 드로우”. W E2 poprawione 2 miejsca w m7; „{{t:oesd|OESD}}” (m8 l. 46, m13 l. 44) zostawiłem, bo pl też ma tam skrót „OESD”.
7. **bad beat**: „배드 비트” (9×) wobec „배드 빗” (3×); w E2 poprawione 1 miejsce (m12 l. 55).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- m9 l. 47: „(1 + 2f)의 {{t:street|스트리트}} 수 제곱” (pl „do potęgi liczby ulic”). Czy czytelnik nie zrozumie „제곱” jako kwadratu? Ewentualnie „(1 + 2f)를 스트리트 수만큼 거듭제곱한 값”.
- m8/m9: „지불합니다 / 지불할 핸드” dla pl „zapłaci” (m7 ma „돈을 냅니다”). Oba warianty są w lekcjach; czy „지불하다” o ręce, która sprawdza bet, brzmi naturalnie dla gracza?
- m11 l. 67: forma `{{t:payout|상금 지급}}` („turniej z wypłatami”); terms-nazwy = „상금”. Złożenie zawiera nazwę i brzmi poprawnie, ale „상금이 있는 토너먼트” byłoby prostsze.
- m12 l. 18 (poprawka NISKIE „와” → „과”): zakłada odczyt „bb/100” jako „…백”; jeśli zespół czyta jednostkę inaczej, poprawkę pominąć. Analogicznie l. 37 „{{n:exam.m12.style.wr}}은”.
- m10: partykuły po `{{t:vpip}}` („는/와/가”) zakładają odczyt literowany „브이피아이피”; po `{{t:pfr}}` („은/이”) odczyt „피에프알” — spójne w pliku, do potwierdzenia.
- m10 l. 54: „더 얇은 핸드로도 밸류 베팅” (pl „cieńsze ręce”) — żargonowe, zrozumiałe dla graczy; dla początkującego ewentualnie „더 약한 핸드로도”.
- m12 l. 80, 82, 83 i m10 l. 64, 65: poprawki partykuł zależą od bieżących wartości liczb (24, 15, 50, 43%); po zmianie wartości w `numbers.yaml` trzeba je sprawdzić ponownie.

## Pytania do źródła pl
- m10 q7 (l. 63): „Fold to c-bet łączy wszystkie rozmiary i stoły” — „stoły” w znaczeniu board jest dwuznaczne (lekcja m10-l3 pisze „rozmiary i flopy”); wersja en ma „all sizes and tables”, czyli prawdopodobnie ten sam błąd odczytu co w ko. Proponuję w pl „rozmiary i flopy” i sprawdzenie en oraz pozostałych języków.
- m12 q2/q3/q4 i m9 q8: liczby bez zaokrąglenia na ekranie (ko: „-4.012bb/100”, „10.012bb/100”, „7.012bb/100”, „35.062bb/100”, „614.656천”, „960.4천”, „29.944bb”); w pl analogicznie („614,656 tys.”). Czy klucze `exam.m12.wr.ci.*`, `exam.m12.ci.wr`, `exam.m12.style.ci`, `var.need.hands.k`, `exam.m12.need.hands.k`, `g3b.third.total` nie powinny mieć `decimals`? Kosmetyka, nie błąd rachunku.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
Egzamin `m12` (10 pytań, 33 opcje z uzasadnieniami) porównany zdanie po zdaniu z pl.
- **Liczby, progi, wzory**: wszystkie `{{n:…}}` identyczne z pl co do klucza i liczby wystąpień w każdej linii; wzory (SD × √bloki, ± z × SE, (z × SD ÷ cel)², RoR = e^(−2 × winrate × bankroll ÷ SD²)) i ich słowne opisy zgodne. Nic nie zgubiono ani nie dodano.
- **Warunki i kierunki**: „약 … 신뢰도”, „하한” (dolna granica), „늦어도 … 에서 내려갑니다” (najpóźniej), „절대 내리지 않는다면” (nigdy nie zejdziesz), „기준은 직접 정한 뱅크롤로 계산합니다”, „정해 둔 바이인 수의 절반” (połowa założonej liczby), „두 배 / 네 배” — zgodne z pl, bez złagodzenia i bez wzmocnienia.
- **Poprawne odpowiedzi**: `correct: true` w tych samych opcjach co w pl; uzasadnienia zgodne z odpowiedziami (q5 „이겼지만 나쁜 결정”, q7 „세션을 끝냅니다”, q9 „스테이크를 한 단계 내립니다”, q10 „두 배”).
- **Odesłanie do pomocy** (q9): „플레이가 통제되지 않는다면 '도움말' 화면을 확인하세요” = pl „jeśli granie przestaje być pod kontrolą, zajrzyj do ekranu „Pomoc””; nazwa ekranu zgodna z interfejsem ko („도움말”). Zdanie „이것은 일반적인 안내입니다” („To ogólna wskazówka”) zachowane.
- **Sygnał ostrzegawczy** (q9 opcja 3): „손실을 만회하려는 것은 계획이 아니라 경고 신호입니다” = pl „Odgrywanie strat to sygnał ostrzegawczy, a nie plan” — zachowane.
- **Znalezione**: (1) ŚR ×3 — nazwy typów tiltu w q6 inne niż w lekcji, do której pytanie odsyła (poprawione w E2.json: „패배 혐오 틸트”, „불공정 틸트”, „실수 틸트”); (2) NISKIE ×6 — partykuły po liczbach („24이/24으로/15은/50로”, „…bb/100와”); (3) NISKIE ×1 — „배드 빗” → „배드 비트”; (4) bez poprawki — zapis „N천 핸드” i „C-게임” (wyżej). Żadnego znaleziska KRYT ani WYS: brak zmienionej liczby, granicy, warunku i odwróconego sensu.
