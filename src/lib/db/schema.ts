import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const taxFilings = pgTable("tax_filings", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 50 }).unique().notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }).notNull(),
  cnic: varchar("cnic", { length: 30 }),
  persona: varchar("persona", { length: 50 }).notNull(), // salaried | pensioner | no_income | student | govt | other
  irisStatus: varchar("iris_status", { length: 50 }).notNull(), // active | forgot_password | unregistered
  serviceTier: varchar("service_tier", { length: 50 }).notNull(), // guided_1000 | assistance_2500 | complex_5000
  contactPreference: varchar("contact_preference", { length: 50 }).notNull(), // whatsapp | phone_call | email
  clientNotes: text("client_notes"),
  documentsSummary: text("documents_summary"),
  todoistTaskId: varchar("todoist_task_id", { length: 255 }),
  source: varchar("source", { length: 50 }).default("web_intake"),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TaxFiling = typeof taxFilings.$inferSelect;
export type NewTaxFiling = typeof taxFilings.$inferInsert;
