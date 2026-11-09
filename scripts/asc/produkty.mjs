// Produkty zakupu w App Store Connect przez API: grupa subskrypcji „pelny”, kwartał i rok (subskrypcje odnawiane), dożywotni (Non-Consumable), ceny,
// dostępność produktów i dostępność APLIKACJI (D-356). Port z Oczka (scripts/asc/produkty.mjs, gałąź claude/jolly-thompson-paz6d8 @45f583d, odczyt 2026-11-09).
// Odstępstwa od Oczka (nazwane, D-364): (1) kraje = lista storefrontów 1.0 (docs/sklep/dowody/storefronty-1.0.json, 166, D-301/D-362), nie „wszystkie poza
// wykluczonymi”; kod z listy nieznany w GET /v1/territories = STOP; (2) nowe terytoria Apple WYŁĄCZONE (CLAUDE.md: kolejne storefronty dopiero po sprawdzeniu
// legalności, D-292) — Oczko włącza; (3) Family Sharing wyłączone z danych (docs/monetyzacja.md, bramka E2) — Oczko włącza; (4) dodana dostępność aplikacji v2
// (POST /v2/appAvailabilities, PATCH /v1/territoryAvailabilities/{id}; dokumentacja Apple, odczyt 2026-11-09) — Oczko jej nie ustawia;
// (5) grupa: ta, w której są już subskrypcje Szkoły, inaczej po nazwie referencyjnej; (6) bez cen ręcznych (równoważniki Apple).
// Dane: store/produkty.json; Product ID tylko w stałej PRODUCTS (iap-localizations.mjs = packages/domena/src/konfiguracja.ts).
//   node scripts/asc/produkty.mjs            → plan bez zmian (--dry-run, domyślnie; klient tylko GET)
//   node scripts/asc/produkty.mjs --apply    → tworzy brakujące (kolejność: dostępność aplikacji, grupa, produkt, dostępność, ceny)
// Zasady: tylko GET/POST/PATCH, NIGDY DELETE; idempotentny; nigdy nie zmienia Product ID, nazwy referencyjnej, typu, okresu ani istniejącej ceny;
// niczego nie wyłącza — kraj spoza listy włączony w ASC albo włączone nowe terytoria = STOP (rozstrzyga właściciel w App Store Connect).
// Przy jakimkolwiek STOP zapis nie rusza niczego. Bez „Add for Review”, bez ofert wprowadzających.
// Repozytorium publiczne — w logu tylko liczby, kody krajów, Product ID i nazwy; nigdy identyfikatory, tokeny ani odpowiedzi API.
// Dane logowania: ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_PATH (plik .p8).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { makeClient, makeJwt, BUNDLE_ID, PRODUCTS } from './iap-localizations.mjs';

const SUBS = Object.entries(PRODUCTS).filter(([, p]) => p.kind === 'subscription').map(([k]) => k);
const IAPS = Object.entries(PRODUCTS).filter(([, p]) => p.kind === 'iap').map(([k]) => k);
const rowna = (a, b) => Number(a) === Number(b);
const nie404 = e => { if (e?.status !== 404) throw e; return null; };
const kraj = (r, rel) => r.relationships?.[rel]?.data?.id ?? null;

/** Dane z pliku + lista terytoriów z pliku storefrontów (jedno źródło: docs/sklep/dowody/storefronty-1.0.json). */
export function wczytajDane(url = new URL('../../store/produkty.json', import.meta.url)) {
  const data = JSON.parse(readFileSync(url, 'utf8'));
  const sf = JSON.parse(readFileSync(new URL(`../${data.dostepnosc.plik}`, url), 'utf8'));
  return { ...data, terytoria: sf[data.dostepnosc.pole] };
}

