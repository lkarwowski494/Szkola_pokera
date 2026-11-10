/// <reference types="jest" />
import { ustalPoziom } from '../wejscie';

describe('ustalPoziom (BR-POZ-002)', () => {
  it('„Automatycznie”: poziom z automatu, bez komunikatu o zastąpieniu', () => {
    expect(ustalPoziom('auto', 'sredni', ['latwy', 'sredni'])).toEqual({ wybor: 'auto', auto: 'sredni', poziom: 'sredni', zastapiony: false });
  });
  it('automat chce trudny, a szablon ma łatwy i średni: średni, bez komunikatu (użytkownik nic nie wybierał)', () => {
    expect(ustalPoziom('auto', 'trudny', ['latwy', 'sredni'])).toMatchObject({ poziom: 'sredni', zastapiony: false });
  });
  it('wybór ręczny „trudny” na szablonie łatwy+średni: średni i informacja, że trudnego nie ma (AK „Szablon bez wybranego poziomu”)', () => {
    expect(ustalPoziom('trudny', 'latwy', ['latwy', 'sredni'])).toEqual({ wybor: 'trudny', auto: 'latwy', poziom: 'sredni', zastapiony: true });
  });
  it('wybór ręczny, który szablon ma: bez zastąpienia', () => {
    expect(ustalPoziom('latwy', 'trudny', ['latwy', 'sredni', 'trudny'])).toMatchObject({ poziom: 'latwy', zastapiony: false });
  });
});
