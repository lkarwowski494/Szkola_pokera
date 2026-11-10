import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [f, out] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready);
const ids = ['w1-w-trakcie', 'w2-w-trakcie', 'w1-limit', 'w2-limit'];
await p.evaluate((ids) => { document.querySelectorAll('[data-ekran]').forEach((e) => { if (!ids.includes(e.dataset.ekran)) e.remove(); });
  const tl = document.createElement('main'); tl.setAttribute('data-ekran','x'); tl.remove(); }, ids);
for (const t of ['light', 'dark']) { await p.evaluate((t) => document.documentElement.dataset.theme = t, t); await p.screenshot({ path: out.replace('.png', `-${t}.png`), fullPage: true }); }
await b.close();