/** Ceny wskazane przez Apple dla jednego produktu: poziom ceny kraju bazowego i równoważniki w krajach listy (Oczko: ustalCeny). */
export async function ustalCeny(client, { rodzaj, id, klucz, data, dozwolone }) {
  const baza = data.krajBazowy; const cena = data.produkty[klucz].cenaBazowa;
  const sciezka = rodzaj === 'sub' ? `/v1/subscriptions/${id}/pricePoints` : `/v2/inAppPurchases/${id}/pricePoints`;
  const punkty = async k => client.list(`${sciezka}?filter[territory]=${k}&include=territory`);
  const bazowe = await punkty(baza);
  const pb = bazowe.find(p => rowna(p.attributes?.customerPrice, cena));
  if (!pb) throw new Error(`brak poziomu ceny ${cena} w kraju bazowym ${baza} dla ${PRODUCTS[klucz].productId}`);
  const rownowazniki = new Map();
  if (rodzaj === 'sub') for (const p of await client.list(`/v1/subscriptionPricePoints/${pb.id}/equalizations?include=territory`)) { const k = kraj(p, 'territory'); if (k && k !== baza && dozwolone.has(k)) rownowazniki.set(k, p.id); }
  const nadpisania = new Map();
  for (const [k, ceny] of Object.entries(data.nadpisaniaCen ?? {})) {
    if (ceny[klucz] === undefined || !dozwolone.has(k)) continue;
    const p = (await punkty(k)).find(x => rowna(x.attributes?.customerPrice, ceny[klucz]));
    if (!p) throw new Error(`brak poziomu ceny ${ceny[klucz]} w kraju ${k} dla ${PRODUCTS[klucz].productId}`);
    nadpisania.set(k, p.id);
  }
  const nazwyPunktow = new Map(bazowe.map(p => [p.id, p.attributes?.customerPrice]));
  return { bazaPunkt: pb.id, cena, rownowazniki, nadpisania, nazwyPunktow };
}

/** Odczyt stanu App Store Connect (tylko GET). */
export async function odczytajStan(client, data) {
  const apps = await client.list('/v1/apps?filter[bundleId]=' + BUNDLE_ID);
  if (apps.length !== 1) throw new Error(`aplikacja ${BUNDLE_ID}: znaleziono ${apps.length}`);
  const appId = apps[0].id;
  const wszystkie = (await client.list('/v1/territories')).map(t => t.id);
  const nieznane = data.terytoria.filter(c => !wszystkie.includes(c));
  const kraje = data.terytoria.filter(c => wszystkie.includes(c));
  const dozwolone = new Set(kraje);
  const st = { appId, wszystkie, kraje, dozwolone, nieznane, grupa: null, produkty: {}, aplikacja: null };
  // dostępność aplikacji (v2): GET /v1/apps/{id}/appAvailabilityV2 (404 = jeszcze nie ustawiona)
  const da = await client.call('GET', `/v1/apps/${appId}/appAvailabilityV2`).catch(nie404);
  if (da?.data) {
    const wpisy = await client.list(`/v2/appAvailabilities/${da.data.id}/territoryAvailabilities?include=territory`);
    st.aplikacja = { nowe: !!da.data.attributes?.availableInNewTerritories, wpisy: new Map(wpisy.map(w => [kraj(w, 'territory'), { id: w.id, available: !!w.attributes?.available }])) };
  }
  // grupa: ta z subskrypcjami Szkoły; bez nich — po nazwie referencyjnej (ADR 0006: „pelny”)
  const naszeId = SUBS.map(k => PRODUCTS[k].productId);
  const grupy = [];
  for (const g of await client.list(`/v1/apps/${appId}/subscriptionGroups`)) grupy.push({ g, subs: await client.list(`/v1/subscriptionGroups/${g.id}/subscriptions`) });
  const zNaszymi = grupy.filter(x => x.subs.some(s => naszeId.includes(s.attributes?.productId)));
  const poNazwie = grupy.filter(x => x.g.attributes?.referenceName === data.grupa.referenceName);
  const kandydaci = zNaszymi.length ? zNaszymi : poNazwie;
  if (zNaszymi.length > 1 || (!zNaszymi.length && poNazwie.length > 1) || (zNaszymi.length === 1 && poNazwie.some(x => x !== zNaszymi[0]))) st.zdublowanaGrupa = new Set([...zNaszymi, ...poNazwie]).size;
  st.grupa = kandydaci[0]?.g ?? null;
  const subs = kandydaci[0]?.subs ?? [];
  for (const klucz of SUBS) {
    const p = subs.find(x => x.attributes?.productId === PRODUCTS[klucz].productId);
    if (!p) { st.produkty[klucz] = null; continue; }
    const wpisy = await client.list(`/v1/subscriptions/${p.id}/prices?include=subscriptionPricePoint,territory`);
    const ceny = new Map(wpisy.map(w => [kraj(w, 'territory'), kraj(w, 'subscriptionPricePoint')]));
    const dost = await client.call('GET', `/v1/subscriptions/${p.id}/subscriptionAvailability`).catch(nie404);
    const dostKraje = dost?.data ? (await client.list(`/v1/subscriptionAvailabilities/${dost.data.id}/availableTerritories`)).map(t => t.id) : [];
    st.produkty[klucz] = { id: p.id, okres: p.attributes.subscriptionPeriod, rodzina: !!p.attributes.familySharable, ceny, dostepnosc: dost?.data ? { nowe: !!dost.data.attributes?.availableInNewTerritories, kraje: dostKraje } : null };
    st.produkty[klucz].wskazane = await ustalCeny(client, { rodzaj: 'sub', id: p.id, klucz, data, dozwolone }).catch(e => ({ blad: e.message }));
  }
  for (const klucz of IAPS) {
    const lista = await client.list(`/v1/apps/${appId}/inAppPurchasesV2?filter[productId]=${PRODUCTS[klucz].productId}`);
    const p = lista.find(x => x.attributes?.productId === PRODUCTS[klucz].productId);
    if (!p) { st.produkty[klucz] = null; continue; }
    const h = await client.call('GET', `/v2/inAppPurchases/${p.id}/iapPriceSchedule`).catch(nie404);
    let harmonogram = null;
    if (h?.data) {
      const baza = (await client.call('GET', `/v1/inAppPurchasePriceSchedules/${h.data.id}/baseTerritory`)).data?.id;
      const reczne = new Map((await client.list(`/v1/inAppPurchasePriceSchedules/${h.data.id}/manualPrices?include=inAppPurchasePricePoint,territory`)).map(w => [kraj(w, 'territory'), kraj(w, 'inAppPurchasePricePoint')]));
      harmonogram = { baza, reczne };
    }
    const dost = await client.call('GET', `/v2/inAppPurchases/${p.id}/inAppPurchaseAvailability`).catch(nie404);
    const dostKraje = dost?.data ? (await client.list(`/v1/inAppPurchaseAvailabilities/${dost.data.id}/availableTerritories`)).map(t => t.id) : [];
    st.produkty[klucz] = { id: p.id, typ: p.attributes.inAppPurchaseType, rodzina: !!p.attributes.familySharable, harmonogram, dostepnosc: dost?.data ? { nowe: !!dost.data.attributes?.availableInNewTerritories, kraje: dostKraje } : null };
    st.produkty[klucz].wskazane = await ustalCeny(client, { rodzaj: 'iap', id: p.id, klucz, data, dozwolone }).catch(e => ({ blad: e.message }));
  }
  return st;
}

