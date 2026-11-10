# Recenzja: sesja AZ, `sesja-az-pozycja` @ bff0095 (baza bca751e) — KO-028, D-495

Data: 2026-11-10. Recenzent niezależny (świeży kontekst), tylko odczyt i testy w worktree `rec-az` (usunięty po recenzji).
Zakres: `git diff bca751e...origin/sesja-az-pozycja` (2 commity: 761242d, bff0095).

## Werdykt: **przyjąć po poprawkach**

Brak znalezisk KRYTYCZNYCH i WYSOKICH. Zmiana jest poprawna technicznie i nie psuje niczego, ale realizuje KO-028 tylko częściowo
(15 z 72 kombinacji pozycja × język nadal pokazuje sam skrót, w tym „UTG” na rynku głównym en — dokładnie przypadek ze zgłoszenia),
a deklarowane zachowanie zastępcze nie jest chronione testem (mutacja M5 przeżywa). Poprawki: AZ-01 (test), AZ-02 (opis braków);
AZ-03 do roli 06, AZ-04 do roli 04.

## Znaleziska

| ID | Waga | Plik:linia | Opis | Dowód | Naprawa |
|---|---|---|---|---|---|
| AZ-01 | ŚREDNIE | `apps/mobile/src/features/stol/__tests__/pozycja-nazwa-az.test.ts:14,37-47` | Zachowanie zastępcze („sam skrót, gdy brak nazwy”) nie jest testowane. Lista `BRAKI` służy tylko do tytułu testu, a asercje `toContain(nazwa)` + `toContain(p)` przy nazwie = skrót są tautologiczne (przechodziły też przed zmianą). Podwojenie skrótu „UTG (UTG)” w 11 językach oraz „HJ (HJ)”, „CO (CO)” w ja i zh-Hant nie zostałoby wykryte. | Mutacja M5 (`nazwa.includes(p) && nazwa !== p ? …`): 86/86 testów zielonych, jest kod 0. | Asercje dokładnego brzmienia dla przypadków zastępczych (np. en/fr/ja UTG, ja HJ: `toBe('Your position: UTG.')`) albo ogólna: skrót występuje w linii dokładnie raz, brak `()`, `((`, `undefined`, `{{`. |
| AZ-02 | ŚREDNIE | `docs/decyzje.md:331` (D-495), `docs/programista/plan-08.md:1307`, `pozycja-nazwa-az.test.ts:14` | Lista braków w D-495 i w teście jest niepełna. Sam skrót dają nie tylko fr, pt, pt-BR (brak klucza) i ja, zh-Hant (null), lecz także: UTG w en (zadeklarowane), de, es, it, ko, vi (nazwa w `terms-nazwy` to dosłownie „UTG”) oraz HJ i CO w ja i zh-Hant (nazwa = „HJ”, „CO”). Razem 15 z 72 komórek bez zmiany względem stanu sprzed KO-028. | Tabela niżej; `content/{de,es,it,ko,vi}/terms-nazwy.yaml` `utg: "UTG"`, `content/{ja,zh-Hant}/terms-nazwy.yaml` `hijack: "HJ"`, `cutoff: "CO"`. | Poprawić D-495 i plan-08 (pełna lista 15 przypadków), przekazać roli 06 jako otwarte. |
| AZ-03 | ŚREDNIE (rola 06, backlog) | `apps/mobile/src/features/stol/uklad.ts:99-102`; `content/terms.yaml:393-399` | Cel KO-028 niespełniony dla UTG poza pl: „Your position: UTG.” (en, rynek główny US) jest tym samym niezrozumiałym tekstem, który zgłoszono. W pl działa („UTG (under the gun)”), bo polski renderer dopisuje nazwę angielską; w pozostałych językach renderer daje sam skrót. Nie blokuje wydania (nie jest regresją ani błędem merytorycznym), ale zgłoszenie nie powinno być zamknięte jako wykonane w całości. | Tabela: wiersze UTG × 11 języków, HJ/CO × ja, zh-Hant. | Rola 06: nazwa rozwinięta w glosariuszu (np. en „under the gun (UTG)”) albo decyzja, że w `nazwaPozycji` przy nazwie = skrót dopisuje się `TERMS[klucz].en`; do rozstrzygnięcia poza tą gałęzią. |
| AZ-04 | NISKIE (rola 04) | `apps/mobile/src/i18n/locales/pl.json:578` + `table.position.*` | W pl linia ma dwa objaśnienia w nawiasach pod rząd: „Twoja pozycja (position): mały blind (small blind, SB).” Mechanizm jest ten sam co w lekcjach (`{{t:…}}`, nawias przy pierwszym użyciu), ale `trDeep` renderuje każdy klucz słownika jako osobną jednostkę, więc nawias pojawia się zawsze, przy każdym zadaniu, także po lekcji M3; w lekcji nawias stoi raz na jednostkę. Brzmienie niespójne między pozycjami: „mały blind (small blind, SB)” / „Button (BTN)” / „UTG (under the gun)” (wielkość liter i kolejność z glosariusza). To nie odstępstwo od mechanizmu, tylko jego skutek w krótkiej linii; ocena czytelności należy do roli 04. | Tabela pl; `apps/mobile/src/i18n/index.ts:31-33`, `features/drills/terms.ts:41-46`. | Zgłosić roli 04: czy w tej linii zostawić „(position)” obok nawiasu pozycji. Bez zmiany w tej gałęzi. |
| AZ-05 | NISKIE | `apps/mobile/src/features/stol/uklad.ts:101` | `nazwa.includes(p)` to dopasowanie podciągu bez granicy słowa; dziś poprawne dla wszystkich 72 kombinacji, ale przyszła nazwa zawierająca litery skrótu wewnątrz słowa (np. „CO” w wyrazie pisanym wersalikami) pominęłaby skrót. | Odczyt kodu; tabela bez błędów. | Opcjonalnie dopasowanie całego tokenu (`\bSKRÓT\b`); backlog. |
| AZ-06 | NISKIE | `apps/mobile/src/features/stol/__tests__/pozycja-uklad-az.test.ts:16,22-27` | Test układu: (a) czyta źródło `Stol.tsx` i sprawdza tylko wiersz `return tekstKart ?` (linia 42), nie wariant z kartami (`Stol.tsx:83`, styl `przypis`); (b) szerokość znaku 0,62 em nie dotyczy pism CJK i hangulu (ok. 1 em), choć wynik (≤ 3 wiersze) i tak się zgadza, bo najdłuższa jest linia pl. To oszacowanie, nie pomiar. | Odczyt testu; `Stol.tsx:42,83`. | Backlog; właściwy dowód to zrzut 320 pt / największy tekst (lista telefonu). |
| AZ-07 | NISKIE | `docs/programista/dowody/az-ci-2026-11-10.log:1` | Log CI kończy się `exit 0`, ale w nagłówku ma „baza bca751e + zmiany robocze”, bez SHA commitu (761242d / bff0095): przebieg sprzed commitu, nie da się go przypisać do stanu gałęzi. | `grep -nE 'bff0095\|761242d'` na logu: brak trafień; `tail`: `0 błędów, 0 uwag`, `exit 0`. | Przy następnej sesji uruchamiać CI na commicie i wpisywać jego SHA. |

