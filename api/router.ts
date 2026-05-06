import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { oauthRouter } from "./oauth-router";
import { videoRouter } from "./video-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  oauth: oauthRouter,
  video: videoRouter,
});

export type AppRouter = typeof appRouter;
