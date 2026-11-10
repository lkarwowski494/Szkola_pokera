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
