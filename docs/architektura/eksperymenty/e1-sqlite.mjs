// Eksperymenty E1 roli 05 (Szkoła Pokera, 2026-11-04). Uruchom: node eksperymenty.mjs <katalog-tymczasowy>
// Każdy eksperyment wypisuje WYNIK i OK/BŁĄD; kod wyjścia 1, gdy którykolwiek wynik różni się od oczekiwanego.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, rmSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const tmp = process.argv[2] ?? './tmp';
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
let bledy = 0;
const sprawdz = (nazwa, wynik, oczekiwane) => {
  const ok = JSON.stringify(wynik) === JSON.stringify(oczekiwane);
  if (!ok) bledy++;
  console.log(`${ok ? 'OK   ' : 'BŁĄD '} ${nazwa}: wynik=${JSON.stringify(wynik)} oczekiwane=${JSON.stringify(oczekiwane)}`);
};
const czekaj = (ms) => new Promise((r) => setTimeout(r, ms));

// Baza jak w aplikacji: klucze obce domyślnie wyłączone (SQLite), włączane pragmą przy otwarciu.
const otworz = (sciezka = ':memory:') => {
  const db = new DatabaseSync(sciezka, { enableForeignKeyConstraints: false });
  db.exec('PRAGMA foreign_keys = ON');
  return db;
};
const SCHEMAT = `
CREATE TABLE karta (id TEXT PRIMARY KEY NOT NULL, stan TEXT NOT NULL CHECK (stan IN ('nowa','nauka','powtorka')), zmieniono_ms INTEGER NOT NULL);
CREATE TABLE log_powtorki (id INTEGER PRIMARY KEY, karta_id TEXT NOT NULL REFERENCES karta(id) ON DELETE CASCADE, ocena INTEGER NOT NULL);
CREATE INDEX idx_log_karta ON log_powtorki(karta_id);`;
const ile = (db, t) => db.prepare(`SELECT count(*) AS n FROM ${t}`).get().n;

// --- Port bazy: run/all/transakcja; wariant bez kolejki i z kolejką ---
function portBez(db) {
  return {
    run: async (sql, p = []) => db.prepare(sql).run(...p),
    all: async (sql, p = []) => db.prepare(sql).all(...p),
    // jak withTransactionAsync: BEGIN na wspólnym połączeniu, zapytania innych wołających trafiają do tej transakcji
    transakcja: async (fn) => {
      db.exec('BEGIN');
      try { const w = await fn(); db.exec('COMMIT'); return w; } catch (e) { db.exec('ROLLBACK'); throw e; }
    },
  };
}
function portZKolejka(db) {
  let ogon = Promise.resolve();
  const wKolejce = (zadanie) => { const w = ogon.then(zadanie); ogon = w.catch(() => {}); return w; };
  const baza = portBez(db);
  return {
    run: (sql, p) => wKolejce(() => baza.run(sql, p)),
    all: (sql, p) => baza.all(sql, p), // odczyt poza kolejką
    transakcja: (fn) => wKolejce(() => baza.transakcja(() => fn(baza))), // fn dostaje to samo połączenie, bez ponownego kolejkowania
  };
}
async function scenariuszKolejki(port, db) {
  // A: transakcja, która czeka (await) i kończy się błędem; B: niezależny zapis w tym czasie.
  const a = port.transakcja(async (tx) => {
    await (tx ?? port).run("INSERT INTO karta VALUES ('a','nowa',1)");
    await czekaj(20);
    throw new Error('błąd w A');
  }).catch(() => 'A wycofana');
  await czekaj(5);
  const b = port.run("INSERT INTO karta VALUES ('b','nowa',2)").then(() => 'B zapisana');
  await Promise.all([a, b]);
  return db.prepare('SELECT id FROM karta ORDER BY id').all().map((r) => r.id);
}

// E1a: bez kolejki zapis B ginie razem z wycofaną transakcją A
{
  const db = otworz(); db.exec(SCHEMAT);
  sprawdz('E1a bez kolejki: zapis B przeżył wycofanie A', await scenariuszKolejki(portBez(db), db), []);
}
// E1b: z kolejką zapis B przeżywa
{
  const db = otworz(); db.exec(SCHEMAT);
  sprawdz('E1b z kolejką: zapis B przeżył wycofanie A', await scenariuszKolejki(portZKolejka(db), db), ['b']);
}
// E1c: PRAGMA foreign_keys odczytane wewnątrz transakcji portu
{
  const db = otworz(); db.exec(SCHEMAT);
  const port = portZKolejka(db);
  const fk = await port.transakcja(async (tx) => (await tx.all('PRAGMA foreign_keys'))[0].foreign_keys);
  sprawdz('E1c foreign_keys w transakcji zapisu', fk, 1);
  db.exec('BEGIN'); db.exec('PRAGMA foreign_keys = OFF'); const wTx = db.prepare('PRAGMA foreign_keys').get().foreign_keys; db.exec('COMMIT');
  sprawdz('E1d PRAGMA foreign_keys=OFF w transakcji nic nie robi', wTx, 1);
}

