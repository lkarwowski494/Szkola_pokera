// generuj-warianty.mjs — dane wejściowe bramki opłacalności (rola 02, E1b, 2026-11-03) z e1-rynek-2026-11-03.json.
// node generuj-warianty.mjs → oplacalnosc-wlasna.json (wariant właściciela, D-029) i warianty/*.json (macierz D-028).
// Wszystkie kwoty w USD; cena sklepu = cena US × współczynnik ceny brutto storefrontu (zmierzony, niżej).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const rynek = JSON.parse(readFileSync(join(DIR, 'e1-rynek-2026-11-03.json'), 'utf8'));
const DATA = '2026-11-03';
const Z = (t) => `[ZAŁOŻENIE] ${t}`;

// Współczynnik ceny brutto: cena lokalna planów Postflop+ (mies., rok), Preflop+ (mies., rok), NTPoker Standard (mies., rok)
// przeliczona kursem NBP (214/A/NBP/2026 z 2026-11-03; TWD, VND: 043/B/NBP/2026 z 2026-10-28) ÷ cena US; średnia z 6 par.
const WSP_ZR = 'średnia z 6 par planów (Postflop+, Preflop+, NTPoker; apps.apple.com 2026-11-03) przeliczona kursem NBP 214/A/NBP/2026 (2026-11-03), TWD i VND 043/B/NBP/2026 (2026-10-28)';
const VAT_ZR = (k, s) => k === 'gb'
  ? 'gov.uk/vat-rates: „Standard rate … 20% … Most goods and services” (odczyt 2026-11-03)'
  : Z(`stawka podstawowa ${Math.round(s * 100)}% (${k}); niesprawdzona u źródła 2026-11-03 (strona europa.eu ładuje stawki skryptem); wpływ ±5 pp na wynik < 5%`);
const KRAJE = {
  us: { wsp: 1.0, vat: 0, jez: 'en', vatZr: Z('ceny w US bez podatku sprzedaży (2026-11-03); podatek pobiera Apple ponad cenę') },
  jp: { wsp: 0.781, vat: 0.10, jez: 'ja' },
  ca: { wsp: 0.803, vat: 0, jez: 'en', vatZr: Z('ceny w CA bez podatku (2026-11-03), jak w US') },
  gb: { wsp: 1.342, vat: 0.20, jez: 'en' },
  br: { wsp: 0.934, vat: 0, jez: 'pt-BR', vatZr: Z('podatki BR w cenie i rozliczane przez Apple; efektywnie 0 w tym rachunku (2026-11-03) [DO USTALENIA]') },
  fr: { wsp: 1.146, vat: 0.20, jez: 'fr' },
  tw: { wsp: 1.030, vat: 0.05, jez: 'zh-Hant' },
  vn: { wsp: 0.947, vat: 0.10, jez: 'vi' },
  de: { wsp: 1.146, vat: 0.19, jez: 'de' },
  pl: { wsp: 1.272, vat: 0.23, jez: 'pl' },
};
// Luka lokalizacji jako mnożnik szansy (moduł: podaż osobno). Metoda: w JP aplikacje z JA mają 2601 i 1570 ocen wobec 772 i 647 aplikacji EN (lookup 2026-11-03), czyli 2–4×.
const LOK = {
  en: { s: [1, 1, 1], zrodlo: Z('rynek anglojęzyczny: brak luki lokalizacji (wszyscy konkurenci EN), 2026-11-03') },
  pl: { s: [1, 1.2, 2], zrodlo: Z('PL: luka częściowa (NTPoker i POKER Q\'z mają PL, lookup 2026-11-03); górna granica połowy efektu z JP') },
  inne: { s: [1, 1.5, 3], zrodlo: Z('luka lokalizacji: czołowi konkurenci storefrontu tylko EN (lookup 2026-11-03); górna granica z JP: aplikacje z JA mają 2–4× więcej ocen niż EN') },
};

const VAT = (k) => ({ stawka: KRAJE[k].vat, zrodlo: KRAJE[k].vatZr ?? VAT_ZR(k, KRAJE[k].vat) });
const PROW = {
  ios: { stawka: 0.15, zrodlo: 'developer.apple.com/app-store/small-business-program: „a reduced commission rate of 15% on paid apps and Apple In-App Purchases” (odczyt 2026-11-03); warunek: zapis właściciela do programu [DO WYJAŚNIENIA]' },
  android: { stawka: 0.15, zrodlo: 'support.google.com/googleplay/android-developer/answer/112622: „First $1M (USD) of annual earnings 10% + 5% billing fee” (US, EOG, UK, AU, JP), „15% for the first $1M (USD)” w pozostałych rynkach (odczyt 2026-11-03)' },
};

