// D-199: SCHEMAT_V1 w kodzie = docs/architektura/schemat.sql znak w znak (wyrocznia schematu: rola 05). Zmiana pliku bez zmiany kodu
// (albo odwrotnie) daje tu czerwień, zanim K-02 porówna sqlite_schema.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SCHEMAT_V1 } from '../src/schemat-v1';
import { SCIEZKA_SCHEMATU } from '../../../tests/narzedzia/wzorzec-bazy';

describe('D-199 schemat v1 w kodzie', () => {
  it('SCHEMAT_V1 = docs/architektura/schemat.sql (tekst bez zmian)', () => {
    expect(SCHEMAT_V1).toBe(readFileSync(SCIEZKA_SCHEMATU, 'utf8'));
  });
});
