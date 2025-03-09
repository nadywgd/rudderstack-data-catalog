import { config } from "dotenv"

import { cleanEnv, port } from "envalid"

config()

export const env = cleanEnv(process.env, {
  PORT: port({ default: 4000 })
})
