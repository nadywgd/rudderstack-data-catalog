import pool from "config/database"

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('track', 'identify', 'alias', 'screen', 'page')) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_type_name UNIQUE (type, name)
    )
`)
}

export const initializeDatabase = async () => {
  try {
    await createTables()
    console.log("Database initialized successfully!")
  } catch (error) {
    console.error("Database initialization failed:", error)
  }
}
