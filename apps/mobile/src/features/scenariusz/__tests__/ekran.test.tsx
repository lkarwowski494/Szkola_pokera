/// <reference types="jest" />
// Ekran scenariusza (BT, krok F): start z przełącznikiem poziomu (BR-POZ-002), punkt decyzji, ocena „dlaczego dobrze / dlaczego źle”
// na pierwszym planie (BR-OCE-002, D-544), podsumowanie bez wygranej (BR-SCN-002), jednostki bb. Komponenty prezentacyjne.
import '@/i18n';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { generateVariant } from '@szkola/poker-core';
import { KoniecScenariusza, PrzebiegScenariusza, StartScenariusza } from '../EkranScenariusza';
import type { SesjaScenariusza } from '../aktywnoscScenariusza';
import { naGenerator, type Akcja } from '../wariant';
import { SC01 } from '@/test-utils/szablonSc01';
import { tekstEkranu } from '@/test-utils/ekrany/wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));

const wariant = generateVariant(naGenerator(SC01), 'sredni', 7);
const sesja = (wybory: Akcja[]): SesjaScenariusza => ({
  id: 's1', szablon: SC01, poziom: 'sredni', wariant, wybory,
  aktywnosc: { stan: 'w_toku', rodzaj: 'scenariusz', zLimitu: true, dzienLokalny: '2026-11-10', strefa: 'Europe/Warsaw', startMs: 0, krok: wybory.length, plan: { liczbaKrokow: 2, trescId: 'sc-01' } },
});
const zabronione = /wygran|żeton|\$|€|saldo/i;

describe('start (BR-POZ-002, BR-GEN-002)', () => {
  const props = (o = {}) => ({
    szablon: SC01, tytulModulu: 'Matematyka podstawowa', wybor: 'auto' as const, poziom: 'sredni' as const, zastapiony: false, limit: { bezLimitu: true as const },
    strefa: 'Europe/Warsaw', onWybierz: jest.fn(), onStart: jest.fn(), onLimitWyczerpany: jest.fn(), onWroc: jest.fn(), ...o,
  });
  it('„Automatycznie” zaznaczone i poziom opisany; wybór poziomu ręcznie wywołuje onWybierz', async () => {
    const p = props();
    await render(<StartScenariusza {...p} />);
    expect(screen.getByRole('radio', { name: 'Automatycznie' }).props.accessibilityState.checked).toBe(true);
    expect(tekstEkranu()).toMatch(/Teraz: średni/);
    await fireEvent.press(screen.getByRole('radio', { name: 'Trudny' }));
    expect(p.onWybierz).toHaveBeenCalledWith('trudny');
  });
  it('szablon bez poziomu trudnego: przełącznik go nie ma; wybór ręczny zastąpiony → komunikat', async () => {
    const bezTrudnego = { ...SC01, levels: ['latwy' as const, 'sredni' as const] };
    await render(<StartScenariusza {...props({ szablon: bezTrudnego, wybor: 'trudny', zastapiony: true })} />);
    expect(screen.queryByRole('radio', { name: 'Trudny' })).toBeNull();
    expect(tekstEkranu()).toMatch(/nie ma na poziomie „trudny”.*„średni”/);
  });
  it('„Zacznij rozdanie” startuje; głębokość w bb, bez wygranej i salda', async () => {
    const p = props();
    await render(<StartScenariusza {...p} />);
    expect(tekstEkranu()).toMatch(/Głębokość 100 bb/);
    expect(tekstEkranu()).not.toMatch(/żeton|\$|€|saldo/i); // zdanie „nie wygrana” jest w projekcie startu (D-545), więc „wygran” tu dozwolone
    await fireEvent.press(screen.getByRole('button', { name: 'Zacznij rozdanie' }));
    expect(p.onStart).toHaveBeenCalledTimes(1);
  });
  it('limit wyczerpany: zamiast startu „Pełny dostęp”; licznik dnia przy limicie', async () => {
    const p = props({ limit: { bezLimitu: false, pozostalo: 0, odnowienieMs: Date.UTC(2026, 10, 10, 23) } });
    await render(<StartScenariusza {...p} />);
    expect(screen.queryByRole('button', { name: 'Zacznij rozdanie' })).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Pełny dostęp' }));
    expect(p.onLimitWyczerpany).toHaveBeenCalled();
  });
});

describe('przebieg: decyzja', () => {
  it('pula i kwota w bb, dwie akcje (pas, sprawdzenie z kwotą), karty ustalone; bez wygranej', async () => {
    const onWybierz = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja([])} faza="decyzja" koniec={false} bladZapisu={false} onWybierz={onWybierz} onDalej={jest.fn()} onZakoncz={jest.fn()} />);
    const d = wariant.decisions[0]!;
    expect(tekstEkranu()).toContain(`W puli ${d.pot + d.bet} bb · do sprawdzenia ${d.bet} bb`);
    expect(tekstEkranu()).not.toMatch(zabronione);
    await fireEvent.press(screen.getByRole('button', { name: `Sprawdzenie ${d.bet} bb` }));
    expect(onWybierz).toHaveBeenCalledWith('call');
    await fireEvent.press(screen.getByRole('button', { name: 'Pas' }));
    expect(onWybierz).toHaveBeenCalledWith('fold');
  });
});

