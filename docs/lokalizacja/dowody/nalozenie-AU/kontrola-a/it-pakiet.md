# Pakiet kontroli (a), it: miejsca zmienione w treści krytycznej (m12, R-M12-*, helplines) od f8272c1

## [1] exams/m12.yaml:29
NOWE:       - { text: "Basta qualche decina di migliaia di mani", why: "L'errore diminuisce solo con la radice quadrata del numero di mani. Con {{n:var.sd.high}} e una precisione di ± {{n:var.target}} ti servono circa {{n:exam.m12.need.blocks}} blocchi da 100 mani." }
STARE:       - { text: "Bastano qualche decina di migliaia di mani", why: "L'errore diminuisce solo con la radice quadrata del numero di mani. Con {{n:var.sd.high}} e una precisione di ± {{n:var.target}} ti servono circa {{n:exam.m12.need.blocks}} blocchi da 100 mani." }

## [2] lessons/m12-l2-decyzja-wynik.md:15
NOWE:       - { text: "È stata molto buona", correct: true, why: "AA batte KK in circa l'{{n:pf.aa-vs-kk}} dei casi. Perdere in circa il {{n:res.kk-wins}} dei casi è il costo del gioco, non un errore. Ogni volta fai la stessa cosa." }
STARE:       - { text: "È stata molto buona", correct: true, why: "AA batte KK in circa {{n:pf.aa-vs-kk}} dei casi. Perdere in circa {{n:res.kk-wins}} dei casi è il costo del gioco, non un errore. Ogni volta fai la stessa cosa." }

## [3] lessons/m12-l2-decyzja-wynik.md:16
NOWE:       - { text: "È stata cattiva, dovevi giocare con più cautela", why: "Questo è giudicare in base al risultato. Se la carta del river fosse stata diversa, la stessa decisione sembrerebbe ottima. La decisione dipende da ciò che sapevi prima della carta: circa l'{{n:pf.aa-vs-kk}} di equity." }
STARE:       - { text: "È stata cattiva, dovevi giocare con più cautela", why: "Questo è giudicare in base al risultato. Se la carta del river fosse stata diversa, la stessa decisione sembrerebbe ottima. La decisione dipende da ciò che sapevi prima della carta: circa {{n:pf.aa-vs-kk}} di equity." }

## [4] lessons/m12-l2-decyzja-wynik.md:22
NOWE:     prompt: "AA batte KK all-in preflop in circa l'{{n:pf.aa-vs-kk}} dei casi. In quale percentuale dei casi perdi nonostante la migliore decisione possibile? Inserisci un numero."
STARE:     prompt: "AA batte KK all-in preflop in circa {{n:pf.aa-vs-kk}} dei casi. In quale percentuale dei casi perdi nonostante la migliore decisione possibile? Inserisci un numero."

## [5] lessons/m12-l2-decyzja-wynik.md:29
NOWE:     prompt: "Turn. Hai un {{t:flush-draw|progetto di colore}} pulito ({{n:outs.flush}} out), nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.quarter}}. {{t:call|Chiami}}, il {{t:flush|colore}} non entra e perdi {{n:ex.bet.quarter}}. Come valuti la {{t:call|chiamata}}?"
STARE:     prompt: "Turn. Hai un {{t:flush-draw|progetto di colore}} pulito ({{n:outs.flush}} outs), nel {{t:pot|piatto}} ci sono {{n:ex.pot}}, l'avversario {{t:bet|punta}} {{n:ex.bet.quarter}}. {{t:call|Chiami}}, il {{t:flush|colore}} non entra e perdi {{n:ex.bet.quarter}}. Come valuti la {{t:call|chiamata}}?"

## [6] lessons/m12-l2-decyzja-wynik.md:31
NOWE:       - { text: "È stata buona", correct: true, why: "Ti serviva il {{n:eq.bet-quarter}} di equity e ne avevi circa il {{n:odds.flush.turn-river}}. Una {{t:call|chiamata}} così guadagna sul lungo periodo, anche se perde nella maggior parte delle singole mani." }
STARE:       - { text: "È stata buona", correct: true, why: "Ti serviva {{n:eq.bet-quarter}} di equity e ne avevi circa {{n:odds.flush.turn-river}}. Una {{t:call|chiamata}} così guadagna sul lungo periodo, anche se perde nella maggior parte delle singole mani." }

