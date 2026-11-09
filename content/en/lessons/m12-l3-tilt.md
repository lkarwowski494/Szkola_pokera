---
id: m12.l3
module: m12
order: 3
title: "Tilt"
sub: "Spot it before it takes over your decisions"
rules: [R-M12-006, R-M12-007, R-M12-008]
drills:
  - kind: choice
    id: m12.l3.q-type-injustice
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "For the third time in an hour, an opponent hits a river card that saves them. You feel the game is unfair and someone has it in for you. Which type of tilt is this, according to the breakdown in this lesson?"
    options:
      - { text: "Injustice tilt", correct: true, why: "Bad beats, coolers and opponents hitting on the river create the feeling that poker is unfair. This is a typical trigger for injustice tilt." }
      - { text: "Mistake tilt", why: "Mistake tilt is about your own errors. Here you are angry at luck, not at your decision." }
      - { text: "Desperation tilt", why: "Desperation is a strong need to win back losses (long {{t:session|sessions}}, higher {{t:stakes}}). Here, for now, it is about feeling wronged." }
  - kind: choice
    id: m12.l3.q-type-revenge
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "The same opponent raises your blinds for the fourth time in a row. You decide that next time you will {{t:raise}} them with any hand, to show them. Which type of tilt is this?"
    options:
      - { text: "Revenge tilt", correct: true, why: "Disrespect, an opponent’s constant aggression and the urge to “show them” are triggers for revenge tilt. The desire for payback starts making the decision, not the math." }
      - { text: "Entitlement tilt", why: "This type comes from the belief that you deserve to win because you are better. Here it is about payback against a specific opponent." }
      - { text: "It’s not tilt, just adjusting to an aggressive opponent", why: "Adjusting means defending wider with well-chosen hands. “Any hand, to show them” is emotion, not strategy." }
  - kind: choice
    id: m12.l3.q-type-desperation
    family: m12.tilt-type
    rules: [R-M12-007]
    prompt: "You are down and you think: “One more hour, and if it doesn’t go well, I’ll move up to higher {{t:stakes}} and win it all back at once.” Which type of tilt is this?"
    options:
      - { text: "Desperation tilt", correct: true, why: "The need to win back losses leads to very long {{t:session|sessions}}, forcing action and jumping up in {{t:stakes}}. It is a signal to stop playing." }
      - { text: "Hate-losing tilt", why: "Close, but here there is also a plan to recover losses with higher {{t:stakes}} and longer play. Those are features of desperation." }
      - { text: "A sensible plan, because higher {{t:stakes}} will win back the losses faster", why: "Higher {{t:stakes}} also increase the swings, and you are making decisions in a bad state. Moving up after a loss is the exact opposite of careful {{t:bankroll}} management (lesson on bankroll and risk)." }
  - kind: choice
    id: m12.l3.q-type-mistake
    family: m12.tilt-type
    rules: [R-M12-008]
    prompt: "You {{t:fold|folded}} the best hand, and since then you can’t stop thinking about it. You are angry at yourself and playing worse and worse. Which type of tilt is this?"
    options:
      - { text: "Mistake tilt", correct: true, why: "Anger at your own errors is mistake tilt. The source is usually the unrealistic expectation that you won’t make mistakes while learning." }
      - { text: "Injustice tilt", why: "Here you are not blaming luck, but yourself. That is mistake tilt." }
      - { text: "Revenge tilt", why: "Revenge is aimed at an opponent. Here the anger is about your decision." }
  - kind: choice
    id: m12.l3.q-type-entitlement
    family: m12.tilt-type
    rules: [R-M12-006]
    prompt: "You are losing to a player who, in your view, plays terribly, and you think: “I’m studying, he isn’t, I should be beating him.” Which type of tilt is this?"
    options:
      - { text: "Entitlement tilt", correct: true, why: "Believing you deserve to win for some reason makes the win feel like your property. When an “undeserving” opponent takes it, tilt appears." }
      - { text: "Hate-losing tilt", why: "This type is about losing in general. Here the key is the belief that you are owed the win." }
      - { text: "Mistake tilt", why: "It is not about your error, but about the feeling that you deserve to win." }
  - kind: choice
    id: m12.l3.q-early-signal
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "After a bad beat you feel anger rising, but you are still playing correctly. What do you do?"
    options:
      - { text: "React now: breathe and use a prepared phrase, e.g. “This is {{t:variance}}, keep playing well”", correct: true, why: "Tilt is corrected while it is small and you can still think. Once it grows, it shuts down your ability to think and control becomes impossible." }
      - { text: "Keep playing until you notice your first mistake", why: "By then the tilt is bigger and harder to stop. It is easiest to react to the first signals." }
      - { text: "Suppress the anger and pretend it isn’t there", why: "It is better to recognize the emotion and answer its cause with a specific thought. Suppression alone does not remove the cause." }
  - kind: choice
    id: m12.l3.q-quit
    family: m12.tilt-response
    rules: [R-M12-007]
    prompt: "For half an hour you have been playing hands you usually {{t:fold}}, and all you think about is winning it back. What do you do?"
    options:
      - { text: "End the {{t:session}}", correct: true, why: "These are signals that you can no longer regain clear thinking. At that point the goal is to stop as soon as possible, not to win the money back." }
      - { text: "Keep playing, but only the best hands", why: "In this state it is hard to stick to resolutions, because the emotion makes decisions for you. It is safer to stop." }
      - { text: "Move up in {{t:stakes}} to win it back faster", why: "That is desperation tilt in its purest form. Higher {{t:stakes}} combined with worse decisions speed up losses." }
  - kind: choice
    id: m12.l3.q-profile
    family: m12.tilt-response
    rules: [R-M12-006]
    prompt: "You want to catch tilt sooner. Where do you start?"
    options:
      - { text: "Write down a profile: what triggers you, what you think and feel, how your game changes", correct: true, why: "Every player tilts a bit differently and for different reasons. A profile lets you recognize the signals before tilt grows: you cannot control something you don’t understand." }
      - { text: "Play higher {{t:stakes}} to toughen up", why: "More pressure does not teach you to recognize tilt. First you need to know what it looks like for you." }
      - { text: "Avoid all opponents who annoy you", why: "Triggers cannot be avoided, because bad beats and aggressive opponents will always happen. The goal is to recognize your reaction and respond to it." }
  - kind: choice
    id: m12.l3.q-c-game
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "Your game has good days and bad days. Where is the fastest lasting progress?"
    options:
      - { text: "In improving your worst game (C-game)", correct: true, why: "Progress resembles how a caterpillar moves: a step forward at the front (a better A-game) and a step at the back (a less terrible C-game). Removing your worst mistakes also frees up attention for learning new things." }
      - { text: "Only in polishing your best game (A-game)", why: "A-game matters, but C-game costs the most. Without improving your worst days, progress at the front is easily lost at the back." }
      - { text: "Nowhere, form is a matter of luck", why: "The spread in form can be narrowed: players who control tilt well have a narrower distribution of play quality (a 2020 review)." }
  - kind: choice
    id: m12.l3.q-compare
    family: m12.abc-game
    rules: [R-M12-008]
    prompt: "How do you check whether your work on the {{t:mental-game}}, that is, handling tilt, emotions and focus, is paying off?"
    options:
      - { text: "Compare your worst {{t:session|sessions}} with your earlier worst ones", correct: true, why: "Compare like with like: your worst game with your earlier worst. Progress also shows when you recognize tilt faster and end the {{t:session}} sooner." }
      - { text: "Look at last week’s results", why: "A week of results is mostly {{t:variance}} (lesson on {{t:variance}}). The quality of your play on your worst days tells you more." }
      - { text: "Compare your best {{t:session}} with your worst", why: "That comparison only shows the spread, not progress. Compare your worst game with your earlier worst." }
