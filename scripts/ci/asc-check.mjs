// Sprawdzenie klucza App Store Connect API przed długim buildem (TestFlight).
// Wejście (zmienne środowiska): ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_P8, BUNDLE_ID; opcjonalnie OUT — ścieżka, pod którą
// zapisać znormalizowany klucz .p8 (uprawnienia 600). Nie wypisuje żadnej wartości sekretu, tylko wynik testów.
// Kody wyjścia: 0 = klucz działa i aplikacja istnieje; 1 = błąd z opisem (::error:: dla GitHub Actions).
import { createPrivateKey, sign } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const fail = (msg) => { console.log(`::error::${msg}`); process.exit(1); };
const { ASC_KEY_ID: kid = '', ASC_ISSUER_ID: iss = '', ASC_KEY_P8: raw = '', BUNDLE_ID: bundle = '', OUT } = process.env;

// 1. Kształt wartości (bez wypisywania ich treści)
const keyId = kid.trim();
const issuer = iss.trim();
if (!/^[A-Z0-9]{10}$/.test(keyId)) fail(`ASC_KEY_ID ma zły format (oczekiwane 10 znaków A–Z/0–9, jest ${keyId.length} znaków)`);
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(issuer)) fail('ASC_ISSUER_ID ma zły format (oczekiwany UUID z App Store Connect → Users and Access → Integrations)');

// 2. Klucz prywatny: typowe błędy wklejania (\r, dosłowne „\n”, brak nowych linii w środku)
let pem = raw.replace(/\r/g, '').replace(/\\n/g, '\n').trim();
const body = pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '').replace(/\s+/g, '');
if (!pem.includes('BEGIN PRIVATE KEY') || !pem.includes('END PRIVATE KEY')) fail('ASC_KEY_P8 bez linii -----BEGIN PRIVATE KEY----- / -----END PRIVATE KEY----- (wklej całą treść pliku .p8)');
pem = `-----BEGIN PRIVATE KEY-----\n${body.match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----\n`;
let key;
try { key = createPrivateKey(pem); } catch { fail('ASC_KEY_P8 nie jest poprawnym kluczem prywatnym (uszkodzona albo niepełna treść pliku .p8)'); }
if (key.asymmetricKeyType !== 'ec') fail('ASC_KEY_P8 to nie klucz EC z App Store Connect');
console.log('Klucz prywatny: poprawny format (EC).');
if (OUT) writeFileSync(OUT, pem, { mode: 0o600 });

// 3. Logowanie do App Store Connect API (JWT ES256) i wyszukanie aplikacji po Bundle ID
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const head = b64({ alg: 'ES256', kid: keyId, typ: 'JWT' });
const payload = b64({ iss: issuer, iat: now, exp: now + 600, aud: 'appstoreconnect-v1' });
const sig = sign('sha256', Buffer.from(`${head}.${payload}`), { key, dsaEncoding: 'ieee-p1363' }).toString('base64url');
const res = await fetch(`https://api.appstoreconnect.apple.com/v1/apps?filter[bundleId]=${encodeURIComponent(bundle)}&limit=1`, {
  headers: { Authorization: `Bearer ${head}.${payload}.${sig}` },
});
if (res.status === 401) fail('Apple odrzuciło klucz (401): ASC_KEY_ID, ASC_ISSUER_ID i ASC_KEY_P8 nie pochodzą od tego samego aktywnego klucza (albo klucz unieważniony). Nadpisz wszystkie trzy wartościami jednego klucza.');
if (res.status === 403) fail('Klucz działa, ale ma za małe uprawnienia (403). Potrzebna rola Admin.');
if (!res.ok) fail(`App Store Connect API zwróciło ${res.status}`);
const data = await res.json();
if (!data.data?.length) fail(`Klucz działa, ale w App Store Connect nie ma aplikacji z Bundle ID ${bundle} (Apps → „+” → New App).`);
console.log(`App Store Connect: klucz działa, aplikacja ${bundle} istnieje.`);
