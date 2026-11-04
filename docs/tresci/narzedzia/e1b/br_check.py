# Najlepsza odpowiedź BB na zakres pushu z tabeli PokerStrategy (i SB na zakres sprawdzenia), ten sam model co nash_hu.py.
import json, sys, importlib.util
spec=importlib.util.spec_from_file_location('rp', sys.argv[2]); rp=importlib.util.module_from_spec(spec); sys.argv_bak=sys.argv; spec.loader.exec_module(rp)
d=json.load(open(sys.argv[1])); E=d['equity']; P=d['pairs']; C=d['classes']; n=len(C)
comb=[6 if len(c)==2 else (4 if c[2]=='s' else 12) for c in C]
def hands(s):
    hs=set()
    for t in s.split(','):
        if t.strip(): hs|=rp.expand(t)
    return hs
S=float(sys.argv[3]); push=hands(sys.argv[4]); call=hands(sys.argv[5])
pv=[1.0 if c in push else 0.0 for c in C]; cv=[1.0 if c in call else 0.0 for c in C]
# BB vs push
bc=0
for j in range(n):
    w=sum(P[j][i]*pv[i] for i in range(n)); ev=sum(P[j][i]*pv[i]*(E[j][i]*2*S-S) for i in range(n))
    if w and ev/w>-1: bc+=comb[j]
bp=0
for i in range(n):
    w=sum(P[i][j] for j in range(n)); ev=sum(P[i][j]*(cv[j]*(E[i][j]*2*S-S)+(1-cv[j])) for j in range(n))
    if ev/w>-0.5: bp+=comb[i]
print(f"S={S:g}: BR BB na push z tabeli = {bc/1326*100:.2f}%  BR SB na call z tabeli = {bp/1326*100:.2f}%")
