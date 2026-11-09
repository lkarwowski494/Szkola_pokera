# Kontrola (a) treści krytycznej, moduł 12: pl → it

Data: 2026-11-09

## Co porównano
- Źródło pl (<scratchpad>/ka/pl/: m12-l1-wariancja.md, rules-R-M12.yaml — reguły R-M12-001…009, 011, 012) z przekładem zwrotnym na polski wykonanym bez dostępu do źródła (<scratchpad>/kz/it/), zdanie po zdaniu: zalecenia, ostrzeżenia, granice (najpóźniej/najwcześniej/co najmniej/ponad/najwyżej), liczby i klucze {{n:…}}, przeczenia, stopień pewności („zwykle”, „ok.”, „przybliżenie”), poprawne odpowiedzi (correct) i ich uzasadnienia.
- Każde wątpliwe miejsce (w tym 4 znaczniki [NIEJASNE] przekładu zwrotnego) rozstrzygnięto na oryginale <scratchpad>/ka/it/. Wyciągi ka/it są tożsame z plikami pełnymi: lekcja identyczna bajtowo z <scratchpad>/tl/content/it/lessons/m12-l1-wariancja.md, wyciąg reguł występuje dosłownie w <scratchpad>/tl/content/it/rules.yaml.

## Kontrola automatyczna (python, <scratchpad>/pr/A/kontrola-it.py, <scratchpad>/ka/pl vs <scratchpad>/ka/it)
- Multizbiór {{n:…}}: lekcja 188 = 188, reguły 43 = 43; zgodny w każdym segmencie (11 drilli + nagłówek + treść lekcji; 11 reguł) — 0 różnic.
- Multizbiór {{t:<id>}}: lekcja 75 = 75, reguły 19 = 19 — zgodny per segment.
- Liczby wpisane cyfrą (100, 2 z 3, 6-max, 1,96 × 80 ÷ 2, 615, 3bb/100, 30, 10, lata źródeł): lekcja 16 = 16, reguły 30 = 30 — zgodne per segment.

## Wyniki

