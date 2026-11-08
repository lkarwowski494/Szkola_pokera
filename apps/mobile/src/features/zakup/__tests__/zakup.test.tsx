/// <reference types="jest" />
// Testy oczekujące ekranu zakupu (rola 07 E3, D-187; R-47, R-48, R-49; BR-ZAK-001–003, NFR-DOST-002).
// Czerwone do implementacji: zaślepka apps/mobile/src/features/zakup/EkranZakupu.tsx rzuca „NIEZAIMPLEMENTOWANE”.
// Wyglądu (największy element ceny, kontrast, duży tekst) Jest nie sprawdza — lista „tylko telefon” T-05 (strategia.md §8).
import '@/i18n';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import EkranZakupu, { type PropsEkranuZakupu } from '@/features/zakup/EkranZakupu';
import { NAZWY, ZNACZENIA } from '@/test-utils/ekrany/teksty';
import { atrapaSklepu, elementyBezRoliLubNazwy, nazwaDostepna, PRODUKTY_US, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

async function wyrenderuj(atrapa = atrapaSklepu()) {
  const props: PropsEkranuZakupu = {
    sklep: atrapa.sklep,
    onDostep: jest.fn(),
    onZamknij: jest.fn(),
    onWrocDoLekcji: jest.fn(),
    otworzWarunki: jest.fn(),
    otworzPrywatnosc: jest.fn(),
  };
  await render(<EkranZakupu {...props} />);
  return { props, atrapa };
}

/** Przycisk planu: element o roli button, którego nazwa dla czytnika zawiera cenę ze sklepu. */
async function planZCena(cena: string) {
  const plany = await screen.findAllByRole('button', { name: new RegExp(cena.replace(/[.$]/g, (z) => `\\${z}`)) });
  expect(plany).toHaveLength(1);
  return plany[0]!;
}

describe('BR-ZAK-001 ekran zakupu', () => {
  it('AK-BR-ZAK-001-a: storefront US — co odblokowuje, trzy plany z ceną ze sklepu; kwartał i rok z okresem i odnawianiem, dożywotni jednorazowy', async () => {
    const { atrapa } = await wyrenderuj();
    const kwartal = nazwaDostepna(await planZCena('$9.99'));
    const rok = nazwaDostepna(await planZCena('$14.99'));
    const dozywotni = nazwaDostepna(await planZCena('$19.99'));
    expect(atrapa.wywolania.produkty).toBe(1);
    expect(kwartal).toMatch(ZNACZENIA.kwartal);
    expect(kwartal).toMatch(ZNACZENIA.odnawianie);
    expect(rok).toMatch(ZNACZENIA.rok);
    expect(rok).toMatch(ZNACZENIA.odnawianie);
    expect(dozywotni).toMatch(ZNACZENIA.jednorazowy);
    expect(dozywotni).not.toMatch(ZNACZENIA.odnawianie);
    expect(tekstEkranu()).toMatch(ZNACZENIA.coOdblokowuje);
    expect(tekstEkranu()).toMatch(ZNACZENIA.anulowanie); // „do czasu anulowania”
    // ujawnienia (monetyzacja.md:75): przywracanie, warunki i prywatność
    expect(screen.getByRole('button', { name: NAZWY.przywroc })).toBeTruthy();
    expect(screen.getByRole('link', { name: NAZWY.warunki })).toBeTruthy();
    expect(screen.getByRole('link', { name: NAZWY.prywatnosc })).toBeTruthy();
  });

  it('AK-BR-ZAK-001-b: ceny ze sklepu w walucie storefrontu, nie wpisane w kodzie', async () => {
    const obce = [
      { id: PRODUKTY_US[0]!.id, cena: '41,90 zł', okres: 'kwartal' as const },
      { id: PRODUKTY_US[1]!.id, cena: '¥2,300', okres: 'rok' as const },
      { id: PRODUKTY_US[2]!.id, cena: '17,49 €', okres: null },
    ];
    await wyrenderuj(atrapaSklepu({ ok: true, produkty: obce }));
    for (const p of obce) await planZCena(p.cena);
    expect(tekstEkranu()).not.toMatch(/9[.,]99|14[.,]99|19[.,]99|USD|\$/);
  });

  it('AK-BR-ZAK-001-c: plan roczny bez przeliczenia na miesiąc (nigdzie na ekranie)', async () => {
    await wyrenderuj();
    await planZCena('$14.99');
    expect(tekstEkranu()).not.toMatch(ZNACZENIA.przeliczenieNaMiesiac);
  });

  it('AK-BR-ZAK-001-d: odnośniki do warunków i prywatności oraz „Zamknij” i „Wróć do lekcji” wołają swoje akcje', async () => {
    const { props } = await wyrenderuj();
    await planZCena('$9.99');
    await fireEvent.press(screen.getByRole('link', { name: NAZWY.warunki }));
    await fireEvent.press(screen.getByRole('link', { name: NAZWY.prywatnosc }));
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.zamknij }));
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.wrocDoLekcji }));
    expect(props.otworzWarunki).toHaveBeenCalledTimes(1);
    expect(props.otworzPrywatnosc).toHaveBeenCalledTimes(1);
    expect(props.onZamknij).toHaveBeenCalledTimes(1);
    expect(props.onWrocDoLekcji).toHaveBeenCalledTimes(1);
  });
});

