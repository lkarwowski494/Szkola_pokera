# Weryfikacja g6: dostępność B, lokalizacja, dokumenty

Kod: f75acdff (kopia robocza gałęzi `claude/sesja-ir-audyt-m1`, poza `audit/` i `docs/decyzje/IR.md` identyczna z f75acdff: `git diff f75acdff --name-only` daje tylko te ścieżki). Weryfikator w świeżym kontekście, 2026-11-17. Bez napraw, bez zmian w plikach śledzonych. Pomocnicze skrypty (pomiar szerokości słowa z pliku fontu, sonda formatów) leżą w scratchpadzie sesji, a ich treść i wynik są w plikach `dowody/`.

Skala: P0 = KRYTYCZNE, P1 = WYSOKIE z kategorii blokujących (CLAUDE.md „Audyty i wydania” pkt 1), P2 = ŚREDNIE/NISKIE. Cztery z pięciu wejść mają opis „P1 (bez blokady)”. W skali projektu to wewnętrzna sprzeczność: znalezisko WYSOKIE spoza kategorii blokujących to w praktyce ŚREDNIE (P2). Poziomy po weryfikacji poniżej tę sprzeczność usuwają.

| ID | Wynik | Dowód | Poziom po weryfikacji | Blokuje 1012 | Blokuje App Store |
|---|---|---|---|---|---|
| 04-studio-projektowe-002 | potwierdzone | `apps/mobile/src/components/PasekStrategii.tsx:93` bez sprawdzenia ustawienia; `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-haptyka.txt` | P2 (ŚREDNIE) | nie | nie |
| 04-studio-projektowe-007 | potwierdzone | „Dopuszczalna” 85,7 pt w Inter wobec ok. 67 pt pola; `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-skala-dopuszczalna.txt` | P2 (ŚREDNIE/NISKIE) | nie | nie |
| 09-lokalizacja-001 | potwierdzone | `apps/mobile/src/app/session.tsx:601` i `apps/mobile/src/app/session.tsx:333`; `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-formaty.txt` | P2 (ŚREDNIE) | nie | nie |
| 09-lokalizacja-002 | potwierdzone | brak ponownego planowania po zmianie języka, wbrew ADR 0012 pkt 3; `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-przypomnienie.txt` | P2 (ŚREDNIE) | nie | nie |
| 01-odkrywanie-003 | potwierdzone (z dwiema korektami opisu) | BRD sprzeczne z D-158, D-213, D-301, D-302; `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-brd.txt` | P2 (ŚREDNIE, dokument) | nie | nie |

Wspólne przyczyny: oba miejsca w 09-lokalizacja-001 (wynik zadania liczbowego i średni czas) mają jedną przyczynę: ręczne `.replace('.', ',')` zamiast `formatujLiczbe`. 04-studio-projektowe-002 i 09-lokalizacja-002 mają podobny wzór (ustawienie nie trafia do skutku ubocznego), ale różne mechanizmy i różne poprawki, więc nie łączę ich. 04-studio-projektowe-007 to ten sam wzór co D-1910 (`PoOcenie`), ale w innym komponencie (`SkalaStopni`), który dopasowania nie dostał.

## 04-studio-projektowe-002 · Haptyka wyboru akcji mimo wyłączonych „Wibracji przy odpowiedzi”

**Wynik: potwierdzone.**

