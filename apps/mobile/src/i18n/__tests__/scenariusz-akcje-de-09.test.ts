import i18n, { ustawJezyk } from "../index";
import { SLOWNIKI } from "../slowniki";

// Sesja DE (rola 09): przekład scenario.action.* (D-871/KO-066, D-902), forma „preflop” (D-887, D-903) i spacja
// nierozdzielająca przed „bb” w play.log.* i scenario.action.* (NIS-DA-01, D-904). Tabela to wyrenderowane teksty
// (znaczniki {{t:…}} podstawione); zmiana tekstu albo terminu w słowniku wymaga świadomej zmiany tabeli.
const NBSP = " ";
const OCZEKIWANE: Record<string, Record<string, string>> = {
  de: {
    fold: "Fold",
    check: "Check",
    call: "Call",
    limp: "Limp",
    raise: "Raise",
    threeBet: "3-Bet",
    allIn: "All-in",
    betSmall: "kleine C-Bet",
    betBig: "große C-Bet",
    raiseTo: "Raise auf 2.5 bb",
    callPay: "Call 1.5 bb",
    allInAmount: "All-in 10 bb",
  },
  es: {
    fold: "retirarse",
    check: "pasar",
    call: "igualar",
    limp: "limp",
    raise: "subida",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "c-bet pequeño",
    betBig: "c-bet grande",
    raiseTo: "subida a 2.5 bb",
    callPay: "igualar 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  fr: {
    fold: "se coucher",
    check: "check",
    call: "suivre",
    limp: "limp",
    raise: "relance",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "petit c-bet",
    betBig: "gros c-bet",
    raiseTo: "relance à 2.5 bb",
    callPay: "suivre 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  it: {
    fold: "fold",
    check: "check",
    call: "chiamo",
    limp: "limp",
    raise: "rilancio",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "c-bet piccola",
    betBig: "c-bet grande",
    raiseTo: "rilancio a 2.5 bb",
    callPay: "chiamo 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  pt: {
    fold: "desisto",
    check: "passo",
    call: "pago",
    limp: "limp",
    raise: "aumento",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "c-bet pequeno",
    betBig: "c-bet grande",
    raiseTo: "aumento para 2.5 bb",
    callPay: "pago 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  "pt-BR": {
    fold: "desistir",
    check: "passar",
    call: "pagar",
    limp: "limp",
    raise: "aumentar",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "c-bet pequeno",
    betBig: "c-bet grande",
    raiseTo: "aumentar para 2.5 bb",
    callPay: "pagar 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  vi: {
    fold: "bỏ bài",
    check: "check",
    call: "theo",
    limp: "limp",
    raise: "tố",
    threeBet: "3-bet",
    allIn: "all-in",
    betSmall: "c-bet nhỏ",
    betBig: "c-bet lớn",
    raiseTo: "tố lên 2.5 bb",
    callPay: "theo 1.5 bb",
    allInAmount: "all-in 10 bb",
  },
  ja: {
    fold: "フォールド",
    check: "チェック",
    call: "コール",
    limp: "リンプ",
    raise: "レイズ",
    threeBet: "3ベット",
    allIn: "オールイン",
    betSmall: "小さなCベット",
    betBig: "大きなCベット",
    raiseTo: "2.5 bbにレイズ",
    callPay: "1.5 bbコール",
    allInAmount: "10 bbオールイン",
  },
  ko: {
    fold: "폴드",
    check: "체크",
    call: "콜",
    limp: "림프",
    raise: "레이즈",
    threeBet: "3벳",
    allIn: "올인",
    betSmall: "작은 C벳",
    betBig: "큰 C벳",
    raiseTo: "2.5 bb로 레이즈",
    callPay: "1.5 bb 콜",
    allInAmount: "10 bb 올인",
  },
  "zh-Hant": {
    fold: "棄牌",
    check: "過牌",
    call: "跟注",
    limp: "溜入",
    raise: "加注",
    threeBet: "3-bet",
    allIn: "全下",
    betSmall: "小額持續下注",
    betBig: "大額持續下注",
    raiseTo: "加注到 2.5 bb",
    callPay: "跟注1.5 bb",
    allInAmount: "全下10 bb",
  },
};
const KWOTY = { amountPay: "1.5", amountTo: "2.5", amountAll: "10" } as const;

