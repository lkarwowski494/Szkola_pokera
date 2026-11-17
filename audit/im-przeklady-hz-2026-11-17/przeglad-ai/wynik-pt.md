# Drugi przegląd AI: pt (pt-PT) i pt-BR, szablony sc-09, 16, 18, 21, 26, 27, 30

Wzorzec: `content/pl/scenarios/` + `content/en/scenarios/` (odczyt 2026-11-17). Forma zwracania się: pt — 3. os. grzecznościowa bez „você” („Tem…”, „antes de si”), spójna we wszystkich 7 plikach; pt-BR — „você”, spójna.

Otwarte „brak kluczy spr/icm/vpip w `content/pt/terms-nazwy.yaml`” (dotyczy też pt-BR): **nie wpływa** na te szablony. `renderTermsBare` (`packages/content-schema/src/…:124`) przy braku nazwy zwraca polską nazwę, gdy jest skrótem wielkimi literami (`/^[A-Z][A-Z0-9+]{1,5}$/`): `{{t:spr}}` → „SPR”, `{{t:vpip}}` → „VPIP”; `{{t:icm|ICM}}` ma formę. Uzupełnienie kluczy to tylko porządek (jak es/de/it: „SPR”, „ICM”, „VPIP”).

## 1. Tabela

| język | szablon | werdykt | ID znalezisk |
|---|---|---|---|
| pt | sc-09 | OK | — |
| pt | sc-16 | ŚREDNIE | pt-sc16-1, pt-sc16-2 |
| pt | sc-18 | OK | — |
| pt | sc-21 | ŚREDNIE | pt-sc21-1, pt-sc21-2 |
| pt | sc-26 | OK | — |
| pt | sc-27 | OK (uwaga o źródle: `{{w:rozmiar}}` bez %) | — |
| pt | sc-30 | OK | — |
| pt-BR | sc-09 | OK | — |
| pt-BR | sc-16 | uwagi NISKIE | pt-BR-sc16-1 |
| pt-BR | sc-18 | OK | — |
| pt-BR | sc-21 | OK | — |
| pt-BR | sc-26 | OK | — |
| pt-BR | sc-27 | OK (uwaga o źródle: `{{w:rozmiar}}` bez %) | — |
| pt-BR | sc-30 | OK | — |

## 2. Znaleziska

### pt-sc16-1 · ŚREDNIE · niejasne, kto trafia drawa
- Pole: explanation akcji raise-big.
- Obecnie: „o adversário pode {{t:fold|desistir}} de imediato e, quando faz {{t:call}}, ainda pode acertar o seu {{t:draw}}.”
- Wzorzec: pl „rywal może od razu spasować, a gdy sprawdzi, nadal możesz trafić swój draw”; en „when they call, you can still hit your draw”.
- Problem: w pt-PT bez zaimków podmiot obu czasowników po „o adversário” czyta się jako ten sam (rywal), a „o seu draw” może znaczyć „jego draw”. Wychodzi „rywal… może trafić swój draw”.
- Proponowane: „Faz {{t:check-raise}} para cerca de {{n:xr.mult.example}} a {{t:bet|aposta}} dele, porque um {{t:draw}} tem duas formas de ganhar: o adversário pode {{t:fold|desistir}} de imediato e, quando ele faz {{t:call}}, o seu {{t:draw}} ainda pode completar-se.”
- Pewność: wysoka (dwuznaczność), średnia (czy czytelnik się pomyli).

### pt-sc16-2 · ŚREDNIE · „o c-bet é demasiado pequeno” zamiast „check-raise jest za mały”
- Pole: explanation akcji raise-small.
- Obecnie: „O {{t:check-raise}} é uma boa ideia, mas para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} é demasiado pequeno:”
- Wzorzec: pl „ale do ok. 1,5x c-betu jest za mały” (check-raise); en „but a raise to about 1.5x the c-bet is too small”.
- Problem: bez podmiotu zdanie czyta się jako „…o c-bet é demasiado pequeno”, czyli że za mały jest c-bet rywala, a nie przebicie gracza.
- Proponowane: „O {{t:check-raise}} é uma boa ideia, mas um {{t:raise|aumento}} para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} é demasiado pequeno: o Button precisa então de apenas cerca de {{n:eq.vs-xr.too-small}} de equity para fazer {{t:call}} e assim paga barato com qualquer {{t:draw}}. {{t:raise|Aumenta}} para cerca de {{n:xr.mult.low}}–{{n:xr.mult.example}} o {{t:c-bet}}, tanto mais quanto menor for o {{t:c-bet}}.”
- Pewność: wysoka.

