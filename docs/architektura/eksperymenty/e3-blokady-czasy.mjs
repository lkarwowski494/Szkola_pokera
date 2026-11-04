// Dowód E3 roli 05 (Szkoła Pokera, 2026-11-04): kiedy połączenie SQLite trzyma blokadę pliku (tryb DELETE, ADR 0003)
// i ile trwają operacje, które ją trzymają, na danych w skali 3 lat. Czasy z laptopa w chmurze: punkt odniesienia
// do klasyfikacji operacji (krótka / długa), NIE budżet (zasada 9 roli). Budżety dopiero po pomiarze na iPhonie (OP-21).
// Uruchom: node --no-warnings e3-blokady-czasy.mjs <ścieżka-schemat.sql> <katalog-tymczasowy>   (kod 1 przy różnicy)
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, rmSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';

const [schematPlik = '../schemat.sql', tmp = './tmp-e3'] = process.argv.slice(2);
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
let bledy = 0;
const sprawdz = (nazwa, wynik, oczekiwane) => {
  const ok = JSON.stringify(wynik) === JSON.stringify(oczekiwane);
  if (!ok) bledy++;
  console.log(`${ok ? 'ZGODNE' : 'RÓŻNE '} ${nazwa}: ${JSON.stringify(wynik)}${ok ? '' : ` (oczekiwane ${JSON.stringify(oczekiwane)})`}`);
};
const info = (s) => console.log(`INFO  ${s}`);
const otworz = (p) => { const d = new DatabaseSync(p, { enableForeignKeyConstraints: false }); d.exec('PRAGMA foreign_keys = ON'); return d; };
// Czy INNE połączenie może dostać blokadę wyłączną? false = ktoś trzyma blokadę pliku.
const wolny = (p) => { const d = new DatabaseSync(p); try { d.exec('BEGIN EXCLUSIVE'); d.exec('ROLLBACK'); return true; } catch { return false; } finally { d.close(); } };
const czas = (fn, n = 5) => { const t = []; for (let i = 0; i < n; i++) { const t0 = performance.now(); fn(i); t.push(performance.now() - t0); } t.sort((a, b) => a - b); return t; };
const ms = (x) => `${x.toFixed(1)} ms`;

const plik = join(tmp, 'postep.db');
const db = otworz(plik);
db.exec('BEGIN'); db.exec(readFileSync(schematPlik, 'utf8')); db.exec('PRAGMA user_version = 1'); db.exec('COMMIT');
sprawdz('0 journal_mode (ADR 0003)', db.prepare('PRAGMA journal_mode').get().journal_mode, 'delete');

// --- 1. Dane w skali 3 lat (jak e2-schemat.mjs, sekcja 5) ---
const T = 1_793_000_000_000, RODZINY = 530, ODPOWIEDZI = 34_000, NA = 15;
const akt = db.prepare("INSERT INTO aktywnosc (id, rodzaj, stan, z_limitu, dzien_lokalny, strefa, plan, krok, start_ms, koniec_ms) VALUES (?,?,'zakonczona',1,?,'America/New_York','{\"zadania\":[]}',?,?,?)");
const odp = db.prepare('INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES (?,?,?,?,?,?,?,?,?) RETURNING id');
const karta = db.prepare('INSERT INTO karta VALUES (?,?,?,?,?,?,?,?,?,?,?)');
const log = db.prepare('INSERT INTO log_powtorki (rodzina_id, odpowiedz_id, ocena_fsrs, stan_przed, termin_przed_ms, powtorzono_ms) VALUES (?,?,?,?,?,?)');
const dzien = (i) => new Date(Date.UTC(2026, 0, 1) + Math.floor(i / 45) * 86_400_000).toISOString().slice(0, 10);
db.exec('BEGIN');
for (let r = 0; r < RODZINY; r++) karta.run(`r${r}`, T + (r % 60) * 86_400_000, 3, 5, 3, 0, 4, 1, 2, T, T);
for (let a = 0; a < ODPOWIEDZI / NA; a++) {
  akt.run(`s${a}`, ['sesja', 'powtorki', 'scenariusz'][a % 3], dzien(a * NA), NA, T, T + 1);
  for (let k = 0; k < NA; k++) {
    const r = (a * NA + k) % RODZINY;
    const id = odp.get(`s${a}`, k, `z${r}`, `r${r}`, '{"akcja":"raise","rozmiar":2.5}', 'zgodne', 1, 4000, T + a * 1000 + k).id;
    log.run(`r${r}`, id, 3, 2, T, T + a * 1000 + k);
  }
}
db.exec('COMMIT');
info(`dane: 34 005 odpowiedzi i logów, ${ODPOWIEDZI / NA | 0} aktywności, ${RODZINY} kart; plik ${(statSync(plik).size / 1048576).toFixed(2)} MB`);

