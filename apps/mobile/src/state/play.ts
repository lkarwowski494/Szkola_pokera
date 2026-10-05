import type { StyleId, TablePresetId } from '@szkola/poker-core';
import { create } from 'zustand';

/** Ustawienia sesji gry wybrane na ekranie „Graj” (stan interfejsu, ADR-09). */
export interface PlaySetupState {
  /** null = gra swobodna, inaczej moduł obszaru. */
  areaModule: string | null;
  hands: 10 | 20 | 50;
  tablePreset: TablePresetId | 'custom';
  seatStyles: StyleId[];
  timeLimitS: 15 | 30 | null;
  set: (p: Partial<Omit<PlaySetupState, 'set'>>) => void;
}

export const usePlaySetup = create<PlaySetupState>((set) => ({
  areaModule: null,
  hands: 20,
  tablePreset: 'mixed',
  seatStyles: ['loose-passive', 'tight-aggressive', 'balanced', 'loose-aggressive', 'tight-passive'],
  timeLimitS: null,
  set: (p) => set(p),
}));
