// ŚR-001: SCHEMAT_V3 w kodzie = docs/architektura/schemat-v3.sql znak w znak (jak D-199 dla v1, D-532 dla v2).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SCHEMAT_V3 } from '../src/schemat-v3';
import { SCIEZKA_SCHEMATU_V3 } from '../../../tests/narzedzia/wzorzec-bazy';

describe('ŚR-001 schemat v3 w kodzie', () => {
  it('SCHEMAT_V3 = docs/architektura/schemat-v3.sql (tekst bez zmian)', () => {
    expect(SCHEMAT_V3).toBe(readFileSync(SCIEZKA_SCHEMATU_V3, 'utf8'));
  });
});
