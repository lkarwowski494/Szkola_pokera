/// <reference types="jest" />
// KO-028 (sesja AZ): linia „Twoja pozycja: …” pokazuje nazwę pozycji z glosariusza i skrót, nie sam skrót. Dotyczy tekstu
// widocznego i etykiety czytnika (opisKart, A04-11). Nazwy z content/terms.yaml (pl) i content/<język>/terms-nazwy.yaml.
import '@/i18n';
import i18n from 'i18next';
import { TERM_NAMES, TERMS } from '@/data/content/terms.generated';
import { tr } from '@/features/drills/terms';
import { KOLEJNOSC, nazwaPozycji, opisKart } from '@/features/stol/uklad';
import { SLOWNIKI } from '@/i18n/slowniki';
import type { Position } from '@/features/drills/types';

/** Kod pozycji z `Position` (features/drills/types.ts:4) → klucz terminu w content/terms.yaml. */
const KLUCZ: Record<Position, keyof typeof TERMS & string> = { UTG: 'utg', HJ: 'hijack', CO: 'cutoff', BTN: 'button', SB: 'small-blind', BB: 'big-blind' };
const JEZYKI = Object.keys(SLOWNIKI);

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
    expect(opisKart({ position: 'UTG' }, t)).toBe('Twoja pozycja (position): pierwsza pozycja po blindach (under the gun, UTG).');
  });

  for (const jezyk of JEZYKI) {
    for (const p of KOLEJNOSC) {
      it(`${jezyk} ${p}: tekst i etykieta czytnika mają nazwę z glosariusza i skrót`, () => {
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

  // AZ-01/AZ-05: zachowanie zastępcze i dopisek skrótu na sztucznych danych (nie zależą od treści `content/`, więc łapią mutacje)
  it('nazwa równa skrótowi nie dubluje skrótu: „UTG”, nie „UTG (UTG)”; „HJ”, nie „HJ (HJ)”', () => {
    expect(nazwaPozycji('UTG', () => 'UTG')).toBe('UTG');
    expect(nazwaPozycji('HJ', () => 'HJ')).toBe('HJ');
    expect(nazwaPozycji('CO', () => 'CO')).toBe('CO');
  });

  it('brak nazwy w języku (plik terms-nazwy bez klucza albo null): renderer podaje nazwę angielską, a nazwaPozycji dopisuje skrót — jeden raz', () => {
    const przypadki: Parameters<typeof tr>[2][] = [{ fr: {} }, { fr: { utg: null as unknown as string } }];
    for (const nazwy of przypadki) { // TERM_NAMES: język → klucz → nazwa
      const t = (k: string) => (k === 'table.position.utg' ? tr('{{t:utg}}', 'fr', nazwy) : k);
      expect(t('table.position.utg')).toBe('under the gun');
      expect(nazwaPozycji('UTG', t)).toBe('under the gun (UTG)');
    }
  });

  // Nazwy z content/ (D-520, KO-028/KO-032): dokładny tekst w językach, w których wcześniej był sam skrót
  it.each([
    ['de', 'UTG', 'Under the Gun (UTG)'],
    ['en', 'UTG', 'under the gun (UTG)'],
    ['fr', 'UTG', 'under the gun (UTG)'],
    ['pt', 'UTG', 'under the gun (UTG)'],
    ['pt-BR', 'UTG', 'under the gun (UTG)'],
    ['ja', 'UTG', 'アンダーザガン (UTG)'],
    ['ja', 'HJ', 'ハイジャック (HJ)'],
    ['zh-Hant', 'UTG', '槍口位 (UTG)'],
    ['zh-Hant', 'CO', '關煞位 (CO)'],
  ] as const)('%s %s → „%s”', (jezyk, p, oczekiwane) => {
    expect(nazwaPozycji(p, i18n.getFixedT(jezyk))).toBe(oczekiwane);
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
