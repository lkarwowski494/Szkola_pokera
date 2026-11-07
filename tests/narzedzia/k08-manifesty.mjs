#!/usr/bin/env node
// K-08 (docs/architektura/kontrole-07.md; prywatnosc.md §2): required reason API w drzewie zależności wobec
// `expo.ios.privacyManifests` w app.json. Kontrola informacyjna (strategia.md §8.1): wynik do przeglądu roli 10.
// Uruchomienie: node tests/narzedzia/k08-manifesty.mjs [katalog_node_modules ...] [--app apps/mobile/app.json] [--json]
// Kod wyjścia: 0 — każda kategoria z manifestów pakietów i z trafień w kodzie bez manifestu jest w app.json, lista
// NSPrivacyCollectedDataTypes pusta, NSPrivacyTracking nie true (NFR-PRYW-001); 1 — braki; 2 — błąd uruchomienia.
// Nie uruchamia kodu pakietów: tylko odczyt plików.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// Lista Apple: developer.apple.com/documentation/bundleresources/app-privacy-configuration/nsprivacyaccessedapitypes/
// nsprivacyaccessedapitype (dane strony w JSON, odczyt 2026-11-07). `getattrlist`, `fgetattrlist`, `getattrlistat` Apple
// wymienia w FileTimestamp i w DiskSpace — trafienie liczy się do obu (zachowawczo; rola 10 ocenia).
export const API_APPLE = {
  NSPrivacyAccessedAPICategoryFileTimestamp: {
    nazwy: ['creationDate', 'modificationDate', 'fileModificationDate', 'contentModificationDateKey', 'creationDateKey'],
    funkcjeC: ['getattrlist', 'getattrlistbulk', 'fgetattrlist', 'stat', 'fstat', 'fstatat', 'lstat', 'getattrlistat'],
  },
  NSPrivacyAccessedAPICategorySystemBootTime: { nazwy: ['systemUptime'], funkcjeC: ['mach_absolute_time'] },
  NSPrivacyAccessedAPICategoryDiskSpace: {
    nazwy: ['volumeAvailableCapacityKey', 'volumeAvailableCapacityForImportantUsageKey', 'volumeAvailableCapacityForOpportunisticUsageKey',
      'volumeTotalCapacityKey', 'systemFreeSize', 'systemSize', 'NSFileSystemFreeSize', 'NSFileSystemSize'],
    funkcjeC: ['statfs', 'statvfs', 'fstatfs', 'fstatvfs', 'getattrlist', 'fgetattrlist', 'getattrlistat'],
  },
  NSPrivacyAccessedAPICategoryActiveKeyboards: { nazwy: ['activeInputModes'], funkcjeC: [] },
  NSPrivacyAccessedAPICategoryUserDefaults: { nazwy: ['UserDefaults', 'NSUserDefaults'], funkcjeC: [] },
};
const WZORCE = Object.entries(API_APPLE).map(([kat, { nazwy, funkcjeC }]) => [kat, new RegExp(
  [...nazwy.map((n) => `\\b${n}\\b`), ...funkcjeC.map((f) => `(?<![\\w.>])${f}\\s*\\(`)].join('|'),
)]);
const ROZSZERZENIA = /\.(swift|m|mm|h|c|cc|cpp|hpp)$/;
const POMIJANE_KATALOGI = new Set(['example', 'examples', 'android', 'node_modules', '__tests__', 'test', 'tests', 'e2e', 'build', 'docs', '.git']);

// Prosty odczyt plist XML: tylko pola potrzebne kontroli.
export function czytajManifest(xml) {
  const typy = [...xml.matchAll(/<key>NSPrivacyAccessedAPIType<\/key>\s*<string>([^<]+)<\/string>\s*<key>NSPrivacyAccessedAPITypeReasons<\/key>\s*<array>([\s\S]*?)<\/array>/g)]
    .map((m) => ({ kategoria: m[1].trim(), powody: [...m[2].matchAll(/<string>([^<]+)<\/string>/g)].map((r) => r[1].trim()) }));
  const zebrane = xml.match(/<key>NSPrivacyCollectedDataTypes<\/key>\s*(<array\/>|<array>([\s\S]*?)<\/array>)/);
  const liczbaZebranych = zebrane && zebrane[2] ? (zebrane[2].match(/<dict>/g) ?? []).length : 0;
  const sledzenie = /<key>NSPrivacyTracking<\/key>\s*<true\/>/.test(xml);
  return { typy, liczbaZebranych, sledzenie };
}

function* pliki(katalog, glebokosc = 0) {
  let wpisy;
  try { wpisy = readdirSync(katalog, { withFileTypes: true }); } catch { return; }
  for (const w of wpisy) {
    const sc = join(katalog, w.name);
    if (w.isDirectory()) { if (!POMIJANE_KATALOGI.has(w.name) && glebokosc < 12) yield* pliki(sc, glebokosc + 1); }
    else if (w.isFile()) yield sc;
  }
}

// Pakiety natywne: katalog z `package.json` i (`ios/` albo `*.podspec` w korzeniu). Zagnieżdżone node_modules też.
export function pakietyNatywne(nodeModules) {
  const wynik = [];
  const odwiedz = (nm) => {
    let wpisy;
    try { wpisy = readdirSync(nm, { withFileTypes: true }); } catch { return; }
    for (const w of wpisy) {
      if (!w.isDirectory() && !w.isSymbolicLink()) continue;
      if (w.name.startsWith('.')) continue;
      const sc = join(nm, w.name);
      if (w.name.startsWith('@')) { odwiedz(sc); continue; }
      if (!existsSync(join(sc, 'package.json'))) continue;
      const korzen = readdirSync(sc);
      if (korzen.includes('ios') || korzen.some((n) => n.endsWith('.podspec'))) wynik.push(sc);
      if (korzen.includes('node_modules')) odwiedz(join(sc, 'node_modules'));
    }
  };
  odwiedz(nodeModules);
  return wynik;
}

