# HA (06-tresci): niezależny rachunek trzech liczb D-1461 (przegląd D-1495). Ułamki dokładne, bez kodu content-build.
# Definicja: potrzebne equity do sprawdzenia = zakład / (pula + 2·zakład) (pula przed zakładem rywala).
from fractions import Fraction as F
pula = F(100)
frac_dokladny = F(2, 3)
frac_wpis = F('0.666667')          # wartość w content/numbers.yaml (dana zadania, zaokrąglenie 2/3)
for nazwa, fr in (('dokładnie 2/3', frac_dokladny), ('wpis 0.666667', frac_wpis)):
    zaklad = pula * fr
    eq = zaklad / (pula + 2 * zaklad)
    print(f'{nazwa}: zakład = {float(zaklad):.6f} (pokaz {round(float(zaklad))}), equity = {eq} = {float(eq):.9f} -> {round(float(eq)*100)}%')
print('2/7 =', float(F(2, 7)))
print('różnica wpis - dokładnie =', float(frac_wpis * pula / (pula + 2 * frac_wpis * pula) - F(2, 7)))
# Kontrola sąsiednich rozmiarów (spójność z eq.bet-quarter i eq.bet-three-quarters w numbers.yaml):
for fr in (F(1, 4), F(3, 4)):
    z = pula * fr; print(f'ułamek {fr}: equity = {float(z/(pula+2*z)):.6f}')
