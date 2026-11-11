# Teksty do przekładu zwrotnego (grupa A)
Uwaga: {{n:klucz}} i {{t:klucz|forma}} to znaczniki liczb i terminów; zostaw je bez zmian (w terminach oddaj sens formy po |).

## en
### q1
Pytanie: You win {{n:var.wr.typical.high}} on average with a {{t:standard-deviation}} of {{n:var.sd}}, and you will play {{n:exam.m12.hands.k}} thousand hands ({{n:exam.m12.blocks}} blocks of 100). In what interval will your result fall with about {{n:var.conf95}} confidence?
Odpowiedź poprawna: From about {{n:exam.m12.ci.low.bi}} to about {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): The expected result is only an average: the actual result can be far from it, and a winning player can even finish in the red. Calculation: you expect {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, which is {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. The {{t:standard-deviation}} of the result is {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, which is about {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Interval: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: After {{n:exam.m12.hands.k}} thousand hands, your winrate is {{n:var.wr.typical.high}} and your {{t:standard-deviation}} is {{n:var.sd}}. What do you know about your true winrate?
Odpowiedź poprawna: With about {{n:var.conf95}} confidence, it lies between about {{n:exam.m12.wr.ci.low}} and about {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} thousand hands is a small sample for a winrate: after it you don't even know whether you are winning. Calculation: the winrate error is SD ÷ √(blocks) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Interval: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: You play aggressively and your {{t:standard-deviation}} is {{n:var.sd.high}}. You want to know your winrate to within ± {{n:var.target}} with {{n:var.conf95}} confidence. How many hands do you need?
Odpowiedź poprawna: About {{n:exam.m12.need.hands.k}} thousand
Wyjaśnienie (do przekładu zwrotnego): A higher {{t:standard-deviation}} requires a much larger sample: the {{t:standard-deviation}} is squared in the formula, and the error shrinks only with the square root of the number of hands. Calculation: blocks = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, which is about {{n:exam.m12.need.hands.k}} thousand hands.

### q8
Pytanie: You win {{n:dd.wr-low}} with a {{t:standard-deviation}} of {{n:var.sd}}, and you have {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). What is the risk of losing your entire bankroll if you never move down in {{t:stakes}}?
Odpowiedź poprawna: About {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): A positive winrate doesn't protect you from {{t:variance}}: the risk of losing a bankroll shrinks exponentially with the bankroll, but with a low winrate and a bankroll like this one it stays clearly above zero. Calculation (an approximation for a constant winrate and SD): exponent: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, so RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## de
### q1
Pytanie: Du gewinnst im Schnitt {{n:var.wr.typical.high}} bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}} und spielst {{n:exam.m12.hands.k}} Tsd. Hände ({{n:exam.m12.blocks}} Blöcke à 100). In welchem Intervall liegt dein Ergebnis mit etwa {{n:var.conf95}} Sicherheit?
Odpowiedź poprawna: Von etwa {{n:exam.m12.ci.low.bi}} bis etwa {{n:exam.m12.ci.high.bi}} {{t:buy-in|Buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): Das erwartete Ergebnis ist nur ein Durchschnitt: Das tatsächliche Ergebnis kann weit davon entfernt liegen, und ein Gewinnspieler kann sogar im Minus landen. Rechnung: Du erwartest {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, also {{n:exam.m12.exp.bi}} {{t:buy-in|Buy-ins}}. Die {{t:standard-deviation|Standardabweichung}} des Ergebnisses beträgt {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, also etwa {{n:exam.m12.sd.bi}} {{t:buy-in|Buy-ins}}. Intervall: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Nach {{n:exam.m12.hands.k}} Tsd. Händen liegt deine Winrate bei {{n:var.wr.typical.high}}, die {{t:standard-deviation|Standardabweichung}} bei {{n:var.sd}}. Was weißt du über deine wahre Winrate?
Odpowiedź poprawna: Mit etwa {{n:var.conf95}} Sicherheit liegt sie zwischen etwa {{n:exam.m12.wr.ci.low}} und etwa {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} Tsd. Hände sind für die Winrate eine kleine Stichprobe: Danach weißt du nicht einmal, ob du gewinnst. Rechnung: Der Fehler der Winrate ist SD ÷ √(Blöcke) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervall: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Du spielst aggressiv, und deine {{t:standard-deviation|Standardabweichung}} beträgt {{n:var.sd.high}}. Du willst deine Winrate auf ± {{n:var.target}} genau kennen, bei {{n:var.conf95}} Sicherheit. Wie viele Hände brauchst du?
Odpowiedź poprawna: Etwa {{n:exam.m12.need.hands.k}} Tsd.
Wyjaśnienie (do przekładu zwrotnego): Eine höhere {{t:standard-deviation|Standardabweichung}} erfordert eine viel größere Stichprobe: Die {{t:standard-deviation|Standardabweichung}} geht quadratisch in die Formel ein, und der Fehler sinkt nur mit der Wurzel aus der Handzahl. Rechnung: Blöcke = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, also etwa {{n:exam.m12.need.hands.k}} Tsd.

### q8
Pytanie: Du gewinnst {{n:dd.wr-low}} bei einer {{t:standard-deviation|Standardabweichung}} von {{n:var.sd}} und hast {{n:exam.m12.ror.bi}} {{t:buy-in|Buy-ins}} ({{n:exam.m12.ror.bb}}). Wie hoch ist das Risiko, deine gesamte Bankroll zu verlieren, wenn du nie ein {{t:stakes|Limit}} runtergehst?
Odpowiedź poprawna: Etwa {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Eine positive Winrate schützt nicht vor {{t:variance|Varianz}}: Das Risiko, die Bankroll zu verlieren, sinkt exponentiell mit der Bankroll, bleibt aber bei niedriger Winrate und einer Bankroll wie hier deutlich über null. Rechnung (Näherung bei konstanter Winrate und SD): Exponent: 2 × Winrate × Bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, also RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## es
### q1
Pytanie: Ganas de media {{n:var.wr.typical.high}} con una {{t:standard-deviation|desviación estándar}} de {{n:var.sd}} y vas a jugar {{n:exam.m12.hands.k}} mil manos ({{n:exam.m12.blocks}} bloques de 100). ¿En qué intervalo caerá tu resultado con una confianza de aprox. el {{n:var.conf95}}?
Odpowiedź poprawna: De aprox. {{n:exam.m12.ci.low.bi}} a aprox. {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): El resultado esperado es solo un promedio: el resultado real puede estar muy lejos de él, y un jugador ganador puede incluso terminar en negativo. Cálculo: esperas {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, es decir, {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. La {{t:standard-deviation|desviación estándar}} del resultado es {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, es decir, aprox. {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalo: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Tras {{n:exam.m12.hands.k}} mil manos, tu winrate es {{n:var.wr.typical.high}} y tu {{t:standard-deviation|desviación estándar}}, {{n:var.sd}}. ¿Qué sabes de tu winrate real?
Odpowiedź poprawna: Con una confianza de aprox. el {{n:var.conf95}}, está entre aprox. {{n:exam.m12.wr.ci.low}} y aprox. {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} mil manos son una muestra pequeña para el winrate: tras ellas ni siquiera sabes si eres ganador. Cálculo: el error del winrate es SD ÷ √(bloques) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervalo: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Juegas de forma agresiva y tu {{t:standard-deviation|desviación estándar}} es de {{n:var.sd.high}}. Quieres conocer tu winrate con una precisión de ± {{n:var.target}} y una confianza del {{n:var.conf95}}. ¿Cuántas manos necesitas?
Odpowiedź poprawna: Aprox. {{n:exam.m12.need.hands.k}} mil
Wyjaśnienie (do przekładu zwrotnego): Una {{t:standard-deviation|desviación estándar}} mayor exige una muestra mucho más grande: la {{t:standard-deviation|desviación estándar}} entra al cuadrado en la fórmula, y el error solo disminuye con la raíz cuadrada del número de manos. Cálculo: bloques = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, es decir, aprox. {{n:exam.m12.need.hands.k}} mil manos.

### q8
Pytanie: Ganas {{n:dd.wr-low}} con una {{t:standard-deviation|desviación estándar}} de {{n:var.sd}} y tienes {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). ¿Cuál es el riesgo de perder todo tu bankroll si nunca bajas de {{t:stakes|límite}}?
Odpowiedź poprawna: Aprox. {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Un winrate positivo no te protege de la {{t:variance|varianza}}: el riesgo de perder el bankroll disminuye exponencialmente con el bankroll, pero con un winrate bajo y un bankroll como este sigue siendo claramente mayor que cero. Cálculo (aproximación con winrate y SD constantes): exponente: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, así que RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## fr
### q1
Pytanie: Vous gagnez en moyenne {{n:var.wr.typical.high}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous allez jouer {{n:exam.m12.hands.k}} mille mains ({{n:exam.m12.blocks}} blocs de 100). Dans quel intervalle votre résultat se situera-t-il avec environ {{n:var.conf95}} de confiance ?
Odpowiedź poprawna: D'environ {{n:exam.m12.ci.low.bi}} à environ {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): Le résultat attendu n'est qu'une moyenne : le résultat réel peut en être très éloigné, et un joueur gagnant peut même finir dans le rouge. Calcul : vous attendez {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, soit {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. L'{{t:standard-deviation|écart-type}} du résultat est de {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, soit environ {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalle : {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Après {{n:exam.m12.hands.k}} mille mains, votre winrate est de {{n:var.wr.typical.high}} et votre {{t:standard-deviation|écart-type}} de {{n:var.sd}}. Que savez-vous de votre vrai winrate ?
Odpowiedź poprawna: Avec environ {{n:var.conf95}} de confiance, il se situe entre environ {{n:exam.m12.wr.ci.low}} et environ {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} mille mains, c'est un petit échantillon pour le winrate : après cela, vous ne savez même pas si vous êtes gagnant. Calcul : l'erreur sur le winrate est SD ÷ √(blocs) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervalle : {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Vous jouez de manière agressive et votre {{t:standard-deviation|écart-type}} est de {{n:var.sd.high}}. Vous voulez connaître votre winrate à ± {{n:var.target}} près avec {{n:var.conf95}} de confiance. De combien de mains avez-vous besoin ?
Odpowiedź poprawna: Environ {{n:exam.m12.need.hands.k}} mille
Wyjaśnienie (do przekładu zwrotnego): Un {{t:standard-deviation|écart-type}} plus élevé exige un échantillon beaucoup plus grand : l'{{t:standard-deviation|écart-type}} figure au carré dans la formule, et l'erreur ne diminue qu'avec la racine du nombre de mains. Calcul : blocs = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, soit environ {{n:exam.m12.need.hands.k}} mille mains.

### q8
Pytanie: Vous gagnez {{n:dd.wr-low}} avec un {{t:standard-deviation|écart-type}} de {{n:var.sd}} et vous avez {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Quel est le risque de perdre toute votre bankroll si vous ne descendez jamais de {{t:stakes|limite}} ?
Odpowiedź poprawna: Environ {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Un winrate positif ne protège pas de la {{t:variance|variance}} : le risque de perdre la bankroll diminue exponentiellement avec la bankroll, mais avec un winrate faible et une bankroll comme celle-ci, il reste nettement supérieur à zéro. Calcul (approximation à winrate et SD constants) : exposant : 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, donc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## it
### q1
Pytanie: Vinci in media {{n:var.wr.typical.high}} con una {{t:standard-deviation|deviazione standard}} di {{n:var.sd}} e giocherai {{n:exam.m12.hands.k}} mila mani ({{n:exam.m12.blocks}} blocchi da 100). In quale intervallo cadrà il tuo risultato con circa il {{n:var.conf95}} di confidenza?
Odpowiedź poprawna: Da circa {{n:exam.m12.ci.low.bi}} a circa {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-in}}
Wyjaśnienie (do przekładu zwrotnego): Il risultato atteso è solo una media: il risultato reale può essere molto lontano da essa, e un giocatore vincente può persino chiudere in negativo. Calcolo: ti aspetti {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, cioè {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. La {{t:standard-deviation|deviazione standard}} del risultato è {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, cioè circa {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Intervallo: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Dopo {{n:exam.m12.hands.k}} mila mani il tuo winrate è {{n:var.wr.typical.high}}, con {{t:standard-deviation|deviazione standard}} {{n:var.sd}}. Cosa sai del tuo winrate reale?
Odpowiedź poprawna: Con circa il {{n:var.conf95}} di confidenza è compreso tra circa {{n:exam.m12.wr.ci.low}} e circa {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} mila mani sono un campione piccolo per il winrate: dopo, non sai nemmeno se stai vincendo. Calcolo: l'errore del winrate è SD ÷ √(blocchi) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervallo: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Giochi in modo aggressivo e la tua {{t:standard-deviation|deviazione standard}} è {{n:var.sd.high}}. Vuoi conoscere il winrate con una precisione di ± {{n:var.target}} al {{n:var.conf95}} di confidenza. Quante mani ti servono?
Odpowiedź poprawna: Circa {{n:exam.m12.need.hands.k}} mila
Wyjaśnienie (do przekładu zwrotnego): Una {{t:standard-deviation|deviazione standard}} più alta richiede un campione molto più grande: la {{t:standard-deviation|deviazione standard}} compare al quadrato nella formula, e l'errore diminuisce solo con la radice del numero di mani. Calcolo: blocchi = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, cioè circa {{n:exam.m12.need.hands.k}} mila mani.

### q8
Pytanie: Vinci {{n:dd.wr-low}} con una {{t:standard-deviation|deviazione standard}} di {{n:var.sd}} e hai {{n:exam.m12.ror.bi}} {{t:buy-in|buy-in}} ({{n:exam.m12.ror.bb}}). Qual è il rischio di perdere tutto il bankroll se non scendi mai di {{t:stakes|limite}}?
Odpowiedź poprawna: Circa {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Un winrate positivo non protegge dalla {{t:variance|varianza}}: il rischio di perdere il bankroll diminuisce in modo esponenziale con il bankroll, ma con un winrate basso e un bankroll come questo resta nettamente superiore a zero. Calcolo (approssimazione con winrate e SD costanti): esponente: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, quindi RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## ja
### q1
Pytanie: 平均{{n:var.wr.typical.high}}で勝っていて、{{t:standard-deviation|標準偏差}}は{{n:var.sd}}です。これから{{n:exam.m12.hands.k}}千ハンド（100ハンドを1ブロックとして{{n:exam.m12.blocks}}ブロック）をプレイします。約{{n:var.conf95}}の確信度で、結果はどの範囲に収まりますか？
Odpowiedź poprawna: 約{{n:exam.m12.ci.low.bi}}〜約{{n:exam.m12.ci.high.bi}}{{t:buy-in|バイイン}}
Wyjaśnienie (do przekładu zwrotnego): 期待される結果は平均にすぎません。実際の結果は平均から大きく離れることがあり、勝っているプレイヤーでもマイナスで終わることがあります。計算：期待される結果は{{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}、つまり{{n:exam.m12.exp.bi}}{{t:buy-in|バイイン}}です。結果の{{t:standard-deviation|標準偏差}}は{{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}、つまり約{{n:exam.m12.sd.bi}}{{t:buy-in|バイイン}}です。範囲：{{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}。

### q2
Pytanie: {{n:exam.m12.hands.k}}千ハンドをプレイした時点で、ウィンレートは{{n:var.wr.typical.high}}、{{t:standard-deviation|標準偏差}}は{{n:var.sd}}です。本当のウィンレートについて何が分かりますか？
Odpowiedź poprawna: 約{{n:var.conf95}}の確信度で、約{{n:exam.m12.wr.ci.low}}〜約{{n:exam.m12.wr.ci.high}}の間にある
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}}千ハンドはウィンレートの推定には小さなサンプルです。それでは勝っているかどうかさえ分かりません。計算：ウィンレートの誤差はSD ÷ √(ブロック数) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}です。範囲：{{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}。

### q3
Pytanie: アグレッシブにプレイしていて、{{t:standard-deviation|標準偏差}}は{{n:var.sd.high}}です。{{n:var.conf95}}の確信度で、ウィンレートを± {{n:var.target}}の精度で知りたいとします。何ハンド必要ですか？
Odpowiedź poprawna: 約{{n:exam.m12.need.hands.k}}千ハンド
Wyjaśnienie (do przekładu zwrotnego): {{t:standard-deviation|標準偏差}}が高いほど、はるかに大きなサンプルが必要です。{{t:standard-deviation|標準偏差}}は式の中で2乗で入り、誤差はハンド数の平方根でしか小さくならないからです。計算：ブロック数 = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}、つまり約{{n:exam.m12.need.hands.k}}千ハンドです。

### q8
Pytanie: {{t:standard-deviation|標準偏差}}{{n:var.sd}}で{{n:dd.wr-low}}勝っていて、手元には{{n:exam.m12.ror.bi}}{{t:buy-in|バイイン}}（{{n:exam.m12.ror.bb}}）あります。{{t:stakes|ステークス}}を一度も下げない場合、バンクロール全体を失うリスクはどれくらいですか？
Odpowiedź poprawna: 約{{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): ウィンレートがプラスでも{{t:variance|分散}}からは守られません。バンクロールを失うリスクはバンクロールに応じて指数的に下がりますが、ウィンレートが低く、このくらいのバンクロールではゼロよりはっきり大きいままです。計算（ウィンレートとSDを一定とする近似）。指数：2 × ウィンレート × バンクロール ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}。したがってRoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}です。

