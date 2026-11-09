# Plan roli 09: drugi język treści i interfejsu (E0, ponowne wejście po roli 08 i audycie 04)

Stan: 2026-11-09, sesja G (tylko dokumenty), rola 09-lokalizacja, tryb build, etap E0 — **plan, bez wdrożenia**. Prompt roli: `prompts` (klon `--depth 1` z 2026-11-09), złożony `node tools/assemble.mjs 09-lokalizacja --tryb build` (kod 0, 57 099 znaków; skrypt przeczytany przed uruchomieniem). Wejście wczesne E0–E1 zamknięte 2026-11-04 (D-136, D-138); rola mówi, że po 08 i audycie 04 E0 skraca się do sprawdzenia, czy decyzja z `jezyki.md` stoi, a nowy dowód daje STOP z wariantami.

**Rozstrzygnięte 2026-11-09:** drugi język = **en** (D-291, właściciel); wszystkie 35 języków w aplikacji, a storefront kraju dopiero po sprawdzeniu legalności (D-292). P-2 i P-3 według rekomendacji (D-293); przekład i przegląd przez API jak w Treningu (D-294). Polityka języków się nie zmienia: 35 języków w wydaniu (D-131, CLAUDE.md „Stan projektu”). „Drugi język” to pierwszy język przekładu, na którym sprawdzamy cały łańcuch (mechanizm, przekład treści, kontrole, E2E), zanim ruszą fale pozostałych 33.

## 1. Analogia z Treningu (D-191; repo `lkarwowski494/trening`, SHA 2e4b0f8, odczyt 2026-11-09)

| Co | Jak w Treningu | Miejsce |
|---|---|---|
| Drugi język | angielski jako drugi język bazowy, przed falami; własny słownik | `docs/lokalizacja/jezyki.md:14` (`en` „bazowy (T-040)”, „słownik `lib/i18n.en.ts`”) |
| Brak przekładu | brak klucza → angielski | `docs/16-jezyki-i-marka.md:23`; `lib/i18n.ts:54` (język spoza listy → `'en'`) |
| Przekład | osobny agent AI na język, potem niezależna recenzja innego agenta bez notatek tłumacza | `docs/16-jezyki-i-marka.md:29–30` |
| Wejście modelu przy przeglądzie | polskie źródło + angielski + tłumaczenie + rejestr języka | `docs/16-jezyki-i-marka.md:327` |
| API płatne | dopiero za decyzją właściciela (20.10.2026), z limitem kosztu | `docs/16-jezyki-i-marka.md:321`; `docs/lokalizacja/kosztorys-przekladu-2026-10-23.md:1–15` |
| Teksty generowane | osobny plik na język (`lib/cues/text/<kod>.json`) | `docs/16-jezyki-i-marka.md:327`; katalog `lib/cues/text/` |
| Nazwa pod ikoną | decyzja właściciela: słowo lokalne, gdzie podobne, w pozostałych „Training” | `docs/16-jezyki-i-marka.md:376–379` |

Odstępstwa nazwane: źródłem tekstów jest u nas polski z kluczami znaczeniowymi (ADR 0014, opcja C Treningu odrzucona), a łańcuch zastępczy treści kończy się na `pl`, bo `content/en` nie ma (D-228). Po przekładzie en zastępczym językiem treści staje się en (jak `ZAPASOWY` w `@szkola/jezyki`), co zamyka odstępstwo D-228.

## 2. Stan wyjściowy (pomiar 2026-11-09, commit fec75e7; dowód `docs/lokalizacja/dowody/stan-2026-11-09.txt`)

| Miejsce | Co jest po polsku | Miara |
|---|---|---|
| Słownik interfejsu `apps/mobile/src/i18n/locales/pl.json` | wszystkie teksty ekranów przez `t()` | 484 wartości, 445 kluczy bazowych, 14 821 znaków, 1 824 słowa; kontekst (`pl.kontekst.json`) dla 445 z 445 kluczy |
| Skrypt kontroli słowników `pnpm i18n` | — | kod 0: „błędy: 0, uwagi: 0; języki: pl; kluczy w źródle: 445” |
| Teksty na sztywno w kodzie `pnpm i18n:kod` | `PaintGrid` (5), `RangeGrid` (2), `RenderErrorScreen` (3); 16 uwag o kluczach dynamicznych | kod 1: 10 błędów, 16 uwag. To jest A04-10 z `docs/design/audyt-5b-6.md:39`, które przenosi do kluczy sesja F; skrypt nie widzi części A04-10 (nazwy kart w `PlayingCard`, „Wróć” w `_layout`) ani A04-11 |
| Teksty zadań generowanych `apps/mobile/src/features/drills/text.pl.ts` | podpowiedzi, wyjaśnienia, ćwiczenie słownictwa, z polską odmianą terminów (`{{t:flush|…}}`, biernik) | 462 linie, 27 413 B; 158 literałów z tekstem, 13 030 znaków; import w `session.tsx:30`, `engine.ts:34`, `vocab.ts:4`. **Poza słownikiem i poza skryptem kontroli** (skrypt widzi JSX, propsy i `Alert`, nie stałe w module) |
| Treść `content/pl/` | lekcje (44), egzaminy (14), `rules.yaml`, `modules.yaml`, `areas.yaml` | 61 plików, 766 877 B; 75–81 tys. słów (dwie metody liczenia, dowód); 3 401 znaczników `{{n:…}}`, 8 042 znaczników `{{t:…}}` |
| Terminy `content/terms.yaml` | `pl`, `def` (definicja po polsku), formy polskie; `en` z przeczytanym źródłem | 162 terminy; pola `pl`/`def` 2 875 słów; **nazwa angielska jest dla każdego terminu** |
| Pomoc `content/helplines.yaml` | jedno zdanie ogólne i link międzynarodowy (D-158), wspólne dla wszystkich krajów | 2 497 B; zdanie H-INT-2 jest treścią krytyczną |
| `content/numbers.yaml` | tylko liczby; `source`, `note` zostają w repo (nagłówek pliku, linie 3–4) | do przekładu: 0 |
| Konfiguracja | `app.json`: `supportedLocales` `["pl"]`, `locales` tylko `pl` (`CFBundleDisplayName` „Szkoła Pokera”); Expo `~58.0.23`, `expo-localization ~58.0.5` | ADR 0014 pkt 8 gotowy na kolejne języki |
| Bazy treści | `content-build` buduje 35 baz; 34 biorą tekst z `pl` przez łańcuch zastępczy (D-228), liczby w formacie języka bazy (D-220) | `tools/content-build/src/build.ts:131` |
| Testy drugiego języka | flow E2E `apps/mobile/e2e/oczekujace/08-drugi-jezyk.yaml` (R-52, R-57, BR-JEZ-001) czeka na `content/en` i `jezyk-en` | poza bramką do czasu przekładu (README oczekujących) |
| Wybór języka w aplikacji | ekran „Jak w telefonie” + wydane języki (D-269); przełączenie bazy treści po wyborze w trakcie działania odłożone do roli 09 | `D-269` w `docs/decyzje.md` |

