# Kandydaci flopów do m5.exam.q2 (BA, 2026-11-10). python3 -I docs/tresci/dowody-ba/kandydaci.py
import runpy, io, contextlib
with contextlib.redirect_stdout(io.StringIO()):
    m = runpy.run_path('docs/tresci/dowody-ba/rachunek.py')
licz, BTN, BBc, BBd, SILNE = m['licz'], m['BTN'], m['BBc'], m['BBd'], m['SILNE']
print('flop | BTN dp|strit % | BB call % | BB def % | BTN dwie pary+ % | BB call % | BB def %')
for b in ['6s 5h 4d','7s 6h 4d','8s 7h 6d','9s 7h 5d','7s 5h 4d','6s 4h 3d','9s 8h 6d','Ah Qd 7c','Kd Td 3s','8h 6d 5c','7s 6h 5d']:
    row=[]
    for k in ('dp','silne'):
        for R in (BTN,BBc,BBd):
            t,c=licz(R,b); v=(c.get('dwiepary',0)+c.get('strit',0)) if k=='dp' else sum(c.get(x,0) for x in SILNE)
            row.append(f'{100*v/t:.2f}')
    print(b,'|',' | '.join(row))
