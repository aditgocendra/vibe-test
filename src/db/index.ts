import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/users";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/vibe_test";
const client = postgres(connectionString);

export const db = drizzle(client, { schema });
