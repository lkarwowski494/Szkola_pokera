/// <reference types="jest" />
/// <reference types="node" />
/**
 * Znaczniki ekranów dla bramki scenariuszy (IA, D-1780/D-1830): korzeń każdego ekranu trasy ma testID `ekran:<trasa>`,
 * a `<trasa>` to ścieżka pliku względem `src/app` bez rozszerzenia (jak inwentarz w `scripts/sprawdz-scenariusze.mjs`,
 * `ekranyZKatalogu`). Flow Maestro sprawdza ten testID asercją widoczności; test pilnuje, żeby nowy ekran go miał.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { znacznikEkranu } from '@/components/ZnacznikEkranu';

const APP = join(__dirname, '..', 'app');

/** Ta sama reguła co `ekranyZKatalogu` w skrypcie bramki: pomija `_*`, `.*`, `+*` (poza `+not-found`), `.test`/`.spec`/`.d`. */
function ekrany(dir: string, pre = ''): string[] {
  return readdirSync(dir).flatMap((n) => {
    if (/^[_.]/.test(n) || (n.startsWith('+') && !n.startsWith('+not-found')) || /(\+api|\.test|\.spec|\.d)\.\w+$/.test(n)) return [];
    if (statSync(join(dir, n)).isDirectory()) return ekrany(join(dir, n), `${pre}${n}/`);
    return /\.(tsx|jsx|ts|js)$/.test(n) ? [`${pre}${n.replace(/\.\w+$/, '')}`] : [];
  });
}

const TRASY = ekrany(APP).sort();

describe('znacznik ekranu: opakowanie trasy', () => {
  it('daje korzeniowi testID ekran:<trasa> i renderuje ekran', async () => {
    const Ekran = () => <Text>zawartość</Text>;
    const Opakowany = znacznikEkranu('przyklad/[id]', Ekran);
    await render(<Opakowany />);
    expect(screen.getByTestId('ekran:przyklad/[id]')).toBeTruthy();
    expect(screen.getByText('zawartość')).toBeTruthy();
  });
});

describe('każdy ekran trasy ma znacznik ekran:<trasa> (D-1780)', () => {
  it('inwentarz ma 15 ekranów (zmiana liczby = świadoma zmiana katalogu PU)', () => {
    expect(TRASY).toEqual([
      '(tabs)/index', '(tabs)/lessons', '(tabs)/progress', 'advancement', 'data', 'diagnostics', 'glossary',
      'help', 'language', 'lesson/[id]', 'purchase', 'scenario', 'scenarios', 'session', 'settings',
    ]);
  });

  it.each(TRASY)('%s: domyślny eksport opakowany znacznikiem własnej trasy', (trasa) => {
    const plik = ['tsx', 'ts'].map((r) => join(APP, `${trasa}.${r}`)).find((p) => { try { return statSync(p).isFile(); } catch { return false; } });
    expect(plik).toBeDefined();
    const tekst = readFileSync(plik as string, 'utf8');
    const wzor = new RegExp(`^export default znacznikEkranu\\('${trasa.replace(/[()[\]/]/g, '\\$&')}',`, 'm');
    expect(tekst).toMatch(wzor);
    // znacznik nie może należeć do innej trasy: dokładnie jedno wywołanie w pliku
    expect(tekst.match(/znacznikEkranu\(/g)?.length).toBe(1);
  });
});
