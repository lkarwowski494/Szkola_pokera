# pt-BR-U — pt-BR — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `apps/mobile/src/i18n/locales/pt-BR.json` (źródło `pl.json` 1–936) | tak, 1–920; dodatkowo skrypt: komplet kluczy, parametry `{{…}}`, klucze `{{t:…}}`, znaki nowej linii, formy mnogie |
| `content/pt-BR/areas.yaml` | tak, 1–19 (brak pól tekstowych; identyczny ze źródłem) |
| `content/pt-BR/modules.yaml` | tak, 1–14 |
| `content/pt-BR/ranges/spots.yaml` (źródło `content/ranges/spots.yaml` 1–269) | tak, 1–269; skrypt: pola nietekstowe (hero, path, solver, uncertain, wartości groups) identyczne, 34 spoty |
| `content/pt-BR/helplines.yaml` (TREŚĆ KRYTYCZNA) | tak, 1–39 |
| `store/app-store-metadata.json`, lokalizacja `pt-BR` (linie 38–44) względem `pl` i `en-US` | tak; długości: nazwa 24/30, podtytuł 28/30, słowa kluczowe 91/100, tekst promocyjny 131/170, opis 2166/4000 |
| `store/iap-localizations.json` | tak, 1–46: brak wpisów `pt-BR` (tylko pl, en) — nic do sprawdzenia |

Wynik kontroli słownika interfejsu: żadnego brakującego ani nadmiarowego klucza; parametry i klucze terminów zgodne we wszystkich wpisach; każda grupa liczby mnogiej ma `_one`, `_many`, `_other` (CLDR pt), formy gramatycznie poprawne; „PokerGym” nieprzetłumaczone; `purchase.*` wierne (3 miesiące, raz na rok, odnowienie automatyczne do anulowania, anulowanie w koncie Apple, dostęp do końca opłaconego okresu, zakup jednorazowy).

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| pt-BR-U-01 | ŚR | apps/mobile/src/i18n/locales/pt-BR.json:732 | `{{t:bubble\|Bubble}}` | `{{t:bubble\|Bolha}}` | Termin bubble = „bolha” (terms-nazwy.yaml:123); w treści pt-BR wyłącznie „Bolha/bolha” (10×). pl.json:745 |
| pt-BR-U-02 | ŚR | content/pt-BR/modules.yaml:5 | „Pré-flop diante de ação” | „Preflop diante de ação” | Termin preflop = „preflop” (terms-nazwy.yaml:36); w pt-BR.json:451 „Preflop”, w opisie sklepu „jogo preflop”. pl/modules.yaml:5 |
| pt-BR-U-03 | ŚR | content/pt-BR/modules.yaml:2 | „Blinds, ruas, ações” | „Blinds, streets, ações” | Termin street = „street” (terms-nazwy.yaml:34); opis sklepu: „em cada street”. pl/modules.yaml:2 |
| pt-BR-U-04 | ŚR | content/pt-BR/modules.yaml:10 | „tamanhos para três ruas” | „tamanhos para três streets” | Jak pt-BR-U-03. pl/modules.yaml:10 |
| pt-BR-U-05 | ŚR | store/app-store-metadata.json:43 | „• Decisões avaliadas em quatro níveis” | „• Decisões avaliadas em quatro níveis: alinhada, aceitável, imprecisão, erro” | Pominięte wyliczenie stopni; pl (linia opisu pl, ĆWICZENIA): „w czterech stopniach: zgodna, dopuszczalna, niedokładność, błąd”; en-US też je ma. Nazwy jak `grade.*` w pt-BR.json:137–140 |
| pt-BR-U-06 | NISKIE | apps/mobile/src/i18n/locales/pt-BR.json:308 | „Último: {{last}}.” | „Última: {{last}}.” | Odnosi się do „barra” (r. żeński); pl.json:317 „Ostatni” = słupek ({{last}} = dzień: wynik) |
| pt-BR-U-07 | NISKIE | apps/mobile/src/i18n/locales/pt-BR.json:82 | „nas configurações do celular” | „nos Ajustes do celular” | Ustawienia systemu iOS po pt-BR to „Ajustes”; tak już w purchase.cancelInfo (pt-BR.json:57). pl.json:83 |
| pt-BR-U-08 | NISKIE | store/app-store-metadata.json:43 (3 miejsca) | „prova de módulo” / „tentativa de prova” | „exame do módulo” / „tentativa de exame” | W aplikacji „Exame do módulo” (pt-BR.json:203), „novas tentativas de exame” (pt-BR.json:45); sklep nazywa to inaczej |
| pt-BR-U-09 | NISKIE | store/app-store-metadata.json:43 | „um índice de evolução” | „um índice de nível” | W aplikacji „Índice de nível” (pt-BR.json:285) |
| pt-BR-U-10 | NISKIE | store/app-store-metadata.json:43 (3 miejsca) | „Aulas” / „primeira aula” / „As aulas” | „Lições” / „primeira lição” / „As lições” | W aplikacji konsekwentnie „lição/lições” (pt-BR.json:10–21); słowo kluczowe „aulas” zostaje |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- store/app-store-metadata.json:40 i :43 — podtytuł „Treine decisões, sem apostas” oraz „não há apostas” w opisie: pl „bez gry o stawki” / „nie ma stawek”, en „no real money”. W aplikacji „aposta” to termin bet (zakład w rozdaniu) i w trybie gry użytkownik „aposta”, więc „sem apostas” może być odebrane jako sprzeczne z zawartością; rozważyć „sem dinheiro real” (podtytuł „Treine decisões, sem dinheiro real” = 30+ znaków, trzeba by skrócić). Bez poprawki.
- pt-BR.json:549 „Na mesa: {{list}}.” (miejsca przy stole) i :568–569 „Na {{t:board|mesa}}” (karty wspólne): to samo wyrażenie dla dwóch pojęć w etykietach VoiceOver; pl rozróżnia „Przy stole” / „Na stole” (kontekst klucza table.label wprost o tym mówi). Możliwe „À mesa: …” dla table.label albo „No board” dla kart wspólnych.
- pt-BR.json:346 „({{n}} tentativas)” dla prób Monte Carlo (naturalniej „simulações”); :352 „Controle:” dla „Kontrola” (naturalniej „Verificação”) — ekran diagnostyczny.
- pt-BR.json:503 i :738 „limite” jako „próg” (SPR, equity): „limite” jest też terminem stakes; czytelne z kontekstu, ewentualnie „mínimo”.
- content/pt-BR/helplines.yaml:16 „Se você identifica em você sinais…” — powtórzenie „você”; sens pełny i wierny, tylko styl („identifica em si”).

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład jest wierny i naturalny (brazylijski, konsekwentne „você”), bez błędów sensu, liczb ani znaczników; treść krytyczna (`helplines.yaml`, `help.*`) kompletna, nazwa organizacji i adres bez zmian. Teksty zakupu wierne. Jedyny powtarzający się wzorzec to drobne rozjazdy nazw: terminy względem `terms-nazwy.yaml` (Bubble, Pré-flop, ruas) oraz słownictwo opisu sklepu względem aplikacji (aula/lição, prova/exame, índice). W opisie sklepu pominięto wyliczenie czterech stopni oceny. Słowa kluczowe i teksty sklepu nie zawierają obietnic spoza źródła ani słów sugerujących grę na pieniądze (poza zanegowanym „apostas”, patrz „Do sprawdzenia”).
