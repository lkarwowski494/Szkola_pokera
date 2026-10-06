import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { describe, expect, it } from 'vitest';
import { formatPolishDate, HelplinesFile, resolvePhoneRefs, telUri } from '@szkola/content-schema';
import { compileContent } from '../src/build';
import { displayHost, expandHelplines, helplinesMarkdown, helplinesModuleSource, loadHelplines } from '../src/helplines';

const root = resolve(import.meta.dirname, '../../..');
const file = HelplinesFile.parse(parseYaml(readFileSync(join(root, 'content/helplines.yaml'), 'utf8')));
const h = loadHelplines(file);

describe('telefony pomocy (helplines.yaml)', () => {
  it('ma wpisy z przeczytanym źródłem (adres https i cytat) i tylko numery polskie z decyzji 5.10', () => {
    for (const e of h.entries) {
      expect(e.sources.length).toBeGreaterThan(0);
      for (const s of e.sources) expect(s.url).toMatch(/^https:\/\//);
    }
    expect(h.entries.map((e) => e.phone).filter(Boolean)).toEqual(['801 889 880', '116 123', '112']);
    expect(h.abroadText).toBe('Za granicą: lokalny numer pomocy lub 112.');
    expect(h.checkedText).toBe('Dane sprawdzone: 5 października 2026');
  });

  it('pomocnicze: tel:, data po polsku, domena, {{phone:id}}', () => {
    expect(telUri('801 889 880')).toBe('tel:801889880');
    expect(formatPolishDate('2026-01-31')).toBe('31 stycznia 2026');
    expect(() => formatPolishDate('2026-13-01')).toThrow();
    expect(displayHost('https://www.gov.pl/web/x')).toBe('gov.pl');
    expect(() => resolvePhoneRefs('{{phone:brak}}', h.entries)).toThrow(/brak wpisu/);
  });

  it('schemat odrzuca wpis bez źródła i adres inny niż https', () => {
    const bad = structuredClone(file);
    bad.entries[0]!.sources = [];
    expect(HelplinesFile.safeParse(bad).success).toBe(false);
    const http = structuredClone(file);
    http.entries[0]!.sources[0]!.url = 'http://kcpu.gov.pl/';
    expect(HelplinesFile.safeParse(http).success).toBe(false);
  });

  it('znacznik {{helplines}} rozwija się w listę; numer wpisany ręcznie albo znacznik w środku zdania przerywa budowanie', () => {
    const used = { count: 0 };
    const out = expandHelplines('Pomoc:\n\n{{helplines}}\n', h, 'test', used);
    expect(used.count).toBe(1);
    expect(out).toContain('- **Telefon Zaufania uzależnienia behawioralne: 801 889 880**, codziennie 17.00–22.00, opłata według taryfy operatora.');
    expect(out).toContain('Czat: 116sos.pl.');
    expect(out).toContain('Dane sprawdzone: 5 października 2026.');
    expect(() => expandHelplines('Zadzwoń: 801 889 880', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Zadzwoń: 801889880', h, 'test', used)).toThrow(/wpisany ręcznie/);
    expect(() => expandHelplines('Patrz {{helplines}} niżej', h, 'test', used)).toThrow(/sam w linii/);
  });

  it('lekcja M12-L4 i moduł ekranu „Pomoc” mają te same numery, godziny i koszty (jedno źródło)', () => {
    const content = compileContent(join(root, 'content'), 'pl');
    const lesson = JSON.stringify(content.lessons.find((l) => l.id === 'm12.l4')!.body);
    const md = helplinesMarkdown(h);
    const src = helplinesModuleSource(content.helplines);
    for (const e of h.entries) {
      for (const v of [e.phone, e.hours, e.cost].filter((x): x is string => !!x)) {
        expect(lesson).toContain(v);
        expect(md).toContain(v);
        expect(src).toContain(JSON.stringify(v));
      }
    }
    // w module aplikacji nie ma ani jednej nazwy spoza helplines.yaml (bez nazw pokoi, ADR-13)
    expect(src).not.toMatch(/stars|ggpoker|partypoker|888|winamax/i);
    // pełna kompilacja treści (z pulą egzaminacyjną) przekracza domyślne 5 s na wolniejszej maszynie
  }, 30_000);
});
