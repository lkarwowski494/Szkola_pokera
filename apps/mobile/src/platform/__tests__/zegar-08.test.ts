/// <reference types="jest" />
// Zegar aplikacji (rola 08 cz. 5; moduly.md „Porty domeny” Zegar; D-208: getCalendars().timeZone może być null).
import { utworzZegar } from '@/platform/zegar';

describe('zegar telefonu', () => {
  it('strefa z kalendarza systemu; teraz z wstrzykniętego czasu; dzień lokalny w tej strefie', () => {
    const z = utworzZegar({ kalendarz: () => 'Asia/Tokyo', intl: () => 'Europe/Warsaw' }, () => 123);
    expect([z.strefa(), z.teraz(), z.dzienLokalny(Date.UTC(2026, 10, 7, 15, 30), z.strefa())]).toEqual(['Asia/Tokyo', 123, '2026-11-08']);
  });
  it('kalendarz bez strefy (null) → strefa silnika Intl; oba bez strefy → UTC (nazwane w D-257)', () => {
    expect(utworzZegar({ kalendarz: () => null, intl: () => 'Europe/Warsaw' }).strefa()).toBe('Europe/Warsaw');
    expect(utworzZegar({ kalendarz: () => null, intl: () => null }).strefa()).toBe('UTC');
  });
  it('strefa nieznana silnikowi Intl (RangeError przy dzienLokalny) → następne źródło', () => {
    expect(utworzZegar({ kalendarz: () => 'Mars/Olympus', intl: () => 'Europe/Warsaw' }).strefa()).toBe('Europe/Warsaw');
  });
});
