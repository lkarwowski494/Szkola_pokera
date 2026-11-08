import { KONFIGURACJA, odtworzPrzypomnienie, wlaczPrzypomnienie, type PortPowiadomien, type TekstPrzypomnienia } from '@szkola/domena';
import type { PortBazy } from '@szkola/postep';
import { zapiszBlad } from '@/platform/dziennik';
import { czytajPrzypomnienie, zapiszPrzypomnienie } from './ustawieniaAplikacji';

export type WynikPrzelaczenia = 'wlaczone' | 'wylaczone' | 'brak_zgody' | 'blad';

const WYLACZONE = { wlaczone: false, ...KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA };

/**
 * Przełącznik „Przypomnienie” (ADR 0012 pkt 1–3; D-252: stała pora PRZYPOMNIENIE_DOMYSLNA_PORA, wzór Treningu
 * lib/planReminder.ts:13). Włączenie: zgoda, w razie potrzeby prośba systemu (tylko po akcji użytkownika), jedno powiadomienie
 * i zapis w `przypomnienie`; zapis nieudany → powiadomienie anulowane i `blad` (przełącznik nie pokazuje „włączone” bez zapisu).
 * Odmowa → `brak_zgody`, błąd API → `blad`; w obu zapis „wyłączone”.
 */
export async function przelaczPrzypomnienie(
  port: PortBazy,
  pow: PortPowiadomien,
  wlacz: boolean,
  tekst: TekstPrzypomnienia,
  terazMs: number,
): Promise<WynikPrzelaczenia> {
  if (!wlacz) {
    await pow.anulujWszystkie().catch(() => undefined);
    const z = await zapiszPrzypomnienie(port, WYLACZONE, terazMs);
    if (!z.ok) zapiszBlad(z.powod, 'ustawienia');
    return z.ok ? 'wylaczone' : 'blad';
  }
  const w = await wlaczPrzypomnienie(pow, KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA, tekst);
  if (!w.ok) {
    const z = await zapiszPrzypomnienie(port, WYLACZONE, terazMs);
    if (!z.ok) zapiszBlad(z.powod, 'ustawienia');
    return w.powod === 'brak_zgody' ? 'brak_zgody' : 'blad';
  }
  const z = await zapiszPrzypomnienie(port, w.wartosc, terazMs);
  if (!z.ok) {
    zapiszBlad(z.powod, 'ustawienia');
    await pow.anulujWszystkie().catch(() => undefined);
    return 'blad';
  }
  return 'wlaczone';
}

/** Odtworzenie z zapisu (start, powrót na pierwszy plan, import, „Usuń postęp”; ADR 0012). Błąd odczytu → anulowane. */
export async function odtworzZBazy(port: PortBazy, pow: PortPowiadomien, tekst: TekstPrzypomnienia): Promise<'zaplanowane' | 'wylaczone' | 'brak_zgody'> {
  const u = await czytajPrzypomnienie(port);
  if (!u.ok) zapiszBlad(u.powod, 'ustawienia');
  return odtworzPrzypomnienie(pow, u.ok ? u.wartosc : WYLACZONE, tekst);
}
