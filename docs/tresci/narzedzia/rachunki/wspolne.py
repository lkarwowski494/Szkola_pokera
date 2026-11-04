"""Rola 06 E3: wspólne pomocnicze dla skryptów rachunków rejestru (tylko biblioteka standardowa + yaml).
Ładowany przez importlib ze ścieżki pliku (działa pod python3 -I). Nie uruchamiać samodzielnie."""
import importlib.util
import math
import sys
from pathlib import Path

import yaml

TU = Path(__file__).resolve().parent


def modul(nazwa):
    """Ładuje moduł z katalogu rachunków (karty.py) bez dopisywania katalogu do sys.path."""
    spec = importlib.util.spec_from_file_location(nazwa, TU / f'{nazwa}.py')
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def korzen():
    """Korzeń repozytorium: argument 1 albo cztery katalogi wyżej od tego pliku."""
    if len(sys.argv) > 1:
        return Path(sys.argv[1]).resolve()
    return TU.parents[3]


class Liczby:
    """Wartości z content/numbers.yaml; formuły liczone od nowa z definicji (bez poker-core)."""

    def __init__(self, root):
        self.num = yaml.safe_load(open(root / 'content' / 'numbers.yaml', encoding='utf-8'))
        self.cache = {}

    def __call__(self, k):
        if k in self.cache:
            return self.cache[k]
        e = self.num[k]
        f = e.get('formula')
        if f is None:
            v = float(e['value'])
        else:
            a = [self(x) for x in e.get('refs', [])] or e.get('args', [])
            if f == 'sum':
                v = sum(a)
            elif f == 'product':
                v = math.prod(a)
            elif f == 'diff':
                v = a[0] - sum(a[1:])
            elif f == 'quotient':
                v = a[0] / a[1]
            elif f == 'requiredEquity':
                v = a[1] / (a[0] + 2 * a[1])
            elif f == 'mdf':
                v = a[0] / (a[0] + a[1])
            elif f == 'alpha':
                v = a[1] / (a[0] + a[1])
            elif f == 'hitProbability':
                o, u, c = map(int, a)
                v = 1 - math.comb(u - o, c) / math.comb(u, c)
            elif f == 'missProbability':
                o, u, c = map(int, a)
                v = math.comb(u - o, c) / math.comb(u, c)
            elif f == 'sqrt':
                v = math.sqrt(a[0])
            elif f == 'exp':
                v = math.exp(a[0])
            else:
                raise ValueError(f'{k}: formuła {f} nieobsługiwana w rachunkach rejestru')
        self.cache[k] = v
        return v


class Raport:
    """Wypisuje wyniki z identyfikatorem wpisu; kod 1, gdy którykolwiek wynik odbiega od cytatu ponad tolerancję."""

    def __init__(self):
        self.bledy = []
        self.n = 0

    def liczba(self, wpis, opis, wyliczone, cytat, tol):
        """wyliczone i cytat w tych samych jednostkach (procenty jako punkty procentowe)."""
        self.n += 1
        ok = abs(wyliczone - cytat) <= tol + 1e-9
        znak = 'OK ' if ok else 'ROZBIEŻNOŚĆ'
        print(f'{znak} {wpis} | {opis}: wyliczone {wyliczone:.4f}, cytat {cytat}, tolerancja ±{tol:.4g}')
        if not ok:
            self.bledy.append((wpis, opis, wyliczone, cytat))

    def warunek(self, wpis, opis, ok, szczegol=''):
        self.n += 1
        print(f"{'OK ' if ok else 'ROZBIEŻNOŚĆ'} {wpis} | {opis}{': ' + szczegol if szczegol else ''}")
        if not ok:
            self.bledy.append((wpis, opis, szczegol, None))

    def koniec(self):
        print(f'\nsprawdzeń: {self.n}, rozbieżności: {len(self.bledy)}')
        for b in self.bledy:
            print('ROZBIEŻNOŚĆ', *b, sep=' | ')
        sys.exit(1 if self.bledy else 0)


def zaokr(dec):
    """Tolerancja zaokrąglenia cytatu podanego z `dec` miejscami po przecinku."""
    return 0.5 * 10 ** (-dec)


def tol_mc(p, n_cytat, n_nasze, dec):
    """Tolerancja porównania dwóch niezależnych symulacji (proporcja p, w punktach procentowych):
    3 × √(SE_cytatu² + SE_nasze²) + zaokrąglenie cytatu."""
    se = math.sqrt(p * (1 - p) / n_cytat + p * (1 - p) / n_nasze) * 100
    return 3 * se + zaokr(dec)
