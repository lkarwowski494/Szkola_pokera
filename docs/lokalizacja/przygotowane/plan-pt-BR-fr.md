# pt-BR i fr: kroki dla sesji kodu (rola 09, poz. 3 kolejki nocy)

Stan: 2026-11-09, sesja AD (tylko docs), HEAD bazowy 8c0cade. Decyzje: D-370 (odrzucenia, koszt), D-371 (drugi przegląd, kontrola (a), typografia fr), D-372 (K-05: nazwy terminów), D-369 (słowniczek, nazwa pod ikoną). Dowody: `docs/lokalizacja/dowody/przeklad-pt-BR-fr-2026-11-09.txt`, `docs/lokalizacja/dowody/przeglad-pt-BR-fr-2026-11-09/`. Wzór: `plan-ja-zh-Hant.md` (kroki 1, 3 i 6 są wspólne — rób je raz dla czterech języków).

Kolejność: K-05 (krok 3) przed nałożeniem treści, bo bez niego 1 218 (pt-BR) i 1 044 (fr) znaczników bez formy pokaże nazwę angielską obok formy lokalnej tego samego terminu („o pot” obok „o pote”, „la big blind” obok „la grosse blinde”).

## 0. Artefakty (wygasają 2026-11-16)

Pobierz trzy artefakty `raport-przekladu` (przebiegi 42680063904, 42680071149, 42682273309; id 13702616081, 13703066134, 13704203642), każdy do osobnego pustego katalogu; sprawdź sha256 zip i `propozycje.json` z dowodu.

## 1. Poprawka kontroli adresów URL (D-365, D-370) — `scripts/i18n/wspolne.mjs:215`

Jak plan-ja-zh-Hant §1; dodatkowy przypadek do testu czerwonego: pl `(https://x.org/a: „cytat”)` i fr `(https://x.org/a : « cytat »)` (spacja typograficzna fr przed dwukropkiem) → dziś „adresy URL”, po zmianie (obcięcie końcowego `[.,;:]` po obu stronach) 0 powodów. Wynik oczekiwany: fr rules.yaml 5 pól → 0 (symulacja: 0 różnic na 70 polach z adresami w pt-BR i fr).

## 2. Poprawki przeglądu i typografia fr na kopii propozycji (D-371)

```
node docs/lokalizacja/narzedzia/poprawki.mjs <katalog>/propozycje.json docs/lokalizacja/dowody/przeglad-pt-BR-fr-2026-11-09/poprawki-pt-BR.json docs/lokalizacja/dowody/przeglad-pt-BR-fr-2026-11-09/poprawki-fr.json --wyjscie <katalog>/propozycje-po-przegladzie.json --typografia-fr
```

Dla każdego z trzech plików; oczekiwane: nałożone 9 / 16 / 133, pominięte 0 (kod 0), typografia fr 0 / 1 499 / 1 749; sha256 wyniku jak w `rozstrzygniecia.md` (dla HEAD 8c0cade). Typografia idzie PO poprawkach (poprawki szukają tekstu ze zwykłą spacją).

## 3. K-05: nazwa terminu w języku (D-367, D-372) — `packages/content-schema/`, `tools/content-build/` (D-043)

1. Mechanizm z plan-ja-zh-Hant §3 (jeden dla wszystkich języków): `content/<j>/terms-nazwy.yaml`, `renderTermsBare`: `form ?? nazwyJezyka?.[key] ?? (skrót ? t.pl : t.en)`.
2. Pliki: `content/pt-BR/terms-nazwy.yaml` z `docs/lokalizacja/przygotowane/terms-nazwy-pt-BR.yaml`, `content/fr/terms-nazwy.yaml` z `terms-nazwy-fr.yaml` (sama wartość; komentarze `#` mogą zostać). Wiersze `[DO USTALENIA]` (pt-BR 94, fr 40; głównie rzadkie terminy) mają wpisaną nazwę = najczęstsza forma tłumacza albo nazwa angielska — wejść mogą bez zmiany, bo dziś te same miejsca pokazują nazwę angielską; potwierdzenie źródłem w backlogu.
3. Rozstrzygnięcia nazw (D-372): pt-BR — pot „pote”, bet „aposta”, raise „aumento”, straight „sequência”, two pair „dois pares”, out of position „fora de posição”, stakes „limite”, variance „variância”; call, fold, check, board, range, big blind, top pair, draw, flush draw, nit — nazwa angielska (żargon BR w źródłach; „mesa” dałoby „ao mesa”). fr — big/small blind „grosse/petite blinde”, bet „mise”, raise „relance”, straight „quinte”, flush „couleur”, two pair „double paire”, draw „tirage”, flush draw „tirage couleur”, top pair „top paire”, out of position „hors de position”, equity „équité”, stakes „limite”; pot, call, fold, check, board, range, nit — nazwa angielska.
4. Konflikty rodzaju i liczby przy tych nazwach (P2/F2: przegląd wszystkich znaczników bez formy): pt-BR 0; fr 1 (`exams/m5.yaml` „les flops {{t:wet}}” — poprawione w liście F2).
5. **Ujednolicenie form poza próbą** (skrypt w sesji kodu, po nałożeniu, z raportem liczby zamian; jak zh-Hant w plan-ja-zh-Hant): pt-BR `{{t:top-pair|par mais alto}}` (i odmiany) → `top pair`; `{{t:fold|folda/foldar/…}}` w m4-l3, m11-l1, m11-l2 → formy „desistir” (wzór w P1.json); fr `{{t:big-blind|grosse blind}}` → `grosse blinde` (m4-l1, m4-l2, m7-l1, m9-l3, exams m3, m8), `limpers` → `limpeurs`, `solver` → `solveur` (tekst bez znacznika). Każda zamiana w treści krytycznej (m12) — tylko z ponowną kontrolą (a).
6. Słowniczek (D-369): w pt-BR i fr nazwa lokalna z `terms-nazwy` + nazwa angielska pod spodem, wyszukiwanie po obu; gdy nazwa lokalna = angielska (pot, call, range…) — jedna linia.

