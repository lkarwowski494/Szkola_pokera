# Recenzja niezależna: przekład DS (b3963e9a..081c6ef3) — Szkoła Pokera — 2026-11-11
Commit: 081c6ef3499cfc91008f551b4d91bd00699a33ad · Rola: 09-lokalizacja, tryb audit (recenzja sesji DW) · Środowisko: Linux, Node v22.23.4, pnpm 10.28.0, `pnpm install --frozen-lockfile` kod 0; bez Xcode i symulatora (zrzuty niewykonane).

Recenzja bez raportu autora: przed oceną nie czytałem `docs/lokalizacja/stan-ds*`, plików `docs/lokalizacja/dowody/ds-*` ani transkryptu DS. Przeczytałem `docs/decyzje/DS.md` (D-1010…D-1013), bo wskazało je polecenie.

## Podsumowanie
**Werdykt: PRZYJĄĆ.** 22 klucze w 10 językach (de, es, fr, it, ja, ko, pt, pt-BR, vi, zh-Hant) mają sens zgodny z pl/en. Parametry i znaczniki `{{t:…}}` są zachowane, CI kończy się kodem 0, a terminy zgadzają się z resztą słownika danego języka. Nie znalazłem nic KRYT ani WYS. Dwa znaleziska ŚR dotyczą tekstów sprzed DS: w fr i pt sąsiedni klucz `scenario.numbers.line` i kilka kluczy `scenario.*` mówią do użytkownika na „ty”, a DS, zgodnie z rejestrem języka, pisze per „vous” / formalnie. Na tym samym ekranie są więc dwie formy zwracania się. Trzecie ŚR to błąd źródła pl (`{{t:board|Stół}}` w `tableLabel`). W przekładach jest niewidoczny (sonda), w pl daje mylącą glosę dla VoiceOver. Pozostałe 4 znaleziska są NIS.

| ID | Poziom | Rodzaj | Tytuł | Status |
|---|---|---|---|---|
| 09-lokalizacja-001 | ŚR | D | fr: na ekranie scenariusza obok siebie „tu” (klucze sprzed DS) i „vous” (DS) | otwarte |
| 09-lokalizacja-002 | ŚR | D | pt: na ekranie scenariusza obok siebie „tu” (klucze sprzed DS) i forma formalna (DS) | otwarte |
| 09-lokalizacja-003 | ŚR | M | pl: `tableLabel` łączy „Stół” (miejsce gry) z terminem board (karty wspólne); VoiceOver czyta „Stół (board)” | otwarte |
| 09-lokalizacja-004 | NIS | D | fr: spacja ASCII zamiast nierozdzielającej przed „:” w 7 kluczach DS | otwarte |
| 09-lokalizacja-005 | NIS | D | ja/zh-Hant: lista nagród łączona ASCII „, ” w kodzie | otwarte |
| 09-lokalizacja-006 | NIS | D | zh-Hant: `wholeStack` mówi „utracisz uprawnienie do turnieju” zamiast „odpadasz z turnieju” | otwarte |
| 09-lokalizacja-007 | NIS | D | pt: jedno „Bubble” sprzed DS przy „Bolha” w pozostałych tekstach | otwarte |

Wagi (KRYT/WYS/ŚR/NIS) odpowiadają progowi wydania z `CLAUDE.md`: KRYT i WYS blokują, ŚR i NIS idą do backlogu. P0/P1/P2 z szablonu roli: KRYT/WYS ≈ P0/P1, ŚR/NIS ≈ P2.

## Linia bazowa i założenia
Zakres recenzji jest wąski (diff przekładu), więc pełnej linii bazowej E0b nie robiłem. Najlepsza w klasie wersja tych 22 kluczy wygląda tak: w każdym języku jedna forma zwracania się na całym ekranie, zgodna z rejestrem (`scripts/i18n/wspolne.mjs:60-74`), jedna nazwa na pojęcie (taka jak w `content/<język>/terms-nazwy.yaml`), typografia języka (fr: spacja nierozdzielająca przed „:”, CJK bez ASCII „, ”) i liczby wyłącznie z parametrów. Wymiary roli w tej recenzji:
- Gramatyka: liczba mnoga. Parametry `platne` (2–3) i `gracze` (3–4) nie łapią się na formy „one” w żadnym z języków, `raz*` to liczby całkowite ≥ 1 (`apps/mobile/src/features/scenariusz/liczby.ts:28`). Sprawdzone, brak problemu.
- Interpunkcja: znaleziska 004 i 005.
- Forma zwracania się: znaleziska 001 i 002. Pozostałe języki zgadzają się z rejestrem (de du, es tú, it tu, pt-BR você, vi bạn, ja/ko styl grzeczny, zh 你).
- Terminologia: `docs/lokalizacja/recenzje/dowody/dw-terminy.txt`. Formy `{{t:…}}` w kluczach DS pokrywają się z resztą słownika we wszystkich 10 językach.
- Dostępność: `tableLabel` i `rowLabel` to etykiety VoiceOver; znalezisko 003.
- Treść merytoryczna: przekłady nie zmieniają liczb ani kierunku („rzadziej niż wymaga cena”, „przegrana zabiera więcej, niż wygrana dodaje”), zgodnie z pl/en.

