/// <reference types="jest" />
// Poziom scenariusza (BR-POZ-002, D-534 + D-649 awans po serii): automat, szablon bez wybranego poziomu, ustawienie ręczne.
import type { OcenaOdpowiedzi } from '@szkola/domena';
import { parsujWyborPoziomu, poziomAuto, poziomDlaSzablonu, udzialDobrych, type WynikWariantu } from '../poziom';

const dobre: OcenaOdpowiedzi[] = ['zgodne', 'dopuszczalne'];
const zle: OcenaOdpowiedzi[] = ['blad', 'niedokladnosc'];
const w = (poziom: WynikWariantu['poziom'], oceny: OcenaOdpowiedzi[]): WynikWariantu => ({ poziom, oceny });
const seria = (n: number, poziom: WynikWariantu['poziom'], oceny: OcenaOdpowiedzi[]) => Array.from({ length: n }, () => w(poziom, oceny));

describe('udział dobrych decyzji', () => {
  it('zgodne i dopuszczalne to dobre; niedokładność i błąd nie; brak decyzji → null', () => {
    expect(udzialDobrych(['zgodne', 'blad'])).toBe(0.5);
    expect(udzialDobrych(['dopuszczalne', 'dopuszczalne'])).toBe(1);
    expect(udzialDobrych(['niedokladnosc'])).toBe(0);
    expect(udzialDobrych([])).toBeNull();
  });
});

describe('poziomAuto (BR-POZ-002)', () => {
  it('start: bez zaliczonego testu modułu → łatwy', () => expect(poziomAuto({ modulZaliczony: false, wyniki: [] })).toBe('latwy'));
  it('zaliczony test modułu (albo przeskoczony oceną poziomu) → średni', () => expect(poziomAuto({ modulZaliczony: true, wyniki: [] })).toBe('sredni'));
  it('trudny po 5 kolejnych średnich wariantach z ≥ 80% dobrych decyzji', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: seria(5, 'sredni', ['zgodne', 'dopuszczalne']) })).toBe('trudny');
  });
  it('4 takie warianty to za mało; seria przerwana wariantem poniżej 80% zaczyna się od nowa', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: seria(4, 'sredni', dobre) })).toBe('sredni');
    expect(poziomAuto({ modulZaliczony: true, wyniki: [...seria(4, 'sredni', dobre), w('sredni', ['zgodne', 'blad']), ...seria(4, 'sredni', dobre)] })).toBe('sredni');
  });
  it('warianty łatwe nie liczą się do serii na trudny', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: [...seria(3, 'latwy', dobre), ...seria(4, 'sredni', dobre)] })).toBe('sredni');
  });
  it('w dół o poziom po 3 kolejnych wariantach z < 50% dobrych decyzji (AK „Zmiana automatu w dół”)', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: seria(3, 'sredni', zle) })).toBe('latwy');
    expect(poziomAuto({ modulZaliczony: true, wyniki: [...seria(5, 'sredni', dobre), ...seria(3, 'trudny', zle)] })).toBe('sredni');
  });
  it('dokładnie 50% dobrych decyzji nie jest „mniej niż 50%”; 2 słabe warianty to za mało', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: seria(3, 'sredni', ['zgodne', 'blad']) })).toBe('sredni');
    expect(poziomAuto({ modulZaliczony: true, wyniki: seria(2, 'sredni', zle) })).toBe('sredni');
  });
  it('D-649: po spadku na łatwy powrót na średni po 5 kolejnych łatwych wariantach ≥ 80%, tylko gdy test modułu zaliczony', () => {
    const spadek = seria(3, 'sredni', zle);
    expect(poziomAuto({ modulZaliczony: true, wyniki: [...spadek, ...seria(5, 'latwy', dobre)] })).toBe('sredni');
    expect(poziomAuto({ modulZaliczony: false, wyniki: seria(5, 'latwy', dobre) })).toBe('latwy');
  });
  it('wynik bez decyzji (np. pusta lista ocen) przerywa serie, nie psuje wyliczenia', () => {
    expect(poziomAuto({ modulZaliczony: true, wyniki: [...seria(4, 'sredni', dobre), w('sredni', []), w('sredni', dobre)] })).toBe('sredni');
  });
});

describe('poziomDlaSzablonu: najbliższy niższy z poziomów szablonu', () => {
  it('poziom jest → bez zastąpienia', () => expect(poziomDlaSzablonu('trudny', ['latwy', 'sredni', 'trudny'])).toEqual({ poziom: 'trudny', zastapiony: false }));
  it('trudny na szablonie łatwy+średni → średni, zastąpiony (AK „Szablon bez wybranego poziomu”)', () => {
    expect(poziomDlaSzablonu('trudny', ['latwy', 'sredni'])).toEqual({ poziom: 'sredni', zastapiony: true });
  });
  it('średni na szablonie łatwy+trudny → łatwy', () => expect(poziomDlaSzablonu('sredni', ['latwy', 'trudny'])).toEqual({ poziom: 'latwy', zastapiony: true }));
  it('szablon bez poziomu łatwego (błąd treści) → najniższy, który ma', () => expect(poziomDlaSzablonu('latwy', ['sredni'])).toEqual({ poziom: 'sredni', zastapiony: true }));
});

describe('ustawienie ręczne', () => {
  it('poprawne wartości przechodzą, reszta → null (brak zostaje brakiem)', () => {
    for (const v of ['auto', 'latwy', 'sredni', 'trudny']) expect(parsujWyborPoziomu(v)).toBe(v);
    for (const v of [null, undefined, 3, 'Trudny', '', {}]) expect(parsujWyborPoziomu(v)).toBeNull();
  });
});
