import { db } from "../db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

export async function registerUser(name: string, email: string, password: string) {
  // Validate password length
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter" };
  }

  // Check if email already registered
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    return { error: "Email sudah terdaftar" };
  }

  // Hash password using Bun native bcrypt
  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  // Insert new user
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  return { data: "ok" };
}
