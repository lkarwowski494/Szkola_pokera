// ocena-propozycji.mjs <root> <propozycje.json>… — ponowna ocena propozycji przekładu na bieżącym stanie repo (kontrolaPropozycji, skróty źródeł, koszt wg kosztUsd), bez zapisu. Rola 09, sesja AD (2026-11-09, D-370).
// ocena.mjs <root> <propozycje.json>... — ponowna ocena na HEAD bez zapisu
import { readFileSync } from 'node:fs';
const [root, ...pliki] = process.argv.slice(2);
const W = await import(root + '/scripts/i18n/wspolne.mjs');
const P = await import(root + '/scripts/i18n/przeklad-api.mjs');
let razem = 0;
for (const f of pliki) {
  const p = JSON.parse(readFileSync(f, 'utf8'));
  const u = p.uzycie_tokenow; const k = W.kosztUsd(u.we ?? u.input_tokens ?? u.wejscie, u.wy ?? u.output_tokens ?? u.wyjscie, p.model);
  razem += k;
  console.log(`## ${f.split('/').slice(-2).join('/')}: batch ${p.batch_id}, data ${p.data}, model ${p.model}/${p.effort}, tokeny ${JSON.stringify(u)}, koszt wg kosztUsd ${k.toFixed(6)}`);
  const cache = {};
  let zg = 0, roz = [], przyj = 0, odrz = 0, przyjHead = 0;
  for (const e of p.jednostki) {
    e.status === 'przyjeta' ? przyj++ : odrz++;
    const js = (cache[e.jezyk] ??= P.jednostkiPrzekladu(root, e.jezyk));
    const j = js.find((x) => x.zrodlo === e.zrodlo);
    const sha = j && j.zrodlo_sha256 === e.zrodlo_sha256; if (sha) zg++; else roz.push(e.cel);
    const k2 = j && typeof e.tekst === 'string' ? W.kontrolaPropozycji(j, e.tekst, e.jezyk) : { powody: ['brak'], ostrzezenia: [] };
    if (!k2.powody.length && sha) przyjHead++;
    const ot = e.ostrzezenia.filter((x) => x.startsWith('terminy')).length, ol = e.ostrzezenia.filter((x) => x.startsWith('liczby')).length;
    console.log(`${e.jezyk}\t${e.cel}\t${e.status}\tsha_zr=${e.zrodlo_sha256.slice(0, 12)}${sha ? '' : '(ZMIENIONE na HEAD)'}\tost_terminy=${ot}\tost_liczby=${ol}${e.powody.length ? '\tpowody=' + e.powody.length + ': ' + e.powody.join(' | ').slice(0, 300) : ''}${k2.powody.length ? '\tHEAD_powody=' + k2.powody.join(' | ').slice(0, 300) : ''}`);
  }
  console.log(`# podsumowanie pliku: przyjęte ${przyj}, odrzucone ${odrz}; skróty źródeł zgodne z HEAD ${zg}/${p.jednostki.length}${roz.length ? ' (różne: ' + roz.join(', ') + ')' : ''}; przechodzi kontrolę na HEAD ${przyjHead}/${p.jednostki.length}`);
}
console.log(`# koszt razem wg kosztUsd: ${razem.toFixed(2)} USD`);
