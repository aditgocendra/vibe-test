import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api/v1" }).post(
  "/register",
  async ({ body, set }) => {
    const result = await registerUser(body.name, body.email, body.password);

    if ("error" in result) {
      set.status = 400;
      return { error: result.error };
    }

    return { data: result.data };
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
    error({ code, error, set }) {
      // Handle Elysia validation errors (e.g., missing fields, bad email)
      if (code === "VALIDATION") {
        set.status = 400;
        return { error: error.message };
      }
    },
  }
);
