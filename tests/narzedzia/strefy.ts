// Jedyna lista stref testowych (D-177, docs/jakosc/strategia.md §3.3). Testy kalendarzowe iterują po niej w jednym procesie.
export const STREFY_TESTOWE = [
  'America/New_York', // rynek główny US, zmiana czasu
  'Europe/Warsaw', // właściciel, język pl, zmiana czasu UE
  'America/St_Johns', // CA, przesunięcie −3:30 ze zmianą czasu
  'Asia/Tokyo', // JP, bez zmiany czasu
  'America/Sao_Paulo', // BR, bez zmiany czasu od 2019
  'Asia/Kathmandu', // +5:45
  'Australia/Lord_Howe', // zmiana czasu o 30 min
  'Pacific/Kiritimati', // +14
  'Pacific/Pago_Pago', // −11
] as const;

/** Rok bieżący i następny (wzorce roli: przejścia w roku bieżącym i następnym). */
export function lataTestowe(teraz = Date.now()): number[] {
  const r = new Date(teraz).getUTCFullYear();
  return [r, r + 1];
}
