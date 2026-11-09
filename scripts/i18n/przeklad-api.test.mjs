// Testy bez sieci narzędzia przekładu przez API (K3a, plan-09 §6; D-294, D-295). Każda ścieżka, która mogłaby wysłać
// żądanie, dostaje fetch rzucający albo atrapę API — żaden test nie łączy się z api.anthropic.com.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, mkdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { atrapa, fetchZakazany, atrapaApi, LEKCJA_EN, SPOTS_EN, HELPLINES_EN } from './fixture.mjs';
import {
  budujZadanieBatcha, SYSTEM_PRZEKLADU, jednostkiPrzekladu, wyciagnijPropozycje, odczytajLinie, ocenPropozycje, main, parsujArgumenty,
  wyJednostki,
} from './przeklad-api.mjs';
import { parsujArgumenty as parsujArgumentyPrzegladu, segmenty } from './przeglad-api.mjs';
import { kontrolaZnacznikow, LIMIT_USD, DOMYSLNY_MODEL, kosztUsd, glosariusz, POLA_NAKLADEK, roznicePoza, maxTokensJednostki, ostrzezeniaLiczb } from './wspolne.mjs';
import { tsImport } from 'tsx/esm/api';

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

test('jednostki: słownik interfejsu jako jedna jednostka na język, każdy plik content/pl jako osobna, nakładki spots i helplines; terms.yaml poza przekładem', () => {
  const root = atrapa();
  const j = jednostkiPrzekladu(root, 'en');
  assert.deepEqual(j.map((x) => x.zrodlo), ['apps/mobile/src/i18n/locales/pl.json', 'content/pl/exams/m0.yaml', 'content/pl/lessons/m0-l1-uklady.md', 'content/ranges/spots.yaml', 'content/helplines.yaml']);
  assert.deepEqual(j.map((x) => x.cel), ['apps/mobile/src/i18n/locales/en.json', 'content/en/exams/m0.yaml', 'content/en/lessons/m0-l1-uklady.md', 'content/en/ranges/spots.yaml', 'content/en/helplines.yaml']);
  assert.deepEqual(j.slice(3).map((x) => x.rodzaj), ['nakladka', 'nakladka']);
  assert.deepEqual(j.slice(3).map((x) => x.en), ['content/en/ranges/spots.yaml', 'content/en/helplines.yaml']);
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
  assert.equal(z.params.max_tokens, maxTokensJednostki(wyJednostki(lekcja, 'en')), 'max_tokens z szacunku jednostki (D-043 K3a, znalezisko 2)');
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

test('kontrola znaczników: różnica {{t:…}} w lekcji i egzaminie to ostrzeżenie, nie odrzucenie (D-344; przebieg en 42635177199)', () => {
  const root = atrapa();
  const md = jednostkiPrzekladu(root, 'en')[2];
  const tl = LEKCJA_EN.replace('into the {{t:pot}}', 'into the pot');
  assert.deepEqual(kontrolaZnacznikow(md, tl, 'en'), [], 'w en znacznik renderuje samą nazwę angielską — przekład bez niego nie psuje treści');
  const p = ocenPropozycje(md, 'en', { blad: null, tekst: `<<<PLIK>>>\n${tl}<<<KONIEC>>>` });
  assert.equal(p.status, 'przyjeta');
  assert.ok(p.ostrzezenia.some((x) => /\{\{t:/.test(x) && /pot/.test(x)), p.ostrzezenia.join('; '));
  const egz = jednostkiPrzekladu(root, 'en')[1];
  const dobry = 'module: m0\ndrills:\n  - kind: choice\n    id: m0.exam.q1\n    rules: [R-M0-001]\n    prompt: "You have a pot of {{n:ex.pot}}."\n    options:\n      - { text: "Yes", correct: true, why: "Because {{n:eq.bet-pot}}." }\n';
  assert.deepEqual(kontrolaZnacznikow(egz, dobry, 'en'), []);
  assert.deepEqual(kontrolaZnacznikow(egz, dobry.replace('{{n:ex.pot}}', '{{n:ex.bet}}'), 'en').length, 1, '{{n:…}} nadal twardo');
});

test('kontrola znaczników: {{t:…}} w nakładce i słowniku interfejsu nadal odrzuca (strażnik content-build, i18n)', () => {
  const j = jednostkiPrzekladu(atrapa(), 'en').find((x) => x.zrodlo.endsWith('spots.yaml'));
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('title: "{{t:pot}}, someone opened"', 'title: "The pot, someone opened"'), 'en').some((x) => /t:pot/.test(x)));
});

test('kontrola znaczników: mapy tekstów options/why (klucz = id odpowiedzi) są przekładalne (D-344; m5-l3, m5-l4)', () => {
  const md = jednostkiPrzekladu(atrapa(), 'en')[2];
  const mapa = (o1, o2, w1) => `    options:\n      ${o1}\n      ${o2}\n    cases:\n      - when: { height: [high] }\n        best: check\n        why:\n          ${w1}\n`;
  const zr = { ...md, tekst: md.tekst.replace(/    options:\n(      - .*\n)+/, mapa('check: "{{t:check|Czekam}} częściej"', 'small: "Mało: {{n:ex.bet}}"', 'check: "Tak: {{n:ex.pot}}"')) };
  assert.notEqual(zr.tekst, md.tekst, 'atrapa ma blok options do podmiany');
  const tl = LEKCJA_EN.replace(/    options:\n(      - .*\n)+/, mapa('check: "{{t:check}} more often"', 'small: "Small: {{n:ex.bet}}"', 'check: "Yes: {{n:ex.pot}}"'));
  assert.deepEqual(kontrolaZnacznikow(zr, tl, 'en'), []);
  assert.ok(kontrolaZnacznikow(zr, tl.replace('Small: {{n:ex.bet}}', 'Small: 5bb'), 'en').some((x) => /options\.small/.test(x) && /ex\.bet/.test(x)), 'znaczniki w mapie nadal sprawdzane');
  assert.ok(kontrolaZnacznikow(zr, tl.replace('best: check', 'best: small'), 'en').some((x) => /best/.test(x)), 'identyfikator obok mapy bez zmian');
  assert.ok(kontrolaZnacznikow(zr, tl.replace('small: "Small', 'maly: "Small'), 'en').some((x) => /klucze/.test(x)), 'klucze mapy (id odpowiedzi) bez zmian');
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
    if (id.includes('spots')) return `<<<PLIK>>>\n${SPOTS_EN}<<<KONIEC>>>`;
    if (id.includes('helplines')) return `<<<PLIK>>>\n${HELPLINES_EN}<<<KONIEC>>>`;
    return '<<<PLIK>>>\nmodule: m0\ndrills: []\n<<<KONIEC>>>';
  });
  const kod = await main(['--wyjscie', wy], { ANTHROPIC_API_KEY: 'sk-ant-test-0000000000000' }, { fetchFn: api.fetchFn, log: cicho, root, spij: async () => {} });
  assert.equal(kod, 0);
  const post = api.wywolania.find((w) => w.sciezka === '/v1/messages/batches' && w.metoda === 'POST');
  assert.equal(post.cialo.requests.length, 5, 'jedno żądanie na jednostkę');
  assert.equal(post.naglowki['x-api-key'], 'sk-ant-test-0000000000000');
  const p = JSON.parse(readFileSync(join(wy, 'propozycje.json'), 'utf8'));
  assert.equal(p.batch_id, 'msgbatch_test1');
  const st = Object.fromEntries(p.jednostki.map((j) => [j.cel, j.status]));
  assert.deepEqual(st, { 'apps/mobile/src/i18n/locales/en.json': 'przyjeta', 'content/en/lessons/m0-l1-uklady.md': 'przyjeta', 'content/en/exams/m0.yaml': 'odrzucona', 'content/en/ranges/spots.yaml': 'przyjeta', 'content/en/helplines.yaml': 'przyjeta' });
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

/* ---------- nakładki plików wspólnych (K2b: tools/content-build/src/nakladka.ts, D-317–D-322) ---------- */
const nakladka = (root, nazwa) => jednostkiPrzekladu(root, 'en').find((x) => x.zrodlo.endsWith(nazwa));

test('nakładki: reguła pól z nakladka.ts (POLA_SPOTS, POLA_HELPLINES), nie kopia', async () => {
  const ts = await tsImport('../../tools/content-build/src/nakladka.ts', import.meta.url);
  // każdy tsImport ładuje osobną kopię modułu, więc porównanie po wartości; źródło jest jedno (nakladka.ts)
  assert.deepEqual(POLA_NAKLADEK['content/ranges/spots.yaml'], ts.POLA_SPOTS);
  assert.deepEqual(POLA_NAKLADEK['content/helplines.yaml'], ts.POLA_HELPLINES);
  assert.equal(roznicePoza.toString(), ts.roznicePoza.toString());
});

test('nakładka spots: przetłumaczony tekst i klucze groups/wrongSizes przechodzą; zmiany poza tekstem odrzucone', () => {
  const j = nakladka(atrapa(), 'spots.yaml');
  assert.deepEqual(kontrolaZnacznikow(j, SPOTS_EN, 'en'), []);
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('path: "CO:raise2.5"', 'path: "CO:raise3"'), 'en').some((x) => /path/.test(x)));
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('    "Play (3-bet or {{t:call}})":', '    "Play (3-bet or call)":'), 'en').some((x) => /wrongSizes/.test(x)), 'klucz wrongSizes = przekład klucza grupy');
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('["raise 7.5", "call 2.5"]', '["raise 7.5"]'), 'en').length > 0);
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('3-bet to {{n:ex.pot}}', '3-bet to 7.5bb'), 'en').some((x) => /n:ex\.pot/.test(x)));
  assert.ok(kontrolaZnacznikow(j, SPOTS_EN.replace('title: "{{t:pot}}, someone opened"', 'title: "The pot, someone opened"'), 'en').some((x) => /t:pot/.test(x)));
  assert.ok(kontrolaZnacznikow(j, 'nie: [yaml', 'en').some((x) => /YAML/.test(x)));
});