| # | Sekcja (plik, wpis/fragment) | Wynik (zgodne/różnica) | Opis różnicy | Proponowany poprawiony tekst | Waga |
|---|---|---|---|---|---|
| 1 | m12-l1, nagłówek (title, sub) | zgodne | „mani” oddane w przekładzie zwrotnym jako „rozdań” — synonim, bez zmiany sensu | — | — |
| 2 | m12-l1, treść lekcji: winrate „di solito” {{n:var.wr.typical.*}}, SD „di solito” + wartość typowa, wzory, przykład ({{n:var.p.lose}}), błąd winrate, ile rąk, tabela downswingów, nota „Da dove vengono questi numeri” („un po' più profondi… non dimostra che giochi male”), zdanie o ekranie «Aiuto» | zgodne | stopnie pewności („di solito”, „circa”, „possono essere”) zachowane; przeczenie w nocie zachowane; „decine di volte” = „kilkadziesiąt razy” (rząd wielkości ten sam) | — | — |
| 3 | m12-l1, n-expected, q-sd-result, q-ci95, n-se | zgodne | correct i uzasadnienia (pierwiastek z liczby bloków, ±{{n:var.z95}}, „circa 2 risultati su 3”) zgodne | — | — |
| 4 | m12-l1, q-winrate-ci, q-hands-needed | zgodne | „raczej nie przegrywasz” → „probabilmente non perdi”: niepewność zachowana; „cento volte di più” zgodne | — | — |
| 5 | m12-l1, q-dd-100k | zgodne | granica „co najmniej {{n:dd.bi.small}}” = „di almeno {{n:dd.bi.small}}”; correct „Prawie zawsze” = „Quasi sempre” | — | — |
| 6 | m12-l1, q-dd-wr-low, prompt „di {{n:dd.bi.big}}” | zgodne | [NIEJASNE] przekładu zwrotnego: brak „almeno” odpowiada źródłu — pl też ma „o {{n:dd.bi.big}} wpisowych” bez „co najmniej” (inaczej niż q-dd-100k). Przekład wierny; ewentualne ujednolicenie to sprawa źródła pl, nie przekładu | — | — |
| 7 | m12-l1, q-dd-wr-low, why poprawnej: „częściej niż w co drugiej próbce” | zgodne | oryginał: „capita in più di un campione su due” | — | — |
| 8 | m12-l1, q-dd-wr-low, why opcji 2 | zgodne | [NIEJASNE] rozstrzygnięty na oryginale: „il winrate determina quanto velocemente il risultato se ne allontana” — „ne” = od wahań; ta sama metafora co pl „jak szybko wynik od nich ucieka”; liczby {{n:dd.p.big.100k*}} przypisane do właściwych graczy | — | — |
| 9 | m12-l1, q-dd-meaning | zgodne | correct „Il {{t:downswing}} da solo non dimostra nulla; rivedi le decisioni…” oddaje pl „niczego nie przesądza; przeglądasz decyzje”; dystraktory i why zgodne | — | — |
| 10 | m12-l1, q-sd-typical | zgodne | — | — | — |
| 11 | rules R-M12-001, 003 (level math) | zgodne | wzory, „circa”, „centinaia di migliaia di mani” zgodne | — | — |
| 12 | rules R-M12-002, 004, 005 | zgodne | przeczenia „non lo consideri una prova di gioco scadente”, „solo dopo aver rivisto le mani, non in base al solo risultato”, „anche quando sanno che non dovrebbero” zachowane | — | — |
| 13 | rules R-M12-006 then | zgodne | [NIEJASNE] rozstrzygnięty na oryginale: „una frase preparata che ti ricorda perché questa è {{t:variance|varianza}} o un errore da cui imparare” — dosłownie pl „przypomina, dlaczego to {{t:variance}} albo błąd do nauki”; ta sama alternatywa co w źródle (zdanie nie ma rozstrzygać, które z dwóch); „subito” = „od razu” | — | — |
| 14 | rules R-M12-007, 008 | zgodne | „smettere prima, prima di perdere la capacità di pensare con lucidità”, „non dal perfezionare le migliori” zgodne | — | — |
| 15 | rules R-M12-009 | zgodne | „è un'approssimazione con winrate e SD costanti” zachowane | — | — |
| 16 | rules R-M12-011 then | różnica | [NIEJASNE] rozstrzygnięty na oryginale: „scendi … al più tardi a quel punto e risali al più presto quando hai un bankroll completo …”. „Al più tardi” = „najpóźniej” — zgodne. „Al più presto” po włosku znaczy zwykle „jak najszybciej”; czytane tak daje „wracasz jak najszybciej, gdy masz pełny bankroll” — przesunięcie akcentu z dolnej granicy („najwcześniej wtedy, gdy”) na zachętę do szybkiego powrotu. Warunek pełnego bankrollu zostaje, więc zalecenie nie jest odwrócone ani błędne, ale granica w treści odpowiedzialnej gry jest dwuznaczna | „e risali solo quando hai un bankroll completo in {{t:buy-in|buy-in}} del {{t:stakes|limite}} superiore, non prima” | ŚREDNIE |
| 17 | rules R-M12-011 because, source | zgodne | „alcune fonti consigliano di scendere già dopo una perdita del genere”, „da circa {{n:ror.base}} a circa {{n:ror.half}}”; źródło „3bb/100 … 30 buy-in” wierne | — | — |
| 18 | rules R-M12-012 | zgodne | „mai meno di {{n:study.min}}” zachowane; „hai più da recuperare” vs pl „najwięcej do nadrobienia” — odcień stopnia, sens (na początku do nadrobienia jest dużo) ten sam | — | — |

Poprawki do nałożenia: 1, w <scratchpad>/pr/A/poprawki-A-it.json (cel content/it/rules.yaml, „stary” występuje w jednostce dokładnie raz). Test narzędziem poprawki.mjs: z it-lek/propozycje.json — nałożone 0, pominięte 0, z innych plików 1, kod 0 (<scratchpad>/pr/A/t-it1.json); z koit-r/propozycje.json — nałożone 1, pominięte 0, kod 0 (<scratchpad>/pr/A/t-it2.json); rules.yaml it po nałożeniu parsuje się (yaml.safe_load), R-M12-011 then: „… e risali solo quando hai un bankroll completo in {{t:buy-in|buy-in}} del {{t:stakes|limite}} superiore, non prima”.

## Werdykt: zaliczona z jedną poprawką
Brak różnic sensu rangi błędu; jedna dwuznaczność granicy (R-M12-011, „al più presto”) do poprawienia przed scaleniem.
Liczby: KRYTYCZNE 0, WYSOKIE 0, ŚREDNIE 1, NISKIE 0; poprawek w JSON 1.

Uwaga sesji AJ: waga w `poprawki-A-it.json` podniesiona do WYSOKIE (dwuznaczna granica „al più presto” w treści krytycznej; I3 ocenił ten sam zwrot w m12-l4 jako WYSOKIE). Po nałożeniu wszystkich list it: 0 wystąpień „al più presto” w przekładzie it.
