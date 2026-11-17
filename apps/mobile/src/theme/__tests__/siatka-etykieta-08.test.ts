// M2-koordynator-napraw-006 (KO-132, D-2020; wynik roli 04, sekcja 2.3 i 2.5 pkt 1): rozmiar etykiety ręki w siatce z szerokości pola i skali tekstu.
import { wymiaryEtykietySiatki } from '../skalowanie';
import { siatka } from '../tokeny';

const pole = (szerokoscSiatki: number) => szerokoscSiatki / 13;

describe('wymiaryEtykietySiatki: wartości z tabeli specyfikacji (±0,01)', () => {
  // [szerokość siatki, skala, fontSize, lineHeight]
  const tabela: [number, number, number, number][] = [
    [288, 0.8, 8.0, 10.0], [288, 1, 8.0, 10.0], [288, 1.12, 8.25, 10.31], [288, 1.24, 8.25, 10.31], [288, 1.35, 8.25, 10.31], [288, 3.12, 8.25, 10.31],
    [343, 0.8, 8.0, 10.0], [343, 1, 8.0, 10.0], [343, 1.12, 8.96, 11.2], [343, 1.24, 9.92, 12.4], [343, 1.35, 10.17, 12.72], [343, 3.12, 10.17, 12.72],
    [358, 1, 8.0, 10.0], [358, 1.12, 8.96, 11.2], [358, 1.24, 9.92, 12.4], [358, 1.35, 10.4, 13.0], [358, 3.12, 10.4, 13.0],
    [398, 1, 8.0, 10.0], [398, 1.12, 8.96, 11.2], [398, 1.24, 9.92, 12.4], [398, 1.35, 10.4, 13.0], [398, 3.12, 10.4, 13.0],
  ];
  it.each(tabela)('siatka %d pt, skala %f: %f / %f', (szer, skala, fs, lh) => {
    const w = wymiaryEtykietySiatki(pole(szer), skala);
    expect(w.fontSize).toBeCloseTo(fs, 2);
    expect(w.lineHeight).toBeCloseTo(lh, 2);
  });
});

describe('wymiaryEtykietySiatki: niezmienniki dla pola 22,15–31,4 pt i skali 0,8–3,12', () => {
  it('etykieta mieści się w polu z podkładką i kropką; nie maleje poniżej 8 pt', () => {
    const naruszenia: string[] = [];
    for (let p = 22.15; p <= 31.4; p += 0.25) {
      for (let s = 0.8; s <= 3.12; s += 0.04) {
        const { fontSize: r, lineHeight: lh } = wymiaryEtykietySiatki(p, s);
        const eps = 1e-9;
        if (r * siatka.szerokoscEm + 4 > p + eps) naruszenia.push(`szerokość p=${p} s=${s}`);
        if (lh > p / 2 + eps) naruszenia.push(`połowa pola p=${p} s=${s}`);
        if (lh > p - 10 + eps) naruszenia.push(`kropka p=${p} s=${s}`);
        if (r < 8 - eps) naruszenia.push(`poniżej 8 pt p=${p} s=${s}`);
        if (Math.abs(lh - r * 1.25) > 1e-9) naruszenia.push(`interlinia p=${p} s=${s}`);
      }
    }
    expect(naruszenia).toEqual([]);
  });
});
