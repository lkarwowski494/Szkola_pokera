import json, itertools, sys
from collections import Counter
d=json.load(open('content/ranges/preflop-6max-100bb.json'))
S={v['path']:v for v in d['spots']}
def rng(path,action):
    v=S[path]; i=v['actions'].index(action); return v['strategy'][i]
BTN=rng('UTG:fold,HJ:fold,CO:fold','raise 2.5')
BB=rng('UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold','call 2.5')
R='23456789TJQKA'; SU='cdhs'
def combos(cls):
    if len(cls)==2: return [(cls[0]+a,cls[1]+b) for a,b in itertools.combinations(SU,2)]
    if cls[2]=='s': return [(cls[0]+a,cls[1]+a) for a in SU]
    return [(cls[0]+a,cls[1]+b) for a in SU for b in SU if a!=b]
def cat(cards):
    rs=sorted([R.index(c[0]) for c in cards],reverse=True); cnt=Counter(rs); suits=Counter(c[1] for c in cards)
    flush=max(suits.values())>=5
    u=set(rs); 
    if 12 in u: u.add(-1)
    straight=any(all(x in u for x in range(h-4,h+1)) for h in range(3,13))
    c=sorted(cnt.values(),reverse=True)
    if flush and straight: return 'sf'  # approx
    if c[0]==4: return 'quads'
    if c[0]==3 and len(c)>1 and c[1]>=2: return 'full'
    if flush: return 'flush'
    if straight: return 'straight'
    if c[0]==3: return 'trips'
    if c[0]==2 and c[1]==2: return 'twopair'
    if c[0]==2: return 'pair'
    return 'high'
def stat(R_,board):
    b=board.split(); tot=0; hit=Counter()
    for cls,f in R_.items():
        if f<=0: continue
        for h in combos(cls):
            if set(h)&set(b): continue
            tot+=f; hit[cat(list(h)+b)]+=f
    return tot,hit
for board in ['8h 6d 5c','Kd Td 3s','Ah Ad 7c']:
    out=[]
    for name,R_ in (('BTN',BTN),('BB',BB)):
        tot,h=stat(R_,board); tp=h['twopair']+h['straight']
        out.append(f"{name}: zakres {tot:.1f} komb., dwie pary {h['twopair']:.1f}, strit {h['straight']:.1f}, razem {tp:.1f} = {100*tp/tot:.1f}% | trójka {h['trips']:.1f}, full {h['full']:.1f}")
    print(board,'\n  '+'\n  '.join(out))
print('--- wariant: BB = call + raise10 (obrona łącznie, spot zwalidowany)')
BBr=rng('UTG:fold,HJ:fold,CO:fold,BTN:raise2.5,SB:fold','raise 10')
BBd={k:BB[k]+BBr[k] for k in BB}
for board in ['8h 6d 5c','Kd Td 3s','Ah Ad 7c']:
    for name,R_ in (('BTN',BTN),('BBdef',BBd)):
        tot,h=stat(R_,board); tp=h['twopair']+h['straight']
        print(board,name,f"{100*tp/tot:.1f}% (dwie pary {h['twopair']:.1f}, strit {h['straight']:.1f}, sety/trójki {h['trips']:.1f}) / {tot:.0f}")
print('BB call 55,66,88,76s,75s,64s,97s:',[ (k,round(BB[k],2),round(BBr[k],2)) for k in ['55','66','77','88','76s','75s','64s','97s','74s','43s','65s','87s']])
print('BTN open:',[(k,round(BTN[k],2)) for k in ['55','66','76s','75s','64s','97s','74s','43s','65s','87s','76o','97o','A7o','K7o','Q7o','J7o','T7o','97o','87o','77','A7s','K7s','Q7s','J7s','T7s']])
