# ASO nowych języków: nazwa, podtytuł, słowa kluczowe, opis (sesja AF, 2026-11-09)

Rola 10 (moduł widoczności w sklepie), tylko dokumenty i `store/`. Zadanie: D-377 (A). Decyzja: D-382 (A, przyjęta wg D-359, do weta). Nazwa: D-378 (W).

**Wyjątek nazwany (prompt roli):** dodanie repo `lkarwowski494/prompts` odrzucił klasyfikator trybu auto (tak samo jak w sesji AC, D-376), więc `assemble.mjs 10-prawo-sklep` nie został uruchomiony. Tańsza kontrola zastępcza: metoda z Treningu `docs/45-widocznosc-w-sklepie.md` (frazy z wyników wyszukiwania w kraju, podpowiedzi, kontrola limitów; 2e4b0f8, odczyt 2026-11-09) i reguły Apple z `docs/wydanie/sklep.md` §1.

## Pliki

| Plik | Co |
|---|---|
| `store/app-store-metadata.json` | **fala 1, gotowa do zapisu w ASC:** ja, zh-Hant, pt-BR, fr-FR; alias fr-CA = fr-FR |
| `docs/sklep/aso/metadane-fala2.json` | **fala 2:** de-DE, es-ES, ko, it, vi; alias es-MX = es-ES. Leży poza `store/`, bo `scripts/asc/metadane.mjs:29-31` (`LOCALE_MAP`) nie zna tych kodów i walidacja zablokowałaby **cały** zapis (sprawdzone w node: 6 błędów „brak mapowania”, `dane/walidacja-asc-2026-11-09.txt`) |
| `docs/sklep/aso/zbuduj-metadane.py` | jedno źródło tekstów obu fal (uruchomienie dopisuje falę 1 do `store/` i przepisuje plik fali 2) |
| `docs/wydanie/dowody/sprawdz-metadane-aso.py`, `metadane-aso-2026-11-09.txt` | kontrola: **kod 0**, 0 błędów, 15 lokalizacji (z pl i en-US) |
| `docs/sklep/aso/dane/` | surowe dane (odczyt 2026-11-09 ok. 21:40–22:20 UTC, 0 USD): `wyszukiwanie-*.json` (iTunes Search API, 13 storefrontów, 43 frazy, top 25), `podtytuly-*.json` (apps.apple.com, do 12 aplikacji na kraj; gdy aplikacja nie ma podtytułu, strona pokazuje w tym miejscu kategorię, np. „Bildung”, „Cartes”), `podpowiedzi-*.json` (nieoficjalny punkt podpowiedzi App Store, sygnał ruchu, nie liczba wyszukań), `narzedzia/` (skrypty zbierające). Dane konkurencji w repo jak `docs/brd/dane/konkurencja-2026-11-03.json` (odstępstwo od Treningu, który trzyma je poza repo: wzór tego projektu); w metadanych sklepu żadnych cudzych nazw (kontrola kod 0) |
| `docs/sklep/search-ads-kroki.md` | Apple Ads: kroki właściciela i odpowiedzi z przeczytanych stron Apple |

Kody lokalizacji ASC: ja, zh-Hant, pt-BR, fr-FR, fr-CA, de-DE, es-ES, es-MX, ko, it, vi. Źródło: developer.apple.com/documentation/appstoreconnectapi/managing-metadata-in-your-app-by-using-locale-shortcodes (JSON strony, odczyt 2026-11-09: „Japanese” ja, „Chinese (Traditional)” zh-Hant, „Portuguese (Brazil)” pt-BR, „French” fr-FR, „French (Canada)” fr-CA, „German” de-DE, „Spanish (Spain)” es-ES, „Spanish (Mexico)” es-MX, „Korean” ko, „Italian” it, „Vietnamese” vi).

## Nazwy (D-378: „PokerGym” + lokalny dopisek; zastępuje „Poker School” z D-369)

Decyzja właściciela D-378 (21:50 UTC) zmieniła markę na **PokerGym**: „PokerGym: GTO Strategy Trainer” w en, „PokerGym” pod ikoną we wszystkich językach (zmiana w kodzie należy do sesji kodu, lista niżej). Wzór Treningu: `store/app-store-names.json` ma w 33 lokalizacjach „Training: <fraza lokalna>”, np. ja „Training: 筋トレ記録とタイマー” (2e4b0f8, odczyt 2026-11-09).

