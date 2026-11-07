// Kontrola flowów Maestro bez Maestro (rola 07 E3, D-189): klasa błędu JAK-E0-01 (flow z tekstem, którego nie ma) i
// literówki w zmiennych/ścieżkach wychodzą w Node przy każdym `pnpm run ci`, a nie dopiero na runnerze macOS.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAllDocuments } from 'yaml';

const E2E = join(dirname(fileURLToPath(import.meta.url)), '../../apps/mobile/e2e');
const flowy = (kat) => readdirSync(kat).flatMap((f) => (statSync(join(kat, f)).isDirectory() ? flowy(join(kat, f)) : f.endsWith('.yaml') ? [join(kat, f)] : []));
const wszystkie = flowy(E2E).filter((f) => !f.endsWith('config.yaml'));

function zmienneEnv() {
  const wyjscie = execFileSync(process.execPath, [join(E2E, 'helplines-env.mjs')], { encoding: 'utf8' }).split('\n');
  const env = new Map();
  for (let i = 0; i < wyjscie.length; i++) if (wyjscie[i] === '-e') {
    const [k, ...v] = wyjscie[i + 1].split('=');
    env.set(k, v.join('='));
  }
  return env;
}

test('każdy flow to poprawny YAML (nagłówek + kroki)', () => {
  assert.ok(wszystkie.length >= 9, `flowów: ${wszystkie.length}`);
  for (const f of wszystkie) {
    const docs = parseAllDocuments(readFileSync(f, 'utf8'));
    for (const d of docs) assert.deepEqual(d.errors, [], relative(E2E, f));
    const kroki = docs.at(-1).toJSON();
    assert.ok(Array.isArray(kroki), `${relative(E2E, f)}: ostatni dokument to lista kroków`);
    sprawdzKroki(kroki, relative(E2E, f));
  }
});

// Krok Maestro to nazwa polecenia (napis) albo mapa z jednym kluczem; złe wcięcie daje poprawny YAML z dwoma kluczami.
function sprawdzKroki(kroki, gdzie) {
  for (const [i, k] of kroki.entries()) {
    if (typeof k === 'string') continue;
    assert.ok(k && typeof k === 'object' && Object.keys(k).length === 1, `${gdzie}: krok ${i + 1} ma klucze ${JSON.stringify(Object.keys(k ?? {}))}`);
    const arg = Object.values(k)[0];
    if (arg && Array.isArray(arg.commands)) sprawdzKroki(arg.commands, `${gdzie} › ${Object.keys(k)[0]}`);
  }
}

test('każda zmienna ${…} we flowach ma niepustą wartość z helplines-env.mjs', () => {
  const env = zmienneEnv();
  for (const f of wszystkie) for (const [, k] of readFileSync(f, 'utf8').matchAll(/\$\{(\w+)\}/g)) {
    assert.ok(env.has(k), `${relative(E2E, f)}: brak zmiennej ${k} w helplines-env.mjs`);
    assert.notEqual(env.get(k).trim(), '', `${relative(E2E, f)}: pusta zmienna ${k} (dopasowałaby pusty tekst)`);
  }
});

test('każdy runFlow wskazuje istniejący plik (ścieżka względem flowu)', () => {
  for (const f of wszystkie) for (const [, p] of readFileSync(f, 'utf8').matchAll(/runFlow:\s*([^\s{][^\n]*\.yaml)/g))
    assert.ok(existsSync(join(dirname(f), p.trim())), `${relative(E2E, f)}: runFlow ${p}`);
});

test('config.yaml uruchamia tylko flowy z katalogu głównego (oczekujace/ poza bramką, D-189)', () => {
  const konf = parseAllDocuments(readFileSync(join(E2E, 'config.yaml'), 'utf8'))[0].toJSON();
  assert.deepEqual(konf.flows, ['*.yaml']);
  assert.ok(wszystkie.some((f) => f.includes('/oczekujace/')));
});

test('e2e.yml: timeout-minutes = 20 + 3 × liczba flowów w bramce + 10 (strategia.md §5.1)', () => {
  const wf = readFileSync(join(E2E, '../../../.github/workflows/e2e.yml'), 'utf8');
  const w = wf.match(/^\s+timeout-minutes:\s*(\d+)/m);
  const n = readdirSync(E2E).filter((f) => f.endsWith('.yaml') && f !== 'config.yaml').length;
  assert.equal(Number(w?.[1]), 20 + 3 * n + 10, `flowów w bramce: ${n}`);
});
