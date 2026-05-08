export function getDatabaseUrl(): string {
  // Direct full URL
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.MYSQL_URL) return process.env.MYSQL_URL;
  if (process.env.MYSQL_PRIVATE_URL) return process.env.MYSQL_PRIVATE_URL;

  // Railway shared variable format: ${{ MySQL.MYSQL_URL }}
  // Railway auto-injects these as separate variables when DB is connected
  const host = process.env.MYSQLHOST || process.env.MYSQL_HOST;
  const port = process.env.MYSQLPORT || process.env.MYSQL_PORT || "3306";
  const database = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE;
  const user = process.env.MYSQLUSER || process.env.MYSQL_USER;
  const password = process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD;

  if (host && database && user) {
    return `mysql://${user}:${password}@${host}:${port}/${database}`;
  }

  // Last resort: try to read from Railway's internal format
  const raw = process.env.MYSQL_URL || "";
  if (raw.includes("mysql://")) return raw;

  return "";
}