## 3. Czy decyzje z E0 i E1 (2026-11-04) nadal stoją

| Decyzja | Wynik sprawdzenia |
|---|---|
| D-131 polityka „szeroka”, 35 języków, fala 1: en, ja, pt-BR, fr, zh-Hant, vi, de | stoi (CLAUDE.md „Stan projektu” bez zmian; rynki bez zmian) |
| D-132 wybór języka w aplikacji | stoi, wdrożone (D-269) |
| D-133 oznaczenie przekładu maszynowego w rejestrze | stoi |
| D-134 bez przełącznika jednostek | stoi (`numbers.yaml`: jednostki domenowe) |
| D-135 treść krytyczna, próg zastępczy | stoi; lista krytycznych to dziś 11 twierdzeń z przeglądem (D-157, `docs/tresci/e3-wynik.md:12, 27`) |
| ADR 0014 | stoi; `[DO USTALENIA]` o SDK 57/58 zamknięte (`package.json`: 58) |
| Znalezisko „numery pomocy tylko PL” z E0 | rozwiązane przez D-158 (jedno zdanie i link międzynarodowy) |
| ZAL-L01 (Hermes bez `PluralRules`) | nadal hipoteza; samosprawdzenie na telefonie w liście kontrolnej właściciela |

Nowy fakt, który zmienia zakres, ale nie decyzje: `text.pl.ts` (27 KB polskich tekstów w kodzie, poza słownikiem i skryptem). Bez jego przeniesienia drugi język miałby zadania generowane po polsku.

## 4. Pytania produktowe (do koordynatora; agent ich nie rozstrzyga)

### P-1. Który język jest drugi — rozstrzygnięte: A (en), D-291

| Opcja | Za | Przeciw | Koszt (czas agenta) |
|---|---|---|---|
| **A. en (rekomendacja)** — angielski bez wariantu regionalnego, jeden słownik dla US, GB, CA | rynek główny US i trzy z dziewięciu rynków (CLAUDE.md); nazwy angielskie 162 terminów z przeczytanymi źródłami już są (`terms.yaml`), więc glosariusz istnieje; Trening zrobił tak samo (§1); flow E2E `08-drugi-jezyk` jest napisany pod `en` (`jezyk-en`, `content/en`); po przekładzie en jest językiem zastępczym dla 33 pozostałych (telefon spoza listy dostaje en zamiast pl) | 25 z 29 konkurentów jest tylko po angielsku (`docs/monetyzacja.md`, E1), więc tu konkurencja jest największa; en nie sprawdza układu przy dłuższym tekście ani innego pisma | najmniejszy: bez nowych terminów, bez nowego kroju |
| B. ja | drugi rynek popytu (1 711 ocen/rok wobec 3 548 w US); w JP prowadzą 2 aplikacje z japońskim (`docs/monetyzacja.md`, E1), mniejsza konkurencja | terminologia japońska bez przeczytanych źródeł (trzeba ją zebrać, rola 06); krój Literata nie ma CJK (zgłoszenie do 04 z E0); flow E2E do przepisania; telefon spoza listy dalej dostaje pl | ok. 1,5× wariantu A [OCENA]: glosariusz od zera, sprawdzenie pisma |
| C. en i ja razem | sprawdza mechanizm na łacince i CJK w jednym etapie; oba największe rynki | dwa razy więcej przekładu i przeglądów przed pierwszym wynikiem; ryzyka B w tym samym etapie | ok. 2,5× wariantu A [OCENA] |

Rekomendacja: **A (en)**. Najkrótsza droga do treści, którą przeczyta rynek główny, z gotowym glosariuszem i testami. Japoński idzie zaraz po nim, bo stoi w fali 1 (D-131).

### P-2. Ćwiczenie słownictwa w języku innym niż polski — rozstrzygnięte: A, D-293