// --- 2. Kiedy blokada jest trzymana (tryb DELETE) ---
sprawdz('2a bez otwartej transakcji i kursora: plik wolny', wolny(plik), true);
db.exec('BEGIN IMMEDIATE'); db.prepare("UPDATE karta SET termin_ms = termin_ms WHERE rodzina_id = 'r1'").run();
sprawdz('2b otwarta transakcja zapisu: plik zablokowany', wolny(plik), false);
db.exec('COMMIT');
sprawdz('2c po COMMIT: plik wolny', wolny(plik), true);
db.exec('BEGIN'); db.prepare('SELECT count(*) n FROM odpowiedz').get();
sprawdz('2d otwarta transakcja odczytu: plik zablokowany (blokada współdzielona)', wolny(plik), false);
db.exec('COMMIT');
const it = db.prepare('SELECT * FROM odpowiedz').iterate(); it.next();
sprawdz('2e niedokończony kursor (odczyt po wierszu) poza transakcją: plik zablokowany', wolny(plik), false);
it.return();
sprawdz('2f po zamknięciu kursora: plik wolny', wolny(plik), true);

// --- 3. Czasy operacji trzymających blokadę (laptop, punkt odniesienia) ---
const krok = db.prepare("INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES ('s5',?,'z1','r1','{}','zgodne',1,1,1) ON CONFLICT (aktywnosc_id, krok) DO UPDATE SET wybor = excluded.wybor, ocena = excluded.ocena, odpowiedziano_ms = excluded.odpowiedziano_ms");
const tKrok = czas((i) => { db.exec('BEGIN IMMEDIATE'); krok.run(100 + (i % 50)); db.prepare("UPDATE aktywnosc SET krok = krok WHERE id = 's5'").run(); db.exec('COMMIT'); }, 200);
info(`krok aktywności (UPSERT odpowiedzi + UPDATE kroku, jedna transakcja): p50 ${ms(tKrok[99])}, p95 ${ms(tKrok[189])}, maks ${ms(tKrok[199])} (200 powtórzeń)`);
const tKopia = czas((i) => db.prepare('VACUUM INTO ?').run(join(tmp, `kopia${i}.db`)));
info(`kopia VACUUM INTO: mediana ${ms(tKopia[2])}, maks ${ms(tKopia[4])}`);
const TABELE = ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki'];
let plikEksportu = '';
const tOdczyt = czas(() => { db.exec('BEGIN'); const d = {}; for (const t of TABELE) d[t] = db.prepare(`SELECT * FROM ${t}`).all(); db.exec('COMMIT'); plikEksportu = JSON.stringify({ format: 'szkola-pokera-postep', wersja_formatu: 1, dane: d }); });
info(`eksport (odczyt 7 tabel w jednej transakcji + JSON): mediana ${ms(tOdczyt[2])}, maks ${ms(tOdczyt[4])}; plik ${(Buffer.byteLength(plikEksportu) / 1048576).toFixed(2)} MB`);
const cel = join(tmp, 'cel.db');
const bc = otworz(cel); bc.exec('BEGIN'); bc.exec(readFileSync(schematPlik, 'utf8')); bc.exec('COMMIT');
const tImport = czas(() => {
  const k = JSON.parse(plikEksportu);
  bc.exec('BEGIN IMMEDIATE');
  for (const t of [...TABELE].reverse()) bc.exec(`DELETE FROM ${t}`);
  for (const t of TABELE) for (const w of k.dane[t]) { const kol = Object.keys(w); bc.prepare(`INSERT INTO ${t} (${kol.join(',')}) VALUES (${kol.map(() => '?').join(',')})`).run(...kol.map((c) => w[c])); }
  if (bc.prepare('PRAGMA foreign_key_check').all().length) throw new Error('klucze');
  bc.exec('COMMIT');
});
info(`import (parsowanie + jedna transakcja: usunięcie i wstawienie 70 tys. wierszy): mediana ${ms(tImport[2])}, maks ${ms(tImport[4])}`);
sprawdz('3a po imporcie te same liczności', TABELE.map((t) => bc.prepare(`SELECT count(*) n FROM ${t}`).get().n), TABELE.map((t) => db.prepare(`SELECT count(*) n FROM ${t}`).get().n));
const tUsun = czas((i) => { const b = otworz(join(tmp, `kopia${i}.db`)); b.exec('BEGIN IMMEDIATE'); for (const t of ['odpowiedz', 'log_powtorki', 'aktywnosc', 'karta', 'postep_lekcji', 'ustawienie', 'dziennik']) b.exec(`DELETE FROM ${t}`); b.exec('COMMIT'); b.close(); });
info(`„Usuń postęp” (jedna transakcja): mediana ${ms(tUsun[2])}, maks ${ms(tUsun[4])}`);
sprawdz('3b plik wolny po wszystkich operacjach', wolny(plik), true);
sprawdz('3c integrity_check po pomiarach', db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');

console.log(`SQLite ${db.prepare('SELECT sqlite_version() v').get().v}, Node ${process.version}`);
console.log(bledy ? `${bledy} wyników różnych od oczekiwanych` : 'wszystkie wyniki zgodne z oczekiwanymi');
process.exit(bledy ? 1 : 0);
