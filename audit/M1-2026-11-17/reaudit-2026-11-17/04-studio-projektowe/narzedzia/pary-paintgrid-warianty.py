import json
V={'light':dict(muted='#46557A',felt1='#23694D',surface='#FFFFFF',ink='#0A1430',primaryBg='#0A1430',feltSoft='#E3EFE8',onFelt='#FFFDF7'),
'dark':dict(muted='#B0BCD8',felt1='#1C5A41',surface='#13214A',ink='#F2EEE3',primaryBg='#F2EEE3',feltSoft='#1C2E25',onFelt='#FFFDF7'),
'lightHigh':dict(muted='#2C3A5E',felt1='#1B5940',surface='#FFFFFF',ink='#0A1430',primaryBg='#0A1430',feltSoft='#E3EFE8',onFelt='#FFFDF7'),
'darkHigh':dict(muted='#D5DCEC',felt1='#174D37',surface='#13214A',ink='#F2EEE3',primaryBg='#F2EEE3',feltSoft='#1C2E25',onFelt='#FFFDF7')}
def h(x): return [int(x[i:i+2],16) for i in (1,3,5)]
def mix(a,b,al): return '#'+''.join('%02X'%round(al*p+(1-al)*q) for p,q in zip(h(a),h(b)))
P={}
for v,t in V.items():
    pole=mix(t['felt1'],t['surface'],0.85)
    P[f'{v}: PaintGrid kropka „mieszana” na feltSoft (muted)']=[t['muted'],t['feltSoft'],3]
    P[f'{v}: PaintGrid kropka „mieszana” na pomalowanym polu (muted / primaryBg)']=[t['muted'],t['primaryBg'],3]
    P[f'{v}: wariant naprawy: kropka ink na polu w zakresie']=[t['ink'],pole,3]
    P[f'{v}: wariant naprawy: kropka ink na pustym polu']=[t['ink'],t['surface'],3]
json.dump(P,open('pary-paintgrid-warianty.json','w'),ensure_ascii=False,indent=1)
