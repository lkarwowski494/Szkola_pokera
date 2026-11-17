# Rola 04 (fix) · M2-koordynator-napraw-006 · etykieta ręki w siatce lekcji: podkładka i Dynamic Type
Data 2026-11-17 · gałąź `claude/sesja-is-naprawy-p1` · polecenie `audit/M1-2026-11-17/naprawy/polecenia/04-studio-projektowe-p1.md` · zgoda właściciela KO-132 („Pełna naprawa teraz (zalecane)” = (a) + (c)) · decyzja D-2020 (`docs/decyzje/IS.md`).

## 0. Środowisko (E0)
Linux, Node 22.23.4, git na gałęzi roboczej (czysty stan na starcie, HEAD 0eadd8dd). Playwright 1.63.0 z Chromium z `/opt/pw-browsers` (instalacja w scratchpadzie, nie w projekcie). Bez Xcode i symulatora: zrzuty z makiety HTML, pomiar na telefonie jako pozycja listy kontrolnej. SF Pro niedostępny; przybliżenie: Inter 600/800. Push, PR i scalanie poza zakresem (polecenie). Dane: baza treści `apps/mobile/assets/content/tresc-d0b124291f-pl.db` (34 spoty, każdy 1 grupa).

Klasyfikacja: M2-koordynator-napraw-006 = **D** (defekt dostępności, SP-04 + SP-07), kierunek rozstrzygnął właściciel (KO-132): (a) `onFelt` tylko na polu pełnym, (c) podkładka `surface` pod etykietą. Bez nowych barw; nowe są tylko tokeny geometrii `siatka` (wymiary rysunku). Kod aplikacji pisze rola 08 według sekcji 2.

## 1. Stan i problem (przed)
- Reguła dziś: `apps/mobile/src/components/RangeGrid.tsx:35` — etykieta `onFelt` przy pokryciu ≥ 0,85, inaczej `ink`; etykieta `fontSize: 8` skaluje się bez limitu (`apps/mobile/src/components/RangeGrid.tsx:74`), kropka „•” 8 pt jako tekst (`apps/mobile/src/components/RangeGrid.tsx:75`).
- Pola częściowe: tekst leży na zieleni i na `surface` naraz; `ink` na zieleni 3,92 (light) / 3,26 (lightHigh) < 4,5; `onFelt` na `surface` 1,02.
- Dynamic Type: przy AX5 etykieta 8 × 3,12 = 24,96 pt w polu 22–31 pt; w makiecie wszystkie 169 etykiet ucięte („A…”, „K…”) we wszystkich motywach i szerokościach (`dowody/pomiar-geometrii.json`, wiersze „przed”). Zrzuty: `dowody/zblizenie-przed-light-390-ax5.png`, `dowody/siatka-przed-light-390-ax5.png`, `dowody/siatka-przed-light-320-ax5.png`.
- Treść pl: f = 0: 3039 pól; 0 < f ≤ 0,15: 203; 0,15 < f < 0,85: 146; 0,85 ≤ f < 1: 296 (w tym 181 z 0,99 < f < 1); f = 1: 2062; najmniejsze f > 0: 0,001 (rachunek: `narzedzia/rozklad-czestosci.py`, wynik `dowody/rozklad-czestosci.txt`).

## 2. Specyfikacja dla roli 08
Tokeny: `siatka` w `docs/design/tokeny.ts:204` (kopia 1:1 w `apps/mobile/src/theme/tokeny.ts`), para `docs/design/tokeny.ts:155`, para złożona `docs/design/tokeny.ts:168`. Opis w systemie: `docs/design/design-spec.md:57` (sekcja „RangeGrid”).

**2.1 Kolor etykiety (KO-132 (a)).** `pelne = (spot.groups[0]?.freqs[i] ?? 0) >= 1`. Pole pełne → kolor `onFelt`, bez podkładki. Każde inne pole (f = 0, 0 < f < 1, 0,999, pole z grupą 2 lub 3) → `ink` na podkładce. Stała `POKRYCIE_ETYKIETY_NA_SUKNIE` (0,85) znika. *Dlaczego:* tylko tekst w całości na jednym tle ma ≥ 4,5 w czterech motywach.

