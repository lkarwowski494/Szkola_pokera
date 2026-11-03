// iap.mjs plik.html... → JSON [{plik, iap: [[nazwa, cena]]}] z bloku zakupów w aplikacji strony apps.apple.com.
// Blok to adnotacja z listą "textPair" (etykieta zależy od języka storefrontu, np. „In-App Purchases”, „Achats intégrés”).
import { readFileSync } from 'node:fs';
const out = [];
for (const f of process.argv.slice(2)) {
  const t = readFileSync(f, 'utf8');
  const i = t.indexOf('"items":[{"$kind":"textPair"');
  const iap = [];
  if (i >= 0) {
    const s = t.slice(i, i + 20000);
    for (const m of s.slice(0, s.indexOf(']')).matchAll(/"leadingText":"((?:[^"\\]|\\.)*)","trailingText":"((?:[^"\\]|\\.)*)"/g)) iap.push([JSON.parse(`"${m[1]}"`), JSON.parse(`"${m[2]}"`)]);
  }
  out.push({ plik: f.split('/').pop(), iap: [...new Map(iap.map((x) => [x.join('|'), x])).values()] });
}
console.log(JSON.stringify(out, null, 1));
