# KO-028 (rola 06, sesja BC): nazwy pozycji przy stole — było → jest

Data: 2026-11-10. Decyzja: D-520 (`docs/decyzje.md`). Gałąź `sesja-bc-pozycje`, baza fbb2d15.

Metoda: skrypt (scratchpad sesji, `tabela.ts`) renderuje dla 12 języków `table.yourPosition` i `table.position.*` z locales gałęzi `origin/sesja-az-pozycja` rendererem `renderTermsIn` (`packages/content-schema/src/terms.ts`) i stosuje regułę `nazwaPozycji` z `origin/sesja-az-pozycja:apps/mobile/src/features/stol/uklad.ts` (skrót dopisany w nawiasie, gdy nie stoi w nazwie jako osobne słowo). Treść „było” = `git archive fbb2d15 content`, „jest” = drzewo robocze po zmianie. Walidacja: tabela „było” jest identyczna z tabelą recenzji `recenzja-az-bff0095.md` §1 (72 komórki).

## Zmienione komórki (16 z 72)

| Język | Pozycja | Było | Jest |
|---|---|---|---|
| pl | UTG | Twoja pozycja (position): UTG (under the gun). | Twoja pozycja (position): pierwsza pozycja po blindach (under the gun, UTG). |
| en | UTG | Your position: UTG. | Your position: under the gun (UTG). |
| de | UTG | Deine Position: UTG. | Deine Position: Under the Gun (UTG). |
| es | UTG | Tu posición: UTG. | Tu posición: under the gun (UTG). |
| fr | UTG | Votre position : UTG. | Votre position : under the gun (UTG). |
| it | UTG | La tua posizione: UTG. | La tua posizione: under the gun (UTG). |
| pt | UTG | A sua posição: UTG. | A sua posição: under the gun (UTG). |
| pt-BR | UTG | Sua posição: UTG. | Sua posição: under the gun (UTG). |
| vi | UTG | Vị trí của bạn: UTG. | Vị trí của bạn: under the gun (UTG). |
| ko | UTG | 내 포지션: UTG. | 내 포지션: 언더 더 건 (UTG). |
| ja | UTG | あなたのポジション：UTG。 | あなたのポジション：アンダーザガン (UTG)。 |
| ja | HJ | あなたのポジション：HJ。 | あなたのポジション：ハイジャック (HJ)。 |
| ja | CO | あなたのポジション：CO。 | あなたのポジション：カットオフ (CO)。 |
| zh-Hant | UTG | 你的位置：UTG。 | 你的位置：槍口位 (UTG)。 |
| zh-Hant | HJ | 你的位置：HJ。 | 你的位置：Hijack (HJ)。 |
| zh-Hant | CO | 你的位置：CO。 | 你的位置：關煞位 (CO)。 |

Pozostałe 56 komórek bez zmian (BTN, SB, BB we wszystkich językach; HJ, CO poza ja i zh-Hant). Najdłuższa linia: 76 znaków (pl UTG; dotąd 55, pl SB).

## Pełna tabela „jest”

| Język | UTG | HJ | CO | BTN | SB | BB |
|---|---|---|---|---|---|---|
| pl | Twoja pozycja (position): pierwsza pozycja po blindach (under the gun, UTG). | Twoja pozycja (position): Hijack (HJ). | Twoja pozycja (position): Cutoff (CO). | Twoja pozycja (position): Button (BTN). | Twoja pozycja (position): mały blind (small blind, SB). | Twoja pozycja (position): duży blind (big blind, BB). |
| en | Your position: under the gun (UTG). | Your position: hijack (HJ). | Your position: cutoff (CO). | Your position: button (BTN). | Your position: small blind (SB). | Your position: big blind (BB). |
| de | Deine Position: Under the Gun (UTG). | Deine Position: Hijack (HJ). | Deine Position: Cutoff (CO). | Deine Position: Button (BTN). | Deine Position: Small Blind (SB). | Deine Position: Big Blind (BB). |
| es | Tu posición: under the gun (UTG). | Tu posición: hijack (HJ). | Tu posición: cutoff (CO). | Tu posición: botón (BTN). | Tu posición: ciega pequeña (SB). | Tu posición: ciega grande (BB). |
| fr | Votre position : under the gun (UTG). | Votre position : hijack (HJ). | Votre position : cutoff (CO). | Votre position : bouton (BTN). | Votre position : petite blinde (SB). | Votre position : grosse blinde (BB). |
| it | La tua posizione: under the gun (UTG). | La tua posizione: hijack (HJ). | La tua posizione: cutoff (CO). | La tua posizione: button (BTN). | La tua posizione: small blind (SB). | La tua posizione: big blind (BB). |
| pt | A sua posição: under the gun (UTG). | A sua posição: hijack (HJ). | A sua posição: cutoff (CO). | A sua posição: button (BTN). | A sua posição: small blind (SB). | A sua posição: big blind (BB). |
| pt-BR | Sua posição: under the gun (UTG). | Sua posição: hijack (HJ). | Sua posição: cutoff (CO). | Sua posição: button (BTN). | Sua posição: small blind (SB). | Sua posição: big blind (BB). |
| vi | Vị trí của bạn: under the gun (UTG). | Vị trí của bạn: hijack (HJ). | Vị trí của bạn: cutoff (CO). | Vị trí của bạn: button (BTN). | Vị trí của bạn: small blind (SB). | Vị trí của bạn: big blind (BB). |
| ko | 내 포지션: 언더 더 건 (UTG). | 내 포지션: 하이잭 (HJ). | 내 포지션: 컷오프 (CO). | 내 포지션: 버튼 (BTN). | 내 포지션: 스몰 블라인드 (SB). | 내 포지션: 빅 블라인드 (BB). |
| ja | あなたのポジション：アンダーザガン (UTG)。 | あなたのポジション：ハイジャック (HJ)。 | あなたのポジション：カットオフ (CO)。 | あなたのポジション：ボタン (BTN)。 | あなたのポジション：スモールブラインド (SB)。 | あなたのポジション：ビッグブラインド (BB)。 |
| zh-Hant | 你的位置：槍口位 (UTG)。 | 你的位置：Hijack (HJ)。 | 你的位置：關煞位 (CO)。 | 你的位置：按鈕位 (BTN)。 | 你的位置：小盲 (SB)。 | 你的位置：大盲 (BB)。 |

## Zmiana poza linią stołu (UI, `locales/*.json`, nie zmieniane w tej sesji)

`table.tableSizeHint9` ma w 11 językach goły `{{t:utg}}` i pokazuje teraz nazwę: pl „…trzy wczesne pozycje (position): pierwsza pozycja po blindach (under the gun, UTG), UTG+1 i UTG+2.”, en „…before LJ: under the gun, UTG+1 and UTG+2.”. Jeśli wolicie dawny tekst: `{{t:utg|UTG}}` w tym kluczu (sesja kodu).

## Treść lekcji, egzaminów, reguł i spotów

`compileContent` 12 języków: po zamianie 345 gołych `{{t:utg}}` na `{{t:utg|UTG}}` (commit fef9d57) wynik bajtowo identyczny z bazą; po zmianie nazwy (commit z D-520) różni się wyłącznie wpis terminu `utg` (pl, abbr) i skrót `hash` bazy.
