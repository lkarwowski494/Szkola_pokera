# Przekład zwrotny (grupa B)

## ko
### q1
Oczekiwany wynik to tylko średnia. Rzeczywisty wynik może odbiegać od średniej bardzo daleko, a wygrywający gracz też może skończyć ze stratą. Obliczenie: oczekiwany wynik to {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|Odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}},000 rąk to mała próba do oceny winrate'u. Nawet po nich nie da się stwierdzić, czy w ogóle się wygrywa. Obliczenie: błąd winrate'u to SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Im wyższe {{t:standard-deviation|odchylenie standardowe}}, tym znacznie większa potrzebna próba. {{t:standard-deviation|Odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd maleje tylko wraz z pierwiastkiem z liczby rąk. Obliczenie: liczba bloków = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}},000 rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}. Ryzyko utraty bankrolla maleje wykładniczo wraz ze wzrostem bankrolla, ale przy niskim winrate i takim bankrollu jest zdecydowanie większe od zera. Obliczenie (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, zatem RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## pt-BR
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być bardzo daleko od niej, a wygrywający gracz może nawet skończyć na minusie. Obliczenie: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|Odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate'u: po nich nawet nie wiesz, czy wygrywasz. Obliczenie: błąd winrate'u to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Większe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd maleje tylko z pierwiastkiem z liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten nadal jest wyraźnie większe od zera. Obliczenie (przybliżenie ze stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## pt
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być bardzo daleko od niej, a wygrywający gracz może nawet skończyć na minusie. Obliczenie: oczekuje Pan(i) {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-iny}}. {{t:standard-deviation|Odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-iny}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate'u: po nich nawet nie wie Pan(i), czy wygrywa. Obliczenie: błąd winrate'u to SD ÷ √(bloki) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Wyższe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} wchodzi do wzoru w kwadracie, a błąd maleje tylko z pierwiastkiem kwadratowym z liczby rąk. Obliczenie: bloki = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni przed {{t:variance|wariancją}}: ryzyko utraty bankrolla maleje wykładniczo wraz z bankrollem, ale przy niskim winrate i takim bankrollu jak ten nadal jest wyraźnie większe od zera. Obliczenie (przybliżenie ze stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, w związku z czym RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## vi
### q1
Oczekiwany wynik to tylko pewien poziom średni: rzeczywisty wynik może odbiegać daleko od tego poziomu, a wygrywający gracz może nawet zakończyć na stracie. Obliczenie: oczekujesz {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|Odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, czyli około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to mała próba dla winrate'u: po nich nawet nie wiesz, czy wygrywasz. Obliczenie: błąd winrate'u to SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Wyższe {{t:standard-deviation|odchylenie standardowe}} wymaga znacznie większej próby: {{t:standard-deviation|odchylenie standardowe}} występuje we wzorze w postaci kwadratu, a błąd maleje tylko z pierwiastkiem kwadratowym z liczby rąk. Obliczenie: liczba bloków = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, czyli około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie chroni cię przed {{t:variance|wariancją}}: ryzyko utraty całego bankrolla maleje wykładniczo wraz ze wzrostem bankrolla, ale przy niskim winrate i takim bankrollu jak tutaj ryzyko nadal jest wyraźnie większe od 0. Obliczenie (przybliżenie przy stałym winrate i SD): wykładnik: 2 × winrate × bankroll ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, zatem RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.

## zh-Hant
### q1
Oczekiwany wynik to tylko średnia: rzeczywisty wynik może być od niej bardzo daleko, a zwycięzca może nawet skończyć ze stratą. Obliczenie: twoja wartość oczekiwana to {{n:var.wr.typical.high}} × {{n:exam.m12.blocks}} = {{n:exam.m12.exp.bb}}, czyli {{n:exam.m12.exp.bi}} {{t:buy-in|buy-in}}. {{t:standard-deviation|Odchylenie standardowe}} wyniku to {{n:var.sd}} × √{{n:exam.m12.blocks}} ≈ {{n:exam.m12.sd.bb}}, około {{n:exam.m12.sd.bi}} {{t:buy-in|buy-in}}. Przedział: {{n:exam.m12.exp.bi}} ± {{n:var.z95}} × {{n:exam.m12.sd.bi}} ≈ ± {{n:exam.m12.ci.half.bi}}.

### q2
{{n:exam.m12.hands.k}} tysięcy rąk to dla winrate'u bardzo mała próba: po ich rozegraniu nie wiesz nawet, czy jesteś zwycięzcą. Obliczenie: błąd winrate'u to SD ÷ √(liczba bloków) = {{n:var.sd}} ÷ {{n:exam.m12.sqrt-blocks}} ≈ {{n:exam.m12.se.wr}}. Przedział: {{n:var.wr.typical.high}} ± {{n:var.z95}} × {{n:exam.m12.se.wr}} ≈ ± {{n:exam.m12.ci.wr}}.

### q3
Im wyższe {{t:standard-deviation|odchylenie standardowe}}, tym znacznie większa potrzebna próba: {{t:standard-deviation|odchylenie standardowe}} we wzorze jest podniesione do kwadratu, a błąd zmniejsza się tylko wraz z pierwiastkiem kwadratowym z liczby rąk. Obliczenie: liczba bloków = ({{n:var.z95}} × {{n:var.sd.high}} ÷ {{n:var.target}})² = {{n:exam.m12.need.ratio}}² ≈ {{n:exam.m12.need.blocks}}, około {{n:exam.m12.need.hands.k}} tysięcy rąk.

### q8
Dodatni winrate nie pozwala uniknąć wpływu {{t:variance|wariancji}}: ryzyko utraty całych środków maleje wykładniczo wraz ze wzrostem środków, ale przy niskim winrate i środkach takich jak tutaj nadal jest wyraźnie większe od zera. Obliczenie (przybliżenie przy stałych winrate i SD): wykładnik: 2 × winrate × środki ÷ SD² = {{n:ror.two}} × {{n:dd.wr-low}} × {{n:exam.m12.ror.bb}} ÷ {{n:var.sd.sq}} = {{n:exam.m12.ror.x}}, więc RoR = e^(−{{n:exam.m12.ror.x}}) ≈ {{n:exam.m12.ror}}.
