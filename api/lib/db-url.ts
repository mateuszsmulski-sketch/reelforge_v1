export function getDatabaseUrl(): string {
  // Railway full URL
  const url = process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.MYSQL_PRIVATE_URL;
  if (url) return url;

  // Railway separate variables
  const host = process.env.MYSQLHOST || process.env.MYSQL_HOST;
  const port = process.env.MYSQLPORT || process.env.MYSQL_PORT || "3306";
  const database = process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE;
  const user = process.env.MYSQLUSER || process.env.MYSQL_USER;
  const password = process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.MYSQL_ROOT_PASSWORD;

  if (host && database && user) {
    return `mysql://${user}:${password}@${host}:${port}/${database}`;
  }

  return "";
}
