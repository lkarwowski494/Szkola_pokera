// tokeny.mjs — z docs/design/tokeny.ts: CSS dla makiet E3 i tabela kontrastu w czterech wariantach.
// Użycie: node tokeny.mjs <tokeny.ts> <wyjście.css> <tabela.md>. Kod 1, gdy którakolwiek para nie spełnia progu.
// Wzory luminancji i stosunku kontrastu: WCAG 2.2 (definicje „relative luminance”, „contrast ratio”), jak w kontrast.mjs.
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const [wej, css, md] = process.argv.slice(2);
const { kolory, pary, typografia } = await import(pathToFileURL(resolve(wej)).href);
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (hex) => { const n = parseInt(hex.slice(1, 7), 16); return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const kebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
const blok = (sel, p) => `${sel} {\n${Object.entries(p).map(([k, v]) => `  --${kebab(k)}: ${v};`).join('\n')}\n}\n`;
writeFileSync(css, `/* Wygenerowane przez narzedzia/tokeny.mjs z tokeny.ts; nie edytuj ręcznie. */\n:root { --tytul: '${typografia.tytulKroj}', serif; }\n`
  + blok(':root', kolory.light) + blok('[data-theme="dark"]', kolory.dark)
  + blok('[data-kontrast="wiekszy"]', kolory.lightHigh) + blok('[data-theme="dark"][data-kontrast="wiekszy"]', kolory.darkHigh));
const warianty = { 'jasny': kolory.light, 'ciemny': kolory.dark, 'jasny, zwiększony kontrast': kolory.lightHigh, 'ciemny, zwiększony kontrast': kolory.darkHigh };
let fail = 0, n = 0;
let out = '# Kontrast tokenów E3\nWygenerowane przez `narzedzia/tokeny.mjs` z `tokeny.ts`. Próg 4,5 dla tekstu, 3 dla tekstu dużego, elementów interfejsu i grafiki z informacją (WCAG 2.2, 1.4.3 i 1.4.11).\n\n';
out += `| Para | Próg | ${Object.keys(warianty).join(' | ')} |\n|---|---|${Object.keys(warianty).map(() => '---|').join('')}\n`;
for (const [nazwa, [fg, bg, min]] of Object.entries(pary)) {
  const kom = Object.values(warianty).map((p) => { const r = ratio(p[fg], p[bg]); n++; if (r < min) fail++; return `${r < min ? '**BRAK** ' : ''}${r.toFixed(2)} (\`${p[fg]}\` / \`${p[bg]}\`)`; });
  out += `| ${nazwa} | ${min} | ${kom.join(' | ')} |\n`;
}
out += `\nWynik: ${n} pomiarów, ${fail} poniżej progu.\n`;
writeFileSync(md, out);
console.log(`${n} pomiarów, ${fail} poniżej progu`);
for (const l of out.split('\n').filter((l) => l.includes('BRAK'))) console.log(l);
process.exit(fail ? 1 : 0);
