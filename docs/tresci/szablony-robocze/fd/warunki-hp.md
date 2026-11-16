# Warunki generatora dla SC-16, 18, 21, 26, 27, 30 (rola 06 → rola 08 / HO)
Stan: 2026-11-16 · Sesja HP (06 build) · Decyzje: `docs/decyzje/HP.md` D-1715…D-1721 · Źródła: `docs/tresci/odczyty/hp-2026-11-16.tsv` (26 cytatów, przeczytane dziś) · Szkice: `fd/pl/sc-NN.yaml`, `fd/en/sc-NN.yaml`

Werdykty jak w `grading.ts:35`: `compliant` / `acceptable` / `inaccuracy` / `mistake`. Reguła `heuristic` daje najwyżej `inaccuracy` (D-1052). „Klasa ręki” = `classifyHolding` (`packages/poker-core/src/holding.ts:42`: `pairKind`, `draw.outs`); progów bota `HOLDING_LIMITS` nie używać jako reguły kursu (D-1053). Każdy szablon: jedna oczekiwana akcja na poziom (`bounds.<poziom>.expected`); wyjaśnienia są jedne na akcję i działają dla każdego poziomu.

## Podsumowanie: co trzeba w silniku
| Szablon | Proponowany `kind` | Nowe w schemacie / generatorze | Wyrocznia testu (BR-GEN-003) | Pozycja w EX |
|---|---|---|---|---|
| SC-16 | `check-raise` (flop, BB wobec c-betu BTN) | akcje `fold`, `call`, `raise-big`, opcjonalnie `raise-small`; `multipliers` (krotność c-betu) na akcję; lista akcji per poziom (`bounds.<poziom>.actions`) | werdykt z tabeli niżej + rachunek ceny dla BTN: dopłata ÷ (pula po przebiciu + dopłata) | 08-EX-7 |
| SC-18 | `turn-action` (turn, otwierający IP po c-becie i sprawdzeniu) | klasa karty turnu `turnClass` (`overcard`), filtr ręki „turn paruje kartę gracza, flop bez pary gracza”; akcje `check`, `bet-big`, opcjonalnie `bet-small`; lista akcji per poziom | tabela niżej (bez rachunku) | 08-EX-6 |
| SC-21 | `turn-action` (jw.) | `pairKind ∈ {second}` / `{low}` per poziom; filtr stołu i turnu; akcje `check`, `bet-big` | tabela niżej | 08-EX-6 |
| SC-26 | `spr-call` (flop, rywal all-in) | `sprRange` [min, max]; `pairKind`/kicker per poziom; akcje `call`, `fold`; znacznik `{{w:spr}}` | cena = s ÷ (1 + 2s) z `math.ts` (`calc: R-M9-002`), werdykt z tabeli | 08-EX-5 |
| SC-27 | `flop-size` z `mode: geometric` | `small` = 1/3, `big` = f geometryczne z SPR (`geometricBetFraction`, `math.ts`); `sprRange` dla T; znacznik `{{w:rozmiar}}` (f jako ułamek puli) | f z `geometricBetFraction` niezależnie od generatora: łańcuch 3 zakładów f wpłaca cały stack (±0,5 bb) | 08-EX-4 |
| SC-30 | `nit-3bet` (preflop) | eksport `equityVsRange` (`scenario-gen.ts:475`), zakres „górne x%” wg equity169, `vpip` z listy; akcje `call`, `fold`; znacznik `{{w:vpip}}` | equity klasy wobec górnych x% z macierzy, liczone w teście osobną funkcją, ≤ cena − 0,03 | 08-EX-8 |

Nowe znaczniki tekstu `{{w:…}}` (wartości z wariantu, nie liczby treści): `{{w:spr}}` (SC-26, SPR z 1 miejscem po przecinku, np. „2,1”), `{{w:rozmiar}}` (SC-27, f w procentach puli), `{{w:vpip}}` (SC-30, VPIP w procentach). Jeśli HO woli inną nazwę, zmienia ją w szkicach (tekst bez innych zmian).