const konkurenci = (k) => rynek.storefronty[k].filter((a) => a.oceny > 0).map((a) => ({
  oceny: a.oceny, wydanie: a.wydanie, zrodlo: `itunes.apple.com/lookup?id=${a.id}&country=${k} (2026-11-03)`,
}));

const WSPOLNE = {
  instalacje_na_ocene: { s: [20, 60, 200], zrodlo: Z('instalacje na jedną ocenę w App Store; brak przeczytanego benchmarku (OP-03), rozrzut 10×') },
  udzial_nowej: { s: [0.005, 0.02, 0.05], zrodlo: Z('udział nowej aplikacji w rocznych instalacjach 20 aplikacji kategorii w storefroncie; rozrzut 10×') },
  darmowa_alternatywa: { s: [0.5, 0.7, 0.9], zrodlo: Z('część popytu, której nie zabierają darmowe plany konkurentów i darmowe materiały; dowód kierunku: skargi na ścianę płatności 23 z 349 recenzji (2026-11-03)') },
};
const ANDROID = { s: [0.1, 0.6, 2.0], zrodlo: Z('Android ÷ iOS w kategorii: recenzje Google Play ÷ oceny iOS 0,10 (Preflop Wizard) i 3,0 (GTO Gecko), play.google.com i lookup 2026-11-03; StatCounter 10/2026: 0,54 (CA) – 2,86 (MX) dla całego ruchu') };