## 4. Nałożenie i kontrole

1. `node scripts/i18n/przeklad-api.mjs --zastosuj <katalog>/propozycje-po-przegladzie.json` dla trzech plików → 130 plików (pt-BR 65, fr 65): `content/pt-BR/**`, `content/fr/**`, `apps/mobile/src/i18n/locales/{pt-BR,fr}.json` (plik w `locales/` = język wydany, D-346: od razu krok 5 albo słownik do `przygotowane/`).
2. **Jednostki nieaktualne po AC** (sekcja niżej): `--zastosuj` odrzuci je jako „źródło zmienione”.
3. `pnpm content:build` kod 0; `pnpm i18n` kod 0 (pt-BR bez `pt.json` jest pełnym słownikiem, nie nakładką — skrypt wymaga wszystkich kluczy).
4. Kontrola (a): zapis `przeglad_jezyki.pt-BR` i `przeglad_jezyki.fr` (`docs/tresci/rejestr/*.json` → `node docs/tresci/narzedzia/scal-rejestr.mjs`), skróty po nałożeniu (D-345 pkt 3, D-350: z definicjami `terms-def.yaml`); warunek: `wynik-a-pt-BR.md` i `wynik-a-fr.md` „zaliczona” i fragmenty krytyczne bez zmian poza poprawkami A/P2 oraz typografią fr (zmiana spacji, nie sensu).
5. `pnpm run ci` zielone; przegląd D-043 w świeżym kontekście.

## 5. Konfiguracja wydania (jak K3 en, D-349) — ścieżka wrażliwa `app.json`

| Plik | Zmiana |
|---|---|
| `apps/mobile/src/i18n/locales/pt-BR.json`, `fr.json` | słowniki po przeglądzie (krok 4.1) |
| `apps/mobile/src/i18n/slowniki.ts` | `SLOWNIKI = { pl, en, …, 'pt-BR': ptBR, fr }` |
| `apps/mobile/src/i18n/polyfille.ts` | `locale-data/pt.js` (pt-BR: `NAKLADKI['pt-BR'] = 'pt'` → język bazowy `pt`, `konfiguracja.test.ts:34–39`) i `locale-data/fr.js`; oba pliki są w `@formatjs/intl-pluralrules/locale-data/` (sprawdzone: `pt.js`, `pt-PT.js`, `fr.js`) |
| `apps/mobile/app.json` | `supportedLocales.ios` i `.android`: dodać `"pt-BR"`, `"fr"`; `locales["pt-BR"]` → `./locales/systemowe/pt-BR.json`, `locales.fr` → `./locales/systemowe/fr.json` |
| `apps/mobile/locales/systemowe/pt-BR.json`, `fr.json` | `ios.CFBundleDisplayName` i `android.app_name`: „Poker School” (D-369 pkt 2) |
| `apps/mobile/src/i18n/__tests__/jezyk-pt-fr-09.test.ts` | wybór z telefonu: `pt-BR` → pt-BR, `pt` (bez regionu) → pt-BR, `fr-FR`, `fr-CA` → fr; **`pt-PT` → en** (dziś: `jezykZTagu('pt-PT')` = `pt`, łańcuch `pt → pl` bez słownika → ZAPASOWY; pytanie P-AD1); ustawienie ręczne; zmiana bez restartu |
| `docs/lokalizacja/jezyki.md` | wiersze pt-BR i fr „wydany w kodzie” |

Kontrole: `konfiguracja.test.ts` zielony (4 miejsca zgodne), Jest całość, `pnpm run ci`; E2E bez nowych flowów (koszt minut macOS; lista telefonu zamiast).

## 6. Jednostki nieaktualne po zmianach AC w `content/pl` (16 błędnych `{{t:…}}`)

Stan na koniec sesji AD: AC nie wypchnęła zmian w `content/pl` (sprawdzone `git fetch` przed commitem) — 130/130 skrótów zgodnych. Lista 16 błędów (`dowody/przeglad-en-2026-11-09/rozstrzygniecia.md:183–205`) dotyka plików pl, więc po jej nałożeniu nieaktualne staną się (w każdym z dwóch języków) jednostki:

