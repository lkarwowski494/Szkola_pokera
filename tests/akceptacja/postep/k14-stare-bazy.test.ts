// K-14 (kontrole-07.md; ADR 0004 „Potwierdzenie”): stare bazy `user.db`, `user.db-wal`, `user.db-shm` z buildów 1005–1008
// nietknięte przy starcie nowej wersji (sumy SHA-256 przed = po, żadne wywołanie plików na nich), także przy bazie uszkodzonej
// i przy kolejnym starcie; „Usuń postęp” usuwa je i nic poza nimi. Kopia syntetyczna w trybie WAL (strategia.md §4: prawdziwa
// baza testera nie trafia do repo); prawdziwa aktualizacja z 1008 z danymi = telefon (§8).
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { uruchomPostep, usunStareBazy } from '../../../packages/postep/src';
import { adapterNode, otworzNode } from '../../narzedzia/postep-node';
import { plikiNode, sumyKatalogu } from '../../narzedzia/pliki-node';
import { T0 } from '../../narzedzia/wzorzec-bazy';
import { katalogTymczasowy, sprzatnij } from '../../../packages/postep/test/wspolne';

afterEach(sprzatnij);
const STARE = ['user.db', 'user.db-shm', 'user.db-wal'];

// Stara baza w trybie WAL z niezapisanym do pliku głównego `-wal` (kopiowana przy otwartym połączeniu); schemat jak drizzle.
function stareBazy(k: string) {
  const zrodlo = katalogTymczasowy();
  const db = new DatabaseSync(join(zrodlo, 'user.db'));
  db.exec("PRAGMA journal_mode = WAL; PRAGMA wal_autocheckpoint = 0;");
  db.exec('CREATE TABLE __drizzle_migrations (id INTEGER PRIMARY KEY, hash TEXT NOT NULL, created_at NUMERIC)');
  db.exec('CREATE TABLE answers (id TEXT PRIMARY KEY, drill_id TEXT, correct INTEGER)');
  for (let i = 0; i < 20; i++) db.prepare('INSERT INTO answers VALUES (?, ?, ?)').run(`a${i}`, `d${i % 3}`, i % 2);
  for (const n of STARE) cpSync(join(zrodlo, n), join(k, n));
  db.close();
  expect(readdirSync(k).sort()).toEqual(STARE);
}
const sumyStarych = (k: string) => Object.fromEntries(Object.entries(sumyKatalogu(k)).filter(([n]) => STARE.includes(n)));
const otworz = async (s: string) => adapterNode(otworzNode(s));

describe('K-14 stare user.db* przy starcie nowej wersji', () => {
  it('K-14: pierwszy start (brak postep.db), zapis i zamknięcie → user.db* te same bajty, żadne wywołanie plików na nich, powstaje postep.db', async () => {
    const k = katalogTymczasowy();
    stareBazy(k);
    const przed = sumyStarych(k);
    const { pliki, wywolania } = plikiNode();
    const { port } = await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 });
    await port.run("INSERT INTO ustawienie VALUES ('jezyk', '\"en\"', ?)", [T0]);
    await port.zamknij();
    expect(sumyStarych(k)).toEqual(przed);
    expect(wywolania.filter((w) => `${w.z} ${w.na ?? ''}`.includes('user.db'))).toEqual([]);
    expect(existsSync(join(k, 'postep.db'))).toBe(true);
  });
  it('K-14: drugi start i start przy uszkodzonej postep.db → user.db* te same bajty', async () => {
    const k = katalogTymczasowy();
    stareBazy(k);
    const przed = sumyStarych(k);
    const { pliki, wywolania } = plikiNode();
    await (await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 })).port.zamknij();
    await (await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 + 1 })).port.zamknij();
    writeFileSync(join(k, 'postep.db'), Buffer.alloc(4096, 0x41));
    const trzeci = await uruchomPostep({ katalog: k, pliki, otworz, terazMs: T0 + 2 });
    expect(trzeci.uszkodzona).toBe(join(k, `postep-uszkodzona-${T0 + 2}.db`));
    await trzeci.port.zamknij();
    expect(sumyStarych(k)).toEqual(przed);
    expect(wywolania.filter((w) => `${w.z} ${w.na ?? ''}`.includes('user.db'))).toEqual([]);
  });
});

describe('K-14 / ADR 0004 wyjątek: „Usuń postęp” usuwa stare bazy', () => {
  it('K-14: usunStareBazy usuwa user.db, -wal, -shm; postep.db, plik uszkodzony i inne pliki zostają z tymi samymi bajtami', async () => {
    const k = katalogTymczasowy();
    stareBazy(k);
    writeFileSync(join(k, 'postep.db'), 'p');
    writeFileSync(join(k, `postep-uszkodzona-${T0}.db`), 'u');
    writeFileSync(join(k, 'user.db.txt'), 'obcy plik o podobnej nazwie');
    const inne = Object.fromEntries(Object.entries(sumyKatalogu(k)).filter(([n]) => !STARE.includes(n)));
    const { pliki } = plikiNode();
    expect(await usunStareBazy(pliki, k)).toEqual({ ok: true, wartosc: undefined });
    expect(sumyKatalogu(k)).toEqual(inne);
  });
  it('K-14: usunStareBazy bez części plików (tylko user.db) i bez żadnego → ok, nic innego nie usunięte', async () => {
    const k = katalogTymczasowy();
    writeFileSync(join(k, 'user.db'), 'x');
    writeFileSync(join(k, 'postep.db'), 'p');
    const { pliki } = plikiNode();
    expect(await usunStareBazy(pliki, k)).toEqual({ ok: true, wartosc: undefined });
    expect(readdirSync(k)).toEqual(['postep.db']);
    expect(await usunStareBazy(pliki, k)).toEqual({ ok: true, wartosc: undefined });
  });
});

describe('ADR 0004 kontrola statyczna', () => {
  it('ADR 0004: „user.db” w kodzie (packages/*/src, apps/mobile/src, bez testów i komentarzy) tylko w packages/postep/src/start.ts', () => {
    const korzen = join(dirname(fileURLToPath(import.meta.url)), '../../..');
    const pliki = (d: string): string[] => readdirSync(d, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? (['node_modules', '__tests__'].includes(e.name) ? [] : pliki(join(d, e.name)))
        : /\.(ts|tsx|js|mjs)$/.test(e.name) && !/\.test\./.test(e.name) ? [join(d, e.name)] : []);
    const katalogi = [join(korzen, 'apps/mobile/src'), ...readdirSync(join(korzen, 'packages')).map((p) => join(korzen, 'packages', p, 'src'))].filter(existsSync);
    const z = katalogi.flatMap(pliki).filter((p) => readFileSync(p, 'utf8').split('\n').some((l) => !/^\s*(\/\/|\/?\*)/.test(l) && l.includes('user.db'))).map((p) => relative(korzen, p));
    expect(z).toEqual(['packages/postep/src/start.ts']);
  });
});
