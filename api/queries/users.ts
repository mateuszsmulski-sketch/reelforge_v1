import { eq } from "drizzle-orm";
import { getDb } from "./connection";
import { users } from "@db/schema";

export async function findUserByUnionId(unionId: string) {
  const db = getDb();
  return db.select().from(users).where(eq(users.unionId, unionId)).get() ?? null;
}

export async function upsertUser(data: {
  unionId: string;
  name?: string;
  email?: string;
  avatar?: string;
  lastSignInAt?: Date;
}) {
  const db = getDb();
  
  const existing = db.select().from(users).where(eq(users.unionId, data.unionId)).get();
  
  if (existing) {
    db.update(users)
      .set({ name: data.name, email: data.email, avatar: data.avatar })
      .where(eq(users.id, existing.id))
      .run();
    return { ...existing, ...data };
  }
  
  const result = db.insert(users).values(data).returning().get();
  return result;
}
