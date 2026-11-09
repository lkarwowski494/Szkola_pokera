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

test('testflight.yml: bramka E2E (D-170) przed buildem — zielony e2e-ios.yml na tym commicie albo awaryjne pominięcie z powodem', () => {
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
  const e2e = json('e2e-ios.yml').jobs.e2e['timeout-minutes'];
  assert.ok(czekanieMin >= e2e + 15, `czekanie ${czekanieMin} min < ${e2e} + 15`);
  assert.ok(b['timeout-minutes'] >= Math.ceil(czekanieMin) + 5, `timeout ${b['timeout-minutes']} < ${Math.ceil(czekanieMin)} + 5`);
});

// 08-F03 (D-233): sterownik XCTest po świeżym rozruchu symulatora startuje dłużej niż domyślny czas Maestro (2× „iOS driver not
// ready in time” przed pierwszym flowem: przebiegi 42415740308, 42422522419). Wzór Treningu: e2e-ios.yml:207 (480 s, odczyt 2026-11-08).
test('e2e-ios.yml: MAESTRO_DRIVER_STARTUP_TIMEOUT ≥ 480 000 ms dla obu przebiegów flowów, a limit zadania mieści czekanie na sterownik', () => {
  const w = json('e2e-ios.yml');
  const ms = Number(w.env?.MAESTRO_DRIVER_STARTUP_TIMEOUT);
  assert.ok(ms >= 480000, `MAESTRO_DRIVER_STARTUP_TIMEOUT = ${w.env?.MAESTRO_DRIVER_STARTUP_TIMEOUT}`);
  assert.ok(w.jobs.e2e['timeout-minutes'] * 60000 > ms, 'limit zadania krótszy niż czekanie na sterownik');
});

// Przebieg 42566410755 (sesja F, 2026-11-09): obie próby padły na kroku „Maestro” — `curl: (56) … 504` przy maestro.zip, flowy
// nieuruchomione. Instalacja ponawiana (sesja I); `pipefail`, bo domyślna powłoka kroku (`bash -e`) bez niego bierze kod `bash`
// z końca potoku, więc nieudane pobranie samego instalatora dałoby fałszywy sukces. Trening (e2e-ios.yml:194–203, odczyt
// 2026-11-09) instaluje bez ponowienia — odstępstwo nazwane.
test('e2e-ios.yml: krok „Maestro” ponawia instalację (pipefail, ≥ 3 próby, przerwa, błąd po ostatniej, sprzątanie przed ponowieniem)', () => {
  const krok = json('e2e-ios.yml').jobs.e2e.steps.find((k) => k.name === 'Maestro');
  assert.ok(krok, 'brak kroku „Maestro”');
  const run = krok.run;
  assert.match(run, /set -o pipefail/, 'bez pipefail');
  const m = /for proba in ((?:\d+ ?)+); do/.exec(run);
  assert.ok(m && m[1].trim().split(' ').length >= 3, 'brak pętli ≥ 3 prób');
  assert.match(run, /curl -fsSL https:\/\/get\.maestro\.mobile\.dev \| bash/, 'instalator nie w pętli');
  assert.match(run, /sleep /, 'bez przerwy między próbami');
  assert.match(run, /exit 1/, 'po ostatniej próbie brak błędu kroku');
  assert.match(run, /rm -rf "\$HOME\/\.maestro"/, 'bez sprzątania niepełnej instalacji');
  assert.match(run, /"\$HOME\/\.maestro\/bin\/maestro" --version/, 'bez sprawdzenia wersji po instalacji');
});

// D-273 (szybsze E2E jak w Treningu, e2e-ios.yml:21–25, 111–120, 154–163, odczyt 2026-11-08): przy zmianie samych flowów aplikacja
// z poprzedniego przebiegu zamiast budowania od nowa (~24 min mniej); artefakt aplikacji żyje 1 dzień.
test('e2e-ios.yml: wejście aplikacja_z_przebiegu pomija budowanie i pobiera aplikację z podanego przebiegu; każdy build zapisuje aplikację na 1 dzień', () => {
  const w = json('e2e-ios.yml');
  for (const wyz of ['workflow_dispatch', 'workflow_call']) assert.ok(w.on[wyz]?.inputs?.aplikacja_z_przebiegu, `${wyz}: brak wejścia`);
  assert.match(w['run-name'] ?? '', /inputs\.aplikacja_z_przebiegu != ''[^}]*aplikacja z innego przebiegu/, 'tytuł przebiegu z dopiskiem (czyta go bramka TestFlight)');
  assert.equal(w.permissions?.actions, 'read', 'pobranie artefaktu z innego przebiegu wymaga actions: read');
  const kroki = w.jobs.e2e.steps;
  const budowa = kroki.filter((k) => /prebuild|pod install|xcodebuild -workspace/.test(k.run ?? ''));
  assert.equal(budowa.length, 3, 'prebuild, pod install, xcodebuild');
  for (const k of budowa) assert.equal(k.if, "inputs.aplikacja_z_przebiegu == ''", k.name);
  const up = kroki.find((k) => k.uses?.startsWith('actions/upload-artifact') && k.with?.name === 'szkola-sim-app');
  assert.ok(up, 'brak zapisu aplikacji');
  assert.equal(up.with['retention-days'], 1);
  assert.equal(up.if, "inputs.aplikacja_z_przebiegu == ''");
  const down = kroki.find((k) => k.uses?.startsWith('actions/download-artifact'));
  assert.ok(down, 'brak pobrania aplikacji');
  assert.equal(down.if, "inputs.aplikacja_z_przebiegu != ''");
  assert.equal(down.with.name, 'szkola-sim-app');
  assert.equal(down.with['run-id'], '${{ inputs.aplikacja_z_przebiegu }}');
  assert.equal(down.with['github-token'], '${{ github.token }}');
  const iPobr = kroki.indexOf(down);
  const iSym = kroki.findIndex((k) => k.name === 'Symulator');
  assert.ok(iPobr < iSym, 'aplikacja pobrana przed instalacją w symulatorze');
  assert.ok(kroki.slice(iPobr + 1, iSym).some((k) => /unzip/.test(k.run ?? '') && /APP_PATH=/.test(k.run ?? '')), 'rozpakowanie i APP_PATH po pobraniu');
});

// Przegląd D-043 D-273 (P0): wywoływany workflow nie dostanie więcej uprawnień niż zadanie wywołujące — inaczej GitHub odrzuca
// cały przebieg wywołującego (nocny.yml bez żadnego zadania i bez zgłoszenia). Wzór Trening nightly.yml:39–41 (odczyt 2026-11-08).
test('wywołanie lokalnego workflowu: uprawnienia wywoływanego ⊆ uprawnienia zadania wywołującego', () => {
  const poziom = { none: 0, read: 1, write: 2 };
  for (const { n, d } of wf) {
    const w = d.toJSON();
    for (const [id, j] of Object.entries(w.jobs)) {
      if (!j.uses?.startsWith('./.github/workflows/')) continue;
      const ma = j.permissions ?? w.permissions ?? {};
      const chce = json(j.uses.split('/').pop()).permissions ?? {};
      for (const [k, v] of Object.entries(chce)) assert.ok((poziom[ma[k] ?? 'none'] ?? 0) >= poziom[v], `${n}: ${id}: ${j.uses} chce ${k}: ${v}, zadanie ma ${ma[k] ?? 'none'}`);
    }
  }
});
