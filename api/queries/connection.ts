import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@db/schema";
import * as relations from "@db/relations";
import { mkdirSync } from "fs";
import { dirname } from "path";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

export function getDb() {
  if (!instance) {
    const dbPath = process.env.DATABASE_PATH || "/tmp/reelforge.db";
    
    // Ensure directory exists
    try {
      mkdirSync(dirname(dbPath), { recursive: true });
    } catch {
      // ignore
    }
    
    const client = new Database(dbPath);
    client.exec("PRAGMA journal_mode = WAL;");
    
    instance = drizzle(client, { schema: fullSchema });
    
    console.log(`[DB] SQLite connected: ${dbPath}`);
  }
  return instance;
}
