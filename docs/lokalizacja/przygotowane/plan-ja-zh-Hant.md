# ja i zh-Hant: kroki dla sesji kodu (rola 09, poz. 3 kolejki nocy)

Stan: 2026-11-09, sesja AB (tylko docs), HEAD bazowy 583f799. Decyzje: D-365 (przyczyny odrzuceń), D-366 (drugi przegląd i kontrola (a)), D-367 (K-05: nazwy terminów w języku), D-368 (krój CJK). Dowody: `docs/lokalizacja/dowody/przeklad-ja-zh-Hant-2026-11-09.txt`, `docs/lokalizacja/dowody/przeglad-ja-zh-Hant-2026-11-09/`.

Kolejność ma znaczenie: K-05 (krok 3) musi wejść przed nałożeniem treści, bo bez niego ok. 1 349 znaczników w ja i 981 w zh-Hant pokaże łacińską nazwę angielską w środku tekstu („call後のpot”).

## 0. Artefakty (wygasają 2026-11-16)

Pobierz trzy artefakty `raport-przekladu` (przebiegi 42677941726, 42677958807, 42682266650; id 13701526861, 13702171129, 13704291515), każdy do osobnego pustego katalogu; sprawdź sha256 zip i `propozycje.json` z dowodu. Skróty źródeł (130/130) były zgodne z HEAD 583f799; jeśli `content/pl` zmieni się przed nałożeniem, `--zastosuj` odrzuci jednostkę („źródło zmienione”) → dotłumaczenie `--tylko` (≈ 0,1–0,3 USD za plik lekcji [OCENA], w limicie D-359 ≤ 5 USD).

## 1. Poprawka kontroli adresów URL (D-365) — ścieżka `scripts/i18n/`

- `scripts/i18n/wspolne.mjs:215`: wzorzec `adresy URL` `/https?:\/\/[^\s"'<>)\]]+/g` łapie pełnoszerokościową interpunkcję CJK (`、：）；，「`) jako część adresu, bo w ja/zh nie ma spacji po adresie. Zmiana: wykluczyć z klasy znaki `　-〿`, `぀-ヿ`, `一-鿿`, `＀-￯` i obciąć końcową interpunkcję ASCII `[.,;:]+$` w funkcji mapującej (po obu stronach porównania, więc „…100bb,” w pl = „…100bb” w ja).
- Test czerwony przed zmianą (`przeklad-api.test.mjs`): wpis z `source: "… https://x.org/a, https://y.org/b: „cytat”"` i przekład `"… https://x.org/a、https://y.org/b：「cytat」"` → dziś powód „adresy URL”, po zmianie 0 powodów; oraz przypadek odwrotny (zmieniony adres nadal odrzucony).
- Wynik oczekiwany (symulacja w sesji AB): rules.yaml ja 6 pól i zh-Hant 70 pól → 0 różnic adresów; 0 USD ponownego przekładu.

## 2. Poprawki przeglądu na kopii propozycji (D-366)

```
node docs/lokalizacja/narzedzia/poprawki.mjs <katalog>/propozycje.json docs/lokalizacja/dowody/przeglad-ja-zh-Hant-2026-11-09/poprawki-ja.json docs/lokalizacja/dowody/przeglad-ja-zh-Hant-2026-11-09/poprawki-zh-Hant.json --wyjscie <katalog>/propozycje-po-przegladzie.json
```

Dla każdego z trzech plików propozycji; „pominięte” = 0 (kod 0; sprawdzone w sesji AB: nałożone 21 + 27 + 128 = 176, po nich `kontrolaPropozycji` 130/130). Lista i powody: `rozstrzygniecia.md` w katalogu przeglądu. Poprawka m10-l1 ja (KRYT) zdejmuje jedyne realne odrzucenie — `--tylko` niepotrzebne (0 USD).

## 3. K-05: nazwa terminu w języku dla `{{t:klucz}}` bez formy (D-367) — ścieżki `packages/content-schema/`, `tools/content-build/` (D-043)

