import json,sys,time,subprocess,re,html
D=json.load(open(sys.argv[1]))['wyniki']; out={}
NAUKA={'us':['learn poker','poker trainer','poker strategy'],'pl':['nauka pokera','poker trener'],'jp':['ポーカー 学習','ポーカー 戦略'],'tw':['撲克 教學','德州撲克 教學'],'br':['aprender poker','poker estratégia'],
'fr':['apprendre poker','poker stratégie'],'ca':['apprendre poker','poker stratégie'],'de':['poker lernen','poker strategie'],'es':['aprender poker','póker estrategia'],'mx':['aprender poker'],'kr':['홀덤 공부','포커 배우기'],'it':['imparare poker','poker strategia'],'vn':['học poker']}
for c,qs in NAUKA.items():
  ids=[]
  for q in qs:
    for r in D.get(f'{c}|{q}',[])[:8]:
      if r['id'] not in [i['id'] for i in ids]: ids.append(r)
  out[c]=[]
  for r in ids[:12]:
    h=subprocess.run(['curl','--compressed','-sSL','-m','40','-A','Mozilla/5.0',f'https://apps.apple.com/{c}/app/id{r["id"]}'],capture_output=True).stdout.decode('utf-8','replace')
    m=re.search(r'class="subtitle svelte-[^"]*"[^>]*>([^<]*)',h); t=re.search(r'<h1[^>]*>\s*([^<]+)',h)
    out[c].append({'id':r['id'],'nazwa':r['nazwa'],'podtytul':html.unescape(m.group(1)).strip() if m else None,'oceny':r['oceny'],'gatunek':r['gatunek']})
    time.sleep(1)
json.dump({'_opis':'apps.apple.com/{kraj}/app/id{id}: pierwszy element class="subtitle svelte-…" strony (podtytuł aplikacji), top 8 z każdej frazy nauki z search.json, max 12 na kraj; odczyt '+time.strftime('%Y-%m-%d %H:%M UTC',time.gmtime()),'kraje':out},open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
