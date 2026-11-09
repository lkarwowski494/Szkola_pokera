/**
 * Tokeny Szkoły Pokera: kierunek I „Stół w granacie” (D-118, D-119), krój tytułów Literata 600 (D-120).
 * Propozycja modułu motywu dla roli 08 (zastępuje apps/mobile/src/theme/tokens.ts po implementacji).
 * Jedno źródło prawdy: makiety E3 biorą CSS z tego pliku (narzedzia/tokeny.mjs → ekrany/tokeny.css),
 * a tabela kontrastu (kontrast-e3.md) jest liczona z par `pary` niżej, w czterech wariantach.
 *
 * Reguły znaczenia kolorów (jedna barwa = jedno znaczenie, HIG Color):
 * - złoto (`gold*`) znaczy wyłącznie „ty”: twoje miejsce, twój wybór, twój przedział. Nigdy wygrana, nigdy „dobrze”.
 * - kier (`cardRed`) tylko na kartach (kolor karty zawsze z symbolem, NFR-DOST-001).
 * - `alert` tylko komunikaty o błędzie działania (zakup, import); stopnie oceny nie mają koloru, niosą je znak i słowo.
 */

const light = {
  bg: '#E9EDF5', // chłodna biel z nutą granatu
  surface: '#FFFFFF', // komórki list grupowanych
  separator: '#C9D1E3',
  ink: '#0A1430', // granat z ikony poprzedniej aplikacji
  muted: '#46557A',
  link: '#0A1430',
  frame: '#0A1430', // rama stołu
  felt1: '#23694D', // sukno, środek
  felt2: '#174A36', // sukno, brzeg (dawny feltDeep)
  onFelt: '#FFFDF7',
  onFeltMuted: '#D3E4DA',
  seat: '#12234A',
  seatInk: '#FFFDF7',
  seatMuted: '#AEBBD8', // „czeka”, „pas”
  seatEdge: '#7E93C2',
  card: '#FFFDF7', // kość słoniowa
  cardEdge: '#E4DCC8',
  cardInk: '#0A1430',
  cardRed: '#C8102E',
  cardBlue: '#2456A6', // karo w talii czterokolorowej (ustawienie, 08-F15, D-284)
  cardGreen: '#2A7A3B', // trefl w talii czterokolorowej
  gold: '#E2B850', // znacznik i obwódka „ty” (element graficzny)
  goldText: '#F8DC8E', // tekst „ty” na suknie i na granacie
  goldOnBg: '#7E5B0C', // tekst „ty” na jasnym tle
  foldFill: '#15452F', // część „pas” w pasku strategii (kreskowana)
  foldStripe: '#3F8564',
  raiseFill: '#FFFDF7', // część „przebicie”
  scaleEdge: '#8CC0A3', // obwódki przedziałów skali stopni
  actionBg: '#0A1430', // pasek akcji przed decyzją
  actionInk: '#FFFDF7',
  actionMuted: '#B9C5E0',
  actionEdge: '#8EA1CC', // granice między segmentami
  actionOutline: '#0A1430', // granica całego paska od tła (w jasnym = wypełnienie)
  primaryBg: '#0A1430',
  primaryInk: '#FFFDF7',
  alert: '#A3330B',
  shadow: '#0A143040',
};

type Paleta = typeof light;

const dark: Paleta = {
  ...light,
  bg: '#0A1430',
  surface: '#13214A',
  separator: '#2B3D6B',
  ink: '#F2EEE3',
  muted: '#B0BCD8',
  link: '#F2EEE3',
  frame: '#1E3466',
  felt1: '#1C5A41',
  felt2: '#103426',
  seat: '#0F1C3D',
  seatEdge: '#8296C6',
  card: '#F2EEE3',
  goldOnBg: '#E9BC4C',
  actionBg: '#15254C',
  actionInk: '#F2EEE3',
  actionMuted: '#B0BCD8',
  actionOutline: '#8EA1CC',
  primaryBg: '#F2EEE3',
  primaryInk: '#0A1430',
  alert: '#FF9E7A',
  shadow: '#00000066',
};

