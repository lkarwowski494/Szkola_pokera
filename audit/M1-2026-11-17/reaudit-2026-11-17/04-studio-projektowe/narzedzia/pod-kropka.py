import sqlite3, json, sys
db = sqlite3.connect('file:'+sys.argv[1]+'?mode=ro', uri=True)
R='AKQJT98765432'
HC=[]
for i in range(13):
    for j in range(13):
        if i==j: HC.append(R[i]+R[j])
        elif j>i: HC.append(R[i]+R[j]+'s')
        else: HC.append(R[j]+R[i]+'o')
tot=0; buckets={'felt(>=0.95)':0,'granica(0.75-0.95)':0,'surface(<0.75)':0}
for id_,groups,unc in db.execute("select id,groups,uncertain from ranges"):
    g=json.loads(groups); u=json.loads(unc)
    if not u: continue
    print(id_, 'grup:',len(g), 'klas:',len(u))
    for hc in u:
        i=HC.index(hc); s=sum((x['freqs'][i] if i<len(x['freqs']) else 0) for x in g)
        tot+=1
        k='felt(>=0.95)' if s>=0.95 else ('granica(0.75-0.95)' if s>=0.75 else 'surface(<0.75)')
        buckets[k]+=1
        if id_.startswith('vs-open.bb-vs-btn'): print('   ',hc, round(s,2), k)
print('razem klas niepewnych:',tot, buckets)