test('nakładka helplines: tekst przetłumaczony przechodzi; name, quote, url i id bez zmian', () => {
  const j = nakladka(atrapa(), 'helplines.yaml');
  assert.deepEqual(kontrolaZnacznikow(j, HELPLINES_EN, 'en'), []);
  assert.ok(kontrolaZnacznikow(j, HELPLINES_EN.replace("name: 'Gambling Therapy'", "name: 'Terapia hazardu'"), 'en').some((x) => /name/.test(x)));
  assert.ok(kontrolaZnacznikow(j, HELPLINES_EN.replace("quote: 'free practical advice'", "quote: 'free advice'"), 'en').some((x) => /quote/.test(x)));
  assert.ok(kontrolaZnacznikow(j, HELPLINES_EN.replace('id: int-x', 'id: int-y'), 'en').some((x) => /id/.test(x)));
  assert.ok(kontrolaZnacznikow(j, HELPLINES_EN.replace("claim: H-INT-2", "claim: H-INT-3"), 'en').some((x) => /claim/.test(x)));
});

test('żądanie nakładki: pola tekstowe pliku i reguła kluczy wrongSizes w treści; angielskie odniesienie dla ja (D-289)', () => {
  const root = atrapa();
  const u = budujZadanieBatcha(root, 'en', nakladka(root, 'spots.yaml'), { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(root)).params.messages[0].content;
  assert.match(u, /title, text, why/);
  assert.match(u, /groups/);
  assert.match(u, /wrongSizes/);
  assert.match(u, /pot: pula → pot/);
  const h = budujZadanieBatcha(root, 'en', nakladka(root, 'helplines.yaml'), { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(root)).params.messages[0].content;
  assert.match(h, /pointer, text, regions_label, info, hours, cost, language, label/);
  assert.match(h, /name, quote/);
  const zEn = atrapa(); mkdirSync(join(zEn, 'content/en/ranges'), { recursive: true }); writeFileSync(join(zEn, 'content/en/ranges/spots.yaml'), SPOTS_EN);
  const ja = budujZadanieBatcha(zEn, 'ja', nakladka(zEn, 'spots.yaml'), { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(zEn)).params.messages[0].content;
  assert.match(ja, /Angielski przekład \(odniesienie/);
  assert.ok(ja.includes(SPOTS_EN));
});

test('--zastosuj nakłada nakładkę do content/<język>/ranges/spots.yaml po kontroli', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  const j = nakladka(root, 'spots.yaml');
  const plik = join(wy, 'propozycje.json');
  writeFileSync(plik, JSON.stringify({ jednostki: [{ ...ocenPropozycje(j, 'en', { blad: null, tekst: `<<<PLIK>>>\n${SPOTS_EN}<<<KONIEC>>>` }) }] }));
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log: cicho, root }), 0);
  assert.equal(readFileSync(join(root, 'content/en/ranges/spots.yaml'), 'utf8'), SPOTS_EN);
});

