// Skrypty App Store Connect z Treningu (D-348; Trening scripts/asc/*.mjs i tests/asc-*.test.ts, 2e4b0f8, odczyt 2026-11-09), dostosowane do Szkoły Pokera:
// dane sklepu z store/, identyfikator pakietu z apps/mobile/app.json, produkty z packages/domena/src/konfiguracja.ts. Atrapa API: asc-atrapa.mjs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { atrapa, png, REF_DATA } from './asc-atrapa.mjs';
import * as iap from '../../scripts/asc/iap-localizations.mjs';
import * as meta from '../../scripts/asc/metadane.mjs';
import * as zrzuty from '../../scripts/asc/zrzuty.mjs';
import * as kontrola from '../../scripts/asc/kontrola-oczekiwane.mjs';

const ROOT = new URL('../../', import.meta.url);
const rd = (f) => readFileSync(new URL(f, ROOT), 'utf8');
const js = (f) => JSON.parse(rd(f));
const APP = js('apps/mobile/app.json').expo.ios.bundleIdentifier;
const KONF = rd('packages/domena/src/konfiguracja.ts');
const PRODUKTY_KODU = [...KONF.slice(KONF.indexOf('PRODUKTY_ODBLOKOWUJACE'), KONF.indexOf(']', KONF.indexOf('PRODUKTY_ODBLOKOWUJACE'))).matchAll(/'([\w.]+)'/g)].map((m) => m[1]);
const daneMeta = () => ({ meta: js('store/app-store-metadata.json'), urls: js('store/app-store-urls.json') });
const zapisy = (calls) => calls.filter((c) => c.method !== 'GET');
const log = () => { const l = []; const f = (s) => l.push(String(s)); f.text = () => l.join('\n'); return f; };

test('identyfikator pakietu i produkty = app.json i konfiguracja.ts (jedno źródło prawdy)', () => {
  assert.equal(iap.BUNDLE_ID, APP);
  assert.deepEqual(Object.values(iap.PRODUCTS).map((p) => p.productId), PRODUKTY_KODU);
  assert.deepEqual(Object.values(iap.PRODUCTS).map((p) => p.kind), ['subscription', 'subscription', 'iap']);
});

test('metadane z repo: pl, en-US, ja, zh-Hant, pt-BR, fr-FR i aliasy en-GB/en-CA/en-AU = en-US, fr-CA = fr-FR (D-382 AF); wstawka adresu prywatności podmieniona; walidacja bez błędów', () => {
  const w = meta.buildWanted(daneMeta());
  assert.deepEqual(Object.keys(w).sort(), ['en-AU', 'en-CA', 'en-GB', 'en-US', 'fr-CA', 'fr-FR', 'ja', 'pl', 'pt-BR', 'zh-Hant']);
  assert.deepEqual(w['en-GB'], w['en-US']); assert.deepEqual(w['fr-CA'], w['fr-FR']);
  const url = js('store/app-store-urls.json').privacyPolicyUrl;
  for (const l of ['pl', 'en-US']) { assert.ok(w[l].version.description.includes(url), l); assert.doesNotMatch(w[l].version.description, /\[[A-ZĄĆĘŁŃÓŚŹŻ ]+\]/, l); }
  assert.deepEqual(meta.validate({ wanted: w }), []);
});

test('metadane: pozostała wstawka [DO USTALENIA], limit podtytułu, adres bez https i brak mapowania są błędami; brak marketingUrl nie jest błędem', () => {
  const d = daneMeta(); const m = structuredClone(d.meta);
  m.lokalizacje.pl.promotionalText += ' [DO USTALENIA]'; m.lokalizacje['en-US'].subtitle = 'x'.repeat(31); m.lokalizacje.xx = m.lokalizacje.pl;
  const e = meta.validate({ wanted: meta.buildWanted({ meta: m, urls: { ...d.urls, supportUrl: 'http://a' } }) }).map((x) => `${x.lang}/${x.field}`);
  for (const k of ['pl/promotionalText', 'en-US/subtitle', 'pl/supportUrl', 'xx/*']) assert.ok(e.includes(k), k);
  assert.equal(d.urls.marketingUrl, null);
  assert.ok(!e.some((k) => k.endsWith('/marketingUrl')));
});

