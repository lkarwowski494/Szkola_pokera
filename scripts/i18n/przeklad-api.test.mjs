// Testy bez sieci narzędzia przekładu przez API (K3a, plan-09 §6; D-294, D-295). Każda ścieżka, która mogłaby wysłać
// żądanie, dostaje fetch rzucający albo atrapę API — żaden test nie łączy się z api.anthropic.com.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { atrapa, fetchZakazany, atrapaApi, LEKCJA_EN } from './fixture.mjs';
import {
  budujZadanieBatcha, SYSTEM_PRZEKLADU, jednostkiPrzekladu, wyciagnijPropozycje, odczytajLinie, ocenPropozycje, main, parsujArgumenty,
} from './przeklad-api.mjs';
import { kontrolaZnacznikow, LIMIT_USD, DOMYSLNY_MODEL, kosztUsd, glosariusz } from './wspolne.mjs';

const cicho = () => {};
const linie = () => { const l = []; return { log: (s) => l.push(String(s)), l }; };

test('domyślnie: Opus 5.5, effort medium, limit 15 USD (D-294, D-295)', () => {
  const o = parsujArgumenty([]);
  assert.equal(o.model, 'claude-opus-5-5');
  assert.equal(DOMYSLNY_MODEL, 'claude-opus-5-5');
  assert.equal(o.effort, 'medium');
  assert.equal(o.limitUsd, 15);
  assert.equal(LIMIT_USD, 15);
  assert.deepEqual(o.jezyki, ['en']);
  assert.equal(parsujArgumenty(['--model', 'sonnet']).model, 'claude-sonnet-5-5');
  assert.throws(() => parsujArgumenty(['--jezyki', 'xx']), /nieznany język/);
  assert.throws(() => parsujArgumenty(['--jezyki', 'pl']), /źródło/);
  assert.throws(() => parsujArgumenty(['--limit-usd', '-1']), /limit-usd/);
});

test('cennik: Batch to połowa ceny standardowej', () => {
  assert.equal(kosztUsd(1e6, 0, 'claude-opus-5-5'), 2);
  assert.equal(kosztUsd(0, 1e6, 'claude-opus-5-5'), 10);
  assert.equal(kosztUsd(1e6, 1e6, 'claude-sonnet-5-5'), 6);
});

test('jednostki: słownik interfejsu jako jedna jednostka na język, każdy plik content/pl jako osobna; terms.yaml poza przekładem', () => {
  const root = atrapa();
  const j = jednostkiPrzekladu(root, 'en');
  assert.deepEqual(j.map((x) => x.zrodlo), ['apps/mobile/src/i18n/locales/pl.json', 'content/pl/exams/m0.yaml', 'content/pl/lessons/m0-l1-uklady.md']);
  assert.deepEqual(j.map((x) => x.cel), ['apps/mobile/src/i18n/locales/en.json', 'content/en/exams/m0.yaml', 'content/en/lessons/m0-l1-uklady.md']);
  assert.ok(!j.some((x) => x.zrodlo.includes('terms.yaml')));
  for (const x of j) assert.match(x.custom_id, /^[A-Za-z0-9_-]{1,64}$/);
  assert.equal(new Set(j.map((x) => x.custom_id)).size, j.length);
});

