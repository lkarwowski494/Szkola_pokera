// Pomiar zębatki na renderze @3x: wymiary rysunku, cel dotyku i liczba pikseli, które mają ≥ 3:1 do tła (proxy grubości kreski).
import { chromium } from 'playwright';
import { resolve } from 'node:path';
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 3 });
await p.goto('file://' + resolve(process.argv[2])); await p.evaluate(() => document.fonts.ready);
for (const t of ['light', 'dark']) {
  await p.evaluate((t) => { document.documentElement.dataset.theme = t; }, t);
  for (const sel of ['.zebatka-przed', '.zebatka:not(.pokaz-cel)']) {
    const el = p.locator(sel).first(); const bb = await el.boundingBox();
    const ink = await el.evaluate((e) => { const s = e.querySelector('svg'); const r = (s || e).getBoundingClientRect(); return { w: r.width, h: r.height }; });
    const png = await el.screenshot({ type: 'png' });
    const wynik = await p.evaluate(async (b64) => { const i = new Image(); i.src = 'data:image/png;base64,' + b64; await i.decode(); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.drawImage(i, 0, 0); return Array.from(x.getImageData(0, 0, i.width, i.height).data); }, png.toString('base64'));
    const bg = [wynik[0], wynik[1], wynik[2]]; const Lb = L(...bg); let n = 0;
    for (let i = 0; i < wynik.length; i += 4) { const l = L(wynik[i], wynik[i + 1], wynik[i + 2]); const r = (Math.max(l, Lb) + 0.05) / (Math.min(l, Lb) + 0.05); if (r >= 3) n++; }
    console.log(`${t} ${sel}: cel ${bb.width.toFixed(0)}×${bb.height.toFixed(0)} pt, rysunek ${ink.w.toFixed(0)}×${ink.h.toFixed(0)} pt, pikseli @3x z ≥3:1 do tła: ${n}`);
  }
}
await b.close();