Nie znaleziono: „undefined”, pustych ani podwójnych nawiasów, surowych `{{t:…}}`, dublowania skrótu, tekstu polskiego w innych językach.
Nazwy angielskie w it, pt, pt-BR, vi (i „Small Blind” w de) pochodzą z `content/<język>/terms-nazwy.yaml` (takie są nazwy glosariusza), nie z błędu.

## 1. Tabela pozycja × język (faktyczny wynik `opisKart({position}, t)`)

Wygenerowane tymczasowym testem jest z i18n aplikacji (`npx jest …zz-rec-tabela.test.ts`, kod 0; plik usunięty).
Etykieta czytnika (`opisKart(…, {nazwy:true})`, czyli `accessibilityLabel` w `Stol.tsx:37`) jest dla samej pozycji **identyczna** z tekstem widocznym we wszystkich 72 przypadkach; z kartami np. pl BTN: „Twoja pozycja (position): Button (BTN). Twoje karty: as kier i król karo.”
**Pogrubienie** = sam skrót (bez nazwy).

| Język | UTG | HJ | CO | BTN | SB | BB |
|---|---|---|---|---|---|---|
| pl | Twoja pozycja (position): UTG (under the gun). | Twoja pozycja (position): Hijack (HJ). | Twoja pozycja (position): Cutoff (CO). | Twoja pozycja (position): Button (BTN). | Twoja pozycja (position): mały blind (small blind, SB). | Twoja pozycja (position): duży blind (big blind, BB). |
| en | **Your position: UTG.** | Your position: hijack (HJ). | Your position: cutoff (CO). | Your position: button (BTN). | Your position: small blind (SB). | Your position: big blind (BB). |
| de | **Deine Position: UTG.** | Deine Position: Hijack (HJ). | Deine Position: Cutoff (CO). | Deine Position: Button (BTN). | Deine Position: Small Blind (SB). | Deine Position: Big Blind (BB). |
| es | **Tu posición: UTG.** | Tu posición: hijack (HJ). | Tu posición: cutoff (CO). | Tu posición: botón (BTN). | Tu posición: ciega pequeña (SB). | Tu posición: ciega grande (BB). |
| fr | **Votre position : UTG.** | Votre position : hijack (HJ). | Votre position : cutoff (CO). | Votre position : bouton (BTN). | Votre position : petite blinde (SB). | Votre position : grosse blinde (BB). |
| it | **La tua posizione: UTG.** | La tua posizione: hijack (HJ). | La tua posizione: cutoff (CO). | La tua posizione: button (BTN). | La tua posizione: small blind (SB). | La tua posizione: big blind (BB). |
| pt | **A sua posição: UTG.** | A sua posição: hijack (HJ). | A sua posição: cutoff (CO). | A sua posição: button (BTN). | A sua posição: small blind (SB). | A sua posição: big blind (BB). |
| pt-BR | **Sua posição: UTG.** | Sua posição: hijack (HJ). | Sua posição: cutoff (CO). | Sua posição: button (BTN). | Sua posição: small blind (SB). | Sua posição: big blind (BB). |
| vi | **Vị trí của bạn: UTG.** | Vị trí của bạn: hijack (HJ). | Vị trí của bạn: cutoff (CO). | Vị trí của bạn: button (BTN). | Vị trí của bạn: small blind (SB). | Vị trí của bạn: big blind (BB). |
| ko | **내 포지션: UTG.** | 내 포지션: 하이잭 (HJ). | 내 포지션: 컷오프 (CO). | 내 포지션: 버튼 (BTN). | 내 포지션: 스몰 블라인드 (SB). | 내 포지션: 빅 블라인드 (BB). |
| ja | **あなたのポジション：UTG。** | **あなたのポジション：HJ。** | **あなたのポジション：CO。** | あなたのポジション：ボタン (BTN)。 | あなたのポジション：スモールブラインド (SB)。 | あなたのポジション：ビッグブラインド (BB)。 |
| zh-Hant | **你的位置：UTG。** | **你的位置：HJ。** | **你的位置：CO。** | 你的位置：按鈕位 (BTN)。 | 你的位置：小盲 (SB)。 | 你的位置：大盲 (BB)。 |

