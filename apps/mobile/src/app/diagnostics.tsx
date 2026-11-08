import { Redirect } from 'expo-router';
import type { ComponentType } from 'react';

// ADR 0011: diagnostyka (pomiar NFR-03, narzędzie dewelopera) tylko w buildzie deweloperskim; w wydaniu trasa wraca na start.
type ModulEkranu = { default: ComponentType };
const Ekran: ComponentType | null = __DEV__ ? (require('@/features/diagnostyka/DiagnosticsScreen') as ModulEkranu).default : null;

export default function Diagnostics() {
  return Ekran ? <Ekran /> : <Redirect href="/" />;
}