/** „Zwiększ kontrast” (HIG Color/Accessibility): ciemniejsze tła, mocniejsze obwódki, tekst drugi bliżej pierwszego. */
const lightHigh: Paleta = {
  ...light,
  muted: '#2C3A5E',
  separator: '#8E9AB8',
  felt1: '#1B5940',
  felt2: '#123D2C',
  onFeltMuted: '#EEF5F0',
  seatMuted: '#D4DCEE',
  seatEdge: '#B7C5E6',
  scaleEdge: '#B5D6C4',
  actionMuted: '#DCE3F2',
  actionEdge: '#C3CFEA',
  goldOnBg: '#5E4407',
  cardEdge: '#A89C7E',
};

const darkHigh: Paleta = {
  ...dark,
  muted: '#D5DCEC',
  separator: '#5A6C9C',
  frame: '#3A55A0',
  felt1: '#174D37',
  felt2: '#0C2A1E',
  onFeltMuted: '#EEF5F0',
  seatMuted: '#D4DCEE',
  seatEdge: '#B7C5E6',
  scaleEdge: '#B5D6C4',
  actionMuted: '#DCE3F2',
  actionEdge: '#C3CFEA',
  actionOutline: '#C3CFEA',
};

export const kolory = { light, dark, lightHigh, darkHigh } as const;

/**
 * Pary do pomiaru kontrastu: [pierwszy plan, tło, próg]. Tylko pary, które naprawdę sąsiadują (WCAG 1.4.11 „adjacent colors”).
 * Próg 3: tekst ≥ 24 pt albo ≥ 19 pt pogrubiony oraz elementy interfejsu i grafika niosąca informację.
 */
export const pary: Record<string, [keyof Paleta, keyof Paleta, number]> = {
  'tekst na tle': ['ink', 'bg', 4.5],
  'tekst drugi na tle': ['muted', 'bg', 4.5],
  'link na tle': ['link', 'bg', 4.5],
  'tekst w komórce': ['ink', 'surface', 4.5],
  'tekst drugi w komórce': ['muted', 'surface', 4.5],
  'tekst „ty” na tle': ['goldOnBg', 'bg', 4.5],
  'tekst „ty” w komórce': ['goldOnBg', 'surface', 4.5],
  'błąd działania na tle': ['alert', 'bg', 4.5],
  'błąd działania w komórce': ['alert', 'surface', 4.5],
  'tekst na suknie (środek)': ['onFelt', 'felt1', 4.5],
  'tekst na suknie (brzeg)': ['onFelt', 'felt2', 4.5],
  'tekst drugi na suknie (środek)': ['onFeltMuted', 'felt1', 4.5],
  'tekst drugi na suknie (brzeg)': ['onFeltMuted', 'felt2', 4.5],
  'tekst „ty” na suknie (środek)': ['goldText', 'felt1', 4.5],
  'tekst „ty” na suknie (brzeg)': ['goldText', 'felt2', 4.5],
  'znacznik „ty” na suknie': ['gold', 'felt1', 3],
  'obwódka przedziału na suknie': ['scaleEdge', 'felt1', 3],
  'część „przebicie” obok „pas”': ['raiseFill', 'foldFill', 3],
  'pasek strategii na suknie (brzeg osi)': ['onFelt', 'felt1', 3],
  'karta na suknie': ['card', 'felt1', 3],
  'indeks karty (czarny)': ['cardInk', 'card', 4.5],
  'indeks karty (czerwony)': ['cardRed', 'card', 4.5],
  'indeks karty (niebieski)': ['cardBlue', 'card', 4.5],
  'indeks karty (zielony)': ['cardGreen', 'card', 4.5],
  'nazwa miejsca': ['seatInk', 'seat', 4.5],
  'stan miejsca': ['seatMuted', 'seat', 4.5],
  'tekst „ty” na miejscu': ['goldText', 'seat', 4.5],
  'obwódka miejsca na ramie': ['seatEdge', 'frame', 3],
  'obwódka „ty” na ramie': ['gold', 'frame', 3],
  'akcja': ['actionInk', 'actionBg', 4.5],
  'akcja, dopisek': ['actionMuted', 'actionBg', 4.5],
  'granica segmentów akcji': ['actionEdge', 'actionBg', 3],
  'granica paska akcji na tle': ['actionOutline', 'bg', 3],
  'przycisk główny': ['primaryInk', 'primaryBg', 4.5],
  'przycisk główny na tle': ['primaryBg', 'bg', 3],
};

