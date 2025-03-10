import pool from "config/database"

async function createTables() {
  // Events table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('track', 'identify', 'alias', 'screen', 'page')) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT events_unique_type_name UNIQUE (type, name)
    )
`)

  // Properties table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('string', 'number', 'boolean')) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT properties_unique_type_name UNIQUE (type, name)
    )
  `)

  // TrackingPlans table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tracking_plans (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT tracking_plans_unique_name UNIQUE (name)
    )
  `)

  // Event-Property Relationship Table (Many-to-Many)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS event_properties (
      id SERIAL PRIMARY KEY,
      event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      property_id INT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
      required BOOLEAN NOT NULL DEFAULT FALSE,
      CONSTRAINT event_properties_unique UNIQUE (event_id, property_id)
    )
  `)

  // TrackingPlan-Event Relationship table (Many-to-Many)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tracking_plan_events (
      id SERIAL PRIMARY KEY,
      tracking_plan_id INT NOT NULL REFERENCES tracking_plans(id) ON DELETE CASCADE,
      event_id INT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      additional_properties BOOLEAN NOT NULL DEFAULT FALSE,
      CONSTRAINT tracking_plan_events_unique UNIQUE (tracking_plan_id, event_id)
    )
  `)
}

export const initializeDatabase = async () => {
  try {
    await createTables()
  } catch (error) {
    console.error("Database initialization failed:", error)
  }
}
