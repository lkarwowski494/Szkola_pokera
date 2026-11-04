// kroje.mjs — porównanie krojów tytułów na ekranach makiety (krok E2 po wyborze kierunku).
// Użycie: node kroje.mjs <makieta.html> <katalog-wyjścia> <kroje.json> [szerokość=390]
// kroje.json: [{ "id", "rodzina", "waga", "zdanie" }]. Wynik: <katalog>/<id>-<ekran>.png, pomiary.json,
// strona zbiorcza <katalog>/../kroje-tytulow.html i jej zrzut kroje-tytulow.png (deviceScaleFactor 2).
// Kod 1, gdy krój się nie załadował (sprawdzane na liście document.fonts, nie przez fonts.check()).
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, relative, basename } from 'node:path';

const [plik, wyj, krojePlik, w = '390'] = process.argv.slice(2);
if (!plik || !wyj || !krojePlik) { console.error('Użycie: node kroje.mjs <makieta.html> <katalog> <kroje.json> [szerokość]'); process.exit(2); }
const kroje = JSON.parse(readFileSync(krojePlik, 'utf8'));
mkdirSync(wyj, { recursive: true });
// Wycinki ekranów: od dołu paska nawigacji do końca części z tytułami (przyciski akcji są krojem treści).
const WYCINKI = { 'przed-decyzja': [88, 600], 'po-ocenie': [88, 450], 'bez-pozycji': [88, 570] };
const ELEMENTY = '.sytuacja h1, .stol .na-suknie, .reka-opis, .karta b, .stopien';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
await p.goto('file://' + resolve(plik));
await p.addStyleTag({ content: 'aside.panele{display:none!important}' });
await p.evaluate((w) => document.documentElement.style.setProperty('--w', w + 'px'), w);
const pomiary = [];
let blad = 0;
for (const k of kroje) {
  const styl = await p.addStyleTag({ content: `:root{--tytul:'${k.rodzina}',serif} ${ELEMENTY}{font-weight:${k.waga}!important;font-synthesis:none;font-variant-numeric:lining-nums}` });
  await p.evaluate(() => document.fonts.ready);
  const zaladowane = await p.evaluate(() => [...document.fonts].filter((x) => x.status === 'loaded').map((x) => `${x.family.replace(/["']/g, '')}|${x.weight}`));
  if (!zaladowane.includes(`${k.rodzina}|${k.waga}`)) { console.error(`BRAK KROJU: ${k.rodzina} ${k.waga}`); blad++; }
  // Pomiar na płótnie: wysokość x i wersalika jako ułamek stopnia, szerokość słowa stopnia przy 28 px.
  const m = await p.evaluate(({ r, waga }) => {
    const c = document.createElement('canvas').getContext('2d');
    c.font = `${waga} 100px '${r}'`;
    const x = c.measureText('x').actualBoundingBoxAscent / 100, H = c.measureText('H').actualBoundingBoxAscent / 100;
    c.font = `${waga} 28px '${r}'`;
    return { x: +x.toFixed(3), H: +H.toFixed(3), dopuszczalna28: Math.round(c.measureText('Dopuszczalna').width) };
  }, { r: k.rodzina, waga: k.waga });
  pomiary.push({ id: k.id, rodzina: k.rodzina, waga: k.waga, ...m });
  for (const [ekran, [od, doY]] of Object.entries(WYCINKI)) {
    const el = p.locator(`[data-ekran="${ekran}"]`);
    const bb = await el.boundingBox();
    await p.screenshot({ path: `${wyj}/${k.id}-${ekran}.png`, clip: { x: bb.x, y: bb.y + od, width: bb.width, height: doY - od } });
  }
  await styl.evaluate((s) => s.remove());
  console.log(`${k.id}: x ${m.x}, H ${m.H}, „Dopuszczalna” 28 px = ${m.dopuszczalna28} px`);
}
writeFileSync(`${wyj}/pomiary.json`, JSON.stringify(pomiary, null, 2));

// Strona zbiorcza: kolumna na krój, nad nią nazwa, zdanie o pochodzeniu i pomiary.
const strona = resolve(dirname(resolve(wyj)), 'kroje-tytulow.html');
const rel = relative(dirname(strona), resolve(wyj));
const kol = kroje.map((k, i) => {
  const m = pomiary[i];
  const img = Object.keys(WYCINKI).map((e) => `<img src="${rel}/${k.id}-${e}.png" alt="${k.rodzina}, ekran ${e}">`).join('');
  return `<section><h2 style="font-family:'${k.rodzina}';font-weight:${k.waga}">${i + 1}. ${k.rodzina} ${k.waga}</h2><p>${k.zdanie}</p><p class="m">wysokość x ${Math.round(m.x * 100)}% stopnia · „Dopuszczalna” przy 28 pt: ${m.dopuszczalna28} pt</p>${img}</section>`;
}).join('\n');
writeFileSync(strona, `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Kroje tytułów: kierunek I</title>
<!-- Wygenerowane przez narzedzia/kroje.mjs z ${basename(plik)}; nie edytuj ręcznie. -->
<link rel="stylesheet" href="fonty/fonty.css"><style>
body{margin:0;padding:24px;background:#E6E7E9;font-family:'Noto Sans',sans-serif;color:#0A1430}
header{max-width:1200px;margin-bottom:20px} header h1{font-size:22px;margin:0 0 6px} header p{margin:0;font-size:15px;line-height:1.4}
.siatka{display:flex;gap:20px;align-items:flex-start}
section{width:${w}px;display:flex;flex-direction:column;gap:8px}
section h2{font-variant-numeric:lining-nums;font-size:26px;margin:0;line-height:1.15} section p{margin:0;font-size:14px;line-height:1.4;min-height:5.6em} section p.m{min-height:0;color:#46557A}
img{width:${w}px;display:block}
</style></head><body><header><h1>Kroje tytułów na ekranach kierunku I (szerokość ${w} pt, motyw jasny, tekst domyślny)</h1>
<p>Zmienia się tylko krój tytułów: tytuł zadania, słowo stopnia, indeksy kart, opis ręki. Treść: na iOS SF Pro; w makiecie zastępczo Noto Sans. Od AX1 tytuły krojem systemowym (decyzja do E3).</p></header>
<div class="siatka">${kol}</div></body></html>`);
const s = await b.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 2 });
await s.goto('file://' + strona);
await s.evaluate(() => document.fonts.ready);
await s.screenshot({ path: strona.replace(/\.html$/, '.png'), fullPage: true });
await b.close();
console.log(strona.replace(/\.html$/, '.png'));
process.exit(blad ? 1 : 0);
