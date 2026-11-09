# de, es, ko, it, vi: kroki dla sesji kodu (rola 09, poz. 3 kolejki nocy)

Stan: 2026-11-09, sesja AI (tylko docs), HEAD bazowy 1c3e752. Decyzje: D-385 (odrzucenia, nieaktualne jednostki, koszt), D-386 (drugi przegląd de/es, kontrola (a), K-05 de/es), D-387 (przegląd językowy metadanych sklepu, D-383). Dowody: `docs/lokalizacja/dowody/przeklad-de-es-ko-it-vi-2026-11-09.txt`, `docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/`. Wzór: `plan-pt-BR-fr.md` i `plan-ja-zh-Hant.md` (mechanizm K-05, poprawka wzorca URL i polyfille są już w kodzie po D-379/D-380 — tu tylko dane i konfiguracja).

## Zostaje (stan na zamknięcie AI)

- **de, es: przegląd zamknięty** (D1–D3, E1–E3, kontrola (a) zaliczona); listy poprawek gotowe; szkice K-05 `terms-nazwy-de.yaml`, `terms-nazwy-es.yaml`.
- **ko, it, vi: przegląd NIE zrobiony** — następna sesja docs wg tego samego wzoru (instrukcja: sekcja „Przegląd ko/it/vi” niżej). Artefakty ko+it pobrane i ocenione (40/42 na HEAD), vi „reszta” (42710131602) zakończony 22:32, artefakt 13716755980 niepobrany.
- Nałożenie (sesja kodu) dopiero po przeglądzie wszystkich pięciu albo osobno de+es (decyzja koordynatora; rekomendacja: de+es od razu, osobny push = osobne E2E — jak D-380 b, ale tu przegląd ko/it/vi zajmie jeszcze jedną sesję).

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
| 42710131602 | vi reszta | 13716755980 (niepobrany) | 03d592f4… |

Pełne skróty zip i `propozycje.json` w dowodzie. Pobieranie: `mcp__github__actions_get download_workflow_run_artifact` → `curl` do osobnego pustego katalogu.

## 1. Odrzucenia i jednostki nieaktualne (D-385)

- 0 odrzuceń w workflowie (304 jednostki). Przebiegi lekcji szły po pushu AC (935c9cf), więc **procedura „Sesja AC” niepotrzebna** — skróty lekcji i `rules.yaml` zgodne z HEAD.
- Nieaktualne: tylko `apps/mobile/src/i18n/locales/{de,es,ko,it}.json` — źródło `pl.json` zmienione po dispatchu wyłącznie w `welcome.title` (D-384: „PokerGym”). Wariant A (0 USD): w kopii propozycji ustaw `welcome.title` = `"PokerGym"` (przekład ma „Pokerschule” / „Escuela de Póker” / „포커 스쿨” / „Scuola di Poker”) i odśwież `zrodlo_sha256` jednostki na skrót z HEAD; `--zastosuj` sprawdzi resztę wobec HEAD. Wyjątek od strażnika skrótu — nazwany w decyzji sesji kodu (jak D-379), z tą listą 4 plików. vi: dispatch na e67157a (po D-384) → sprawdzić po pobraniu.
- **Sesja AH pracuje równolegle w `content/`**: przed nałożeniem `node docs/lokalizacja/narzedzia/ocena-propozycji.mjs . <kopie>` — każda jednostka z „ZMIENIONE na HEAD” przez wariant A (diff tylko w `{{t:…}}`/marce) albo B (`--tylko`, ≈ 0,13 USD lekcja, ≈ 1 USD rules na język [OCENA]).

## 2. Poprawki przeglądu (de, es) na kopii propozycji

```
node docs/lokalizacja/narzedzia/poprawki.mjs <de-lekcje>/propozycje.json docs/lokalizacja/dowody/przeglad-de-es-ko-it-vi-2026-11-09/poprawki-D*.json --wyjscie <de-lekcje>/po.json
node docs/lokalizacja/narzedzia/poprawki.mjs <es-lekcje>/propozycje.json …/poprawki-E*.json --wyjscie <es-lekcje>/po.json
node docs/lokalizacja/narzedzia/poprawki.mjs <de-es-reszta>/propozycje.json …/poprawki-D*.json …/poprawki-E*.json --wyjscie <de-es-reszta>/po.json
```

Oczekiwane (testy recenzentów, każdy kod 0, pominięte 0): D1 23, D2 28, D3 13 (5 lekcje + 8 egzamin), E1 48, E2 32, E3 17 = 161; razem na kopiach: de-lekcje 5, es-lekcje 17, reszta 139, pominięte 0 (sesja AI). Pozycje spoza pliku liczą się jako „poza” — nie błąd. Potem `welcome.title` (§1).

## 3. K-05: nazwy terminów (mechanizm D-367 już w kodzie)

