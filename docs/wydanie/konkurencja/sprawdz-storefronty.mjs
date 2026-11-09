// Dostępność aplikacji konkurencji w storefrontach App Store (D-298).
// Publiczne iTunes Lookup API, 0 USD, bez zależności. Jedno wywołanie na kraj
// (wiele id po przecinku), opóźnienie między wywołaniami, ponowienie przy 403/429/5xx.
// Uruchomienie: node docs/wydanie/konkurencja/sprawdz-storefronty.mjs [plik-wyniku]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const wejscie = JSON.parse(readFileSync(join(dir, 'wejscie.json'), 'utf8'));
const { storefronty } = JSON.parse(readFileSync(join(dir, 'storefronty-apple.json'), 'utf8'));
const ids = wejscie.aplikacje.map((a) => a.id);
const OPOZNIENIE_MS = 1500;
const PROBY = 5;
const sen = (ms) => new Promise((r) => setTimeout(r, ms));

async function lookup(kod) {
  const url = `https://itunes.apple.com/lookup?id=${ids.join(',')}&country=${kod.toLowerCase()}&entity=software`;
  for (let p = 1; p <= PROBY; p++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'storefront-check/1.0' } });
    if (res.ok) {
      const d = await res.json();
      return { status: res.status, dostepne: d.results.map((r) => r.trackId).filter((id) => ids.includes(id)) };
    }
    if (![403, 429, 500, 502, 503, 504].includes(res.status)) return { status: res.status, blad: true };
    await sen(OPOZNIENIE_MS * 2 ** p);
  }
  return { status: 'po ' + PROBY + ' próbach', blad: true };
}

const wynik = { data: new Date().toISOString(), api: 'https://itunes.apple.com/lookup?id=<id,…>&country=<kod>', kraje: {} };
for (const s of storefronty) {
  const r = await lookup(s.kod);
  wynik.kraje[s.kod] = { nazwa: s.nazwa, ...r };
  process.stdout.write(`${s.kod}:${r.blad ? 'BŁĄD ' + r.status : r.dostepne.length} `);
  await sen(OPOZNIENIE_MS);
}
const plik = process.argv[2] ?? join(dir, `wynik-${wynik.data.slice(0, 10)}.json`);
writeFileSync(plik, JSON.stringify(wynik, null, 1) + '\n');
console.log('\nzapisano', plik);
