// hq-zrzuty.mjs (sesja HQ, rola 04, 2026-11-16): zrzuty makiety z dużym tekstem jak fontScale aplikacji (3.12 dla tytułów i treści, D-1680),
// pomiar liczby wierszy nagłówków h1 i kontrola przepełnienia poziomego.
// Użycie: node hq-zrzuty.mjs <plik.html> <katalog-wyjścia> [--pelne]
//   bez --pelne: 390 jasny, 390 ciemny, 320 jasny AX5, 430 jasny (zrzuty wzorcowe); z --pelne: 320/390/430 × jasny/ciemny × domyślny/AX5.
// Wyjście: PNG na ekran i wariant, <nazwa>-pomiar.json (wiersze h1, rozmiar kroju h1, elementy poza szerokością ekranu); kod 1 przy przepełnieniu w tekście domyślnym.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // przeglądarka środowiska (require działa z każdego katalogu)
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
const [file, out] = process.argv.slice(2);
const pelne = process.argv.includes('--pelne');
mkdirSync(out, { recursive: true });
const warianty = pelne
  ? [320, 390, 430].flatMap((w) => ['light', 'dark'].flatMap((t) => [false, true].map((ax5) => ({ w, t, ax5 }))))
  : [{ w: 390, t: 'light', ax5: false }, { w: 390, t: 'dark', ax5: false }, { w: 320, t: 'light', ax5: true }, { w: 430, t: 'light', ax5: false }];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
await page.goto('file://' + resolve(file));
await page.evaluate(() => document.fonts.ready);
const pomiar = [];
let bledy = 0;
for (const { w, t, ax5 } of warianty) {
  await page.evaluate(([t, w, big]) => {
    const r = document.documentElement;
    r.dataset.theme = t;
    r.style.setProperty('--w', w + 'px');
    r.style.setProperty('--dt-tytul', big ? '3.12' : '1');
    r.style.setProperty('--dt-tresc', big ? '3.12' : '1');
  }, [t, w, ax5]);
  await page.evaluate(() => document.fonts.ready);
  for (const el of await page.locator('[data-ekran]').all()) {
    const name = await el.getAttribute('data-ekran');
    const m = await el.evaluate((ekran) => {
      const R = ekran.getBoundingClientRect();
      const wiersze = (e) => { const r = document.createRange(); r.selectNodeContents(e); return new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))).size; };
      const h1 = [...ekran.querySelectorAll('h1')].map((h) => ({ wiersze: wiersze(h), px: parseFloat(getComputedStyle(h).fontSize), kroj: getComputedStyle(h).fontFamily.split(',')[0] }));
      const poza = [];
      for (const e of ekran.querySelectorAll('*')) {
        const txt = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
        if (!txt) continue;
        const r = e.getBoundingClientRect();
        if (r.width && (r.right > R.right + 1 || r.left < R.left - 1)) poza.push(txt.slice(0, 30));
      }
      return { h1, poza };
    });
    const nazwa = `${basename(file, '.html')}-${name}-${w}${t === 'dark' ? '-dark' : ''}${ax5 ? '-ax5' : ''}`;
    await el.screenshot({ path: `${out}/${nazwa}.png` });
    pomiar.push({ nazwa, ...m });
    if (m.poza.length && !ax5) bledy++;
    console.log(`${nazwa}\th1=${m.h1.map((h) => `${h.wiersze}w/${h.px}px/${h.kroj}`).join(',')}\tpoza=${m.poza.length ? m.poza.join(' | ') : 0}`);
  }
}
await browser.close();
writeFileSync(`${out}/${basename(file, '.html')}-pomiar.json`, JSON.stringify(pomiar, null, 1));
process.exit(bledy ? 1 : 0);
