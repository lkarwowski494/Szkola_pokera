// ikona-warstwy.mjs — warstwy SVG ikony kierunku I (D-118) z tokenów; wynik w docs/design/ikona/.
// Użycie: node ikona-warstwy.mjs <katalog-wyjścia>. Indeksy kart krojem Literata 600 (D-120), osadzonym jako dane @font-face (OFL);
// do Icon Composer indeksy trzeba zamienić na krzywe (krok otwarty, design-spec.md „Ikona”).
// Bez własnych cieni i blasków (HIG App icons: „Let the system handle blurring and other visual effects”).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const tu = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.argv[2] || resolve(tu, '../ikona'));
const font = readFileSync(resolve(tu, '../fonty/literata-latin-600-normal.woff2')).toString('base64');
const styl = `<style>@font-face{font-family:'Literata';font-weight:600;src:url(data:font/woff2;base64,${font}) format('woff2')}</style>`;
const PIK = 'M12 2C9 6 4 9 4 13.5 4 16 6 18 8.5 18c1.3 0 2.4-.5 3-1.3-.2 1.9-1 3.4-2.5 4.8h6c-1.5-1.4-2.3-2.9-2.5-4.8.6.8 1.7 1.3 3 1.3 2.5 0 4.5-2 4.5-4.5C20 9 15 6 12 2z';
const KIER = 'M12 21C5 15.5 2 12.3 2 8.5 2 5.5 4.3 3.5 7 3.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 2.7 0 5 2 5 5 0 3.8-3 7-10 12.5z';
const P = {
  jasna: { tlo1: '#22488A', tlo2: '#0A1430', rama: '#0A1430', s1: '#23694D', s2: '#174A36', karta: '#FFFDF7', brzeg: '#E4DCC8', tusz: '#0A1430', kier: '#C8102E', pas: '#15452F', kres: '#3F8564', os: '#FFFDF7', zloto: '#E2B850' },
  ciemna: { tlo1: '#0A1430', tlo2: '#0A1430', rama: '#1E3466', s1: '#1C5A41', s2: '#103426', karta: '#F2EEE3', brzeg: '#E4DCC8', tusz: '#0A1430', kier: '#C8102E', pas: '#15452F', kres: '#3F8564', os: '#F2EEE3', zloto: '#E2B850' },
};
const svg = (wnetrze, defs = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024"><defs>${styl}${defs}</defs>${wnetrze}</svg>\n`;
const tlo = (k) => `<rect width="1024" height="1024" fill="url(#t)"/>`;
const tloDefs = (k) => `<linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${k.tlo1}"/><stop offset="1" stop-color="${k.tlo2}"/></linearGradient>`;
const karta = (k, znak, sciezka, kolor, t) => `<g transform="${t}"><rect x="-130" y="-185" width="260" height="370" rx="28" fill="${k.karta}" stroke="${k.brzeg}" stroke-width="4"/>
<text x="-100" y="-78" font-family="Literata" font-weight="600" font-size="112" fill="${kolor}">${znak}</text>
<path d="${sciezka}" transform="translate(-100 -62) scale(4.2)" fill="${kolor}"/></g>`;
// mono: wszystko jednym kolorem (alfa niesie kształt): rama jako pierścień, karty i pasek jako sylwetki
const plan = (k, mono = false) => {
  const c = (x) => (mono ? '#FFFFFF' : x);
  return `<rect x="92" y="212" width="840" height="600" rx="300" fill="${mono ? 'none' : k.rama}" ${mono ? 'stroke="#FFFFFF" stroke-width="32"' : ''}/>
${mono ? '' : '<rect x="124" y="244" width="776" height="536" rx="268" fill="url(#su)"/>'}
<g transform="translate(512 400) scale(0.58)">${mono
    ? `<g transform="rotate(-10) translate(-112 0)"><rect x="-130" y="-185" width="260" height="370" rx="28" fill="#FFFFFF"/></g><g transform="rotate(9) translate(100 -10)"><rect x="-130" y="-185" width="260" height="370" rx="28" fill="#FFFFFF"/></g>`
    : karta(k, 'J', PIK, k.tusz, 'rotate(-10) translate(-112 0)') + karta(k, '9', KIER, k.kier, 'rotate(9) translate(100 -10)')}</g>
<g transform="translate(0 -40)">${mono
    ? `<rect x="282" y="680" width="460" height="92" rx="16" fill="none" stroke="#FFFFFF" stroke-width="16"/><rect x="650" y="680" width="92" height="92" fill="#FFFFFF"/>`
    : `<g clip-path="url(#kl)"><rect x="282" y="680" width="460" height="92" fill="url(#kres)"/><rect x="650" y="680" width="92" height="92" fill="${k.os}"/></g><rect x="282" y="680" width="460" height="92" rx="16" fill="none" stroke="${k.os}" stroke-width="6"/>`}
<path d="M666 604 h60 l-30 46 z" fill="${c(k.zloto)}"/></g>`;
};
const planDefs = (k) => `<radialGradient id="su" cx="50%" cy="35%" r="70%"><stop offset="0" stop-color="${k.s1}"/><stop offset="1" stop-color="${k.s2}"/></radialGradient>
<pattern id="kres" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="26" height="26" fill="${k.pas}"/><rect width="8" height="26" fill="${k.kres}"/></pattern>
<clipPath id="kl"><rect x="282" y="680" width="460" height="92" rx="16"/></clipPath>`;
// Android adaptive: treść w bezpiecznym kole (66 z 108 dp) — pierwszy plan zmniejszony do 0,66 wokół środka
const android = (wn) => `<g transform="translate(512 512) scale(0.66) translate(-512 -512)">${wn}</g>`;
const pliki = {
  'tlo.svg': svg(tlo(P.jasna), tloDefs(P.jasna)),
  'tlo-ciemne.svg': svg(tlo(P.ciemna), tloDefs(P.ciemna)),
  'pierwszy-plan.svg': svg(plan(P.jasna), planDefs(P.jasna)),
  'pierwszy-plan-ciemny.svg': svg(plan(P.ciemna), planDefs(P.ciemna)),
  'ikona.svg': svg(tlo(P.jasna) + plan(P.jasna), tloDefs(P.jasna) + planDefs(P.jasna)),
  'ikona-ciemna.svg': svg(tlo(P.ciemna) + plan(P.ciemna), tloDefs(P.ciemna) + planDefs(P.ciemna)),
  'android-pierwszy-plan.svg': svg(android(plan(P.jasna)), planDefs(P.jasna)),
  'android-mono.svg': svg(android(plan(P.jasna, true)), ''),
  'start.svg': svg(plan(P.jasna), planDefs(P.jasna)),
};
for (const [n, t] of Object.entries(pliki)) { writeFileSync(resolve(out, n), t); console.log(resolve(out, n)); }