1. Nowy plik na język: `content/<j>/terms-nazwy.yaml` (`klucz: nazwa`), start z `docs/lokalizacja/przygotowane/terms-nazwy-ja.yaml` i `terms-nazwy-zh-Hant.yaml` (szkic z najczęstszej formy tłumacza; wiersze `[DO USTALENIA]` i `[WIELE FORM]` rozstrzyga tabela terminów z przeglądu — `J2-terminy.md`, `Z2-terminy.md`; `null` = skrót albo brak → zachowanie dzisiejsze).
2. `renderTermsBare` (`packages/content-schema/src/terms.ts:114–121`): `form ?? nazwyJezyka?.[key] ?? (skrót ? t.pl : t.en)`; nazwy z bazy języka (content-build czyta plik jak `terms-def.yaml`, `definicje.ts`); en bez pliku — bez zmian (D-287).
3. Strażnik w content-build: klucze ⊆ `terms.yaml`, wartości niepuste, bez znaczników; test czerwony przed zmianą (ja: `{{t:call}}` → „コール”, en: `{{t:call}}` → „call”, brak pliku → nazwa angielska).
4. Słowniczek w ja/zh-Hant: dziś (D-354) poza pl — termin angielski + definicja. Pytanie produktowe P-AB1 (przekazanie): pokazać nazwę lokalną + angielską. Do decyzji zostaje D-354 bez zmian.
5. Kontrola jednej nazwy na pojęcie (CLAUDE.md): po nałożeniu policz formy `{{t:k|forma}}` różne od `terms-nazwy` (raport, nie błąd — formy odmienione są dozwolone).

## 4. Nałożenie i kontrole

1. `node scripts/i18n/przeklad-api.mjs --zastosuj <katalog>/propozycje-po-przegladzie.json` dla trzech plików → 130 plików (ja 65, zh-Hant 65): `content/ja/**`, `content/zh-Hant/**`, `apps/mobile/src/i18n/locales/{ja,zh-Hant}.json`. Uwaga: plik w `locales/` = język wydany (D-346) — albo od razu krok 6, albo słownik do `docs/lokalizacja/przygotowane/` jak en.
2. `pnpm content:build` kod 0 (liczba baz bez zmian, ADR 0005: baza na każdy język; ja i zh-Hant przestają brać treść z łańcucha zastępczego en → pl); `pnpm i18n` kod 0.
3. Kontrola (a): zapis `przeglad_jezyki.ja` i `przeglad_jezyki.zh-Hant` dla 11 twierdzeń (`docs/tresci/rejestr/*.json` → `node docs/tresci/narzedzia/scal-rejestr.mjs`), skróty z `--skroty` liczone PO nałożeniu (jak en, D-345 pkt 3); warunek: wynik `wynik-a-ja.md` i `wynik-a-zh-Hant.md` „zaliczona” i poprawki nie zmieniły fragmentów krytycznych poza tymi, które sprawdził przekład zwrotny.
4. `pnpm run ci` zielone; przegląd D-043 w świeżym kontekście (ścieżki: `tools/content-build/`, `scripts/i18n/`, `app.json`).

## 5. Krój CJK (D-368) — `apps/mobile/src/theme/kroje.ts`, `tokens.ts`

- Literata 600 nie ma znaków CJK (jezyki.md:91). Dziś tytuł w ja/zh-Hant dostaje `fontFamily: 'Literata-SemiBold'`: łacinka i cyfry w Literacie, znaki CJK z zastępczego kroju systemu — mieszany krój w jednym tytule [OCENA: zachowanie fallbacku iOS do potwierdzenia na telefonie].
- Zmiana: `krojTytulu(zaladowany, skala, jezyk)` → `undefined` (krój systemowy semibold) dla pism Jpan/Hant/Kore (lista z `@szkola/jezyki`, pismo języka), tak jak już od AX1; indeks karty bez zmian (cyfry i litery łacińskie). Test: `krojTytulu(true, 1, 'ja') === undefined`, `'en'` → Literata.
- Han w ja vs zh-Hant: przy języku aplikacji ustawionym ręcznie inaczej niż telefon iOS może dobrać kształty znaków z innego wariantu (np. 直, 骨, 角) [OCENA, niesprawdzone] → punkt T-cjk-2 listy telefonu; naprawa dopiero po potwierdzeniu (np. jawny krój `Hiragino Sans` dla ja i `PingFang TC` dla zh-Hant).
- Dynamic Type i łamanie: CJK bez spacji — sprawdzić tytuły i przyciski na 320 pt (AX5) zrzutem web (procedura roli 04) i na telefonie.

