import mysql from "mysql2/promise";

export async function runMigrations() {
  const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  if (!dbUrl) {
    console.error("[DB] No DATABASE_URL found");
    return;
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection(dbUrl);
    console.log("[DB] Connected for migrations");

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

    console.log("[DB] All migrations completed");
  } catch (err) {
    console.error("[DB] Migration error:", err instanceof Error ? err.message : String(err));
  } finally {
    if (connection) await connection.end();
  }
}
