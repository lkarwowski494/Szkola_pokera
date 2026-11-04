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

test('zmiana wpisu pomocy unieważnia przegląd zastępczy H-US-1', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-US-1');
    assert.match(sha ?? '', /^[0-9a-f]{12}$/);
    ustawPrzeglad(d, 'pomoc.json', 'H-US-1', sha);
    assert.doesNotMatch(uruchom(d, '--przeglad', 'zastępczy').stdout, /H-US-1: (krytyczne bez|przegląd dotyczy)/);
    const h = join(d, 'content/helplines.yaml');
    writeFileSync(h, readFileSync(h, 'utf8').replace("phone: '1-800-697-3738'", "phone: '1-800-697-3739'"));
    const po = uruchom(d, '--przeglad', 'zastępczy');
    assert.match(po.stdout, /BŁĄD rejestr H-US-1: przegląd dotyczy innej wersji zdań/);
    assert.equal(po.status, 1);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('zmiana lekcji z regułą krytyczną unieważnia przegląd; z --przed-przegladem to uwaga', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'R-M12-010');
    ustawPrzeglad(d, 'm12-m13.json', 'R-M12-010', sha);
    const l = join(d, 'content/pl/lessons/m12-l4-bankroll.md');
    writeFileSync(l, readFileSync(l, 'utf8') + '\nNowe zdanie.\n');
    assert.match(uruchom(d, '--przeglad', 'zastępczy').stdout, /BŁĄD rejestr R-M12-010: przegląd dotyczy innej wersji zdań/);
    assert.match(uruchom(d, '--przed-przegladem').stdout, /UWAGA rejestr R-M12-010: przegląd dotyczy innej wersji zdań/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('przegląd zastępczy bez polityki --przeglad zastępczy jest błędem', () => {
  const d = kopia();
  try {
    const sha = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-US-1');
    ustawPrzeglad(d, 'pomoc.json', 'H-US-1', sha);
    assert.match(uruchom(d).stdout, /BŁĄD rejestr H-US-1: krytyczne bez przeglądu człowieka \(zastępczy bez polityki D-027\)/);
  } finally { rmSync(d, { recursive: true, force: true }); }
});

test('zamiana kolejności wpisów pomocy jednego twierdzenia zmienia skrót (który numer ekran pokazuje pierwszy)', () => {
  const d = kopia();
  try {
    const przed = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-VN-3');
    const h = join(d, 'content/helplines.yaml'), t = readFileSync(h, 'utf8');
    const a = t.indexOf('  - id: vn-115\n'), b = t.indexOf('  - id: vn-113\n'), c = t.indexOf('  # --- DE ---');
    assert.ok(a > 0 && b > a && c > b);
    writeFileSync(h, t.slice(0, a) + t.slice(b, c) + t.slice(a, b) + t.slice(c));
    const po = skrotZ(uruchom(d, '--przed-przegladem', '--skroty').stdout, 'H-VN-3');
    assert.notEqual(po, przed);
  } finally { rmSync(d, { recursive: true, force: true }); }
});