Soczewki: tłumacz bez ekranu (klucze z kontekstem pl/en), użytkownik VoiceOver (sonda renderowania `tableLabel`), użytkownik fr/pt (forma zwracania się na całym ekranie scenariusza). Zmian statusu w rejestrze założeń nie proponuję.

## Pokrycie
| Obszar / pliki / ekrany | Sprawdzone? | Jak (plik dowodu) |
|---|---|---|
| 22 klucze × 10 języków (`scenario.numbers.{cbet,sizeOpen,size3bet,limp,icm,overcardsFold,overcardsCall}`, `scenario.icm.*`) oraz `line` jako kontekst | tak, przeczytane wszystkie | zestawienie 12 języków (skrypt node, wynik w scratchpadzie), `dowody/dw-terminy.txt` |
| Spójność terminów z resztą słownika | tak | `dowody/dw-terminy.txt` |
| Forma zwracania się vs rejestr | tak (fr, pt: grep form; pozostałe: odczyt) | znaleziska 001, 002 |
| Renderowanie znaczników `{{t:…}}` w 12 językach | tak, sonda `renderTermsIn` | `dowody/dw-sonda-tablelabel.txt` |
| Kod łączący teksty (`komponenty.tsx`, `EkranScenariusza.tsx`, `liczby.ts`) | tak, fragmenty | znalezisko 005 |
| `pnpm run ci` na 081c6ef3 | tak, kod 0 | `dowody/dw-ci-081c6ef3.txt` |
| Zrzuty w ja/zh i najdłuższym języku | nie: brak symulatora; Expo web nie uruchamiałem (poza zakresem polecenia) | — |
| Przegląd człowieka znającego język | nie, to krok właściciela | — |

## Kontrola dowodów i sekretów
Skrypt `sprawdz-raport.mjs` (kopia w scratchpadzie, poza repo): kod 0, wynik w podsekcji „Wynik kontroli” na końcu raportu. `git diff --cached` przejrzany przed commitem: tylko raport i trzy pliki dowodów, bez sekretów.

## Stosowalność listy kontrolnej
| Pozycja | Status | Wynik |
|---|---|---|
| LOK-01 | nie dotyczy (zestaw języków poza zakresem diffu) | — |
| LOK-02 | nie dotyczy (bez zmian w `app.json`) | — |
| LOK-03 | dotyczy (teksty łączone w kodzie) | znalezisko 005 |
| LOK-04 | dotyczy | ok: CI kod 0 (testy kluczy i parytetu), `dowody/dw-ci-081c6ef3.txt` |
| LOK-05 | dotyczy | ok: parametry poza formami „one” (patrz „Linia bazowa”) |
| LOK-06 | dotyczy | ok: parametry i znaczniki zgodne z pl (test DS `scenariusz-liczby-icm-ds-09.test.ts` w CI kod 0; mój odczyt 22×10) |
| LOK-07 | dotyczy (procenty i bb z parametrów) | ok: formatowanie w kodzie (`formatujProcent`), klucze bez liczb |
| LOK-08 | dotyczy | nie sprawdzono: brak zrzutów (symulator) |
| LOK-09 | nie dotyczy (mechanizm bez zmian) | — |
| LOK-10 | dotyczy | ok: liczby i kierunek zachowane; przegląd człowieka to krok właściciela (polityka „szeroka”) |
| LOK-11 | dotyczy | znaleziska 001, 002, 004, 006, 007 |
| LOK-12 | dotyczy (`tableLabel`, `rowLabel`, `stacksLabel` to etykiety) | znalezisko 003; reszta ok |
| LOK-13 | nie dotyczy | — |
| LOK-14 | nie dotyczy (bez nowych krojów) | — |
| LOK-15 | dotyczy | ok: test DS w CI |

