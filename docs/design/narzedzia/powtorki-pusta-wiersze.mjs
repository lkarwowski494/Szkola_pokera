// powtorki-pusta-wiersze.mjs — liczba wierszy stanu kafelka Powtórki: przed vs opcja C (sesja BY). Playwright z globalnej instalacji środowiska (createRequire).
import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2400, height: 1200 } });
await p.goto(new URL('../ekrany/powtorki-pusta.html', import.meta.url).href);
for (const [w, big] of [[320,0],[390,0],[320,1],[390,1]]) {
  await p.evaluate(([w, big]) => { const r = document.documentElement; r.style.setProperty('--w', w + 'px'); r.style.setProperty('--dt-tytul', big ? '1.8' : '1'); r.style.setProperty('--dt-tresc', big ? '3.1' : '1'); }, [w, big]);
  const n = await p.evaluate(() => [...document.querySelectorAll('main')].filter(m => /^(c-|przed-dzis)/.test(m.dataset.ekran)).map(m => { const s = m.querySelector('.kafel:not(.sukno-kafel) span'); const lh = parseFloat(getComputedStyle(s).lineHeight); return m.dataset.ekran + ':' + Math.round(s.getBoundingClientRect().height / lh); }));
  console.log(w, big ? 'AX5' : 'domyślny', n.join(' '));
}
await b.close();
