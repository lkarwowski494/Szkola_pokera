// Narzędzia testowe pakietu treści (K-06, ADR 0005): port `PlikiTresci` na node:fs z zapisem wywołań i wstrzykiwaniem
// przerwanej kopii, otwarcie bazy treści na node:sqlite (tylko do odczytu) i mała baza treści z tabelą `meta`.
import { copyFileSync, existsSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import type { PlikiTresci } from '../../packages/domena/src';

export type WywolanieTresci = { op: 'lista' | 'kopiuj' | 'przemianuj' | 'usun' | 'otworz'; z: string; na?: string };

// `przerwij(w)`: dla wywołania `kopiuj` zwraca błąd; przed rzuceniem zapisuje pod `na` pierwszą połowę bajtów (jak przerwana
// kopia albo brak miejsca w połowie). `blad(w)`: błąd bez skutków ubocznych dla innych operacji.
export function plikiTresciNode(o: { przerwij?: (w: WywolanieTresci) => Error | null; blad?: (w: WywolanieTresci) => Error | null } = {}) {
  const wywolania: WywolanieTresci[] = [];
  const zapisz = (w: WywolanieTresci) => { wywolania.push(w); const e = o.blad?.(w); if (e) throw e; };
  const pliki: PlikiTresci = {
    lista: async (k) => { zapisz({ op: 'lista', z: k }); return existsSync(k) ? readdirSync(k) : []; },
    kopiuj: async (z, na) => {
      const w = { op: 'kopiuj' as const, z, na };
      zapisz(w);
      const e = o.przerwij?.(w);
      if (e) { const b = readFileSync(z); writeFileSync(na, b.subarray(0, Math.floor(b.length / 2))); throw e; }
      copyFileSync(z, na);
    },
    przemianuj: async (z, na) => {
      zapisz({ op: 'przemianuj', z, na });
      if (existsSync(na)) throw new Error(`cel istnieje: ${na}`); // jak moveAsync bez nadpisywania
      renameSync(z, na);
    },
    usun: async (s) => { zapisz({ op: 'usun', z: s }); rmSync(s, { force: true }); },
  };
  // Otwarcie jak w aplikacji (baza tylko do odczytu); meta = null, gdy brak tabeli. Otwarte bazy do zamknięcia w afterEach.
  const otwarte: DatabaseSync[] = [];
  const otworz = async (sciezka: string) => {
    wywolania.push({ op: 'otworz', z: sciezka });
    const baza = new DatabaseSync(sciezka, { readOnly: true });
    otwarte.push(baza);
    const jest = baza.prepare("SELECT 1 FROM sqlite_schema WHERE type = 'table' AND name = 'meta'").get();
    const meta = jest ? Object.fromEntries((baza.prepare('SELECT key, value FROM meta').all() as { key: string; value: string }[]).map((r) => [r.key, r.value])) : null;
    return { baza, meta };
  };
  const zamknij = () => { for (const b of otwarte.splice(0)) if (b.isOpen) b.close(); };
  return { pliki, otworz, wywolania, zamknij };
}

// Mała baza treści: `meta` (klucz, wartość) i kilka lekcji z zadaniami, żeby plik miał więcej niż jedną stronę.
export function zbudujTresc(sciezka: string, meta: Record<string, string> | null, lekcje = 40) {
  const db = new DatabaseSync(sciezka);
  db.exec('PRAGMA journal_mode = DELETE; CREATE TABLE lessons (id TEXT PRIMARY KEY, body TEXT NOT NULL); CREATE TABLE drills (id TEXT PRIMARY KEY, family TEXT NOT NULL)');
  if (meta) {
    db.exec('CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)');
    for (const [k, v] of Object.entries(meta)) db.prepare('INSERT INTO meta VALUES (?, ?)').run(k, v);
  }
  for (let i = 0; i < lekcje; i++) {
    db.prepare('INSERT INTO lessons VALUES (?, ?)').run(`m1-l${i}`, `Lekcja ${i} — ${'ąęłńóśźż '.repeat(40)}`);
    db.prepare('INSERT INTO drills VALUES (?, ?)').run(`m1-l${i}-d1`, `f-${i % 7}`);
  }
  db.exec('VACUUM');
  db.close();
}
