// Logika dostępu (ADR 0006; wektory: docs/monetyzacja.md „Logika dostępu: wektory”).
// Kształt `Pamiec` uzupełniony przez rolę 07 według tabeli `uprawnienie_cache` (schemat.sql:103–107), bo moduly.md go nie podaje.
// Reguła aktywności jak w Treningu (lib/access.ts:80–88, lib/entitlement.ts:41–45; odczyt 2026-11-07): uprawnienie trwa,
// gdy produkt odblokowuje, transakcja nie jest odebrana i koniec okresu jest później niż teraz; z kilku transakcji tego samego
// produktu liczy się najpóźniejszy koniec. `null` = bez końca tylko dla produktów z `bezKonca` (PRODUKTY_BEZ_KONCA, L8-04, D-217;
// Trening lib/access.ts:83): subskrypcja bez daty końca to błąd adaptera i nie daje dostępu ani wpisu w pamięci.
export type OdczytSklepu =
  | { ok: true; transakcje: { produkt: string; wygasaMs: number | null; odebrana: boolean }[] }
  | { ok: false };
export interface Pamiec {
  produkty: readonly { produkt: string; wygasaMs: number | null }[];
  odczytanoMs: number;
}
type Uprawnienie = { produkt: string; wygasaMs: number | null };

const trwa = (u: Uprawnienie, teraz: number, bezKonca: readonly string[]) =>
  u.wygasaMs === null ? bezKonca.includes(u.produkt) : u.wygasaMs > teraz;

function aktywne(lista: readonly Uprawnienie[], teraz: number, odblokowuja: readonly string[], bezKonca: readonly string[]): Uprawnienie[] {
  const naProdukt = new Map<string, number | null>();
  for (const u of lista) {
    if (!odblokowuja.includes(u.produkt) || !trwa(u, teraz, bezKonca)) continue;
    const dotad = naProdukt.get(u.produkt);
    if (dotad === undefined) naProdukt.set(u.produkt, u.wygasaMs);
    else if (dotad !== null && (u.wygasaMs === null || u.wygasaMs > dotad)) naProdukt.set(u.produkt, u.wygasaMs);
  }
  return [...naProdukt].map(([produkt, wygasaMs]) => ({ produkt, wygasaMs }));
}

// Udany odczyt sklepu jest źródłem prawdy i nadpisuje pamięć (także pustą listą: zwrot czyści pamięć, W7).
// Błąd odczytu: decyduje pamięć ostatniego udanego odczytu, bez zmiany (W4–W6); brak pamięci → brak dostępu.
export function decyzja(
  odczyt: OdczytSklepu,
  pamiec: Pamiec | null,
  teraz: number,
  odblokowuja: readonly string[],
  bezKonca: readonly string[],
): { dostep: boolean; zrodlo: 'sklep' | 'pamiec' | 'brak'; nowaPamiec: Pamiec | null } {
  if (odczyt.ok) {
    const produkty = aktywne(odczyt.transakcje.filter((t) => !t.odebrana), teraz, odblokowuja, bezKonca);
    return { dostep: produkty.length > 0, zrodlo: 'sklep', nowaPamiec: { produkty, odczytanoMs: teraz } };
  }
  if (pamiec === null) return { dostep: false, zrodlo: 'brak', nowaPamiec: null };
  return { dostep: aktywne(pamiec.produkty, teraz, odblokowuja, bezKonca).length > 0, zrodlo: 'pamiec', nowaPamiec: pamiec };
}
