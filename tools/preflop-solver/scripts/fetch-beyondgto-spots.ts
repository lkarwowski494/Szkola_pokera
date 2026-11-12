import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
// użycie: tsx scripts/fetch-beyondgto-spots.ts [KATALOG]  (domyślnie tools/preflop-solver/targets/beyondgto-spots, poza gitem)
// Etap B0 planu B (docs/solver/plan-b-etapy.md): cel walidacji W2 jako dane. Pobiera 105 stron „spots” BeyondGTO
// (decyzja na flopie, 6-max cash 100bb) i siatki preflop tego samego drzewa (zakresy wejściowe). Dane służą wyłącznie
// do porównania z wynikiem naszego solvera (ADR-02, ADR-20); nie trafiają do repozytorium ani do aplikacji.
// W repo zostaje skrypt i sumy kontrolne (docs/solver/w2-cel-sumy.txt), które drukuje ten skrypt.

const SITE = 'https://beyondgto.com';
const outDir = resolve(process.argv[2] ?? resolve(import.meta.dirname, '../targets/beyondgto-spots'));

function get(url: string): string {
  return execFileSync('curl', ['-sSL', '--fail', '--retry', '3', url], { encoding: 'utf8', maxBuffer: 1 << 25 });
}
const sha = (s: string): string => createHash('sha256').update(s).digest('hex');
const decode = (s: string): string =>
  s.replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
function text(html: string): string {
  const body = html.slice(Math.max(0, html.indexOf('</nav>')));
  return decode(body.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Komórka siatki: pasek gradientu (dokładność 0,1 pp) i podpis data-tip (zaokrąglony do 1 pp). */
interface Cell { readonly hand: string; readonly tip: string; readonly seg: Record<string, number> }
function cells(html: string): Cell[] {
  const out: Cell[] = [];
  const re = /<div class="rg-cell" style="background: linear-gradient\(to right, ([^)]*)\)"\s*data-tip="([^"]*)"/g;
  for (const m of html.matchAll(re)) {
    const seg: Record<string, number> = {};
    for (const s of m[1]!.split(/,\s*/)) {
      const g = /^(#[0-9a-f]{6}) (\d+(?:\.\d+)?)%(?: (\d+(?:\.\d+)?)%)?$/.exec(s.trim());
      if (!g) throw new Error(`nieznany odcinek gradientu: ${s}`);
      const from = g[3] === undefined ? 0 : Number(g[2]);
      const to = g[3] === undefined ? Number(g[2]) : Number(g[3]);
      seg[g[1]!] = (seg[g[1]!] ?? 0) + (to - from) / 100;
    }
    const tip = decode(m[2]!);
    out.push({ hand: tip.split('·')[0]!.trim(), tip, seg });
  }
  if (out.length !== 169) throw new Error(`${out.length} komórek zamiast 169`);
  return out;
}

/** Zamienia odcinki gradientu na akcje i sprawdza je z podpisem (różnica ≤ 1 pp, bo podpis jest zaokrąglony). */
function actions(c: Cell, colors: Record<string, string>, tipNames: Record<string, string>): Record<string, number> {
  const a: Record<string, number> = {};
  for (const name of Object.values(colors)) a[name] = 0;
  for (const [col, w] of Object.entries(c.seg)) {
    const name = colors[col];
    if (!name) throw new Error(`${c.hand}: nieznany kolor ${col}`);
    a[name] = a[name]! + w;
  }
  const sum = Object.values(a).reduce((x, y) => x + y, 0);
  if (Math.abs(sum - 1) > 0.01) throw new Error(`${c.hand}: suma ${sum}`);
  for (const p of c.tip.split('·').slice(1)) {
    const m = /^(.*?) (\d+)%$/.exec(p.trim());
    if (!m) throw new Error(`${c.hand}: podpis ${p}`);
    const label = m[1]!.replace(/ [\d.]+bb$/, '');
    const name = tipNames[label];
    if (name === undefined) throw new Error(`${c.hand}: nieznana etykieta ${label}`);
    if (name === '') continue; // pole sumy (c-bet, defend, open)
    if (Math.abs(a[name]! * 100 - Number(m[2])) > 1) throw new Error(`${c.hand}: ${name} gradient ${a[name]} vs podpis ${m[2]}%`);
  }
  return a;
}

// ---------- siatki preflop (zakresy wejściowe) ----------
const PREFLOP: Record<string, { page: string; colors: Record<string, string>; tip: Record<string, string> }> = {};
const RFI = { colors: { '#f59e0b': 'raise', '#16233b': 'fold' }, tip: { raise: 'raise', fold: 'fold', open: '' } };
// obrona: teal = jam (all-in), amber = 3-bet, niebieski = call, ciemny = pas (legenda strony)
const DEF = { colors: { '#2dd4a8': 'jam', '#f59e0b': '3bet', '#3b82f6': 'call', '#16233b': 'fold' }, tip: { jam: 'jam', '3-bet': '3bet', call: 'call', fold: 'fold', defend: '' } };
for (const p of ['lj', 'hj', 'co', 'btn', 'sb']) PREFLOP[`rfi.${p}`] = { page: `ranges/${p}-open-6max-100bb`, ...RFI };
for (const p of ['bb-vs-lj', 'bb-vs-hj', 'bb-vs-co', 'bb-vs-btn', 'sb-vs-btn']) PREFLOP[`def.${p}`] = { page: `defense/${p}`, ...DEF };

const SPOT_COLORS = { '#2dd4a8': 'small', '#f59e0b': 'large', '#16233b': 'check' };
const SPOT_TIP = { bet: 'small', 'larger bet': 'large', check: 'check', 'c-bet': '' };

mkdirSync(resolve(outDir, 'raw'), { recursive: true });
mkdirSync(resolve(outDir, 'spots'), { recursive: true });
const fetched = new Date().toISOString();
const sums: string[] = [];
const preflop: Record<string, unknown> = {};
for (const [name, def] of Object.entries(PREFLOP)) {
  const url = `${SITE}/${def.page}`;
  const html = get(url);
  writeFileSync(resolve(outDir, 'raw', `${def.page.replace('/', '__')}.html`), html);
  const title = decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? '').trim();
  const freqs: Record<string, Record<string, number>> = {};
  for (const c of cells(html)) freqs[c.hand] = actions(c, def.colors, def.tip);
  preflop[name] = { url, title, freqs };
  sums.push(`${sha(JSON.stringify(freqs))}  preflop/${name}`);
  console.log(`${name}: ${title}`);
}

