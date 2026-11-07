// Test roli 08 (próby mutacji D-172): przypomnienie — przypadki, które przeżyły mutanty przy K-13.
// Wyrocznia: ADR 0012 pkt 1 („anuluj wszystkie własne → zaplanuj jedno”), pkt 2 (odmowa → zero powiadomień).
import { describe, expect, it } from 'vitest';
import { ID_PRZYPOMNIENIA, odtworzPrzypomnienie, wlaczPrzypomnienie } from '../src';
import { atrapaPowiadomien } from '../../../tests/narzedzia/powiadomienia-atrapa';

const PL = { tytul: 'Szkoła Pokera', tresc: 'Czas na krótką sesję.' };
const STARE = { id: 'signing-reminder', tytul: 'stare', tresc: 'stare', wyzwalacz: { type: 'daily' as const, hour: 9, minute: 0 } };

describe('przypomnienie: przypadki roli 08', () => {
  it('powiadomienie innej wersji aplikacji (inny identyfikator) znika: po odtworzeniu i po włączeniu jest tylko jedno, własne', async () => {
    const p = atrapaPowiadomien('udzielona');
    p.zaplanowaneTeraz.push({ ...STARE });
    expect(await odtworzPrzypomnienie(p, { wlaczone: true, godzina: 19, minuta: 30 }, PL)).toBe('zaplanowane');
    expect(p.zaplanowaneTeraz.map((x) => x.id)).toEqual([ID_PRZYPOMNIENIA]);
    p.zaplanowaneTeraz.push({ ...STARE });
    await wlaczPrzypomnienie(p, { godzina: 8, minuta: 0 }, PL);
    expect(p.zaplanowaneTeraz.map((x) => x.id)).toEqual([ID_PRZYPOMNIENIA]);
  });

  it('włączenie po odebraniu zgody w Ustawieniach (zaplanowane z wcześniej) → brak_zgody i zero powiadomień', async () => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, { godzina: 19, minuta: 30 }, PL);
    p.stan = 'odmowa';
    expect(await wlaczPrzypomnienie(p, { godzina: 7, minuta: 0 }, PL)).toEqual({ ok: false, powod: 'brak_zgody' });
    expect(p.zaplanowaneTeraz).toEqual([]);
  });
});
