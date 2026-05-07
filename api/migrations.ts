import mysql from "mysql2/promise";

export async function runMigrations() {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (!dbUrl) {
    console.error("[DB] No DATABASE_URL found");
    return { success: false, error: "No database URL" };
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbUrl);
    console.log("[DB] Connected");

    // Check if users table exists and has correct structure
    const [existingTables] = await connection.execute(
      `SHOW TABLES LIKE 'users'`
    ) as any[];

    if (existingTables.length > 0) {
      // Table exists - check if it has password column
      const [columns] = await connection.execute(
        `SHOW COLUMNS FROM users LIKE 'password'`
      ) as any[];

      if (columns.length === 0) {
        console.log("[DB] Old users table found - rebuilding...");
        await connection.execute(`DROP TABLE IF EXISTS videos`);
        await connection.execute(`DROP TABLE IF EXISTS users`);
      } else {
        // Check if authProvider column exists
        const [authCols] = await connection.execute(
          `SHOW COLUMNS FROM users LIKE 'authProvider'`
        ) as any[];
        if (authCols.length === 0) {
          await connection.execute(
            `ALTER TABLE users ADD COLUMN authProvider ENUM('local','google','apple','kimi') DEFAULT 'local' NOT NULL`
          );
        }
      }
    }

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        unionId VARCHAR(255) UNIQUE,
        email VARCHAR(320) UNIQUE,
        password VARCHAR(255),
        name VARCHAR(255),
        avatar TEXT,
        role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
        authProvider ENUM('local', 'google', 'apple', 'kimi') DEFAULT 'local' NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        lastSignInAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("[DB] Users table OK");

    // Create videos table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS videos (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userId BIGINT UNSIGNED NOT NULL,
        title VARCHAR(255) NOT NULL,
        prompt TEXT NOT NULL,
        description TEXT,
        status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending' NOT NULL,
        videoUrl TEXT,
        thumbnailUrl TEXT,
        duration INT DEFAULT 5,
        ratio ENUM('9:16', '16:9', '1:1', '3:4', '4:3') DEFAULT '9:16' NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("[DB] Videos table OK");

    return { success: true, message: "Database initialized" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[DB] Migration error:", msg);
    return { success: false, error: msg };
  } finally {
    if (connection) await connection.end();
  }
}
