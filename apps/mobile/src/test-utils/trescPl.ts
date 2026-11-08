// Ścieżka do polskiej bazy treści w paczce (tresc-<wersja>-pl.db, ADR 0005, D-229) dla testów czytających treść przez node:sqlite.
// Dokładnie jeden plik — inaczej błąd (stara wersja obok nowej oznacza nieaktualny `pnpm content:build`).
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export function sciezkaTresciPl(): string {
  const katalog = join(__dirname, '../../assets/content');
  const pliki = readdirSync(katalog).filter((f) => /^tresc-[^-/]+-pl\.db$/.test(f));
  if (pliki.length !== 1) throw new Error(`Oczekiwano jednej bazy tresc-*-pl.db w ${katalog}, jest: ${pliki.join(', ') || 'brak'}`);
  return join(katalog, pliki[0]!);
}