| plik pl | jednostka | skrót źródła w propozycji |
|---|---|---|
| lessons/m3-l1-pozycja.md | content/<j>/lessons/m3-l1-pozycja.md | 4dbbc405ebc2 |
| lessons/m5-l3-czestotliwosc-rozmiar.md | …/m5-l3-czestotliwosc-rozmiar.md | c9e23610057a |
| lessons/m5-l4-bez-pozycji.md | …/m5-l4-bez-pozycji.md | a93f15f223a7 |
| lessons/m7-l1-druga-beczka.md | …/m7-l1-druga-beczka.md | e9c656731273 |
| lessons/m7-l2-polaryzacja.md | …/m7-l2-polaryzacja.md | d3a97308118f |
| lessons/m7-l4-probe-obrona.md | …/m7-l4-probe-obrona.md | 6569876d3a62 |
| lessons/m8-l1-value.md | …/m8-l1-value.md | 233c7e0d490d |
| lessons/m9-l3-rozmiar-geometryczny.md | …/m9-l3-rozmiar-geometryczny.md | 769a804caff1 |
| lessons/m9-l4-plan-trzech-ulic.md | …/m9-l4-plan-trzech-ulic.md | bd85138047c1 |
| lessons/m10-l3-odejscie-od-bazy.md | …/m10-l3-odejscie-od-bazy.md | 86ce1de9ca05 |
| lessons/m11-l1-push-fold.md | …/m11-l1-push-fold.md | ad82176e53ad |
| lessons/m11-l3-icm.md | …/m11-l3-icm.md | d5d56535bd07 |
| lessons/m12-l1-wariancja.md (treść krytyczna) | …/m12-l1-wariancja.md | 036c837fcf24 |
| rules.yaml (R-M12-002 i inne) | content/<j>/rules.yaml | cb5439ccc244 |

Rzeczywistą listę daje po pullu: `node docs/lokalizacja/narzedzia/ocena-propozycji.mjs . <kopie propozycji>` albo sam `--zastosuj` (odrzucenie „źródło zmienione”). Dla każdej:
- **(A, rekomendowane, 0 USD)** jeśli `git diff` pliku pl zmienia wyłącznie znaczniki `{{t:…}}` (sprawdź skryptem: tekst pl po usunięciu znaczników identyczny) — przekład jest nadal poprawny (recenzenci P/F ocenili już te miejsca jako poprawne przekłady błędnego znacznika); podmień `zrodlo_sha256` w kopii propozycji na nowy skrót i przepuść `--zastosuj` (kontrola znaczników liczy się wobec nowego źródła; różnica `{{t:…}}` w md/yaml to ostrzeżenie). Wyjątek od strażnika skrótu — nazwany, z listą plików w zapisie decyzji sesji kodu.
- **(B)** zmiana także tekstu: `--tylko <plik>` (≈ 0,13 USD za lekcję i ≈ 1 USD za rules.yaml na język [OCENA z kosztu rzeczywistego: 5,92 USD / 44 lekcje]; cała lista ≈ 5 USD — w limicie D-359), potem ponowne nałożenie poprawek z list dla tych plików (część może się nie nałożyć — „pominięte”, przegląd ręczny) i dla m12-l1 ponowna kontrola (a).

## 7. Lista telefonu (dopisać do `docs/lokalizacja/lista-telefonu-*.md` po kroku 5)

- T-pf-1: telefon w pt-BR → nazwa pod ikoną „Poker School”, powitanie, „Hoje”, lekcja m0.l1 po portugalsku; terminy jak w `terms-nazwy` („pote”, „sequência”, „dois pares”), „call/fold/check” po angielsku.
- T-pf-2: telefon w fr → j.w. po francusku („grosse blinde”, „quinte”, „mise”); przy dwukropku i znaku zapytania wiersz nie łamie się przed znakiem (spacja nierozdzielająca); « » z odstępem.
- T-pf-3: telefon w pt-PT → aplikacja po angielsku (zachowanie zależne od P-AD1); `fr-CA` → fr.
- T-pf-4: liczby: pt-BR „1.000”, „0,5”, „50%”; fr „1 000”, „0,5”, „50 %” (formatNumber per język); liczba mnoga w licznikach (fr: 0 i 1 → forma one).
- T-pf-5: ekran pomocy i ramka „Odpowiedzialna gra” w pt-BR/fr: numery i nazwy organizacji jak w nakładce `helplines.yaml`; m12-l4 „no mais tardar” / „au plus tard”.
- T-pf-6: słowniczek pt-BR/fr: nazwa lokalna + angielska pod spodem, wyszukiwanie „pote”/„pot” i „quinte”/„straight” (D-369).
- T-pf-7: tytuły i przyciski przy największym tekście, 320 pt: fr/pt-BR są dłuższe od pl (np. „Continuer”, „Continuar”) — obcięcia do roli 04.
