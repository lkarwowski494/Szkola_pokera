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

/**
 * Flowy Maestro (D-1780): asercja `ekran:<trasa>` musi stać w KODZIE kroku, nie tylko w komentarzu (Trening wycina komentarze
 * przed sprawdzeniem, `tests/przeplywy.test.ts:25`, odczyt 2026-11-16). `id` w Maestro to regex pełnego dopasowania
 * (`Filters.idMatches`, mobile-dev-inc/maestro, odczyt 2026-11-16), więc `ekran:(tabs)/index` bez ukośników nie trafiłby
 * w testID z literalnymi nawiasami; stąd test dopasowuje wzorzec z flowu do prawdziwych znaczników tras.
 */
describe('flowy Maestro: asercje ekran:<trasa> w kodzie kroków (D-1780)', () => {
  const E2E = join(__dirname, '..', '..', 'e2e');
  const pliki = (dir: string): string[] => readdirSync(dir).flatMap((n) => (statSync(join(dir, n)).isDirectory() ? pliki(join(dir, n)) : n.endsWith('.yaml') && n !== 'config.yaml' ? [join(dir, n)] : []));
  const FLOWY = pliki(E2E);
  /** Jak Trening `stripYaml`: bez komentarzy pełnowierszowych i końcowych. */
  const kod = (src: string) => src.split('\n').filter((l) => !/^\s*#/.test(l)).map((l) => l.replace(/\s#.*$/, '')).join('\n');
  const znaczniki = (src: string) => [...kod(src).matchAll(/\bid:\s*(['"])(ekran:[^'"]+)\1/g)].map((m) => m[2] as string);
  const powroty = (src: string) => [...src.matchAll(/^\s*# powrót: (\S+)/gm)].map((m) => m[1] as string);
  const dopasowane = (wzorzec: string) => TRASY.filter((t) => new RegExp(`^(?:${wzorzec})$`).test(`ekran:${t}`));

  it('flowy z znacznikami istnieją (guard przed pustym przebiegiem)', () => {
    expect(FLOWY.filter((f) => znaczniki(readFileSync(f, 'utf8')).length > 0).length).toBeGreaterThanOrEqual(10);
  });

  it.each(FLOWY.map((f) => [f.slice(E2E.length + 1), f] as const))('%s: każdy id ekran:… dopasowuje dokładnie jedną trasę (nawiasy z ukośnikiem)', (_n, f) => {
    for (const w of znaczniki(readFileSync(f, 'utf8'))) expect([w, dopasowane(w).length]).toEqual([w, 1]);
  });

  it.each(FLOWY.map((f) => [f.slice(E2E.length + 1), f] as const))('%s: każdy „# powrót: <trasa>” ma w tym samym flowie asercję tej trasy w kodzie', (_n, f) => {
    const src = readFileSync(f, 'utf8');
    const trafione = new Set(znaczniki(src).flatMap((w) => dopasowane(w)));
    for (const trasa of powroty(src)) {
      expect([trasa, TRASY.includes(trasa)]).toEqual([trasa, true]);
      expect([trasa, trafione.has(trasa)]).toEqual([trasa, true]);
    }
  });
  // IC (P3 IA): kolejność względem kroku powrotu. `# powrót: <trasa>` ma sens tylko wtedy, gdy asercja stoi PO kroku powrotu:
  // (a) komentarz stoi po kroku wstecz, a zaraz za nim (bez kroków pośrednich) asercja tej trasy (obowiązkowo dla korzenia zakładki);
  // (b) trasa inna niż korzeń zakładki: komentarz stoi przed krokiem wstecz Z tej trasy, więc za komentarzem jest krok, a dopiero po nim asercja `ekran:…` miejsca docelowego.
  type Krok = { rodzaj: 'asercja' | 'krok'; trasy: string[] };
  type Element = { powrot: string } | Krok;
  const elementy = (src: string): Element[] => {
    const wynik: Element[] = [];
    const wiersze = src.split('\n');
    for (let i = 0; i < wiersze.length; i++) {
      const w = wiersze[i] as string;
      const pow = w.match(/^\s*# powrót: (\S+)/);
      if (pow) { wynik.push({ powrot: pow[1] as string }); continue; }
      if (!/^- \S/.test(w)) continue;
      const blok = [w];
      while (i + 1 < wiersze.length && /^\s+\S/.test(wiersze[i + 1] as string)) blok.push(wiersze[++i] as string);
      const tekst = kod(blok.join('\n'));
      const asercja = /^- assert(Not)?Visible/.test(w);
      wynik.push({ rodzaj: asercja ? 'asercja' : 'krok', trasy: [...tekst.matchAll(/\bid:\s*(['"])(ekran:[^'"]+)\1/g)].flatMap((m) => dopasowane(m[2] as string)) });
    }
    return wynik;
  };
  const kolejnoscPowrotow = (src: string): string[] => {
    const el = elementy(src);
    const bledy: string[] = [];
    el.forEach((e, i) => {
      if (!('powrot' in e)) return;
      const nast = el.slice(i + 1).filter((x): x is Krok => !('powrot' in x));
      const pierwszy = nast[0];
      // (a) komentarz po kroku wstecz, zaraz za nim asercja tej trasy (korzeń zakładki; także trasa, na którą flow wraca i kończy)
      if (pierwszy?.rodzaj === 'asercja' && pierwszy.trasy.includes(e.powrot)) return;
      // (b) komentarz przed krokiem wstecz Z tej trasy (nie korzeń zakładki): krok, a po nim asercja ekran:… miejsca docelowego
      if (e.powrot.startsWith('(tabs)/')) { bledy.push(`${e.powrot}: zaraz po komentarzu ma stać asercja tego korzenia (po kroku powrotu)`); return; }
      if (pierwszy?.rodzaj !== 'krok') bledy.push(`${e.powrot}: zaraz po komentarzu ma stać krok powrotu albo asercja tej trasy`);
      else if (!nast.slice(1).some((x) => x.rodzaj === 'asercja' && x.trasy.length > 0)) bledy.push(`${e.powrot}: po kroku powrotu brak asercji ekran:… miejsca docelowego`);
    });
    return bledy;
  };

  it.each(FLOWY.map((f) => [f.slice(E2E.length + 1), f] as const))('%s: asercja miejsca docelowego stoi po kroku powrotu (IC)', (_n, f) => {
    expect(kolejnoscPowrotow(readFileSync(f, 'utf8'))).toEqual([]);
  });

  it('kontrola kolejności łapie błędne układy (mutanty)', () => {
    const korzen = "- assertVisible:\n    id: 'ekran:\\(tabs\\)/index'\n";
    const sesja = "- assertVisible:\n    id: 'ekran:session'\n";
    expect(kolejnoscPowrotow(`${sesja}# powrót: session\n- tapOn: 'Zamknij'\n# powrót: (tabs)/index\n${korzen}`)).toEqual([]);
    // asercja korzenia przed komentarzem, za komentarzem krok
    expect(kolejnoscPowrotow(`${sesja}${korzen}# powrót: (tabs)/index\n- tapOn: 'X'\n`)).toHaveLength(1);
    // komentarz przy trasie nie-korzeniu, ale za nim od razu asercja (brak kroku powrotu)
    expect(kolejnoscPowrotow(`# powrót: session\n${korzen}`)).toHaveLength(1);
    // krok powrotu jest, ale po nim nie ma asercji miejsca docelowego
    expect(kolejnoscPowrotow(`${sesja}# powrót: session\n- tapOn: 'Zamknij'\n- takeScreenshot: x\n`)).toHaveLength(1);
    // asercja stoi tylko PRZED komentarzem
    expect(kolejnoscPowrotow(`${korzen}# powrót: (tabs)/index\n`)).toHaveLength(1);
  });
});
