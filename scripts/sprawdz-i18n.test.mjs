// Testy skryptu kontroli słowników (node --test scripts/*.test.mjs). Dowód, że kontrola łapie to, do czego służy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { sprawdzSlowniki, skanujKod, pseudo, wpisy } from './sprawdz-i18n.mjs';

const ts = createRequire(import.meta.url)('typescript');
const sl = (o) => o;
const blad = (r, fragment) => r.bledy.some((b) => b.includes(fragment));

test('źródło pl wymaga form one/few/many/other, tłumaczenie de tylko one/other', () => {
  const r = sprawdzSlowniki(sl({ pl: { z_one: '{{count}} zadanie', z_few: '{{count}} zadania', z_many: '{{count}} zadań' }, de: { z_one: '{{count}} Aufgabe', z_other: '{{count}} Aufgaben' } }), 'pl');
  assert.ok(blad(r, 'pl z: brak formy _other'), 'pl bez _other');
  assert.ok(!r.bledy.some((b) => b.startsWith('de ')), 'de poprawne');
});

test('brakujące i zbędne formy liczby mnogiej w tłumaczeniu (ru: one/few/many/other)', () => {
  const r = sprawdzSlowniki(sl({ pl: { z_one: 'a', z_few: 'a', z_many: 'a', z_other: 'a' }, ru: { z_one: 'a', z_other: 'a' } }), 'pl');
  assert.ok(blad(r, 'ru z: brak formy _few'));
  assert.ok(blad(r, 'ru z: brak formy _many'));
});

test('parametry muszą być te same co w źródle', () => {
  const r = sprawdzSlowniki(sl({ pl: { a: 'Masz {{n}} z {{total}}' }, de: { a: 'Du hast {{n}}' } }), 'pl');
  assert.ok(blad(r, 'de a: parametry'));
});

test('znacznik terminu {{t:klucz|forma}}: forma może się różnić, klucz nie', () => {
  const ok = sprawdzSlowniki(sl({ pl: { a: '{{t:flush|kolor}} wygrywa' }, de: { a: '{{t:flush|Flush}} gewinnt' } }), 'pl');
  assert.deepEqual(ok.bledy, []);
  const zle = sprawdzSlowniki(sl({ pl: { a: '{{t:flush|kolor}} wygrywa' }, de: { a: '{{t:straight|Strasse}} gewinnt' } }), 'pl');
  assert.ok(blad(zle, 'de a: parametry'));
});

test('liczby: separatory języka nie dają fałszywych różnic, zmiana wartości jest błędem tylko w treści z twierdzeniem', () => {
  const ok = sprawdzSlowniki(sl({ pl: { a: 'Szansa 2,5 do 1 i 12 000 rąk' }, en: { a: 'Odds 2.5 to 1 and 12,000 hands' } }), 'pl');
  assert.ok(!blad(ok, 'liczby'), 'pl "2,5" = en "2.5"');
  const zle = sprawdzSlowniki(sl({ pl: { a: 'Szansa 2,5 do 1 [T:R-1]' }, en: { a: 'Odds 25 to 1 [T:R-1]' } }), 'pl');
  assert.ok(blad(zle, 'liczby inne niż w źródle'));
});

test('znaczniki twierdzeń [T:ID] zostają', () => {
  const r = sprawdzSlowniki(sl({ pl: { a: 'Reguła [T:R-1]' }, de: { a: 'Regel' } }), 'pl');
  assert.ok(blad(r, 'de a: twierdzenia'));
});

test('brak tłumaczenia klucza, pusty tekst', () => {
  const r = sprawdzSlowniki(sl({ pl: { a: 'x', b: 'y' }, de: { a: '' } }), 'pl');
  assert.ok(blad(r, 'de a: pusty tekst'));
  assert.ok(blad(r, 'de b: brak tłumaczenia'));
});

test('nakładka regionalna (pt-BR) nie wymaga wszystkich kluczy, ale ma pilnowane parametry', () => {
  const r = sprawdzSlowniki(sl({ pl: { a: 'x {{n}}', b: 'y' }, pt: { a: 'x {{n}}', b: 'y' }, 'pt-BR': { a: 'x' } }), 'pl');
  assert.ok(!blad(r, 'pt-BR b: brak tłumaczenia'));
  assert.ok(blad(r, 'pt-BR a: parametry'));
});

test('pismo: japoński bez znaków japońskich to uwaga', () => {
  const r = sprawdzSlowniki(sl({ pl: { a: 'Zapisz' }, ja: { a: 'Save' } }), 'pl');
  assert.ok(r.uwagi.some((u) => u.includes('brak liter pisma języka')));
});

test('wpisy: klucz zwykły i forma mnoga tego samego klucza to konflikt', () => {
  assert.equal(wpisy({ a: 'x', a_one: 'y' }).a.konflikt, true);
});

test('pseudolokalizacja: akcenty, wydłużenie, nawiasy; parametry i [T:] nietknięte', () => {
  const p = pseudo('Masz {{n}} z {{total}} [T:R-1]');
  assert.ok(p.startsWith('⟦') && p.endsWith('⟧'));
  assert.ok(p.includes('{{n}}') && p.includes('{{total}}') && p.includes('[T:R-1]'));
  assert.ok(p.length > 'Masz {{n}} z {{total}} [T:R-1]'.length);
});

test('skan kodu: tekst na sztywno w JSX, klucz użyty w t(), klucz dynamiczny, sklejanie', () => {
  const kat = mkdtempSync(join(tmpdir(), 'i18n-'));
  mkdirSync(join(kat, 'src'));
  writeFileSync(join(kat, 'src', 'Ekran.tsx'), [
    "import React from 'react';",
    'export function Ekran({ t, id }: { t: (k: string) => string; id: string }) {',
    "  return <View><Text>Zapisz postęp</Text><Text accessibilityLabel=\"Zamknij okno\">{t('ekran.tytul')}</Text><Text>{t(`ekran.${id}`)}</Text><Text>{t('a') + ' i ' + t('b')}</Text></View>;",
    '}',
  ].join('\n'));
  const s = skanujKod(ts, [join(kat, 'src')]);
  assert.ok(s.teksty.some((x) => x.tekst === 'Zapisz postęp' && x.blad), 'tekst w JSX');
  assert.ok(s.teksty.some((x) => x.tekst === 'Zamknij okno'), 'accessibilityLabel');
  assert.ok(s.uzyte.has('ekran.tytul'));
  assert.equal(s.dynamiczne.length, 1);
  assert.equal(new Set(s.sklejenia).size, 1, 'jedno miejsce (zagnieżdżony + zgłasza je dwa razy)');
});
