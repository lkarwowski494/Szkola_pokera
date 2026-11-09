import json,sys,time,subprocess,re,urllib.parse,html
SF={'us':143441,'pl':143478,'jp':143462,'tw':143470,'br':143503,'fr':143442,'ca':143455,'de':143443,'es':143454,'mx':143468,'kr':143466,'it':143450,'vn':143471}
T={'us':['poker','poker tr','learn poker','gto','poker str'],'pl':['poker','nauka pok','poker tr'],'jp':['ポーカー','ポーカー 学','ポーカー 戦','ホールデム'],'tw':['撲克','德州撲克','德州撲克 教'],
'br':['poker','pôquer','aprender po','poker est'],'fr':['poker','apprendre po','poker str'],'ca':['poker','apprendre po'],'de':['poker','poker ler','poker str'],
'es':['poker','póker','aprender po','poker est'],'mx':['poker','póker','aprender po'],'kr':['포커','홀덤','홀덤 공'],'it':['poker','imparare po','poker str'],'vn':['poker','học po']}
out={}
for c,ts in T.items():
  for t in ts:
    u='https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?'+urllib.parse.urlencode({'clientApplication':'Software','term':t})
    x=subprocess.run(['curl','-sS','-m','30','-H',f'X-Apple-Store-Front: {SF[c]}-1,29',u],capture_output=True,text=True).stdout
    out[f'{c}|{t}']=[html.unescape(s) for s in re.findall(r'<key>term</key>\s*<string>([^<]*)</string>',x)]
    time.sleep(1)
json.dump({'_opis':'Nieoficjalny punkt podpowiedzi App Store (search.itunes.apple.com MZSearchHints, nagłówek X-Apple-Store-Front=<id storefrontu>-1,29); lista podpowiedzi = sygnał ruchu, nie liczba wyszukań; odczyt '+time.strftime('%Y-%m-%d %H:%M UTC',time.gmtime()),'storefronty':SF,'podpowiedzi':out},open(sys.argv[1],'w'),ensure_ascii=False,indent=1)
