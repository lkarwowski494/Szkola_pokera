// Zgłoszenie z wynikiem nocy (D-170; wzór Trening nightly.yml pkt 4, scripts/ci/nocny-raport.mjs): czerwona noc otwiera
// zgłoszenie z etykietą `nocne-testy` albo dopisuje komentarz do otwartego, zielona zamyka otwarte. Zgłoszenia są
// PUBLICZNE: tylko wyniki zadań, nazwy flowów i link do przebiegu, bez treści logów. Wejście: NEEDS_JSON (toJSON(needs)),
// E2E_PODSUMOWANIE (plik z e2e-ponowienia.mjs, opcjonalny), GITHUB_SERVER_URL/REPOSITORY/RUN_ID. Wywołania `gh` tylko w main.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ETYKIETA = 'nocne-testy';

/** needs → { czerwona, porazki: [zadanie: wynik] }. „skipped” nie jest porażką; „cancelled” jest (noc niepełna). */
export function ocen(needs) {
  const porazki = Object.entries(needs)
    .filter(([, v]) => v.result !== 'success' && v.result !== 'skipped')
    .map(([k, v]) => `${k}: ${v.result}`);
  return { czerwona: porazki.length > 0, porazki };
}

/** Decyzja: { czerwona, otwarte: numer | null } → 'otworz' | 'komentuj' | 'zamknij' | 'nic'. */
export function akcja({ czerwona, otwarte }) {
  if (czerwona) return otwarte ? 'komentuj' : 'otworz';
  return otwarte ? 'zamknij' : 'nic';
}

export function tresc({ porazki }, link, e2e) {
  const linie = porazki.length ? porazki.map((p) => `- ${p}`).join('\n') : '- wszystkie zadania zielone';
  // z podsumowania E2E bierzemy tylko listy nazw flowów (bez logów)
  const flowy = (e2e ?? '').split('\n').filter((l) => /^- (zielone dopiero w ponowieniu|padły dwa razy)/.test(l)).join('\n');
  return `Przebieg: ${link}\n\n${linie}${flowy ? `\n\nE2E:\n${flowy}` : ''}\n`;
}

function gh(...args) {
  return execFileSync('gh', args, { encoding: 'utf8' }).trim();
}

function main() {
  const needs = JSON.parse(process.env.NEEDS_JSON ?? '{}');
  const e2e = process.env.E2E_PODSUMOWANIE && existsSync(process.env.E2E_PODSUMOWANIE) ? readFileSync(process.env.E2E_PODSUMOWANIE, 'utf8') : '';
  const link = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  const wynik = ocen(needs);
  gh('label', 'create', ETYKIETA, '--color', 'B60205', '--description', 'Wynik nocnych testów (nocny.yml)', '--force');
  const otwarte = JSON.parse(gh('issue', 'list', '--label', ETYKIETA, '--state', 'open', '--json', 'number', '--limit', '1'))[0]?.number ?? null;
  const plik = 'nocny-tresc.md';
  writeFileSync(plik, tresc(wynik, link, e2e));
  const a = akcja({ czerwona: wynik.czerwona, otwarte });
  if (a === 'otworz') gh('issue', 'create', '--label', ETYKIETA, '--title', 'Nocne testy: czerwona noc', '--body-file', plik);
  if (a === 'komentuj') gh('issue', 'comment', String(otwarte), '--body-file', plik);
  if (a === 'zamknij') gh('issue', 'close', String(otwarte), '--comment', `Zielona noc: ${link}`);
  console.log(`## Nocne testy\n\nakcja: ${a}\n\n${readFileSync(plik, 'utf8')}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
