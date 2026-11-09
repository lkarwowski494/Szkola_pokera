// Kontrola flowów Maestro bez Maestro (rola 07 E3, D-189): klasa błędu JAK-E0-01 (flow z tekstem, którego nie ma) i
// literówki w zmiennych/ścieżkach wychodzą w Node przy każdym `pnpm run ci`, a nie dopiero na runnerze macOS.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAllDocuments } from 'yaml';

const E2E = join(dirname(fileURLToPath(import.meta.url)), '../../apps/mobile/e2e');
const flowy = (kat) => readdirSync(kat).flatMap((f) => (statSync(join(kat, f)).isDirectory() ? flowy(join(kat, f)) : f.endsWith('.yaml') ? [join(kat, f)] : []));
const wszystkie = flowy(E2E).filter((f) => !f.endsWith('config.yaml'));

function zmienneEnv() {
  const wyjscie = execFileSync(process.execPath, [join(E2E, 'helplines-env.mjs')], { encoding: 'utf8' }).split('\n');
  const env = new Map();
  for (let i = 0; i < wyjscie.length; i++) if (wyjscie[i] === '-e') {
    const [k, ...v] = wyjscie[i + 1].split('=');
    env.set(k, v.join('='));
  }
  return env;
}

test('każdy flow to poprawny YAML (nagłówek + kroki)', () => {
  assert.ok(wszystkie.length >= 9, `flowów: ${wszystkie.length}`);
  for (const f of wszystkie) {
    const docs = parseAllDocuments(readFileSync(f, 'utf8'));
    for (const d of docs) assert.deepEqual(d.errors, [], relative(E2E, f));
    const kroki = docs.at(-1).toJSON();
    assert.ok(Array.isArray(kroki), `${relative(E2E, f)}: ostatni dokument to lista kroków`);
    sprawdzKroki(kroki, relative(E2E, f));
  }
});

// Krok Maestro to nazwa polecenia (napis) albo mapa z jednym kluczem; złe wcięcie daje poprawny YAML z dwoma kluczami.
function sprawdzKroki(kroki, gdzie) {
  for (const [i, k] of kroki.entries()) {
    if (typeof k === 'string') continue;
    assert.ok(k && typeof k === 'object' && Object.keys(k).length === 1, `${gdzie}: krok ${i + 1} ma klucze ${JSON.stringify(Object.keys(k ?? {}))}`);
    const arg = Object.values(k)[0];
    if (arg && Array.isArray(arg.commands)) sprawdzKroki(arg.commands, `${gdzie} › ${Object.keys(k)[0]}`);
  }
}

test('każda zmienna ${…} we flowach ma niepustą wartość z helplines-env.mjs', () => {
  const env = zmienneEnv();
  for (const f of wszystkie) for (const [, k] of readFileSync(f, 'utf8').matchAll(/\$\{(\w+)\}/g)) {
    assert.ok(env.has(k), `${relative(E2E, f)}: brak zmiennej ${k} w helplines-env.mjs`);
    assert.notEqual(env.get(k).trim(), '', `${relative(E2E, f)}: pusta zmienna ${k} (dopasowałaby pusty tekst)`);
  }
});

