/// <reference types="jest" />
// 08-F24 (D-284): wiersz na „Dziś” i zakładka miały ten sam tekst „Powtórki” — dwa cele pod jedną nazwą (także dla VoiceOver).
// Wiersz: „Powtórki na dziś”, zakładka zostaje „Powtórki”; wartość wiersza bez powtórzenia „na dziś” (D-331).
import i18n from '@/i18n';

describe('08-F24: „Powtórki na dziś” na „Dziś”', () => {
  it('wiersz i zakładka mają różne nazwy', () => {
    expect(i18n.t('today.reviews')).toBe('Powtórki na dziś');
    expect(i18n.t('tabs.review')).toBe('Powtórki');
  });
  it.each([1, 2, 5, 22, 25])('wartość wiersza przy %i powtórkach: sama liczba, bez drugiego „na dziś”', (n) => {
    expect(i18n.t('today.reviewsDue', { count: n })).toBe(String(n));
  });
});
