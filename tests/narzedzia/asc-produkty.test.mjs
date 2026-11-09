// Workflow asc-produkty (D-356): grupa subskrypcji „pelny”, kwartał i rok (subskrypcje odnawiane), dożywotni (Non-Consumable), ceny z kraju bazowego USA,
// dostępność produktów i APLIKACJI = 166 storefrontów (D-301/D-362). Port testów z Oczka (tests/wydanie/asc-produkty.test.ts, 45f583d, odczyt 2026-11-09)
// na node:test i atrapie tests/narzedzia/asc-atrapa-produkty.mjs; nic nie łączy się z Apple. Odstępstwa od Oczka nazwane w D-364.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { utworzAtrape, TERYTORIA } from './asc-atrapa-produkty.mjs';
import { makeClient, PRODUCTS, BUNDLE_ID } from '../../scripts/asc/iap-localizations.mjs';
import * as P from '../../scripts/asc/produkty.mjs';

const ROOT = new URL('../../', import.meta.url);
const rd = (f) => readFileSync(new URL(f, ROOT), 'utf8');
const js = (f) => JSON.parse(rd(f));
const LISTA = ['USA', 'DEU', 'JPN', 'FRA', 'GBR', 'BOL']; // atrapa ma też POL, CHN, XKS — poza listą
const dane = (zmiany = {}) => ({ ...js('store/produkty.json'), terytoria: LISTA, ...zmiany });
const ID = { kwartal: PRODUCTS.kwartal.productId, rok: PRODUCTS.rok.productId, dozywotni: PRODUCTS.dozywotni.productId };

async function uruchom({ stan, kroki, d = dane() }) {
  const a = utworzAtrape({ stan, bundleId: BUNDLE_ID });
  const client = makeClient({ fetchFn: a.fetchFn, token: 'TOKEN-TESTOWY', sleep: async () => {} });
  const wyniki = [];
  for (const k of kroki) {
    const od = a.calls.length; const log = [];
    const w = await P.run({ client, data: d, apply: !!k.apply, log: (t) => log.push(String(t)) });
    const nowe = a.calls.slice(od);
    wyniki.push({ ...w, akcje: w.plan.akcje, stop: w.plan.stop, nieodwracalne: w.plan.nieodwracalne, zapisy: nowe.filter((c) => c.m !== 'GET'), log: log.join('\n') });
  }
  return { kroki: wyniki, s: a.s, calls: a.calls };
}
const ILE = (k, t) => k.akcje.filter((a) => a.typ === t).length;

test('dane: store/produkty.json = monetyzacja.md (9,99 / 14,99 / 19,99 USD, okresy), ADR 0006 (grupa „pelny”), asc-kontrola.json (ceny USA, Family Sharing wył.); bez ofert', () => {
  const p = js('store/produkty.json'); const mon = rd('docs/monetyzacja.md'); const k = js('store/asc-kontrola.json');
  assert.deepEqual(Object.keys(p.produkty), Object.keys(PRODUCTS));
  assert.deepEqual([p.produkty.kwartal.okres, p.produkty.kwartal.cenaBazowa], ['THREE_MONTHS', '9.99']);
  assert.deepEqual([p.produkty.rok.okres, p.produkty.rok.cenaBazowa], ['ONE_YEAR', '14.99']);
  assert.deepEqual([p.produkty.dozywotni.typ, p.produkty.dozywotni.cenaBazowa], ['NON_CONSUMABLE', '19.99']);
  for (const c of ['9,99 USD', '14,99 USD', '19,99 USD']) assert.ok(mon.includes(c), c);
  assert.match(mon, /subskrypcja odnawiana, 3 miesiące, grupa „pelny”/); assert.match(rd('docs/adr/0006-platnosci-expo-iap.md'), /grupa subskrypcji „pelny”/);
  assert.equal(p.grupa.referenceName, 'pelny');
  for (const [kl, pr] of Object.entries(p.produkty)) assert.equal(Number(pr.cenaBazowa), k.ceny[kl].USA, kl);
  assert.equal(p.krajBazowy, 'USA'); assert.equal(p.familySharing, false);
  assert.deepEqual(Object.values(k.rodzina), [false, false, false]); assert.match(mon, /Family Sharing wył\./);
  assert.deepEqual(p.nadpisaniaCen, {}); assert.doesNotMatch(JSON.stringify(p.produkty), /intro|offer|trial/i);
  assert.equal(p.dostepnosc.noweTerytoria, false);
  assert.doesNotMatch(rd('scripts/asc/produkty.mjs'), /szkolapokera\.(kwartal|rok|dozywotni)/, 'Product ID tylko w PRODUCTS');
});

