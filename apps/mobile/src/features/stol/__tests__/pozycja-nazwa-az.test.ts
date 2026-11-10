/// <reference types="jest" />
// KO-028 (sesja AZ): linia „Twoja pozycja: …” pokazuje nazwę pozycji z glosariusza i skrót, nie sam skrót. Dotyczy tekstu
// widocznego i etykiety czytnika (opisKart, A04-11). Nazwy z content/terms.yaml (pl) i content/<język>/terms-nazwy.yaml.
import '@/i18n';
import i18n from 'i18next';
import { TERM_NAMES, TERMS } from '@/data/content/terms.generated';
import { KOLEJNOSC, opisKart } from '@/features/stol/uklad';
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
});
