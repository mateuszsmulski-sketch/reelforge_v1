import { getDb } from "./queries/connection";

export async function runMigrations() {
  try {
    const db = getDb();
    
    // SQLite with Drizzle ORM auto-creates tables based on schema
    // We just need to trigger a query to ensure connection works
    db.select().from(getDb()._.fullSchema.users).limit(0).all();
    
    console.log("[DB] SQLite ready");
    return { success: true, message: "SQLite database ready" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[DB] Error:", msg);
    return { success: false, error: msg };
  }
}
