/// <reference types="jest" />
// Testy oczekujące startu aktywności z limitem (rola 07 E3, D-187; R-42; BR-LIM-001, BR-LIM-004, NFR-DOST-002).
// Wartość limitu pochodzi z KONFIGURACJA (D-107), nie z testu. Logika limitu (strefy, północ) — tests/akceptacja/domena/limit.test.ts;
// brak licznika w trakcie aktywności i dokończenie po północy (BR-LIM-002) — maszyny i E2E 05.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { KONFIGURACJA } from '../../../packages/domena/src/konfiguracja';
import EkranStartu, { type LimitEkranu, type PropsEkranuStartu } from '@/features/start/EkranStartu';
import { NAZWY, ZNACZENIA } from './teksty';
import { elementyBezRoliLubNazwy, tekstEkranu } from './wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const N = KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE;
const STREFA = 'Europe/Warsaw';
const PELNY: LimitEkranu = { bezLimitu: false, pozostalo: N, odnowienieMs: Date.UTC(2026, 10, 7, 23, 0) };
const ZERO: LimitEkranu = { bezLimitu: false, pozostalo: 0, odnowienieMs: Date.UTC(2026, 10, 7, 23, 0) }; // północ w Warszawie (CET, UTC+1)
const RODZAJE = ['sesja', 'powtorki', 'scenariusz', 'test_modulu'] as const;

async function wyrenderuj(rodzaj: PropsEkranuStartu['rodzaj'], limit: LimitEkranu, zaleglePowtorki?: number) {
  const props: PropsEkranuStartu = { rodzaj, limit, strefa: STREFA, zaleglePowtorki, onStart: jest.fn(), onLimitWyczerpany: jest.fn(), onWrocDoLekcji: jest.fn() };
  await render(<EkranStartu {...props} />);
  return props;
}

describe('BR-LIM-001 licznik przed startem', () => {
  it.each(RODZAJE)('AK-BR-LIM-001-a: %s — przed startem licznik z KONFIGURACJA.LIMIT_AKTYWNOSCI_DZIENNIE; „Zacznij” startuje', async (rodzaj) => {
    const props = await wyrenderuj(rodzaj, PELNY);
    expect(tekstEkranu()).toMatch(ZNACZENIA.licznik(N));
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.zacznij }));
    expect(props.onStart).toHaveBeenCalledTimes(1);
    expect(props.onLimitWyczerpany).not.toHaveBeenCalled();
  });

  it.each(RODZAJE)('AK-BR-LIM-001-b: %s po innej aktywności dziś — 0 darmowych i godzina odnowienia (jeden wspólny limit)', async (rodzaj) => {
    await wyrenderuj(rodzaj, ZERO);
    expect(tekstEkranu()).toMatch(ZNACZENIA.licznik(0));
    expect(tekstEkranu()).toMatch(ZNACZENIA.odnowienie);
  });

  it.each(RODZAJE)('AK-BR-LIM-001-c: %s przy wyczerpanym limicie — „Zacznij” nie startuje, tylko przechodzi do stanu zakupu; „Wróć do lekcji” jednym ruchem', async (rodzaj) => {
    const props = await wyrenderuj(rodzaj, ZERO);
    const zacznij = screen.queryAllByRole('button', { name: NAZWY.zacznij });
    for (const z of zacznij) await fireEvent.press(z);
    expect(props.onStart).not.toHaveBeenCalled();
    if (zacznij.length) expect(props.onLimitWyczerpany).toHaveBeenCalled();
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.wrocDoLekcji }));
    expect(props.onWrocDoLekcji).toHaveBeenCalledTimes(1);
  });

  it.each(RODZAJE)('AK-BR-LIM-001-d: %s z Pro — bez licznika, start bez ograniczeń', async (rodzaj) => {
    const props = await wyrenderuj(rodzaj, { bezLimitu: true });
    expect(tekstEkranu()).not.toMatch(ZNACZENIA.licznikDowolny);
    await fireEvent.press(screen.getByRole('button', { name: NAZWY.zacznij }));
    expect(props.onStart).toHaveBeenCalledTimes(1);
  });
});

describe('BR-LIM-004 powtórki czekają', () => {
  it('AK-BR-LIM-004-a: zaległe powtórki przy wyczerpanym limicie — komunikat, że poczekają i nic nie przepadnie', async () => {
    await wyrenderuj('powtorki', ZERO, 12);
    expect(tekstEkranu()).toMatch(ZNACZENIA.powtorkiPoczekaja);
    expect(tekstEkranu()).toMatch(ZNACZENIA.nicNieUtracone);
  });
});

describe('NFR-DOST-002 start', () => {
  it.each([PELNY, ZERO, { bezLimitu: true } as const])('AK-NFR-DOST-002-start: każdy element dotykowy ma rolę i nazwę (%o)', async (limit) => {
    await wyrenderuj('sesja', limit);
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});
