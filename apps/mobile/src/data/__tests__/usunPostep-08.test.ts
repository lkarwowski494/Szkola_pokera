/// <reference types="jest" />
// „Usuń postęp” w aplikacji (BR-DANE-003, ADR 0004 wyjątek; rola 08 cz. 5): najpierw postęp przez port (usunPostep), potem
// stare user.db*; nieudane usunięcie postępu nie rusza starych plików (dane bez zmian, komunikat u wywołującego).
jest.mock('expo-sqlite', () => ({ openDatabaseAsync: jest.fn() }));
jest.mock('@/data/tresc/plikiExpo', () => ({ katalogBazExpo: () => '/k', systemExpo: {} }));
jest.mock('@/platform/ochronaTla', () => ({ utworzOchroneTla: () => undefined }));
import type { PlikiPostepu } from '@szkola/postep';
import { usunCalyPostep } from '@/data/postepExpo';
import { portTestowy } from '@/test-utils/postepTestowy';

function pliki(istniejace: string[]) {
  const usuniete: string[] = [];
  const p: PlikiPostepu = { istnieje: async (s) => istniejace.includes(s), przemianuj: async () => {}, usun: async (s) => { usuniete.push(s); } };
  return { p, usuniete };
}

describe('usunCalyPostep', () => {
  it('usuwa postęp (karty, odpowiedzi) i istniejące user.db*', async () => {
    const { port, db } = await portTestowy();
    db.prepare("INSERT INTO karta VALUES ('r1', 1, 1, 1, 1, 0, 1, 0, 2, NULL, 1)").run();
    const f = pliki(['/k/user.db', '/k/user.db-wal']);
    expect(await usunCalyPostep(port, '2026-11-08', f.p, '/k')).toEqual({ ok: true, wartosc: undefined });
    expect(db.prepare('SELECT count(*) AS n FROM karta').get()).toEqual({ n: 0 });
    expect([...f.usuniete].sort()).toEqual(['/k/user.db', '/k/user.db-wal']); // kolejność ustala STARE_BAZY w pakiecie
  });
  it('błąd usunięcia postępu → powód, stare pliki nietknięte', async () => {
    const { port } = await portTestowy();
    const zepsuty = { ...port, transakcja: async () => { throw Object.assign(new Error('io'), { errcode: 10 }); } };
    const f = pliki(['/k/user.db']);
    expect(await usunCalyPostep(zepsuty, '2026-11-08', f.p, '/k')).toEqual({ ok: false, powod: 'zapis_nieudany' });
    expect(f.usuniete).toEqual([]);
  });
});
