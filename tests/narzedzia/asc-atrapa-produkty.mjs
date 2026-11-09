// Atrapa serwera App Store Connect API dla scripts/asc/produkty.mjs — w pamięci, bez sieci. Port z Oczka (tests/wydanie/asc-atrapa.mjs,
// gałąź claude/jolly-thompson-paz6d8 @45f583d, odczyt 2026-11-09; D-356). Odstępstwa: ceny z planu Szkoły (9,99 / 14,99 / 19,99 USD),
// terytoria z BOL i XKS (kody z D-362 do sprawdzenia), dostępność APLIKACJI v2 (GET /v1/apps/{id}/appAvailabilityV2, POST /v2/appAvailabilities,
// GET /v2/appAvailabilities/{id}/territoryAvailabilities, PATCH /v1/territoryAvailabilities/{id}; kształt wg dokumentacji Apple, odczyt 2026-11-09).
// Zachowanie atrapy wynika z dokumentacji, nie z prawdziwego serwera — potwierdzi je dopiero pierwszy przebieg workflowu.
// Rejestruje każde żądanie w `calls`; DELETE kończy się błędem.

export const TERYTORIA = ['USA', 'POL', 'DEU', 'JPN', 'FRA', 'GBR', 'CHN', 'BOL', 'XKS'];
const POZIOMY_USA = ['1.99', '9.99', '14.99', '19.99'];
const ROWNOWAZNIKI = {
  '1.99': { POL: '8.99', DEU: '1.99', JPN: '300', FRA: '1.99', GBR: '1.79', CHN: '12', BOL: '14', XKS: '1.99' },
  '9.99': { POL: '44.99', DEU: '9.99', JPN: '1500', FRA: '9.99', GBR: '8.99', CHN: '68', BOL: '69', XKS: '9.99' },
  '14.99': { POL: '64.99', DEU: '14.99', JPN: '2200', FRA: '14.99', GBR: '12.99', CHN: '98', BOL: '99', XKS: '14.99' },
  '19.99': { POL: '89.99', DEU: '19.99', JPN: '3000', FRA: '19.99', GBR: '17.99', CHN: '128', BOL: '139', XKS: '19.99' },
};
const poziomyInne = (kraj) => Object.values(ROWNOWAZNIKI).map((t) => t[kraj]).filter(Boolean);
const punkt = (kraj, cena) => ({ id: `${kraj}:${cena}`, type: 'pricePoints', attributes: { customerPrice: cena }, relationships: { territory: { data: { type: 'territories', id: kraj } } } });