Najważniejszy skutek dla słów kluczowych: „PokerGym” to jedno słowo, więc „poker” **nie jest już osobnym słowem w nazwie**. Czy App Store dzieli „PokerGym” na „poker” i „gym”, Apple nie opisuje (otwarte, P-AF4). Dlatego słowo poker (w lokalnej pisowni) stoi w dopisku, w podtytule albo w słowach kluczowych każdego języka. Kryteria dopisku: (1) fraza wyszukiwania z podpowiedzi albo z nazw top wyników w kraju; (2) praca aplikacji (nauka, nie gra); (3) całość ≤ 30 znaków; (4) bez cudzych nazw (np. „Learn Poker” to nazwa konkurenta, więc nie trafiła do podtytułu en).

| Lokalizacja | Nazwa | Znaki | Dowód frazy (dane/) |
|---|---|---|---|
| en-US (= GB, CA, AU) | PokerGym: GTO Strategy Trainer | 30 | D-378 (W); podpowiedzi US: „gto trainer”, „poker strategy”, „poker trainer” |
| pl | PokerGym: trener strategii GTO | 30 | D-378 (przykład koordynatora); storefront PL wyłączony |
| ja | PokerGym: ポーカー戦略を学ぶ | 19 | „ポーカー” w 8/8 nazw top wyników na „ポーカー 学習”; „ポーカー戦略学習” w nazwach; podpowiedź „ポーカー 初心者” |
| zh-Hant | PokerGym: 德州撲克教學 | 16 | podpowiedź „德州撲克教學” (TW); „德州撲克” w 9/10 nazw top wyników na „撲克 教學” |
| pt-BR | PokerGym: aprenda pôquer | 24 | „pôquer” w podpowiedziach i nazwach BR; „poker” w słowach kluczowych |
| fr-FR (= fr-CA) | PokerGym: cours de poker | 24 | podpowiedź FR „apprendre poker”; „apprendre” w podtytule, „stratégie” w słowach kluczowych |
| de-DE | PokerGym: Poker lernen | 22 | podpowiedzi DE: „poker lernen” (7 wariantów, najsilniejszy sygnał w danych) |
| es-ES (= es-MX) | PokerGym: aprende póker | 23 | podpowiedzi MX: „aprender poker”; „póker” w nazwach i podpowiedziach ES/MX; „poker” w słowach kluczowych |
| ko | PokerGym: 홀덤 포커 배우기 | 19 | podpowiedzi KR: „홀덤 gto”, „홀덤 icm”; fraza opisowa „홀덤 포커 배우기” w nazwach |
| it | PokerGym: impara il poker | 25 | „impara poker” w podtytułach top wyników IT; „strategia” w słowach kluczowych |
| vi | PokerGym: học poker | 19 | podpowiedź VN „học poker”. Sprzedaż w VN wyłączona (D-341), vi to język dodatkowy w US |

### Dostępność nazwy i znaki towarowe (D-378 pkt 3)

- App Store: iTunes Search API 2026-11-09 ok. 22:10 UTC, „pokergym” i „poker gym” × US, GB, DE, JP, limit 50, odstęp 5 s: **0 aplikacji z „gym” w nazwie** (US 43/45 wyników, GB 37/42, DE 0/1, JP 0/1; `dane/pokergym-2026-11-09.txt`). To sprawdzenie niepełne, bo wyszukiwarka zwraca do 50 wyników. Ostatecznie unikalność rozstrzyga App Store Connect przy zapisie nazwy.
- Znaki towarowe: **niesprawdzone (blokuje zapis nazwy w ASC wg D-378 pkt 3).** USPTO (tmsearch.uspto.gov: API odpowiada 405 na zapytanie bez przeglądarki), WIPO Global Brand Database (branddb.wipo.int: strona JS, 1,7 kB bez wyników) i EUIPO eSearch (pusta odpowiedź) nie dają się przeczytać z tego kontenera. Krok: przeglądarka (właściciel albo sesja z przeglądarką), wyszukać „pokergym” i „poker gym” w trzech bazach, zapisać adres, datę i listę znaków żywych w klasach 9, 41 i 28 (aplikacje, edukacja, gry) w `docs/sklep/aso/`. Przy żywym znaku w klasie 9 albo 41 wracamy do decyzji o nazwie.

