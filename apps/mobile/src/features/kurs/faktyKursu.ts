import type { FaktyKursu, Wynik } from '@szkola/domena';
import { odczytajPostepLekcji, odczytajUstawienie, wynikiTestow, type PortBazy, type PowodOdczytu } from '@szkola/postep';

/**
 * Fakty kursu z `postep.db` (moduly.md „Kurs”; wejście `stanKursu` z domeny). Punkt startu: ustawienie `punkt_startu`
 * jako `{ modulId, ustawionoMs }` (D-260; zapis po ocenie poziomu); brak = null (domena: pierwszy moduł).
 */
export type PunktStartu = NonNullable<FaktyKursu['punktStartu']>;

export function parsujPunktStartu(v: unknown): Wynik<PunktStartu | null, PowodOdczytu> {
  if (v === null) return { ok: true, wartosc: null };
  if (
    typeof v === 'object' &&
    'modulId' in v &&
    typeof v.modulId === 'string' &&
    v.modulId.length > 0 &&
    'ustawionoMs' in v &&
    typeof v.ustawionoMs === 'number' &&
    Number.isInteger(v.ustawionoMs)
  ) {
    return { ok: true, wartosc: { modulId: v.modulId, ustawionoMs: v.ustawionoMs } };
  }
  return { ok: false, powod: 'odczyt_nieudany' };
}

export async function czytajFaktyKursu(port: PortBazy): Promise<Wynik<FaktyKursu, PowodOdczytu>> {
  const [lekcje, ustawienie, testy] = await Promise.all([odczytajPostepLekcji(port), odczytajUstawienie(port, 'punkt_startu'), wynikiTestow(port)]);
  if (!lekcje.ok) return lekcje;
  if (!ustawienie.ok) return ustawienie;
  if (!testy.ok) return testy;
  const punkt = parsujPunktStartu(ustawienie.wartosc);
  if (!punkt.ok) return punkt;
  return {
    ok: true,
    wartosc: {
      ukonczoneLekcje: lekcje.wartosc.filter((l) => l.ukonczonoMs !== null).map((l) => l.lekcjaId),
      punktStartu: punkt.wartosc,
      testy: testy.wartosc.map((t) => ({ modulId: t.modulId, zaliczony: t.zaliczony, koniecMs: t.koniecMs })),
    },
  };
}
