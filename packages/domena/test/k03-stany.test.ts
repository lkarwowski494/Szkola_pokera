// K-03 (docs/architektura/kontrole-07.md): listy stanów eksportowane z domeny = listy w CHECK schematu.
// Wyrocznia: docs/architektura/schemat.sql (+ moduly.md „Maszyny stanów”), nie ADR 0007 pkt 1 (D-168, JAK-E1-01).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { OCENY_ODPOWIEDZI, RODZAJE_AKTYWNOSCI, STANY_AKTYWNOSCI } from '../src';

const schemat = readFileSync(new URL('../../../docs/architektura/schemat.sql', import.meta.url), 'utf8');
function listaCheck(kolumna: string): string[] {
  const m = schemat.match(new RegExp(`\\n\\s*${kolumna} TEXT NOT NULL CHECK \\(${kolumna} IN \\(([^)]*)\\)\\)`));
  if (!m) throw new Error(`brak CHECK dla ${kolumna} w schemat.sql`);
  return m[1]!.split(',').map((s) => s.trim().replace(/^'|'$/g, ''));
}

describe('K-03: stany maszyn = listy w CHECK', () => {
  it.each([
    ['rodzaj', RODZAJE_AKTYWNOSCI],
    ['stan', STANY_AKTYWNOSCI],
    ['ocena', OCENY_ODPOWIEDZI],
  ] as const)('%s', (kolumna, lista) => {
    expect([...lista].sort()).toEqual(listaCheck(kolumna).sort());
  });
});
