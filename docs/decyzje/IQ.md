# Decyzje sesji IQ (09-lokalizacja fix, treść); pula D-1975…D-1984
| ID | Data | Decyzja | Odrzucone | Powód / zależność |
|---|---|---|---|---|
| D-1975 | 2026-11-17 | Odstępstwo: sesja pracuje bez promptu roli 09 (KO-120): `add_repo` prompts odrzucone przez klasyfikator trybu auto, koordynator potwierdził tryb według IQ.md i CLAUDE.md oraz podał wyciąg zasad (wierność znaczenia, terminologia z terms.yaml, placeholdery identyczne, długość nie większa, każde brzmienie sprawdzone). | Obejście blokady klonem przez git | Polecenie IQ pkt 1 przewiduje ten przypadek; sha256 roli nie zweryfikowany. |
| D-1976 | 2026-11-17 | IL-002 (KO-124 opcja a): w SC-16 raise-big „strity otwarte”/„open-ended straight draws” i odpowiedniki → `{{t:oesd|…}}` w 12 językach; pl „OESD”, en „open-ended straight draws”, pozostałe w formie, jaką ten język ma już w lekcjach i egzaminach (de OESDs, es proyectos de escalera abierta, fr tirages quinte bilatéraux, it OESD, ja OESD, ko 양방향 스트레이트 드로우, pt draws de sequência abertos, pt-BR OESDs, vi goły `{{t:oesd}}`, zh-Hant 兩頭順聽牌). | Jedna forma „OESD” we wszystkich językach (część języków ma w terms-nazwy.yaml nazwę pełną lub null) | Spójność z `content/<j>/terms-nazwy.yaml` i z innymi plikami tego samego języka; `content/terms.yaml` bez zmian. |
| D-1977 | 2026-11-17 | IM-002: zh-Hant SC-27 minimalna zmiana „在河牌前投入全部籌碼” → „到河牌時投入全部籌碼” (reszta zdania i znaczniki bez zmian). | Całe zdanie z raportu IM (dłuższe, bez zysku w sensie) | Przywraca warunek „do rivera” z en/pl; długość ta sama. |
| D-1978 | 2026-11-17 | IM-003: w `content/es/scenarios/` zwykły tekst „Button” → „botón” (nazwa z `content/es/terms-nazwy.yaml:49`; ta sama forma co render `{{w:pozycja}}`) w 19 plikach z „Button” (wszystkie mają `{{w:pozycja}}`), poza komentarzami i poza sc-18 (sesja IP). | Zmiana tylko 4 szablonów HZ (zostawia rozjazd w pozostałych 15); zmiana też rules/exams/terms-def (poza zakresem: 28+ wystąpień „Button” w es poza scenariuszami) | Jedna nazwa na pojęcie w jednej karcie; reszta es poza scenariuszami zgłoszona jako otwarte. |
| D-1979 | 2026-11-17 | IM-004: „en el {{w:pozycja}}” → „en la posición de {{w:pozycja}}” w 9 plikach es z graczem na BB (sc-03, 07, 15, 16, 17, 26, 31, 33, 34) i dodatkowo w 3 plikach z graczem na SB (sc-06, 08, 32): ten sam błąd rodzaju („el ciega pequeña”); raport IM ich nie wymienił. | Tylko 9 plików z raportu (zostawia „el ciega pequeña”); zdanie zależne od pozycji | Forma neutralna rodzajowo działa dla wszystkich pozycji. sc-18 es nie ma gracza na BB/SB, bez zmian. |
| D-1980 | 2026-11-17 | IM-005 (it SC-30): według propozycji IM (situation „compreso tra X e Y”; fold „se gioca solo le mani più forti, circa X–Y del totale”). | Zostawić „il” przed liczbą (psuje się dla 8, 11, 80) | Brak rodzajnika przed liczbą z numbers.yaml; sens i znaczniki jak we wzorcu. |
| D-1981 | 2026-11-17 | IM-006/IM-007 (pt SC-16) minimalne zmiany: „quando ele faz call, o seu draw ainda pode completar-se”; „mas um aumento para cerca de X o c-bet é demasiado pequeno”. | Przepisanie całego zdania z raportu (zmienia „a aposta dele”) | Usuwa dwuznaczność podmiotu; znaczniki `{{t:}}` poza `{{t:raise}}` dodanym w IM-007 bez zmian. |
| D-1982 | 2026-11-17 | IM-008 (pt SC-21): własne brzmienie „por isso já não é seguro para si apostar” zamiast propozycji IM („a sua aposta já não é segura”). | Propozycja IM (zmienia sens z „nie możesz stawiać bez obaw” na „twój zakład jest niebezpieczny”) | Bezosobowo i bez przypisania rywalowi; wzorzec pl „nie możesz już stawiać bez obaw”. |
| D-1983 | 2026-11-17 | IM-009 (ko SC-21): drugie zdanie „당신도 체크합니다.” według propozycji IM. | — | Jedna możliwa naprawa, wiadomo, kto czeka. |

