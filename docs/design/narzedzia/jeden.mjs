// jeden.mjs — zrzut jednego ekranu: node jeden.mjs <html> <data-ekran> <png> [light|dark] [szer] [ax5]
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [f, id, out, t = 'light', w = '390', ax = ''] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 900, height: 1000 }, deviceScaleFactor: 2 });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready);
await p.evaluate(([t, w, big]) => { const r = document.documentElement; r.dataset.theme = t; r.style.setProperty('--w', w + 'px'); r.style.setProperty('--dt-tytul', big ? '1.8' : '1'); r.style.setProperty('--dt-tresc', big ? '3.1' : '1'); }, [t, w, !!ax]);
await p.locator(`[data-ekran="${id}"]`).screenshot({ path: out }); await b.close(); console.log(out);
