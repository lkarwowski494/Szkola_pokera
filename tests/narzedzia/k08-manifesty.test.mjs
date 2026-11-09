// Testy skanera K-08 na wycinkach prawdziwych plików (tests/dane/k08/README.md). Uruchamiane w `pnpm test:skrypty`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { czytajManifest, pakietyNatywne, POWODY_WYMAGANE, skanuj } from './k08-manifesty.mjs';

const D = fileURLToPath(new URL('../dane/k08/', import.meta.url));
const MODULY = `${D}moduly`;
const SKRYPT = fileURLToPath(new URL('./k08-manifesty.mjs', import.meta.url));

test('pakiety natywne: ios/ albo podspec w korzeniu, także pakiet z zakresem; pakiet tylko JS pominięty', () => {
  const nazwy = pakietyNatywne(MODULY).map((p) => p.slice(MODULY.length + 1)).sort();
  assert.deepEqual(nazwy, ['@zakres/pkg-sqlite', 'pkg-komentarz', 'pkg-przyklad', 'pkg-z-manifestem', 'pkg-zbiera']);
});

test('manifest: kategorie i powody, pusta lista zbieranych danych, brak śledzenia', () => {
  const m = czytajManifest(`<plist><dict><key>NSPrivacyCollectedDataTypes</key><array/><key>NSPrivacyTracking</key><false/><key>NSPrivacyAccessedAPITypes</key><array><dict><key>NSPrivacyAccessedAPIType</key><string>NSPrivacyAccessedAPICategoryDiskSpace</string><key>NSPrivacyAccessedAPITypeReasons</key><array><string>E174.1</string><string>85F4.1</string></array></dict></array></dict></plist>`);
  assert.deepEqual(m, { typy: [{ kategoria: 'NSPrivacyAccessedAPICategoryDiskSpace', powody: ['E174.1', '85F4.1'] }], liczbaZebranych: 0, sledzenie: false });
});

test('skan: kategorie z manifestu i z kodu bez manifestu; komentarze, makra i katalog example pominięte', () => {
  const w = skanuj([MODULY], `${D}app-ok.json`);
  assert.deepEqual(Object.keys(w.wymagane).sort(), ['NSPrivacyAccessedAPICategoryDiskSpace', 'NSPrivacyAccessedAPICategoryUserDefaults']);
  assert.deepEqual(w.trafienia.map((t) => `${t.pakiet}:${t.linia}:${t.api}`), ['@zakres/pkg-sqlite:3:fstatvfs', '@zakres/pkg-sqlite:4:statfs', '@zakres/pkg-sqlite:5:fstatfs']);
  assert.deepEqual(w.braki, []);
  assert.deepEqual(w.naruszenia, ['pkg-zbiera: ios/PrivacyInfo.xcprivacy deklaruje 1 typów zbieranych danych']);
});

test('braki: kategoria wymagana, a nieobecna w app.json; zbierane dane w app.json; kod wyjścia 1', () => {
  const w = skanuj([MODULY], `${D}app-brak.json`);
  assert.deepEqual(w.braki, ['NSPrivacyAccessedAPICategoryDiskSpace']);
  assert.ok(w.naruszenia.some((n) => n.startsWith('app.json: NSPrivacyCollectedDataTypes ma 1')));
  assert.throws(() => execFileSync(process.execPath, [SKRYPT, MODULY, '--app', `${D}app-brak.json`], { stdio: 'pipe' }), (e) => e.status === 1);
});

// 10-PRYW-01 (docs/wydanie/app-privacy.md §3–4): obecność kategorii nie wystarcza — powód wymagany przez użycie zależności
// bez własnego manifestu musi być w app.json (Apple: powody mają „accurately reflect your use”).
test('powody wymagane: pakiet z reguły obecny, powodu brak w app.json → brakiPowodow', () => {
  const regula = { pakiet: 'pkg-z-manifestem', kategoria: 'NSPrivacyAccessedAPICategoryDiskSpace', powod: 'X999.1', dlaczego: 'test' };
  const w = skanuj([MODULY], `${D}app-ok.json`, [regula]);
  assert.deepEqual(w.brakiPowodow, ['NSPrivacyAccessedAPICategoryDiskSpace: X999.1 (pkg-z-manifestem: test)']);
  const bezPakietu = skanuj([MODULY], `${D}app-ok.json`, [{ ...regula, pakiet: 'brak-takiego' }]);
  assert.deepEqual(bezPakietu.brakiPowodow, []);
  const jest = skanuj([MODULY], `${D}app-ok.json`, [{ ...regula, powod: 'E174.1' }]);
  assert.deepEqual(jest.brakiPowodow, []);
});

test('powody wymagane: expo-document-picker → FileTimestamp 3B52.1 (10-PRYW-01)', () => {
  assert.ok(POWODY_WYMAGANE.some((r) => r.pakiet === 'expo-document-picker' && r.kategoria === 'NSPrivacyAccessedAPICategoryFileTimestamp' && r.powod === '3B52.1'));
});
