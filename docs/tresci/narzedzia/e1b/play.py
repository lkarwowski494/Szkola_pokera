# Niezależne przeliczenie playPercent (jak tools/content-build/src/ranges.ts) dla 24 liczb solvera.
import json, sys, re
R = sys.argv[1]
ranks = 'AKQJT98765432'
def combos(hc):
    if len(hc)==2: return 6
    return 4 if hc[2]=='s' else 12
# spots.yaml: prosty parser pól id/solver/path/groups
txt = open(R+'/content/ranges/spots.yaml').read()
spots = {}
cur=None
for line in txt.splitlines():
    m=re.match(r'^- id: (\S+)',line)
    if m: cur={'id':m.group(1),'solver':'preflop-6max-100bb.json'}; spots[cur['id']]=cur; continue
    if cur is None: continue
    m=re.match(r'^\s+solver: (\S+)',line)
    if m: cur['solver']=m.group(1)
    m=re.match(r'^\s+path: "(.*)"',line)
    if m: cur['path']=m.group(1)
    m=re.match(r'^\s+groups: (?:&\S+ )?\{(.*)\}',line)
    if m: cur['labels']=re.findall(r'"([a-z\- ]+[0-9.]*)"',m.group(1).split(':',1)[1]) if ':' in m.group(1) else []
    m=re.match(r'^\s+groups: \*(\S+)',line)
    if m: cur['alias']=m.group(1)
# rozwiązanie aliasów
anch={}
for line in txt.splitlines():
    m=re.match(r'^\s+groups: &(\S+) \{(.*)\}',line)
    if m: anch[m.group(1)]=re.findall(r'\[([^\]]*)\]',m.group(2))
for s in spots.values():
    if 'alias' in s: s['labels']=[x.strip().strip('"') for g in anch[s['alias']] for x in g.split(',')]
files={}
nums={}
for line in open(R+'/content/numbers.yaml'):
    m=re.match(r'^(\S+): \{ formula: rangePlay, spot: (\S+),',line)
    if m: nums[m.group(1)]=m.group(2)
for key,sid in nums.items():
    s=spots[sid]; f=s['solver']
    if f not in files: files[f]={n['path']:n for n in json.load(open(R+'/content/ranges/'+f))['spots']}
    node=files[f][s['path']]
    idx=[node['actions'].index(l) for l in s['labels']]
    tot=0; hcs=list(node['strategy'][0].keys())
    for hc in hcs:
        fr=sum(round(node['strategy'][i][hc]*1000)/1000 for i in idx)
        tot+=combos(hc)*fr
    print(f"{key}\t{sid}\t{node['player']}\t{'+'.join(s['labels'])}\t{len(hcs)}\t{tot/1326*100:.2f}")
