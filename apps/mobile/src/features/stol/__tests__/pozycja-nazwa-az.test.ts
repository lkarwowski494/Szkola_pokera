/// <reference types="jest" />
// KO-028 (sesja AZ): linia „Twoja pozycja: …” pokazuje nazwę pozycji z glosariusza i skrót, nie sam skrót. Dotyczy tekstu
// widocznego i etykiety czytnika (opisKart, A04-11). Nazwy z content/terms.yaml (pl) i content/<język>/terms-nazwy.yaml.
import '@/i18n';
import i18n from 'i18next';
import { TERM_NAMES, TERMS } from '@/data/content/terms.generated';
import { KOLEJNOSC, nazwaPozycji, opisKart } from '@/features/stol/uklad';
import { SLOWNIKI } from '@/i18n/slowniki';
import type { Position } from '@/features/drills/types';

/** Kod pozycji z `Position` (features/drills/types.ts:4) → klucz terminu w content/terms.yaml. */
const KLUCZ: Record<Position, keyof typeof TERMS & string> = { UTG: 'utg', HJ: 'hijack', CO: 'cutoff', BTN: 'button', SB: 'small-blind', BB: 'big-blind' };
const JEZYKI = Object.keys(SLOWNIKI);
// Brak nazwy w języku (plik terms-nazwy bez klucza albo null = „skrót”): zachowanie zastępcze = skrót z terms.yaml (rola 06 uzupełnia).
const BRAKI = ['fr:UTG', 'pt:UTG', 'pt-BR:UTG', 'ja:UTG', 'zh-Hant:UTG'];

function oczekiwanaNazwa(jezyk: string, p: Position): string {
  const info = TERMS[KLUCZ[p]];
  if (jezyk === 'pl') return info.pl;
  const wlasna = TERM_NAMES[jezyk]?.[KLUCZ[p]];
  if (wlasna) return wlasna;
  return /^[A-Z][A-Z0-9+]{1,5}$/.test(info.pl) ? info.pl : info.en; // jak renderTermsBare: brak nazwy → skrót albo nazwa angielska
}

describe('KO-028: nazwa pozycji przy stole', () => {
  it('każdy kod pozycji ze stołu ma klucz terminu w glosariuszu', () => {
    for (const p of KOLEJNOSC) expect(TERMS[KLUCZ[p]]).toBeDefined();
  });

  it('pl: „Twoja pozycja (position): mały blind (small blind, SB).” zamiast samego skrótu', () => {
    const t = i18n.getFixedT('pl');
    expect(opisKart({ position: 'SB' }, t)).toBe('Twoja pozycja (position): mały blind (small blind, SB).');
    expect(opisKart({ position: 'UTG' }, t)).toBe('Twoja pozycja (position): UTG (under the gun).');
  });

  for (const jezyk of JEZYKI) {
    for (const p of KOLEJNOSC) {
      it(`${jezyk} ${p}: tekst i etykieta czytnika mają nazwę z glosariusza i skrót${BRAKI.includes(`${jezyk}:${p}`) ? ' (brak nazwy w języku → sam skrót)' : ''}`, () => {
        const t = i18n.getFixedT(jezyk);
        const nazwa = oczekiwanaNazwa(jezyk, p);
        for (const linia of [opisKart({ position: p }, t), opisKart({ position: p }, t, { nazwy: true })]) {
          expect(linia).toContain(nazwa);
          expect(linia).toContain(p);
        }
      });
    }
  }

  it('klucze pozycji nie mają tekstu na sztywno: wartość to sam znacznik terminu', () => {
    for (const [jezyk, s] of Object.entries(SLOWNIKI)) {
      const poz = (s as { table: { position?: Record<string, string> } }).table.position;
      expect(Object.keys(poz ?? {}).sort()).toEqual(KOLEJNOSC.map((p) => p.toLowerCase()).sort());
      for (const p of KOLEJNOSC) expect(`${jezyk}:${poz?.[p.toLowerCase()]}`).toBe(`${jezyk}:{{t:${KLUCZ[p]}}}`);
    }
  });

  // AZ-01/AZ-05: dokładny tekst dla nazwy = skrót, nazwy bez skrótu i zachowania zastępczego (brak/null nazwy w języku)
  it('nazwa równa skrótowi nie dubluje skrótu: „UTG”, nie „UTG (UTG)”; „HJ” (ja), nie „HJ (HJ)”', () => {
    expect(nazwaPozycji('UTG', i18n.getFixedT('de'))).toBe('UTG');
    expect(nazwaPozycji('UTG', i18n.getFixedT('en'))).toBe('UTG');
    expect(nazwaPozycji('HJ', i18n.getFixedT('ja'))).toBe('HJ');
    expect(nazwaPozycji('CO', i18n.getFixedT('zh-Hant'))).toBe('CO');
  });

  it('brak nazwy w języku (fr, pt, pt-BR: brak klucza; ja, zh-Hant: null) → sam skrót UTG, bez nawiasu', () => {
    for (const j of ['fr', 'pt', 'pt-BR', 'ja', 'zh-Hant']) {
      expect([j, nazwaPozycji('UTG', i18n.getFixedT(j))]).toEqual([j, 'UTG']);
      expect([j, opisKart({ position: 'UTG' }, i18n.getFixedT(j), { nazwy: true }).includes('(UTG)')]).toEqual([j, false]);
    }
  });

  it('nazwa z pełnym brzmieniem dostaje skrót w nawiasie: dokładny tekst', () => {
    expect(nazwaPozycji('SB', i18n.getFixedT('pl'))).toBe('mały blind (small blind, SB)');
    expect(nazwaPozycji('BB', i18n.getFixedT('es'))).toBe('ciega grande (BB)');
    expect(nazwaPozycji('HJ', i18n.getFixedT('pl'))).toBe('Hijack (HJ)');
  });

  it('skrót liczy się tylko jako osobne słowo: litery skrótu wewnątrz słowa nie blokują dopisku', () => {
    const t = (k: string) => (k === 'table.position.bb' ? 'ABBA' : k === 'table.position.co' ? 'Marco (CO)' : k);
    expect(nazwaPozycji('BB', t)).toBe('ABBA (BB)');
    expect(nazwaPozycji('CO', t)).toBe('Marco (CO)');
  });
});