## Znaleziska (szczegóły)

### 09-lokalizacja-001 · fr: na ekranie scenariusza obok siebie „tu” (klucze sprzed DS) i „vous” (DS)
- Pozycja listy kontrolnej: LOK-11
- Poziom: ŚR (P2) · Realność: realny · Pewność: wysoka · Rodzaj: D · Właściciel naprawy: 09
- Dowód (cytaty sprawdzone skryptem):
  - rejestr fr: `scripts/i18n/wspolne.mjs:68` „spacja nierozdzielająca przed ? ! : ;” (w tej samej linii: fr = vous, forma grzecznościowa);
  - DS per vous: `apps/mobile/src/i18n/locales/fr.json:1079` „Si vous comptez aussi les cartes”;
  - sprzed DS per tu: `apps/mobile/src/i18n/locales/fr.json:1073` „il te faut {{potrzeba}} d’équité” oraz „tu touches ton tirage”;
  - lista stosów DS: `apps/mobile/src/i18n/locales/fr.json:1122` „Vous, {{pozycja}}”; obok niej na stole ICM stan miejsca `scenario.table.you` = `toi` (`apps/mobile/src/i18n/locales/fr.json:1049`);
  - klucz `line` widać razem z `overcardsFold`/`overcardsCall` w tym samym punkcie draw-call: `apps/mobile/src/features/scenariusz/liczby.ts:44-46`.
- Mechanizm: klucze `scenario.*` sprzed DS tłumaczono per tu. Grep form tu w fr.json: `apps/mobile/src/i18n/locales/fr.json:50`, `apps/mobile/src/i18n/locales/fr.json:1031`, `apps/mobile/src/i18n/locales/fr.json:1034`, `apps/mobile/src/i18n/locales/fr.json:1069`, `apps/mobile/src/i18n/locales/fr.json:1073`, `apps/mobile/src/i18n/locales/fr.json:1093`, `apps/mobile/src/i18n/locales/fr.json:1049` (7 miejsc), wobec 159 wystąpień „vous” w słowniku.
- Powraca: nie. Ocena sygnału z polecenia: DS ma rację, odstają klucze sprzed DS.
- Kroki w aplikacji: fr, scenariusz z punktem draw-call i nadkartami → sekcja „Chiffres”: dwa zdania obok siebie, pierwsze per tu, drugie per vous.
- Proponowane brzmienie: `line` „Le {{t:pot|pot}} est de {{pula}} bb et {{t:call|suivre}} coûte {{kwota}} bb, il vous faut donc {{potrzeba}} d'équité, soit gagner environ une fois sur {{razPotrzeba}}. Outs : {{outy}} sur {{nieznane}} cartes non vues : vous touchez votre tirage dans {{trafisz}} des cas, environ une fois sur {{razTrafisz}}.” (przed „:” spacja U+00A0). `scenario.table.you` „vous”, `yourChoice` „votre choix”, `showdownYou` „… : votre main est plus forte.”, `start.nowAuto` „… à vos résultats.”, `start.hint` „… de vos décisions …”, `soon` „… entraînez vos décisions …”.
- Test akceptacyjny: test słownika fr, który odrzuca formy tu (`\b(tu|te|toi|ton|ta|tes)\b`) w `scenario.*` i `start.*`.
- Status: otwarte

### 09-lokalizacja-002 · pt: na ekranie scenariusza obok siebie „tu” (klucze sprzed DS) i forma formalna (DS)
- Pozycja listy kontrolnej: LOK-11
- Poziom: ŚR (P2) · Realność: realny · Pewność: wysoka · Rodzaj: D · Właściciel naprawy: 09
- Dowód (cytaty sprawdzone skryptem):
  - rejestr pt: `scripts/i18n/wspolne.mjs:67` „pt-PT (Portugalia), formalnie, bez”;
  - DS formalnie: `apps/mobile/src/i18n/locales/pt.json:1079` „Se contar também as cartas que lhe dão”;
  - sprzed DS per tu: `apps/mobile/src/i18n/locales/pt.json:1073` „por isso precisas de {{potrzeba}} de equity”; `apps/mobile/src/i18n/locales/pt.json:1069` „a tua escolha”; `apps/mobile/src/i18n/locales/pt.json:1093` „a tua mão é mais alta”; także `A tua vez` (`apps/mobile/src/i18n/locales/pt.json:1056`);
  - stan miejsca na stole ICM `apps/mobile/src/i18n/locales/pt.json:1049` („tu”) obok listy `apps/mobile/src/i18n/locales/pt.json:1122` („Eu, …”).
