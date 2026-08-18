import { Elysia, t } from "elysia";
import { db } from "../../db";
import { users } from "../../db/schema/users";

export const sampleRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error(error);
      return { error: "Failed to fetch users" };
    }
  })
  .post("/", async ({ body }) => {
    try {
      const result = await db.insert(users).values({
        name: body.name,
        email: body.email,
      }).returning();
      return result[0];
    } catch (error) {
      console.error(error);
      return { error: "Failed to create user" };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    }),
  });
