# Teksty do przekładu zwrotnego (grupa B)
Uwaga: {{n:klucz}} i {{t:klucz|forma}} to znaczniki liczb i terminów; zostaw je bez zmian (w terminach oddaj sens formy po |).

## ko
### q1
Pytanie: 평균 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이고, 앞으로 {{n:exam.m12.hands.k}},000핸드(100핸드 블록 {{n:exam.m12.blocks}}개)를 플레이합니다. 약 {{n:var.conf95}} 신뢰도로 결과는 어떤 범위에 들어갑니까?
Odpowiedź poprawna: 약 {{n:exam.m12.ci.low.bi}}~약 {{n:exam.m12.ci.high.bi}} {{t:buy-in|바이인}}
Wyjaśnienie (do przekładu zwrotnego): 기대 결과는 평균일 뿐입니다. 실제 결과는 평균에서 멀리 벗어날 수 있고, 이기는 플레이어도 손실로 끝날 수 있습니다. 계산: 기대 결과는 {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, 즉 {{n:exam.m12.exp.bi}} {{t:buy-in|바이인}}입니다. 결과의 {{t:standard-deviation|표준편차}}는 {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, 즉 약 {{n:exam.m12.sd.bi}} {{t:buy-in|바이인}}입니다. 범위: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: {{n:exam.m12.hands.k}},000핸드 후 윈레이트는 {{n:var.wr.typical.high}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}입니다. 진짜 윈레이트에 대해 무엇을 알 수 있습니까?
Odpowiedź poprawna: 약 {{n:var.conf95}} 신뢰도로 약 {{n:exam.m12.wr.ci.low}}와 약 {{n:exam.m12.wr.ci.high}} 사이에 있습니다
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}},000핸드는 윈레이트를 판단하기에 작은 표본입니다. 그 뒤에도 이기고 있는지조차 알 수 없습니다. 계산: 윈레이트의 오차는 SD ÷ √(블록 수) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}입니다. 범위: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: 공격적으로 플레이하며 {{t:standard-deviation|표준편차}}는 {{n:var.sd.high}}입니다. {{n:var.conf95}} 신뢰도로 윈레이트를 ± {{n:var.target}} 정확도로 알고 싶습니다. 몇 핸드가 필요합니까?
Odpowiedź poprawna: 약 {{n:exam.m12.need.hands.k}},000핸드
Wyjaśnienie (do przekładu zwrotnego): {{t:standard-deviation|표준편차}}가 높을수록 훨씬 큰 표본이 필요합니다. {{t:standard-deviation|표준편차}}는 공식에서 제곱으로 들어가고, 오차는 핸드 수의 제곱근에 따라서만 줄어듭니다. 계산: 블록 수 = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, 즉 약 {{n:exam.m12.need.hands.k}},000핸드입니다.

### q8
Pytanie: 윈레이트는 {{n:dd.wr-low}}, {{t:standard-deviation|표준편차}}는 {{n:var.sd}}이고, {{n:exam.m12.ror.bi}} {{t:buy-in|바이인}}({{n:exam.m12.ror.bb}})이 있습니다. {{t:stakes|스테이크}}를 절대 내리지 않는다면 뱅크롤 전체를 잃을 위험은 얼마입니까?
Odpowiedź poprawna: 약 {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): 플러스 윈레이트가 {{t:variance|분산}}을 막아 주지는 않습니다. 뱅크롤을 잃을 위험은 뱅크롤이 커질수록 지수적으로 줄지만, 윈레이트가 낮고 이 정도 뱅크롤에서는 0보다 확실히 큽니다. 계산(윈레이트와 SD가 일정하다는 근사): 지수: 2 × 윈레이트 × 뱅크롤 ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}이므로 RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}입니다.