Ćwiczenie ma cztery kierunki: polska nazwa → angielska, angielska → polska, skrót → nazwa i definicja → termin (`vocab.ts:7–12`; decyzja właściciela 4.10.2026). W wersji angielskiej dwa pierwsze kierunki tracą sens.

| Opcja | Kompromis |
|---|---|
| **A. W en tylko „skrót → nazwa” i „definicja → termin” (rekomendacja)** | bez nowego typu ćwiczenia; pula pytań w en jest mniejsza |
| B. W en ćwiczenie słownictwa ukryte | mniej pracy przy przekładzie; znika ćwiczenie, które w en nadal uczy (skróty, definicje) |
| C. W każdym języku kierunki „nazwa w języku aplikacji ↔ nazwa angielska” | ma sens od trzeciego języka (ja, de…), w en nie; to decyzja na falę 1, nie na en |

### P-3. Nazwa pod ikoną w angielskim — rozstrzygnięte: A, D-293

| Opcja | Kompromis |
|---|---|
| **A. Nazwa angielska, np. „Poker School” (rekomendacja; brzmienie z rolą 04 i sprawdzeniem w App Store przez rolę 10)** | czytelna dla rynku głównego; jak Trening „Training” (§1) |
| B. „Szkoła Pokera” we wszystkich językach | jedna marka; dla użytkownika z US nieczytelna i trudna do wpisania w wyszukiwarkę |

## 5. Wymagania dla drugiego języka

1. **Terminologia.** Nazwy z `content/terms.yaml` (`en`, przeczytane źródło w `source`), bez wymyślania nowych. W en znacznik `{{t:klucz}}` renderuje samą nazwę angielską, bez nawiasu (reguła nawiasu T-01 z nagłówka `terms.yaml` dotyczy różnicy nazwy lokalnej i angielskiej). Brak terminu w źródle: pytanie `[DO USTALENIA]` do roli 06, nie wybór tłumacza. Glosariusz `docs/lokalizacja/glosariusz.md` generowany z `terms.yaml` (termin, znaczenie, źródło, przekład). Słowa pokerowe z kodu (pozycje, akcje, stopnie oceny) muszą zgadzać się z glosariuszem; kontrola skryptem.
2. **Liczby.** Tylko przez `{{n:klucz}}`; skrypt kontroli porównuje znaczniki i liczby źródła z przekładem (`sprawdz-i18n.mjs`: parametry i liczby), `content:build` formatuje je w zapisie en (D-220). Liczba wpisana ręcznie w przekładzie = błąd.
3. **Treść krytyczna (D-135, przegląd zastępczy D-027).** 11 twierdzeń z zapisem przeglądu (D-157) i zdanie H-INT-2: kontrola (a) — proste sformułowanie, przekład zwrotny na polski w świeżej sesji, porównanie sensu — plus drugi przegląd Claude w świeżym kontekście; zapis przeglądu ze skrótem wersji pliku en. Mechanizm strażnika dla języka innego niż pl `[DO USTALENIA]` w K2 (dziś skrót liczony dla pl, `e3-wynik.md:19`).
4. **Twierdzenia i źródła.** Przekład twierdzenia to nowe twierdzenie: znaczniki, liczby i granice bez zmian, strażnik rejestru `content:build` przechodzi w en.
5. **Formy i gramatyka.** Liczniki w kluczach mnogich tylko całkowite (ADR 0014 pkt 5); teksty `text.pl.ts` z parametrami, bez sklejania; angielskie formy mnogie `one/other`.
6. **Dostępność.** Etykiety VoiceOver w en (także nazwy kart z A04-11), `accessibilityLanguage` zgodny z językiem aplikacji.
7. **Konfiguracja.** `supportedLocales`, `locales/systemowe/en.json` (nazwa pod ikoną, P-3), `WYDANE` i `locale-data/en.js` w polyfillu — spięte testem `konfiguracja.test.ts` (ADR 0014 pkt 8).
8. **Przekład przez API jak w Treningu (D-294).** Message Batches, Opus 5.5 (effort medium), propozycje jako artefakt ręcznego workflowu, nałożenie lokalnie dopiero po przeglądzie i kontrolach; limit kosztu przebiegu w skrypcie: 15 USD dla en (D-295). Odstępstwo nazwane: Trening tłumaczy pary kluczy słownika, u nas dochodzą pliki treści (Markdown i YAML) — jednostką żądania jest plik treści, a znaczniki `{{n:…}}`, `{{t:…}}`, `[[karty]]` i identyfikatory muszą wrócić bez zmian (kontrola skryptem przed nałożeniem i `content:build` po nim).

## 6. Zakres najbliższego etapu (E1 ponownego wejścia: mechanizm drugiego języka i przekład en)

Kroki dla sesji wdrożeniowej (osobna sesja z kodem; język en, D-291; P-2 dotyczy K2e, P-3 dotyczy K3).

