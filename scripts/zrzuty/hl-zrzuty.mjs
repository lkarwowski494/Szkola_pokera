// HL (D-1670): zrzuty ekranów scenariusza z Expo web + Playwright Chromium. Użycie: pnpm zrzuty:web
// 1) eksport web z wejściem zastępczym (SZKOLA_ZRZUTY=1 → apps/mobile/zrzuty-web/wejscie.tsx), 2) serwer statyczny, 3) zrzuty do docs/design/dowody/hl-*.png.
// Ekrany: start, decyzja, ocena-zgodna, ocena-blad; szerokości 390 i 320 pt; rozmiar domyślny i „AX5”.
// „AX5” to PRZYBLIŻENIE: react-native-web nie stosuje skali czcionki systemu, więc zrzutowe `Text` (apps/mobile/zrzuty-web/rn.tsx) mnoży fontSize i lineHeight
// przez 3,12 (53/17 pt, Dynamic Type AX5) z sufitem maxFontSizeMultiplier i bez allowFontScaling={false}, jak iOS. Jeden mnożnik, bez krzywej stylów Dynamic Type.
// Kontrola: tekst poza szerokością ekranu i przewijanie poziome. Przy rozmiarze domyślnym → kod wyjścia 1; przy AX5 tylko INFO (znane znaleziska audytu HH).
import { execFileSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const korzen = path.resolve(import.meta.dirname, '../..');
const dist = process.env.HL_DIST ?? path.join(korzen, '.expo/zrzuty-web');
const wyjscie = path.join(korzen, 'docs/design/dowody');
const AX5 = 3.12;
if (!process.env.HL_BEZ_EKSPORTU) {
  fs.rmSync(dist, { recursive: true, force: true });
  execFileSync('pnpm', ['--filter', '@szkola/mobile', 'exec', 'expo', 'export', '--platform', 'web', '--clear', '--output-dir', dist], { cwd: korzen, stdio: 'inherit', env: { ...process.env, SZKOLA_ZRZUTY: '1', CI: '1' } });
}
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.png': 'image/png', '.ttf': 'font/ttf', '.json': 'application/json' };
const srv = http.createServer((q, r) => {
  let p = path.join(dist, decodeURIComponent(q.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(dist, 'index.html');
  r.writeHead(200, { 'content-type': mime[path.extname(p)] ?? 'application/octet-stream' });
  fs.createReadStream(p).pipe(r);
}).listen(0);
const port = srv.address().port;
fs.mkdirSync(wyjscie, { recursive: true });
const przeglad = await chromium.launch();
let problemy = 0;
for (const ekran of ['start', 'decyzja', 'ocena-zgodna', 'ocena-blad']) {
  for (const szer of [390, 320]) {
    for (const ax5 of [false, true]) {
      const ctx = await przeglad.newContext({ viewport: { width: szer, height: 844 }, deviceScaleFactor: 2, colorScheme: 'light', locale: 'pl-PL' });
      const strona = await ctx.newPage();
      const bledy = [];
      strona.on('pageerror', (e) => bledy.push(String(e).slice(0, 200)));
      await strona.goto(`http://localhost:${port}/?ekran=${ekran}&fs=${ax5 ? AX5 : 1}`, { waitUntil: 'networkidle' });
      await strona.waitForTimeout(500);
      const wynik = await strona.evaluate(() => {
        const W = document.documentElement.clientWidth; const out = [];
        for (const e of document.querySelectorAll('*')) {
          const txt = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (!txt) continue;
          const r = e.getBoundingClientRect();
          if (r.width && (r.right > W + 1 || r.left < -1)) out.push(`poza ekranem: „${txt.slice(0, 30)}”`);
        }
        if (document.documentElement.scrollWidth > W + 1) out.push(`przewijanie poziome ${document.documentElement.scrollWidth}>${W}`);
        return { out, tekst: document.body.innerText.length };
      });
      const nazwa = `hl-${ekran}-${szer}${ax5 ? '-ax5' : ''}.png`;
      if (wynik.tekst < 20) bledy.push('pusty ekran');
      await strona.screenshot({ path: path.join(wyjscie, nazwa), fullPage: true });
      for (const x of [...wynik.out, ...bledy]) { console.log(`${ax5 ? 'INFO ' : ''}${nazwa}: ${x}`); if (!ax5 || bledy.includes(x)) problemy++; }
      await ctx.close();
    }
  }
}
await przeglad.close(); srv.close();
console.log(problemy ? `problemy: ${problemy}` : `OK: 16 zrzutów w ${path.relative(korzen, wyjscie)}`);
process.exit(problemy ? 1 : 0);
