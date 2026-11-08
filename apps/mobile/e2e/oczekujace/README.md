# Flowy oczekujące (rola 07 E3, D-189)

Flowy PR-01, PR-03–PR-05 i drugiego języka pisane przed ekranami roli 08 (strategia.md §5.3). Leżą poza
`flows: '*.yaml'` w `../config.yaml`, więc `e2e-ios.yml` ich nie uruchamia i nie blokują scalenia, dopóki nie przejdą.
Rola 08 przenosi flow do `apps/mobile/e2e/` w commicie, w którym przechodzi na symulatorze (jak testy z `tests/akceptacja/`, D-175).

Uruchomienie lokalne (macOS z Xcode, aplikacja zbudowana na symulator):
`maestro test $(node apps/mobile/e2e/helplines-env.mjs) apps/mobile/e2e/oczekujace/05-ocena-poziomu.yaml`

Kontrakt z ekranami (to samo co w testach RNTL, `tests/akceptacja/ekrany/teksty.ts`): nazwy przycisków ze słownika
interakcji roli 04 („Pomiń”, „Dalej”, „Zacznij”, „Zakończ”, „Wróć do lekcji”), odpowiedzi `option-<i>` i lekcje
`lesson-<id>` jak w obecnej aplikacji; nowe identyfikatory: `dzis-cwiczenia`, `dzis-powtorki`, `dzis-scenariusz`
(wejścia z ekranu „Dziś” do startu aktywności), `akcja-<i>` (akcje scenariusza), `ustawienia`, `ustawienia-jezyk`,
`jezyk-<kod>`. Teksty treści przychodzą z `content/` przez `helplines-env.mjs` (`-e`), nie są wpisane w YAML.

Po wdrożeniu ekranu powitania i oceny poziomu (BR-ONB) flowy 01–04 zaczynają się od powitania: dodaj w nich po
`launchApp` krok `runFlow: wspolne/za-powitaniem.yaml` (podprzepływ w `apps/mobile/e2e/wspolne/`, poza `*.yaml`; flowy oczekujące wołają `../wspolne/`) (warunkowy, nie psuje przebiegu bez powitania).
