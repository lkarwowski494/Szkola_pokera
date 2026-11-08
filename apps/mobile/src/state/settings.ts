import { create } from 'zustand';
import { odczytajUstawienie, zapiszUstawienie, type PortBazy } from '@szkola/postep';
import { zapiszBladPostepu } from '@/data/postep';

/**
 * Ustawienia interfejsu (D-251). Źródłem prawdy jest tabela `ustawienie` w postep.db (klucze `cztery_kolory`, `haptyka`,
 * JSON boolean); store to tylko kopia do renderowania. Brak albo wartość innego typu → wartość domyślna preferencji
 * (dozwolone tylko dla preferencji interfejsu). Nieudany zapis → wartość wraca do poprzedniej i wpis w dzienniku.
 */
const DOMYSLNE = { fourColor: false, haptics: true } as const;
const KLUCZE = { fourColor: 'cztery_kolory', haptics: 'haptyka' } as const;
type Pole = keyof typeof KLUCZE;

interface SettingsState {
  loaded: boolean;
  fourColor: boolean;
  haptics: boolean;
  load: (port: PortBazy) => Promise<void>;
  setFourColor: (port: PortBazy, v: boolean) => Promise<void>;
  setHaptics: (port: PortBazy, v: boolean) => Promise<void>;
}

async function czytaj(port: PortBazy, pole: Pole): Promise<boolean> {
  const w = await odczytajUstawienie(port, KLUCZE[pole]);
  if (!w.ok) zapiszBladPostepu(w.powod, 'ustawienia');
  return w.ok && typeof w.wartosc === 'boolean' ? w.wartosc : DOMYSLNE[pole];
}

export const useSettings = create<SettingsState>((set, get) => {
  const ustaw = async (port: PortBazy, pole: Pole, v: boolean) => {
    const przed = get()[pole];
    set({ [pole]: v });
    const w = await zapiszUstawienie(port, KLUCZE[pole], v, Date.now());
    if (!w.ok) {
      zapiszBladPostepu(w.powod, 'ustawienia');
      set({ [pole]: przed });
    }
  };
  return {
    loaded: false,
    ...DOMYSLNE,
    load: async (port) => {
      const [fourColor, haptics] = await Promise.all([czytaj(port, 'fourColor'), czytaj(port, 'haptics')]);
      set({ loaded: true, fourColor, haptics });
    },
    setFourColor: (port, v) => ustaw(port, 'fourColor', v),
    setHaptics: (port, v) => ustaw(port, 'haptics', v),
  };
});
