---
id: m4.l3
module: m4
order: 3
title: "Facing a 3-bet"
sub: "Fold, call or 4-bet"
rules: [R-M4-007, R-M4-008, R-M4-009, R-M4-010, R-M4-011]
drills:
  - kind: choice
    id: m4.l3.q-mdf
    family: m4.vs3bet.math
    rules: [R-M4-007]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}} to {{n:pf.open-size}}, the Button {{t:raise|raised}} to {{n:pf.3bet.ip-total}}, and the blinds {{t:fold|folded}}. What minimum share of your {{t:open|opening}} {{t:range}} must you continue with ({{t:call}} or 4-bet) so the Button doesn't profit from 3-betting any hand?"
    table: { position: CO }
    options:
      - { text: "About {{n:mdf.vs-3bet-ip-size}} of your {{t:open|opening}} {{t:range}}", correct: true, why: "The Button risks {{n:pf.3bet.ip-total}} to win {{n:vs3bet.win}}. If you {{t:fold}} more often than {{n:alpha.vs-3bet-ip-size}}, their 3-bet profits even with the worst hand." }
      - { text: "About half of your {{t:range}}", why: "Too much for a minimum: the math only requires {{n:mdf.vs-3bet-ip-size}}. According to solver solutions and charts, the {{t:open|opener}} {{t:fold|folds}} about {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}} of {{t:open|opens}}, so they continue with less than half of the {{t:range}}." }
      - { text: "Always, with any hand", why: "Then you pay off 3-bets with hands that lose to the Button's {{t:range}}. {{t:fold|Folding}} the weakest part of your {{t:open|opens}} is correct." }
  - kind: choice
    id: m4.l3.q-kjo
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}} to {{n:pf.open-size}}, the Button {{t:raise|raised}} to {{n:pf.3bet.ip-total}}, and the blinds {{t:fold|folded}}. What do you do?"
    table: { hand: "Kc Jd", position: CO }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "Offsuit KJ {{t:out-of-position}} is often dominated by AK, AJ and KQ, and it's hard to play after the flop. Training materials recommend a {{t:fold}} here." }
      - { text: "{{t:call|Call}}", why: "It's tempting because these are high cards, but {{t:out-of-position}} this hand {{t:equity-realization|realizes equity}} poorly and often loses to a better kicker." }
      - { text: "4-bet", why: "KJo is too weak to 4-bet for {{t:value}}, and as a {{t:bluff}} it doesn't block the hands the Button continues with." }
  - kind: choice
    id: m4.l3.q-ako
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}} to {{n:pf.open-size}}, the Button {{t:raise|raised}} to {{n:pf.3bet.ip-total}}, and the blinds {{t:fold|folded}}. What do you do?"
    table: { hand: "As Kd", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "You usually 4-bet AK: it wants to get the stack in, blocks the opponent's AA and KK, and dominates AQ, KQ and weaker aces." }
      - { text: "{{t:call|Call}}", why: "Some sources sometimes {{t:call}} with AK, but you usually 4-bet: {{t:out-of-position}}, after a {{t:call}} you lose the {{t:initiative}} and value." }
      - { text: "{{t:fold|Fold}}", why: "AK is one of the best hands preflop. {{t:fold|Folding}} here is a big mistake." }
  - kind: choice
    id: m4.l3.q-87s
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "You {{t:open|opened}} from the Button to {{n:pf.open-size}}, the {{t:small-blind}} {{t:fold|folded}}, and the {{t:big-blind}} {{t:raise|raised}} to {{n:pf.3bet.oop-total}}. What do you do?"
    table: { hand: "8h 7h", position: BTN }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "A suited {{t:connectors|connector}} {{t:in-position}} {{t:equity-realization|realizes equity}} well: it makes {{t:straight|straights}} and flushes, and when it misses, it's easy to {{t:fold}} on the flop." }
      - { text: "{{t:fold|Fold}}", why: "{{t:in-position|In position}}, this hand is playable enough to defend. A {{t:fold}} would be too tight." }
      - { text: "4-bet", why: "As a {{t:bluff}}, suited aces work better because they block AA and AK. 87s prefers to see a flop." }
  - kind: choice
    id: m4.l3.q-33
    family: m4.vs3bet.ip
    rules: [R-M4-009]
    prompt: "You {{t:open|opened}} from the Button to {{n:pf.open-size}}, the {{t:small-blind}} {{t:fold|folded}}, and the {{t:big-blind}} {{t:raise|raised}} to {{n:pf.3bet.oop-total}}. What do you do?"
    table: { hand: "3c 3d", position: BTN }
    options:
      - { text: "{{t:fold|Fold}}", correct: true, why: "According to one source, you {{t:fold}} the lowest {{t:pair|pairs}} against a large 3-bet even {{t:in-position}}: they profit mainly from hitting a set, and the price is too high. Another source allows {{t:call|calling}} with them {{t:in-position}}." }
      - { text: "{{t:call|Call}}, because I have {{t:position}}", why: "{{t:position|Position}} helps, but against a 3-bet to {{n:pf.3bet.oop-total}} the price is too high for a hand that needs to hit a set." }
      - { text: "4-bet", why: "A {{t:pair}} of 33 is not a 4-betting hand: it's neither value nor a good {{t:bluff}}." }
  - kind: choice
    id: m4.l3.q-qq
    family: m4.vs3bet.value
    rules: [R-M4-010]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}} to {{n:pf.open-size}}, the Button {{t:raise|raised}} to {{n:pf.3bet.ip-total}}, and the blinds {{t:fold|folded}}. What do you do?"
    table: { hand: "Qs Qh", position: CO }
    options:
      - { text: "4-bet", correct: true, why: "One source 4-bets QQ (and JJ) in the vast majority of cases: the Button continues with many weaker {{t:pair|pairs}} and aces." }
      - { text: "{{t:call|Call}}", correct: true, why: "Also a good play: another source puts QQ in the {{t:call|calling}} {{t:range}} so as not to fold out the Button's weaker hands. The sources differ, so both plays are good." }
      - { text: "{{t:fold|Fold}}", why: "QQ is the third-best hand preflop. {{t:fold|Folding}} is a big mistake." }
  - kind: choice
    id: m4.l3.q-ajs
    family: m4.vs3bet.oop
    rules: [R-M4-008]
    prompt: "You {{t:open|opened}} from the {{t:cutoff|CO}} to {{n:pf.open-size}}, the Button {{t:raise|raised}} to {{n:pf.3bet.ip-total}}, and the blinds {{t:fold|folded}}. What do you do?"
    table: { hand: "Ad Jd", position: CO }
    options:
      - { text: "{{t:call|Call}}", correct: true, why: "A strong suited ace is a core part of the {{t:call|calling}} {{t:range}}: it blocks AA and AK and makes flushes and good {{t:pair|pairs}}." }
      - { text: "{{t:fold|Fold}}", why: "Too tight: AJs is one of the best hands to defend against a 3-bet." }
      - { text: "4-bet for {{t:value}}", why: "AJs is too weak to want to play for the whole stack. The Button's better hands dominate it." }
  - kind: choice
    id: m4.l3.q-size
    family: m4.vs3bet.size
    rules: [R-M4-011]
    prompt: "You {{t:open|opened}} from the Button to {{n:pf.open-size}}, the {{t:small-blind}} {{t:raise|raised}} to {{n:pf.3bet.oop-total}}, and the {{t:big-blind}} {{t:fold|folded}}. You have KK and want to 4-bet. To how much?"
    table: { hand: "Kh Kc", position: BTN }
    options:
      - { text: "To about {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}", correct: true, why: "{{t:in-position|In position}}, a 4-bet is about {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} the 3-bet. If the {{t:small-blind}} {{t:call|calls}}, the {{t:pot}} holds about {{n:spr.4bet.pot}}–{{n:spr.4bet.high.pot}} (with the dead {{t:big-blind}}), and about {{n:spr.4bet.high}}–{{n:spr.4bet}} times the {{t:pot}} remains in the stacks." }
      - { text: "To {{n:pf.4bet.too-small}}", why: "Too small: you give your opponent a very good price to {{t:call}} {{t:out-of-position}}." }
      - { text: "All-in for {{n:format.stack}}", why: "With {{n:format.stack}} stacks, going all-in pushes out the weaker hands your opponent would have called a 4-bet with. You win less." }