**2.2 Podkładka (KO-132 (c)).** `View` wokół `Text` etykiety: `backgroundColor: tk.surface`, `paddingHorizontal: siatka.podkladkaPoziom` (1 pt), bez promienia, `maxWidth: pole − 2`, wyśrodkowana w polu (jak dziś etykieta). Wysokość = `lineHeight` etykiety (bez `paddingVertical`). Pasek pod spodem bez zmian (kolor, krycie 0,85, szerokość). Na polu f = 0 podkładka jest niewidoczna (ten sam kolor); zostaje, żeby reguła miała jedną gałąź („`ink` ⇔ podkładka”). Odstęp 1 pt to wymiar rysunku, nie odstęp układu (wyjątek od jednostki 4 pt, nazwany w komentarzu tokenu).

**2.3 Rozmiar etykiety i Dynamic Type.** Czysta funkcja w `apps/mobile/src/theme/skalowanie.ts` (wzór w komentarzu `siatka`):
`wymiaryEtykietySiatki(pole, skala) = { fontSize: r, lineHeight: r × 1,25 }`, gdzie
`r = min(8 × min(max(skala, 1), 1,3), 0,5 × pole / 1,25, (pole − 2 × (1 + 3 + 1)) / 1,25, (pole − 2 − 2 × 1) / 2,2)`.
- `pole` = szerokość siatki z `onLayout` / 13; przed pierwszym pomiarem `(useWindowDimensions().width − 2 × odstep.l) / 13`. `skala` = `useWindowDimensions().fontScale` (odświeża się przy zmianie w Ustawieniach).
- `Text` etykiety: `allowFontScaling={false}`, `fontSize`/`lineHeight` z funkcji, `numberOfLines={1}`, `adjustsFontSizeToFit` (zabezpieczenie, gdy SF Pro okaże się szerszy niż 2,2 em).
- Uzasadnienie dla AX5: pole ma stałą szerokość 22–31 pt, więc etykiety nie da się powiększyć do 25 pt bez ucięcia (dziś 169/169 ucięte). Etykieta jest rysunkiem jak miejsca przy stole (D-122): rośnie do granicy pola (10,4 pt od 375 pt, 8,25 pt na 320 pt), a treść o siatce niosą tytuł, legenda i etykieta VoiceOver, które skalują się bez limitu. Analogia: Trening (`lkarwowski494/trening` @2d97581, odczyt 2026-11-17) `boardDigitSize` w `lib/theme.ts`, wiersze 84–92, limit 1,3 = `NUM_SCALE_MAX` (wiersz 35).

| szerokość ekranu (pole) | skala < 1 i 1,0 | 1,12 | 1,24 | 1,35 – AX5 (3,12) |
|---|---|---|---|---|
| 320 pt (22,15) | 8,00 / 10,00 | 8,25 / 10,31 | 8,25 / 10,31 | 8,25 / 10,31 |
| 375 pt (26,38) | 8,00 / 10,00 | 8,96 / 11,20 | 9,92 / 12,40 | 10,17 / 12,72 |
| 390 pt (27,54), 430 pt (30,62) | 8,00 / 10,00 | 8,96 / 11,20 | 9,92 / 12,40 | 10,40 / 13,00 |
(`fontSize` / `lineHeight` w pt; poniżej 1,0 etykieta nie maleje, bo 8 pt to już dolna granica czytelności rysunku.)

**2.4 Kropka klasy niepewnej.** `View` (nie znak „•”): koło średnicy `siatka.znakSrednica` (3 pt, `borderRadius` 1,5), `position: 'absolute'`, `top`/`right` = `siatka.znakOdstep` (1 pt), kolor `ink` w każdym polu (bez zmiany koloru względem dziś). Nie skaluje się z tekstem; trzeci człon wzoru gwarantuje ≥ 1 pt między kropką a podkładką. `accessibilityElementsHidden`/`importantForAccessibility="no"` (znaczenie niesie legenda „mieszana”). *Dlaczego koło:* znak 8 pt przy 320 pt dotykał podkładki (makieta), a znak tekstowy zależy od metryk kroju.

