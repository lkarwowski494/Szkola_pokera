/// <reference types="jest" />
// HX 3.2 (D-1734, D-1735): stan miejsca „limp” w układzie stołu i w etykiecie dla czytnika (docs/design/scenariusz-i-ocena.md
// „Limperzy na stole i w dzienniku”). Domyślne zachowanie `ukladStolu` (limp → null) zostaje, bo trzymają je testy 08 i strażnik spots.yaml.
import '@/i18n';
import i18n from 'i18next';
import { etykietaStolu, ukladStolu } from '@/features/stol/uklad';
import { przebiegLimperow } from '@/features/scenariusz/limperzy';

const t = i18n.t.bind(i18n);
const stany = (ty: 'CO' | 'SB' | 'BB', limpers: number) =>
  ukladStolu(ty, przebiegLimperow(ty, limpers)!, { limp: true })!.map((m) => `${m.pozycja}:${m.stan}`);

describe('ukladStolu z opcją limp', () => {
  it('domyślnie limp nadal daje null (kontrakt 08, D-314)', () => {
    expect(ukladStolu('CO', 'UTG:fold,HJ:limp')).toBeNull();
  });
  it('CO, 1 limper → UTG pas, HJ limp, po tobie BTN, SB, BB', () => {
    expect(stany('CO', 1)).toEqual(['CO:ty', 'BTN:czeka', 'SB:czeka', 'BB:czeka', 'UTG:pas', 'HJ:limp']);
  });
  it('SB, 2 limperów → UTG, HJ pas; CO, BTN limp; BB po tobie', () => {
    expect(stany('SB', 2)).toEqual(['SB:ty', 'BB:czeka', 'UTG:pas', 'HJ:pas', 'CO:limp', 'BTN:limp']);
  });
  it('BB, 4 limperów → UTG pas; HJ, CO, BTN, SB limp', () => {
    expect(stany('BB', 4)).toEqual(['BB:ty', 'UTG:pas', 'HJ:limp', 'CO:limp', 'BTN:limp', 'SB:limp']);
  });
  it('z opcją limp inne akcje (call, check) nadal dają null; raise dalej działa', () => {
    expect(ukladStolu('BB', 'SB:call', { limp: true })).toBeNull();
    expect(ukladStolu('BB', 'BTN:raise2.5,SB:limp', { limp: true })?.find((m) => m.pozycja === 'SB')?.stan).toBe('limp');
  });
});

describe('etykietaStolu z limperami', () => {
  it('jeden limper: „UTG pas (fold), HJ limp, ty na CO, karty …, po tobie BTN, SB i BB”', () => {
    const m = ukladStolu('CO', 'UTG:fold,HJ:limp', { limp: true })!;
    expect(etykietaStolu(m, ['As', 'Jd'], t, { kartyNazwami: true })).toBe(
      `Przy stole: UTG pas (fold), HJ limp, ty na CO, karty ${t('card.name', { rank: t('card.rank.A'), suit: t('card.suit.s') })} i ${t('card.name', { rank: t('card.rank.J'), suit: t('card.suit.d') })}, po tobie BTN, SB i BB.`,
    );
  });
  it('dwóch limperów: jedna fraza „HJ i CO limp”, BTN pas', () => {
    const m = ukladStolu('SB', 'UTG:fold,HJ:limp,CO:limp,BTN:fold', { limp: true })!;
    const e = etykietaStolu(m, ['9h', '9c'], t, { kartyNazwami: true });
    expect(e).toContain('UTG pas (fold), HJ i CO limp, BTN pas (fold), ty na SB');
    expect(e.endsWith('po tobie BB.')).toBe(true);
  });
  it('bez opcji kartyNazwami etykieta jak dotąd (klasa ręki)', () => {
    const m = ukladStolu('CO', 'UTG:fold,HJ:limp', { limp: true })!;
    expect(etykietaStolu(m, ['As', 'Jd'], t)).toContain('ty na CO z AJo');
  });
});
