# Niezależny rachunek równowagi Nasha push/fold heads-up (szczebel 1: rachunek), bez kodu solvera projektu.
# Dane: macierz equity 169x169 i liczba rozłącznych par kombinacji (tools/equity/equity169.json).
# Model: stack S przed wpłatą blindów (jak PokerStrategy: „before the blinds are posted”), SB 0,5, BB 1;
# opcjonalnie big blind ante A (martwe pieniądze wpłacone przez BB ponad stack S, jak tools/preflop-solver/src/pushfold.ts:6). Argument: S albo S:A.
# Metoda: fictitious play (gra dwuosobowa o sumie zerowej, zbieżna), 20000 iteracji, wynik w % kombinacji.
import json, sys
d = json.load(open(sys.argv[1])); E = d['equity']; P = d['pairs']; C = d['classes']; n = len(C)
comb = [6 if len(c) == 2 else (4 if c[2] == 's' else 12) for c in C]
def solve(S, it=20000, A=0.0):
    push = [1.0]*n; call = [1.0]*n
    sp = [0.0]*n; sc = [0.0]*n
    for t in range(1, it+1):
        # najlepsza odpowiedź SB na call (średni)
        bp = []
        for i in range(n):
            w = 0; ev = 0
            for j in range(n):
                pij = P[i][j]
                if not pij: continue
                w += pij
                ev += pij * (call[j]*(E[i][j]*(2*S+A) - S) + (1-call[j])*(1.0+A))
            bp.append(1.0 if ev/w > -0.5 else 0.0)
        bc = []
        for j in range(n):
            w = 0; ev = 0
            for i in range(n):
                pij = P[j][i]
                if not pij: continue
                w += pij*push[i]
                ev += pij*push[i]*(E[j][i]*(2*S+A) - S - A)
            bc.append(1.0 if w and ev/w > -(1.0+A) else 0.0)
        a = 1.0/(t+1)
        push = [(1-a)*push[i] + a*bp[i] for i in range(n)]
        call = [(1-a)*call[j] + a*bc[j] for j in range(n)]
    pp = sum(comb[i]*push[i] for i in range(n))/1326; cc = sum(comb[i]*call[i] for i in range(n))/1326
    return pp, cc
for arg in sys.argv[2:]:
    S, A = (list(map(float, arg.split(':'))) + [0.0])[:2]
    pp, cc = solve(S, int(__import__("os").environ.get("ITER","3000")), A)
    print(f"S={S:g}bb ante BB={A:g} push {pp*100:.2f}% call {cc*100:.2f}%")