test('dane: lista storefrontów 1.0 = 166 unikalnych kodów, bez POL, VNM, TUR, KOR, CHN, AFG, GAB, MAR; USA na liście; workflow czyta tę listę', () => {
  const sf = js('docs/sklep/dowody/storefronty-1.0.json'); const p = js('store/produkty.json');
  assert.equal(p.dostepnosc.plik, 'docs/sklep/dowody/storefronty-1.0.json');
  const l = sf[p.dostepnosc.pole];
  assert.equal(l.length, 166); assert.equal(new Set(l).size, 166); assert.equal(sf.liczba, 166);
  for (const x of ['POL', 'VNM', 'TUR', 'KOR', 'CHN', 'AFG', 'GAB', 'MAR']) assert.ok(!l.includes(x), x);
  assert.ok(l.includes('USA'));
  assert.deepEqual(P.wczytajDane(new URL('store/produkty.json', ROOT)).terytoria, l);
});

test('plan na pustym App Store Connect: dostępność aplikacji, grupa, 2 subskrypcje, zakup jednorazowy, ceny i dostępność; tylko GET; bez NIEODWRACALNYCH (Family Sharing wył.)', async () => {
  const { kroki: [k] } = await uruchom({ kroki: [{}] });
  assert.equal(k.code, 0); assert.deepEqual(k.stop, []); assert.deepEqual(k.zapisy, []);
  assert.equal(ILE(k, 'aplikacja:dostepnosc'), 1); assert.equal(k.akcje.find((a) => a.typ === 'aplikacja:dostepnosc').ile, LISTA.length);
  assert.equal(ILE(k, 'grupa:utworz'), 1); assert.equal(ILE(k, 'subskrypcja:utworz'), 2); assert.equal(ILE(k, 'iap:utworz'), 1);
  assert.equal(ILE(k, 'subskrypcja:ceny'), 2); assert.equal(ILE(k, 'iap:cena'), 1);
  assert.equal(ILE(k, 'subskrypcja:dostepnosc'), 2); assert.equal(ILE(k, 'iap:dostepnosc'), 1);
  assert.deepEqual(k.nieodwracalne, []);
  assert.doesNotMatch(k.log, /TOKEN-TESTOWY|Bearer|PRIVATE KEY|eyJ|APP1/);
});

test('zapis na pustym: produkty z okresem, typem, bez Family Sharing; ceny USA z planu i równoważniki tylko w krajach listy; dostępność = lista, nowe terytoria wył.; drugi przebieg bez zmian; nigdy DELETE', async () => {
  const w = await uruchom({ kroki: [{ apply: true }, {}, { apply: true }] });
  const [z, plan2, z2] = w.kroki;
  assert.equal(z.code, 0, z.log);
  assert.deepEqual(w.s.grupy.map((g) => g.referenceName), ['pelny']);
  assert.deepEqual(w.s.subskrypcje.map((x) => `${x.productId}:${x.okres}:${x.fs}:${x.poziom}`).sort(), [`${ID.kwartal}:THREE_MONTHS:false:1`, `${ID.rok}:ONE_YEAR:false:1`]);
  assert.deepEqual(w.s.iap.map((x) => `${x.productId}:${x.typ}:${x.fs}`), [`${ID.dozywotni}:NON_CONSUMABLE:false`]);
  for (const [kl, usa] of [['kwartal', 'USA:9.99'], ['rok', 'USA:14.99']]) {
    const sid = w.s.subskrypcje.find((x) => x.productId === ID[kl]).id; const c = w.s.ceny.filter((x) => x.sub === sid);
    assert.deepEqual(c.map((x) => x.kraj).sort(), [...LISTA].sort(), kl); assert.equal(c.find((x) => x.kraj === 'USA').punkt, usa);
  }
  assert.deepEqual(w.s.harmonogramy.map((h) => [h.baza, h.reczne.map((x) => x.punkt)]), [['USA', ['USA:19.99']]]);
  for (const d of [...w.s.dostSub, ...w.s.dostIap]) { assert.deepEqual([...d.kraje].sort(), [...LISTA].sort()); assert.equal(d.nowe, false); }
  assert.equal(w.s.dostSub.length, 2); assert.equal(w.s.dostIap.length, 1);
  const app = w.s.dostApp; assert.equal(app.nowe, false); assert.equal(app.wpisy.length, TERYTORIA.length);
  assert.deepEqual(app.wpisy.filter((x) => x.available).map((x) => x.kraj).sort(), [...LISTA].sort());
  assert.deepEqual(app.wpisy.filter((x) => !x.available).map((x) => x.kraj).sort(), ['CHN', 'POL', 'XKS']);
  assert.deepEqual(plan2.akcje, []); assert.deepEqual(plan2.stop, []); assert.deepEqual(z2.zapisy, []); assert.equal(z2.code, 0);
  assert.ok(!w.calls.some((c) => c.m === 'DELETE')); assert.ok(!w.calls.some((c) => c.m === 'PATCH'), 'na pustym tylko POST');
});

