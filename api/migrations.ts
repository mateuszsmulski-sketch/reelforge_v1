import { createClient } from "@libsql/client";

export async function runMigrations() {
  const url = process.env.DATABASE_PATH || "file:/tmp/reelforge.db";
  
  const client = createClient({ url });
  
  try {
    // Create users table (idempotent - safe to run multiple times)
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unionId TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        name TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'user' NOT NULL,
        authProvider TEXT DEFAULT 'local' NOT NULL,
        createdAt INTEGER DEFAULT (unixepoch()) NOT NULL,
        updatedAt INTEGER DEFAULT (unixepoch()) NOT NULL,
        lastSignInAt INTEGER DEFAULT (unixepoch()) NOT NULL
      )
    `);
    console.log("[DB] Users table OK");

    // Create videos table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT NOT NULL,
        prompt TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending' NOT NULL,
        videoUrl TEXT,
        thumbnailUrl TEXT,
        duration INTEGER DEFAULT 5,
        ratio TEXT DEFAULT '9:16' NOT NULL,
        createdAt INTEGER DEFAULT (unixepoch()) NOT NULL,
        updatedAt INTEGER DEFAULT (unixepoch()) NOT NULL
      )
    `);
    console.log("[DB] Videos table OK");

    client.close();
    return { success: true, message: "Database initialized" };
  } catch (err: any) {
    console.error("[DB] Migration error:", err?.message || String(err));
    client.close();
    return { success: false, error: err?.message || String(err) };
  }
}