---
Tilt is a loss of control driven by negative emotions, usually after bad beats or a long losing streak. It ends in poor decisions and a much bigger loss than usual. It is not rare: in a survey study, {{n:tilt.severe}} of players admitted to severe tilt at least once in the past six months.

## Seven types of tilt

A well-regarded book on poker psychology describes tilt as an anger problem and identifies {{n:tilt.types}} types:

| Type | What triggers it |
|---|---|
| Running bad | Other types of tilt come back so often that your mind doesn’t have time to reset before the next {{t:session}} |
| Injustice | Bad beats, coolers, opponents hitting on the river |
| Hate-losing | Losing itself, even when you know it is {{t:variance}} |
| Mistake | Your own errors |
| Entitlement | The belief that you deserve to win |
| Revenge | Disrespect, an opponent’s constant aggression |
| Desperation | The need to win back losses: marathon sessions, higher {{t:stakes}} |

## Recognize the signals

Everyone tilts a bit differently. Write down your **tilt profile**: what triggers it, what you think and feel at that moment, what you do at the table (e.g. you {{t:call}} too wide, you {{t:raise}} out of revenge). The better you know your signals, the sooner you will catch them.

## React while you can still think

Once tilt grows, it shuts down your ability to think. That is why you react to the first signals:

1. A breath that gives you a moment of distance from the emotion.
2. A prepared phrase that answers the cause, e.g. “Weaker players have to win sometimes, that’s {{t:variance}}. Keep playing well.”
3. If you can no longer think clearly, end the {{t:session}}. Ending earlier, for a good reason, is also progress.

## A-game and C-game

Your game has a spread: from your best (A-game) to your worst (C-game). Progress resembles how a caterpillar moves: a step forward at the front when your best game gets better, and a step at the back when your worst game becomes less terrible. C-game costs the most, so start there.

:::note When it’s more than tilt
If you play longer than you plan, chase losses or play with money you can’t afford to lose, read the “Responsible gaming” card in the lesson on bankroll.
:::