const sitemap = get(`${SITE}/sitemap-spots.xml`);
const slugs = [...sitemap.matchAll(/<loc>https:\/\/beyondgto\.com\/spots\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]!);
if (slugs.length !== 105) throw new Error(`sitemap-spots: ${slugs.length} stołów zamiast 105`);
const SUITS: Record<string, string> = { '♠': 's', '♥': 'h', '♦': 'd', '♣': 'c' };
const spots: Record<string, unknown> = {};
for (const slug of slugs) {
  const url = `${SITE}/spots/${slug}`;
  const html = get(url);
  writeFileSync(resolve(outDir, 'raw', `spots__${slug}.html`), html);
  const t = text(html);
  const head = /"headline": "([^"]*)"/.exec(html)?.[1] ?? '';
  const boardM = /on ((?:[2-9TJQKA][♠♥♦♣] ?){3}) vs/.exec(head);
  if (!boardM) throw new Error(`${slug}: brak stołu w nagłówku (${head})`);
  const board = boardM[1]!.trim().split(' ').map((c) => c[0]! + SUITS[c[1]!]!);
  const footer = /BeyondGTO solver database · ([^·]*·[^·]*·[^·]*·[^·]*)· updated ([A-Za-z]+ \d+, \d{4})/.exec(t);
  if (!footer) throw new Error(`${slug}: brak stopki`);
  const stat = /(\d+)% C-bet (\d+)% Check (\d+(?:\.\d+)?)bb Main size/.exec(t);
  if (!stat) throw new Error(`${slug}: brak bloku C-bet/Check/Main size`);
  const inRange = /Of the (\d+) hands|(\d+) of the (\d+) hands in range/.exec(t);
  const sizesPrinted = [...t.matchAll(/(\d+)% at (?:the small )?(\d+(?:\.\d+)?)bb/g)].map((m) => ({ pct: Number(m[1]), bb: Number(m[2]) }));
  const classes: Record<string, Record<string, number>> = {};
  for (const c of cells(html)) classes[c.hand] = actions(c, SPOT_COLORS, SPOT_TIP);
  const summary = /Single-Raised Pot On .*?\.|3-Bet Pot [^.]*?\.[^.]*?\./.exec(t)?.[0] ?? '';
  spots[slug] = {
    url,
    board,
    seats: footer[1]!.trim(),
    updated: footer[2],
    dateModified: /"dateModified": "([^"]*)"/.exec(html)?.[1] ?? null,
    cbetPct: Number(stat[1]),
    checkPct: Number(stat[2]),
    mainSizeBb: Number(stat[3]),
    sizesPrinted,
    classesInRange: inRange ? Number(inRange[1] ?? inRange[3]) : null,
    summary,
    classes,
  };
  writeFileSync(resolve(outDir, 'spots', `${slug}.json`), JSON.stringify({ fetched, ...(spots[slug] as object) }, null, 1));
  sums.push(`${sha(JSON.stringify(classes))}  spots/${slug}`);
  console.log(`${slug}: ${board.join(' ')} c-bet ${stat[1]}% main ${stat[3]}bb ${JSON.stringify(sizesPrinted)}`);
}
mkdirSync(dirname(outDir), { recursive: true });
writeFileSync(resolve(outDir, 'spots.json'), JSON.stringify({ fetched, site: SITE, spots }, null, 1));
writeFileSync(resolve(outDir, 'preflop.json'), JSON.stringify({ fetched, site: SITE, preflop }, null, 1));
writeFileSync(resolve(outDir, 'sumy.txt'), `# sha256 JSON.stringify(częstości klas), odczyt ${fetched}\n${sums.join('\n')}\n`);
console.log(`Zapisano ${outDir} (${slugs.length} stołów, ${Object.keys(preflop).length} siatek preflop)`);
