// makieta-paska.mjs (rola 04, M2-koordynator-napraw-009, własny skrypt): siatka RangeGrid w stanie po M2-006 (D-2020: etykieta
// onFelt na polu pełnym, ink na podkładce surface, kropka 3 pt), pasek „przed” = felt1, „po” = rangeFill (D-2021); 4 motywy, 390 i 320 pt,
// legenda z próbką; wariant w skali szarości (SP-05). Barwy z docs/design/tokeny.ts (import TS przez Node ≥ 22.18).
// Użycie: node makieta-paska.mjs <docs/design/tokeny.ts> <spot.json> <katalog-wyjścia>   (playwright rozwiązywany z katalogu skryptu)
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const [tok, spotPlik, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const { kolory, siatka: S } = await import(pathToFileURL(resolve(tok)).href);
const spot = JSON.parse(readFileSync(spotPlik, 'utf8'));
const rozmiar = (pole, fs) => Math.min(S.etykieta * Math.min(Math.max(fs, 1), S.skalaMax), (S.udzialWysokosci * pole) / S.wysokoscLinii,
  (pole - 2 * (S.znakOdstep + S.znakSrednica + 1)) / S.wysokoscLinii, (pole - 2 - 2 * S.podkladkaPoziom) / S.szerokoscEm);
const R = 'AKQJT98765432', H = [];
for (let r = 0; r < 13; r++) for (let c = 0; c < 13; c++) H.push(r === c ? R[r] + R[c] : r < c ? R[r] + R[c] + 's' : R[c] + R[r] + 'o');
const f0 = spot.groups[0].freqs, niep = new Set(spot.uncertain);
const P = [];
for (const motyw of ['light', 'lightHigh', 'dark', 'darkHigh']) for (const tryb of ['przed', 'po']) for (const w of [390, 320]) P.push({ motyw, tryb, w });
const siatkaHtml = (t, pasek, pole) => H.map((h, i) => {
  const f = f0[i] ?? 0, pelne = f >= 1, s = rozmiar(pole, 1);
  const bar = f > 0 ? `<i class="bar" style="width:${f * 100}%;background:${pasek}"></i>` : '';
  const et = `<span class="l" style="font-size:${s}px;line-height:${s * S.wysokoscLinii}px;color:${pelne ? t.onFelt : t.ink}">${h}</span>`;
  const chip = `<span class="chip" style="${pelne ? '' : `background:${t.surface};`}max-width:${pole - 2}px;padding:0 ${S.podkladkaPoziom}px">${et}</span>`;
  const kr = niep.has(h) ? `<span class="kropka" style="width:${S.znakSrednica}px;height:${S.znakSrednica}px;top:${S.znakOdstep}px;right:${S.znakOdstep}px;background:${t.ink}"></span>` : '';
  return `<div class="c">${bar}${chip}${kr}</div>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;font-family:Inter} .ekran{padding:16px;box-sizing:border-box;display:flex;flex-direction:column;gap:8px}
.tyt{font-weight:600;margin:0;font-size:17px;line-height:24px} .g{display:grid;grid-template-columns:repeat(13,1fr);aspect-ratio:1;border:0.5px solid var(--sep)}
.c{position:relative;border:0.25px solid var(--sep);overflow:hidden;display:flex;align-items:center;justify-content:center;min-width:0}
.bar{position:absolute;left:0;top:0;bottom:0;opacity:.85} .chip{position:relative;display:block;overflow:hidden}
.l{position:relative;display:block;font-weight:600;white-space:nowrap} .kropka{position:absolute;border-radius:50%}
.leg{display:flex;gap:12px;align-items:center;font-size:13px;line-height:17px;flex-wrap:wrap} .sw{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:-1px}
.opis{font:11px Inter;opacity:.75;margin:0}
</style>${P.map((p, k) => {
  const t = kolory[p.motyw], pasek = p.tryb === 'przed' ? t.felt1 : t.rangeFill, pole = (p.w - 32) / 13;
  return `<section class="ekran" data-k="${k}" style="width:${p.w}px;background:${t.bg};color:${t.ink};--sep:${t.separator}">
<p class="tyt">${spot.title}</p><div class="g" style="background:${t.surface}">${siatkaHtml(t, pasek, pole)}</div>
<div class="leg" style="color:${t.muted}"><span><i class="sw" style="background:${pasek}"></i>${spot.groups[0].name}</span><span>• mieszana</span><span>Gram ${(spot.playPercent * 100).toFixed(1).replace('.', ',')}% rąk</span></div>
<p class="opis">${p.tryb} · ${p.motyw} · ${p.w} pt · pasek ${pasek}</p></section>`;
}).join('')}`;
writeFileSync(out + '/makieta-paska.html', html);
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
await pg.goto(pathToFileURL(resolve(out + '/makieta-paska.html')).href);
await pg.evaluate(() => document.fonts.ready);
for (const szary of [false, true]) {
  if (szary) await pg.addStyleTag({ content: 'html{filter:grayscale(1)}' });
  for (const [k, p] of P.entries()) {
    if (szary && (p.w !== 390 || !p.motyw.startsWith('dark'))) continue;
    const plik = `${out}/pasek-${p.tryb}-${p.motyw}-${p.w}${szary ? '-szary' : ''}.png`;
    await pg.locator(`[data-k="${k}"]`).screenshot({ path: plik });
    console.log(plik);
  }
}
// zbliżenie 7×5 pól (kolumny 4–10, wiersze 1–5: pola częściowe i pełne), dark i darkHigh 390, przed/po
for (const [k, p] of P.entries()) {
  if (p.w !== 390 || !p.motyw.startsWith('dark')) continue;
  const g = pg.locator(`[data-k="${k}"] .g`); await g.scrollIntoViewIfNeeded();
  const bb = await g.boundingBox(), pole = bb.width / 13;
  const plik = `${out}/zblizenie-${p.tryb}-${p.motyw}-390.png`;
  await pg.screenshot({ path: plik, clip: { x: bb.x + 3 * pole, y: bb.y, width: 7 * pole, height: 5 * pole } });
  console.log(plik);
}
await b.close();
