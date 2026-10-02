import { create } from 'zustand';
import { userDb } from '@/data/user/db';
import { getSetting, setSetting } from '@/data/user/repo';

/** Ustawienia interfejsu. Źródłem prawdy jest tabela settings w user.db; store to tylko kopia do renderowania. */
interface SettingsState {
  loaded: boolean;
  fourColor: boolean;
  haptics: boolean;
  load: () => void;
  setFourColor: (v: boolean) => void;
  setHaptics: (v: boolean) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  loaded: false,
  fourColor: false,
  haptics: true,
  load: () =>
    set({
      loaded: true,
      fourColor: getSetting(userDb, 'fourColor') === '1',
      haptics: getSetting(userDb, 'haptics') !== '0',
    }),
  setFourColor: (v) => {
    setSetting(userDb, 'fourColor', v ? '1' : '0');
    set({ fourColor: v });
  },
  setHaptics: (v) => {
    setSetting(userDb, 'haptics', v ? '1' : '0');
    set({ haptics: v });
  },
}));
