# Udział kombinacji listy rąk w notacji PokerStrategy (22+, Jx+, T2s+, T5o+ ...); Jx+ = wszystkie J i wyższe karty z dowolną.
import sys, re
R='AKQJT98765432'; v={r:i for i,r in enumerate(R)}
def expand(tok):
    tok=tok.strip().replace(',o','o')
    out=set()
    m=re.fullmatch(r'(\w)\1\+',tok)
    if m:
        for r in R[:v[m.group(1)]+1]: out.add(r+r); 
        return out
    m=re.fullmatch(r'(\w)\1',tok)
    if m: return {tok}
    m=re.fullmatch(r'(\w)x\+',tok)  # dowolna ręka z kartą >= X (pary już zwykle w 22+)
    if m:
        for hi in R[:v[m.group(1)]+1]:
            for lo in R[v[hi]+1:]:
                out|={hi+lo+'s',hi+lo+'o'}
        return out
    m=re.fullmatch(r'(\w)(\w)([so])\+',tok)
    if m:
        hi,lo,s=m.groups()
        for l in R[v[hi]+1:v[lo]+1]: out.add(hi+l+s)
        return out
    m=re.fullmatch(r'(\w)(\w)([so])',tok)
    if m: return {tok}
    m=re.fullmatch(r'(\w)(\w)\+',tok)
    if m:
        hi,lo=m.groups()
        for l in R[v[hi]+1:v[lo]+1]: out|={hi+l+'s',hi+l+'o'}
        return out
    m=re.fullmatch(r'(\w)(\w)',tok)
    if m: return {tok+'s',tok+'o'}
    raise ValueError(tok)
def pct(s):
    hs=set()
    for t in s.split(','):
        if t.strip(): hs|=expand(t)
    return sum(6 if len(h)==2 else (4 if h[2]=='s' else 12) for h in hs)/1326*100
if __name__=="__main__":
  for s in sys.argv[1:]: print(f"{pct(s):.2f}%  {s}")
