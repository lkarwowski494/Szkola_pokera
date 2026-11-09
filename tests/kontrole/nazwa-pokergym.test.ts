// Strażnik nazwy produktu (D-378, W: „PokerGym: GTO Strategy Trainer”; „PokerGym” pod ikoną we wszystkich językach; decyzja wykonania: D-384).
// Nazwa produktu widoczna dla użytkownika i recenzenta = „PokerGym”; stara nazwa („Poker School”, „Szkoła Pokera” i jej odmiany,
// nazwy lokalne z `welcome.title` sprzed D-378) nie występuje w tekstach wydanych języków, konfiguracji aplikacji, treści,
// notatkach dla recenzenta ani na stronie. Identyfikatory techniczne (slug, scheme, bundle id, pakiet Androida) zostają — D-384 pkt 2.
// Poza zakresem: `store/app-store-metadata.json` i plik z niego generowany `store/asc-kontrola-oczekiwane.json` (sesja ASO AF, D-377).
import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const repo = (p: string) => new URL(`../../${p}`, import.meta.url);
const czytaj = (p: string) => readFileSync(repo(p), 'utf8');
const json = <T>(p: string) => JSON.parse(czytaj(p)) as T;
const lista = (kat: string, wzor: RegExp) => readdirSync(repo(kat)).filter((f) => wzor.test(f)).map((f) => `${kat}/${f}`);

const NAZWA = 'PokerGym';
// Stara nazwa: en, pl (z odmianą: Szkoła/Szkoły/Szkole/Szkołę/Szkołą, także bez polskich znaków), nazwy lokalne z welcome.title.
const STARA = /poker school|szko(?:ł|l)(?:a|y|e|ę|ą) pokera|ポーカースクール|撲克學校|escola de pôquer|école de poker/iu;

const app = json<{ expo: { name: string; slug: string; scheme: string; ios: { bundleIdentifier: string }; android: { package: string }; locales: Record<string, string> } }>('apps/mobile/app.json').expo;
const slowniki = lista('apps/mobile/src/i18n/locales', /^[A-Za-z0-9-]+\.json$/).filter((f) => !f.includes('kontekst'));
const tresc = readdirSync(repo('content'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) => lista(`content/${d.name}`, /\.ya?ml$/));
const pliki = [
  'apps/mobile/app.json',
  ...lista('apps/mobile/locales/systemowe', /\.json$/),
  ...slowniki,
  ...tresc,
  'store/review-notes.md',
  'store/review-notes.en.txt',
  ...lista('site', /\.html$/),
  ...lista('docs/wydanie/polityka-prywatnosci', /\.md$/),
  'tools/strona/polityka.mjs',
  'tools/strona/wsparcie.mjs',
];

describe('nazwa produktu PokerGym (D-378, D-384)', () => {
  it('stara nazwa produktu nie występuje w tekstach dla użytkownika i recenzenta', () => {
    const trafienia = pliki.flatMap((p) =>
      czytaj(p).split('\n').flatMap((l, i) => (STARA.test(l) ? [`${p}:${i + 1}: ${l.trim().slice(0, 80)}`] : [])),
    );
    expect(trafienia).toEqual([]);
  });

  it('app.json: name = PokerGym; identyfikatory techniczne bez zmian (D-384 pkt 2)', () => {
    expect(app.name).toBe(NAZWA);
    expect([app.slug, app.scheme, app.ios.bundleIdentifier, app.android.package]).toEqual([
      'szkola-pokera',
      'szkolapokera',
      'pl.lkarwowski.szkolapokera',
      'pl.lkarwowski.szkolapokera',
    ]);
  });

  it('pod ikoną „PokerGym” w każdym wydanym języku (iOS i Android)', () => {
    expect(Object.keys(app.locales).length).toBeGreaterThan(0);
    for (const sciezka of Object.values(app.locales)) {
      const j = json<{ ios: { CFBundleDisplayName: string }; android: { app_name: string } }>(`apps/mobile/${sciezka.replace(/^\.\//, '')}`);
      expect([sciezka, j.ios.CFBundleDisplayName, j.android.app_name]).toEqual([sciezka, NAZWA, NAZWA]);
    }
  });

  it('tytuł ekranu powitania = PokerGym w każdym słowniku (marka bez tłumaczenia)', () => {
    expect(slowniki.length).toBeGreaterThan(1);
    for (const p of slowniki) expect([p, json<{ welcome: { title: string } }>(p).welcome.title]).toEqual([p, NAZWA]);
  });

  it('notatki dla recenzenta i strona używają nazwy PokerGym', () => {
    expect(czytaj('store/review-notes.en.txt').startsWith(`Thank you for reviewing ${NAZWA}.`)).toBe(true);
    for (const p of lista('site', /\.html$/)) expect([p, czytaj(p).includes(`<title>${NAZWA}`)]).toEqual([p, true]);
  });
});