## SC-16 (M6) check-raise mocnym drawem — Ś T
- Linia: 6-max, 100 bb; BTN otwiera (`pf.open-size`), SB pas, BB (gracz) sprawdza; flop: BB czeka, BTN c-bet 1/3 puli (`cbet.size.small`). Decyzja gracza na flopie.
- Ręka gracza (losowana z zakresu obrony `vs-open.bb-vs-btn`): bez pary z kartą gracza (`pairKind = null`) i draw z kartą gracza: draw do koloru (obie karty gracza w jednym kolorze i dwie karty tego koloru na flopie) albo strit otwarty z kartą gracza; w obu przypadkach `outs ≥ 8`.
- Stół (odrzucanie): niesparowany; nie trzy karty jednego koloru; bez gotowego strita (`straightPossible = false`); nie trzy karty od dziesiątki w górę (UP ep1: na stołach broadway wobec BTN 3,2×; przy tej regule obie krotności i tak są ≥ `xr.mult.low`, ale szkic trzyma się przykładu 4,5×).
- Akcje i werdykty:

| Akcja | Krotność c-betu | Werdykt | Podstawa |
|---|---|---|---|
| `raise-big` | `xr.mult.example` (4,5) | `compliant` | R-M6-008 (UP „Flush draws make for good check-raises”, „Open-enders should check-raise often”); R-M6-010 (UP ep1 „Use a 4.5x raise vs. smaller c-bets”) |
| `call` | — | `compliant` | ręka mieszana (ADR-04, D-1722): UP ep1 „You don’t always want to raise your high-equity draws”; UP check-raise-lucid Tip #3 (solver, Q94 dwukolorowy): „check-calling is still preferred” |
| `fold` | — | `inaccuracy` | R-M6-006 (kontynuujesz drawami wobec małego c-betu); **nie** `draw-price` (D-1301) |
| `raise-small` (tylko T) | `xr.too-small.mult` (1,5) | `inaccuracy` | R-M6-010: krotność < `xr.mult.low`; BTN potrzebuje tylko ok. `eq.vs-xr.too-small` equity |

- Poziomy: Ś `expected: [raise-big]`, akcje {fold, call, raise-big}; T `expected: [raise-big]`, akcje {fold, call, raise-small, raise-big}.
- Bez decyzji (generator nie losuje): średnie pary (DV, D-1053), set i dwie pary (D-1717), c-bet ≥ ½ puli.

## SC-18 (M7) second barrel na nadkarcie — Ś T
- Linia: 6-max, 100 bb; BTN (gracz) otwiera, BB sprawdza; flop tęczowy (`suits = rainbow`), niesparowany; BB czeka, BTN c-bet 1/3, BB sprawdza; turn; BB czeka. Decyzja gracza na turnie.
- Turn: `turnClass = overcard` ⇔ ranga(turn) > max(rangi flopu); turn nie daje trzeciej karty koloru ani gotowego strita na stole.
- Ręka gracza: z zakresu otwarcia `rfi.btn`; na flopie bez pary z kartą gracza i bez drawa `outs ≥ 8`; turn paruje kartę gracza (najwyższa para na turnie, `pairKind = top` po turnie).
- Akcje i werdykty:

| Akcja | Rozmiar | Werdykt | Podstawa |
|---|---|---|---|
| `bet-big` | 2/3 puli | `compliant` | R-M7-001: GW „Overcards are generally slightly better for the preflop raiser than BB.”; PC „The best turn card for a wide flop bettor is an overcard to the board”, „a huge chunk of your missed range just became top pair” |
| `check` | — | `acceptable` | heuristic („częściej”), D-1052 |
| `bet-small` (tylko T) | 1/3 puli | `inaccuracy` | R-M7-005: GW „we usually won’t use a ⅓ size on the turn IP on rainbow boards” |

- Poziomy: Ś `expected: [bet-big]`, akcje {check, bet-big}; T `expected: [bet-big]`, akcje {check, bet-small, bet-big}.
- **Nie wdrażać DV SC-18b** (turn niski/parujący → czekanie `compliant`): podważone w D-1716 (GW: overbet dobry także na turnie „2”).

