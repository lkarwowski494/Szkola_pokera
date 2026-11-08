// Testy bramki E2E przed TestFlight (D-170; analogia Trening scripts/ci/bramka-e2e.sh, odczyt 2026-11-07) na przebiegach syntetycznych
// w kształcie odpowiedzi GitHub API `actions/workflows/e2e-ios.yml/runs?head_sha=…` (pola id, status, conclusion).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { czekaj, liczbaZmiennej, ocen } from './bramka-e2e.mjs';

const p = (id, status, conclusion = null) => ({ id, status, conclusion });

test('ocen: zielony wygrywa z czerwonym i trwającym; trwający przed czerwonym; anulowany i pominięty nic nie mówią o kodzie', () => {
  assert.deepEqual(ocen([p(1, 'completed', 'failure'), p(2, 'completed', 'success'), p(3, 'in_progress')]), { stan: 'ok', id: 2 });
  assert.deepEqual(ocen([p(1, 'completed', 'failure'), p(3, 'queued')]), { stan: 'trwa', id: 3 });
  assert.deepEqual(ocen([p(1, 'completed', 'failure')]), { stan: 'czerwony', id: 1 });
  assert.deepEqual(ocen([p(1, 'completed', 'timed_out')]), { stan: 'czerwony', id: 1 });
  assert.deepEqual(ocen([p(1, 'completed', 'cancelled'), p(2, 'completed', 'skipped')]), { stan: 'brak', anulowany: 1 });
  assert.deepEqual(ocen([]), { stan: 'brak' });
  for (const status of ['queued', 'in_progress', 'waiting', 'requested', 'pending']) assert.deepEqual(ocen([p(4, status)]), { stan: 'trwa', id: 4 }, status);
});

const proba = (odpowiedzi, opcje = {}) => {
  const log = [];
  let n = 0;
  const kod = czekaj({
    pobierz: () => {
      const o = odpowiedzi[Math.min(n++, odpowiedzi.length - 1)];
      if (o instanceof Error) throw o;
      return o;
    },
    spij: () => {},
    pisz: (t) => log.push(t),
    sha: 'abcdef1234567',
    grace: 3,
    max: 5,
    ...opcje,
  });
  return { kod, log: log.join('\n'), pobran: n };
};

test('czekaj: zielony od razu → 0 i numer przebiegu w wyniku', () => {
  const wynik = [];
  const r = proba([[p(7, 'completed', 'success')]], { wynik: (k, v) => wynik.push([k, v]) });
  assert.equal(r.kod, 0);
  assert.match(r.log, /OK.*#7.*abcdef1/);
  assert.deepEqual(wynik, [['run', 7]]);
});

test('czekaj: trwający, potem zielony → 0 po kolejnym sprawdzeniu', () => {
  const r = proba([[p(8, 'in_progress')], [p(8, 'completed', 'success')]]);
  assert.equal(r.kod, 0);
  assert.equal(r.pobran, 2);
});

test('czekaj: czerwony → 1 z instrukcją; brak przebiegu → 1 po okresie łaski z instrukcją uruchomienia i ścieżką awaryjną', () => {
  const c = proba([[p(9, 'completed', 'failure')]]);
  assert.equal(c.kod, 1);
  assert.match(c.log, /::error::.*#9.*czerwony/);
  const b = proba([[]]);
  assert.equal(b.kod, 1);
  assert.equal(b.pobran, 3);
  assert.match(b.log, /::error::.*brak przebiegu.*Run workflow.*pomin_bramke_e2e/);
});

test('czekaj: trwający ponad limit → 1 (nie cicha zgoda); błąd API liczy się jako brak danych, nie jako zielony', () => {
  const t = proba([[p(5, 'queued')]]);
  assert.equal(t.kod, 1);
  assert.equal(t.pobran, 5);
  assert.match(t.log, /::error::.*limit czekania/);
  const e = proba([new Error('HTTP 502'), [p(6, 'completed', 'success')]]);
  assert.equal(e.kod, 0);
  const tylkoBledy = proba([new Error('HTTP 502')]);
  assert.equal(tylkoBledy.kod, 1);
});

test('czekaj: przejściowy błąd API w trakcie czekania nie kończy bramki (przegląd D-043 pkt 1); 3 błędy z rzędu → 1 z komunikatem o API', () => {
  const t = new Error('HTTP 502');
  const r = proba([[p(5, 'queued')], [p(5, 'queued')], [p(5, 'in_progress')], t, [p(5, 'completed', 'success')]], { grace: 2, max: 10 });
  assert.equal(r.kod, 0);
  const bledy = proba([[p(5, 'queued')], t, t, t, [p(5, 'completed', 'success')]], { grace: 2, max: 10 });
  assert.equal(bledy.kod, 1);
  assert.match(bledy.log, /::error::.*zapyta/);
  assert.doesNotMatch(bledy.log, /Run workflow/);
});

test('czekaj: brak po anulowanym przebiegu podaje jego numer (przegląd pkt 7)', () => {
  const r = proba([[p(11, 'completed', 'cancelled')]]);
  assert.equal(r.kod, 1);
  assert.match(r.log, /anulowany.*#11/);
});

test('liczbaZmiennej: brak → domyślna; nie liczba całkowita dodatnia → wyjątek (przegląd pkt 4)', () => {
  assert.equal(liczbaZmiennej({}, 'X', 60), 60);
  assert.equal(liczbaZmiennej({ X: '75' }, 'X', 60), 75);
  for (const z of ['abc', '0', '-1', '1.5', ' ']) assert.throws(() => liczbaZmiennej({ X: z }, 'X', 60), /X/, z);
});

// D-273 (szybsze E2E, wzór Trening e2e-ios.yml:21–25 i bramka-e2e.sh:3, odczyt 2026-11-08): przebieg z aplikacją zbudowaną w innym
// przebiegu (wejście aplikacja_z_przebiegu) testuje flowy na starszej aplikacji — nie dowodzi niczego o kodzie tego commitu.
test('ocen: zielony przebieg z aplikacją z innego przebiegu (tytuł z dopiskiem) nie otwiera bramki', () => {
  const obcy = { ...p(9, 'completed', 'success'), display_title: 'E2E iOS · aplikacja z innego przebiegu' };
  assert.deepEqual(ocen([obcy]), { stan: 'brak' });
  assert.deepEqual(ocen([obcy, { ...p(8, 'in_progress'), display_title: 'E2E iOS · aplikacja z innego przebiegu' }]), { stan: 'brak' });
  assert.deepEqual(ocen([obcy, { ...p(10, 'completed', 'success'), display_title: 'E2E iOS (symulator)' }]), { stan: 'ok', id: 10 });
});
