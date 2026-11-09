# de, es, ko, it, vi: kroki dla sesji kodu (rola 09, poz. 3 kolejki nocy)

Stan: 2026-11-09, sesja AI (tylko docs), HEAD bazowy 1c3e752; uzupełnienie ko/it/vi: sesja AJ (tylko docs), HEAD 33fdec3, decyzje D-388 (przegląd ko/it/vi), D-389 (es „pareja mayor”), D-390 (de/ko odesłanie „karta” w m12-l3). Decyzje: D-385 (odrzucenia, nieaktualne jednostki, koszt), D-386 (drugi przegląd de/es, kontrola (a), K-05 de/es), D-387 (przegląd językowy metadanych sklepu, D-383). Dowody: `docs/lokalizacja/dowody/przeklad-de-es-ko-it-vi-2026-11-09.txt`, `docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/`. Wzór: `plan-pt-BR-fr.md` i `plan-ja-zh-Hant.md` (mechanizm K-05, poprawka wzorca URL i polyfille są już w kodzie po D-379/D-380 — tu tylko dane i konfiguracja).

## Zostaje (stan na zamknięcie AJ)

- **Przegląd wszystkich pięciu języków zamknięty.** de, es: sesja AI (161 poprawek) + D4 (AJ, 1). ko, it, vi: sesja AJ — 301 poprawek na kopiach (0 pominiętych, kod 0), kontrola (a) zaliczona w 3/3, szkice K-05 `terms-nazwy-ko/it/vi.yaml`. Raporty i listy: `docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/` (`rozstrzygniecia.md`, sekcja „ko, it, vi”).
- Następny krok: **nałożenie w sesji kodu** (§1–§5) — wszystkie pięć języków albo de+es i osobno ko/it/vi (decyzja koordynatora; listy są niezależne).
- Otwarte terminologiczne [DO USTALENIA] (bez rozstrzygającego źródła): `rozstrzygniecia.md` koniec sekcji ko/it/vi; nie blokują nałożenia (NISKIE/ŚR, formy tłumacza zostają).

## 0. Artefakty (wygasają 2026-11-16)

| przebieg | zawartość | artefakt | sha256 zip (= digest) |
|---|---|---|---|
| 42700455560 | de lessons | 13712135232 | b2f7b010… |
| 42700470707 | es lessons | 13710864058 | bb37dc40… |
| 42701311638 | ko lessons | 13712785439 | 1a1021d1… |
| 42703964212 | it lessons | 13713531627 | 56110c82… |
| 42703970053 | vi lessons | 13713362603 | d47a0ad7… |
| 42707292121 | de+es reszta | 13714991913 | f9f58bfa… |
| 42707298446 | ko+it reszta | 13715857062 | 93eb119d… |
| 42710131602 | vi reszta | 13716755980 (pobrany w AJ; `propozycje.json` a0870ef4…) | 03d592f4… |

Pełne skróty zip i `propozycje.json` w dowodzie. Pobieranie: `mcp__github__actions_get download_workflow_run_artifact` → `curl` do osobnego pustego katalogu.

## 1. Odrzucenia i jednostki nieaktualne (D-385)

- 0 odrzuceń w workflowie (304 jednostki). Przebiegi lekcji szły po pushu AC (935c9cf), więc **procedura „Sesja AC” niepotrzebna** — skróty lekcji i `rules.yaml` zgodne z HEAD.
- Nieaktualne: tylko `apps/mobile/src/i18n/locales/{de,es,ko,it}.json` — źródło `pl.json` zmienione po dispatchu wyłącznie w `welcome.title` (D-384: „PokerGym”). Wariant A (0 USD): w kopii propozycji ustaw `welcome.title` = `"PokerGym"` (przekład ma „Pokerschule” / „Escuela de Póker” / „포커 스쿨” / „Scuola di Poker”) i odśwież `zrodlo_sha256` jednostki na skrót z HEAD; `--zastosuj` sprawdzi resztę wobec HEAD. Wyjątek od strażnika skrótu — nazwany w decyzji sesji kodu (jak D-379), z tą listą 4 plików. vi: dispatch na e67157a (po D-384) — sprawdzone w AJ: vi reszta 21/21 zgodna z HEAD, `welcome.title` = „PokerGym”, bez wariantu A.
- **Sesja AH pracuje równolegle w `content/`**: przed nałożeniem `node docs/lokalizacja/narzedzia/ocena-propozycji.mjs . <kopie>` — każda jednostka z „ZMIENIONE na HEAD” przez wariant A (diff tylko w `{{t:…}}`/marce) albo B (`--tylko`, ≈ 0,13 USD lekcja, ≈ 1 USD rules na język [OCENA]).

## 2. Poprawki przeglądu na kopii propozycji

