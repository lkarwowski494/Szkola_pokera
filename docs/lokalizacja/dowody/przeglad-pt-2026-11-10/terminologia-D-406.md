# Terminologia pt (pt-PT): decyzje D-406 — sesja AS, 2026-11-10 (rola 09, do weta)

Korpus: `content/pt` po przekładzie API + poprawkach L1–L6, przed poprawkami E/R/U (skrypt `formy.mjs` w scratchpadzie sesji AS: liczba form w znacznikach `{{t:klucz|forma}}`).
Źródła przeczytane 2026-11-10 (surowy tekst `curl`, nie streszczenie):

- [PN-G] PokerNews Portugal (`<html lang="pt-PT">`), glosariusz `https://pt.pokernews.com/termos-poker/<termo>.htm`:
  - flush.htm: „Um flush no poker refere-se a uma mão onde todas as cinco cartas são do mesmo naipe”
  - flush-draw.htm: „Um Flush Draw no poker refere-se a uma situação em que um jogador tem quatro cartas do mesmo naipe”
  - draw.htm: „No poker, um draw ou mão em draw refere-se a uma mão que ainda não está completa”
  - check.htm: „check é uma ação de aposta onde um jogador opta por não apostar, passando a ação para o próximo jogador”
  - shove.htm: „"Shove" refere-se ao ato de empurrar todas as fichas para o pote, também conhecido como ir "all-in"”
  - push.htm: „Quando o dealer empurra as fichas para o jogador vencedor da mão.” (push ≠ shove w tym źródle)
  - big-blind.htm: „definido como parte das stakes (limites) da mesa”; „pagar para ver o flop”
  - three-kind.htm: „Três cartas com o mesmo número ou com a mesma face ("trio").”
  - top-pair.htm: „quando faz um par com uma das suas cartas e a carta mais alta da mesa.”
- [PN-R] `https://pt.pokernews.com/maos-de-poker/`: ranking „1. Royal Flush … 3. Poker … 5. Flush … 6. Straight … 9. Um par”.
- [PN-T] `https://pt.pokernews.com/regras-poker/texas-holdem.htm`: „Call: Igualar o valor do big blind. Raise: Aumentar a aposta dentro dos limites do jogo. Fold: Desistir da mão”; „Um "check" significa passar a ação para o próximo jogador sem apostar”; rundy „Primeira Ronda de Apostas: Pré-flop”; „o big blind” ×12 (big-blind.htm: „a Big Blind” — źródło niespójne w rodzaju).
- [PR] Priberam (słownik pt-PT), `https://dicionario.priberam.org/sequência`: „4. Série seguida de cartas do mesmo naipe ou de cartas com valores seguidos.”

| Pojęcie (klucz) | Formy w korpusie | Decyzja | Podstawa |
|---|---|---|---|
| flush | cor ×78, flush ×10, bez formy 27 | **flush** („o/um flush”) | [PN-G] flush, [PN-R] „5. Flush”; „cor” w znaczeniu układu bez przeczytanego źródła pt-PT (zalecenie recenzentów AO z korpusu odrzucone: korpus to przekład, nie źródło) |
| flush-draw | projeto de cor ×36, draw de flush ×10, projeto de flush ×5 | **flush draw** | [PN-G] flush-draw |
| draw | projeto(s) ×155, draw(s) ×34 | **draw** („um draw”, l.mn. „draws”) | [PN-G] draw („um draw ou mão em draw”) |
| straight-draw | draw de sequência ×6, projeto de sequência ×4 | **draw de sequência** | spójnie z draw i straight |
| straight | sequência ×131 | **sequência** (bez zmian) | [PR] sequência 4.; [PN-R] nagłówek „Straight” — słowo portugalskie ze słownika ma pierwszeństwo, korpus spójny |
| three-of-a-kind | trio ×21 | **trio** (bez zmian) | [PN-G] three-kind |
| check | passa/passar/Passo ×162, faz/faço/fazer check ×29 | **passar** (formy), nazwa gołego znacznika „check” | [PN-G] check, [PN-T] („passar a ação”); większość korpusu; „fazer check” → „passar” |
| call | pagar/paga/pagamento ×686 | **pagar** (bez zmian), nazwa „call” | [PN-G] big-blind „pagar para ver o flop”; [PN-T] „Igualar” — wariant poprawny, korpus spójny |
| fold | desistir ×584 | **desistir** (bez zmian), nazwa „fold” | [PN-T] „Fold: Desistir da mão” |
| raise | aumentar/aumento ×299 | **aumentar/aumento** (bez zmian) | [PN-T] „Raise: Aumentar a aposta” |
| top-pair | par de topo ×74, par mais alto ×1, par máximo ×2 | **top pair** („o top pair”, l.mn. „top pairs”) | [PN-G] hasło „Top Pair”; „par de topo” bez źródła; „par mais alto” dwuznaczne (wyższa para); zgodnie z pt-BR D-372 |
| shove | shove ×17, push ×7 | **shove** („fazer shove”) | [PN-G] shove; push w [PN-G] = dealer przesuwa żetony → błąd znaczeniowy |
| stakes | limite(s) ×50, nível ×12, micro stakes, microlimites | **limite(s)**, **microlimites** | [PN-G] big-blind „stakes (limites)” |
| street / betting-round | ronda(s) ×61, street(s) ×13 | **ronda**, **ronda de apostas** | [PN-T] „Primeira Ronda de Apostas” |
| board | mesa ×89, board ×9 | **mesa** | [PN-G] top-pair „a carta mais alta da mesa” |
| pot | pote ×851 | **pote** | [PN-G] shove „para o pote” |
| big-blind | big blind ×135 | **big blind**, rodzaj męski „o big blind” | [PN-T] ×12 męski (większość w źródle) |
| range | range ×133, leque ×6 | **range** (leque → range) | [DO USTALENIA] źródło pt-PT nieprzeczytane; korpus + pt-BR D-372 — nazwane jako uproszczenie do weta |
| c-bet | — | rodzaj męski „o c-bet” | zalecenie recenzentów AO; [DO USTALENIA] źródło |
| preflop | preflop ×124 | **preflop** (bez zmian) | [PN-T] pisze „Pré-flop” — **odstępstwo nazwane**: 124 miejsca, w tym identyfikatory; jedna forma w całym pt; do weta |

Wykonanie: reguły `pt` w `docs/lokalizacja/narzedzia/ujednolic-formy.mjs` po nałożeniu poprawek E/R/U; zmiany rodzaju (cor → flush: „a cor” → „o flush”, „uma cor” → „um flush”) ręcznie lub skryptem z listą kontekstów; każde trafienie w m12 → ponowna kontrola (a). `content/pt/terms-nazwy.yaml` (K-05) z nazwami z tej tabeli.
