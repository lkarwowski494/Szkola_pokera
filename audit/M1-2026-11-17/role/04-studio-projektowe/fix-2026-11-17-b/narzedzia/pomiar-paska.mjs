// pomiar-paska.mjs (rola 04, M2-koordynator-napraw-009, własny skrypt): kontrast paska siatki przed (felt1) i po (rangeFill), 4 motywy.
// Użycie: node pomiar-paska.mjs <docs/design/tokeny.ts>. Wzory WCAG 2.x („relative luminance”, „contrast ratio”); krycie składane w sRGB
// i zaokrąglane do 8 bitów jak w apps/mobile/src/test-utils/kontrast.ts (`zloz`). Kod 1, gdy którakolwiek para „po” jest poniżej progu.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const { kolory, paryZlozone } = await import(pathToFileURL(resolve(process.argv[2])).href);
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (a) => '#' + a.map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('').toUpperCase();
const lum = (h) => { const [r, g, b] = rgb(h); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
const k = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const zloz = (t, a, p) => hex(rgb(t).map((c, i) => a * c + (1 - a) * rgb(p)[i]));
const hsl = (h) => { const [r, g, b] = rgb(h).map((c) => c / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0; const hh = !d ? 0 : mx === g ? 60 * ((b - r) / d + 2) : mx === r ? 60 * (((g - b) / d) % 6) : 60 * ((r - g) / d + 4);
  return `H ${hh.toFixed(1)}°, S ${s.toFixed(3)}, L ${l.toFixed(3)}`; };
const KRYCIE = paryZlozone['pasek siatki obok pustej części pola (rangeFill na surface)'].krycie;
let fail = 0;
console.log(`Krycie paska: ${KRYCIE} (paryZlozone; = opacity w RangeGrid.tsx)\n`);
console.log('| Motyw | Stan | Pasek (baza → złożony) | pasek/surface (≥ 3) | onFelt/pasek (≥ 4,5) | kropka ink/pasek (≥ 3) | próbka/bg (≥ 3) | próbka/surface (≥ 3) |');
console.log('|---|---|---|---|---|---|---|---|');
for (const w of ['light', 'dark', 'lightHigh', 'darkHigh']) {
  const p = kolory[w];
  for (const [stan, baza] of [['przed', p.felt1], ['po', p.rangeFill]]) {
    const z = zloz(baza, KRYCIE, p.surface);
    const r = [k(z, p.surface), k(p.onFelt, z), k(p.ink, z), k(baza, p.bg), k(baza, p.surface)];
    const min = [3, 4.5, 3, 3, 3];
    const kom = r.map((x, i) => { if (stan === 'po' && x < min[i]) fail++; return `${x < min[i] ? '**' : ''}${x.toFixed(2)}${x < min[i] ? '**' : ''}`; });
    console.log(`| ${w} | ${stan} | \`${baza}\` → \`${z}\` | ${kom.join(' | ')} |`);
  }
}
console.log('\nBarwa: felt1 dark', hsl(kolory.dark.felt1), '| felt1 light', hsl(kolory.light.felt1), '| rangeFill dark', hsl(kolory.dark.rangeFill));
// Odporność: złożony kolor ±1 na każdym kanale (zaokrąglenie GPU przy kryciu), najgorszy przypadek w dark/darkHigh
for (const w of ['dark', 'darkHigh']) {
  const p = kolory[w], z = rgb(zloz(p.rangeFill, KRYCIE, p.surface));
  let mins = [99, 99, 99];
  for (const dr of [-1, 0, 1]) for (const dg of [-1, 0, 1]) for (const db of [-1, 0, 1]) {
    const c = hex([z[0] + dr, z[1] + dg, z[2] + db]);
    mins = [Math.min(mins[0], k(c, p.surface)), Math.min(mins[1], k(p.onFelt, c)), Math.min(mins[2], k(p.ink, c))];
  }
  console.log(`${w}: złożony ±1/kanał, minimum: pasek/surface ${mins[0].toFixed(2)}, onFelt/pasek ${mins[1].toFixed(2)}, kropka ${mins[2].toFixed(2)}`);
}
// Okno progów w dark (surface, onFelt i ink te same w darkHigh): luminancja złożonego paska
const s = lum(kolory.dark.surface), o = lum(kolory.dark.onFelt), i = lum(kolory.dark.ink);
console.log(`Okno luminancji złożonego paska (dark, darkHigh): od ${(3 * (s + 0.05) - 0.05).toFixed(4)} (pasek/surface = 3) do ${Math.min((o + 0.05) / 4.5 - 0.05, (i + 0.05) / 3 - 0.05).toFixed(4)} (onFelt = 4,5); rangeFill złożony: ${lum(zloz(kolory.dark.rangeFill, KRYCIE, kolory.dark.surface)).toFixed(4)}`);
console.log(fail ? `${fail} par „po” poniżej progu` : 'OK: wszystkie pary „po” ≥ progu w 4 motywach');
process.exit(fail ? 1 : 0);
