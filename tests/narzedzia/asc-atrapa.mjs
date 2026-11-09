// Atrapa App Store Connect API do testów scripts/asc/*.mjs (D-348): klient { call, list } jak makeClient, wywołania zapisane w `calls`.
// Identyfikatory atrapy mają prefiks „ID-”, żeby test mógł sprawdzić, że żaden nie trafia do logu.
export function atrapa({ bundleId, wersja = 'PREPARE_FOR_SUBMISSION', info = 'PREPARE_FOR_SUBMISSION', produkty = [], grupaInnychSubskrypcji = false } = {}) {
  let n = 0; const id = () => `ID-${++n}`;
  const s = {
    app: { id: 'ID-app', attributes: { bundleId } },
    versions: wersja ? [{ id: 'ID-ver', attributes: { appStoreState: wersja } }] : [],
    infos: [{ id: 'ID-info', attributes: { appStoreState: info } }],
    infoLocs: [], verLocs: [],
    groups: [], subs: [], iaps: [], locs: new Map(), // klucz obiektu → lista lokalizacji
    placements: new Map(), library: [],
  };
  if (grupaInnychSubskrypcji) s.groups.push({ id: 'ID-obca', attributes: { referenceName: 'inna' } });
  const subProd = produkty.filter((p) => p.kind === 'subscription');
  if (subProd.length) {
    s.groups.push({ id: 'ID-grupa', attributes: { referenceName: 'pelny' } }); s.locs.set('ID-grupa', []);
    for (const p of subProd) { const x = { id: id(), attributes: { productId: p.productId }, group: 'ID-grupa' }; s.subs.push(x); s.locs.set(x.id, []); }
  }
  for (const p of produkty.filter((p) => p.kind === 'iap')) { const x = { id: id(), attributes: { productId: p.productId } }; s.iaps.push(x); s.locs.set(x.id, []); }
  const calls = [];
  const loc = (arr, attrs) => ({ id: id(), attributes: { ...attrs } });
  const routes = [
    [/^\/v1\/apps\?filter\[bundleId\]=(.+)$/, (m) => (m[1] === bundleId ? [s.app] : [])],
    [/^\/v1\/apps\/ID-app\/appStoreVersions/, () => s.versions],
    [/^\/v1\/apps\/ID-app\/appInfos$/, () => s.infos],
    [/^\/v1\/appInfos\/ID-info\/appInfoLocalizations$/, () => s.infoLocs],
    [/^\/v1\/appStoreVersions\/ID-ver\/appStoreVersionLocalizations$/, () => s.verLocs],
    [/^\/v1\/apps\/ID-app\/subscriptionGroups$/, () => s.groups],
    [/^\/v1\/subscriptionGroups\/([\w-]+)\/subscriptions$/, (m) => s.subs.filter((x) => x.group === m[1])],
    [/^\/v1\/subscriptionGroups\/([\w-]+)\/subscriptionGroupLocalizations$/, (m) => s.locs.get(m[1]) ?? []],
    [/^\/v1\/subscriptions\/([\w-]+)\/subscriptionLocalizations$/, (m) => s.locs.get(m[1]) ?? []],
    [/^\/v1\/apps\/ID-app\/inAppPurchasesV2\?filter\[productId\]=(.+)$/, (m) => s.iaps.filter((x) => x.attributes.productId === m[1])],
    [/^\/v2\/inAppPurchases\/([\w-]+)\/inAppPurchaseLocalizations$/, (m) => s.locs.get(m[1]) ?? []],
    [/^\/v1\/appStoreVersionLocalizations\/([\w-]+)\/placements/, (m) => s.placements.get(m[1]) ?? []],
    [/^\/v1\/appAssetLibraries\/ID-lib\/images$/, () => s.library],
  ];
  const POSTY = {
    '/v1/appInfoLocalizations': (b) => s.infoLocs.push(loc(null, b.data.attributes)),
    '/v1/appStoreVersionLocalizations': (b) => s.verLocs.push(loc(null, b.data.attributes)),
    '/v1/subscriptionGroupLocalizations': (b) => s.locs.get(b.data.relationships.subscriptionGroup.data.id).push(loc(null, b.data.attributes)),
    '/v1/subscriptionLocalizations': (b) => s.locs.get(b.data.relationships.subscription.data.id).push(loc(null, b.data.attributes)),
    '/v1/inAppPurchaseLocalizations': (b) => s.locs.get(b.data.relationships.inAppPurchaseV2.data.id).push(loc(null, b.data.attributes)),
  };
  const all = () => [s.infoLocs, s.verLocs, ...s.locs.values()].flat();
  async function call(method, path, body) {
    calls.push({ method, path, body });
    if (method === 'GET') {
      if (path === '/v1/apps/ID-app/assetLibrary') return { data: { id: 'ID-lib' } };
      if (path === '/v1/appAssetLibraryRefData') return { data: [{ attributes: REF_DATA }] };
      for (const [re, f] of routes) { const m = path.split('&limit=')[0].split('?limit=')[0].match(re); if (m) return { data: f(m) }; }
      throw Object.assign(new Error(`GET ${path} → 404`), { status: 404 });
    }
    if (method === 'POST' && POSTY[path]) { POSTY[path](body); return { data: { id: id() } }; }
    if (method === 'PATCH') {
      const x = all().find((l) => path.endsWith(`/${l.id}`));
      if (!x) throw Object.assign(new Error(`PATCH → 404`), { status: 404 });
      Object.assign(x.attributes, body.data.attributes); return { data: x };
    }
    throw new Error(`atrapa: nieobsłużone ${method} ${path}`);
  }
  async function list(path) { return (await call('GET', path)).data; }
  return { client: { call, list }, calls, s };
}

/** Dane referencyjne biblioteki zasobów: jedna specyfikacja iPhone 6.9 (1320 × 2868) i jedna 6.3 (1206 × 2622). */
export const REF_DATA = {
  imageSpecs: [
    { specId: 'S69', alphaAllowed: false, dimensions: { minWidth: 1320, maxWidth: 1320, minHeight: 2868, maxHeight: 2868 } },
    { specId: 'S63', alphaAllowed: false, dimensions: { minWidth: 1206, maxWidth: 1206, minHeight: 2622, maxHeight: 2622 } },
  ],
  placementTypes: [{ placementTypeId: 'APP_SCREENSHOT', specMappings: [{ placementGroupId: 'IPHONE_69', specs: ['S69'] }, { placementGroupId: 'IPHONE_63', specs: ['S63'] }] }],
};

/** Nagłówek PNG o danych wymiarach (typ koloru 2 = RGB bez alfa, 6 = RGBA). */
export function png(width, height, colorType = 2) {
  const b = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b, 0);
  b.writeUInt32BE(13, 8); b.write('IHDR', 12); b.writeUInt32BE(width, 16); b.writeUInt32BE(height, 20); b[24] = 8; b[25] = colorType;
  return b;
}
