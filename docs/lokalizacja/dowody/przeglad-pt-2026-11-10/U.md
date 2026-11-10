# Przegląd pt (pt-PT), grupa U: słownik UI, terms-def, etykiety m13/m12

Recenzent w świeżym kontekście, 2026-11-10. Pliki pt nieśledzone (drzewo robocze). Nic poza `U.md` i `poprawki-U.json` nie było edytowane.

## Zakres i liczba przeczytanych jednostek

| Plik | Źródło porównania | Przeczytane |
|---|---|---|
| `apps/mobile/src/i18n/locales/pt.json` (cały) | `pl.json` + `pl.kontekst.json` | 731 kluczy-liści (699 grup kluczy, w tym 16 grup liczby mnogiej _one/_many/_other); pl: 747 liści (_one/_few/_many/_other) |
| `content/pt/terms-def.yaml` (cały) | `content/terms.yaml`, pole `def` (pl nie ma osobnego `content/pl/terms-def.yaml`) | 162 definicje (162 w pl, brak brakujących i nadmiarowych) |
| `content/pt/lessons/m13-l1-raport.md` | `content/pl/lessons/m13-l1-raport.md` | etykiety stopni i cytaty napisów UI: linie 34–64, 90–97 (11 wystąpień) |
| `content/pt/lessons/m12-l1-wariancja.md` | pl, linia 140 | 1 zdanie (l. 140, „Ajuda”) |

Kontrole maszynowe (skrypt node na pt.json vs pl.json): ten sam zbiór kluczy (bez brakujących i nadmiarowych); każda grupa mnoga w pt ma dokładnie `_one/_many/_other`; zbiór parametrów `{{…}}` i kluczy `{{t:…}}` identyczny w każdym kluczu; brak cyfr w pt, których nie ma w pl. Forma formalna: brak „você/tu/teu”, brak kalk BR (tela, celular, arquivo, pôquer, equipe, configurações, usuário); gerundia tylko modalne („pagando apenas”, „jogando bem”), nie progresywne. Teksty płatności (cancelInfo: „Subscrições” = nazwa sekcji iOS pt-PT), usuwania danych, uprawnień (reminderHint/Denied) i ostrzeżeń (help.*) — sens zgodny, bez uwag.

## Znaleziska

