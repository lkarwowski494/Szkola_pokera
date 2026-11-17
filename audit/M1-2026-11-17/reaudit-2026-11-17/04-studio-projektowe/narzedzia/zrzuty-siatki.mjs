// zrzuty-siatki.mjs (reaudit 04): zrzuty elementów [data-ekran] z makiety siatki, skala 3 (jak iPhone @3x) + wariant w skali szarości.
// Użycie: node zrzuty-siatki.mjs <makieta.html> <katalog-wyjścia>
import { createRequire } from 'node:module'; import { resolve } from 'node:path'; import { mkdirSync } from 'node:fs';
const { chromium } = createRequire('/opt/node-tools/node_modules/')('playwright');
const [plik, out] = process.argv.slice(2); mkdirSync(out, { recursive: true });
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 900 }, deviceScaleFactor: 3 });
await p.goto('file://' + resolve(plik));
for (const szary of [false, true]) {
  if (szary) await p.addStyleTag({ content: 'html{filter:grayscale(1)}' });
  for (const el of await p.locator('[data-ekran]').all()) {
    const n = await el.getAttribute('data-ekran'); if (szary && !n.startsWith('light-390')) continue;
    const f = `${out}/siatka-bb-vs-btn-${n}${szary ? '-szarosc' : ''}.png`; await el.screenshot({ path: f }); console.log(f);
  }
}
await b.close();
