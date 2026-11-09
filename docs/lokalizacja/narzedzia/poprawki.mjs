#!/usr/bin/env node
// Nakłada poprawki drugiego przeglądu na KOPIĘ pliku propozycji przekładu (artefakt `raport-przekladu`), przed
// `node scripts/i18n/przeklad-api.mjs --zastosuj`. Rola 09, sesja AB (2026-11-09, D-366). Nie zapisuje do content/ ani locales/.
//
//   node docs/lokalizacja/narzedzia/poprawki.mjs <propozycje.json> <poprawki.json> [<poprawki2.json> …] --wyjscie <nowy.json>
//
// poprawki.json: tablica { jezyk, cel, stary, nowy, waga, powod }. `stary` musi wystąpić w tekście jednostki (jezyk, cel)
// dokładnie raz — inaczej poprawka jest pomijana z powodem (kod wyjścia 1, plik wyjściowy i tak powstaje bez niej).
// Jednostka odrzucona w przebiegu, której poprawka usuwa powód (np. m10-l1 ja), dostaje status „przyjeta”; o przyjęciu
// i tak decyduje kontrola `--zastosuj` (kontrolaPropozycji na HEAD), więc ten status niczego nie omija.
import { readFileSync, writeFileSync } from 'node:fs';

export function nalozPoprawki(prop, listy) {
  const wynik = { nalozone: [], pominiete: [], poza: 0 };
  for (const p of listy.flat()) {
    const j = prop.jednostki.find((e) => e.jezyk === p.jezyk && e.cel === p.cel);
    const opis = `${p.jezyk} ${p.cel}: ${String(p.stary).slice(0, 60)}`;
    if (!j) { wynik.poza++; continue; } // jednostka z innego przebiegu (inny plik propozycji)
    if (typeof j.tekst !== 'string') { wynik.pominiete.push(`${opis} — jednostka bez tekstu`); continue; }
    if (typeof p.stary !== 'string' || typeof p.nowy !== 'string' || !p.stary) { wynik.pominiete.push(`${opis} — pola stary/nowy`); continue; }
    const ile = j.tekst.split(p.stary).length - 1;
    if (ile !== 1) { wynik.pominiete.push(`${opis} — „stary” występuje ${ile}×`); continue; }
    j.tekst = j.tekst.replace(p.stary, () => p.nowy);
    if (j.status !== 'przyjeta') { j.status = 'przyjeta'; j.powody = []; }
    (j.poprawki ??= []).push({ waga: p.waga, powod: p.powod });
    wynik.nalozone.push(opis);
  }
  return wynik;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const argv = process.argv.slice(2);
  const iw = argv.indexOf('--wyjscie');
  if (iw < 0 || argv.length < 4) { console.error('użycie: poprawki.mjs <propozycje.json> <poprawki.json>… --wyjscie <nowy.json>'); process.exit(2); }
  const wyj = argv[iw + 1], pliki = argv.filter((_, i) => i !== iw && i !== iw + 1);
  const prop = JSON.parse(readFileSync(pliki[0], 'utf8'));
  const w = nalozPoprawki(prop, pliki.slice(1).map((f) => JSON.parse(readFileSync(f, 'utf8'))));
  writeFileSync(wyj, JSON.stringify(prop, null, 1) + '\n');
  console.log(`nałożone: ${w.nalozone.length}, pominięte: ${w.pominiete.length}, z innych plików propozycji: ${w.poza}`);
  for (const x of w.pominiete) console.log(`  POMINIĘTA ${x}`);
  process.exit(w.pominiete.length ? 1 : 0);
}
