// Wyrocznie tekstowe testów ekranów (rola 07 E3, D-187). Teksty końcowe ustala rola 06 (design-spec.md, „Głos”:
// [PRZYKŁAD: teksty końcowe rola 06]); tu tylko znaczenie z kryterium BRD albo nazwa ze słownika interakcji roli 04,
// jako wzorce dopasowania po polsku (testy renderują język pl). Zmiana tekstu przez 06 = zmiana wzorca tu, w jednym miejscu.

/** Słownik interakcji (docs/design/design-spec.md, „Słownik interakcji”) i nazwy z kryteriów BRD. */
export const NAZWY = {
  pomin: /^Pomiń$/, // BR-ONB-001 „Pomiń” na każdym ekranie
  przywroc: /^Przywróć zakupy$/, // BR-ZAK-003, słownik interakcji
  zamknij: /^Zamknij$/, // słownik interakcji (ekran zakupu)
  wrocDoLekcji: /^Wróć do lekcji$/, // BR-LIM-001, słownik interakcji
  zarzadzaj: /^Zarządzaj subskrypcją$/, // BR-ZAK-004 „Zarządzaj subskrypcją”
  pomoc: /^Pomoc$/, // BR-POM-002 „Pomoc”
  usunPostep: /^Usuń postęp$/, // BR-DANE-003, słownik interakcji
  sprobujPonownie: /^Spróbuj ponownie$/, // design-spec.md, macierz stanów „Limit i zakup”
  warunki: /warunki/i, // monetyzacja.md:75 „odnośniki do warunków (Terms of Use)”
  prywatnosc: /prywatno/i, // monetyzacja.md:75 „i polityki prywatności”
  zacznij: /^Zacznij/, // start aktywności (BR-LIM-001 „otworzy start sesji”)
  eksportuj: /^Eksportuj postęp$/, // BR-DANE-001 „Eksportuj postęp”
  importuj: /^Importuj postęp$/, // BR-DANE-002 „wybierze import”
  ocenWSklepie: /^Oceń w sklepie$/, // BR-OPIN-002
  napiszDoNas: /^Napisz do nas$/, // BR-OPIN-002
  zglosBlad: /^Zgłoś błąd/, // BR-OPIN-003 „Zgłoś błąd”; słownik interakcji „Zgłoś błąd w tym zadaniu”
} as const;

/** Znaczenia z kryteriów (BR-ONB-004, BR-ZAK-001–003, design-spec.md macierz stanów). */
export const ZNACZENIA = {
  decyzje: /decyzj/i, // BR-ONB-004 „uczy podejmowania decyzji w pokerze”
  bezPieniedzy: /bez gry na pieniądze/i, // BR-ONB-004 „bez gry na pieniądze”
  // BR-ONB-004 „nie obiecuje wygranej i nie wskazuje gry online”; pełna lista zakazanych sformułowań NFR-ZGOD-002 [DO USTALENIA] → rola 06
  zakazanePowitanie: [/wygr/i, /zarabia/i, /online/i, /kasyn/i],
  kwartal: /kwarta|3 miesiące/i, // BR-ZAK-001 „okres”
  rok: /\brok\b|roczn/i,
  odnawianie: /odnawia/i, // BR-ZAK-001 „informację o automatycznym odnawianiu do czasu anulowania”
  anulowanie: /anul/i,
  jednorazowy: /jednorazow/i, // BR-ZAK-001 „zakup jednorazowy bez odnawiania”
  przeliczenieNaMiesiac: /\/\s?mies|miesięcznie|na miesiąc|za miesiąc|\/mo\b/i, // BR-ZAK-001 „bez przeliczenia na miesiąc”
  coOdblokowuje: /dzienn\w* limit/i, // BR-ZAK-001 „listę tego, co odblokowuje zakup”: Pro bez dziennego limitu (BR-LIM, D-107)
  brakCen: /Nie udało się pobrać cen/, // design-spec.md macierz „ceny niedostępne”; BR-ZAK-002 „komunikat o braku połączenia”
  brakZakupow: /Nie znaleźliśmy zakupów/, // design-spec.md macierz „przywracanie bez zakupu”; BR-ZAK-003
  start: /zacznij|rozpocznij/i, // BR-ONB-001 „przycisk rozpoczęcia nauki”
  potwierdzUsun: /usuń/i, // przycisk potwierdzenia w Alert (BR-DANE-003)
  // BR-LIM-001 „ma dziś 1 darmową aktywność”; „0 darmowych aktywności na dziś i godzinę odnowienia”; design-spec.md „Dziś”
  licznik: (n: number) => new RegExp(`\\b${n}\\b[^.]*darmow`, 'i'),
  licznikDowolny: /darmow|dzienn\w* limit/i,
  odnowienie: /odnowi[^.]*(o północy|00:00)/i, // ADR 0007: odnowienie o północy czasu telefonu; design-spec.md „odnowi się o północy”
  powtorkiPoczekaja: /poczekaj/i, // BR-LIM-004 „powtórki poczekają do odnowienia limitu”
  nicNieUtracone: /utrac|stracisz/i, // BR-LIM-004 „nic nie zostanie utracone”
  zastapienie: /zastąp/i, // BR-DANE-002 „ostrzeżenie, że obecny postęp zostanie zastąpiony”
  potwierdzImport: /importuj|zastąp/i, // przycisk potwierdzenia w Alert importu
  blednyPlik: /błędn|nie pochodzi|uszkodzon/i, // BR-DANE-002 „komunikat o błędnym pliku”
  nowszaWersja: /zaktualizuj|aktualizacj/i, // BR-DANE-002 „prośbę o aktualizację aplikacji”
  ostatniEksport: /ostatni\w* eksport/i, // BR-DANE-001 „datę ostatniego eksportu”
} as const;
