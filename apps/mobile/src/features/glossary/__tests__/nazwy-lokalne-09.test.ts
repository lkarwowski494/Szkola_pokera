import { glossarySections, nazwaLokalna, type GlossaryEntry } from '../glossary';

// D-369: w ja, zh-Hant, pt-BR, fr słowniczek pokazuje nazwę lokalną (ta sama co w tekście lekcji, terms-nazwy.yaml) i angielską
// pod spodem; wyszukiwanie po obu. Nazwa lokalna równa angielskiej (pot, call) — jedna linia. en i pl bez zmian.
const E = (key: string, en: string, area = 'actions'): GlossaryEntry => ({ key, pl: key, en, enAlt: [], area } as unknown as GlossaryEntry);
const NAZWY = { fr: { straight: 'quinte', pot: 'pot' }, ja: { call: 'コール' } };
const WPISY = [E('straight', 'straight', 'hands'), E('pot', 'pot', 'table'), E('call', 'call')];

describe('słowniczek: nazwa lokalna (D-369)', () => {
  it('nazwa lokalna tylko gdy różna od angielskiej; en i pl bez nazwy lokalnej', () => {
    expect(nazwaLokalna(WPISY[0]!, 'fr', NAZWY)).toBe('quinte');
    expect(nazwaLokalna(WPISY[1]!, 'fr', NAZWY)).toBeUndefined();
    expect(nazwaLokalna(WPISY[2]!, 'ja', NAZWY)).toBe('コール');
    expect(nazwaLokalna(WPISY[0]!, 'en', NAZWY)).toBeUndefined();
    expect(nazwaLokalna(WPISY[0]!, 'pl', NAZWY)).toBeUndefined();
  });
  it('wyszukiwanie po nazwie lokalnej i angielskiej', () => {
    const klucze = (q: string, j: string) => glossarySections(q, WPISY, j, NAZWY).flatMap((s) => s.entries.map((e) => e.key));
    expect(klucze('quinte', 'fr')).toEqual(['straight']);
    expect(klucze('straight', 'fr')).toEqual(['straight']);
    expect(klucze('コール', 'ja')).toEqual(['call']);
    expect(klucze('quinte', 'en')).toEqual([]);
  });
});
