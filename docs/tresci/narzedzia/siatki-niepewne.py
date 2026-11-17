"""Rola 06 (06-tresci-501, D-2011…D-2013): porównanie siatek kanonu z opublikowanymi tabelami solvera i klasy niepewne.

Użycie (z katalogu głównego repo, po `pnpm content:build`):
  mkdir -p /tmp/strony && for p in btn-vs-co sb-vs-btn bb-vs-btn bb-vs-sb; do
    curl -sSLo /tmp/strony/bgto-$p.html https://beyondgto.com/defense/$p; done
  python3 -I docs/tresci/narzedzia/siatki-niepewne.py /tmp/strony            # porównanie, kod 1 przy ręce >= 50 pp spoza uncertain
  python3 -I docs/tresci/narzedzia/siatki-niepewne.py /tmp/strony --zapisz   # zapis docs/tresci/porownanie-siatek.json

Kryterium (to samo co klasy niepewne btn-vs-co i sb-vs-btn, content/ranges/spots.yaml): częstość „gram” kanonu
(suma grup siatki) różni się od opublikowanej o 50 pp lub więcej. Tabel opublikowanych nie zapisujemy w repozytorium
(tools/preflop-solver/scripts/fetch-targets.ts, nagłówek); plik porownanie-siatek.json ma tylko wynik porównania:
listę klas z różnicą >= 50 pp i skrót kanonu, z którym porównano (test tools/content-build/test/is-siatki-niepewne.test.ts).
Spoty 9-max porównujemy z tą samą tabelą 6-max: po pasach UTG-UTG+2 gra jest grą 6-max (spots.yaml, komentarz 9-max).
"""
import glob, hashlib, html, json, re, sqlite3, sys

R = '23456789TJQKA'
KLASY = []
for row in range(12, -1, -1):
    for col in range(12, -1, -1):
        KLASY.append(R[row] + R[col] if row == col else (R[row] + R[col] + 's' if col < row else R[col] + R[row] + 'o'))
KOMB = lambda h: 6 if len(h) == 2 else (4 if h[2] == 's' else 12)
PROG = 0.5
# spot → (strona, pole data-tip porównywane z sumą grup siatki)
SPOTY = {
    'vs-open.btn-vs-co': ('btn-vs-co', 'defend'),
    'vs-open.sb-vs-btn': ('sb-vs-btn', '3-bet'),
    'vs-open.bb-vs-btn': ('bb-vs-btn', 'defend'),
    'vs-open.bb-vs-sb': ('bb-vs-sb', 'defend'),
}
SPOTY.update({'nine.' + s: v for s, v in list(SPOTY.items())})
WYJSCIE = 'docs/tresci/porownanie-siatek.json'


def skrot_kanonu(gram):
    """Ten sam skrót liczy test content-build: klasy w porządku alfabetycznym, częstość „gram” w tysięcznych."""
    s = ','.join(f'{h}={round(gram[h] * 1000)}' for h in sorted(KLASY))
    return hashlib.sha256(s.encode()).hexdigest()[:16]


def strona(katalog, nazwa, pole):
    t = open(f'{katalog}/bgto-{nazwa}.html', encoding='utf-8').read()
    tab = {}
    for tip in re.findall(r'data-tip="([^"]*)"', t):
        czesci = [c.strip() for c in tip.split('·')]
        v = 0.0
        for c in czesci[1:]:
            m = re.match(r'^(.+?) (\d+(?:\.\d+)?)%$', c)
            if m and m.group(1).lower() == pole:
                v = float(m.group(2)) / 100
        tab[czesci[0]] = v
    if sorted(tab) != sorted(KLASY):
        sys.exit(f'bgto-{nazwa}.html: {len(tab)} klas zamiast 169')
    zr = re.search(r'BeyondGTO solver database[^<]*?updated [A-Z][a-z]{2} \d{1,2}, \d{4}', t)
    opis = re.search(r'<meta name="description" content="(Facing a [^"]*?folds \d+%\.)', t)
    if not zr or not opis or '6-max cash' not in zr.group(0):
        sys.exit(f'bgto-{nazwa}.html: brak opisu bazy solvera (6-max cash) albo zdania „Facing a …”')
    return tab, html.unescape(re.sub(r'\s+', ' ', zr.group(0))).strip(), html.unescape(opis.group(1))


def main(argv):
    if not argv or argv[0].startswith('--'):
        print(__doc__)
        return 2
    katalog, zapisz = argv[0], '--zapisz' in argv
    odczyt = next((a.split('=', 1)[1] for a in argv if a.startswith('--odczyt=')), None)
    baza = sorted(glob.glob('apps/mobile/assets/content/tresc-*-pl.db'))
    if len(baza) != 1:
        sys.exit(f'oczekiwana jedna baza pl po pnpm content:build, jest {len(baza)}')
    con = sqlite3.connect(baza[0])
    wynik, poza_razem = {}, 0
    for spot, (nazwa, pole) in SPOTY.items():
        g, unc = con.execute('select groups, uncertain from ranges where id=?', (spot,)).fetchone()
        grupy, unc = json.loads(g), set(json.loads(unc))
        gram = {h: sum(gr['freqs'][i] for gr in grupy) for i, h in enumerate(KLASY)}
        pub, baza_solvera, zdanie = strona(katalog, nazwa, pole)
        roz = [h for h in KLASY if abs(gram[h] - pub[h]) >= PROG - 1e-9]
        poza = [h for h in roz if h not in unc]
        poza_razem += len(poza)
        udzial = lambda d: sum(d[h] * KOMB(h) for h in KLASY) / 1326 * 100
        print(f'{spot} [{pole}]: kanon {udzial(gram):.1f}%, opublikowane {udzial(pub):.1f}%; >= 50 pp: {len(roz)} klas '
              f'({sum(KOMB(h) for h in roz)} komb.); poza uncertain: {len(poza)} {" ".join(poza)}')
        for h in roz:
            print(f'   {h}: kanon {gram[h]:.2f}, opublikowane {pub[h]:.2f}{"" if h in unc else "  <- poza uncertain"}')
        wynik[spot] = {
            'adres': f'https://beyondgto.com/defense/{nazwa}',
            'miejsce': f'siatka 169 klas, atrybut data-tip komórek, pole „{pole}”; {baza_solvera}',
            'cytat': zdanie,
            'szczebel': 2,
            'pole': pole,
            'kanon_skrot': skrot_kanonu(gram),
            'roznica_50pp': roz,
        }
    print(f'klasy >= 50 pp spoza uncertain (razem): {poza_razem}')
    if zapisz:
        if not odczyt:
            sys.exit('--zapisz wymaga --odczyt=RRRR-MM-DD (data pobrania stron)')
        for w in wynik.values():
            w['odczyt'] = odczyt
        dane = {
            'opis': 'Wynik porównania siatek kanonu z opublikowanymi tabelami solvera (06-tresci-501, D-2011…D-2013). '
                    'Tylko klasy z różnicą „gram” >= 50 pp i skrót kanonu; tabel źródła nie zapisujemy. '
                    'Odtworzenie: docs/tresci/narzedzia/siatki-niepewne.py.',
            'kryterium_pp': 50,
            'spoty': wynik,
        }
        open(WYJSCIE, 'w', encoding='utf-8').write(json.dumps(dane, ensure_ascii=False, indent=1) + '\n')
        print(f'zapisano {WYJSCIE}')
    return 1 if poza_razem else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
