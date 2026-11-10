import { KONFIGURACJA, limitDnia, mozeStartowac, type Limit, type RodzajAktywnosci, type Wynik, type Zegar } from '@szkola/domena';
import { aktywnoscWToku, zuzyteDzis, type PortBazy, type PowodOdczytu } from '@szkola/postep';

/**
 * Co pokazać po wejściu do aktywności (PR-03, PR-04; ADR 0007 pkt 3; moduly.md `wejscieDoAktywnosci`):
 * - `wznow`: aktywność w toku tego rodzaju i tej treści — od razu sesja, bez ekranu startu i bez limitu (BR-LIM-002-b);
 * - `bez_ekranu`: aktywność poza limitem (lekcja, ocena poziomu, pierwsze podejście do testu; BR-LIM-003);
 * - `ekran_startu`: licznik dnia (`limitDnia`, wspólny dla rodzajów z limitu; zużycie z `zuzyteDzis` dnia lokalnego
 *   telefonu); wyczerpany → ekran startu prowadzi do zakupu (BR-LIM-001). Sam start i tak sprawdza limit raz (`otworzSesje`).
 */
// `limit` w każdym wariancie: start po nieudanym wznowieniu (zmiana treści) też liczy limit, nigdy `bezLimitu` z przypadku.
export type PrzygotowanieStartu = { akcja: 'wznow' | 'bez_ekranu' | 'ekran_startu'; limit: Limit };

/** Limit dnia ze zużycia (jedno miejsce dla ekranu startu i kafelków „Dziś”, BR-LIM-001): `limitDnia` z domeny na dniu lokalnym telefonu. */
export function limitZeZuzycia(zuzyteDzis: number, w: { pro: boolean; zegar: Zegar }): Limit {
  const strefa = w.zegar.strefa();
  return limitDnia({ zuzyteDzis, pro: w.pro, dzien: w.zegar.dzienLokalny(w.zegar.teraz(), strefa), strefa }, KONFIGURACJA);
}

export async function przygotujStart(
  port: PortBazy,
  w: { rodzaj: RodzajAktywnosci; trescId: string | null; pierwszePodejscieTestu: boolean; pro: boolean; zegar: Zegar },
): Promise<Wynik<PrzygotowanieStartu, PowodOdczytu>> {
  const teraz = w.zegar.teraz();
  const strefa = w.zegar.strefa();
  const dzien = w.zegar.dzienLokalny(teraz, strefa);
  const [wToku, zuzyte] = await Promise.all([aktywnoscWToku(port, w.rodzaj), zuzyteDzis(port, dzien)]);
  if (!wToku.ok) return wToku;
  if (!zuzyte.ok) return zuzyte;
  const limit = limitZeZuzycia(zuzyte.wartosc, { pro: w.pro, zegar: w.zegar });
  if (wToku.wartosc && wToku.wartosc.aktywnosc.plan.trescId === w.trescId) return { ok: true, wartosc: { akcja: 'wznow', limit } };
  const poza = mozeStartowac(w.rodzaj, w.pierwszePodejscieTestu, { bezLimitu: false, pozostalo: 0, odnowienieMs: 0 });
  return { ok: true, wartosc: { akcja: poza.start && !poza.zLimitu ? 'bez_ekranu' : 'ekran_startu', limit } };
}
