import { useEffect, useRef, type RefObject } from 'react';
import { AccessibilityInfo, type HostInstance, type ScrollViewInstance } from 'react-native';

/*
 * Ogłoszenia VoiceOver i fokus (A04-03, 08-F25; D-283 pkt 1–2). Wzór: Trening `lib/announce.ts:1–10` (main, odczyt
 * 2026-11-09, D-191). Komunikat, który pojawia się w treści ekranu (ocena, błąd zapisu), ogłasza ta funkcja:
 * `accessibilityLiveRegion` w React Native działa tylko na Androidzie — poza tym plikiem zakazany (strażnik
 * `features/dostepnosc/__tests__/announce-08.test.tsx`). API: RN 0.88.1, `AccessibilityInfo.js:441–460`, odczyt 2026-11-09.
 */
export const announce = (text: string): void => {
  // bez try/catch: RN woła moduł natywny przez `?.` (AccessibilityInfo.js:458–460), brak czytnika nie rzuca błędu
  AccessibilityInfo.announceForAccessibility(text);
};

/** Ogłasza `text`, gdy zmieni się na niepusty (ocena po decyzji, błąd zapisu). */
export function useAnnounce(text: string | null | undefined): void {
  useEffect(() => {
    if (text) announce(text);
  }, [text]);
}

/**
 * Po zmianie zadania (`klucz`, np. indeks po „Dalej”): przewinięcie na górę i fokus VoiceOver na początek zadania (08-F25 A,
 * D-283 pkt 2). Przy pierwszym renderze nic — ekran dopiero się otwiera i czytnik sam zaczyna od góry.
 */
export function useNoweZadanie(klucz: unknown, przewijanie: RefObject<ScrollViewInstance | null>, fokus: RefObject<HostInstance | null>): void {
  const poprzedni = useRef(klucz);
  useEffect(() => {
    if (Object.is(poprzedni.current, klucz)) return;
    poprzedni.current = klucz;
    przewijanie.current?.scrollTo({ y: 0, animated: false });
    if (fokus.current) AccessibilityInfo.sendAccessibilityEvent(fokus.current, 'focus');
  }, [klucz, przewijanie, fokus]);
}
