/// <reference types="jest" />
// Testy oczekujące opinii i zgłoszeń (rola 07 E3, D-187; R-51; BR-OPIN-002, BR-OPIN-003, NFR-PRYW-001, NFR-DOST-002).
// Aplikacja niczego nie wysyła sama: jedyne wyjście to otworzAdres (Linking.openURL); K-07 pilnuje braku fetch/XMLHttpRequest.
import '@/i18n';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { SekcjaOpinii, ZglosBlad } from '@/features/opinie/Opinie';
import { NAZWY } from '@/test-utils/ekrany/teksty';
import { elementyBezRoliLubNazwy, tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const ADRES = 'kontakt@example.org'; // atrapa: adres kontaktowy [DO USTALENIA] (rola 10)
const ID = '0000000000'; // atrapa: App Store ID [DO USTALENIA] (rola 10)

describe('BR-OPIN-002 ustawienia', () => {
  it('AK-BR-OPIN-002-a: „Oceń w sklepie” otwiera stronę aplikacji w App Store z action=write-review', async () => {
    const otworzAdres = jest.fn(async (_url: string) => true);
    await render(<SekcjaOpinii idAplikacjiSklepu={ID} adresKontaktowy={ADRES} otworzAdres={otworzAdres} />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.ocenWSklepie }));
    expect(otworzAdres).toHaveBeenCalledTimes(1);
    const url = new URL(otworzAdres.mock.calls[0]![0]);
    expect(url.protocol).toBe('https:');
    expect(url.host).toBe('apps.apple.com');
    expect(url.pathname).toContain(`id${ID}`);
    expect(url.searchParams.get('action')).toBe('write-review');
  });

  it('AK-BR-OPIN-002-b: „Napisz do nas” otwiera nową wiadomość (mailto) na adres kontaktowy', async () => {
    const otworzAdres = jest.fn(async (_url: string) => true);
    await render(<SekcjaOpinii idAplikacjiSklepu={ID} adresKontaktowy={ADRES} otworzAdres={otworzAdres} />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.napiszDoNas }));
    expect(otworzAdres).toHaveBeenCalledTimes(1);
    expect(otworzAdres.mock.calls[0]![0]).toMatch(new RegExp(`^mailto:${ADRES.replace(/\./g, '\\.')}(\\?|$)`));
  });

  const nieOtwiera: [string, (url: string) => Promise<boolean>][] = [
    ['false', async () => false],
    ['wyjątek', async () => Promise.reject(new Error('brak poczty'))],
  ];
  it.each(nieOtwiera)(
    'AK-BR-OPIN-002-c: brak programu pocztowego (%s) — adres kontaktowy widoczny do skopiowania',
    async (_opis, odp) => {
      await render(<SekcjaOpinii idAplikacjiSklepu={ID} adresKontaktowy={ADRES} otworzAdres={jest.fn(odp)} />);
      await fireEvent.press(screen.getByRole('button', { name: NAZWY.napiszDoNas }));
      await waitFor(() => expect(screen.getByText(new RegExp(ADRES.replace(/\./g, '\\.')))).toBeTruthy());
      expect(screen.getByText(new RegExp(ADRES.replace(/\./g, '\\.'))).props.selectable).toBe(true);
    },
  );
});

describe('BR-OPIN-003 zgłoszenie błędu w zadaniu', () => {
  it('AK-BR-OPIN-003-a: wiadomość z identyfikatorem zadania, wersją aplikacji i językiem w treści', async () => {
    const otworzAdres = jest.fn(async (_url: string) => true);
    await render(<ZglosBlad zadanieId="m2.exam.q2" wersjaAplikacji="1.0.0 (1009)" jezyk="pt-BR" adresKontaktowy={ADRES} otworzAdres={otworzAdres} />);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.zglosBlad }));
    expect(otworzAdres).toHaveBeenCalledTimes(1);
    const url = otworzAdres.mock.calls[0]![0];
    expect(url.startsWith(`mailto:${ADRES}`)).toBe(true);
    const tresc = decodeURIComponent(url);
    for (const x of ['m2.exam.q2', '1.0.0 (1009)', 'pt-BR']) expect(tresc).toContain(x);
  });

  it('AK-NFR-DOST-002-opinie: każdy element dotykowy ma rolę i nazwę', async () => {
    await render(<SekcjaOpinii idAplikacjiSklepu={ID} adresKontaktowy={ADRES} otworzAdres={jest.fn(async (_url: string) => true)} />);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
    await screen.unmount();
    await render(<ZglosBlad zadanieId="m2.exam.q2" wersjaAplikacji="1.0.0" jezyk="pl" adresKontaktowy={ADRES} otworzAdres={jest.fn(async (_url: string) => true)} />);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});
