import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  // Try multiple possible paths for the static files
  const possiblePaths = [
    path.resolve(process.cwd(), "dist/public"),
    path.resolve(process.cwd(), "dist"),
    path.resolve(process.cwd(), "public"),
    path.resolve(process.cwd(), "../dist/public"),
    path.resolve(process.cwd(), "../public"),
    "/app/dist/public",
    "/app/public",
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
      distPath = p;
      console.log(`[Static] Found frontend files at: ${distPath}`);
      break;
    }
  }

  if (!distPath) {
    console.error("[Static] Frontend files NOT FOUND in any location!");
    console.error("[Static] Searched paths:", possiblePaths);
    console.error("[Static] CWD:", process.cwd());
    console.error("[Static] Files in CWD:", fs.readdirSync(process.cwd()));
    
    // Return error for all non-API routes
    app.use("*", (c) => {
      if (c.req.path.startsWith("/api/")) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ 
        error: "Frontend not built", 
        cwd: process.cwd(),
        searched: possiblePaths,
      }, 500);
    });
    return;
  }

  // Serve static files from the found directory
  const relativeRoot = path.relative(process.cwd(), distPath) || ".";
  app.use("*", serveStatic({ root: relativeRoot }));

  // SPA fallback: serve index.html for all non-API routes
  app.notFound((c) => {
    if (c.req.path.startsWith("/api/")) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      return c.json({ error: "Frontend not built" }, 500);
    }
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
