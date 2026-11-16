/// <reference types="jest" />
// 04-studio-projektowe-006 (audyt HH, decyzja właściciela 2026-11-16 „(a) 1. zdanie tytułem”): podział sytuacji na tytuł i resztę.
// Dotyczy wszystkich języków aplikacji: spacja po kropce (łaciński, hangul, cyrylica), znaki pełnej szerokości (ja, zh) bez spacji, danda (hi), „؟” (ar).
import { podzielSytuacje } from '../zdanie';

describe('04-studio-projektowe-006: pierwsze zdanie sytuacji jako tytuł', () => {
  it('pl: tytuł = pierwsze zdanie, reszta bez zmian i bez wiodącej spacji (SC-29)', () => {
    const t1 = 'Na riverze masz najwyższą parę (top pair), jesteś na Buttonie, a duży blind (big blind, BB) czeka (check).';
    const t2 = 'Rywal to pasywny gracz rekreacyjny (recreational player): VPIP od ok. 35%, a PFR niższy o ponad 10 punktów. Stawiasz czy czekasz?';
    expect(podzielSytuacje(`${t1} ${t2}`)).toEqual({ tytul: t1, reszta: t2 });
  });
  it('skrót „ok.” i liczba z kropką nie kończą zdania; porządkowa „3. Mai” (de) też nie', () => {
    expect(podzielSytuacje('VPIP od ok. 35% i 12.5 bb. Dalej.')).toEqual({ tytul: 'VPIP od ok. 35% i 12.5 bb.', reszta: 'Dalej.' });
    expect(podzielSytuacje('Am 3. Mai spielst du. Dann folgt der Flop.')).toEqual({ tytul: 'Am 3. Mai spielst du.', reszta: 'Dann folgt der Flop.' });
  });
  it('„np. tzn.” przed małą literą nie dzieli', () => {
    expect(podzielSytuacje('Masz parę, np. króle, na riverze. Co robisz?')).toEqual({ tytul: 'Masz parę, np. króle, na riverze.', reszta: 'Co robisz?' });
  });
  it('ja i zh: „。” bez spacji, także „！” i „？”; nawias zamykający wchodzi do tytułu', () => {
    expect(podzielSytuacje('リバーであなたはトップペアを持っています。相手はパッシブです。')).toEqual({ tytul: 'リバーであなたはトップペアを持っています。', reszta: '相手はパッシブです。' });
    expect(podzielSytuacje('在河牌你有頂對，你在按鈕位。對手是被動的玩家：VPIP約 35%。')).toEqual({ tytul: '在河牌你有頂對，你在按鈕位。', reszta: '對手是被動的玩家：VPIP約 35%。' });
    expect(podzielSytuacje('你有頂對（top pair）。對手過牌！你下注嗎？')).toEqual({ tytul: '你有頂對（top pair）。', reszta: '對手過牌！你下注嗎？' });
  });
  it('ko, vi: kropka i spacja (bez wielkich liter w hangulu)', () => {
    expect(podzielSytuacje('리버에서 당신은 탑 페어를 들고 버튼에 있습니다. 상대는 패시브합니다.')).toEqual({ tytul: '리버에서 당신은 탑 페어를 들고 버튼에 있습니다.', reszta: '상대는 패시브합니다.' });
    expect(podzielSytuacje('Ở river bạn có đôi cao nhất. Đối thủ là người chơi giải trí.')).toEqual({ tytul: 'Ở river bạn có đôi cao nhất.', reszta: 'Đối thủ là người chơi giải trí.' });
  });
  it('hi (danda) i ar (؟)', () => {
    expect(podzielSytuacje('रिवर पर आपके पास टॉप पेयर है। प्रतिद्वंद्वी निष्क्रिय है।')).toEqual({ tytul: 'रिवर पर आपके पास टॉप पेयर है।', reszta: 'प्रतिद्वंद्वी निष्क्रिय है।' });
    expect(podzielSytuacje('هل تراهن؟ الخصم سلبي.')).toEqual({ tytul: 'هل تراهن؟', reszta: 'الخصم سلبي.' });
  });
  it('jedno zdanie, brak znaku końca, pusty tekst: cały tekst tytułem, reszta null', () => {
    expect(podzielSytuacje('Stawiasz czy czekasz?')).toEqual({ tytul: 'Stawiasz czy czekasz?', reszta: null });
    expect(podzielSytuacje('Bez kropki na końcu')).toEqual({ tytul: 'Bez kropki na końcu', reszta: null });
    expect(podzielSytuacje('')).toEqual({ tytul: '', reszta: null });
  });
});
