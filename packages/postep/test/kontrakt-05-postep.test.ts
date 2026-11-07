// Strażnik roli 05 (L8-02, fix 2026-11-07; ADR 0003 pkt 5): runner migracji nie robi jeszcze kopii `postep-przed-v<N>.db`,
// bo schemat v1 nie ma migracji z przebudową. Pierwsza taka migracja ma przyjść razem z krokiem kopii w `migruj` i testem
// na kopii bazy — wtedy ten strażnik zastępuje test kopii (zmiana z powodem).
import { describe, expect, it } from 'vitest';
import { listaMigracji } from '../src';

describe('kontrakt-05: kopia przed migracją z przebudową', () => {
  it('żadna migracja nie ma `przebudowa: true`, dopóki `migruj` nie robi kopii VACUUM INTO', () => {
    expect(listaMigracji().filter((m) => m.przebudowa).map((m) => m.wersja)).toEqual([]);
  });
});