Najdłuższa: pl/SB, 55 znaków. Sam skrót: 15 z 72 (UTG × 11 języków poza pl; HJ i CO w ja, zh-Hant).
Uwaga drobna: w ja i zh-Hant nawias skrótu jest półszerokościowy ze spacją („ボタン (BTN)”) przy pełnoszerokościowej interpunkcji zdania — do oceny przez recenzenta językowego (niesprawdzone merytorycznie).

## 2. Zakres diffu (22 pliki)

`apps/mobile/src/components/__tests__/Stol-08.test.tsx`, `apps/mobile/src/features/stol/__tests__/pozycja-nazwa-az.test.ts` (nowy), `…/pozycja-uklad-az.test.ts` (nowy), `apps/mobile/src/features/stol/uklad.ts`, `apps/mobile/src/i18n/locales/{de,en,es,fr,it,ja,ko,pl,pt-BR,pt,vi,zh-Hant}.json` (po 8 wierszy, identyczny blok `position` ze znacznikami), `apps/mobile/src/i18n/locales/pl.kontekst.json`, `docs/decyzje.md`, `docs/lokalizacja/lista-telefonu-en.md`, `docs/lokalizacja/lista-telefonu-pl.md`, `docs/programista/dowody/az-ci-2026-11-10.log`, `docs/programista/plan-08.md`.

