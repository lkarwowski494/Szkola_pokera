// HH: zrzuty ekranów z hh-drzewo-html.mjs i kontrola przepełnień. Użycie: node hh-zrzuty.mjs <render.html> <katalog> <przedrostek> [szer,szer] [fs,fs]
// Przepełnienie: tekst wystający poza ekran albo poza swój najbliższy pojemnik z ramką/tłem; słowo złamane w środku (INFO). Kod 1 przy przepełnieniu.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
const [plik, kat, pre, szer = '390,320', fsy = '1,3.12'] = process.argv.slice(2);
mkdirSync(kat, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('file://' + resolve(plik));
let n = 0;
for (const w of szer.split(',')) for (const fs of fsy.split(',')) {
  await p.evaluate(([w, fs]) => { document.documentElement.style.setProperty('--w', w + 'px'); document.documentElement.style.setProperty('--fs', fs); }, [w, fs]);
  const wynik = await p.evaluate(() => {
    const out = [];
    for (const m of document.querySelectorAll('[data-ekran]')) {
      const tel = m.querySelector('.tel'); const mr = tel.getBoundingClientRect();
      const tw = document.createTreeWalker(tel, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const t = tw.currentNode; if (!t.textContent.trim()) continue;
        const rg = document.createRange(); rg.selectNodeContents(t);
        const rs = [...rg.getClientRects()].filter((q) => q.width);
        if (rs.some((q) => q.right > mr.right + 0.5 || q.left < mr.left - 0.5)) out.push(`${m.dataset.ekran} „${t.textContent.trim().slice(0, 30)}” poza ekranem`);
        let el = t.parentElement.closest('.v');
        while (el && el !== tel) { const cs = getComputedStyle(el); if (cs.borderTopStyle === 'solid' || (cs.backgroundColor !== 'rgba(0, 0, 0, 0)')) break; el = el.parentElement.closest('.v'); }
        if (el && el !== tel) { const br = el.getBoundingClientRect(); if (rs.some((q) => q.right > br.right + 1 || q.left < br.left - 1 || q.bottom > br.bottom + 1 || q.top < br.top - 1)) out.push(`${m.dataset.ekran} „${t.textContent.trim().slice(0, 30)}” poza pojemnikiem${el.getAttribute('aria-label') ? ' [' + el.getAttribute('aria-label').slice(0, 30) + ']' : ''}`); }
        const tEl = t.parentElement; if (getComputedStyle(tEl).webkitLineClamp !== 'none' && tEl.scrollHeight > tEl.clientHeight + 1) out.push(`${m.dataset.ekran} „${t.textContent.trim().slice(0, 30)}” UCIĘTY numberOfLines`);
        for (const mm of t.textContent.matchAll(/[^\s]+/g)) { const wr = document.createRange(); wr.setStart(t, mm.index); wr.setEnd(t, mm.index + mm[0].length); const lin = new Set([...wr.getClientRects()].filter((q) => q.width).map((q) => Math.round(q.top))); if (lin.size > 1) out.push(`INFO ${m.dataset.ekran} „${mm[0]}” złamany w środku wyrazu`); }
      }
    }
    return out;
  });
  for (const x of wynik) { console.log(`${w} fs=${fs}: ${x}`); if (!x.startsWith('INFO')) n++; }
  for (const el of await p.locator('[data-ekran]').all()) {
    const nm = await el.getAttribute('data-ekran');
    await el.locator('.tel').screenshot({ path: `${kat}/${pre}-${nm}-${w}${fs === '1' ? '' : '-ax5'}.png` });
  }
}
await b.close(); console.log(n ? `${n} przepełnień` : 'OK'); process.exit(n ? 1 : 0);