/** Plan z samego stanu (czysta funkcja): { akcje, stop, nieodwracalne }. */
export function planuj(st, data, { familySharing = data.familySharing } = {}) {
  const akcje = []; const stop = []; const nieodwracalne = [];
  const nowe = !!data.dostepnosc.noweTerytoria;
  const dod = (typ, klucz, opis, ile = null) => akcje.push({ typ, klucz, opis, ile });
  const id = k => PRODUCTS[k].productId;
  const FS = k => { nieodwracalne.push(`NIEODWRACALNE: Family Sharing dla ${id(k)} (Apple: „once you turn on Family Sharing for an In-App Purchases in App Store Connect, you can't turn it off”)`); };
  if (st.nieznane.length) stop.push(`kody z listy storefrontów nieznane w App Store Connect (GET /v1/territories): ${st.nieznane.join(', ')} — popraw ${data.dostepnosc.plik}`);
  if (!st.dozwolone.has(data.krajBazowy)) stop.push(`kraj bazowy ${data.krajBazowy} spoza listy storefrontów`);
  // dostępność aplikacji
  if (!st.aplikacja) dod('aplikacja:dostepnosc', 'app', `dostępność aplikacji: ${st.kraje.length} krajów z listy, pozostałe ${st.wszystkie.length - st.kraje.length} wyłączone, nowe terytoria ${nowe ? 'wł.' : 'wył.'}`, st.kraje.length);
  else {
    const zbedne = [...st.aplikacja.wpisy].filter(([c, w]) => w.available && !st.dozwolone.has(c)).map(([c]) => c);
    if (zbedne.length) stop.push(`dostępność aplikacji obejmuje kraje spoza listy: ${zbedne.join(', ')} (skrypt niczego nie wyłącza — wyłącz w App Store Connect → Pricing and Availability)`);
    if (st.aplikacja.nowe !== nowe) stop.push(`dostępność aplikacji: nowe terytoria ${st.aplikacja.nowe ? 'wł.' : 'wył.'} ≠ ${nowe ? 'wł.' : 'wył.'} z planu (zmień w App Store Connect)`);
    const brakWpisu = st.kraje.filter(c => !st.aplikacja.wpisy.has(c));
    if (brakWpisu.length) stop.push(`dostępność aplikacji bez wpisu dla: ${brakWpisu.join(', ')}`);
    const wlacz = st.kraje.filter(c => st.aplikacja.wpisy.get(c)?.available === false);
    if (wlacz.length) dod('aplikacja:wlacz', 'app', `dostępność aplikacji: włączam ${wlacz.length} krajów z listy (${wlacz.join(', ')})`, wlacz.length);
  }
  if (st.zdublowanaGrupa) stop.push(`grupa subskrypcji „${data.grupa.referenceName}”: pasuje ${st.zdublowanaGrupa} grup (nie wybieram sama)`);
  if (!st.grupa) dod('grupa:utworz', 'group', `grupa subskrypcji „${data.grupa.referenceName}”`);
  const dostepnosc = (typ, k, d) => {
    const brak = st.kraje.filter(c => !d?.kraje.includes(c));
    const zbedne = (d?.kraje ?? []).filter(c => !st.dozwolone.has(c));
    if (zbedne.length) { stop.push(`${id(k)}: dostępność w App Store Connect zawiera kraje spoza listy ${zbedne.join(', ')} (skrypt nie usuwa — wyłącz w App Store Connect)`); return; }
    if (!d || brak.length || d.nowe !== nowe) dod(typ, k, `dostępność ${id(k)}: ${st.kraje.length} krajów z listy, nowe terytoria ${nowe ? 'wł.' : 'wył.'}`, d ? brak.length : st.kraje.length);
  };
  for (const k of SUBS) {
    const p = st.produkty[k]; const def = data.produkty[k];
    if (!p) {
      dod('subskrypcja:utworz', k, `subskrypcja ${id(k)} (${def.okres}, poziom grupy ${def.poziomGrupy}${familySharing ? ', Family Sharing' : ''})`);
      if (familySharing) FS(k);
      dostepnosc('subskrypcja:dostepnosc', k, null);
      dod('subskrypcja:ceny', k, `ceny ${id(k)}: ${def.cenaBazowa} (kraj bazowy ${data.krajBazowy}) i równoważniki Apple w pozostałych krajach listy`);
      continue;
    }
    if (p.okres !== def.okres) { stop.push(`${id(k)}: okres w App Store Connect ${p.okres} ≠ ${def.okres} z planu (nie zmieniam okresu istniejącej subskrypcji)`); continue; }
    if (familySharing && !p.rodzina) { dod('subskrypcja:rodzina', k, `Family Sharing ${id(k)}`); FS(k); }
    dostepnosc('subskrypcja:dostepnosc', k, p.dostepnosc);
    const w = p.wskazane;
    if (w.blad) { stop.push(`${id(k)}: ${w.blad}`); continue; }
    const usa = p.ceny.get(data.krajBazowy);
    if (usa && usa !== w.bazaPunkt) { stop.push(`${id(k)}: cena ${data.krajBazowy} w App Store Connect ${w.nazwyPunktow.get(usa) ?? 'inna'} ≠ ${w.cena} z planu (zmiana ceny istniejącego produktu poza zakresem skryptu)`); continue; }
    const oczekiwane = new Map([[data.krajBazowy, w.bazaPunkt], ...w.rownowazniki, ...w.nadpisania]);
    const brak = [...oczekiwane.keys()].filter(c => !p.ceny.has(c));
    if (brak.length) dod('subskrypcja:ceny', k, `ceny ${id(k)}: dokładam ${brak.length} brakujących krajów (istniejące nietykane)`, brak.length);
  }
  for (const k of IAPS) {
    const p = st.produkty[k]; const def = data.produkty[k];
    if (!p) {
      dod('iap:utworz', k, `zakup jednorazowy ${id(k)} (${def.typ}${familySharing ? ', Family Sharing' : ''})`);
      if (familySharing) FS(k);
      dostepnosc('iap:dostepnosc', k, null);
      dod('iap:cena', k, `cena ${id(k)}: ${def.cenaBazowa} (kraj bazowy ${data.krajBazowy}), pozostałe kraje automatycznie (Apple)`);
      continue;
    }
    if (p.typ !== def.typ) { stop.push(`${id(k)}: typ w App Store Connect ${p.typ} ≠ ${def.typ} z planu (nie zmieniam typu)`); continue; }
    if (familySharing && !p.rodzina) { dod('iap:rodzina', k, `Family Sharing ${id(k)}`); FS(k); }
    dostepnosc('iap:dostepnosc', k, p.dostepnosc);
    const w = p.wskazane;
    if (w.blad) { stop.push(`${id(k)}: ${w.blad}`); continue; }
    const h = p.harmonogram;
    if (!h) { dod('iap:cena', k, `cena ${id(k)}: ${def.cenaBazowa} (kraj bazowy ${data.krajBazowy})`); continue; }
    if (h.baza !== data.krajBazowy) { stop.push(`${id(k)}: kraj bazowy w App Store Connect ${h.baza} ≠ ${data.krajBazowy} z planu (nie zmieniam)`); continue; }
    const usa = h.reczne.get(data.krajBazowy);
    if (usa !== w.bazaPunkt) { stop.push(`${id(k)}: cena ${data.krajBazowy} w App Store Connect ${w.nazwyPunktow.get(usa) ?? 'inna'} ≠ ${w.cena} z planu (zmiana ceny istniejącego produktu poza zakresem skryptu)`); continue; }
    const brak = [...w.nadpisania.keys()].filter(c => !h.reczne.has(c));
    if (brak.length) dod('iap:cena', k, `cena ${id(k)}: dokładam ręczne ceny w ${brak.length} krajach`, brak.length);
  }
  return { akcje, stop, nieodwracalne };
}

