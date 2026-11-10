# fr-U1: francuski (fr), słownik interfejsu, nazwy systemowe, metadane sklepu, areas/modules, nakładka spotów zakresów

Przegląd niezależny, 2026-11-10. Źródło: pl; en tylko pomocniczo. Terminologia: `content/fr/terms-nazwy.yaml`.

## Pokrycie

| plik | przeczytany w całości (tak / nie + powód) | liczba linii |
|---|---|---|
| `apps/mobile/src/i18n/locales/fr.json` (wobec `pl.json`, klucz po kluczu; `pl.kontekst.json` punktowo dla kluczy wątpliwych) | tak | 919 (pl: 935) |
| `apps/mobile/locales/systemowe/fr.json` (wobec `pl.json`) | tak | 4 |
| `store/app-store-metadata.json`, lokalizacja `fr-FR` (wobec `pl`, pomocniczo `en-US`) | tak | 53 (cały plik) |
| `store/iap-localizations.json` | tak (tylko sprawdzenie obecności fr) | 46 |
| `content/fr/areas.yaml` (wobec `content/pl/areas.yaml`) | tak | 19 |
| `content/fr/modules.yaml` (wobec `content/pl/modules.yaml`) | tak | 14 |
| `content/fr/ranges/spots.yaml` (wobec `content/ranges/spots.yaml`) | tak | 269 |

Kontrole mechaniczne (skrypt porównujący po kluczach):
- `fr.json`: zestaw kluczy bazowych identyczny z `pl.json` (brak brakujących i nadmiarowych). Wszystkie 14 kluczy z liczbą mnogą mają w fr dokładnie formy `_one`, `_many`, `_other`; `_one` brzmi poprawnie także dla 0 (fr: 0 i 1 → one), `_many` = `_other`.
- Parametry `{{…}}` i klucze znaczników `{{t:…}}`: w każdym kluczu ten sam zestaw co w pl (różnią się tylko formy po `|`; fr dodaje formę tam, gdzie pl ma znacznik bez formy, np. `{{t:icm}}` → `{{t:icm|ICM}}`, co jest poprawne). Brak zgubionych znaczników.
- Typografia: spacja nierozdzielająca przed `: ; ? !` i `%` oraz w « » konsekwentnie (161 linii, 0 zwykłych spacji przed znakiem podwójnym).
- `systemowe/fr.json`: identyczny z pl (`PokerGym`), bez uwag.
- `areas.yaml`: identyczny z pl (brak pól tekstowych), bez uwag.
- `spots.yaml`: poza polami `title`, `groups` (klucze-etykiety), `wrongSizes` struktura, ścieżki, ręce i liczby identyczne ze źródłem; klucz grupy w `wrongSizes` zgodny z kluczem w `groups` (kotwice działają). Znaczniki `{{n:…}}` (3) zachowane.
- Metadane sklepu `fr-FR`: name 24/30, subtitle 30/30, keywords 91/100, promotionalText 138/170, description 2293 znaków. Brak sugestii gry na pieniądze („sans mise”, „Pas de jeu d’argent”, „pas d’argent réel”); obietnice zgodne z pl (darmowe lekcje, limit jednej aktywności, subskrypcje, dostęp dożywotni, brak cen).
- `store/iap-localizations.json`: **wpisu fr brak, nieprzejrzane** (plik ma tylko pl i en).

## Znaleziska

