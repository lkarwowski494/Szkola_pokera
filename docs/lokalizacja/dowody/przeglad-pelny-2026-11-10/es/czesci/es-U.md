# es-U — es (hiszpański) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| `apps/mobile/src/i18n/locales/es.json` (źródło `pl.json` 1–935; pomoc `en.json`, `pl.kontekst.json` wybrane klucze) | tak, 1–919; dodatkowo kontrola mechaniczna: komplet kluczy, parametry `{{…}}`, klucze `{{t:…}}`, formy liczby mnogiej |
| `content/es/areas.yaml` | tak, 1–19 (identyczny ze źródłem, brak pól tekstowych) |
| `content/es/modules.yaml` | tak, 1–14 |
| `content/es/ranges/spots.yaml` (źródło `content/ranges/spots.yaml` 1–269) | tak, 1–269 |
| `content/es/helplines.yaml` (TREŚĆ KRYTYCZNA; źródło `content/helplines.yaml` 1–39) | tak, 1–39 |
| `docs/sklep/aso/metadane-fala2.json`, lokalizacja `es-ES` (względem `pl` i `en-US` w `store/app-store-metadata.json`) | tak, wszystkie 5 pól |
| `store/iap-localizations.json` | tak, 1–46: brak wpisu `es` (tylko pl, en) — nic do sprawdzenia |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| es-U-01 | ŚR | content/es/modules.yaml:9 | `Valor, faroles, bloqueadores` | `Valor, faroles, blockers` | Termin `blocker` ma w `content/es/terms-nazwy.yaml:102` nazwę „blocker” („bloqueador” oznaczone tam jako forma bez źródła); pl `content/pl/modules.yaml:9` „blokery”. |
| es-U-02 | NISKIE | apps/mobile/src/i18n/locales/es.json:499 | `{{t:c-bet|c-bet}} pequeña` | `{{t:c-bet|c-bet}} pequeño` | Rodzaj terminu: w treści es „c-bet” jest męski (un c-bet ok. 70×, „c-bet pequeño” 25× wobec „pequeña” 3×); pl `pl.json:509` „mały c-bet”. |
| es-U-03 | NISKIE | apps/mobile/src/i18n/locales/es.json:758 | `{{t:value-bet|value bets}}, también más finas` | `…también más finos` | „value bet” w treści es jest męski („un value bet”, „del value bet”); zgoda przymiotnika. pl `pl.json:771` „także cieńszych”. |
| es-U-04 | NISKIE | docs/sklep/aso/metadane-fala2.json:19 (es-ES, description) | `un índice de progreso` | `un indicador de nivel` | Ta sama funkcja nazywa się w aplikacji „Indicador de nivel” (`es.json:285`, pl „Wskaźnik zaawansowania” `pl.json:294`; opis pl „wskaźnik zaawansowania”). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- `metadane-fala2.json` es-ES, description: „Decisiones calificadas en cuatro niveles” bez wyliczenia stopni; pl i en-US mają „…: zgodna, dopuszczalna, niedokładność, błąd” / „correct, acceptable, inaccuracy, mistake”. To samo skrócenie mają wszystkie pozostałe lokalizacje docelowe (de-DE, it, ko, vi, ja, zh-Hant, pt-BR, fr-FR), więc wygląda na decyzję generatora, nie błąd es. Gdyby dopisać: „: acorde, aceptable, imprecisión, error” (jak `grade.*` w es.json).
- `es.json:380` `play.tableSizeHint9`: „{{t:position|posiciones}} tempranas”; termin `early-position` ma w terms-nazwy nazwę „primeras posiciones”. Źródło pl nie używa tu znacznika `early-position` („wczesne {{t:position|pozycje}}”), więc formalnie zgodne; ewentualnie „tres primeras {{t:position|posiciones}} más”.
- „Button” (spots.yaml, 14×) wobec nazwy terminu `button` = „botón”: źródło pl pisze „Button” bez znacznika, a treść es używa obu („el Button” ok. 150×, „el botón” ok. 70×). Niespójność całego kursu, nie tej części.
- `es.json:75` `settings.resetBody`: „El progreso de las lecciones, las respuestas y los repasos se borrarán” — dodane „El progreso de” (pl `pl.json:76`: „Lekcje, odpowiedzi i powtórki zostaną usunięte”); doprecyzowanie bez zmiany skutku.
- `es.json:81` `settings.reminderHint`: „a las {{pora}}” jest niegramatyczne dla godziny 1:xx („a la 1:00”); zależy od tego, jakie pory podstawia aplikacja.
- Słowa kluczowe es-ES zawierają „poker” (słowo z nazwy aplikacji; en-US go nie ma, pl ma) — sprawa ASO, nie przekładu.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład bardzo dobry: komplet kluczy słownika, wszystkie parametry i klucze znaczników zgodne ze źródłem, formy `_one`/`_many`/`_other` (CLDR es) obecne i poprawne, marka „PokerGym” nieprzetłumaczona, teksty zakupu (okresy, odnowienie, anulowanie, zakup jednorazowy) wierne. `helplines.yaml` (treść krytyczna): oba zdania, nazwa organizacji, adresy, daty i struktura bez zmian, sens zachowany — bez znalezisk. Metadane es-ES mieszczą się w limitach Apple (nazwa 23/30, podtytuł 30/30, słowa kluczowe 100/100, tekst promocyjny 144/170), bez obietnic spoza źródła i bez słów sugerujących grę na pieniądze. Wariant europejski (vosotros: „tenéis”, „entre vosotros”) konsekwentny w słowniku; jedyny wzorzec do ujednolicenia to rodzaj gramatyczny i nazwy zapożyczeń (c-bet, value bet, blocker/bloqueador, Button/botón).