## Tabela zmian (ID → plik:linia → przed → po)
| ID | Plik:linia | Przed | Po | Wystąpień |
|---|---|---|---|---|
| IL-002 | `content/pl/scenarios/sc-16.yaml:23` | `{{t:straight|strity}} otwarte` | `{{t:oesd|OESD}}` | 1 |
| IL-002 | `content/en/scenarios/sc-16.yaml:21` | `open-ended {{t:straight}} draws` | `{{t:oesd|open-ended straight draws}}` | 1 |
| IL-002 | `content/de/scenarios/sc-16.yaml:21` | `offene {{t:straight|Straßen}}-Draws` | `{{t:oesd|OESDs}}` | 1 |
| IL-002 | `content/es/scenarios/sc-16.yaml:21` | `los proyectos de {{t:straight|escalera}} abiertos` | `los {{t:oesd|proyectos de escalera abierta}}` | 1 |
| IL-002 | `content/fr/scenarios/sc-16.yaml:21` | `les tirages {{t:straight|quinte}} par les deux bouts` | `les {{t:oesd|tirages quinte bilatéraux}}` | 1 |
| IL-002 | `content/it/scenarios/sc-16.yaml:21` | `i progetti di {{t:straight|scala}} aperti` | `gli {{t:oesd|OESD}}` | 1 |
| IL-002 | `content/ja/scenarios/sc-16.yaml:21` | `オープンエンドの{{t:straight|ストレート}}ドロー` | `{{t:oesd|OESD}}` | 1 |
| IL-002 | `content/ko/scenarios/sc-16.yaml:21` | `양방향 {{t:straight|스트레이트}} 드로우` | `{{t:oesd|양방향 스트레이트 드로우}}` | 1 |
| IL-002 | `content/pt/scenarios/sc-16.yaml:21` | `os draws de {{t:straight|sequência}} abertos` | `os {{t:oesd|draws de sequência abertos}}` | 1 |
| IL-002 | `content/pt-BR/scenarios/sc-16.yaml:21` | `projetos de {{t:straight|sequência}} abertos` | `{{t:oesd|OESDs}}` | 1 |
| IL-002 | `content/vi/scenarios/sc-16.yaml:21` | `bài chờ {{t:straight|sảnh}} hai đầu` | `{{t:oesd}}` | 1 |
| IL-002 | `content/zh-Hant/scenarios/sc-16.yaml:21` | `兩頭{{t:straight|順子}}聽牌` | `{{t:oesd|兩頭順聽牌}}` | 1 |
| IM-002 | `content/zh-Hant/scenarios/sc-27.yaml:4` | `在河牌前投入全部籌碼` | `到河牌時投入全部籌碼` | 1 |
| IM-003 | `content/es/scenarios/sc-05.yaml:5,28,30` | `Button` | `botón` | 3 |
| IM-003 | `content/es/scenarios/sc-06.yaml:20` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-07.yaml:4` | `Button` | `botón` | 2 |
| IM-003 | `content/es/scenarios/sc-08.yaml:5,19,21,23,31,33,35` | `Button` | `botón` | 8 |
| IM-003 | `content/es/scenarios/sc-10.yaml:4,20,22,24` | `Button` | `botón` | 4 |
| IM-003 | `content/es/scenarios/sc-11.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-12.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-13.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-15.yaml:4` | `Button` | `botón` | 2 |
| IM-003 | `content/es/scenarios/sc-16.yaml:4,27` | `Button` | `botón` | 3 |
| IM-003 | `content/es/scenarios/sc-17.yaml:4` | `Button` | `botón` | 2 |
| IM-003 | `content/es/scenarios/sc-21.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-22.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-23.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-25.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-26.yaml:4` | `Button` | `botón` | 2 |
| IM-003 | `content/es/scenarios/sc-27.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-29.yaml:4` | `Button` | `botón` | 1 |
| IM-003 | `content/es/scenarios/sc-30.yaml:4` | `Button` | `botón` | 1 |
| IM-004 | `content/es/scenarios/sc-03.yaml:21,23` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-06.yaml:20,22,30,32,34` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 5 |
| IM-004 | `content/es/scenarios/sc-07.yaml:21,23` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-08.yaml:19,21,23,31,33,35` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 6 |
| IM-004 | `content/es/scenarios/sc-15.yaml:20,22` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-16.yaml:21,23,25,27` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 4 |
| IM-004 | `content/es/scenarios/sc-17.yaml:20,22` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-26.yaml:21,23` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-31.yaml:22,24` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-32.yaml:19,21` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-33.yaml:19,21` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-004 | `content/es/scenarios/sc-34.yaml:21,23` | `en el {{w:pozycja}}` | `en la posición de {{w:pozycja}}` | 2 |
| IM-005 | `content/it/scenarios/sc-30.yaml:4` | `tra il {{n:hud.ex.nit3bet.vpip.low}} e il {{n:hud.ex.nit3bet.vpip.high}}` | `compreso tra {{n:hud.ex.nit3bet.vpip.low}} e {{n:hud.ex.nit3bet.vpip.high}}` | 1 |
| IM-005 | `content/it/scenarios/sc-30.yaml:20` | `perché se gioca circa il {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} più forte delle mani,` | `perché se gioca solo le mani più forti, circa {{n:hud.ex.nit3bet.vpip.low}}–{{n:hud.ex.nit3bet.vpip.high}} del totale,` | 1 |
| IM-006 | `content/pt/scenarios/sc-16.yaml:21` | `quando faz {{t:call}}, ainda pode acertar o seu {{t:draw}}.` | `quando ele faz {{t:call}}, o seu {{t:draw}} ainda pode completar-se.` | 1 |
| IM-007 | `content/pt/scenarios/sc-16.yaml:27` | `mas para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}}` | `mas um {{t:raise|aumento}} para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}}` | 1 |
| IM-008 | `content/pt/scenarios/sc-21.yaml:18` | `por isso já não pode {{t:bet|apostar}} sem receio` | `por isso já não é seguro para si {{t:bet|apostar}}` | 1 |
| IM-009 | `content/ko/scenarios/sc-21.yaml:18` | `체크}}합니다. {{t:check|체크}}합니다. 플롭에서` | `체크}}합니다. 당신도 {{t:check|체크}}합니다. 플롭에서` | 1 |
