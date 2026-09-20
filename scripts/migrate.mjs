import postgres from "postgres";

const connStr = process.env.DATABASE_URL;
if (!connStr) {
  console.error("FATAL: DATABASE_URL environment variable is required.");
  process.exit(1);
}

async function main() {
  console.log("Connecting to Neon branch...");
  const sql = postgres(connStr, { ssl: { rejectUnauthorized: false } });

  console.log("Creating tax_filings table if not exists...");
  await sql`
    CREATE TABLE IF NOT EXISTS tax_filings (
      id SERIAL PRIMARY KEY,
      reference VARCHAR(50) UNIQUE NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50) NOT NULL,
      cnic VARCHAR(30),
      persona VARCHAR(50) NOT NULL,
      iris_status VARCHAR(50) NOT NULL,
      service_tier VARCHAR(50) NOT NULL,
      contact_preference VARCHAR(50) NOT NULL,
      credentials_notes TEXT,
      documents_summary TEXT,
      todoist_task_id VARCHAR(255),
      source VARCHAR(50) DEFAULT 'web_intake',
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `;

  console.log("Verifying tax_filings table exists...");
  const result = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'tax_filings';
  `;

  console.log("Columns created:", result.map(r => r.column_name).join(", "));
  await sql.end();
  console.log("Migration complete!");
}

main().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