## [7] lessons/m12-l2-decyzja-wynik.md:32
NOWE:       - { text: "È stata cattiva, perché il {{t:flush|colore}} non è entrato", why: "Il {{t:flush|colore}} entra solo in circa il {{n:odds.flush.turn-river}} dei casi, quindi mancarlo era il risultato più probabile. Valuti la decisione in base al prezzo, e il prezzo era buono." }
STARE:       - { text: "È stata cattiva, perché il {{t:flush|colore}} non è entrato", why: "Il {{t:flush|colore}} entra solo in circa {{n:odds.flush.turn-river}} dei casi, quindi mancarlo era il risultato più probabile. Valuti la decisione in base al prezzo, e il prezzo era buono." }

## [8] lessons/m12-l2-decyzja-wynik.md:40
NOWE:       - { text: "È stata cattiva, nonostante la vincita", correct: true, why: "Ti serviva il {{n:eq.bet-pot}} di equity e ne avevi circa il {{n:odds.flush.turn-river}}. Questa volta hai vinto, ma su molte ripetizioni una {{t:call|chiamata}} così perde." }
STARE:       - { text: "È stata cattiva, nonostante la vincita", correct: true, why: "Ti serviva {{n:eq.bet-pot}} di equity e ne avevi circa {{n:odds.flush.turn-river}}. Questa volta hai vinto, ma su molte ripetizioni una {{t:call|chiamata}} così perde." }

## [9] lessons/m12-l2-decyzja-wynik.md:41
NOWE:       - { text: "È stata buona, perché hai vinto il {{t:pot|piatto}}", why: "La vincita non migliora la decisione. Con un prezzo del {{n:eq.bet-pot}} e una probabilità di circa il {{n:odds.flush.turn-river}}, questa {{t:call|chiamata}} perde sul lungo periodo." }
STARE:       - { text: "È stata buona, perché hai vinto il {{t:pot|piatto}}", why: "La vincita non migliora la decisione. Con un prezzo di {{n:eq.bet-pot}} e una probabilità di circa {{n:odds.flush.turn-river}}, questa {{t:call|chiamata}} perde sul lungo periodo." }

## [10] lessons/m12-l2-decyzja-wynik.md:42
NOWE:       - { text: "È stata buona, perché il {{t:flush|colore}} è la mano migliore", why: "La forza della mano dopo aver chiuso il punto non cambia il prezzo. Conta il confronto: hai il {{n:odds.flush.turn-river}} di probabilità, te ne serve il {{n:eq.bet-pot}}." }
STARE:       - { text: "È stata buona, perché il {{t:flush|colore}} è la mano migliore", why: "La forza della mano dopo aver chiuso il punto non cambia il prezzo. Conta il confronto: hai {{n:odds.flush.turn-river}} di probabilità, te ne servono {{n:eq.bet-pot}}." }

## [11] lessons/m12-l2-decyzja-wynik.md:67
NOWE:       - { text: "No, tre {{t:session|sessioni}} sono troppo poche; valuti le nuove giocate nella revisione delle mani", correct: true, why: "Anche un enorme divario di abilità (l'{{n:skill.pct}} più forte contro l'{{n:skill.pct}} più debole) passa in vantaggio in circa il {{n:skill.ahead}} dei casi solo dopo circa {{n:skill.hands}} mani. La differenza tra i tuoi due stili è molto più piccola." }
STARE:       - { text: "No, tre {{t:session|sessioni}} sono troppo poche; valuti le nuove giocate nella revisione delle mani", correct: true, why: "Anche un enorme divario di abilità (il {{n:skill.pct}} più forte contro il {{n:skill.pct}} più debole) passa in vantaggio in circa {{n:skill.ahead}} dei casi solo dopo circa {{n:skill.hands}} mani. La differenza tra i tuoi due stili è molto più piccola." }

## [12] lessons/m12-l2-decyzja-wynik.md:76
NOWE:       - { text: "L'{{n:skill.pct}} più forte dei giocatori supera l'{{n:skill.pct}} più debole in circa il {{n:skill.ahead}} dei casi dopo circa {{n:skill.hands}} mani", correct: true, why: "È così che lo definiscono gli autori dello studio (2015). È un confronto tra gruppi estremi: con differenze di abilità minori servono molte più mani." }
STARE:       - { text: "Il {{n:skill.pct}} più forte dei giocatori supera il {{n:skill.pct}} più debole in circa {{n:skill.ahead}} dei casi dopo circa {{n:skill.hands}} mani", correct: true, why: "È così che lo definiscono gli autori dello studio (2015). È un confronto tra gruppi estremi: con differenze di abilità minori servono molte più mani." }

