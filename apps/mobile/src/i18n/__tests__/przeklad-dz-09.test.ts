import { SLOWNIKI } from "../slowniki";

// Sesja DZ (rola 09, tryb fix): poprawki po recenzji DW (09-lokalizacja-001, 002, 004, 006, 007).
// Rejestr zwracania się: scripts/i18n/wspolne.mjs:67-68 (fr „vous”, pt formalnie bez „você”, spacja nierozdzielająca przed ? ! : ;).

type Wezel = { [k: string]: string | Wezel };
const splaszcz = (o: Wezel, p = "", w: Record<string, string> = {}): Record<string, string> => {
  for (const [k, v] of Object.entries(o)) typeof v === "string" ? (w[p + k] = v) : splaszcz(v, `${p}${k}.`, w);
  return w;
};
const slownik = (j: string) => splaszcz((SLOWNIKI as unknown as Record<string, Wezel>)[j]);
// Znaczniki {{t:id|Nazwa}} i parametry nie są tekstem do oceny formy zwracania się.
const czysty = (s: string) => s.replace(/\{\{[^}]*\}\}/g, " ");

// Formy drugiej osoby „tu” (fr: tu, toi, ton, ta, tes, te, t’ przed samogłoską; rozkaźnik tu: Entraîne).
const TU_FR = /(^|[^\p{L}'’-])(tu|toi|ton|ta|tes|te|t[’'])(?![\p{L}])|\bEntraîne\b/iu;
// pt formalnie: bez tu/tua/teu/te/ti, bez końcówek -as/-es 2 os. oraz rozkaźnika tu (Treina, Começa w poleceniu jest formą formalną 3 os.).
const TU_PT = /\b(tu|tua|tuas|teu|teus|te|ti|contigo|precisas|completas|vais|podes|queres|tens|és|estás|fazes|escolhes|vês|sabes|jogas|consegues|deves|treina)\b/iu;

describe("fr: jedna forma zwracania się w całym słowniku (09-lokalizacja-001)", () => {
  it("fr: brak form „tu” w żadnym kluczu", () => {
    const trafienia = Object.entries(slownik("fr")).filter(([, v]) => TU_FR.test(czysty(v))).map(([k]) => k);
    expect(trafienia).toEqual([]);
  });
  it("fr: stan miejsca na stole ICM zgodny z listą stosów („vous”)", () => {
    expect(slownik("fr")["scenario.table.you"]).toBe("vous");
  });
});

describe("pt: jedna forma zwracania się w całym słowniku (09-lokalizacja-002)", () => {
  it("pt: brak form „tu” w żadnym kluczu", () => {
    const trafienia = Object.entries(slownik("pt")).filter(([, v]) => TU_PT.test(czysty(v))).map(([k]) => k);
    expect(trafienia).toEqual([]);
  });
  it("pt: stan miejsca na stole ICM zgodny z listą stosów („Eu”)", () => {
    expect(slownik("pt")["scenario.table.you"]).toBe("Eu");
  });
});

describe("fr: spacja nierozdzielająca przed ? ! : ; i w « » w scenario.* (09-lokalizacja-004)", () => {
  it("brak spacji ASCII przed „:”, „;”, „?”, „!”", () => {
    const trafienia = Object.entries(slownik("fr")).filter(([k, v]) => k.startsWith("scenario.") && / [:;?!]/.test(v)).map(([k]) => k);
    expect(trafienia).toEqual([]);
  });
  it("brak spacji ASCII w „ … ” (cudzysłowy francuskie)", () => {
    const trafienia = Object.entries(slownik("fr")).filter(([k, v]) => k.startsWith("scenario.") && /« | »/.test(v)).map(([k]) => k);
    expect(trafienia).toEqual([]);
  });
});