// Warianty (D-028): ceny US; udzial = część płacących na plan (suma 1 w każdym scenariuszu); konwersja pobranie → płacący zależy od ceny jawnie.
const MIES = { platnosci_w_roku: 4, platnosci_zrodlo: Z('średnio 4 opłacone miesiące na płacącego plan miesięczny w roku; brak przeczytanego źródła retencji') };
const udz = (s, t) => ({ s, zrodlo: Z(t) });
const MIX3 = 'podział płacących mies./rok/dożywotni; kierunek: plan dożywotni u 8 z 16 konkurentów i chwalony w recenzjach (13 z 349)';
const KW = { platnosci_w_roku: 1, platnosci_zrodlo: Z('1 opłacony kwartał na płacącego plan kwartalny w roku; właściciel 2026-11-03: „Ludzie porzucają naukę po max miesiącu” (bez przeczytanego źródła retencji)') };
const MIES1 = { platnosci_w_roku: 1, platnosci_zrodlo: Z('1 opłacony miesiąc na płacącego plan miesięczny w roku; właściciel 2026-11-03: „Ludzie porzucają naukę po max miesiącu”') };
const DRABINA = 'podział płacących kwartał/rok/dożywotni; hipoteza właściciela (2026-11-03): dożywotni za 5 USD więcej niż rok przyciąga większość; pes.: większość zostaje przy kwartale';
const KONW = (s, t) => ({ s, zrodlo: Z(`konwersja pobranie → płacący przy cenie wariantu; ${t}`) });
const WARIANTY = [
  { id: 'wlasciciel-0.99-6.99-14.99', opis: 'właściciel D-029: mies. 0,99 / rok 6,99 / dożywotni 14,99 USD', konw: KONW([0.015, 0.045, 0.12], 'cena 10–15× poniżej mediany kategorii: 1,5–2× konwersji wariantu rynkowego'),
    produkty: [{ id: 'mies', cena: 0.99, ...MIES, u: [0.5, 0.4, 0.3] }, { id: 'rok', cena: 6.99, u: [0.3, 0.35, 0.4] }, { id: 'dozywotni', cena: 14.99, u: [0.2, 0.25, 0.3] }] },
  // Drabina właściciela (2026-11-03): kwartał / rok / dożywotni, bez miesięcznej; hipoteza właściciela: tani kwartał jako wejście, dożywotni jako okazja.
  { id: 'drabina-7.99-14.99-19.99', opis: 'kwartał 7,99 / rok 14,99 / dożywotni 19,99 USD (właściciel, 2026-11-03)', konw: KONW([0.012, 0.04, 0.09], 'każdy plan poniżej najtańszego konkurenta (kwartał 49,99, rok 49,99, dożywotni 59,99 USD, US 2026-11-03); wejście 7,99 bliżej zakupu impulsowego niż 19,99 jednorazowo'),
    produkty: [{ id: 'kwartal', cena: 7.99, ...KW, u: [0.5, 0.25, 0.15] }, { id: 'rok', cena: 14.99, u: [0.25, 0.25, 0.2] }, { id: 'dozywotni', cena: 19.99, u: [0.25, 0.5, 0.65] }], mix: DRABINA },
  { id: 'drabina-9.99-14.99-19.99', opis: 'kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (właściciel, 2026-11-03; konwersja wobec najtańszej konkurencji)', konw: KONW([0.012, 0.036, 0.08], 'wejście 9,99 = ok. 1/5 najtańszego kwartału i dożywotni 1/3 najtańszego dożywotniego konkurenta (US 2026-11-03); jak jednorazowy 19,99'),
    produkty: [{ id: 'kwartal', cena: 9.99, ...KW, u: [0.5, 0.25, 0.15] }, { id: 'rok', cena: 14.99, u: [0.25, 0.25, 0.2] }, { id: 'dozywotni', cena: 19.99, u: [0.25, 0.5, 0.65] }], mix: DRABINA },
  { id: 'drabina-mies-5.99-14.99-19.99', opis: 'zapas właściciela: mies. 5,99 / rok 14,99 / dożywotni 19,99 USD (2026-11-03)', konw: KONW([0.012, 0.04, 0.09], 'wejście 5,99 = najtańszy miesięczny konkurent (Preflop+, US 2026-11-03); rok i dożywotni 3× poniżej najtańszych'),
    produkty: [{ id: 'mies', cena: 5.99, ...MIES1, u: [0.5, 0.25, 0.15] }, { id: 'rok', cena: 14.99, u: [0.25, 0.25, 0.2] }, { id: 'dozywotni', cena: 19.99, u: [0.25, 0.5, 0.65] }], mix: DRABINA },
  { id: 'drabina4-6.99-9.99-14.99-19.99', opis: 'właściciel: mies. 6,99 / kwartał 9,99 / rok 14,99 / dożywotni 19,99 USD (2026-11-03)', konw: KONW([0.012, 0.04, 0.09], 'wejście 6,99 jak przy 7,99; plany poniżej najtańszych konkurentów (US 2026-11-03)'),
    produkty: [{ id: 'mies', cena: 6.99, ...MIES1, u: [0.4, 0.15, 0.1] }, { id: 'kwartal', cena: 9.99, ...KW, u: [0.25, 0.2, 0.1] }, { id: 'rok', cena: 14.99, u: [0.15, 0.15, 0.15] }, { id: 'dozywotni', cena: 19.99, u: [0.2, 0.5, 0.65] }], mix: 'podział płacących mies./kwartał/rok/dożywotni; hipoteza drabiny właściciela; pes.: najtańsze wejście (miesiąc) zabiera część kupujących kwartał' },
  // Sesja 2, E2 (2026-11-03): opcja C — sama subskrypcja (kwartał + rok), bez planu dożywotniego.
  { id: 'sub-9.99-14.99', opis: 'kwartał 9,99 / rok 14,99 USD, bez dożywotniego (opcja C, E2 sesji 2)', konw: KONW([0.01, 0.032, 0.07], 'jak drabina 9,99, ok. 10% niżej: mniej wyboru i brak planu bez odnowień (13 z 349 recenzji chwali dożywotni)'),
    produkty: [{ id: 'kwartal', cena: 9.99, ...KW, u: [0.75, 0.5, 0.35] }, { id: 'rok', cena: 14.99, u: [0.25, 0.5, 0.65] }], mix: 'podział płacących kwartał/rok; pes.: większość zostaje przy kwartale' },
  { id: 'srodek-4.99-29.99-59.99', opis: 'mies. 4,99 / rok 29,99 / dożywotni 59,99 USD (ok. 1/3 mediany)', konw: KONW([0.012, 0.036, 0.08], 'cena ok. 1/3 mediany: 1,2–1,3× konwersji wariantu rynkowego'),
    produkty: [{ id: 'mies', cena: 4.99, ...MIES, u: [0.5, 0.4, 0.3] }, { id: 'rok', cena: 29.99, u: [0.3, 0.35, 0.4] }, { id: 'dozywotni', cena: 59.99, u: [0.2, 0.25, 0.3] }] },
  { id: 'rynek-14.99-89.99-149.99', opis: 'mediana kategorii US: mies. 14,99 / rok 89,99 / dożywotni 149,99 USD', konw: KONW([0.01, 0.03, 0.06], 'poziom bazowy przy cenie mediany kategorii'),
    produkty: [{ id: 'mies', cena: 14.99, ...MIES, u: [0.5, 0.4, 0.3] }, { id: 'rok', cena: 89.99, u: [0.3, 0.35, 0.4] }, { id: 'dozywotni', cena: 149.99, u: [0.2, 0.25, 0.3] }] },
  { id: 'mies-rok-9.99-59.99', opis: 'mies. 9,99 / rok 59,99 USD', konw: KONW([0.01, 0.03, 0.065], 'cena ok. 2/3 mediany'),
    produkty: [{ id: 'mies', cena: 9.99, ...MIES, u: [0.6, 0.5, 0.4] }, { id: 'rok', cena: 59.99, u: [0.4, 0.5, 0.6] }] },
  { id: 'mies-9.99', opis: 'tylko miesięczna 9,99 USD', konw: KONW([0.01, 0.03, 0.06], 'jak wariant rynkowy'), produkty: [{ id: 'mies', cena: 9.99, ...MIES }] },
  { id: 'rok-59.99', opis: 'tylko roczna 59,99 USD', konw: KONW([0.008, 0.025, 0.05], 'tylko zobowiązanie roczne: niższa konwersja niż przy wyborze planu'), produkty: [{ id: 'rok', cena: 59.99 }] },
  { id: 'jednorazowy-19.99', opis: 'jednorazowe odblokowanie 19,99 USD', konw: KONW([0.012, 0.036, 0.08], 'jednorazowa niska cena'), produkty: [{ id: 'pelna', cena: 19.99 }] },
  { id: 'jednorazowy-49.99', opis: 'jednorazowe odblokowanie 49,99 USD', konw: KONW([0.01, 0.03, 0.06], 'jak wariant rynkowy'), produkty: [{ id: 'pelna', cena: 49.99 }] },
  { id: 'jednorazowy-99.99', opis: 'jednorazowe odblokowanie 99,99 USD', konw: KONW([0.006, 0.02, 0.04], 'cena blisko dożywotniego konkurentów'), produkty: [{ id: 'pelna', cena: 99.99 }] },
  { id: 'platna-z-gory-9.99', opis: 'płatne pobranie 9,99 USD, bez zakupów', konw: KONW([0.005, 0.015, 0.04], 'brak darmowej próby; skargi na płacenie przed wypróbowaniem (23 z 349)'), produkty: [{ id: 'pobranie', cena: 9.99 }] },
  { id: 'napiwek-2.99', opis: 'wszystko darmowe, napiwek 2,99 USD (zużywalny)', konw: KONW([0.002, 0.005, 0.01], 'dobrowolna wpłata'), produkty: [{ id: 'napiwek', cena: 2.99 }] },
];

