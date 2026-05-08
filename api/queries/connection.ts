import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

export function getDb() {
  if (!instance) {
    const url = process.env.DATABASE_PATH || "file:/tmp/reelforge.db";
    
    const client = createClient({ url });
    
    instance = drizzle(client, { schema: fullSchema });
    
    console.log(`[DB] LibSQL connected: ${url}`);
  }
  return instance;
}
