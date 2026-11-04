// node zrzut-strony.mjs <plik.html> <wyjście.png> [szerokość] [skala]
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [f, out, w = '900', sc = '1'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 600 }, deviceScaleFactor: +sc });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
await p.screenshot({ path: out, fullPage: true }); await b.close(); console.log(out);