| Krok | Co | Definicja ukończenia (dowód) |
|---|---|---|
| K1 | Warunek wejścia: A04-10 i A04-11 zrobione przez sesję F | `pnpm i18n:kod` kod 0 albo uwagi wpisane do `wyjatki.json` z powodem; nazwy kart z kluczy |
| K2 | Mechanizm: (a) `text.pl.ts` → klucze słownika interfejsu z kontekstem (D-288); (b) `content-build`: renderowanie terminu według języka bazy (D-287); (c) przełączenie bazy treści po zmianie języka w trakcie działania (reszta D-269); (d) strażnik przeglądu treści krytycznej dla języka innego niż pl; (e) ćwiczenie słownictwa według P-2 | testy czerwone przed kodem, potem zielone; `pnpm run ci` kod 0; przegląd D-043 (ścieżki wrażliwe: `tools/content-build/`) |
| K3 | Słownik interfejsu en: 445 kluczy + teksty z K2a, `locales/systemowe/en.json`, `supportedLocales` i polyfill | `pnpm i18n` kod 0 z en; `konfiguracja.test.ts` zielony; drugi przegląd AI w świeżym kontekście (prompt z modułu `tlumaczenie`), każda propozycja rozstrzygnięta |
| K3a | Narzędzie przekładu jak w Treningu: `scripts/i18n/przeklad-api.mjs` i `przeglad-api.mjs` (szacunek bez sieci `--szacuj`, `--limit`, `--wznow`, `--zastosuj`), workflowy ręczne `przeklad-tlumaczen.yml` i `przeglad-tlumaczen.yml` (sekret w jednym kroku); krok właściciela: sekret `ANTHROPIC_API_KEY` w repo | testy skryptu bez sieci (budowa żądania, parsowanie, kontrola znaczników, limit kosztu); przebieg `--szacuj` z kwotą; przegląd D-043 (`.github/workflows/`) |
| K4 | Glosariusz en z `terms.yaml`; zamrożenie źródła (`sha256sum` słownika i plików `content/pl`) | `docs/lokalizacja/glosariusz.md`; skróty w `jezyki.md` |
| K5 | Przekład treści `content/en/` falami po modułach (M0–M3, M4–M7, M8–M12), każda fala: przekład, `content:build`, skrypt, drugi przegląd AI, kontrola (a) dla krytycznych | `pnpm content:build` kod 0 (strażniki rejestru, liczb, terminów); 0 rozbieżności znaczników; wpis fali w `jezyki.md` (maszynowe, model, data, SHA źródła) |
| K6 | Zrzuty en (Expo web, procedura roli 04) kluczowych ekranów i pseudolokalizacja | `docs/lokalizacja/zrzuty/en/`; obcięcia zgłoszone roli 04 |
| K7 | Flow `08-drugi-jezyk` przeniesiony do bramki (z rolą 08/07), lista kontrolna telefonu dla właściciela (samosprawdzenie `Intl`, zmiana języka bez restartu, lekcja en) | przebieg E2E zielony (numer przebiegu); lista w `docs/lokalizacja/` |
| K8 | Rejestr `jezyki.md` (wiersz en), `docs/sztafeta.md`, przekazanie do 04, 06, 07, 10 | wpisy z datą i commitem |

Poza zakresem: pozostałe 33 języki (fale po en, osobne STOP), opis w App Store (rola 10), zmiany treści merytorycznej (rola 06).

## 7. Ryzyka

| Ryzyko | Ocena | Kontrola |
|---|---|---|
| Przekład zmienia sens reguły albo liczbę | realne (75–81 tys. słów treści merytorycznej) | liczby tylko przez znaczniki i skrypt; strażnik rejestru; drugi przegląd AI w świeżym kontekście; kontrola (a) dla krytycznych |
| Termin przetłumaczony inaczej niż w glosariuszu | realne | nazwy z `terms.yaml`; skrypt porównuje klucze znaczników `{{t:…}}`; przegląd z glosariuszem |
| Zadania generowane zostają po polsku w en | realne (pomiar §2) | K2a przed K3; test: brak polskich liter w tekstach zadań en |
| Rola 06 zmienia treść w trakcie przekładu | brzegowe | zamrożenie ze skrótem (K4); zmienione klucze otwierają nową falę |
| Przegląd tylko modelem (bez człowieka) przepuszcza błąd w treści krytycznej | realne, przyjęte (D-027, ZAL-L02) | kontrola (a) i drugi przegląd; przegląd eksperta, gdy aplikacja zyska użytkowników (CLAUDE.md) |
| Hermes bez `Intl.PluralRules` na telefonie | teoretyczne przy en (formy `one/other` jak domyślne i18next), realne od ja/pl | samosprawdzenie przy starcie; lista kontrolna telefonu (ZAL-L01) |
| Rozmiar paczki po kolejnej prawdziwej bazie | teoretyczne przy jednym języku | pomiar w K5 (ADR 0005, próg 50 MB [OCENA]) |
| Koszt API wyższy niż szacunek albo przebieg zapętlony | brzegowe | `--szacuj` przed wysłaniem; limit kosztu przebiegu w skrypcie (stop powyżej bez zgody); `--wznow` zamiast ponownego wysłania |
| Model zmienia znacznik albo identyfikator w pliku treści | realne | odrzucenie propozycji przy różnicy znaczników przed nałożeniem; `content:build` po nałożeniu |

## 8. Koszt

