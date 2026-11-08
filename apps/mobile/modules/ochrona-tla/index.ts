import { requireOptionalNativeModule } from 'expo-modules-core';

/**
 * Moduł natywny ochrony długich operacji (ADR 0013 pkt 1). iOS: `rozpocznij` = `beginBackgroundTask(withName:expirationHandler:)`
 * (−1 dla `.invalid`), `zakoncz` = `endBackgroundTask`, zdarzenie `wygasa { id }` z handlera wygaśnięcia, który sam kończy
 * zadanie. Android, Expo Go i testy: moduł nie istnieje (`null`) — adapter `platform/ochronaTla.ts` zwraca wtedy −1.
 */
export interface ModulOchronyTla {
  rozpocznij(nazwa: string): number;
  zakoncz(id: number): void;
  addListener(zdarzenie: 'wygasa', fn: (e: { id: number }) => void): { remove(): void };
}

export const modulOchronyTla: ModulOchronyTla | null = requireOptionalNativeModule<ModulOchronyTla>('OchronaTla');
