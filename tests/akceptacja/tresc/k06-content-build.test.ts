// K-06, część na wyjściu `content-build` (ADR 0005 pkt 1, 3, 5, „Potwierdzenie”; NFR-JEZ-001, NFR-JEZ-002): pliki w paczce
// aplikacji (`apps/mobile/assets/content`, aktualność pilnuje `pnpm content:check`). Wyrocznie: lista języków z
// `@szkola/jezyki` (jedno źródło, D-131), format z konfiguracji, nazwa pliku z ADR 0005 pkt 2.
// Część „te same identyfikatory, liczby i struktura” sprawdza się przy co najmniej dwóch plikach (35 z tych samych YAML, ADR 0005 pkt 1).
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { KONFIGURACJA as K } from '../../../packages/domena/src';
import { JEZYKI } from '../../../packages/jezyki/src';

const KATALOG = join(dirname(fileURLToPath(import.meta.url)), '../../../apps/mobile/assets/content');
const WZOR = /^tresc-([^-/]+)-(.+)\.db$/; // wersja bez „-” i „/” (kontrakt nazw w packages/domena/src/tresc.ts)
// Szkielet JSON: napisy (tekst w języku) zastąpione znacznikiem; liczby, wartości logiczne i długości tablic zostają.
const szkielet = (x: unknown): unknown =>
  typeof x === 'string' ? 's' : Array.isArray(x) ? x.map(szkielet) : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, szkielet(v)])) : x;
const plikiTresci = () => (existsSync(KATALOG) ? readdirSync(KATALOG).filter((n) => n.endsWith('.db')).sort() : []);

function czytaj(n: string) {
  const db = new DatabaseSync(join(KATALOG, n), { readOnly: true });
  try {
    const meta = Object.fromEntries((db.prepare('SELECT key, value FROM meta').all() as { key: string; value: string }[]).map((r) => [r.key, r.value]));
    const kolumna = (t: string, k: string) => (db.prepare(`SELECT ${k} AS k FROM ${t} ORDER BY ${k}`).all() as { k: string }[]).map((r) => r.k);
    return {
      meta,
      // identyfikatory niezależne od języka (ADR 0005 pkt 3): lekcja, zadanie, rodzina, moduł, zadanie testu, reguła, zakres, termin
      ids: {
        modules: kolumna('modules', 'id'), lessons: kolumna('lessons', 'id'), drills: kolumna('drills', 'id'),
        rodziny: [...new Set(kolumna('drills', 'family'))], exam_drills: kolumna('exam_drills', 'id'),
        rules: kolumna('rules', 'id'), ranges: kolumna('ranges', 'id'), terms: kolumna('terms', 'key'),
      },
      liczby: db.prepare('SELECT key, value FROM numbers ORDER BY key').all().map((r) => ({ ...r })),
      // kolumny niezależne od języka (ADR 0005 pkt 1: liczby i zakresy z jednego źródła) i szkielet danych zadań
      struktura: {
        modules: db.prepare('SELECT id, ord, phase, recommended FROM modules ORDER BY id').all().map((r) => ({ ...r })),
        lessons: db.prepare('SELECT id, module_id, ord FROM lessons ORDER BY id').all().map((r) => ({ ...r })),
        rules: db.prepare('SELECT id, module_id, level FROM rules ORDER BY id').all().map((r) => ({ ...r })),
        drills: (db.prepare('SELECT id, lesson_id, ord, family, kind, data FROM drills ORDER BY id').all() as { data: string }[]).map((r) => ({ ...r, data: szkielet(JSON.parse(r.data)) })),
        exam_drills: (db.prepare('SELECT id, module_id, ord, family, kind, data FROM exam_drills ORDER BY id').all() as { data: string }[]).map((r) => ({ ...r, data: szkielet(JSON.parse(r.data)) })),
        ranges: (db.prepare('SELECT id, hero, path, play_percent, uncertain, solver, groups, actions FROM ranges ORDER BY id').all() as { groups: string; actions: string }[])
          .map((r) => ({ ...r, groups: (JSON.parse(r.groups) as { freqs: unknown }[]).map((g) => g.freqs), actions: (JSON.parse(r.actions) as { freqs: unknown }[]).map((a) => a.freqs) })),
      },
    };
  } finally { db.close(); }
}

describe('AK-K-06: wyjście content-build (baza na język)', () => {
  it('AK-K-06-r w paczce są tylko pliki `tresc-<wersja>-<język>.db`, po jednym na każdy z 35 języków, jedna wersja', () => {
    const pliki = plikiTresci();
    expect(pliki.filter((n) => !WZOR.test(n))).toEqual([]); // np. stara nazwa content-v6.db
    const pary = pliki.map((n) => n.match(WZOR)!).map((m) => ({ wersja: m[1], jezyk: m[2] }));
    expect(pary.map((p) => p.jezyk).sort()).toEqual([...JEZYKI].sort());
    expect(new Set(pary.map((p) => p.wersja)).size).toBe(1);
  });

  it('AK-K-06-s każdy plik ma manifest zgodny z nazwą: format, wersja, język, min_wersja_aplikacji', () => {
    const pliki = plikiTresci().filter((n) => WZOR.test(n));
    expect(pliki.length).toBeGreaterThan(0);
    for (const n of pliki) {
      const [, wersja, jezyk] = n.match(WZOR)!;
      const { meta } = czytaj(n);
      expect({ plik: n, format: meta.format, wersja: meta.wersja, jezyk: meta.jezyk }).toEqual({ plik: n, format: String(K.TRESC_FORMAT), wersja, jezyk });
      expect(meta.min_wersja_aplikacji, n).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });

  it('AK-K-06-t te same identyfikatory, liczby i struktura (zakresy, szkielet zadań) we wszystkich językach (NFR-JEZ-002)', () => {
    const pliki = plikiTresci().filter((n) => WZOR.test(n));
    expect(pliki.length).toBeGreaterThan(1);
    const [wzor, ...reszta] = pliki.map((n) => ({ n, ...czytaj(n) }));
    if (!wzor) return;
    expect(wzor.ids.lessons.length).toBeGreaterThan(0);
    for (const p of reszta) {
      expect({ plik: p.n, ids: p.ids }).toEqual({ plik: p.n, ids: wzor.ids });
      expect({ plik: p.n, liczby: p.liczby }).toEqual({ plik: p.n, liczby: wzor.liczby });
      expect({ plik: p.n, struktura: p.struktura }).toEqual({ plik: p.n, struktura: wzor.struktura });
    }
  });
});
