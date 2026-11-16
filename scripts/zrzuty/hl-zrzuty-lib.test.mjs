// HW (08-programista-502): identyczne zrzuty są wykrywane. Testy z przeglądarką (pełna wysokość ekranu) są w hl-zrzuty-przegladarka.test.mjs — `pnpm test:zrzuty`, lokalnie przy narzędziu zrzutów (KO-114: CI nie ma Chromium).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { powtorzoneZrzuty } from './hl-zrzuty-lib.mjs';

test('08-programista-502: zrzuty różnych ekranów z tym samym md5 są zgłaszane', () => {
  const katalog = fs.mkdtempSync(path.join(os.tmpdir(), 'hl-md5-'));
  try {
    fs.writeFileSync(path.join(katalog, 'a.png'), 'jedno');
    fs.writeFileSync(path.join(katalog, 'b.png'), 'jedno');
    fs.writeFileSync(path.join(katalog, 'c.png'), 'drugie');
    assert.deepEqual(powtorzoneZrzuty(katalog, ['a.png', 'b.png', 'c.png']), [['a.png', 'b.png']]);
    assert.deepEqual(powtorzoneZrzuty(katalog, ['a.png', 'c.png']), []);
  } finally { fs.rmSync(katalog, { recursive: true, force: true }); }
});
