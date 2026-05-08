import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { createOAuthCallbackHandler } from "./kimi/auth";
import { Paths } from "@contracts/constants";
import { runMigrations } from "./migrations";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.get("/api/health", (c) => c.json({ status: "ok", time: Date.now() }));

// Debug endpoint - shows available env vars (no secrets)
app.get("/api/debug", (c) => {
  const vars = Object.keys(process.env)
    .filter(k => !k.toLowerCase().includes("secret") && !k.toLowerCase().includes("password") && !k.toLowerCase().includes("token"))
    .reduce((acc, k) => { acc[k] = process.env[k]?.slice(0, 20) + "..."; return acc; }, {} as Record<string, string>);
  return c.json({ 
    message: "If you see no MYSQL_ or DATABASE_ vars, Railway DB is not connected to this service",
    envVars: vars,
    hasDbUrl: !!(process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQLHOST),
  });
});

// Manual DB init endpoint (call from browser if auto-migration fails)
app.get("/api/init-db", async (c) => {
  try {
    await runMigrations();
    return c.json({ success: true, message: "Database initialized" });
  } catch (err) {
    return c.json({ success: false, error: err instanceof Error ? err.message : String(err) }, 500);
  }
});

app.get(Paths.oauthCallback, createOAuthCallbackHandler());
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  // Auto-migrate on startup
  await runMigrations();

  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}
