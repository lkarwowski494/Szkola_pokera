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
    assert.equal(typeof w.permissions, 'object', `${n}: permissions jako mapa (nie write-all/read-all)`);
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

// D-342: pages.yml:deploy dostaje pages i id-token (wymóg actions/deploy-pages); reszta strażnika publikacji w strona.test.mjs.
const WRITE_ZADANIA = ['nocny.yml:zgloszenie:issues', 'pages.yml:deploy:pages', 'pages.yml:deploy:id-token'];
test('uprawnienia write na poziomie zadania: tylko issues w nocny.yml:zgloszenie oraz pages i id-token w pages.yml:deploy', () => {
  for (const { n, d } of wf) for (const [id, j] of Object.entries(d.toJSON().jobs)) {
    // przegląd D-043 (sesja U, P1): napis `write-all` dałby w Object.entries pojedyncze znaki i przeszedłby bez sygnału
    assert.ok(j.permissions === undefined || typeof j.permissions === 'object', `${n}:${id}: permissions jako mapa`);
    for (const [k, v] of Object.entries(j.permissions ?? {})) if (v === 'write') assert.ok(WRITE_ZADANIA.includes(`${n}:${id}:${k}`), `${n}:${id}:${k}`);
  }
});

// D-342: workflowy przekładu leżą na main (workflow_dispatch wymaga pliku na gałęzi domyślnej), a skrypty scripts/i18n tylko na gałęzi
// roboczej. Uruchomienie: `gh workflow run <plik> --ref <gałąź robocza>` — GitHub bierze wtedy workflow i checkout z tej gałęzi.
// Uruchomienie z main (bez skryptów) ma paść czytelnie przed pnpm install i przed krokiem z kluczem.
test('przekład i przegląd: checkout = ref uruchomienia, bez ref na sztywno; kontrola skryptu tuż po checkout, przed kluczem', () => {
  for (const [n, skrypt] of [['przeklad-tlumaczen.yml', 'scripts/i18n/przeklad-api.mjs'], ['przeglad-tlumaczen.yml', 'scripts/i18n/przeglad-api.mjs']]) {
    const w = json(n);
    assert.deepEqual(Object.keys(w.on), ['workflow_dispatch'], n);
    const kroki = Object.values(w.jobs)[0].steps;
    assert.equal(kroki[0].uses, 'actions/checkout@v5', n);
    assert.equal(kroki[0].with?.ref, undefined, `${n}: checkout ma brać ref uruchomienia (--ref)`);
    const k = kroki[1];
    assert.match(k.run ?? '', new RegExp(`\\[ ! -f ${skrypt.replace(/[./]/g, '\\$&')} \\]`), `${n}: brak kontroli skryptu`);
    assert.match(k.run, /--ref/, `${n}: komunikat ma podać --ref`);
    assert.match(k.run, /exit 1/, n);
    const iKlucz = kroki.findIndex((x) => x.env?.ANTHROPIC_API_KEY);
    assert.ok(iKlucz > 1, n);
    assert.equal(kroki.filter((x) => JSON.stringify(x).includes('secrets.')).length, 1, `${n}: sekret w jednym kroku`);
    // przegląd D-043 (sesja U, P2): jedno `secrets.` w całym pliku (także env zadania/workflowu), krok z kluczem tylko przy tryb=wyslij,
    // wejścia nigdy wklejone w powłokę
    const tekst = readFileSync(new URL(n, KAT), 'utf8');
    assert.equal((tekst.match(/secrets\./g) ?? []).length, 1, `${n}: secrets. poza krokiem z kluczem`);
    assert.equal(kroki[iKlucz].if, "inputs.tryb == 'wyslij'", n);
    for (const x of kroki) assert.doesNotMatch(x.run ?? '', /\$\{\{/, `${n}: ${x.name}: wyrażenie w run`);
  }
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
  // DT (2026-11-11, D-1020): build raz w zadaniu `build` (pomijanym wejściem aplikacja_z_przebiegu), flowy w zadaniu `e2e` (macierz części)
  assert.equal(w.jobs.build.if.includes("inputs.aplikacja_z_przebiegu == ''"), true, 'zadanie build pomijane, gdy aplikacja przychodzi z innego przebiegu');
  assert.equal(w.jobs.e2e.needs, 'build');
  const budowa = w.jobs.build.steps.filter((k) => /prebuild|pod install|xcodebuild -workspace/.test(k.run ?? ''));
  assert.equal(budowa.length, 3, 'prebuild, pod install, xcodebuild');
  const up = w.jobs.build.steps.find((k) => k.uses?.startsWith('actions/upload-artifact') && k.with?.name === 'szkola-sim-app');
  assert.ok(up, 'brak zapisu aplikacji');
  assert.equal(up.with['retention-days'], 1);
  const kroki = w.jobs.e2e.steps;
  const pobrania = kroki.filter((k) => k.uses?.startsWith('actions/download-artifact'));
  assert.equal(pobrania.length, 2, 'pobranie z innego przebiegu i z tego przebiegu');
  const down = pobrania.find((k) => k.with['run-id']);
  assert.ok(down, 'brak pobrania aplikacji');
  assert.equal(down.if, "inputs.aplikacja_z_przebiegu != ''");
  assert.equal(down.with.name, 'szkola-sim-app');
  assert.equal(down.with['run-id'], '${{ inputs.aplikacja_z_przebiegu }}');
  assert.equal(down.with['github-token'], '${{ github.token }}');
  const biezace = pobrania.find((k) => !k.with['run-id']);
  assert.equal(biezace.if, "inputs.aplikacja_z_przebiegu == ''");
  assert.equal(biezace.with.name, 'szkola-sim-app');
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

// Push samego tekstu sklepu (store/: metadane i notatki dla recenzenta, nie wchodzą do aplikacji) nie uruchamia E2E (~40 min
// runnera macOS bez sygnału). Odstępstwo od Treningu (e2e-ios.yml:20 bez store/**, odczyt 2026-11-09) nazwane w D-327.
test('e2e-ios.yml: push ignoruje store/** (obok docs/**, *.md, tests/**, .claude/**)', () => {
  const ignor = json('e2e-ios.yml').on.push['paths-ignore'];
  for (const w of ['docs/**', '**/*.md', 'tests/**', '.claude/**', 'store/**']) assert.ok(ignor.includes(w), w);
});

// K-12 (D-337): zrzuty sklepu tylko ręcznie (koszt minut macOS bez sygnału przy pushu), bez sekretów poza GITHUB_TOKEN do artefaktu.
test('store-screenshots.yml: tylko workflow_dispatch; rozmiary i ekrany z scripts/ci/zrzuty-sklepu.json; bez sekretów poza GITHUB_TOKEN', () => {
  const p = new URL('store-screenshots.yml', KAT);
  const wf = parseDocument(readFileSync(p, 'utf8')).toJSON();
  assert.deepEqual(Object.keys(wf.on), ['workflow_dispatch']);
  assert.equal(wf.on.workflow_dispatch.inputs.jezyki.default, 'pl,en');
  assert.equal(wf.on.workflow_dispatch.inputs.rozmiary.default, '6.9,6.3');
  const tekst = readFileSync(p, 'utf8');
  assert.deepEqual([...tekst.matchAll(/secrets\.(\w+)/g)].map((m) => m[1]).filter((s) => s !== 'GITHUB_TOKEN'), []);
  assert.match(tekst, /scripts\/ci\/zrzuty-sklepu\.sh/);
  assert.match(tekst, /scripts\/ci\/zrzuty-sklepu\.json/);
});

// D-348: workflowy App Store Connect z Treningu (asc-*.yml, 2e4b0f8, odczyt 2026-11-09). Na main leżą tylko pliki workflowów (rejestracja
// workflow_dispatch), skrypty i dane sklepu tylko na gałęzi roboczej — uruchomienie `--ref <gałąź robocza>`, z main pada przed kluczem (jak D-343).
// Odczyt domyślnie; zapis tylko w osobnym zadaniu w środowisku `release` po zadaniu odczytu i po sprawdzeniu, że `release` wymaga zatwierdzenia.
const ASC = { 'asc-metadane.yml': ['podglad', 'zapis', 'zapis'], 'asc-iap-localizations.yml': ['plan', 'apply', 'apply'], 'asc-zrzuty.yml': ['plan', 'zapis', 'apply'], 'asc-produkty.yml': ['plan', 'apply', 'apply'] }; // asc-produkty: D-356
const SEKRETY_ASC = ['ASC_ISSUER_ID', 'ASC_KEY_ID', 'ASC_KEY_P8'];
test('asc-*.yml: tylko ręcznie; skrypt z gałęzi roboczej przed kluczem; zapis tylko w zadaniu release po odczycie i po kontroli zatwierdzania; klucz usuwany zawsze', () => {
  for (const [n, [odczyt, zapis, tryb]] of Object.entries(ASC)) {
    const w = json(n); const tekst = readFileSync(new URL(n, KAT), 'utf8');
    assert.deepEqual(Object.keys(w.on), ['workflow_dispatch'], n);
    assert.deepEqual(Object.keys(w.jobs).sort(), [odczyt, zapis].sort(), n);
    assert.equal(w.jobs[odczyt].environment, undefined, `${n}: odczyt bez środowiska`);
    assert.equal(w.jobs[zapis].environment, 'release', n);
    assert.equal(w.jobs[zapis].needs, odczyt, n);
    assert.equal(w.jobs[zapis].if, `\${{ inputs.tryb == '${tryb}' }}`, n);
    assert.ok(w.on.workflow_dispatch.inputs.tryb.options[0] !== tryb && w.on.workflow_dispatch.inputs.tryb.default !== tryb, `${n}: domyślnie odczyt`);
    assert.deepEqual([...new Set([...tekst.matchAll(/secrets\.(\w+)/g)].map((m) => m[1]))].sort(), [...SEKRETY_ASC, ...(n === 'asc-zrzuty.yml' ? ['GITHUB_TOKEN'] : [])].sort(), n);
    for (const id of [odczyt, zapis]) {
      const k = w.jobs[id].steps; const ozn = `${n}:${id}`;
      assert.equal(k[0].uses, 'actions/checkout@v5', ozn); assert.equal(k[0].with?.ref, undefined, ozn); assert.equal(k[0].with?.['persist-credentials'], false, ozn);
      assert.match(k[1].run ?? '', /\[ ! -f scripts\/asc\/[\w-]+\.mjs \]/, `${ozn}: kontrola skryptu`); assert.match(k[1].run, /--ref/, ozn); assert.match(k[1].run, /exit 1/, ozn);
      const iKlucz = k.findIndex((x) => x.env?.ASC_KEY_P8);
      assert.ok(iKlucz > 1, ozn);
      assert.equal(k.filter((x) => x.env?.ASC_KEY_P8).length, 1, `${ozn}: klucz w jednym kroku`);
      assert.match(k[iKlucz].run, /RUNNER_TEMP\/AuthKey\.p8/, ozn); assert.match(k[iKlucz].run, /add-mask/, ozn);
      const ost = k.at(-1); assert.equal(ost.if, 'always()', ozn); assert.equal(ost.run.trim(), 'rm -f "$RUNNER_TEMP/AuthKey.p8"', ozn);
      for (const x of k) assert.doesNotMatch(x.run ?? '', /\$\{\{/, `${ozn}: ${x.name}: wyrażenie w run`);
      const skrypt = k.filter((x) => /node scripts\/asc\//.test(x.run ?? '')).map((x) => x.run).join('\n');
      if (id === odczyt) assert.doesNotMatch(skrypt, /--(zapis|apply)\b/, `${ozn}: odczyt bez trybu zapisu`);
      else assert.match(skrypt, /--(zapis|apply)\b/, ozn);
    }
    const kz = w.jobs[zapis].steps; const iStraz = kz.findIndex((x) => /environments\/release/.test(x.run ?? ''));
    assert.ok(iStraz > 1 && iStraz < kz.findIndex((x) => x.env?.ASC_KEY_P8), `${n}: kontrola zatwierdzania release przed kluczem`);
    assert.match(kz[iStraz].run, /required_reviewers/, n); assert.match(kz[iStraz].run, /exit 1/, n);
    assert.deepEqual(w.jobs[zapis].permissions, { contents: 'read', actions: 'read' }, `${n}: odczyt środowiska wymaga actions: read`);
    // przegląd D-043 sesji X (P2): artefakt zrzutów tylko z ręcznego przebiegu store-screenshots.yml, sprawdzone przed pobraniem
    if (n === 'asc-zrzuty.yml') for (const id of [odczyt, zapis]) {
      const k = w.jobs[id].steps; const iPob = k.findIndex((x) => x.uses?.startsWith('actions/download-artifact'));
      const iSpr = k.findIndex((x) => /actions\/runs\/\$RUN/.test(x.run ?? ''));
      assert.ok(iSpr > 1 && iSpr < iPob, `${n}:${id}: kontrola przebiegu przed pobraniem`);
      assert.match(k[iSpr].run, /store-screenshots\.yml workflow_dispatch/, n); assert.equal(k[iSpr].env.RUN, '${{ inputs.zrzuty_z_przebiegu }}', n);
    }
  }
});

// Przebiegi 42661188005, 42661194013, 42661200869 (2026-11-09): setup-node@v5 z `packageManager: pnpm` w package.json włącza pamięć pnpm
// („Unable to locate executable file: pnpm”) — także we wspólnym workflowie narzędzi, którego nie zmienimy z tego repo. Stąd w asc-*.yml
// `package-manager-cache: false`, a kontrola uruchamia narzędzie studia z checkoutu w przypiętym SHA (tylko odczyt, D-352).
test('asc-*.yml: setup-node bez pamięci menedżera pakietów (repo z packageManager: pnpm, kroki bez pnpm)', () => {
  for (const n of [...Object.keys(ASC), 'asc-kontrola.yml']) for (const [id, j] of Object.entries(json(n).jobs))
    for (const k of j.steps ?? []) if (k.uses?.startsWith('actions/setup-node')) assert.equal(k.with?.['package-manager-cache'], false, `${n}:${id}`);
});

// Przebiegi 42661899221, 42661904294, 42661910439 (2026-11-09): 401 NOT_AUTHORIZED przy wgranym kluczu. testflight.yml (zielony 37639316123)
// przepuszcza klucz przez scripts/ci/asc-check.mjs (przycięcie ID, naprawa wklejonego .p8, diagnoza 401/403) — asc-*.yml robią to samo.
test('asc-*.yml: klucz przez scripts/ci/asc-check.mjs jak testflight.yml; identyfikatory przycięte przed skryptem', () => {
  for (const n of [...Object.keys(ASC), 'asc-kontrola.yml']) for (const [id, j] of Object.entries(json(n).jobs)) {
    const k = j.steps ?? []; if (!k.length) continue;
    const klucz = k.find((x) => x.env?.ASC_KEY_P8);
    assert.ok(klucz.run.includes('OUT="$RUNNER_TEMP/AuthKey.p8" BUNDLE_ID=') && klucz.run.includes('node scripts/ci/asc-check.mjs'), `${n}:${id}: asc-check`);
    const skrypt = k.find((x) => /node (scripts\/asc|\.narzedzia-studia)\//.test(x.run ?? ''));
    for (const v of ['ASC_KEY_ID', 'ASC_ISSUER_ID']) assert.ok(skrypt.run.includes(`export ${v}="$(printf %s "$${v}" | tr -d '[:space:]')"`), `${n}:${id}:${v}`);
  }
});

test('asc-kontrola.yml: narzędzie studia z checkoutu w pełnym SHA, tylko odczyt; kontrola gałęzi przed kluczem; trzy sekrety; klucz usuwany zawsze', () => {
  const w = json('asc-kontrola.yml'); const tekst = readFileSync(new URL('asc-kontrola.yml', KAT), 'utf8');
  assert.deepEqual(Object.keys(w.on), ['workflow_dispatch']); assert.deepEqual(Object.keys(w.jobs), ['kontrola']);
  const k = w.jobs.kontrola.steps;
  assert.equal(k[0].uses, 'actions/checkout@v5'); assert.equal(k[0].with?.ref, undefined);
  assert.match(k[1].run, /\[ ! -f store\/asc-kontrola\.json \]/); assert.match(k[1].run, /--ref/); assert.match(k[1].run, /exit 1/);
  const n = k.find((x) => x.with?.repository === 'lkarwowski494/apps4brew-narzedzia');
  assert.match(n.with.ref, /^[0-9a-f]{40}$/); assert.equal(n.with.path, '.narzedzia-studia'); assert.equal(n.with['persist-credentials'], false);
  const iKlucz = k.findIndex((x) => x.env?.ASC_KEY_P8); assert.ok(iKlucz > 1);
  assert.match(k.find((x) => /kontrola\.mjs/.test(x.run ?? '')).run, /node \.narzedzia-studia\/asc-kontrola\/kontrola\.mjs --config store\/asc-kontrola\.json/);
  assert.deepEqual([...new Set([...tekst.matchAll(/secrets\.(\w+)/g)].map((m) => m[1]))].sort(), SEKRETY_ASC);
  assert.equal(k.at(-1).if, 'always()'); assert.match(k.at(-1).run, /rm -f "\$RUNNER_TEMP\/AuthKey\.p8"/);
  for (const x of k) assert.doesNotMatch(x.run ?? '', /\$\{\{/, x.name);
  assert.doesNotMatch(tekst, /environment:|--zapis|--apply/);
});

// DT (2026-11-11, D-1020…D-1023): podział E2E na części. Lista flowów przed i po identyczna (scripts/ci/e2e-podzial.test.mjs);
// tu: macierz części zgodna z argumentem M skryptu, zadanie zbiorcze i limity.
test('e2e-ios.yml: macierz części = argument M skryptu podziału; zadanie e2e-razem czeka na build i części i sprawdza „razem”', () => {
  const w = json('e2e-ios.yml');
  const m = w.jobs.e2e.strategy.matrix.czesc;
  assert.deepEqual(m, Array.from({ length: m.length }, (_, i) => i + 1));
  assert.equal(w.jobs.e2e.strategy['fail-fast'], false, 'część padnięta nie przerywa drugiej');
  const tekst = readFileSync(new URL('e2e-ios.yml', KAT), 'utf8');
  for (const [, n] of tekst.matchAll(/e2e-podzial\.mjs (?:sprawdz|czesc "\$CZESC") (\d+)/g)) assert.equal(Number(n), m.length, 'argument M skryptu podziału');
  assert.deepEqual([...w.jobs['e2e-razem'].needs].sort(), ['build', 'e2e']);
  assert.match(w.jobs['e2e-razem'].if, /always\(\)/, 'zbiorcze zadanie liczy się także przy padniętej części');
  assert.match(JSON.stringify(w.jobs['e2e-razem'].steps), /e2e-podzial\.mjs razem/);
});

// Cache buildu (D-1021/D-1022): klucz zależny od lockfile'a, bez zmiany wyniku buildu (CocoaPods i DerivedData tylko przyspieszają).
test('e2e-ios.yml: cache buildu (CocoaPods, DerivedData) z kluczem od pnpm-lock.yaml', () => {
  const kroki = json('e2e-ios.yml').jobs.build.steps.filter((k) => k.uses?.startsWith('actions/cache'));
  assert.equal(kroki.length, 2);
  for (const k of kroki) {
    assert.match(k.with.key, /hashFiles\([^)]*pnpm-lock\.yaml/);
    assert.match(k.with['restore-keys'], /hashFiles\([^)]*pnpm-lock\.yaml/);
  }
});
