// node przepelnienie.mjs <plik.html> — szuka tekstu wystającego poza margines ekranu albo swój pojemnik (sukno, pasek, pole skali, karta, miejsce, przycisk); kod 1 przy znalezisku, dla 320/390/430 × domyślny/AX5
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 1000 } });
await p.goto('file://' + resolve(process.argv[2])); await p.evaluate(() => document.fonts.ready);
let n = 0;
for (const w of [320, 390, 430]) for (const big of [false, true]) {
  const wynik = await p.evaluate(([w, big]) => {
    const r = document.documentElement; r.style.setProperty('--w', w + 'px'); r.style.setProperty('--dt-tytul', big ? '1.8' : '1'); r.style.setProperty('--dt-tresc', big ? '3.1' : '1');
    const out = [];
    for (const m of document.querySelectorAll('[data-ekran]')) {
      const mr = m.getBoundingClientRect();
      const tw = document.createTreeWalker(m, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) {
        const t = tw.currentNode; if (!t.textContent.trim()) continue;
        const rg = document.createRange(); rg.selectNodeContents(t);
        for (const q of rg.getClientRects()) if (q.width && (q.right > mr.right - 4 || q.left < mr.left + 4)) { out.push(`${m.dataset.ekran} „${t.textContent.trim().slice(0, 24)}” wystaje poza margines ekranu`); break; }
        for (const mm of t.textContent.matchAll(/[^\s]+/g)) { const wr = document.createRange(); wr.setStart(t, mm.index); wr.setEnd(t, mm.index + mm[0].length); const lin = new Set([...wr.getClientRects()].filter((q) => q.width).map((q) => Math.round(q.top))); if (lin.size > 1) out.push(`INFO ${m.dataset.ekran} „${mm[0]}” złamany w środku wyrazu`); }
        const box = t.parentElement.closest('.sukno, .os, .stopnie span, .pasek a, .karta, .miejsce, .przycisk, .grupa > a, .plany .cena');
        if (box) { const br = box.getBoundingClientRect(); for (const q of rg.getClientRects()) if (q.width && (q.right > br.right + 1 || q.left < br.left - 1)) { out.push(`${m.dataset.ekran} „${t.textContent.trim().slice(0, 24)}” poza ${box.className}`); break; } }
      }
    }
    return out;
  }, [w, big]);
  for (const x of wynik) { console.log(`${w}${big ? ' AX5' : ''}: ${x}`); if (!x.startsWith('INFO')) n++; }
}
await b.close(); console.log(n ? `${n} przepełnień` : 'OK'); process.exit(n ? 1 : 0);