describe('BR-ZAK-002 zakup', () => {
  it('AK-BR-ZAK-002-a: udany zakup planu rocznego odblokowuje dostęp bez ponownego uruchomienia', async () => {
    const { props, atrapa } = await wyrenderuj();
    await fireEvent.press(await planZCena('$14.99'));
    expect(atrapa.wywolania.kup).toEqual([PRODUKTY_US[1]!.id]);
    expect(props.onDostep).toHaveBeenCalledTimes(1);
  });

  it('AK-BR-ZAK-002-b: anulowane okno płatności — bez dostępu, plany nadal widoczne', async () => {
    const atrapa = atrapaSklepu();
    atrapa.ustawKup('anulowany');
    const { props } = await wyrenderuj(atrapa);
    await fireEvent.press(await planZCena('$14.99'));
    expect(props.onDostep).not.toHaveBeenCalled();
    await planZCena('$14.99');
  });

  it('AK-BR-ZAK-002-c: brak sieci — komunikat i „Spróbuj ponownie” pobiera ceny jeszcze raz', async () => {
    const atrapa = atrapaSklepu({ ok: false, powod: 'brak_sieci' });
    await wyrenderuj(atrapa);
    expect(await screen.findByText(ZNACZENIA.brakCen)).toBeTruthy();
    expect(screen.queryAllByRole('button', { name: /\$/ })).toHaveLength(0);
    atrapa.ustawOdczyt({ ok: true, produkty: PRODUKTY_US });
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.sprobujPonownie }));
    await planZCena('$9.99');
    expect(atrapa.wywolania.produkty).toBe(2);
  });

  it('AK-BR-ZAK-002-d (R-48): drugie dotknięcie planu, zanim sklep odpowie na pierwsze, nie rozpoczyna drugiego zakupu', async () => {
    const atrapa = atrapaSklepu();
    const wstrzymany = atrapa.wstrzymajKup();
    const { props } = await wyrenderuj(atrapa);
    const plan = await planZCena('$14.99');
    await fireEvent.press(plan);
    await fireEvent.press(plan);
    await fireEvent.press(await planZCena('$9.99'));
    expect(atrapa.wywolania.kup).toHaveLength(1);
    expect(props.onDostep).not.toHaveBeenCalled();
    wstrzymany.rozwiaz('zakonczony');
    await waitFor(() => expect(props.onDostep).toHaveBeenCalledTimes(1));
    expect(atrapa.wywolania.kup).toHaveLength(1);
  });
});

describe('BR-ZAK-003 przywracanie', () => {
  it('AK-BR-ZAK-003-a: przywrócenie z zakupem odblokowuje dostęp', async () => {
    const { props, atrapa } = await wyrenderuj();
    await planZCena('$9.99');
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.przywroc }));
    expect(atrapa.wywolania.przywroc).toBe(1);
    expect(props.onDostep).toHaveBeenCalledTimes(1);
  });

  it('AK-BR-ZAK-003-b: brak zakupu do przywrócenia — komunikat, bez dostępu', async () => {
    const atrapa = atrapaSklepu();
    atrapa.ustawPrzywroc('brak_zakupow');
    const { props } = await wyrenderuj(atrapa);
    await planZCena('$9.99');
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.przywroc }));
    expect(await screen.findByText(ZNACZENIA.brakZakupow)).toBeTruthy();
    expect(props.onDostep).not.toHaveBeenCalled();
  });

  it('AK-BR-ZAK-003-c: „Przywróć zakupy” dostępne także bez cen (brak sieci)', async () => {
    await wyrenderuj(atrapaSklepu({ ok: false, powod: 'brak_sieci' }));
    await screen.findByText(ZNACZENIA.brakCen);
    expect(screen.getByRole('button', { name: NAZWY.przywroc })).toBeTruthy();
  });
});

describe('NFR-DOST-002 ekran zakupu', () => {
  it('AK-NFR-DOST-002-zakup: każdy element dotykowy ma rolę i nazwę (z cenami i bez sieci)', async () => {
    await wyrenderuj();
    await planZCena('$9.99');
    expect(elementyBezRoliLubNazwy()).toEqual([]);
    await screen.unmount();
    await wyrenderuj(atrapaSklepu({ ok: false, powod: 'brak_sieci' }));
    await screen.findByText(ZNACZENIA.brakCen);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});

