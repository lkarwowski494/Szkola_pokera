/// <reference types="jest" />
// Przełącznik przypomnienia w ustawieniach (ADR 0012 pkt 1–3, D-252; F-11): włączenie prosi o zgodę po akcji użytkownika,
// planuje jedno powiadomienie o PRZYPOMNIENIE_DOMYSLNA_PORA i zapisuje `przypomnienie`; odmowa albo błąd API → zapis
// „wyłączone” i wynik do komunikatu; wyłączenie anuluje. Odtworzenie (start, import, „Usuń postęp”) czyta zapis z bazy.
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));
import { KONFIGURACJA, type PortPowiadomien } from '@szkola/domena';
import { czytajPrzypomnienie } from '@/features/ustawienia/ustawieniaAplikacji';
import { odtworzZBazy, przelaczPrzypomnienie } from '@/features/ustawienia/przypomnienie';
import { portTestowy } from '@/test-utils/postepTestowy';

const TEKST = { tytul: 'Szkoła Pokera', tresc: 'Czas na lekcję.' };
function atrapa(o: { zgoda?: boolean; canAskAgain?: boolean; prosba?: boolean; bladPlanu?: boolean } = {}) {
  const zaplanowane: unknown[] = [];
  const p: PortPowiadomien & { zaplanowane: unknown[]; prosby: number } = {
    zaplanowane,
    prosby: 0,
    zgoda: async () => ({ granted: o.zgoda ?? false, canAskAgain: o.canAskAgain ?? true }),
    popros: async () => {
      p.prosby += 1;
      return { granted: o.prosba ?? true, canAskAgain: false };
    },
    anulujWszystkie: async () => { zaplanowane.length = 0; },
    zaplanuj: async (z) => {
      if (o.bladPlanu) throw new Error('API');
      zaplanowane.push(z.wyzwalacz);
      return 'id';
    },
  };
  return p;
}

describe('przelaczPrzypomnienie', () => {
  it('włączenie ze zgodą → jedno powiadomienie o domyślnej porze, zapis włączone', async () => {
    const { port } = await portTestowy();
    const pow = atrapa({ zgoda: false, prosba: true });
    expect(await przelaczPrzypomnienie(port, pow, true, TEKST, 1)).toBe('wlaczone');
    expect(pow.prosby).toBe(1);
    const { godzina, minuta } = KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA;
    expect(pow.zaplanowane).toEqual([{ type: 'daily', hour: godzina, minute: minuta }]);
    expect(await czytajPrzypomnienie(port)).toEqual({ ok: true, wartosc: { wlaczone: true, godzina, minuta } });
  });
  it('odmowa → brak_zgody, zapis wyłączone, bez powiadomienia', async () => {
    const { port } = await portTestowy();
    const pow = atrapa({ zgoda: false, prosba: false });
    expect(await przelaczPrzypomnienie(port, pow, true, TEKST, 1)).toBe('brak_zgody');
    expect(pow.zaplanowane).toEqual([]);
    expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: false } });
  });
  it('błąd API przy planowaniu → blad, zapis wyłączone', async () => {
    const { port } = await portTestowy();
    expect(await przelaczPrzypomnienie(port, atrapa({ zgoda: true, bladPlanu: true }), true, TEKST, 1)).toBe('blad');
    expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: false } });
  });
  it('wyłączenie → anulowane i zapis wyłączone', async () => {
    const { port } = await portTestowy();
    const pow = atrapa({ zgoda: true });
    await przelaczPrzypomnienie(port, pow, true, TEKST, 1);
    expect(await przelaczPrzypomnienie(port, pow, false, TEKST, 2)).toBe('wylaczone');
    expect(pow.zaplanowane).toEqual([]);
    expect(await czytajPrzypomnienie(port)).toMatchObject({ ok: true, wartosc: { wlaczone: false } });
  });
  it('nieudany zapis po włączeniu → blad i anulowane (przełącznik nie pokazuje „włączone” bez zapisu)', async () => {
    const { port } = await portTestowy();
    const pow = atrapa({ zgoda: true });
    const zepsuty = { ...port, run: async () => { throw Object.assign(new Error('io'), { errcode: 10 }); } };
    expect(await przelaczPrzypomnienie(zepsuty, pow, true, TEKST, 1)).toBe('blad');
    expect(pow.zaplanowane).toEqual([]);
  });
});

describe('odtworzZBazy (start, import, „Usuń postęp”)', () => {
  it('zapis włączony i zgoda → zaplanowane; brak zapisu → anulowane', async () => {
    const { port } = await portTestowy();
    const pow = atrapa({ zgoda: true });
    await przelaczPrzypomnienie(port, pow, true, TEKST, 1);
    pow.zaplanowane.length = 0;
    expect(await odtworzZBazy(port, pow, TEKST)).toBe('zaplanowane');
    expect(pow.zaplanowane).toHaveLength(1);
    const { port: pusty } = await portTestowy();
    expect(await odtworzZBazy(pusty, pow, TEKST)).toBe('wylaczone');
    expect(pow.zaplanowane).toEqual([]);
  });
});
