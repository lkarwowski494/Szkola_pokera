// HH (rola 04, audit): drzewo hostów RN z jest (screen.toJSON) → HTML z odwzorowaniem stylów RN (flexbox, domyślny kierunek kolumna).
// Użycie: node hh-drzewo-html.mjs <katalog-json> <wyjście.html> [nazwa,nazwa,...]
// AX5: Text skalowany przez --fs (fontScale RN; AX5 ≈ 3,12 = 53/17 pt, HIG Dynamic Type), z wyjątkiem allowFontScaling={false}; maxFontSizeMultiplier = sufit.
// Ograniczenia: krój zastępczy zamiast SF Pro, bez cieni, numberOfLines przez line-clamp, adjustsFontSizeToFit pominięte (oznaczone data-adjusts).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const [dir, out, lista] = process.argv.slice(2);
const nazwy = lista ? lista.split(',') : readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
const PX = new Set(['width','height','minWidth','minHeight','maxWidth','maxHeight','margin','marginTop','marginBottom','marginLeft','marginRight','padding','paddingTop','paddingBottom','paddingLeft','paddingRight','gap','rowGap','columnGap','borderRadius','borderWidth','borderTopWidth','borderBottomWidth','borderLeftWidth','borderRightWidth','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius','top','left','right','bottom','letterSpacing','flexBasis']);
const POMIN = new Set(['shadowOpacity','shadowRadius','shadowOffset','shadowColor','elevation','includeFontPadding','textAlignVertical','transform']);
const flat = (s) => (Array.isArray(s) ? Object.assign({}, ...s.flat(20).filter(Boolean).map(flat)) : s || {});
const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function css(st, tekst, props) {
  const o = [];
  for (let [k, v] of Object.entries(st)) {
    if (POMIN.has(k) || v === undefined || v === null) continue;
    if (k === 'paddingHorizontal') { o.push(`padding-left:${v}px`, `padding-right:${v}px`); continue; }
    if (k === 'paddingVertical') { o.push(`padding-top:${v}px`, `padding-bottom:${v}px`); continue; }
    if (k === 'marginHorizontal') { o.push(`margin-left:${v === 'auto' ? 'auto' : v + 'px'}`, `margin-right:${v === 'auto' ? 'auto' : v + 'px'}`); continue; }
    if (k === 'marginVertical') { o.push(`margin-top:${v}px`, `margin-bottom:${v}px`); continue; }
    if (k === 'flex') { o.push(v > 0 ? `flex:${v} 1 0px` : v === 0 ? 'flex:0 0 auto' : 'flex:0 1 auto'); continue; }
    if (k === 'fontVariant') { if (v.includes('tabular-nums')) o.push('font-variant-numeric:tabular-nums'); continue; }
    if (k === 'textDecorationLine') { o.push(`text-decoration:${v}`); continue; }
    if (k === 'fontFamily') { o.push(`font-family:${JSON.stringify(v)},serif`); continue; }
    if (k === 'fontSize' && tekst) { o.push(`font-size:calc(${v}px * var(--k${props.skala}))`); continue; }
    if (k === 'lineHeight' && tekst) { o.push(`line-height:calc(${v}px * var(--k${props.skala}))`); continue; }
    if (k === 'borderWidth' || /^border(Top|Bottom|Left|Right)Width$/.test(k)) o.push(`${kebab(k).replace('-width', '-style')}:solid`);
    o.push(`${kebab(k)}:${typeof v === 'number' && PX.has(k) ? v + 'px' : v}`);
  }
  return o.join(';');
}
let skale = new Set();
function wezel(n, wTekscie, rodzic) {
  if (n == null || n === false) return '';
  if (Array.isArray(n)) return n.map((x) => wezel(x, wTekscie, rodzic)).join('');
  if (typeof n !== 'object') return esc(n);
  const p = n.props || {};
  const tekst = n.type === 'Text';
  const st = flat(p.style);
  let skala = '';
  if (tekst) {
    if (p.allowFontScaling === false) skala = '1';
    else if (p.maxFontSizeMultiplier >= 1) skala = 'm' + String(p.maxFontSizeMultiplier).replace('.', '_');
    else skala = rodzic?.skala ?? '';
    if (skala.startsWith('m')) skale.add(skala);
  }
  const at = [];
  if (p.testID) at.push(`data-testid="${esc(p.testID)}"`);
  if (p.accessibilityRole) at.push(`data-role="${esc(p.accessibilityRole)}"`);
  if (p.accessibilityLabel) at.push(`aria-label="${esc(p.accessibilityLabel)}"`);
  if (p.adjustsFontSizeToFit) at.push('data-adjusts="1"');
  let s = css(st, tekst, { skala });
  if (tekst && p.numberOfLines) s += `;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${p.numberOfLines};overflow:hidden`;
  const cc = n.type === 'RCTScrollView' ? flat(p.contentContainerStyle) : null;
  const dzieci = n.type === 'RCTScrollView' && cc ? (n.children || []).map((c) => typeof c === 'object' && c ? { ...c, props: { ...c.props, style: [c.props?.style, cc] } } : c) : n.children;
  const tag = tekst ? (wTekscie ? 'span' : 'div') : 'div';
  const klasa = tekst ? (wTekscie ? 't-in' : 't') : 'v';
  return `<${tag} class="${klasa}" ${at.join(' ')} style="${s}">${wezel(dzieci, tekst || wTekscie, { skala })}</${tag}>`;
}
const ekrany = nazwy.map((nm) => `<section class="ekran" data-ekran="${nm}"><div class="pod">${nm}</div><div class="tel">${wezel(JSON.parse(readFileSync(`${dir}/${nm}.json`, 'utf8')), false, null)}</div></section>`).join('\n');
const sk = [...skale].map((m) => `--k${m}:min(var(--fs), ${m.slice(1).replace('_', '.')});`).join('');
writeFileSync(out, `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>HH render</title><style>
:root{--fs:1;--k:var(--fs);--k1:1;${sk}--w:390px}
body{margin:0;background:#888;font-family:"Liberation Sans",Arial,sans-serif;display:flex;flex-wrap:wrap;gap:24px;padding:24px;align-items:flex-start}
.ekran{width:var(--w)} .pod{font:12px monospace;color:#fff;margin-bottom:4px}
.tel{width:var(--w);background:#fff;overflow:hidden}
.v{display:flex;flex-direction:column;position:relative;box-sizing:border-box;min-width:0;flex-shrink:0;align-items:stretch;border:0 solid #000}
.t{display:block;position:relative;box-sizing:border-box;min-width:0;white-space:pre-wrap;overflow-wrap:break-word;border:0 solid #000;font-size:calc(14px * var(--k))}
.t-in{white-space:pre-wrap}
</style></head><body>${ekrany}</body></html>`);
console.log(out, nazwy.length, 'ekranów');
