import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const rawConn = (process.env.DATABASE_URL || "").trim().replace(/^"|"$/g, "").replace(/^'|'$/g, "");
const connectionString = rawConn.replace(/&channel_binding=require/g, "").replace(/\?channel_binding=require&?/g, "?");

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

function createClient() {
  if (!connectionString) {
    return null;
  }
  return postgres(connectionString, {
    prepare: false,
    ssl: { rejectUnauthorized: false },
    connect_timeout: 10,
  });
}

const client = globalForDb.conn ?? createClient();
if (process.env.NODE_ENV !== "production" && client) {
  globalForDb.conn = client;
}

export const db = client ? drizzle(client, { schema }) : null;