test('każdy runFlow wskazuje istniejący plik (ścieżka względem flowu)', () => {
  for (const f of wszystkie) for (const [, p] of readFileSync(f, 'utf8').matchAll(/runFlow:\s*([^\s{][^\n]*\.yaml)/g))
    assert.ok(existsSync(join(dirname(f), p.trim())), `${relative(E2E, f)}: runFlow ${p}`);
});

test('config.yaml uruchamia tylko flowy z katalogu głównego (oczekujace/ poza bramką, D-189)', () => {
  const konf = parseAllDocuments(readFileSync(join(E2E, 'config.yaml'), 'utf8'))[0].toJSON();
  assert.deepEqual(konf.flows, ['*.yaml']);
  assert.ok(wszystkie.some((f) => f.includes('/oczekujace/')));
});

// D-258 (08-F14): stały składnik 20 → 30 min (build SDK 58 na runnerze 28 min 46 s, przebieg 42485850361).
test('e2e-ios.yml: timeout-minutes = 30 + 3 × liczba flowów w bramce + 10 (strategia.md §5.1, D-258)', () => {
  const wf = readFileSync(join(E2E, '../../../.github/workflows/e2e-ios.yml'), 'utf8');
  const w = wf.match(/^\s+timeout-minutes:\s*(\d+)/m);
  const n = readdirSync(E2E).filter((f) => f.endsWith('.yaml') && f !== 'config.yaml').length;
  assert.equal(Number(w?.[1]), 30 + 3 * n + 10, `flowów w bramce: ${n}`);
});

// Flow 02 w przebiegu 42508961244: dwa cele pod tym samym tekstem („Powtórki” na „Dziś” i zakładka) — flow stuka po id.
// Literówka w id daje na runnerze „not found” po ~45 min; tu wychodzi w Node. Id ze wzorca (`lesson-${l.id}`) liczy się po przedrostku.
test('każde id we flowach bramki ma testID w kodzie aplikacji (apps/mobile/src)', () => {
  const zrodla = (kat) => readdirSync(kat).flatMap((f) => (statSync(join(kat, f)).isDirectory() ? zrodla(join(kat, f)) : /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) ? [join(kat, f)] : []));
  const kod = zrodla(join(E2E, '../src')).map((f) => readFileSync(f, 'utf8')).join('\n');
  const stale = new Set([...kod.matchAll(/testID=(?:"([^"]+)"|\{?'([^']+)'\}?)/g)].map((m) => m[1] ?? m[2]));
  const przedrostki = [...kod.matchAll(/testID=\{`([^`$]*)\$\{/g)].map((m) => m[1]).filter(Boolean);
  const bramka = wszystkie.filter((f) => !f.includes('/oczekujace/'));
  let ile = 0;
  for (const f of bramka) for (const [, , id] of readFileSync(f, 'utf8').matchAll(/\bid:\s*(['"])([^'"]+)\1/g)) {
    ile++;
    assert.ok(stale.has(id) || przedrostki.some((p) => id.startsWith(p)), `${relative(E2E, f)}: id '${id}' bez testID w apps/mobile/src`);
  }
  assert.ok(ile >= 10, `sprawdzonych id: ${ile}`);
});

// D-353 (rola 09, E2E 42651521831): od wydania en (D-349) aplikacja w trybie „Jak w telefonie” wybiera język z telefonu, a
// symulator CI ma język en — flowy z polskimi asercjami padały. Każde uruchomienie aplikacji we flowie ustala język telefonu
// argumentem `-AppleLanguages (<język>)` (Maestro 2.11.0: `launchApp.arguments` → `xcrun simctl launch … -klucz wartość`,
// maestro-ios-driver IOSLaunchArguments.kt:5–20), także ponowne uruchomienie bez clearState (tryb „auto” czyta telefon od nowa).
test('każdy launchApp we flowach ustala język telefonu (arguments.AppleLanguages = (pl) albo (en), D-353)', () => {
  const uruchomienia = (kroki, gdzie, w = []) => {
    for (const k of kroki) {
      if (k === 'launchApp') w.push({ gdzie, arg: null });
      if (!k || typeof k !== 'object') continue;
      if ('launchApp' in k) w.push({ gdzie, arg: k.launchApp });
      const arg = Object.values(k)[0];
      if (arg && Array.isArray(arg.commands)) uruchomienia(arg.commands, gdzie, w);
    }
    return w;
  };
  let ile = 0;
  for (const f of wszystkie) {
    const kroki = parseAllDocuments(readFileSync(f, 'utf8')).at(-1).toJSON();
    for (const { gdzie, arg } of uruchomienia(kroki, relative(E2E, f))) {
      ile++;
      assert.match(String(arg?.arguments?.AppleLanguages), /^\((pl|en)\)$/, `${gdzie}: launchApp bez arguments.AppleLanguages`);
    }
  }
  assert.ok(ile >= 12, `uruchomień: ${ile}`);
});

test('K7 (plan-09): flow drugiego języka 08-drugi-jezyk.yaml w bramce, startuje z telefonem en', () => {
  const f = join(E2E, '08-drugi-jezyk.yaml');
  assert.ok(existsSync(f), 'brak apps/mobile/e2e/08-drugi-jezyk.yaml');
  assert.ok(!existsSync(join(E2E, 'oczekujace/08-drugi-jezyk.yaml')), 'flow 08 nadal w oczekujace/');
  const kroki = parseAllDocuments(readFileSync(f, 'utf8')).at(-1).toJSON();
  assert.equal(kroki[0]?.launchApp?.arguments?.AppleLanguages, '(en)');
});
