import { config } from "dotenv"

import { cleanEnv, port, str } from "envalid"

// Load environment variables from a .env file
config()

/**
 * Validates and sanitizes environment variables using `envalid`.
 */

export const env = cleanEnv(process.env, {
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_HOST: str(),
  POSTGRES_PORT: port({ default: 5432 }),
  POSTGRES_DB: str(),

  PORT: port({ default: 4000 })
})