- **Pieniądze (API, D-294) [OCENA, przed pierwszym przebiegiem zastąpi ją `--szacuj`]:** treść `content/pl` to 745 374 znaki (ok. 250 tys. tokenów), z interfejsem, terminami i tekstami zadań ok. 270 tys. tokenów wejścia. Przekład en, Opus 5.5 Batch (2 / 10 USD za mln tokenów po rabacie): ok. 5–7 USD; drugi przegląd en: ok. 2–4 USD; razem en ok. 7–11 USD (Sonnet 5.5 ok. połowa). Dla porównania pozostałe 33 języki później: rząd 200–230 USD (Opus) — osobna zgoda przy fali 1. Cennik: tabela modeli umiejętności claude-api (stan 2026-10-06, zgodny z Treningiem `przeglad-api.mjs:20–21`), ponowny odczyt u źródła przed przebiegiem. GitHub Actions dla repo publicznego bez opłat.
- **Czas agenta [OCENA]:** K2 4–6 h; K3 1–2 h; K3a 3–4 h; K4 0,5 h; K5 4–6 h (przegląd propozycji API, kontrola (a), nałożenie w 3 falach); K6–K8 2–3 h. Razem ok. 15–22 h w 5–8 sesjach.
- **Oczekiwanie:** przebiegi E2E iOS (ok. 30 min każdy, limit składnika 30 min, D-258), CI po każdym pushu kodu.
- **Czas właściciela:** sekret `ANTHROPIC_API_KEY` w ustawieniach repo i zgoda na kwotę limitu (ok. 10 min); weto D-286–D-289 (ok. 10 min); lista kontrolna na telefonie po K7 (ok. 20–30 min [OCENA]).

## 9. Decyzje agenta do weta (wpisane w `docs/decyzje.md`)

- D-286: wynik E0 ponownego wejścia — D-131–D-135 i ADR 0014 stoją; drugi język = pytanie P-1; plan K1–K8.
- D-287: renderowanie terminów według języka bazy: w en sama nazwa angielska, w pozostałych decyzja przy fali 1.
- D-288: teksty zadań generowanych (`text.pl.ts`) do słownika interfejsu (klucze z kontekstem), nie osobny plik na język.
- D-289: przekład z polskiego źródła; od drugiego języka model dostaje polski i angielski jako odniesienie (Trening `docs/16-jezyki-i-marka.md:327`); en jest językiem zastępczym treści po przekładzie (zamyka odstępstwo D-228).

## 10. Otwarte

- `[DO USTALENIA]` K2d: jak strażnik przeglądu treści krytycznej liczy skrót dla en (dziś dla pl).
- Komunikaty walidacji w `packages/poker-core/src/table.ts:287–303` są po polsku; gra z botami jest poza interfejsem (D-104) — do sprawdzenia w K2, czy którykolwiek trafia na ekran.
- Lista lokalizacji App Store Connect dla en (en-US, en-GB, en-CA, en-AU) i opis sklepu — rola 10.
- Sprawdzenie legalności kraju przed włączeniem storefrontu (D-292, D-295): agent ze źródeł oficjalnych, kolejność US, JP, CA, GB, BR, FR, TW, VN, DE; żaden kraj nie ma dziś zapisu. Nie blokuje przekładu ani TestFlight wewnętrznego; blokuje włączenie kraju w App Store. Osobne zadanie (koordynator przydziela sesję).
- Wycofanie wadliwego języka (D-295): nowym wydaniem — usunięcie z `WYDANE` i `supportedLocales`; procedura i test do dopisania w K8 (`jezyki.md`, „Utrzymanie”).

## 11. Kolejność E1 dla sesji z kodem (stan po D-291–D-296)

| Kolejność | Krok | Rodzaj | Zależy od |
|---|---|---|---|
| 1 | K1 warunek wejścia | sprawdzenie (`pnpm i18n:kod`) | sesja F: A04-10, A04-11 |
| 2 | K2 mechanizm (a–e) | kod + testy; `tools/content-build/` = ścieżka wrażliwa (przegląd D-043) | K1 |
| 3 | K3a narzędzie przekładu i przeglądu przez API | kod (`scripts/i18n/`) + workflowy ręczne (`.github/workflows/`, przegląd D-043) | — (równolegle z K2) |
| 4 | K4 glosariusz en, zamrożenie źródła | docs (`docs/lokalizacja/glosariusz.md`, skróty w `jezyki.md`) | K2a (teksty zadań w słowniku) |
| 5 | **krok właściciela:** sekret `ANTHROPIC_API_KEY` w ustawieniach repo | — | K3a gotowe, `--szacuj` z kwotą ≤ 15 USD (D-295) |
| 6 | K3 słownik interfejsu en i K5 treść `content/en/` (3 fale): przebieg API → przegląd propozycji → nałożenie → `content:build` | pliki słowników i treści + kontrole | sekret, K2, K4 |
| 7 | K6 zrzuty en i pseudolokalizacja | docs + zrzuty | K3, K5 |
| 8 | K7 flow `08-drugi-jezyk` w bramce, lista kontrolna telefonu | kod E2E (z 07/08) + docs | K3, K5 |
| 9 | K8 rejestr, sztafeta, procedura wycofania języka (D-295 pkt 1), przekazania | docs | K1–K7 |

Bez sekretu da się zrobić kroki 1–4; kroki 6–8 czekają na sekret.

## 12. Zadanie poza rolą 09: sprawdzenie legalności — US (D-292, D-295 pkt 2; sesja tylko z dokumentami)

Wynik: `docs/wydanie/legalnosc/US.md` — tabela „pytanie | źródło szczebla 1 (adres, cytat ≤ 2 zdania, data odczytu) | wniosek | status (potwierdzone / ryzyko / `[DO USTALENIA]`)”, na końcu rekomendacja „włączyć / nie włączać / włączyć z warunkiem” do akceptacji albo weta właściciela. To nie jest opinia prawna (OP-13). Poniższe przepisy to **miejsca do przeczytania, nie ustalone fakty**; każde twierdzenie dopiero po przeczytaniu źródła.

