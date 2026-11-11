/// <reference types="jest" />
// CN: ekran scenariusza dla punktów cbet-case, size-spot i icm-call (08-programista-001 CM): akcje własne dla punktu (nazwy z kluczy `play.*`),
// brak puli i „Liczb” tam, gdzie wariant ich nie ma, wyjaśnienia z szablonu bez surowych znaczników, rozdanie kończy każda akcja.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { generateVariant } from '@szkola/poker-core';
import type { ScenarioTemplate } from '@szkola/content-schema';
import { getKontekstGeneratora } from '@/data/content/repo';
import { BEZ_LIMPU, CBET, dbCn, ICM, TROJBET } from '@/test-utils/kontekstCn';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';
import { PrzebiegScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, type Akcja } from '../wariant';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const sesja = (szablon: ScenarioTemplate, wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon, poziom: 'latwy', wariant: generateVariant(naGenerator(szablon), 'latwy', 5, getKontekstGeneratora(dbCn, szablon)), wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-11', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 1, trescId: szablon.id } },
});
const decyzja = async (szablon: ScenarioTemplate, onWybierz = jest.fn()) => {
  await render(<PrzebiegScenariusza sesja={sesja(szablon, [])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={onWybierz} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
  return onWybierz;
};
const ocena = async (szablon: ScenarioTemplate, wybor: Akcja) => {
  await render(<PrzebiegScenariusza sesja={sesja(szablon, [wybor])} faza="ocena" koniec bladZapisu={false} onWybierz={jest.fn()} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
};

describe('c-bet (cbet-case)', () => {
  it('trzy akcje (czekam, mały c-bet, duży c-bet), flop z kartami, bez puli i kwot', async () => {
    const onWybierz = await decyzja(CBET);
    expect(tekstEkranu()).not.toMatch(/W puli/);
    expect(screen.getByRole('button', { name: /^Czekanie/ })).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: /^Mały/ }));
    expect(onWybierz).toHaveBeenCalledWith('bet-small');
    await fireEvent.press(screen.getByRole('button', { name: /^Duży/ }));
    expect(onWybierz).toHaveBeenCalledWith('bet-big');
    await fireEvent.press(screen.getByRole('button', { name: /^Czekanie/ }));
    expect(onWybierz).toHaveBeenCalledWith('check');
  });
  it('ocena dopuszczalna (CR WYS-002: rzadsza akcja c-betu to nie błąd): słabsze i lepsze z szablonu, bez „Liczb” (tylko draw-call), pasek ocen trzech akcji', async () => {
    await ocena(CBET, 'check');
    const t = tekstEkranu();
    expect(t).toMatch(/Ocena: Dopuszczalna/);
    expect(t).not.toMatch(/Błąd/);
    expect(t).toMatch(/Wyjaśnienie akcji check/);
    expect(t).toMatch(/Wyjaśnienie akcji bet-small/);
    expect(t).not.toContain('{{w:');
    expect(screen.queryByTestId('liczby')).toBeNull();
    expect(screen.getByRole('image', { name: /Oceny akcji: .*Czekanie.*dopuszczalna.*twój wybór.*zgodna.*niedokładność/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Zobacz podsumowanie' })).toBeTruthy();
  });
  it('ocena zgodna: „dlaczego nie” dla każdej z dwóch pozostałych akcji', async () => {
    await ocena(CBET, 'bet-small');
    expect(tekstEkranu()).toMatch(/Zgodna/);
    expect(screen.getAllByTestId('dlaczego-nie')).toHaveLength(2);
  });
});

describe('rozmiar (size-spot)', () => {
  it('3-bet: trzy rozmiary „Przebicie do N bb”, ruch rywala (otwarcie) w dzienniku, bez puli', async () => {
    const onWybierz = await decyzja(TROJBET);
    expect(tekstEkranu()).not.toMatch(/W puli/);
    expect(tekstEkranu()).toMatch(/CO: przebicie.*do 2.5 bb/);
    const przyciski = screen.getAllByRole('button', { name: /^3-bet[\s\S]*do/ });
    expect(przyciski).toHaveLength(3);
    await fireEvent.press(przyciski[1]!);
    expect(onWybierz).toHaveBeenCalledWith('raise');
  });
  it('bez limpu (SB): limp jako dopłata 0,5 bb i przebicie; bez wpisu rywala przed twoim ruchem', async () => {
    const onWybierz = await decyzja(BEZ_LIMPU);
    await fireEvent.press(screen.getByRole('button', { name: /^Limp[\s\S]*0[.,]5\sbb/ }));
    expect(onWybierz).toHaveBeenCalledWith('limp');
    expect(screen.getAllByRole('button', { name: /^Przebicie[\s\S]*do/ })).toHaveLength(1);
  });
});

describe('ICM (icm-call)', () => {
  it('pas i sprawdzenie all-inu: pula i dopłata z stosu, all-in rywala w dzienniku, karty tylko ręka (przed flopem)', async () => {
    const onWybierz = await decyzja(ICM);
    expect(tekstEkranu()).toMatch(/W puli[^·]*11 bb · do sprawdzenia[^·]*9 bb/);
    expect(tekstEkranu()).toMatch(/SB: all-in 10 bb/);
    await fireEvent.press(screen.getByRole('button', { name: /^Sprawdzenie[\s\S]*9\sbb/ }));
    expect(onWybierz).toHaveBeenCalledWith('call');
    await fireEvent.press(screen.getByRole('button', { name: /^Pas/ }));
    expect(onWybierz).toHaveBeenCalledWith('fold');
  });
  it('znacznik {{w:stol}} przed flopem to nazwa ulicy, nie pusta lista kart', async () => {
    await ocena(ICM, 'call');
    const t = tekstEkranu();
    expect(t).not.toContain('{{w:');
    expect(t).not.toMatch(/\[\[\s*\]\]/);
    expect(t).toMatch(/na stole preflop/);
  });
});
