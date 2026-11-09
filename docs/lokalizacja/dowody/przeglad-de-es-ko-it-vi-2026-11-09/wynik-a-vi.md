# Kontrola (a) treści krytycznej, moduł 12: pl → vi

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/: m12-l1-wariancja.md, rules-R-M12.yaml — reguły R-M12-001…009, 011, 012) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/vi/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności („zwykle”, „ok.”, „przybliżenie”), poprawne odpowiedzi (correct) i ich uzasadnienia.
- Każde wątpliwe miejsce (w tym znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/vi/. Wyciągi ka/vi są tożsame z plikami pełnymi: lekcja identyczna bajtowo z <scratchpad>/tl/content/vi/lessons/m12-l1-wariancja.md, wyciąg reguł występuje dosłownie w <scratchpad>/tl/content/vi/rules.yaml.

## Kontrola automatyczna (python, <scratchpad>/pr/A/kontrola-vi.py, <scratchpad>/ka/pl vs <scratchpad>/ka/vi)
- Multizbiór {{n:…}}: lekcja 188 = 188, reguły 43 = 43; zgodny w każdym segmencie (nagłówek + 10 drilli + treść lekcji; 11 reguł + komentarz) — 0 różnic.
- Multizbiór {{t:<id>}}: lekcja 75 = 75, reguły 19 = 19 — zgodny per segment.
- Liczby wpisane cyfrą (100, 2 z 3, 6-max, 1,96 × 80 ÷ 2, 615, 3bb/100, 30, 10, lata źródeł): reguły 30 = 30 zgodne per segment; lekcja 16 vs 17 — jedyna różnica w treści lekcji: vi „trên mức 0” = pl „nad zerem” (zero słowem w pl), nie jest błędem.

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, nagłówek (title, sub) | zgodne | — | — | — |
| 2 | m12-l1, treść: winrate i SD „zwykle”, wzory, nota „Skąd te liczby” („nieco głębsze… không chứng minh rằng bạn đang chơi tệ”), zdanie o ekranie „Pomoc” | zgodne | stopnie pewności i przeczenie w nocie zachowane | — | — |
| 3 | m12-l1, treść, przykład: „Z {{n:var.conf95}} pewnością skończysz między ok. **X a Y**” | różnica | oryginał: „bạn sẽ kết thúc trong khoảng từ **{{n:var.ci.low.bi}} đến {{n:var.ci.high.bi}}**” — brak znacznika przybliżenia „khoảng” przy zaokrąglonych granicach (drill q-ci95 w vi go ma: „Từ khoảng … đến khoảng”) | „bạn sẽ kết thúc ở mức từ khoảng **{{n:var.ci.low.bi}} đến khoảng {{n:var.ci.high.bi}}…**” | NISKIE |
| 4 | m12-l1, treść, „Ile rąk…”: „gdzieś między ok. … a …” | zgodne | oryginał „nằm đâu đó trong khoảng từ … đến …” — „đâu đó” (gdzieś) oddaje przybliżenie | — | — |
| 5 | m12-l1, n-expected, q-sd-result, q-ci95, n-se | zgodne | correct i uzasadnienia (pierwiastek z liczby bloków, ±{{n:var.z95}}, „khoảng 2 trên 3 kết quả”) zgodne | — | — |
| 6 | m12-l1, q-winrate-ci, q-hands-needed | zgodne | „raczej nie przegrywasz” = „nhiều khả năng mình không thua” (najprawdopodobniej) — niepewność zachowana; „sto razy więcej” zgodne | — | — |
| 7 | m12-l1, q-dd-100k, prompt i correct | zgodne | granica „co najmniej {{n:dd.bi.small}}” zachowana; correct „Prawie zawsze” zgodne | — | — |
| 8 | m12-l1, q-dd-100k, why opcji 3 | zgodne | [NIEJASNE] rozstrzygnięty na oryginale: „Đó là mức hiếm mà người chơi {{n:var.wr.ex}} kết thúc {{n:var.hands.k}} nghìn tay trong tình trạng âm” = „to ten rzadki poziom (częstość), z jakim gracz kończy na minusie”; sens pl „Tak rzadko gracz… kończy na minusie” zachowany, dalej „Downswing giữa chừng là chuyện khác: nó gần như luôn xảy ra” zgodne; tylko styl | — | — |
| 9 | m12-l1, q-dd-wr-low | zgodne | „częściej niż w co drugiej próbce” = „hơn một nửa số mẫu” (ponad połowa); why opcji 2 („jak szybko wynik od nich ucieka”) zgodne; liczby {{n:dd.p.big.100k*}} przypisane do właściwych graczy | — | — |
| 10 | m12-l1, q-dd-meaning, q-sd-typical | zgodne | correct „Sam downswing niczego nie przesądza; przeglądasz decyzje” = „Bản thân downswing không chứng minh điều gì”; „gần như mọi người chơi” = „prawie każdego” | — | — |
| 11 | rules R-M12-001 (termin „ván”/„tay”) | zgodne | [NIEJASNE] rozstrzygnięty: „ván” i „tay” oba znaczą rozdanie/rękę; w vi lekcja m12-l1 liczy próbkę w „nghìn tay” (31×), reguły R-M12-001…003 w „nghìn ván”/„số ván”, a w całym content/vi oba warianty są wymieszane (m10, m13: „nghìn ván”, „số ván”; m12: „nghìn tay”; m3–m8: „số tay”). Sens nie cierpi; jednolity termin dla „liczba rąk w próbce” to sprawa terminologii całego vi — do backlogu, poza tą kontrolą | — | NISKIE |
| 12 | rules R-M12-001 because: „między ok. {{n:var.wr.ci.low}} a {{n:var.wr.ci.high}}” | różnica | oryginał „“trong khoảng từ {{n:var.wr.ci.low}} đến {{n:var.wr.ci.high}}”” — zgubione „ok.” | „“từ khoảng {{n:var.wr.ci.low}} đến khoảng {{n:var.wr.ci.high}}”” | NISKIE |
| 13 | rules R-M12-002, 003, 004 | zgodne | przeczenie „không coi đó là bằng chứng chơi kém”, „setki tysięcy rąk”, „ngay cả khi biết là không nên” zachowane | — | — |
| 14 | rules R-M12-005 because: „wyprzedza … w ok. {{n:skill.ahead}} przypadków dopiero po ok. {{n:skill.hands}} rękach” | różnica | oryginał „cũng chỉ vượt {{n:skill.pct}} người chơi kém nhất trong khoảng {{n:skill.ahead}} trường hợp sau khoảng {{n:skill.hands}} ván” — „chỉ” (tylko) przeniesione na częstość, zgubione „dopiero” (próg liczby rąk); wniosek reguły (zmiana strategii dopiero po przeglądzie) nienaruszony | „cũng phải sau khoảng {{n:skill.hands}} ván mới vượt {{n:skill.pct}} người chơi kém nhất trong khoảng {{n:skill.ahead}} trường hợp” | NISKIE |
| 15 | rules R-M12-006 if: „ze swojego profilu” | zgodne | [NIEJASNE] rozstrzygnięty: „trong hồ sơ của mình” — „hồ sơ” to w vi ten sam termin co w lekcji m12-l3 („viết ra **hồ sơ tilt** của bạn”), czyli spisany profil tiltu (Tendler „Tilt Profile”), zgodnie z pl | — | — |
| 16 | rules R-M12-006, 007, 008, 009 | zgodne | „ngay” (od razu), „trước khi bạn mất khả năng suy nghĩ rõ ràng”, „chứ không phải mài giũa những lối chơi tốt nhất”, „đây là ước lượng khi winrate và SD không đổi” zgodne | — | — |
| 17 | rules R-M12-011 if/then | zgodne | granice: „muộn nhất là lúc đó bạn xuống một mức cược, và sớm nhất bạn quay lại khi đã có đủ bankroll” — najpóźniej/najwcześniej zgodne z pl; „đủ bankroll” = pełny (wymagany) bankroll | — | — |
| 18 | rules R-M12-011 because: „zdarzają się prawie każdemu graczowi wygrywającemu” | różnica | oryginał „xảy ra với hầu hết người chơi thắng” = „większości”; stopień pewności osłabiony względem pl i niespójny z lekcją vi q-dd-meaning („gần như mọi người chơi”); twierdzenie nie staje się fałszywe | „xảy ra với gần như mọi người chơi thắng từ {{n:dd.wr-low}} đến {{n:var.wr.ex}}” | ŚREDNIE |
| 19 | rules R-M12-011 source: „przy 3bb/100 zejście przy 30 wpisowych, czyli przy pełnym bankrollu” | zgodne | [NIEJASNE] dotyczy treści samego źródła pl; oryginał „ở 3bb/100 xuống mức khi còn 30 buy-in, tức khi có đủ bankroll” oddaje pl wiernie; pole źródła, nie zalecenie | — | — |
| 20 | rules R-M12-012 | zgodne | „không bao giờ ít hơn {{n:study.min}}” (nigdy mniej niż) zachowane | — | — |

Poprawki do nałożenia: <scratchpad>/pr/A/poprawki-A-vi.json — 4 (wiersze 3, 12, 14, 18; wiersz 11 bez poprawki, do backlogu terminologii vi). Test narzędziem docs/lokalizacja/narzedzia/poprawki.mjs: vi-lek nałożone 1, pominięte 0; vi-r nałożone 3, pominięte 0.

## Werdykt: zaliczona
Brak różnic KRYTYCZNYCH i WYSOKICH; jedna ŚREDNIA (osłabiony stopień pewności w R-M12-011) i trzy NISKIE z poprawkami, jedna NISKA do backlogu.
Liczby: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 1, NISKIE 4; poprawek w JSON 4.

Uwaga sesji AJ (scalenie list): w repo `poprawki-A-vi.json` ma 1 pozycję (lekcja). Trzy poprawki rules.yaml pominięte: R-M12-011 „gần như mọi” i R-M12-005 („dopiero po ok. N rękach”) dają wynik identyczny z V1; R-M12-001 — przyjęto wersję V1 „khoảng từ X đến Y”, zgodną ze źródłem pl „między ok. X a Y” (`content/pl/rules.yaml:957`).