export function utworzAtrape({ stan = {}, bundleId } = {}) {
  const s = { grupy: [], subskrypcje: [], ceny: [], dostSub: [], iap: [], harmonogramy: [], dostIap: [], dostApp: null, seq: 0, ...stan };
  const calls = [];
  const id = (p) => `${p}${++s.seq}`;
  const odp = (status, body) => ({ ok: status < 400, status, json: async () => body });
  const lista = (data) => odp(200, { data, links: {} });
  const brak = () => odp(404, { errors: [{ code: 'NOT_FOUND', title: 'brak' }] });
  const pp = (kraj) => (kraj === 'USA' ? POZIOMY_USA : poziomyInne(kraj)).map((c) => punkt(kraj, c));

  async function fetchFn(url, init = {}) {
    const u = new URL(url); const m = init.method ?? 'GET'; const path = u.pathname; const q = u.searchParams;
    calls.push({ m, p: path });
    if (m === 'DELETE') throw new Error('DELETE niedozwolone');
    const body = init.body ? JSON.parse(init.body) : null;
    let r;
    if (path === '/v1/apps' && m === 'GET') return lista(q.get('filter[bundleId]') === bundleId ? [{ id: 'APP1', type: 'apps' }] : []);
    if (path === '/v1/territories' && m === 'GET') return lista(TERYTORIA.map((t) => ({ id: t, type: 'territories', attributes: { currency: 'X' } })));
    // --- dostępność aplikacji (v2)
    if (path === '/v1/apps/APP1/appAvailabilityV2' && m === 'GET') return s.dostApp ? odp(200, { data: { id: s.dostApp.id, type: 'appAvailabilities', attributes: { availableInNewTerritories: s.dostApp.nowe } } }) : brak();
    if ((r = path.match(/^\/v2\/appAvailabilities\/([^/]+)\/territoryAvailabilities$/)) && m === 'GET')
      return lista(s.dostApp.wpisy.map((w) => ({ id: w.id, type: 'territoryAvailabilities', attributes: { available: w.available }, relationships: { territory: { data: { type: 'territories', id: w.kraj } } } })));
    if (path === '/v2/appAvailabilities' && m === 'POST') {
      if (s.dostApp) return odp(409, { errors: [{ code: 'ENTITY_ERROR', title: 'availability exists' }] });
      const inc = new Map((body.included ?? []).map((x) => [x.id, x]));
      const wpisy = body.data.relationships.territoryAvailabilities.data.map((d) => { const x = inc.get(d.id); return { id: id('TA'), kraj: x.relationships.territory.data.id, available: x.attributes.available }; });
      if (wpisy.some((w) => !TERYTORIA.includes(w.kraj))) return odp(409, { errors: [{ code: 'ENTITY_ERROR.RELATIONSHIP.INVALID', title: 'nieznane terytorium' }] });
      s.dostApp = { id: id('AA'), nowe: body.data.attributes.availableInNewTerritories, app: body.data.relationships.app.data.id, wpisy };
      return odp(201, { data: { id: s.dostApp.id } });
    }
    if ((r = path.match(/^\/v1\/territoryAvailabilities\/([^/]+)$/)) && m === 'PATCH') {
      const w = s.dostApp?.wpisy.find((x) => x.id === r[1]); if (!w) return brak();
      w.available = body.data.attributes.available; return odp(200, { data: { id: w.id } });
    }
    // --- grupa subskrypcji
    if (path === '/v1/apps/APP1/subscriptionGroups' && m === 'GET') return lista(s.grupy.map((g) => ({ id: g.id, type: 'subscriptionGroups', attributes: { referenceName: g.referenceName } })));
    if (path === '/v1/subscriptionGroups' && m === 'POST') { const g = { id: id('G'), referenceName: body.data.attributes.referenceName }; s.grupy.push(g); return odp(201, { data: { id: g.id, type: 'subscriptionGroups' } }); }
    if ((r = path.match(/^\/v1\/subscriptionGroups\/([^/]+)\/subscriptions$/)) && m === 'GET')
      return lista(s.subskrypcje.filter((x) => x.grupa === r[1]).map((x) => ({ id: x.id, type: 'subscriptions', attributes: { productId: x.productId, name: x.name, subscriptionPeriod: x.okres, familySharable: x.fs, groupLevel: x.poziom } })));
    // --- subskrypcje
    if (path === '/v1/subscriptions' && m === 'POST') {
      const a = body.data.attributes; const x = { id: id('S'), grupa: body.data.relationships.group.data.id, productId: a.productId, name: a.name, okres: a.subscriptionPeriod, fs: a.familySharable ?? false, poziom: a.groupLevel };
      if (s.subskrypcje.some((y) => y.productId === x.productId)) return odp(409, { errors: [{ code: 'ENTITY_ERROR.ATTRIBUTE.INVALID.DUPLICATE', title: 'productId used' }] });
      s.subskrypcje.push(x); return odp(201, { data: { id: x.id, type: 'subscriptions' } });
    }
    if ((r = path.match(/^\/v1\/subscriptions\/([^/]+)$/)) && m === 'PATCH') { const x = s.subskrypcje.find((y) => y.id === r[1]); if (body.data.attributes.familySharable !== undefined) x.fs = body.data.attributes.familySharable; return odp(200, { data: { id: x.id } }); }
    if ((r = path.match(/^\/v1\/subscriptions\/([^/]+)\/pricePoints$/)) && m === 'GET') return lista(pp(q.get('filter[territory]')));
    if ((r = path.match(/^\/v1\/subscriptionPricePoints\/([^/]+)\/equalizations$/)) && m === 'GET') {
      const [kraj, cena] = decodeURIComponent(r[1]).split(':'); if (kraj !== 'USA') return brak();
      return lista(Object.entries(ROWNOWAZNIKI[cena]).map(([k, c]) => punkt(k, c)));
    }
    if ((r = path.match(/^\/v1\/subscriptions\/([^/]+)\/prices$/)) && m === 'GET')
      return lista(s.ceny.filter((c) => c.sub === r[1]).map((c) => ({ id: c.id, type: 'subscriptionPrices', relationships: { territory: { data: { type: 'territories', id: c.kraj } }, subscriptionPricePoint: { data: { type: 'subscriptionPricePoints', id: c.punkt } } } })));
    if (path === '/v1/subscriptionPrices' && m === 'POST') {
      const rel = body.data.relationships; const c = { id: id('SP'), sub: rel.subscription.data.id, kraj: rel.territory.data.id, punkt: rel.subscriptionPricePoint.data.id };
      if (decodeURIComponent(c.punkt).split(':')[0] !== c.kraj) return odp(409, { errors: [{ code: 'ENTITY_ERROR.RELATIONSHIP.INVALID', title: 'price point z innego kraju' }] });
      if (s.ceny.some((y) => y.sub === c.sub && y.kraj === c.kraj)) return odp(409, { errors: [{ code: 'ENTITY_ERROR.PRICE.EXISTS', title: 'cena już istnieje' }] });
      s.ceny.push(c); return odp(201, { data: { id: c.id } });
    }
    // --- dostępność subskrypcji
    if ((r = path.match(/^\/v1\/subscriptions\/([^/]+)\/subscriptionAvailability$/)) && m === 'GET') { const d = s.dostSub.find((x) => x.sub === r[1]); return d ? odp(200, { data: { id: d.id, type: 'subscriptionAvailabilities', attributes: { availableInNewTerritories: d.nowe } } }) : brak(); }
    if ((r = path.match(/^\/v1\/subscriptionAvailabilities\/([^/]+)\/availableTerritories$/)) && m === 'GET') return lista(s.dostSub.find((x) => x.id === r[1]).kraje.map((t) => ({ id: t, type: 'territories' })));
    if (path === '/v1/subscriptionAvailabilities' && m === 'POST') {
      const sub = body.data.relationships.subscription.data.id; s.dostSub = s.dostSub.filter((x) => x.sub !== sub);
      const d = { id: id('SA'), sub, nowe: body.data.attributes.availableInNewTerritories, kraje: body.data.relationships.availableTerritories.data.map((x) => x.id) }; s.dostSub.push(d); return odp(201, { data: { id: d.id } });
    }
    // --- zakup jednorazowy (IAP v2)
    if (path === '/v1/apps/APP1/inAppPurchasesV2' && m === 'GET') { const f = q.get('filter[productId]'); return lista(s.iap.filter((x) => !f || x.productId === f).map((x) => ({ id: x.id, type: 'inAppPurchases', attributes: { productId: x.productId, name: x.name, inAppPurchaseType: x.typ, familySharable: x.fs } }))); }
    if (path === '/v2/inAppPurchases' && m === 'POST') {
      const a = body.data.attributes; const x = { id: id('I'), productId: a.productId, name: a.name, typ: a.inAppPurchaseType, fs: a.familySharable ?? false };
      if (s.iap.some((y) => y.productId === x.productId)) return odp(409, { errors: [{ code: 'ENTITY_ERROR.ATTRIBUTE.INVALID.DUPLICATE', title: 'productId used' }] });
      s.iap.push(x); return odp(201, { data: { id: x.id, type: 'inAppPurchases' } });
    }
    if ((r = path.match(/^\/v2\/inAppPurchases\/([^/]+)$/)) && m === 'PATCH') { const x = s.iap.find((y) => y.id === r[1]); if (body.data.attributes.familySharable !== undefined) x.fs = body.data.attributes.familySharable; return odp(200, { data: { id: x.id } }); }
    if ((r = path.match(/^\/v2\/inAppPurchases\/([^/]+)\/pricePoints$/)) && m === 'GET') return lista(pp(q.get('filter[territory]')));
    if ((r = path.match(/^\/v2\/inAppPurchases\/([^/]+)\/iapPriceSchedule$/)) && m === 'GET') { const h = s.harmonogramy.find((x) => x.iap === r[1]); return h ? odp(200, { data: { id: h.id, type: 'inAppPurchasePriceSchedules' } }) : brak(); }
    if ((r = path.match(/^\/v1\/inAppPurchasePriceSchedules\/([^/]+)\/baseTerritory$/)) && m === 'GET') return odp(200, { data: { id: s.harmonogramy.find((x) => x.id === r[1]).baza, type: 'territories' } });
    if ((r = path.match(/^\/v1\/inAppPurchasePriceSchedules\/([^/]+)\/manualPrices$/)) && m === 'GET')
      return lista(s.harmonogramy.find((x) => x.id === r[1]).reczne.map((c, i) => ({ id: `P${i}`, type: 'inAppPurchasePrices', relationships: { territory: { data: { type: 'territories', id: c.kraj } }, inAppPurchasePricePoint: { data: { type: 'inAppPurchasePricePoints', id: c.punkt } } } })));
    if (path === '/v1/inAppPurchasePriceSchedules' && m === 'POST') {
      const rel = body.data.relationships; const inc = new Map((body.included ?? []).map((x) => [x.id, x]));
      if (!rel.baseTerritory?.data?.id) return odp(409, { errors: [{ code: 'ENTITY_ERROR.RELATIONSHIP.REQUIRED', title: 'baseTerritory wymagane' }] });
      const reczne = rel.manualPrices.data.map((d) => { const p = inc.get(d.id).relationships.inAppPurchasePricePoint.data.id; return { kraj: decodeURIComponent(p).split(':')[0], punkt: p }; });
      const h = { id: id('PS'), iap: rel.inAppPurchase.data.id, baza: rel.baseTerritory.data.id, reczne }; s.harmonogramy = s.harmonogramy.filter((x) => x.iap !== h.iap); s.harmonogramy.push(h); return odp(201, { data: { id: h.id } });
    }
    if ((r = path.match(/^\/v2\/inAppPurchases\/([^/]+)\/inAppPurchaseAvailability$/)) && m === 'GET') { const d = s.dostIap.find((x) => x.iap === r[1]); return d ? odp(200, { data: { id: d.id, type: 'inAppPurchaseAvailabilities', attributes: { availableInNewTerritories: d.nowe } } }) : brak(); }
    if ((r = path.match(/^\/v1\/inAppPurchaseAvailabilities\/([^/]+)\/availableTerritories$/)) && m === 'GET') return lista(s.dostIap.find((x) => x.id === r[1]).kraje.map((t) => ({ id: t, type: 'territories' })));
    if (path === '/v1/inAppPurchaseAvailabilities' && m === 'POST') {
      const iap = body.data.relationships.inAppPurchase.data.id; s.dostIap = s.dostIap.filter((x) => x.iap !== iap);
      const d = { id: id('IA'), iap, nowe: body.data.attributes.availableInNewTerritories, kraje: body.data.relationships.availableTerritories.data.map((x) => x.id) }; s.dostIap.push(d); return odp(201, { data: { id: d.id } });
    }
    return odp(404, { errors: [{ code: 'NOT_FOUND', title: `atrapa nie zna: ${m} ${path}` }] });
  }
  return { fetchFn, calls, s };
}