---
A 3-bet is your opponent's response to your {{t:open}}. You have three options: {{t:fold}}, {{t:call}}, or {{t:raise}} again, which means 4-betting.

:::note Where these rules come from
This lesson is based on training materials from several sources and published results from other solvers, not on the app's solver. The app's solver has not yet been validated for play against a 3-bet, so the rules are marked as heuristics.
:::

## How much to continue

When the Button {{t:raise|raises}} your {{t:open}} from the {{t:cutoff|CO}} to {{n:pf.3bet.ip-total}}, they risk that much to win {{n:vs3bet.win}}. If you {{t:fold}} more often than {{n:alpha.vs-3bet-ip-size}}, their 3-bet profits with any hand. So you must continue with at least about {{n:mdf.vs-3bet-ip-size}} of your {{t:open|opening}} {{t:range}}.

According to a published solver solution ({{t:cutoff|CO}} against a Button 3-bet to {{n:pf.3bet.ip-total}}), the {{t:open|opener}} {{t:fold|folds}} about {{n:pf.vs3bet.pub1.fold}} of {{t:open|opens}}, {{t:call|calls}} about {{n:pf.vs3bet.pub1.call}} and 4-bets about {{n:pf.vs3bet.pub1.4bet}}; simplified charts from another source give about {{n:pf.vs3bet.pub2.fold}} / {{n:pf.vs3bet.pub2.call}} / {{n:pf.vs3bet.pub2.4bet}}. We adopt intervals close to both sources: {{t:fold}} about {{n:pf.vs3bet.fold.low}}–{{n:pf.vs3bet.fold.high}}, {{t:call}} about {{n:pf.vs3bet.call.low}}–{{n:pf.vs3bet.call.high}}, 4-bet about {{n:pf.vs3bet.4bet.low}}–{{n:pf.vs3bet.4bet.high}}. The upper limit for {{t:fold|folds}} sits just below the {{n:alpha.vs-3bet-ip-size}} threshold: if you folded more often, the Button's 3-bet would profit with any hand. To {{t:call}}, you need about {{n:eq.call-3bet-ip-size}} equity: you put {{n:vs3bet.call}} into a {{t:pot}} that holds {{n:vs3bet.pot-after}} after the {{t:call}}.

