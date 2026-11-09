# Plan roli 09: drugi język treści i interfejsu (E0, ponowne wejście po roli 08 i audycie 04)

Stan: 2026-11-09, sesja G (tylko dokumenty), rola 09-lokalizacja, tryb build, etap E0 — **plan, bez wdrożenia**. Prompt roli: `prompts` (klon `--depth 1` z 2026-11-09), złożony `node tools/assemble.mjs 09-lokalizacja --tryb build` (kod 0, 57 099 znaków; skrypt przeczytany przed uruchomieniem). Wejście wczesne E0–E1 zamknięte 2026-11-04 (D-136, D-138); rola mówi, że po 08 i audycie 04 E0 skraca się do sprawdzenia, czy decyzja z `jezyki.md` stoi, a nowy dowód daje STOP z wariantami.

Decyzja do podjęcia przez właściciela: **który język jest drugi** (pytanie P-1 niżej). Polityka języków się nie zmienia: 35 języków w wydaniu (D-131, CLAUDE.md „Stan projektu”). „Drugi język” to pierwszy język przekładu, na którym sprawdzamy cały łańcuch (mechanizm, przekład treści, kontrole, E2E), zanim ruszą fale pozostałych 33.

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

### P-1. Który język jest drugi

| Opcja | Za | Przeciw | Koszt (czas agenta) |
|---|---|---|---|
| **A. en (rekomendacja)** — angielski bez wariantu regionalnego, jeden słownik dla US, GB, CA | rynek główny US i trzy z dziewięciu rynków (CLAUDE.md); nazwy angielskie 162 terminów z przeczytanymi źródłami już są (`terms.yaml`), więc glosariusz istnieje; Trening zrobił tak samo (§1); flow E2E `08-drugi-jezyk` jest napisany pod `en` (`jezyk-en`, `content/en`); po przekładzie en jest językiem zastępczym dla 33 pozostałych (telefon spoza listy dostaje en zamiast pl) | 25 z 29 konkurentów jest tylko po angielsku (`docs/monetyzacja.md`, E1), więc tu konkurencja jest największa; en nie sprawdza układu przy dłuższym tekście ani innego pisma | najmniejszy: bez nowych terminów, bez nowego kroju |
| B. ja | drugi rynek popytu (1 711 ocen/rok wobec 3 548 w US); w JP prowadzą 2 aplikacje z japońskim (`docs/monetyzacja.md`, E1), mniejsza konkurencja | terminologia japońska bez przeczytanych źródeł (trzeba ją zebrać, rola 06); krój Literata nie ma CJK (zgłoszenie do 04 z E0); flow E2E do przepisania; telefon spoza listy dalej dostaje pl | ok. 1,5× wariantu A [OCENA]: glosariusz od zera, sprawdzenie pisma |
| C. en i ja razem | sprawdza mechanizm na łacince i CJK w jednym etapie; oba największe rynki | dwa razy więcej przekładu i przeglądów przed pierwszym wynikiem; ryzyka B w tym samym etapie | ok. 2,5× wariantu A [OCENA] |

Rekomendacja: **A (en)**. Najkrótsza droga do treści, którą przeczyta rynek główny, z gotowym glosariuszem i testami. Japoński idzie zaraz po nim, bo stoi w fali 1 (D-131).

### P-2. Ćwiczenie słownictwa w języku innym niż polski

Ćwiczenie ma cztery kierunki: polska nazwa → angielska, angielska → polska, skrót → nazwa i definicja → termin (`vocab.ts:7–12`; decyzja właściciela 4.10.2026). W wersji angielskiej dwa pierwsze kierunki tracą sens.

| Opcja | Kompromis |
|---|---|
| **A. W en tylko „skrót → nazwa” i „definicja → termin” (rekomendacja)** | bez nowego typu ćwiczenia; pula pytań w en jest mniejsza |
| B. W en ćwiczenie słownictwa ukryte | mniej pracy przy przekładzie; znika ćwiczenie, które w en nadal uczy (skróty, definicje) |
| C. W każdym języku kierunki „nazwa w języku aplikacji ↔ nazwa angielska” | ma sens od trzeciego języka (ja, de…), w en nie; to decyzja na falę 1, nie na en |

