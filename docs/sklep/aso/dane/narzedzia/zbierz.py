import json,sys,urllib.request,urllib.parse,time
out={}
Q={'us':['poker','poker strategy','poker trainer'],'pl':['poker','nauka pokera'],'jp':['poker','ポーカー','ポーカー 戦略'],'tw':['poker','撲克','德州撲克'],
'br':['poker','pôquer','poker estratégia'],'fr':['poker','poker stratégie'],'ca':['poker','poker stratégie'],'de':['poker','poker strategie'],
'es':['poker','póker','póker estrategia'],'mx':['poker','póker'],'kr':['poker','포커','홀덤'],'it':['poker','poker strategia'],'vn':['poker','xì tố']}
LANG={'ca':'fr_ca'}
for c,terms in Q.items():
  for t in terms:
    u='https://itunes.apple.com/search?'+urllib.parse.urlencode({'term':t,'country':c,'entity':'software','limit':25,**({'lang':LANG[c]} if c in LANG else {})})
    import subprocess
    raw=subprocess.run(["curl","-sS","-m","40",u],capture_output=True,text=True).stdout.strip()
    try: d=json.loads(raw)
    except Exception: print("BLAD",c,t,raw[:100]); continue
    out[f'{c}|{t}']=[{'id':r['trackId'],'nazwa':r['trackName'],'oceny':r.get('userRatingCount',0),'gatunek':r['primaryGenreName'],'wydawca':r.get('artistName')} for r in d['results']]
    time.sleep(1.5)
json.dump({'_opis':'iTunes Search API, entity=software, limit=25, odczyt '+time.strftime('%Y-%m-%d %H:%M UTC',time.gmtime()),'wyniki':out},open(sys.argv[1],'w'),ensure_ascii=False,indent=1)
