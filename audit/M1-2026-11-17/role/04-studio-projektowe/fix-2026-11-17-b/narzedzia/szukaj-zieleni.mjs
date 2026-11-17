// szukaj-zieleni.mjs (rola 04, M2-koordynator-napraw-009, własny): kandydaci na pasek siatki w ciemnych motywach w odcieniu felt1 (dark),
// warunki: złożony pasek (krycie 0,85 na surface) ≥ 3 do surface, onFelt ≥ 4,5, ink ≥ 3; ranking po mniejszym zapasie względnym. Użycie: node szukaj-zieleni.mjs
// Własny rachunek (WCAG 2.x relative luminance / contrast ratio); szukanie zieleni paska w odcieniu felt1.
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const hex = (a) => '#' + a.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase();
const lum = (h) => { const [r, g, b] = rgb(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const k = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const zloz = (t, a, p) => hex(rgb(t).map((c, i) => Math.round(a * c + (1 - a) * rgb(p)[i])));
function rgb2hsl([r, g, b]) { r/=255; g/=255; b/=255; const mx=Math.max(r,g,b), mn=Math.min(r,g,b); let h=0,s=0; const l=(mx+mn)/2; if(mx!==mn){const d=mx-mn; s=l>0.5?d/(2-mx-mn):d/(mx+mn); h= mx===r?(g-b)/d+(g<b?6:0): mx===g?(b-r)/d+2:(r-g)/d+4; h*=60;} return [h,s,l]; }
function hsl2rgb(h,s,l){ const f=(n)=>{const k=(n+h/30)%12; const a=s*Math.min(l,1-l); return 255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)));}; return [f(0),f(8),f(4)]; }
const surface = '#13214A', onFelt = '#FFFDF7', ink = '#F2EEE3', bg = '#0A1430';
for (const f of ['#1C5A41', '#174D37', '#23694D', '#1B5940']) console.log(f, 'hsl', rgb2hsl(rgb(f)).map((x,i)=>i?x.toFixed(3):x.toFixed(1)).join(' '));
const [h0, s0] = rgb2hsl(rgb('#1C5A41'));
const wyn = [];
for (let s = 0.2; s <= 0.7; s += 0.01) for (let l = 0.25; l <= 0.6; l += 0.0025) {
  const c = hex(hsl2rgb(h0, s, l)); const z = zloz(c, 0.85, surface);
  const a = k(z, surface), b = k(onFelt, z), d = k(ink, z);
  if (a >= 3 && b >= 4.5 && d >= 3) wyn.push({ c, z, s: +s.toFixed(2), l: +l.toFixed(4), a, b, d, m: Math.min(a / 3, b / 4.5) });
}
wyn.sort((x, y) => y.m - x.m);
for (const w of wyn.slice(0, 12)) console.log(w.c, '→', w.z, 's', w.s, 'l', w.l, 'pasek/surface', w.a.toFixed(3), 'onFelt', w.b.toFixed(3), 'ink', w.d.toFixed(3), 'swatch/bg', k(w.c, bg).toFixed(2));
console.log('liczba kandydatów', wyn.length);
