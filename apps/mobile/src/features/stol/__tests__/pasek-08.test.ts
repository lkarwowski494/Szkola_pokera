/// <reference types="jest" />
// 08 część 6 krok 4 (D-274): pasek strategii (design-spec „`PasekStrategii`”, D-116; makieta e3 przed-decyzja i po-ocenie).
import '@/i18n';
import i18n from 'i18next';
import { opisPaska, segmentyPaska } from '@/features/stol/pasek';

const t = i18n.t.bind(i18n);
const J9O = [
  { text: 'Pas', czestosc: 0.8 },
  { text: 'Przebicie', czestosc: 0.2 },
];

describe('segmentyPaska', () => {
  it('przed decyzją: równe segmenty, nic nie zdradzają (bez procentów i bez znacznika)', () => {
    expect(segmentyPaska(J9O, null)).toEqual([
      { indeks: 0, tekst: 'Pas', szerokosc: 0.5, procent: null, twoj: false },
      { indeks: 1, tekst: 'Przebicie', szerokosc: 0.5, procent: null, twoj: false },
    ]);
  });

  it('po ocenie: granice przesunięte do częstości solvera, znacznik nad twoim wyborem', () => {
    expect(segmentyPaska(J9O, 1)).toEqual([
      { indeks: 0, tekst: 'Pas', szerokosc: 0.8, procent: '80', twoj: false },
      { indeks: 1, tekst: 'Przebicie', szerokosc: 0.2, procent: '20', twoj: true },
    ]);
  });

  it('akcja spoza strategii (zły rozmiar, 0%) ma segment zerowej szerokości, ale podpis i znacznik; rzadka akcja nie dostaje „0”', () => {
    const s = segmentyPaska([{ text: 'Pas', czestosc: 0.996 }, { text: 'Przebicie', czestosc: 0.004 }, { text: 'Przebicie za duże', czestosc: 0 }], 2);
    expect(s.map((x) => [x.szerokosc, x.procent, x.twoj])).toEqual([
      [0.996, '100', false],
      [0.004, '<1', false],
      [0, '0', true],
    ]);
  });

  it('zadanie bez strategii solvera (pytanie z teorii): po odpowiedzi nadal równe segmenty bez procentów; czas minął (-1): bez znacznika', () => {
    const s = segmentyPaska([{ text: '4' }, { text: '8' }, { text: '2' }], 0);
    expect(s.map((x) => [x.szerokosc, x.procent, x.twoj])).toEqual([
      [1 / 3, null, true],
      [1 / 3, null, false],
      [1 / 3, null, false],
    ]);
    expect(segmentyPaska(J9O, -1).some((x) => x.twoj)).toBe(false);
  });
});

describe('opisPaska (VoiceOver)', () => {
  it('jak w makiecie: „Strategia solvera dla J9o: pas 80 procent, przebicie 20 procent. Twój wybór: przebicie.”', () => {
    expect(opisPaska(J9O, 1, 'J9o', t)).toBe('Strategia solvera dla J9o: Pas 80 procent, Przebicie 20 procent. Twój wybór: Przebicie.');
  });
  it('bez strategii: null (pasek to wtedy zwykłe odpowiedzi)', () => {
    expect(opisPaska([{ text: '4' }, { text: '8' }], 0, '', t)).toBeNull();
  });
});
