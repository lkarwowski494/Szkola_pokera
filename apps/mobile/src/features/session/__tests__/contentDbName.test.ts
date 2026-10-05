/// <reference types="jest" />
/// <reference types="node" />
/**
 * Nazwa bazy treści w aplikacji musi odpowiadać CONTENT_SCHEMA_VERSION: _layout.tsx wczytuje plik przez require
 * (Metro dołącza go do paczki), więc po podniesieniu wersji stara nazwa zepsułaby build iPhone'a.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONTENT_SCHEMA_VERSION } from '@szkola/content-schema';

const name = `content-v${CONTENT_SCHEMA_VERSION}.db`;
const assets = join(__dirname, '../../../../assets/content');

describe('baza treści w paczce aplikacji', () => {
  it('_layout.tsx otwiera i dołącza bazę aktualnej wersji schematu', () => {
    const layout = readFileSync(join(__dirname, '../../../app/_layout.tsx'), 'utf8');
    const used = [...layout.matchAll(/content-v\d+\.db/g)].map((m) => m[0]);
    expect(used.length).toBeGreaterThan(0);
    expect(new Set(used)).toEqual(new Set([name]));
  });

  it('w assets/content jest tylko baza aktualnej wersji', () => {
    expect(existsSync(join(assets, name))).toBe(true);
    expect(readdirSync(assets).filter((f) => /^content-v\d+\.db$/.test(f))).toEqual([name]);
  });
});
