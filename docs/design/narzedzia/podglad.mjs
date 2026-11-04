// podgląd: node podglad.mjs <plik.html> <wyjście.png> [light|dark] [szerokość] [ax5]
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const [f, out, theme = 'light', w = '390', ax = ''] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready);
await p.evaluate(([t, w, big]) => { const r = document.documentElement; r.dataset.theme = t; r.style.setProperty('--w', w + 'px'); r.style.setProperty('--dt-tytul', big ? '1.8' : '1'); r.style.setProperty('--dt-tresc', big ? '3.1' : '1'); }, [theme, w, !!ax]);
await p.addStyleTag({ content: 'aside.panele{display:none!important}' });
const els = await p.locator('[data-ekran]').all(); const bb = []; for (const e of els) bb.push(await e.boundingBox());
const x = Math.min(...bb.map(q => q.x)), y = Math.min(...bb.map(q => q.y)), x2 = Math.max(...bb.map(q => q.x + q.width)), y2 = Math.max(...bb.map(q => q.y + q.height));
await p.setViewportSize({ width: Math.ceil(x2 + 30), height: Math.ceil(y2 + 30) });
await p.screenshot({ path: out, clip: { x, y, width: x2 - x, height: y2 - y } }); await b.close(); console.log(out);
