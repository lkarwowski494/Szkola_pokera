// Wzorzec bazy postępu v1 z danymi brzegowymi (strategia.md §4; K-02). Buduje bazę bezpośrednio z docs/architektura/schemat.sql
// (node:sqlite, bez testowanego kodu), PRAGMA user_version = 1. Do pierwszego wydania budowany w teście; przy wydaniu
// zmieniającym schemat zamrożony jako tests/dane/bazy/vN.db (D-124). Dane syntetyczne, bez danych osobowych.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

export const SCIEZKA_SCHEMATU = fileURLToPath(new URL('../../docs/architektura/schemat.sql', import.meta.url));
export const schematV1 = () => readFileSync(SCIEZKA_SCHEMATU, 'utf8');
// Migracja v2 (D-532): osobny plik, bo schemat.sql = wydana migracja v1 (wydanej migracji się nie zmienia, dane.md „Polityka migracji”).
export const SCIEZKA_SCHEMATU_V2 = fileURLToPath(new URL('../../docs/architektura/schemat-v2.sql', import.meta.url));
export const schematV2 = () => readFileSync(SCIEZKA_SCHEMATU_V2, 'utf8');
export const T0 = 1_793_000_000_000; // stały czas wzorca (ms UTC)
export const DZIEN_WZORCA = '2026-10-26';
const D = 86_400_000;