/** Klient tylko do odczytu (obrona w głąb): tryb planu nie może zapisać, nawet gdyby kod planu próbował. */
export function tylkoOdczyt(client) {
  return { ...client, call: (m, ...a) => { if (m !== 'GET') throw new Error(`Tryb planu: ${m} niedozwolone (tylko odczyt)`); return client.call(m, ...a); } };
}

const rel = (type, id) => ({ data: { type, id } });

/** Zapis planu (tylko POST/PATCH). Zwraca liczbę błędów; błąd jednego kroku nie przerywa niezależnych kroków. */
export async function zastosuj(client, st, plan, data, { familySharing = data.familySharing, log = console.log } = {}) {
  let bledy = 0; const id = k => PRODUCTS[k].productId; const nowe = !!data.dostepnosc.noweTerytoria;
  const krok = async (opis, f) => { try { await f(); log(`  ${opis} → zapisano`); } catch (e) { bledy++; log(`  ${opis} → BŁĄD ${e.message}`); } };
  const ma = (typ, k) => plan.akcje.some(a => a.typ === typ && a.klucz === k);
  if (ma('aplikacja:dostepnosc', 'app')) await krok('dostępność aplikacji', () => client.call('POST', '/v2/appAvailabilities', {
    data: { type: 'appAvailabilities', attributes: { availableInNewTerritories: nowe }, relationships: { app: rel('apps', st.appId), territoryAvailabilities: { data: st.wszystkie.map((_, i) => ({ type: 'territoryAvailabilities', id: `\${ta${i}}` })) } } },
    included: st.wszystkie.map((c, i) => ({ type: 'territoryAvailabilities', id: `\${ta${i}}`, attributes: { available: st.dozwolone.has(c) }, relationships: { territory: rel('territories', c) } })),
  }));
  if (ma('aplikacja:wlacz', 'app')) for (const c of st.kraje.filter(x => st.aplikacja.wpisy.get(x)?.available === false)) {
    const w = st.aplikacja.wpisy.get(c);
    await krok(`dostępność aplikacji ${c}`, () => client.call('PATCH', `/v1/territoryAvailabilities/${w.id}`, { data: { type: 'territoryAvailabilities', id: w.id, attributes: { available: true } } }));
  }
  let grupaId = st.grupa?.id;
  if (ma('grupa:utworz', 'group')) await krok(`grupa „${data.grupa.referenceName}”`, async () => {
    grupaId = (await client.call('POST', '/v1/subscriptionGroups', { data: { type: 'subscriptionGroups', attributes: { referenceName: data.grupa.referenceName }, relationships: { app: rel('apps', st.appId) } } })).data.id;
  });
  const lista = st.kraje.map(c => ({ type: 'territories', id: c }));
  const dostepnosc = (typ, nazwa, k, idProduktu, relacja) => krok(`dostępność ${id(k)}`, () => client.call('POST', nazwa, {
    data: { type: typ, attributes: { availableInNewTerritories: nowe }, relationships: { [relacja[0]]: rel(relacja[1], idProduktu), availableTerritories: { data: lista } } } }));
  for (const k of SUBS) {
    const def = data.produkty[k]; const p = st.produkty[k]; let sid = p?.id; let w;
    if (ma('subskrypcja:utworz', k)) {
      if (!grupaId) { bledy++; log(`  subskrypcja ${id(k)} → pominięta (brak grupy)`); continue; }
      await krok(`subskrypcja ${id(k)}`, async () => {
        sid = (await client.call('POST', '/v1/subscriptions', { data: { type: 'subscriptions',
          attributes: { name: def.referenceName, productId: id(k), subscriptionPeriod: def.okres, groupLevel: def.poziomGrupy, ...(familySharing ? { familySharable: true } : {}) },
          relationships: { group: rel('subscriptionGroups', grupaId) } } })).data.id;
      });
      if (!sid) continue;
    }
    if (ma('subskrypcja:dostepnosc', k)) await dostepnosc('subscriptionAvailabilities', '/v1/subscriptionAvailabilities', k, sid, ['subscription', 'subscriptions']);
    if (ma('subskrypcja:rodzina', k)) await krok(`Family Sharing ${id(k)}`, () => client.call('PATCH', `/v1/subscriptions/${sid}`, { data: { type: 'subscriptions', id: sid, attributes: { familySharable: true } } }));
    if (ma('subskrypcja:ceny', k)) {
      try { w = await ustalCeny(client, { rodzaj: 'sub', id: sid, klucz: k, data, dozwolone: st.dozwolone }); } catch (e) { bledy++; log(`  ceny ${id(k)} → BŁĄD ${e.message}`); continue; }
      const oczekiwane = new Map([[data.krajBazowy, w.bazaPunkt], ...w.rownowazniki, ...w.nadpisania]);
      const maja = p?.ceny ?? new Map(); let n = 0; let b = 0;
      for (const [c, pp] of oczekiwane) {
        if (maja.has(c)) continue;
        try { await client.call('POST', '/v1/subscriptionPrices', { data: { type: 'subscriptionPrices', relationships: { subscription: rel('subscriptions', sid), subscriptionPricePoint: rel('subscriptionPricePoints', pp), territory: rel('territories', c) } } }); n++; }
        catch (e) { b++; bledy++; log(`  cena ${id(k)} ${c} → BŁĄD ${e.message}`); }
      }
      log(`  ceny ${id(k)} → zapisano ${n}${b ? `, błędy ${b}` : ''}`);
    }
  }
  for (const k of IAPS) {
    const def = data.produkty[k]; const p = st.produkty[k]; let iid = p?.id;
    if (ma('iap:utworz', k)) {
      await krok(`zakup jednorazowy ${id(k)}`, async () => {
        iid = (await client.call('POST', '/v2/inAppPurchases', { data: { type: 'inAppPurchases',
          attributes: { name: def.referenceName, productId: id(k), inAppPurchaseType: def.typ, ...(familySharing ? { familySharable: true } : {}) },
          relationships: { app: rel('apps', st.appId) } } })).data.id;
      });
      if (!iid) continue;
    }
    if (ma('iap:dostepnosc', k)) await dostepnosc('inAppPurchaseAvailabilities', '/v1/inAppPurchaseAvailabilities', k, iid, ['inAppPurchase', 'inAppPurchases']);
    if (ma('iap:rodzina', k)) await krok(`Family Sharing ${id(k)}`, () => client.call('PATCH', `/v2/inAppPurchases/${iid}`, { data: { type: 'inAppPurchases', id: iid, attributes: { familySharable: true } } }));
    if (ma('iap:cena', k)) await krok(`cena ${id(k)}`, async () => {
      const w = await ustalCeny(client, { rodzaj: 'iap', id: iid, klucz: k, data, dozwolone: st.dozwolone });
      const punkty = [w.bazaPunkt, ...w.nadpisania.values()];
      const istniejace = p?.harmonogram ? [...p.harmonogram.reczne.values()] : [];
      const wszystkieReczne = [...new Set([...istniejace, ...punkty])];
      await client.call('POST', '/v1/inAppPurchasePriceSchedules', { data: { type: 'inAppPurchasePriceSchedules',
        relationships: { inAppPurchase: rel('inAppPurchases', iid), baseTerritory: rel('territories', data.krajBazowy), manualPrices: { data: wszystkieReczne.map((_, i) => ({ type: 'inAppPurchasePrices', id: `\${price${i}}` })) } } },
        included: wszystkieReczne.map((pp, i) => ({ type: 'inAppPurchasePrices', id: `\${price${i}}`, attributes: { startDate: null }, relationships: { inAppPurchasePricePoint: rel('inAppPurchasePricePoints', pp) } })) });
    });
  }
  return bledy;
}

