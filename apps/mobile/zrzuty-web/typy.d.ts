// HL/HW: moduły react-native-web bez własnych typów, używane tylko przez zrzutowe `Text` i `Dimensions`.
declare module 'react-native-web/dist/exports/StyleSheet' {
  const StyleSheet: { flatten(style: unknown): Record<string, unknown> | undefined };
  export default StyleSheet;
}
declare module 'react-native-web/dist/exports/Text' {
  const Text: import('react').ComponentType<Record<string, unknown>>;
  export default Text;
}
declare module 'react-native-web/dist/exports/Dimensions' {
  type Wymiary = { readonly fontScale: number; readonly height: number; readonly scale: number; readonly width: number };
  type Zdarzenie = { readonly window: Wymiary; readonly screen: Wymiary };
  export default class Dimensions {
    static get(wymiar: 'window' | 'screen'): Wymiary;
    static set(wymiary: { window?: Wymiary; screen?: Wymiary }): void;
    static addEventListener(typ: 'change', uchwyt: (wymiary: Zdarzenie) => void): { remove(): void };
    static removeEventListener(typ: 'change', uchwyt: (wymiary: Zdarzenie) => void): void;
  }
}
