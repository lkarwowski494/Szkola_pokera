// Zgłoszenie 10-D01-01 (WYSOKIE, wytyczna App Store 2.3.1(a)): ekran zakupu nie obiecuje funkcji, której wydanie nie ma.
// Scenariusze (F-12) są poza 1.0 (D-305), a pozycja pojawia się tylko z treścią scenariuszy (D-255). Wyrocznia: brak treści
// scenariuszy w content/pl, nie kod ekranu.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const korzen = join(__dirname, '../../../../..');
const maScenariusze = existsSync(join(korzen, 'content/pl/scenarios')) || existsSync(join(korzen, 'content/pl/scenariusze'));
const locales = join(__dirname, '../locales');
const slowniki = readdirSync(locales).filter((f) => /^[A-Za-z0-9-]+\.json$/.test(f) && !f.includes('kontekst'));

describe('10-D01-01: tekst zakupu a funkcje wydania', () => {
  it.each(slowniki)('%s: purchase.unlocks nie wymienia scenariuszy, gdy treść ich nie ma', (f) => {
    const s = JSON.parse(readFileSync(join(locales, f), 'utf8')) as { purchase?: { unlocks?: string } };
    const tekst = s.purchase?.unlocks ?? '';
    expect(tekst).not.toBe('');
    if (!maScenariusze) expect(tekst).not.toMatch(/scenariusz|scenario/i);
  });
});