test('metadane podgląd: tylko GET, plan „utwórz” dla 10 lokalizacji × 2 obiekty, kod 0; bez wersji: komunikat z krokiem, kod 0', async () => {
  const a = atrapa({ bundleId: APP }); const l = log();
  const r = await meta.run({ client: a.client, data: daneMeta(), log: l });
  assert.equal(r.code, 0); assert.deepEqual(zapisy(a.calls), []);
  assert.equal(r.rows.info.filter((x) => x.action === 'utwórz').length, 10); assert.equal(r.rows.version.filter((x) => x.action === 'utwórz').length, 10);
  assert.ok(!r.rows.version[0].create.marketingUrl, 'marketingUrl null nie jest wysyłany');
  assert.doesNotMatch(l.text(), /ID-/);
  const b = atrapa({ bundleId: APP, wersja: null }); const l2 = log();
  assert.equal((await meta.run({ client: b.client, data: daneMeta(), log: l2 })).code, 0);
  assert.match(l2.text(), /Brak edytowalnej wersji/); assert.match(l2.text(), /Szkoła Pokera/);
});

test('metadane zapis: POST brakujących, PATCH różniących się, nigdy DELETE; drugi przebieg bez zapisów; obca lokalizacja nietknięta', async () => {
  const a = atrapa({ bundleId: APP });
  a.s.verLocs.push({ id: 'ID-de', attributes: { locale: 'de-DE', description: 'x' } });
  a.s.infoLocs.push({ id: 'ID-pl', attributes: { locale: 'pl', name: 'Stara', subtitle: 'x', privacyPolicyUrl: 'https://x' } });
  const r = await meta.run({ client: a.client, data: daneMeta(), zapis: true, log: log() });
  assert.equal(r.code, 0);
  const z = zapisy(a.calls);
  assert.ok(z.every((c) => c.method === 'POST' || c.method === 'PATCH'));
  assert.equal(z.filter((c) => c.method === 'PATCH').length, 1); assert.equal(z.filter((c) => c.method === 'POST').length, 19); // info 9 (pl = PATCH) + wersja 10
  assert.equal(a.s.verLocs.find((x) => x.id === 'ID-de').attributes.description, 'x');
  const przed = a.calls.length; await meta.run({ client: a.client, data: daneMeta(), zapis: true, log: log() });
  assert.deepEqual(zapisy(a.calls.slice(przed)), []);
});

// Zapis 42669012844 (2026-11-09): po utworzeniu appInfoLocalizations Apple samo tworzy appStoreVersionLocalizations tych lokalizacji,
// więc POST wersji z planu sprzed zapisu dał 409 DUPLICATE dla en-*. Plan wersji liczony po ponownym odczycie (PATCH zamiast POST).
test('metadane zapis jak Apple: lokalizacje wersji utworzone przez Apple po appInfo → ponowny odczyt, PATCH zamiast POST, kod 0, bez 409', async () => {
  const a = atrapa({ bundleId: APP, jakApple: true }); const l = log();
  const r = await meta.run({ client: a.client, data: daneMeta(), zapis: true, log: l });
  assert.doesNotMatch(l.text(), /409/); assert.equal(r.code, 0);
  const z = zapisy(a.calls);
  assert.equal(z.filter((c) => c.method === 'POST' && c.path === '/v1/appStoreVersionLocalizations').length, 0);
  assert.equal(z.filter((c) => c.method === 'PATCH' && c.path.startsWith('/v1/appStoreVersionLocalizations/')).length, 10);
  assert.equal(a.s.verLocs.length, 10); assert.ok(a.s.verLocs.every((x) => x.attributes.description), 'opis zapisany we wszystkich 10');
});

test('metadane zapis z błędem walidacji albo bez wersji: kod 1, zero zapisów', async () => {
  const d = daneMeta(); d.meta = structuredClone(d.meta); d.meta.lokalizacje.pl.subtitle = 'x'.repeat(40);
  const a = atrapa({ bundleId: APP });
  assert.equal((await meta.run({ client: a.client, data: d, zapis: true, log: log() })).code, 1); assert.deepEqual(zapisy(a.calls), []);
  const b = atrapa({ bundleId: APP, wersja: 'READY_FOR_SALE' });
  assert.equal((await meta.run({ client: b.client, data: daneMeta(), zapis: true, log: log() })).code, 1); assert.deepEqual(zapisy(b.calls), []);
});