## {{t:out-of-position|Out of position}}, choose carefully

{{t:out-of-position|Out of position}}, you {{t:call}} with hands that play well after the flop: mainly suited high cards (KQs, QJs), strong suited aces, medium and high {{t:pair|pairs}}, and some suited {{t:connectors}}. Weaker offsuit hands such as KJo, ATo or QTo are often dominated, so you {{t:fold}} them.

## {{t:in-position|In position}}, defend wider

{{t:in-position|In position}}, you also {{t:call}} with {{t:pair|pairs}} from 66 to TT and suited {{t:connectors}} (T9s, 98s, 87s). According to one source, you {{t:fold}} the lowest {{t:pair|pairs}} against a large 3-bet even {{t:in-position}}: they profit mainly from hitting a set, and the price is too high. Another source allows {{t:call|calling}} with them {{t:in-position}}.

## 4-bet

You usually 4-bet AA, KK and AK for {{t:value}}; some sources sometimes {{t:call}} with AK. The sources play QQ and JJ differently: one mostly 4-bets, the other {{t:call|calls}}. As a {{t:bluff}}, suited aces such as A5s are best: they block the opponent's AA and AK, and after a {{t:call}} they have a chance to make a {{t:flush}} or a {{t:straight}}. A 4-bet is about {{n:pf.4bet.size-ip.low}}–{{n:pf.4bet.size-ip.high}} the 3-bet {{t:in-position}} and {{n:pf.4bet.size-oop.low}}–{{n:pf.4bet.size-oop.high}} {{t:out-of-position}}. For example, when you 4-bet from the Button against a 3-bet from the {{t:small-blind}} to {{n:pf.3bet.oop-total}} (the {{t:big-blind}} {{t:fold|folded}}), you {{t:raise}} to {{n:pf.4bet.example.low}}–{{n:pf.4bet.example.high}}; when you 4-bet from the {{t:cutoff|CO}} against a Button 3-bet to {{n:pf.3bet.ip-total}}, you {{t:raise}} to about {{n:pf.4bet.oop-example.low}}. After a {{t:call}}, about {{n:spr.4bet.high}}–{{n:spr.4bet.oop}} times the {{t:pot}} remains in the stacks, so good hands can easily get the rest in.