Pytania:
1. Czy aplikacja jest „grą hazardową” w rozumieniu prawa federalnego (stawka, los, wygrana)? Aplikacja: bez stawek i wygranych, subskrypcja za naukę. Do przeczytania: definicje w 31 U.S.C. 5362 (UIGEA), 18 U.S.C. 1084 (Wire Act), 18 U.S.C. 1955.
2. Prawo stanowe: czy któryś stan obejmuje nauczanie albo symulację pokera bez pieniędzy, przekazywanie „informacji o grach” albo urządzenia wspomagające grę? Do przeczytania: stany o najszerszych przepisach (np. Washington RCW 9.46, Nevada NRS 465 o urządzeniach); wynik: lista stanów z ryzykiem albo „brak”. App Store nie pozwala wyłączyć pojedynczego stanu, więc ryzyko w jednym stanie dotyczy całego storefrontu US.
3. „Pomoc w grze” (Apple 5.3.4: „Illegal gambling aids … are not permitted”): czy aplikacja może być użyta w trakcie gry na pieniądze (pomoc w czasie rzeczywistym)? Zestawić z funkcjami (`docs/scope-contract.md`) i regulaminami pokojów jako tłem (szczebel niższy).
4. Reklama i zachęty do gier na pieniądze: zero operatorów i linków (ADR-13, NFR-ZGOD-001–002) — potwierdzić w treści en (skrypt marek z BRD).
5. Kategoria wiekowa (symulowany hazard) i wymogi App Store Connect dla US — tylko odczyt wytycznych Apple w dniu pracy.
6. Subskrypcje z automatycznym odnowieniem (np. prawo stanowe o automatycznym odnawianiu): co zapewnia Apple, a co musi pokazać ekran zakupu — porównać z `EkranZakupu` i decyzjami D-266.

Wzór procesu: rola 10/M8 (formalności przed wydaniem); hierarchia: przepisy i strony regulatorów = szczebel 1 (`zrodla.md`), kancelarie i media = wskazówka. Kolejne kraje (JP, CA, GB, BR, FR, TW, VN, DE) tym samym szablonem.

## 13. Stan wykonania E1 (sesja P z kodem, 2026-11-09)

| Krok | Stan | Dowód |
|---|---|---|
| K1 | zrobione: `pnpm i18n:kod` kod 0, 0 błędów, 21 uwag (klucze dynamiczne z zamkniętą listą wartości: stopnie oceny, karty, poziomy, rodzaje źródeł) | `dowody/k1-i18n-kod-2026-11-09.txt` |
| K2a | zrobione (D-318): `drills/text.ts` + `drill.*` w `pl.json` (205 kluczy bazowych z kontekstem); P-2 w kodzie | test `teksty-jezyk-09.test.ts` (czerwony → zielony); testy zadań pl 80/80 bez zmian tekstów |
| K2b | zrobione (D-319–D-321): terminy według języka tekstu bazy, łańcuch → en → pl, nakładka `spots.yaml`/`helplines.yaml` ze strażnikiem | `tools/content-build/test/jezyk-tresci-09.test.ts` (9), `packages/jezyki/test/lancuch.test.ts` (3 nowe); `content:build` 35 baz bez zmian plików |
| K2c | zrobione (D-322): baza treści za językiem aplikacji, bez restartu | `src/data/tresc/__tests__/useTresc-09.test.tsx` (2) |
| K2d | zrobione (D-323): `przeglad_jezyki.<język>` wymagane dla 11 twierdzeń krytycznych w każdym `content/<język>/` | `scal-rejestr.test.mjs` (czerwony na skrypcie z HEAD, zielony po zmianie); skróty pl 11/11 identyczne |
| K2e | zrobione w K2a (P-2, D-293) | jak K2a |
| K3a | zrobione (subagent w worktree): `scripts/i18n/` (przekład, przegląd, `--szacuj` bez sieci, `--zastosuj` tylko dla języka z listy i celu w `content/<język>/` lub `locales/<język>.json`, kontrola znaczników, sha256 źródła, ostrzeżenie o liczbach cyframi), 64 jednostki na język (z nakładkami `spots.yaml`, `helplines.yaml`), workflowy ręczne `przeklad-tlumaczen.yml`, `przeglad-tlumaczen.yml`; limit 15 USD twardy: STOP przy szacunku i przy najgorszym przypadku (Σ `max_tokens`), sufit `--limit-usd` w kodzie. Przegląd D-043 w świeżym kontekście: 0 KRYTYCZNYCH/WYSOKICH, 2 ŚREDNIE + 2 NISKIE naprawione | `node --test scripts/i18n/*.test.mjs` 40/40; `pnpm test:skrypty` 124/124; `dowody/szacunek-api-2026-11-09.txt` |
| K4 | zrobione: glosariusz z `terms.yaml` (162 terminy; generator z `--sprawdz`), zamrożenie źródła (66 plików, skrót zbiorczy w pliku dowodu) | `glosariusz.md`, `narzedzia/glosariusz.mjs`, `dowody/zamrozenie-k4-2026-11-09.txt` |
| K3 (słownik en) | **zrobione w kodzie (sesja W, 2026-11-09, D-349):** `en.json` w `locales/`, `WYDANE` = pl, en; `app.json` `supportedLocales` pl, en i `locales.en` (nazwa pod ikoną „Poker School”); polyfill `locale-data/en.js`; język testów pl w `jest.setup.js` (jak Trening); test `jezyk-en-09`. Przekład i przegląd: sesja V (D-345, D-346). Prompt roli: `prompts` c025063, `assemble.mjs 09-lokalizacja --tryb build` kod 0, 59 315 znaków | `konfiguracja.test.ts` 7/7 (czerwony 1→3→0), Jest 534/534 (113 czerwonych bez setupu), `jezyk-en-09` 3/3; `pnpm i18n` 0 błędów; przegląd D-043 i E2E — zob. „Zostaje” |
| K5 (treść en) | **zrobione dla całej treści jedną falą (sesja V, 2026-11-09):** 64 pliki `content/en/` (44 lekcje, 14 egzaminów, rules, areas, modules, nakładki spots/helplines, terms-def), przebiegi 42635177199 i 42635183106; 26 odrzuceń = błędy kontroli (D-344, 0 USD ponownie); drugi przegląd AI (8 subagentów, wyjątek nazwany, D-345); kontrola (a) zaliczona, `przeglad_jezyki.en` 11/11; `content:build` kod 0, znaczniki 0 rozbieżności | `dowody/przeglad-en-2026-11-09/` (G1–G8, `rozstrzygniecia.md`, `wynik-a.md`) |
| K7 (E2E en) + naprawa E2E | **zrobione w kodzie (sesja Y, 2026-11-09, D-353):** przyczyna czerwonego E2E 42651521831 potwierdzona zrzutem (symulator en → aplikacja en); każdy `launchApp` z `arguments.AppleLanguages` `(pl)`, flow `08-drugi-jezyk` w bramce (telefon en → powitanie, „Dziś”, lekcja en; zmiana na pl bez restartu; ustawienie ręczne wygrywa po restarcie); `e2e-ios.yml` limit 67, `testflight.yml` czekanie 82/87 | `e2e-flowy.test.mjs` 2 czerwone → 8/8; `workflowy.test.mjs` wymusił czekanie bramki; przegląd D-043 0 KRYT/WYS; wynik E2E — „Zostaje” |
| Słowniczek en (D-347) | **zrobione (sesja Y, D-354):** poza pl tylko termin angielski + definicja, wyszukiwanie i kolejność po angielsku, teksty `glossary.link/intro/search` en | `GlossaryScreen.test.tsx` test en czerwony („wariancja” widoczna) → 2/2 |
| K6/K7 dokumenty | lista zrzutów en (12 ekranów) i lista kontrolna telefonu T-en-1…11: `docs/lokalizacja/lista-telefonu-en.md`; zrzuty poza E2E nie zrobione | — |

