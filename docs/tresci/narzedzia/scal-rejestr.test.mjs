// Test skrótu wersji zdań (przeglad.sha) w scal-rejestr.mjs: przegląd twierdzenia krytycznego jest ważny tylko dla
// wersji tekstu, którą widział recenzent. Zmiana wpisu pomocy albo lekcji używającej reguły unieważnia przegląd.
// Uruchamianie: node --test docs/tresci/narzedzia/scal-rejestr.test.mjs (z katalogu głównego repo; część pnpm test:skrypty).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, symlinkSync, rmSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const repo = resolve(new URL('../../..', import.meta.url).pathname);
const ZAST = 'weryfikacja zastępcza (subagent)';

function kopia() {
  const d = mkdtempSync(join(tmpdir(), 'scal-rejestr-'));
  for (const p of ['content/pl/rules.yaml', 'content/pl/lessons', 'content/pl/exams', 'content/numbers.yaml', 'content/terms.yaml', 'content/helplines.yaml', 'docs/tresci/rejestr', 'docs/tresci/narzedzia/scal-rejestr.mjs', 'docs/tresci/narzedzia/kontrole-tresci.mjs', 'tools/content-build/package.json']) {
    cpSync(join(repo, p), join(d, p), { recursive: true });
  }
  // pnpm: node_modules/yaml to dowiązanie względne do magazynu; w kopii wskazujemy rzeczywistą ścieżkę pakietu
  mkdirSync(join(d, 'tools/content-build/node_modules'), { recursive: true });
  const yaml = dirname(createRequire(join(repo, 'tools/content-build/package.json')).resolve('yaml/package.json'));
  symlinkSync(realpathSync(yaml), join(d, 'tools/content-build/node_modules/yaml'));
  return d;
}
const uruchom = (d, ...a) => spawnSync(process.execPath, ['docs/tresci/narzedzia/scal-rejestr.mjs', ...a], { cwd: d, encoding: 'utf8' });
const skrotZ = (out, id) => out.match(new RegExp(`^SKRÓT ${id} ([0-9a-f]{12})`, 'm'))?.[1];
function ustawPrzeglad(d, partia, id, sha) {
  const p = join(d, 'docs/tresci/rejestr', partia), r = JSON.parse(readFileSync(p, 'utf8'));
  r.find((w) => w.id === id).przeglad = { kto: ZAST, data: '2026-11-04', sha };
  writeFileSync(p, JSON.stringify(r, null, 1) + '\n');
}

test('zmiana wpisu pomocy unieważnia przegląd zastępczy H-INT-1', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-1');
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-1', sha);
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-1: (krytyczne bez|przegląd dotyczy)/);
    const h = join(d, 'content/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace('wsparcie emocjonalne online', 'wsparcie online'));
    const po = uruchom(d, '--przeglad', 'zastępczy');
    assert.match(po.stdout, /BŁĄD rejestr H-INT-1: przegląd dotyczy innej wersji zdań/);
    assert.equal(po.status, 1);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('zmiana lekcji z regułą krytyczną unieważnia przegląd; z --przed-przegladem to uwaga', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'R-M12-011');
    ustawPrzeglad(d, 'm12-m13.json', 'R-M12-011', sha);
    const l = join(d, 'content/pl/lessons/m12-l4-bankroll.md');
    writeFileSync(l, readFileSync(l, 'utf8') + '\nNowe zdanie.\n');
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /BŁĄD rejestr R-M12-011: przegląd dotyczy innej wersji zdań/);
    assert.match(uruchom(d, '--przed-przegladem').stdout, /UWAGA rejestr R-M12-011: przegląd dotyczy innej wersji zdań/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('przegląd zastępczy bez polityki --przeglad zastępczy jest błędem', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-1');
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-1', sha);
    assert.match(uruchom(d).stdout, /BŁĄD rejestr H-INT-1: krytyczne bez przeglądu człowieka \(zastępczy bez polityki D-027\)/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('D-158: zmiana zdania ogólnego (fallback.text) unieważnia przegląd H-INT-2; twierdzenie fallback.claim liczy się do pokrycia', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-INT-2');
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    ustawPrzeglad(d, 'pomoc.json', 'H-INT-2', sha);
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: (krytyczne bez|przegląd dotyczy)/);
    const h = join(d, 'content/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace('specjalistą zdrowia psychicznego', 'psychologiem'));
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /BŁĄD rejestr H-INT-2: przegląd dotyczy innej wersji zdań/);
    writeFileSync(h, readFileSync(h, 'utf8').replace('claim: H-INT-2', 'claim: H-INT-9'));
    assert.match(uruchom(d, '--przed-przegladem').stdout, /BŁĄD pokrycie: brak wpisu H-INT-9/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

// Rola 09, K2d: treść krytyczna w języku innym niż polski wymaga zapisu kontroli (a) dla wersji zdań tego języka.
test('content/en bez kontroli (a) = błąd; zapis ze skrótem en = zgodne; zmiana zdania en unieważnia', () => {
  const d = kopia();
  try {
    for (const p of ['lessons', 'exams', 'rules.yaml']) cpSync(join(d, 'content/pl', p), join(d, 'content/en', p), { recursive: true });
    cpSync(join(d, 'content/helplines.yaml'), join(d, 'content/en/helplines.yaml'));
    const r1 = uruchom(d, '--przeglad', 'zastępczy');
    assert.match(r1.stdout, /H-INT-2: treść krytyczna w en bez kontroli \(a\)/);
    assert.equal(r1.status, 1);
    const sha = r1.stdout.match(/^SKRÓT en H-INT-2 ([0-9a-f]{12})/m)?.[1] ?? uruchom(d, '--przed-przegladem', '--skroty').stdout.match(/^SKRÓT en H-INT-2 ([0-9a-f]{12})/m)?.[1];
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    const p = join(d, 'docs/tresci/rejestr/pomoc.json'), r = JSON.parse(readFileSync(p, 'utf8'));
    r.find((w) => w.id === 'H-INT-2').przeglad_jezyki = { en: { kto: ZAST, data: '2026-11-09', sha, kontrola: 'a' } };
    writeFileSync(p, JSON.stringify(r, null, 1) + '\n');
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: (treść krytyczna w en|kontrola \(a\) w en)/);
    const h = join(d, 'content/en/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace(/text: 'Jeśli rozpoznajesz/, "text: 'If you recognise"));
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-INT-2: kontrola \(a\) w en dotyczy innej wersji zdań/);
  } finally {
    rmSync(d, { recursive: true, force: true });
  }
});
