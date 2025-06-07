/** @type {import("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_uZDhmRUC7s6t@ep-jolly-surf-a83v48wx-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
    }
};