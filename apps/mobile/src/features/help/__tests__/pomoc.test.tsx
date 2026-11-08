/// <reference types="jest" />
// Testy akceptacyjne ekranu „Pomoc” (rola 07 E3, D-187; R-33; BR-POM-001, BR-POM-002 według D-158 i D-167:
// jedno zdanie `fallback.text` i jeden link z `fallback.online`, bez numerów krajowych; wektory RD-12-W1–W6 nie są wyrocznią).
// Ekran istnieje (src/app/help.tsx), więc część testów to strażniki (zielone); rola 08 upraszcza ekran (D-160) i przenosi
// test do src/features/help/__tests__/. Wejście z lekcji M12 — flow E2E 04-pomoc.yaml; z ustawień — ustawienia.test.tsx.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HelpScreen from '@/app/help';
import { HELPLINES } from '@/data/content/helplines.generated';
import { elementyBezRoliLubNazwy, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
let mockRegion: string | null = 'US';
jest.mock('expo-localization', () => ({ getLocales: () => [{ languageTag: 'pl-PL', languageCode: 'pl', regionCode: mockRegion }] }));

// Wyrocznia z jednego źródła prawdy (content/helplines.yaml → helplines.generated.ts), nie kopia tekstu w teście.
const ZDANIE = HELPLINES.fallback.text;
const LINKI = HELPLINES.fallback.online.flatMap((id) => HELPLINES.entries.find((e) => e.id === id)?.links ?? []).map((l) => l.url);
const NUMER = /\+?\d[\d ()-]{5,}\d/; // ciąg wyglądający jak numer telefonu (≥ 7 cyfr i separatorów)

let openURL: jest.SpyInstance;
let fetchSpy: jest.SpyInstance | null;
beforeEach(() => {
  openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
  fetchSpy = typeof global.fetch === 'function' ? jest.spyOn(global, 'fetch') : null;
});
afterEach(() => {
  openURL.mockRestore();
  fetchSpy?.mockRestore();
});

describe('BR-POM-001 według D-158', () => {
  it('AK-BR-POM-001-zrodlo: plik pomocy ma dokładnie jeden link i zdanie ogólne (warunek wyroczni)', () => {
    expect(LINKI).toEqual(['https://www.gamblingtherapy.org/']);
    expect(ZDANIE.length).toBeGreaterThan(0);
  });

  it.each(['US', 'GB', 'JP', 'BR', 'DE', 'VN', null])('AK-BR-POM-001: region %s — zdanie ogólne raz, jeden link, żadnego numeru telefonu', async (region) => {
    mockRegion = region;
    await render(<HelpScreen />);
    expect(screen.getAllByText(ZDANIE)).toHaveLength(1);
    expect(tekstEkranu()).not.toMatch(NUMER);
    const linki = screen.queryAllByRole('link').concat(screen.queryAllByRole('button'));
    expect(linki).toHaveLength(1);
    await fireEvent.press(linki[0]!);
    expect(openURL).toHaveBeenCalledTimes(1);
    expect(openURL).toHaveBeenLastCalledWith(LINKI[0]);
  });
});

describe('BR-POM-002 według D-158', () => {
  it('AK-BR-POM-002-offline: ekran powstaje z treści lokalnej, bez żądania sieci', async () => {
    await render(<HelpScreen />);
    expect(screen.getAllByText(ZDANIE)).toHaveLength(1);
    if (fetchSpy) expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('AK-BR-POM-002-c: urządzenie nie otwiera adresu — adres widoczny jako tekst do przepisania', async () => {
    openURL.mockRejectedValueOnce(new Error('brak przeglądarki'));
    await render(<HelpScreen />);
    await fireEvent.press(screen.queryAllByRole('link').concat(screen.queryAllByRole('button'))[0]!);
    const host = new URL(LINKI[0]!).host.replace(/^www\./, '');
    expect(await screen.findAllByText(new RegExp(host.replace(/\./g, '\\.')))).not.toHaveLength(0);
  });

  it('AK-NFR-DOST-002-pomoc: każdy element dotykowy ma rolę i nazwę', async () => {
    await render(<HelpScreen />);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});
