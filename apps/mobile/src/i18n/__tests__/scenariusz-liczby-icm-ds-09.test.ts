import { SLOWNIKI } from "../slowniki";

// Sesja DS (rola 09): przekład scenario.numbers.* (D-967) i scenario.icm.* (D-989) w 10 słownikach poza pl/en.
// Kontrola strukturalna: tekst różny od en (poza nazwanymi wyjątkami), te same parametry i znaczniki {{t:…}} co w pl,
// termin „bubble” zgodny z nazwą terminu w kursie danego języka.
const JEZYKI = ["de", "es", "fr", "it", "ja", "ko", "pt", "pt-BR", "vi", "zh-Hant"] as const;
const NUMBERS = ["cbet", "sizeOpen", "size3bet", "limp", "icm", "overcardsFold", "overcardsCall"];
const ICM = ["tableLabel", "foldedOne", "foldedMany", "bubble", "prizes", "place", "noPrizeThird", "noPrizeFourth", "stacksLabel", "you", "rival", "stackValue", "rowLabel", "wholeStack", "rewards"];
// Wyjątki „taki sam jak en”: wzorzec zapisu liczby z jednostką (NBSP przed „bb”) i etykieta „kto, wartość” bez słów.
const WYJATKI = new Set(["icm.stackValue"]);
const ZLACZONE_Z_EN = new Set(["icm.rowLabel"]);
// Nazwa terminu bubble w kursie (content/<język>/terms-nazwy.yaml, odczyt 2026-11-11).
const BUBBLE: Record<string, string> = { de: "Bubble", es: "Burbuja", fr: "Bulle", it: "Bolla", ja: "バブル", ko: "버블", pt: "Bolha", "pt-BR": "Bolha", vi: "Bubble", "zh-Hant": "泡沫" };
const SLOWA_RE = /\{\{[^}]*\}\}/g;

type Wezel = { [k: string]: string | Wezel };
const pobierz = (j: string, grupa: "numbers" | "icm", k: string): string => {
  const s = (SLOWNIKI as unknown as Record<string, { scenario: Record<string, Wezel> }>)[j]?.scenario[grupa]?.[k];
  if (typeof s !== "string") throw new Error(`brak klucza scenario.${grupa}.${k} w ${j}`);
  return s;
};
const znaczniki = (s: string) => [...new Set((s.match(SLOWA_RE) ?? []).map((m) => m.replace(/\|[^}]*\}\}$/, "}}")))].sort();

describe("scenario.numbers.* i scenario.icm.* przełożone (DS)", () => {
  for (const j of JEZYKI) {
    for (const [grupa, klucze] of [["numbers", NUMBERS], ["icm", ICM]] as const) {
      for (const k of klucze) {
        const id = `${grupa === "numbers" ? "numbers" : "icm"}.${k}`;
        it(`${j} ${id}`, () => {
          const tekst = pobierz(j, grupa, k);
          const en = pobierz("en", grupa, k);
          const pl = pobierz("pl", grupa, k);
          if (!WYJATKI.has(id) && !ZLACZONE_Z_EN.has(id)) expect(tekst).not.toBe(en);
          expect(znaczniki(tekst)).toEqual(znaczniki(pl));
          expect(tekst.trim()).not.toBe("");
        });
      }
    }
    it(`${j}: termin bubble z content/${j}/terms-nazwy.yaml`, () => {
      expect(pobierz(j, "icm", "bubble")).toContain(`{{t:bubble|${BUBBLE[j]}}}`);
    });
  }
  it("ja i zh-Hant: rowLabel z separatorem języka", () => {
    expect(pobierz("ja", "icm", "rowLabel")).toBe("{{kto}}、{{wartosc}}");
    expect(pobierz("zh-Hant", "icm", "rowLabel")).toBe("{{kto}}，{{wartosc}}");
  });
});