- Mechanizm: jak w 001. Grep form tu w apps/mobile/src/i18n/locales/pt.json: 9 trafień (tu, tua, precisas), wobec 59 form formalnych (seu, sua, lhe).
- Powraca: nie. Ocena sygnału: DS ma rację. „Eu” w `scenario.icm.you` zgadza się z `apps/mobile/src/i18n/locales/pt.json:447` i `apps/mobile/src/i18n/locales/pt.json:817`.
- Kroki w aplikacji: pt, scenariusz draw-call z nadkartami albo punkt ICM (stół pokazuje „tu”, lista „Eu, BB”).
- Proponowane brzmienie: `line` „O {{t:pot|pote}} é de {{pula}} bb e {{t:call|pagar}} custa {{kwota}} bb, por isso precisa de {{potrzeba}} de equity, ou seja, de ganhar cerca de uma vez em {{razPotrzeba}}. Outs: {{outy}} de {{nieznane}} cartas não vistas: completa o draw em {{trafisz}} dos casos, cerca de uma vez em {{razTrafisz}}.” `scenario.table.you` „Eu”, `yourMove` „A sua vez”, `yourChoice` „a sua escolha”, `showdownYou` „… a sua mão é mais alta.”
- Test akceptacyjny: test słownika pt, który odrzuca `\b(tu|tua|teu|precisas|completas)\b` w `scenario.*`.
- Status: otwarte

### 09-lokalizacja-003 · pl: `tableLabel` łączy „Stół” (miejsce gry) z terminem board (karty wspólne); VoiceOver czyta „Stół (board)”
- Pozycja listy kontrolnej: LOK-12
- Poziom: ŚR (P2) · Realność: realny w pl; teoretyczny w 10 przekładach · Pewność: wysoka · Rodzaj: M · Właściciel naprawy: 06 (brzmienie pl), 08 (test T-01)
- Dowód: definicja w `content/terms.yaml:240` „W tym znaczeniu „stół” to karty, nie miejsce gry (przy stole, stół finałowy).” Sonda `dowody/dw-sonda-tablelabel.txt`: w pl etykieta brzmi „Stół (board): ty na …”. W de, es, fr, it, ja, ko, pt, pt-BR, vi i zh-Hant znacznik daje sam tekst („Tisch:”, „テーブル：”) bez glosy, więc użytkownik przekładu nie widzi związku z board. Etykieta trafia do `accessibilityLabel` stołu ICM (`apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:280`).
- Mechanizm: test T-01 wymusza znacznik przy słowie „stół” (D-990, `docs/decyzje/DP.md:11`), a D-1013 przeniosło go do przekładów. Ocena sygnału z polecenia: w przekładach teoretyczny (bez skutku), w pl realny.
- Kroki w aplikacji: pl, VoiceOver, punkt ICM, fokus na stole: „Stół (board): ty na BB…”.
- Opcje: (a) pl bez słowa „stół”: „Miejsca: ty na {{ty}}, karty {{reka}}. Rywal na {{rywal}} wchodzi all-in.”, en „Seats: …”, w 10 językach usunąć `{{t:board|…}}` (np. de „Plätze: …”, ja „席：…”). Koszt: 12 słowników, test DS do aktualizacji. (b) Wyjątek T-01 dla `tableLabel` („stół” jako miejsce, nie termin) i usunięcie znacznika w 12 językach. Rekomendacja: (a), bo nie dokłada wyjątku do testu, a „Miejsca” lepiej opisuje rysunek. Decyzja należy do 06/04 (brzmienie), nie do 09.
- Test akceptacyjny: renderowanie `scenario.icm.tableLabel` w pl nie zawiera „(board)”.
- Status: otwarte