/* ---------- przegląd D-043 K3a, znalezisko 4: liczby wpisane cyframi poza znacznikami ---------- */
test('ostrzeżenie (nie błąd), gdy liczby zapisane cyframi poza znacznikami różnią się od źródła; 2,5 = 2.5', async () => {
  const root = atrapa();
  const md = jednostkiPrzekladu(root, 'en').find((x) => x.rodzaj === 'md');
  const zle = LEKCJA_EN.replace('You put {{n:ex.bet}}', 'You put {{n:ex.bet}} (about 5bb)');
  const ok = ocenPropozycje(md, 'en', { blad: null, tekst: `<<<PLIK>>>\n${LEKCJA_EN}<<<KONIEC>>>` });
  assert.deepEqual(ok.ostrzezenia, []);
  const p = ocenPropozycje(md, 'en', { blad: null, tekst: `<<<PLIK>>>\n${zle}<<<KONIEC>>>` });
  assert.equal(p.status, 'przyjeta', 'ostrzeżenie nie odrzuca');
  assert.equal(p.ostrzezenia.length, 1);
  assert.match(p.ostrzezenia[0], /liczb.*5/);
  assert.deepEqual(ostrzezeniaLiczb('Do 2,5bb i 3 razy', 'To 2.5bb and 3 times'), []);
  const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-')); const plik = join(wy, 'propozycje.json');
  writeFileSync(plik, JSON.stringify({ jednostki: [p] }));
  const { log, l } = linie();
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log, root }), 0);
  assert.equal(readFileSync(join(root, md.cel), 'utf8'), zle);
  assert.match(l.join('\n'), /ostrzeżenie.*liczb/);
});

