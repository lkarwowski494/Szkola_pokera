# Pakiet kontroli (a), pt-BR: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:54
NOWE:       - { text: "Tilt por ódio de perder", correct: true, why: "O gatilho é a própria derrota, mesmo quando você sabe que é {{t:variance|variância}}. Você não culpa a sorte, nem a si mesmo, nem o rival." }
STARE:       - { text: "Tilt de ódio a perder", correct: true, why: "O gatilho é a própria derrota, mesmo quando você sabe que é {{t:variance|variância}}. Você não culpa a sorte, nem a si mesmo, nem o rival." }

## [2] exams/m12.yaml:55
NOWE:       - { text: "Tilt por injustiça", why: "Esse tipo é disparado pela sensação de que o pôquer é injusto: bad beats, coolers, rivais acertando no river. Aqui você sabe que tudo aconteceu normalmente, e o que irrita você é a própria derrota." }
STARE:       - { text: "Tilt de injustiça", why: "Esse tipo é disparado pela sensação de que o pôquer é injusto: bad beats, coolers, rivais acertando no river. Aqui você sabe que tudo aconteceu normalmente, e o que irrita você é a própria derrota." }

## [3] exams/m12.yaml:56
NOWE:       - { text: "Tilt por erro", why: "Tilt por erro é raiva dos próprios erros. Aqui você sabe que jogou bem." }
STARE:       - { text: "Tilt de erro", why: "Tilt de erro é raiva dos próprios erros. Aqui você sabe que jogou bem." }

## [4] exams/m12.yaml:57
NOWE:       - { text: "Tilt por vingança", why: "A vingança é dirigida ao rival, por exemplo, depois de uma falta de respeito. Aqui o rival jogou corretamente e não é ele o motivo da raiva." }
STARE:       - { text: "Tilt de vingança", why: "A vingança é dirigida ao rival, por exemplo, depois de uma falta de respeito. Aqui o rival jogou corretamente e não é ele o motivo da raiva." }

## [5] lessons/m12-l1-wariancja.md:74
NOWE:       - { text: "O primeiro em cerca de {{n:dd.p.big.100k}}, o segundo em cerca de {{n:dd.p.big.100k.wr-low}} dos casos", correct: true, why: "Um winrate menor puxa o resultado para cima com menos força, então os {{t:downswing|downswings}} são mais profundos e mais frequentes. Com {{n:dd.wr-low}}, típico de jogadores vencedores nos microlimites, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em mais da metade das amostras." }
STARE:       - { text: "O primeiro em cerca de {{n:dd.p.big.100k}}, o segundo em cerca de {{n:dd.p.big.100k.wr-low}} dos casos", correct: true, why: "Um winrate menor puxa o resultado para cima com menos força, então os {{t:downswing|downswings}} são mais profundos e mais frequentes. Com {{n:dd.wr-low}}, típico de jogadores vencedores nos micro stakes, um {{t:downswing}} de {{n:dd.bi.big}} {{t:buy-in|buy-ins}} acontece em mais da metade das amostras." }

## [6] lessons/m12-l1-wariancja.md:93
NOWE:       - { text: "Cerca de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Esse é o winrate típico de jogadores vencedores nos microlimites. O {{t:standard-deviation|desvio}} é dezenas de vezes maior que o winrate, e por isso os resultados oscilam tanto." }
STARE:       - { text: "Cerca de {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}", why: "Esse é o winrate típico de jogadores vencedores nos micro stakes. O {{t:standard-deviation|desvio}} é dezenas de vezes maior que o winrate, e por isso os resultados oscilam tanto." }

## [7] lessons/m12-l1-wariancja.md:100
NOWE: **Winrate** é o lucro médio a cada 100 mãos, em {{t:big-blind|big blinds}}. Jogadores vencedores nos microlimites costumam ter {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.
STARE: **Winrate** é o lucro médio a cada 100 mãos, em {{t:big-blind|big blinds}}. Jogadores vencedores nos micro stakes costumam ter {{n:var.wr.typical.low}}–{{n:var.wr.typical.high}}.

## [8] lessons/m12-l2-decyzja-wynik.md:89
NOWE: O pôquer dá um retorno que muitas vezes mente. Uma boa decisão pode perder, e uma ruim pode ganhar. Se você avalia seu jogo pelos resultados, aprende com sinais aleatórios.
STARE: O poker dá um retorno que muitas vezes mente. Uma boa decisão pode perder, e uma ruim pode ganhar. Se você avalia seu jogo pelos resultados, aprende com sinais aleatórios.

## [9] lessons/m12-l3-tilt.md:133
NOWE: Se você joga por mais tempo do que planeja, tenta recuperar as perdas ou joga com dinheiro que não pode perder, leia o quadro “Jogo responsável” na lição sobre bankroll.
STARE: Se você joga por mais tempo do que planeja, tenta recuperar as perdas ou joga com dinheiro que não pode perder, leia o cartão sobre jogo responsável na lição sobre bankroll.

## [10] lessons/m12-l4-bankroll.md:51
NOWE:       - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais rápido", why: "Isso é tilt por desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta drasticamente o {{t:risk-of-ruin|risco de ruína}}." }
STARE:       - { text: "Sobe para um {{t:stakes|limite}} mais alto para recuperar mais rápido", why: "Isso é tilt de desespero. Um {{t:stakes|limite}} mais alto com um bankroll menor em {{t:buy-in|buy-ins}} aumenta drasticamente o {{t:risk-of-ruin|risco de ruína}}." }

## [11] rules.yaml R-M12-007
NOWE:
```
- id: R-M12-007
  module: m12
  if: "depois de uma série de derrotas você já não consegue avaliar decisões com calma (por exemplo só pensa em recuperar o que perdeu ou joga mãos de que normalmente {{t:fold|desiste}})"
  then: "você encerra a {{t:session|sessão}}"
  because: "continuar jogando nesse estado é jogar no seu pior nível (C-game), e o objetivo é parar mais cedo, antes de perder a capacidade de pensar com clareza"
  level: heuristic
  source: "Tendler e Carter, The Mental Game of Poker (2011), trecho “Inchworm” (trecho publicado online): “quit sooner when it's no longer possible to recover a solid thought process”"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-007
  module: m12
  if: "depois de uma série de derrotas você já não consegue avaliar decisões com calma (por exemplo só pensa em recuperar o que perdeu ou joga mãos de que normalmente {{t:fold|desiste}})"
  then: "você encerra a {{t:session|sessão}}"
  because: "continuar jogando nesse estado é jogar no seu pior nível (C-game), e o objetivo é parar antes, antes de perder a capacidade de pensar com clareza"
  level: heuristic
  source: "Tendler e Carter, The Mental Game of Poker (2011), trecho “Inchworm” (trecho publicado online): “quit sooner when it's no longer possible to recover a solid thought process”"
  sources: [{ kind: book }]
```