/**
 * Typografia (pt). Tytuły Literata 600 (D-120), treść krój systemowy (SF Pro) z Dynamic Type.
 * Przy dużym tekście: treść skaluje się do AX5 bez limitu (17 → 53 pt); tytuły od rozmiaru AX1 przechodzą na krój systemowy
 * (semibold) i mają sufit `maxW` jako ułamek szerokości ekranu, żeby najdłuższe słowo mieściło się w wierszu bez dzielenia
 * wyrazów (dzielenie nie jest warunkiem: patrz design-spec.md, „Duży tekst”).
 */
export const typografia = {
  tytulKroj: 'Literata',
  tytulWaga: '600',
  tytulOdAX1: 'system', // krój systemowy semibold od rozmiaru AX1
  skala: {
    tytulDuzy: { size: 34, line: 41, kroj: 'tytul', textStyle: 'largeTitle', maxW: 0.10 }, // „Dziś”, duże tytuły ekranów
    slowoStopnia: { size: 34, line: 38, kroj: 'tytul', textStyle: 'largeTitle', maxW: 0.085 }, // na suknie: mniej miejsca (rama + sukno)
    tytul: { size: 28, line: 34, kroj: 'tytul', textStyle: 'title1', maxW: 0.10 }, // tytuł zadania, opis ręki
    indeksKarty: { size: 36, line: 36, kroj: 'tytul', textStyle: null, maxW: null }, // stały: rysunek karty, nie tekst do czytania
    tresc: { size: 17, line: 24, kroj: 'system', textStyle: 'body', maxW: null },
    przypis: { size: 15, line: 21, kroj: 'system', textStyle: 'subheadline', maxW: null },
    drobny: { size: 13, line: 17, kroj: 'system', textStyle: 'footnote', maxW: null },
    miejsce: { size: 13, line: 15, kroj: 'system', textStyle: null, maxW: null }, // na stole: przy AX opis tekstem pod stołem
    miejsceStan: { size: 11, line: 13, kroj: 'system', textStyle: null, maxW: null },
  },
  cyfry: 'tabular-nums, lining-nums', // liczniki, procenty, ceny
} as const;

/** Odstępy: jednostka 4 pt; każdy odstęp jej wielokrotnością. */
export const odstep = { j: 4, xs: 4, s: 8, m: 12, l: 16, xl: 20, xxl: 24, x3: 32, x4: 40 } as const;

/** Promienie według hierarchii: im większy i bardziej „meblowy” obiekt, tym większy promień. */
export const promien = {
  karta: 8, // karta do gry
  przedzial: 10, // przedział skali stopni, znacznik
  przycisk: 14, // pasek akcji, przycisk główny, komórki list grupowanych (iOS)
  sukno: 32, // sukno pod wynikiem
  rama: 40, // rama stołu pod wynikiem
  owal: 'polowa wysokosci', // stół z góry
  miejsce: 'pelny', // pigułka miejsca
} as const;

/** Ruch (ms). Przy „Ogranicz ruch”: brak przesunięć, tylko przenikanie 0–120 ms. Każdy ruch przerywalny dotknięciem. */
export const ruch = {
  ocena: { czas: 240, krzywa: 'easeOut', opis: 'równe segmenty paska przesuwają granice do częstotliwości solvera (80/20)' },
  znacznik: { czas: 160, opoznienie: 200, krzywa: 'easeOut', opis: 'złoty znacznik opada nad twoim wyborem' },
  karty: { czas: 200, krzywa: 'easeOut', opis: 'nowe zadanie: karty wjeżdżają na sukno' },
  ograniczRuch: { czas: 120, krzywa: 'linear', opis: 'przenikanie zamiast przesunięć' },
} as const;

/** Haptyka (expo-haptics). Dźwięk domyślnie wyłączony (sesje w komunikacji); gdy włączony, zawsze razem z haptyką. */
export const haptyka = {
  wyborAkcji: 'selection',
  ocenaZgodna: 'impactLight',
  ocenaDopuszczalna: 'impactLight',
  ocenaBlad: 'notificationWarning',
  zakupUdany: 'notificationSuccess',
  bladDzialania: 'notificationError',
} as const;
