// Codzienne przypomnienie (ADR 0012; K-13). Uzupełnienie roli 07 (luka dla 05, E3): ADR 0012 opisuje kolejność wywołań
// expo-notifications bez sygnatury; decyzja jest czystym TypeScriptem z portem, adapter w apps/mobile/src/platform/.
// Kształt portu według expo-notifications 57.0.25 (build/*.d.ts, odczyt 2026-11-07): getPermissionsAsync,
// requestPermissionsAsync, cancelAllScheduledNotificationsAsync, scheduleNotificationAsync z wyzwalaczem
// `{ type: 'daily', hour, minute }` (DailyTriggerInput), getAllScheduledNotificationsAsync.
import { niezaimplementowane } from './niezaimplementowane';
import type { Wynik } from './typy';

// iOS: `provisional`/`ephemeral` expo-notifications mapuje na „undetermined” (granted: false); gdyby kiedyś użyć prośby
// tymczasowej (`allowProvisional`), adapter liczy zgodę jako `granted || ios.status === PROVISIONAL`.
export interface ZgodaPowiadomien { granted: boolean; canAskAgain: boolean }
export interface WyzwalaczDzienny { type: 'daily'; hour: number; minute: number }
export interface PortPowiadomien {
  zgoda(): Promise<ZgodaPowiadomien>; // getPermissionsAsync — bez okna systemowego
  popros(): Promise<ZgodaPowiadomien>; // requestPermissionsAsync — okno systemowe, tylko po akcji użytkownika (ADR 0012 pkt 2)
  anulujWszystkie(): Promise<void>;
  // `identyfikator` → NotificationRequestInput.identifier: stały, więc współbieżne odtworzenia zastępują jedno żądanie zamiast
  // dublować. Pora spoza 0–23 / 0–59 → RangeError (scheduleNotificationAsync.ts:366–379).
  zaplanuj(p: { identyfikator: string; tytul: string; tresc: string; wyzwalacz: WyzwalaczDzienny }): Promise<string>;
}
export const ID_PRZYPOMNIENIA = 'przypomnienie-dzienne';
// Ustawienia w bazie (ADR 0012 pkt 1): przypomnienie_wlaczone, przypomnienie_godzina, przypomnienie_minuta.
export interface UstawieniaPrzypomnienia { wlaczone: boolean; godzina: number; minuta: number }
// Tekst stały w języku aplikacji w chwili planowania (pkt 3), bez danych osobowych i bez liczby powtórek.
export interface TekstPrzypomnienia { tytul: string; tresc: string }

// Start aplikacji, powrót na pierwszy plan (stan zgody mógł się zmienić w Ustawieniach, U-3), import, „Usuń postęp”,
// zmiana języka, zmiana pory: anuluj wszystkie własne → zaplanuj jedno, gdy włączone i jest zgoda.
// Nigdy nie prosi o zgodę (okno systemowe tylko z przełącznika). Nigdy nie odrzuca obietnicy (np. pora spoza zakresu z importu).
export function odtworzPrzypomnienie(
  _port: PortPowiadomien,
  _ust: UstawieniaPrzypomnienia,
  _tekst: TekstPrzypomnienia,
): Promise<'zaplanowane' | 'wylaczone' | 'brak_zgody'> {
  return niezaimplementowane('odtworzPrzypomnienie (ADR 0012 pkt 1, K-13)');
}

// Włączenie przełącznikiem (akcja użytkownika, po zdaniu wyjaśnienia): zgoda → w razie potrzeby prośba → jedno powiadomienie.
// Odmowa → `brak_zgody` bez wyjątku; wywołujący zapisuje przełącznik jako wyłączony (pkt 2).
export function wlaczPrzypomnienie(
  _port: PortPowiadomien,
  _pora: { godzina: number; minuta: number },
  _tekst: TekstPrzypomnienia,
): Promise<Wynik<UstawieniaPrzypomnienia, 'brak_zgody'>> {
  return niezaimplementowane('wlaczPrzypomnienie (ADR 0012 pkt 2, K-13)');
}
