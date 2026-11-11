// Testy podziału flowów E2E na części (DT): lista flowów przed i po podziale identyczna, części rozłączne i niepuste.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WAGI_S, bledy, brakujace, czesci, flowyBramki, podziel } from './e2e-podzial.mjs';
import { mapaFlowow, oczekiwane } from './e2e-ponowienia.mjs';

const E2E = fileURLToPath(new URL('../../apps/mobile/e2e/', import.meta.url));
const SKRYPT = fileURLToPath(new URL('./e2e-podzial.mjs', import.meta.url));

test('podziel: każdy flow dokładnie raz, części wyważone wagą, wynik deterministyczny', () => {
  const w = { 'a.yaml': 5, 'b.yaml': 4, 'c.yaml': 3, 'd.yaml': 2, 'e.yaml': 1 };
  const c = podziel(Object.keys(w), w, 2);
  assert.deepEqual(c.flat().sort(), Object.keys(w));
  const sumy = c.map((x) => x.reduce((s, f) => s + w[f], 0));
  assert.ok(Math.abs(sumy[0] - sumy[1]) <= 1, `sumy ${sumy}`);
  assert.deepEqual(podziel(Object.keys(w).reverse(), w, 2), c);
});

test('prawdziwy katalog e2e: 2 części razem = wszystkie flowy bramki (bez oczekujace/ i config.yaml), bez błędów', () => {
  const wszystkie = flowyBramki(E2E);
  assert.ok(wszystkie.length >= 9, `flowów: ${wszystkie.length}`);
  assert.ok(!wszystkie.includes('config.yaml'));
  const c = czesci(E2E, 2);
  assert.deepEqual(c.flat().sort(), wszystkie);
  assert.deepEqual(bledy(E2E, 2), []);
  for (const x of c) assert.ok(x.length >= 1);
});

test('bledy: więcej części niż flowów daje pustą część', () => {
  assert.match(bledy(E2E, flowyBramki(E2E).length + 1).join('\n'), /pusta/);
});

test('czesc: kopia ma config.yaml, wspolne/, oczekujace/ i tylko flowy swojej części; sprawdz kończy się kodem 0', () => {
  const wyj = join(mkdtempSync(join(tmpdir(), 'e2e-podzial-')), 'czesc');
  const lista = execFileSync(process.execPath, [SKRYPT, 'czesc', '1', '2', E2E, wyj], { encoding: 'utf8' }).trim().split('\n');
  assert.deepEqual(flowyBramki(wyj), lista);
  assert.ok(existsSync(join(wyj, 'config.yaml')) && existsSync(join(wyj, 'wspolne')) && existsSync(join(wyj, 'oczekujace')));
  assert.ok(readdirSync(wyj).length >= 3);
  execFileSync(process.execPath, [SKRYPT, 'sprawdz', '2', E2E]);
});

test('sprawdz: kod 1 przy pustej części', () => {
  assert.throws(() => execFileSync(process.execPath, [SKRYPT, 'sprawdz', '99', E2E], { stdio: 'pipe' }));
});

const junit = (...p) => `<testsuite>${p.map(([n, ok]) => `<testcase name="${n}">${ok ? '' : '<failure>x</failure>'}</testcase>`).join('')}</testsuite>`;

test('brakujace: wszystkie flowy z dwóch części zielone → pusto; flow nieobecny albo czerwony → wymieniony; zielone w ponowieniu się liczy', () => {
  const nazwy = oczekiwane(mapaFlowow(E2E));
  const [a, b] = czesci(E2E, 2).map((c) => c.map((f) => nazwy.find((n) => mapaFlowow(E2E).get(n) === join(E2E, f))));
  assert.equal(a.length + b.length, nazwy.length);
  const p1 = junit(...a.map((n) => [n, true]));
  const p2 = junit(...b.map((n) => [n, true]));
  assert.deepEqual(brakujace(E2E, [p1, p2]), []);
  assert.deepEqual(brakujace(E2E, [p1]), b.filter((n) => !a.includes(n)));
  assert.deepEqual(brakujace(E2E, [p1, junit([b[0], false], ...b.slice(1).map((n) => [n, true]))]), [b[0]]);
  assert.deepEqual(brakujace(E2E, [p1, junit([b[0], false], ...b.slice(1).map((n) => [n, true])), junit([b[0], true])]), []);
});

test('WAGI_S: każdy flow bramki ma zmierzoną wagę, a części różnią się o mniej niż 15%', () => {
  const flowy = flowyBramki(E2E);
  for (const f of flowy) assert.ok(WAGI_S[f] > 0, `brak wagi: ${f}`);
  const sumy = czesci(E2E, 2).map((c) => c.reduce((s, f) => s + WAGI_S[f], 0));
  assert.ok(Math.abs(sumy[0] - sumy[1]) / Math.max(...sumy) < 0.15, `sumy ${sumy}`);
});
