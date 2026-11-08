/// <reference types="jest" />
// Prośba o ocenę na podsumowaniu lekcji albo sesji (BR-OPIN-001, D-110; expo-store-review `requestReview`): wołana tylko,
// gdy domena pozwala i system ją obsługuje; chwila prośby zapisana w `opinie`, więc druga prośba czeka odstęp. Błąd systemu
// albo bazy niczego nie psuje (podsumowanie zostaje).
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));
import { KONFIGURACJA } from '@szkola/domena';
import { zacznijAktywnosc, zakonczAktywnosc, type PortBazy } from '@szkola/postep';
import { poprosOOceneGdyPora, type PortOceny } from '@/features/opinie/prosbaOOcene';
import { portTestowy } from '@/test-utils/postepTestowy';

async function prace(port: PortBazy, n: number) {
  for (let i = 0; i < n; i++) {
    await zacznijAktywnosc(port, `l${i}`, { stan: 'w_toku', rodzaj: 'lekcja', zLimitu: false, dzienLokalny: '2026-11-08', strefa: 'UTC', startMs: i, plan: { liczbaKrokow: 1, trescId: `m0.l${i}` }, krok: 0 });
    await zakonczAktywnosc(port, `l${i}`, i + 1);
  }
}
const ocena = (dostepna = true): PortOceny & { popros: jest.Mock } => ({ dostepna: async () => dostepna, popros: jest.fn(async () => undefined) });

describe('poprosOOceneGdyPora', () => {
  it('od progu prac: prośba raz, potem odstęp', async () => {
    const { port } = await portTestowy();
    await prace(port, KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY);
    const o = ocena();
    expect(await poprosOOceneGdyPora(port, o, 'podsumowanie_lekcji', 1000)).toBe(true);
    expect(await poprosOOceneGdyPora(port, o, 'podsumowanie_lekcji', 2000)).toBe(false);
    expect(o.popros).toHaveBeenCalledTimes(1);
  });
  it('poniżej progu albo bez obsługi w systemie → bez prośby i bez zapisu', async () => {
    const { port } = await portTestowy();
    await prace(port, KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY - 1);
    const o = ocena();
    expect(await poprosOOceneGdyPora(port, o, 'podsumowanie_sesji', 1000)).toBe(false);
    const { port: p2 } = await portTestowy();
    await prace(p2, KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY);
    const brak = ocena(false);
    expect(await poprosOOceneGdyPora(p2, brak, 'podsumowanie_sesji', 1000)).toBe(false);
    expect(brak.popros).not.toHaveBeenCalled();
    expect(await poprosOOceneGdyPora(p2, ocena(), 'podsumowanie_sesji', 1001)).toBe(true); // nic nie zapisano przy braku obsługi
  });
  it('błąd systemu → false, bez wyjątku', async () => {
    const { port } = await portTestowy();
    await prace(port, KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY);
    const o: PortOceny = { dostepna: async () => true, popros: async () => { throw new Error('StoreKit'); } };
    await expect(poprosOOceneGdyPora(port, o, 'podsumowanie_lekcji', 1000)).resolves.toBe(false);
  });
});