/* ---------- przegląd D-043 K3a, znalezisko 3: limit_usd z wejścia workflowu bez sufitu ---------- */
test('--limit-usd powyżej 15 USD odrzucone (osobna zgoda właściciela, D-295); do 15 USD przyjęte', async () => {
  assert.throws(() => parsujArgumenty(['--limit-usd', '15.01']), /D-295/);
  assert.throws(() => parsujArgumenty(['--limit-usd', '100']), /zgod/);
  assert.equal(parsujArgumenty(['--limit-usd', '15']).limitUsd, 15);
  assert.equal(parsujArgumenty(['--limit-usd', '0.5']).limitUsd, 0.5);
  assert.throws(() => parsujArgumentyPrzegladu(['--limit-usd', '16']), /D-295/);
});

/* ---------- przegląd D-043 K3a, znalezisko 2: max_tokens 128 000 na żądanie łamie limit D-295 w najgorszym przypadku ---------- */
test('max_tokens przekładu z szacunku jednostki: min(128 000, ⌈2 × szacunek wyjścia + 4000⌉)', () => {
  const root = atrapa();
  for (const j of jednostkiPrzekladu(root, 'en')) {
    const z = budujZadanieBatcha(root, 'en', j, { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(root));
    assert.equal(z.params.max_tokens, Math.min(128000, Math.ceil(2 * wyJednostki(j, 'en') + 4000)), j.zrodlo);
    assert.equal(z.params.max_tokens, maxTokensJednostki(wyJednostki(j, 'en')));
    assert.ok(z.params.max_tokens < 128000);
  }
  assert.equal(maxTokensJednostki(1e6), 128000);
});

test('--szacuj: szacunek i najgorszy przypadek (koszt przy Σ max_tokens); STOP, gdy najgorszy przypadek > limit', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-')); const { log, l } = linie();
  assert.equal(await main(['--szacuj', '--wyjscie', wy], {}, { fetchFn: fetchZakazany, log, root }), 0);
  const s = JSON.parse(readFileSync(join(wy, 'szacunek.json'), 'utf8'));
  assert.ok(s.tokeny_wy_max > s.tokeny_wy && s.koszt_max_usd > s.koszt_usd);
  assert.match(l.join('\n'), /najgorszy przypadek/);
  const lim = String((s.koszt_usd + s.koszt_max_usd) / 2);
  assert.equal(await main(['--szacuj', '--limit-usd', lim, '--wyjscie', wy], {}, { fetchFn: fetchZakazany, log, root }), 1);
  assert.match(l.at(-1), /STOP.*najgorszy przypadek/);
});

