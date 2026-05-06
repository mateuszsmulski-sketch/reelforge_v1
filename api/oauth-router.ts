import { z } from "zod";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";

const JWT_SECRET = new TextEncoder().encode(
  process.env.APP_SECRET || "reelforge-local-secret-key-2025"
);

async function createToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

// ─── Google OAuth ───
async function getGoogleUserInfo(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch Google user info");
  return res.json() as Promise<{
    id: string;
    email: string;
    name: string;
    picture?: string;
  }>;
}

// ─── Apple OAuth ───
async function getAppleUserInfo(idToken: string) {
  // Apple returns user info in the ID token (JWT)
  // We decode it without verification for the demo
  const parts = idToken.split(".");
  if (parts.length !== 3) throw new Error("Invalid Apple ID token");
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name || payload.email?.split("@")[0] || "Apple User",
    picture: undefined,
  };
}

export const oauthRouter = createRouter({
  // ── Google ──
  googleAuthUrl: publicQuery.query(() => {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const redirectUri = `${process.env.PUBLIC_URL || "http://localhost:3000"}/api/trpc/oauth.googleCallback`;

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "token");
    url.searchParams.set("scope", "openid email profile");
    url.searchParams.set("prompt", "select_account");

    return { url: url.toString() };
  }),

  googleCallback: publicQuery
    .input(z.object({ accessToken: z.string() }))
    .mutation(async ({ input }) => {
      const googleUser = await getGoogleUserInfo(input.accessToken);
      const db = getDb();

      // Find or create user
      let [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, googleUser.email));

      if (!user) {
        const [result] = await db.insert(users).values({
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture,
          unionId: `google_${googleUser.id}`,
          authProvider: "google",
        });
        const userId = Number(result.insertId);
        [user] = await db.select().from(users).where(eq(users.id, userId));
      } else {
        await db
          .update(users)
          .set({ lastSignInAt: new Date(), name: googleUser.name || user.name })
          .where(eq(users.id, user.id));
      }

      const token = await createToken(user.id);
      return {
        token,
        user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
      };
    }),

  // ── Apple ──
  appleAuthUrl: publicQuery.query(() => {
    const clientId = process.env.APPLE_CLIENT_ID || "";
    const redirectUri = `${process.env.PUBLIC_URL || "http://localhost:3000"}/api/trpc/oauth.appleCallback`;

    const url = new URL("https://appleid.apple.com/auth/authorize");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code id_token");
    url.searchParams.set("scope", "name email");
    url.searchParams.set("response_mode", "fragment");

    return { url: url.toString() };
  }),

  appleCallback: publicQuery
    .input(z.object({ idToken: z.string() }))
    .mutation(async ({ input }) => {
      const appleUser = await getAppleUserInfo(input.idToken);
      const db = getDb();

      let [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, appleUser.email));

      if (!user) {
        const [result] = await db.insert(users).values({
          email: appleUser.email,
          name: appleUser.name,
          unionId: `apple_${appleUser.id}`,
          authProvider: "apple",
        });
        const userId = Number(result.insertId);
        [user] = await db.select().from(users).where(eq(users.id, userId));
      } else {
        await db
          .update(users)
          .set({ lastSignInAt: new Date() })
          .where(eq(users.id, user.id));
      }

      const token = await createToken(user.id);
      return {
        token,
        user: { id: user.id, name: user.name, email: user.email },
      };
    }),
});
