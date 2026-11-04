// warianty.mjs — zrzut ekranów makiety w wariancie „Zwiększ kontrast” i/lub skali szarości.
// Użycie: node warianty.mjs <html> <png> [light|dark] [szerokość] [--kontrast] [--szarosc]
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const a = process.argv.slice(2); const [f, out, theme = 'light', w = '390'] = a.filter((x) => !x.startsWith('--'));
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2400, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready);
await p.evaluate(([t, w, k]) => { const r = document.documentElement; r.dataset.theme = t; r.style.setProperty('--w', w + 'px'); if (k) r.dataset.kontrast = 'wiekszy'; }, [theme, w, a.includes('--kontrast')]);
await p.addStyleTag({ content: 'aside.panele{display:none!important} body{flex-wrap:nowrap!important}' + (a.includes('--szarosc') ? ' html{filter:grayscale(1)}' : '') });
const els = await p.locator('[data-ekran]').all(); const bb = []; for (const e of els) bb.push(await e.boundingBox());
const x = Math.min(...bb.map((q) => q.x)), y = Math.min(...bb.map((q) => q.y)), x2 = Math.max(...bb.map((q) => q.x + q.width)), y2 = Math.max(...bb.map((q) => q.y + q.height));
await p.setViewportSize({ width: Math.ceil(x2 + 30), height: Math.ceil(y2 + 30) });
await p.screenshot({ path: out, clip: { x, y, width: x2 - x, height: y2 - y } }); await b.close(); console.log(out);
