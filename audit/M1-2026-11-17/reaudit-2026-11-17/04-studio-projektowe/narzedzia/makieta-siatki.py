# makieta-siatki.py (reaudit 04, 2026-11-17): replika HTML siatki RangeGrid (apps/mobile/src/components/RangeGrid.tsx @196cb8c2)
# dla spotu z bazy treści pl; style 1:1 z komponentu (pasek felt1 opacity 0.85, etykieta 8/600, znak • 8/800 top 0 right 1, legenda drobny 13).
# Użycie: python3 -I makieta-siatki.py <baza.db> <spot> <wyjście.html>. Renderer Chromium, krój zastępczy (bez SF Pro) — przybliżenie.
import sqlite3, json, sys
db, spot, out = sys.argv[1:4]
c = sqlite3.connect('file:'+db+'?mode=ro', uri=True)
title, groups, unc = c.execute("select title, groups, uncertain from ranges where id=?", (spot,)).fetchone()
g = json.loads(groups); u = set(json.loads(unc))
R='AKQJT98765432'; HC=[]
for i in range(13):
    for j in range(13):
        HC.append(R[i]+R[j] if i==j else (R[i]+R[j]+'s' if j>i else R[j]+R[i]+'o'))
V={'light':dict(bg='#E9EDF5',surface='#FFFFFF',separator='#C9D1E3',ink='#0A1430',muted='#46557A',felt1='#23694D'),
'lightHigh':dict(bg='#E9EDF5',surface='#FFFFFF',separator='#8E9AB8',ink='#0A1430',muted='#2C3A5E',felt1='#1B5940'),
'dark':dict(bg='#0A1430',surface='#13214A',separator='#2B3D6B',ink='#F2EEE3',muted='#B0BCD8',felt1='#1C5A41'),
'darkHigh':dict(bg='#0A1430',surface='#13214A',separator='#5A6C9C',ink='#F2EEE3',muted='#D5DCEC',felt1='#174D37')}
css="body{margin:0;font-family:-apple-system,'Helvetica Neue',Arial,sans-serif}.ek{padding:16px;width:calc(var(--w) - 32px)}"
css+=".grid{display:grid;grid-template-columns:repeat(13,1fr);aspect-ratio:1;border:0.5px solid}.c{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;border:0.25px solid}"
css+=".b{position:absolute;top:0;bottom:0;left:0;opacity:.85}.l{font-size:8px;font-weight:600;position:relative}.m{position:absolute;top:0;right:1px;font-size:8px;font-weight:800;line-height:1}"
css+=".lg{font-size:13px;line-height:17px;margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;align-items:center}.sw{width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px}h3{font-size:17px;margin:0 0 8px}"
html=["<!doctype html><meta charset=utf-8><style>"+css+"</style>"]
for w in (390,320):
  for v,t in V.items():
    cells=''.join(f"<div class=c style='background:{t['surface']};border-color:{t['separator']}'><div class=b style='width:{(g[0]['freqs'][i] or 0)*100:.1f}%;background:{t['felt1']}'></div><span class=l style='color:{t['ink']}'>{hc}</span>{'<span class=m style=color:'+t['muted']+'>•</span>' if hc in u else ''}</div>" for i,hc in enumerate(HC))
    html.append(f"<div data-ekran='{v}-{w}' class=ek style='--w:{w}px;background:{t['bg']}'><h3 style='color:{t['ink']}'>{title}</h3><div class=grid style='border-color:{t['separator']}'>{cells}</div><div class=lg style='color:{t['muted']}'><span><i class=sw style='background:{t['felt1']}'></i>{g[0]['name']}</span><span>• mieszana</span></div></div>")
open(out,'w').write(''.join(html))
