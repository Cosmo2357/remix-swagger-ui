// app/utils/schema.ts
import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  googleId: text('google_id').notNull(),
  name: text('name'),
  email: text('email').notNull(),
  picture: text('picture'),
}, (table) => {
  return {
    // google_idとemailにユニーク制約を付与
    googleIdIndex: uniqueIndex('users_google_id_idx').on(table.googleId),
    emailIndex: uniqueIndex('users_email_idx').on(table.email),
  };
});
