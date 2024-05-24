import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/drizzle.schema.ts',
  out: './src/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