### 09-lokalizacja-004 · fr: spacja ASCII zamiast nierozdzielającej przed „:” w 7 kluczach DS
- Pozycja listy kontrolnej: LOK-11
- Poziom: NIS (P2) · Realność: realny (przy wąskim ekranie „:” może przejść na początek wiersza) · Pewność: wysoka · Rodzaj: D · Właściciel naprawy: 09
- Dowód: rejestr `scripts/i18n/wspolne.mjs:68` „spacja nierozdzielająca przed ? ! : ;”. Klucze DS mają 9× spację ASCII przed „:” i 0× U+00A0; reszta słownika ma 205× U+00A0 i 30× ASCII (`dowody/dw-fr-spacje.txt`). Klucze: `apps/mobile/src/i18n/locales/fr.json:1078`, `apps/mobile/src/i18n/locales/fr.json:1080`, `apps/mobile/src/i18n/locales/fr.json:1113`, `apps/mobile/src/i18n/locales/fr.json:1116`, `apps/mobile/src/i18n/locales/fr.json:1117`, `apps/mobile/src/i18n/locales/fr.json:1118`, `apps/mobile/src/i18n/locales/fr.json:1126`; spoza DS `apps/mobile/src/i18n/locales/fr.json:1073`.
- Proponowane brzmienie: w tych kluczach spację ASCII przed „:” zastąpić znakiem U+00A0 (np. `tableLabel`: „{{t:board|Table}}”, U+00A0, „: vous en {{ty}}…”).
- Test akceptacyjny: test fr, który nie przepuszcza `/ [:;?!]/` w `scenario.*`.
- Status: otwarte