## [13] lessons/m12-l2-decyzja-wynik.md:97
NOWE: Andare all-in con una {{t:pair|coppia}} di assi contro una {{t:pair|coppia}} di re è la migliore decisione possibile, eppure perde in circa il **{{n:res.kk-wins}}** dei casi. D'altra parte, una {{t:call|chiamata}} con un {{t:flush-draw|progetto di colore}} per tutto il {{t:pot|piatto}} al turn è sbagliata (ti serve il {{n:eq.bet-pot}}, hai circa il {{n:odds.flush.turn-river}}), eppure vince più o meno una volta su cinque.
STARE: Andare all-in con una {{t:pair|coppia}} di assi contro una {{t:pair|coppia}} di re è la migliore decisione possibile, eppure perde in circa **{{n:res.kk-wins}}** dei casi. D'altra parte, una {{t:call|chiamata}} con un {{t:flush-draw|progetto di colore}} per tutto il {{t:pot|piatto}} al turn è sbagliata (ti serve {{n:eq.bet-pot}}, hai circa {{n:odds.flush.turn-river}}), eppure vince più o meno una volta su cinque.

## [14] lessons/m12-l2-decyzja-wynik.md:112
NOWE: In uno studio su circa {{n:skill.sample.m}} milioni di mani online (studio del 2015) l'abilità iniziava a prevalere solo dopo circa **{{n:skill.hands}}** mani. Questo significa che l'{{n:skill.pct}} più forte dei giocatori superava l'{{n:skill.pct}} più debole in circa il {{n:skill.ahead}} dei confronti. Per differenze di abilità minori servono molte volte più mani. Il risultato di poche {{t:session|sessioni}} quindi non ti dice quale stile di gioco sia migliore.
STARE: In uno studio su circa {{n:skill.sample.m}} milioni di mani online (studio del 2015) l'abilità iniziava a prevalere solo dopo circa **{{n:skill.hands}}** mani. Questo significa che il {{n:skill.pct}} più forte dei giocatori superava il {{n:skill.pct}} più debole in circa {{n:skill.ahead}} dei confronti. Per differenze di abilità minori servono molte volte più mani. Il risultato di poche {{t:session|sessioni}} quindi non ti dice quale stile di gioco sia migliore.

## [15] lessons/m12-l3-tilt.md:100
NOWE: Il tilt è la perdita di controllo sotto l'effetto di emozioni negative, di solito dopo dei bad beat o una lunga serie di perdite. Finisce con decisioni scadenti e una perdita molto più grande del solito. Non è raro: in un'indagine tramite questionario, l'{{n:tilt.severe}} dei giocatori ha ammesso di essere andato in tilt pesante almeno una volta negli ultimi sei mesi.
STARE: Il tilt è la perdita di controllo sotto l'effetto di emozioni negative, di solito dopo dei bad beat o una lunga serie di perdite. Finisce con decisioni scadenti e una perdita molto più grande del solito. Non è raro: in un'indagine tramite questionario, {{n:tilt.severe}} dei giocatori ha ammesso di essere andato in tilt pesante almeno una volta negli ultimi sei mesi.

## [16] lessons/m12-l4-bankroll.md:58
NOWE:       - { text: "Resti a questo {{t:stakes|limite}} e rivedi le decisioni nelle mani perse", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} sono ancora più della soglia di discesa più tardiva, {{n:br.bi.move-down}}. In una simulazione un {{t:downswing}} così colpisce circa il {{n:dd.p.small.100k}} dei giocatori che vincono {{n:var.wr.ex}} su {{n:var.hands.k}} mila mani, e la revisione delle mani verifica se dietro ci sono errori." }
STARE:       - { text: "Resti a questo {{t:stakes|limite}} e rivedi le decisioni nelle mani perse", correct: true, why: "{{n:br.ex.after-dd}} {{t:buy-in|buy-in}} sono ancora più della soglia di discesa più tardiva, {{n:br.bi.move-down}}. In una simulazione un {{t:downswing}} così colpisce circa {{n:dd.p.small.100k}} dei giocatori che vincono {{n:var.wr.ex}} su {{n:var.hands.k}} mila mani, e la revisione delle mani verifica se dietro ci sono errori." }