## pt-BR
### q1
Pytanie: Você ganha em média {{n:var.wr.typical.high}} com um {{t:standard-deviation|desvio padrão}} de {{n:var.sd}} e vai jogar {{n:exam.m12.hands.k}} mil mãos ({{n:exam.m12.blocks}} blocos de 100). Em que intervalo seu resultado vai cair, com cerca de {{n:var.conf95}} de confiança?
Odpowiedź poprawna: De cerca de {{n:exam.m12.ci.low.bi}} a cerca de {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): O resultado esperado é apenas uma média: o resultado real pode ficar bem longe dela, e um jogador vencedor pode até terminar no prejuízo. Cálculo: você espera {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, ou seja, {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. O {{t:standard-deviation|desvio padrão}} do resultado é {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, ou seja, cerca de {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalo: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Após {{n:exam.m12.hands.k}} mil mãos, seu winrate é {{n:var.wr.typical.high}}, com {{t:standard-deviation|desvio padrão}} de {{n:var.sd}}. O que você sabe sobre seu winrate real?
Odpowiedź poprawna: Com cerca de {{n:var.conf95}} de confiança, ele está entre cerca de {{n:exam.m12.wr.ci.low}} e cerca de {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} mil mãos são uma amostra pequena para o winrate: depois delas você nem sabe se está ganhando. Cálculo: o erro do winrate é SD ÷ √(blocos) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervalo: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Você joga de forma agressiva e seu {{t:standard-deviation|desvio padrão}} é {{n:var.sd.high}}. Você quer saber seu winrate com precisão de ± {{n:var.target}} com {{n:var.conf95}} de confiança. De quantas mãos você precisa?
Odpowiedź poprawna: Cerca de {{n:exam.m12.need.hands.k}} mil
Wyjaśnienie (do przekładu zwrotnego): Um {{t:standard-deviation|desvio padrão}} maior exige uma amostra muito maior: o {{t:standard-deviation|desvio padrão}} entra ao quadrado na fórmula, e o erro só diminui com a raiz do número de mãos. Cálculo: blocos = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, ou seja, cerca de {{n:exam.m12.need.hands.k}} mil mãos.

### q8
Pytanie: Você ganha {{n:dd.wr-low}} com um {{t:standard-deviation|desvio padrão}} de {{n:var.sd}} e tem {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Qual é o risco de perder todo o bankroll se você nunca descer de {{t:stakes|limite}}?
Odpowiedź poprawna: Cerca de {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Um winrate positivo não protege contra a {{t:variance|variância}}: o risco de perder o bankroll diminui exponencialmente com o bankroll, mas com um winrate baixo e um bankroll como este ele continua claramente maior que zero. Cálculo (aproximação com winrate e SD constantes): expoente: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, então RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## pt
### q1
Pytanie: Ganha, em média, {{n:var.wr.typical.high}} com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}} e vai jogar {{n:exam.m12.hands.k}} mil mãos ({{n:exam.m12.blocks}} blocos de 100). Em que intervalo ficará o seu resultado, com cerca de {{n:var.conf95}} de confiança?
Odpowiedź poprawna: De cerca de {{n:exam.m12.ci.low.bi}} a cerca de {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-ins}}
Wyjaśnienie (do przekładu zwrotnego): O resultado esperado é apenas uma média: o resultado real pode ficar muito longe dela, e um jogador vencedor pode até acabar no negativo. Cálculo: espera {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, ou seja, {{n:exam.m12.exp.bi}} {{t:buy-in|buy-ins}}. O {{t:standard-deviation|desvio-padrão}} do resultado é {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, ou seja, cerca de {{n:exam.m12.sd.bi}} {{t:buy-in|buy-ins}}. Intervalo: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Após {{n:exam.m12.hands.k}} mil mãos, o seu winrate é {{n:var.wr.typical.high}} e o {{t:standard-deviation|desvio-padrão}} é {{n:var.sd}}. O que sabe sobre o seu verdadeiro winrate?
Odpowiedź poprawna: Com cerca de {{n:var.conf95}} de confiança, situa-se entre cerca de {{n:exam.m12.wr.ci.low}} e cerca de {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} mil mãos são uma amostra pequena para o winrate: depois delas nem sequer sabe se está a ganhar. Cálculo: o erro do winrate é SD ÷ √(blocos) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Intervalo: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Joga de forma agressiva e o seu {{t:standard-deviation|desvio-padrão}} é de {{n:var.sd.high}}. Quer conhecer o seu winrate com uma precisão de ± {{n:var.target}} e {{n:var.conf95}} de confiança. De quantas mãos precisa?
Odpowiedź poprawna: Cerca de {{n:exam.m12.need.hands.k}} mil
Wyjaśnienie (do przekładu zwrotnego): Um {{t:standard-deviation|desvio-padrão}} mais elevado exige uma amostra muito maior: o {{t:standard-deviation|desvio-padrão}} entra ao quadrado na fórmula, e o erro só diminui com a raiz quadrada do número de mãos. Cálculo: blocos = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, ou seja, cerca de {{n:exam.m12.need.hands.k}} mil mãos.

### q8
Pytanie: Ganha {{n:dd.wr-low}} com um {{t:standard-deviation|desvio-padrão}} de {{n:var.sd}} e tem {{n:exam.m12.ror.bi}} {{t:buy-in|buy-ins}} ({{n:exam.m12.ror.bb}}). Qual é o risco de perder todo o bankroll se nunca descer de {{t:stakes|limite}}?
Odpowiedź poprawna: Cerca de {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Um winrate positivo não protege da {{t:variance|variância}}: o risco de perder o bankroll diminui exponencialmente com o bankroll, mas com um winrate baixo e um bankroll como este continua claramente superior a zero. Cálculo (aproximação com winrate e SD constantes): expoente: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, pelo que RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## vi
### q1
Pytanie: Bạn thắng trung bình {{n:var.wr.typical.high}} với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}} và sẽ chơi {{n:exam.m12.hands.k}} nghìn tay ({{n:exam.m12.blocks}} khối, mỗi khối 100 tay). Với độ tin cậy khoảng {{n:var.conf95}}, kết quả của bạn sẽ nằm trong khoảng nào?
Odpowiedź poprawna: Từ khoảng {{n:exam.m12.ci.low.bi}} đến khoảng {{n:exam.m12.ci.high.bi}} {{t:buy-in|buy-in}}
Wyjaśnienie (do przekładu zwrotnego): Kết quả kỳ vọng chỉ là một mức trung bình: kết quả thực tế có thể lệch xa mức đó, và một người chơi thắng thậm chí có thể kết thúc ở mức lỗ. Tính toán: bạn kỳ vọng {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, tức là {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|Độ lệch chuẩn}} của kết quả là {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, tức là khoảng {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Khoảng: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
Pytanie: Sau {{n:exam.m12.hands.k}} nghìn tay, winrate của bạn là {{n:var.wr.typical.high}}, {{t:standard-deviation|độ lệch chuẩn}} là {{n:var.sd}}. Bạn biết gì về winrate thực của mình?
Odpowiedź poprawna: Với độ tin cậy khoảng {{n:var.conf95}}, nó nằm giữa khoảng {{n:exam.m12.wr.ci.low}} và khoảng {{n:exam.m12.wr.ci.high}}
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} nghìn tay là mẫu nhỏ đối với winrate: sau đó bạn thậm chí còn không biết mình có đang thắng hay không. Tính toán: sai số của winrate là SD ÷ √(số khối) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Khoảng: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Pytanie: Bạn chơi hung hăng và {{t:standard-deviation|độ lệch chuẩn}} của bạn là {{n:var.sd.high}}. Bạn muốn biết winrate với độ chính xác ± {{n:var.target}} ở độ tin cậy {{n:var.conf95}}. Bạn cần bao nhiêu tay?
Odpowiedź poprawna: Khoảng {{n:exam.m12.need.hands.k}} nghìn
Wyjaśnienie (do przekładu zwrotnego): {{t:standard-deviation|Độ lệch chuẩn}} cao hơn đòi hỏi mẫu lớn hơn nhiều: {{t:standard-deviation|độ lệch chuẩn}} nằm dưới dạng bình phương trong công thức, còn sai số chỉ giảm theo căn bậc hai của số tay. Tính toán: số khối = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, tức là khoảng {{n:exam.m12.need.hands.k}} nghìn tay.

### q8
Pytanie: Bạn thắng {{n:dd.wr-low}} với {{t:standard-deviation|độ lệch chuẩn}} {{n:var.sd}} và có {{n:exam.m12.ror.bi}} {{t:buy-in|buy-in}} ({{n:exam.m12.ror.bb}}). Rủi ro mất toàn bộ bankroll là bao nhiêu nếu bạn không bao giờ xuống {{t:stakes|mức cược}}?
Odpowiedź poprawna: Khoảng {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): Winrate dương không bảo vệ bạn khỏi {{t:variance|phương sai}}: rủi ro mất toàn bộ bankroll giảm theo hàm mũ khi bankroll tăng, nhưng với winrate thấp và bankroll như ở đây thì rủi ro vẫn lớn hơn 0 rõ rệt. Tính toán (xấp xỉ khi winrate và SD không đổi): số mũ: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, nên RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## zh-Hant
### q1
Pytanie: 你平均贏 {{n:var.wr.typical.high}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}，接下來要打 {{n:exam.m12.hands.k}} 千手牌（{{n:exam.m12.blocks}} 個每 100 手的區塊）。你的結果約有 {{n:var.conf95}} 的把握會落在哪個區間？
Odpowiedź poprawna: 約 {{n:exam.m12.ci.low.bi}} 到約 {{n:exam.m12.ci.high.bi}} 個{{t:buy-in|買入}}
Wyjaśnienie (do przekładu zwrotnego): 期望結果只是平均值：實際結果可能離它很遠，贏家甚至可能以虧損收場。計算：你的期望是 {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}，也就是 {{n:exam.m12.exp.bi}} 個{{t:buy-in|買入}}。結果的{{t:standard-deviation|標準差}}是 {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}，約 {{n:exam.m12.sd.bi}} 個{{t:buy-in|買入}}。區間：{{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}。

### q2
Pytanie: 打了 {{n:exam.m12.hands.k}} 千手牌後，你的贏率是 {{n:var.wr.typical.high}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}。關於你真正的贏率，你知道什麼？
Odpowiedź poprawna: 約有 {{n:var.conf95}} 的把握，它落在約 {{n:exam.m12.wr.ci.low}} 到約 {{n:exam.m12.wr.ci.high}} 之間
Wyjaśnienie (do przekładu zwrotnego): {{n:exam.m12.hands.k}} 千手牌對贏率來說是很小的樣本：打完之後，你甚至不知道自己是不是贏家。計算：贏率的誤差是 SD ÷ √(區塊數) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}。區間：{{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}。

### q3
Pytanie: 你打法激進，{{t:standard-deviation|標準差}}為 {{n:var.sd.high}}。你想以 {{n:var.conf95}} 的把握，把贏率精確到 ± {{n:var.target}}。你需要多少手牌？
Odpowiedź poprawna: 約 {{n:exam.m12.need.hands.k}} 千手
Wyjaśnienie (do przekładu zwrotnego): {{t:standard-deviation|標準差}}越高，需要的樣本就大得多：{{t:standard-deviation|標準差}}在公式中是平方，而誤差只會隨手數的平方根縮小。計算：區塊數 = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}，約 {{n:exam.m12.need.hands.k}} 千手牌。

### q8
Pytanie: 你的贏率是 {{n:dd.wr-low}}，{{t:standard-deviation|標準差}}為 {{n:var.sd}}，手上有 {{n:exam.m12.ror.bi}} 個{{t:buy-in|買入}}（{{n:exam.m12.ror.bb}}）。如果你永遠不降{{t:stakes|級別}}，輸光全部資金的風險是多少？
Odpowiedź poprawna: 約 {{n:exam.m12.ror}}
Wyjaśnienie (do przekładu zwrotnego): 正的贏率無法讓你免受{{t:variance|變異數}}影響：損失全部資金的風險會隨資金增加而呈指數下降，但在贏率偏低、資金像這裡一樣的情況下，仍明顯大於零。計算（贏率與 SD 固定時的近似）：指數：2 × 贏率 × 資金 ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}，所以 RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}。

