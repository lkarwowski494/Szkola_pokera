// Kontrola roli 05 (tryb fix 2026-11-07, docs/architektura/fix-05-2026-11-07.md): każda decyzja kontraktu, którą kod już
// stosuje, jest zapisana w dokumencie architektury. Każde ID dopisuje swoje wiersze w commicie z poprawką dokumentu;
// wiersz jest czerwony, dopóki dokument nie zawiera frazy.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const dok = (plik: string) => readFileSync(new URL(`../../../docs/${plik}`, import.meta.url), 'utf8');
const WIERSZE: [id: string, plik: string, fraza: string][] = [
  ['L8-01', 'architektura/moduly.md', 'BladStartuPostepu'],
  ['L8-01', 'architektura/tlo-i-bledy.md', 'BladStartuPostepu'],
  ['L8-02', 'adr/0008-kopia-eksport-json-i-kopia-systemu.md', 'kopiaBazy'],
  ['L8-02', 'adr/0003-port-bazy-kolejka-migracje.md', 'postep-przed-v'],
  ['L8-02', 'architektura/moduly.md', 'kopiaBazy'],
  ['L8-03', 'architektura/moduly.md', 'dlugaOperacja'],
  ['L8-04', 'architektura/moduly.md', 'bezKonca: readonly string[]'],
  ['L8-04', 'adr/0006-platnosci-expo-iap.md', 'PRODUKTY_BEZ_KONCA'],
  ['L8-05', 'architektura/moduly.md', "'brak_zgody' | 'planowanie_nieudane'"],
  ['L8-05', 'architektura/tlo-i-bledy.md', '`planowanie_nieudane`'],
  ['JAK-E1-01', 'adr/0007-licznik-dziennego-limitu-lokalny.md', 'Erratum (JAK-E1-01'],
  ['D-214', 'architektura/moduly.md', '| `brak_zakupow` | komunikat zamknięty | `bezczynny`'],
  ['D-210', 'architektura/moduly.md', 'Rezygnacja (`anuluj`, D-210)'],
  ['D-210', 'architektura/moduly.md', 'wejscieDoAktywnosci(rodzaj, trescId'],
  ['L7-13a', 'architektura/moduly.md', 'export function stanKursu('],
  ['L7-13a', 'architektura/moduly.md', '"ostatniaProsbaMs"'],
  ['L8-03', 'adr/0013-ochrona-dlugich-operacji-przed-zawieszeniem.md', 'dlugaOperacja'],
];

describe('kontrakt-05: decyzje kodu zapisane w dokumentach', () => {
  it.each(WIERSZE)('%s: %s zawiera „%s”', (_id, plik, fraza) => {
    expect(dok(plik).includes(fraza)).toBe(true);
  });
});
