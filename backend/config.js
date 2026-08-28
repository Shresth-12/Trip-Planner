import env from "dotenv"
import { fileURLToPath } from "url"

env.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) })

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment")
}

export const JWT_SECRET = process.env.JWT_SECRET