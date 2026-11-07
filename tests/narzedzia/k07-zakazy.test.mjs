// Testy skanera K-07 (node --test, główny zestaw): każda reguła łapie użycie, pomija komentarz i działa w swoim zakresie ścieżek.
// Wyrocznia: lista zakazów z docs/architektura/kontrole-07.md (K-07) i D-174.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { REGULY, bezKomentarzy, skanuj } from './k07-zakazy.mjs';

const plik = (sciezka, tekst) => ({ sciezka, tekst });
const reguly = (pliki) => skanuj(pliki).map((t) => t.regula);
const K = 'apps/mobile/src/features/x.ts';

test('każdy zakaz z K-07 i D-174 ma regułę i łapie przykład użycia', () => {
  const przyklady = {
    'insert-or-replace': ["await db.runAsync('INSERT OR REPLACE INTO karta VALUES (?)', [1]);", 'db.run(`replace  into t values (1)`)'],
    'exclusive-transaction': ['await db.withExclusiveTransactionAsync(async (tx) => {});'],
    'execAsync-szablon': ['await db.execAsync(`DELETE FROM t WHERE id = ${id}`);', 'await db.execAsync(\n  `UPDATE t\n   SET a = ${a}`);'],
    'pusty-catch': ['try { x(); } catch {}', 'try { x(); } catch (e) {}', 'try { x(); } catch (_e) { /* cicho */ }', 'try { x(); } catch {\n  // nic\n}'],
    sentry: ["import * as Sentry from '@sentry/react-native';"],
    'expo-observe': ["export { ObserveRoot } from 'expo-observe';"],
    iapkit: ['await verifyPurchaseWithProvider(p);', 'const k = kitApi();', "import { x } from 'iapkit';"],
    'token-push': ['await Notifications.getExpoPushTokenAsync();', 'await Notifications.getDevicePushTokenAsync();'],
    'zadania-w-tle': ["import * as BackgroundTask from 'expo-background-task';", "import * as TaskManager from 'expo-task-manager';"],
    forceOverwrite: ["await SQLite.importDatabaseFromAssetAsync('t.db', { assetId, forceOverwrite: true });"],
    'siec': ['await fetch(url);', 'const r = await fetch (url)', 'new XMLHttpRequest()', 'new WebSocket(u)', "import axios from 'axios';", 'new EventSource(u)'],
  };
  assert.deepEqual(Object.keys(przyklady).sort(), REGULY.map((r) => r.id).filter((id) => !['setInterval-domena', 'getEachAsync'].includes(id)).sort());
  for (const [id, lista] of Object.entries(przyklady)) for (const t of lista) assert.deepEqual([...new Set(reguly([plik(K, t)]))], [id], `${id}: ${t}`);
});

test('dozwolone użycia nie są trafieniem', () => {
  for (const t of [
    "await db.runAsync('INSERT INTO karta VALUES (?) ON CONFLICT(rodzina_id) DO UPDATE SET termin_ms = excluded.termin_ms', [1]);",
    "await db.execAsync('PRAGMA foreign_keys = ON');",
    'await db.execAsync(`CREATE TABLE t (a INTEGER)`);',
    'await db.withTransactionAsync(async () => {});',
    'try { x(); } catch (e) { log(e); }',
    'const replaceInto = 1; s.replace(/a/g, "b");',
    'const prefetch = 1; refetch(); myfetcher();',
    '{ assetSource: { assetId, forceOverwrite: false } }',
  ]) assert.deepEqual(reguly([plik(K, t)]), [], t);
});

test('komentarz nie jest użyciem; napis z SQL jest; „//” w napisie nie ucina linii', () => {
  assert.deepEqual(reguly([plik(K, '// nie używamy INSERT OR REPLACE (zasada 10)\n/* ani @sentry/react-native */\nconst a = 1;')]), []);
  assert.deepEqual(reguly([plik(K, "const u = 'https://example.org'; db.run('REPLACE INTO t VALUES (1)');")]), ['insert-or-replace']);
  assert.deepEqual(reguly([plik(K, 'const r = /["\']/; db.run(\'INSERT OR REPLACE INTO t VALUES (1)\');')]), ['insert-or-replace']);
  // regex z cudzysłowem nie przenosi stanu „w napisie” na kolejne linie
  assert.deepEqual(reguly([plik(K, 'const r = /["]/;\nawait fetch(u);')]), ['siec']);
  assert.deepEqual(reguly([plik(K, 'const r = /["]/;\n// fetch(u) tylko w komentarzu\nconst a = 1;')]), []);
  assert.equal(bezKomentarzy('a // b\nc /* d\ne */ f').split('\n').length, 3); // numery linii zachowane
});

test('numer linii i ścieżka trafienia', () => {
  const [t] = skanuj([plik(K, 'const a = 1;\n\nimport x from "axios";')]);
  assert.deepEqual({ regula: t.regula, sciezka: t.sciezka, linia: t.linia }, { regula: 'siec', sciezka: K, linia: 3 });
});

test('zakres ścieżek: setInterval tylko w domenie, getEachAsync i sieć poza swoimi adapterami', () => {
  assert.deepEqual(reguly([plik('packages/domena/src/limit.ts', 'setInterval(f, 1000);')]), ['setInterval-domena']);
  assert.deepEqual(reguly([plik('apps/mobile/src/features/timer.ts', 'setInterval(f, 1000);')]), []);
  assert.deepEqual(reguly([plik('packages/postep/src/eksport.ts', 'await db.getEachAsync(sql);')]), []);
  assert.deepEqual(reguly([plik('apps/mobile/src/data/postepExpo.ts', 'await db.getEachAsync(sql);')]), []);
  assert.deepEqual(reguly([plik('apps/mobile/src/data/postepExpo2.ts', 'await db.getEachAsync(sql);')]), ['getEachAsync']);
  assert.deepEqual(reguly([plik('apps/mobile/src/data/postepExpo.tsx', 'await db.getEachAsync(sql);')]), ['getEachAsync']); // wyjątek to jeden plik
  assert.deepEqual(reguly([plik('apps/mobile/src/features/lista.ts', 'await db.getEachAsync(sql);')]), ['getEachAsync']);
  assert.deepEqual(reguly([plik('apps/mobile/src/platform/zakupy.ts', 'await fetch(u);')]), []);
  assert.deepEqual(reguly([plik('apps/mobile/src/platformy/x.ts', 'await fetch(u);')]), ['siec']);
  assert.deepEqual(reguly([plik('packages/postep/src/x.ts', 'await fetch(u);')]), ['siec']);
});

test('pliki JSON skanowane bez usuwania komentarzy (zależność i wtyczka Sentry)', () => {
  assert.deepEqual(reguly([plik('apps/mobile/package.json', '{ "dependencies": { "@sentry/react-native": "~7.11.0", "expo-task-manager": "1" } }')]), ['sentry', 'zadania-w-tle']);
  assert.deepEqual(reguly([plik('apps/mobile/app.json', '{ "plugins": [["@sentry/react-native/expo", { "url": "https://de.sentry.io/" }]] }')]), ['sentry']);
});
