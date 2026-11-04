// Wygenerowane przez content-build z content/helplines.yaml (pnpm content:build). Nie edytuj ręcznie.
import type { HelplineEntry } from '@szkola/content-schema';

/** Wpis bez źródeł (zostają w content/helplines.yaml); pola jak w HelplineEntry z content-schema. */
export type AppHelpline = Omit<HelplineEntry, 'sources' | 'links'> & { links: readonly { label: string; url: string }[] };

export const HELPLINES: {
  checked: string;
  checkedText: string;
  reviewBy: string;
  abroadText: string;
  pointer: string;
  fallback: { text: string; online: readonly string[] };
  regions: Readonly<Record<string, string>>;
  regionsLabel: string;
  entries: readonly AppHelpline[];
} = {
  "checked": "2026-11-04",
  "checkedText": "Dane sprawdzone: 4 listopada 2026",
  "reviewBy": "2027-11-04",
  "abroadText": "W zagrożeniu życia dzwoń na lokalny numer alarmowy.",
  "pointer": "Telefony pomocy dla Twojego kraju znajdziesz w aplikacji, w ekranie „Pomoc”.",
  "fallback": {
    "text": "W zagrożeniu życia dzwoń na lokalny numer alarmowy.",
    "online": [
      "int-gambling-therapy"
    ]
  },
  "regions": {
    "GB-ENG": "Anglia",
    "GB-SCT": "Szkocja",
    "GB-WLS": "Walia",
    "GB-NIR": "Irlandia Północna",
    "CA-AB": "Alberta",
    "CA-BC": "Kolumbia Brytyjska",
    "CA-MB": "Manitoba",
    "CA-NB": "Nowy Brunszwik",
    "CA-NL": "Nowa Fundlandia i Labrador",
    "CA-NS": "Nowa Szkocja",
    "CA-ON": "Ontario",
    "CA-PE": "Wyspa Księcia Edwarda",
    "CA-QC": "Quebec",
    "CA-SK": "Saskatchewan",
    "CA-NT": "Terytoria Północno-Zachodnie",
    "CA-NU": "Nunavut",
    "CA-YT": "Jukon"
  },
  "regionsLabel": "Numery w regionach: wybierz swój region",
  "entries": [
    {
      "id": "us-ncpg",
      "claim": "H-US-1",
      "country": "US",
      "kind": "gambling",
      "name": "National Problem Gambling Helpline",
      "phone": "1-800-697-3738",
      "vanity": "1-800-MY-RESET",
      "sms": "1-800-697-3738",
      "hours": "całą dobę, 7 dni w tygodniu",
      "cost": "bez opłat za usługę; SMS według taryfy operatora",
      "language": "tłumacz ponad 240 języków",
      "operator": "National Council on Problem Gambling",
      "links": [
        {
          "label": "Telefon, SMS i czat: informacje",
          "url": "https://www.ncpgambling.org/help-treatment/about-the-national-problem-gambling-helpline/"
        }
      ]
    },
    {
      "id": "us-988",
      "claim": "H-US-2",
      "country": "US",
      "kind": "crisis",
      "name": "988 Suicide & Crisis Lifeline",
      "phone": "988",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "us-911",
      "claim": "H-US-3",
      "country": "US",
      "kind": "emergency",
      "name": "Numer alarmowy",
      "phone": "911",
      "links": []
    },
    {
      "id": "gb-ngh",
      "claim": "H-GB-1",
      "country": "GB",
      "regions": [
        "GB-ENG",
        "GB-SCT",
        "GB-NIR"
      ],
      "national": true,
      "kind": "gambling",
      "name": "National Gambling Helpline (Anglia, Szkocja, Irlandia Płn.)",
      "phone": "0808 8020 133",
      "hours": "całą dobę, 7 dni w tygodniu",
      "cost": "bezpłatnie",
      "operator": "GamCare",
      "links": []
    },
    {
      "id": "gb-wales",
      "claim": "H-GB-2",
      "country": "GB",
      "regions": [
        "GB-WLS"
      ],
      "kind": "gambling",
      "name": "NHS Wales Gambling Helpline",
      "phone": "0808 281 9265",
      "hours": "całą dobę",
      "cost": "bezpłatnie (także bez środków na koncie)",
      "operator": "Betsi Cadwaladr University Health Board",
      "links": []
    },
    {
      "id": "gb-ni-dunlewey",
      "claim": "H-GB-3",
      "country": "GB",
      "regions": [
        "GB-NIR"
      ],
      "kind": "gambling",
      "name": "Dunlewey Helpline",
      "phone": "08000 886 725",
      "cost": "bezpłatnie",
      "info": "Informacja o poradnictwie i wsparciu w okolicy.",
      "links": []
    },
    {
      "id": "gb-samaritans",
      "claim": "H-GB-4",
      "country": "GB",
      "kind": "crisis",
      "name": "Samaritans",
      "phone": "116 123",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "gb-ni-lifeline",
      "claim": "H-GB-6",
      "country": "GB",
      "regions": [
        "GB-NIR"
      ],
      "kind": "crisis",
      "name": "Lifeline",
      "phone": "0808 808 8000",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "gb-111",
      "claim": "H-GB-7",
      "country": "GB",
      "regions": [
        "GB-ENG",
        "GB-SCT",
        "GB-WLS"
      ],
      "kind": "crisis",
      "name": "NHS 111: opcja zdrowia psychicznego (w Walii: opcja 2)",
      "phone": "111",
      "links": []
    },
    {
      "id": "gb-999",
      "claim": "H-GB-5",
      "country": "GB",
      "kind": "emergency",
      "name": "Numer alarmowy",
      "phone": "999",
      "links": []
    },
    {
      "id": "ca-988",
      "claim": "H-CA-1",
      "country": "CA",
      "kind": "crisis",
      "name": "9-8-8: Suicide Crisis Helpline",
      "phone": "9-8-8",
      "sms": "9-8-8",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "ca-911",
      "claim": "H-CA-2",
      "country": "CA",
      "kind": "emergency",
      "name": "Numer alarmowy",
      "phone": "9-1-1",
      "links": []
    },
    {
      "id": "ca-on",
      "claim": "H-CA-3",
      "country": "CA",
      "regions": [
        "CA-ON"
      ],
      "kind": "gambling",
      "name": "ConnexOntario",
      "phone": "1-866-531-2600",
      "hours": "całą dobę",
      "cost": "bezpłatnie, poufnie",
      "links": []
    },
    {
      "id": "ca-bc",
      "claim": "H-CA-4",
      "country": "CA",
      "regions": [
        "CA-BC"
      ],
      "kind": "gambling",
      "name": "Gambling Support BC",
      "phone": "1-888-795-6111",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "ca-qc",
      "claim": "H-CA-5",
      "country": "CA",
      "regions": [
        "CA-QC"
      ],
      "kind": "gambling",
      "name": "Jeu : aide et référence",
      "phone": "1 800 461-0140",
      "phone_alt": [
        {
          "phone": "514 527-0140",
          "label": "Montreal i okolice"
        }
      ],
      "hours": "całą dobę",
      "cost": "bezpłatnie (numer 1 800)",
      "language": "francuski, angielski",
      "links": []
    },
    {
      "id": "ca-ab",
      "claim": "H-CA-6",
      "country": "CA",
      "regions": [
        "CA-AB"
      ],
      "kind": "gambling",
      "name": "24-Hour Addiction Helpline (uzależnienia, także hazard)",
      "phone": "1-866-332-2322",
      "hours": "całą dobę",
      "links": []
    },
    {
      "id": "ca-sk",
      "claim": "H-CA-7",
      "country": "CA",
      "regions": [
        "CA-SK"
      ],
      "kind": "gambling",
      "name": "Problem Gambling Help Line",
      "phone": "1-800-306-6789",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "ca-mb",
      "claim": "H-CA-8",
      "country": "CA",
      "regions": [
        "CA-MB"
      ],
      "kind": "gambling",
      "name": "Problem Gambling Helpline",
      "phone": "1-800-463-1554",
      "hours": "całą dobę",
      "operator": "Addictions Foundation of Manitoba",
      "links": []
    },
    {
      "id": "ca-nb",
      "claim": "H-CA-9",
      "country": "CA",
      "regions": [
        "CA-NB"
      ],
      "kind": "gambling",
      "name": "Linia uzależnień i zdrowia psychicznego (także hazard)",
      "phone": "1-866-355-5550",
      "hours": "całą dobę",
      "links": []
    },
    {
      "id": "ca-ns-crisis",
      "claim": "H-CA-11",
      "country": "CA",
      "regions": [
        "CA-NS"
      ],
      "kind": "crisis",
      "name": "Mental Health and Addictions Crisis Line",
      "phone": "1-888-429-8167",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "ca-pe",
      "claim": "H-CA-12",
      "country": "CA",
      "regions": [
        "CA-PE"
      ],
      "kind": "gambling",
      "name": "PEI Gambling Support Line",
      "phone": "1-855-255-4255",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "language": "angielski, francuski",
      "links": []
    },
    {
      "id": "ca-nl",
      "claim": "H-CA-13",
      "country": "CA",
      "regions": [
        "CA-NL"
      ],
      "kind": "gambling",
      "name": "Gambling Help Line",
      "phone": "811",
      "hours": "całą dobę",
      "cost": "bezpłatnie, poufnie",
      "links": []
    },
    {
      "id": "jp-center",
      "claim": "H-JP-1",
      "country": "JP",
      "kind": "gambling",
      "name": "精神保健福祉センター / 保健所 (ośrodek w prefekturze)",
      "info": "Ministerstwo zdrowia kieruje najpierw do najbliższego ośrodka zdrowia (保健所) albo ośrodka zdrowia psychicznego (精神保健福祉センター); ośrodek zdrowia psychicznego jest w każdej prefekturze.",
      "links": [
        {
          "label": "Gdzie szukać pomocy (ministerstwo zdrowia)",
          "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000070789.html"
        }
      ]
    },
    {
      "id": "jp-inochi-sos",
      "claim": "H-JP-2",
      "country": "JP",
      "kind": "crisis",
      "name": "#いのちSOS",
      "phone": "0120-061-338",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "jp-yorisoi",
      "claim": "H-JP-2",
      "country": "JP",
      "kind": "crisis",
      "name": "よりそいホットライン",
      "phone": "0120-279-338",
      "phone_alt": [
        {
          "phone": "0120-279-226",
          "label": "z prefektury Fukushima"
        }
      ],
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "language": "japoński; wybór porady także w językach obcych",
      "links": []
    },
    {
      "id": "jp-119",
      "claim": "H-JP-3",
      "country": "JP",
      "kind": "emergency",
      "name": "Straż pożarna i pogotowie",
      "phone": "119",
      "links": []
    },
    {
      "id": "br-sus",
      "claim": "H-BR-1",
      "country": "BR",
      "kind": "gambling",
      "name": "SUS: teleporada w Meu SUS Digital, UBS i CAPS",
      "cost": "bezpłatnie, poufnie",
      "info": "Teleporada w aplikacji albo na stronie Meu SUS Digital, z logowaniem kontem gov.br.",
      "links": [
        {
          "label": "Informacja Ministerstwa Zdrowia",
          "url": "https://agenciagov.ebc.com.br/noticias/202610/campanha-do-ministerio-da-saude-orienta-sobre-riscos-das-apostas-online-e-atendimento-disponivel-no-sus"
        }
      ]
    },
    {
      "id": "br-cvv",
      "claim": "H-BR-2",
      "country": "BR",
      "kind": "crisis",
      "name": "CVV",
      "phone": "188",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "br-samu",
      "claim": "H-BR-3",
      "country": "BR",
      "kind": "emergency",
      "name": "SAMU (pogotowie)",
      "phone": "192",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "fr-jis",
      "claim": "H-FR-1",
      "country": "FR",
      "kind": "gambling",
      "name": "Joueurs Info Service",
      "phone": "09 74 75 13 13",
      "hours": "codziennie 8.00–23.00",
      "cost": "bez dopłat, anonimowo",
      "links": []
    },
    {
      "id": "fr-3114",
      "claim": "H-FR-2",
      "country": "FR",
      "kind": "crisis",
      "name": "3114: numer zapobiegania samobójstwom",
      "phone": "3114",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "fr-15",
      "claim": "H-FR-3",
      "country": "FR",
      "kind": "emergency",
      "name": "Pogotowie (SAMU)",
      "phone": "15",
      "phone_alt": [
        {
          "phone": "112",
          "label": "europejski numer alarmowy"
        }
      ],
      "links": []
    },
    {
      "id": "tw-1925",
      "claim": "H-TW-2",
      "country": "TW",
      "kind": "crisis",
      "name": "1925 安心專線",
      "phone": "1925",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "tw-centers",
      "claim": "H-TW-4",
      "country": "TW",
      "kind": "support",
      "name": "社區心理衛生中心 (ośrodki zdrowia psychicznego)",
      "info": "Poradnictwo psychologiczne w ośrodkach zdrowia psychicznego przy urzędach zdrowia każdego powiatu i miasta.",
      "links": [
        {
          "label": "Informacja rządowa",
          "url": "https://www.gov.tw/News_Content_26_826198"
        }
      ]
    },
    {
      "id": "tw-119",
      "claim": "H-TW-3",
      "country": "TW",
      "kind": "emergency",
      "name": "Numer alarmowy",
      "phone": "119",
      "links": []
    },
    {
      "id": "vn-115",
      "claim": "H-VN-3",
      "country": "VN",
      "kind": "emergency",
      "name": "Pogotowie ratunkowe",
      "phone": "115",
      "cost": "bezpłatnie",
      "review_by": "2027-02-04",
      "links": []
    },
    {
      "id": "vn-113",
      "claim": "H-VN-3",
      "country": "VN",
      "kind": "emergency",
      "name": "Policja",
      "phone": "113",
      "cost": "bezpłatnie",
      "review_by": "2027-02-04",
      "links": []
    },
    {
      "id": "de-bioeg",
      "claim": "H-DE-1",
      "country": "DE",
      "kind": "gambling",
      "name": "BIÖG-Beratungstelefon zur Glücksspielsucht",
      "phone": "0800 1 37 27 00",
      "hours": "pon.–czw. 10–22, pt.–niedz. 10–18 (bez 24.12 i 31.12)",
      "cost": "bezpłatnie, anonimowo",
      "links": []
    },
    {
      "id": "de-pl",
      "claim": "H-DE-4",
      "country": "DE",
      "kind": "gambling",
      "name": "Porada w języku polskim (Caritas)",
      "phone": "0173 29 37 359",
      "hours": "terminy po uzgodnieniu",
      "cost": "bezpłatnie, anonimowo",
      "language": "polski",
      "links": []
    },
    {
      "id": "de-ts",
      "claim": "H-DE-2",
      "country": "DE",
      "kind": "crisis",
      "name": "TelefonSeelsorge",
      "phone": "0800 111 0 111",
      "phone_alt": [
        {
          "phone": "0800 111 0 222"
        },
        {
          "phone": "116 123"
        }
      ],
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": []
    },
    {
      "id": "de-112",
      "claim": "H-DE-3",
      "country": "DE",
      "kind": "emergency",
      "name": "Numer alarmowy",
      "phone": "112",
      "links": []
    },
    {
      "id": "int-gambling-therapy",
      "claim": "H-INT-1",
      "country": "*",
      "kind": "gambling",
      "name": "Gambling Therapy (Gordon Moody, Wielka Brytania)",
      "info": "Bezpłatne porady praktyczne i wsparcie emocjonalne online dla każdego, kogo dotyka problem z hazardem; poufnie.",
      "links": [
        {
          "label": "Gambling Therapy",
          "url": "https://www.gamblingtherapy.org/"
        }
      ]
    }
  ]
};