- `content/de/terms-nazwy.yaml` ← `docs/lokalizacja/przygotowane/terms-nazwy-de.yaml` (162 klucze, 39 [DO USTALENIA] z formą tłumacza), `content/es/terms-nazwy.yaml` ← `terms-nazwy-es.yaml`. Pomiar znaczników bez formy (propozycje, przed poprawkami): de 1 463 z 8 393, es 705 z 8 401, ko 831, it 1 191, vi 1 270 (same lekcje dla ko/it/vi).
- de: straight = „Straße” w UI i treści (D2; de.wikipedia „Ein Straight, im Deutschen auch Straße”), ulica = „Street” (D1, sklep), „weiter” → „breiter” (D1). **Ujednolicenie form poza próbą (skrypt sesji kodu, raport liczby zamian):** „der Bet” → „die Bet” (m7-l4, m9-l4; 6 miejsc), SPR nijaki → żeński (5), `hohes {{t:two-pair}}` → `hohe {{t:two-pair|zwei Paare}}` (m9-l1:136), „shoven” → „pushen” (lekcje/egzamin m11), „auf der Karte zum verantwortungsvollen Spielen” → ramka „Verantwortungsvolles Spielen” także w `m12-l3-tilt.md:133` (treść krytyczna → ponowna kontrola (a) tylko tego zdania).
- es: call — „igualar” (UI „Igualo”, większość lekcji) zamiast „pagar” (m2-l2, m5-l3, egzamin m2) [rozstrzygnięcie AI: jedna nazwa na pojęcie, forma UI wygrywa]; Button/botón, wet „mojado”/„húmedo”, paired „doblado”/„emparejado” — wg `terms-nazwy-es.yaml` i `E2-terminy.md`; ujednolicenie skryptem jak de.
- ko/it/vi: szkice w sesji przeglądu ko/it/vi.

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

- **ko (Hangul):** Literata 600 nie ma Hangul → tytuły krojem systemowym semibold — `ko` jest już w `BEZ_LITERATY` (`apps/mobile/src/theme/kroje.ts:16`, D-368/D-380); bez zmian kodu. Łamanie wierszy: koreański ma spacje między słowami — standardowe.
- **vi (diakrytyki złożone, np. ắ ậ ễ ợ ự):** `Literata-SemiBold.ttf` ma wszystkie sprawdzone znaki vi, de, es, it (fontTools, cmap 1 163 glify, brak: 0; sesja AI) → Literata zostaje. Ryzyko: podwójne znaki nad literą wielką (Ấ, Ể) mogą być przycięte przy ciasnej wysokości wiersza tytułu — punkt listy telefonu T-v-2, nie zmiana kodu teraz [OCENA].
- **de:** cudzysłowy „…“ (dolny-górny) — sprawdzić konsekwencję w przekładzie skryptem przy nałożeniu (raport, nie błąd); długie złożenia („Einstufungstest”, „Modulprüfung”) — obcięcia przycisków do T-d-3.
- **es:** ¿ ¡ na początku pytań/wykrzyknień — sprawdzić skryptem liczność `?` vs `¿` w drillach (raport); es-ES „tú”.
- **it:** apostrof typograficzny vs prosty — bez reguły w REJESTR; zostaje jak przekład.
- URL jak D-365 (wzorzec już poprawiony w kodzie, D-379): 0 odrzuceń „adresy URL” w 5 językach.

## 7. Lista telefonu (do `docs/lokalizacja/lista-telefonu-*.md` po kroku 5)

- T-d-1: telefon de → „PokerGym” pod ikoną, powitanie, lekcja m0.l1; „Straße” (strit), „Street” (ulica) bez pomyłki; „du”.
- T-d-2: liczby „1.000”, „0,5”, „50 %”; T-d-3: przyciski przy XXXL, 320 pt (długie złożenia).
- T-e-1: es-ES i es-MX → es; „igualar/Igualo”; ¿…?; „ciega grande”.
- T-k-1: ko → tytuły krojem systemowym (bez mieszania z Literatą), -니다/-세요; liczba mnoga (ko: jedna forma).
- T-i-1: it → „tu”, formy terminów.
- T-v-1: vi → „bạn”, diakrytyki w tytułach (Literata) i treści; T-v-2: wielkie litery z podwójnym znakiem (Ấ, Ể) w tytułach bez przycięcia.
- T-5-1: ramka „Odpowiedzialna gra” i numery pomocy w 5 językach (nakładka `helplines.yaml`).

## Przegląd ko/it/vi (następna sesja docs)

Instrukcja dla subagentów: jak de/es (sesja AI) — 3 recenzentów na język (R1: rules, spots, areas, modules; R2: UI, terms-def, terminologia + szkic `terms-nazwy-<j>.yaml` na przeczytanych źródłach; R3: m0-l1, m2-l2, m5-l3, m10-l1, m12-l4, egzamin m2), przekład zwrotny m12-l1 + R-M12-* bez dostępu do źródła, porównanie sensu w trzeciej sesji. Wyciągi: skrypt `wyciag.mjs` (propozycje → drzewo plików), kandydaci K-05 (`{{t:klucz|forma}}` × liczba) — opis w `rozstrzygniecia.md` tego katalogu. ko: zwrócić uwagę na „liczby cyframi poza znacznikami” (ostrzeżenia w ko lekcjach: nadmiarowe 10, 5, 8 — prawdopodobnie liczebniki słowne zapisane cyfrą; sprawdzić, czy nie ma liczby spoza `{{n:…}}`).