```
node docs/lokalizacja/narzedzia/poprawki.mjs <de-lekcje>/propozycje.json docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/poprawki-D*.json --wyjscie <de-lekcje>/po.json
node docs/lokalizacja/narzedzia/poprawki.mjs <es-lekcje>/propozycje.json …/poprawki-E*.json --wyjscie <es-lekcje>/po.json
node docs/lokalizacja/narzedzia/poprawki.mjs <de-es-reszta>/propozycje.json …/poprawki-D*.json …/poprawki-E*.json --wyjscie <de-es-reszta>/po.json
```

Oczekiwane (testy recenzentów, każdy kod 0, pominięte 0): D1 23, D2 28, D3 13 (5 lekcje + 8 egzamin), E1 48, E2 32, E3 17 = 161; razem na kopiach: de-lekcje 5, es-lekcje 17, reszta 139, pominięte 0 (sesja AI). Pozycje spoza pliku liczą się jako „poza” — nie błąd. Potem `welcome.title` (§1). **de-lekcje: dołącz `poprawki-D4.json`** (m12-l3:133, D-390) → de-lekcje 6.

ko, it, vi (sesja AJ; katalog jak wyżej, kolejność list ma znaczenie):
```
KO="…/poprawki-K1.json …/poprawki-K1-ujednolicenie.json …/poprawki-K2.json …/poprawki-K3.json …/poprawki-K4.json …/poprawki-A-ko.json"
IT="…/poprawki-I1.json …/poprawki-I2.json …/poprawki-I3.json …/poprawki-A-it.json"
VI="…/poprawki-V1.json …/poprawki-V2.json …/poprawki-V3.json …/poprawki-A-vi.json"
node docs/lokalizacja/narzedzia/poprawki.mjs <ko-lekcje>/propozycje.json $KO --wyjscie <ko-lekcje>/po.json      # 22
node docs/lokalizacja/narzedzia/poprawki.mjs <it-lekcje>/propozycje.json $IT --wyjscie <it-lekcje>/po.json      # 11
node docs/lokalizacja/narzedzia/poprawki.mjs <vi-lekcje>/propozycje.json $VI --wyjscie <vi-lekcje>/po.json      # 9
node docs/lokalizacja/narzedzia/poprawki.mjs <ko-it-reszta>/propozycje.json $KO $IT --wyjscie <ko-it-reszta>/po.json  # 194
node docs/lokalizacja/narzedzia/poprawki.mjs <vi-reszta>/propozycje.json $VI --wyjscie <vi-reszta>/po.json      # 65
```
Oczekiwane (sesja AJ): 301 nałożonych, 0 pominiętych, kod 0 w 5/5; `welcome.title` ko/it = „PokerGym” jest już w K2/I2 — pozostaje tylko odświeżenie skrótu UI ko/it (§1).

## 3. K-05: nazwy terminów (mechanizm D-367 już w kodzie)

