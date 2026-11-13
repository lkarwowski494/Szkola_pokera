// 08-programista-303 (GB; recenzja FX, KO-099; mutant M2): gałąź „liczba z LICZBY_ZAREZERWOWANE jest już używana” w compileContent ma test.
// Kopia content/ z jednym użyciem {{n:eq.bet-two-thirds}} (klucz z listy D-1490/D-1461) w lekcji pl: budowanie ma zgłosić ostrzeżenie „usuń z listy”,
// a bez użycia (treść bez zmian) tego ostrzeżenia nie ma (fv-d1461 sprawdza oba klucze). Test nie zmienia content/ w repo.
// HA (D-1562, D-1566): lista w kodzie jest pusta (D-1490 wygasło z wejściem SC-13), więc test podaje listę opcją `liczbyZarezerwowane`.
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { compileContent } from '../src/build';

const LISTA = { 'eq.bet-two-thirds': 'test 08-programista-303' } as const;

const root = resolve(import.meta.dirname, '../../..');
const LEKCJA = join('lessons', 'm9-l4-plan-trzech-ulic.md');

/** Ostrzeżenia budowy kopii pl, w której `{{n:spr.srp}}` pierwszej lekcji zastąpiono `{{n:<klucz>}}`. */
function ostrzezenia(klucz: string): string[] {
  const kopia = mkdtempSync(join(tmpdir(), 'gb303-'));
  try {
    cpSync(join(root, 'content'), join(kopia, 'content'), { recursive: true });
    symlinkSync(join(root, 'tools'), join(kopia, 'tools'));
    symlinkSync(join(root, 'docs'), join(kopia, 'docs'));
    const plik = join(kopia, 'content', 'pl', LEKCJA);
    const tekst = readFileSync(plik, 'utf8');
    expect(tekst).toContain('{{n:spr.srp}}');
    writeFileSync(plik, tekst.replace('{{n:spr.srp}}', `{{n:${klucz}}}`));
    return compileContent(join(kopia, 'content'), 'pl', { kontrolaGeneratora: false, liczbyZarezerwowane: LISTA }).warnings;
  } finally { rmSync(kopia, { recursive: true, force: true }); }
}

describe('08-programista-303: liczba zarezerwowana użyta w treści jest zgłaszana do usunięcia z listy', () => {
  it('eq.bet-two-thirds użyte w lekcji pl: ostrzeżenie „jest już używana: usuń ją z LICZBY_ZAREZERWOWANE” (M2: bez gałęzi ostrzeżenia brak wpisu)', () => {
    const w = ostrzezenia('eq.bet-two-thirds');
    expect(w.filter((x) => /liczba eq\.bet-two-thirds jest już używana: usuń ją z LICZBY_ZAREZERWOWANE/.test(x))).toHaveLength(1);
  }, 120_000);
});