| plik:linia | waga | problem | propozycja | pewność |
|---|---|---|---|---|
| pt.json:137, 461, 462, 476, 306 (`grade.zgodne`, `play.report.verdicts.compliant`, `compliant-exploit`, `play.report.good`, `advancement.gameExplain`) | ŚREDNIE | Stopień „Zgodna” w UI = „Alinhada”, a lekcja m13-l1 (która ten stopień objaśnia) nazywa go „Conforme” 6× (m13-l1-raport.md:36,45,55,64,90). Uczeń widzi w raporcie inną nazwę niż w lekcji. Pozostałe stopnie spójne: Aceitável, Imprecisão, Erro, Sem avaliação. | „Conforme” / „conformes” w 5 kluczach UI (nieodmienne co do rodzaju, naturalne w pt-PT) | wysoka |
| pt.json:458 (`play.report.rated`) | ŚREDNIE | Lekcja cytuje licznik raportu «Avaliadas X de Y decisões» (m13-l1:61, 97); UI: „{{rated}} de {{all}} decisões avaliadas” — inny szyk, cytat nie zgadza się z ekranem. | „Avaliadas {{rated}} de {{all}} decisões” (szyk jak pl „Oceniono X z Y decyzji”) | wysoka |
| pt.json:544 (`language.name`) | ŚREDNIE | „Português” — na liście języków obok „Português (Brasil)” niejednoznaczne. Wymagane brzmienie z zadania nie jest spełnione. | „Português (Portugal)” | wysoka |
| pt.json:572 (`table.stateAfter`) | ŚREDNIE | Pigułka 72 pt, kontekst: najwyżej ok. 10 znaków; „depois de si” = 12. | „a seguir” (8) | średnia |
| pt.json:504, 505, 793, 842, 851, 852, 856, 858, 859, 862–864, 874, 876, 877, 880, 881, 885, 886 (22 klucze `drill.texture.*`, `drill.drawCall.drawFlush`, `play.report.detail.nuts*`) | ŚREDNIE | Termin draw: UI „draw / draws / draw de flush / draw de sequência”, a lekcje pt i terms-def — „projeto” ({{t:draw\|projeto(s)}} ok. 155×, {{t:flush-draw\|projeto…}} 41×, wobec „draw” 41×). Do tego `nutsYes` ma goły `{{t:draw}}`, który bez `content/pt/terms-nazwy.yaml` da angielskie „draw”. | „projeto / projetos / projeto de flush / projeto de sequência”; `nutsYes`: `{{t:draw\|projeto}}` | wysoka |
| pt.json:731, 739, 740, 744, 745 (`drill.icm.*`) | ŚREDNIE | Termin prize pool: UI „prize pool”, lekcje 13× „bolsa de prémios” (0× „prize pool”), terms-def tournament-equity „bolsa de prémios”. | „da/na {{t:prize-pool\|bolsa de prémios}}” | wysoka |
| terms-def.yaml:154, 156 (nit, tag) | ŚREDNIE | Tight = „fechado”; w lekcjach pt 42× „apertado”, UI `play.styles`/`play.tables` „Apertado”. „fechado” występuje tylko w tych 2 definicjach (+1 nie-terminowe w exams). | „muito apertado”, „Estilo apertado e agressivo” | wysoka |
| terms-def.yaml:110 (alpha) | ŚREDNIE | pl „wyszedł na zero” (break-even) → „fique a zero”; w pt-PT „ficar a zero” = potocznie „zostać z niczym”, myli w definicji rachunkowej. | „…para que um bluff com uma mão sem hipóteses não ganhe nem perca;” | średnia |
| terms-def.yaml:130 (m-ratio) | ŚREDNIE | „soma dos blinds e antes de uma mão” czyta się „blindy i przed rozdaniem” (antes = przed). | „soma dos blinds e dos antes de uma mão” | wysoka |
| terms-def.yaml:60 (combo) | NISKIE | „mostra quantas de determinada mão existem” — brak rzeczownika. | „quantas combinações de determinada mão” | wysoka |
| pt.json:181 (`session.resultPerfect`) | NISKIE | „Pleno.” samodzielnie nienaturalne. | „Tudo certo. Pode avançar.” | średnia |
| pt.json:579 (`strategy.yourChoiceShort`) | NISKIE | Mały podpis ok. 10 znaków; „a sua escolha” = 13. | np. „escolhida” (9) — do sprawdzenia na ekranie; nie w JSON | średnia |
| pt.json:423 (`play.waiting`) | NISKIE | „Os adversários estão a decidir…” 31 znaków wobec ok. 16. | „Adversários a decidir…”; nie w JSON | średnia |
| terms-def.yaml:4 (full-house) | NISKIE | „Entre dois full house” — l. mn. zapożyczenia zwykle z -s. | „dois full houses”; nie w JSON | średnia |
| pt.json `play.report.ratedHint` vs m13-l1:63, 94 | NISKIE | UI: «sem avaliação não significa «certa»», lekcja: «não significa «bem»». Sens ten sam, cytat inny. | ujednolicić przy redakcji lekcji (poza moim zakresem); nie w JSON | średnia |
| m12-l1-wariancja.md:140 | — | „consulte o ecrã «Ajuda»” = `help.title` / `settings.help` „Ajuda”. Spójne. | — | wysoka |

### Uwagi integracyjne (poza tekstem przekładu, do sesji koordynującej)

