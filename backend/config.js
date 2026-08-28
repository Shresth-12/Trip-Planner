import env from "dotenv"

env.config()

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment")
}

export const JWT_SECRET = process.env.JWT_SECRET