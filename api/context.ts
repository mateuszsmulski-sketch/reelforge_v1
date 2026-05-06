import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";

const JWT_SECRET = new TextEncoder().encode(
  process.env.APP_SECRET || "reelforge-local-secret-key-2025"
);

async function verifyLocalToken(headers: Headers): Promise<User | undefined> {
  const authHeader = headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return undefined;

  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    const userId = payload.sub ? Number(payload.sub) : null;
    if (!userId) return undefined;

    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    return user ?? undefined;
  } catch {
    return undefined;
  }
}

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try Kimi OAuth first
  try {
    ctx.user = await authenticateRequest(opts.req.headers);
  } catch {
    // Kimi auth failed, try local auth
  }

  // If no Kimi user, try local JWT auth
  if (!ctx.user) {
    ctx.user = await verifyLocalToken(opts.req.headers);
  }

  return ctx;
}
