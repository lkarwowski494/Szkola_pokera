// Testy decyzji raportu nocnego (D-170): czysta logika bez `gh`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { akcja, ocen, tresc } from './nocny-raport.mjs';

test('ocen: success i skipped zielone; failure i cancelled czerwone, z nazwą zadania', () => {
  assert.deepEqual(ocen({ a: { result: 'success' }, b: { result: 'skipped' } }), { czerwona: false, porazki: [] });
  assert.deepEqual(ocen({ a: { result: 'failure' }, e2e: { result: 'cancelled' }, c: { result: 'success' } }), { czerwona: true, porazki: ['a: failure', 'e2e: cancelled'] });
});

test('akcja: czerwona otwiera albo komentuje otwarte; zielona zamyka otwarte albo nic', () => {
  assert.equal(akcja({ czerwona: true, otwarte: null }), 'otworz');
  assert.equal(akcja({ czerwona: true, otwarte: 7 }), 'komentuj');
  assert.equal(akcja({ czerwona: false, otwarte: 7 }), 'zamknij');
  assert.equal(akcja({ czerwona: false, otwarte: null }), 'nic');
});

test('tresc: link, porażki i z E2E tylko listy nazw flowów (bez logów)', () => {
  const e2e = '## E2E\n\n- zielone: Pomoc\n- zielone dopiero w ponowieniu (niestabilne, D-178): Powtórki\n- padły dwa razy: Słowniczek\nSzczegóły logu: token=abc\n';
  const t = tresc({ porazki: ['e2e: failure'] }, 'https://x/runs/1', e2e);
  assert.match(t, /https:\/\/x\/runs\/1/);
  assert.match(t, /- e2e: failure/);
  assert.match(t, /ponowieniu[^\n]*Powtórki/);
  assert.match(t, /padły dwa razy: Słowniczek/);
  assert.doesNotMatch(t, /token|Szczegóły logu|zielone: Pomoc/);
});
