// D-532: SCHEMAT_V2 w kodzie = docs/architektura/schemat-v2.sql znak w znak (jak D-199 dla v1).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SCHEMAT_V2 } from '../src/schemat-v2';
import { SCIEZKA_SCHEMATU_V2 } from '../../../tests/narzedzia/wzorzec-bazy';

describe('D-532 schemat v2 w kodzie', () => {
  it('SCHEMAT_V2 = docs/architektura/schemat-v2.sql (tekst bez zmian)', () => {
    expect(SCHEMAT_V2).toBe(readFileSync(SCIEZKA_SCHEMATU_V2, 'utf8'));
  });
});