### 09-lokalizacja-005 · ja/zh-Hant: lista nagród łączona ASCII „, ” w kodzie
- Pozycja listy kontrolnej: LOK-03
- Poziom: NIS (P2) · Realność: realny (widoczne w nagłówku punktu ICM) · Pewność: wysoka · Rodzaj: D · Właściciel naprawy: 08 (kod), 09 (wartości klucza)
- Dowód: `apps/mobile/src/features/scenariusz/komponenty.tsx:170` „uklad.wyplaty.map((w, i) => t('scenario.icm.place'” … `.join(', ')`; w ja daje to np. „賞金：1位 50%, 2位 30%（…）” (rachunek z kodu, bez zrzutu).
- Mechanizm: `grep -n "join(', ')" apps/mobile/src/features/scenariusz/*.tsx` → 7 trafień w 3 plikach. Tekst widoczny: `apps/mobile/src/features/scenariusz/komponenty.tsx:170` (nagrody), `apps/mobile/src/features/scenariusz/WyborScenariusza.tsx:45` (lista poziomów), `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:168` (opis akcji rywala i reakcji). Etykiety VoiceOver: `apps/mobile/src/features/scenariusz/komponenty.tsx:53`, `apps/mobile/src/features/scenariusz/komponenty.tsx:96`, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:279`, `apps/mobile/src/features/scenariusz/EkranScenariusza.tsx:280`. Poza 170 to kod sprzed DS. Ocena sygnału z polecenia: realny, NIS.
- Proponowane brzmienie: klucz separatora listy (np. `scenario.icm.placeSep`: pl/en itd. „, ”, ja „、”, zh-Hant „、”, ko „, ”) używany w `join`. Przed decyzją 08 sprawdza analogię w Treningu (D-191); w tej sesji jej nie sprawdzałem [DO USTALENIA].
- Test akceptacyjny: renderowanie `TurniejIcm` w ja nie zawiera „, ”.
- Status: otwarte

### 09-lokalizacja-006 · zh-Hant: `wholeStack` mówi „utracisz uprawnienie do turnieju” zamiast „odpadasz z turnieju”
- Pozycja listy kontrolnej: LOK-11
- Poziom: NIS (P2) · Realność: realny · Pewność: średnia (drugi przegląd AI, nie rodzimy użytkownik) · Rodzaj: D · Właściciel naprawy: 09
- Dowód: `apps/mobile/src/i18n/locales/zh-Hant.json:1090` „輸了就會失去{{t:tournament|錦標賽}}資格，且沒有獎金” (dosłownie: przegrana odbiera ci prawo udziału w turnieju), a pl/en mówią o odpadnięciu bez nagrody.
- Proponowane brzmienie: „{{kwota}} 是你的全部籌碼：輸了就會被淘汰出{{t:tournament|錦標賽}}，拿不到任何獎金。”
- Test akceptacyjny: przegląd człowieka zh-Hant (krok właściciela) albo przyjęcie brzmienia.
- Status: otwarte

### 09-lokalizacja-007 · pt: jedno „Bubble” sprzed DS przy „Bolha” w pozostałych tekstach
- Pozycja listy kontrolnej: LOK-11
- Poziom: NIS (P2) · Realność: realny · Pewność: wysoka · Rodzaj: D · Właściciel naprawy: 09
- Dowód: `apps/mobile/src/i18n/locales/pt.json:821` „{{t:bubble|Bubble}}” (drill.icm.callPrompt). DS i 5 innych miejsc używają „bolha” (`dowody/dw-terminy.txt`, pt: „Bubble×1 ; bolha×5”), zgodnie z D-1011. Ocena sygnału z polecenia: DS jest spójne, odstaje klucz sprzed DS.
- Proponowane brzmienie: „{{t:bubble|Bolha}}: …”.
- Test akceptacyjny: test D-1011 (`BUBBLE`) rozszerzony o `drill.icm.*` w pt.
- Status: otwarte

## Do sprawdzenia
- ko/ja/zh-Hant, „equity”: etykieta `{{t:equity}}` brzmi 에퀴티 / エクイティ / 權益 i występuje w słownikach 18 / 14 / 12 razy, a w zdaniach „potrzebujesz X” (`line`, `cbet`, `sizeOpen`, `size3bet`) stoi 승률 / 勝率. Źródło pl robi to samo: „szans” w tych zdaniach, `{{t:equity}}` w `icm`, a definicja w `content/terms.yaml:505` mówi „Twoja szansa na wygranie puli…”. Przekład wiernie oddaje źródło. Ocena: brzegowy, bez zmiany po stronie 09. Jeśli 06 ujednolici pl (jedna nazwa na pojęcie), przekłady pójdą za nim.
- de: „also … also” w jednym zdaniu (`de.json` `cbet`, `sizeOpen`, `size3bet`, a także `line` sprzed DS), np. „braucht also {{cena}} Equity, also etwa jedes {{raz}}. Mal zu gewinnen”. Stylistyka do oceny przez człowieka; propozycja: „…, d. h. etwa jedes {{raz}}. Mal zu gewinnen”.
- vi `scenario.numbers.icm`: „thua lấy đi của bạn nhiều tổng giải thưởng hơn so với phần thắng mang lại” brzmi nienaturalnie. Sens zachowany, do oceny przez człowieka znającego wietnamski.
- Zrzuty ja/zh/ko i najdłuższego języka (de) dla punktu ICM: nie wykonane (brak symulatora).

## Co działa dobrze i należy zachować
- Formy terminów `{{t:…|…}}` w każdym z 10 języków są takie same jak w reszcie słownika (`dowody/dw-terminy.txt`).
- Rejestr zwracania się w kluczach DS zgadza się z `scripts/i18n/wspolne.mjs:60-74`, także tam, gdzie klucze sprzed DS odstają (001, 002).
- ja/zh-Hant: interpunkcja pełnej szerokości („：”, „，”, „（）”) i separator „、”/„，” w `rowLabel`. Odstępy przy liczbach w zh-Hant są takie jak w `line` sprzed DS.
- Test DS pilnuje parytetu parametrów i nazwy „bubble” (D-1011).
- D-1013 słusznie zostawiło znacznik i zgłosiło problem dalej, zamiast łamać parytet z pl.

## Decyzje dla właściciela
Brak decyzji produktowych. 003 (brzmienie pl) rozstrzyga rola 06 z 04. Pula D-1060…D-1064 nie została użyta.

## Proponowane polecenie naprawy
`node tools/assemble.mjs 09-lokalizacja --tryb fix --zadania 09-lokalizacja-001,09-lokalizacja-002,09-lokalizacja-004,09-lokalizacja-006,09-lokalizacja-007`; 005 dla roli 08 (kod), 003 dla roli 06 z 04.

### Wynik kontroli
`node sprawdz-raport.mjs docs/lokalizacja/recenzje/recenzja-ds-081c6ef3.md . --rola 09-lokalizacja` → „OK: odwołania, cytaty, pliki dowodów i sekrety sprawdzone; format raportu 09-lokalizacja”, kod 0. `pnpm run ci` na 081c6ef3: kod 0, apps/mobile 125 zestawów / 1270 testów zielonych (`dowody/dw-ci-081c6ef3.txt`). `git status --porcelain` przed commitem: tylko nowe pliki recenzji (pliki śledzone nietknięte).