### Miejsca z nazwą w kodzie (do zmiany przez sesję kodu, AG; tutaj bez edycji)

`git grep -il "poker school\|szkoła pokera"` (2026-11-09, po AE): `apps/mobile/app.json`; `apps/mobile/locales/systemowe/{en,fr,ja,pl,pt-BR,zh-Hant}.json` (nazwa pod ikoną); `apps/mobile/src/i18n/locales/{en,pl}.json`; `site/privacy.html`, `site/support.html`, `tools/strona/{polityka,wsparcie}.mjs`; `store/review-notes.md`, `store/review-notes.en.txt`, `store/produkty.json`, `store/asc-kontrola-oczekiwane.json`; `scripts/asc/{metadane,iap-localizations,kontrola-oczekiwane,zrzuty}.mjs` i `.github/workflows/asc-*.yml` (prawdopodobnie komentarze albo nazwa szukanej aplikacji; do sprawdzenia, bo `BUNDLE_ID` się nie zmienia); testy `tests/kontrole/k11-sklep.test.ts` (wyjątek „poker school” w filtrze konkurencji), `tests/narzedzia/{asc,strona}.test.mjs`, `packages/domena/test/{k13-,}przypomnienie*.test.ts`, `apps/mobile/src/features/ustawienia/__tests__/przypomnienie-08.test.ts`. Poza tą listą: `docs/` (historia, bez zmian).

## Podtytuł

Sens jak en „Practice decisions, no betting”: praca aplikacji plus brak gry o pieniądze (NFR-ZGOD-001/002, notatki dla recenzenta). Słowa podtytułu nie powtarzają się w słowach kluczowych (test K-11-c).

## Słowa kluczowe

Reguły (Apple, `sklep.md` §1, odczyt 2026-11-09): ≤ 100 B, przecinki bez spacji, bez słów z nazwy i podtytułu, bez nazw innych aplikacji i marek, bez liczby mnogiej obok pojedynczej. Od Treningu (`docs/45`) przejęta reguła „each greater than two characters”, także dla CJK, dlatego „勉強” i „撲克” jako osobne słowa odpadły.

Źródło fraz: terminy, które pojawiają się w nazwach i podpowiedziach danego kraju (holdem/ホールデム/텍사스홀덤, gto, preflop/プリフロップ/翻牌前/프리플랍, icm, trainer/トレーナー/트레이너, odds/オッズ/底池賠率, tournoi/torneio/turnier/トーナメント, „初心者”/„新手入門”/„iniciante”/„débutant”/„anfänger”/„principianti”). Nazwy terminów są zgodne z przeglądami przekładu (`docs/lokalizacja/przygotowane/terms-nazwy-*.yaml`: ja レンジ, プリフロップ; zh-Hant 翻牌前, 範圍; pt-BR/fr „range”, „preflop”). Nie użyto fraz o funkcjach, których aplikacja nie ma (kalkulator szans, solver, gra ze znajomymi, skaner).

**[OCENA]** Popularności fraz nie mamy: podpowiedzi to sygnał ruchu, nie liczba wyszukań. Poprawka będzie możliwa po premierze z Apple Ads (`docs/sklep/search-ads-kroki.md`).

### pl i en: nowe pod nazwę PokerGym (D-378)

- en-US: nazwa daje „gto”, „strategy”, „trainer”, więc te słowa wypadły ze słów kluczowych. Podtytuł „Study poker, no real money” niesie słowo „poker” (już nie w nazwie) i brak gry o pieniądze. Wersja „Learn poker, …” odpadła, bo to nazwa konkurenta (K-11-d). Słowa kluczowe: `texas,holdem,preflop,postflop,ranges,outs,odds,icm,tournament,course,lessons,quiz,learn,training` (96 B). „learn” i „training” pochodzą z podpowiedzi US („learn poker”, „poker training”). „study” wypadło jako powtórzenie z podtytułu.
- pl: nazwa „PokerGym: trener strategii GTO”, podtytuł „Nauka pokera bez gry o stawki”, słowa kluczowe bez „gto” i „trener” (są w nazwie), za to z „poker” i „decyzje”. Storefront PL jest wyłączony, więc to głównie podgląd dla właściciela.

## Opis i tekst promocyjny

