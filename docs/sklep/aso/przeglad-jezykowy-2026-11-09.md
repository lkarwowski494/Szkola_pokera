# Przegląd językowy metadanych App Store, 9 języków (2026-11-09)

Wykonanie D-383 (P-AF2, wariant A). Przegląd zrobił subagent-tłumacz w świeżym kontekście. Kontekst decyzji: D-377, D-378, D-382, D-383, D-384 (`docs/decyzje.md`).

## Metoda

1. **Zakres.** Fala 1 w `store/app-store-metadata.json` (ja, zh-Hant, pt-BR, fr-FR i alias fr-CA) tylko czytana. Fala 2 w `docs/sklep/aso/metadane-fala2.json` (de-DE, es-ES i alias es-MX, ko, it, vi). Pola: name, subtitle, keywords, promotionalText, description. Innych pól w plikach nie ma.
2. **Źródło tekstów.** Obie fale generuje `docs/sklep/aso/zbuduj-metadane.py` (sprawdzone: słowniki `L` i `F2` są identyczne z oboma plikami JSON). Dlatego poprawki fali 2 weszły do generatora, a plik fali 2 został wygenerowany od nowa. Generator ma nową flagę `--tylko-fala2`, która nie dotyka `store/`. Uruchomienie: `python3 -I docs/sklep/aso/zbuduj-metadane.py --tylko-fala2`. Po uruchomieniu `git status` nie pokazuje zmian w `store/`. Teksty fali 1 w generatorze zostały bez zmian, więc generator nadal zgadza się z `store/`. Propozycje dla fali 1 nanosi sesja kodu: najpierw w generatorze, potem przez uruchomienie bez flagi.
3. **Odniesienie.** Wersje en-US i pl w `store/`. Każde zdanie porównane z en pod względem sensu: te same funkcje, liczby 8 i 15, model dostępu i brak gry na pieniądze.
4. **Kryteria.** Poprawność i naturalność dla rodzimego użytkownika, diakrytyki (vi), rejestr i terminologia pokerowa danego rynku. Do tego: brak obietnic wygranej i hazardu (wytyczne Apple 5.3, nauka bez stawek), brak cudzych nazw, słowa kluczowe bez powtórzeń z nazwy i podtytułu, bez spacji, każde dłuższe niż 2 znaki. Stopka „<lokalnie> / Privacy Policy:” (K-11-f) i link EULA muszą zostać nienaruszone.
5. **Rejestr: wzór z Treningu** (D-191). `lkarwowski494/trening` `store/app-store-metadata.json` (main, odczyt przez raw.githubusercontent.com 2026-11-09): de-DE na „du” („Du erfasst Sätze…”), es-ES na „tú” („Registras series”), it na „tu” („Registri serie”), ko w formie 합니다 w zdaniach i z równoważnikami w punktach. PokerGym stosuje te same formy: de du, es tú, it tu, ko 합니다/równoważniki. Wynik: **zgodne**. Interfejs fr (`apps/mobile/src/i18n/locales/fr.json`) mówi „vous”, opis fr-FR też. Zgodne.
6. **Zgodność z ekranem.** Nazwy ekranu pomocy porównane z istniejącymi słownikami aplikacji (ja, zh-Hant, pt-BR, fr). Dla de, es, ko, it i vi słowników aplikacji jeszcze nie ma.
7. **Ograniczenie.** Przegląd zrobił model, a nie rodzimy użytkownik. Rzeczy, których nie da się rozstrzygnąć bez danych albo rodzimego użytkownika, są w sekcji [DO USTALENIA].

## Znaleziska

