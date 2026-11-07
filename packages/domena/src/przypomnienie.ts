// Codzienne przypomnienie (ADR 0012; K-13). Uzupełnienie roli 07 (luka dla 05, E3): ADR 0012 opisuje kolejność wywołań
// expo-notifications bez sygnatury; decyzja jest czystym TypeScriptem z portem, adapter w apps/mobile/src/platform/.
// Kształt portu według expo-notifications 57.0.25 (build/*.d.ts, odczyt 2026-11-07): getPermissionsAsync,
// requestPermissionsAsync, cancelAllScheduledNotificationsAsync, scheduleNotificationAsync z wyzwalaczem
// `{ type: 'daily', hour, minute }` (DailyTriggerInput), getAllScheduledNotificationsAsync.
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
// Pora spoza zakresu (np. z importu) i błąd API → bez powiadomienia i bez wyjątku, wynik `wylaczone` (wzór Treningu:
// lib/planReminder.ts:38–44, błędy planowania łapane; odczyt 2026-11-07).
export async function odtworzPrzypomnienie(
  port: PortPowiadomien,
  ust: UstawieniaPrzypomnienia,
  tekst: TekstPrzypomnienia,
): Promise<'zaplanowane' | 'wylaczone' | 'brak_zgody'> {
  try {
    if (!ust.wlaczone || !poraPoprawna(ust)) {
      await port.anulujWszystkie();
      return 'wylaczone';
    }
    if (!(await port.zgoda()).granted) {
      await port.anulujWszystkie();
      return 'brak_zgody';
    }
    await zaplanujJedno(port, ust, tekst);
    return 'zaplanowane';
  } catch {
    await port.anulujWszystkie().catch(() => undefined);
    return 'wylaczone';
  }
}

// Włączenie przełącznikiem (akcja użytkownika, po zdaniu wyjaśnienia): zgoda → w razie potrzeby prośba → jedno powiadomienie.
// Odmowa → `brak_zgody` bez wyjątku; wywołujący zapisuje przełącznik jako wyłączony (pkt 2).
// Prośba tylko, gdy system może jeszcze zapytać (`canAskAgain`; wzór Treningu lib/planReminder.ts:65–67, 71–76).
// Błąd API powiadomień (zgoda, prośba, planowanie) → `planowanie_nieudane` jako wartość (L8-05, D-218, tlo-i-bledy.md §4):
// zaplanowane anulowane (przełącznik wyłączony, bez starego powiadomienia), wywołujący pokazuje komunikat. Nazwane
// odstępstwo od Treningu (planReminder.ts:44 połyka błąd): przełącznik nie może pokazywać „włączone” bez powiadomienia.
// Pora spoza zakresu to błąd programisty (wartość z wybieraka w interfejsie) → wyjątek.
export async function wlaczPrzypomnienie(
  port: PortPowiadomien,
  pora: { godzina: number; minuta: number },
  tekst: TekstPrzypomnienia,
): Promise<Wynik<UstawieniaPrzypomnienia, 'brak_zgody' | 'planowanie_nieudane'>> {
  if (!poraPoprawna(pora)) throw new RangeError(`Pora przypomnienia spoza zakresu: ${pora.godzina}:${pora.minuta}`);
  try {
    let zgoda = await port.zgoda();
    if (!zgoda.granted && zgoda.canAskAgain) zgoda = await port.popros();
    if (!zgoda.granted) {
      await port.anulujWszystkie();
      return { ok: false, powod: 'brak_zgody' };
    }
    await zaplanujJedno(port, pora, tekst);
    return { ok: true, wartosc: { wlaczone: true, godzina: pora.godzina, minuta: pora.minuta } };
  } catch {
    // błąd platformy zamieniony na wartość; nieudane anulowanie nie zmienia wyniku (przełącznik i tak wyłączony)
    await port.anulujWszystkie().catch(() => undefined);
    return { ok: false, powod: 'planowanie_nieudane' };
  }
}

const poraPoprawna = (p: { godzina: number; minuta: number }) =>
  Number.isInteger(p.godzina) && p.godzina >= 0 && p.godzina <= 23 && Number.isInteger(p.minuta) && p.minuta >= 0 && p.minuta <= 59;

// Anuluj wszystkie własne, potem jedno żądanie ze stałym identyfikatorem: współbieżne wywołania zastępują to samo żądanie (pkt 1).
// Pora bez przeliczania strefy: wyzwalacz `daily` działa w czasie lokalnym telefonu.
async function zaplanujJedno(port: PortPowiadomien, pora: { godzina: number; minuta: number }, tekst: TekstPrzypomnienia): Promise<void> {
  await port.anulujWszystkie();
  await port.zaplanuj({
    identyfikator: ID_PRZYPOMNIENIA, tytul: tekst.tytul, tresc: tekst.tresc,
    wyzwalacz: { type: 'daily', hour: pora.godzina, minute: pora.minuta },
  });
}