function bezKomentarzy(linia) {
  const t = linia.trim();
  if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) return '';
  return linia.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, ''); // komentarz w linii: /* … statfs() */
}

export function skanuj(katalogi, appJson) {
  const pakiety = [];
  for (const nm of katalogi) for (const p of pakietyNatywne(nm)) {
    const nazwa = JSON.parse(readFileSync(join(p, 'package.json'), 'utf8')).name ?? relative(nm, p);
    const wszystkie = [...pliki(p)];
    const manifesty = wszystkie.filter((f) => f.endsWith('PrivacyInfo.xcprivacy')).map((f) => ({ plik: f, ...czytajManifest(readFileSync(f, 'utf8')) }));
    const trafienia = [];
    if (!manifesty.length) for (const f of wszystkie.filter((f) => ROZSZERZENIA.test(f))) {
      if (statSync(f).size > 20_000_000) continue;
      readFileSync(f, 'utf8').split('\n').forEach((linia, i) => {
        const l = bezKomentarzy(linia);
        if (!l) return;
        for (const [kat, re] of WZORCE) { const m = l.match(re); if (m) trafienia.push({ kategoria: kat, plik: f, linia: i + 1, api: m[0].replace(/\s*\($/, '') }); }
      });
    }
    pakiety.push({ nazwa, katalog: p, manifesty, trafienia });
  }
  const wymagane = new Map(); // kategoria → źródła
  for (const p of pakiety) {
    for (const m of p.manifesty) for (const t of m.typy) (wymagane.get(t.kategoria) ?? wymagane.set(t.kategoria, new Set()).get(t.kategoria)).add(`${p.nazwa} (manifest: ${t.powody.join(', ')})`);
    for (const t of p.trafienia) (wymagane.get(t.kategoria) ?? wymagane.set(t.kategoria, new Set()).get(t.kategoria)).add(`${p.nazwa} (kod bez manifestu: ${t.api})`);
  }
  const pm = JSON.parse(readFileSync(appJson, 'utf8')).expo?.ios?.privacyManifests ?? {};
  const wAplikacji = new Map((pm.NSPrivacyAccessedAPITypes ?? []).map((t) => [t.NSPrivacyAccessedAPIType, t.NSPrivacyAccessedAPITypeReasons ?? []]));
  const braki = [...wymagane.keys()].filter((k) => !wAplikacji.has(k)).sort();
  const naruszenia = [];
  if ((pm.NSPrivacyCollectedDataTypes ?? []).length) naruszenia.push(`app.json: NSPrivacyCollectedDataTypes ma ${pm.NSPrivacyCollectedDataTypes.length} wpisów (NFR-PRYW-001: pusta lista)`);
  if (pm.NSPrivacyTracking === true) naruszenia.push('app.json: NSPrivacyTracking = true');
  for (const p of pakiety) for (const m of p.manifesty) {
    if (m.liczbaZebranych) naruszenia.push(`${p.nazwa}: ${relative(p.katalog, m.plik)} deklaruje ${m.liczbaZebranych} typów zbieranych danych`);
    if (m.sledzenie) naruszenia.push(`${p.nazwa}: ${relative(p.katalog, m.plik)} NSPrivacyTracking = true`);
  }
  return {
    pakiety: pakiety.map((p) => ({ nazwa: p.nazwa, manifesty: p.manifesty.length, typy: p.manifesty.flatMap((m) => m.typy), trafienia: p.trafienia.length })),
    wymagane: Object.fromEntries([...wymagane].map(([k, v]) => [k, [...v].sort()])),
    wAplikacji: Object.fromEntries(wAplikacji),
    braki,
    naruszenia,
    trafienia: pakiety.flatMap((p) => p.trafienia.map((t) => ({ pakiet: p.nazwa, ...t, plik: relative(p.katalog, t.plik) }))),
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    const arg = process.argv.slice(2);
    const iApp = arg.indexOf('--app');
    const app = iApp >= 0 ? arg[iApp + 1] : 'apps/mobile/app.json';
    const katalogi = arg.filter((a, i) => !a.startsWith('--') && i !== iApp + 1);
    const w = skanuj(katalogi.length ? katalogi : ['node_modules', 'apps/mobile/node_modules'].filter((k) => existsSync(k)), app);
    if (arg.includes('--json')) console.log(JSON.stringify(w, null, 2));
    else {
      console.log(`K-08: pakiety natywne ${w.pakiety.length}, z manifestem ${w.pakiety.filter((p) => p.manifesty).length}, trafienia w kodzie bez manifestu ${w.trafienia.length}`);
      for (const [k, z] of Object.entries(w.wymagane)) console.log(`${w.braki.includes(k) ? 'BRAK ' : 'ok   '} ${k} ← ${z.join('; ')}${w.wAplikacji[k] ? ` | app.json: ${w.wAplikacji[k].join(', ')}` : ''}`);
      for (const n of w.naruszenia) console.log(`NARUSZENIE ${n}`);
    }
    process.exit(w.braki.length || w.naruszenia.length ? 1 : 0);
  } catch (e) {
    console.error(e);
    process.exit(2);
  }
}