test('klient: DELETE odrzucany przed wysłaniem; błąd bez treści odpowiedzi i bez identyfikatorów; podgląd odrzuca POST', async () => {
  const wysl = []; const fetchFn = async (url, o) => { wysl.push(o.method); return { ok: false, status: 409, json: async () => ({ errors: [{ code: 'X', title: 'T', detail: 'SEKRET' }] }) }; };
  const c = iap.makeClient({ fetchFn, token: 't' });
  await assert.rejects(c.call('DELETE', '/v1/x'), /nigdy nie usuwa/); assert.deepEqual(wysl, []);
  await assert.rejects(c.call('PATCH', '/v1/appInfoLocalizations/0123456789abcdef', {}), (e) => !/SEKRET|0123456789abcdef/.test(e.message) && /409/.test(e.message));
  assert.throws(() => meta.readOnlyClient(c).call('POST', '/v1/x'), /tylko do odczytu/);
});

// Oczko tests/wydanie/asc-produkty.test.ts „klient nie wysyła tokenu na adres spoza…” (45f583d, odczyt 2026-11-09; przegląd bezpieczeństwa Oczka 2026-11-03):
// `links.next` z odpowiedzi to pełny adres — token nie może trafić poza API App Store Connect.
test('klient: token tylko do https://api.appstoreconnect.apple.com/ (obcy host, http, podszyty sufiks → odmowa bez wysyłki)', async () => {
  let wolano = 0; const k = iap.makeClient({ fetchFn: async () => { wolano++; return { ok: true, status: 200, json: async () => ({ data: [] }) }; }, token: 't' });
  const w = [];
  for (const u of ['https://obcy.example/v1/x', 'http://api.appstoreconnect.apple.com/v1/x', 'https://api.appstoreconnect.apple.com.obcy.example/v1/x', 'https://api.appstoreconnect.apple.com/v1/x']) {
    try { await k.call('GET', u); w.push('ok'); } catch { w.push('odmowa'); }
  }
  assert.deepEqual({ w, wolano }, { w: ['odmowa', 'odmowa', 'odmowa', 'ok'], wolano: 1 });
});

// Przegląd D-043 sesji AA (P1-1): identyfikatory Apple w base64 (price pointy, territoryAvailabilities) przechodziły przez maskę [0-9a-f-]{8,}
// do komunikatu błędu → STOP → $GITHUB_STEP_SUMMARY publicznego repo. Komunikat błędu ma tylko szablon ścieżki.
test('klient: błąd na ścieżce z identyfikatorem base64 albo liczbowym → w komunikacie tylko {id}', async () => {
  const k = iap.makeClient({ fetchFn: async () => ({ ok: false, status: 404, json: async () => ({ errors: [{ code: 'NOT_FOUND', title: 'x' }] }) }), token: 't' });
  for (const [p, wzor] of [['/v1/subscriptionPricePoints/eyJzIjoiNjc0NDU2NzgzMyIsInQiOiJBRkcifQ/equalizations?include=territory', '/v1/subscriptionPricePoints/{id}/equalizations'],
    ['/v1/territoryAvailabilities/ZXhhbXBsZTEyMw', '/v1/territoryAvailabilities/{id}'], ['/v1/apps/1234567890/appAvailabilityV2', '/v1/apps/{id}/appAvailabilityV2'], ['/v1/territories', '/v1/territories']]) {
    const e = await k.call('GET', p).catch((x) => x);
    assert.ok(e.message.startsWith(`GET ${wzor} → 404`), e.message); assert.doesNotMatch(e.message, /eyJ|ZXhh|1234567890/);
  }
});

