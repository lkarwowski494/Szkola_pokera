// Testy hooka pre-push (D-171): rozpoznanie `git push` i blokada kodem 2 przy porażce bramki. Bramki podmienione
// przez PRE_PUSH_BRAMKI (szybkie polecenia powłoki), więc test nie uruchamia typecheck.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { toPush } from './pre-push-check.mjs';

const SKRYPT = fileURLToPath(new URL('./pre-push-check.mjs', import.meta.url));
const uruchom = (wejscie, bramki) =>
  spawnSync(process.execPath, [SKRYPT], { input: typeof wejscie === 'string' ? wejscie : JSON.stringify(wejscie), encoding: 'utf8', env: { ...process.env, PRE_PUSH_BRAMKI: JSON.stringify(bramki) } });
const push = { tool_name: 'Bash', tool_input: { command: 'git push origin HEAD:claude/x' } };

test('rozpoznaje git push także po cd/&&/; i z -C; nie myli z innymi poleceniami', () => {
  for (const p of ['git push', 'git push -u origin b', 'cd /r && git push origin HEAD:b', 'pnpm ci; git push', 'git -C /home/r push origin b', '(git push)'])
    assert.equal(toPush(p), true, p);
  for (const p of ['git status', 'git log --grep push', 'git commit -m "push"', 'echo gitpush', 'git pushd', 'git stash push', 'npm run push'])
    assert.equal(toPush(p), false, p);
});

test('polecenie bez git push: kod 0 i bramki nie biegną (nawet failujące)', () => {
  const r = uruchom({ tool_input: { command: 'git status' } }, [['zla', 'exit 1']]);
  assert.equal(r.status, 0);
  assert.equal(r.stderr, '');
});

test('git push z porażką bramki: kod 2, stderr z nazwą bramki i wyjściem polecenia; dalsze bramki nie biegną', () => {
  const r = uruchom(push, [['dobra', 'true'], ['typy', 'echo "TS2345 błąd typu" && exit 1'], ['nie-biegnie', 'echo NIE >&2; exit 1']]);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /bramka „typy”/);
  assert.match(r.stderr, /TS2345 błąd typu/);
  assert.doesNotMatch(r.stderr, /NIE/);
});

test('git push z zielonymi bramkami: kod 0', () => {
  assert.equal(uruchom(push, [['a', 'true'], ['b', 'true']]).status, 0);
});

test('wejście nie-JSON: kod 0 (hook nie blokuje cudzych wywołań)', () => {
  assert.equal(uruchom('nie json', [['zla', 'exit 1']]).status, 0);
});