- `content/de/terms-nazwy.yaml` ← `docs/lokalizacja/przygotowane/terms-nazwy-de.yaml` (162 klucze, 39 [DO USTALENIA] z formą tłumacza), `content/es/terms-nazwy.yaml` ← `terms-nazwy-es.yaml`. Pomiar znaczników bez formy (propozycje, przed poprawkami): de 1 463 z 8 393, es 705 z 8 401, ko 831, it 1 191, vi 1 270 (same lekcje dla ko/it/vi).
- de: straight = „Straße” w UI i treści (D2; de.wikipedia „Ein Straight, im Deutschen auch Straße”), ulica = „Street” (D1, sklep), „weiter” → „breiter” (D1). **Ujednolicenie form poza próbą (skrypt sesji kodu, raport liczby zamian):** „der Bet” → „die Bet” (m7-l4, m9-l4; 6 miejsc), SPR nijaki → żeński (5), `hohes {{t:two-pair}}` → `hohe {{t:two-pair|zwei Paare}}` (m9-l1:136), „shoven” → „pushen” (lekcje/egzamin m11), „auf der Karte zum verantwortungsvollen Spielen” → ramka „Verantwortungsvolles Spielen” także w `m12-l3-tilt.md:133` (treść krytyczna → ponowna kontrola (a) tylko tego zdania).
- es: call — „igualar” (UI „Igualo”, większość lekcji) zamiast „pagar” (m2-l2, m5-l3, egzamin m2) [rozstrzygnięcie AI: jedna nazwa na pojęcie, forma UI wygrywa]; Button/botón, wet „mojado”/„húmedo”, paired „doblado”/„emparejado” — wg `terms-nazwy-es.yaml` i `E2-terminy.md`; ujednolicenie skryptem jak de.
- es top pair (D-389): w formach `{{t:top-pair|…}}` „pareja máxima” → „pareja mayor”, „Pareja máxima” → „Pareja mayor”, „parejas máximas” → „parejas mayores” (z wielką literą analogicznie; tylko wewnątrz znacznika `top-pair`; ok. 84 miejsc, raport liczby). Źródło: PokerStrategy ES, hasło Pareja-mayor, „se denomina top pair ( pareja mayor )” (odczyt 2026-11-09). K-05 nazwa bez zmian „top pair”.
- `content/ko|it|vi/terms-nazwy.yaml` ← `docs/lokalizacja/przygotowane/terms-nazwy-ko|it|vi.yaml` (162 klucze; [DO USTALENIA]: ko 25, it 52, vi 48 — forma zgodna z przekładem/źródłem częściowym). Konflikty gramatyczne przy znacznikach bez formy: ko 5 partykuł (K2-terminy.md), it 12 (rodzaj „call” — rozwiązane męskim „il call” + 5 miejsc poza próbą), vi 1 w UI (`drill.icm.foldRightChips` „đây sẽ là {{t:call}}”, V2.md).
- **Ujednolicenia poza próbą (skrypt sesji kodu, raport liczby zamian; po listom poprawek):** ko „플랍/프리플랍” → „플롭/프리플롭” w lekcjach/egzaminach, „c벳/씨벳” → „C벳”, „디펜드/디펜스” → „방어”, m12-l3 „변동성” → „분산”, „쓰리 오브 어 카인드” → „트리플”, „플러시 드로” → „플러시 드로우”; it fold „passare/lasciare” (w znaczeniu fold — ręcznie, bo passare bywa checkiem) → „foldare”, „la/una {{t:call}}” → „il/un” (m2-l1, m6-l2 ×2, exams/m8 ×2), „micro limiti” → „microlimiti”, „bui” → „blind” (m3-l2, m12-l3); vi „mở bài” → „mở cược” (ok. 82: modules m3 już w V2, egzaminy m3/m4/m5/m7, lekcje m3/m4), „bộ bài” (ręka) → „tay bài” (6: egzaminy m0/m1, m1-l1, m5-l1), „học phần” → „mô-đun” (m7-l3, m8-l2, m10-l4, m13-l2), m8-l3:55 zgubiony `{{t:big-blind}}` (ostrzeżenie automatyczne).

## 4. Nałożenie i kontrole (jak plan-pt-BR-fr §4)

1. `node scripts/i18n/przeklad-api.mjs --zastosuj <kopia>/po.json` dla każdego pliku → `content/<j>/**`, `apps/mobile/src/i18n/locales/<j>.json`.
2. `pnpm content:build` 0; `pnpm i18n` 0.
3. `przeglad_jezyki.<j>` (`docs/tresci/rejestr/*.json` → `scal-rejestr.mjs`) ze skrótami po nałożeniu; warunek: `wynik-a-<j>.md` „zaliczona” i m12-l1/R-M12-* bez zmian sensu.
4. `pnpm run ci`; przegląd D-043 w świeżym kontekście.

## 5. Konfiguracja wydania (jak D-380)

| Plik | Zmiana |
|---|---|
| `apps/mobile/src/i18n/slowniki.ts` | `SLOWNIKI`/`WYDANE` + de, es, ko, it, vi |
| `apps/mobile/src/i18n/polyfille.ts` | `@formatjs/intl-pluralrules/locale-data/{de,es,ko,it,vi}.js` (sprawdzić istnienie plików) |
| `apps/mobile/app.json` | `supportedLocales.ios/.android` + 5 kodów; `locales.<j>` → `./locales/systemowe/<j>.json` (ścieżka wrażliwa D-043) |
| `apps/mobile/locales/systemowe/<j>.json` | `CFBundleDisplayName`/`app_name` = „PokerGym” (D-384; test `nazwa-pokergym.test.ts` obejmie nowe języki z `app.json locales`) |
| `packages/jezyki` | es-419 → es (nakładka, `jezyki.ts:17`) — sprawdzić, że telefon es-MX/es-US dostaje es; `es` bez regionu → es |
| test `jezyk-5-09.test.ts` | de-AT/de-CH → de, es-MX → es, ko-KR → ko, it-CH → it, vi-VN → vi; ręczny wybór; zmiana bez restartu |

## 6. Typografia i kroje

