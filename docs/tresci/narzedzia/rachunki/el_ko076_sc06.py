import json
import os; R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../../../')
e=json.load(open(R+'tools/equity/equity169.json')); C=e['classes']; EQ=e['equity']; P=e['pairs']; N=len(C)
pre=json.load(open(R+'content/ranges/preflop-6max-100bb.json'))
print(list(pre.keys())[:5])
n=[s for s in pre['spots'] if s['path']=="UTG:fold,HJ:fold,CO:fold,BTN:fold"][0]
f=n['strategy'][n['actions'].index('raise 3')]
sila=[sum(P[k][j]*EQ[k][j] for j in range(N))/sum(P[k][j] for j in range(N)) for k in range(N)]
rows=[]
for k in range(N):
    if f[C[k]]>=0.97:
        m=min(abs(sila[k]-sila[j]) for j in range(N) if f[C[j]]<=0.5)
        rows.append((C[k],sila[k],m))
keep=[r for r in rows if r[2]>=0.02]
print('SC-06 L klas',len(rows),'po filtrze',len(keep))
fold=sorted([(sila[j],C[j]) for j in range(N) if f[C[j]]<=0.5],reverse=True)[:8]
print('najsilniejsze (EVR) klasy pasu:',[(c,round(s,3)) for s,c in fold])
print('najslabsze (EVR) klasy L po filtrze:',sorted([(round(r[1],3),r[0]) for r in keep])[:10])
print('klasy L odpadajace:',sorted([r[0] for r in rows if r[2]<0.02]))
