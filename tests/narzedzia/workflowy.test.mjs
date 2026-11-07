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

// Kontrole krzyżowe semantyki Actions, których sam YAML nie złapie (przegląd D-043 nr 5): literówka w id kroku,
// `needs` do nieistniejącego zadania, `with` niezgodne z wejściami wywoływanego workflowu, niezamknięte `${{`.
const json = (n) => wf.find((w) => w.n === n).d.toJSON();

test('steps.<id> w wyrażeniach wskazuje krok z tym id w tym samym zadaniu', () => {
  for (const { n, d } of wf) for (const [id, j] of Object.entries(d.toJSON().jobs)) {
    const ids = new Set((j.steps ?? []).map((k) => k.id).filter(Boolean));
    for (const [, ref] of JSON.stringify(j).matchAll(/steps\.([\w-]+)\./g)) assert.ok(ids.has(ref), `${n}: ${id}: steps.${ref}`);
  }
});

test('needs wskazuje istniejące zadania', () => {
  for (const { n, d } of wf) {
    const jobs = d.toJSON().jobs;
    for (const [id, j] of Object.entries(jobs)) for (const x of [j.needs ?? []].flat()) assert.ok(x in jobs, `${n}: ${id} needs ${x}`);
  }
});

test('wywołanie lokalnego workflowu: klucze with ⊆ workflow_call.inputs', () => {
  for (const { n, d } of wf) for (const [id, j] of Object.entries(d.toJSON().jobs)) {
    if (!j.uses?.startsWith('./.github/workflows/')) continue;
    const wejscia = Object.keys(json(j.uses.split('/').pop()).on.workflow_call?.inputs ?? {});
    for (const k of Object.keys(j.with ?? {})) assert.ok(wejscia.includes(k), `${n}: ${id}: with.${k} nie ma w ${j.uses}`);
  }
});

test('każde ${{ ma zamykające }}', () => {
  for (const { n } of wf) {
    const t = readFileSync(new URL(n, KAT), 'utf8');
    assert.equal((t.match(/\$\{\{/g) ?? []).length, (t.match(/\}\}/g) ?? []).length, n);
  }
});

test('uprawnienia write na poziomie zadania: tylko issues w nocny.yml:zgloszenie', () => {
  for (const { n, d } of wf) for (const [id, j] of Object.entries(d.toJSON().jobs))
    for (const [k, v] of Object.entries(j.permissions ?? {})) if (v === 'write') assert.equal(`${n}:${id}:${k}`, 'nocny.yml:zgloszenie:issues');
});

test('nocny.yml: grupy mutacji poker-core obejmują każdy plik src/ (bez bots.ts) dokładnie raz', () => {
  const grupy = json('nocny.yml').jobs.mutacje.strategy.matrix.include.filter((g) => g.pakiet === 'poker-core');
  const pliki = grupy.flatMap((g) => g.pliki.split(' '));
  const src = readdirSync(new URL('../../packages/poker-core/src/', import.meta.url)).filter((f) => f.endsWith('.ts') && f !== 'bots.ts');
  assert.deepEqual([...pliki].sort(), [...src].sort());
});

test('testflight.yml: bramka E2E (D-170) przed buildem — zielony e2e.yml na tym commicie albo awaryjne pominięcie z powodem', () => {
  const t = json('testflight.yml');
  const wej = t.on.workflow_dispatch?.inputs ?? {};
  assert.equal(wej.pomin_bramke_e2e?.type, 'boolean');
  assert.equal(wej.pomin_bramke_e2e?.default, false);
  assert.ok('powod' in wej);
  const b = t.jobs.bramka;
  assert.ok(b, 'brak zadania bramka');
  assert.equal(b['runs-on'], 'ubuntu-latest', 'czekanie na E2E nie może zużywać minut macOS');
  assert.deepEqual(b.permissions, { contents: 'read', actions: 'read' });
  const kroki = b.steps.map((s) => s.run ?? '').join('\n');
  assert.match(kroki, /node scripts\/ci\/bramka-e2e\.mjs/);
  assert.match(kroki, /POMIN.*true[\s\S]*-n "\$\{POWOD[^"]*"[\s\S]*exit 1/, 'pominięcie bez powodu ma paść');
  assert.match(kroki, /GITHUB_STEP_SUMMARY/, 'powód pominięcia trafia do podsumowania');
  const nb = [t.jobs.build.needs].flat();
  assert.ok(nb.includes('bramka'), 'build musi czekać na bramkę');
  // obejścia (przegląd D-043 pkt 2): build mimo czerwonej bramki, wartość wejścia wklejona w powłokę
  assert.equal(t.jobs.build.if, undefined, 'build z if: (always()/!cancelled()) ruszyłby mimo czerwonej bramki');
  assert.equal(b['continue-on-error'], undefined);
  for (const k of b.steps) assert.equal(k['continue-on-error'], undefined, k.name);
  assert.doesNotMatch(kroki, /\$\{\{\s*inputs\./, 'wejścia tylko przez env');
  const env = Object.assign({}, ...b.steps.map((k) => k.env ?? {}));
  assert.equal(env.POWOD, '${{ inputs.powod }}');
  assert.equal(env.GH_TOKEN, '${{ github.token }}');
  assert.match(kroki, /\$\{POWOD\/\/\[\[:space:\]\]\/\}/, 'powód z samych spacji ma paść');
  const krokBramki = b.steps.find((k) => /bramka-e2e\.mjs/.test(k.run ?? ''));
  assert.equal(b.outputs?.numer_e2e, `\${{ steps.${krokBramki.id}.outputs.run }}`, 'numer zielonego przebiegu E2E jako wynik zadania');
});

test('testflight.yml: czekanie bramki ≥ limit E2E + 15 min kolejki, a limit zadania bramki ≥ czekanie + 5 min (rośnie z liczbą flowów)', () => {
  const b = json('testflight.yml').jobs.bramka;
  const env = Object.assign({}, ...b.steps.map((s) => s.env ?? {}));
  const czekanieMin = (Number(env.BRAMKA_MAX_POLLS) * Number(env.BRAMKA_POLL_SEC)) / 60;
  const e2e = json('e2e.yml').jobs.e2e['timeout-minutes'];
  assert.ok(czekanieMin >= e2e + 15, `czekanie ${czekanieMin} min < ${e2e} + 15`);
  assert.ok(b['timeout-minutes'] >= Math.ceil(czekanieMin) + 5, `timeout ${b['timeout-minutes']} < ${Math.ceil(czekanieMin)} + 5`);
});
