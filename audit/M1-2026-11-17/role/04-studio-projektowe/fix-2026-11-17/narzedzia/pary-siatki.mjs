// pary-siatki.mjs — buduje pary kontrastu siatki zakresu (RangeGrid) w 4 motywach i zapisuje JSON dla docs/design/narzedzia/kontrast.mjs.
// Użycie: node pary-siatki.mjs <wyjście.json>. Kolory z docs/design/tokeny.ts (odczyt tekstowy) i przejsciowe z apps/mobile/src/theme/tokens.ts.
import { readFileSync, writeFileSync } from 'node:fs';
const repo = new URL('../../../../../../', import.meta.url).pathname;
const src = readFileSync(repo + 'docs/design/tokeny.ts', 'utf8');
const blok = (nazwa) => { const m = src.match(new RegExp(`const ${nazwa}(?:: Paleta)? = \\{([\\s\\S]*?)\\n\\};`)); return m[1]; };
const pola = (txt) => Object.fromEntries([...txt.matchAll(/(\w+): '(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
const light = pola(blok('light'));
const dark = { ...light, ...pola(blok('dark')) };
const kol = { light, dark, lightHigh: { ...light, ...pola(blok('lightHigh')) }, darkHigh: { ...dark, ...pola(blok('darkHigh')) } };
const app = readFileSync(repo + 'apps/mobile/src/theme/tokens.ts', 'utf8');
const warn = { jasne: app.match(/przejscioweJasne = \{[\s\S]*?warn: '(#\w{6})'/)[1], ciemne: app.match(/przejscioweCiemne[^{]*\{[\s\S]*?warn: '(#\w{6})'/)[1] };
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16));
const zloz = (tlo, k, pod) => '#' + rgb(tlo).map((c, i) => Math.round(k * c + (1 - k) * rgb(pod)[i]).toString(16).padStart(2, '0')).join('');
const K = 0.85;
const pary = {};
for (const [w, p] of Object.entries(kol)) {
  const ciemny = w.startsWith('dark');
  const sukno = zloz(p.felt1, K, p.surface);
  const g2 = zloz(ciemny ? warn.ciemne : warn.jasne, K, p.surface);
  const g3 = zloz(p.cardBlue, K, p.surface);
  Object.assign(pary, {
    [`${w} | A etykieta f=1: onFelt na suknie`]: [p.onFelt, sukno, 4.5],
    [`${w} | C etykieta na podkładce: ink na surface`]: [p.ink, p.surface, 4.5],
    [`${w} | znak • na suknie (ink)`]: [p.ink, sukno, 3],
    [`${w} | znak • na surface (ink)`]: [p.ink, p.surface, 3],
    [`${w} | znak • na podkładce (ink na surface)`]: [p.ink, p.surface, 3],
    [`${w} | znak • f=1 (onFelt na suknie)`]: [p.onFelt, sukno, 3],
    [`${w} | wykres: pasek grupy 1 obok surface`]: [sukno, p.surface, 3],
    [`${w} | wykres: podkładka surface obok paska (granica)`]: [p.surface, sukno, 3],
    [`${w} | grupa 2: znak • ink na pasku warn`]: [p.ink, g2, 3],
    [`${w} | grupa 3: znak • ink na pasku cardBlue`]: [p.ink, g3, 3],
    [`${w} | grupa 2: pasek obok surface`]: [g2, p.surface, 3],
    [`${w} | grupa 3: pasek obok surface`]: [g3, p.surface, 3],
    [`${w} | ODRZUCONE: ink na suknie (etykieta bez podkładki)`]: [p.ink, sukno, 4.5],
    [`${w} | ODRZUCONE: onFelt na surface (koniec etykiety poza paskiem)`]: [p.onFelt, p.surface, 4.5],
    [`${w} | ODRZUCONE: onFelt na pasku warn`]: [p.onFelt, g2, 4.5],
  });
}
writeFileSync(process.argv[2], JSON.stringify(pary, null, 1));
console.log(Object.fromEntries(Object.entries(kol).map(([w, p]) => [w, { surface: p.surface, felt1: p.felt1, sukno: zloz(p.felt1, K, p.surface), ink: p.ink, onFelt: p.onFelt }])));
