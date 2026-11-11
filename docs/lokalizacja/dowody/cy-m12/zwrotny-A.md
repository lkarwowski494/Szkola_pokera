# Przekład zwrotny (grupa A)

## en
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być od niej daleko, a wygrywający gracz może nawet skończyć na minusie. Obliczenie: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.
UWAGA: "Interval: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}." — zapis „≈ ± połowa” gubi środek przedziału (oczekiwaną wartość) i nie podaje granic; dotyczy wszystkich języków (identyczny zapis).

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate: po niej nie wiesz nawet, czy wygrywasz. Obliczenie: błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.
UWAGA: "Interval: ... ≈ ± {{n:exam.m12.ci.wr}}." — jak w q1: zapis nie podaje granic przedziału, tylko połowę jego szerokości (dotyczy wszystkich języków).

### q3
Wyższe {{t:standard-deviation}} wymaga znacznie większej próby: {{t:standard-deviation}} występuje we wzorze w kwadracie, a błąd maleje tylko z pierwiastkiem liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten pozostaje wyraźnie powyżej zera. Obliczenie (przybliżenie dla stałego winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## de
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może leżeć daleko od niej, a gracz wygrywający może nawet wylądować na minusie. Rachunek: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|odchylenie standardowe}} wyniku wynosi {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tys. rąk to dla winrate mała próba: potem nie wiesz nawet, czy wygrywasz. Rachunek: błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Wyższe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd maleje tylko z pierwiastkiem z liczby rąk. Rachunek: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tys.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak tutaj pozostaje wyraźnie powyżej zera. Rachunek (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, czyli RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## es
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być bardzo daleko od niej, a gracz wygrywający może nawet skończyć na minusie. Obliczenie: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, to znaczy {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, to znaczy około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate: po nich nie wiesz nawet, czy jesteś na plusie jako gracz. Obliczenie: błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Większe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd maleje tylko z pierwiastkiem kwadratowym liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, to znaczy około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni cię przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten wciąż jest wyraźnie większe od zera. Obliczenie (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## fr
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być bardzo od niej odległy, a gracz wygrywający może nawet skończyć na minusie. Obliczenie: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|odchylenie standardowe}} wyniku wynosi {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate: po tym nie wiesz nawet, czy jesteś graczem wygrywającym. Obliczenie: błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Wyższe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} występuje we wzorze w kwadracie, a błąd maleje tylko z pierwiastkiem liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten pozostaje wyraźnie powyżej zera. Obliczenie (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, zatem RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## it
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być bardzo od niej odległy, a gracz wygrywający może nawet zakończyć na minusie. Obliczenie: spodziewasz się {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|odchylenie standardowe}} wyniku wynosi {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate: potem nie wiesz nawet, czy wygrywasz. Obliczenie: błąd winrate to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Wyższe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} pojawia się we wzorze w kwadracie, a błąd maleje tylko z pierwiastkiem liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten pozostaje wyraźnie wyższe od zera. Obliczenie (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, zatem RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## ja
### q1
Oczekiwany wynik to zaledwie średnia. Rzeczywisty wynik może się mocno od średniej różnić, a nawet gracz wygrywający może skończyć na minusie. Obliczenie: oczekiwany wynik to {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Zakres: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to dla oszacowania winrate mała próba. Przy niej nie wiadomo nawet, czy się wygrywa. Obliczenie: błąd winrate to SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Zakres: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Im wyższe {{t:standard-deviation|odchylenie standardowe}}, tym znacznie większa próba jest potrzebna. Dzieje się tak dlatego, że {{t:standard-deviation|odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd zmniejsza się tylko z pierwiastkiem liczby rąk. Obliczenie: liczba bloków = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Nawet dodatni winrate nie chroni przed {{t:variance|wariancją}}. Ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten pozostaje wyraźnie większe od zera. Obliczenie (przybliżenie przy stałym winrate i SD). Wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}. Zatem RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.