| Język | Pole | Problem | Propozycja | Waga | Status |
|---|---|---|---|---|---|
| de-DE | description | „Strategie auf jeder Straße”: w niemieckiej terminologii pokerowej „Straße” to układ strit (straight), a nie ulica licytacji. Zdanie czyta się jak „strategia na każdym stricie”, czyli błędne twierdzenie merytoryczne | „Strategie auf jeder Street” (w DE w użyciu jest angielskie „Street”, tak jak Flop/Turn/River w tym samym opisie) | WYS | naniesione |
| de-DE | description | „Einstufungstest … zeigt deine erste Lektion”: „zeigen” jest nienaturalne, test proponuje lekcję | „… schlägt dir deine erste Lektion vor” | NISKIE | naniesione |
| de-DE | description | „ein einmaliger lebenslanger Zugang”: „lebenslang” kojarzy się z wyrokiem, a zwrot jest nietypowy w sklepie | „ein dauerhafter Zugang per Einmalkauf” | NISKIE | naniesione |
| vi | description | „thứ tự các bộ bài” / „luật và thứ tự bộ bài”: „bộ bài” to talia kart, a nie układ ręki | „thứ hạng các tay bài” / „luật và thứ hạng tay bài” | ŚR | naniesione |
| vi | description | „vị trí và mở bài”: „mở bài” to po wietnamsku wstęp wypracowania, a nie otwarcie licytacji | „vị trí và mở cược” | ŚR | naniesione |
| vi | description | „Câu trả lời sai sẽ quay lại”: wracają pytania, nie odpowiedzi (różnica sensu względem en „Questions you missed”) | „Câu hỏi bạn trả lời sai sẽ quay lại …” | NISKIE | naniesione |
| vi | description | „tô range bài”: brakuje „tay” (range rąk) | „tô range tay bài trên lưới” | NISKIE | naniesione |
| vi | description | „mở khóa trọn đời thanh toán một lần”: brak spójnika, składnia urwana | „mở khóa trọn đời với một lần thanh toán” | NISKIE | naniesione |
| vi | keywords | wszystkie słowa angielskie; brak frazy wietnamskiej poza nazwą („học poker”) | dopisane „chiến,thuật” (chiến thuật = strategia; dwa słowa osobno, bo kontrola nie dopuszcza spacji; 96 B) | ŚR | naniesione |
| vi | subtitle | „Tập quyết định” jest poprawne, ale naturalniej brzmi „Tập ra quyết định”. Wersja „Tập ra quyết định, không cá cược” ma 32 zn. i przekracza limit, a „…, không cược” (29 zn.) jest mniej naturalna niż „không cá cược” | zostawić; ewentualnie „Tập ra quyết định, không cược” po opinii rodzimego użytkownika | NISKIE | propozycja |
| ko | promotionalText | „실제 돈 게임, 계정, 광고가 없습니다”: „계정이 없습니다” znaczy „nie ma konta” (dziwnie), a en mówi „no account” w sensie „bez zakładania konta”; do tego proste apostrofy ' zamiast ‘ ’ (wzór Treningu ko) | „모든 결정에 평가와 ‘왜’에 대한 해설이 있습니다. 실제 돈 게임과 광고가 없고, 계정 없이 사용합니다.” | ŚR | naniesione |
| ko | description | „선택 사항인 매일 알림”: szyk nienaturalny w punkcie listy | „매일 알림(선택 사항)” | NISKIE | naniesione |
| ko | description | „모든 답 뒤에 숫자로 된 해설”: „뒤에” jest dosłowne | „모든 답에 숫자를 곁들인 해설” | NISKIE | naniesione |
| ko | description | „'도움말'”: proste apostrofy | „‘도움말’” | NISKIE | naniesione |
| it | keywords | „allenatore” to trener-człowiek; użytkownik szuka raczej „allenamento poker” (w Treningu it „allenamento” jest w nazwie) | „allenamento” (96 B) | NISKIE | naniesione |
| es-ES / es-MX | wszystkie | brak błędów; forma „tú”, terminologia (calle, rango, ranking de manos, fichas), „Cuenta de Apple” i neutralne „teléfono” pasują do ES i MX | — | — | — |
| zh-Hant | description | „「說明」畫面”: w aplikacji ekran nazywa się „協助” (`zh-Hant.json` `help.title`). Opis niezgodny z ekranem (2.3.1) | „「協助」畫面提供賭博問題的求助管道” | ŚR | propozycja — do naniesienia w store/ przez sesję kodu |
| zh-Hant | description | nagłówek „負責任地遊戲” brzmi jak kalka; na rynku TW w użyciu jest „理性遊戲” | „理性遊戲” | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| zh-Hant | subtitle | „不涉賭注” jest zrozumiałe, ale skrótowe; spójniej z ekranem powitalnym („不涉及真錢遊戲”) byłoby „不涉真錢” | opcjonalnie „每個決策都有評分與解說，不涉真錢” (16 zn.) | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| ja | subtitle | „判断ごとに評価と解説・賭けなし”: kropka środkowa „・” łączy trzy człony jak wyliczenie (評価, 解説, 賭けなし) | „判断ごとに評価と解説、賭けなし” | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| ja | promotionalText | „ルールから戦略まで、ポーカーを基礎から学べます”: podwójne „から” | „ポーカーを基礎のルールから戦略まで学べます。” | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| fr-FR / fr-CA | keywords | „entraîneur” to trener-człowiek; fraza wyszukiwania to „entraînement poker” (nagłówek opisu też „ENTRAÎNEMENT”) | „entraînement” (94 B) | ŚR | propozycja — do naniesienia w store/ przez sesję kodu |
| fr-FR / fr-CA | description | nagłówek „JOUER RESPONSABLE”: w użyciu jest utrwalone „JEU RESPONSABLE” | „JEU RESPONSABLE” | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| fr-FR / fr-CA | description | typografia: przed „:” i „;” zwykła spacja; aplikacja (`fr.json`) używa twardej spacji U+00A0 | zamienić „ :” i „ ;” na U+00A0 (nazwa „PokerGym:” bez spacji zostaje, jak „Training: journal de muscu” w Treningu) | NISKIE | propozycja — do naniesienia w store/ przez sesję kodu |
| pt-BR | wszystkie | brak błędów. „jogo a dinheiro” jest bliższe pt-PT, ale ten sam zwrot stoi w aplikacji (`pt-BR.json` `welcome.noMoney`), więc spójność wygrywa; „Conta Apple”, „celular” i „pôquer/poker” są poprawne | — | — | — |

