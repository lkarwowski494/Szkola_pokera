import json,sys
import os; R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../../')
e=json.load(open(R+'tools/equity/equity169.json')); C=e['classes']; EQ=e['equity']; P=e['pairs']
pf=json.load(open(R+'content/ranges/pushfold.json'))['spots']
def node(path):
    n=[s for s in pf if s['path']==path][0]; return n
def freq(n,act):
    i=n['actions'].index(act); return n['strategy'][i] if len(n['strategy'])==len(n['actions']) else None
push=node('10bb|'); call=node('10bb|SB:allin')
print('push actions',push['actions'],len(push['strategy'])); 
fp=push['strategy'][push['actions'].index('all-in')]; fc=call['strategy'][call['actions'].index('call')]
N=len(C)
sila=[sum(P[k][j]*EQ[k][j] for j in range(N))/sum(P[k][j] for j in range(N)) for k in range(N)]
def evr_margin(f,k):
    return min(abs(sila[k]-sila[j]) for j in range(N) if f[C[j]]<=0.5)
def eq_vs(k,f):  # equity klasy k wobec zakresu f (waga czestosc x pary kombinacji bez kolizji)
    w=sum(P[k][j]*f[C[j]] for j in range(N)); return sum(P[k][j]*f[C[j]]*EQ[k][j] for j in range(N))/w, w
S=10
out=[]
# SC-33 call: margin = eq vs push - 0.45
for k in range(N):
    if fc[C[k]]>=0.97:
        eq,_=eq_vs(k,fp); out.append(('call',C[k],evr_margin(fc,k),eq-0.45))
# SC-32 push: EV(push)-EV(fold) in bb
tot=sum(P[k][j] for j in range(N))/N
for k in range(N):
    if fp[C[k]]>=0.97:
        wall=sum(P[k][j] for j in range(N)); wc=sum(P[k][j]*fc[C[j]] for j in range(N)); pc=wc/wall
        eq=sum(P[k][j]*fc[C[j]]*EQ[k][j] for j in range(N))/wc if wc else 0
        d=(1-pc)*1+pc*(eq*2*S-S)+0.5
        out.append(('push',C[k],evr_margin(fp,k),d))
for typ in ('call','push'):
    rows=[r for r in out if r[0]==typ]
    keep=[r for r in rows if r[2]>=0.02]; 
    print(f'\n== {typ}: klas Ł {len(rows)}, po filtrze EVR>=2pp {len(keep)}')
    dmetric='eq-0.45 (pp)' if typ=='call' else 'EVpush-EVpas (bb)'
    rs=sorted(rows,key=lambda r:r[3])
    print('najblizej granicy wg miary bezposredniej', dmetric)
    for r in rs[:15]: print(f'  {r[1]:5s} EVRmarg={r[2]*100:5.2f}pp direct={r[3]*(100 if typ=="call" else 1):7.3f} {"ZOSTAJE" if r[2]>=0.02 else "odpada"}')
    thr = 0.02 if typ=='call' else None
    if typ=='call':
        fk=[r for r in rows if r[2]>=0.02 and r[3]<0.02]; fr=[r for r in rows if r[2]<0.02 and r[3]>=0.02]
        print(f'  zostaje mimo marginesu bezposredniego <2pp: {len(fk)} {[r[1] for r in fk]}')
        print(f'  odpada mimo marginesu bezposredniego >=2pp: {len(fr)} {[r[1] for r in fr]}')
    else:
        for t in (0.05,0.1,0.2):
            fk=[r for r in rows if r[2]>=0.02 and r[3]<t]; fr=[r for r in rows if r[2]<0.02 and r[3]>=t]
            print(f'  prog {t} bb: zostaje mimo EV<prog {len(fk)} {[r[1] for r in fk]}; odpada mimo EV>=prog {len(fr)}')
