# it-U — it (włoski) — przegląd pełny 2026-11-10
## Pokrycie
| Jednostka (plik przekładu) | Przeczytana w całości (tak/nie + zakres linii) |
|---|---|
| apps/mobile/src/i18n/locales/it.json (↔ pl.json 1–935; kontekst pl.kontekst.json i en.json punktowo) | tak, 1–919; dodatkowo kontrola mechaniczna: komplet kluczy, parametry `{{…}}`, klucze `{{t:…}}`, formy `_one/_many/_other` |
| content/it/areas.yaml | tak, 1–19 (identyczny ze źródłem, brak pól tekstowych) |
| content/it/modules.yaml | tak, 1–14 |
| content/it/ranges/spots.yaml (↔ content/ranges/spots.yaml 1–269) | tak, 1–269; kontrola mechaniczna znaczników i liczb „Nbb” linia po linii |
| content/it/helplines.yaml (TREŚĆ KRYTYCZNA) | tak, 1–39 |
| docs/sklep/aso/metadane-fala2.json, lokalizacja `it` (↔ pl i en-US w store/app-store-metadata.json) | tak, wszystkie 5 pól; limity: nazwa 25/30, podtytuł 28/30, słowa kluczowe 96/100, tekst promocyjny 157/170, opis 2210/4000 |
| store/iap-localizations.json | przeczytany; brak wpisów `it` (tylko pl, en) — nic do sprawdzenia |

## Znaleziska
| Nr | Waga | plik:linia | Było | Ma być | Powód (z odwołaniem do pl plik:linia) |
|---|---|---|---|---|---|
| it-U-01 | ŚR | apps/mobile/src/i18n/locales/it.json:859 | „così distanti che nessuna coppia rientra in cinque consecutivi” | „così distanti che non ce ne sono due entro cinque consecutivi” | pl.json:875 „żadne dwie nie mieszczą się w pięciu kolejnych” (dwie rangi). „coppia” to w aplikacji nazwa układu (para, terms-nazwy `pair`), zdanie czyta się jak „żadna para”. |
| it-U-02 | ŚR | apps/mobile/src/i18n/locales/it.json:877 | „Qui nessuna coppia di carte del giocatore dà neanche un” | „Qui nessuna combinazione di due carte del giocatore dà neanche un” | pl.json:893 „żadne dwie karty gracza”. „coppia di carte del giocatore” = para na ręce; sens zawężony do par. |
| it-U-03 | NISKIE | apps/mobile/src/i18n/locales/it.json:487 | „Carte di ripasso:” | „Schede di ripasso:” | pl.json:497 „Karty powtórek” (fiszki). W aplikacji pokerowej „carte” to karty do gry; fiszki to „schede”. |
| it-U-04 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „dalla scala dei punti” | „dalla classifica delle combinazioni” | pl „od zasad i układów kart”. W aplikacji układy to „combinazioni” (content/it/modules.yaml:1; it.json:697), a „scala” = strit. |
| it-U-05 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „regole e punti” | „regole e combinazioni” | pl „zasady i układy”; tytuł modułu w aplikacji „Regole e combinazioni” (content/it/modules.yaml:1). |
| it-U-06 | NISKIE | docs/sklep/aso/metadane-fala2.json:33 (it.description) | „un indice di avanzamento” | „un indice di livello” | pl „wskaźnik zaawansowania”; w aplikacji „Indice di livello” (it.json:285). |

## Źródło (błędy w pl, bez poprawki)
Brak.

## Do sprawdzenia (pewność ≤ 80%)
- it.json:308 `advancement.historyHint` „Una barra per ogni giorno… Ultimo: {{last}}.” — jeśli „Ostatni” (pl.json:317) odnosi się do słupka, po włosku powinno być „Ultima” (barra, r.ż.); jeśli do dnia/wyniku — zostaje. Kontekst klucza tego nie rozstrzyga.
- metadane-fala2.json it.subtitle „Decidi meglio, senza puntate” i opis „niente puntate”: „puntata” to w aplikacji termin „bet” (przycisk „Puntata {{bb}}bb” w trybie gry), więc „bez zakładów” może być czytane jako niezgodne z ekranem; pl/en mówią o stawkach / prawdziwych pieniądzach („bez gry o stawki”, „no real money”). Wariant mieszczący się w limicie: „Decidi meglio senza soldi veri” (30). „Decidi meglio” to też lekka obietnica wyniku, której pl („Nauka pokera”) nie ma. Decyzja ASO, nie błąd przekładu.
- metadane-fala2.json it.description „Decisioni valutate su quattro livelli” bez nazw stopni (pl/en je wymieniają). Skrót jest świadomy we wszystkich lokalizacjach fali 2; skoro interfejs it ma już nazwy (it.json:137–140), można dopisać „: conforme, accettabile, imprecisione, errore”.
- Opis sklepu: „outs, odds” wobec „out, probabilità” w aplikacji (modules.yaml:3) — dopuszczalne jako frazy wyszukiwania.
- it.json:669 „o contesa (il solver si discosta in essa dalle tabelle pubbliche)” — sens zgodny z pl.json:682, sformułowanie sztywne („controversa”, „su di essa”); styl.
- Rodzaj „3-bet”: terms-nazwy podaje r.ż., it.json:756 ma „i 3-bet” (r.m.); brak znacznika, więc bez konfliktu budowania — do ujednolicenia razem z lekcjami.

## Uwagi ogólne (≤ 5 zdań: jakość, powtarzające się wzorce)
Przekład interfejsu jest kompletny (wszystkie klucze pl, komplet form `_one/_many/_other`, parametry i klucze `{{t:…}}` zgodne), naturalny i spójny z terms-nazwy; „PokerGym” nieprzetłumaczone. Teksty zakupu (okresy 3 miesiące / rok, automatyczne odnowienie, anulowanie w ustawieniach konta Apple, dostęp do końca opłaconego okresu, zakup jednorazowy) są wierne. helplines.yaml: zdanie o lekarzu/specjaliście i numerze alarmowym pełne, nazwa organizacji i adres bez zmian, w pliku nie ma numerów telefonów ani godzin. spots.yaml i modules.yaml bez znalezisk; liczby i znaczniki identyczne. Jedyny powtarzający się wzorzec to użycie „coppia” w znaczeniu „dwie dowolne” oraz drobne rozbieżności nazw między opisem sklepu a aplikacją; w metadanych brak słów sugerujących hazard na pieniądze, limity Apple zachowane.