**2.5 Testy akceptacyjne (czerwone na dzisiejszym kodzie z właściwego powodu):**
1. `wymiaryEtykietySiatki`: wartości z tabeli 2.3 (±0,01) i niezmienniki dla pola 22,15–31,4 i skali 0,8–3,12: `r × 2,2 + 4 ≤ pole`, `lineHeight ≤ pole / 2`, `lineHeight ≤ pole − 10`, `r ≥ 8`.
2. RangeGrid, 4 motywy: pole f = 1 → etykieta `onFelt`, rodzic bez `backgroundColor`; pola f ∈ {0; 0,001; 0,15; 0,5; 0,85; 0,999} → etykieta `ink`, rodzic z `backgroundColor = surface`; kontrast etykiety do tła, na którym leży (podkładka albo `zloz(felt1, 0,85, surface)`) ≥ 4,5. Zastępuje test progu `apps/mobile/src/components/__tests__/RangeGrid-etykieta-kontrast-08.test.tsx:79` (0,84/0,85 → 0,999/1) i gwarancję ≥ 3 dla pól pośrednich.
3. RangeGrid: etykieta ma `allowFontScaling === false`, `fontSize`/`lineHeight` = `wymiaryEtykietySiatki` dla zdarzenia `layout` siatki 288/358/398 pt i `fontScale` 1 oraz 3,12 (atrapa `useWindowDimensions`).
4. Kropka: `View` 3 × 3, `top`/`right` 1, kolor `ink`; para „znak klasy niepewnej na polu w zakresie” ≥ 3 zostaje.
5. Treść pl (strażnik grup 2 i 3): każdy spot ma 1 grupę albo każda grupa g ≥ 2 ma kropkę `ink` ≥ 3 do `zloz(kolor g, 0,85, surface)` w 4 motywach (dziś przechodzi: 34/34 spotów z 1 grupą; padnie przy pierwszym spocie z grupą `warn` w ciemnych motywach, 2,23).
6. Mutanty, które muszą paść: próg z powrotem 0,85; bez podkładki; `allowFontScaling` domyślne; kropka jako tekst bez limitu.
Po zmianie: `pnpm run ci` zielone; zrzut z telefonu wg T-SIATKA (sekcja 6).

## 3. Kontrast (WCAG 2.x, `docs/design/narzedzia/kontrast.mjs`, pary z `narzedzia/pary-siatki.mjs`)
Wejście `dowody/pary-siatki.json`; sukno = `felt1` z kryciem 0,85 na `surface`, zaokrąglenie 8 bit.

| para (pierwszy plan / tło / krycie / próg) | light | lightHigh | dark | darkHigh |
|---|---|---|---|---|
| etykieta f = 1: `onFelt` / sukno (`felt1` 0,85 na `surface`) / 4,5 | **4,55** | 5,49 | 8,97 | 10,47 |
| etykieta na podkładce: `ink` / `surface` / – / 4,5 | 18,17 | 18,17 | 13,48 | 13,48 |
| kropka: `ink` / sukno / 0,85 / 3 | 3,92 | **3,26** | 7,87 | 9,19 |
| kropka: `ink` / `surface` / – / 3 | 18,17 | 18,17 | 13,48 | 13,48 |
| grupa 2 kropka: `ink` / `warn` 0,85 na `surface` / 3 | 4,23 | 4,23 | **2,23 BRAK** | **2,23 BRAK** |
| grupa 3 kropka: `ink` / `cardBlue` 0,85 na `surface` / 3 | 3,62 | 3,62 | 6,95 | 6,95 |
| wykres: pasek grupy 1 / `surface` / 0,85 / 3 | 4,63 | 5,58 | **1,71 BRAK** | **1,47 BRAK** |
| odrzucone: `ink` na suknie bez podkładki / 4,5 | 3,92 | 3,26 | 7,87 | 9,19 |
| odrzucone: `onFelt` na `surface` / 4,5 | 1,02 | 1,02 | 15,36 | 15,36 |

Wynik narzędzia: kod 1, wszystkie BRAK to wiersze grupy 2 (dziś nieużywane, strażnik test 5), paska w ciemnych motywach (nowe znalezisko 011, stan sprzed zmiany, poza zakresem) i par odrzuconych. Pary etykiety i kropki dla treści pl: 0 poniżej progu w czterech motywach.