export function zbudujWzorzecV1(sciezka: string): Record<string, number> {
  const db = new DatabaseSync(sciezka, { enableForeignKeyConstraints: true });
  db.exec(schematV1());
  db.exec('PRAGMA user_version = 1');
  const s = (sql: string, ...p: (string | number | null)[]) => db.prepare(sql).run(...p);
  db.exec('BEGIN');
  // ustawienia: język, przypomnienie, punkt startu, ostatni eksport, licznik opinii; znaki spoza ASCII w wartości
  s("INSERT INTO ustawienie VALUES ('jezyk', '\"ja\"', ?)", T0);
  s("INSERT INTO ustawienie VALUES ('przypomnienie', '{\"wlaczone\":true,\"godzina\":7,\"minuta\":5}', ?)", T0);
  s("INSERT INTO ustawienie VALUES ('punkt_startu', '{\"modul\":\"m03\",\"opis\":\"Zażółć gęślą jaźń — ポーカー\"}', ?)", T0);
  s("INSERT INTO ustawienie VALUES ('ostatni_eksport', ?, ?)", JSON.stringify(T0 - 30 * D), T0);
  s("INSERT INTO ustawienie VALUES ('opinie', '{\"prosby\":0}', ?)", T0);
  // postęp lekcji: ukończona, w trakcie (miejsce), bez teorii
  s("INSERT INTO postep_lekcji VALUES ('m01-l1', 1, '{}', ?, ?)", T0 - 20 * D, T0 - 20 * D);
  s("INSERT INTO postep_lekcji VALUES ('m01-l2', 1, '{\"sekcja\":4,\"zadanie\":\"m01-l2-z3\"}', NULL, ?)", T0 - D);
  s("INSERT INTO postep_lekcji VALUES ('m02-l1', 0, '{}', NULL, ?)", T0);
  // aktywności: każdy rodzaj; w toku (powrót); porzucona; zużycie limitu dnia wzorca w strefie z przesunięciem niecałkowitym
  const akt = (id: string, rodzaj: string, stan: string, zLimitu: number, dzien: string, strefa: string, plan: string, krok: number, start: number, koniec: number | null) =>
    s('INSERT INTO aktywnosc VALUES (?,?,?,?,?,?,?,?,?,?)', id, rodzaj, stan, zLimitu, dzien, strefa, plan, krok, start, koniec);
  akt('a-ocena', 'ocena_poziomu', 'zakonczona', 0, '2026-10-01', 'America/New_York', '{"zadania":["z1","z2"]}', 2, T0 - 25 * D, T0 - 25 * D + 60_000);
  akt('a-lekcja', 'lekcja', 'zakonczona', 0, '2026-10-06', 'America/New_York', '{"lekcja":"m01-l1"}', 3, T0 - 20 * D, T0 - 20 * D + 1);
  akt('a-test', 'test_modulu', 'zakonczona', 0, '2026-10-07', 'America/New_York', '{"modul":"m01"}', 15, T0 - 19 * D, T0 - 19 * D + 1);
  akt('a-test2', 'test_modulu', 'zakonczona', 1, '2026-10-08', 'America/New_York', '{"modul":"m01"}', 15, T0 - 18 * D, T0 - 18 * D + 1);
  akt('a-sesja', 'sesja', 'zakonczona', 1, DZIEN_WZORCA, 'Asia/Kathmandu', '{"zadania":["z1","z2","z3"]}', 3, T0, T0 + 1);
  akt('a-powt', 'powtorki', 'porzucona', 1, DZIEN_WZORCA, 'Asia/Kathmandu', '{"zadania":["z4"]}', 0, T0 + 2, T0 + 3);
  akt('a-scen', 'scenariusz', 'w_toku', 1, DZIEN_WZORCA, 'Asia/Kathmandu', '{"scenariusz":"s01"}', 1, T0 + 4, null);
  // odpowiedzi: każda ocena; wybór z liczbą ułamkową i polem nie-ASCII
  const odp = (akt_: string, krok: number, zad: string, rodz: string, wybor: string, ocena: string, zal: number) =>
    Number(s('INSERT INTO odpowiedz (aktywnosc_id, krok, zadanie_id, rodzina_id, wybor, ocena, zaliczona, czas_ms, odpowiedziano_ms) VALUES (?,?,?,?,?,?,?,?,?)',
      akt_, krok, zad, rodz, wybor, ocena, zal, 4_321, T0 + krok).lastInsertRowid);
  const o1 = odp('a-sesja', 0, 'z1', 'r1', '{"akcja":"raise","rozmiar":2.5}', 'zgodne', 1);
  odp('a-sesja', 1, 'z2', 'r2', '{"akcja":"call"}', 'dopuszczalne', 1);
  const o3 = odp('a-sesja', 2, 'z3', 'r3', '{"akcja":"fold","notatka":"ß"}', 'niedokladnosc', 0);
  odp('a-scen', 0, 's01-d1', 'r9', '{"akcja":"check"}', 'blad', 0);
  odp('a-test', 0, 'm01-t1', 'r1', '{"odpowiedz":"B"}', 'zgodne', 1);
  // wyniki testu: zaliczony i niezaliczony (powtórny z limitu)
  s("INSERT INTO wynik_testu VALUES ('a-test', 'm01', 13, 15, 1)");
  s("INSERT INTO wynik_testu VALUES ('a-test2', 'm01', 9, 15, 0)");
  // karty: zaległa, przyszła, nowa (stan 0, bez ostatniej powtórki), w ponownej nauce
  const karta = (r: string, termin: number, stan: number, ost: number | null) =>
    s('INSERT INTO karta VALUES (?,?,?,?,?,?,?,?,?,?,?)', r, termin, 3.17, 5.5, 2, 0, 4, 1, stan, ost, T0);
  karta('r1', T0 - 3 * D, 2, T0 - 10 * D);
  karta('r2', T0 + 5 * D, 2, T0 - D);
  karta('r3', T0, 0, null);
  karta('r9', T0 - D, 3, T0 - 2 * D);
  const log = (r: string, odpId: number | null, ocena: number, stanPrzed: number) =>
    s('INSERT INTO log_powtorki (rodzina_id, odpowiedz_id, ocena_fsrs, stan_przed, termin_przed_ms, powtorzono_ms) VALUES (?,?,?,?,?,?)', r, odpId, ocena, stanPrzed, T0 - D, T0);
  log('r1', o1, 3, 2); log('r1', null, 1, 2); log('r3', o3, 2, 0); log('r9', null, 4, 3);
  // poza eksportem: pamięć uprawnień (dożywotni i roczny), dziennik
  s("INSERT INTO uprawnienie_cache VALUES ('pl.lkarwowski.szkolapokera.dozywotni', NULL, ?)", T0);
  s("INSERT INTO uprawnienie_cache VALUES ('pl.lkarwowski.szkolapokera.rok', ?, ?)", T0 + 300 * D, T0);
  s("INSERT INTO dziennik (ms, kod, ekran, wersja) VALUES (?, 'zapis_nieudany', 'sesja', '1.0.0')", T0);
  db.exec('COMMIT');
  const tabele = (db.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").all() as { name: string }[]).map((r) => r.name);
  const licznosci = Object.fromEntries(tabele.map((t) => [t, (db.prepare(`SELECT count(*) AS n FROM ${t}`).get() as { n: number }).n]));
  db.close();
  return licznosci;
}