test('store/iap-localizations.json: pl → pl, en → en-US; teksty = słownik aplikacji (purchase.*), limity 30/45; bez języków spoza wydanych', () => {
  const d = js('store/iap-localizations.json');
  assert.deepEqual(d.wpisaneRecznie, {});
  assert.deepEqual(Object.fromEntries(Object.entries(d.tlumaczenia).map(([k, v]) => [k, v.ascLocale])), { pl: 'pl', en: 'en-US' });
  const zdanie = (s) => s.match(/^[^.]+\./)[0];
  for (const [jezyk, t] of Object.entries(d.tlumaczenia)) {
    const p = js(`apps/mobile/src/i18n/locales/${jezyk}.json`).purchase;
    assert.deepEqual(t.group, { name: p.title }, jezyk);
    assert.deepEqual(t.kwartal, { name: p.plan.quarter, description: zdanie(p.renewsQuarter) }, jezyk);
    assert.deepEqual(t.rok, { name: p.plan.year, description: zdanie(p.renewsYear) }, jezyk);
    assert.deepEqual(t.dozywotni, { name: p.plan.lifetime, description: p.oneTime }, jezyk);
    for (const k of ['group', ...Object.keys(iap.PRODUCTS)]) {
      assert.ok([...t[k].name].length <= d.limity.nazwa, `${jezyk}/${k}`);
      if (t[k].description) assert.ok([...t[k].description].length <= d.limity.opis, `${jezyk}/${k}`);
    }
  }
});

test('lokalizacje IAP dry-run: grupa znaleziona po produktach (bez ID na sztywno), 4 obiekty × 2 języki „utwórz”, tylko GET; apply: 8 × POST, drugi przebieg bez zapisów', async () => {
  const d = js('store/iap-localizations.json');
  const a = atrapa({ bundleId: APP, produkty: Object.values(iap.PRODUCTS), grupaInnychSubskrypcji: true }); const l = log();
  const r = await iap.run({ client: a.client, data: d, log: l });
  assert.equal(r.code, 0); assert.equal(r.counts['utwórz'], 8); assert.deepEqual(zapisy(a.calls), []);
  assert.doesNotMatch(l.text(), /ID-/);
  const r2 = await iap.run({ client: a.client, data: d, apply: true, log: log() });
  assert.equal(r2.code, 0); assert.equal(zapisy(a.calls).filter((c) => c.method === 'POST').length, 8);
  const przed = a.calls.length; const r3 = await iap.run({ client: a.client, data: d, apply: true, log: log() });
  assert.equal(r3.counts['pomiń'], 8); assert.deepEqual(zapisy(a.calls.slice(przed)), []);
  assert.ok(!a.calls.some((c) => c.method === 'DELETE'));
});

test('lokalizacje IAP: brak produktów w ASC = problem i kod 1, zero zapisów nawet w apply', async () => {
  const a = atrapa({ bundleId: APP }); const l = log();
  const r = await iap.run({ client: a.client, data: js('store/iap-localizations.json'), apply: true, log: l });
  assert.equal(r.code, 1); assert.ok(r.problems.length >= 1); assert.deepEqual(zapisy(a.calls), []);
});

test('JWT ES256: aud, iss, exp = iat + 10 min, podpis 64 bajty', async () => {
  const { generateKeyPairSync } = await import('node:crypto');
  const { privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });
  const t = iap.makeJwt({ keyId: 'K', issuerId: 'I', keyPem: privateKey.export({ type: 'pkcs8', format: 'pem' }), now: 1000 });
  const [h, b, s] = t.split('.').map((x) => Buffer.from(x, 'base64url'));
  assert.deepEqual(JSON.parse(h), { alg: 'ES256', kid: 'K', typ: 'JWT' });
  assert.deepEqual(JSON.parse(b), { iss: 'I', iat: 1000, exp: 1600, aud: 'appstoreconnect-v1' }); assert.equal(s.length, 64);
});

