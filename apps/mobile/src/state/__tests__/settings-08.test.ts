/// <reference types="jest" />
// Ustawienia interfejsu w `ustawienie` (D-251; rola 08 cz. 5): klucze `cztery_kolory`, `haptyka`; brak → wartość domyślna
// preferencji; nieudany zapis → przełącznik wraca do poprzedniej wartości (widoczny skutek) i wpis w dzienniku.
jest.mock('expo-constants', () => ({ __esModule: true, default: { expoConfig: { version: '1.0.0' } } }));
import { odczytajUstawienie, zapiszUstawienie } from '@szkola/postep';
import { useSettings } from '@/state/settings';
import { portTestowy } from '@/test-utils/postepTestowy';

beforeEach(() => useSettings.setState({ loaded: false, fourColor: false, haptics: true }));

describe('ustawienia interfejsu (D-251)', () => {
  it('brak zapisów → domyślne (cztery kolory wył., haptyka wł.)', async () => {
    const { port } = await portTestowy();
    await useSettings.getState().load(port);
    expect(useSettings.getState()).toMatchObject({ loaded: true, fourColor: false, haptics: true });
  });
  it('odczyt zapisanych wartości; zmiana zapisuje klucz JSON boolean', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'haptyka', false, 1);
    await useSettings.getState().load(port);
    expect(useSettings.getState().haptics).toBe(false);
    await useSettings.getState().setFourColor(port, true);
    expect(useSettings.getState().fourColor).toBe(true);
    expect(await odczytajUstawienie(port, 'cztery_kolory')).toEqual({ ok: true, wartosc: true });
  });
  it('nieudany zapis → wartość wraca do poprzedniej', async () => {
    const { port } = await portTestowy();
    await useSettings.getState().load(port);
    const zepsuty = { ...port, run: async () => { throw Object.assign(new Error('io'), { errcode: 10 }); } };
    await useSettings.getState().setHaptics(zepsuty, false);
    expect(useSettings.getState().haptics).toBe(true);
  });
  it('zapisana wartość innego typu niż boolean → domyślna (preferencja interfejsu)', async () => {
    const { port } = await portTestowy();
    await zapiszUstawienie(port, 'cztery_kolory', 'tak', 1);
    await useSettings.getState().load(port);
    expect(useSettings.getState().fourColor).toBe(false);
  });
});