test('drugi STOP przed wysłaniem: koszt(wejście z count_tokens, Σ max_tokens) > limit → kod 1, batch niewysłany', async () => {
  const root = atrapa(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  await main(['--szacuj', '--wyjscie', wy], {}, { fetchFn: fetchZakazany, log: cicho, root });
  const s = JSON.parse(readFileSync(join(wy, 'szacunek.json'), 'utf8'));
  const we = 1000 * s.jednostek; // atrapa count_tokens: 1000 na żądanie
  const lim = (kosztUsd(we, s.tokeny_wy, 'claude-opus-5-5') + kosztUsd(we, s.tokeny_wy_max, 'claude-opus-5-5')) / 2;
  const api = atrapaApi(() => 'x'); const { log, l } = linie();
  // limit niższy niż najgorszy przypadek z przybliżenia też zatrzyma — więc sprawdzamy oba poziomy osobno
  const kod = await main(['--limit-usd', String(lim), '--wyjscie', wy], { ANTHROPIC_API_KEY: 'sk-ant-test-0000000000000' }, { fetchFn: api.fetchFn, log, root });
  assert.equal(kod, 1);
  assert.match(l.join('\n'), /najgorszy przypadek/);
  assert.ok(!api.wywolania.some((w) => w.sciezka === '/v1/messages/batches' && w.metoda === 'POST'));
});

/* ---------- przegląd D-043 K3a, znalezisko 1: język z pliku propozycji bez walidacji (zapis poza repo) ---------- */
const EGZ_EN = 'module: m0\ndrills:\n  - kind: choice\n    id: m0.exam.q1\n    rules: [R-M0-001]\n    prompt: "You have a {{t:pot}} of {{n:ex.pot}}."\n    options:\n      - { text: "Yes", correct: true, why: "Because {{n:eq.bet-pot}}." }\n';
test('--zastosuj odrzuca język spoza listy i ścieżkę poza content/<język>/ (path traversal z pliku propozycji)', async () => {
  const root = atrapa(); const poza = mkdtempSync(join(tmpdir(), 'k3a-poza-')); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  const kod = relative(join(root, 'content'), poza); // np. ../../k3a-poza-XXXX
  const egz = jednostkiPrzekladu(root, 'en').find((x) => x.zrodlo === 'content/pl/exams/m0.yaml');
  const plik = join(wy, 'propozycje.json');
  writeFileSync(plik, JSON.stringify({ jednostki: [{ jezyk: kod, zrodlo: egz.zrodlo, cel: `content/${kod}/exams/m0.yaml`, zrodlo_sha256: egz.zrodlo_sha256, tekst: EGZ_EN }] }));
  const { log, l } = linie();
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log, root }), 1);
  assert.ok(!existsSync(join(poza, 'exams/m0.yaml')), 'zapis poza repozytorium');
  assert.match(l.join('\n'), /język/);
  // kod z listy, ale cel z kropkami — też odrzucony
  writeFileSync(plik, JSON.stringify({ jednostki: [{ jezyk: 'en', zrodlo: egz.zrodlo, cel: 'content/en/../../x.yaml', zrodlo_sha256: egz.zrodlo_sha256, tekst: EGZ_EN }] }));
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log: cicho, root }), 1);
  assert.ok(!existsSync(join(root, '..', 'x.yaml')));
});

