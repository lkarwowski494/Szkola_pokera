import * as StoreReview from 'expo-store-review';
import type { PortOceny } from '@/features/opinie/prosbaOOcene';

/** Adapter prośby o ocenę na expo-store-review 58.0.2 (`isAvailableAsync`, `requestReview`; build/StoreReview.d.ts, odczyt 2026-11-08). */
export const ocenaExpo: PortOceny = {
  dostepna: () => StoreReview.isAvailableAsync(),
  popros: () => StoreReview.requestReview(),
};
