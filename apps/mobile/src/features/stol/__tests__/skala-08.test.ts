/// <reference types="jest" />
// 08 część 6 krok 6 (D-274): skala stopni z progów `thresholds.ts` (design-spec „Komponenty”: „trzy przedziały z progów”;
// makieta e3 po-ocenie: „Błąd poniżej 3,5%”, „Dopuszczalna 3,5–25%”, „Zgodna od 25%”). Progi czytane z modułu, nie wpisane.
import '@/i18n';
import i18n from 'i18next';
import { MIXED_LOW, MIXED_MIN } from '@/features/drills/thresholds';
import { etykietaSkali, przedzialySkali } from '@/features/stol/skala';

const t = i18n.t.bind(i18n);
const proc = (x: number) => new Intl.NumberFormat('pl', { maximumFractionDigits: 1 }).format(x * 100);

describe('przedzialySkali', () => {
  it('trzy przedziały z progów MIXED_MIN i MIXED_LOW, podpisy z tych progów, twój przedział według oceny', () => {
    expect(przedzialySkali('dopuszczalne', t)).toEqual([
      { stopien: 'blad', slowo: t('grade.blad'), zakres: `poniżej ${proc(MIXED_MIN)}%`, twoj: false },
      { stopien: 'dopuszczalne', slowo: t('grade.dopuszczalne'), zakres: `${proc(MIXED_MIN)}–${proc(MIXED_LOW)}%`, twoj: true },
      { stopien: 'zgodne', slowo: t('grade.zgodne'), zakres: `od ${proc(MIXED_LOW)}%`, twoj: false },
    ]);
  });

  it('akcja najczęstsza poniżej MIXED_LOW jest zgodna (ADR-26) — przedział z oceny, nie z samej częstości; niedokładność (zły rozmiar) bez przedziału', () => {
    expect(przedzialySkali('zgodne', t).find((p) => p.twoj)?.stopien).toBe('zgodne');
    expect(przedzialySkali('niedokladnosc', t).some((p) => p.twoj)).toBe(false);
  });
});

describe('etykietaSkali', () => {
  it('jak w makiecie: „Skala stopni: twoja akcja 20 procent, przedział dopuszczalna”', () => {
    expect(etykietaSkali(0.2, 'dopuszczalne', t)).toBe(`Skala stopni: twoja akcja 20 procent, przedział ${t('grade.dopuszczalne').toLowerCase()}.`);
  });
});