// E2: REPLACE kontra UPSERT na rekordzie nadrzędnym z dziećmi
{
  const db = otworz(); db.exec(SCHEMAT);
  const zasiej = () => { db.exec("DELETE FROM karta; INSERT INTO karta VALUES ('k1','nauka',1); INSERT INTO log_powtorki (karta_id, ocena) VALUES ('k1',3),('k1',4);"); };
  zasiej();
  db.prepare('INSERT OR REPLACE INTO karta VALUES (?,?,?)').run('k1', 'powtorka', 2);
  sprawdz('E2a INSERT OR REPLACE: logi karty po zapisie', ile(db, 'log_powtorki'), 0);
  zasiej();
  db.prepare("INSERT INTO karta (id, stan, zmieniono_ms) VALUES (?,?,?) ON CONFLICT (id) DO UPDATE SET stan = excluded.stan, zmieniono_ms = excluded.zmieniono_ms").run('k1', 'powtorka', 2);
  sprawdz('E2b UPSERT: logi karty po zapisie', ile(db, 'log_powtorki'), 2);
  sprawdz('E2c UPSERT: stan karty', db.prepare("SELECT stan FROM karta WHERE id='k1'").get().stan, 'powtorka');
}

// E3: kaskada przy usunięciu postępu (BR-DANE-003) z kluczami włączonymi i bez
{
  const db = otworz(); db.exec(SCHEMAT);
  db.exec("INSERT INTO karta VALUES ('k1','nauka',1); INSERT INTO log_powtorki (karta_id, ocena) VALUES ('k1',3),('k1',4); DELETE FROM karta;");
  sprawdz('E3a kaskada z foreign_keys=ON: osierocone logi', ile(db, 'log_powtorki'), 0);
  const bez = new DatabaseSync(':memory:', { enableForeignKeyConstraints: false }); bez.exec(SCHEMAT);
  bez.exec("INSERT INTO karta VALUES ('k1','nauka',1); INSERT INTO log_powtorki (karta_id, ocena) VALUES ('k1',3),('k1',4); DELETE FROM karta;");
  sprawdz('E3b bez pragmy: osierocone logi', ile(bez, 'log_powtorki'), 2);
  sprawdz('E3c bez pragmy: naruszenia foreign_key_check', bez.prepare('PRAGMA foreign_key_check').all().length, 2);
}

