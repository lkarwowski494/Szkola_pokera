/// <reference types="jest" />
// Testy oczekujące ekranu ustawień (rola 07 E3, D-187; R-16, R-33, R-49; BR-ZAK-004, BR-ZAK-003, BR-POM-002, BR-DANE-003,
// NFR-DOST-002). Potwierdzenie „Usuń postęp” to systemowy Alert (design-spec.md, „Komponenty”: systemowe).
// Skutek w danych („Usuń postęp” czyści postęp, zostawia pamięć dostępu i zużycie dnia) — tests/akceptacja/postep/k11-dane.test.ts.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Alert, type AlertButton } from 'react-native';
import EkranUstawien, { type PropsEkranuUstawien } from '@/features/ustawienia/EkranUstawien';
import { NAZWY, ZNACZENIA } from '@/test-utils/ekrany/teksty';
import { elementyBezRoliLubNazwy } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

async function wyrenderuj(subskrypcjaAktywna = true) {
  const props: PropsEkranuUstawien = {
    subskrypcjaAktywna,
    otworzZarzadzanie: jest.fn(async () => undefined),
    onPrzywroc: jest.fn(),
    onPomoc: jest.fn(),
    usunPostep: jest.fn(async () => undefined),
  };
  await render(<EkranUstawien {...props} />);
  return { props };
}

let alert: jest.SpyInstance;
beforeEach(() => {
  alert = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
});
afterEach(() => alert.mockRestore());

/** Przyciski ostatniego Alertu: anulowanie (style 'cancel') i potwierdzenie (destrukcyjne, z „Usuń”). */
function przyciskiAlertu() {
  expect(alert).toHaveBeenCalledTimes(1);
  const przyciski = (alert.mock.calls[0]?.[2] ?? []) as AlertButton[];
  const anuluj = przyciski.find((b) => b.style === 'cancel');
  const potwierdz = przyciski.find((b) => b.style === 'destructive' && ZNACZENIA.potwierdzUsun.test(b.text ?? ''));
  expect(anuluj).toBeDefined();
  expect(potwierdz).toBeDefined();
  return { anuluj: anuluj!, potwierdz: potwierdz! };
}

describe('BR-ZAK-004 zarządzanie subskrypcją', () => {
  it('AK-BR-ZAK-004-a: aktywny plan kwartalny — „Zarządzaj subskrypcją” otwiera zarządzanie subskrypcjami sklepu', async () => {
    const { props } = await wyrenderuj(true);
    await fireEvent.press(await screen.findByRole('button', { name: NAZWY.zarzadzaj }));
    expect(props.otworzZarzadzanie).toHaveBeenCalledTimes(1);
  });
});

describe('BR-ZAK-003 i BR-POM-002 wejścia z ustawień', () => {
  it('AK-BR-ZAK-003-ustawienia: „Przywróć zakupy” jest w ustawieniach (design-spec.md, słownik interakcji)', async () => {
    const { props } = await wyrenderuj(false);
    await fireEvent.press(await screen.findByRole('button', { name: NAZWY.przywroc }));
    expect(props.onPrzywroc).toHaveBeenCalledTimes(1);
  });

  it.each([true, false])('AK-BR-POM-002-a: „Pomoc” z ustawień otwiera ekran Pomocy (subskrypcja aktywna: %s — bez zakupu też)', async (aktywna) => {
    const { props } = await wyrenderuj(aktywna);
    const pomoc = [...screen.queryAllByRole('button', { name: NAZWY.pomoc }), ...screen.queryAllByRole('link', { name: NAZWY.pomoc })];
    expect(pomoc).toHaveLength(1);
    await fireEvent.press(pomoc[0]!);
    expect(props.onPomoc).toHaveBeenCalledTimes(1);
  });
});

describe('BR-DANE-003 „Usuń postęp”', () => {
  it('AK-BR-DANE-003-b: rezygnacja w potwierdzeniu — usunPostep nie jest wołane (postęp bez zmian)', async () => {
    const { props } = await wyrenderuj();
    await fireEvent.press(await screen.findByRole('button', { name: NAZWY.usunPostep }));
    expect(props.usunPostep).not.toHaveBeenCalled(); // samo dotknięcie nie usuwa
    przyciskiAlertu().anuluj.onPress?.();
    expect(props.usunPostep).not.toHaveBeenCalled();
  });

  it('AK-BR-DANE-003-a: potwierdzenie — usunPostep wołane dokładnie raz', async () => {
    const { props } = await wyrenderuj();
    await fireEvent.press(await screen.findByRole('button', { name: NAZWY.usunPostep }));
    przyciskiAlertu().potwierdz.onPress?.();
    expect(props.usunPostep).toHaveBeenCalledTimes(1);
  });
});

describe('NFR-DOST-002 ustawienia', () => {
  it.each([true, false])('AK-NFR-DOST-002-ustawienia: każdy element dotykowy ma rolę i nazwę (subskrypcja aktywna: %s)', async (aktywna) => {
    await wyrenderuj(aktywna);
    await screen.findByRole('button', { name: NAZWY.usunPostep });
    expect(elementyBezRoliLubNazwy()).toEqual([]);
  });
});