`git diff --name-only … | grep -E '^content/|packages/postep|packages/domena|apps/mobile/src/data|\.github/workflows|app\.json|\.db$|\.sqlite|generated'` → brak trafień (kod 1). Żadna ścieżka wrażliwa z `CLAUDE.md` nie jest dotknięta. Zgodne z deklaracją autora.

## 3. Testy i mutacje

- `npx jest src/features/stol src/components/__tests__/Stol src/i18n` (w `apps/mobile`): 17 zestawów, 188 testów, kod 0.
- `pnpm i18n:kod`: „błędy: 0, uwagi: 403”, 12 języków, kod 0 (nowa uwaga informacyjna: klucz dynamiczny `uklad.ts:100`).
- `pnpm typecheck`: kod 0.
- `Stol-08.test.tsx:61,69-70`: 3 literały w 2 testach zmienione z „BB.” / „BTN.” na pełne nowe brzmienie; nadal `toBe` / `getByText` z dokładnym tekstem — asercje nie osłabione, zmiana uzasadniona.
- Nowe testy: test pl (dokładne brzmienie SB i UTG) i test „wartość klucza = sam znacznik” są rzeczowe; pętla 72 przypadków jest rzeczowa tam, gdzie nazwa ≠ skrót, a tautologiczna dla 15 przypadków zastępczych (AZ-01).

| Mutacja w `nazwaPozycji` (`uklad.ts:99-102`) | Wynik (pozycja-*.test + Stol-08, 86 testów) |
|---|---|
| M1: zawsze sam skrót (`nazwa = p`) | 59 czerwonych, kod 1 — wykryta |
| M2: pominięcie skrótu (`return nazwa`) | 51 czerwonych, kod 1 — wykryta (tylko `pozycja-nazwa-az`; Stol-08 zielony, bo BB i BTN w pl mają skrót w nazwie) |
| M3: zły klucz dla BB (`sb`) | 13 czerwonych, kod 1 — wykryta |
| M4: skrót dopisywany zawsze („… (SB, SB)”/„UTG (under the gun) (UTG)”) | 3 czerwone, kod 1 — wykryta tylko przez dokładne asercje pl |
| M5: podwojenie tylko gdy nazwa = skrót („UTG (UTG)”, „HJ (HJ)”) | **0 czerwonych, kod 0 — NIEWYKRYTA** (AZ-01) |

Po każdej mutacji `git checkout apps/mobile/src/features/stol/uklad.ts`; `git status --short` na końcu puste.

Log `docs/programista/dowody/az-ci-2026-11-10.log`: końcówka `tresci:rejestr … 0 błędów, 0 uwag`, `exit 0`; SHA commitu brak, jest tylko baza bca751e „+ zmiany robocze” (AZ-07). Pełnego `pnpm run ci` nie uruchamiałem (zgodnie z poleceniem).

## 4. Układ i zrozumiałość (z kodu)