test('zrzuty: pl → pl, en → 4 lokalizacje angielskie; cele w LOCALE_MAP; nazwa referencyjna z prefiksem Szkoły Pokera', () => {
  assert.deepEqual(zrzuty.SHOT_LOCALES, { pl: ['pl'], en: ['en-US', 'en-GB', 'en-CA', 'en-AU'] });
  for (const l of Object.values(zrzuty.SHOT_LOCALES).flat()) assert.ok(meta.LOCALE_MAP[l], l);
  assert.match(rd('scripts/asc/zrzuty.mjs'), /`szkolapokera-1\.0\/\$\{r\.source\}/);
  assert.doesNotMatch(rd('scripts/asc/zrzuty.mjs'), /trening-1\.0/);
});

test('zrzuty dry-run z katalogu jak artefakt store-screenshots.yml (sklep-zrzuty/<rozmiar>/<język>/NN-ekran.png): tylko GET, en na 4 lokalizacje, alfa to błąd', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'asc-zrzuty-'));
  for (const l of ['pl', 'en']) { mkdirSync(join(dir, l)); writeFileSync(join(dir, l, '01-dzis.png'), png(1320, 2868)); writeFileSync(join(dir, l, '02-lekcja.png'), png(1320, 2868)); }
  const a = atrapa({ bundleId: APP });
  for (const locale of ['pl', 'en-US', 'en-GB', 'en-CA', 'en-AU']) a.s.verLocs.push({ id: `ID-${locale}`, attributes: { locale } });
  const { shots, problems } = zrzuty.loadShots({ iphone: dir });
  assert.deepEqual(problems, []);
  const r = await zrzuty.run({ client: a.client, fetchFn: async () => { throw new Error('PUT w dry-run'); }, shots, log: log() });
  assert.equal(r.code, 0); assert.deepEqual(zapisy(a.calls), []);
  assert.deepEqual(r.rows.filter((x) => x.action === 'wgraj').map((x) => x.locale).sort(), ['en-AU', 'en-CA', 'en-GB', 'en-US', 'pl']);
  writeFileSync(join(dir, 'pl', '03-alfa.png'), png(1320, 2868, 6));
  const b = atrapa({ bundleId: APP }); b.s.verLocs.push({ id: 'ID-pl', attributes: { locale: 'pl' } });
  assert.equal((await zrzuty.run({ client: b.client, fetchFn: async () => ({ ok: true }), shots: zrzuty.loadShots({ iphone: dir }).shots, apply: true, log: log() })).code, 1);
  assert.deepEqual(zapisy(b.calls), []);
  assert.equal(REF_DATA.placementTypes.length, 1);
});

test('kontrola: store/asc-kontrola.json zgodna z kodem i docs/monetyzacja.md (pakiet, produkty, ceny USA, bez ofert, Family Sharing wył.)', () => {
  const c = js('store/asc-kontrola.json');
  assert.equal(c.aplikacja.bundleId, APP);
  assert.deepEqual(c.produkty.map((p) => p.productId), PRODUKTY_KODU);
  assert.deepEqual(c.produkty.map((p) => p.rodzaj), ['subskrypcja', 'subskrypcja', 'jednorazowy']);
  const doc = rd('docs/monetyzacja.md');
  for (const p of c.produkty) {
    const wiersz = doc.split('\n').find((l) => l.startsWith(`| \`${p.productId}\` |`));
    const usd = Number(wiersz.match(/\| ([\d,]+) USD \|/)[1].replace(',', '.'));
    assert.equal(c.ceny[p.klucz].USA, usd, p.klucz); assert.equal(c.rodzina[p.klucz], false, p.klucz);
  }
  assert.deepEqual(c.oferta, { produkty: ['kwartal', 'rok'], brak: true });
  assert.ok(!c.terytoria.wybrane.includes('POL'), 'bez storefrontu PL (CLAUDE.md)');
  assert.ok(existsSync(new URL(c.adresy.plik, ROOT)));
  assert.equal(c.uwagiRecenzenta.plik, 'store/review-notes.en.txt');
  assert.deepEqual(c.metadane.zrodla.map((z) => z.plik), ['store/asc-kontrola-oczekiwane.json']);
});

