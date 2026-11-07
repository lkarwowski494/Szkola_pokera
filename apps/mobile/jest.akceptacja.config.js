// Testy oczekujące ekranów (D-175 wariant a, D-171: Jest + jest-expo + RNTL): poza `pnpm run ci`, uruchamiane `pnpm test:akceptacja`.
// Pliki leżą w tests/akceptacja/ekrany/; rola 08 przenosi test do src/**/__tests__/ w commicie, który go zazielenia.
const glowna = require('./package.json').jest;
module.exports = {
  ...glowna,
  rootDir: __dirname,
  roots: ['<rootDir>/../../tests/akceptacja/ekrany'],
  testMatch: ['**/*.test.tsx'],
  moduleNameMapper: { ...glowna.moduleNameMapper, '^@/(.*)$': '<rootDir>/src/$1' },
};
