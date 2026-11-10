# ko · S1 — uwagi recenzenta
## Pokrycie
| Plik | Przeczytany w całości (pl i przekład)? | Uwagi |
|---|---|---|
| content/ko/areas.yaml | tak | brak pól tekstowych; identyczny z pl (id, generatory, reguły) |
| content/ko/modules.yaml | tak | 14 modułów; id, order, phase, recommended jak w pl |
| content/ko/ranges/spots.yaml | tak | 269 linii; pola nietekstowe (id, hero, path, solver, uncertain, akcje w groups) identyczne z pl — sprawdzone też skryptem; znaczniki {{t:}} i {{n:}} zgodne linia po linii |
| content/ko/helplines.yaml | tak | TREŚĆ KRYTYCZNA; pola nietekstowe (claim, id, country, kind, name, url, quote, daty) identyczne z pl — sprawdzone skryptem; różnią się tylko pointer, fallback.text, regions_label, info |
| content/ko/terms-def.yaml | tak | 162 definicje porównane z polem def tego samego klucza w content/terms.yaml; zestaw i kolejność kluczy identyczne |
| content/ko/terms-nazwy.yaml | tak | 162 nazwy, żadnej null; zestaw kluczy jak w terms.yaml. Glosariusz docs/lokalizacja/glosariusz.md: przeczytany nagłówek z zasadami; tabela jest generowana z content/terms.yaml (pola pl, en, def), które przeczytałem w całości — samej tabeli glosariusza nie czytałem wiersz po wierszu |

Wersji en nie otwierałem (nie było potrzeby).

## Znaleziska bez poprawki mechanicznej
| Waga | plik:linia | Opis (pl → przekład) | Propozycja |
|---|---|---|---|
| NISKIE | content/ko/terms-def.yaml:51, 52 | Definicje straight-draw i oesd używają w tekście skrótu „OESD”, a nazwa terminu w terms-nazwy to „양방향 스트레이트 드로우”. Definicja oesd zaczyna się „OESD는 open-ended straight draw의 약자로” (pl: „Skrót od open-ended straight draw”), choć nagłówek hasła w ko nie jest skrótem. Zrozumiałe, ale nazwa i definicja nie są w pełni zgrane. | Decyzja terminologiczna (nie mechaniczna): albo zostawić, albo w 51 napisać „양방향 스트레이트 드로우(OESD)”, w 52 „OESD(open-ended straight draw)라고도 하며, …”. |
| NISKIE | content/ko/terms-def.yaml:101 | „밸류 베팅에는” (pl: „zakładami dla wartości”); nazwa terminu value-bet to „밸류 벳”. Sens poprawny. | Ewentualnie „밸류 벳에는”. |
| NISKIE | content/ko/terms-def.yaml:108 vs content/ko/modules.yaml:10 | „plan rozdania”: w definicji SPR „핸드 계획”, w tytule modułu m9 „핸드 플랜”. | Ujednolicić z resztą przekładu (lekcje m9 — poza tą częścią). |
| NISKIE | content/ko/terms-def.yaml:130 | pl: „na ile pełnych okrążeń (orbit)” → „몇 바퀴(오빗)”; pominięte „pełnych”. Bez wpływu na wniosek. | — |

## Do ujednolicenia skryptem
Brak. W plikach części nie ma form odrzuconych w terms-nazwy (플랍, 프리플랍, 아웃츠, 너츠, 씨벳, 기대값: 0 trafień w terms-def, spots, helplines, modules).

