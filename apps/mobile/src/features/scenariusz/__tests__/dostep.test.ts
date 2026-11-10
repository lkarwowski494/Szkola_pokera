/// <reference types="jest" />
import { modulZaliczony, numerModulu, szablonOdblokowany } from '../dostep';

const p = (o: Partial<{ ukonczoneLekcje: string[]; zaliczoneTestem: string[]; zaliczoneOcena: string[] }> = {}) => ({ ukonczoneLekcje: [], zaliczoneTestem: [], zaliczoneOcena: [], ...o });

describe('odblokowanie szablonu (D-647)', () => {
  it('bez ukończonej lekcji modułu i bez zaliczenia: zablokowany', () => {
    expect(szablonOdblokowany({ module: 'm2' }, p({ ukonczoneLekcje: ['m3-l1'] }), ['m2-l1', 'm2-l2'])).toBe(false);
  });
  it('jedna ukończona lekcja modułu odblokowuje', () => {
    expect(szablonOdblokowany({ module: 'm2' }, p({ ukonczoneLekcje: ['m2-l2'] }), ['m2-l1', 'm2-l2'])).toBe(true);
  });
  it('moduł zaliczony testem albo oceną poziomu odblokowuje bez lekcji', () => {
    expect(szablonOdblokowany({ module: 'm2' }, p({ zaliczoneTestem: ['m2'] }), ['m2-l1'])).toBe(true);
    expect(szablonOdblokowany({ module: 'm2' }, p({ zaliczoneOcena: ['m2'] }), ['m2-l1'])).toBe(true);
    expect(modulZaliczony(p({ zaliczoneOcena: ['m3'] }), 'm2')).toBe(false);
  });
  it('numer modułu z id', () => {
    expect(numerModulu('m11')).toBe(11);
    expect(numerModulu('inny')).toBeNull();
  });
});
