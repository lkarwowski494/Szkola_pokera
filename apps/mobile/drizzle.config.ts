import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/data/user/schema.ts',
  out: './drizzle',
});
