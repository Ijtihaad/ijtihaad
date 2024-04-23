import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './libs/common/src/drizzle/drizzle.schema.ts',
  out: './libs/common/src/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});