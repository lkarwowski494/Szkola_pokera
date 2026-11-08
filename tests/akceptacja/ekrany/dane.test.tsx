/// <reference types="jest" />
// Testy oczekujące ekranu danych (rola 07 E3, D-187; R-13, R-42; BR-DANE-001, BR-DANE-002, BR-LIM-003, NFR-DOST-002).
// Skutek w bazie (rezygnacja = 0 zmian, błędny plik = dane bez zmian) — tests/akceptacja/postep/k11-dane.test.ts i maszyna `import`;
// tu ekran: ostrzeżenie przed zastąpieniem i to, że zapis nie rusza bez potwierdzenia. Ekran nie dostaje limitu ani
// stanu zakupu, więc działa przy wyczerpanym limicie i bez Pro z konstrukcji (BR-LIM-003-b).
import '@/i18n';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert, type AlertButton } from 'react-native';
import EkranDanych, { type DaneEkranu } from '@/features/dane/EkranDanych';
import { NAZWY, ZNACZENIA } from '@/test-utils/ekrany/teksty';
import { elementyBezRoliLubNazwy, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

function atrapaDanych(z: Partial<DaneEkranu> = {}): DaneEkranu & { [K in 'eksportuj' | 'wybierzIZwaliduj' | 'zapiszImport']: jest.Mock } {
  return {
    maPostep: true,
    ostatniEksportMs: null,
    eksportuj: jest.fn(async () => 'zapisano' as const),
    wybierzIZwaliduj: jest.fn(async () => ({ ok: true }) as const),
    zapiszImport: jest.fn(async () => 'gotowe' as const),
    ...z,
  } as never;
}

let alert: jest.SpyInstance;
beforeEach(() => {
  alert = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
});
afterEach(() => alert.mockRestore());

describe('BR-DANE-001 eksport', () => {
  it('AK-BR-DANE-001-a: „Eksportuj postęp” bez zakupu tworzy jeden plik (jedno wywołanie eksportu)', async () => {
    const dane = atrapaDanych();
    await render(<EkranDanych dane={dane} strefa="America/New_York" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.eksportuj }));
    await waitFor(() => expect(dane.eksportuj).toHaveBeenCalledTimes(1));
  });

  it('AK-BR-DANE-001-b: data ostatniego eksportu widoczna (dzień miesiąca w strefie telefonu)', async () => {
    // 2026-11-07 02:30 UTC = 6 listopada wieczorem w Nowym Jorku: data w strefie telefonu, nie UTC
    const ms = Date.UTC(2026, 10, 7, 2, 30);
    const dzien = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', day: 'numeric' }).format(ms);
    await render(<EkranDanych dane={atrapaDanych({ ostatniEksportMs: ms })} strefa="America/New_York" />);
    const tekst = tekstEkranu();
    expect(tekst).toMatch(ZNACZENIA.ostatniEksport);
    expect(tekst).toMatch(new RegExp(`\\b${dzien}\\b`));
    expect(tekst).not.toMatch(/\b7\b/);
  });
});

describe('BR-DANE-002 import', () => {
  function przyciskiAlertu() {
    expect(alert).toHaveBeenCalledTimes(1);
    const [tytul, tresc, przyciski = []] = alert.mock.calls[0] as [string, string | undefined, AlertButton[] | undefined];
    expect(`${tytul} ${tresc ?? ''}`).toMatch(ZNACZENIA.zastapienie);
    const anuluj = przyciski.find((b) => b.style === 'cancel');
    const potwierdz = przyciski.find((b) => b.style !== 'cancel' && ZNACZENIA.potwierdzImport.test(b.text ?? ''));
    expect(anuluj).toBeDefined();
    expect(potwierdz).toBeDefined();
    return { anuluj: anuluj!, potwierdz: potwierdz! };
  }

  it('AK-BR-DANE-002-b: przy istniejącym postępie ostrzeżenie o zastąpieniu; rezygnacja — zapis nie rusza', async () => {
    const dane = atrapaDanych({ maPostep: true });
    await render(<EkranDanych dane={dane} strefa="Europe/Warsaw" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.importuj }));
    await waitFor(() => expect(alert).toHaveBeenCalled());
    expect(dane.zapiszImport).not.toHaveBeenCalled();
    przyciskiAlertu().anuluj.onPress?.();
    await new Promise((r) => setImmediate(r));
    expect(dane.zapiszImport).not.toHaveBeenCalled();
  });

  it('AK-BR-DANE-002-b2: po potwierdzeniu zapis dokładnie raz', async () => {
    const dane = atrapaDanych({ maPostep: true });
    await render(<EkranDanych dane={dane} strefa="Europe/Warsaw" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.importuj }));
    await waitFor(() => expect(alert).toHaveBeenCalled());
    przyciskiAlertu().potwierdz.onPress?.();
    await waitFor(() => expect(dane.zapiszImport).toHaveBeenCalledTimes(1));
  });

  it('AK-BR-DANE-002-a-ekran: czysta instalacja — bez ostrzeżenia, zapis po walidacji', async () => {
    const dane = atrapaDanych({ maPostep: false });
    await render(<EkranDanych dane={dane} strefa="Europe/Warsaw" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.importuj }));
    await waitFor(() => expect(dane.zapiszImport).toHaveBeenCalledTimes(1));
    expect(alert).not.toHaveBeenCalled();
  });

  it.each([
    ['bledny_plik', 'AK-BR-DANE-002-c', ZNACZENIA.blednyPlik],
    ['nowsza_wersja', 'AK-BR-DANE-002-d', ZNACZENIA.nowszaWersja],
  ] as const)('%s (%s): komunikat i bez zapisu, bez ostrzeżenia o zastąpieniu', async (powod, _id, wzorzec) => {
    const dane = atrapaDanych({ maPostep: true, wybierzIZwaliduj: jest.fn(async () => ({ ok: false, powod }) as const) });
    await render(<EkranDanych dane={dane} strefa="Europe/Warsaw" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.importuj }));
    await waitFor(() => expect(tekstEkranu()).toMatch(wzorzec));
    expect(dane.zapiszImport).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
  });

  it('AK-BR-DANE-002-anulowano: rezygnacja z wyboru pliku — bez komunikatu błędu i bez zapisu', async () => {
    const dane = atrapaDanych({ wybierzIZwaliduj: jest.fn(async () => ({ ok: false, powod: 'anulowano' }) as const) });
    await render(<EkranDanych dane={dane} strefa="Europe/Warsaw" />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.importuj }));
    await waitFor(() => expect(dane.wybierzIZwaliduj).toHaveBeenCalledTimes(1));
    expect(tekstEkranu()).not.toMatch(ZNACZENIA.blednyPlik);
    expect(dane.zapiszImport).not.toHaveBeenCalled();
  });
});

describe('NFR-DOST-002 dane', () => {
  it('AK-NFR-DOST-002-dane: każdy element dotykowy ma rolę i nazwę', async () => {
    await render(<EkranDanych dane={atrapaDanych({ ostatniEksportMs: Date.UTC(2026, 10, 1) })} strefa="Europe/Warsaw" />);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});