| nr | waga | plik:linia | było | ma być | powód | pewność | JSON (tak/nie) |
|---|---|---|---|---|---|---|---|
| 1 | ŚR | `apps/mobile/src/i18n/locales/fr.json`:833 (drill.texture.label.wetness.wet) | `{{t:wet\|Humide}}` | `{{t:wet\|Wet}}` | terms-nazwy.yaml: wet = „wet”; treść kursu używa formy „wet” (19×), interfejs „humide” — dwie nazwy jednego pojęcia | wysoka | tak |
| 2 | ŚR | fr.json:840 (drill.texture.axis.wetness) | `{{t:dry\|Sec}} ou {{t:wet\|humide}}` | `{{t:dry\|Sec}} ou {{t:wet\|wet}}` | jw. | wysoka | tak |
| 3 | ŚR | fr.json:842 (drill.texture.scale) | `intermédiaire {{medium}}, {{t:wet\|humide}}` | `… {{t:wet\|wet}}` | jw. | wysoka | tak |
| 4 | ŚR | fr.json:864 (drill.texture.def.wetness.wet) | `un flop {{t:wet\|humide}} donne` | `un flop {{t:wet\|wet}} donne` | jw. | wysoka | tak |
| 5 | ŚR | fr.json:893 (drill.texture.prompt.wetness) | `intermédiaire ou {{t:wet\|humide}}` | `intermédiaire ou {{t:wet\|wet}}` | jw. | wysoka | tak |
| 6 | ŚR | fr.json:507 (play.report.detail.limp) | `Vous avez ouvert le coup en vous contentant de payer la blinde` | `Vous êtes entré le premier dans le coup en payant seulement la blinde` | pl: „Wszedłeś do rozdania jako pierwszy samym blindem (limp)”; „ouvert” koliduje z terminem open = ouverture (otwarcie przebiciem) — limp nie jest otwarciem w sensie kursu; „jako pierwszy” zgubione | średnia | tak |
| 7 | ŚR | `store/app-store-metadata.json`:50 (fr-FR description, ENTRAÎNEMENT) | `Décisions notées sur quatre niveaux` | `Décisions notées sur quatre niveaux : conforme, acceptable, imprécision, erreur` | pominięte wyliczenie stopni oceny obecne w pl i en-US; nazwy z interfejsu (grade.*) | wysoka | tak |
| 8 | NISKIE | store/app-store-metadata.json:50 (fr-FR description) | `indice de progression` | `indice de niveau` | w aplikacji „Indice de niveau” (advancement.title) | wysoka | tak |
| 9 | NISKIE | store/app-store-metadata.json:50 (fr-FR description, ACCÈS) | `une séance d’entraînement` | `une séance d’exercices` | w aplikacji „Séance d'exercices” (today.practice, start.title.practice) | średnia | tak |
| 10 | NISKIE | `content/fr/modules.yaml`:5 (m4 title) | `Préflop face` | `Preflop face` | pisownia terminu wg terms-nazwy.yaml i interfejsu („Preflop”, bez akcentu) | średnia | tak |
| 11 | ŚR | fr.json:806, 807 (drill.drawCall.verdictNearFlop / verdictNearTurn) wobec fr.json:503 (play.report.detail.implied) | `grâce aux implied odds` obok `{{t:implied-odds\|Cote implicite}}` | jedna nazwa (wg terms-nazwy: „cote implicite”) | w jednym pliku dwie nazwy tego samego pojęcia; w treści kursu też obie („implied odds” ok. 39×, „cote(s) implicite(s)” 12×) — wybór dla całego korpusu | średnia | nie |
| 12 | NISKIE | fr.json:389, 390, 401, 403, 766 (play.styles.*, play.tables.*, drill.playerType.fact.passive) | `Large passif`, `Larges agressifs`, `joueur large passif` | spójnie z treścią kursu | interfejs oddaje „luźny” jako „large”, treść kursu głównie „loose” (11× wobec 2× „large”) — wybór dla całego korpusu | średnia | nie |
| 13 | NISKIE | store/app-store-metadata.json:46 (fr-FR name) | `PokerGym: cours de poker` | `PokerGym : cours de poker` | typografia francuska: spacja (nierozdzielająca) przed dwukropkiem; 25/30 znaków; decyzja ASO, nie zmieniam sam | średnia | nie |
| 14 | NISKIE | store/app-store-metadata.json:50 (fr-FR description, COURS) | `permet de passer ce que vous savez déjà` | `permet de sauter ce que vous savez déjà` | „passer” obok „examen” jest dwuznaczne (zdawać / pominąć); pl: „żeby pominąć” | średnia | nie (patrz sekcja niżej) |

## Do sprawdzenia przez człowieka znającego język

- fr.json:437 (play.shown): `{{t:showdown|Abattage}}` — terms-nazwy podaje „showdown”, w treści kursu „showdown” ok. 78×, „abattage” ok. 24×. Oba poprawne po francusku; do ujednolicenia przy decyzji o całym korpusie.
- Znalezisko 14 (`passer` → `sauter`): rodzimy czytelnik zapewne zrozumie z kontekstu; do oceny, czy warto zmieniać.
- fr.json (drill.numeric.diffPp): „pp” oddane jako „pts” („Écart : {{diff}} pts”). Zrozumiałe, ale „pts” nie mówi wprost o punktach procentowych; alternatywa „pt de %” / „points de %”. Kontekst klucza dopuszcza skrót języka docelowego.
- fr.json:31 (welcome.noMoney): „Ici, vous apprenez sans jouer d'argent.” — gramatycznie poprawne; naturalniejsze mogłoby być „sans jouer pour de l'argent”. Sens (nauka bez gry na pieniądze) zachowany.
- fr.json (table.seatHero): „vous en {{pos}} avec {{hand}}” — przy skrótach pozycji (BTN, CO) brzmi telegraficznie („vous en BTN”); to etykieta dla czytnika ekranu, sens jasny.
- Metadane fr-FR, keywords: zestaw inny niż pl/en (m.in. „stratégie”, „gto”, „entraînement”; bez „outy/szanse/kurs”) — to świadoma lokalizacja ASO, nie błąd przekładu; nie oceniam doboru słów kluczowych.

## Uwagi do źródła pl

- `pl.json` drill.potOdds.mistakeBetOverPot: „Liczysz wobec wszystkiego, co możesz wygrać” — zdanie skrótowe (nie mówi wprost, że w mianowniku jest pula po zakładzie plus własna dopłata); fr oddaje je wiernie („Comparez-la à tout ce que vous pouvez gagner”). Bez poprawki.
- `store/iap-localizations.json`: brak wpisu fr (plik sam zaznacza: tylko języki wydane, pl i en). Teksty do niego pochodzą z kluczy purchase.* słownika, które w fr są poprawne i mieszczą się w limitach (nazwa ≤ 30, opis ≤ 45: „Paiement tous les 3 mois.”, „Paiement une fois par an.”, „Achat unique, sans paiement ultérieur.”).

## Ocena ogólna

Przekład interfejsu jest wierny, naturalny i typograficznie staranny; nie znalazłem żadnego błędu zmieniającego sens, liczbę, kierunek zalecenia ani zgubionego znacznika, a formy liczby mnogiej i parametry są kompletne. Tekst ekranu pomocy (treść krytyczna: help.*) oddaje źródło bez zmian sensu. Uwagi dotyczą głównie spójności terminów między interfejsem, treścią kursu i `terms-nazwy.yaml` (wet/humide, implied odds/cote implicite, large/loose) oraz jednego pominiętego szczegółu w opisie sklepu. Nakładka spotów i tytuły modułów są poprawne.