### pt-sc21-1 · ŚREDNIE · „już nie możesz stawiać” czyta się jako rywal
- Pole: explanation akcji check.
- Obecnie: „depois de {{t:call|pagar}} no flop, o adversário tem normalmente um {{t:range}} mais forte do que no flop, por isso já não pode {{t:bet|apostar}} sem receio.”
- Wzorzec: pl „rywal ma zwykle silniejszy zakres niż na flopie, więc nie możesz już stawiać bez obaw”; en „so you can no longer bet without worry”.
- Problem: podmiot „já não pode apostar” to gramatycznie nadal „o adversário”, więc rada wygląda tak, jakby to rywal nie mógł stawiać. Granica WYSOKIEGO (kto co robi), ale z kontekstu („Faz check, porque…”) da się to odczytać poprawnie, więc ŚREDNIE. pt-BR ma tu „então você”, jest jasno.
- Proponowane (bez zaimka grzecznościowego, spójnie z resztą pt): „Faz {{t:check}}, porque, depois de {{t:call|pagar}} no flop, o adversário tem normalmente um {{t:range}} mais forte do que no flop, por isso a sua {{t:bet|aposta}} já não é segura.”
- Pewność: wysoka.

### pt-sc21-2 · NISKIE · dwie formy „call” w jednym szablonie
- Pole: situation („fez {{t:call}}”, „voltou a fazer {{t:call}}”) wobec explanation („depois de {{t:call|pagar}} no flop”).
- Problem: „fez call” i „pagar” w tym samym szablonie; obie formy są w korpusie pt, ale lepiej jedna.
- Proponowane: zostawić albo w situation „e o {{t:big-blind}} {{t:call|pagou}}. … e ele voltou a {{t:call|pagar}}.”
- Pewność: średnia.

### pt-BR-sc16-1 · NISKIE · niezręczne „para cerca de 1,5x o c-bet ele é pequeno demais”
- Pole: explanation akcji raise-small.
- Obecnie: „mas para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} ele é pequeno demais”.
- Problem: sens poprawny („ele” = check-raise), ale szyk niezgrabny.
- Proponowane: „O {{t:check-raise}} é uma boa ideia, mas um {{t:raise|aumento}} para cerca de {{n:xr.too-small.mult}} o {{t:c-bet}} é pequeno demais: o Button então precisa de só cerca de {{n:eq.vs-xr.too-small}} de equity para {{t:call|pagar}} e assim paga barato com qualquer {{t:draw|projeto}}.”
- Pewność: średnia.

## 3. Do sprawdzenia przez rodzimego użytkownika
- pt sc-09 i pt-BR sc-09: „não o tira da mão” (en „doesn’t take the hand away from them”) — czy brzmi naturalnie jako „nie odbiera mu rozdania”, czy lepiej „não lhe tira o pote”?
- pt-BR sc-18: „que te dá {{t:top-pair}}” obok „você” — w korpusie pt-BR „te dá”×7, „lhe dá”×3; czy w tekście aplikacji przyjmujemy potoczne „te”?
- pt sc-16 i sc-26: „fez {{t:call}} à {{t:open|abertura}}” — czy w pt-PT naturalniejsze „pagou a abertura”?
- pt sc-26 fold: „bastam cerca de {{n:eq.jam.spr2}} de equity” — zgoda liczby (bastam/basta) przy procentach.

## 4. Uwagi o źródle (pl/en, wspólne dla wszystkich języków)
- sc-27, obie explanation: `{{w:rozmiar}}` to liczba bez znaku % (`apps/mobile/src/features/scenariusz/wariant.ts:410`: `String(Math.round(d.fractionBig * 100))`). pl „ok. {{w:rozmiar}} puli”, en „about {{w:rozmiar}} of the pot” wyświetlają „ok. 75 puli” / „about 75 of the pot”; pt/pt-BR „cerca de 75 do pote” tak samo. Poprawka: „{{w:rozmiar}}%” we wzorcu i we wszystkich językach (albo `%` dokładany w `wartosciPunktu`).
- Klucze spr/icm/vpip w terms-nazwy pt i pt-BR: brak bez skutku dla wyświetlania (fallback do skrótu pl), do uzupełnienia dla porządku.
