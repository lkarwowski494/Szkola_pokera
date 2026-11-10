#!/usr/bin/env node
// Nakłada poprawki pełnego przeglądu (sesja AU, 2026-11-10) WPROST na pliki w repo (`cel` i `stary` odnoszą się do plików na HEAD,
// nie do pliku propozycji, więc `poprawki.mjs` się nie nadaje). Rola 09, tryb build.
//
//   node docs/lokalizacja/narzedzia/naloz-pliki.mjs <poprawki.json> [--waga WYS] [--bez-wagi WYS] [--poza-generatorem]
//        [--pomin <fragment-powodu>,…] [--raport <plik.json>] [--sucho]
//
// Zasady: kolejność z pliku; `stary` musi wystąpić w bieżącej treści pliku dokładnie raz (inaczej poprawka jest pominięta z powodem,
// kod wyjścia 1); pliki generowane (store/app-store-metadata.json, docs/sklep/aso/metadane-fala2.json) są domyślnie pomijane, bo teksty
// sklepu zmienia się w generatorze docs/sklep/aso/zbuduj-metadane.py (poprawki oznaczone jako „sklep”). Nic nie jest zapisywane przy --sucho.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const KORZEN = new URL('../../../', import.meta.url).pathname;
const GENEROWANE = new Set(['store/app-store-metadata.json', 'docs/sklep/aso/metadane-fala2.json']);

export function nalozPoprawki(poprawki, { czytaj, zapisz, sucho = false, wagi = null, beZWag = null, pomin = [] }) {
  const stan = new Map(); // cel → bieżąca treść
  const wynik = { nalozone: 0, pominiete: [], sklep: [], odfiltrowane: 0 };
  for (const [i, p] of poprawki.entries()) {
    const opis = `#${i} ${p.jezyk} ${p.cel}${p.linia ? ':' + p.linia : ''} [${p.powod?.slice(0, 50)}]`;
    if (GENEROWANE.has(p.cel)) { wynik.sklep.push(p); continue; }
    if ((wagi && !wagi.includes(p.waga)) || (beZWag && beZWag.includes(p.waga))) { wynik.odfiltrowane++; continue; }
    if (pomin.some((f) => p.powod?.includes(f))) { wynik.pominiete.push(`${opis} — pominięta wskazaniem --pomin`); continue; }
    if (typeof p.stary !== 'string' || typeof p.nowy !== 'string' || !p.stary) { wynik.pominiete.push(`${opis} — pola stary/nowy`); continue; }
    let t = stan.get(p.cel);
    if (t === undefined) { t = czytaj(p.cel); stan.set(p.cel, t); }
    const ile = t.split(p.stary).length - 1;
    if (ile !== 1) { wynik.pominiete.push(`${opis} — „stary” występuje ${ile}×: ${p.stary.slice(0, 60)}`); continue; }
    stan.set(p.cel, t.replace(p.stary, () => p.nowy));
    wynik.nalozone++;
  }
  if (!sucho) for (const [cel, t] of stan) zapisz(cel, t);
  wynik.pliki = stan.size;
  return wynik;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = process.argv.slice(2);
  const opcja = (n) => (a.includes(n) ? a[a.indexOf(n) + 1] : null);
  const plik = a[0] && !a[0].startsWith('--') ? a[0] : null;
  if (!plik) { console.error('użycie: naloz-pliki.mjs <poprawki.json> [--waga W] [--bez-wagi W] [--pomin x,y] [--raport r.json] [--sucho]'); process.exit(2); }
  const lista = JSON.parse(readFileSync(plik, 'utf8'));
  const w = nalozPoprawki(lista, {
    czytaj: (c) => readFileSync(join(KORZEN, c), 'utf8'),
    zapisz: (c, t) => writeFileSync(join(KORZEN, c), t),
    sucho: a.includes('--sucho'),
    wagi: opcja('--waga')?.split(',') ?? null,
    beZWag: opcja('--bez-wagi')?.split(',') ?? null,
    pomin: opcja('--pomin')?.split(',') ?? [],
  });
  const rap = { plik, nalozone: w.nalozone, pominiete: w.pominiete, sklep: w.sklep.length, odfiltrowane: w.odfiltrowane, pliki: w.pliki };
  if (opcja('--raport')) writeFileSync(opcja('--raport'), JSON.stringify({ ...rap, sklepPoprawki: w.sklep }, null, 1) + '\n');
  console.log(`${plik}: nałożone ${w.nalozone}, pominięte ${w.pominiete.length}, sklep (generator) ${w.sklep.length}, odfiltrowane ${w.odfiltrowane}, plików ${w.pliki}`);
  for (const x of w.pominiete) console.log('  POMINIĘTA', x);
  process.exit(w.pominiete.length ? 1 : 0);
}
