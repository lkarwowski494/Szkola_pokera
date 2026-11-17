// makieta-siatki.mjs — makieta RangeGrid „przed” (c946948d) i „po” (specyfikacja 04, M2-koordynator-napraw-006) + pomiar geometrii.
// Użycie (z katalogu z playwright w node_modules albo z NODE_PATH): node makieta-siatki.mjs <spot.json> <katalog-wyjścia>
// Krój: Inter 600/800 jako przybliżenie SF Pro Semibold/Heavy (SF Pro niedostępny w Linuksie; szerokość „AQo” Inter 2,07 em).
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const [spotPlik, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const spot = JSON.parse(readFileSync(spotPlik, 'utf8'));
const T = {
  light: { bg: '#E9EDF5', surface: '#FFFFFF', separator: '#C9D1E3', ink: '#0A1430', felt1: '#23694D', onFelt: '#FFFDF7' },
  dark: { bg: '#0A1430', surface: '#13214A', separator: '#2B3D6B', ink: '#F2EEE3', felt1: '#1C5A41', onFelt: '#FFFDF7' },
  lightHigh: { bg: '#E9EDF5', surface: '#FFFFFF', separator: '#8E9AB8', ink: '#0A1430', felt1: '#1B5940', onFelt: '#FFFDF7' },
  darkHigh: { bg: '#0A1430', surface: '#13214A', separator: '#5A6C9C', ink: '#F2EEE3', felt1: '#174D37', onFelt: '#FFFDF7' },
};
// Specyfikacja „po” (wynik.md, sekcja 2): rozmiar etykiety z szerokości pola i skali tekstu, jak Trening boardDigitSize.
const ETYKIETA = 8, SKALA_MAX = 1.3, W_EM = 2.2, WYS_LINII = 1.25, PODKLADKA_X = 1, UDZIAL_WYS = 0.5, ZNAK_D = 3, ZNAK_ODS = 1;
const rozmiarEtykiety = (pole, fontScale) => Math.min(ETYKIETA * Math.min(Math.max(fontScale, 1), SKALA_MAX), (UDZIAL_WYS * pole) / WYS_LINII, (pole - 2 * (ZNAK_ODS + ZNAK_D + 1)) / WYS_LINII, (pole - 2 - 2 * PODKLADKA_X) / W_EM);
const R = 'AKQJT98765432', H = [];
for (let r = 0; r < 13; r++) for (let c = 0; c < 13; c++) H.push(r === c ? R[r] + R[c] : r < c ? R[r] + R[c] + 's' : R[c] + R[r] + 'o');
const f0 = spot.groups[0].freqs, niep = new Set(spot.uncertain);
const PRZYPADKI = [];
for (const tryb of ['przed', 'po']) for (const motyw of Object.keys(T)) for (const w of [320, 390, 430]) for (const ax5 of [false, true]) PRZYPADKI.push({ tryb, motyw, w, ax5 });
const komorki = (tryb, fs, pole, t) => H.map((h, i) => {
  const f = f0[i] ?? 0;
  const bar = f > 0 ? `<i class="bar" style="width:${f * 100}%;background:${t.felt1}"></i>` : '';
  if (tryb === 'przed') {
    const kol = f >= 0.85 ? t.onFelt : t.ink;
    return `<div class="c">${bar}<span class="l przed" style="font-size:${8 * fs}px;color:${kol}">${h}</span>${niep.has(h) ? `<span class="m" style="font-size:${8 * fs}px;color:${t.ink}">•</span>` : ''}</div>`;
  }
  const pelne = f >= 1, s = rozmiarEtykiety(pole, fs);
  const et = `<span class="l" style="font-size:${s}px;line-height:${s * WYS_LINII}px;color:${pelne ? t.onFelt : t.ink}">${h}</span>`;
  const wnetrze = pelne ? `<span class="chip bez" style="max-width:${pole - 2}px">${et}</span>` : `<span class="chip" style="background:${t.surface};max-width:${pole - 2}px">${et}</span>`;
  return `<div class="c">${bar}${wnetrze}${niep.has(h) ? `<span class="m kropka" style="width:${ZNAK_D}px;height:${ZNAK_D}px;top:${ZNAK_ODS}px;right:${ZNAK_ODS}px;background:${t.ink}"></span>` : ''}</div>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;font-family:Inter;} .ekran{padding:16px;box-sizing:border-box;display:flex;flex-direction:column;gap:8px}
.tyt{font-weight:600;margin:0} .g{display:grid;grid-template-columns:repeat(13,1fr);aspect-ratio:1;border:0.5px solid var(--sep)}
.c{position:relative;border:0.25px solid var(--sep);overflow:hidden;display:flex;align-items:center;justify-content:center;min-width:0}
.bar{position:absolute;left:0;top:0;bottom:0;opacity:.85} .l{position:relative;font-weight:600;white-space:nowrap;display:block}
.l.przed{overflow:hidden;text-overflow:ellipsis;max-width:100%} .chip{position:relative;display:block;padding:0 1px;overflow:hidden}
.m{position:absolute;top:0;right:1px;font-weight:800;line-height:normal} .m.kropka{border-radius:50%} .opis{font:12px Inter;opacity:.8}
</style>${PRZYPADKI.map((p, k) => {
  const t = T[p.motyw], fs = p.ax5 ? 3.12 : 1, pole = (p.w - 32) / 13;
  return `<section class="ekran" data-k="${k}" style="width:${p.w}px;background:${t.bg};color:${t.ink};--sep:${t.separator}">
<p class="tyt" style="font-size:${17 * fs}px;line-height:1.25">${spot.title.split(' (')[0]}</p>
<div class="g" style="background:${t.surface}">${komorki(p.tryb, fs, pole, t)}</div>
<p class="opis">${p.tryb} · ${p.motyw} · ${p.w} pt · ${p.ax5 ? 'AX5 (×3,12)' : 'domyślny'}</p></section>`;
}).join('')}`;
writeFileSync(out + '/makieta-siatki.html', html);
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 3 });
await pg.goto('file://' + out + '/makieta-siatki.html');
await pg.evaluate(() => document.fonts.ready);
const raport = [];
for (const [k, p] of PRZYPADKI.entries()) {
  const el = pg.locator(`[data-k="${k}"]`);
  const pomiar = await el.evaluate((sec, tryb) => {
    let uciete = 0, pozaPodkladka = 0, pozaPolem = 0, nakladkaZnaku = 0, minOdstep = 99; const rozm = new Set();
    for (const c of sec.querySelectorAll('.c')) {
      const cr = c.getBoundingClientRect(), l = c.querySelector('.l'), lr = l.getBoundingClientRect();
      rozm.add(parseFloat(getComputedStyle(l).fontSize).toFixed(2));
      if (l.scrollWidth > l.clientWidth + 0.5) uciete++;
      // zakres tuszu: zmierzony szerokością tekstu (scrollWidth), środek jak element
      const sz = l.scrollWidth, x0 = lr.left + (lr.width - Math.min(sz, lr.width)) / 2;
      if (x0 < cr.left - 0.01 || x0 + Math.min(sz, lr.width) > cr.right + 0.01 || lr.top < cr.top - 0.01 || lr.bottom > cr.bottom + 0.01) pozaPolem++;
      if (tryb === 'po') {
        const ch = c.querySelector('.chip').getBoundingClientRect();
        if (lr.left < ch.left - 0.01 || lr.right > ch.right + 0.01 || lr.top < ch.top - 0.01 || lr.bottom > ch.bottom + 0.01) pozaPodkladka++;
        const m = c.querySelector('.m');
        if (m) { const mr = m.getBoundingClientRect(); minOdstep = Math.min(minOdstep, ch.top - mr.bottom);
          if (mr.bottom > ch.top - 0.99 && mr.left < ch.right) nakladkaZnaku++; }
      }
    }
    return { uciete, pozaPolem, pozaPodkladka, nakladkaZnaku, minOdstep: +minOdstep.toFixed(2), rozmiary: [...rozm].join('/') };
  }, p.tryb);
  const plik = `${out}/siatka-${p.tryb}-${p.motyw}-${p.w}${p.ax5 ? '-ax5' : ''}.png`;
  await el.screenshot({ path: plik });
  raport.push({ ...p, pole: +((p.w - 32) / 13).toFixed(2), ...pomiar });
}
// zbliżenie: kolumny 4–10 × wiersze 1–5 (pola pośrednie spotu btn-vs-co) wokół pól pośrednich, jasny 390, przed/po, domyślny i AX5
for (const p of PRZYPADKI.filter((x) => x.motyw === 'light' && (x.w === 390 || x.w === 320))) {
  const k = PRZYPADKI.indexOf(p), g = pg.locator(`[data-k="${k}"] .g`);
  await g.scrollIntoViewIfNeeded();
  const bb = await g.boundingBox(), pole = bb.width / 13;
  await pg.screenshot({ path: `${out}/zblizenie-${p.tryb}-light-${p.w}${p.ax5 ? '-ax5' : ''}.png`, clip: { x: bb.x + 3 * pole, y: bb.y + 0 * pole, width: pole * 7, height: pole * 5 } });
}
await b.close();
writeFileSync(out + '/pomiar-geometrii.json', JSON.stringify(raport, null, 1));
for (const r of raport) console.log(`${r.tryb.padEnd(5)} ${r.motyw.padEnd(9)} ${r.w} ${r.ax5 ? 'AX5' : 'dom'} pole ${r.pole} rozmiar ${r.rozmiary} | ucięte ${r.uciete} poza polem ${r.pozaPolem}${r.tryb === 'po' ? ` poza podkładką ${r.pozaPodkladka} kropka < 1 pt od podkładki ${r.nakladkaZnaku} (min odstęp ${r.minOdstep} pt)` : ''}`);