describe('przebieg: ocena (BR-OCE-002, D-544)', () => {
  const ocena = async (wybor: Akcja, koniec = false) => {
    const onDalej = jest.fn();
    await render(<PrzebiegScenariusza sesja={sesja([wybor])} faza="ocena" koniec={koniec} bladZapisu={false} onWybierz={jest.fn()} onDalej={onDalej} onZakoncz={jest.fn()} />);
    return onDalej;
  };
  it('błąd (pas, a poprawne sprawdzenie): werdykt, dwa wyjaśnienia (słabsze i lepsze) z kartami wariantu, pasek ocen, „Dalej: Turn”', async () => {
    const onDalej = await ocena('fold', true);
    expect(wariant.decisions[0]!.correct).toBe('call');
    const t = tekstEkranu();
    expect(t).toMatch(/Błąd/);
    expect(t).toMatch(/Dlaczego „Pas” to słabsze zagranie/);
    expect(t).toMatch(/Dlaczego „Sprawdzenie \d+ bb” to lepsze zagranie/);
    expect(t).not.toContain('{{w:');
    expect(screen.getByRole('image', { name: /Oceny akcji: .*twój wybór/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Zobacz podsumowanie' })).toBeTruthy(); // pas kończy rozdanie
    await fireEvent.press(screen.getByRole('button', { name: 'Zobacz podsumowanie' }));
    expect(onDalej).toHaveBeenCalled();
  });
  it('zgodne: „dlaczego dobrze” i zwinięte „Dlaczego nie …” (rozwijane, stan expanded)', async () => {
    await ocena('call');
    expect(tekstEkranu()).toMatch(/Zgodna/);
    expect(tekstEkranu()).toMatch(/Dlaczego „Sprawdzenie \d+ bb” to dobre zagranie/);
    const nie = screen.getByTestId('dlaczego-nie');
    expect(nie.props.accessibilityState.expanded).toBe(false);
    expect(tekstEkranu()).not.toMatch(/Pas oddaje pulę/);
    await fireEvent.press(nie);
    expect(screen.getByTestId('dlaczego-nie').props.accessibilityState.expanded).toBe(true);
    expect(tekstEkranu()).toMatch(/Pas oddaje pulę/);
    expect(screen.getByRole('button', { name: /Dalej: Turn/ })).toBeTruthy();
  });
  it('„Liczby” domyślnie zwinięte; po rozwinięciu każda liczba ma sens w zdaniu (potrzebujesz …, raz na …)', async () => {
    await ocena('call');
    expect(tekstEkranu()).not.toMatch(/outy|Outy/);
    await fireEvent.press(screen.getByTestId('liczby'));
    expect(tekstEkranu()).toMatch(/potrzebujesz .*% szans, czyli wygrać mniej więcej raz na \d+/);
    expect(tekstEkranu().match(/mniej więcej raz na \d+/g)).toHaveLength(2);
  });
});

describe('koniec (BR-SCN-002, BR-GEN-001)', () => {
  it('podsumowanie: decyzje z ocenami słowem, „Lepiej: …” przy błędzie, wynik jako dobre decyzje, bez wygranej; trzy przyciski', async () => {
    const p = { onNowe: jest.fn(), onPowtorz: jest.fn(), onZamknij: jest.fn() };
    await render(<KoniecScenariusza sesja={sesja(['fold'])} poziom="sredni" bladStartu={null} {...p} />);
    expect(tekstEkranu()).toMatch(/Rozdanie zakończone/);
    expect(tekstEkranu()).toMatch(/Błąd/);
    expect(tekstEkranu()).toMatch(/Lepiej: sprawdzenie\./);
    expect(tekstEkranu()).toMatch(/Dobre decyzje: 0 z 1/);
    expect(tekstEkranu()).not.toMatch(zabronione);
    await fireEvent.press(screen.getByRole('button', { name: 'Nowe rozdanie' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Zagraj to samo jeszcze raz' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Zamknij' }));
    expect(p.onNowe).toHaveBeenCalled();
    expect(p.onPowtorz).toHaveBeenCalled();
    expect(p.onZamknij).toHaveBeenCalled();
  });
  it('po sprawdzeniu ostatniej decyzji: zdanie o pokazaniu kart (układ wyższy / równy), bez „wygrałeś”', async () => {
    await render(<KoniecScenariusza sesja={sesja(['call', 'call'])} poziom="sredni" bladStartu={null} onNowe={jest.fn()} onPowtorz={jest.fn()} onZamknij={jest.fn()} />);
    expect(tekstEkranu()).toMatch(/Na riverze wychodzi .*Rywal pokazuje .*(wyższy|równe)/);
    expect(tekstEkranu()).not.toMatch(/wygrał|przegrał/i);
  });
});