## SC-21 (M7) średnia para na turnie: czekanie — Ł Ś
- Linia jak SC-18 (BTN gracz IP, c-bet 1/3 sprawdzony, BB czeka na turnie), 100 bb (≥ 60 bb; przy 20 bb GW: „Second pair bets more often.”).
- Flop: z kartą od króla w górę (wysoka karta), tęczowy, niesparowany. Turn: nie paruje stołu, nie daje trzeciej karty koloru ani gotowego strita, nie jest nadkartą (żeby nie mieszać z SC-18).
- Ręka gracza na turnie: dokładnie jedna para z kartą gracza, `outs < 8`; Ł: `pairKind ∈ {low}` (trzecia lub niższa para), Ś: `pairKind = second`.
- Akcje: `check` `compliant`, `bet-big` (2/3 puli) `inaccuracy` (R-M7-003; GW „Third pair, second pair, and even most top pairs strictly check.”). Oba poziomy `expected: [check]`.
- Bez decyzji: najwyższa para (D-1053), stack ≤ 40 bb.

## SC-26 (M9) niski SPR: najwyższa para gra o stack — Ł Ś
- Linia: turniej (MTT bez ante w liczeniu), BTN otwiera, BB (gracz) sprawdza; stack efektywny przed rozdaniem 12,5–15 bb; flop: BB czeka, BTN all-in. SPR = stack za pulą ÷ pula na flopie (R-M9-001), generator przyjmuje tylko SPR ∈ [1,8; 2,3] (GW: „5.5bb in the pot and 12bb in the effective stacks, for an SPR just over 2”).
- Ręka gracza (z zakresu obrony): Ł: overpara albo najwyższa para z kickerem A lub K; Ś: najwyższa para z kickerem ≤ Q. Bez gotowego koloru/strita na stole; stół niesparowany.
- Akcje: `call` `compliant`, `fold` `mistake` (GW: „Any top pair or better is good enough to stack off, even with no fold equity”; przykład solvera bez wyjątków w strefie, D-1052). Ocena: `calc: R-M9-002` (cena s ÷ (1 + 2s), przy SPR 2 = `eq.jam.spr2`).
- Bez T do 08-EX-3 (D-1304). Bez decyzji: druga para, SPR ≥ 3.

## SC-27 (M9) rozmiar geometryczny w puli 3-betowanej — Ś T
- Linia: 6-max; gracz na BTN 3-betuje otwarcie CO do `pf.3bet.ip-total`, CO sprawdza; flop; CO czeka. Decyzja gracza: rozmiar zakładu.
- Ś: stack 100 bb → SPR = `spr.3bet-ip`; T: głębokość losowana tak, by SPR ∈ [4; 8].
- Ręka gracza: set (kieszonkowa para + karta stołu); stół niesparowany, bez trzech kart koloru, bez gotowego strita.
- Akcje: `bet-small` = 1/3 puli `inaccuracy`; `bet-big` = f geometryczne na trzy ulice (`geometricBetFraction(spr, 3)`) `compliant` (R-M9-009, R-M9-006 math; GW Pot Geometry). Przesłanka „chcesz wpłacić cały stack do rivera” jest w sytuacji (dana zadania, D-1300).
- Wyrocznia: trzy zakłady f i trzy sprawdzenia wpłacają cały stack (różnica ≤ 0,5 bb); trzy zakłady 1/3 wpłacają mniej niż połowę stacku przy SPR ≥ 4.

## SC-30 (M10) nit 3-betuje: pas ręką z dołu zakresu — Ł
- Linia: 6-max, 100 bb; gracz otwiera z BTN do `pf.open-size`, SB pas, BB (nit) 3-betuje do `pf.3bet.oop-total`. Cena = (3-bet − otwarcie) ÷ (2 × 3-bet + 0,5).
- Dana zadania w sytuacji: VPIP rywala x ∈ {8%, 10%} po ≥ `hud.hands.vpip.low` rękach; założenie „jego 3-bet mieści się w jego x% rąk” (uproszczenie w bezpiecznym kierunku, D-1305).
- Ręka gracza: klasa offsuit bez pary, z zakresu otwarcia `rfi.btn`, **spoza** górnych x% (ranking wg equity wobec losowej ręki z equity169), z equity wobec górnych x% ≤ cena − 0,03. Przykład z rachunku (D-1721): x = 8% → KTo, QJo, QTo, JTo, KJo, ATo, A9o; x = 10% → KTo, QTo, JTo, A9o.
- Akcje: `fold` `compliant`; `call` `inaccuracy` (rachunek R-M2-005, `calc`). Nigdy werdykt „sprawdzenie” (D-1305). Tylko poziom łatwy (D-1721: Ś niewykonalny).
