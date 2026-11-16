/// <reference types="jest" />
// HX (D-1730, D-1731; docs/design/scenariusz-i-ocena.md „Długi tytuł sytuacji”): wybór stylu tytułu startu scenariusza wg długości ważonej.
// Czysta funkcja, bez React Native; wektory z kryteriów 1 dla 08 (granice 54/55, 68/69, 75/76; ja 34/35 znaków; „3ベット” = 1 + 2 × 3).
import { dlugoscWazona, PROG_TYTULU_DLUGIEGO, stylTytuluSytuacji } from '../tytul';

const znaki = (n: number, z = 'a') => z.repeat(n);

describe('HX D-1730: długość ważona tytułu', () => {
  it('łaciński, cyrylica i spacje: 1 na znak', () => {
    expect(dlugoscWazona('Masz parę, a rywal czeka.')).toBe(25);
    expect(dlugoscWazona('Ты на баттоне')).toBe(13);
  });
  it('CJK, hangul, pełna szerokość: 2 na znak', () => {
    expect(dlugoscWazona('リバー')).toBe(6); // katakana U+30A0–U+30FF mieści się w U+2E80–U+9FFF
    expect(dlugoscWazona('河牌')).toBe(4);
    expect(dlugoscWazona('버튼')).toBe(4); // hangul U+AC00–U+D7AF
    expect(dlugoscWazona('ᄀ')).toBe(2); // jamo U+1100–U+11FF
    expect(dlugoscWazona('Ａ１')).toBe(4); // pełna szerokość U+FF00–U+FFEF
    expect(dlugoscWazona('。、')).toBe(4); // znaki interpunkcji CJK U+3000–U+303F
    expect(dlugoscWazona('豈')).toBe(2); // zgodność CJK U+F900–U+FAFF
  });
  it('mieszany „3ベット” = 1 + 2 × 3', () => {
    expect(dlugoscWazona('3ベット')).toBe(7);
  });
  it('pusty tytuł = 0, znak spoza BMP liczony jako jeden znak (nie dwie jednostki UTF-16)', () => {
    expect(dlugoscWazona('')).toBe(0);
    expect(dlugoscWazona('𠀀')).toBe(1); // U+20000 (CJK Ext. B) poza zakresami reguły: 1, nie 2 jednostki
    expect(dlugoscWazona('♠A')).toBe(2);
  });
});

describe('HX D-1730: styl tytułu startu', () => {
  it('stała progu 0,19', () => {
    expect(PROG_TYTULU_DLUGIEGO).toBe(0.19);
  });
  it.each([
    [320, 54],
    [390, 68],
    [430, 75],
  ])('szerokość %i pt: %i znaków to jeszcze „tytul”, o jeden więcej to „tytulDlugi”', (szerokosc, prog) => {
    expect(stylTytuluSytuacji(znaki(prog), szerokosc)).toBe('tytul');
    expect(stylTytuluSytuacji(znaki(prog + 1), szerokosc)).toBe('tytulDlugi');
  });
  it('próg = floor(0,19 × (szerokość − 32)): 320 → 54, 390 → 68, 430 → 75', () => {
    for (const [w, prog] of [[320, 54], [390, 68], [430, 75]] as const) expect(Math.floor(PROG_TYTULU_DLUGIEGO * (w - 32))).toBe(prog);
  });
  it('ja: 34 znaki CJK (= 68) → „tytul” przy 390, 35 znaków → „tytulDlugi”', () => {
    expect(stylTytuluSytuacji(znaki(34, 'あ'), 390)).toBe('tytul');
    expect(stylTytuluSytuacji(znaki(35, 'あ'), 390)).toBe('tytulDlugi');
  });
  it('mieszany tytuł liczy wagi: 61 znaków łacińskich + „3ベット” (7) = 68 → „tytul”, plus jedna litera → „tytulDlugi”', () => {
    expect(stylTytuluSytuacji(`${znaki(61)}3ベット`, 390)).toBe('tytul');
    expect(stylTytuluSytuacji(`${znaki(62)}3ベット`, 390)).toBe('tytulDlugi');
  });
  it('wybór nie zależy od niczego poza tytułem i szerokością (brak parametru fontScale)', () => {
    expect(stylTytuluSytuacji.length).toBe(2);
  });
});
