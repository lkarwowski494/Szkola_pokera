import type { ReactElement } from 'react';
import { View } from 'react-native';

/**
 * Znacznik ekranu trasy dla scenariuszy E2E i bramki scenariuszy (D-1780, D-1830): korzeń ekranu dostaje testID
 * `ekran:<trasa>`, gdzie `<trasa>` to ścieżka pliku względem `src/app` bez rozszerzenia (np. `(tabs)/index`, `lesson/[id]`).
 * Flow Maestro potwierdza nim „jestem na tym ekranie” (`assertVisible: id: 'ekran:<trasa>'`), także przy powrocie wstecz.
 * Opakowanie obejmuje każdy stan ekranu (ładowanie, błąd, treść), bo znacznik jest na trasie, nie w jednym z jej widoków.
 * Widok nie jest dostępnościowy (`accessible` domyślnie wyłączone), więc nie zasłania dzieci dla VoiceOver.
 * Wzór: Trening nie ma znaczników ekranów w kodzie (`lkarwowski494/trening` @ 2d97581, odczyt 2026-11-16); odstępstwo
 * nazwane w `docs/decyzje/IA.md` (D-1830).
 */
export function znacznikEkranu(trasa: string, Ekran: () => ReactElement): () => ReactElement {
  function ZnacznikEkranu() {
    return (
      <View testID={`ekran:${trasa}`} style={{ flex: 1 }}>
        <Ekran />
      </View>
    );
  }
  ZnacznikEkranu.displayName = `ekran:${trasa}`;
  return ZnacznikEkranu;
}