Szacunek API (`--szacuj`, Opus 5.5, Batch, cennik ze stanu 2026-10-06 — ponowny odczyt u źródła przed przebiegiem; „najgorszy” = wyjście równe Σ `max_tokens`): **en** przekład 7,40 USD (najgorszy 16,17 — ponad limit, więc dwa przebiegi: lekcje 4,44/10,19 i reszta 2,97/5,98) + przegląd 5,87 (12,90) = ok. 13,27 USD, najgorszy ok. 29,07 USD w trzech przebiegach, każdy < 15 USD (D-295). **ja, pt-BR, fr, zh-Hant**: przekład 30,11 + przegląd 25,10 = ok. 55,21 USD (najgorszy 116,76), po dwa przebiegi przekładu i jeden przeglądu na język — więcej niż ocena D-303 (30–40 USD), pytanie W-03. Sonnet 5.5: połowa.

### Zostaje

- **Po sesji Y (2026-11-09):** zrobione naprawa E2E i K7 w kodzie (D-353), słowniczek en (D-354), listy K6/K7 (dokument). E2E 42665157453 (cc9b5de): 8 flowów pl zielonych (naprawa D-353 działa), 08 czerwony 2× — zmiana języka odmontowywała nawigację (powrót na „Dziś”), naprawa D-357 (podejście 2 do flowu 08). **E2E 42673161093 (4e1c00d, próba 2; próba 1 bez zadań — infrastruktura, ponowiona raz) zielone: 9/9 flowów w pierwszym przebiegu, bez ponowień** (K7 w bramce z dowodem). Zostaje: K6 zrzuty en 12 ekranów (procedura 04 albo `store-screenshots.yml`, płatne minuty macOS — za zgodą); zgłoszenie do roli 04: brzmienie `glossary.intro/search/link` en (D-354) do przeredagowania w jej systemie; lista telefonu T-en dla właściciela po buildzie TestFlight; reszta listy W/V niżej bez zmian (16 znaczników `{{t:…}}` dla roli 06, backlog en, NISKIE D-043 V).

- **Po sesji AB (2026-11-09, tylko docs, D-365–D-368):** przekład ja i zh-Hant przejrzany (artefakty, przyczyny odrzuceń: 2 × błąd wzorca URL, 1 × realny błąd naprawiony poprawką; drugi przegląd na próbie i kontrola (a) zaliczona; 176 poprawek do nałożenia); K-05 — nazwy terminów w języku (`content/<j>/terms-nazwy.yaml`, szkice w `przygotowane/`) przed nałożeniem treści; krój CJK systemowy. Kroki dla sesji kodu: `docs/lokalizacja/przygotowane/plan-ja-zh-Hant.md`. Artefakty wygasają 2026-11-16.
- **Po sesji W (2026-11-09):** zrobione K3 (D-349), otwarte V nr 2 — strażnik K2d liczy definicję en (D-350) — i nr 3 — ostrzeżenia terminów w prompcie i `podsumowanie.md` przeglądu (D-351). Zostaje: K6 zrzuty en i długości etykiet; K7 flow `08-drugi-jezyk` w bramce E2E i lista kontrolna telefonu (samosprawdzenie `Intl` en, zmiana języka bez restartu, nazwa „Poker School” pod ikoną); **słowniczek w en wg D-347 (W, odpowiedź na P-a): tylko termin angielski + definicja, bez polskich słów i nagłówka „Glossary PL–EN”** — test czerwony → kod: `features/glossary/glossary.ts` (wyszukiwanie i sortowanie bez `pl` w en), `app/glossary.tsx`, klucze `glossary.link`/`intro`/`search` w `en.json`, `GlossaryScreen.test.tsx` z językiem en (`global.__locales`); reszta listy sesji V niżej bez zmian (16 znaczników `{{t:…}}` w `content/pl` dla roli 06, backlog en, NISKIE z D-043 V).

