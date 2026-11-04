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
  "abroadText": "Jeśli rozpoznajesz u siebie sygnały problemu z hazardem albo masz wątpliwości, porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego. W nagłym zagrożeniu, także gdy ty albo ktoś bliski myśli o odebraniu sobie życia, od razu dzwoń na lokalny numer alarmowy.",
  "pointer": "Ten sam kontakt znajdziesz w aplikacji, w ekranie „Pomoc”.",
  "fallback": {
    "text": "Jeśli rozpoznajesz u siebie sygnały problemu z hazardem albo masz wątpliwości, porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego. W nagłym zagrożeniu, także gdy ty albo ktoś bliski myśli o odebraniu sobie życia, od razu dzwoń na lokalny numer alarmowy.",
    "online": [
      "int-gambling-therapy"
    ]
  },
  "regions": {},
  "regionsLabel": "Numery w regionach",
  "entries": [
    {
      "id": "int-gambling-therapy",
      "claim": "H-INT-1",
      "country": "*",
      "kind": "gambling",
      "name": "Gambling Therapy (Gordon Moody)",
      "info": "Bezpłatne porady praktyczne i wsparcie emocjonalne online dla każdego, kogo dotyka hazard; poufnie.",
      "links": [
        {
          "label": "Gambling Therapy",
          "url": "https://www.gamblingtherapy.org/"
        }
      ]
    }
  ]
};
