import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
// użycie: tsx scripts/fetch-targets.ts [PLIK.json]  (domyślnie tools/preflop-solver/targets/pub-6max-100bb.json, poza gitem)
// Pobiera cele walidacji modelu EQR (dokument 10, sekcja „Naprawa modelu EQR”): opublikowane siatki solvera (NL500, 6-max 100bb; adres w PAGES_URL)
// dla otwarć i obrony blindów. Dane służą wyłącznie do porównania z wynikiem naszego solvera (ADR-02, ADR-20);
// nie trafiają do repozytorium ani do aplikacji.

/** Serwis z opublikowanymi siatkami solvera (dokument 10, „Naprawa modelu EQR”). */
const PAGES_URL = 'https://beyondgto.com';
const PAGES: Record<string, string> = {
  'rfi.UTG': 'ranges/lj-open-6max-100bb',
  'rfi.HJ': 'ranges/hj-open-6max-100bb',
  'rfi.CO': 'ranges/co-open-6max-100bb',
  'rfi.BTN': 'ranges/btn-open-6max-100bb',
  'rfi.SB': 'ranges/sb-open-6max-100bb',
  'SB vs BTN': 'defense/sb-vs-btn',
  'BB vs BTN': 'defense/bb-vs-btn',
  'BB vs SB': 'defense/bb-vs-sb',
};

const out = resolve(process.argv[2] ?? resolve(import.meta.dirname, '../targets/pub-6max-100bb.json'));
const result: Record<string, { url: string; source: string; freqs: Record<string, Record<string, number>> }> = {};
for (const [name, page] of Object.entries(PAGES)) {
  const url = `${PAGES_URL}/${page}`;
  const html = execFileSync('curl', ['-sSL', '--fail', url], { encoding: 'utf8', maxBuffer: 1 << 24 });
  const source = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
  const freqs: Record<string, Record<string, number>> = {};
  // komórka siatki: data-tip="A5s · 3-bet 100% · defend 100%"; akcje: raise, 3-bet, call, fold (pozostałe pola to sumy)
  for (const m of html.matchAll(/data-tip="([^"]*)"/g)) {
    const [hc, ...parts] = m[1]!.split('·').map((s) => s.trim());
    const acts: Record<string, number> = {};
    for (const p of parts) {
      const a = /^([A-Za-z0-9 -]+?) (\d+(?:\.\d+)?)%$/.exec(p);
      if (a && ['raise', '3-bet', 'call', 'fold', 'jam'].includes(a[1]!.toLowerCase())) acts[a[1]!.toLowerCase()] = Number(a[2]) / 100;
    }
    freqs[hc!] = acts;
  }
  if (Object.keys(freqs).length !== 169) throw new Error(`${url}: ${Object.keys(freqs).length} klas zamiast 169`);
  if (!source.includes('6-max cash')) throw new Error(`${url}: nie jest to strona 6-max cash (${source})`);
  result[name] = { url, source, freqs };
  console.log(`${name}: ${url} (${source})`);
}
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify({ fetched: new Date().toISOString(), pages: result }, null, 1));
console.log(`Zapisano ${out}`);
