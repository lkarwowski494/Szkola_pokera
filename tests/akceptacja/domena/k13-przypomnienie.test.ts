// K-13 (docs/architektura/kontrole-07.md; ADR 0012 „Potwierdzenie”): włączenie → dokładnie jedno zaplanowane powiadomienie
// z wyzwalaczem `daily`; ponowne włączenie, import, zmiana języka → nadal jedno; odmowa → zero, bez błędu; „Usuń postęp” → zero.
// Wyrocznia: ADR 0012 pkt 1–3 i K-13; stan systemu w atrapie tests/narzedzia/powiadomienia-atrapa.ts, nie w kodzie aplikacji.
// Wersja oczekująca (07 fix, D-224; L8-05, D-218): K-13-l — błąd API planowania jako wartość `planowanie_nieudane`
// (tlo-i-bledy.md §4), nie wyjątek. Zastępuje packages/domena/test/k13-przypomnienie.test.ts w commicie 08, który ją zazielenia.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { odtworzPrzypomnienie, wlaczPrzypomnienie, type UstawieniaPrzypomnienia } from '../../../packages/domena/src';
import { atrapaPowiadomien } from '../../narzedzia/powiadomienia-atrapa';

const PL = { tytul: 'Szkoła Pokera', tresc: 'Czas na krótką sesję.' };
const EN = { tytul: 'Poker School', tresc: 'Time for a short session.' };
const PORA = { godzina: 19, minuta: 30 };
const WLACZONE: UstawieniaPrzypomnienia = { wlaczone: true, ...PORA };