// Z-01 (D-360): kategoria główna Education, dodatkowa brak (null = narzędzie tylko wypisuje). Z-02 (D-301, D-362): dostępność aplikacji = 166 storefrontów
// z docs/sklep/dowody/storefronty-1.0.json (to samo wejście co asc-produkty); ceny: próbka 8 rynków z CLAUDE.md + grupa „storefronty-1.0” (166, kwota null
// = narzędzie wypisuje jedną linię na produkt z krajami bez ceny), żeby kontrola widziała brak ceny w każdym kraju listy.
test('kontrola: kategoria EDUCATION (D-360); dostępność i grupa cen = 166 storefrontów z storefronty-1.0.json (D-301/D-362); próbka rynków ⊂ listy', () => {
  const c = js('store/asc-kontrola.json'); const l = js('docs/sklep/dowody/storefronty-1.0.json').wlaczone_iso3;
  assert.deepEqual(c.kategoria, { glowna: 'EDUCATION', dodatkowa: null });
  assert.deepEqual(c.dostepnosc.terytoria, l);
  assert.deepEqual(c.terytoria.grupy, { 'storefronty-1.0': l });
  for (const k of ['kwartal', 'rok', 'dozywotni']) assert.equal(c.ceny[k]['storefronty-1.0'], null, k);
  for (const t of c.terytoria.wybrane) assert.ok(l.includes(t), t);
});

// Z-03 (sesja Z, asc-reczne-wartosci.md §4): w notatkach dla recenzenta same etykiety interfejsu, bez kluczy słownika w nawiasach;
// każda etykieta, do której notatki odsyłają, = tekst z en.json (recenzent widzi aplikację po angielsku).
test('notatki dla recenzenta: bez kluczy słownika w nawiasach; etykiety = en.json', () => {
  const en = js('apps/mobile/src/i18n/locales/en.json'); const t = (k) => k.split('.').reduce((o, x) => o?.[x], en);
  const etykiety = ['placement.skip', 'tabs.today', 'today.practice', 'start.begin', 'session.end', 'start.fullAccess', 'purchase.restore', 'settings.manage', 'data.title', 'settings.reset', 'settings.help'];
  for (const f of ['store/review-notes.en.txt', 'store/review-notes.md']) {
    const tekst = f.endsWith('.md') ? rd(f).split('```text')[1].split('```')[0] : rd(f);
    assert.doesNotMatch(tekst, /\((?:[a-z]+[A-Z]?[a-z]*\.)+[a-zA-Z]+\)/, `${f}: klucz w nawiasie`);
    for (const k of etykiety) { assert.equal(typeof t(k), 'string', k); assert.ok(tekst.includes(`"${t(k)}"`), `${f}: „${t(k)}” (${k})`); }
  }
});

test('kontrola: pliki generowane aktualne (--check); oczekiwane lokalizacje = lokalizacje metadanych z aliasami; notatki = blok EN', () => {
  execFileSync(process.execPath, [new URL('scripts/asc/kontrola-oczekiwane.mjs', ROOT).pathname, '--check'], { stdio: 'pipe' });
  assert.deepEqual(Object.keys(js('store/asc-kontrola-oczekiwane.json').lokalizacje).sort(), ['en-AU', 'en-CA', 'en-GB', 'en-US', 'fr-CA', 'fr-FR', 'ja', 'pl', 'pt-BR', 'zh-Hant']);
  const en = rd('store/review-notes.en.txt');
  assert.ok(en.startsWith('Thank you for reviewing PokerGym.')); assert.ok(rd('store/review-notes.md').includes(en.trim()));
  assert.ok(Buffer.byteLength(en.trim()) <= 4000);
  assert.equal(kontrola.OUT_NOTES, 'store/review-notes.en.txt');
});

test('lokalizacje IAP: produkty w dwóch grupach subskrypcji = problem (niejednoznaczne), kod 1, zero zapisów', async () => {
  const a = atrapa({ bundleId: APP, produkty: Object.values(iap.PRODUCTS) });
  a.s.groups.push({ id: 'ID-grupa2', attributes: {} }); a.s.subs.push({ id: 'ID-s2', attributes: { productId: iap.PRODUCTS.kwartal.productId }, group: 'ID-grupa2' });
  const r = await iap.run({ client: a.client, data: js('store/iap-localizations.json'), apply: true, log: log() });
  assert.equal(r.code, 1); assert.match(r.problems.join(), /znaleziono 2/); assert.deepEqual(zapisy(a.calls), []);
});