/** Główny przebieg: odczyt → plan → (przy apply i braku STOP) zapis. Zwraca { code, plan, bledy }. */
export async function run({ client, data, apply = false, log = console.log }) {
  log(`Tryb: ${apply ? 'APPLY (zapis)' : 'DRY-RUN (bez zmian)'}; kraj bazowy ${data.krajBazowy}; Family Sharing: ${data.familySharing ? 'TAK' : 'NIE (monetyzacja.md)'}; nowe terytoria: ${data.dostepnosc.noweTerytoria ? 'wł.' : 'wył.'}`);
  const st = await odczytajStan(apply ? client : tylkoOdczyt(client), data);
  const plan = planuj(st, data);
  log(`Stan: dostępność aplikacji ${st.aplikacja ? 'jest' : 'brak'}; grupa ${st.grupa ? 'jest' : 'brak'}; produkty istniejące ${Object.values(st.produkty).filter(Boolean).length} z ${Object.keys(st.produkty).length}; terytoriów w App Store Connect ${st.wszystkie.length}, na liście ${data.terytoria.length}, z listy rozpoznanych ${st.kraje.length}`);
  if (!plan.akcje.length && !plan.stop.length) log('Brak zmian: wszystko zgodne z planem.');
  for (const a of plan.akcje) log(`  [utwórz/uzupełnij] ${a.opis}${a.ile !== null ? ` (${a.ile})` : ''}`);
  for (const n of plan.nieodwracalne) log(`  ${n}`);
  for (const s of plan.stop) log(`STOP: ${s}`);
  if (plan.stop.length) { log(`\nSTOP: ${plan.stop.length}. ${apply ? 'Nic nie zapisano' : 'Zapis byłby odmówiony'} — rozstrzyga właściciel w App Store Connect (skrypt nie zmienia istniejących produktów).`); return { code: 1, plan, bledy: 0 }; }
  if (!apply) { log(`\nPodsumowanie planu: ${plan.akcje.length} pozycji, w tym nieodwracalnych ${plan.nieodwracalne.length}.`); return { code: 0, plan, bledy: 0 }; }
  const bledy = await zastosuj(client, st, plan, data, { log });
  log(`\nPodsumowanie: ${plan.akcje.length} pozycji planu, błędy zapisu ${bledy}`);
  return { code: bledy ? 1 : 0, plan, bledy };
}

async function main() {
  const args = process.argv.slice(2); const apply = args.includes('--apply');
  if (apply && args.includes('--dry-run')) { console.error('Podaj tylko jeden tryb.'); process.exit(2); }
  const { ASC_KEY_ID: keyId, ASC_ISSUER_ID: issuerId, ASC_KEY_PATH: keyPath } = process.env;
  if (!keyId || !issuerId || !keyPath) { console.error('Brak ASC_KEY_ID, ASC_ISSUER_ID lub ASC_KEY_PATH.'); process.exit(2); }
  const keyPem = readFileSync(keyPath, 'utf8');
  const { code } = await run({ client: makeClient({ token: () => makeJwt({ keyId, issuerId, keyPem }) }), data: wczytajDane(), apply });
  process.exit(code);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main().catch(e => { console.error(`Błąd: ${String(e.message).slice(0, 200)}`); process.exit(1); });