- `apps/mobile/src/components/PasekStrategii.tsx:93`: „void wykonajHaptyke(haptyka.wyborAkcji).catch(() => undefined);”. To wywołanie jest bezwarunkowe. Ani `PasekStrategii.tsx`, ani `PanelDecyzji.tsx`, ani `EkranScenariusza.tsx` nie czytają ustawienia `haptics` (grep: kod wyjścia 1, `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-haptyka.txt`).
- Ocena w sesji sprawdza ustawienie, wybór akcji nie: `apps/mobile/src/app/session.tsx:250` „if (haptics) {”.
- Pasek wybiera się w obu miejscach z kroków: w sesji przez `PanelDecyzji` (zadania ze strategią) i w scenariuszu (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:325`).
- Etykieta przełącznika: `apps/mobile/src/i18n/locales/pl.json:316` „Wibracje przy odpowiedzi”.
- Szukałem decyzji, która wyłączałaby wybór akcji spod ustawienia, i jej nie znalazłem. D-330 mówi tylko, że wybór idzie przez wspólny pomocnik: `docs/decyzje.md:239` „wybór akcji w pasku `haptyka.wyborAkcji` przez ten sam pomocnik”. O ustawieniu nic tam nie ma.
- Lista kontrolna na telefon oczekuje braku wibracji: `docs/jakosc/test-fizyczny/README.md:43` „odpowiedź bez wibracji”. Dotknięcie akcji to w tej ścieżce właśnie odpowiedź.

**Poziom.** Ustawienie działa dla oceny, a nie działa dla jednego lekkiego sygnału `selection`. To niespójność ustawienia, a nie „funkcja nie do użycia” ani bariera dostępności. Osoba, która nie chce żadnych wibracji, ma też ustawienie systemowe iOS. Że wycisza ono `selectionAsync`, przyjmuję z dokumentacji `UIFeedbackGenerator`; na urządzeniu tego tu nie sprawdzałem. Poziom: P2 (ŚREDNIE).

**Blokuje 1012: nie.** Kategoria nie blokuje. Skutek praktyczny: pozycja PU-022 z listy na telefon da przy 1012 wynik „wibruje przy dotknięciu akcji”, więc protokół trzeba opisać tym znaleziskiem, a nie nowym błędem. **App Store: nie** (nie ma tu ryzyka odrzucenia ani prywatności).

## 04-studio-projektowe-007 · „Dopuszczalna” łamana w środku wyrazu przy tekście domyślnym

**Wynik: potwierdzone** (na web pomiarem i zrzutem; dla iOS rachunkiem).

- Zrzut roli 04 `audit/M1-2026-11-17/role/04-studio-projektowe/zrzuty/po-ocenie-390-jasny.png` (otwarty jako dane) pokazuje „Dopuszcz” i „alna” w dwóch wierszach przy 390 pt i skali 1. Ramka ma ok. 85 px szerokości.
- Podstawa przedziału: `apps/mobile/src/theme/skalowanie.ts:13` „(twoj ? 112 : 76) * skala”. Styl słowa: `drobny` 13 pt, `fontWeight: '600'`, bez dopasowania rozmiaru do szerokości (`apps/mobile/src/components/SkalaStopni.tsx:26`). Padding 8 + 8 i obwódka 1 + 1 dają pole tekstu ok. 67 pt.
- Pomiar z pliku fontu Inter SemiBold (`node_modules/expo-dev-menu/...`): „Dopuszczalna” = 85,7 pt przy 13 pt (bez kerningu), czyli więcej niż ok. 67 pt (`dowody/g6-dostepnosc-b-lokalizacja-dokumenty-skala-dopuszczalna.txt`, kod 0). SF Pro w środowisku nie ma. Żeby słowo zmieściło się w SF Pro Text Semibold, musiałoby być o ok. 22% węższe niż w Inter, a tak dużej różnicy między tymi krojami nie ma. Rachunek roli (80–90 pt) jest więc spójny. Przy okazji pomiar pokazał przypadki na granicy: en i fr „Acceptable” 69,3 pt, it „Accettabile” 69,2 pt; na iOS mogą się zmieścić albo nie.
- Reguła projektu, którą to łamie: `docs/decyzje.md:31` „łamanie w środku wyrazu dozwolone tylko przy AX3–AX5 na 320 pt”.
- Nic tego nie unieważnia. D-1911 dodał tylko `maxWidth` i sam stwierdza brak skutku przy tekście domyślnym: `docs/decyzje/IJ.md:9` „Przy tekście domyślnym zmiana nie ma skutku”. Dopasowanie z D-1910 (`podpisSegmentu`) objęło `PoOcenie`, nie `SkalaStopni`.

**Poziom.** Problem wyglądu: słowo zostaje czytelne, a stopień niesie też zakres i złota obwódka. Nie ma ucięcia ani przewijania poziomego. To nie bariera dostępności z pkt 1. Poziom: P2 (ŚREDNIE/NISKIE). Etykieta „P1” w wejściu nie pasuje do skutku.

**Blokuje 1012: nie. App Store: nie.** Odstępstwo od reguły wyglądu (D-122) nie jest ryzykiem odrzucenia.

## 09-lokalizacja-001 · Polski przecinek dziesiętny na sztywno

**Wynik: potwierdzone.**

- `apps/mobile/src/app/session.tsx:601` „String(Math.round(v * 100) / 100).replace('.', ',')”. To jest `fmtNum`, którego używa `NumericFeedback` do „Twoja odpowiedź”.
- `apps/mobile/src/app/session.tsx:333` „avg.toFixed(1).replace('.', ',')”. To średni czas decyzji na ekranie wyniku sesji.
- W tym samym widoku wartość dokładna przychodzi z `item.display` (`apps/mobile/src/app/session.tsx:631` „dt.numeric.exact(item.display)”). Ta wartość powstaje przez `pctEquity` → `pct`, a więc w zapisie języka: `apps/mobile/src/features/drills/text.ts:64` „formatujLiczbe(Number((x * 100).toFixed(decimals)), jezykZadan()”. Ekran pokazuje więc dwa zapisy liczby obok siebie.
- Sonda dla 12 języków `supportedLocales` (`dowody/g6-dostepnosc-b-lokalizacja-dokumenty-formaty.txt`, kod 0): wszędzie wychodzi „33,3%” i „4,3”, a `Intl` daje „33.3” i „4.3” w en, ja, zh-Hant i ko. Do tego `fmtNum` dokleja „%” bez spacji, także w fr i de, gdzie `format.percent` w `pct` daje zapis języka.
- Nie znalazłem testu ani decyzji, które by to dopuszczały.

**Poziom.** Wartość jest poprawna, zły jest tylko zapis. W en „33,3%” to nietypowy zapis, ale chodzi o liczbę, którą użytkownik sam wpisał, a poprawna wartość stoi wiersz niżej. To nie „błędne liczby” z pkt 1. Poziom: P2 (ŚREDNIE).

**Blokuje 1012: nie. App Store: nie.** Kosmetyka lokalizacji nie jest powodem odrzucenia.

## 09-lokalizacja-002 · Przypomnienie w poprzednim języku po zmianie języka

**Wynik: potwierdzone.**

- Tekst powiadomienia zapisuje się w chwili planowania: `apps/mobile/src/platform/powiadomienia.ts:20` „content: { title: tytul, body: tresc },”.
- Ekran języka zapisuje wybór i zmienia tylko i18n: `apps/mobile/src/app/language.tsx:44` „await ustawJezyk(j);”. W `language.tsx` ani w `i18n/index.ts` nie ma `odtworz` ani `reminder` (grep: kod 1).
- Wywołania `odtworzZBazy` są tylko trzy: start (`apps/mobile/src/app/_layout.tsx:146` „odtworzZBazy(portPostepu, powiadomieniaExpo”), „Usuń postęp” (`settings.tsx`) i import (`data.tsx`). Do tego dochodzi przełącznik.
- Próbowałem obalić to tak: czy efekt startowy uruchamia się drugi raz po zmianie języka? Nie. Jego zależności to `apps/mobile/src/app/_layout.tsx:148` „}, [loadSettings, startGotowy, portPostepu]);”, a przy zmianie języka stan treści przechodzi z `ok` do `ok` bez `ladowanie` (`apps/mobile/src/data/tresc/useTresc.ts:48` „if (w.ok) ustaw({ stan: 'ok', plik: w.wartosc.plik });”). `startGotowy` zostaje więc `true` i efekt nie wraca.
- Architektura wymaga tego wprost: `docs/adr/0012-przypomnienie-expo-notifications-codzienne.md:28` „zmiana języka → ponowne zaplanowanie”. Test domeny `packages/domena/test/k13-przypomnienie.test.ts:42` „AK-K-13-d zmiana języka → nadal jedno” woła funkcję domeny bezpośrednio i nie sprawdza, czy aplikacja ją wywołuje. Stąd luka.

**Poziom.** Skutek mija przy następnym zimnym starcie. Dotyczy tylko osób, które zmieniają język w aplikacji i mają włączone przypomnienie. Nie ma utraty danych ani awarii, a treść przypomnienia nie zawiera danych osobowych (ADR 0012 pkt 3). Poziom: P2 (ŚREDNIE). To odstępstwo od ADR, więc do backlogu z wersją.

**Blokuje 1012: nie. App Store: nie.**

## 01-odkrywanie-003 · BRD nieaktualne wobec decyzji

**Wynik: potwierdzone**, z dwiema korektami opisu (niżej). Każdy cytat i każda linia sprawdzone w `dowody/g6-dostepnosc-b-lokalizacja-dokumenty-brd.txt` (wszystkie `sed` kod 0).

- Pomoc (RD-12): `docs/brd/README.md:27` „reguła krytyczna: brak numeru pomocy w kraju sprzedaży” (w sekcji „Blokery wydania”, wejście dla roli 07).
- Ta sama treść w trzech innych plikach:
  - `docs/brd/wymagania-sklep.md:212` „BR-POM-001: Numer pomocy według kraju urządzenia”
  - `docs/brd/reguly.md:206` „Telefon pomocy przy problemie z hazardem według kraju użytkownika”
  - `docs/brd/errata.md:9` „Telefony pomocy tylko dla Polski, a storefrontu PL nie będzie” (stan: otwarte, „Blokuje wydanie”)
- Te zapisy są sprzeczne z `docs/decyzje.md:67` „numery pomocy: bez numerów krajowych” i z `docs/decyzje.md:76` „Według D-158, BRD potem (Recommended)”. W `docs/brd/` nie ma żadnego odwołania do D-158 (grep: kod 1). Aplikacja jest zgodna z D-158 (`content/helplines.yaml` od linii 1). Cytat dowodu ER-04 „Zakres: tylko Polska” już w tym pliku nie istnieje (grep -c: 0).
- RD-11: `docs/brd/reguly.md:192` „dziś 0 < f < M daje” wobec `docs/decyzje.md:122` „RD-11 w `rangeVerdict` (stopień `inaccuracy`”. Opis „dziś” jest nieaktualny.
- ER-11: `docs/brd/errata.md:16` „Funkcje `callEv` i `ruleOf2And4` nie odrzucają błędnych danych” ma stan „otwarte”, mimo że D-213 wprowadził walidację.
- Języki: `docs/brd/wymagania.md:78` „Próg: 100% w 35 językach” wobec `docs/decyzje.md:211` „1.0 = pl + en + kilka największych języków”. W aplikacji jest 12 języków (`apps/mobile/app.json:39`).
- Storefronty: `docs/brd/odkrywanie.md:113` „Storefronty: wszystkie poza PL” (i dalej: ograniczenie działa w AU, BR i KR) wobec `docs/decyzje.md:210` „D-300 przyjęta (wszystkie poza spornymi KR, CN, AF, GA, MA, VN, TR i poza PL”.
- ER-15: `docs/brd/errata.md:20` „Przegląd roli 01 w trybie `fix`” ma stan otwarte. ER-16 tak samo (linia 21).
- RD-06: `docs/brd/reguly.md:104` wskazuje plik „math.ts” w linii 70 (wpis „Kod” dla `spr`), a funkcja jest w `packages/poker-core/src/math.ts:72` „export function spr(effectiveStack: number, pot: number)”.

Korekty opisu:

1. Zdanie „poprawki BRD brak od 2026-11-04” jest za szerokie. BRD było edytowane później: README OP-15, OP-16 i OP-18 z 2026-11-09, errata ER-14–ER-16 i `wymagania-scenariusze.md` z 2026-11-10 (grep w pliku dowodu). Prawdziwe jest węższe twierdzenie: poprawki z D-158/D-167 (RD-12, BR-POM, „Blokery”) nie zrobiono.
2. Sam cytat z `docs/brd/README.md:53` („storefront kraju dopiero po zapisanym sprawdzeniu legalności”) jest zgodny z D-292 i z CLAUDE.md. Nieaktualny jest tylko dalszy „Skutek” w tym wierszu, czyli RD-12 dla każdego kraju sprzedaży (sprzeczne z D-158), oraz `docs/brd/odkrywanie.md:113`.

**Poziom.** To rozjazd w dokumentach. Na aplikację nie wpływa, bo kod i treść idą za D-158 i D-302. Ryzyko jest procesowe: rola 07 albo 10 może wziąć RD-12 za bloker, a rola 09 może mierzyć NFR na 35 językach. Hierarchię rozstrzyga D-167 (decyzja właściciela wyżej niż BRD). Żadna kategoria z pkt 1 tu nie pasuje. Poziom: P2 (ŚREDNIE). Etykieta „P1” w wejściu jest zawyżona.

**Blokuje 1012: nie** (sam dokument). **App Store: nie.** Rozjazd w dokumentach nie jest ryzykiem odrzucenia, a stan aplikacji (jedno zdanie i link H-INT-1 zamiast numerów) jest zgodny z decyzją właściciela. Przed werdyktem roli 07 do App Store warto jednak poprawić „Blokery wydania” w BRD, żeby nikt nie zablokował wydania na podstawie nieaktualnego wiersza.
