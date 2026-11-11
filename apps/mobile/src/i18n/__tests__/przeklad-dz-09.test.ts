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
describe("fr: jedna forma zwracania się w całym słowniku (09-lokalizacja-001)", () => {
  it("fr: brak form „tu” w żadnym kluczu", () => {
    const trafienia = Object.entries(slownik("fr")).filter(([, v]) => TU_FR.test(czysty(v))).map(([k]) => k);
    expect(trafienia).toEqual([]);
  });
  it("fr: stan miejsca na stole ICM zgodny z listą stosów („vous”)", () => {
    expect(slownik("fr")["scenario.table.you"]).toBe("vous");
  });
});
