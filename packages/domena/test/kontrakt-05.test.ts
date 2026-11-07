// Kontrola roli 05 (tryb fix 2026-11-07, docs/architektura/fix-05-2026-11-07.md): każda decyzja kontraktu, którą kod już
// stosuje, jest zapisana w dokumencie architektury. Każde ID dopisuje swoje wiersze w commicie z poprawką dokumentu;
// wiersz jest czerwony, dopóki dokument nie zawiera frazy.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const dok = (plik: string) => readFileSync(new URL(`../../../docs/${plik}`, import.meta.url), 'utf8');
const WIERSZE: [id: string, plik: string, fraza: string][] = [
  ['L8-01', 'architektura/moduly.md', 'BladStartuPostepu'],
  ['L8-01', 'architektura/tlo-i-bledy.md', 'BladStartuPostepu'],
];

describe('kontrakt-05: decyzje kodu zapisane w dokumentach', () => {
  it.each(WIERSZE)('%s: %s zawiera „%s”', (_id, plik, fraza) => {
    expect(dok(plik).includes(fraza)).toBe(true);
  });
});
