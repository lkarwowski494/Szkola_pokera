// K-12 (D-337): dane pokazowe i lista ekranów zrzutów sklepu — bez symulatora.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { DatabaseSync } from 'node:sqlite';
import { CHWILA, LEKCJI_PRZECZYTANYCH, lekcjeWKolejnosci, zbudujDanePokazowe } from './dane-pokazowe.mjs';

const ROOT = new URL('../..', import.meta.url).pathname;
const lista = JSON.parse(readFileSync(new URL('./zrzuty-sklepu.json', import.meta.url), 'utf8'));

test('dane pokazowe: postep.db z migracjami aplikacji, ukończone powitanie, język i przeczytana teoria pierwszych lekcji', async () => {
  const kat = mkdtempSync(join(tmpdir(), 'zrzuty-'));
  const w = await zbudujDanePokazowe(kat, 'en');
  assert.equal(w.lekcje.length, LEKCJI_PRZECZYTANYCH);
  assert.deepEqual(w.lekcje, lekcjeWKolejnosci().slice(0, LEKCJI_PRZECZYTANYCH));
  assert.equal(w.lekcje[0], 'm0.l1');
  const db = new DatabaseSync(join(kat, 'postep.db'), { readOnly: true });
  const ust = Object.fromEntries(db.prepare('SELECT klucz, wartosc FROM ustawienie').all().map((r) => [r.klucz, JSON.parse(r.wartosc)]));
  assert.deepEqual(ust.punkt_startu, { modulId: 'm0', ustawionoMs: CHWILA });
  assert.equal(ust.jezyk, 'en');
  assert.equal(db.prepare('SELECT count(*) AS n FROM postep_lekcji').get().n, LEKCJI_PRZECZYTANYCH);
  assert.equal(db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
  db.close();
  await assert.rejects(zbudujDanePokazowe(kat, 'en'), /już istnieje/, 'nie nadpisuje istniejącej bazy');
});

test('lista ekranów: każda trasa ma plik w apps/mobile/src/app (expo-router), nazwy unikalne, rozmiary 6,9″ i 6,3″', () => {
  const trasy = [...lista.ekrany, ...lista.przeglad];
  assert.equal(new Set(trasy.map((e) => e.nazwa)).size, trasy.length);
  for (const { trasa } of trasy) {
    const s = trasa.replace(/^\//, '');
    const kandydaci = s === '' ? ['(tabs)/index.tsx'] : [`${s}.tsx`, `(tabs)/${s}.tsx`, `${s.replace(/\/[^/]+$/, '/[id]')}.tsx`];
    assert.ok(kandydaci.some((k) => existsSync(join(ROOT, 'apps/mobile/src/app', k))), `trasa ${trasa}: brak pliku (${kandydaci.join(', ')})`);
  }
  assert.deepEqual(Object.keys(lista.rozmiary), ['6.9', '6.3']);
  const lekcje = lekcjeWKolejnosci();
  for (const { trasa } of trasy.filter((e) => e.trasa.startsWith('/lesson/'))) assert.ok(lekcje.includes(trasa.split('/').pop()), `${trasa}: nieznana lekcja`);
});
