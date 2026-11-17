# rozklad-czestosci.py — rozkład częstości pierwszej grupy w treści pl: python3 -I rozklad-czestosci.py <tresc-*-pl.db>
import sqlite3, json, sys, collections
db = sqlite3.connect(sys.argv[1])
rows = db.execute("select id,title,play_percent,groups,uncertain from ranges").fetchall()
b = collections.Counter(); ng = collections.Counter(); near=[]
best=None
for id_,t,p,g,u in rows:
    g=json.loads(g); u=json.loads(u); ng[len(g)]+=1
    f=g[0]['freqs']
    mid=sum(1 for x in f if 0.15<x<0.85)
    if best is None or mid>best[0]: best=(mid,id_,t,len(u))
    for x in f:
        if x==0: b['0']+=1
        elif x<=0.15: b['(0,0.15]']+=1
        elif x<0.85: b['(0.15,0.85)']+=1
        elif x<1: b['[0.85,1)']+=1
        elif x==1: b['1']+=1
        else: b['>1']+=1
        if 0.99<x<1: near.append(x)
    s=[sum(gg['freqs'][i] for gg in g) for i in range(169)]
    if max(s)>1.0000001: print('suma>1', id_, max(s))
print(len(rows), dict(ng), dict(b)); print('0.99<f<1:', len(near), sorted(set(near))[:10])
print('min f>0:', min(x for r in rows for x in json.loads(r[3])[0]['freqs'] if x>0))
print('najwiecej posrednich:', best)
