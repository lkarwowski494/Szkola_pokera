/// <reference types="jest" />
// Historia wskaźnika w `ustawienie` (D-250; rola 08 cz. 5 — zastępuje wersję na user.db): jeden punkt na dzień lokalny,
// nadpisywany w ciągu dnia, najwyżej HISTORIA_DNI ostatnich dni; tylko wiedza (ADR 0011).
import { computeAdvancement } from '@szkola/srs';
import { odczytajUstawienie } from '@szkola/postep';
import { HISTORIA_DNI, KLUCZ_HISTORII, czytajHistorie, dopiszHistorie, zapiszHistorie } from '../historia';
import { portTestowy } from '@/test-utils/postepTestowy';

describe('historia wskaźnika (D-250)', () => {
  it('dopisanie: nowy dzień na końcu, ten sam dzień nadpisany, najstarsze poza HISTORIA_DNI wypadają', () => {
    let h = dopiszHistorie([], '2026-11-01', 10);
    h = dopiszHistorie(h, '2026-11-01', 12);
    h = dopiszHistorie(h, '2026-11-02', null);
    expect(h).toEqual([{ dzien: '2026-11-01', wynik: 12 }, { dzien: '2026-11-02', wynik: null }]);
    let dlugie: ReturnType<typeof dopiszHistorie> = [];
    for (let d = 1; d <= HISTORIA_DNI + 2; d++) dlugie = dopiszHistorie(dlugie, `2026-10-${String(d).padStart(2, '0')}`, d);
    expect(dlugie).toHaveLength(HISTORIA_DNI);
    expect(dlugie[0]).toEqual({ dzien: '2026-10-03', wynik: 3 });
  });
  it('zapis i odczyt przez port: wynik ogólny z raportu (tylko wiedza), dzień lokalny', async () => {
    const { port } = await portTestowy();
    const r = computeAdvancement([{ id: 'm3', skills: ['x'], counted: true }], [], Date.UTC(2026, 10, 8, 12));
    expect(await zapiszHistorie(port, r, '2026-11-08', 1)).toEqual({ ok: true, wartosc: undefined });
    expect(await czytajHistorie(port)).toEqual({ ok: true, wartosc: [{ dzien: '2026-11-08', wynik: r.overall }] });
    expect(await odczytajUstawienie(port, KLUCZ_HISTORII)).toEqual({ ok: true, wartosc: [{ dzien: '2026-11-08', wynik: r.overall }] });
  });
  it('brak historii → pusta lista; zapisana wartość w złym kształcie → odczyt_nieudany (nie zgadnięta lista)', async () => {
    const { port, db } = await portTestowy();
    expect(await czytajHistorie(port)).toEqual({ ok: true, wartosc: [] });
    db.prepare("INSERT INTO ustawienie VALUES (?, '[{\"dzien\":1}]', 0)").run(KLUCZ_HISTORII);
    expect(await czytajHistorie(port)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});