describe("scenario.action.* w 10 językach (D-902)", () => {
  for (const [j, o] of Object.entries(OCZEKIWANE)) {
    it(`${j}: nazwy i frazy z kwotą`, async () => {
      await ustawJezyk(j as never);
      const t = i18n.t.bind(i18n);
      const a = (k: string) => t(`scenario.action.${k}`);
      const kw = (k: keyof typeof KWOTY) =>
        t(`scenario.action.${k}`, { bb: KWOTY[k] });
      const wynik: Record<string, string> = {};
      for (const k of [
        "fold",
        "check",
        "call",
        "limp",
        "raise",
        "threeBet",
        "allIn",
        "betSmall",
        "betBig",
      ])
        wynik[k] = a(k);
      wynik.raiseTo = t("scenario.action.withAmount", {
        akcja: a("raise"),
        kwota: kw("amountTo"),
      });
      wynik.callPay = t("scenario.action.withAmount", {
        akcja: a("call"),
        kwota: kw("amountPay"),
      });
      wynik.allInAmount = t("scenario.action.withAmount", {
        akcja: a("allIn"),
        kwota: kw("amountAll"),
      });
      expect(wynik).toEqual(o);
      for (const v of Object.values(wynik)) expect(v).not.toMatch(/\{\{|^\s*$/);
    });
  }
  afterAll(async () => {
    await ustawJezyk("pl");
  });
});

describe("jednostka bb: spacja nierozdzielająca (NIS-DA-01, D-904)", () => {
  const zbierz = (o: unknown, p = ""): [string, string][] =>
    typeof o === "string"
      ? [[p, o]]
      : o && typeof o === "object"
        ? Object.entries(o).flatMap(([k, v]) => zbierz(v, p ? `${p}.${k}` : k))
        : [];
  for (const j of Object.keys(SLOWNIKI)) {
    it(`${j}: play.log.* i scenario.action.* bez „}}bb” i bez zwykłej spacji przed „bb”`, () => {
      const s = SLOWNIKI[j as keyof typeof SLOWNIKI] as unknown as Record<
        string,
        Record<string, unknown>
      >;
      const wpisy = [
        ...zbierz(s.play?.log, "play.log"),
        ...zbierz(s.scenario?.action, "scenario.action"),
      ];
      expect(wpisy.length).toBeGreaterThan(10);
      for (const [k, v] of wpisy) {
        expect({ k, zle: /\}\}bb|\}\} bb/.test(v) }).toEqual({ k, zle: false });
        if (/bb/.test(v.replace(/\{\{[^}]*\}\}/g, "")))
          expect({ k, nbsp: v.includes(`}}${NBSP}bb`) }).toEqual({
            k,
            nbsp: true,
          });
      }
    });
  }
});

describe("scenario.street.preflop: jedna forma, małymi literami poprawna w zdaniu (D-887, D-903)", () => {
  const FORMA: Record<string, string> = {
    pl: "preflop",
    en: "preflop",
    de: "preflop",
    es: "preflop",
    fr: "preflop",
    it: "preflop",
    pt: "preflop",
    "pt-BR": "preflop",
    vi: "preflop",
    ja: "プリフロップ",
    ko: "프리플롭",
    "zh-Hant": "翻牌前",
  };
  for (const [j, f] of Object.entries(FORMA)) {
    it(`${j}: „${f}”`, () => {
      const s = SLOWNIKI[j as keyof typeof SLOWNIKI] as unknown as {
        scenario: { street: { preflop: string } };
      };
      expect(s.scenario.street.preflop.toLowerCase()).toBe(f);
    });
  }
});
