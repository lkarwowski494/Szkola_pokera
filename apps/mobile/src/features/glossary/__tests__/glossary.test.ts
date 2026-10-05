/// <reference types="jest" />
import { TermArea } from '@szkola/content-schema';
import { TERMS } from '@/data/content/terms.generated';
import { pl } from '@/i18n/pl';
import { AREA_ORDER, englishLabel, fold, GLOSSARY_SIZE, glossarySections } from '../glossary';

const keysOf = (q: string) => glossarySections(q).flatMap((s) => s.entries.map((e) => e.key));

describe('słowniczek PL ↔ EN', () => {
  it('bez zapytania pokazuje każdy termin z terms.yaml dokładnie raz', () => {
    const keys = keysOf('');
    expect(keys).toHaveLength(Object.keys(TERMS).length);
    expect(new Set(keys)).toEqual(new Set(Object.keys(TERMS)));
    expect(GLOSSARY_SIZE).toBe(keys.length);
  });

  it('obszary w kolejności kursu, każdy ma etykietę, w obszarze alfabetycznie po polsku', () => {
    expect([...AREA_ORDER].sort()).toEqual([...TermArea.options].sort());
    for (const a of AREA_ORDER) expect(pl.glossary.areas[a]).toBeTruthy();
    const sections = glossarySections('');
    expect(sections.map((s) => s.area)).toEqual(AREA_ORDER.filter((a) => sections.some((s) => s.area === a)));
    for (const s of sections) {
      expect(s.entries.every((e) => e.area === s.area)).toBe(true);
      const names = s.entries.map((e) => e.pl);
      expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'pl-PL')));
    }
  });

  it('szuka po polsku, po angielsku, po innych nazwach angielskich i po skrócie', () => {
    expect(keysOf('kolor')).toContain('flush');
    expect(keysOf('downswing')).toContain('downswing');
    expect(keysOf('quads')).toContain('four-of-a-kind');
    expect(keysOf('jam')).toContain('shove');
    expect(keysOf('UTG')).toContain('utg');
    expect(keysOf('RoR')).toContain('risk-of-ruin');
  });

  it('wielkość liter, spacje i polskie znaki nie mają znaczenia; odmieniona forma też trafia', () => {
    expect(fold('  ZJEŹDZIE ')).toBe('zjezdzie');
    expect(fold('Łańcuch')).toBe('lancuch');
    expect(keysOf('ODCHYLENIE')).toContain('standard-deviation');
    expect(keysOf('bańka')).toEqual(keysOf('banka'));
    expect(keysOf('zjeździe')).toContain('downswing');
  });

  it('zapytanie bez wyników daje pustą listę obszarów', () => {
    expect(glossarySections('xyzxyz')).toEqual([]);
  });

  it('nazwa angielska ze skrótem w nawiasie tylko wtedy, gdy skrót różni się od nazwy', () => {
    expect(englishLabel(TERMS['risk-of-ruin'])).toBe('risk of ruin (RoR)');
    expect(englishLabel(TERMS.flush)).toBe('flush');
  });
});
