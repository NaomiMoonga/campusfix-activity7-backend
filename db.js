const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to your .env file.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true"
    ? { rejectUnauthorized: false }
    : undefined
});

pool.on("error", error => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

module.exports = pool;
