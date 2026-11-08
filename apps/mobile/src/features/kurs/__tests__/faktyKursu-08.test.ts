/// <reference types="jest" />
// Fakty kursu z postep.db dla „Dziś” i ścieżki (08 cz. 5b krok 1; moduly.md „Kurs”: FaktyKursu, punkt startu w
// ustawieniu `punkt_startu` jako { modulId, ustawionoMs }, D-260). Brak zostaje brakiem, zły kształt = błąd odczytu.
import { zapiszUstawienie } from '@szkola/postep';
import { czytajFaktyKursu, parsujPunktStartu } from '@/features/kurs/faktyKursu';
import { portTestowy } from '@/test-utils/postepTestowy';

describe('faktyKursu', () => {
  it('pusta baza: bez ukończonych lekcji, bez punktu startu (null = „Pomiń”/brak oceny), bez testów', async () => {
    const { port } = await portTestowy();
    expect(await czytajFaktyKursu(port)).toEqual({ ok: true, wartosc: { ukonczoneLekcje: [], punktStartu: null, testy: [] } });
  });

  it('ukończona lekcja tylko z datą ukończenia; punkt startu z ustawienia', async () => {
    const { port, db } = await portTestowy();
    db.prepare('INSERT INTO postep_lekcji (lekcja_id, teoria_przeczytana, ukonczono_ms, zmieniono_ms) VALUES (?, 1, ?, 1), (?, 1, NULL, 1)').run('m0.l1', 10, 'm0.l2');
    await zapiszUstawienie(port, 'punkt_startu', { modulId: 'm3', ustawionoMs: 7 }, 7);
    expect(await czytajFaktyKursu(port)).toEqual({ ok: true, wartosc: { ukonczoneLekcje: ['m0.l1'], punktStartu: { modulId: 'm3', ustawionoMs: 7 }, testy: [] } });
  });

  it('punkt startu w złym kształcie → odczyt_nieudany (bez zgadywania modułu)', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'punkt_startu', { modulId: 3 }, 7);
    expect(await czytajFaktyKursu(port)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });

  it.each([
    [null, { ok: true, wartosc: null }],
    [{ modulId: 'm0', ustawionoMs: 0 }, { ok: true, wartosc: { modulId: 'm0', ustawionoMs: 0 } }],
    [{ modulId: '', ustawionoMs: 1 }, { ok: false, powod: 'odczyt_nieudany' }],
    [{ modulId: 'm1', ustawionoMs: 1.5 }, { ok: false, powod: 'odczyt_nieudany' }],
    [{ modulId: 'm1' }, { ok: false, powod: 'odczyt_nieudany' }],
    ['m1', { ok: false, powod: 'odczyt_nieudany' }],
  ])('parsujPunktStartu(%j)', (v, oczekiwany) => {
    expect(parsujPunktStartu(v)).toEqual(oczekiwany);
  });
});