## 4. Dowody (makieta HTML + Playwright, spot `vs-open.btn-vs-co`: 11 pól pośrednich, 20 klas niepewnych)
Skrypt `narzedzia/makieta-siatki.mjs` (dane `narzedzia/spot-btn-vs-co.json`); pomiar `dowody/pomiar-geometrii.json`: 2 tryby × 4 motywy × 320/390/430 × domyślny/AX5.
- Przed, jasny 390: `dowody/siatka-przed-light-390.png`, AX5: `dowody/siatka-przed-light-390-ax5.png`; zbliżenia `dowody/zblizenie-przed-light-390.png`, `dowody/zblizenie-przed-light-390-ax5.png`.
- Po, jasny 390: `dowody/siatka-po-light-390.png`, AX5: `dowody/siatka-po-light-390-ax5.png`; zbliżenia `dowody/zblizenie-po-light-390.png`, `dowody/zblizenie-po-light-390-ax5.png`; 320: `dowody/siatka-po-light-320.png`, `dowody/siatka-po-light-320-ax5.png`, `dowody/zblizenie-po-light-320.png`, `dowody/zblizenie-po-light-320-ax5.png`.
- Arkusze 4 motywów (wiersz 1 domyślny, wiersz 2 AX5): `dowody/arkusz-przed-390.png`, `dowody/arkusz-po-390.png`, `dowody/arkusz-przed-320.png`, `dowody/arkusz-po-320.png`.
- Pomiar „po”, 24 przypadki: ucięte 0, poza polem 0, poza podkładką 0; przy 390/430 odstęp kropka–podkładka 2,19–5,22 pt; przy 320 pt 1,00 (domyślny) i 0,84 (AX5) — w makiecie obramowanie pola renderuje się jako 1 pt, w RN `hairlineWidth / 2` ≈ 0,17 pt, więc w aplikacji ok. 1,8 pt. Pomiar „przed”: ucięte 169/169 przy AX5 w każdym motywie i szerokości.

Krytyka zrzutu „po” (usterki najpierw):
1. Ciemne motywy: zielony pasek prawie zlewa się z `surface` (1,71/1,47), więc wykres częstości jest słabo czytelny niezależnie od etykiety → znalezisko 011.
2. Pole 0,99 < f < 1 (np. K7s 0,998) ma jasną podkładkę na prawie pełnej zieleni; wygląda jak „dziura”. Zgodne z KO-132 (a): pole nie jest pełne i to widać. Bez zmiany.
3. Paski f < ok. 0,05 (0,001–0,02) mają szerokość poniżej 1 pt i znikają; ograniczenie rozdzielczości wykresu sprzed zmiany, podkładka go nie pogarsza (pasek stoi przy lewej krawędzi, podkładka zaczyna się ≥ 1 pt dalej).
4. Na 320 pt podkładka zajmuje prawie całą szerokość pola; koniec paska widać tylko nad i pod nią (pasma ok. 6 pt). Wystarcza do odczytu, ale na 320 pt bez zapasu.
Zalety: etykieta czytelna i nieucięta przy AX5 (dziś 169/169 ucięte), jedna reguła koloru, bez nowych barw, pasek nadal od lewej krawędzi i widoczny nad i pod podkładką.

## 5. Przypadki brzegowe
| przypadek | etykieta | podkładka | kropka |
|---|---|---|---|
| f = 0 | `ink` 18,17/13,48 | jest, niewidoczna | `ink` na `surface` |
| 0 < f ≤ 0,05 | `ink` na podkładce | jest; pasek przy lewej krawędzi widoczny obok niej, gdy ≥ 1 pt | `ink` na `surface` |
| 0,15 < f < 0,85 (146 pól) | `ink` na podkładce (było 3,92/3,26) | koniec paska widać nad i pod nią | `ink` na `surface` lub zieleni |
| 0,85 ≤ f < 1 (296 pól, w tym 0,999) | `ink` na podkładce (było `onFelt`, ryzyko 1,02) | jest | `ink` na zieleni ≥ 3,26 |
| f = 1 (2062 pola) | `onFelt` 4,55–10,47 | brak | `ink` na zieleni ≥ 3,26 |
| grupy 2 i 3 (dziś 0 spotów) | `ink` na podkładce ≥ 13,48 | jest | `warn` w ciemnych 2,23 < 3 → strażnik test 5 i tokeny siatek F27b przed pierwszym takim spotem |
| skala tekstu < 1 | 8 pt (bez zmniejszania) | jak domyślnie | stała |
| AX1–AX5 | 8,25 (320 pt) – 10,4 pt | ≤ pół pola | stała, ≥ 1 pt od podkładki |
| „Pogrubiony tekst” | szerokość „AQo” 2,10 em < 2,2 em | — | — |

