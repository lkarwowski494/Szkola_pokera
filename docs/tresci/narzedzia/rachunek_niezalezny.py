"""Rola 06 E1: niezależne przeliczenie liczb z formułą z content/numbers.yaml (bez poker-core).
Wzory z definicji (RD-01–RD-03 w docs/brd/reguly.md, rachunek prawdopodobieństwa, model ICM Malmutha-Harville'a).
Użycie: python3 -I rachunek_niezalezny.py <numbers.yaml> <wartosci-aplikacji.json> -> raport na stdout, kod 1 przy rozbieżności.
rangePlay (dane solvera) i flopWetnessShare (klasyfikacja aplikacji) nie są rachunkiem z definicji: tylko wypisane."""
import json, math, sys, itertools
from fractions import Fraction as F
import yaml

num = yaml.safe_load(open(sys.argv[1], encoding='utf-8'))
app = json.load(open(sys.argv[2]))
vals, pominiete = {}, []

def icm(stacks, pays, i):
    n, tot = len(stacks), sum(stacks)
    res = [0.0] * n
    def rec(order, rem):
        p = 1.0; left = tot
        for k in order: p *= stacks[k] / left; left -= stacks[k]
        return p
    for perm in itertools.permutations(range(n), min(n, len(pays))):
        p = rec(perm, None)
        for place, k in enumerate(perm): res[k] += p * pays[place]
    # permutacje skrócone liczą prawdopodobieństwo prefiksu poprawnie (Harville)
    return res[i]

def comb(n, k): return math.comb(n, k)

def val(k):
    if k in vals: return vals[k]
    e = num[k]; f = e.get('formula')
    if f is None: v = float(e['value'])
    else:
        r = [val(x) for x in e.get('refs', [])]; a = r if r else e.get('args', [])
        if f == 'sum': v = sum(r)
        elif f == 'product': v = math.prod(r)
        elif f == 'diff': v = r[0] - sum(r[1:])
        elif f == 'quotient': v = a[0] / a[1]
        elif f == 'requiredEquity': v = a[1] / (a[0] + 2 * a[1])
        elif f == 'mdf': v = a[0] / (a[0] + a[1])
        elif f == 'alpha': v = a[1] / (a[0] + a[1])
        elif f == 'hitProbability': o, u, c = map(int, a); v = 1 - comb(u - o, c) / comb(u, c)
        elif f == 'missProbability': o, u, c = map(int, a); v = comb(u - o, c) / comb(u, c)
        elif f == 'ruleOf2And4': v = a[0] * (4 if int(a[1]) == 2 else 2) / 100
        elif f == 'geometric': v = ((1 + 2 * a[0]) ** (1 / a[1]) - 1) / 2
        elif f == 'sqrt': v = math.sqrt(a[0])
        elif f == 'exp': v = math.exp(a[0])
        elif f == 'normCdf': v = 0.5 * (1 + math.erf(a[0] / math.sqrt(2)))
        elif f == 'icm':
            p, i = e['args']; v = icm(r[:p], r[p:], i)
        else:
            pominiete.append((k, f)); v = app[k]
    vals[k] = v; return v

bad = []
for k in num:
    v = val(k)
    if abs(v - app[k]) > 1e-6 * max(1, abs(v)): bad.append((k, num[k].get('formula'), v, app[k]))
formuly = sum(1 for k in num if 'formula' in num[k])
print(f'liczby: {len(num)}, z formułą: {formuly}, pominięte (nie z definicji): {len(pominiete)}')
for k, f in pominiete: print(f'POMINIĘTE {k} ({f})')
for b in bad: print(f'ROZBIEŻNOŚĆ {b[0]} ({b[1]}): niezależnie {b[2]!r}, aplikacja {b[3]!r}')
print(f'rozbieżności: {len(bad)}')
sys.exit(1 if bad else 0)
