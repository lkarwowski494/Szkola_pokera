/// <reference types="jest" />
// Ustawienia aplikacji w `ustawienie` (dane.md, tabela „F-11, F-16, F-17, F-14”: klucze `przypomnienie`, `opinie`,
// `ostatni_eksport`; rola 08 cz. 5b krok 5). Brak wiersza → wartość domyślna preferencji z modułu konfiguracji
// (przypomnienie wyłączone o PRZYPOMNIENIE_DOMYSLNA_PORA, D-252); brak eksportu zostaje brakiem (null).
import { KONFIGURACJA } from '@szkola/domena';
import { odczytajUstawienie, porzucAktywnosc, zacznijAktywnosc, zakonczAktywnosc, zapiszUstawienie, type PortBazy } from '@szkola/postep';
import {
  czytajJezyk,
  czytajOstatniEksport,
  czytajPrzypomnienie,
  zapiszJezyk,
  czyPoprosicOOcene,
  czySubskrypcjaAktywna,
  zapiszOstatniEksport,
  zapiszProsbeOOcene,
  zapiszPrzypomnienie,
} from '@/features/ustawienia/ustawieniaAplikacji';
import { portTestowy } from '@/test-utils/postepTestowy';

const DZIEN = 86_400_000;
const zepsuty = (port: PortBazy): PortBazy => ({ ...port, all: async () => { throw new Error('io'); } });

let n = 0;
async function zakonczona(port: PortBazy, rodzaj: 'lekcja' | 'sesja' | 'powtorki' | 'test_modulu' | 'ocena_poziomu', stan: 'zakonczona' | 'porzucona' = 'zakonczona') {
  n += 1;
  const id = `a${n}`;
  const z = await zacznijAktywnosc(port, id, {
    stan: 'w_toku', rodzaj, zLimitu: false, dzienLokalny: '2026-11-08', strefa: 'Europe/Warsaw', startMs: n,
    plan: { liczbaKrokow: 1, trescId: null }, krok: 0,
  });
  expect(z.ok).toBe(true);
  const k = stan === 'zakonczona' ? await zakonczAktywnosc(port, id, n + 1) : await porzucAktywnosc(port, id, n + 1);
  expect(k.ok).toBe(true);
}

describe('przypomnienie (klucz `przypomnienie`, ADR 0012 pkt 1, D-252)', () => {
  it('brak zapisu → wyłączone o domyślnej porze z konfiguracji', async () => {
    const { port } = await portTestowy();
    expect(await czytajPrzypomnienie(port)).toEqual({ ok: true, wartosc: { wlaczone: false, ...KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA } });
  });
  it('zapis i odczyt; inne klucze nietknięte', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'haptyka', false, 1);
    expect((await zapiszPrzypomnienie(port, { wlaczone: true, godzina: 19, minuta: 30 }, 5)).ok).toBe(true);
    expect(await czytajPrzypomnienie(port)).toEqual({ ok: true, wartosc: { wlaczone: true, godzina: 19, minuta: 30 } });
    expect(await odczytajUstawienie(port, 'haptyka')).toEqual({ ok: true, wartosc: false });
  });
  it('wartość o złym kształcie (np. z importu) → wyłączone o domyślnej porze, nie zgadnięta pora', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'przypomnienie', { wlaczone: 'tak', godzina: 7 }, 1);
    expect(await czytajPrzypomnienie(port)).toEqual({ ok: true, wartosc: { wlaczone: false, ...KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA } });
  });
  it('błąd odczytu → odczyt_nieudany (nie udaje braku)', async () => {
    const { port } = await portTestowy();
    expect(await czytajPrzypomnienie(zepsuty(port))).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('ostatni eksport (klucz `ostatni_eksport`, BR-DANE-001)', () => {
  it('brak → null; zapis → ms', async () => {
    const { port } = await portTestowy();
    expect(await czytajOstatniEksport(port)).toEqual({ ok: true, wartosc: null });
    await zapiszOstatniEksport(port, 1_700_000_000_000);
    expect(await czytajOstatniEksport(port)).toEqual({ ok: true, wartosc: 1_700_000_000_000 });
  });
  it('wartość nieliczbowa → null (brak zostaje brakiem, bez 0)', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'ostatni_eksport', 'wczoraj', 1);
    expect(await czytajOstatniEksport(port)).toEqual({ ok: true, wartosc: null });
  });
});

