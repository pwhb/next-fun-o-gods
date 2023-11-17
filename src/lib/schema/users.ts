import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username'),
    password: text('password'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert; 