import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/vibe_test",
  },
  verbose: true,
  strict: true,
});
