/**
 * Powód szerokości zakresu w spocie: zdanie z pola `because` reguły, która ten spot ocenia (`content/pl/rules.yaml`,
 * `check.spots`): rfi → R-M3-001/002/003/006/009/010, vs-open → R-M4-003/004/005/014, push/call → R-M11-002/003/007/011/012.
 */
export const RANGE_REASON: Record<string, string> = {
  'rfi.utg': 'rfiUtg',
  'rfi.hj': 'rfiMid',
  'rfi.co': 'rfiMid',
  'rfi.btn': 'rfiBtn',
  'rfi.sb': 'rfiSb',
  'nine.rfi.utg': 'nineEarly',
  'nine.rfi.utg1': 'nineEarly',
  'nine.rfi.utg2': 'nineEarly',
  'nine.rfi.lj': 'nineLj',
  'nine.rfi.hj': 'rfiMid',
  'nine.rfi.co': 'rfiMid',
  'nine.rfi.btn': 'rfiBtn',
  'nine.rfi.sb': 'rfiSb',
  'vs-open.btn-vs-co': 'btnVsCo',
  'nine.vs-open.btn-vs-co': 'btnVsCo',
  'vs-open.sb-vs-btn': 'sbVsBtn',
  'nine.vs-open.sb-vs-btn': 'sbVsBtn',
  'vs-open.bb-vs-btn': 'bbVsBtn',
  'nine.vs-open.bb-vs-btn': 'bbVsBtn',
  'vs-open.bb-vs-sb': 'bbVsSb',
  'nine.vs-open.bb-vs-sb': 'bbVsSb',
  'push.sb-5': 'pushSb',
  'push.sb-10': 'pushSb',
  'push.sb-15': 'pushSb',
  'push.sb-10-ante': 'pushAnte',
  'push.btn-3max': 'push3max',
  'push.sb-3max': 'push3max',
  'call.bb-5': 'callBb',
  'call.bb-10': 'callBb',
  'call.bb-15': 'callBb',
  'call.bb-10-ante': 'callBb',
  'call.sb-vs-btn-3max': 'call3max',
  'call.bb-vs-btn-3max': 'callBb',
  'call.bb-vs-two-3max': 'call3maxTwo',
};

/**
 * Kierunek powodu: „tight” tłumaczy wąski zakres (pokazujemy go przy ręce poza zakresem), „wide” szeroki (przy ręce
 * w zakresie). Przy ręce na granicy pokazujemy każdy. Bez tego zdanie „bo” przeczyłoby decyzji (recenzja BG, nr 10).
 */
export const REASON_DIRECTION: Record<string, 'tight' | 'wide'> = {
  rfiUtg: 'tight',
  rfiMid: 'wide',
  rfiBtn: 'wide',
  rfiSb: 'wide',
  nineEarly: 'tight',
  nineLj: 'tight',
  btnVsCo: 'wide',
  sbVsBtn: 'wide',
  bbVsBtn: 'wide',
  bbVsSb: 'wide',
  pushSb: 'wide',
  pushAnte: 'wide',
  push3max: 'tight',
  callBb: 'tight',
  call3max: 'tight',
  call3maxTwo: 'tight',
};
