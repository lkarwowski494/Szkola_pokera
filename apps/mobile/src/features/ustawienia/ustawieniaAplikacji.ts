import { czyProsicOOcene, KONFIGURACJA, type MiejsceProsby, type Pamiec, type UstawieniaPrzypomnienia, type Wynik } from '@szkola/domena';
import { jestJezykiem, type Jezyk } from '@szkola/jezyki';
import { parsujWyborPoziomu, type WyborPoziomu } from '@/features/scenariusz/poziom';
import { odczytajUstawienie, zapiszUstawienie, type PortBazy, type PowodOdczytu, type PowodZapisu } from '@szkola/postep';

/**
 * Ustawienia aplikacji w tabeli `ustawienie` (dane.md, wiersz „F-11, F-16, F-17, F-14”: klucze `przypomnienie`, `jezyk`,
 * `opinie`, `ostatni_eksport`). Odczyt z `unknown`: przypomnienie i język to preferencje — wartość o złym kształcie (np. z
 * importu) daje wartość domyślną z modułu konfiguracji; data eksportu i chwila prośby bez poprawnej liczby zostają brakiem.
 * Błąd odczytu bazy nie udaje braku: `odczyt_nieudany`.
 */
const KLUCZ = { przypomnienie: 'przypomnienie', jezyk: 'jezyk', opinie: 'opinie', ostatniEksport: 'ostatni_eksport', poziomScenariusza: 'scenariusz_poziom' } as const;

export type UstawienieJezyka = 'auto' | Jezyk;

const czyObiekt = (v: unknown): v is object => typeof v === 'object' && v !== null;
const liczbaCalkowita = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);

function przypomnienieZ(v: unknown): UstawieniaPrzypomnienia {
  if (czyObiekt(v) && 'wlaczone' in v && typeof v.wlaczone === 'boolean' && 'godzina' in v && liczbaCalkowita(v.godzina) && 'minuta' in v && liczbaCalkowita(v.minuta)) {
    return { wlaczone: v.wlaczone, godzina: v.godzina, minuta: v.minuta }; // pora spoza zakresu odrzuca odtworzPrzypomnienie (ADR 0012)
  }
  return { wlaczone: false, ...KONFIGURACJA.PRZYPOMNIENIE_DOMYSLNA_PORA };
}

async function czytaj<T>(port: PortBazy, klucz: string, z: (v: unknown) => T): Promise<Wynik<T, PowodOdczytu>> {
  const w = await odczytajUstawienie(port, klucz);
  return w.ok ? { ok: true, wartosc: z(w.wartosc) } : w;
}

export const czytajPrzypomnienie = (port: PortBazy) => czytaj(port, KLUCZ.przypomnienie, przypomnienieZ);
export const zapiszPrzypomnienie = (port: PortBazy, u: UstawieniaPrzypomnienia, terazMs: number): Promise<Wynik<void, PowodZapisu>> =>
  zapiszUstawienie(port, KLUCZ.przypomnienie, { wlaczone: u.wlaczone, godzina: u.godzina, minuta: u.minuta }, terazMs);

export const czytajOstatniEksport = (port: PortBazy) => czytaj(port, KLUCZ.ostatniEksport, (v) => (liczbaCalkowita(v) ? v : null));
export const zapiszOstatniEksport = (port: PortBazy, terazMs: number) => zapiszUstawienie(port, KLUCZ.ostatniEksport, terazMs, terazMs);

export const czytajJezyk = (port: PortBazy) => czytaj<UstawienieJezyka>(port, KLUCZ.jezyk, (v) => (typeof v === 'string' && jestJezykiem(v) ? v : 'auto'));
export const zapiszJezyk = (port: PortBazy, j: UstawienieJezyka, terazMs: number) => zapiszUstawienie(port, KLUCZ.jezyk, j, terazMs);

// „Skończone prace” (BR-OPIN-001: lekcje i sesje ćwiczeń zakończone od instalacji): zakończone aktywności `lekcja`, `sesja`
// i `powtorki` (sesja powtórek to też sesja ćwiczeń); porzucone, testy i ocena poziomu się nie liczą. „Usuń postęp” i import
// zmieniają tę liczbę razem z aktywnościami (nazwane uproszczenie: bez osobnego licznika od instalacji).
async function skonczonePrace(port: PortBazy): Promise<Wynik<number, PowodOdczytu>> {
  try {
    const [w] = await port.all<unknown>("SELECT count(*) AS n FROM aktywnosc WHERE stan = 'zakonczona' AND rodzaj IN ('lekcja', 'sesja', 'powtorki')");
    return czyObiekt(w) && 'n' in w && liczbaCalkowita(w.n) ? { ok: true, wartosc: w.n } : { ok: false, powod: 'odczyt_nieudany' };
  } catch {
    return { ok: false, powod: 'odczyt_nieudany' };
  }
}

/** Czy teraz wywołać systemową prośbę o ocenę (BR-OPIN-001, D-110); decyzja w domenie (`czyProsicOOcene`). */
export async function czyPoprosicOOcene(port: PortBazy, miejsce: MiejsceProsby, terazMs: number): Promise<Wynik<boolean, PowodOdczytu>> {
  const [prace, opinie] = await Promise.all([skonczonePrace(port), odczytajUstawienie(port, KLUCZ.opinie)]);
  if (!prace.ok) return prace;
  if (!opinie.ok) return opinie;
  const v = opinie.wartosc;
  const ostatniaProsbaMs = czyObiekt(v) && 'ostatniaProsbaMs' in v && liczbaCalkowita(v.ostatniaProsbaMs) ? v.ostatniaProsbaMs : null;
  return { ok: true, wartosc: czyProsicOOcene({ miejsce, skonczonePrace: prace.wartosc, ostatniaProsbaMs, teraz: terazMs }) };
}

export const zapiszProsbeOOcene = (port: PortBazy, terazMs: number) => zapiszUstawienie(port, KLUCZ.opinie, { ostatniaProsbaMs: terazMs }, terazMs);

/** „Zarządzaj subskrypcją” (BR-ZAK-004): w pamięci dostępu jest niewygasły produkt z datą końca (dożywotni ma `wygasaMs: null`). */
export function czySubskrypcjaAktywna(pamiec: Pamiec | null, terazMs: number): boolean {
  return pamiec !== null && pamiec.produkty.some((p) => p.wygasaMs !== null && p.wygasaMs > terazMs);
}

// Ręczny wybór poziomu scenariusza (KO-039, BR-POZ-002): zapamiętany do wyboru „Automatycznie”. Preferencja interfejsu: wartość
// o złym kształcie (np. z importu) daje „auto” (domyślne zachowanie), nie błąd.
export const czytajPoziomScenariusza = (port: PortBazy) => czytaj<WyborPoziomu>(port, KLUCZ.poziomScenariusza, (v) => parsujWyborPoziomu(v) ?? 'auto');
export const zapiszPoziomScenariusza = (port: PortBazy, p: WyborPoziomu, terazMs: number) => zapiszUstawienie(port, KLUCZ.poziomScenariusza, p, terazMs);
