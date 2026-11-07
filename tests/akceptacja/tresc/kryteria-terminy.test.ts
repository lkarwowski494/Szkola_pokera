// Testy akceptacyjne terminów w lekcjach (BR-KURS-003; rola 07 E3 część 13, D-197). Wyrocznia: kryterium BRD i zasada
// CLAUDE.md „jedno pojęcie, jedna nazwa, definicja przed pierwszym użyciem”; kolejność lekcji z content/pl/modules.yaml
// (order modułu) i nagłówka lekcji (order) — dane treści, nie wynik kodu.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

const TRESC = fileURLToPath(new URL('../../../content/', import.meta.url));
const TERMINY = parse(readFileSync(join(TRESC, 'terms.yaml'), 'utf8')) as Record<string, Record<string, unknown>>;
const MODULY = parse(readFileSync(join(TRESC, 'pl/modules.yaml'), 'utf8')) as { id: string; order: number }[];
const KAT = join(TRESC, 'pl/lessons');
const LEKCJE = readdirSync(KAT)
  .filter((f) => f.endsWith('.md'))
  .map((f) => {
    const t = readFileSync(join(KAT, f), 'utf8');
    const naglowek = parse(t.split(/^---$/m)[1] ?? '') as { id: string; module: string; order: number };
    return { ...naglowek, plik: f, tekst: t };
  })
  .sort((a, b) => MODULY.find((m) => m.id === a.module)!.order - MODULY.find((m) => m.id === b.module)!.order || a.order - b.order);
const uzyteTerminy = (t: string) => [...t.matchAll(/\{\{t:([a-z0-9-]+)(?:\|[^}]*)?\}\}/g)].map((m) => m[1] as string);

describe('AK-BR-KURS-003: termin w lekcji i kolejność definicji', () => {
  it('AK-BR-KURS-003-a każdy termin dotknięty w lekcji pochodzi z tej samej tabeli co słownik (content/terms.yaml) i ma definicję', () => {
    const braki = LEKCJE.flatMap((l) => uzyteTerminy(l.tekst).filter((k) => !TERMINY[k] || typeof TERMINY[k]!.def !== 'string').map((k) => `${l.plik}: ${k}`));
    expect([...new Set(braki)]).toEqual([]);
  });

  it('AK-BR-KURS-003-b żaden termin nie pojawia się przed lekcją, która go definiuje (pole lekcji definiującej w terms.yaml)', () => {
    // Pole z lekcją definiującą (propozycja nazwy: `lesson: m2.l1`) — brak w terms.yaml: zgłoszenie dla 06 i 05 (§9 część 13).
    const bezLekcji = Object.keys(TERMINY).filter((k) => typeof TERMINY[k]!.lesson !== 'string');
    expect(bezLekcji, `terminy bez lekcji definiującej (${bezLekcji.length} z ${Object.keys(TERMINY).length})`).toEqual([]);
    const pozycja = new Map(LEKCJE.map((l, i) => [l.id, i]));
    const za_wczesnie: string[] = [];
    LEKCJE.forEach((l, i) => {
      for (const k of new Set(uzyteTerminy(l.tekst))) {
        const def = pozycja.get(String(TERMINY[k]!.lesson));
        if (def === undefined || def > i) za_wczesnie.push(`${k}: użyty w ${l.id}, zdefiniowany w ${String(TERMINY[k]!.lesson)}`);
      }
    });
    expect(za_wczesnie).toEqual([]);
  });
});
