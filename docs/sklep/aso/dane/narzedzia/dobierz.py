import json,sys,urllib.parse,time,subprocess
f=sys.argv[1]; D=json.load(open(f))
Q={'tw':['德州撲克','撲克 教學','德州撲克 教學'],'br':['poker estratégia','aprender poker'],'fr':['poker stratégie','apprendre poker'],'ca':['apprendre poker'],'de':['poker strategie','poker lernen'],
'es':['poker','póker','aprender poker'],'mx':['poker','aprender poker'],'vn':['xì tố','học poker'],'jp':['ポーカー 学習','ポーカー 勉強'],'kr':['포커 배우기','홀덤 공부'],'it':['imparare poker'],'us':['learn poker','gto'],'pl':['poker trener']}
LANG={'ca':'fr_ca'}
for c,terms in Q.items():
  for t in terms:
    if f'{c}|{t}' in D['wyniki']: continue
    u='https://itunes.apple.com/search?'+urllib.parse.urlencode({'term':t,'country':c,'entity':'software','limit':25,**({'lang':LANG[c]} if c in LANG else {})})
    for p in range(4):
      raw=subprocess.run(["curl","-sS","-m","40",u],capture_output=True,text=True).stdout.strip()
      try: d=json.loads(raw); break
      except Exception: time.sleep(8*(p+1)); d=None
    if d is None: print('BLAD',c,t); continue
    D['wyniki'][f'{c}|{t}']=[{'id':r['trackId'],'nazwa':r['trackName'],'oceny':r.get('userRatingCount',0),'gatunek':r['primaryGenreName'],'wydawca':r.get('artistName')} for r in d['results']]
    time.sleep(4)
D['_opis']+='; uzupełnienie '+time.strftime('%Y-%m-%d %H:%M UTC',time.gmtime())
json.dump(D,open(f,'w'),ensure_ascii=False,indent=1)
