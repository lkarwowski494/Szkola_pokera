// HL/HW (D-1672): skala tekstu zrzutów z `?fs=` (np. 3.12 = AX5); jedno miejsce dla zrzutowego `Text` i `Dimensions`. Brak lub zła wartość = 1 (tekst domyślny).
export const skalaTekstu: number = Number(new URLSearchParams(globalThis.location?.search ?? '').get('fs') ?? '1') || 1;