test('żądanie batcha: model, effort, persona tłumacza i reguły znaczników w system, jednostka i glosariusz w treści', () => {
  const root = atrapa();
  const [, , lekcja] = jednostkiPrzekladu(root, 'en');
  const z = budujZadanieBatcha(root, 'en', lekcja, { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(root));
  assert.equal(z.custom_id, lekcja.custom_id);
  assert.equal(z.params.model, 'claude-opus-5-5');
  assert.deepEqual(z.params.output_config, { effort: 'medium' });
  assert.ok(z.params.max_tokens >= 64000);
  assert.equal(z.params.thinking, undefined, 'Opus 5.5: thinking zawsze adaptacyjny, parametru nie wysyłamy');
  assert.equal(z.params.system, SYSTEM_PRZEKLADU);
  assert.match(z.params.system, /tłumacz/i);
  for (const r of [/\{\{n:/, /\{\{t:/, /\[\[/, /front matter/i, /klucz/i, /dane/i]) assert.match(z.params.system, r);
  const user = z.params.messages[0].content;
  assert.equal(z.params.messages.length, 1);
  assert.match(user, /angielski \(en\)/);
  assert.ok(user.includes(readFileSync(join(root, 'content/pl/lessons/m0-l1-uklady.md'), 'utf8')), 'plik źródłowy w całości');
  assert.match(user, /pot: pula → pot/);
  assert.match(user, /call: sprawdzenie → call/);
  assert.doesNotMatch(user, /fold: pas/, 'glosariusz tylko z terminami pliku');
  assert.match(user, /nazwa angielska/, 'D-287: w en sama nazwa angielska');
  assert.doesNotMatch(user, /Angielski przekład \(odniesienie/);
});

test('żądanie dla ja: angielski przekład jako odniesienie, jeśli istnieje (D-289); bez niego — bez odniesienia', () => {
  const zEn = atrapa({ zEn: true });
  const lekcja = jednostkiPrzekladu(zEn, 'ja').find((x) => x.rodzaj === 'md');
  const u = budujZadanieBatcha(zEn, 'ja', lekcja, { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(zEn)).params.messages[0].content;
  assert.match(u, /Angielski przekład \(odniesienie/);
  assert.ok(u.includes(LEKCJA_EN));
  assert.match(u, /japoński \(ja\)/);
  const bez = atrapa();
  const u2 = budujZadanieBatcha(bez, 'ja', jednostkiPrzekladu(bez, 'ja').find((x) => x.rodzaj === 'md'), { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(bez)).params.messages[0].content;
  assert.doesNotMatch(u2, /Angielski przekład \(odniesienie/);
});

test('żądanie słownika interfejsu: klucze z kontekstem i kategorie liczby mnogiej języka docelowego', () => {
  const root = atrapa();
  const ui = jednostkiPrzekladu(root, 'en')[0];
  const u = budujZadanieBatcha(root, 'en', ui, { model: 'claude-sonnet-5-5', effort: 'medium' }, glosariusz(root)).params.messages[0].content;
  assert.match(u, /Wiersz lekcji\. Parametry: modul, nr\./);
  assert.match(u, /one, other/);
  assert.match(u, /"today\.reviewsDue_other"/);
});

test('wynik batcha: sukces, błąd, ucięcie i odmowa', () => {
  const ok = odczytajLinie(JSON.stringify({ custom_id: 'pr__en__ui', result: { type: 'succeeded', message: { stop_reason: 'end_turn', content: [{ type: 'thinking', thinking: '' }, { type: 'text', text: 'abc' }], usage: { input_tokens: 5, output_tokens: 7 } } } }));
  assert.deepEqual(ok, { custom_id: 'pr__en__ui', blad: null, tekst: 'abc', uzycie: { input_tokens: 5, output_tokens: 7 } });
  assert.match(odczytajLinie(JSON.stringify({ custom_id: 'x', result: { type: 'errored', error: { error: { message: 'overloaded sk-ant-api03-ABCDEFGHIJKLMNOP' } } } })).blad, /errored: overloaded \*\*\*/);
  assert.match(odczytajLinie(JSON.stringify({ custom_id: 'x', result: { type: 'succeeded', message: { stop_reason: 'max_tokens', content: [] } } })).blad, /max_tokens/);
  assert.match(odczytajLinie(JSON.stringify({ custom_id: 'x', result: { type: 'succeeded', message: { stop_reason: 'refusal', content: [] } } })).blad, /refusal/);
  assert.match(odczytajLinie(JSON.stringify({ custom_id: 'x', result: { type: 'expired' } })).blad, /expired/);
});

test('wyciągnięcie propozycji: plik między znacznikami, słownik jako obiekt JSON (komentarz po obiekcie nie przeszkadza)', () => {
  const root = atrapa();
  const [ui, , md] = jednostkiPrzekladu(root, 'en');
  assert.equal(wyciagnijPropozycje(`Oto plik:\n<<<PLIK>>>\n${LEKCJA_EN}<<<KONIEC>>>\n`, md).tekst, LEKCJA_EN);
  assert.match(wyciagnijPropozycje('bez znaczników', md).blad, /<<<PLIK>>>/);
  const p = wyciagnijPropozycje('{"today.title":"Today","today.lessonOf":"{{modul}}, lesson {{nr}}","today.reviewsDue_one":"{{count}} due","today.reviewsDue_other":"{{count}} due"} parametry {x} bez zmian', ui);
  assert.equal(p.blad, null);
  assert.deepEqual(JSON.parse(p.tekst), { today: { title: 'Today', lessonOf: '{{modul}}, lesson {{nr}}', reviewsDue_one: '{{count}} due', reviewsDue_other: '{{count}} due' } });
});

test('kontrola znaczników: zgodny przekład przechodzi', () => {
  const root = atrapa();
  const [, , md] = jednostkiPrzekladu(root, 'en');
  assert.deepEqual(kontrolaZnacznikow(md, LEKCJA_EN, 'en'), []);
});

test('kontrola znaczników: zmieniony {{n:…}} odrzuca propozycję z powodem', () => {
  const md = jednostkiPrzekladu(atrapa(), 'en')[2];
  const p = kontrolaZnacznikow(md, LEKCJA_EN.replace('{{n:ex.bet}}', '{{n:ex.bet2}}'), 'en');
  assert.ok(p.some((x) => /\{\{n:/.test(x) && /ex\.bet/.test(x)), p.join('; '));
});

test('kontrola znaczników: zgubiony {{t:…}} odrzuca propozycję', () => {
  const md = jednostkiPrzekladu(atrapa(), 'en')[2];
  const p = kontrolaZnacznikow(md, LEKCJA_EN.replace('into the {{t:pot}}', 'into the pot'), 'en');
  assert.ok(p.some((x) => /\{\{t:/.test(x) && /pot/.test(x)), p.join('; '));
});

test('kontrola znaczników: zmieniony klucz YAML, zmienione id i zmieniona karta odrzucają propozycję', () => {
  const md = jednostkiPrzekladu(atrapa(), 'en')[2];
  assert.ok(kontrolaZnacznikow(md, LEKCJA_EN.replace('  - kind: choice', '  - rodzaj: choice'), 'en').some((x) => /struktur|klucz/i.test(x)));
  assert.ok(kontrolaZnacznikow(md, LEKCJA_EN.replace('id: m0.l1.q1', 'id: m0.l1.q9'), 'en').some((x) => /id/.test(x)));
  assert.ok(kontrolaZnacznikow(md, LEKCJA_EN.replace('[[As Ks Qs Js Ts]]', '[[As Ks Qs Js 9s]]'), 'en').some((x) => /\[\[/.test(x)));
  assert.ok(kontrolaZnacznikow(md, LEKCJA_EN.replace('rfi.utg', 'rfi.co'), 'en').some((x) => /range/.test(x)));
  assert.ok(kontrolaZnacznikow(md, LEKCJA_EN.replace(' {{helplines}}', ''), 'en').some((x) => /helplines/.test(x)));
  const egz = jednostkiPrzekladu(atrapa(), 'en')[1];
  const dobry = 'module: m0\ndrills:\n  - kind: choice\n    id: m0.exam.q1\n    rules: [R-M0-001]\n    prompt: "You have a {{t:pot}} of {{n:ex.pot}}."\n    options:\n      - { text: "Yes", correct: true, why: "Because {{n:eq.bet-pot}}." }\n';
  assert.deepEqual(kontrolaZnacznikow(egz, dobry, 'en'), []);
  assert.ok(kontrolaZnacznikow(egz, dobry.replace('prompt:', 'pytanie:'), 'en').length > 0);
  assert.ok(kontrolaZnacznikow(egz, dobry.replace('correct: true', 'correct: false'), 'en').length > 0);
  assert.ok(kontrolaZnacznikow(egz, 'module: [nie: domknięte', 'en').some((x) => /YAML/.test(x)));
});

test('kontrola słownika interfejsu: parametry {{x}} i kategorie liczby mnogiej języka docelowego', () => {
  const ui = jednostkiPrzekladu(atrapa(), 'en')[0];
  const dobry = { today: { title: 'Today', lessonOf: '{{modul}}, lesson {{nr}}', reviewsDue_one: '{{count}} due', reviewsDue_other: '{{count}} due' } };
  assert.deepEqual(kontrolaZnacznikow(ui, JSON.stringify(dobry), 'en'), []);
  assert.ok(kontrolaZnacznikow(ui, JSON.stringify({ today: { ...dobry.today, lessonOf: '{{module}}, lesson {{nr}}' } }), 'en').some((x) => /lessonOf/.test(x)));
  assert.ok(kontrolaZnacznikow(ui, JSON.stringify({ today: { ...dobry.today, reviewsDue_few: 'x {{count}}' } }), 'en').some((x) => /reviewsDue/.test(x)));
  const { title, ...bezTytulu } = dobry.today; void title;
  assert.ok(kontrolaZnacznikow(ui, JSON.stringify({ today: bezTytulu }), 'en').some((x) => /today\.title/.test(x)));
});

test('--szacuj nie dotyka sieci ani klucza (fetch rzuca, klucz ustawiony), zapisuje szacunek, kod 0 poniżej limitu', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-')); const { log, l } = linie();
  const staryFetch = globalThis.fetch; globalThis.fetch = fetchZakazany;
  try {
    const kod = await main(['--szacuj', '--jezyki', 'en,ja', '--wyjscie', wy], { ANTHROPIC_API_KEY: 'sk-ant-test-0000000000000' }, { fetchFn: fetchZakazany, log, root });
    assert.equal(kod, 0, l.join('\n'));
  } finally { globalThis.fetch = staryFetch; }
  const s = JSON.parse(readFileSync(join(wy, 'szacunek.json'), 'utf8'));
  assert.deepEqual(s.wiersze.map((w) => w.jezyk), ['en', 'ja']);
  assert.ok(s.koszt_usd > 0 && s.tokeny_we > 0 && s.tokeny_wy > 0);
  assert.match(l.join('\n'), /\| en \|/);
  assert.match(l.join('\n'), /suma/i);
  assert.doesNotMatch(l.join('\n'), /sk-ant-test/);
});

test('limit kosztu: --szacuj powyżej limitu kończy się kodem 1 i STOP', async () => {
  const root = atrapa(); const { log, l } = linie();
  const kod = await main(['--szacuj', '--limit-usd', '0.000001', '--wyjscie', mkdtempSync(join(tmpdir(), 'k3a-wy-'))], {}, { fetchFn: fetchZakazany, log, root });
  assert.equal(kod, 1);
  assert.match(l.join('\n'), /STOP/);
});

test('limit kosztu: przebieg z kluczem powyżej limitu zatrzymuje się przed wysłaniem batcha', async () => {
  const root = atrapa(); const api = atrapaApi(() => 'x');
  const kod = await main(['--limit-usd', '0.000001', '--wyjscie', mkdtempSync(join(tmpdir(), 'k3a-wy-'))], { ANTHROPIC_API_KEY: 'sk-ant-test-0000000000000' }, { fetchFn: api.fetchFn, log: cicho, root });
  assert.equal(kod, 1);
  assert.ok(!api.wywolania.some((w) => w.sciezka === '/v1/messages/batches' && w.metoda === 'POST'), 'batch nie może zostać wysłany');
});

test('bez klucza przebieg płatny niemożliwy (kod 2), bez sieci', async () => {
  const kod = await main(['--wyjscie', mkdtempSync(join(tmpdir(), 'k3a-wy-'))], {}, { fetchFn: fetchZakazany, log: cicho, root: atrapa() });
  assert.equal(kod, 2);
});

test('pełny przebieg na atrapie API: batch, wyniki, propozycje jako plik; złe propozycje odrzucone z powodem; słowniki i treść nietknięte', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  const api = atrapaApi((id) => {
    if (id.endsWith('__ui')) return JSON.stringify({ 'today.title': 'Today', 'today.lessonOf': '{{modul}}, lesson {{nr}}', 'today.reviewsDue_one': '{{count}} due', 'today.reviewsDue_other': '{{count}} due' });
    if (id.includes('lessons')) return `<<<PLIK>>>\n${LEKCJA_EN}<<<KONIEC>>>`;
    return '<<<PLIK>>>\nmodule: m0\ndrills: []\n<<<KONIEC>>>';
  });
  const kod = await main(['--wyjscie', wy], { ANTHROPIC_API_KEY: 'sk-ant-test-0000000000000' }, { fetchFn: api.fetchFn, log: cicho, root, spij: async () => {} });
  assert.equal(kod, 0);
  const post = api.wywolania.find((w) => w.sciezka === '/v1/messages/batches' && w.metoda === 'POST');
  assert.equal(post.cialo.requests.length, 3, 'jedno żądanie na jednostkę');
  assert.equal(post.naglowki['x-api-key'], 'sk-ant-test-0000000000000');
  const p = JSON.parse(readFileSync(join(wy, 'propozycje.json'), 'utf8'));
  assert.equal(p.batch_id, 'msgbatch_test1');
  const st = Object.fromEntries(p.jednostki.map((j) => [j.cel, j.status]));
  assert.deepEqual(st, { 'apps/mobile/src/i18n/locales/en.json': 'przyjeta', 'content/en/lessons/m0-l1-uklady.md': 'przyjeta', 'content/en/exams/m0.yaml': 'odrzucona' });
  assert.ok(p.jednostki.find((j) => j.status === 'odrzucona').powody.length > 0);
  assert.ok(!existsSync(join(root, 'content/en')), 'skrypt nie nakłada propozycji');
  assert.ok(!existsSync(join(root, 'apps/mobile/src/i18n/locales/en.json')));
  assert.ok(existsSync(join(wy, 'podsumowanie.md')));
});

test('--zastosuj: nakłada tylko propozycje zgodne ze źródłem; odrzuca zmienione znaczniki i zmienione źródło', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  const [ui, egz, md] = jednostkiPrzekladu(root, 'en');
  const prop = (j, tekst) => ({ ...ocenPropozycje(j, 'en', { blad: null, tekst }), tekst });
  const plik = join(wy, 'propozycje.json');
  writeFileSync(plik, JSON.stringify({ model: 'claude-opus-5-5', jednostki: [
    prop(md, LEKCJA_EN),
    prop(egz, 'module: m0\ndrills: []\n'),
    { ...prop(ui, JSON.stringify({ today: { title: 'Today', lessonOf: '{{modul}}, lesson {{nr}}', reviewsDue_one: '{{count}} due', reviewsDue_other: '{{count}} due' } })), zrodlo_sha256: 'inne' },
  ] }));
  const { log, l } = linie();
  const kod = await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log, root });
  assert.equal(kod, 1, 'odrzucone propozycje dają kod 1');
  assert.equal(readFileSync(join(root, 'content/en/lessons/m0-l1-uklady.md'), 'utf8'), LEKCJA_EN);
  assert.ok(!existsSync(join(root, 'content/en/exams/m0.yaml')));
  assert.ok(!existsSync(join(root, 'apps/mobile/src/i18n/locales/en.json')));
  assert.match(l.join('\n'), /źródło zmienione/);
  // ręcznie zepsuta propozycja (zmieniony {{n:…}} po przeglądzie) też nie przejdzie
  writeFileSync(plik, JSON.stringify({ jednostki: [{ ...prop(md, LEKCJA_EN), tekst: LEKCJA_EN.replace('{{n:ex.pot}}', '{{n:ex.po}}') }] }));
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log: cicho, root }), 1);
});
