import json
V={'light':dict(muted='#46557A',felt1='#23694D',surface='#FFFFFF',ink='#0A1430',bg='#E9EDF5',separator='#C9D1E3'),
'dark':dict(muted='#B0BCD8',felt1='#1C5A41',surface='#13214A',ink='#F2EEE3',bg='#0A1430',separator='#2B3D6B'),
'lightHigh':dict(muted='#2C3A5E',felt1='#1B5940',surface='#FFFFFF',ink='#0A1430',bg='#E9EDF5',separator='#8E9AB8'),
'darkHigh':dict(muted='#D5DCEC',felt1='#174D37',surface='#13214A',ink='#F2EEE3',bg='#0A1430',separator='#5A6C9C')}
def h(x): return [int(x[i:i+2],16) for i in (1,3,5)]
def mix(a,b,al): return '#'+''.join('%02X'%round(al*p+(1-al)*q) for p,q in zip(h(a),h(b)))
P={}
for v,t in V.items():
    pole=mix(t['felt1'],t['surface'],0.85)
    P[f'{v}: kropka na polu w zakresie (muted / felt1·0,85 na surface = {pole})']=[t['muted'],pole,3]
    P[f'{v}: kropka na pustym polu (muted / surface)']=[t['muted'],t['surface'],3]
    P[f'{v}: etykieta ręki na polu w zakresie (ink / pole), A04-18']=[t['ink'],pole,4.5]
    P[f'{v}: legenda „• mieszana” (muted / bg)']=[t['muted'],t['bg'],4.5]
json.dump(P,open('pary-rangegrid.json','w'),ensure_ascii=False,indent=1)