## 6. Konfiguracja wydania (jak K3 en, 3b54c26; D-349) — osobny krok, ścieżka wrażliwa `app.json`

| Plik | Zmiana |
|---|---|
| `apps/mobile/src/i18n/locales/ja.json`, `zh-Hant.json` | słowniki po przeglądzie (z kroku 4.1) |
| `apps/mobile/src/i18n/slowniki.ts` | `SLOWNIKI = { pl, en, ja, 'zh-Hant': zhHant }` |
| `apps/mobile/src/i18n/polyfille.ts` | `locale-data/ja.js` i `locale-data/zh.js` (dla zh-Hant plik bazowy `zh`; test `konfiguracja.test.ts:34–39` liczy język bazowy `split('-')[0]`; `node_modules/@formatjs/intl-pluralrules/locale-data/` ma `ja.js`, `zh.js`, nie ma `zh-Hant.js`) |
| `apps/mobile/app.json` | `supportedLocales.ios` i `.android`: dodać `"ja"`, `"zh-Hant"` (plugin `expo-localization` 58.0.5 przyjmuje BCP-47 i dla `zh-Hant` dodaje kwalifikatory `zh-rTW`, `zh-rHK`, `zh-rMO`: `plugin/build/withExpoLocalization.js:94–100`); `locales.ja` → `./locales/systemowe/ja.json`, `locales.zh-Hant` → `./locales/systemowe/zh-Hant.json` |
| `apps/mobile/locales/systemowe/ja.json`, `zh-Hant.json` | `CFBundleDisplayName` / `app_name`: nazwa pod ikoną — pytanie P-AB2 (przekazanie); do decyzji „Poker School” jak en (D-349) |
| `apps/mobile/src/i18n/__tests__/jezyk-ja-zh-09.test.ts` | wybór z telefonu: `ja-JP` → ja; `zh-Hant-TW`, `zh-TW`, `zh-HK` → zh-Hant; `zh-Hans-CN` → en (ZAPASOWY; `packages/jezyki/src/jezyki.ts:40–58`); ustawienie ręczne; zmiana bez restartu |
| `docs/lokalizacja/jezyki.md` | wiersze ja i zh-Hant „wydany w kodzie” |

Kontrole: `konfiguracja.test.ts` zielony (4 miejsca zgodne), Jest całość, `pnpm run ci`; E2E: flow `08-drugi-jezyk` bez zmian (en); nowe flowy dla ja/zh-Hant — nie w tym kroku (koszt minut macOS; lista telefonu zamiast).

## 7. Lista telefonu (dopisać do `docs/lokalizacja/lista-telefonu-*.md` po kroku 6)

- T-cjk-1: telefon w ja → nazwa pod ikoną, powitanie, „Dziś”, lekcja m0.l1 po japońsku; terminy w tekście po japońsku (żadnego „call”, „pot” łacinką poza skrótami UTG, BTN, VPIP).
- T-cjk-2: aplikacja ustawiona ręcznie na ja przy telefonie w zh-Hant (i odwrotnie): kształt znaków 直 骨 角 jak w danym języku.
- T-cjk-3: tytuły i słowo stopnia w ja/zh-Hant przy XXXL i AX5, 320 pt: bez obcięć, krój jednolity.
- T-cjk-4: `Intl` (liczby w treści: `{{n:…}}` w zapisie ja/zh-Hant, procent bez spacji), daty w statystykach.
- T-cjk-5: ekran pomocy i ramka „Odpowiedzialna gra” w ja/zh-Hant: numery i nazwy organizacji jak w nakładce `helplines.yaml`.
