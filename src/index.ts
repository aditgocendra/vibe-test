import { Elysia } from "elysia";
import { sampleRoutes } from "./modules/sample/routes";

const app = new Elysia()
  .get("/", () => ({ status: "OK", service: "vibe-test-backend" }))
  .use(sampleRoutes)
  .listen(process.env.PORT || 3000);

console.log(`🦊 Elysia server is running at ${app.server?.hostname}:${app.server?.port}`);
export type App = typeof app;
