import { db } from "@/lib/drizzle";
import { migrate } from "drizzle-orm/libsql/migrator";

migrate(db, { migrationsFolder: "./db/migrations" })
  .then(() => {
    console.log("Migrations completed!");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Migrations failed!", err);
    process.exit(1);
  });