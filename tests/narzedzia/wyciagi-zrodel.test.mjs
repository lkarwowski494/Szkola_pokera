// Kontrola wyciągów ze źródeł w publicznym repo (D-141, docs/tresci/00-rozpoznanie.md:62; M1-audytor-generalny-007,
// 06-tresci-001): w plikach odczytu i dowodów treści jest tylko cytat do 250 znaków na adres, nie kopia strony.
// Dlaczego test, a nie zasada w dokumencie: sesje odczytu zapisywały wiersze tekstu źródła zamiast cytatu (2565 znaków
// z jednego artykułu), a reguła w dokumencie tego nie zatrzymała.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const KORZEN = new URL('../../', import.meta.url).pathname;
const TRESCI = join(KORZEN, 'docs/tresci');
const LIMIT = 250;
// Pliki, w których sesja zapisała tekst strony (znaczniki z nagłówków odczytów).
const ZNACZNIK = /tylko wiersze z cytatami|tekst po zdjęciu znacznik|HTML → tekst/;
const ADRES = /https?:\/\/[^\s)„”"]+/;

const katalogi = () => [
  join(TRESCI, 'odczyty'),
  join(TRESCI, 'recenzje/dowody'),
  ...readdirSync(TRESCI).filter((n) => /^dowody/.test(n)).map((n) => join(TRESCI, n)),
];
const pliki = (k) => readdirSync(k).map((n) => join(k, n)).filter((p) => statSync(p).isFile() && /\.(txt|md|tsv)$/.test(p));

// Tekst cytowany na adres: wiersze treści po znaczniku, po „## <adres>” albo po „# … wiersze …” (fragment ciągły),
// do pustego wiersza. Komentarze (#), polecenia ($), kod HTTP i numer wiersza nie liczą się; ten sam wiersz liczy się raz.
export function cytatyNaAdres(tekst, adresPoczatkowy = null) {
  const wynik = new Map();
  let adres = adresPoczatkowy;
  let cytuje = false;
  for (const w of tekst.split('\n')) {
    const a = w.match(ADRES)?.[0]?.replace(/[.,;:]$/, '');
    if (w.trim() === '') { cytuje = false; continue; }
    if (/^[#$]/.test(w)) {
      if (a) adres = a;
      if (ZNACZNIK.test(w) || /^##\s+https?:/.test(w) || /^#.*\bwiersz/.test(w)) cytuje = true;
      continue;
    }
    if (!cytuje || /^\d{3}$/.test(w.trim())) continue;
    const tresc = w.replace(/^\s*\d+\s*[:\t]\s*/, '').trim();
    if (!tresc) continue;
    if (!wynik.has(adres)) wynik.set(adres, new Set());
    wynik.get(adres).add(tresc);
  }
  return wynik;
}

test('cytatyNaAdres liczy wiersze po znaczniku i ignoruje rachunek po pustym wierszu', () => {
  const t = '# odczyt https://x.example/a\n# tylko wiersze z cytatami\n12:\tAla ma kota.\n12:\tAla ma kota.\n\n# Rachunek\nwynik 138\n## https://x.example/b\n5:\tBe.';
  const m = cytatyNaAdres(t);
  assert.deepEqual([...m.get('https://x.example/a')], ['Ala ma kota.']);
  assert.deepEqual([...m.get('https://x.example/b')], ['Be.']);
  assert.equal(m.size, 2);
});

test(`wyciągi ze źródeł w docs/tresci: najwyżej ${LIMIT} znaków cytatu na adres w pliku`, () => {
  const ponad = [];
  for (const k of katalogi()) for (const p of pliki(k)) {
    const tekst = readFileSync(p, 'utf8');
    if (!ZNACZNIK.test(tekst)) continue;
    for (const [adres, wiersze] of cytatyNaAdres(tekst)) {
      const n = [...wiersze].join(' ').length;
      if (n > LIMIT) ponad.push(`${relative(KORZEN, p)}: ${adres}: ${n} znaków`);
    }
  }
  assert.deepEqual(ponad, []);
});

test(`kolumny „cytat” w tabelach odczytów (*.tsv): każde pole najwyżej ${LIMIT} znaków`, () => {
  const bledy = [];
  for (const k of katalogi()) for (const p of pliki(k).filter((x) => x.endsWith('.tsv'))) {
    const [naglowek, ...wiersze] = readFileSync(p, 'utf8').split('\n');
    const kol = naglowek.split('\t').map((n, i) => (n === 'cytat' ? i : -1)).filter((i) => i >= 0);
    wiersze.forEach((w, i) => { for (const c of kol) { const pole = w.split('\t')[c] ?? ''; if (pole.length > LIMIT) bledy.push(`${relative(KORZEN, p)}:${i + 2}: ${pole.length}`); } });
  }
  assert.deepEqual(bledy, []);
});