## [17] lessons/m12-l4-bankroll.md:85
NOWE:       - { text: "Circa l'{{n:study.beginner}} di studio", correct: true, why: "All'inizio hai più cose da recuperare, quindi lo studio prevale." }
STARE:       - { text: "Circa {{n:study.beginner}} di studio", correct: true, why: "All'inizio hai più cose da recuperare, quindi lo studio prevale." }

## [18] lessons/m12-l4-bankroll.md:86
NOWE:       - { text: "Circa il {{n:study.min}} di studio", why: "È la soglia minima per un giocatore che già vince. All'inizio lo studio dovrebbe prevalere." }
STARE:       - { text: "Circa {{n:study.min}} di studio", why: "È la soglia minima per un giocatore che già vince. All'inizio lo studio dovrebbe prevalere." }

## [19] lessons/m12-l4-bankroll.md:94
NOWE:       - { text: "Più o meno metà e metà, ma mai meno del {{n:study.min}} di studio", correct: true, why: "Anche quando vinci, l'ideale è circa il {{n:study.winner}} di studio, e il minimo è {{n:study.min}}." }
STARE:       - { text: "Più o meno metà e metà, ma mai meno di {{n:study.min}} di studio", correct: true, why: "Anche quando vinci, l'ideale è circa {{n:study.winner}} di studio, e il minimo è {{n:study.min}}." }

## [20] lessons/m12-l4-bankroll.md:95
NOWE:       - { text: "Solo gioco, visto che vinci", why: "Anche quando vinci, non scendi sotto il {{n:study.min}} del tempo dedicato allo studio." }
STARE:       - { text: "Solo gioco, visto che vinci", why: "Anche quando vinci, non scendi sotto {{n:study.min}} del tempo dedicato allo studio." }

## [21] lessons/m12-l4-bankroll.md:96
NOWE:       - { text: "Circa l'{{n:study.beginner}} di studio, come all'inizio", why: "Puoi farlo, se ti prepari per {{t:stakes|limiti}} più alti. Se semplicemente vinci al tuo, basta circa {{n:study.winner}}." }
STARE:       - { text: "Circa {{n:study.beginner}} di studio, come all'inizio", why: "Puoi farlo, se ti prepari per {{t:stakes|limiti}} più alti. Se semplicemente vinci al tuo, basta circa {{n:study.winner}}." }

## [22] lessons/m12-l4-bankroll.md:141
NOWE: All'inizio dedichi circa l'{{n:study.beginner}} del tempo allo studio e il resto al gioco. Quando vinci al tuo {{t:stakes|limite}}, l'ideale è circa {{n:study.winner}}, ma mai meno del {{n:study.min}} di studio.
STARE: All'inizio dedichi circa {{n:study.beginner}} del tempo allo studio e il resto al gioco. Quando vinci al tuo {{t:stakes|limite}}, l'ideale è circa {{n:study.winner}}, ma mai meno di {{n:study.min}} di studio.

## [23] rules.yaml R-M12-006
NOWE:
```
- id: R-M12-006
  module: m12
  if: "noti i primi segnali di tilt del tuo profilo (ad es. rabbia dopo un bad beat, voglia di punire l'avversario)"
  then: "reagisci subito: un respiro e una frase preparata che ti ricorda perché questa è {{t:variance|varianza}} o un errore da cui imparare"
  because: "quando il tilt cresce smetti di pensare con lucidità, e a quel punto non è più possibile controllarlo"
  level: heuristic
  source: "Tendler, intervista su un sito di informazione (2014) («When tilt becomes too intense, it shuts down your ability to think», «you must begin correcting tilt when it's small»); Tendler e Carter, The Mental Game of Poker (2011), tecnica «injecting logic»"
  sources: [{ kind: book }]
```
STARE:
```
- id: R-M12-006
  module: m12
  if: "noti i primi segnali di tilt del tuo profilo (ad es. rabbia dopo un bad beat, voglia di punire l'avversario)"
  then: "reagisci subito: un respiro profondo e una frase preparata che ti ricorda perché questa è {{t:variance|varianza}} o un errore da cui imparare"
  because: "quando il tilt cresce smetti di pensare con lucidità, e a quel punto non è più possibile controllarlo"
  level: heuristic
  source: "Tendler, intervista su un sito di informazione (2014) («When tilt becomes too intense, it shuts down your ability to think», «you must begin correcting tilt when it's small»); Tendler e Carter, The Mental Game of Poker (2011), tecnica «injecting logic»"
  sources: [{ kind: book }]
```
