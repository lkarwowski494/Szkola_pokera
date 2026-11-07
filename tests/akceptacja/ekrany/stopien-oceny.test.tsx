/// <reference types="jest" />
// Test oczekujący NFR-DOST-001 (rola 07 E3, D-187; R-54): stopień oceny słowem i znakiem, nie samym kolorem.
// Słowa i znaki nie są tu ustalone (trzy czy cztery stopnie i ich brzmienie rozstrzyga rola 06 z 04 — moduly.md,
// „Znaleziska”); test wymaga, żeby każdy stopień miał inne słowo i inny znak oraz nazwę dla czytnika ze słowem.
// Skala szarości i kontrast — lista „tylko telefon” i kontrast-e3.md (Jest nie renderuje kolorów).
import '@/i18n';
import { render, screen } from '@testing-library/react-native';
import { OCENY_ODPOWIEDZI } from '../../../packages/domena/src/typy';
import StopienOceny from '@/features/ocena/StopienOceny';
import { tekstCzytany, tekstWidoczny } from './wspolne';

jest.mock('react-native-safe-area-context', () => ({ useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }));

const ZNAKI = /[^\p{L}\p{N}\s.,;:'"„”()\-–]/gu; // znak graficzny (np. ✓ ≈ ! ✗), nie litera, cyfra ani interpunkcja zdania
const SLOWA = /\p{L}{3,}/gu;

async function opis(ocena: (typeof OCENY_ODPOWIEDZI)[number]) {
  await render(<StopienOceny ocena={ocena} />);
  const widoczny = tekstWidoczny(); // dla widzących (także bez rozróżniania kolorów)
  const czytany = tekstCzytany().toLowerCase(); // co przeczyta VoiceOver
  await screen.unmount();
  return { ocena, slowa: new Set((widoczny.match(SLOWA) ?? []).map((w) => w.toLowerCase())), znaki: new Set(widoczny.match(ZNAKI) ?? []), czytany };
}

/** Elementy zbioru `a`, których nie ma w żadnym z `inne`. */
const wlasne = <T,>(a: Set<T>, inne: Set<T>[]) => [...a].filter((x) => !inne.some((b) => b.has(x)));

describe('NFR-DOST-001 ocena nie tylko kolorem', () => {
  it('AK-NFR-DOST-001: każdy stopień z OCENY_ODPOWIEDZI ma widoczne słowo i znak, których nie mają pozostałe, a słowo jest w nazwie dla czytnika', async () => {
    const opisy = [];
    for (const o of OCENY_ODPOWIEDZI) opisy.push(await opis(o));
    for (const o of opisy) {
      const inne = opisy.filter((x) => x !== o);
      const slowa = wlasne(o.slowa, inne.map((x) => x.slowa));
      const znaki = wlasne(o.znaki, inne.map((x) => x.znaki));
      expect({ ocena: o.ocena, slowo: slowa.length > 0, znak: znaki.length > 0, czytnik: slowa.some((w) => o.czytany.includes(w)) }).toEqual({
        ocena: o.ocena,
        slowo: true,
        znak: true,
        czytnik: true,
      });
    }
  });
});