function dane(w) {
  const sklepy = [];
  // Bez storefrontu PL: decyzja właściciela 2026-11-03 („Tak, bez PL, polski zostaje”; karta portfela 48, 01.11.2026).
  for (const [k, kr] of Object.entries(KRAJE).filter(([k]) => k !== 'pl')) for (const platforma of ['ios', 'android']) {
    const lok = kr.jez === 'en' ? LOK.en : kr.jez === 'pl' ? LOK.pl : LOK.inne;
    const produkty = w.produkty.map((p) => {
      const o = { id: p.id, cena_brutto: Math.round(p.cena * kr.wsp * 100) / 100 };
      if (p.platnosci_w_roku) Object.assign(o, { platnosci_w_roku: p.platnosci_w_roku, platnosci_zrodlo: p.platnosci_zrodlo });
      if (w.produkty.length > 1) o.udzial = udz(p.u, w.mix ?? MIX3);
      return o;
    });
    sklepy.push({
      platforma, kraj: k, vat: VAT(k), prowizja: PROW[platforma],
      ...(produkty.length > 1 ? { produkty } : { produkt: produkty[0] }),
      konkurenci: konkurenci(k),
      zalozenia: { ...WSPOLNE, lokalizacja_mnoznik: lok, ...(platforma === 'android' ? { android_do_ios: ANDROID } : {}), konwersja: w.konw },
      uwaga_ceny: `cena = cena US × ${kr.wsp} (współczynnik ceny brutto ${k}: ${WSP_ZR})`,
    });
  }
  return {
    data: DATA, waluta: 'USD', tryb: 'build', wariant: w.id, opis: w.opis, kursy: {},
    prog: { kwota: 500, waluta: 'USD', zrodlo: 'decyzja właściciela 2026-11-03: „500 USD/rok” netto, globalnie (docs/sztafeta.md)' },
    platformy: {
      ios: { koszty_roczne: 0, koszty_zrodlo: 'Apple Developer 99 USD/rok to koszt portfela (D-024); aplikacja offline bez płatnych usług tylko dla niej [ZAŁOŻENIE do potwierdzenia przez rolę 05]' },
      android: { koszty_roczne: 0, koszty_zrodlo: 'rejestracja Google Play 25 USD jednorazowo to koszt portfela (D-024, decyzja właściciela 2026-11-03)' },
    },
    sklepy,
  };
}

mkdirSync(join(DIR, 'warianty'), { recursive: true });
for (const w of WARIANTY) writeFileSync(join(DIR, 'warianty', `${w.id}.json`), JSON.stringify(dane(w), null, 1) + '\n');
writeFileSync(join(DIR, 'oplacalnosc-wlasna.json'), JSON.stringify(dane(WARIANTY[0]), null, 1) + '\n');
console.log(`zapisano oplacalnosc-wlasna.json i ${WARIANTY.length} wariantów w warianty/`);
