// miesci-sie.mjs — BR-MENU-001: czy treść ekranu Dziś mieści się bez przewijania na W×H pt (tekst domyślny).
// Użycie: node miesci-sie.mjs <menu.html> [375] [667]. iPhone 375×667 (SE): pasek stanu 20 pt (makieta rysuje 48 pt dla telefonów z wycięciem, więc odejmujemy 28), pasek zakładek 49 pt; liczymy do dołu ostatniego kafelka/wiersza (stopka limitu może się przewijać: BR-MENU-001 mówi o kafelkach).
import { chromium } from 'playwright'; import { resolve } from 'node:path';
const [f, W = '375', H = '667'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 1200 } });
await p.goto('file://' + resolve(f)); await p.evaluate(() => document.fonts.ready);
const wyn = await p.evaluate((W) => { document.documentElement.style.setProperty('--w', W + 'px');
  return [...document.querySelectorAll('main[data-ekran^="w"]')].map((m) => { const top = m.getBoundingClientRect().top; const kids = [...m.children].filter((e) => !e.matches('.zakladki, .przypis.limit, .limit-link'));
    const dol = Math.max(...kids.map((e) => e.getBoundingClientRect().bottom)) - top - 28; return [m.dataset.ekran, Math.round(dol)]; }); }, W);
await b.close(); let zle = 0;
for (const [n, dol] of wyn) { const razem = dol + 49 + 12; const ok = razem <= Number(H); if (!ok) zle++; console.log(`${ok ? 'OK  ' : 'BRAK'} ${n}: treść ${dol} + pasek 49 + odstęp 12 = ${razem} pt (limit ${H})`); }
process.exit(zle ? 1 : 0);
