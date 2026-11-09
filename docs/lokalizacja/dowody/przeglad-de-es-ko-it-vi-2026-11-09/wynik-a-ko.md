# Kontrola (a) treści krytycznej, moduł 12: pl → ko

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/: m12-l1-wariancja.md, rules-R-M12.yaml — reguły R-M12-001…009, 011, 012) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/ko/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności („zwykle”, „ok.”, „przybliżenie”), poprawne odpowiedzi (correct) i ich uzasadnienia.
- Każde wątpliwe miejsce (w tym znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/ko/. Wyciągi ka/ko są tożsame z plikami pełnymi: lekcja identyczna bajtowo z <scratchpad>/art/ko-lek/podglad/content/ko/lessons/m12-l1-wariancja.md, wyciąg reguł występuje dosłownie w <scratchpad>/art/koit-r/podglad/content/ko/rules.yaml.

## Kontrola automatyczna (python, <scratchpad>/pr/A/kontrola-ko.py, <scratchpad>/ka/pl vs <scratchpad>/ka/ko)
- Multizbiór {{n:…}}: lekcja 188 = 188, reguły 43 = 43; zgodny w każdym segmencie (10 drilli + nagłówek + treść lekcji; 11 reguł) — 0 różnic.
- Multizbiór {{t:<id>}}: lekcja 75 = 75, reguły 19 = 19 — zgodny per segment.
- Struktura drilli (kind, id, family, rules, answer, pozycja correct: true) identyczna; 8 = 8 poprawnych opcji, wszystkie na tych samych pozycjach.
- Liczby wpisane cyfrą: lekcja 68 vs 72, reguły 60 vs 64. Każda nadwyżka ko wyjaśniona, bez zmiany sensu: n-expected „1개당” (= pl „po” jednym wpisowym), q-ci95 „표준편차 1개 구간” (= „jednego odchylenia”), q-hands-needed „100배” (= „sto razy”), treść „0보다” (= „nad zerem”); w regułach 001, 002, 003, 011 „{{n:var.hands.k}},000핸드” / „{{n:var.need.hands.k}},000핸드” (= pl „… tys. rąk”; var.hands.k = 100, var.need.hands.k ≈ 615, więc 100,000 i 615,000 rąk), w 003 source „615,000핸드” (= „615 tys. rąk”).
- Przekład zwrotny vs pl: {{n:…}} w R-M12-011 46 vs 43 — nadwyżka pochodzi wyłącznie z treści znaczników [NIEJASNE], nie z tekstu reguły.

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, nagłówek (title, sub) | zgodne | title „숫자로 보는 분산” (wariancja w liczbach); sub „수천 핸드의 결과가 알려 주는 것” („co mówi wynik tysięcy rąk”) — odcień „co” vs „ile”, bez zmiany sensu | — | — |
| 2 | m12-l1, treść lekcji: winrate „보통” (zwykle) {{n:var.wr.typical.*}}, SD „보통” + wartość typowa, wzory, przykład ({{n:var.p.lose}}), błąd winrate, ile rąk, tabela downswingów, nota „Skąd te liczby” („조금 더 깊을 수 있습니다” = bywają nieco głębsze; „플레이를 못한다는 증거는 아닙니다” = nie dowodzi, że grasz źle), zdanie o ekranie „Pomoc” | zgodne | stopnie pewności („보통”, „약”, „~수 있습니다”) i przeczenie w nocie zachowane; „플레이를 통제하기 어려워지면” = „gdy trudno ci kontrolować grę” — ten sam sens co „granie przestaje być pod kontrolą” | — | — |
| 3 | m12-l1, n-expected, q-sd-result, q-ci95, n-se | zgodne | correct i uzasadnienia (pierwiastek z liczby bloków, ±{{n:var.z95}}, „결과 3개 중 약 2개만” = tylko ok. 2 z 3 wyników, „거의 본전” = prawie na zero) zgodne | — | — |
| 4 | m12-l1, q-winrate-ci, q-hands-needed | zgodne | „아마 지고 있지 않다는 것만” = „tylko że raczej nie przegrywasz” (niepewność zachowana); „그 100배” = sto razy więcej | — | — |
| 5 | m12-l1, q-dd-100k | zgodne | granica „co najmniej {{n:dd.bi.small}}” = „{{n:dd.bi.small}}개 이상” (… lub więcej); correct „거의 항상” = prawie zawsze | — | — |
| 6 | m12-l1, q-dd-wr-low, why poprawnej: „częściej niż w co drugiej próbce” | zgodne | oryginał: „표본의 절반 이상에서” = w ponad połowie próbek | — | — |
| 7 | m12-l1, q-dd-wr-low, why opcji 2 | zgodne | „윈레이트는 결과가 변동에서 얼마나 빨리 벗어나는지를 결정합니다” = winrate decyduje, jak szybko wynik wychodzi z wahań — ten sam obraz co pl „jak szybko wynik od nich ucieka”; {{n:dd.p.big.100k*}} przypisane do właściwych graczy | — | — |
| 8 | m12-l1, q-dd-meaning | zgodne | correct „{{t:downswing}}만으로는 아무것도 단정할 수 없다. 진 핸드에서 내린 결정을 검토한다” = sam downswing niczego nie przesądza; przeglądasz decyzje; przedział „윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}” zapisany tyldą (jednoznacznie); dystraktory i ich why zgodne | — | — |
| 9 | m12-l1, q-sd-typical | zgodne | — | — | — |
| 10 | rules R-M12-001, 003 (level math) | zgodne | wzory, „약”, „수십만 핸드” (setki tysięcy rąk) zgodne; „,000핸드” zamiast „tys.” — patrz kontrola automatyczna | — | — |
| 11 | rules R-M12-002, 004, 005 | zgodne | „잘못 플레이했다는 증거로 보지 않고” (nie traktujesz jako dowodu złej gry), „결과만 보고 바꾸지 않고, 핸드를 검토한 뒤에만 바꿉니다” (dopiero po przeglądzie), „그래서는 안 된다는 것을 알면서도” (nawet gdy wiedzą, że nie powinni), 005 „앞서는 데도 약 {{n:skill.hands}}핸드가 걸리며” (dopiero po ok. … rękach) zachowane; 004 „regularnie” → „자주” (często) — odcień, kierunek ten sam | — | — |
| 12 | rules R-M12-006: termin {{t:variance}} | różnica (spójność terminu) | then: „{{t:variance|변동성}}”, a lekcja m12-l1 (tytuł, q-sd-typical: „{{t:variance|분산}}”) i większość treści ko używają „분산” (kandydaci k05: 분산×14, 변동성×6) — dwie nazwy jednego pojęcia; sens zalecenia zgodny („즉시 대응합니다” = od razu) | „{{t:variance|분산}}이거나” zamiast „{{t:variance|변동성}}이거나” (JSON) | ŚREDNIE |
| 13 | rules R-M12-007, 008 | zgodne | „{{t:session|세션}}을 끝냅니다”, „명확하게 생각하는 능력을 잃기 전에 일찍 그만두는 것” (skończyć wcześnie, zanim stracisz zdolność jasnego myślenia; „quit sooner” — sens ten sam), „최고의 플레이를 다듬기보다 최악의 플레이(C-게임)를 고치는 것부터” zgodne | — | — |
| 14 | rules R-M12-009 | zgodne | „윈레이트와 SD가 일정하다고 가정한 근사치입니다” = przybliżenie przy stałym winrate i SD | — | — |
| 15 | rules R-M12-011 then | zgodne | [NIEJASNE] przekładu zwrotnego rozstrzygnięty na oryginale: „늦어도 그때 {{t:stakes|스테이크}}를 한 단계 내리고, 빨라도 상위 {{t:stakes|스테이크}}의 {{t:buy-in|바이인}} 기준으로 뱅크롤이 다 찼을 때 다시 올립니다” = „najpóźniej wtedy schodzisz o stawkę, a wracasz najwcześniej, gdy bankroll jest pełny w wpisowych wyższej stawki”; „늦어도/빨라도” = najpóźniej/najwcześniej (kolejność zgodna z pl), „다 찼을 때” = „gdy jest całkowicie pełny”, liczony „상위 스테이크의 바이인 기준” = w wpisowych wyższej stawki — oddaje pl „pełny bankroll w wpisowych wyższej stawki” | — | — |
| 16 | rules R-M12-011 because: „od {{n:dd.wr-low}} do {{n:var.wr.ex}}” | różnica (niejednoznaczność) | [NIEJASNE] rozstrzygnięty na oryginale: „{{n:dd.wr-low}}에서 {{n:var.wr.ex}}로 이기는 거의 모든 플레이어” — „A에서 B로” w tym zdaniu czyta się jako przedział („wygrywający od A do B”), ale też jako zmianę winrate z A na B; w polu if tej samej reguły „({{n:br.bi.base}}에서 {{n:br.bi.move-down}}으로)” ta konstrukcja znaczy właśnie zmianę. Liczby, podmiot i twierdzenie zachowane, kontekst („거의 모든 플레이어”) wskazuje przedział — stąd ŚREDNIE, nie WYSOKIE. Lekcja (q-dd-meaning) zapisuje to samo jednoznacznie tyldą | „윈레이트 {{n:dd.wr-low}}~{{n:var.wr.ex}}로 이기는” zamiast „{{n:dd.wr-low}}에서 {{n:var.wr.ex}}로 이기는” (JSON) | ŚREDNIE |
| 17 | rules R-M12-011 source: „przy 3bb/100 zejście przy 30 wpisowych, czyli przy pełnym bankrollu” | zgodne | oryginał „3bb/100에서 30 바이인일 때 내림, 즉 뱅크롤이 다 찬 상태 기준” — oddaje (niezręczne) sformułowanie pl wiernie; pole źródła, nie zalecenie | — | — |
| 18 | rules R-M12-012 | zgodne | „절대 {{n:study.min}}보다 적게 하지는 않습니다” = nigdy mniej niż {{n:study.min}} | — | — |
| 19 | rules R-M12-001…003, 011 vs lekcja: zapis liczby rąk | zgodne (styl) | reguły „{{n:var.hands.k}},000핸드”, lekcja „{{n:var.hands.k}}k 핸드” — ta sama wielkość, dwa zapisy; bez zmiany sensu, do ujednolicenia przy okazji | — | NISKIE |

Poza zakresem (informacyjnie): lekcja m12-l3-tilt (ko) też używa „{{t:variance|변동성}}” — przy ujednolicaniu terminu (wiersz 12) objąć cały ko.

Poprawki do nałożenia: <scratchpad>/pr/A/poprawki-A-ko.json (2 wpisy, content/ko/rules.yaml). Test: `node docs/lokalizacja/narzedzia/poprawki.mjs` — z art/ko-lek/propozycje.json: nałożone 0, pominięte 0, z innych plików 2 (cel rules.yaml nie należy do tej partii); z art/koit-r/propozycje.json: nałożone 2, pominięte 0.

## Werdykt: zaliczona
Brak różnic sensu blokujących wydanie; dwie poprawki ŚREDNIE (spójność terminu, niejednoznaczny zapis przedziału) w JSON.
Liczby: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 2, NISKIE 1; poprawek w JSON 2.

Uwaga sesji AJ (scalenie list): w repo `poprawki-A-ko.json` ma 1 pozycję — poprawka R-M12-006 (변동성 → 분산) pominięta jako duplikat identycznej poprawki K1.
