---
id: m3.l1
module: m3
order: 1
title: "La posizione al tavolo"
sub: "Perché il posto conta"
rules: [R-M3-001, R-M3-002, R-M3-006, R-M3-003, R-M3-004, R-M3-007]
drills:
  - kind: choice
    id: m3.l1.q1
    family: m3.position
    rules: [R-M3-001]
    prompt: "Qual è la {{t:position}} migliore?"
    options:
      - { text: "Button ({{t:button|BTN}})", correct: true, why: "Dal flop in poi il Button agisce per ultimo, quindi conosce sempre le decisioni degli avversari prima della propria." }
      - { text: "{{t:big-blind|Big blind}}", why: "Il {{t:big-blind|BB}} paga meno per entrare perché ha già messo dei soldi, ma dal flop in poi agisce tra i primi." }
      - { text: "{{t:utg|UTG}}", why: "{{t:utg|UTG}} agisce per primo preflop e ha dietro di sé tutti i giocatori al tavolo. È il posto più difficile da cui aprire." }
  - kind: choice
    id: m3.l1.q2
    family: m3.open-early
    rules: [R-M3-002]
    prompt: "Tutti prima di te {{t:fold|hanno foldato}}. Cosa fai?"
    table: { hand: "Kc 9d", position: UTG }
    options:
      - { text: "{{t:fold|Foldo}}", correct: true, why: "K9 di semi diversi è fuori dal {{t:range}} di {{t:open|apertura}} da {{t:utg|UTG}}, cioè dalla lista di mani con cui {{t:open|apri}} da questa {{t:position|posizione}}. Dietro di te ci sono cinque giocatori e spesso qualcuno ha un re con un kicker migliore." }
      - { text: "{{t:raise|Rilancio}}", why: "Da {{t:utg|UTG}} {{t:open|apri}} solo circa {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} delle mani. K9o centra facilmente un re e perde contro KQ o AK." }
      - { text: "Pareggio il {{t:big-blind|big blind}}", why: "Limitarsi a pareggiare (limp) da {{t:utg|UTG}} è una cattiva abitudine. O la mano vale un {{t:raise|rilancio}}, o {{t:fold|foldi}}." }
  - kind: choice
    id: m3.l1.q3
    family: m3.open-late
    rules: [R-M3-003]
    prompt: "Stessa mano, ma sei sul Button e tutti prima di te {{t:fold|hanno foldato}}."
    table: { hand: "Kc 9d", position: BTN }
    options:
      - { text: "{{t:raise|Rilancio}}", correct: true, why: "Restano solo i blind e dopo il flop hai {{t:position|posizione}}. Sul Button {{t:open|apri}} circa {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} delle mani, e K9o ci rientra." }
      - { text: "{{t:fold|Foldo}}", why: "Troppo prudente. Contro i soli blind questa mano è abbastanza buona, e la {{t:position}} le aggiunge valore." }
      - { text: "Pareggio il {{t:big-blind|big blind}}", why: "Il limp cede l'{{t:initiative|iniziativa}}. Un {{t:raise|rilancio}} spesso vince subito i blind." }
  - kind: choice
    id: m3.l1.q4
    family: m3.position
    rules: [R-M3-001]
    prompt: "Perché agire per ultimo aiuta?"
    options:
      - { text: "So cosa hanno fatto gli avversari prima di decidere", correct: true, why: "Ogni azione di un avversario è un'informazione. L'ultimo ne ha di più e può {{t:check|fare check}} a basso costo o prendersi il {{t:pot|piatto}} quando gli altri mostrano debolezza." }
      - { text: "Ricevo carte migliori", why: "Le carte sono casuali indipendentemente dalla {{t:position|posizione}}." }
      - { text: "Pago blind più piccoli", why: "Sul Button non paghi i blind, ma non è questo il vantaggio principale. La cosa più importante è l'informazione." }
  # słownictwo PL ↔ EN (decyzja właściciela 4.10.2026): terminy z content/terms.yaml, obszar positions
  - kind: generated
    id: m3.l1.g-vocab-positions
    family: vocab.positions
    generator: vocab
    params: { area: positions, dir: both }
    count: 4
---
Il bottone del dealer (**{{t:button|BTN}}**, Button) si sposta a ogni mano. Da lui dipende l'ordine di azione. Dal flop in poi il Button agisce **per ultimo**, ed è un vantaggio enorme: vedi cosa hanno fatto tutti gli altri prima di decidere. Chi dopo il flop agisce prima di un avversario gioca {{t:out-of-position}}: decide senza conoscere la sua giocata.

## {{t:position|Posizioni}} al tavolo da 6 giocatori

| {{t:position|Posizione}} | Quando agisce | Quanto largo {{t:open|aprire}} |
|---|---|---|
| {{t:utg|UTG}} | Per primo preflop | circa {{n:pf.rfi.utg.low}}–{{n:pf.rfi.utg.high}} delle mani |
| {{t:hijack|HJ}}, {{t:cutoff|CO}} | Dopo {{t:utg|UTG}}; {{t:cutoff|CO}} subito prima del Button | sempre più largo |
| {{t:button|BTN}} | Per ultimo dal flop in poi | circa {{n:pf.rfi.btn.low}}–{{n:pf.rfi.btn.high}} delle mani |
| {{t:small-blind|SB}}, {{t:big-blind|BB}} | Per ultimi preflop, per primi dal flop in poi | lo {{t:small-blind|SB}} {{t:open|apre}} quando tutti {{t:fold|foldano}} (lezione sui {{t:range|range}}); difesa dei blind nel modulo M4 |

L'**{{t:hijack|HJ}}** (Hijack) siede dopo {{t:utg|UTG}}, due posti prima del Button, e il **{{t:cutoff|CO}}** (Cutoff) subito prima del Button. Sono {{t:position|posizioni}} centrali: dietro di loro ci sono meno giocatori che dietro {{t:utg|UTG}}, quindi da lì {{t:open|apri}} più largo, ma comunque più stretto che dal Button.

:::note Dimensione dell'{{t:open|apertura}}
{{t:open|Apri}} con un {{t:raise|rilancio}} a {{n:pf.open-size}} da ogni {{t:position|posizione}}, e dallo {{t:small-blind|small blind}} a {{n:pf.open-size-sb}}. È una semplificazione: nelle soluzioni dei solver le {{t:open|aperture}} dalle {{t:early-position|posizioni iniziali}} sono un po' più piccole (ad es. {{n:pf.open-size.solver-utg}} da {{t:utg|UTG}} e {{n:pf.open-size.solver-co}} dal {{t:cutoff|CO}}), ma un'unica dimensione è più facile da imparare. Quando entri per primo, non ti limiti a pagare il blind (è un {{t:limp}}, cioè entrare con una semplice {{t:call|chiamata}} del {{t:big-blind|big blind}}): un {{t:raise}} può vincere subito il {{t:pot|piatto}} e ti dà l'{{t:initiative|iniziativa}}, perché chi ha {{t:raise|rilanciato}} per ultimo di solito fa la {{t:bet|puntata}} successiva.
:::