test('kod z listy nieznany w App Store Connect (np. „BO” zamiast BOL) → STOP z kodem; zapis nic nie robi', async () => {
  const w = await uruchom({ d: dane({ terytoria: ['USA', 'BO', 'DEU'] }), kroki: [{}, { apply: true }] });
  for (const k of w.kroki) { assert.equal(k.code, 1); assert.match(k.stop.join(' '), /\bBO\b/); }
  assert.deepEqual(w.kroki[1].zapisy, []); assert.equal(w.s.dostApp, null); assert.deepEqual(w.s.grupy, []);
});

test('kraj bazowy spoza listy → STOP', async () => {
  const { kroki: [k] } = await uruchom({ d: dane({ terytoria: ['DEU', 'JPN'] }), kroki: [{}] });
  assert.equal(k.code, 1); assert.match(k.stop.join(' '), /USA/);
});

test('istniejąca dostępność aplikacji: kraj z listy wyłączony → PATCH available; kraj spoza listy włączony albo nowe terytoria wł. → STOP (nie wyłączam sam)', async () => {
  const wpisy = TERYTORIA.map((kraj, i) => ({ id: `TA${i}`, kraj, available: LISTA.includes(kraj) && kraj !== 'DEU' }));
  const w = await uruchom({ stan: { dostApp: { id: 'AA0', nowe: false, wpisy } }, kroki: [{}, { apply: true }, {}] });
  const k = w.kroki[0]; assert.deepEqual(k.stop, []);
  assert.equal(k.akcje.find((a) => a.typ === 'aplikacja:wlacz').ile, 1); assert.match(k.akcje.find((a) => a.typ === 'aplikacja:wlacz').opis, /DEU/);
  assert.equal(w.kroki[1].code, 0, w.kroki[1].log); assert.ok(w.s.dostApp.wpisy.find((x) => x.kraj === 'DEU').available);
  assert.equal(ILE(w.kroki[2], 'aplikacja:wlacz'), 0);
  const zle = TERYTORIA.map((kraj, i) => ({ id: `TA${i}`, kraj, available: LISTA.includes(kraj) || kraj === 'POL' }));
  const v = await uruchom({ stan: { dostApp: { id: 'AA0', nowe: true, wpisy: zle } }, kroki: [{ apply: true }] });
  assert.equal(v.kroki[0].code, 1); assert.match(v.kroki[0].stop.join(' '), /POL/); assert.match(v.kroki[0].stop.join(' '), /nowe terytoria/i);
  assert.deepEqual(v.kroki[0].zapisy, []);
});