Wytyczne Apple 5.3 i hazard: we wszystkich 9 językach brak obietnicy wygranej i zarobku. Każdy język ma zdanie „bez gry na prawdziwe pieniądze” w promo i w opisie, a sekcja odpowiedzialnej gry odsyła do pomocy. Cudzych nazw nie ma; „trainer” i „gto” to słowa ogólne. Stopki EULA i „Privacy Policy:” są nienaruszone, co potwierdza kontrola K-11-f w skrypcie.

## Podsumowanie

**Razem 23 znaleziska** (es i pt-BR bez znalezisk):

- według wagi: KRYT 0, WYS 1, ŚR 6, NISKIE 16;
- według języka: de 3, vi 7, ko 4, it 1, es 0, zh-Hant 3, ja 2, fr 3, pt-BR 0;
- fala 2: 15 znalezisk, z czego **14 naniesionych** i 1 propozycja (podtytuł vi);
- fala 1: 8 propozycji do naniesienia przez sesję kodu (generator, potem `store/`). Żadna nie blokuje wydania; największa to ŚR zh-Hant „說明” → „協助”.

## Ocena nazw „PokerGym: …”

| Lokalizacja | Nazwa | Ocena |
|---|---|---|
| ja | PokerGym: ポーカー戦略を学ぶ | naturalna; zawiera „ポーカー” i „戦略” z fraz wyszukiwania |
| zh-Hant | PokerGym: 德州撲克教學 | naturalna; dokładna podpowiedź TW „德州撲克教學” |
| pt-BR | PokerGym: aprenda pôquer | naturalna, tryb rozkazujący typowy dla sklepu BR; „pôquer” w nazwie, „poker” w słowach kluczowych (dobre pokrycie obu pisowni) |
| fr-FR = fr-CA | PokerGym: cours de poker | naturalna; „cours de poker” to fraza nauki; „apprendre” w podtytule |
| de-DE | PokerGym: Poker lernen | naturalna, najsilniejsza fraza DE („poker lernen”) |
| es-ES = es-MX | PokerGym: aprende póker | naturalna w ES i MX; fraza „aprender poker” w odmianie |
| ko | PokerGym: 홀덤 포커 배우기 | naturalna; „홀덤” to główne słowo wyszukiwania w KR |
| it | PokerGym: impara il poker | naturalna; „impara poker” z podtytułów top wyników |
| vi | PokerGym: học poker | naturalna; dokładna podpowiedź VN „học poker” |