## 6. Lista kontrolna telefonu (T-SIATKA, właściciel na buildzie TestFlight)
Lekcja z siatką „Button, CO (cutoff) otworzył (open) na 2,5bb”, jasny motyw: (1) tekst domyślny: wszystkie etykiety całe, pola częściowe (np. A9s, T9s) mają białą podkładkę pod etykietą, pasek widać nad i pod nią; (2) Ustawienia → Dostępność → Większy tekst, AX5: etykiety całe (bez „…”), nie wychodzą poza pole, nie nachodzą na kropki; (3) „Zwiększ kontrast” i ciemny motyw: to samo; (4) „Pogrubiony tekst”: „AQo”, „KQo” całe. Zrzut przy AX5 do `docs/design/dowody/`. Wynik negatywny w (2) lub (4) → rola 04 zwiększa `szerokoscEm`.

## 7. Nowe znalezisko (poza zakresem, nie naprawiane)
### 04-studio-projektowe-011 · Wykres częstości w siatce lekcji prawie niewidoczny w ciemnych motywach
- Pozycja listy kontrolnej: SP-04 · Poziom: P1 · Realność: realny · Pewność: wysoka · Rodzaj: P (nowa barwa w siatce)
- Dowód: `dowody/pary-siatki.json` + kontrast.mjs: pasek grupy 1 (`felt1` 0,85 na `surface`) do `surface` 1,71 (dark), 1,47 (darkHigh) < 3 (WCAG 2.2, 1.4.11); grupa 3 (`cardBlue`) 1,94; zrzut `dowody/arkusz-po-390.png` (kolumny 3–4).
- Mechanizm: barwa paska `tk.felt1` w `apps/mobile/src/components/RangeGrid.tsx:21` (tablica `colors`) jest sukienną zielenią dobraną pod tekst `onFelt`, nie pod sąsiedztwo granatowego `surface`; stan sprzed tej naprawy.
- Opcje: (a) jaśniejsza zieleń wykresu w ciemnych motywach jako token siatki (F27b), z parami pasek/`surface` ≥ 3 i `onFelt` na pasku ≥ 4,5 — nowa barwa, pełna zgodność; (b) obwódka końca paska w `ink` 1 pt (kształt niesie granicę, barwy bez zmian) — więcej kresek w gęstej siatce; (c) bez zmiany do upublicznienia (wyjątek F27b, D-284) — niezgodność 1.4.11 w ciemnym motywie. Rekomendacja: (a) razem z tokenami siatek F27b.
- Test akceptacyjny: para „pasek siatki do `surface`” ≥ 3 w 4 motywach w `paryZlozone`, zielona w `kontrast-pary-08`.
- Status: otwarte (do decyzji koordynatora/właściciela).

## 8. Zmiany i commity
- `docs/design/tokeny.ts` + `apps/mobile/src/theme/tokeny.ts` (1:1): `siatka`, para „etykieta ręki w siatce na podkładce (pole niepełne)”, para złożona przemianowana na „etykieta ręki na polu pełnym (…)”.
- `docs/design/design-spec.md`: sekcja `RangeGrid`, wpis w „Otwarte”.
- `docs/decyzje/IS.md`: D-2020 (z puli D-2010…D-2029; D-2011…D-2019 zarezerwowane dla roli 06).
- Ten wynik, `narzedzia/`, `dowody/`.
- `pnpm run ci` na drzewie z tymi zmianami: kod 0 (`dowody/ci-koniec.txt`); testy motywu i RangeGrid: 9 zestawów, 91 testów zielonych.
- Ścieżki wrażliwe (lista w CLAUDE.md): nie dotknięte; przegląd w świeżym kontekście nie jest wymagany.
- Commit: patrz odpowiedź końcowa (jeden commit, „[M2-koordynator-napraw-006]”).

## 9. Otwarte
- Implementacja i testy 2.5: rola 08. Pomiar SF Pro na telefonie (T-SIATKA); do tego czasu `szerokoscEm` 2,2 to przybliżenie z Inter (2,07/2,10 em) z zapasem ok. 5%.
- 04-studio-projektowe-011 (decyzja). Tokeny barw siatek F27b (D-284) — zależą od 011.
- Etykieta 8 pt jest poniżej minimum tekstu iOS 11 pt (wzorce roli); przyjęte wcześniej jako rysunek siatki, bez zmiany w tej naprawie.