// E4: runner migracji 12 kroków (moduł dane-lokalne-sqlite) na adapterze node:sqlite
const adapter = (db) => ({ exec: async (s) => db.exec(s), all: async (s) => db.prepare(s).all() });
async function migruj(db, migracje, { pragmaWTransakcji = false } = {}) {
  const [w] = await db.all('PRAGMA user_version');
  const start = w.user_version;
  const cel = Math.max(0, ...migracje.map((m) => m.wersja));
  if (start > cel) throw new Error(`Baza w wersji ${start} jest nowsza niż aplikacja (${cel}).`);
  for (const m of [...migracje].filter((x) => x.wersja > start).sort((a, b) => a.wersja - b.wersja)) {
    if (m.przebudowa && !pragmaWTransakcji) await db.exec('PRAGMA foreign_keys = OFF');
    try {
      await db.exec('BEGIN IMMEDIATE');
      try {
        if (m.przebudowa && pragmaWTransakcji) await db.exec('PRAGMA foreign_keys = OFF'); // błąd z kalibracji: no-op
        await db.exec(m.sql);
        const zle = await db.all('PRAGMA foreign_key_check');
        if (zle.length) throw new Error(`Migracja ${m.wersja}: ${zle.length} naruszeń`);
        await db.exec(`PRAGMA user_version = ${Number(m.wersja)}`);
        await db.exec('COMMIT');
      } catch (e) { await db.exec('ROLLBACK'); throw e; }
    } finally {
      if (m.przebudowa) await db.exec('PRAGMA foreign_keys = ON');
    }
  }
  return Math.max(start, cel);
}
const M1 = { wersja: 1, sql: SCHEMAT };
// Przebudowa: nowe CHECK (stan 'zawieszona') i kolumna NOT NULL z wartością domyślną; tabela nadrzędna z dziećmi.
const M2 = { wersja: 2, przebudowa: true, sql: `
CREATE TABLE new_karta (id TEXT PRIMARY KEY NOT NULL, stan TEXT NOT NULL CHECK (stan IN ('nowa','nauka','powtorka','zawieszona')), zmieniono_ms INTEGER NOT NULL, termin_ms INTEGER NOT NULL DEFAULT 0);
INSERT INTO new_karta (id, stan, zmieniono_ms) SELECT id, stan, zmieniono_ms FROM karta;
DROP TABLE karta;
ALTER TABLE new_karta RENAME TO karta;` };
const zasiewV1 = (db) => db.exec("INSERT INTO karta VALUES ('k1','nauka',1),('k2','nowa',1); INSERT INTO log_powtorki (karta_id, ocena) VALUES ('k1',3),('k1',4),('k2',1);");
const policz = (db) => ({ karta: ile(db, 'karta'), log: ile(db, 'log_powtorki'), wersja: db.prepare('PRAGMA user_version').get().user_version, integrity: db.prepare('PRAGMA integrity_check').get().integrity_check, fk: db.prepare('PRAGMA foreign_key_check').all().length });
{
  // wzorzec bazy v1 jako plik, test na kopii
  const wzorzec = join(tmp, 'v1.db');
  const w = otworz(wzorzec); await migruj(adapter(w), [M1]); zasiewV1(w); w.close();
  const kopia = join(tmp, 'v1-kopia.db'); copyFileSync(wzorzec, kopia);
  const db = otworz(kopia);
  sprawdz('E4a migracja v1→v2 (OFF przed BEGIN)', (await migruj(adapter(db), [M1, M2]), policz(db)), { karta: 2, log: 3, wersja: 2, integrity: 'ok', fk: 0 });
  sprawdz('E4b drugie uruchomienie bez zmian', (await migruj(adapter(db), [M1, M2]), policz(db)), { karta: 2, log: 3, wersja: 2, integrity: 'ok', fk: 0 });
  sprawdz('E4c foreign_keys po migracji', db.prepare('PRAGMA foreign_keys').get().foreign_keys, 1);
  db.close();
  // błąd z kalibracji: pragma w transakcji, DROP TABLE kaskaduje
  const kopia2 = join(tmp, 'v1-kopia2.db'); copyFileSync(wzorzec, kopia2);
  const zla = otworz(kopia2);
  await migruj(adapter(zla), [M1, M2], { pragmaWTransakcji: true });
  sprawdz('E4d pragma OFF w transakcji: logi po migracji (utrata)', policz(zla).log, 0);
  zla.close();
  // przypadek negatywny: dane łamiące nowe CHECK wycofują całą migrację
  const kopia3 = join(tmp, 'v1-kopia3.db'); copyFileSync(wzorzec, kopia3);
  const neg = otworz(kopia3);
  const M2zle = { ...M2, sql: M2.sql.replace("'nowa','nauka','powtorka','zawieszona'", "'nauka','powtorka'") };
  let blad = null; try { await migruj(adapter(neg), [M1, M2zle]); } catch (e) { blad = e.message.slice(0, 40); }
  sprawdz('E4e CHECK złamany: migracja wycofana, dane i wersja bez zmian', { blad: Boolean(blad), ...policz(neg) }, { blad: true, karta: 2, log: 3, wersja: 1, integrity: 'ok', fk: 0 });
  neg.close();
  // baza nowsza niż aplikacja
  const kopia4 = join(tmp, 'v1-kopia4.db'); copyFileSync(wzorzec, kopia4);
  const nowsza = otworz(kopia4); nowsza.exec('PRAGMA user_version = 9');
  let b2 = null; try { await migruj(adapter(nowsza), [M1, M2]); } catch (e) { b2 = e.message; }
  sprawdz('E4f baza nowsza niż aplikacja: błąd, dane bez zmian', { blad: b2, karta: ile(nowsza, 'karta'), log: ile(nowsza, 'log_powtorki') }, { blad: 'Baza w wersji 9 jest nowsza niż aplikacja (2).', karta: 2, log: 3 });
  nowsza.close();
}

// E5: kopia przy WAL — sam plik .db kontra VACUUM INTO
{
  const sciezka = join(tmp, 'wal.db');
  const db = otworz(sciezka);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA wal_autocheckpoint = 0;'); // bez automatycznego checkpointu (pokazuje stan między checkpointami)
  db.exec(SCHEMAT);
  db.exec('PRAGMA wal_checkpoint(TRUNCATE)');
  for (let i = 0; i < 5; i++) db.prepare("INSERT INTO karta VALUES (?, 'nowa', ?)").run(`w${i}`, i);
  copyFileSync(sciezka, join(tmp, 'kopia-pliku.db'));
  db.prepare('VACUUM INTO ?').run(join(tmp, 'kopia-vacuum.db'));
  const odczyt = (p) => { const k = new DatabaseSync(p, { readOnly: true }); try { return ile(k, 'karta'); } catch (e) { return 'brak tabeli'; } finally { k.close(); } };
  sprawdz('E5a kopia samego pliku .db przy WAL: wiersze z 5 ostatnich', odczyt(join(tmp, 'kopia-pliku.db')), 0);
  sprawdz('E5b VACUUM INTO: wiersze', odczyt(join(tmp, 'kopia-vacuum.db')), 5);
  sprawdz('E5c plik -wal istnieje obok bazy', existsSync(sciezka + '-wal') && statSync(sciezka + '-wal').size > 0, true);
  db.close();
}

console.log(`SQLite ${new DatabaseSync(':memory:').prepare('SELECT sqlite_version() v').get().v}, Node ${process.version}`);
console.log(bledy ? `${bledy} wyników różnych od oczekiwanych` : 'wszystkie wyniki zgodne z oczekiwanymi');
process.exit(bledy ? 1 : 0);
