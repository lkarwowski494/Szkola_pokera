// Pliki kluczy i środowiska nigdy w publicznym repo (zasada wspólna 14; M1-audytor-generalny-061, 10-wydanie-007):
// `.gitignore` ma je pomijać w katalogu głównym i w apps/mobile, bo `eas credentials` tworzy credentials.json
// w katalogu projektu, a klucz ASC (.p8) łatwo zapisać obok repo. Wzorce jak w Treningu (.gitignore, D-191).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const KORZEN = new URL('../../', import.meta.url).pathname;
const NAZWY = ['.env', '.env.production', '.env.local', 'AuthKey_X.p8', 'cert.p12', 'release.jks', 'app.keystore', 'profil.mobileprovision', 'dist.cer', 'klucz.pem', 'prywatny.key', 'credentials.json'];
const KATALOGI = ['', 'apps/mobile/', 'packages/postep/'];

test('git check-ignore pomija pliki kluczy i .env w katalogu głównym i w pakietach', () => {
  const sciezki = KATALOGI.flatMap((k) => NAZWY.map((n) => k + n));
  let wynik = '';
  try {
    wynik = execFileSync('git', ['check-ignore', '--no-index', ...sciezki], { cwd: KORZEN, encoding: 'utf8' });
  } catch (e) {
    wynik = e.stdout ?? ''; // kod 1, gdy żadna ścieżka nie jest ignorowana
  }
  const pominiete = new Set(wynik.split('\n').filter(Boolean));
  assert.deepEqual(sciezki.filter((s) => !pominiete.has(s)), []);
});

test('żaden śledzony plik nie ma nazwy pliku klucza ani .env (wzorce nie ukrywają plików repo)', () => {
  const wzorzec = /(^|\/)(\.env(\..+)?|credentials\.json|[^/]+\.(p8|p12|jks|keystore|mobileprovision|cer|pem|key))$/;
  const sledzone = execFileSync('git', ['ls-files'], { cwd: KORZEN, encoding: 'utf8' }).split('\n').filter((p) => wzorzec.test(p));
  assert.deepEqual(sledzone, []);
});
