// Wygenerowane przez content-build z content/helplines.yaml (pnpm content:build). Nie edytuj ręcznie.

export interface AppHelpline {
  id: string;
  name: string;
  phone?: string;
  hours?: string;
  cost?: string;
  info?: string;
  links: readonly { label: string; url: string }[];
}

export const HELPLINES: { checked: string; checkedText: string; abroadText: string; entries: readonly AppHelpline[] } = {
  "checked": "2026-10-05",
  "checkedText": "Dane sprawdzone: 5 października 2026",
  "abroadText": "Za granicą: lokalny numer pomocy lub 112.",
  "entries": [
    {
      "id": "behavioral",
      "name": "Telefon Zaufania uzależnienia behawioralne",
      "phone": "801 889 880",
      "hours": "codziennie 17.00–22.00",
      "cost": "opłata według taryfy operatora",
      "info": "Prowadzi go Instytut Psychologii Zdrowia PTP; numer podaje Krajowe Centrum Przeciwdziałania Uzależnieniom.",
      "links": [
        {
          "label": "Test „Czy mam problem z hazardem?” i baza placówek pomocy",
          "url": "https://uzaleznieniabehawioralne.pl/"
        }
      ]
    },
    {
      "id": "crisis",
      "name": "Telefon dla dorosłych w kryzysie emocjonalnym",
      "phone": "116 123",
      "hours": "całą dobę",
      "cost": "bezpłatnie",
      "links": [
        {
          "label": "Czat",
          "url": "https://116sos.pl/"
        }
      ]
    },
    {
      "id": "gamblers-anonymous",
      "name": "Anonimowi Hazardziści",
      "hours": "mityngi w całej Polsce i online",
      "cost": "bezpłatnie",
      "links": [
        {
          "label": "Lista mityngów",
          "url": "https://anonimowihazardzisci.org/"
        }
      ]
    },
    {
      "id": "emergency",
      "name": "W sytuacji zagrożenia życia",
      "phone": "112",
      "links": []
    }
  ]
};