1. ŚREDNIE — liczba mnoga: `pt.json` nie jest jeszcze w `apps/mobile/src/i18n/slowniki.ts` (jest tylko `pt-BR`). Przy podpięciu reguły liczby mnogiej muszą być pt-PT: `Intl.PluralRules('pt').select(0)` = `one` (reguła brazylijska), `'pt-PT'` → `other`. Pod kodem „pt” powstałoby np. „Limite diário: 0 atividade gratuita para hoje.” Teksty w pt.json są poprawne dla pt-PT.
2. ŚREDNIE — brak `content/pt/terms-nazwy.yaml` (są dla pt-BR, es, fr…). Gołe znaczniki w pt.json (`drill.category.*` — 10 nazw układów, `{{t:pair}}` w `drill.paint.explanation`, `{{t:draw}}` w `nutsYes`) wyrenderują się z łańcucha zapasowego (nazwy angielskie: „straight”, „three of a kind”, „pair”), niespójnie z „sequência”, „trio”, „par” w lekcjach. Naprawa: plik terms-nazwy dla pt, a nie formy w pt.json.
3. Do decyzji terminologicznej (bez poprawki w JSON): flush. UI i terms-def mówią „flush” (nuts, outs, draw, monotone, blocker), a lekcje mają {{t:flush\|cor}} 59× wobec {{t:flush\|flush}} 8× i {{t:flush-draw\|projeto de cor}} 36× wobec „projeto de flush” 5× i „draw de flush” 11×. W moich plikach jest spójnie „flush”. Po wyborze jednej nazwy trzeba poprawić stronę przegraną (jeśli „cor”: terms-def ok. 7 definicji + UI 4 klucze `{{t:flush|flush}}` + flush-draw).

## Terminologia (moje pliki: pt.json + terms-def.yaml; lekcje pt dla porównania)

| termin | formy w moich plikach (liczby, formy znaczników) | lekcje pt | zalecana |
|---|---|---|---|
| fold | desistir/desiste/desistiu/desisto/desistiram (19) | desistir/desiste/desisto… | desistir ✓ |
| call | pagar/paga/pago (7), rzeczownik „call” (8, `drill.icm.*`, `drill.drawCall.verdict*`, `drill.potOdds.*`) | pagar/paga/pagamento (86) | pagar; rzeczownik „call” dopuszczalny, NISKIE: rozważyć „pagamento” |
| raise | aumenta/aumentam/aumento/aumentos (8) | aumento/aumenta/aumentar | aumentar ✓ |
| bet | aposta (14) | aposta/apostas | aposta ✓ |
| check | passa/passo/passar/passou/passado (6) | passar (+ „faz check” 14) | passar ✓ |
| pot | pote (12) | pote | pote ✓ |
| board | mesa (3; def. board objaśnia) | mesa 46, board 9 | mesa ✓ |
| range | range (4) | range/ranges | range ✓ |
| outs | outs (1 znacznik, `drill.drawCall.outs` out/outs) | outs | outs ✓ |
| big blind | big blind (terms-def), bb w liczbach | big blind | big blind ✓ |
| straight | sequência (16) | sequência (90) | sequência ✓ |
| flush | flush (4 UI, ok. 7 def) | cor 59 / flush 8 | do decyzji (uwaga 3) |
| draw | draw/draws (UI 23) vs projeto (terms-def 9) | projeto ok. 155 / draw 41 | projeto (poprawki) |
| flush draw | draw de flush (UI 7) / projeto de flush (terms-def) | projeto de cor 36 / projeto de flush 5 / draw de flush 11 | projeto de flush (lub „de cor” po decyzji flush) |
| straight draw | draw de sequência (UI 12) / projeto de sequência (terms-def) | projeto de sequência 4 / draw de sequência 6 | projeto de sequência |
| kicker | kicker | kicker | kicker ✓ |
| tight | apertado (UI 4) / fechado (terms-def 2) | apertado 42 | apertado (poprawki) |
| prize pool | prize pool (UI 5) | bolsa de prémios 13 | bolsa de prémios (poprawki) |
| stopień „Zgodna” | Alinhada (UI 5) | Conforme 6 | Conforme (poprawki) |
| three of a kind | trio (UI `categoryAcc`, def. full-house/set) | trio | trio ✓ |

## Podsumowanie wag

| KRYT | WYS | ŚR | NISKIE |
|---|---|---|---|
| 0 | 0 | 9 znalezisk tekstowych (36 poprawek w JSON) + 2 uwagi integracyjne | 6 (2 poprawki w JSON) |

`poprawki-U.json`: 38 wpisów (36 ŚREDNIE, 2 NISKIE). Sprawdzone skryptem node: JSON poprawny, każdy `stary` występuje w pliku `cel` dokładnie raz (38/38). Po nałożeniu wszystkich poprawek `pt.json` nadal parsuje się jako JSON, a `terms-def.yaml` jako YAML. Zbiór parametrów i kluczy `{{t:…}}` w każdym wpisie bez zmian.