- Ucięcie: nie. Wiersz samej pozycji to `<Text style={styl.tresc}>` (`Stol.tsx:42`), wariant z kartami `<Text style={styl.przypis}>` (`Stol.tsx:83`); żaden nie ma `numberOfLines` ani `maxFontSizeMultiplier` (jedyne `numberOfLines` są na miejscach przy stole, `Stol.tsx:122,125`, których zmiana nie dotyczy). Tekst zawija się i wydłuża kolumnę.
- Zasłanianie: tekst stoi w zwykłym przepływie kolumny (`View` z `gap`, brak pozycjonowania absolutnego), więc przesuwa treść w dół, nie nachodzi na nią. Ekran sesji jest przewijany (`session.tsx:358`, `Screen … scrollRef`).
- 320 pt: szacunek autora (3 wiersze przy 17 pt, 7 przy ok. 312%) jest wiarygodny rachunkowo dla pisma łacińskiego; przy największym tekście w wierszu mieści się ok. 8 znaków, więc słowa typu „(position):” łamią się w środku — tak było już przed zmianą. To koszt ok. 2 dodatkowych wierszy w pl, bez utraty treści.
- Spójność ze wzorcem terminów: AZ-04 (ten sam mechanizm, ale dwa nawiasy w jednej krótkiej linii i nawias przy każdym zadaniu) — zgłoszenie do roli 04, nie bloker.
- Spójność wewnątrz stołu: opis z przebiegiem akcji (`etykietaStolu`, `opisReki`, `table.seat*`) nadal używa samych skrótów pozycji; KO-028 dotyczył tylko linii bez przebiegu, więc to poza zakresem, ale warto odnotować dla roli 04.

## 5. Maestro (`apps/mobile/e2e/`)

`grep -rnE 'Twoja pozycja|Your position|yourPosition|\(position\)|under the gun|duży blind|mały blind' apps/mobile/e2e` → brak trafień. `grep -rnE 'stol-rama|miejsce-' apps/mobile/e2e` → brak trafień. Żaden flow nie zależy od starego brzmienia; zmiana nie dodaje ani nie zmienia testID.

## 6. Autor, decyzja, sekrety

- `git log --format='%an <%ae>' bca751e..origin/sesja-az-pozycja`: 2 × `Łukasz Karwowski <336954459+lkarwowski494@users.noreply.github.com>` — zgodne.
- D-495: jest, `docs/decyzje.md:331` (1 wystąpienie), z odrzuconymi opcjami i odwołaniem do Treningu (brak analogii, odczyt 2026-11-10). Treść wymaga uzupełnienia listy braków (AZ-02).
- Sekrety: przeszukanie dodanych wierszy (klucze, tokeny, klucze prywatne, adresy e-mail poza noreply) — brak; trafienia to wyłącznie nazwy testów w logu („max_tokens”, „token tylko do …”).

## Niesprawdzone

- Wygląd na urządzeniu / symulatorze: 320 pt, największy tekst, VoiceOver (brak symulatora; ocena tylko z kodu).
- Czy ekran oceny poziomu (`PierwszeUruchomienie.tsx:141`, `EkranPytaniaOceny`) jest przewijany — nie potwierdzone odczytem (potwierdzony tylko `session.tsx`).
- Pełne `pnpm run ci` na bff0095 (celowo nie uruchamiane); log autora nie jest z commitu.
- Poprawność językowa nazw w 11 językach (pochodzą z `terms-nazwy.yaml`, poza diffem) i typografia nawiasów w ja, zh-Hant, ko.
- Prawdziwość odwołania do Treningu w D-495 (repo zewnętrzne nie było czytane).
- Dokument polecenia `docs/koordynacja/polecenia/AZ.md` i zasady roli 04 poza `CLAUDE.md` nie były czytane; ocena „w ramach systemu roli 04” oparta na tym, że zmiana nie dotyka stylów ani komponentów, tylko treści linii.
