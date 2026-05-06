import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
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

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload.sub ? Number(payload.sub) : null;
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        name: z.string().min(2).max(100),
        email: z.string().email().max(320),
        password: z.string().min(6).max(100),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (existing) {
        throw new Error("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(input.password, 12);

      const [result] = await db.insert(users).values({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      const userId = Number(result.insertId);
      const token = await createToken(userId);

      return { token, user: { id: userId, name: input.name, email: input.email } };
    }),

  login: publicQuery
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (!user || !user.password) {
        throw new Error("Invalid email or password");
      }

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) {
        throw new Error("Invalid email or password");
      }

      await db
        .update(users)
        .set({ lastSignInAt: new Date() })
        .where(eq(users.id, user.id));

      const token = await createToken(user.id);

      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const authHeader = ctx.req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.slice(7);
    const userId = await verifyToken(token);
    if (!userId) return null;

    const db = getDb();
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar: users.avatar,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    return user ?? null;
  }),
});
