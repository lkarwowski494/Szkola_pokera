// Dowód E2 roli 05 (Szkoła Pokera, 2026-11-04): schemat v1 uruchomiony, niezmienniki, kaskady, UPSERT, CHECK,
// plany zapytań na danych 3-letnich, eksport → import bez różnic, odrzucenie złych plików, usunięcie postępu.
// Uruchom: node --no-warnings e2-schemat.mjs <ścieżka-schemat.sql> <katalog-tymczasowy>   (kod 1 przy różnicy)
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, rmSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';

const [schematPlik = '../schemat.sql', tmp = './tmp-e2'] = process.argv.slice(2);
const SCHEMAT = readFileSync(schematPlik, 'utf8');
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
let bledy = 0;
const sprawdz = (nazwa, wynik, oczekiwane) => {
  const ok = JSON.stringify(wynik) === JSON.stringify(oczekiwane);
  if (!ok) bledy++;
  console.log(`${ok ? 'OK   ' : 'BŁĄD '} ${nazwa}: wynik=${JSON.stringify(wynik)}${ok ? '' : ` oczekiwane=${JSON.stringify(oczekiwane)}`}`);
};
const info = (s) => console.log(`INFO  ${s}`);
const otworz = (p = ':memory:') => { const db = new DatabaseSync(p, { enableForeignKeyConstraints: false }); db.exec('PRAGMA foreign_keys = ON'); return db; };
const ile = (db, t) => db.prepare(`SELECT count(*) AS n FROM ${t}`).get().n;
const odrzucone = (db, sql, p = []) => { try { db.prepare(sql).run(...p); return false; } catch { return true; } };

// Runner migracji (ten sam co w e1-sqlite.mjs i module dane-lokalne-sqlite), wersja synchroniczna.
function migruj(db, migracje) {
  const start = db.prepare('PRAGMA user_version').get().user_version;
  const cel = Math.max(0, ...migracje.map((m) => m.wersja));
  if (start > cel) throw new Error(`Baza w wersji ${start} jest nowsza niż aplikacja (${cel}).`);
  for (const m of migracje.filter((x) => x.wersja > start).sort((a, b) => a.wersja - b.wersja)) {
    if (m.przebudowa) db.exec('PRAGMA foreign_keys = OFF');
    try {
      db.exec('BEGIN IMMEDIATE');
      try {
        db.exec(m.sql);
        const zle = db.prepare('PRAGMA foreign_key_check').all();
        if (zle.length) throw new Error(`Migracja ${m.wersja}: ${zle.length} naruszeń`);
        db.exec(`PRAGMA user_version = ${Number(m.wersja)}`);
        db.exec('COMMIT');
      } catch (e) { db.exec('ROLLBACK'); throw e; }
    } finally { if (m.przebudowa) db.exec('PRAGMA foreign_keys = ON'); }
  }
}
const MIGRACJE = [{ wersja: 1, sql: SCHEMAT }];

