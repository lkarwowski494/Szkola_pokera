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
test('każde id we flowach (bramka i oczekujace/) ma testID w kodzie aplikacji (apps/mobile/src)', () => {
  const zrodla = (kat) => readdirSync(kat).flatMap((f) => (statSync(join(kat, f)).isDirectory() ? zrodla(join(kat, f)) : /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) ? [join(kat, f)] : []));
  const kod = zrodla(join(E2E, '../src')).map((f) => readFileSync(f, 'utf8')).join('\n');
  const stale = new Set([...kod.matchAll(/testID=(?:"([^"]+)"|\{?'([^']+)'\}?)/g)].map((m) => m[1] ?? m[2]));
  const przedrostki = [...kod.matchAll(/testID=\{`([^`$]*)\$\{/g)].map((m) => m[1]).filter(Boolean);
  // CZ (krok J): także flowy oczekujące, żeby flow przenoszony do bramki nie czekał ~45 min na runnerze na „not found”
  let ile = 0;
  for (const f of wszystkie) for (const [, , id] of readFileSync(f, 'utf8').matchAll(/\bid:\s*(['"])([^'"]+)\1/g)) {
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

test('Z2 (E2E 42800500800): „Nie wiem” na pytaniu ze stołem jest pod ekranem, więc każde jego assertVisible/tapOn poprzedza scrollUntilVisible', () => {
  for (const plik of wszystkie.filter((f) => readFileSync(f, 'utf8').includes('Nie wiem'))) {
    const [, kroki] = parseAllDocuments(readFileSync(plik, 'utf8')).map((d) => d.toJS());
    kroki.forEach((krok, i) => {
      const asercja = krok && typeof krok === 'object' && (krok.assertVisible === 'Nie wiem' || krok.tapOn === 'Nie wiem');
      if (!asercja) return;
      const poprzedni = kroki[i - 1];
      assert.ok(poprzedni?.scrollUntilVisible?.element === 'Nie wiem', `${relative(E2E, plik)}, krok ${i + 1}: brak scrollUntilVisible 'Nie wiem' bezpośrednio przed`);
    });
  }
});

// Recenzja BL @ 5f17558 (08-programista-001, WYSOKIE): po D-542 tekst wstępu listy lekcji (`learn.intro`, „No-Limit Hold’em od
// zera…”) renderuje tylko zakładka, której plik w app/(tabs)/ go używa (dziś: „Lekcje”). Flow, który czeka na ten tekst na
// „Dziś” (zaraz po powitaniu), pada na runnerze po 30 s, a bramka TestFlight czeka na zielony e2e-ios.yml (D-170).
// Kontrola: każde extendedWaitUntil/assertVisible z tym tekstem stoi po przejściu na zakładkę, która go renderuje.
test('tekst wstępu listy lekcji (learn.intro) sprawdzany we flowach tylko na zakładce, która go renderuje (D-542)', () => {
  const SRC = join(E2E, '../src');
  const pl = JSON.parse(readFileSync(join(SRC, 'i18n/locales/pl.json'), 'utf8'));
  const poczatek = pl.learn.intro.split('.')[0]; // „No-Limit Hold’em od zera”
  const ZAKLADKI = { index: { id: 'zakladka-dzis', tekst: pl.tabs.today }, lessons: { id: 'zakladka-lekcje', tekst: pl.tabs.lessons }, progress: { id: 'zakladka-postep', tekst: pl.tabs.progress } };
  const renderuja = Object.keys(ZAKLADKI).filter((z) => {
    const p = join(SRC, 'app/(tabs)', `${z}.tsx`);
    return existsSync(p) && readFileSync(p, 'utf8').includes("t('learn.intro')");
  });
  assert.ok(renderuja.length > 0, 'żadna zakładka nie renderuje learn.intro');
  const bledy = [];
  for (const f of wszystkie.filter((x) => !x.includes('/oczekujace/') && !x.includes('/wspolne/'))) {
    const kroki = parseAllDocuments(readFileSync(f, 'utf8')).at(-1).toJSON();
    let zakladka = 'index'; // po launchApp i powitaniu aplikacja stoi na „Dziś”
    kroki.forEach((k, i) => {
      if (k === 'launchApp' || (k && typeof k === 'object' && ('launchApp' in k || 'runFlow' in k))) zakladka = 'index';
      if (!k || typeof k !== 'object') return;
      const tap = k.tapOn;
      if (tap !== undefined) for (const [z, { id, tekst }] of Object.entries(ZAKLADKI)) if ((typeof tekst === 'string' && tap === tekst) || (tap && typeof tap === 'object' && tap.id === id)) zakladka = z;
      const cel = k.extendedWaitUntil?.visible ?? k.assertVisible;
      const tekstCelu = typeof cel === 'string' ? cel : cel?.text;
      if (typeof tekstCelu === 'string' && tekstCelu.startsWith(poczatek) && !renderuja.includes(zakladka))
        bledy.push(`${relative(E2E, f)}, krok ${i + 1}: czeka na „${tekstCelu}” na zakładce ${zakladka}.tsx, a tekst renderuje tylko ${renderuja.join(', ')}.tsx`);
    });
  }
  assert.deepEqual(bledy, []);
});

// CZ (krok J, plan scenariusze-plan.md:73): flow 07 przygotowuje stan sam (D-647: szablon modułu odblokowany po lekcji tego
// modułu) i zakłada, że pas na flopie poziomu łatwego jest błędem. Obie przesłanki wynikają z treści, więc zmiana treści
// (inny moduł szablonu, inna pierwsza lekcja, inna oczekiwana akcja) psuje ten test w Node, a nie dopiero przebieg na runnerze.
test('07-scenariusz.yaml: szablon z flowu istnieje, flow kończy pierwszą lekcję jego modułu, a pas jest na łatwym błędem', () => {
  const tekst = readFileSync(join(E2E, 'oczekujace/07-scenariusz.yaml'), 'utf8');
  const id = tekst.match(/id:\s*'scenariusz-([\w-]+)'/)?.[1];
  assert.ok(id, 'flow 07 nie wybiera szablonu po id scenariusz-<id>');
  const tresc = join(E2E, '../../../content/pl');
  const szablon = parseAllDocuments(readFileSync(join(tresc, 'scenarios', `${id}.yaml`), 'utf8'))[0].toJSON();
  const lekcje = readdirSync(join(tresc, 'lessons')).filter((f) => f.endsWith('.md')).map((f) => {
    const t = readFileSync(join(tresc, 'lessons', f), 'utf8');
    return parseAllDocuments(t.slice(3, t.indexOf('\n---', 3)))[0].toJSON();
  });
  const pierwsza = lekcje.filter((l) => l.module === szablon.module).sort((a, b) => a.order - b.order)[0];
  assert.ok(pierwsza, `brak lekcji modułu ${szablon.module}`);
  assert.match(tekst, new RegExp(`id:\\s*'modul-${szablon.module}'`), `flow nie rozwija modułu ${szablon.module}`);
  assert.match(tekst, new RegExp(`id:\\s*'lesson-${pierwsza.id.replace('.', '\\.')}'`), `flow nie kończy lekcji ${pierwsza.id}`);
  assert.ok(szablon.levels.includes('latwy') && /id:\s*'poziom-latwy'/.test(tekst), 'flow wybiera poziom łatwy, którego szablon nie ma');
  assert.equal(szablon.decisions[0].kind ?? 'draw-call', 'draw-call', 'option-0 = pas tylko w punkcie draw-call');
  assert.equal(szablon.bounds.latwy.expected[0], 'call', 'pas na flopie poziomu łatwego nie jest błędem');
  assert.match(tekst, /Dobre decyzje: 0 z 1/, 'pas kończy rozdanie po jednej decyzji');
});
