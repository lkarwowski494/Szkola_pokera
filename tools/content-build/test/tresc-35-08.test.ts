// Rola 08 (D-228, D-229, D-231): 35 baz treści — źródło tekstu z łańcucha zastępczego, wersja ze skrótu treści,
// zapis z usunięciem starych plików i kontrola `content:check` (brak, nieaktualny, obcy plik). Uzupełnia K-06 roli 07
// (`k06-content-build`), który sprawdza tylko pliki w paczce aplikacji.
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, describe, expect, it } from 'vitest';
import { compileContent, sprawdzTresci, staleContentDbs, wersjaTresci, writeContentDbs } from '../src/build';

const contentDir = join(resolve(import.meta.dirname, '../../..'), 'content');
const katalogi: string[] = [];
afterAll(() => { for (const k of katalogi) rmSync(k, { recursive: true, force: true }); });
const tymczasowy = (p: string) => { const k = mkdtempSync(join(tmpdir(), p)); katalogi.push(k); return k; };

const pamiec = new Map<string, ReturnType<typeof compileContent>>();
const skompiluj = (j: string) => pamiec.get(j) ?? (pamiec.set(j, compileContent(contentDir, j)), pamiec.get(j)!);

// Kompilacja treści jednego języka trwa ok. 1 s lokalnie i do ok. 4 s na runnerze GitHuba (CI 42459236698: T35-08-a 7,3 s przy
// domyślnych 5 s); limit dotyczy czasu kompilacji, nie asercji.
describe('Treść na 35 języków (rola 08)', { timeout: 60_000 }, () => {
  it('T35-08-a język bez content/<język>: tekst ze źródła pl, liczby w formacie języka bazy, osobny skrót', () => {
    // łańcuch sv → en → pl (D-320): od nałożenia przekładu en (rola 09, K5, D-344) tekst bazy pochodzi z content/en;
    // do sesji AK (D-393) badanym językiem był de — od nałożenia de ma własny katalog, więc tu sv (CLDR: spacja przed %)
    const pl = skompiluj('pl'), sv = skompiluj('sv');
    const zastepczy = existsSync(join(contentDir, 'en')) ? 'en' : 'pl';
    expect([pl.tekst, sv.tekst, sv.locale]).toEqual(['pl', zastepczy, 'sv']);
    expect(sv.modules).toEqual(skompiluj(zastepczy).modules);
    expect(sv.numbers.map((n) => n.value)).toEqual(pl.numbers.map((n) => n.value));
    expect(sv.numbers.find((n) => n.display.includes('%'))?.display).toMatch(/\s%$/u);
    expect(sv.hash).not.toBe(pl.hash);
  });

  it('T35-08-b język z content/<język> bierze swój tekst; wariant bez katalogu idzie łańcuchem (es-419 → es → pl)', () => {
    const root = tymczasowy('tresc35-');
    cpSync(contentDir, join(root, 'content'), { recursive: true });
    symlinkSync(join(contentDir, '..', 'tools'), join(root, 'tools'));
    symlinkSync(join(contentDir, '..', 'docs'), join(root, 'docs'));
    cpSync(join(root, 'content/pl'), join(root, 'content/es'), { recursive: true });
    const plik = join(root, 'content/es/modules.yaml');
    writeFileSync(plik, readFileSync(plik, 'utf8').replace('title: "Zasady i układy"', 'title: "Fundamentos"'));
    const es = compileContent(join(root, 'content'), 'es');
    const es419 = compileContent(join(root, 'content'), 'es-419');
    expect([es.tekst, es419.tekst]).toEqual(['es', 'es']);
    expect(es.modules[0]?.title).toBe('Fundamentos');
    expect(es419.modules[0]?.title).toBe('Fundamentos');
    expect(compileContent(join(root, 'content'), 'nl').tekst).toBe(existsSync(join(root, 'content/en')) ? 'en' : 'pl');
  });

  it('T35-08-c nieznany język → błąd budowy (nie cicha baza pod złą nazwą)', () => {
    expect(() => compileContent(contentDir, 'xx')).toThrow(/xx/);
  });

  it('T35-08-d wersja: deterministyczna, niezależna od kolejności, zmienia się przy zmianie treści dowolnego języka; bez „-” i „/”', () => {
    const pl = skompiluj('pl'), de = skompiluj('de');
    const w = wersjaTresci([pl, de]);
    expect(w).toMatch(/^[0-9a-f]{10}$/);
    expect(wersjaTresci([de, pl])).toBe(w);
    expect(wersjaTresci([pl, { ...de, hash: '0'.repeat(16) }])).not.toBe(w);
  });

  it('T35-08-e zapis: pliki tresc-<wersja>-<język>.db z manifestem; stare content-v*.db i tresc-* innej wersji usunięte, obcy plik zostaje', () => {
    const pl = skompiluj('pl'), de = skompiluj('de');
    const out = tymczasowy('tresc35-out-');
    for (const f of ['content-v6.db', 'tresc-0123456789-pl.db', 'inne.db']) writeFileSync(join(out, f), '');
    const sciezki = writeContentDbs([pl, de], out);
    const w = wersjaTresci([pl, de]);
    expect(readdirSync(out).sort()).toEqual(['inne.db', `tresc-${w}-de.db`, `tresc-${w}-pl.db`]);
    expect(sciezki.map((s) => s.slice(out.length + 1)).sort()).toEqual([`tresc-${w}-de.db`, `tresc-${w}-pl.db`]);
    const db = new DatabaseSync(join(out, `tresc-${w}-de.db`), { readOnly: true });
    const meta = Object.fromEntries((db.prepare('SELECT key, value FROM meta').all() as { key: string; value: string }[]).map((r) => [r.key, r.value]));
    db.close();
    expect(meta).toMatchObject({ format: '1', wersja: w, jezyk: 'de', jezyk_tekstu: de.tekst, min_wersja_aplikacji: '0.1.0', hash: de.hash });
  });

  it('T35-08-f kontrola: obcy plik .db, brak pliku i plik nieaktualny są błędami; po pełnym zapisie brak błędów', () => {
    const pl = skompiluj('pl'), de = skompiluj('de');
    const out = tymczasowy('tresc35-chk-');
    writeContentDbs([pl, de], out);
    writeFileSync(join(out, 'inne.db'), '');
    expect(sprawdzTresci([pl, de], out).join('\n')).toMatch(/inne\.db/);
    rmSync(join(out, 'inne.db'));
    expect(sprawdzTresci([pl, de], out)).toEqual([]);
    const w = wersjaTresci([pl, de]);
    rmSync(join(out, `tresc-${w}-de.db`));
    expect(sprawdzTresci([pl, de], out).join('\n')).toMatch(new RegExp(`tresc-${w}-de\\.db`));
    // ta sama nazwa pliku, ale inny skrót w manifeście (np. ręcznie podmieniona baza) — nieaktualny
    writeContentDbs([pl, de], out);
    const baza = new DatabaseSync(join(out, `tresc-${w}-de.db`));
    baza.prepare("UPDATE meta SET value = ? WHERE key = 'hash'").run('f'.repeat(16));
    baza.close();
    expect(sprawdzTresci([pl, de], out).join('\n')).toMatch(new RegExp(`tresc-${w}-de\\.db: nieaktualny`));
    expect(existsSync(join(out, `tresc-${w}-pl.db`))).toBe(true);
  });

  it('T35-08-g staleContentDbs: content-v*.db i tresc-*.db spoza listy; inne pliki nie', () => {
    const out = tymczasowy('tresc35-stale-');
    for (const f of ['content-v3.db', 'tresc-a-pl.db', 'tresc-b-pl.db', 'tresc-b-pl.db-journal', 'inne.db']) writeFileSync(join(out, f), '');
    expect(staleContentDbs(out, ['tresc-b-pl.db']).sort()).toEqual(['content-v3.db', 'tresc-a-pl.db']);
    expect(staleContentDbs(join(out, 'brak'), [])).toEqual([]);
  });
});