// --- 1. Uruchomienie na pliku, niezmienniki ---
const plik = join(tmp, 'postep.db');
const db = otworz(plik);
migruj(db, MIGRACJE);
sprawdz('1a user_version po migracji', db.prepare('PRAGMA user_version').get().user_version, 1);
sprawdz('1b integrity_check', db.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
sprawdz('1c foreign_key_check', db.prepare('PRAGMA foreign_key_check').all().length, 0);
sprawdz('1d journal_mode (ADR 0003: domyślny, bez WAL)', db.prepare('PRAGMA journal_mode').get().journal_mode, 'delete');
sprawdz('1e tabele', db.prepare("SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name").all().map((r) => r.name),
  ['aktywnosc', 'dziennik', 'karta', 'log_powtorki', 'odpowiedz', 'postep_lekcji', 'uprawnienie_cache', 'ustawienie', 'wynik_testu']);
migruj(db, MIGRACJE);
sprawdz('1f drugie uruchomienie runnera bez zmian', db.prepare('PRAGMA user_version').get().user_version, 1);

// --- 2. Stany domeny ⊆ CHECK (wzór testu dla roli 07; listy domeny tu jako stałe) ---
const DOMENA = {
  'aktywnosc.rodzaj': ['ocena_poziomu', 'lekcja', 'test_modulu', 'sesja', 'powtorki', 'scenariusz'],
  'aktywnosc.stan': ['w_toku', 'zakonczona', 'porzucona'],
  'odpowiedz.ocena': ['zgodne', 'dopuszczalne', 'niedokladnosc', 'blad'],
};
const listaZCheck = (kolumna) => {
  const m = SCHEMAT.match(new RegExp(`\\b${kolumna.split('.')[1]} TEXT NOT NULL CHECK \\(${kolumna.split('.')[1]} IN \\(([^)]*)\\)\\)`));
  return m ? m[1].split(',').map((s) => s.trim().replace(/'/g, '')) : null;
};
for (const [k, lista] of Object.entries(DOMENA)) sprawdz(`2 stany domeny = CHECK ${k}`, listaZCheck(k), lista);

// --- 3. CHECK odrzuca złe dane ---
const T = 1_793_000_000_000; // stały czas testu (ms UTC)
const akt = (id, o = {}) => db.prepare('INSERT INTO aktywnosc (id, rodzaj, stan, z_limitu, dzien_lokalny, strefa, plan, krok, start_ms, koniec_ms) VALUES (?,?,?,?,?,?,?,?,?,?)')
  .run(id, o.rodzaj ?? 'sesja', o.stan ?? 'w_toku', o.z_limitu ?? 1, o.dzien ?? '2026-11-04', 'America/New_York', o.plan ?? '{"zadania":["z1","z2"]}', o.krok ?? 0, T, o.koniec ?? null);
sprawdz('3a ocena spoza listy', odrzucone(db, "INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES ('x',0,'z','r','{}','blunder',0,1,1)"), true);
sprawdz('3b stan w_toku z koniec_ms', odrzucone(db, "INSERT INTO aktywnosc VALUES ('x','sesja','w_toku',1,'2026-11-04','UTC','{}',0,1,2)"), true);
sprawdz('3c zakończona bez koniec_ms', odrzucone(db, "INSERT INTO aktywnosc VALUES ('x','sesja','zakonczona',1,'2026-11-04','UTC','{}',0,1,NULL)"), true);
sprawdz('3d plan nie-JSON', odrzucone(db, "INSERT INTO aktywnosc VALUES ('x','sesja','w_toku',1,'2026-11-04','UTC','{zle',0,1,NULL)"), true);
sprawdz('3e dzień w złym formacie', odrzucone(db, "INSERT INTO aktywnosc VALUES ('x','sesja','w_toku',1,'4.11.2026','UTC','{}',0,1,NULL)"), true);
sprawdz('3f odpowiedź do nieistniejącej aktywności', odrzucone(db, "INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES ('brak',0,'z','r','{}','blad',0,1,1)"), true);
sprawdz('3g poprawne > wszystkie w wyniku testu', (akt('t0', { rodzaj: 'test_modulu', z_limitu: 0 }), odrzucone(db, "INSERT INTO wynik_testu VALUES ('t0','m1',16,15,1)")), true);

// --- 4. UPSERT zachowuje wiersze podrzędne; kaskady ---
const odp = db.prepare(`INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms)
  VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT (aktywnosc_id, krok) DO UPDATE SET wybor = excluded.wybor, ocena = excluded.ocena,
  zaliczona = excluded.zaliczona, czas_ms = excluded.czas_ms, odpowiedziano_ms = excluded.odpowiedziano_ms RETURNING id`);
const karta = db.prepare(`INSERT INTO karta (rodzina_id, termin_ms, stabilnosc, trudnosc, dni_zaplanowane, kroki_nauki, powtorzenia, zapomnienia, stan, ostatnia_powtorka_ms, zmieniono_ms)
  VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT (rodzina_id) DO UPDATE SET termin_ms = excluded.termin_ms, stabilnosc = excluded.stabilnosc,
  trudnosc = excluded.trudnosc, dni_zaplanowane = excluded.dni_zaplanowane, kroki_nauki = excluded.kroki_nauki, powtorzenia = excluded.powtorzenia,
  zapomnienia = excluded.zapomnienia, stan = excluded.stan, ostatnia_powtorka_ms = excluded.ostatnia_powtorka_ms, zmieniono_ms = excluded.zmieniono_ms`);
const log = db.prepare('INSERT INTO log_powtorki (rodzina_id, odpowiedz_id, ocena_fsrs, stan_przed, termin_przed_ms, powtorzono_ms) VALUES (?,?,?,?,?,?)');
akt('a1');
const id1 = odp.get('a1', 0, 'z1', 'r1', '{"akcja":"call"}', 'blad', 0, 900, T).id;
karta.run('r1', T, 1, 5, 0, 0, 0, 0, 0, null, T);
log.run('r1', id1, 1, 0, T, T); log.run('r1', null, 3, 1, T, T + 1);
const id1b = odp.get('a1', 0, 'z1', 'r1', '{"akcja":"fold"}', 'zgodne', 1, 700, T + 5).id; // ponowny zapis kroku 0 po przerwaniu
sprawdz('4a UPSERT odpowiedzi kroku: ten sam id, jeden wiersz', { ten_sam_id: id1 === id1b, wiersze: ile(db, 'odpowiedz') }, { ten_sam_id: true, wiersze: 1 });
karta.run('r1', T + 86_400_000, 2.5, 5, 1, 0, 1, 0, 2, T, T + 10);
sprawdz('4b UPSERT karty: logi zostają', ile(db, 'log_powtorki'), 2);
sprawdz('4c INSERT OR REPLACE na karcie kasowałby logi (kontrola wzoru)', (() => {
  db.exec('SAVEPOINT s'); db.prepare("INSERT OR REPLACE INTO karta (rodzina_id, termin_ms, stabilnosc, trudnosc, dni_zaplanowane, kroki_nauki, powtorzenia, zapomnienia, stan, zmieniono_ms) VALUES ('r1',1,1,1,1,1,1,1,1,1)").run();
  const n = ile(db, 'log_powtorki'); db.exec('ROLLBACK TO s; RELEASE s'); return n; })(), 0);
db.prepare("DELETE FROM odpowiedz WHERE id = ?").run(id1);
sprawdz('4d usunięcie odpowiedzi: log zostaje z odpowiedz_id NULL', db.prepare("SELECT count(*) n FROM log_powtorki WHERE odpowiedz_id IS NULL").get().n, 2);
odp.get('a1', 1, 'z2', 'r1', '{}', 'zgodne', 1, 500, T);
db.prepare("INSERT INTO wynik_testu VALUES ('t0','m1',13,15,1)").run();
db.exec("DELETE FROM aktywnosc WHERE id IN ('a1','t0')");
sprawdz('4e kaskada aktywność → odpowiedzi i wynik testu', { odpowiedz: ile(db, 'odpowiedz'), wynik_testu: ile(db, 'wynik_testu') }, { odpowiedz: 0, wynik_testu: 0 });
db.exec("DELETE FROM karta WHERE rodzina_id = 'r1'");
sprawdz('4f kaskada karta → log', ile(db, 'log_powtorki'), 0);
sprawdz('4g foreign_key_check po operacjach', db.prepare('PRAGMA foreign_key_check').all().length, 0);

// --- 5. Dane w skali 3 lat (Pro, E0 sekcja 4) i plany zapytań głównych ekranów ---
const RODZINY = 530, ODPOWIEDZI = 34_000, NA_AKTYWNOSC = 15;
db.exec('BEGIN');
for (let r = 0; r < RODZINY; r++) karta.run(`r${r}`, T + (r % 60) * 86_400_000, 3, 5, 3, 0, 4, 1, 2, T, T);
const dzien = (i) => new Date(Date.UTC(2026, 0, 1) + Math.floor(i / 45) * 86_400_000).toISOString().slice(0, 10);
for (let a = 0; a < ODPOWIEDZI / NA_AKTYWNOSC; a++) {
  akt(`s${a}`, { stan: 'zakonczona', koniec: T + 1, dzien: dzien(a * NA_AKTYWNOSC), rodzaj: ['sesja', 'powtorki', 'scenariusz'][a % 3] });
  for (let k = 0; k < NA_AKTYWNOSC; k++) {
    const r = (a * NA_AKTYWNOSC + k) % RODZINY;
    const id = odp.get(`s${a}`, k, `z${r}`, `r${r}`, '{"akcja":"raise","rozmiar":2.5}', 'zgodne', 1, 4000, T + a * 1000 + k).id;
    log.run(`r${r}`, id, 3, 2, T, T + a * 1000 + k);
  }
}
for (let l = 0; l < 44; l++) db.prepare('INSERT INTO postep_lekcji VALUES (?,1,?,?,?)').run(`l${l}`, '{"sekcja":3}', T, T);
db.exec('COMMIT');
db.exec('PRAGMA optimize');
info(`dane: ${ile(db, 'odpowiedz')} odpowiedzi, ${ile(db, 'log_powtorki')} logów, ${ile(db, 'aktywnosc')} aktywności, ${ile(db, 'karta')} kart`);
const ZAPYTANIA = {
  'karty do powtórki (Dziś)': ['SELECT * FROM karta WHERE termin_ms <= ? ORDER BY termin_ms LIMIT 50', [T + 5 * 86_400_000]],
  'zużycie limitu dnia': ['SELECT count(*) n FROM aktywnosc WHERE dzien_lokalny = ? AND z_limitu = 1', ['2026-06-01']],
  'aktywność w toku (powrót)': ["SELECT * FROM aktywnosc WHERE stan = 'w_toku'", []],
  'odpowiedzi aktywności': ['SELECT * FROM odpowiedz WHERE aktywnosc_id = ? ORDER BY krok', ['s100']],
  'historia rodziny': ['SELECT ocena, odpowiedziano_ms FROM odpowiedz WHERE rodzina_id = ? ORDER BY odpowiedziano_ms DESC LIMIT 20', ['r7']],
  'wyniki testu modułu': ['SELECT * FROM wynik_testu WHERE modul_id = ?', ['m3']],
};
for (const [nazwa, [sql, p]] of Object.entries(ZAPYTANIA)) {
  const plan = db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...p).map((r) => r.detail).join(' | ');
  sprawdz(`5 plan bez SCAN: ${nazwa}`, /\bSCAN\b/.test(plan) && !/USING (COVERING )?INDEX/.test(plan) ? `SCAN: ${plan}` : 'indeks', 'indeks');
  const czasy = []; for (let i = 0; i < 20; i++) { const t0 = performance.now(); db.prepare(sql).all(...p); czasy.push(performance.now() - t0); }
  czasy.sort((a, b) => a - b);
  info(`  ${nazwa}: ${plan}; p95 z 20 = ${czasy[18].toFixed(3)} ms (laptop w chmurze, NIE budżet)`);
}
db.close();
const rozmiar = statSync(plik).size;
info(`rozmiar postep.db w skali 3 lat: ${(rozmiar / 1048576).toFixed(2)} MB`);
sprawdz('5z rozmiar < 15 MB (szacunek E0)', rozmiar < 15 * 1048576, true);

// --- 6. Eksport → import (ADR 0008): koperta, walidacja, transakcja, 0 różnic ---
const TABELE_EKSPORTU = ['ustawienie', 'postep_lekcji', 'aktywnosc', 'odpowiedz', 'wynik_testu', 'karta', 'log_powtorki'];
const KLUCZ = { ustawienie: 'klucz', postep_lekcji: 'lekcja_id', aktywnosc: 'id', odpowiedz: 'id', wynik_testu: 'aktywnosc_id', karta: 'rodzina_id', log_powtorki: 'id' };
const OBSLUGIWANA_WERSJA = 1;
function eksport(baza) {
  const dane = {};
  for (const t of TABELE_EKSPORTU) dane[t] = baza.prepare(`SELECT * FROM ${t} ORDER BY ${KLUCZ[t]}`).all().map((w) => ({ ...w }));
  return JSON.stringify({ format: 'szkola-pokera-postep', wersja_formatu: OBSLUGIWANA_WERSJA, utworzono: new Date(T).toISOString(), aplikacja: '1.0.0', dane });
}
function waliduj(tekst) {
  let k; try { k = JSON.parse(tekst); } catch { return { ok: false, powod: 'bledny_plik' }; }
  if (k?.format !== 'szkola-pokera-postep' || !Number.isInteger(k.wersja_formatu) || typeof k.dane !== 'object') return { ok: false, powod: 'bledny_plik' };
  if (k.wersja_formatu > OBSLUGIWANA_WERSJA) return { ok: false, powod: 'nowsza_wersja' };
  for (const t of TABELE_EKSPORTU) if (!Array.isArray(k.dane[t])) return { ok: false, powod: 'bledny_plik' };
  return { ok: true, koperta: k };
}
function importuj(baza, tekst, { awariaPo = Infinity } = {}) {
  const w = waliduj(tekst); if (!w.ok) return w;
  baza.exec('BEGIN IMMEDIATE');
  try {
    for (const t of [...TABELE_EKSPORTU].reverse()) baza.exec(`DELETE FROM ${t}`); // dzieci przed rodzicami
    let n = 0;
    for (const t of TABELE_EKSPORTU) for (const wiersz of w.koperta.dane[t]) {
      if (++n > awariaPo) throw new Error('awaria wstrzyknięta');
      const kol = Object.keys(wiersz);
      baza.prepare(`INSERT INTO ${t} (${kol.join(',')}) VALUES (${kol.map(() => '?').join(',')})`).run(...kol.map((c) => wiersz[c]));
    }
    if (baza.prepare('PRAGMA foreign_key_check').all().length) throw new Error('naruszenia kluczy');
    baza.exec('COMMIT'); return { ok: true };
  } catch (e) { baza.exec('ROLLBACK'); return { ok: false, powod: 'blad_zapisu', szczegol: e.message }; }
}
const zrodlo = otworz(plik);
zrodlo.prepare("INSERT INTO ustawienie VALUES ('jezyk', '\"en\"', ?), ('przypomnienie', '{\"wlaczone\":true,\"godzina\":19,\"minuta\":30}', ?)").run(T, T);
zrodlo.prepare("INSERT INTO uprawnienie_cache VALUES ('pl.lkarwowski.szkolapokera.rok', ?, ?)").run(T + 1, T);
const plikEksportu = eksport(zrodlo);
info(`plik eksportu: ${(Buffer.byteLength(plikEksportu) / 1048576).toFixed(2)} MB`);
const cel = otworz(join(tmp, 'cel.db')); migruj(cel, MIGRACJE);
sprawdz('6a import na czystej instalacji', importuj(cel, plikEksportu).ok, true);
const roznice = TABELE_EKSPORTU.filter((t) => JSON.stringify(cel.prepare(`SELECT * FROM ${t} ORDER BY ${KLUCZ[t]}`).all()) !== JSON.stringify(zrodlo.prepare(`SELECT * FROM ${t} ORDER BY ${KLUCZ[t]}`).all()));
sprawdz('6b różnice eksport → import (NFR-DANE-002)', roznice, []);
sprawdz('6c pamięć uprawnień poza eksportem', ile(cel, 'uprawnienie_cache'), 0);
const stan = (b) => TABELE_EKSPORTU.map((t) => ile(b, t)).join(',');
const przed = stan(cel);
const zla = JSON.parse(plikEksportu);
sprawdz('6d plik z nowszej wersji odrzucony, dane bez zmian', [importuj(cel, JSON.stringify({ ...zla, wersja_formatu: 2 })).powod, stan(cel) === przed], ['nowsza_wersja', true]);
sprawdz('6e plik obcy odrzucony', [importuj(cel, JSON.stringify({ format: 'inny', wersja_formatu: 1, dane: {} })).powod, stan(cel) === przed], ['bledny_plik', true]);
sprawdz('6f plik ucięty odrzucony', [importuj(cel, plikEksportu.slice(0, 5000)).powod, stan(cel) === przed], ['bledny_plik', true]);
sprawdz('6g awaria w środku importu: ROLLBACK, dane bez zmian', [importuj(cel, plikEksportu, { awariaPo: 20_000 }).powod, stan(cel) === przed], ['blad_zapisu', true]);
sprawdz('6h integrity i klucze po próbach', [cel.prepare('PRAGMA integrity_check').get().integrity_check, cel.prepare('PRAGMA foreign_key_check').all().length], ['ok', 0]);

// --- 7. „Usuń postęp” (BR-DANE-003, ADR 0004, 0006, 0007) ---
const DZIS = '2026-11-04';
function usunPostep(baza, dzisLokalny) {
  baza.exec('BEGIN IMMEDIATE');
  try {
    // dzisiejsze aktywności z limitu zostają jako puste znaczniki (limit się nie odnawia); ich odpowiedzi znikają jawnie
    baza.prepare("DELETE FROM odpowiedz WHERE aktywnosc_id IN (SELECT id FROM aktywnosc WHERE dzien_lokalny = ? AND z_limitu = 1)").run(dzisLokalny);
    baza.prepare("UPDATE aktywnosc SET stan = 'porzucona', plan = '{}', krok = 0, koniec_ms = coalesce(koniec_ms, start_ms) WHERE dzien_lokalny = ? AND z_limitu = 1").run(dzisLokalny);
    baza.prepare("DELETE FROM aktywnosc WHERE NOT (dzien_lokalny = ? AND z_limitu = 1)").run(dzisLokalny);
    for (const t of ['log_powtorki', 'karta', 'postep_lekcji', 'ustawienie', 'dziennik']) baza.exec(`DELETE FROM ${t}`);
    baza.exec('COMMIT');
  } catch (e) { baza.exec('ROLLBACK'); throw e; }
}
cel.prepare("INSERT INTO aktywnosc VALUES ('dzis1','sesja','w_toku',1,?,'UTC','{\"zadania\":[\"z1\"]}',0,?,NULL)").run(DZIS, T);
cel.prepare("INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES ('dzis1',0,'z1','r1','{}','zgodne',1,1,1)").run();
cel.prepare("INSERT INTO uprawnienie_cache VALUES ('pl.lkarwowski.szkolapokera.dozywotni', NULL, ?)").run(T);
const zuzyteDzis = cel.prepare('SELECT count(*) n FROM aktywnosc WHERE dzien_lokalny = ? AND z_limitu = 1').get(DZIS).n; // dane 3-letnie też mają wpisy z tego dnia
info(`aktywności z limitu w dniu ${DZIS} przed usunięciem: ${zuzyteDzis}`);
usunPostep(cel, DZIS);
sprawdz('7a po usunięciu: postęp pusty', { odpowiedz: ile(cel, 'odpowiedz'), karta: ile(cel, 'karta'), log: ile(cel, 'log_powtorki'), lekcje: ile(cel, 'postep_lekcji'), testy: ile(cel, 'wynik_testu'), ustawienia: ile(cel, 'ustawienie') },
  { odpowiedz: 0, karta: 0, log: 0, lekcje: 0, testy: 0, ustawienia: 0 });
sprawdz('7b dzisiejsze zużycie limitu zostaje (tyle samo znaczników)', cel.prepare('SELECT count(*) n FROM aktywnosc WHERE dzien_lokalny = ? AND z_limitu = 1').get(DZIS).n, zuzyteDzis);
sprawdz('7e poza dniem bieżącym aktywności usunięte', cel.prepare('SELECT count(*) n FROM aktywnosc WHERE dzien_lokalny <> ?').get(DZIS).n, 0);
sprawdz('7c pamięć uprawnień zostaje (zakup do przywrócenia)', ile(cel, 'uprawnienie_cache'), 1);
sprawdz('7d integrity i klucze po usunięciu', [cel.prepare('PRAGMA integrity_check').get().integrity_check, cel.prepare('PRAGMA foreign_key_check').all().length], ['ok', 0]);

console.log(`SQLite ${cel.prepare('SELECT sqlite_version() v').get().v}, Node ${process.version}`);
console.log(bledy ? `${bledy} wyników różnych od oczekiwanych` : 'wszystkie wyniki zgodne z oczekiwanymi');
process.exit(bledy ? 1 : 0);
