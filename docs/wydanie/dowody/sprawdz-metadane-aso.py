# Kopia sprawdz-metadane.py (sesja M) rozszerzona w sesji AF (2026-11-09, D-377): pliki z argv (domyślnie store/ + fala 2 z docs/sklep/aso/),
# słowa kluczowe bez słów z nazwy I podtytułu (jak test K-11-c), bez funkcji spoza 1.0 (K-11-l), link EULA i „Privacy Policy:” (K-11-f).
# Oryginał bez zmian (dowód metadane-2026-11-09.txt). Uruchomienie z katalogu repo: python3 -I docs/wydanie/dowody/sprawdz-metadane-aso.py
import json,re,sys
pliki=sys.argv[1:] or ['store/app-store-metadata.json','docs/sklep/aso/metadane-fala2.json']
konk=[a['nazwa'].lower() for a in json.load(open('docs/brd/dane/konkurencja-2026-11-03.json'))['aplikacje']]
zakazane=['wizard','gtow','pokerstars','ggpoker','partypoker','888','wsop','winamax','upswing','run it once','pokercoaching','solver+','postflop+','preflop+','flopzilla',
 'win money','wygraj','wygrasz','wygrana','guarantee','gwarant','profit','zarob','earn','cash game','real money games','$','usd','zł','€','£','9,99','14,99','19,99','9.99','14.99','19.99','free trial','for kids','dla dzieci']
EULA='https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'
lim={'name':30,'subtitle':30,'promotionalText':170,'description':4000}
slowa=lambda s:[w for w in re.split(r'[^\w]+',s.lower()) if w]
bl=0
for p in pliki:
 m=json.load(open(p)); print('==',p,'aliasy:',m.get('_aliasy'))
 for alias,cel in m.get('_aliasy',{}).items():
  if cel not in m['lokalizacje'] or alias in m['lokalizacje']: print(f'  alias {alias}->{cel} BŁĄD'); bl+=1
 for loc,d in m['lokalizacje'].items():
  for f,v in d.items():
    n=len(v)
    if f=='keywords':
      b=len(v.encode()); kw=v.split(',')
      ok=b<=100 and all(len(k)>2 for k in kw) and len(set(kw))==len(kw) and not re.search(r'\s',v)
      wl=set(slowa(d['name'])+slowa(d['subtitle'])); dup=[k for k in kw if k.lower() in wl]
      print(f'{loc} keywords {b} B, {len(kw)} słów, min {min(map(len,kw))} zn., z nazwy/podtytułu: {dup}', 'OK' if ok and not dup else 'BŁĄD'); bl+= not(ok and not dup)
    else:
      ok=(n<=lim[f] and n>0) and (f!='name' or n>=2); print(f'{loc} {f} {n}/{lim[f]}', 'OK' if ok else 'BŁĄD'); bl+=not ok
    low=v.lower().replace(EULA,'')
    for z in zakazane:
      if (z in low if not z[0].isalnum() else re.search(r'(?<![\w])'+re.escape(z)+r'(?![\w])',low)): print(f'  {loc} {f}: zakazane „{z}”'); bl+=1
    if re.search(r'scenariusz|scenario|solver|na czas|timed|\b\d+ (języków|languages)\b',low): print(f'  {loc} {f}: funkcja spoza 1.0 / liczba języków'); bl+=1
    for k in konk:
      base=re.split(r'[:\-–|]',k)[0].strip()
      if len(base.split())>=2 and re.search(r'\b'+re.escape(base)+r'\b',low) and base not in ('poker school',): print(f'  {loc} {f}: nazwa konkurenta „{base}”'); bl+=1
  if not (EULA in d['description'] and re.search(r'(Polityka prywatności|Privacy Policy): (https://\S+|\[ADRES PRYWATNOSCI\]|\[PRIVACY URL\])',d['description'])): print(f'  {loc}: brak EULA/Privacy Policy'); bl+=1
print('błędów:',bl); sys.exit(1 if bl else 0)
