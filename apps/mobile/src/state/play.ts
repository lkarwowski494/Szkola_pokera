import { presetStyles, type StyleId, type TablePresetId } from '@szkola/poker-core';
import { create } from 'zustand';

/** Ustawienia sesji gry wybrane na ekranie „Graj” (stan interfejsu, ADR-09). */
export interface PlaySetupState {
  /** null = gra swobodna, inaczej moduł obszaru. */
  areaModule: string | null;
  hands: 10 | 20 | 50;
  tablePreset: TablePresetId | 'custom';
  /** Liczba graczy przy stole w grze swobodnej (obszary treningowe grają przy stole 6-osobowym). */
  players: 6 | 9;
  /** Style rywali dla największego stołu (8 miejsc); przy mniejszym stole liczą się pierwsze players − 1. */
  seatStyles: StyleId[];
  timeLimitS: 15 | 30 | null;
  set: (p: Partial<Omit<PlaySetupState, 'set'>>) => void;
}

export const usePlaySetup = create<PlaySetupState>((set) => ({
  areaModule: null,
  hands: 20,
  tablePreset: 'mixed',
  players: 6,
  seatStyles: presetStyles('mixed', 9),
  timeLimitS: null,
  set: (p) => set(p),
}));
