// zrzuty-m1.mjs (audyt 04, M1): zrzuty ekranów z eksportu Expo web (wejście zastępcze apps/mobile/zrzuty-web/wejscie.tsx).
// Użycie: node zrzuty-m1.mjs <katalog-eksportu> <katalog-wyjścia>. Ekrany × 390/320 × jasny/ciemny × domyślny/AX5 (mnożnik 3,12 jak hl-zrzuty.mjs) + skala szarości.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/opt/node-tools/node_modules/')('playwright');
const [dist, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.png': 'image/png', '.ttf': 'font/ttf', '.json': 'application/json', '.wasm': 'application/wasm' };
const srv = http.createServer((q, r) => { let p = path.join(dist, decodeURIComponent(q.url.split('?')[0])); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(dist, 'index.html'); r.writeHead(200, { 'content-type': mime[path.extname(p)] ?? 'application/octet-stream' }); fs.createReadStream(p).pipe(r); }).listen(0);
const port = srv.address().port; const b = await chromium.launch(); let problemy = 0;
const ekrany = (process.env.EKRANY ?? 'start,decyzja,ocena-zgodna,ocena-blad,iso-co,ib-check-raise,ocena-ib-check-raise,po-ocenie,po-ocenie-pas').split(',');
for (const e of ekrany) for (const w of [390, 320]) for (const tryb of ['jasny', 'ciemny']) for (const ax5 of [false, true]) for (const szary of (tryb === 'jasny' && !ax5 && w === 390 ? [false, true] : [false])) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 1, colorScheme: tryb === 'ciemny' ? 'dark' : 'light', locale: 'pl-PL' });
  const s = await ctx.newPage(); const bledy = []; s.on('pageerror', (x) => bledy.push(String(x).slice(0, 160)));
  await s.goto(`http://localhost:${port}/?ekran=${e}&fs=${ax5 ? 3.12 : 1}&tryb=${tryb}`, { waitUntil: 'networkidle' }); await s.waitForTimeout(400);
  const h = await s.evaluate(() => Math.max(...[...document.querySelectorAll('*')].map((x) => x.scrollHeight))); await s.setViewportSize({ width: w, height: Math.min(Math.max(h, 844), 12000) }); await s.waitForTimeout(250);
  if (szary) await s.addStyleTag({ content: 'html{filter:grayscale(1)}' });
  const poza = await s.evaluate(() => { const W = document.documentElement.clientWidth; const o = []; for (const x of document.querySelectorAll('*')) { const t = [...x.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim(); if (!t) continue; const r = x.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1)) o.push(`poza ekranem: „${t.slice(0, 30)}”`); } return o; });
  const n = `${e}-${w}-${tryb}${ax5 ? '-ax5' : ''}${szary ? '-szarosc' : ''}.png`;
  await s.screenshot({ path: path.join(out, n), fullPage: true });
  for (const x of [...poza, ...bledy]) { console.log(`${n}: ${x}`); problemy++; }
  console.log(`zrzut ${n}`); await ctx.close();
}
await b.close(); srv.close(); console.log(problemy ? `uwagi: ${problemy}` : 'OK'); process.exit(0);