## Do sprawdzenia (pewność ≤ 80%, pytania do rodzimego użytkownika)
- content/ko/modules.yaml:8 — tytuł m7 „턴 플레이” (pl: „Turn”), podczas gdy m8 to samo „리버”. Być może celowe (samo „턴” jest wieloznaczne), ale niespójne z sąsiednimi tytułami.
- content/ko/helplines.yaml:13 — „‘도움말’ 화면에서도” : nazwa ekranu zgodna z interfejsem (ko.json: help/title = „도움말”); partykuła „도” („także”) nie ma odpowiednika w pl („znajdziesz w aplikacji, w ekranie »Pomoc«”), ale w kontekście ramki w lekcji jest naturalna i nie zmienia sensu. „도움말” zwykle znaczy „pomoc do programu”; czy dla ekranu z pomocą przy problemach z hazardem rodzimy użytkownik nie wolałby „도움”/„도움 받기” — pytanie do interfejsu (część U1), tu tylko zgodność.
- content/ko/ranges/spots.yaml:62 — „{{n:pf.3bet.oop-total}}까지 3벳” obok „7.5bb로 3벳” (linie 55, 70): dwa wzorce na „3-bet do X”; oba poprawne.
- content/ko/terms-nazwy.yaml — nazwy oceniam jako przyjęte w koreańskim żargonie pokerowym (transliteracje: 팟, 레인지, 에퀴티, C벳, 3벳, 림프, 넛, 웻…). Mniej utarte, do potwierdzenia przez gracza: „웻니스” (wetness), „컨덴스드” (condensed), „M 비율” (M-ratio), „레이크 캡”, „파산 위험” (risk of ruin), „스택 오프”. Wariant pisowni: „오프수트” (spotyka się też „오프슈트”), „수티드” (też „수딧”).
- content/ko/terms-def.yaml:132 — „자유롭게, 신중하게 또는 공격적으로” oddaje pl „swobodnie, zachowawczo albo agresywnie” z tą samą dwuznacznością wyliczenia.

## Pytania do źródła pl
Brak.

## Treść krytyczna (tylko jeśli była w części): wynik porównania zdanie po zdaniu
helplines.yaml (ko) wobec content/helplines.yaml:
- checked / review_by: 2026-11-04 / 2027-11-04 — identyczne.
- pointer: „Ten sam kontakt znajdziesz w aplikacji, w ekranie »Pomoc«.” → „같은 연락처는 앱의 ‘도움말’ 화면에서도 확인할 수 있습니다.” — zgodne (nazwa ekranu jak w interfejsie ko).
- fallback.text, zd. 1: „Jeśli rozpoznajesz u siebie sygnały problemu z hazardem albo masz wątpliwości, porozmawiaj z lekarzem albo specjalistą zdrowia psychicznego.” → „…징후가 보이거나 확신이 서지 않는다면 의사나 정신건강 전문가와 상담하세요.” — zgodne, nic nie złagodzone.
- fallback.text, zd. 2: „W nagłym zagrożeniu, także gdy ty albo ktoś, kogo znasz, myśli o odebraniu sobie życia, od razu dzwoń na lokalny numer alarmowy.” → „긴급한 위험이 있을 때, 그리고 본인이나 아는 사람이 스스로 목숨을 끊으려는 생각을 하고 있을 때에도 즉시 지역 긴급 전화번호로 전화하세요.” — zgodne („także gdy”, „od razu”, „lokalny numer alarmowy” zachowane; żaden numer nie został dodany).
- fallback.claim, online, regions (puste), regions_label („Numery w regionach” → „지역별 전화번호”) — zgodne.
- entries[0]: id, claim H-INT-1, country '*', kind, name „Gambling Therapy (Gordon Moody)”, etykieta i adres https://www.gamblingtherapy.org/, źródła z cytatami — identyczne znak w znak.
- entries[0].info: „Bezpłatne porady praktyczne i wsparcie emocjonalne online dla każdego, kogo dotyka hazard; poufnie.” → wszystkie elementy obecne (bezpłatne, praktyczne porady, wsparcie emocjonalne, online, każdy dotknięty hazardem, poufnie); nic dodanego (brak „anonimowo” i liczby języków). Jedna poprawka stylu NISKIE w S1.json.
Wynik: brak znalezisk KRYT/WYS/ŚR w treści krytycznej.
