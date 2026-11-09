import json,re,sys
m=json.load(open('store/app-store-metadata.json'))
konk=[a['nazwa'].lower() for a in json.load(open('docs/brd/dane/konkurencja-2026-11-03.json'))['aplikacje']]
zakazane=['wizard','gtow','pokerstars','ggpoker','partypoker','888','wsop','winamax','upswing','run it once','pokercoaching','solver+','postflop+','preflop+','flopzilla',  # marki i nazwy aplikacji
 'win money','wygraj','wygrasz','wygrana','guarantee','gwarant','profit','zarob','earn','cash game','real money games','$','usd','zł','9,99','14,99','19,99','9.99','14.99','19.99','free trial','for kids','dla dzieci']
lim={'name':30,'subtitle':30,'promotionalText':170,'description':4000}
bl=0
for loc,d in m['lokalizacje'].items():
  for f,v in d.items():
    n=len(v)
    if f=='keywords':
      b=len(v.encode()); kw=v.split(',')
      ok=b<=100 and all(len(k)>2 for k in kw) and len(set(kw))==len(kw) and ' ' not in v
      dup=[k for k in kw if k in d['name'].lower().replace(':',' ').split()]
      print(f'{loc} keywords {b} B, {len(kw)} słów, min {min(map(len,kw))} zn., duplikaty nazwy: {dup}', 'OK' if ok and not dup else 'BŁĄD'); bl+= not(ok and not dup)
    else:
      ok=n<=lim[f] and (f!='name' or n>=2); print(f'{loc} {f} {n}/{lim[f]}', 'OK' if ok else 'BŁĄD'); bl+=not ok
    low=v.lower()
    for z in zakazane:
      if (z in low if not z[0].isalnum() else re.search(r'(?<![\wąćęłńóśźż])'+re.escape(z)+r'(?![\wąćęłńóśźż])',low)): print(f'  {loc} {f}: zakazane „{z}”'); bl+=1
    # nazwy konkurencji (pełne nazwy przed dwukropkiem/myślnikiem, min. 2 słowa)
    for k in konk:
      base=re.split(r'[:\-–|]',k)[0].strip()
      if len(base.split())>=2 and re.search(r'\b'+re.escape(base)+r'\b',low) and base not in ('poker school',): print(f'  {loc} {f}: nazwa konkurenta „{base}”'); bl+=1
print('błędów:',bl); sys.exit(1 if bl else 0)
