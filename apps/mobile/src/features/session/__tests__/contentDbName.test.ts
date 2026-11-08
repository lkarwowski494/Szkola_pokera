/// <reference types="jest" />
/// <reference types="node" />
/**
 * Pliki treści w paczce aplikacji (ADR 0005, D-229, D-232): _layout.tsx bierze nazwę i zasób z modułu wygenerowanego przez
 * content-build (tresc.generated.ts), więc każdy plik z modułu musi leżeć w assets/content (inaczej Metro nie zbuduje
 * paczki iPhone'a), a w assets/content nie może zostać baza spoza modułu (stara wersja w paczce).
 * 08 cz. 3: zastępuje kontrakt jednej bazy content-v<CONTENT_SCHEMA_VERSION>.db (nazwa zależy teraz od wersji treści).
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JEZYKI } from '@szkola/jezyki';

const assets = join(__dirname, '../../../../assets/content');
const modul = readFileSync(join(__dirname, '../../../data/content/tresc.generated.ts'), 'utf8');
const wpisy = [...modul.matchAll(/'([^']+)': \{ plik: '([^']+)', zasob: require\('\.\.\/\.\.\/\.\.\/assets\/content\/([^']+)'\)/g)].map((m) => ({ jezyk: m[1], plik: m[2], zasob: m[3] }));

describe('bazy treści w paczce aplikacji', () => {
  it('moduł wygenerowany ma plik dla każdego z 35 języków; nazwa = zasób', () => {
    expect(wpisy.map((w) => w.jezyk).sort()).toEqual([...JEZYKI].sort());
    for (const w of wpisy) expect(w.zasob).toBe(w.plik);
  });

  it('assets/content = dokładnie pliki z modułu (bez starych wersji)', () => {
    expect(readdirSync(assets).filter((f) => f.endsWith('.db')).sort()).toEqual(wpisy.map((w) => w.plik).sort());
  });

  it('_layout.tsx nie wpisuje nazwy bazy treści na sztywno i nie kopiuje treści przy każdym starcie (ADR 0005 pkt 2)', () => {
    const layout = readFileSync(join(__dirname, '../../../app/_layout.tsx'), 'utf8');
    expect(layout).not.toMatch(/(content-v\d+|tresc-[^'"]+)\.db/);
    expect(layout).not.toMatch(/forceOverwrite|assetSource/);
    expect(readFileSync(join(__dirname, '../../../data/tresc/startTresci.ts'), 'utf8')).toMatch(/from '\.\.\/content\/tresc\.generated'/);
  });
});
