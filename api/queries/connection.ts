import { drizzle } from "drizzle-orm/mysql2";
import { getDatabaseUrl } from "../lib/db-url";
import * as schema from "@db/schema";
import * as relations from "@db/relations";

const fullSchema = { ...schema, ...relations };

let instance: ReturnType<typeof drizzle<typeof fullSchema>>;

export function getDb() {
  if (!instance) {
    const url = getDatabaseUrl();
    instance = drizzle(url, {
      mode: "planetscale",
      schema: fullSchema,
    });
  }
  return instance;
}