describe('prośba o ocenę (klucz `opinie`, BR-OPIN-001, D-110)', () => {
  it('za mało skończonych prac → nie; od progu → tak; liczą się tylko zakończone lekcje, sesje i powtórki', async () => {
    const { port } = await portTestowy();
    await zakonczona(port, 'test_modulu');
    await zakonczona(port, 'ocena_poziomu');
    await zakonczona(port, 'sesja', 'porzucona');
    for (let i = 1; i < KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY; i++) await zakonczona(port, i % 2 ? 'lekcja' : 'powtorki');
    expect(await czyPoprosicOOcene(port, 'podsumowanie_sesji', 10 * DZIEN)).toEqual({ ok: true, wartosc: false });
    await zakonczona(port, 'sesja');
    expect(await czyPoprosicOOcene(port, 'podsumowanie_sesji', 10 * DZIEN)).toEqual({ ok: true, wartosc: true });
    expect(await czyPoprosicOOcene(port, 'zadanie', 10 * DZIEN)).toEqual({ ok: true, wartosc: false });
  });
  it('po prośbie: odstęp PROSBA_O_OCENE_ODSTEP_DNI od zapisanej chwili', async () => {
    const { port } = await portTestowy();
    for (let i = 0; i < KONFIGURACJA.PROSBA_O_OCENE_OD_PRACY; i++) await zakonczona(port, 'lekcja');
    const t0 = 100 * DZIEN;
    await zapiszProsbeOOcene(port, t0);
    const odstep = KONFIGURACJA.PROSBA_O_OCENE_ODSTEP_DNI * DZIEN;
    expect(await czyPoprosicOOcene(port, 'podsumowanie_lekcji', t0 + odstep - 1)).toEqual({ ok: true, wartosc: false });
    expect(await czyPoprosicOOcene(port, 'podsumowanie_lekcji', t0 + odstep)).toEqual({ ok: true, wartosc: true });
  });
  it('błąd odczytu → odczyt_nieudany (bez prośby)', async () => {
    const { port } = await portTestowy();
    expect(await czyPoprosicOOcene(zepsuty(port), 'podsumowanie_sesji', 1)).toEqual({ ok: false, powod: 'odczyt_nieudany' });
  });
});

describe('język (klucz `jezyk`, ADR 0014 pkt 3, D-132)', () => {
  it('brak → auto; zapis konkretnego języka', async () => {
    const { port } = await portTestowy();
    expect(await czytajJezyk(port)).toEqual({ ok: true, wartosc: 'auto' });
    await zapiszJezyk(port, 'pl', 1);
    expect(await czytajJezyk(port)).toEqual({ ok: true, wartosc: 'pl' });
    await zapiszJezyk(port, 'auto', 2);
    expect(await czytajJezyk(port)).toEqual({ ok: true, wartosc: 'auto' });
  });
  it('kod spoza rejestru języków → auto', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'jezyk', 'xx', 1);
    expect(await czytajJezyk(port)).toEqual({ ok: true, wartosc: 'auto' });
  });
});

describe('czySubskrypcjaAktywna (BR-ZAK-004: „Zarządzaj subskrypcją” tylko przy subskrypcji)', () => {
  it('produkt z datą wygaśnięcia w przyszłości → tak; dożywotni, wygasły, brak pamięci → nie', () => {
    expect(czySubskrypcjaAktywna({ produkty: [{ produkt: 'rok', wygasaMs: 2000 }], odczytanoMs: 1 }, 1000)).toBe(true);
    expect(czySubskrypcjaAktywna({ produkty: [{ produkt: 'rok', wygasaMs: 1000 }], odczytanoMs: 1 }, 1000)).toBe(false);
    expect(czySubskrypcjaAktywna({ produkty: [{ produkt: 'dozywotni', wygasaMs: null }], odczytanoMs: 1 }, 1000)).toBe(false);
    expect(czySubskrypcjaAktywna(null, 1000)).toBe(false);
  });
});