test('dostępność istniejącego produktu z krajem spoza listy → STOP; z nowymi terytoriami wł. → ponowny POST z wył.', async () => {
  const grupa = { id: 'GX', referenceName: 'pelny' };
  const kw = { id: 'SX', grupa: 'GX', productId: ID.kwartal, name: 'x', okres: 'THREE_MONTHS', fs: false, poziom: 1 };
  const w = await uruchom({ stan: { grupy: [grupa], subskrypcje: [kw], dostSub: [{ id: 'DA', sub: 'SX', nowe: false, kraje: [...LISTA, 'POL'] }] }, kroki: [{ apply: true }] });
  assert.equal(w.kroki[0].code, 1); assert.match(w.kroki[0].stop.join(' '), new RegExp(`${ID.kwartal.replace(/\./g, '\\.')}.*POL`)); assert.deepEqual(w.kroki[0].zapisy, []);
  const v = await uruchom({ stan: { grupy: [grupa], subskrypcje: [kw], dostSub: [{ id: 'DA', sub: 'SX', nowe: true, kraje: LISTA }] }, kroki: [{}, { apply: true }] });
  assert.equal(v.kroki[0].akcje.find((a) => a.typ === 'subskrypcja:dostepnosc' && a.klucz === 'kwartal').ile, 0);
  assert.equal(v.s.dostSub.find((x) => x.sub === 'SX').nowe, false);
});

test('STOP zamiast zmiany istniejącego produktu: inny okres, inna cena USA, inny typ; zapis nie rusza niczego', async () => {
  const grupa = { id: 'GX', referenceName: 'pelny' };
  const kw = (x = {}) => ({ id: 'SX', grupa: 'GX', productId: ID.kwartal, name: 'x', okres: 'THREE_MONTHS', fs: false, poziom: 1, ...x });
  const a = await uruchom({ stan: { grupy: [grupa], subskrypcje: [kw({ okres: 'ONE_MONTH' })] }, kroki: [{ apply: true }] });
  assert.match(a.kroki[0].stop.join(' '), /ONE_MONTH/); assert.deepEqual(a.kroki[0].zapisy, []); assert.equal(a.s.subskrypcje.length, 1);
  const b = await uruchom({ stan: { grupy: [grupa], subskrypcje: [kw()], ceny: [{ id: 'C1', sub: 'SX', kraj: 'USA', punkt: 'USA:1.99' }] }, kroki: [{ apply: true }] });
  assert.match(b.kroki[0].stop.join(' '), /USA.*1\.99.*9\.99/); assert.deepEqual(b.kroki[0].zapisy, []);
  const c = await uruchom({ stan: { iap: [{ id: 'IX', productId: ID.dozywotni, name: 'x', typ: 'CONSUMABLE', fs: false }] }, kroki: [{ apply: true }] });
  assert.match(c.kroki[0].stop.join(' '), /CONSUMABLE/); assert.deepEqual(c.kroki[0].zapisy, []);
});

test('grupa: subskrypcje Szkoły w grupie o innej nazwie → ta grupa (bez drugiej „pelny”); dwie pasujące grupy → STOP', async () => {
  const kw = { id: 'SX', grupa: 'GY', productId: ID.kwartal, name: 'x', okres: 'THREE_MONTHS', fs: false, poziom: 1 };
  const w = await uruchom({ stan: { grupy: [{ id: 'GY', referenceName: 'inna' }], subskrypcje: [kw] }, kroki: [{}] });
  assert.equal(ILE(w.kroki[0], 'grupa:utworz'), 0); assert.equal(ILE(w.kroki[0], 'subskrypcja:utworz'), 1);
  const v = await uruchom({ stan: { grupy: [{ id: 'GY', referenceName: 'inna' }, { id: 'GX', referenceName: 'pelny' }], subskrypcje: [kw] }, kroki: [{ apply: true }] });
  assert.equal(v.kroki[0].code, 1); assert.match(v.kroki[0].stop.join(' '), /grup/); assert.deepEqual(v.kroki[0].zapisy, []);
});

test('tryb planu: klient tylko do odczytu (POST/PATCH/DELETE odrzucone przed wysłaniem)', async () => {
  let wolano = 0; const k = P.tylkoOdczyt(makeClient({ fetchFn: async () => { wolano++; return { ok: true, status: 200, json: async () => ({ data: [] }) }; }, token: 't' }));
  const w = [];
  for (const m of ['POST', 'PATCH', 'DELETE', 'GET']) { try { await k.call(m, '/v1/x', {}); w.push(`${m}:ok`); } catch { w.push(`${m}:odmowa`); } }
  assert.deepEqual(w, ['POST:odmowa', 'PATCH:odmowa', 'DELETE:odmowa', 'GET:ok']); assert.equal(wolano, 1);
  assert.doesNotMatch(rd('scripts/asc/produkty.mjs'), /call\(\s*['"]DELETE['"]/);
});
