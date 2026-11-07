// Atrapa expo-notifications dla K-13 (ADR 0012). Stan systemu: zgoda i lista zaplanowanych; zapis wywołań do asercji.
// Zachowanie według expo-notifications 57.0.25 (build/*.d.ts): cancelAll usuwa wszystkie zaplanowane przez aplikację,
// schedule z tym samym `identifier` zastępuje żądanie (UNUserNotificationCenter), pora spoza 0–23 / 0–59 → RangeError
// (src/scheduleNotificationAsync.ts:366–379), canAskAgain = status ≠ denied. Założenie [DO USTALENIA]: system nie odrzuca
// planowania bez zgody (powiadomienie nie zostanie pokazane), więc atrapa też nie odrzuca — to kod ma nie planować bez zgody.
import type { PortPowiadomien, WyzwalaczDzienny, ZgodaPowiadomien } from '../../packages/domena/src';

export type StanZgody = 'udzielona' | 'odmowa' | 'nieustalona';
export interface AtrapaPowiadomien extends PortPowiadomien {
  zaplanowaneTeraz: { id: string; tytul: string; tresc: string; wyzwalacz: WyzwalaczDzienny }[];
  wywolania: string[];
  stan: StanZgody;
  odpowiedzNaProsbe: 'udzielona' | 'odmowa'; // co użytkownik wybierze w oknie systemowym
}

export function atrapaPowiadomien(stan: StanZgody = 'nieustalona', odpowiedzNaProsbe: 'udzielona' | 'odmowa' = 'udzielona'): AtrapaPowiadomien {
  let n = 0;
  const a: AtrapaPowiadomien = {
    zaplanowaneTeraz: [],
    wywolania: [],
    stan,
    odpowiedzNaProsbe,
    async zgoda(): Promise<ZgodaPowiadomien> {
      a.wywolania.push('zgoda');
      return { granted: a.stan === 'udzielona', canAskAgain: a.stan !== 'odmowa' };
    },
    async popros(): Promise<ZgodaPowiadomien> {
      a.wywolania.push('popros');
      if (a.stan === 'nieustalona') a.stan = a.odpowiedzNaProsbe; // iOS pyta tylko raz; potem zwraca zapisaną decyzję
      return { granted: a.stan === 'udzielona', canAskAgain: a.stan !== 'odmowa' };
    },
    async anulujWszystkie() {
      a.wywolania.push('anulujWszystkie');
      a.zaplanowaneTeraz = [];
    },
    async zaplanuj(p) {
      a.wywolania.push('zaplanuj');
      const { hour, minute } = p.wyzwalacz;
      if (!(Number.isInteger(hour) && hour >= 0 && hour <= 23)) throw new RangeError('The hour parameter needs to be between 0 and 23');
      if (!(Number.isInteger(minute) && minute >= 0 && minute <= 59)) throw new RangeError('The minute parameter needs to be between 0 and 59');
      await Promise.resolve(); // natywne wywołanie jest asynchroniczne: przeplot z innymi wywołaniami jak na telefonie
      const id = p.identyfikator || `p${++n}`;
      a.zaplanowaneTeraz = a.zaplanowaneTeraz.filter((x) => x.id !== id);
      a.zaplanowaneTeraz.push({ id, tytul: p.tytul, tresc: p.tresc, wyzwalacz: { ...p.wyzwalacz } });
      return id;
    },
  };
  return a;
}
