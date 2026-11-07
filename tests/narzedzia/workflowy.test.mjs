// Kontrola workflowów bez GitHuba (rola 07 E3, D-190): składnia YAML i zasady z strategia.md §5 — błąd składni
// (np. niecytowane `:all:`) albo zadanie bez limitu czasu wychodzi przy `pnpm run ci`, nie dopiero po pushu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { parseDocument } from 'yaml';

const KAT = new URL('../../.github/workflows/', import.meta.url);
const wf = readdirSync(KAT).filter((f) => f.endsWith('.yml')).map((n) => ({ n, d: parseDocument(readFileSync(new URL(n, KAT), 'utf8')) }));

test('każdy workflow parsuje się bez błędów', () => {
  for (const { n, d } of wf) assert.deepEqual(d.errors.map((e) => e.message), [], n);
});

test('każde zadanie ma timeout-minutes (domyślne 360 min to koszt bez sygnału) albo wywołuje workflow (uses)', () => {
  for (const { n, d } of wf) for (const [id, j] of Object.entries(d.toJSON().jobs)) assert.ok(j.uses || Number.isInteger(j['timeout-minutes']), `${n}: ${id}`);
});

test('domyślne uprawnienia tylko do odczytu; issues: write wyłącznie w zadaniu zgłoszenia nocnego', () => {
  for (const { n, d } of wf) {
    const w = d.toJSON();
    assert.equal(w.permissions?.contents, 'read', `${n}: permissions.contents`);
    for (const [k, v] of Object.entries(w.permissions)) if (k !== 'contents') assert.notEqual(v, 'write', `${n}: ${k}: write na poziomie workflowu`);
    for (const [id, j] of Object.entries(w.jobs)) if (j.permissions?.issues === 'write') assert.equal(`${n}:${id}`, 'nocny.yml:zgloszenie');
  }
});

test('akcje przypięte do wersji głównej albo SHA, workflowy lokalne przez ./', () => {
  for (const { n, d } of wf) for (const m of JSON.stringify(d.toJSON()).matchAll(/"uses":"([^"]+)"/g))
    assert.match(m[1], /^(\.\/\.github\/workflows\/[\w-]+\.yml|[\w.-]+\/[\w.-]+(\/[\w.-]+)*@(v\d+|[0-9a-f]{40}))$/, `${n}: ${m[1]}`);
});

test('harmonogramy poza pełną godziną (kolejka GitHuba)', () => {
  for (const { n, d } of wf) for (const s of d.toJSON().on?.schedule ?? []) assert.notEqual(s.cron.split(' ')[0], '0', `${n}: ${s.cron}`);
});
