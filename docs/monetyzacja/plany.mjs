// plany.mjs iap-xx.json → per aplikacja: najniższa cena planu mies./rok/dożywotni (heurystyka po nazwie), mediany
import { readFileSync } from 'node:fs';
const num = (s) => parseFloat(s.replace(/[^\d,.\s]/g, '').trim().replace(/\s/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.'));
const typ = (n) => /week|tydz|woch/i.test(n) ? 'tydz' : /life|dożyw|permanent|lebens|lifetime|forever|full access$|access to all/i.test(n) ? 'dozyw' : /year|annual|rok|roczn|12 month|jahr|1 year/i.test(n) ? 'rok' : /month|mies|monat|1 month|30/i.test(n) ? 'mies' : 'inne';
const med = (a) => { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length ? (s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2) : null; };
const wsz = { mies: [], rok: [], dozyw: [] };
for (const f of process.argv.slice(2)) for (const a of JSON.parse(readFileSync(f, 'utf8'))) {
  const r = {};
  for (const [n, c] of a.iap) { const t = typ(n), v = num(c); if (!(v > 0) || !(t in wsz)) continue; r[t] = Math.min(r[t] ?? Infinity, v); }
  for (const t in r) wsz[t].push(r[t]);
  console.log(a.plik, JSON.stringify(r));
}
for (const t in wsz) console.log(`${t}: n=${wsz[t].length} mediana=${med(wsz[t])} min=${Math.min(...wsz[t])} max=${Math.max(...wsz[t])}`);