describe('K-13 / ADR 0012: przypomnienie codzienne', () => {
  it('AK-K-13-a, AK-BR-POW-003-a włączenie po zgodzie → ustawienia włączone i dokładnie jedno powiadomienie `daily` o wybranej porze z tekstem w języku aplikacji', async () => {
    const p = atrapaPowiadomien('nieustalona', 'udzielona');
    expect(await wlaczPrzypomnienie(p, PORA, PL)).toEqual({ ok: true, wartosc: WLACZONE });
    expect(p.zaplanowaneTeraz).toEqual([{ id: expect.any(String), ...PL, wyzwalacz: { type: 'daily', hour: 19, minute: 30 } }]);
    expect(p.wywolania[0]).toBe('zgoda'); // pkt 2: najpierw stan zgody, potem prośba
    expect(p.wywolania).toContain('popros');
  });

  it('AK-K-13-b ponowne włączenie → nadal jedno', async () => {
    const p = atrapaPowiadomien('nieustalona', 'udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    await wlaczPrzypomnienie(p, { godzina: 8, minuta: 5 }, PL);
    expect(p.zaplanowaneTeraz).toHaveLength(1);
    expect(p.zaplanowaneTeraz[0]!.wyzwalacz).toEqual({ type: 'daily', hour: 8, minute: 5 });
  });

  it('AK-K-13-c start aplikacji i import (odtworzenie z ustawień) przy zaplanowanym już powiadomieniu → nadal jedno, z porą z ustawień', async () => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    expect(await odtworzPrzypomnienie(p, WLACZONE, PL)).toBe('zaplanowane'); // start
    expect(await odtworzPrzypomnienie(p, { wlaczone: true, godzina: 7, minuta: 0 }, PL)).toBe('zaplanowane'); // import z inną porą
    expect(p.zaplanowaneTeraz).toHaveLength(1);
    expect(p.zaplanowaneTeraz[0]!.wyzwalacz).toEqual({ type: 'daily', hour: 7, minute: 0 });
  });

  it('AK-K-13-d zmiana języka → nadal jedno, z tekstem w nowym języku (pkt 3)', async () => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    await odtworzPrzypomnienie(p, WLACZONE, EN);
    expect(p.zaplanowaneTeraz).toEqual([{ id: expect.any(String), ...EN, wyzwalacz: { type: 'daily', hour: 19, minute: 30 } }]);
  });

  it.each(['nieustalona', 'odmowa'] as const)('AK-K-13-e, AK-BR-POW-003-b odmowa (stan przed: %s) → brak_zgody bez wyjątku, zero powiadomień', async (stan) => {
    const p = atrapaPowiadomien(stan, 'odmowa');
    await expect(wlaczPrzypomnienie(p, PORA, PL)).resolves.toEqual({ ok: false, powod: 'brak_zgody' });
    expect(p.zaplanowaneTeraz).toEqual([]);
  });

  it('AK-K-13-f odtworzenie nigdy nie otwiera okna zgody (pkt 2: prośba tylko po akcji użytkownika); bez zgody → zero', async () => {
    const p = atrapaPowiadomien('nieustalona');
    expect(await odtworzPrzypomnienie(p, WLACZONE, PL)).toBe('brak_zgody');
    expect(p.wywolania).not.toContain('popros');
    expect(p.zaplanowaneTeraz).toEqual([]);
  });

  it('AK-K-13-g zgoda odebrana w Ustawieniach systemu → przy następnym starcie zero zaplanowanych, bez błędu', async () => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    p.stan = 'odmowa';
    expect(await odtworzPrzypomnienie(p, WLACZONE, PL)).toBe('brak_zgody');
    expect(p.zaplanowaneTeraz).toEqual([]);
  });

  it.each([false, true])('AK-K-13-h „Usuń postęp” (ustawienia domyślne: wyłączone) → zero powiadomień (zgoda odebrana wcześniej: %s)', async (odebrana) => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    if (odebrana) p.stan = 'odmowa'; // powiadomienie nie może wrócić po ponownym włączeniu zgody w Ustawieniach
    expect(await odtworzPrzypomnienie(p, { wlaczone: false, ...PORA }, PL)).toBe('wylaczone');
    expect(p.zaplanowaneTeraz).toEqual([]);
  });

  it('AK-K-13-i własność: każda pora 00:00–23:59 trafia do wyzwalacza bez zmiany (bez przeliczania strefy), tekst bez dopisków', async () => {
    await fc.assert(fc.asyncProperty(fc.integer({ min: 0, max: 23 }), fc.integer({ min: 0, max: 59 }), async (godzina, minuta) => {
      const p = atrapaPowiadomien('udzielona');
      expect(await odtworzPrzypomnienie(p, { wlaczone: true, godzina, minuta }, PL)).toBe('zaplanowane');
      expect(p.zaplanowaneTeraz).toEqual([{ id: expect.any(String), ...PL, wyzwalacz: { type: 'daily', hour: godzina, minute: minuta } }]);
    }), { includeErrorInReport: true });
  });

  it('AK-K-13-j współbieżnie: start ze zmianą języka i z włączeniem przełącznika → nadal jedno (stały identyfikator żądania)', async () => {
    const p = atrapaPowiadomien('udzielona');
    await Promise.all([odtworzPrzypomnienie(p, WLACZONE, PL), odtworzPrzypomnienie(p, WLACZONE, EN)]);
    expect(p.zaplanowaneTeraz).toHaveLength(1);
    await Promise.all([odtworzPrzypomnienie(p, WLACZONE, PL), wlaczPrzypomnienie(p, { godzina: 6, minuta: 15 }, PL)]);
    expect(p.zaplanowaneTeraz).toHaveLength(1);
  });

  it.each([[24, 0], [12, 60], [-1, 0], [7.5, 0]])('AK-K-13-k pora spoza zakresu z importu (%s:%s) → bez wyjątku i bez zaplanowania (prawdziwe API rzuca RangeError)', async (godzina, minuta) => {
    const p = atrapaPowiadomien('udzielona');
    const w = await odtworzPrzypomnienie(p, { wlaczone: true, godzina, minuta }, PL);
    expect(w).not.toBe('zaplanowane');
    expect(p.zaplanowaneTeraz).toEqual([]);
  });

  // Wynik albo opis wyjątku: porażka obecnego kodu (wyjątek) ma być porażką asercji, nie odrzuconą obietnicą.
  const wynikAlboWyjatek = (o: Promise<unknown>) => o.catch((e: unknown) => ({ wyjatek: String(e) }));
  it('AK-K-13-l, AK-L8-05 błąd API planowania przy włączaniu → planowanie_nieudane bez wyjątku, zero zaplanowanych (przełącznik wyłączony)', async () => {
    const p = atrapaPowiadomien('udzielona');
    p.bladPlanowania = true;
    expect(await wynikAlboWyjatek(wlaczPrzypomnienie(p, PORA, PL))).toEqual({ ok: false, powod: 'planowanie_nieudane' });
    expect(p.zaplanowaneTeraz).toEqual([]);
  });
  it('AK-K-13-m błąd API przy ponownym włączeniu (było zaplanowane) → planowanie_nieudane, nie zostaje stare powiadomienie', async () => {
    const p = atrapaPowiadomien('udzielona');
    await wlaczPrzypomnienie(p, PORA, PL);
    p.bladPlanowania = true;
    expect(await wynikAlboWyjatek(wlaczPrzypomnienie(p, { godzina: 8, minuta: 0 }, PL))).toEqual({ ok: false, powod: 'planowanie_nieudane' });
    expect(p.zaplanowaneTeraz).toEqual([]);
  });
  it('AK-K-13-n odmowa nadal daje brak_zgody, nie planowanie_nieudane (dwa powody rozróżnione, D-218)', async () => {
    const p = atrapaPowiadomien('nieustalona', 'odmowa');
    p.bladPlanowania = true;
    expect(await wynikAlboWyjatek(wlaczPrzypomnienie(p, PORA, PL))).toEqual({ ok: false, powod: 'brak_zgody' });
  });
});
