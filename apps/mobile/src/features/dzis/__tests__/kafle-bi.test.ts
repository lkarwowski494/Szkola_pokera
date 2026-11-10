import { etykietaKafla, liczbaKolumnKafli } from '@/features/dzis/widok';

describe('kafelki „Dziś” (D-541)', () => {
  it('jedna kolumna od dużego tekstu (skala ≥ 1,3), dwie przy domyślnym i XXXL', () => {
    expect(liczbaKolumnKafli(1)).toBe(2);
    expect(liczbaKolumnKafli(1.24)).toBe(2);
    expect(liczbaKolumnKafli(1.3)).toBe(1);
    expect(liczbaKolumnKafli(2.6)).toBe(1);
  });
  it('etykieta czytnika „{tytuł}. {stan}.” bez podwójnej kropki', () => {
    expect(etykietaKafla('Powtórki', '7 na dziś')).toBe('Powtórki. 7 na dziś.');
    expect(etykietaKafla('Scenariusze', 'Wkrótce.')).toBe('Scenariusze. Wkrótce.');
  });
});

import { stanKafli } from '@/features/dzis/widok';
import type { Limit } from '@szkola/domena';

const MODULY = [0, 1, 2, 3].map((o) => ({ id: `m${o}`, ord: o, title: `M${o}`, sub: '', phase: 'mvp' as const, recommended: true }));
const LEKCJE = MODULY.map((m) => ({ id: `${m.id}.l1`, moduleId: m.id, ord: 1, title: 't', sub: 's', drillCount: 3 }));
const JEST: Limit = { bezLimitu: false, pozostalo: 1, odnowienieMs: 1 };
const BRAK: Limit = { bezLimitu: false, pozostalo: 0, odnowienieMs: 1 };
const PRO: Limit = { bezLimitu: true };
const st = (limit: Limit, powtorkiNaDzis: number, ukonczoneLekcje: string[]) => stanKafli({ limit, powtorkiNaDzis, ukonczoneLekcje, moduly: MODULY, lekcje: LEKCJE });

describe('stan kafelków „Dziś” (BR-MENU-001, limit BR-LIM-001)', () => {
  it('nowy użytkownik: Powtórki „po pierwszej lekcji”, Scenariusze „po pierwszej lekcji modułu 2”, bez limitu', () => {
    expect(st(JEST, 0, [])).toEqual({ powtorki: 'po_pierwszej', sesja: 'opis', scenariusze: 'po_m2', stopkaLimitu: false });
  });
  it('lekcja z modułów 0–1 nie odblokowuje scenariuszy; powtórki bez kart = „brak”', () => {
    expect(st(JEST, 0, ['m0.l1'])).toMatchObject({ powtorki: 'brak', scenariusze: 'po_m2' });
  });
  it('lekcja z modułu 2 (albo dalszego) odblokowuje scenariusze (stan „wkrótce” do kroku F)', () => {
    expect(st(JEST, 0, ['m2.l1']).scenariusze).toBe('wkrotce');
    expect(st(JEST, 0, ['m3.l1']).scenariusze).toBe('wkrotce');
  });
  it('powtórki do zrobienia: „liczba”', () => {
    expect(st(JEST, 7, ['m0.l1']).powtorki).toBe('liczba');
  });
  it('limit wyczerpany: Sesja i Scenariusze w stanie limitu, stopka; Powtórki bez zmian', () => {
    expect(st(BRAK, 7, ['m2.l1'])).toEqual({ powtorki: 'liczba', sesja: 'limit', scenariusze: 'limit', stopkaLimitu: true });
  });
  it('limit wyczerpany u nowego użytkownika: Scenariusze nadal „po pierwszej lekcji modułu 2” (makieta: limit && !nowy)', () => {
    expect(st(BRAK, 0, [])).toEqual({ powtorki: 'po_pierwszej', sesja: 'limit', scenariusze: 'po_m2', stopkaLimitu: true });
  });
  it('Pro (bez limitu) i pozostało > 0: bez stanu limitu', () => {
    expect(st(PRO, 0, ['m2.l1'])).toMatchObject({ sesja: 'opis', stopkaLimitu: false });
    expect(st(JEST, 0, ['m2.l1'])).toMatchObject({ sesja: 'opis', stopkaLimitu: false });
  });
});
