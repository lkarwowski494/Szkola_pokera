// HW (08-programista-501): przy SZKOLA_ZRZUTY=1 zrzuty z Expo web dostają `fontScale` z `?fs=` także w `Dimensions` (useWindowDimensions, PixelRatio.getFontScale),
// bo react-native-web ma stałe `fontScale: 1` i bez tego gałęzie układu dużego tekstu (SKALA_BEZ_PASKA, podstawaSegmentu, sufitTytulu) nie działają.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const korzen = join(dirname(fileURLToPath(import.meta.url)), '../..');
const wymiaryRnw = join(korzen, 'node_modules/react-native-web/dist/exports/Dimensions/index.js');
const require = createRequire(import.meta.url);
const sciezkaKonfiguracji = join(korzen, 'apps/mobile/metro.config.js');

/** Konfiguracja Metro wczytana od nowa przy podanej wartości SZKOLA_ZRZUTY. */
function konfiguracja(zrzuty) {
  const przed = process.env.SZKOLA_ZRZUTY;
  if (zrzuty === undefined) delete process.env.SZKOLA_ZRZUTY; else process.env.SZKOLA_ZRZUTY = zrzuty;
  delete require.cache[require.resolve(sciezkaKonfiguracji)];
  try { return require(sciezkaKonfiguracji); } finally { if (przed === undefined) delete process.env.SZKOLA_ZRZUTY; else process.env.SZKOLA_ZRZUTY = przed; }
}
/** Rozwiązanie importu z udawanym domyślnym resolverem, który zawsze trafia w `Dimensions` react-native-web. */
function rozwiaz(config, nazwa, platforma, origin) {
  const kontekst = { originModulePath: origin, resolveRequest: () => ({ type: 'sourceFile', filePath: wymiaryRnw }) };
  return config.resolver.resolveRequest(kontekst, nazwa, platforma);
}
const zrzutowe = join(korzen, 'apps/mobile/zrzuty-web/Dimensions.ts');

test('08-programista-501: przy SZKOLA_ZRZUTY=1 na web Dimensions react-native-web jest podmieniony, także importem względnym z paczki', () => {
  const c = konfiguracja('1');
  const zAplikacji = rozwiaz(c, 'react-native-web/dist/exports/Dimensions', 'web', join(korzen, 'apps/mobile/src/features/scenariusz/komponenty.tsx'));
  assert.equal(zAplikacji.filePath, zrzutowe);
  const zPaczki = rozwiaz(c, '../Dimensions', 'web', join(korzen, 'node_modules/react-native-web/dist/exports/useWindowDimensions/index.js'));
  assert.equal(zPaczki.filePath, zrzutowe);
});

test('08-programista-501: moduł zrzutowy sam importuje oryginał (bez pętli); iOS i brak zmiennej bez zmian', () => {
  const c = konfiguracja('1');
  assert.equal(rozwiaz(c, 'react-native-web/dist/exports/Dimensions', 'web', zrzutowe).filePath, wymiaryRnw);
  assert.equal(rozwiaz(c, 'react-native-web/dist/exports/Dimensions', 'ios', join(korzen, 'apps/mobile/src/a.tsx')).filePath, wymiaryRnw);
  assert.equal(konfiguracja(undefined).resolver.resolveRequest ?? null, null);
});
