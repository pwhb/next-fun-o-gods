import type { Config } from "drizzle-kit";

export default {
    schema: "./src/lib/schema",
    out: "./drizzle",
    driver: "libsql",
    dbCredentials: {
        url: "libsql://fun-o-gods-uat-pwhb.turso.io",
    }
} satisfies Config;