- **ko (Hangul):** Literata 600 nie ma Hangul → tytuły krojem systemowym semibold — `ko` jest już w `BEZ_LITERATY` (`apps/mobile/src/theme/kroje.ts:14`, odczyt AJ 2026-11-09; D-368/D-380); bez zmian kodu. Łamanie wierszy: koreański ma spacje między słowami — standardowe.
- **vi (diakrytyki złożone, np. ắ ậ ễ ợ ự):** `Literata-SemiBold.ttf` ma wszystkie sprawdzone znaki vi, de, es, it (fontTools, cmap 1 163 glify, brak: 0; sesja AI) → Literata zostaje. **Sprawdzone ponownie w AJ na rzeczywistym przekładzie** (wszystkie znaki przekładu vi i it z propozycji wobec cmap `apps/mobile/assets/fonts/Literata-SemiBold.ttf`, fontTools): vi 206 znaków, it 140 — brakujących liter/interpunkcji 0. Polyfille `@formatjs/intl-pluralrules/locale-data/{ko,it,vi}.js` istnieją. Ryzyko: podwójne znaki nad literą wielką (Ấ, Ể) mogą być przycięte przy ciasnej wysokości wiersza tytułu — punkt listy telefonu T-v-2, nie zmiana kodu teraz [OCENA].
- **de:** cudzysłowy „…“ (dolny-górny) — sprawdzić konsekwencję w przekładzie skryptem przy nałożeniu (raport, nie błąd); długie złożenia („Einstufungstest”, „Modulprüfung”) — obcięcia przycisków do T-d-3.
- **es:** ¿ ¡ na początku pytań/wykrzyknień — sprawdzić skryptem liczność `?` vs `¿` w drillach (raport); es-ES „tú”.
- **it:** apostrof typograficzny vs prosty — bez reguły w REJESTR; zostaje jak przekład. Elizja przed znacznikiem bez formy („l'{{t:…}}”, 78 miejsc, I3) — nazwy K-05 dobrane do elizji; wyjątek exploit („sfruttamento” nie znosi „l'” → forma w treści).
- **ko:** liczba mnoga jedna forma (UI bez `_one/_few/_many` — poprawne, K2); partykuły 은/는, 이/가, 을/를 po `{{parametrze}}` z nazwą układu przeformułowane („족보”, K2); rejestr -니다/-세요, pytania -니까 (K3).
- **vi:** nazwy K-05 małą literą — 116 znaczników bez formy na początku zdania wyrenderuje się małą literą [DO USTALENIA: renderer z wielką literą na początku zdania albo forma w treści; pomiar V2].
- URL jak D-365 (wzorzec już poprawiony w kodzie, D-379): 0 odrzuceń „adresy URL” w 5 językach.

## 7. Lista telefonu (do `docs/lokalizacja/lista-telefonu-*.md` po kroku 5)

- T-d-1: telefon de → „PokerGym” pod ikoną, powitanie, lekcja m0.l1; „Straße” (strit), „Street” (ulica) bez pomyłki; „du”.
- T-d-2: liczby „1.000”, „0,5”, „50 %”; T-d-3: przyciski przy XXXL, 320 pt (długie złożenia).
- T-e-1: es-ES i es-MX → es; „igualar/Igualo”; ¿…?; „ciega grande”.
- T-k-1: ko → tytuły krojem systemowym (bez mieszania z Literatą), -니다/-세요; liczba mnoga (ko: jedna forma).
- T-k-2: ko → „플롭”, „C벳” w lekcji i UI jednakowo; ćwiczenie „kto wygrywa” — zdanie z nazwą układu bez błędnej partykuły (트리플가); m12-l4 i m12-l3 odesłanie do ramki „책임감 있는 게임”.
- T-i-1: it → „tu”, formy terminów; przyciski „Foldo/Fold” (nie „Passo”) i „Check”; „il call”.
- T-i-2: it m12-l4 ramka „Gioco responsabile” — zdanie o powrocie na wyższą stawkę „non prima di…”.
- T-v-1: vi → „bạn”, diakrytyki w tytułach (Literata) i treści; „mở cược” (nie „mở bài”) w module 3; zdania zaczynające się od terminu (mała litera?); T-v-2: wielkie litery z podwójnym znakiem (Ấ, Ể) w tytułach bez przycięcia.
- T-5-1: ramka „Odpowiedzialna gra” i numery pomocy w 5 językach (nakładka `helplines.yaml`).

## Przegląd ko/it/vi — zrobiony (sesja AJ, 2026-11-09)

Wzór de/es (instrukcja wyżej w historii pliku): 9 recenzentów (K/I/V 1–3), przekład zwrotny m12-l1 + R-M12-* bez dostępu do źródła i porównanie w osobnej sesji, test łączny list. Wynik: `docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/rozstrzygniecia.md` (sekcja „ko, it, vi”), raporty K1–K3, I1–I3, V1–V3, `*-terminy.md`, `wynik-a-ko|it|vi.md`, listy `poprawki-*.json`. Liczby cyfrą w ko (101) i vi (81): 0 liczb spoza źródła.