### P-3. Nazwa pod ikoną w angielskim

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
8. **Bez płatnych usług.** Przekład i przeglądy w sesjach agenta (wzór Treningu z 05.10.2026, §1); API tłumaczeń tylko za osobną zgodą właściciela.

## 6. Zakres najbliższego etapu (E1 ponownego wejścia: mechanizm drugiego języka i przekład en)

Kroki dla sesji wdrożeniowej (osobna sesja z kodem, po odpowiedzi na P-1–P-3; przy B albo C kroki K3–K5 dotyczą wybranego języka).

| Krok | Co | Definicja ukończenia (dowód) |
|---|---|---|
| K1 | Warunek wejścia: A04-10 i A04-11 zrobione przez sesję F | `pnpm i18n:kod` kod 0 albo uwagi wpisane do `wyjatki.json` z powodem; nazwy kart z kluczy |
| K2 | Mechanizm: (a) `text.pl.ts` → klucze słownika interfejsu z kontekstem (D-288); (b) `content-build`: renderowanie terminu według języka bazy (D-287); (c) przełączenie bazy treści po zmianie języka w trakcie działania (reszta D-269); (d) strażnik przeglądu treści krytycznej dla języka innego niż pl; (e) ćwiczenie słownictwa według P-2 | testy czerwone przed kodem, potem zielone; `pnpm run ci` kod 0; przegląd D-043 (ścieżki wrażliwe: `tools/content-build/`) |
| K3 | Słownik interfejsu en: 445 kluczy + teksty z K2a, `locales/systemowe/en.json`, `supportedLocales` i polyfill | `pnpm i18n` kod 0 z en; `konfiguracja.test.ts` zielony; drugi przegląd AI w świeżym kontekście (prompt z modułu `tlumaczenie`), każda propozycja rozstrzygnięta |
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
| Przekład w sesjach agenta trwa długo i zużywa limit AI | realne | fale po modułach; punkt czyszczenia po każdej fali |

## 8. Koszt

- **Pieniądze:** 0 USD (bez API tłumaczeń; GitHub Actions dla repo publicznego bez opłat; E2E na macOS jak dotąd).
- **Czas agenta [OCENA]:** K2 4–6 h; K3 1–2 h; K4 0,5 h; K5 10–16 h (ok. 80 tys. słów w 3 falach, z przeglądem drugim agentem i kontrolą (a)); K6–K8 2–3 h. Razem ok. 18–28 h pracy agenta w 6–10 sesjach.
- **Oczekiwanie:** przebiegi E2E iOS (ok. 30 min każdy, limit składnika 30 min, D-258), CI po każdym pushu kodu.
- **Czas właściciela:** odpowiedzi P-1–P-3 (ok. 5 min); weto D-286–D-289 (ok. 10 min); lista kontrolna na telefonie po K7 (ok. 20–30 min [OCENA]).

## 9. Decyzje agenta do weta (wpisane w `docs/decyzje.md`)

- D-286: wynik E0 ponownego wejścia — D-131–D-135 i ADR 0014 stoją; drugi język = pytanie P-1; plan K1–K8.
- D-287: renderowanie terminów według języka bazy: w en sama nazwa angielska, w pozostałych decyzja przy fali 1.
- D-288: teksty zadań generowanych (`text.pl.ts`) do słownika interfejsu (klucze z kontekstem), nie osobny plik na język.
- D-289: przekład z polskiego źródła; od drugiego języka model dostaje polski i angielski jako odniesienie (Trening `docs/16-jezyki-i-marka.md:327`); en jest językiem zastępczym treści po przekładzie (zamyka odstępstwo D-228).

## 10. Otwarte

- `[DO USTALENIA]` K2d: jak strażnik przeglądu treści krytycznej liczy skrót dla en (dziś dla pl).
- Komunikaty walidacji w `packages/poker-core/src/table.ts:287–303` są po polsku; gra z botami jest poza interfejsem (D-104) — do sprawdzenia w K2, czy którykolwiek trafia na ekran.
- Lista lokalizacji App Store Connect dla en (en-US, en-GB, en-CA, en-AU) i opis sklepu — rola 10.