Przekład opisu en-US/pl (D-309) zdanie po zdaniu: te same funkcje i liczby (8, 15, 1 z `KONFIGURACJA`), bez cen, marek, obietnicy wygranej i liczby języków. Świadome różnice:
- nazwy czterech stopni oceny pominięte („4段階で評価”), bo interfejs ja/zh-Hant/pt-BR/fr jest dopiero nakładany (sesja AE) i nazwy stopni nie są jeszcze ustalone; podanie ich teraz groziłoby niezgodnością z ekranem (2.3.1(a));
- stopka „<lokalnie> / Terms of Use: …” i „<lokalnie> / Privacy Policy: [PRIVACY URL]”, bo test K-11-f (`tests/kontrole/k11-sklep.test.ts:84`) wymaga dosłownie „Privacy Policy:” albo „Polityka prywatności:”. Wstawkę `[PRIVACY URL]` podmienia `scripts/asc/metadane.mjs` (`PRIVACY_PLACEHOLDERS`).

## Indeksowanie lokalizacji w storefroncie (pytanie z zadania)

Strona Apple „App Store localizations” (developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations, odczyt 2026-11-09) podaje dla storefrontów język domyślny i języki dodatkowe, m.in.:
- „USA United States English (US) Arabic, Chinese (Simplified), Chinese (Traditional), French, Korean, Portuguese (Brazil), Russian, Spanish (Mexico), Vietnamese”;
- „CAN Canada English (Canada) French (Canada)”; „JPN Japan Japanese English (US)”; „TWN Taiwan Chinese (Traditional) English (U.K.)”; „BRA Brazil Portuguese (Brazil) English (U.K.)”; „MEX Mexico Spanish (Mexico) English (U.K.)” (także Argentyna, Chile, Kolumbia, Peru: Spanish (Mexico)); „ESP Spain Spanish (Spain) Catalan, English (U.K.)”; „KOR Republic of Korea Korean English (U.K.)”; „VNM Vietnam English (U.K.) Vietnamese”.
- Zdanie o działaniu: „keep in mind the language shown to each customer could be impacted by factors like the App Store language for their location, their device’s language settings, languages you’ve added, and your primary language”.

Strona mówi tylko o **wyświetlanym** języku. O tym, czy słowa kluczowe języka dodatkowego (np. es-MX w US) **liczą się w wyszukiwaniu** storefrontu, Apple nie pisze. Pozostaje to otwartym pytaniem P-AF1, tak jak w Treningu (`docs/45-widocznosc-w-sklepie.md:27,83`, „[DO USTALENIA]”). Wniosek praktyczny bez tego założenia: es-MX ma wartość niezależnie od indeksowania, bo jest językiem **domyślnym** w Meksyku i większości Ameryki Łacińskiej.

## Otwarte

- P-AF1: indeksowanie słów kluczowych języka dodatkowego w storefroncie (wyżej). Brak źródła Apple. Rozstrzygnie pomiar po premierze (App Analytics, źródło „App Store Search” wg storefrontu).
- P-AF4: czy App Store dzieli „PokerGym” na „poker” + „gym” w wyszukiwaniu (brak źródła Apple); dlatego poker w każdym języku stoi osobno.
- Znaki towarowe „PokerGym” (USPTO, EUIPO, WIPO): niesprawdzone, blokuje zapis nazwy w ASC (D-378 pkt 3).
- P-AF2: przegląd językowy tekstów 9 języków w świeżym kontekście (rodzimy użytkownik albo subagent-tłumacz) przed zapisem w ASC. Teksty pisał jeden agent. Kontrola zastępcza: limity, zakazy, terminologia z przeglądów przekładu, kod 0.
- Nazwy stopni oceny w opisach po nałożeniu przekładu UI (AE): ewentualnie dopisać jak w pl/en.
- Fala 2 do `store/` po dopisaniu de-DE, es-ES, es-MX, ko, it, vi do `LOCALE_MAP` (sesja kodu, ścieżka `scripts/`). Zapis w ASC ma sens dopiero, gdy aplikacja ma ten język, inaczej opis obiecuje interfejs, którego nie ma.
- Zapis fali 1 w ASC: dopiero po wydaniu buildu z ja/zh-Hant/pt-BR/fr (ten sam powód). Wykonuje właściciel workflowem `asc-metadane` (zatwierdzenie `release`).