/* ---------- definicje terminów: jednostka content/<kod>/terms-def.yaml (D-335; content-build: definicje.ts) ---------- */
const zDefinicjami = () => {
  const root = atrapa();
  writeFileSync(join(root, 'content/terms.yaml'), readFileSync(join(root, 'content/terms.yaml'), 'utf8').replace(/^pot:\n/m, 'pot:\n  def: "Żetony postawione w rozdaniu."\n'));
  return root;
};
const DEF_EN = 'pot: "Chips bet in the hand."\n';

test('definicje: jednostka tylko gdy terms.yaml ma def; cel content/<kod>/terms-def.yaml; źródło i strażnik z definicje.ts', async () => {
  assert.ok(!jednostkiPrzekladu(atrapa(), 'en').some((x) => x.rodzaj === 'definicje'), 'atrapa bez def: brak jednostki');
  const root = zDefinicjami();
  const j = jednostkiPrzekladu(root, 'ja').find((x) => x.rodzaj === 'definicje');
  assert.ok(j);
  assert.equal(j.cel, 'content/ja/terms-def.yaml');
  assert.equal(j.en, 'content/en/terms-def.yaml');
  assert.deepEqual(j.klucze, ['pot']);
  const ts = await tsImport('../../tools/content-build/src/definicje.ts', import.meta.url);
  assert.equal(j.tekst, ts.tekstZrodlaDefinicji({ pot: { def: 'Żetony postawione w rozdaniu.' } }));
  assert.match(j.custom_id, /^[A-Za-z0-9_-]{1,64}$/);
});

test('definicje: kontrola przekładu — te same klucze, niepuste, bez znaczników', () => {
  const j = jednostkiPrzekladu(zDefinicjami(), 'en').find((x) => x.rodzaj === 'definicje');
  assert.deepEqual(kontrolaZnacznikow(j, DEF_EN, 'en'), []);
  assert.deepEqual(kontrolaZnacznikow(j, 'pot: "Chips {{n:x}}."\n', 'en'), ['pot: znaczniki w definicji (def to czysty tekst)']);
  assert.deepEqual(kontrolaZnacznikow(j, 'pot: "Chips."\nflop: "Cards."\n', 'en'), ['flop: klucz spoza źródła (termin bez def albo nieznany)']);
  assert.deepEqual(kontrolaZnacznikow(j, 'inne: "x"\n', 'en'), ['pot: brak definicji w przekładzie', 'inne: klucz spoza źródła (termin bez def albo nieznany)']);
});

test('definicje: żądanie z regułą pliku i glosariuszem terminów z kluczy; segmenty przeglądu po kluczach', () => {
  const root = zDefinicjami();
  const j = jednostkiPrzekladu(root, 'en').find((x) => x.rodzaj === 'definicje');
  const u = budujZadanieBatcha(root, 'en', j, { model: 'claude-opus-5-5', effort: 'medium' }, glosariusz(root)).params.messages[0].content;
  assert.match(u, /definicje terminów słowniczka/);
  assert.match(u, /klucze bez zmian/);
  assert.match(u, /pot: pula → pot/);
  assert.deepEqual(segmenty(j, j.tekst, DEF_EN), [{ klucz: 'pot', pl: 'Żetony postawione w rozdaniu.', tlumaczenie: 'Chips bet in the hand.' }]);
  assert.deepEqual(segmenty(j, j.tekst, null), [{ klucz: 'pot', pl: 'Żetony postawione w rozdaniu.', tlumaczenie: null }]);
});

test('definicje: --zastosuj zapisuje content/en/terms-def.yaml po kontroli (bez sieci)', async () => {
  const root = zDefinicjami(); const wy = mkdtempSync(join(tmpdir(), 'k3a-wy-'));
  const j = jednostkiPrzekladu(root, 'en').find((x) => x.rodzaj === 'definicje');
  const plik = join(wy, 'propozycje.json');
  writeFileSync(plik, JSON.stringify({ jednostki: [{ ...ocenPropozycje(j, 'en', { blad: null, tekst: `<<<PLIK>>>\n${DEF_EN}<<<KONIEC>>>` }) }] }));
  assert.equal(await main(['--zastosuj', plik], {}, { fetchFn: fetchZakazany, log: () => {}, root }), 0);
  assert.equal(readFileSync(join(root, 'content/en/terms-def.yaml'), 'utf8'), DEF_EN);
});