Wszystkie dopiski są naturalne i zawierają frazę wyszukiwania z słowem poker w lokalnej pisowni. Zmian w nazwach nie proponuję.

## [DO USTALENIA]

- **es „poker” w słowach kluczowych przy „póker” w nazwie.** Jeśli App Store ignoruje akcenty, „poker” to 6 zmarnowanych bajtów; jeśli nie, to słowo jest kluczowe, bo użytkownicy piszą bez akcentu. Zostawione. Brak źródła Apple; sprawdzi się po premierze w Apple Ads.
- **zh-Hant i ko: złożenia z wyrazem z nazwy** („撲克策略”, „撲克訓練”, „텍사스홀덤”, „홀덤공부”). Złożenia są potrzebne, bo słowa 2-znakowe („策略”, „訓練”) odpadają wg reguły „> 2 znaki” przejętej z Treningu. Czy ta reguła dotyczy CJK w samym App Store, Apple nie opisuje.
- **vi: słowa kluczowe jako pojedyncze sylaby** („chiến,thuật”). Trening ma w vi frazy ze spacją („thể hình”), a kontrola `sprawdz-metadane-aso.py` spacji nie dopuszcza. Czy App Store łączy „chiến”+„thuật” w frazę, Apple nie opisuje. Do decyzji: dopuścić spacje wewnątrz słowa kluczowego w kontroli (jak w Treningu) i wpisać „chiến thuật”.
- **vi podtytuł** (wyżej, NISKIE): „Tập quyết định” czy „Tập ra quyết định, không cược”. Do rozstrzygnięcia przez rodzimego użytkownika.
- **Rodzimy użytkownik** (D-383 wariant B) nadal mile widziany przed upublicznieniem, zwłaszcza dla vi i ko, gdzie znalezisk było najwięcej.

## Kontrola

`python3 docs/wydanie/dowody/sprawdz-metadane-aso.py` z katalogu repo, 2026-11-09, po naniesieniu poprawek. Skrypt domyślnie sprawdza **obie fale**: `store/app-store-metadata.json` i `docs/sklep/aso/metadane-fala2.json`. Osobny skrypt dla fali 2 nie był potrzebny.

**Kod wyjścia: 0.** Ostatnie wiersze:

```
it keywords 96 B, 14 słów, min 3 zn., z nazwy/podtytułu: [] OK
it promotionalText 157/170 OK
it description 2200/4000 OK
vi name 19/30 OK
vi subtitle 29/30 OK
vi keywords 96 B, 15 słów, min 3 zn., z nazwy/podtytułu: [] OK
vi promotionalText 153/170 OK
vi description 2123/4000 OK
błędów: 0
```

Limity fali 2 po zmianach (name/subtitle/keywords B/promo/description):

- de-DE: 22/30/99/138/2257
- es-ES: 23/30/100/144/2216
- ko: 19/18/91/78/1055
- it: 25/28/96/157/2200
- vi: 19/29/96/153/2123
