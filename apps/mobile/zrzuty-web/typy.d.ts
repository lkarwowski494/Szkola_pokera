// HL: moduły react-native-web bez własnych typów, używane tylko przez zrzutowy Text.
declare module 'react-native-web/dist/exports/StyleSheet' {
  const StyleSheet: { flatten(style: unknown): Record<string, unknown> | undefined };
  export default StyleSheet;
}
declare module 'react-native-web/dist/exports/Text' {
  const Text: import('react').ComponentType<Record<string, unknown>>;
  export default Text;
}