- **Po sesji V (2026-11-09):** K3 reszta: `git mv docs/lokalizacja/przygotowane/en.json apps/mobile/src/i18n/locales/` + konfiguracja wydania en (D-346); 16 błędnych znaczników `{{t:…}}` w `content/pl` dla roli 06 (lista: `dowody/przeglad-en-2026-11-09/rozstrzygniecia.md`, „Błędy źródła pl”); backlog en: 28 NISKICH + 5 odłożonych w treści krytycznej (m12-l4, R-M12-011, def. bankroll, egz. m12 q9) — zmiana wymaga ponownej kontroli (a); zaimek „he” → „they” w m10-l1/m10-l2, apostrofy ’/'; strażnik K2d nie liczy definicji en (`terms-def.yaml`) w skrócie `t:bankroll`/`t:risk-of-ruin` (skrót z `terms.yaml` pl) — dopisać jednostkę dla języka ≠ pl (ŚREDNIE, przed wydaniem en); pytanie produktowe: co słowniczek pokazuje i obiecuje w en (dziś termin pl + en); długości etykiet en na telefonie (K6/K7). Przegląd D-043 (sesja V, `dowody/przeglad-en-2026-11-09/d043.md`): 0 KRYT/WYS; do zrobienia ŚREDNIE — ostrzeżenia terminów w `podsumowanie.md` i prompcie `przeglad-api.mjs` (dziś tylko w `<język>.json`; przed przeglądem następnego języka) + test; NISKIE — pola zagnieżdżone pod mapą `why` przekładalne (uśpione), dopisek „liczby tylko przez {{n:…}}” przy ostrzeżeniach terminów w logu `--zastosuj`, nazwa T35-08-a. Repo `prompts` niedostępne w tej sesji (add_repo odrzucone przez kontrolę uprawnień) — wyjątek: rola wykonana według plan-09 i decyzji, bez pliku roli.

- **Krok właściciela:** sekret `ANTHROPIC_API_KEY` w ustawieniach repo; workflowy ręczne są widoczne do uruchomienia dopiero na gałęzi domyślnej (GitHub pokazuje „Run workflow” tylko dla workflowów z gałęzi domyślnej) — do decyzji: scalenie albo uruchomienie lokalne skryptu przez właściciela.
- K3 i K5 (przebiegi API en, przegląd propozycji, nałożenie falami, kontrola (a) dla 11 twierdzeń + H-INT-2 z zapisem `przeglad_jezyki.en`) — po sekrecie.
- **[zrobione 2026-11-09, sesja S, D-335: `content/<język>/terms-def.yaml`, jednostka `definicje` w `scripts/i18n`, `TERM_DEFS` w aplikacji]** Definicje terminów `def` (162, ok. 2 900 słów) nie miały jednostki przekładu: bez nich w en nie ma kierunku „definicja → termin” (P-2) ani definicji w słowniczku en. Propozycja na K5: plik `content/<język>/terms-def.yaml` (klucz → definicja) jako nakładka, budowa bierze definicję języka tekstu.
- ~~Język testów Jest~~ — ustawiony jawnie na pl w `jest.setup.js` (sesja W, D-349; pomiar: bez tego 113 testów czerwonych).
- Ćwiczenie słownictwa poza pl: obszar bez skrótów daje 0 zadań; sprawdzić w K7 (E2E en), czy sesja z samym takim zadaniem nie zostaje pusta.
- Forma `{{t:klucz|forma}}` dla języków fali 1 (K-05) i przewodnik głosu dla języków docelowych (prompt K3a używa rejestru z Treningu) — decyzja 09 z 04/06 przed K-04.
- `content/pl/rules.yaml` (ok. 141 tys. znaków) idzie jednym żądaniem; przy ucięciu odpowiedzi podzielić plik.
- Przegląd D-043 zmian K2 (świeży kontekst, 2026-11-09): 0 KRYTYCZNYCH/WYSOKICH; baza pl i teksty zadań pl bez zmian (test różnicowy, 399 ziaren). Naprawione: wrongSizes w nakładce, kolejka przygotowań bazy. Do backlogu (ŚREDNIE, przed wydaniem drugiego języka, rola 08; **zrobione 2026-11-09, sesja Q, D-324**): zmiana języka zmienia `databaseName` i `SQLiteProvider` przemontowuje całe drzewo (użytkownik wraca na ekran startowy; przy zimnym starcie z zapisanym językiem innym niż systemowy — dwie kopie bazy przy każdym starcie: zastosować zapisany język przed pierwszym `useTresc`). NISKIE: „Różnica” grupuje cyfry od 10 000; `scal-rejestr.mjs` uznaje każdy podkatalog `content/` z 2–3 liter za język; pola nakładki `helplines.regions`/`operator`/`name` nieprzekładalne.
